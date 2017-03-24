import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Action, Store } from 'redux';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { PatternActions } from '../actions/pattern.actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class PatternEpics {
  constructor(
    private api: ApiService,
    private actions: PatternActions,
  ) {}

  public createEpic() {
    return createEpicMiddleware(this.createLoadEpic());
  }

  private createLoadEpic() {
    return action$ => action$
      .ofType(PatternActions.LOAD_STARTED)
      .switchMap(a => this.api.get('')
        .map(({ tempo, channels }) => this.actions.loadSucceeded(tempo, channels))
        .catch((error) => of(this.actions.loadFailed({ status: error.message }))
      ));
  }
}
