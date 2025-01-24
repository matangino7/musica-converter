import { Component } from '@angular/core';
import { EnterUrlComponent } from '../enter-url/enter-url.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-apple-button',
  templateUrl: './apple-button.component.html',
  styleUrls: ['./apple-button.component.css']
})
export class AppleButtonComponent {
  constructor (public MatDialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.MatDialog.open(EnterUrlComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe();
  }
}
