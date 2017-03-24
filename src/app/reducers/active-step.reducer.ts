import { ActiveStepActions } from '../actions/active-step.actions';
import { IBar } from '../interfaces/metronome';
import { IStep } from '../interfaces/pattern';

const INITIAL_STATE: IStep = {
  on: false,
  pool: [],
  freq: '',
};

interface IStepAction {
  type: String;
  step: IStep;
}

export function activeStepReducer(state: IStep = INITIAL_STATE,
  action: IStepAction): IStep {
  switch (action.type) {
    case ActiveStepActions.SELECT:
      return action.step;
    default:
      return state;
  }
};
