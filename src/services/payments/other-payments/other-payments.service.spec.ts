import { TestBed, inject } from '@angular/core/testing';

import { OtherPaymentsService } from './other-payments.service';

describe('OtherPaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherPaymentsService]
    });
  });

  it('should be created', inject([OtherPaymentsService], (service: OtherPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
