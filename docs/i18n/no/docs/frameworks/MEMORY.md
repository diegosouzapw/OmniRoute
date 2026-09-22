# Memory System (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sannhetskilde:** `src/lib/memory/` og `src/app/api/memory/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40 (deaktivert som standard + etterinnhenting med int8-kvantisering)

OmniRoute tilbyr vedvarende samtaleminne knyttet til API-nøkkel (og
eventuelt økt-ID). Minner trekkes automatisk ut fra LLM-svar
via enkel mønstergjenkjenning med regulære uttrykk og settes inn igjen i etterfølgende
forespørsler som en innledende systemmelding (eller den første brukermeldingen for leverandører som
avviser systemrollen).

> **Minne er AV som standard (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` er
> nå `false` (`src/lib/memory/settings.ts`). Aktivering av minne setter inn opptil
> `maxTokens` (~2k) med hentet kontekst i **hver** chatforespørsel, noe som
> faktureres — en overraskende kostnad for nye installasjoner og klienter som håndterer sin
> egen kontekst. Aktiver det eksplisitt under **Innstillinger → Minne** (`MemorySkillsTab`
> viser en advarsel om tokenkostnader når minne er aktivert).
> En klient kan velge bort minne for én enkelt forespørsel med
> forespørselshodet `x-omniroute-no-memory` (`true`/`1`/`yes`) — se tabellen over forespørselshoder i
> [API_REFERENCE.md](../reference/API_REFERENCE.md). En forespørsel uten minne setter
> `memoryOwnerId = null`, noe som deaktiverer **både** innsetting av minne og ferdigheter for
> den aktuelle forespørselen (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Minne er **avgrenset per API-nøkkel**, ikke per bruker — alle forespørsler som autentiseres
med samme API-nøkkel, deler den samme minnepoolen, med valgfri ytterligere
avgrensning etter `sessionId`.

## Arkitektur

```
Klient → /v1/chat/completions (apiKeyInfo løst oppstrøms)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # henter ut ID
    → getMemorySettings()                     # bufrede innstillinger
    → shouldInjectMemory(body, {enabled})     # kontrollpunkt
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + valgfri vektor
    → injectMemory(body, memories, provider)  # system- eller brukermelding
  → kall til oppstrømsleverandør
  → ved svar: extractFacts(text, apiKeyId, sessionId)  # ikke-blokkerende
    → setImmediate → createMemory(fact) per treff
                   → embed(content) + upsertVector(id, vec)
```

Kallstedene for innsetting og uttrekk er koblet inn i
`open-sse/handlers/chatCore.ts` (se etter `retrieveMemories`, `injectMemory`
og `extractFacts`).

## Motorarkitektur (3-nivåers valg)

Minnemotoren velger søkebanen under kjøring basert på tilgjengelig
infrastruktur og innstillinger. Det finnes tre nivåer, brukt i prioritert rekkefølge:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVÅ 0 — Nøkkelord (FTS5)                                  │
  │  Tilgjengelighet styrt av test: FTS5 når SQLite-bygget       │
  │  støtter det (better-sqlite3 / node:sqlite / bun:sqlite);    │
  │  utilgjengelig i bygg uten FTS5 (f.eks. sql.js/WASM —       │
  │  "no such module: fts5"). Brukes når strategy = "exact"     │
  │  eller som reserve; engine-status keyword gjenspeiler testen.│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVÅ 1 — Innebygd vektor (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 lastet via db.loadExtension().            │
  │  KNN-råstyrkesøk over Float32-vektorer. Aktivt når:          │
  │   • sqlite-vec loadExtension lykkes                          │
  │   • En innbyggingskilde er tilgjengelig (remote | static |  │
  │     transformers) og kan produsere en Float32Array           │
  │   • tabellen vec_memories finnes (opprettes ved første ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVÅ 2 — Qdrant (ekstern vektordatabase, må aktiveres)      │
  │  Når aktivert erstatter den sqlite-vec for semantic/hybrid.  │
  │  Krever en kjørende Qdrant-instans + konfigurert vert/port.  │
  └─────────────────────────────────────────────────────────────┘
```

Nedgradering skjer automatisk og transparent:

- Hvis sqlite-vec ikke kan lastes, er nivå 1 utilgjengelig → går tilbake til nivå 0.
- Hvis innbyggingskilden returnerer en feil, går nivå 1 tilbake til nivå 0.
- Hvis Qdrant ikke fungerer som den skal, går nivå 2 tilbake til nivå 1 (eller nivå 0 hvis nivå 1
  også er utilgjengelig).

## Kilder for embedding

Embedding-laget (`src/lib/memory/embedding/`) avgjør hvilken kilde som skal brukes
basert på `MemorySettingsExtended.embeddingSource`:

| Kilde          | Beskrivelse                                                                                     | Nøkkel kreves | Kaldstart        |
| -------------- | ----------------------------------------------------------------------------------------------- | ------------- | ---------------- |
| `remote`       | Bruker embedding-API-et til en konfigurert leverandør (OpenAI, Cohere osv.)                     | Ja            | Ingen            |
| `static`       | Lokal tabelloppslagsbasert embedding via `potion-base-8M` (WordPiece + gjennomsnittlig pooling) | Nei           | ~200ms           |
| `transformers` | Lokal ONNX-inferens via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                      | Nei           | ~3s + ~400MB RAM |
| `auto`         | Kjøretidsvalg: ekstern (hvis nøkkel finnes) → statisk → transformers → null                     | Avhenger      | Avhenger         |

**Valgrekkefølge for `auto`:**

1. Finn den første leverandøren i `listEmbeddingProviders()` med `hasKey === true` → `remote`.
2. Hvis `settings.staticEnabled === true` → `static`.
3. Hvis `settings.transformersEnabled === true` → `transformers`.
4. Ellers → `null` (går over til FTS5-nøkkelordsøk).

Embedding-hurtigbufferen (`src/lib/memory/embedding/cache.ts`) bruker et LRU-kart i minnet
med nøklene `${source}:${model}:${dim}:${sha256(text)}`, begrenset til
`MEMORY_EMBEDDING_CACHE_MAX` oppføringer (standardverdi 1000) med en TTL på
`MEMORY_EMBEDDING_CACHE_TTL_MS` (standardverdi 5 min). Den deles mellom alle kallere
gjennom hele prosessens levetid.

## Hybrid RRF (k=60)

Når `strategy = "hybrid"` og vektorlageret er tilgjengelig, bruker gjenfinningen
Reciprocal Rank Fusion til å slå sammen FTS5- og vektorresultater:

```
RRF(d) = Σ  1 / (k + rank_i(d))      der k = 60 (kan konfigureres via MEMORY_RRF_K)
          i
```

Konkret:

1. Kjør FTS5-søk → rangert liste `R_fts` (posisjon 1..N).
2. Kjør KNN-vektorsøk → rangert liste `R_vec` (posisjon 1..M).
3. For hver unike `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 hvis den ikke finnes i listen).
4. Sorter etter `rrf_score` synkende, og utfør deretter gjennomløpet med tokenbudsjettet.

RRF er kjent for å være effektivt uten at poengverdiene må normaliseres på tvers av
heterogene gjenfinningssystemer. Standardverdien `k=60` kommer fra den opprinnelige
artikkelen av Cormack et al. og fungerer godt for små korpus (<10k minner).

## Etterfylling (lat + ny indeksering)

Når embedding-modellen endres (oppdaget via `embedding_signature`), bygges
vektorlageret på nytt, og alle eksisterende minner merkes med
`needs_reindex = 1` i tabellen `memories`.

**Lat etterfylling**: Ved neste gjenfinning blir alle minner som mangler en vektoroppføring,
embedded og satt inn i `vec_memories` før søket kjøres. Dette fordeler kostnaden ved
etterfyllingen over reelle forespørsler uten å blokkere oppstarten.

**Eksplisitt ny indeksering**: Engine-fanen i `/dashboard/memory` har en
«Indekser på nytt nå»-knapp som kaller `POST /api/memory/reindex`. Behandleren kaller
`runReindexBatch()` fra `src/lib/memory/reindex.ts`, som behandler opptil
`limit` ventende oppføringer per forespørsel. Fremdriften kan hentes regelmessig via
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabellen `memory_vec_meta` (migrering `083_memory_vec.sql`) lagrer:

- `active_dim` — gjeldende vektordimensjon (null = ennå ikke kalibrert).
- `embedding_signature` — `${source}:${model}:${dim}` som brukes til å oppdage endringer.
- `last_reset_at` — tidsstempel for siste fullstendige tilbakestilling.
- `vec_loaded` — 0/1-flagg som angir om sqlite-vec ble lastet inn.

## Innstillingsutvidelse

Ni innebyggings- og vektorfelter er tilgjengelige i `MemorySettingsExtended` i
`src/shared/schemas/memory.ts`, og lagres via `src/lib/db/settings.ts`:

| Felt                     | Type                                               | Standardverdi | Beskrivelse                                                     |
| ------------------------ | -------------------------------------------------- | ------------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`      | Hvilken innebyggingskilde som skal brukes                       |
| `embeddingProviderModel` | `string \| null`                                   | `null`        | Leverandør/modell i formatet `provider/model`                   |
| `customBaseUrl`          | `string \| null`                                   | `null`        | Basis-URL for et OpenAI-kompatibelt endepunkt kun for Memory    |
| `customModelId`          | `string \| null`                                   | `null`        | Modell-ID sendt til det egendefinerte endepunktet               |
| `transformersEnabled`    | `boolean`                                          | `false`       | Aktivt tilvalg for Transformers.js (MiniLM, ~400MB)             |
| `staticEnabled`          | `boolean`                                          | `false`       | Aktivt tilvalg for den lokale statiske modellen potion-base-8M  |
| `rerankEnabled`          | `boolean`                                          | `false`       | Aktiver omrangeringstrinnet (legger til +200-500ms/forespørsel) |
| `rerankProviderModel`    | `string \| null`                                   | `null`        | Leverandør/modell for omrangering i formatet `provider/model`   |

`rerankProviderModel` løses av `POST /v1/rerank` (kalt via loopback), så det godtar alt denne ruten godtar: en kuratert omrangeringsmodell i skyen (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) eller en OpenAI-kompatibel leverandørnode som `<node-prefix>/<model>` (f.eks. `skilled-mini/bge-reranker-v2-m3` for en TEI/Infinity-instans). Loopback-noder er alltid kvalifisert; en node på en annen vert (LAN, Tailscale) krever i tillegg funksjonsflagget `RERANK_REMOTE_PROVIDER_NODES` og må bestå leverandørens policy for utgående URL-er — se [Funksjonsflagg](../reference/FEATURE_FLAGS.md). Velgeren i kontrollpanelet viser kuraterte leverandører samt lokale noder; enhver gyldig `provider/model`-streng kan angis direkte via `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Hvilken vektorbackend som skal brukes |

Disse eksponeres via `GET /PUT /api/settings/memory` (skjema `MemorySettingsExtendedSchema`).

For kilden `remote` godtar Memory også de valgfrie innstillingene `customBaseUrl` og
`customModelId`. Sammen velger de et OpenAI-kompatibelt `/embeddings`-endepunkt
og en modell uten å endre det globale innebyggingsregisteret. Endepunktet
normaliseres før bruk og kontrolleres av leverandørens policy for utgående URL-er: HTTP(S)
er påkrevd, innebygd påloggingsinformasjon og spørringsstrenger avvises, og adresser
for skymetadata forblir blokkert. Tomme verdier beholder den valgte registerleverandøren. Feil
som returneres til kontrollpanelet, renses, og påloggingsinformasjon for endepunktet logges aldri.

> **TODO (D20):** Omfanget `global` (deling av minner på tvers av alle API-nøkler) er ikke
> implementert i denne utgaven. Det krever skjemaendringer og en global innhentingsbane.
> Spor dette separat.

## Lagringslag

### Primært: SQLite (`memories`-tabellen)

Opprettes av migreringen `015_create_memories.sql`:

| Kolonne                     | Type               | Merknader                                                                      |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID generert via `crypto.randomUUID()`                                        |
| `api_key_id`                | `TEXT NOT NULL`    | Eierens API-nøkkel                                                             |
| `session_id`                | `TEXT`             | Valgfritt omfang per samtale                                                   |
| `type`                      | `TEXT NOT NULL`    | Én av `factual`, `episodic`, `procedural`, `semantic`                          |
| `key`                       | `TEXT`             | Stabil upsert-nøkkel, f.eks. `preference:i_prefer_python`                      |
| `content`                   | `TEXT NOT NULL`    | Den faktiske faktateksten                                                      |
| `metadata`                  | `TEXT`             | JSON-blob (kategori, extractedAt, kilde, ...)                                  |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601-strenger                                                              |
| `expires_at`                | `TEXT`             | Valgfritt utløpstidspunkt; `NULL` betyr permanent                              |
| `memory_id`                 | `INTEGER UNIQUE`   | Lagt til av `023_fix_memory_fts_uuid.sql` for å koble UUID-er ↔ FTS5-rad-ID-er |

Indekser: `api_key_id`, `session_id`, `type`, `expires_at`, samt den unike
`memory_id`-indeksen.

**Upsert-semantikk**: `createMemory()` ser etter en eksisterende rad med samme
`(api_key_id, key)` og oppdaterer den på stedet hvis den finnes (ved å slå sammen
`metadata` via grunn spredning). Dette hindrer at tabellen vokser ubegrenset ved
gjentatte preferanseutsagn.

### Fulltekstsøk (`memory_fts`-virtuell tabell)

`022_add_memory_fts5.sql` oppretter en virtuell FTS5-tabell over `content` og
`key`. `023_fix_memory_fts_uuid.sql` retter en feil fra praktisk bruk der
primærnøkkelen av typen UUID ikke kunne kobles til FTS5s heltallsbaserte rad-ID —
migreringen legger til kolonnen `memory_id`, oppretter FTS-tabellen på nytt og
kobler til triggere (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) som holder
FTS synkronisert ved INSERT, DELETE og UPDATE.

Brukes av `retrieval.ts` for strategiene `semantic` og `hybrid` (se nedenfor).
Gjenfinningskoden sikres med `hasTable("memory_fts")` og faller tilbake til
kronologisk rekkefølge hvis FTS-tabellen mangler eller FTS-spørringen utløser en
feil.

### Valgfritt: Qdrant (vektorlager på nivå 2)

`src/lib/memory/qdrant.ts` implementerer en valgfri Qdrant-integrasjon som
vektorlager på nivå 2. Gjenfinning rutes bare til Qdrant når motorvelgeren
`memoryVectorStore === "qdrant"` — standardverdien `"auto"` (og `"sqlite-vec"`)
velger **aldri** Qdrant. Bryteren i Engine-fanen angir **både** `qdrantEnabled` og
`memoryVectorStore` samtidig: aktivering gjør Qdrant til primærlageret, mens
deaktivering tilbakestiller til `"auto"` (#5597 — før denne rettelsen hadde
aktivering ingen effekt fordi ingenting skrev til motorvelgeren). Hvis Qdrant
ikke kan nås eller ikke returnerer noe, faller gjenfinningen tilbake til
sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — bygg inn `key + content` med den konfigurerte
  innebyggingsmodellen, sørg for at samlingen finnes (oppretter vektorer med
  cosinusavstand ved første bruk), og sett inn eller oppdater et punkt med nyttelast
  `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — bygg inn spørringen, søk i
  samlingen filtrert etter `kind = "omniroute_memory"` og eventuelt etter
  `apiKeyId` / `sessionId`. Begrenser `topK` til `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — sletting av ett enkelt punkt. Kalles av
  `deleteMemory()` etter at SQLite-raden er fjernet (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — masseslett punkter der
  `expiresAtUnix` er utløpt, eller der `createdAtUnix` er eldre enn
  oppbevaringsgrensen. Teller først, slik at kontrollpanelet kan vise faktiske tall.
- `checkQdrantHealth()` — `GET /readyz`-helsesjekk med latenstid.

Innstillingsgrensesnittet viser Qdrant-konfigurasjon, helsesjekk, test av semantisk søk
og opprydding i **Engine-fanen** på `/dashboard/memory`. De tilhørende
rutene under `src/app/api/settings/qdrant/` er alle koblet opp fra og med v3.8.6:

| Rute                                    | Metode        | Beskrivelse                            |
| --------------------------------------- | ------------- | -------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Les / oppdater Qdrant-innstillinger    |
| `/api/settings/qdrant/health`           | `GET`         | Tilgjengelighetssjekk + latenstid      |
| `/api/settings/qdrant/search`           | `POST`        | Test av semantisk søk                  |
| `/api/settings/qdrant/cleanup`          | `POST`        | Fjern utløpte / gamle punkter          |
| `/api/settings/qdrant/embedding-models` | `GET`         | Vis tilgjengelige innebyggingsmodeller |

**Merknader om virkemåte (hva du kan forvente):**

- **Valg av motor** — aktivering av Qdrant i Engine-fanen gjør den til det primære
  lageret (setter `memoryVectorStore="qdrant"`); deaktivering tilbakestiller til `"auto"` (#5597).
- **Ingen etterfylling** — bare minner som opprettes/oppdateres **etter** at Qdrant er
  aktivert, skrives dit (dobbeltskriving uten å vente på resultatet). Eksisterende SQLite-minner
  migreres **ikke**; «Reindex Now» bygger bare sqlite-vec-indeksen på nytt, ikke Qdrant.
- **Vektordimensjonen oppdages automatisk** fra den faktiske innebyggingen ved første bruk — det
  finnes ikke noe dimensjonsfelt som må fylles ut. Endring av innebyggingsmodellen etter at en samling
  er opprettet, håndteres **ikke** automatisk: den eksisterende samlingen forblir uendret, og skrivinger/søk
  med dimensjonsavvik mislykkes og faller tilbake på sqlite-vec. Opprett samlingen på nytt
  (nytt navn, eller slett den i Qdrant) for å bytte innebyggingsmodell.
- **Avstandsmål** — alltid **Cosine** (hardkodet ved opprettelse av samlingen; kan ikke
  konfigureres).
- **Autentisering** — bare API-nøkkel (sendes som `api-key`-headeren; valgfritt for lokal
  Docker uten autentisering). JWT/RBAC brukes ikke.
- **Konfigurasjonsfelt** — grensesnittet viser `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` er bare tilgjengelige via miljø/DB, og `vectorSize`
  brukes ikke ved opprettelse av samlingen (dimensjonen kommer fra innebyggingen).

### Vektorkvantisering (int8 — valgfritt, begge motorer)

Begge vektormotorene støtter **valgfri int8-kvantisering** for å redusere minneavtrykket
til lagrede vektorer (~4× mindre enn Float32), mot en liten kostnad i gjenfinningsgrad.
Standardverdien er **av** for begge — vektorene beholder full presisjon med mindre funksjonen
aktiveres eksplisitt.

| Motor      | Innstilling                       | Type                           | Standard | Hvor den leses                                              |
| ---------- | --------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB-nøkkel)  | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (miljø) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** konfigureres per instans via innstillingsnøkkelen `qdrantQuantization`
  (vist som feltet `quantization` på `PUT /api/settings/qdrant`). Når verdien er
  `"int8"`, ber `buildQuantizationConfig()` om skalarkvantisering
  (`always_ram`, kvantil `0.99`), og søk aktiverer `rescore: true`, slik at
  vektorene med full presisjon finjusterer int8-kandidatsettet.
- **sqlite-vec**-kvantisering er **bare tilgjengelig via miljøvariabler** (ikke en DB-innstilling): angi
  `MEMORY_VEC_QUANTIZATION=int8` for å lagre de lokale vektorene som en `int8[dim]`-
  kolonne via `vec_quantize_int8(?, 'unit')`. Den valgte modusen inkluderes i
  `embedding_signature` (et `:int8`-suffiks), slik at bytte av modus utløser full
  nyindeksering av `vec_memories`-tabellen — den samme banen for lat etterfylling som brukes når
  innebyggingsmodellen endres.

## Minnetyper

`MemoryType` (`src/lib/memory/types.ts`):

| Type         | Brukes til                                                                    |
| ------------ | ----------------------------------------------------------------------------- |
| `factual`    | Preferanser, stabile brukeropplysninger, atferdsmønstre                       |
| `episodic`   | Beslutninger knyttet til et bestemt tidspunkt ("I chose Postgres")            |
| `procedural` | Arbeidsflyt-/fremgangsmåteminne (reservert; ingen automatisk uttrekker i dag) |
| `semantic`   | Reservert for oppføringer i vektorlageret                                     |

Hentestrategien for `MemoryConfig` er én av `exact`, `semantic` eller `hybrid`,
og omfanget er ett av `session`, `apiKey` eller `global`. Standardomfanget fra
`getMemorySettings()` er `apiKey`.

## Faktauttrekking (`extraction.ts`)

Uttrekkingen er **regex-basert**, ikke LLM-basert — den kjører i samme prosess med
`setImmediate()`, slik at den aldri blokkerer svarstrømmen:

- **Preferansemønstre** → `MemoryType.FACTUAL`
  (f.eks. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Beslutningsmønstre** → `MemoryType.EPISODIC`
  (f.eks. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Atferdsmønstre** → `MemoryType.FACTUAL`
  (f.eks. `I usually …`, `I always …`, `I tend to …`)

Hvert treff renses (`trim`, sammentrekking av blanktegn, begrenset til 500 tegn),
duplikatfjernes i samme gruppe via en stabil `factKey(category, content)` og
lagres via `createMemory()` med metadataene
`{category, extractedAt, source: "llm_response"}`. Inndatateksten er begrenset til
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — når teksten er lengre, brukes **slutten**
av teksten, slik at det nyeste assistentinnholdet alltid tas med.

`extractFactsFromText(text)` eksporteres for tester og returnerer de strukturerte
faktaene uten å lagre dem.

## Henting (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` er hovedinngangspunktet. Den:

1. Normaliserer og validerer konfigurasjonen gjennom `MemoryConfigSchema`.
2. Returnerer `[]` umiddelbart når `enabled` er false eller `maxTokens <= 0`.
3. Begrenser `maxTokens` til `[1, 8000]`.
4. Oppdager om den moderne `memories`-tabellen finnes (i motsetning til den eldre
   `memory`-tabellen), slik at eldre databaser fortsetter å fungere.
5. Bygger basisspørringen med utløpskontroll
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), valgfritt
   øktomfang og valgfri grense basert på `retentionDays`.
6. Forgrener seg basert på strategi:
   - **`exact`** (standard): kronologisk `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: hvis `config.query` er angitt og `memory_fts` finnes, brukes
     `memory_fts MATCH ?` med JOIN, og resultatet sorteres etter FTS-rangering;
     faller tilbake til kronologisk rekkefølge når FTS returnerer 0 rader.
   - **`hybrid`**: union av FTS-resultater (høyere relevans) og det
     kronologiske settet, duplikatfjernet etter id.
7. Beregner en relevanspoengsum basert på nøkkelord (`getRelevanceScore`) for
   `content`, `key` og `metadata`-JSON når en spørring er angitt. Rader med
   poengsummen null filtreres bort.
8. Sorterer etter synkende poengsum og deretter synkende `createdAt`.
9. Går gjennom den rangerte listen og godtar oppføringer så lenge en løpende
   `estimateTokens(content)` (≈ `length / 4`) holder seg innenfor budsjettet. Den
   returnerer alltid minst én oppføring når det finnes treff.

`estimateTokens` eksporteres og brukes av henting, oppsummering og MCP-verktøyet
`omniroute_memory_search`.

## Injisering (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Slår sammen alt minneinnhold til én enkelt `Memory context: …`-streng.
2. Velger en strategi basert på leverandørnavnet:
   - **Systemmelding** (standard for OpenAI, Anthropic, Gemini, …) — legger til
     en `{role: "system", content: memoryText}` foran eventuelle eksisterende
     systemmeldinger, slik at brukerens systemmeldinger fortsatt har forrang.
   - **Brukermelding** (reserveløsning) — for leverandører i
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Disse avviser systemrollen
     og ville ellers returnert 400 (jf. sak #1701 for GLM/Zhipu).
3. Logger antallet, strategien og modellen under `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` eksporteres for kallere som må ta
egne rutingsbeslutninger. Ukjente leverandører bruker som standard `true`
(systemrollen er tillatt) for sikkerhets skyld.

## Innstillinger (`settings.ts`)

Minnekonfigurasjonen **lagres i innstillingstabellen i databasen**, ikke i miljøvariabler.
`getMemorySettings()` leser fra `getSettings()` og mellomlagrer resultatet
i prosessen. `invalidateMemorySettingsCache()` kalles av PUT-ruten for innstillinger
etter skriving.

### Eldre felt (alle versjoner)

| DB-nøkkel             | Type    | Standard                                          | UI-kontroll                                            |
| --------------------- | ------- | ------------------------------------------------- | ------------------------------------------------------ |
| `memoryEnabled`       | boolsk  | `false` (av som standard siden v3.8.30)           | Minne av/på                                            |
| `memoryMaxTokens`     | heltall | `2000` (område `0–16000`)                         | Tokenbudsjett for injisering                           |
| `memoryRetentionDays` | heltall | `30` (område `1–365`)                             | Oppbevaringsperiode                                    |
| `memoryStrategy`      | enum    | `"hybrid"` (én av `recent`, `semantic`, `hybrid`) | Hentestrategi                                          |
| `skillsEnabled`       | boolsk  | `false`                                           | Slår på ferdighetsinjisering per nøkkel (se SKILLS.md) |

Merk: UI-strategien `"recent"` tilordnes den interne hentestrategien `"exact"`
via `toMemoryRetrievalConfig()` (kronologisk rekkefølge).

### Nye felt (v3.8.6, plan 21 D9)

Se også delen «Utvidelse av innstillinger» ovenfor for feltbeskrivelser.

| DB-nøkkel                   | API-felt                 | Standard |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-relaterte DB-nøkler (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` med standardverdien `"omniroute_memory"`,
`qdrantEmbeddingModel` med standardverdien `"openai/text-embedding-3-small"`) leses av
`normalizeQdrantConfig()` i `qdrant.ts`.

### Miljøvariabler (v3.8.6)

Seks valgfrie miljøvariabler finjusterer motorens kjøreatferd (dokumentert i `.env.example`):

| Variabel                        | Standard                   | Beskrivelse                                                                                                                                       |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL for mellomlageret for embeddinger (5 min)                                                                                                     |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maksimalt antall oppføringer i LRU-mellomlageret for embeddinger                                                                                  |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF-repo for Transformers.js-modellen                                                                                                              |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF-repo for den statiske potion-modellen                                                                                                          |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Hvor nedlastede modeller skal lagres                                                                                                              |
| `MEMORY_VEC_TOP_K`              | `20`                       | Standard top-K for vektorsøk                                                                                                                      |
| `MEMORY_RRF_K`                  | `60`                       | RRF-k-konstant for hybridsøk                                                                                                                      |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Sett til `int8` for å lagre lokale sqlite-vec-vektorer kvantisert (~4× mindre; må velges aktivt). Endring av modus fremtvinger en ny indeksering. |

## Oppsummering (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` komprimerer eldre
innhold når det løpende totale antallet tokener i minnene til en nøkkel
overskrider budsjettet. Den itererer gjennom radene synkende etter `created_at`,
beholder radene som får plass, og erstatter `content` direkte for resten med de
tre første setningene i originalen. `tokensSaved` er differansen i
`estimateTokens` mellom gammelt og nytt innhold.

Denne rutinen er **tilgjengelig, men kalles ikke automatisk** i den nåværende
chatflyten — kall den fra en cron-jobb, en administratorhandling eller
`MemoryConfig.autoSummarize`-integrasjon hvis du trenger kontinuerlig
komprimering. Datatapet er irreversibelt: originalteksten overskrives.

## REST-API

Alle endepunkter krever administrasjonsautentisering (`requireManagementAuth`).

### Sentrale minneendepunkter (eksisterende + oppdaterte)

| Metode   | Bane                 | Beskrivelse                                                                                                                                                                                                 |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Paginert liste med filtre: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Responsen inkluderer `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                           |
| `POST`   | `/api/memory`        | Opprett oppføring (Zod-validert: `content`, `key`, valgfrie `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Kaller `createMemory()`, som oppdaterer eller setter inn basert på `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Hent én enkelt oppføring etter UUID                                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | Oppdater oppføringsfelt (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Synkroniserer også vektoren hvis en kilde for embedding er tilgjengelig.                                     |
| `DELETE` | `/api/memory/[id]`   | Slett en oppføring; sletter også fra `vec_memories` (D15) og Qdrant etter beste evne. Returnerer 404 hvis den mangler.                                                                                      |
| `GET`    | `/api/memory/health` | Kjører `verifyExtractionPipeline("health-check")` — opprett→list→slett tur-retur. Returnerer `{working, latencyMs, error?}`                                                                                 |

### Nye endepunkter for minnemotoren (plan 21)

| Metode | Bane                              | Beskrivelse                                                                                                                                                                           |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Prøvekjøring av `retrieveMemories` — returnerer rangerte resultater med poengsum, nivå og tokener. Body: `RetrievePreviewSchema`. Injiserer eller endrer IKKE minner.                 |
| `GET`  | `/api/memory/embedding-providers` | Viser leverandører med embedding-modeller og angir hvilke som har en konfigurert API-nøkkel.                                                                                          |
| `GET`  | `/api/memory/engine-status`       | Returnerer full motorstatus: nøkkelordnivå, embedding-oppløsning, statistikk for vektorlager, Qdrant-tilstand og konfigurasjon for omrangering. Struktur: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Utløs minnekomprimering manuelt. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Returnerer `{candidates, tokensSaved}`.                                      |
| `POST` | `/api/memory/reindex`             | Utløs ny vektorindeksering for minner med `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Returnerer `{started, pending}`.                                                  |

### Innstillingsendepunkter

| Metode | Bane                                    | Beskrivelse                                                                                                |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Gjeldende normaliserte `MemorySettingsExtended` (7 nye felt + eldre felt)                                  |
| `PUT`  | `/api/settings/memory`                  | Oppdater et hvilket som helst felt fra `MemorySettingsExtendedSchema` (totalt 12 felt)                     |
| `GET`  | `/api/settings/qdrant`                  | Gjeldende Qdrant-innstillinger (`QdrantSettingsSchema`)                                                    |
| `PUT`  | `/api/settings/qdrant`                  | Oppdater Qdrant-innstillinger. Body: `QdrantSettingsUpdateSchema`. `apiKey` = tom streng fjerner nøkkelen. |
| `GET`  | `/api/settings/qdrant/health`           | Tilgjengelighetssjekk mot den konfigurerte Qdrant-instansen. Returnerer `QdrantHealthResultSchema`.        |
| `POST` | `/api/settings/qdrant/search`           | Test av semantisk søk mot Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                            |
| `POST` | `/api/settings/qdrant/cleanup`          | Fjern Qdrant-punkter for utløpte/gamle minner.                                                             |
| `GET`  | `/api/settings/qdrant/embedding-models` | Vis embedding-modeller som er tilgjengelige for Qdrant.                                                    |

Listespørringen `/api/memory` støtter enten `page`-basert paginering
(`parsePaginationParams`) **eller** rå `offset` — når `offset` er angitt,
har den forrang, og en avledet `page` beregnes for responsstrukturen.

## MCP-verktøy (`open-sse/mcp-server/tools/memoryTools.ts`)

Når MCP-serveren er aktivert, registreres tre minneverktøy:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → kapsler inn `retrieveMemories()`. Fra og med v3.8.6 (D16) leses `strategy`
  fra `getMemorySettings()` i stedet for å være hardkodet til `"exact"`. Hvis
  `query` er angitt og `strategy` er `semantic` eller `hybrid`, brukes
  vektorlageret når det er tilgjengelig.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → kapsler inn `createMemory()`. Godtar bare de fire kanoniske typene:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → lister samsvarende
  oppføringer, filtrerer eventuelt etter tidsstempel for opprettelse før en gitt dato, og sletter deretter hver
  via `deleteMemory()` (som også fjerner vektorer fra sqlite-vec + Qdrant).

Se [MCP-SERVER.md](./MCP-SERVER.md) for detaljer om transport og omfang.

## Kontrollpanel (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` er nå et **Studio med 3 faner**:

### Fane: Minner

- Konseptkort (sammenleggbar forklaring av «Slik fungerer det»).
- Sanntidsliste, søk og paginering (300 ms forsinkelse).
- Typefilter (`factual` / `episodic` / `procedural` / `semantic` / alle).
- Dialogvindu for å legge til minne (nøkkel, innhold, type).
- Innebygd redigering (blyantknapp → `PUT /api/memory/[id]`).
- Sletting per rad (med bekreftelsesdialog).
- JSON-eksport av gjeldende side; JSON-import via filvelger.
- Statistikkort: `totalEntries`, `tokensUsed`, `hitRate`.
- «Komprimer gamle»-knapp → `POST /api/memory/summarize` (prøvekjøring viser først
  antall kandidater og ber deretter om bekreftelse).
- En grønn/rød helsestatusindikator drevet av `GET /api/memory/health`.

### Fane: Testområde

- Spørringsfelt + strategivelger (Eksakt / Semantisk / Hybrid) + tokenbudsjett.
- «Simuler» → `POST /api/memory/retrieve-preview` — viser rangerte resultater med
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Løsningspanel som viser hvilken kilde for innebygginger / hvilket vektorlager som ble brukt, og
  om det ble brukt en reserveløsning.

### Fane: Motor

- Statuspanel for motoren (brikke for nøkkelord-FTS5, brikke for innebygginger, brikke for vektorlager,
  brikke for Qdrant-status, brikke for omrangering).
- «Indekser på nytt nå»-knapp → `POST /api/memory/reindex`.
- Velger for innebyggingskilde (auto / ekstern / statisk / transformers + brytere).
- Qdrant-konfigurasjonskort (aktiveringsbryter, vert/port/samling/nøkkel, test av tilkobling,
  test av semantisk søk, opprydding).
- Konfigurasjonskort for omrangering (aktiveringsbryter, leverandør-/modellvelger).

Innstillinger for minne og Qdrant finnes også under
`/dashboard/settings → Minne og ferdigheter` (`MemorySkillsTab.tsx`) for
den eldre/globale innstillingsflaten.

## Hurtigbufring

`src/lib/memory/store.ts` har en LRU-lignende hurtigbuffer i prosessen
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, med fjerning av de 20 %
eldste oppføringene) for lesinger med `getMemory(id)`, i tillegg til et generisk nøkkel/verdi-basert
`memoryCache`-lag (`src/lib/memory/cache.ts`) med metodene `get`/`set`/`invalidate`,
som brukes av kallere som ønsker sin egen avgrensede hurtigbuffer (LRU med 1 000 oppføringer,
standard TTL på 5 min).

## Personvern og livssyklus

- Eierskapet til minner bestemmes av API-nøkkel-ID-en (`resolveMemoryOwnerId` i
  `chatCore.ts`). Uten en `apiKeyInfo.id` kjøres verken gjenfinning, injisering
  eller uttrekking.
- Oppføringer med en fremtidig `expires_at` filtreres bort fra gjenfinningen;
  gamle oppføringer utover `retentionDays` ekskluderes av
  `created_at >= cutoff`-klausulen i `retrieveMemories`.
- For permanent sletting bruker du `DELETE /api/memory/[id]` eller `omniroute_memory_clear`.
- Uttrekking kjøres uten å vente på resultatet via `setImmediate`; feil logges under
  `memory.extraction.background.failed` og vises aldri til den som kaller.
- Verifiseringsrundturer (`verifyExtractionPipeline`) rydder opp i sine egne
  testoppføringer i en `finally`-blokk.

## Se også

- [SKILLS.md](./SKILLS.md) — innstillingen `skillsEnabled` injiserer
  verktøydefinisjoner sammen med minner.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-transport / omfang.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — bredere API-grensesnitt.
- Kildemoduler:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — innbyggingslag med flere kilder
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-skjemaer for alle forespørselskropper i minne-API-et
  - `src/shared/schemas/qdrant.ts` — Zod-skjemaer for Qdrant-innstillinger/-operasjoner
  - `src/lib/db/memoryVec.ts` — CRUD for `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + underruter
  - `src/app/(dashboard)/dashboard/memory/` — Studio-brukergrensesnitt (side + komponenter +
    faner + hooks)
  - `open-sse/handlers/chatCore.ts` (kobling for injisering / uttrekking)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Valg av innbyggingsleverandør (v3.8.16+)

OmniRoutes minnemotor støtter **fire innbyggingskilder** (`src/lib/memory/embedding/`). Hver av dem har ulike avveininger når det gjelder **ventetid, kostnad, modellkvalitet og konfigurasjonskompleksitet**.

### Innbyggingskildene

| Leverandør       | Kilde                                               | Ventetid                          | Kostnad              | Kvalitet                                | Oppsett                           |
| ---------------- | --------------------------------------------------- | --------------------------------- | -------------------- | --------------------------------------- | --------------------------------- |
| `transformers`   | Lokal ONNX-modell (Xenova/all-MiniLM-L6-v2)         | ~50-150ms (CPU)                   | Gratis               | God                                     | Kun `npm install`                 |
| `static`         | Forhåndsberegnede vektorer (bufret)                 | <1ms                              | Gratis               | Ikke relevant (avhenger av buffertreff) | Ingen                             |
| `remote`         | OpenAI- / Cohere- / Voyage-API                      | ~100-300ms                        | $0.02-0.10/1M tokens | Utmerket                                | API-nøkkel                        |
| `auto`           | Velger den beste tilgjengelige kilden under kjøring | Samme som valgt kilde             | Gratis               | Samme som valgt kilde                   | Ingen                             |
| _(hurtigbuffer)_ | LRU-lag i minnet over enhver kilde                  | <1ms (treff), full ventetid (bom) | Gratis               | Samme som underliggende kilde           | Alltid på (ikke en valgbar kilde) |

### Beslutningstre

```
                  Hva er distribusjonskonteksten din?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 UTV./TEST    LITEN PROD.   STOR PROD.   KANT / FRAKOBLET
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, uten API)         (best kvalitet)  (uten internett)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Legg ALLTID til `cache`-laget øverst
            (LruCache omslutter enhver leverandør)
```

### Database- og API-konfigurasjon

Alternativer for minneinnbygging konfigureres via API-et/brukergrensesnittet for innstillinger, ikke miljøvariabler. De relevante innstillingsnøklene i databasen under Innstillinger (`normalizeMemorySettings` i `src/lib/memory/settings.ts`) er:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (API-basert, f.eks. OpenAI), `"static"` (eksternt lager) eller `"auto"`
- `memoryEmbeddingProviderModel`: Modellidentifikator for eksterne/statiske kilder (f.eks. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` eller `"auto"`

#### Lokal modell (`transformers`)

Bruker transformers.js internt til å kjøre lokale modeller:

```bash
# Miljøvariabler som leses i koden (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-modellregister
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statisk HF Potion-modell
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Hurtigbufferkatalog
```

#### LRU-hurtigbuffer for innbygginger

Hurtigbufferen er alltid på som standard og konfigureres via miljøvariabler:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maksimalt antall bufrede elementer
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Ytelsestall

Ytelsestest på en typisk 4-kjerners x86-server (tekster på ~100 tokener hver):

| Leverandør           | p50   | p95   | p99   | Kostnad / 1M embeddings            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratis                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Avhenger av Qdrant-hosting         |
| `cache` (treff)      | <1ms  | <1ms  | 2ms   | Gratis                             |

---

## Mønstre for faktauttrekking (v3.8.16+)

Modulen `extraction.ts` (`src/lib/memory/extraction.ts`) bruker **mønstergjenkjenning med regulære uttrykk** for å trekke ut strukturerte fakta fra samtalemeldinger. Når du forstår disse mønstrene, kan du finjustere kvaliteten på uttrekkingen for ditt bruksområde.

### Standardkategorier for mønstre

| Kategori            | Eksempelmønster                                                            | Fanger opp                      |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------- |
| PREFERENCE_PATTERNS | `"Jeg foretrekker <X>"`, `"Jeg liker <X>"`, `"Jeg hater <X>"`              | Brukerpreferanser               |
| DECISION_PATTERNS   | `"Jeg skal bruke <X>"`, `"Jeg bestemte meg for å <X>"`, `"Jeg valgte <X>"` | Brukerbeslutninger (episodiske) |
| PATTERN_PATTERNS    | `"Jeg pleier å <X>"`, `"Jeg gjør alltid <X>"`, `"Jeg gjør aldri <X>"`      | Vedvarende atferdsmønstre       |

### Eksempelmønstre (forenklet)

```ts
// Fra src/lib/memory/extraction.ts
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

### Hva som trekkes ut

Når en bruker sier:

> "Jeg foretrekker TypeScript. Jeg skal bruke Postgres til dette prosjektet. Jeg committer alltid før jeg pusher. Jeg liker ikke Python."
> Uttrekkingen produserer 4 minner:
>
> | Nøkkel                               | Kategori   | Type     | Innhold                         |
> | ------------------------------------ | ---------- | -------- | ------------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                    |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for dette prosjektet" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit før pushing"            |
> | `preference:python`                  | preference | factual  | "Python"                        |

### Begrensninger for uttrekking

For å forhindre ukontrollert uttrekking gjelder følgende grenser:

| Minste innholdslengde | 3 tegn |
| Største innholdslengde | 500 tegn |

### Når uttrekking bør deaktiveres

Uttrekking kjøres automatisk når minne er aktivert. Det finnes ingen egen
bryter kun for uttrekking. Hvis du vil slå det av, må du deaktivere minne helt (`enabled: false`
via `PUT /api/settings/memory`). Vurder å gjøre dette når:

- Du har et høyt meldingsvolum og kostnaden ved uttrekking ikke er ubetydelig
- Samtalene dine stort sett er midlertidige (chat, feilsøking) uten langsiktig verdi
- Du allerede registrerer kontekst via egendefinerte programtillegg

---

## Finjustering av hybrid RRF (v3.8.16+)

Algoritmen **Reciprocal Rank Fusion (RRF)** kombinerer resultater fra FTS5 (nøkkelord) og vektorsøk (semantikk). Parameteren `k` styrer hvor mye vekt resultater med lavere rangering får.

### Formelen

For hvert kandidatminne er RRF-poengsummen:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Der:

- `k` er konstanten (standardverdien er 60)
- `rank_i(d)` er rangeringen til dokument `d` i det i-te gjenfinningssystemet (FTS, vektor)
- Summen beregnes på tvers av alle gjenfinningssystemene

### Hvordan `k` påvirker resultatene

| `k`-verdi             | Effekt                                                                               | Passer best for                                 |
| --------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `k=0`                 | Ren rangfletting (ingen utjevning)                                                   | Teoretisk referansepunkt                        |
| `k=10-30`             | Vekter toppresultatene tungt; lave rangeringer bidrar knapt                          | Når de 3 beste resultatene vanligvis er riktige |
| **`k=60`** (standard) | Balansert — de 10 beste resultatene bidrar alle i betydelig grad                     | Generell gjenfinning                            |
| `k=100+`              | Flatere — selv lavt rangerte resultater kan dominere hvis de finnes i flere systemer | Når gjenfinning > presisjon er avgjørende       |

### Praktisk finjustering av `k`

```bash
# Standardverdi
MEMORY_RRF_K=60

# Aggressiv presisjon (lite minne, få dokumenter)
MEMORY_RRF_K=20

# Maksimal gjenfinning (stort minne, varierte spørringer)
MEMORY_RRF_K=120
```

**Eksempel med `k=20`:**

- FTS-rangering 1 → bidrag `1/21 = 0.048`
- FTS-rangering 10 → bidrag `1/30 = 0.033`
- Vektorrangering 1 → bidrag `0.048`
- Samlet maksimum: `0.096`

**Eksempel med `k=60`:**

- FTS-rangering 1 → bidrag `1/61 = 0.016`
- FTS-rangering 10 → bidrag `1/70 = 0.014`
- Vektorrangering 1 → bidrag `0.016`
- Samlet maksimum: `0.033`

Med en høyere `k` blir den **relative forskjellen** mellom førsteplassen og tiendeplassen mindre, slik at algoritmen baserer seg mer på **enighet på tvers av gjenfinningssystemer** enn på tilliten til topprangeringen.

### Når `k` bør endres

| Symptom                                                  | Prøv                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| Toppresultatet vinner alltid, men det er feil            | **Lavere** k (f.eks. 20) — tilliten til topprangeringen betyr mer   |
| Riktig svar er blant de 5 beste, men ikke på førsteplass | **Høyere** k (f.eks. 100) — flatere poengberegning belønner enighet |
| Gjenfinningen er høy, men presisjonen er lav             | **Lavere** k — gjør rangeringen skarpere                            |
| Gjenfinningen er lav (relevante dokumenter mangler)      | **Høyere** k — gi lavere rangerte dokumenter en sjanse              |

### RRF-vekting

Reciprocal Rank Fusion bruker lik vekting for semantisk vektorrangering og rangering fra fulltekstsøk:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Det finnes ingen miljøvariabler for å justere individuelle vekter (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` finnes ikke).

---

## Oppsummeringsstrategi (v3.8.16+)

Modulen `summarization.ts` (`src/lib/memory/summarization.ts`) komprimerer eldre minner for å holde det aktive settet lite samtidig som gjenfinningsevnen bevares.

### Når oppsummering utløses

| Utløser                   | Terskel (standard) |
| ------------------------- | ------------------ |
| Manuell utløsning via API | ikke relevant      |

### Hva som oppsummeres

To inngangspunkter eksporteres fra `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — kondenserer
  minnene for en økt til én enkelt oppsummeringstekst avgrenset av et tokenbudsjett.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — den aldersbaserte
  komprimeringen som brukes av API-et: Den velger alle minner som er eldre enn `days`, bygger
  ett kondensert oppsummeringsminne fra dem og sletter originalene (når `dryRun` er `false`).
  Bruk `dryRun: true` for å forhåndsvise kandidatsettet og det totale antallet tokener
  uten å endre noe.

Det finnes ingen grupperingsrunde basert på tagger/nøkler eller vurdering av «kjerne kontra oppsummerbart» per minne —
utvalget er utelukkende basert på aldersgrensen, og oppsummeringsteksten består av én kondensert,
typeprefikset linje per kandidat.

### Utløsing av oppsummering

Oppsummering er **manuell / valgfri** — innstillingen `autoSummarize` er `false` som
standard, så ingenting komprimeres automatisk. Utløs den via API-et:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

For å la den være deaktivert beholder du ganske enkelt standardverdien (`false`) for `autoSummarize`.

### Tips for god oppsummeringskvalitet

- **Forhåndsvis først med `dryRun`** — `summarizeMemoriesOlderThan(..., true)` returnerer
  kandidatlisten og det totale antallet tokener, slik at du kan bekrefte hva som vil bli slått sammen
  før originalene slettes.
- **Kjør oppsummering i perioder med lav trafikk** hvis du har en stor minnesamling — LLM-kallet er den langsomme delen

```bash
# Cron-stil: Oppsummer daglig kl. 03.00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Leverandørmønsteret MemoryBackend

> **Sannhetskilde:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tester:** `src/lib/memory/__tests__/generic-backend.test.ts`

Leverandørmønsteret MemoryBackend introduserer et **utskiftbart abstraksjonslag for bakend** over den eksisterende minnemotoren. I stedet for å være bundet til én enkelt lagringsimplementasjon støtter minnesystemet nå flere bakender (SQLite, Obsidian, Notion og egendefinerte HTTP-bakender) med konfigurerbar ruting til primær- og reserveløsninger.

### Arkitektur

```
┌──────────────────────────────────────────────────────────┐
│                    API-ruter                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Singleton-orkestrator (manager.ts)              │
│                                                          │
│  Primær ───► Bakend A  (f.eks. SQLite)                   │
│  Reserve ──► Bakend B  (f.eks. Obsidian)                 │
│              Bakend C  (f.eks. Notion via GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite-    │ │ Obsidian-  │ │ GenericMemory-   │
│ bakend     │ │ bakend     │ │ bakend (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Kjernegrensesnitt (`backend.ts`)

Hver bakend må implementere grensesnittet `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD-operasjoner
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Søk
  search(config: SearchConfig): Promise<Memory[]>;

  // Tilstand
  health(): Promise<HealthCheckResult>;

  // Livssyklus (valgfritt)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-orkestrator som:

- **Registrerer** bakender via `register(backend)` — kalles ved oppstart fra `index.ts`
- **Konfigurerer** primær- og reserveløsninger via `configure(primary, fallbacks)`
- **Ruter** CRUD-operasjoner/søk til primærløsningen, med en reservekjede ved feil
- **Kontrollerer tilstanden** til alle bakender regelmessig

**Reserveatferd:**

| Operasjon | Primær               | Reserveløsninger           |
| --------- | -------------------- | -------------------------- |
| `create`  | ✅ Kun primær        | ❌                         |
| `get`     | ✅ Prøv primær først | ✅ Reserve hvis null       |
| `update`  | ✅ Kun primær        | ✅ Asynkron synkronisering |
| `delete`  | ✅ Kun primær        | ✅ Asynkron synkronisering |
| `list`    | ✅ Kun primær        | ❌                         |
| `search`  | ✅ Primær først      | ✅ Reserve ved feil        |

#### GenericMemoryBackend (`genericBackend.ts`)

En generell HTTP-kobling som tilpasser ethvert REST-API til en MemoryBackend. Nyttig for:

- **Notion** — koble til via Notion API
- **Obsidian** — koble til via Obsidian Local REST API
- **Egendefinerte bakender** — enhver tjeneste som eksponerer et REST-basert minne-API

**Konfigurasjon:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Basis-URL for backend-API-et
  apiKey?: string;           // Bearer-token for autentisering
  headers?: Record<string, string>;  // Egendefinerte HTTP-headere
  timeout?: number;          // Tidsavbrudd for forespørsel (standard: 30000ms)
  backendType?: string;      // For logging

  // Overstyringer av endepunkter (standardverdiene følger REST-konvensjoner)
  endpoints?: {
    search?: string;   // standard: "/memories/search"
    create?: string;   // standard: "/memories"
    list?: string;     // standard: "/memories"
    get?: string;      // standard: "/memories/{id}"
    update?: string;   // standard: "/memories/{id}"
    delete?: string;   // standard: "/memories/{id}"
    health?: string;   // standard: "/health"
  };

  // Tilordninger av navn på spørringsparametere
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Tilordninger av navn på baneparametere
  pathParams?: {
    id?/memoryId?
  };
}
```

**Kjente backender** er forhåndskonfigurert i `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend som peker til localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend som peker til api.notion.com/v1
```

#### Innebygde backender

##### SQLiteBackend (`sqliteBackend.ts`)

Standard primærbackend. Pakker inn det eksisterende SQLite-baserte minnelageret ved hjelp av `src/lib/memory/store.ts`. Registreres automatisk ved oppstart.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Pakker inn den eksisterende Obsidian-integrasjonen (`src/lib/memory/obsidianBackend.ts`). Kobler til et Obsidian-hvelv via Obsidian Local REST API.

### Innstillinger

Innstillinger for minnebackender lagres i appens innstillingstabell og administreres via `src/lib/memory/settings.ts`:

| Innstilling            | Miljø-/konfigurasjonsnøkkel | Standard   | Beskrivelse                             |
| ---------------------- | --------------------------- | ---------- | --------------------------------------- |
| Primærbackend          | `memoryPrimaryBackend`      | `"sqlite"` | ID-en til primærbackenden               |
| Reservebackender       | `memoryFallbackBackends`    | `[]`       | Sorterte ID-er for reservebackender     |
| Backendkonfigurasjoner | `memoryBackendConfigs`      | `{}`       | Konfigurasjonsoverstyringer per backend |

Innstillingene normaliseres via `normalizeMemorySettings()` og bufres i `getMemorySettings()`.

### Initialiseringsflyt

```
Oppstart av appen
  → index.ts-importer (sideeffekt): registrerer SQLiteBackend
  → initMemoryBackends() kalles fra appens livssyklus:
      1. Last inn innstillinger (getMemorySettings)
      2. Konfigurer primærbackend + reservebackender
      3. Initialiser alle backender (helsesjekk)
      4. Klar for forespørsler
```

### Legge til en ny backend

1. **Implementer `MemoryBackend`**-grensesnittet i `src/lib/memory/<name>Backend.ts`
2. **Eksporter** fra `src/lib/memory/index.ts`
3. **Registrer** med `memoryManager.register(yourBackend)` ved oppstart
4. **Konfigurer** via innstillingene: sett `memoryPrimaryBackend` til ID-en for backenden din
5. **Test** med `src/lib/memory/__tests__/generic-backend.test.ts` som referanse

#### Eksempel: Brain-backend

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

### Verifisering

#### Enhetstester

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Forventet utdata: **35 tester, alle bestått**, som dekker:

- Konstruktør (2)
- Helsesjekk (4) — vellykket, feil 500, nettverksfeil, latenstid
- Initialisering (2) — vellykket, feil
- Oppretting (2) — standardendepunkt, egendefinert endepunkt
- Henting (4) — vellykket, 404 → null, ikke-404 utløser unntak, egendefinerte baneparametere
- Oppdatering (2) — vellykket, 404 → false
- Sletting (2) — vellykket, 404 → false
- Listing (2) — spørringsparametere, egendefinerte parameternavn
- Søk (3) — spørringsparametere, egendefinert endepunkt, serialisering av alternativer
- Autentiseringsheadere (2) — Bearer-token, egendefinerte headere
- Fabrikk (1)

#### Typesjekk

```bash
npm run typecheck:core
```

Forventet: **0 feil**.
