# Reasoning Replay Cache (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **સત્યનો અધિકૃત સ્રોત:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40

OmniRoute વિચારણા-મોડ મોડેલો દ્વારા બનાવવામાં આવેલ સહાયકનું `reasoning_content` કૅપ્ચર કરે છે અને જ્યારે અપસ્ટ્રીમ પ્રદાતાને તેની જરૂર હોય ત્યારે બહુ-ટર્ન વિનંતીઓમાં તેને પારદર્શક રીતે ફરીથી ચલાવે છે. જ્યારે ક્લાયન્ટના વાર્તાલાપ ઇતિહાસમાં અગાઉના ટર્નનું રીઝનિંગ ખૂટતું હોય ત્યારે કડક પ્રદાતાઓ જે HTTP 400 ભૂલો આપે છે તેને આ દૂર કરે છે.

## આ શા માટે અસ્તિત્વમાં છે

જો **અગાઉના સહાયક સંદેશામાં મૂળ `reasoning_content` સામેલ ન હોય**, તો કેટલાક વિચારણા-મોડ પ્રદાતાઓ અનુગામી ટર્નને નકારી કાઢે છે. અપસ્ટ્રીમ નીચેના જેવા સંદેશાઓ સાથે 400 પરત કરે છે:

```
પરિમાણ ખોટું છે: વિચારણા મોડમાં reasoning_content ને API પર પાછું મોકલવું આવશ્યક છે.
```

પરંતુ સામાન્ય ક્લાયન્ટો (Cursor, Cline, Roo Code, OpenAI SDK) તેઓ ફરીથી ચલાવતા ઇતિહાસમાંથી `reasoning_content` દૂર કરે છે. OmniRoute તેને સર્વર-સાઇડ કૅશમાંથી પુનઃસ્થાપિત કરે છે, જેથી અપસ્ટ્રીમને દેખાતી વિનંતી સુસંગત રહે. ઇશ્યૂ #1628 એ હાઇબ્રિડ મેમરી/SQLite પર્સિસ્ટન્સ રજૂ કર્યું, જેથી પ્રક્રિયા પુનઃપ્રારંભ થયા પછી પણ કૅશ જળવાઈ રહે.

## આર્કિટેક્ચર

```
ટર્ન N (સહાયક જનરેટ કરે છે):
  → પ્રતિસાદમાં reasoning_content + tool_calls સામેલ છે
  → જો requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      દરેક tool_call.id દ્વારા કી કરીને (મેમરી + DB) માં લખે છે
  → પ્રતિસાદ ક્લાયન્ટને ફોરવર્ડ કરે છે (જે રીઝનિંગ જાળવી પણ શકે અથવા ન પણ જાળવે)

ટર્ન N+1 (ક્લાયન્ટ અનુવર્તી સંદેશ મોકલે છે):
  → ટ્રાન્સલેટર શોધે છે: requiresReasoningReplay(provider, model) === true
  → tool_calls ધરાવતા અને reasoning_content વિનાના દરેક સહાયક સંદેશ માટે:
      lookupReasoning(toolCalls[0].id) → મેમરી → DB
      હિટ  → msg.reasoning_content = cached; recordReplay()
      મિસ → msg.reasoning_content = "" (જૂના DeepSeek માટે લેગસી ફૉલબૅક)
  → અપસ્ટ્રીમને સુસંગત હિસ્ટ્રી મળે છે → 400 નહીં
```

કૅપ્ચર `open-sse/handlers/chatCore.ts` માં થાય છે (બે સ્થળે, બે `cacheReasoningFromAssistantMessage` કૉલ સાઇટ્સ પર). રીપ્લે સ્કીમા કોઅર્શન પછી પરંતુ ડિસ્પૅચ પહેલાં `open-sse/translator/index.ts` માં થાય છે.

સાદા (ટૂલ-કૉલ વિનાના) સહાયક ટર્ન્સની કી અલગ રીતે નક્કી થાય છે: `buildAssistantMessageCacheKey()` સેશન સ્કોપ અને તે ટર્ન સુધીની નોર્મલાઇઝ્ડ OpenAI-ફોર્મેટ ટ્રાન્સક્રિપ્ટનું ડાઇજેસ્ટ બનાવે છે, કારણ કે `tools` હાજર હોય ત્યારે DeepSeek ને અગાઉના _દરેક_ ટર્નનું રીઝનિંગ જરૂરી હોય છે. Responses-API લક્ષ્યો માટે (ઉદાહરણ તરીકે `opencode-go/deepseek-v4-flash`, જેને `/responses` પર રાઉટ કરવામાં આવે છે) અપસ્ટ્રીમ બૉડીમાં `messages` નહીં પરંતુ `input` હોય છે, તેથી `translateRequest()` (`open-sse/translator/index.ts`) કૉલબૅક વિકલ્પ દ્વારા તેણે ડાઇજેસ્ટ કરેલી પિવટ ટ્રાન્સક્રિપ્ટની જાણ કરે છે અને કૅપ્ચર સાઇટ્સ એ જ ટ્રાન્સક્રિપ્ટનું ડાઇજેસ્ટ બનાવે છે. Responses રીપ્લે પાસ દરેક સ્રોત ફોર્મેટ માટે OpenAI પિવટ પર ચાલે છે, તેથી Anthropic Messages ક્લાયન્ટ્સ (Claude → OpenAI → Responses) માટે પણ રીપ્લે થાય છે.

## સ્ટોરેજ — હાઇબ્રિડ મેમરી + SQLite

હૉટ પાથ SQLite ટેબલ દ્વારા સમર્થિત ઇન-મેમરી `Map` (બનાવટના ક્રમ મુજબ LRU) નો ઉપયોગ કરે છે, જે ક્રૅશ રિકવરી અને ડૅશબોર્ડ દૃશ્યતા પ્રદાન કરે છે.

| સ્તર  | અમલીકરણ                                         | હેતુ                                         |
| ----- | ----------------------------------------------- | -------------------------------------------- |
| મેમરી | `open-sse/services/reasoningCache.ts` માં `Map` | ઝડપી લુકઅપ, 200 પર સૌથી જૂની એન્ટ્રી કાઢે છે |
| DB    | `reasoning_cache` ટેબલ (`src/lib/db/`)          | પુનઃપ્રારંભો વચ્ચે જળવાય છે, આંકડા ચલાવે છે  |

લખાણ બંનેમાં થાય છે. વાંચન પહેલાં મેમરી તપાસે છે, પછી DB નો ફૉલબૅક તરીકે ઉપયોગ કરે છે (DB હિટ્સને પાછી મેમરીમાં પ્રમોટ કરવામાં આવે છે). DB નિષ્ફળતાઓ ઘાતક નથી — ઇન-મેમરી કૅશ હૉટ પાથને સેવા આપવાનું ચાલુ રાખે છે.

**ડિફૉલ્ટ્સ:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- મહત્તમ મેમરી એન્ટ્રીઓ: `200` (`MAX_MEMORY_ENTRIES`)
- એવિક્શન: સૌથી જૂનું `createdAt` પહેલાં

## ડેટાબેઝ સ્કીમા

માઇગ્રેશન: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ઇન્ડેક્સ: `expires_at`, `provider`, `model`, `created_at`. `expires_at` ને Unix epoch સેકન્ડ તરીકે સંગ્રહિત કરવામાં આવે છે; SELECT સ્તર લેગસી ટેક્સ્ટ મૂલ્યોને `EXPIRES_AT_EPOCH_SQL` મારફતે સામાન્યકૃત કરે છે.

## પ્રદાતા / મોડલ શોધ

જ્યારે `requiresReasoningReplay(provider, model)` `true` પરત કરે છે ત્યારે Replay સક્ષમ થાય છે. આ ફંક્શન `open-sse/services/reasoningCache.ts` માંની બે સૂચિઓ તપાસે છે.

**પ્રદાતા IDs (ચોક્કસ મેળ, અક્ષરોના કેસથી સ્વતંત્ર):**

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

**મોડલ regex પેટર્ન્સ (અક્ષરોના કેસથી સ્વતંત્ર):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` અને `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, વૈકલ્પિક `-free` પ્રત્યય)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

નવો strict પ્રદાતા/મોડલ ઉમેરવા માટે આ સૂચિઓમાંથી એકમાં તેને ઉમેરવો અને replay injection ની ખાતરી કરતો unit test લખવો જરૂરી છે. PR વર્ણનમાં ફેરફાર માટે કારણભૂત બનેલી ચોક્કસ upstream 400 string નો ઉલ્લેખ કરવો જોઈએ.

## REST API

આ cache `src/app/api/cache/reasoning/route.ts` હેઠળ બે endpoints ઉપલબ્ધ કરાવે છે. બંને માટે management authentication (`@/shared/utils/apiAuth` માંથી `isAuthenticated`) જરૂરી છે.

| પદ્ધતિ | Endpoint                                                  | વર્ણન                                                           |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | આંકડા + પૃષ્ઠાંકિત entries                                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | ફિલ્ટર કરેલી સૂચિ (`limit` ને `[1, 200]` સુધી મર્યાદિત કરાય છે) |
| DELETE | `/api/cache/reasoning`                                    | બધું સાફ કરે છે (memory + DB) અને hit/miss ગણતરીઓ reset કરે છે  |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | માત્ર એક પ્રદાતાની entries સાફ કરે છે                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | એક entry કાઢી નાખે છે                                           |

**GET response નું માળખું:**

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

## સંચાલન નોંધો

- **Cleanup:** `cleanupReasoningCache()` સમયસમાપ્ત થયેલી memory entries દૂર કરે છે અને `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` ચલાવે છે. Health-check workers તેને સમયાંતરે કૉલ કરે છે.
- **Crash recovery:** restart પછી memory ખાલી હોય છે, પરંતુ DB માં હજુ પણ સમયસમાપ્ત ન થયેલી entries રહે છે. આપેલા `tool_call_id` માટેનો પ્રથમ lookup DB hit હોય છે; ત્યારબાદના lookups memory hits હોય છે.
- **Reasoning નહીં, cache નહીં:** જ્યારે assistant message માં `reasoning_content` / `reasoning` field ન હોય ત્યારે `cacheReasoningFromAssistantMessage` `0` પરત કરે છે, તેથી non-thinking responses માટે કોઈ ખર્ચ થતો નથી.
- **Write પણ gated છે:** `chatCore.ts` માંના બંને call sites (non-streaming અને streaming) માત્ર ત્યારે જ `cacheReasoningFromAssistantMessage()` ને કૉલ કરે છે જ્યારે `requiresReasoningReplay(provider, model)` `true` હોય — આ એ જ predicate છે જેને read side તપાસે છે. જે installs ક્યારેય replay provider નો ઉપયોગ કરતા નથી તેમને દરેક reasoning-bearing response પર write, index update અને try/catch નો ખર્ચ થતો બંધ થાય છે.
- **Non-strict providers:** જ્યારે `requiresReasoningReplay` `false` હોય અને target format OpenAI હોય, ત્યારે translator outgoing messages માંથી કોઈપણ `reasoning_content` field **દૂર કરે છે** — OpenAI Chat Completions તેને સ્વીકારતું નથી.

## આ પણ જુઓ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — સર્કિટ બ્રેકર્સ, કૂલડાઉન્સ, મોડેલ લૉકઆઉટ્સ
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — અપસ્ટ્રીમ 400 ભૂલોનું નિદાન
- સ્રોત: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- માઇગ્રેશન: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API રૂટ: `src/app/api/cache/reasoning/route.ts`
- મૂળ ઇશ્યૂ: #1628
