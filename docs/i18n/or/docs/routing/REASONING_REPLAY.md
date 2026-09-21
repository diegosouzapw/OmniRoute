# Reasoning Replay Cache (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ସତ୍ୟର ମୂଳ ଉତ୍ସ:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **ଶେଷ ଅଦ୍ୟତନ:** 2026-06-28 — v3.8.40

OmniRoute, thinking-mode ମଡେଲ୍ଗୁଡ଼ିକ ଦ୍ୱାରା ଉତ୍ପାଦିତ ସହାୟକର `reasoning_content` କ୍ୟାପ୍ଚର୍ କରେ ଏବଂ ଯେତେବେଳେ ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରଦାତା ଏହା ଆବଶ୍ୟକ କରେ, ବହୁ-ଟର୍ଣ୍ଣ ଅନୁରୋଧଗୁଡ଼ିକରେ ଏହାକୁ ସ୍ୱଚ୍ଛ ଭାବରେ ପୁନଃଚାଳନ କରେ। ଏହା କ୍ଲାଏଣ୍ଟର ବାର୍ତ୍ତାଳାପ ଇତିହାସରେ ପୂର୍ବ ଟର୍ଣ୍ଣର reasoning ନଥିବାବେଳେ କଠୋର ପ୍ରଦାତାମାନେ ଦେଉଥିବା HTTP 400 ତ୍ରୁଟିଗୁଡ଼ିକୁ ଦୂର କରେ।

## ଏହା କାହିଁକି ରହିଛି

ଅନେକ thinking-mode ପ୍ରଦାତା ଏକ follow-up ଟର୍ଣ୍ଣକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରନ୍ତି, ଯଦି **ପୂର୍ବବର୍ତ୍ତୀ ସହାୟକ ବାର୍ତ୍ତାରେ ମୂଳ `reasoning_content` ଅନ୍ତର୍ଭୁକ୍ତ ନଥାଏ**। ଅପ୍ଷ୍ଟ୍ରିମ୍ ଏହିପରି ବାର୍ତ୍ତା ସହିତ 400 ଫେରାଏ:

```
ପାରାମିଟର୍ ଭୁଲ୍: thinking modeର reasoning_contentକୁ APIକୁ ପୁଣି ପଠାଇବା ଆବଶ୍ୟକ।
```

କିନ୍ତୁ ସାଧାରଣ କ୍ଲାଏଣ୍ଟଗୁଡ଼ିକ (Cursor, Cline, Roo Code, OpenAI SDK) ସେମାନେ ପୁନଃଚାଳନ କରୁଥିବା ଇତିହାସରୁ `reasoning_content` ହଟାଇ ଦିଅନ୍ତି। OmniRoute ଏହାକୁ ସର୍ଭର୍-ସାଇଡ୍ କ୍ୟାଶ୍ରୁ ପୁନରୁଦ୍ଧାର କରେ, ଯାହାଫଳରେ ଅପ୍ଷ୍ଟ୍ରିମ୍ ଦେଖୁଥିବା ଅନୁରୋଧ ସୁସଙ୍ଗତ ରହେ। Issue #1628 ହାଇବ୍ରିଡ୍ ମେମୋରି/SQLite ସ୍ଥାୟୀକରଣ ପ୍ରଚଳନ କରିଥିଲା, ଯାହାଫଳରେ ପ୍ରକ୍ରିୟା ପୁନଃପ୍ରାରମ୍ଭ ପରେ ମଧ୍ୟ କ୍ୟାଶ୍ ଅକ୍ଷୁଣ୍ଣ ରହେ।

## ସଂରଚନା

```
ଟର୍ଣ୍ଣ N (ସହାୟକ ଉତ୍ପାଦନ କରେ):
  → ପ୍ରତିକ୍ରିୟାରେ reasoning_content + tool_calls ଥାଏ
  → ଯଦି requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      ପ୍ରତ୍ୟେକ tool_call.id ଦ୍ୱାରା କୀ କରି (ମେମୋରି + DB)ରେ ଲେଖେ
  → ପ୍ରତିକ୍ରିୟାକୁ କ୍ଲାଏଣ୍ଟକୁ ଫର୍ୱାର୍ଡ୍ କରେ (ଯିଏ reasoning ରଖିପାରେ କିମ୍ବା ନ ରଖିପାରେ)

ଟର୍ଣ୍ଣ N+1 (କ୍ଲାଏଣ୍ଟ follow-up ପଠାଏ):
  → ଅନୁବାଦକ ଚିହ୍ନଟ କରେ: requiresReasoningReplay(provider, model) === true
  → tool_calls ଥିବା ଏବଂ reasoning_content ନଥିବା ପ୍ରତ୍ୟେକ ସହାୟକ ବାର୍ତ୍ତା ପାଇଁ:
      lookupReasoning(toolCalls[0].id) → ମେମୋରି → DB
      ମିଳିଲେ  → msg.reasoning_content = cached; recordReplay()
      ନ ମିଳିଲେ → msg.reasoning_content = "" (ପୁରୁଣା DeepSeek ପାଇଁ ପାରମ୍ପରିକ fallback)
  → ଅପ୍ଷ୍ଟ୍ରିମ୍ ସୁସଙ୍ଗତ ଇତିହାସ ଦେଖେ → 400 ତ୍ରୁଟି ହୁଏ ନାହିଁ
```

କ୍ୟାପ୍ଚର୍ `open-sse/handlers/chatCore.ts`ରେ ହୁଏ (ଦୁଇଟି ସ୍ଥାନରେ, ଦୁଇଟି `cacheReasoningFromAssistantMessage` call siteରେ)। ସ୍କିମା coercion ପରେ କିନ୍ତୁ dispatch ପୂର୍ବରୁ `open-sse/translator/index.ts`ରେ ପୁନଃଚାଳନ ହୁଏ।

## ସଂରକ୍ଷଣ — ହାଇବ୍ରିଡ୍ ମେମୋରି + SQLite

ହଟ୍ ପାଥ୍, କ୍ରାଶ୍ ପୁନରୁଦ୍ଧାର ଏବଂ ଡ୍ୟାସ୍ବୋର୍ଡ୍ ଦୃଶ୍ୟମାନତା ପାଇଁ SQLite ଟେବୁଲ୍ଦ୍ୱାରା ସମର୍ଥିତ ଏକ ଇନ୍-ମେମୋରି `Map` (ସୃଷ୍ଟିକ୍ରମ ଅନୁସାରେ LRU) ବ୍ୟବହାର କରେ।

| ସ୍ତର   | କାର୍ଯ୍ୟାନ୍ୱୟନ                                 | ଉଦ୍ଦେଶ୍ୟ                                                  |
| ------ | --------------------------------------------- | --------------------------------------------------------- |
| ମେମୋରି | `open-sse/services/reasoningCache.ts`ରେ `Map` | ଦ୍ରୁତ lookup, 200ରେ ସବୁଠାରୁ ପୁରୁଣା entryକୁ ବହିଷ୍କାର କରେ   |
| DB     | `reasoning_cache` ଟେବୁଲ୍ (`src/lib/db/`)      | ପୁନଃପ୍ରାରମ୍ଭ ପରେ ମଧ୍ୟ ସ୍ଥାୟୀ ରହେ, ପରିସଂଖ୍ୟାନ ପରିଚାଳନା କରେ |

ଲେଖା ଉଭୟକୁ ଯାଏ। ପଠନ ପ୍ରଥମେ ମେମୋରିକୁ ଯାଞ୍ଚ କରେ, ତା’ପରେ DBକୁ fallback କରେ (DBରେ ମିଳିଥିବା entryଗୁଡ଼ିକୁ ପୁଣି ମେମୋରିକୁ ଉନ୍ନୀତ କରାଯାଏ)। DB ବିଫଳତା ଘାତକ ନୁହେଁ — ଇନ୍-ମେମୋରି କ୍ୟାଶ୍ ହଟ୍ ପାଥ୍କୁ ସେବା ଦେବା ଜାରି ରଖେ।

**ଡିଫଲ୍ଟଗୁଡ଼ିକ:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- ସର୍ବାଧିକ ମେମୋରି entry: `200` (`MAX_MEMORY_ENTRIES`)
- ବହିଷ୍କାର: ସବୁଠାରୁ ପୁରୁଣା `createdAt` ପ୍ରଥମେ

## ଡାଟାବେସ୍ ସ୍କିମା

ମାଇଗ୍ରେସନ୍: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ଇଣ୍ଡେକ୍ସଗୁଡ଼ିକ: `expires_at`, `provider`, `model`, `created_at`। `expires_at`କୁ Unix epoch ସେକେଣ୍ଡ୍ ଭାବରେ ସଂରକ୍ଷଣ କରାଯାଏ; SELECT ସ୍ତର `EXPIRES_AT_EPOCH_SQL` ମାଧ୍ୟମରେ ପୁରୁଣା ଟେକ୍ସଟ୍ ମୂଲ୍ୟଗୁଡ଼ିକୁ ସାମାନ୍ୟୀକୃତ କରେ।

## ପ୍ରଦାତା / ମଡେଲ୍ ଚିହ୍ନଟ

`requiresReasoningReplay(provider, model)` ଦ୍ୱାରା `true` ଫେରାଯିବା ସମୟରେ Replay ସକ୍ଷମ ହୁଏ। ଫଙ୍କସନ୍ଟି `open-sse/services/reasoningCache.ts` ଭିତରେ ଥିବା ଦୁଇଟି ତାଲିକା ଯାଞ୍ଚ କରେ।

**ପ୍ରଦାତା IDଗୁଡ଼ିକ (ସଠିକ୍ ମେଳ, ଅକ୍ଷରର case ପ୍ରତି ସମ୍ବେଦନଶୀଳ ନୁହେଁ):**

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

**ମଡେଲ୍ regex ପ୍ୟାଟର୍ନଗୁଡ଼ିକ (ଅକ୍ଷରର case ପ୍ରତି ସମ୍ବେଦନଶୀଳ ନୁହେଁ):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ଏବଂ `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ବୈକଳ୍ପିକ `-free` ପ୍ରତ୍ୟୟ)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

କୌଣସି ନୂତନ strict ପ୍ରଦାତା/ମଡେଲ୍ ଯୋଡ଼ିବା ପାଇଁ ଏହି ତାଲିକାଗୁଡ଼ିକ ମଧ୍ୟରୁ ଗୋଟିଏରେ ତାହାକୁ ଯୋଡ଼ିବା ଏବଂ replay injection ସୁନିଶ୍ଚିତ କରୁଥିବା ଏକ unit test ଲେଖିବା ଆବଶ୍ୟକ। PR ବର୍ଣ୍ଣନାରେ ପରିବର୍ତ୍ତନଟି ପାଇଁ ପ୍ରେରଣା ଦେଇଥିବା ସଠିକ୍ upstream 400 string ଉଲ୍ଲେଖ କରାଯିବା ଉଚିତ।

## REST API

କ୍ୟାଶ୍ଟି `src/app/api/cache/reasoning/route.ts` ଅଧୀନରେ ଦୁଇଟି endpoint ପ୍ରଦାନ କରେ। ଉଭୟ ପାଇଁ ପରିଚାଳନା ପ୍ରାମାଣିକରଣ (`@/shared/utils/apiAuth`ରୁ `isAuthenticated`) ଆବଶ୍ୟକ।

| ପଦ୍ଧତି | Endpoint                                                  | ବିବରଣୀ                                                               |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | ପରିସଂଖ୍ୟାନ + ପୃଷ୍ଠାଙ୍କିତ entryଗୁଡ଼ିକ                                 |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | ଫିଲ୍ଟର୍ କରାଯାଇଥିବା ତାଲିକା (`limit`କୁ `[1, 200]` ମଧ୍ୟରେ ସୀମିତ କରାଯାଏ) |
| DELETE | `/api/cache/reasoning`                                    | ସବୁକିଛି (memory + DB) ସଫା କରି hit/miss ଗଣନା ପୁନଃସେଟ୍ କରେ             |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | କେବଳ ଗୋଟିଏ ପ୍ରଦାତାର entryଗୁଡ଼ିକୁ ସଫା କରେ                             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ଏକକ entry ବିଲୋପ କରେ                                                  |

**GET ପ୍ରତିକ୍ରିୟାର ଗଠନ:**

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

## ପରିଚାଳନାଗତ ଟିପ୍ପଣୀ

- **ସଫେଇ:** `cleanupReasoningCache()`ର ମିଆଦ ସମାପ୍ତ memory entryଗୁଡ଼ିକୁ ହଟାଏ ଏବଂ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` ଚଲାଏ। Health-check workerଗୁଡ଼ିକ ଏହାକୁ ସମୟାନ୍ତରରେ କଲ୍ କରନ୍ତି।
- **କ୍ରାଶ୍ ପରବର୍ତ୍ତୀ ପୁନରୁଦ୍ଧାର:** ପୁନଃଆରମ୍ଭ ପରେ memory ଖାଲି ଥାଏ, କିନ୍ତୁ DBରେ ମିଆଦ ସମାପ୍ତ ହୋଇନଥିବା entryଗୁଡ଼ିକ ରହିଥାଏ। ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ `tool_call_id` ପାଇଁ ପ୍ରଥମ lookup ହେଉଛି ଏକ DB hit; ପରବର୍ତ୍ତୀ lookupଗୁଡ଼ିକ memory hit ଅଟେ।
- **reasoning ନାହିଁ, cache ନାହିଁ:** assistant messageରେ `reasoning_content` / `reasoning` field ନଥିଲେ `cacheReasoningFromAssistantMessage` `0` ଫେରାଏ, ତେଣୁ non-thinking ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକର କୌଣସି ମୂଲ୍ୟ ପଡ଼େନାହିଁ।
- **ଲେଖନ ମଧ୍ୟ ନିୟନ୍ତ୍ରିତ:** `chatCore.ts`ରେ ଥିବା ଉଭୟ call site (non-streaming ଏବଂ streaming) କେବଳ `requiresReasoningReplay(provider, model)` `true` ହେଲେ `cacheReasoningFromAssistantMessage()`କୁ କଲ୍ କରନ୍ତି — read ପାର୍ଶ୍ୱ ଯାଞ୍ଚ କରୁଥିବା ସମାନ predicate। କେବେବି କୌଣସି replay ପ୍ରଦାତା ବ୍ୟବହାର କରୁନଥିବା installଗୁଡ଼ିକ ପ୍ରତ୍ୟେକ reasoning-ଧାରଣକାରୀ ପ୍ରତିକ୍ରିୟା ପାଇଁ write, index update ଏବଂ try/catchର ମୂଲ୍ୟ ବହନ କରିବା ବନ୍ଦ କରନ୍ତି।
- **Non-strict ପ୍ରଦାତା:** `requiresReasoningReplay` `false` ଥିବାବେଳେ ଏବଂ ଲକ୍ଷ୍ୟ format OpenAI ହୋଇଥିଲେ, translator ବାହାରକୁ ପଠାଯାଉଥିବା messageଗୁଡ଼ିକରୁ ଯେକୌଣସି `reasoning_content` fieldକୁ **ହଟାଇଦିଏ** — OpenAI Chat Completions ଏହାକୁ ଗ୍ରହଣ କରେନାହିଁ।

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ସର୍କିଟ୍ ବ୍ରେକର୍, କୁଲ୍ଡାଉନ୍, ମଡେଲ୍ ଲକ୍ଆଉଟ୍
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ଅପ୍ଷ୍ଟ୍ରିମ୍ 400 ତ୍ରୁଟିଗୁଡ଼ିକର ନିଦାନ
- ଉତ୍ସ: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- ମାଇଗ୍ରେସନ୍: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ରୁଟ୍: `src/app/api/cache/reasoning/route.ts`
- ମୂଳ ସମସ୍ୟା: #1628
