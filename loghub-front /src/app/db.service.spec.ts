import { TestBed } from '@angular/core/testing';

import { PublisherWebService } from './publisher.web.service';

describe('LogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublisherWebService = TestBed.get(PublisherWebService);
    expect(service).toBeTruthy();
  });
});
