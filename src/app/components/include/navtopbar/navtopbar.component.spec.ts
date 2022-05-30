import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtopbarComponent } from './navtopbar.component';

describe('NavtopbarComponent', () => {
  let component: NavtopbarComponent;
  let fixture: ComponentFixture<NavtopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavtopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavtopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
