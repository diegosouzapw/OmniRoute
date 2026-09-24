# Electron Desktop Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Verbindliche Quelle:** `electron/`-Workspace
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute wird mit einer plattformübergreifenden Desktop-App (Windows / macOS / Linux) ausgeliefert, die auf
**Electron 41** + **electron-builder 26.10** basiert. Die Desktop-App startet den eigenständigen Next.js-Server
als untergeordneten Prozess, richtet ein `BrowserWindow` darauf aus und ergänzt eine
Taskleistenintegration, einen automatischen Updater, eine IPC-Bridge sowie eine konfigurationsfreie Initialisierung geheimer Schlüssel.

## Architektur

```
┌──────────────────────────────────────────────┐
│ Electron-Hauptprozess (electron/main.js)     │
│ ├─ Sperre für Einzelinstanz                   │
│ ├─ Untergeordneter Prozess: eigenständiger    │
│ │   Next.js-Server (gestartet mit der         │
│ │   Node-Laufzeitumgebung von Electron)       │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Taskleistensymbol + Kontextmenü            │
│ ├─ Automatische Updates über electron-updater │
│ ├─ Content Security Policy (Sitzungs-Header)  │
│ └─ Initialisierung geheimer Schlüssel         │
│    (JWT / API_KEY_SECRET)                     │
└──────────────────────────────────────────────┘
            ↕ IPC-Bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js-Dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versionen

Bestätigt anhand von `electron/package.json`:

| Paket              | Version                                                       |
| ------------------ | ------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                     |
| `electron-builder` | `^26.15.3`                                                    |
| `electron-updater` | `^6.8.9`                                                      |
| `better-sqlite3`   | Root `^13.0.2` (Node-API-Prebuilds — kein Electron-Neuaufbau) |
| App-Version        | `3.8.0`                                                       |
| App-ID             | `online.omniroute.desktop`                                    |
| Produktname        | `OmniRoute`                                                   |

## Skripte (`package.json` im Stammverzeichnis)

| Skript                            | Zweck                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Startet `npm run dev`, wartet auf `localhost:20128` und startet anschließend Electron              |
| `npm run electron:build`          | Erstellt Next.js und führt anschließend `electron-builder` für das aktuelle Betriebssystem aus     |
| `npm run electron:build:win`      | Erstellt den Windows-NSIS-Installer und die portable Version (x64)                                 |
| `npm run electron:build:mac`      | Erstellt macOS-DMGs (Intel + Apple Silicon)                                                        |
| `npm run electron:build:linux`    | Erstellt Linux-AppImage- und DEB-Pakete (x64 + arm64)                                              |
| `npm run electron:smoke:packaged` | Startet die paketierte Binärdatei, prüft `/login` auf HTTP 200 und fährt sie anschließend herunter |

Der `electron/`-Workspace stellt außerdem Folgendes bereit:

- `npm run prepare:bundle` — führt `scripts/build/prepare-electron-standalone.mjs` aus
- `npm run build:mac-x64` / `build:mac-arm64` — macOS-Builds für eine einzelne Architektur
- `npm run pack` — erstellt ausschließlich ein Verzeichnis für lokale Tests (kein Installer)

## Verzeichnisstruktur

```
electron/
├── package.json              # Electron-Abhängigkeiten + electron-builder-Konfiguration
├── main.js                   # Hauptprozess (24 KB — siehe Anmerkungen unten)
├── preload.js                # contextBridge-IPC-Bridge
├── types.d.ts                # Typen für AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Workspace-interne Hinweise
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-Ausgabe (von Git ignoriert)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Bereitet das .next/electron-standalone-Bundle vor
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke-Test nach dem Build
```

Sowohl `main.js` als auch `preload.js` sind **CommonJS-`.js`-Dateien**, nicht TypeScript. Die
renderer-seitigen Typdefinitionen befinden sich in `electron/types.d.ts`.

## IPC-Bridge (`preload.js`)

Das Preload-Skript stellt über `contextBridge` eine auf einer Positivliste basierende API unter `window.electronAPI`
bereit, wobei `contextIsolation: true` und `nodeIntegration: false` verwendet werden.

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

Bereitgestellte Methoden:

| Renderer-Aufruf                                                   | Typ                                        |
| ----------------------------------------------------------------- | ------------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                     |
| `openExternal(url)`                                               | invoke                                     |
| `getDataDir()`                                                    | invoke                                     |
| `restartServer()`                                                 | invoke                                     |
| `getAppVersion()`                                                 | invoke                                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (gibt Bereinigungsfunktion zurück) |

Die Empfangshelfer geben eine **Bereinigungsfunktion** zurück, anstatt sich auf
`removeAllListeners` zu verlassen — dadurch wird verhindert, dass sich Listener ansammeln, wenn React-Komponenten
erneut eingebunden werden.

## Server-Lebenszyklus

`main.js` startet das eigenständige Next.js-Bundle direkt mit der Electron-Node-
Laufzeit, um ABI-Inkompatibilitäten nativer Module mit dem systemweiten Node zu vermeiden:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: {
    ...serverEnv,
    PORT,
    NODE_ENV: "production",
    ELECTRON_RUN_AS_NODE: "1",
    NODE_PATH,
  },
  stdio: "pipe",
});
```

Hervorzuheben:

- `waitForServer()` fragt die URL bis zu 30 s lang ab, bevor das Fenster angezeigt wird (kein leerer Bildschirm beim Kaltstart).
- `stdio: "pipe"` erfasst stdout/stderr; Bereitschaftsmeldungen (`Ready` / `listening`) senden `server-status: running` über IPC.
- `before-quit` wartet bis zu 5 s auf ein ordnungsgemäßes SIGTERM (WAL-Checkpoint) und sendet anschließend SIGKILL.
- Der Port-Umschalter im Tray (`20128`, `3000`, `8080`) stoppt den Server, startet ihn neu und lädt anschließend das BrowserWindow neu.

## Konfigurationsfreies Secret-Bootstrapping

Beim ersten Start generiert und speichert der Hauptprozess automatisch fehlende Secrets:

| Secret                   | Quelle                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (wird abgelehnt, wenn bereits verschlüsselte Zugangsdaten existieren) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                       |

Gespeichert in `<DATA_DIR>/server.env`. `DATA_DIR` wird wie folgt aufgelöst:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` oder `~/.omniroute`
- macOS: `~/.omniroute`

## Fenster und Taskleisten-Symbol

- `BrowserWindow`: 1400×900 (mindestens 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, Fenstersteuerung bei `{ x: 16, y: 16 }`.
- Windows/Linux: native Titelleiste.
- Die Schließen-Schaltfläche minimiert in den Infobereich; das Menü des Taskleisten-Symbols enthält **OmniRoute öffnen**, **Dashboard öffnen** (externer Browser), das Untermenü **Server-Port**, **Nach Updates suchen** und **Beenden**.

## Content Security Policy

Wird über `session.defaultSession.webRequest.onHeadersReceived` festgelegt. Wichtige Direktiven:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Im Entwicklungsmodus wird ausschließlich `script-src` um `'unsafe-eval'` ergänzt

## Automatische Updates

Verwendet `electron-updater` mit dem GitHub-Provider (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Ereignisse werden über den `update-status`-IPC an den Renderer weitergeleitet:
  `checking`, `available`, `not-available`, `downloading` (mit `percent`), `downloaded`, `error`
- `installUpdate()` beendet den Server und ruft anschließend `autoUpdater.quitAndInstall()` auf
- Wird im Entwicklungsmodus übersprungen (`!app.isPackaged`)

## Build-Pipeline

1. `npm run build` → eigenständige Next.js-Ausgabe in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → stellt die Dateien erneut in `.next/electron-standalone` bereit und schreibt absolute Pfade in `server.js` + `required-server-files.json` um, damit das Bundle verschiebbar ist.
3. `electron-builder` paketiert `main.js`, `preload.js`, `node_modules` und `extraResources: { ../.next/electron-standalone → app }`.

### Build-Ziele

| Betriebssystem | Ziele                                                   |
| -------------- | ------------------------------------------------------- |
| Windows        | NSIS-Installationsprogramm + portable Version (x64)     |
| macOS          | DMG (Intel + arm64, per Drag-and-drop nach „Programme“) |
| Linux          | AppImage + DEB (x64 + arm64)                            |

NSIS-Einstellungen: `oneClick: false`, ermöglicht dem Benutzer die Auswahl des Installationsverzeichnisses und erstellt Verknüpfungen auf dem Desktop und im Startmenü.

## Smoke-Test des paketierten Builds

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Erkennt automatisch die paketierte Binärdatei für die aktuelle Plattform in `electron/dist-electron/`.
- Startet mit isolierten `HOME`-/`APPDATA`-/`XDG_*`-Verzeichnissen, damit keine Entwicklerdaten verändert werden.
- Fragt `http://127.0.0.1:20128/login` wiederholt ab und erwartet innerhalb von 45 s den HTTP-Status 200.
- Überwacht stderr/stdout auf schwerwiegende Muster (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` usw.).
- Wartet nach Erreichen der Betriebsbereitschaft 2 s auf eine stabile Laufzeit, sendet anschließend SIGTERM und wartet, bis der Port wieder frei ist.
- Übergibt in CI automatisch `--no-sandbox --disable-gpu` (und unter Linux `--disable-dev-shm-usage`).

Umgebungsvariablen zum Überschreiben: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Codesignierung

`electron/package.json` bindet Signierungsanmeldedaten **nicht** direkt ein. Übergeben Sie sie über Umgebungsvariablen an `electron-builder`:

### macOS

```bash
export APPLE_ID=<E-Mail-Adresse>
export APPLE_APP_SPECIFIC_PASSWORD=<Passwort>
export APPLE_TEAM_ID=<ID>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<Zertifikatspasswort>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<Zertifikatspasswort>
npm run electron:build:win
```

### Linux

Die AppImage-Signierung ist optional — setzen Sie zum Signieren `LINUX_GPG_KEY`.

## Distribution

Die Artefakte werden in `electron/dist-electron/` abgelegt:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Releases werden in GitHub Releases (`diegosouzapw/OmniRoute`) veröffentlicht. Dort sucht auch `electron-updater` nach neuen Versionen.

## Fehlerbehebung

| Symptom                                                                 | Lösung                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` nach einem Electron-Major-Upgrade | better-sqlite3 v13 stellt vorkompilierte Node-API-Builds bereit — führen Sie im Stammverzeichnis erneut `npm install` und `prepare:bundle` aus (dadurch wird der vorkompilierte Build für die aktuelle Plattform überprüft) |
| `ERR_DLOPEN_FAILED` bei einem nativen Modul                             | Führen Sie `prepare:bundle` erneut aus — der Vorgang bricht sofort ab, wenn der vorkompilierte Node-API-Build für die aktuelle Plattform fehlt                                                                              |
| Fenster bleibt unter Linux leer                                         | Vergewissern Sie sich, dass der Next.js-Server tatsächlich an PORT gebunden ist (prüfen Sie die `[Server]`-Protokolle)                                                                                                      |
| macOS-Notarisierung bleibt hängen                                       | Stellen Sie sicher, dass die `APPLE_*`-Variablen exportiert und nicht nur in `.env` definiert sind                                                                                                                          |
| Windows-SmartScreen-Warnung                                             | Signieren Sie mit einem EV-Zertifikat, oder lassen Sie Benutzer mit der rechten Maustaste klicken → „Trotzdem ausführen“                                                                                                    |
| Smoke-Test schlägt wegen eines bereits belegten Ports fehl              | Beenden Sie vor der Ausführung von `electron:smoke:packaged` alle lokalen Entwicklungsserver auf Port 20128                                                                                                                 |

## Siehe auch

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Quelle: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hilfsskripte: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
