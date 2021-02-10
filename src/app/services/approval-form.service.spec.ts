import { TestBed } from '@angular/core/testing';

import { ApprovalFormService } from './approval-form.service';

describe('ApprovalFormService', () => {
  let service: ApprovalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
