import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpotifyAuthService } from '../spotify-auth.service';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-spotify-playlists',
  templateUrl: './spotify-playlists.component.html',
  styleUrls: ['./spotify-playlists.component.css']
})
export class SpotifyPlaylistsComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { accessToken: string }, private spotifyService: SpotifyAuthService, public matDialog: MatDialog, public apiCallsService: ApiCallsService) {}
    accessToken: string = this.data.accessToken;
    playlists: any[] = [];
    playlistData: {data:any[], playlistName: string, playlistImg: string, playdata: any}[] = [];
    checkedRadio: any;
    apiPlaylistData!: playlist;

    async ngOnInit(): Promise<void> {
        console.log(this.accessToken);
        
        this.spotifyService.getUserPlaylists(this.accessToken).subscribe(async data => {
            this.playlists = data.items
            for (const playlist of this.playlists ) {
                const data = await this.spotifyService.dynamicGetRequest(this.accessToken, playlist.tracks.href).toPromise()
                const playlistName = playlist.name;
                const playlistImg = playlist.images[0].url;
                const playlistData = data.items;

                this.playlistData.push({data: playlistData, playlistName: playlistName, playlistImg: playlistImg, playdata: playlist})
            }
            console.log(this.playlistData);
        });
    }

    afterPayment(data: any) {
        this.apiCallsService.convertSpotifyPlaylist(this.checkedRadio.playdata.id).subscribe(data => {
            this.apiPlaylistData = data.data
        })
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