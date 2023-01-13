import { TestBed } from '@angular/core/testing';

import { PermissionRouteGuard } from './permission-route.guard';

describe('PermissionRouteGuard', () => {
  let guard: PermissionRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
