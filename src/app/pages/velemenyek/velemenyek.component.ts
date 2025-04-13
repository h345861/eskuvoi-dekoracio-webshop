import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-velemenyek',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, NgFor],
  templateUrl: './velemenyek.component.html',
  styleUrls: ['./velemenyek.component.scss']
})
export class VelemenyekComponent {
  velemenyek = [
    {
      nev: 'Kata',
      datum: new Date('2024-09-18'),
      szoveg: 'Nagyon gyönyörűek voltak a dekorációk, pont ilyet képzeltem el az esküvőmre!'
    },
    {
      nev: 'Dávid és Timi',
      datum: new Date('2024-11-03'),
      szoveg: 'Segítőkész csapat, gyors kiszállítás, és minden úgy nézett ki, mint a képeken. 😊'
    },
    {
      nev: 'Réka',
      datum: new Date('2025-02-14'),
      szoveg: 'Minden vendég megdicsérte a főasztal díszítését! Köszönjük!'
    }
  ];

  ujNev = '';
  ujSzoveg = '';

  hozzaszolasBekuldese() {
    if (this.ujNev.trim() && this.ujSzoveg.trim()) {
      this.velemenyek.unshift({
        nev: this.ujNev,
        datum: new Date(),
        szoveg: this.ujSzoveg
      });
      this.ujNev = '';
      this.ujSzoveg = '';
    }
  }
}
