/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterbancarioService } from './Interbancario.service';

describe('Service: Interbancario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterbancarioService]
    });
  });

  it('should ...', inject([InterbancarioService], (service: InterbancarioService) => {
    expect(service).toBeTruthy();
  }));
});
