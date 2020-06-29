import { TestBed } from '@angular/core/testing';

import { RestplaylistService } from './restplaylist.service';

describe('RestplaylistService', () => {
  let service: RestplaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestplaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
