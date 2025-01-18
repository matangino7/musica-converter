import { Component } from '@angular/core';

@Component({
  selector: 'app-enter-url',
  templateUrl: './enter-url.component.html',
  styleUrls: ['./enter-url.component.css']
})
export class EnterUrlComponent {
    url: string = ''
    playlist_data:  {album_url: string, name: string, youtube_url: string}[] = [];
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
