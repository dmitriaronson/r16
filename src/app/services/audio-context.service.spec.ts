/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AudioContextService } from './audio-context.service';

describe('AudioContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioContextService]
    });
  });

  it('should ...', inject([AudioContextService], (service: AudioContextService) => {
    expect(service).toBeTruthy();
  }));
});
