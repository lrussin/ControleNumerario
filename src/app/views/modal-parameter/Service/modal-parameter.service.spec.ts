/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalParameterService } from './modal-parameter.service';

describe('Service: ModalParameter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalParameterService]
    });
  });

  it('should ...', inject([ModalParameterService], (service: ModalParameterService) => {
    expect(service).toBeTruthy();
  }));
});
