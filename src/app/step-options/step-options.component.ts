import { Component, Input } from '@angular/core';
import sampleDir from '../../samples';

@Component({
  selector: 'app-step-options',
  templateUrl: './step-options.component.html',
  styleUrls: ['./step-options.component.css']
})
export class StepOptionsComponent {
  private sampleDir = sampleDir;
  @Input() step;

  constructor() {}

  addToPool(sample) {
    this.step.pool = this.step.pool.concat([sample]);
  }

  removeFromPool(sample) {
    this.step.pool = this.step.pool.filter(s => s !== sample);
  }
}
