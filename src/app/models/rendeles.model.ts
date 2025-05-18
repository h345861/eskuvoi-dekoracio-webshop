export interface Rendeles {
  felhasznaloId: string;
  datum: Date;
  osszeg: number;
  termekek: {
    termekId: string;
    nev: string;        
    kepUrl: string;
    ar: number;
    mennyiseg: number;
    hazhozszallitas: boolean;
  }[];
}
