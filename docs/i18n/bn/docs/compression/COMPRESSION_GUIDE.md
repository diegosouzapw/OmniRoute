# 🗜️ Prompt Compression Guide — OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> উপযুক্ত কনটেক্সটে স্বয়ংক্রিয়ভাবে 15-95% সাশ্রয় করুন। দ্রুত ধারণা পেতে [README-এর Compression বিভাগ](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) দেখুন।

## সংক্ষিপ্ত বিবরণ

OmniRoute একটি মডিউলার প্রম্পট কম্প্রেশন পাইপলাইন বাস্তবায়ন করে, যা অনুরোধগুলো আপস্ট্রিম প্রোভাইডারের কাছে পৌঁছানোর **আগেই সক্রিয়ভাবে** চলে। অর্থাৎ, আপনার টোকেন সাশ্রয় স্বচ্ছভাবে ঘটে — ওয়ার্কফ্লোতে কোনো পরিবর্তনের প্রয়োজন নেই।

```
ক্লায়েন্টের অনুরোধ
  → কম্প্রেশন কৌশল নির্বাচক
    → কম্বো ওভাররাইড আছে? → কম্বো সেটিং ব্যবহার করুন
    → স্বয়ংক্রিয় ট্রিগার থ্রেশহোল্ড পূরণ হয়েছে? → স্বয়ংক্রিয় মোড ব্যবহার করুন
    → ডিফল্ট মোড আছে? → গ্লোবাল সেটিং ব্যবহার করুন
    → বন্ধ? → কম্প্রেশন এড়িয়ে যান
  → নির্বাচিত কম্প্রেশন মোড
    → বন্ধ: কোনো কম্প্রেশন নয়
    → Lite: নিরাপদ হোয়াইটস্পেস/ফরম্যাটিং পরিষ্কারকরণ (~15%)
    → Standard: টেলিগ্রাফিক ভাষায় অপ্রয়োজনীয় শব্দ অপসারণ (~30%)
    → Aggressive: ইতিহাসের পুরোনো অংশ সংকোচন + সারসংক্ষেপ (~50%)
    → Ultra: হিউরিস্টিক ছাঁটাই + কোড ব্লক পাতলা করা (~75%)
    → RTK: কমান্ড-সচেতন টার্মিনাল/টুল-আউটপুট ফিল্টারিং (আপস্ট্রিমে 60-90% পরিসর)
    → Stacked: ক্রমানুসারী মাল্টি-ইঞ্জিন পাইপলাইন, সাধারণত প্রথমে RTK, পরে Caveman (উপযুক্ত ক্ষেত্রে 78-95% পরিসর)
  → সংকুচিত অনুরোধ → প্রোভাইডার
```

---

## কম্প্রেশন মোডসমূহ

### বন্ধ

কোনো কম্প্রেশন প্রয়োগ করা হয় না। সব বার্তা অপরিবর্তিতভাবে পাঠানো হয়।

### Lite মোড (~15% সাশ্রয়, <1ms লেটেন্সি)

সবচেয়ে নিরাপদ মোড — অর্থে কোনো পরিবর্তন হয় না, কেবল ফরম্যাটিং পরিষ্কার করা হয়:

| কৌশল                     | বিবরণ                                               |
| ------------------------ | --------------------------------------------------- |
| `collapseWhitespace`     | পরপর থাকা ফাঁকা লাইন ও লাইনের শেষের স্পেস একত্র করে |
| `dedupSystemPrompt`      | ডুপ্লিকেট সিস্টেম বার্তা সরিয়ে দেয়                |
| `compressToolResults`    | অতিরিক্ত বিস্তারিত টুল/ফাংশন আউটপুট সংকুচিত করে     |
| `removeRedundantContent` | পুনরাবৃত্ত নির্দেশনা বাদ দেয়                       |
| `replaceImageUrls`       | base64 ইমেজ ডেটা URI সংক্ষিপ্ত করে                  |

**সবচেয়ে উপযোগী:** সর্বদা চালু রাখা ব্যবহার ও নিরাপত্তা-সংবেদনশীল ওয়ার্কফ্লো।

### Standard মোড (~30% সাশ্রয়)

[Caveman](https://github.com/JuliusBrussee/caveman) দ্বারা অনুপ্রাণিত — অর্থ অক্ষুণ্ণ রেখে অপ্রয়োজনীয় শব্দ ও অতিরিক্ত দীর্ঘ বাক্যবিন্যাস সরিয়ে দেয়:

- অপ্রয়োজনীয় শব্দ ("please", "I think", "basically", "actually") সরিয়ে দেয়
- অতিরিক্ত দীর্ঘ বাক্যাংশ সংক্ষিপ্ত করে ("in order to" → "to", "as a result of" → "because")
- অতিরিক্ত বিনয়সূচক দ্বিধাপূর্ণ বাক্যাংশ বাদ দেয় ("Would you mind...", "If you could possibly...")
- কোডিং প্রম্পটের জন্য সূক্ষ্মভাবে সমন্বয় করা 30টির বেশি regex নিয়ম

**সবচেয়ে উপযোগী:** দৈনন্দিন কোডিং ওয়ার্কফ্লো ও খরচ-সচেতন দল।

### Aggressive মোড (~50% সাশ্রয়)

দীর্ঘ সেশনের জন্য বুদ্ধিমান ইতিহাস ব্যবস্থাপনা:

- **বার্তার বয়সভিত্তিক সংকোচন** — পুরোনো বার্তাগুলো ক্রমান্বয়ে আরও সংকুচিত হয়
- **টুল ফলাফল কম্প্রেশন** — দীর্ঘ টুল আউটপুট ছেঁটে বা বাদ দেওয়া হয় (প্রথম/শেষ লাইন,
  মিল থাকা লাইন ফিল্টার করা, JSON key সংকোচন)
- **কাঠামোগত অখণ্ডতা সুরক্ষা** — `tool_use` + `tool_result` জোড়া সামঞ্জস্যপূর্ণ থাকা নিশ্চিত করে
- **কনটেক্সট উইন্ডো সম্পর্কে সচেতনতা** — প্রতিটি মডেলের টোকেন সীমা মেনে চলে

**সবচেয়ে উপযোগী:** দীর্ঘ ডিবাগিং সেশন ও বড় কোডবেস।

### Ultra মোড (~75% সাশ্রয়)

টোকেন-সংকটপূর্ণ পরিস্থিতির জন্য সর্বোচ্চ কম্প্রেশন:

- **হিউরিস্টিক ছাঁটাই** — স্কোরভিত্তিক গদ্য টোকেন ছাঁটাই
- **কাঠামো সংরক্ষণ** — ফেন্সড কোড ব্লক, ইনলাইন কোড, URL ও আইডেন্টিফায়ারকে
  টম্বস্টোন করে হুবহু পুনরায় জোড়া হয়; এগুলো কখনো ছাঁটাই করা হয় না
- **ঐচ্ছিক SLM স্তর** — কনফিগার করা থাকলে একটি ছোট স্থানীয় মডেল ছাঁটাইকে আরও পরিশীলিত করতে পারে
- Aggressive মোড থেকে স্বাধীন: এটি বার্তার বয়সভিত্তিক সংকোচন, টুল-ফলাফল কম্প্রেশন
  বা ফলব্যাক সারসংক্ষেপকারী চালায় না (শুধু SLM-স্তরের ব্যর্থতাই একটি ফলব্যাক পাসকে
  aggressive-এর মাধ্যমে রাউট করতে পারে)

**সবচেয়ে উপযোগী:** যখন আপনি বারবার কনটেক্সট সীমায় পৌঁছে যাচ্ছেন।

### RTK মোড (আপস্ট্রিমে 60-90% পরিসর)

RTK মোড কোডিং-এজেন্ট সেশনে দেখা যাওয়া অতিরিক্ত বিস্তারিত টুল আউটপুটের জন্য অপ্টিমাইজ করা:

- `git status`, `git diff`, `git log`, টেস্ট রানার,
  TypeScript/Vite/Webpack বিল্ড, ESLint/Biome/Prettier, npm audit/ইনস্টলেশন, Docker লগ, ইনফ্রা
  আউটপুট এবং সাধারণ শেল আউটপুটের মতো কমান্ড/আউটপুট শ্রেণি শনাক্ত করে
- `open-sse/services/compression/engines/rtk/filters/` থেকে JSON ফিল্টার প্যাক প্রয়োগ করে
- প্রজেক্ট বা গ্লোবাল `filters.toml` ফাইল থেকে RTK TOML schema v1 ফিল্টার ইমপোর্ট করে, যার সঙ্গে রয়েছে ইনলাইন-টেস্ট
  যাচাইকরণ এবং প্রজেক্ট ফাইলের জন্য বিশ্বাসভিত্তিক নিয়ন্ত্রণ
- ইনলাইন যাচাইকরণ নমুনাসহ 55টি বিল্ট-ইন ফিল্টার প্রদান করে
- ANSI নিয়ন্ত্রণ সিকোয়েন্স, প্রগ্রেস বার, পুনরাবৃত্ত লাইন এবং কার্যকর নয় এমন অপ্রয়োজনীয় তথ্য সরিয়ে দেয়
- ব্যর্থতা, ত্রুটি, সতর্কতা, পরিবর্তিত ফাইল, সারসংক্ষেপ এবং দীর্ঘ আউটপুটের শেষাংশ সংরক্ষণ করে
- বিশ্বাসভিত্তিক প্রজেক্ট ফিল্টার, গ্লোবাল ফিল্টার এবং ঐচ্ছিকভাবে সংবেদনশীল তথ্য অপসারিত কাঁচা আউটপুট পুনরুদ্ধার সমর্থন করে

**সবচেয়ে উপযোগী:** শেল, বিল্ড, টেস্ট, git, grep এবং ফাইল-আউটপুট ট্রান্সক্রিপ্টসহ এজেন্ট সেশন।

### Stacked মোড (উপযুক্ত ক্ষেত্রে 78-95% পরিসর)

Stacked মোড একটি নির্ধারিত ক্রমে একাধিক কম্প্রেশন ইঞ্জিন চালায়। ডিফল্ট পাইপলাইন হলো:

```txt
RTK -> Caveman
```

এই ক্রমে প্রথমে টার্মিনাল/টুল আউটপুট সংক্ষিপ্ত রাখা হয়, এরপর অবশিষ্ট স্বাভাবিক ভাষার প্রম্পটে
Caveman-এর অর্থভিত্তিক সংকোচন প্রয়োগ করা হয়। Stacked পাইপলাইন গ্লোবালভাবে বা রাউটিং কম্বোতে
নির্ধারিত কম্প্রেশন কম্বোর মাধ্যমে কনফিগার করা যায়।

**সবচেয়ে উপযোগী:** বড় টুল লগের পাশাপাশি মানুষের নির্দেশনা বা অ্যাসিস্ট্যান্টের সারসংক্ষেপ থাকা মিশ্র কনটেক্সট।

---

## আপস্ট্রিম সাশ্রয়ের হিসাব

OmniRoute দুটি উৎস থেকে পাওয়া কম্প্রেশন সাশ্রয় নথিভুক্ত করে: আপস্ট্রিম প্রকল্পের বেঞ্চমার্ক এবং
OmniRoute-এর নিজস্ব ইঞ্জিন সমন্বয়।

| উৎস     | এখানে ব্যবহৃত আপস্ট্রিম README-এর সংখ্যা                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` কম আউটপুট টোকেন, বেঞ্চমার্কে গড় আউটপুট সাশ্রয় `65%`, পরিসর `22-87%`, এবং `~46%` ইনপুট কম্প্রেশন টুল |
| RTK     | কমান্ড-আউটপুটে `60-90%` সাশ্রয়; নমুনা সেশনে `~118,000 -> ~23,900` টোকেন, অর্থাৎ `79.7%` সাশ্রয় (`~80%`)    |

ওভারল্যাপিং টুল/কনটেক্সট পেলোডের ক্ষেত্রে, ডিফল্ট OmniRoute কম্বো ইঞ্জিনগুলোকে স্তরবদ্ধভাবে প্রয়োগ করে:

```txt
RTK -> Caveman
```

সম্মিলিত সাশ্রয় যোগফলভিত্তিক নয়, গুণফলভিত্তিক:

```txt
combined = 1 - (1 - RTK সাশ্রয়) * (1 - Caveman ইনপুট সাশ্রয়)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

`78-95%` সংখ্যাটি তখন প্রযোজ্য, যখন RTK এবং Caveman উভয়ই একই ইনপুট/কনটেক্সট পেলোড কমাতে পারে।
Caveman-এর রেসপন্স আউটপুট মোড আলাদা: এটি সক্রিয় থাকলে Caveman-এর নিজস্ব আউটপুট সাশ্রয় ব্যবহার করুন (`65%`
গড়, `~75%` প্রধান দাবি, `22-87%` পরিসর)। মোট বিলিং সাশ্রয় আপনার প্রম্পট/আউটপুটের অনুপাতের ওপর নির্ভর করে।

### "যোগ্য" বলতে আসলে কী বোঝায়

15-95%-এর প্রধান দাবিকৃত পরিসরটি বাস্তব, তবে এটি শুধু **পুনরাবৃত্তিমূলক বা অতিরিক্ত বাগাড়ম্বরপূর্ণ** কনটেন্টের ক্ষেত্রে প্রযোজ্য — পুনরাবৃত্ত
ত্রুটির লাইন, একই সতর্কতা বারবার দেখানো কোনো বিল্ড লগ, অতিরিক্ত বড় `grep`/ফাইল-রিড ডাম্প। এর অর্থ এই
**নয়** যে প্রতিটি রিকোয়েস্টেই এতটা সাশ্রয় হবে।

পরীক্ষামূলকভাবে যাচাইকৃত (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300টি অভিন্ন
ত্রুটির লাইনযুক্ত Anthropic-আকৃতির একটি `tool_result` ব্লকের ওপর `stacked` (RTK + Caveman) রান চালিয়ে
**95.93% টোকেন সাশ্রয় / 96.26% অক্ষর সাশ্রয়** পাওয়া গেছে — যা ঘোষিত পরিসরের
মধ্যেই পড়ে। কিন্তু একই পাইপলাইন স্বাভাবিক, পুনরাবৃত্তিহীন টুল আউটপুটের ওপর চালালে (পরিচ্ছন্ন `grep` ম্যাচের তালিকা,
সংক্ষিপ্ত ফাইল রিড, সাধারণ কথোপকথনের টেক্সট) সঠিকভাবেই **প্রায় শূন্য সাশ্রয়** দেয়, কারণ
সরিয়ে দেওয়ার মতো পুনরাবৃত্তিমূলক কিছু নেই এবং `validateCompression()` (`validation.ts`) এমন কোনো
পুনর্লিখন পাঠাতে অস্বীকার করে, যা কোড ব্লক, URL, শিরোনাম, সংস্করণ বা ALL-CAPS ধ্রুবক শনাক্তকারী বাদ দেবে বা পরিবর্তন করবে।

এটি প্রত্যাশিত ও নিরাপদ আচরণ, কোনো বাগ নয়: যে কোডিং সেশনে প্রধানত পরিচ্ছন্ন ফাইল রিড/grep করা হয়, সেখানে
কম্প্রেশন পুরোপুরি সক্রিয় থাকলেও মোট সাশ্রয় সীমিত হবে; অন্যদিকে কোনো সেশন ব্যর্থতার
লুপ বা অতিরিক্ত বার্তা দেওয়া লিন্টারের সম্মুখীন হলে সেই ট্র্যাফিকে সম্পূর্ণ 78-95% পরিসরের সাশ্রয় দেখা যাবে। কম্প্রেশন ভুলভাবে কনফিগার করা হয়েছে—এমন প্রমাণ হিসেবে
একটি সেশনের কম সামগ্রিক সাশ্রয় শতাংশ ব্যবহার করবেন না — প্রথমে পরীক্ষা করুন
অন্তর্নিহিত টুল আউটপুটটি সত্যিই পুনরাবৃত্তিমূলক ছিল কি না।

---

## টোকেন সাশ্রয়ের দৃশ্যায়ন

```
কম্প্রেশন ছাড়া:     LLM-এ 47K টোকেন পাঠানো হয়েছে
Lite সহ:             40K টোকেন পাঠানো হয়েছে          (15% সাশ্রয় — নিরাপদ, সর্বদা সক্রিয়)
Standard সহ:         33K টোকেন পাঠানো হয়েছে          (30% সাশ্রয় — caveman-ধাঁচের নিয়ম)
Aggressive সহ:       24K টোকেন পাঠানো হয়েছে          (50% সাশ্রয় — এজিং + সারসংক্ষেপ)
Ultra সহ:            12K টোকেন পাঠানো হয়েছে          (75% সাশ্রয় — হিউরিস্টিক ছাঁটাই)
RTK সহ:              19K-5K টোকেন পাঠানো হয়েছে      (কমান্ড/টুল আউটপুটে 60-90% সাশ্রয়)
Stacked সহ:          10K-2.5K টোকেন পাঠানো হয়েছে    (যোগ্য RTK+Caveman কনটেন্টে 78-95% পরিসর)
```

---

## কনফিগারেশন

### ড্যাশবোর্ড

`Dashboard → Context & Cache`-এ যান:

- **Caveman** — মোড নির্বাচন, ভাষা প্যাক, প্রিভিউ এবং গ্লোবাল ডিফল্ট
- **RTK** — কমান্ড-ফিল্টার প্রিভিউ, RTK নিরাপত্তা সেটিংস এবং ফিল্টার ক্যাটালগ
- **Compression Combos** — রাউটিং কম্বোতে নির্ধারিত নামযুক্ত ইঞ্জিন পাইপলাইন
- **Auto-Trigger Threshold** — টোকেনের সংখ্যা থ্রেশহোল্ড অতিক্রম করলে স্বয়ংক্রিয়ভাবে কম্প্রেশন সক্রিয় করে

### প্রতি-কম্বো ওভাররাইড

`Dashboard → Context & Cache → Compression Combos`-এ একটি রাউটিং কম্বোর জন্য একটি কম্প্রেশন
কম্বো নির্ধারণ করুন:

```txt
কম্বো: "free-tier-fallback"
  কম্প্রেশন কম্বো: "coding-agent-stack"
  পাইপলাইন: RTK -> Caveman
  লক্ষ্যসমূহ:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

এর মাধ্যমে পেইড সাবস্ক্রিপশনে লাইট মোড বজায় রেখে ফ্রি/কোডিং প্রোভাইডারে স্ট্যাকড কম্প্রেশন
ব্যবহার করতে পারবেন।

এই "প্রতি-কম্বো ওভাররাইড" অ্যাসাইনমেন্টটি **রাউটিং-কম্বো কম্প্রেশন
মোড** ওভাররাইড (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — ফিল্ডটির
স্কিমা `rtk`, `stacked` এবং `omniglyph`-ও গ্রহণ করে) থেকে আলাদা একটি নিয়ন্ত্রণ — ওই ওভাররাইড কোনো নামযুক্ত
কম্প্রেশন-কম্বো পাইপলাইন নির্বাচন করে না; এটি শুধু `resolveCompressionPlan` দ্বারা
ব্যবহৃত `compressionMode` ফিল্ড সেট করে। এটি হয় কম্বো কার্ডে (`Dashboard → Combos`), অথবা
#6760 থেকে, উপরে নথিভুক্ত পাইপলাইন-অ্যাসাইনমেন্ট চেকবক্সের ঠিক পাশে
`Dashboard → Context & Cache → Compression Combos`-এর "Assign to routing" তালিকায় প্রতি রাউটিং কম্বোর জন্য
সেট করা যায়। উভয় ইন্টারফেস একই `PUT /api/combos/{id}` এন্ডপয়েন্টের মাধ্যমে সংরক্ষিত হয়।

### প্রতি-রিকোয়েস্ট ওভাররাইড

একটি নির্দিষ্ট রিকোয়েস্টের কম্প্রেশন প্ল্যান ওভাররাইড করতে `x-omniroute-compression` রিকোয়েস্ট হেডার
পাঠান। এটির অগ্রাধিকার সর্বোচ্চ — এটি রাউটিং-কম্বো ওভাররাইড, সক্রিয় প্রোফাইল,
অটো-ট্রিগার এবং প্যানেলের Default-কে অগ্রাহ্য করে। অজানা মান উপেক্ষা করা হয় (রিকোয়েস্ট কখনো প্রত্যাখ্যাত হয় না) এবং
গ্লোবাল মাস্টার সুইচ এখনও সবকিছু নিয়ন্ত্রণ করে: গ্লোবালি কম্প্রেশন বন্ধ থাকলে হেডারটি
তা চালু করতে পারে না। মানসমূহ:

| মান           | প্রভাব                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `off`         | এই রিকোয়েস্টে কোনো কম্প্রেশন নেই।                                                                |
| `default`     | প্যানেল থেকে নির্ধারিত Default প্রোফাইল (সক্রিয় প্রোফাইল উপেক্ষা করে)। লসি ইঞ্জিনগুলো বন্ধ থাকে। |
| `safe`        | হেডারটি বাদ দেওয়ার মতোই: শুধু ডিডুপ এবং হোয়াইটস্পেস ফোল্ডিং।                                    |
| `allow-lossy` | সারাংশ, প্রাসঙ্গিকতা ফিল্টার এবং স্টাইল রিরাইটসহ এই রিকোয়েস্টের অপারেটর প্ল্যান বজায় রাখে।      |
| `engine:<id>` | সক্রিয় থাকলে একটি একক ইঞ্জিন, যেমন `engine:rtk`। এটি ওই ইঞ্জিনের জন্য প্রতি-রিকোয়েস্ট অপ্ট-ইন।  |
| `<combo>`     | একটি নামযুক্ত কম্বো, প্রথমে নামের ভিত্তিতে (কেস-ইনসেনসিটিভ), তারপর id অনুযায়ী মেলানো হয়।        |

`allow-lossy`, `engine:<id>`, অথবা কোনো নামযুক্ত কম্বো ছাড়া লসি ইঞ্জিন প্রয়োগ করা হয় না।
কম্প্রেশন চালু থাকলে রিকোয়েস্টটি তবুও সেশন ডিডুপ এবং হোয়াইটস্পেস ফোল্ডিং পায়।

প্রয়োগ করা প্ল্যানটি `X-OmniRoute-Compression: <mode>; source=<source>` রেসপন্স
হেডারে ফেরত পাঠানো হয়, যেখানে `<source>` হলো `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, অথবা `off`-এর একটি।

### API

```bash
# কম্প্রেশন সেটিংস সংগ্রহ করুন
curl http://localhost:20128/api/settings/compression

# কম্প্রেশন সেটিংস আপডেট করুন
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# একটি নির্দিষ্ট RTK/stacked পেলোডের প্রিভিউ দেখুন
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK ফিল্টার প্যাকগুলোর তালিকা দেখুন
curl http://localhost:20128/api/context/rtk/filters

# ঐচ্ছিক কমান্ড মেটাডেটাসহ সরাসরি RTK পরীক্ষা করুন
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## কী কী সুরক্ষিত থাকে

কম্প্রেশন ইঞ্জিন **সবসময় সংরক্ষণ করে:**

- ✅ কোড ব্লক (ফেন্সড এবং ইনলাইন)
- ✅ URL এবং ফাইল পাথ
- ✅ JSON কাঠামো এবং স্ট্রাকচার্ড ডেটা
- ✅ আইডেন্টিফায়ার এবং সুরক্ষিত প্রযুক্তিগত টোকেন
- ✅ গাণিতিক এক্সপ্রেশন
- ✅ টুল/ফাংশন কলের সংজ্ঞা
- ✅ সিস্টেম প্রম্পট (লাইট মোডে)

RTK-এর র-আউটপুট পুনরুদ্ধার প্রক্রিয়া কোনো কিছু সংরক্ষিত হওয়ার আগে সাধারণ API কী, বেয়ারার টোকেন, Slack টোকেন, AWS অ্যাক্সেস কী,
পাসওয়ার্ড, টোকেন এবং সিক্রেট রিড্যাক্ট করে।

---

## কম্প্রেশন পরিসংখ্যান

প্রতিটি কম্প্রেস করা রিকোয়েস্টের পরিসংখ্যান সার্ভার লগে অন্তর্ভুক্ত থাকে:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## পর্যায়ভিত্তিক রোডম্যাপ

| পর্যায়    | মোডসমূহ                                                                                                                                         | অবস্থা      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| পর্যায় 1  | বন্ধ, লাইট                                                                                                                                      | ✅ প্রকাশিত |
| পর্যায় 2  | স্ট্যান্ডার্ড, অ্যাগ্রেসিভ, আল্ট্রা                                                                                                             | ✅ প্রকাশিত |
| পর্যায় 3  | RTK, স্ট্যাকড, কম্প্রেশন কম্বো                                                                                                                  | ✅ প্রকাশিত |
| পর্যায় 4  | আউটপুট স্টাইল, SLM-স্তরের আল্ট্রা, ইভ্যাল হারনেস                                                                                                | ✅ প্রকাশিত |
| পর্যায় 4C | অভিযোজিত কনটেক্সট-বাজেট ("ডায়াল") — কম্পিউট ইঞ্জিন + API (`PUT /api/settings/compression`-এ `contextBudget`) + ড্যাশবোর্ড মোড/পলিসি নিয়ন্ত্রণ | ✅ প্রকাশিত |

---

## স্বীকৃতি

স্ট্যান্ডার্ড মোডের কম্প্রেশন নিয়মগুলো **[JuliusBrussee](https://github.com/JuliusBrussee)**-এর **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) থেকে অনুপ্রাণিত — ভাইরাল "যখন অল্প টোকেনেই কাজ হয়, তখন বেশি টোকেন কেন ব্যবহার করবেন" প্রকল্প। Caveman-এর প্রতিবেদন অনুযায়ী, আউটপুট টোকেন `~75%` কম, বেঞ্চমার্কে গড় আউটপুট সাশ্রয় `65%`, আউটপুটের পরিসর `22-87%` এবং ইনপুট-কম্প্রেশন টুলে `~46%` সাশ্রয় হয়।

RTK মোড **[RTK AI](https://github.com/rtk-ai)**-এর **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** থেকে অনুপ্রাণিত — টার্মিনাল, বিল্ড, টেস্ট, git এবং টুল-আউটপুট ফিল্টারিংয়ের জন্য উচ্চ-কর্মক্ষমতাসম্পন্ন কমান্ড-আউটপুট কম্প্রেশন প্রকল্প। RTK-এর প্রতিবেদন অনুযায়ী, এতে `60-90%` সাশ্রয় হয় এবং এর README-এর নমুনা সেশনে `~80%` সাশ্রয় দেখানো হয়েছে।

---

## উন্নত কম্প্রেশন সিস্টেম

উপরে বর্ণিত 7টি মোডের বাইরে (সোর্সটি `codex-responses` এবং
`omniglyph` মোডও গ্রহণ করে, যা এই নির্দেশিকায় আলোচনা করা হয়নি), নিচের বিভাগগুলোতে এমন ফিচার আলোচনা করা হয়েছে
যেগুলো ওই মোডগুলোর মধ্যে বা পাশাপাশি কাজ করে: টুল রেজাল্ট কম্প্রেশন এবং প্রগ্রেসিভ এজিং
অ্যাগ্রেসিভ ইঞ্জিনের ধাপ 1 ও 2 (অ্যাগ্রেসিভ মোড এবং একটি স্ট্যাকড পাইপলাইনের `aggressive` ধাপ),
স্ট্যাকড পাইপলাইনের মাধ্যমেই স্ট্যাকড মোড চলে, ক্যাশ-অ্যাওয়ার কম্প্রেশন ক্যাশিং প্রোভাইডারের ক্ষেত্রে
কম্প্রেশন চালু থাকা অবস্থায় `aggressive` এবং `ultra`-কে `standard`-এ নামিয়ে আনে, এবং Caveman আউটপুট মোড
ও আউটপুট স্টাইল হলো অপ্ট-ইন সিস্টেম-প্রম্পট নির্দেশনা, যা ডিফল্টভাবে বন্ধ থাকে এবং রিকোয়েস্ট
কম্প্রেস করার পরিবর্তে মডেলের আউটপুটের রূপ নির্ধারণ করে।

### ক্যাশ-অ্যাওয়ার কম্প্রেশন

কিছু প্রোভাইডার (যেমন প্রম্পট ক্যাশিংসহ Anthropic) **প্রম্পট ক্যাশিং** সমর্থন করে,
যার মাধ্যমে তারা খরচ ও ল্যাটেন্সি কমাতে প্রম্পটের কিছু অংশ ক্যাশ করতে পারে। ক্যাশিং
সক্রিয় থাকলে, অ্যাগ্রেসিভ কম্প্রেশন আসলে কর্মক্ষমতার **ক্ষতি** করতে পারে,
কারণ এটি ক্যাশ করা টোকেন পরিবর্তন করে ক্যাশটি অকার্যকর করে দেয়।

`cachingAware.ts` মডিউলটি **ক্যাশিং কনটেক্সট শনাক্ত** করে এবং
সেই অনুযায়ী **কম্প্রেশন কৌশল সমন্বয়** করে এই সমস্যার সমাধান করে।

#### এটি যেভাবে কাজ করে

1. **ক্যাশিং কনটেক্সট শনাক্ত করা** — রিকোয়েস্ট বডিতে `cache_control` মার্কার স্ক্যান করে
2. **ক্যাশিং প্রোভাইডার শনাক্ত করা** — লক্ষ্য প্রোভাইডার ক্যাশিং সমর্থন করে কি না পরীক্ষা করে
3. **কৌশল সমন্বয় করা** — ক্যাশিং প্রোভাইডারের জন্য `aggressive`/`ultra`-কে `standard`-এ নামিয়ে আনে
4. **সিস্টেম প্রম্পট বাদ দেওয়া** — সিস্টেম প্রম্পট সাধারণত ক্যাশ করা থাকে, তাই সেগুলো কম্প্রেস করা হয় না

কৌশল-সহায়কটি একটি `deterministicOnly` ফ্ল্যাগও ফেরত দেয়, কিন্তু প্ল্যান বিল্ডার
শুধু কৌশলটিই ব্যবহার করে — বর্তমানে পরবর্তী ধাপের কিছুই ফ্ল্যাগটি পড়ে না।

#### কোডের উদাহরণ

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← ক্যাশ মার্কার
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### কখন ব্যবহার করবেন

ক্যাশ-অ্যাওয়ার কম্প্রেশন **সবসময় চালু থাকে** — কোনো কনফিগারেশনের প্রয়োজন নেই। যখনই
কম্প্রেশন চালু থাকে এবং লক্ষ্য প্রোভাইডার প্রম্পট ক্যাশিং সমর্থন করে (Anthropic, OpenAI,
ইত্যাদি), তখনই এটি কার্যকর হয়; সুস্পষ্ট `cache_control` মার্কারের প্রয়োজন নেই — শুধু কোনো ক্যাশিং
প্রোভাইডার থাকলেই ডাউনগ্রেড শুরু হয়, আর শুধু মার্কার থাকলে কখনোই তা হয় না (মার্কার শনাক্তকরণ ক্যাশ
টেলিমেট্রিতে তথ্য দেয়, কৌশল নির্ধারণে নয়)।

### প্রগ্রেসিভ এজিং

দীর্ঘ কথোপকথনে অনেক মেসেজ টার্ন জমা হয়, কিন্তু পুরোনো টার্নগুলো ক্রমে কম
প্রাসঙ্গিক হয়ে পড়ে। `progressiveAging.ts` মডিউলটি **টার্নের দূরত্ব অনুযায়ী মেসেজের বিশদতা কমায়**
(কথোপকথনের শেষ থেকে দূরত্ব পরিমাপ করা হয়)। প্রকাশিত ডিফল্ট মান অনুযায়ী
(`verbatim: 2, light: 2, moderate: 3`):

- **শেষ 2টি টার্ন (দূরত্ব ≤ 2)**: হুবহু রাখা হয়
- **দূরত্ব 3**: Caveman কম্প্রেশন (অপ্রয়োজনীয় শব্দ অপসারণ)
- **দূরত্ব 4+**: Assistant-এর বার্তাগুলো সংক্ষেপ করা হয়; user-এর বার্তাগুলো তাদের প্রথম
  লাইনে সীমিত করা হয়, সর্বোচ্চ 120 অক্ষর পর্যন্ত; অন্য ভূমিকাগুলো অপরিবর্তিত থাকে। দূরত্ব নির্বিশেষে System prompt, ইতিমধ্যে পুরোনো হয়ে যাওয়া
  বার্তা এবং সর্বশেষ user বার্তা সবসময় হুবহু রাখা হয়।
  কোনো কিছুই পুরোপুরি বাদ দেওয়া হয় না, এবং সরবরাহকৃত ডিফল্টগুলোর ক্ষেত্রে `light`
  ব্যান্ডে পৌঁছানো যায় না (`light` এবং `verbatim` সমান)।

#### কোডের উদাহরণ

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... আরও 50টি টার্ন ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // শেষ 3টি টার্ন: হুবহু
  light: 8, // দূরত্ব <= 8: হালকা কম্প্রেশন
  moderate: 20, // দূরত্ব <= 20: caveman কম্প্রেশন
  fullSummary: 5, // টাইপের জন্য আবশ্যক, ব্যান্ডিং কোড এটি পড়ে না
  // দূরত্ব > 20: সংক্ষেপ করা হয় (assistant) / প্রথম লাইন রাখা হয় (user)
});

// saved = সাশ্রয় হওয়া টোকেনের সংখ্যা
```

#### কখন ব্যবহার করবেন

`aggressive` মোডে Progressive aging **সবসময় চালু** থাকে — এটি
`compressAggressive()`-এর দ্বিতীয় ধাপ। Ultra মোড এটি চালায় না। এটি
বিশেষভাবে কার্যকর:

- দীর্ঘ সময় ধরে চলা কোডিং সেশনে
- একাধিক দিনব্যাপী কথোপকথনে
- অনেক tool call-সহ Agentic workflow-তে

### Caveman Output Mode

Caveman output mode এমন **system prompt নির্দেশনা** যোগ করে, যা মডেলটিকেই
সংক্ষিপ্ত আউটপুট দিতে বলে — `lite` স্তরটি পূর্ণ বাক্য বজায় রেখে সংক্ষিপ্ত উত্তর দিতে বলে, `full`
স্তরটি তাকে "বুদ্ধিমান গুহামানবের মতো সংক্ষেপে উত্তর দিতে" বলে, এবং `ultra` টেলিগ্রাফিক আউটপুট দিতে বলে;
নির্দেশনা শুধু অনুরোধ করতে পারে, নিশ্চয়তা দিতে পারে না। Request-গুলো
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)-এর মাধ্যমে এগুলো পায়:
`open-sse/handlers/chatCore.ts` প্রথমে back-compat shim ব্যবহার করে নির্বাচন নির্ধারণ করে
(`open-sse/services/compression/outputStyles/backCompat.ts`-এ থাকা
`resolveOutputStyleSelection()`), যা `outputStyles`
খালি থাকাকালে সক্রিয় `cavemanOutputMode`-কে
`cavemanOutputMode.intensity`-এর `terse-prose` output style-এ ম্যাপ করে
(নিচের Back-compat দেখুন); খালি নয় এমন `outputStyles`
নির্বাচন অপরিবর্তিতভাবে ব্যবহার করা হয়, এবং তখন `cavemanOutputMode.enabled` ও `intensity`-এর কোনো
প্রভাব থাকে না, তবে এর `autoClarity` toggle তখনও প্রযোজ্য থাকে। `outputMode.ts`-এ
নির্দেশনার টেক্সট (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), content bypass এবং
injection-এ ব্যবহৃত placement helper রয়েছে; এর নিজস্ব `applyCavemanOutputMode()` injector-এর কোনো
production caller নেই।

#### এটি যেভাবে কাজ করে

এই মোড input কম্প্রেস করে না। এটি system prompt-এ একটি instruction block যোগ করে
(নিচের How injection works দেখুন), এবং request-এর জন্য নির্বাচিত যেকোনো input compression mode
এরপরও চলে—এখন block বহনকারী body-এর ওপর। প্রতিটি স্তরের শেষে থাকা অভিন্ন
boundaries clause-এর আগে, ইংরেজি `full` স্তরে লেখা থাকে:

> "বুদ্ধিমান গুহামানবের মতো সংক্ষেপে উত্তর দিন। Article (a/an/the), অপ্রয়োজনীয় শব্দ (just/really/basically/actually/simply), সৌজন্যমূলক কথা ও দ্বিধাপূর্ণ ভাষা বাদ দিন। বাক্যাংশ ব্যবহার করা যাবে। সংক্ষিপ্ত সমার্থক শব্দ ব্যবহার করুন (extensive নয় big, implement নয় fix)। সব প্রযুক্তিগত বিষয়বস্তু, code, error, URL ও identifier হুবহু রাখুন।"

এটি বিশেষভাবে ভালো কাজ করে:

- কোড তৈরিতে (আরও সংক্ষিপ্ত আউটপুট = কম টোকেন)
- দ্রুত প্রশ্নোত্তরে (বিস্তারিত ব্যাখ্যার প্রয়োজন নেই)
- Batch processing-এ (throughput সর্বাধিক করতে)

#### কখন ব্যবহার করবেন

Caveman output mode **opt-in**। Compression চালু রেখে (`enabled: true`, Compression Settings পৃষ্ঠার master toggle
চালু), `cavemanOutputMode.enabled` দিয়ে এটি চালু করুন; `intensity`
`lite`, `full` অথবা `ultra` নির্বাচন করে:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

একটি compression combo-এর **Output Mode** toggle (`outputMode`, স্তরটি `outputModeIntensity`-এ)
সেই combo প্রযোজ্য request-গুলোর জন্য একই switch সেট করে, এবং
`omniroute_set_compression_engine` MCP tool তার boolean `outputMode`
argument-এর মাধ্যমে এটি লেখে। খালি নয় এমন `outputStyles` নির্বাচন এই switch-এর চেয়ে অগ্রাধিকার পায়। Dashboard-এ
**Terse prose** output style সক্রিয় করলে একই block inject হয় (নিচের Output
Styles দেখুন)।

### Output Styles (ক্যাটালগ)

উপরের Caveman output mode হলো **পুরোনো single-style path**। Phase 4 এটিকে সাধারণীকরণ করে
সমন্বয়যোগ্য output style-এর একটি ক্যাটালগে রূপ দিয়েছে:
`open-sse/services/compression/outputStyles/catalog.ts`-এ থাকা `OUTPUT_STYLE_CATALOG`। প্রতিটি style হলো একটি system-prompt
নির্দেশনা, যা মডেলটিকেই কম ব্যয়বহুল আউটপুট দিতে বলে; style-গুলো একসঙ্গে সক্রিয় করা যায়
এবং সেগুলো catalog order অনুযায়ী inject হয়।

| স্টাইল                    | `id`          | এটি কী করে                                                                                                                                                                                                                 | নির্দেশনার ভাষা                               |
| ------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| সংক্ষিপ্ত গদ্য            | `terse-prose` | অপ্রয়োজনীয় কথা/আর্টিকেল/দ্বিধাসূচক ভাষা বাদ দেয়; প্রযুক্তিগত বিষয়বস্তু হুবহু রাখে। লিগ্যাসি caveman আউটপুট মোডের একই টেক্সট (রেফারেন্স করা হয়েছে, পুনরায় টাইপ করা হয়নি)।                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| কম কোড                    | `less-code`   | YAGNI ধাপ: কার্যকর ক্ষুদ্রতম পরিবর্তন, অনুরোধ না করা কোনো বিমূর্তায়ন নয়।                                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| পনিটেইল (অলস সিনিয়র ডেভ) | `ponytail`    | "সেরা কোড হলো সেই কোড, যা কখনো লেখাই হয়নি": পুনঃব্যবহার > পুনর্লিখন, মূল কারণ > উপসর্গ, কার্যকর সবচেয়ে ছোট diff।                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| আমার ADHD আছে (কাজ আগে)   | `i-have-adhd` | কাজ আগে (গদ্যের আগে কমান্ড/পাথ/স্নিপেট), সংখ্যাযুক্ত সীমিত ধাপ, একটি সুনির্দিষ্ট পরবর্তী ধাপ, কোনো ভূমিকা/পুনরালোচনা/সমাপ্তিসূচক কথা নয়। [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) থেকে অভিযোজিত। | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| সংক্ষিপ্ত CJK (文言)      | `terse-cjk`   | `full`/`ultra` উত্তর ধ্রুপদি চীনা ভাষায় (文言); `lite` শুধু function word, সৌজন্যমূলক কথা বা অলংকরণ ছাড়া সংক্ষিপ্ত উত্তর চায়।                                                                                           | zh (লোকেল-নিয়ন্ত্রিত, নিচে দেখুন)            |

প্রতিটি স্টাইলের সঙ্গে তিনটি তীব্রতার স্তর — `lite`, `full`, `ultra` — দেওয়া হয় এবং প্রতিটি স্তর
অভিন্ন সীমা-সংক্রান্ত ধারা (`outputMode.ts`-এ `SHARED_BOUNDARIES`) দিয়ে শেষ হয়, যা
কোড ব্লক, ফাইল পাথ, কমান্ড, ত্রুটি এবং URL হুবহু রাখে। `terse-prose` এবং
`terse-cjk` স্তরের টেক্সট ওই তালিকায় identifier-ও যোগ করে।

`terse-cjk` দুটি স্থানে `zh` লোকেলের মধ্যে সীমাবদ্ধ। Compression Settings পৃষ্ঠা
কেবল তখনই এর সারি দেখায়, যখন ড্যাশবোর্ড UI-এর ভাষা চীনা (`zh-CN` বা `zh-TW`) হয়, এবং
`applyOutputStyles()` কেবল তখনই এটি ইনজেক্ট করে, যখন অনুরোধের নির্ধারিত ভাষা (নিচের Language
selection দেখুন) `zh` হয়। সারিটি লুকিয়ে রাখলে সংরক্ষিত `terse-cjk` নির্বাচন মুছে যায় না:
settings API যেকোনো style id গ্রহণ করে, এবং পৃষ্ঠায় অন্য স্টাইল সংরক্ষণ করলেও এটি বজায় থাকে। অনুরোধের
সময় `applyOutputStyles()`-এর ভাষা যাচাইই একমাত্র লোকেল গেট।

#### ইনজেকশন কীভাবে কাজ করে

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) catalog-এর
বিপরীতে নির্বাচনটি নির্ধারণ করে (অজানা id এবং লোকেলের সঙ্গে না-মেলা স্টাইল বাদ দেওয়া হয়,
কখনোই ত্রুটি হয় না; কোনো স্টাইলে নির্ধারিত না হওয়া নির্বাচন body অপরিবর্তিত রাখে,
`no_styles` হিসেবে এড়িয়ে যায়), নির্বাচিত নির্দেশনাগুলো catalog-এর ক্রমে
সংযুক্ত করে,
সীমা-সংক্রান্ত ধারাটি **একবার** যোগ করে (সঙ্গে নিরাপত্তা-সংক্রান্ত ধারা, `SAFETY_BOUNDARIES` বা এর
অনুবাদ, যখন `less-code` বা `ponytail` নির্বাচিত থাকে), এবং ব্লকটি একটি
মাত্র idempotency marker (`[OmniRoute Output Styles]`) দিয়ে শুরু করে, তাই পুনরায় প্রয়োগ করলে কিছুই হয় না। যখন
নির্ধারিত ভাষার (নিচের Language selection দেখুন) অনুবাদ থাকে, তখন ইংরেজির পরিবর্তে স্থানীয় ভাষার
নির্দেশনা ইনজেক্ট করা হয়।

non-empty `messages` array-সহ body-তে idempotency যাচাইটি
content bypass-এর আগে চলে: যখন `[OmniRoute Output Styles]` marker ইতিমধ্যে top-level
`system` field-এ (string বা content-block array) অথবা string
content-সহ system message-এ থাকে, তখন body-টি `already_applied` হিসেবে অপরিবর্তিত রাখা হয় এবং কোনো keyword যাচাই চালানো হয় না।
অন্যথায় একটি content bypass (`shouldBypassCavemanOutputMode()`,
`open-sse/services/compression/outputMode.ts`-এ) শেষ তিনটি
message-এর text যাচাই করে, সেগুলোর role যা-ই হোক, এবং সেই text যদি এর security, irreversible-action বা clarification keyword-এর সঙ্গে মেলে, অথবা
একটি ক্রম-সংবেদনশীল sequence-এর সঙ্গে মেলে, তবে পুরো turn-এর জন্য style এড়িয়ে যায়: `first`, `then`, `after that`, `before`, `rollback` বা
`backup`-এর 240 character-এর মধ্যে `delete`, `drop`, `migrate`, `deploy` বা
`release` থাকে। **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`, default-ভাবে চালু) চালু থাকা অবস্থায় bypass চলে; toggle বন্ধ করলে
keyword যাচাই এড়িয়ে যাওয়া হয়।

bypass turn-টিকে যেতে দিলে `placeSystemInstruction()` (একই file), যা
কখনো নতুন `messages[0]` তৈরি করে না, ব্লকটিকে নিচের প্রথম পাওয়া স্থানে রাখে:

1. শুরুতে থাকা string content-সহ system message: এর text-এর পরে block যোগ করা হয়।
2. top-level `system` field: string-এর text-এর পরে block যোগ করা হয়, অথবা
   content-block array-তে নতুন text block হিসেবে যোগ করা হয়।
3. পরের প্রথম string content-সহ system message: এর
   text-এর পরে block যোগ করা হয়।
4. উপরের কোনোটি নয়: `messages`-এর শেষে একটি নতুন system message-এ block রাখা হয়।

`messages` array-বিহীন (বা empty array-সহ) body-তে কোনো content bypass চলে না এবং
top-level `system` field বিবেচনা করা হয় না। string `instructions` field-এর text-এর পরে block যোগ করা হয়,
যদি না ওই field-এ ইতিমধ্যে
`[OmniRoute Output Styles]` marker থাকে; সে ক্ষেত্রে body-টি
`already_applied` হিসেবে অপরিবর্তিত রাখা হয়। body-তে string `instructions` field না থাকলেও `input`
(string বা array) থাকলে block-টি `instructions` হয়ে যায় এবং ওই field-এ আগে থাকা যেকোনো non-string value
প্রতিস্থাপন করে। string `instructions` field অথবা string বা array
`input`—কোনোটিই নেই এমন body অপরিবর্তিত থাকে এবং `no_messages` হিসেবে এড়িয়ে যাওয়া হয়।

#### কীভাবে সক্রিয় করবেন

ড্যাশবোর্ডে: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles বিভাগে: প্রতিটি স্টাইলের জন্য একটি করে সারি, যেখানে একটি on/off
টগল এবং একটি লেভেল নির্বাচক রয়েছে। কম্প্রেশন নিজে চালু থাকা অবস্থায় স্টাইলগুলো ইনজেক্ট হয় (পৃষ্ঠার
মাস্টার টগল, `enabled`)। **Auto-Clarity Bypass** টগলটি **Caveman**
পৃষ্ঠায় (`/dashboard/context/caveman`), এর **Output Mode** কার্ডে রয়েছে। প্রোগ্রামগতভাবে,
কম্প্রেশন কনফিগ নির্বাচনটি এভাবে সংরক্ষণ করে:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

পশ্চাৎ-সামঞ্জস্য: `outputStyles` খালি থাকা অবস্থায়, লিগ্যাসি `cavemanOutputMode.enabled`
সেটিংটি `cavemanOutputMode.intensity`-এ `terse-prose` হিসেবে ম্যাপ হয়। এরপর ব্লকটি
`[OmniRoute Output Styles]` মার্কার দিয়ে শুরু হয়, যেখানে লিগ্যাসি `applyCavemanOutputMode()`
ইনজেক্টর `[OmniRoute Caveman Output Mode]` লিখত। মার্কারের নিচে, টেক্সটটি en, pt-BR, es, de, fr, it, ru, id এবং vi-তে
লিগ্যাসি ইনজেকশনের সঙ্গে মেলে; ja এবং zh-তে boundaries clause-এর আগে একটি
অতিরিক্ত স্পেস থাকে। `terse-prose` pt-BR, es, de,
fr, it, ru, zh, ja, id এবং vi-তে অনূদিত হয়, তাই resolved language `hu` হওয়া কোনো রিকোয়েস্ট
ইংরেজি টেক্সট পায়, যেখানে লিগ্যাসি ইনজেক্টর তার হাঙ্গেরীয় টেক্সট ব্যবহার করত।

Output-style ভাষা নির্বাচন (`outputStyles/apply.ts`-এ
`resolveOutputStyleLanguage()`): `languageConfig.enabled` চালু থাকলে, `autoDetect` রিকোয়েস্টের
`messages` অ্যারেতে টেক্সট থাকা সর্বশেষ user message-এর নমুনা নেয় (স্ট্রিং কনটেন্ট, অথবা
এর content parts-এর `text`) এবং সেটির ওপর Caveman ইঞ্জিনের ডিটেক্টর
(`detectCompressionLanguage()`) চালায়। টেক্সটে Han
অক্ষর থাকলে এবং কোনো kana না থাকলে ডিটেক্টর `zh` ফেরত দেয়; অন্যথায় `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` এবং `id`-এর মধ্যে যেটিতে সবচেয়ে বেশি hint match রয়েছে সেটি ফেরত দেয়, আর কোনোটি না মিললে
`en` ফেরত দেয় — যে টেক্সট এটি শ্রেণিবদ্ধ করতে পারে না তা English পায়, কখনোই `defaultLanguage` নয়, এবং স্টাইলগুলোতে
`vi` টেক্সট থাকলেও `vi` কখনো শনাক্ত হয় না। Responses API body তার turn-গুলো
`input`-এ রাখে, যা নমুনায় নেওয়া হয় না, তাই এটি `defaultLanguage`, তারপর English পায়। `messages`-এ কোনো user
message-এ টেক্সট না থাকলে, অথবা `autoDetect` বন্ধ থাকলে, `defaultLanguage` প্রয়োগ হয়,
তারপর English। `languageConfig.enabled` বন্ধ থাকলে, ভাষা হয় English — যদি না রিকোয়েস্টে
কোনো compression combo প্রযোজ্য হয় (রিকোয়েস্টের routing
combo-তে নির্ধারিত কোনো combo, অথবা বিল্ট-ইন stacked
pipeline-এর জন্য chatCore যে default compression combo-তে fallback করে): কোনো combo প্রয়োগ করলে সেই রিকোয়েস্টের জন্য `languageConfig.enabled` চালু হয় এবং
combo-র language packs থেকে `defaultLanguage` সেট হয় (সংরক্ষিত মানটি combo-র pack-গুলোর একটি হলে সেটি,
অন্যথায় combo-র প্রথম pack, যা ডিফল্টভাবে `en`), আর সংরক্ষিত `autoDetect` (ডিফল্টভাবে চালু)
তবুও প্রযোজ্য থাকে। Caveman input engine তার
rule-pack ভাষা ভিন্নভাবে বেছে নেয় — প্রতিটি text part অনুযায়ী এবং, auto-detect বন্ধ থাকলে,
`enabledPacks` দ্বারা নিয়ন্ত্রিত হয়ে।

style × language ম্যাট্রিক্সটি
`tests/unit/compression/output-styles-i18n-matrix.test.ts` দ্বারা নির্ধারিত: প্রতিটি catalog style-এর জন্য
টেস্টের `BASELINE_LANGUAGES`-এ একটি entry থাকতে হবে; locale-gated নয় এমন কোনো style-এ অবশ্যই
একটি pt-BR অনুবাদ থাকতে হবে (locale-gated `terse-cjk` এই নিয়ম থেকে অব্যাহতি পায়), যদি না সেটি
`KNOWN_ENGLISH_ONLY`-তে তালিকাভুক্ত থাকে, যেখানে কেবল একেবারেই কোনো অনুবাদ নেই এমন style রাখা যেতে পারে —
তালিকাভুক্ত কোনো style-এ যেকোনো অনুবাদ থাকলে টেস্ট ব্যর্থ হয়; এবং কোনো style-এর
`BASELINE_LANGUAGES` entry-তে তালিকাভুক্ত কোনো ভাষা হারিয়ে গেলে সেই style-এর টেস্ট ব্যর্থ হয়। কোনো style যোগ করতে,
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) দেখুন।

### Tool Result Compression

`open-sse/services/compression/toolResultCompressor.ts`-এ `compressToolResult()`
**5টি strategy** দিয়ে tool-result টেক্সট কম্প্রেস করে। এটি এই ক্রমে সেগুলো চেষ্টা করে, এবং যেটি প্রথম enabled strategy
হিসেবে content-এর সঙ্গে check-এ মেলে, সেটিই ফলাফল নির্ধারণ করে:

1. **`fileContent`**: 3 বা তার বেশি লাইনের এমন কনটেন্ট, যেখানে অন্তত একটি লাইন প্রারম্ভিক
   ইন্ডেন্টেশন উপেক্ষা করে `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` বা `return ` (কীওয়ার্ডের পরে একটি স্পেস) দিয়ে শুরু হয়, অথবা `if`,
   `for` বা `while`-এর পরে `(` বা ` (` থাকে; এটি প্রথম 20টি ও শেষ 5টি লাইন রেখে দেয় এবং
   বাদ দেওয়া মাঝের অংশটি চিহ্নিত করে।
2. **`grepSearch`**: এমন কনটেন্ট, যেখানে অন্তত একটি লাইন `<path>:<digits>:` আকারের,
   যেখানে প্রথম কোলনের আগের টেক্সটে কোনো হোয়াইটস্পেস নেই; এটি শুধু সেই লাইনগুলো রাখে,
   সর্বোচ্চ 30টি, এরপর অতিরিক্ত ম্যাচের সংখ্যা এবং ম্যাচ হওয়া ফাইলগুলোর তালিকা দেয়;
   অন্য সব লাইন বাদ দেওয়া হয়। কৌশলটি সক্রিয় করতে এমন একটি লাইনই যথেষ্ট, তাই
   `12:30:45`-এর মতো টাইমস্ট্যাম্প দিয়ে শুরু হওয়া লগ লাইনও গণ্য হয়।
3. **`shellOutput`**: এমন আউটপুট, যাতে একটি ANSI CSI সিকোয়েন্স (`ESC[`-এর পরে সংখ্যা বা
   সেমিকোলন এবং তারপর একটি অক্ষর, যেমন কালার কোডে) অথবা টেক্সটের যেকোনো স্থানে `$`-এর পরে
   হোয়াইটস্পেস থাকে, সেটি ওই সিকোয়েন্সগুলো হারায় (অন্যান্য এস্কেপ, যেমন `ESC[?25l` বা
   একটি OSC উইন্ডো-টাইটেল সিকোয়েন্স, রাখা হয়) এবং এর শেষ 50টি লাইন রাখে, পাশাপাশি
   পরপর পুনরাবৃত্ত লাইনগুলো সংকুচিত করে। যেহেতু এই যাচাইটি `json` ও `errorMessage`-এর আগে চলে,
   তাই এমন `$` থাকা JSON বা ত্রুটি আউটপুট `shellOutput` চালু থাকলে কখনো সেগুলো পর্যন্ত
   পৌঁছায় না।
4. **`json`**: 2,000 অক্ষরের বেশি দৈর্ঘ্যের এমন একটি JSON পেলোড, যা ঐচ্ছিক হোয়াইটস্পেসের
   পরে `{` বা `[` দিয়ে শুরু হয় এবং সফলভাবে পার্স হয়, সেটির সারসংক্ষেপ করা হয়: 7টির বেশি
   আইটেমের একটি অ্যারে তার প্রথম 5টি ও শেষ 2টি আইটেম এবং মোট সংখ্যা রাখে, আর একটি অবজেক্ট
   তার প্রথম 20টি key রাখে; প্রতিটি নেস্টেড অবজেক্ট বা অ্যারে ভ্যালুকে একটি `{…N keys}`
   প্লেসহোল্ডার দিয়ে প্রতিস্থাপন করা হয় (অ্যারের ক্ষেত্রে N হলো এর দৈর্ঘ্য), এবং প্রথম 20টির
   পরে বাদ দেওয়া key-এর সংখ্যা বোঝাতে একটি `_remaining_<N>_keys` মার্কার যোগ করা হয়।
   স্কেলার ভ্যালুগুলো সম্পূর্ণ কপি করা হয়, তাই কোনো নেস্টেড ভ্যালু ছাড়া 20টি বা তার কম key-এর
   অবজেক্ট শুধু নতুন করে ইন্ডেন্ট করা হয় — মিনিফাই করা অবজেক্টে অক্ষর বেড়ে যায় এবং সেটি
   অপরিবর্তিত থাকে।
5. **`errorMessage`**: এমন আউটপুট, যাতে যেকোনো স্থানে এবং বড়-ছোট অক্ষরের যেকোনো বিন্যাসে
   `error:`, `error ` (শব্দটির পরে একটি স্পেস, যেমন `no error found`-এ), `[error]`,
   `exception:`, `exception `, `[exception]` বা `traceback` থাকে, সেটি প্রথম লাইন,
   পরের 10টি লাইন এবং শেষ 3টি লাইন রাখে; মাঝের লাইনগুলোর জায়গায় একটি
   `… [N frames elided] …` মার্কার বসানো হয়। প্রথম লাইনের পরে 13টির বেশি লাইন থাকলেই
   শুধু মার্কারটি দেখা যায়, তাই 14 লাইন বা তার কম ত্রুটি আউটপুট সংক্ষিপ্ত করা হয় না
   (12 বা 13 লাইনের ক্ষেত্রে শেষ 3টি লাইন ইতিমধ্যে রাখা লাইনগুলোকেই পুনরাবৃত্তি করে)।

কোনো কৌশল ম্যাচ করার পর, এমনকি সেটি কিছুই সাশ্রয় না করলেও, পরের কৌশলগুলো আর
চেষ্টা করা হয় না। ম্যাচ করা কৌশলটি আনুমানিক কোনো টোকেন সাশ্রয় না করলে (দৈর্ঘ্য ÷ 4,
ঊর্ধ্বমুখী পূর্ণসংখ্যায় রাউন্ড করা) — যেমন 25 লাইন বা তার কমের কোড-সদৃশ ফাইল, অথবা
2,000 অক্ষরের বেশি কিন্তু 7টি বা তার কম আইটেমের JSON অ্যারে — aggressive ইঞ্জিন মূল
টুল ফলাফলটিই রাখে: উভয় কলার (`compressAggressive()` এবং
`compressAnthropicToolResultBlock()`) `saved` 0 বা তার কম হলে মূলটি রাখে, যদিও
`compressToolResult()` নিজে তখনও ওই কৌশলের আউটপুট ফেরত দেয়। টুল-ফলাফল ধাপটিই চূড়ান্ত
নয়: ইঞ্জিনের ফলব্যাক সারসংক্ষেপকারী এখনও 8,192 অক্ষরের বেশি দৈর্ঘ্যের `tool` বা
`function` মেসেজ (`maxTokensPerMessage`, 2,048, গুণ 4) সংক্ষিপ্ত করতে পারে।

#### কখন ব্যবহার করবেন

টুল ফলাফল কম্প্রেশন হলো aggressive ইঞ্জিনের ধাপ 1 (`open-sse/services/compression/aggressive.ts`-এ
`compressAggressive()`), তাই এটি Aggressive মোডে এবং স্ট্যাক করা পাইপলাইনের একটি
`aggressive` ধাপে চলে। এটি OpenAI-আকৃতির `tool` ও `function` মেসেজ এবং Anthropic
`tool_result` ব্লকের ভেতরের টেক্সট কম্প্রেস করে। প্রতিটি কৌশলের জন্য
`aggressive.toolStrategies`-এর অধীনে নিজস্ব সুইচ রয়েছে, যেগুলো ডিফল্টভাবে চালু।
ড্যাশবোর্ডে, কম্প্রেশন চালু থাকা এবং ডিফল্ট মোড Aggressive হলে সুইচগুলো Caveman
পেজের **Advanced** ভিউতে থাকে।

### স্ট্যাক করা পাইপলাইন

স্ট্যাক করা মোডে **একাধিক ইঞ্জিন ধারাবাহিকভাবে** চলে — সাধারণত প্রথমে RTK
(টুল আউটপুটে 60-90% সাশ্রয়), এরপর অবশিষ্ট টেক্সটে Caveman (~46% ইনপুট
সাশ্রয়)। সম্মিলিতভাবে, এটি **78-95% যোগ্য পরিসর** (উপরের Upstream Savings Math
দেখুন): `1 - (1 - 0.60..0.90) × (1 - 0.46)`-এর গড় ≈89%।

#### এটি যেভাবে কাজ করে

```
ইনপুট (1000 টোকেন)
  → RTK (কমান্ড-সচেতন ফিল্টার) → 200 টোকেন
    → Caveman (অপ্রয়োজনীয় অংশ অপসারণ) → 108 টোকেন
  → আউটপুট (108 টোকেন, ~89% সাশ্রয়)
```

#### কখন ব্যবহার করবেন

স্ট্যাক করা মোড ব্যবহার করুন:

- টুল-নির্ভর ওয়ার্কফ্লোর জন্য (এজেন্টিক কোডিং, গবেষণা)
- খরচ-সংবেদনশীল ব্যাচ প্রসেসিংয়ের জন্য
- যখন আপনার সর্বোচ্চ টোকেন সাশ্রয় প্রয়োজন

স্ট্যাক করা পাইপলাইনগুলো গ্লোবাল `stackedPipeline` কম্প্রেশন সেটিংয়ের মাধ্যমে,
অথবা কোনো রাউটিং কম্বোতে নির্ধারিত নামযুক্ত কম্প্রেশন কম্বোর মাধ্যমে কনফিগার করা হয়
(উপরের Per-Combo Override দেখুন) — কোনো অটো-কম্বো `modePack`-এর মাধ্যমে নয় (ওই
ফিল্ডটি শুধু অটো-কম্বো মডেল নির্বাচনের ওজন পুনর্নির্ধারণ করে, এবং `stacked` কোনো
বৈধ প্যাকের নাম নয়)।

---

## কম্প্রেশন কম্বো ওভাররাইড

বিভিন্ন ব্যবহারের ক্ষেত্রে আচরণ সূক্ষ্মভাবে সামঞ্জস্য করতে আপনি গ্লোবাল কম্প্রেশন মোডটি **প্রতিটি কম্বোর জন্য আলাদাভাবে** ওভাররাইড করতে পারেন:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

এটি যেসব ক্ষেত্রে উপযোগী:

- **কোডিং কম্বো**: দীর্ঘ সেশনের জন্য `aggressive` মোড ব্যবহার করুন
- **দ্রুত প্রশ্নোত্তর কম্বো**: দ্রুত প্রতিক্রিয়ার জন্য `lite` মোড ব্যবহার করুন
- **টুল-নির্ভর কম্বো**: সর্বোচ্চ সাশ্রয়ের জন্য `stacked` মোড ব্যবহার করুন
- **প্রোডাকশন কম্বো**: ক্যাশিং প্রোভাইডারের ক্ষেত্রে ওভাররাইড বন্ধ রাখুন — সর্বদা সক্রিয়
  ক্যাশ-সচেতন সমন্বয় স্বয়ংক্রিয়ভাবে `aggressive`/`ultra`-কে `standard`-এ নামিয়ে আনে
  (নির্বাচনযোগ্য কোনো `cache-aware` মোড নেই)

---

## আরও দেখুন

- [এনভায়রনমেন্ট কনফিগ](../reference/ENVIRONMENT.md) — কম্প্রেশন এনভায়রনমেন্ট ভেরিয়েবল
- [আর্কিটেকচার গাইড](../architecture/ARCHITECTURE.md) — কম্প্রেশন পাইপলাইনের অভ্যন্তরীণ কার্যপ্রণালি
- [ব্যবহারকারী নির্দেশিকা](../guides/USER_GUIDE.md) — কম্প্রেশন ব্যবহার শুরু করা
- [RTK কম্প্রেশন](./RTK_COMPRESSION.md) — RTK ফিল্টার, ট্রাস্ট মডেল, ভেরিফাই গেট, র-আউটপুট পুনরুদ্ধার
- [কম্প্রেশন ইঞ্জিন](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, ড্যাশবোর্ড
- [কম্প্রেশন রুলস ফরম্যাট](./COMPRESSION_RULES_FORMAT.md) — JSON রুল-প্যাক ফরম্যাট
- [কম্প্রেশন ল্যাঙ্গুয়েজ প্যাক](./COMPRESSION_LANGUAGE_PACKS.md) — ভাষা-নির্দিষ্ট Caveman নিয়মাবলি
