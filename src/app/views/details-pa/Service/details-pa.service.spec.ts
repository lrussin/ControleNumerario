/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailsPaService } from './details-pa.service';

describe('Service: DetailsPa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsPaService]
    });
  });

  it('should ...', inject([DetailsPaService], (service: DetailsPaService) => {
    expect(service).toBeTruthy();
  }));
});
