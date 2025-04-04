import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../firestore.service';
import { OrderService, Order, OrderUrls } from '../services/order.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;
  selectedOrder: Order | null = null;
  private userSubscription: Subscription | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private apiCallsService: ApiCallsService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.fetchOrders();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async fetchOrders(): Promise<void> {
    this.loading = true;
    this.error = '';
    
    try {
      this.orders = await this.orderService.getUserOrders();
      
      // Check for stuck orders (processing for more than 5 minutes)
      const now = new Date();
      const stuckOrders = this.orders.filter(order => {
        if (order.status !== 'processing') return false;
        
        const orderDate = new Date(order.date);
        const diffMinutes = (now.getTime() - orderDate.getTime()) / (1000 * 60);
        return diffMinutes > 5;
      });
      
      // Fix stuck orders
      for (const order of stuckOrders) {
        if (order.id) {
          console.log(`Fixing stuck order: ${order.id}`);
          await this.orderService.updateOrderStatus(order.id, 'failed');
        }
      }
      
      // Check for completed orders without URLs
      const completedOrdersWithoutUrls = this.orders.filter(order => 
        order.status === 'completed' && (!order.urls || !order.urls.downloadLinks || order.urls.downloadLinks.length === 0)
      );
      
      if (completedOrdersWithoutUrls.length > 0) {
        console.log(`Found ${completedOrdersWithoutUrls.length} completed orders without URLs`);
        // We'll fix these in a separate function to avoid blocking the UI
        this.fixCompletedOrdersWithoutUrls(completedOrdersWithoutUrls);
      }
      
      // Refresh orders after fixing
      if (stuckOrders.length > 0) {
        this.orders = await this.orderService.getUserOrders();
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      this.error = 'Failed to load your orders. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
  
  async fixCompletedOrdersWithoutUrls(orders: Order[]): Promise<void> {
    for (const order of orders) {
      if (!order.id) continue;
      
      try {
        console.log(`Attempting to fix order ${order.id} without URLs`);
        
        // For now, we'll just mark these as failed since we don't have the original playlist data
        // In a real implementation, you might want to store the playlist ID with the order
        await this.orderService.updateOrderStatus(order.id, 'failed');
        console.log(`Marked order ${order.id} as failed`);
      } catch (error) {
        console.error(`Error fixing order ${order.id}:`, error);
      }
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'processing':
        return 'status-processing';
      case 'failed':
        return 'status-failed';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  }

  showOrderDetails(order: Order): void {
    if (order.status === 'completed' && order.urls) {
      this.selectedOrder = order;
    }
  }

  closeOrderDetails(): void {
    this.selectedOrder = null;
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
