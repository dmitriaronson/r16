import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class MetronomeActions {
  static readonly BANG = 'BANG';

  bang(bar) {
    return {
      type: MetronomeActions.BANG,
      bar,
    };
  }
}
