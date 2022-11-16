import { TestBed } from '@angular/core/testing';

import { HttpEncodeParamsInterceptor } from './http-encode-params.interceptor';

describe('HttpEncodeParamsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpEncodeParamsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpEncodeParamsInterceptor = TestBed.inject(HttpEncodeParamsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
