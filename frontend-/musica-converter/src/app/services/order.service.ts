import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, orderBy, Timestamp, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../firestore.service';

export interface Song {
  url: string;
  title?: string;
  artist?: string;
  thumbnail?: string;
}

export interface OrderUrls {
  downloadLinks: Song[];
  previewLinks: Song[];
}

export interface Order {
  id?: string;
  userId: string;
  date: Date;
  playlistName: string;
  sourcePlatform: string;
  targetPlatform: string;
  songCount: number;
  plan: string;
  amount: number;
  status: string;
  urls?: OrderUrls;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async createOrder(orderData: Omit<Order, 'id' | 'userId' | 'date'>): Promise<string> {
    const user = this.authService.userSubject.value;
    if (!user) {
      throw new Error('User must be logged in to create an order');
    }

    const order: Omit<Order, 'id'> = {
      ...orderData,
      userId: user.uid,
      date: new Date(),
      status: 'pending'
    };

    const docRef = await addDoc(collection(this.firestore, 'orders'), {
      ...order,
      date: Timestamp.fromDate(order.date)
    });

    return docRef.id;
  }

  async updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'completed' | 'failed'): Promise<void> {
    const user = this.authService.userSubject.value;
    if (!user) {
      throw new Error('User must be logged in to update an order');
    }

    const orderRef = doc(this.firestore, 'orders', orderId);
    await updateDoc(orderRef, {
      status: status
    });
  }

  async getUserOrders(): Promise<Order[]> {
    const user = this.authService.userSubject.value;
    if (!user) {
      throw new Error('User must be logged in to fetch orders');
    }

    try {
      const ordersRef = collection(this.firestore, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data['userId'],
          date: data['date'].toDate(),
          playlistName: data['playlistName'],
          sourcePlatform: data['sourcePlatform'],
          targetPlatform: data['targetPlatform'],
          songCount: data['songCount'],
          plan: data['plan'],
          amount: data['amount'],
          status: data['status'],
          urls: data['urls'] ? {
            downloadLinks: data['urls'].downloadLinks.map((link: any) => ({
              url: typeof link === 'string' ? link : link.url,
              title: link.title,
              artist: link.artist,
              thumbnail: link.thumbnail
            })),
            previewLinks: data['urls'].previewLinks ? data['urls'].previewLinks.map((link: any) => ({
              url: typeof link === 'string' ? link : link.url,
              title: link.title,
              artist: link.artist,
              thumbnail: link.thumbnail
            })) : []
          } : undefined
        };
      });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  async updateOrderWithUrls(orderId: string, urls: OrderUrls): Promise<void> {
    try {
      const orderRef = doc(this.firestore, 'orders', orderId);
      await updateDoc(orderRef, {
        urls: urls,
        status: 'completed'
      });
    } catch (error) {
      console.error('Error updating order with URLs:', error);
      throw error;
    }
  }
  
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const orderRef = doc(this.firestore, 'orders', orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (orderDoc.exists()) {
        const data = orderDoc.data();
        return {
          id: orderDoc.id,
          userId: data['userId'],
          date: data['date'].toDate(),
          status: data['status'],
          plan: data['plan'],
          amount: data['amount'],
          playlistName: data['playlistName'],
          sourcePlatform: data['sourcePlatform'],
          targetPlatform: data['targetPlatform'],
          songCount: data['songCount'],
          urls: data['urls'] ? {
            downloadLinks: data['urls'].downloadLinks.map((link: any) => ({
              url: typeof link === 'string' ? link : link.url,
              title: link.title,
              artist: link.artist,
              thumbnail: link.thumbnail
            })),
            previewLinks: data['urls'].previewLinks ? data['urls'].previewLinks.map((link: any) => ({
              url: typeof link === 'string' ? link : link.url,
              title: link.title,
              artist: link.artist,
              thumbnail: link.thumbnail
            })) : []
          } : undefined
        };
      } else {
        console.error(`Order ${orderId} not found`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      return null;
    }
  }
} 