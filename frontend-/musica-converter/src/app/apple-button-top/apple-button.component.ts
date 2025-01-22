import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterUrlComponent } from '../enter-url/enter-url.component';

@Component({
  selector: 'app-apple-button-top',
  templateUrl: './apple-button.component.html',
  styleUrls: ['./apple-button.component.css']
})
export class AppleButtonTopComponent {
  constructor (public MatDialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.MatDialog.open(EnterUrlComponent);

    dialogRef.afterClosed().subscribe();
  }
}
