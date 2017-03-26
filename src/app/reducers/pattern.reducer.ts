import { PatternActions } from '../actions/pattern.actions';
import { Channel } from '../models/channel.model';
import { IPattern, IChannel } from '../interfaces/pattern';
import { IPatternAction } from '../interfaces/actions';

interface IPatternState {
  channels?: IChannel[];
  tempo?: number;
  loading?: boolean;
  error?: any;
};

const INITIAL_STATE: IPatternState = {
  channels: [],
  tempo: 120,
  loading: true,
  error: null,
};

export function patternReducer(state: IPatternState = INITIAL_STATE, action: IPatternAction): IPatternState {
  switch (action.type) {
    case PatternActions.LOAD_STARTED:
      return INITIAL_STATE;

    case PatternActions.LOAD_SUCCEEDED:
      return {
        channels: action.channels,
        tempo: action.tempo,
        loading: false,
        error: null,
      };

    case PatternActions.LOAD_FAILED:
      return {
        channels: [],
        loading: false,
        error: action.error
      };

    case PatternActions.CHANNEL_ADDED:
      const id = state.channels.length;

      return {
        channels: state.channels.concat([ new Channel(id) ]),
      };

    case PatternActions.STEP_UPDATED:
      const step = action.step;
      const channels = state.channels;

      channels[step.channel].seq[step.id] = step;

      return { channels };

    case PatternActions.CHANNEL_UPDATED:
      const updated = state.channels.slice();

      updated[action.channel.id] = action.channel;

      return { channels: updated };

    default:
      return state;
  }
};
