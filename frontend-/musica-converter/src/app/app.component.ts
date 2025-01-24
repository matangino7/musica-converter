import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAuthService } from './spotify-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SpotifyPlaylistsComponent } from './spotify-playlists/spotify-playlists.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'muisic-convio';

  constructor(private spotifyAuth: SpotifyAuthService, private router: Router, private MatDialog: MatDialog) {}

  ngOnInit(): void {
    const token = this.spotifyAuth.getTokenFromUrl();
    if (token) {
        this.openDialog(token);
    }
    }
    openDialog(token: string) {
        const dialogRef = this.MatDialog.open(SpotifyPlaylistsComponent, {
            data: {accessToken: token},
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe();
    }
}
