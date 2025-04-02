import { Component, inject } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';
import { AuthService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify-button-top',
  templateUrl: './spotify-button.component.html',
  styleUrls: ['./spotify-button.component.css']
})
export class SpotifyButtonTopComponent {
  constructor(private spotifyAuth: SpotifyAuthService, private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.authService.userSubject.value) {
        this.router.navigate(['/login']); // Redirect if user is not authenticated
        return;
    }

    window.location.href = this.spotifyAuth.getAuthUrl();
  }
}
