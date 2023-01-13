import { TestBed } from '@angular/core/testing';

import { ImageDefaultService } from './image-default.service';

describe('ImageDefaultService', () => {
  let service: ImageDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
