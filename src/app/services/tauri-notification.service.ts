import { Injectable } from '@angular/core';
import { TauriServiceService } from './tauri-service.service';

@Injectable({
  providedIn: 'root'
})
export class TauriNotificationService {

  constructor(private tauriService: TauriServiceService){}
  sendNotification() {
    this.tauriService.invoke('send-notification', { title: 'Tauri', body: 'Tauri is awesome!' });

    // Set up a click event listener for notifications
    this.tauriService.invoke('set-notification-click-listener');
  }
}
