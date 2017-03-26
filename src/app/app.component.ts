import { Component, OnInit, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SamplerService } from './services/sampler.service';
import { PatternService } from './services/pattern.service';
import { MetronomeService } from './services/metronome.service';
import { MidiService } from './services/midi.service';
import { PresetManagerService } from './services/preset-manager.service';
import { UtilsService } from './services/utils.service';
import { PatternActions } from './actions/pattern.actions';
import { SamplesActions } from './actions/samples.actions';
import { ActiveStepActions } from './actions/active-step.actions';
import { MetronomeActions } from './actions/metronome.actions';
import { IBar } from './interfaces/metronome';
import { IChannel, IStep } from './interfaces/pattern';
import { IMidiMessage } from './interfaces/midi';

import sampleDir from '../samples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @select(['metronome', 'index']) currentBar$: Observable<IBar[]>;
  @select(['sampler', 'loaded']) samples$: Observable<string[]>;
  @select(['pattern', 'channels']) channels$: Observable<IChannel[]>;
  @select(['activeStep', 'step']) activeStep$: Observable<IStep[]>;

  private channels: IChannel[] = [];
  private gain: AudioParam = this.sampler.gain;
  private dispatch = this.ngRedux.dispatch;
  private currentBar: EventEmitter<Number> = new EventEmitter();

  private loadPatterns = () => this.dispatch(this.patternActions.loadPattern());
  private loadSamples = () => this.dispatch(this.samplesActions.loadSamples());
  private addChannel = () => this.dispatch(this.patternActions.addChannel(this.channels.length));
  private updateChannel = (channel: IChannel) => this.dispatch(this.patternActions.updateChannel(channel));
  private updateStep = (step: IStep) => this.dispatch(this.patternActions.updateStep(step));
  private selectStep = (step: IStep) => this.dispatch(this.activeStep.select(step));
  private copyStep = () => this.dispatch(this.activeStep.copy());
  private pasteStep = () => this.dispatch(this.activeStep.paste());

  constructor(
    private sampler: SamplerService,
    private metronome: MetronomeService,
    private ngRedux: NgRedux<any>,
    private patternActions: PatternActions,
    private metronomeActions: MetronomeActions,
    private samplesActions: SamplesActions,
    private activeStep: ActiveStepActions,
    private patternService: PatternService,
    private midi: MidiService,
  ) {
    const id = UtilsService.getUrlId();

    this.loadPatterns();
    this.loadSamples();

    this.channels$
      .do(channels => this.selectStep(channels[0].seq[0]))
      .subscribe(channels => this.channels = channels);

    metronome.emitter.subscribe((bar: IBar) => this.onTick(bar));
  }

  ngOnInit(): void {
    this.midi.onMessage.subscribe(({ channel, note, velocity }: IMidiMessage) => {
      let step = this.channels[0].seq[note];

      if (velocity && step) {
        step = Object.assign({}, this.channels[0].seq[note]);
        step.on = !step.on;

        this.ngRedux.dispatch(this.patternActions.updateStep(step));
      }
    });
  }

  private onTick(bar: IBar): void {
    this.ngRedux.dispatch(this.metronomeActions.bang(bar));

    if (this.channels.length) {
      this.channels.forEach((channel: IChannel) => {
        if (!channel.on) {
          return false;
        }

        const index = bar.index;
        const step = channel.seq[index];

        if (step.on) {
          const pool = step.pool.length === 0 ? sampleDir : step.pool;
          const sample = pool[UtilsService.pickRandom(pool.length)];

          this.sampler.play(sample, channel.fx);
        }
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent): void {
    if (event.keyCode === 32) {
      event.preventDefault();
      this.metronome.play();
    }

    if (event.keyCode === 67) {
      this.copyStep();
    }

    if (event.keyCode === 86) {
      this.pasteStep();
    }
  }

}
