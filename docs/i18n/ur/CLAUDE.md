# CLAUDE.md (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

یہ فائل اس ریپوزٹری میں کوڈ کے ساتھ کام کرتے وقت Claude Code (claude.ai/code) کے لیے رہنمائی فراہم کرتی ہے۔

## فوری آغاز

```bash
npm install                    # انحصارات انسٹال کریں (auto-generates .env from .env.example)
npm run dev                    # ڈویلپمنٹ سرور http://localhost:20128 پر
npm run build                  # پروڈکشن بلڈ (Next.js 16 standalone)
npm run lint                   # ESLint (0 غلطیاں متوقع ہیں؛ انتباہات پہلے سے موجود ہیں)
npm run typecheck:core         # TypeScript چیک (صاف ہونا چاہیے)
npm run typecheck:noimplicit:core  # سخت چیک (کوئی ضمنی کوئی نہیں)
npm run test:coverage          # یونٹ ٹیسٹ + کوریج گیٹ (75/75/75/70 — بیانات/لائنیں/فنکشنز/برانچز)
npm run check                  # lint + ٹیسٹ ملا کر
npm run check:cycles           # دائروی انحصارات کا پتہ لگائیں
```

### ٹیسٹ چلانا

```bash
# واحد ٹیسٹ فائل (Node.js کا مقامی ٹیسٹ رنر — زیادہ تر ٹیسٹ)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP سرور، autoCombo، کیش)
npm run test:vitest

# تمام سوئٹس
npm run test:all
```

مکمل ٹیسٹ میٹرکس کے لیے، `CONTRIBUTING.md` → "Running Tests" دیکھیں۔ گہرے فن تعمیر کے لیے، `AGENTS.md` دیکھیں۔

---

## پروجیکٹ کا ایک نظر میں جائزہ

**OmniRoute** — متحد AI پروکسی/روٹر۔ ایک اینڈپوائنٹ، 160+ LLM فراہم کنندگان، خودکار فیل بیک۔

| پرت           | مقام                    | مقصد                                                                |
| ------------- | ----------------------- | ------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js ایپ روٹر — داخلے کے پوائنٹس                                 |
| Handlers      | `open-sse/handlers/`    | درخواست کی پروسیسنگ (چیٹ، ایمبیڈنگز، وغیرہ)                         |
| Executors     | `open-sse/executors/`   | فراہم کنندہ مخصوص HTTP ڈسپیچ                                        |
| Translators   | `open-sse/translator/`  | فارمیٹ تبدیلی (OpenAI↔Claude↔Gemini)                                |
| Transformer   | `open-sse/transformer/` | جوابات API ↔ چیٹ مکملات                                             |
| Services      | `open-sse/services/`    | کومبو روٹنگ، شرح کی حدود، کیشنگ، وغیرہ                              |
| Database      | `src/lib/db/`           | SQLite ڈومین ماڈیولز (45+ فائلیں، 55 مائگریشنز)                     |
| Domain/Policy | `src/domain/`           | پالیسی انجن، لاگت کے قواعد، فیل بیک منطق                            |
| MCP Server    | `open-sse/mcp-server/`  | 37 ٹولز (30 بنیادی + 3 میموری + 4 مہارتیں)، 3 ٹرانسپورٹس، ~13 دائرے |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 ایجنٹ پروٹوکول                                         |
| Skills        | `src/lib/skills/`       | توسیع پذیر مہارت کا فریم ورک                                        |
| Memory        | `src/lib/memory/`       | مستقل مکالماتی یادداشت                                              |

Monorepo: `src/` (Next.js 16 ایپ)، `open-sse/` (اسٹریمنگ انجن ورک اسپیس)، `electron/` (ڈیسک ٹاپ ایپ)، `tests/`، `bin/` (CLI داخلہ نقطہ)۔

---

## درخواست پائپ لائن

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

API راستے ایک مستقل پیٹرن کی پیروی کرتے ہیں: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`۔ کوئی عالمی Next.js middleware نہیں — مداخلت راستے کے مخصوص ہے۔

**Combo routing** (`open-sse/services/combo.ts`): 14 حکمت عملی (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized, context-relay)۔ ہر ہدف `handleSingleModel()` کو کال کرتا ہے جو `handleChatCore()` کو ہر ہدف کی خرابی کے ہینڈلنگ اور سرکٹ بریکر چیک کے ساتھ لپیٹتا ہے۔ 9-factor Auto-Combo اسکورنگ کے لیے `docs/routing/AUTO-COMBO.md` دیکھیں اور 3 resilience layers کے لیے `docs/architecture/RESILIENCE_GUIDE.md` دیکھیں۔

---

## لچکدار رن ٹائم حالت

OmniRoute کے پاس تین متعلقہ لیکن مختلف عارضی ناکامی کے طریقے ہیں۔ ان کی دائرہ کار کو راستے کے رویے کی خرابی کے دوران الگ رکھیں۔ دیکھیں
[3-layer resilience diagram](./docs/diagrams/exported/resilience-3layers.svg)
(ماخذ: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
ایک نظر میں نقشہ کے لیے۔

### فراہم کنندہ سرکٹ بریکر

**دائرہ**: پورا فراہم کنندہ، مثلاً `glm`, `openai`, `anthropic`۔

**مقصد**: ایک فراہم کنندہ کو ٹریفک بھیجنا بند کرنا جو بار بار اوپر کی سطح/سروس کی سطح پر ناکام ہو رہا ہے، تاکہ ایک غیر صحت مند فراہم کنندہ ہر درخواست کو سست نہ کرے۔

**عملدرآمد**:

- بنیادی کلاس: `src/shared/utils/circuitBreaker.ts`
- چیٹ گیٹ/عملدرآمد کی وائرنگ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- رن ٹائم اسٹیٹس API: `src/app/api/monitoring/health/route.ts`
- مشترکہ ریپرز: `open-sse/services/accountFallback.ts`
- برقرار رکھی گئی حالت کی میز: `domain_circuit_breakers`

**حالتیں**:

- `CLOSED`: معمول کی ٹریفک کی اجازت ہے۔
- `OPEN`: فراہم کنندہ عارضی طور پر بلاک ہے؛ کال کرنے والوں کو فراہم کنندہ-سرکٹ-کھلا جواب ملتا ہے یا combo routing دوسرے ہدف پر چھوٹ جاتا ہے۔
- `HALF_OPEN`: ری سیٹ ٹائم آؤٹ گزر چکا ہے؛ ایک پروب درخواست کی اجازت دیں۔ کامیابی بریکر کو بند کرتی ہے، ناکامی اسے دوبارہ کھول دیتی ہے۔

**ڈیفالٹس** (`open-sse/config/constants.ts`):

- OAuth فراہم کنندگان: تھریشولڈ `3`, ری سیٹ ٹائم آؤٹ `60s`۔
- API-key فراہم کنندگان: تھریشولڈ `5`, ری سیٹ ٹائم آؤٹ `30s`۔
- مقامی فراہم کنندگان: تھریشولڈ `2`, ری سیٹ ٹائم آؤٹ `15s`۔

صرف فراہم کنندہ کی سطح کی ناکامی کی حیثیتیں فراہم کنندہ کے بریکر کو متحرک کرنی چاہئیں:

```ts
(408, 500, 502, 503, 504);
```

معمول کی اکاؤنٹ/کی/ماڈل کی غلطیوں جیسے زیادہ تر `401`, `403`, یا `429` معاملات کے لیے پورے فراہم کنندہ کے بریکر کو متحرک نہ کریں۔ یہ عام طور پر کنکشن کی کول ڈاؤن یا ماڈل لاک آؤٹ سے متعلق ہوتے ہیں۔ ایک عمومی API-key فراہم کنندہ `403` کو بحال کیا جانا چاہیے جب تک کہ اسے ایک ٹرمینل فراہم کنندہ/اکاؤنٹ کی غلطی کے طور پر درجہ بند نہ کیا جائے۔

بریکر سست بحالی کا استعمال کرتا ہے، پس منظر کے ٹائمر نہیں۔ جب `OPEN` ختم ہوتا ہے، تو `getStatus()`, `canExecute()`, اور `getRetryAfterMs()` جیسے پڑھنے کی کارروائیاں حالت کو `HALF_OPEN` میں تازہ کرتی ہیں، تاکہ ڈیش بورڈز اور combo امیدوار بنانے والے ہمیشہ ایک ختم شدہ فراہم کنندہ کو خارج نہ کریں۔

### کنکشن کول ڈاؤن

**دائرہ**: ایک فراہم کنندہ کنکشن/اکاؤنٹ/کی۔

**مقصد**: ایک خراب کی/اکاؤنٹ کو عارضی طور پر چھوڑ دینا جبکہ اسی فراہم کنندہ کے لیے دوسرے کنکشنز کو درخواستیں فراہم کرنے کی اجازت دینا۔

**عملدرآمد**:

- لکھنے/اپ ڈیٹ کرنے کا راستہ: `src/sse/services/auth.ts::markAccountUnavailable()`
- اکاؤنٹ کا انتخاب/فلٹرنگ: `src/sse/services/auth.ts::getProviderCredentials...`
- کول ڈاؤن کا حساب: `open-sse/services/accountFallback.ts::checkFallbackError()`
- سیٹنگز: `src/lib/resilience/settings.ts`

فراہم کنندہ کنکشنز پر اہم فیلڈز:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

اکاؤنٹ کے انتخاب کے دوران، ایک کنکشن کو چھوڑ دیا جاتا ہے جب:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

کول ڈاؤن بھی سست ہیں: جب `rateLimitedUntil` ماضی میں ہو، تو کنکشن دوبارہ اہل ہو جاتا ہے۔ کامیاب استعمال پر، `clearAccountError()` `testStatus`, `rateLimitedUntil`, غلطی کے فیلڈز، اور `backoffLevel` کو صاف کرتا ہے۔

ڈیفالٹ کنکشن کول ڈاؤن کا رویہ:

- OAuth بنیادی کول ڈاؤن: `5s`۔
- API-key بنیادی کول ڈاؤن: `3s`۔
- API-key `429` کو اوپر کی طرف دوبارہ کوشش کے اشارے (`Retry-After`, ری سیٹ ہیڈرز، یا قابل تجزیہ ری سیٹ ٹیکسٹ) کو ترجیح دینی چاہیے جب دستیاب ہو۔
- بار بار بحال ہونے والی ناکامیاں ایکسپوننشل بیک آف کا استعمال کرتی ہیں:

```ts
baseCooldownMs * 2 ** failureIndex;
```

اینٹی تھنڈرنگ ہرڈ گارڈ ایک ہی کنکشن پر ہم وقتی ناکامیوں کو بار بار کول ڈاؤن کو بڑھانے یا `backoffLevel` کو دوگنا کرنے سے روکتا ہے۔

ٹرمینل حالتیں کول ڈاؤن نہیں ہیں۔ `banned`, `expired`, اور `credits_exhausted` کو غیر دستیاب رہنے کے لیے ڈیزائن کیا گیا ہے جب تک کہ اسناد/سیٹنگز تبدیل نہ ہوں یا کوئی آپریٹر انہیں دوبارہ ترتیب نہ دے۔ عارضی کول ڈاؤن کی حالت کے ساتھ ٹرمینل حالتوں کو اوور رائٹ نہ کریں۔

### ماڈل لاک آؤٹ

**دائرہ**: فراہم کنندہ + کنکشن + ماڈل۔

**مقصد**: ایک پورے کنکشن کو غیر فعال کرنے سے بچنا جب صرف ایک ماڈل اس کنکشن کے لیے غیر دستیاب یا کوٹہ محدود ہو۔

مثالیں:

- فی ماڈل کوٹہ فراہم کنندگان جو `429` واپس کرتے ہیں۔
- مقامی فراہم کنندگان جو ایک غائب ماڈل کے لیے `404` واپس کرتے ہیں۔
- فراہم کنندہ مخصوص موڈ/ماڈل کی اجازت کی ناکامیاں جیسے منتخب کردہ Grok موڈز۔

ماڈل لاک آؤٹ `open-sse/services/accountFallback.ts` میں موجود ہے اور اسی کنکشن کو دوسرے ماڈلز کی خدمت جاری رکھنے کی اجازت دیتا ہے۔

### خرابی کی رہنمائی

- اگر کسی فراہم کنندہ کے لیے تمام کیز چھوڑ دی گئی ہیں، تو فراہم کنندہ کے بریکر کی حالت اور ہر کنکشن کے `rateLimitedUntil`/`testStatus` کا معائنہ کریں۔
- اگر ایک فراہم کنندہ ری سیٹ ونڈو کے بعد مستقل طور پر خارج شدہ نظر آتا ہے، تو چیک کریں کہ آیا کوڈ خام `state` پڑھ رہا ہے بجائے اس کے کہ `getStatus()`/`canExecute()` کا استعمال کرے۔
- اگر ایک فراہم کنندہ کی کلید ناکام ہو جاتی ہے لیکن دوسری کام کرنی چاہئیں، تو فراہم کنندہ کے بریکر کے مقابلے میں کنکشن کول ڈاؤن کو ترجیح دیں۔
- اگر صرف ایک ماڈل ناکام ہوتا ہے، تو کنکشن کول ڈاؤن کے مقابلے میں ماڈل لاک آؤٹ کو ترجیح دیں۔
- اگر ایک حالت خود بحال ہونی چاہیے، تو اس کے پاس مستقبل کا ٹائم اسٹیمپ/ری سیٹ ٹائم آؤٹ ہونا چاہیے اور ایک پڑھنے کا راستہ ہونا چاہیے جو ختم شدہ حالت کو تازہ کرتا ہے۔ مستقل حیثیتوں کے لیے دستی اسناد یا کنفیگریشن کی تبدیلیاں درکار ہیں۔

## اہم روایات

### کوڈ کا انداز

- **2 جگہیں**, سیمی کالن, ڈبل کوٹس, 100 کردار کی چوڑائی, es5 ٹریلنگ کاماز (lint-staged کے ذریعے Prettier کے ذریعہ نافذ)
- **درآمدات**: بیرونی → داخلی (`@/`, `@omniroute/open-sse`) → نسبتی
- **نامگذاری**: فائلیں=camelCase/kebab, کمپوننٹس=PascalCase, مستقل=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = ہر جگہ غلطی; `no-explicit-any` = `open-sse/` اور `tests/` میں انتباہ
- **TypeScript**: `strict: false`, ہدف ES2022, ماڈیول esnext, ریزولوشن بنڈلر۔ واضح اقسام کو ترجیح دیں۔

### ڈیٹا بیس

- **ہمیشہ** `src/lib/db/` ڈومین ماڈیولز کے ذریعے جائیں — **کبھی بھی** راستوں یا ہینڈلرز میں خام SQL نہ لکھیں
- **کبھی بھی** `src/lib/localDb.ts` میں منطق شامل نہ کریں (صرف دوبارہ برآمد کرنے کی تہہ)
- **کبھی بھی** `localDb.ts` سے بیرل-درآمد نہ کریں — اس کے بجائے مخصوص `db/` ماڈیولز کو درآمد کریں
- DB سنگلٹن: `getDbInstance()` سے `src/lib/db/core.ts` (WAL جرنلنگ)
- مائگریشنز: `src/lib/db/migrations/` — ورژن والے SQL فائلیں، idempotent، ٹرانزیکشنز میں چلائیں

### غلطی کی ہینڈلنگ

- مخصوص غلطی کی اقسام کے ساتھ try/catch، pino سیاق و سباق کے ساتھ لاگ کریں
- SSE اسٹریمز میں غلطیوں کو کبھی نہ چھپائیں — صفائی کے لیے abort سگنلز کا استعمال کریں
- مناسب HTTP اسٹیٹس کوڈز واپس کریں (4xx/5xx)

### سیکیورٹی

- **کبھی بھی** `eval()`, `new Function()`, یا implied eval کا استعمال نہ کریں
- تمام ان پٹس کی تصدیق Zod اسکیموں کے ساتھ کریں
- آرام میں اسناد کو خفیہ کریں (AES-256-GCM)
- اپ اسٹریم ہیڈر ڈینائی لسٹ: `src/shared/constants/upstreamHeaders.ts` — ترمیم کرتے وقت صفائی، Zod اسکیموں، اور یونٹ ٹیسٹ کو ہم آہنگ رکھیں
- **عوامی اپ اسٹریم اسناد** (Gemini/Antigravity/Windsurf طرز OAuth client_id/secret + Firebase Web keys جو عوامی CLIs سے نکالی گئی ہیں): **ضروری** ہے کہ `resolvePublicCred()` کے ذریعے شامل کی جائیں `open-sse/utils/publicCreds.ts` میں — **کبھی بھی** سٹرنگ لٹریلز کے طور پر نہیں۔ لازمی پیٹرن کے لیے `docs/security/PUBLIC_CREDS.md` دیکھیں۔
- **غلطی کے جوابات** (HTTP / SSE / executor / MCP ہینڈلر): **ضروری** ہے کہ `buildErrorBody()` یا `sanitizeErrorMessage()` کے ذریعے روٹ کریں `open-sse/utils/error.ts` سے — **کبھی بھی** خام `err.stack` یا `err.message` کو جواب کے جسم میں نہ رکھیں۔ `docs/security/ERROR_SANITIZATION.md` دیکھیں۔
- **متغیرات سے بنے شیل کمانڈز**: جب `exec()`/`spawn()` کو ایسے اسکرپٹ کے ساتھ کال کرتے ہیں جسے رن ٹائم کی قدریں درکار ہوتی ہیں، تو انہیں `env` آپشن کے ذریعے پاس کریں (خودکار طور پر شیل-ایسکیپڈ) — **کبھی بھی** غیر معتبر/بیرونی راستوں کو اسکرپٹ کے جسم میں سٹرنگ-انٹرپولیٹ نہ کریں۔ حوالہ: `src/mitm/cert/install.ts::updateNssDatabases`۔
- **ڈیفالٹ کے لحاظ سے محفوظ لائبریریاں** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): نئے سیکیورٹی حساس سطحوں کو شامل کرتے وقت Helmet.js، DOMPurify، ssrf-req-filter، safe-regex، Google Tink کو اپنی مرضی کے مطابق عمل درآمد پر ترجیح دیں۔

---

## عام ترمیم کے منظرنامے

### نئے فراہم کنندہ کا اضافہ

1. `src/shared/constants/providers.ts` میں رجسٹر کریں (لوڈ پر Zod کی توثیق)
2. اگر حسب ضرورت منطق کی ضرورت ہو تو `open-sse/executors/` میں ایگزیکیوٹر شامل کریں ( `BaseExecutor` کو بڑھائیں)
3. اگر غیر-OpenAI فارمیٹ ہو تو `open-sse/translator/` میں مترجم شامل کریں
4. اگر OAuth پر مبنی ہو تو `src/lib/oauth/constants/oauth.ts` میں OAuth کنفیگریشن شامل کریں — اگر اپ اسٹریم CLI عوامی client_id/secret فراہم کرتا ہے تو `resolvePublicCred()` کے ذریعے شامل کریں (دیکھیں `docs/security/PUBLIC_CREDS.md`)، **کبھی بھی** ایک لٹریل کے طور پر نہیں
5. `open-sse/config/providerRegistry.ts` میں ماڈلز کو رجسٹر کریں
6. `tests/unit/` میں ٹیسٹ لکھیں (اگر آپ نے نیا شامل کردہ ڈیفالٹ شامل کیا تو publicCreds شکل کی تصدیق شامل کریں)

### نئے API راستے کا اضافہ

1. `src/app/api/v1/your-route/` کے تحت ڈائریکٹری بنائیں
2. `GET`/`POST` ہینڈلرز کے ساتھ `route.ts` بنائیں
3. پیٹرن کی پیروی کریں: CORS → Zod جسم کی توثیق → اختیاری تصدیق → ہینڈلر کی تفویض
4. ہینڈلر `open-sse/handlers/` میں جاتا ہے (وہاں سے درآمد کریں، اندر نہیں)
5. غلطی کے جوابات `buildErrorBody()` / `errorResponse()` کا استعمال کرتے ہیں `open-sse/utils/error.ts` سے (خودکار طور پر صفائی — کبھی بھی `err.stack` یا `err.message` کو جسم میں خام نہ رکھیں)۔ `docs/security/ERROR_SANITIZATION.md` دیکھیں۔
6. ٹیسٹ شامل کریں — بشمول کم از کم ایک تصدیق کہ غلطی کے جوابات اسٹیک ٹریس کو لیک نہیں کرتے (`!body.error.message.includes("at /")`)

### نئے DB ماڈیول کا اضافہ

1. `src/lib/db/yourModule.ts` بنائیں — `./core.ts` سے `getDbInstance` کو درآمد کریں
2. اپنے ڈومین ٹیبل کے لیے CRUD افعال کو برآمد کریں
3. اگر نئے ٹیبل کی ضرورت ہو تو `src/lib/db/migrations/` میں مائگریشن شامل کریں
4. `src/lib/localDb.ts` سے دوبارہ برآمد کریں (صرف دوبارہ برآمد کی فہرست میں شامل کریں)
5. ٹیسٹ لکھیں

### نئے MCP ٹول کا اضافہ

1. `open-sse/mcp-server/tools/` میں Zod ان پٹ اسکیمہ + async ہینڈلر کے ساتھ ٹول کی تعریف شامل کریں
2. ٹول سیٹ میں رجسٹر کریں ( `createMcpServer()` کے ذریعے وائرڈ)
3. مناسب دائرہ کاروں کو تفویض کریں
4. ٹیسٹ لکھیں (ٹول کی کال `mcp_audit` ٹیبل میں لاگ کی گئی)

### نئے A2A مہارت کا اضافہ

1. `src/lib/a2a/skills/` میں مہارت بنائیں (5 پہلے سے موجود ہیں: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. مہارت کام کے سیاق و سباق (پیغامات، میٹا ڈیٹا) کو وصول کرتی ہے → منظم نتیجہ واپس کرتی ہے
3. `src/lib/a2a/taskExecution.ts` میں `A2A_SKILL_HANDLERS` میں رجسٹر کریں
4. `src/app/.well-known/agent.json/route.ts` میں ظاہر کریں (ایجنٹ کارڈ)
5. `tests/unit/` میں ٹیسٹ لکھیں
6. `docs/frameworks/A2A-SERVER.md` میں مہارت کی میز میں دستاویز کریں

### نئے کلاؤڈ ایجنٹ کا اضافہ

1. `src/lib/cloudAgent/agents/` میں `CloudAgentBase` کو بڑھاتے ہوئے ایجنٹ کلاس بنائیں (3 پہلے سے موجود ہیں: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` کو نافذ کریں
3. `src/lib/cloudAgent/registry.ts` میں رجسٹر کریں
4. اگر ضرورت ہو تو OAuth/اسناد کی ہینڈلنگ شامل کریں (`src/lib/oauth/providers/`)
5. ٹیسٹ + `docs/frameworks/CLOUD_AGENT.md` میں دستاویز کریں

### نئے گارڈریل / ایوال / مہارت / ویب ہک ایونٹ کا اضافہ

- گارڈریل: `src/lib/guardrails/` → دستاویزات: `docs/security/GUARDRAILS.md`
- ایوال سوٹ: `src/lib/evals/` → دستاویزات: `docs/frameworks/EVALS.md`
- مہارت (سینڈ باکس): `src/lib/skills/` → دستاویزات: `docs/frameworks/SKILLS.md`
- ویب ہک ایونٹ: `src/lib/webhookDispatcher.ts` → دستاویزات: `docs/frameworks/WEBHOOKS.md`

---

## حوالہ دستاویزات

کسی بھی غیر معمولی تبدیلی کے لیے، پہلے متعلقہ گہرائی میں جانے والی دستاویز پڑھیں:

| علاقہ                                           | دستاویز                                                           |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| ریپو نیویگیشن                                   | `docs/architecture/REPOSITORY_MAP.md`                             |
| فن تعمیر                                        | `docs/architecture/ARCHITECTURE.md`                               |
| انجینئرنگ حوالہ                                 | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| آٹو-کمبو (9-فیکٹر اسکورنگ، 14 حکمت عملی)        | `docs/routing/AUTO-COMBO.md`                                      |
| لچک (3 طریقے)                                   | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| استدلال دوبارہ پلے                              | `docs/routing/REASONING_REPLAY.md`                                |
| مہارتوں کا فریم ورک                             | `docs/frameworks/SKILLS.md`                                       |
| میموری سسٹم (FTS5 + Qdrant)                     | `docs/frameworks/MEMORY.md`                                       |
| کلاؤڈ ایجنٹس                                    | `docs/frameworks/CLOUD_AGENT.md`                                  |
| گارڈریلز (PII / انجیکشن / وژن)                  | `docs/security/GUARDRAILS.md`                                     |
| عوامی اپ اسٹریم اسناد (Gemini وغیرہ)            | `docs/security/PUBLIC_CREDS.md`                                   |
| غلطی کے پیغام کی صفائی                          | `docs/security/ERROR_SANITIZATION.md`                             |
| ایوالز                                          | `docs/frameworks/EVALS.md`                                        |
| تعمیل / آڈٹ                                     | `docs/security/COMPLIANCE.md`                                     |
| ویب ہُک                                         | `docs/frameworks/WEBHOOKS.md`                                     |
| اختیار کی پائپ لائن                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| اسٹیلتھ (TLS / فنگر پرنٹ)                       | `docs/security/STEALTH_GUIDE.md`                                  |
| ایجنٹ پروٹوکول (A2A / ACP / کلاؤڈ)              | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP سرور                                        | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A سرور                                        | `docs/frameworks/A2A-SERVER.md`                                   |
| API حوالہ + OpenAPI                             | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| فراہم کنندہ کی کیٹلاگ (خودکار طور پر تیار کردہ) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| ریلیز کا بہاؤ                                   | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## ٹیسٹنگ

| کیا                      | کمانڈ                                                                |
| ------------------------ | -------------------------------------------------------------------- |
| یونٹ ٹیسٹ                | `npm run test:unit`                                                  |
| ایک فائل                 | `node --import tsx/esm --test tests/unit/file.test.ts`               |
| وائیٹیسٹ (MCP، آٹوکمبو)  | `npm run test:vitest`                                                |
| ای2ای (پلے رائٹ)         | `npm run test:e2e`                                                   |
| پروٹوکول ای2ای (MCP+A2A) | `npm run test:protocols:e2e`                                         |
| ایکو سسٹم                | `npm run test:ecosystem`                                             |
| کوریج گیٹ                | `npm run test:coverage` (75/75/75/70 — بیانات/لائنیں/فنکشنز/برانچیں) |
| کوریج رپورٹ              | `npm run coverage:report`                                            |

**پی آر قاعدہ**: اگر آپ `src/`، `open-sse/`، `electron/`، یا `bin/` میں پروڈکشن کوڈ تبدیل کرتے ہیں، تو آپ کو اسی پی آر میں ٹیسٹ شامل یا اپ ڈیٹ کرنے ہوں گے۔

**ٹیسٹ کی تہہ کی ترجیح**: پہلے یونٹ → انضمام (کئی ماڈیول یا ڈی بی حالت) → ای2ای (صرف UI/ورک فلو)۔ بگ کی دوبارہ تخلیق کو خودکار ٹیسٹ کے طور پر کوڈ کریں، درستگی کے ساتھ یا اس کے ساتھ۔

**کوپائلٹ کوریج پالیسی**: جب ایک پی آر پروڈکشن کوڈ کو تبدیل کرتا ہے اور کوریج 75% (بیانات/لائنیں/فنکشنز) یا 70% (برانچیں) سے کم ہے، تو صرف رپورٹ نہ کریں — ٹیسٹ شامل یا اپ ڈیٹ کریں، کوریج گیٹ کو دوبارہ چلائیں، پھر تصدیق کے لیے پوچھیں۔ پی آر رپورٹ میں چلائی گئی کمانڈز، تبدیل شدہ ٹیسٹ فائلیں، اور آخری کوریج کے نتائج شامل کریں۔

---

## گٹ ورک فلو

```bash
# کبھی بھی براہ راست مین میں کمٹ نہ کریں
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**برانچ کے پیشگی الفاظ**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**کمٹ کا فارمیٹ** (روایتی کمٹس): `feat(db): add circuit breaker` — دائرے: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**ہسکی ہکس**:

- **پری-کمٹ**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **پری-پش**: `npm run test:unit`

---

## ماحول

- **رن ٹائم**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25، ES ماڈیولز
- **ٹائپ اسکرپٹ**: 5.9+، ہدف ES2022، ماڈیول esnext، ریزولوشن بنڈلر
- **پاتھ ایلیاس**: `@/*` → `src/`، `@omniroute/open-sse` → `open-sse/`، `@omniroute/open-sse/*` → `open-sse/*`
- **ڈیفالٹ پورٹ**: 20128 (API + ڈیش بورڈ ایک ہی پورٹ پر)
- **ڈیٹا ڈائریکٹری**: `DATA_DIR` env var، ڈیفالٹ `~/.omniroute/`
- **اہم env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- سیٹ اپ: `cp .env.example .env` پھر `JWT_SECRET` (`openssl rand -base64 48`) اور `API_KEY_SECRET` (`openssl rand -hex 32`) بنائیں

---

## سخت قواعد

1. کبھی بھی راز یا اسناد کمٹ نہ کریں
2. کبھی بھی `localDb.ts` میں منطق شامل نہ کریں
3. کبھی بھی `eval()` / `new Function()` / ضمنی eval استعمال نہ کریں
4. کبھی بھی براہ راست `main` میں کمٹ نہ کریں
5. کبھی بھی راستوں میں خام SQL نہ لکھیں — `src/lib/db/` ماڈیولز کا استعمال کریں
6. کبھی بھی SSE اسٹریمز میں خاموشی سے غلطیاں نہ چھپائیں
7. ہمیشہ Zod اسکیموں کے ساتھ ان پٹ کی توثیق کریں
8. ہمیشہ پروڈکشن کوڈ میں تبدیلی کرتے وقت ٹیسٹ شامل کریں
9. کوریج کو ≥75% (بیانات، لائنیں، فنکشنز) / ≥70% (برانچیں) پر برقرار رکھنا چاہیے۔ موجودہ ماپا: ~82%۔
10. کبھی بھی ہسکی ہکس (`--no-verify`, `--no-gpg-sign`) کو واضح آپریٹر کی منظوری کے بغیر نظرانداز نہ کریں۔
11. کبھی بھی عوامی اوپر کی OAuth client_id/secret یا Firebase Web keys کو سٹرنگ لیٹرلز کے طور پر شامل نہ کریں — ہمیشہ `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) کے ذریعے جائیں۔ دیکھیں `docs/security/PUBLIC_CREDS.md`۔
12. کبھی بھی HTTP / SSE / executor جوابات میں خام `err.stack` / `err.message` واپس نہ کریں — ہمیشہ `buildErrorBody()` یا `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) کے ذریعے روٹ کریں۔ دیکھیں `docs/security/ERROR_SANITIZATION.md`۔
13. کبھی بھی خارجی راستوں یا رن ٹائم کی قدروں کو `exec()`/`spawn()` کو منتقل کیے جانے والے شیل اسکرپٹس میں سٹرنگ انٹرپولیٹ نہ کریں — اس کے بجائے `env` آپشن کے ذریعے منتقل کریں۔ حوالہ: `src/mitm/cert/install.ts::updateNssDatabases`۔
14. کبھی بھی CodeQL / Secret-Scanning الرٹ کو نظرانداز نہ کریں بغیر (a) پہلے اوپر پیٹرن کی دستاویزات کو چیک کیے کہ آیا مددگار لاگو ہوتا ہے، اور (b) نظرانداز کے تبصرے میں تکنیکی جواز کو ریکارڈ کیے بغیر۔ مثال: `js/stack-trace-exposure` جو کال سائٹس پر اٹھایا گیا ہے جو پہلے ہی `sanitizeErrorMessage()` کے ذریعے روٹ ہوتے ہیں، ایک جانا پہچانا CodeQL کی حد ہے (حسب ضرورت صفائی کرنے والے تسلیم نہیں کیے گئے) — `false positive` کے طور پر نظرانداز کریں جس میں `docs/security/ERROR_SANITIZATION.md` کا حوالہ دیا گیا ہو۔
15. کبھی بھی ایسے راستے ظاہر نہ کریں جو بچے کے عمل کو پیدا کرتے ہیں (`/api/mcp/`, `/api/cli-tools/runtime/`) بغیر `isLocalOnlyPath()` کی درجہ بندی کے `src/server/authz/routeGuard.ts` میں۔ لوپ بیک کا نفاذ کسی بھی توثیق کی جانچ سے پہلے غیر مشروط طور پر ہوتا ہے — سرنگ کے ذریعے لیک ہونے والا JWT عمل پیدا کرنے کو متحرک نہیں کر سکتا۔ دیکھیں `docs/security/ROUTE_GUARD_TIERS.md`۔
16. کبھی بھی کمٹ پیغامات میں `Co-Authored-By` ٹریلرز شامل نہ کریں۔ کمٹس کو صرف ریپوزٹری کے مالک کی Git شناخت (`diegosouzapw`) کے تحت ظاہر ہونا چاہیے۔ `Co-Authored-By: Claude …` لائن GitHub کو کمٹس کو `claude` اینتھروپک اکاؤنٹ کے ساتھ منسوب کرنے کا سبب بنتی ہے، جس سے حقیقی مصنف پی آر کی تاریخ میں چھپ جاتا ہے۔
