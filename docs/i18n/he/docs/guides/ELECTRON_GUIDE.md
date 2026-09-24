# Electron Desktop Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **מקור האמת:** סביבת העבודה `electron/`
> **עדכון אחרון:** 2026-06-28 — v3.8.40

OmniRoute מספקת יישום שולחני חוצה פלטפורמות (Windows / macOS / Linux), המבוסס על
**Electron 41** + **electron-builder 26.10**. היישום השולחני מפעיל את שרת Next.js
העצמאי כתהליך בן, מפנה אליו `BrowserWindow`, ומוסיף מגש מערכת, מנגנון עדכון אוטומטי, גשר IPC ואתחול סודות ללא צורך בהגדרות.

## ארכיטקטורה

```
┌──────────────────────────────────────────────┐
│ התהליך הראשי של Electron (electron/main.js)  │
│ ├─ נעילה למופע יחיד                          │
│ ├─ תהליך בן: שרת Next.js עצמאי               │
│ │   (מופעל באמצעות סביבת Node של Electron)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ מגש מערכת + תפריט הקשר                    │
│ ├─ עדכון אוטומטי באמצעות electron-updater    │
│ ├─ מדיניות אבטחת תוכן (כותרות הפעלה)         │
│ └─ אתחול סודות (JWT / API_KEY_SECRET)        │
└──────────────────────────────────────────────┘
            ↕ גשר IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ מנגנון התצוגה (לוח הבקרה של Next.js)         │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## גרסאות

אומתו מתוך `electron/package.json`:

| חבילה              | גרסה                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                                      |
| `electron-builder` | `^26.15.3`                                                                     |
| `electron-updater` | `^6.8.9`                                                                       |
| `better-sqlite3`   | בשורש `^13.0.2` (בניות מוכנות מראש של Node-API — ללא בנייה מחדש עבור Electron) |
| גרסת היישום        | `3.8.0`                                                                        |
| מזהה היישום        | `online.omniroute.desktop`                                                     |
| שם המוצר           | `OmniRoute`                                                                    |

## סקריפטים (`package.json` הראשי)

| סקריפט                            | מטרה                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run electron:dev`            | מפעיל את `npm run dev` + ממתין ל-`localhost:20128` + מפעיל את Electron             |
| `npm run electron:build`          | בונה את Next.js ולאחר מכן מריץ את `electron-builder` עבור מערכת ההפעלה הנוכחית     |
| `npm run electron:build:win`      | בונה מתקין NSIS ל-Windows + גרסה ניידת (x64)                                       |
| `npm run electron:build:mac`      | בונה DMG עבור macOS (Intel + Apple Silicon)                                        |
| `npm run electron:build:linux`    | בונה AppImage + DEB עבור Linux (x64 + arm64)                                       |
| `npm run electron:smoke:packaged` | מפעיל את הקובץ הבינארי הארוז ובודק את `/login` לקבלת HTTP 200, ולאחר מכן מכבה אותו |

סביבת העבודה `electron/` חושפת גם:

- `npm run prepare:bundle` — מריץ את `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — בניות macOS לארכיטקטורה יחידה
- `npm run pack` — בניית תיקייה בלבד לצורך בדיקות מקומיות (ללא מתקין)

## מבנה התיקיות

```
electron/
├── package.json              # תלויות Electron + תצורת electron-builder
├── main.js                   # התהליך הראשי (24 KB — ראו הערות בהמשך)
├── preload.js                # גשר IPC באמצעות contextBridge
├── types.d.ts                # טיפוסי AppInfo / ServerStatus / ElectronAPI
├── README.md                 # הערות בתוך סביבת העבודה
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # פלט electron-builder (לא נכלל ב-git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # מכין את חבילת .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # בדיקת smoke לאחר הבנייה
```

גם `main.js` וגם `preload.js` הם **קובצי CommonJS מסוג `.js`**, ולא TypeScript. הגדרות
הטיפוסים בצד ה-renderer נמצאות ב-`electron/types.d.ts`.

## גשר IPC (`preload.js`)

ה-preload חושף API מרשימה מורשית תחת `window.electronAPI` באמצעות `contextBridge`
עם `contextIsolation: true` ו-`nodeIntegration: false`.

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

מתודות חשופות:

| קריאה מה-renderer                                                 | סוג                      |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                   |
| `openExternal(url)`                                               | invoke                   |
| `getDataDir()`                                                    | invoke                   |
| `restartServer()`                                                 | invoke                   |
| `getAppVersion()`                                                 | invoke                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (מחזיר disposer) |

פונקציות העזר של receive מחזירות **פונקציית disposer** במקום להסתמך על
`removeAllListeners` — הדבר מונע הצטברות של listeners כאשר רכיבי React
עוברים remount.

## מחזור חיי השרת

`main.js` מפעיל את חבילת ה-standalone של Next.js ישירות באמצעות סביבת הריצה Node
של Electron, כדי למנוע אי-התאמת ABI של מודולים native מול Node של המערכת:

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

נקודות עיקריות:

- `waitForServer()` דוגמת את כתובת ה-URL במשך עד 30 שניות לפני הצגת החלון (אין מסך ריק בהפעלה קרה).
- `stdio: "pipe"` לוכד את stdout/stderr; ביטויי מוכנות (`Ready` / `listening`) משדרים `server-status: running` דרך IPC.
- `before-quit` ממתין עד 5 שניות לסיום תקין באמצעות SIGTERM (נקודת ביקורת של WAL), ולאחר מכן שולח SIGKILL.
- בורר היציאות במגש המערכת (`20128`, `3000`, `8080`) עוצר ומפעיל מחדש את השרת, ולאחר מכן טוען מחדש את BrowserWindow.

## אתחול סודות ללא הגדרות

בהפעלה הראשונה, התהליך הראשי יוצר אוטומטית ושומר סודות חסרים:

| סוד                      | מקור                                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (מסרב אם כבר קיימים פרטי גישה מוצפנים) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                        |

נשמרים ב-`<DATA_DIR>/server.env`. הערך של `DATA_DIR` נקבע כך:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` או `~/.omniroute`
- macOS: `~/.omniroute`

## חלון ומגש מערכת

- `BrowserWindow`: ‏1400×900 (מינימום 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: ‏`titleBarStyle: "hiddenInset"`, לחצני החלון במיקום `{ x: 16, y: 16 }`.
- Windows/Linux: שורת כותרת מקורית של מערכת ההפעלה.
- כפתור הסגירה ממזער למגש המערכת; תפריט המגש כולל **פתיחת OmniRoute**, **פתיחת לוח הבקרה** (בדפדפן חיצוני), תפריט משנה **יציאת השרת**, **בדיקת עדכונים**, **יציאה**.

## מדיניות אבטחת תוכן

מוגדרת באמצעות `session.defaultSession.webRequest.onHeadersReceived`. הנחיות ראויות לציון:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- מצב פיתוח מוסיף את `'unsafe-eval'` ל-`script-src` בלבד

## עדכון אוטומטי

משתמש ב-`electron-updater` עם ספק GitHub‏ (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- אירועים מועברים לממשק המשתמש באמצעות IPC מסוג `update-status`:
  `checking`, `available`, `not-available`, `downloading` (עם `percent`), `downloaded`, `error`
- `installUpdate()` מסיים את השרת ולאחר מכן קורא ל-`autoUpdater.quitAndInstall()`
- מדולג במצב פיתוח (`!app.isPackaged`)

## תהליך הבנייה

1. `npm run build` ← גרסת Next.js עצמאית ב-`.next/standalone`.
2. `prepare-electron-standalone.mjs` ← מסדר מחדש לתוך `.next/electron-standalone` ומשכתב נתיבים מוחלטים בתוך `server.js` ו-`required-server-files.json`, כך שניתן יהיה להעביר את החבילה ממקום למקום.
3. `electron-builder` אורז את `main.js`,‏ `preload.js`,‏ `node_modules` ואת `extraResources: { ../.next/electron-standalone → app }`.

### יעדי בנייה

| מערכת הפעלה | יעדים                                      |
| ----------- | ------------------------------------------ |
| Windows     | מתקין NSIS + גרסה ניידת (x64)              |
| macOS       | DMG‏ (Intel + arm64, גרירה ל-Applications) |
| Linux       | AppImage + DEB‏ (x64 + arm64)              |

הגדרות NSIS: ‏`oneClick: false`, מאפשר למשתמש לבחור את תיקיית ההתקנה ויוצר קיצורי דרך בשולחן העבודה ובתפריט ההתחלה.

## בדיקת עשן של גרסה ארוזה

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- מאתר אוטומטית את קובץ ההפעלה הארוז ב-`electron/dist-electron/` עבור הפלטפורמה הנוכחית.
- מופעל עם תיקיות `HOME`/`APPDATA`/`XDG_*` מבודדות, כדי שלא לגעת בנתוני המפתח.
- בודק שוב ושוב את `http://127.0.0.1:20128/login` לקבלת HTTP 200 בתוך 45 שניות.
- מנטר את stderr/stdout לאיתור דפוסים קטלניים (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` וכו').
- ממתין ל-2 שניות של זמן ריצה יציב לאחר שהמערכת מוכנה, לאחר מכן שולח SIGTERM וממתין לשחרור היציאה.
- ב-CI, מעביר אוטומטית את `--no-sandbox --disable-gpu` (וגם את `--disable-dev-shm-usage` ב-Linux).

דריסות באמצעות משתני סביבה: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## חתימת קוד

הקובץ `electron/package.json` **אינו** מגדיר ישירות את פרטי ההזדהות לחתימה. העבירו אותם באמצעות משתני סביבה אל `electron-builder`:

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

חתימה על AppImage היא אופציונלית — הגדירו את `LINUX_GPG_KEY` אם נדרשת חתימה.

## הפצה

תוצרי הבנייה נשמרים ב־`electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

הגרסאות מתפרסמות ב־GitHub Releases (`diegosouzapw/OmniRoute`), ושם גם `electron-updater` בודק אם קיימות גרסאות חדשות.

## פתרון בעיות

| תסמין                                                                   | פתרון                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` לאחר שדרוג גרסה ראשית של Electron | better-sqlite3 v13 כולל קבצים בינאריים שנבנו מראש עבור Node-API — הריצו מחדש את `npm install` בתיקיית השורש ואת `prepare:bundle` (הוא מאמת את הקובץ הבינארי שנבנה מראש עבור הפלטפורמה הנוכחית) |
| `ERR_DLOPEN_FAILED` עבור מודול מקורי                                    | הריצו מחדש את `prepare:bundle` — הוא נכשל מיד כאשר חסר הקובץ הבינארי של Node-API שנבנה מראש עבור הפלטפורמה הנוכחית                                                                             |
| החלון מופיע ריק ב־Linux                                                 | ודאו ששרת Next.js אכן מאזין ב־PORT (בדקו את יומני `[Server]`)                                                                                                                                  |
| תהליך האימות הנוטריוני ב־macOS נתקע                                     | ודאו שמשתני `APPLE_*` מיוצאים, ולא רק מוגדרים ב־`.env`                                                                                                                                         |
| אזהרת Windows SmartScreen                                               | חתמו באמצעות אישור EV, או שהמשתמשים ילחצו באמצעות לחצן העכבר הימני ← "הפעל בכל זאת"                                                                                                            |
| בדיקת העשן נכשלת משום שהפורט נמצא בשימוש                                | עצרו כל שרת פיתוח מקומי הפועל בפורט 20128 לפני הרצת `electron:smoke:packaged`                                                                                                                  |

## ראו גם

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- קוד מקור: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- כלי עזר: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
