import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      this.router.navigate(['/register']);
    }
  }
}
