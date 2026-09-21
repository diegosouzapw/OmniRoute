# Memory System (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Bron van waarheid:** `src/lib/memory/` en `src/app/api/memory/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40 (standaard uitgeschakeld + inhaalslag voor int8-kwantisatie)

OmniRoute biedt permanent gespreksgeheugen, gekoppeld aan een API-sleutel (en
optioneel een sessie-id). Herinneringen worden automatisch uit LLM-antwoorden
geëxtraheerd via lichtgewicht patroonherkenning met reguliere expressies en
opnieuw in volgende verzoeken geïnjecteerd als een voorafgaand systeembericht
(of als eerste gebruikersbericht voor providers die de systeemrol weigeren).

> **Geheugen is standaard UITGESCHAKELD (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> is nu `false` (`src/lib/memory/settings.ts`). Als geheugen wordt ingeschakeld,
> wordt maximaal `maxTokens` (~2k) aan opgehaalde context in **elk** chatverzoek
> geïnjecteerd, wat in rekening wordt gebracht — een onverwachte kostenpost voor
> nieuwe installaties en voor clients die hun eigen context beheren. Schakel dit
> expliciet in via **Instellingen → Geheugen** (de `MemorySkillsTab` toont een
> waarschuwing over tokenkosten wanneer geheugen is ingeschakeld). Een client kan
> geheugen voor één verzoek uitschakelen met de verzoekheader
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — zie de tabel met verzoekheaders in
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Een verzoek zonder geheugen
> stelt `memoryOwnerId = null` in, waardoor **zowel** geheugeninjectie als
> vaardigheidsinjectie voor dat verzoek wordt uitgeschakeld
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Geheugen is **afgebakend per API-sleutel**, niet per gebruiker — elk verzoek dat
met dezelfde API-sleutel wordt geauthenticeerd, deelt dezelfde geheugenverzameling,
met optionele verdere afbakening via `sessionId`.

## Architectuur

```
Client → /v1/chat/completions (apiKeyInfo eerder bepaald)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # haalt id op
    → getMemorySettings()                     # instellingen in cache
    → shouldInjectMemory(body, {enabled})     # controlepoort
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + optioneel vector
    → injectMemory(body, memories, provider)  # systeem- of gebruikersbericht
  → aanroep van upstream-provider
  → bij antwoord: extractFacts(text, apiKeyId, sessionId)  # niet-blokkerend
    → setImmediate → createMemory(fact) per overeenkomst
                   → embed(content) + upsertVector(id, vec)
```

De aanroeplocaties voor injectie en extractie zijn gekoppeld in
`open-sse/handlers/chatCore.ts` (zoek naar `retrieveMemories`, `injectMemory`
en `extractFacts`).

## Engine-architectuur (resolutie met 3 niveaus)

De Memory Engine bepaalt tijdens runtime het ophaalpad op basis van de
beschikbare infrastructuur en instellingen. Er bestaan drie niveaus, toegepast
in volgorde van prioriteit:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 0 — Trefwoord (FTS5)                                 │
  │  Beschikbaarheid bepaald via een controle: FTS5 wanneer de   │
  │  SQLite-build dit ondersteunt (better-sqlite3 / node:sqlite /│
  │  bun:sqlite); niet beschikbaar in builds zonder FTS5 (bijv.  │
  │  sql.js/WASM — "no such module: fts5"). Gebruikt wanneer     │
  │  strategy = "exact" of als terugvaloptie; de trefwoordstatus │
  │  van de engine weerspiegelt de controle.                     │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 1 — Ingebedde vector (sqlite-vec)                    │
  │  sqlite-vec v0.1.9 geladen via db.loadExtension().            │
  │  KNN-brute-force over Float32-vectoren. Actief wanneer:      │
  │   • sqlite-vec loadExtension slaagt                          │
  │   • Een bron voor embeddings beschikbaar is (remote | static│
  │     | transformers) die een Float32Array kan produceren      │
  │   • De tabel vec_memories bestaat (aangemaakt bij de eerste  │
  │     ready())                                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 2 — Qdrant (optionele externe vectordatabase)        │
  │  Indien ingeschakeld, vervangt dit sqlite-vec voor semantic/ │
  │  hybrid. Vereist een actieve Qdrant-instantie en een         │
  │  geconfigureerde host/poort.                                │
  └─────────────────────────────────────────────────────────────┘
```

Degradatie verloopt automatisch en transparant:

- Als sqlite-vec niet kan worden geladen, is niveau 1 niet beschikbaar → er
  wordt teruggevallen op niveau 0.
- Als de bron voor embeddings een fout retourneert, valt niveau 1 terug op
  niveau 0.
- Als Qdrant niet goed functioneert, valt niveau 2 terug op niveau 1 (of op
  niveau 0 als niveau 1 eveneens niet beschikbaar is).

## Embeddingbronnen

De embeddinglaag (`src/lib/memory/embedding/`) bepaalt welke bron moet worden gebruikt
op basis van `MemorySettingsExtended.embeddingSource`:

| Bron           | Beschrijving                                                                           | Sleutel vereist | Koude start      |
| -------------- | -------------------------------------------------------------------------------------- | --------------- | ---------------- |
| `remote`       | Gebruikt de embedding-API van een geconfigureerde provider (OpenAI, Cohere, enz.)      | Ja              | Geen             |
| `static`       | Lokale embedding via een opzoektabel met `potion-base-8M` (WordPiece + mean pooling)   | Nee             | ~200ms           |
| `transformers` | Lokale ONNX-inferentie via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`          | Nee             | ~3s + ~400MB RAM |
| `auto`         | Resolutie tijdens runtime: remote (als sleutel bestaat) → static → transformers → null | Hangt ervan af  | Hangt ervan af   |

**Resolutievolgorde voor `auto`:**

1. Zoek de eerste provider in `listEmbeddingProviders()` waarvoor `hasKey === true` → `remote`.
2. Als `settings.staticEnabled === true` → `static`.
3. Als `settings.transformersEnabled === true` → `transformers`.
4. Anders → `null` (valt terug op zoeken met FTS5-trefwoorden).

De embeddingcache (`src/lib/memory/embedding/cache.ts`) gebruikt een LRU-map in het geheugen,
met `${source}:${model}:${dim}:${sha256(text)}` als sleutel, beperkt tot
`MEMORY_EMBEDDING_CACHE_MAX` vermeldingen (standaard 1000) met een TTL van
`MEMORY_EMBEDDING_CACHE_TTL_MS` (standaard 5 min). Deze wordt gedurende de levenscyclus
van het proces door alle aanroepers gedeeld.

## Hybride RRF (k=60)

Wanneer `strategy = "hybrid"` en de vectoropslag beschikbaar is, gebruikt het ophalen
Reciprocal Rank Fusion om FTS5- en vectorresultaten samen te voegen:

```
RRF(d) = Σ  1 / (k + rank_i(d))      waarbij k = 60 (configureerbaar via MEMORY_RRF_K)
          i
```

Concreet:

1. Voer een FTS5-zoekopdracht uit → gerangschikte lijst `R_fts` (positie 1..N).
2. Voer een KNN-vectorzoekopdracht uit → gerangschikte lijst `R_vec` (positie 1..M).
3. Voor elke unieke `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 indien niet in de lijst).
4. Sorteer op `rrf_score` DESC en pas vervolgens de verwerking volgens het tokenbudget toe.

Van RRF is bekend dat het effectief is zonder dat scorenormalisatie tussen
heterogene ophaalsystemen nodig is. De standaardwaarde `k=60` is afkomstig uit het
oorspronkelijke artikel van Cormack et al. en werkt goed voor kleine corpora (<10k herinneringen).

## Backfill (lui + herindexering)

Wanneer het embeddingmodel verandert (gedetecteerd via `embedding_signature`), wordt de
vectoropslag opnieuw opgebouwd en worden alle bestaande herinneringen in de tabel
`memories` gemarkeerd met `needs_reindex = 1`.

**Luie backfill**: Bij de volgende ophaalactie wordt elke herinnering zonder vectorvermelding
geëmbed en vóór de zoekopdracht in `vec_memories` ingevoegd. Hierdoor worden de kosten
van de backfill over daadwerkelijke aanvragen verdeeld zonder het opstarten te blokkeren.

**Expliciete herindexering**: Het tabblad Engine in `/dashboard/memory` bevat een knop
"Nu herindexeren" die `POST /api/memory/reindex` aanroept. De handler roept
`runReindexBatch()` aan vanuit `src/lib/memory/reindex.ts`, waarmee per aanvraag maximaal
`limit` openstaande vermeldingen worden verwerkt. De voortgang kan worden opgevraagd via
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

De tabel `memory_vec_meta` (migratie `083_memory_vec.sql`) slaat het volgende op:

- `active_dim` — huidige vectordimensie (null = nog niet gekalibreerd).
- `embedding_signature` — `${source}:${model}:${dim}`, gebruikt om wijzigingen te detecteren.
- `last_reset_at` — tijdstempel van de laatste volledige reset.
- `vec_loaded` — 0/1-vlag die aangeeft of sqlite-vec succesvol is geladen.

## Instellingenuitbreiding

Negen velden voor embeddings en vectoren zijn beschikbaar in `MemorySettingsExtended` in
`src/shared/schemas/memory.ts` en worden opgeslagen via `src/lib/db/settings.ts`:

| Veld                     | Type                                               | Standaard | Beschrijving                                                                |
| ------------------------ | -------------------------------------------------- | --------- | --------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`  | Welke embeddingbron moet worden gebruikt                                    |
| `embeddingProviderModel` | `string \| null`                                   | `null`    | Provider/model in de notatie `provider/model`                               |
| `customBaseUrl`          | `string \| null`                                   | `null`    | Alleen voor geheugen bestemde OpenAI-compatibele basis-URL van het endpoint |
| `customModelId`          | `string \| null`                                   | `null`    | Model-ID dat naar het aangepaste endpoint wordt verzonden                   |
| `transformersEnabled`    | `boolean`                                          | `false`   | Opt-in voor Transformers.js (MiniLM, ~400 MB)                               |
| `staticEnabled`          | `boolean`                                          | `false`   | Opt-in voor het lokale statische model potion-base-8M                       |
| `rerankEnabled`          | `boolean`                                          | `false`   | Herrangschikkingsstap inschakelen (voegt +200-500 ms/verzoek toe)           |
| `rerankProviderModel`    | `string \| null`                                   | `null`    | Provider/model voor herrangschikking in de notatie `provider/model`         |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`  | Welke vectorbackend moet worden gebruikt                                    |

Deze zijn beschikbaar via `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Voor de bron `remote` accepteert Memory ook de optionele instellingen `customBaseUrl` en
`customModelId`. Samen selecteren ze een OpenAI-compatibel `/embeddings`-endpoint
en model zonder het globale embeddingregister te wijzigen. Het endpoint wordt vóór
gebruik genormaliseerd en gecontroleerd aan de hand van het beleid van de provider
voor uitgaande URL's: HTTP(S) is vereist, ingesloten aanmeldgegevens en querystrings
worden geweigerd en cloudmetadata-adressen blijven geblokkeerd. Lege waarden behouden
de geselecteerde registerprovider. Fouten die aan het dashboard worden geretourneerd,
worden opgeschoond en endpointaanmeldgegevens worden nooit gelogd.

> **TODO (D20):** Het bereik `global` (geheugens delen tussen alle API-sleutels) is
> niet geïmplementeerd in deze release. Hiervoor zijn schemawijzigingen en een globaal
> ophaalpad vereist. Houd dit afzonderlijk bij.

## Opslaglagen

### Primair: SQLite (`memories`-tabel)

Aangemaakt door migratie `015_create_memories.sql`:

| Kolom                       | Type               | Opmerkingen                                                                       |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID gegenereerd via `crypto.randomUUID()`                                        |
| `api_key_id`                | `TEXT NOT NULL`    | API-sleutel van de eigenaar                                                       |
| `session_id`                | `TEXT`             | Optioneel bereik per gesprek                                                      |
| `type`                      | `TEXT NOT NULL`    | Een van `factual`, `episodic`, `procedural`, `semantic`                           |
| `key`                       | `TEXT`             | Stabiele upsertsleutel, bijvoorbeeld `preference:i_prefer_python`                 |
| `content`                   | `TEXT NOT NULL`    | De daadwerkelijke tekst van het feit                                              |
| `metadata`                  | `TEXT`             | JSON-blob (categorie, extractedAt, bron, ...)                                     |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601-tekenreeksen                                                             |
| `expires_at`                | `TEXT`             | Optionele vervaldatum; `NULL` betekent permanent                                  |
| `memory_id`                 | `INTEGER UNIQUE`   | Toegevoegd door `023_fix_memory_fts_uuid.sql` om UUID's ↔ FTS5-rowids te koppelen |

Indexen: `api_key_id`, `session_id`, `type`, `expires_at`, plus de unieke
`memory_id`-index.

**Upsert-semantiek**: `createMemory()` zoekt naar een bestaande rij met dezelfde
`(api_key_id, key)` en werkt deze ter plaatse bij wanneer die wordt gevonden (waarbij
`metadata` via een oppervlakkige spread wordt samengevoegd). Dit voorkomt dat de tabel
onbegrensd groeit bij herhaalde voorkeursverklaringen.

### Zoeken in volledige tekst (virtuele tabel `memory_fts`)

`022_add_memory_fts5.sql` maakt een virtuele FTS5-tabel aan voor `content` en
`key`. `023_fix_memory_fts_uuid.sql` verhelpt een praktijkbug waarbij de primaire
UUID-sleutel niet kon worden gekoppeld aan de integer-rowid van FTS5 — de migratie voegt
de kolom `memory_id` toe, maakt de FTS-tabel opnieuw aan en configureert triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) die FTS gesynchroniseerd houden bij
INSERT, DELETE en UPDATE.

Wordt door `retrieval.ts` gebruikt voor de strategieën `semantic` en `hybrid` (zie hieronder).
De ophaalcode voert een controle uit met `hasTable("memory_fts")` en valt terug op
chronologische volgorde als de FTS-tabel ontbreekt of de FTS-query een fout veroorzaakt.

### Optioneel: Qdrant (vectoropslag van niveau 2)

`src/lib/memory/qdrant.ts` implementeert een optionele Qdrant-integratie als vectoropslag
van niveau 2. Ophalen wordt alleen naar Qdrant gerouteerd wanneer de engine-selector
`memoryVectorStore === "qdrant"` is — de standaardwaarde `"auto"` (en `"sqlite-vec"`)
selecteert Qdrant **nooit**. De schakelaar op het tabblad Engine stelt **zowel**
`qdrantEnabled` als `memoryVectorStore` gelijktijdig in: inschakelen maakt Qdrant de
primaire opslag, terwijl uitschakelen de instelling terugzet op `"auto"` (#5597 — vóór
die correctie had inschakelen geen effect omdat niets de engine-selector instelde).
Als Qdrant onbereikbaar is of niets retourneert, valt het ophalen terug op
sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — embedt `key + content` met het geconfigureerde
  embeddingmodel, zorgt dat de collectie bestaat (maakt bij het eerste gebruik
  vectoren met cosinusafstand aan) en voegt een punt toe of werkt het bij met payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — embedt de query, doorzoekt de
  collectie, gefilterd op `kind = "omniroute_memory"` en optioneel op
  `apiKeyId` / `sessionId`. Begrensd `topK` tot `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — verwijdert één punt. Wordt aangeroepen door
  `deleteMemory()` nadat de SQLite-rij is verwijderd (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — verwijdert in bulk punten waarvan
  `expiresAtUnix` in het verleden ligt of waarvan `createdAtUnix` ouder is dan de
  bewaarlimiet. Telt deze eerst, zodat het dashboard de werkelijke aantallen kan tonen.
- `checkQdrantHealth()` — `GET /readyz`-statuscontrole met latentie.

De instellingeninterface biedt Qdrant-configuratie, een statuscontrole, een semantische zoektest
en opschoning op het tabblad **Engine** van `/dashboard/memory`. De bijbehorende
routes onder `src/app/api/settings/qdrant/` zijn allemaal aangesloten sinds v3.8.6:

| Route                                   | Methode       | Beschrijving                            |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant-instellingen lezen / bijwerken   |
| `/api/settings/qdrant/health`           | `GET`         | Beschikbaarheidscontrole + latentie     |
| `/api/settings/qdrant/search`           | `POST`        | Semantische zoektest                    |
| `/api/settings/qdrant/cleanup`          | `POST`        | Verlopen / oude punten verwijderen      |
| `/api/settings/qdrant/embedding-models` | `GET`         | Beschikbare embeddingmodellen weergeven |

**Gedragsopmerkingen (wat u kunt verwachten):**

- **Engineselectie** — wanneer Qdrant op het tabblad Engine wordt ingeschakeld, wordt
  dit de primaire opslag (stelt `memoryVectorStore="qdrant"` in); uitschakelen zet dit
  terug op `"auto"` (#5597).
- **Geen backfill** — alleen geheugens die **nadat** Qdrant is ingeschakeld worden
  aangemaakt/bijgewerkt, worden ernaar geschreven (asynchrone dubbele schrijfbewerking).
  Reeds bestaande SQLite-geheugens worden **niet** gemigreerd; "Nu opnieuw indexeren"
  bouwt alleen de sqlite-vec-index opnieuw op, niet Qdrant.
- **Vectordimensie wordt automatisch gedetecteerd** aan de hand van de daadwerkelijke
  embedding bij het eerste gebruik — er hoeft geen dimensieveld te worden ingevuld. Het
  wijzigen van het embeddingmodel nadat een collectie bestaat, wordt **niet** automatisch
  afgehandeld: de bestaande collectie blijft ongewijzigd, schrijfbewerkingen/zoekopdrachten
  met niet-overeenkomende dimensies mislukken en vallen terug op sqlite-vec. Maak de
  collectie opnieuw aan (nieuwe naam, of verwijder deze in Qdrant) om van embedder te wisselen.
- **Afstandsmetriek** — altijd **Cosine** (hardgecodeerd bij het aanmaken van de collectie;
  niet configureerbaar).
- **Authenticatie** — alleen API-sleutel (verzonden als de `api-key`-header; optioneel voor
  niet-geverifieerde lokale Docker). JWT/RBAC worden niet gebruikt.
- **Configuratievelden** — de interface biedt `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` zijn alleen beschikbaar via omgeving/database
  en `vectorSize` wordt niet gebruikt bij het aanmaken van de collectie (de dimensie is
  afkomstig van de embedding).

### Vectorkwantisatie (int8 — opt-in, beide backends)

Beide vectorbackends ondersteunen **optionele int8-kwantisatie** om de geheugenvoetafdruk
van opgeslagen vectoren te verkleinen (~4× kleiner dan Float32), ten koste van een licht
verlies aan recall. De standaardinstelling is voor beide **uit** — vectoren behouden hun
volledige precisie, tenzij dit expliciet wordt ingeschakeld.

| Backend    | Instelling                           | Type                           | Standaard | Waar uitgelezen                                             |
| ---------- | ------------------------------------ | ------------------------------ | --------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB-sleutel)    | `"none" \| "int8" \| "binary"` | `"none"`  | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (omgeving) | `"none" \| "int8"`             | `"none"`  | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** wordt per instantie geconfigureerd via de instellingssleutel
  `qdrantQuantization` (beschikbaar als het veld `quantization` bij
  `PUT /api/settings/qdrant`). Bij `"int8"` vraagt `buildQuantizationConfig()`
  scalaire kwantisatie aan (`always_ram`, kwantiel `0.99`) en schakelen
  zoekopdrachten `rescore: true` in, zodat de vectoren met volledige precisie
  de int8-kandidatenset verfijnen.
- **sqlite-vec**-kwantisatie is **alleen via de omgeving** beschikbaar (geen
  database-instelling): stel `MEMORY_VEC_QUANTIZATION=int8` in om de lokale
  vectoren via `vec_quantize_int8(?, 'unit')` als een `int8[dim]`-kolom op te
  slaan. De gekozen modus wordt opgenomen in de `embedding_signature` (een
  `:int8`-achtervoegsel), zodat het wisselen van modus een volledige herindexering
  van de tabel `vec_memories` activeert — hetzelfde pad voor luie backfill dat
  wordt gebruikt wanneer het embeddingmodel verandert.

## Geheugentypen

`MemoryType` (`src/lib/memory/types.ts`):

| Type         | Gebruikt voor                                                                     |
| ------------ | --------------------------------------------------------------------------------- |
| `factual`    | Voorkeuren, stabiele gebruikersfeiten, gedragspatronen                            |
| `episodic`   | Beslissingen gekoppeld aan een specifiek moment ("Ik koos Postgres")              |
| `procedural` | Workflow-/werkwijzegeheugen (gereserveerd; momenteel geen automatische extractor) |
| `semantic`   | Gereserveerd voor vector-store-items                                              |

De ophaalstrategie van `MemoryConfig` is `exact`, `semantic` of `hybrid`,
en het bereik is `session`, `apiKey` of `global`. Het standaardbereik van
`getMemorySettings()` is `apiKey`.

## Feitenextractie (`extraction.ts`)

Extractie is **gebaseerd op reguliere expressies**, niet op een LLM — deze wordt in-process uitgevoerd met
`setImmediate()`, zodat de responsstream nooit wordt geblokkeerd:

- **Voorkeurspatronen** → `MemoryType.FACTUAL`
  (bijv. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Beslissingspatronen** → `MemoryType.EPISODIC`
  (bijv. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Gedragspatronen** → `MemoryType.FACTUAL`
  (bijv. `I usually …`, `I always …`, `I tend to …`)

Elke overeenkomst wordt opgeschoond (`trim`, witruimte samengevoegd, beperkt tot 500 tekens),
binnen de batch gededupliceerd via een stabiele `factKey(category, content)`, en
opgeslagen via `createMemory()` met metadata
`{category, extractedAt, source: "llm_response"}`. Invoertekst is beperkt tot
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — wanneer de tekst langer is, wordt het **einde** van de tekst
gebruikt, zodat de meest recente assistentinhoud altijd wordt meegenomen.

`extractFactsFromText(text)` wordt geëxporteerd voor tests en retourneert de gestructureerde
feiten zonder ze op te slaan.

## Ophalen (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` is het belangrijkste toegangspunt. De functie:

1. Normaliseert en valideert de configuratie via `MemoryConfigSchema`.
2. Retourneert onmiddellijk `[]` wanneer `enabled` false is of `maxTokens <= 0`.
3. Begrensd `maxTokens` tot `[1, 8000]`.
4. Detecteert of de moderne tabel `memories` bestaat (in plaats van de verouderde tabel `memory`),
   zodat oudere databases blijven werken.
5. Bouwt de basisquery met een vervalvoorwaarde
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), een optioneel
   sessiebereik en een optionele `retentionDays`-grens.
6. Maakt een vertakking op basis van de strategie:
   - **`exact`** (standaard): chronologisch met `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: als `config.query` is opgegeven en `memory_fts` bestaat, wordt
     `memory_fts MATCH ?` via een JOIN gekoppeld en op FTS-rangschikking gesorteerd; er wordt teruggevallen op chronologische
     resultaten wanneer FTS 0 rijen retourneert.
   - **`hybrid`**: een combinatie van FTS-resultaten (hogere relevantie) en de
     chronologische set, gededupliceerd op id.
7. Berekent een relevantiescore op basis van trefwoorden (`getRelevanceScore`) voor
   `content`, `key` en de JSON in `metadata` wanneer een query is opgegeven. Rijen met
   een score van nul worden uitgefilterd.
8. Sorteert aflopend op score en vervolgens aflopend op `createdAt`.
9. Doorloopt de gerangschikte lijst en accepteert items zolang een doorlopende
   `estimateTokens(content)` (≈ `length / 4`) binnen het budget blijft. Retourneert
   altijd ten minste één item wanneer er een overeenkomst is.

`estimateTokens` wordt geëxporteerd en gebruikt door de ophaalfunctie, de samenvattingsfunctie en de MCP-tool
`omniroute_memory_search`.

## Injectie (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Voegt alle geheugeninhoud samen tot één tekenreeks `Memory context: …`.
2. Kiest een strategie op basis van de providernaam:
   - **Systeembericht** (standaard voor OpenAI, Anthropic, Gemini, …) — voegt
     een `{role: "system", content: memoryText}` toe vóór bestaande
     systeemberichten, zodat systeemprompts van gebruikers voorrang blijven houden.
   - **Gebruikersbericht** (terugvaloptie) — voor providers in
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Deze weigeren de systeemrol
     en zouden anders een 400-fout retourneren (zie issue #1701 voor GLM/Zhipu).
3. Logt het aantal, de strategie en het model onder `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` wordt geëxporteerd voor aanroepers die
zelf routeringsbeslissingen moeten nemen. Onbekende providers gebruiken voor de
veiligheid standaard `true` (systeemrol toegestaan).

## Instellingen (`settings.ts`)

De geheugenconfiguratie wordt **opgeslagen in de instellingentabel van de DB**,
niet in omgevingsvariabelen. `getMemorySettings()` leest uit `getSettings()` en
cachet het resultaat binnen het proces; `invalidateMemorySettingsCache()` wordt
na schrijfbewerkingen aangeroepen door de PUT-route voor instellingen.

### Verouderde velden (alle versies)

| DB-sleutel            | Type    | Standaardwaarde                                     | UI-besturingselement                                             |
| --------------------- | ------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (standaard uitgeschakeld sinds v3.8.30)     | Geheugen aan/uit                                                 |
| `memoryMaxTokens`     | integer | `2000` (bereik `0–16000`)                           | Tokenbudget voor injectie                                        |
| `memoryRetentionDays` | integer | `30` (bereik `1–365`)                               | Bewaarperiode                                                    |
| `memoryStrategy`      | enum    | `"hybrid"` (één van `recent`, `semantic`, `hybrid`) | Ophaalstrategie                                                  |
| `skillsEnabled`       | boolean | `false`                                             | Schakelt vaardigheidsinjectie per sleutel in/uit (zie SKILLS.md) |

Opmerking: de UI-strategie `"recent"` wordt via `toMemoryRetrievalConfig()`
toegewezen aan de interne ophaalstrategie `"exact"` (chronologische volgorde).

### Nieuwe velden (v3.8.6, plan 21 D9)

Zie ook de sectie "Uitbreiding van instellingen" hierboven voor beschrijvingen
van de velden.

| DB-sleutel                  | API-veld                 | Standaardwaarde |
| --------------------------- | ------------------------ | --------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`        |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`          |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`         |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`         |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`         |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`          |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`        |

Qdrant-gerelateerde DB-sleutels (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` met standaardwaarde `"omniroute_memory"`,
`qdrantEmbeddingModel` met standaardwaarde `"openai/text-embedding-3-small"`)
worden gelezen door `normalizeQdrantConfig()` in `qdrant.ts`.

### Omgevingsvariabelen (v3.8.6)

Zes optionele omgevingsvariabelen stemmen het runtimegedrag van de engine af
(gedocumenteerd in `.env.example`):

| Variabele                       | Standaardwaarde            | Beschrijving                                                                                                                                 |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL van de embeddingcache (5 min)                                                                                                            |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maximumaantal items in de LRU-cache voor embeddings                                                                                          |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF-repository voor het Transformers.js-model                                                                                                 |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF-repository voor het statische potion-model                                                                                                |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Locatie waar gedownloade modellen worden opgeslagen                                                                                          |
| `MEMORY_VEC_TOP_K`              | `20`                       | Standaardwaarde voor top-K bij vectorzoekopdrachten                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | RRF-k-constante voor hybride zoekopdrachten                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Stel in op `int8` om lokale sqlite-vec-vectoren gekwantiseerd op te slaan (~4× kleiner; opt-in). Een moduswijziging dwingt herindexering af. |

## Samenvatting (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` comprimeert oudere
inhoud wanneer het totale aantal tokens van de geheugens van een sleutel het
budget overschrijdt. De functie doorloopt rijen aflopend op `created_at`, behoudt
rijen die passen en vervangt voor de overige rijen `content` ter plaatse door de
eerste drie zinnen van het origineel. `tokensSaved` is het verschil in
`estimateTokens` tussen de oude en nieuwe inhoud.

Deze routine is **beschikbaar, maar wordt niet automatisch aangeroepen** in de
huidige chatpipeline — roep deze aan vanuit een cron-taak, een beheerdersactie of
`MemoryConfig.autoSummarize`-koppelcode als doorlopende compressie nodig is. Het
gegevensverlies is onomkeerbaar: de oorspronkelijke tekst wordt overschreven.

## REST-API

Alle endpoints vereisen beheerdersauthenticatie (`requireManagementAuth`).

### Kernendpoints voor geheugen (bestaand + bijgewerkt)

| Methode  | Pad                  | Beschrijving                                                                                                                                                                                        |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Gepagineerde lijst met filters: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Respons bevat `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                     |
| `POST`   | `/api/memory`        | Item aanmaken (gevalideerd met Zod: `content`, `key`, optioneel `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Roept `createMemory()` aan, die een upsert uitvoert op `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Eén item ophalen op basis van UUID                                                                                                                                                                  |
| `PUT`    | `/api/memory/[id]`   | Itemvelden bijwerken (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Synchroniseert ook de vector als een bron voor embeddings beschikbaar is.                               |
| `DELETE` | `/api/memory/[id]`   | Een item verwijderen; verwijdert dit ook uit `vec_memories` (D15) en waar mogelijk uit Qdrant. Retourneert 404 wanneer het item ontbreekt.                                                          |
| `GET`    | `/api/memory/health` | Voert `verifyExtractionPipeline("health-check")` uit — volledige cyclus aanmaken→weergeven→verwijderen. Retourneert `{working, latencyMs, error?}`                                                  |

### Nieuwe endpoints voor de geheugenengine (plan 21)

| Methode | Pad                               | Beschrijving                                                                                                                                                                                 |
| ------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`  | `/api/memory/retrieve-preview`    | Proefuitvoering van `retrieveMemories` — retourneert gerangschikte resultaten met score, niveau en tokens. Body: `RetrievePreviewSchema`. Injecteert of wijzigt GEEN geheugens.              |
| `GET`   | `/api/memory/embedding-providers` | Geeft providers met embeddingmodellen weer en vermeldt voor welke een API-sleutel is geconfigureerd.                                                                                         |
| `GET`   | `/api/memory/engine-status`       | Retourneert de volledige enginestatus: trefwoordniveau, embeddingresolutie, vectoropslagstatistieken, Qdrant-status en configuratie voor herrangschikking. Vorm: `MemoryEngineStatusSchema`. |
| `POST`  | `/api/memory/summarize`           | Handmatig geheugencompressie starten. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Retourneert `{candidates, tokensSaved}`.                                       |
| `POST`  | `/api/memory/reindex`             | Vectorherindexering starten voor geheugens met `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Retourneert `{started, pending}`.                                                   |

### Instellingenendpoints

| Methode | Pad                                     | Beschrijving                                                                                                         |
| ------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/memory`                  | Huidige genormaliseerde `MemorySettingsExtended` (7 nieuwe velden + verouderde velden)                               |
| `PUT`   | `/api/settings/memory`                  | Elk veld uit `MemorySettingsExtendedSchema` bijwerken (in totaal 12 velden)                                          |
| `GET`   | `/api/settings/qdrant`                  | Huidige Qdrant-instellingen (`QdrantSettingsSchema`)                                                                 |
| `PUT`   | `/api/settings/qdrant`                  | Qdrant-instellingen bijwerken. Body: `QdrantSettingsUpdateSchema`. `apiKey` = lege tekenreeks verwijdert de sleutel. |
| `GET`   | `/api/settings/qdrant/health`           | Beschikbaarheidscontrole van het geconfigureerde Qdrant-exemplaar. Retourneert `QdrantHealthResultSchema`.           |
| `POST`  | `/api/settings/qdrant/search`           | Semantische zoektest in Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                                        |
| `POST`  | `/api/settings/qdrant/cleanup`          | Qdrant-punten voor verlopen/oude geheugens verwijderen.                                                              |
| `GET`   | `/api/settings/qdrant/embedding-models` | Embeddingmodellen weergeven die beschikbaar zijn voor Qdrant.                                                        |

De lijstquery van `/api/memory` ondersteunt paginering op basis van `page`
(`parsePaginationParams`) **of** een onbewerkte `offset` — wanneer `offset`
aanwezig is, heeft deze voorrang en wordt een afgeleide `page` berekend voor de
responsstructuur.

## MCP-tools (`open-sse/mcp-server/tools/memoryTools.ts`)

Wanneer de MCP-server is ingeschakeld, worden drie geheugentools geregistreerd:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → omhult `retrieveMemories()`. Sinds v3.8.6 (D16) wordt de `strategy`
  uit `getMemorySettings()` gelezen in plaats van hardgecodeerd als `"exact"`.
  Als `query` is opgegeven en `strategy` `semantic` of `hybrid` is, wordt indien
  beschikbaar de vectoropslag gebruikt.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → omhult `createMemory()`. Accepteert alleen de 4 canonieke typen:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → geeft
  overeenkomende items weer, filtert optioneel op tijdstempel van vóór de
  aanmaakdatum en verwijdert vervolgens elk item via `deleteMemory()` (waarmee
  ook vectoren uit sqlite-vec + Qdrant worden verwijderd).

Zie [MCP-SERVER.md](./MCP-SERVER.md) voor details over transport en bereik.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` is nu een **Studio met 3 tabbladen**:

### Tabblad: Geheugens

- Conceptkaart (inklapbare uitleg over "Hoe het werkt").
- Realtime lijst, zoeken en paginering (debounce van 300 ms).
- Typefilter (`factual` / `episodic` / `procedural` / `semantic` / alle).
- Modaal venster om geheugen toe te voegen (sleutel, inhoud, type).
- Inline bewerken (potloodknop → `PUT /api/memory/[id]`).
- Verwijderen per rij (met bevestigingsvenster).
- JSON-export van de huidige pagina; JSON-import via bestandskiezer.
- Statistiekkaarten: `totalEntries`, `tokensUsed`, `hitRate`.
- Knop "Oude items comprimeren" → `POST /api/memory/summarize` (een dry-run
  toont eerst het aantal kandidaten, waarna om bevestiging wordt gevraagd).
- Een groene/rode gezondheidsindicator aangestuurd door `GET /api/memory/health`.

### Tabblad: Speeltuin

- Queryinvoer + strategie-selector (Exact / Semantisch / Hybride) + tokenbudget.
- "Simuleren" → `POST /api/memory/retrieve-preview` — toont gerangschikte
  resultaten met `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Resolutiepaneel dat toont welke insluitingsbron/vectoropslag is gebruikt en
  of er een fallback heeft plaatsgevonden.

### Tabblad: Engine

- Statuspaneel van de engine (keyword-FTS5-chip, insluitingschip,
  vectoropslagchip, Qdrant-gezondheidschip, rerank-chip).
- Knop "Nu opnieuw indexeren" → `POST /api/memory/reindex`.
- Selector voor insluitingsbron (auto / remote / static / transformers +
  schakelaars).
- Qdrant-configuratiekaart (inschakelschakelaar, host/poort/verzameling/sleutel,
  verbinding testen, semantische zoektest, opschonen).
- Rerank-configuratiekaart (inschakelschakelaar, provider-/modelselector).

Geheugen- en Qdrant-instellingen zijn ook beschikbaar onder
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) voor
de oudere/globale instellingeninterface.

## Caching

`src/lib/memory/store.ts` bevat een procesinterne LRU-achtige cache
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, met verwijdering
van de oudste 20 %) voor `getMemory(id)`-leesbewerkingen, plus een generieke
sleutel-/waardelaag `memoryCache` (`src/lib/memory/cache.ts`) met de methoden
`get`/`set`/`invalidate`, die wordt gebruikt door aanroepers die hun eigen
afgebakende cache willen (LRU met 1 000 items, standaard-TTL van 5 min).

## Privacy en levenscyclus

- Het eigenaarschap van geheugenitems wordt bepaald door de API-sleutel-id (`resolveMemoryOwnerId` in
  `chatCore.ts`). Zonder een `apiKeyInfo.id` worden ophalen, injecteren en
  extraheren niet uitgevoerd.
- Items met een toekomstige `expires_at` worden bij het ophalen uitgefilterd; oude
  items die ouder zijn dan `retentionDays` worden uitgesloten door de
  `created_at >= cutoff`-clausule in `retrieveMemories`.
- Gebruik voor definitieve verwijdering `DELETE /api/memory/[id]` of `omniroute_memory_clear`.
- Extractie wordt via `setImmediate` gestart zonder erop te wachten; fouten worden gelogd onder
  `memory.extraction.background.failed` en worden nooit aan de aanroeper doorgegeven.
- Verificatierondgangen (`verifyExtractionPipeline`) ruimen hun eigen
  testitems op in een `finally`-blok.

## Zie ook

- [SKILLS.md](./SKILLS.md) — de instelling `skillsEnabled` injecteert tooldefinities
  naast geheugenitems.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-transport / bereiken.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — breder API-oppervlak.
- Bronmodules:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybride RRF
  - `src/lib/memory/embedding/index.ts` — embeddinglaag met meerdere bronnen
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-schema's voor alle bodies van de geheugen-API
  - `src/shared/schemas/qdrant.ts` — Zod-schema's voor Qdrant-instellingen/-bewerkingen
  - `src/lib/db/memoryVec.ts` — CRUD voor `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + subroutes
  - `src/app/(dashboard)/dashboard/memory/` — Studio-UI (pagina + componenten +
    tabbladen + hooks)
  - `open-sse/handlers/chatCore.ts` (koppeling voor injectie / extractie)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Een embeddingprovider kiezen (v3.8.16+)

De geheugenengine van OmniRoute ondersteunt **vier embeddingbronnen** (`src/lib/memory/embedding/`). Elke bron kent andere afwegingen op het gebied van **latentie, kosten, modelkwaliteit en complexiteit van de configuratie**.

### De embeddingbronnen

| Provider       | Bron                                            | Latentie                                    | Kosten               | Kwaliteit                             | Configuratie                                  |
| -------------- | ----------------------------------------------- | ------------------------------------------- | -------------------- | ------------------------------------- | --------------------------------------------- |
| `transformers` | Lokaal ONNX-model (Xenova/all-MiniLM-L6-v2)     | ~50-150ms (CPU)                             | Gratis               | Goed                                  | Alleen `npm install`                          |
| `static`       | Vooraf berekende vectoren (gecachet)            | <1ms                                        | Gratis               | N.v.t. (afhankelijk van cachetreffer) | Geen                                          |
| `remote`       | OpenAI- / Cohere- / Voyage-API                  | ~100-300ms                                  | $0.02-0.10/1M tokens | Uitstekend                            | API-sleutel                                   |
| `auto`         | Kiest tijdens runtime de beste beschikbare bron | Hetzelfde als de gekozen bron               | Gratis               | Hetzelfde als de gekozen bron         | Geen                                          |
| _(cache)_      | LRU-laag in het geheugen bovenop elke bron      | <1ms (treffer), volledige latentie (misser) | Gratis               | Hetzelfde als de onderliggende bron   | Altijd ingeschakeld (geen selecteerbare bron) |

### Beslisboom

```
                  Wat is je implementatiecontext?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 ONTW./TEST   KLEINE PROD.  GROTE PROD.  EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, geen API)         (beste kwaliteit) (geen internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Voeg er ALTIJD een `cache`-laag bovenop toe
            (LruCache verpakt elke provider)
```

### Database- en API-configuratie

Opties voor geheugenembeddings worden geconfigureerd via de instellingen-API/UI, niet via omgevingsvariabelen. De relevante databasesleutels onder Instellingen (`normalizeMemorySettings` in `src/lib/memory/settings.ts`) zijn:

- `memoryEmbeddingSource`: `"transformers"` (lokaal), `"remote"` (API-gebaseerd, bijvoorbeeld OpenAI), `"static"` (externe opslag) of `"auto"`
- `memoryEmbeddingProviderModel`: Model-ID voor externe/statische bronnen (bijvoorbeeld `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` of `"auto"`

#### Lokaal model (`transformers`)

Gebruikt intern transformers.js om lokale modellen uit te voeren:

```bash
# Omgevingsvariabelen die in de code worden gelezen (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-modelrepository
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statisch HF Potion-model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cachemap
```

#### LRU-embeddingcache

De cache is standaard altijd ingeschakeld en wordt geconfigureerd via omgevingsvariabelen:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maximumaantal gecachete items
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Prestatiecijfers

Benchmark op een typische x86-server met 4 cores (teksten van elk ~100 tokens):

| Aanbieder            | p50   | p95   | p99   | Kosten / 1 mln. embeddings         |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratis                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Afhankelijk van Qdrant-hosting     |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Gratis                             |

---

## Patronen voor feitenextractie (v3.8.16+)

De module `extraction.ts` (`src/lib/memory/extraction.ts`) gebruikt **patroonherkenning met reguliere expressies** om gestructureerde feiten uit conversatieberichten te extraheren. Inzicht in deze patronen helpt je de extractiekwaliteit af te stemmen op jouw gebruikssituatie.

### Standaardpatrooncategorieën

| Categorie           | Voorbeeldpatroon                                                       | Legt vast                           |
| ------------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| PREFERENCE_PATTERNS | `"Ik geef de voorkeur aan <X>"`, `"Ik vind <X> leuk"`, `"Ik haat <X>"` | Gebruikersvoorkeuren                |
| DECISION_PATTERNS   | `"Ik gebruik <X>"`, `"Ik heb besloten om <X>"`, `"Ik koos voor <X>"`   | Gebruikersbeslissingen (episodisch) |
| PATTERN_PATTERNS    | `"Ik doe meestal <X>"`, `"Ik doe altijd <X>"`, `"Ik doe nooit <X>"`    | Aanhoudende gedragspatronen         |

### Voorbeeldpatronen (vereenvoudigd)

```ts
// Uit src/lib/memory/extraction.ts
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

### Wat wordt geëxtraheerd

Wanneer een gebruiker zegt:

> "Ik geef de voorkeur aan TypeScript. Ik gebruik Postgres voor dit project. Ik commit altijd voordat ik push. Ik vind Python niet leuk."
> Extractie levert 4 herinneringen op:
>
> | Sleutel                              | Categorie  | Type       | Inhoud                      |
> | ------------------------------------ | ---------- | ---------- | --------------------------- |
> | `preference:typescript`              | voorkeur   | feitelijk  | "TypeScript"                |
> | `decision:postgres_for_this_project` | beslissing | episodisch | "Postgres voor dit project" |
> | `pattern:commit_before_pushing`      | patroon    | feitelijk  | "commit voordat ik push"    |
> | `preference:python`                  | voorkeur   | feitelijk  | "Python"                    |

### Extractielimieten

Om ongebreidelde extractie te voorkomen, gelden de volgende limieten:

| Minimale inhoudslengte | 3 tekens |
| Maximale inhoudslengte | 500 tekens |

### Wanneer extractie moet worden uitgeschakeld

Extractie wordt automatisch uitgevoerd wanneer het geheugen is ingeschakeld; er is geen afzonderlijke
schakelaar uitsluitend voor extractie. Schakel het geheugen volledig uit (`enabled: false`
via `PUT /api/settings/memory`) om dit uit te zetten. Overweeg dit wanneer:

- Je een groot berichtenvolume hebt en de extractiekosten niet verwaarloosbaar zijn
- Je conversaties voornamelijk tijdelijk zijn (chat, foutopsporing) en geen langetermijnwaarde hebben
- Je context al vastlegt via aangepaste plug-ins

---

## Hybride RRF-afstemming (v3.8.16+)

Het algoritme **Reciprocal Rank Fusion (RRF)** combineert resultaten van FTS5 (trefwoorden) en vectoren (semantisch). De parameter `k` bepaalt hoeveel gewicht wordt toegekend aan lager gerangschikte resultaten.

### De formule

Voor elke kandidaat-herinnering is de RRF-score:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Waarbij:

- `k` de constante is (standaard 60)
- `rank_i(d)` de positie van document `d` in het i-de zoeksysteem is (FTS, vector)
- De som over alle zoeksystemen loopt

### Hoe `k` de resultaten beïnvloedt

| `k`-waarde             | Effect                                                                                               | Het meest geschikt voor                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `k=0`                  | Zuivere rangfusie (geen afvlakking)                                                                  | Theoretische basislijn                           |
| `k=10-30`              | Geeft veel gewicht aan de beste resultaten; lage posities dragen nauwelijks bij                      | Wanneer de top 3-resultaten meestal correct zijn |
| **`k=60`** (standaard) | Evenwichtig — alle top 10-resultaten dragen betekenisvol bij                                         | Zoeken voor algemene doeleinden                  |
| `k=100+`               | Vlakker — zelfs laag gerangschikte resultaten kunnen domineren als ze in meerdere systemen voorkomen | Wanneer recall > precisie van cruciaal belang is |

### `k` in de praktijk afstemmen

```bash
# Standaard
MEMORY_RRF_K=60

# Agressieve precisie (klein geheugen, weinig documenten)
MEMORY_RRF_K=20

# Maximale recall (groot geheugen, uiteenlopende zoekopdrachten)
MEMORY_RRF_K=120
```

**Voorbeeld met `k=20`:**

- FTS-positie 1 → bijdrage `1/21 = 0.048`
- FTS-positie 10 → bijdrage `1/30 = 0.033`
- Vectorpositie 1 → bijdrage `0.048`
- Gecombineerd maximum: `0.096`

**Voorbeeld met `k=60`:**

- FTS-positie 1 → bijdrage `1/61 = 0.016`
- FTS-positie 10 → bijdrage `1/70 = 0.014`
- Vectorpositie 1 → bijdrage `0.016`
- Gecombineerd maximum: `0.033`

Bij een hogere `k` is het **relatieve verschil** tussen de eerste en de tiende positie kleiner, waardoor het algoritme meer vertrouwt op **consensus tussen zoeksystemen** dan op de betrouwbaarheid van de hoogste positie.

### Wanneer `k` moet worden gewijzigd

| Symptoom                                                  | Probeer                                                                     |
| --------------------------------------------------------- | --------------------------------------------------------------------------- |
| Het beste resultaat wint altijd, maar is onjuist          | **Verlaag** k (bijv. 20) — betrouwbaarheid van de hoogste positie telt meer |
| Het juiste antwoord staat in de top 5, maar niet bovenaan | **Verhoog** k (bijv. 100) — vlakkere scores belonen consensus               |
| Recall is hoog, maar precisie is laag                     | **Verlaag** k — maak de rangschikking scherper                              |
| Recall is laag (relevante documenten ontbreken)           | **Verhoog** k — geef lager gerangschikte documenten een kans                |

### RRF-weging

Reciprocal rank fusion gebruikt gelijke gewichten voor de semantische vectorpositie en de positie in de zoekresultaten voor volledige tekst:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Er zijn geen omgevingsvariabelen om de afzonderlijke gewichten aan te passen (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` bestaan niet).

---

## Samenvattingsstrategie (v3.8.16+)

De module `summarization.ts` (`src/lib/memory/summarization.ts`) comprimeert oudere herinneringen om de actieve set klein te houden en tegelijkertijd het herinneringsvermogen te behouden.

### Wanneer samenvatting wordt geactiveerd

| Trigger                    | Drempelwaarde (standaard) |
| -------------------------- | ------------------------- |
| Handmatige trigger via API | n.v.t.                    |

### Wat wordt samengevat

Er worden twee toegangspunten geëxporteerd vanuit `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — comprimeert de
  herinneringen voor een sessie tot één samenvattingstekst die binnen een tokenbudget blijft.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — de op leeftijd gebaseerde
  compactie die door de API wordt gebruikt: deze selecteert elke herinnering die ouder is dan `days`, maakt
  hiervan één gecomprimeerde samenvattingsherinnering en verwijdert (wanneer `dryRun` `false` is)
  de originelen. Geef `dryRun: true` door om de kandidatenset en het totale aantal tokens
  vooraf te bekijken zonder iets te wijzigen.

Er is geen clusterstap op basis van tags/sleutels of score per herinnering voor "kern versus samenvatbaar" —
de selectie is uitsluitend gebaseerd op de leeftijdsgrens en de samenvattingstekst is een gecomprimeerde,
met het type voorafgegaan regel per kandidaat.

### Samenvatting activeren

Samenvatting is **handmatig / opt-in** — de instelling `autoSummarize` is standaard
`false`, waardoor niets automatisch wordt gecomprimeerd. Activeer dit via de API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Om dit uitgeschakeld te laten, behoudt u simpelweg de standaardwaarde (`false`) voor `autoSummarize`.

### Tips voor de kwaliteit van samenvattingen

- **Bekijk eerst een voorbeeld met `dryRun`** — `summarizeMemoriesOlderThan(..., true)` retourneert
  de kandidatenlijst en het totale aantal tokens, zodat u kunt controleren wat er zou worden samengevoegd
  voordat de originelen worden verwijderd.
- **Voer samenvatting uit tijdens uren met weinig verkeer** als u een groot herinneringencorpus hebt — de LLM-aanroep is het langzaamste onderdeel

```bash
# Cron-stijl: vat dagelijks om 3 uur 's nachts samen
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend-providerpatroon

> **Gezaghebbende bron:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tests:** `src/lib/memory/__tests__/generic-backend.test.ts`

Het MemoryBackend-providerpatroon introduceert een **verwisselbare backend-abstractielaag** bovenop de bestaande herinneringsengine. In plaats van gebonden te zijn aan één opslagimplementatie, ondersteunt het herinneringssysteem nu meerdere backends (SQLite, Obsidian, Notion, aangepaste HTTP-backends) met configureerbare primaire/fallback-routering.

### Architectuur

```
┌──────────────────────────────────────────────────────────┐
│                    API-routes                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│        Singleton-orchestrator (manager.ts)                │
│                                                          │
│  Primair ──► Backend A  (bijv. SQLite)                   │
│  Fallback ─► Backend B  (bijv. Obsidian)                 │
│              Backend C  (bijv. Notion via GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Kerninterface (`backend.ts`)

Elke backend moet de interface `MemoryBackend` implementeren:

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

  // Zoeken
  search(config: SearchConfig): Promise<Memory[]>;

  // Status
  health(): Promise<HealthCheckResult>;

  // Levenscyclus (optioneel)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-orchestrator die:

- backends **registreert** via `register(backend)` — aangeroepen tijdens het opstarten vanuit `index.ts`
- de primaire backend en fallbacks **configureert** via `configure(primary, fallbacks)`
- CRUD-bewerkingen en zoekopdrachten **routeert** naar de primaire backend, met een fallback-keten bij fouten
- periodiek **statuscontroles** uitvoert op alle backends

**Fallback-gedrag:**

| Bewerking | Primair                  | Fallbacks                         |
| --------- | ------------------------ | --------------------------------- |
| `create`  | ✅ Alleen primair        | ❌                                |
| `get`     | ✅ Probeer primair eerst | ✅ Fallback indien null           |
| `update`  | ✅ Alleen primair        | ✅ Asynchrone sync zonder wachten |
| `delete`  | ✅ Alleen primair        | ✅ Asynchrone sync zonder wachten |
| `list`    | ✅ Alleen primair        | ❌                                |
| `search`  | ✅ Primair eerst         | ✅ Fallback bij fout              |

#### GenericMemoryBackend (`genericBackend.ts`)

Een generieke HTTP-connector die elke REST-API aanpast tot een MemoryBackend. Nuttig voor:

- **Notion** — maak verbinding via de Notion API
- **Obsidian** — maak verbinding via de Obsidian Local REST API
- **Aangepaste backends** — elke service die een RESTful herinnerings-API beschikbaar stelt

**Configuratie:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Basis-URL van de backend-API
  apiKey?: string;           // Bearer-token voor authenticatie
  headers?: Record<string, string>;  // Aangepaste HTTP-headers
  timeout?: number;          // Time-out van verzoek (standaard: 30000ms)
  backendType?: string;      // Voor logboekregistratie

  // Endpointoverschrijvingen (standaardwaarden gebruiken REST-conventies)
  endpoints?: {
    search?: string;   // standaard: "/memories/search"
    create?: string;   // standaard: "/memories"
    list?: string;     // standaard: "/memories"
    get?: string;      // standaard: "/memories/{id}"
    update?: string;   // standaard: "/memories/{id}"
    delete?: string;   // standaard: "/memories/{id}"
    health?: string;   // standaard: "/health"
  };

  // Toewijzingen van queryparameternamen
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Toewijzingen van padparameternamen
  pathParams?: {
    id?/memoryId?
  };
}
```

**Bekende backends** zijn vooraf geconfigureerd in `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend gericht op localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend gericht op api.notion.com/v1
```

#### Ingebouwde backends

##### SQLiteBackend (`sqliteBackend.ts`)

De standaard primaire backend. Omhult de bestaande SQLite-gebaseerde geheugenopslag via `src/lib/memory/store.ts`. Wordt automatisch geregistreerd bij het opstarten.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Omhult de bestaande Obsidian-integratie (`src/lib/memory/obsidianBackend.ts`). Maakt verbinding met een Obsidian-kluis via de Obsidian Local REST API.

### Instellingen

Instellingen voor geheugenbackends worden opgeslagen in de tabel met app-instellingen en beheerd via `src/lib/memory/settings.ts`:

| Instelling           | Omgevings-/configuratiesleutel | Standaard  | Beschrijving                             |
| -------------------- | ------------------------------ | ---------- | ---------------------------------------- |
| Primaire backend     | `memoryPrimaryBackend`         | `"sqlite"` | ID van de primaire backend               |
| Fallback-backends    | `memoryFallbackBackends`       | `[]`       | Geordende ID's van fallback-backends     |
| Backendconfiguraties | `memoryBackendConfigs`         | `{}`       | Configuratieoverschrijvingen per backend |

Instellingen worden genormaliseerd via `normalizeMemorySettings()` en gecachet in `getMemorySettings()`.

### Initialisatieproces

```
Opstarten van app
  → imports van index.ts (neveneffect): registreert SQLiteBackend
  → initMemoryBackends() aangeroepen vanuit de levenscyclus van de app:
      1. Instellingen laden (getMemorySettings)
      2. Primaire backend + fallback-backends configureren
      3. Alle backends initialiseren (statuscontrole)
      4. Klaar voor verzoeken
```

### Een nieuwe backend toevoegen

1. **Implementeer de interface `MemoryBackend`** in `src/lib/memory/<name>Backend.ts`
2. **Exporteer** vanuit `src/lib/memory/index.ts`
3. **Registreer** bij het opstarten met `memoryManager.register(yourBackend)`
4. **Configureer** via instellingen: stel `memoryPrimaryBackend` in op de ID van uw backend
5. **Test** met `src/lib/memory/__tests__/generic-backend.test.ts` als referentie

#### Voorbeeld: Brain-backend

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

### Verificatie

#### Eenheidstests

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Verwachte uitvoer: **35 tests, allemaal geslaagd**, die het volgende afdekken:

- Constructor (2)
- Statuscontrole (4) — succes, fout 500, netwerkfout, latentie
- Initialiseren (2) — succes, fout
- Aanmaken (2) — standaardendpoint, aangepast endpoint
- Ophalen (4) — succes, 404 → null, niet-404 veroorzaakt uitzondering, aangepaste padparameters
- Bijwerken (2) — succes, 404 → false
- Verwijderen (2) — succes, 404 → false
- Opsommen (2) — queryparameters, aangepaste parameternamen
- Zoeken (3) — queryparameters, aangepast endpoint, serialisatie van opties
- Authenticatieheaders (2) — Bearer-token, aangepaste headers
- Factory (1)

#### Typecontrole

```bash
npm run typecheck:core
```

Verwacht: **0 fouten**.
