// spotify-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private clientId = 'adad56b52b644c26b8822210ee2011ff';//TODO: move to env
  private redirectUri = 'http://localhost:4200/'; // Make sure this matches the URI registered in Spotify
  private scopes = 'user-read-private user-read-email'; // Adjust the scopes as needed

  constructor(private http: HttpClient) {}

  getAuthUrl(): string {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    return `${authEndpoint}?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scopes)}&response_type=token`;
  }

  getTokenFromUrl(): string | null {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('access_token');
  }

  getUserPlaylists(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://api.spotify.com/v1/me/playlists', { headers });
  }

  dynamicGetRequest(token: string, url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(url, { headers });
  }
}
