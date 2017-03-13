import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() title = 'R16';
  @Input() isOpen = false;
  @Output() close = new EventEmitter();

  constructor() { }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
