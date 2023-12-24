import { Injectable } from '@angular/core';
declare global {
  interface Window {
    tauri: {
      invoke: (command: string, ...args: any[]) => Promise<any>;
    };
  }
}
@Injectable({
  providedIn: 'root'
})
export class TauriServiceService {
  invoke(command: string, ...args: any[]): Promise<any> {
    return window.tauri.invoke(command, ...args);
  }
  constructor() { }
}
