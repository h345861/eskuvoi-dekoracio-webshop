import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DatumPipe } from '../../pipes/datum.pipe';
import { AuthService } from '../../services/auth.service';
import { Velemeny } from '../../models/velemeny.model';
import { VelemenyService } from '../../services/velemeny.service';

@Component({
  selector: 'app-velemenyek',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, NgFor, DatumPipe],
  templateUrl: './velemenyek.component.html',
  styleUrls: ['./velemenyek.component.scss']
})
export class VelemenyekComponent {
  velemenyek: Velemeny[] = [];
  ujNev = '';
  ujSzoveg = '';
  szerkesztesId: string | null = null;
  szerkesztettSzoveg: string = '';

  constructor(
    private authService: AuthService,
    private velemenyService: VelemenyService
  ) {
    this.betoltVelemenyek();
  }

  async betoltVelemenyek() {
    this.velemenyek = await this.velemenyService.lekerVelemenyek();
  }

  async hozzaszolasBekuldese() {
    const user = this.authService.getCurrentUser();
    if (!user || !this.ujNev.trim() || !this.ujSzoveg.trim()) return;

    const velemeny: Velemeny = {
      uid: user.uid,
      nev: this.ujNev,
      datum: new Date(),
      szoveg: this.ujSzoveg
    };

    await this.velemenyService.hozzadVelemeny(velemeny);
    this.ujNev = '';
    this.ujSzoveg = '';
    await this.betoltVelemenyek();
  }

  szerkeszt(v: Velemeny) {
    this.szerkesztesId = v.id!;
    this.szerkesztettSzoveg = v.szoveg;
  }

  async ment(v: Velemeny) {
    if (!this.szerkesztettSzoveg.trim()) return;
    await this.velemenyService.frissitVelemeny(v.id!, this.szerkesztettSzoveg);
    this.szerkesztesId = null;
    this.szerkesztettSzoveg = '';
    await this.betoltVelemenyek();
  }

  isSajat(v: Velemeny): boolean {
    const user = this.authService.getCurrentUser();
    return user?.uid === v.uid;
  }

    async torol(v: Velemeny) {
    if (!confirm('Biztosan törlöd ezt a véleményt?')) return;
    await this.velemenyService.torolVelemeny(v.id!);
    await this.betoltVelemenyek();
  }

}
