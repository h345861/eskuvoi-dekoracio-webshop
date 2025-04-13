import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KosarService {
  
  private kosar: any[] = [];
  private kosarSubject = new BehaviorSubject<any[]>(this.kosar);
  kosar$ = this.kosarSubject.asObservable();


  mennyisegNovel(termek: any) {
    termek.mennyiseg++;
    this.kosarSubject.next(this.kosar);
  }


  mennyisegCsokkent(termek: any) {
    if (termek.mennyiseg > 1) {
      termek.mennyiseg--;
    } else {
      this.torol(termek);
    }
    this.kosarSubject.next(this.kosar);
  }


  torol(termek: any) {
    this.kosar = this.kosar.filter(t => t !== termek);
    this.kosarSubject.next(this.kosar);
  }


  urites() {
    this.kosar = [];
    this.kosarSubject.next(this.kosar);
  }

  getKosar(): any[] {
    return this.kosar;
  }
  
  hozzaad(termek: any) {
    const letezo = this.kosar.find(t => t.id === termek.id);
    if (letezo) {
      letezo.mennyiseg += 1;
    } else {
      this.kosar.push({ ...termek, mennyiseg: 1 });
    }
    this.kosarSubject.next(this.kosar);
  }

  
  get kosarLista() {
    return this.kosar;
  }
}
