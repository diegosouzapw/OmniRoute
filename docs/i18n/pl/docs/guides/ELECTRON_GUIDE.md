# Electron Desktop Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Źródło prawdy:** przestrzeń robocza `electron/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute jest dostarczany z wieloplatformową aplikacją desktopową (Windows / macOS / Linux) zbudowaną przy użyciu
**Electron 41** + **electron-builder 26.10**. Aplikacja desktopowa uruchamia autonomiczny serwer Next.js
jako proces potomny, kieruje do niego `BrowserWindow` oraz dodaje zasobnik
systemowy, mechanizm automatycznych aktualizacji, most IPC i bezkonfiguracyjną inicjalizację sekretów.

## Architektura

```
┌──────────────────────────────────────────────────┐
│ Główny proces Electron (electron/main.js)        │
│ ├─ Blokada pojedynczej instancji                 │
│ ├─ Proces potomny: autonomiczny serwer Next.js   │
│ │   (uruchamiany przez środowisko Node Electron) │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ Zasobnik systemowy + menu kontekstowe         │
│ ├─ Automatyczne aktualizacje przez electron-updater │
│ ├─ Content Security Policy (nagłówki sesji)      │
│ └─ Inicjalizacja sekretów (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────────┘
            ↕ Most IPC (electron/preload.js)
┌──────────────────────────────────────────────────┐
│ Proces renderujący (panel Next.js)               │
│   window.electronAPI.* (contextIsolation)        │
└──────────────────────────────────────────────────┘
```

## Wersje

Potwierdzone na podstawie `electron/package.json`:

| Pakiet                  | Wersja                                                                      |
| ----------------------- | --------------------------------------------------------------------------- |
| `electron`              | `^43.4.1`                                                                   |
| `electron-builder`      | `^26.15.3`                                                                  |
| `electron-updater`      | `^6.8.9`                                                                    |
| `better-sqlite3`        | główny `^13.0.2` (gotowe kompilacje Node-API — bez przebudowy dla Electron) |
| Wersja aplikacji        | `3.8.0`                                                                     |
| Identyfikator aplikacji | `online.omniroute.desktop`                                                  |
| Nazwa produktu          | `OmniRoute`                                                                 |

## Skrypty (główny `package.json`)

| Skrypt                            | Przeznaczenie                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Uruchamia `npm run dev`, czeka na `localhost:20128`, a następnie uruchamia Electron             |
| `npm run electron:build`          | Kompiluje Next.js, a następnie uruchamia `electron-builder` dla bieżącego systemu operacyjnego  |
| `npm run electron:build:win`      | Tworzy instalator Windows NSIS oraz wersję przenośną (x64)                                      |
| `npm run electron:build:mac`      | Tworzy obraz DMG dla macOS (Intel + Apple Silicon)                                              |
| `npm run electron:build:linux`    | Tworzy pakiety AppImage + DEB dla Linux (x64 + arm64)                                           |
| `npm run electron:smoke:packaged` | Uruchamia spakowany plik binarny, sprawdza, czy `/login` zwraca HTTP 200, a następnie go zamyka |

Przestrzeń robocza `electron/` udostępnia również:

- `npm run prepare:bundle` — uruchamia `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — kompilacje macOS dla pojedynczej architektury
- `npm run pack` — kompilacja wyłącznie do katalogu na potrzeby testów lokalnych (bez instalatora)

## Układ katalogów

```
electron/
├── package.json              # Zależności Electron + konfiguracja electron-builder
├── main.js                   # Proces główny (24 KB — zobacz adnotacje poniżej)
├── preload.js                # Most IPC contextBridge
├── types.d.ts                # Typy AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Notatki w obrębie przestrzeni roboczej
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Dane wyjściowe electron-builder (ignorowane przez git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Przygotowuje pakiet .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Test dymny po kompilacji
```

Zarówno `main.js`, jak i `preload.js` są **plikami CommonJS `.js`**, a nie TypeScript. Typy
po stronie renderera znajdują się w `electron/types.d.ts`.

## Most IPC (`preload.js`)

Skrypt preload udostępnia API z białej listy w `window.electronAPI`, używając `contextBridge`
z ustawieniami `contextIsolation: true` oraz `nodeIntegration: false`.

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

| Wywołanie renderera                                               | Typ                                  |
| ----------------------------------------------------------------- | ------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                               |
| `openExternal(url)`                                               | invoke                               |
| `getDataDir()`                                                    | invoke                               |
| `restartServer()`                                                 | invoke                               |
| `getAppVersion()`                                                 | invoke                               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (zwraca funkcję zwalniającą) |

Funkcje pomocnicze odbierania zwracają **funkcję zwalniającą** zamiast polegać na
`removeAllListeners` — zapobiega to kumulowaniu się procedur nasłuchujących podczas
ponownego montowania komponentów React.

## Cykl życia serwera

`main.js` uruchamia autonomiczny pakiet Next.js bezpośrednio za pomocą środowiska wykonawczego Node
wbudowanego w Electron, aby uniknąć niezgodności ABI modułów natywnych z systemowym Node:

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

Najważniejsze informacje:

- `waitForServer()` odpytuje adres URL przez maksymalnie 30 s przed wyświetleniem okna (bez pustego ekranu przy zimnym starcie).
- `stdio: "pipe"` przechwytuje stdout/stderr; frazy sygnalizujące gotowość (`Ready` / `listening`) emitują przez IPC komunikat `server-status: running`.
- `before-quit` czeka do 5 s na łagodne zakończenie przez SIGTERM (punkt kontrolny WAL), a następnie wysyła SIGKILL.
- Przełącznik portów w zasobniku systemowym (`20128`, `3000`, `8080`) zatrzymuje i ponownie uruchamia serwer, a następnie przeładowuje BrowserWindow.

## Automatyczna inicjalizacja sekretów bez konfiguracji

Podczas pierwszego uruchomienia proces główny automatycznie generuje i zapisuje brakujące sekrety:

| Sekret                   | Źródło                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmawia, jeśli zaszyfrowane dane uwierzytelniające już istnieją) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

Zapisywane w `<DATA_DIR>/server.env`. Wartość `DATA_DIR` jest ustalana jako:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` lub `~/.omniroute`
- macOS: `~/.omniroute`

## Wyszukiwanie pliku środowiskowego

Przed uruchomieniem serwera proces główny (`getPreferredEnvFilePath()` w
`electron/main.js`) wybiera **jeden** plik `.env`: pierwszy istniejący plik z poniższej listy.

1. `$DATA_DIR/.env`, gdy `DATA_DIR` jest ustawiona w środowisku, z którego uruchomiono aplikację.
2. `<resolved DATA_DIR>/.env`, przy użyciu tych samych wartości domyślnych co powyżej: `%APPDATA%\omniroute\.env` w
   systemie Windows, `$XDG_CONFIG_HOME/omniroute/.env` lub `~/.omniroute/.env` w systemach Linux i macOS.
3. `.env` w katalogu roboczym procesu.

Proces główny odczytuje tylko ten plik; późniejsze pliki kandydujące nie są z nim scalane. Środowisko
serwera jest następnie tworzone z następującym priorytetem (od najwyższego):

1. Środowisko procesu Electron (zmienne odziedziczone po procesie, który uruchomił aplikację).
2. Wybrany plik `.env`.
3. `<DATA_DIR>/server.env` (powyższe sekrety inicjalizacyjne).

Środowisko procesu jest przechwytywane podczas uruchamiania aplikacji, dlatego systemowa lub użytkownika
zmienna środowiskowa ustawiona w trakcie działania aplikacji (również gdy aplikacja pozostaje w zasobniku po
zamknięciu jej okna) nie trafia do serwera, dopóki aplikacja nie zostanie całkowicie zamknięta i ponownie uruchomiona. W przypadku ustawień
środowiska uruchomieniowego, takich jak `CONTEXT_LENGTH_<PROVIDER>` (zobacz
[Zmienne środowiskowe: długość kontekstu dla poszczególnych dostawców](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
preferuj plik `.env`, a następnie całkowicie zamknij aplikację (zasobnik, **Zakończ**) i uruchom ją ponownie.

## Okno i zasobnik

- `BrowserWindow`: 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, przyciski sterowania oknem w pozycji `{ x: 16, y: 16 }`.
- Windows/Linux: natywny pasek tytułu.
- Przycisk zamknięcia minimalizuje aplikację do zasobnika; menu zasobnika zawiera opcje **Otwórz OmniRoute**, **Otwórz panel** (w zewnętrznej przeglądarce), podmenu **Port serwera**, **Sprawdź dostępność aktualizacji**, **Zakończ**.

## Polityka bezpieczeństwa treści

Ustawiana za pomocą `session.defaultSession.webRequest.onHeadersReceived`. Istotne dyrektywy:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Tryb deweloperski dodaje `'unsafe-eval'` wyłącznie do `script-src`

## Automatyczne aktualizacje

Wykorzystuje `electron-updater` z dostawcą GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Zdarzenia przekazywane do procesu renderującego przez IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (z wartością `percent`), `downloaded`, `error`
- `installUpdate()` zatrzymuje serwer, a następnie wywołuje `autoUpdater.quitAndInstall()`
- Pomijane w trybie deweloperskim (`!app.isPackaged`)

## Potok kompilacji

1. `npm run build` → samodzielna wersja Next.js w `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponownie rozmieszcza pliki w `.next/electron-standalone` i przepisuje ścieżki bezwzględne wewnątrz `server.js` oraz `required-server-files.json`, aby pakiet można było przenosić.
3. `electron-builder` pakuje `main.js`, `preload.js`, `node_modules` oraz `extraResources: { ../.next/electron-standalone → app }`.

### Docelowe formaty kompilacji

| System  | Docelowe formaty                               |
| ------- | ---------------------------------------------- |
| Windows | Instalator NSIS + wersja przenośna (x64)       |
| macOS   | DMG (Intel + arm64, przeciąganie do Aplikacji) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

Ustawienia NSIS: `oneClick: false`, umożliwiają użytkownikowi wybór katalogu instalacyjnego oraz tworzą skróty na pulpicie i w menu Start.

## Test dymny spakowanej kompilacji

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatycznie wykrywa spakowany plik wykonywalny w `electron/dist-electron/` dla bieżącej platformy.
- Uruchamia go z odizolowanymi katalogami `HOME`/`APPDATA`/`XDG_*`, aby nie modyfikować danych dewelopera.
- Odpytuje `http://127.0.0.1:20128/login` w oczekiwaniu na odpowiedź HTTP 200 w ciągu 45 s.
- Monitoruje stderr/stdout pod kątem krytycznych wzorców (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itd.).
- Po osiągnięciu gotowości czeka 2 s stabilnego działania, następnie wysyła SIGTERM i czeka na zwolnienie portu.
- W CI automatycznie przekazuje `--no-sandbox --disable-gpu` (oraz `--disable-dev-shm-usage` w systemie Linux).

Nadpisywanie za pomocą zmiennych środowiskowych: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisywanie kodu

`electron/package.json` **nie** zawiera bezpośrednio poświadczeń do podpisywania. Przekaż je do `electron-builder` za pomocą zmiennych środowiskowych:

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

Podpisywanie AppImage jest opcjonalne — ustaw `LINUX_GPG_KEY`, aby włączyć podpisywanie.

## Dystrybucja

Artefakty są zapisywane w `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Wydania są publikowane w GitHub Releases (`diegosouzapw/OmniRoute`), gdzie `electron-updater` sprawdza również dostępność nowych wersji.

## Rozwiązywanie problemów

| Objaw                                                                  | Rozwiązanie                                                                                                                                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` po głównej aktualizacji Electron | better-sqlite3 v13 zawiera prekompilowane pliki Node-API — ponownie uruchom `npm install` w katalogu głównym oraz `prepare:bundle` (weryfikuje prekompilowany plik dla bieżącej platformy) |
| `ERR_DLOPEN_FAILED` dla modułu natywnego                               | Ponownie uruchom `prepare:bundle` — proces natychmiast kończy się błędem, gdy brakuje prekompilowanego pliku Node-API dla bieżącej platformy                                               |
| Okno w systemie Linux jest puste                                       | Potwierdź, że serwer Next.js faktycznie nasłuchuje na PORT (sprawdź dzienniki `[Server]`)                                                                                                  |
| Notaryzacja w systemie macOS zatrzymuje się                            | Upewnij się, że zmienne `APPLE_*` zostały wyeksportowane, a nie tylko zapisane w `.env`                                                                                                    |
| Ostrzeżenie Windows SmartScreen                                        | Podpisz certyfikatem EV lub poinstruuj użytkowników, aby kliknęli prawym przyciskiem myszy → „Uruchom mimo to”                                                                             |
| Test dymny kończy się niepowodzeniem z powodu zajętego portu           | Przed uruchomieniem `electron:smoke:packaged` zatrzymaj lokalny serwer deweloperski działający na porcie 20128                                                                             |

## Zobacz także

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Źródła: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Skrypty pomocnicze: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
