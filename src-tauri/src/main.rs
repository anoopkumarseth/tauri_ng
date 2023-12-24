// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_autostart::MacosLauncher;
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};
use tauri::Manager;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let quit: CustomMenuItem = CustomMenuItem::new("quit".to_string(), "Quit");
    // let hide: CustomMenuItem = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
    .add_item(quit);
    // .add_native_item(SystemTrayMenuItem::Separator)    
    // .add_item(hide);    
    let system_tray = SystemTray::new()
    .with_menu(tray_menu);
    tauri::Builder::default()
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
            event.window().hide().unwrap();
            api.prevent_close();
            }
            _ => {}
        })    
        .system_tray(system_tray).on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
              position: _,
              size: _,
              ..
            } => {
              let window = app.get_window("main").unwrap();
              if window.is_visible().unwrap() {
                  window.hide().unwrap();
              } else {
                  window.show().unwrap();
                  window.set_focus().unwrap();
              }
            }
            SystemTrayEvent::RightClick {
              position: _,
              size: _,
              ..
            } => {
              println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
              position: _,
              size: _,
              ..
            } => {
              println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
              let item_handle = app.tray_handle().get_item(&id);
              match id.as_str() {
                "quit" => {
                  std::process::exit(0);
                }  
                _ => {}
              }
            }
            _ => {}
        })    
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"]) /* arbitrary number of args to pass to your app */))
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
              api.prevent_exit();
            }
            _ => {}
          });
}
