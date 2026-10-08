# Electron Desktop Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Zdroj pravdy:** pracovní prostor `electron/`
> **Naposledy aktualizováno:** 2026-06-28 — v3.8.40

OmniRoute obsahuje multiplatformní desktopovou aplikaci (Windows / macOS / Linux) postavenou na
**Electron 41** + **electron-builder 26.10**. Desktopová aplikace spouští samostatný server Next.js
jako podřízený proces, směruje na něj `BrowserWindow` a přidává ikonu v systémové oblasti,
automatické aktualizace, most IPC a inicializaci tajných klíčů bez nutnosti konfigurace.

## Architektura

```
┌──────────────────────────────────────────────┐
│ Hlavní proces Electronu (electron/main.js)   │
│ ├─ Zámek jediné instance                     │
│ ├─ Podřízený proces: samostatný server Next.js│
│ │   (spuštěný pomocí běhového prostředí Node v Electronu)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Systémová oblast + kontextová nabídka     │
│ ├─ Automatické aktualizace přes electron-updater│
│ ├─ Zásady zabezpečení obsahu (hlavičky relace)│
│ └─ Inicializace tajných klíčů (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ Most IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Vykreslovací proces (ovládací panel Next.js) │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Verze

Potvrzeno z `electron/package.json`:

| Balíček            | Verze                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                       |
| `electron-builder` | `^26.15.3`                                                                                      |
| `electron-updater` | `^6.8.9`                                                                                        |
| `better-sqlite3`   | kořenový `^13.0.2` (předkompilované sestavení Node-API — bez opětovného sestavení pro Electron) |
| Verze aplikace     | `3.8.0`                                                                                         |
| ID aplikace        | `online.omniroute.desktop`                                                                      |
| Název produktu     | `OmniRoute`                                                                                     |

## Skripty (kořenový `package.json`)

| Skript                            | Účel                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Spustí `npm run dev`, počká na `localhost:20128` a spustí Electron                   |
| `npm run electron:build`          | Sestaví Next.js a poté spustí `electron-builder` pro aktuální operační systém        |
| `npm run electron:build:win`      | Sestaví instalační program NSIS pro Windows a přenosnou verzi (x64)                  |
| `npm run electron:build:mac`      | Sestaví DMG pro macOS (Intel + Apple Silicon)                                        |
| `npm run electron:build:linux`    | Sestaví AppImage + DEB pro Linux (x64 + arm64)                                       |
| `npm run electron:smoke:packaged` | Spustí zabalený binární soubor, ověří odpověď HTTP 200 na `/login` a poté jej ukončí |

Pracovní prostor `electron/` také zpřístupňuje:

- `npm run prepare:bundle` — spustí `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — sestavení macOS pro jednu architekturu
- `npm run pack` — sestavení pouze do adresáře pro místní testování (bez instalačního programu)

## Struktura adresářů

```
electron/
├── package.json              # Závislosti Electronu + konfigurace electron-builder
├── main.js                   # Hlavní proces (24 KB — viz poznámky níže)
├── preload.js                # Most IPC přes contextBridge
├── types.d.ts                # Typy AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Poznámky v pracovním prostoru
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Výstup electron-builder (ignorován gitem)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Připravuje balíček .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Rychlý test po sestavení
```

Soubory `main.js` i `preload.js` jsou **soubory CommonJS `.js`**, nikoli TypeScript. Typové
definice pro renderer se nacházejí v `electron/types.d.ts`.

## Most IPC (`preload.js`)

Preload zpřístupňuje povolené API v `window.electronAPI` pomocí `contextBridge`
s nastavením `contextIsolation: true` a `nodeIntegration: false`.

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

Zpřístupněné metody:

| Volání z rendereru                                                | Typ                       |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                    |
| `openExternal(url)`                                               | invoke                    |
| `getDataDir()`                                                    | invoke                    |
| `restartServer()`                                                 | invoke                    |
| `getAppVersion()`                                                 | invoke                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (vrací odpojovač) |

Pomocné funkce pro příjem vracejí **funkci pro odpojení** namísto spoléhání na
`removeAllListeners` — tím se zabrání hromadění posluchačů při opětovném připojování
komponent Reactu.

## Životní cyklus serveru

`main.js` spouští samostatný balíček Next.js přímo pomocí běhového prostředí Node
v Electronu, aby zabránil neshodě ABI nativních modulů se systémovým Node:

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

Hlavní vlastnosti:

- `waitForServer()` dotazuje URL po dobu až 30 s před zobrazením okna (žádná prázdná obrazovka při studeném spuštění).
- `stdio: "pipe"` zachycuje stdout/stderr; fráze signalizující připravenost (`Ready` / `listening`) přes IPC vysílají `server-status: running`.
- `before-quit` čeká až 5 s na korektní ukončení pomocí SIGTERM (kontrolní bod WAL) a poté odešle SIGKILL.
- Přepínač portů v systémové liště (`20128`, `3000`, `8080`) zastaví a restartuje server a poté znovu načte BrowserWindow.

## Zavedení tajných klíčů bez konfigurace

Při prvním spuštění hlavní proces automaticky vygeneruje a trvale uloží chybějící tajné klíče:

| Tajný klíč               | Zdroj                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmítne pokračovat, pokud již existují šifrované přihlašovací údaje) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                       |

Ukládají se do `<DATA_DIR>/server.env`. `DATA_DIR` se vyhodnotí takto:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` nebo `~/.omniroute`
- macOS: `~/.omniroute`

## Vyhledávání souboru prostředí

Před spuštěním serveru hlavní proces (`getPreferredEnvFilePath()` v
`electron/main.js`) vybere **jeden** soubor `.env`: první z následujících, který existuje.

1. `$DATA_DIR/.env`, pokud je `DATA_DIR` nastaveno v prostředí, ze kterého byla aplikace spuštěna.
2. `<resolved DATA_DIR>/.env` se stejnými výchozími hodnotami jako výše: `%APPDATA%\omniroute\.env` ve
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` nebo `~/.omniroute/.env` v Linuxu a macOS.
3. `.env` v pracovním adresáři procesu.

Hlavní proces načte pouze tento soubor; pozdější kandidáti se neslučují. Prostředí serveru
je poté sestaveno s následující prioritou (od nejvyšší):

1. Prostředí procesu Electron (proměnné zděděné z procesu, který aplikaci spustil).
2. Vybraný soubor `.env`.
3. `<DATA_DIR>/server.env` (výše uvedené automaticky vytvořené tajné klíče).

Prostředí procesu je zachyceno při spuštění aplikace, takže systémová nebo uživatelská proměnná
prostředí nastavená za běhu aplikace (včetně doby, kdy aplikace zůstává v oznamovací oblasti po
zavření okna) se na server nepřenese, dokud není aplikace zcela ukončena a znovu spuštěna. Pro parametry
běhového prostředí, jako je `CONTEXT_LENGTH_<PROVIDER>` (viz
[Proměnné prostředí: Délka kontextu pro jednotlivé poskytovatele](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
upřednostněte soubor `.env`, poté aplikaci zcela ukončete (oznamovací oblast, **Ukončit**) a znovu ji spusťte.

## Okno a oznamovací oblast

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ovládací prvky okna na `{ x: 16, y: 16 }`.
- Windows/Linux: nativní záhlaví okna.
- Tlačítko zavření minimalizuje aplikaci do oznamovací oblasti; její nabídka obsahuje **Otevřít OmniRoute**, **Otevřít řídicí panel** (v externím prohlížeči), podnabídku **Port serveru**, **Zkontrolovat aktualizace** a **Ukončit**.

## Zásady zabezpečení obsahu

Nastavují se prostřednictvím `session.defaultSession.webRequest.onHeadersReceived`. Významné direktivy:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Vývojový režim přidává `'unsafe-eval'` pouze do `script-src`

## Automatické aktualizace

Používá `electron-updater` s poskytovatelem GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Události předávané rendereru prostřednictvím IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (s `percent`), `downloaded`, `error`
- `installUpdate()` ukončí server a poté zavolá `autoUpdater.quitAndInstall()`
- Ve vývojovém režimu se vynechává (`!app.isPackaged`)

## Proces sestavení

1. `npm run build` → samostatná aplikace Next.js v `.next/standalone`.
2. `prepare-electron-standalone.mjs` → znovu připraví obsah do `.next/electron-standalone` a přepíše absolutní cesty v souborech `server.js` + `required-server-files.json`, aby bylo možné balíček přemístit.
3. `electron-builder` zabalí `main.js`, `preload.js`, `node_modules` a `extraResources: { ../.next/electron-standalone → app }`.

### Cílové platformy sestavení

| OS      | Cíle                                           |
| ------- | ---------------------------------------------- |
| Windows | Instalační program NSIS + přenosná verze (x64) |
| macOS   | DMG (Intel + arm64, přetažení do Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

Nastavení NSIS: `oneClick: false`, umožňuje uživateli zvolit instalační adresář a vytváří zástupce na ploše a v nabídce Start.

## Základní test zabaleného sestavení

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automaticky vyhledá zabalený spustitelný soubor v `electron/dist-electron/` pro aktuální platformu.
- Spustí jej s izolovanými adresáři `HOME`/`APPDATA`/`XDG_*`, aby nezasahoval do dat vývojáře.
- Opakovaně kontroluje `http://127.0.0.1:20128/login`, zda do 45 s vrátí HTTP 200.
- Sleduje stderr/stdout a hledá kritické vzory (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` atd.).
- Po dosažení připraveného stavu čeká 2 s stabilního běhu, poté odešle SIGTERM a počká na uvolnění portu.
- V CI automaticky předá `--no-sandbox --disable-gpu` (a na Linuxu také `--disable-dev-shm-usage`).

Proměnné prostředí pro přepsání nastavení: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podepisování kódu

`electron/package.json` **neobsahuje** přímo přihlašovací údaje pro podepisování. Předejte je nástroji `electron-builder` prostřednictvím proměnných prostředí:

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

Podepisování AppImage je volitelné — pro podepsání nastavte `LINUX_GPG_KEY`.

## Distribuce

Artefakty se ukládají do `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Vydání jsou publikována v GitHub Releases (`diegosouzapw/OmniRoute`), kde také `electron-updater` kontroluje dostupnost nových verzí.

## Řešení problémů

| Příznak                                                                           | Řešení                                                                                                                                                                                           |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` po přechodu na novou hlavní verzi Electronu | better-sqlite3 v13 obsahuje předkompilované binární soubory Node-API — znovu spusťte `npm install` v kořenovém adresáři a `prepare:bundle` (ověří předkompilovaný soubor pro aktuální platformu) |
| `ERR_DLOPEN_FAILED` pro nativní modul                                             | Znovu spusťte `prepare:bundle` — pokud předkompilovaný soubor Node-API pro aktuální platformu chybí, okamžitě skončí s chybou                                                                    |
| V Linuxu se zobrazí prázdné okno                                                  | Ověřte, že se server Next.js skutečně navázal na PORT (zkontrolujte protokoly `[Server]`)                                                                                                        |
| Notarizace v macOS se zasekne                                                     | Ujistěte se, že jsou proměnné `APPLE_*` exportovány, nikoli pouze uvedeny v `.env`                                                                                                               |
| Varování Windows SmartScreen                                                      | Podepište aplikaci certifikátem EV, nebo mohou uživatelé kliknout pravým tlačítkem → „Přesto spustit“                                                                                            |
| Základní test selže kvůli používanému portu                                       | Před spuštěním `electron:smoke:packaged` zastavte všechny místní vývojové servery na portu 20128                                                                                                 |

## Viz také

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Zdroj: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomocné skripty: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
