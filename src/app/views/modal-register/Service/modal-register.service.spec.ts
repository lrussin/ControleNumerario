/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalRegisterService } from './modal-register.service';

describe('Service: ModalRegister', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalRegisterService]
    });
  });

  it('should ...', inject([ModalRegisterService], (service: ModalRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
