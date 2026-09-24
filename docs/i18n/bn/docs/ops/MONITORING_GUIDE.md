# Monitoring & Observability Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **সংক্ষেপে**: OmniRoute-এ বিল্ট-ইন স্বাস্থ্য পর্যবেক্ষণ, প্রদানকারী অটোপাইলট, কোটা ট্র্যাকিং এবং অবজারভেবিলিটি হুক রয়েছে। এই নির্দেশিকায় ড্যাশবোর্ড, সতর্কতা এবং সমস্যা সমাধান নিয়ে আলোচনা করা হয়েছে।

**উৎসসমূহ:**

- `src/lib/monitoring/observability.ts` — অবজারভেবিলিটি স্ন্যাপশট
- `src/lib/monitoring/comboHealthAutopilot.ts` — কম্বো স্বাস্থ্য অটোপাইলট
- `src/lib/monitoring/providerHealthAutopilot.ts` — প্রদানকারী অটোপাইলট
- `src/lib/monitoring/providerHealthMatrix.ts` — প্রদানকারী স্বাস্থ্য ম্যাট্রিক্স
- `src/lib/localHealthCheck.ts` — স্থানীয় স্বাস্থ্য পরীক্ষা
- `src/lib/tokenHealthCheck.ts` — টোকেন রিফ্রেশের স্বাস্থ্য
- `src/lib/proxyHealth.ts` — প্রক্সি স্বাস্থ্য ক্যাশ (PROXY_GUIDE.md-এ আলোচনা করা হয়েছে)

---

## সংক্ষিপ্ত বিবরণ

OmniRoute-এ পর্যবেক্ষণের **৩টি স্তর** রয়েছে:

```
┌──────────────────────────────────────────────────────────────┐
│  স্তর ১: সিস্টেমের স্বাস্থ্য (সার্ভার-স্তর)                    │
│  ├─ localHealthCheck.ts — DB, পোর্ট, নেটিভ ডিপেন্ডেন্সি       │
│  ├─ db/healthCheck.ts — অখণ্ডতা, FK, অনাথ আর্টিফ্যাক্ট        │
│  └─ ড্যাশবোর্ড: /dashboard/health                            │
├──────────────────────────────────────────────────────────────┤
│  স্তর ২: প্রদানকারীর স্বাস্থ্য (প্রদানকারী-ভিত্তিক সহনশীলতা)    │
│  ├─ providerHealthAutopilot.ts — সার্কিট ব্রেকার, কুলডাউন     │
│  ├─ providerHealthMatrix.ts — প্রদানকারী/মডেলভিত্তিক স্বাস্থ্য স্কোর │
│  └─ ড্যাশবোর্ড: /dashboard/providers                         │
├──────────────────────────────────────────────────────────────┤
│  স্তর ৩: লাইভ অবজারভেবিলিটি (রানটাইম স্ন্যাপশট)               │
│  ├─ observability.ts — সার্কিট ব্রেকার, সেশন, কোটা            │
│  ├─ tokenHealthCheck.ts — OAuth টোকেন রিফ্রেশের স্বাস্থ্য      │
│  └─ MCP টুল: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ড্যাশবোর্ড পৃষ্ঠাসমূহ

### `/dashboard/health` (সিস্টেমের স্বাস্থ্য)

শীর্ষ-স্তরের স্বাস্থ্য ড্যাশবোর্ডে দেখানো হয়:

| বিভাগ                  | যা দেখায়                                           |
| ---------------------- | --------------------------------------------------- |
| **সার্ভারের স্থিতি**   | আপটাইম, সংস্করণ, পোর্ট, সক্রিয় সংযোগ               |
| **ডেটাবেস**            | সংযোগ, অখণ্ডতা, WAL-এর আকার, সাম্প্রতিক মাইগ্রেশন   |
| **প্রদানকারীর সারাংশ** | সক্রিয় সংখ্যা, সুস্থ সংখ্যা, খোলা ব্রেকারের সংখ্যা |
| **কোটা মনিটর**         | সক্রিয় সেশন, সতর্কতার অবস্থা, নিঃশেষিত             |
| **সাম্প্রতিক ত্রুটি**  | স্ট্যাক ট্রেসসহ সর্বশেষ ১০টি ত্রুটি                 |
| **রিসোর্স ব্যবহার**    | মেমরি, CPU, হিপ চাপের নির্দেশক                      |

### `/dashboard/providers` (প্রদানকারীর স্বাস্থ্য)

প্রদানকারীভিত্তিক ড্যাশবোর্ড:

| কলাম       | বিবরণ                                            |
| ---------- | ------------------------------------------------ |
| প্রদানকারী | প্রদানকারীর ID + প্রদর্শিত নাম                   |
| স্বাস্থ্য  | সবুজ/হলুদ/লাল স্থিতি                             |
| সার্কিট    | খোলা/বন্ধ/অর্ধ-খোলা অবস্থা                       |
| সংযোগসমূহ  | সংযোগের সংখ্যা, সর্বশেষ রিফ্রেশ                  |
| মডেলসমূহ   | উপলভ্য মডেল, প্রতিটি মডেলের স্বাস্থ্য            |
| খরচ        | আজকের খরচ, ৭ দিনের প্রবণতা                       |
| ত্রুটিসমূহ | গত ২৪ ঘণ্টার ত্রুটির সংখ্যা, শীর্ষ ত্রুটি শ্রেণি |

বিস্তারিত দেখতে কোনো প্রদানকারীতে ক্লিক করুন:

- লেটেন্সির বিস্তারিত বিভাজনসহ সাম্প্রতিক অনুরোধ
- প্রতিটি সংযোগের স্বাস্থ্য স্কোর
- প্রতিটি মডেলের লকআউট
- অটোপাইলটের সুপারিশ

### `/dashboard/quota` (কোটা ট্র্যাকিং)

প্রতিটি API কী-এর জন্য:

- বর্তমান ব্যবহার বনাম সীমা (প্রগ্রেস বার)
- কোটার প্রবণতা (৩০ দিনের চার্ট)
- পরবর্তী রিসেটের সময়
- সতর্কতার ইতিহাস

### `/dashboard/combos` (কম্বোর স্বাস্থ্য)

প্রতিটি কম্বোর জন্য:

- কৌশল + লক্ষ্যসমূহ
- প্রতিটি লক্ষ্যের স্বাস্থ্য
- সাম্প্রতিক ফলব্যাক ইভেন্ট
- সাফল্যের হার (২৪ ঘণ্টা, ৭ দিন, ৩০ দিন)

---

## হেলথ চেক API

OmniRoute **দুটি** HTTP হেলথ সারফেস প্রকাশ করে। অর্কেস্ট্রেটরের ক্ষেত্রে এগুলো পরস্পরের বিকল্প নয়।

| পাথ                          | উদ্দেশ্য                                                                | ভার                               | ব্যবহারের ক্ষেত্র                                                    |
| ---------------------------- | ----------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| `GET /healthz`               | লাইফসাইকেল লাইভনেস/রেডিনেস (`ok` / `starting` / `stopping`)             | নগণ্য (শুধু ফেজ ফ্ল্যাগ)          | Kubernetes **readiness**; HTTP ব্যবহার করতেই হলে নমনীয় **liveness** |
| `GET /api/monitoring/health` | সিস্টেম + প্রোভাইডারের গভীর সারসংক্ষেপ (DB, heap, ক্যাটালগের সংখ্যা, …) | ভারী (সিঙ্ক DB / মনিটরিংয়ের কাজ) | ড্যাশবোর্ড, ব্ল্যাকবক্স ডিপ চেক, Docker-এর বিল্ট-ইন হেলথচেক          |

> **দ্রষ্টব্য:** প্রোভাইডার হেলথ ম্যাট্রিক্স, অটোপাইলট সমস্যা, কোটা মনিটর, টোকেন হেলথ এবং `/api/monitoring/health`-এর অতিরিক্ত ল্যাটেন্সি-সংক্রান্ত বিস্তারিত তথ্য **MCP টুল** `observability_snapshot` অথবা **ড্যাশবোর্ড** পেজগুলোর মাধ্যমে পাওয়া যায় — এগুলোর জন্য আলাদা কোনো REST রুট নেই।

উভয় রুটই রিকোয়েস্ট হ্যান্ডলিংয়ের **একই Node ইভেন্ট লুপে** চলে। কোনো CPU-নির্ভর পাথ (বড় `GET /v1/models` ক্যাটালগের কাজ, দীর্ঘ-কনটেক্সট কমপ্রেশন / টোকেন গণনা) `/healthz`-সহ **সব** HTTP হ্যান্ডলারকে বিলম্বিত করতে পারে। ইভেন্ট লুপ ব্যস্ত ≠ প্রসেস বন্ধ। ব্যস্ততার মূল কারণ সমাধান করাই শ্রেয়; প্রোব টিউনিং শুধু ভুলবশত প্রসেস বন্ধ করার ঘটনা কমায়।

### হালকা অর্কেস্ট্রেটর প্রোব

```bash
GET /healthz
# অথবা HEAD /healthz
```

- সার্ভারের লাইফসাইকেল ফেজ প্রস্তুত থাকলে **200** + বডি `ok`
- বুট বা শাটডাউনের সময় **503** + `starting` / `stopping`
- ইমপ্লিমেন্টেশন: `src/app/healthz/route.ts` (কোনো DB ping নেই)

### সিস্টেম হেলথ (গভীর)

```bash
GET /api/monitoring/health
```

রেসপন্স:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: প্রোব-ক্যাশ বনাম SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` হলো **ইন-মেমরি প্রোব-ক্যাশ
গেজ**, `provider_connections.test_status`-এর লাইভ ডাম্প নয়। #12532-এর পরে
রিকোয়েস্ট পাথটি শুধু `getCachedCredentialHealthSummary()` পড়ে; ব্যাকগ্রাউন্ড প্রোবগুলো
ইভেন্ট লুপের বাইরে ক্যাশ রিফ্রেশ করে।

| স্তর                       | অবস্থান                                                               | এর অর্থ                                                                                                                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| প্রোব-ক্যাশ গেজ            | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | প্রসেস মেমরিতে এখনো ধরে রাখা সর্বশেষ ক্রেডেনশিয়াল-হেলথ প্রোবের ফলাফল। `source` সর্বদা `probe-cache`।                                                                                                                    |
| ব্যর্থ কানেকশনের বিস্তারিত | `credentialHealth.failedConnections`                                  | **শুধু `failed > 0` হলেই** উপস্থিত থাকে। `status=error`-সহ ক্যাশ রো-এর সীমাবদ্ধ তালিকা (`connectionId`, `status`, পরিশোধিত `lastError` / `lastErrorType`)। তালিকাটি সীমায় ছেঁটে দেওয়া হলে `failedOmitted` সেট করা হয়। |
| SQLite স্টিকি স্ট্যাটাস    | `credentialHealth.staleDbNonOkCount`                                  | যেসব **সক্রিয়** (`is_active=1`) কানেকশন রো-এর সংরক্ষিত `test_status` একটি পরিচিত non-ok মান (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`), সেগুলোর সংখ্যা।                          |

দুটি স্তরের মধ্যে ইচ্ছাকৃতভাবে অমিল থাকতে পারে:

- গেজে `failed=0`, অথচ `staleDbNonOkCount>0` — SQLite-এ এখনো একটি স্টিকি
  `test_status` (যেমন `expired` বা `credits_exhausted`) রয়েছে, যেটিকে সর্বশেষ
  প্রোব-ক্যাশ স্ন্যাপশট `status=error` হিসেবে গণনা করে না।
- গেজে `failed>0`, অথচ SQLite-কে স্বাস্থ্যকর দেখায় — সাম্প্রতিক একটি প্রোব ব্যর্থ হয়ে
  ক্যাশ হয়েছে; DB রোটি আপডেট হয়নি অথবা পরে পরিষ্কার করা হয়েছে।

এই এন্ডপয়েন্ট স্ক্র্যাপ করার সময় শুধু `provider_connections.test_status`-এর ভিত্তিতে
অ্যালার্ট দেবেন না। লাইভ প্রোব ব্যর্থতার জন্য `failed` + `failedConnections` এবং
সংরক্ষিত স্টিকি-স্ট্যাটাসের সংখ্যা প্রয়োজন হলে `staleDbNonOkCount` ব্যবহার করুন।

### Kubernetes প্রোবের সুপারিশ

OmniRoute একটি **একক Node প্রসেস** (একটি ইভেন্ট লুপ)। স্ট্যান্ডার্ড Docker `HEALTHCHECK` হালকা `/healthz`-কে লক্ষ্য করে। kubelet লাইভনেস ইন্টারভালের জন্য `/api/monitoring/health` **অতিরিক্ত ভারী**।

| প্রোব                      | প্রস্তাবিত লক্ষ্য                                                           | নোট                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **স্টার্টআপ**              | দীর্ঘ `failureThreshold` (অথবা বড় `startPeriod`) সহ HTTP `GET /healthz`    | কোল্ড স্টার্ট + SQLite মাইগ্রেশনে কয়েক সেকেন্ডের বেশি সময় লাগতে পারে                                                                                                                                                                                                                                                                                                           |
| **রেডিনেস**                | HTTP `GET /healthz`                                                         | লাইফসাইকেল `ok` / `starting` / `stopping` (200 বনাম 503)। লুপটি CPU-ব্লকড হলে এটি এখনও ওঠানামা করে। **কয়েক সেকেন্ড পরে পাওয়া 200 স্বাস্থ্যকর নয়** (#10303) — এর মানে 3-বাইটের হ্যান্ডলারটি চলার আগেই ইভেন্ট লুপ রিসোর্সের অভাবে আটকে ছিল                                                                                                                                      |
| **লাইভনেস**                | HTTP `GET /livez`, **অথবা মূল সার্ভিস পোর্টে TCP** (`PORT`, ডিফল্ট `20128`) | `/livez` কেবল প্রক্রিয়াটি সচল আছে কি না তা নির্দেশ করে (হ্যান্ডলার চললে সর্বদা 200)। এটিও একই ইভেন্ট লুপ ব্যবহার করে — ব্যস্ত ≠ বন্ধ, এবং এটি TCP-এর চেয়ে ভালোভাবে ইভেন্ট-লুপ স্টারভেশন (#10303) শনাক্ত করে না। ক্যাটালগ/কম্প্রেশন লোডের সময় HTTP প্রোব টাইম আউট হলে **TCP** ব্যবহার করাই শ্রেয়; উভয় ক্ষেত্রেই স্বল্পমেয়াদি ইভেন্ট-লুপ স্টলের কারণে পডটি বন্ধ করবেন **না** |
| **গভীর স্বাস্থ্য পরীক্ষা** | কোনো বাহ্যিক পরীক্ষক থেকে `GET /api/monitoring/health`                      | kubelet `livenessProbe` / ঘনঘন চলা `readinessProbe`-এর জন্য নয়                                                                                                                                                                                                                                                                                                                  |

উদাহরণ কাঠামো (আপনার কোল্ড-স্টার্ট ও কম্প্রেশন লোড অনুযায়ী থ্রেশহোল্ড সমন্বয় করুন):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # ইভেন্ট-লুপ স্টলের সময় HTTP /livez-ও টাইম আউট হতে পারে। TCP হলো
  # রক্ষণশীল বিকল্প:
  # tcpSocket:
  #   port: http
```

kubelet-এর **লাইভনেস** `/api/monitoring/health`-এর দিকে নির্দেশ করবেন **না**। ওই পাথটি প্রকৃত DB/মনিটরিংয়ের কাজ করে এবং লোডের সময় ফলস পজিটিভ দেবে।

সম্পর্কিত: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ইভেন্ট লুপ ব্যস্ত থাকাকালীন প্রোব), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (ক্যাটালগ প্রাইসিংয়ের অতিরিক্ত রিসোর্স ব্যবহার), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (কম্প্রেশন টোকেন গণনার অতিরিক্ত রিসোর্স ব্যবহার)।

### ঐচ্ছিক রিকোয়েস্ট-পাথের কাজ (মেমরি, স্কিল, টোকেন রিফ্রেশ)

মেমরি এক্সট্র্যাকশন, স্কিল ইনজেকশন এবং OAuth টোকেন রিফ্রেশ `/healthz`-এর সঙ্গে **মূল Node ইভেন্ট লুপ** শেয়ার করে। এগুলো ড্যাশবোর্ড-টগল ফিচার (`memoryEnabled`, `skillsEnabled`), কোনো ওয়ার্কার পুল নয়। দেখুন [এনভায়রনমেন্ট — ইভেন্ট-লুপের ব্যয়](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)।

### প্রোভাইডারের স্বাস্থ্য

> **কোনো REST এন্ডপয়েন্ট নেই।** প্রোভাইডারের স্বাস্থ্য-সংক্রান্ত ডেটা MCP টুল `observability_snapshot` অথবা ড্যাশবোর্ডের `/dashboard/providers` পৃষ্ঠার মাধ্যমে পাওয়া যায়।

### প্রোভাইডারের বিস্তারিত তথ্য

> **কোনো REST এন্ডপয়েন্ট নেই।** প্রতিটি প্রোভাইডারের বিস্তারিত তথ্য ড্যাশবোর্ডের `/dashboard/providers` পৃষ্ঠার মাধ্যমে পাওয়া যায়।

---

## প্রোভাইডার হেলথ অটোপাইলট

`providerHealthAutopilot.ts` মডিউলটি একটি **স্ব-নিরাময় ব্যবস্থা**, যা:

1. প্রোভাইডারের সমস্যা শনাক্ত করে (সার্কিট খোলা, কুলডাউন, লকআউট, কোটা সতর্কতা)
2. সেগুলো সমাধানের জন্য **প্রস্তাবিত পদক্ষেপ** তৈরি করে
3. ঐচ্ছিকভাবে কম-ঝুঁকির পদক্ষেপগুলো **স্বয়ংক্রিয়ভাবে কার্যকর** করে

### শনাক্ত করা সমস্যার ধরন

| সমস্যার ধরন                  | তীব্রতা | উদাহরণস্বরূপ অবস্থা                         |
| ---------------------------- | ------- | ------------------------------------------- |
| `provider_circuit_open`      | গুরুতর  | ৫টি ব্যর্থতার পর সার্কিট ব্রেকার খোলা       |
| `provider_circuit_half_open` | সতর্কতা | সার্কিটের পুনরুদ্ধার পরীক্ষা চলছে           |
| `connection_cooldown`        | সতর্কতা | 429-এর পর সংযোগ কুলডাউনে রয়েছে             |
| `stale_connection_error`     | সতর্কতা | সর্বশেষ রিফ্রেশ ৩০+ মিনিট আগে ব্যর্থ হয়েছে |
| `terminal_connection_error`  | গুরুতর  | OAuth প্রত্যাহার করা হয়েছে, কী অবৈধ        |
| `inactive_connection`        | তথ্য    | সেটিংসে সংযোগ নিষ্ক্রিয়                    |
| `model_lockout`              | সতর্কতা | নির্দিষ্ট মডেল কোয়ারেন্টাইনে রয়েছে        |
| `quota_monitor_warning`      | সতর্কতা | কোটার ব্যবহার ৮০%+                          |

### তৈরি করা পদক্ষেপের ধরন

| পদক্ষেপ                        | ঝুঁকি  | বিবরণ                                        |
| ------------------------------ | ------ | -------------------------------------------- |
| `clear_provider_breaker`       | মাঝারি | সার্কিট ব্রেকারকে বন্ধ অবস্থায় রিসেট করা    |
| `clear_connection_cooldown`    | কম     | একটি সংযোগ থেকে কুলডাউন সরানো                |
| `clear_stale_connection_error` | কম     | পুরোনো ত্রুটির ফ্ল্যাগ মুছে ফেলা             |
| `clear_model_lockout`          | কম     | কোয়ারেন্টাইনে থাকা মডেল পুনরায় সক্রিয় করা |
| `reactivate_connection`        | মাঝারি | নিষ্ক্রিয় করা সংযোগ পুনরায় সক্রিয় করা     |
| `deactivate_connection`        | উচ্চ   | সমস্যাযুক্ত সংযোগ নিষ্ক্রিয় করা             |

### API

> **কোনো REST এন্ডপয়েন্ট নেই।** অটোপাইলটের সমস্যাগুলো MCP টুল `observability_snapshot` বা ড্যাশবোর্ডের মাধ্যমে পাওয়া যায়। অটোপাইলট অভ্যন্তরীণভাবে চলে; এর আচরণ environment variable দিয়ে নয়, settings DB-এর মাধ্যমে (প্রতি-সংযোগের `autopilotMode` ফিল্ড) কনফিগার করা হয় — অটোপাইলট-মোড env var-এর জন্য `grep -rn` চালালে কোনো ফলাফল পাওয়া যায় না।

### অটোপাইলট মোড

অটোপাইলট ডিফল্টভাবে **ম্যানুয়াল মোডে** কাজ করে — এটি সমস্যা শনাক্ত করে এবং প্রস্তাবিত পদক্ষেপ তৈরি করে, কিন্তু সেগুলো স্বয়ংক্রিয়ভাবে প্রয়োগ করে না। ড্যাশবোর্ডের মাধ্যমে পদক্ষেপগুলো প্রয়োগ করা যায়।

---

## কম্বো হেলথ অটোপাইলট

`comboHealthAutopilot.ts` হলো প্রোভাইডার অটোপাইলটের **কম্বো-নির্দিষ্ট** সমতুল্য। এটি:

- অস্বাস্থ্যকর কম্বো শনাক্ত করে
- টার্গেট পুনর্বিন্যাসের পরামর্শ দেয়
- অকার্যকর টার্গেট নিষ্ক্রিয় করার প্রস্তাব দেয়
- N-বার ব্যর্থতার পর অচল টার্গেট স্বয়ংক্রিয়ভাবে সরিয়ে দেয়

### কম্বো সমস্যার উদাহরণ

```
কম্বো "always-on" (অগ্রাধিকার কৌশল)
├─ টার্গেট ১: openai/gpt-5 (সুস্থ)
├─ টার্গেট ২: anthropic/claude-opus-4-6 (⚠️ ১৪:০০ পর্যন্ত মডেল লকআউট)
└─ টার্গেট ৩: kiro/claude-sonnet-4-5 (সুস্থ)

প্রস্তাবিত পদক্ষেপ: পুনর্বিন্যাস — লকআউটের মেয়াদ শেষ না হওয়া পর্যন্ত kiro-কে anthropic-এর উপরে সরান
```

---

## কোটা মনিটর

`observability.ts` সাবস্ক্রিপশন প্রোভাইডারগুলোর (Claude Code, Codex, GitHub Copilot) জন্য **প্রতি-সেশন কোটা মনিটর** প্রকাশ করে:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // ০-১০০
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### স্ট্যাটাসের অর্থ

| স্ট্যাটাস   | কখন                           | UI পদক্ষেপ                            |
| ----------- | ----------------------------- | ------------------------------------- |
| `starting`  | প্রাথমিক পোল চলছে             | স্পিনার                               |
| `idle`      | সাম্প্রতিক কোনো কার্যকলাপ নেই | ড্যাশবোর্ড থেকে লুকানো                |
| `healthy`   | কোটার > ৫০% অবশিষ্ট           | সবুজ বিন্দু                           |
| `warning`   | কোটার < ৫০% অবশিষ্ট           | হলুদ সতর্কতা                          |
| `exhausted` | কোটা = ০%                     | লাল ব্লক, পরবর্তী প্রোভাইডারে রুট করা |
| `error`     | পোলিং ব্যর্থ হয়েছে           | লাল বিন্দু, শিগগিরই পুনরায় চেষ্টা    |

### API

> **কোনো REST এন্ডপয়েন্ট নেই।** কোটা মনিটরের ডেটা MCP টুল `observability_snapshot` বা ড্যাশবোর্ডের মাধ্যমে পাওয়া যায়।

---

## পর্যবেক্ষণযোগ্যতার স্ন্যাপশট

MCP টুল `observability_snapshot` AI এজেন্টগুলোর জন্য একটি **সম্পূর্ণ সিস্টেম স্ন্যাপশট** প্রদান করে:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* উপরে দেখুন */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

এজেন্টগুলো **রাউটিং সিদ্ধান্ত** নিতে এটি ব্যবহার করে — উদাহরণস্বরূপ, "যদি openai-এর সার্কিট খোলা থাকে, তাহলে প্রথমে anthropic-এ রাউট করুন"।

---

## টোকেনের স্বাস্থ্য পরীক্ষা

OAuth প্রদানকারীগুলোর (Claude Code, GitHub Copilot, Cursor) **পর্যায়ক্রমিক টোকেন রিফ্রেশ** প্রয়োজন। `src/lib/tokenHealthCheck.ts` একটি ব্যাকগ্রাউন্ড শিডিউলার চালায়:

- **সুইপ টিক**: প্রতি 60 সেকেন্ডে (`src/lib/tokenHealthCheck.ts:30`-এ `TICK_MS = 60 * 1000` অনুযায়ী সুইপ)
- **প্রতি-সংযোগ স্বাস্থ্য পরীক্ষার ব্যবধান**: ডিফল্ট 60 মিনিট (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); সেটিংস DB-এর মাধ্যমে কনফিগারযোগ্য
- **401-এ আগাম রিফ্রেশ**: প্রতি-সংযোগ ইন্টারসেপ্টর দ্বারা পরিচালিত

### টোকেনের স্বাস্থ্য অবস্থা

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### কনফিগারেশন

টোকেনের স্বাস্থ্য পরীক্ষার কনফিগারেশন অভ্যন্তরীণভাবে `tokenHealthCheck.ts` দ্বারা পরিচালিত হয়।

### টোকেনের স্বাস্থ্য

> **কোনো REST এন্ডপয়েন্ট নেই।** টোকেনের স্বাস্থ্য-সংক্রান্ত ডেটা ড্যাশবোর্ড বা MCP টুল `observability_snapshot`-এর মাধ্যমে পাওয়া যায়।

---

## সতর্কীকরণ

### বিল্ট-ইন চ্যানেল

OmniRoute **3টি সতর্কীকরণ চ্যানেল** সমর্থন করে:

| চ্যানেল            | সেটআপ            | ব্যবহারের ক্ষেত্র            |
| ------------------ | ---------------- | ---------------------------- |
| ড্যাশবোর্ড ব্যানার | সর্বদা চালু      | অ্যাপের অভ্যন্তরীণ বিজ্ঞপ্তি |
| ওয়েবহুক           | URL কনফিগার করুন | Slack, Discord, PagerDuty    |
| লগ                 | ডিফল্ট           | বহিরাগত লগ সমষ্টিকরণের জন্য  |

### ওয়েবহুক কনফিগারেশন

> **দ্রষ্টব্য:** ওয়েবহুক সতর্কীকরণের কনফিগারেশন ড্যাশবোর্ডের Settings পৃষ্ঠার মাধ্যমে পরিচালিত হয়। ওয়েবহুক URL, ইভেন্ট ফিল্টারিং এবং পেলোড কাস্টমাইজেশনের জন্য Settings UI দেখুন।

### সতর্কতার ধরন

| সতর্কতা                      | কখন                                      | ডিফল্ট তীব্রতা |
| ---------------------------- | ---------------------------------------- | -------------- |
| `provider_circuit_open`      | সার্কিট খুললে                            | গুরুতর         |
| `provider_circuit_half_open` | সার্কিট পুনরুদ্ধার পরীক্ষা করলে          | তথ্য           |
| `quota_warning`              | কোটা 80%+ হলে                            | সতর্কতা        |
| `quota_exhausted`            | কোটা 100% হলে                            | গুরুতর         |
| `token_refresh_failed`       | পরপর 3+ বার রিফ্রেশ ব্যর্থ হলে           | সতর্কতা        |
| `token_expired`              | টোকেনের মেয়াদ পেরিয়ে গেলে              | গুরুতর         |
| `combo_target_unhealthy`     | কম্বো টার্গেট 1 ঘণ্টা+ কুলডাউনে থাকলে    | সতর্কতা        |
| `db_integrity_warning`       | FK লঙ্ঘন > 0 হলে                         | সতর্কতা        |
| `heap_pressure`              | হিপ ব্যবহার থ্রেশহোল্ডের 80%-এর বেশি হলে | সতর্কতা        |

---

## কর্মক্ষমতার মেট্রিক্স

### ট্র্যাক করা মেট্রিক্স

| মেট্রিক                 | ধরন         | উৎস                             |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | কাউন্টার    | `services/usage.ts`             |
| `request_latency_ms`    | হিস্টোগ্রাম | `services/usage.ts`             |
| `tokens_consumed`       | কাউন্টার    | `services/usage.ts`             |
| `cost_usd`              | কাউন্টার    | `services/usage.ts`             |
| `provider_errors`       | কাউন্টার    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | কাউন্টার    | `services/resilience.ts`        |
| `cache_hits`            | কাউন্টার    | `services/signatureCache.ts`    |
| `compression_savings`   | হিস্টোগ্রাম | `services/compression/stats.ts` |
| `quota_used`            | গেজ         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | গেজ         | `observability.ts`              |

### ল্যাটেন্সি পার্সেন্টাইল (p50/p95/p99)

> **কোনো REST এন্ডপয়েন্ট নেই।** ল্যাটেন্সি পার্সেন্টাইলের ডেটা ড্যাশবোর্ডের `/dashboard/health` পৃষ্ঠায় পাওয়া যায়। Prometheus/OpenTelemetry এক্সপোর্ট v3.9-এর জন্য পরিকল্পিত।

### Prometheus / OpenTelemetry এক্সপোর্ট (পর্যায় ২)

v3.9-এর জন্য পরিকল্পিত: Prometheus, OpenTelemetry, Datadog-এ নেটিভ এক্সপোর্ট।

আপাতত, যেকোনো HTTP-ভিত্তিক মনিটরিং সিস্টেম (Prometheus blackbox exporter, Datadog HTTP check ইত্যাদি) দিয়ে `/api/monitoring/health` স্ক্র্যাপ করুন।

---

## অ্যালার্টিং রেসিপি

### Slack

> **দ্রষ্টব্য:** ওয়েবহুক অ্যালার্টিং ড্যাশবোর্ডের Settings পৃষ্ঠার মাধ্যমে কনফিগার করা হয়—কোনো নিবেদিত ওয়েবহুক env var নেই (`grep -rn` শূন্য ফলাফল দেয়)। ওয়েবহুক URL, ইভেন্ট ফিল্টারিং এবং পেলোড কাস্টমাইজেশনের জন্য Settings UI দেখুন।

### Discord

> ওয়েবহুক অ্যালার্টিং Slack-এর মতো একই Settings UI প্রবাহ ব্যবহার করে। Discord একই JSON পেলোড কাঠামো গ্রহণ করে।

### PagerDuty

> ওয়েবহুক অ্যালার্টিং একই Settings UI প্রবাহ ব্যবহার করে। PagerDuty Events API v2 রাউটিং কী-গুলো Settings UI-তে কনফিগার করা হয়।

### কাস্টম ওয়েবহুক (JSON)

> JSON বডিসহ POST গ্রহণ করে এমন যেকোনো HTTP এন্ডপয়েন্ট কাজ করবে। Settings UI-তে URL কনফিগার করুন।

---

## ড্যাশবোর্ড কনফিগারেশন

### স্বাস্থ্য ড্যাশবোর্ড কাস্টমাইজ করুন

একটি `~/.omniroute/dashboard.json` তৈরি করুন:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### কোনো প্রোভাইডারকে শীর্ষে পিন করুন

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## সমস্যা সমাধান

### "প্রোভাইডার সুস্থ দেখাচ্ছে, কিন্তু অনুরোধ ব্যর্থ হচ্ছে"

1. **অটোপাইলটের সমস্যাগুলো** পরীক্ষা করুন—কোনো মডেল হয়তো লক আউট করা হয়েছে
2. নির্দিষ্ট ত্রুটির শ্রেণির জন্য **সাম্প্রতিক ত্রুটিগুলো** দেখুন
3. প্রোভাইডার কার্ডে **সংযোগ পরীক্ষা** করে দেখুন
4. প্রোভাইডারটি **আপস্ট্রিমে রেট-লিমিটেড** কি না পরীক্ষা করুন (স্থানীয়ভাবে দৃশ্যমান নয়)

### "কোটা সুস্থ দেখাচ্ছে, কিন্তু আমি 429 দেখছি"

- 429-এর অর্থ হলো প্রোভাইডার বলছে আপনি আপনার কোটা ব্যবহার করে ফেলেছেন
- OmniRoute-এর কোটা ট্র্যাকিং **পুরোনো** হতে পারে—প্রোভাইডারের আপস্ট্রিম তথ্যই চূড়ান্ত সত্য
- অভ্যন্তরীণ কোটা মনিটরের মাধ্যমে কোটা ডেটা স্বয়ংক্রিয়ভাবে রিফ্রেশ হয়

### "কম্বো ব্যর্থ হচ্ছে, কিন্তু সব টার্গেট সুস্থ দেখাচ্ছে"

- টার্গেটের ক্রমসংক্রান্ত সমস্যার জন্য **কম্বো স্বাস্থ্য** ড্যাশবোর্ড পরীক্ষা করুন
- **ফলব্যাক ইভেন্টগুলো** দেখুন—কম্বোটি হয়তো খুব দ্রুত সব বিকল্প শেষ করে ফেলছে
- **কৌশলটি** আপনার ব্যবহারের ক্ষেত্রের সঙ্গে সামঞ্জস্যপূর্ণ কি না যাচাই করুন (অগ্রাধিকার বনাম রাউন্ড-রবিন বনাম স্বয়ংক্রিয়)

### "ডেটাবেসের স্বাস্থ্য পরীক্ষা ব্যর্থ হচ্ছে"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` চালান
- যদি "ok" হয়—এটি একটি ভুল সতর্কতা, স্বাস্থ্য পরীক্ষাটি অতিরিক্ত কঠোর হচ্ছে
- অন্য কিছু হলে—**OmniRoute বন্ধ করুন** এবং [দুর্যোগ পুনরুদ্ধার নির্দেশিকা](./DATABASE_GUIDE.md#disaster-recovery) অনুসরণ করুন

### "মেমরি হিপের চাপ গুরুতর"

```bash
# বর্তমান হিপ পরীক্ষা করুন
node -e "console.log(process.memoryUsage())"

# ম্যানুয়াল GC ট্রিগার করুন (যদি --expose-gc থাকে)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# সমসাময়িক অনুরোধের সংখ্যা কমান (ড্যাশবোর্ডের Settings পৃষ্ঠার মাধ্যমে সেট করুন, env var দিয়ে নয়)
# কোনো `MAX_CONCURRENT_REQUESTS` env var নেই—Settings → Concurrency-তে এটি কনফিগার করুন।
```

---

## আরও দেখুন

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ব্যবহার ও খরচ ট্র্যাকিং
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB স্কিমা + স্বাস্থ্য
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — প্রক্সির স্বাস্থ্য (পৃথক ক্যাশ)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — সিস্টেম আর্কিটেকচার
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — সার্কিট ব্রেকারের বিস্তারিত
- সোর্স: `src/lib/monitoring/` (4টি ফাইল, 2121 LOC)
