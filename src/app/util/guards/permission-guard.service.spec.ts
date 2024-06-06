/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermissionGuardService } from './permission-guard.service';

describe('Service: PermissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionGuardService]
    });
  });

  it('should ...', inject([PermissionGuardService], (service: PermissionGuardService) => {
    expect(service).toBeTruthy();
  }));
});
