/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MetronomeService } from './metronome.service';

describe('MetronomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetronomeService]
    });
  });

  it('should ...', inject([MetronomeService], (service: MetronomeService) => {
    expect(service).toBeTruthy();
  }));
});
