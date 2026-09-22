# Electron Desktop Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Foinse na fírinne:** spás oibre `electron/`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Cuireann OmniRoute aip deisce trasardáin (Windows / macOS / Linux) ar fáil atá tógtha ar
**Electron 41** + **electron-builder 26.10**. Tosaíonn an aip deisce freastalaí neamhspleách
Next.js mar phróiseas mac, díríonn sí `BrowserWindow` air, agus cuireann sí
tráidire córais, nuashonraitheoir uathoibríoch, droichead IPC, agus tosú rúin gan chumraíocht leis.

## Ailtireacht

```
┌──────────────────────────────────────────────┐
│ Príomhphróiseas Electron (electron/main.js)  │
│ ├─ Glas aon ásc amháin                       │
│ ├─ Próiseas mac: freastalaí neamhspleách    │
│ │   Next.js (tosaithe le ham rite Node       │
│ │   Electron)                               │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Tráidire córais + roghchlár comhthéacs    │
│ ├─ Uathnuashonrú trí electron-updater        │
│ ├─ Beartas Slándála Ábhair (ceanntásca seisiúin) │
│ └─ Tosú rúin (JWT / API_KEY_SECRET)          │
└──────────────────────────────────────────────┘
            ↕ Droichead IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Rindreálaí (deais Next.js)                   │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Leaganacha

Deimhnithe ó `electron/package.json`:

| Pacáiste            | Leagan                                                                 |
| ------------------- | ---------------------------------------------------------------------- |
| `electron`          | `^43.4.1`                                                              |
| `electron-builder`  | `^26.15.3`                                                             |
| `electron-updater`  | `^6.8.9`                                                               |
| `better-sqlite3`    | fréamh `^13.0.2` (réamhthógálacha Node-API — ní gá Electron a atógáil) |
| Leagan na haipe     | `3.8.0`                                                                |
| Aitheantas na haipe | `online.omniroute.desktop`                                             |
| Ainm an táirge      | `OmniRoute`                                                            |

## Scripteanna (`package.json` fréimhe)

| Script                            | Cuspóir                                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Tosaíonn sé `npm run dev` + fanann sé le `localhost:20128` + seolann sé Electron                                  |
| `npm run electron:build`          | Tógann sé Next.js agus ansin ritheann sé `electron-builder` don OS reatha                                         |
| `npm run electron:build:win`      | Tógann sé suiteálaí Windows NSIS + leagan iniompartha (x64)                                                       |
| `npm run electron:build:mac`      | Tógann sé DMG macOS (Intel + Apple Silicon)                                                                       |
| `npm run electron:build:linux`    | Tógann sé Linux AppImage + DEB (x64 + arm64)                                                                      |
| `npm run electron:smoke:packaged` | Seolann sé an dénártha pacáistithe agus déanann sé iniúchadh ar `/login` le haghaidh HTTP 200, ansin múchann sé é |

Cuireann spás oibre `electron/` iad seo ar fáil freisin:

- `npm run prepare:bundle` — ritheann sé `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — tógálacha macOS d'ailtireacht aonair
- `npm run pack` — tógáil eolaire amháin le haghaidh tástála áitiúla (gan suiteálaí)

## Leagan Amach na nEolairí

```
electron/
├── package.json              # Spleáchais Electron + cumraíocht electron-builder
├── main.js                   # Príomhphróiseas (24 KB — féach na nótaí thíos)
├── preload.js                # Droichead IPC contextBridge
├── types.d.ts                # Cineálacha AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Nótaí laistigh den spás oibre
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Aschur electron-builder (neamhaird tugtha air ag git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Cuireann sé an beart .next/electron-standalone ar bun
└── dev/
    └── smoke-electron-packaged.mjs       # Tástáil deataigh iar-thógála
```

Is **comhaid CommonJS `.js`** iad `main.js` agus `preload.js` araon, ní comhaid TypeScript. Tá na
clóscríbhinní ar thaobh an rindreálaí le fáil in `electron/types.d.ts`.

## Droichead IPC (`preload.js`)

Nochtann an réamhlódáil API ar liosta ceadaithe ar `window.electronAPI` trí `contextBridge`
a úsáid le `contextIsolation: true` agus `nodeIntegration: false`.

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

Modhanna nochta:

| Glao ón rindreálaí                                                | Cineál                                   |
| ----------------------------------------------------------------- | ---------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                   |
| `openExternal(url)`                                               | invoke                                   |
| `getDataDir()`                                                    | invoke                                   |
| `restartServer()`                                                 | invoke                                   |
| `getAppVersion()`                                                 | invoke                                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (cuireann sé diúscartóir ar ais) |

Cuireann na cúntóirí glactha **feidhm diúscartóra** ar ais seachas a bheith ag brath ar
`removeAllListeners` — cuireann sé seo cosc ar charnadh éisteoirí nuair a athfheistítear comhpháirteanna React.

## Saolré an Fhreastalaí

Seolann `main.js` beart neamhspleách Next.js go díreach le ham rite Node
Electron chun neamhréir ABI idir modúil dhúchasacha agus Node an chórais a sheachaint:

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

Príomhphointí:

- Déanann `waitForServer()` an URL a phóiláil ar feadh suas le 30 s sula dtaispeántar an fhuinneog (gan scáileán bán ar thosú fuar).
- Gabhann `stdio: "pipe"` stdout/stderr; astaíonn frásaí ullmhachta (`Ready` / `listening`) `server-status: running` thar IPC.
- Fanann `before-quit` suas le 5 s le haghaidh SIGTERM séimh (seicphointe WAL) agus ansin seolann sé SIGKILL.
- Stopann agus atosaíonn an lascóir poirt sa tráidire (`20128`, `3000`, `8080`) an freastalaí, agus ansin athlódálann sé an BrowserWindow.

## Túsú Rúin gan Chumraíocht

Ar an gcéad seoladh, gineann agus sábhálann an príomhphróiseas aon rúin atá in easnamh go huathoibríoch:

| Rún                      | Foinse                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (diúltaíonn sé má tá dintiúir chriptithe ann cheana) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                      |

Sábháiltear iad in `<DATA_DIR>/server.env`. Réitítear `DATA_DIR` mar seo:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` nó `~/.omniroute`
- macOS: `~/.omniroute`

## Fuinneog & Tráidire

- `BrowserWindow`: 1400×900 (íosmhéid 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, na cnaipí soilse tráchta ag `{ x: 16, y: 16 }`.
- Windows/Linux: barra teidil dúchasach.
- Íoslaghdaíonn an cnaipe dúnta chuig an tráidire; tá **Oscail OmniRoute**, **Oscail an Deais** (brabhsálaí seachtrach), fo-roghchlár **Port an Fhreastalaí**, **Seiceáil le haghaidh Nuashonruithe**, agus **Scoir** i roghchlár an tráidire.

## Beartas Slándála Inneachair

Socraítear é trí `session.defaultSession.webRequest.onHeadersReceived`. Treoracha suntasacha:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Cuireann mód forbartha `'unsafe-eval'` le `script-src` amháin

## Nuashonrú Uathoibríoch

Úsáideann sé `electron-updater` leis an soláthraí GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Cuirtear imeachtaí ar aghaidh chuig an rindreálaí trí IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (le `percent`), `downloaded`, `error`
- Maraíonn `installUpdate()` an freastalaí agus glaonn sé ar `autoUpdater.quitAndInstall()` ansin
- Déantar é a scipeáil sa mhód forbartha (`!app.isPackaged`)

## Píblíne Tógála

1. `npm run build` → leagan neamhspleách Next.js in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → athchéimníonn sé isteach in `.next/electron-standalone` agus athscríobhann sé cosáin absalóideacha laistigh de `server.js` + `required-server-files.json` ionas gur féidir an beart a athlonnú.
3. Pacáistíonn `electron-builder` `main.js`, `preload.js`, `node_modules`, agus `extraResources: { ../.next/electron-standalone → app }`.

### Spriocanna tógála

| Córas Oibriúcháin | Spriocanna                                       |
| ----------------- | ------------------------------------------------ |
| Windows           | Suiteálaí NSIS + leagan iniompartha (x64)        |
| macOS             | DMG (Intel + arm64, tarraing chuig Applications) |
| Linux             | AppImage + DEB (x64 + arm64)                     |

Socruithe NSIS: `oneClick: false`, ligeann sé don úsáideoir an chomhadlann suiteála a roghnú, agus cruthaíonn sé aicearraí ar an Deasc agus sa roghchlár Tosaigh.

## Tástáil Deataigh ar an Leagan Pacáistithe

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Aimsíonn sé an comhad dénártha pacáistithe go huathoibríoch in `electron/dist-electron/` don ardán reatha.
- Seolann sé é le comhadlanna leithlisithe `HOME`/`APPDATA`/`XDG_*` ionas nach mbaineann sé le sonraí an fhorbróra.
- Déanann sé `http://127.0.0.1:20128/login` a pholláil le haghaidh HTTP 200 laistigh de 45 s.
- Déanann sé monatóireacht ar stderr/stdout le haghaidh patrúin mharfacha (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, srl.).
- Fanann sé ar feadh 2 s d’am rite cobhsaí tar éis don chóras a bheith réidh, ansin eisíonn sé SIGTERM agus fanann sé go dtí go mbeidh an port saor.
- In CI, tugann sé `--no-sandbox --disable-gpu` go huathoibríoch (agus `--disable-dev-shm-usage` ar Linux).

Sáruithe timpeallachta: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Síniú Cóid

Ní nascann `electron/package.json` dintiúir sínithe go díreach. Cuir ar aghaidh chuig `electron-builder` iad trí athróga timpeallachta:

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

Tá síniú AppImage roghnach — socraigh `LINUX_GPG_KEY` má tá síniú á dhéanamh.

## Dáileadh

Cuirtear na déantáin in `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Foilsítear eisiúintí ar GitHub Releases (`diegosouzapw/OmniRoute`), agus is ann freisin a sheiceálann `electron-updater` le haghaidh leaganacha nua.

## Fabhtcheartú

| Siomptóm                                                             | Réiteach                                                                                                                                                              |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` tar éis mór-uasghrádú Electron | Seoltar réamhthógálacha Node-API le better-sqlite3 v13 — rith `npm install` arís ag an bhfréamh agus `prepare:bundle` (fíoraíonn sé an réamhthógáil don ardán reatha) |
| `ERR_DLOPEN_FAILED` don mhodúl dúchasach                             | Rith `prepare:bundle` arís — teipeann sé láithreach nuair atá réamhthógáil Node-API don ardán reatha ar iarraidh                                                      |
| Tá an fhuinneog bán ar Linux                                         | Deimhnigh gur cheangail an freastalaí Next.js le PORT i ndáiríre (seiceáil logaí `[Server]`)                                                                          |
| Tá nótarú macOS ar stad                                              | Cinntigh go bhfuil athróga `APPLE_*` easpórtáilte, seachas a bheith in `.env` amháin                                                                                  |
| Rabhadh Windows SmartScreen                                          | Sínigh le teastas EV, nó cliceálann úsáideoirí ar dheis → "Run anyway"                                                                                                |
| Teipeann ar an tástáil deataigh toisc an port a bheith in úsáid      | Stop aon fhreastalaí forbartha áitiúil ar 20128 sula ritear `electron:smoke:packaged`                                                                                 |

## Féach Freisin

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Foinse: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Uirlisí cúnta: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
