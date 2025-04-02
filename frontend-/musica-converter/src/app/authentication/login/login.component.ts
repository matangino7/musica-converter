import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/homepage']);
    } catch (error) {
        this.router.navigate(['/login']);
    }
  }

  async googleLogin() {
    try {
      await this.authService.googleLogin();
      this.router.navigate(['/homepage']);
    } catch (error) {
        this.router.navigate(['/login']);
    }
  }
}
