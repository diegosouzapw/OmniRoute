# Resilience Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute-এ তিনটি স্বতন্ত্র কিন্তু সম্পর্কিত স্থিতিস্থাপকতা ব্যবস্থা রয়েছে। প্রতিটির পরিধি ও উদ্দেশ্য আলাদা। রাউটিং আচরণ ডিবাগ করার সময় এগুলোকে পৃথক রাখুন।

![৩-স্তরবিশিষ্ট স্থিতিস্থাপকতা মডেল](../diagrams/exported/resilience-3layers.svg)

> উৎস: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. প্রোভাইডার সার্কিট ব্রেকার

**পরিধি:** সম্পূর্ণ প্রোভাইডার (যেমন, `glm`, `openai`, `anthropic`)।

**উদ্দেশ্য:** আপস্ট্রিম/সার্ভিস স্তরে বারবার ব্যর্থ হওয়া কোনো প্রোভাইডারের কাছে ট্রাফিক পাঠানো বন্ধ করা।

**বাস্তবায়ন:**

- মূল ক্লাস: `src/shared/utils/circuitBreaker.ts`
- সংযোগ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- স্ট্যাটাস API: `GET /api/monitoring/health`
- রিসেট API: `POST /api/resilience/reset`
- র্যাপার: `open-sse/services/accountFallback.ts`
- DB টেবিল: `domain_circuit_breakers`

**অবস্থাসমূহ:**

- `CLOSED` — স্বাভাবিক ট্রাফিক অনুমোদিত
- `DEGRADED` — ট্রাফিক এখনও অনুমোদিত, তবে প্রোভাইডারের বর্ধিত ব্যর্থতাগুলো ট্র্যাক করা হচ্ছে
- `OPEN` — প্রোভাইডার সাময়িকভাবে অবরুদ্ধ; কম্বো রাউটিং এটিকে এড়িয়ে যায়
- `HALF_OPEN` — রিসেট টাইমআউট শেষ হয়েছে; পরীক্ষামূলক অনুরোধ অনুমোদিত

**কনফিগারযোগ্য ডিফল্টসমূহ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience-এ উন্মুক্ত):**

| শ্রেণি | ডিগ্রেডেড হয়  | ওপেন হয়        | রিসেট টাইমআউট |
| ------ | -------------- | --------------- | ------------- |
| OAuth  | ৫টি ব্যর্থতায় | ৮টি ব্যর্থতায়  | 60s           |
| API কী | ৭টি ব্যর্থতায় | ১২টি ব্যর্থতায় | 30s           |
| লোকাল  | উদ্ভূত         | ২টি ব্যর্থতায়  | 15s           |

কখন কোনো প্রোভাইডার `DEGRADED` অবস্থায় প্রবেশ করবে তা `degradationThreshold` নিয়ন্ত্রণ করে; কখন এটি ওপেন হবে এবং এড়িয়ে যাওয়া হবে তা `failureThreshold` নিয়ন্ত্রণ করে। লোকাল প্রোভাইডার প্রোফাইলগুলো এখনও Resilience সেটিংস পেজে উন্মুক্ত নয়।

**ট্রিপ কোড:** কেবল প্রোভাইডার-স্তরের স্ট্যাটাস `[408, 500, 502, 503, 504]`। অ্যাকাউন্ট-স্তরের ত্রুটির জন্য ট্রিপ করবেন না (অধিকাংশ 401/403/429 — এগুলো কুলডাউন বা লকআউটের অন্তর্গত)।

**লেজি পুনরুদ্ধার:** `OPEN`-এর মেয়াদ শেষ হলে, `getStatus()`, `canExecute()`, `getRetryAfterMs()` অবস্থাটিকে `HALF_OPEN`-এ রিফ্রেশ করে। কোনো ব্যাকগ্রাউন্ড টাইমারের প্রয়োজন নেই।

---

### অপ্ট-ইন গ্লোবাল প্রোভাইডার কুলডাউন (উইন্ডো গেট)

একটি চতুর্থ, **অপ্ট-ইন** স্তর (`PROVIDER_COOLDOWN_ENABLED`, ডিফল্টভাবে **বন্ধ**)
`open-sse/services/providerCooldownTracker.ts`-এ ব্যর্থ প্রোভাইডারগুলোর একটি
ক্রস-রিকোয়েস্ট মেমরি রাখে, যা কম্বো টার্গেট রেজোলিউশনের সময় ব্যবহার করা হয়,
যাতে ধারাবাহিক কম্বো অনুরোধগুলো সদ্য ব্যর্থ হওয়া কোনো প্রোভাইডারকে বারবার যাচাই না করে।
প্রোভাইডার-স্তরের এন্ট্রিগুলো `PROVIDER_PROFILES` উইন্ডো গেট মেনে চলে:

| প্রোফাইল | যতবার ব্যর্থতার পর ট্রিপ করে (`providerFailureThreshold`) | যে সময়ের মধ্যে (`providerFailureWindowMs`) | যতক্ষণ কুলডাউন থাকে (`providerCooldownMs`) |
| -------- | --------------------------------------------------------: | ------------------------------------------: | -----------------------------------------: |
| OAuth    |                                                      `10` |                                     `15min` |                                     `5min` |
| API কী   |                                                      `15` |                                     `30min` |                                    `10min` |

থ্রেশহোল্ডের নিচে প্রোভাইডারটিকে **কুলডাউনে আছে** বলে বিবেচনা করা হয় না; একটি সফলতা
উইন্ডোটি পরিষ্কার করে। পরিবর্তে, সংযোগ-স্তরের এন্ট্রিগুলো (`provider:connectionId`)
সূচকীয় `minRetryCooldownMs → maxRetryCooldownMs` ব্যাকঅফ বজায় রাখে। ওভাররাইডসমূহ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
রিগ্রেশন গার্ড: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. সংযোগ কুলডাউন

**পরিধি:** একটি নির্দিষ্ট প্রোভাইডারের একক সংযোগ/অ্যাকাউন্ট/কী।

**উদ্দেশ্য:** একই প্রোভাইডারের অন্যান্য সংযোগ সেবা প্রদান চালিয়ে যাওয়ার সময় একটি ত্রুটিপূর্ণ কী এড়িয়ে যাওয়া।

**বাস্তবায়ন:**

- অনুপলভ্য হিসেবে চিহ্নিত করা: `src/sse/services/auth.ts::markAccountUnavailable()`
- নির্বাচন: একই ফাইলে `getProviderCredentials*`
- কুলডাউন গণনা: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

**প্রতি সংযোগের ফিল্ডসমূহ:**

- `rateLimitedUntil` — কুলডাউন শেষ হওয়া পর্যন্ত টাইমস্ট্যাম্প
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — সূচকীয় ব্যাকঅফ কাউন্টার

**ডিফল্ট কুলডাউনসমূহ:**

- OAuth ভিত্তি: 5s
- API-key ভিত্তি: 3s
- API-key 429: আপস্ট্রিমের `Retry-After`/রিসেট হেডার/পার্সযোগ্য রিসেট টেক্সটকে অগ্রাধিকার দেয়
- ব্যাকঅফ: `baseCooldownMs * 2 ** failureIndex`

**থান্ডারিং-হার্ড প্রতিরোধ ব্যবস্থা:** সমসাময়িক ব্যর্থতার কারণে কুলডাউন অতিরিক্ত বাড়ানো বা `backoffLevel` দুইবার বৃদ্ধি করা প্রতিরোধ করে।

**টার্মিনাল অবস্থা (কুলডাউন নয়):**

- `banned` — নিষিদ্ধ-কীওয়ার্ড / অ্যাকাউন্ট-ব্যান শনাক্তকরণ (দেখুন [BAN_DETECTION](../security/BAN_DETECTION.md)) এবং পরপর তিনটি আপস্ট্রিম প্রতি-অনুরোধ প্রত্যাখ্যানের (`request_rejected`, যেমন Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) ক্ষেত্রে সেট করা হয়; একটি মাত্র প্রত্যাখ্যান শুধু সংযোগটিকে কুলডাউনে রাখে
- `expired` (সীমাবদ্ধ সংখ্যক পুনঃচেষ্টার পরে টার্মিনাল অবস্থায় রূপান্তরিত হয় — সূচকীয় ব্যাকঅফসহ `EXPIRED_RETRY_MAX = 3` — যাতে সাময়িক OAuth ত্রুটিগুলো অ্যাকাউন্ট স্থায়ীভাবে নিষ্ক্রিয় হওয়ার আগে নিজে থেকেই সেরে উঠতে পারে)
- `credits_exhausted`

ক্রেডেনশিয়াল পরিবর্তিত না হওয়া বা কোনো অপারেটর এগুলো রিসেট না করা পর্যন্ত এসব অবস্থা বজায় থাকে। সাময়িক কুলডাউন অবস্থা দিয়ে টার্মিনাল অবস্থাগুলো ওভাররাইট করবেন না।

**অলস পুনরুদ্ধার:** `rateLimitedUntil` অতিক্রান্ত হলে সংযোগটি আবার যোগ্য হয়ে ওঠে। সফলভাবে ব্যবহৃত হলে `clearAccountError()` সব ত্রুটি ফিল্ড মুছে দেয়।

### Claude OAuth ব্যবহারসীমা: নিম্ন-অগ্রাধিকার লেন + সেশন-সীমা রিসেট

**পরিধি:** একটি Claude সাবস্ক্রিপশন (OAuth) সংযোগ। উভয় বৈশিষ্ট্যই **প্রতি সংযোগে অপ্ট-ইন**
(Edit connection → Claude section → `providerSpecificData`-তে `lowPriorityMode` /
`autoLimitReset`, উভয়ই ডিফল্টভাবে বন্ধ) এবং Claude Code-এর `/low-priority` ও
`/limit-reset` কমান্ডের অনুরূপ (Claude Code 2.1.263 থেকে ওয়্যার কনট্র্যাক্ট ধারণ করা হয়েছে)।

**বাস্তবায়ন:**

- স্টেট মেশিন + রেসপন্স শ্রেণিবিন্যাস: `open-sse/services/claudeLowPriority.ts`
- রিসেট স্ট্যাটাস/ক্লেইম ক্লায়েন্ট: `open-sse/services/claudeLimitReset.ts`
- এক্সিকিউটর হুক (হেডার ইনজেকশন + একই-অ্যাকাউন্টে পুনঃচেষ্টা): `open-sse/executors/base.ts::execute()`
- অপ্ট-ইন স্থায়ীকরণ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ট্রিগার:** 5-ঘণ্টার ব্যবহারসীমা — এমন একটি `429`, যার হেডারগুলোতে
`anthropic-ratelimit-unified-status: rejected` এবং অ্যাকাউন্টটি যোগ্য হলে
`anthropic-ratelimit-unified-slow-offer: treatment` থাকে। ওই প্রথম সীমা-সংক্রান্ত
429-এর আগে কিছুই পাঠানো হয় না; ইউনিফায়েড হেডারবিহীন একটি আকস্মিক 429 স্বাভাবিক কুলডাউন পথে যায়।

**নিম্ন-অগ্রাধিকার লেন** (`lowPriorityMode`):

- সীমা-সংক্রান্ত 429 এলে এক্সিকিউটর অফারটি গ্রহণ করে এবং অবিলম্বে **একই**
  অ্যাকাউন্টে `anthropic-usage-limit: slow` সহ পুনঃচেষ্টা করে; ঘোষিত
  `anthropic-ratelimit-unified-reset` (+60s অতিরিক্ত সময়) পর্যন্ত লেনটি সক্রিয় থাকে এবং
  ওই সময়সীমার প্রতিটি অনুরোধে হেডারটি থাকে। বাধাপ্রাপ্ত 429 কখনো `handleChatCore`-এ
  পৌঁছায় না, তাই সংযোগটিকে কুলডাউনে রাখা হয় **না** এবং অন্য সংযোগে ঘোরানোও হয় না।
- পরবর্তী রেসপন্সগুলোতে `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  লেনটি বজায় রাখে; `slot_busy` (429) বা একটি `529` হলে সার্ভারের
  `anthropic-ratelimit-unified-slow-retry-after` পর্যন্ত অপেক্ষা করে (ডিফল্ট 20s, সীমা 5–600s, ±30% জিটার)
  এবং পুনঃচেষ্টা করে, যা `anthropic-ratelimit-unified-slow-max-wait` দ্বারা সীমাবদ্ধ (ডিফল্ট 20 min, সীমা
  1 min–6 h) — এর বেশি হলে লেনটি শেষ হয় এবং 10-মিনিটের কুল-অফ পুনরায় গ্রহণ অবরুদ্ধ করে।
  অপেক্ষার সময়টি অনুরোধটির নিজস্ব আপস্ট্রিম-শুরুর টাইমআউটের অবশিষ্ট সময়
  (`resolveFetchStartTimeout`, ডিফল্টভাবে 10 min) থেকে 5 s মার্জিন বাদ দিয়েও সীমাবদ্ধ করা হয়: এই সীমা না থাকলে
  ডিফল্ট 20-মিনিটের সর্বোচ্চ অপেক্ষা অনুরোধটির চেয়ে বেশি স্থায়ী হতো এবং অপেক্ষার মাঝপথে স্লিপ বাতিল হয়ে
  মার্জিত `max_wait` সমাপ্তি + কুল-অফের পরিবর্তে একটি `TimeoutError` প্রকাশ করত।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-উইন্ডোর রোলওভার, অথবা
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (যা যেকোনো স্ট্যাটাসে এটিকে
  `extra_usage` হিসেবে শেষ করে, কারণ অর্থপ্রদত্ত অতিরিক্ত ব্যবহার এখন সীমাটি কভার করে) লেনটি শেষ করে;
  এরপর রেসপন্সটি স্বাভাবিক কুলডাউন পথে প্রবাহিত হয়। ঘোষিত বাজেট রিসেট (≤ 8 days) পর্যন্ত
  `budget_exhausted` মনে রাখা হয়।
- এক্সিকিউটরের নিজস্ব 400-চালিত একই-প্রচেষ্টার পুনঃচেষ্টাগুলোর (কনটেক্সট
  সম্পাদনা, চিন্তা/প্রচেষ্টা সীমাবদ্ধকরণ, প্যারামিটার স্বয়ংক্রিয়-শেখা) পরে সীমা যাচাই চলে, তাই কেবল
  ওই পুনঃচেষ্টাগুলোর কোনো একটিতে প্রকাশ পাওয়া সীমা-সংক্রান্ত 429-ও কুলডাউন পথে পৌঁছানোর পরিবর্তে বাধাপ্রাপ্ত হয়।
- স্টেটটি প্রতি সংযোগের জন্য ইন-মেমোরিতে থাকে (রিস্টার্টের ফলে পুনরায় গ্রহণ করতে একটি অতিরিক্ত সীমা-সংক্রান্ত 429 লাগে)।

**সেশন-সীমা রিসেট** (`autoLimitReset`, উভয়টি চালু থাকলে লেনের আগে চেষ্টা করা হয়):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ব্লক; যখন `arm: "reset"` এবং `available: true`,
  তখন `{ "program": "juniper_tide" }` সহ
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (`providerSpecificData.organizationUUID` থেকে প্রতিষ্ঠানের UUID, বুটস্ট্র্যাপ ফলব্যাক)।
- `result: reset|not_limited` → অনুরোধটি পূর্ণ গতিতে পুনরায় চেষ্টা করা হয় (কোনো স্লো হেডার ছাড়া)।
  `already_used` / `not_offered` `next_available_at` মনে রাখে (ডিফল্ট এক সপ্তাহ); যেকোনো
  ব্যর্থতায় 15 মিনিট ব্যাকঅফ হয়। রিসেটটি সপ্তাহে একবার এবং তারপরও সাপ্তাহিক সীমার হিসাবে গণ্য হয়।

রিগ্রেশন প্রতিরোধ পরীক্ষা: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### সেশন অ্যাফিনিটি (#7274)

**পরিধি:** **যেকোনো** প্রোভাইডারের ক্ষেত্রে একটি ক্লায়েন্ট সেশন (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` হেডার) একটি সংযোগে পিন করা থাকে।

**উদ্দেশ্য:** অনুরোধগুলোর মধ্যে একটি মাল্টি-টার্ন এজেন্টকে (Claude Code, aider, কাস্টম এজেন্ট) একই অ্যাকাউন্টে রাখা, যাতে প্রতি-অ্যাকাউন্ট সেশন স্টেট থাকা প্রোভাইডারগুলোতে ক্রস-অ্যাকাউন্ট কনটেক্সট হারানো এবং বারবার কোল্ড-স্টার্ট 429 কমে।

**বাস্তবায়ন:**

- TTL নির্ধারণ: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- পিন নির্বাচন/তৈরি: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- হেডার নিষ্কাশন (সাধারণ, যেকোনো প্রোভাইডার): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- স্থায়ীভাবে সংরক্ষিত পিন টেবিল: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- সেটিং: `sessionAffinityTtlMs` (ms-এ গ্লোবাল TTL, `0` নিষ্ক্রিয় করে) — `src/lib/db/settings.ts`। মাইগ্রেশন `124_generic_session_affinity_ttl.sql`-এর মাধ্যমে শুধু Codex-এর জন্য ব্যবহৃত `codexSessionAffinityTtlMs` থেকে এর নাম পরিবর্তন করা হয়েছে; এটি আগে কনফিগার করা যেকোনো Codex TTL-কে নতুন ডিফল্ট হিসেবে বহন করে।

#7274-এর আগে, `codex` ছাড়া অন্য প্রতিটি প্রোভাইডারের জন্য `resolveSessionAffinityTtlMs()` সরাসরি `0` রিটার্ন করত, ফলে পিনিং ব্যবস্থা এবং হেডার নিষ্কাশন আগে থেকেই প্রোভাইডার-নিরপেক্ষ হওয়া সত্ত্বেও TTL সেটিং (এবং সেশন হেডারগুলো) অন্য কোথাও কোনো প্রভাব ফেলত না। সংশোধনটি সেই আগাম রিটার্ন সরিয়ে দিয়েছে; এখন TTL-কে গ্লোবালি `0`-এর বেশি সেট করা হলে এটি সব প্রোভাইডারের ক্ষেত্রে সমভাবে প্রযোজ্য হয়।

তিনটি সেশন-অ্যাফিনিটি হেডার কখনোই আপস্ট্রিমে ফরওয়ার্ড করা হয় না — এক্সিকিউটরগুলো ক্লায়েন্ট হেডার সরাসরি পাঠানোর পরিবর্তে শুরু থেকে নিজেদের আপস্ট্রিম হেডার তৈরি করে, তাই এটি শুধুই একটি অভ্যন্তরীণ কোরিলেশন আইডি হিসেবে থাকে।

### এক্সক্লুসিভ ম্যানেজড সেশন কানেকশন লিজ

**পরিধি:** একটি সক্রিয় ম্যানেজড HTTP ক্লায়েন্ট/সেশন একটি যোগ্য OmniRoute কানেকশনের মালিক হয়।

**উদ্দেশ্য:** যেসব ক্লায়েন্টের অনুরোধগুলোর মধ্যে একটি কঠোর রাউটিং সীমা প্রয়োজন, তাদের জন্য টেকসই এক্সক্লুসিভ কানেকশন মালিকানা প্রদান করা। এটি সেশন অ্যাফিনিটি থেকে আলাদা, কারণ সেশন অ্যাফিনিটি হলো ধারাবাহিকতা বজায় রাখার একটি নমনীয় অগ্রাধিকার: একটি এক্সক্লুসিভ লিজ SQLite-এ লাইফসাইকেল স্টেট স্থায়ীভাবে সংরক্ষণ করে, গ্লোবাল সক্রিয়-মালিক ও সক্রিয়-কানেকশনের স্বতন্ত্রতা বলবৎ করে এবং প্রোভাইডারে পাঠানোর আগে একটি পুরোনো জেনারেশন প্রত্যাখ্যান করে।

ফিচারটি প্রতিটি API কী-এর জন্য আলাদাভাবে অপ্ট-ইন করতে হয়। একটি ম্যানেজড কী-এর অবশ্যই `lease:exclusive` স্কোপ এবং একটি স্পষ্টভাবে নির্ধারিত, খালি নয় এমন `allowedConnections` তালিকা থাকতে হবে। যেকোনো HTTP ক্লায়েন্ট লাইফসাইকেল এন্ডপয়েন্ট ব্যবহার করতে পারে; কোনো ক্লায়েন্টের নাম, ইউজার-এজেন্ট, প্রোভাইডার, OAuth পদ্ধতি বা মডেলের প্রয়োজন নেই। লিজটি একটি কানেকশনের মালিক হয়, কোনো মডেলের নয়; তাই কানেকশনটি সাধারণভাবে যোগ্য থাকা অবস্থায় মডেল পরিবর্তন হলেও বাইন্ডিং বজায় থাকে। স্বাভাবিক মডেল, কোটা, স্বাস্থ্য, কুলডাউন এবং অ্যালাউলিস্টের নিয়মগুলোই চূড়ান্ত কর্তৃত্ব বজায় রাখে এবং একই জেনারেশনকে অন্য একটি মুক্ত ও যোগ্য কানেকশনে স্থানান্তর করতে পারে।

লাইফসাইকেলটি হলো JSON অ্যাকশন `acquire`, `renew` এবং `release`-সহ `POST /api/v1/session-leases`। ম্যানেজড ইনফারেন্স অনুরোধগুলো অস্বচ্ছ `X-OmniRoute-Lease-Owner` মান এবং হুবহু `X-OmniRoute-Lease-Generation` উপস্থাপন করে। মালিকের মানে `vlo_`-এর পরে 43টি base64url অক্ষর থাকে; কেবল এর SHA-256 হ্যাশ সংরক্ষণ করা হয়। প্রতিটি চূড়ান্ত ডিসপ্যাচ ফেন্স প্রমাণীকৃত API কী আইডি এবং সক্রিয় কানেকশন আইডিও আবদ্ধ করে। লিজ কন্ট্রোল হেডারগুলো লগ, সংরক্ষিত অনুরোধের স্ন্যাপশট এবং আপস্ট্রিম এক্সিকিউটর হেডার থেকে সরিয়ে ফেলা হয়।

সাধারণ রাউটিংয়ে যোগ্য ম্যানেজড প্রার্থী থাকলেও যদি প্রতিটি মুক্ত প্রার্থী অন্য কোনো সক্রিয় লিজের দখলে থাকে, তাহলে OmniRoute HTTP `429`, লিজ-ক্যাপাসিটি-অনুপলভ্য কোড, ক্যাপাসিটির-জন্য-অপেক্ষমাণ স্টেট এবং প্রাসঙ্গিক নিকটতম মেয়াদ শেষ হওয়ার সময় থেকে নির্ধারিত একটি সীমাবদ্ধ `Retry-After` রিটার্ন করে। সাধারণভাবে কোনো যোগ্য প্রার্থী না থাকা লিজ বিরোধ নয় এবং সে ক্ষেত্রে বিদ্যমান রাউটিং ত্রুটির অর্থ অপরিবর্তিত থাকে।

সংশ্লিষ্ট প্রক্রিয়াগুলো পৃথক থাকে:

- OAuth সেশন অকুপেন্সি হলো OAuth অ্যাকাউন্টগুলোর জন্য প্রসেস-লোকাল নমনীয় বণ্টন।
- অ্যাকাউন্ট সেমাফোরগুলো অনুরোধের কনকারেন্সি পারমিট দেয় এবং একটি অনুরোধ সম্পন্ন হলে শেষ হয়।
- এক্সক্লুসিভ ম্যানেজড সেশন লিজ হলো একটি জেনারেশন ফেন্সসহ টেকসই লাইফসাইকেল মালিকানা।

---

## 3. মডেল লকআউট

**পরিধি:** provider + connection + model ট্রিপল।

**স্ট্যাটাস অনুযায়ী কী-এর পরিধি:** ব্যর্থতার স্ট্যাটাস নির্ধারণ করে কোন কী-তে একটি লকআউট লেখা হবে
(`open-sse/services/accountFallback/exactModelLock.ts`-এর `resolveLockoutScope()`):

- `429` / `403` / `402` — quota বা entitlement সংকেত — **quota family** লক করে:
  codex-এর ক্ষেত্রে সম্পূর্ণ `codex` / `spark` পরিধি (connection-এর প্রতিটি `gpt-5*` model), অন্য provider-গুলোর ক্ষেত্রে `getQuotaScopedModelForProvider()`।
- `404` শুধু মূল model-টি লক করে (`getModelLockKey()` `not_found`-কে সংকুচিত করে)।
- অন্য যেকোনো স্ট্যাটাস — `5xx` transport/server ব্যর্থতা এবং quality validation থেকে OmniRoute-এর নিজস্ব
  তৈরি করা `502` — শুধু **সুনির্দিষ্ট**
  provider/connection/model টিউপলটি লক করে। একটি model-এ খারাপ stream account-এর quota সম্পর্কে কোনো প্রমাণ নয়; এই নিয়মের আগে
  `codex/gpt-5.6-luna`-তে একটি খালি response ওই connection-এর প্রতিটি `gpt-5*` model-কে
  2–30 মিনিটের জন্য (ক্রমবর্ধমানভাবে) routing থেকে সরিয়ে দিত, যদিও এর quota অপরিবর্তিত থাকত।
- কলারের স্পষ্ট `scope` option সর্বদা অগ্রাধিকার পায় (Antigravity `"exact"` পাঠায়)।

**উদ্দেশ্য:** শুধু একটি model অনুপলব্ধ বা quota-সীমাবদ্ধ হলে সম্পূর্ণ connection নিষ্ক্রিয় করা এড়ানো।

**উদাহরণ:**

- প্রতি-model quota provider থেকে 429 ফেরত আসা
- একটি অনুপস্থিত model-এর জন্য local provider থেকে 404 ফেরত আসা
- Provider-নির্দিষ্ট mode/model permission ব্যর্থতা (যেমন, Grok mode)

**বাস্তবায়ন:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### মডেল কুলডাউন ড্যাশবোর্ড (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

সক্রিয় lockout-গুলো provider, connection, model, reason, expiresAt-সহ তালিকাভুক্ত করে। অপারেটররা card থেকে ম্যানুয়ালি একটি model পুনরায় সক্রিয় করতে পারেন।

**REST API:**

- `GET /api/resilience/model-cooldowns` — সক্রিয় lockout-এর তালিকা
- `DELETE /api/resilience/model-cooldowns` — ম্যানুয়াল পুনঃসক্রিয়করণ। Body: `{provider, connection, model}`। Auth: management।

### লকআউট সেটিংস UI + সফলতা-ক্ষয়ভিত্তিক পুনরুদ্ধার (v3.8.23)

Model lockout সবসময় সক্রিয় hardcoded আচরণ থেকে নিজস্ব settings card ও self-healing recovery path-সহ সম্পূর্ণ configurable, opt-in feature-এ রূপান্তরিত হয়েছে।

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
এটি উপরের read-only `ModelCooldownsCard` থেকে **আলাদা** (যেটি শুধু সক্রিয় lockout-এর _তালিকা দেখায়_) — নতুন card-টি _parameter configure করে_। Default মানগুলো
`DEFAULT_MODEL_LOCKOUT_SETTINGS`-এ রয়েছে
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | অর্থ                                                        |
| ----------------------- | -------------------------------- | ----------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout **ডিফল্টভাবে বন্ধ**।          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | যেসব upstream status model-scoped ব্যর্থতা হিসেবে গণ্য হয়। |
| `baseCooldownMs`        | `120_000` (120 s)                | প্রথম ব্যর্থতার জন্য প্রাথমিক lockout-এর সময়কাল।           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ক্রমবর্ধমান cooldown-এর সর্বোচ্চ সীমা।                      |
| `maxBackoffSteps`       | `10`                             | exponential-backoff বৃদ্ধির সর্বোচ্চ ধাপ।                   |
| `useExponentialBackoff` | `true`                           | পুনরাবৃত্ত ব্যর্থতায় cooldown সূচকীয়ভাবে বাড়বে কি না।    |

Settings সাধারণ settings store-এর মাধ্যমে সংরক্ষিত থাকে এবং resilience settings schema-এর মাধ্যমে validate হয়; card-টি `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs`-সহ) এবং `maxBackoffSteps`-কে সীমার মধ্যে রাখে।

**সফলতা-ক্ষয়ভিত্তিক পুনরুদ্ধার:** recovery **শুধু** timer expiry-র ওপর নির্ভরশীল নয়। একটি সুস্থ
response model-এর failure count ধাপে ধাপে কমায়, ফলে মাঝপথে পুনরুদ্ধার করা model timer শেষ হওয়ার আগেই আর escalate হয় না (এবং clear হয়ে যায়)। কোনো সফল
combo target-এ `open-sse/services/combo.ts`, `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) কল করে, যা সংরক্ষিত
`failureCount`-কে **অর্ধেক** করে (`Math.floor(failureCount / 2)`); এটি `0`-তে পৌঁছালে lockout
entry সম্পূর্ণভাবে মুছে ফেলা হয়। এর বিপরীতে `recordModelLockoutFailure()`
escalation window-এর মধ্যে ব্যর্থতা ঘটলে count বৃদ্ধি করে (এবং cooldown escalate করে)। এই success-decay সাধারণ timer expiry-র অতিরিক্ত —
যেকোনো একটি path একটি model-কে পুনরায় সক্রিয় করতে পারে।

**State:** lockout-গুলো **in-memory** রাখা হয় (`provider:connectionId:model` কী-যুক্ত
`ModelLockoutEntry`-এর প্রতি-process `Map`, exact-scope lock-এর কী
`provider:connectionId:exact:model`), DB-তে persist করা হয় না —
restart হলে এগুলো হারিয়ে যায়। _Settings_ persist করা হয়; সক্রিয়
lockout _state_ ক্ষণস্থায়ী।

---

## 4. কোটা-শেয়ার সমসাময়িকতা নিয়ন্ত্রণ (v3.8.36)

সাবস্ক্রিপশন অ্যাকাউন্টগুলো (GLM, MiniMax ইত্যাদি) প্রায়ই কেবল ~1–3টি সমসাময়িক
অনুরোধ গ্রহণ করে; এই সীমা অতিক্রম করলে 429 এবং কুলডাউন ট্রিগার হয়। **কোটা-শেয়ার**
(`qtSd/…`) কম্বোর ক্ষেত্রে এটি বিশেষভাবে তীব্র, যেখানে একাধিক API কী একই আপস্ট্রিম
অ্যাকাউন্ট শেয়ার করে। তিনটি স্তর একটি শেয়ার করা অ্যাকাউন্টকে অতিরিক্ত অনুরোধে প্লাবিত হওয়া থেকে রক্ষা করে।

### প্রতি-সংযোগ সমসাময়িকতার সীমা (`max_concurrent`)

প্রতিটি প্রোভাইডার সংযোগ একটি `max_concurrent` সর্বোচ্চ সীমা ঘোষণা করতে পারে
(`provider_connections.max_concurrent`, যা সংযোগ মডাল / API / DB-তে সেট করা হয়)।
কোনো সীমা না রাখতে এটি খালি রাখুন। এটিই একমাত্র নিয়ন্ত্রণ যা নিচের সিরিয়ালাইজেশন
স্তরটি পরিচালনা করে — এটিকে অ্যাকাউন্টটির প্রকৃত সমসাময়িকতা অনুযায়ী সেট করুন (যেমন GLM ~1, MiniMax ~2)।

### কোটা-শেয়ার অনুরোধ সিরিয়ালাইজেশন

যখন কোনো কোটা-শেয়ার ডিসপ্যাচ ধনাত্মক `max_concurrent` ঘোষণা করা একটি সংযোগকে
লক্ষ্য করে, তখন সেই **অ্যাকাউন্টে** পাঠানো সমসাময়িক অনুরোধগুলো প্রতি-সংযোগ
সেমাফোরের (কী `qsconn:<connectionId>`) মাধ্যমে সিরিয়ালাইজ করা হয়: অতিরিক্ত অনুরোধগুলো
অ্যাকাউন্টটিকে প্লাবিত করার পরিবর্তে **কিউতে অপেক্ষা করে**। এটি **ফেইল-ওপেন** —
কিউ পূর্ণ হয়ে গেলে বা টাইমআউট হলে, ডিসপ্যাচযোগ্য কোনো অনুরোধকে প্রত্যাখ্যান না করে
স্লট ছাড়াই কার্যক্রম এগিয়ে যায়। **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ডিফল্টভাবে
চালু) থেকে এটি টগল করুন। `max_concurrent` সীমা না থাকলে আচরণ অপরিবর্তিত থাকে।

> কোটা-শেয়ার রাউটিং গেট (`selectQuotaShareTarget`, DRR + P2C) নিজেও
> ফেইল-ওপেন এবং সীমায় পৌঁছানো কোনো সংযোগকে শুধু _কম অগ্রাধিকার দেয়_ — একটি
> একক-সংযোগ পুলে এটি কঠোর সীমা আরোপ করতে পারে না, তাই এই সেমাফোরই প্রকৃতপক্ষে
> অনুরোধের প্লাবন নিয়ন্ত্রণ করে।

### কম্বোর কুলডাউন-সচেতন পুনঃচেষ্টা

প্রতিটি কম্বো কৌশলের ক্ষেত্রে (সক্রিয় থাকলে), কোনো অনুরোধের ফলে স্বল্পস্থায়ী
কুলডাউনের জন্য 429 নিশ্চিতভাবে ঘটতে গেলে, 429 ফেরত দেওয়ার পরিবর্তে অনুরোধটি
কুলডাউন শেষ হওয়া পর্যন্ত অপেক্ষা করে এবং পুনরায় ডিসপ্যাচ হয় — এটি একাধিক-মডেলের
কম্বোতে Gemini-শ্রেণির TPM/RPM উইন্ডো (~60s retry-after) কভার করে, যেমন 2-মডেলের
কোনো কম্বোর উভয় লক্ষ্য প্রতি-মডেলের রেট লিমিটে পৌঁছালে। এটি **Settings → Resilience**-এর
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) দ্বারা
সীমাবদ্ধ। `quota_exhausted` (মধ্যরাত পর্যন্ত লক করা) অথবা অথেন্টিকেশন/না-পাওয়ার
কারণে এটি কখনো অপেক্ষা করে না।

---

## 5. রিকোয়েস্ট কিউ অ্যাডমিশন কন্ট্রোল (v3.8.49 · issue #6593)

**পরিধি**: স্থানীয় প্রতি-provider+connection রেট-লিমিট কিউ (`open-sse/services/rateLimitManager.ts`,
Bottleneck দ্বারা সমর্থিত), উপরের তিনটি ব্যবস্থার এক স্তর নিচে।

**`maxWaitMs` কিউতে অপেক্ষার সীমা নির্ধারণ করে; `executionMaxWaitMs` এক্সিকিউশনের সীমা নির্ধারণ করে।**
দুটিকে ইচ্ছাকৃতভাবে আলাদা রাখা হয়েছে এবং কোনোটিই অন্যটিকে প্রভাবিত করে না।

`resilienceSettings.requestQueue.maxWaitMs` হলো **কিউতে অপেক্ষার বাজেট**: এটি
provider স্লটের জন্য অপেক্ষা করা এবং তারপর QUEUED অবস্থায় থাকার সময়কে অন্তর্ভুক্ত
করে, এবং জবটি QUEUED অবস্থা ছেড়ে এক্সিকিউশন শুরু করার মুহূর্তেই এর টাইমার
মুছে ফেলা হয় (`rateLimitManager.ts`, `wrappedFn`)। কোনো রিকোয়েস্ট এটি অতিক্রম
করলে সেটি কখনোই আপস্ট্রিমে পৌঁছায় না। ডিফল্ট 30000ms, যা
`src/lib/resilience/settings.ts`-এর `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` দ্বারা
সরবরাহ করা হয় এবং `tests/unit/ratelimit-admission-control-6593.test.ts` দ্বারা
স্থির করা আছে, ফলে এটি পরিবর্তন করলে এই অনুচ্ছেদটি নীরবে পুরোনো হয়ে থাকার
পরিবর্তে ওই টেস্টটি ব্যর্থ হবে।

`resilienceSettings.requestQueue.executionMaxWaitMs` হলো সেই মান, যা Bottleneck
জবের `expiration` হিসেবে গ্রহণ করে; এর টাইমার শুধু ডিসপ্যাচের পর শুরু হয়। যেসব
এক্সিকিউটরের নিজস্ব আপস্ট্রিম টাইমআউট নেই, তাদের জন্য এটি একটি সুরক্ষামূলক
শেষ ব্যবস্থা, এবং এক্সিকিউটরের নিজস্ব fetch-start টাইমআউট বেশি হলে এটিকে সেই
মান পর্যন্ত বাড়ানো হয়, যাতে এটি চলমান কোনো সুস্থ রেসপন্স বন্ধ করে দিতে না
পারে। ডিফল্ট 600000ms (10 মিনিট)।

কিউ বাজেটকে `expiration`-এ দেওয়ার কারণেই আগে non-incremental গেটওয়েগুলো
চলমান অবস্থায় বন্ধ হয়ে যেত — প্রথম বাইট আসার আগে সেগুলো বৈধভাবেই কয়েক
মিনিট চলতে পারে — এবং এ কারণেই expiration-কে `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) হিসেবে প্রকাশ করা হয়, অন্যদিকে
কিউ বাজেটের ক্ষেত্রে কিউ-টাইমআউট কোড ব্যবহৃত হয়। `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) অথবা ড্যাশবোর্ডের
(**Settings → Resilience**) মাধ্যমে যেকোনোটি ওভাররাইড করুন। নরমালাইজ করার
সময় উভয় মানই 1ms–24h সীমার মধ্যে আবদ্ধ করা হয়।

**উভয়ের ক্ষেত্রে অগ্রাধিকার:** env var শুধু _ডিফল্ট_ মান সরবরাহ করে।
`resilienceSettings.requestQueue`-তে সংরক্ষিত কোনো মান (ড্যাশবোর্ড / API patch,
`key_value`-তে সংরক্ষিত) এটিকে অগ্রাহ্য করে, এবং প্রতি-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` সেটিকেও অগ্রাহ্য করে।
অতএব, আগে থেকেই সংরক্ষিত মান রয়েছে এমন কোনো ডিপ্লয়মেন্টে env var সেট করলে
কিছুই পরিবর্তিত হয় না — পরিবর্তে সংরক্ষিত সেটিংটি মুছুন বা আপডেট করুন।

কিউতে অবস্থানের সময় `maxWaitMs` দ্বারা সীমাবদ্ধ; নিচের `maxQueueDepth` একই
সময়ে কতজন কলার কিউতে থাকতে পারবে তা সীমাবদ্ধ করে।

**`maxQueueDepth` — ঐচ্ছিক অ্যাডমিশন ক্যাপ (নতুন)।** `resilienceSettings.requestQueue.maxQueueDepth`
একটি provider+connection-এর জন্য একই সময়ে কতটি রিকোয়েস্ট কিউতে (এখনও
ডিসপ্যাচ হয়নি) থাকতে পারবে তা সীমাবদ্ধ করে। কিউতে ইতোমধ্যে
`maxQueueDepth` সংখ্যক রিকোয়েস্ট থাকলে, নতুন রিকোয়েস্টটি টাইপযুক্ত
`code: "RATE_LIMIT_QUEUE_FULL"` এররসহ দ্রুত প্রত্যাখ্যাত হয়, সেটি কখনো
`limiter.schedule()`-এ পৌঁছানোর **আগেই** — ফলে প্রত্যাখ্যানটি কম ব্যয়সাপেক্ষ
এবং ওই রিকোয়েস্টের যেকোনো ডাউনস্ট্রিম prompt-compression / translation কাজের
আগেই ঘটে। ডিফল্ট `0` = নিষ্ক্রিয়, যা বিদ্যমান সীমাহীন-কিউ আচরণ বজায় রাখে;
সীমা 0–100000। `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) অথবা
`resilienceSettings.requestQueue.maxQueueDepth` (ড্যাশবোর্ড/API patch)-এর
মাধ্যমে ওভাররাইড করুন।

অ্যাডমিশন যাচাইটি নিজেই একটি pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), তাই
বাস্তব Bottleneck limiter ছাড়াই এটিকে ইউনিট টেস্ট করা যায়।

> #6593 শুরু করা RFC-এ একটি `bypassCompressionOnRateLimit`
> ফ্ল্যাগও প্রস্তাব করা হয়েছিল। এই repo-র `open-sse/services/compression/`
> পাইপলাইনটি আউটবাউন্ড LLM রিকোয়েস্টের prompt/context compression
> (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy`
> ব্লকের আশপাশে), synthesized 429 body-র HTTP response compression নয় —
> তাই আক্ষরিক bypass ফ্ল্যাগের জন্য কোনো মিলে যাওয়া কোড পাথ নেই। ওই
> prompt-compression ধাপটিও বর্তমানে রিকোয়েস্ট পাইপলাইনে `withRateLimit()`-এর
> _আগে_ চলে, তাই queue-full প্রত্যাখ্যানের ক্ষেত্রে এটি এড়াতে ধাপগুলোর ক্রম
> পরিবর্তন করা এই issue-এর পরিধির তুলনায় আলাদা ও বড় পরিবর্তন; এখানে এটি
> ইচ্ছাকৃতভাবে বাস্তবায়ন **করা হয়নি** এবং CPU সাশ্রয়ের সুবিধাটি যদি
> পুনর্বিন্যাসের ঝুঁকির উপযুক্ত হয়, তবে এটিকে follow-up হিসেবে রেখে দেওয়া হয়েছে।

---

## 6. ধীর-স্ট্রিম থ্রুপুট ওয়াচডগ (#9709)

ঐচ্ছিক `resilienceSettings.streamRecovery.throughputWatchdog` গার্ড এমন একটি আপস্ট্রিম শনাক্ত করে, যা এখনও চাঙ্ক পাঠাচ্ছে কিন্তু কনফিগার করা ব্যবহারযোগ্য-আউটপুট হারের চেয়ে কম হারে অ্যাসিস্ট্যান্ট আউটপুট তৈরি করছে। এটি ইচ্ছাকৃতভাবে আইডল টাইমআউট থেকে স্বতন্ত্র: হার্টবিট ও মেটাডেটা কোনো টাইমারই রিসেট করে না এবং অগ্রগতি হিসেবেও গণ্য হয় না। এটি কঠোর অ্যাটেম্পট ডেডলাইন (#9153) থেকেও স্বতন্ত্র, যা আউটপুটের গুণমান নির্বিশেষে একটি পরম সুরক্ষা-সীমা হিসেবে বহাল থাকে।

ওয়াচডগ অ্যাবর্ট করতে পারার আগে একটি ওয়ার্ম-আপ সময়কাল এবং তার পর একটি সম্পূর্ণ রোলিং উইন্ডো প্রয়োজন। এটি Chat Completions এবং Responses API আউটপুট ইভেন্ট থেকে টেক্সট ডেল্টা গণনা করে (UTF-8 বাইটের একটি রক্ষণশীল প্রক্সি), শুধুমাত্র-ইউসেজ ও ফাঁকা ইভেন্ট উপেক্ষা করে এবং টুল-কল বা রিজনিং ইভেন্ট চলমান থাকা অবস্থায় মূল্যায়ন স্থগিত রাখে। এটি ডিফল্টভাবে নিষ্ক্রিয় এবং `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` দিয়ে সক্রিয় করা যায়; উইন্ডো, ওয়ার্ম-আপ, ন্যূনতম হার এবং ন্যূনতম পরিমাপযোগ্য আউটপুট স্বাভাবিক রেজিলিয়েন্স-সেটিংস নর্মালাইজেশন স্তর দ্বারা সীমাবদ্ধ থাকে।

সক্রিয় থাকলে, ওয়াচডগ অ্যাবর্ট কেবল সক্রিয় আপস্ট্রিম অ্যাটেম্পটের ওপর প্রয়োগ করা হয়। ক্লায়েন্টের কাছে দৃশ্যমান কোনো বাইট পাঠানোর আগে, বিদ্যমান একই-অ্যাকাউন্ট আর্লি-রিকভারি পাথ অ্যাটেম্পটটি পুনরায় খুলতে পারে। কমিটের পরে, স্ট্রিম কখনোই নির্বিচারে রিপ্লে করা হয় না; কেবল বিদ্যমান নিরাপদ মিড-স্ট্রিম কন্টিনিউয়েশন কনট্র্যাক্ট একটি সাফিক্স জোড়া দিতে পারে। ফাইনালাইজেশন একবারই সম্পন্ন হয়, তাই ইউসেজ অ্যাকাউন্টিং ও সেমাফোর রিলিজের পুনরাবৃত্তি হয় না।

---

## 7. আপস্ট্রিম স্ট্যাটাস পুনর্বিবৃতি (ভুলভাবে উল্লেখ করা কোটা এরর)

**পরিধি:** এমন একটি আপস্ট্রিম গেটওয়ে, যা ভুল HTTP স্ট্যাটাস দিয়ে সাময়িক কোটা নিঃশেষ হওয়ার কথা জানায়।

**উদ্দেশ্য:** শ্রেণিবিন্যাসের আগে একটি বিভ্রান্তিকর স্ট্যাটাস সংশোধন করা, যাতে ডাউনস্ট্রিম কনজিউমাররা (ফলব্যাক ইঞ্জিন, কম্বো অ্যাগ্রিগেশন, ক্লায়েন্ট-মুখী রেসপন্স) ব্যর্থতার প্রকৃত পুনঃচেষ্টাযোগ্য প্রকৃতি দেখতে পায়।

কিছু গেটওয়ে একটি পুনঃচেষ্টার অযোগ্য HTTP স্ট্যাটাস দিয়ে সাময়িক কোটা নিঃশেষ হওয়ার সংকেত দেয়। `agentrouter.org` স্ট্যান্ডার্ড `429`-এর পরিবর্তে একটি চীনা বডি (`用户额度不足` / `额度不足`) সহ `403` (কখনো কখনো `400`) ফেরত দেয়। Claude Code-এর মতো ক্লায়েন্ট `403`-কে স্থায়ী হিসেবে বিবেচনা করে এবং সেশন অ্যাবর্ট করে; আর সংশোধন না করা হলে ফলব্যাক ইঞ্জিন এটিকে কোটা ইভেন্টের পরিবর্তে `AUTH_ERROR` হিসেবে শ্রেণিবদ্ধ করবে।

**বাস্তবায়ন:**

- রেজিস্ট্রি + ম্যাচার: `open-sse/config/upstreamStatusRestatement.ts` — প্রোভাইডার-পিছু নিয়মের একটি তালিকা (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), যা `applyStatusRestatement()`-এর মাধ্যমে ম্যাচ করা হয়।
- কল সাইট: `open-sse/handlers/chatCore.ts`-এর `providerFailure:` ব্লক
  (প্রায় 3654 নম্বর লাইনে), যেখানে `parseUpstreamError()` একটি এরর HTTP স্ট্যাটাসযুক্ত (`!providerResponse.ok`) আপস্ট্রিম রেসপন্স পার্স করার ঠিক পরে এবং যেকোনো শ্রেণিবিন্যাস চালানোর আগে এটি থাকে, ফলে প্রত্যেক ডাউনস্ট্রিম কনজিউমার সংশোধিত স্ট্যাটাসটি দেখতে পায়। একটি `200` SSE স্ট্রিমের ভেতরে এমবেড করা এররগুলো একটি পৃথক, পরবর্তী স্ট্রিম-পার্সিং পাথ অনুসরণ করে এবং আজ এই হুক দ্বারা **কভার করা হয় না** — এটি একটি পরিচিত সীমাবদ্ধতা, যা agentrouter-এর ভুল স্ট্যাটাসের জন্য এখনও প্রয়োজন হয়নি (কারণ সেটি এরর HTTP স্ট্যাটাস হিসেবেই প্রকাশ পায়)।
- পুনঃচেষ্টার যোগ্যতা: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`-এ রয়েছে
  (`open-sse/services/combo/unavailableRetryGate.ts`), তাই পুনর্বিবৃত একটি এরর অকার্যকর `403` হিসেবে প্রকাশিত হওয়ার পরিবর্তে একটি প্রকৃত পুনঃচেষ্টা উইন্ডো বহন করে।
- সিনথেটিক `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) কেবল পুনর্বিবৃত রেসপন্সটি **ক্লায়েন্টকে** যা জানায়; এটি নিজে কানেকশনের অভ্যন্তরীণ কুলডাউন/লকআউটের সময়কাল নয় — সেটি আলাদাভাবে নির্ধারিত হয় পুনর্বিবৃত এররটি বাস্তবে যে মেকানিজম পরিচালনা করে তার দ্বারা (Connection Cooldown-এর ক্রমবর্ধমান ব্যাকঅফ, §2, API-কী প্রোভাইডারের জন্য বেস `3s`; অথবা agentrouter-এর মতো প্রতি-মডেল-কোটা প্রোভাইডারের জন্য Model Lockout, §3)। ক্লায়েন্টকে বিজ্ঞাপিত 60s উইন্ডোর আগেই রাউটার অভ্যন্তরীণভাবে পুনঃচেষ্টার যোগ্য হয়ে উঠতে পারে — এটি ইচ্ছাকৃত হেডরুম, কোনো বাগ নয়।

স্থায়ী এররগুলো (agentrouter-এর `无权访问模型` — এই মডেল অ্যাক্সেস করার অনুমতি নেই) কখনোই পুনর্বিবৃত হয় না: `textMarkers` ম্যাচ করলেও `excludeMarkers` নিয়মটি ভেটো করে, ফলে এররটি তার মূল স্ট্যাটাস ধরে রাখে এবং কোনো কিছুই অনন্তকাল সেটি পুনঃচেষ্টা করে না। সংশ্লিষ্ট প্রোভাইডার শ্রেণিবিন্যাসের নিয়মটি
(`open-sse/config/providerErrorRules.ts`-এর `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, ঘোষিত বেস কুলডাউন `6h`) `checkFallbackError` (`open-sse/services/accountFallback.ts`) দ্বারা জেনেরিক apikey-ক্যাটাগরির `FORBIDDEN` আর্লি-রিটার্নের _আগে_ বিবেচিত হয়, যা `honorsRuleLockScope(provider)` দ্বারা নিয়ন্ত্রিত (#10334 — বর্তমানে `providerErrorRules.ts`-এর `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালাউলিস্টের মাধ্যমে শুধু agentrouter-এর জন্য প্রযোজ্য)। নিয়মটির ঘোষিত 6h কুলডাউন `fallbackResult.baseCooldownMs` হিসেবে প্রবাহিত হয়, কিন্তু এটি এখনও আগে থেকে বিদ্যমান প্রতি-মডেল-কোটা লকআউট পাথেই (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, কুলডাউনের উৎস ছাড়া #10334 দ্বারা অপরিবর্তিত) প্রবেশ করে: অন্য সব মডেল লকআউটের মতো এটিকেও অপারেটরের `mlSettings.maxCooldownMs` (ডিফল্ট `1_800_000ms` / 30min) পর্যন্ত কমিয়ে সীমাবদ্ধ করা হয় এবং _পারসিস্ট করা লকআউটের কারণ_ নিয়মটির `"auth_error"` নয়, বরং আগে থেকে বিদ্যমান হার্ডকোড করা `"forbidden"`-ই থাকে — শুধু কুলডাউনের সময়কাল শুরু থেকে শেষ পর্যন্ত মান্য করা হয়, কারণের স্ট্রিংটি নয়। কানেকশনটি নিজে সক্রিয় থাকে; একই কানেকশনের সিবলিং মডেলগুলো প্রভাবিত হয় না।

পুনর্ব্যক্ত করা কোটা ত্রুটি (`额度不足`) প্রোডাকশনে একটি প্রোভাইডার নিয়মের সঙ্গে মেলে
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, যার নিজস্ব কোনো ঘোষিত কুলডাউন নেই — পারসিস্টেন্স স্তরের
স্কেল করা ব্যাকঅফ ডিফল্ট প্রযোজ্য হয়)। #10334 থেকে,
`ProviderErrorRuleMatch`-এর `scope` শুরু থেকে শেষ পর্যন্ত ব্যবহৃত হয়, তবে
**শুধু** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালাওলিস্টে থাকা প্রোভাইডারগুলোর
জন্য (`providerErrorRules.ts` — বর্তমানে শুধু `"agentrouter"`,
`honorsRuleLockScope()`-এর মাধ্যমে গেট করা)। অন্য প্রতিটি প্রোভাইডারের জন্য
`scope` আগের মতোই কেবল তথ্যমূলক থাকে, ঠিক #10334-এর আগের আচরণের মতো।
`checkFallbackError` মিলে যাওয়া নিয়মটির স্কোপকে
`fallbackResult.ruleScope` হিসেবে প্রকাশ করে;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) হলো শেয়ার করা গার্ড, যা নিশ্চিত করে যে একটি
`ruleScope`-কে সত্যিই সংযোগব্যাপী, স্বয়ংক্রিয়ভাবে পুনরুদ্ধারযোগ্য সংকেত হিসেবে
সম্মান করা নিরাপদ (স্কোপ `"connection"`, কারণ `quota_exhausted`, কখনোই
`permanent` নয়, কখনোই `creditsExhausted` নয় — ভবিষ্যতের কোনো নিয়মে
`"connection"` স্কোপকে একটি স্থায়ী অ্যাকাউন্ট অবস্থার সঙ্গে জোড়া লাগানোর
বিরুদ্ধে একটি সুরক্ষা)। দুইজন কনজিউমার এটি কল করে:

- **পারসিস্টেন্স** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  পাসথ্রু-প্রোভাইডারের **প্রতি-মডেল** লকআউট শাখায় যাওয়ার পরিবর্তে
  (agentrouter হলো `passthroughModels: true` → `hasPerModelQuota()`
  `true` রিটার্ন করে), এটি একটি **সাময়িক সংযোগ কুলডাউন** প্রয়োগ করে —
  `testStatus: "unavailable"` + `rateLimitedUntil`, কখনোই কোনো টার্মিনাল স্ট্যাটাস
  (`credits_exhausted`/`banned`/`expired`) নয় — ফলে কুলডাউনের মেয়াদ শেষ হলে
  সংযোগটি নিজে থেকেই পুনরুদ্ধার হয়, ম্যানুয়াল ক্রেডেনশিয়াল রিসেটের প্রয়োজন
  হয় না। `disableCooling: true`-সহ সংযোগগুলোর জন্য এটি এড়িয়ে যাওয়া হয়
  (#2997): সেই অপ্ট-আউটের ক্ষেত্রে পরিবর্তে প্রতি-মডেল লকআউট প্রযোজ্য হয়
  (এটি একটি নথিভুক্ত আপস — শাখাটির ওপরের কোড মন্তব্য দেখুন)।
- **একই-রিকোয়েস্ট কম্বো রাউটিং** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): একই গার্ড সংযোগটিকে
  ইন-মেমরি `exhaustedConnections` সেটে চিহ্নিত করে, যার কী
  `${provider}:${connectionId}`। এটি শুধু অবশিষ্ট কোনো SAME-REQUEST
  টার্গেটকে এড়িয়ে যায়, যার _নিজস্ব টার্গেট অবজেক্টেই ইতিমধ্যে ঠিক সেই
  `connectionId` রয়েছে_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` থাকে `exhaustedConnections` লুকআপের আগে) — একটি সাধারণ
  মডেল-লিস্ট কম্বোতে, যেখানে সিবলিং টার্গেটগুলোর নিজস্ব কোনো পিন করা
  `connectionId` থাকে না এবং প্রতিটি ডিসপ্যাচে রেসপন্সের
  `X-OmniRoute-Selected-Connection-Id` হেডার থেকে একটি আইডি রিজলভ করা হয়,
  সেই কী কখনোই মেলে না। সেই সাধারণ ক্ষেত্রে, অবশিষ্ট কোনো লেগকে সদ্য নিঃশেষিত
  অ্যাকাউন্টটি পুনরায় ব্যবহার করা থেকে রক্ষার প্রকৃত ব্যবস্থা এই Set **নয়** —
  সেটি হলো ওপরের পারসিস্টেন্স স্তর (সংযোগটির `rateLimitedUntil` এখন ভবিষ্যতের
  একটি সময় নির্দেশ করে), যার সঙ্গে একই গার্ডটি ব্যর্থতার জন্য
  `transientRateLimitedProviders` দমন করে (দেখুন "দুই-পর্যায়ের নকশা" এবং
  `targetExhaustion.ts`-এর `isAgentrouterConnectionQuotaScope` শাখায় থাকা
  কোড মন্তব্য): ওই Set-টি অচিহ্নিত রেখে দিলে, প্রোভাইডারের অবশিষ্ট লেগগুলোর
  জন্য `combo.ts`-এর `allowRateLimitedConnection` জোরপূর্বক অনুমোদন
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) সক্রিয় হয় **না**,
  ফলে ক্রেডেনশিয়াল নির্বাচনের `rateLimitedUntil` ফিল্টার
  (`src/sse/services/auth.ts:1238`) স্বাভাবিকভাবে মানা হয় এবং একটি অবশিষ্ট
  লেগ হয় অন্য কোনো, এখনও-যোগ্য agentrouter সংযোগ বেছে নেয়, নয়তো কোনো
  ক্রেডেনশিয়াল উপলভ্য না থাকায় ব্যর্থ হয় — এই শাখা যে সংযোগটিকে সদ্য
  কুলডাউনে রেখেছে, সেটিতে জোর করে ফিরে যায় না।

### দুই-পর্যায়ের নকশা: স্ট্যাটাস পুনর্ব্যক্তকরণ, তারপর শ্রেণিবিন্যাস

স্ট্যাটাস পুনর্ব্যক্তকরণ (`upstreamStatusRestatement.ts`) এবং প্রোভাইডার
শ্রেণিবিন্যাসের নিয়ম (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) পৃথক রেজিস্ট্রি; উভয়ই প্রোভাইডার আইডি ও টেক্সট
মার্কারকে কী হিসেবে ব্যবহার করে, তবে তারা ভিন্ন স্থানে চলে এবং ভিন্ন উদ্দেশ্য
পূরণ করে: পুনর্ব্যক্তকরণ `chatCore.ts`-এর শুরুর দিকেই HTTP স্ট্যাটাস পুনর্লিখন
করে; শ্রেণিবিন্যাসের নিয়মগুলো `checkFallbackError()`-এর ভেতরে
(`open-sse/services/accountFallback.ts`) ফলব্যাক `reason` এবং লক `scope`
(`model` / `provider` / `connection`) নির্ধারণ করে।

শ্রেণিবিন্যাসের নিয়মগুলো শুধু `providerErrorRules.ts`-এর
`FULL_TEXT_RULE_PROVIDERS` অ্যালাওলিস্টে থাকা প্রোভাইডারগুলোর জন্যই সম্পূর্ণ
ত্রুটির **টেক্সট** দেখতে পায় (`额度不足`-এর মতো বডি মার্কার মেলানোর জন্য এটি
প্রয়োজন) — বর্তমানে শুধু `"agentrouter"`। অন্য প্রতিটি **বিল্ট-ইন ক্যাটালগ**
প্রোভাইডারের ক্ষেত্রে, `checkFallbackError` `getProviderErrorRuleMatch`-কে
শুধু স্ট্রাকচার্ড ত্রুটি (`{code, type}`) দেয়, যা হেডার/স্ট্যাটাস/কোড-ভিত্তিক
নিয়মের জন্য যথেষ্ট, কিন্তু বডি-টেক্সট মার্কার দেখতে পায় না।
`resolveRuleMatchBody()` হেল্পারটি এই নির্বাচন সম্পন্ন করে: অ্যালাওলিস্টভুক্ত
প্রোভাইডারের জন্য সম্পূর্ণ ত্রুটির টেক্সট, অন্যথায় স্ট্রাকচার্ড ত্রুটি। কোনো
**বিল্ট-ইন** প্রোভাইডারকে `FULL_TEXT_RULE_PROVIDERS`-এ যোগ করা হলো স্পষ্ট
প্রতি-প্রোভাইডার অপ্ট-ইন — এটি রাখা হয়েছে যাতে তালিকায় না থাকা প্রতিটি
প্রোভাইডারের ডিফল্ট পাথ বাইট-ফর-বাইট অপরিবর্তিত থাকে।

কোনো নিয়মের `scope` (`model` / `provider` / `connection`) হলো
`FULL_TEXT_RULE_PROVIDERS` থেকে পৃথক একটি অপ্ট-ইন: `checkFallbackError` এটিকে
শুধু `fallbackResult.ruleScope` হিসেবে প্রকাশ করে, এবং ডাউনস্ট্রিম কনজিউমাররা
একই ফাইলের `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালাওলিস্টে থাকা
প্রোভাইডারগুলোর ক্ষেত্রেই এটিকে নিছক তথ্যমূলক লেবেলের চেয়ে বেশি কিছু হিসেবে
সম্মান করে (`honorsRuleLockScope()`-এর মাধ্যমে গেট করা — বর্তমানে শুধু
`"agentrouter"`)। কোনো প্রোভাইডার ওই অ্যালাওলিস্টে থাকার পর
`scope: "connection"` ম্যাচটি বাস্তবে কী করে, তা জানতে ওপরের "পুনর্ব্যক্ত করা
কোটা ত্রুটি" অংশটি দেখুন।

**#11104 — অপারেটর-ঘোষিত নিয়ম উভয় allowlist-ই এড়িয়ে যায়।** কোনো অপারেটর
এই ফাইলটি সম্পাদনা না করেই `settings.providerErrorRules`-এর মাধ্যমে রানটাইমে
প্রতি-provider নিয়ম ঘোষণা করতে পারেন
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)।
কোনো অপারেটর নিয়মকে
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এর পেছনে গেট করা — built-in catalog নিয়মগুলোর **ডিফল্ট** আচরণ সুরক্ষিত রাখার উদ্দেশ্যে তৈরি allowlist —
ইতিমধ্যে সেখানে তালিকাভুক্ত provider ছাড়া অন্য সব provider-এর জন্য
settings প্রক্রিয়াটিকে অকার্যকর করে দেবে, কারণ নিয়ম ঘোষণা করাটিই ইতিমধ্যে
অপারেটরের স্পষ্ট opt-in। `resolveRuleMatchBody()` এবং `honorsRuleLockScope()`
উভয়ই প্রথমে `hasOperatorRuleForProvider()` পরীক্ষা করে: কোনো provider-এর
অপারেটর নিয়ম থাকলে সেটি raw error text পায় এবং তার ঘোষিত `scope` সম্মানিত হয়,
provider-টি কোনো একটি allowlist-এ আছে কি না তা নির্বিশেষে।

**পরিচিত ঘাটতি — HTTP 400-এর ক্ষেত্রে `providerRuleRegistry` কখনোই পরামর্শ করা হয় না।**
`checkFallbackError`-এর `BAD_REQUEST` branch সম্পূর্ণভাবে নিজস্ব pattern array
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` ইত্যাদি,
`accountFallback.ts`-এ) ব্যবহার করে status 400 শ্রেণিবদ্ধ করে এবং তার আগেই return করে,
ফলে উপরের `configuredRule`/`getProviderErrorRuleMatch` branch-এ পৌঁছানো হয় না।
`status: 400`-সহ কোনো built-in catalog নিয়ম (বা অপারেটর নিয়ম)
সিনট্যাক্টিক্যালি বৈধ হলেও কখনোই কার্যকর হবে না। বর্তমানে কোনো বিদ্যমান নিয়ম
400-কে লক্ষ্য করে না, তাই production-এ কিছুই প্রভাবিত হচ্ছে না — তবে ভবিষ্যতের
কোনো 400 নিয়মের জন্য প্রথমে এই branch পরিবর্তন করতে হবে, যা একটি নিয়ম যোগ করার
চেয়ে বড় পরিবর্তন (এটি ইতিমধ্যে pattern-array আচরণের ওপর নির্ভরশীল প্রতিটি
provider-এর জন্য 400-কে পুনঃশ্রেণিবদ্ধ করে) এবং একক-provider নিয়ম সংযোজনের
পরিধির বাইরে।

### ভুল quota জানানো নতুন gateway যোগ করা

1. `statusRestatementRegistry`-তে একটি নিয়মের array নিবন্ধন করুন
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers`-কে
   provider-নির্দিষ্ট রাখুন; `CREDITS_EXHAUSTED_SIGNALS`-এর সঙ্গে সংঘর্ষ হয় এমন
   generic English phrase কখনো পুনর্ব্যবহার করবেন না
   (`open-sse/services/accountFallback.ts`)।
2. সঠিক lock scope বেছে নিতে ঐচ্ছিকভাবে
   `open-sse/config/providerErrorRules.ts`-এ (`providerRuleRegistry`)
   classification নিয়ম নিবন্ধন করুন (account-wide quota-এর জন্য `connection`,
   per-model error-এর জন্য `model`)। যেসব provider-এর নিয়মে সম্পূর্ণ error text
   (body marker) প্রয়োজন, কেবল তাদের ক্ষেত্রেই এই ধাপটি production-এ কার্যকর হয়:
   একই ফাইলের `FULL_TEXT_RULE_PROVIDERS`-এ provider id যোগ করুন — অন্যথায়
   `checkFallbackError` নিয়মটিকে কেবল structured `{code, type}` error-ই দেয় এবং
   কোনো body-text নিয়ম কখনো live traffic-এর সঙ্গে match করবে না।
   যেসব নিয়ম কেবল `status`/`headers`-এর ওপর match করে (যেমন Opencode বা
   Minimax-এর), সেগুলোর এই opt-in প্রয়োজন নেই। আলাদাভাবে, যদি নিয়মটি
   `scope: "connection"` ঘোষণা করে এবং উদ্দেশ্যটি কেবল একটি informational label
   নয়, বরং প্রকৃত connection-wide cooldown এবং একই request-এ combo skip হয়,
   তবে একই ফাইলের `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ provider id যোগ করুন —
   এটিই `markAccountUnavailable()`-এ (`src/sse/services/auth.ts`) এবং
   `applyComboTargetExhaustion()`-এ
   (`open-sse/services/combo/targetExhaustion.ts`)
   `isAgentrouterConnectionQuotaScope()`-ধরনের consumption গেট করে; এটি ছাড়া
   `scope` এখনও `fallbackResult.ruleScope`-এর মধ্য দিয়ে প্রবাহিত হয়, কিন্তু
   কোনো কিছুই তার ভিত্তিতে কাজ করে না।
3. `tests/unit/upstream-status-restatement.test.ts` এবং
   `tests/unit/agentrouter-error-rules.test.ts` অনুসরণ করে unit test যোগ করুন
   (not-permanent / not-creditsExhausted guard-সহ এবং — provider-এর allowlist
   প্রয়োজন হলে — এমন একটি test-সহ যা নিশ্চিত করে যে `resolveRuleMatchBody()`
   কেবল সেই provider-এর জন্য full text return করে)।

`chatCore.ts`, `classifyError` বা combo-তে কোনো পরিবর্তন প্রয়োজন নেই।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-এ থাকা provider-গুলোকে (opencode family)
IP-bucketed upstream হিসেবে বিবেচনা করা হয় (opencode free tier account-bucketed
নয়, বরং IP-bucketed — #9611 দেখুন): `quota_exhausted` **অথবা**
`rate_limit_exceeded` হিসেবে শ্রেণিবদ্ধ একটি status-429, rotation সেগুলো চেষ্টা
করার আগেই, ব্যর্থ connection-এর সর্বশেষ পরিচিত egress IP-এর সঙ্গে মিলে যায় এমন
প্রতিটি allowlisted-family connection-কে cooldown-এ পাঠায়
— ফলে নিশ্চিতভাবে ব্যর্থ হবে এমন N-1টি upstream call এড়ানো যায় (#10460/#10525-এর
মতো একই বিন্যাস)। `rate_limit_exceeded` ইচ্ছাকৃতভাবে অন্তর্ভুক্ত করা হয়েছে:
`markAccountUnavailable` path-এ opencode-নির্দিষ্ট নিয়মগুলো কখনো match করে না
(`checkFallbackError`-কে কোনো headers/body দেওয়া হয় না, opencode
`FULL_TEXT_RULE_PROVIDERS`-এ নেই), তাই subscription-quota text ("monthly usage
limit reached") বহনকারী body-সহ কোনো 429, `status_429` নিয়মে পৌঁছানোর আগেই
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1h cooldown) দ্বারা `quota_exhausted` হিসেবে শ্রেণিবদ্ধ হয় — অন্যদিকে
quota-text-বিহীন কোনো 429 (সাধারণ rate limiting) `status_429` নিয়মের মাধ্যমে
`rate_limit_exceeded` হিসেবে শ্রেণিবদ্ধ হয় এবং তারপরও IP family-টিকে cooldown-এ
পাঠায়। allowlisted provider-এর ক্ষেত্রে IP-bucketed rate limit নিঃশেষিত quota-এর
সমতুল্য signal। স্বীকার্য সীমাবদ্ধতা:

- **সর্বোচ্চ প্রচেষ্টা**: লকটি `proxy_logs` থেকে সংযোগটির সর্বশেষ জানা `egress_ip`
  নির্ণয় করে (24h উইন্ডো, সিঙ্ক্রোনাস, কোনো ক্যাশ নেই)। কোল্ড ক্যাশ (egress
  IP কখনো যাচাই করা হয়নি) বা কোনো রো না থাকলে → ব্যর্থ সংযোগটি তবুও এই
  ব্রাঞ্চ দ্বারা কুলড হয় (বর্তমানের মতোই রেকর্ড করা হয়), শুধু কোনো সিবলিং লক করা হয় না।
- **কখনোই টার্মিনাল নয়**: কুলডাউনটি একটি নবায়নশীল কোটা উইন্ডো
  (`testStatus: "unavailable"`); কোনো IP-স্তরের সিগন্যাল থেকে কখনোই স্থায়ী
  অবস্থা নির্ধারণ করা হয় না। `disableCooling` সংযোগগুলো ব্রাঞ্চটি সম্পূর্ণ এড়িয়ে যায়।
- **অ্যালাওলিস্টেড ফ্যামিলির জন্য লকের গ্র্যানুলারিটি পরিবর্তিত হয়**: এটি একটি স্কোপ
  পরিবর্তন, শুধু সিবলিং অপ্টিমাইজেশন নয়। opencode হলো একটি `passthroughModels`
  প্রোভাইডার, তাই এই ব্রাঞ্চের আগে একটি 429 প্রতি-MODEL লকআউট তৈরি করত; এখন এটি
  একটি সংযোগ কুলডাউন তৈরি করে — এমনকি এমন কোনো অপারেটরের ক্ষেত্রেও, যিনি মাত্র
  একটি সংযোগ চালাচ্ছেন এবং যার কোনো সিবলিংই নেই। opencode রুল টেবিল ইতোমধ্যেই
  এই গ্র্যানুলারিটিকে সঠিক বলে ঘোষণা করেছে (`scope: "connection"`,
  `providerErrorRules.ts`), কিন্তু এখন পর্যন্ত তা কখনো কার্যকর হয়নি, কারণ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ নেই। সংযোগ-স্কোপড agentrouter ব্রাঞ্চকে
  অনুসরণ করে, এই ব্রাঞ্চ নিজেই ব্যর্থ সংযোগটির কুলডাউন + `backoffLevel` লেখে
  এবং রিটার্ন করে — নিচের প্রতি-মডেল ব্লক ও জেনেরিক পাথে কখনোই পৌঁছানো হয় না।
- **কম্বো অন্তর্ভুক্ত**: agentrouter ব্রাঞ্চের মতো, স্কোপটি ইচ্ছাকৃতভাবে সেই
  `persistUnavailableState`/`isCombo` ডাউনগ্রেড উপেক্ষা করে, যা কোনো কম্বো কলার
  একটি 429-এ প্রয়োগ করে। প্রতি-মডেল লকআউট এই স্কোপের কোনো দুর্বলতর রূপ নয়,
  বরং এটি ভুল ইউনিট: নিঃশেষিত IP সম্পর্কে এটি কিছুই জানায় না, ফলে কম্বো
  রোটেশন প্রতিটি সিবলিংয়ের জন্য নিশ্চিতভাবে ব্যর্থ একটি করে কল করতে থাকবে।
- **সিবলিং সুরক্ষা**: ইতোমধ্যে টার্মিনাল (banned/credits_exhausted) অবস্থায় থাকা
  বা ইতোমধ্যে দীর্ঘতর কুলডাউনে থাকা কোনো সিবলিং কখনোই ওভাররাইট করা হয় না।
- **এক্সক্লুসিভ অ্যালাওলিস্ট**: `EGRESS_BUCKETED_LOCK_PROVIDERS` প্রসারিত করা
  মালিকের একটি সুস্পষ্ট সিদ্ধান্ত; কোনো জেনেরিক ওয়্যারিং নয় (প্যাটার্ন
  #10334/#10419)। সিবলিং কোয়েরিটি SQL লিটারেল হিসেবে পুনরাবৃত্তি না করে একই
  অ্যালাওলিস্ট বাইন্ড করে, তাই এটি প্রসারিত করতে মাত্র এক লাইনের পরিবর্তনই যথেষ্ট।
- **Egress IP রোটেশন, উভয় দিকে**: লুকআপ উইন্ডোটি (24h) egress-IP ক্যাশ TTL-এর
  (5 min) চেয়ে অনেক বড়, তাই "সর্বশেষ জানা IP" হলো ইতিহাস, বর্তমান অবস্থা নয়।
  উইন্ডোর মধ্যে কোনো সংযোগের প্রক্সি রোটেট হয়ে থাকলে লকটি সত্যিকার অর্থে শেয়ার
  করা কোনো IP **বাদ দিতে** পারে (রেকর্ড করা IP-টি নতুন, অনিঃশেষিতটি) — এবং
  একইভাবে এটি এমন কোনো সিবলিংকে **কুল করতে পারে, যা ইতোমধ্যে রোটেট করে**
  নিঃশেষিত IP থেকে সরে গেছে। দ্বিতীয় ক্ষেত্রে সেই সিবলিংকে একটি কুলডাউন উইন্ডো
  মূল্য দিতে হয়; উভয়টিই ইতিহাস-ভিত্তিক লুকআপের সর্বোচ্চ-প্রচেষ্টাসাপেক্ষ সীমাবদ্ধতা
  হিসেবে গৃহীত।
- **খরচ**: `proxy_logs`-এর দুটি সীমাবদ্ধ স্ক্যান (`idx_pl_timestamp`-এর মাধ্যমে
  উইন্ডো-ফিল্টার করা), শুধু 429 ঘটার ফ্রিকোয়েন্সিতে। কোনো নতুন ইনডেক্স নেই
  (মাইগ্রেশন 134 YAGNI)। মাঝারি আকারের বাস্তব-ট্রাফিক DB কপিতে পরিমাপ করা হয়েছে;
  একটি উচ্চ-থ্রুপুট ইনস্ট্যান্স একই উইন্ডোতে আনুপাতিকভাবে বেশি রো ধারণ করে।

---

## অন্যান্য স্থিতিস্থাপকতা বৈশিষ্ট্য

- **১৯টি রাউটিং কৌশল** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — দেখুন [AUTO-COMBO.md](../routing/AUTO-COMBO.md)।
- **রিসেট-সচেতন রাউটিং** (v3.8.0) — কোটা রিসেটের সময় অনুযায়ী সংযোগগুলোকে অগ্রাধিকার দেয়।
- **ব্যাকগ্রাউন্ড মোডের অবনমন** — Responses API-এর `background: true` সতর্কতাসহ সিঙ্ক মোডে অবনমিত হয়।
- **ডায়নামিক টুল সীমা শনাক্তকরণ** — টুলের সংখ্যা সীমায় পৌঁছালে প্রোভাইডারগুলো থেকে পিছিয়ে আসে।
- **জরুরি ফলব্যাক** — `OMNIROUTE_EMERGENCY_FALLBACK` দ্বারা নিয়ন্ত্রিত; অপারেটররা রিস্টার্ট ছাড়াই Feature Flags পৃষ্ঠা থেকে এটি ওভাররাইড করতে পারেন।

---

## ডিবাগিং

- Weighted combo `503 all_targets_cooling_down` উত্তর দেয় (`Retry-After` সেট থাকে, `diagnostics.excluded`-এ প্রতিটি target-কে `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`-সহ তালিকাভুক্ত করা হয়) → pool কনফিগার ও সংযুক্ত আছে, তবে প্রতিটি target-ই একটি resilience timer দ্বারা বাদ পড়েছে; `[COMBO] Weighted selection: every target excluded before dispatch — …` সতর্কবার্তাটি কারণগুলো এবং অবশিষ্ট সেকেন্ড উল্লেখ করে। একই combo থেকে একটি `404 no_executable_targets` পাওয়ার অর্থ হলো কোনো resilience timer জড়িত ছিল না (চালানোর মতো কিছু নেই, অথবা প্রতিটি account availability probe-এ ব্যর্থ হয়েছে)। `targetResolution.ts`-এ সংগৃহীত exclusions থেকে `open-sse/services/combo/pinRecovery.ts`-এ এটি নির্মিত।
- কোনো provider-এর সব key এড়িয়ে যাওয়া হচ্ছে → circuit breaker-এর state এবং প্রতিটি connection-এর `rateLimitedUntil`/`testStatus`—উভয়ই পরীক্ষা করুন।
- reset window-এর পরেও provider স্থায়ীভাবে বাদ পড়ে আছে → code সম্ভবত `getStatus()`/`canExecute()`-এর পরিবর্তে কাঁচা `state` পড়ছে।
- একটি key ব্যর্থ হলেও অন্যগুলোর কাজ করা উচিত → circuit breaker-এর পরিবর্তে connection cooldown-কে অগ্রাধিকার দিন।
- শুধু একটি model ব্যর্থ হচ্ছে → connection cooldown-এর পরিবর্তে model lockout-কে অগ্রাধিকার দিন।
- state-এর স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হওয়ার কথা, কিন্তু হচ্ছে না → ভবিষ্যতের timestamp এবং মেয়াদোত্তীর্ণ state refresh করে এমন read path পরীক্ষা করুন। স্থায়ী status-এর জন্য manual পরিবর্তন প্রয়োজন।

---

## TLS ফিঙ্গারপ্রিন্টিং ও স্টেলথ

প্রোভাইডার-নির্দিষ্ট স্টেলথ (JA3/JA4, CCH, obfuscation) আলাদাভাবে নথিভুক্ত করা হয়েছে — দেখুন `docs/security/STEALTH_GUIDE.md` (git-এ রয়েছে; `/docs`-এ কম্পাইল করা হয়নি)।

---

## স্থিতিস্থাপকতা পরীক্ষা (Phase 8 · Block C)

স্থিতিস্থাপকতা লজিকের ইউনিট টেস্টের পাশাপাশি, তিনটি পরীক্ষা বাস্তব
চাপ/ব্যর্থতার পরিস্থিতিতে রানটাইম যাচাই করে (সবগুলোই ইন্টিগ্রেশন/নাইটলি — কোনোটিই PR ব্লক করে না):

| পরীক্ষা     | যা যাচাই করে                                                                                                                                                                                           | চালানোর পদ্ধতি                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Chaos       | নকল আপস্ট্রিম নোড বাস্তব ল্যাটেন্সি/রিসেট/টাইমআউট/503 ইনজেক্ট করে; সার্কিট ব্রেকার খোলে/পুনরুদ্ধার হয় এবং `checkFallbackError` যে 503-কে পুনরুদ্ধারযোগ্য ফলব্যাক হিসেবে শ্রেণিবদ্ধ করে, তা যাচাই করে। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc`-এর অধীনে প্রতিটি `createSSEStream`-এর জন্য ~500টি স্ট্রিম; হিপ নির্ধারিত সীমা ছাড়িয়ে বাড়লে ব্যর্থ হয় (OOM গার্ড #3069)।                                                              | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health`-এর ওপর দীর্ঘস্থায়ী লোড; p95/ত্রুটি থ্রেশহোল্ড।                                                                                                                               | `k6 run tests/load/k6-soak.js` (নাইটলি) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) দ্বারা অর্কেস্ট্রেট করা হয়। ডিফল্ট
`test:integration`-এ chaos এবং heap নিজে থেকেই স্কিপ হয় (`RUN_CHAOS_INT`/`--expose-gc` ছাড়া)।

---

## আরও দেখুন

- [আর্কিটেকচার নির্দেশিকা](./ARCHITECTURE.md) — সিস্টেম আর্কিটেকচার ও অভ্যন্তরীণ কাঠামো
- [ব্যবহারকারী নির্দেশিকা](../guides/USER_GUIDE.md) — প্রোভাইডার, কম্বো, CLI ইন্টিগ্রেশন
- [অটো-কম্বো ইঞ্জিন](../routing/AUTO-COMBO.md) — ১৬-ফ্যাক্টর স্কোরিং, মোড প্যাক
