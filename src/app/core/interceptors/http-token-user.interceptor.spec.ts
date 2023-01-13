import { TestBed } from '@angular/core/testing';

import { HttpTokenUserInterceptor } from './http-token-user.interceptor';

describe('HttpTokenUserInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpTokenUserInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpTokenUserInterceptor = TestBed.inject(HttpTokenUserInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
