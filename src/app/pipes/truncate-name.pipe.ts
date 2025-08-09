import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, maxLength: number, form: "..."): unknown {
    return value.length > maxLength ? value.substring(0, maxLength) + form : value;
  }

}
