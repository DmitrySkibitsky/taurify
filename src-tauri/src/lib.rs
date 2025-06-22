use tauri::{AppHandle};
use tauri_plugin_deep_link::DeepLinkExt;
use tauri_plugin_single_instance::init as single_instance_init;
use tauri::Emitter;

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::new().build())
    .plugin(tauri_plugin_log::Builder::new().build())
    .plugin(tauri_plugin_deep_link::init())
    .plugin(tauri_plugin_opener::init())
    .plugin(single_instance_init(|app: &AppHandle, argv, cwd| {
      let _ = app.emit("single-instance", Payload { args: argv, cwd });
    }))
    .setup(|app| {
//         app.deep_link().on_open_url(|event| {
//             println!("deep link URLs: {:?}", event.urls());
//         });

        #[cfg(any(windows, target_os = "linux"))]
        {
            app.deep_link().register_all()?;
        }
        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("❌ Error while running tauri app");
}
