import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoSensorComponent } from './nodo-sensor.component';

describe('NodoSensorComponent', () => {
  let component: NodoSensorComponent;
  let fixture: ComponentFixture<NodoSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodoSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodoSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
