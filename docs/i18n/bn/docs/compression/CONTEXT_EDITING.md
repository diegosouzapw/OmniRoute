# Delegated Context Editing (Anthropic) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

ডেলিগেটেড **কনটেক্সট এডিটিং** হলো শুধু Claude-এর জন্য প্রযোজ্য একটি কনটেক্সট-ব্যবস্থাপনা ফিচার। OmniRoute-এর লোকাল
কম্প্রেশন ইঞ্জিনগুলোর (Caveman, RTK, LLMLingua, স্ট্যাকড পাইপলাইন) বিপরীতে — যেগুলো রিকোয়েস্ট বডি প্রক্সি ছেড়ে যাওয়ার
_আগেই_ সেটি পুনর্লিখন করে — কনটেক্সট এডিটিং **প্রোভাইডারকে** তার নিজস্ব চলমান কনটেক্সট উইন্ডো থেকে পুরোনো
টুল-ইউজ / টুল-রেজাল্ট ব্লক পরিষ্কার করতে বলে। OmniRoute শুধু একটি বডি
প্যারামিটার (`context_management.edits[]`) সংযুক্ত করে; Claude তার নিজস্ব টোকেনাইজার অনুযায়ী প্রকৃত পরিষ্কারের কাজটি করে।

প্রকৃতিগতভাবেই এটি একটি ডেলিগেটেড সক্ষমতা: অন্যান্য প্রোভাইডার প্যারামিটারটি প্রত্যাখ্যান করে, তাই OmniRoute এটিকে
কঠোরভাবে Claude এবং Claude-Code-সামঞ্জস্যপূর্ণ রিলেগুলোর মধ্যে সীমাবদ্ধ রাখে।

প্রামাণ্য উৎস: `open-sse/config/contextEditing.ts` (স্ট্র্যাটেজি আইডি, বডি ইনজেকশন, টেলিমেট্রি
এক্সট্র্যাকশন), `open-sse/executors/base.ts` (ইনজেকশন গেট + 400-ফলব্যাক), এবং
`open-sse/services/compression/types.ts` (কনফিগ কাঠামো + ডিফল্ট)।

## `clear_tool_uses` কী করে

OmniRoute বহির্গামী Anthropic Messages বডিতে একটি একক এডিট ইনজেক্ট করে:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — তারিখযুক্ত Anthropic স্ট্র্যাটেজি আইডি (`CLEAR_TOOL_USES_STRATEGY`)।
- `trigger.value: 100000` — রিকোয়েস্টের ইনপুট টোকেন এই থ্রেশহোল্ড অতিক্রম করলে Claude পুরোনো
  টুল-ইউজ/রেজাল্ট জোড়াগুলো পরিষ্কার করা শুরু করে (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic-এর ডিফল্ট)।
- `keep.value: 3` — সর্বশেষ Nটি টুল-ইউজ/রেজাল্ট জোড়া অপরিবর্তিত রাখা হয়
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)।

বিটাটি `anthropic-beta: context-management-2025-06-27` হেডারের মাধ্যমে ঘোষণা করা হয়, যা
OmniRoute ইতোমধ্যেই Claude রিকোয়েস্টগুলোতে পাঠায়।

ইনজেকশন `applyContextEditingToBody()` দ্বারা সম্পন্ন হয় এবং এটি **আইডেমপোটেন্ট**: বডিতে আগে থেকেই কোনো `clear_tool_uses`
এডিট থাকলে (আগের কোনো কল দ্বারা যোগ করা অথবা ক্লায়েন্ট দ্বারা সরবরাহ করা), বডিটি
অপরিবর্তিত রাখা হয়। যদি একটি `clear_thinking_20251015` এডিটও উপস্থিত থাকে, OmniRoute স্থিতিশীলভাবে
`clear_thinking` এডিটটিকে সামনে সাজায়, কারণ Anthropic-এর নিয়ম অনুযায়ী `edits[]` অ্যারেতে
`clear_tool_uses`-এর আগে `clear_thinking` থাকতে হবে।

## প্রতি-কম্বোর সক্রিয়করণ টগল

কনটেক্সট এডিটিং **ডিফল্টভাবে বন্ধ** থাকে এবং এটি অপ্ট-ইন। টগলটি কম্প্রেশন কনফিগে থাকা একটি একক বুলিয়ান:

- সেটিং কী: `contextEditing.enabled` (camelCase — **`context_editing` / `context-editing` নয়**)।
- টাইপ: `open-sse/services/compression/types.ts`-এ
  `ContextEditingConfig { enabled: boolean }`।
- ডিফল্ট: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`।
- Zod স্কিমা: `src/shared/validation/compressionConfigSchemas.ts`-এ `contextEditingConfigSchema`।
- স্টোরেজ: বাকি কম্প্রেশন সেটিংসের সঙ্গে সংরক্ষিত হয় (`src/lib/db/compression.ts`-এ
  নর্মালাইজ করা হয়)।

ড্যাশবোর্ডে টগলটি কম্প্রেশন হাবে
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) থাকে এবং `saveSettings()`-এর মাধ্যমে
`{ contextEditing: { enabled: … } }` ফেরত লিখে। যেহেতু এটি কম্প্রেশন-সেটিংস অবজেক্টের অংশ হিসেবে পরিবাহিত হয়,
তাই এটি সম্পূর্ণ স্বাধীন কোনো ইন্টারফেস না হয়ে প্রতি-কম্বো কম্প্রেশন প্রোফাইলের সঙ্গে সমন্বিতভাবে কাজ করে — কনফিগে
শুধু চালু/বন্ধ ফ্ল্যাগটি থাকে; সব থ্রেশহোল্ড (`trigger`,
`keep`) উপরে নথিভুক্ত কনস্ট্যান্টগুলোই ব্যবহার করে।

## শুধুমাত্র Claude-এর জন্য গেটিং

ইনজেকশন কেবল প্রকৃত Claude অথবা Claude-Code-সামঞ্জস্যপূর্ণ রিলের ক্ষেত্রে ঘটে। `open-sse/executors/base.ts`-এ থাকা গেটটি হলো:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — প্রকৃত Anthropic কী/OAuth।
- `isClaudeCodeCompatible(this.provider)` — যেসব রিলের provider id `anthropic-compatible-cc-`
  প্রিফিক্স দিয়ে শুরু হয় (তারা Claude Code সামঞ্জস্যের কথা জানায়, তাই এই রিলেগুলোরই
  beta গ্রহণ করার সম্ভাবনা সবচেয়ে বেশি)। `open-sse/services/provider.ts` দেখুন।

ইচ্ছাকৃতভাবে **বাদ দেওয়া হয়েছে**:

- `claude-web` — `create_conversation_params` রিকোয়েস্ট আকৃতিসহ একটি ব্রাউজার রিলে, যা কখনোই
  `context_management` দেখে না।
- সাধারণ `anthropic-compatible-*` রিলে (`-cc-` প্রিফিক্স ছাড়া) — অনিশ্চিত beta সমর্থনসহ
  তৃতীয়-পক্ষের endpoint।

টগল চালু থাকলেও Claude নয় এমন provider কখনোই `context_management` প্যারামিটার পায় না।

## 400-fallback / রিলে কভারেজ

একটি Claude-সামঞ্জস্যপূর্ণ রিলে beta সমর্থনের কথা জানাতে পারে, কিন্তু তবুও HTTP 400 দিয়ে
`context_management` প্যারামিটার প্রত্যাখ্যান করতে পারে। রিকোয়েস্ট ব্যর্থ না করে মার্জিতভাবে
অবনমিত হতে executor প্যারামিটারটি সরিয়ে একই URL-এ **একবার** পুনরায় চেষ্টা করে:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

আচরণ:

1. কেবল তখনই সক্রিয় হয়, যখন context editing চালু থাকা অবস্থায় একটি `400` আসে এবং body-তে
   বাস্তবেই `context_management` থাকে।
2. `400` body একটি `clone()`-এর মাধ্যমে পড়া হয়, যাতে মেলেনি এমন path-এর জন্য মূল response
   অক্ষত থাকে।
3. error text অবশ্যই `/context[_-]management|context editing/i`-এর সঙ্গে মিলতে হবে — সম্পর্কহীন
   কোনো 400 (যেমন `max_tokens must be >= 1`) fallback ট্রিগার **করে না**; মূল error-টিই
   প্রচারিত হয়।
4. মিল পাওয়া গেলে এটি `contextEditingDisabled = true` সেট করে (যা পরবর্তী কোনো retry/fallback
   URL-এর জন্য নতুন `transformedBody` তৈরি হলে পুনরায় injection দমন করে), `context_management`
   মুছে দেয়, Claude / Claude-Code-সামঞ্জস্যপূর্ণ রিলের জন্য body-টি পুনরায় sign করে
   (`signRequestBody`), এবং একই URL-এ একবার পুনরায় চেষ্টা করে।

প্রকৃত Claude `ANTHROPIC_BETA_BASE`-এ beta বহন করে এবং এই fallback path-এ পৌঁছায় না।

## `applied_edits` টেলিমেট্রি

Claude response-এর পরে, provider বাস্তবে কতটুকু context পরিষ্কার করেছে তা OmniRoute রেকর্ড করে।
এটি **stream করা হয় না** — এটি non-streaming response body থেকে best-effort ভিত্তিতে
extract করা হয় এবং কখনোই response-কে প্রভাবিত করে না (টেলিমেট্রি ব্যর্থতা উপেক্ষা করা হয়)।

- Extraction: `open-sse/config/contextEditing.ts`-এ থাকা `extractContextEditingTelemetry(responseBody)`।
  এটি response-এর আকৃতির ভিন্নতা সামলাতে প্রতিরক্ষামূলকভাবে তিনটি অবস্থানে `applied_edits`
  খোঁজে:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- প্রতিটি entry থেকে পড়া field: `cleared_input_tokens` এবং `cleared_tool_uses`
  (snake_case, Anthropic-native), সঙ্গে fallback হিসেবে `clearedInputTokens` /
  `clearedToolUses` camelCase।
- কোনো `applied_edits` array পাওয়া না গেলে অথবা বাস্তবে কিছুই পরিষ্কার না হলে `null` ফেরত দেয়।

receipt-এর আকৃতি হলো `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`।
রেকর্ডিং `open-sse/handlers/chatCore.ts`-এ ঘটে (`provider === "claude"` দ্বারা gated), যেখানে
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) এমন একটি compression
analytics row লেখে, যা নিম্নোক্তভাবে tagged:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = পরিষ্কার করা input-token-এর সংখ্যা
- `request_id`-এর শেষে `::context-editing` যোগ করা হয়

ফলে delegated clearing স্থানীয় engine-গুলোর পাশাপাশি compression analytics-এ
`context-editing` engine label-এর অধীনে দেখা যায় এবং RTK/Caveman/LLMLingua-এর সাশ্রয় থেকে
আলাদাভাবে শনাক্ত করা যায়।

## স্থানীয় কম্প্রেশন ইঞ্জিনগুলোর সঙ্গে সম্পর্ক

| দিক                | স্থানীয় ইঞ্জিন (Caveman / RTK / LLMLingua / stacked) | ডেলিগেটেড কনটেক্সট এডিটিং                               |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------- |
| কোথায় চলে         | অনুরোধটি প্রক্সি ছাড়ার আগে OmniRoute-এ               | প্রোভাইডারে (Claude), সার্ভার-সাইডে                     |
| কী সম্পাদনা করে    | প্রম্পট / কনটেক্সট / টুল-রেজাল্ট টেক্সট               | পুরোনো টুল-ইউজ / টুল-রেজাল্ট ব্লক                       |
| প্রোভাইডারের পরিধি | সব প্রোভাইডার                                         | শুধু `claude` + `anthropic-compatible-cc-*`             |
| টগল                | কম্প্রেশন মোড সেটিংস                                  | `contextEditing.enabled`                                |
| ব্যর্থতার ধরন      | ফেইল-ওপেন (মূল টেক্সট)                                | 400-ফলব্যাক: প্যারামিটার বাদ দিয়ে একবার পুনরায় চেষ্টা |
| সাশ্রয় টেলিমেট্রি | `engine: <engine id>`                                 | `engine: "context-editing"`                             |

দুটি একে অপরের পরিপূরক: স্থানীয় ইঞ্জিনগুলো OmniRoute-এর পাঠানো বাইট কম্প্রেস করে; কনটেক্সট এডিটিং
Claude-কে একাধিক টার্নজুড়ে চলমান কনটেক্সট ছাঁটাই করতে দেয়। দুটিই একসঙ্গে সক্রিয় করা যায়।

## আরও দেখুন

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ইঞ্জিন রেজিস্ট্রি এবং স্থানীয় কম্প্রেশন
  ইঞ্জিনগুলো
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — কমান্ড/টুল-আউটপুট কম্প্রেশন
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP বর্ণনার কম্প্রেশন এবং
  টুল-কার্ডিনালিটি হ্রাস
- সোর্স: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
