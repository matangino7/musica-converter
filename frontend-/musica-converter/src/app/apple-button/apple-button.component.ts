import { Component, OnInit } from '@angular/core';
import { EnterUrlComponent } from '../enter-url/enter-url.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apple-button',
  templateUrl: './apple-button.component.html',
  styleUrls: ['./apple-button.component.css']
})
export class AppleButtonComponent {
  constructor (public MatDialog: MatDialog, private authService: AuthService, private router: Router) {}


  openDialog() {
    if (!this.authService.userSubject.value) {
        this.router.navigate(['/login']); // Redirect if user is not authenticated
        return;
    }
    const dialogRef = this.MatDialog.open(EnterUrlComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe();
  }
}
