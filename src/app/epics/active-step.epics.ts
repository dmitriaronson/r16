import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';

import { ActiveStepActions } from '../actions/active-step.actions';
import { PatternActions } from '../actions/pattern.actions';
import { PatternService } from '../services/pattern.service';

@Injectable()
export class ActiveStepEpics {
  constructor(
    private patternActions: PatternActions,
    private actions: ActiveStepActions,
  ) {}

  public createEpic() {
    return createEpicMiddleware(this.createPastePoolEpic());
  }

  private createPastePoolEpic() {
    return (action$, store) => action$
      .ofType(ActiveStepActions.PASTE)
      .map(() => {
        const activeStep = store.getState().activeStep.step;
        return store.dispatch(this.patternActions.updateStep(activeStep));
      }).map(({ step: { id, channel } }) => {
        const step = store.getState().pattern.channels[channel].seq[id];
        return this.actions.select(step);
      });
  }
}
