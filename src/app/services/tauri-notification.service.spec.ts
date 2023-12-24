import { TestBed } from '@angular/core/testing';

import { TauriNotificationService } from './tauri-notification.service';

describe('TauriNotificationService', () => {
  let service: TauriNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TauriNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
