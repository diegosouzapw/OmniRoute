# Subscription-first routing (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> দুটি নতুন `auto/*` আইডি — `auto/subscription` এবং `auto/thrifty`। উভয়ই অনুরোধের মাধ্যমে
> অপ্ট-ইন করতে হয়: কোনো কলার নাম ধরে আইডিটি না চাইলে কিছুই এগুলোর মধ্য দিয়ে রাউট হয় না, এবং
> বিদ্যমান কোনো পুল, কৌশল বা ডিফল্ট পরিবর্তিত হয় না।

## এটি কেন রয়েছে

OmniRoute ইতিমধ্যেই খরচ-সংক্রান্ত দুটি প্রশ্নের উত্তর দেয়, কিন্তু অপারেটররা সাধারণত যেটি জিজ্ঞাসা করেন, সেগুলোর কোনোটিই সেটি নয়।

| বিদ্যমান ব্যবস্থা                                        | যে প্রশ্নের উত্তর দেয়                                   |
| -------------------------------------------------------- | -------------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "এই মডেলটি কি ক্যাটালগে বিনামূল্যের হিসেবে তালিকাভুক্ত?" |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "এই সংযোগটি কি কখনো আমার কাছ থেকে বিল নিতে পারে?"        |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "এই সংযোগটি কি তার সীমার কাছাকাছি?"                      |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ব্যয় সীমাবদ্ধ করো, সবচেয়ে সস্তা বিকল্পে নামিয়ে দাও"  |

শুধু-বিনামূল্যের প্রতিটি ব্যবস্থা **ব্যর্থ হলে বন্ধ থাকে** — নিঃশেষিত বিনামূল্যের পুল মানে একটি খালি পুল,
কখনোই কোনো পেইড বিকল্পে এক ধাপ ওপরে ওঠা নয় — এবং প্রতিটি পেইড-পার্শ্বের ব্যবস্থা টিয়ার-নিরপেক্ষ। কোনোটিই এর উত্তর দেয় না:

> "আমি ইতিমধ্যে যে কোটার জন্য অর্থ দিই, সেটি ব্যবহার করো। সেটি শেষ হয়ে গেলে হয় থামো, নয়তো সবচেয়ে
> সস্তা পেইড বিকল্পগুলোর মধ্য দিয়ে একবারে এক ধাপ করে ওপরে ওঠো — এবং সেটি রিসেট হওয়ার সঙ্গে সঙ্গেই ফিরে এসো।"

## বিলিং সংযোগের বৈশিষ্ট্য, মডেলের নয়

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)`-এর ভিত্তিতে নির্ধারণ করে
এবং ক্যাটালগের মূল্য থেকে `free | cheap | premium` ফেরত দেয়। কিন্তু একটি অনুরোধের জন্য অতিরিক্ত অর্থ
খরচ হবে কি না, তা নির্ভর করে **কোন সংযোগটি সেটি পরিবেশন করছে** তার ওপর: একই মডেল একটি Claude Code
OAuth সংযোগের মাধ্যমে প্ল্যানের অন্তর্ভুক্ত, আর API-key সংযোগের মাধ্যমে প্রতি টোকেন হিসেবে বিল করা হয়।

`provider_connections.auth_type` কোনো দিক থেকেই নিরাপদ প্রক্সি নয় — মিটারভিত্তিক OAuth
সংযোগ রয়েছে, এবং প্ল্যানের অন্তর্ভুক্ত API-key সংযোগও রয়েছে (একটি Copilot সিট টোকেন মিটারভিত্তিক
API key নয়)। তাই বিলিং শ্রেণি আসে একটি **বাছাইকৃত ক্যাটালগ**,
`open-sse/config/connectionBillingCatalog.ts` থেকে, যা প্রতিটি প্রোভাইডারের প্রকাশিত শর্তাবলি অনুযায়ী
হাতে নির্ধারিত — বিনামূল্যের মডেলগুলোর জন্য `FreeModelBudget.hardStopGuaranteed` ইতিমধ্যেই যে প্যাটার্ন প্রতিষ্ঠা করেছে, এটিও সেই একই প্যাটার্ন।

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

সমাধানের ক্রম (`autoCombo/connectionBilling.ts`): কৃত্রিম no-auth সেন্টিনেল →
`keyless`; provider **এবং** `authType` উভয়ের সঙ্গে মেলা কোনো ক্যাটালগ এন্ট্রি; একটি provider-ব্যাপী এন্ট্রি;
অন্যথায় `unknown`। **বাছাই না-করা মানে বিনামূল্যে নয়** — সর্বত্র `unknown`-কে `metered` হিসেবে
ব্যবহার করা হয়, ফলে আগামীকাল যোগ করা কোনো provider subscription ধাপের বাইরে থেকেই শুরু করবে এবং
ইচ্ছাকৃতভাবে তাকে বাছাইকৃত তালিকায় যোগ করতে হবে।

## ধাপের মডেল

এস্কেলেশনের ক্রমে পাঁচটি ধাপ। এগুলোর পার্থক্য শুধু মূল্যে নয় — প্রতিটির **নিজস্ব**
নিঃশেষ হওয়ার সংকেত রয়েছে, যে কারণে এটি নিছক একটি সর্ট নয়।

| #   | ধাপ            | সদস্যতা                                            | যখন নিঃশেষিত                   |
| --- | -------------- | -------------------------------------------------- | ------------------------------ |
| 0   | `subscription` | বাছাইকৃত `billing: "subscription"`                 | কোটা উইন্ডো কাটঅফে বা তার নিচে |
| 1   | `keyless`      | কৃত্রিম no-auth পাথ                                | সংযোগ কুলডাউন / ব্রেকার        |
| 2   | `free`         | মিটারভিত্তিক সংযোগ, `classifyTier() === "free"`    | বিনামূল্যের বরাদ্দ নিঃশেষিত    |
| 3   | `cheap`        | মিটারভিত্তিক সংযোগ, `classifyTier() === "cheap"`   | প্রতি-ধাপের বাজেট ব্যবহৃত      |
| 4   | `premium`      | মিটারভিত্তিক সংযোগ, `classifyTier() === "premium"` | প্রতি-ধাপের বাজেট ব্যবহৃত      |

ধাপ 0-2 **কোটা** অনুযায়ী নিঃশেষিত হয়, যা পর্যবেক্ষণযোগ্য এবং ইতিমধ্যেই ট্র্যাক করা হয়। ধাপ 3-4-এর কোনো
কোটা নেই — একটি পেইড সংযোগ অনির্দিষ্টকাল পরিবেশন করে — তাই এগুলোর নিঃশেষ হওয়ার একমাত্র যুক্তিসংগত
সংকেত হলো প্রতি-ধাপের **বাজেট**। এটি ছাড়া, "cheap নিঃশেষ হলে এস্কেলেট করো" কার্যকর করার কোনো ট্রিগার নেই।

## `auto/subscription` — ব্যর্থ হলে বন্ধ

পুল = শুধুমাত্র rung 0, এবং কেবল সেইসব সংযোগে সীমাবদ্ধ যাদের overage একটি নথিভুক্ত `hard-stop`, ও যেগুলোর প্রত্যেকটির quota headroom আছে বলে লাইভভাবে যাচাই করা হয়েছে। অস্পষ্ট সবকিছুই বাদ দেওয়া হয়: কোনো অপরিশোধিত provider, যাচাই-অযোগ্য quota reading, অচল reading, অথবা এমন overage যার ব্যবহার paid হিসেবে meter করা হয়।

একটি খালি পুলই **উদ্দেশ্যপ্রণোদিত** উত্তর, কোনো ত্রুটি নয় — caller-এর বিদ্যমান empty-pool path এটিকে একটি স্পষ্ট error-এ পরিণত করে, নীরব ও billable fallback-এ নয়। এই id-এর সম্পূর্ণ প্রতিশ্রুতি এটিই।

`keyless` ইচ্ছাকৃতভাবেই যোগ্য **নয়**: এই grouping-এর অর্থ হলো "আমি যে plan-এর জন্য অর্থ দিই", তাই কোনো no-auth backend এতে অন্তর্ভুক্ত নয়। তার জন্য `auto/thrifty` (অথবা `auto/best-free`) ব্যবহার করুন।

### সংযোগের নিরাপত্তা

একটি candidate সবসময় একটি সংযোগের সঙ্গে আবদ্ধ থাকে না — একটি logical candidate একটি `allowedConnectionIds` allowlist বহন করে, এবং বাস্তবে ব্যবহৃত account-টি পরে dispatch-এর সময় `open-sse/services/combo/autoStrategy.ts` দ্বারা বেছে নেওয়া হয়। তাই উভয় grouping-ই **প্রতিটি সংযোগ আলাদাভাবে** যাচাই করে এবং `allowedConnectionIds`-কে পুনর্লিখন করে কেবল টিকে থাকা subset-এ সীমাবদ্ধ করে — কখনোই সম্পূর্ণ মূল list-এ নয়, কখনোই ইচ্ছামতো বেছে নেওয়া কোনো এক member-এ নয়। যেহেতু `autoStrategy.ts` ইতোমধ্যেই ওই array-কে একটি কঠোর allowlist হিসেবে প্রয়োগ করে, তাই এখানে এটি পুনর্লিখন করলে নির্মাণগতভাবেই "যাচাইকৃত" এবং "বাস্তবে ব্যবহৃত" একই set হয়। এটি [STRICT_ZERO_COST](./STRICT_ZERO_COST.md)-এর একই invariant এবং একই যুক্তি।

## `auto/thrifty` — একবারে এক rung করে উপরে ওঠা

পুল = সব rung, rung index অনুযায়ী সাজানো, যেখানে নিঃশেষিত candidate-গুলোকে gate করে বাদ দেওয়া হয়। `auto` engine টিকে থাকা পুলের **মধ্যেই** scoring চালিয়ে যায়: ladder নির্ধারণ করে কোন rung-গুলো বিবেচনায় থাকবে, আর scoring নির্ধারণ করে সেগুলোর মধ্যে কোন candidate জিতবে। একটি rung-এর মধ্যে ordering স্থিতিশীল থাকে, তাই এই overlay কখনো scorer-এর নিজস্ব ranking পুনর্বিন্যস্ত করে না।

এটি একটি ordering + gating overlay, নতুন dispatcher **নয়**: `combo.ts`-এর speculative loop ইতোমধ্যেই ক্রমানুসারে target-গুলো অতিক্রম করে এবং ব্যর্থ হলে পরেরটিতে যায়, তাই preflight ধরতে না-পারা কোনো runtime exhaustion হলেও একই request-এর মধ্যে পরবর্তী rung-এ escalation ঘটে।

যেখানে `auto/subscription` ব্যর্থ হলে **বন্ধ** থাকে, সেখানে `auto/thrifty` ব্যর্থ হলে **খোলা** থাকে: ব্যবহারযোগ্য quota reading না থাকলেও plan-এর অন্তর্ভুক্ত কোনো সংযোগকে প্রথমে চেষ্টা করা হয়। সেটি চেষ্টা করতে কোনো খরচ হয় না, এবং সেটি সত্যিই নিঃশেষিত হয়ে থাকলে fall-through যাই হোক পরবর্তী rung-এ পৌঁছাবে — অন্যদিকে missing telemetry-এর কারণে চেষ্টা করতে অস্বীকার করলে request-টি paid rung-এ পাঠানো হবে, ঠিক যে ফলাফল এড়ানোর জন্য grouping-টির অস্তিত্ব।

## reset-এর পরে plan-এ ফিরে আসা

routing rung 0-এ ফেরার আগে তিনটি স্বাধীন জিনিসের মেয়াদ শেষ হতে হবে। শুধু একটি ঠিক করলে plan পুনরায় পূর্ণ হওয়ার অনেক পরেও ladder paid rung-এ আটকে থাকে।

1. **quota-state cache** — `freeAccessQuota.ts` প্রতিটি `(provider, connection)`-এর জন্য 180s TTL সহ cache করে। কোনো cached entry-র নিজস্ব `resetAt` ইতোমধ্যেই পেরিয়ে গেলে সেটি এমন একটি window বর্ণনা করে যার আর অস্তিত্ব নেই, তাই এখন বয়স **নির্বিশেষে** এটিকে stale হিসেবে গণ্য করে refresh বাধ্যতামূলক করা হয়। এটি না থাকলে মধ্যরাতে পুনরায় পূর্ণ হওয়া কোনো plan TTL-এর মেয়াদ ঘটনাক্রমে শেষ না হওয়া পর্যন্ত exhausted হিসেবেই দেখা যেতে থাকে।
2. **ladder-এর নিজস্ব state** — নকশাগতভাবেই এমন কোনো state নেই। প্রতিবার পুল তৈরির সময় live quota state থেকে rung eligibility পুনরায় গণনা করা হয়; reset-এর পরও টিকে থেকে routing-কে wedge করতে পারে এমন persisted "currently on rung 3" record নেই।
3. **connection cooldown** — exhaustion-সৃষ্টিকারী 429 exponential backoff থেকে `rateLimitedUntil` সেট করে, যা কোনো plan connection-এর ক্ষেত্রে প্রকৃত reset-কে ছাড়িয়ে যেতে পারে। `clampCooldownToReset()` (`subscriptionLadder.ts`) cooldown-কে upstream-এর নিজস্ব reset instant পর্যন্ত সংকুচিত করে এবং কখনোই সেটিকে বাড়াতে পারে না। **এটি implement ও test করা হয়েছে, কিন্তু এখনো wire করা হয়নি**: কোনো cooldown লেখার _আগেই_ `src/sse/services/auth.ts`-এ quota cache invalidate করা হয়, তাই ওই function-এ আরও আগে `resetAt` capture করতে হবে — এটি resilience hot path-এর এমন একটি পরিবর্তন, যা নিজস্ব reviewed PR-এ হওয়া উচিত। ততদিন পর্যন্ত re-entry connection cooldown শেষ হওয়ার জন্য অপেক্ষা করে (provider পাঠালে এটি ইতোমধ্যেই upstream-এর `Retry-After` hint-কে অগ্রাধিকার দেয়)।

### Anti-flap

সদ্য reset হওয়া কোনো rung-কে কেবল `reentryMinRemainingPercent`-এর (default 5) ওপরে থাকলেই পুনরায় অন্তর্ভুক্ত করা হয়, আর ইতোমধ্যে ব্যবহৃত কোনো connection-কে শুধু `exitCutoffPercent`-এর (default 2, যা `quotaPreflight.defaultThresholdPercent`-এর সঙ্গে মেলে) ওপরে থাকতে হয়। এই ব্যবধানটিই hysteresis band — এটি না থাকলে cutoff-এর আশেপাশে থাকা কোনো connection পরপর request-এ rung-গুলোর মধ্যে দোদুল্যমান হয়।

## কনফিগারেশন

শুধু টিউনিংয়ের জন্য। ইচ্ছাকৃতভাবেই কোনো `enabled` ফ্ল্যাগ নেই: এগুলো বন্ধ করতে সক্ষম কোনো টগল
`auto/subscription`-কে নিঃশব্দে সম্পূর্ণ পুল — পেইড মডেলসহ — এমন একটি নামে পরিবেশন করতে দিত,
যে নামটি ঠিক তার বিপরীতটির প্রতিশ্রুতি দেয়।

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 একটি ধাপকে সম্পূর্ণভাবে নিষ্ক্রিয় করে
  },
}
```

কোনো ব্যয় রিজলভার সংযুক্ত না হওয়া পর্যন্ত বাজেট গেটিং নিষ্ক্রিয় থাকে: কোনো হিসাবব্যবস্থা উপলভ্য না থাকলে একটি পেইড
ধাপকে ক্রমে রাখা হয়, কিন্তু কখনোই গেট করা হয় না। v3.8.51 অনুযায়ী `rungBudgetUsd` সেটিংটি
স্কিমা দ্বারা গৃহীত হয়, কিন্তু এখনো কার্যকর করা হয়নি — এটিকে সক্রিয় ব্যয়সীমা নয়, সংরক্ষিত কনফিগারেশন হিসেবে বিবেচনা করুন। ধাপের ক্রমবিন্যাস, কোটা-ভিত্তিক নিঃশেষ হওয়া এবং রিসেটের পর পুনঃপ্রবেশ—সবই
এটি ছাড়া কাজ করে।

## কম্পোজিশন

`subscription` এবং `thrifty` হলো `AutoTier` মান, তাই এগুলো প্রতিটি ক্যাটাগরির সঙ্গে কম্পোজ করা যায়:
`auto/coding:thrifty`, `auto/reasoning:subscription`, ইত্যাদি। দুটি ফ্ল্যাট আইডি
(`auto/subscription`, `auto/thrifty`) `/v1/models` এবং ড্যাশবোর্ডে প্রদর্শিত হয়।

কোনো আইডিই পেইড-টিয়ার নয়, তাই উভয়ের জন্যই `isPaidTierAutoId()` `false` রিটার্ন করে এবং
`auto/subscription` `hidePaidModels` প্রয়োগের পরও বজায় থাকে।

## কোডের অবস্থান

| বিষয়                             | ফাইল                                                |
| --------------------------------- | --------------------------------------------------- |
| নির্বাচিত বিলিং তথ্য              | `open-sse/config/connectionBillingCatalog.ts`       |
| ক্লাসিফায়ার                      | `open-sse/services/autoCombo/connectionBilling.ts`  |
| ধাপসমূহ, উভয় গ্রুপিং, পুনঃপ্রবেশ | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| ক্যান্ডিডেট পুলে সংযুক্তকরণ       | `open-sse/services/autoCombo/virtualFactory.ts`     |
| রিসেট-সচেতন ক্যাশের অচলাবস্থা     | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| টিয়ার সারফেস                     | `open-sse/services/autoCombo/suffixComposition.ts`  |
| প্রদর্শিত আইডিসমূহ                | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| টেস্টসমূহ                         | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
