import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';

import { PatternActions } from '../actions/pattern.actions';
import { PatternService } from '../services/pattern.service';

@Injectable()
export class PatternEpics {
  constructor(
    private patternService: PatternService,
    private actions: PatternActions,
  ) {}

  public createEpic() {
    return createEpicMiddleware(this.createLoadEpic());
  }

  private createLoadEpic() {
    return action$ => action$
      .ofType(PatternActions.LOAD_STARTED)
      .switchMap(a => this.patternService.getPattern()
        .map(({ tempo, channels }) => this.actions.loadSucceeded(tempo, channels))
        .catch((error) => Observable.of(this.actions.loadFailed({ status: error.message }))
      ));
  }
}
