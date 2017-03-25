import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { bindActionCreators } from 'redux';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SamplerService } from '../../services/sampler.service';
import { PatternService } from '../../services/pattern.service';
import { MetronomeService } from '../../services/metronome.service';
import { AudioContextService } from '../../services/audio-context.service';
import { ApiService } from '../../services/api.service';
import { MidiService } from '../../services/midi.service';
import { PresetManagerService } from '../../services/preset-manager.service';
import { IBar } from '../../interfaces/metronome';
import sampleDir from '../../../samples';
import { NgRedux } from '@angular-redux/store';
import { PatternActions } from '../../actions/pattern.actions';
import { SamplesActions } from '../../actions/samples.actions';
import { ActiveStepActions } from '../../actions/active-step.actions';
import { MetronomeActions } from '../../actions/metronome.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public currentBar: EventEmitter<Number> = new EventEmitter();
  private disconnect: (a?:any) => void;
  private channels = [];
  public gain = this.sampler.gain;
  @select(['pattern', 'channels']) channels$: Observable<any[]>;
  @select(['metronome', 'index']) currentBar$: Observable<any[]>;
  @select(['sampler', 'loaded']) samples$: Observable<any[]>;
  @select(['activeStep']) activeStep$: Observable<any[]>;

  constructor(
    private sampler: SamplerService,
    private metronome: MetronomeService,
    private ngRedux: NgRedux<any>,
    private patternActions: PatternActions,
    private metronomeActions: MetronomeActions,
    private samplesActions: SamplesActions,
    private activeStep: ActiveStepActions,
    private patternService: PatternService,
    private midi: MidiService
  ) {
    const id = window.location.pathname.substr(1);

    ngRedux.dispatch(patternActions.loadPattern());
    ngRedux.dispatch(samplesActions.loadSamples());

    metronome.emitter.subscribe((bar: IBar) => this.onTick(bar));
    this.channels$
      .do(channels => ngRedux.dispatch(activeStep.select(channels[0].seq[0])))
      .subscribe(channels => this.channels = channels);
  }

  ngOnInit() {
    this.midi.onMessage.subscribe(({ channel, note, velocity }) => {
      let step = this.channels[0].seq[note];
      if (velocity && step) {
        step = Object.assign({}, this.channels[0].seq[note]);
        step.on = !step.on;

        this.ngRedux.dispatch(this.patternActions.updateStep(step));
      }
    });
  }

  onTick(bar: IBar) {
    this.ngRedux.dispatch(this.metronomeActions.bang(bar));

    if (this.channels.length) {
      this.channels.forEach(channel => {
        if (!channel.on) {
          return false;
        }

        const index = bar.index;
        const step = channel.seq[index];

        if (step.on) {
          if (step.pool.length === 1) {
            this.sampler.play(step.pool[0]);
          } else {
            const pool = step.pool.length === 0 ? sampleDir : step.pool;
            const randomSample = pool[this.getRandomSample(pool.length)];

            this.sampler.play(randomSample);
          }
        }
      });
    }
  }

  addChannel() {
    this.ngRedux.dispatch(this.patternActions.addChannel(this.patternService.createSeq(this.channels.length)));
  }

  updateChannel(channel) {
    this.ngRedux.dispatch(this.patternActions.updateChannel(channel));
  }

  updateStep(step) {
    this.ngRedux.dispatch(this.patternActions.updateStep(step));
  }

  selectStep(step) {
    this.ngRedux.dispatch(this.activeStep.select(step));
  }

  getRandomSample(max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
      this.metronome.play();
    }

    // if (event.keyCode === 67) {
    //   this.copyStep();
    // }

    // if (event.keyCode === 86) {
    //   this.pasteStep();
    // }
  }
}
