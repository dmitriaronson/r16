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
    this.activeStep = { channel: null, id: null };

    this.api.get(this.presets.empty).subscribe(({ channels, tempo }) => {
      this.metronome.tempo = tempo;
      this.channels = channels;
      this.activeStep = this.channels[0][0];
    });

    this.sampler.load().subscribe(sampleName => {
      this.samples.push(sampleName);

      if (this.samples.length === sampleDir.length) {
        this.isLoadingSamples = false;
        this.changeDetector.detectChanges();
      }
    });

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
              const pool = sample.pool.length === 0 ? sampleDir : sample.pool;
              const randomSample = pool[this.getRandomSample(pool.length)];

              this.sampler.play(randomSample);
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
    const tempo = this.metronome.tempo;
    const isEmpty = this.channels.length === 1 && this.channels[0].every(({ on }) => !on );

    if (isEmpty) {
      return false;
    }

    this.api.post({ data: { channels: this.channels, tempo }}).subscribe(id => {
      window.location.replace(`//${window.location.host}/${id}`);
    });
  }

  copyStep() {
    this.stepCopy = this.activeStep.pool.slice();
  }

  pasteStep() {
    this.activeStep.pool = this.stepCopy.slice();
  }

  closeInfo() {
    this.infoModalIsOpen = false;
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

  onTempoChange(e) {
    let value = e.target.value;
    const regex = /^\d+$/;

    if (regex.test(value)) {
      value = parseInt(value, 10);
      this.metronome.tempo = value;
    }
  }

  reset() {
    this.channels = [this.patternService.createSeq()];
    this.activeStep = this.channels[0][0];
  }

  getRandomSample(max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }
}
