import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-spotify-playlists',
  templateUrl: './spotify-playlists.component.html',
  styleUrls: ['./spotify-playlists.component.css']
})
export class SpotifyPlaylistsComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { accessToken: string }, private spotifyService: SpotifyAuthService) {}
    accessToken: string = this.data.accessToken;
    playlists: any[] = [];
    playlistData: {data:any[], playlistName: string}[] = [];

    async ngOnInit(): Promise<void> {
        this.spotifyService.getUserPlaylists(this.accessToken).subscribe(async data => {
            this.playlists = data.items
            for (const playlist of this.playlists ) {
                const data = await this.spotifyService.dynamicGetRequest(this.accessToken, playlist.tracks.href).toPromise()
                const playlistName = playlist.name;
                const playlistData = data.items;

                this.playlistData.push({data: playlistData, playlistName: playlistName})
            }
            console.log(this.playlistData);
        });
    }
}
