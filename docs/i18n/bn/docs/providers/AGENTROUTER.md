# AgentRouter Setup Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) হলো একটি Anthropic-সামঞ্জস্যপূর্ণ রিলে, যা Claude এবং অন্যান্য মডেল পুনরায় বিক্রি করে, প্রায়ই সরাসরি Anthropic API-এর তুলনায় কম মূল্যে। এটি অফিসিয়াল Claude Code ক্লায়েন্টের জন্য সরাসরি বিকল্প `ANTHROPIC_BASE_URL` হিসেবে ডিজাইন করা হয়েছে, তাই এটি কেবল Claude Code-এর ওয়্যার ইমেজের সঙ্গে মেলে এমন ট্রাফিক গ্রহণ করে (নির্দিষ্ট User-Agent, `anthropic-beta` ফ্ল্যাগ, Stainless SDK হেডার ইত্যাদি)।

## দ্রুত শুরু — নেটিভ `agentrouter` প্রোভাইডার ব্যবহার করুন (প্রস্তাবিত)

অধিকাংশ ব্যবহারকারীর জন্য **কোনো বিশেষ সেটআপের প্রয়োজন নেই**। OmniRoute-এ একটি বিল্ট-ইন `agentrouter` প্রোভাইডার রয়েছে, যেখানে সম্পূর্ণ Claude Code ওয়্যার ইমেজ ইতিমধ্যেই অন্তর্ভুক্ত করা আছে (`open-sse/config/providerRegistry.ts` → `agentrouter` দেখুন)। এটি ব্যবহার করতে:

1. **ড্যাশবোর্ড → প্রোভাইডার → প্রোভাইডার যোগ করুন** খুলুন।
2. তালিকা থেকে **AgentRouter** নির্বাচন করুন।
3. আপনার `sk-...` API কী পেস্ট করে সংরক্ষণ করুন।

এটুকুই — কোনো এনভায়রনমেন্ট ভেরিয়েবল বা কাস্টম প্রোভাইডার টাইপের প্রয়োজন নেই। বিল্ট-ইন মডেলগুলোর মধ্যে রয়েছে `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, এবং `deepseek-v3.2`।

এই নির্দেশিকার বাকি অংশে **উন্নত পদ্ধতি** আলোচনা করা হয়েছে: `anthropic-compatible-cc-*` প্রোভাইডার টাইপ ব্যবহার করা। ওয়্যার ইমেজের ওপর আরও নিয়ন্ত্রণের প্রয়োজন হলে এটি ব্যবহার করুন—উদাহরণস্বরূপ, নেটিভ প্রোভাইডার রেজিস্ট্রিতে এখনও অন্তর্ভুক্ত হয়নি এমন অন্য AgentRouter-ধাঁচের রিলেতে সংযোগ করার সময়, অথবা বেস URL, চ্যাট পাথ বা হেডার সেট ওভাররাইড করার সময়।

---

## উন্নত: Claude Code-সামঞ্জস্যপূর্ণ প্রোভাইডার টাইপের মাধ্যমে সংযোগ করা

OmniRoute **Claude Code-সামঞ্জস্যপূর্ণ** প্রোভাইডার টাইপের (`anthropic-compatible-cc-*`) মাধ্যমেও AgentRouter (এবং অনুরূপ রিলে) সমর্থন করে, যা সঠিক ওয়্যার ইমেজসহ Anthropic Messages API ব্যবহার করে। `https://agentrouter.org`-এর দিকে নির্দেশ করা একটি সাধারণ `openai-compatible-chat` প্রোভাইডার **কাজ করবে না**—আপস্ট্রিম WAF এমন অনুরোধ প্রত্যাখ্যান করে, যা Claude Code-এর মতো দেখায় না।

---

## পূর্বশর্ত

- একটি AgentRouter অ্যাকাউন্ট এবং API কী। নতুন নিবন্ধনকারীরা প্রকল্পের [README](../README.md)-এ থাকা অ্যাফিলিয়েট লিঙ্কের মাধ্যমে বিনামূল্যের ক্রেডিট পান।
- `ENABLE_CC_COMPATIBLE_PROVIDER` ফিচার ফ্ল্যাগ সক্রিয় রেখে OmniRoute চালু থাকতে হবে (নিচে দেখুন)।

## 1. CC-সামঞ্জস্যপূর্ণ প্রোভাইডার টাইপ সক্রিয় করুন

Claude Code-সামঞ্জস্যপূর্ণ প্রোভাইডার টাইপটি একটি ফিচার ফ্ল্যাগের আড়ালে রাখা হয়েছে, কারণ এটি এমন ট্রাফিক পাঠায় যা অফিসিয়াল Claude Code ক্লায়েন্টকে ঘনিষ্ঠভাবে অনুকরণ করে। OmniRoute চালু করার আগে একটি এনভায়রনমেন্ট ভেরিয়েবল সেট করে এটি সক্রিয় করুন:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker উদাহরণ:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

পুনরায় চালু করার পর, বিদ্যমান OpenAI-সামঞ্জস্যপূর্ণ এবং Anthropic-সামঞ্জস্যপূর্ণ প্রবাহগুলোর পাশাপাশি ড্যাশবোর্ডে একটি **Claude Code-সামঞ্জস্যপূর্ণ প্রোভাইডার যোগ করুন** অপশন দেখা যাবে।

## 2. ড্যাশবোর্ডে প্রোভাইডার তৈরি করুন

1. **ড্যাশবোর্ড → প্রোভাইডার → প্রোভাইডার যোগ করুন** খুলুন।
2. **Claude Code-সামঞ্জস্যপূর্ণ প্রোভাইডার যোগ করুন** নির্বাচন করুন (শুধু ওপরের ফ্ল্যাগটি সেট করা থাকলেই এটি দেখা যাবে)।
3. ফিল্ডগুলো পূরণ করুন:

| ফিল্ড     | মান                                                         |
| --------- | ----------------------------------------------------------- |
| নাম       | `AgentRouter` (অথবা যেকোনো লেবেল)                           |
| প্রিফিক্স | `agentrouter` (লগ এবং ড্যাশবোর্ডে প্রদর্শিত সহজবোধ্য উপনাম) |
| বেস URL   | `https://agentrouter.org`                                   |
| চ্যাট পাথ | `/v1/messages?beta=true` (ডিফল্ট—অপরিবর্তিত রাখুন)          |

> ক্যানোনিক্যাল মডেল শনাক্তকারী এখনও সম্পূর্ণ প্রোভাইডার নোড ID
> (`anthropic-compatible-cc-{uuid}/{model}`) ব্যবহার করে। **প্রিফিক্স** কেবল একটি প্রদর্শনযোগ্য
> উপনাম, যা আরও সহজবোধ্য লগ আউটপুটের জন্য `src/lib/usage/callLogs.ts` দ্বারা সমাধান করা হয়।

4. (ঐচ্ছিক) সংরক্ষণ করার আগে সংযোগ যাচাই করতে **যাচাই করুন** ফিল্ডে আপনার API কী পেস্ট করুন এবং **পরীক্ষা করুন**-এ ক্লিক করুন।
5. **যোগ করুন**-এ ক্লিক করুন।

তৈরি হয়ে গেলে, প্রোভাইডারটি খুলুন এবং আপনার AgentRouter API কী (`sk-...`) দিয়ে একটি **সংযোগ** যোগ করুন। সংযোগটির `test_status` পরিবর্তিত হয়ে `active` হওয়া উচিত।

## 3. কম্বোর মাধ্যমে বা সরাসরি এটি ব্যবহার করুন

নেমস্পেস হিসেবে আপনার প্রোভাইডারের প্রিফিক্স ব্যবহার করে মডেলটি রেফারেন্স করুন:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

ক্যানোনিক্যাল মডেল ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6`-ও কাজ করে
এবং ডেটাবেস ও কম্বো কনফিগারেশনে এটিই দেখা যায়।

অথবা অন্য যেকোনো প্রোভাইডারের মতো রাউটিং, ফলব্যাক এবং কোটা ব্যবস্থাপনার জন্য এটিকে
একটি কম্বোতে যোগ করুন।

---

## ওয়্যার ইমেজের বিস্তারিত

রেফারেন্সের জন্য, cc-compatible ব্রিজ প্রতিটি আপস্ট্রিম রিকোয়েস্টে নিচের তথ্যগুলো
পাঠায় (`open-sse/services/claudeCodeCompatible.ts` দেখুন):

| হেডার                                       | মান                                                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                                     |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                               |
| `anthropic-version`                         | `2023-06-01`                                                                                                           |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                               |
| প্রতি-কানেকশনের redact-thinking বিটা টগল    | যেসব আপস্ট্রিমে বিশেষভাবে রিড্যাক্টেড থিংকিং স্ট্রিম প্রয়োজন, সেগুলোর জন্য `redact-thinking-2026-02-12` যোগ করে       |
| প্রতি-কানেকশনের summarized thinking টগল     | যেসব CC Compatible থিংকিং রিকোয়েস্টে আগে থেকেই কোনো ডিসপ্লে মোড সেট করা নেই, সেগুলোতে `display: "summarized"` যোগ করে |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                                 |
| `x-app`                                     | `cli`                                                                                                                  |
| `X-Stainless-*`                             | বিভিন্ন Stainless SDK হেডার (ভাষা, প্যাকেজ ভার্সন, OS, আর্কিটেকচার ইত্যাদি)                                            |

এটিই রিকোয়েস্টগুলোকে আপস্ট্রিম WAF / ক্লায়েন্ট অ্যালাউলিস্ট অতিক্রম করতে সক্ষম করে।

---

## সমস্যা সমাধান

**`{"error":{"message":"unauthorized client detected, ..."}}`** — আপনার রিকোয়েস্টটি
Claude Code ওয়্যার ইমেজের সঙ্গে মেলেনি। প্রোভাইডারকে
`anthropic-compatible-cc`-এর পরিবর্তে `openai-compatible-chat` হিসেবে কনফিগার করা
হলে, অথবা স্টার্টআপের সময় `ENABLE_CC_COMPATIBLE_PROVIDER=true` ফ্ল্যাগ সেট না করা
হলে এটি ঘটে।

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"অবৈধ টোকেন"। ওয়্যার ইমেজটি সঠিক, কিন্তু API কীটি প্রত্যাখ্যাত হয়েছে। AgentRouter
ড্যাশবোর্ডে একটি নতুন কী তৈরি করুন এবং কানেকশনটি আপডেট করুন।

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-এর মডারেশন হুক রিকোয়েস্টের কনটেন্ট প্রত্যাখ্যান করেছে,
অথবা কীটির প্ল্যান অনুরোধ করা মডেলটি ব্যবহারের অনুমতি দেয় না। ভিন্ন কোনো প্রম্পট
বা মডেল চেষ্টা করুন; ক্ষতিকর নয় এমন প্রম্পটও ধারাবাহিকভাবে ব্লক হলে AgentRouter
সাপোর্টের সঙ্গে যোগাযোগ করুন।

**শুধু নির্দিষ্ট মডেলে `[400]: content-blocked`** — অধিকাংশ AgentRouter প্ল্যান
শুধু কিছু নির্দিষ্ট মডেল (যেমন `claude-opus-4-6`) ব্যবহারের অনুমতি দেয়। কীটি বৈধ
হলেও অন্য মডেল ID-গুলো `unauthorized_client_error` ফেরত দেয়। AgentRouter
ড্যাশবোর্ডে দেখে নিন আপনার প্ল্যান কোন মডেলগুলো কভার করে।

**omniroute লগে `Invalid JSON response from provider (reset after Ns)`** —
আপস্ট্রিম একটি non-JSON বডি ফেরত দিয়েছে (সাধারণত WAF থেকে আসা একটি HTML এরর
পেজ)। সাধারণত এর অর্থ হলো রিকোয়েস্টটি AgentRouter ব্যাকএন্ড পর্যন্ত পৌঁছায়নি —
প্রোভাইডার ID `anthropic-compatible-cc-` দিয়ে শুরু হয়েছে কি না আবার পরীক্ষা করুন
(শেষের ড্যাশটি লক্ষ করুন —
`open-sse/services/claudeCodeCompatible.ts`-এ `CLAUDE_CODE_COMPATIBLE_PREFIX`
দেখুন) এবং ফিচার ফ্ল্যাগটি সক্রিয় আছে কি না নিশ্চিত করুন।

**একটি AgentRouter প্রোভাইডার আগে থেকেই থাকা সত্ত্বেও `unauthorized client
detected` / HTML এরর পেজ** — সম্ভবত আপনার কাছে **একটির বেশি** AgentRouter
প্রোভাইডার রয়েছে এবং আপনার রিকোয়েস্টটি ভুল প্রোভাইডারে যাচ্ছে। যদি অবশিষ্ট কোনো
হাতে তৈরি `anthropic-compatible-*` (non-`cc`) বা `openai-compatible-chat-*`
প্রোভাইডার `agentrouter` প্রিফিক্স দিয়ে তৈরি করা হয়ে থাকে, তবে সেটি
`agentrouter/<model>` মডেল ID-গুলোর মালিক হতে পারে (এবং কম্বোগুলো নোড ID দিয়ে
এটিকে রেফারেন্স করতে পারে), ফলে ট্র্যাফিক সঠিক ওয়্যার ইমেজসহ আগে থেকেই সরবরাহ করা
বিল্ট-ইন `agentrouter` প্রোভাইডারের পরিবর্তে ওই প্রোভাইডারে রাউট হয় — যা একটি
জেনেরিক User-Agent পাঠায় এবং প্রত্যাখ্যাত হয়। omniroute লগে মডেলটি আসলে কোথায়
রিজলভ হচ্ছে তা পরীক্ষা করুন (`ROUTING` ট্যাগে
`agentrouter/<model> → <providerId>/<model>` দেখা যায়); যদি `<providerId>`
`agentrouter` না হয়, তাহলে নেটিভ প্রোভাইডারে একীভূত করুন: কম্বোগুলোকে
`agentrouter/<model>`-এ (providerId `agentrouter`) পয়েন্ট করুন এবং ডুপ্লিকেট
compatible প্রোভাইডারগুলো মুছে দিন। নেটিভ প্রোভাইডারের কোনো ওয়্যার-ইমেজ
কনফিগারেশন বা `customUserAgent` প্রয়োজন হয় না।

---

## আরও দেখুন

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web প্রোভাইডার ইন্টিগ্রেশন নোট
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — ফ্রি-টিয়ার প্রোভাইডার
  ক্যাটালগ
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — ওয়্যার ইমেজ ইমপ্লিমেন্টেশন
