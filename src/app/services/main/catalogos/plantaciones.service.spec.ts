import { TestBed } from '@angular/core/testing';

import { PlantacionesService } from './plantaciones.service';

describe('PlantacionesService', () => {
  let service: PlantacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
