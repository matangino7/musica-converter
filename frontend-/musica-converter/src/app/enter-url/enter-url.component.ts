import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-enter-url',
  templateUrl: './enter-url.component.html',
  styleUrls: ['./enter-url.component.css']
})
export class EnterUrlComponent {
    constructor(public matDialog: MatDialog) {}
    url: string = ''
    playlist_data:  {album_url: string, name: string, youtube_url: string, download_url: any}[] = [];
    paymentSuccessful: boolean = false;
    @ViewChild('stepper') private myStepper!: MatStepper;

    submitUrl(url: string) {
        this.paymentSuccessful = false;
        fetch('http://127.0.0.1:5000/get-youtube-urls', {
            method: 'POST',
            body: JSON.stringify({
                playlist_url: url,
                type: 'apple'
            })
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.playlist_data = data;
                    setTimeout(() => {
                        this.myStepper.next();
                    }, 2000)
                })
            }
        }).catch(err => {
            this.playlist_data = [];
            this.myStepper.previous();
        })
    }

    paymentSuccess(data: any) {
        this.paymentSuccessful = true;
    }
}
