import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'origin'
})
export class OriginPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(!value)return null;
    if(!args)return value;

    const resultOrigin = [];

    for( const origin of value){
      if(origin?.origin.toLowerCase().indexOf(args)  > -1){
        resultOrigin.push(origin);
      } else if(origin.origin.indexOf(args)  > -1){
        resultOrigin.push(origin);
      }
     
    };

    return resultOrigin;

  }

}
