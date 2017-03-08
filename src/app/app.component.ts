import { Component } from '@angular/core';
import { SamplerService } from './services/sampler.service';
import { MetronomeService } from './services/metronome.service';
import { AudioContextService } from './services/audio-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private audioContextService: AudioContextService,
    private samplerService: SamplerService,
    private metronomeService: MetronomeService,
  ) {
    // this.samplerService = new SamplerService(this.ctx);
    metronomeService.play();
  }
}
