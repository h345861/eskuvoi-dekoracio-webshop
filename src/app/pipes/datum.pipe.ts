import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'datum'
})
export class DatumPipe implements PipeTransform {
  transform(value: Timestamp | Date | null | undefined): string {
    if (!value) return '';

    let datum: Date;

    if (value instanceof Timestamp) {
      datum = value.toDate();
    } else if (value instanceof Date) {
      datum = value;
    } else {
      return '';
    }

    return datum.toLocaleString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
