import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) {}

  convertSpotifyPlaylist(playlistUrl: string): Observable<PlaylistResponse> {
    const parsedPlaylistUrl = encodeURIComponent(playlistUrl);
    const headers = new HttpHeaders({
      'x-rapidapi-key': "642ce14f5bmsha46bac10deaafe2p1a317djsn5644bee15cd8",
      'x-rapidapi-host': "spotify-downloader9.p.rapidapi.com"
    });

    return this.http.get<PlaylistResponse>(`https://spotify-downloader9.p.rapidapi.com/downloadPlaylist?playlistId=${parsedPlaylistUrl}`, { headers });
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