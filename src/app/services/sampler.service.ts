import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { AudioContextService } from './audio-context.service';
import { Observable } from 'rxjs/Observable';
import sampleDir from '../../samples';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SamplerService {
  public bank = {};
  private ctx: AudioContext = this.audioContextService.get();
  private gainNode = this.ctx.createGain();

  constructor(
    private audioContextService: AudioContextService,
    private http: Http
  ) {
    this.gainNode.gain.value = 0.1;
    this.gainNode.connect(this.ctx.destination);
  }

  loadSample(filename: string) {
    const params = { responseType: ResponseContentType.ArrayBuffer };

    return this.http.get(`samples/${filename}`, params)
      .map(response => response.arrayBuffer())
      .map(buffer => Observable.from(this.ctx.decodeAudioData(buffer).then(b => this.bank[filename] = b)));
  }

  load() {
    const loaders = sampleDir.map(filename => this.loadSample(filename));
    return Observable.forkJoin(loaders).map(res => res);
  }

  play(filename: string) {
    const buffer = this.bank[filename];
    const source = this.ctx.createBufferSource();

    source.buffer = buffer;

    source.connect(this.gainNode);
    source.start(0);
  }

}
