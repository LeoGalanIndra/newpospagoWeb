import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductdetailComponent } from './newproductdetail.component';

describe('NewproductdetailComponent', () => {
  let component: NewproductdetailComponent;
  let fixture: ComponentFixture<NewproductdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewproductdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewproductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
