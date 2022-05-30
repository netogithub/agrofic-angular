import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiegosComponent } from './riegos.component';

describe('RiegosComponent', () => {
  let component: RiegosComponent;
  let fixture: ComponentFixture<RiegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiegosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
