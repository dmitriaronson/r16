import { PatternService } from '../services/pattern.service';
import { IChannel, IStep } from '../interfaces/pattern';

export class Channel implements IChannel {
  id: number;
  seq: IStep[];
  fx: string[] = [];
  on = true;

  constructor(id = 0) {
    this.id = id;
    this.seq = PatternService.createSeq(id);
  }
}
