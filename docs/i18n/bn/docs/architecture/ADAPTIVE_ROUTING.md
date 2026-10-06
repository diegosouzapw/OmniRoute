# Adaptive Routing: Routing Events, Quality Feedback & Explainability (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

এই নথিতে OmniRoute-এ যোগ করা ফিডব্যাক-চালিত অভিযোজিত রাউটিং ভিত্তি বর্ণনা করা হয়েছে।
এটি ইচ্ছাকৃতভাবেই ছোট: এটি একটি টাইপযুক্ত রাউটিং-ফলাফল
চ্যানেল, বিদ্যমান auto-combo স্কোরারকে তথ্য জোগানো একটি অনলাইন গুণমান সংকেত, একটি
ঐচ্ছিক OpenTelemetry এক্সপোর্টার এবং একটি ব্যাখ্যাযোগ্যতা এন্ডপয়েন্ট প্রবর্তন করে। এটি বিদ্যমান
স্থিতিস্থাপকতা স্ট্যাককে (সার্কিট ব্রেকার, সংযোগ কুলডাউন,
মডেল লকআউট, স্বাস্থ্য ম্যাট্রিক্স, অটোপাইলট) প্রতিস্থাপন করে **না** — বরং এর পরিপূরক হিসেবে কাজ করে।

## 1. স্থাপত্যগত প্রেক্ষাপট

OmniRoute হলো একটি ডেটা প্লেন, যেখানে একটি **রিকোয়েস্ট হট পাথ** এবং একটি **নিয়ন্ত্রণ/বুদ্ধিমত্তা
প্লেন** রয়েছে। হট পাথকে দ্রুত, মেমরি-সাশ্রয়ী, অ্যাসিঙ্ক্রোনাস, স্থিতিস্থাপক এবং
পূর্বানুমানযোগ্য থাকতে হবে। মূল্যায়ন, গুণমান স্কোরিং, পরীক্ষা-নিরীক্ষা এবং ঐতিহাসিক বিশ্লেষণ
নিয়ন্ত্রণ প্লেনের অন্তর্ভুক্ত।

```
AI এজেন্ট / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   ডেটা প্লেন (দ্রুত, সিঙ্ক, ইন-মেমরি)
│  রাউটিং / ফেইলওভার │
│  স্বাস্থ্য / গার্ডরেল │
│  ক্যাশ / স্ট্রিমিং  │
└──────────┬──────────┘
           │ RoutingEvent (প্রেরণ করেই এগিয়ে যাওয়া, ~0.2µs)
           ▼
┌─────────────────────┐
│  ফিডব্যাক সিঙ্কসমূহ │   নিয়ন্ত্রণ প্লেন (অ্যাসিঙ্ক, সর্বোত্তম প্রচেষ্টা)
│  গুণমান ট্র্যাকার   │
│  OTel এক্সপোর্টার   │
│  ব্যাখ্যা স্টোর      │
└──────────┬──────────┘
           ▼  গুণমান স্কোর
      auto-combo স্কোরার
```

### যা আগে থেকেই ছিল (অডিট করা হয়েছে, নকল করা হয়নি)

| ধারণা                                    | বিদ্যমান বাস্তবায়ন                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| প্রাপ্যতা (আমরা কি ট্রাফিক পাঠাতে পারি?) | সার্কিট ব্রেকার (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-তে সংরক্ষিত), সংযোগ কুলডাউন, মডেল লকআউট |
| স্বাস্থ্য প্রতিবেদন                      | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                     |
| শ্যাডো ট্রাফিক                           | `open-sse/services/combo/shadowRouting.ts`                                                  |
| গার্ডরেল                                 | `src/lib/guardrails/` (প্রি/পোস্ট হুক)                                                      |
| এক্স্যাক্ট ক্যাশ                         | `src/lib/semanticCache.ts` (স্বাক্ষর-ভিত্তিক)                                               |
| মূল্যায়ক / মূল্যায়ন-চালিত রাউটিং       | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                        |
| কম্বো সিদ্ধান্তের ব্যাখ্যাযোগ্যতা        | `open-sse/services/combo/decisionTrace.ts`                                                  |
| ড্যাশবোর্ডের রিয়েল-টাইম ইভেন্ট          | `src/lib/events/eventBus.ts` (UI বিজ্ঞপ্তি চ্যানেল, `unknown` পেলোড, ১০০-এন্ট্রির ইতিহাস)   |

রাউটিং-ইভেন্ট স্তরটি `eventBus`-এর পুনরায় বাস্তবায়ন **নয়**: ওই বাসটি হলো
ড্যাশবোর্ডের রিয়েল-টাইম বিজ্ঞপ্তি চ্যানেল (টাইপযুক্ত _ইভেন্টের নাম_, অস্বচ্ছ
পেলোড, UI ভোক্তা)। `RoutingEvent` হলো একটি টাইপযুক্ত _ফলাফল_ স্ট্রাক্ট
(লেটেন্সি/টোকেন/খরচ/ফলাফল/সমাপ্তির-কারণ), যা নিয়ন্ত্রণ প্লেনের
ফিডব্যাক সিঙ্কগুলো (গুণমান ট্র্যাকার, OTel এক্সপোর্টার, ব্যাখ্যা স্টোর) ব্যবহার করে।

### যা অনুপস্থিত ছিল (এখানে যোগ করা হয়েছে)

1. একটি **টাইপযুক্ত রাউটিং-ফলাফল ইভেন্ট + সিঙ্ক অ্যাবস্ট্র্যাকশন** (`RoutingEvent` /
   `RoutingEventSink`)। `decisionTrace` কম্বো-পরিসরভুক্ত এবং কেবল ইন-মেমরি;
   `comboMetrics` হলো ক্রমবর্ধমান কাউন্টার; `call_logs` হলো অপরিশোধিত অ্যাসিঙ্ক স্থায়ী সংরক্ষণ।
   এগুলোর কোনোটিই এমন একটি টাইপযুক্ত, সিঙ্ক-ভিত্তিক ফলাফল চ্যানেল নয়, যেখানে একটি গুণমান ট্র্যাকার, একটি OTel
   এক্সপোর্টার অথবা একটি Future-AGI-ধাঁচের মূল্যায়ক সাবস্ক্রাইব করতে পারে।
2. আউটপুটের গুণমানের জন্য একটি **অনলাইন গুণমান সংকেত** (EWMA) — এর আগে স্কোরারটি
   কেবল স্থির টাস্ক উপযুক্ততা এবং অপ্ট-ইন মূল্যায়নের পাস-রেটের মাধ্যমে "গুণমান"-এর পরোক্ষ মান নির্ধারণ করত।
3. GenAI সেমান্টিক কনভেনশন ব্যবহারকারী একটি **ঐচ্ছিক, নির্ভরতামুক্ত OTel এক্সপোর্টার**।
4. প্রকৃত রাউটিং সিদ্ধান্তসমূহ + গুণমানের অবস্থা ফেরত দেওয়া একটি **ব্যাখ্যাযোগ্যতা এন্ডপয়েন্ট**।

## 2. রাউটিং ইভেন্টসমূহ (ফিডব্যাকের ভিত্তি)

ফাইলসমূহ: `open-sse/services/routing/events.ts`, `.../index.ts`

একটি `RoutingEvent` শুধু রাউটিং মেটাডেটা বহন করে:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // অনুমোদিত মানগুলোর ইউনিয়ন
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` হলো TypeScript-এ একটি `Send+Sync`-ধাঁচের ট্রেইট:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // অবশ্যই O(1) হতে হবে, কোনো সিঙ্ক I/O নয়
}
```

হট পাথ প্রতিটি সম্পন্ন অনুরোধের জন্য একবার `emitRoutingEvent(event)` কল করে
(স্ট্রিমিং-সমাপ্তির কলব্যাক, নন-স্ট্রিমিং সফলতার পাথ এবং `handleChatCore`-এর
বিকৃত-200 ব্যর্থতার পাথ)। নিবন্ধিত সিঙ্কগুলোতে ডিসপ্যাচ সিঙ্ক্রোনাস ফ্যান-আউটের
মাধ্যমে হয়, তবে প্রতিটি সিঙ্ক কেবল ইন-মেমরি স্টেট কিউতে যোগ/আপডেট করে। **হট
পাথে কোনো সিঙ্ক্রোনাস ডেটাবেস রাইট বা নেটওয়ার্ক I/O নেই।**

ডিফল্ট সিঙ্কসমূহ:

- `MemoryRoutingEventStore` — explain এন্ডপয়েন্টের জন্য সীমাবদ্ধ (500)
  রিং বাফার, যেখানে সর্বশেষটি প্রথমে থাকে।
- `QualityTracker` কনজিউমার — EWMA গুণমান অনুমান আপডেট করে।
- `OtlpHttpsEventSink` — ঐচ্ছিক; শুধু `OMNIROUTE_OTEL_ENDPOINT`
  (অথবা `OTEL_EXPORTER_OTLP_ENDPOINT`) সেট করা থাকলেই সক্রিয় হয়।

### পরিমাপকৃত ওভারহেড (সৎ তুলনা)

এই ওয়ার্কস্টেশনে `npm run bench:routing-events` (100k ইটারেশন; sub-µs অপারেশনগুলো
সমষ্টিগত µs/op হিসেবে পরিমাপ করা হয়েছে, কারণ প্রতি-অপারেশনের পার্সেন্টাইল
`performance.now()` টাইমারের রেজোলিউশনের নিচে):

| পরিস্থিতি                          | µs/op  | ops/s  |
| ---------------------------------- | ------ | ------ |
| বেসলাইন (শুধু স্কোরিং)             | ~0.045 | ~22 M  |
| বেসলাইন + RoutingEvent (2টি সিঙ্ক) | ~0.168 | ~5.9 M |
| বেসলাইন + ইভেন্ট + OTel এনকিউ      | ~0.163 | ~6.1 M |
| সমকালীন (8টি ইন্টারলিভড বার্স্ট)   | ~0.18  | —      |

বেসলাইন স্কোরিংয়ের তুলনায় ইভেন্ট-ডিসপ্যাচের ব্যবধান ~0.12 µs/request; OTel সিঙ্ক
শুধু এনকিউ করে (O(1) বাফার পুশ), ফলে পরিমাপযোগ্য কোনো অতিরিক্ত খরচ যোগ হয় না।
এই সংখ্যাগুলো মেশিন-নির্দিষ্ট ও আপেক্ষিক—এগুলো প্রোডাকশনের নিশ্চয়তা নয়। v1-এর
"~0.2 µs" সংখ্যাটি ছিল একটি সমষ্টিগত অনুমান; এই পদ্ধতিতে স্কোরিং বেসলাইনকে
ইভেন্ট-ডিসপ্যাচ খরচ থেকে আলাদা করা হয়েছে।

## 3. গুণমান সংকেত (ফিডব্যাক-চালিত প্রোভাইডার স্টেট)

ফাইলসমূহ: `open-sse/services/routing/quality.ts`

v2 **অপারেশনাল** গুণমানকে **সেমান্টিক** গুণমান থেকে আলাদা করে:

- **অপারেশনাল** — রাউটিং হট পাথ থেকে নির্ণীত (HTTP 4xx/5xx, সংযোগ
  ব্যর্থতা, 429s, বিকৃত রেসপন্স, স্ট্রিমে বিঘ্ন, `finish_reason=length`,
  শূন্য-আউটপুট সফলতা, লেটেন্সি/TTFT EWMA)। একটি 200-কে সেমান্টিক
  গুণমান হিসেবে বিবেচনা করা হয় না।
- **সেমান্টিক** — জেনারেট করা আউটপুটের প্রকৃত মান। এটি শুধু কোনো
  ইভ্যালুয়েটর `setSemanticQuality()`-এর মাধ্যমে তৈরি করতে পারে। কোনো ইভ্যালুয়েটর
  মান না দেওয়া পর্যন্ত এটি `null` থাকে এবং কখনোই অপারেশনাল স্কোরে মিশে যায় না।

প্রতি-(provider, model) স্টেট (EWMA + সীমাবদ্ধ কাউন্টার):

- `successEwma` — ফলাফলের সফলতার EWMA (α=0.2)।
- `latencyEwma` / `ttftEwma` — লেটেন্সির EWMA (α=0.1)।
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`।
- `recencyMs` — মডেলটি কত সম্প্রতি সর্বশেষ পর্যবেক্ষিত হয়েছে।

### কনফিডেন্স / স্যাম্পল-সচেতনতা

`confidence = clamp01(samples / 50)`, এবং স্কোরারে ফেরত দেওয়া স্কোরটিকে
নিরপেক্ষ মধ্যবিন্দুর দিকে ব্লেন্ড করা হয়:

```
score = 0.5 + confidence * (operational - 0.5)
```

পরিণামসমূহ (টেস্টের মাধ্যমে যাচাইকৃত):

- একটি কোল্ড প্রোভাইডার (0টি স্যাম্পল) **0.5** স্কোর করে—তাকে অন্যায্যভাবে
  দণ্ডিত করা হয় না, তবে হাজার হাজার নির্ভরযোগ্য পর্যবেক্ষণ থাকা কোনো
  প্রোভাইডারকে ছাড়িয়ে যেতেও পারে না।
- 7টি সৌভাগ্যজনক সফলতা থাকা কোনো প্রোভাইডারকে 0.5-এর দিকে টেনে আনা হয়
  (আশাবাদী ইনিশিয়ালাইজেশনের কারণে সেটি কখনোই আধিপত্য করে না)।
- 50+ স্যাম্পল থাকা কোনো প্রোভাইডার তার প্রকৃত অপারেশনাল স্কোরে কনভার্জ করে।
- অবনতি ও পুনরুদ্ধার ধীরে ধীরে ঘটে (EWMA), এবং একটি বিচ্ছিন্ন ব্যর্থতা কোনো
  সুস্থ প্রোভাইডারকে ধ্বংস করে না।

`ProviderQuality` `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` প্রকাশ করে।

এটি `quality` স্কোরিং ফ্যাক্টর হিসেবে auto-combo স্কোরারে সরবরাহ করা হয়:

- `open-sse/services/autoCombo/scoring.ts`-এ `ScoringFactors.quality` /
  `ScoringWeights.quality`।
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03। যোগফল 1.0-ই থাকে।
- `buildAutoCandidates` ট্র্যাকার থেকে `candidate.quality` পূরণ করে; ডেটাবিহীন
  ক্যান্ডিডেটগুলো ডিফল্টভাবে নিরপেক্ষ **0.5** পায় (একটি কোল্ড ক্যান্ডিডেটকে
  বুস্টও করা হয় না, পেনালাইজও করা হয় না)।

ক্লোজড লুপ:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo গুণমান ফ্যাক্টর
      ↑                                                    │
      └────── অনুরোধের ফলাফল (handleChatCore) ←────────────┘
```

### হার্ড এক্সক্লুশন বনাম সফট পেনাল্টি

গুণমান সংকেতটি শুধুই একটি **সফট অ্যাডাপ্টিভ প্রেফারেন্স**। হার্ড এক্সক্লুশনের
দায়িত্ব বিদ্যমান রেজিলিয়েন্স স্ট্যাকের কাছেই থাকে: circuit breaker OPEN,
কোটা নিঃশেষ, অথ ব্যর্থতা, মডেল লকআউট—এগুলোর কোনোটিই গুণমান স্কোর দ্বারা
প্রভাবিত হয় না। কোনো প্রোভাইডারের গুণমান স্কোর সাময়িকভাবে কমে গেলে তাকে
কম অগ্রাধিকার দেওয়া হয়, কখনোই হার্ড-ডিজেবল করা হয় না।

## 3b. ক্যানোনিক্যাল স্ট্রিম টাইমিং (TTFT / ITL)

ফাইল: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` হলো স্ট্রিমিং পাথের একক ইনস্ট্রুমেন্টেশন সংযোগবিন্দু,
যা `createSSEStream`-এর সঙ্গে সংযুক্ত (open-sse/utils/stream.ts):

- `markByte()` — প্রথম আপস্ট্রিম চাঙ্ক গৃহীত হয়েছে।
- `markForward()` — ক্লায়েন্টের কাছে প্রথম চাঙ্ক ফরওয়ার্ড করা হয়েছে (TTFT-এর জন্য ব্যবহৃত)।
- `markInterrupted()` — স্বাভাবিকভাবে শেষ হওয়ার আগে স্ট্রিম টাইমআউট/অ্যাবর্ট/ত্রুটি।
- `ttft()` = প্রথম ফরওয়ার্ড করা SSE চাঙ্কের ল্যাটেন্সি। **এটি টোকেন-স্তরের TTFT নয়** —
  একটি SSE চাঙ্কে শূন্য/এক/একাধিক টোকেন থাকতে পারে। এটি সুনির্দিষ্টভাবে নথিভুক্ত।
- `avgItlMs()` = চাঙ্কগুলোর মধ্যবর্তী ব্যবধানের গড় (ITL-এর জন্য একটি চাঙ্ক-ল্যাটেন্সি প্রক্সি)।

TTFT/ITL/interrupted `RoutingEvent`-এ (`ttftMs`, `itlMs`) প্রবাহিত হয় এবং
OTel sink দ্বারা GenAI/OmniRoute span attributes হিসেবে এক্সপোর্ট করা হয়।

## 4. OpenTelemetry / GenAI পর্যবেক্ষণযোগ্যতা

ফাইল: `open-sse/services/routing/otel.ts`

- নির্ভরতামুক্ত OTLP/HTTP JSON এক্সপোর্টার (গ্লোবাল `fetch` ব্যবহার করে, কোনো
  `@opentelemetry/*` SDK নয়)।
- Span-গুলো GenAI semantic conventions (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) এবং OmniRoute routing
  attributes (ফলাফল, স্ট্যাটাস, ttft, পুনঃচেষ্টা, ফলব্যাক) অনুসরণ করে।
- `record()` কেবল একটি সীমাবদ্ধ বাফারে এনকিউ করে (O(1)); একটি ব্যাকগ্রাউন্ড টাইমার
  অ্যাসিঙ্ক্রোনাসভাবে `POST {endpoint}/v1/traces`-এর মাধ্যমে ফ্লাশ করে। অতিরিক্ত লোডের সময়
  সবচেয়ে পুরোনো ইভেন্টগুলো বাদ দেওয়া হয় (`dropped` কাউন্টার) — ডেটা
  প্লেনে কখনো ব্যাকপ্রেশার প্রয়োগ করা হয় না।
- **কনফিগার না করা থাকলে নিষ্ক্রিয়।** `OMNIROUTE_OTEL_ENDPOINT` (অথবা
  `OTEL_EXPORTER_OTLP_ENDPOINT`) সেট করতে হবে; অন্যথায় sink নিবন্ধিত হয় না
  এবং কোনো OTel কোড চলে না।

## 5. ব্যাখ্যাযোগ্যতা

- `GET /v1/explain/routing` সাম্প্রতিক `RoutingEvent`-গুলো (প্রকৃত
  সিদ্ধান্ত, সর্বশেষটি আগে) এবং প্রতি-provider/model quality snapshot ফেরত দেয়।
- Auth `/v1/combos`-এর অনুরূপ (Bearer API key অথবা dashboard session;
  `REQUIRE_API_KEY=false`-সহ একক-ব্যবহারকারীর লোকাল ডিপ্লয়মেন্টে অজ্ঞাতনামা অ্যাক্সেস)।
- প্রতি-আহ্বানের combo-স্তরের trace বিদ্যমান
  `decisionTrace.ts`-এর মাধ্যমে উপলভ্য থাকে (header `X-OmniRoute-Combo-Trace`)।
- নিরাপত্তা: ইভেন্টগুলোতে শুধু routing metadata থাকে, কখনো prompts/bodies/credentials নয়।

## 6. ইভ্যালুয়েশন-প্লেন ইন্টিগ্রেশন (Future AGI প্রস্তুতি)

OmniRoute Future AGI-কে (অথবা যেকোনো evaluator-কে) একটি **সম্ভাব্য
বুদ্ধিমত্তা/ইভ্যালুয়েশন ব্যাকএন্ড হিসেবে বিবেচনা করে, নির্ভরতা হিসেবে নয়**। সংযোগবিন্দুগুলো:

- একটি `RoutingEventSink` অ্যাসিঙ্ক্রোনাসভাবে কোনো evaluator-এর কাছে ইভেন্ট ফরওয়ার্ড করতে পারে।
- `MemoryRoutingEventStore` + quality snapshot কোনো evaluator-কে কাঁচা
  decision stream দেয়।
- ভবিষ্যতের একটি `Evaluator` (deterministic, local judge, HTTP, WASM)
  events/traces গ্রহণ করবে এবং একটি `QualityScore` ফেরত দেবে, যা একই
  `getQualityScore`/quality-factor পাথে প্রবাহিত হবে।
- বিদ্যমান eval-চালিত routing (`open-sse/services/evalRouting.ts`) সক্রিয় থাকলে
  `eval_runs` pass-rate অনুযায়ী combo target-গুলো ইতিমধ্যেই পুনর্বিন্যাস করে।

রিকোয়েস্ট পাথে কোনো evaluation সিঙ্ক্রোনাসভাবে চলে না, এবং evaluator অনুপস্থিত থাকলেও
gateway সম্পূর্ণভাবে কার্যকর থাকে।

## 7. চূড়ান্ত আর্কিটেকচারাল পর্যালোচনা

1. **সিঙ্ক্রোনাস হট পাথে কী অবশিষ্ট থাকে?** Routing/scoring, guardrail
   pre-check, cache lookup এবং in-memory sink-গুলোতে একটি `emitRoutingEvent`
   fan-out (বেসলাইন scoring-এর তুলনায় ~0.12 µs)।
2. **কী কী অ্যাসিঙ্ক্রোনাস প্রসেসিংয়ে স্থানান্তরিত হয়েছে?** OTel export (timer + fetch),
   `call_logs`/usage persistence, semantic-cache write; quality in-memory
   এবং O(1) (async-এর প্রয়োজন নেই)।
3. **একটি routing outcome কীভাবে feedback-এ পরিণত হয়?** `handleChatCore` একটি
   `RoutingEvent` নির্গত করে → `QualityTracker` EWMA state আপডেট করে → `getQualityScore`
   auto-combo `quality` factor-এ মান সরবরাহ করে।
4. **Quality কীভাবে ভবিষ্যতের routing-কে প্রভাবিত করে?** নিম্ন quality score
   `scoreAutoTargets`-এ সেই provider/model-এর weighted score কমিয়ে দেয়, ফলে অবনমিত
   model-গুলো ধীরে ধীরে কম অগ্রাধিকার পায় এবং তাদের EWMA উন্নত হওয়ার সঙ্গে সঙ্গে পুনরুদ্ধার করে।
5. **Future AGI কীভাবে নির্ভরতায় পরিণত না হয়ে ইন্টিগ্রেট করতে পারে?**
   `RoutingEventSink` interface / ভবিষ্যতের একটি `Evaluator` adapter-এর মাধ্যমে —
   কোনো hardcoded dependency নেই।
6. **Evaluator অনুপলভ্য হলে কী ঘটে?** Routing প্রভাবিত হয় না;
   পর্যবেক্ষিত signal-বিহীন model-গুলোর জন্য quality নিরপেক্ষ মানে (1.0) ফিরে যায়।
7. **Telemetry অনুপলভ্য হলে কী ঘটে?** OTel sink নিবন্ধিতই হয় না;
   routing layer-এর বাকি অংশ অপরিবর্তিতভাবে চলে।
8. **অতিরিক্ত লোডের সময় কী ঘটে?** OTel buffer সবচেয়ে পুরোনো ইভেন্টগুলো বাদ দেয়; quality
   এবং ring buffer নকশাগতভাবেই সীমাবদ্ধ; কোনো backpressure নেই।
9. **অবনতির পরে provider state কীভাবে পুনরুদ্ধার হয়?** সাফল্য জমা হওয়ার সঙ্গে সঙ্গে
   EWMA আবার অভিসারী হয়; warmup নতুন model-গুলোকে নিরপেক্ষ রাখে; circuit breaker
   স্বতন্ত্রভাবে HALF_OPEN probe-এর মাধ্যমে পুনরুদ্ধার করে।
10. **প্রস্তাবিত কোন feature-গুলো ইচ্ছাকৃতভাবে বাস্তবায়ন করা হয়নি এবং কেন?**
    - Shadow traffic / experiment — ইতিমধ্যেই বাস্তবায়িত
      (`combo/shadowRouting.ts`); পুনরায় তৈরি করা হয়নি।
    - Guardrail — ইতিমধ্যেই বাস্তবায়িত (`src/lib/guardrails/`); নকল করা হয়নি।
    - Semantic cache — ইতিমধ্যেই বাস্তবায়িত (`src/lib/semanticCache.ts`);
      নকল করা হয়নি।
    - একটি পূর্ণাঙ্গ experiment-management platform, dataset tooling, prompt-optimization
      platform, vector DB অথবা বাধ্যতামূলক external OTel infrastructure — একটি
      হালকা data plane-এর পরিধির বাইরে।
    - একটি Rust `RoutingEvent` struct — data plane হলো TypeScript; TS type-টি
      অভিযোজিত সমতুল্য।

## 8. কনফিগারেশন রেফারেন্স

| ভেরিয়েবল                     | ডিফল্ট      | প্রভাব                                                                               |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | সেট করা নেই | সেট করা হলে, OTLP/HTTP ট্রেস এক্সপোর্টার সক্রিয় করে (যেমন `http://collector:4318`)। |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | সেট করা নেই | OTLP এন্ডপয়েন্টের ফলব্যাক অ্যালিয়াস।                                               |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` রিসোর্স অ্যাট্রিবিউট।                                                 |

## 9. পরীক্ষা

- `tests/unit/routing-events.test.ts` — ইভেন্ট নরমালাইজেশন, স্ট্যাটাস
  শ্রেণিবিন্যাস, সীমাবদ্ধ রিং বাফার, সিঙ্ক ফ্যান-আউট + আইসোলেশন।
- `tests/unit/routing-quality.test.ts` — EWMA ওয়ার্মআপ, ব্যর্থতা/সফলতা থেকে পুনরুদ্ধার,
  অ্যানোমালি পেনাল্টি, 429-এর ক্ষণস্থায়ী হ্যান্ডলিং, স্ন্যাপশট, রিসেট।
- `tests/unit/routing-scoring-quality.test.ts` — ওয়েটের অখণ্ডতা, নিরপেক্ষ
  ডিফল্ট, কোয়ালিটি ফ্যাক্টর র্যাঙ্কিং।
- `tests/unit/routing-otel.test.ts` — সক্রিয়করণ গেটিং, GenAI স্প্যান পেলোড, অ্যাসিঙ্ক
  ফ্লাশ, ওভারলোডে ড্রপ।
- `tests/unit/routing-events-concurrency.test.ts` — হাজার হাজার ইভেন্ট, রিং
  বাফারের সীমাবদ্ধতা, ব্যতিক্রম-নিক্ষেপকারী সিঙ্কের আইসোলেশন, ইন্টারলিভড অ্যাসিঙ্ক বার্স্ট,
  ইনসার্ট চলাকালীন রিসেট।
- `tests/unit/routing-adaptive-e2e.test.ts` — প্রকৃত
  `scoreAutoTargets` স্কোরারের মাধ্যমে নির্ধারিত এন্ড-টু-এন্ড লুপ: সুস্থ → অবনতি → পুনরুদ্ধার → সাময়িক বিঘ্ন, পাশাপাশি
  কোল্ড-স্টার্ট এবং সৌভাগ্যবান-কোল্ড-প্রোভাইডার পরিস্থিতি।
- `tests/unit/stream-timing.test.ts` — TTFT (প্রথম-ফরোয়ার্ড-করা-চাঙ্ক), ITL,
  প্রথম-বাইট বনাম প্রথম-ফরোয়ার্ড, বাধা, ত্রুটিপূর্ণ/খালি চাঙ্কের নিরাপত্তা।

## 10. পূর্ব-বিদ্যমান সমস্যার অবস্থা (Phase 18)

| সমস্যা                                               | অবস্থা                           | নোট                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniglyph` এক্সপোর্টের অমিল                         | **সমাধান করা হয়েছে (পরিবেশগত)** | `node_modules`, `package-lock.json`-এর সঙ্গে সিঙ্কে ছিল না (ইনস্টল করা ছিল 1.3.1, কিন্তু লক করা ছিল 1.4.0)। `npm install omniglyph@1.4.0` চালানোর ফলে লক করা সংস্করণটি পুনরুদ্ধার হয়েছে; টাইপ ত্রুটি কমে 0 হয়েছে। ম্যানিফেস্ট অপরিবর্তিত রয়েছে।                       |
| অচল `getKnownContextOverflow` পরীক্ষা                | **জ্ঞাত — সমাধান করা হয়নি**     | `combo-context-overflow-compression-probe.test.ts` এমন একটি ফাংশন ইমপোর্ট করে, যা `open-sse/services/combo.ts`-এ আর নেই (শুধু মন্তব্যে এটির উল্লেখ রয়েছে)। এটি ঠিক করতে ওই পরীক্ষাগুলো পুনরায় বাস্তবায়ন বা নতুন করে লিখতে হবে — যা সম্পর্কহীন আর্কিটেকচারাল পরিবর্তন। |
| `combo-runtime-unit-concurrency.test.ts` DB আইসোলেশন | **জ্ঞাত — সমাধান করা হয়নি**     | সরাসরি চালানো হলে টেস্ট-হারনেসের SQLite-আইসোলেশন অ্যাসারশন ব্যর্থ হয়; বেস ব্রাঞ্চেও একইভাবে ব্যর্থ হয়।                                                                                                                                                                 |
| i18n `llm.txt` বিচ্যুতি                              | **জ্ঞাত — সমাধান করা হয়নি**     | `docs/i18n/*/llm.txt` রুট থেকে ভিন্ন; এটি পূর্ব-বিদ্যমান এবং ডকস-সিঙ্ক প্রি-কমিট গেটকে ব্লক করে।                                                                                                                                                                         |

পরিবেশগত এবং কোড-সংক্রান্ত সমস্যাগুলো আলাদা রাখা হয়েছে; পরিবর্তিত টেস্ট ফিল্টারের
আড়ালে কোনো সম্পর্কহীন ব্যর্থতা লুকানো হয়নি।
