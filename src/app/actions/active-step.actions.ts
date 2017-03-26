import { Injectable } from '@angular/core';

@Injectable()
export class ActiveStepActions {
  static readonly SELECT = 'ACTIVE_STEP_SELECTED';
  static readonly COPY = 'ACTIVE_STEP_COPY';
  static readonly PASTE = 'ACTIVE_STEP_PASTE';

  select(step) {
    return { type: ActiveStepActions.SELECT, step };
  }

  copy() {
    return { type: ActiveStepActions.COPY };
  }

  paste() {
    return { type: ActiveStepActions.PASTE };
  }
}
