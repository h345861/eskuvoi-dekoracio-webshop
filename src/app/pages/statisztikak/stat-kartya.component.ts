import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-kartya',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kartya" (click)="kartyaKlikk.emit()">
      <h4>{{ cim }}</h4>
      <p>{{ adat }}</p>
    </div>
  `,
  styleUrls: ['./stat-kartya.component.scss']
})
export class StatKartyaComponent {
  @Input() cim!: string;
  @Input() adat!: string;
  @Output() kartyaKlikk = new EventEmitter<void>();
}