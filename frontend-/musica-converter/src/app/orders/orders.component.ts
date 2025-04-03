import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs, orderBy } from '@angular/fire/firestore';
import { AuthService } from 'src/app/firestore.service';
import { Subscription } from 'rxjs';

interface Order {
  id: string;
  userId: string;
  date: Date;
  status: string;
  plan: string;
  amount: number;
  playlistName: string;
  sourcePlatform: string;
  targetPlatform: string;
  songCount: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  loading = true;
  error = '';
  private userSubscription: Subscription | null = null;
  userId: string | null = null;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
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
    if (!this.userId) return;
    
    this.loading = true;
    this.error = '';
    
    try {
      const ordersRef = collection(this.firestore, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', this.userId),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      this.orders = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data['userId'],
          date: data['date'].toDate(),
          status: data['status'],
          plan: data['plan'],
          amount: data['amount'],
          playlistName: data['playlistName'],
          sourcePlatform: data['sourcePlatform'],
          targetPlatform: data['targetPlatform'],
          songCount: data['songCount']
        };
      });
    } catch (err) {
      console.error('Error fetching orders:', err);
      this.error = 'Failed to load your orders. Please try again later.';
    } finally {
      this.loading = false;
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
}
