---
title: "Przewodnik aplikacji desktopowej Electron"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik aplikacji desktopowej Electron

> **Źródło prawdy:** workspace `electron/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute dostarcza wieloplatformową aplikację desktopową (Windows / macOS / Linux) opartą na
**Electron 41** + **electron-builder 26.10**. Aplikacja desktopowa uruchamia serwer standalone
Next.js jako proces potomny, kieruje na niego `BrowserWindow` i dodaje
zasobnik systemowy, auto-aktualizator, most IPC oraz bootstrap sekretów bez konfiguracji.

## Architektura

```
┌──────────────────────────────────────────────┐
│ Electron main process (electron/main.js)     │
│ ├─ Single-instance lock                       │
│ ├─ Child process: Next.js standalone server  │
│ │   (spawned with Electron's Node runtime)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ Auto-update via electron-updater          │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Wersje

Potwierdzone w `electron/package.json`:

| Pakiet             | Wersja                     |
| ------------------ | -------------------------- |
| `electron`         | `^41.5.1`                  |
| `electron-builder` | `^26.10.0`                 |
| `electron-updater` | `^6.8.5`                   |
| `better-sqlite3`   | `^12.9.0`                  |
| Wersja aplikacji   | `3.8.0`                    |
| Id aplikacji       | `online.omniroute.desktop` |
| Nazwa produktu     | `OmniRoute`                |

## Skrypty (główny `package.json`)

| Skrypt                            | Cel                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Uruchamia `npm run dev` + czeka na `localhost:20128` + startuje Electron                   |
| `npm run electron:build`          | Buduje Next.js, potem uruchamia `electron-builder` dla bieżącego OS                        |
| `npm run electron:build:win`      | Buduje instalator NSIS Windows + wersję portable (x64)                                     |
| `npm run electron:build:mac`      | Buduje DMG macOS (Intel + Apple Silicon)                                                   |
| `npm run electron:build:linux`    | Buduje AppImage + DEB Linux (x64 + arm64)                                                  |
| `npm run electron:smoke:packaged` | Uruchamia spakowany binarny i sprawdza `/login` pod kątem HTTP 200, potem zamyka aplikację |

Workspace `electron/` udostępnia także:

- `npm run prepare:bundle` — uruchamia `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — buildy macOS dla jednej architektury
- `npm run pack` — build tylko katalogu do lokalnych testów (bez instalatora)

## Układ katalogów

```
electron/
├── package.json              # Electron deps + electron-builder config
├── main.js                   # Main process (24 KB — see annotations below)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI types
├── README.md                 # In-workspace notes
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder output (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Stages .next/electron-standalone bundle
└── dev/
    └── smoke-electron-packaged.mjs       # Post-build smoke test
```

Zarówno `main.js`, jak i `preload.js` to **pliki CommonJS `.js`**, nie TypeScript. Typowania
po stronie renderera są w `electron/types.d.ts`.

## Most IPC (`preload.js`)

Preload udostępnia whitelisted API na `window.electronAPI` przez `contextBridge`
z `contextIsolation: true` i `nodeIntegration: false`.

```javascript
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};
```

Udostępnione metody:

| Wywołanie z renderera                                             | Typ                       |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                    |
| `openExternal(url)`                                               | invoke                    |
| `getDataDir()`                                                    | invoke                    |
| `restartServer()`                                                 | invoke                    |
| `getAppVersion()`                                                 | invoke                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (zwraca disposer) |

Helpery receive zwracają **funkcję disposer** zamiast polegać na
`removeAllListeners` — zapobiega to gromadzeniu listenerów przy remountowaniu
komponentów React.

## Cykl życia serwera

`main.js` uruchamia bundle standalone Next.js bezpośrednio w runtime Node Electrona,
aby uniknąć niedopasowania ABI natywnych modułów względem systemowego Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Najważniejsze:

- `waitForServer()` odpytuje URL do 30 s przed pokazaniem okna (brak pustego ekranu przy zimnym starcie).
- `stdio: "pipe"` przechwytuje stdout/stderr; frazy gotowości (`Ready` / `listening`) emitują `server-status: running` przez IPC.
- `before-quit` czeka do 5 s na graceful SIGTERM (checkpoint WAL), potem wysyła SIGKILL.
- Przełącznik portu w trayu (`20128`, `3000`, `8080`) zatrzymuje i restartuje serwer, a następnie przeładowuje BrowserWindow.

## Bootstrap sekretów bez konfiguracji

Przy pierwszym uruchomieniu proces główny automatycznie generuje i zapisuje brakujące sekrety:

| Sekret                   | Źródło                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmawia, jeśli zaszyfrowane dane już istnieją) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Zapis w `<DATA_DIR>/server.env`. `DATA_DIR` rozwiązuje się do:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` lub `~/.omniroute`
- macOS: `~/.omniroute`

## Okno i zasobnik

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light w `{ x: 16, y: 16 }`.
- Windows/Linux: natywny pasek tytułu.
- Przycisk zamknięcia minimalizuje do trayu; menu trayu ma **Open OmniRoute**, **Open Dashboard** (zewnętrzna przeglądarka), podmenu **Server Port**, **Check for Updates**, **Quit**.

## Content Security Policy

Ustawiane przez `session.defaultSession.webRequest.onHeadersReceived`. Istotne dyrektywy:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Tryb dev dodaje `'unsafe-eval'` tylko do `script-src`

## Auto-aktualizacja

Używa `electron-updater` z providerem GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Zdarzenia przekazywane do renderera przez IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (z `percent`), `downloaded`, `error`
- `installUpdate()` zabija serwer, potem wywołuje `autoUpdater.quitAndInstall()`
- Pomijane w trybie dev (`!app.isPackaged`)

## Pipeline budowania

1. `npm run build` → standalone Next.js w `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponownie przygotowuje do `.next/electron-standalone` i przepisuje ścieżki bezwzględne w `server.js` + `required-server-files.json`, aby bundle był przenośny.
3. `electron-builder` pakuje `main.js`, `preload.js`, `node_modules` oraz `extraResources: { ../.next/electron-standalone → app }`.

### Cele budowania

| OS      | Cele                                             |
| ------- | ------------------------------------------------ |
| Windows | instalator NSIS + portable (x64)                 |
| macOS   | DMG (Intel + arm64, przeciągnij do Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                     |

Ustawienia NSIS: `oneClick: false`, pozwala użytkownikowi wybrać katalog instalacji, tworzy skróty na Pulpicie i w Menu Start.

## Smoke test spakowanego builda

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatycznie znajduje spakowany binarny w `electron/dist-electron/` dla bieżącej platformy.
- Uruchamia z izolowanymi katalogami `HOME`/`APPDATA`/`XDG_*`, żeby nie ruszać danych dewelopera.
- Odpytuje `http://127.0.0.1:20128/login` o HTTP 200 w ciągu 45 s.
- Obserwuje stderr/stdout pod kątem wzorców fatalnych (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itd.).
- Czeka 2 s stabilnego działania po gotowości, potem wysyła SIGTERM i czeka na zwolnienie portu.
- W CI automatycznie przekazuje `--no-sandbox --disable-gpu` (oraz `--disable-dev-shm-usage` na Linuxie).

Nadpisania env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisywanie kodu

`electron/package.json` **nie** podpina poświadczeń podpisu bezpośrednio. Przekaż je przez zmienne env do `electron-builder`:

### macOS

```bash
export APPLE_ID=<email>
export APPLE_APP_SPECIFIC_PASSWORD=<password>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:win
```

### Linux

Podpis AppImage jest opcjonalny — ustaw `LINUX_GPG_KEY`, jeśli podpisujesz.

## Dystrybucja

Artefakty lądują w `electron/dist-electron/`:

- `OmniRoute Setup X.Y.Z.exe`, `OmniRoute-X.Y.Z-portable.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Wydania są publikowane w GitHub Releases (`diegosouzapw/OmniRoute`), skąd `electron-updater` sprawdza też nowe wersje.

## Rozwiązywanie problemów

| Objaw                                                         | Rozwiązanie                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po major bump Electrona | `cd electron && npm rebuild`                                                 |
| `ERR_DLOPEN_FAILED` dla natywnego modułu                      | Ponów `prepare:bundle` i sprawdź, czy ABI pasuje do Node Electrona           |
| Okno jest puste na Linuxie                                    | Potwierdź, że serwer Next.js faktycznie zbindował PORT (logi `[Server]`)     |
| Notaryzacja macOS się zawiesza                                | Upewnij się, że zmienne `APPLE_*` są wyeksportowane, a nie tylko w `.env`    |
| Ostrzeżenie Windows SmartScreen                               | Podpisz certyfikatem EV albo użytkownicy: prawy przycisk → „Uruchom mimo to” |
| Smoke test pada z port-in-use                                 | Zatrzymaj lokalny serwer dev na 20128 przed `electron:smoke:packaged`        |

## Zobacz też

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Źródło: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Helpery: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
