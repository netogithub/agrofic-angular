import { TestBed } from '@angular/core/testing';

import { NodosService } from './nodos.service';

describe('NodosService', () => {
  let service: NodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
