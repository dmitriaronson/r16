import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class ActiveStepActions {
  static readonly SELECT = 'ACTIVE_STEP_SELECTED';

  select(step) {
    return {
      type: ActiveStepActions.SELECT,
      step,
    };
  }
}
