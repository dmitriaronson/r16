import { Injectable } from '@angular/core';

@Injectable()
export class PatternService {

  constructor() {}

  createSeq(channelId = 0) {
    const seq = [];
    const step = { on: false, pool: [], freq: '' };

    for (let index = 0; index < 16; index += 1) {
      seq.push(Object.assign({ channel: channelId, id: index }, step));
    }

    return seq;
  }
}
