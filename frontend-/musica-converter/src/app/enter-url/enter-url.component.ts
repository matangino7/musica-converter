import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-enter-url',
  templateUrl: './enter-url.component.html',
  styleUrls: ['./enter-url.component.css']
})
export class EnterUrlComponent {
    constructor(public matDialog: MatDialog) {}
    url: string = ''
    playlist_data:  {album_url: string, name: string, youtube_url: string, download_url: any}[] = [];
    submit: boolean = false;

    submitUrl(url: string) {
        this.submit = true;
        fetch('http://127.0.0.1:5000/get-youtube-urls', {
            method: 'POST',
            body: JSON.stringify({
                playlist_url: url,
                type: 'apple'
            })
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.playlist_data = data;
                })
            }
        }).catch(err => {
            this.submit = false;
            this.playlist_data = [];
        })
    }
}
