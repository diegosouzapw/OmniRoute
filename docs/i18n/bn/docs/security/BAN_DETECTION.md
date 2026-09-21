# Account-Ban / Banned-Keyword Detection (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute আপস্ট্রিম ত্রুটি প্রতিক্রিয়াগুলোতে এমন সংকেত খোঁজে, যা নির্দেশ করে যে কোনো প্রদানকারীর
**অ্যাকাউন্ট স্থায়ীভাবে অচল** (স্থগিত / নিষ্ক্রিয় / ToS-এর কারণে নিষিদ্ধ) এবং মিল পাওয়া গেলে
সেই সংযোগটিকে একটি **চূড়ান্ত `banned` অবস্থায়** নিয়ে যায়, যাতে অনুরোধের জন্য
এটি আর নির্বাচিত না হয়। **Security → Banned Keywords**
সেটিংস কার্ডটি এটিই কনফিগার করে ("স্থায়ী অ্যাকাউন্ট
নিষেধাজ্ঞা শনাক্তকরণ সক্রিয় করে এমন অতিরিক্ত কীওয়ার্ড। বিল্ট-ইন কীওয়ার্ড সবসময় প্রযোজ্য।")।

এই পৃষ্ঠায় বিল্ট-ইন তালিকা, শনাক্তকরণ প্রবাহ, এর পরিধি, কীভাবে নিরাপদে
কাস্টম কীওয়ার্ড যোগ করতে হয় এবং কীভাবে চিহ্নিত কোনো সংযোগ পুনরুদ্ধার করতে হয় তা নথিভুক্ত করা হয়েছে। চূড়ান্ত
অবস্থাটি নিজেই স্থিতিস্থাপকতা মডেলের অংশ — দেখুন
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("চূড়ান্ত অবস্থা")।

**নির্ভরযোগ্য উৎস:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`)।

## বিল্ট-ইন কীওয়ার্ড

কাস্টম তালিকা যাই হোক না কেন, এই 8টি সাবস্ট্রিং সবসময় প্রযোজ্য (বড়-ছোট হাতের অক্ষর নির্বিশেষে):

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> প্রদানকারীরা তাদের নিষেধাজ্ঞার ভাষা পরিবর্তন করার সঙ্গে সঙ্গে এই তালিকাটিও বিবর্তিত হয়। প্রামাণিক
> অনুলিপিটি হলো `open-sse/services/accountFallback.ts`-এ থাকা `ACCOUNT_DEACTIVATED_SIGNALS`;
> উপরের ব্লকটিকে একটি স্ন্যাপশট হিসেবে বিবেচনা করুন।

একই ফাইলে পাশাপাশি থাকা দুটি **পৃথক** সংকেত-টেবিল নিষিদ্ধ-কীওয়ার্ড
শনাক্তকরণের অংশ _নয়_:

- `CREDITS_EXHAUSTED_SIGNALS` — বিলিং/কোটা নিঃশেষিত (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → চূড়ান্ত `credits_exhausted`।
- `OAUTH_INVALID_TOKEN_SIGNALS` — **অ-চূড়ান্ত**; টোকেন রিফ্রেশ করলে পুনরুদ্ধার করা যায়।

দ্রষ্টব্য: **`rate limit`** / `429`-এর মতো সাধারণ সাময়িক বাক্যাংশগুলো
রেট-লিমিট / সংযোগ-কুলডাউন প্রবাহ দ্বারা পরিচালিত হয় এবং এগুলো নিষেধাজ্ঞার সংকেত **নয়**।

## শনাক্তকরণ প্রবাহ

```
আপস্ট্রিম ত্রুটি প্রতিক্রিয়া
  → বডিকে স্ট্রিংয়ে রূপান্তর + ছোট হাতের অক্ষরে রূপান্তর
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [সাবস্ট্রিং মিল]
  → মিল পাওয়া গেছে?
      → সংযোগের testStatus = "banned"      (স্থায়ী — 1-বছরের কুলডাউন, কখনো স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হয় না)
      → যদি `autoDisableBannedAccounts` সেটিং চালু থাকে এবং `autoDisableBannedScope`
        এই সংযোগটিকে অন্তর্ভুক্ত করে (`all`, অথবা OAuth/cookie/session-এর জন্য `subscription`)
        → তাহলে isActive = false-ও করা হয়। স্কোপ
        `subscription` হলে প্রিপেইড API কীগুলো সক্রিয় থাকে।
      → অ্যাকাউন্ট নির্বাচনের সময় সংযোগটি এড়িয়ে যাওয়া হয় (সম্মিলিত QUOTA_BLOCKING অবস্থাসমূহ)
```

- মিল নির্ধারণ করা হয় প্রতিক্রিয়ার **বডি**-তে **বড়-ছোট হাতের অক্ষর-নির্বিশেষে সাবস্ট্রিং**
  অনুসন্ধানের মাধ্যমে (`isAccountDeactivated`, `accountFallback.ts`)।
- নিষেধাজ্ঞা-সংকেতযুক্ত বডি পাওয়া গেলে **যেকোনো HTTP
  স্ট্যাটাসে** স্থায়ী `banned` চূড়ান্তকরণ ঘটে (`markAccountUnavailable` → `checkFallbackError`-এর মাধ্যমে)। অপেক্ষাকৃত
  সীমিত **`deactivated`** লেবেলটি (সংযোগটিতে কোনো
  অতিরিক্ত API কী না থাকলে `isActive=false`) ইনলাইন `chatCore.ts` প্রবাহ দ্বারা **HTTP 401 / 403**-এ
  লেখা হয় (`classifyProviderError` → `ACCOUNT_DEACTIVATED`-এর মাধ্যমে শ্রেণিবদ্ধ)। মনে রাখবেন,
  একই `ACCOUNT_DEACTIVATED` সংকেতের ক্ষেত্রে `markAccountUnavailable()` প্রবাহটি
  একটি _ভিন্ন_ চূড়ান্ত স্ট্যাটাস — **`expired`** — লেখে
  (`resolveTerminalConnectionStatus`-এর মাধ্যমে), ফলে কোন প্রবাহ প্রতিক্রিয়াটি পরিচালনা করেছে তার ওপর নির্ভর করে
  একই নিষেধাজ্ঞা `deactivated` অথবা `expired` হিসেবে দেখা দিতে পারে। (পুরোনো
  কোড মন্তব্যে বলা হয়েছে, "যখন কোনো 401 বডিতে এই স্ট্রিংগুলো থাকে" — এটি
  বর্তমান আচরণকে পুরোপুরি তুলে ধরে না।)
- যেসব স্থানে চূড়ান্ত স্ট্যাটাস ফিল্টার করা হয়, সবখানেই একটি `banned` সংযোগ নির্বাচন থেকে বাদ পড়ে
  (`isTerminalConnectionStatus`, সম্মিলিত `QUOTA_BLOCKING_CONNECTION_STATUSES`)।

## পরিধি — কোন কোন প্রোভাইডার স্ক্যান করা হয়

**সব প্রোভাইডার।** পরীক্ষাটি সাধারণ ত্রুটি-পরিচালনা পাইপলাইনে চলে, যার মধ্য দিয়ে
প্রতিটি ব্যর্থ আপস্ট্রিম অনুরোধ প্রবাহিত হয় — এটি OAuth/সাবস্ক্রিপশন স্ক্র্যাপারের
মধ্যে সীমাবদ্ধ **নয়**। ফলস্বরূপ টার্মিনাল অবস্থা প্রতি **সংযোগের** জন্য নির্ধারিত হয়,
প্রতি প্রোভাইডারের জন্য নয়।

তবে বিল্ট-ইন _স্ট্রিংগুলো_ প্রকৃত ব্যান হওয়ার ঝুঁকি থাকা সাবস্ক্রিপশন/OAuth
প্রোভাইডারগুলোর (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity) কথা মাথায় রেখে তৈরি। কোনো API-কী প্রোভাইডারের ত্রুটি-বডিতে
সাবস্ট্রিংগুলোর কোনো একটি আক্ষরিকভাবে থাকলেই কেবল ডিটেক্টরটি সক্রিয় হবে।

`autoDisableBannedScope` (`all` | `subscription`, ডিফল্ট `all`) নিয়ন্ত্রণ করে,
কোনো মিল পাওয়া গেলে `isActive=false`-ও সেট হবে কি না। `subscription` বলতে
লগইন-ধাঁচের সিট বোঝায় (পেইড সাবস্ক্রিপশন ও ফ্রি অ্যাকাউন্ট, ওয়েব-কুকি সেশনসহ)।
এটি প্রিপেইড API কীগুলোর জন্যও `testStatus=banned` রেকর্ড করে, তবে সেগুলোকে
রাউটিং পুলে রেখে দেয়। টেকসই নকশাটি হলো প্রতি-প্রোভাইডার ও প্রতি-অ্যাকাউন্ট
ওভাররাইড; গ্লোবাল enum হলো প্রথম সংস্করণ।

## কাস্টম ব্যানড কীওয়ার্ড

**Security → Banned Keywords**-এ কীওয়ার্ড যোগ বা অপসারণ করুন (গ্লোবাল
`customBannedSignals` সেটিং হিসেবে `PATCH /api/settings`-এর মাধ্যমে সংরক্ষিত)।
এগুলো বিল্ট-ইন তালিকার সঙ্গে **যোগ করা হয়** — কখনোই সেটির প্রতিস্থাপন নয় — এবং
সংরক্ষণের সময় (ও স্টার্টআপে) `setCustomBannedSignals()`-এর মাধ্যমে হট-রিলোড হয়।
প্রতিটি কীওয়ার্ড সর্বোচ্চ 200 অক্ষরের হতে পারে; অ্যারের দৈর্ঘ্যের কোনো সীমা নেই।

**⚠ ফলস-পজিটিভের ঝুঁকি — নির্দিষ্ট বাক্যাংশ বেছে নিন।** শনাক্তকরণ পুরো রেসপন্স
বডিতে একটি কাঁচা সাবস্ট্রিং মিলের ভিত্তিতে হয়, এবং একটি মিল **স্থায়ী**
(1-বছরের কুলডাউন, ম্যানুয়াল পুনরুদ্ধার)। অতিরিক্ত বিস্তৃত কোনো কীওয়ার্ড সম্পূর্ণ
সুস্থ একটি সংযোগকেও ব্যান করতে পারে:

- **খারাপ:** `quota`, `limit`, `error`, `denied` — বহু সাময়িক ত্রুটিতে এগুলো থাকে।
- **ভালো:** সম্পূর্ণ ব্যান-সংক্রান্ত বাক্য, যেমন `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`।

প্রকৃত ব্যানের সময় প্রোভাইডার যে দীর্ঘতম দ্ব্যর্থহীন বাক্যাংশটি ফেরত দেয়, সেটিই
পছন্দ করুন। সন্দেহ হলে প্রথমে সংযোগটির `lastError` পর্যবেক্ষণ করুন, তারপর হুবহু
সেই শব্দবিন্যাসটি যোগ করুন।

## ফ্ল্যাগ করা সংযোগ পুনরুদ্ধার

টার্মিনাল `banned` / `deactivated` অবস্থা **কখনোই স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হয় না**
(এগুলো প্রোঅ্যাকটিভ-রিকভারি টিক থেকে বাদ থাকে — শুধু `unavailable` কুলডাউনগুলো
নিজে থেকেই পুনরুদ্ধার হয়)। একজন অপারেটরকে স্পষ্টভাবে এগুলো পরিষ্কার করতে হবে:

1. **সংযোগটি পুনরায় পরীক্ষা করুন** — ড্যাশবোর্ডের **Test** অ্যাকশন
   (`POST /api/providers/{id}/test`); একটি সফল প্রোব `testStatus`-কে
   `active`-এ রিসেট করে এবং ত্রুটি-সংক্রান্ত ফিল্ডগুলো পরিষ্কার করে।
2. **পুনরায় প্রমাণীকরণ করুন / ক্রেডেনশিয়াল সম্পাদনা করুন** — OAuth
   প্রোভাইডারগুলোর জন্য লগইন / রিফ্রেশ ফ্লো পুনরায় চালান; প্রোভাইডার
   তৈরি/ইমপোর্ট রুটগুলো `isActive = true` সেট করে।
3. **সংযোগটি পুনরায় সক্রিয় করুন** — অটো-ডিজেবল যদি `isActive = false`
   সেট করে থাকে (`all` স্কোপ, অথবা OAuth/কুকি/সেশন সংযোগের জন্য
   `subscription`), তাহলে অ্যাকাউন্ট ঠিক করার পর এটি আবার চালু করুন।

আলাদা কোনো "clear ban flag" বোতাম নেই — পুনরুদ্ধারের উপায় হলো পুনরায় পরীক্ষা,
পুনরায় প্রমাণীকরণ, অথবা পুনরায় সক্রিয় করা, যা
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)-এর সাধারণ
টার্মিনাল-স্টেট নিয়মের সঙ্গে সামঞ্জস্যপূর্ণ।

## প্রোব আইসোলেশন (মডেল test-all)

একটি **প্রোব-উৎসের ব্যর্থতা** (`runAsProbe`-এর ভেতরে সম্পাদিত মডেল test-all /
হেলথ-চেক ডিসপ্যাচ) কখনোই পুল থেকে কোনো সংযোগ সরিয়ে দেয় না (#9817): এটি
**দৃশ্যমানতার জন্য রেকর্ড করা হয়** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), কিন্তু রাউটিংয়ের **প্রতিটি** পরিবর্তন এড়িয়ে যায় — কুলডাউন,
টার্মিনাল স্ট্যাটাস (`banned` / `deactivated` / `credits_exhausted`),
প্রতি-মডেল লকআউট, প্রোভাইডার সার্কিট ব্রেকার, 5-মিনিটের কোটা ক্যাশ, OAuth
টোকেন রিফ্রেশ এবং অটো-ডিজেবল। শুধু প্রকৃত রিকোয়েস্ট-পাথের ব্যর্থতাই নিষ্ক্রিয়
করে। রেকর্ড করা ত্রুটিটির কারণেই একটি ফ্ল্যাগ করা অ্যাকাউন্ট ট্র্যাফিক পরিবেশন
চালিয়ে যাওয়ার সময়ও ড্যাশবোর্ডে দৃশ্যমান থাকে।

একমাত্র সিদ্ধান্ত-বিন্দু হলো `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), যেটি প্রোব-উৎসের ব্যর্থতা থেকে রাউটিং স্টেট
পরিবর্তন করতে পারে এমন **প্রতিটি** স্থানে পরামর্শ করা হয়:

- `markAccountUnavailable` (`auth.ts`) — শুধু রেকর্ড করে (`lastError`-এ কাঁচা
  টেক্সট, `lastErrorType`, `errorCode`, `lastErrorAt`; ইচ্ছাকৃতভাবে
  `backoffLevel` **নেই**, কারণ এটি নির্বাচনকালীন অটো-ডিকে ট্রিগার করে রেকর্ডটি
  মুছে দিত)
- `maybeAutoDisableBannedAccount` — কোনো অটো-ডিজেবল নয়
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (শুধু রেকর্ড,
  কোনো টার্মিনাল `credits_exhausted` নয়), GEO_BLOCKED (কোনো 24h এক্সক্লুশন
  নয়), MODEL_NOT_FOUND (কোনো `lockModel` নয়), codex 429
  অ্যাকাউন্ট-রোটেশন ফেইলওভার (কোনো `markCodexScopeRateLimited` নয়, কোনো
  সংরক্ষিত `rate_limited_until` নয়, কোনো সেশন-অ্যাফিনিটি ক্লিয়ার নয়),
  `persistCodexQuotaState` (কোনো কোটা-স্টেট রাইট নয়, কোনো ক্যাশ ইনভ্যালিডেশন
  নয়), `recordKeyHealthStatus` (কী-হেলথ রোটেটর অপরিবর্তিত)
- OAuth রিফ্রেশ — এক্সিকিউটর বেসের প্রোঅ্যাকটিভ রিফ্রেশ (`base.ts`-এর
  `execute()`, কোনো রিফ্রেশ-টোকেন রোটেশন ব্যবহার করা হয় না) এবং `chatCore`-এর
  রিঅ্যাকটিভ 401/403 পাথ (কোনো `expired` ডিঅ্যাক্টিভেশন নয়), উভয়ই
- `chat.ts` — প্রোভাইডার সার্কিট ব্রেকার এবং 5-মিনিটের কোটা ক্যাশ
  (`markAccountExhaustedFrom429`) কখনোই অবনমিত হয় না

রেকর্ড করা ত্রুটিটির কারণেই একটি ফ্ল্যাগ করা অ্যাকাউন্ট ট্র্যাফিক পরিবেশন চালিয়ে
যাওয়ার সময়ও ড্যাশবোর্ডে দৃশ্যমান থাকে। দ্রষ্টব্য: প্রকৃত পাথের
`slice(0,100)` ট্রাঙ্কেশনের বিপরীতে, প্রোব রেকর্ডটি **কাঁচা** (না-কাটা) ত্রুটি
টেক্সট সংরক্ষণ করে।

যেসব অপারেটর test-all-কে রক্ষণাবেক্ষণ টুল হিসেবে ব্যবহার করেন, তাঁরা নিচের
যেকোনো একটির মাধ্যমে ঐতিহাসিক আচরণটি পুনরুদ্ধার করতে পারেন (প্রোবকে প্রকৃত
জেনারেশন হিসেবে গণ্য করা হবে):

- `probeCanDisable` সেটিং (`POST /api/settings`-এর সঙ্গে
  `{"probeCanDisable": true}`, অথবা সরাসরি `key_value` DB সম্পাদনা), অথবা
- ফিচার ফ্ল্যাগ **`PROBE_CAN_DISABLE=true`** (env বা DB ওভাররাইড; সেটিংয়ের
  ওপর এটি প্রাধান্য পায়)।

ফেইল-সেফ: ফ্ল্যাগ বা সেটিংস লুকআপে ব্যতিক্রম ঘটলে আইসোলেশন চালু থাকে।

## সোর্স ফাইলসমূহ

| সংশ্লিষ্ট বিষয়                            | ফাইল                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| সিগন্যাল টেবিলসমূহ + ম্যাচ                 | `open-sse/services/accountFallback.ts`                                                                        |
| টার্মিনালাইজেশন / স্থায়ীকরণ               | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| স্বয়ংক্রিয় নিষ্ক্রিয়করণের পরিধি         | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| ইনলাইন শ্রেণিবিন্যাস                       | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| টার্মিনাল-স্টেট পুনরুদ্ধার থেকে বাদ দেওয়া | `src/lib/quota/connectionRecovery.ts`                                                                         |
| কাস্টম-কীওয়ার্ড রানটাইম লোড               | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| সেটিংস UI                                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
