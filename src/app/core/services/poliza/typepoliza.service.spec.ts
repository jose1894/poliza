import { TestBed } from '@angular/core/testing';

import { TypePolizaService } from './type-poliza.service';

describe('PolizaService', () => {
  let service: TypePolizaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePolizaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
