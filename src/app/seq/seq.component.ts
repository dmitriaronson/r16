import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seq',
  templateUrl: './seq.component.html',
  styleUrls: ['./seq.component.scss']
})
export class SeqComponent {
  @Input() pattern;
  @Input() activeStep;
  @Input() currentBar;
  @Output() onSelect = new EventEmitter();

  selectStep(step) {
    this.onSelect.emit(step);
  }

  isActiveStep(stepChannel, i) {
    const { channel, id } = this.activeStep;
    return i === id && channel === stepChannel;
  }
}
