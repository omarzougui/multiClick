import { Observable } from "rxjs";
import { ButtonStateService } from "../services/button.service";

export function button (identifier): MethodDecorator {
  return function (target: Function, key: string, descriptor: any) {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      ButtonStateService[identifier] = true;
      const result = originalMethod.apply(this, args) as Observable<any>;

      result.subscribe(() => {
        ButtonStateService[identifier] = false;
      });

      return result;
    };

    return descriptor;
  };
}
