import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { Rendeles } from '../models/rendeles.model';
import { Felhasznalo } from '../models/felhasznalo.model';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  constructor(private firestore: Firestore) {}

  async lekerRendelesek(felhasznaloId: string): Promise<Rendeles[]> {
    const q = query(collection(this.firestore, 'rendelesek'), where('felhasznaloId', '==', felhasznaloId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        datum: (data['datum'] as Timestamp).toDate()
      } as Rendeles;
    });
  }

  async frissitProfilAdatokat(uid: string, ujNev: string) {
    const q = query(collection(this.firestore, 'felhasznalok'), where('uid', '==', uid));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const docRef = doc(this.firestore, 'felhasznalok', snapshot.docs[0].id);
    await updateDoc(docRef, { nev: ujNev });
  }
  async frissitNev(uid: string, ujNev: string) {
  const q = query(collection(this.firestore, 'felhasznalok'), where('uid', '==', uid));
  const snapshot = await getDocs(q);
  for (let docSnap of snapshot.docs) {
    await updateDoc(doc(this.firestore, 'felhasznalok', docSnap.id), { nev: ujNev });
  }
}
}
