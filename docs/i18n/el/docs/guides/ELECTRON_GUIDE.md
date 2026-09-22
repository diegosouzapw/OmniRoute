# Electron Desktop Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Πηγή αναφοράς:** χώρος εργασίας `electron/`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute διαθέτει μια εφαρμογή επιφάνειας εργασίας πολλαπλών πλατφορμών (Windows / macOS / Linux), βασισμένη στα
**Electron 41** + **electron-builder 26.10**. Η εφαρμογή επιφάνειας εργασίας εκκινεί τον αυτόνομο διακομιστή Next.js
ως θυγατρική διεργασία, κατευθύνει ένα `BrowserWindow` σε αυτόν και προσθέτει
εικονίδιο περιοχής ειδοποιήσεων, αυτόματη ενημέρωση, γέφυρα IPC και αρχικοποίηση μυστικών χωρίς ρυθμίσεις.

## Αρχιτεκτονική

```
┌──────────────────────────────────────────────────────┐
│ Κύρια διεργασία Electron (electron/main.js)          │
│ ├─ Κλείδωμα μοναδικής παρουσίας                      │
│ ├─ Θυγατρική διεργασία: αυτόνομος διακομιστής Next.js│
│ │   (εκκινείται με το περιβάλλον Node του Electron)  │
│ ├─ BrowserWindow → http://localhost:PORT             │
│ ├─ Περιοχή ειδοποιήσεων + μενού περιβάλλοντος        │
│ ├─ Αυτόματη ενημέρωση μέσω electron-updater           │
│ ├─ Πολιτική Ασφάλειας Περιεχομένου (κεφαλίδες session)│
│ └─ Αρχικοποίηση μυστικών (JWT / API_KEY_SECRET)       │
└──────────────────────────────────────────────────────┘
            ↕ Γέφυρα IPC (electron/preload.js)
┌──────────────────────────────────────────────────────┐
│ Διεργασία απόδοσης (πίνακας ελέγχου Next.js)         │
│   window.electronAPI.* (contextIsolation)             │
└──────────────────────────────────────────────────────┘
```

## Εκδόσεις

Επιβεβαιωμένες από το `electron/package.json`:

| Πακέτο                  | Έκδοση                                                                    |
| ----------------------- | ------------------------------------------------------------------------- |
| `electron`              | `^43.4.1`                                                                 |
| `electron-builder`      | `^26.15.3`                                                                |
| `electron-updater`      | `^6.8.9`                                                                  |
| `better-sqlite3`        | ριζικό `^13.0.2` (προμεταγλωττισμένα Node-API — χωρίς αναδόμηση Electron) |
| Έκδοση εφαρμογής        | `3.8.0`                                                                   |
| Αναγνωριστικό εφαρμογής | `online.omniroute.desktop`                                                |
| Όνομα προϊόντος         | `OmniRoute`                                                               |

## Σενάρια εντολών (ριζικό `package.json`)

| Σενάριο εντολών                   | Σκοπός                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Εκκινεί το `npm run dev` + περιμένει το `localhost:20128` + εκκινεί το Electron                                    |
| `npm run electron:build`          | Δημιουργεί το build του Next.js και, στη συνέχεια, εκτελεί το `electron-builder` για το τρέχον λειτουργικό σύστημα |
| `npm run electron:build:win`      | Δημιουργεί πρόγραμμα εγκατάστασης Windows NSIS + φορητή έκδοση (x64)                                               |
| `npm run electron:build:mac`      | Δημιουργεί DMG για macOS (Intel + Apple Silicon)                                                                   |
| `npm run electron:build:linux`    | Δημιουργεί AppImage + DEB για Linux (x64 + arm64)                                                                  |
| `npm run electron:smoke:packaged` | Εκκινεί το πακεταρισμένο εκτελέσιμο, ελέγχει το `/login` για HTTP 200 και, στη συνέχεια, τερματίζεται              |

Ο χώρος εργασίας `electron/` παρέχει επίσης:

- `npm run prepare:bundle` — εκτελεί το `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — build του macOS για μία μόνο αρχιτεκτονική
- `npm run pack` — build μόνο καταλόγου για τοπικές δοκιμές (χωρίς πρόγραμμα εγκατάστασης)

## Διάταξη καταλόγων

```
electron/
├── package.json              # Εξαρτήσεις Electron + ρυθμίσεις electron-builder
├── main.js                   # Κύρια διεργασία (24 KB — δείτε τις σημειώσεις παρακάτω)
├── preload.js                # Γέφυρα IPC μέσω contextBridge
├── types.d.ts                # Τύποι AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Σημειώσεις εντός του χώρου εργασίας
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Έξοδος electron-builder (αγνοείται από το git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Προετοιμάζει το πακέτο .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Δοκιμή smoke μετά τη μεταγλώττιση
```

Τόσο το `main.js` όσο και το `preload.js` είναι **αρχεία CommonJS `.js`** και όχι TypeScript. Οι
δηλώσεις τύπων για την πλευρά του renderer βρίσκονται στο `electron/types.d.ts`.

## Γέφυρα IPC (`preload.js`)

Το preload εκθέτει ένα API εγκεκριμένης λίστας στο `window.electronAPI` χρησιμοποιώντας το `contextBridge`
με `contextIsolation: true` και `nodeIntegration: false`.

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

Εκτιθέμενες μέθοδοι:

| Κλήση renderer                                                    | Τύπος                         |
| ----------------------------------------------------------------- | ----------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                        |
| `openExternal(url)`                                               | invoke                        |
| `getDataDir()`                                                    | invoke                        |
| `restartServer()`                                                 | invoke                        |
| `getAppVersion()`                                                 | invoke                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                          |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (επιστρέφει disposer) |

Οι βοηθητικές συναρτήσεις receive επιστρέφουν μια **συνάρτηση disposer** αντί να βασίζονται στο
`removeAllListeners` — αυτό αποτρέπει τη συσσώρευση ακροατών όταν τα στοιχεία React
επαναπροσαρτώνται.

## Κύκλος ζωής διακομιστή

Το `main.js` εκκινεί απευθείας το αυτόνομο πακέτο Next.js με το περιβάλλον εκτέλεσης Node του Electron,
ώστε να αποφεύγεται η ασυμβατότητα ABI εγγενών αρθρωμάτων με το Node του συστήματος:

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

Κύρια σημεία:

- Η `waitForServer()` ελέγχει περιοδικά το URL για έως και 30 s πριν εμφανίσει το παράθυρο (χωρίς κενή οθόνη κατά την ψυχρή εκκίνηση).
- Το `stdio: "pipe"` καταγράφει τα stdout/stderr· οι φράσεις ετοιμότητας (`Ready` / `listening`) εκπέμπουν `server-status: running` μέσω IPC.
- Το `before-quit` περιμένει έως και 5 s για ομαλό SIGTERM (σημείο ελέγχου WAL) και στη συνέχεια στέλνει SIGKILL.
- Ο επιλογέας θύρας στο tray (`20128`, `3000`, `8080`) σταματά και επανεκκινεί τον διακομιστή και, στη συνέχεια, επαναφορτώνει το BrowserWindow.

## Εκκίνηση μυστικών χωρίς ρυθμίσεις

Κατά την πρώτη εκκίνηση, η κύρια διεργασία δημιουργεί αυτόματα και αποθηκεύει μόνιμα τα μυστικά που λείπουν:

| Μυστικό                  | Πηγή                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (αρνείται εάν υπάρχουν ήδη κρυπτογραφημένα διαπιστευτήρια) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                            |

Αποθηκεύονται μόνιμα στο `<DATA_DIR>/server.env`. Το `DATA_DIR` αντιστοιχεί σε:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ή `~/.omniroute`
- macOS: `~/.omniroute`

## Παράθυρο και περιοχή ειδοποιήσεων

- `BrowserWindow`: 1400×900 (ελάχ. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, κουμπιά παραθύρου στη θέση `{ x: 16, y: 16 }`.
- Windows/Linux: εγγενής γραμμή τίτλου.
- Το κουμπί κλεισίματος ελαχιστοποιεί την εφαρμογή στην περιοχή ειδοποιήσεων. Το μενού της περιοχής ειδοποιήσεων διαθέτει τις επιλογές **Άνοιγμα του OmniRoute**, **Άνοιγμα του πίνακα ελέγχου** (σε εξωτερικό πρόγραμμα περιήγησης), υπομενού **Θύρα διακομιστή**, **Έλεγχος για ενημερώσεις**, **Έξοδος**.

## Πολιτική ασφάλειας περιεχομένου

Ορίζεται μέσω του `session.defaultSession.webRequest.onHeadersReceived`. Αξιοσημείωτες οδηγίες:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Η λειτουργία ανάπτυξης προσθέτει το `'unsafe-eval'` μόνο στο `script-src`

## Αυτόματη ενημέρωση

Χρησιμοποιεί το `electron-updater` με τον πάροχο GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Τα συμβάντα προωθούνται στη διεργασία απόδοσης μέσω του IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (με `percent`), `downloaded`, `error`
- Η `installUpdate()` τερματίζει τον διακομιστή και στη συνέχεια καλεί την `autoUpdater.quitAndInstall()`
- Παραλείπεται στη λειτουργία ανάπτυξης (`!app.isPackaged`)

## Διαδικασία δημιουργίας έκδοσης

1. `npm run build` → αυτόνομη έκδοση Next.js στο `.next/standalone`.
2. `prepare-electron-standalone.mjs` → αναδιατάσσει τα αρχεία στο `.next/electron-standalone` και επανεγγράφει τις απόλυτες διαδρομές μέσα στα `server.js` + `required-server-files.json`, ώστε το πακέτο να μπορεί να μετακινηθεί.
3. Το `electron-builder` δημιουργεί πακέτο με τα `main.js`, `preload.js`, `node_modules` και `extraResources: { ../.next/electron-standalone → app }`.

### Προορισμοί δημιουργίας έκδοσης

| Λειτουργικό σύστημα | Προορισμοί                                        |
| ------------------- | ------------------------------------------------- |
| Windows             | Πρόγραμμα εγκατάστασης NSIS + φορητή έκδοση (x64) |
| macOS               | DMG (Intel + arm64, μεταφορά στο Applications)    |
| Linux               | AppImage + DEB (x64 + arm64)                      |

Ρυθμίσεις NSIS: `oneClick: false`, επιτρέπει στον χρήστη να επιλέξει τον κατάλογο εγκατάστασης και δημιουργεί συντομεύσεις στην επιφάνεια εργασίας και στο μενού Έναρξη.

## Δοκιμή καπνού της πακεταρισμένης έκδοσης

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Εντοπίζει αυτόματα το πακεταρισμένο εκτελέσιμο αρχείο στο `electron/dist-electron/` για την τρέχουσα πλατφόρμα.
- Εκκινεί με απομονωμένους καταλόγους `HOME`/`APPDATA`/`XDG_*`, ώστε να μην επηρεάζει τα δεδομένα του προγραμματιστή.
- Ελέγχει επανειλημμένα το `http://127.0.0.1:20128/login` για απόκριση HTTP 200 εντός 45 δευτερολέπτων.
- Παρακολουθεί τα stderr/stdout για μοτίβα κρίσιμων σφαλμάτων (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` κ.λπ.).
- Περιμένει 2 δευτερόλεπτα σταθερής λειτουργίας μετά την ετοιμότητα, έπειτα στέλνει SIGTERM και περιμένει να αποδεσμευτεί η θύρα.
- Στο CI, μεταβιβάζει αυτόματα τα `--no-sandbox --disable-gpu` (και το `--disable-dev-shm-usage` στο Linux).

Παρακάμψεις μέσω μεταβλητών περιβάλλοντος: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Υπογραφή κώδικα

Το `electron/package.json` **δεν** συνδέει απευθείας τα διαπιστευτήρια υπογραφής. Περάστε τα μέσω μεταβλητών περιβάλλοντος στο `electron-builder`:

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

Η υπογραφή AppImage είναι προαιρετική — ορίστε το `LINUX_GPG_KEY` εάν θέλετε υπογραφή.

## Διανομή

Τα παραγόμενα αρχεία τοποθετούνται στο `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Οι εκδόσεις δημοσιεύονται στο GitHub Releases (`diegosouzapw/OmniRoute`), όπου το `electron-updater` ελέγχει επίσης για νέες εκδόσεις.

## Αντιμετώπιση προβλημάτων

| Σύμπτωμα                                                                              | Λύση                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` μετά από αναβάθμιση κύριας έκδοσης του Electron | Το better-sqlite3 v13 παρέχει προμεταγλωττισμένα αρχεία Node-API — εκτελέστε ξανά το `npm install` στον ριζικό κατάλογο και το `prepare:bundle` (επαληθεύει το προμεταγλωττισμένο αρχείο για την τρέχουσα πλατφόρμα) |
| `ERR_DLOPEN_FAILED` για εγγενές άρθρωμα                                               | Εκτελέστε ξανά το `prepare:bundle` — αποτυγχάνει άμεσα όταν λείπει το προμεταγλωττισμένο αρχείο Node-API για την τρέχουσα πλατφόρμα                                                                                  |
| Το παράθυρο εμφανίζεται κενό στο Linux                                                | Επιβεβαιώστε ότι ο διακομιστής Next.js έχει πράγματι συνδεθεί στη θύρα PORT (ελέγξτε τα αρχεία καταγραφής `[Server]`)                                                                                                |
| Η συμβολαιογραφική επικύρωση στο macOS καθυστερεί                                     | Βεβαιωθείτε ότι οι μεταβλητές `APPLE_*` έχουν εξαχθεί και δεν βρίσκονται μόνο στο `.env`                                                                                                                             |
| Προειδοποίηση Windows SmartScreen                                                     | Υπογράψτε με πιστοποιητικό EV ή ζητήστε από τους χρήστες να κάνουν δεξί κλικ → «Εκτέλεση ούτως ή άλλως»                                                                                                              |
| Η δοκιμή καπνού αποτυγχάνει επειδή η θύρα χρησιμοποιείται                             | Σταματήστε οποιονδήποτε τοπικό διακομιστή ανάπτυξης στη θύρα 20128 πριν εκτελέσετε το `electron:smoke:packaged`                                                                                                      |

## Δείτε επίσης

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Πηγή: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Βοηθητικά εργαλεία: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
