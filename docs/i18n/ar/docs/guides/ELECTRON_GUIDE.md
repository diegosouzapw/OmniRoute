# Electron Desktop Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **مصدر الحقيقة:** مساحة العمل `electron/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يأتي OmniRoute مع تطبيق سطح مكتب متعدد المنصات (Windows / macOS / Linux) مبني باستخدام
**Electron 41** + **electron-builder 26.10**. يشغّل تطبيق سطح المكتب خادم Next.js
المستقل كعملية فرعية، ويوجّه `BrowserWindow` إليه، ويضيف
أيقونة في علبة النظام، ومحدّثًا تلقائيًا، وجسر IPC، وتهيئة تلقائية للأسرار دون الحاجة إلى إعداد.

## البنية

```
┌──────────────────────────────────────────────┐
│ عملية Electron الرئيسية (electron/main.js)   │
│ ├─ قفل النسخة الواحدة                        │
│ ├─ عملية فرعية: خادم Next.js المستقل         │
│ │   (يُشغّل باستخدام بيئة Node الخاصة بـ Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ علبة النظام + قائمة سياقية                │
│ ├─ تحديث تلقائي عبر electron-updater         │
│ ├─ سياسة أمان المحتوى (ترويسات الجلسة)       │
│ └─ تهيئة الأسرار (JWT / API_KEY_SECRET)      │
└──────────────────────────────────────────────┘
            ↕ جسر IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ العارض (لوحة معلومات Next.js)                │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## الإصدارات

مؤكدة من `electron/package.json`:

| الحزمة             | الإصدار                                                                           |
| ------------------ | --------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                         |
| `electron-builder` | `^26.15.3`                                                                        |
| `electron-updater` | `^6.8.9`                                                                          |
| `better-sqlite3`   | الجذر `^13.0.2` (إصدارات Node-API مسبقة البناء — لا حاجة إلى إعادة بناء Electron) |
| إصدار التطبيق      | `3.8.0`                                                                           |
| معرّف التطبيق      | `online.omniroute.desktop`                                                        |
| اسم المنتج         | `OmniRoute`                                                                       |

## البرامج النصية (`package.json` الجذري)

| البرنامج النصي                    | الغرض                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | يشغّل `npm run dev` + ينتظر `localhost:20128` + يشغّل Electron                         |
| `npm run electron:build`          | يبني Next.js ثم يشغّل `electron-builder` لنظام التشغيل الحالي                          |
| `npm run electron:build:win`      | يبني مثبّت Windows بنظام NSIS + إصدارًا محمولًا (x64)                                  |
| `npm run electron:build:mac`      | يبني ملف DMG لنظام macOS (Intel + Apple Silicon)                                       |
| `npm run electron:build:linux`    | يبني AppImage + DEB لنظام Linux (x64 + arm64)                                          |
| `npm run electron:smoke:packaged` | يشغّل الملف التنفيذي المجمّع ويفحص `/login` بحثًا عن استجابة HTTP 200، ثم يوقف التشغيل |

توفّر مساحة العمل `electron/` أيضًا:

- `npm run prepare:bundle` — يشغّل `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — عمليات بناء macOS لمعمارية واحدة
- `npm run pack` — بناء على هيئة مجلد فقط للاختبار المحلي (من دون مثبّت)

## تخطيط الدلائل

```
electron/
├── package.json              # تبعيات Electron + إعدادات electron-builder
├── main.js                   # العملية الرئيسية (24 KB — راجع التعليقات التوضيحية أدناه)
├── preload.js                # جسر IPC عبر contextBridge
├── types.d.ts                # أنواع AppInfo / ServerStatus / ElectronAPI
├── README.md                 # ملاحظات ضمن مساحة العمل
├── assets/                   # icon.png وicon.ico وicon.icns وtray-icon.png
└── dist-electron/            # مخرجات electron-builder (متجاهلة في git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # يُجهّز حزمة .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # اختبار تحقق سريع بعد البناء
```

كل من `main.js` و`preload.js` عبارة عن **ملفات CommonJS بامتداد `.js`**، وليسا مكتوبين بلغة TypeScript. توجد
تعريفات الأنواع الخاصة بطرف المُصيّر في `electron/types.d.ts`.

## جسر IPC ‏(`preload.js`)

تكشف عملية التحميل المسبق واجهة API مدرجة في القائمة المسموح بها على `window.electronAPI` باستخدام `contextBridge`
مع `contextIsolation: true` و`nodeIntegration: false`.

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

الدوال المكشوفة:

| استدعاء المُصيّر                                                  | النوع                      |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                     |
| `openExternal(url)`                                               | invoke                     |
| `getDataDir()`                                                    | invoke                     |
| `restartServer()`                                                 | invoke                     |
| `getAppVersion()`                                                 | invoke                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (تُرجع دالة تنظيف) |

تُرجع دوال الاستقبال المساعدة **دالة تنظيف** بدلًا من الاعتماد على
`removeAllListeners` — وهذا يمنع تراكم المستمعين عند إعادة تركيب مكوّنات React.

## دورة حياة الخادم

يشغّل `main.js` حزمة Next.js المستقلة مباشرةً باستخدام بيئة تشغيل Node الخاصة بـ Electron
لتجنّب عدم تطابق ABI للوحدات الأصلية مع Node المثبّت على النظام:

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

أبرز النقاط:

- تستعلم `waitForServer()` عن عنوان URL دوريًا لمدة تصل إلى 30 s قبل إظهار النافذة (لتجنّب الشاشة الفارغة عند بدء التشغيل البارد).
- يلتقط `stdio: "pipe"` المخرج القياسي ومخرج الأخطاء القياسي؛ وتؤدي عبارات الجاهزية (`Ready` / `listening`) إلى إرسال `server-status: running` عبر IPC.
- ينتظر `before-quit` مدة تصل إلى 5 s لتنفيذ SIGTERM بشكل سلس (نقطة تحقق WAL)، ثم يرسل SIGKILL.
- يعمل مبدّل المنافذ في علبة النظام (`20128` و`3000` و`8080`) على إيقاف الخادم وإعادة تشغيله، ثم يعيد تحميل BrowserWindow.

## التهيئة الأولية للأسرار دون إعداد

عند التشغيل لأول مرة، تُنشئ العملية الرئيسية الأسرار المفقودة تلقائيًا وتحفظها:

| السر                     | المصدر                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (يرفض إذا كانت بيانات اعتماد مشفرة موجودة بالفعل) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                   |

تُحفظ في `<DATA_DIR>/server.env`. تُحدَّد قيمة `DATA_DIR` كما يلي:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` أو `~/.omniroute`
- macOS: `~/.omniroute`

## النافذة وشريط النظام

- `BrowserWindow`:‏ 1400×900 (الحد الأدنى 1024×700)، و`backgroundColor: "#0a0a0a"`.
- macOS:‏ `titleBarStyle: "hiddenInset"`، وأزرار التحكم في النافذة عند `{ x: 16, y: 16 }`.
- Windows/Linux: شريط عنوان أصلي.
- يؤدي زر الإغلاق إلى تصغير التطبيق إلى شريط النظام؛ وتحتوي قائمة شريط النظام على **فتح OmniRoute**، و**فتح لوحة المعلومات** (في متصفح خارجي)، وقائمة فرعية **منفذ الخادم**، و**التحقق من وجود تحديثات**، و**إنهاء**.

## سياسة أمان المحتوى

تُعيَّن عبر `session.defaultSession.webRequest.onHeadersReceived`. من التوجيهات البارزة:

- `frame-ancestors 'none'`، و`object-src 'none'`، و`child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- يضيف وضع التطوير `'unsafe-eval'` إلى `script-src` فقط

## التحديث التلقائي

يستخدم `electron-updater` مع موفّر GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`، و`autoInstallOnAppQuit = true`
- تُمرَّر الأحداث إلى عملية العرض عبر `update-status` IPC:
  `checking`، و`available`، و`not-available`، و`downloading` (مع `percent`)، و`downloaded`، و`error`
- تقتل `installUpdate()` الخادم ثم تستدعي `autoUpdater.quitAndInstall()`
- يُتخطى في وضع التطوير (`!app.isPackaged`)

## مسار البناء

1. `npm run build` ← إصدار Next.js مستقل في `.next/standalone`.
2. يعيد `prepare-electron-standalone.mjs` ترتيب الملفات في `.next/electron-standalone` ويعيد كتابة المسارات المطلقة داخل `server.js` و`required-server-files.json` بحيث تكون الحزمة قابلة للنقل.
3. يحزّم `electron-builder` الملفات `main.js` و`preload.js` و`node_modules`، بالإضافة إلى `extraResources: { ../.next/electron-standalone → app }`.

### أهداف البناء

| نظام التشغيل | الأهداف                                       |
| ------------ | --------------------------------------------- |
| Windows      | مُثبّت NSIS + إصدار محمول (x64)               |
| macOS        | DMG ‏(Intel + arm64، بالسحب إلى Applications) |
| Linux        | AppImage + DEB ‏(x64 + arm64)                 |

إعدادات NSIS:‏ `oneClick: false`، وتسمح للمستخدم باختيار دليل التثبيت، وتنشئ اختصارات على سطح المكتب وفي قائمة «ابدأ».

## اختبار الدخان للإصدار المحزّم

```bash
npm run electron:smoke:packaged
```

يقوم `scripts/dev/smoke-electron-packaged.mjs` بما يلي:

- يكتشف تلقائيًا الملف التنفيذي المحزّم في `electron/dist-electron/` للمنصة الحالية.
- يشغّله باستخدام أدلة `HOME`/`APPDATA`/`XDG_*` معزولة، كي لا يلمس بيانات المطوّر.
- يستطلع `http://127.0.0.1:20128/login` للحصول على استجابة HTTP 200 خلال 45 ثانية.
- يراقب stderr/stdout بحثًا عن أنماط الأخطاء الفادحة (`Cannot find module`، و`MODULE_NOT_FOUND`، و`ERR_DLOPEN_FAILED`، و`Failed to start server`، وغيرها).
- ينتظر ثانيتين من التشغيل المستقر بعد الجاهزية، ثم يرسل SIGTERM وينتظر حتى يصبح المنفذ متاحًا.
- في CI، يمرّر تلقائيًا `--no-sandbox --disable-gpu` (وكذلك `--disable-dev-shm-usage` على Linux).

تجاوزات متغيرات البيئة: `ELECTRON_SMOKE_APP_EXECUTABLE`، و`ELECTRON_SMOKE_URL`، و`ELECTRON_SMOKE_TIMEOUT_MS`، و`ELECTRON_SMOKE_SETTLE_MS`، و`ELECTRON_SMOKE_DATA_DIR`، و`ELECTRON_SMOKE_KEEP_DATA`، و`ELECTRON_SMOKE_STREAM_LOGS`.

## توقيع الشفرة

لا يربط `electron/package.json` بيانات اعتماد التوقيع مباشرةً. مرّرها عبر متغيرات البيئة إلى `electron-builder`:

### macOS

```bash
export APPLE_ID=<البريد-الإلكتروني>
export APPLE_APP_SPECIFIC_PASSWORD=<كلمة-المرور>
export APPLE_TEAM_ID=<المعرّف>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<كلمة-مرور-الشهادة>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<كلمة-مرور-الشهادة>
npm run electron:build:win
```

### Linux

توقيع AppImage اختياري — اضبط `LINUX_GPG_KEY` عند الرغبة في التوقيع.

## التوزيع

توجد الملفات الناتجة في `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`، `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`، `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`، `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

تُنشر الإصدارات في GitHub Releases ‏(`diegosouzapw/OmniRoute`)، وهو أيضًا المكان الذي يتحقق فيه `electron-updater` من وجود إصدارات جديدة.

## استكشاف الأخطاء وإصلاحها

| العَرَض                                                                 | الحل                                                                                                                                                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ظهور `Cannot find module 'better-sqlite3'` بعد ترقية رئيسية لـ Electron | يوفّر better-sqlite3 v13 إصدارات مبنية مسبقًا لـ Node-API — أعد تشغيل `npm install` في الدليل الجذر و`prepare:bundle` (حيث يتحقق من الإصدار المبني مسبقًا للمنصة الحالية) |
| ظهور `ERR_DLOPEN_FAILED` للوحدة الأصلية                                 | أعد تشغيل `prepare:bundle` — إذ يتوقف فورًا مع إظهار الخطأ عند غياب إصدار Node-API المبني مسبقًا للمنصة الحالية                                                           |
| ظهور نافذة فارغة على Linux                                              | تأكد من أن خادم Next.js قد ارتبط فعليًا بـ PORT (راجع سجلات `[Server]`)                                                                                                   |
| توقف توثيق macOS                                                        | تأكد من تصدير متغيرات `APPLE_*`، وليس مجرد وضعها في `.env`                                                                                                                |
| تحذير Windows SmartScreen                                               | وقّع باستخدام شهادة EV، أو يمكن للمستخدمين النقر بزر الماوس الأيمن ← "التشغيل على أي حال"                                                                                 |
| فشل اختبار الدخان بسبب استخدام المنفذ                                   | أوقف أي خادم تطوير محلي يعمل على المنفذ 20128 قبل تشغيل `electron:smoke:packaged`                                                                                         |

## انظر أيضًا

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- المصدر: `electron/main.js`، `electron/preload.js`، `electron/package.json`
- الأدوات المساعدة: `scripts/build/prepare-electron-standalone.mjs`، `scripts/dev/smoke-electron-packaged.mjs`
