# Reasoning Replay Cache (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Bron van waarheid:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute legt de door modellen in denkmodus geproduceerde `reasoning_content` van de assistent vast en speelt deze transparant opnieuw af bij verzoeken met meerdere beurten wanneer de upstreamprovider dit vereist. Dit voorkomt de HTTP 400-fouten die strikte providers retourneren wanneer in de gespreksgeschiedenis van een client de redenering van de vorige beurt ontbreekt.

## Waarom Dit Bestaat

Verschillende providers met een denkmodus weigeren een vervolgbeurt tenzij het **vorige assistentbericht de oorspronkelijke `reasoning_content` bevat**. De upstream retourneert een 400-fout met berichten zoals:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Gebruikelijke clients (Cursor, Cline, Roo Code, OpenAI SDK) verwijderen `reasoning_content` echter uit de geschiedenis die ze opnieuw versturen. OmniRoute herstelt deze vanuit een server-side cache, zodat het verzoek dat de upstream ontvangt consistent is. Issue #1628 introduceerde de hybride persistentie in geheugen/SQLite, zodat de cache behouden blijft na het opnieuw starten van het proces.

## Architectuur

```
Beurt N (assistant genereert):
  → respons bevat reasoning_content + tool_calls
  → als requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      schrijft (geheugen + DB), geïndexeerd op elke tool_call.id
  → stuur respons door naar client (die de redenering al dan niet bewaart)

Beurt N+1 (client stuurt vervolg):
  → vertaler detecteert: requiresReasoningReplay(provider, model) === true
  → voor elk assistant-bericht met tool_calls en zonder reasoning_content:
      lookupReasoning(toolCalls[0].id) → geheugen → DB
      treffer  → msg.reasoning_content = cached; recordReplay()
      gemist   → msg.reasoning_content = "" (legacy-terugvaloptie voor oudere DeepSeek)
  → upstream ontvangt consistente geschiedenis → geen 400
```

Vastlegging vindt plaats in `open-sse/handlers/chatCore.ts` (op twee plaatsen, bij de twee aanroepen van `cacheReasoningFromAssistantMessage`). Opnieuw afspelen vindt plaats in `open-sse/translator/index.ts`, na schemacoërcie maar vóór verzending.

Gewone assistant-beurten (zonder tool-call) worden anders geïndexeerd: `buildAssistantMessageCacheKey()` maakt een digest van het sessiebereik plus het genormaliseerde transcript in OpenAI-indeling tot en met die beurt, omdat DeepSeek de redenering van _elke_ eerdere beurt vereist zodra `tools` aanwezig is. Voor Responses-API-doelen (bijvoorbeeld `opencode-go/deepseek-v4-flash`, gerouteerd naar `/responses`) bevat de upstream-body `input`, niet `messages`. Daarom rapporteert `translateRequest()` (`open-sse/translator/index.ts`) via een callbackoptie het pivottranscript waarvan een digest is gemaakt, waarna de vastleggingslocaties een digest van datzelfde transcript maken. De Responses-herhalingsstap wordt voor elke bronindeling uitgevoerd op de OpenAI-pivot, zodat ook Anthropic Messages-clients (Claude → OpenAI → Responses) opnieuw worden afgespeeld.

## Opslag — Hybride Geheugen + SQLite

Het veelgebruikte pad gebruikt een `Map` in het geheugen (LRU op basis van aanmaaktijd), ondersteund door een SQLite-tabel voor herstel na crashes en zichtbaarheid in het dashboard.

| Laag     | Implementatie                                  | Doel                                              |
| -------- | ---------------------------------------------- | ------------------------------------------------- |
| Geheugen | `Map` in `open-sse/services/reasoningCache.ts` | Snelle zoekopdrachten, verwijdert oudste bij 200  |
| DB       | Tabel `reasoning_cache` (`src/lib/db/`)        | Blijft behouden na herstarts, levert statistieken |

Schrijfbewerkingen gaan naar beide. Leesbewerkingen raadplegen eerst het geheugen en vallen daarna terug op de DB (DB-treffers worden opnieuw naar het geheugen gepromoveerd). DB-fouten zijn niet fataal — de cache in het geheugen blijft het veelgebruikte pad bedienen.

**Standaardwaarden:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximaal aantal items in het geheugen: `200` (`MAX_MEMORY_ENTRIES`)
- Verwijdering: oudste `createdAt` eerst

## Databaseschema

Migratie: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexen: `expires_at`, `provider`, `model`, `created_at`. `expires_at` wordt opgeslagen als Unix-epochtijd in seconden; de SELECT-laag normaliseert verouderde tekstwaarden via `EXPIRES_AT_EPOCH_SQL`.

## Detectie van provider/model

Replay wordt ingeschakeld wanneer `requiresReasoningReplay(provider, model)` `true` retourneert. De functie controleert twee lijsten in `open-sse/services/reasoningCache.ts`.

**Provider-ID's (exacte overeenkomst, hoofdletterongevoelig):**

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

**Reguliere-expressiepatronen voor modellen (hoofdletterongevoelig):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` en `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, optioneel achtervoegsel `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Om een nieuwe strikte provider of een nieuw strikt model toe te voegen, voegt u deze toe aan een van deze lijsten en schrijft u een unit-test die de replay-injectie bevestigt. De PR-beschrijving moet de exacte upstream 400-tekenreeks vermelden die aanleiding gaf tot de wijziging.

## REST-API

De cache biedt twee endpoints onder `src/app/api/cache/reasoning/route.ts`. Beide vereisen beheerauthenticatie (`isAuthenticated` uit `@/shared/utils/apiAuth`).

| Methode | Endpoint                                                  | Beschrijving                                                             |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| GET     | `/api/cache/reasoning`                                    | Statistieken + gepagineerde vermeldingen                                 |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Gefilterde lijst (`limit` begrensd tot `[1, 200]`)                       |
| DELETE  | `/api/cache/reasoning`                                    | Alles wissen (geheugen + DB) en het aantal hits/misses opnieuw instellen |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Alleen vermeldingen voor één provider wissen                             |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Eén vermelding verwijderen                                               |

**Structuur van het GET-antwoord:**

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

## Operationele opmerkingen

- **Opschoning:** `cleanupReasoningCache()` verwijdert verlopen vermeldingen uit het geheugen en voert `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` uit. Healthcheck-workers roepen dit periodiek aan.
- **Herstel na een crash:** Na een herstart is het geheugen leeg, maar bevat de DB nog steeds niet-verlopen vermeldingen. De eerste opzoekactie voor een bepaalde `tool_call_id` is een DB-hit; volgende opzoekacties zijn geheugenhits.
- **Geen redenering, geen cache:** `cacheReasoningFromAssistantMessage` retourneert `0` wanneer het assistentbericht geen veld `reasoning_content` / `reasoning` bevat, zodat niet-redenerende antwoorden niets kosten.
- **Ook schrijven is voorwaardelijk:** beide aanroeplocaties in `chatCore.ts` (niet-streaming en streaming) roepen `cacheReasoningFromAssistantMessage()` alleen aan wanneer `requiresReasoningReplay(provider, model)` `true` is — hetzelfde predicaat dat door de leeszijde wordt gecontroleerd. Installaties die nooit een replay-provider gebruiken, hoeven niet langer te betalen voor de schrijfactie, de indexupdate en de try/catch voor elk antwoord dat een redenering bevat.
- **Niet-strikte providers:** Wanneer `requiresReasoningReplay` `false` is en de doelindeling OpenAI is, **verwijdert** de vertaler elk veld `reasoning_content` uit uitgaande berichten — OpenAI Chat Completions accepteert dit veld niet.

## Zie ook

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuitbreakers, afkoelperioden, modelblokkeringen
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — upstream 400-fouten diagnosticeren
- Bron: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migratie: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-route: `src/app/api/cache/reasoning/route.ts`
- Oorspronkelijk issue: #1628
