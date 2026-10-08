# Admission lanes (#9654) — two lane systems, what gates each, where each reports (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute-এ ভিন্ন পরিসরের **দুটি** প্রক্রিয়া-স্থানীয় লেন সিস্টেম রয়েছে। এগুলো
পরস্পরের পরিপূরক; অপারেটরদের জানা উচিত তারা কোনটি দেখছেন।

## 1. বাইট-স্তরের প্রক্রিয়াব্যাপী অ্যাডমিশন (`chatBodyAdmission.ts`)

- **পরিধি:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` এবং অন্যান্য চ্যাট-আকৃতির রুটের buffered-body/heap পাথ। বড় coding-agent বডির কারণে heap amplification থেকে সুরক্ষা দেয় (#4380)।
- **প্রতি-কী lane নয়, একটি process-global controller (#10110)।** প্রতিটি API key
  (hashed) বা `anonymous` session **একই** shared budget-এর বিপরীতে অ্যাডমিট হয় —
  hashed session id শুধুমাত্র fairness scheduling key হিসেবে ব্যবহৃত হয় (waiter-দের মধ্যে round-robin
  dispatch), capacity shard হিসেবে কখনোই নয়। এই নথির আগের একটি সংস্করণে স্বাধীন capacity-সহ
  প্রতি-কী lane-এর বর্ণনা ছিল; সেই মডেলটি #10110-এ
  সরিয়ে দেওয়া হয়েছে, কারণ এটি unauthenticated নকল credential-কে
  process-wide সীমা বহুগুণ বাড়ানোর সুযোগ দিত।
- **গেট (#503-fanout): একটি স্বয়ংক্রিয়ভাবে নির্ণীত ingest BYTE budget, নির্দিষ্ট request
  count নয়।** পুরোনো `CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap (এই সংশোধনের আগে default `1`)
  coding-agent fan-out-কে (একাধিক subagent/CLI,
  নিয়মিতভাবে > 256 KB বডি) কার্যকরভাবে ~1 concurrency-তে নামিয়ে আনত, ফলে
  সম্পূর্ণ স্বাভাবিক লোডেও 503 ঘটত। এখন এটি কেবল তখনই প্রযোজ্য হয়, যখন কোনো operator স্পষ্টভাবে
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` সেট করেন। সেট না থাকলে, admission-এর পরিবর্তে
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` দ্বারা নিয়ন্ত্রিত হয় — এটি process-এর
  প্রকৃত memory ceiling থেকে স্বয়ংক্রিয়ভাবে নির্ণীত একটি budget (`src/shared/middleware/admissionBudget.ts`):
  V8 heap limit এবং যেকোনো cgroup/container limit-এর মধ্যে যেটি বেশি কঠোর, তার 25%,
  8x transient-amplification factor দিয়ে ভাগ করা হয় এবং 8 MiB থেকে
  2 GiB-এর মধ্যে সীমাবদ্ধ রাখা হয়। স্পষ্ট override-গুলিতেও একই সীমা প্রযোজ্য। কোনো env tuning ছাড়াই এটি
  512 MB container থেকে 32 GB desktop পর্যন্ত নিজেকে মানিয়ে নেয়। effective budget-এর মধ্যে
  স্থান না পাওয়া বডি অবিলম্বে `413 body_exceeds_budget` সহ ব্যর্থ হয়;
  কেবল স্বতন্ত্রভাবে পরিষেবাযোগ্য বডিগুলোর মধ্যকার contention-ই সীমাবদ্ধ
  fairness queue-তে প্রবেশ করে। একটি live multi-signal resource-pressure tracker (V8 heap ratio,
  cgroup, PSI, OOM event — `open-sse/utils/resourcePressurePolicy.ts`) `high` pressure-এর অধীনে
  সীমাবদ্ধ অপেক্ষার সময় কমায় এবং `critical` pressure-এর অধীনে
  কোনো byte ingest হওয়ার আগেই অবিলম্বে `503 resource_pressure` দিয়ে লোড প্রত্যাখ্যান করে।
  উপস্থিত থাকলে PSI এই unit-এর cgroup `memory.pressure` থেকে পড়া হয়
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory`
  host-wide এবং bare metal / cgroup v1-এ কেবল fallback হিসেবে ব্যবহৃত হয়, ফলে swapping
  host কোনো idle container-এ 503 ঘটাতে পারে না।
- **টিউনিং:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — স্বয়ংক্রিয়ভাবে নির্ণীত byte budget-এর override
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — পুরোনো request-count cap, শুধু opt-in
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503-এর আগে queue-wait (default হলো `RATE_LIMIT_MAX_WAIT_MS`)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 থেকে deprecated
    no-op (config compatibility-এর জন্য গ্রহণ করা হয়, উপেক্ষিত)
- **রিপোর্ট:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — যার মধ্যে রয়েছে
  #503-fanout-এর সংযোজন `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, এবং `countCapEnabled`
  (default deployment-এ false — এটি নিশ্চিত করে যে প্রকৃতপক্ষে legacy
  count cap নয়, byte budget-ই সীমা আরোপ করছে)।

## 2. অভিযোজিত রানটাইম ভার্চুয়াল লেন (`open-sse/services/admission`)

- **পরিধি:** প্রোভাইডার ডিসপ্যাচের জন্য tenant-key admission — কিউ খরচ, ল্যাটেন্সি-নির্দেশিত
  সীমা অভিযোজন, লেন কিউয়িং এবং লেন মেট্রিক্স।
- **গেট:** **opt-in।** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` না হলে নিষ্ক্রিয় থাকে। এটি ছাড়া,
  অভিযোজিত কন্ট্রোলার শেয়ার্ড কিউয়ের আচরণ বজায় রাখে (#9654-এর মানদণ্ড 1 কেবল
  কোনো অপারেটর লেন সক্রিয় করার পরই পূরণ হয়)।
- **টিউনিং:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + অভিযোজিত কনফিগ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)।
- **রিপোর্ট:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (অস্বচ্ছ লেন ID, কখনোই কাঁচা
  key নয়), এবং `virtualLanes` — স্ন্যাপশটে "লেন চালু আছে" নির্দেশকারী প্রামাণিক ফ্ল্যাগ।

## 3. Fan-out probe — combo/fusion-এর জন্য প্রতি-target admission (#9654 Wave 2)

Combo (priority / round-robin) এবং fusion একটি parent request-এর অধীনে Nটি model target-এ
fan out করে। #9654 Wave 2 থেকে, **প্রতিটি fan-out target ডিসপ্যাচের আগে গেট করা হয়**
একটি per-target probe (`PerTargetAdmissionHook`, যা `createPerTargetAdmissionHook` দ্বারা তৈরি)
ব্যবহার করে, **parent-এর** tenant lane-এর বিপরীতে।

- **পরিধি:** combo, fusion এবং chaos engine দ্বারা ডিসপ্যাচ করা প্রতিটি fan-out target।
  System 1 (byte-level) অপরিবর্তিত থাকে — এটি কখনো fan-out target probe করে না।
- **গেট:** **system 2-এর সঙ্গে opt-in।** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  সেট করা না থাকলে এটি no-op — ওই মোডে parent request ইতোমধ্যেই shared-queue lease ধরে রাখে,
  তাই probe করলে দ্বিগুণ গণনা হবে এবং combo target প্রত্যাখ্যাত হবে।
- **আচরণবিধি:**
  - **সম্পূর্ণ non-blocking — এড়িয়ে যান, কখনো কিউ করবেন না।** `maxWaitMs 0`: পূর্ণ lane
    target-টি এড়িয়ে যায় এবং তার পরিবর্তে combo-এর fallback ব্যবস্থা (অথবা fusion-এর survivor
    panel) সেবা দেয়। এটি ইচ্ছাকৃত: একটি fan-out target অপ্রয়োজনীয় অতিরিক্ত
    কাজ, এবং সেটিকে কিউ করলে ঠিক সেই congestion-এর ওপর আরও লোড জমে, যা থামানোর
    জন্যই lane তৈরি করা হয়েছে। তাই `defaultMaxWaitMs` **শুধু parent request-এর** ক্ষেত্রে প্রযোজ্য;
    fan-out probe কখনো অপেক্ষা করে না এবং সেগুলোকে অপেক্ষা করানোর জন্য ইচ্ছাকৃতভাবেই
    **কোনো knob নেই** (issue history দেখায় যে wait knob-এর কারণে সেই mass-502/504 শ্রেণির
    সমস্যা তৈরি হয়েছিল, যা #9654 প্রতিরোধ করে — কোনো অপারেটর skipped fan-out target-এর কারণে
    response quality ক্ষতিগ্রস্ত হচ্ছে বলে রিপোর্ট করলেই কেবল এটি পুনর্বিবেচনা করুন)।
  - **Admit হলে release।** অনুমোদিত probe সঙ্গে সঙ্গেই তার lease release করে: এটি
    একটি capacity gate, কোনো hold নয়। parent-এর lease fan-out-টিকে কভার করে; অতিরিক্ত Nটি
    ধরে রাখলে shared active cost কৃত্রিমভাবে বাড়বে এবং অন্য tenant প্রত্যাখ্যাত হবে। এটি best-effort,
    reservation নয়: probe ও dispatch-এর মধ্যে lane আবার পূর্ণ হতে পারে, তাই
    তীব্র contention-এর সময় gate এমন lane-এ admit করতে পারে, যা target dispatch হওয়ার
    সময় আবার পূর্ণ হয়ে গেছে।
  - **বাস্তব fan-out body থেকে মূল্যায়িত।** probe target-এর প্রকৃত body থেকে cost
    অনুমান করে — এর `stream` flag থেকে উদ্ভূত request class-সহ, ঠিক parent path-এর মতোই —
    ফলে fusion panel member (`stream: false`) বাস্তবে যে non-streaming class দখল করবে,
    সেই class অনুযায়ী মূল্যায়িত হয়; আর priority/RR target-এর ক্ষেত্রে ব্যবহারকারী যা অনুরোধ করেছেন,
    তা অনুযায়ী মূল্যায়িত হয়।
- **রিপোর্ট:** প্রথম target-এর পর কোনো probe skip হলে combo-এর প্রতি-request
  `fallbackCount` বাড়ে (বিদ্যমান fallback semantics-এর অনুরূপ; combo
  log-এ দৃশ্যমান); প্রতিটি panel member skip হলে fusion 503 ফেরত দেয়। বর্তমানে
  snapshot-এ **কোনো aggregate counter নেই** (যেমন `virtualFanoutSkipped`) —
  কোনো অপারেটর যদি জানান যে lane gate কত ঘন ঘন fan-out target skip করে তা তারা
  বুঝতে পারছেন না, সেটিই এমন counter যোগ করার trigger।

## ড্যাশবোর্ডে কোনটি দেখা যাচ্ছে

- `adaptiveAdmission.laneCount` / `laneTenants` → **অ্যাডাপটিভ ভার্চুয়াল লেন** (সিস্টেম 2)।
- `adaptiveAdmission.virtualLanes === true` → সেকশন 3-এর ফ্যান-আউট প্রোবগুলোও
  সক্রিয়। `virtualLanes` অনুপস্থিত বা `false` থাকা কোনো পেলোডের অর্থ হলো
  `OMNIROUTE_CHAT_VIRTUAL_LANES` সেট করা নেই — বাইট-স্তরের লেনগুলো (সিস্টেম 1)
  তখনও সক্রিয় থাকে, কিন্তু এটি সক্রিয় না করা পর্যন্ত `adaptiveAdmission`-এর
  অধীনে কিছুই (এবং কোনো ফ্যান-আউট গেটিংও) কার্যকর থাকে না।

## দুটিই কেন বিদ্যমান

বাইট-স্তরের লেনগুলো মেমরি-নিবিড় পার্স/কমপ্রেস পাথকে সীমাবদ্ধ রাখে; অ্যাডাপটিভ লেনগুলো
প্রতি টেন্যান্টের ডিসপ্যাচ খরচ সীমাবদ্ধ রাখে। #9654-এর মানদণ্ড 1 ("একটি সেশনের বার্স্টের
কারণে অন্যটি 503 পায় না") সিস্টেম 1 দ্বারা নিঃশর্তভাবে এবং অপ্ট-ইন সক্রিয় করার পর
সিস্টেম 2 দ্বারা প্রয়োগ করা হয়।

## 4. এক-প্রসেসে দীর্ঘ `/v1/responses` (স্বাস্থ্যকর-হেডরুম)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-এ
`tryAcquireHealthyHeadroom` যোগ করা হয়েছে, যাতে হিপ
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-এর নিচে থাকলে কাঠামোগতভাবে ভারী
দ্বিতীয় একটি অনুরোধ গ্রহণ করা হয়। `admitChatRequest` দ্বারা ব্যবহৃত BYTE
পাথটি (বডির আকার ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, ডিফল্ট 256 KiB,
`POST /v1/responses`-সহ) **একই** এস্কেপ ব্যবহার করে।

দুটির বেশি সমসাময়িক দীর্ঘ SSE `/v1/responses`-এর জন্য এটিই সমর্থিত
**এক-প্রসেস** রেসিপি: হিপ এবং প্রসেস-ব্যাপী ইনফ্লাইট-বাইট বাজেট
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) যতটা অনুমতি দেয়, কেবল ততটাই
প্রাইমারি + স্বাস্থ্যকর-হেডরুম বাড়ান। কয়েক দশক দীর্ঘ SSE ক্লায়েন্ট (40–50)
সমর্থন করা ওই মেমরি-বাজেটের প্রশ্ন, এটি পণ্যের কোনো কঠোর “সর্বোচ্চ 2” সীমা নয়।
চাপের মুখে থাকা হিপ তখনও পুনরায় চেষ্টা-যোগ্য `503` দিয়ে অনুরোধ বাদ দেয়, যাতে
#7849 ফিরে না আসে।

**একাধিক হিপ** পেতে, Nটি স্বতন্ত্র `DATA_DIR` চালান (#11024)। একই SQLite ফাইলে
কখনোই `replicas > 1` ব্যবহার করবেন না (#10350)। এই সেকশনটি DATA_DIR স্কেল-আউট
রেসিপি পুনরায় আলোচনার জন্য নয়।
