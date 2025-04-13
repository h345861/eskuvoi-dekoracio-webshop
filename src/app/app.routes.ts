import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermekekComponent } from './pages/termekek/termekek.component';
import { VelemenyekComponent } from './pages/velemenyek/velemenyek.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { KosarComponent } from './pages/kosar/kosar.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'termekek', component: TermekekComponent },
  { path: 'velemenyek', component: VelemenyekComponent },
  { path: 'kosar', component: KosarComponent },
  { path: 'profil', component: ProfilComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }