import { TestBed } from '@angular/core/testing';

import { DelegadoServiceService } from './delegado-service.service';

describe('DelegadoServiceService', () => {
  let service: DelegadoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegadoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
