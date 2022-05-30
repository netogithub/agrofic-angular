import { TestBed } from '@angular/core/testing';

import { RiegosService } from './riegos.service';

describe('RiegosService', () => {
  let service: RiegosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiegosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
