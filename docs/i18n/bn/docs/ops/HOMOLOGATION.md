# Homologation Suite (`npm run homolog`) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

হোমোলোগেশন VPS-এ চলমান OmniRoute ডিপ্লয়ের বাস্তব-পরিবেশ E2E যাচাইকরণ
(`HOMOLOG_BASE_URL`, যেমন `http://192.168.0.15:20128`)। একটি কমান্ড ম্যানুয়াল
রিলিজ STOP #2 চেকলিস্টকে একটি স্বয়ংক্রিয়, প্রমাণ-উৎপাদনকারী রান দিয়ে প্রতিস্থাপন করে।

## এটি যা অন্তর্ভুক্ত করে

| স্তর                         | যা যাচাই করে                                                                                                                                                                                                              | বাস্তবায়ন                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — স্বাস্থ্য/সামঞ্জস্য     | `/api/monitoring/health` প্রত্যাশিত সংস্করণ এবং `status: "healthy"` সহ `200` রেসপন্স দেয়                                                                                                                                 | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — অস্থায়ী কী            | অ্যাডমিন লগইন → `POST /api/keys` রানের জন্য একটি নির্দিষ্ট-স্কোপের API কী তৈরি করে, যা ফলাফল নির্বিশেষে একটি `finally` ব্লকে প্রত্যাহার (`DELETE /api/keys/:id`) করা হয়                                                  | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API সারফেস             | `/v1/models` ক্যাটালগ, একটি বাস্তব নন-স্ট্রিমিং চ্যাট কমপ্লিশন (টিয়ার-ক্রিটিক্যাল মডেল, `max_tokens: 5`), একটি অবৈধ-কী `401`, এবং পাবলিক `/api/monitoring/health`                                                        | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE স্ট্রিমিং          | বাস্তব স্ট্রিমিং চ্যাট কমপ্লিশন; `text/event-stream`, অন্তত একটি কনটেন্ট ডেল্টা এবং একটি `[DONE]` টার্মিনেটর নিশ্চিত করে                                                                                                  | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — বাস্তব প্রোভাইডার       | লাইভ `/v1/models` ক্যাটালগে উপস্থিত প্রতিটি গুরুত্বপূর্ণ প্রোভাইডারের জন্য একটি ন্যূনতম-খরচের চ্যাট রিকোয়েস্ট, যা promptfoo-এর মাধ্যমে তাৎক্ষণিকভাবে তৈরি হয়                                                            | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI অথেন্টিকেশন         | বাস্তব লগইন ফর্মের মাধ্যমে একবার লগইন করে এবং পুরো UI স্তরে সেশনটি (`storageState`) পুনঃব্যবহার করে                                                                                                                       | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI রুটসমূহ             | `src/app/(dashboard)/dashboard`-এর অধীনে থাকা প্রতিটি স্ট্যাটিক `page.tsx` (ফাইলসিস্টেম থেকে শনাক্ত করা হয়, ডায়নামিক `[param]` রুট বাদ দেওয়া হয়) কোনো HTTP ত্রুটি, পেজ ত্রুটি বা Next.js এরর বাউন্ডারি ছাড়াই লোড হয় | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI গুরুত্বপূর্ণ প্রবাহ | ড্যাশবোর্ড UI-এর মাধ্যমে একটি API কী তৈরি করে এবং সেটি আবার প্রত্যাহার করে (VPS-এ কোনো অবশিষ্টাংশ রাখে না)                                                                                                                | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — সমন্বিত রিপোর্ট         | httpYac (`junit-to-ctrf`-এর মাধ্যমে), promptfoo→CTRF অ্যাডাপ্টার এবং Playwright CTRF রিপোর্টারকে একটি `homolog-ctrf.json`-এ একত্রিত করে, সঙ্গে একটি মানুষের-পাঠযোগ্য `homolog-report/summary.md`                          | `scripts/homolog/run.mjs`                                                     |

রিপ্লে নিজেই কোনো LLM ব্যবহার করে না — এটি একটি নির্ধারণযোগ্য রিগ্রেশন ব্যাটারি,
কোনো ইভ্যাল নয়। AI কেবল ভবিষ্যৎ রক্ষণাবেক্ষণের কাজে ব্যবহৃত হবে (নিচের রোডম্যাপ দেখুন)।

## পূর্বশর্তসমূহ

1. `.env.homolog.example`-কে `.env.homolog`-এ কপি করুন (gitignored — এটি কখনো commit করবেন না) এবং নিচের মানগুলো পূরণ করুন:
   - `HOMOLOG_BASE_URL` — লক্ষ্য deploy, যেমন `http://192.168.0.15:20128`।
   - `HOMOLOG_ADMIN_PASSWORD` — ওই deploy-এর dashboard ব্যবস্থাপনার password।
   - `HOMOLOG_CRITICAL_PROVIDERS` — কমা দিয়ে পৃথক করা provider prefix, যেগুলো একটি বাস্তব
     smoke chat request পাবে (যেমন `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`)।
   - `HOMOLOG_API_KEY` — স্বাভাবিক run-এ খালি রাখুন; suite নিজস্ব ক্ষণস্থায়ী key তৈরি করে এবং
     বাতিল করে। শুধু বিচ্ছিন্নভাবে একটি layer debug করতে এটি সেট করুন।
2. repo-তে `npm install` চালান (suite-এর dependency-গুলো — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — নিয়মিত devDependencies)।
3. browser binary-গুলো আগে থেকে উপস্থিত না থাকলে `npx playwright install` চালান।

## কীভাবে চালাবেন

```bash
npm run homolog
```

যে deploy-এর version স্থানীয় `package.json`-এর সঙ্গে মেলে না, সেটির বিপরীতে যাচাই করতে
(যেমন কোনো homologation box এখনো আগের patch release-এ রয়েছে), প্রত্যাশিত version
স্পষ্টভাবে override করুন:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

কোনো layer ব্যর্থ হলে run একটি non-zero exit code দিয়ে শেষ হয় এবং ব্যর্থতার ক্ষেত্রেও
এটি সর্বদা নিজের তৈরি ক্ষণস্থায়ী API key বাতিল করার চেষ্টা করে (`scripts/homolog/run.mjs`-এর `finally` block)।

## রিপোর্ট পড়া

সব output `homolog-report/`-এ জমা হয় (gitignored):

- `summary.md` — stdout-এ print হওয়া একই table, প্রতি layer-এর জন্য একটি row (✅/❌ + বিস্তারিত)।
- `homolog-ctrf.json` — সমন্বিত CTRF report (API/SSE, provider-smoke এবং
  UI result-এর merge) — এটিই release STOP #2 checklist-এর সঙ্গে সংযুক্ত করার artifact।
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — প্রতিটি
  layer-এর raw/intermediate report।
- `promptfooconfig.yaml`, `provider-misses.json` — বর্তমান run-এর জন্য তৈরি promptfoo config
  এবং live catalog-এ অনুপস্থিত যেকোনো critical provider।

L0 ব্যর্থ হলে সঙ্গে সঙ্গে abort হয় (কোনো ক্ষণস্থায়ী key তৈরি করা হয় না), কারণ version/health
mismatch-এর অর্থ হলো পরবর্তী প্রতিটি layer ভুল deploy যাচাই করবে।

## UI বৈধভাবে পরিবর্তিত হলে পুনরায় baseline নির্ধারণ

L4b (route smoke) এবং L4c (API-key UI flow) snapshot-এর বদলে বাস্তব DOM locator দ্বারা
পরিচালিত হয়, তাই অধিকাংশ বৈধ UI পরিবর্তনের জন্য suite update প্রয়োজন হয় না। কোনো পরিবর্তন
locator ভেঙে দিলে (যেমন rename করা button label বা সরানো settings page):

1. বর্তমান source-এর বিপরীতে locator পুনরায় নিশ্চিত করুন (কোন locator কোন
   file/line-এর বিপরীতে নিশ্চিত করা হয়েছিল, spec-গুলোতে তা ইতিমধ্যেই নথিভুক্ত আছে — একই pattern অনুসরণ করুন, অনুমান করবেন না)।
2. `tests/homolog/ui/`-এর spec update করুন।
3. fix নিশ্চিত করতে VPS-এর বিপরীতে `npm run homolog` (অথবা শুধু প্রভাবিত Playwright spec) পুনরায়
   চালান, তারপর commit করুন।

এই suite-এ কোনো visual/pixel baseline নেই (F1) — এটির জন্য Roadmap দেখুন।

## Roadmap (F2 / F3)

Design এবং পর্যায়ক্রমিক rollout অভ্যন্তরীণ planning spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md`-এ রয়েছে (link করা হয়নি — অভ্যন্তরীণ
`_tasks/` artifact, এই repo-এর tracked docs-এর অংশ নয়)। সারসংক্ষেপ:

- **F2** — সম্পূর্ণ walkthrough recording → Playwright Test Agents (`planner`/`generator`)
  এটিকে flow spec-এ রূপান্তর করে (combo তৈরি, provider পরীক্ষা, settings edit, MCP tools) +
  dynamic data-এর (metrics, timestamps, logs) ওপর mask-সহ visual regression baseline (Lost Pixel) +
  প্রতি release-এ একটি `healer` maintenance routine।
- **F3** — resilience/contract/wiring coverage: devbox-এ toxiproxy + একটি নকল OpenAI-compatible
  provider, VPS-এ সেটির দিকে নির্দেশিত একটি `homolog-resilience` combo
  (injected timeout → fallback + `/api/monitoring/health`-এর মাধ্যমে circuit breaker open/close assert);
  `docs/openapi.yaml`-এর বিপরীতে gated Schemathesis contract testing (কম `--max-examples`, স্থির seed,
  শুধু non-LLM endpoint); এবং `/generate-release` STOP #2 phase-এ `npm run homolog` + এর `summary.md` wiring।
