import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterUrlComponent } from '../enter-url/enter-url.component';
import { AuthService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apple-button-top',
  templateUrl: './apple-button.component.html',
  styleUrls: ['./apple-button.component.css']
})
export class AppleButtonTopComponent {
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
