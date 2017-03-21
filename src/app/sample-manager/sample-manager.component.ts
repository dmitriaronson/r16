import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import sampleDir from '../../samples';

@Component({
  selector: 'app-sample-manager',
  templateUrl: './sample-manager.component.html',
  styleUrls: ['./sample-manager.component.scss']
})
export class SampleManagerComponent {
  private sampleDir = sampleDir;

  @Input() pool;
  @Input() samples;
  @Input() isLoading;
  @Output() onAdd = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  // ngOnChanges(changes) {
  //   console.log(changes);
  //   // if (changes[])
  // }
}
