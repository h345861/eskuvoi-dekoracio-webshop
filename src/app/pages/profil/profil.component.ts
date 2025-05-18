import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Rendeles } from '../../models/rendeles.model'; 
import { DatumPipe } from '../../pipes/datum.pipe';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  imports: [CommonModule, FormsModule, DatumPipe]
})
export class ProfilComponent implements OnInit {

  rendelesek: Rendeles[] = [];

  constructor(public authService: AuthService, private profilService: ProfilService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loadRendelesek();
    }
  }

  async loadRendelesek() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.rendelesek = await this.profilService.lekerRendelesek(user.uid);
  }

  ujEmail: string = '';
  ujJelszo: string = '';
  jelenlegiJelszo: string = '';
  ujNev: string = '';

  async profilTorles() {
    const megerosites = confirm('Biztosan törölni szeretnéd a profilodat? Ez nem visszavonható.');
    if (!megerosites) return;

    const siker = await this.authService.torolFelhasznalo();
    if (siker) {
      alert('Profil sikeresen törölve.');
      window.location.href = '/';
    } else {
      alert('Hiba történt a profil törlésekor.');
    }
  }

  async modositJelszo() {
    const siker = await this.authService.jelszoModositas(this.jelenlegiJelszo, this.ujJelszo);
    if (siker) {
      this.ujJelszo = '';
      this.jelenlegiJelszo = '';
    }
  }

  async modositNevet() {
    const user = this.authService.getCurrentUser();
    if (!user || !this.ujNev.trim()) return;

    try {
      await this.profilService.frissitNev(user.uid, this.ujNev);
      alert('Név módosítva.');
      this.ujNev = '';
    } catch (err) {
      console.error('Név módosítás hiba:', err);
      alert('Nem sikerült a nevet módosítani.');
    }
  }
}
