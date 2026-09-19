# Reasoning Replay Cache (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sors tal-verità:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jaqbad ir-`reasoning_content` tal-assistent iġġenerat minn mudelli bil-modalità ta’ ħsieb u jerġa’ jdaħħlu b’mod trasparenti f’talbiet b’diversi rawnds meta l-fornitur upstream jirrikjedih. Dan jelimina l-iżbalji HTTP 400 li jqajmu l-fornituri stretti meta l-istorja tal-konverżazzjoni ta’ klijent tkun nieqsa mir-raġunament tar-rawnd preċedenti.

## Għaliex Dan Jeżisti

Diversi fornituri bil-modalità ta’ ħsieb jirrifjutaw rawnd ta’ segwitu sakemm il-**messaġġ preċedenti tal-assistent ma jkunx jinkludi r-`reasoning_content` oriġinali**. L-upstream jirritorna 400 b’messaġġi bħal:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Iżda klijenti tipiċi (Cursor, Cline, Roo Code, OpenAI SDK) ineħħu r-`reasoning_content` mill-istorja li jerġgħu jibagħtu. OmniRoute jirrestawrah minn cache fuq in-naħa tas-server sabiex it-talba li jara l-upstream tkun konsistenti. Il-kwistjoni #1628 introduċiet il-persistenza ibrida fil-memorja/SQLite sabiex il-cache tibqa’ teżisti wara li l-proċess jerġa’ jinbeda.

## Arkitettura

```
Rawnd N (l-assistent jiġġenera):
  → ir-risposta fiha reasoning_content + tool_calls
  → jekk requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      jikteb (memorja + DB), b’kull tool_call.id bħala kjavi
  → jgħaddi r-risposta lill-klijent (li jista’ jżomm ir-raġunament jew le)

Rawnd N+1 (il-klijent jibgħat talba ta’ segwitu):
  → it-traduttur jidentifika: requiresReasoningReplay(provider, model) === true
  → għal kull messaġġ tal-assistent b’tool_calls u mingħajr reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorja → DB
      suċċess  → msg.reasoning_content = cached; recordReplay()
      falliment → msg.reasoning_content = "" (soluzzjoni alternattiva storika għal DeepSeek eqdem)
  → l-upstream jara storja konsistenti → ebda 400
```

Il-qbid iseħħ f’`open-sse/handlers/chatCore.ts` (f’żewġ postijiet, fiż-żewġ postijiet fejn tissejjaħ `cacheReasoningFromAssistantMessage`). Ir-riproduzzjoni sseħħ f’`open-sse/translator/index.ts` wara l-koerċizzjoni tal-iskema iżda qabel id-dispaċċ.

## Ħażna — Memorja Ibrida + SQLite

Il-fluss ewlieni juża `Map` fil-memorja (LRU skont il-ħin tal-ħolqien), appoġġjat minn tabella SQLite għall-irkupru wara waqfien mhux mistenni u għall-viżibbiltà fid-dashboard.

| Saff    | Implimentazzjoni                              | Għan                                                     |
| ------- | --------------------------------------------- | -------------------------------------------------------- |
| Memorja | `Map` f’`open-sse/services/reasoningCache.ts` | Tfittxijiet veloċi, ineħħi l-eqdem meta jilħaq 200       |
| DB      | tabella `reasoning_cache` (`src/lib/db/`)     | Tippersisti bejn bidu mill-ġdid, tipprovdi l-istatistika |

Il-kitbiet imorru fit-tnejn. Il-qari l-ewwel jikkonsulta l-memorja, imbagħad jaqa’ lura fuq id-DB (riżultati mid-DB jerġgħu jiddaħħlu fil-memorja). Il-fallimenti tad-DB mhumiex fatali — il-cache fil-memorja tkompli taqdi l-fluss ewlieni.

**Valuri predefiniti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Għadd massimu ta’ entrati fil-memorja: `200` (`MAX_MEMORY_ENTRIES`)
- Tneħħija: l-eqdem `createdAt` l-ewwel

## Skema tad-Database

Migrazzjoni: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indiċijiet: `expires_at`, `provider`, `model`, `created_at`. `expires_at` jinħażen bħala sekondi tal-epoka Unix; is-saff SELECT jinnormalizza valuri testwali storiċi permezz ta’ `EXPIRES_AT_EPOCH_SQL`.

## Sejbien tal-Provider / Mudell

Ir-replay jiġi attivat meta `requiresReasoningReplay(provider, model)` jirritorna `true`. Il-funzjoni tivverifika żewġ listi f’`open-sse/services/reasoningCache.ts`.

**IDs tal-providers (qbil eżatt, mingħajr distinzjoni bejn ittri kbar u żgħar):**

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

**Mudelli regex tal-mudelli (mingħajr distinzjoni bejn ittri kbar u żgħar):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` u `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, bis-suffiss fakultattiv `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Biex iżżid provider/mudell strett ġdid, żidu ma’ waħda minn dawn il-listi u ikteb test tal-unità li jafferma l-injezzjoni tar-replay. Id-deskrizzjoni tal-PR għandha tiċċita s-sekwenza eżatta tal-iżball 400 upstream li mmotivat il-bidla.

## REST API

Il-cache tesponi żewġ endpoints taħt `src/app/api/cache/reasoning/route.ts`. It-tnejn jeħtieġu awtentikazzjoni tal-ġestjoni (`isAuthenticated` minn `@/shared/utils/apiAuth`).

| Metodu | Endpoint                                                  | Deskrizzjoni                                                     |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + entrati paġinati                                    |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Elenkar iffiltrat (`limit` limitat għall-medda `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Ħassar kollox (memorja + DB) u rrisettja l-għadd ta’ hits/misses |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Ħassar biss l-entrati ta’ provider wieħed                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Ħassar entrata waħda                                             |

**Struttura tar-rispons GET:**

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

## Noti Operazzjonali

- **Tindif:** `cleanupReasoningCache()` ineħħi l-entrati skaduti mill-memorja u jħaddem `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Il-workers tal-verifika tas-saħħa jsejħulu perjodikament.
- **Irkupru wara crash:** Wara restart, il-memorja tkun vojta iżda d-DB tibqa’ żżomm l-entrati li għadhom ma skadewx. L-ewwel tfittxija għal `tool_call_id` partikolari tkun hit fid-DB; it-tfittxijiet sussegwenti jkunu hits fil-memorja.
- **Ebda reasoning, ebda cache:** `cacheReasoningFromAssistantMessage` jirritorna `0` meta l-messaġġ tal-assistent ma jkollux field `reasoning_content` / `reasoning`, għalhekk ir-risponsi mingħajr ħsieb ma jiswew xejn.
- **Il-kitba hija kkontrollata wkoll:** iż-żewġ postijiet tas-sejħa f’`chatCore.ts` (mingħajr streaming u bi streaming) isejħu `cacheReasoningFromAssistantMessage()` biss meta `requiresReasoningReplay(provider, model)` ikun `true` — l-istess predikat li tivverifika n-naħa tal-qari. Installazzjonijiet li qatt ma jużaw provider tar-replay ma jibqgħux iħallsu għall-kitba, għall-aġġornament tal-indiċi, u għat-try/catch fuq kull rispons li jkun fih reasoning.
- **Providers mhux stretti:** Meta `requiresReasoningReplay` ikun `false` u l-format fil-mira jkun OpenAI, it-traduttur **ineħħi** kwalunkwe field `reasoning_content` mill-messaġġi li joħorġu — OpenAI Chat Completions ma jaċċettahx.

## Ara Wkoll

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, perjodi ta’ stennija, imblukkar tal-mudelli
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijanjosi ta’ żbalji 400 mis-servizzi upstream
- Sors: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrazzjoni: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rotta tal-API: `src/app/api/cache/reasoning/route.ts`
- Kwistjoni oriġinali: #1628
