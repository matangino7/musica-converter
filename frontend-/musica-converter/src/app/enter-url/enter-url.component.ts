import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../firestore.service';

@Component({
  selector: 'app-enter-url',
  templateUrl: './enter-url.component.html',
  styleUrls: ['./enter-url.component.css']
})
export class EnterUrlComponent {
    constructor(
      public matDialog: MatDialog,
      private orderService: OrderService,
      private router: Router,
      private authService: AuthService
    ) {}
    
    url: string = '';
    playlist_data: {album_url: string, name: string, youtube_url: string, download_url: any}[] = [];
    paymentSuccessful: boolean = false;
    currentOrderId: string | null = null;
    sourcePlatform: string = 'Apple';
    targetPlatform: string = 'Spotify';
    @ViewChild('stepper') stepper!: MatStepper;

    submitUrl(url: string) {
        this.paymentSuccessful = false;
        this.sourcePlatform = url.includes('apple.com') ? 'Apple' : 'Spotify';
        this.targetPlatform = url.includes('apple.com') ? 'Spotify' : 'Apple';
        
        fetch('http://127.0.0.1:5000/get-youtube-urls', {
            method: 'POST',
            body: JSON.stringify({
                playlist_url: url,
                type: this.sourcePlatform.toLowerCase()
            })
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.playlist_data = data;
                    setTimeout(() => {
                        this.stepper.next();
                    }, 2000);
                });
            }
        }).catch(err => {
            this.playlist_data = [];
            this.stepper.previous();
        });
    }

    async paymentSuccess(data: any) {
        this.paymentSuccessful = true;
        
        try {
            // Create an order in Firestore
            const orderId = await this.orderService.createOrder({
                plan: 'Premium',
                amount: 2.00, // Match the PayPal amount
                playlistName: this.playlist_data[0]?.name || 'Unknown Playlist',
                sourcePlatform: this.sourcePlatform,
                targetPlatform: this.targetPlatform,
                songCount: this.playlist_data.length,
                status: 'processing' // Start with processing status
            });
            
            this.currentOrderId = orderId;
            
            // Update order status to processing
            await this.orderService.updateOrderStatus(orderId, 'processing');
            
            // Show success message and redirect to orders page after a delay
            setTimeout(() => {
                this.router.navigate(['/orders']);
            }, 3000);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
}
