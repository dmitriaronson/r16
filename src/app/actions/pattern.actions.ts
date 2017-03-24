import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class PatternActions {
  static readonly LOAD_STARTED = 'PATTERN_LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'PATTERN_LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'PATTERN_LOAD_FAILED';
  static readonly STEP_UPDATED = 'PATTERN_STEP_UPDATED';
  static readonly CHANNEL_ADDED = 'PATTERN_CHANNEL_ADDED';

  loadPattern() {
    return {
      type: PatternActions.LOAD_STARTED,
    };
  }

  loadSucceeded(tempo, payload) {
    return {
      type: PatternActions.LOAD_SUCCEEDED,
      tempo,
      payload,
    };
  }

  loadFailed(error) {
    return {
      type: PatternActions.LOAD_FAILED,
      error,
    };
  }

  updateStep(payload) {
    return {
      type: PatternActions.STEP_UPDATED,
      payload,
    }
  }

  addChannel(payload) {
    return {
      type: PatternActions.CHANNEL_ADDED,
      payload,
    }
  }
}
