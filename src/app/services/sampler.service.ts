import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { AudioContextService } from './audio-context.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import sampleDir from '../../samples';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class SamplerService {
  public bank = {};
  private ctx: AudioContext = this.audioContextService.get();
  private gainNode = this.ctx.createGain();
  public gain = this.gainNode.gain;
  public loader = new Subject();

  constructor(
    private audioContextService: AudioContextService,
    private http: Http
  ) {
    this.gain.value = 0.5;
    this.gainNode.connect(this.ctx.destination);
  }

  loadSample(filename: string) {
    const params = { responseType: ResponseContentType.ArrayBuffer };
    return this.http.get(`samples/${filename}`, params).map(r => r.arrayBuffer());
  }

  load() {
    sampleDir.map(filename => {
      this.loadSample(filename).subscribe(buffer => {
        this.ctx.decodeAudioData(buffer, (audioBuffer) => {
          this.bank[filename] = audioBuffer;
          this.loader.next(filename);
        }, err => console.log(err));
      });
    });
  }

  play(filename: string) {
    const buffer = this.bank[filename];

    if (!buffer) {
      return false;
    }

    const source = this.ctx.createBufferSource();

    source.buffer = buffer;

    source.connect(this.gainNode);
    source.start(0);
  }

}
