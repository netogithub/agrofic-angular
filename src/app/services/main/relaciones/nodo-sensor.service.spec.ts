import { TestBed } from '@angular/core/testing';

import { NodoSensorService } from './nodo-sensor.service';

describe('NodoSensorService', () => {
  let service: NodoSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodoSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
