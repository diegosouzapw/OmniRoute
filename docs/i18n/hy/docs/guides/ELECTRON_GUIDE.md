# Electron Desktop Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Ճշմարտության աղբյուրը՝** `electron/` աշխատանքային տարածք
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ը տրամադրում է **Electron 41** + **electron-builder 26.10** հիմքով կառուցված միջպլատֆորմային աշխատասեղանի հավելված (Windows / macOS / Linux)։ Աշխատասեղանի հավելվածը գործարկում է Next.js-ի ինքնուրույն սերվերը որպես ենթապրոցես, `BrowserWindow`-ն ուղղորդում է դեպի այն և ավելացնում համակարգային սկուտեղ, ավտոմատ թարմացնող, IPC կամուրջ և զրոյական կազմաձևմամբ գաղտնիքների սկզբնարժեքավորում։

## Ճարտարապետություն

```
┌──────────────────────────────────────────────────────┐
│ Electron-ի հիմնական պրոցեսը (electron/main.js)      │
│ ├─ Մեկ օրինակի արգելափակում                          │
│ ├─ Ենթապրոցես՝ Next.js-ի ինքնուրույն սերվեր          │
│ │   (գործարկված Electron-ի Node միջավայրով)          │
│ ├─ BrowserWindow → http://localhost:PORT             │
│ ├─ Համակարգային սկուտեղ + համատեքստային ընտրացանկ    │
│ ├─ Ավտոմատ թարմացում electron-updater-ի միջոցով     │
│ ├─ Բովանդակության անվտանգության քաղաքականություն    │
│ │   (աշխատաշրջանի վերնագրեր)                         │
│ └─ Գաղտնիքների սկզբնարժեքավորում                     │
│     (JWT / API_KEY_SECRET)                           │
└──────────────────────────────────────────────────────┘
            ↕ IPC կամուրջ (electron/preload.js)
┌──────────────────────────────────────────────────────┐
│ Արտապատկերիչ (Next.js-ի կառավարման վահանակ)          │
│   window.electronAPI.* (contextIsolation)            │
└──────────────────────────────────────────────────────┘
```

## Տարբերակներ

Հաստատված է `electron/package.json`-ից՝

| Փաթեթ              | Տարբերակ                                                                                |
| ------------------ | --------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                               |
| `electron-builder` | `^26.15.3`                                                                              |
| `electron-updater` | `^6.8.9`                                                                                |
| `better-sqlite3`   | արմատային `^13.0.2` (Node-API-ի նախնական կառուցվածքներ՝ առանց Electron-ի վերակառուցման) |
| Հավելվածի տարբերակ | `3.8.0`                                                                                 |
| Հավելվածի id       | `online.omniroute.desktop`                                                              |
| Արտադրանքի անուն   | `OmniRoute`                                                                             |

## Սկրիպտներ (արմատային `package.json`)

| Սկրիպտ                            | Նպատակ                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Գործարկում է `npm run dev`, սպասում `localhost:20128`-ին և գործարկում Electron-ը                                |
| `npm run electron:build`          | Կառուցում է Next.js-ը, ապա ընթացիկ ՕՀ-ի համար գործարկում `electron-builder`-ը                                   |
| `npm run electron:build:win`      | Կառուցում է Windows-ի NSIS տեղադրիչը և դյուրակիր տարբերակը (x64)                                                |
| `npm run electron:build:mac`      | Կառուցում է macOS-ի DMG-ը (Intel + Apple Silicon)                                                               |
| `npm run electron:build:linux`    | Կառուցում է Linux-ի AppImage-ը և DEB-ը (x64 + arm64)                                                            |
| `npm run electron:smoke:packaged` | Գործարկում է փաթեթավորված երկուական ֆայլը, ստուգում `/login`-ը HTTP 200 պատասխանի համար, ապա ավարտում աշխատանքը |

`electron/` աշխատանքային տարածքը նաև տրամադրում է՝

- `npm run prepare:bundle` — գործարկում է `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — մեկ ճարտարապետության համար macOS-ի կառուցումներ
- `npm run pack` — միայն պանակով կառուցում՝ տեղային փորձարկման համար (առանց տեղադրիչի)

## Թղթապանակների կառուցվածքը

```
electron/
├── package.json              # Electron-ի կախվածություններ + electron-builder-ի կազմաձևում
├── main.js                   # Հիմնական պրոցես (24 KB — տե՛ս ստորև բերված ծանոթագրությունները)
├── preload.js                # contextBridge IPC կամուրջ
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI տիպեր
├── README.md                 # Աշխատանքային տարածքի ներքին նշումներ
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-ի ելքային տվյալներ (անտեսվում է git-ի կողմից)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Նախապատրաստում է .next/electron-standalone փաթեթը
└── dev/
    └── smoke-electron-packaged.mjs       # Կազմումից հետո արագ ստուգման թեստ
```

Ե՛վ `main.js`-ը, և՛ `preload.js`-ը **CommonJS `.js` ֆայլեր են**, ոչ թե TypeScript։ Ռենդերերի
կողմի տիպերի սահմանումները գտնվում են `electron/types.d.ts`-ում։

## IPC կամուրջ (`preload.js`)

Նախաբեռնման սկրիպտը `contextBridge`-ի միջոցով `window.electronAPI`-ում հասանելի է դարձնում թույլատրելի ցանկով սահմանափակված API՝
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

| Ռենդերերի կանչ                                                    | Տիպ                               |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                            |
| `openExternal(url)`                                               | invoke                            |
| `getDataDir()`                                                    | invoke                            |
| `restartServer()`                                                 | invoke                            |
| `getAppVersion()`                                                 | invoke                            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                              |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (վերադարձնում է disposer) |

Ընդունման օժանդակ ֆունկցիաները վերադարձնում են **disposer ֆունկցիա**՝
`removeAllListeners`-ի վրա հիմնվելու փոխարեն։ Սա կանխում է իրադարձությունների մշակիչների կուտակումը, երբ React-ի բաղադրիչները
կրկին մոնտաժվում են։

## Սերվերի կենսացիկլը

`main.js`-ը Next.js-ի ինքնուրույն փաթեթը գործարկում է անմիջապես Electron-ի Node
կատարման միջավայրով՝ համակարգային Node-ի հետ բնիկ մոդուլների ABI անհամատեղելիությունից խուսափելու համար․

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

Կարևոր կետեր՝

- `waitForServer()`-ը հարցումներ է ուղարկում URL-ին մինչև 30 վրկ՝ նախքան պատուհանը ցուցադրելը (սառը մեկնարկի ժամանակ դատարկ էկրան չի ցուցադրվում)։
- `stdio: "pipe"`-ը որսում է stdout/stderr-ը․ պատրաստ լինելու արտահայտությունները (`Ready` / `listening`) IPC-ով ուղարկում են `server-status: running`։
- `before-quit`-ը մինչև 5 վրկ սպասում է SIGTERM-ի միջոցով նրբորեն ավարտվելուն (WAL-ի վերահսկիչ կետի ստեղծմանը), ապա ուղարկում է SIGKILL։
- Համակարգային դարակի պորտի փոխարկիչը (`20128`, `3000`, `8080`) կանգնեցնում և վերագործարկում է սերվերը, ապա վերաբեռնում BrowserWindow-ը։

## Առանց կազմաձևման գաղտնիքների սկզբնարժեքավորում

Առաջին գործարկման ժամանակ հիմնական գործընթացն ավտոմատ կերպով գեներացնում և պահպանում է բացակայող գաղտնիքները.

| Գաղտնիք                  | Աղբյուր                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (մերժում է, եթե գաղտնագրված հավատարմագրեր արդեն գոյություն ունեն) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

Պահպանվում է `<DATA_DIR>/server.env`-ում։ `DATA_DIR`-ը որոշվում է հետևյալ կերպ.

- Windows՝ `%APPDATA%\omniroute`
- Linux՝ `$XDG_CONFIG_HOME/omniroute` կամ `~/.omniroute`
- macOS՝ `~/.omniroute`

## Միջավայրի ֆայլի որոնում

Սերվերը գործարկելուց առաջ հիմնական գործընթացը (`getPreferredEnvFilePath()`՝
`electron/main.js`-ում) ընտրում է **մեկ** `.env` ֆայլ՝ գոյություն ունեցողներից առաջինը։

1. `$DATA_DIR/.env`, երբ `DATA_DIR`-ը սահմանված է այն միջավայրում, որից գործարկվել է հավելվածը։
2. `<resolved DATA_DIR>/.env`՝ օգտագործելով վերոնշյալ նույն լռելյայն արժեքները՝ `%APPDATA%\omniroute\.env`
   Windows-ում, `$XDG_CONFIG_HOME/omniroute/.env` կամ `~/.omniroute/.env`՝ Linux-ում և macOS-ում։
3. `.env`՝ գործընթացի աշխատանքային պանակում։

Հիմնական գործընթացը կարդում է միայն այդ ֆայլը․ հաջորդ թեկնածու ֆայլերը չեն միավորվում։ Այնուհետև
սերվերի միջավայրը կառուցվում է հետևյալ առաջնահերթությամբ (ամենաբարձրը՝ առաջինը).

1. Electron գործընթացի միջավայրը (փոփոխականները, որոնք ժառանգվել են հավելվածը գործարկած միջավայրից)։
2. Ընտրված `.env` ֆայլը։
3. `<DATA_DIR>/server.env` (վերոնշյալ սկզբնարժեքավորման գաղտնիքները)։

Գործընթացի միջավայրը պահպանվում է հավելվածի մեկնարկի պահին, ուստի հավելվածի աշխատանքի ընթացքում
սահմանված համակարգային կամ օգտատիրոջ միջավայրի փոփոխականը (ներառյալ այն ժամանակ, երբ հավելվածը պատուհանը
փակելուց հետո մնում է համակարգային սկուտեղում) չի հասնի սերվերին, մինչև հավելվածը լիովին չփակվի և
չվերագործարկվի։ Գործարկման ժամանակ կիրառվող կարգավորումների համար, ինչպիսին է `CONTEXT_LENGTH_<PROVIDER>`-ը (տես
[Միջավայրի փոփոխականներ․ յուրաքանչյուր մատակարարի համատեքստի երկարություն](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
նախընտրեք `.env` ֆայլը, ապա լիովին փակեք հավելվածը (համակարգային սկուտեղից՝ **Դուրս գալ**) և վերագործարկեք այն։

## Պատուհան և համակարգային սկուտեղ

- `BrowserWindow`՝ 1400×900 (նվազագույնը՝ 1024×700), `backgroundColor: "#0a0a0a"`։
- macOS՝ `titleBarStyle: "hiddenInset"`, պատուհանի կառավարման կոճակները՝ `{ x: 16, y: 16 }` դիրքում։
- Windows/Linux՝ համակարգային վերնագրագոտի։
- Փակման կոճակը փոքրացնում է հավելվածը դեպի համակարգային սկուտեղ․ սկուտեղի ընտրացանկն ունի **Բացել OmniRoute-ը**, **Բացել կառավարման վահանակը** (արտաքին դիտարկիչում), **Սերվերի պորտ** ենթամենյուն, **Ստուգել թարմացումները**, **Դուրս գալ** տարրերը։

## Բովանդակության անվտանգության քաղաքականություն

Սահմանվում է `session.defaultSession.webRequest.onHeadersReceived`-ի միջոցով։ Հատկանշական հրահանգներ.

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Մշակման ռեժիմը միայն `script-src`-ին ավելացնում է `'unsafe-eval'`

## Ավտոմատ թարմացում

Օգտագործում է `electron-updater`-ը՝ GitHub մատակարարով (`diegosouzapw/OmniRoute`)։

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Իրադարձությունները փոխանցվում են ցուցադրման գործընթացին `update-status` IPC-ի միջոցով՝
  `checking`, `available`, `not-available`, `downloading` (`percent`-ով), `downloaded`, `error`
- `installUpdate()`-ը դադարեցնում է սերվերը, ապա կանչում `autoUpdater.quitAndInstall()`-ը
- Բաց է թողնվում մշակման ռեժիմում (`!app.isPackaged`)

## Կառուցման խողովակաշար

1. `npm run build` → Next.js-ի standalone տարբերակը՝ `.next/standalone`-ում։
2. `prepare-electron-standalone.mjs` → վերափաթեթավորում է `.next/electron-standalone`-ում և վերագրում է `server.js`-ի ու `required-server-files.json`-ի ներսում գտնվող բացարձակ ուղիները, որպեսզի փաթեթը հնարավոր լինի տեղափոխել։
3. `electron-builder`-ը փաթեթավորում է `main.js`-ը, `preload.js`-ը, `node_modules`-ը և `extraResources: { ../.next/electron-standalone → app }`-ը։

### Կառուցման թիրախներ

| ՕՀ      | Թիրախներ                                     |
| ------- | -------------------------------------------- |
| Windows | NSIS տեղադրիչ + շարժական տարբերակ (x64)      |
| macOS   | DMG (Intel + arm64, քաշել դեպի Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS-ի կարգավորումները՝ `oneClick: false`, թույլ է տալիս օգտատիրոջն ընտրել տեղադրման պանակը և ստեղծում է Desktop-ի ու Start-Menu-ի դյուրանցումներ։

## Փաթեթավորված կառուցման արագ ստուգում

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`-ը՝

- Ընթացիկ հարթակի համար ավտոմատ հայտնաբերում է փաթեթավորված գործարկվող ֆայլը `electron/dist-electron/`-ում։
- Գործարկում է մեկուսացված `HOME`/`APPDATA`/`XDG_*` պանակներով, որպեսզի չփոփոխի մշակողի տվյալները։
- 45 վրկ-ի ընթացքում պարբերաբար հարցումներ է ուղարկում `http://127.0.0.1:20128/login` հասցեին՝ սպասելով HTTP 200 պատասխանի։
- stderr/stdout-ում հետևում է ճակատագրական սխալների ձևանմուշներին (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` և այլն)։
- Պատրաստ լինելուց հետո սպասում է 2 վրկ կայուն աշխատանքի, ապա ուղարկում է SIGTERM և սպասում, մինչև պորտն ազատվի։
- CI-ում ավտոմատ փոխանցում է `--no-sandbox --disable-gpu` (և `--disable-dev-shm-usage`՝ Linux-ում)։

Միջավայրի վերասահմանումներ՝ `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`։

## Կոդի ստորագրում

`electron/package.json`-ը ստորագրման հավատարմագրերն ուղղակիորեն **չի** միացնում։ Դրանք միջավայրի փոփոխականների միջոցով փոխանցեք `electron-builder`-ին։

### macOS

```bash
export APPLE_ID=<էլ․ հասցե>
export APPLE_APP_SPECIFIC_PASSWORD=<գաղտնաբառ>
export APPLE_TEAM_ID=<նույնացուցիչ>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<վկայագրի-գաղտնաբառ>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<վկայագրի-գաղտնաբառ>
npm run electron:build:win
```

### Linux

AppImage-ի ստորագրումը պարտադիր չէ․ ստորագրելու դեպքում սահմանեք `LINUX_GPG_KEY`։

## Տարածում

Արտեֆակտները տեղադրվում են `electron/dist-electron/`-ում՝

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Թողարկումները հրապարակվում են GitHub Releases-ում (`diegosouzapw/OmniRoute`), որտեղ էլ `electron-updater`-ը ստուգում է նոր տարբերակների առկայությունը։

## Խնդիրների լուծում

| Ախտանիշ                                                                                | Լուծում                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'`՝ Electron-ի հիմնական տարբերակը թարմացնելուց հետո | better-sqlite3 v13-ը ներառում է Node-API-ի նախապես կառուցված ֆայլեր․ կրկին գործարկեք `npm install`-ը արմատային պանակում և `prepare:bundle`-ը (այն ստուգում է ընթացիկ հարթակի նախապես կառուցված ֆայլը) |
| `ERR_DLOPEN_FAILED`՝ բնիկ մոդուլի համար                                                | Կրկին գործարկեք `prepare:bundle`-ը․ եթե ընթացիկ հարթակի համար Node-API-ի նախապես կառուցված ֆայլը բացակայում է, այն անմիջապես ընդհատվում է սխալով                                                      |
| Linux-ում պատուհանը դատարկ է երևում                                                    | Համոզվեք, որ Next.js սերվերն իրականում կապվել է PORT-ին (ստուգեք `[Server]` մատյանները)                                                                                                               |
| macOS-ի նոտարական վավերացումը կանգ է առնում                                            | Համոզվեք, որ `APPLE_*` փոփոխականներն արտահանված են, այլ ոչ թե պարզապես սահմանված են `.env`-ում                                                                                                        |
| Windows SmartScreen-ի նախազգուշացում                                                   | Ստորագրեք EV վկայագրով, կամ օգտատերերը կարող են աջ սեղմել → «Միևնույն է գործարկել»                                                                                                                    |
| Արագ ստուգումը ձախողվում է զբաղված պորտի պատճառով                                      | `electron:smoke:packaged`-ը գործարկելուց առաջ կանգնեցրեք 20128 պորտն օգտագործող ցանկացած տեղային մշակման սերվեր                                                                                       |

## Տես նաև

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Աղբյուր՝ `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Օժանդակ սկրիպտներ՝ `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
