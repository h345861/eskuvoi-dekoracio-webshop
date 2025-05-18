import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KosarService } from '../../services/cart.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RendelesDialogComponent } from './rendeles-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kosar',
  standalone: true,
  imports: [CommonModule, NgFor, MatButtonModule, FormsModule, MatSlideToggleModule],
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.scss']
})
export class KosarComponent {
  kosar: any[] = [];
  hazhozSzallitas: boolean = false;

  constructor(
    private kosarService: KosarService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.kosarService.kosar$.subscribe(k => {
      this.kosar = k;
    });
  }

  novel(termek: any) {
    this.kosarService.mennyisegNovel(termek);
  }

  csokkent(termek: any) {
    this.kosarService.mennyisegCsokkent(termek);
  }

  torol(termek: any) {
    this.kosarService.torol(termek);
  }

  
  
  leadRendeles() {
  const user = this.authService.getCurrentUser();
  if (!user) {
    alert('A rendeléshez előbb be kell jelentkezned!');
    return;
  }

  if (this.kosar.length === 0) {
    alert('A kosarad üres!');
    return;
  }

  const validTermekek = this.kosar.map(t => ({
  nev: t.nev ?? 'ismeretlen',
  ar: t.ar ?? 0,
  mennyiseg: t.mennyiseg ?? 1,
  hazhozszallitas: this.hazhozSzallitas,
  kepUrl: t.kep ?? ''
}));

  this.authService.addRendeles(validTermekek)
    .then(() => {
      this.kosarService.urites();
      this.dialog.open(RendelesDialogComponent);
    })
    .catch(err => {
      console.error('Hiba a rendelés mentésekor:', err);
      alert('Hiba történt a rendelés mentésekor.');
    });
}
}