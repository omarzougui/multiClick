import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getCars(): Observable<any> {
   return of('abc').pipe(delay(3000));
  }
}
