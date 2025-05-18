import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProfilService } from '../../services/profil.service';
import { Rendeles } from '../../models/rendeles.model';
import { StatKartyaComponent } from './stat-kartya.component';

@Component({
  selector: 'app-statisztikak',
  standalone: true,
  imports: [CommonModule, StatKartyaComponent],
  templateUrl: './statisztikak.component.html',
  styleUrls: ['./statisztikak.component.scss']
})
export class StatisztikakComponent implements OnInit {
  osszesKoltott = 0;
  legtobbszorRendelt = '';
  szallitottArany = '';

  constructor(private profilService: ProfilService, private authService: AuthService) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const rendelesek = await this.profilService.lekerRendelesek(user.uid);

    this.osszesKoltott = rendelesek.reduce((sum, r) => sum + r.osszeg, 0);

    const termekDb: Record<string, number> = {};
    rendelesek.forEach(r =>
      r.termekek.forEach(t =>
        termekDb[t.nev] = (termekDb[t.nev] || 0) + t.mennyiseg
      )
    );
    this.legtobbszorRendelt = Object.entries(termekDb).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'nincs adat';

    const szallitott = rendelesek.filter(r =>
      r.termekek.some(t => t.hazhozszallitas)
    ).length;
    const arany = szallitott / rendelesek.length;
    this.szallitottArany = `${Math.round(arany * 100)}%`;
  }

}