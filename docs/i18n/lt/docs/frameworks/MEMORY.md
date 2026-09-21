# Memory System (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Pagrindinis tiesos šaltinis:** `src/lib/memory/` ir `src/app/api/memory/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40 (pagal numatytuosius nustatymus išjungta + int8 kvantizavimo suvienodinimas)

OmniRoute suteikia išliekamąją pokalbių atmintį, susietą su API raktu (ir
pasirinktinai seanso ID). Prisiminimai automatiškai išgaunami iš LLM atsakymų
naudojant lengvą reguliariųjų išraiškų šablonų atitikties paiešką ir vėl įterpiami į paskesnes
užklausas kaip pradinis sistemos pranešimas (arba pirmasis naudotojo pranešimas teikėjams,
kurie nepriima sistemos vaidmens).

> **Pagal numatytuosius nustatymus atmintis yra IŠJUNGTA (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> dabar yra `false` (`src/lib/memory/settings.ts`). Įjungus atmintį, į
> **kiekvieną** pokalbio užklausą įterpiama iki `maxTokens` (~2k) nuskaityto konteksto,
> už kurį imamas mokestis — tai gali būti netikėtos išlaidos naujiems diegimams ir klientams, kurie
> patys valdo savo kontekstą. Įjunkite ją aiškiai skiltyje **Nustatymai → Atmintis** (`MemorySkillsTab`
> rodo įspėjimą apie žetonų kainą, kai atmintis įjungta).
> Klientas gali išjungti atmintį vienai užklausai naudodamas `x-omniroute-no-memory`
> užklausos antraštę (`true`/`1`/`yes`) — žr. užklausų antraščių lentelę
> faile [API_REFERENCE.md](../reference/API_REFERENCE.md). Užklausa be atminties nustato
> `memoryOwnerId = null`, todėl tai užklausai išjungiamas **ir** atminties, **ir** įgūdžių įterpimas
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Atmintis yra **apribota pagal API raktą**, o ne pagal naudotoją — visos užklausos, autentifikuotos
tuo pačiu API raktu, naudoja tą patį atminties telkinį, kurį pasirinktinai galima papildomai
apriboti pagal `sessionId`.

## Architektūra

```
Klientas → /v1/chat/completions (apiKeyInfo nustatyta ankstesniame etape)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # išgauna ID
    → getMemorySettings()                     # podėlyje laikomi nustatymai
    → shouldInjectMemory(body, {enabled})     # prieigos sąlyga
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + pasirinktinis vektorius
    → injectMemory(body, memories, provider)  # sistemos arba naudotojo pranešimas
  → išorinio teikėjo iškvietimas
  → gavus atsakymą: extractFacts(text, apiKeyId, sessionId)  # neblokuojantis
    → setImmediate → createMemory(fact) kiekvienai atitikčiai
                   → embed(content) + upsertVector(id, vec)
```

Įterpimo ir išgavimo iškvietimo vietos yra susietos faile
`open-sse/handlers/chatCore.ts` (ieškokite `retrieveMemories`, `injectMemory`
ir `extractFacts`).

## Variklio architektūra (3 lygių parinkimas)

Atminties variklis vykdymo metu parenka paieškos kelią pagal prieinamą
infrastruktūrą ir nustatymus. Yra trys lygiai, taikomi prioriteto tvarka:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  0 LYGIS — Raktažodžiai (FTS5)                              │
  │  Prieinamumas nustatomas patikra: FTS5 naudojamas, kai       │
  │  SQLite versija jį palaiko (better-sqlite3 / node:sqlite /  │
  │  bun:sqlite); nepasiekiamas versijose be FTS5 (pvz.,         │
  │  sql.js/WASM — "no such module: fts5"). Naudojamas, kai     │
  │  strategy = "exact", arba kaip atsarginis variantas;        │
  │  variklio būsenos raktažodžio reikšmė atspindi patikrą.      │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  1 LYGIS — Įtaisytasis vektorius (sqlite-vec)                │
  │  sqlite-vec v0.1.9 įkeliama per db.loadExtension().          │
  │  KNN pilnoji paieška tarp Float32 vektorių. Aktyvus, kai:    │
  │   • sqlite-vec loadExtension pavyksta                        │
  │   • Pasiekiamas įterpinių šaltinis (remote | static |        │
  │     transformers), galintis sukurti Float32Array             │
  │   • Egzistuoja vec_memories lentelė (sukuriama pirmą kartą   │
  │     iškvietus ready())                                       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  2 LYGIS — Qdrant (pasirinktinė išorinė vektorių duomenų     │
  │  bazė)                                                       │
  │  Kai įjungta, pakeičia sqlite-vec semantinei / hibridinei    │
  │  paieškai. Reikia veikiančio Qdrant egzemplioriaus ir        │
  │  sukonfigūruoto pagrindinio kompiuterio / prievado.          │
  └─────────────────────────────────────────────────────────────┘
```

Veikimo suprastinimas yra automatinis ir skaidrus:

- Jei sqlite-vec nepavyksta įkelti, 1 lygis yra nepasiekiamas → grįžtama prie 0 lygio.
- Jei įterpinių šaltinis grąžina klaidą, 1 lygis grįžta prie 0 lygio.
- Jei Qdrant neveikia tinkamai, 2 lygis grįžta prie 1 lygio (arba 0 lygio, jei
  1 lygis taip pat nepasiekiamas).

## Įterpinių šaltiniai

Įterpinių sluoksnis (`src/lib/memory/embedding/`) nustato, kurį šaltinį naudoti,
pagal `MemorySettingsExtended.embeddingSource`:

| Šaltinis       | Aprašymas                                                                              | Reikalingas raktas | Šaltasis paleidimas |
| -------------- | -------------------------------------------------------------------------------------- | ------------------ | ------------------- |
| `remote`       | Naudoja sukonfigūruoto teikėjo įterpinių API (OpenAI, Cohere ir kt.)                   | Taip               | Nėra                |
| `static`       | Vietiniai paieškos lentelės įterpiniai per `potion-base-8M` (WordPiece + vidurkinimas) | Ne                 | ~200ms              |
| `transformers` | Vietinis ONNX išvedimas per `@huggingface/transformers` v4, `all-MiniLM-L6-v2`         | Ne                 | ~3s + ~400MB RAM    |
| `auto`         | Nustatymas vykdymo metu: nuotolinis (jei yra raktas) → statinis → transformers → null  | Priklauso          | Priklauso           |

**`auto` nustatymo tvarka:**

1. Rasti pirmąjį teikėją iš `listEmbeddingProviders()`, kurio `hasKey === true` → `remote`.
2. Jei `settings.staticEnabled === true` → `static`.
3. Jei `settings.transformersEnabled === true` → `transformers`.
4. Kitu atveju → `null` (pereinama prie FTS5 raktažodžių paieškos).

Įterpinių podėlis (`src/lib/memory/embedding/cache.ts`) naudoja atmintyje laikomą
LRU žemėlapį, kurio raktas yra `${source}:${model}:${dim}:${sha256(text)}` ir kuriame
gali būti ne daugiau kaip `MEMORY_EMBEDDING_CACHE_MAX` įrašų (numatytoji reikšmė – 1000), o
TTL yra `MEMORY_EMBEDDING_CACHE_TTL_MS` (numatytoji reikšmė – 5 min.). Juo dalijasi visi
to paties proceso gyvavimo ciklo kvietėjai.

## Hibridinis RRF (k=60)

Kai `strategy = "hybrid"` ir vektorių saugykla yra pasiekiama, paieškos rezultatams
iš FTS5 ir vektorinės paieškos sujungti naudojamas Reciprocal Rank Fusion:

```
RRF(d) = Σ  1 / (k + rank_i(d))      kur k = 60 (konfigūruojama per MEMORY_RRF_K)
          i
```

Konkrečiai:

1. Vykdyti FTS5 paiešką → surikiuotas sąrašas `R_fts` (pozicijos 1..N).
2. Vykdyti KNN vektorinę paiešką → surikiuotas sąrašas `R_vec` (pozicijos 1..M).
3. Kiekvienam unikaliam `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, jei sąraše nėra).
4. Rikiuoti pagal `rrf_score` mažėjančia tvarka, tada taikyti žetonų biudžeto perėjimą.

Gerai žinoma, kad RRF yra veiksmingas ir nereikalauja normalizuoti įverčių tarp
nevienalyčių paieškos sistemų. Numatytoji `k=60` reikšmė paimta iš originalaus
Cormack ir kt. straipsnio ir gerai tinka mažiems tekstynams (<10k atminčių).

## Atgalinis užpildymas (tingusis + perindeksavimas)

Kai pasikeičia įterpinių modelis (aptinkama pagal `embedding_signature`),
vektorių saugykla sukuriama iš naujo, o visos esamos atmintys lentelėje
`memories` pažymimos `needs_reindex = 1`.

**Tingusis atgalinis užpildymas**: per kitą paiešką kiekviena atmintis, kuriai
trūksta vektoriaus įrašo, prieš atliekant paiešką paverčiama įterpiniu ir įrašoma
į `vec_memories`. Taip atgalinio užpildymo sąnaudos paskirstomos realioms
užklausoms neblokuojant paleidimo.

**Aiškiai inicijuojamas perindeksavimas**: `/dashboard/memory` skirtuke „Engine“ yra
mygtukas „Reindex Now“, iškviečiantis `POST /api/memory/reindex`. Apdorojimo programa
iškviečia `runReindexBatch()` iš `src/lib/memory/reindex.ts`, kuri per vieną užklausą
apdoroja iki `limit` laukiančių įrašų. Eigos informaciją galima periodiškai gauti per
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Lentelėje `memory_vec_meta` (migracija `083_memory_vec.sql`) saugoma:

- `active_dim` — dabartinis vektoriaus matmenų skaičius (null = dar nesukalibruota).
- `embedding_signature` — `${source}:${model}:${dim}`, naudojama pakeitimams aptikti.
- `last_reset_at` — paskutinio visiško nustatymo iš naujo laiko žyma.
- `vec_loaded` — 0/1 požymis, nurodantis, ar sqlite-vec sėkmingai įkeltas.

## Nustatymų plėtinys

Devyni įterpinių ir vektorių laukai pasiekiami `MemorySettingsExtended`, esančiame
`src/shared/schemas/memory.ts`, ir išsaugomi per `src/lib/db/settings.ts`:

| Laukas                   | Tipas                                              | Numatytoji reikšmė | Aprašymas                                                             |
| ------------------------ | -------------------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`           | Kurį įterpinių šaltinį naudoti                                        |
| `embeddingProviderModel` | `string \| null`                                   | `null`             | Teikėjas / modelis `provider/model` formatu                           |
| `customBaseUrl`          | `string \| null`                                   | `null`             | Tik atminčiai skirtas su OpenAI suderinamo galinio taško bazinis URL  |
| `customModelId`          | `string \| null`                                   | `null`             | Pasirinktiniam galiniam taškui siunčiamas modelio ID                  |
| `transformersEnabled`    | `boolean`                                          | `false`            | Pasirinktinis Transformers.js naudojimas (MiniLM, ~400MB)             |
| `staticEnabled`          | `boolean`                                          | `false`            | Pasirinktinis vietinio statinio potion-base-8M modelio naudojimas     |
| `rerankEnabled`          | `boolean`                                          | `false`            | Įjungti pakartotinio reitingavimo veiksmą (prideda +200-500ms/req)    |
| `rerankProviderModel`    | `string \| null`                                   | `null`             | Pakartotinio reitingavimo teikėjas / modelis `provider/model` formatu |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`           | Kurią vektorių posistemę naudoti                                      |

Jie pasiekiami per `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Naudojant `remote` šaltinį, Memory taip pat priima pasirinktinius `customBaseUrl` ir
`customModelId` nustatymus. Kartu jie parenka su OpenAI suderinamą `/embeddings`
galinį tašką ir modelį nekeičiant visuotinio įterpinių registro. Prieš naudojimą
galinis taškas normalizuojamas ir patikrinamas pagal teikėjo išeinančių URL politiką:
būtinas HTTP(S), įterptieji prisijungimo duomenys ir užklausų eilutės atmetami, o
debesijos metaduomenų adresai lieka blokuojami. Tuščios reikšmės išsaugo pasirinktą
registro teikėją. Valdymo skydui grąžinamos klaidos yra išvalomos, o galinio taško
prisijungimo duomenys niekada neregistruojami žurnaluose.

> **TODO (D20):** `global` aprėptis (atminčių bendrinimas tarp visų API raktų)
> šiame leidime neįgyvendinta. Tam reikalingi schemos pakeitimai ir visuotinis
> paieškos kelias. Sekti atskirai.

## Saugojimo sluoksniai

### Pirminis: SQLite (`memories` lentelė)

Sukuriama migracija `015_create_memories.sql`:

| Stulpelis                   | Tipas              | Pastabos                                                                      |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID, sugeneruotas naudojant `crypto.randomUUID()`                            |
| `api_key_id`                | `TEXT NOT NULL`    | Valdantis API raktas                                                          |
| `session_id`                | `TEXT`             | Pasirinktinė vieno pokalbio aprėptis                                          |
| `type`                      | `TEXT NOT NULL`    | Viena iš `factual`, `episodic`, `procedural`, `semantic`                      |
| `key`                       | `TEXT`             | Stabilus įterpimo arba atnaujinimo raktas, pvz., `preference:i_prefer_python` |
| `content`                   | `TEXT NOT NULL`    | Faktinis fakto tekstas                                                        |
| `metadata`                  | `TEXT`             | JSON duomenų blokas (kategorija, išgavimo laikas, šaltinis, ...)              |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 eilutės                                                              |
| `expires_at`                | `TEXT`             | Pasirinktinis galiojimo laikas; `NULL` reiškia, kad įrašas nuolatinis         |
| `memory_id`                 | `INTEGER UNIQUE`   | Pridėtas `023_fix_memory_fts_uuid.sql`, kad susietų UUID ↔ FTS5 eilučių ID    |

Indeksai: `api_key_id`, `session_id`, `type`, `expires_at` ir unikalus
`memory_id` indeksas.

**Įterpimo arba atnaujinimo semantika**: `createMemory()` ieško esamos eilutės su ta pačia
`(api_key_id, key)` pora ir, ją radusi, atnaujina vietoje (sujungdama `metadata`
negiliuoju išskleidimu). Tai neleidžia lentelei neribotai augti dėl pasikartojančių
nuostatų teiginių.

### Viso teksto paieška (`memory_fts` virtualioji lentelė)

`022_add_memory_fts5.sql` sukuria FTS5 virtualiąją lentelę laukams `content` ir
`key`. `023_fix_memory_fts_uuid.sql` ištaiso realiomis sąlygomis pasireiškusią klaidą,
kai UUID pirminio rakto nepavykdavo susieti su FTS5 sveikojo skaičiaus eilutės ID —
migracija prideda `memory_id` stulpelį, iš naujo sukuria FTS lentelę ir sujungia
paleidiklius (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), kurie sinchronizuoja
FTS atliekant INSERT, DELETE ir UPDATE.

Naudojama `retrieval.ts` strategijoms `semantic` ir `hybrid` (žr. toliau).
Paieškos kodas atlieka patikrą naudodamas `hasTable("memory_fts")` ir grįžta prie
chronologinės tvarkos, jei FTS lentelės nėra arba FTS užklausa sukelia klaidą.

### Pasirinktinis: Qdrant (2 lygio vektorių saugykla)

`src/lib/memory/qdrant.ts` įgyvendina pasirinktinę Qdrant integraciją kaip 2 lygio
vektorių saugyklą. Paieška nukreipiama į Qdrant tik tada, kai modulio parinkiklis
`memoryVectorStore === "qdrant"` — numatytoji `"auto"` reikšmė (taip pat ir
`"sqlite-vec"`) Qdrant **niekada** nepasirenka. Engine skirtuko jungiklis vienu metu
nustato **ir** `qdrantEnabled`, **ir** `memoryVectorStore`: įjungus Qdrant tampa
pagrindine saugykla, o išjungus reikšmė grąžinama į `"auto"` (#5597 — iki šio
pataisymo įjungimas neturėjo poveikio, nes niekas neįrašydavo modulio parinkiklio).
Jei Qdrant nepasiekiamas arba nieko negrąžina, paieška grįžta prie
sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — įterpia `key + content` naudodama sukonfigūruotą
  įterpinių modelį, užtikrina, kad kolekcija egzistuotų (pirmą kartą naudojant
  sukuria kosinuso atstumo vektorius), ir įterpia arba atnaujina tašką su duomenimis `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — įterpia užklausą, ieško
  kolekcijoje, filtruodama pagal `kind = "omniroute_memory"` ir pasirinktinai pagal
  `apiKeyId` / `sessionId`. Apriboja `topK` iki intervalo `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — ištrina vieną tašką. Iškviečiama
  `deleteMemory()`, kai pašalinama SQLite eilutė (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — masiškai ištrina taškus, kurių
  `expiresAtUnix` yra praeityje arba kurių `createdAtUnix` yra senesnis už
  saugojimo laikotarpio ribą. Pirmiausia suskaičiuoja, kad valdymo skydelyje būtų galima rodyti faktinius skaičius.
- `checkQdrantHealth()` — `GET /readyz` būklės patikra su delsos matavimu.

Nustatymų vartotojo sąsajoje Qdrant konfigūracija, būklės patikra, semantinės paieškos testas
ir valymas pasiekiami `/dashboard/memory` skiltyje **Variklis**. Atitinkami
maršrutai kataloge `src/app/api/settings/qdrant/` yra visi prijungti nuo v3.8.6:

| Maršrutas                               | Metodas       | Aprašymas                                 |
| --------------------------------------- | ------------- | ----------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Skaityti / atnaujinti Qdrant nustatymus   |
| `/api/settings/qdrant/health`           | `GET`         | Veikimo patikra + delsa                   |
| `/api/settings/qdrant/search`           | `POST`        | Semantinės paieškos testas                |
| `/api/settings/qdrant/cleanup`          | `POST`        | Pašalinti nebegaliojančius / senus taškus |
| `/api/settings/qdrant/embedding-models` | `GET`         | Pateikti galimų įterpinių modelių sąrašą  |

**Elgsenos pastabos (ko tikėtis):**

- **Variklio pasirinkimas** — įjungus Qdrant skiltyje „Variklis“, jis tampa pagrindine
  saugykla (nustatoma `memoryVectorStore="qdrant"`); išjungus reikšmė grąžinama į `"auto"` (#5597).
- **Nėra retrospektyvaus užpildymo** — į Qdrant įrašomi tik tie atminties įrašai, kurie sukurti arba atnaujinti
  **po** Qdrant įjungimo (asinchroninis dvigubas įrašymas nelaukiant rezultato). Anksčiau egzistavę SQLite atminties įrašai **nėra**
  perkeliami; „Perindeksuoti dabar“ iš naujo sukuria tik sqlite-vec indeksą, bet ne Qdrant.
- **Vektoriaus matmenų skaičius automatiškai aptinkamas** pagal faktinį įterpinį pirmą kartą naudojant — nėra
  matmenų lauko, kurį reikėtų užpildyti. Įterpinių modelio pakeitimas po kolekcijos
  sukūrimo **nėra** automatiškai apdorojamas: esama kolekcija lieka nepakeista, o dėl matmenų
  neatitinkančių įrašymų / paieškų įvyksta klaida ir grįžtama prie sqlite-vec. Norėdami pakeisti įterpinių modelį, sukurkite kolekciją iš naujo
  (suteikite naują pavadinimą arba ištrinkite ją Qdrant).
- **Atstumo metrika** — visada **kosinuso** (fiksuotai užkoduota kuriant kolekciją;
  nekonfigūruojama).
- **Autentifikavimas** — tik API raktas (siunčiamas `api-key` antraštėje; neautentifikuotam
  vietiniam Docker neprivalomas). JWT/RBAC nenaudojami.
- **Konfigūracijos laukai** — vartotojo sąsajoje pateikiami `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` pasiekiami tik per aplinką / DB, o `vectorSize`
  nenaudojamas kuriant kolekciją (matmenų skaičius gaunamas iš įterpinio).

### Vektorių kvantavimas (int8 — pasirinktinis, abiem posistemėms)

Abi vektorių posistemės palaiko **pasirinktinį int8 kvantavimą**, kad būtų sumažintas saugomų
vektorių atminties dydis (~4 kartus mažesnis nei Float32), šiek tiek sumažinant rezultatų išsamumą.
Numatyta, kad abiejose posistemėse ši funkcija yra **išjungta** — vektoriai išlieka viso tikslumo, nebent ji būtų aiškiai
įjungta.

| Posistemė  | Nustatymas                          | Tipas                          | Numatytoji reikšmė | Kur nuskaitoma                                              |
| ---------- | ----------------------------------- | ------------------------------ | ------------------ | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB raktas)    | `"none" \| "int8" \| "binary"` | `"none"`           | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (aplinka) | `"none" \| "int8"`             | `"none"`           | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** kiekvienam egzemplioriui konfigūruojamas naudojant `qdrantQuantization` nustatymo
  raktą (pateikiamą kaip `quantization` lauką užklausoje `PUT /api/settings/qdrant`). Kai nustatyta
  `"int8"`, `buildQuantizationConfig()` užklausia skaliarinio kvantavimo
  (`always_ram`, kvantilis `0.99`), o paieškose įjungiama `rescore: true`, kad
  viso tikslumo vektoriai patikslintų int8 kandidatų rinkinį.
- **sqlite-vec** kvantavimas konfigūruojamas **tik per aplinką** (tai nėra DB nustatymas): nustatykite
  `MEMORY_VEC_QUANTIZATION=int8`, kad vietiniai vektoriai būtų saugomi kaip `int8[dim]`
  stulpelis naudojant `vec_quantize_int8(?, 'unit')`. Pasirinktas režimas įtraukiamas į
  `embedding_signature` (`:int8` priesaga), todėl pakeitus režimą suaktyvinamas visiškas
  `vec_memories` lentelės perindeksavimas — naudojamas tas pats atidėto retrospektyvaus užpildymo kelias, kaip ir
  pakeitus įterpinių modelį.

## Atminties tipai

`MemoryType` (`src/lib/memory/types.ts`):

| Tipas        | Kam naudojamas                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `factual`    | Nuostatos, stabilūs naudotojo faktai, elgsenos modeliai                                         |
| `episodic`   | Su konkrečiu momentu susieti sprendimai („Pasirinkau Postgres“)                                 |
| `procedural` | Darbo eigos / instrukcijų atmintis (rezervuota; šiuo metu nėra automatinio išskyrimo priemonės) |
| `semantic`   | Rezervuota vektorinės saugyklos įrašams                                                         |

`MemoryConfig` gavimo strategija yra viena iš `exact`, `semantic` arba `hybrid`,
o aprėptis yra viena iš `session`, `apiKey` arba `global`. Numatytoji
`getMemorySettings()` aprėptis yra `apiKey`.

## Faktų išskyrimas (`extraction.ts`)

Išskyrimas yra **pagrįstas reguliariosiomis išraiškomis**, o ne LLM — jis vykdomas tame pačiame procese naudojant
`setImmediate()`, todėl niekada neblokuoja atsakymo srauto:

- **Nuostatų šablonai** → `MemoryType.FACTUAL`
  (pvz., `Man labiau patinka …`, `Man labai patinka …`, `mano mėgstamiausias yra …`, `Aš nekenčiu …`)
- **Sprendimų šablonai** → `MemoryType.EPISODIC`
  (pvz., `Naudosiu …`, `Pasirinkau …`, `Nusprendžiau naudoti …`, `Ketinu pradėti naudoti …`)
- **Elgsenos šablonai** → `MemoryType.FACTUAL`
  (pvz., `Paprastai aš …`, `Aš visada …`, `Esu linkęs …`)

Kiekviena atitiktis išvaloma (`trim`, tarpų sutraukimas, apribojimas iki 500 simbolių),
dublikatai pakete pašalinami naudojant stabilų `factKey(category, content)`, o
duomenys išsaugomi per `createMemory()` su metaduomenimis
`{category, extractedAt, source: "llm_response"}`. Įvesties tekstas ribojamas iki
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — kai jis ilgesnis, naudojama teksto **pabaiga**,
kad naujausias asistento turinys visada būtų įtrauktas.

`extractFactsFromText(text)` eksportuojama testams ir grąžina struktūrizuotus
faktus jų neišsaugodama.

## Gavimas (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` yra pagrindinis įvesties taškas. Jis:

1. Normalizuoja ir patikrina konfigūraciją naudodamas `MemoryConfigSchema`.
2. Nedelsdamas grąžina `[]`, kai `enabled` yra false arba `maxTokens <= 0`.
3. Apriboja `maxTokens` iki intervalo `[1, 8000]`.
4. Nustato, ar egzistuoja šiuolaikinė `memories` lentelė (ar senoji `memory`
   lentelė), kad senesnės duomenų bazės ir toliau veiktų.
5. Sukuria bazinę užklausą su galiojimo pabaigos sąlyga
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), pasirinktine
   seanso aprėptimi ir pasirinktiniu `retentionDays` slenksčiu.
6. Išsišakoja pagal strategiją:
   - **`exact`** (numatytoji): chronologinė `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jei yra `config.query` ir egzistuoja `memory_fts`, atliekamas JOIN su
     `memory_fts MATCH ?` ir rikiuojama pagal FTS rangą; kai FTS grąžina 0 eilučių,
     grįžtama prie chronologinės tvarkos.
   - **`hybrid`**: FTS rezultatų (didesnio aktualumo) ir chronologinio
     rinkinio sąjunga, pašalinant dublikatus pagal id.
7. Kai pateikta užklausa, apskaičiuoja raktažodžių aktualumo balą (`getRelevanceScore`) pagal
   `content`, `key` ir `metadata` JSON. Nulinį balą turinčios eilutės
   atmetamos.
8. Rikiuoja mažėjančia balo tvarka, tada mažėjančia `createdAt` tvarka.
9. Pereina per surikiuotą sąrašą ir priima įrašus tol, kol kaupiamasis
   `estimateTokens(content)` (≈ `length / 4`) neviršija limito. Kai yra bent
   viena atitiktis, visada grąžina bent vieną įrašą.

`estimateTokens` eksportuojama ir naudojama gavimui, apibendrinimui bei MCP
`omniroute_memory_search` įrankiui.

## Įterpimas (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Sujungia visą atminties turinį į vieną `Memory context: …` eilutę.
2. Pasirenka strategiją pagal teikėjo pavadinimą:
   - **Sistemos pranešimas** (numatytoji strategija OpenAI, Anthropic, Gemini ir kt.) — įterpia
     `{role: "system", content: memoryText}` prieš visus esamus sistemos
     pranešimus, kad naudotojo sistemos raginimai vis tiek turėtų pirmenybę.
   - **Naudotojo pranešimas** (atsarginė strategija) — teikėjams, esantiems
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Jie atmeta sistemos vaidmenį,
     todėl kitu atveju būtų grąžinta 400 klaida (žr. GLM/Zhipu problemą #1701).
3. Į `memory.injection.injected` žurnalą įrašo skaičių, strategiją ir modelį.

`providerSupportsSystemMessage(provider)` eksportuojama iškvietėjams, kuriems reikia
patiems priimti maršruto parinkimo sprendimus. Nežinomiems teikėjams saugumo sumetimais
numatytoji reikšmė yra `true` (sistemos vaidmuo leidžiamas).

## Nustatymai (`settings.ts`)

Atminties konfigūracija **saugoma DB nustatymų lentelėje**, o ne aplinkos kintamuosiuose.
`getMemorySettings()` nuskaito duomenis iš `getSettings()` ir išsaugo rezultatą
proceso podėlyje; po įrašymo nustatymų PUT maršrutas iškviečia
`invalidateMemorySettingsCache()`.

### Senesni laukai (visos versijos)

| DB raktas             | Tipas              | Numatytoji reikšmė                                   | UI valdiklis                                               |
| --------------------- | ------------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| `memoryEnabled`       | loginis            | `false` (pagal numatymą išjungta nuo v3.8.30)        | Atminties įjungimas / išjungimas                           |
| `memoryMaxTokens`     | sveikasis skaičius | `2000` (diapazonas `0–16000`)                        | Įterpimo leksemų biudžetas                                 |
| `memoryRetentionDays` | sveikasis skaičius | `30` (diapazonas `1–365`)                            | Saugojimo laikotarpis                                      |
| `memoryStrategy`      | išvardijimas       | `"hybrid"` (viena iš `recent`, `semantic`, `hybrid`) | Paieškos strategija                                        |
| `skillsEnabled`       | loginis            | `false`                                              | Perjungia kiekvieno rakto įgūdžių įterpimą (žr. SKILLS.md) |

Pastaba: UI strategija `"recent"` per `toMemoryRetrievalConfig()` susiejama su
vidine `"exact"` paieškos strategija (chronologine tvarka).

### Nauji laukai (v3.8.6, planas 21 D9)

Laukų aprašymus taip pat žr. pirmiau pateiktame skyriuje „Nustatymų plėtinys“.

| DB raktas                   | API laukas               | Numatytoji reikšmė |
| --------------------------- | ------------------------ | ------------------ |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`           |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`             |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`            |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`            |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`            |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`             |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`           |

Su Qdrant susijusius DB raktus (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection`, kurio numatytoji reikšmė yra `"omniroute_memory"`,
ir `qdrantEmbeddingModel`, kurio numatytoji reikšmė yra `"openai/text-embedding-3-small"`)
nuskaito `normalizeQdrantConfig()`, esanti `qdrant.ts`.

### Aplinkos kintamieji (v3.8.6)

Šeši pasirenkami aplinkos kintamieji reguliuoja variklio veikimą vykdymo metu (dokumentuoti `.env.example`):

| Kintamasis                      | Numatytoji reikšmė         | Aprašymas                                                                                                                                                                            |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Įterpinių podėlio TTL (5 min.)                                                                                                                                                       |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Didžiausias įrašų skaičius įterpinių LRU podėlyje                                                                                                                                    |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js modelio HF saugykla                                                                                                                                                  |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Statinio potion modelio HF saugykla                                                                                                                                                  |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Kur saugoti atsisiųstus modelius                                                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | Numatytoji top-K reikšmė vektorinei paieškai                                                                                                                                         |
| `MEMORY_RRF_K`                  | `60`                       | RRF k konstanta hibridinei paieškai                                                                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Nustatykite `int8`, kad vietiniai sqlite-vec vektoriai būtų saugomi kvantuoti (maždaug 4× mažesni; pasirenkama). Pakeitus režimą, atliekamas priverstinis pakartotinis indeksavimas. |

## Santraukų kūrimas (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` sutraukia senesnį
turinį, kai bendras rakto atminčių žetonų skaičius viršija
limitą. Funkcija iteruoja eilutes mažėjančia tvarka pagal `created_at`, išsaugo telpančias eilutes, o
likusių eilučių `content` pakeičia pirmaisiais trimis pradinio
turinio sakiniais. `tokensSaved` yra seno ir
naujo turinio `estimateTokens` skirtumas.

Ši procedūra šiuo metu yra **pasiekiama, bet nėra automatiškai iškviečiama**
pokalbių apdorojimo grandinėje — iškvieskite ją iš cron užduoties, administratoriaus veiksmo arba
`MemoryConfig.autoSummarize` integracinio kodo, jei reikalingas nuolatinis sutraukimas. Duomenų
praradimas yra negrįžtamas: pradinis tekstas perrašomas.

## REST API

Visiems galiniams taškams reikalingas valdymo autentifikavimas (`requireManagementAuth`).

### Pagrindiniai atminties galiniai taškai (esami + atnaujinti)

| Metodas  | Kelias               | Aprašymas                                                                                                                                                                                                                      |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | Puslapiais suskirstytas sąrašas su filtrais: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Atsakyme pateikiami `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                             |
| `POST`   | `/api/memory`        | Sukuria įrašą (patikrintą naudojant Zod: `content`, `key`, pasirinktinai `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Iškviečia `createMemory()`, kuri atlieka įterpimą arba atnaujinimą pagal `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Gauna vieną įrašą pagal UUID                                                                                                                                                                                                   |
| `PUT`    | `/api/memory/[id]`   | Atnaujina įrašo laukus (`type`, `key`, `content`, `metadata`). Turinys: `MemoryUpdatePutSchema`. Taip pat sinchronizuoja vektorių, jei pasiekiamas įterpinio šaltinis.                                                         |
| `DELETE` | `/api/memory/[id]`   | Ištrina įrašą; taip pat ištrina iš `vec_memories` (D15) ir, jei įmanoma, iš Qdrant. Jei įrašo nėra, grąžina 404.                                                                                                               |
| `GET`    | `/api/memory/health` | Vykdo `verifyExtractionPipeline("health-check")` — visą ciklą sukurti→pateikti sąrašą→ištrinti. Grąžina `{working, latencyMs, error?}`                                                                                         |

### Nauji atminties variklio galiniai taškai (21 planas)

| Metodas | Kelias                            | Aprašymas                                                                                                                                                                                           |
| ------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`  | `/api/memory/retrieve-preview`    | Bandomasis `retrieveMemories` vykdymas — grąžina surikiuotus rezultatus su įverčiu, lygiu ir žetonais. Turinys: `RetrievePreviewSchema`. NEĮTERPIA ir nekeičia atminčių.                            |
| `GET`   | `/api/memory/embedding-providers` | Pateikia teikėjų ir jų įterpinių modelių sąrašą, nurodydamas, kuriems iš jų sukonfigūruotas API raktas.                                                                                             |
| `GET`   | `/api/memory/engine-status`       | Grąžina visą variklio būseną: raktažodžių lygį, įterpinių parinkimą, vektorių saugyklos statistiką, Qdrant būklę ir pakartotinio reitingavimo konfigūraciją. Struktūra: `MemoryEngineStatusSchema`. |
| `POST`  | `/api/memory/summarize`           | Rankiniu būdu paleidžia atminčių sutraukimą. Turinys: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Grąžina `{candidates, tokensSaved}`.                                        |
| `POST`  | `/api/memory/reindex`             | Paleidžia atminčių, kurių `needs_reindex=1`, vektorių pakartotinį indeksavimą. Turinys: `MemoryReindexSchema` (`force`). Grąžina `{started, pending}`.                                              |

### Nustatymų galiniai taškai

| Metodas | Kelias                                  | Aprašymas                                                                                                    |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`   | `/api/settings/memory`                  | Dabartinis normalizuotas `MemorySettingsExtended` (7 nauji laukai + ankstesni laukai)                        |
| `PUT`   | `/api/settings/memory`                  | Atnaujina bet kurį `MemorySettingsExtendedSchema` lauką (iš viso 12 laukų)                                   |
| `GET`   | `/api/settings/qdrant`                  | Dabartiniai Qdrant nustatymai (`QdrantSettingsSchema`)                                                       |
| `PUT`   | `/api/settings/qdrant`                  | Atnaujina Qdrant nustatymus. Turinys: `QdrantSettingsUpdateSchema`. `apiKey` = tuščia eilutė pašalina raktą. |
| `GET`   | `/api/settings/qdrant/health`           | Sukonfigūruoto Qdrant egzemplioriaus pasiekiamumo patikra. Grąžina `QdrantHealthResultSchema`.               |
| `POST`  | `/api/settings/qdrant/search`           | Semantinės paieškos bandymas Qdrant sistemoje. Turinys: `QdrantSearchSchema` (`query`, `topK`).              |
| `POST`  | `/api/settings/qdrant/cleanup`          | Pašalina Qdrant taškus, priklausančius nebegaliojančioms / senoms atmintims.                                 |
| `GET`   | `/api/settings/qdrant/embedding-models` | Pateikia Qdrant pasiekiamų įterpinių modelių sąrašą.                                                         |

`/api/memory` sąrašo užklausa palaiko puslapiavimą pagal `page`
(`parsePaginationParams`) **arba** tiesioginį `offset` — kai pateiktas `offset`, jam
teikiama pirmenybė, o atsakymo struktūrai apskaičiuojamas išvestinis `page`.

## MCP įrankiai (`open-sse/mcp-server/tools/memoryTools.ts`)

Kai MCP serveris įjungtas, užregistruojami trys atminties įrankiai:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → apgaubia `retrieveMemories()`. Nuo v3.8.6 (D16) `strategy` nuskaitoma
  iš `getMemorySettings()`, užuot buvusi fiksuota kaip `"exact"`. Jei
  pateikta `query`, o `strategy` yra `semantic` arba `hybrid`, naudojama
  vektorių saugykla, kai ji pasiekiama.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → apgaubia `createMemory()`. Priima tik 4 kanoninius tipus:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → pateikia atitinkančių
  įrašų sąrašą, pasirinktinai filtruoja pagal sukūrimo iki nurodytos laiko žymos datą, tada kiekvieną
  ištrina per `deleteMemory()` (kartu pašalinami ir vektoriai iš sqlite-vec bei Qdrant).

Išsamią informaciją apie perdavimą ir aprėptį žr. [MCP-SERVER.md](./MCP-SERVER.md).

## Valdymo skydelis („Memory Studio“)

`src/app/(dashboard)/dashboard/memory/page.tsx` dabar yra **3 kortelių studija**:

### Kortelė: Atmintys

- Koncepcijos kortelė (suskleidžiamas paaiškinimas „Kaip tai veikia“).
- Realiuoju laiku atnaujinamas sąrašas, paieška ir puslapių numeravimas (300 ms delsos slopinimas).
- Tipo filtras (`factual` / `episodic` / `procedural` / `semantic` / visi).
- Atminties pridėjimo modalinis langas (raktas, turinys, tipas).
- Tiesioginis redagavimas (pieštuko mygtukas → `PUT /api/memory/[id]`).
- Kiekvienos eilutės ištrynimas (su patvirtinimo dialogo langu).
- Dabartinio puslapio eksportavimas JSON formatu; JSON importavimas per failo parinkiklį.
- Statistikos kortelės: `totalEntries`, `tokensUsed`, `hitRate`.
- Mygtukas „Suglaudinti senus“ → `POST /api/memory/summarize` (pirmiausia bandomasis paleidimas
  parodo kandidatų skaičių, tada prašoma patvirtinti).
- Žalias / raudonas būsenos taškas, valdomas per `GET /api/memory/health`.

### Kortelė: Bandymų aplinka

- Užklausos įvestis + strategijos parinkiklis (tiksli / semantinė / hibridinė) + leksemų biudžetas.
- „Imituoti“ → `POST /api/memory/retrieve-preview` — rodomi surikiuoti rezultatai su
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Sprendimo informacijos skydelis, rodantis, kuris įterpinių šaltinis / vektorių saugykla buvo naudojami ir
  ar buvo pritaikytas atsarginis variantas.

### Kortelė: Variklis

- Variklio būsenos skydelis (raktažodžių FTS5 žyma, įterpinių žyma, vektorių saugyklos žyma,
  Qdrant būklės žyma, pakartotinio rikiavimo žyma).
- Mygtukas „Perindeksuoti dabar“ → `POST /api/memory/reindex`.
- Įterpinių šaltinio parinkiklis (automatinis / nuotolinis / statinis / transformers + perjungikliai).
- Qdrant konfigūracijos kortelė (įjungimo perjungiklis, priegloba / prievadas / kolekcija / raktas, ryšio tikrinimas,
  semantinės paieškos testas, valymas).
- Pakartotinio rikiavimo konfigūracijos kortelė (įjungimo perjungiklis, teikėjo / modelio parinkiklis).

Atminties ir Qdrant nustatymai taip pat pasiekiami skiltyje
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`), skirtoje
senajai / visuotinei nustatymų sąsajai.

## Podėlis

`src/lib/memory/store.ts` palaiko procese veikiančią, į LRU panašią podėlio atmintį
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, išstumiant 20 %
seniausių įrašų), skirtą `getMemory(id)` skaitymo operacijoms, taip pat bendrinį rakto / reikšmės
`memoryCache` sluoksnį (`src/lib/memory/cache.ts`) su `get` / `set` / `invalidate`
metodais, kurį naudoja kvietėjai, norintys turėti savo aprėpties podėlį (1 000 įrašų LRU,
numatytasis TTL – 5 min).

## Privatumas ir gyvavimo ciklas

- Atminties savininkas yra API rakto ID (`resolveMemoryOwnerId` faile
  `chatCore.ts`). Be `apiKeyInfo.id` nevykdomas nei gavimas, nei įterpimas,
  nei išgavimas.
- Įrašai, kurių `expires_at` data yra ateityje, iš gavimo rezultatų pašalinami; seni
  įrašai, viršijantys `retentionDays`, neįtraukiami dėl
  `created_at >= cutoff` sąlygos funkcijoje `retrieveMemories`.
- Norėdami negrįžtamai ištrinti, naudokite `DELETE /api/memory/[id]` arba `omniroute_memory_clear`.
- Išgavimas vykdomas asinchroniškai, nelaukiant rezultato, per `setImmediate`; triktys registruojamos kaip
  `memory.extraction.background.failed` ir niekada neperduodamos iškvietėjui.
- Patikros ciklai (`verifyExtractionPipeline`) pašalina savo
  bandomuosius įrašus `finally` bloke.

## Taip pat žr.

- [SKILLS.md](./SKILLS.md) — nustatymas `skillsEnabled` kartu su atmintimi įterpia įrankių
  apibrėžtis.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transportas / aprėptys.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — platesnė API sąsaja.
- Pirminio kodo moduliai:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibridinis RRF
  - `src/lib/memory/embedding/index.ts` — kelių šaltinių vektorizavimo sluoksnis
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — visų atminties API užklausų turinių Zod schemos
  - `src/shared/schemas/qdrant.ts` — Qdrant nustatymų ir operacijų Zod schemos
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` CRUD operacijos
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
  - `src/app/api/settings/qdrant/route.ts` + antriniai maršrutai
  - `src/app/(dashboard)/dashboard/memory/` — Studio naudotojo sąsaja (puslapis + komponentai +
    skirtukai + kabliukai)
  - `open-sse/handlers/chatCore.ts` (įterpimo / išgavimo susiejimas)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Vektorizavimo teikėjo pasirinkimas (v3.8.16+)

OmniRoute atminties variklis palaiko **keturis vektorizavimo šaltinius** (`src/lib/memory/embedding/`). Kiekvienas iš jų pasižymi skirtingais **delsos, kainos, modelio kokybės ir konfigūravimo sudėtingumo** kompromisais.

### Vektorizavimo šaltiniai

| Teikėjas       | Šaltinis                                                 | Delsa                                        | Kaina                | Kokybė                                       | Konfigūravimas                            |
| -------------- | -------------------------------------------------------- | -------------------------------------------- | -------------------- | -------------------------------------------- | ----------------------------------------- |
| `transformers` | Vietinis ONNX modelis (Xenova/all-MiniLM-L6-v2)          | ~50-150ms (CPU)                              | Nemokama             | Gera                                         | Tik `npm install`                         |
| `static`       | Iš anksto apskaičiuoti vektoriai (podėlyje)              | <1ms                                         | Nemokama             | Netaikoma (priklauso nuo pataikymo į podėlį) | Nereikia                                  |
| `remote`       | OpenAI / Cohere / Voyage API                             | ~100-300ms                                   | $0.02-0.10/1M žetonų | Puiki                                        | API raktas                                |
| `auto`         | Vykdymo metu parenka geriausią prieinamą šaltinį         | Tokia pati kaip pasirinkto šaltinio          | Nemokama             | Tokia pati kaip pasirinkto šaltinio          | Nereikia                                  |
| _(podėlis)_    | Atmintyje laikomas LRU sluoksnis virš bet kurio šaltinio | <1ms (pataikymas), visa delsa (nepataikymas) | Nemokama             | Tokia pati kaip bazinio šaltinio             | Visada įjungtas (nepasirenkamas šaltinis) |

### Sprendimų medis

```
                  Koks yra jūsų diegimo kontekstas?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 KŪRIMAS/TESTAI MAŽA GAMYBINĖ DIDELĖ GAMYBINĖ  PAKRAŠTYS / BE RYŠIO
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (nemokama, be API)         (geriausia kokybė) (be interneto)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            VISADA viršuje pridėkite `cache` sluoksnį
            (`LruCache` apgaubia bet kurį teikėją)
```

### Duomenų bazės ir API konfigūracija

Atminties vektorizavimo parinktys konfigūruojamos naudojant nustatymų API / naudotojo sąsają, o ne aplinkos kintamuosius. Susiję nustatymų duomenų bazės raktai dalyje „Nustatymai“ (`normalizeMemorySettings` faile `src/lib/memory/settings.ts`) yra:

- `memoryEmbeddingSource`: `"transformers"` (vietinis), `"remote"` (API pagrįstas, pvz., OpenAI), `"static"` (išorinė saugykla) arba `"auto"`
- `memoryEmbeddingProviderModel`: nuotolinių / statinių šaltinių modelio identifikatorius (pvz., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` arba `"auto"`

#### Vietinis modelis (`transformers`)

Vietiniams modeliams vykdyti viduje naudojama transformers.js:

```bash
# Kode nuskaitomi aplinkos kintamieji (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF modelio saugykla
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statinis potion modelis
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Podėlio katalogas
```

#### LRU vektorizavimo podėlis

Pagal numatytuosius nustatymus podėlis visada įjungtas ir konfigūruojamas naudojant aplinkos kintamuosius:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Didžiausias podėlyje laikomų elementų skaičius
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min.)
```

### Našumo rodikliai

Našumo testas tipiniame 4 branduolių x86 serveryje (tekstai po ~100 žetonų):

| Teikėjas             | p50   | p95   | p99   | Kaina / 1 mln. įterpinių           |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Nemokamai                          |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Priklauso nuo Qdrant prieglobos    |
| `cache` (pataikymas) | <1ms  | <1ms  | 2ms   | Nemokamai                          |

---

## Faktų išgavimo šablonai (v3.8.16+)

Modulis `extraction.ts` (`src/lib/memory/extraction.ts`) naudoja **atitikmenų paiešką pagal reguliariųjų išraiškų šablonus**, kad iš pokalbio pranešimų išgautų struktūrizuotus faktus. Šių šablonų supratimas padeda optimizuoti išgavimo kokybę pagal jūsų naudojimo atvejį.

### Numatytosios šablonų kategorijos

| Kategorija          | Šablono pavyzdys                                            | Išgaunama informacija              |
| ------------------- | ----------------------------------------------------------- | ---------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Naudotojo pageidavimai             |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Naudotojo sprendimai (epizodiniai) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Nuolatiniai elgsenos šablonai      |

### Šablonų pavyzdžiai (supaprastinti)

```ts
// Iš src/lib/memory/extraction.ts
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

### Kas išgaunama

Kai naudotojas sako:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Išgavimo metu sukuriami 4 atminties įrašai:
>
> | Raktas                               | Kategorija | Tipas    | Turinys                     |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Išgavimo apribojimai

Siekiant išvengti nekontroliuojamo išgavimo, taikomi šie apribojimai:

| Minimalus turinio ilgis | 3 simboliai |
| Maksimalus turinio ilgis | 500 simbolių |

### Kada išjungti išgavimą

Išgavimas vykdomas automatiškai, kai įjungta atmintis; atskiro
tik išgavimui skirto jungiklio nėra. Norėdami jį išjungti, visiškai išjunkite atmintį (`enabled: false`
per `PUT /api/settings/memory`). Apsvarstykite galimybę tai padaryti, kai:

- Pranešimų kiekis didelis, o išgavimo sąnaudos nėra nereikšmingos
- Jūsų pokalbiai daugiausia laikini (pokalbiai, derinimas) ir neturi ilgalaikės vertės
- Kontekstą jau fiksuojate naudodami pasirinktinius papildinius

---

## Hibridinio RRF derinimas (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** algoritmas sujungia FTS5 (raktažodžių) ir vektorinius (semantinius) rezultatus. Parametras `k` nustato, kokia reikšmė suteikiama žemesnes pozicijas užimantiems rezultatams.

### Formulė

Kiekvieno galimo atminties įrašo RRF įvertis yra:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Kur:

- `k` yra konstanta (numatytoji reikšmė – 60)
- `rank_i(d)` yra dokumento `d` pozicija i-ojoje paieškos sistemoje (FTS, vektorinėje)
- Sumuojama pagal visas paieškos sistemas

### Kaip `k` veikia rezultatus

| `k` reikšmė             | Poveikis                                                                                  | Geriausiai tinka                               |
| ----------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `k=0`                   | Grynas pozicijų sujungimas (be glodinimo)                                                 | Teoriniam atskaitos taškui                     |
| `k=10-30`               | Didelis svoris suteikiamas aukščiausiems rezultatams, žema pozicija beveik neprisideda    | Kai pirmi 3 rezultatai paprastai būna teisingi |
| **`k=60`** (numatytoji) | Subalansuota — visi pirmi 10 rezultatų reikšmingai prisideda                              | Bendrosios paskirties paieškai                 |
| `k=100+`                | Tolygiau — net žemos pozicijos rezultatai gali dominuoti, jei aptinkami keliose sistemose | Kai aprėptis > tikslumas yra itin svarbu       |

### Praktinis `k` derinimas

```bash
# Numatytoji reikšmė
MEMORY_RRF_K=60

# Agresyvus tikslumas (maža atmintis, nedaug dokumentų)
MEMORY_RRF_K=20

# Didžiausia aprėptis (didelė atmintis, įvairios užklausos)
MEMORY_RRF_K=120
```

**Pavyzdys su `k=20`:**

- FTS pozicija 1 → indėlis `1/21 = 0.048`
- FTS pozicija 10 → indėlis `1/30 = 0.033`
- Vektorinė pozicija 1 → indėlis `0.048`
- Bendra maksimali reikšmė: `0.096`

**Pavyzdys su `k=60`:**

- FTS pozicija 1 → indėlis `1/61 = 0.016`
- FTS pozicija 10 → indėlis `1/70 = 0.014`
- Vektorinė pozicija 1 → indėlis `0.016`
- Bendra maksimali reikšmė: `0.033`

Esant didesnei `k` reikšmei, **santykinis skirtumas** tarp 1-osios ir 10-osios pozicijų yra mažesnis, todėl algoritmas labiau remiasi **paieškos sistemų sutarimu**, o ne aukščiausios pozicijos patikimumu.

### Kada keisti `k`

| Požymis                                                   | Ką išbandyti                                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Aukščiausias rezultatas visada laimi, bet yra neteisingas | **Mažesnę** k reikšmę (pvz., 20) — aukščiausios pozicijos patikimumas svarbesnis      |
| Teisingas atsakymas yra tarp pirmų 5, bet ne pirmas       | **Didesnę** k reikšmę (pvz., 100) — tolygesnis vertinimas skatina sutarimą            |
| Aprėptis didelė, bet tikslumas mažas                      | **Mažesnę** k reikšmę — padarykite rikiavimą griežtesnį                               |
| Aprėptis maža (trūksta susijusių dokumentų)               | **Didesnę** k reikšmę — suteikite galimybę žemesnes pozicijas užimantiems dokumentams |

### RRF svorių nustatymas

Abipusis pozicijų sujungimas semantinei vektorinei pozicijai ir viso teksto paieškos pozicijai suteikia vienodus svorius:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Atskiriems svoriams reguliuoti skirtų aplinkos kintamųjų nėra (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` neegzistuoja).

---

## Apibendrinimo strategija (v3.8.16+)

Modulis `summarization.ts` (`src/lib/memory/summarization.ts`) suglaudina senesnius prisiminimus, kad aktyvusis rinkinys išliktų nedidelis, kartu išsaugant galimybę juos atkurti.

### Kada suaktyvinamas apibendrinimas

| Aktyvinimo būdas             | Slenkstis (numatytasis) |
| ---------------------------- | ----------------------- |
| Rankinis aktyvinimas per API | netaikoma               |

### Kas apibendrinama

Iš `summarization.ts` eksportuojami du įėjimo taškai:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — suglaudina
  seanso prisiminimus į vieną apibendrinimo tekstą, neviršijantį žetonų biudžeto.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API naudojamas
  suglaudinimas pagal amžių: atrenkami visi prisiminimai, senesni nei `days`, iš
  jų sukuriamas vienas suglaudintas apibendrinimo prisiminimas ir (kai `dryRun`
  yra `false`) pašalinami originalai. Perduokite `dryRun: true`, kad galėtumėte
  peržiūrėti pasirinktą rinkinį ir bendrą žetonų skaičių nieko nekeisdami.

Nėra grupavimo pagal žymas / raktus etapo ar kiekvieno prisiminimo vertinimo pagal
principą „esminis ar tinkamas apibendrinti“ — atranka grindžiama tik amžiaus riba,
o apibendrinimo tekstą sudaro po vieną suglaudintą eilutę su tipo priešdėliu
kiekvienam kandidatui.

### Apibendrinimo aktyvinimas

Apibendrinimas yra **rankinis / pasirenkamas** — pagal numatytuosius nustatymus
`autoSummarize` reikšmė yra `false`, todėl niekas nėra automatiškai suglaudinama.
Aktyvinkite jį per API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Jei norite, kad jis liktų išjungtas, tiesiog palikite numatytąją `autoSummarize`
reikšmę (`false`).

### Apibendrinimo kokybės patarimai

- **Pirmiausia peržiūrėkite naudodami `dryRun`** — `summarizeMemoriesOlderThan(..., true)`
  grąžina kandidatų sąrašą ir bendrą žetonų skaičių, todėl prieš pašalindami
  originalus galite patikrinti, kas būtų sujungta.
- **Vykdykite apibendrinimą mažo srauto valandomis**, jei turite didelį prisiminimų rinkinį — LLM iškvietimas yra lėčiausia dalis

```bash
# Cron stilius: apibendrinti kasdien 3 val. ryto
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend teikėjo šablonas

> **Patikimas šaltinis:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testai:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend teikėjo šablonas esamam prisiminimų varikliui suteikia **keičiamą posistemių abstrakcijos sluoksnį**. Užuot buvusi susieta su vienu saugyklos įgyvendinimu, prisiminimų sistema dabar palaiko kelias posistemes (SQLite, Obsidian, Notion, pasirinktines HTTP posistemes) ir konfigūruojamą nukreipimą į pagrindinę bei atsargines posistemes.

### Architektūra

```
┌──────────────────────────────────────────────────────────┐
│                    API maršrutai                          │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│      Vienetinis koordinatorius (manager.ts)               │
│                                                          │
│  Pagrindinė ──► Posistemė A  (pvz., SQLite)              │
│  Atsarginė  ──► Posistemė B  (pvz., Obsidian)            │
│                 Posistemė C  (pvz., Notion per GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ posistemė  │ │ posistemė  │ │ posistemė (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Pagrindinė sąsaja (`backend.ts`)

Kiekviena posistemė turi įgyvendinti `MemoryBackend` sąsają:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD operacijos
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Paieška
  search(config: SearchConfig): Promise<Memory[]>;

  // Būklė
  health(): Promise<HealthCheckResult>;

  // Gyvavimo ciklas (pasirinktinis)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Vienetinis koordinatorius, kuris:

- **Registruoja** posistemes naudodamas `register(backend)` — iškviečiama paleidžiant iš `index.ts`
- **Konfigūruoja** pagrindinę ir atsargines posistemes naudodamas `configure(primary, fallbacks)`
- **Nukreipia** CRUD operacijas / paiešką į pagrindinę posistemę, o gedimo atveju naudoja atsarginių posistemių grandinę
- **Periodiškai tikrina** visų posistemių būklę

**Atsarginio veikimo elgsena:**

| Operacija | Pagrindinė                  | Atsarginės                        |
| --------- | --------------------------- | --------------------------------- |
| `create`  | ✅ Tik pagrindinė           | ❌                                |
| `get`     | ✅ Pirma bandoma pagrindinė | ✅ Jei nerasta, bandoma atsarginė |
| `update`  | ✅ Tik pagrindinė           | ✅ Asinchroninis sinchronizavimas |
| `delete`  | ✅ Tik pagrindinė           | ✅ Asinchroninis sinchronizavimas |
| `list`    | ✅ Tik pagrindinė           | ❌                                |
| `search`  | ✅ Pirma pagrindinė         | ✅ Klaidos atveju — atsarginė     |

#### GenericMemoryBackend (`genericBackend.ts`)

Bendro pobūdžio HTTP jungtis, pritaikanti bet kokią REST API kaip MemoryBackend. Naudinga šioms sistemoms:

- **Notion** — prisijunkite per Notion API
- **Obsidian** — prisijunkite per Obsidian Local REST API
- **Pasirinktinės posistemės** — bet kuri paslauga, pateikianti REST principus atitinkančią prisiminimų API

**Konfigūracija:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Bazinis vidinės sistemos API URL
  apiKey?: string;           // Bearer prieigos raktas autentifikavimui
  headers?: Record<string, string>;  // Pasirinktinės HTTP antraštės
  timeout?: number;          // Užklausos skirtasis laikas (numatytoji reikšmė: 30000ms)
  backendType?: string;      // Registravimui žurnale

  // Galinių taškų perrašymai (numatytosios reikšmės naudoja REST konvencijas)
  endpoints?: {
    search?: string;   // numatytoji reikšmė: "/memories/search"
    create?: string;   // numatytoji reikšmė: "/memories"
    list?: string;     // numatytoji reikšmė: "/memories"
    get?: string;      // numatytoji reikšmė: "/memories/{id}"
    update?: string;   // numatytoji reikšmė: "/memories/{id}"
    delete?: string;   // numatytoji reikšmė: "/memories/{id}"
    health?: string;   // numatytoji reikšmė: "/health"
  };

  // Užklausos parametrų pavadinimų susiejimai
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Kelio parametrų pavadinimų susiejimai
  pathParams?: {
    id?/memoryId?
  };
}
```

**Žinomos vidinės sistemos** yra iš anksto sukonfigūruotos `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend, nukreipta į localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend, nukreipta į api.notion.com/v1
```

#### Integruotos vidinės sistemos

##### SQLiteBackend (`sqliteBackend.ts`)

Numatytoji pagrindinė vidinė sistema. Apgaubia esamą SQLite pagrįstą atminties saugyklą, naudodama `src/lib/memory/store.ts`. Automatiškai užregistruojama paleidimo metu.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Apgaubia esamą Obsidian integraciją (`src/lib/memory/obsidianBackend.ts`). Prisijungia prie Obsidian saugyklos per Obsidian Local REST API.

### Nustatymai

Atminties vidinės sistemos nustatymai saugomi programos nustatymų lentelėje ir valdomi per `src/lib/memory/settings.ts`:

| Nustatymas                     | Aplinkos / konfigūracijos raktas | Numatytoji reikšmė | Aprašymas                                             |
| ------------------------------ | -------------------------------- | ------------------ | ----------------------------------------------------- |
| Pagrindinė vidinė sistema      | `memoryPrimaryBackend`           | `"sqlite"`         | Pagrindinės vidinės sistemos ID                       |
| Atsarginės vidinės sistemos    | `memoryFallbackBackends`         | `[]`               | Sutvarkyti atsarginių vidinių sistemų ID              |
| Vidinių sistemų konfigūracijos | `memoryBackendConfigs`           | `{}`               | Kiekvienos vidinės sistemos konfigūracijos perrašymai |

Nustatymai normalizuojami naudojant `normalizeMemorySettings()` ir talpinami podėlyje funkcijoje `getMemorySettings()`.

### Inicializavimo eiga

```
Programos paleidimas
  → index.ts importai (šalutinis poveikis): užregistruoja SQLiteBackend
  → initMemoryBackends() iškviečiama iš programos gyvavimo ciklo:
      1. Įkelti nustatymus (getMemorySettings)
      2. Sukonfigūruoti pagrindinę ir atsargines sistemas
      3. Inicializuoti visas vidines sistemas (būklės patikra)
      4. Paruošta užklausoms
```

### Naujos vidinės sistemos pridėjimas

1. **Įgyvendinkite `MemoryBackend`** sąsają faile `src/lib/memory/<name>Backend.ts`
2. **Eksportuokite** iš `src/lib/memory/index.ts`
3. **Užregistruokite** naudodami `memoryManager.register(yourBackend)` paleidimo metu
4. **Sukonfigūruokite** per nustatymus: nustatykite `memoryPrimaryBackend` į savo vidinės sistemos ID
5. **Testuokite**, naudodami `src/lib/memory/__tests__/generic-backend.test.ts` kaip pavyzdį

#### Pavyzdys: Brain vidinė sistema

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

### Patikrinimas

#### Vienetų testai

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Tikėtinas rezultatas: **35 testai, visi sėkmingi**, apimantys:

- Konstruktorių (2)
- Būklės patikrą (4) — sėkmę, 500 klaidą, tinklo klaidą, delsą
- Inicializavimą (2) — sėkmę, nesėkmę
- Sukūrimą (2) — numatytąjį galinį tašką, pasirinktinį galinį tašką
- Gavimą (4) — sėkmę, 404 → null, ne 404 išimties išmetimą, pasirinktinius kelio parametrus
- Atnaujinimą (2) — sėkmę, 404 → false
- Šalinimą (2) — sėkmę, 404 → false
- Sąrašo gavimą (2) — užklausos parametrus, pasirinktinius parametrų pavadinimus
- Paiešką (3) — užklausos parametrus, pasirinktinį galinį tašką, parinkčių serializavimą
- Autentifikavimo antraštes (2) — Bearer prieigos raktą, pasirinktines antraštes
- Kūrimo funkciją (1)

#### Tipų patikra

```bash
npm run typecheck:core
```

Tikėtina: **0 klaidų**.
