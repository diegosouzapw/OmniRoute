# SQLite Runtime Resolution (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute در زمان راهاندازی، درایور SQLite خود را از طریق یک زنجیرهٔ جایگزین ۵ مرحلهای پیدا میکند:

1. **`better-sqlite3` همراه بسته** (از طریق `dependencies` در `package.json`)
   — سریعترین گزینه، دارای باینری بومی، و در صورت وجود ابزارهای ساخت توسط `npm install` نصب میشود.

2. **`better-sqlite3` نصبشده در زمان اجرا** (در `~/.omniroute/runtime/`)
   — در اولین اجرا بهصورت تنبل نصب میشود **یا** توسط `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   پیش از بارگذاری، بایتهای جادویی فایل بومی `.node` را (ELF / Mach-O / PE) اعتبارسنجی میکند
   تا از بارگذاری باینریهای خراب یا متعلق به پلتفرمی دیگر جلوگیری شود.

3. **`node:sqlite`** (کتابخانهٔ استاندارد Node ≥22.5) — به ساخت بومی نیاز ندارد؛ زمانی استفاده میشود که
   هر دو مسیر better-sqlite3 ناموفق باشند. مجموعه قابلیتهای محدودی دارد.

4. **`sql.js`** (WASM) — آخرین گزینهٔ جایگزین. همهجا کار میکند، اما کندتر است
   و دادهها را بهجای همگامسازی فوری، در بازههای زمانی مشخص مینویسد.

## دلیل این پیچیدگی چیست؟

- **Windows EBUSY**: اگر `better_sqlite3.node` نسخهٔ قبلی توسط یک فرایند در حال اجرا
  قفل شده باشد، `npm install -g omniroute@latest` ممکن است ناموفق شود. نصب در زمان اجرا
  در `~/.omniroute/runtime/` حافظهٔ نهان سراسری npm را دور میزند.
- **نبود ابزارهای ساخت**: برخی محیطها (ویندوز سازمانی بدون VS Build
  Tools، ایمیجهای حداقلی Docker) نمیتوانند `better-sqlite3` را کامپایل کنند. نصبکنندهٔ زمان اجرا
  یک باینری ازپیشساختهشده را از رجیستری npm دریافت میکند؛ درایورهای جایگزین
  تضمین میکنند که OmniRoute حتی در صورت ناموفق بودن این فرایند نیز راهاندازی شود.
- **سامانههای ایزوله از شبکه**: اگر رجیستری npm قابل دسترسی نباشد، `node:sqlite`
  یا `sql.js` عملکرد پایه را تضمین میکنند.

## اعتبارسنجی بایت جادویی

پیش از بارگذاری فایل `.node` نصبشده در زمان اجرا، OmniRoute نخستین 8
بایت را میخواند و آنها را با بایتهای جادویی شناختهشدهٔ پلتفرمها تطبیق میدهد:

| پلتفرم                | بایتها (هگز)  | برچسب       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

بایت جادویی نامطابق ← فایل نادیده گرفته میشود و فرایند جایگزینی به مرحلهٔ بعد ادامه مییابد.

## بررسی درایور فعال

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## کنترل دستی

```bash
# صرفنظر کردن از آمادهسازی پس از نصب (برای نصبهای سریع CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# نصب مجدد اجباری better-sqlite3 زمان اجرا
rm -rf ~/.omniroute/runtime
omniroute  # در شروع بعدی دوباره نصب خواهد شد

# بررسی درایور فعال
omniroute config db-info  # (اگر فرمان CLI وجود داشته باشد)
```

## مرجع

پیادهسازی:

- `bin/cli/runtime/magicBytes.mjs` — توابع کمکی اعتبارسنجی بایت جادویی باینری
- `bin/cli/runtime/sqliteRuntime.mjs` — حلکنندهٔ ۵ مرحلهای زمان اجرا + نصبکنندهٔ تنبل
- `bin/cli/runtime/index.mjs` — هماهنگکنندهٔ راهاندازی (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — قلاب پس از نصب npm (آمادهسازی غیرکشنده)
- `src/lib/db/core.ts` — خروجیهای `ensureDbInitialized()` / `getDriverInfo()`

## توپولوژی تکنویسنده (HA پشتیبانی نمیشود)

زنجیرهٔ جایگزین درایور در بالا همچنان در **یک فرایند** اجرا میشود. SQLite
پیشفرض OmniRoute یک **تکنویسنده** است:

- دو رپلیکای OmniRoute را به یک فایل `storage.sqlite` متصل نکنید.
- راهاندازی مجدد کانتینر، استقرار Recreate، خاتمه بهدلیل OOM یا راهاندازی مجدد HEALTHCHECK
  تمام نشستهای SSE در حال اجرا را قطع میکند. در مسیر استاندارد، تخلیهٔ نشست وجود ندارد.
- بررسی زندهبودن هماهنگکننده که یک `/healthz` کند را بهعنوان وضعیت ازکارافتاده در نظر بگیرد، تنها
  رپلیکا را خاتمه خواهد داد. بررسی زندهبودن TCP + بررسی آمادگی HTTP از طریق `/healthz` را ترجیح دهید. به
  [راهنمای Docker — دسترسپذیری](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  و [توصیههای پروب Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations) مراجعه کنید.
