# Quota Sharing Engine (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **ডক রেফারেন্স**: `docs/routing/QUOTA_SHARE.md`
> Group B-এর অংশ (পরিকল্পনা 16 + 22)।

---

## সংক্ষিপ্ত বিবরণ

কোটা শেয়ারিং ইঞ্জিন একই সংযোগ ব্যবহারকারী একাধিক API key-এর মধ্যে কোনো provider-এর সময়ভিত্তিক কোটা (যেমন Codex-এর
5-ঘণ্টার উইন্ডো, Kimi-এর 1500 req/h) ন্যায্যভাবে বণ্টন করে।

**এটি যে সমস্যার সমাধান করে:** OmniRoute একই upstream provider account-এর বিপরীতে অনেক API key-এর অনুরোধ প্রক্সি করে।
শেয়ারিং লজিক না থাকলে, key A থেকে আসা হঠাৎ অনুরোধের ঢল ঘণ্টাটির জন্য
provider quota শেষ করে দিতে পারে, ফলে উইন্ডো রিসেট না হওয়া পর্যন্ত key B এবং C ব্লক হয়ে থাকে।
ইঞ্জিনটি নিম্নোক্ত উপায়ে এটি প্রতিরোধ করে:

1. প্রতিটি dimension (%, requests, tokens, $) অনুযায়ী প্রতিটি key-এর rolling consumption ট্র্যাক করে।
2. একটি work-conserving fair-share algorithm প্রয়োগ করে: global pool সম্পৃক্ত না থাকা পর্যন্ত একটি key নিষ্ক্রিয়
   share থেকে ধার নিতে পারে।
3. অনুরোধটি upstream executor-এ পৌঁছানোর আগে hot path (`chatCore.ts`)-এ ফলাফলটি
   প্রয়োগ করে।

---

## অ্যালগরিদম: Fair-Share Work-Conserving

`src/lib/quota/fairShare.ts`-এ বাস্তবায়িত।

### মোডসমূহ

| শর্ত                                       | মোড      | আচরণ                                                         |
| ------------------------------------------ | -------- | ------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **উদার** | Key ব্যবহৃত মোট বাদ দিয়ে global limit পর্যন্ত ধার নিতে পারে |
| `globalUsedPercent >= saturationThreshold` | **কঠোর** | পৃথক fair share কঠোরভাবে প্রয়োগ করে                         |

ডিফল্ট `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`)।

### প্রতি-dimension সিদ্ধান্ত

Pool-এর প্রতিটি সক্রিয় dimension-এর জন্য ইঞ্জিনটি হিসাব করে:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = এই key-এর বর্তমান rolling value (QuotaStore.peek থেকে)
remaining       = fairShareAllowed - consumed
```

এরপর:

- **`policy = hard`**: যদি `consumed > fairShareAllowed` এবং মোডটি কঠোর হয় → **ব্লক**।
- **`policy = soft`**: যদি `consumed > fairShareAllowed` এবং মোডটি কঠোর হয় → **জরিমানা প্রয়োগ** (combo-তে অগ্রাধিকার কমায়; কখনো hard-block করে না)।
- **`policy = burst`**: fair share নির্বিশেষে global headroom থাকা পর্যন্ত অনুমতি দেয়।

### পরম সীমা

কোনো allocation-এর `capValue` + `capUnit` হলো মোড বা
policy-নিরপেক্ষ একটি কঠোর সর্বোচ্চ সীমা। যেকোনো dimension-এ `consumed >= capValue` হলে তা সর্বদা অনুরোধটি **ব্লক** করে।

### একাধিক dimension যাচাই

Pool-এর **যেকোনো** dimension অনুরোধটি ব্লক করলে সেটি ব্লক হয়। Dimension-গুলো
স্বাধীন — 5h% নিঃশেষ হয়ে যাওয়া weekly% dimension-কে প্রভাবিত করে না।

### ধার নেওয়া

উদার মোডে, যে key-এর allocation সম্পূর্ণ ব্যবহৃত হয়নি সেটি
অন্যান্য key-এর অবণ্টিত share থেকে উদ্বৃত্ত ব্যবহার করতে পারে। সূত্রটি হলো:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

যেখানে `consumedByOtherKeys = consumedTotal - consumedByThisKey`। Global সর্বোচ্চ সীমা
(সেই dimension-এর pool `limit`) সর্বদা কঠোর সীমা হিসেবে কার্যকর থাকে।

---

## Sliding Window Counter

`src/lib/quota/sqliteQuotaStore.ts` এবং `redisQuotaStore.ts`-এ বাস্তবায়িত।

প্রতিটি `(apiKeyId, dimensionKey)`-এর জন্য দুটি bucket:

- `curr`: বর্তমান bucket (`floor(nowMs / windowMs)`)
- `prev`: পূর্ববর্তী bucket (`curr - 1`)

কার্যকর rolling value:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**নির্ভুলতা**: প্রায় 99% নির্ভুল। Bucket-গুলোর মধ্যবর্তী সীমানায় ত্রুটি সর্বোচ্চ
window size-এর 1% (2-bucket approximation-এর অন্তর্নিহিত সীমাবদ্ধতা)।

### Concurrency

SQLite driver: প্রতিটি `(apiKeyId | dimensionKey)` key-এর জন্য in-memory mutex
read-modify-write race প্রতিরোধ করে। Pattern-টি `src/sse/services/auth.ts`-এর anti-thundering-herd অনুসরণ করে।

Redis driver: atomic increment-এর জন্য Lua EVAL script — একটি একক Redis command হিসেবে চলে।

---

## ড্রাইভারসমূহ

### SQLite (ডিফল্ট, 0-install)

- টেবিল: `quota_consumption` (মাইগ্রেশন `073_quota_pools.sql` / `074_quota_consumption.sql` দেখুন)।
- একক-ইনস্ট্যান্স ডিপ্লয়মেন্টের জন্য সর্বোত্তম।
- সমস্ত পার্সিস্টেন্স বিদ্যমান OmniRoute SQLite DB-তে (`DATA_DIR/storage.sqlite`) থাকে।

### Redis (ঐচ্ছিক, মাল্টি-ইনস্ট্যান্স)

- `ioredis` npm প্যাকেজ প্রয়োজন।
- কাউন্টারগুলো Redis-এ সংরক্ষিত হয়; মেটাডেটা (পুল/অ্যালোকেশন) SQLite-এই থাকে।
- যেসব মাল্টি-রেপ্লিকা ডিপ্লয়মেন্টে কাউন্টার শেয়ার করা আবশ্যক, সেগুলোর জন্য সর্বোত্তম।

### ড্রাইভার পরিবর্তন

সেটিংস UI-এর মাধ্যমে (`/dashboard/settings` → Quota Store), অথবা env vars-এর মাধ্যমে:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

env-এর তুলনায় DB সেটিং অগ্রাধিকার পায়। যদি `driver=redis` হয় কিন্তু URL অনুপস্থিত থাকে অথবা
`ioredis` ইনস্টল করা না থাকে, তাহলে ফ্যাক্টরি SQLite-এ ফিরে যায় এবং একটি সতর্কবার্তা লগ করে।

ড্রাইভার নির্বাচনের ক্রম:

1. DB সেটিং `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. ডিফল্ট: `sqlite`

---

## একাধিক ডাইমেনশন

একটি পুলে একাধিক ডাইমেনশন থাকতে পারে। প্রতিটি ডাইমেনশন স্বতন্ত্র:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // এই ডাইমেনশনের জন্য গ্লোবাল পুলের সর্বোচ্চ সীমা
}
```

**উদাহরণ: Codex প্ল্যান** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

অনুমোদিত হওয়ার জন্য একটি রিকোয়েস্টকে অবশ্যই সব ডাইমেনশনের শর্ত পূরণ করতে হবে।

---

## প্ল্যান রিজলভার

`src/lib/quota/planResolver.ts`-এ বাস্তবায়িত।

অগ্রাধিকারের ক্রম (সর্বোচ্চ থেকে সর্বনিম্ন):

1. **ম্যানুয়াল DB ওভাররাইড** — `provider_plans` টেবিল, প্রতি `connectionId` অনুযায়ী।
2. **পরিচিত ক্যাটালগ** — `src/lib/quota/planRegistry.ts` (শুধু ডেটা)।
3. **খালি প্ল্যান** — কোনো ডাইমেনশন নেই, ম্যানুয়াল কনফিগারেশন প্রয়োজন।

### পরিচিত ক্যাটালগ

| প্রোভাইডার            | ডাইমেনশনসমূহ                                                  |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, অজানা), `tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | কোনো ডিফল্ট নেই — ম্যানুয়াল কনফিগারেশন প্রয়োজন              |

---

## পাইপলাইন ইন্টিগ্রেশন

### PRE হুক (`open-sse/handlers/chatCore.ts`)

আপস্ট্রিম এক্সিকিউটরের আগে এবং অথ ও পলিসি যাচাইয়ের পরে চলে:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → প্রতিটি ডাইমেনশনের জন্য getQuotaStore().peek()
      → fairShare.decideFairShare()
      → ব্লক হলে → 429 রিটার্ন করুন (buildErrorBody, হার্ড রুল #12)
      → অনুমোদিত + অগ্রাধিকার হ্রাস হলে → প্রার্থীর ওপর quotaSoftPenalty=true সেট করুন
  → executor.execute()
```

**ফেইল-ওপেন**: `enforceQuotaShare` কোনো ত্রুটি ছুড়লে, রিকোয়েস্টটি
একটি `pino.warn` লগসহ অনুমোদিত হয়। এটি কোটা-ইঞ্জিনের কোনো বাগকে
সব ট্রাফিক ব্লক করা থেকে বিরত রাখে।

### POST হুক (ব্যবহার রেকর্ড করা)

একটি সফল রেসপন্সের পরে:

```
এক্সিকিউটর সফল ফলাফল রিটার্ন করে
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → প্রতিটি ডাইমেনশনের জন্য getQuotaStore().consume()
      → ফেইল-ওপেন: ত্রুটিগুলো pino.warn হিসেবে লগ হয়, কখনো ক্লায়েন্টের কাছে পাঠানো হয় না
```

**ড্রিফট নোট**: রেসপন্সের পরে `consume` ব্যর্থ হলে, রোলিং কাউন্টার প্রকৃত ব্যবহারের চেয়ে কম গণনা করে।
প্রোভাইডারের স্যাচুরেশন সিগন্যাল (যেমন `anthropic-ratelimit-unified-5h-utilization`)
পরবর্তী রিকোয়েস্টে গ্লোবাল অনুমান সংশোধন করে।

### কম্বো সফট পেনাল্টি (`open-sse/services/combo.ts`)

যখন `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // ডিফল্ট 0.7
}
```

অন্যান্য সব স্কোরিং ফ্যাক্টরের পরে পেনাল্টি প্রয়োগ করা হয়। এটি হার্ড-ব্লক না করেই
একটি স্যাচুরেটেড কী নির্বাচন করার অটো-কম্বো সম্ভাবনা কমিয়ে দেয়।

---

## UI নির্দেশিকা

### `/dashboard/costs/quota-share` — প্রধান পুল পৃষ্ঠা

কম্পোনেন্টসমূহ (সবগুলো `src/app/(dashboard)/dashboard/costs/quota-share/`-এ):

| কম্পোনেন্ট             | উদ্দেশ্য                                                                    |
| ---------------------- | --------------------------------------------------------------------------- |
| `QuotaConceptCard`     | নতুন ব্যবহারকারীদের কোটা ভাগাভাগি সম্পর্কে ব্যাখ্যা করা পরিচিতিমূলক কার্ড   |
| `CreatePoolModal`      | একটি নতুন কোটা পুল তৈরি করা (সংযোগ + নাম + প্রাথমিক বরাদ্দ)                 |
| `PoolCard`             | প্রতি-পুলের সারসংক্ষেপ: নাম, সংযোগ, বরাদ্দের সংখ্যা                         |
| `DimensionBar`         | প্রতি-ডাইমেনশনের স্ট্যাকড বার: প্রতিটি কী-এর অংশ + সামগ্রিক ব্যবহার         |
| `AllocationTable`      | ব্যবহৃত পরিমাণ, ন্যায্য অংশ, ঘাটতি/উদ্বৃত্ত এবং ধার নেওয়ার ফ্ল্যাগসহ টেবিল |
| `BurnRateChart`        | EMA বার্ন-রেট লাইন চার্ট (`dynamic()`-এর মাধ্যমে লেজি Recharts)             |
| `EditAllocationsModal` | একটি পুলের বরাদ্দের ওজন, সীমা এবং নীতিমালা সম্পাদনা করা                     |

পৃষ্ঠাটির হুকসমূহ:

- `usePools` — প্রতি 30s অন্তর `GET /api/quota/pools` থেকে ডেটা আনে।
- `usePoolUsage` — চাহিদা অনুযায়ী `GET /api/quota/pools/[id]/usage` থেকে ডেটা আনে।
- `useLocalStoragePoolMigration` — পুরোনো LS ডেটা মাইগ্রেট করতে মাউন্টের সময় একবার চলে।

### `/dashboard/costs/quota-share/plans` — প্রদানকারী প্ল্যান কনফিগারেশন

- `ProviderPlanConfigClient.tsx`: একটি প্রদানকারী নির্বাচন, সমাধানকৃত প্ল্যান
  (ক্যাটালগ থেকে স্বয়ংক্রিয়ভাবে বা ম্যানুয়াল ওভাররাইড) দেখা এবং ডাইমেনশন সম্পাদনার জন্য ড্রপডাউন।
- পরিবর্তনগুলো `PUT /api/quota/plans/[connectionId]`-এ লেখা হয়।
- মুছে ফেললে ক্যাটালগ প্ল্যান অথবা খালি প্ল্যানে ফিরে যায়।

---

## এনভায়রনমেন্ট ভেরিয়েবলসমূহ

| ভেরিয়েবল                          | ডিফল্ট   | বিবরণ                                                                |
| ---------------------------------- | -------- | -------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite` | ব্যবহারের ড্রাইভার: `sqlite` অথবা `redis`                            |
| `QUOTA_STORE_REDIS_URL`            | _(খালি)_ | Redis URL, যেমন `redis://localhost:6379`                             |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`    | 0..1; `>= threshold` হলে কঠোর মোড সক্রিয় হয়                        |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`    | 0..1; সফট-পলিসি কম্বো স্কোরের গুণক                                   |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`     | পুরোনো `quota_consumption` বাকেটগুলো GC মুছে ফেলার আগের দিনের সংখ্যা |

DB সেটিংস (`quotaStore.*`) এনভায়রনমেন্ট ভেরিয়েবলগুলোকে ওভাররাইড করে।

---

## সমস্যা সমাধান

### Redis কনফিগার করা আছে, কিন্তু সংযোগ হচ্ছে না

`ioredis` ইনস্টল করা আছে কি না (`npm ls ioredis`) এবং `QUOTA_STORE_REDIS_URL`
অ্যাক্সেসযোগ্য কি না পরীক্ষা করুন। সংযোগ ব্যর্থ হলে ফ্যাক্টরি SQLite-এ ফিরে যায় (`warn`
স্তরে লগ করা হয়)।

### `peek` পুরোনো ডেটা ফেরত দেয় / ফেইল-ওপেন হয়

যদি `peek` ত্রুটি নিক্ষেপ করে, তবে `enforceQuotaShare` ফলাফলটিকে "অনুমোদন" হিসেবে বিবেচনা করে (ফেইল-ওপেন)।
মূল কারণ শনাক্ত করতে `quota:enforce` এবং `quota:factory` এন্ট্রির জন্য `pino` লগ
পরীক্ষা করুন।

### কনজাম্পশন কাউন্টারের বিচ্যুতি

প্রকৃত প্রদানকারী ব্যবহার কাউন্টারগুলোর থেকে আলাদা হলে সেটি প্রত্যাশিত — 2-বাকেট
স্লাইডিং উইন্ডোতে উইন্ডোর সীমানায় প্রায় 1% ত্রুটি থাকে এবং `consume` হলো
রেসপন্স-পরবর্তী ফায়ার-অ্যান্ড-ফরগেট অপারেশন। স্যাচুরেশন সিগন্যাল (`saturationSignals.ts`)
30s TTL সহ প্রকৃত প্রদানকারী ব্যবহার পড়ে এবং সেই অনুযায়ী `globalUsedPercent`
সমন্বয় করে।

### পুলে বার্ন রেটের জন্য "কোনো ডেটা নেই" দেখায়

`computeBurnRate`-এর জন্য অন্তত 2টি ঐতিহাসিক নমুনা প্রয়োজন। পূর্ববর্তী
`consume` কল ছাড়া নতুন পুলগুলোতে `tokensPerSecond: 0` এবং `timeToExhaustionMs: null` দেখাবে।

---

## localStorage থেকে মাইগ্রেশন

`/dashboard/costs/quota-share` প্রথমবার লোড হলে, `useLocalStoragePoolMigration` হুকটি যাচাই করে:

1. `localStorage.getItem("omniroute:quota-share:pools")` খালি নয়।
2. `GET /api/quota/pools` থেকে `[]` ফেরত আসে (DB খালি)।

দুটি শর্তই সত্য হলে, এটি ব্যাচ আকারে প্রতিটি লিগ্যাসি পুল `POST /api/quota/pools`-এ পোস্ট করে,
তারপর localStorage কীটি সরিয়ে দেয়। মাইগ্রেশনটি আইডেমপোটেন্ট: শর্ত 2 পুনরায়
মাইগ্রেশন প্রতিরোধ করে।

---

## অভ্যন্তরীণ স্ট্র্যাটেজি শ্রেণিবিন্যাস

`quota-share` হলো একটি **শুধু-অভ্যন্তরীণ** রাউটিং স্ট্র্যাটেজি (`INTERNAL_ROUTING_STRATEGY_VALUES`,
`src/shared/constants/routingStrategies.ts`-এ)। এটি একচেটিয়াভাবে সিস্টেমের তৈরি
`qtSd/` পুল কম্বোগুলোর জন্য ব্যবহৃত হয় এবং ইচ্ছাকৃতভাবে `ROUTING_STRATEGY_VALUES` থেকে বাদ রাখা হয়েছে, যাতে এটি কখনোই
UI বা API-তে ব্যবহারকারী-নির্বাচনযোগ্য বিকল্প হিসেবে প্রদর্শিত না হয়।

---

## টেস্ট কভারেজ

quota-share ইঞ্জিনের সঙ্গে স্বয়ংক্রিয় কভারেজের দুটি স্তর অন্তর্ভুক্ত রয়েছে:

| স্যুট                   | কমান্ড                                                                 | যা কভার করে                                                                                                                                                                                                      |
| :---------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ইউনিট (29টি টেস্ট)      | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR শিডিউলার, স্যাচুরেশন গেটিং, কনকারেন্সি ক্যাপ, fairShare গণনা, ব্যাকলগ কিউয়িং                                                                                                                                |
| ইন্টিগ্রেশন ম্যাট্রিক্স | `npm run test:combo:matrix`                                            | প্রকৃত কম্বো পাইপলাইনের মধ্য দিয়ে এন্ড-টু-এন্ড রাউটিং সিদ্ধান্ত; লাইভ সিমের মাধ্যমে DRR ন্যায্যতা + স্যাচুরেশন ডিপ্রায়োরিটাইজেশন (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

ইন্টিগ্রেশন ম্যাট্রিক্সটি সব 19টি পাবলিক স্ট্র্যাটেজির পাশাপাশি CI-তে চলে। ইউনিট স্যুটটি
স্বতন্ত্রভাবেও চালানো যায়।

---

## DB স্কিমার সারসংক্ষেপ

মাইগ্রেশন `078`, `079` এবং `085` দ্বারা তিনটি টেবিল যোগ করা হয়েছে:

- `quota_pools` + `quota_allocations` — পুলের সংজ্ঞা এবং প্রতি-কী বরাদ্দ।
- `quota_consumption` — প্রতি `(apiKeyId, dimensionKey)`-এর জন্য রোলিং 2-বাকেট কাউন্টার।
- `provider_plans` — ম্যানুয়াল প্রোভাইডার প্ল্যান ওভাররাইড (প্রতি connectionId-এর জন্য ডাইমেনশন JSON)।

সব টেবিল আইডেমপোটেন্ট `CREATE TABLE IF NOT EXISTS` মাইগ্রেশনের মাধ্যমে যোগ করা হয়েছে।
