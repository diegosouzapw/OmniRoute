# Release-Green: keeping the queue and release branch green (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## এটি যে সমস্যার সমাধান করে

**সম্পূর্ণ গেট** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) **শুধু release PR-এ** (PR → `main`) চলে। `release/**`-কে লক্ষ্য করা PR-গুলো
**fast-gates** (`quality.yml`: TIA-প্রভাবিত tests + typecheck + lint) পায়
এবং, code পরিবর্তনের ক্ষেত্রে, একটি **পরামর্শমূলক** production build পায়। ফলস্বরূপ: শুধু release-এ দেখা দেওয়া red-গুলো
release branch-এ নীরবে জমতে পারে এবং release-এর সময় **প্রায় ৪০ মিনিটের স্তরে স্তরে বিস্ফোরিত হতে পারে**,
একটির পর একটি।

"release-green family"-এর উদ্দেশ্য হলো সেই red-গুলো **আগে থেকেই অনুমান করা** — যেকোনো সময় পূর্ণ
গেটের সমতুল্য যাচাই **স্থানীয়ভাবে / release-এর বাইরে** করা, যাতে release PR তার প্রথম CI run-এই
green থাকে।

> **আপসহীন নীতি:** এর কোনো কিছুই contributor-কে বাধা দেয় না। আমরা এমন কোনো আবশ্যিক
> check যোগ করি না, যা তাদের PR ব্যর্থ করে। **drift** (ratchets) release-এর সময় maintainer-এর rebaseline করার বিষয় —
> এটি কখনোই contributor-এর উদ্বেগ নয়। কোনো অংশই PR **বন্ধ করে না** (credit theft), কিংবা
> pass করানোর জন্য কোনো test **দুর্বল করে না**।

## এই family (৪টি অংশ) — এবং প্রতিটি কীভাবে স্বাধীনভাবে চলে

| অংশ                                                                        | এটি কী                                                                                      | কখন চালাতে হবে                                                                 | পরিধি                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------- |
| **`/green-prs`** (Solution A)                                              | maintainer-এর চাহিদামতো **খোলা PR-এর queue** scan করা                                       | **স্বাধীনভাবে, পর্যায়ক্রমে** — এবং বিশেষত `/generate-release` চালানোর **আগে** | সম্পূর্ণ PR queue → `release/**`  |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | Validation engine: একটি branch অথবা merge candidate-এর বিপরীতে সম্পূর্ণ gate পুনরুৎপাদন করে | স্বাধীনভাবে, যেকোনো সময়                                                       | একটি নির্দিষ্ট branch বা merge-PR |
| **`/babysit <PR#>`**                                                       | **একটি** PR-এর **live CI**-কে green অবস্থায় নিয়ে যায়                                     | স্বাধীনভাবে, প্রতিটি PR-এর জন্য                                                | একটি একক PR                       |
| **`nightly-release-green.yml`** (Solution D)                               | স্বয়ংক্রিয় nightly workflow; HARD red হলে issue খোলে                                      | স্বয়ংক্রিয় (cron)                                                            | সক্রিয় release branch            |

**"এটি কি শুধু release-এর জন্য?"—এর সংক্ষিপ্ত উত্তর:** **না।** `/green-prs` এমনভাবে তৈরি করা হয়েছে, যাতে এটি
**release-গুলোর মধ্যবর্তী সময়ে পর্যায়ক্রমে** চালানো যায়। স্বাধীনভাবে চালানোই স্বাভাবিক ব্যবহার — release হলো শুধু
সেই মুহূর্ত, যখন এটি চালানো সবচেয়ে বেশি মূল্য দেয়।

## PR-থেকে-রিলিজ পরামর্শমূলক বিল্ড

`quality.yml` এখন নন-ড্রাফট কোড PR এবং Mergify কিউ ব্রাঞ্চগুলোর জন্য `Build (advisory)` অন্তর্ভুক্ত করে।
এটি `ci.yml`-এর প্রোডাকশন বিল্ড রেসিপি অনুসরণ করে: Node 24, `npm-ci-retry`,
`check:node-runtime`, এবং `OMNIROUTE_USE_TURBOPACK=1` সহ `npm run build`। এটি ইচ্ছাকৃতভাবে
কোনো বিল্ড আর্টিফ্যাক্ট আপলোড করে না, কারণ এই ওয়ার্কফ্লোতে পরবর্তী কোনো কোয়ালিটি জব সেটি ব্যবহার করে না।
এক সপ্তাহ স্থিতিশীল release-PR রান হওয়ার পর `continue-on-error` সরিয়ে দিন, যাতে সংকেতটি একটি
ব্লকিং PR-থেকে-রিলিজ গেটে পরিণত হয়।

## সমাধান C — `npm run check:release-green` (ইঞ্জিন)

বর্তমান ওয়ার্কিং ট্রির বিপরীতে রিলিজ-সমতুল্য যাচাইকরণ পুনরুৎপাদন করে এবং প্রতিটি ব্যর্থতাকে শ্রেণিবদ্ধ করে:

- **HARD** (typecheck, lint ত্রুটি, unit, vitest, db-rules, public-creds, ঐচ্ছিক
  `package-artifact`) → **প্রকৃত ত্রুটি**; `exit 1`। সোর্স ব্রাঞ্চে সংশোধন করা হয় (TDD, নিয়ম #18)।
- **DRIFT** (eslint **সতর্কতা**, cognitive-complexity, file-size) → চক্রে জমা হওয়া ratchet drift,
  **অবদানকারীর দোষ নয়**; এটি শুধু রিপোর্ট করা হয় এবং **রিলিজের সময় রক্ষণাবেক্ষণকারী পুনরায় বেসলাইন করেন**।
  Drift **কখনোই** exit code পরিবর্তন করে না — তাই এটি কাউকে কখনো ব্লক করে না।

```bash
npm run check:release-green                 # বর্তমান ব্রাঞ্চ (ওয়ার্কিং ট্রি)
node scripts/quality/validate-release-green.mjs --json   # কাঠামোবদ্ধ আউটপুট
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest এড়িয়ে যায় (শুধু drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact অন্তর্ভুক্ত করে (ধীর)
```

শুধু নির্ণয় ও **রিপোর্ট** করে (কোনো স্বয়ংক্রিয় সংশোধন নয়)। সবকিছু সফল করার অর্কেস্ট্রেশন
`/green-prs` এবং `/review-prs`-এ রয়েছে।

## সমাধান A — `/green-prs` (কিউ স্ক্যান)

পদ্ধতি (সারাংশ — বিস্তারিত জানতে `green-prs` skill দেখুন):

1. সক্রিয় রিলিজ ব্রাঞ্চের বিপরীতে খোলা PR-এর কিউ **তালিকাভুক্ত** করুন।
2. প্রতিটি PR **বাছাই** করুন (উপযুক্ত / প্রত্যাখ্যানযোগ্য / লেখকের পদক্ষেপ প্রয়োজন) — প্রত্যাখ্যানযোগ্য/লেখকের পদক্ষেপ প্রয়োজন এমন PR
   **রিপোর্ট করা হয়, বন্ধ করা হয় না** (লেখক সিদ্ধান্ত নেন)।
3. প্রতিটি উপযুক্ত PR-এর জন্য একটি **বিচ্ছিন্ন worktree**-তে (নিয়ম #19), PR-টিকে রিলিজ টিপে আনুন এবং
   `npm run check:release-green` চালান:
   - **HARD** → সহ-লেখকত্বের মাধ্যমে **অবদানকারীর ব্রাঞ্চে** সংশোধন করুন (লেখকের "Merged" স্ট্যাটাস সংরক্ষণ করে),
     সব HARD দূর না হওয়া পর্যন্ত পুনরায় চালান।
   - **DRIFT** → অপরিবর্তিত রাখুন; রিলিজের সময় এটি পুনরায় বেসলাইন করা হবে।
4. একটি PR × (রায়, HARD ব্যর্থতা, সংশোধিত?, DRIFT, এখন release-green?) টেবিল **রিপোর্ট** করুন।

মার্জ না করেই কিউ **প্রস্তুত** করতে পারে; কেবল স্পষ্টভাবে অনুরোধ করা হলেই মার্জ করে — এবং কোনো PR কখনো বন্ধ করে না।

## প্রস্তাবিত সময়সূচি

- **`/green-prs` পর্যায়ক্রমে চালান** (যেমন, সাপ্তাহিক) এবং **প্রতিটি
  `/generate-release`-এর আগে অবশ্যই** চালান।
- একটি ধারাবাহিক সংকেত হিসেবে **`nightly-release-green.yml`** (সমাধান D) রাখুন: এটি যখন একটি
  HARD ব্যর্থতার issue খোলে, তখন স্ক্যান করার সময় হয়েছে।
- কোনো ব্রাঞ্চ বা নির্দিষ্ট মার্জ প্রার্থী যাচাই করতে প্রয়োজনমতো **`/validate-release-green`** ব্যবহার করুন।
- কোনো নির্দিষ্ট PR-কে লাইভ CI-তে সফল অবস্থায় নিয়ে যেতে হলে **`/babysit <PR#>`** ব্যবহার করুন।

## রিলিজের সঙ্গে সম্পর্ক

- `/generate-release` **পর্যায় 0 (প্রাক-যাচাই)**-এ যাচাইকরণ কল করে: রিলিজ PR খোলার আগে DRIFT পুনরায় বেসলাইন করে এবং
  HARD সংশোধন করে।
- `/review-prs` মার্জের সিদ্ধান্তের ধাপে release-green গেট ব্যবহার করে (মার্জের আগে সফলতা)।

সব অংশের লক্ষ্য একই: রিলিজের দিনে 40-মিনিটের স্তরে স্তরে ব্যর্থতা সামলানোর পরিবর্তে,
**প্রথম CI রানেই একটি সফল রিলিজ PR**।
