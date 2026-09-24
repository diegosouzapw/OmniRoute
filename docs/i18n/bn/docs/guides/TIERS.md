# OmniRoute Tiers — User Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute সমর্থিত 352টি প্রোভাইডারকে 3টি অর্থনৈতিক টিয়ারে সংগঠিত করে। প্রতিটি
রিকোয়েস্ট ক্রমানুসারে এগুলোর মধ্য দিয়ে যায়, যতক্ষণ না কোনোটি সফলভাবে ফলাফল দেয় —
ফলে কোনো fallback কোড না লিখেই আপনি সবচেয়ে সাশ্রয়ী কার্যকর রেসপন্স পান।

## টিয়ার 1 — সাবস্ক্রিপশন

**যেসব প্রোভাইডারের জন্য আপনি ইতিমধ্যেই অর্থ প্রদান করেন।** OmniRoute মেয়াদ শেষ হওয়ার
আগেই কোটার প্রতিটি অংশ ব্যবহার করে।

| প্রোভাইডার                          | কেন টিয়ার 1                                           |
| ----------------------------------- | ------------------------------------------------------ |
| Claude Code OAuth                   | Anthropic Pro/Team — নির্দিষ্ট মূল্য, প্রায়ই অব্যবহৃত |
| OpenAI Codex (ChatGPT সাবস্ক্রিপশন) | Plus/Team-এর মধ্যে Codex কোটা অন্তর্ভুক্ত              |
| GitHub Copilot                      | প্রতি-সিট — কোটা মাসিক রিসেট হয়                       |
| Cursor IDE                          | Pro প্ল্যানের কোটা                                     |
| Antigravity / Devin Desktop         | বিল্ট-ইন কোটা                                          |

**কৌশল**: মডেলের সক্ষমতার সঙ্গে মানানসই প্রতিটি রিকোয়েস্ট প্রথমে এখানে রাউট করুন।
কোটা ট্র্যাকার আসন্ন রিসেটগুলো পর্যবেক্ষণ করে, এবং `reset-aware`
কম্বো কৌশল সেই অনুযায়ী অগ্রাধিকার দেয়। প্রথমে টিয়ার 1-এ রাউট করতে এবং কোটা
শেষ হওয়ার পরেই কেবল পেইড টিয়ারে যেতে `auto/thrifty` id ব্যবহার করুন — অথবা
প্ল্যানে অন্তর্ভুক্ত সক্ষমতার মধ্যেই থাকতে এবং তা না পাওয়া গেলে ব্যর্থ হতে `auto/subscription`
ব্যবহার করুন। দেখুন
[সাবস্ক্রিপশন-প্রথম রাউটিং](../routing/SUBSCRIPTION_LADDER.md)।

## টিয়ার 2 — সাশ্রয়ী

**প্রতি 1M টোকেনে $1-এর কম মূল্যের পে-পার-টোকেন প্রোভাইডার।** উচ্চ-ভলিউমের কাজের
জন্য অথবা টিয়ার 1-এর কোটা সীমায় পৌঁছানোর পর ব্যবহারের জন্য সংরক্ষিত।

| প্রোভাইডার                    | মূল্য (ইনপুট/আউটপুট)     | সক্ষমতা              |
| ----------------------------- | ------------------------ | -------------------- |
| DeepSeek V4 Pro               | প্রতি 1M-এ $0.27 / $1.10 | কোড, রিজনিং          |
| GLM-4.5                       | প্রতি 1M-এ $0.60 / $2.20 | দীর্ঘ কনটেক্সট       |
| MiniMax M1                    | প্রতি 1M-এ $0.20 / $1.10 | গতি                  |
| Qwen Coder                    | প্রতি 1M-এ $0.30 / $1.20 | কোড                  |
| OpenRouter (মূল্য-অপ্টিমাইজড) | পরিবর্তনশীল              | 100+ মডেল, ডায়নামিক |

**কৌশল**: `cost-optimized` কম্বো এমন সর্বনিম্ন $/টোকেন মডেল বেছে নেয়, যা
কাজটির সক্ষমতা ফিল্টার (ভিশন, JSON মোড, টুলস, সর্বোচ্চ কনটেক্সট) পূরণ করে।

## টিয়ার 3 — বিনামূল্যে

**শূন্য-খরচের প্রোভাইডার** — ফ্রি টিয়ার, ক্রেডিট প্রোগ্রাম, OAuth দৈনিক কোটা।

| প্রোভাইডার       | বিনামূল্যের কোটা / ক্রেডিট                            |
| ---------------- | ----------------------------------------------------- |
| Kiro AI          | বিনামূল্যের Claude টিয়ার (উদার ন্যায্য-ব্যবহার সীমা) |
| OpenCode Free    | কোনো অথেন্টিকেশন নেই, উদার রেট লিমিট                  |
| Qoder            | বিনামূল্যের OAuth                                     |
| Google Vertex AI | নতুন অ্যাকাউন্টে $300 ক্রেডিট                         |
| Amazon Q         | AWS ব্যবহারকারীদের জন্য ফ্রি টিয়ার                   |
| Pollinations     | উন্মুক্ত পাবলিক API                                   |
| Cloudflare AI    | Workers AI ফ্রি টিয়ার                                |

**কৌশল**: বাজেট ক্যাপসহ `auto` কম্বো টিয়ার 1+2 ব্যর্থ হলে
অথবা `useFreeOnly=true` সেট করা থাকলে এখানে রাউট করে। বিনামূল্যের প্রোভাইডারগুলোর
রেট লিমিট প্রায়ই কম হয় — circuit breaker backoff-এর পর সেগুলো পুনরুদ্ধার করে।

## টিয়ার কনফিগার করা

Dashboard → **Tiers** → আপনার প্রোভাইডারগুলো অ্যাসাইন করুন। ডিফল্টগুলো (`tierDefaults.json` থেকে)
যুক্তিসংগত; নির্দিষ্ট সাবস্ক্রিপশনকে অগ্রাধিকার দিতে বা কোনো প্রোভাইডার বাদ দিতে চাইলে সম্পাদনা করুন।

Auto-Combo-এর 16-ফ্যাক্টর স্কোরিং টিয়ারও বিবেচনা করে। দেখুন
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md)।

## টেলিমেট্রি

Dashboard → **Usage** প্রতিদিন প্রতিটি টিয়ারে খরচ হওয়া টোকেন দেখায়। এটি ব্যবহার করে:

- নিশ্চিত করুন যে টিয়ার 1 পুরোপুরি ব্যবহৃত হচ্ছে (তা না হলে আপনি সাবস্ক্রিপশনের মূল্য অপচয় করছেন)
- টিয়ার 2-এর কোন মডেলগুলো সবচেয়ে বেশি বেছে নেওয়া হচ্ছে তা শনাক্ত করুন (1-2টিতে একীভূত করুন)
- পরীক্ষা/অনুসন্ধানমূলক ওয়ার্কলোডে টিয়ার 3 অর্থ সাশ্রয় করছে কি না যাচাই করুন

## প্রচলিত প্যাটার্ন

### সম্পূর্ণ বিনামূল্যের ওয়ার্কলোড

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

দৃঢ়ভাবে টিয়ার 3-এর দিকে পরিচালিত করে; টিয়ার 3 অনুপলভ্য হলেই কেবল টিয়ার 2 ব্যবহার করে।

### সাশ্রয়ী fallback-সহ সাবস্ক্রিপশন-প্রথম

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

টিয়ার 1 → টিয়ার 2 → টিয়ার 3-এর সঙ্গে সামঞ্জস্যপূর্ণ সুস্পষ্ট ক্রমবদ্ধ তালিকা।
