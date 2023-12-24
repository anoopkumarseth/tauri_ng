import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
import { TauriNotificationService } from './services/tauri-notification.service';
import { emit, listen } from '@tauri-apps/api/event';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  greetingMessage = ""; 
  setting = 'setting';
  constructor(private notificationService: TauriNotificationService) {}
 

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
  async getNotification() {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification('Tauri is awesome!');
      emit('notification-clicked', { 
        name:'test'
       });
      listen('notification-clicked', (event) => {
        // Handle the click event here
        this.setting = "event : acc";
      });

      // sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
    }

    (async () => {
      await enable();
      console.log(`registered for autostart? ${await isEnabled()}`);
      // disable();
      this.setting = 'updated'
    })();


  }
  
  
}
