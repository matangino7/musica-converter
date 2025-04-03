import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAuthService } from '../spotify-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SpotifyPlaylistsComponent } from '../spotify-playlists/spotify-playlists.component';
import { AuthService } from 'src/app/firestore.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  title = 'muisic-convio';
  isLoggedIn = false;

  constructor(
    private spotifyAuth: SpotifyAuthService,
    private router: Router,
    private MatDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.spotifyAuth.getTokenFromUrl();
    if (token) {
      this.openDialog(token);
    }

    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  openDialog(token: string) {
    const dialogRef = this.MatDialog.open(SpotifyPlaylistsComponent, {
      data: { accessToken: token },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe();
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
