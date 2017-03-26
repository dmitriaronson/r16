import { PatternService } from '../services/pattern.service';
import { IStep } from '../interfaces/pattern';

export class Step implements IStep {
  id: number;
  channel = 0;
  on = false;
  freq = '';
  pool: string[] = [];

  constructor(id = 0, channel = 0) {
    this.id = id;
    this.channel = channel;
  }
}
