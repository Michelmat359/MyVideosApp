import { TestBed } from '@angular/core/testing';

import { MemoryPlaylistsService } from './memory-playlists.service';

describe('MemoryPlaylistsService', () => {
  let service: MemoryPlaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryPlaylistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
