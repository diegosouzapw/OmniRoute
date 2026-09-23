# Reasoning Replay Cache (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ആധികാരിക ഉറവിടം:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **അവസാനം പുതുക്കിയത്:** 2026-06-28 — v3.8.40

ചിന്താ-മോഡ് മോഡലുകൾ സൃഷ്ടിക്കുന്ന അസിസ്റ്റന്റ് `reasoning_content` OmniRoute ശേഖരിക്കുകയും, അപ്സ്ട്രീം പ്രൊവൈഡർ അത് ആവശ്യപ്പെടുമ്പോൾ മൾട്ടി-ടേൺ അഭ്യർത്ഥനകളിൽ സുതാര്യമായി വീണ്ടും ഉപയോഗിക്കുകയും ചെയ്യുന്നു. ക്ലയന്റിന്റെ സംഭാഷണ ചരിത്രത്തിൽ മുൻ ടേണിലെ റീസണിംഗ് ഇല്ലാത്തപ്പോൾ കർശനമായ പ്രൊവൈഡർമാർ ഉയർത്തുന്ന HTTP 400 പിശകുകൾ ഇത് ഒഴിവാക്കുന്നു.

## ഇത് നിലനിൽക്കുന്നതിന്റെ കാരണം

**മുമ്പത്തെ അസിസ്റ്റന്റ് സന്ദേശത്തിൽ യഥാർഥ `reasoning_content` ഉൾപ്പെടുന്നില്ലെങ്കിൽ**, പല ചിന്താ-മോഡ് പ്രൊവൈഡർമാരും തുടർ ടേൺ നിരസിക്കുന്നു. അപ്സ്ട്രീം ഇനിപ്പറയുന്നതുപോലുള്ള സന്ദേശങ്ങളോടെ 400 തിരികെ നൽകുന്നു:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

എന്നാൽ സാധാരണ ക്ലയന്റുകൾ (Cursor, Cline, Roo Code, OpenAI SDK) അവർ വീണ്ടും ഉപയോഗിക്കുന്ന ചരിത്രത്തിൽനിന്ന് `reasoning_content` നീക്കംചെയ്യുന്നു. അപ്സ്ട്രീം കാണുന്ന അഭ്യർത്ഥന സ്ഥിരതയുള്ളതാക്കാൻ OmniRoute അത് സെർവർ-സൈഡ് കാഷിൽനിന്ന് പുനഃസ്ഥാപിക്കുന്നു. പ്രോസസ് പുനരാരംഭിച്ചതിനുശേഷവും കാഷ് നിലനിൽക്കുന്നതിനായി ഹൈബ്രിഡ് മെമ്മറി/SQLite പെർസിസ്റ്റൻസ് Issue #1628 അവതരിപ്പിച്ചു.

## ആർക്കിടെക്ചർ

```
ടേൺ N (അസിസ്റ്റന്റ് സൃഷ്ടിക്കുന്നു):
  → പ്രതികരണത്തിൽ reasoning_content + tool_calls അടങ്ങിയിരിക്കുന്നു
  → requiresReasoningReplay(provider, model) ആണെങ്കിൽ: cacheReasoningFromAssistantMessage()
      ഓരോ tool_call.id-ഉം കീ ആയി ഉപയോഗിച്ച് (മെമ്മറി + DB)-യിൽ എഴുതുന്നു
  → പ്രതികരണം ക്ലയന്റിലേക്ക് കൈമാറുന്നു (അത് റീസണിംഗ് നിലനിർത്തുകയോ നിലനിർത്താതിരിക്കുകയോ ചെയ്യാം)

ടേൺ N+1 (ക്ലയന്റ് തുടർസന്ദേശം അയയ്ക്കുന്നു):
  → ട്രാൻസ്ലേറ്റർ കണ്ടെത്തുന്നു: requiresReasoningReplay(provider, model) === true
  → tool_calls ഉള്ളതും reasoning_content ഇല്ലാത്തതുമായ ഓരോ അസിസ്റ്റന്റ് സന്ദേശത്തിനും:
      lookupReasoning(toolCalls[0].id) → മെമ്മറി → DB
      ഹിറ്റ്  → msg.reasoning_content = cached; recordReplay()
      മിസ് → msg.reasoning_content = "" (പഴയ DeepSeek പതിപ്പുകൾക്കായുള്ള ലെഗസി ഫാൾബാക്ക്)
  → അപ്സ്ട്രീമിന് സ്ഥിരതയുള്ള ഹിസ്റ്ററി ലഭിക്കുന്നു → 400 ഇല്ല
```

ക്യാപ്ചർ നടക്കുന്നത് `open-sse/handlers/chatCore.ts`-ലാണ് (`cacheReasoningFromAssistantMessage` വിളിക്കുന്ന രണ്ട് സ്ഥലങ്ങളിൽ). സ്കീമ കോർഷനുശേഷവും ഡിസ്പാച്ചിന് മുമ്പുമായി `open-sse/translator/index.ts`-ലാണ് റീപ്ലേ നടക്കുന്നത്.

സാധാരണ (ടൂൾ-കോൾ ഇല്ലാത്ത) അസിസ്റ്റന്റ് ടേണുകൾക്ക് വ്യത്യസ്തമായാണ് കീ നൽകുന്നത്: `buildAssistantMessageCacheKey()` സെഷൻ സ്കോപ്പിനെയും ആ ടേൺ വരെയുള്ള നോർമലൈസ് ചെയ്ത OpenAI-ഫോർമാറ്റ് ട്രാൻസ്ക്രിപ്റ്റിനെയും ഡൈജസ്റ്റ് ചെയ്യുന്നു, കാരണം `tools` ഉണ്ടായാൽ മുമ്പത്തെ _ഓരോ_ ടേണിന്റെയും റീസണിംഗ് DeepSeek-ന് ആവശ്യമാണ്. Responses-API ടാർഗെറ്റുകൾക്കായി (ഉദാഹരണത്തിന്, `/responses`-ലേക്ക് റൂട്ട് ചെയ്യുന്ന `opencode-go/deepseek-v4-flash`) അപ്സ്ട്രീം ബോഡിയിൽ `messages` അല്ല, `input` ആണ് ഉള്ളത്; അതിനാൽ `translateRequest()` (`open-sse/translator/index.ts`) ഒരു കോൾബാക്ക് ഓപ്ഷനിലൂടെ താൻ ഡൈജസ്റ്റ് ചെയ്ത പിവറ്റ് ട്രാൻസ്ക്രിപ്റ്റ് റിപ്പോർട്ട് ചെയ്യുകയും ക്യാപ്ചർ സൈറ്റുകൾ അതേ ട്രാൻസ്ക്രിപ്റ്റ് ഡൈജസ്റ്റ് ചെയ്യുകയും ചെയ്യുന്നു. എല്ലാ സോഴ്സ് ഫോർമാറ്റുകൾക്കുമായി OpenAI പിവറ്റിലാണ് Responses റീപ്ലേ പാസ് പ്രവർത്തിക്കുന്നത്; അതിനാൽ Anthropic Messages ക്ലയന്റുകളും (Claude → OpenAI → Responses) റീപ്ലേ ചെയ്യപ്പെടുന്നു.

## സംഭരണം — ഹൈബ്രിഡ് മെമ്മറി + SQLite

ക്രാഷ് റിക്കവറിക്കും ഡാഷ്ബോർഡ് ദൃശ്യതയ്ക്കുമായി SQLite ടേബിൾ പിന്തുണയ്ക്കുന്ന ഇൻ-മെമ്മറി `Map` (സൃഷ്ടിക്കൽ ക്രമത്തിലുള്ള LRU) ആണ് ഹോട്ട് പാത്ത് ഉപയോഗിക്കുന്നത്.

| ലെയർ    | ഇംപ്ലിമെന്റേഷൻ                                 | ഉദ്ദേശ്യം                                                                          |
| ------- | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| മെമ്മറി | `open-sse/services/reasoningCache.ts`-ലെ `Map` | വേഗത്തിലുള്ള ലുക്കപ്പുകൾ, 200 ആകുമ്പോൾ ഏറ്റവും പഴയത് നീക്കംചെയ്യുന്നു              |
| DB      | `reasoning_cache` ടേബിൾ (`src/lib/db/`)        | പുനരാരംഭങ്ങൾക്കിടയിലും നിലനിൽക്കുന്നു, സ്ഥിതിവിവരക്കണക്കുകൾക്ക് അടിസ്ഥാനം നൽകുന്നു |

റൈറ്റുകൾ രണ്ടിലേക്കും പോകുന്നു. റീഡുകൾ ആദ്യം മെമ്മറി പരിശോധിക്കുകയും തുടർന്ന് DB-യിലേക്ക് ഫാൾബാക്ക് ചെയ്യുകയും ചെയ്യുന്നു (DB ഹിറ്റുകൾ വീണ്ടും മെമ്മറിയിലേക്ക് പ്രമോട്ട് ചെയ്യപ്പെടുന്നു). DB പരാജയങ്ങൾ ഗുരുതരമല്ല — ഇൻ-മെമ്മറി കാഷ് ഹോട്ട് പാത്തിന് സേവനം നൽകുന്നത് തുടരുന്നു.

**ഡിഫോൾട്ടുകൾ:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- പരമാവധി മെമ്മറി എൻട്രികൾ: `200` (`MAX_MEMORY_ENTRIES`)
- ഇവിക്ഷൻ: ഏറ്റവും പഴയ `createdAt` ആദ്യം

## ഡാറ്റാബേസ് സ്കീമ

മൈഗ്രേഷൻ: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ഇൻഡെക്സുകൾ: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix epoch സെക്കൻഡുകളായി സംഭരിക്കുന്നു; SELECT ലെയർ `EXPIRES_AT_EPOCH_SQL` വഴി പഴയ ടെക്സ്റ്റ് മൂല്യങ്ങളെ നോർമലൈസ് ചെയ്യുന്നു.

## പ്രൊവൈഡർ / മോഡൽ കണ്ടെത്തൽ

`requiresReasoningReplay(provider, model)` എന്നത് `true` നൽകുമ്പോൾ Replay പ്രവർത്തനക്ഷമമാകും. ഈ ഫങ്ഷൻ `open-sse/services/reasoningCache.ts`-ലെ രണ്ട് ലിസ്റ്റുകൾ പരിശോധിക്കുന്നു.

**പ്രൊവൈഡർ ID-കൾ (കൃത്യമായ പൊരുത്തം, അക്ഷരവലുപ്പ വ്യത്യാസം പരിഗണിക്കാതെ):**

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

**മോഡൽ regex പാറ്റേണുകൾ (അക്ഷരവലുപ്പ വ്യത്യാസം പരിഗണിക്കാതെ):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` കൂടാതെ `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ഐച്ഛികമായ `-free` സഫിക്സോടെ)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

പുതിയൊരു strict പ്രൊവൈഡർ/മോഡൽ ചേർക്കുന്നതിന്, ഈ ലിസ്റ്റുകളിലൊന്നിൽ അത് കൂട്ടിച്ചേർക്കുകയും replay injection ഉറപ്പാക്കുന്ന ഒരു unit test എഴുതുകയും വേണം. ഈ മാറ്റത്തിന് കാരണമായ കൃത്യമായ upstream 400 string PR വിവരണത്തിൽ ഉദ്ധരിക്കണം.

## REST API

`src/app/api/cache/reasoning/route.ts`-ന് കീഴിൽ cache രണ്ട് endpoints ലഭ്യമാക്കുന്നു. രണ്ടിനും management authentication (`@/shared/utils/apiAuth`-ൽ നിന്നുള്ള `isAuthenticated`) ആവശ്യമാണ്.

| രീതി   | Endpoint                                                  | വിവരണം                                                                          |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | സ്ഥിതിവിവരക്കണക്കുകൾ + പേജ് തിരിച്ചതായ entries                                  |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | ഫിൽട്ടർ ചെയ്ത listing (`limit` `[1, 200]` പരിധിയിലേക്ക് പരിമിതപ്പെടുത്തുന്നു)   |
| DELETE | `/api/cache/reasoning`                                    | എല്ലാം മായ്ക്കുകയും (memory + DB) hit/miss എണ്ണങ്ങൾ reset ചെയ്യുകയും ചെയ്യുന്നു |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ഒരു പ്രൊവൈഡറിനുള്ള entries മാത്രം മായ്ക്കുന്നു                                  |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ഒരു entry മായ്ക്കുന്നു                                                          |

**GET response ഘടന:**

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

## പ്രവർത്തനപരമായ കുറിപ്പുകൾ

- **Cleanup:** `cleanupReasoningCache()` കാലഹരണപ്പെട്ട memory entries നീക്കംചെയ്യുകയും `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` പ്രവർത്തിപ്പിക്കുകയും ചെയ്യുന്നു. Health-check workers ഇത് ഇടയ്ക്കിടെ വിളിക്കുന്നു.
- **Crash recovery:** restart ചെയ്തതിനുശേഷം memory ശൂന്യമായിരിക്കും, എന്നാൽ കാലഹരണപ്പെടാത്ത entries DB-യിൽ തുടരും. നൽകിയിരിക്കുന്ന ഒരു `tool_call_id`-നുള്ള ആദ്യ lookup ഒരു DB hit ആയിരിക്കും; തുടർന്നുള്ള lookups memory hits ആയിരിക്കും.
- **Reasoning ഇല്ലെങ്കിൽ cache ഇല്ല:** assistant message-ൽ `reasoning_content` / `reasoning` field ഇല്ലെങ്കിൽ `cacheReasoningFromAssistantMessage` `0` നൽകുന്നു; അതിനാൽ non-thinking responses-ന് യാതൊരു ചെലവും ഉണ്ടാകില്ല.
- **Write-നും നിയന്ത്രണമുണ്ട്:** `chatCore.ts`-ലെ രണ്ട് call sites-ഉം (non-streaming, streaming) `requiresReasoningReplay(provider, model)` `true` ആയിരിക്കുമ്പോൾ മാത്രമേ `cacheReasoningFromAssistantMessage()` വിളിക്കൂ — read side പരിശോധിക്കുന്ന അതേ predicate തന്നെയാണിത്. ഒരിക്കലും replay പ്രൊവൈഡർ ഉപയോഗിക്കാത്ത installs-ൽ ഓരോ reasoning-bearing response-നും write, index update, try/catch എന്നിവയ്ക്കുള്ള ചെലവ് ഒഴിവാകും.
- **Non-strict പ്രൊവൈഡർമാർ:** `requiresReasoningReplay` `false` ആകുകയും target format OpenAI ആകുകയും ചെയ്യുമ്പോൾ, പുറത്തേക്ക് പോകുന്ന messages-ൽനിന്ന് translator ഏതൊരു `reasoning_content` field-ഉം **നീക്കംചെയ്യുന്നു** — OpenAI Chat Completions അത് സ്വീകരിക്കുന്നില്ല.

## ഇതും കാണുക

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — സർക്യൂട്ട് ബ്രേക്കറുകൾ, കൂൾഡൗണുകൾ, മോഡൽ ലോക്കൗട്ടുകൾ
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — അപ്സ്ട്രീം 400 പിശകുകൾ നിർണയിക്കൽ
- സോഴ്സ്: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- മൈഗ്രേഷൻ: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API റൂട്ട്: `src/app/api/cache/reasoning/route.ts`
- യഥാർത്ഥ ഇഷ്യൂ: #1628
