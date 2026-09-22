# Router Backends & Embedded Services — architecture contract (ADR) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **স্থিতি:** গৃহীত · **প্রসঙ্গ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **চুক্তি:** `domain/routing/routerBackends.ts`
> (টাইপড রেজিস্ট্রি — কোডটি [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-এর সঙ্গে যুক্ত হবে)

এই ADR নির্দিষ্ট করে যে `ts` (নেটিভ), `bifrost`, `cliproxy`, `9router` এবং
VibeProxy-সামঞ্জস্যপূর্ণ ইঞ্জিনগুলো পরস্পরের সঙ্গে কীভাবে সম্পর্কিত, যাতে অবদানকারীরা
স্থাপত্যগতভাবে স্বতন্ত্র দুটি বিষয়কে এক করে না ফেলেন। এটি router-backend-registry
কাজের মাধ্যমে প্রবর্তিত টাইপড রেজিস্ট্রিটিকে সেই মডেলের একক সত্যের উৎস হিসেবে
নথিভুক্ত করে।

## মূল পার্থক্য — দুটি পরস্পর-স্বাধীন অক্ষ

একটি ইঞ্জিনের ভূমিকা **দুটি স্বাধীন অক্ষ** দিয়ে বর্ণিত হয়, যেগুলো রেজিস্ট্রির
`RouterBackendDefinition`-এ একসঙ্গে এনকোড করা হয়েছে:

1. **লাইফসাইকেল** (`RouterBackendLifecycle`) — _ইঞ্জিনটি কীভাবে চলে_:
   - `in-process` — OmniRoute Node প্রসেসের ভেতরে চলে (নেটিভ TS পাইপলাইন)।
   - `supervised` — একটি লোকাল চাইল্ড প্রসেস, যেটি OmniRoute `ServiceSupervisor`-এর
     মাধ্যমে ইনস্টল/চালু/বন্ধ/স্বাস্থ্য-পরীক্ষা করে এবং পরে একটি প্রোভাইডার সংযোগ হিসেবে ব্যবহার করে।
   - `external` — একটি HTTP এন্ডপয়েন্ট, যেখানে OmniRoute অনুরোধ পাঠায়, কিন্তু সেটি
     পরিচালনা করে **না** (একটি env বেস URL দিয়ে কনফিগার করা হয়)।
   - `disabled` — নিবন্ধিত, কিন্তু নির্বাচনযোগ্য নয়।
2. **নির্বাচন অক্ষ** (রিলে রাউটিং ব্যাকএন্ড) — _রিলে এটিতে অনুরোধ পাঠায় কি না_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`-এ সংজ্ঞায়িত।

যে ভুলটি এড়াতে হবে: "এমবেডেড সার্ভিস" এবং "রাউটিং ব্যাকএন্ড"-কে একই
তালিকা হিসেবে বিবেচনা করা। এগুলো এক নয়। একটি `supervised` ইঞ্জিন (9router/cliproxy) হলো
**নেটিভ পাইপলাইন দ্বারা ব্যবহৃত একটি প্রোভাইডার সংযোগ**, কোনো বিকল্প রিলে ডিসপ্যাচ
ব্যাকএন্ড নয়। `bifrost` হলো এর বিপরীত — একটি রিলে ডিসপ্যাচ ব্যাকএন্ড, যা (ঐতিহাসিকভাবে)
শুধু `external` ছিল।

## রেজিস্ট্রি — একক সত্যের উৎস

`domain/routing/routerBackends.ts` চুক্তি (কোডটি
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-এর সঙ্গে যুক্ত হবে) প্রতিটি ইঞ্জিনকে তার
লাইফসাইকেল, সক্ষমতা, সার্ভিস পরিচয়, ডিফল্ট পোর্ট, স্বাস্থ্য-সংক্রান্ত কনফিগারেশন এবং
টেলিমেট্রি সমর্থনসহ একবার করে ঘোষণা করে। প্রতিটি সাইডকারের জন্য আলাদা বিশেষ শর্ত
ব্যবহারের পরিবর্তে কনজিউমাররা `getRouterBackend(id)`,
`listRouterBackends()` এবং `listRouterBackendsByCapability(cap)`-এর মাধ্যমে
ইঞ্জিন খুঁজে নেয়।

| ব্যাকএন্ড   | লাইফসাইকেল   | সার্ভিস (অক্ষ A) | রিলে ব্যাকএন্ড (অক্ষ B)    | স্বাস্থ্য     | ডিফল্ট পোর্ট |
| ----------- | ------------ | ---------------- | -------------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                | `ts` (নেটিভ)               | —             | —            |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`         | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`       | — (প্রোভাইডার)             | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`        | — (প্রোভাইডার)             | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                | — (প্রোভাইডার অ্যাডাপ্টার) | `/v1/models`  | —            |

¹ Bifrost-কে একটি `supervised` এমবেডেড সার্ভিসে উন্নীত করার কাজ (`/api/services/bifrost/`
থেকে ইনস্টল/চালু করা যাবে) [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)-এ
ট্র্যাক করা হচ্ছে; এটি মার্জ না হওয়া পর্যন্ত Bifrost শুধু `external`
(কেবল `BIFROST_BASE_URL`-এর মাধ্যমে অ্যাক্সেসযোগ্য)।

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) কলারদের
প্রতিটি id-এর জন্য হার্ড-কোডেড শাখা ব্যবহার না করে একটি ইঞ্জিন বাস্তবে কী করতে পারে,
তার ভিত্তিতে ফিল্টার করার সুযোগ দেয়।

## অক্ষ A — এমবেডেড সার্ভিসসমূহ (তত্ত্বাবধানে থাকা প্রসেসের দিক)

- **তত্ত্বাবধানে থাকা প্রসেসের রেজিস্ট্রি:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (বর্তমানে: `9router`, `cliproxy`)।
- **লাইফসাইকেলের নিয়ন্ত্রক:** `src/lib/services/ServiceSupervisor.ts` — `start()` চাইল্ড প্রসেস
  চালু করে, `waitForHealthy()`-এর ফলাফলের ভিত্তিতে অগ্রসর হয়, stdout/stderr একটি রিং বাফারে
  ধারণ করে; `stop()` SIGTERM→SIGKILL; সবকিছু একটি লকের অধীনে ধারাবাহিকভাবে সম্পন্ন হয়।
- **স্টেট ইউনিয়ন** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, এবং এর পাশাপাশি একটি
  স্বতন্ত্র `HealthState = healthy | unhealthy | unknown`।
- **আলাদা প্রসেস কেন (ইন-প্রসেস SDK নয় কেন)?** প্রসেস আইসোলেশনের কারণেই প্রতিটি সাইডকারের
  install/start/stop/health/logs স্বাধীনভাবে নিয়ন্ত্রণ করা যায় এবং লুপব্যাক spawn-guard প্রয়োগ করা
  সম্ভব হয়। একটি ইন-প্রসেস অ্যাডাপ্টার মডেল করা ভবিষ্যতের কাজ — এটি প্রকাশ করার স্থান হলো
  `native-hot-path` ক্যাপাবিলিটি ফ্ল্যাগ।

### লাইফসাইকেল রুটের চুক্তি (`/api/services/<tool>/…`)

স্ট্যাটাস কোডগুলো **ডিজাইন অনুযায়ী state/verb/path-নির্দিষ্ট** — এটি চুক্তির অংশ,
অসামঞ্জস্য নয়:

| কল                           | শর্ত                              | স্ট্যাটাস                            |
| ---------------------------- | --------------------------------- | ------------------------------------ |
| `POST .../start`             | সার্ভিস `not_installed`           | **409** (পূর্বশর্ত)                  |
| `POST .../stop`              | ইতিমধ্যে বন্ধ                     | **200** (আইডেমপোটেন্ট নো-অপ)         |
| `GET .../status`             | ঠিক আছে                           | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | spawn ব্যর্থতা                    | **503** (সাময়িক)                    |
| `GET .../status`, `.../stop` | অনিয়ন্ত্রিত ত্রুটি               | **500**                              |
| `GET /api/services/<x>/logs` | অজানা টুল `<x>`                   | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` অনুপস্থিত | **403** (শুধু 9router)               |
| **যেকোনো** `/api/services/*` | কলকারী loopback/private-LAN নয়   | **403 LOCAL_ONLY**                   |

সব ত্রুটির বডি `createErrorResponse()` দ্বারা এই আকারে তৈরি হয় →
`{ error: { message, type }, requestId }`, যেখানে `type` স্ট্যাটাস থেকে নির্ধারিত হয়
(`500→server_error`, `404→not_found`, `409→conflict`, অন্যথায় `invalid_request`) এবং এটিই
মেশিনে প্রক্রিয়াযোগ্য পার্থক্যসূচক। বার্তাগুলো আগে থেকেই স্যানিটাইজ করা থাকে
(`sanitizeErrorMessage()`, কঠোর নিয়ম #12)।

**লুপব্যাক গার্ড** হলো `403`-এর সবচেয়ে সাধারণ কারণ: `/api/services/` রয়েছে
`LOCAL_ONLY_API_PREFIXES`-এ (`src/server/authz/routeGuard.ts`) এবং
`src/server/authz/policies/management.ts` যেকোনো non-loopback / non-private-LAN
কলকারীকে **auth-এর আগেই** প্রত্যাখ্যান করে, কারণ এই রুটগুলো চাইল্ড প্রসেস চালু করে (কঠোর নিয়ম 15
এবং 17)। পাবলিক টানেলের মাধ্যমে এগুলোতে পৌঁছালে ডিজাইন অনুযায়ী `403` পাওয়া যায়।

## অক্ষ B — রিলে রাউটিং ব্যাকএন্ড (ডিসপ্যাচের দিক)

শুধু রিলে প্রক্সি পাথ `/api/v1/relay/chat/completions` একটি ডিসপ্যাচ
ব্যাকএন্ড নির্বাচন করে; প্রধান `/api/v1/chat/completions` সারফেস কখনোই
`routingBackend.ts` ব্যবহার করে না।

- **নির্বাচন** (`resolveRelayRoutingBackend`): একটি একক গ্লোবাল env টগল —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}।
  সেট করা না থাকলে, Bifrost কনফিগার করা ও সক্রিয় থাকলে `auto`, অন্যথায় `ts`।
- **আচরণ:**
  - `bifrost` (বাধ্যতামূলক): Bifrost ব্যর্থতা → সরাসরি `502`, কোনো fallback নেই।
  - `auto`: Bifrost চেষ্টা করে; ব্যর্থতা/cooldown হলে নীরবে native-এ চলে যায়।
  - `ts` / fallback-পরবর্তী: native `open-sse` ট্রান্সলেটর/এক্সিকিউটর পাইপলাইন।
- **Cooldown:** `bifrostCooldown.ts`-এ প্রতিটি `baseUrl`-এর জন্য আলাদা ব্যর্থতা cooldown।

বর্তমানে নির্বাচনটি রিলে স্তরে **সম্পূর্ণ অথবা কিছুই নয়** — `release/v3.8.43`-এ
প্রতিটি provider বা প্রতিটি request অনুযায়ী ইঞ্জিন বদলানোর ব্যবস্থা নেই। প্রতিটি request-এর
গেট সাইডকার-ম্যানিফেস্টের কাজের মাধ্যমে যোগ করা হচ্ছে
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) ম্যানিফেস্ট +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
যার ফলে `auto` শুধু ম্যানিফেস্ট-যোগ্য provider-গুলোকে Bifrost-এর মাধ্যমে রাউট করতে পারে।

## ড্যাশবোর্ড ইন্টিগ্রেশন

সার্ভিস ড্যাশবোর্ডটি
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`-এর মাধ্যমে প্রতি 5s অন্তর `GET /api/services/<tool>/status` পোল করে এবং `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ফেরত দেয়। কোনো শেয়ার্ড availability-context provider নেই —
প্রতিটি কম্পোনেন্ট প্রত্যেক টুলের জন্য আলাদাভাবে হুকটি কল করে। `!res.ok` হলে হুকটি বর্তমানে শুধু
`HTTP <status>` দেখায়; `error.type` ফিল্ডকে মানুষের বোধগম্য ব্যাখ্যার সঙ্গে ম্যাপ করা একটি
ট্র্যাক করা UX উন্নতি, কনট্র্যাক্টের পরিবর্তন নয়।

## পরিণতি

- নতুন ইঞ্জিনগুলো `ROUTER_BACKENDS`-এ একবার নিবন্ধিত হয়; কনজিউমাররা নতুন per-id ব্রাঞ্চ ছাড়াই capability
  query-এর মাধ্যমে সেগুলো পায়।
- "এটি কি একটি সার্ভিস, নাকি একটি রাউটিং ব্যাকএন্ড?"—এর উত্তর নির্ধারিত হয় `lifecycle` ফিল্ড দ্বারা,
  কোনো id ঘটনাক্রমে কোন তালিকায় রয়েছে তার দ্বারা নয়।
- Bifrost supervision (#5817) এবং native hot-path migration (#5670) প্রতিটি
  sidecar-কে আলাদাভাবে বিশেষভাবে পরিচালনা করার পরিবর্তে এই শেয়ার্ড কনট্র্যাক্টের ওপর ভিত্তি করে তৈরি হয়।
