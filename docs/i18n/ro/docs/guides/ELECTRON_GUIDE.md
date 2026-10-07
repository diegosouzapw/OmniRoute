# Electron Desktop Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sursa adevărului:** spațiul de lucru `electron/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute include o aplicație desktop multiplatformă (Windows / macOS / Linux), construită pe
**Electron 41** + **electron-builder 26.10**. Aplicația desktop pornește serverul autonom Next.js
ca proces copil, direcționează un `BrowserWindow` către acesta și adaugă o
pictogramă în bara de sistem, actualizare automată, o punte IPC și inițializarea fără configurare a secretelor.

## Arhitectură

```
┌─────────────────────────────────────────────────────┐
│ Procesul principal Electron (electron/main.js)      │
│ ├─ Blocare la o singură instanță                    │
│ ├─ Proces copil: server autonom Next.js             │
│ │   (pornit cu mediul de execuție Node al Electron) │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Bară de sistem + meniu contextual                │
│ ├─ Actualizare automată prin electron-updater       │
│ ├─ Politică de securitate a conținutului            │
│ │   (antetele sesiunii)                             │
│ └─ Inițializarea secretelor (JWT / API_KEY_SECRET)  │
└─────────────────────────────────────────────────────┘
            ↕ Punte IPC (electron/preload.js)
┌─────────────────────────────────────────────────────┐
│ Proces de randare (panou de control Next.js)        │
│   window.electronAPI.* (contextIsolation)           │
└─────────────────────────────────────────────────────┘
```

## Versiuni

Confirmate din `electron/package.json`:

| Pachet               | Versiune                                                                        |
| -------------------- | ------------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                       |
| `electron-builder`   | `^26.15.3`                                                                      |
| `electron-updater`   | `^6.8.9`                                                                        |
| `better-sqlite3`     | rădăcină `^13.0.2` (versiuni Node-API precompilate — fără recompilare Electron) |
| Versiunea aplicației | `3.8.0`                                                                         |
| ID-ul aplicației     | `online.omniroute.desktop`                                                      |
| Numele produsului    | `OmniRoute`                                                                     |

## Scripturi (`package.json` din rădăcină)

| Script                            | Scop                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pornește `npm run dev` + așteaptă `localhost:20128` + lansează Electron                     |
| `npm run electron:build`          | Compilează Next.js, apoi rulează `electron-builder` pentru sistemul de operare curent       |
| `npm run electron:build:win`      | Creează programul de instalare NSIS pentru Windows + versiunea portabilă (x64)              |
| `npm run electron:build:mac`      | Creează imaginea DMG pentru macOS (Intel + Apple Silicon)                                   |
| `npm run electron:build:linux`    | Creează pachetele AppImage + DEB pentru Linux (x64 + arm64)                                 |
| `npm run electron:smoke:packaged` | Lansează binarul împachetat și verifică dacă `/login` răspunde cu HTTP 200, apoi îl oprește |

Spațiul de lucru `electron/` expune, de asemenea:

- `npm run prepare:bundle` — rulează `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilări macOS pentru o singură arhitectură
- `npm run pack` — compilare doar ca director pentru testare locală (fără program de instalare)

## Structura directoarelor

```
electron/
├── package.json              # Dependențe Electron + configurație electron-builder
├── main.js                   # Proces principal (24 KB — consultați adnotările de mai jos)
├── preload.js                # Punte IPC contextBridge
├── types.d.ts                # Tipuri AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Note din spațiul de lucru
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Rezultatul electron-builder (ignorat de git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Pregătește pachetul .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Test rapid după compilare
```

Atât `main.js`, cât și `preload.js` sunt **fișiere CommonJS `.js`**, nu TypeScript. Tipurile
pentru partea de renderer se află în `electron/types.d.ts`.

## Puntea IPC (`preload.js`)

Scriptul de preîncărcare expune un API permis explicit în `window.electronAPI`, utilizând `contextBridge`
cu `contextIsolation: true` și `nodeIntegration: false`.

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

Metode expuse:

| Apel din renderer                                                 | Tip                                         |
| ----------------------------------------------------------------- | ------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                      |
| `openExternal(url)`                                               | invoke                                      |
| `getDataDir()`                                                    | invoke                                      |
| `restartServer()`                                                 | invoke                                      |
| `getAppVersion()`                                                 | invoke                                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (returnează o funcție de eliminare) |

Funcțiile auxiliare de recepționare returnează o **funcție de eliminare** în loc să se bazeze pe
`removeAllListeners` — astfel este prevenită acumularea ascultătorilor atunci când componentele React
sunt remontate.

## Ciclul de viață al serverului

`main.js` pornește direct pachetul autonom Next.js folosind mediul de execuție Node al Electron,
pentru a evita incompatibilitatea ABI a modulelor native cu versiunea Node din sistem:

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

Aspecte importante:

- `waitForServer()` interoghează periodic URL-ul timp de până la 30 s înainte de afișarea ferestrei (fără ecran gol la pornirea la rece).
- `stdio: "pipe"` capturează stdout/stderr; expresiile care indică disponibilitatea (`Ready` / `listening`) emit `server-status: running` prin IPC.
- `before-quit` așteaptă până la 5 s pentru un SIGTERM controlat (punct de control WAL), apoi trimite SIGKILL.
- Selectorul de porturi din zona de notificare (`20128`, `3000`, `8080`) oprește și repornește serverul, apoi reîncarcă fereastra BrowserWindow.

## Inițializarea secretelor fără configurare

La prima lansare, procesul principal generează automat și salvează secretele care lipsesc:

| Secret                   | Sursă                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (refuză dacă există deja credențiale criptate) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                |

Sunt salvate în `<DATA_DIR>/server.env`. `DATA_DIR` este rezolvat astfel:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` sau `~/.omniroute`
- macOS: `~/.omniroute`

## Căutarea fișierului de mediu

Înainte de a porni serverul, procesul principal (`getPreferredEnvFilePath()` din
`electron/main.js`) alege **un singur** fișier `.env`: primul dintre următoarele care există.

1. `$DATA_DIR/.env`, când `DATA_DIR` este setat în mediul din care a fost lansată aplicația.
2. `<resolved DATA_DIR>/.env`, folosind aceleași valori implicite ca mai sus: `%APPDATA%\omniroute\.env` pe
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` sau `~/.omniroute/.env` pe Linux și macOS.
3. `.env` din directorul de lucru al procesului.

Procesul principal citește numai acel fișier; candidații ulteriori nu sunt îmbinați. Mediul
serverului este apoi construit cu următoarea ordine de prioritate (de la cea mai mare la cea mai mică):

1. Mediul procesului Electron (variabilele moștenite de la procesul care a lansat aplicația).
2. Fișierul `.env` selectat.
3. `<DATA_DIR>/server.env` (secretele de inițializare de mai sus).

Mediul procesului este capturat la pornirea aplicației, astfel încât o variabilă de mediu de sistem
sau de utilizator setată în timp ce aplicația rulează (inclusiv atunci când rămâne în zona de
notificare după închiderea ferestrei) nu ajunge la server până când aplicația nu este închisă complet
și relansată. Pentru opțiuni configurabile în timpul rulării, precum `CONTEXT_LENGTH_<PROVIDER>` (consultați
[Variabile de mediu: lungimea contextului pentru fiecare furnizor](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
utilizați de preferință fișierul `.env`, apoi închideți complet aplicația (zona de notificare, **Ieșire**) și relansați-o.

## Fereastră și zona de notificare

- `BrowserWindow`: 1400×900 (minim 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, butoanele de control ale ferestrei la `{ x: 16, y: 16 }`.
- Windows/Linux: bară de titlu nativă.
- Butonul de închidere minimizează aplicația în zona de notificare; meniul din zona de notificare conține **Deschide OmniRoute**, **Deschide panoul de control** (în browserul extern), submeniul **Port server**, **Verifică actualizările**, **Ieșire**.

## Politica de securitate a conținutului

Setată prin `session.defaultSession.webRequest.onHeadersReceived`. Directive importante:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Modul de dezvoltare adaugă `'unsafe-eval'` la `script-src` doar în acest mod

## Actualizare automată

Utilizează `electron-updater` cu furnizorul GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Evenimente transmise către procesul de randare prin IPC-ul `update-status`:
  `checking`, `available`, `not-available`, `downloading` (cu `percent`), `downloaded`, `error`
- `installUpdate()` oprește serverul, apoi apelează `autoUpdater.quitAndInstall()`
- Omisă în modul de dezvoltare (`!app.isPackaged`)

## Fluxul de compilare

1. `npm run build` → versiune autonomă Next.js în `.next/standalone`.
2. `prepare-electron-standalone.mjs` → reorganizează fișierele în `.next/electron-standalone` și rescrie căile absolute din `server.js` + `required-server-files.json`, astfel încât pachetul să poată fi relocat.
3. `electron-builder` împachetează `main.js`, `preload.js`, `node_modules` și `extraResources: { ../.next/electron-standalone → app }`.

### Ținte de compilare

| SO      | Ținte                                        |
| ------- | -------------------------------------------- |
| Windows | Program de instalare NSIS + portabil (x64)   |
| macOS   | DMG (Intel + arm64, tragere în Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

Setări NSIS: `oneClick: false`, permite utilizatorului să aleagă directorul de instalare și creează scurtături pe desktop și în meniul Start.

## Testarea rapidă a versiunii împachetate

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Descoperă automat executabilul împachetat din `electron/dist-electron/` pentru platforma curentă.
- Îl lansează cu directoare `HOME`/`APPDATA`/`XDG_*` izolate, astfel încât să nu acceseze datele dezvoltatorului.
- Interoghează periodic `http://127.0.0.1:20128/login` pentru a obține HTTP 200 în maximum 45 s.
- Monitorizează stderr/stdout pentru tipare fatale (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` etc.).
- Așteaptă 2 s de funcționare stabilă după ce aplicația devine disponibilă, apoi trimite SIGTERM și așteaptă eliberarea portului.
- În CI, transmite automat `--no-sandbox --disable-gpu` (și `--disable-dev-shm-usage` pe Linux).

Suprascrieri prin variabile de mediu: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Semnarea codului

`electron/package.json` **nu** configurează direct acreditările de semnare. Transmiteți-le prin variabile de mediu către `electron-builder`:

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

Semnarea AppImage este opțională — setați `LINUX_GPG_KEY` dacă doriți semnarea.

## Distribuție

Artefactele sunt generate în `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Versiunile sunt publicate în GitHub Releases (`diegosouzapw/OmniRoute`), unde `electron-updater` verifică și disponibilitatea versiunilor noi.

## Depanare

| Simptom                                                                   | Remediere                                                                                                                                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` după actualizarea majoră a Electron | better-sqlite3 v13 include versiuni precompilate Node-API — rulați din nou `npm install` în rădăcină și `prepare:bundle` (acesta verifică versiunea precompilată pentru platforma curentă) |
| `ERR_DLOPEN_FAILED` pentru un modul nativ                                 | Rulați din nou `prepare:bundle` — acesta eșuează imediat când lipsește versiunea precompilată Node-API pentru platforma curentă                                                            |
| Fereastra apare goală pe Linux                                            | Confirmați că serverul Next.js este asociat efectiv la PORT (verificați jurnalele `[Server]`)                                                                                              |
| Notarizarea macOS se blochează                                            | Asigurați-vă că variabilele `APPLE_*` sunt exportate, nu doar definite în `.env`                                                                                                           |
| Avertisment Windows SmartScreen                                           | Semnați cu un certificat EV sau utilizatorii pot face clic dreapta → „Rulați oricum”                                                                                                       |
| Testul rapid eșuează deoarece portul este utilizat                        | Opriți orice server local de dezvoltare de pe 20128 înainte de a rula `electron:smoke:packaged`                                                                                            |

## Consultați și

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sursă: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Utilitare: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
