import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProfile',
})
export class ImageProfilePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    console.log(value);
    // return value.toLowerCase();
  }
}
