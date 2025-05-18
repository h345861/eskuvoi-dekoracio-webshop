import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Felhasznalo } from '../models/felhasznalo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserData: Felhasznalo | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.ngZone.run(() => {
          this.loadUserData(user.uid);
        });
      } else {
        this.currentUserData = null;
      }
    });
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);

      await addDoc(collection(this.firestore, 'felhasznalok'), {
        uid: cred.user.uid,
        email,
        nev: name,
        szerep: 'vasarlo'
      });

      await this.loadUserData(cred.user.uid);
      return true;

    } catch (error: any) {
      console.error('Regisztráció hiba:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Ez az email cím már regisztrálva van. Kérlek, jelentkezz be!');
      } else {
        alert('Hiba történt a regisztráció során. Próbáld újra.');
      }
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      await this.loadUserData(result.user.uid);
      return true;
    } catch (error) {
      console.error('Bejelentkezés hiba:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUserData = null;
  }

  async loadUserData(uid: string) {
    const q = query(collection(this.firestore, 'felhasznalok'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnap) => {
      this.currentUserData = {
        ...(docSnap.data() as Felhasznalo),
        id: docSnap.id
      };
    });
  }

  getCurrentUser(): Felhasznalo | null {
    return this.currentUserData;
  }

  async addRendeles(termekek: any[]) {
    const user = this.getCurrentUser();
    if (!user) return;

    const rendeles = {
      felhasznaloId: user.uid,
      termekek,
      datum: new Date(),
      osszeg: termekek.reduce((sum: number, t: any) => sum + t.ar * t.mennyiseg, 0)
    };

    await addDoc(collection(this.firestore, 'rendelesek'), rendeles);
  }

  async torolFelhasznalo(): Promise<boolean> {
    const user = this.auth.currentUser;
    const adat = this.getCurrentUser();

    if (user && adat) {
      try {
        const docRef = doc(this.firestore, 'felhasznalok', adat.id!);
        await deleteDoc(docRef);
        await deleteUser(user);
        this.currentUserData = null;
        return true;
      } catch (error) {
        console.error('Hiba a felhasználó törlésekor:', error);
        return false;
      }
    }

    return false;
  }


  async jelszoModositas(jelenlegiJelszo: string, ujJelszo: string): Promise<boolean> {
    const user = this.auth.currentUser;

    if (!user || !jelenlegiJelszo.trim() || !ujJelszo.trim()) {
      alert('Kérlek, add meg a jelenlegi és az új jelszavadat.');
      return false;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email!, jelenlegiJelszo);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, ujJelszo);
      alert('Jelszó sikeresen módosítva.');
      return true;

    } catch (error: any) {
      console.error('Jelszó módosítás hiba:', error);

      if (error.code === 'auth/wrong-password') {
        alert('Hibás jelenlegi jelszó.');
      } else if (error.code === 'auth/weak-password') {
        alert('A jelszónak legalább 6 karakter hosszúnak kell lennie.');
      } else if (error.code === 'auth/requires-recent-login') {
        alert('A módosításhoz újra kell jelentkezned. Kérlek, jelentkezz ki, majd be újra.');
      } else {
        alert('Nem sikerült módosítani a jelszót.');
      }

      return false;
    }
  }
}
