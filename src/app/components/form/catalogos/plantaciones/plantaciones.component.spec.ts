import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacionesComponent } from './plantaciones.component';

describe('PlantacionesComponent', () => {
  let component: PlantacionesComponent;
  let fixture: ComponentFixture<PlantacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
