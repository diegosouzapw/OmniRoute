# Reasoning Replay Cache (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sandhedskilde:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute registrerer `reasoning_content`, som assistenten producerer via modeller i tænkningstilstand, og afspiller det transparent i flertrinsanmodninger, når upstream-udbyderen kræver det. Dette eliminerer de HTTP 400-fejl, som strikse udbydere returnerer, når en klients samtalehistorik mangler ræsonnementet fra den foregående tur.

## Hvorfor dette findes

Flere udbydere med tænkningstilstand afviser en opfølgende tur, medmindre den **forrige assistentbesked indeholder det oprindelige `reasoning_content`**. Upstream-tjenesten returnerer 400 med meddelelser som:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Men typiske klienter (Cursor, Cline, Roo Code, OpenAI SDK) fjerner `reasoning_content` fra den historik, de afspiller. OmniRoute gendanner det fra en cache på serversiden, så den anmodning, upstream-tjenesten modtager, er konsistent. Problem #1628 introducerede den hybride persistens i hukommelse/SQLite, så cachen overlever procesgenstarter.

## Arkitektur

```
Tur N (assistenten genererer):
  → svaret indeholder reasoning_content + tool_calls
  → hvis requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      skriver (hukommelse + DB), nøglebaseret på hvert tool_call.id
  → videresend svaret til klienten (som muligvis gemmer reasoning eller ej)

Tur N+1 (klienten sender opfølgning):
  → oversætteren registrerer: requiresReasoningReplay(provider, model) === true
  → for hver assistentmeddelelse med tool_calls og uden reasoning_content:
      lookupReasoning(toolCalls[0].id) → hukommelse → DB
      fundet    → msg.reasoning_content = cached; recordReplay()
      ikke fundet → msg.reasoning_content = "" (ældre fallback for tidligere DeepSeek)
  → upstream ser konsistent historik → ingen 400
```

Registrering sker i `open-sse/handlers/chatCore.ts` (to steder, ved de to kald til `cacheReasoningFromAssistantMessage`). Genafspilning sker i `open-sse/translator/index.ts` efter skemakonvertering, men før videresendelse.

Almindelige assistentture (uden værktøjskald) nøglebaseres anderledes: `buildAssistantMessageCacheKey()` beregner et digest af sessionskonteksten samt transskriptionen i normaliseret OpenAI-format frem til den pågældende tur, fordi DeepSeek kræver reasoning fra _hver_ tidligere tur, når `tools` er til stede. For Responses-API-mål (for eksempel `opencode-go/deepseek-v4-flash`, dirigeret til `/responses`) indeholder upstream-brødteksten `input`, ikke `messages`, så rapporterer `translateRequest()` (`open-sse/translator/index.ts`) den pivottransskription, som den beregnede et digest af, via en callback-indstilling, og registreringsstederne beregner et digest af den samme transskription. Responses-genafspilningspasset kører på OpenAI-pivoten for alle kildeformater, så Anthropic Messages-klienter (Claude → OpenAI → Responses) genafspilles også.

## Lagring — hybrid hukommelse + SQLite

Den kritiske sti bruger et `Map` i hukommelsen (LRU efter oprettelsestidspunkt), som understøttes af en SQLite-tabel til gendannelse efter nedbrud og synlighed i kontrolpanelet.

| Lag        | Implementering                                | Formål                                              |
| ---------- | --------------------------------------------- | --------------------------------------------------- |
| Hukommelse | `Map` i `open-sse/services/reasoningCache.ts` | Hurtige opslag, fjerner de ældste ved 200           |
| DB         | Tabellen `reasoning_cache` (`src/lib/db/`)    | Bevares på tværs af genstarter og leverer statistik |

Skrivninger foretages begge steder. Læsninger konsulterer først hukommelsen og falder derefter tilbage til DB (DB-resultater overføres igen til hukommelsen). DB-fejl er ikke fatale — cachen i hukommelsen fortsætter med at betjene den kritiske sti.

**Standardværdier:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalt antal poster i hukommelsen: `200` (`MAX_MEMORY_ENTRIES`)
- Fjernelse: ældste `createdAt` først

## Databaseskema

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

Indekser: `expires_at`, `provider`, `model`, `created_at`. `expires_at` gemmes som sekunder siden Unix-epoken; SELECT-laget normaliserer ældre tekstværdier via `EXPIRES_AT_EPOCH_SQL`.

## Registrering af udbyder/model

Genafspilning aktiveres, når `requiresReasoningReplay(provider, model)` returnerer `true`. Funktionen kontrollerer to lister i `open-sse/services/reasoningCache.ts`.

**Udbyder-id'er (nøjagtigt match, uden forskel på store og små bogstaver):**

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

**Regulære udtryksmønstre for modeller (uden forskel på store og små bogstaver):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` og `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, valgfrit `-free`-suffiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Tilføjelse af en ny streng udbyder/model kræver, at den føjes til en af disse lister, og at der skrives en enhedstest, som bekræfter injektion ved genafspilning. PR-beskrivelsen bør citere den nøjagtige oprindelige 400-fejltekst, der motiverede ændringen.

## REST-API

Cachen stiller to slutpunkter til rådighed under `src/app/api/cache/reasoning/route.ts`. Begge kræver administrationsgodkendelse (`isAuthenticated` fra `@/shared/utils/apiAuth`).

| Metode | Slutpunkt                                                 | Beskrivelse                                                           |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + sideinddelte poster                                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtreret liste (`limit` begrænses til intervallet `[1, 200]`)        |
| DELETE | `/api/cache/reasoning`                                    | Ryd alt (hukommelse + DB), og nulstil antal træffere/forbipasseringer |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Ryd kun poster for én udbyder                                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Slet en enkelt post                                                   |

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

## Driftsbemærkninger

- **Oprydning:** `cleanupReasoningCache()` fjerner udløbne poster fra hukommelsen og kører `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Tilstandskontrolprocesser kalder denne funktion med jævne mellemrum.
- **Gendannelse efter nedbrud:** Efter en genstart er hukommelsen tom, men DB'en indeholder stadig poster, der ikke er udløbet. Det første opslag efter et givent `tool_call_id` er et DB-træf; efterfølgende opslag er hukommelsestræf.
- **Ingen ræsonnering, ingen cache:** `cacheReasoningFromAssistantMessage` returnerer `0`, når assistentmeddelelsen ikke har et `reasoning_content`-/`reasoning`-felt, så svar uden tænkning koster intet.
- **Skrivning er også betinget:** Begge kaldesteder i `chatCore.ts` (ikke-streaming og streaming) kalder kun `cacheReasoningFromAssistantMessage()`, når `requiresReasoningReplay(provider, model)` er `true` — det samme prædikat, som læsesiden kontrollerer. Installationer, der aldrig bruger en udbyder med genafspilning, undgår omkostningerne ved skrivningen, indeksopdateringen og try/catch ved hvert svar, der indeholder ræsonnering.
- **Ikke-strenge udbydere:** Når `requiresReasoningReplay` er `false`, og målformatet er OpenAI, **fjerner** oversætteren ethvert `reasoning_content`-felt fra udgående meddelelser — OpenAI Chat Completions accepterer det ikke.

## Se også

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — afbrydere, nedkølingsperioder, modelspærringer
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticering af upstream-400-fejl
- Kilde: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrering: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-rute: `src/app/api/cache/reasoning/route.ts`
- Oprindeligt problem: #1628
