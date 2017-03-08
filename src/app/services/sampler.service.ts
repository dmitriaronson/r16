import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { AudioContextService } from './audio-context.service';

import 'rxjs/add/operator/map';

@Injectable()
export class SamplerService {
  // private bank = {};
  // public ctx;

  constructor(
    private ctx: AudioContextService,
    private http: Http
  ) {}

  loadSample(filename: string) {
    // return this.http.get(`samples/${filename}.wav`, { responseType: ResponseContentType.ArrayBuffer })
    //   .map((response) => {
    //     const body = response.arrayBuffer();
    //     // this.ctx.decodeAudioData(body, (buffer) => {
    //     this.bank[filename] = body;
    //     // }, (error) => console.log(error));
    // });
  }

  play(filename: string) {
    // const body = this.bank[filename];
    // const source = this.ctx.createBufferSource();

    // this.ctx.decodeAudioData(body, (buffer) => {
    //   source.buffer = buffer;

    //   source.connect(this.ctx.destination);
    //   source.start(0);
    // }, (error) => console.log(error));
  }

}
