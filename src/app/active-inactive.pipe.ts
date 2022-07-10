import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeInactive'
})
export class ActiveInactivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? "Active" : "Inactive";
  }

}
