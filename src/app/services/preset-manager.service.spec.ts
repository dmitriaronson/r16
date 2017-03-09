/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PresetManagerService } from './preset-manager.service';

describe('PresetManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresetManagerService]
    });
  });

  it('should ...', inject([PresetManagerService], (service: PresetManagerService) => {
    expect(service).toBeTruthy();
  }));
});
