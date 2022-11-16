import { TestBed } from '@angular/core/testing';

import { IsAuthenticatedGuard } from './is-authenticated.guard';

describe('IsAuthenticatedGuardGuard', () => {
  let guard: IsAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
