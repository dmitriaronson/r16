import { ActiveStepActions } from '../actions/active-step.actions';
import { Step } from '../models/step.model';
import { IBar } from '../interfaces/metronome';
import { IStep } from '../interfaces/pattern';
import { IStepAction } from '../interfaces/actions';

interface IStepState {
  step?: IStep;
  pool?: string[];
}

const INITIAL_STATE: IStepState = {
  step: new Step(),
  pool: [],
};

export function activeStepReducer(state = INITIAL_STATE, action: IStepAction): IStepState {
  switch (action.type) {
    case ActiveStepActions.SELECT:
      return Object.assign({}, state, { step: action.step });

    case ActiveStepActions.COPY:
      state.pool = state.step.pool.slice();
      return state;

    case ActiveStepActions.PASTE:
      state.step.pool = state.pool.slice();

      return state;

    default:
      return state;
  }
};
