import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { KosarElem } from '../models/kosar.model';

@Injectable({
  providedIn: 'root'
})
export class KosarService {
  private kosar: KosarElem[] = [];
  private kosarSubject = new BehaviorSubject<KosarElem[]>(this.kosar);
  kosar$ = this.kosarSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.betoltKosaratFirestorebol();
  }

  private async betoltKosaratFirestorebol() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const docRef = doc(this.firestore, 'kosarak', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.kosar = docSnap.data()['termekek'] || [];
      this.kosarSubject.next(this.kosar);
    }
  }

  private async mentsdKosaratFirestoreba() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const docRef = doc(this.firestore, 'kosarak', user.uid);
    await setDoc(docRef, { termekek: this.kosar });
  }

  hozzaad(termek: KosarElem) {
    const letezo = this.kosar.find(t => t.id === termek.id);
    if (letezo) {
      letezo.mennyiseg += 1;
    } else {
      this.kosar.push({ ...termek, mennyiseg: 1 });
    }
    this.kosarSubject.next(this.kosar);
    this.mentsdKosaratFirestoreba();
  }

  mennyisegNovel(termek: KosarElem) {
    termek.mennyiseg++;
    this.kosarSubject.next(this.kosar);
    this.mentsdKosaratFirestoreba();
  }

  mennyisegCsokkent(termek: KosarElem) {
    if (termek.mennyiseg > 1) {
      termek.mennyiseg--;
    } else {
      this.torol(termek);
      return; // mert torol már menti
    }
    this.kosarSubject.next(this.kosar);
    this.mentsdKosaratFirestoreba();
  }

  torol(termek: KosarElem) {
    this.kosar = this.kosar.filter(t => t.id !== termek.id);
    this.kosarSubject.next(this.kosar);
    this.mentsdKosaratFirestoreba();
  }

  urites() {
    this.kosar = [];
    this.kosarSubject.next(this.kosar);
    this.mentsdKosaratFirestoreba();
  }

  getKosar(): KosarElem[] {
    return this.kosar;
  }

  get kosarLista(): KosarElem[] {
    return this.kosar;
  }
}
