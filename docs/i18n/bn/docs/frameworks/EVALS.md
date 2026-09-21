# Evaluations (Evals) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **মূল তথ্যসূত্র:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40

OmniRoute-এর সঙ্গে একটি সাধারণ মূল্যায়ন ফ্রেমওয়ার্ক অন্তর্ভুক্ত রয়েছে, যা ব্যবহার করে আপনি রাউটিং কনফিগারেশন, একক প্রোভাইডার/মডেল অথবা সঙ্গে থাকা "golden set" স্যুটগুলোর কার্যকারিতা পরিমাপ করতে পারেন।
প্রোডাকশন ট্র্যাফিকে উন্নীত করার আগে রাউটিং পরিবর্তন যাচাই, নতুন প্রোভাইডার যাচাই এবং রিলিজ অনুমোদন নিয়ন্ত্রণ করতে এটি ব্যবহার করুন।

ফ্রেমওয়ার্কটি নিম্নলিখিতভাবে বাস্তবায়িত হয়েছে:

- একটি বিশুদ্ধ রানার (`src/lib/evals/evalRunner.ts`), যা ইন-মেমরি
  বিল্ট-ইন স্যুট নিবন্ধন করে, প্রত্যাশিত মানদণ্ডের বিপরীতে আউটপুট মূল্যায়ন করে এবং
  স্কোরকার্ড একত্রিত করে।
- কাস্টম (ব্যবহারকারী-সংজ্ঞায়িত) স্যুট
  এবং SQLite-এ ঐতিহাসিক রানগুলোর জন্য একটি পারসিস্টেন্স স্তর (`src/lib/db/evals.ts`)।
- একটি অর্কেস্ট্রেশন স্তর (`src/lib/evals/runtime.ts`), যা `POST /v1/chat/completions`-এ
  বাস্তব কল পাঠিয়ে প্রতিটি কেস নির্বাহ করে, ল্যাটেন্সি
  ও আউটপুট ধারণ করে এবং রানটি সংরক্ষণ করে।
- `/api/evals/*`-এর অধীনে REST এন্ডপয়েন্ট (শুধু ম্যানেজমেন্ট-অথ অনুমোদিত)।
- `Dashboard → Usage → Evals`-এ একটি ড্যাশবোর্ড ইন্টারফেস (`EvalsTab.tsx`)।

## ধারণাসমূহ

### স্যুট

একটি স্যুট হলো `description` এবং এক বা
একাধিক কেসসহ পরীক্ষামূলক কেসের একটি নামযুক্ত সংগ্রহ। স্যুট দুটি উৎস থেকে আসে:

| উৎস        | কোথায় সংজ্ঞায়িত                                 | রানটাইমে পরিবর্তনযোগ্য?   |
| ---------- | ------------------------------------------------- | ------------------------- |
| `built-in` | বুটের সময় `registerSuite()`-এর মাধ্যমে নিবন্ধিত  | না (কোডে সংজ্ঞায়িত)      |
| `custom`   | SQLite-এর `eval_suites` + `eval_cases`-এ সংরক্ষিত | হ্যাঁ (API/UI-এর মাধ্যমে) |

বর্তমান বিল্ট-ইন স্যুটগুলো (`src/lib/evals/evalRunner.ts` দেখুন):

- `golden-set` — অভিবাদন/গণিত/অনুবাদ/নিরাপত্তাজুড়ে ১০টি বেসলাইন কেস
- `coding-proficiency` — Python/JS/SQL/TS/বাগ শনাক্তকরণ
- `reasoning-logic` — সিলোজিজম, শব্দভিত্তিক সমস্যা, প্যাটার্ন শনাক্তকরণ
- `multilingual` — অনুবাদ ও ভাষা শনাক্তকরণ
- `safety-guardrails` — PII, জেইলব্রেক, প্রত্যাখ্যান, পক্ষপাত সম্পর্কে সচেতনতা
- `instruction-following` — শুধু JSON, নম্বরযুক্ত তালিকা, ভাষাগত সীমাবদ্ধতা
- `codex-comparison` — তুলনা মোডের জন্য তৈরি সরাসরি প্রতিযোগিতামূলক কোডিং টাস্ক

### কেস

প্রতিটি কেসে থাকে:

| ফিল্ড      | বিবরণ                                                             |
| ---------- | ----------------------------------------------------------------- |
| `id`       | স্থিতিশীল শনাক্তকারী (আউটপুট ও মেট্রিকের কী হিসেবে ব্যবহৃত)       |
| `name`     | মানুষের পাঠযোগ্য লেবেল                                            |
| `model`    | রানটি `suite-default` টার্গেটিং ব্যবহার করলে ডিফল্ট মডেল          |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions`-এ পাঠানো হয় |
| `expected` | `{ strategy, value }` — স্কোরিং রুব্রিক (নিচে দেখুন)              |
| `tags`     | ঐচ্ছিক লেবেল (যেমন `safety`, `pii`, `jailbreak`)                  |

### টার্গেট

একই স্যুট ভিন্ন টার্গেটের বিপরীতে চালানো যায়। টার্গেট স্কিমা হলো
`src/shared/validation/schemas.ts`-এ থাকা `evalTargetSchema`:

| টার্গেটের ধরন   | `id`       | আচরণ                                                                       |
| --------------- | ---------- | -------------------------------------------------------------------------- |
| `suite-default` | `null`     | প্রতিটি কেস তার বিল্ট-ইন `model` ফিল্ড ব্যবহার করে                         |
| `model`         | মডেলের নাম | প্রতিটি কেসকে একটি সরাসরি মডেলের মধ্য দিয়ে যেতে বাধ্য করে (যেমন `gpt-4o`) |
| `combo`         | কম্বোর নাম | প্রতিটি কেসকে একটি কম্বোর মধ্য দিয়ে চালায় (রাউটিং ইঞ্জিন ব্যবহার করে)    |

`model` এবং `combo`-এর ক্ষেত্রে `id` ফিল্ডটি আবশ্যক (Zod
`superRefine` দ্বারা বলবৎ)। `compareTarget` প্রদান করা হলে, উভয় টার্গেট অবশ্যই আলাদা হতে হবে —
A/B তুলনার জন্য রানার উভয় রানকে একই `runGroupId`-এর অধীনে সংরক্ষণ করে।

## স্কোরিং রুব্রিক

`evaluateCase()`-এ (evalRunner.ts) বাস্তবায়িত:

| কৌশল       | পাস করবে যখন…                                                        |
| ---------- | -------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                    |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`  |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` সত্য হয়             |
| `custom`   | `expected.fn(actualOutput, evalCase)` সত্য ফেরত দেয় (শুধু বিল্ট-ইন) |

**দ্রষ্টব্য:** কাস্টম-ফাংশন স্কোরিং কোডে সংজ্ঞায়িত (বিল্ট-ইন) স্যুটগুলোর জন্য
সংরক্ষিত, কারণ API-এর মাধ্যমে ফাংশন সিরিয়ালাইজ করা যায় না।
ব্যবহারকারীর তৈরি স্যুটগুলোর জন্য `evalCaseBuilderSchema` শুধু
`contains | exact | regex` গ্রহণ করে।

বর্তমানে কোনো LLM-as-judge বা এম্বেডিং-ভিত্তিক সাদৃশ্য স্কোরার নেই — এটি
`evaluateCase()`-এ একটি পরিচ্ছন্ন এক্সটেনশন পয়েন্ট হতে পারে।

## ডেটাবেস স্কিমা

তিনটি টেবিল (মাইগ্রেশন `030_create_eval_runs.sql` এবং
`031_create_eval_suites.sql`):

| টেবিল         | উদ্দেশ্য                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | কাস্টম স্যুটের মেটাডেটা (`id`, `name`, `description`)                                                                     |
| `eval_cases`  | প্রতিটি স্যুটের কেস — `input_json`, `expected_*`, `tags_json`                                                             |
| `eval_runs`   | ঐতিহাসিক রান — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

বিল্ট-ইন স্যুটগুলো DB-তে সংরক্ষিত হয় **না**। এগুলো মেমরিতে থাকে এবং
প্রতিবার `evalRunner.ts` ইমপোর্ট করা হলে পুনরায় নিবন্ধিত হয়।

## REST API

সব এন্ডপয়েন্টে ম্যানেজমেন্ট অথ (`requireManagementAuth`) আবশ্যক — এগুলো
পাবলিক প্রক্সি সারফেসের অংশ নয়।

| এন্ডপয়েন্ট                   | মেথড     | বিবরণ                                                               |
| ----------------------------- | -------- | ------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | স্যুট + সাম্প্রতিক রান + স্কোরকার্ড + টার্গেট + কী-এর তালিকা দেখায় |
| `/api/evals`                  | `POST`   | একটি স্যুট চালায় (একক বা তুলনা) — স্কিমা `evalRunSuiteSchema`      |
| `/api/evals/{suiteId}`        | `GET`    | একটি স্যুট আনে (বিল্ট-ইন বা কাস্টম)                                 |
| `/api/evals/suites`           | `POST`   | একটি কাস্টম স্যুট তৈরি করে — স্কিমা `evalSuiteSaveSchema`           |
| `/api/evals/suites/{suiteId}` | `GET`    | একটি কাস্টম স্যুট আনে                                               |
| `/api/evals/suites/{suiteId}` | `PUT`    | একটি কাস্টম স্যুট প্রতিস্থাপন করে (কেসগুলো পুনরায় ইনসার্ট করা হয়) |
| `/api/evals/suites/{suiteId}` | `DELETE` | একটি কাস্টম স্যুট এবং এর কেসগুলো মুছে দেয়                          |

### একটি স্যুট চালানো

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

ঐচ্ছিক ফিল্ড:

- `outputs` — আগে থেকে গণনা করা আউটপুটের `Record<caseId, string>`। এটি প্রদান
  করা হলে, রানার **ডিসপ্যাচ এড়িয়ে যায়** এবং শুধু ক্যাশ করা আউটপুটগুলো স্কোর
  করে (অফলাইন মূল্যায়নের জন্য উপযোগী)।
- `compareTarget` — সমান্তরালে চালানোর জন্য দ্বিতীয় টার্গেট; মুখোমুখি তুলনামূলক
  প্রদর্শনের জন্য উভয় রান একই জেনারেট করা `runGroupId` শেয়ার করে।
- `apiKeyId` — ডিসপ্যাচ করা `/v1/chat/completions` কলগুলো প্রমাণীকরণে ব্যবহৃত
  অভ্যন্তরীণ API কী। `REQUIRE_API_KEY` সক্রিয় থাকলে এটি আবশ্যক।

### একটি কাস্টম স্যুট তৈরি করা

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## ডিসপ্যাচ পাইপলাইন

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. স্যুটটি সমাধান করে (বিল্ট-ইন বা কাস্টম)।
2. প্রতিটি কেসের জন্য, কেসটির `messages`, সমাধান করা `model`, `stream: false`, এবং `max_tokens: 512`
   (অথবা কেসের ওভাররাইড) দিয়ে `/v1/chat/completions`-এ একটি `Request` তৈরি করে।
3. চ্যাট হ্যান্ডলারকে সরাসরি কল করে (ইন-প্রসেস — অতিরিক্ত কোনো HTTP হপ ছাড়াই)।
4. লেটেন্সি ধারণ করে এবং `choices[0].message.content` অথবা Responses-API-এর
   `output[]` পেলোড থেকে টেক্সট বের করে।
5. `runSuite()`-এর মাধ্যমে সব আউটপুট স্কোর করে, তারপর `saveEvalRun()`-এর মাধ্যমে সংরক্ষণ করে।

কেসগুলো **ধারাবাহিকভাবে** চলে। বর্তমানে কোনো কনকারেন্সি ফ্ল্যাগ নেই।

## ড্যাশবোর্ড

UI-টি `Dashboard → Usage → Evals`-এ অবস্থিত
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`)। সেখান থেকে আপনি
যা করতে পারবেন:

- প্রতিটি কেসের প্রিভিউসহ বিল্ট-ইন ও কাস্টম স্যুট ব্রাউজ করা।
- কেস বিল্ডার দিয়ে কাস্টম স্যুট তৈরি/সম্পাদনা/মুছে ফেলা।
- একটি টার্গেট (স্যুটের ডিফল্ট / মডেল / কম্বো), ঐচ্ছিকভাবে দ্বিতীয় একটি
  `compareTarget`, ঐচ্ছিকভাবে একটি API কী বেছে নিয়ে চাহিদামতো রান করা।
- রান ইতিহাস, প্রতিটি কেসের পাস/ফেল, লেটেন্সি এবং ধারণ করা আউটপুট পরিদর্শন করা।
- প্রতিটি `(suite, target)` স্কোপের সর্বশেষ রানজুড়ে সমন্বিত রোলিং স্কোরকার্ড দেখা।

## Auto-Assessment RFC-এর সঙ্গে সম্পর্ক

একটি পৃথক ও অপেক্ষাকৃত সীমিত অ্যাসেসমেন্ট সাবসিস্টেম `src/domain/assessment/`-এ অবস্থিত
(সক্রিয় স্কোরিং ইঞ্জিনের জন্য [AUTO-COMBO.md](../routing/AUTO-COMBO.md)-ও দেখুন)।
সাবসিস্টেমটি Auto Combo ইঞ্জিনকে লক্ষ্য করে — প্রোভাইডার ও
মডেলগুলোকে স্বয়ংক্রিয়ভাবে স্কোর করে, যাতে আপস্ট্রিম ব্যর্থ হলে কম্বোগুলো নিজে থেকেই পুনরুদ্ধার করতে পারে। এটি নিজস্ব রানার,
নিজস্ব ক্যাটাগরাইজার এবং নিজস্ব স্কোরিং লজিক ব্যবহার করে।

এখানে নথিভুক্ত Evals ফ্রেমওয়ার্কটি হলো **আরও বিস্তৃত, সাধারণ-উদ্দেশ্যের
টেস্টিং সারফেস**। যেকোনো রিগ্রেশন স্যুট, A/B তুলনা
এবং প্রতি-রিলিজের স্মোক টেস্টের জন্য এটিকে অগ্রাধিকার দিন। রাউটিং সিদ্ধান্তে
প্রভাব ফেলতে রিয়েল-টাইম প্রোভাইডার স্বাস্থ্য দরকার হলে Auto-Assessment সাবসিস্টেম ব্যবহার করুন।

## CI ইন্টিগ্রেশন

বর্তমানে কোনো নিবেদিত `eval:ci` npm স্ক্রিপ্ট নেই। ইভ্যাল ফলাফলের ভিত্তিতে
রিলিজ গেট করতে চাইলে দুটি উপায় রয়েছে:

- **HTTP পদ্ধতি**: সার্ভার চালু করুন, পরিচিত একটি
  `suiteId` + `target` দিয়ে `POST /api/evals` কল করুন এবং রেসপন্সে
  `runs[].summary.passRate >= N` নিশ্চিত করুন।
- **ইন-প্রসেস পদ্ধতি**: একটি স্ক্রিপ্ট থেকে
  `@/lib/evals/runtime`-এর `runEvalSuiteAgainstTarget()` ইমপোর্ট করুন, একটি টেস্ট DB-এর বিপরীতে চালান এবং
  ফেরত পাওয়া `PersistedEvalRun.summary` পরীক্ষা করুন।

রুট ও ইতিহাস কভার করা টেস্টগুলো
`tests/unit/evals-route.test.ts` এবং `tests/unit/evals-history.test.ts`-এ রয়েছে।

## এক্সটেনশন পয়েন্ট

সাধারণ পরিবর্তন এবং সেগুলো কোথায় করতে হবে:

- **নতুন স্কোরিং কৌশল** — `evaluateCase()` (`evalRunner.ts`)-এর
  `switch (evalCase.expected.strategy)` ব্লকটি বর্ধিত করুন এবং
  `src/lib/db/evals.ts`-এর `EvalCaseStrategy` ও `schemas.ts`-এর `evalCaseBuilderSchema` বিস্তৃত করুন।
- **নতুন বিল্ট-ইন স্যুট** — একটি স্যুট অবজেক্ট সংজ্ঞায়িত করুন এবং
  `evalRunner.ts`-এর নিচের দিকে `registerSuite()` কল করুন। এটি `listSuites()` দ্বারা স্বয়ংক্রিয়ভাবে আবিষ্কৃত হবে।
- **কনকারেন্সিসহ রান** — `runEvalSuiteAgainstTarget()`-এর ধারাবাহিক `for` লুপটি
  একটি সীমাবদ্ধ `Promise.all`-এ পরিবর্তন করুন (বর্তমানে কোনো কনকারেন্সি
  নিয়ন্ত্রণ নেই)।
- **স্ট্রিম/টুল-কল কেস** — বর্তমানে রানারটি বাধ্যতামূলকভাবে `stream: false` ব্যবহার করে।
  স্ট্রিমিং বা টুল-সচেতন মূল্যায়নের জন্য `runtime.ts`-এ পরিবর্তন প্রয়োজন
  (স্কোরিংয়ের আগে SSE চাঙ্কগুলো ধারণ ও সমন্বিত করতে হবে)।

## আরও দেখুন

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — সামগ্রিক পণ্যের ধাপে ধাপে নির্দেশিকা
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — রিকোয়েস্ট পাইপলাইনের রেফারেন্স
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo স্কোরিং ইঞ্জিন (সক্রিয় রানটাইম)
- সোর্স: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
