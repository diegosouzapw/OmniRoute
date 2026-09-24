# Contributing to OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## ڈیولپمنٹ سیٹ اپ

### پیشگی ضروریات

- **Node.js** `>=22.22.3 <23`، یا `>=24.0.0 <27` (تجویز کردہ: 24 LTS)
- **npm** 10+

> **npm v11+ صارفین (Node 24+):** `npm install` کے بعد تصدیق کریں کہ مقامی ماڈیولز انسٹال ہو گئے ہیں:
> `node -e "require('better-sqlite3')"`. اگر یہ `MODULE_NOT_FOUND` کے ساتھ ناکام ہو جائے،
> تو `npm approve-scripts better-sqlite3 && npm install` چلائیں۔ ملاحظہ کریں
> [مسائل کا حل](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)۔

- **Git**

### کلون اور انسٹال کریں

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### ماحولیاتی متغیرات

```bash
# ٹیمپلیٹ سے اپنی .env فائل بنائیں
cp .env.example .env

# مطلوبہ خفیہ اقدار تیار کریں
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ڈیولپمنٹ کے لیے اہم متغیرات:

| متغیر                  | ڈیولپمنٹ کی طے شدہ قدر   | تفصیل                   |
| ---------------------- | ------------------------ | ----------------------- |
| `PORT`                 | `20128`                  | سرور پورٹ               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | فرنٹ اینڈ کا بنیادی URL |
| `JWT_SECRET`           | (اوپر تیار کریں)         | JWT دستخطی راز          |
| `INITIAL_PASSWORD`     | `CHANGEME`               | پہلے لاگ اِن کا پاس ورڈ |
| `APP_LOG_LEVEL`        | `info`                   | لاگ کی تفصیل کی سطح     |

### ڈیش بورڈ کی ترتیبات

ڈیش بورڈ ان خصوصیات کے لیے UI ٹوگلز فراہم کرتا ہے جنہیں ماحولیاتی متغیرات کے ذریعے بھی ترتیب دیا جا سکتا ہے:

| ترتیب کا مقام            | ٹوگل             | تفصیل                            |
| ------------------------ | ---------------- | -------------------------------- |
| ترتیبات → اعلیٰ اختیارات | ڈیبگ موڈ         | ڈیبگ درخواست لاگز فعال کریں (UI) |
| ترتیبات → عمومی          | سائڈبار کی مرئیت | سائڈبار کے حصے دکھائیں/چھپائیں   |

یہ ترتیبات ڈیٹابیس میں محفوظ ہوتی ہیں اور دوبارہ شروع ہونے کے بعد بھی برقرار رہتی ہیں، اور مقرر ہونے کی صورت میں env var کی طے شدہ اقدار کو اوور رائیڈ کرتی ہیں۔

### مقامی طور پر چلانا

```bash
# ڈیولپمنٹ موڈ (ہاٹ ری لوڈ)
npm run dev

# پروڈکشن بلڈ
npm run build    # next build → .build/next/ پھر assembleStandalone → dist/
npm run start

# کنٹریبیوٹر تبدیلیوں کے لیے تیز رفتار صرف بیک اینڈ/API کمپائلیشن
npm run build:contributor

# ریلیز بلڈ (صاف دوبارہ بلڈ + HEAD سینٹینل — ڈیپلائے کے لیے ضروری)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA لکھتا ہے

# عام پورٹ کنفیگریشن
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

کنٹریبیوٹر بلڈ صرف کمپائلیشن کی توثیق انجام دیتا ہے: یہ اسٹینڈ الون
ڈسٹری بیوشن کو اسمبل یا اختیاری مقامی پیکیجنگ اثاثوں کو بلڈ نہیں کرتا۔ جب
آپ کو قابلِ ترسیل بنڈل کی توثیق کرنی ہو تو باقاعدہ پروڈکشن بلڈ استعمال کریں۔

### بلڈ آؤٹ پٹ کی ساخت

| ڈائریکٹری | مندرجات                                                                    | ٹریک شدہ |
| --------- | -------------------------------------------------------------------------- | -------- |
| `src/`    | ایپلیکیشن سورس (TypeScript / TSX)                                          | ہاں      |
| `.build/` | درمیانی فائلیں — `next build` آؤٹ پٹ (gitignored، `distDir = .build/next`) | نہیں     |
| `dist/`   | قابلِ ترسیل بنڈل — `assembleStandalone` کے ذریعے اسمبل کردہ (gitignored)   | نہیں     |

بلڈ پائپ لائن ایک ہی پاس پر مشتمل ہے:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js آؤٹ پٹ)
  └─ assembleStandalone()                 (اسٹینڈ الون + static + public + مقامی اثاثے کاپی کرتا ہے)
       └─ آؤٹ پٹ: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` پہلے دونوں ڈائریکٹریز بھی صاف کرتا ہے اور ڈیپلائے کی سالمیت کے سینٹینل کے طور پر
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) لکھتا ہے۔

`npm run build:contributor` صرف بیک اینڈ والا بلڈ پروفائل استعمال کرتا ہے۔ یہ بلڈ کے دوران عارضی طور پر
ڈیش بورڈ UI فائلوں کے اسٹب بناتا ہے، API روٹ ہینڈلرز برقرار رکھتا ہے، اور بلڈ کے بعد اصل فائلیں
بحال کر دیتا ہے۔ ڈیش بورڈ UI کو متاثر کرنے والی تبدیلیوں یا مکمل ریلیز کی توثیق کے لیے `npm run build`
استعمال کریں؛ کنٹریبیوٹر پروفائل ریلیز بلڈ کا متبادل نہیں ہے۔

> **VPS ڈیپلائے نوٹ:** ریموٹ امیج ڈائریکٹری `/usr/lib/node_modules/omniroute/app/`
> میں کوئی تبدیلی نہیں ہوئی۔ ڈیپلائے اسکلز `dist/` کے مندرجات کو rsync کے ذریعے اس میں منتقل کرتی ہیں۔
> صرف ریپوزٹری کے اندر بلڈ آؤٹ پٹ کا پاتھ تبدیل ہوا (`app/` → `dist/`)۔

طے شدہ URLs:

- **ڈیش بورڈ**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git ورک فلو

> ⚠️ **کبھی بھی براہِ راست `main` میں commit نہ کریں۔** ہمیشہ feature branches استعمال کریں۔
>
> **PR کی بنیاد:** فعال `release/vX.Y.Z` برانچ کو ہدف بنائیں (`main` کو نہیں)۔ ہر ریلیز کے لیے علیحدہ برانچ + شپ کرتے وقت tag کے ماڈل کے لیے
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) دیکھیں۔

```bash
# فعال ریلیز کے تازہ ترین سرے سے برانچ بنائیں (مثال: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... تبدیلیاں کریں ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 کے ساتھ Pull Request کھولیں
```

### برانچ کا نام رکھنا

| سابقہ       | مقصد                    |
| ----------- | ----------------------- |
| `feat/`     | نئی خصوصیات             |
| `fix/`      | بگ کی اصلاحات           |
| `refactor/` | کوڈ کی تنظیمِ نو        |
| `docs/`     | دستاویزات میں تبدیلیاں  |
| `test/`     | ٹیسٹس میں اضافے/اصلاحات |
| `chore/`    | ٹولنگ، CI، dependencies |

### Commit پیغامات

[Conventional Commits](https://www.conventionalcommits.org/) کی پیروی کریں:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

دائرۂ کار (v3.8): `db`، `sse`، `oauth`، `dashboard`، `api`، `cli`، `docker`، `ci`، `mcp`، `a2a`، `memory`، `skills`، `cloud-agent`، `guardrails`، `compression`، `auto-combo`، `resilience`، `providers`، `executors`، `translator`، `domain`، `authz`۔

---

## ٹیسٹس چلانا

```bash
# تمام ٹیسٹس (یونٹ + vitest + ایکوسسٹم + e2e)
npm run test:all

# ایک ٹیسٹ فائل (Node.js کا مقامی ٹیسٹ رنر — زیادہ تر ٹیسٹس یہی استعمال کرتے ہیں)
node --import tsx/esm --test tests/unit/your-file.test.ts

# صرف وہ یونٹ ٹیسٹس جو آپ کی تبدیلی سے متاثر ہوئے ہیں (CI گیٹ جیسا ہی TIA سلیکٹر، #8084)
npm run test:scoped            # آخری commit (یا working tree) میں ہونے والی تبدیلیاں
npm run test:scoped:staged     # صرف staged تبدیلیاں — pre-commit رن کے ساتھ بخوبی کام کرتا ہے
npm run test:scoped:full       # پہلے import-graph میپ دوبارہ بنائیں (فائلیں شامل یا منتقل کرنے کے بعد)
# Exit 1 + "مکمل سوٹ چلائیں" کا مطلب ہے کہ کوئی مرکزی فائل (tsconfig، package.json، …) یا کوئی
# غیر نقشہ شدہ سورس تبدیل ہوا ہے — سلیکٹر محفوظ انداز میں ناکام ہوتا ہے، یہ کبھی خاموشی سے نظر انداز نہیں کرتا۔

# Vitest (MCP سرور، autoCombo، کیش)
npm run test:vitest

# E2E ٹیسٹس (Playwright درکار ہے)
npm run test:e2e

# پروٹوکول کلائنٹس E2E (MCP ٹرانسپورٹس، A2A)
npm run test:protocols:e2e

# ایکوسسٹم مطابقت کے ٹیسٹس
npm run test:ecosystem

# کوریج گیٹ: statements/lines/functions/branches کے لیے 60%
npm run test:coverage
npm run coverage:report

# Lint + فارمیٹ کی جانچ
npm run lint
npm run check

# گیٹ شدہ حقیقی upstream combo اسموک ٹیسٹ (VPS رسائی + حقیقی provider کریڈٹس درکار ہیں)
# حقیقی providers کو استعمال کرتا ہے — معمولی لاگت آتی ہے۔ CI میں کبھی نہیں چلتا۔ گیٹ کے بغیر صاف طور پر نظر انداز ہو جاتا ہے۔
# درکار ہے: ssh root@192.168.0.15 رسائی (VPS سے read-only DB snapshot حاصل کرتا ہے)۔
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS لائیو اسموک — سادہ Node ESM اسکرپٹس، براہِ راست لائیو .15 سرور کو استعمال کرتے ہیں۔
# درکار ہے: ssh root@192.168.0.15 رسائی (combos کو SSH sqlite کے ذریعے بنایا/ختم کیا جاتا ہے)۔
# حقیقی providers کو استعمال کرتا ہے (معمولی لاگت)۔ صرف __live_test__* combos بناتا/حذف کرتا ہے۔ CI میں کبھی نہیں چلتا۔
# .15 پر REQUIRE_API_KEY=false ہے، اس لیے API key درکار نہیں، لیکن سیٹ ہونے پر COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY کا احترام کرتا ہے۔
npm run test:combo:live:vps              # 7 HTTP منظرنامے (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # ایک حقیقی cross-provider failover منظرنامہ شامل کرتا ہے (کل 8)
```

کوریج سے متعلق نوٹس:

- `npm run test:coverage` مرکزی یونٹ ٹیسٹ سوٹ کی سورس کوریج ماپتا ہے، `tests/**` کو خارج کرتا ہے، اور `open-sse/**` کو شامل کرتا ہے
- Pull requests میں statements/lines/functions/branches کے لیے کوریج گیٹ **60%+** برقرار رہنا چاہیے
- اگر کوئی PR `src/`، `open-sse/`، `electron/`، یا `bin/` میں production code تبدیل کرتا ہے، تو اسی PR میں خودکار ٹیسٹس شامل یا اپ ڈیٹ کرنا ضروری ہے
- `npm run coverage:report` تازہ ترین کوریج رن کی تفصیلی، فائل بہ فائل رپورٹ دکھاتا ہے
- `npm run test:coverage:legacy` تاریخی موازنے کے لیے پرانا میٹرک محفوظ رکھتا ہے
- مرحلہ وار کوریج بہتری کے روڈمیپ کے لیے `docs/ops/COVERAGE_PLAN.md` دیکھیں

### Pull Request کے تقاضے

PR کھولنے سے پہلے، اپنی تبدیلی کے لیے مرکوز عمل چلانے کی خاطر
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) استعمال کریں۔ مکمل یونٹ سوٹ (4 CI shards)، Vitest، **60%+** کوریج گیٹ، اور
production build کی ذمہ داری CI کی ہے — انہیں مقامی طور پر چلانے سے ایسی کوئی اضافی مفید معلومات حاصل نہیں ہوتیں جو PR
کی جانچ پہلے ہی فراہم نہ کرے، اور چھوٹی مشینوں پر یہ host کو مکمل طور پر مصروف کر سکتا ہے (#8084):

- اپنی تبدیلی کا احاطہ کرنے والی ٹیسٹ فائلیں چلائیں: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` چلائیں
- جب بھی production code تبدیل ہو، اسی PR میں خودکار ٹیسٹس شامل یا اپ ڈیٹ کریں
- production code تبدیل ہونے پر PR کی تفصیل میں تبدیل یا شامل کی گئی ٹیسٹ فائلیں درج کریں
- جب CI میں project secrets ترتیب دیے گئے ہوں تو PR پر SonarQube نتیجہ چیک کریں

موجودہ ٹیسٹ کی صورتِ حال: **122 یونٹ ٹیسٹ فائلیں** جو درج ذیل کا احاطہ کرتی ہیں:

- Provider translators اور فارمیٹ کی تبدیلی
- Rate limiting، circuit breaker، اور resilience
- Semantic cache، idempotency، اور progress tracking
- Database operations اور schema (21 DB ماڈیولز)
- OAuth flows اور authentication
- API endpoint validation (Zod v4)
- MCP server tools اور scope enforcement
- Memory اور Skills سسٹمز

---

## کوڈ کا انداز

- **ESLint** — commit کرنے سے پہلے `npm run lint` چلائیں
- **Prettier** — commit کے وقت `lint-staged` کے ذریعے خودکار طور پر فارمیٹ کیا جاتا ہے (2 spaces، semicolons، double quotes، 100 حروف کی چوڑائی، es5 trailing commas)
- **TypeScript** — تمام `src/` کوڈ `.ts`/`.tsx` استعمال کرتا ہے؛ `open-sse/` میں `.ts`/`.js` استعمال ہوتے ہیں؛ TSDoc (`@param`، `@returns`، `@throws`) کے ساتھ دستاویز کریں
- **`eval()` ممنوع ہے** — ESLint، `no-eval`، `no-implied-eval`، `no-new-func` نافذ کرتا ہے
- **Zod validation** — تمام API input validation کے لیے Zod v4 schemas استعمال کریں
- **نام رکھنے کا طریقہ**: فائلیں = camelCase/kebab-case، components = PascalCase، constants = UPPER_SNAKE

### خرابیوں کو سنبھالنا / خالی catch blocks

کبھی بھی کسی `catch` کو بغیر وضاحت کے نہ چھوڑیں۔ اسے درج ذیل دو اقسام میں سے کسی ایک میں
درجہ بند کریں (یہ سخت اصول "SSE streams میں خرابیوں کو کبھی خاموشی سے نظر انداز نہ کریں"
کو عملی شکل دیتا ہے):

- **دانستہ (ہماری اپنی best-effort cleanup/telemetry)** — یہاں ناکامی متوقع اور بے ضرر
  ہے؛ وجہ بتانے کے لیے ایک سطری comment شامل کریں، logging نہ کریں (ہر request پر logging سے پیدا
  ہونے والے شور سے یہ اصول بچاتا ہے)۔

  ```ts
  } catch {} // کلائنٹ کے منقطع ہونے کے بعد پہلے سے بند controller کو بند کرنا متوقع ہے
  ```

- **لاگ ہونا چاہیے (بیرونی/caller کی فراہم کردہ code، یا نظر انداز کرنے سے control flow تبدیل ہوتا ہو)** — `catch`
  برقرار رکھیں (اسے کبھی stream میں خلل نہ ڈالنے دیں)، لیکن سیاق و سباق کے ساتھ `console.debug`/`warn` جاری کریں تاکہ
  ناکامی کا پتا چل سکے۔

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback میں خرابی:", e);
  }
  ```

عملی مثالوں کے لیے `open-sse/utils/stream.ts` اور `open-sse/utils/streamHandler.ts` دیکھیں۔

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

## نیا پرووائیڈر شامل کرنا

### مرحلہ 1: پرووائیڈر کانسٹینٹس رجسٹر کریں

`src/shared/constants/providers.ts` میں شامل کریں — ماڈیول لوڈ ہوتے وقت Zod کے ذریعے توثیق کی جاتی ہے۔

### مرحلہ 2: ایگزیکیوٹر شامل کریں (اگر حسبِ ضرورت منطق درکار ہو)

بنیادی ایگزیکیوٹر کو وسعت دیتے ہوئے `open-sse/executors/your-provider.ts` میں ایگزیکیوٹر بنائیں۔

### مرحلہ 3: ٹرانسلیٹر شامل کریں (اگر فارمیٹ OpenAI کا نہ ہو)

`open-sse/translator/` میں درخواست/جواب کے ٹرانسلیٹر بنائیں۔

### مرحلہ 4: OAuth کنفیگریشن شامل کریں (اگر OAuth پر مبنی ہو)

OAuth اسناد `src/lib/oauth/constants/oauth.ts` میں اور سروس `src/lib/oauth/services/` میں شامل کریں۔

اگر اپ اسٹریم پرووائیڈر اپنے عوامی CLI / براؤزر بنڈل میں عوامی OAuth `client_id`/سیکرٹ یا Firebase Web API کلید تقسیم کرتا ہے، تو اسے اسٹرنگ لٹرل کے طور پر **ہرگز** شامل نہ کریں۔ `open-sse/utils/publicCreds.ts` سے `resolvePublicCred()` استعمال کریں اور `EMBEDDED_DEFAULTS` میں ماسک شدہ بائٹ اندراج شامل کریں۔ مکمل لازمی طریقۂ کار کی دستاویز [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) میں موجود ہے۔

ہینڈلرز/ایگزیکیوٹرز کے اندر، کلائنٹ تک پہنچنے والے خرابی کے پیغامات کو `open-sse/utils/error.ts` سے `buildErrorBody()` / `sanitizeErrorMessage()` کے ذریعے گزارنا لازمی ہے — خام `err.stack` یا `err.message` کو کبھی بھی Response باڈی میں شامل نہ کریں۔ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) دیکھیں۔

### مرحلہ 5: ماڈلز رجسٹر کریں

`open-sse/config/providerRegistry.ts` میں ماڈل کی تعریفیں شامل کریں۔

### مرحلہ 6: ٹیسٹس شامل کریں

`tests/unit/` میں یونٹ ٹیسٹس لکھیں جو کم از کم درج ذیل کا احاطہ کریں:

- پرووائیڈر کی رجسٹریشن
- درخواست/جواب کی ترجمانی
- خرابیوں سے نمٹنا

---

## پُل ریکویسٹ چیک لسٹ

- [ ] ٹیسٹ کامیاب ہوں (`npm test`)
- [ ] لنٹنگ کامیاب ہو (`npm run lint`)
- [ ] بلڈ کامیاب ہو (`npm run build`)
- [ ] نئے پبلک فنکشنز اور انٹرفیسز کے لیے TypeScript ٹائپس شامل کی گئی ہوں
- [ ] کوئی ہارڈ کوڈ کردہ راز یا فال بیک ویلیوز نہ ہوں
- [ ] پبلک اپ اسٹریم اسناد `resolvePublicCred()` کے ذریعے شامل کی گئی ہوں ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) دیکھیں)، کبھی بھی لٹریلز کی صورت میں نہیں
- [ ] خرابی کے جوابات `buildErrorBody()` / `sanitizeErrorMessage()` کے ذریعے بھیجے جائیں — جوابی باڈیز میں کوئی خام اسٹیک ٹریس نہ ہو ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) دیکھیں)
- [ ] شیل کمانڈز (`exec` / `spawn`) رن ٹائم ویلیوز کو اسٹرنگ انٹرپولیشن کے بجائے `env` کے ذریعے پاس کریں
- [ ] تمام اِن پٹس کی Zod اسکیماؤں کے ذریعے توثیق کی گئی ہو
- [ ] صارف کو متاثر کرنے والی تبدیلیوں کے لیے `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` کے تحت چینج لاگ **فریگمنٹ** شامل کیا گیا ہو ([`changelog.d/README.md`](./changelog.d/README.md) دیکھیں) — `CHANGELOG.md` میں براہِ راست ترمیم **نہ** کریں؛ فریگمنٹس کو ریلیز کے وقت یکجا کیا جاتا ہے اور ان میں مختلف PRs کے درمیان کبھی تصادم نہیں ہوتا
- [ ] دستاویزات اپ ڈیٹ کی گئی ہوں (اگر قابلِ اطلاق ہو)
- [ ] کوئی نیا CodeQL / Secret-Scanning الرٹ نہ کھولا گیا ہو، یا ہر الرٹ کو متعلقہ `docs/security/` دستاویز کا حوالہ دینے والی تکنیکی توجیہ کے ساتھ مسترد کیا گیا ہو
- [ ] چائلڈ پراسیسز شروع کرنے والے روٹس (`/api/mcp/`، `/api/cli-tools/runtime/`) کو `src/server/authz/routeGuard.ts` میں `isLocalOnlyPath()` کے طور پر درجہ بند کیا گیا ہو — [سخت اصول #15](docs/security/ROUTE_GUARD_TIERS.md) دیکھیں
- [ ] کمٹ پیغامات میں `Co-Authored-By` ٹریلرز نہ ہوں — کمٹس صرف ریپوزٹری مالک کی Git شناخت کے تحت ظاہر ہونے چاہییں (سخت اصول #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## مدد حاصل کرنا

- **آرکیٹیکچر**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) دیکھیں
- **API حوالہ**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) دیکھیں
- **سیکیورٹی دستاویزات**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)، [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)، [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)، [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **آپریشنز کی دستاویزات**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **مسائل**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: آرکیٹیکچرل فیصلوں کے ریکارڈز کے لیے `docs/adr/` دیکھیں
