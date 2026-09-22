# Cursor Image Generation (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute চ্যাটের মতো একই provider id—`cursor` (alias `cu`)—ব্যবহার করে `POST /v1/images/generations`-এ Cursor প্ল্যানের **ছবি তৈরি** সুবিধা প্রদান করে।

| ফিল্ড                | মান                                                                                |
| -------------------- | ---------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                           |
| ফরম্যাট              | `cursor-agent-image`                                                               |
| প্রমাণীকরণ           | চ্যাটের মতো একই OAuth / API-key সংযোগ (`provider_connections.provider = "cursor"`) |
| মডেল                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                          |

## কেন Agent CLI

OmniRoute-এ Cursor চ্যাট `agent.v1.AgentService/Run` (protobuf) ব্যবহার করে। সেই পাথটি বিল্ট-ইন ক্লায়েন্ট টুল (shell, write, …) **প্রত্যাখ্যান করে**। ছবি তৈরি হলো Cursor-এর নিজস্ব একটি টুল, যা সিটের বিপরীতে **`agent` CLI** দ্বারা চালানো হয়। তাই ইমেজ হ্যান্ডলারটি একটি লক করা প্রম্পট এবং প্রতিটি অনুরোধের জন্য একটি অস্থায়ী ওয়ার্কস্পেসসহ `agent` চালু করে (কমিউনিটি সিট ব্রিজগুলোর মতো একই কাঠামোতে), এরপর OpenAI-সামঞ্জস্যপূর্ণ `b64_json` ফেরত দেয়।

## অ্যাক্সেস সীমাবদ্ধতা (কঠোর নিয়ম #15 + #17)

এটিই একমাত্র `IMAGE_PROVIDERS` ফরম্যাট যা একটি চাইল্ড প্রসেস (`agent`
বাইনারি) চালু করে। যেহেতু `POST /v1/images/generations` প্রায় ৪০টি অন্য,
চাইল্ড প্রসেস চালু না করা ইমেজ প্রোভাইডারের সঙ্গে শেয়ার করা হয়, যেগুলো রিমোট কলাররা বৈধভাবে ব্যবহার করে,
তাই পুরো রুটটিকে **`LOCAL_ONLY`** হিসেবে শ্রেণিবদ্ধ করা হয়নি—এর পরিবর্তে
`handleCursorAgentImageGeneration` বিশ্বস্ত `AUTHZ_HEADER_PEER_LOCALITY` সিদ্ধান্ত ব্যবহার করে নিজস্ব
গেট প্রয়োগ করে, যা authz পাইপলাইন প্রতিটি অনুরোধে সংযুক্ত করে
(প্রকৃত TCP পিয়ার থেকে, সহজে নকল করা যায় এমন `Host` হেডার থেকে কখনোই নয়): কেবল
`loopback` এবং `lan` কলাররাই প্রসেস চালু করার ধাপে পৌঁছাতে পারে; অন্য সবাই (এর মধ্যে
পাবলিক টানেলের মাধ্যমে পুনরায় ব্যবহার করা ফাঁস হওয়া API key-ও অন্তর্ভুক্ত) কোনো ক্রেডেনশিয়াল অনুসন্ধান বা
প্রসেস চালু হওয়ার আগেই `403` পায়। বাকি `LOCAL_ONLY` স্তরে প্রয়োগ করা একই
নীতির জন্য `src/server/authz/policies/management.ts` দেখুন।

## কনকারেন্সি গেট মডিউল-স্তরের (একক-ইনস্ট্যান্স সীমাবদ্ধতা)

`CURSOR_IMG_MAX_CONCURRENT` একটি ইন-মেমরি কাউন্টার/কিউ দ্বারা প্রয়োগ করা হয়, যার পরিধি
Node মডিউল ইনস্ট্যান্সে সীমাবদ্ধ (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`)।
এটি একটি OmniRoute প্রসেসের মধ্যে সমসাময়িক `agent` প্রসেস চালু হওয়া সঠিকভাবে সীমিত করে, কিন্তু
একই Cursor সিট শেয়ার করা একাধিক প্রসেস/ইনস্ট্যান্সের মধ্যে সমন্বয় করে
**না** (যেমন একটি মাল্টি-রেপ্লিকা ডিপ্লয়মেন্ট)—প্রতিটি ইনস্ট্যান্স তার নিজস্ব স্বতন্ত্র সীমা প্রয়োগ করে।
একক-ইনস্ট্যান্স ডিপ্লয়মেন্টের ক্ষেত্রে (ডিফল্ট) এটি যথাযথ; অনুভূমিকভাবে স্কেল করা
ডিপ্লয়মেন্টে প্রতিটি ইনস্ট্যান্সের জন্য `CURSOR_IMG_MAX_CONCURRENT` রক্ষণশীল রাখা উচিত অথবা
Cursor ইমেজ ট্র্যাফিক একটি একক ইনস্ট্যান্সে রুট করা উচিত।

## প্রয়োজনীয়তা

1. ড্যাশবোর্ডে সংযুক্ত একটি Cursor অ্যাকাউন্ট (OAuth বা `crsr_…` API key)।
2. OmniRoute প্রসেসের জন্য Cursor Agent বাইনারি উপলভ্য থাকতে হবে:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, অথবা
   - `~/.local/bin/agent`, অথবা
   - Cursor সংযোগে `providerSpecificData.agentBin`।

ঐচ্ছিক সমন্বয়:

| Env                         | ডিফল্ট                   | অর্থ                                 |
| --------------------------- | ------------------------ | ------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | প্রতি ছবির জন্য সর্বোচ্চ বাস্তব সময় |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | শেয়ার করা সিটের কনকারেন্সি গেট      |
| `CURSOR_IMG_MODEL`          | (অনুরোধের মডেল / `auto`) | CLI `--model` ওভাররাইড করুন          |

## উদাহরণ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

তৈরি হতে সাধারণত ১–২ মিনিট সময় লাগে। একটি অভ্যন্তরীণ নেটওয়ার্ক পাথ ব্যবহার করা বাঞ্ছনীয়; প্রায় ১০০ সেকেন্ড টাইমআউটসহ edge proxy ব্যর্থ হবে।

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, এবং `model: openai/cursor/auto` (অথবা আপনার LiteLLM সংস্করণের ওপর নির্ভর করে শুধু `cursor/auto`) দিয়ে একটি ইমেজ মডেল নিবন্ধন করুন।
