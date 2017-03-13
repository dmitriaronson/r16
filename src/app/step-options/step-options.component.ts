import { Component, Input, ChangeDetectorRef } from '@angular/core';
import sampleDir from '../../samples';

@Component({
  selector: 'app-step-options',
  templateUrl: './step-options.component.html',
  styleUrls: ['./step-options.component.scss']
})
export class StepOptionsComponent {
  private sampleDir = sampleDir;
  @Input() step;
  @Input() samples;
  @Input() isLoading;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  addToPool(sample) {
    this.step.pool = this.step.pool.concat([sample]);
    this.changeDetector.detectChanges();
  }

  removeFromPool(sample) {
    this.step.pool = this.step.pool.filter(s => s !== sample);
  }
}
