import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KosarService } from '../../services/cart.service';
import { ForintPipe } from '../../pipes/forint.pipe';

@Component({
  selector: 'app-termekek',
  standalone: true,
  imports: [CommonModule, NgFor, MatCardModule, ForintPipe],
  templateUrl: './termekek.component.html',
  styleUrls: ['./termekek.component.scss']
})
export class TermekekComponent {
  termekek = [
    {
      id: 1,
      nev: 'Boldogságkapu',
      ar: 15000,
      kep: 'boldogsagkapu.jpg'
    },
    {
      id: 2,
      nev: 'Asztalszám',
      ar: 500,
      kep: 'asztalszam.jpg'
    },
    {
      id: 3,
      nev: 'Fényfüzér',
      ar: 1200,
      kep: 'fenyfuzer.jpg'
    },
    {
      id: 4,
      nev: 'Fotófal / fotósarok',
      ar: 8500,
      kep: 'fotofal.jpg'
    },
    {
      id: 5,
      nev: 'Esküvői vendégkönyv',
      ar: 3500,
      kep: 'vendegkonyv.jpg'
    },
    {
      id: 6,
      nev: 'Ültetőkártya',
      ar: 200,
      kep: 'ultetokartya.jpg'
    },
    {
      id: 11,
      nev: 'Úszógyertya',
      ar: 300,
      kep: 'uszogyertya.jpg'
    },
    
    {
      id: 8,
      nev: 'Székmasni',
      ar: 400,
      kep: 'szekmasni.jpg'
    },
   
  ];
  

  constructor(
    private kosarService: KosarService,
  
  ) {}

  kosarbaRak(termek: any) {
    this.kosarService.hozzaad(termek);
  }

}
