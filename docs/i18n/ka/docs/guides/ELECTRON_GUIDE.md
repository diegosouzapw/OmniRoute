# Electron Desktop Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **უტყუარი წყარო:** `electron/` სამუშაო სივრცე
> **ბოლოს განახლდა:** 2026-06-28 — v3.8.40

OmniRoute მოიცავს მრავალპლატფორმიან დესკტოპ აპლიკაციას (Windows / macOS / Linux), რომელიც აგებულია
**Electron 41** + **electron-builder 26.10**-ზე. დესკტოპ აპლიკაცია შვილობილ პროცესად უშვებს Next.js-ის
დამოუკიდებელ სერვერს, მისკენ მიმართავს `BrowserWindow`-ს და ამატებს
სისტემურ პანელს, ავტომატურ განახლებას, IPC ხიდსა და ნულოვანი კონფიგურაციის მქონე საიდუმლო მონაცემების ინიციალიზაციას.

## არქიტექტურა

```
┌──────────────────────────────────────────────┐
│ Electron-ის მთავარი პროცესი (electron/main.js)│
│ ├─ ერთი ეგზემპლარის ბლოკირება                │
│ ├─ შვილობილი პროცესი: Next.js-ის             │
│ │   დამოუკიდებელი სერვერი                    │
│ │   (გაშვებულია Electron-ის Node გარემოში)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ სისტემური პანელი + კონტექსტური მენიუ      │
│ ├─ ავტომატური განახლება electron-updater-ით  │
│ ├─ კონტენტის უსაფრთხოების პოლიტიკა           │
│ │   (სესიის სათაურები)                       │
│ └─ საიდუმლო მონაცემების ინიციალიზაცია        │
│     (JWT / API_KEY_SECRET)                   │
└──────────────────────────────────────────────┘
            ↕ IPC ხიდი (electron/preload.js)
┌──────────────────────────────────────────────┐
│ რენდერერი (Next.js-ის მართვის პანელი)        │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## ვერსიები

დადასტურებულია `electron/package.json`-იდან:

| პაკეტი             | ვერსია                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                     |
| `electron-builder` | `^26.15.3`                                                                                    |
| `electron-updater` | `^6.8.9`                                                                                      |
| `better-sqlite3`   | ძირეული `^13.0.2` (Node-API-ის მზა ანაწყობები — Electron-ისთვის ხელახლა აგება არ არის საჭირო) |
| აპლიკაციის ვერსია  | `3.8.0`                                                                                       |
| აპლიკაციის ID      | `online.omniroute.desktop`                                                                    |
| პროდუქტის სახელი   | `OmniRoute`                                                                                   |

## სკრიპტები (ძირეული `package.json`)

| სკრიპტი                           | დანიშნულება                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | უშვებს `npm run dev`-ს + ელოდება `localhost:20128`-ს + უშვებს Electron-ს                 |
| `npm run electron:build`          | აგებს Next.js-ს, შემდეგ კი მიმდინარე ოპერაციული სისტემისთვის უშვებს `electron-builder`-ს |
| `npm run electron:build:win`      | აგებს Windows-ის NSIS ინსტალატორს + პორტატიულ ვერსიას (x64)                              |
| `npm run electron:build:mac`      | აგებს macOS-ის DMG-ს (Intel + Apple Silicon)                                             |
| `npm run electron:build:linux`    | აგებს Linux-ის AppImage-ს + DEB-ს (x64 + arm64)                                          |
| `npm run electron:smoke:packaged` | უშვებს შეფუთულ ბინარულ ფაილს და ამოწმებს `/login`-ს HTTP 200 პასუხზე, შემდეგ კი თიშავს   |

`electron/` სამუშაო სივრცე ასევე ხელმისაწვდომს ხდის:

- `npm run prepare:bundle` — უშვებს `scripts/build/prepare-electron-standalone.mjs`-ს
- `npm run build:mac-x64` / `build:mac-arm64` — macOS-ის ცალკეული არქიტექტურის ანაწყობები
- `npm run pack` — მხოლოდ დირექტორიის ანაწყობი ლოკალური ტესტირებისთვის (ინსტალატორის გარეშე)

## დირექტორიების სტრუქტურა

```
electron/
├── package.json              # Electron-ის დამოკიდებულებები + electron-builder-ის კონფიგურაცია
├── main.js                   # მთავარი პროცესი (24 KB — იხილეთ ქვემოთ მოცემული ანოტაციები)
├── preload.js                # contextBridge IPC ხიდი
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI ტიპები
├── README.md                 # სამუშაო სივრცის შენიშვნები
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-ის გამომავალი ფაილები (git-ის მიერ იგნორირებული)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # ამზადებს .next/electron-standalone პაკეტს
└── dev/
    └── smoke-electron-packaged.mjs       # აგების შემდგომი smoke-ტესტი
```

ორივე, `main.js` და `preload.js`, არის **CommonJS `.js` ფაილები** და არა TypeScript.
რენდერერის მხარის ტიპების აღწერები განთავსებულია `electron/types.d.ts`-ში.

## IPC ხიდი (`preload.js`)

წინასწარი ჩატვირთვის სკრიპტი `contextBridge`-ის გამოყენებით `window.electronAPI`-ში ხელმისაწვდომს ხდის თეთრ სიაში შეტანილ API-ს,
`contextIsolation: true` და `nodeIntegration: false` პარამეტრებით.

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

ხელმისაწვდომი მეთოდები:

| რენდერერის გამოძახება                                             | ტიპი                         |
| ----------------------------------------------------------------- | ---------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | გამოძახება                   |
| `openExternal(url)`                                               | გამოძახება                   |
| `getDataDir()`                                                    | გამოძახება                   |
| `restartServer()`                                                 | გამოძახება                   |
| `getAppVersion()`                                                 | გამოძახება                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | გამოძახება                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | გაგზავნა                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | მიღება (აბრუნებს გამთიშველს) |

მიღების დამხმარე ფუნქციები `removeAllListeners`-ზე დაყრდნობის ნაცვლად აბრუნებენ **გამთიშველ ფუნქციას** — ეს ხელს უშლის მსმენელების დაგროვებას React-ის კომპონენტების
ხელახლა დამონტაჟებისას.

## სერვერის სასიცოცხლო ციკლი

`main.js` Next.js-ის დამოუკიდებელ პაკეტს პირდაპირ Electron-ის Node
გარემოში უშვებს, რათა თავიდან აიცილოს ნატიური მოდულის ABI-ის შეუთავსებლობა სისტემურ Node-თან:

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

მთავარი ასპექტები:

- `waitForServer()` ფანჯრის ჩვენებამდე URL-ს 30 წმ-მდე პერიოდულად ამოწმებს (ცივი გაშვებისას ცარიელი ეკრანი არ გამოჩნდება).
- `stdio: "pipe"` იჭერს stdout/stderr-ს; მზადყოფნის ფრაზები (`Ready` / `listening`) IPC-ის მეშვეობით აგზავნის `server-status: running`-ს.
- `before-quit` დახვეწილი SIGTERM-ისთვის (WAL-ის საკონტროლო წერტილი) 5 წმ-მდე იცდის, შემდეგ კი SIGKILL-ს აგზავნის.
- სისტემურ უჯრაში არსებული პორტის გადამრთველი (`20128`, `3000`, `8080`) აჩერებს და ხელახლა უშვებს სერვერს, შემდეგ კი BrowserWindow-ს თავიდან ტვირთავს.

## საიდუმლოებების ნულოვანი კონფიგურაციით ინიციალიზაცია

პირველი გაშვებისას მთავარი პროცესი ავტომატურად აგენერირებს და ინახავს არარსებულ საიდუმლოებებს:

| საიდუმლო                 | წყარო                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (უარს ამბობს, თუ დაშიფრული ავტორიზაციის მონაცემები უკვე არსებობს) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

ინახება `<DATA_DIR>/server.env`-ში. `DATA_DIR` განისაზღვრება შემდეგნაირად:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ან `~/.omniroute`
- macOS: `~/.omniroute`

## გარემოს ფაილის მოძიება

სერვერის გაშვებამდე მთავარი პროცესი (`getPreferredEnvFilePath()` ფუნქცია
`electron/main.js`-ში) ირჩევს **ერთ** `.env` ფაილს: ქვემოთ ჩამოთვლილთაგან პირველს, რომელიც არსებობს.

1. `$DATA_DIR/.env`, როდესაც `DATA_DIR` დაყენებულია იმ გარემოში, საიდანაც აპლიკაცია გაეშვა.
2. `<resolved DATA_DIR>/.env`, ზემოთ მოცემული იმავე ნაგულისხმევი მნიშვნელობებით: `%APPDATA%\omniroute\.env`
   Windows-ზე, `$XDG_CONFIG_HOME/omniroute/.env` ან `~/.omniroute/.env` Linux-სა და macOS-ზე.
3. `.env` პროცესის სამუშაო დირექტორიაში.

მთავარი პროცესი მხოლოდ ამ ფაილს კითხულობს; მომდევნო კანდიდატების შერწყმა არ ხდება. შემდეგ სერვერის
გარემო იქმნება ამ პრიორიტეტების მიხედვით (უმაღლესიდან უმდაბლესამდე):

1. Electron პროცესის გარემო (ცვლადები, რომლებიც მემკვიდრეობით მიიღება აპლიკაციის გამშვები პროცესისგან).
2. არჩეული `.env` ფაილი.
3. `<DATA_DIR>/server.env` (ზემოთ აღწერილი ინიციალიზაციის საიდუმლოებები).

პროცესის გარემო ფიქსირდება აპლიკაციის გაშვებისას, ამიტომ აპლიკაციის მუშაობის დროს დაყენებული სისტემური
ან მომხმარებლის გარემოს ცვლადი (მათ შორის მაშინ, როცა ფანჯრის დახურვის შემდეგ აპლიკაცია სისტემურ არეში
რჩება) სერვერამდე ვერ აღწევს, სანამ აპლიკაცია სრულად არ დაიხურება და ხელახლა არ გაეშვება. შესრულების დროის
პარამეტრებისთვის, როგორიცაა `CONTEXT_LENGTH_<PROVIDER>` (იხილეთ
[გარემოს ცვლადები: კონტექსტის სიგრძე თითოეული პროვაიდერისთვის](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
უპირატესობა მიანიჭეთ `.env` ფაილს, შემდეგ სრულად დახურეთ აპლიკაცია (სისტემური არე, **Quit**) და ხელახლა გაუშვით.

## ფანჯარა და სისტემური არე

- `BrowserWindow`: 1400×900 (მინ. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ფანჯრის მართვის ღილაკები განთავსებულია `{ x: 16, y: 16 }`-ზე.
- Windows/Linux: სისტემური სათაურის ზოლი.
- დახურვის ღილაკი აპლიკაციას სისტემურ არეში კეცავს; სისტემური არის მენიუ შეიცავს **OmniRoute-ის გახსნას**, **მართვის პანელის გახსნას** (გარე ბრაუზერში), **სერვერის პორტის** ქვემენიუს, **განახლებების შემოწმებას**, **გასვლას**.

## კონტენტის უსაფრთხოების პოლიტიკა

დგინდება `session.defaultSession.webRequest.onHeadersReceived`-ის მეშვეობით. მნიშვნელოვანი დირექტივებია:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- დეველოპერულ რეჟიმში `'unsafe-eval'` ემატება მხოლოდ `script-src`-ს

## ავტომატური განახლება

იყენებს `electron-updater`-ს GitHub პროვაიდერთან (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- მოვლენები რენდერერს გადაეცემა `update-status` IPC-ის მეშვეობით:
  `checking`, `available`, `not-available`, `downloading` (`percent`-ით), `downloaded`, `error`
- `installUpdate()` აჩერებს სერვერს და შემდეგ იძახებს `autoUpdater.quitAndInstall()`-ს
- დეველოპერულ რეჟიმში გამოტოვებულია (`!app.isPackaged`)

## აგების კონვეიერი

1. `npm run build` → Next.js-ის standalone-ვერსია `.next/standalone`-ში.
2. `prepare-electron-standalone.mjs` → ხელახლა ათავსებს `.next/electron-standalone`-ში და `server.js`-სა და `required-server-files.json`-ში აბსოლუტურ ბილიკებს გადაწერს, რათა პაკეტის სხვა ადგილას გადატანა შესაძლებელი იყოს.
3. `electron-builder` აპაკეტებს `main.js`-ს, `preload.js`-ს, `node_modules`-სა და `extraResources: { ../.next/electron-standalone → app }`-ს.

### აგების სამიზნეები

| OS      | სამიზნეები                                      |
| ------- | ----------------------------------------------- |
| Windows | NSIS ინსტალატორი + პორტატიული ვერსია (x64)      |
| macOS   | DMG (Intel + arm64, Applications-ში გადათრევით) |
| Linux   | AppImage + DEB (x64 + arm64)                    |

NSIS-ის პარამეტრები: `oneClick: false`, მომხმარებელს ინსტალაციის დირექტორიის არჩევის საშუალებას აძლევს და ქმნის მალსახმობებს სამუშაო მაგიდასა და Start მენიუში.

## შეფუთული აგების სწრაფი ტესტირება

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- მიმდინარე პლატფორმისთვის შეფუთულ ორობით ფაილს ავტომატურად პოულობს `electron/dist-electron/`-ში.
- ეშვება იზოლირებული `HOME`/`APPDATA`/`XDG_*` დირექტორიებით, რათა დეველოპერის მონაცემებს არ შეეხოს.
- 45 წმ-ის განმავლობაში ამოწმებს `http://127.0.0.1:20128/login`-ს HTTP 200 პასუხის მისაღებად.
- stderr/stdout-ში აკვირდება ფატალურ შაბლონებს (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` და ა.შ.).
- მზადყოფნის შემდეგ ელოდება 2 წმ-ის განმავლობაში სტაბილურ მუშაობას, შემდეგ აგზავნის SIGTERM-ს და ელოდება პორტის გათავისუფლებას.
- CI-ში ავტომატურად გადასცემს `--no-sandbox --disable-gpu`-ს (და Linux-ზე `--disable-dev-shm-usage`-ს).

გარემოს ცვლადებით გადაფარვა: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## კოდის ხელმოწერა

`electron/package.json` ხელმოწერის ავტორიზაციის მონაცემებს პირდაპირ **არ** აკავშირებს. ისინი გარემოს ცვლადების მეშვეობით გადაეცით `electron-builder`-ს:

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

AppImage-ის ხელმოწერა არასავალდებულოა — ხელმოწერისთვის დააყენეთ `LINUX_GPG_KEY`.

## დისტრიბუცია

არტეფაქტები თავსდება `electron/dist-electron/`-ში:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

გამოშვებები ქვეყნდება GitHub Releases-ში (`diegosouzapw/OmniRoute`), სადაც `electron-updater` ასევე ამოწმებს ახალი ვერსიების არსებობას.

## პრობლემების აღმოფხვრა

| სიმპტომი                                                                             | გამოსწორება                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron-ის ძირითადი ვერსიის განახლების შემდეგ `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 მოიცავს Node-API-ის წინასწარ აგებულ ფაილებს — ხელახლა გაუშვით `npm install` ძირეულ დირექტორიაში და `prepare:bundle` (ის ამოწმებს წინასწარ აგებულ ფაილს მიმდინარე პლატფორმისთვის) |
| `ERR_DLOPEN_FAILED` ნატიური მოდულისთვის                                              | ხელახლა გაუშვით `prepare:bundle` — თუ მიმდინარე პლატფორმისთვის Node-API-ის წინასწარ აგებული ფაილი არ არსებობს, ის დაუყოვნებლივ დასრულდება შეცდომით                                                  |
| Linux-ზე ფანჯარა ცარიელია                                                            | დაადასტურეთ, რომ Next.js-ის სერვერი ნამდვილად მიება PORT-ს (შეამოწმეთ `[Server]` ჟურნალები)                                                                                                         |
| macOS-ის ნოტარიზაცია ყოვნდება                                                        | დარწმუნდით, რომ `APPLE_*` ცვლადები ექსპორტირებულია და არა მხოლოდ `.env`-შია მითითებული                                                                                                              |
| Windows SmartScreen-ის გაფრთხილება                                                   | ხელი მოაწერეთ EV სერტიფიკატით, ან მომხმარებლებმა გამოიყენონ მარჯვენა დაწკაპუნება → „Run anyway“                                                                                                     |
| სწრაფი ტესტი დაკავებული პორტის გამო ვერ სრულდება                                     | `electron:smoke:packaged`-ის გაშვებამდე გააჩერეთ ნებისმიერი ლოკალური დეველოპერული სერვერი 20128 პორტზე                                                                                              |

## ასევე იხილეთ

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- წყარო: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- დამხმარე სკრიპტები: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
