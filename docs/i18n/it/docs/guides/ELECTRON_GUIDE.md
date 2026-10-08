# Electron Desktop Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fonte ufficiale:** workspace `electron/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute include un'app desktop multipiattaforma (Windows / macOS / Linux) basata su
**Electron 41** + **electron-builder 26.10**. L'app desktop avvia il server standalone
Next.js come processo figlio, indirizza una `BrowserWindow` verso di esso e aggiunge
un'icona nella barra di sistema, aggiornamenti automatici, un bridge IPC e l'inizializzazione
dei segreti senza configurazione.

## Architettura

```
┌────────────────────────────────────────────────────┐
│ Processo principale Electron (electron/main.js)    │
│ ├─ Blocco a istanza singola                        │
│ ├─ Processo figlio: server standalone Next.js      │
│ │   (avviato con il runtime Node di Electron)       │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Barra di sistema + menu contestuale              │
│ ├─ Aggiornamento automatico tramite electron-updater│
│ ├─ Content Security Policy (header di sessione)     │
│ └─ Inizializzazione segreti (JWT / API_KEY_SECRET)  │
└────────────────────────────────────────────────────┘
            ↕ Bridge IPC (electron/preload.js)
┌────────────────────────────────────────────────────┐
│ Renderer (dashboard Next.js)                       │
│   window.electronAPI.* (contextIsolation)           │
└────────────────────────────────────────────────────┘
```

## Versioni

Confermate da `electron/package.json`:

| Pacchetto          | Versione                                                               |
| ------------------ | ---------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                              |
| `electron-builder` | `^26.15.3`                                                             |
| `electron-updater` | `^6.8.9`                                                               |
| `better-sqlite3`   | radice `^13.0.2` (prebuild Node-API — nessuna ricompilazione Electron) |
| Versione app       | `3.8.0`                                                                |
| ID app             | `online.omniroute.desktop`                                             |
| Nome prodotto      | `OmniRoute`                                                            |

## Script (`package.json` radice)

| Script                            | Scopo                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Avvia `npm run dev`, attende `localhost:20128` e avvia Electron                                  |
| `npm run electron:build`          | Compila Next.js, quindi esegue `electron-builder` per il sistema operativo corrente              |
| `npm run electron:build:win`      | Crea il programma di installazione NSIS per Windows + la versione portatile (x64)                |
| `npm run electron:build:mac`      | Crea il DMG per macOS (Intel + Apple Silicon)                                                    |
| `npm run electron:build:linux`    | Crea AppImage + DEB per Linux (x64 + arm64)                                                      |
| `npm run electron:smoke:packaged` | Avvia il binario pacchettizzato e verifica `/login` per una risposta HTTP 200, quindi lo arresta |

Il workspace `electron/` espone inoltre:

- `npm run prepare:bundle` — esegue `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — build macOS per una singola architettura
- `npm run pack` — build della sola directory per i test locali (senza programma di installazione)

## Struttura delle directory

```
electron/
├── package.json              # Dipendenze Electron + configurazione electron-builder
├── main.js                   # Processo principale (24 KB — vedere le annotazioni di seguito)
├── preload.js                # Bridge IPC contextBridge
├── types.d.ts                # Tipi AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Note interne al workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Output di electron-builder (ignorato da git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Prepara il bundle .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke test post-build
```

Sia `main.js` sia `preload.js` sono **file CommonJS `.js`**, non TypeScript. Le
definizioni dei tipi lato renderer si trovano in `electron/types.d.ts`.

## Bridge IPC (`preload.js`)

Il preload espone un'API inclusa nella whitelist tramite `window.electronAPI`, usando `contextBridge`
con `contextIsolation: true` e `nodeIntegration: false`.

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

Metodi esposti:

| Chiamata del renderer                                             | Tipo                                            |
| ----------------------------------------------------------------- | ----------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                          |
| `openExternal(url)`                                               | invoke                                          |
| `getDataDir()`                                                    | invoke                                          |
| `restartServer()`                                                 | invoke                                          |
| `getAppVersion()`                                                 | invoke                                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (restituisce una funzione di rimozione) |

Gli helper di ricezione restituiscono una **funzione di rimozione** anziché affidarsi a
`removeAllListeners`: ciò impedisce l'accumulo di listener quando i componenti React
vengono rimontati.

## Ciclo di vita del server

`main.js` avvia direttamente il bundle standalone di Next.js con il runtime Node di
Electron per evitare incompatibilità ABI dei moduli nativi con il Node di sistema:

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

Punti salienti:

- `waitForServer()` interroga l'URL per un massimo di 30 s prima di mostrare la finestra (nessuna schermata vuota all'avvio a freddo).
- `stdio: "pipe"` acquisisce stdout/stderr; le frasi che indicano che il server è pronto (`Ready` / `listening`) emettono `server-status: running` tramite IPC.
- `before-quit` attende fino a 5 s per una terminazione ordinata tramite SIGTERM (checkpoint WAL), quindi invia SIGKILL.
- Il selettore della porta nella tray (`20128`, `3000`, `8080`) arresta e riavvia il server, quindi ricarica la BrowserWindow.

## Bootstrap dei segreti senza configurazione

Al primo avvio, il processo principale genera automaticamente e salva i segreti mancanti:

| Segreto                  | Origine                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (rifiuta se esistono già credenziali cifrate) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                               |

Salvati in `<DATA_DIR>/server.env`. `DATA_DIR` viene risolto come segue:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` oppure `~/.omniroute`
- macOS: `~/.omniroute`

## Ricerca del file di ambiente

Prima di avviare il server, il processo principale (`getPreferredEnvFilePath()` in
`electron/main.js`) seleziona **un solo** file `.env`: il primo esistente tra i seguenti.

1. `$DATA_DIR/.env`, quando `DATA_DIR` è impostata nell'ambiente con cui è stata avviata l'app.
2. `<resolved DATA_DIR>/.env`, utilizzando gli stessi valori predefiniti indicati sopra: `%APPDATA%\omniroute\.env` su
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` oppure `~/.omniroute/.env` su Linux e macOS.
3. `.env` nella directory di lavoro del processo.

Il processo principale legge solo quel file; i candidati successivi non vengono uniti. L'ambiente
del server viene quindi creato con il seguente ordine di precedenza (dal più alto):

1. L'ambiente del processo Electron (le variabili ereditate da ciò che ha avviato l'app).
2. Il file `.env` selezionato.
3. `<DATA_DIR>/server.env` (i segreti di bootstrap indicati sopra).

L'ambiente del processo viene acquisito all'avvio dell'app, pertanto una variabile di ambiente
di sistema o dell'utente impostata mentre l'app è in esecuzione (anche quando rimane nella barra di sistema dopo la
chiusura della finestra) non raggiunge il server finché l'app non viene chiusa completamente e riavviata. Per le opzioni
di runtime come `CONTEXT_LENGTH_<PROVIDER>` (vedere
[Variabili di ambiente: lunghezza del contesto per provider](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
è preferibile usare il file `.env`, quindi chiudere completamente l'app (barra di sistema, **Esci**) e riavviarla.

## Finestra e barra di sistema

- `BrowserWindow`: 1400×900 (minimo 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, pulsanti di controllo della finestra in `{ x: 16, y: 16 }`.
- Windows/Linux: barra del titolo nativa.
- Il pulsante di chiusura riduce a icona nella barra di sistema; il relativo menu contiene **Apri OmniRoute**, **Apri dashboard** (browser esterno), il sottomenu **Porta del server**, **Controlla aggiornamenti**, **Esci**.

## Politica di sicurezza dei contenuti

Impostata tramite `session.defaultSession.webRequest.onHeadersReceived`. Direttive principali:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- La modalità di sviluppo aggiunge `'unsafe-eval'` solo a `script-src`

## Aggiornamento automatico

Utilizza `electron-updater` con il provider GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventi inoltrati al renderer tramite IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (con `percent`), `downloaded`, `error`
- `installUpdate()` termina il server e quindi chiama `autoUpdater.quitAndInstall()`
- Ignorato in modalità di sviluppo (`!app.isPackaged`)

## Pipeline di build

1. `npm run build` → build standalone di Next.js in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ricolloca i file in `.next/electron-standalone` e riscrive i percorsi assoluti all'interno di `server.js` + `required-server-files.json`, in modo che il bundle sia rilocabile.
3. `electron-builder` crea i pacchetti includendo `main.js`, `preload.js`, `node_modules` ed `extraResources: { ../.next/electron-standalone → app }`.

### Destinazioni di build

| SO      | Destinazioni                                       |
| ------- | -------------------------------------------------- |
| Windows | Programma di installazione NSIS + portabile (x64)  |
| macOS   | DMG (Intel + arm64, trascinamento in Applicazioni) |
| Linux   | AppImage + DEB (x64 + arm64)                       |

Impostazioni NSIS: `oneClick: false`, consente all'utente di scegliere la directory di installazione e crea collegamenti sul desktop e nel menu Start.

## Smoke test della build pacchettizzata

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Rileva automaticamente il binario pacchettizzato in `electron/dist-electron/` per la piattaforma corrente.
- Esegue l'avvio con directory `HOME`/`APPDATA`/`XDG_*` isolate, in modo da non modificare i dati dello sviluppatore.
- Interroga periodicamente `http://127.0.0.1:20128/login` per ottenere una risposta HTTP 200 entro 45 s.
- Monitora stderr/stdout alla ricerca di pattern fatali (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, ecc.).
- Attende 2 s di esecuzione stabile dopo che l'applicazione è pronta, quindi invia SIGTERM e attende che la porta venga liberata.
- Nella CI, passa automaticamente `--no-sandbox --disable-gpu` (e `--disable-dev-shm-usage` su Linux).

Override tramite variabili di ambiente: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Firma del codice

`electron/package.json` **non** configura direttamente le credenziali di firma. Passale tramite variabili di ambiente a `electron-builder`:

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

La firma di AppImage è facoltativa: imposta `LINUX_GPG_KEY` per firmarla.

## Distribuzione

Gli artefatti vengono generati in `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Le release vengono pubblicate su GitHub Releases (`diegosouzapw/OmniRoute`), che è anche la posizione in cui `electron-updater` verifica la presenza di nuove versioni.

## Risoluzione dei problemi

| Sintomo                                                                            | Soluzione                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` dopo un aggiornamento principale di Electron | better-sqlite3 v13 distribuisce build precompilate Node-API: esegui nuovamente `npm install` nella directory radice e `prepare:bundle` (verifica la build precompilata per la piattaforma corrente) |
| `ERR_DLOPEN_FAILED` per un modulo nativo                                           | Esegui nuovamente `prepare:bundle`: termina immediatamente con un errore quando manca la build precompilata Node-API per la piattaforma corrente                                                    |
| La finestra appare vuota su Linux                                                  | Verifica che il server Next.js sia effettivamente associato a PORT (controlla i log `[Server]`)                                                                                                     |
| La notarizzazione macOS si blocca                                                  | Assicurati che le variabili `APPLE_*` siano esportate e non soltanto presenti in `.env`                                                                                                             |
| Avviso di Windows SmartScreen                                                      | Firma con un certificato EV, oppure gli utenti possono fare clic con il pulsante destro → "Esegui comunque"                                                                                         |
| Lo smoke test non riesce perché la porta è in uso                                  | Arresta qualsiasi server di sviluppo locale sulla porta 20128 prima di eseguire `electron:smoke:packaged`                                                                                           |

## Vedi anche

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Codice sorgente: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Script di supporto: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
