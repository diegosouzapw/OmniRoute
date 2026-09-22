# Memory System (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

# Sistem memorije

> **Izvor istine:** `src/lib/memory/` i `src/app/api/memory/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40 (isključeno po zadanim postavkama + int8 kvantizacija)

OmniRoute pruža trajnu konverzacijsku memoriju ključiranu prema API ključu (i opcionalno ID-u sesije). Memorije se automatski izvlače iz LLM odgovora putem laganog regex podudaranja uzoraka i ubacuju nazad u naknadne zahtjeve kao vodeća sistemska poruka (ili prva korisnička poruka za pružatelje usluga koji odbijaju sistemsku ulogu).

> **Memorija je ISKLJUČENA po zadanim postavkama (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` je sada `false` (`src/lib/memory/settings.ts`). Omogućavanje memorije ubacuje do `maxTokens` (~2k) dohvaćenog konteksta u **svaki** zahtjev za chat, što se naplaćuje — iznenađujući trošak za nove instalacije i za klijente koji upravljaju vlastitim kontekstom. Uključite se eksplicitno pod **Settings → Memory** (kartica `MemorySkillsTab` prikazuje upozorenje o trošku tokena kada je memorija omogućena). Klijent može isključiti pojedinačni zahtjev pomoću `x-omniroute-no-memory` zaglavlja zahtjeva (`true`/`1`/`yes`) — pogledajte tabelu zaglavlja zahtjeva u [API_REFERENCE.md](../reference/API_REFERENCE.md). Zahtjev bez memorije postavlja `memoryOwnerId = null`, što onemogućava **i** memoriju **i** ubacivanje vještina za taj zahtjev (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Memorija je **ograničena po API ključu**, a ne po korisniku — svaki zahtjev autentifikovan istim API ključem dijeli isti memorijski bazen, uz opcionalno dodatno ograničavanje prema `sessionId`.

## Arhitektura

```
Client → /v1/chat/completions (apiKeyInfo resolved upstream)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # izvlači id
    → getMemorySettings()                     # keširane postavke
    → shouldInjectMemory(body, {enabled})     # provjera
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + opcionalni vektor
    → injectMemory(body, memories, provider)  # sistemska ili korisnička poruka
  → upstream provider call
  → on response: extractFacts(text, apiKeyId, sessionId)  # neblokirajuće
    → setImmediate → createMemory(fact) per match
                   → embed(content) + upsertVector(id, vec)
```

Mjesta poziva za ubacivanje i izvlačenje su povezana u `open-sse/handlers/chatCore.ts` (potražite `retrieveMemories`, `injectMemory` i `extractFacts`).

## Arhitektura mehanizma (razrješenje u 3 nivoa)

Mehanizam memorije razrješava putanju dohvaćanja u vrijeme izvršavanja na osnovu dostupne infrastrukture i postavki. Postoje tri nivoa, primijenjena po prioritetnom redoslijedu:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVO 0 — Ključna riječ (FTS5)                              │
  │  Dostupnost vođena sondom: FTS5 kada ga SQLite build        │
  │  podržava (better-sqlite3 / node:sqlite / bun:sqlite);      │
  │  nedostupno na buildovima bez FTS5 (npr. sql.js/WASM —      │
  │  "no such module: fts5"). Koristi se kada je                │
  │  strategy = "exact" ili kao rezervna opcija; ključna riječ  │
  │  engine-status odražava sondu.                              │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVO 1 — Ugrađeni vektor (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 učitan putem db.loadExtension().         │
  │  KNN brute-force nad Float32 vektorima. Aktivan kada:       │
  │   • sqlite-vec loadExtension uspije                         │
  │   • Dostupan je izvor ugradnje (remote | static |           │
  │     transformers) koji može proizvesti Float32Array         │
  │   • vec_memories tabela postoji (kreirana pri prvom ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVO 2 — Qdrant (opcionalna eksterna vektorska baza)       │
  │  Kada je omogućeno, zamjenjuje sqlite-vec za                │
  │  semantic/hybrid. Zahtijeva pokrenutu Qdrant instancu +     │
  │  konfigurisan host/port.                                    │
  └─────────────────────────────────────────────────────────────┘
```

Degradacija je automatska i transparentna:

- Ako se sqlite-vec ne učita, nivo 1 je nedostupan → vraća se na nivo 0.
- Ako izvor ugradnje vrati grešku, nivo 1 se vraća na nivo 0.
- Ako Qdrant nije ispravan, nivo 2 se vraća na nivo 1 (ili nivo 0 ako je i nivo 1 nedostupan).

## Izvori za embedding

Sloj za embedding (`src/lib/memory/embedding/`) određuje koji izvor koristiti na osnovu `MemorySettingsExtended.embeddingSource`:

| Izvor          | Opis                                                                              | Potreban ključ | Hladni start     |
| -------------- | --------------------------------------------------------------------------------- | -------------- | ---------------- |
| `remote`       | Koristi konfigurisan API za embedding provajdera (OpenAI, Cohere, itd.)           | Da             | Nema             |
| `static`       | Lokalni lookup-table embedding putem `potion-base-8M` (WordPiece + mean pooling)  | Ne             | ~200ms           |
| `transformers` | Lokalna ONNX inferencija putem `@huggingface/transformers` v4, `all-MiniLM-L6-v2` | Ne             | ~3s + ~400MB RAM |
| `auto`         | Runtime rezolucija: remote (ako ključ postoji) → static → transformers → null     | Zavisi         | Zavisi           |

**Redoslijed rezolucije za `auto`:**

1. Pronađi prvog provajdera u `listEmbeddingProviders()` sa `hasKey === true` → `remote`.
2. Ako je `settings.staticEnabled === true` → `static`.
3. Ako je `settings.transformersEnabled === true` → `transformers`.
4. U suprotnom → `null` (degradira na FTS5 pretragu po ključnim riječima).

Keš za embedding (`src/lib/memory/embedding/cache.ts`) koristi in-memory LRU mapu indeksiranu sa `${source}:${model}:${dim}:${sha256(text)}`, ograničenu na `MEMORY_EMBEDDING_CACHE_MAX` unosa (podrazumijevano 1000) sa TTL-om od `MEMORY_EMBEDDING_CACHE_TTL_MS` (podrazumijevano 5 min). Dijeli se između svih pozivaoca po životnom ciklusu procesa.

## Hibridni RRF (k=60)

Kada je `strategy = "hybrid"` i vektorska baza podataka dostupna, preuzimanje koristi Reciprocal Rank Fusion (RRF) za spajanje FTS5 i vektorskih rezultata:

```
RRF(d) = Σ  1 / (k + rank_i(d))      gdje je k = 60 (konfigurisivo putem MEMORY_RRF_K)
          i
```

Konkretno:

1. Pokreni FTS5 pretragu → rangirana lista `R_fts` (pozicija 1..N).
2. Pokreni KNN vektorsku pretragu → rangirana lista `R_vec` (pozicija 1..M).
3. Za svaki jedinstveni `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 ako nije na listi).
4. Sortiraj po `rrf_score` DESC, primijeni token budget walk.

RRF je poznat kao efikasan bez potrebe za normalizacijom rezultata kroz heterogene sisteme preuzimanja. Podrazumijevana vrijednost `k=60` potiče iz originalnog rada Cormack et al. i dobro funkcioniše za male korpuse (<10k memorija).

## Backfill (lazy + reindex)

Kada se model za embedding promijeni (detektovano putem `embedding_signature`), vektorska baza podataka se ponovo gradi i sve postojeće memorije se označavaju sa `needs_reindex = 1` u tabeli `memories`.

**Lazy backfill**: Pri sljedećem preuzimanju, svaka memorija kojoj nedostaje vektorski unos se embeduje i ubacuje u `vec_memories` prije nego što se pretraga pokrene. Ovo amortizuje trošak backfill-a kroz stvarne zahtjeve bez blokiranja pokretanja.

**Explicit reindex**: Kartica Engine u `/dashboard/memory` pruža dugme "Reindex Now" koje poziva `POST /api/memory/reindex`. Handler poziva `runReindexBatch()` iz `src/lib/memory/reindex.ts`, koji obrađuje do `limit` unosa na čekanju po zahtjevu. Napredak se može provjeriti putem `GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabela `memory_vec_meta` (migracija `083_memory_vec.sql`) pohranjuje:

- `active_dim` — trenutna dimenzija vektora (null = još nije kalibrisano).
- `embedding_signature` — `${source}:${model}:${dim}` koji se koristi za detekciju promjena.
- `last_reset_at` — vremenska oznaka posljednjeg potpunog resetovanja.
- `vec_loaded` — 0/1 oznaka da li je sqlite-vec uspješno učitan.

## Proširenje postavki

Devet polja za ugradnju (embedding) i vektore dostupno je u `MemorySettingsExtended` u
`src/shared/schemas/memory.ts`, a trajno se pohranjuju putem `src/lib/db/settings.ts`:

| Polje                    | Tip                                                | Zadano   | Opis                                                              |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Koji izvor ugradnje (embedding) koristiti                         |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Provajder/model u formatu `provider/model`                        |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Osnovni URL krajnje tačke kompatibilne sa OpenAI samo za memoriju |
| `customModelId`          | `string \| null`                                   | `null`   | ID modela poslat prilagođenoj krajnjoj tački                      |
| `transformersEnabled`    | `boolean`                                          | `false`  | Omogućavanje za Transformers.js (MiniLM, ~400MB)                  |
| `staticEnabled`          | `boolean`                                          | `false`  | Omogućavanje za statički lokalni model potion-base-8M             |
| `rerankEnabled`          | `boolean`                                          | `false`  | Omogući korak rerankiranja (dodaje +200-500ms/zahtjevu)           |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Provajder/model za rerankiranje u formatu `provider/model`        |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | Koju vektorsku pozadinu (backend) koristiti                       |

Ovi podaci su izloženi putem `GET /PUT /api/settings/memory` (shema `MemorySettingsExtendedSchema`).

Za `remote` izvor, Memory također prihvata opcionalne postavke `customBaseUrl` i
`customModelId`. Zajedno one biraju `/embeddings` krajnju tačku kompatibilnu sa OpenAI
i model bez promjene globalnog registra ugradnje. Krajnja tačka se normalizuje prije
upotrebe i provjerava prema politici odlaznog URL-a provajdera: HTTP(S) je obavezan,
ugrađeni kredencijali i upitni nizovi (query strings) se odbijaju, a adrese
cloud-metapodataka ostaju blokirane. Prazne vrijednosti zadržavaju odabranog provajdera
registra. Greške vraćene na kontrolnu tablu su sanitizovane, a kredencijali krajnje
tačke se nikada ne evidentiraju (loguju).

> **TODO (D20):** Opseg `global` (dijeljenje memorija između svih API ključeva) nije
> implementiran u ovom izdanju. Zahtijeva promjene sheme i globalnu putanju
> preuzimanja. Pratite odvojeno.

## Slojevi pohrane

### Primarni: SQLite (tabela memories)

Kreirano migracijom `015_create_memories.sql`:

| Kolona                      | Tip                | Napomene                                                                              |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generisan putem `crypto.randomUUID()`                                            |
| `api_key_id`                | `TEXT NOT NULL`    | Vlasnički API ključ                                                                   |
| `session_id`                | `TEXT`             | Opcioni opseg po razgovoru                                                            |
| `type`                      | `TEXT NOT NULL`    | Jedan od `factual`, `episodic`, `procedural`, `semantic`                              |
| `key`                       | `TEXT`             | Stabilan ključ za upsert, npr. `preference:i_prefer_python`                           |
| `content`                   | `TEXT NOT NULL`    | Stvarni tekst činjenice                                                               |
| `metadata`                  | `TEXT`             | JSON blob (kategorija, extractedAt, izvor, ...)                                       |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 nizovi                                                                       |
| `expires_at`                | `TEXT`             | Opcioni istek; `NULL` znači trajno                                                    |
| `memory_id`                 | `INTEGER UNIQUE`   | Dodato migracijom `023_fix_memory_fts_uuid.sql` za povezivanje UUID-ova ↔ FTS5 rowids |

Indeksi: `api_key_id`, `session_id`, `type`, `expires_at`, plus jedinstveni
`memory_id` indeks.

**Upsert semantika**: `createMemory()` traži postojeći red sa istim
`(api_key_id, key)` i ažurira ga na licu mjesta kada ga pronađe (spajajući `metadata`
putem plitkog širenja/shallow spread). Ovo sprječava da tabela nekontrolisano raste
zbog ponovljenih izjava o preferencijama.

### Pretraga punog teksta (virtuelna tabela memory_fts)

`022_add_memory_fts5.sql` kreira FTS5 virtuelnu tabelu preko `content` i
`key`. `023_fix_memory_fts_uuid.sql` popravlja stvarni bug gdje se UUID
primarni ključ nije povezivao sa FTS5 cjelobrojnim rowid-om — migracija dodaje
kolonu `memory_id`, ponovo kreira FTS tabelu i povezuje trigere
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) koji održavaju FTS
sinhronizovanim pri INSERT, DELETE i UPDATE operacijama.

Koristi ga `retrieval.ts` za `semantic` i `hybrid` strategije (pogledajte ispod).
Kod za preuzimanje (retrieval) vrši provjeru sa `hasTable("memory_fts")` i vraća se
na hronološki redoslijed ako FTS tabela nedostaje ili ako FTS upit baci grešku.

### Opciono: Qdrant (vektorska pohrana nivo 2)

`src/lib/memory/qdrant.ts` implementira opcionu Qdrant integraciju kao vektorsku
pohranu nivoa 2. Preuzimanje se usmjerava na Qdrant samo kada je selektor mašine
`memoryVectorStore === "qdrant"` — zadana vrijednost `"auto"` (i `"sqlite-vec"`)
**nikada** ne biraju Qdrant. Prekidač na kartici Engine postavlja **oboje**
`qdrantEnabled` i `memoryVectorStore` zajedno: omogućavanje čini Qdrant primarnom
pohranom, onemogućavanje vraća na `"auto"` (#5597 — prije te popravke, omogućavanje
je bilo inertno jer ništa nije upisivalo selektor mašine). Ako je Qdrant nedostupan
ili ne vraća ništa, preuzimanje se vraća na sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — ugrađuje (embed) `key + content` pomoću konfigurisanog modela za ugrađivanje (embedding model), osigurava da kolekcija postoji (kreira vektore kosinusne udaljenosti pri prvoj upotrebi) i vrši upsert tačke sa payload-om `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — ugrađuje upit, pretražuje kolekciju filtriranu prema `kind = "omniroute_memory"` i opciono prema `apiKeyId` / `sessionId`. Ograničava `topK` na `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — brisanje jedne tačke. Poziva ga `deleteMemory()` nakon što se SQLite red ukloni (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — masovno brisanje tačaka čiji je `expiresAtUnix` u prošlosti ili čiji je `createdAtUnix` stariji od roka zadržavanja (retention cutoff). Prvo broji kako bi kontrolna tabla mogla prikazati stvarne brojeve.
- `checkQdrantHealth()` — `GET /readyz` provjera ispravnosti (health probe) sa latencijom.

Korisnički interfejs za podešavanja izlaže Qdrant konfiguraciju, provjeru ispravnosti, test semantičke pretrage i čišćenje u **Engine kartici** na `/dashboard/memory`. Odgovarajuće rute pod `src/app/api/settings/qdrant/` su sve povezane od verzije v3.8.6:

| Ruta                                    | Metoda        | Opis                                    |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Čitanje / ažuriranje Qdrant podešavanja |
| `/api/settings/qdrant/health`           | `GET`         | Liveness proba + latencija              |
| `/api/settings/qdrant/search`           | `POST`        | Test semantičke pretrage                |
| `/api/settings/qdrant/cleanup`          | `POST`        | Uklanjanje isteklih / starih tačaka     |
| `/api/settings/qdrant/embedding-models` | `GET`         | Lista dostupnih modela za ugrađivanje   |

**Napomene o ponašanju (šta očekivati):**

- **Izbor mehanizma (Engine selection)** — omogućavanje Qdrant-a u Engine kartici ga čini primarnim skladištem (postavlja `memoryVectorStore="qdrant"`); onemogućavanje vraća na `"auto"` (#5597).
- **Bez popunjavanja unazad (No back-fill)** — samo memorije kreirane/ažurirane **nakon** što je Qdrant omogućen se upisuju u njega (fire-and-forget dual-write). Prethodno postojeće SQLite memorije se **ne** migriraju; "Reindex Now" ponovo gradi samo sqlite-vec indeks, ne i Qdrant.
- **Dimenzija vektora se automatski detektuje** iz stvarnog ugrađivanja (embedding) pri prvoj upotrebi — ne postoji polje za dimenziju koje treba popuniti. Promjena modela za ugrađivanje nakon što kolekcija postoji **nije** automatski podržana: postojeća kolekcija ostaje netaknuta, upisi/pretrage sa neusklađenim dimenzijama ne uspijevaju i vraćaju se na sqlite-vec. Ponovo kreirajte kolekciju (novo ime ili je obrišite u Qdrant-u) da biste promijenili embeddere.
- **Metrika udaljenosti** — uvijek **Cosine** (hardkodirano pri kreiranju kolekcije; nije podesivo).
- **Autentifikacija** — samo API ključ (šalje se kao `api-key` zaglavlje; opciono za neautentifikovani lokalni Docker). JWT/RBAC se ne koriste.
- **Polja konfiguracije** — korisnički interfejs izlaže `host`, `port`, `collection`, `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` su samo env/DB i `vectorSize` se ne koristi za kreiranje kolekcije (dimenzija dolazi iz ugrađivanja).

### Vektorska kvantizacija (int8 — opt-in, oba backend-a)

Oba vektorska backend-a podržavaju **opt-in int8 kvantizaciju** za smanjenje memorijskog otiska pohranjenih vektora (~4× manji od Float32) uz mali trošak opoziva (recall cost). Podrazumijevano je **isključeno** na oba — vektori ostaju pune preciznosti osim ako nisu eksplicitno omogućeni.

| Backend    | Podešavanje                     | Tip                            | Podrazumijevano | Gdje se čita                                                |
| ---------- | ------------------------------- | ------------------------------ | --------------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB ključ) | `"none" \| "int8" \| "binary"` | `"none"`        | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`        | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** se konfiguriše po instanci putem ključa podešavanja `qdrantQuantization` (izložen kao `quantization` polje na `PUT /api/settings/qdrant`). Kada je `"int8"`, `buildQuantizationConfig()` zahtijeva skalarnu kvantizaciju (`always_ram`, kvantil `0.99`), a pretrage omogućavaju `rescore: true` tako da vektori pune preciznosti preciziraju skup kandidata int8.
- **sqlite-vec** kvantizacija je **samo za okruženje** (nije podešavanje baze podataka): postavite `MEMORY_VEC_QUANTIZATION=int8` da biste pohranili lokalne vektore kao `int8[dim]` kolonu putem `vec_quantize_int8(?, 'unit')`. Odabrani režim se uključuje u `embedding_signature` (sufiks `:int8`), tako da prebacivanje režima pokreće potpuno ponovno indeksiranje `vec_memories` tabele — ista putanja lijenog popunjavanja (lazy-backfill) koja se koristi kada se model ugrađivanja promijeni.

## Tipovi memorije

`MemoryType` (`src/lib/memory/types.ts`):

| Tip          | Koristi se za                                                                       |
| ------------ | ----------------------------------------------------------------------------------- |
| `factual`    | Preferencije, stabilne korisničke činjenice, obrasci ponašanja                      |
| `episodic`   | Odluke vezane za određeni trenutak ("Odabrao sam Postgres")                         |
| `procedural` | Radni tok / "kako-da" memorija (rezervisano; trenutno nema automatskog ekstraktora) |
| `semantic`   | Rezervisano za unose u vektorskoj bazi                                              |

Strategija preuzimanja `MemoryConfig` je jedna od `exact`, `semantic` ili `hybrid`, a opseg (scope) je jedan od `session`, `apiKey` ili `global`. Podrazumevani opseg iz `getMemorySettings()` je `apiKey`.

## Ekstrakcija činjenica (`extraction.ts`)

Ekstrakcija je **zasnovana na regex-u**, a ne na LLM-u — pokreće se unutar procesa sa `setImmediate()` tako da nikada ne blokira tok odgovora:

- **Obrasci preferencija** → `MemoryType.FACTUAL`
  (npr. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Obrasci odluka** → `MemoryType.EPISODIC`
  (npr. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Obrasci učestalosti** → `MemoryType.FACTUAL`
  (npr. `I usually …`, `I always …`, `I tend to …`)

Svako podudaranje se čisti (`trim`, sažimanje razmaka, ograničeno na 500 znakova), deduplicira unutar serije putem stabilnog `factKey(category, content)`, i pohranjuje putem `createMemory()` sa metapodacima `{category, extractedAt, source: "llm_response"}`. Ulazni tekst je ograničen na 64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — kada je duži, koristi se **kraj** teksta tako da najnoviji sadržaj asistenta uvijek učestvuje.

`extractFactsFromText(text)` je eksportovan za testove i vraća strukturirane činjenice bez njihovog pohranjivanja.

## Preuzimanje (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` je glavna ulazna tačka. Ona:

1. Normalizuje i validira konfiguraciju kroz `MemoryConfigSchema`.
2. Odmah vraća `[]` kada je `enabled` false ili `maxTokens <= 0`.
3. Ograničava `maxTokens` na `[1, 8000]`.
4. Detektuje da li postoji moderna `memories` tabela (nasuprot naslijeđenoj `memory` tabeli) tako da starije baze podataka nastave raditi.
5. Gradi osnovni upit sa zaštitom od isteka (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), opcionim opsegom sesije i opcionim `retentionDays` ograničenjem.
6. Grana se prema strategiji:
   - **`exact`** (podrazumevano): hronološki `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ako postoje `config.query` i `memory_fts`, JOIN `memory_fts MATCH ?` i sortiranje po FTS rangu; vraća se na hronološki redoslijed kada FTS vrati 0 redova.
   - **`hybrid`**: unija FTS rezultata (veća relevantnost) i hronološkog skupa, deduplicirana po id-u.
7. Izračunava ocjenu relevantnosti ključnih riječi (`getRelevanceScore`) preko `content`, `key` i `metadata` JSON-a kada je upit obezbijeđen. Redovi sa nultom ocjenom se filtriraju.
8. Sortira po ocjeni opadajuće, zatim po `createdAt` opadajuće.
9. Prolazi kroz rangiranu listu i prihvata unose dok `estimateTokens(content)` (≈ `length / 4`) ostaje ispod budžeta. Uvijek vraća barem jedan unos kada postoji podudaranje.

`estimateTokens` je eksportovan i koristi se za preuzimanje, sumiranje i MCP alat `omniroute_memory_search`.

## Injekcija (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Spaja sav sadržaj memorije u jedan `Memory context: …` string.
2. Bira strategiju prema nazivu provajdera:
   - **Sistemska poruka** (podrazumevano za OpenAI, Anthropic, Gemini, …) — dodaje
     `{role: "system", content: memoryText}` ispred svih postojećih sistemskih
     poruka tako da korisnički sistemski upiti i dalje imaju prioritet.
   - **Korisnička poruka** (rezervna opcija) — za provajdere u
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Oni odbijaju sistemsku ulogu
     i u suprotnom bi vratili grešku 400 (vidi issue #1701 za GLM/Zhipu).
3. Loguje broj, strategiju i model pod `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` je eksportovan za pozivaoce koji trebaju sami donositi odluke o rutiranju. Nepoznati provajderi podrazumevano imaju vrednost `true` (sistemska uloga dozvoljena) radi sigurnosti.

## Podešavanja (`settings.ts`)

Konfiguracija memorije je **sačuvana u tabeli podešavanja u bazi podataka**, a ne u env varijablama.
`getMemorySettings()` čita iz `getSettings()` i kešira rezultat u procesu; `invalidateMemorySettingsCache()` se poziva putem PUT rute za podešavanja nakon upisa.

### Nasleđena polja (sve verzije)

| DB ključ              | Tip     | Podrazumevano                                        | UI kontrola                                            |
| --------------------- | ------- | ---------------------------------------------------- | ------------------------------------------------------ |
| `memoryEnabled`       | boolean | `false` (isključeno podrazumevano od v3.8.30)        | Memorija uključena/isključena                          |
| `memoryMaxTokens`     | integer | `2000` (opseg `0–16000`)                             | Budžet tokena za injekciju                             |
| `memoryRetentionDays` | integer | `30` (opseg `1–365`)                                 | Period zadržavanja                                     |
| `memoryStrategy`      | enum    | `"hybrid"` (jedna od `recent`, `semantic`, `hybrid`) | Strategija preuzimanja                                 |
| `skillsEnabled`       | boolean | `false`                                              | Uključuje injekciju veština po ključu (vidi SKILLS.md) |

Napomena: UI strategija `"recent"` se mapira na internu `"exact"` strategiju preuzimanja putem `toMemoryRetrievalConfig()` (hronološki redosled).

### Nova polja (v3.8.6, plan 21 D9)

Pogledajte takođe odeljak "Settings extension" iznad za opise polja.

| DB ključ                    | API polje                | Podrazumevano |
| --------------------------- | ------------------------ | ------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`      |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`        |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`       |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`       |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`       |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`        |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`      |

DB ključevi povezani sa Qdrant-om (`qdrantEnabled`, `qdrantHost`, `qdrantPort`, `qdrantApiKey`, `qdrantCollection` podrazumevano `"omniroute_memory"`, `qdrantEmbeddingModel` podrazumevano `"openai/text-embedding-3-small"`) se čitaju pomoću `normalizeQdrantConfig()` u `qdrant.ts`.

### Varijable okruženja (v3.8.6)

Šest opcionalnih env varijabli podešava ponašanje engine-a tokom izvršavanja (dokumentovano u `.env.example`):

| Varijabla                       | Podrazumevano              | Opis                                                                                                                                     |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL keša za embedding (5 min)                                                                                                            |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maksimalan broj unosa u LRU kešu za embedding                                                                                            |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF repo za Transformers.js model                                                                                                         |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repo za statički potion model                                                                                                         |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Gde čuvati preuzete modele                                                                                                               |
| `MEMORY_VEC_TOP_K`              | `20`                       | Podrazumevani top-K za vektorsku pretragu                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | RRF k konstanta za hibridnu pretragu                                                                                                     |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Postavite na `int8` za čuvanje lokalnih sqlite-vec vektora kvantizovanih (~4× manji; opcionalno). Promena režima zahteva reindeksiranje. |

## Sažimanje (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` sažima stariji sadržaj kada ukupni broj tokena za memoriju ključa premaši budžet. Iterira redove DESC prema `created_at`, zadržava redove koji odgovaraju, a za ostale zamjenjuje `content` na licu mjesta sa prve tri rečenice originala. `tokensSaved` je razlika u `estimateTokens` između starog i novog sadržaja.

Ova rutina je **dostupna, ali se ne poziva automatski** u trenutnom cjevovodu za chat — pozovite je iz cron-a, administratorske radnje ili `MemoryConfig.autoSummarize` poveznice ako vam je potrebna kontinuirana kompresija. Gubitak podataka je jednosmjeran: originalni tekst se prepisuje.

## REST API

Svi endpointi zahtijevaju upravljačku autorizaciju (`requireManagementAuth`).

### Osnovni memorijski endpointi (postojeći + ažurirani)

| Metoda   | Putanja              | Opis                                                                                                                                                                                   |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Paginizirana lista sa filterima: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odgovor uključuje `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`   |
| `POST`   | `/api/memory`        | Kreiranje unosa (Zod-validirano: `content`, `key`, opcionalno `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Poziva `createMemory()` koji vrši upsert na `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Dohvatanje jednog unosa po UUID-u                                                                                                                                                      |
| `PUT`    | `/api/memory/[id]`   | Ažuriranje polja unosa (`type`, `key`, `content`, `metadata`). Tijelo: `MemoryUpdatePutSchema`. Također sinhronizuje vektor ako je dostupan izvor embedding-a.                         |
| `DELETE` | `/api/memory/[id]`   | Brisanje unosa; također briše iz `vec_memories` (D15) i Qdrant-a (best-effort). Vraća 404 kada nedostaje.                                                                              |
| `GET`    | `/api/memory/health` | Pokreće `verifyExtractionPipeline("health-check")` — round-trip kreiraj→listaj→briši. Vraća `{working, latencyMs, error?}`                                                             |

### Novi endpointi memorijskog mehanizma (plan 21)

| Metoda | Putanja                           | Opis                                                                                                                                                                                   |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Dry-run `retrieveMemories` — vraća rangirane rezultate sa rezultatom, nivoom, tokenima. Tijelo: `RetrievePreviewSchema`. NE ubacuje niti mijenja memorije.                             |
| `GET`  | `/api/memory/embedding-providers` | Navodi provajdere sa embedding modelima, naznačujući koji imaju konfigurisan API ključ.                                                                                                |
| `GET`  | `/api/memory/engine-status`       | Vraća puni status mehanizma: nivo ključnih riječi, rezoluciju embedding-a, statistiku vektorske pohrane, zdravlje Qdrant-a, konfiguraciju rerank-a. Oblik: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ručno pokretanje kompresije memorije. Tijelo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Vraća `{candidates, tokensSaved}`.                                     |
| `POST` | `/api/memory/reindex`             | Pokretanje vektorskog reindeksiranja za memorije sa `needs_reindex=1`. Tijelo: `MemoryReindexSchema` (`force`). Vraća `{started, pending}`.                                            |

### Endpointi postavki

| Metoda | Putanja                                 | Opis                                                                                                      |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Trenutni normalizovani `MemorySettingsExtended` (7 novih polja + naslijeđeno)                             |
| `PUT`  | `/api/settings/memory`                  | Ažuriranje bilo kojeg polja iz `MemorySettingsExtendedSchema` (ukupno 12 polja)                           |
| `GET`  | `/api/settings/qdrant`                  | Trenutne Qdrant postavke (`QdrantSettingsSchema`)                                                         |
| `PUT`  | `/api/settings/qdrant`                  | Ažuriranje Qdrant postavki. Tijelo: `QdrantSettingsUpdateSchema`. `apiKey` = prazan string uklanja ključ. |
| `GET`  | `/api/settings/qdrant/health`           | Liveness proba prema konfiguriranoj Qdrant instanci. Vraća `QdrantHealthResultSchema`.                    |
| `POST` | `/api/settings/qdrant/search`           | Test semantičke pretrage prema Qdrant-u. Tijelo: `QdrantSearchSchema` (`query`, `topK`).                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Uklanjanje Qdrant tačaka za istekle / stare memorije.                                                     |
| `GET`  | `/api/settings/qdrant/embedding-models` | Lista embedding modela dostupnih za Qdrant.                                                               |

Upit liste `/api/memory` podržava ili paginaciju zasnovanu na `page` (`parsePaginationParams`) **ili** sirovi `offset` — kada je `offset` prisutan, on ima prednost i izvedena `page` vrijednost se računa za oblik odgovora.

## MCP alati (`open-sse/mcp-server/tools/memoryTools.ts`)

Kada je MCP server omogućen, registrirana su tri alata za memoriju:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → obavija `retrieveMemories()`. Od verzije v3.8.6 (D16), `strategy` se čita
  iz `getMemorySettings()` umjesto da bude hardkodirana na `"exact"`. Ako je
  `query` naveden i `strategy` je `semantic` ili `hybrid`, koristi se vector store
  kada je dostupan.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → obavija `createMemory()`. Prihvata samo 4 kanonska tipa:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → izlistava
  odgovarajuće unose, opciono filtrira prema vremenskoj oznaci kreiranja, a zatim
  briše svaki putem `deleteMemory()` (što također uklanja vektore iz sqlite-vec + Qdrant).

Pogledajte [MCP-SERVER.md](./MCP-SERVER.md) za detalje o transportu i opsegu.

## Kontrolna tabla (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` je sada **Studio sa 3 kartice**:

### Kartica: Memories

- Konceptualna kartica (sklopivo objašnjenje "Kako to radi").
- Lista u realnom vremenu, pretraga i paginacija (debounced 300 ms).
- Filter tipa (`factual` / `episodic` / `procedural` / `semantic` / sve).
- Modal za dodavanje memorije (ključ, sadržaj, tip).
- Uređivanje u redu (dugme sa olovkom → `PUT /api/memory/[id]`).
- Brisanje po redu (sa dijalogom za potvrdu).
- JSON izvoz trenutne stranice; JSON uvoz putem birača datoteka.
- Kartice sa statistikom: `totalEntries`, `tokensUsed`, `hitRate`.
- Dugme "Compact old" → `POST /api/memory/summarize` (dry-run prvo prikazuje
  broj kandidata, zatim potvrđuje).
- Zelena/crvena tačka zdravlja pokretana putem `GET /api/memory/health`.

### Kartica: Playground

- Unos upita + birač strategije (Exact / Semantic / Hybrid) + budžet tokena.
- "Simulate" → `POST /api/memory/retrieve-preview` — prikazuje rangirane rezultate sa
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel rezolucije koji prikazuje koji izvor ugradnje (embedding source) / vector store je korišten i da li je došlo do povratka na alternativu (fallback).

### Kartica: Engine

- Panel statusa motora (chip za ključnu riječ FTS5, chip za ugradnju, chip za vector store, chip za zdravlje Qdrant-a, chip za rerank).
- Dugme "Reindex Now" → `POST /api/memory/reindex`.
- Birač izvora ugradnje (auto / remote / static / transformers + prekidači).
- Kartica konfiguracije Qdrant-a (prekidač za omogućavanje, host/port/kolekcija/ključ, test konekcije, test semantičke pretrage, čišćenje).
- Kartica konfiguracije rerank-a (prekidač za omogućavanje, birač provajdera/modela).

Postavke memorije i Qdrant-a se također nalaze pod
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) za
naslijeđenu/globalnu površinu postavki.

## Keširanje

`src/lib/memory/store.ts` održava in-process LRU-ish keš
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, sa izbacivanjem 20 %
najstarijih) za `getMemory(id)` čitanja, plus generički sloj `memoryCache`
ključ/vrijednost (`src/lib/memory/cache.ts`) sa `get`/`set`/`invalidate`
metodama koje koriste pozivaoci koji žele svoj vlastiti keš sa opsegom (LRU od 1 000 unosa, podrazumijevani TTL 5 min).

## Privatnost i životni ciklus

- Vlasništvo nad memorijom je id API ključa (`resolveMemoryOwnerId` u
  `chatCore.ts`). Bez `apiKeyInfo.id` ne pokreće se ni dohvaćanje, ni ubacivanje, ni ekstrakcija.
- Unosi sa budućim `expires_at` se filtriraju iz dohvaćanja; stari unosi izvan `retentionDays` su isključeni pomoću `created_at >= cutoff` klauzule u `retrieveMemories`.
- Za trajno brisanje, koristite `DELETE /api/memory/[id]` ili `omniroute_memory_clear`.
- Ekstrakcija je "fire-and-forget" putem `setImmediate`; greške se bilježe pod
  `memory.extraction.background.failed` i nikada se ne prikazuju pozivatelju.
- Povratne provjere (`verifyExtractionPipeline`) čiste vlastite testne unose u `finally` bloku.

## Vidi također

- [SKILLS.md](./SKILLS.md) — postavka `skillsEnabled` ubacuje definicije alata uz memoriju.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transport / opsezi.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — šira API površina.
- Izvorni moduli:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — multi-source embedding sloj
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod sheme za sva tijela memorijskog API-ja
  - `src/shared/schemas/qdrant.ts` — Zod sheme za Qdrant postavke/operacije
  - `src/lib/db/memoryVec.ts` — CRUD za `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + pod-rute
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (stranica + komponente +
    kartice + hookovi)
  - `open-sse/handlers/chatCore.ts` (povezivanje ubacivanja / ekstrakcije)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Odabir embedding pružatelja (v3.8.16+)

OmniRoute-ov memorijski mehanizam podržava **četiri embedding izvora** (`src/lib/memory/embedding/`). Svaki ima različite kompromise u **latenciji, cijeni, kvaliteti modela i složenosti postavljanja**.

### Izvori embeddinga

| Pružatelj      | Izvor                                             | Latencija                                 | Cijena               | Kvaliteta                    | Postavljanje                                       |
| -------------- | ------------------------------------------------- | ----------------------------------------- | -------------------- | ---------------------------- | -------------------------------------------------- |
| `transformers` | Lokalni ONNX model (Xenova/all-MiniLM-L6-v2)      | ~50-150ms (CPU)                           | Besplatno            | Dobro                        | Samo `npm install`                                 |
| `static`       | Prethodno izračunati vektori (keširani)           | <1ms                                      | Besplatno            | N/A (ovisi o pogotku u kešu) | Nema                                               |
| `remote`       | OpenAI / Cohere / Voyage API                      | ~100-300ms                                | $0.02-0.10/1M tokena | Izvrsno                      | API ključ                                          |
| `auto`         | Odabire najbolji dostupni izvor tijekom izvođenja | Isto kao odabrani izvor                   | Besplatno            | Isto kao odabrani izvor      | Nema                                               |
| _(cache)_      | In-memory LRU sloj iznad bilo kojeg izvora        | <1ms (pogodak), puna latencija (promašaj) | Besplatno            | Isto kao temeljni            | Uvijek uključen (nije izvor koji se može odabrati) |

### Stablo odlučivanja

```
                  Koji je vaš kontekst implementacije?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    SMALL PROD   LARGE PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (besplatno, bez API-ja)     (najbolja kvaliteta)   (bez interneta)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            UVIJEK dodajte `cache` sloj na vrh
            (LruCache obavija bilo kojeg pružatelja)
```

### Konfiguracija baze podataka i API-ja

Opcije memorijskog embeddinga se konfiguriraju putem Settings API-ja/UI-ja, a ne putem varijabli okruženja. Relevantni ključevi baze podataka postavki pod Settings (`normalizeMemorySettings` u `src/lib/memory/settings.ts`) su:

- `memoryEmbeddingSource`: `"transformers"` (lokalno), `"remote"` (temeljeno na API-ju, npr. OpenAI), `"static"` (vanjska pohrana), ili `"auto"`
- `memoryEmbeddingProviderModel`: Identifikator modela za udaljene/statičke izvore (npr. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, ili `"auto"`

#### Lokalni model (`transformers`)

Interno koristi transformers.js za pokretanje lokalnih modela:

```bash
# Env varijable pročitane u kodu (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF repozitorij modela
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statički potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Direktorij predmemorije
```

#### LRU predmemorija embeddinga

Predmemorija je prema zadanim postavkama uvijek uključena i konfigurira se putem env varijabli:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maks. keširanih stavki
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Podaci o performansama

Benchmark na tipičnom 4-jezgrenom x86 serveru (tekstovi ~100 tokena svaki):

| Provajder            | p50   | p95   | p99   | Trošak / 1M embeddinga             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Besplatno                          |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Zavisi od Qdrant hostinga          |
| `cache` (pogodak)    | <1ms  | <1ms  | 2ms   | Besplatno                          |

---

## Obrasci za ekstrakciju činjenica (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) koristi **regex podudaranje obrazaca** za ekstrakciju strukturiranih činjenica iz poruka razgovora. Razumijevanje ovih obrazaca pomaže vam da podesite kvalitet ekstrakcije za vaš slučaj upotrebe.

### Zadane kategorije obrazaca

| Kategorija          | Primjer obrasca                                             | Hvatanja                     |
| ------------------- | ----------------------------------------------------------- | ---------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Korisničke preferencije      |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Korisničke odluke (epizodne) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Trajni obrasci ponašanja     |

### Primjeri obrazaca (pojednostavljeno)

```ts
// Iz src/lib/memory/extraction.ts
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

### Šta se ekstrahuje

Kada korisnik kaže:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Ekstrakcija proizvodi 4 memorije:
>
> | Ključ                                | Kategorija   | Tip        | Sadržaj                     |
> | ------------------------------------ | ------------ | ---------- | --------------------------- |
> | `preference:typescript`              | preferencija | činjenično | "TypeScript"                |
> | `decision:postgres_for_this_project` | odluka       | epizodno   | "Postgres za ovaj projekat" |
> | `pattern:commit_before_pushing`      | obrazac      | činjenično | "commit prije push-anja"    |
> | `preference:python`                  | preferencija | činjenično | "Python"                    |

### Ograničenja ekstrakcije

Da bi se spriječila nekontrolisana ekstrakcija, primjenjuju se sljedeća ograničenja:

| Minimalna dužina sadržaja  | 3 znaka     |
| -------------------------- | ----------- |
| Maksimalna dužina sadržaja | 500 znakova |

### Kada onemogućiti ekstrakciju

Ekstrakcija se pokreće automatski kad god je memorija omogućena; ne postoji poseban prekidač samo za ekstrakciju. Da biste je isključili, potpuno onemogućite memoriju (`enabled: false` putem `PUT /api/settings/memory`). Razmislite o tome kada:

- Imate veliki obim poruka i trošak ekstrakcije nije zanemarljiv
- Vaši razgovori su uglavnom prolazni (chat, otklanjanje grešaka) bez dugoročne vrijednosti
- Već hvatate kontekst putem prilagođenih dodataka

---

## Podešavanje hibridnog RRF-a (v3.8.16+)

Algoritam **Reciprocal Rank Fusion (RRF)** kombinuje FTS5 (ključna riječ) i vektorske (semantičke) rezultate. Parametar `k` kontroliše kolika se težina daje rezultatima nižeg ranga.

### Formula

Za svaku kandidatsku memoriju, RRF rezultat je:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Gdje je:

- `k` je konstanta (zadano 60)
- `rank_i(d)` je rang dokumenta `d` u i-tom sistemu preuzimanja (FTS, vektor)
- Suma se odnosi na sve sisteme preuzimanja

### Kako `k` utiče na rezultate

| `k` vrijednost      | Efekat                                                                                  | Najbolje za                          |
| ------------------- | --------------------------------------------------------------------------------------- | ------------------------------------ |
| `k=0`               | Čista fuzija rangova (bez zaglađivanja)                                                 | Teorijska osnova                     |
| `k=10-30`           | Snažno ponderiše vrhunske rezultate, niski rang jedva doprinosi                         | Kada su top-3 rezultata obično tačni |
| **`k=60`** (zadano) | Balansirano — top-10 rezultata svi značajno doprinose                                   | Preuzimanje opšte namjene            |
| `k=100+`            | Ravnije — čak i rezultati niskog ranga mogu dominirati ako se pojavljuju u više sistema | Kada je recall > precision kritično  |

### Podešavanje `k` u praksi

```bash
# Zadano
MEMORY_RRF_K=60

# Agresivna preciznost (mala memorija, malo dokumenata)
MEMORY_RRF_K=20

# Maksimalni recall (velika memorija, raznovrsni upiti)
MEMORY_RRF_K=120
```

**Primjer sa `k=20`:**

- FTS rang 1 → doprinos `1/21 = 0.048`
- FTS rang 10 → doprinos `1/30 = 0.033`
- Vektorski rang 1 → doprinos `0.048`
- Kombinovani maksimum: `0.096`

**Primjer sa `k=60`:**

- FTS rang 1 → doprinos `1/61 = 0.016`
- FTS rang 10 → doprinos `1/70 = 0.014`
- Vektorski rang 1 → doprinos `0.016`
- Kombinovani maksimum: `0.033`

Sa većim `k`, **relativna razlika** između top-1 i ranga-10 je manja, pa se algoritam više oslanja na **konsenzus između sistema preuzimanja** nego na povjerenje u vrhunski rang.

### Kada promijeniti `k`

| Simptom                                             | Pokušajte                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| Vrhunski rezultat uvijek pobjeđuje, ali je pogrešan | **Niži** k (npr. 20) — povjerenje u vrhunski rang je važnije        |
| Tačan odgovor je u top-5, ali ne u top-1            | **Viši** k (npr. 100) — ravnomjernije bodovanje nagrađuje konsenzus |
| Recall je visok, ali je precision nizak             | **Niži** k — izoštrite rangiranje                                   |
| Recall je nizak (nedostaju relevantni dokumenti)    | **Viši** k — dajte šansu dokumentima nižeg ranga                    |

### RRF ponderisanje

Reciprocal rank fusion koristi jednake težine za semantički vektorski rang i rang pretrage punog teksta:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Ne postoje varijable okruženja za podešavanje pojedinačnih težina (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ne postoje).

---

## Strategija sažimanja (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) komprimuje starije memorije kako bi aktivni skup ostao mali uz očuvanje mogućnosti prisjećanja.

### Kada se pokreće sažimanje

| Okidač                    | Prag (podrazumijevano) |
| ------------------------- | ---------------------- |
| Ručni okidač putem API-ja | n/a                    |

### Šta se sažima

Dvije ulazne tačke su izvezene iz `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — sažima
  memorije za sesiju u jedan tekst sažetka ograničen budžetom tokena.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — kompaktiranje na
  osnovu starosti koje koristi API: bira svaku memoriju stariju od `days`, gradi
  jednu sažetu memoriju od njih, i (kada je `dryRun` postavljen na `false`) briše
  originale. Proslijedite `dryRun: true` da pregledate skup kandidata i ukupan
  broj tokena bez ikakvih izmjena.

Ne postoji prolaz za klasterisanje oznaka/ključeva niti bodovanje "jezgro naspram onoga što se može sažeti" po memoriji — odabir je isključivo na osnovu starosti, a tekst sažetka je sažeta linija sa prefiksom tipa po kandidatu.

### Pokretanje sažimanja

Sažimanje je **ručno / opciono** — postavka `autoSummarize` je po podrazumijevanoj vrijednosti `false`, tako da se ništa ne kompaktira automatski. Pokrenite ga putem API-ja:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Da biste ga ostavili isključenim, jednostavno zadržite `autoSummarize` na njegovoj podrazumijevanoj vrijednosti (`false`).

### Savjeti za kvalitet sažimanja

- **Prvo pregledajte sa `dryRun`** — `summarizeMemoriesOlderThan(..., true)` vraća
  listu kandidata i ukupan broj tokena tako da možete potvrditi šta bi bilo
  spojeno prije brisanja originala.
- **Pokrenite sažimanje tokom sati slabog saobraćaja** ako imate veliki korpus
  memorije — poziv LLM-u je spori dio.

```bash
# Cron-stil: sažimanje svakog dana u 3 ujutro
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Obrazac MemoryBackend provajdera

> **Izvor istine:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testovi:** `src/lib/memory/__tests__/generic-backend.test.ts`

Obrazac MemoryBackend provajdera uvodi sloj apstrakcije za "pluggable" backend preko postojećeg mehanizma memorije. Umjesto da bude vezan za jednu implementaciju skladištenja, memorijski sistem sada podržava više backend-ova (SQLite, Obsidian, Notion, prilagođeni HTTP backend-ovi) sa konfigurabilnim rutiranjem primarnog/rezervnog (fallback) sistema.

### Arhitektura

```
┌──────────────────────────────────────────────────────────┐
│                    API Routes                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Singleton orchestrator (manager.ts)             │
│                                                          │
│  Primary ──► Backend A  (e.g. SQLite)                    │
│  Fallback ─► Backend B  (e.g. Obsidian)                  │
│             Backend C  (e.g. Notion via GenericBackend)   │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Osnovni interfejs (`backend.ts`)

Svaki backend mora implementirati `MemoryBackend` interfejs:

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

  // Search
  search(config: SearchConfig): Promise<Memory[]>;

  // Health
  health(): Promise<HealthCheckResult>;

  // Lifecycle (optional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton orkestrator koji:

- **Registruje** backend-ove putem `register(backend)` — poziva se pri pokretanju iz `index.ts`
- **Konfiguriše** primarni + rezervni (fallback) putem `configure(primary, fallbacks)`
- **Rutira** CRUD/pretragu na primarni, sa lancem rezervnih sistema u slučaju greške
- **Periodično provjerava zdravlje** svih backend-ova

**Ponašanje rezervnog sistema (fallback):**

| Operacija | Primarni                 | Rezervni sistemi                    |
| --------- | ------------------------ | ----------------------------------- |
| `create`  | ✅ Samo primarni         | ❌                                  |
| `get`     | ✅ Prvo pokušaj primarni | ✅ Rezervni ako je null             |
| `update`  | ✅ Samo primarni         | ✅ Sinhronizacija "fire-and-forget" |
| `delete`  | ✅ Samo primarni         | ✅ Sinhronizacija "fire-and-forget" |
| `list`    | ✅ Samo primarni         | ❌                                  |
| `search`  | ✅ Prvo primarni         | ✅ Rezervni u slučaju greške        |

#### GenericMemoryBackend (`genericBackend.ts`)

Generički HTTP konektor koji prilagođava bilo koji REST API u `MemoryBackend`. Korisno za:

- **Notion** — povezivanje putem Notion API-ja
- **Obsidian** — povezivanje putem Obsidian Local REST API-ja
- **Prilagođeni backend-ovi** — bilo koji servis koji izlaže RESTful memorijski API

**Konfiguracija:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Osnovni URL backend API-ja
  apiKey?: string;           // Bearer token za autentifikaciju
  headers?: Record<string, string>;  // Prilagođena HTTP zaglavlja
  timeout?: number;          // Vremensko ograničenje zahtjeva (podrazumijevano: 30000ms)
  backendType?: string;      // Za logovanje

  // Zamjene za krajnje tačke (podrazumijevane vrijednosti koriste REST konvencije)
  endpoints?: {
    search?: string;   // podrazumijevano: "/memories/search"
    create?: string;   // podrazumijevano: "/memories"
    list?: string;     // podrazumijevano: "/memories"
    get?: string;      // podrazumijevano: "/memories/{id}"
    update?: string;   // podrazumijevano: "/memories/{id}"
    delete?: string;   // podrazumijevano: "/memories/{id}"
    health?: string;   // podrazumijevano: "/health"
  };

  // Mapiranja naziva parametara upita
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapiranja naziva parametara putanje
  pathParams?: {
    id?/memoryId?
  };
}
```

**Poznati backend-ovi** su unaprijed konfigurisani u `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend usmjeren na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend usmjeren na api.notion.com/v1
```

#### Ugrađeni backend-ovi

##### SQLiteBackend (`sqliteBackend.ts`)

Podrazumijevani primarni backend. Obmotava postojeću SQLite memorijsku pohranu koristeći `src/lib/memory/store.ts`. Automatski se registruje pri pokretanju.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Obmotava postojeću Obsidian integraciju (`src/lib/memory/obsidianBackend.ts`). Povezuje se na Obsidian vault putem Obsidian Local REST API-ja.

### Postavke

Postavke memorijskog backend-a su pohranjene u tabeli postavki aplikacije i njima se upravlja putem `src/lib/memory/settings.ts`:

| Postavka                | Env/Config ključ         | Podrazumijevano | Opis                                  |
| ----------------------- | ------------------------ | --------------- | ------------------------------------- |
| Primarni backend        | `memoryPrimaryBackend`   | `"sqlite"`      | ID primarnog backend-a                |
| Rezervni backend-ovi    | `memoryFallbackBackends` | `[]`            | Poredani ID-ovi rezervnih backend-ova |
| Konfiguracije backend-a | `memoryBackendConfigs`   | `{}`            | Zamjene konfiguracije po backend-u    |

Postavke se normalizuju putem `normalizeMemorySettings()` i keširaju u `getMemorySettings()`.

### Tok inicijalizacije

```
Pokretanje aplikacije (bootstrap)
  → index.ts importi (nuspojava): registruje SQLiteBackend
  → initMemoryBackends() pozvano iz životnog ciklusa aplikacije:
      1. Učitaj postavke (getMemorySettings)
      2. Konfiguriši primarni + rezervni
      3. Inicijalizuj sve backend-ove (provjera zdravlja)
      4. Spreman za zahtjeve
```

### Dodavanje novog backend-a

1. Implementirajte `MemoryBackend` interfejs u `src/lib/memory/<name>Backend.ts`
2. Exportujte iz `src/lib/memory/index.ts`
3. Registrujte sa `memoryManager.register(yourBackend)` pri pokretanju
4. Konfigurišite putem postavki: postavite `memoryPrimaryBackend` na ID vašeg backend-a
5. Testirajte sa `src/lib/memory/__tests__/generic-backend.test.ts` kao referencom

#### Primjer: Brain Backend

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

### Verifikacija

#### Jedinični testovi

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Očekivani izlaz: **35 testova, svi prolaze** pokrivajući:

- Konstruktor (2)
- Provjera zdravlja (4) — uspjeh, greška 500, mrežna greška, latencija
- Inicijalizacija (2) — uspjeh, greška
- Kreiranje (2) — podrazumijevana krajnja tačka, prilagođena krajnja tačka
- Preuzimanje (4) — uspjeh, 404 → null, izuzetak za ne-404, prilagođeni parametri putanje
- Ažuriranje (2) — uspjeh, 404 → false
- Brisanje (2) — uspjeh, 404 → false
- Listanje (2) — parametri upita, prilagođeni nazivi parametara
- Pretraga (3) — parametri upita, prilagođena krajnja tačka, serijalizacija opcija
- Auth zaglavlja (2) — Bearer token, prilagođena zaglavlja
- Fabrika (1)

#### Provjera tipova

```bash
npm run typecheck:core
```

Očekivano: **0 grešaka**.
