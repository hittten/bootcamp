import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    if (value < 60) {
      return value + 's';
    }

    const minutes = Math.trunc(value / 60);
    const seconds = value % 60;

    return `${minutes}m:${seconds}s`;
  }
}
