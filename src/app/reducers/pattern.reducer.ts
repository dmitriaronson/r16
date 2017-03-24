import { PatternActions } from '../actions/pattern.actions';
import { IPattern, IChannel } from '../interfaces/pattern';
import { IPayloadAction } from '../interfaces/action';

const INITIAL_STATE: IPattern = {
  channels: [],
  tempo: 120,
  loading: true,
  error: null,
};

export function patternReducer(state: IPattern = INITIAL_STATE,
  action: IPayloadAction<IChannel[]>): IPattern {
  switch (action.type) {
    case PatternActions.LOAD_STARTED:
      return {
        channels: [],
        tempo: 120,
        loading: true,
        error: null,
      };
    case PatternActions.LOAD_SUCCEEDED:
      return {
        channels: action.payload,
        tempo: 120,
        loading: true,
        error: null,
      };
    case PatternActions.LOAD_FAILED:
      return {
        channels: [],
        loading: false,
        error: action.error
      };
    case PatternActions.LOAD_FAILED:
      return {
        channels: [],
        loading: false,
        error: action.error
      };
    case PatternActions.CHANNEL_ADDED:
      const newChannel: any = {
        id: state.channels.length,
        on: true,
        seq: action.payload,
      };

      const update = state.channels.concat([ newChannel ]);

      return {
        channels: update,
      };
    case PatternActions.STEP_UPDATED:
      const step = action.payload;
      const channels = state.channels;

      channels[step['channel']][step['id']] = step;

      return {
        channels: channels,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
