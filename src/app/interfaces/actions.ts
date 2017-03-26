import { Action } from 'redux';
import { IChannel, IStep } from '../interfaces/pattern';
import { IBar } from '../interfaces/metronome';

export interface IPatternAction extends Action {
  channels?: IChannel[];
  channel?: IChannel;
  tempo?: number;
  seq?: IStep[];
  step?: IStep;
  error?: any;
  loading?: Boolean;
}

export interface ISamplesAction extends Action {
  loaded: string[];
  loading: boolean;
  sampleName: string;
  error: any;
}

export interface IBarAction extends Action {
  type: String;
  bar: IBar;
}

export interface IStepAction extends Action {
  step: IStep;
  pool: string[];
}
