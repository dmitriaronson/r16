/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SamplerService } from './sampler.service';

describe('SamplerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SamplerService]
    });
  });

  it('should ...', inject([SamplerService], (service: SamplerService) => {
    expect(service).toBeTruthy();
  }));
});
