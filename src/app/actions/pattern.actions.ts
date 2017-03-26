import { Injectable } from '@angular/core';

@Injectable()
export class PatternActions {
  static readonly LOAD_STARTED = 'PATTERN_LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'PATTERN_LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'PATTERN_LOAD_FAILED';
  static readonly STEP_UPDATED = 'PATTERN_STEP_UPDATED';
  static readonly CHANNEL_ADDED = 'PATTERN_CHANNEL_ADDED';
  static readonly CHANNEL_UPDATED = 'PATTERN_CHANNEL_UPDATED';

  loadPattern() {
    return { type: PatternActions.LOAD_STARTED };
  }

  loadSucceeded(tempo, channels) {
    return { type: PatternActions.LOAD_SUCCEEDED, tempo, channels };
  }

  loadFailed(error) {
    return { type: PatternActions.LOAD_FAILED, error };
  }

  updateStep(step) {
    return { type: PatternActions.STEP_UPDATED, step };
  }

  addChannel(channel) {
    return { type: PatternActions.CHANNEL_ADDED, channel };
  }

  updateChannel(channel) {
    return { type: PatternActions.CHANNEL_UPDATED, channel };
  }
}
