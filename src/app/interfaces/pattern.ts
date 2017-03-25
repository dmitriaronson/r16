export interface IPattern {
  channels?: IChannel[];
  tempo?: Number;
  loading?: Boolean;
  error?: any;
}

export interface IChannel {
  id?: number;
  on?: Boolean;
  seq?: IStep[];
  fx?: any[];
}

export interface IStep {
  on: Boolean;
  pool: Array<string>;
  freq: String;
}
