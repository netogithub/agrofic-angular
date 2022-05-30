import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitioUsuarioComponent } from './sitio-usuario.component';

describe('SitioUsuarioComponent', () => {
  let component: SitioUsuarioComponent;
  let fixture: ComponentFixture<SitioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitioUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
