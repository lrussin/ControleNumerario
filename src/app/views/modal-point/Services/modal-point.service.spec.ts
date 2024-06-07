/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalPointService } from './modal-point.service';

describe('Service: ModalPoint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalPointService]
    });
  });

  it('should ...', inject([ModalPointService], (service: ModalPointService) => {
    expect(service).toBeTruthy();
  }));
});
