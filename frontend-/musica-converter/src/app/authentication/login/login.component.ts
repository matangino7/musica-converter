import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/homepage']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(error: any): string {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return 'Invalid email or password';
    }
    if (error.code === 'auth/too-many-requests') {
      return 'Too many failed attempts. Please try again later';
    }
    if (error.code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection';
    }
    return 'An error occurred. Please try again';
  }
}
