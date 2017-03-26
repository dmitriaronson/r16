import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PresetManagerService } from '../../services/preset-manager.service';
import { PatternService } from '../../services/pattern.service';

@Component({
  selector: 'app-preset-manager',
  templateUrl: './preset-manager.component.html',
  styleUrls: ['./preset-manager.component.scss']
})
export class PresetManagerComponent {
  @Output() onChange = new EventEmitter();
  private selectedPattern = { id: null };
  private patterns;
  private patternsList;

  constructor(
    private presetManager: PresetManagerService,
    private patternService: PatternService,
  ) {
    this.patternService.getPatterns().subscribe((patterns) => {
      this.patterns = patterns;
      this.selectedPattern = patterns[0];
    });
  }

  onSelect() {
    this.onChange.emit(this.selectedPattern);
  }
}
