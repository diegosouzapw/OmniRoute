# Memory System (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sanningskälla:** `src/lib/memory/` och `src/app/api/memory/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40 (avstängt som standard + kompletterande int8-kvantisering)

OmniRoute tillhandahåller beständigt konversationsminne kopplat till API-nyckel (och
valfritt sessions-id). Minnen extraheras automatiskt från LLM-svar
via lättviktig regex-baserad mönstermatchning och infogas åter i efterföljande
förfrågningar som ett inledande systemmeddelande (eller som det första användarmeddelandet för leverantörer som
avvisar systemrollen).

> **Minne är AVSTÄNGT som standard (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` är
> nu `false` (`src/lib/memory/settings.ts`). När minne aktiveras infogas upp till
> `maxTokens` (~2k) av hämtad kontext i **varje** chattförfrågan, vilket
> debiteras — en oväntad kostnad för nya installationer och för klienter som hanterar sin
> egen kontext. Aktivera det uttryckligen under **Inställningar → Minne** (`MemorySkillsTab`
> visar en varningsruta om tokenkostnaden när minne är aktiverat).
> En klient kan välja bort minne för en enskild förfrågan med request-headern
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — se tabellen över request-headers i
> [API_REFERENCE.md](../reference/API_REFERENCE.md). En förfrågan utan minne anger
> `memoryOwnerId = null`, vilket inaktiverar **både** minnes- och skill-injektion för
> den förfrågan (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Minne är **avgränsat per API-nyckel**, inte per användare — varje förfrågan som autentiseras
med samma API-nyckel delar samma minnespool, med valfri ytterligare
avgränsning via `sessionId`.

## Arkitektur

```
Klient → /v1/chat/completions (apiKeyInfo har lösts tidigare)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extraherar id
    → getMemorySettings()                     # cachelagrade inställningar
    → shouldInjectMemory(body, {enabled})     # villkor
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + valfri vektor
    → injectMemory(body, memories, provider)  # system- eller användarmeddelande
  → anrop till uppströmsleverantör
  → vid svar: extractFacts(text, apiKeyId, sessionId)  # icke-blockerande
    → setImmediate → createMemory(fact) per träff
                   → embed(content) + upsertVector(id, vec)
```

Anropsställena för injektion och extraktion är kopplade i
`open-sse/handlers/chatCore.ts` (sök efter `retrieveMemories`, `injectMemory`
och `extractFacts`).

## Motorarkitektur (upplösning i tre nivåer)

Minnesmotorn avgör hämtningsvägen vid körning baserat på tillgänglig
infrastruktur och inställningar. Det finns tre nivåer som används i prioritetsordning:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVÅ 0 — Nyckelord (FTS5)                                  │
  │  Probstyrd tillgänglighet: FTS5 när SQLite-versionen         │
  │  stöder det (better-sqlite3 / node:sqlite / bun:sqlite);     │
  │  otillgängligt i versioner utan FTS5 (t.ex. sql.js/WASM —    │
  │  "no such module: fts5"). Används när strategy = "exact"     │
  │  eller som reserv; engine-status keyword återspeglar proben. │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVÅ 1 — Inbäddad vektor (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 laddas via db.loadExtension().            │
  │  KNN-råstyrkesökning över Float32-vektorer. Aktiv när:       │
  │   • inläsning av sqlite-vec via loadExtension lyckas         │
  │   • En embedding-källa är tillgänglig (remote | static |     │
  │     transformers) och kan skapa en Float32Array              │
  │   • tabellen vec_memories finns (skapas vid första ready())  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVÅ 2 — Qdrant (extern vektordatabas som väljs aktivt)     │
  │  När den är aktiverad ersätter den sqlite-vec för            │
  │  semantic/hybrid. Kräver en Qdrant-instans som körs samt     │
  │  konfigurerad värd/port.                                     │
  └─────────────────────────────────────────────────────────────┘
```

Nedgradering sker automatiskt och transparent:

- Om sqlite-vec inte kan läsas in är nivå 1 otillgänglig → återgår till nivå 0.
- Om embedding-källan returnerar ett fel återgår nivå 1 till nivå 0.
- Om Qdrant inte fungerar korrekt återgår nivå 2 till nivå 1 (eller nivå 0 om nivå 1
  också är otillgänglig).

## Inbäddningskällor

Inbäddningslagret (`src/lib/memory/embedding/`) avgör vilken källa som ska användas
baserat på `MemorySettingsExtended.embeddingSource`:

| Källa          | Beskrivning                                                                        | Nyckel krävs | Kallstart          |
| -------------- | ---------------------------------------------------------------------------------- | ------------ | ------------------ |
| `remote`       | Använder en konfigurerad leverantörs inbäddnings-API (OpenAI, Cohere osv.)         | Ja           | Ingen              |
| `static`       | Lokal inbäddning via uppslagstabellen `potion-base-8M` (WordPiece + medelpoolning) | Nej          | ~200 ms            |
| `transformers` | Lokal ONNX-inferens via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`         | Nej          | ~3 s + ~400 MB RAM |
| `auto`         | Körtidsval: remote (om nyckel finns) → static → transformers → null                | Beror på     | Beror på           |

**Prioritetsordning för `auto`:**

1. Hitta den första leverantören i `listEmbeddingProviders()` med `hasKey === true` → `remote`.
2. Om `settings.staticEnabled === true` → `static`.
3. Om `settings.transformersEnabled === true` → `transformers`.
4. Annars → `null` (degraderas till FTS5-nyckelordssökning).

Inbäddningscachen (`src/lib/memory/embedding/cache.ts`) använder en LRU-karta i minnet
med nyckeln `${source}:${model}:${dim}:${sha256(text)}`, begränsad till
`MEMORY_EMBEDDING_CACHE_MAX` poster (standardvärde 1000) med en TTL på
`MEMORY_EMBEDDING_CACHE_TTL_MS` (standardvärde 5 min). Den delas mellan alla anropare
under processens livscykel.

## Hybrid-RRF (k=60)

När `strategy = "hybrid"` och vektorlagret är tillgängligt använder hämtningen
Reciprocal Rank Fusion för att slå samman FTS5- och vektorresultat:

```
RRF(d) = Σ  1 / (k + rank_i(d))      där k = 60 (kan konfigureras via MEMORY_RRF_K)
          i
```

Konkret:

1. Kör FTS5-sökning → rangordnad lista `R_fts` (position 1..N).
2. Kör KNN-vektorsökning → rangordnad lista `R_vec` (position 1..M).
3. För varje unikt `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 om det inte finns i listan).
4. Sortera efter `rrf_score` DESC och genomför genomgången enligt tokenbudgeten.

RRF är känt för att vara effektivt utan att poäng behöver normaliseras mellan
heterogena hämtningssystem. Standardvärdet `k=60` kommer från den ursprungliga
artikeln av Cormack et al. och fungerar väl för små korpusar (<10 000 minnen).

## Återfyllning (lat + omindexering)

När inbäddningsmodellen ändras (identifieras via `embedding_signature`) byggs
vektorlagret om och alla befintliga minnen markeras med
`needs_reindex = 1` i tabellen `memories`.

**Lat återfyllning**: Vid nästa hämtning bäddas alla minnen som saknar en vektorpost
in och infogas i `vec_memories` innan sökningen körs. Detta fördelar
återfyllningskostnaden över faktiska förfrågningar utan att blockera uppstarten.

**Explicit omindexering**: Fliken Engine i `/dashboard/memory` innehåller en
knapp med texten "Omindexera nu" som anropar `POST /api/memory/reindex`. Hanteraren anropar
`runReindexBatch()` från `src/lib/memory/reindex.ts`, som bearbetar upp till
`limit` väntande poster per begäran. Förloppet kan avläsas genom regelbundna anrop till
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabellen `memory_vec_meta` (migrering `083_memory_vec.sql`) lagrar:

- `active_dim` — aktuell vektordimension (null = ännu inte kalibrerad).
- `embedding_signature` — `${source}:${model}:${dim}` som används för att identifiera ändringar.
- `last_reset_at` — tidsstämpel för den senaste fullständiga återställningen.
- `vec_loaded` — 0/1-flagga som anger om sqlite-vec lästes in korrekt.

## Inställningstillägg

Nio inbäddnings- och vektorfält finns tillgängliga i `MemorySettingsExtended` i
`src/shared/schemas/memory.ts` och sparas via `src/lib/db/settings.ts`:

| Fält                     | Typ                                                | Standardvärde | Beskrivning                                                     |
| ------------------------ | -------------------------------------------------- | ------------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`      | Vilken inbäddningskälla som ska användas                        |
| `embeddingProviderModel` | `string \| null`                                   | `null`        | Leverantör/modell i formatet `provider/model`                   |
| `customBaseUrl`          | `string \| null`                                   | `null`        | OpenAI-kompatibel bas-URL endast för minnen                     |
| `customModelId`          | `string \| null`                                   | `null`        | Modell-ID som skickas till den anpassade slutpunkten            |
| `transformersEnabled`    | `boolean`                                          | `false`       | Aktivt val av Transformers.js (MiniLM, ~400 MB)                 |
| `staticEnabled`          | `boolean`                                          | `false`       | Aktivt val av den lokala statiska modellen potion-base-8M       |
| `rerankEnabled`          | `boolean`                                          | `false`       | Aktivera omrangordningssteget (lägger till +200–500 ms/begäran) |
| `rerankProviderModel`    | `string \| null`                                   | `null`        | Leverantör/modell för omrangordning i formatet `provider/model` |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`      | Vilken vektorbackend som ska användas                           |

Dessa exponeras via `GET /PUT /api/settings/memory` (schemat `MemorySettingsExtendedSchema`).

För källan `remote` godtar Memory även de valfria inställningarna `customBaseUrl` och
`customModelId`. Tillsammans väljer de en OpenAI-kompatibel `/embeddings`-slutpunkt
och modell utan att ändra det globala inbäddningsregistret. Slutpunkten normaliseras
före användning och kontrolleras av leverantörens policy för utgående URL:er: HTTP(S)
krävs, inbäddade autentiseringsuppgifter och frågesträngar avvisas och adresser till
molnmetadata förblir blockerade. Tomma värden bevarar den valda registerleverantören.
Fel som returneras till instrumentpanelen saneras och autentiseringsuppgifter för
slutpunkten loggas aldrig.

> **TODO (D20):** Omfattningen `global` (delning av minnen mellan alla API-nycklar) är inte
> implementerad i den här versionen. Den kräver schemaändringar och en global
> hämtningsväg. Spåra detta separat.

## Lagringslager

### Primärt: SQLite (`memories`-tabellen)

Skapas av migreringen `015_create_memories.sql`:

| Kolumn                      | Typ                | Anmärkningar                                                                   |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID genererat via `crypto.randomUUID()`                                       |
| `api_key_id`                | `TEXT NOT NULL`    | Ägande API-nyckel                                                              |
| `session_id`                | `TEXT`             | Valfri omfattning per konversation                                             |
| `type`                      | `TEXT NOT NULL`    | Ett av `factual`, `episodic`, `procedural`, `semantic`                         |
| `key`                       | `TEXT`             | Stabil upsert-nyckel, t.ex. `preference:i_prefer_python`                       |
| `content`                   | `TEXT NOT NULL`    | Den faktiska faktatexten                                                       |
| `metadata`                  | `TEXT`             | JSON-blob (category, extractedAt, source, ...)                                 |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601-strängar                                                              |
| `expires_at`                | `TEXT`             | Valfritt utgångsdatum; `NULL` innebär permanent                                |
| `memory_id`                 | `INTEGER UNIQUE`   | Tillagd av `023_fix_memory_fts_uuid.sql` för att koppla UUID:n ↔ FTS5-rad-ID:n |

Index: `api_key_id`, `session_id`, `type`, `expires_at` samt det unika
`memory_id`-indexet.

**Upsert-semantik**: `createMemory()` letar efter en befintlig rad med samma
`(api_key_id, key)` och uppdaterar den på plats när en sådan hittas (`metadata`
sammanfogas via ytlig spridning). Detta förhindrar att tabellen växer obegränsat
vid upprepade preferensutsagor.

### Fulltextsökning (den virtuella tabellen `memory_fts`)

`022_add_memory_fts5.sql` skapar en virtuell FTS5-tabell över `content` och
`key`. `023_fix_memory_fts_uuid.sql` åtgärdar ett verkligt fel där den primära
UUID-nyckeln inte kunde kopplas till FTS5:s heltalsbaserade rad-ID – migreringen
lägger till kolumnen `memory_id`, återskapar FTS-tabellen och konfigurerar triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) som håller FTS synkroniserad vid
INSERT, DELETE och UPDATE.

Används av `retrieval.ts` för strategierna `semantic` och `hybrid` (se nedan).
Hämtningskoden skyddar med `hasTable("memory_fts")` och faller tillbaka till
kronologisk ordning om FTS-tabellen saknas eller om FTS-frågan ger ett fel.

### Valfritt: Qdrant (vektorlager på nivå 2)

`src/lib/memory/qdrant.ts` implementerar en valfri Qdrant-integration som ett
vektorlager på nivå 2. Hämtning dirigeras endast till Qdrant när motorväljaren
`memoryVectorStore === "qdrant"` – standardvärdet `"auto"` (och `"sqlite-vec"`)
väljer **aldrig** Qdrant. Växlingsknappen på fliken Engine ställer in **både**
`qdrantEnabled` och `memoryVectorStore` tillsammans: aktivering gör Qdrant till
det primära lagret, medan inaktivering återställer till `"auto"` (#5597 – före
den korrigeringen hade aktiveringen ingen effekt eftersom inget skrev till
motorväljaren). Om Qdrant inte kan nås eller inte returnerar något faller
hämtningen tillbaka till sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — bäddar in `key + content` med den konfigurerade
  inbäddningsmodellen, säkerställer att samlingen finns (skapar vektorer med
  cosinusavstånd vid första användningen) och infogar eller uppdaterar en punkt
  med nyttolasten `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — bäddar in frågan, söker i
  samlingen filtrerad efter `kind = "omniroute_memory"` och valfritt efter
  `apiKeyId` / `sessionId`. Begränsar `topK` till `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — tar bort en enskild punkt. Anropas av
  `deleteMemory()` efter att SQLite-raden har tagits bort (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — massborttagning av punkter vars
  `expiresAtUnix` ligger i det förflutna eller vars `createdAtUnix` är äldre än
  gränsen för kvarhållning. Räknar först så att kontrollpanelen kan visa faktiska antal.
- `checkQdrantHealth()` — hälsokontroll via `GET /readyz` med latens.

Inställningsgränssnittet visar Qdrant-konfiguration, hälsokontroll, test av semantisk sökning
och rensning på fliken **Motor** i `/dashboard/memory`. Motsvarande
rutter under `src/app/api/settings/qdrant/` är samtliga anslutna från och med v3.8.6:

| Rutt                                    | Metod         | Beskrivning                            |
| --------------------------------------- | ------------- | -------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Läs/uppdatera Qdrant-inställningar     |
| `/api/settings/qdrant/health`           | `GET`         | Tillgänglighetskontroll + latens       |
| `/api/settings/qdrant/search`           | `POST`        | Test av semantisk sökning              |
| `/api/settings/qdrant/cleanup`          | `POST`        | Ta bort utgångna/gamla punkter         |
| `/api/settings/qdrant/embedding-models` | `GET`         | Lista tillgängliga inbäddningsmodeller |

**Beteendeanmärkningar (vad du kan förvänta dig):**

- **Val av motor** — när Qdrant aktiveras på fliken Motor blir det det primära
  lagret (sätter `memoryVectorStore="qdrant"`); vid inaktivering återställs det till `"auto"` (#5597).
- **Ingen retroaktiv ifyllnad** — endast minnen som skapas/uppdateras **efter** att Qdrant har aktiverats
  skrivs dit (asynkron dubbelskrivning utan väntan på resultat). Befintliga SQLite-minnen
  migreras **inte**; ”Omindexera nu” bygger endast om sqlite-vec-indexet, inte Qdrant.
- **Vektordimensionen identifieras automatiskt** från den faktiska inbäddningen vid första användningen —
  det finns inget dimensionsfält att fylla i. Byte av inbäddningsmodell efter att en samling
  har skapats hanteras **inte** automatiskt: den befintliga samlingen lämnas orörd, och skrivningar/sökningar
  med avvikande dimension misslyckas och faller tillbaka till sqlite-vec. Återskapa samlingen
  (med ett nytt namn eller genom att ta bort den i Qdrant) för att byta inbäddningsmodell.
- **Avståndsmått** — alltid **Cosine** (hårdkodat när samlingen skapas; kan inte
  konfigureras).
- **Autentisering** — endast API-nyckel (skickas som `api-key`-headern; valfritt för oautentiserad
  lokal Docker). JWT/RBAC används inte.
- **Konfigurationsfält** — gränssnittet visar `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` finns endast i miljön/databasen och `vectorSize`
  används inte när samlingen skapas (dimensionen kommer från inbäddningen).

### Vektorkvantisering (int8 — valfri aktivering, båda backend-systemen)

Båda vektorbackend-systemen stöder **valfri int8-kvantisering** för att minska
minnesutrymmet för lagrade vektorer (cirka 4× mindre än Float32) till priset av en mindre
försämring av återfångsten. Standardinställningen är **av** för båda — vektorer behåller full
precision om funktionen inte uttryckligen aktiveras.

| Backend    | Inställning                       | Typ                            | Standard | Var den läses                                               |
| ---------- | --------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB-nyckel)  | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (miljö) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** konfigureras per instans via inställningsnyckeln `qdrantQuantization`
  (visas som fältet `quantization` för `PUT /api/settings/qdrant`). Vid
  `"int8"` begär `buildQuantizationConfig()` skalär kvantisering
  (`always_ram`, kvantil `0.99`) och sökningar aktiverar `rescore: true` så att
  vektorerna med full precision förfinar int8-kandidatuppsättningen.
- **sqlite-vec**-kvantisering konfigureras **endast via miljön** (inte som en DB-inställning): ange
  `MEMORY_VEC_QUANTIZATION=int8` för att lagra de lokala vektorerna som en `int8[dim]`-
  kolumn via `vec_quantize_int8(?, 'unit')`. Det valda läget införlivas i
  `embedding_signature` (suffixet `:int8`), så ett byte av läge utlöser en fullständig
  omindexering av tabellen `vec_memories` — samma väg för uppskjuten retroaktiv ifyllnad som används när
  inbäddningsmodellen ändras.

## Minnestyper

`MemoryType` (`src/lib/memory/types.ts`):

| Typ          | Används för                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `factual`    | Preferenser, stabila användarfakta, beteendemönster                              |
| `episodic`   | Beslut knutna till ett specifikt tillfälle ("Jag valde Postgres")                |
| `procedural` | Arbetsflöden/instruktionsminnen (reserverat; ingen automatisk extraherare i dag) |
| `semantic`   | Reserverat för poster i vektorlagret                                             |

Hämtningsstrategin för `MemoryConfig` är en av `exact`, `semantic` eller `hybrid`,
och omfattningen är en av `session`, `apiKey` eller `global`. Standardomfattningen från
`getMemorySettings()` är `apiKey`.

## Faktaextrahering (`extraction.ts`)

Extraheringen är **regex-baserad**, inte LLM-baserad – den körs i processen med
`setImmediate()` så att den aldrig blockerar svarsströmmen:

- **Preferensmönster** → `MemoryType.FACTUAL`
  (t.ex. `Jag föredrar …`, `Jag tycker verkligen om …`, `min favorit är …`, `Jag hatar …`)
- **Beslutsmönster** → `MemoryType.EPISODIC`
  (t.ex. `Jag kommer att använda …`, `Jag valde …`, `Jag bestämde mig för …`, `Jag kommer att börja använda …`)
- **Beteendemönster** → `MemoryType.FACTUAL`
  (t.ex. `Jag brukar …`, `Jag gör alltid …`, `Jag tenderar att …`)

Varje träff rensas (`trim`, komprimering av blanksteg, begränsning till 500 tecken),
dedupliceras inom batchen via en stabil `factKey(category, content)` och
lagras via `createMemory()` med metadata
`{category, extractedAt, source: "llm_response"}`. Indatatexten begränsas till
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) – när den är längre används textens
**slut**, så att det senaste assistentinnehållet alltid tas med.

`extractFactsFromText(text)` exporteras för tester och returnerar strukturerade
fakta utan att lagra dem.

## Hämtning (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` är den huvudsakliga startpunkten. Den:

1. Normaliserar och validerar konfigurationen genom `MemoryConfigSchema`.
2. Returnerar omedelbart `[]` när `enabled` är false eller `maxTokens <= 0`.
3. Begränsar `maxTokens` till `[1, 8000]`.
4. Identifierar om den moderna tabellen `memories` finns (i stället för den äldre
   tabellen `memory`), så att äldre databaser fortsätter att fungera.
5. Bygger grundfrågan med ett förfallovillkor
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), valfri
   sessionsomfattning och ett valfritt gränsvärde för `retentionDays`.
6. Förgrenar sig utifrån strategi:
   - **`exact`** (standard): kronologisk `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: om `config.query` har ett värde och `memory_fts` finns, använd JOIN med
     `memory_fts MATCH ?` och sortera efter FTS-rankning; fall tillbaka till kronologisk
     ordning när FTS returnerar 0 rader.
   - **`hybrid`**: union av FTS-resultat (högre relevans) och den
     kronologiska uppsättningen, deduplicerad efter id.
7. Beräknar en nyckelordsbaserad relevanspoäng (`getRelevanceScore`) för
   `content`, `key` och JSON-fältet `metadata` när en fråga har angetts. Rader med
   noll poäng filtreras bort.
8. Sorterar efter poäng i fallande ordning och därefter `createdAt` i fallande ordning.
9. Går igenom den rangordnade listan och godtar poster så länge den löpande
   beräkningen `estimateTokens(content)` (≈ `length / 4`) håller sig inom budgeten. Returnerar
   alltid minst en post när det finns någon matchning.

`estimateTokens` exporteras och används av hämtning, sammanfattning och MCP-verktyget
`omniroute_memory_search`.

## Injektion (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Sammanfogar allt minnesinnehåll till en enda sträng av typen `Memory context: …`.
2. Väljer en strategi baserat på leverantörens namn:
   - **Systemmeddelande** (standard för OpenAI, Anthropic, Gemini, …) — lägger till
     ett `{role: "system", content: memoryText}` före alla befintliga systemmeddelanden
     så att användarens systempromptar fortfarande har företräde.
   - **Användarmeddelande** (reservalternativ) — för leverantörer i
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Dessa avvisar systemrollen
     och skulle annars returnera 400 (se ärende #1701 för GLM/Zhipu).
3. Loggar antalet, strategin och modellen under `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` exporteras för anropare som behöver
fatta egna dirigeringsbeslut. Okända leverantörer får som standard värdet `true`
(systemrollen tillåts) för säkerhets skull.

## Inställningar (`settings.ts`)

Minneskonfigurationen **lagras i databasens inställningstabell**, inte i miljövariabler.
`getMemorySettings()` läser från `getSettings()` och cachelagrar resultatet
i processen; `invalidateMemorySettingsCache()` anropas av inställningarnas PUT-rutt
efter skrivningar.

### Äldre fält (alla versioner)

| Databasnyckel         | Typ     | Standardvärde                                     | UI-kontroll                                          |
| --------------------- | ------- | ------------------------------------------------- | ---------------------------------------------------- |
| `memoryEnabled`       | boolesk | `false` (av som standard sedan v3.8.30)           | Minne på/av                                          |
| `memoryMaxTokens`     | heltal  | `2000` (intervall `0–16000`)                      | Tokenbudget för injektion                            |
| `memoryRetentionDays` | heltal  | `30` (intervall `1–365`)                          | Lagringsperiod                                       |
| `memoryStrategy`      | enum    | `"hybrid"` (en av `recent`, `semantic`, `hybrid`) | Hämtningsstrategi                                    |
| `skillsEnabled`       | boolesk | `false`                                           | Växlar färdighetsinjektion per nyckel (se SKILLS.md) |

Obs! UI-strategin `"recent"` mappas till den interna hämtningsstrategin `"exact"`
via `toMemoryRetrievalConfig()` (kronologisk ordning).

### Nya fält (v3.8.6, plan 21 D9)

Se även avsnittet "Inställningstillägg" ovan för fältbeskrivningar.

| Databasnyckel               | API-fält                 | Standardvärde |
| --------------------------- | ------------------------ | ------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`      |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`        |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`       |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`       |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`       |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`        |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`      |

Qdrant-relaterade databasnycklar (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` med standardvärdet `"omniroute_memory"`,
`qdrantEmbeddingModel` med standardvärdet `"openai/text-embedding-3-small"`) läses av
`normalizeQdrantConfig()` i `qdrant.ts`.

### Miljövariabler (v3.8.6)

Sex valfria miljövariabler finjusterar motorns beteende vid körning (dokumenterade i `.env.example`):

| Variabel                        | Standardvärde              | Beskrivning                                                                                                                             |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL för inbäddningscache (5 min)                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maximalt antal poster i LRU-cachen för inbäddningar                                                                                     |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF-arkiv för Transformers.js-modellen                                                                                                   |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF-arkiv för den statiska potion-modellen                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Plats för lagring av hämtade modeller                                                                                                   |
| `MEMORY_VEC_TOP_K`              | `20`                       | Standardvärde för top-K vid vektorsökning                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | RRF-konstanten k för hybridsökning                                                                                                      |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Ange `int8` för att lagra lokala sqlite-vec-vektorer kvantiserade (~4× mindre; aktivt val). Ett lägesbyte tvingar fram en omindexering. |

## Sammanfattning (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` komprimerar äldre
innehåll när det löpande totala antalet token för en nyckels minnen överskrider
budgeten. Den itererar över raderna i fallande ordning efter `created_at`, behåller
rader som ryms och ersätter `content` på plats för resten med de tre första
meningarna i originalet. `tokensSaved` är skillnaden i `estimateTokens` mellan
det gamla och det nya innehållet.

Den här rutinen är **tillgänglig men anropas inte automatiskt** i den nuvarande
chattpipelinen – anropa den från ett cron-jobb, en administratörsåtgärd eller
`MemoryConfig.autoSummarize`-integrationskod om du behöver kontinuerlig
komprimering. Dataförlusten är oåterkallelig: originaltexten skrivs över.

## REST-API

Alla slutpunkter kräver hanteringsautentisering (`requireManagementAuth`).

### Centrala slutpunkter för minnen (befintliga + uppdaterade)

| Metod    | Sökväg               | Beskrivning                                                                                                                                                                      |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Sidindelad lista med filter: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Svaret innehåller `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` |
| `POST`   | `/api/memory`        | Skapa en post (Zod-validerad: `content`, `key`, valfria `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Anropar `createMemory()` som gör upsert på `(apiKeyId, key)`  |
| `GET`    | `/api/memory/[id]`   | Hämta en enskild post via UUID                                                                                                                                                   |
| `PUT`    | `/api/memory/[id]`   | Uppdatera postfält (`type`, `key`, `content`, `metadata`). Brödtext: `MemoryUpdatePutSchema`. Synkroniserar även vektorn om en källa för inbäddning är tillgänglig.              |
| `DELETE` | `/api/memory/[id]`   | Ta bort en post; tar även bort från `vec_memories` (D15) och Qdrant efter bästa förmåga. Returnerar 404 om posten saknas.                                                        |
| `GET`    | `/api/memory/health` | Kör `verifyExtractionPipeline("health-check")` – tur-och-retur med skapa→lista→ta bort. Returnerar `{working, latencyMs, error?}`                                                |

### Nya slutpunkter för minnesmotorn (plan 21)

| Metod  | Sökväg                            | Beskrivning                                                                                                                                                                         |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Testkörning av `retrieveMemories` – returnerar rangordnade resultat med poäng, nivå och token. Brödtext: `RetrievePreviewSchema`. Injicerar eller ändrar INTE minnen.               |
| `GET`  | `/api/memory/embedding-providers` | Listar leverantörer med inbäddningsmodeller och anger vilka som har en konfigurerad API-nyckel.                                                                                     |
| `GET`  | `/api/memory/engine-status`       | Returnerar fullständig motorstatus: nyckelordsnivå, inbäddningslösning, statistik för vektorlagret, Qdrant-hälsa och omrangordningskonfiguration. Form: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Utlös minneskomprimering manuellt. Brödtext: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Returnerar `{candidates, tokensSaved}`.                              |
| `POST` | `/api/memory/reindex`             | Utlös omindexering av vektorer för minnen med `needs_reindex=1`. Brödtext: `MemoryReindexSchema` (`force`). Returnerar `{started, pending}`.                                        |

### Slutpunkter för inställningar

| Metod  | Sökväg                                  | Beskrivning                                                                                                     |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Aktuella normaliserade `MemorySettingsExtended` (7 nya fält + äldre fält)                                       |
| `PUT`  | `/api/settings/memory`                  | Uppdatera valfritt fält från `MemorySettingsExtendedSchema` (totalt 12 fält)                                    |
| `GET`  | `/api/settings/qdrant`                  | Aktuella Qdrant-inställningar (`QdrantSettingsSchema`)                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Uppdatera Qdrant-inställningar. Brödtext: `QdrantSettingsUpdateSchema`. `apiKey` = tom sträng tar bort nyckeln. |
| `GET`  | `/api/settings/qdrant/health`           | Tillgänglighetskontroll mot den konfigurerade Qdrant-instansen. Returnerar `QdrantHealthResultSchema`.          |
| `POST` | `/api/settings/qdrant/search`           | Test av semantisk sökning mot Qdrant. Brödtext: `QdrantSearchSchema` (`query`, `topK`).                         |
| `POST` | `/api/settings/qdrant/cleanup`          | Ta bort Qdrant-punkter för utgångna/gamla minnen.                                                               |
| `GET`  | `/api/settings/qdrant/embedding-models` | Lista inbäddningsmodeller som är tillgängliga för Qdrant.                                                       |

Listfrågan `/api/memory` stöder antingen `page`-baserad sidindelning
(`parsePaginationParams`) **eller** ett direkt `offset` – när `offset` anges
har det företräde och ett härlett `page` beräknas för svarets struktur.

## MCP-verktyg (`open-sse/mcp-server/tools/memoryTools.ts`)

När MCP-servern är aktiverad registreras tre minnesverktyg:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → omsluter `retrieveMemories()`. Från och med v3.8.6 (D16) läses `strategy`
  från `getMemorySettings()` i stället för att vara hårdkodad till `"exact"`. Om
  `query` anges och `strategy` är `semantic` eller `hybrid` används
  vektorlagret när det är tillgängligt.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → omsluter `createMemory()`. Accepterar endast de fyra kanoniska typerna:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → listar matchande
  poster, filtrerar valfritt efter tidsstämpel för skapande före angiven tid och raderar sedan varje post
  via `deleteMemory()` (som även tar bort vektorer från sqlite-vec + Qdrant).

Se [MCP-SERVER.md](./MCP-SERVER.md) för information om transport och omfattning.

## Instrumentpanel (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` är nu en **Studio med tre flikar**:

### Flik: Minnen

- Konceptkort (komprimerbar förklaring av ”Så fungerar det”).
- Lista, sökning och sidnumrering i realtid (300 ms debounce).
- Typfilter (`factual` / `episodic` / `procedural` / `semantic` / alla).
- Modal för att lägga till minne (nyckel, innehåll, typ).
- Redigering direkt i raden (pennknapp → `PUT /api/memory/[id]`).
- Radering per rad (med bekräftelsedialogruta).
- JSON-export av den aktuella sidan; JSON-import via filväljare.
- Statistikkort: `totalEntries`, `tokensUsed`, `hitRate`.
- Knappen ”Komprimera gamla” → `POST /api/memory/summarize` (en torrkörning visar först
  antalet kandidater och därefter begärs bekräftelse).
- En grön/röd hälsostatuspunkt som styrs av `GET /api/memory/health`.

### Flik: Testmiljö

- Frågefält + strategiväljare (Exakt / Semantisk / Hybrid) + tokenbudget.
- ”Simulera” → `POST /api/memory/retrieve-preview` — visar rangordnade resultat med
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Lösningspanel som visar vilken inbäddningskälla/vilket vektorlager som användes och
  om en reservlösning aktiverades.

### Flik: Motor

- Panel för motorstatus (chip för nyckelordsbaserad FTS5, inbäddning, vektorlager,
  Qdrant-hälsa och omrangordning).
- Knappen ”Indexera om nu” → `POST /api/memory/reindex`.
- Väljare för inbäddningskälla (automatisk / fjärrbaserad / statisk / transformers + växlingsknappar).
- Konfigurationskort för Qdrant (aktiveringsknapp, värd/port/samling/nyckel, anslutningstest,
  semantiskt söktest, rensning).
- Konfigurationskort för omrangordning (aktiveringsknapp, val av leverantör/modell).

Inställningar för minne och Qdrant finns även under
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) för
den äldre/globala inställningsvyn.

## Cachelagring

`src/lib/memory/store.ts` upprätthåller en processintern LRU-liknande cache
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, med avlägsnande av de 20 %
äldsta posterna) för läsningar med `getMemory(id)`, samt ett generiskt nyckel/värde-baserat
`memoryCache`-lager (`src/lib/memory/cache.ts`) med metoderna `get`/`set`/`invalidate`
som används av anropare som vill ha en egen avgränsad cache (LRU med 1 000 poster,
standard-TTL på 5 min).

## Integritet och livscykel

- Minnets ägare är API-nyckelns id (`resolveMemoryOwnerId` i
  `chatCore.ts`). Utan ett `apiKeyInfo.id` körs varken hämtning, injicering
  eller extrahering.
- Poster med ett framtida `expires_at` filtreras bort vid hämtning; gamla
  poster bortom `retentionDays` utesluts av villkoret
  `created_at >= cutoff` i `retrieveMemories`.
- För permanent radering använder du `DELETE /api/memory/[id]` eller `omniroute_memory_clear`.
- Extrahering sker utan väntan på resultat via `setImmediate`; fel loggas under
  `memory.extraction.background.failed` och visas aldrig för anroparen.
- Verifieringsturer (`verifyExtractionPipeline`) rensar sina egna
  testposter i ett `finally`-block.

## Se även

- [SKILLS.md](./SKILLS.md) — inställningen `skillsEnabled` injicerar
  verktygsdefinitioner tillsammans med minnet.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-transport/behörighetsomfång.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — bredare API-yta.
- Källmoduler:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid-RRF
  - `src/lib/memory/embedding/index.ts` — inbäddningslager med flera källor
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-scheman för alla minnes-API-kroppar
  - `src/shared/schemas/qdrant.ts` — Zod-scheman för Qdrant-inställningar/-åtgärder
  - `src/lib/db/memoryVec.ts` — CRUD för `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + underordnade routes
  - `src/app/(dashboard)/dashboard/memory/` — Studio-gränssnitt (sida + komponenter +
    flikar + hooks)
  - `open-sse/handlers/chatCore.ts` (koppling för injicering/extrahering)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Välja en inbäddningsleverantör (v3.8.16+)

OmniRoutes minnesmotor stöder **fyra inbäddningskällor** (`src/lib/memory/embedding/`). Var och en innebär olika avvägningar vad gäller **latens, kostnad, modellkvalitet och installationskomplexitet**.

### Inbäddningskällorna

| Leverantör     | Källa                                       | Latens                            | Kostnad             | Kvalitet                             | Installation                            |
| -------------- | ------------------------------------------- | --------------------------------- | ------------------- | ------------------------------------ | --------------------------------------- |
| `transformers` | Lokal ONNX-modell (Xenova/all-MiniLM-L6-v2) | ~50–150 ms (CPU)                  | Kostnadsfri         | Bra                                  | Endast `npm install`                    |
| `static`       | Förberäknade vektorer (cachade)             | <1 ms                             | Kostnadsfri         | Ej tillämpligt (beror på cacheträff) | Ingen                                   |
| `remote`       | OpenAI-/Cohere-/Voyage-API                  | ~100–300 ms                       | $0,02–0,10/1M token | Utmärkt                              | API-nyckel                              |
| `auto`         | Väljer bästa tillgängliga källa vid körning | Samma som vald källa              | Kostnadsfri         | Samma som vald källa                 | Ingen                                   |
| _(cache)_      | LRU-lager i minnet ovanpå valfri källa      | <1 ms (träff), full latens (miss) | Kostnadsfri         | Samma som underliggande källa        | Alltid aktiverat (inte en valbar källa) |

### Beslutsträd

```
                  Vilken är din driftsättningsmiljö?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  UTV./TEST   LITEN PROD.   STOR PROD.    KANT / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, inget API)        (bäst kvalitet)  (inget internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Lägg ALLTID till `cache`-lagret ovanpå
            (LruCache omsluter valfri leverantör)
```

### Databas- och API-konfiguration

Alternativen för minnesinbäddning konfigureras via API:et/användargränssnittet för inställningar, inte via miljövariabler. De relevanta databasnycklarna för inställningar under Inställningar (`normalizeMemorySettings` i `src/lib/memory/settings.ts`) är:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (API-baserad, t.ex. OpenAI), `"static"` (externt lager) eller `"auto"`
- `memoryEmbeddingProviderModel`: Modellidentifierare för fjärrbaserade/statiska källor (t.ex. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` eller `"auto"`

#### Lokal modell (`transformers`)

Använder transformers.js internt för att köra lokala modeller:

```bash
# Miljövariabler som läses i koden (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-modellarkiv
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statisk HF Potion-modell
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cachekatalog
```

#### LRU-cache för inbäddningar

Cachen är alltid aktiverad som standard och konfigureras via miljövariabler:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maximalt antal cachade objekt
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Prestandasiffror

Prestandatest på en typisk x86-server med 4 kärnor (texter på ~100 token vardera):

| Leverantör           | p50   | p95   | p99   | Kostnad/1M inbäddningar          |
| -------------------- | ----- | ----- | ----- | -------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratis                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002)/$0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Beror på Qdrant-värdtjänsten     |
| `cache` (träff)      | <1ms  | <1ms  | 2ms   | Gratis                           |

---

## Mönster för faktaextraktion (v3.8.16+)

Modulen `extraction.ts` (`src/lib/memory/extraction.ts`) använder **matchning med reguljära uttryck** för att extrahera strukturerade fakta från konversationsmeddelanden. Genom att förstå dessa mönster kan du finjustera extraktionskvaliteten för ditt användningsfall.

### Standardkategorier för mönster

| Kategori            | Exempelmönster                                              | Extraherar                  |
| ------------------- | ----------------------------------------------------------- | --------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Användarpreferenser         |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Användarbeslut (episodiska) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Bestående beteendemönster   |

### Exempelmönster (förenklade)

```ts
// Från src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### Vad som extraheras

När en användare säger:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Extraktionen skapar 4 minnen:
>
> | Nyckel                               | Kategori   | Typ      | Innehåll                    |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Extraktionsgränser

För att förhindra okontrollerad extraktion gäller följande gränser:

| Minsta innehållslängd | 3 tecken |
| Största innehållslängd | 500 tecken |

### När extraktion bör inaktiveras

Extraktionen körs automatiskt när minnesfunktionen är aktiverad; det finns ingen separat
växel enbart för extraktion. Om du vill stänga av den måste du inaktivera minnesfunktionen helt (`enabled: false`
via `PUT /api/settings/memory`). Överväg att göra det när:

- Du har en stor meddelandevolym och extraktionskostnaden inte är försumbar
- Dina konversationer huvudsakligen är tillfälliga (chatt, felsökning) och saknar långsiktigt värde
- Du redan samlar in kontext via anpassade insticksprogram

---

## Finjustering av hybrid-RRF (v3.8.16+)

Algoritmen **Reciprocal Rank Fusion (RRF)** kombinerar resultat från FTS5 (nyckelord) och vektorsökning (semantisk). Parametern `k` styr hur stor vikt som ges åt lägre rankade resultat.

### Formeln

För varje kandidatminne är RRF-poängen:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Där:

- `k` är konstanten (standardvärde 60)
- `rank_i(d)` är rankningen för dokument `d` i det i:te hämtningssystemet (FTS, vektor)
- Summan beräknas över alla hämtningssystem

### Hur `k` påverkar resultaten

| `k`-värde             | Effekt                                                                             | Passar bäst för                                  |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| `k=0`                 | Ren rankningsfusion (ingen utjämning)                                              | Teoretisk baslinje                               |
| `k=10-30`             | Viktar toppresultat kraftigt, låga rankningar bidrar knappt                        | När de tre främsta resultaten oftast är korrekta |
| **`k=60`** (standard) | Balanserad — de tio främsta resultaten bidrar alla märkbart                        | Hämtning för allmänna ändamål                    |
| `k=100+`              | Flackare — även lågt rankade resultat kan dominera om de förekommer i flera system | När återkallning > precision är avgörande        |

### Finjustering av `k` i praktiken

```bash
# Standard
MEMORY_RRF_K=60

# Aggressiv precision (litet minne, få dokument)
MEMORY_RRF_K=20

# Maximal återkallning (stort minne, varierade frågor)
MEMORY_RRF_K=120
```

**Exempel med `k=20`:**

- FTS-rankning 1 → bidrag `1/21 = 0.048`
- FTS-rankning 10 → bidrag `1/30 = 0.033`
- Vektorrankning 1 → bidrag `0.048`
- Kombinerat maximum: `0.096`

**Exempel med `k=60`:**

- FTS-rankning 1 → bidrag `1/61 = 0.016`
- FTS-rankning 10 → bidrag `1/70 = 0.014`
- Vektorrankning 1 → bidrag `0.016`
- Kombinerat maximum: `0.033`

Med ett högre `k` blir den **relativa skillnaden** mellan rankning 1 och rankning 10 mindre, vilket innebär att algoritmen förlitar sig mer på **samstämmighet mellan hämtningssystemen** än på säkerheten hos topprankningen.

### När `k` bör ändras

| Symptom                                                       | Prova                                                                      |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Toppresultatet vinner alltid, men är fel                      | **Sänk** k (t.ex. 20) — säkerheten hos topprankningen får större betydelse |
| Rätt svar finns bland de fem främsta men inte på första plats | **Höj** k (t.ex. 100) — flackare poängsättning belönar samstämmighet       |
| Återkallningen är hög men precisionen är låg                  | **Sänk** k — skärp rankningen                                              |
| Återkallningen är låg (relevanta dokument saknas)             | **Höj** k — ge lägre rankade dokument en chans                             |

### RRF-viktning

Reciprocal Rank Fusion använder lika vikter för semantisk vektorrankning och rankning från fulltextsökning:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Det finns inga miljövariabler för att justera enskilda vikter (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` finns inte).

---

## Sammanfattningsstrategi (v3.8.16+)

Modulen `summarization.ts` (`src/lib/memory/summarization.ts`) komprimerar äldre minnen för att hålla den aktiva uppsättningen liten samtidigt som möjligheten till återkallning bevaras.

### När sammanfattning utlöses

| Utlösare                  | Tröskelvärde (standard) |
| ------------------------- | ----------------------- |
| Manuell utlösning via API | ej tillämpligt          |

### Vad som sammanfattas

Två startpunkter exporteras från `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — komprimerar
  minnena för en session till en enda sammanfattningstext som begränsas av en tokenbudget.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — den åldersbaserade
  komprimering som används av API:et: den väljer varje minne som är äldre än `days`, skapar
  ett komprimerat sammanfattningsminne från dem och tar bort originalen (när `dryRun` är
  `false`). Ange `dryRun: true` för att förhandsgranska kandidatuppsättningen och det totala
  antalet token utan att ändra något.

Det finns inget klustringssteg för taggar/nycklar eller någon poängsättning per minne av typen ”kärna kontra sammanfattningsbart” —
urvalet baseras enbart på åldersgränsen, och sammanfattningstexten består av en komprimerad,
typprefixerad rad per kandidat.

### Utlösa sammanfattning

Sammanfattning är **manuell / aktivt vald** — inställningen `autoSummarize` är
som standard `false`, så ingenting komprimeras automatiskt. Utlös den via API:et:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

För att låta den vara avstängd behåller du helt enkelt standardvärdet (`false`) för `autoSummarize`.

### Tips för sammanfattningskvalitet

- **Förhandsgranska först med `dryRun`** — `summarizeMemoriesOlderThan(..., true)` returnerar
  kandidatlistan och det totala antalet token så att du kan bekräfta vad som skulle slås samman
  innan originalen tas bort.
- **Kör sammanfattning under tider med låg trafik** om du har en stor minneskorpus — LLM-anropet är den långsamma delen

```bash
# Cron-format: sammanfatta dagligen klockan 03.00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Providermönster för MemoryBackend

> **Sanningskälla:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tester:** `src/lib/memory/__tests__/generic-backend.test.ts`

Providermönstret för MemoryBackend introducerar ett **utbytbart abstraktionslager för backend** ovanpå den befintliga minnesmotorn. I stället för att vara bundet till en enda lagringsimplementation stöder minnessystemet nu flera backend-system (SQLite, Obsidian, Notion och anpassade HTTP-backend-system) med konfigurerbar routning till primärt system och reservsystem.

### Arkitektur

```
┌──────────────────────────────────────────────────────────┐
│                    API-rutter                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│        Singleton-orkestrerare (manager.ts)                │
│                                                          │
│  Primär ───► Backend A  (t.ex. SQLite)                   │
│  Reserv ───► Backend B  (t.ex. Obsidian)                 │
│             Backend C  (t.ex. Notion via GenericBackend)  │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite-    │ │ Obsidian-  │ │ GenericMemory-   │
│ backend    │ │ backend    │ │ backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Kärngränssnitt (`backend.ts`)

Varje backend måste implementera gränssnittet `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Sökning
  search(config: SearchConfig): Promise<Memory[]>;

  // Hälsa
  health(): Promise<HealthCheckResult>;

  // Livscykel (valfritt)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-orkestrerare som:

- **Registrerar** backend-system via `register(backend)` — anropas vid start från `index.ts`
- **Konfigurerar** primärt system och reservsystem via `configure(primary, fallbacks)`
- **Routar** CRUD/sökning till det primära systemet, med en reservkedja vid fel
- **Hälsokontrollerar** alla backend-system regelbundet

**Reservbeteende:**

| Åtgärd   | Primärt system           | Reservsystem                       |
| -------- | ------------------------ | ---------------------------------- |
| `create` | ✅ Endast primärt system | ❌                                 |
| `get`    | ✅ Prova primärt först   | ✅ Reserv om resultatet är null    |
| `update` | ✅ Endast primärt system | ✅ Synkronisering utan att invänta |
| `delete` | ✅ Endast primärt system | ✅ Synkronisering utan att invänta |
| `list`   | ✅ Endast primärt system | ❌                                 |
| `search` | ✅ Primärt system först  | ✅ Reserv vid fel                  |

#### GenericMemoryBackend (`genericBackend.ts`)

En generell HTTP-anslutning som anpassar valfritt REST-API till en MemoryBackend. Användbar för:

- **Notion** — anslut via Notion API
- **Obsidian** — anslut via Obsidian Local REST API
- **Anpassade backend-system** — valfri tjänst som exponerar ett RESTful minnes-API

**Konfiguration:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Bas-URL för backend-API:t
  apiKey?: string;           // Bearer-token för autentisering
  headers?: Record<string, string>;  // Anpassade HTTP-rubriker
  timeout?: number;          // Tidsgräns för begäran (standard: 30000ms)
  backendType?: string;      // För loggning

  // Åsidosättningar av slutpunkter (standardvärden följer REST-konventioner)
  endpoints?: {
    search?: string;   // standard: "/memories/search"
    create?: string;   // standard: "/memories"
    list?: string;     // standard: "/memories"
    get?: string;      // standard: "/memories/{id}"
    update?: string;   // standard: "/memories/{id}"
    delete?: string;   // standard: "/memories/{id}"
    health?: string;   // standard: "/health"
  };

  // Mappningar av namn på frågeparametrar
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mappningar av namn på sökvägsparametrar
  pathParams?: {
    id?/memoryId?
  };
}
```

**Kända backends** är förkonfigurerade i `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend som pekar på localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend som pekar på api.notion.com/v1
```

#### Inbyggda backends

##### SQLiteBackend (`sqliteBackend.ts`)

Den primära backend som används som standard. Kapslar in det befintliga SQLite-baserade minneslagret med hjälp av `src/lib/memory/store.ts`. Registreras automatiskt vid start.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Kapslar in den befintliga Obsidian-integrationen (`src/lib/memory/obsidianBackend.ts`). Ansluter till ett Obsidian-valv via Obsidian Local REST API.

### Inställningar

Inställningar för minnesbackends lagras i tabellen för appinställningar och hanteras via `src/lib/memory/settings.ts`:

| Inställning            | Miljö-/konfigurationsnyckel | Standard   | Beskrivning                               |
| ---------------------- | --------------------------- | ---------- | ----------------------------------------- |
| Primär backend         | `memoryPrimaryBackend`      | `"sqlite"` | ID för den primära backenden              |
| Reservbackends         | `memoryFallbackBackends`    | `[]`       | Ordnad lista med reservbackend-ID:n       |
| Backendkonfigurationer | `memoryBackendConfigs`      | `{}`       | Konfigurationsåsidosättningar per backend |

Inställningarna normaliseras via `normalizeMemorySettings()` och cachelagras i `getMemorySettings()`.

### Initieringsflöde

```
Appstart
  → index.ts-importer (sidoeffekt): registrerar SQLiteBackend
  → initMemoryBackends() anropas från appens livscykel:
      1. Läs in inställningar (getMemorySettings)
      2. Konfigurera primär backend + reservbackends
      3. Initiera alla backends (hälsokontroll)
      4. Redo för begäranden
```

### Lägga till en ny backend

1. **Implementera gränssnittet `MemoryBackend`** i `src/lib/memory/<name>Backend.ts`
2. **Exportera** från `src/lib/memory/index.ts`
3. **Registrera** med `memoryManager.register(yourBackend)` vid start
4. **Konfigurera** via inställningarna: ange ditt backend-ID för `memoryPrimaryBackend`
5. **Testa** med `src/lib/memory/__tests__/generic-backend.test.ts` som referens

#### Exempel: Brain-backend

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Verifiering

#### Enhetstester

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Förväntat resultat: **35 tester, alla godkända**, som omfattar:

- Konstruktor (2)
- Hälsokontroll (4) — lyckat resultat, fel 500, nätverksfel, latens
- Initiering (2) — lyckat resultat, fel
- Skapa (2) — standardslutpunkt, anpassad slutpunkt
- Hämta (4) — lyckat resultat, 404 → null, andra fel än 404 utlöser undantag, anpassade sökvägsparametrar
- Uppdatera (2) — lyckat resultat, 404 → false
- Ta bort (2) — lyckat resultat, 404 → false
- Lista (2) — frågeparametrar, anpassade parameternamn
- Sökning (3) — frågeparametrar, anpassad slutpunkt, serialisering av alternativ
- Autentiseringsrubriker (2) — Bearer-token, anpassade rubriker
- Fabriksfunktion (1)

#### Typkontroll

```bash
npm run typecheck:core
```

Förväntat: **0 fel**.
