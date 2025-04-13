import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  private currentUser: any = null;

  register(name: string, email: string, password: string): boolean {
    if (this.users.find(u => u.email === email)) return false;

    this.users.push({ name, email, password, rendelesek: [] });
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  addRendelesek(termekek: any[]) {
    if (this.currentUser) {
      this.currentUser.rendelesek.push(...termekek);
    }
  }
}
