import { Injectable } from '@angular/core';
import { Step } from '../models/step.model';
import { IStep } from '../interfaces/pattern';

@Injectable()
export class PatternService {
  static createSeq(channelId = 0, bars = 16): IStep[] {
    const seq = [];
    const step = new Step();

    for (let index = 0; index < bars; index += 1) {
      seq.push(Object.assign({ channel: channelId, id: index }, step));
    }

    return seq;
  }

  constructor() {}

}
