# Electron Desktop Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **مصدر الحقيقة:** مساحة العمل `electron/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يأتي OmniRoute مع تطبيق سطح مكتب متعدد المنصات (Windows / macOS / Linux) مبني باستخدام
**Electron 41** + **electron-builder 26.10**. يشغّل تطبيق سطح المكتب خادم Next.js
المستقل كعملية فرعية، ويوجّه `BrowserWindow` إليه، ويضيف
أيقونة في علبة النظام، ومحدّثًا تلقائيًا، وجسر IPC، وتهيئة تلقائية للأسرار دون إعدادات.

## البنية

```
┌──────────────────────────────────────────────┐
│ عملية Electron الرئيسية (electron/main.js)  │
│ ├─ قفل النسخة الواحدة                        │
│ ├─ عملية فرعية: خادم Next.js المستقل         │
│ │   (يُشغّل باستخدام بيئة Node الخاصة بـ Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ علبة النظام + قائمة السياق                 │
│ ├─ تحديث تلقائي عبر electron-updater         │
│ ├─ سياسة أمان المحتوى (ترويسات الجلسة)       │
│ └─ تهيئة الأسرار (JWT / API_KEY_SECRET)      │
└──────────────────────────────────────────────┘
            ↕ جسر IPC ‏(electron/preload.js)
┌──────────────────────────────────────────────┐
│ واجهة العرض (لوحة معلومات Next.js)           │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## الإصدارات

تم التأكيد من `electron/package.json`:

| الحزمة             | الإصدار                                                                             |
| ------------------ | ----------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                           |
| `electron-builder` | `^26.15.3`                                                                          |
| `electron-updater` | `^6.8.9`                                                                            |
| `better-sqlite3`   | الجذر `^13.0.2` (إصدارات Node-API المبنية مسبقًا — لا حاجة إلى إعادة بناء Electron) |
| إصدار التطبيق      | `3.8.0`                                                                             |
| معرّف التطبيق      | `online.omniroute.desktop`                                                          |
| اسم المنتج         | `OmniRoute`                                                                         |

## البرامج النصية (`package.json` الجذري)

| البرنامج النصي                    | الغرض                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run electron:dev`            | يشغّل `npm run dev` + ينتظر `localhost:20128` + يشغّل Electron                     |
| `npm run electron:build`          | يبني Next.js ثم يشغّل `electron-builder` لنظام التشغيل الحالي                      |
| `npm run electron:build:win`      | يبني مثبّت Windows بتنسيق NSIS + نسخة محمولة (x64)                                 |
| `npm run electron:build:mac`      | يبني ملف DMG لنظام macOS ‏(Intel + Apple Silicon)                                  |
| `npm run electron:build:linux`    | يبني AppImage + DEB لنظام Linux ‏(x64 + arm64)                                     |
| `npm run electron:smoke:packaged` | يشغّل الملف التنفيذي المجمّع ويتحقق من `/login` بحثًا عن HTTP 200، ثم يوقف التشغيل |

توفّر مساحة العمل `electron/` أيضًا:

- `npm run prepare:bundle` — يشغّل `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — عمليات بناء macOS لمعمارية واحدة
- `npm run pack` — بناء على هيئة دليل فقط للاختبار المحلي (من دون مثبّت)

## بنية الأدلة

```
electron/
├── package.json              # تبعيات Electron + إعداد electron-builder
├── main.js                   # العملية الرئيسية (24 كيلوبايت — راجع التعليقات التوضيحية أدناه)
├── preload.js                # جسر IPC باستخدام contextBridge
├── types.d.ts                # أنواع AppInfo / ServerStatus / ElectronAPI
├── README.md                 # ملاحظات ضمن مساحة العمل
├── assets/                   # icon.png، icon.ico، icon.icns، tray-icon.png
└── dist-electron/            # مخرجات electron-builder (متجاهلة بواسطة git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # يجهّز حزمة .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # اختبار تحقق سريع بعد البناء
```

كل من `main.js` و`preload.js` عبارة عن **ملفات CommonJS بامتداد `.js`**، وليسا TypeScript. توجد
تعريفات الأنواع الخاصة بجانب العارض في `electron/types.d.ts`.

## جسر IPC ‏(`preload.js`)

يكشف التحميل المسبق واجهة API مدرجة في القائمة المسموح بها على `window.electronAPI` باستخدام `contextBridge`
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

| استدعاء العارض                                                    | النوع                     |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                    |
| `openExternal(url)`                                               | invoke                    |
| `getDataDir()`                                                    | invoke                    |
| `restartServer()`                                                 | invoke                    |
| `getAppVersion()`                                                 | invoke                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (تعيد دالة إلغاء) |

تعيد دوال الاستقبال المساعدة **دالة إلغاء** بدلاً من الاعتماد على
`removeAllListeners` — وهذا يمنع تراكم المستمعين عند إعادة تركيب مكوّنات React.

## دورة حياة الخادم

يشغّل `main.js` حزمة Next.js المستقلة مباشرةً باستخدام بيئة تشغيل Node الخاصة بـ Electron
لتجنب عدم توافق ABI للوحدات الأصلية مع Node المثبّت على النظام:

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

- تستطلع `waitForServer()` عنوان URL لمدة تصل إلى 30 ثانية قبل عرض النافذة (لتجنب ظهور شاشة فارغة عند التشغيل البارد).
- يلتقط `stdio: "pipe"` المخرجات القياسية ومخرجات الأخطاء القياسية؛ وتؤدي عبارات الجاهزية (`Ready` / `listening`) إلى إرسال `server-status: running` عبر IPC.
- ينتظر `before-quit` مدة تصل إلى 5 ثوانٍ لإتمام SIGTERM بسلاسة (نقطة تحقق WAL)، ثم يرسل SIGKILL.
- يوقف مبدّل المنفذ في شريط النظام (`20128`، `3000`، `8080`) الخادم ويعيد تشغيله، ثم يعيد تحميل BrowserWindow.

## التهيئة الأولية للأسرار دون إعداد

عند التشغيل الأول، تُنشئ العملية الرئيسية الأسرار المفقودة تلقائيًا وتحفظها:

| السر                     | المصدر                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                             |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (يرفض المتابعة إذا كانت بيانات اعتماد مشفّرة موجودة بالفعل) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                             |

تُحفظ في `<DATA_DIR>/server.env`. يُحدَّد `DATA_DIR` كما يلي:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` أو `~/.omniroute`
- macOS: `~/.omniroute`

## البحث عن ملف البيئة

قبل تشغيل الخادم، تختار العملية الرئيسية (`getPreferredEnvFilePath()` في
`electron/main.js`) ملف `.env` **واحدًا**: أول ملف موجود مما يلي.

1. `$DATA_DIR/.env`، عندما تكون `DATA_DIR` معيّنة في البيئة التي شُغّل منها التطبيق.
2. `<resolved DATA_DIR>/.env`، باستخدام القيم الافتراضية نفسها المذكورة أعلاه: `%APPDATA%\omniroute\.env` على
   Windows، و`$XDG_CONFIG_HOME/omniroute/.env` أو `~/.omniroute/.env` على Linux وmacOS.
3. ملف `.env` في دليل عمل العملية.

تقرأ العملية الرئيسية هذا الملف فقط؛ ولا تُدمج الملفات اللاحقة المرشحة معه. بعد ذلك، تُنشأ
بيئة الخادم وفق ترتيب الأولوية التالي (من الأعلى إلى الأدنى):

1. بيئة عملية Electron (المتغيرات الموروثة من الجهة التي شغّلت التطبيق).
2. ملف `.env` المحدد.
3. `<DATA_DIR>/server.env` (أسرار التهيئة الأولية المذكورة أعلاه).

تُلتقط بيئة العملية عند بدء تشغيل التطبيق، لذلك فإن متغير بيئة على مستوى النظام أو المستخدم
يُعيّن أثناء تشغيل التطبيق (بما في ذلك أثناء بقائه في شريط النظام بعد إغلاق نافذته) لا يصل إلى
الخادم حتى يُنهى التطبيق بالكامل ويُعاد تشغيله. بالنسبة إلى إعدادات وقت التشغيل مثل
`CONTEXT_LENGTH_<PROVIDER>` (راجع
[متغيرات البيئة: طول السياق لكل موفّر](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider))،
يُفضّل استخدام ملف `.env`، ثم إنهاء التطبيق بالكامل (من شريط النظام، **إنهاء**) وإعادة تشغيله.

## النافذة وشريط النظام

- `BrowserWindow`: ‏1400×900 (الحد الأدنى 1024×700)، `backgroundColor: "#0a0a0a"`.
- macOS: ‏`titleBarStyle: "hiddenInset"`، وأزرار التحكم في النافذة عند `{ x: 16, y: 16 }`.
- Windows/Linux: شريط عنوان أصلي.
- يؤدي زر الإغلاق إلى تصغير التطبيق إلى شريط النظام؛ وتحتوي قائمة شريط النظام على **فتح OmniRoute**، و**فتح لوحة المعلومات** (في متصفح خارجي)، وقائمة فرعية **منفذ الخادم**، و**التحقق من وجود تحديثات**، و**إنهاء**.

## سياسة أمان المحتوى

تُعيّن عبر `session.defaultSession.webRequest.onHeadersReceived`. ومن أبرز التوجيهات:

- `frame-ancestors 'none'`، و`object-src 'none'`، و`child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- يضيف وضع التطوير `'unsafe-eval'` إلى `script-src` فقط

## التحديث التلقائي

يستخدم `electron-updater` مع موفّر GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`، و`autoInstallOnAppQuit = true`
- تُمرّر الأحداث إلى عملية العرض عبر IPC باسم `update-status`:
  `checking`، و`available`، و`not-available`، و`downloading` (مع `percent`)، و`downloaded`، و`error`
- تقتل `installUpdate()` الخادم ثم تستدعي `autoUpdater.quitAndInstall()`
- يُتخطى ذلك في وضع التطوير (`!app.isPackaged`)

## مسار البناء

1. `npm run build` → إصدار Next.js مستقل في `.next/standalone`.
2. `prepare-electron-standalone.mjs` → يعيد تجهيز الملفات في `.next/electron-standalone` ويعيد كتابة المسارات المطلقة داخل `server.js` و`required-server-files.json` بحيث يمكن نقل الحزمة.
3. يقوم `electron-builder` بتحزيم `main.js` و`preload.js` و`node_modules` و`extraResources: { ../.next/electron-standalone → app }`.

### أهداف البناء

| نظام التشغيل | الأهداف                                      |
| ------------ | -------------------------------------------- |
| Windows      | مُثبّت NSIS + إصدار محمول (x64)              |
| macOS        | DMG (Intel + arm64، بالسحب إلى Applications) |
| Linux        | AppImage + DEB (x64 + arm64)                 |

إعدادات NSIS:‏ `oneClick: false`، وتتيح للمستخدم اختيار دليل التثبيت، كما تنشئ اختصارات على سطح المكتب وفي قائمة «ابدأ».

## اختبار التحقق السريع من الإصدار المحزّم

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- يكتشف تلقائيًا الملف التنفيذي المحزّم في `electron/dist-electron/` للمنصة الحالية.
- يشغّله باستخدام أدلة `HOME`/`APPDATA`/`XDG_*` معزولة كي لا يلمس بيانات المطوّر.
- يستعلم دوريًا عن `http://127.0.0.1:20128/login` للحصول على HTTP 200 خلال 45 ثانية.
- يراقب stderr/stdout بحثًا عن الأنماط القاتلة (`Cannot find module` و`MODULE_NOT_FOUND` و`ERR_DLOPEN_FAILED` و`Failed to start server` وغيرها).
- ينتظر ثانيتين من التشغيل المستقر بعد الجاهزية، ثم يرسل SIGTERM وينتظر حتى يصبح المنفذ متاحًا.
- في CI، يمرّر تلقائيًا `--no-sandbox --disable-gpu` (وكذلك `--disable-dev-shm-usage` على Linux).

متغيرات البيئة البديلة: `ELECTRON_SMOKE_APP_EXECUTABLE` و`ELECTRON_SMOKE_URL` و`ELECTRON_SMOKE_TIMEOUT_MS` و`ELECTRON_SMOKE_SETTLE_MS` و`ELECTRON_SMOKE_DATA_DIR` و`ELECTRON_SMOKE_KEEP_DATA` و`ELECTRON_SMOKE_STREAM_LOGS`.

## توقيع الشيفرة

لا يربط `electron/package.json` بيانات اعتماد التوقيع مباشرةً. مرّرها إلى `electron-builder` عبر متغيرات البيئة:

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

توقيع AppImage اختياري — عيّن `LINUX_GPG_KEY` إذا أردت التوقيع.

## التوزيع

تُوضَع الملفات الناتجة في `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe` و`OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg` و`OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage` و`omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

تُنشر الإصدارات على GitHub Releases‏ (`diegosouzapw/OmniRoute`)، وهو أيضًا المكان الذي يتحقق فيه `electron-updater` من وجود إصدارات جديدة.

## استكشاف الأخطاء وإصلاحها

| العَرَض                                                                 | الحل                                                                                                                                                         |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ظهور `Cannot find module 'better-sqlite3'` بعد ترقية رئيسية لـ Electron | يوفّر better-sqlite3 v13 ملفات Node-API مبنية مسبقًا — أعد تشغيل `npm install` في الجذر ثم `prepare:bundle` (إذ يتحقق من الملف المبني مسبقًا للمنصة الحالية) |
| ظهور `ERR_DLOPEN_FAILED` لوحدة أصلية                                    | أعد تشغيل `prepare:bundle` — إذ يفشل مبكرًا عندما يكون ملف Node-API المبني مسبقًا للمنصة الحالية مفقودًا                                                     |
| ظهور نافذة فارغة على Linux                                              | تأكد من أن خادم Next.js قد ارتبط فعليًا بـ PORT (تحقق من سجلات `[Server]`)                                                                                   |
| توقف توثيق macOS                                                        | تأكد من تصدير متغيرات `APPLE_*`، لا من وجودها في `.env` فقط                                                                                                  |
| تحذير Windows SmartScreen                                               | وقّع باستخدام شهادة EV، أو يمكن للمستخدمين النقر بزر الفأرة الأيمن → «Run anyway»                                                                            |
| فشل اختبار التحقق السريع بسبب استخدام المنفذ                            | أوقف أي خادم تطوير محلي يعمل على 20128 قبل تشغيل `electron:smoke:packaged`                                                                                   |

## انظر أيضًا

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- المصدر: `electron/main.js`، `electron/preload.js`، `electron/package.json`
- الأدوات المساعدة: `scripts/build/prepare-electron-standalone.mjs`، `scripts/dev/smoke-electron-packaged.mjs`
