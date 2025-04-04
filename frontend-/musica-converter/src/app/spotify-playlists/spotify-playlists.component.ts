import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService, OrderUrls } from '../services/order.service';
import { ApiCallsService, PlaylistResponse, SpotifyPlaylistResponse } from '../api-calls.service';
import { SpotifyAuthService } from '../spotify-auth.service';

interface SpotifyPlaylist {
  id: string;
  name: string;
  tracks: {
    total: number;
  };
}

@Component({
  selector: 'app-spotify-playlists',
  templateUrl: './spotify-playlists.component.html',
  styleUrls: ['./spotify-playlists.component.css']
})
export class SpotifyPlaylistsComponent implements OnInit {
  selectedPlaylist: SpotifyPlaylist | null = null;
  paymentSuccessful = false;
  currentOrderId: string | null = null;
  apiPlaylistData: PlaylistResponse | null = null;
  error: string | null = null;
  checkedRadio: any = null;
  playlistData: any[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    public matDialog: MatDialog,
    private orderService: OrderService,
    private apiCallsService: ApiCallsService,
    private spotifyAuthService: SpotifyAuthService
  ) {}

  ngOnInit(): void {
    this.loadSpotifyPlaylists();
  }

  async loadSpotifyPlaylists(): Promise<void> {
    try {
      const token = localStorage.getItem('spotify_token');
      if (!token) {
        this.errorMessage = 'Please log in to Spotify to view your playlists';
        // Redirect to Spotify authorization
        this.redirectToSpotifyAuth();
        return;
      }

      // Use the ApiCallsService to get playlists
      this.apiCallsService.getSpotifyPlaylists().subscribe({
        next: (response: any) => {
          console.log('Spotify playlists response:', response);
          
          // Check if we have playlists in the response
          if (response && response.items && response.items.length > 0) {
            this.playlistData = response.items.map((playlist: any) => {
              // Create a simplified playlist object
              return {
                playlistName: playlist.name,
                playlistImg: playlist.images && playlist.images.length > 0 ? playlist.images[0].url : '',
                data: Array(playlist.tracks.total).fill({}) // Create an array with the correct length
              };
            });
            console.log('Processed playlist data:', this.playlistData);
          } else {
            this.errorMessage = 'No playlists found. Please create a playlist in Spotify.';
          }
        },
        error: (error) => {
          console.error('Error loading playlists:', error);
          if (error.status === 401) {
            this.errorMessage = 'Your Spotify session has expired. Please log in again.';
            // Clear the invalid token
            localStorage.removeItem('spotify_token');
            // Redirect to Spotify authorization
            this.redirectToSpotifyAuth();
          } else {
            this.errorMessage = 'Failed to load playlists. Please try again.';
          }
        }
      });
    } catch (error) {
      console.error('Error loading playlists:', error);
      this.errorMessage = 'Failed to load playlists. Please try again.';
    }
  }

  redirectToSpotifyAuth(): void {
    // Use the SpotifyAuthService to get the auth URL
    const authUrl = this.spotifyAuthService.getAuthUrl();
    console.log('Redirecting to Spotify auth URL:', authUrl);
    window.location.href = authUrl;
  }

  async afterPayment(paymentResponse: any): Promise<void> {
    try {
      console.log('Payment successful:', paymentResponse);
      this.paymentSuccessful = true;
      
      if (!this.checkedRadio) {
        this.error = 'No playlist selected';
        return;
      }
      
      console.log('Selected playlist for conversion:', this.checkedRadio);
      
      // Create order in Firestore
      const orderData = {
        playlistName: this.checkedRadio.playlistName,
        sourcePlatform: 'spotify',
        targetPlatform: 'youtube',
        songCount: this.checkedRadio.data.length,
        plan: 'premium',
        amount: 2.00,
        status: 'pending'
      };
      
      console.log('Creating order with data:', orderData);
      const orderId = await this.orderService.createOrder(orderData);
      this.currentOrderId = orderId;
      
      // Update order status to processing
      await this.orderService.updateOrderStatus(orderId, 'processing');
      
      // Convert playlist - use the playlist name as the ID
      console.log('Converting playlist:', this.checkedRadio.playlistName);
      this.apiCallsService.convertSpotifyPlaylist(this.checkedRadio.playlistName).subscribe({
        next: async (response: PlaylistResponse) => {
          console.log('Conversion response:', response);
          
          if (response && response.success && response.data && response.data.songs && response.data.songs.length > 0) {
            // Create the URLs object with the new Song interface
            const urls: OrderUrls = {
              downloadLinks: response.data.songs.map((song) => ({
                url: song.downloadLink,
                title: song.title,
                artist: song.artist,
                thumbnail: song.cover
              })),
              previewLinks: response.data.songs.map((song) => ({
                url: '', // No preview link available in the API response
                title: song.title,
                artist: song.artist,
                thumbnail: song.cover
              }))
            };
            
            // Update order with URLs
            await this.orderService.updateOrderWithUrls(orderId, urls);
            
            // Update order status to completed
            await this.orderService.updateOrderStatus(orderId, 'completed');
            
            // Store the response data
            this.apiPlaylistData = response;
            
            // Redirect to orders page after a delay
            setTimeout(() => {
              this.router.navigate(['/orders']);
            }, 2000);
          } else {
            console.error('No songs in response');
            await this.orderService.updateOrderStatus(orderId, 'failed');
            this.error = 'Failed to convert playlist. Please try again.';
          }
        },
        error: async (error) => {
          console.error('Error converting playlist:', error);
          await this.orderService.updateOrderStatus(orderId, 'failed');
          this.error = 'An error occurred while converting your playlist. Please try again.';
        }
      });
    } catch (error) {
      console.error('Error in afterPayment:', error);
      this.error = 'An error occurred. Please try again.';
    }
  }

  // Add a method to handle playlist selection
  onPlaylistSelected(playlist: any): void {
    console.log('Playlist selected:', playlist);
    this.checkedRadio = playlist;
  }
}

export interface playlist {
    playlistDetails: {
        artist: string;
        title: string;
        cover: string;
    };
    count: number;
    songs: {
        id: string;
        artist: string;
        title: string;
        album: string;
        cover: string;
        releaseDate: string;
        downloadLink: string;
    }[];
}