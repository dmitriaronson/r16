import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PresetManagerService } from '../services/preset-manager.service';
import { PatternService } from '../services/pattern.service';

@Component({
  selector: 'app-preset-manager',
  templateUrl: './preset-manager.component.html',
  styleUrls: ['./preset-manager.component.scss']
})
export class PresetManagerComponent implements OnInit {
  private isAddingNewPreset = false;
  @Input() presets;
  @Output() onChange = new EventEmitter();
  @Output() onAdd = new EventEmitter();;
  @Output() onSave = new EventEmitter();;
  public presetName: string;
  public currentPreset = 'empty';

  constructor(
    private presetManager: PresetManagerService,
  ) {}

  ngOnInit() {
    this.presetName = `Preset ${this.presets.length}`;
  }

  addPreset() {
    this.onAdd.emit(this.presetName);
    this.currentPreset = this.presetName;
    this.onChange.emit(this.presetName);
    this.isAddingNewPreset = false;
  }

  savePreset() {
    this.onSave.emit(this.currentPreset);
  }

  onPresetSelect() {
    this.onChange.emit(this.currentPreset);
  }
}
