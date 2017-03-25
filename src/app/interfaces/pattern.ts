export interface IPattern {
  channels?: IChannel[];
  tempo?: Number;
  loading?: Boolean;
  error?: any;
}

export interface IChannel {
  id?: number;
  on?: Boolean,
  seq?: IStep[],
}

export interface IStep {
  on: Boolean;
  pool: Array<String>;
  freq: String;
}
