import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarCuentaFacturacionComponent } from './cambiar-cuenta-facturacion.component';

describe('CambiarCuentaFacturacionComponent', () => {
  let component: CambiarCuentaFacturacionComponent;
  let fixture: ComponentFixture<CambiarCuentaFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarCuentaFacturacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarCuentaFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
