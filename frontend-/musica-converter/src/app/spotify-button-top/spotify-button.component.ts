import { Component, inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EnterUrlComponent } from '../enter-url/enter-url.component';

@Component({
  selector: 'app-spotify-button-top',
  templateUrl: './spotify-button.component.html',
  styleUrls: ['./spotify-button.component.css']
})
export class SpotifyButtonTopComponent {
    constructor (public MatDialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.MatDialog.open(EnterUrlComponent);

    dialogRef.afterClosed().subscribe();
  }

}
