import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forint',
  standalone: true
})
export class ForintPipe implements PipeTransform {

  transform(ertek: number): string{
    return `${ertek.toLocaleString('hu-HU')} Ft`;
  }
}

