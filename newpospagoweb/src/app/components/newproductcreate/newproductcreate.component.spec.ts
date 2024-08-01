import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductcreateComponent } from './newproductcreate.component';

describe('NewproductcreateComponent', () => {
  let component: NewproductcreateComponent;
  let fixture: ComponentFixture<NewproductcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewproductcreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewproductcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
