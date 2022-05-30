import { TestBed } from '@angular/core/testing';

import { SitioUsuarioService } from './sitio-usuario.service';

describe('SitioUsuarioService', () => {
  let service: SitioUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitioUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
