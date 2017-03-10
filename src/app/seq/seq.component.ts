import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seq',
  templateUrl: './seq.component.html',
  styleUrls: ['./seq.component.scss']
})
export class SeqComponent implements OnInit {
  @Input() pattern;
  @Input() activeStep;
  @Input() currentBar;
  @Output() onSelect = new EventEmitter();
  public buffer;

  ngOnInit() {
    this.buffer = this.pattern[0];
  }

  editStep(step) {
    this.onSelect.emit(step);
  }

  selectStep(step) {
    step.on = !step.on;

    if (step.on) {
      this.onSelect.emit(step);
    }
  }

  isActiveStep(stepChannel, i) {
    const { channel, id } = this.activeStep;
    return i === id && channel === stepChannel;
  }
}
