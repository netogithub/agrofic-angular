import { TestBed } from '@angular/core/testing';

import { IdentidadService } from './identidad.service';

describe('IdentidadService', () => {
  let service: IdentidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
