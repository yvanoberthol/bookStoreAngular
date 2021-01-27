import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLight'
})
export class HighLightPipe implements PipeTransform {

  transform(value: any, searchText: any): any {
    if (!searchText) {
      return value;
    }
    const re = new RegExp(searchText, 'gi');
    return value.replace(re, '<b class="text-secondary">' + searchText + '</b>' );
  }

}
