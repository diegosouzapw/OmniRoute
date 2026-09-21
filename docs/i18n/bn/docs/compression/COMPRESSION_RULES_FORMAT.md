# Compression Rules Format (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

কম্প্রেশন নিয়মগুলো রানটাইমে লোড হওয়া JSON ফাইল। এগুলো ইচ্ছাকৃতভাবে শুধুমাত্র ডেটা হিসেবে রাখা হয়েছে, যাতে ইঞ্জিন কোড পরিবর্তন না করেই নতুন
ভাষা প্যাক এবং RTK কমান্ড ফিল্টার পর্যালোচনা করা যায়।

> **প্রামাণ্য স্কিমা (চূড়ান্ত সত্যের উৎস):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12)।
> নিচের উদাহরণগুলো কেবল ব্যাখ্যামূলক — সন্দেহ হলে, আপনার প্যাকটি `_schema.json`-এর বিপরীতে যাচাই করুন।

## Caveman নিয়ম প্যাক

Caveman নিয়ম প্যাকগুলো এখানে থাকে:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

প্রতিটি প্যাকে এমন প্রতিস্থাপন থাকে, যা সুরক্ষিত অঞ্চলগুলো আলাদা করার পর সাধারণ গদ্যে প্রয়োগ করা হয়।

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman ফিল্ডসমূহ

| ফিল্ড                    | আবশ্যক | বিবরণ                                                                    |
| ------------------------ | ------ | ------------------------------------------------------------------------ |
| `language`               | হ্যাঁ  | BCP-47-এর অনুরূপ ভাষা কী, যেমন `en`, `pt-BR`, `es`                       |
| `category`               | হ্যাঁ  | প্যাকের ক্যাটাগরি ফাইলনাম/ক্যাটাগরি, যেমন `filler` বা `dedup`            |
| `rules`                  | হ্যাঁ  | regex প্রতিস্থাপন নিয়মের অ্যারে                                         |
| `rules[].name`           | হ্যাঁ  | স্থিতিশীল নিয়মের নাম                                                    |
| `rules[].pattern`        | হ্যাঁ  | JavaScript regex সোর্স                                                   |
| `rules[].flags`          | না     | JavaScript regex ফ্ল্যাগ; ডিফল্ট `gi`                                    |
| `rules[].replacement`    | না     | প্রতিস্থাপন স্ট্রিং অথবা `replacementMap`-এ মিল না পাওয়া গেলে ফলব্যাক   |
| `rules[].replacementMap` | না     | স্বাভাবিকীকৃত মিলে যাওয়া টেক্সট দ্বারা কী করা মিল-নির্দিষ্ট প্রতিস্থাপন |
| `rules[].context`        | না     | `all`, `user`, `assistant`, অথবা `system`; ডিফল্ট `all`                  |
| `rules[].category`       | না     | `filler`, `context`, `structural`, `dedup`, `terse`, অথবা `ultra`        |
| `rules[].minIntensity`   | না     | `lite`, `full`, অথবা `ultra`; ডিফল্ট `lite`                              |
| `rules[].description`    | না     | মানুষের পাঠযোগ্য নিয়মের সারসংক্ষেপ                                      |

কেস-সংবেদনশীল মিল গুরুত্বপূর্ণ হলে `flags` ব্যবহার করুন, যেমন ছোট হাতের অক্ষরে লেখা গদ্যের আগে থাকা article অপসারণের ক্ষেত্রে,
যাতে `the OpenAI API` বাদ না যায়। একটি regex-এ একাধিক বিকল্প থাকলে এবং সেগুলোর জন্য
ভিন্ন আউটপুটের প্রয়োজন হলে `replacementMap` ব্যবহার করুন; এটি আরও সমৃদ্ধ বিল্ট-ইন TypeScript প্রতিস্থাপন ফাংশনগুলোর আচরণ
বজায় রেখে JSON নিয়ম প্যাকগুলোকে শুধুমাত্র ডেটা হিসেবে রাখে।

## RTK ফিল্টার প্যাক

RTK ফিল্টারগুলো এখানে থাকে:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

প্রতিটি ফিল্টার বর্ণনা করে কীভাবে কোনো কমান্ড-আউটপুট পরিবার শনাক্ত ও সংকুচিত করতে হবে।

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK ফিল্ডসমূহ

| ফিল্ড                      | আবশ্যক | বিবরণ                                                                           |
| -------------------------- | ------ | ------------------------------------------------------------------------------- |
| `id`                       | হ্যাঁ  | স্থিতিশীল ফিল্টার আইডি                                                          |
| `label`                    | হ্যাঁ  | ড্যাশবোর্ডে পাঠযোগ্য নাম                                                        |
| `category`                 | হ্যাঁ  | ফিল্টার পরিবার: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | না     | একাধিক ফিল্টার মিলে গেলে উচ্চতর অগ্রাধিকার জয়ী হয়                             |
| `match.outputTypes`        | না     | এই ফিল্টার নির্বাচনকারী ডিটেক্টর আউটপুট আইডি                                    |
| `match.commands`           | না     | এই ফিল্টার নির্বাচনকারী কমান্ড টোকেন                                            |
| `match.patterns`           | না     | আউটপুট টেক্সট থেকে এই ফিল্টার নির্বাচনকারী Regex প্যাটার্ন                      |
| `rules.stripAnsi`          | না     | Regex ধাপগুলোর আগে ANSI escape sequence সরিয়ে দেয়                             |
| `rules.replace`            | না     | লাইন ধরে প্রয়োগ করা ক্রমানুসারী Regex প্রতিস্থাপন                              |
| `rules.matchOutput`        | না     | ঐচ্ছিক `unless` গার্ডসহ শর্ট-সার্কিট আউটপুট নিয়ম                               |
| `rules.includePatterns`    | না     | যেসব লাইন সংরক্ষণে অগ্রাধিকার দেওয়া হবে                                        |
| `rules.dropPatterns`       | না     | অপ্রয়োজনীয় তথ্য হিসেবে সরিয়ে দেওয়ার লাইন                                    |
| `rules.collapsePatterns`   | না     | বারবার মিলে যাওয়া যেসব লাইন সংকুচিত করা যায়                                   |
| `rules.deduplicate`        | না     | সদৃশ স্বাভাবিকীকৃত লাইন সংকুচিত করে                                             |
| `rules.truncateLineAt`     | না     | প্রতি লাইনের Unicode-নিরাপদ অক্ষরসীমা                                           |
| `rules.maxLines`           | না     | শেষাংশ সংরক্ষণের আগে ধরে রাখা লাইনের সর্বোচ্চ সংখ্যা                            |
| `rules.headLines`          | না     | ছাঁটাইয়ের সময় ধরে রাখা শুরুর লাইনগুলো                                         |
| `rules.tailLines`          | না     | সাম্প্রতিক প্রসঙ্গের জন্য ধরে রাখা শেষের লাইনগুলো                               |
| `rules.onEmpty`            | না     | ফিল্টারিংয়ে সব কনটেন্ট সরিয়ে গেলে ব্যবহৃত ফলব্যাক বার্তা                      |
| `rules.filterStderr`       | না     | পরবর্তী ফিল্টারিং ধাপগুলোর আগে প্রচলিত stderr প্রিফিক্স স্বাভাবিকীকরণ করে       |
| `preserve.errorPatterns`   | না     | ছাঁটাইয়ের পরও যেসব ত্রুটির লাইন টিকে থাকা উচিত                                 |
| `preserve.summaryPatterns` | না     | ছাঁটাইয়ের পরও যেসব সারসংক্ষেপের লাইন টিকে থাকা উচিত                            |
| `tests[]`                  | না     | RTK যাচাইকরণ গেটে ব্যবহৃত ইনলাইন যাচাইকরণ নমুনা                                 |

RTK ঘোষণামূলক ধাপগুলো এই ক্রমে প্রয়োগ করে: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, এবং `onEmpty`।

কাস্টম ফিল্টার এখান থেকে লোড করা যায়:

1. প্রজেক্টের `.rtk/filters.json` ফাইলগুলো থেকে, তবে কেবল একটি মিলে যাওয়া `.rtk/trust.json` হ্যাশ উপস্থিত থাকার পরে অথবা
   `trustProjectFilters` সক্রিয় থাকলে।
2. গ্লোবাল `DATA_DIR/rtk/filters.json`।
3. বিল্ট-ইন ফিল্টার।

প্রজেক্ট/গ্লোবাল কাস্টম ফাইলে একটি ফিল্টার অবজেক্ট অথবা ফিল্টার অবজেক্টের একটি অ্যারে থাকতে পারে। অবৈধ
কাস্টম ফিল্টারগুলো ডায়াগনস্টিকসহ এড়িয়ে যাওয়া হয়; অবৈধ বিল্ট-ইন ফিল্টার ভ্যালিডেশন ব্যর্থ করে।

প্রজেক্ট ট্রাস্ট ফাইল:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

এনভায়রনমেন্ট ওভাররাইড `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` কোনো হ্যাশ ছাড়াই প্রজেক্ট ফিল্টারগুলোকে বিশ্বাস করে এবং
এটি নিয়ন্ত্রিত লোকাল ডেভেলপমেন্টের মধ্যেই সীমিত রাখা উচিত।

## নিরাপত্তা বিধি

- বিধিগুলোকে idempotent রাখুন: একই ফিল্টার দুইবার চালালে আউটপুট নষ্ট হওয়া উচিত নয়।
- সম্ভব হলে ত্রুটির সঠিক টেক্সট, ফাইল পাথ, লাইন নম্বর এবং কমান্ডের সারসংক্ষেপ অপরিবর্তিত রাখুন।
- কোড ব্লক, JSON পেলোড, URL বা সিক্রেট পরিবর্তন করে—এমন বিধি এড়িয়ে চলুন।
- নতুন কমান্ড ফ্যামিলির জন্য detector/filter টেস্টে ইউনিট কভারেজ যোগ করুন।
- প্রতিটি বিল্ট-ইন ফিল্টার এবং শেয়ার করা কাস্টম ফিল্টারে `tests[]` নমুনা যোগ করুন।

## যাচাইকরণ

ব্যবহারের আগে রুল প্যাকগুলো যাচাই করা হয়। বিল্ট-ইন Caveman প্যাক এবং বিল্ট-ইন RTK ফিল্টার যাচাইকরণের সময় দ্রুত ব্যর্থ হয়, যাতে প্রকাশের আগে ত্রুটিপূর্ণ রিলিজ অ্যাসেট শনাক্ত করা যায়। পার্সিং বা ট্রাস্ট যাচাইকরণ ব্যর্থ হলে ডায়াগনস্টিকসহ কাস্টম RTK ফিল্টারগুলো এড়িয়ে যাওয়া হয়।

কেন্দ্রভিত্তিক যাচাইকরণ:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
