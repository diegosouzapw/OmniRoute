# Resilience Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute-এ তিনটি স্বতন্ত্র কিন্তু পরস্পর সম্পর্কিত রেজিলিয়েন্স মেকানিজম রয়েছে। প্রতিটির স্কোপ ও উদ্দেশ্য ভিন্ন। রাউটিং আচরণ ডিবাগ করার সময় এগুলোকে আলাদা রাখুন।

![৩-স্তরের রেজিলিয়েন্স মডেল](../diagrams/exported/resilience-3layers.svg)

> উৎস: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## ১. প্রোভাইডার সার্কিট ব্রেকার

**স্কোপ:** সম্পূর্ণ প্রোভাইডার (যেমন, `glm`, `openai`, `anthropic`)।

**উদ্দেশ্য:** আপস্ট্রিম/সার্ভিস লেভেলে বারবার ব্যর্থ হচ্ছে এমন প্রোভাইডারের কাছে ট্রাফিক পাঠানো বন্ধ করা।

**ইমপ্লিমেন্টেশন:**

- মূল ক্লাস: `src/shared/utils/circuitBreaker.ts`
- ওয়্যারিং: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- স্ট্যাটাস API: `GET /api/monitoring/health`
- রিসেট API: `POST /api/resilience/reset`
- র্যাপার: `open-sse/services/accountFallback.ts`
- ডিবি টেবিল: `domain_circuit_breakers`

**স্টেট:**

- `CLOSED` — স্বাভাবিক ট্রাফিক অনুমোদিত
- `DEGRADED` — ট্রাফিক এখনও অনুমোদিত, তবে বর্ধিত প্রোভাইডার ব্যর্থতা ট্র্যাক করা হচ্ছে; যথেষ্ট সফলতা হলে, কোনো বৈধ কানেকশন টেস্ট সফল হলে, অথবা শেষ ব্যর্থতার ধরনের জন্য দীর্ঘতম `OPEN` হোল্ডের পর (তার `cooldownByKind` মান, অন্যথায় `resetTimeout`, × `maxBackoffMultiplier`, কমপক্ষে একটি কুলডাউন) নতুন কোনো ব্যর্থতা ছাড়াই `CLOSED`-এ ফিরে আসে
- `OPEN` — প্রোভাইডার সাময়িকভাবে ব্লক করা; কম্বো রাউটিং এটি এড়িয়ে যায়
- `HALF_OPEN` — রিসেট টাইমআউট শেষ হয়েছে; প্রোব রিকোয়েস্ট অনুমোদিত

**কনফিগারযোগ্য ডিফল্ট (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience-এ প্রকাশিত):**

| ক্লাস   | ডিগ্রেড হয়  | ওপেন হয়      | রিসেট টাইমআউট |
| ------- | ------------ | ------------- | ------------- |
| OAuth   | 5টি ব্যর্থতা | 8টি ব্যর্থতা  | 60s           |
| API-key | 7টি ব্যর্থতা | 12টি ব্যর্থতা | 30s           |
| Local   | উদ্ভূত       | 2টি ব্যর্থতা  | 15s           |

`degradationThreshold` নিয়ন্ত্রণ করে প্রোভাইডার কখন `DEGRADED`-এ প্রবেশ করে; `failureThreshold` নিয়ন্ত্রণ করে কখন এটি ওপেন হয় এবং এড়িয়ে যাওয়া হয়। লোকাল প্রোভাইডার প্রোফাইল এখনও Resilience সেটিংস পেজে প্রকাশ করা হয়নি।

**ট্রিপ কোড:** শুধুমাত্র প্রোভাইডার-লেভেল স্ট্যাটাস `[408, 500, 502, 503, 504]`। অ্যাকাউন্ট-লেভেল ত্রুটির জন্য ট্রিপ করবেন না (বেশিরভাগ 401/403/429 — সেগুলো কুলডাউন বা লকআউটের অন্তর্গত)।

**লেজি রিকভারি:** যখন `OPEN`-এর মেয়াদ শেষ হয়, `getStatus()`, `canExecute()`, `getRetryAfterMs()` স্টেটকে `HALF_OPEN`-এ রিফ্রেশ করে। একই রিডগুলো (এবং পরবর্তী ব্যর্থতা) পুরনো `DEGRADED`-কে আবার `CLOSED`-এ নামিয়ে আনে। কোনো ব্যাকগ্রাউন্ড টাইমারের প্রয়োজন নেই।

---

### অপ্ট-ইন গ্লোবাল প্রোভাইডার কুলডাউন (উইন্ডো গেট)

একটি চতুর্থ, **অপ্ট-ইন** স্তর (`PROVIDER_COOLDOWN_ENABLED`, ডিফল্ট **অফ**) `open-sse/services/providerCooldownTracker.ts`-এ ব্যর্থ প্রোভাইডারদের একটি ক্রস-রিকোয়েস্ট মেমরি রাখে, যা কম্বো টার্গেট রেজোলিউশন করার সময় পরামর্শ করা হয়, যাতে পরপর কম্বো রিকোয়েস্টগুলো এইমাত্র ব্যর্থ হওয়া কোনো প্রোভাইডারে পুনরায় যাওয়া বন্ধ করে। প্রোভাইডার-লেভেল এন্ট্রিগুলো `PROVIDER_PROFILES` উইন্ডো গেট মেনে চলে:

| প্রোফাইল | ট্রিপ হয় এর পরে (`providerFailureThreshold`) | এর মধ্যে (`providerFailureWindowMs`) | কুলডাউন সময় (`providerCooldownMs`) |
| -------- | --------------------------------------------: | -----------------------------------: | ----------------------------------: |
| OAuth    |                                          `10` |                              `15min` |                              `5min` |
| API key  |                                          `15` |                              `30min` |                             `10min` |

থ্রেশহোল্ডের নিচে প্রোভাইডারকে কুলিং হিসেবে ধরা হয় **না**; একটি সফলতা উইন্ডোটি মুছে দেয়। কানেকশন-লেভেল এন্ট্রিগুলো (`provider:connectionId`) এর পরিবর্তে এক্সপোনেনশিয়াল `minRetryCooldownMs → maxRetryCooldownMs` ব্যাকঅফ বজায় রাখে। ওভাররাইড: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`। রিগ্রেশন গার্ড: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. সংযোগ কুলডাউন

**স্কোপ:** একক প্রোভাইডার কানেকশন/অ্যাকাউন্ট/কী।

**উদ্দেশ্য:** একটি ত্রুটিপূর্ণ কী বাদ দেওয়া, যখন একই প্রোভাইডারের অন্যান্য কানেকশন সেবা দিতে থাকে।

**বাস্তবায়ন:**

- অনুপলব্ধ হিসেবে চিহ্নিত করা: `src/sse/services/auth.ts::markAccountUnavailable()`
- নির্বাচন: একই ফাইলে `getProviderCredentials*`
- কুলডাউন হিসাব: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

**প্রতি কানেকশনের ফিল্ড:**

- `rateLimitedUntil` — কুলডাউন শেষ হওয়া পর্যন্ত টাইমস্ট্যাম্প
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — এক্সপোনেনশিয়াল ব্যাকঅফ কাউন্টার

**ডিফল্ট কুলডাউন:**

- OAuth বেস: 5s
- API-কী বেস: 3s
- API-কী 429: আপস্ট্রিম `Retry-After`/রিসেট হেডার/পার্সযোগ্য রিসেট টেক্সটকে অগ্রাধিকার দেয়
- ব্যাকঅফ: `baseCooldownMs * 2 ** failureIndex`

**অ্যান্টি-থান্ডারিং-হার্ড গার্ড:** সমসাময়িক ব্যর্থতাগুলোকে কুলডাউন অতিরিক্ত প্রসারিত করা বা `backoffLevel` দ্বিগুণ-বর্ধিত করা থেকে বিরত রাখে।

**কনকারেন্সি-লিমিট 429 ব্যাকঅফ সিঁড়িতে ওঠে না।** যে `429`-এর বডিতে কনকারেন্সি লিমিট রিপোর্ট করা হয় ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) তার অর্থ অ্যাকাউন্টটি সুস্থ কিন্তু ব্যস্ত।
`checkFallbackError()` কারণ হিসেবে `concurrency_limited` রিটার্ন করে: এখনই পরবর্তী কানেকশনে ফেইল ওভার করে, এটিকে একটি নির্দিষ্ট `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) বা আপস্ট্রিম রিট্রাই হিন্ট অনুযায়ী কুলডাউনে রাখে, `backoffLevel` অপরিবর্তিত রাখে এবং `skipProviderBreaker` সেট করে।
স্পষ্ট কোটা বডি তখনও প্রাধান্য পায়, তাই কোটা প্যাটার্নের সাথেও ম্যাচ করে এমন একটি বডি কোটা ভার্ডিক্টই থাকে।
শনাক্তকরণ: `src/shared/utils/classify429.ts`-এ `looksLikeConcurrencyLimit()`;
ভার্ডিক্ট: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()` (ব্রেকারের
`FailureKind`) অপরিবর্তিত এবং এই বডিগুলোর জন্য এখনও `rate_limit` পড়ে।

**স্ট্রিম কনটেন্ট স্টল অ্যাকাউন্টকে কুলডাউনে রাখে না।** যখন কনটেন্ট-স্টল ওয়াচডগ
(`open-sse/utils/streamHandler.ts`) এমন একটি স্ট্রিম থেকে হাল ছেড়ে দেয় যা সময়মতো কোনো মডেল আউটপুট
পাঠায়নি, তখন `markAccountUnavailable()` কানেকশনে ত্রুটিটি রেকর্ড করে কিন্তু কোনো কুলডাউন সেট
করে না: স্টলটি সেই রিকোয়েস্টেরই — প্রায়শই এটি এমন একটি দীর্ঘ রিজনিং টার্ন যেখানে এখনও কোনো
আউটপুট আসেনি। অপারেটররা `resilienceSettings.streamStallCooldown.enabled`
(ডিফল্ট `false`) দিয়ে আবার অপ্ট-ইন করতে পারেন।

**রিজনিং ফ্রেমগুলো কনটেন্ট-স্টল বাজেট রিস্টার্ট করে।** একটি রিজনিং মডেল তার প্রথম
দৃশ্যমান টোকেনের আগে মিনিটের পর মিনিট ভাবতে পারে: Claude এমন `thinking_delta` ফ্রেম স্ট্রিম করে যেগুলোর
থিংকিং টেক্সট খালি হতে পারে, আর Responses API একের পর এক রিজনিং আইটেম স্ট্রিম করে।
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) এই
ফ্রেমগুলো চিনতে পারে, এবং ওয়াচডগ টার্নটি বাতিল না করে প্রতিটি ফ্রেমে তার বাজেট রিস্টার্ট করে।
এগুলো তবুও মডেল আউটপুট নয়, তাই শুধুমাত্র রিজনিং দিয়ে শেষ হওয়া একটি টার্ন এখনও খালি
হিসেবে রিপোর্ট করা হয়, এবং যে টার্ন রিজনিং বন্ধ করে শুধু হার্টবিট পাঠায় তা এখনও
ওয়াচডগ ট্রিপ করে।

অ-খালি সিগনেচারসহ Kiro-এর বাইনারি `reasoningContentEvent` ফ্রেমগুলো এই
রিজনিং অ্যাক্টিভিটিকে একজিকিউটরের মধ্য দিয়ে একটি খালি `reasoning_content` ডেল্টা হিসেবে সংরক্ষণ করে।
সিগনেচারটি ফরওয়ার্ড করা হয় না। মেটাডেটা, অসম্পূর্ণ ফ্রেম এবং খালি সিগনেচার
কনটেন্ট বাজেট রিস্টার্ট করে না; স্বাধীন অ্যাক্টিভ-স্ট্রিম টাইমআউট এবং ক্লায়েন্ট ক্যান্সেলেশন
এখনও প্রযোজ্য (`open-sse/executors/kiro/reasoning.ts`)।

**টার্মিনাল স্টেট (কুলডাউন নয়):**

- `banned` — ব্যানড-কীওয়ার্ড / অ্যাকাউন্ট-ব্যান শনাক্তকরণ দ্বারা সেট করা হয় (দেখুন [BAN_DETECTION](../security/BAN_DETECTION.md)), এবং পরপর তিনটি আপস্ট্রিম প্রতি-রিকোয়েস্ট প্রত্যাখ্যানের দ্বারা (`request_rejected`, যেমন Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); একটি মাত্র প্রত্যাখ্যান কানেকশনটিকে শুধু কুলডাউনে রাখে
- `expired` (সীমাবদ্ধ রিট্রাইয়ের পরে টার্মিনালে রূপান্তরিত হয় — এক্সপোনেনশিয়াল ব্যাকঅফসহ `EXPIRED_RETRY_MAX = 3` — যাতে ক্ষণস্থায়ী OAuth ত্রুটিগুলো অ্যাকাউন্ট স্থায়ীভাবে নিষ্ক্রিয় হওয়ার আগে নিজে থেকেই সেরে যেতে পারে)
- `credits_exhausted`

ক্রেডেনশিয়াল পরিবর্তন না হওয়া বা কোনো অপারেটর রিসেট না করা পর্যন্ত এগুলো টিকে থাকে। টার্মিনাল স্টেটগুলোকে ক্ষণস্থায়ী কুলডাউন স্টেট দিয়ে ওভাররাইট করবেন না।

**লেজি রিকভারি:** `rateLimitedUntil` পেরিয়ে গেলে, কানেকশন আবার যোগ্য হয়ে ওঠে। সফল ব্যবহারে, `clearAccountError()` সমস্ত এরর ফিল্ড মুছে দেয়।

### Claude OAuth ব্যবহার-সীমা: নিম্ন-অগ্রাধিকার লেন + সেশন-লিমিট রিসেট

**স্কোপ:** একটি Claude সাবস্ক্রিপশন (OAuth) কানেকশন। উভয় ফিচারই **প্রতি
কানেকশনে অপ্ট-ইন** (Edit connection → Claude section → `providerSpecificData`-এ
`lowPriorityMode` / `autoLimitReset`, উভয়ই ডিফল্ট অফ) এবং Claude Code-এর `/low-priority` ও
`/limit-reset` কমান্ডের প্রতিচ্ছবি (Claude Code 2.1.263 থেকে ক্যাপচার করা ওয়্যার কন্ট্রাক্ট)।

**বাস্তবায়ন:**

- স্টেট মেশিন + রেসপন্স শ্রেণীবিন্যাস: `open-sse/services/claudeLowPriority.ts`
- রিসেট স্ট্যাটাস/ক্লেইম ক্লায়েন্ট: `open-sse/services/claudeLimitReset.ts`
- একজিকিউটর হুক (হেডার ইনজেকশন + একই-অ্যাকাউন্ট রিট্রাই): `open-sse/executors/base.ts::execute()`
- অপ্ট-ইন পারসিস্টেন্স: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ট্রিগার:** 5-ঘণ্টার ব্যবহার-সীমা — এমন একটি `429` যার হেডারে থাকে
`anthropic-ratelimit-unified-status: rejected` এবং, অ্যাকাউন্টটি যোগ্য হলে,
`anthropic-ratelimit-unified-slow-offer: treatment`। সেই প্রথম সীমার
429-এর আগে কিছুই পাঠানো হয় না; ইউনিফাইড হেডার ছাড়া একটি বার্স্ট 429 স্বাভাবিক কুলডাউন
পথ দিয়ে যায়।

**নিম্ন-অগ্রাধিকার লেন** (`lowPriorityMode`):

- ওয়াল 429-এ এক্সিকিউটর অফারটি গ্রহণ করে এবং অবিলম্বে `anthropic-usage-limit: slow` সহ
  **একই** অ্যাকাউন্টে পুনঃচেষ্টা করে; লেনটি ঘোষিত
  `anthropic-ratelimit-unified-reset` পর্যন্ত সক্রিয় থাকে (+60s গ্রেস) এবং সেই উইন্ডোর প্রতিটি
  অনুরোধ হেডারটি বহন করে। ইন্টারসেপ্ট করা 429 কখনই `handleChatCore`-এ পৌঁছায় না, তাই সংযোগটি
  কুলডাউনে রাখা হয় **না** এবং রোটেটও করা হয় না।
- পরবর্তী রেসপন্সগুলিতে `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  লেনটি ধরে রাখে; `slot_busy` (429) বা একটি `529` সার্ভারের
  `anthropic-ratelimit-unified-slow-retry-after` (ডিফল্ট 20s, ক্ল্যাম্প 5–600s, ±30% জিটার)
  পর্যন্ত অপেক্ষা করে এবং পুনঃচেষ্টা করে, যা `anthropic-ratelimit-unified-slow-max-wait`
  (ডিফল্ট 20 মিনিট, ক্ল্যাম্প 1 মিনিট–6 ঘণ্টা) দ্বারা সীমাবদ্ধ — তার পরে লেনটি শেষ হয় এবং একটি
  10-মিনিটের কুল-অফ পুনর্গ্রহণ ব্লক করে। অপেক্ষাটি অতিরিক্তভাবে অনুরোধের নিজস্ব
  আপস্ট্রিম-স্টার্ট টাইমআউটের (`resolveFetchStartTimeout`, ডিফল্ট 10 মিনিট) অবশিষ্ট সময় থেকে
  5 সেকেন্ডের মার্জিন বাদ দিয়ে সীমাবদ্ধ: সেই ক্যাপ ছাড়া 20-মিনিটের ডিফল্ট ম্যাক্স-ওয়েট
  অনুরোধের চেয়ে বেশিক্ষণ টিকে থাকত এবং স্লিপটি মাঝ-অপেক্ষায় বাতিল হয়ে যেত, যা সুষ্ঠু
  `max_wait` সমাপ্তি + কুল-অফের পরিবর্তে একটি `TimeoutError` প্রকাশ করত।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, একটি 5-ঘণ্টার উইন্ডো রোলওভার, বা
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (যা যেকোনো স্ট্যাটাসে এটিকে
  `extra_usage` হিসাবে শেষ করে, যেহেতু পেইড ওভারেজ এখন ওয়ালটি কভার করে) লেনটি শেষ করে;
  রেসপন্সটি তারপর স্বাভাবিক কুলডাউন পথে প্রবাহিত হয়। `budget_exhausted` ঘোষিত বাজেট রিসেট
  পর্যন্ত মনে রাখা হয় (≤ 8 দিন)।
- ওয়াল চেকটি এক্সিকিউটরের নিজস্ব 400-চালিত ইন্ট্রা-অ্যাটেম্পট পুনঃচেষ্টার (কনটেক্স্ট এডিটিং,
  থিঙ্কিং/এফোর্ট ক্ল্যাম্প, প্যারাম অটো-লার্ন) পরে চলে, তাই এমন একটি ওয়াল 429 যা কেবল সেই
  পুনঃচেষ্টাগুলির কোনো একটিতে প্রকাশ পায় তাও কুলডাউন পথে পৌঁছানোর বদলে ইন্টারসেপ্ট করা হয়।
- স্টেট প্রতি সংযোগে ইন-মেমরি থাকে (একটি রিস্টার্টে পুনর্গ্রহণের জন্য একটি অতিরিক্ত ওয়াল 429
  খরচ হয়)।

**সেশন-লিমিট রিসেট** (`autoLimitReset`, উভয়ই চালু থাকলে লেনের আগে চেষ্টা করা হয়):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ব্লক; যখন `arm: "reset"` এবং `available: true`, তখন
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` সহ
  `{ "program": "juniper_tide" }` (অর্গানাইজেশন UUID আসে
  `providerSpecificData.organizationUUID` থেকে, বুটস্ট্র্যাপ ফলব্যাক)।
- `result: reset|not_limited` → অনুরোধটি পূর্ণ গতিতে পুনঃচেষ্টা করা হয় (কোনো slow হেডার ছাড়া)।
  `already_used` / `not_offered` `next_available_at` মেমোইজ করে (ডিফল্ট এক সপ্তাহ); যেকোনো
  ব্যর্থতা 15 মিনিট ব্যাক অফ করে। রিসেটটি সপ্তাহে একবার এবং তা এখনও সাপ্তাহিক সীমায় গণ্য হয়।

রিগ্রেশন গার্ড: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### সেশন অ্যাফিনিটি (#7274)

**পরিধি:** একটি ক্লায়েন্ট সেশন (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` হেডার) একটি সংযোগে পিন করা, **যেকোনো** প্রোভাইডারের জন্য।

**উদ্দেশ্য:** একটি মাল্টি-টার্ন এজেন্টকে (Claude Code, aider, কাস্টম এজেন্ট) অনুরোধগুলি জুড়ে একই অ্যাকাউন্টে রাখা, যাতে প্রতি-অ্যাকাউন্ট সেশন স্টেটযুক্ত প্রোভাইডারগুলিতে ক্রস-অ্যাকাউন্ট কনটেক্স্ট ক্ষতি এবং বারবার কোল্ড-স্টার্ট 429 হ্রাস পায়।

**বাস্তবায়ন:**

- TTL রেজোলিউশন: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- পিন নির্বাচন/তৈরি: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- হেডার এক্সট্রাকশন (জেনেরিক, যেকোনো প্রোভাইডার): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- পার্সিস্টেড পিন টেবিল: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- সেটিং: `sessionAffinityTtlMs` (মিলিসেকেন্ডে গ্লোবাল TTL, `0` নিষ্ক্রিয় করে) — `src/lib/db/settings.ts`। মাইগ্রেশন `124_generic_session_affinity_ttl.sql` দ্বারা Codex-একচেটিয়া `codexSessionAffinityTtlMs` থেকে নাম পরিবর্তন করা হয়েছে, যা পূর্বে কনফিগার করা যেকোনো Codex TTL-কে নতুন ডিফল্ট হিসাবে বহন করে।

#7274-এর আগে, `resolveSessionAffinityTtlMs()` `codex` ছাড়া প্রতিটি প্রোভাইডারের জন্য `0`-তে হার্ড-বেইল করত, তাই TTL সেটিং (এবং সেশন হেডারগুলি) অন্য কোথাও কোনো প্রভাব ফেলত না — যদিও পিনিং মেকানিজম এবং হেডার এক্সট্রাকশন ইতিমধ্যেই প্রোভাইডার-অজ্ঞোস্টিক ছিল। ফিক্সটি সেই আর্লি-রিটার্নটি সরিয়ে দিয়েছে; গ্লোবালি `0`-এর উপরে সেট করা হলে TTL এখন প্রতিটি প্রোভাইডারে সমানভাবে প্রযোজ্য হয়।

তিনটি সেশন-অ্যাফিনিটি হেডার কখনই আপস্ট্রিমে ফরোয়ার্ড করা হয় না — এক্সিকিউটররা ক্লায়েন্ট হেডার পাস-থ্রু করার পরিবর্তে শুরু থেকেই নিজস্ব আপস্ট্রিম হেডার তৈরি করে, তাই এটি কেবল একটি অভ্যন্তরীণ কোরিলেশন আইডি হিসাবেই থাকে।

### এক্সক্লুসিভ ম্যানেজড সেশন সংযোগ লিজ

**পরিধি:** একটি সক্রিয় ম্যানেজড HTTP ক্লায়েন্ট/সেশন একটি যোগ্য OmniRoute সংযোগের মালিক হয়।

**উদ্দেশ্য:** এমন ক্লায়েন্টদের জন্য টেকসই এক্সক্লুসিভ সংযোগ মালিকানা প্রদান করা যাদের
অনুরোধগুলি জুড়ে একটি হার্ড রাউটিং ফেন্স প্রয়োজন। এটি সেশন অ্যাফিনিটি থেকে আলাদা, যা একটি
সফট ধারাবাহিকতা পছন্দ মাত্র: একটি এক্সক্লুসিভ লিজ SQLite-এ লাইফসাইকেল স্টেট সংরক্ষণ করে,
গ্লোবাল অ্যাক্টিভ-ওনার ও অ্যাক্টিভ-কানেকশন ইউনিকনেস প্রয়োগ করে, এবং প্রোভাইডার ডিসপ্যাচের আগে
স্টেল জেনারেশন প্রত্যাখ্যান করে।

ফিচারটি প্রতি API কী-তে অপ্ট-ইন। একটি ম্যানেজড কী-এর `lease:exclusive` স্কোপ এবং একটি স্পষ্ট
অ-খালি `allowedConnections` তালিকা থাকতে হবে। যেকোনো HTTP ক্লায়েন্ট লাইফসাইকেল এন্ডপয়েন্ট
ব্যবহার করতে পারে; কোনো ক্লায়েন্ট নাম, ইউজার-এজেন্ট, প্রোভাইডার, OAuth পদ্ধতি বা মডেলের
প্রয়োজন নেই। লিজটি একটি সংযোগের মালিক, মডেলের নয় — তাই সংযোগটি সাধারণভাবে যোগ্য থাকা পর্যন্ত
মডেল পরিবর্তন করলেও বাইন্ডিং বজায় থাকে। স্বাভাবিক মডেল, কোটা, হেলথ, কুলডাউন এবং অ্যালোলিস্ট
নিয়মগুলি কর্তৃত্বপূর্ণ থাকে এবং একই জেনারেশনকে অন্য একটি ফ্রি যোগ্য সংযোগে স্থানান্তর করতে
পারে।

লাইফসাইকেল হলো `POST /api/v1/session-leases`, যার সাথে JSON অ্যাকশন রয়েছে `acquire`, `renew` এবং `release`।
ম্যানেজড ইনফারেন্স রিকোয়েস্টগুলি অস্বচ্ছ `X-OmniRoute-Lease-Owner` মান এবং সঠিক
`X-OmniRoute-Lease-Generation` উপস্থাপন করে। owner-এ `vlo_` এর পরে 43টি base64url অক্ষর ব্যবহৃত হয়; শুধুমাত্র এর SHA-256 হ্যাশ সংরক্ষণ করা হয়। প্রতিটি চূড়ান্ত dispatch ফেন্স এছাড়াও প্রমাণীকৃত API key ID এবং সক্রিয় connection ID-কে বাঁধে। লিজ কন্ট্রোল হেডারগুলি লগ, সংরক্ষিত রিকোয়েস্ট স্ন্যাপশট এবং আপস্ট্রিম executor হেডার থেকে সরিয়ে দেওয়া হয়।

যদি সাধারণ রাউটিং-এ যোগ্য ম্যানেজড ক্যান্ডিডেট থাকে কিন্তু প্রতিটি ফাঁকা ক্যান্ডিডেট কোনো বহিরাগত সক্রিয় লিজের দখলে থাকে, তাহলে OmniRoute HTTP `429`, lease-capacity-unavailable কোড, একটি waiting-for-capacity অবস্থা এবং সবচেয়ে শীঘ্র প্রাসঙ্গিক মেয়াদোত্তীর্ণতা থেকে প্রাপ্ত একটি সীমাবদ্ধ `Retry-After` ফেরত দেয়।
সাধারণ খালি eligibility লিজ contention নয় এবং এটি এর বিদ্যমান রাউটিং এরর semantics বজায় রাখে।

সম্পর্কিত মেকানিজমগুলি আলাদা থাকে:

- OAuth সেশন occupancy হলো OAuth অ্যাকাউন্টগুলির জন্য প্রসেস-লোকাল সফট ডিস্ট্রিবিউশন।
- অ্যাকাউন্ট সেমাফোরগুলি রিকোয়েস্ট-কনকারেন্সি পারমিট প্রদান করে এবং রিকোয়েস্ট সম্পূর্ণ হলে শেষ হয়।
- এক্সক্লুসিভ ম্যানেজড সেশন লিজ হলো জেনারেশন ফেন্স সহ টেকসই লাইফসাইকেল মালিকানা।

---

## 3. মডেল লকআউট

**পরিধি:** প্রোভাইডার + কানেকশন + মডেল—এই তিনটির সমন্বয়।

**স্ট্যাটাস অনুযায়ী কী-এর পরিধি:** ব্যর্থতার স্ট্যাটাস নির্ধারণ করে কোনো লকআউট কোন কী-তে লেখা হবে (`open-sse/services/accountFallback/exactModelLock.ts`-এর `resolveLockoutScope()`):

- `429` / `403` / `402` — কোটা বা এনটাইটেলমেন্ট সংকেত — **কোটা ফ্যামিলি** লক করে:
  codex-এর ক্ষেত্রে পুরো `codex` / `spark` পরিধি (কানেকশনের প্রতিটি `gpt-5*` মডেল), অন্য প্রোভাইডারের ক্ষেত্রে `getQuotaScopedModelForProvider()`।
- `404` কেবল মডেলটিকে লক করে (`getModelLockKey()` `not_found`-কে সংকুচিত করে)।
- অন্য যেকোনো স্ট্যাটাস — `5xx` ট্রান্সপোর্ট/সার্ভার ব্যর্থতা এবং কোয়ালিটি ভ্যালিডেশন থেকে OmniRoute-এর নিজস্ব
  তৈরি করা `502` — শুধু **নির্দিষ্ট**
  প্রোভাইডার/কানেকশন/মডেল টাপলটি লক করে। একটি মডেলের ত্রুটিপূর্ণ স্ট্রিম অ্যাকাউন্টের কোটা সম্পর্কে কোনো প্রমাণ নয়;
  এই নিয়ম চালু হওয়ার আগে `codex/gpt-5.6-luna`-তে একটি খালি রেসপন্স সেই কানেকশনের
  প্রতিটি `gpt-5*` মডেলকে রাউটিং থেকে 2–30 মিনিটের জন্য (ক্রমশ বৃদ্ধি পেয়ে) সরিয়ে দিত,
  যদিও এর কোটা অপরিবর্তিত থাকত।
- কলারের স্পষ্ট `scope` অপশন সবসময় অগ্রাধিকার পায় (Antigravity `"exact"` পাস করে)।

**উদ্দেশ্য:** শুধু একটি মডেল অনুপলভ্য বা কোটা-সীমাবদ্ধ হলে পুরো কানেকশন নিষ্ক্রিয় করা এড়ানো।

**উদাহরণ:**

- প্রতি-মডেল কোটা প্রোভাইডার থেকে 429 ফিরে আসা
- একটি অনুপস্থিত মডেলের জন্য লোকাল প্রোভাইডার থেকে 404 ফিরে আসা
- প্রোভাইডার-নির্দিষ্ট মোড/মডেল অনুমতি ব্যর্থতা (যেমন, Grok মোড)

**ইমপ্লিমেন্টেশন:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### মডেল কুলডাউন ড্যাশবোর্ড (v3.8.0)

UI: সেটিংস → মডেল কুলডাউন (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

সক্রিয় লকআউটের তালিকায় থাকে: প্রোভাইডার, কানেকশন, মডেল, কারণ, expiresAt। অপারেটররা কার্ড থেকে ম্যানুয়ালি একটি মডেল পুনরায় সক্রিয় করতে পারেন।

**REST API:**

- `GET /api/resilience/model-cooldowns` — সক্রিয় লকআউটের তালিকা
- `DELETE /api/resilience/model-cooldowns` — ম্যানুয়াল পুনঃসক্রিয়করণ। বডি: `{provider, connection, model}`। অথ: ম্যানেজমেন্ট।

### কুলডাউন ম্যানেজার

UI: মনিটরিং → কুলডাউন ম্যানেজার (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

ক্ষণস্থায়ী কোনো কারণে রাউটিংয়ের বাইরে থাকা প্রতিটি কানেকশনের জন্য আলাদা প্রোভাইডার পেজ খোলার পরিবর্তে
একটি পেজ। এটি কানেকশন কুলডাউন, মডেল লকআউট এবং টার্মিনাল স্টেটের তালিকা দেখায়; প্রতি কানেকশন,
নির্বাচিত কানেকশনসমূহ অথবা কোনো প্রোভাইডারের সব কানেকশনের জন্য সেগুলো সাফ করে; এবং সবচেয়ে বেশি
টিউন করা কুলডাউন নিয়মগুলো সম্পাদনা করে: `streamStallCooldown.enabled` এবং OAuth / API-key
`connectionCooldown`-এর বেস কুলডাউন ও সর্বোচ্চ ব্যাকঅফ ধাপ (`PATCH /api/resilience`-এর মাধ্যমে
সেভ করা হয়)। টার্মিনাল স্টেটগুলো (`banned`, `expired`, `credits_exhausted`) তালিকাভুক্ত হয়,
কিন্তু এখান থেকে কখনো সাফ করা হয় না।

**REST API** (`src/lib/resilience/cooldownManager.ts`, অথ: ম্যানেজমেন্ট):

- `GET /api/resilience/cooldowns[?provider=]` — স্ট্যাটাস, অবশিষ্ট কুলডাউন,
  ব্যাকঅফ লেভেল, সর্বশেষ এরর টাইপ এবং মডেল লকআউটসহ কানেকশনসমূহ (কোনো ক্রেডেনশিয়াল নয়)
- `POST /api/resilience/cooldowns` — বডি `{connectionIds: string[]}` অথবা
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` রিটার্ন করে

### লকআউট সেটিংস UI + সাকসেস-ডিকে রিকভারি (v3.8.23)

মডেল লকআউট সবসময়-চালু হার্ডকোডেড আচরণ থেকে নিজস্ব সেটিংস কার্ড এবং
স্বয়ংক্রিয়ভাবে সুস্থ হয়ে ওঠার রিকভারি পাথসহ সম্পূর্ণ কনফিগারযোগ্য,
অপ্ট-ইন ফিচারে পরিণত হয়েছে।

**সেটিংস কার্ড:** সেটিংস → মডেল লকআউট
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
এটি উপরের কেবল-পঠনযোগ্য `ModelCooldownsCard` থেকে **আলাদা** (যা শুধু সক্রিয় লকআউট
_তালিকাভুক্ত_ করে) — নতুন কার্ডটি _প্যারামিটারগুলো কনফিগার করে_। ডিফল্টগুলো
`DEFAULT_MODEL_LOCKOUT_SETTINGS`-এ রয়েছে
(`src/lib/resilience/modelLockoutSettings.ts`):

| সেটিং                   | ডিফল্ট                           | অর্থ                                                           |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | মাস্টার টগল — মডেল লকআউট **ডিফল্টভাবে বন্ধ**।                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | যেসব আপস্ট্রিম স্ট্যাটাস মডেল-স্কোপড ব্যর্থতা হিসেবে গণ্য হয়। |
| `baseCooldownMs`        | `120_000` (120 সেকেন্ড)          | প্রথম ব্যর্থতার প্রাথমিক লকআউট সময়কাল।                        |
| `maxCooldownMs`         | `1_800_000` (30 মিনিট)           | ক্রমবর্ধমান কুলডাউনের সর্বোচ্চ সীমা।                           |
| `maxBackoffSteps`       | `10`                             | এক্সপোনেনশিয়াল-ব্যাকঅফ বৃদ্ধির সর্বোচ্চ ধাপ।                  |
| `useExponentialBackoff` | `true`                           | পুনরাবৃত্ত ব্যর্থতায় কুলডাউন এক্সপোনেনশিয়ালি বাড়বে কি না।   |

সেটিংস সাধারণ সেটিংস স্টোরের মাধ্যমে সংরক্ষিত থাকে এবং রেজিলিয়েন্স সেটিংস স্কিমার মাধ্যমে
ভ্যালিডেট হয়; কার্ডটি `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` সহ) এবং `maxBackoffSteps`-কে সীমার মধ্যে রাখে।

**সাকসেস-ডিকে রিকভারি:** রিকভারি **শুধু** টাইমারের মেয়াদ শেষ হওয়ার ওপর নির্ভরশীল নয়। একটি সুস্থ
রেসপন্স মডেলের ব্যর্থতার সংখ্যা ধাপে ধাপে কমিয়ে দেয়, ফলে উইন্ডোর মাঝামাঝি সময়ে পুনরুদ্ধার হওয়া
কোনো মডেলের টাইমার শেষ হওয়ার আগেই বৃদ্ধি থেমে যায় (এবং লকআউট সাফ হয়)। কোনো সফল
কম্বো টার্গেটে `open-sse/services/combo.ts` থেকে `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) কল করা হয়, যা সংরক্ষিত
`failureCount`-কে **অর্ধেক** করে (`Math.floor(failureCount / 2)`); এটি `0`-এ পৌঁছালে লকআউট
এন্ট্রি সম্পূর্ণভাবে মুছে ফেলা হয়। বিপরীত দিকের `recordModelLockoutFailure()`
এসকেলেশন উইন্ডোর মধ্যে ব্যর্থতা ঘটলে কাউন্ট বাড়ায় (এবং কুলডাউন বৃদ্ধি করে)।
এই সাকসেস-ডিকে সাধারণ টাইমার মেয়াদ শেষ হওয়ার অতিরিক্ত ব্যবস্থা —
যেকোনো পথেই একটি মডেল পুনরায় সক্রিয় হতে পারে।

**স্টেট:** লকআউটগুলো **ইন-মেমোরি** রাখা হয় (প্রতি-প্রসেস `Map`, যেখানে
`ModelLockoutEntry`-এর কী হলো `provider:connectionId:model` এবং নির্দিষ্ট-স্কোপ লকের কী হলো
`provider:connectionId:exact:model`), DB-তে সংরক্ষিত নয় —
রিস্টার্ট হলে সেগুলো হারিয়ে যায়। _সেটিংস_ সংরক্ষিত থাকে; সক্রিয়
লকআউট _স্টেট_ ক্ষণস্থায়ী।

---

## 4. কোটা-শেয়ার কনকারেন্সি নিয়ন্ত্রণ (v3.8.36)

সাবস্ক্রিপশন অ্যাকাউন্টগুলো (GLM, MiniMax ইত্যাদি) প্রায়শই মাত্র ~১–৩টি সমবর্তী
রিকোয়েস্ট গ্রহণ করে; এর বেশি হলে 429 ও কুলডাউন ঘটে। **কোটা-শেয়ার**
(`qtSd/…`) কম্বোর ক্ষেত্রে এটি বিশেষভাবে তীব্র, যেখানে একাধিক API কী একটি আপস্ট্রিম
অ্যাকাউন্ট ভাগ করে। তিনটি স্তর একটি শেয়ার্ড অ্যাকাউন্টকে প্লাবিত হওয়া থেকে রক্ষা করে।

### প্রতি-কানেকশন কনকারেন্সি সীমা (`max_concurrent`)

প্রতিটি প্রোভাইডার কানেকশন একটি `max_concurrent` সর্বোচ্চ সীমা ঘোষণা করতে পারে
(`provider_connections.max_concurrent`, কানেকশন মোডাল / API / DB-তে সেট করা যায়)।
সীমা না রাখতে খালি রাখুন। এটিই সেই একক নব যা নিচের সিরিয়ালাইজেশন
স্তরটি চালায় — এটি অ্যাকাউন্টের প্রকৃত কনকারেন্সিতে সেট করুন (যেমন GLM ~১, MiniMax ~২)।

### প্রতি-মডেল কনকারেন্সি সীমা (`modelConcurrency`)

একটি কানেকশন অতিরিক্তভাবে তার `rateLimitOverrides` ম্যাপের ভেতরে
নির্ভুল প্রতি-মডেল কনকারেন্সি সর্বোচ্চ সীমা ঘোষণা করতে পারে:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

এটি কানেকশন মোডালে সেট করুন (**Rate limit overrides → Per-model
concurrency caps**, প্রতি লাইনে একটি `model=cap`) অথবা
`PATCH /api/providers/[id]` দিয়ে একই JSON আকৃতিতে। মূল শব্দার্থ:

- **কানেকশন-ব্যাপী বনাম মডেল-নির্দিষ্ট:** `maxConcurrent` শেয়ার্ড
  কানেকশন-ব্যাপী সর্বোচ্চ সীমা হিসেবে থেকে যায়। উভয়টি প্রযোজ্য হলে, উভয় গেট
  একই কম্পোজিট গেটে পারমাণবিকভাবে অর্জিত হয়
  (`global → provider → account → model`); কার্যকর আচরণ হলো
  প্রযোজ্য সীমাগুলোর মধ্যে কঠোরতমটি।
- **নির্ভুল মডেল-কী মিল:** কী হলো রাউটিং রেজোলিউশনের পর এক্সিকিউটরে পাঠানো
  মডেল স্ট্রিং — সাধারণত বিশুদ্ধ আপস্ট্রিম মডেল আইডি
  (`glm-5`), ক্লায়েন্ট-সাইড `provider/model` অ্যালিয়াস নয় (`zai/glm-5`
  `glm-5`-এর সাথে মেলে না)। মানগুলো ধনাত্মক-পূর্ণসংখ্যার সমবর্তী-রিকোয়েস্ট সর্বোচ্চ সীমা।
- **স্থানীয় কিউয়িং, কোনো ডিসকভারি নয়:** অতিরিক্ত রিকোয়েস্ট বিদ্যমান কিউ/টাইমআউট
  শব্দার্থে স্থানীয়ভাবে কিউতে অপেক্ষা করে (টাইপড `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` অ্যাডমিশন ত্রুটি)। OmniRoute আপস্ট্রিম নীতি আবিষ্কার
  বা অনুমান করে না — এটি অপারেটরের কনফিগার করা নির্ভুল সীমাগুলোই
  প্রয়োগ করে। পরিপূর্ণ মডেল গেট কখনো প্রোভাইডারকে নিষ্ক্রিয় করে না এবং কখনো
  স্থায়ী মডেল লকআউট তৈরি করে না; আপস্ট্রিম 429/কুলডাউন/ফলব্যাক আচরণ
  ত্রুটি-সুরক্ষাবলয় হিসেবে থেকে যায়।
- **প্রতি-কানেকশন, প্রতি-প্রসেস সুযোগ:** সীমাগুলো প্রতি ডাটাবেস কানেকশন
  ভিত্তিক এবং ইন-মেমরিতে ধারণ করা হয়, তাই একই আপস্ট্রিম API কী পুনঃব্যবহারকারী
  দুটি কানেকশন একে অপরের সাথে সমন্বয় করে না।
- **কনফিগার না করলে অপরিবর্তিত:** ম্যাপ বাদ দিলে (বা ড্যাশবোর্ড
  ফিল্ড খালি রাখলে) কোনো মডেল গেট যুক্ত হয় না। কোনো সার্বজনীন প্রোভাইডার
  সীমা নির্ধারণ না করেই উদাহরণস্বরূপ কনফিগারেশন:

```text
glm-5=1
glm-4.7=3
```

### কোটা-শেয়ার রিকোয়েস্ট সিরিয়ালাইজেশন

যখন একটি কোটা-শেয়ার ডিসপ্যাচ এমন কানেকশনকে লক্ষ্য করে যা ধনাত্মক
`max_concurrent` ঘোষণা করে, তখন ঐ **অ্যাকাউন্টে** সমবর্তী রিকোয়েস্টগুলো একটি
প্রতি-কানেকশন সেমাফোরের (কী `qsconn:<connectionId>`) মাধ্যমে সিরিয়ালাইজ হয়:
অতিরিক্ত রিকোয়েস্ট অ্যাকাউন্ট প্লাবিত না করে **কিউতে অপেক্ষা করে**। এটি
**ফেইল-ওপেন** — পরিপূর্ণ কিউ বা টাইমআউট হলে ডিসপ্যাচযোগ্য রিকোয়েস্ট প্রত্যাখ্যান না করে
স্লট ছাড়াই এগিয়ে যায়। **Settings → Resilience → Quota-share per-connection
concurrency**-এ টগল করুন (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
ডিফল্ট চালু)। `max_concurrent` সীমা না থাকলে আচরণ অপরিবর্তিত থাকে।

> কোটা-শেয়ার রাউটিং গেট (`selectQuotaShareTarget`, DRR + P2C) নিজেই
> ফেইল-ওপেন এবং সীমায় পৌঁছানো কানেকশনকে কেবল _অগ্রাধিকার হ্রাস_ করে —
> একক-কানেকশন পুলে এটি কঠোরভাবে সীমাবদ্ধ করতে পারে না, তাই এই সেমাফোরই
> প্রকৃতপক্ষে প্লাবন ধারণ করে।

### কম্বো কুলডাউন-সচেতন রিট্রাই

প্রতিটি কম্বো স্ট্র্যাটেজির জন্য (চালু থাকলে), এমন রিকোয়েস্ট যা একটি স্বল্পমেয়াদি
ক্ষণস্থায়ী কুলডাউনের জন্য 429 সৃষ্টি করত, সেটি 429 ফেরত না দিয়ে অপেক্ষা করে
পুনরায় ডিসপ্যাচ হয় — এটি মাল্টি-মডেল কম্বোগুলোতে Gemini-শ্রেণীর TPM/RPM
উইন্ডো (~৬০ সেকেন্ড retry-after) কভার করে, যেমন ২-মডেল কম্বোর উভয় টার্গেট
প্রতি-মডেল রেট লিমিটে পড়লে। **Settings → Resilience**-এ `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) দ্বারা সীমাবদ্ধ। এটি কখনো
`quota_exhausted` (মধ্যরাত পর্যন্ত লকড) বা auth/not-found কারণে অপেক্ষা করে না।

একই গেট প্রি-ডিসপ্যাচ কেসটিও (#16319) কভার করে: যখন কোনো প্রচেষ্টা করার আগেই
কম্বোর প্রতিটি টার্গেট বাদ পড়ে কারণ এর মডেল স্বল্প ক্ষণস্থায়ী লকআউটে আছে,
তখন শূন্য-প্রচেষ্টা পাথ একই সীমার মধ্যে লক শেষ হওয়া পর্যন্ত অপেক্ষা করে পুনরায়
ডিসপ্যাচ করে, ইঙ্গিত-বিহীন `503 ALL_TARGETS_SKIPPED` উত্তর না দিয়ে।
যখন কোনো অপেক্ষা অনুমোদিত নয় (সীমা, প্রচেষ্টা বা বাজেট শেষ, বা ফিচার
বন্ধ), তখন টার্মিনাল রেসপন্স `429 rate_limit_error`-এ উন্নীত হয় এবং প্রথমতম
ক্ষণস্থায়ী লক মেয়াদোত্তীর্ণের `retry_after` / `reset_at` বহন করে; কোটা, auth
এবং not-found লকগুলো ইঙ্গিত-বিহীন 503-ই বজায় রাখে।

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. রিকোয়েস্ট কিউ অ্যাডমিশন কন্ট্রোল (v3.8.49 · ইস্যু #6593)

**পরিধি**: স্থানীয় প্রতি-প্রোভাইডার+কানেকশন রেট-লিমিট কিউ (`open-sse/services/rateLimitManager.ts`, Bottleneck দ্বারা চালিত), উপরের তিনটি মেকানিজমের এক স্তর নিচে।

**`maxWaitMs` কিউ-অপেক্ষার সীমা নির্ধারণ করে; `executionMaxWaitMs` এক্সিকিউশনের সীমা নির্ধারণ করে।**
এই দুটি ইচ্ছাকৃতভাবে আলাদা, এবং কোনোটিই অন্যটিকে ইনপুট দেয় না।

`resilienceSettings.requestQueue.maxWaitMs` হল **কিউ-অপেক্ষা বাজেট**: এটি প্রোভাইডার স্লটের জন্য অপেক্ষা এবং তারপর QUEUED অবস্থায় বসে থাকাকে কভার করে, এবং জবটি QUEUED ছেড়ে এক্সিকিউট হওয়া শুরু করার মুহূর্তেই এর টাইমার মুছে যায় (`rateLimitManager.ts`, `wrappedFn`)। যে রিকোয়েস্ট এটি অতিক্রম করে তা কখনই আপস্ট্রিমে পৌঁছায় না। ডিফল্ট 30000ms, যা `src/lib/resilience/settings.ts`-এ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` দ্বারা সরবরাহ করা হয় এবং `tests/unit/ratelimit-admission-control-6593.test.ts` দ্বারা পিন করা হয়, তাই এটি পরিবর্তন করলে এই অনুচ্ছেদটি নীরবে পুরনো হয়ে না গিয়ে সেই টেস্টটি লাল হয়ে যাবে।

`resilienceSettings.requestQueue.executionMaxWaitMs` হল সেটি যা Bottleneck জব `expiration` হিসেবে পায়, যার টাইমার শুধুমাত্র ডিসপ্যাচের পরে শুরু হয়। এটি এমন এক্সিকিউটরদের জন্য একটি ব্যাকস্টপ যাদের নিজস্ব আপস্ট্রিম টাইমআউট নেই, এবং এক্সিকিউটরের নিজের fetch-শুরু টাইমআউট বেশি হলে এটি সেই পর্যন্ত বাড়ানো হয়, যাতে এটি কোনো সুস্থ ইন-ফ্লাইট রেসপন্সকে কেটে দিতে না পারে। ডিফল্ট 600000ms (10 মিনিট)।

কিউ বাজেটকে `expiration`-এ ফিড করার কারণেই অ-ইনক্রিমেন্টাল গেটওয়েগুলো মাঝপথে মারা যেত — সেগুলো প্রথম বাইটের আগে কয়েক মিনিট ধরে চলা যুক্তিসঙ্গত — এবং এই কারণেই একটি expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) হিসেবে দেখায়, অথচ কিউ বাজেট কিউ-টাইমআউট কোড বহন করে। যেকোনো একটি ওভাররাইড করুন `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) অথবা ড্যাশবোর্ড
(**Settings → Resilience**) দিয়ে। নরমালাইজ করার সময় দুটোই 1ms–24h-এ ক্ল্যাম্প করা হয়।

**উভয়ের জন্য অগ্রাধিকার:** env ভেরিয়েবল শুধুমাত্র _ডিফল্ট_ সরবরাহ করে। `resilienceSettings.requestQueue`-এ সংরক্ষিত মান (ড্যাশবোর্ড / API patch, `key_value`-তে জমা থাকে) এর উপর জেতে, এবং প্রতি-কানেকশন
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` তার উপর জেতে। তাই এমন ডিপ্লয়মেন্টে env ভেরিয়েবল সেট করলে যেখানে ইতিমধ্যে সংরক্ষিত মান আছে, কিছুই পরিবর্তন হয় না — পরিবর্তে সংরক্ষিত সেটিংটি মুছে ফেলুন বা আপডেট করুন।

কিউতে অবস্থানের সময় `maxWaitMs` দ্বারা সীমাবদ্ধ; নিচের `maxQueueDepth` সীমা নির্ধারণ করে একসাথে কতজন কলার কিউতে থাকতে পারবে।

**বডি-উল্লেখিত রিট্রাই: পেসিং বনাম লকআউট।** একটি 429 বডি তার নিজের অপেক্ষার সময় উল্লেখ করতে পারে
(Gemini `RetryInfo.retryDelay`, "retry after Ns" টেক্সট), যা
`updateFromResponseBody` পড়ে। কানেকশনের `maxWaitMs`-এর মধ্যে মাপসই হওয়া অপেক্ষা হলো পেসিং: লিমিটার সেই সময়ের জন্য তার রিজার্ভয়ার খালি করে এবং এটি পুনর্ভর্তি হলে কিউতে থাকা কলগুলো ডিসপ্যাচ হয়। `maxWaitMs`-এর চেয়ে লম্বা অপেক্ষা এমন কিছু যা কিউ বসে কাটাতে পারে না — Gemini শেষ হয়ে যাওয়া দৈনিক কোটার উত্তরে
`retryDelay: "86399s"` দেয়। পুনর্নির্মিত 429-এ রিলে করা `Retry-After` (#16528)
ইতিমধ্যে ফলব্যাক ইঞ্জিনকে সেই সময়ের জন্য মডেলটি লক করিয়ে দেয়, কিন্তু এটির জন্য লিমিটারও পজ করলে তখনও কী-তে তাড়াতাড়ি পৌঁছে যাওয়া যেকোনো কল
(উদাহরণস্বরূপ, resilience রিসেটের পরে) পুরো `maxWaitMs` ধরে আটকে যেত। যখন এমন অপেক্ষা টাইপড Google `RetryInfo`
বিবরণ থেকে আসে (`google_rpc_retry_info` প্রোভেন্যান্স) এবং কী-এর লিমিটার
ইতিমধ্যে মডেল-স্কোপড হয় (দেখুন `getLimiterKey`), তখন 429 পরিবর্তে সেই কানেকশনে একটি মডেল
লকআউটে পরিণত হয় (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, সর্বোচ্চ 24h পর্যন্ত), এবং
লিমিটারকে পজ না করেই রেখে দেওয়া হয়। অ্যাকাউন্ট নির্বাচন `isModelLocked()` দিয়ে সেই লকে এড়িয়ে যায়,
এবং কানেকশনে পিন করা টার্গেটের জন্য কম্বো প্রি-ডিসপ্যাচ গেটও তাই করে। antigravity-তে, যার লিমিটার প্রতি কোটা ফ্যামিলিতে, লকটি হুবহু মডেলের উপর থাকে, তার অন্যান্য কোটা লকের মতো। কোনো এলিয়াস যখন ক্লায়েন্টের চাওয়া নামটিকে সেই মডেলে রিজলভ করে, তখন সেই নামটিও লক হয়, কারণ সেই চেকগুলো অনুরোধ করা নাম ব্যবহার করে; এটি হুবহু লক হয় (`lockExactModel`), তাই এমন এলিয়াস যা কোনো antigravity কোটা ফ্যামিলি বা codex স্কোপ অতিক্রম করে, কখনই তার নিজেরটিকে লক করে না। একটি গদ্য ইঙ্গিত, টাইপহীন `retryDelay`, অথবা
পুরো কানেকশন দ্বারা ভাগ করা লিমিটার থাকলে পজটিই বজায় থাকে। যখন 429 পাথের সদ্য পুনর্নির্মিত লিমিটারটি পজ করে, তখন যে কলারের অবশিষ্ট কিউ সময় পজ শেষ হওয়ার আগেই শেষ হয়, তাকে সেই সময় অপেক্ষা না করিয়ে সঙ্গে সঙ্গে কিউ-টাইমআউট কোড
(`checkLimiterPause`) দিয়ে ফিরিয়ে দেওয়া হয়; রেকর্ড করা শেষ-সময় নোঙর করা হয় লিমিটার তৈরি হওয়ার আগে, যেখানে Bottleneck তার রিফ্রেশ
ঘড়ি শুরু করে, এবং রিজার্ভয়ারের পরবর্তী যেকোনো পরিবর্তন এটিকে ভুলে যায়। কভার করেছে
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` এবং
`tests/unit/rate-limit-body-retry-pause.test.ts`।

**`maxQueueDepth` — অপ্ট-ইন অ্যাডমিশন ক্যাপ (নতুন)।** `resilienceSettings.requestQueue.maxQueueDepth`
সীমা নির্ধারণ করে একটি প্রোভাইডার+কানেকশনের জন্য একসাথে কতগুলো রিকোয়েস্ট কিউতে বসে থাকতে পারবে (এখনো ডিসপ্যাচ হয়নি)। যখন কিউতে ইতিমধ্যে `maxQueueDepth` সংখ্যক রিকোয়েস্ট আছে, তখন নতুন রিকোয়েস্টটি টাইপড
`code: "RATE_LIMIT_QUEUE_FULL"` এরর দিয়ে দ্রুত-প্রত্যাখ্যান করা হয় **আগেই** সে `limiter.schedule()`-এ পৌঁছানোর
— তাই প্রত্যাখ্যানটি সস্তা এবং সেই রিকোয়েস্টের যেকোনো ডাউনস্ট্রিম
প্রম্পট-কম্প্রেশন / অনুবাদ কাজের আগেই ঘটে। ডিফল্ট `0` =
নিষ্ক্রিয়, বিদ্যমান সীমাহীন-কিউ আচরণ বজায় রাখে; সীমা 0–100000।
ওভাররাইড করুন `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) অথবা
`resilienceSettings.requestQueue.maxQueueDepth` (ড্যাশবোর্ড/API patch) দিয়ে।

অ্যাডমিশন চেকটি নিজেই একটি বিশুদ্ধ ফাংশন
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) তাই
এটি প্রকৃত Bottleneck লিমিটার ছাড়াই ইউনিট-টেস্টযোগ্য।

> যে RFC-টি #6593 খুলেছিল, সেটি একটি `bypassCompressionOnRateLimit`
> ফ্ল্যাগও প্রস্তাব করেছিল। এই রিপোজিটরির `open-sse/services/compression/` পাইপলাইন হলো
> আউটবাউন্ড LLM রিকোয়েস্টে প্রম্পট/কনটেক্সট কম্প্রেশন (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ব্লকের আশেপাশে),
> সিনথেসাইজ করা 429 বডিতে HTTP রেসপন্স কম্প্রেশন নয় — একটি লিটারেল বাইপাস ফ্ল্যাগের জন্য কোনো
> মিলে যাওয়া কোড পাথ নেই। সেই প্রম্পট-কম্প্রেশন ধাপটি বর্তমানে রিকোয়েস্ট পাইপলাইনে
> `withRateLimit()`-এর _আগে_ চলে, তাই কিউ-ফুল রিজেকশনে এটি এড়িয়ে যেতে
> পুনর্বিন্যাস করা এই ইস্যুর সুযোগের চেয়ে একটি আলাদা, বড় পরিবর্তন; এটি ইচ্ছাকৃতভাবে
> এখানে বাস্তবায়িত **হয়নি** এবং CPU-সাশ্রয়ের লাভ পুনর্বিন্যাসের ঝুঁকির
> তুলনায় সার্থক হলে ফলো-আপ হিসেবে রেখে দেওয়া হয়েছে।

### রেট-লিমিট অটো-এনেবল সেফটি নেট ও কানেকশন প্রোটেকশন (`rateLimitProtection`)

**অটো-এনেবল সেফটি নেট** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ডিফল্ট `true`):
ডিফল্টরূপে, OmniRoute স্বয়ংক্রিয়ভাবে সমস্ত সক্রিয় API-কি প্রোভাইডার কানেকশনের জন্য রেট-লিমিট কিউ প্রোটেকশন চালু করে (`getProviderCategory(provider) === "apikey"`)। এটি নিশ্চিত করে যে রেট-সংবেদনশীল আপস্ট্রিম API কি-গুলোতে আগত রিকোয়েস্টগুলো আপস্ট্রিম 429 এররে বিস্ফোরিত না হয়ে Bottleneck-এর মাধ্যমে কিউ ও থ্রটল হয়। সেফটি নেটটি `RATE_LIMIT_AUTO_ENABLE` এনভায়রনমেন্ট ভেরিয়েবলের মাধ্যমে ওভাররাইড করা যায় (`false`/`0`/`off` বন্ধ করে, `true`/`1`/`on` জোরপূর্বক চালু করে), যা সংরক্ষিত ড্যাশবোর্ড সেটিংসের (**Settings → Resilience** / `PATCH /api/resilience`) চেয়ে অগ্রাধিকার পায়।

**প্রতি-কানেকশন `rateLimitProtection`-এর শব্দার্থ:**

প্রতি-কানেকশন রেট-লিমিট প্রোটেকশন প্রোভাইডার কানেকশনের `rateLimitProtection` বুলিয়ান ফিল্ডের মাধ্যমে ট্র্যাক করা হয় (SQLite-এ `rate_limit_protection` হিসেবে সংরক্ষিত):

- **স্পষ্টভাবে চালু (`rateLimitProtection === true`)**: এই কানেকশনের জন্য রেট-লিমিট প্রোটেকশন স্পষ্টভাবে চালু করা হয়েছে, প্রোভাইডার ক্যাটাগরি বা অটো-এনেবল সেফটি নেট চালু আছে কিনা তা নির্বিশেষে।
- **স্পষ্টভাবে বন্ধ (`rateLimitProtection === false`)**: স্পষ্ট প্রোটেকশন বন্ধ করে, কিন্তু একটি সক্রিয় API-কি কানেকশনকে গ্লোবাল অটো-এনেবল সেফটি নেট থেকে বাদ দেয় **না**। `reconcileEnabledConnections`-এ (`open-sse/services/rateLimitManager.ts`), `false` এবং `undefined` সমতুল্য: শুধুমাত্র `rateLimitProtection === true`-কে স্পষ্ট ওভাররাইড হিসেবে গণ্য করা হয়। যদি `rateLimitProtection` `false` হয় (বা সেট না করা থাকে), একটি সক্রিয় API-কি কানেকশন এখনও অটো-এনেবল শর্তের সাথে মিলে যায় এবং রেট-লিমিট প্রোটেক্টেড থেকে যায়।
- **কোনো প্রতি-কানেকশন অপ্ট-আউট নেই**: একজন অপারেটর বর্তমানে অন্যদের জন্য অটো-এনেবল সক্রিয় রেখে "এই একক সক্রিয় API-কি কানেকশনটি অবশ্যই রেট-লিমিট কিউ প্রোটেকশন ছাড়া চলবে" প্রকাশ করতে পারেন না। রেট-লিমিট কিউ ছাড়াই API-কি কানেকশন সম্পূর্ণরূপে চালাতে হলে, সেফটি নেটটি গ্লোবালি বন্ধ করতে হবে (`RATE_LIMIT_AUTO_ENABLE=false` বা `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**সমর্থিত রাইট পাথ:**

- **`POST /api/rate-limits`**: একটি কানেকশনের জন্য `rateLimitProtection` টগল করার সমর্থিত ম্যানেজমেন্ট রাইট পাথ (`{ connectionId: string, enabled: boolean }`)। এটি `enabled: true` দিয়ে কল করলে স্পষ্ট প্রোটেকশন চালু হয়; এটি `enabled: false` দিয়ে কল করলে স্পষ্ট প্রোটেকশন সরে যায় (যদিও অটো-এনেবল চালু থাকলে সক্রিয় API-কি কানেকশনগুলো গ্লোবাল সেফটি নেটের আওতায় থেকে যায়)।
- **`PUT /api/providers/[id]`**: ইচ্ছাকৃতভাবে `rateLimitProtection` গ্রহণ বা পরিবর্তন করে **না** (#11278)। `PUT /api/providers/[id]`-এর মাধ্যমে প্রোভাইডার কানেকশন মেটাডেটা আপডেট করলে সংরক্ষিত রেট-লিমিট প্রোটেকশন অবস্থা কখনোই পরিবর্তিত হবে না।

---

## ৬. স্লো-স্ট্রিম থ্রুপুট ওয়াচডগ (#9709)

ঐচ্ছিক `resilienceSettings.streamRecovery.throughputWatchdog` গার্ড এমন একটি আপস্ট্রিম শনাক্ত করে যা এখনও চাঙ্ক পাঠাচ্ছে কিন্তু কনফিগার করা কার্যকর-আউটপুট হারের নিচে অ্যাসিস্ট্যান্ট আউটপুট তৈরি করছে। এটি ইচ্ছাকৃতভাবে আইডল টাইমআউট থেকে আলাদা: হার্টবিট এবং মেটাডেটা কোনো টাইমারই রিসেট করে না এবং অগ্রগতি হিসেবে গণ্য হয় না। এটি হার্ড অ্যাটেম্পট ডেডলাইন (#9153) থেকেও আলাদা, যা আউটপুটের মান নির্বিশেষে একটি পরম নিরাপত্তা সীমা হিসেবে থেকে যায়।

অ্যাবর্ট করতে পারার আগে ওয়াচডগের একটি ওয়ার্ম-আপ সময়কাল এবং তারপর একটি সম্পূর্ণ রোলিং উইন্ডো প্রয়োজন। এটি Chat Completions এবং Responses API আউটপুট ইভেন্ট থেকে টেক্সট ডেল্টা গণনা করে (একটি রক্ষণশীল UTF-8 বাইট প্রক্সি), শুধুমাত্র-ইউসেজ এবং খালি ইভেন্ট উপেক্ষা করে, এবং টুল-কল বা রিজনিং ইভেন্ট চলমান থাকা অবস্থায় সিদ্ধান্ত স্থগিত রাখে। এটি ডিফল্টভাবে নিষ্ক্রিয় থাকে এবং `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` দিয়ে সক্রিয় করা যায়; উইন্ডো, ওয়ার্ম-আপ, ন্যূনতম হার এবং ন্যূনতম পরিমাপযোগ্য আউটপুট স্বাভাবিক রেজিলিয়েন্স-সেটিংস নর্মালাইজেশন স্তর দ্বারা সীমাবদ্ধ।

সক্রিয় থাকলে, ওয়াচডগ অ্যাবর্ট শুধুমাত্র সক্রিয় আপস্ট্রিম অ্যাটেম্পটে প্রয়োগ করা হয়। ক্লায়েন্ট-দৃশ্যমান কোনো বাইটের আগে, বিদ্যমান একই-অ্যাকাউন্ট আর্লি-রিকভারি পথ অ্যাটেম্পটি পুনরায় খুলতে পারে। কমিটের পরে, স্ট্রিমটি কখনও অন্ধভাবে রিপ্লে করা হয় না; শুধুমাত্র বিদ্যমান নিরাপদ মিড-স্ট্রিম কন্টিনিউয়েশন চুক্তিই একটি সাফিক্স জোড়া লাগাতে পারে। ফাইনালাইজেশন এককালীন (single-shot) থেকে যায়, তাই ইউসেজ হিসাব এবং সেমাফোর রিলিজ ডুপ্লিকেট হয় না।

---

## 7. আপস্ট্রিম স্ট্যাটাস পুনঃবিবৃতি (ভুলভাবে উল্লেখিত কোটা এরর)

**পরিধি:** একটি আপস্ট্রিম গেটওয়ে যা ভুল HTTP স্ট্যাটাস দিয়ে সাময়িক কোটা শেষ হয়ে যাওয়ার রিপোর্ট করে।

**উদ্দেশ্য:** শ্রেণীবিভাগের আগে (BEFORE) একটি বিভ্রান্তিকর স্ট্যাটাস সংশোধন করা, যাতে ডাউনস্ট্রিম কনজিউমাররা (ফলব্যাক ইঞ্জিন, কম্বো অ্যাগ্রিগেশন, ক্লায়েন্ট-মুখী রেসপন্স) ব্যর্থতার প্রকৃত পুনঃপ্রচেষ্টাযোগ্য প্রকৃতি দেখতে পায়।

কিছু গেটওয়ে অ-পুনঃপ্রচেষ্টাযোগ্য HTTP স্ট্যাটাস দিয়ে সাময়িক কোটা শেষ হয়ে যাওয়ার সংকেত দেয়। `agentrouter.org` স্ট্যান্ডার্ড `429`-এর পরিবর্তে একটি চীনা বডি (`用户额度不足` / `额度不足`) সহ `403` (মাঝে মাঝে `400`) রিটার্ন করে। Claude Code-এর মতো ক্লায়েন্টরা `403`-কে স্থায়ী হিসেবে বিবেচনা করে এবং সেশন বাতিল করে দেয়, আর সংশোধন ছাড়া ফলব্যাক ইঞ্জিন এটিকে কোটা ইভেন্টের পরিবর্তে `AUTH_ERROR` হিসেবে শ্রেণীবদ্ধ করবে।

**বাস্তবায়ন:**

- রেজিস্ট্রি + ম্যাচার: `open-sse/config/upstreamStatusRestatement.ts` — প্রতি-প্রোভাইডার নিয়মের একটি তালিকা (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), যা `applyStatusRestatement()`-এর মাধ্যমে ম্যাচ করা হয়।
- কল সাইট: `open-sse/handlers/chatCore.ts`-এ `providerFailure:` ব্লক (প্রায় 3654 লাইনে), ঠিক `parseUpstreamError()` একটি এরর HTTP স্ট্যাটাস (`!providerResponse.ok`) সহ আপস্ট্রিম রেসপন্স পার্স করার পরে, এবং যেকোনো শ্রেণীবিভাগ চলার আগে, যাতে প্রতিটি ডাউনস্ট্রিম কনজিউমার সংশোধিত স্ট্যাটাস দেখতে পায়। একটি `200` SSE স্ট্রিমের ভিতরে এমবেড করা এররগুলি একটি পৃথক, পরবর্তী স্ট্রিম-পার্সিং পথ অনুসরণ করে এবং আজ এই হুক দ্বারা **আচ্ছাদিত নয়** — একটি পরিচিত সীমাবদ্ধতা, agentrouter-এর ভুল স্ট্যাটাসের জন্য এখনও প্রয়োজন হয়নি (যা একটি এরর HTTP স্ট্যাটাস হিসেবে প্রকাশিত হয়)।
- পুনঃপ্রচেষ্টার যোগ্যতা: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`-এ রয়েছে (`open-sse/services/combo/unavailableRetryGate.ts`), তাই একটি পুনঃবিবৃত এরর একটি মৃত `403` হিসেবে প্রকাশিত হওয়ার পরিবর্তে একটি প্রকৃত পুনঃপ্রচেষ্টার উইন্ডো বহন করে।
- সিনথেটিক `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) কেবল সেটিই যা পুনঃবিবৃত রেসপন্স **ক্লায়েন্ট**-কে জানায়; এটি নিজে সংযোগের অভ্যন্তরীণ কুলডাউন/লকআউট সময়কাল নয় — তা আলাদাভাবে নিয়ন্ত্রিত হয় যে মেকানিজমই আসলে পুনঃবিবৃত এররটি পরিচালনা করে (কানেকশন কুলডাউনের ঊর্ধ্বগামী ব্যাকঅফ, §2, API-কী প্রোভাইডারদের জন্য বেস `3s`; অথবা মডেল লকআউট, §3, agentrouter-এর মতো প্রতি-মডেল-কোটা প্রোভাইডারদের জন্য)। রাউটার ক্লায়েন্টের কাছে যে 60s উইন্ডো বিজ্ঞাপন করে তার চেয়ে অভ্যন্তরীণভাবে আগে পুনঃপ্রচেষ্টার যোগ্য হতে পারে — ইচ্ছাকৃত হেডরুম, বাগ নয়।

স্থায়ী এরর (agentrouter-এর `无权访问模型` — এই মডেলে অ্যাক্সেস নেই) কখনই পুনঃবিবৃত হয় না: `textMarkers` হিট করলেও `excludeMarkers` নিয়মটিকে ভেটো দেয়, তাই এররটি তার মূল স্ট্যাটাস ধরে রাখে এবং কিছুই এটিকে চিরকাল পুনঃপ্রচেষ্টা করে না। ম্যাচিং প্রোভাইডার শ্রেণীবিভাগ নিয়মটি (`open-sse/config/providerErrorRules.ts`-এ `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, একটি `6h` ঘোষিত বেস কুলডাউন) `checkFallbackError` (`open-sse/services/accountFallback.ts`) দ্বারা জেনেরিক apikey-ক্যাটাগরি `FORBIDDEN` আর্লি-রিটার্নের _আগে_ পরামর্শ করা হয়, `honorsRuleLockScope(provider)`-এ গেট করা (#10334 — বর্তমানে `providerErrorRules.ts`-এ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালোলিস্টের মাধ্যমে শুধুমাত্র agentrouter-এর জন্য)। নিয়মের ঘোষিত 6h কুলডাউন `fallbackResult.baseCooldownMs` হিসেবে প্রবাহিত হয়, কিন্তু এটি এখনও পূর্ব-বিদ্যমান প্রতি-মডেল-কোটা লকআউট পথকেই ফিড করে (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, কুলডাউনের উৎস ছাড়া #10334 দ্বারা অপরিবর্তিত): এটি অপারেটরের `mlSettings.maxCooldownMs`-এ ক্ল্যাম্প করা হয় (ডিফল্ট `1_800_000ms` / 30min), অন্য প্রতিটি মডেল লকআউটের মতোই, এবং _পার্সিস্ট করা লকআউট কারণ_ পূর্ব-বিদ্যমান হার্ডকোডেড `"forbidden"`-ই থেকে যায়, নিয়মের `"auth_error"` নয় — কেবল কুলডাউন সময়কালই এন্ড-টু-এন্ড সম্মানিত হয়, কারণ স্ট্রিংটি নয়। সংযোগটি নিজে সক্রিয় থাকে; একই সংযোগের সহযোগী মডেলগুলি প্রভাবিত হয় না।

পুনঃবিবৃত কোটা এরর (`额度不足`) প্রোডাকশনে একটি প্রোভাইডার নিয়মে পৌঁছায় (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, নিজস্ব কোনো ঘোষিত কুলডাউন নেই — পার্সিস্টেন্স লেয়ারের স্কেলড ব্যাকঅফ ডিফল্ট প্রযোজ্য হয়)। #10334 থেকে, `ProviderErrorRuleMatch`-এ `scope` এন্ড-টু-এন্ড কনজিউম হয়, কিন্তু **শুধুমাত্র** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালোলিস্টের প্রোভাইডারদের জন্য (`providerErrorRules.ts` — আজ শুধুমাত্র `"agentrouter"`, `honorsRuleLockScope()`-এর মাধ্যমে গেট করা)। অন্য প্রতিটি প্রোভাইডারের জন্য `scope` কেবল তথ্যগত থেকে যায়, ঠিক #10334-এর আগের মতো। `checkFallbackError` ম্যাচ করা নিয়মের scope-কে `fallbackResult.ruleScope` হিসেবে প্রকাশ করে; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) হল শেয়ার্ড গার্ড যা নিশ্চিত করে যে একটি `ruleScope` সত্যিই একটি সংযোগ-ব্যাপী, স্ব-পুনরুদ্ধারকারী সংকেত হিসেবে সম্মান করা নিরাপদ (scope `"connection"`, কারণ `quota_exhausted`, কখনই `permanent` নয়, কখনই `creditsExhausted` নয় — ভবিষ্যতের কোনো নিয়মের বিরুদ্ধে প্রতিরক্ষা যা scope `"connection"`-কে একটি স্থায়ী অ্যাকাউন্ট অবস্থার সাথে যুক্ত করতে পারে)। দুটি কনজিউমার এটিকে কল করে:

- **পার্সিস্টেন্স** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  পাসথ্রু-প্রোভাইডার **প্রতি-মডেল** লকআউট ব্রাঞ্চে পড়ার বদলে
  (agentrouter হলো `passthroughModels: true` → `hasPerModelQuota()`
  `true` রিটার্ন করে), এটি একটি **অস্থায়ী কানেকশন কুলডাউন** প্রয়োগ করে —
  `testStatus: "unavailable"` + `rateLimitedUntil`, কখনোই কোনো টার্মিনাল স্ট্যাটাস
  (`credits_exhausted`/`banned`/`expired`) নয় — ফলে কুলডাউন শেষ হয়ে গেলে
  কানেকশনটি নিজে থেকেই পুনরুদ্ধার হয়, ম্যানুয়াল ক্রেডেনশিয়াল রিসেটের প্রয়োজন হয় না।
  `disableCooling: true` সহ কানেকশনগুলোর ক্ষেত্রে এটি বাদ দেওয়া হয় (#2997): সেই
  অপ্ট-আউট পরিবর্তে প্রতি-মডেল লকআউটেই চলে যায় (একটি ডকুমেন্টেড ট্রেড-অফ —
  ব্রাঞ্চের উপরের কোড কমেন্টটি দেখুন)।
- **একই-রিকোয়েস্ট কম্বো রাউটিং** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): একই গার্ড কানেকশনটিকে
  ইন-মেমরি `exhaustedConnections` সেটে চিহ্নিত করে, যার কী
  `${provider}:${connectionId}`। এটি কেবল সেই অবশিষ্ট একই-রিকোয়েস্ট টার্গেটটিকেই বাদ
  দেয় যা _নিজেই ইতিমধ্যে সেই নির্দিষ্ট `connectionId` বহন করে_ তার নিজস্ব টার্গেট
  অবজেক্টে (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` লুকআপের আগে
  `if (provider &&
connectionId)`) — একটি সাধারণ মডেল-তালিকা কম্বো, যেখানে সহযোগী টার্গেটগুলো
  নিজেদের কোনো পিন করা `connectionId` বহন করে না এবং একটি কানেকশন কেবল প্রতি-ডিসপ্যাচে
  রেসপন্সের `X-OmniRoute-Selected-Connection-Id` হেডার থেকে রিজলভ হয়, সেই কী ম্যাচে
  কখনোই পৌঁছায় না। এই সাধারণ ক্ষেত্রে, সদ্য-নিষ্কাশিত অ্যাকাউন্টটি কোনো অবশিষ্ট লেগ
  পুনরায় ব্যবহার করার বিরুদ্ধে প্রকৃত সুরক্ষা এই সেট নয় — এটি উপরের পার্সিস্টেন্স
  লেয়ার (কানেকশনের `rateLimitedUntil` এখন ভবিষ্যতে রয়েছে) এবং এই ব্যর্থতার জন্য
  `transientRateLimitedProviders` দমন করা এই একই গার্ডের সমন্বয়
  ("দুই-পর্যায়ের ডিজাইন" এবং `targetExhaustion.ts`-এ
  `isAgentrouterConnectionQuotaScope` ব্রাঞ্চের কোড কমেন্ট দেখুন): সেই সেট চিহ্নিতহীন
  রেখে, `combo.ts`-এর `allowRateLimitedConnection` ফোর্স-অ্যালো
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) প্রোভাইডারের অবশিষ্ট লেগগুলোর
  জন্য কার্যকর হয় না, ফলে ক্রেডেনশিয়াল নির্বাচনের `rateLimitedUntil` ফিল্টার
  (`src/sse/services/auth.ts:1238`) স্বাভাবিকভাবে মেনে চলা হয় এবং একটি অবশিষ্ট লেগ
  হয় ভিন্ন, এখনও-যোগ্য agentrouter কানেকশন বেছে নেয় অথবা কোনো ক্রেডেনশিয়াল
  উপলব্ধ না থাকায় ব্যর্থ হয় — এটি এই ব্রাঞ্চ সদ্য কুলডাউন করা কানেকশনে জোর করে
  ফিরে যায় না।

### দুই-পর্যায়ের ডিজাইন: স্ট্যাটাস পুনঃবিবৃতি, তারপর শ্রেণীবিভাগ

স্ট্যাটাস পুনঃবিবৃতি (`upstreamStatusRestatement.ts`) এবং প্রোভাইডার
শ্রেণীবিভাগ নিয়ম (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) হলো পৃথক রেজিস্ট্রি যা উভয়ই প্রোভাইডার id
এবং টেক্সট মার্কারের ভিত্তিতে কী করা হয়, কিন্তু সেগুলো ভিন্ন জায়গায় চলে এবং ভিন্ন
উদ্দেশ্যে কাজ করে: পুনঃবিবৃতি `chatCore.ts`-এ গোড়ার দিকে HTTP স্ট্যাটাস পুনর্লিখন করে;
শ্রেণীবিভাগ নিয়মগুলো ফলব্যাক `reason` বেছে নেয় এবং `checkFallbackError()`-এর
(`open-sse/services/accountFallback.ts`) ভিতরে `scope` লক করে
(`model` / `provider` / `connection`)।

শ্রেণীবিভাগ নিয়মগুলো কেবল `providerErrorRules.ts`-এর `FULL_TEXT_RULE_PROVIDERS`
অ্যালোলিস্টে তালিকাভুক্ত প্রোভাইডারদের জন্যই সম্পূর্ণ এরর **টেক্সট** দেখতে পায়
(`额度不足`-এর মতো বডি মার্কার ম্যাচ করার জন্য যা প্রয়োজন) — বর্তমানে শুধুমাত্র
`"agentrouter"`। অন্য প্রতিটি **বিল্ট-ইন ক্যাটালগ** প্রোভাইডারের জন্য,
`checkFallbackError` `getProviderErrorRuleMatch`-কে শুধুমাত্র স্ট্রাকচার্ড এরর
(`{code, type}`) দেয়, যা হেডার/স্ট্যাটাস/কোড-ভিত্তিক নিয়মের জন্য যথেষ্ট কিন্তু
বডি-টেক্সট মার্কারের প্রতি অন্ধ। হেল্পার `resolveRuleMatchBody()` এই নির্বাচনটি সম্পাদন
করে: অ্যালোলিস্টভুক্ত প্রোভাইডারদের জন্য সম্পূর্ণ এরর টেক্সট, অন্যথায় স্ট্রাকচার্ড এরর।
`FULL_TEXT_RULE_PROVIDERS`-এ একটি **বিল্ট-ইন** প্রোভাইডার যোগ করা একটি সুস্পষ্ট
প্রতি-প্রোভাইডার অপ্ট-ইন — এটি বিদ্যমান যাতে তালিকায় নেই এমন প্রতিটি প্রোভাইডারের
জন্য ডিফল্ট পথ বাইট-ফর-বাইট অপরিবর্তিত থাকে।

একটি নিয়মের `scope` (`model` / `provider` / `connection`) হলো
`FULL_TEXT_RULE_PROVIDERS` থেকে পৃথক একটি অপ্ট-ইন: `checkFallbackError` এটি কেবল
`fallbackResult.ruleScope` হিসেবে উপস্থাপন করে, এবং ডাউনস্ট্রিম কনজিউমাররা একই ফাইলের
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালোলিস্টে থাকা প্রোভাইডারদের জন্যই এটিকে
তথ্যগত লেবেল ছাড়া অন্য কিছু হিসেবে মেনে চলে (`honorsRuleLockScope()` এর মাধ্যমে
গেটেড — আজকে শুধুমাত্র `"agentrouter"`)। কোনো প্রোভাইডার সেই অ্যালোলিস্টে গেলে একটি
`scope: "connection"` ম্যাচ আসলে কী করে তা জানতে উপরের "পুনঃবিবৃত কোটা এরর" দেখুন।

**#11104 — অপারেটর-ঘোষিত নিয়ম উভয় অ্যালোলিস্টকে বাইপাস করে।** একজন অপারেটর এই ফাইল
সম্পাদনা না করেই রানটাইমে `settings.providerErrorRules` এর মাধ্যমে
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) একটি
প্রতি-প্রোভাইডার নিয়ম ঘোষণা করতে পারেন। একটি অপারেটর নিয়মকে
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এর পেছনে গেট করা — যেসব
অ্যালোলিস্ট বিল্ট-ইন ক্যাটালগ নিয়মের **ডিফল্ট** আচরণ রক্ষার জন্য তৈরি — সেটিংস
মেকানিজমটিকে ইতিমধ্যে সেখানে তালিকাভুক্ত প্রোভাইডারগুলো ছাড়া প্রতিটি প্রোভাইডারের জন্য
নিষ্ক্রিয় করে দেবে, যেহেতু নিয়ম ঘোষণা করাই ইতিমধ্যে অপারেটরের সুস্পষ্ট অপ্ট-ইন।
`resolveRuleMatchBody()` এবং `honorsRuleLockScope()` উভয়ই প্রথমে
`hasOperatorRuleForProvider()` পরীক্ষা করে: অপারেটর নিয়মসহ একটি প্রোভাইডার কাঁচা এরর
টেক্সট পায় এবং তার ঘোষিত `scope` মেনে চলা হয়, সেটি কোনো অ্যালোলিস্টে আছে কি না তা
নির্বিশেষে।

**পরিচিত ঘাটতি — HTTP 400-এর জন্য `providerRuleRegistry` কখনোই ব্যবহার করা হয় না।**
`checkFallbackError`-এর `BAD_REQUEST` ব্রাঞ্চ স্ট্যাটাস 400-কে সম্পূর্ণভাবে তার নিজস্ব
প্যাটার্ন অ্যারের (`accountFallback.ts`-এ `MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` ইত্যাদি) মাধ্যমে শ্রেণীবদ্ধ করে এবং তার উপরের
`configuredRule`/`getProviderErrorRuleMatch` ব্রাঞ্চে পৌঁছানোর আগেই রিটার্ন করে।
`status: 400` সহ একটি বিল্ট-ইন ক্যাটালগ নিয়ম (বা একটি অপারেটর নিয়ম) সিনট্যাক্সগতভাবে
বৈধ কিন্তু কখনোই কার্যকর হবে না। আজ কোনো বিদ্যমান নিয়ম 400-কে টার্গেট করে না, তাই
প্রোডাকশনে কিছুই প্রভাবিত হয় না — কিন্তু ভবিষ্যতের একটি 400 নিয়মের জন্য আগে এই
ব্রাঞ্চটি স্পর্শ করতে হবে, যা একটি নিয়ম যোগ করার চেয়ে বড় পরিবর্তন (এটি
প্যাটার্ন-অ্যারে আচরণের উপর ইতিমধ্যে নির্ভরশীল প্রতিটি প্রোভাইডারের জন্য 400-কে
পুনঃশ্রেণীবদ্ধ করে) এবং একটি একক-প্রোভাইডার নিয়ম সংযোজনের স্কোপের বাইরে।

### এমন নতুন গেটওয়ে যোগ করা যা কোটা ভুলভাবে জানায়

1. `statusRestatementRegistry`-এ একটি নিয়ম-অ্যারে নিবন্ধন করুন
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers`
   প্রোভাইডার-নির্দিষ্ট রাখুন; এমন জেনেরিক ইংরেজি বাক্যাংশ কখনোই পুনর্ব্যবহার করবেন না
   যা `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`)-এর
   সাথে সাংঘর্ষণিক।
2. ঐচ্ছিকভাবে `open-sse/config/providerErrorRules.ts`-এ
   (`providerRuleRegistry`) শ্রেণীবিভাগ নিয়ম নিবন্ধন করুন, যাতে সঠিক লক স্কোপ
   বাছাই করা যায় (অ্যাকাউন্ট-ব্যাপী কোটার জন্য `connection`, প্রতি-মডেল
   ত্রুটির জন্য `model`)। এই ধাপটি প্রোডাকশনে শুধুমাত্র সেই প্রোভাইডারদের
   জন্য কার্যকর হয় যাদের নিয়মের সম্পূর্ণ ত্রুটি টেক্সট (বডি মার্কার)
   প্রয়োজন: একই ফাইলে `FULL_TEXT_RULE_PROVIDERS`-এ প্রোভাইডার আইডি যোগ
   করুন — অন্যথায় `checkFallbackError` নিয়মটিকে কেবল স্ট্রাকচার্ড
   `{code, type}` ত্রুটিই হস্তান্তর করে এবং বডি-টেক্সট নিয়ম লাইভ
   ট্রাফিকে কখনোই মিলবে না। যেসব নিয়ম সম্পূর্ণভাবে `status`/`headers` দিয়ে
   মিলে (যেমন Opencode বা Minimax-এর), সেগুলোর এই অপ্ট-ইন-এর প্রয়োজন
   নেই। আলাদাভাবে, যদি নিয়মটি `scope: "connection"` ঘোষণা করে এবং
   উদ্দেশ্য যদি প্রকৃত কানেকশন-ব্যাপী কুলডাউন সহ একই-অনুরোধে কম্বো স্কিপ
   হয় (কেবল একটি তথ্যমূলক লেবেল নয়), তাহলে একই ফাইলে
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ প্রোভাইডার আইডি যোগ করুন —
   এটিই `markAccountUnavailable()` (`src/sse/services/auth.ts`) এবং
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`)-এ
   `isAgentrouterConnectionQuotaScope()`-ধাঁচের ব্যবহারকে নিয়ন্ত্রণ করে;
   এটি ছাড়া, `scope` এখনও `fallbackResult.ruleScope` দিয়ে প্রবাহিত হয়,
   কিন্তু কিছুই তার ভিত্তিতে কাজ করে না।
3. `tests/unit/upstream-status-restatement.test.ts` ও
   `tests/unit/agentrouter-error-rules.test.ts`-এর অনুকরণে ইউনিট টেস্ট যোগ
   করুন (not-permanent / not-creditsExhausted গার্ডসহ, এবং — যদি
   প্রোভাইডারের অ্যালোলিস্ট প্রয়োজন হয় — একটি টেস্ট যা নিশ্চিত করে যে
   `resolveRuleMatchBody()` শুধুমাত্র সেই প্রোভাইডারের জন্যই সম্পূর্ণ টেক্সট
   ফেরত দেয়)।

`chatCore.ts`, `classifyError` বা কম্বোতে কোনো পরিবর্তনের প্রয়োজন নেই।

#### ইগ্রেস-বাকেটেড লক (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-এর প্রোভাইডারগুলো (opencode পরিবার)
IP-বাকেটেড আপস্ট্রিম হিসেবে গণ্য হয় (opencode ফ্রি টিয়ার IP-বাকেটেড,
অ্যাকাউন্ট-বাকেটেড নয় — দেখুন #9611): একটি status-429 যখন
`quota_exhausted` **অথবা** `rate_limit_exceeded` হিসেবে শ্রেণীবদ্ধ হয়,
তখন রোটেশন সেগুলো চেষ্টা করার আগেই প্রতিটি অ্যালোলিস্টেড-পরিবারভুক্ত
কানেকশন — যাদের সর্বশেষ পরিচিত ইগ্রেস IP ব্যর্থ কানেকশনটির সাথে মেলে —
কুল ডাউন করা হয় — যাতে N-1টি নিশ্চিত-ব্যর্থ আপস্ট্রিম কল এড়ানো যায়
(#10460/#10525-এর মতোই কাঠামো)। `rate_limit_exceeded` ইচ্ছাকৃতভাবে
অন্তর্ভুক্ত করা হয়েছে: `markAccountUnavailable` পথে opencode-নির্দিষ্ট
নিয়মগুলো কখনোই মেলে না (`checkFallbackError`-কে কোনো headers/body
দেওয়া হয় না, এবং opencode `FULL_TEXT_RULE_PROVIDERS`-এ নেই), তাই
কোনো 429-এর বডিতে সাবস্ক্রিপশন-কোটা টেক্সট ("monthly usage limit
reached") থাকলে, `status_429` নিয়মে পৌঁছানোরই আগে তা কোটা-টেক্সট
ফলব্যাক (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; ১ ঘণ্টার
কুলডাউন) দ্বারা `quota_exhausted` হিসেবে শ্রেণীবদ্ধ হয় — অন্যদিকে
কোটা-টেক্সটবিহীন 429 (সাধারণ রেট লিমিটিং) `status_429` নিয়মের মাধ্যমে
`rate_limit_exceeded` হিসেবে শ্রেণীবদ্ধ হয় এবং তবুও IP পরিবারটিকে কুল
ডাউন করে। অ্যালোলিস্টেড প্রোভাইডারের ক্ষেত্রে IP-বাকেটেড রেট লিমিট হলো
কোটা-শেষ সংকেতেরই সমতুল্য। সৎ সীমাবদ্ধতা:

- **সর্বোত্তম-প্রচেষ্টা (Best-effort)**: লকটি `proxy_logs` থেকে সংযোগের সর্বশেষ পরিচিত `egress_ip` নির্ণয় করে (২৪ ঘণ্টার উইন্ডো, সিঙ্ক্রোনাস, কোনো ক্যাশ নেই)। কোল্ড ক্যাশ (egress IP কখনো প্রোব করা হয়নি) বা কোনো সারি না থাকলে → ব্যর্থ সংযোগটি তবুও ব্রাঞ্চ দ্বারা কুল করা হয় (আজকের মতোই রেকর্ড করা হয়), শুধু কোনো সিবলিং লক হয় না।
- **কখনোই চূড়ান্ত নয়**: কুলডাউনটি একটি নবায়নযোগ্য কোটা উইন্ডো (`testStatus: "unavailable"`); IP-স্তরের সংকেত থেকে কখনোই স্থায়ী অবস্থা গৃহীত হয় না। `disableCooling` সংযোগগুলি ব্রাঞ্চটি পুরোপুরি এড়িয়ে যায়।
- **অ্যালোলিস্টেড পরিবারের জন্য লক গ্রানুলারিটি পরিবর্তিত হয়**: এটি একটি স্কোপ পরিবর্তন, কেবল সিবলিং অপ্টিমাইজেশন নয়। opencode একটি `passthroughModels` প্রোভাইডার, তাই এই ব্রাঞ্চের আগে একটি 429 প্রতি-মডেল লকআউট তৈরি করত; এখন এটি একটি সংযোগ কুলডাউন তৈরি করে — এমনকি এমন অপারেটরের জন্যও যে একক সংযোগ চালায় এবং যার কোনো সিবলিংই নেই। এটিই সেই গ্রানুলারিটি যা opencode রুল টেবিল ইতিমধ্যে সঠিক বলে ঘোষণা করে (`scope: "connection"`, `providerErrorRules.ts`), এ পর্যন্ত কখনো প্রতিপালিত হয়নি কারণ opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ নেই। ব্রাঞ্চটি ব্যর্থ সংযোগের কুলডাউন + `backoffLevel` নিজেই লেখে, সংযোগ-স্কোপড agentrouter ব্রাঞ্চের অনুকরণে, এবং রিটার্ন করে — প্রতি-মডেল ব্লক এবং নিচের জেনেরিক পাথ কখনোই পৌঁছায় না।
- **কম্বো অন্তর্ভুক্ত**: agentrouter ব্রাঞ্চের মতো, স্কোপটি ইচ্ছাকৃতভাবে সেই `persistUnavailableState`/`isCombo` ডাউনগ্রেড উপেক্ষা করে যা একটি কম্বো কলার 429-এ প্রয়োগ করে। প্রতি-মডেল লকআউট এই স্কোপের দুর্বল রূপ নয়, এটি ভুল একক: এটি ক্লান্ত IP সম্পর্কে কিছুই বলে না, তাই কম্বো রোটেশন প্রতি সিবলিংয়ে একটি করে নিশ্চিত-ব্যর্থ কল পোড়াতেই থাকবে।
- **সিবলিং নিরাপত্তা**: ইতিমধ্যে চূড়ান্ত অবস্থায় থাকা (banned/credits_exhausted) বা ইতিমধ্যে দীর্ঘতর কুলডাউনে থাকা কোনো সিবলিং কখনোই ওভাররাইট হয় না।
- **এক্সক্লুসিভ অ্যালোলিস্ট**: `EGRESS_BUCKETED_LOCK_PROVIDERS` প্রসারিত করা একটি স্পষ্ট মালিকের সিদ্ধান্ত; কোনো জেনেরিক ওয়্যারিং নেই (pattern #10334/#10419)। সিবলিং কোয়েরি SQL লিটারেল হিসেবে পুনরাবৃত্তি না করে সেই একই অ্যালোলিস্ট বাইন্ড করে, তাই এটি প্রসারিত করা এক-লাইনের পরিবর্তনই থেকে যায়।
- **Egress IP রোটেশন, উভয় দিকেই**: লুকআপ উইন্ডো (২৪ ঘণ্টা) egress-IP ক্যাশ TTL (৫ মিনিট) এর চেয়ে অনেক প্রশস্ত, তাই "সর্বশেষ পরিচিত IP" হলো ইতিহাস, বর্তমান অবস্থা নয়। যদি কোনো সংযোগের প্রক্সি উইন্ডোর মধ্যে রোটেট হয়ে থাকে, তাহলে লকটি সত্যিকারে শেয়ার করা একটি IP **মিস** করতে পারে (রেকর্ড করা IP হলো নতুন, অক্লান্তটি) — এবং প্রতিসাম্যভাবে এটি এমন একটি সিবলিংকে **কুল করতে পারে যে ইতিমধ্যে ক্লান্ত IP থেকে সরে গেছে**। দ্বিতীয় ক্ষেত্রে সেই সিবলিংয়ের একটি কুলডাউন উইন্ডো খরচ হয়; উভয়ই ইতিহাস-ভিত্তিক লুকআপের গৃহীত সর্বোত্তম-প্রচেষ্টা সীমাবদ্ধতা।
- **খরচ**: `proxy_logs`-এর দুটি সীমাবদ্ধ স্ক্যান (`idx_pl_timestamp` দিয়ে উইন্ডো-ফিল্টারকৃত), শুধুমাত্র 429 ফ্রিকোয়েন্সিতে। কোনো নতুন ইনডেক্স নেই (মাইগ্রেশন 134 YAGNI)। মাঝারি আকারের প্রকৃত-ট্রাফিক DB কপিতে পরিমাপ করা হয়েছে; উচ্চ-থ্রুপুট ইনস্ট্যান্স একই উইন্ডোতে আনুপাতিকভাবে আরও বেশি সারি ধারণ করে।

---

## অন্যান্য রেজিলিয়েন্স ফিচার

- **২১টি রাউটিং স্ট্র্যাটেজি** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — দেখুন [AUTO-COMBO.md](../routing/AUTO-COMBO.md)।
- **রিসেট-সচেতন রাউটিং** (v3.8.0) — কোটা রিসেট সময় অনুযায়ী কানেকশনগুলোকে অগ্রাধিকার দেয়।
- **ব্যাকগ্রাউন্ড মোড ডিগ্রেডেশন** — Responses API-এর `background: true` সতর্কতাসহ সিঙ্ক-এ ডিগ্রেড হয়।
- **ডাইনামিক টুল লিমিট ডিটেকশন** — টুল সংখ্যা সীমায় পৌঁছালে প্রোভাইডারদের ব্যাক অফ করে।
- **ইমার্জেন্সি ফলব্যাক** — `OMNIROUTE_EMERGENCY_FALLBACK` দ্বারা নিয়ন্ত্রিত; অপারেটররা রিস্টার্ট ছাড়াই Feature Flags পেজ থেকে এটি ওভাররাইড করতে পারেন।

---

## ডিবাগিং

- Weighted combo `503 all_targets_cooling_down` উত্তর দেয় (`Retry-After` সেট করা থাকে, `diagnostics.excluded`-এ প্রতিটি টার্গেট `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` সহ তালিকাভুক্ত থাকে) → পুলটি কনফিগার ও কানেক্টেড আছে, প্রতিটি টার্গেট কেবল একটি রেজিলিয়েন্স টাইমার দ্বারা বাদ পড়েছে; `[COMBO] Weighted selection: every target excluded before dispatch — …` ওয়ার্নিংটি কারণ ও অবশিষ্ট সেকেন্ড উল্লেখ করে। একই কম্বো থেকে `404 no_executable_targets` মানে কোনো রেজিলিয়েন্স টাইমার জড়িত ছিল না (চালানোর মতো কিছু নেই, অথবা প্রতিটি অ্যাকাউন্ট অ্যাভেইলেবিলিটি প্রোবে ব্যর্থ হয়েছে)। `targetResolution.ts`-এ সংগৃহীত এক্সক্লুশন থেকে `open-sse/services/combo/pinRecovery.ts`-এ তৈরি।
- একটি প্রোভাইডারের সবগুলো কী স্কিপ হয়ে গেছে → সার্কিট ব্রেকার স্টেট এবং প্রতিটি কানেকশনের `rateLimitedUntil`/`testStatus` উভয়ই চেক করুন।
- রিসেট উইন্ডোর পরে প্রোভাইডার স্থায়ীভাবে বাদ পড়ে গেছে → কোড `getStatus()`/`canExecute()`-এর বদলে কাঁচা `state` পড়ছে।
- একটি কী ব্যর্থ হলে অন্যগুলো কাজ করা উচিত → সার্কিট ব্রেকারের বদলে কানেকশন কুলডাউনকে অগ্রাধিকার দিন।
- শুধু একটি মডেল ব্যর্থ হয় → কানেকশন কুলডাউনের বদলে মডেল লকআউটকে অগ্রাধিকার দিন।
- স্টেটের স্বয়ংক্রিয়ভাবে রিকভার হওয়ার কথা কিন্তু হচ্ছে না → ভবিষ্যতের টাইমস্ট্যাম্প + মেয়াদোত্তীর্ণ স্টেট রিফ্রেশ করে এমন রিড পাথ আছে কিনা চেক করুন। স্থায়ী স্ট্যাটাসের জন্য ম্যানুয়াল পরিবর্তন প্রয়োজন।

---

## রানটাইম স্টেট — এজেন্ট দ্রুত রেফারেন্স

> `AGENTS.md` → "Resilience Runtime State" থেকে হুবহু সরানো হয়েছে (PR #12743) যাতে এজেন্ট
> গাইডটি 40k কনটেক্সট বাজেটের মধ্যে থাকে। এটি উপরের বিভাগগুলোর সংক্ষিপ্ত, এজেন্ট-মুখী সংস্করণ;
> সংখ্যাযুক্ত বিভাগগুলোই সম্পূর্ণ রেফারেন্স।

OmniRoute-এ তিনটি সম্পর্কিত কিন্তু স্বতন্ত্র অস্থায়ী-ব্যর্থতা মেকানিজম রয়েছে। রাউটিং আচরণ ডিবাগ করার সময়
এদের স্কোপ আলাদা রাখুন। এক নজরে দেখার জন্য
[3-স্তরের রেজিলিয়েন্স ডায়াগ্রাম](../diagrams/exported/resilience-3layers.svg)
(সোর্স: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
দেখুন।

### প্রোভাইডার সার্কিট ব্রেকার

**স্কোপ**: সম্পূর্ণ প্রোভাইডার, যেমন `glm`, `openai`, `anthropic`।

**উদ্দেশ্য**: আপস্ট্রিম/সার্ভিস স্তরে বারবার ব্যর্থ হচ্ছে এমন প্রোভাইডারের দিকে ট্রাফিক পাঠানো বন্ধ করা,
যাতে একটি অসুস্থ প্রোভাইডার প্রতিটি রিকোয়েস্টকে ধীর করে না দেয়।

**ইমপ্লিমেন্টেশন**:

- মূল ক্লাস: `src/shared/utils/circuitBreaker.ts`
- চ্যাট গেট/এক্সিকিউশন ওয়্যারিং: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- রানটাইম স্ট্যাটাস API: `src/app/api/monitoring/health/route.ts`
- শেয়ার্ড র্যাপার: `open-sse/services/accountFallback.ts`
- পার্সিস্টেড স্টেট টেবিল: `domain_circuit_breakers`

**স্টেট** (৪টি — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: স্বাভাবিক ট্রাফিক অনুমোদিত।
- `DEGRADED`: আর্লি-ওয়ার্নিং ব্যান্ড — ব্যর্থতা ডিগ্রেডেশন থ্রেশহোল্ড অতিক্রম করেছে কিন্তু এখনো
  ব্রেকার থ্রেশহোল্ডে পৌঁছায়নি; ট্রাফিক চলতে থাকে, ড্যাশবোর্ডে সতর্কতা দেখায়। একটি সফল কানেকশন
  টেস্ট বা নতুন ব্যর্থতা ছাড়া একটি শান্ত উইন্ডো এটিকে `CLOSED`-এ ফিরিয়ে আনে
  (উইন্ডোটি `docs/architecture/RESILIENCE_GUIDE.md`-এ আছে)।
- `OPEN`: প্রোভাইডার সাময়িকভাবে ব্লক করা; কলাররা প্রোভাইডার-সার্কিট-ওপেন রেসপন্স পায়
  অথবা কম্বো রাউটিং অন্য টার্গেটে চলে যায়।
- `HALF_OPEN`: রিসেট টাইমআউট শেষ হয়েছে; একটি প্রোব রিকোয়েস্ট অনুমোদন করুন। সফল হলে
  ব্রেকার বন্ধ হয়, ব্যর্থ হলে আবার খুলে যায়।

**ডিফল্ট** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`-এর
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` এর মাধ্যমে কনজিউম হয় →
`src/sse/handlers/chatHelpers.ts`-এ `getCircuitBreaker(provider, …)`)। সম্পূর্ণ-প্রোভাইডার
ব্রেকারটি `circuitBreakerThreshold` / `circuitBreakerReset`-এ চলে:

| প্রোফাইল | ডিগ্রেড হয় | ওপেন হয় (`circuitBreakerThreshold`) | রিসেট (`circuitBreakerReset`) |
| -------- | ----------: | -----------------------------------: | ----------------------------: |
| OAuth    |         `5` |                                  `8` |                         `60s` |
| API key  |         `7` |                                 `12` |                         `30s` |
| Local    |   (নির্ণীত) |                                  `2` |                         `15s` |

`PROVIDER_PROFILES` এছাড়াও `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 মিনিট) এবং `providerCooldownMs` (5/10/1 মিনিট) সংজ্ঞায়িত করে: এগুলো
**অপ্ট-ইন গ্লোবাল Provider Cooldown-এর উইন্ডো গেট** চালায় (`PROVIDER_COOLDOWN_ENABLED`, ডিফল্ট
অফ) — `open-sse/services/providerCooldownTracker.ts`-এ প্রোভাইডার-লেভেল এন্ট্রি কেবল তখনই
কুলিং হিসেবে গণ্য হয় যখন `providerFailureWindowMs`-এর মধ্যে `providerFailureThreshold` সংখ্যক ব্যর্থতা ঘটে, এবং তারপর
`providerCooldownMs` সময়ের জন্য কুল করে। এগুলো লাইভ ব্রেকারের থ্রেশহোল্ড নয় — ব্রেকার আচরণ
আশা করে এগুলো টিউন করবেন না। প্রতিটি ডিফল্ট
`OMNIROUTE_PROVIDER_BREAKER_*` এবং `OMNIROUTE_CIRCUIT_BREAKER_*` এনভ ভ্যার দিয়ে ওভাররাইড করা যায়;
রানটাইম-নির্ভুল রেফারেন্স টেবিলটি `docs/architecture/RESILIENCE_GUIDE.md`-এ রয়েছে।

শুধুমাত্র প্রোভাইডার-লেভেল ব্যর্থতা স্ট্যাটাসই প্রোভাইডার ব্রেকার ট্রিপ করবে:

```ts
(408, 500, 502, 503, 504);
```

অধিকাংশ `401`, `403` বা `429` ক্ষেত্রের মতো সাধারণ অ্যাকাউন্ট/কী/মডেল এররের জন্য সম্পূর্ণ-প্রোভাইডার
ব্রেকার ট্রিপ করবেন না। সেগুলো সাধারণত কানেকশন কুলডাউন বা মডেল
লকআউটের অন্তর্ভুক্ত। একটি জেনেরিক API-key প্রোভাইডারের `403` রিকভারেবল হওয়া উচিত, যদি না সেটি
টার্মিনাল প্রোভাইডার/অ্যাকাউন্ট এরর হিসেবে শ্রেণীবদ্ধ হয়।

ব্রেকারটি লেজি রিকভারি ব্যবহার করে, ব্যাকগ্রাউন্ড টাইমার নয়। যখন `OPEN`-এর মেয়াদ শেষ হয়, `getStatus()`, `canExecute()`, এবং `getRetryAfterMs()`-এর মতো রিড অপারেশনগুলো স্টেটটি `HALF_OPEN`-এ রিফ্রেশ করে, যাতে ড্যাশবোর্ড এবং কম্বো ক্যান্ডিডেট বিল্ডাররা মেয়াদোত্তীর্ণ প্রোভাইডারকে চিরকাল বাদ দিতে থাকে না।

### কানেকশন কুলডাউন

**সুযোগ**: একটি প্রোভাইডার কানেকশন/অ্যাকাউন্ট/কী।

**উদ্দেশ্য**: একই প্রোভাইডারের অন্যান্য কানেকশনগুলোকে রিকোয়েস্ট সার্ভ করা চালিয়ে যাওয়ার সুযোগ দেওয়ার পাশাপাশি একটি ত্রুটিপূর্ণ কী/অ্যাকাউন্টকে সাময়িকভাবে এড়িয়ে যাওয়া।

**বাস্তবায়ন**:

- রাইট/আপডেট পথ: `src/sse/services/auth.ts::markAccountUnavailable()`
- অ্যাকাউন্ট নির্বাচন/ফিল্টারিং: `src/sse/services/auth.ts::getProviderCredentials...`
- কুলডাউন হিসাব: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

প্রোভাইডার কানেকশনগুলোর গুরুত্বপূর্ণ ফিল্ড:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

অ্যাকাউন্ট নির্বাচনের সময়, একটি কানেকশনকে এড়িয়ে যাওয়া হয় যখন:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

কুলডাউনগুলোও লেজি: যখন `rateLimitedUntil` অতীতে চলে যায়, কানেকশনটি আবার যোগ্য হয়ে ওঠে। সফল ব্যবহারের পর, `clearAccountError()` `testStatus`, `rateLimitedUntil`, এরর ফিল্ডগুলো এবং `backoffLevel` মুছে দেয়।

ডিফল্ট কানেকশন কুলডাউন আচরণ:

- OAuth বেস কুলডাউন: `5s`।
- API-কী বেস কুলডাউন: `3s`।
- API-কী `429`-এর ক্ষেত্রে আপস্ট্রিম রিট্রাই ইঙ্গিতগুলোকে (`Retry-After`, রিসেট হেডার, অথবা পার্সযোগ্য রিসেট টেক্সট) উপলব্ধ থাকলে অগ্রাধিকার দেওয়া উচিত।
- বারবার পুনরুদ্ধারযোগ্য ব্যর্থতাগুলো এক্সপোনেনশিয়াল ব্যাকঅফ ব্যবহার করে:

```ts
baseCooldownMs * 2 ** failureIndex;
```

অ্যান্টি-থান্ডারিং-হার্ড গার্ড একই কানেকশনে সমবর্তী ব্যর্থতাগুলোকে বারবার কুলডাউন বাড়ানো বা `backoffLevel` ডাবল-ইনক্রিমেন্ট করা থেকে বাধা দেয়।

টার্মিনাল স্টেটগুলো কুলডাউন নয়। `banned`, `expired` (যা শুধুমাত্র `EXPIRED_RETRY_MAX`-এর মাধ্যমে N সংখ্যক সীমাবদ্ধ রিট্রাইয়ের পরে টার্মিনাল হয়ে যায়), এবং `credits_exhausted` ক্রেডেনশিয়াল/সেটিংস পরিবর্তন বা কোনো অপারেটর রিসেট না করা পর্যন্ত অনুপলব্ধ থাকার জন্য তৈরি। টার্মিনাল স্টেটগুলোকে ক্ষণস্থায়ী কুলডাউন স্টেট দিয়ে ওভাররাইট করবেন না।

### মডেল লকআউট

**সুযোগ**: প্রোভাইডার + কানেকশন + মডেল।

**উদ্দেশ্য**: যখন শুধুমাত্র একটি মডেল সেই কানেকশনের জন্য অনুপলব্ধ বা কোটা-সীমিত থাকে, তখন পুরো কানেকশনটি নিষ্ক্রিয় করা এড়ানো।

উদাহরণ:

- প্রতি-মডেল কোটা প্রোভাইডারদের `429` রিটার্ন করা।
- লোকাল প্রোভাইডারদের একটি অনুপস্থিত মডেলের জন্য `404` রিটার্ন করা।
- প্রোভাইডার-নির্দিষ্ট মোড/মডেল পারমিশন ব্যর্থতা, যেমন নির্বাচিত Grok মোডগুলো।

মডেল লকআউট `open-sse/services/accountFallback.ts`-এ থাকে এবং একই কানেকশনকে অন্যান্য মডেলগুলো সার্ভ করা চালিয়ে যেতে দেয়।

### ডিবাগিং নির্দেশনা

- যদি একটি প্রোভাইডারের সমস্ত কী এড়িয়ে যাওয়া হয়, তাহলে প্রোভাইডার ব্রেকার স্টেট এবং প্রতিটি কানেকশনের `rateLimitedUntil`/`testStatus` উভয়ই পরীক্ষা করুন।
- যদি রিসেট উইন্ডোর পরে একটি প্রোভাইডার স্থায়ীভাবে বাদ পড়ে যাওয়া মনে হয়, তাহলে দেখুন কোডটি `getStatus()`/`canExecute()` ব্যবহার না করে কাঁচা `state` পড়ছে কিনা।
- যদি একটি প্রোভাইডার কী ব্যর্থ হয় কিন্তু অন্যগুলোর কাজ করার কথা থাকে, তাহলে প্রোভাইডার ব্রেকারের পরিবর্তে কানেকশন কুলডাউনকে অগ্রাধিকার দিন।
- যদি শুধুমাত্র একটি মডেল ব্যর্থ হয়, তাহলে কানেকশন কুলডাউনের পরিবর্তে মডেল লকআউটকে অগ্রাধিকার দিন।
- যদি একটি স্টেটের স্বয়ং-পুনরুদ্ধার হওয়ার কথা থাকে, তাহলে এর একটি ভবিষ্যৎ টাইমস্ট্যাম্প/রিসেট টাইমআউট এবং এমন একটি রিড পথ থাকা উচিত যা মেয়াদোত্তীর্ণ স্টেট রিফ্রেশ করে। স্থায়ী স্ট্যাটাসগুলোর জন্য ম্যানুয়াল ক্রেডেনশিয়াল বা কনফিগ পরিবর্তন প্রয়োজন।

---

## TLS ফিঙ্গারপ্রিন্টিং ও স্টেলথ

প্রোভাইডার-নির্দিষ্ট স্টেলথ (JA3/JA4, CCH, অবফাসকেশন) আলাদাভাবে ডকুমেন্ট করা আছে — দেখুন `docs/security/STEALTH_GUIDE.md` (git; `/docs`-এ কম্পাইল করা হয়নি)।

---

## রেজিলিয়েন্স টেস্টিং (ফেজ 8 · ব্লক C)

রেজিলিয়েন্স লজিকের ইউনিট টেস্টের বাইরে, তিনটি টেস্ট বাস্তব
স্ট্রেস/ব্যর্থতার পরিস্থিতিতে রানটাইমকে পরীক্ষা করে (সবই ইন্টিগ্রেশন/নাইটলি — কোনোটিই PR ব্লক করে না):

| টেস্ট       | কী                                                                                                                                                                                         | চালানো                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Chaos       | ফেক-আপস্ট্রিম নোড প্রকৃত ল্যাটেন্সি/রিসেট/টাইমআউট/503 ইনজেক্ট করে; যাচাই করে যে সার্কিট ব্রেকার খুলছে/রিকভার করছে এবং `checkFallbackError` 503-কে রিকভারেবল ফলব্যাক হিসেবে শ্রেণীবদ্ধ করে। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc`-এর অধীনে প্রতি `createSSEStream`-এ ~500টি স্ট্রিম; হিপ সীমার বাইরে বেড়ে গেলে ফেইল করে (OOM গার্ড #3069)।                                                                    | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health`-এর বিরুদ্ধে টানা লোড; p95/এরর থ্রেশহোল্ড।                                                                                                                         | `k6 run tests/load/k6-soak.js` (নাইটলি) |

`.github/workflows/nightly-resilience.yml` দ্বারা অর্কেস্ট্রেটেড (cron + dispatch)।
ডিফল্ট `test:integration`-এ, chaos ও heap সেলফ-স্কিপ করে (`RUN_CHAOS_INT`/`--expose-gc` ছাড়া)।

---

## আরও দেখুন

- [আর্কিটেকচার গাইড](./ARCHITECTURE.md) — সিস্টেম আর্কিটেকচার ও অভ্যন্তরীণ বিষয়
- [ইউজার গাইড](../guides/USER_GUIDE.md) — প্রোভাইডার, কম্বো, CLI ইন্টিগ্রেশন
- [অটো-কম্বো ইঞ্জিন](../routing/AUTO-COMBO.md) — 16-ফ্যাক্টর স্কোরিং, মোড প্যাক
