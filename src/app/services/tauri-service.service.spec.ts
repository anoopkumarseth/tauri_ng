import { TestBed } from '@angular/core/testing';

import { TauriServiceService } from './tauri-service.service';

describe('TauriServiceService', () => {
  let service: TauriServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TauriServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
