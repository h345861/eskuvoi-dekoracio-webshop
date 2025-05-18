export interface Felhasznalo {
  uid: string;
  email: string;
  nev: string;
  szerep: 'vasarlo' | 'admin';
  id?: string;
}
