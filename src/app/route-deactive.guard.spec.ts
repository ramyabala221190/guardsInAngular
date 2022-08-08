import { TestBed } from '@angular/core/testing';

import { RouteDeactiveGuard } from './route-deactive.guard';

describe('RouteDeactiveGuard', () => {
  let guard: RouteDeactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteDeactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
