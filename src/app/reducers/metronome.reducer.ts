import { MetronomeActions } from '../actions/metronome.actions';
import { IBar } from '../interfaces/metronome';

const INITIAL_STATE: IBar = {
  time: 0,
  length: 0,
  index: 0
};

interface IBarAction {
  type: String;
  bar: IBar;
}

export function metronomeReducer(state: IBar = INITIAL_STATE,
  action: IBarAction): IBar {
  switch (action.type) {
    case MetronomeActions.BANG:
      return action.bar;
    default:
      return state;
  }
};
