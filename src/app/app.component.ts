import { Component, ChangeDetectorRef, HostListener, ViewEncapsulation } from '@angular/core';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { AudioContextService } from './services/audio-context.service';
import { PatternService } from './services/pattern.service';
import { RandomService } from './services/random.service';
import { ApiService } from './services/api.service';
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
  public samples = [];
  public currentBar = 0;
  public isPlaying = false;
  public infoModalIsOpen = false;
  public isLoadingSamples = true;
  public gain = this.sampler.gain;
  public stepCopy;
  public activeStep;
  public title = this.randomService.getAppTitle();

  constructor(
    private audioContextService: AudioContextService,
    private sampler: SamplerService,
    private patternService: PatternService,
    private api: ApiService,
    private metronome: MetronomeService,
    private presetManager: PresetManagerService,
    private randomService: RandomService,
    private changeDetector: ChangeDetectorRef
  ) {
    const path = window.location.pathname.substr(1);
    this.channels = this.presets.empty;
    this.activeStep = this.channels[0][0];

    this.sampler.load().subscribe(sampleName => {
      this.samples.push(sampleName);

      if (this.samples.length === sampleDir.length) {
        this.isLoadingSamples = false;
        this.changeDetector.detectChanges();
      }
    });

    if (path) {
      this.api.get(path).subscribe(channels => {
        if (channels && channels.length) {
          this.channels = channels;
          this.activeStep = this.channels[0][0];
        } else {
          this.channels = this.presets.empty;
          this.activeStep = this.channels[0][0];
        }
      });
    } else {
      this.channels = this.presets.empty;
      this.activeStep = this.channels[0][0];
    }

    this.metronome.emitter.subscribe(({ time, length, bar }) => {
      this.currentBar = bar;
      this.changeDetector.detectChanges();

      if (this.channels.length) {
        this.channels.forEach(channel => {
          const sample = channel[bar];

          if (sample.on) {
            if (sample.pool.length === 1) {
              this.sampler.play(sample.pool[0]);
            } else {
              if (sample.pool.length === 0) {
                this.sampler.play(sampleDir[this.getRandomSample(sampleDir.length)]);
              } else {
                this.sampler.play(sample.pool[this.getRandomSample(sample.pool.length)]);
              }
            }
          }
        });
      }
    });
  }

  setActiveStep(step) {
    this.activeStep = step;
  }

  play() {
    this.metronome.play();
    this.isPlaying = this.metronome.isPlaying;
  }

  save() {
    this.api.post({ data: this.channels }).subscribe(id => {
      window.location.replace(`//${window.location.host}/${id}`);
    });
  }

  copyStep() {
    this.stepCopy = this.activeStep.pool.slice();
  }

  pasteStep() {
    this.activeStep.pool = this.stepCopy.slice();
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
      this.play();
    }

    if (event.keyCode === 67) {
      this.copyStep();
    }

    if (event.keyCode === 86) {
      this.pasteStep();
    }
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
