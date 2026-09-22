# Reasoning Replay Cache (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **የእውነት ምንጭ:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **ለመጨረሻ ጊዜ የተዘመነው:** 2026-06-28 — v3.8.40

OmniRoute በማሰብ ሁነታ ሞዴሎች የሚመነጨውን የረዳት `reasoning_content` ይይዛል፣ እና የላይኛው አቅራቢ በሚፈልገው ጊዜ ባለብዙ ዙር ጥያቄዎች ላይ ያለምንም ችግር መልሶ ያጫውተዋል። ይህም የደንበኛው የውይይት ታሪክ የቀደመውን ዙር የማመዛዘን ይዘት ሳያካትት ሲቀር ጥብቅ አቅራቢዎች የሚያስነሱትን HTTP 400 ስህተቶች ያስወግዳል።

## ይህ ለምን እንዳለ

በርካታ የማሰብ ሁነታ አቅራቢዎች **የቀደመው የረዳት መልዕክት ዋናውን `reasoning_content` ካላካተተ** ተከታይ ዙርን አይቀበሉም። የላይኛው አገልግሎት እንደሚከተለው ያሉ መልዕክቶችን ከ400 ጋር ይመልሳል፦

```
መለኪያው ትክክል አይደለም፦ በማሰብ ሁነታ ውስጥ ያለው reasoning_content ወደ API ተመልሶ መላክ አለበት።
```

ነገር ግን የተለመዱ ደንበኞች (Cursor, Cline, Roo Code, OpenAI SDK) እንደገና ከሚያጫውቱት ታሪክ ውስጥ `reasoning_content`ን ያስወግዳሉ። የላይኛው አገልግሎት የሚያየው ጥያቄ ወጥነት እንዲኖረው OmniRoute ከአገልጋይ-ወገን መሸጎጫ ይመልሰዋል። መሸጎጫው የሂደት ዳግም ማስጀመሮችን ተቋቁሞ እንዲቆይ፣ Issue #1628 ድብልቅ የማህደረ ትውስታ/SQLite ቋሚ ማከማቻን አስተዋወቀ።

## አርክቴክቸር

```
ዙር N (ረዳቱ ያመነጫል):
  → ምላሹ reasoning_content + tool_calls ይዟል
  → requiresReasoningReplay(provider, model) ከሆነ፦ cacheReasoningFromAssistantMessage()
      በእያንዳንዱ tool_call.id ቁልፍ ተደርጎ (memory + DB) ላይ ይጽፋል
  → ምላሹን ምክንያታዊ ይዘቱን ሊያቆይም ላያቆይም ወደሚችለው ደንበኛ ያስተላልፋል

ዙር N+1 (ደንበኛው ተከታይ ጥያቄ ይልካል):
  → ተርጓሚው ይህን ይለያል፦ requiresReasoningReplay(provider, model) === true
  → tool_calls ላለው እና reasoning_content ለሌለው ለእያንዳንዱ የረዳት መልዕክት፦
      lookupReasoning(toolCalls[0].id) → memory → DB
      ከተገኘ  → msg.reasoning_content = cached; recordReplay()
      ካልተገኘ → msg.reasoning_content = "" (ለቆዩ DeepSeek ስሪቶች የተተወ አማራጭ)
  → ወደላይ ያለው አገልግሎት ወጥ የሆነ ታሪክ ያያል → 400 አይከሰትም
```

ቀረጻው በ`open-sse/handlers/chatCore.ts` ውስጥ (በሁለት ቦታዎች፣ በሁለቱ የ`cacheReasoningFromAssistantMessage` ጥሪ ቦታዎች) ይከናወናል። ድጋሚ ማጫወቱ ከስኬማ ማስማማት በኋላ፣ ነገር ግን ከማሰራጨት በፊት በ`open-sse/translator/index.ts` ውስጥ ይከናወናል።

ተራ (የመሣሪያ ጥሪ የሌላቸው) የረዳት ዙሮች በተለየ መንገድ ቁልፍ ይሰጣቸዋል፦ `buildAssistantMessageCacheKey()` የክፍለ-ጊዜውን ወሰን እና እስከዚያ ዙር ድረስ ያለውን መደበኛ የተደረገ የOpenAI-ቅርጸት ውይይት ዲጄስት ያደርጋል፤ ምክንያቱም `tools` ከተካተተ በኋላ DeepSeek የ_እያንዳንዱን_ ቀዳሚ ዙር ምክንያታዊ ይዘት ይፈልጋል። ለResponses-API ዒላማዎች (ለምሳሌ `opencode-go/deepseek-v4-flash`፣ ወደ `/responses` የሚመራ) ወደላይ የሚላከው የጥያቄ አካል `messages` ሳይሆን `input` ይይዛል፤ ስለዚህ `translateRequest()` (`open-sse/translator/index.ts`) በመልሶ ጥሪ አማራጭ በኩል ዲጄስት ያደረገውን የሽግግር ውይይት ሪፖርት ያደርጋል፣ የቀረጻ ቦታዎቹም ያንኑ ውይይት ዲጄስት ያደርጋሉ። የResponses ድጋሚ ማጫወት ሂደት ለእያንዳንዱ የምንጭ ቅርጸት በOpenAI የሽግግር ቅርጽ ላይ ይሠራል፤ ስለዚህ የAnthropic Messages ደንበኞችም (Claude → OpenAI → Responses) እንደገና ይጫወታሉ።

## ማከማቻ — ድብልቅ ማህደረ ትውስታ + SQLite

ፈጣኑ መስመር ለብልሽት መልሶ ማግኛ እና ለዳሽቦርድ ታይነት በSQLite ሰንጠረዥ የተደገፈ የውስጠ-ማህደረ ትውስታ `Map` (በመፈጠሪያ ጊዜ ላይ የተመሠረተ LRU) ይጠቀማል።

| ንብርብር     | አተገባበር                                           | ዓላማ                                   |
| --------- | ------------------------------------------------ | ------------------------------------- |
| ማህደረ ትውስታ | `Map` በ`open-sse/services/reasoningCache.ts` ውስጥ | ፈጣን ፍለጋዎች፣ 200 ሲደርስ አሮጌውን ያስወግዳል      |
| DB        | `reasoning_cache` ሰንጠረዥ (`src/lib/db/`)          | በዳግም ማስጀመሮች መካከል ይቆያል፣ ስታቲስቲክስን ያቀርባል |

ጽሑፎች ወደ ሁለቱም ይላካሉ። ንባቦች በመጀመሪያ ማህደረ ትውስታን ያረጋግጣሉ፣ ከዚያም ካልተገኘ DBን ይጠቀማሉ (በDB የተገኙ ውጤቶች እንደገና ወደ ማህደረ ትውስታ ይገባሉ)። የDB ውድቀቶች ከባድ አይደሉም — የውስጠ-ማህደረ ትውስታ መሸጎጫው ፈጣኑን መስመር ማገልገሉን ይቀጥላል።

**ነባሪዎች:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- ከፍተኛው የማህደረ ትውስታ ግቤቶች ብዛት፦ `200` (`MAX_MEMORY_ENTRIES`)
- ማስወገድ፦ አሮጌው `createdAt` መጀመሪያ

## የውሂብ ጎታ መዋቅር

ማይግሬሽን፦ `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ኢንዴክሶች፦ `expires_at`፣ `provider`፣ `model`፣ `created_at`። `expires_at` እንደ Unix epoch ሰከንዶች ይከማቻል፤ የSELECT ንብርብር የቆዩ የጽሑፍ እሴቶችን በ`EXPIRES_AT_EPOCH_SQL` በኩል ደረጃቸውን ያስተካክላል።

## አቅራቢ / ሞዴል ማወቂያ

`requiresReasoningReplay(provider, model)` የሚለው `true` ሲመልስ ድጋሚ ማጫወት ይነቃል። ፈንክሽኑ በ`open-sse/services/reasoningCache.ts` ውስጥ ያሉ ሁለት ዝርዝሮችን ይፈትሻል።

**የአቅራቢ መለያዎች (ትክክለኛ ተዛማጅነት፣ ለፊደል አይነት ግድየለሽ):**

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

**የሞዴል regex ቅጦች (ለፊደል አይነት ግድየለሽ):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` እና `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro፣ አማራጭ `-free` ቅጥያ)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

አዲስ ጥብቅ አቅራቢ/ሞዴል ለመጨመር ከእነዚህ ዝርዝሮች ወደ አንዱ መጨመር እና የድጋሚ ማጫወት ማስገባቱን የሚያረጋግጥ unit test መጻፍ ያስፈልጋል። የPR መግለጫው ለለውጡ መነሻ የሆነውን ትክክለኛ upstream 400 ሕብረቁምፊ መጥቀስ አለበት።

## REST API

cache-ው በ`src/app/api/cache/reasoning/route.ts` ስር ሁለት endpoints ያቀርባል። ሁለቱም የአስተዳደር ማረጋገጫን (`isAuthenticated` ከ`@/shared/utils/apiAuth`) ይጠይቃሉ።

| ዘዴ     | Endpoint                                                  | መግለጫ                                                 |
| ------ | --------------------------------------------------------- | ---------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | ስታቲስቲክስ + በገጽ የተከፋፈሉ ግቤቶች                            |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | የተጣራ ዝርዝር (`limit` ወደ `[1, 200]` ይገደባል)              |
| DELETE | `/api/cache/reasoning`                                    | ሁሉንም (memory + DB) ያጽዱ እና የhit/miss ቆጠራዎችን ዳግም ያስጀምሩ |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ለአንድ አቅራቢ ያሉ ግቤቶችን ብቻ ያጽዱ                            |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | አንድ ግቤት ይሰርዙ                                         |

**የGET ምላሽ ቅርጽ:**

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

## የአሠራር ማስታወሻዎች

- **ማጽዳት:** `cleanupReasoningCache()` ጊዜያቸው ያለፈ memory ግቤቶችን ያስወግዳል እና `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` ያስኬዳል። የHealth-check workers ይህን በየጊዜው ይጠራሉ።
- **ከብልሽት ማገገም:** ከዳግም ማስጀመር በኋላ memory ባዶ ይሆናል፣ ነገር ግን DB-ው ጊዜያቸው ያላለፈ ግቤቶችን አሁንም ይይዛል። ለተወሰነ `tool_call_id` የመጀመሪያው lookup የDB hit ነው፤ ተከታይ lookups የmemory hits ናቸው።
- **Reasoning ከሌለ cache የለም:** የassistant መልዕክቱ `reasoning_content` / `reasoning` field ከሌለው `cacheReasoningFromAssistantMessage` `0` ይመልሳል፣ ስለዚህ non-thinking ምላሾች ምንም ወጪ አያስከትሉም።
- **Write-ም እንዲሁ የተገደበ ነው:** በ`chatCore.ts` ውስጥ ያሉት ሁለቱ call sites (non-streaming እና streaming) `cacheReasoningFromAssistantMessage()`ን የሚጠሩት `requiresReasoningReplay(provider, model)` `true` ሲሆን ብቻ ነው — ይህም read side-ው የሚፈትሸው ተመሳሳይ predicate ነው። የreplay providerን ፈጽሞ የማይጠቀሙ installs ለwrite፣ ለindex update እና reasoning ባለው በእያንዳንዱ ምላሽ ላይ ለሚኖረው try/catch ወጪ መክፈላቸውን ያቆማሉ።
- **ጥብቅ ያልሆኑ አቅራቢዎች:** `requiresReasoningReplay` `false` ሲሆን እና የዒላማው format OpenAI ከሆነ፣ translator-ው ከወጪ መልዕክቶች ማንኛውንም `reasoning_content` field **ያስወግዳል** — OpenAI Chat Completions ይህን አይቀበልም።

## በተጨማሪ ይመልከቱ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — የወረዳ መቋረጫዎች፣ የማቀዝቀዣ ጊዜያት፣ የሞዴል መቆለፊያዎች
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ከላይኛው ስርዓት የሚመጡ የ400 ስህተቶችን መመርመር
- ምንጭ፦ `src/lib/db/reasoningCache.ts`፣ `open-sse/services/reasoningCache.ts`፣ `open-sse/translator/index.ts`
- ፍልሰት፦ `src/lib/db/migrations/033_create_reasoning_cache.sql`
- የAPI መንገድ፦ `src/app/api/cache/reasoning/route.ts`
- የመጀመሪያው ችግር፦ #1628
