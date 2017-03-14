import { Injectable } from '@angular/core';
import { PatternService } from './pattern.service';
import defaultPresets from '../presets';

@Injectable()
export class PresetManagerService {
  private storageKey = 'random16-presets';
  private presets = null;
  private storage = window.localStorage;

  constructor(
    patternService: PatternService
  ) {
    const storageData = this.storage.getItem(this.storageKey) || '{}';
    const userPresets = JSON.parse(storageData);

    this.presets = Object.assign(defaultPresets, userPresets);
  }

  get() {
    return this.presets;
  }

  save(name, preset) {
    if (!this.presets) {
      this.presets = {};
    }

    this.presets[name] = preset;
    this.storage.setItem(this.storageKey, JSON.stringify(this.presets));
  }
}
