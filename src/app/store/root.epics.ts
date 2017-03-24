import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { PatternEpics } from '../epics/pattern.epics';
import { SamplesEpics } from '../epics/samples.epics';

@Injectable()
export class RootEpics {
  constructor(
    private patternEpics: PatternEpics,
    private samplesEpics: SamplesEpics
  ) {}

  public createEpics() {
    return [
      this.patternEpics.createEpic(),
      this.samplesEpics.createEpic(),
    ];
  }
}
