import { TestBed } from '@angular/core/testing';

import { CustomerConstractsService } from './customer-constracts.service';

describe('CustomerConstractsService', () => {
  let service: CustomerConstractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerConstractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
