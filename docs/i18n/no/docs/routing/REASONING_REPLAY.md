# Reasoning Replay Cache (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sannhetskilde:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute registrerer `reasoning_content` fra assistenten som produseres av modeller i tenkemodus, og spiller det av igjen transparent i flerdelte forespørsler når oppstrømsleverandøren krever det. Dette eliminerer HTTP 400-feilene som strenge leverandører returnerer når en klients samtalehistorikk mangler resonneringen fra forrige runde.

## Hvorfor dette finnes

Flere leverandører av modeller med tenkemodus avviser en oppfølgingsrunde med mindre **den forrige assistentmeldingen inneholder det opprinnelige `reasoning_content`**. Oppstrømstjenesten returnerer 400 med meldinger som:

```
Ugyldig parameter: reasoning_content i tenkemodus må sendes tilbake til API-et.
```

Vanlige klienter (Cursor, Cline, Roo Code, OpenAI SDK) fjerner imidlertid `reasoning_content` fra historikken de sender på nytt. OmniRoute gjenoppretter det fra en hurtigbuffer på serversiden, slik at forespørselen oppstrømstjenesten mottar, er konsistent. Problem #1628 introduserte den hybride minne-/SQLite-lagringen, slik at hurtigbufferen overlever omstarter av prosessen.

## Arkitektur

```
Runde N (assistenten genererer):
  → svaret inneholder reasoning_content + tool_calls
  → hvis requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      skriver (minne + DB), indeksert etter hver tool_call.id
  → videresend svaret til klienten (som kanskje beholder resonneringen, kanskje ikke)

Runde N+1 (klienten sender en oppfølging):
  → oversetteren oppdager: requiresReasoningReplay(provider, model) === true
  → for hver assistentmelding med tool_calls og uten reasoning_content:
      lookupReasoning(toolCalls[0].id) → minne → DB
      treff     → msg.reasoning_content = cached; recordReplay()
      bom       → msg.reasoning_content = "" (eldre reservemekanisme for gamle DeepSeek-versjoner)
  → oppstrømstjenesten ser en konsistent historikk → ingen 400
```

Innhenting skjer i `open-sse/handlers/chatCore.ts` (på to steder, ved de to kallestedene for `cacheReasoningFromAssistantMessage`). Gjenbruk skjer i `open-sse/translator/index.ts` etter skjemakonvertering, men før videresending.

Vanlige assistentrunder (uten verktøykall) indekseres på en annen måte: `buildAssistantMessageCacheKey()` beregner et sammendrag av øktomfanget samt den normaliserte transkripsjonen i OpenAI-format frem til den aktuelle runden, fordi DeepSeek krever resonneringen fra _hver_ tidligere runde når `tools` finnes. For mål som bruker Responses-API-et (for eksempel `opencode-go/deepseek-v4-flash`, rutet til `/responses`), inneholder oppstrømsforespørselen `input`, ikke `messages`. Derfor rapporterer `translateRequest()` (`open-sse/translator/index.ts`) pivottranskripsjonen som ble brukt i beregningen, via et tilbakekallsalternativ, og innhentingsstedene beregner et sammendrag av den samme transkripsjonen. Gjenbrukspasseringen for Responses kjører på OpenAI-pivoten for alle kildeformater, slik at Anthropic Messages-klienter (Claude → OpenAI → Responses) også får resonneringen gjenbrukt.

## Lagring — hybrid minne + SQLite

Den aktive banen bruker en `Map` i minnet (LRU etter opprettelsestidspunkt), støttet av en SQLite-tabell for gjenoppretting etter krasj og synlighet i kontrollpanelet.

| Lag   | Implementasjon                                | Formål                                        |
| ----- | --------------------------------------------- | --------------------------------------------- |
| Minne | `Map` i `open-sse/services/reasoningCache.ts` | Raske oppslag, fjerner den eldste ved 200     |
| DB    | `reasoning_cache`-tabellen (`src/lib/db/`)    | Bevares mellom omstarter og driver statistikk |

Skriving skjer til begge. Ved lesing sjekkes minnet først, og deretter brukes DB som reserve (DB-treff flyttes tilbake til minnet). DB-feil er ikke fatale — hurtigbufferen i minnet fortsetter å betjene den aktive banen.

**Standardverdier:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalt antall oppføringer i minnet: `200` (`MAX_MEMORY_ENTRIES`)
- Fjerning: eldste `createdAt` først

## Databaseskjema

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

Indekser: `expires_at`, `provider`, `model`, `created_at`. `expires_at` lagres som Unix-epokesekunder. SELECT-laget normaliserer eldre tekstverdier via `EXPIRES_AT_EPOCH_SQL`.

## Leverandør-/modellgjenkjenning

Repetisjon aktiveres når `requiresReasoningReplay(provider, model)` returnerer `true`. Funksjonen kontrollerer to lister i `open-sse/services/reasoningCache.ts`.

**Leverandør-ID-er (eksakt samsvar, skiller ikke mellom store og små bokstaver):**

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

**Regulære uttrykk for modeller (skiller ikke mellom store og små bokstaver):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` og `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valgfritt `-free`-suffiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Å legge til en ny streng leverandør/modell innebærer å føye den til én av disse listene og skrive en enhetstest som bekrefter innsetting av repetisjon. PR-beskrivelsen bør sitere den eksakte oppstrøms 400-strengen som motiverte endringen.

## REST-API

Hurtigbufferen eksponerer to endepunkter under `src/app/api/cache/reasoning/route.ts`. Begge krever administrasjonsautentisering (`isAuthenticated` fra `@/shared/utils/apiAuth`).

| Metode | Endepunkt                                                 | Beskrivelse                                           |
| ------ | --------------------------------------------------------- | ----------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistikk + sideinndelte oppføringer                 |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrert liste (`limit` begrenses til `[1, 200]`)     |
| DELETE | `/api/cache/reasoning`                                    | Tøm alt (minne + DB) og nullstill antall treff/bommer |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Tøm bare oppføringer for én leverandør                |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Slett én enkelt oppføring                             |

**GET-responsens struktur:**

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

## Driftsmerknader

- **Opprydding:** `cleanupReasoningCache()` fjerner utløpte oppføringer fra minnet og kjører `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Helsesjekkarbeidere kaller denne periodisk.
- **Gjenoppretting etter krasj:** Etter en omstart er minnet tomt, men DB-en inneholder fortsatt oppføringer som ikke har utløpt. Det første oppslaget for en gitt `tool_call_id` er et DB-treff; påfølgende oppslag er minnetreff.
- **Ingen resonnering, ingen hurtigbufring:** `cacheReasoningFromAssistantMessage` returnerer `0` når assistentmeldingen ikke har et `reasoning_content`- eller `reasoning`-felt, slik at svar uten resonnering ikke medfører noen kostnad.
- **Skriving er også betinget:** Begge kallestedene i `chatCore.ts` (ikke-strømmende og strømmende) kaller bare `cacheReasoningFromAssistantMessage()` når `requiresReasoningReplay(provider, model)` er `true` — det samme predikatet som lesesiden kontrollerer. Installasjoner som aldri bruker en repetisjonsleverandør, slipper kostnaden ved skriving, indeksoppdatering og try/catch for hvert svar som inneholder resonnering.
- **Ikke-strenge leverandører:** Når `requiresReasoningReplay` er `false` og målformatet er OpenAI, **fjerner** oversetteren eventuelle `reasoning_content`-felt fra utgående meldinger — OpenAI Chat Completions godtar dem ikke.

## Se også

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — sikringer, nedkjølingsperioder, modellsperringer
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostisering av oppstrøms 400-feil
- Kilde: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrering: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-rute: `src/app/api/cache/reasoning/route.ts`
- Opprinnelig problem: #1628
