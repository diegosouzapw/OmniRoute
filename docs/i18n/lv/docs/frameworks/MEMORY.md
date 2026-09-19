# Memory System (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Patiesais avots:** `src/lib/memory/` un `src/app/api/memory/`
> **Pēdējo reizi atjaunināts:** 2026-06-28 — v3.8.40 (pēc noklusējuma izslēgta + int8 kvantizācijas izlīdzināšana)

OmniRoute nodrošina pastāvīgu sarunu atmiņu, kas piesaistīta API atslēgai (un
pēc izvēles sesijas ID). Atmiņas tiek automātiski iegūtas no LLM atbildēm,
izmantojot vienkāršu regulāro izteiksmju paraugu meklēšanu, un atkārtoti
ievietotas turpmākajos pieprasījumos kā sākotnējais sistēmas ziņojums (vai
pirmais lietotāja ziņojums pakalpojumu sniedzējiem, kuri noraida sistēmas lomu).

> **Atmiņa pēc noklusējuma ir IZSLĒGTA (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> tagad ir `false` (`src/lib/memory/settings.ts`). Iespējojot atmiņu, **katrā**
> tērzēšanas pieprasījumā tiek ievietots līdz `maxTokens` (~2k) izgūtā konteksta,
> par ko tiek piemērota maksa — tas var radīt negaidītas izmaksas jaunām
> instalācijām un klientiem, kuri paši pārvalda savu kontekstu. Iespējojiet to
> tieši sadaļā **Settings → Memory** (`MemorySkillsTab` rāda brīdinājumu par
> tokenu izmaksām, kad atmiņa ir iespējota). Klients var izslēgt atmiņu vienam
> pieprasījumam ar pieprasījuma galveni `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — skatiet pieprasījumu galveņu tabulu dokumentā
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Pieprasījums bez atmiņas
> iestata `memoryOwnerId = null`, tādējādi šim pieprasījumam atspējojot **gan**
> atmiņas, **gan** prasmju ievietošanu
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Atmiņa ir **nodalīta katrai API atslēgai**, nevis katram lietotājam — visi
pieprasījumi, kas autentificēti ar vienu un to pašu API atslēgu, koplieto vienu
atmiņas kopu, kuru pēc izvēles var papildus nodalīt pēc `sessionId`.

## Arhitektūra

```
Klients → /v1/chat/completions (apiKeyInfo atrisināts iepriekšējā posmā)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # izgūst ID
    → getMemorySettings()                     # kešoti iestatījumi
    → shouldInjectMemory(body, {enabled})     # pārbaudes vārteja
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + neobligāts vektors
    → injectMemory(body, memories, provider)  # sistēmas vai lietotāja ziņojums
  → augšupējā pakalpojumu sniedzēja izsaukums
  → saņemot atbildi: extractFacts(text, apiKeyId, sessionId)  # nebloķējoši
    → setImmediate → createMemory(fact) katrai atbilstībai
                   → embed(content) + upsertVector(id, vec)
```

Ievietošanas un izgūšanas izsaukumu vietas ir savienotas failā
`open-sse/handlers/chatCore.ts` (meklējiet `retrieveMemories`, `injectMemory`
un `extractFacts`).

## Dzinēja arhitektūra (3 līmeņu atlase)

Atmiņas dzinējs izpildlaikā izvēlas izgūšanas ceļu, pamatojoties uz pieejamo
infrastruktūru un iestatījumiem. Pastāv trīs līmeņi, kas tiek izmantoti
prioritārā secībā:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  0. LĪMENIS — atslēgvārdi (FTS5)                            │
  │  Pieejamību nosaka pārbaude: FTS5 tiek izmantots, ja SQLite  │
  │  būvējums to atbalsta (better-sqlite3 / node:sqlite /        │
  │  bun:sqlite); nav pieejams būvējumos bez FTS5                │
  │  (piem., sql.js/WASM — "no such module: fts5"). Tiek         │
  │  izmantots, ja strategy = "exact", vai kā atkāpšanās variants;│
  │  engine-status keyword atspoguļo pārbaudes rezultātu.        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  1. LĪMENIS — iegultie vektori (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 tiek ielādēts ar db.loadExtension().      │
  │  Pilna KNN pārlase pār Float32 vektoriem. Aktīvs, ja:        │
  │   • sqlite-vec loadExtension ir sekmīgs                      │
  │   • Ir pieejams iegultņu avots (remote | static |            │
  │     transformers), kas var izveidot Float32Array             │
  │   • Pastāv tabula vec_memories (izveidota pirmajā ready())   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  2. LĪMENIS — Qdrant (ārēja vektoru datubāze pēc izvēles)    │
  │  Ja iespējots, semantic/hybrid režīmā aizstāj sqlite-vec.    │
  │  Nepieciešama darbojošās Qdrant instance + konfigurēts       │
  │  resursdators/ports.                                         │
  └─────────────────────────────────────────────────────────────┘
```

Pāreja uz zemāku līmeni notiek automātiski un nemanāmi:

- Ja sqlite-vec neizdodas ielādēt, 1. līmenis nav pieejams → notiek pāreja uz 0. līmeni.
- Ja iegultņu avots atgriež kļūdu, 1. līmenis pāriet uz 0. līmeni.
- Ja Qdrant nav darbspējīgs, 2. līmenis pāriet uz 1. līmeni (vai 0. līmeni, ja
  arī 1. līmenis nav pieejams).

## Iegultņu avoti

Iegultņu slānis (`src/lib/memory/embedding/`) nosaka, kuru avotu izmantot,
pamatojoties uz `MemorySettingsExtended.embeddingSource`:

| Avots          | Apraksts                                                                                    | Nepieciešama atslēga | Aukstā palaišana |
| -------------- | ------------------------------------------------------------------------------------------- | -------------------- | ---------------- |
| `remote`       | Izmanto konfigurēta pakalpojumu sniedzēja iegultņu API (OpenAI, Cohere u.c.)                | Jā                   | Nav              |
| `static`       | Lokāla uzmeklēšanas tabulas iegulšana, izmantojot `potion-base-8M` (WordPiece + vidējošana) | Nē                   | ~200ms           |
| `transformers` | Lokāla ONNX inferēšana, izmantojot `@huggingface/transformers` v4, `all-MiniLM-L6-v2`       | Nē                   | ~3s + ~400MB RAM |
| `auto`         | Izvēle izpildlaikā: attālais (ja pastāv atslēga) → statiskais → transformers → null         | Atkarīgs             | Atkarīgs         |

**Izvēles secība režīmam `auto`:**

1. Atrast pirmo pakalpojumu sniedzēju no `listEmbeddingProviders()`, kuram `hasKey === true` → `remote`.
2. Ja `settings.staticEnabled === true` → `static`.
3. Ja `settings.transformersEnabled === true` → `transformers`.
4. Pretējā gadījumā → `null` (pāriet uz FTS5 atslēgvārdu meklēšanu).

Iegultņu kešatmiņa (`src/lib/memory/embedding/cache.ts`) izmanto atmiņā glabātu
LRU karti ar atslēgu `${source}:${model}:${dim}:${sha256(text)}`, kuras maksimālais
ierakstu skaits ir `MEMORY_EMBEDDING_CACHE_MAX` (pēc noklusējuma 1000) un TTL ir
`MEMORY_EMBEDDING_CACHE_TTL_MS` (pēc noklusējuma 5 min). Tā tiek koplietota starp
visiem izsaucējiem viena procesa dzīves cikla laikā.

## Hibrīdais RRF (k=60)

Ja `strategy = "hybrid"` un vektoru krātuve ir pieejama, izgūšanai tiek izmantota
apgriezto rangu sapludināšana (Reciprocal Rank Fusion), lai apvienotu FTS5 un
vektoru rezultātus:

```
RRF(d) = Σ  1 / (k + rank_i(d))      kur k = 60 (konfigurējams ar MEMORY_RRF_K)
          i
```

Konkrēti:

1. Izpildīt FTS5 meklēšanu → ranžēts saraksts `R_fts` (pozīcijas 1..N).
2. Izpildīt KNN vektoru meklēšanu → ranžēts saraksts `R_vec` (pozīcijas 1..M).
3. Katram unikālajam `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, ja nav sarakstā).
4. Kārtot pēc `rrf_score` dilstošā secībā un piemērot marķieru budžeta caurskati.

Ir labi zināms, ka RRF ir efektīvs bez nepieciešamības normalizēt rezultātus starp
neviendabīgām izgūšanas sistēmām. Noklusējuma `k=60` ir pārņemts no sākotnējā
Cormack u.c. raksta un labi darbojas nelieliem korpusiem (<10k atmiņu).

## Atpakaļejošā aizpilde (slinkā + pārindeksēšana)

Kad iegultņu modelis mainās (to nosaka, izmantojot `embedding_signature`),
vektoru krātuve tiek izveidota no jauna, un visas esošās atmiņas tabulā
`memories` tiek atzīmētas ar `needs_reindex = 1`.

**Slinkā atpakaļejošā aizpilde**: Nākamās izgūšanas laikā jebkura atmiņa, kurai
trūkst vektora ieraksta, pirms meklēšanas tiek iegulta un ievietota
`vec_memories`. Tas sadala atpakaļejošās aizpildes izmaksas starp reāliem
pieprasījumiem, nebloķējot palaišanu.

**Tieša pārindeksēšana**: Cilnē Engine, kas atrodas `/dashboard/memory`, ir poga
"Reindeksēt tagad", kas izsauc `POST /api/memory/reindex`. Apstrādātājs izsauc
`runReindexBatch()` no `src/lib/memory/reindex.ts`, kas vienā pieprasījumā
apstrādā līdz `limit` neapstrādātiem ierakstiem. Progresu var pārbaudīt ar
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabulā `memory_vec_meta` (migrācija `083_memory_vec.sql`) tiek glabāts:

- `active_dim` — pašreizējā vektora dimensija (null = vēl nav kalibrēta).
- `embedding_signature` — `${source}:${model}:${dim}`, ko izmanto izmaiņu noteikšanai.
- `last_reset_at` — pēdējās pilnās atiestatīšanas laikspiedols.
- `vec_loaded` — 0/1 karodziņš, kas norāda, vai sqlite-vec tika veiksmīgi ielādēts.

## Iestatījumu paplašinājums

Deviņi iegulumu un vektoru lauki ir pieejami `MemorySettingsExtended` shēmā
`src/shared/schemas/memory.ts` un tiek pastāvīgi glabāti, izmantojot `src/lib/db/settings.ts`:

| Lauks                    | Tips                                               | Noklusējums | Apraksts                                                        |
| ------------------------ | -------------------------------------------------- | ----------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`    | Izmantojamais iegulumu avots                                    |
| `embeddingProviderModel` | `string \| null`                                   | `null`      | Nodrošinātājs/modelis `provider/model` formātā                  |
| `customBaseUrl`          | `string \| null`                                   | `null`      | Tikai Memory paredzētā OpenAI saderīgā galapunkta bāzes URL     |
| `customModelId`          | `string \| null`                                   | `null`      | Pielāgotajam galapunktam nosūtāmais modeļa ID                   |
| `transformersEnabled`    | `boolean`                                          | `false`     | Izvēles Transformers.js aktivizēšana (MiniLM, ~400MB)           |
| `staticEnabled`          | `boolean`                                          | `false`     | Izvēles lokālā statiskā potion-base-8M modeļa aktivizēšana      |
| `rerankEnabled`          | `boolean`                                          | `false`     | Iespējot pārkārtošanas soli (pievieno +200-500ms/pieprasījumam) |
| `rerankProviderModel`    | `string \| null`                                   | `null`      | Pārkārtošanas nodrošinātājs/modelis `provider/model` formātā    |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`    | Izmantojamā vektoru aizmugursistēma                             |

Tie ir pieejami, izmantojot `GET /PUT /api/settings/memory` (shēma `MemorySettingsExtendedSchema`).

Avotam `remote` Memory pieņem arī neobligātos iestatījumus `customBaseUrl` un
`customModelId`. Kopā tie atlasa OpenAI saderīgu `/embeddings` galapunktu un
modeli, nemainot globālo iegulumu reģistru. Pirms izmantošanas galapunkts tiek
normalizēts un pārbaudīts saskaņā ar nodrošinātāja izejošo URL politiku: ir
nepieciešams HTTP(S), iegulti akreditācijas dati un vaicājuma virknes tiek
noraidītas, un mākoņa metadatu adreses joprojām ir bloķētas. Tukšas vērtības
saglabā atlasīto reģistra nodrošinātāju. Informācijas panelim atgrieztās kļūdas
tiek sanitizētas, un galapunkta akreditācijas dati nekad netiek reģistrēti žurnālā.

> **TODO (D20):** Tvērums `global` (atmiņu kopīgošana starp visām API atslēgām) šajā
> laidienā nav ieviests. Tam nepieciešamas shēmas izmaiņas un globāls izgūšanas
> ceļš. Izsekot atsevišķi.

## Glabāšanas slāņi

### Primārais: SQLite (`memories` tabula)

Izveidota ar migrāciju `015_create_memories.sql`:

| Kolonna                     | Tips               | Piezīmes                                                                             |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID, kas ģenerēts ar `crypto.randomUUID()`                                          |
| `api_key_id`                | `TEXT NOT NULL`    | Īpašnieka API atslēga                                                                |
| `session_id`                | `TEXT`             | Neobligāts tvērums katrai sarunai                                                    |
| `type`                      | `TEXT NOT NULL`    | Viena no vērtībām `factual`, `episodic`, `procedural`, `semantic`                    |
| `key`                       | `TEXT`             | Stabila ievietošanas vai atjaunināšanas atslēga, piem., `preference:i_prefer_python` |
| `content`                   | `TEXT NOT NULL`    | Faktiskais fakta teksts                                                              |
| `metadata`                  | `TEXT`             | JSON bloks (category, extractedAt, source, ...)                                      |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 virknes                                                                     |
| `expires_at`                | `TEXT`             | Neobligāts derīguma termiņš; `NULL` nozīmē pastāvīgu ierakstu                        |
| `memory_id`                 | `INTEGER UNIQUE`   | Pievienots ar `023_fix_memory_fts_uuid.sql`, lai sasaistītu UUID ↔ FTS5 rindu ID     |

Indeksi: `api_key_id`, `session_id`, `type`, `expires_at`, kā arī unikālais
`memory_id` indekss.

**Ievietošanas vai atjaunināšanas semantika**: `createMemory()` meklē esošu rindu ar tādu pašu
`(api_key_id, key)` un, ja tā tiek atrasta, atjaunina to uz vietas (apvienojot `metadata` ar
seklu izvēršanu). Tas novērš neierobežotu tabulas palielināšanos atkārtotu
preferenču apgalvojumu dēļ.

### Pilnteksta meklēšana (`memory_fts` virtuālā tabula)

`022_add_memory_fts5.sql` izveido FTS5 virtuālo tabulu laukiem `content` un
`key`. `023_fix_memory_fts_uuid.sql` novērš praksē sastopamu kļūdu, kuras dēļ UUID
primāro atslēgu nevarēja savienot ar FTS5 vesela skaitļa rindas ID — migrācija pievieno
kolonnu `memory_id`, no jauna izveido FTS tabulu un piesaista trigerus
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), kas uztur FTS sinhronizētu,
veicot INSERT, DELETE un UPDATE.

To izmanto `retrieval.ts` stratēģijām `semantic` un `hybrid` (skatiet tālāk).
Izgūšanas kods veic aizsargpārbaudi ar `hasTable("memory_fts")` un atkāpjas uz
hronoloģisko secību, ja FTS tabulas nav vai FTS vaicājums izraisa kļūdu.

### Neobligāts: Qdrant (2. līmeņa vektoru krātuve)

`src/lib/memory/qdrant.ts` ievieš neobligātu Qdrant integrāciju kā 2. līmeņa
vektoru krātuvi. Izgūšana tiek maršrutēta uz Qdrant tikai tad, ja dzinēja selektors ir
`memoryVectorStore === "qdrant"` — noklusējuma vērtība `"auto"` (un `"sqlite-vec"`)
**nekad** neatlasa Qdrant. Cilnes Engine slēdzis vienlaikus iestata **gan** `qdrantEnabled`, **gan**
`memoryVectorStore`: iespējošana padara Qdrant par primāro krātuvi, bet atspējošana
atiestata vērtību uz `"auto"` (#5597 — pirms šī labojuma iespējošana neko nemainīja, jo nekas
neierakstīja dzinēja selektoru). Ja Qdrant nav sasniedzams vai neko neatgriež, izgūšana
atkāpjas uz sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — iegulst `key + content`, izmantojot konfigurēto
  iegulšanas modeli, nodrošina, ka kolekcija pastāv (pirmajā lietošanas reizē
  izveido kosinusa distances vektorus), un ievieto vai atjaunina punktu ar lietderīgo slodzi `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — iegulst vaicājumu, meklē
  kolekcijā, filtrējot pēc `kind = "omniroute_memory"` un pēc izvēles arī pēc
  `apiKeyId` / `sessionId`. Ierobežo `topK` diapazonā `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — viena punkta dzēšana. To izsauc
  `deleteMemory()` pēc SQLite rindas noņemšanas (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — masveidā dzēš punktus, kuru
  `expiresAtUnix` ir pagātnē vai kuru `createdAtUnix` ir vecāks par
  glabāšanas termiņa robežu. Vispirms tos saskaita, lai informācijas panelī varētu parādīt faktiskos skaitļus.
- `checkQdrantHealth()` — `GET /readyz` darbspējas pārbaude ar latentumu.

Iestatījumu lietotāja saskarne piedāvā Qdrant konfigurāciju, darbspējas pārbaudi, semantiskās meklēšanas testu
un tīrīšanu `/dashboard/memory` cilnē **Dzinējs**. Atbilstošie
maršruti zem `src/app/api/settings/qdrant/` ir pilnībā savienoti kopš v3.8.6:

| Maršruts                                | Metode        | Apraksts                                           |
| --------------------------------------- | ------------- | -------------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Lasīt / atjaunināt Qdrant iestatījumus             |
| `/api/settings/qdrant/health`           | `GET`         | Darbspējas pārbaude + latentums                    |
| `/api/settings/qdrant/search`           | `POST`        | Semantiskās meklēšanas tests                       |
| `/api/settings/qdrant/cleanup`          | `POST`        | Noņemt punktus ar beigušos termiņu / vecos punktus |
| `/api/settings/qdrant/embedding-models` | `GET`         | Uzskaitīt pieejamos iegulšanas modeļus             |

**Piezīmes par darbību (ko sagaidīt):**

- **Dzinēja izvēle** — iespējojot Qdrant cilnē Dzinējs, tas kļūst par primāro
  krātuvi (iestata `memoryVectorStore="qdrant"`); atspējošana atiestata uz `"auto"` (#5597).
- **Nav retrospektīvas aizpildīšanas** — tajā tiek ierakstītas tikai tās atmiņas, kas izveidotas/atjauninātas **pēc**
  Qdrant iespējošanas (asinhrona dubultā rakstīšana bez atbildes gaidīšanas). Iepriekš esošās SQLite atmiņas **netiek**
  migrētas; „Pārindeksēt tagad” pārbūvē tikai sqlite-vec indeksu, nevis Qdrant.
- **Vektora dimensija tiek noteikta automātiski** no faktiskā iegulšanas rezultāta pirmajā lietošanas reizē —
  nav jāaizpilda dimensijas lauks. Iegulšanas modeļa maiņa pēc kolekcijas
  izveides **netiek** apstrādāta automātiski: esošā kolekcija paliek neskarta, bet ierakstīšana/meklēšana
  ar neatbilstošu dimensiju neizdodas un pārslēdzas uz sqlite-vec. Lai nomainītu iegulšanas modeli, izveidojiet kolekciju no jauna
  (ar jaunu nosaukumu vai izdzēšot to Qdrant).
- **Distances metrika** — vienmēr **kosinusa** (iekodēta kolekcijas izveidē; nav
  konfigurējama).
- **Autentifikācija** — tikai API atslēga (nosūtīta kā `api-key` galvene; nav obligāta neautentificētam
  lokālam Docker). JWT/RBAC netiek izmantoti.
- **Konfigurācijas lauki** — lietotāja saskarne piedāvā `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` ir pieejami tikai vides mainīgajos/DB, un `vectorSize` netiek
  izmantots kolekcijas izveidei (dimensija tiek iegūta no iegulšanas rezultāta).

### Vektoru kvantēšana (int8 — pēc izvēles, abām aizmugursistēmām)

Abas vektoru aizmugursistēmas atbalsta **pēc izvēles iespējojamu int8 kvantēšanu**, lai samazinātu saglabāto
vektoru atmiņas patēriņu (~4× mazāks nekā Float32), nedaudz samazinot atrasto rezultātu pilnīgumu.
Abām pēc noklusējuma tā ir **izslēgta** — vektori saglabā pilnu precizitāti, ja vien kvantēšana nav nepārprotami
iespējota.

| Aizmugursistēma | Iestatījums                                 | Tips                           | Noklusējums | Kur tiek nolasīts                                           |
| --------------- | ------------------------------------------- | ------------------------------ | ----------- | ----------------------------------------------------------- |
| Qdrant          | `qdrantQuantization` (DB atslēga)           | `"none" \| "int8" \| "binary"` | `"none"`    | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec      | `MEMORY_VEC_QUANTIZATION` (vides mainīgais) | `"none" \| "int8"`             | `"none"`    | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** tiek konfigurēts katrai instancei, izmantojot `qdrantQuantization` iestatījuma
  atslēgu (`PUT /api/settings/qdrant` to piedāvā kā `quantization` lauku). Ja vērtība ir
  `"int8"`, `buildQuantizationConfig()` pieprasa skalāro kvantēšanu
  (`always_ram`, kvantile `0.99`), un meklēšanā tiek iespējots `rescore: true`, lai
  pilnas precizitātes vektori precizētu int8 kandidātu kopu.
- **sqlite-vec** kvantēšana ir pieejama **tikai ar vides mainīgo** (tas nav DB iestatījums): iestatiet
  `MEMORY_VEC_QUANTIZATION=int8`, lai lokālos vektorus saglabātu kā `int8[dim]`
  kolonnu, izmantojot `vec_quantize_int8(?, 'unit')`. Izvēlētais režīms tiek iekļauts
  `embedding_signature` (`:int8` sufikss), tāpēc režīmu pārslēgšana aktivizē pilnīgu
  `vec_memories` tabulas pārindeksēšanu — to pašu atliktās retrospektīvās aizpildīšanas ceļu, kas tiek izmantots,
  mainot iegulšanas modeli.

## Atmiņas veidi

`MemoryType` (`src/lib/memory/types.ts`):

| Veids        | Lietojums                                                                    |
| ------------ | ---------------------------------------------------------------------------- |
| `factual`    | Preferences, nemainīgi fakti par lietotāju, uzvedības modeļi                 |
| `episodic`   | Ar konkrētu brīdi saistīti lēmumi ("I chose Postgres")                       |
| `procedural` | Darbplūsmas / pamācību atmiņa (rezervēta; pašlaik nav automātiska izvilcēja) |
| `semantic`   | Rezervēta vektoru krātuves ierakstiem                                        |

`MemoryConfig` izgūšanas stratēģija ir viena no `exact`, `semantic` vai `hybrid`,
un tvērums ir viens no `session`, `apiKey` vai `global`. Noklusējuma tvērums no
`getMemorySettings()` ir `apiKey`.

## Faktu izvilkšana (`extraction.ts`)

Izvilkšana ir **balstīta uz regulārajām izteiksmēm**, nevis LLM — tā tiek izpildīta procesā ar
`setImmediate()`, tādēļ nekad nebloķē atbildes straumi:

- **Preferenču modeļi** → `MemoryType.FACTUAL`
  (piem., `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Lēmumu modeļi** → `MemoryType.EPISODIC`
  (piem., `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Uzvedības modeļi** → `MemoryType.FACTUAL`
  (piem., `I usually …`, `I always …`, `I tend to …`)

Katra atbilstība tiek sanitizēta (`trim`, secīgo atstarpju sakļaušana, ierobežojums līdz 500 rakstzīmēm),
dublikāti paketes ietvaros tiek noņemti, izmantojot stabilu `factKey(category, content)`, un
ieraksti tiek saglabāti ar `createMemory()`, izmantojot metadatus
`{category, extractedAt, source: "llm_response"}`. Ievades teksts ir ierobežots līdz
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — ja tas ir garāks, tiek izmantota teksta **beigu daļa**,
lai jaunākais asistenta saturs vienmēr tiktu apstrādāts.

`extractFactsFromText(text)` tiek eksportēta testiem un atgriež strukturētos
faktus, tos nesaglabājot.

## Izgūšana (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ir galvenais ieejas punkts. Tas:

1. Normalizē un validē konfigurāciju, izmantojot `MemoryConfigSchema`.
2. Nekavējoties atgriež `[]`, ja `enabled` ir false vai `maxTokens <= 0`.
3. Ierobežo `maxTokens` diapazonā `[1, 8000]`.
4. Nosaka, vai pastāv modernā `memories` tabula (pretstatā mantotajai `memory`
   tabulai), lai vecākas datubāzes turpinātu darboties.
5. Izveido pamata vaicājumu ar derīguma termiņa pārbaudi
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), neobligātu
   sesijas tvērumu un neobligātu `retentionDays` robežvērtību.
6. Sazarojas atkarībā no stratēģijas:
   - **`exact`** (noklusējums): hronoloģiski `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ja pastāv `config.query` un `memory_fts`, izpilda JOIN ar
     `memory_fts MATCH ?` un kārto pēc FTS ranga; ja FTS atgriež 0 rindas,
     izmanto hronoloģisko secību.
   - **`hybrid`**: FTS rezultātu (ar augstāku atbilstību) un
     hronoloģiskās kopas apvienojums, noņemot dublikātus pēc id.
7. Aprēķina atslēgvārdu atbilstības vērtējumu (`getRelevanceScore`) laukiem
   `content`, `key` un `metadata` JSON, ja ir norādīts vaicājums. Rindas ar
   nulles vērtējumu tiek izfiltrētas.
8. Kārto pēc vērtējuma dilstošā secībā, pēc tam pēc `createdAt` dilstošā secībā.
9. Secīgi apstrādā sarindoto sarakstu un pieņem ierakstus, kamēr kopējais
   `estimateTokens(content)` (≈ `length / 4`) nepārsniedz budžetu. Ja ir
   atrasta kaut viena atbilstība, vienmēr atgriež vismaz vienu ierakstu.

`estimateTokens` tiek eksportēta un izmantota izgūšanā, kopsavilkumu veidošanā un MCP
`omniroute_memory_search` rīkā.

## Injekcija (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Apvieno visu atmiņu saturu vienā virknē `Memory context: …`.
2. Izvēlas stratēģiju pēc nodrošinātāja nosaukuma:
   - **Sistēmas ziņojums** (pēc noklusējuma OpenAI, Anthropic, Gemini u.c.) — pievieno
     `{role: "system", content: memoryText}` pirms visiem esošajiem sistēmas
     ziņojumiem, lai lietotāja sistēmas uzvednēm joprojām būtu prioritāte.
   - **Lietotāja ziņojums** (rezerves variants) — nodrošinātājiem, kas iekļauti
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Tie noraida sistēmas lomu
     un pretējā gadījumā atgrieztu 400 (skat. problēmu #1701 par GLM/Zhipu).
3. Reģistrē skaitu, stratēģiju un modeli notikumā `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` tiek eksportēta izsaucējiem, kuriem
jāpieņem savi maršrutēšanas lēmumi. Nezināmiem nodrošinātājiem drošības nolūkos
pēc noklusējuma tiek izmantots `true` (sistēmas loma ir atļauta).

## Iestatījumi (`settings.ts`)

Atmiņas konfigurācija tiek **glabāta DB iestatījumu tabulā**, nevis vides mainīgajos.
`getMemorySettings()` nolasa datus no `getSettings()` un kešatmiņā saglabā rezultātu
procesa ietvaros; `invalidateMemorySettingsCache()` pēc ierakstīšanas izsauc
iestatījumu PUT maršruts.

### Mantotie lauki (visas versijas)

| DB atslēga            | Tips    | Noklusējums                                          | UI vadīkla                                                   |
| --------------------- | ------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `memoryEnabled`       | boolean | `false` (pēc noklusējuma izslēgts kopš v3.8.30)      | Atmiņas ieslēgšana/izslēgšana                                |
| `memoryMaxTokens`     | integer | `2000` (diapazons `0–16000`)                         | Žetonu budžets injekcijai                                    |
| `memoryRetentionDays` | integer | `30` (diapazons `1–365`)                             | Saglabāšanas periods                                         |
| `memoryStrategy`      | enum    | `"hybrid"` (viens no `recent`, `semantic`, `hybrid`) | Izgūšanas stratēģija                                         |
| `skillsEnabled`       | boolean | `false`                                              | Pārslēdz prasmju injekciju katrai atslēgai (skat. SKILLS.md) |

Piezīme: UI stratēģija `"recent"` tiek kartēta uz iekšējo izgūšanas
stratēģiju `"exact"`, izmantojot `toMemoryRetrievalConfig()` (hronoloģiskā secībā).

### Jaunie lauki (v3.8.6, plāns 21 D9)

Lauku aprakstus skatiet arī iepriekš sadaļā "Iestatījumu paplašinājums".

| DB atslēga                  | API lauks                | Noklusējums |
| --------------------------- | ------------------------ | ----------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`    |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`      |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`     |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`     |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`     |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`      |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`    |

Ar Qdrant saistītās DB atslēgas (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` ar noklusējuma vērtību `"omniroute_memory"`,
`qdrantEmbeddingModel` ar noklusējuma vērtību `"openai/text-embedding-3-small"`)
nolasa `normalizeQdrantConfig()` failā `qdrant.ts`.

### Vides mainīgie (v3.8.6)

Seši neobligāti vides mainīgie pielāgo dzinēja darbību izpildlaikā (dokumentēti `.env.example`):

| Mainīgais                       | Noklusējums                | Apraksts                                                                                                                                          |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Iegultumu kešatmiņas TTL (5 min)                                                                                                                  |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maksimālais ierakstu skaits iegultumu LRU kešatmiņā                                                                                               |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF repozitorijs Transformers.js modelim                                                                                                           |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repozitorijs statiskajam potion modelim                                                                                                        |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Lejupielādēto modeļu glabāšanas vieta                                                                                                             |
| `MEMORY_VEC_TOP_K`              | `20`                       | Noklusējuma top-K vērtība vektoru meklēšanai                                                                                                      |
| `MEMORY_RRF_K`                  | `60`                       | RRF k konstante hibrīdajai meklēšanai                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Iestatiet uz `int8`, lai lokālos sqlite-vec vektorus glabātu kvantizētus (~4× mazākus; jāiespējo atsevišķi). Režīma maiņa izraisa pārindeksēšanu. |

## Apkopošana (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` saspiež vecāku
saturu, kad kopējais izmantoto marķieru skaits atslēgas atmiņas ierakstos
pārsniedz budžetu. Funkcija iterē rindas `created_at` dilstošā secībā, saglabā
rindas, kas ietilpst budžetā, un pārējām aizstāj `content` vērtību ar sākotnējā
satura pirmajiem trim teikumiem. `tokensSaved` ir `estimateTokens` starpība
starp veco un jauno saturu.

Šī procedūra pašreizējā tērzēšanas konveijerā ir **pieejama, bet netiek izsaukta automātiski**
— izsauciet to no cron uzdevuma, administratora darbības vai
`MemoryConfig.autoSummarize` integrācijas, ja nepieciešama pastāvīga saspiešana.
Datu zudums ir neatgriezenisks: sākotnējais teksts tiek pārrakstīts.

## REST API

Visiem galapunktiem ir nepieciešama pārvaldības autentifikācija (`requireManagementAuth`).

### Galvenie atmiņas galapunkti (esošie + atjauninātie)

| Metode   | Ceļš                 | Apraksts                                                                                                                                                                                                         |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lappušu saraksts ar filtriem: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Atbilde ietver `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                                   |
| `POST`   | `/api/memory`        | Izveido ierakstu (validēts ar Zod: `content`, `key`, neobligāti `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Izsauc `createMemory()`, kas veic ievietošanu vai atjaunināšanu pēc `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Iegūst vienu ierakstu pēc UUID                                                                                                                                                                                   |
| `PUT`    | `/api/memory/[id]`   | Atjaunina ieraksta laukus (`type`, `key`, `content`, `metadata`). Pamatteksts: `MemoryUpdatePutSchema`. Sinhronizē arī vektoru, ja ir pieejams iegultnes avots.                                                  |
| `DELETE` | `/api/memory/[id]`   | Dzēš ierakstu; dzēš to arī no `vec_memories` (D15) un iespēju robežās no Qdrant. Ja ieraksta nav, atgriež 404.                                                                                                   |
| `GET`    | `/api/memory/health` | Izpilda `verifyExtractionPipeline("health-check")` — pilns cikls izveidot→uzskaitīt→dzēst. Atgriež `{working, latencyMs, error?}`                                                                                |

### Jaunie atmiņas dzinēja galapunkti (21. plāns)

| Metode | Ceļš                              | Apraksts                                                                                                                                                                                        |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` izmēģinājuma izpilde — atgriež sarindotus rezultātus ar vērtējumu, līmeni un marķieru skaitu. Pamatteksts: `RetrievePreviewSchema`. NEIEVIETO un nemaina atmiņas ierakstus.  |
| `GET`  | `/api/memory/embedding-providers` | Uzskaita nodrošinātājus ar iegultņu modeļiem, norādot, kuriem ir konfigurēta API atslēga.                                                                                                       |
| `GET`  | `/api/memory/engine-status`       | Atgriež pilnu dzinēja statusu: atslēgvārdu līmeni, iegultnes atrisinājumu, vektoru krātuves statistiku, Qdrant darbspēju un pārkārtošanas konfigurāciju. Struktūra: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Manuāli aktivizē atmiņas saspiešanu. Pamatteksts: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Atgriež `{candidates, tokensSaved}`.                                        |
| `POST` | `/api/memory/reindex`             | Aktivizē vektoru pārindeksēšanu atmiņas ierakstiem, kuriem ir `needs_reindex=1`. Pamatteksts: `MemoryReindexSchema` (`force`). Atgriež `{started, pending}`.                                    |

### Iestatījumu galapunkti

| Metode | Ceļš                                    | Apraksts                                                                                                                |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Pašreizējais normalizētais `MemorySettingsExtended` (7 jauni lauki + mantotie lauki)                                    |
| `PUT`  | `/api/settings/memory`                  | Atjaunina jebkuru lauku no `MemorySettingsExtendedSchema` (kopā 12 lauki)                                               |
| `GET`  | `/api/settings/qdrant`                  | Pašreizējie Qdrant iestatījumi (`QdrantSettingsSchema`)                                                                 |
| `PUT`  | `/api/settings/qdrant`                  | Atjaunina Qdrant iestatījumus. Pamatteksts: `QdrantSettingsUpdateSchema`. Tukša `apiKey` virkne noņem atslēgu.          |
| `GET`  | `/api/settings/qdrant/health`           | Dzīvīguma pārbaude konfigurētajai Qdrant instancei. Atgriež `QdrantHealthResultSchema`.                                 |
| `POST` | `/api/settings/qdrant/search`           | Semantiskās meklēšanas tests Qdrant krātuvē. Pamatteksts: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | Noņem no Qdrant punktus, kas attiecas uz atmiņas ierakstiem ar beigušos derīguma termiņu vai veciem atmiņas ierakstiem. |
| `GET`  | `/api/settings/qdrant/embedding-models` | Uzskaita Qdrant pieejamos iegultņu modeļus.                                                                             |

`/api/memory` saraksta vaicājums atbalsta gan uz `page` balstītu lappušu dalījumu
(`parsePaginationParams`), **gan** neapstrādātu `offset` vērtību — ja ir norādīts
`offset`, tam ir prioritāte, un atbildes struktūrai tiek aprēķināta atvasināta
`page` vērtība.

## MCP rīki (`open-sse/mcp-server/tools/memoryTools.ts`)

Kad MCP serveris ir iespējots, tiek reģistrēti trīs atmiņas rīki:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → ietver `retrieveMemories()`. Sākot ar v3.8.6 (D16), `strategy` tiek nolasīta
  no `getMemorySettings()`, nevis fiksēta kā `"exact"`. Ja ir norādīts
  `query` un `strategy` ir `semantic` vai `hybrid`, tiek izmantota vektoru
  krātuve, ja tā ir pieejama.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → ietver `createMemory()`. Pieņem tikai 4 kanoniskos tipus:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → uzskaita
  atbilstošos ierakstus, pēc izvēles filtrē pēc izveides laika, kas ir pirms
  norādītā laikspiedola, un pēc tam katru izdzēš, izmantojot `deleteMemory()`
  (kas arī noņem vektorus no sqlite-vec un Qdrant).

Informāciju par transportu un tvērumu skatiet [MCP-SERVER.md](./MCP-SERVER.md).

## Informācijas panelis (Atmiņas studija)

`src/app/(dashboard)/dashboard/memory/page.tsx` tagad ir **studija ar 3 cilnēm**:

### Cilne: Atmiņas

- Koncepcijas kartīte (sakļaujams skaidrojums „Kā tas darbojas”).
- Reāllaika saraksts, meklēšana un lapošana (300 ms aizkave).
- Tipa filtrs (`factual` / `episodic` / `procedural` / `semantic` / visi).
- Atmiņas pievienošanas modālais logs (atslēga, saturs, tips).
- Iekļautā rediģēšana (zīmuļa poga → `PUT /api/memory/[id]`).
- Dzēšana katrā rindā (ar apstiprinājuma dialoglodziņu).
- Pašreizējās lapas JSON eksportēšana; JSON importēšana, izmantojot failu atlasītāju.
- Statistikas kartītes: `totalEntries`, `tokensUsed`, `hitRate`.
- Poga „Sablīvēt vecos” → `POST /api/memory/summarize` (vispirms izmēģinājuma
  režīms parāda kandidātu skaitu, pēc tam tiek prasīts apstiprinājums).
- Zaļš/sarkans darbspējas indikators, ko pārvalda `GET /api/memory/health`.

### Cilne: Izmēģinājumu vide

- Vaicājuma ievade + stratēģijas atlasītājs (Precīza / Semantiska / Hibrīda) + tokenu budžets.
- „Simulēt” → `POST /api/memory/retrieve-preview` — parāda ranžētus rezultātus ar
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Atrisinājuma panelis, kas parāda, kurš iegultās reprezentācijas avots / vektoru krātuve tika izmantota un
  vai notika pārslēgšanās uz rezerves risinājumu.

### Cilne: Dzinējs

- Dzinēja statusa panelis (atslēgvārdu FTS5 emblēma, iegultās reprezentācijas emblēma, vektoru krātuves emblēma,
  Qdrant darbspējas emblēma, atkārtotas ranžēšanas emblēma).
- Poga „Pārindeksēt tagad” → `POST /api/memory/reindex`.
- Iegultās reprezentācijas avota atlasītājs (automātisks / attāls / statisks / transformers + pārslēgi).
- Qdrant konfigurācijas kartīte (iespējošanas pārslēgs, resursdators/ports/kolekcija/atslēga, savienojuma pārbaude,
  semantiskās meklēšanas pārbaude, tīrīšana).
- Atkārtotas ranžēšanas konfigurācijas kartīte (iespējošanas pārslēgs, nodrošinātāja/modeļa atlasītājs).

Atmiņas un Qdrant iestatījumi ir pieejami arī sadaļā
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`)
mantotajai/globālajai iestatījumu saskarnei.

## Kešošana

`src/lib/memory/store.ts` uztur procesa iekšēju LRU tipa kešatmiņu
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, ar 20 %
vecāko ierakstu izmešanu) `getMemory(id)` lasījumiem, kā arī vispārīgu atslēgu/vērtību
`memoryCache` slāni (`src/lib/memory/cache.ts`) ar `get`/`set`/`invalidate`
metodēm, ko izmanto izsaucēji, kuriem nepieciešama sava tvēruma kešatmiņa (1 000 ierakstu LRU,
noklusējuma TTL — 5 min).

## Privātums un dzīves cikls

- Atmiņas īpašnieks ir API atslēgas ID (`resolveMemoryOwnerId` failā
  `chatCore.ts`). Bez `apiKeyInfo.id` netiek veikta ne izgūšana, ne ievietošana,
  ne izvilkšana.
- Ieraksti ar nākotnē esošu `expires_at` vērtību tiek izfiltrēti no izgūšanas;
  vecie ieraksti, kas pārsniedz `retentionDays`, tiek izslēgti ar
  `created_at >= cutoff` nosacījumu funkcijā `retrieveMemories`.
- Pilnīgai dzēšanai izmantojiet `DELETE /api/memory/[id]` vai `omniroute_memory_clear`.
- Izvilkšana tiek veikta fonā, negaidot rezultātu, izmantojot `setImmediate`;
  kļūmes tiek reģistrētas ar `memory.extraction.background.failed` un nekad
  netiek parādītas izsaucējam.
- Verifikācijas pilnie cikli (`verifyExtractionPipeline`) iztīra savus
  testa ierakstus `finally` blokā.

## Skatiet arī

- [SKILLS.md](./SKILLS.md) — iestatījums `skillsEnabled` kopā ar atmiņu ievieto
  arī rīku definīcijas.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transports / tvērumi.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — plašāks API tvērums.
- Avota moduļi:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibrīds RRF
  - `src/lib/memory/embedding/index.ts` — vairāku avotu iegulšanas slānis
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod shēmas visu atmiņas API pieprasījumu ķermeņiem
  - `src/shared/schemas/qdrant.ts` — Zod shēmas Qdrant iestatījumiem/operācijām
  - `src/lib/db/memoryVec.ts` — CRUD darbības tabulai `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + apakšmaršruti
  - `src/app/(dashboard)/dashboard/memory/` — Studio lietotāja saskarne (lapa + komponenti +
    cilnes + āķi)
  - `open-sse/handlers/chatCore.ts` (ievietošanas / izvilkšanas savienojumi)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Iegulšanas nodrošinātāja izvēle (v3.8.16+)

OmniRoute atmiņas dzinis atbalsta **četrus iegulšanas avotus** (`src/lib/memory/embedding/`). Katram ir atšķirīgi kompromisi attiecībā uz **latentumu, izmaksām, modeļa kvalitāti un iestatīšanas sarežģītību**.

### Iegulšanas avoti

| Nodrošinātājs  | Avots                                         | Latentums                                       | Izmaksas               | Kvalitāte                                         | Iestatīšana                           |
| -------------- | --------------------------------------------- | ----------------------------------------------- | ---------------------- | ------------------------------------------------- | ------------------------------------- |
| `transformers` | Lokāls ONNX modelis (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                                 | Bez maksas             | Laba                                              | Tikai `npm install`                   |
| `static`       | Iepriekš aprēķināti vektori (kešoti)          | <1ms                                            | Bez maksas             | Nav piemērojams (atkarīgs no trāpījuma kešatmiņā) | Nav                                   |
| `remote`       | OpenAI / Cohere / Voyage API                  | ~100-300ms                                      | $0.02-0.10/1M marķieru | Izcila                                            | API atslēga                           |
| `auto`         | Izpildlaikā izvēlas labāko pieejamo avotu     | Tāds pats kā izvēlētajam avotam                 | Bez maksas             | Tāda pati kā izvēlētajam avotam                   | Nav                                   |
| _(kešatmiņa)_  | Atmiņā esošs LRU slānis virs jebkura avota    | <1ms (trāpījums), pilns latentums (netrāpījums) | Bez maksas             | Tāda pati kā pamatavotam                          | Vienmēr ieslēgts (nav izvēlams avots) |

### Lēmumu koks

```
                  Kāds ir jūsu izvietošanas konteksts?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  IZSTRĀDE/TESTI MAZA PRODUKCIJA LIELA PRODUKCIJA MALA / BEZSAISTE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (bez maksas, bez API)      (labākā kvalitāte) (bez interneta)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            VIENMĒR augšpusē pievienojiet `cache` slāni
            (`LruCache` aptver jebkuru nodrošinātāju)
```

### Datubāzes un API konfigurācija

Atmiņas iegulšanas opcijas tiek konfigurētas, izmantojot iestatījumu API/lietotāja saskarni, nevis vides mainīgos. Attiecīgās iestatījumu datubāzes atslēgas sadaļā Iestatījumi (`normalizeMemorySettings` failā `src/lib/memory/settings.ts`) ir:

- `memoryEmbeddingSource`: `"transformers"` (lokāls), `"remote"` (balstīts uz API, piem., OpenAI), `"static"` (ārējs glabātavas avots) vai `"auto"`
- `memoryEmbeddingProviderModel`: modeļa identifikators attāliem/statiskiem avotiem (piem., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` vai `"auto"`

#### Lokālais modelis (`transformers`)

Iekšēji izmanto transformers.js, lai darbinātu lokālos modeļus:

```bash
# Kodā nolasītie vides mainīgie (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF modeļa repozitorijs
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statiskais potion modelis
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Kešatmiņas direktorijs
```

#### LRU iegulšanas kešatmiņa

Kešatmiņa pēc noklusējuma vienmēr ir ieslēgta un tiek konfigurēta, izmantojot vides mainīgos:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maksimālais kešoto vienumu skaits
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Veiktspējas rādītāji

Etalonmērījums tipiskā 4 kodolu x86 serverī (teksti — katrs ~100 žetonu):

| Nodrošinātājs        | p50   | p95   | p99   | Izmaksas / 1M iegultumu            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Bez maksas                         |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Atkarīgas no Qdrant mitināšanas    |
| `cache` (trāpījums)  | <1ms  | <1ms  | 2ms   | Bez maksas                         |

---

## Faktu izgūšanas modeļi (v3.8.16+)

Modulis `extraction.ts` (`src/lib/memory/extraction.ts`) izmanto **regulāro izteiksmju modeļu atbilstību**, lai no sarunu ziņojumiem izgūtu strukturētus faktus. Šo modeļu izpratne palīdz pielāgot izgūšanas kvalitāti jūsu lietošanas gadījumam.

### Noklusējuma modeļu kategorijas

| Kategorija          | Modeļa piemērs                                              | Izgūst                          |
| ------------------- | ----------------------------------------------------------- | ------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Lietotāja preferences           |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Lietotāja lēmumus (epizodiskus) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Pastāvīgus uzvedības modeļus    |

### Modeļu piemēri (vienkāršoti)

```ts
// No src/lib/memory/extraction.ts
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

### Kas tiek izgūts

Kad lietotājs saka:

> "Es dodu priekšroku TypeScript. Šajā projektā izmantošu Postgres. Es vienmēr veicu commit pirms push. Man nepatīk Python."
> Izgūšanas rezultātā tiek izveidotas 4 atmiņas:
>
> | Atslēga                              | Kategorija | Tips     | Saturs                   |
> | ------------------------------------ | ---------- | -------- | ------------------------ |
> | `preference:typescript`              | preference | factual  | "TypeScript"             |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres šim projektam" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit pirms push"      |
> | `preference:python`                  | preference | factual  | "Python"                 |

### Izgūšanas ierobežojumi

Lai novērstu nekontrolētu izgūšanu, tiek piemēroti šādi ierobežojumi:

| Minimālais satura garums | 3 rakstzīmes |
| Maksimālais satura garums | 500 rakstzīmes |

### Kad atspējot izgūšanu

Izgūšana tiek veikta automātiski ikreiz, kad ir iespējota atmiņa; nav atsevišķa
slēdža tikai izgūšanai. Lai to izslēgtu, pilnībā atspējojiet atmiņu (`enabled: false`,
izmantojot `PUT /api/settings/memory`). Apsveriet to šādos gadījumos:

- Jums ir liels ziņojumu apjoms, un izgūšanas izmaksas nav nenozīmīgas
- Jūsu sarunas lielākoties ir īslaicīgas (tērzēšana, atkļūdošana) un tām nav ilgtermiņa vērtības
- Jūs jau fiksējat kontekstu, izmantojot pielāgotus spraudņus

---

## Hibrīdās RRF pielāgošana (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** algoritms apvieno FTS5 (atslēgvārdu) un vektoru (semantiskos) rezultātus. Parametrs `k` nosaka, cik liels svars tiek piešķirts zemāk ierindotiem rezultātiem.

### Formula

Katras kandidātatmiņas RRF vērtējums ir:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Kur:

- `k` ir konstante (noklusējuma vērtība — 60)
- `rank_i(d)` ir dokumenta `d` vieta i-tajā izguves sistēmā (FTS, vektoru)
- Summa tiek aprēķināta visām izguves sistēmām

### Kā `k` ietekmē rezultātus

| `k` vērtība              | Ietekme                                                                               | Vispiemērotākais lietojums                 |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------ |
| `k=0`                    | Tīra rangu apvienošana (bez izlīdzināšanas)                                           | Teorētiskā bāzes vērtība                   |
| `k=10-30`                | Piešķir lielu svaru augstākajiem rezultātiem; zems rangs gandrīz neko neietekmē       | Ja pirmie 3 rezultāti parasti ir pareizi   |
| **`k=60`** (noklusējums) | Līdzsvarots — visi pirmie 10 rezultāti sniedz nozīmīgu ieguldījumu                    | Universālai izguvei                        |
| `k=100+`                 | Vienmērīgāks — pat zema ranga rezultāti var dominēt, ja tie parādās vairākās sistēmās | Ja pārklājums ir svarīgāks par precizitāti |

### `k` pielāgošana praksē

```bash
# Noklusējums
MEMORY_RRF_K=60

# Agresīva precizitāte (maza atmiņa, maz dokumentu)
MEMORY_RRF_K=20

# Maksimāls pārklājums (liela atmiņa, dažādi vaicājumi)
MEMORY_RRF_K=120
```

**Piemērs ar `k=20`:**

- FTS 1. vieta → ieguldījums `1/21 = 0.048`
- FTS 10. vieta → ieguldījums `1/30 = 0.033`
- Vektoru 1. vieta → ieguldījums `0.048`
- Apvienotais maksimums: `0.096`

**Piemērs ar `k=60`:**

- FTS 1. vieta → ieguldījums `1/61 = 0.016`
- FTS 10. vieta → ieguldījums `1/70 = 0.014`
- Vektoru 1. vieta → ieguldījums `0.016`
- Apvienotais maksimums: `0.033`

Ar lielāku `k` **relatīvā atšķirība** starp 1. un 10. vietu ir mazāka, tāpēc algoritms vairāk paļaujas uz **izguves sistēmu savstarpējo vienprātību**, nevis augstākā ranga pārliecību.

### Kad mainīt `k`

| Simptoms                                                     | Izmēģiniet                                                                       |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Augstākais rezultāts vienmēr uzvar, bet tas ir nepareizs     | **Samaziniet** k (piem., līdz 20) — augstākā ranga pārliecībai ir lielāka nozīme |
| Pareizā atbilde ir pirmajā pieciniekā, bet nav pirmajā vietā | **Palieliniet** k (piem., līdz 100) — vienmērīgāks vērtējums atalgo vienprātību  |
| Pārklājums ir augsts, bet precizitāte ir zema                | **Samaziniet** k — padariet ranžējumu izteiktāku                                 |
| Pārklājums ir zems (trūkst atbilstošu dokumentu)             | **Palieliniet** k — dodiet iespēju zemāk ierindotiem dokumentiem                 |

### RRF svērumi

Reciprocal Rank Fusion izmanto vienādus svarus semantiskā vektora rangam un pilnteksta meklēšanas rangam:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Nav vides mainīgo, ar kuriem varētu pielāgot individuālos svarus (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` nepastāv).

---

## Apkopošanas stratēģija (v3.8.16+)

Modulis `summarization.ts` (`src/lib/memory/summarization.ts`) saspiež vecākas atmiņas, lai aktīvā kopa būtu neliela, vienlaikus saglabājot iespēju tās atsaukt.

### Kad tiek aktivizēta apkopošana

| Aktivizētājs                | Slieksnis (noklusējuma) |
| --------------------------- | ----------------------- |
| Manuāla aktivizēšana ar API | nav piemērojams         |

### Kas tiek apkopots

No `summarization.ts` tiek eksportēti divi ieejas punkti:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — apkopo sesijas
  atmiņas vienā kopsavilkuma tekstā, ievērojot marķieru budžeta ierobežojumu.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API izmantotā, uz vecumu
  balstītā saspiešana: tā atlasa visas atmiņas, kas ir vecākas par `days`, izveido
  no tām vienu saspiestu kopsavilkuma atmiņu un (kad `dryRun` ir `false`) dzēš
  oriģinālus. Norādiet `dryRun: true`, lai priekšskatītu kandidātu kopu un kopējo
  marķieru skaitu, neko nemainot.

Netiek veikta grupēšana pēc tagiem/atslēgām vai katras atmiņas novērtēšana kā „pamata” vai „apkopojama” —
atlase balstās tikai uz vecuma robežvērtību, un kopsavilkuma tekstā katram kandidātam tiek izveidota
saspiesta rinda ar tipa prefiksu.

### Apkopošanas aktivizēšana

Apkopošana ir **manuāla / pēc izvēles** — iestatījums `autoSummarize` pēc
noklusējuma ir `false`, tāpēc nekas netiek automātiski saspiests. Aktivizējiet to, izmantojot API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Lai tā paliktu izslēgta, vienkārši atstājiet `autoSummarize` noklusējuma vērtību (`false`).

### Padomi apkopošanas kvalitātes uzlabošanai

- **Vispirms veiciet priekšskatījumu ar `dryRun`** — `summarizeMemoriesOlderThan(..., true)` atgriež
  kandidātu sarakstu un kopējo marķieru skaitu, lai pirms oriģinālu dzēšanas varētu apstiprināt,
  kas tiks apvienots.
- **Veiciet apkopošanu zemas noslodzes stundās**, ja jums ir liels atmiņu korpuss — LLM izsaukums ir procesa lēnākā daļa

```bash
# Cron stilā: apkopot katru dienu plkst. 3.00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend nodrošinātāja modelis

> **Patiesības avots:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testi:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend nodrošinātāja modelis esošajam atmiņas dzinējam pievieno **maināmu aizmugursistēmas abstrakcijas slāni**. Tā vietā, lai atmiņas sistēma būtu piesaistīta vienai glabāšanas implementācijai, tā tagad atbalsta vairākas aizmugursistēmas (SQLite, Obsidian, Notion, pielāgotas HTTP aizmugursistēmas) ar konfigurējamu primāro/rezerves maršrutēšanu.

### Arhitektūra

```
┌──────────────────────────────────────────────────────────┐
│                    API maršruti                           │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│        Vieninstances koordinators (manager.ts)            │
│                                                          │
│  Primārā ──► Aizmugursistēma A  (piem., SQLite)          │
│  Rezerve ──► Aizmugursistēma B  (piem., Obsidian)        │
│              Aizmugursistēma C  (piem., Notion,          │
│                                  izmantojot GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ aizmugur-  │ │ aizmugur-  │ │ aizmugursistēma │
│ sistēma    │ │ sistēma    │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Pamata saskarne (`backend.ts`)

Katrai aizmugursistēmai ir jāimplementē saskarne `MemoryBackend`:

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

  // Meklēšana
  search(config: SearchConfig): Promise<Memory[]>;

  // Darbspēja
  health(): Promise<HealthCheckResult>;

  // Dzīves cikls (neobligāts)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Vieninstances koordinators, kas:

- **Reģistrē** aizmugursistēmas, izmantojot `register(backend)` — sāknēšanas laikā tiek izsaukts no `index.ts`
- **Konfigurē** primāro un rezerves aizmugursistēmas, izmantojot `configure(primary, fallbacks)`
- **Maršrutē** CRUD/meklēšanas darbības uz primāro aizmugursistēmu, kļūmes gadījumā izmantojot rezerves ķēdi
- Periodiski veic visu aizmugursistēmu **darbspējas pārbaudes**

**Rezerves darbība:**

| Darbība  | Primārā                    | Rezerves                              |
| -------- | -------------------------- | ------------------------------------- |
| `create` | ✅ Tikai primārā           | ❌                                    |
| `get`    | ✅ Vispirms mēģina primāro | ✅ Rezerves, ja rezultāts ir null     |
| `update` | ✅ Tikai primārā           | ✅ Sinhronizācija, negaidot rezultātu |
| `delete` | ✅ Tikai primārā           | ✅ Sinhronizācija, negaidot rezultātu |
| `list`   | ✅ Tikai primārā           | ❌                                    |
| `search` | ✅ Vispirms primārā        | ✅ Rezerves kļūdas gadījumā           |

#### GenericMemoryBackend (`genericBackend.ts`)

Universāls HTTP savienotājs, kas jebkuru REST API pielāgo par MemoryBackend. Noderīgs šādiem mērķiem:

- **Notion** — savienošana, izmantojot Notion API
- **Obsidian** — savienošana, izmantojot Obsidian Local REST API
- **Pielāgotas aizmugursistēmas** — jebkurš pakalpojums, kas nodrošina RESTful atmiņas API

**Konfigurācija:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Aizmugursistēmas API bāzes URL
  apiKey?: string;           // Bearer pilnvara autentifikācijai
  headers?: Record<string, string>;  // Pielāgotas HTTP galvenes
  timeout?: number;          // Pieprasījuma taimauts (noklusējums: 30000ms)
  backendType?: string;      // Žurnalēšanai

  // Galapunktu pārrakstīšana (noklusējumi izmanto REST principus)
  endpoints?: {
    search?: string;   // noklusējums: "/memories/search"
    create?: string;   // noklusējums: "/memories"
    list?: string;     // noklusējums: "/memories"
    get?: string;      // noklusējums: "/memories/{id}"
    update?: string;   // noklusējums: "/memories/{id}"
    delete?: string;   // noklusējums: "/memories/{id}"
    health?: string;   // noklusējums: "/health"
  };

  // Vaicājuma parametru nosaukumu kartējumi
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Ceļa parametru nosaukumu kartējumi
  pathParams?: {
    id?/memoryId?
  };
}
```

**Zināmās aizmugursistēmas** ir iepriekš konfigurētas objektā `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend, kas norāda uz localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend, kas norāda uz api.notion.com/v1
```

#### Iebūvētās aizmugursistēmas

##### SQLiteBackend (`sqliteBackend.ts`)

Noklusējuma primārā aizmugursistēma. Ietver esošo uz SQLite balstīto atmiņas krātuvi, izmantojot `src/lib/memory/store.ts`. Automātiski reģistrēta palaišanas laikā.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Ietver esošo Obsidian integrāciju (`src/lib/memory/obsidianBackend.ts`). Izveido savienojumu ar Obsidian glabātuvi, izmantojot Obsidian Local REST API.

### Iestatījumi

Atmiņas aizmugursistēmas iestatījumi tiek glabāti lietotnes iestatījumu tabulā un pārvaldīti, izmantojot `src/lib/memory/settings.ts`:

| Iestatījums                    | Vides/konfigurācijas atslēga | Noklusējums | Apraksts                                             |
| ------------------------------ | ---------------------------- | ----------- | ---------------------------------------------------- |
| Primārā aizmugursistēma        | `memoryPrimaryBackend`       | `"sqlite"`  | Primārās aizmugursistēmas ID                         |
| Rezerves aizmugursistēmas      | `memoryFallbackBackends`     | `[]`        | Sakārtoti rezerves aizmugursistēmu ID                |
| Aizmugursistēmu konfigurācijas | `memoryBackendConfigs`       | `{}`        | Katras aizmugursistēmas konfigurācijas pārrakstīšana |

Iestatījumi tiek normalizēti, izmantojot `normalizeMemorySettings()`, un kešoti funkcijā `getMemorySettings()`.

### Inicializācijas plūsma

```
Lietotnes sāknēšana
  → index.ts importēšana (blakusefekts): reģistrē SQLiteBackend
  → initMemoryBackends() tiek izsaukta no lietotnes dzīves cikla:
      1. Ielādē iestatījumus (getMemorySettings)
      2. Konfigurē primāro un rezerves aizmugursistēmas
      3. Inicializē visas aizmugursistēmas (darbspējas pārbaude)
      4. Gatavs pieprasījumiem
```

### Jaunas aizmugursistēmas pievienošana

1. **Implementējiet `MemoryBackend`** saskarni failā `src/lib/memory/<name>Backend.ts`
2. **Eksportējiet** no `src/lib/memory/index.ts`
3. **Reģistrējiet** ar `memoryManager.register(yourBackend)` palaišanas laikā
4. **Konfigurējiet**, izmantojot iestatījumus: iestatiet `memoryPrimaryBackend` uz savas aizmugursistēmas ID
5. **Testējiet**, izmantojot `src/lib/memory/__tests__/generic-backend.test.ts` kā atsauci

#### Piemērs: Brain aizmugursistēma

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

### Verifikācija

#### Vienībtesti

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Sagaidāmais rezultāts: **35 testi, visi sekmīgi**, kas aptver:

- Konstruktoru (2)
- Darbspējas pārbaudi (4) — sekmīgs iznākums, kļūme 500, tīkla kļūda, latentums
- Inicializāciju (2) — sekmīgs iznākums, kļūme
- Izveidi (2) — noklusējuma galapunkts, pielāgots galapunkts
- Iegūšanu (4) — sekmīgs iznākums, 404 → null, kļūdas izmešana statusam, kas nav 404, pielāgoti ceļa parametri
- Atjaunināšanu (2) — sekmīgs iznākums, 404 → false
- Dzēšanu (2) — sekmīgs iznākums, 404 → false
- Uzskaitīšanu (2) — vaicājuma parametri, pielāgoti parametru nosaukumi
- Meklēšanu (3) — vaicājuma parametri, pielāgots galapunkts, opciju serializācija
- Autentifikācijas galvenes (2) — Bearer pilnvara, pielāgotas galvenes
- Fabriku (1)

#### Tipu pārbaude

```bash
npm run typecheck:core
```

Sagaidāms: **0 kļūdu**.
