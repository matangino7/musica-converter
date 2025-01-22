import { Component, inject } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-spotify-button-top',
  templateUrl: './spotify-button.component.html',
  styleUrls: ['./spotify-button.component.css']
})
export class SpotifyButtonTopComponent {
  constructor(private spotifyAuth: SpotifyAuthService) {}

  login(): void {
      window.location.href = this.spotifyAuth.getAuthUrl();
  }
}
