import { Injectable } from '@angular/core';
import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';

import { PatternActions } from '../actions/pattern.actions';
import { ActiveStepActions } from '../actions/active-step.actions';
import { PatternService } from '../services/pattern.service';

@Injectable()
export class PatternEpics {
  constructor(
    private patternService: PatternService,
    private actions: PatternActions,
    private activeStepActions: ActiveStepActions
  ) {}

  public createEpic() {
    const epics = combineEpics(
      this.createLoadEpic(),
      this.selectStepEpic(),
    );

    return createEpicMiddleware(epics);
  }

  private createLoadEpic() {
    return action$ => action$
      .ofType(PatternActions.LOAD_STARTED)
      .switchMap(a => this.patternService.getPattern()
        .map(({ tempo, channels }) => this.actions.loadSucceeded(tempo, channels))
        .catch((error) => Observable.of(this.actions.loadFailed({ status: error.message }))
      ));
  }

  private selectStepEpic() {
    return action$ => action$
      .ofType(PatternActions.STEP_UPDATED)
      .filter(({ step }) => step.on)
      .map(({ step }) => this.activeStepActions.select(step));
  }
}
