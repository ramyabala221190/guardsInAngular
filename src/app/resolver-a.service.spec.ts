import { TestBed } from '@angular/core/testing';

import { ResolverAService } from './resolver-a.service';

describe('ResolverAService', () => {
  let service: ResolverAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolverAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
