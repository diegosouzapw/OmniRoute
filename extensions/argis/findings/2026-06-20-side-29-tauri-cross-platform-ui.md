# SOTA — Tauri for Cross-Platform UI (side-29)

**Date:** 2026-06-20 10:30 UTC
**Task ID:** side-29
**Agent:** orch-v11-real-research-4
**Verdict:** **Strong fit** for any new UI surface in the Phenotype fleet. Existing `chatta` and `phenotype-landing` projects can stay; for net-new UI, default to Tauri 2.

## What Tauri 2 is (2026-06)
Tauri 2 is the GA release that fixed Tauri 1's mobile story. It bundles a Rust backend with a system webview (WebKit on macOS/iOS, WebView2 on Windows, WebKitGTK on Linux) and exposes a typed IPC bridge via `tauri::Builder` + `#[tauri::command]` proc-macros. Mobile support is first-class: iOS via WRY+WKWebView, Android via WRY+WebView. Bundle sizes are 5–20 MB vs Electron's 80+ MB because there is no Chromium runtime — the webview is system-provided.

## Fleet relevance
- `chatta` (Python CLI): no UI today; if it gains a UI surface, a separate Tauri sidecar is fine.
- `phenotype-landing` (Rust + static HTML): already a Rust crate. If the landing grows interactive features (live status pages, fleet dashboards), Tauri is the natural extension.
- `pheno-otel` / `pheno-tracing` config UIs: net-new; Tauri 2 makes a single Rust binary with a config page straightforward.
- `playcua` (Python): no fit — Python-side; stay with Qt/PySide if a UI is added.

## Concrete recommendations
1. **Default to Tauri 2** for any new Rust UI surface in the fleet. The webview-on-system approach matches our substrate posture (no Chromium, no Node).
2. **IPC bridge** = `serde` for everything. Already in fleet via `pheno-port-adapter`; reuse.
3. **Mobile**: only if the use case actually requires mobile. Tauri 2 mobile works but adds the WKWebView / WebView-runtime as a build dep. Don't reach for mobile-first unless the consumer is mobile.
4. **State management**: the `tauri-plugin-store` crate is fine for small things; for anything beyond config, route through `pheno-context` as the request-context substrate.

## What it is NOT a fit for
- Headless services (use `pheno-port-adapter` + CLI).
- Heavy in-process UI like a desktop IDE (Tauri is for app-sized shells, not editor chrome).
- Anything where you need raw HTML/CSS access beyond webview normal — there is no escape hatch in 2026.

**Refs:** `chatta` design notes, `phenotype-landing` repo, `pheno-port-adapter` IPC substrate.
