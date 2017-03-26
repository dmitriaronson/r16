import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { PatternEpics } from '../epics/pattern.epics';
import { SamplesEpics } from '../epics/samples.epics';
import { ActiveStepEpics } from '../epics/active-step.epics';

@Injectable()
export class RootEpics {
  constructor(
    private patternEpics: PatternEpics,
    private samplesEpics: SamplesEpics,
    private activeStepEpics: ActiveStepEpics
  ) {}

  public createEpics() {
    return [
      this.patternEpics.createEpic(),
      this.samplesEpics.createEpic(),
      this.activeStepEpics.createEpic(),
    ];
  }
}
