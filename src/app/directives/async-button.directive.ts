import { Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export enum ButtonState {
  active,
  pending,
}


@Directive({
  selector: '[appAsyncButton]'
})
export class AsyncButtonDirective implements OnInit {
  @HostBinding() disabled = false;
  @Input() timer = 0;
  @Output() debounceClick = new EventEmitter<BehaviorSubject<ButtonState>>();


  private clicks = new Subject();
  state$ = new BehaviorSubject<ButtonState>(ButtonState.active);
  private subscription: Subscription;

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.disabled = true;
    this.clicks.next(event);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.handleButtonStateChanges();
    this.handleClickStream();
  }

  private handleButtonStateChanges() {
    this.state$.subscribe((state: ButtonState) => {
      this.disabled = state === ButtonState.pending;
    });
  }

  private handleClickStream() {
    this.subscription = this.clicks.pipe(
      debounceTime(this.timer),
    ).subscribe(e => this.debounceClick.emit(this.state$));
  }
}

const pow = (button: BehaviorSubject<ButtonState>) => (source: Observable<any>) =>
  new Observable(observer => {

    return source.subscribe({
      next(x) {
        observer.next(x);
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  });
