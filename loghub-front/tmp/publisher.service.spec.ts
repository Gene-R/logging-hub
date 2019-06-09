import { inject, async, TestBed } from '@angular/core/testing';

import { PublisherWebService } from './publisher.web.service';

describe('PublisherWebService', () => {


  // beforeEach(() => TestBed.configureTestingModule({
  //   providers: [PublisherWebService]
  // }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [PublisherWebService]
    });
  }));

  // it('should be created', () => {
  //   const service: PublisherWebService = TestBed.get(PublisherWebService);
  //   expect(service).toBeTruthy();
  // });

  it('should be created', inject([PublisherWebService], (service: PublisherWebService) => {
    expect(service).toBeTruthy();
  }));

});
