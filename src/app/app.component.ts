import { Component } from "@angular/core";
import { tap } from "rxjs/operators";
import { button } from "./decorators/button";
import { ButtonStateService } from "./services/button.service";
import { CarService } from "./services/car.service";

@Component({
  selector   : "app-root",
  templateUrl: "./app.component.html",
  styleUrls  : ["./app.component.css"]
})
export class AppComponent {
  buttonState: typeof ButtonStateService;

  constructor (private carService: CarService) {
    this.buttonState = ButtonStateService;
  }

  @button("test")
  getCars (carType) {
    const observable = this.carService.getCars();
    observable.subscribe(res => {
      console.log(res);
    });
    return observable;
  }

}
