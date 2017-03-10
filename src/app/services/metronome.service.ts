import { Injectable } from '@angular/core';
import { AudioContextService } from './audio-context.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MetronomeService {
  private timerWorker;
  private current16thNote;
  private lookahead = 25.0;
  private tempo = 120.0;
  private nextNoteTime = 0.0;
  private noteResolution = 0;
  private notesInQueue = [];
  public isPlaying = false;
  private scheduleAheadTime = 0.1;
  private ctx: AudioContext = this.audioContextService.get();

  public emitter = new Subject();

  constructor(
    private audioContextService: AudioContextService,
  ) {
    this.timerWorker = new Worker('workers/metronome-worker.js');
    this.timerWorker.onmessage = (e) => {
      if (e.data === 'tick') {
        this.scheduler();
      } else {
        console.log(`message: ${e.data}`);
      }
    };
    this.timerWorker.postMessage({ interval: this.lookahead });
  }

  nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime = this.nextNoteTime + 0.25 * secondsPerBeat;

    this.current16thNote = this.current16thNote + 1;

    if (this.current16thNote === 16) {
      this.current16thNote = 0;
    }
  }

  scheduleNote(beatNumber, time) {
    this.notesInQueue.push( { note: beatNumber, time: time } );

    if ((this.noteResolution === 1) && (beatNumber % 2)) {
      return;
    }

    if ((this.noteResolution === 2) && (beatNumber % 4)) {
      return;
    }

    this.emitter.next({ bar: beatNumber, time, length: time + 0.05 });
  }

  scheduler() {
    while (this.nextNoteTime < (this.ctx.currentTime + this.scheduleAheadTime)) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }

  play() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.current16thNote = 0;
      this.nextNoteTime = this.ctx.currentTime;
      this.timerWorker.postMessage('start');
    } else {
      this.timerWorker.postMessage('stop');
    }

    return this.emitter;
  }

}
