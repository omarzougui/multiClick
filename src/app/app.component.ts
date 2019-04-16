import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { tap } from 'rxjs/operators';
import { ButtonState } from './directives/async-button.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private carService: CarService) {
  }

  getCars(btnState, carType) {
    this.carService.getCars().pipe(
      tap(() => {btnState.next(ButtonState.active); })
    ).subscribe(res => {
      console.log(res);
    });
  }

}
