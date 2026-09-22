# Electron Desktop Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Ճշմարտության աղբյուր՝** `electron/` աշխատանքային տարածք
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ը տրամադրում է միջպլատֆորմային աշխատասեղանի հավելված (Windows / macOS / Linux), որը կառուցված է
**Electron 41** + **electron-builder 26.10** հիմքի վրա։ Աշխատասեղանի հավելվածը գործարկում է Next.js
ինքնուրույն սերվերը որպես ենթապրոցես, դրան է ուղղում `BrowserWindow`-ը և ավելացնում է
համակարգային սկուտեղ, ավտոմատ թարմացնող, IPC կամուրջ և առանց կազմաձևման գաղտնիքների սկզբնավորում։

## Ճարտարապետություն

```
┌──────────────────────────────────────────────┐
│ Electron-ի հիմնական պրոցես (electron/main.js)│
│ ├─ Մեկ օրինակի արգելափակում                   │
│ ├─ Ենթապրոցես՝ Next.js ինքնուրույն սերվեր     │
│ │   (գործարկված Electron-ի Node միջավայրով)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Համակարգային սկուտեղ + համատեքստային ցանկ │
│ ├─ Ավտոմատ թարմացում՝ electron-updater-ով    │
│ ├─ Բովանդակության անվտանգության քաղաքակ.     │
│ │   (նստաշրջանի վերնագրեր)                   │
│ └─ Գաղտնիքների սկզբնավորում                  │
│     (JWT / API_KEY_SECRET)                   │
└──────────────────────────────────────────────┘
            ↕ IPC կամուրջ (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Արտապատկերիչ (Next.js կառավարման վահանակ)    │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Տարբերակներ

Հաստատված է `electron/package.json`-ից՝

| Փաթեթ              | Տարբերակ                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                     |
| `electron-builder` | `^26.15.3`                                                                                    |
| `electron-updater` | `^6.8.9`                                                                                      |
| `better-sqlite3`   | արմատային `^13.0.2` (Node-API նախնական կառուցումներ — Electron-ի վերակառուցում չի պահանջվում) |
| Հավելվածի տարբերակ | `3.8.0`                                                                                       |
| Հավելվածի ID       | `online.omniroute.desktop`                                                                    |
| Արտադրանքի անուն   | `OmniRoute`                                                                                   |

## Սկրիպտներ (արմատային `package.json`)

| Սկրիպտ                            | Նպատակ                                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Գործարկում է `npm run dev`-ը + սպասում `localhost:20128`-ին + գործարկում Electron-ը                         |
| `npm run electron:build`          | Կառուցում է Next.js-ը, ապա ընթացիկ ՕՀ-ի համար գործարկում `electron-builder`-ը                               |
| `npm run electron:build:win`      | Կառուցում է Windows NSIS տեղադրիչ + շարժական տարբերակ (x64)                                                 |
| `npm run electron:build:mac`      | Կառուցում է macOS DMG (Intel + Apple Silicon)                                                               |
| `npm run electron:build:linux`    | Կառուցում է Linux AppImage + DEB (x64 + arm64)                                                              |
| `npm run electron:smoke:packaged` | Գործարկում է փաթեթավորված գործարկելի ֆայլը և ստուգում `/login`-ը՝ HTTP 200 պատասխանի համար, ապա անջատվում է |

`electron/` աշխատանքային տարածքը նաև հասանելի է դարձնում՝

- `npm run prepare:bundle` — գործարկում է `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — մեկ ճարտարապետության համար macOS կառուցումներ
- `npm run pack` — միայն գրացուցակով կառուցում՝ տեղային փորձարկման համար (առանց տեղադրիչի)

## Պանակների կառուցվածքը

```
electron/
├── package.json              # Electron-ի կախվածությունները + electron-builder-ի կարգավորումները
├── main.js                   # Հիմնական գործընթաց (24 KB — տե՛ս ստորև բերված նշումները)
├── preload.js                # contextBridge IPC կամուրջ
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI տիպեր
├── README.md                 # Աշխատանքային տարածքի նշումներ
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-ի ելքային պանակ (անտեսվում է git-ի կողմից)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Նախապատրաստում է .next/electron-standalone փաթեթը
└── dev/
    └── smoke-electron-packaged.mjs       # Կառուցումից հետո արագ ստուգման թեստ
```

Ե՛վ `main.js`-ը, և՛ `preload.js`-ը **CommonJS `.js` ֆայլեր են**, այլ ոչ թե TypeScript։ Ռենդերերի
կողմի տիպերը գտնվում են `electron/types.d.ts`-ում։

## IPC կամուրջ (`preload.js`)

Նախաբեռնման սկրիպտը `contextBridge`-ի միջոցով `window.electronAPI`-ում հասանելի է դարձնում սպիտակ ցուցակով սահմանված API՝
`contextIsolation: true` և `nodeIntegration: false` կարգավորումներով։

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

Հասանելի դարձված մեթոդները՝

| Ռենդերերի կանչը                                                   | Տիպը                                     |
| ----------------------------------------------------------------- | ---------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                   |
| `openExternal(url)`                                               | invoke                                   |
| `getDataDir()`                                                    | invoke                                   |
| `restartServer()`                                                 | invoke                                   |
| `getAppVersion()`                                                 | invoke                                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (վերադարձնում է մաքրող ֆունկցիա) |

Ստացման օժանդակ ֆունկցիաները `removeAllListeners`-ի վրա հիմնվելու փոխարեն վերադարձնում են
**մաքրող ֆունկցիա**․ սա կանխում է լսիչների կուտակումը React բաղադրիչների
վերամոնտաժման ժամանակ։

## Սերվերի կենսացիկլը

`main.js`-ը Next.js-ի ինքնուրույն փաթեթն անմիջապես գործարկում է Electron-ի Node
կատարման միջավայրով՝ համակարգային Node-ի հետ բնիկ մոդուլների ABI անհամատեղելիությունից խուսափելու համար։

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

Հիմնական կետերը՝

- `waitForServer()`-ը մինչև պատուհանը ցուցադրելը առավելագույնը 30 վրկ․ հարցումներ է ուղարկում URL-ին (սառը մեկնարկի ժամանակ դատարկ էկրան չի ցուցադրվում)։
- `stdio: "pipe"`-ը որսում է stdout/stderr-ը․ պատրաստ լինելու արտահայտությունները (`Ready` / `listening`) IPC-ով ուղարկում են `server-status: running`։
- `before-quit`-ը մինչև 5 վրկ․ սպասում է SIGTERM-ով բնականոն ավարտին (WAL-ի ստուգակետի գրանցում), այնուհետև ուղարկում է SIGKILL։
- Համակարգային դարակում գտնվող պորտի փոխարկիչը (`20128`, `3000`, `8080`) կանգնեցնում և վերագործարկում է սերվերը, ապա վերաբեռնում BrowserWindow-ը։

## Զրոյական կազմաձևմամբ գաղտնիքների սկզբնավորում

Առաջին գործարկման ժամանակ հիմնական գործընթացն ավտոմատ ստեղծում և պահպանում է բացակայող գաղտնիքները․

| Գաղտնիք                  | Աղբյուր                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (մերժում է, եթե կոդավորված հավատարմագրեր արդեն գոյություն ունեն) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                  |

Պահպանվում են `<DATA_DIR>/server.env`-ում։ `DATA_DIR`-ը որոշվում է հետևյալ կերպ․

- Windows՝ `%APPDATA%\omniroute`
- Linux՝ `$XDG_CONFIG_HOME/omniroute` կամ `~/.omniroute`
- macOS՝ `~/.omniroute`

## Պատուհան և համակարգային սկուտեղ

- `BrowserWindow`՝ 1400×900 (նվազագույնը՝ 1024×700), `backgroundColor: "#0a0a0a"`։
- macOS՝ `titleBarStyle: "hiddenInset"`, պատուհանի կառավարման կոճակները՝ `{ x: 16, y: 16 }` դիրքում։
- Windows/Linux՝ համակարգային վերնագրագոտի։
- Փակման կոճակը փոքրացնում է հավելվածը դեպի համակարգային սկուտեղ։ Սկուտեղի ընտրացանկն ունի **Բացել OmniRoute-ը**, **Բացել կառավարման վահանակը** (արտաքին դիտարկիչում), **Սերվերի պորտ** ենթաընտրացանկ, **Ստուգել թարմացումների առկայությունը**, **Դուրս գալ** տարրերը։

## Բովանդակության անվտանգության քաղաքականություն

Սահմանվում է `session.defaultSession.webRequest.onHeadersReceived`-ի միջոցով։ Հատկանշական դիրեկտիվները՝

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Մշակման ռեժիմում `'unsafe-eval'`-ն ավելացվում է միայն `script-src`-ին

## Ավտոմատ թարմացում

Օգտագործում է `electron-updater`՝ GitHub մատակարարով (`diegosouzapw/OmniRoute`)։

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Իրադարձությունները փոխանցվում են արտապատկերման գործընթացին `update-status` IPC-ի միջոցով՝
  `checking`, `available`, `not-available`, `downloading` (`percent`-ով), `downloaded`, `error`
- `installUpdate()`-ը դադարեցնում է սերվերը, ապա կանչում `autoUpdater.quitAndInstall()`-ը
- Բաց է թողնվում մշակման ռեժիմում (`!app.isPackaged`)

## Կառուցման գործընթացաշար

1. `npm run build` → Next.js-ի ինքնաբավ տարբերակը՝ `.next/standalone`-ում։
2. `prepare-electron-standalone.mjs` → վերադասավորում է `.next/electron-standalone`-ում և վերագրում `server.js` + `required-server-files.json` ֆայլերի ներսում գտնվող բացարձակ ուղիները, որպեսզի փաթեթը հնարավոր լինի տեղափոխել։
3. `electron-builder`-ը փաթեթավորում է `main.js`, `preload.js`, `node_modules` և `extraResources: { ../.next/electron-standalone → app }`։

### Կառուցման թիրախներ

| ՕՀ      | Թիրախներ                                     |
| ------- | -------------------------------------------- |
| Windows | NSIS տեղադրիչ + տեղափոխելի տարբերակ (x64)    |
| macOS   | DMG (Intel + arm64, քաշել դեպի Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS-ի կարգավորումներ՝ `oneClick: false`, թույլ է տալիս օգտատիրոջն ընտրել տեղադրման պանակը, ստեղծում է աշխատասեղանի և Start Menu-ի դյուրանցումներ։

## Փաթեթավորված կառուցվածքի արագ ստուգում

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`․

- Ավտոմատ հայտնաբերում է ընթացիկ հարթակի փաթեթավորված գործարկելի ֆայլը `electron/dist-electron/`-ում։
- Գործարկում է մեկուսացված `HOME`/`APPDATA`/`XDG_*` պանակներով, որպեսզի չփոփոխի մշակողի տվյալները։
- 45 վայրկյանի ընթացքում պարբերաբար հարցում է կատարում `http://127.0.0.1:20128/login` հասցեին՝ սպասելով HTTP 200 պատասխանի։
- Հետևում է stderr/stdout-ին՝ ճակատագրական ձևանմուշների համար (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` և այլն)։
- Պատրաստ լինելուց հետո սպասում է 2 վայրկյան կայուն աշխատանքի, ապա ուղարկում SIGTERM և սպասում, մինչև պորտն ազատվի։
- CI-ում ավտոմատ փոխանցում է `--no-sandbox --disable-gpu` (և `--disable-dev-shm-usage`՝ Linux-ում)։

Միջավայրի վերասահմանումներ՝ `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`։

## Կոդի ստորագրում

`electron/package.json`-ը **չի** կապակցում ստորագրման հավատարմագրերն անմիջականորեն։ Դրանք փոխանցեք `electron-builder`-ին միջավայրի փոփոխականների միջոցով․

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

AppImage-ի ստորագրումը պարտադիր չէ․ ստորագրելու դեպքում սահմանեք `LINUX_GPG_KEY`։

## Տարածում

Արտեֆակտները տեղադրվում են `electron/dist-electron/` պանակում․

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Թողարկումները հրապարակվում են GitHub Releases-ում (`diegosouzapw/OmniRoute`), որտեղ `electron-updater`-ը նաև ստուգում է նոր տարբերակների առկայությունը։

## Խնդիրների լուծում

| Ախտանիշ                                                                               | Լուծում                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'`՝ Electron-ի հիմնական տարբերակի թարմացումից հետո | better-sqlite3 v13-ը տրամադրում է Node-API-ի նախապես հավաքված տարբերակներ․ արմատային պանակում կրկին գործարկեք `npm install` և `prepare:bundle` (այն ստուգում է ընթացիկ հարթակի համար նախատեսված նախապես հավաքված տարբերակը) |
| `ERR_DLOPEN_FAILED` բնիկ մոդուլի համար                                                | Կրկին գործարկեք `prepare:bundle`․ եթե ընթացիկ հարթակի համար Node-API-ի նախապես հավաքված տարբերակը բացակայում է, այն անմիջապես ավարտվում է սխալով                                                                            |
| Linux-ում պատուհանը դատարկ է երևում                                                   | Համոզվեք, որ Next.js սերվերն իրականում կապակցվել է PORT-ին (ստուգեք `[Server]` մատյանները)                                                                                                                                  |
| macOS-ի նոտարական վավերացումը կանգ է առնում                                           | Համոզվեք, որ `APPLE_*` փոփոխականներն արտահանված են, այլ ոչ թե պարզապես սահմանված `.env`-ում                                                                                                                                 |
| Windows SmartScreen-ի նախազգուշացում                                                  | Ստորագրեք EV վկայագրով, կամ օգտատերերը կարող են աջ սեղմել → «Միևնույն է գործարկել»                                                                                                                                          |
| Ծխային թեստը ձախողվում է՝ նավահանգստի զբաղված լինելու պատճառով                        | Նախքան `electron:smoke:packaged`-ը գործարկելը կանգնեցրեք 20128 նավահանգիստն օգտագործող ցանկացած տեղային մշակման սերվեր                                                                                                      |

## Տես նաև

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Սկզբնաղբյուր՝ `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Օժանդակ գործիքներ՝ `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
