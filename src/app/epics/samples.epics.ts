import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Action, Store } from 'redux';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SamplesActions } from '../actions/samples.actions';
import { SamplerService } from '../services/sampler.service';

@Injectable()
export class SamplesEpics {
  constructor(
    private sampler: SamplerService,
    private actions: SamplesActions,
  ) {}

  public createEpic() {
    return createEpicMiddleware(this.createLoadEpic());
  }

  private createLoadEpic() {
    return action$ => action$
      .ofType(SamplesActions.LOAD_STARTED)
      .switchMap(a => this.sampler.load()
        .map((sample: String) => this.actions.sampleLoaded(sample))
        .catch((error) => of(this.actions.loadFailed({ status: error.message }))
      ));
  }
}
