# Reasoning Replay Cache (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **প্রামাণ্য উৎস:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40

OmniRoute চিন্তা-মোডের মডেলগুলো দ্বারা তৈরি অ্যাসিস্ট্যান্টের `reasoning_content` ধারণ করে এবং আপস্ট্রিম প্রোভাইডার এটি আবশ্যক করলে বহু-টার্নের অনুরোধে স্বচ্ছভাবে পুনরায় চালায়। এর ফলে ক্লায়েন্টের কথোপকথনের ইতিহাসে আগের টার্নের রিজনিং অনুপস্থিত থাকলে কঠোর প্রোভাইডারগুলো যে HTTP 400 ত্রুটি দেয়, তা দূর হয়।

## এটি কেন বিদ্যমান

বেশ কয়েকটি চিন্তা-মোড প্রোভাইডার একটি ফলো-আপ টার্ন প্রত্যাখ্যান করে, যদি না **আগের অ্যাসিস্ট্যান্ট বার্তায় মূল `reasoning_content` অন্তর্ভুক্ত থাকে**। আপস্ট্রিম নিচের মতো বার্তাসহ 400 ফেরত দেয়:

```
প্যারামিটার ভুল: চিন্তা-মোডের reasoning_content অবশ্যই API-তে ফেরত পাঠাতে হবে।
```

কিন্তু সাধারণ ক্লায়েন্টগুলো (Cursor, Cline, Roo Code, OpenAI SDK) তাদের পুনরায় পাঠানো ইতিহাস থেকে `reasoning_content` সরিয়ে ফেলে। OmniRoute একটি সার্ভার-সাইড ক্যাশ থেকে এটি পুনরুদ্ধার করে, যাতে আপস্ট্রিম যে অনুরোধটি দেখে তা সঙ্গতিপূর্ণ থাকে। ইস্যু #1628 হাইব্রিড মেমরি/SQLite পারসিস্টেন্স চালু করেছে, যাতে প্রসেস পুনরায় চালু হলেও ক্যাশটি টিকে থাকে।

## আর্কিটেকচার

```
পর্ব N (অ্যাসিস্ট্যান্ট তৈরি করে):
  → প্রতিক্রিয়ায় reasoning_content + tool_calls থাকে
  → যদি requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      প্রতিটি tool_call.id দ্বারা কীকৃতভাবে (মেমরি + DB)-তে লেখে
  → ক্লায়েন্টের কাছে প্রতিক্রিয়া পাঠায় (যা reasoning ধরে রাখতেও পারে, না-ও পারে)

পর্ব N+1 (ক্লায়েন্ট ফলো-আপ পাঠায়):
  → অনুবাদক শনাক্ত করে: requiresReasoningReplay(provider, model) === true
  → tool_calls আছে কিন্তু reasoning_content নেই—এমন প্রতিটি অ্যাসিস্ট্যান্ট বার্তার জন্য:
      lookupReasoning(toolCalls[0].id) → মেমরি → DB
      পাওয়া গেলে  → msg.reasoning_content = cached; recordReplay()
      না পাওয়া গেলে → msg.reasoning_content = "" (পুরোনো DeepSeek-এর জন্য লিগ্যাসি ফলব্যাক)
  → আপস্ট্রিম সামঞ্জস্যপূর্ণ ইতিহাস পায় → কোনো 400 নয়
```

ক্যাপচার `open-sse/handlers/chatCore.ts`-এ ঘটে (দুটি স্থানে, দুটি `cacheReasoningFromAssistantMessage` কল সাইটে)। স্কিমা কোয়ার্সনের পরে কিন্তু ডিসপ্যাচের আগে `open-sse/translator/index.ts`-এ রিপ্লে ঘটে।

সাধারণ (টুল-কলবিহীন) অ্যাসিস্ট্যান্ট পর্বগুলো ভিন্নভাবে কীকৃত হয়: `buildAssistantMessageCacheKey()` সেশন স্কোপ এবং সেই পর্ব পর্যন্ত নর্মালাইজ করা OpenAI-ফরম্যাটের ট্রান্সক্রিপ্টের ডাইজেস্ট তৈরি করে, কারণ `tools` উপস্থিত থাকলে DeepSeek-এর _প্রতিটি_ পূর্ববর্তী পর্বের রিজনিং প্রয়োজন হয়। Responses-API টার্গেটগুলোর ক্ষেত্রে (উদাহরণস্বরূপ `opencode-go/deepseek-v4-flash`, যা `/responses`-এ রাউট করা হয়) আপস্ট্রিম বডিতে `messages` নয়, `input` থাকে; তাই `translateRequest()` (`open-sse/translator/index.ts`) একটি কলব্যাক অপশনের মাধ্যমে যে পিভট ট্রান্সক্রিপ্টের ডাইজেস্ট তৈরি করেছে সেটি রিপোর্ট করে এবং ক্যাপচার সাইটগুলোও একই ট্রান্সক্রিপ্টের ডাইজেস্ট তৈরি করে। প্রতিটি সোর্স ফরম্যাটের জন্য Responses রিপ্লে পাসটি OpenAI পিভটে চলে, ফলে Anthropic Messages ক্লায়েন্টগুলোরও (Claude → OpenAI → Responses) রিপ্লে করা হয়।

## স্টোরেজ — হাইব্রিড মেমরি + SQLite

হট পাথটি ক্র্যাশ পুনরুদ্ধার ও ড্যাশবোর্ডে দৃশ্যমানতার জন্য একটি SQLite টেবিল দ্বারা সমর্থিত ইন-মেমরি `Map` (সৃষ্টির ক্রম অনুযায়ী LRU) ব্যবহার করে।

| স্তর  | বাস্তবায়ন                                    | উদ্দেশ্য                                        |
| ----- | --------------------------------------------- | ----------------------------------------------- |
| মেমরি | `open-sse/services/reasoningCache.ts`-এ `Map` | দ্রুত লুকআপ, 200-তে সবচেয়ে পুরোনোটি অপসারণ করে |
| DB    | `reasoning_cache` টেবিল (`src/lib/db/`)       | রিস্টার্টের পরও টিকে থাকে, পরিসংখ্যান চালায়    |

লেখাগুলো উভয় স্থানেই যায়। রিড প্রথমে মেমরি পরীক্ষা করে, তারপর ফলব্যাক হিসেবে DB ব্যবহার করে (DB হিটগুলো পুনরায় মেমরিতে উন্নীত করা হয়)। DB ব্যর্থতা মারাত্মক নয় — ইন-মেমরি ক্যাশ হট পাথকে সেবা দিয়ে যেতে থাকে।

**ডিফল্ট মান:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- সর্বোচ্চ মেমরি এন্ট্রি: `200` (`MAX_MEMORY_ENTRIES`)
- অপসারণ: প্রথমে সবচেয়ে পুরোনো `createdAt`

## ডেটাবেস স্কিমা

মাইগ্রেশন: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

ইনডেক্সসমূহ: `expires_at`, `provider`, `model`, `created_at`। `expires_at` Unix epoch সেকেন্ড হিসেবে সংরক্ষণ করা হয়; SELECT স্তরটি `EXPIRES_AT_EPOCH_SQL`-এর মাধ্যমে পুরোনো টেক্সট মানগুলোকে স্বাভাবিকীকরণ করে।

## প্রোভাইডার / মডেল শনাক্তকরণ

`requiresReasoningReplay(provider, model)` যখন `true` রিটার্ন করে, তখন Replay সক্রিয় হয়। ফাংশনটি `open-sse/services/reasoningCache.ts`-এ থাকা দুটি তালিকা পরীক্ষা করে।

**প্রোভাইডার ID (হুবহু মিল, অক্ষরের বড়-ছোট ভেদাভেদহীন):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**মডেলের regex প্যাটার্ন (অক্ষরের বড়-ছোট ভেদাভেদহীন):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` এবং `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ঐচ্ছিক `-free` suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

নতুন কোনো strict প্রোভাইডার/মডেল যোগ করার অর্থ হলো এই তালিকাগুলোর একটিতে সেটি সংযোজন করা এবং replay injection নিশ্চিত করে এমন একটি unit test লেখা। PR-এর বিবরণে পরিবর্তনটির কারণ হওয়া upstream-এর হুবহু 400 string উল্লেখ করা উচিত।

## REST API

ক্যাশটি `src/app/api/cache/reasoning/route.ts`-এর অধীনে দুটি endpoint প্রকাশ করে। উভয়ের জন্যই management authentication (`@/shared/utils/apiAuth` থেকে `isAuthenticated`) আবশ্যক।

| মেথড   | Endpoint                                                  | বিবরণ                                                           |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | পরিসংখ্যান + পৃষ্ঠাবিন্যস্ত এন্ট্রি                             |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | ফিল্টার করা তালিকা (`limit`-কে `[1, 200]` সীমার মধ্যে রাখা হয়) |
| DELETE | `/api/cache/reasoning`                                    | সবকিছু (memory + DB) মুছে দেয় এবং hit/miss গণনা রিসেট করে      |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | শুধু একটি প্রোভাইডারের এন্ট্রিগুলো মুছে দেয়                    |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | একটি একক এন্ট্রি মুছে দেয়                                      |

**GET response-এর গঠন:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## পরিচালনাগত নোট

- **পরিষ্কারকরণ:** `cleanupReasoningCache()` মেয়াদোত্তীর্ণ memory entry মুছে দেয় এবং `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` চালায়। Health-check worker-গুলো পর্যায়ক্রমে এটি কল করে।
- **ক্র্যাশ পুনরুদ্ধার:** Restart-এর পরে memory খালি থাকে, কিন্তু DB-তে মেয়াদোত্তীর্ণ না হওয়া entry-গুলো থেকে যায়। নির্দিষ্ট একটি `tool_call_id`-এর প্রথম lookup হলো DB hit; পরবর্তী lookup-গুলো হলো memory hit।
- **Reasoning নেই, cache-ও নেই:** Assistant message-এ কোনো `reasoning_content` / `reasoning` field না থাকলে `cacheReasoningFromAssistantMessage` `0` রিটার্ন করে, তাই non-thinking response-এর জন্য কোনো ব্যয় হয় না।
- **Write-ও শর্তসাপেক্ষ:** `chatCore.ts`-এর উভয় call site (non-streaming এবং streaming) কেবল তখনই `cacheReasoningFromAssistantMessage()` কল করে, যখন `requiresReasoningReplay(provider, model)` হলো `true` — read side-ও একই predicate পরীক্ষা করে। যেসব install কখনও replay provider ব্যবহার করে না, সেগুলো reasoning-বহনকারী প্রতিটি response-এর ক্ষেত্রে write, index update এবং try/catch-এর ব্যয় বহন করা বন্ধ করে।
- **Non-strict প্রোভাইডার:** `requiresReasoningReplay` যখন `false` এবং target format হলো OpenAI, তখন translator outgoing message থেকে যেকোনো `reasoning_content` field **সরিয়ে দেয়** — OpenAI Chat Completions এটি গ্রহণ করে না।

## আরও দেখুন

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — সার্কিট ব্রেকার, কুলডাউন, মডেল লকআউট
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — আপস্ট্রিম 400 ত্রুটি নির্ণয়
- সোর্স: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- মাইগ্রেশন: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API রুট: `src/app/api/cache/reasoning/route.ts`
- মূল ইস্যু: #1628
