# Reasoning Replay Cache (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ប្រភពពិតប្រាកដ:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-06-28 — v3.8.40

OmniRoute ចាប់យក `reasoning_content` របស់ assistant ដែលបង្កើតដោយម៉ូដែលក្នុង thinking-mode ហើយចាក់វាឡើងវិញដោយតម្លាភាពលើសំណើច្រើនវេន នៅពេល upstream provider តម្រូវឱ្យមានវា។ វាលុបបំបាត់កំហុស HTTP 400 ដែល provider ដែលមានលក្ខខណ្ឌតឹងរ៉ឹងបញ្ចេញ នៅពេលប្រវត្តិសន្ទនារបស់ client បាត់ reasoning ពីវេនមុន។

## ហេតុអ្វីបានជាវាមាន

thinking-mode provider មួយចំនួនបដិសេធវេនបន្ទាប់ លុះត្រាតែ **សាររបស់ assistant មុនមាន `reasoning_content` ដើម**។ Upstream ត្រឡប់ 400 ជាមួយសារដូចជា៖

```
ប៉ារ៉ាម៉ែត្រមិនត្រឹមត្រូវ៖ reasoning_content ក្នុង thinking mode ត្រូវតែបញ្ជូនត្រឡប់ទៅ API។
```

ប៉ុន្តែ client ទូទៅ (Cursor, Cline, Roo Code, OpenAI SDK) ដក `reasoning_content` ចេញពីប្រវត្តិដែលពួកវាចាក់ឡើងវិញ។ OmniRoute ស្ដារវាពី cache នៅផ្នែក server ដើម្បីឱ្យសំណើដែល upstream មើលឃើញមានភាពស៊ីសង្វាក់គ្នា។ Issue #1628 បានណែនាំការរក្សាទុកបែបកូនកាត់ memory/SQLite ដើម្បីឱ្យ cache នៅតែមានបន្ទាប់ពី process ចាប់ផ្ដើមឡើងវិញ។

## ស្ថាបត្យកម្ម

```
វេន N (assistant បង្កើត):
  → response មាន reasoning_content + tool_calls
  → ប្រសិនបើ requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      សរសេរ (memory + DB) ដោយប្រើ tool_call.id នីមួយៗជាគន្លឹះ
  → បញ្ជូន response ទៅ client (ដែលអាចរក្សាទុក ឬមិនរក្សាទុក reasoning)

វេន N+1 (client ផ្ញើសំណើបន្ត):
  → translator រកឃើញ៖ requiresReasoningReplay(provider, model) === true
  → សម្រាប់សារ assistant នីមួយៗដែលមាន tool_calls និងគ្មាន reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      រកឃើញ  → msg.reasoning_content = cached; recordReplay()
      រកមិនឃើញ → msg.reasoning_content = "" (ជម្រើសបម្រុង legacy សម្រាប់ DeepSeek ចាស់ៗ)
  → upstream មើលឃើញប្រវត្តិដែលស៊ីសង្វាក់គ្នា → គ្មាន 400
```

ការចាប់យកកើតឡើងក្នុង `open-sse/handlers/chatCore.ts` (ពីរទីតាំង នៅត្រង់ទីតាំងហៅ `cacheReasoningFromAssistantMessage` ទាំងពីរ)។ ការចាក់ឡើងវិញកើតឡើងក្នុង `open-sse/translator/index.ts` បន្ទាប់ពីការបង្ខំឱ្យត្រូវតាម schema ប៉ុន្តែមុនពេលបញ្ជូនចេញ។

## ការផ្ទុក — Memory + SQLite បែបកូនកាត់

Hot path ប្រើ `Map` ក្នុង memory (LRU តាមពេលបង្កើត) ដែលគាំទ្រដោយតារាង SQLite សម្រាប់ការស្ដារឡើងវិញក្រោយ crash និងភាពអាចមើលឃើញនៅលើ dashboard។

| ស្រទាប់ | ការអនុវត្ត                                        | គោលបំណង                                                   |
| ------- | ------------------------------------------------- | --------------------------------------------------------- |
| Memory  | `Map` ក្នុង `open-sse/services/reasoningCache.ts` | ការស្វែងរកលឿន ដកធាតុចាស់បំផុតចេញនៅចំនួន 200               |
| DB      | តារាង `reasoning_cache` (`src/lib/db/`)           | រក្សាទុកឆ្លងកាត់ការចាប់ផ្ដើមឡើងវិញ និងផ្ដល់ទិន្នន័យស្ថិតិ |

ការសរសេរត្រូវបានធ្វើទៅទាំងពីរ។ ការអានពិនិត្យ memory ជាមុនសិន បន្ទាប់មកត្រឡប់ទៅប្រើ DB ប្រសិនបើរកមិនឃើញ (លទ្ធផលដែលរកឃើញក្នុង DB ត្រូវបានដាក់ត្រឡប់ចូល memory)។ ការបរាជ័យរបស់ DB មិនបណ្ដាលឱ្យប្រព័ន្ធឈប់ដំណើរការទេ — cache ក្នុង memory បន្តបម្រើ hot path។

**តម្លៃលំនាំដើម:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- ចំនួនធាតុអតិបរមាក្នុង memory: `200` (`MAX_MEMORY_ENTRIES`)
- ការដកចេញ: `createdAt` ចាស់បំផុតមុន

## គ្រោងការណ៍មូលដ្ឋានទិន្នន័យ

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexes: `expires_at`, `provider`, `model`, `created_at`។ `expires_at` ត្រូវបានរក្សាទុកជា Unix epoch seconds; ស្រទាប់ SELECT ធ្វើឱ្យតម្លៃអត្ថបទ legacy មានទម្រង់ស្តង់ដារតាមរយៈ `EXPIRES_AT_EPOCH_SQL`។

## ការរកឃើញ Provider / Model

Replay ត្រូវបានបើកនៅពេល `requiresReasoningReplay(provider, model)` ត្រឡប់ `true`។ អនុគមន៍នេះពិនិត្យបញ្ជីពីរនៅក្នុង `open-sse/services/reasoningCache.ts`។

**Provider IDs (ផ្គូផ្គងដាច់ខាត ដោយមិនប្រកាន់អក្សរធំតូច):**

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

**លំនាំ regex របស់ Model (មិនប្រកាន់អក្សរធំតូច):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` និង `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro ជាមួយបច្ច័យ `-free` ដែលអាចមានឬមិនមាន)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

ការបន្ថែម provider/model ថ្មីដែលមានលក្ខខណ្ឌតឹងរ៉ឹង មានន័យថាត្រូវបន្ថែមវាទៅក្នុងបញ្ជីមួយក្នុងចំណោមបញ្ជីទាំងនេះ និងសរសេរ unit test ដើម្បីបញ្ជាក់ពីការបញ្ចូល replay។ សេចក្ដីពិពណ៌នា PR គួរតែយោងខ្សែអក្សរ upstream 400 ដាច់ខាត ដែលជាមូលហេតុនាំឱ្យមានការផ្លាស់ប្ដូរនេះ។

## REST API

Cache ផ្ដល់ endpoint ចំនួនពីរនៅក្រោម `src/app/api/cache/reasoning/route.ts`។ ទាំងពីរតម្រូវឱ្យមានការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវសម្រាប់ការគ្រប់គ្រង (`isAuthenticated` ពី `@/shared/utils/apiAuth`)។

| Method | Endpoint                                                  | ការពិពណ៌នា                                                     |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | ស្ថិតិ + ធាតុដែលបែងចែកជាទំព័រ                                  |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | បញ្ជីដែលបានត្រង (`limit` ត្រូវបានកម្រិតក្នុងចន្លោះ `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | សម្អាតទាំងអស់ (memory + DB) និងកំណត់ចំនួន hit/miss ឡើងវិញ      |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | សម្អាតតែធាតុសម្រាប់ provider មួយប៉ុណ្ណោះ                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | លុបធាតុតែមួយ                                                   |

**ទម្រង់ response របស់ GET:**

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

## កំណត់សម្គាល់ប្រតិបត្តិការ

- **ការសម្អាត:** `cleanupReasoningCache()` លុបចោលធាតុ memory ដែលផុតកំណត់ និងដំណើរការ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`។ Worker ពិនិត្យសុខភាពហៅវាជាប្រចាំ។
- **ការស្ដារឡើងវិញបន្ទាប់ពីគាំង:** បន្ទាប់ពីចាប់ផ្ដើមឡើងវិញ memory គឺទទេ ប៉ុន្តែ DB នៅតែរក្សាធាតុដែលមិនទាន់ផុតកំណត់។ ការស្វែងរកលើកដំបូងសម្រាប់ `tool_call_id` ដែលបានផ្ដល់ គឺជា DB hit; ការស្វែងរកជាបន្តបន្ទាប់គឺជា memory hit។
- **គ្មាន reasoning គ្មាន cache:** `cacheReasoningFromAssistantMessage` ត្រឡប់ `0` នៅពេលសារ assistant មិនមាន field `reasoning_content` / `reasoning` ដូច្នេះ response ដែលមិនប្រើការគិតមិនចំណាយអ្វីឡើយ។
- **ការសរសេរក៏ត្រូវបានគ្រប់គ្រងដោយលក្ខខណ្ឌផងដែរ:** call site ទាំងពីរនៅក្នុង `chatCore.ts` (non-streaming និង streaming) ហៅ `cacheReasoningFromAssistantMessage()` តែនៅពេល `requiresReasoningReplay(provider, model)` គឺ `true` ប៉ុណ្ណោះ — ជា predicate ដូចគ្នាដែលផ្នែកអានពិនិត្យ។ ការដំឡើងដែលមិនដែលប្រើ replay provider នឹងមិនចាំបាច់ចំណាយលើការសរសេរ ការធ្វើបច្ចុប្បន្នភាព index និង try/catch សម្រាប់រាល់ response ដែលមាន reasoning ទៀតទេ។
- **Provider ដែលមិនមានលក្ខខណ្ឌតឹងរ៉ឹង:** នៅពេល `requiresReasoningReplay` គឺ `false` ហើយទម្រង់គោលដៅគឺ OpenAI នោះ translator នឹង **ដកចេញ** field `reasoning_content` ទាំងឡាយពីសារដែលផ្ញើចេញ — OpenAI Chat Completions មិនទទួលយកវាទេ។

## សូមមើលផងដែរ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, រយៈពេលរង់ចាំ, ការចាក់សោម៉ូដែល
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ការធ្វើរោគវិនិច្ឆ័យកំហុស 400 ពី upstream
- កូដប្រភព៖ `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- ការផ្លាស់ទីទិន្នន័យ៖ `src/lib/db/migrations/033_create_reasoning_cache.sql`
- ផ្លូវ API៖ `src/app/api/cache/reasoning/route.ts`
- បញ្ហាដើម៖ #1628
