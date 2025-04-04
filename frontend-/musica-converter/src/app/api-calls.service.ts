import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) {}

  convertSpotifyPlaylist(playlistUrl: string): Observable<PlaylistResponse> {
    console.log('Converting playlist with URL:', playlistUrl);
    
    // Extract playlist ID if a full URL is provided
    let playlistId = playlistUrl;
    if (playlistUrl.includes('spotify.com')) {
      const match = playlistUrl.match(/playlist\/([a-zA-Z0-9]+)/);
      if (match && match[1]) {
        playlistId = match[1];
        console.log('Extracted playlist ID:', playlistId);
      }
    }
    
    const parsedPlaylistId = encodeURIComponent(playlistId);
    const headers = new HttpHeaders({
      'x-rapidapi-key': "642ce14f5bmsha46bac10deaafe2p1a317djsn5644bee15cd8",
      'x-rapidapi-host': "spotify-downloader9.p.rapidapi.com"
    });

    console.log('Making API request with ID:', parsedPlaylistId);
    return this.http.get<PlaylistResponse>(`https://spotify-downloader9.p.rapidapi.com/downloadPlaylist?playlistId=${parsedPlaylistId}`, { headers });
  }

  getSpotifyPlaylists(): Observable<SpotifyPlaylistResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<SpotifyPlaylistResponse>('https://api.spotify.com/v1/me/playlists', { headers });
  }
}


export interface PlaylistResponse {
  success: boolean;
  data: {
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
  };
  generatedTimeStamp: number;
}

export interface SpotifyPlaylistResponse {
  items: {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: {
      items: {
        track: {
          id: string;
          name: string;
          artists: { name: string }[];
          album: {
            name: string;
            images: { url: string }[];
            release_date: string;
          };
        };
      }[];
    };
  }[];
}