# Contributing to OmniRoute (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## راهاندازی محیط توسعه

### پیشنیازها

- **Node.js** `>=22.22.3 <23`، یا `>=24.0.0 <27` (پیشنهادشده: 24 LTS)
- **npm** 10+

> **کاربران npm v11+ ‏(Node 24+):** پس از `npm install`، بررسی کنید که ماژولهای بومی نصب شده باشند:
> `node -e "require('better-sqlite3')"`. اگر با خطای `MODULE_NOT_FOUND` مواجه شد،
> دستور `npm approve-scripts better-sqlite3 && npm install` را اجرا کنید. به
> [عیبیابی](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) مراجعه کنید.

- **Git**

### کلون و نصب

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### متغیرهای محیطی

```bash
# فایل .env خود را از روی قالب ایجاد کنید
cp .env.example .env

# مقادیر محرمانه موردنیاز را تولید کنید
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

متغیرهای کلیدی برای توسعه:

| متغیر                  | مقدار پیشفرض توسعه       | توضیحات                 |
| ---------------------- | ------------------------ | ----------------------- |
| `PORT`                 | `20128`                  | پورت سرور               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | آدرس پایه برای فرانتاند |
| `JWT_SECRET`           | (در بالا تولید کنید)     | مقدار محرمانه امضای JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`               | گذرواژه نخستین ورود     |
| `APP_LOG_LEVEL`        | `info`                   | سطح جزئیات گزارشها      |

### تنظیمات داشبورد

داشبورد کلیدهای رابط کاربری را برای قابلیتهایی ارائه میدهد که از طریق متغیرهای محیطی نیز قابل پیکربندی هستند:

| محل تنظیمات       | کلید             | توضیحات                                            |
| ----------------- | ---------------- | -------------------------------------------------- |
| تنظیمات ← پیشرفته | حالت اشکالزدایی  | فعالسازی گزارش درخواستهای اشکالزدایی (رابط کاربری) |
| تنظیمات ← عمومی   | نمایش نوار کناری | نمایش/پنهانسازی بخشهای نوار کناری                  |

این تنظیمات در پایگاه داده ذخیره میشوند و پس از راهاندازیهای مجدد باقی میمانند؛ در صورت تنظیم شدن، مقادیر پیشفرض متغیرهای محیطی را بازنویسی میکنند.

### اجرای محلی

```bash
# حالت توسعه (بارگذاری مجدد خودکار)
npm run dev

# ساخت نسخه تولید
npm run build    # next build ← .build/next/، سپس assembleStandalone ← dist/
npm run start

# کامپایل سریعِ صرفاً بکاند/API برای تغییرات مشارکتکنندگان
npm run build:contributor

# ساخت انتشار (ساخت مجدد پاک + نشانگر HEAD — الزامی برای استقرار)
npm run build:release   # rm -rf .build dist، سپس ساخت + نوشتن dist/BUILD_SHA

# پیکربندی رایج پورت
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

ساخت مشارکتکننده فقط اعتبارسنجی کامپایل را انجام میدهد: این فرایند توزیع مستقل را مونتاژ نمیکند
و داراییهای اختیاری بستهبندی بومی را نیز نمیسازد. هنگامی که نیاز دارید بسته قابل انتشار را
اعتبارسنجی کنید، از ساخت معمول نسخه تولید استفاده کنید.

### ساختار خروجی ساخت

| دایرکتوری | محتوا                                                                                 | ردیابیشده |
| --------- | ------------------------------------------------------------------------------------- | --------- |
| `src/`    | کد منبع برنامه (TypeScript / TSX)                                                     | بله       |
| `.build/` | فایلهای میانی — خروجی `next build` (نادیدهگرفتهشده توسط git، `distDir = .build/next`) | خیر       |
| `dist/`   | بسته قابل انتشار — مونتاژشده توسط `assembleStandalone` (نادیدهگرفتهشده توسط git)      | خیر       |

خط لوله ساخت در یک مرحله اجرا میشود:

```
npm run build
  └─ next build → .build/next/standalone  (خروجی Next.js)
  └─ assembleStandalone()                 (کپی فایلهای مستقل + ایستا + عمومی + داراییهای بومی)
       └─ خروجی: dist/                    (server.js، .next/static/، public/، node_modules/)
```

`npm run build:release` علاوه بر این، ابتدا هر دو دایرکتوری را پاک میکند و
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) را بهعنوان نشانگر یکپارچگی استقرار مینویسد.

`npm run build:contributor` از پروفایل ساخت صرفاً بکاند استفاده میکند. هنگام ساخت، فایلهای
رابط کاربری داشبورد را موقتاً با فایلهای جایگزین عوض میکند، کنترلکنندههای مسیر API را نگه میدارد و پس از ساخت، فایلهای اصلی را
بازیابی میکند. برای تغییراتی که بر رابط کاربری داشبورد اثر میگذارند یا برای اعتبارسنجی کامل
انتشار، از `npm run build` استفاده کنید؛ پروفایل مشارکتکننده جایگزین ساخت انتشار نیست.

> **نکته استقرار VPS:** دایرکتوری ایمیج راهدور `/usr/lib/node_modules/omniroute/app/`
> بدون تغییر باقی مانده است. مهارتهای استقرار با استفاده از rsync محتویات `dist/` را در آن کپی میکنند.
> فقط مسیر خروجی ساخت درون مخزن تغییر کرده است (`app/` ← `dist/`).

آدرسهای پیشفرض:

- **داشبورد**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## گردشکار Git

> ⚠️ **هرگز مستقیماً روی `main` کامیت نکنید.** همیشه از شاخههای ویژگی استفاده کنید.
>
> **شاخهٔ پایهٔ PR:** شاخهٔ فعال `release/vX.Y.Z` را هدف قرار دهید (نه `main`). برای آشنایی با
> مدل یک انتشار برای هر شاخه + برچسبگذاری هنگام عرضه، به
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) مراجعه کنید.

```bash
# از انتهای شاخهٔ انتشار فعال، شاخه بسازید (مثال: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... تغییرات را اعمال کنید ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# یک Pull Request با base = release/v3.8.49 باز کنید
```

### نامگذاری شاخهها

| پیشوند      | کاربرد                  |
| ----------- | ----------------------- |
| `feat/`     | ویژگیهای جدید           |
| `fix/`      | رفع باگها               |
| `refactor/` | بازسازی ساختار کد       |
| `docs/`     | تغییرات مستندات         |
| `test/`     | افزودن/اصلاح تستها      |
| `chore/`    | ابزارها، CI و وابستگیها |

### پیامهای کامیت

از [Conventional Commits](https://www.conventionalcommits.org/) پیروی کنید:

```
feat: افزودن قطعکنندهٔ مدار برای فراخوانیهای ارائهدهنده
fix: رفع حالت مرزی اعتبارسنجی کلید محرمانهٔ JWT
docs: بهروزرسانی SECURITY.md با محافظت از PII
test: افزودن تستهای واحد مشاهدهپذیری
refactor(db): یکپارچهسازی جدولهای محدودیت نرخ
```

دامنهها (v3.8): `db`، `sse`، `oauth`، `dashboard`، `api`، `cli`، `docker`، `ci`، `mcp`، `a2a`، `memory`، `skills`، `cloud-agent`، `guardrails`، `compression`، `auto-combo`، `resilience`، `providers`، `executors`، `translator`، `domain`، `authz`.

---

## اجرای آزمونها

```bash
# همهٔ آزمونها (واحد + vitest + اکوسیستم + e2e)
npm run test:all

# یک فایل آزمون (اجراکنندهٔ بومی آزمون Node.js — بیشتر آزمونها از این استفاده میکنند)
node --import tsx/esm --test tests/unit/your-file.test.ts

# فقط آزمونهای واحدی که تحت تأثیر تغییر شما قرار گرفتهاند (همان انتخابگر TIA دروازهٔ CI، #8084)
npm run test:scoped            # تغییرات در آخرین commit (یا درخت کاری)
npm run test:scoped:staged     # فقط تغییرات staged — برای اجرا پیش از commit مناسب است
npm run test:scoped:full       # ابتدا نگاشت گراف import را بازسازی میکند (پس از افزودن/انتقال فایلها)
# خروج با کد 1 بههمراه «مجموعهٔ کامل را اجرا کنید» یعنی یک فایل مرکزی (tsconfig، package.json، …) یا یک
# منبع نگاشتنشده تغییر کرده است — انتخابگر بهشکل ایمن شکست میخورد و هرگز بیسروصدا چیزی را رد نمیکند.

# Vitest (سرور MCP، autoCombo، حافظهٔ نهان)
npm run test:vitest

# آزمونهای E2E (به Playwright نیاز دارد)
npm run test:e2e

# آزمون E2E کلاینتهای پروتکل (انتقالهای MCP، A2A)
npm run test:protocols:e2e

# آزمونهای سازگاری اکوسیستم
npm run test:ecosystem

# دروازهٔ پوشش: 60٪ دستورها/خطوط/توابع/شاخهها
npm run test:coverage
npm run coverage:report

# بررسی lint و قالببندی
npm run lint
npm run check

# آزمون سریع و کنترلشدهٔ ترکیب واقعی upstream (به دسترسی VPS و اعتبار واقعی ارائهدهنده نیاز دارد)
# با ارائهدهندگان واقعی ارتباط برقرار میکند — کمی هزینه دارد. هرگز در CI اجرا نمیشود. بدون دروازه بهدرستی رد میشود.
# نیازمند: دسترسی ssh root@192.168.0.15 (یک snapshot فقطخواندنی از DB را از VPS بارگذاری میکند).
RUN_COMBO_LIVE=1 npm run test:combo:live

# آزمون سریع زندهٔ VPS در فاز 3 — اسکریپتهای سادهٔ Node ESM که مستقیماً به سرور زندهٔ .15 متصل میشوند.
# نیازمند: دسترسی ssh root@192.168.0.15 (ترکیبها از طریق SSH sqlite ایجاد/حذف میشوند).
# با ارائهدهندگان واقعی ارتباط برقرار میکند (هزینهٔ اندک). فقط ترکیبهای __live_test__* را ایجاد/حذف میکند. هرگز در CI اجرا نمیشود.
# مقدار REQUIRE_API_KEY=false روی .15 است، بنابراین کلید API لازم نیست؛ اما در صورت تنظیم، COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY را رعایت میکند.
npm run test:combo:live:vps              # 7 سناریوی HTTP (اولویت/نوبتگردشی/وزندار/هزینه/ادغام/خودکار + سلامت)
npm run test:combo:live:vps:failover     # یک سناریوی واقعی failover میان ارائهدهندگان اضافه میکند (در مجموع 8 مورد)
```

نکات مربوط به پوشش:

- `npm run test:coverage` پوشش کد منبع را برای مجموعهٔ اصلی آزمونهای واحد اندازهگیری میکند، `tests/**` را کنار میگذارد و `open-sse/**` را شامل میشود
- درخواستهای ادغام باید دروازهٔ پوشش را برای دستورها/خطوط/توابع/شاخهها در سطح **60%+** نگه دارند
- اگر یک PR کد عملیاتی را در `src/`، `open-sse/`، `electron/` یا `bin/` تغییر دهد، باید در همان PR آزمونهای خودکار را اضافه یا بهروزرسانی کند
- `npm run coverage:report` گزارش تفصیلی فایلبهفایل را از آخرین اجرای پوشش نمایش میدهد
- `npm run test:coverage:legacy` معیار قدیمیتر را برای مقایسهٔ تاریخی حفظ میکند
- برای نقشهٔ راه مرحلهای بهبود پوشش، `docs/ops/COVERAGE_PLAN.md` را ببینید

### الزامات درخواست ادغام

پیش از باز کردن یک PR، از
[مسیر طلایی مشارکت](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) استفاده کنید تا چرخهٔ متمرکز مربوط به
تغییرات خود را اجرا کنید. مجموعهٔ کامل آزمونهای واحد (4 بخش CI)، Vitest، دروازهٔ پوشش **60%+** و
ساخت عملیاتی بر عهدهٔ CI هستند — اجرای محلی آنها هیچ اطلاعاتی فراتر از آنچه بررسیهای PR
ارائه میکنند به دست نمیدهد و در سیستمهای ضعیفتر میتواند میزبان را اشباع کند (#8084):

- فایلهای آزمونی را که تغییر شما را پوشش میدهند اجرا کنید: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` را اجرا کنید
- هر زمان کد عملیاتی تغییر میکند، آزمونهای خودکار را در همان PR اضافه یا بهروزرسانی کنید
- هنگامی که کد عملیاتی تغییر کرده است، فایلهای آزمون تغییریافته یا افزودهشده را در توضیحات PR ذکر کنید
- وقتی secretهای پروژه در CI پیکربندی شدهاند، نتیجهٔ SonarQube را در PR بررسی کنید

وضعیت فعلی آزمونها: **122 فایل آزمون واحد** با پوشش موارد زیر:

- مترجمهای ارائهدهندگان و تبدیل قالب
- محدودسازی نرخ، circuit breaker و تابآوری
- حافظهٔ نهان معنایی، idempotency و رهگیری پیشرفت
- عملیات پایگاه داده و schema (21 ماژول DB)
- جریانهای OAuth و احراز هویت
- اعتبارسنجی endpointهای API ‏(Zod v4)
- ابزارهای سرور MCP و اعمال scope
- سیستمهای Memory و Skills

---

## سبک کدنویسی

- **ESLint** — پیش از commit کردن، `npm run lint` را اجرا کنید
- **Prettier** — هنگام commit از طریق `lint-staged` بهطور خودکار قالببندی میشود (۲ فاصله، نقطهویرگول، کوتیشن دوتایی، عرض ۱۰۰ کاراکتر، ویرگول انتهایی es5)
- **TypeScript** — تمام کدهای `src/` از `.ts`/`.tsx` استفاده میکنند؛ `open-sse/` از `.ts`/`.js` استفاده میکند؛ مستندسازی را با TSDoc (`@param`، `@returns`، `@throws`) انجام دهید
- **عدم استفاده از `eval()`** — ESLint قواعد `no-eval`، `no-implied-eval` و `no-new-func` را اعمال میکند
- **اعتبارسنجی Zod** — برای اعتبارسنجی تمام ورودیهای API از schemaهای Zod v4 استفاده کنید
- **نامگذاری**: فایلها = camelCase/kebab-case، کامپوننتها = PascalCase، ثابتها = UPPER_SNAKE

### مدیریت خطا / بلوکهای catch خالی

هرگز یک `catch` را بدون توضیح رها نکنید. آن را در یکی از دو دسته زیر طبقهبندی کنید (این کار، قاعده سختگیرانه «هرگز خطاهای جریانهای SSE را بیسروصدا نادیده نگیرید» را عملیاتی میکند):

- **عمدی (پاکسازی/تلهمتری best-effort خودمان)** — بروز خطا در اینجا مورد انتظار و بیضرر است؛ یک توضیح یکخطی درباره دلیل آن اضافه کنید و چیزی لاگ نکنید (این قرارداد از ایجاد نویز ناشی از لاگکردن هر درخواست جلوگیری میکند).

  ```ts
  } catch {} // بستن controllerای که پس از قطع اتصال کلاینت از قبل بسته شده است، مورد انتظار است
  ```

- **نیازمند لاگ (کد خارجی/ارائهشده توسط فراخواننده، یا حالتی که نادیدهگرفتن خطا جریان کنترل را تغییر میدهد)** — `catch` را حفظ کنید (هرگز اجازه ندهید جریان را مختل کند)، اما یک `console.debug`/`warn` همراه با اطلاعات زمینهای ثبت کنید تا خطا قابل کشف باشد.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

برای مشاهده نمونههای اعمالشده، به `open-sse/utils/stream.ts` و `open-sse/utils/streamHandler.ts` مراجعه کنید.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## افزودن یک ارائهدهنده جدید

### مرحله 1: ثبت ثابتهای ارائهدهنده

آنها را به `src/shared/constants/providers.ts` اضافه کنید — اعتبارسنجی با Zod هنگام بارگذاری ماژول انجام میشود.

### مرحله 2: افزودن اجراکننده (در صورت نیاز به منطق سفارشی)

یک اجراکننده در `open-sse/executors/your-provider.ts` ایجاد کنید که اجراکننده پایه را گسترش دهد.

### مرحله 3: افزودن مترجم (در صورت استفاده از قالبی غیر از OpenAI)

مترجمهای درخواست/پاسخ را در `open-sse/translator/` ایجاد کنید.

### مرحله 4: افزودن پیکربندی OAuth (در صورت مبتنی بودن بر OAuth)

اعتبارنامههای OAuth را در `src/lib/oauth/constants/oauth.ts` و سرویس را در `src/lib/oauth/services/` اضافه کنید.

اگر ارائهدهنده بالادستی یک OAuth `client_id`/secret عمومی یا کلید Firebase Web API را در CLI عمومی / بسته مرورگر خود توزیع میکند، **آن را بهصورت یک رشته ثابت در کد قرار ندهید**. از `resolvePublicCred()` در `open-sse/utils/publicCreds.ts` استفاده کنید و یک ورودی بایتی پوشاندهشده به `EMBEDDED_DEFAULTS` اضافه کنید. گردشکار الزامی کامل در [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) مستند شده است.

درون کنترلکنندهها/اجراکنندهها، پیامهای خطایی که به کلاینت میرسند باید از `buildErrorBody()` / `sanitizeErrorMessage()` در `open-sse/utils/error.ts` عبور کنند — هرگز `err.stack` یا `err.message` خام را در بدنه Response قرار ندهید. به [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) مراجعه کنید.

### مرحله 5: ثبت مدلها

تعریفهای مدل را به `open-sse/config/providerRegistry.ts` اضافه کنید.

### مرحله 6: افزودن آزمونها

آزمونهای واحد را در `tests/unit/` بنویسید که حداقل موارد زیر را پوشش دهند:

- ثبت ارائهدهنده
- ترجمه درخواست/پاسخ
- مدیریت خطا

---

## چکلیست Pull Request

- [ ] تستها با موفقیت اجرا میشوند (`npm test`)
- [ ] بررسی Lint با موفقیت انجام میشود (`npm run lint`)
- [ ] Build با موفقیت انجام میشود (`npm run build`)
- [ ] نوعهای TypeScript برای توابع و رابطهای عمومی جدید اضافه شدهاند
- [ ] هیچ secret یا مقدار fallback بهصورت hardcoded وجود ندارد
- [ ] اطلاعات احراز هویت عمومی upstream از طریق `resolvePublicCred()` تعبیه شدهاند (نگاه کنید به [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)) و هرگز بهصورت مقادیر literal نیستند
- [ ] پاسخهای خطا از طریق `buildErrorBody()` / `sanitizeErrorMessage()` هدایت میشوند — هیچ stack trace خامی در بدنه پاسخها وجود ندارد (نگاه کنید به [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] فرمانهای Shell (`exec` / `spawn`) مقادیر زمان اجرا را از طریق `env` ارسال میکنند، نه از طریق string interpolation
- [ ] همه ورودیها با schemaهای Zod اعتبارسنجی شدهاند
- [ ] برای تغییرات قابل مشاهده توسط کاربر، **fragment** مربوط به Changelog در مسیر `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` اضافه شده است (نگاه کنید به [`changelog.d/README.md`](./changelog.d/README.md)) — فایل `CHANGELOG.md` را مستقیماً ویرایش **نکنید**؛ fragmentها هنگام انتشار تجمیع میشوند و هرگز میان PRها تداخل ایجاد نمیکنند
- [ ] مستندات بهروزرسانی شدهاند (در صورت نیاز)
- [ ] هیچ هشدار جدیدی از CodeQL / Secret-Scanning ایجاد نشده است، یا هر مورد با توجیه فنی و ارجاع به سند مرتبط در `docs/security/` رد شده است
- [ ] مسیرهایی که فرایندهای فرزند ایجاد میکنند (`/api/mcp/`، `/api/cli-tools/runtime/`) در `src/server/authz/routeGuard.ts` بهعنوان `isLocalOnlyPath()` طبقهبندی شدهاند — نگاه کنید به [قانون قطعی شماره ۱۵](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] هیچ trailer از نوع `Co-Authored-By` در پیامهای commit وجود ندارد — commitها باید صرفاً تحت هویت Git مالک repository ثبت شوند (قانون قطعی شماره ۱۶)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## دریافت راهنمایی

- **معماری**: به [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) مراجعه کنید
- **مرجع API**: به [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) مراجعه کنید
- **مستندات امنیتی**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)، [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)، [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)، [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **مستندات عملیات**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **مشکلات**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **رکوردهای تصمیمگیری معماری (ADR)**: برای مشاهدهٔ رکوردهای تصمیمگیری معماری، به `docs/adr/` مراجعه کنید
