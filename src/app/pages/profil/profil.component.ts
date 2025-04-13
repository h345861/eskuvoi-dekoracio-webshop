import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ProfilComponent {
  view: 'login' | 'register' = 'login';

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };

  constructor(public authService: AuthService) {}

  setView(view: 'login' | 'register') {
    this.view = view;
  }

  onLogin() {
    const success = this.authService.login(this.loginData.email, this.loginData.password);
    if (success) {
    } else {
      alert('Hibás email vagy jelszó!');
    }
  }

  onRegister() {
    const success = this.authService.register(
      this.registerData.name,
      this.registerData.email,
      this.registerData.password
    );

    if (success) {
      alert('Sikeres regisztráció! Most már be tudsz jelentkezni.');
      this.setView('login');
    } else {
      alert('Ez az email cím már foglalt.');
    }
  }
}
