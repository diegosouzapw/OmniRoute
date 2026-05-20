# CLAUDE.md (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

এই ফাইলটি এই রেপোজিটরিতে কোডের সাথে কাজ করার সময় Claude Code (claude.ai/code) এর জন্য নির্দেশিকা প্রদান করে।

## দ্রুত শুরু

```bash
npm install                    # নির্ভরতাগুলি ইনস্টল করুন (auto-generates .env from .env.example)
npm run dev                    # ডেভ সার্ভার http://localhost:20128 এ
npm run build                  # প্রোডাকশন বিল্ড (Next.js 16 standalone)
npm run lint                   # ESLint (0 ত্রুটি প্রত্যাশিত; সতর্কতা পূর্ব-বিদ্যমান)
npm run typecheck:core         # TypeScript পরীক্ষা (পরিষ্কার হওয়া উচিত)
npm run typecheck:noimplicit:core  # কঠোর পরীক্ষা (কোনও ইম্প্লিসিট অ্যানি নেই)
npm run test:coverage          # ইউনিট পরীক্ষা + কভারেজ গেট (75/75/75/70 — বিবৃতি/লাইন/ফাংশন/শাখা)
npm run check                  # lint + পরীক্ষা একত্রিত
npm run check:cycles           # বৃত্তাকার নির্ভরতাগুলি সনাক্ত করুন
```

### পরীক্ষাগুলি চালানো

```bash
# একক পরীক্ষার ফাইল (Node.js নেটিভ পরীক্ষার রানার — বেশিরভাগ পরীক্ষা)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP সার্ভার, autoCombo, ক্যাশ)
npm run test:vitest

# সমস্ত স্যুট
npm run test:all
```

সম্পূর্ণ পরীক্ষার ম্যাট্রিক্সের জন্য, দেখুন `CONTRIBUTING.md` → "পরীক্ষাগুলি চালানো"। গভীর স্থাপত্যের জন্য, দেখুন `AGENTS.md`।

---

## প্রকল্পের সংক্ষিপ্ত বিবরণ

**OmniRoute** — একক AI প্রক্সি/রাউটার। একটি এন্ডপয়েন্ট, 160+ LLM প্রদানকারী, স্বয়ংক্রিয় ফ fallback।

| স্তর          | অবস্থান                 | উদ্দেশ্য                                                  |
| ------------- | ----------------------- | --------------------------------------------------------- |
| API রুট       | `src/app/api/v1/`       | Next.js অ্যাপ রাউটার — প্রবেশ পয়েন্ট                     |
| হ্যান্ডলার    | `open-sse/handlers/`    | অনুরোধ প্রক্রিয়াকরণ (চ্যাট, এম্বেডিংস, ইত্যাদি)          |
| এক্সিকিউটর    | `open-sse/executors/`   | প্রদানকারী-নির্দিষ্ট HTTP ডিসপ্যাচ                        |
| অনুবাদক       | `open-sse/translator/`  | ফরম্যাট রূপান্তর (OpenAI↔Claude↔Gemini)                   |
| ট্রান্সফর্মার | `open-sse/transformer/` | প্রতিক্রিয়া API ↔ চ্যাট সম্পূর্ণতা                       |
| পরিষেবাগুলি   | `open-sse/services/`    | কম্বো রাউটিং, হার সীমা, ক্যাশিং, ইত্যাদি                  |
| ডেটাবেস       | `src/lib/db/`           | SQLite ডোমেইন মডিউল (45+ ফাইল, 55 মাইগ্রেশন)              |
| ডোমেইন/নীতী   | `src/domain/`           | নীতি ইঞ্জিন, খরচের নিয়ম, ফ fallback লজিক                 |
| MCP সার্ভার   | `open-sse/mcp-server/`  | 37 টুল (30 বেস + 3 মেমরি + 4 দক্ষতা), 3 পরিবহন, ~13 স্কোপ |
| A2A সার্ভার   | `src/lib/a2a/`          | JSON-RPC 2.0 এজেন্ট প্রোটোকল                              |
| দক্ষতা        | `src/lib/skills/`       | সম্প্রসারণযোগ্য দক্ষতা ফ্রেমওয়ার্ক                       |
| মেমরি         | `src/lib/memory/`       | স্থায়ী কথোপকথন মেমরি                                     |

মনোরেপো: `src/` (Next.js 16 অ্যাপ), `open-sse/` (স্ট্রিমিং ইঞ্জিন কর্মক্ষেত্র), `electron/` (ডেস্কটপ অ্যাপ), `tests/`, `bin/` (CLI প্রবেশ পয়েন্ট)।

---

## অনুরোধ পাইপলাইন

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

API রুটগুলি একটি সঙ্গতিপূর্ণ প্যাটার্ন অনুসরণ করে: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`। কোন গ্লোবাল Next.js middleware নেই — হস্তক্ষেপ রুট-নির্দিষ্ট।

**কম্বো রাউটিং** (`open-sse/services/combo.ts`): 14 কৌশল (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized, context-relay)। প্রতিটি টার্গেট `handleSingleModel()` কল করে যা `handleChatCore()` কে টার্গেট-ভিত্তিক ত্রুটি পরিচালনা এবং সার্কিট ব্রেকার চেক সহ মোড়ানো করে। 9-ফ্যাক্টর অটো-কম্বো স্কোরিংয়ের জন্য `docs/routing/AUTO-COMBO.md` দেখুন এবং 3 রেজিলিয়েন্স স্তরের জন্য `docs/architecture/RESILIENCE_GUIDE.md` দেখুন।

---

## রেজিলিয়েন্স রানটাইম স্টেট

OmniRoute-এ তিনটি সম্পর্কিত কিন্তু আলাদা অস্থায়ী-ব্যর্থতা মেকানিজম রয়েছে। রাউটিং আচরণ ডিবাগ করার সময় তাদের পরিধি আলাদা রাখুন। একটি সংক্ষিপ্ত মানচিত্রের জন্য [3-স্তরের রেজিলিয়েন্স ডায়াগ্রাম](./docs/diagrams/exported/resilience-3layers.svg) দেখুন (সূত্র: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))।

### প্রোভাইডার সার্কিট ব্রেকার

**পরিধি**: পুরো প্রোভাইডার, যেমন `glm`, `openai`, `anthropic`।

**উদ্দেশ্য**: একটি প্রোভাইডারে ট্রাফিক পাঠানো বন্ধ করা যা বারবার উপরের/সার্ভিস স্তরে ব্যর্থ হচ্ছে, যাতে একটি অস্বাস্থ্যকর প্রোভাইডার প্রতিটি অনুরোধকে ধীর করে না।

**বাস্তবায়ন**:

- কোর ক্লাস: `src/shared/utils/circuitBreaker.ts`
- চ্যাট গেট/এক্সিকিউশন ওয়ায়ারিং: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- রানটাইম স্ট্যাটাস API: `src/app/api/monitoring/health/route.ts`
- শেয়ার্ড র‍্যাপার: `open-sse/services/accountFallback.ts`
- স্থায়ী স্টেট টেবিল: `domain_circuit_breakers`

**স্টেট**:

- `CLOSED`: স্বাভাবিক ট্রাফিক অনুমোদিত।
- `OPEN`: প্রোভাইডার অস্থায়ীভাবে ব্লক করা হয়েছে; কলাররা একটি প্রোভাইডার-সার্কিট-ওপেন প্রতিক্রিয়া পায় অথবা কম্বো রাউটিং অন্য টার্গেটে চলে যায়।
- `HALF_OPEN`: রিসেট টাইমআউট শেষ হয়েছে; একটি প্রোব অনুরোধ অনুমোদিত। সফল হলে ব্রেকার বন্ধ হয়, ব্যর্থ হলে এটি আবার খোলে।

**ডিফল্ট** (`open-sse/config/constants.ts`):

- OAuth প্রোভাইডার: থ্রেশহোল্ড `3`, রিসেট টাইমআউট `60s`।
- API-কী প্রোভাইডার: থ্রেশহোল্ড `5`, রিসেট টাইমআউট `30s`।
- লোকাল প্রোভাইডার: থ্রেশহোল্ড `2`, রিসেট টাইমআউট `15s`।

শুধুমাত্র প্রোভাইডার-স্তরের ব্যর্থতা স্ট্যাটাসগুলি প্রোভাইডার ব্রেকারকে ট্রিপ করা উচিত:

```ts
(408, 500, 502, 503, 504);
```

সাধারণ অ্যাকাউন্ট/কী/মডেল ত্রুটির জন্য পুরো-প্রোভাইডার ব্রেকার ট্রিপ করবেন না যেমন বেশিরভাগ `401`, `403`, বা `429` কেস। সেগুলি সাধারণত সংযোগ কুলডাউন বা মডেল লকআউটের অন্তর্ভুক্ত। একটি সাধারণ API-কী প্রোভাইডার `403` পুনরুদ্ধারযোগ্য হওয়া উচিত যতক্ষণ না এটি একটি টার্মিনাল প্রোভাইডার/অ্যাকাউন্ট ত্রুটি হিসাবে শ্রেণীবদ্ধ হয়।

ব্রেকার অলস পুনরুদ্ধার ব্যবহার করে, ব্যাকগ্রাউন্ড টাইমার নয়। যখন `OPEN` মেয়াদ শেষ হয়, তখন `getStatus()`, `canExecute()`, এবং `getRetryAfterMs()` এর মতো পড়া স্টেটকে `HALF_OPEN` এ রিফ্রেশ করে, যাতে ড্যাশবোর্ড এবং কম্বো প্রার্থী নির্মাতারা একটি মেয়াদ শেষ হওয়া প্রোভাইডারকে চিরকাল বাদ না দেয়।

### সংযোগ কুলডাউন

**পরিধি**: একটি প্রোভাইডার সংযোগ/অ্যাকাউন্ট/কী।

**উদ্দেশ্য**: একটি খারাপ কী/অ্যাকাউন্ট অস্থায়ীভাবে বাদ দেওয়া, যখন একই প্রোভাইডারের জন্য অন্যান্য সংযোগগুলি অনুরোধ পরিবেশন করতে চলতে পারে।

**বাস্তবায়ন**:

- লেখার/আপডেটের পথ: `src/sse/services/auth.ts::markAccountUnavailable()`
- অ্যাকাউন্ট নির্বাচন/ফিল্টারিং: `src/sse/services/auth.ts::getProviderCredentials...`
- কুলডাউন গণনা: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

প্রোভাইডার সংযোগগুলিতে গুরুত্বপূর্ণ ক্ষেত্রগুলি:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

অ্যাকাউন্ট নির্বাচনের সময়, একটি সংযোগ বাদ দেওয়া হয় যখন:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

কুলডাউনও অলস: যখন `rateLimitedUntil` অতীতে থাকে, তখন সংযোগ আবার যোগ্য হয়ে যায়। সফল ব্যবহারের সময়, `clearAccountError()` `testStatus`, `rateLimitedUntil`, ত্রুটি ক্ষেত্রগুলি এবং `backoffLevel` পরিষ্কার করে।

ডিফল্ট সংযোগ কুলডাউন আচরণ:

- OAuth বেস কুলডাউন: `5s`।
- API-কী বেস কুলডাউন: `3s`।
- API-কী `429` উপলব্ধ হলে উপরের পুনরায় চেষ্টা নির্দেশাবলীর (`Retry-After`, রিসেট হেডার, বা পার্সযোগ্য রিসেট টেক্সট) প্রতি অগ্রাধিকার দেওয়া উচিত।
- পুনরাবৃত্ত পুনরুদ্ধারযোগ্য ব্যর্থতা এক্সপোনেনশিয়াল ব্যাকঅফ ব্যবহার করে:

```ts
baseCooldownMs * 2 ** failureIndex;
```

অ্যান্টি-থান্ডারিং-হার্ড গার্ড একই সংযোগে সমান্তরাল ব্যর্থতাগুলিকে কুলডাউন বাড়ানোর বা `backoffLevel` দ্বিগুণ বাড়ানোর থেকে প্রতিরোধ করে।

টার্মিনাল স্টেটগুলি কুলডাউন নয়। `banned`, `expired`, এবং `credits_exhausted` অপ্রাপ্য থাকতে উদ্দেশ্যপ্রণোদিত যতক্ষণ না শংসাপত্র/সেটিংস পরিবর্তিত হয় বা একটি অপারেটর সেগুলি রিসেট করে। অস্থায়ী কুলডাউন স্টেটের সাথে টার্মিনাল স্টেটগুলি ওভাররাইট করবেন না।

### মডেল লকআউট

**পরিধি**: প্রোভাইডার + সংযোগ + মডেল।

**উদ্দেশ্য**: যখন শুধুমাত্র একটি মডেল অপ্রাপ্য বা কোটা-সীমাবদ্ধ হয় তখন পুরো সংযোগ অক্ষম করা এড়ানো।

উদাহরণ:

- প্রতি-মডেল কোটা প্রোভাইডারগুলি `429` ফেরত দেয়।
- স্থানীয় প্রোভাইডারগুলি একটি অনুপস্থিত মডেলের জন্য `404` ফেরত দেয়।
- নির্বাচিত Grok মোডের মতো প্রোভাইডার-নির্দিষ্ট মোড/মডেল অনুমতি ব্যর্থতা।

মডেল লকআউট `open-sse/services/accountFallback.ts` এ থাকে এবং একই সংযোগকে অন্যান্য মডেল পরিবেশন করতে দেয়।

### ডিবাগিং গাইডেন্স

- যদি একটি প্রোভাইডারের জন্য সমস্ত কী বাদ দেওয়া হয়, তবে উভয় প্রোভাইডার ব্রেকার স্টেট এবং প্রতিটি সংযোগের `rateLimitedUntil`/`testStatus` পরিদর্শন করুন।
- যদি একটি প্রোভাইডার পুনরায় সেট করার উইন্ডোর পরে স্থায়ীভাবে বাদ দেওয়া হয়, তবে চেক করুন যে কোডটি `getStatus()`/`canExecute()` ব্যবহার করার পরিবর্তে কাঁচা `state` পড়ছে কিনা।
- যদি একটি প্রোভাইডার কী ব্যর্থ হয় কিন্তু অন্যগুলি কাজ করা উচিত, তবে প্রোভাইডার ব্রেকারের পরিবর্তে সংযোগ কুলডাউনকে অগ্রাধিকার দিন।
- যদি শুধুমাত্র একটি মডেল ব্যর্থ হয়, তবে সংযোগ কুলডাউনের পরিবর্তে মডেল লকআউটকে অগ্রাধিকার দিন।
- যদি একটি স্টেট স্বয়ং-পুনরুদ্ধার হওয়া উচিত, তবে এটি একটি ভবিষ্যতের টাইমস্ট্যাম্প/রিসেট টাইমআউট এবং একটি পড়ার পথ থাকা উচিত যা মেয়াদ শেষ হওয়া স্টেটকে রিফ্রেশ করে। স্থায়ী স্ট্যাটাসগুলি ম্যানুয়াল শংসাপত্র বা কনফিগারেশন পরিবর্তনের প্রয়োজন।

## মূল রীতি

### কোড শৈলী

- **2 স্পেস**, সেমিকোলন, ডাবল কোটেশন, 100 চর প্রস্থ, es5 ট্রেইলিং কমা (lint-staged দ্বারা Prettier এর মাধ্যমে প্রয়োগিত)
- **ইম্পোর্ট**: বাইরের → অভ্যন্তরীণ (`@/`, `@omniroute/open-sse`) → আপেক্ষিক
- **নামকরণ**: ফাইল=camelCase/kebab, উপাদান=PascalCase, ধ্রুবক=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = সর্বত্র ত্রুটি; `no-explicit-any` = `open-sse/` এবং `tests/` এ সতর্কতা
- **TypeScript**: `strict: false`, লক্ষ্য ES2022, মডিউল esnext, রেজোলিউশন বান্ডলার। স্পষ্ট টাইপ পছন্দ করুন।

### ডেটাবেস

- **সর্বদা** `src/lib/db/` ডোমেইন মডিউলগুলির মাধ্যমে যান — **কখনও** রুট বা হ্যান্ডলারগুলিতে কাঁচা SQL লিখবেন না
- **কখনও** `src/lib/localDb.ts` এ লজিক যোগ করবেন না (পুনঃ-রপ্তানি স্তর মাত্র)
- **কখনও** `localDb.ts` থেকে ব্যারেল-ইম্পোর্ট করবেন না — বরং নির্দিষ্ট `db/` মডিউলগুলি ইম্পোর্ট করুন
- DB সিঙ্গেলটন: `getDbInstance()` থেকে `src/lib/db/core.ts` (WAL জার্নালিং)
- মাইগ্রেশন: `src/lib/db/migrations/` — সংস্করণযুক্ত SQL ফাইল, আইডেম্পোটেন্ট, লেনদেনে চালান

### ত্রুটি পরিচালনা

- নির্দিষ্ট ত্রুটি প্রকারের সাথে try/catch, pino প্রসঙ্গ সহ লগ করুন
- SSE স্ট্রিমগুলিতে ত্রুটি গিলে ফেলবেন না — পরিষ্কারের জন্য abort সিগন্যাল ব্যবহার করুন
- সঠিক HTTP স্ট্যাটাস কোড ফেরত দিন (4xx/5xx)

### নিরাপত্তা

- **কখনও** `eval()`, `new Function()`, বা ইম্প্লাইড eval ব্যবহার করবেন না
- সমস্ত ইনপুট Zod স্কিমা দ্বারা যাচাই করুন
- বিশ্রামে শংসাপত্র এনক্রিপ্ট করুন (AES-256-GCM)
- আপস্ট্রিম হেডার ডিনাইলিস্ট: `src/shared/constants/upstreamHeaders.ts` — সম্পাদনার সময় স্যানিটাইজ, Zod স্কিমা, এবং ইউনিট টেস্টগুলি সমন্বয় বজায় রাখুন
- **পাবলিক আপস্ট্রিম শংসাপত্র** (Gemini/Antigravity/Windsurf-শৈলীর OAuth client_id/secret + পাবলিক CLI থেকে বের করা Firebase Web কী): **মাস্ট** `resolvePublicCred()` এর মাধ্যমে এম্বেড করা উচিত `open-sse/utils/publicCreds.ts` থেকে — **কখনও** স্ট্রিং লিটারাল হিসাবে নয়। বাধ্যতামূলক প্যাটার্নের জন্য `docs/security/PUBLIC_CREDS.md` দেখুন।
- **ত্রুটি প্রতিক্রিয়া** (HTTP / SSE / এক্সিকিউটর / MCP হ্যান্ডলার): **মাস্ট** `buildErrorBody()` বা `sanitizeErrorMessage()` এর মাধ্যমে রাউট করতে হবে `open-sse/utils/error.ts` থেকে — **কখনও** কাঁচা `err.stack` বা `err.message` প্রতিক্রিয়া শরীরে রাখবেন না। `docs/security/ERROR_SANITIZATION.md` দেখুন।
- **ভেরিয়েবল থেকে তৈরি শেল কমান্ড**: যখন `exec()`/`spawn()` কল করছেন একটি স্ক্রিপ্টের সাথে যা রানটাইম মান প্রয়োজন, সেগুলি `env` অপশন দ্বারা পাস করুন (স্বয়ংক্রিয়ভাবে শেল-এস্কেপড) — **কখনও** অবিশ্বাস্য/বাহ্যিক পাথগুলিকে স্ক্রিপ্ট শরীরে স্ট্রিং-ইন্টারপোলেট করবেন না। রেফারেন্স: `src/mitm/cert/install.ts::updateNssDatabases`।
- **ডিফল্ট নিরাপদ লাইব্রেরি** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): নতুন নিরাপত্তা-সংবেদনশীল পৃষ্ঠাগুলি যোগ করার সময় কাস্টম বাস্তবায়নের পরিবর্তে Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink পছন্দ করুন।

---

## সাধারণ সংশোধন পরিস্থিতি

### নতুন প্রদানকারী যোগ করা

1. `src/shared/constants/providers.ts` এ নিবন্ধন করুন (লোডের সময় Zod দ্বারা যাচাইকৃত)
2. যদি কাস্টম লজিক প্রয়োজন হয় তবে `open-sse/executors/` এ এক্সিকিউটর যোগ করুন ( `BaseExecutor` প্রসারিত করুন)
3. যদি non-OpenAI ফরম্যাট হয় তবে `open-sse/translator/` এ অনুবাদক যোগ করুন
4. যদি OAuth-ভিত্তিক হয় তবে `src/lib/oauth/constants/oauth.ts` এ OAuth কনফিগ যোগ করুন — যদি আপস্ট্রিম CLI একটি পাবলিক client_id/secret সরবরাহ করে, তবে `resolvePublicCred()` এর মাধ্যমে এম্বেড করুন (দেখুন `docs/security/PUBLIC_CREDS.md`), **কখনও** একটি লিটারাল হিসাবে নয়
5. `open-sse/config/providerRegistry.ts` এ মডেলগুলি নিবন্ধন করুন
6. `tests/unit/` এ টেস্ট লিখুন (যদি আপনি একটি নতুন এম্বেডেড ডিফল্ট যোগ করেন তবে পাবলিকCreds আকারের নিশ্চিতকরণ অন্তর্ভুক্ত করুন)

### নতুন API রুট যোগ করা

1. `src/app/api/v1/your-route/` এর অধীনে ডিরেক্টরি তৈরি করুন
2. `GET`/`POST` হ্যান্ডলার সহ `route.ts` তৈরি করুন
3. প্যাটার্ন অনুসরণ করুন: CORS → Zod বডি যাচাইকরণ → ঐচ্ছিক প্রমাণীকরণ → হ্যান্ডলার ডেলিগেশন
4. হ্যান্ডলার `open-sse/handlers/` এ যাবে (সেখানে থেকে ইম্পোর্ট করুন, ইনলাইন নয়)
5. ত্রুটি প্রতিক্রিয়া `buildErrorBody()` / `errorResponse()` ব্যবহার করে `open-sse/utils/error.ts` থেকে (স্বয়ংক্রিয়ভাবে স্যানিটাইজড — কখনও `err.stack` বা `err.message` কাঁচা শরীরে রাখবেন না)। `docs/security/ERROR_SANITIZATION.md` দেখুন।
6. টেস্ট যোগ করুন — অন্তত একটি নিশ্চিতকরণ অন্তর্ভুক্ত করুন যে ত্রুটি প্রতিক্রিয়া স্ট্যাক ট্রেস ফাঁস করে না (`!body.error.message.includes("at /")`)

### নতুন DB মডিউল যোগ করা

1. `src/lib/db/yourModule.ts` তৈরি করুন — `./core.ts` থেকে `getDbInstance` ইম্পোর্ট করুন
2. আপনার ডোমেইন টেবিলের জন্য CRUD ফাংশনগুলি রপ্তানি করুন
3. নতুন টেবিল প্রয়োজন হলে `src/lib/db/migrations/` এ মাইগ্রেশন যোগ করুন
4. `src/lib/localDb.ts` থেকে পুনঃ-রপ্তানি করুন (শুধুমাত্র পুনঃ-রপ্তানি তালিকায় যোগ করুন)
5. টেস্ট লিখুন

### নতুন MCP টুল যোগ করা

1. Zod ইনপুট স্কিমা + অ্যাসিঙ্ক হ্যান্ডলার সহ `open-sse/mcp-server/tools/` এ টুল সংজ্ঞা যোগ করুন
2. টুল সেটে নিবন্ধন করুন ( `createMcpServer()` দ্বারা সংযুক্ত)
3. উপযুক্ত স্কোপে বরাদ্দ করুন
4. টেস্ট লিখুন (টুল আহ্বান `mcp_audit` টেবিলে লগ করা হয়েছে)

### নতুন A2A স্কিল যোগ করা

1. `src/lib/a2a/skills/` এ স্কিল তৈরি করুন (5 ইতিমধ্যে বিদ্যমান: স্মার্ট-রাউটিং, কোটা-ব্যবস্থাপনা, প্রদানকারী-আবিষ্কার, খরচ-বিশ্লেষণ, স্বাস্থ্য-রিপোর্ট)
2. স্কিল কাজের প্রসঙ্গ (বার্তা, মেটাডেটা) গ্রহণ করে → কাঠামোবদ্ধ ফলাফল ফেরত দেয়
3. `src/lib/a2a/taskExecution.ts` এ `A2A_SKILL_HANDLERS` এ নিবন্ধন করুন
4. `src/app/.well-known/agent.json/route.ts` এ প্রকাশ করুন (এজেন্ট কার্ড)
5. `tests/unit/` এ টেস্ট লিখুন
6. `docs/frameworks/A2A-SERVER.md` স্কিল টেবিলে ডকুমেন্ট করুন

### নতুন ক্লাউড এজেন্ট যোগ করা

1. `src/lib/cloudAgent/agents/` এ `CloudAgentBase` প্রসারিত করে এজেন্ট ক্লাস তৈরি করুন (3 ইতিমধ্যে বিদ্যমান: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` বাস্তবায়ন করুন
3. `src/lib/cloudAgent/registry.ts` এ নিবন্ধন করুন
4. প্রয়োজন হলে OAuth/শংসাপত্র পরিচালনা যোগ করুন (`src/lib/oauth/providers/`)
5. টেস্ট + `docs/frameworks/CLOUD_AGENT.md` এ ডকুমেন্ট করুন

### নতুন গার্ডরেল / ইভ্যাল / স্কিল / ওয়েবহুক ইভেন্ট যোগ করা

- গার্ডরেল: `src/lib/guardrails/` → ডকস: `docs/security/GUARDRAILS.md`
- ইভ্যাল স্যুট: `src/lib/evals/` → ডকস: `docs/frameworks/EVALS.md`
- স্কিল (স্যান্ডবক্স): `src/lib/skills/` → ডকস: `docs/frameworks/SKILLS.md`
- ওয়েবহুক ইভেন্ট: `src/lib/webhookDispatcher.ts` → ডকস: `docs/frameworks/WEBHOOKS.md`

## রেফারেন্স ডকুমেন্টেশন

যেকোনো অ-তাত্ত্বিক পরিবর্তনের জন্য, প্রথমে সংশ্লিষ্ট গভীর বিশ্লেষণ পড়ুন:

| এলাকা                                      | ডক                                                                |
| ------------------------------------------ | ----------------------------------------------------------------- |
| রিপো নেভিগেশন                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| স্থাপত্য                                   | `docs/architecture/ARCHITECTURE.md`                               |
| প্রকৌশল রেফারেন্স                          | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| অটো-কম্বো (৯-ফ্যাক্টর স্কোরিং, ১৪ কৌশল)    | `docs/routing/AUTO-COMBO.md`                                      |
| স্থিতিশীলতা (৩ মেকানিজম)                   | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| যুক্তি পুনরায় খেলা                        | `docs/routing/REASONING_REPLAY.md`                                |
| দক্ষতা ফ্রেমওয়ার্ক                        | `docs/frameworks/SKILLS.md`                                       |
| মেমরি সিস্টেম (FTS5 + Qdrant)              | `docs/frameworks/MEMORY.md`                                       |
| ক্লাউড এজেন্ট                              | `docs/frameworks/CLOUD_AGENT.md`                                  |
| গার্ডরেইলস (PII / ইনজেকশন / ভিশন)          | `docs/security/GUARDRAILS.md`                                     |
| পাবলিক আপস্ট্রিম শংসাপত্র (জেমিনি/ইত্যাদি) | `docs/security/PUBLIC_CREDS.md`                                   |
| ত্রুটি বার্তা স্যানিটাইজেশন                | `docs/security/ERROR_SANITIZATION.md`                             |
| ইভালস                                      | `docs/frameworks/EVALS.md`                                        |
| সম্মতি / অডিট                              | `docs/security/COMPLIANCE.md`                                     |
| ওয়েবহুকস                                  | `docs/frameworks/WEBHOOKS.md`                                     |
| অনুমোদন পাইপলাইন                           | `docs/architecture/AUTHZ_GUIDE.md`                                |
| স্টেলথ (TLS / ফিঙ্গারপ্রিন্ট)              | `docs/security/STEALTH_GUIDE.md`                                  |
| এজেন্ট প্রোটোকল (A2A / ACP / ক্লাউড)       | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP সার্ভার                                | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A সার্ভার                                | `docs/frameworks/A2A-SERVER.md`                                   |
| API রেফারেন্স + OpenAPI                    | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| প্রোভাইডার ক্যাটালগ (অটো-জেনারেটেড)        | `docs/reference/PROVIDER_REFERENCE.md`                            |
| রিলিজ ফ্লো                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## পরীক্ষা

| কি                      | কমান্ড                                                         |
| ----------------------- | -------------------------------------------------------------- |
| ইউনিট পরীক্ষা           | `npm run test:unit`                                            |
| একক ফাইল                | `node --import tsx/esm --test tests/unit/file.test.ts`         |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                          |
| E2E (Playwright)        | `npm run test:e2e`                                             |
| প্রোটোকল E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                   |
| ইকোসিস্টেম              | `npm run test:ecosystem`                                       |
| কভারেজ গেট              | `npm run test:coverage` (75/75/75/70 — বিবৃতি/লাইন/ফাংশন/শাখা) |
| কভারেজ রিপোর্ট          | `npm run coverage:report`                                      |

**PR নিয়ম**: যদি আপনি `src/`, `open-sse/`, `electron/`, বা `bin/` এ উৎপাদন কোড পরিবর্তন করেন, তাহলে আপনাকে একই PR-এ পরীক্ষা অন্তর্ভুক্ত বা আপডেট করতে হবে।

**পরীক্ষার স্তরের পছন্দ**: ইউনিট প্রথম → ইন্টিগ্রেশন (মাল্টি-মডিউল বা DB অবস্থা) → e2e (UI/কর্মপ্রবাহ শুধুমাত্র)। বাগ পুনরুত্পাদনগুলি স্বয়ংক্রিয় পরীক্ষার মতো কোড করুন সংশোধনের আগে বা তার সাথে।

**কোপাইলট কভারেজ নীতি**: যখন একটি PR উৎপাদন কোড পরিবর্তন করে এবং কভারেজ 75% (বিবৃতি/লাইন/ফাংশন) বা 70% (শাখা) এর নিচে থাকে, তখন শুধু রিপোর্ট করবেন না — পরীক্ষা যোগ করুন বা আপডেট করুন, কভারেজ গেট পুনরায় চালান, তারপর নিশ্চিতকরণের জন্য জিজ্ঞাসা করুন। PR রিপোর্টে চালানো কমান্ড, পরিবর্তিত পরীক্ষার ফাইল এবং চূড়ান্ত কভারেজ ফলাফল অন্তর্ভুক্ত করুন।

---

## গিট ওয়ার্কফ্লো

```bash
# কখনও সরাসরি main এ কমিট করবেন না
git checkout -b feat/your-feature
git commit -m "feat: আপনার পরিবর্তন বর্ণনা করুন"
git push -u origin feat/your-feature
```

**শাখার প্রিফিক্স**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**কমিট ফরম্যাট** (কনভেনশনাল কমিটস): `feat(db): circuit breaker যোগ করুন` — স্কোপ: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**হাস্কি হুকস**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## পরিবেশ

- **রানটাইম**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES মডিউল
- **টাইপস্ক্রিপ্ট**: 5.9+, লক্ষ্য ES2022, মডিউল esnext, রেজোলিউশন bundler
- **পথ অ্যালিয়াস**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **ডিফল্ট পোর্ট**: 20128 (API + ড্যাশবোর্ড একই পোর্টে)
- **ডেটা ডিরেক্টরি**: `DATA_DIR` env var, ডিফল্ট `~/.omniroute/`
- **মূল env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- সেটআপ: `cp .env.example .env` তারপর `JWT_SECRET` (`openssl rand -base64 48`) এবং `API_KEY_SECRET` (`openssl rand -hex 32`) তৈরি করুন

---

## কঠোর নিয়ম

1. কখনও গোপনীয়তা বা শংসাপত্র কমিট করবেন না
2. কখনও `localDb.ts` এ লজিক যোগ করবেন না
3. কখনও `eval()` / `new Function()` / ইম্প্লাইড eval ব্যবহার করবেন না
4. কখনও সরাসরি `main` এ কমিট করবেন না
5. কখনও রুটে কাঁচা SQL লিখবেন না — `src/lib/db/` মডিউল ব্যবহার করুন
6. কখনও SSE স্ট্রিমে ত্রুটি নীরবভাবে গিলে ফেলবেন না
7. সর্বদা Zod স্কিমা দিয়ে ইনপুট যাচাই করুন
8. উৎপাদন কোড পরিবর্তন করার সময় সর্বদা পরীক্ষা অন্তর্ভুক্ত করুন
9. কভারেজ ≥75% (বিবৃতি, লাইন, ফাংশন) / ≥70% (শাখা) থাকতে হবে। বর্তমান পরিমাপ: ~82%।
10. কখনও হাস্কি হুকস (`--no-verify`, `--no-gpg-sign`) বাইপাস করবেন না স্পষ্ট অপারেটর অনুমোদন ছাড়া।
11. কখনও পাবলিক আপস্ট্রিম OAuth client_id/secret বা Firebase ওয়েব কীকে স্ট্রিং লিটারেল হিসাবে এম্বেড করবেন না — সর্বদা `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) এর মাধ্যমে যান। দেখুন `docs/security/PUBLIC_CREDS.md`।
12. কখনও HTTP / SSE / এক্সিকিউটর প্রতিক্রিয়াতে কাঁচা `err.stack` / `err.message` ফেরত দেবেন না — সর্বদা `buildErrorBody()` বা `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) এর মাধ্যমে রুট করুন। দেখুন `docs/security/ERROR_SANITIZATION.md`।
13. কখনও শেল স্ক্রিপ্টে বাহ্যিক পথ বা রানটাইম মানগুলি `exec()`/`spawn()` এ পাস করার সময় স্ট্রিং-ইন্টারপোলেট করবেন না — পরিবর্তে `env` অপশন দ্বারা পাস করুন। রেফারেন্স: `src/mitm/cert/install.ts::updateNssDatabases`।
14. কখনও CodeQL / Secret-Scanning সতর্কতা অগ্রাহ্য করবেন না (a) প্রথমে উপরের প্যাটার্ন ডকস চেক করে দেখুন যে সহায়কটি প্রযোজ্য কিনা, এবং (b) অগ্রাহ্য মন্তব্যে প্রযুক্তিগত যুক্তি রেকর্ড করুন। প্রিসিডেন্ট: `js/stack-trace-exposure` কলসাইটে উত্থাপিত হয়েছে যা ইতিমধ্যে `sanitizeErrorMessage()` এর মাধ্যমে রুট করে এটি একটি পরিচিত CodeQL সীমাবদ্ধতা (কাস্টম স্যানিটাইজার স্বীকৃত নয়) — `false positive` হিসাবে অগ্রাহ্য করুন `docs/security/ERROR_SANITIZATION.md` উল্লেখ করে।
15. কখনও শিশু প্রক্রিয়া স্পন করে এমন রুটগুলি প্রকাশ করবেন না (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` এ `isLocalOnlyPath()` শ্রেণীবিভাগ ছাড়া। লুপব্যাক প্রয়োগ যে কোনও প্রমাণীকরণ চেকের আগে শর্তহীনভাবে ঘটে — টানেলের মাধ্যমে ফাঁস হওয়া JWT প্রক্রিয়া স্পনিংকে ট্রিগার করতে পারে না। দেখুন `docs/security/ROUTE_GUARD_TIERS.md`।
16. কখনও কমিট বার্তায় `Co-Authored-By` ট্রেইলার অন্তর্ভুক্ত করবেন না। কমিটগুলি শুধুমাত্র রিপোজিটরি মালিকের গিট পরিচয় (`diegosouzapw`) এর অধীনে প্রদর্শিত হতে হবে। `Co-Authored-By: Claude …` লাইনটি GitHub-কে কমিটগুলি `claude` অ্যানথ্রোপিক অ্যাকাউন্টে অ্যাট্রিবিউট করতে বাধ্য করে, PR ইতিহাসে প্রকৃত লেখককে লুকিয়ে রাখে।
