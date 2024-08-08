import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductmasterComponent } from './newproductmaster.component';

describe('NewproductmasterComponent', () => {
  let component: NewproductmasterComponent;
  let fixture: ComponentFixture<NewproductmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewproductmasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewproductmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
