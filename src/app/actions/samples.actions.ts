import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class SamplesActions {
  static readonly LOAD_STARTED = 'SAMPLES_LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'SAMPLES_LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'SAMPLES_LOAD_FAILED';
  static readonly SAMPLE_LOADED = 'SAMPLE_LOADED';

  loadSamples() {
    return {
      type: SamplesActions.LOAD_STARTED,
    };
  }

  sampleLoaded(payload: String) {
    return {
      type: SamplesActions.SAMPLE_LOADED,
      payload,
    }
  }

  // loadSucceeded(payload: any) {
  //   return {
  //     type: SamplesActions.LOAD_SUCCEEDED,
  //     payload,
  //   };
  // }

  loadFailed(error) {
    return {
      type: SamplesActions.LOAD_FAILED,
      error,
    };
  }
}
