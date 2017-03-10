import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { AudioContextService } from './services/audio-context.service';
import { PatternService } from './services/pattern.service';
import { PresetManagerService } from './services/preset-manager.service';
import sampleDir from '../samples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public channels = [];
  public presets = this.presetManager.get();
  public presetsList = Object.keys(this.presets);
  public sampleDir = sampleDir;
  public currentBar = 0;
  public activeStep;

  constructor(
    private audioContextService: AudioContextService,
    private sampler: SamplerService,
    private patternService: PatternService,
    private metronomeService: MetronomeService,
    private presetManager: PresetManagerService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.channels = this.presets.empty;
    this.activeStep = this.channels[0][0];

    sampler.load().subscribe(val => {
      const emitter = metronomeService.play().subscribe(({ time, length, bar }) => {
        this.currentBar = bar;
        this.changeDetector.detectChanges();

        this.channels.forEach(channel => {
          const sample = channel[bar];

          if (sample.on) {
            if (sample.pool.length === 1) {
              sampler.play(sample.pool[0]);
            } else {
              if (sample.pool.length === 0) {
                sampler.play(sampleDir[this.getRandomSample(sampleDir.length)]);
              } else {
                sampler.play(sample.pool[this.getRandomSample(sample.pool.length)]);
              }
            }
          }
        });
      });
    });
  }

  setActiveStep(step) {
    this.activeStep = step;
  }

  addPreset(presetName) {
    this.channels = [this.patternService.createSeq()];
    this.presetManager.save(presetName, this.channels);
    this.presets = this.presetManager.get();
    this.presetsList = Object.keys(this.presets);
    this.activeStep = this.channels[0][0];
  }

  savePreset(presetName) {
    this.presetManager.save(presetName, this.channels);
    this.presets = this.presetManager.get();
    this.presetsList = Object.keys(this.presets);
  }

  changePreset(presetName) {
    this.channels = this.presets[presetName];
    this.activeStep = this.channels[0][0];
  }

  addChannel() {
    const pattern = this.patternService.createSeq(this.channels.length);
    this.channels.push(pattern);
  }

  reset() {
    this.channels = [this.patternService.createSeq()];
    this.activeStep = this.channels[0][0];
  }

  getRandomSample(max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }
}
