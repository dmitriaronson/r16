import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventDefault]'
})
export class PreventDefaultDirective {

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
