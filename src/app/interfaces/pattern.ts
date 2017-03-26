export interface IPattern {
  channels: IChannel[];
  tempo: Number;
}

export interface IChannel {
  id: number;
  on: Boolean;
  seq: IStep[];
  fx: any[];
}

export interface IStep {
  id: number;
  channel: number;
  on: Boolean;
  pool: Array<string>;
  freq: String;
}
