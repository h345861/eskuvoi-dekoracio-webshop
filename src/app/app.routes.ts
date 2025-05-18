import { StatisztikakComponent } from './pages/statisztikak/statisztikak.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermekekComponent } from './pages/termekek/termekek.component';
import { VelemenyekComponent } from './pages/velemenyek/velemenyek.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { KosarComponent } from './pages/kosar/kosar.component';
import { LogregComponent } from './pages/logreg/logreg.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'termekek', component: TermekekComponent },
  { path: 'velemenyek', component: VelemenyekComponent },
  { path: 'kosar', component: KosarComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'logreg', component: LogregComponent },
  { path: 'statisztika', component: StatisztikakComponent, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }