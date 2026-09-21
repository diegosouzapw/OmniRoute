# OpenCode Integration (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **স্থিতি:** সাধারণভাবে উপলভ্য।
> **লক্ষ্য পাঠক:** OmniRoute ডিপ্লয়মেন্টের সঙ্গে OpenCode সংযুক্ত করছেন এমন অপারেটররা।
> **নির্ভরযোগ্য উৎস (কনফিগ স্কিমা):** `src/shared/services/opencodeConfig.ts`
> **নির্ভরযোগ্য উৎস (npm প্যাকেজ):** `@omniroute/opencode-provider/` (প্রকাশযোগ্য ওয়ার্কস্পেস)

[OpenCode](https://opencode.ai) একটি এজেন্টিক CLI/ডেস্কটপ AI ক্লায়েন্ট। এটি `~/.config/opencode/opencode.json` (অথবা `opencode.jsonc`) থেকে এর প্রোভাইডার ক্যাটালগ পড়ে এবং `https://opencode.ai/config.json`-এর স্কিমা অনুসরণ করে। OmniRoute নিজেকে OpenCode-এর কাছে সেই প্রোভাইডারগুলোর একটি হিসেবে উপস্থাপন করে — প্রতিটি অনুরোধ OmniRoute-এর স্ট্যান্ডার্ড OpenAI-সামঞ্জস্যপূর্ণ `/v1` সারফেসের মধ্য দিয়ে প্রবাহিত হয়, ফলে OpenCode স্বয়ংক্রিয়ভাবে Auto-Combo রাউটিং, সার্কিট ব্রেকার, কী পলিসি, অবজারভেবিলিটি ইত্যাদির সুবিধা পায়।

**দুটি সমর্থিত ইন্টিগ্রেশন পদ্ধতি** রয়েছে। যেকোনো একটি বেছে নিন — উভয়েই একই কনফিগ তৈরি করে।

---

## পদ্ধতি 1 — CLI জেনারেটর (npm install প্রয়োজন নেই)

শেষ ব্যবহারকারীদের জন্য প্রস্তাবিত। OmniRoute-এর সঙ্গে অন্তর্ভুক্ত থাকে। বিদ্যমান স্থানে `opencode.json` লেখে।

```bash
# OmniRoute ইনস্টল করার পরে (npm i -g @omniroute/cli অথবা লোকাল ক্লোন)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

অভ্যন্তরীণভাবে CLI `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) কল করে, তাই বিদ্যমান `opencode.json`-এর অন্যান্য প্রোভাইডার ও মন্তব্য অক্ষুণ্ণ থাকে। OmniRoute এন্ট্রিটি অ্যাটমিকভাবে যোগ/প্রতিস্থাপন করা হয়।

তৈরি হওয়া ফাইল (ডিফল্ট মডেল ক্যাটালগ):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## পদ্ধতি 2 — npm প্যাকেজ `@omniroute/opencode-provider`

Node/TS থেকে কনফিগ স্ক্রিপ্ট করার সময় প্রস্তাবিত (CI পাইপলাইন, মনোরেপো, কাস্টম ইনস্টলার ফ্লো)।

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // ঐচ্ছিক: OpenCode-এর কাছে প্রকাশিত মডেল ক্যাটালগ ওভাররাইড করুন
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

বিদ্যমান ফাইলের সঙ্গে অবিনাশী মার্জের জন্য `opencodeConfig.ts` থেকে `mergeOpenCodeConfigText()` পুনরায় বাস্তবায়ন করুন অথবা CLI জেনারেটর কল করুন।

সম্পূর্ণ API-এর জন্য [প্যাকেজ README](../../@omniroute/opencode-provider/README.md) দেখুন।

---

## রানটাইম আসলে যা করে

উভয় পদ্ধতিই একই `provider.omniroute.npm: "@ai-sdk/openai-compatible"` তৈরি করে। রানটাইমে OpenCode `@ai-sdk/openai-compatible` লোড করে (যা ইতিমধ্যেই OpenCode-এর একটি ট্রানজিটিভ ডিপেন্ডেন্সি) এবং `baseURL` + `apiKey` দিয়ে সেটি কনফিগার করে। এরপর:

```
OpenCode UI/এজেন্ট
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI সারফেস)
         → OmniRoute /v1/chat/completions হ্যান্ডলার  (open-sse/handlers/chatCore.ts)
            → কম্বো রাউটিং / Auto-Combo / এক্সিকিউটর
               → আপস্ট্রিম প্রোভাইডার
```

প্লাগইনটি কখনোই HTTP স্পর্শ করে না। এটি কেবল কনফিগারেশন তৈরি করে।

---

## মডেল ক্যাটালগের ডিফল্টসমূহ

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

আপনি `models: [...]`-এর মাধ্যমে এটি ওভাররাইড করতে পারেন। প্রস্তাবিত সংযোজনসমূহ:

- `"auto"` — OmniRoute-এর [Auto-Combo](../routing/AUTO-COMBO.md) শূন্য-কনফিগারেশন রাউটারটি উপলভ্য করে। এর ফলে আপনি ক্যাটালগটি হার্ড-কোড না করেই OpenCode-কে "সেরা উপলভ্য মডেল" বেছে নিতে দিতে পারেন।
- `"<combo-name>"` — ড্যাশবোর্ডে আপনার সংজ্ঞায়িত যেকোনো কম্বো; OmniRoute স্বচ্ছভাবে সেটি সমাধান করে।

---

## URL স্বাভাবিকীকরণ

সহায়কটি উভয় রূপ গ্রহণ করে এবং ঠিক একটি `/v1` নির্গত করে:

| ইনপুট                          | আউটপুট (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

এই ডিডুপ্লিকেশনই পুরোনো কনফিগারেশনগুলোতে দেখা **সবচেয়ে সাধারণ ত্রুটি**। আপনার কাছে যদি v3.8.0-এর আগের কোনো `opencode.json` থাকে যা `/v1/v1/...`-এর দিকে নির্দেশ করে, তাহলে জেনারেটরটি আবার চালান অথবা `createOmniRouteProvider` পুনরায় কল করুন।

---

## প্রমাণীকরণ মোড

| OmniRoute সেটিং                               | প্রস্তাবিত `apiKey` মান                                   |
| --------------------------------------------- | --------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (লোকালের জন্য ডিফল্ট) | `sk_omniroute` (আক্ষরিক প্লেসহোল্ডার)                     |
| `REQUIRE_API_KEY=true`                        | Dashboard → API Keys থেকে প্রকৃত ব্যবহারকারী-পিছু API কী। |

`x-api-key` + `anthropic-version` পাঠানো Anthropic-ধাঁচের ক্লায়েন্টগুলোর ক্ষেত্রে OmniRoute-এর `extractApiKey`, `x-api-key` থেকেও কী গ্রহণ করে। OpenCode, OpenAI সারফেস ব্যবহার করে, তাই এটি সর্বদা `Authorization: Bearer ${apiKey}` পাঠাবে — এখানে Anthropic-এর জন্য কোনো বিশেষ ব্যবস্থা প্রযোজ্য নয়।

---

## সমস্যা সমাধান

| উপসর্গ                                          | কারণ                                                                | সমাধান                                                                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/v1/v1/`-যুক্ত URL-এর প্রতিটি অনুরোধে `404`    | v3.8-এর আগের প্লাগইনের পুরোনো কনফিগারেশন, যা `/v1` দুবার যোগ করেছে। | Path 1 বা 2-এর মাধ্যমে পুনরায় তৈরি করুন।                                                                  |
| `401 Invalid API key`                           | OmniRoute-এ `REQUIRE_API_KEY=true` এবং কীটি অজানা।                  | ড্যাশবোর্ডে কীটি তৈরি করুন, অথবা `REQUIRE_API_KEY=false` (শুধু লোকাল) সেট করে `sk_omniroute` ব্যবহার করুন। |
| OpenCode UI-তে মডেল তালিকা খালি                 | OmniRoute-এর প্রোভাইডার দৃশ্যমানতায় ৪টি ডিফল্ট মডেলই লুকানো আছে।   | সক্রিয় করা মডেলগুলো দেখাতে `models: ["auto", ...]` পাস করুন।                                              |
| `cannot read property 'models'` সহ OpenCode 500 | পুরোনো OpenCode (< 0.1.x) ইনলাইন `models` গ্রহণ করত না।             | v1 স্কিমা (`opencode.ai/config.json`) অনুসরণ করে এমন OpenCode সংস্করণে আপগ্রেড করুন।                       |

---

## আরও দেখুন

- [API রেফারেন্স](../reference/API_REFERENCE.md) — সম্পূর্ণ OmniRoute REST পরিসর
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"`-এর অর্থ
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- সোর্স: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
