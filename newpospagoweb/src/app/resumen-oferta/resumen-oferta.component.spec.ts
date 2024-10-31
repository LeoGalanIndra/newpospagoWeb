import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenOfertaComponent } from './resumen-oferta.component';

describe('ResumenOfertaComponent', () => {
  let component: ResumenOfertaComponent;
  let fixture: ComponentFixture<ResumenOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenOfertaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
