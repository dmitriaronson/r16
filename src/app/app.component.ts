import { Component } from '@angular/core';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { AudioContextService } from './services/audio-context.service';
import sampleDir from '../samples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private channels;
  private defaultSeq;
  public sampleDir = sampleDir;

  constructor(
    private audioContextService: AudioContextService,
    private sampler: SamplerService,
    private metronomeService: MetronomeService,
  ) {
    this.channels = [this.createSeq()];

    sampler.load().subscribe(val => {
      const emitter = metronomeService.play().subscribe(({ time, length, bar }) => {
        this.channels.forEach(channel => {
          const sample = channel[bar];

          if (sample.on) {
            if (!sample.sample) {
              sampler.play(sampleDir[this.getRandomSample(sampleDir.length)]);
            } else {
              sampler.play(sample.sample);
            }
          }
        });
      });
    });
  }

  createSeq() {
    const seq = [];
    const step = { on: false, sample: '', freq: '' };

    for (let index = 0; index < 16; index += 1) {
      seq.push(Object.assign({}, step));
    }

    return seq;
  }

  addChannel() {
    this.channels.push(this.createSeq());
  }

  getRandomSample(max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }
}
