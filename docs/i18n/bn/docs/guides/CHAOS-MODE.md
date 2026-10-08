# Chaos Mode (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ড্যাশবোর্ড:** **Chaos Mode** (সাইডবার) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ড্যাশবোর্ড সেশন) · `POST /api/skills/collect/chaos` (API কী)  
> **সোর্স:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **একটি টাস্ক একই সঙ্গে একাধিক প্রোভাইডারের কাছে পাঠায়** — অংশগ্রহণকারী প্রতিটি প্রোভাইডার
একটি করে মডেল ইনস্ট্যান্স প্রদান করে, এবং আপনি সব উত্তর পাশাপাশি (অথবা ধারাবাহিকভাবে সংযুক্ত অবস্থায়) পান। এটি একটি
মাল্টি-মডেল এক্সিকিউশন সারফেস, কোনো রাউটিং কৌশল নয়: আপনার স্বাভাবিক `/v1/chat/completions`
ট্র্যাফিক কখনোই এর দ্বারা প্রভাবিত হয় না।

**পার্থক্য নিরূপণ — নামের মধ্যে "chaos" রয়েছে এমন তিনটি ভিন্ন জিনিস সরবরাহ করা হয়:**

| বিষয়             | এটি কী                                                                                                                                                                    | কোথায় নথিভুক্ত                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**    | এখানে বর্ণিত ড্যাশবোর্ড পৃষ্ঠা + API: একটি টাস্ক বহু প্রোভাইডারের কাছে ছড়িয়ে দেয় (সমান্তরালভাবে অথবা সহযোগিতামূলকভাবে)।                                                | এই নির্দেশিকা                                |
| `auto/chaos`      | Auto-Combo মডেল আইডি: সমান্তরাল ফ্যান-আউট, প্রতি প্রোভাইডারে একটি মডেল, প্রতিটির জন্য একটি আপস্ট্রিম কল। এটি ফল্ট ইনজেকশন নয় ([বিস্তারিত](#autochaos-parallel-fan-out))। | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos কম্বো কনফিগ | `config.chaos.enabled`-সহ সংরক্ষিত একটি কম্বো একইভাবে ফ্যান-আউট করে (শুধু API); `judgeModel` কেবল চূড়ান্ত উত্তরটি বেছে নেয়, কোনো সিন্থেসিস কল করে না।                   | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: সমান্তরাল ফ্যান-আউট

`auto/chaos` কোনো ফল্ট-ইনজেকশন বা রেজিলিয়েন্স-টেস্টিং নিয়ন্ত্রণ **নয়**। `/v1/chat/completions`-এ
`model: "auto/chaos"` অনুরোধ করলে:

1. **প্রতি প্রোভাইডার থেকে একটি মডেল** নিয়ে একটি প্যানেল তৈরি হয়: সংযুক্ত প্রতিটি
   প্রোভাইডারের প্রথম প্রার্থী, ক্যান্ডিডেট-পুলের ক্রম অনুসারে, সর্বোচ্চ 5 সদস্য পর্যন্ত
   (`OMNIROUTE_CHAOS_MAX_PANEL`, সর্বোচ্চ সীমা 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`)। `chaos-mode` ওয়েট
   প্যাক কেবল প্রতিটি সদস্যের `weight` নির্ধারণ করে; ফ্যান-আউট এটি পড়ে না।
2. প্রতিটি প্যানেল সদস্যের কাছে একই অনুরোধ **সমান্তরালভাবে** পাঠায়, তাই একটি অনুরোধের
   জন্য প্রতি প্যানেল সদস্যে একটি করে আপস্ট্রিম কলের খরচ হয়
   (`open-sse/services/autoCombo/chaosEngine.ts`, যা
   `open-sse/services/combo.ts` থেকে ডিসপ্যাচ করা হয়)।
3. প্রতিটি প্যানেল সদস্যের ফলাফল আসার সঙ্গে সঙ্গে তার জন্য একটি স্ট্যাটাস লাইন স্ট্রিম করে: ডিফল্টভাবে একটি SSE মন্তব্য
   (`: chaos <index> ok|fail <model>`), এবং অনুরোধে
   `stream_options.include_chaos_parts: true` সেট করা থাকলে একটি `omni-chaos-part`
   ইভেন্ট (`model`, `index`, `ok`, `error`)। এগুলোর কোনোটিতেই উত্তরের টেক্সট থাকে না।
4. চূড়ান্ত OpenAI-ধাঁচের চাঙ্ক হিসেবে প্যানেলের **একটি** উত্তর পাঠায়: প্রথম প্যানেল
   সদস্যের উত্তর (`auto/chaos` এটিকে `judgeModel` হিসেবে নির্ধারণ করে), যদি সেটি সফল হয়; অন্যথায়
   সর্বশেষ সফল সদস্যের উত্তর। প্যানেলের অন্য উত্তরগুলো ফেরত দেওয়া হয় না, তাই
   আপনি Nটি কলের জন্য খরচ করেন এবং একটি কমপ্লিশন পান।

## সেটআপ

1. **Dashboard → Chaos Mode** (`/dashboard/chaos`) খুলুন।
2. এটি **চালু করুন** — Chaos Mode ডিফল্টভাবে **নিষ্ক্রিয় অবস্থায়** সরবরাহ করা হয় (`enabled: false`
   `src/lib/chaos/chaosConfig.ts`-এ)। নিষ্ক্রিয় থাকা অবস্থায় `POST /api/chaos/run` উত্তর দেয়
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`।
3. অংশগ্রহণকারী ও ডিফল্টগুলো নির্বাচন করুন (সেটিংস স্টোরের মাধ্যমে প্রতিটি ইনস্ট্যান্সের জন্য সংরক্ষিত হয়):

   | ফিল্ড               | অর্থ                                                                      | ডিফল্ট / সীমা                                   |
   | ------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
   | `enabled`           | প্রধান সুইচ                                                               | `false`                                         |
   | `defaultMode`       | `parallel` অথবা `collaborative` (নিচে দেখুন)                              | `parallel`                                      |
   | `providerOverrides` | প্রতিটি প্রোভাইডারের অংশগ্রহণ (`providerId`, ঐচ্ছিক `modelId`, `enabled`) | খালি = প্রতিটি সক্রিয় প্রোভাইডার, সর্বোচ্চ 200 |
   | `systemPrompt`      | বিল্ট-ইন Chaos সিস্টেম প্রম্পটের ওভাররাইড                                 | ঐচ্ছিক, সর্বোচ্চ 10 000 অক্ষর                   |
   | `timeoutMs`         | প্রতিটি মডেল কলের সর্বোচ্চ সময়                                           | `120000` (5 000–600 000)                        |
   | `maxTokens`         | প্রতিটি মডেল কলের `max_tokens`                                            | `4096` (256–128 000)                            |

4. **পেজ থেকেই একটি পরীক্ষা চালান** — ফলাফল প্যানেলে প্রতিটি প্রোভাইডারের উত্তর,
   স্ট্যাটাস ও সময়কাল দেখানো হয়।

## এক্সিকিউশন মোড

- **`parallel`** — প্রতিটি মডেল একই সময়ে একই কাজ পায়; আপনি সব উত্তর
  স্বাধীনভাবে পান।
- **`collaborative`** — মডেলগুলো **একটি শৃঙ্খলে** চলে: প্রতিটি মডেল আগের মডেলের আউটপুট দেখে এবং
  সেটিকে পরিমার্জন, সম্প্রসারণ, সমালোচনা করতে বা একটি বিকল্প দিতে বলা হয়। রেসপন্সের `summary` ফিল্ড
  শৃঙ্খলের ক্রমানুসারে সফল আউটপুটগুলো একত্রিত করে (`parallel` রানে কোনো `summary` থাকে না)।

## API

### `POST /api/chaos/run` — ড্যাশবোর্ড সেশন

কুকি দ্বারা প্রমাণীকৃত (ম্যানেজমেন্ট সেশন — দেখুন
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ড্যাশবোর্ড পেজ এটি ব্যবহার করে।

```jsonc
// বডি
{
  "task": "Compare approaches to X", // আবশ্যক
  "providers": ["glm", "kimi"], // ঐচ্ছিক ফিল্টার
  "mode": "parallel", // ঐচ্ছিক — defaultMode ওভাররাইড করে
  "systemPrompt": "…", // ঐচ্ছিক ওভাররাইড
  "maxTokens": 4096, // ঐচ্ছিক ওভাররাইড
}
```

### `POST /api/skills/collect/chaos` — API কী

বহিরাগত কলারদের জন্য Bearer-token সংস্করণ। কীটিতে অবশ্যই **Chaos Mode অনুমতি**
(`chaosModeEnabled`) থাকতে হবে, যা **ডিফল্টভাবে বন্ধ থাকে** — প্রতিটি কীর জন্য এটি
**Dashboard → API Manager → edit key → permissions → Chaos Mode** থেকে চালু করুন। উপরের মতো একই বডি।

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

উভয় এন্ডপয়েন্ট একই কাঠামোর ফলাফল ফেরত দেয়:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // শুধু collaborative মোডে
}
```

## সমস্যা সমাধান

- **`400 Chaos Mode is not enabled`** — উপরের ধাপ 2 দেখুন: গ্লোবাল সুইচটি বন্ধ আছে।
- **`/api/skills/collect/chaos`-এ API কী প্রত্যাখ্যাত হচ্ছে** — কীটিতে সংশ্লিষ্ট কীর
  `chaosModeEnabled` অনুমতি নেই (ডিফল্টভাবে বন্ধ; এটি একটি সেটিং, কোনো ত্রুটি নয়)।
- **ফলাফলে প্রত্যাশিত কোনো প্রোভাইডার নেই** — Chaos Mode পেজে `providerOverrides`
  পরীক্ষা করুন (একটি নিষ্ক্রিয় ওভাররাইড সেটিকে বাদ দেয়) এবং প্রোভাইডার সংযোগটি
  সক্রিয় কি না দেখুন।
