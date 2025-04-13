import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { KosarService } from './services/cart.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatBadgeModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eskuvoi-dekoracio-webshop';

  constructor(
    public kosarService: KosarService,
    public authService: AuthService,
    private router: Router
  ) {}

  kijelentkezes() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
