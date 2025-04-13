import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-rendeles-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  styleUrls: ['./rendeles-dialog.component.scss'],
  template: `
    <h1 mat-dialog-title>✅ Rendelés leadva</h1>
    <div mat-dialog-content>
      <p>A rendeléseidet a profilodon megtekintheted.</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `
})
export class RendelesDialogComponent {}
