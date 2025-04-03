import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(error: any): string {
    if (error.code === 'auth/email-already-in-use') {
      return 'This email is already registered';
    }
    if (error.code === 'auth/invalid-email') {
      return 'Please enter a valid email address';
    }
    if (error.code === 'auth/operation-not-allowed') {
      return 'Email/password accounts are not enabled';
    }
    if (error.code === 'auth/weak-password') {
      return 'Please choose a stronger password';
    }
    if (error.code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection';
    }
    return 'An error occurred. Please try again';
  }
}
