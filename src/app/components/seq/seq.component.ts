import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seq',
  templateUrl: './seq.component.html',
  styleUrls: ['./seq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeqComponent implements OnInit {
  @Input() seq;
  @Input() activeStep;
  @Input() currentBar;
  @Output() onSelect = new EventEmitter();
  @Output() onUpdate = new EventEmitter();
  public step;
  public buffer;

  ngOnInit() {}

  updateStep(step) {
    step.on = !step.on;
    this.onUpdate.emit(step);
  }

  selectStep(step) {
    this.onSelect.emit(step);
  }

  isActiveStep(channelId, index) {
    const { id, channel } = this.activeStep;
    return id === index && channel === channelId;
  }
}
