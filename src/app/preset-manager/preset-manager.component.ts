import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PresetManagerService } from '../services/preset-manager.service';
import { PatternService } from '../services/pattern.service';

@Component({
  selector: 'app-preset-manager',
  templateUrl: './preset-manager.component.html',
  styleUrls: ['./preset-manager.component.css']
})
export class PresetManagerComponent {
  @Input() presets;
  @Output() onChange = new EventEmitter();
  @Output() onSave;
  public currentPreset = 'empty';

  constructor(
    private presetManager: PresetManagerService,
  ) {}

  savePreset() {
    this.onSave('adsad');
  }

  onPresetSelect() {
    this.onChange.emit(this.currentPreset);
  }
}
