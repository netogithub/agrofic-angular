import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuelosComponent } from './suelos.component';

describe('SuelosComponent', () => {
  let component: SuelosComponent;
  let fixture: ComponentFixture<SuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
