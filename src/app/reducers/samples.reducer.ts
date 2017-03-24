import { SamplesActions } from '../actions/samples.actions';
import { IPayloadAction } from '../interfaces/action';
import sampleDir from '../../samples';

interface ISamplesList {
  loaded: String[];
  sampleDir?: String[];
  loading: Boolean;
  error: any;
}

const INITIAL_STATE: ISamplesList = {
  sampleDir,
  loaded: [],
  loading: true,
  error: null,
};

export function samplesReducer(state: ISamplesList = INITIAL_STATE,
  action: IPayloadAction<String>): ISamplesList {
  switch (action.type) {
    case SamplesActions.LOAD_STARTED:
      return {
        loaded: [],
        loading: true,
        error: null,
      };
    case SamplesActions.SAMPLE_LOADED:
      return {
        loaded: state.loaded.concat([action.payload]),
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};
