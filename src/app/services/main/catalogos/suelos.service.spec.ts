import { TestBed } from '@angular/core/testing';

import { SuelosService } from './suelos.service';

describe('SuelosService', () => {
  let service: SuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
