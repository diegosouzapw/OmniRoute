use serde::Serialize;
use tauri::AppHandle;
use tauri::Manager;
use crate::error::AppResult;

#[derive(Serialize)]
pub struct AppInfo {
    pub name: String,
    pub version: String,
    pub identifier: String,
}

#[tauri::command]
pub async fn get_app_info(app: AppHandle) -> AppResult<AppInfo> {
    let version = app.package_info().version.to_string();
    Ok(AppInfo {
        name: "argismonitor".to_string(),
        version,
        identifier: "online.phenotype.argismonitor".to_string(),
    })
}

#[tauri::command]
pub async fn get_version(app: AppHandle) -> AppResult<String> {
    Ok(app.package_info().version.to_string())
}

#[tauri::command]
pub async fn quit(app: AppHandle) -> AppResult<()> {
    app.exit(0);
    Ok(())
}
