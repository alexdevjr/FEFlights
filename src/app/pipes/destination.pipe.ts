import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'destination'
})
export class DestinationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(!value)return null;
    if(!args)return value;

    const resultdestination = [];

    for( const destination of value){
      if(destination?.destination.toLowerCase().indexOf(args)  > -1) {
        resultdestination.push(destination);
      } else if(destination.destination.indexOf(args)  > -1) {
        resultdestination.push(destination);
      }
     
    };

    return resultdestination;
  }

}
