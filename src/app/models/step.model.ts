import { PatternService } from '../services/pattern.service';
import { IStep } from '../interfaces/pattern';

export class Step implements IStep {
  on = false;
  pool: string[];
  freq = '';
}
