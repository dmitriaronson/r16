import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import sampleDir from '../../../samples';

@Component({
  selector: 'app-sample-manager',
  templateUrl: './sample-manager.component.html',
  styleUrls: ['./sample-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleManagerComponent implements OnInit {
  private sampleDir = sampleDir;
  private pool: Observable<{}>;

  @Input() samples;
  @Input() step;
  @Input() isLoading;
  @Output() onUpdate = new EventEmitter();

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  addSample(sample) {
    this.step.pool = this.step.pool.concat([sample]);
    this.onUpdate.emit(this.step);
  }

  removeSample(sample) {
    this.step.pool = this.step.pool.filter(s => s !== sample);
    this.onUpdate.emit(this.step);
  }
}
