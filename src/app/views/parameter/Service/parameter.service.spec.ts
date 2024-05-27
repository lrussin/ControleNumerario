/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParameterService } from './parameter.service';

describe('Service: Parameter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParameterService]
    });
  });

  it('should ...', inject([ParameterService], (service: ParameterService) => {
    expect(service).toBeTruthy();
  }));
});
