# Reasoning Replay Cache (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sanningskälla:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute samlar in assistentens `reasoning_content` som produceras av modeller i tänkandeläge och återger det transparent vid flervändningsförfrågningar när uppströmsleverantören kräver det. Detta eliminerar de HTTP 400-fel som strikta leverantörer returnerar när en klients konversationshistorik saknar föregående vändas resonemang.

## Varför detta finns

Flera leverantörer med tänkandeläge avvisar en uppföljande vända om inte **det föregående assistentmeddelandet innehåller ursprungligt `reasoning_content`**. Uppströmsleverantören returnerar 400 med meddelanden som:

```
Felaktig parameter: reasoning_content i tänkandeläget måste skickas tillbaka till API:et.
```

Men vanliga klienter (Cursor, Cline, Roo Code, OpenAI SDK) tar bort `reasoning_content` från historiken som de återger. OmniRoute återställer det från en cache på serversidan så att förfrågan som uppströmsleverantören tar emot är konsekvent. Ärende #1628 introducerade hybridpersistensen med minne/SQLite så att cachen överlever processomstarter.

## Arkitektur

```
Vända N (assistenten genererar):
  → svaret innehåller reasoning_content + tool_calls
  → om requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      skriver (minne + DB), med varje tool_call.id som nyckel
  → vidarebefordra svaret till klienten (som kan behålla resonemanget eller inte)

Vända N+1 (klienten skickar en uppföljning):
  → översättaren upptäcker: requiresReasoningReplay(provider, model) === true
  → för varje assistentmeddelande med tool_calls och utan reasoning_content:
      lookupReasoning(toolCalls[0].id) → minne → DB
      träff  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (äldre reservlösning för tidigare DeepSeek)
  → uppströmsleverantören ser konsekvent historik → inget 400-fel
```

Insamlingen sker i `open-sse/handlers/chatCore.ts` (på två ställen, vid de två anropsplatserna för `cacheReasoningFromAssistantMessage`). Återgivningen sker i `open-sse/translator/index.ts` efter schematvingning men före dirigering.

## Lagring — hybrid med minne + SQLite

Den aktiva sökvägen använder en minnesbaserad `Map` (LRU efter skapandetid) som stöds av en SQLite-tabell för återställning efter krascher och synlighet i kontrollpanelen.

| Lager | Implementering                                | Syfte                                            |
| ----- | --------------------------------------------- | ------------------------------------------------ |
| Minne | `Map` i `open-sse/services/reasoningCache.ts` | Snabba uppslagningar, avlägsnar äldsta vid 200   |
| DB    | Tabellen `reasoning_cache` (`src/lib/db/`)    | Består över omstarter, tillhandahåller statistik |

Skrivningar görs till båda. Läsningar söker först i minnet och faller sedan tillbaka på DB (DB-träffar flyttas tillbaka till minnet). DB-fel är inte fatala — den minnesbaserade cachen fortsätter att betjäna den aktiva sökvägen.

**Standardvärden:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximalt antal minnesposter: `200` (`MAX_MEMORY_ENTRIES`)
- Avlägsnande: äldsta `createdAt` först

## Databasschema

Migrering: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Index: `expires_at`, `provider`, `model`, `created_at`. `expires_at` lagras som Unix-epoksekunder; SELECT-lagret normaliserar äldre textvärden via `EXPIRES_AT_EPOCH_SQL`.

## Identifiering av leverantör/modell

Återuppspelning aktiveras när `requiresReasoningReplay(provider, model)` returnerar `true`. Funktionen kontrollerar två listor i `open-sse/services/reasoningCache.ts`.

**Leverantörs-ID:n (exakt matchning, skiftlägesokänslig):**

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

**Regexmönster för modeller (skiftlägesokänsliga):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` och `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, valfritt suffix `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

För att lägga till en ny strikt leverantör/modell ska du lägga till den i en av dessa listor och skriva ett enhetstest som verifierar att återuppspelning injiceras. PR-beskrivningen bör ange den exakta uppströms 400-sträng som motiverade ändringen.

## REST-API

Cachen exponerar två slutpunkter under `src/app/api/cache/reasoning/route.ts`. Båda kräver administrationsautentisering (`isAuthenticated` från `@/shared/utils/apiAuth`).

| Metod  | Slutpunkt                                                 | Beskrivning                                                           |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + sidindelade poster                                        |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrerad lista (`limit` begränsas till intervallet `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Rensa allt (minne + databas) och nollställ räknare för träffar/missar |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Rensa endast poster för en leverantör                                 |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Ta bort en enskild post                                               |

**GET-svarets struktur:**

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

## Driftinformation

- **Rensning:** `cleanupReasoningCache()` rensar utgångna minnesposter och kör `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Hälsokontrollarbetare anropar detta regelbundet.
- **Återställning efter krasch:** Efter en omstart är minnet tomt, men databasen innehåller fortfarande poster som inte har löpt ut. Den första uppslagningen för ett givet `tool_call_id` blir en databasträff; efterföljande uppslagningar blir minnesträffar.
- **Ingen resonemangsinformation, ingen cache:** `cacheReasoningFromAssistantMessage` returnerar `0` när assistentmeddelandet saknar fältet `reasoning_content`/`reasoning`, så svar utan resonemang kostar ingenting.
- **Även skrivning är villkorad:** båda anropsställena i `chatCore.ts` (utan strömning och med strömning) anropar endast `cacheReasoningFromAssistantMessage()` när `requiresReasoningReplay(provider, model)` är `true` — samma predikat som lässidan kontrollerar. Installationer som aldrig använder en leverantör med återuppspelning slipper kostnaden för skrivningen, indexuppdateringen och try/catch-hanteringen för varje svar som innehåller resonemang.
- **Icke-strikta leverantörer:** När `requiresReasoningReplay` är `false` och målformatet är OpenAI **tar** översättaren **bort** eventuella `reasoning_content`-fält från utgående meddelanden — OpenAI Chat Completions accepterar dem inte.

## Se även

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kretsbrytare, nedkylningsperioder, modellspärrar
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostisering av uppströms 400-fel
- Källkod: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrering: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-rutt: `src/app/api/cache/reasoning/route.ts`
- Ursprungligt ärende: #1628
