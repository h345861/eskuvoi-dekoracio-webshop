import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Velemeny } from '../models/velemeny.model';
import { doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VelemenyService {
  constructor(private firestore: Firestore) {}

  async hozzadVelemeny(velemeny: Velemeny) {
    const colRef = collection(this.firestore, 'velemenyek');
    await addDoc(colRef, velemeny);
  }

  async lekerVelemenyek(): Promise<Velemeny[]> {
    const colRef = query(collection(this.firestore, 'velemenyek'), orderBy('datum', 'desc'));
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({
      ...(doc.data() as Velemeny),
      id: doc.id
    }));
  }

    async frissitVelemeny(id: string, ujSzoveg: string) {
    if (!id || !ujSzoveg) return;

    const docRef = doc(this.firestore, 'velemenyek', id);
    await updateDoc(docRef, { szoveg: ujSzoveg });
  }

    async torolVelemeny(id: string) {
    const docRef = doc(this.firestore, 'velemenyek', id);
    await deleteDoc(docRef);
    }
}
