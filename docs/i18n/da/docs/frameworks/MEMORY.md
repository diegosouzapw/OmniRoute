# Memory System (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sandhedskilde:** `src/lib/memory/` og `src/app/api/memory/`
> **Senest opdateret:** 2026-06-28 — v3.8.40 (deaktiveret som standard + efterbehandling med int8-kvantisering)

OmniRoute leverer vedvarende samtalehukommelse, der er knyttet til API-nøglen (og
eventuelt sessions-id'et). Hukommelser udtrækkes automatisk fra LLM-svar
via letvægtsmønstergenkendelse med regulære udtryk og indsættes igen i efterfølgende
anmodninger som en indledende systemmeddelelse (eller den første brugermeddelelse for udbydere, der
afviser systemrollen).

> **Hukommelse er DEAKTIVERET som standard (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` er
> nu `false` (`src/lib/memory/settings.ts`). Aktivering af hukommelse indsætter op til
> `maxTokens` (~2k) af den hentede kontekst i **hver** chatanmodning, hvilket
> faktureres — en overraskende omkostning for nye installationer og for klienter, der administrerer deres
> egen kontekst. Tilmeld dig eksplicit under **Indstillinger → Hukommelse** (
> `MemorySkillsTab` viser en advarsel om tokenomkostninger, når hukommelse er aktiveret).
> En klient kan fravælge det for en enkelt anmodning med anmodningsheaderen
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — se tabellen over anmodningsheadere i
> [API_REFERENCE.md](../reference/API_REFERENCE.md). En anmodning uden hukommelse indstiller
> `memoryOwnerId = null`, hvilket deaktiverer **både** indsættelse af hukommelse og færdigheder for
> den pågældende anmodning (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Hukommelse er **afgrænset pr. API-nøgle**, ikke pr. bruger — alle anmodninger, der godkendes
med den samme API-nøgle, deler den samme hukommelsespulje, med mulighed for yderligere
afgrænsning via `sessionId`.

## Arkitektur

```
Klient → /v1/chat/completions (apiKeyInfo fortolket tidligere i processen)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # udtrækker id
    → getMemorySettings()                     # cachelagrede indstillinger
    → shouldInjectMemory(body, {enabled})     # kontrolpunkt
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + valgfri vektor
    → injectMemory(body, memories, provider)  # system- eller brugermeddelelse
  → kald til ekstern udbyder
  → ved svar: extractFacts(text, apiKeyId, sessionId)  # ikke-blokerende
    → setImmediate → createMemory(fact) pr. match
                   → embed(content) + upsertVector(id, vec)
```

Kaldestederne for indsættelse og udtrækning er forbundet i
`open-sse/handlers/chatCore.ts` (se efter `retrieveMemories`, `injectMemory`
og `extractFacts`).

## Motorarkitektur (løsning i 3 niveauer)

Hukommelsesmotoren bestemmer hentningsmetoden under kørsel baseret på den tilgængelige
infrastruktur og indstillingerne. Der findes tre niveauer, som anvendes i prioriteret rækkefølge:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 0 — Nøgleord (FTS5)                                  │
  │  Tilgængelighed styret af sondering: FTS5, når SQLite-buildet │
  │  understøtter det (better-sqlite3 / node:sqlite / bun:sqlite);│
  │  utilgængeligt i builds uden FTS5 (f.eks. sql.js/WASM —       │
  │  "no such module: fts5"). Bruges, når strategy = "exact",     │
  │  eller som reserve; keyword i motorstatus afspejler testen.   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 1 — Integreret vektor (sqlite-vec)                   │
  │  sqlite-vec v0.1.9 indlæses via db.loadExtension().          │
  │  KNN-brute-force over Float32-vektorer. Aktivt, når:          │
  │   • indlæsning af sqlite-vec via loadExtension lykkes        │
  │   • En embedding-kilde er tilgængelig (remote | static |      │
  │     transformers), som kan producere en Float32Array          │
  │   • tabellen vec_memories findes (oprettes ved første ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 2 — Qdrant (ekstern vektordatabase, der tilvælges)   │
  │  Når den er aktiveret, erstatter den sqlite-vec for           │
  │  semantic/hybrid. Kræver en kørende Qdrant-instans samt en    │
  │  konfigureret vært/port.                                      │
  └─────────────────────────────────────────────────────────────┘
```

Nedgradering sker automatisk og transparent:

- Hvis sqlite-vec ikke kan indlæses, er niveau 1 utilgængeligt → falder tilbage til niveau 0.
- Hvis embedding-kilden returnerer en fejl, falder niveau 1 tilbage til niveau 0.
- Hvis Qdrant ikke fungerer korrekt, falder niveau 2 tilbage til niveau 1 (eller niveau 0, hvis niveau 1
  heller ikke er tilgængeligt).

## Embeddingkilder

Embeddinglaget (`src/lib/memory/embedding/`) afgør, hvilken kilde der skal bruges,
baseret på `MemorySettingsExtended.embeddingSource`:

| Kilde          | Beskrivelse                                                                    | Nøgle påkrævet | Koldstart        |
| -------------- | ------------------------------------------------------------------------------ | -------------- | ---------------- |
| `remote`       | Bruger en konfigureret udbyders embedding-API (OpenAI, Cohere osv.)            | Ja             | Ingen            |
| `static`       | Lokal opslagstabel-embedding via `potion-base-8M` (WordPiece + middel-pooling) | Nej            | ~200ms           |
| `transformers` | Lokal ONNX-inferens via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`     | Nej            | ~3s + ~400MB RAM |
| `auto`         | Kørselstidsvalg: remote (hvis nøgle findes) → static → transformers → null     | Afhænger       | Afhænger         |

**Valgrækkefølge for `auto`:**

1. Find den første udbyder i `listEmbeddingProviders()` med `hasKey === true` → `remote`.
2. Hvis `settings.staticEnabled === true` → `static`.
3. Hvis `settings.transformersEnabled === true` → `transformers`.
4. Ellers → `null` (degraderer til FTS5-nøgleordssøgning).

Embeddingcachen (`src/lib/memory/embedding/cache.ts`) bruger et LRU-map i hukommelsen
med nøglen `${source}:${model}:${dim}:${sha256(text)}`, begrænset til
`MEMORY_EMBEDDING_CACHE_MAX` poster (standard er 1000) med en TTL på
`MEMORY_EMBEDDING_CACHE_TTL_MS` (standard er 5 min.). Den deles af alle kaldere
i hele processens levetid.

## Hybrid RRF (k=60)

Når `strategy = "hybrid"`, og vektorlageret er tilgængeligt, bruger hentningen
Reciprocal Rank Fusion til at flette FTS5- og vektorresultater:

```
RRF(d) = Σ  1 / (k + rank_i(d))      hvor k = 60 (kan konfigureres via MEMORY_RRF_K)
          i
```

Konkret:

1. Kør FTS5-søgning → rangordnet liste `R_fts` (placering 1..N).
2. Kør KNN-vektorsøgning → rangordnet liste `R_vec` (placering 1..M).
3. For hvert unikt `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, hvis det ikke er på listen).
4. Sortér efter `rrf_score` DESC, og anvend gennemløb af tokenbudgettet.

RRF er kendt for at være effektiv uden behov for scorenormalisering på tværs af
heterogene hentningssystemer. Standardværdien `k=60` stammer fra den oprindelige
artikel af Cormack et al. og fungerer godt for små korpusser (<10k minder).

## Efterfyldning (doven + genindeksering)

Når embeddingmodellen ændres (registreret via `embedding_signature`), genopbygges
vektorlageret, og alle eksisterende minder markeres med
`needs_reindex = 1` i tabellen `memories`.

**Doven efterfyldning**: Ved næste hentning bliver ethvert minde, der mangler en
vektorpost, embeddet og indsat i `vec_memories`, før søgningen køres. Dette
fordeler omkostningen ved efterfyldning over reelle forespørgsler uden at blokere opstarten.

**Eksplicit genindeksering**: Fanen Engine i `/dashboard/memory` indeholder en
knap med teksten "Genindeksér nu", som kalder `POST /api/memory/reindex`. Handleren kalder
`runReindexBatch()` fra `src/lib/memory/reindex.ts`, som behandler op til
`limit` ventende poster pr. forespørgsel. Status kan forespørges via
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabellen `memory_vec_meta` (migrering `083_memory_vec.sql`) gemmer:

- `active_dim` — aktuel vektordimension (null = endnu ikke kalibreret).
- `embedding_signature` — `${source}:${model}:${dim}`, som bruges til at registrere ændringer.
- `last_reset_at` — tidsstempel for seneste fulde nulstilling.
- `vec_loaded` — 0/1-flag, der angiver, om sqlite-vec blev indlæst korrekt.

## Udvidelse af indstillinger

Ni integrerings- og vektorfelter er tilgængelige i `MemorySettingsExtended` i
`src/shared/schemas/memory.ts` og gemmes via `src/lib/db/settings.ts`:

| Felt                     | Type                                               | Standard | Beskrivelse                                                             |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Hvilken integreringskilde der skal bruges                               |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Udbyder/model i formatet `provider/model`                               |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Basis-URL til et OpenAI-kompatibelt slutpunkt, som kun bruges af Memory |
| `customModelId`          | `string \| null`                                   | `null`   | Model-id, der sendes til det brugerdefinerede slutpunkt                 |
| `transformersEnabled`    | `boolean`                                          | `false`  | Aktivt tilvalg af Transformers.js (MiniLM, ~400MB)                      |
| `staticEnabled`          | `boolean`                                          | `false`  | Aktivt tilvalg af den lokale statiske potion-base-8M-model              |
| `rerankEnabled`          | `boolean`                                          | `false`  | Aktivér genrangeringstrinnet (tilføjer +200-500ms/anmodning)            |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Genrangeringsudbyder/model i formatet `provider/model`                  |

`rerankProviderModel` fortolkes af `POST /v1/rerank` (kaldt via loopback), så det accepterer alt, som denne rute accepterer: en kurateret cloudbaseret genrangeringsmodel (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) eller en OpenAI-kompatibel udbydernode som `<node-prefix>/<model>` (f.eks. `skilled-mini/bge-reranker-v2-m3` for en TEI/Infinity-maskine). Loopback-noder er altid kvalificerede; en node på en anden vært (LAN, Tailscale) kræver desuden funktionsflaget `RERANK_REMOTE_PROVIDER_NODES` og skal overholde udbyderens politik for udgående URL'er — se [Funktionsflag](../reference/FEATURE_FLAGS.md). Dashboardvælgeren viser kuraterede udbydere samt lokale noder; enhver gyldig `provider/model`-streng kan angives direkte via `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Hvilken vektorbackend der skal bruges |

Disse eksponeres via `GET /PUT /api/settings/memory` (skemaet `MemorySettingsExtendedSchema`).

For kilden `remote` accepterer Memory også de valgfrie indstillinger `customBaseUrl` og
`customModelId`. Sammen vælger de et OpenAI-kompatibelt `/embeddings`-slutpunkt og en
model uden at ændre det globale integreringsregister. Slutpunktet normaliseres før brug
og kontrolleres af udbyderens politik for udgående URL'er: HTTP(S) er påkrævet,
indlejrede legitimationsoplysninger og forespørgselsstrenge afvises, og adresser til
cloudmetadata forbliver blokeret. Tomme værdier bevarer den valgte registerudbyder. Fejl,
der returneres til dashboardet, renses, og legitimationsoplysninger til slutpunkter
logføres aldrig.

> **TODO (D20):** Omfanget `global` (deling af hukommelser på tværs af alle API-nøgler) er
> ikke implementeret i denne version. Det kræver skemaændringer og en global
> hentningssti. Spor dette separat.

## Lagerlag

### Primært: SQLite (`memories`-tabel)

Oprettet af migreringen `015_create_memories.sql`:

| Kolonne                     | Type               | Bemærkninger                                                                         |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID genereret via `crypto.randomUUID()`                                             |
| `api_key_id`                | `TEXT NOT NULL`    | Ejende API-nøgle                                                                     |
| `session_id`                | `TEXT`             | Valgfrit omfang pr. samtale                                                          |
| `type`                      | `TEXT NOT NULL`    | En af `factual`, `episodic`, `procedural`, `semantic`                                |
| `key`                       | `TEXT`             | Stabil upsert-nøgle, f.eks. `preference:i_prefer_python`                             |
| `content`                   | `TEXT NOT NULL`    | Den faktiske faktatekst                                                              |
| `metadata`                  | `TEXT`             | JSON-objekt (kategori, extractedAt, kilde, ...)                                      |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601-strenge                                                                     |
| `expires_at`                | `TEXT`             | Valgfrit udløbstidspunkt; `NULL` betyder permanent                                   |
| `memory_id`                 | `INTEGER UNIQUE`   | Tilføjet af `023_fix_memory_fts_uuid.sql` for at forbinde UUID'er ↔ FTS5-række-id'er |

Indekser: `api_key_id`, `session_id`, `type`, `expires_at` samt det unikke
`memory_id`-indeks.

**Upsert-semantik**: `createMemory()` leder efter en eksisterende række med samme
`(api_key_id, key)` og opdaterer den på stedet, når den findes (ved at sammenflette
`metadata` via en overfladisk spread). Dette forhindrer tabellen i at vokse uden
begrænsning ved gentagne præferenceudsagn.

### Fuldtekstsøgning (virtuel `memory_fts`-tabel)

`022_add_memory_fts5.sql` opretter en virtuel FTS5-tabel over `content` og
`key`. `023_fix_memory_fts_uuid.sql` retter en fejl fra den virkelige verden, hvor den
primære UUID-nøgle ikke kunne joines med FTS5's heltals-rowid — migreringen tilføjer
kolonnen `memory_id`, genopretter FTS-tabellen og tilkobler triggere
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), som holder FTS synkroniseret ved
INSERT, DELETE og UPDATE.

Bruges af `retrieval.ts` til strategierne `semantic` og `hybrid` (se nedenfor).
Hentningskoden sikrer sig med `hasTable("memory_fts")` og falder tilbage til
kronologisk rækkefølge, hvis FTS-tabellen mangler, eller FTS-forespørgslen udløser en fejl.

### Valgfrit: Qdrant (vektorlager, niveau 2)

`src/lib/memory/qdrant.ts` implementerer en valgfri Qdrant-integration som et
vektorlager på niveau 2. Hentning videresendes kun til Qdrant, når motorvælgeren
`memoryVectorStore === "qdrant"` — standardværdien `"auto"` (og `"sqlite-vec"`)
vælger **aldrig** Qdrant. Kontakten på fanen Engine indstiller **både** `qdrantEnabled` og
`memoryVectorStore` samtidigt: Aktivering gør Qdrant til det primære lager, mens
deaktivering nulstiller til `"auto"` (#5597 — før denne rettelse havde aktivering ingen
effekt, fordi intet skrev til motorvælgeren). Hvis Qdrant ikke kan nås eller ikke returnerer
noget, falder hentningen tilbage til sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — indlejr `key + content` med den konfigurerede
  indlejringsmodel, sørg for, at samlingen findes (opretter vektorer med cosinusafstand
  ved første brug), og indsæt eller opdater et punkt med nyttelasten `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — indlejr forespørgslen, søg i
  samlingen filtreret efter `kind = "omniroute_memory"` og eventuelt efter
  `apiKeyId` / `sessionId`. Begrænser `topK` til `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — sletning af et enkelt punkt. Kaldes af
  `deleteMemory()`, efter at SQLite-rækken er fjernet (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — massesletning af punkter, hvis
  `expiresAtUnix` ligger i fortiden, eller hvis `createdAtUnix` er ældre end
  opbevaringsgrænsen. Tæller først, så dashboardet kan vise de faktiske tal.
- `checkQdrantHealth()` — `GET /readyz`-sundhedskontrol med latenstid.

Brugerfladen for indstillinger viser Qdrant-konfiguration, sundhedskontrol, test af
semantisk søgning og oprydning på fanen **Engine** under `/dashboard/memory`. De
tilsvarende ruter under `src/app/api/settings/qdrant/` er alle forbundet fra og med v3.8.6:

| Rute                                    | Metode        | Beskrivelse                          |
| --------------------------------------- | ------------- | ------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Læs/opdater Qdrant-indstillinger     |
| `/api/settings/qdrant/health`           | `GET`         | Tilgængelighedskontrol + latenstid   |
| `/api/settings/qdrant/search`           | `POST`        | Test af semantisk søgning            |
| `/api/settings/qdrant/cleanup`          | `POST`        | Fjern udløbne/gamle punkter          |
| `/api/settings/qdrant/embedding-models` | `GET`         | Vis tilgængelige indlejringsmodeller |

**Bemærkninger om adfærd (hvad du kan forvente):**

- **Valg af motor** — når Qdrant aktiveres på fanen Engine, bliver den det primære
  lager (sætter `memoryVectorStore="qdrant"`); deaktivering nulstiller til `"auto"` (#5597).
- **Ingen efterfølgende udfyldning** — kun hukommelseselementer, der oprettes/opdateres
  **efter**, at Qdrant er aktiveret, skrives til den (asynkron dobbeltskrivning uden
  afventning). Eksisterende SQLite-hukommelseselementer migreres **ikke**; "Reindex Now"
  genopbygger kun sqlite-vec-indekset, ikke Qdrant.
- **Vektordimensionen registreres automatisk** ud fra den faktiske indlejring ved første
  brug — der er intet dimensionsfelt, som skal udfyldes. Ændring af indlejringsmodellen,
  efter at en samling er oprettet, håndteres **ikke** automatisk: Den eksisterende samling
  forbliver uberørt, skrivninger/søgninger med uoverensstemmende dimensioner mislykkes og
  falder tilbage til sqlite-vec. Genopret samlingen (med et nyt navn, eller slet den i
  Qdrant) for at skifte indlejringsmodel.
- **Afstandsmetrik** — altid **Cosine** (hardkodet ved oprettelse af samlingen; kan ikke
  konfigureres).
- **Godkendelse** — kun API-nøgle (sendes som `api-key`-headeren; valgfri for lokal
  Docker uden godkendelse). JWT/RBAC bruges ikke.
- **Konfigurationsfelter** — brugerfladen viser `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` findes kun i miljøvariabler/databasen, og
  `vectorSize` bruges ikke ved oprettelse af samlingen (dimensionen kommer fra indlejringen).

### Vektorkvantisering (int8 — tilvalg, begge backends)

Begge vektorbackends understøtter **valgfri int8-kvantisering** for at reducere
hukommelsesforbruget for lagrede vektorer (~4× mindre end Float32) med en mindre
reduktion i genfindingspræcisionen. Standarden er **deaktiveret** for begge — vektorer
bevarer fuld præcision, medmindre funktionen udtrykkeligt aktiveres.

| Backend    | Indstilling                               | Type                           | Standard | Hvor den læses                                              |
| ---------- | ----------------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB-nøgle)           | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (miljøvariabel) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** konfigureres pr. instans via indstillingsnøglen `qdrantQuantization`
  (vist som feltet `quantization` på `PUT /api/settings/qdrant`). Når værdien er
  `"int8"`, anmoder `buildQuantizationConfig()` om skalær kvantisering
  (`always_ram`, kvantil `0.99`), og søgninger aktiverer `rescore: true`, så
  vektorerne med fuld præcision finjusterer int8-kandidatsættet.
- **sqlite-vec**-kvantisering konfigureres **kun via miljøet** (ikke en DB-indstilling):
  Indstil `MEMORY_VEC_QUANTIZATION=int8` for at lagre de lokale vektorer som en
  `int8[dim]`-kolonne via `vec_quantize_int8(?, 'unit')`. Den valgte tilstand indgår i
  `embedding_signature` (et `:int8`-suffiks), så skift af tilstand udløser en fuld
  genindeksering af tabellen `vec_memories` — den samme dovne efterudfyldningsmekanisme,
  som bruges, når indlejringsmodellen ændres.

## Hukommelsestyper

`MemoryType` (`src/lib/memory/types.ts`):

| Type         | Anvendes til                                                                          |
| ------------ | ------------------------------------------------------------------------------------- |
| `factual`    | Præferencer, stabile brugerfakta, adfærdsmønstre                                      |
| `episodic`   | Beslutninger knyttet til et bestemt tidspunkt ("Jeg valgte Postgres")                 |
| `procedural` | Arbejdsgang/hvordan-man-gør-hukommelse (reserveret; ingen automatisk udtrækker i dag) |
| `semantic`   | Reserveret til poster i vektorlageret                                                 |

Hentningsstrategien for `MemoryConfig` er enten `exact`, `semantic` eller `hybrid`,
og omfanget er enten `session`, `apiKey` eller `global`. Standardomfanget fra
`getMemorySettings()` er `apiKey`.

## Udtrækning af fakta (`extraction.ts`)

Udtrækningen er **regex-baseret**, ikke LLM-baseret — den kører i processen med
`setImmediate()`, så den aldrig blokerer svarstrømmen:

- **Præferencemønstre** → `MemoryType.FACTUAL`
  (f.eks. `Jeg foretrækker …`, `Jeg kan virkelig godt lide …`, `min favorit er …`, `Jeg hader …`)
- **Beslutningsmønstre** → `MemoryType.EPISODIC`
  (f.eks. `Jeg vil bruge …`, `Jeg valgte …`, `Jeg endte med …`, `Jeg vil tage … i brug`)
- **Adfærdsmønstre** → `MemoryType.FACTUAL`
  (f.eks. `Jeg plejer …`, `Jeg gør altid …`, `Jeg har tendens til …`)

Hvert match renses (`trim`, sammenfoldning af mellemrum, begrænset til 500 tegn),
deduplikeres inden for batchen via en stabil `factKey(category, content)` og
gemmes via `createMemory()` med metadataene
`{category, extractedAt, source: "llm_response"}`. Inputteksten er begrænset til
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — når den er længere, anvendes tekstens
**slutning**, så assistentens seneste indhold altid medtages.

`extractFactsFromText(text)` eksporteres til test og returnerer de strukturerede
fakta uden at gemme dem.

## Hentning (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` er det primære indgangspunkt. Den:

1. Normaliserer og validerer konfigurationen via `MemoryConfigSchema`.
2. Returnerer straks `[]`, når `enabled` er false, eller `maxTokens <= 0`.
3. Begrænser `maxTokens` til `[1, 8000]`.
4. Registrerer, om den moderne `memories`-tabel findes (i modsætning til den ældre `memory`-tabel), så ældre databaser fortsat fungerer.
5. Opbygger basisforespørgslen med udløbskontrollen
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), valgfrit
   sessionsomfang og valgfri `retentionDays`-grænse.
6. Forgrener sig ud fra strategien:
   - **`exact`** (standard): kronologisk `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: hvis `config.query` er angivet, og `memory_fts` findes, anvendes
     `memory_fts MATCH ?` via JOIN, og der sorteres efter FTS-rangering; der faldes tilbage til kronologisk
     rækkefølge, når FTS returnerer 0 rækker.
   - **`hybrid`**: en union af FTS-resultater (højere relevans) og det
     kronologiske sæt, deduplikeret efter id.
7. Beregner en relevansscore baseret på nøgleord (`getRelevanceScore`) for
   `content`, `key` og `metadata`-JSON, når en forespørgsel er angivet. Rækker med
   en score på nul filtreres fra.
8. Sorterer efter faldende score og derefter faldende `createdAt`.
9. Gennemgår den rangerede liste og accepterer poster, så længe den løbende
   `estimateTokens(content)` (≈ `length / 4`) holder sig under budgettet. Returnerer
   altid mindst én post, når der findes et match.

`estimateTokens` eksporteres og bruges af hentning, opsummering og MCP-værktøjet
`omniroute_memory_search`.

## Injektion (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Samler alt hukommelsesindhold i én enkelt streng: `Memory context: …`.
2. Vælger en strategi ud fra udbydernavnet:
   - **Systemmeddelelse** (standard for OpenAI, Anthropic, Gemini, …) — indsætter
     en `{role: "system", content: memoryText}` før eventuelle eksisterende
     systemmeddelelser, så brugerens systemprompter stadig har forrang.
   - **Brugermeddelelse** (reserveløsning) — for udbydere i
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Disse afviser systemrollen
     og ville ellers returnere 400 (jf. problem #1701 for GLM/Zhipu).
3. Logger antal, strategi og model under `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` eksporteres til kaldere, der har brug
for at træffe deres egne routingbeslutninger. Ukendte udbydere anvender som
standard `true` (systemrollen er tilladt) af sikkerhedshensyn.

## Indstillinger (`settings.ts`)

Hukommelseskonfigurationen **gemmes i databasens indstillingstabel**, ikke i
miljøvariabler. `getMemorySettings()` læser fra `getSettings()` og cacher
resultatet i processen. `invalidateMemorySettingsCache()` kaldes af
indstillingernes PUT-rute efter skrivninger.

### Ældre felter (alle versioner)

| Databasenøgle         | Type    | Standard                                          | UI-kontrolelement                                         |
| --------------------- | ------- | ------------------------------------------------- | --------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (deaktiveret som standard siden v3.8.30)  | Hukommelse til/fra                                        |
| `memoryMaxTokens`     | integer | `2000` (interval `0–16000`)                       | Tokenbudget til injektion                                 |
| `memoryRetentionDays` | integer | `30` (interval `1–365`)                           | Opbevaringsperiode                                        |
| `memoryStrategy`      | enum    | `"hybrid"` (én af `recent`, `semantic`, `hybrid`) | Hentningsstrategi                                         |
| `skillsEnabled`       | boolean | `false`                                           | Slår færdighedsinjektion pr. nøgle til/fra (se SKILLS.md) |

Bemærk: UI-strategien `"recent"` mappes til den interne hentningsstrategi
`"exact"` via `toMemoryRetrievalConfig()` (kronologisk rækkefølge).

### Nye felter (v3.8.6, plan 21 D9)

Se også afsnittet "Udvidelse af indstillinger" ovenfor for feltbeskrivelser.

| Databasenøgle               | API-felt                 | Standard |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-relaterede databasenøgler (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` med standardværdien `"omniroute_memory"`,
`qdrantEmbeddingModel` med standardværdien `"openai/text-embedding-3-small"`)
læses af `normalizeQdrantConfig()` i `qdrant.ts`.

### Miljøvariabler (v3.8.6)

Seks valgfrie miljøvariabler justerer motorens adfærd under kørsel (dokumenteret i `.env.example`):

| Variabel                        | Standard                   | Beskrivelse                                                                                                                                               |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL for embedding-cache (5 min.)                                                                                                                          |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maksimalt antal poster i embedding-LRU-cachen                                                                                                             |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF-repository til Transformers.js-modellen                                                                                                                |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF-repository til den statiske potion-model                                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Placering til lagring af downloadede modeller                                                                                                             |
| `MEMORY_VEC_TOP_K`              | `20`                       | Standard-top-K til vektorsøgning                                                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | RRF-k-konstant til hybridsøgning                                                                                                                          |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Indstil til `int8` for at gemme lokale sqlite-vec-vektorer kvantiseret (~4× mindre; aktivt tilvalg). Ændring af tilstand gennemtvinger en genindeksering. |

## Opsummering (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` komprimerer ældre
indhold, når det løbende samlede antal tokens på tværs af en nøgles hukommelser
overstiger budgettet. Den gennemgår rækkerne faldende efter `created_at`, beholder
de rækker, der er plads til, og erstatter for resten `content` på stedet med de
første tre sætninger fra originalen. `tokensSaved` er forskellen i
`estimateTokens` mellem det gamle og det nye indhold.

Denne rutine er **tilgængelig, men kaldes ikke automatisk** i den nuværende
chatpipeline — kald den fra et cron-job, en administratorhandling eller
`MemoryConfig.autoSummarize`-integrationskode, hvis du har brug for løbende
komprimering. Datatabet er uigenkaldeligt: Den oprindelige tekst overskrives.

## REST-API

Alle endpoints kræver administrationsgodkendelse (`requireManagementAuth`).

### Centrale hukommelsesendpoints (eksisterende + opdaterede)

| Metode   | Sti                  | Beskrivelse                                                                                                                                                                       |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Sideinddelt liste med filtre: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Svaret indeholder `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` |
| `POST`   | `/api/memory`        | Opret post (Zod-valideret: `content`, `key`, valgfri `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Kalder `createMemory()`, som udfører upsert på `(apiKeyId, key)`  |
| `GET`    | `/api/memory/[id]`   | Hent en enkelt post efter UUID                                                                                                                                                    |
| `PUT`    | `/api/memory/[id]`   | Opdater postens felter (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Synkroniserer også vektoren, hvis en embedding-kilde er tilgængelig.                |
| `DELETE` | `/api/memory/[id]`   | Slet en post; sletter også fra `vec_memories` (D15) og efter bedste evne fra Qdrant. Returnerer 404, hvis posten mangler.                                                         |
| `GET`    | `/api/memory/health` | Kører `verifyExtractionPipeline("health-check")` — opret→vis→slet tur-retur. Returnerer `{working, latencyMs, error?}`                                                            |

### Nye endpoints til hukommelsesmotoren (plan 21)

| Metode | Sti                               | Beskrivelse                                                                                                                                                              |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/memory/retrieve-preview`    | Prøvekørsel af `retrieveMemories` — returnerer rangerede resultater med score, niveau og tokens. Body: `RetrievePreviewSchema`. Injicerer eller ændrer IKKE hukommelser. |
| `GET`  | `/api/memory/embedding-providers` | Viser udbydere med embedding-modeller og angiver, hvilke der har en konfigureret API-nøgle.                                                                              |
| `GET`  | `/api/memory/engine-status`       | Returnerer fuld motorstatus: nøgleordsniveau, embedding-opløsning, statistik for vektorlager, Qdrant-status og rerank-konfiguration. Format: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Udløs hukommelseskomprimering manuelt. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Returnerer `{candidates, tokensSaved}`.                   |
| `POST` | `/api/memory/reindex`             | Udløs vektorgenindeksering for hukommelser med `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Returnerer `{started, pending}`.                                |

### Endpoints til indstillinger

| Metode | Sti                                     | Beskrivelse                                                                                             |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Aktuel normaliseret `MemorySettingsExtended` (7 nye felter + ældre felter)                              |
| `PUT`  | `/api/settings/memory`                  | Opdater et vilkårligt felt fra `MemorySettingsExtendedSchema` (12 felter i alt)                         |
| `GET`  | `/api/settings/qdrant`                  | Aktuelle Qdrant-indstillinger (`QdrantSettingsSchema`)                                                  |
| `PUT`  | `/api/settings/qdrant`                  | Opdater Qdrant-indstillinger. Body: `QdrantSettingsUpdateSchema`. `apiKey` = tom streng fjerner nøglen. |
| `GET`  | `/api/settings/qdrant/health`           | Liveness-kontrol af den konfigurerede Qdrant-instans. Returnerer `QdrantHealthResultSchema`.            |
| `POST` | `/api/settings/qdrant/search`           | Test af semantisk søgning mod Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                     |
| `POST` | `/api/settings/qdrant/cleanup`          | Fjern Qdrant-punkter for udløbne/gamle hukommelser.                                                     |
| `GET`  | `/api/settings/qdrant/embedding-models` | Vis embedding-modeller, der er tilgængelige for Qdrant.                                                 |

Listeforespørgslen `/api/memory` understøtter enten `page`-baseret
sideinddeling (`parsePaginationParams`) **eller** rå `offset` — når `offset`
er angivet, har den forrang, og en afledt `page` beregnes til svarformatet.

## MCP-værktøjer (`open-sse/mcp-server/tools/memoryTools.ts`)

Når MCP-serveren er aktiveret, registreres tre hukommelsesværktøjer:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → omslutter `retrieveMemories()`. Fra og med v3.8.6 (D16) læses `strategy`
  fra `getMemorySettings()` i stedet for at være hardkodet til `"exact"`. Hvis
  `query` er angivet, og `strategy` er `semantic` eller `hybrid`, bruges
  vektorlageret, når det er tilgængeligt.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → omslutter `createMemory()`. Accepterer kun de 4 kanoniske typer:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → oplister matchende
  poster, filtrerer eventuelt efter tidsstempel for oprettelse før et bestemt tidspunkt og sletter derefter hver
  via `deleteMemory()` (som også fjerner vektorer fra sqlite-vec + Qdrant).

Se [MCP-SERVER.md](./MCP-SERVER.md) for oplysninger om transport og omfang.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` er nu et **Studio med 3 faner**:

### Fane: Hukommelser

- Konceptkort (sammenklappelig forklaring af "Sådan fungerer det").
- Liste, søgning og sideinddeling i realtid (debounce på 300 ms).
- Typefilter (`factual` / `episodic` / `procedural` / `semantic` / alle).
- Modal til tilføjelse af hukommelse (nøgle, indhold, type).
- Integreret redigering (blyantsknap → `PUT /api/memory/[id]`).
- Sletning pr. række (med bekræftelsesdialog).
- JSON-eksport af den aktuelle side; JSON-import via filvælger.
- Statistikkort: `totalEntries`, `tokensUsed`, `hitRate`.
- Knappen "Komprimer gamle" → `POST /api/memory/summarize` (en prøvekørsel viser først
  antallet af kandidater og beder derefter om bekræftelse).
- En grøn/rød statusprik styret af `GET /api/memory/health`.

### Fane: Legeplads

- Forespørgselsfelt + strategivælger (Eksakt / Semantisk / Hybrid) + tokenbudget.
- "Simuler" → `POST /api/memory/retrieve-preview` — viser rangerede resultater med
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Opløsningspanel, der viser, hvilken indlejringskilde / hvilket vektorlager der blev brugt, og
  om der skete et fallback.

### Fane: Motor

- Statuspanel for motoren (chip til nøgleordsbaseret FTS5, chip til indlejring, chip til vektorlager,
  chip til Qdrant-status, chip til omrangering).
- Knappen "Genindeksér nu" → `POST /api/memory/reindex`.
- Vælger til indlejringskilde (automatisk / ekstern / statisk / transformere + til/fra-indstillinger).
- Qdrant-konfigurationskort (aktivering, vært/port/samling/nøgle, test af forbindelse,
  test af semantisk søgning, oprydning).
- Konfigurationskort til omrangering (aktivering, valg af udbyder/model).

Indstillinger for hukommelse og Qdrant findes også under
`/dashboard/settings → Hukommelse og færdigheder` (`MemorySkillsTab.tsx`) som
den ældre/globale indstillingsflade.

## Cachelagring

`src/lib/memory/store.ts` vedligeholder en LRU-lignende cache i processen
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, med fjernelse af de 20 %
ældste poster) til `getMemory(id)`-læsninger samt et generisk nøgle/værdi-baseret
`memoryCache`-lag (`src/lib/memory/cache.ts`) med metoderne `get`/`set`/`invalidate`,
som bruges af kaldere, der ønsker deres egen afgrænsede cache (LRU med 1 000 poster,
standard-TTL på 5 min).

## Privatliv og livscyklus

- Hukommelsens ejer er API-nøgle-id'et (`resolveMemoryOwnerId` i
  `chatCore.ts`). Uden et `apiKeyInfo.id` køres hverken hentning, injektion
  eller udtrækning.
- Poster med en fremtidig `expires_at` filtreres fra ved hentning; gamle
  poster, der ligger ud over `retentionDays`, udelukkes af
  `created_at >= cutoff`-klausulen i `retrieveMemories`.
- Brug `DELETE /api/memory/[id]` eller `omniroute_memory_clear` til permanent sletning.
- Udtrækning køres asynkront uden afventning via `setImmediate`; fejl logges under
  `memory.extraction.background.failed` og vises aldrig for den kaldende part.
- Verifikationsgennemløb (`verifyExtractionPipeline`) rydder op i deres egne
  testposter i en `finally`-blok.

## Se også

- [SKILLS.md](./SKILLS.md) — indstillingen `skillsEnabled` injicerer
  værktøjsdefinitioner sammen med hukommelsen.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-transport/-rettigheder.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — bredere API-overflade.
- Kildemoduler:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — embeddinglag med flere kilder
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-skemaer for alle hukommelses-API-kalds bodies
  - `src/shared/schemas/qdrant.ts` — Zod-skemaer for Qdrant-indstillinger/-operationer
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
  - `src/app/(dashboard)/dashboard/memory/` — Studio-brugergrænseflade (side + komponenter +
    faner + hooks)
  - `open-sse/handlers/chatCore.ts` (kobling af injektion/udtrækning)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Valg af embeddingudbyder (v3.8.16+)

OmniRoutes hukommelsesmotor understøtter **fire embeddingkilder** (`src/lib/memory/embedding/`). De har hver forskellige afvejninger med hensyn til **latenstid, omkostninger, modelkvalitet og opsætningskompleksitet**.

### Embeddingkilderne

| Udbyder        | Kilde                                             | Latenstid                                 | Omkostning           | Kvalitet                              | Opsætning                                    |
| -------------- | ------------------------------------------------- | ----------------------------------------- | -------------------- | ------------------------------------- | -------------------------------------------- |
| `transformers` | Lokal ONNX-model (Xenova/all-MiniLM-L6-v2)        | ~50-150ms (CPU)                           | Gratis               | God                                   | Kun `npm install`                            |
| `static`       | Forudberegnede vektorer (cachelagret)             | <1ms                                      | Gratis               | Ikke relevant (afhænger af cachetræf) | Ingen                                        |
| `remote`       | OpenAI-/Cohere-/Voyage-API                        | ~100-300ms                                | $0.02-0.10/1M tokens | Fremragende                           | API-nøgle                                    |
| `auto`         | Vælger den bedste tilgængelige kilde under kørsel | Samme som den valgte kilde                | Gratis               | Samme som den valgte kilde            | Ingen                                        |
| _(cache)_      | LRU-lag i hukommelsen over enhver kilde           | <1ms (træf), fuld latenstid (ikke fundet) | Gratis               | Samme som den underliggende kilde     | Altid aktivt (ikke en kilde, der kan vælges) |

### Beslutningstræ

```
                  Hvad er din udrulningskontekst?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  UDV./TEST    LILLE PROD.  STOR PROD.    EDGE/OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, intet API)        (bedste kvalitet) (intet internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Tilføj ALTID `cache`-laget ovenpå
            (LruCache omslutter enhver udbyder)
```

### Database- og API-konfiguration

Indstillinger for hukommelsesembeddings konfigureres via indstillings-API'et/brugergrænsefladen, ikke via miljøvariabler. De relevante databaseindstillingsnøgler under Indstillinger (`normalizeMemorySettings` i `src/lib/memory/settings.ts`) er:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (API-baseret, f.eks. OpenAI), `"static"` (eksternt lager) eller `"auto"`
- `memoryEmbeddingProviderModel`: Modelidentifikator for eksterne/statiske kilder (f.eks. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` eller `"auto"`

#### Lokal model (`transformers`)

Bruger transformers.js internt til at køre lokale modeller:

```bash
# Miljøvariabler, der læses i koden (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-modelrepository
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statisk HF Potion-model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cachemappe
```

#### LRU-embeddingcache

Cachen er som standard altid aktiveret og konfigureres via miljøvariabler:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maks. antal cachelagrede elementer
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min.)
```

### Ydelsestal

Benchmark på en typisk x86-server med 4 kerner (tekster på ~100 tokens hver):

| Udbyder              | p50   | p95   | p99   | Pris pr. 1 mio. embeddings         |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratis                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Afhænger af Qdrant-hosting         |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Gratis                             |

---

## Mønstre for faktaudtrækning (v3.8.16+)

Modulet `extraction.ts` (`src/lib/memory/extraction.ts`) bruger **matchning med regulære udtryk** til at udtrække strukturerede fakta fra samtalebeskeder. En forståelse af disse mønstre hjælper dig med at finjustere kvaliteten af udtrækningen til dit anvendelsestilfælde.

### Standardkategorier for mønstre

| Kategori            | Eksempel på mønster                                                  | Indfanger                       |
| ------------------- | -------------------------------------------------------------------- | ------------------------------- |
| PREFERENCE_PATTERNS | `"Jeg foretrækker <X>"`, `"Jeg kan lide <X>"`, `"Jeg hader <X>"`     | Brugerpræferencer               |
| DECISION_PATTERNS   | `"Jeg vil bruge <X>"`, `"Jeg besluttede at <X>"`, `"Jeg valgte <X>"` | Brugerbeslutninger (episodiske) |
| PATTERN_PATTERNS    | `"Jeg plejer at <X>"`, `"Jeg gør altid <X>"`, `"Jeg gør aldrig <X>"` | Vedvarende adfærdsmønstre       |

### Eksempler på mønstre (forenklet)

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

### Hvad der udtrækkes

Når en bruger siger:

> "Jeg foretrækker TypeScript. Jeg vil bruge Postgres til dette projekt. Jeg committer altid, før jeg pusher. Jeg kan ikke lide Python."
> Udtrækningen producerer 4 hukommelseselementer:
>
> | Nøgle                                | Kategori   | Type     | Indhold                      |
> | ------------------------------------ | ---------- | -------- | ---------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                 |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres til dette projekt" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit før pushing"         |
> | `preference:python`                  | preference | factual  | "Python"                     |

### Grænser for udtrækning

For at forhindre ukontrolleret udtrækning gælder følgende grænser:

| Min. indholdslængde | 3 tegn |
| Maks. indholdslængde | 500 tegn |

### Hvornår udtrækning bør deaktiveres

Udtrækning kører automatisk, når hukommelse er aktiveret; der findes ikke en separat
kontakt kun til udtrækning. Hvis du vil slå den fra, skal du deaktivere hukommelse helt (`enabled: false`
via `PUT /api/settings/memory`). Overvej at gøre det, når:

- Du har en stor beskedmængde, og omkostningen ved udtrækning ikke er ubetydelig
- Dine samtaler primært er midlertidige (chat, fejlfinding) uden langsigtet værdi
- Du allerede indsamler kontekst via brugerdefinerede plugins

---

## Finjustering af hybrid RRF (v3.8.16+)

Algoritmen **Reciprocal Rank Fusion (RRF)** kombinerer resultater fra FTS5 (søgeord) og vektorsøgning (semantisk). Parameteren `k` styrer, hvor stor vægt resultater med lavere placering får.

### Formlen

For hvert hukommelseselement, der er kandidat, er RRF-scoren:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Hvor:

- `k` er konstanten (standard er 60)
- `rank_i(d)` er placeringen af dokumentet `d` i det i'te genfindingssystem (FTS, vektor)
- Summen beregnes på tværs af alle genfindingssystemer

### Hvordan `k` påvirker resultaterne

| `k`-værdi             | Effekt                                                                                   | Bedst egnet til                                |
| --------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `k=0`                 | Ren rangfletning (ingen udjævning)                                                       | Teoretisk referencepunkt                       |
| `k=10-30`             | Vægter topresultater højt; lave placeringer bidrager næsten ikke                         | Når de 3 bedste resultater normalt er korrekte |
| **`k=60`** (standard) | Afbalanceret — de 10 bedste resultater bidrager alle meningsfuldt                        | Genfinding til generelle formål                |
| `k=100+`              | Fladere — selv lavt placerede resultater kan dominere, hvis de optræder i flere systemer | Når recall > precision er afgørende            |

### Finjustering af `k` i praksis

```bash
# Standard
MEMORY_RRF_K=60

# Aggressiv præcision (lille hukommelse, få dokumenter)
MEMORY_RRF_K=20

# Maksimal recall (stor hukommelse, varierede forespørgsler)
MEMORY_RRF_K=120
```

**Eksempel med `k=20`:**

- FTS-placering 1 → bidrag `1/21 = 0.048`
- FTS-placering 10 → bidrag `1/30 = 0.033`
- Vektorplacering 1 → bidrag `0.048`
- Kombineret maksimum: `0.096`

**Eksempel med `k=60`:**

- FTS-placering 1 → bidrag `1/61 = 0.016`
- FTS-placering 10 → bidrag `1/70 = 0.014`
- Vektorplacering 1 → bidrag `0.016`
- Kombineret maksimum: `0.033`

Med en højere `k` er den **relative forskel** mellem førstepladsen og tiendepladsen mindre, så algoritmen lægger mere vægt på **enighed på tværs af genfindingssystemer** end på sikkerheden ved topplaceringen.

### Hvornår `k` bør ændres

| Symptom                                        | Prøv                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| Topresultatet vinder altid, men det er forkert | **Sænk** k (f.eks. 20) — sikkerheden ved topplaceringen betyder mere |
| Det rigtige svar er i top-5, men ikke top-1    | **Hæv** k (f.eks. 100) — fladere scoring belønner enighed            |
| Recall er høj, men precision er lav            | **Sænk** k — gør rangeringen skarpere                                |
| Recall er lav (relevante dokumenter mangler)   | **Hæv** k — giv lavere placerede dokumenter en chance                |

### RRF-vægtning

Reciprocal Rank Fusion bruger samme vægt for semantisk vektorplacering og placering i fuldtekstsøgning:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Der findes ingen miljøvariabler til at justere de enkelte vægte (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` findes ikke).

---

## Opsummeringsstrategi (v3.8.16+)

Modulet `summarization.ts` (`src/lib/memory/summarization.ts`) komprimerer ældre hukommelser for at holde det aktive sæt lille, samtidig med at genkaldelsen bevares.

### Hvornår opsummering udløses

| Udløser                  | Tærskel (standard) |
| ------------------------ | ------------------ |
| Manuel udløsning via API | ikke relevant      |

### Hvad der opsummeres

To indgangspunkter eksporteres fra `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — komprimerer
  hukommelserne for en session til én opsummeringstekst, som er begrænset af et tokenbudget.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — den aldersbaserede
  komprimering, som API'et bruger: Den vælger alle hukommelser, der er ældre end `days`, opretter
  én komprimeret opsummeringshukommelse ud fra dem og sletter originalerne
  (når `dryRun` er `false`). Angiv `dryRun: true` for at få vist kandidatsættet og det samlede antal tokens
  uden at ændre noget.

Der er ingen klyngedannelse efter tag/nøgle eller vurdering pr. hukommelse af "kerneindhold kontra indhold, der kan opsummeres" —
udvælgelsen er udelukkende baseret på aldersgrænsen, og opsummeringsteksten består af en komprimeret,
typepræfikseret linje pr. kandidat.

### Udløsning af opsummering

Opsummering er **manuel / tilvalgt** — indstillingen `autoSummarize` er som
standard `false`, så intet komprimeres automatisk. Udløs den via API'et:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Hvis den skal forblive deaktiveret, skal du blot beholde standardværdien (`false`) for `autoSummarize`.

### Tips til opsummeringskvalitet

- **Se først en forhåndsvisning med `dryRun`** — `summarizeMemoriesOlderThan(..., true)` returnerer
  kandidatlisten og det samlede antal tokens, så du kan bekræfte, hvad der vil blive flettet,
  før originalerne slettes.
- **Kør opsummeringen i tidsrum med lav trafik**, hvis du har en stor samling af hukommelser — LLM-kaldet er den langsomme del

```bash
# Cron-format: opsummer dagligt kl. 3
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend-udbydermønster

> **Autoritativ kilde:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tests:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend-udbydermønstret introducerer et **udskifteligt abstraktionslag til backends** oven på den eksisterende hukommelsesmotor. I stedet for at være bundet til en enkelt lagerimplementering understøtter hukommelsessystemet nu flere backends (SQLite, Obsidian, Notion og brugerdefinerede HTTP-backends) med konfigurerbar routing til primære backends og reservebackends.

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
│  Primær ──► Backend A  (f.eks. SQLite)                   │
│  Reserve ─► Backend B  (f.eks. Obsidian)                 │
│             Backend C  (f.eks. Notion via GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Kernegrænseflade (`backend.ts`)

Hver backend skal implementere grænsefladen `MemoryBackend`:

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

  // Søgning
  search(config: SearchConfig): Promise<Memory[]>;

  // Tilstand
  health(): Promise<HealthCheckResult>;

  // Livscyklus (valgfri)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-orkestrator, der:

- **Registrerer** backends via `register(backend)` — kaldes ved opstart fra `index.ts`
- **Konfigurerer** primær backend + reservebackends via `configure(primary, fallbacks)`
- **Router** CRUD-handlinger/søgninger til den primære backend med en kæde af reservebackends ved fejl
- **Kontrollerer tilstanden** for alle backends regelmæssigt

**Reserveadfærd:**

| Handling | Primær               | Reservebackends                        |
| -------- | -------------------- | -------------------------------------- |
| `create` | ✅ Kun primær        | ❌                                     |
| `get`    | ✅ Prøv primær først | ✅ Reserve, hvis resultatet er null    |
| `update` | ✅ Kun primær        | ✅ Synkronisering uden at afvente svar |
| `delete` | ✅ Kun primær        | ✅ Synkronisering uden at afvente svar |
| `list`   | ✅ Kun primær        | ❌                                     |
| `search` | ✅ Primær først      | ✅ Reserve ved fejl                    |

#### GenericMemoryBackend (`genericBackend.ts`)

En generisk HTTP-connector, der tilpasser enhver REST-API til en MemoryBackend. Nyttig til:

- **Notion** — opret forbindelse via Notion API
- **Obsidian** — opret forbindelse via Obsidian Local REST API
- **Brugerdefinerede backends** — enhver tjeneste, der eksponerer en RESTful hukommelses-API

**Konfiguration:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Backend-API'ens basis-URL
  apiKey?: string;           // Bearer-token til godkendelse
  headers?: Record<string, string>;  // Tilpassede HTTP-headere
  timeout?: number;          // Timeout for anmodning (standard: 30000ms)
  backendType?: string;      // Til logning

  // Tilsidesættelser af endpoints (standardværdier bruger REST-konventioner)
  endpoints?: {
    search?: string;   // standard: "/memories/search"
    create?: string;   // standard: "/memories"
    list?: string;     // standard: "/memories"
    get?: string;      // standard: "/memories/{id}"
    update?: string;   // standard: "/memories/{id}"
    delete?: string;   // standard: "/memories/{id}"
    health?: string;   // standard: "/health"
  };

  // Tilknytninger af navne på forespørgselsparametre
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Tilknytninger af navne på stiparametre
  pathParams?: {
    id?/memoryId?
  };
}
```

**Kendte backends** er forhåndskonfigureret i `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend, der peger på localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend, der peger på api.notion.com/v1
```

#### Indbyggede backends

##### SQLiteBackend (`sqliteBackend.ts`)

Den primære standardbackend. Omslutter det eksisterende SQLite-baserede hukommelseslager ved hjælp af `src/lib/memory/store.ts`. Registreres automatisk ved opstart.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Omslutter den eksisterende Obsidian-integration (`src/lib/memory/obsidianBackend.ts`). Opretter forbindelse til en Obsidian-boks via Obsidian Local REST API.

### Indstillinger

Indstillinger for hukommelsesbackends gemmes i appens indstillingstabel og administreres via `src/lib/memory/settings.ts`:

| Indstilling            | Miljø-/konfigurationsnøgle | Standard   | Beskrivelse                                      |
| ---------------------- | -------------------------- | ---------- | ------------------------------------------------ |
| Primær backend         | `memoryPrimaryBackend`     | `"sqlite"` | ID for den primære backend                       |
| Reservebackends        | `memoryFallbackBackends`   | `[]`       | Prioriteret liste over ID'er for reservebackends |
| Backendkonfigurationer | `memoryBackendConfigs`     | `{}`       | Konfigurationstilsidesættelser pr. backend       |

Indstillinger normaliseres via `normalizeMemorySettings()` og cachelagres i `getMemorySettings()`.

### Initialiseringsforløb

```
Opstart af appen
  → import fra index.ts (sideeffekt): registrerer SQLiteBackend
  → initMemoryBackends() kaldes fra appens livscyklus:
      1. Indlæs indstillinger (getMemorySettings)
      2. Konfigurer primær backend + reservebackends
      3. Initialiser alle backends (tilstandskontrol)
      4. Klar til anmodninger
```

### Tilføjelse af en ny backend

1. **Implementer `MemoryBackend`**-interfacet i `src/lib/memory/<name>Backend.ts`
2. **Eksportér** fra `src/lib/memory/index.ts`
3. **Registrer** med `memoryManager.register(yourBackend)` ved opstart
4. **Konfigurer** via indstillinger: Angiv `memoryPrimaryBackend` som ID'et for din backend
5. **Test** med `src/lib/memory/__tests__/generic-backend.test.ts` som reference

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

### Verifikation

#### Enhedstests

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Forventet output: **35 tests, alle gennemført** med dækning af:

- Konstruktør (2)
- Tilstandskontrol (4) — gennemført, fejl 500, netværksfejl, svartid
- Initialisering (2) — gennemført, fejl
- Oprettelse (2) — standardendpoint, tilpasset endpoint
- Hentning (4) — gennemført, 404 → null, ikke-404 udløser fejl, tilpassede stiparametre
- Opdatering (2) — gennemført, 404 → false
- Sletning (2) — gennemført, 404 → false
- Visning (2) — forespørgselsparametre, tilpassede parameternavne
- Søgning (3) — forespørgselsparametre, tilpasset endpoint, serialisering af indstillinger
- Godkendelsesheadere (2) — Bearer-token, tilpassede headere
- Fabrik (1)

#### Typekontrol

```bash
npm run typecheck:core
```

Forventet: **0 fejl**.
