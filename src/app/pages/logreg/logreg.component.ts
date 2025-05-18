import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logreg',
  standalone: true,
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LogregComponent {
  view: 'login' | 'register' = 'login';

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };

  constructor(public authService: AuthService) {}

  setView(view: 'login' | 'register') {
    this.view = view;
  }

  async onRegister() {
    const success = await this.authService.register(
        this.registerData.name,
        this.registerData.email,
        this.registerData.password
    );
    if (success) {
        window.location.href = '/profil';
    }
    }

  async onLogin() {
    const success = await this.authService.login(
      this.loginData.email,
      this.loginData.password
    );
    if (!success) {
      alert('Bejelentkezés sikertelen!');
    } else {
      window.location.href = '/profil';
    }
  }
}
