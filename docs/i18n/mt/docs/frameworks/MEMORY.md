# Memory System (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sors awtorevoli:** `src/lib/memory/` u `src/app/api/memory/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40 (diżattivat b’mod awtomatiku + aġġornament tal-kwantizzazzjoni int8)

OmniRoute jipprovdi memorja persistenti tal-konverżazzjonijiet identifikata permezz tal-API key (u
b’mod fakultattiv permezz tal-ID tas-sessjoni). Il-memorji jiġu estratti awtomatikament mit-tweġibiet tal-LLM
permezz ta’ tqabbil ħafif ta’ mudelli regex u jerġgħu jiddaħħlu fit-talbiet
sussegwenti bħala messaġġ tas-sistema fil-bidu (jew bħala l-ewwel messaġġ tal-utent għall-fornituri li
jirrifjutaw ir-rwol tas-sistema).

> **Il-memorja hija DIŻATTIVATA b’mod awtomatiku (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> issa huwa `false` (`src/lib/memory/settings.ts`). L-attivazzjoni tal-memorja ddaħħal sa
> `maxTokens` (~2k) ta’ kuntest irkuprat f’**kull** talba taċ-chat, li
> tiġi ċċarġjata — spiża mhux mistennija għal installazzjonijiet ġodda u għal klijenti li jimmaniġġjaw
> il-kuntest tagħhom stess. Agħżel li tattivaha b’mod espliċitu taħt **Settings → Memory** (it-tab
> `MemorySkillsTab` turi avviż dwar l-ispiża tat-tokens meta l-memorja tkun attivata).
> Klijent jista’ jagħżel li jeskludi talba waħda permezz tal-header tat-talba
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — ara t-tabella tal-headers tat-talbiet f’
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Talba mingħajr memorja tissettja
> `memoryOwnerId = null`, u dan jiddiżattiva **kemm** l-injezzjoni tal-memorja **kif ukoll** dik tal-ħiliet għal
> dik it-talba (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Il-memorja hija **limitata għal kull API key**, mhux għal kull utent — kull talba awtentikata
bl-istess API key taqsam l-istess ġabra ta’ memorji, b’possibbiltà fakultattiva ta’
limitazzjoni ulterjuri permezz ta’ `sessionId`.

## Arkitettura

```
Klijent → /v1/chat/completions (apiKeyInfo solvut qabel)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # jestratta l-ID
    → getMemorySettings()                     # settings miżmuma fil-cache
    → shouldInjectMemory(body, {enabled})     # kontroll
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vettur fakultattiv
    → injectMemory(body, memories, provider)  # messaġġ tas-sistema jew tal-utent
  → sejħa lill-fornitur upstream
  → mat-tweġiba: extractFacts(text, apiKeyId, sessionId)  # mingħajr imblukkar
    → setImmediate → createMemory(fact) għal kull taqbila
                   → embed(content) + upsertVector(id, vec)
```

Il-punti tas-sejħiet tal-injezzjoni u tal-estrazzjoni huma konnessi f’
`open-sse/handlers/chatCore.ts` (fittex `retrieveMemories`, `injectMemory`,
u `extractFacts`).

## Arkitettura tal-magna (riżoluzzjoni fuq 3 livelli)

Il-Magna tal-Memorja tiddetermina r-rotta tal-irkupru waqt l-eżekuzzjoni abbażi tal-
infrastruttura u s-settings disponibbli. Jeżistu tliet livelli, applikati f’ordni ta’ prijorità:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  LIVELL 0 — Kliem ewlieni (FTS5)                            │
  │  Disponibbiltà ddeterminata permezz ta’ sonda: FTS5 meta     │
  │  l-build ta’ SQLite jappoġġjah (better-sqlite3 / node:sqlite │
  │  / bun:sqlite); mhux disponibbli fuq builds mingħajr FTS5    │
  │  (eż. sql.js/WASM — "no such module: fts5"). Jintuża meta    │
  │  strategy = "exact" jew bħala alternattiva; il-keyword tal-  │
  │  engine-status jirrifletti r-riżultat tas-sonda.             │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  LIVELL 1 — Vettur Integrat (sqlite-vec)                     │
  │  sqlite-vec v0.1.9 mgħobbi permezz ta’ db.loadExtension().   │
  │  KNN brute-force fuq vetturi Float32. Attiv meta:            │
  │   • it-tagħbija ta’ sqlite-vec b’loadExtension tirnexxi      │
  │   • Sors ta’ embeddings ikun disponibbli (remote | static |  │
  │     transformers) li jista’ jipproduċi Float32Array          │
  │   • teżisti t-tabella vec_memories (tinħoloq mal-ewwel       │
  │     ready())                                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  LIVELL 2 — Qdrant (database esterna tal-vetturi fakultattiva)│
  │  Meta jkun attivat, jissostitwixxi sqlite-vec għal           │
  │  semantic/hybrid. Jeħtieġ istanza Qdrant qed taħdem u        │
  │  host/port ikkonfigurati.                                    │
  └─────────────────────────────────────────────────────────────┘
```

Id-degradazzjoni hija awtomatika u trasparenti:

- Jekk sqlite-vec jonqos milli jitgħabba, il-livell 1 ma jkunx disponibbli → jaqa’ lura għal-livell 0.
- Jekk is-sors tal-embeddings jirritorna żball, il-livell 1 jaqa’ lura għal-livell 0.
- Jekk Qdrant ma jkunx qed jaħdem sew, il-livell 2 jaqa’ lura għal-livell 1 (jew għal-livell 0 jekk il-livell 1
  ukoll ma jkunx disponibbli).

## Sorsi tal-embeddings

Is-saff tal-embeddings (`src/lib/memory/embedding/`) jiddetermina liema sors għandu jintuża
abbażi ta’ `MemorySettingsExtended.embeddingSource`:

| Sors           | Deskrizzjoni                                                                                              | Ċavetta meħtieġa | Bidu kiesaħ      |
| -------------- | --------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- |
| `remote`       | Juża l-API tal-embeddings ta’ fornitur ikkonfigurat (OpenAI, Cohere, eċċ.)                                | Iva              | Xejn             |
| `static`       | Embedding lokali permezz ta’ tabella ta’ tfittxija bl-użu ta’ `potion-base-8M` (WordPiece + mean pooling) | Le               | ~200ms           |
| `transformers` | Inferenza ONNX lokali permezz ta’ `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                      | Le               | ~3s + ~400MB RAM |
| `auto`         | Riżoluzzjoni waqt l-eżekuzzjoni: remote (jekk teżisti ċ-ċavetta) → static → transformers → null           | Jiddependi       | Jiddependi       |

**Ordni tar-riżoluzzjoni għal `auto`:**

1. Sib l-ewwel fornitur f’`listEmbeddingProviders()` b’`hasKey === true` → `remote`.
2. Jekk `settings.staticEnabled === true` → `static`.
3. Jekk `settings.transformersEnabled === true` → `transformers`.
4. Inkella → `null` (jiddegrada għal tfittxija bil-kliem ewlieni FTS5).

Il-cache tal-embeddings (`src/lib/memory/embedding/cache.ts`) juża mappa LRU fil-memorja
indiċizzata b’`${source}:${model}:${dim}:${sha256(text)}`, limitata għal
`MEMORY_EMBEDDING_CACHE_MAX` entrati (valur predefinit 1000) b’TTL ta’
`MEMORY_EMBEDDING_CACHE_TTL_MS` (valur predefinit 5 minuti). Tinqasam bejn dawk kollha li jsejħulha
matul iċ-ċiklu tal-ħajja ta’ kull proċess.

## RRF ibridu (k=60)

Meta `strategy = "hybrid"` u l-maħżen tal-vetturi jkun disponibbli, l-irkupru juża
Reciprocal Rank Fusion biex jgħaqqad ir-riżultati ta’ FTS5 u tal-vetturi:

```
RRF(d) = Σ  1 / (k + rank_i(d))      fejn k = 60 (konfigurabbli permezz ta’ MEMORY_RRF_K)
          i
```

B’mod konkret:

1. Ħaddem tfittxija FTS5 → lista kklassifikata `R_fts` (pożizzjoni 1..N).
2. Ħaddem tfittxija tal-vetturi KNN → lista kklassifikata `R_vec` (pożizzjoni 1..M).
3. Għal kull `memoryId` uniku:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 jekk ma jkunx fil-lista).
4. Issortja skont `rrf_score` DESC, u applika l-mixja tal-baġit tat-tokens.

RRF huwa magħruf sew li huwa effettiv mingħajr il-ħtieġa ta’ normalizzazzjoni tal-punteġġi bejn
sistemi ta’ rkupru eteroġenji. Il-valur predefinit `k=60` ġej mill-artiklu oriġinali
ta’ Cormack et al. u jaħdem tajjeb għal korpora żgħar (<10k memorji).

## Mili retroattiv (għażżien + indiċjar mill-ġdid)

Meta jinbidel il-mudell tal-embeddings (identifikat permezz ta’ `embedding_signature`), il-
maħżen tal-vetturi jinbena mill-ġdid u l-memorji eżistenti kollha jiġu mmarkati
`needs_reindex = 1` fit-tabella `memories`.

**Mili retroattiv għażżien**: Fl-irkupru li jmiss, kwalunkwe memorja li tkun nieqsa minn entrata tal-vettur tiġi
inkorporata u mdaħħla f’`vec_memories` qabel ma titħaddem it-tfittxija. Dan
iqassam l-ispiża tal-mili retroattiv fuq talbiet reali mingħajr ma jimblokka l-istartjar.

**Indiċjar mill-ġdid espliċitu**: It-tab Engine f’`/dashboard/memory` tipprovdi buttuna
"Indiċja mill-Ġdid Issa" li ssejjaħ `POST /api/memory/reindex`. Il-handler isejjaħ
`runReindexBatch()` minn `src/lib/memory/reindex.ts`, li jipproċessa sa
`limit` entrati pendenti għal kull talba. Il-progress jista’ jiġi ċċekkjat perjodikament permezz ta’
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

It-tabella `memory_vec_meta` (migrazzjoni `083_memory_vec.sql`) taħżen:

- `active_dim` — id-dimensjoni attwali tal-vettur (null = għadha mhix ikkalibrata).
- `embedding_signature` — `${source}:${model}:${dim}` użata biex jiġu identifikati l-bidliet.
- `last_reset_at` — it-timbru tal-ħin tal-aħħar reset sħiħ.
- `vec_loaded` — indikatur 0/1 dwar jekk sqlite-vec ittellax b’suċċess.

## Estensjoni tas-settings

Disa' oqsma tal-embedding u tal-vetturi huma disponibbli f'`MemorySettingsExtended` fi
`src/shared/schemas/memory.ts`, u jinżammu permezz ta' `src/lib/db/settings.ts`:

| Qasam                    | Tip                                                | Valur default | Deskrizzjoni                                                                 |
| ------------------------ | -------------------------------------------------- | ------------- | ---------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`      | Liema sors tal-embedding għandu jintuża                                      |
| `embeddingProviderModel` | `string \| null`                                   | `null`        | Fornitur/mudell fil-format `provider/model`                                  |
| `customBaseUrl`          | `string \| null`                                   | `null`        | URL bażi ta' endpoint kompatibbli ma' OpenAI għall-memorja biss              |
| `customModelId`          | `string \| null`                                   | `null`        | ID tal-mudell mibgħut lill-endpoint personalizzat                            |
| `transformersEnabled`    | `boolean`                                          | `false`       | Għażla espliċita għal Transformers.js (MiniLM, ~400MB)                       |
| `staticEnabled`          | `boolean`                                          | `false`       | Għażla espliċita għall-mudell lokali statiku potion-base-8M                  |
| `rerankEnabled`          | `boolean`                                          | `false`       | Ippermetti l-pass ta' klassifikazzjoni mill-ġdid (iżid +200-500ms/req)       |
| `rerankProviderModel`    | `string \| null`                                   | `null`        | Fornitur/mudell għall-klassifikazzjoni mill-ġdid fil-format `provider/model` |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`      | Liema backend tal-vetturi għandu jintuża                                     |

Dawn huma esposti permezz ta' `GET /PUT /api/settings/memory` (skema `MemorySettingsExtendedSchema`).

Għas-sors `remote`, Memory jaċċetta wkoll is-settings fakultattivi `customBaseUrl` u
`customModelId`. Flimkien dawn jagħżlu endpoint `/embeddings` u mudell kompatibbli
ma' OpenAI mingħajr ma jibdlu r-reġistru globali tal-embeddings. L-endpoint jiġi
normalizzat qabel l-użu u ċċekkjat mill-politika tal-URL outbound tal-fornitur: HTTP(S)
huwa meħtieġ, il-kredenzjali inkorporati u s-strings tal-query jiġu rrifjutati, u
l-indirizzi tal-metadata tal-cloud jibqgħu mblukkati. Il-valuri vojta jżommu l-fornitur
magħżul mir-reġistru. L-iżbalji mibgħuta lura lid-dashboard jiġu sanitizzati u
l-kredenzjali tal-endpoint qatt ma jiġu rreġistrati fil-logs.

> **TODO (D20):** L-ambitu `global` (il-kondiviżjoni tal-memorji bejn l-API keys kollha)
> mhuwiex implimentat f'din ir-rilaxx. Dan jeħtieġ bidliet fl-iskema u perkors globali
> għall-irkupru. Għandu jiġi segwit separatament.

## Saffi tal-ħażna

### Primarju: SQLite (tabella `memories`)

Maħluqa mill-migrazzjoni `015_create_memories.sql`:

| Kolonna                     | Tip                | Noti                                                                            |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID iġġenerat permezz ta' `crypto.randomUUID()`                                |
| `api_key_id`                | `TEXT NOT NULL`    | L-API key sid                                                                   |
| `session_id`                | `TEXT`             | Ambitu fakultattiv għal kull konverżazzjoni                                     |
| `type`                      | `TEXT NOT NULL`    | Wieħed minn `factual`, `episodic`, `procedural`, `semantic`                     |
| `key`                       | `TEXT`             | Key stabbli għall-upsert, eż. `preference:i_prefer_python`                      |
| `content`                   | `TEXT NOT NULL`    | It-test proprju tal-fatt                                                        |
| `metadata`                  | `TEXT`             | Blokka JSON (kategorija, extractedAt, sors, ...)                                |
| `created_at` / `updated_at` | `TEXT`             | Strings ISO 8601                                                                |
| `expires_at`                | `TEXT`             | Skadenza fakultattiva; `NULL` tfisser permanenti                                |
| `memory_id`                 | `INTEGER UNIQUE`   | Miżjud minn `023_fix_memory_fts_uuid.sql` biex jgħaqqad UUIDs ↔ rowids ta' FTS5 |

Indiċijiet: `api_key_id`, `session_id`, `type`, `expires_at`, flimkien mal-indiċi
uniku `memory_id`.

**Semantika tal-upsert**: `createMemory()` ifittex ringiela eżistenti bl-istess
`(api_key_id, key)` u jaġġornaha fl-istess post meta jsibha (billi jgħaqqad
`metadata` permezz ta' shallow spread). Dan iżomm it-tabella milli tikber mingħajr
limitu minħabba dikjarazzjonijiet ripetuti tal-preferenzi.

### Tiftix fit-test sħiħ (tabella virtwali `memory_fts`)

`022_add_memory_fts5.sql` joħloq tabella virtwali FTS5 fuq `content` u
`key`. `023_fix_memory_fts_uuid.sql` jirranġa bug reali fejn il-primary key UUID
ma kienx jingħaqad mar-rowid integer ta' FTS5 — il-migrazzjoni żżid il-kolonna
`memory_id`, terġa' toħloq it-tabella FTS, u tikkonfigura triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) li jżommu l-FTS sinkronizzat ma'
INSERT, DELETE, u UPDATE.

Jintuża minn `retrieval.ts` għall-istrateġiji `semantic` u `hybrid` (ara hawn taħt).
Il-kodiċi tal-irkupru jagħmel verifika protettiva b'`hasTable("memory_fts")` u jerġa'
lura għall-ordni kronoloġiku jekk it-tabella FTS tkun nieqsa jew il-query FTS
tarmi żball.

### Fakultattiv: Qdrant (livell 2 tal-maħżen tal-vetturi)

`src/lib/memory/qdrant.ts` jimplimenta integrazzjoni fakultattiva ma' Qdrant bħala
maħżen tal-vetturi tal-livell 2. L-irkupru jintbagħat lejn Qdrant biss meta s-selettur
tal-engine `memoryVectorStore === "qdrant"` — il-valur default `"auto"` (u
`"sqlite-vec"`) **qatt** ma jagħżlu Qdrant. It-toggle fit-tab Engine jissettja
**kemm** `qdrantEnabled` **kif ukoll** `memoryVectorStore` flimkien: meta jiġi
attivat, Qdrant isir il-maħżen primarju; meta jiġi diżattivat, jerġa' jiġi ssettjat
għal `"auto"` (#5597 — qabel dik it-tiswija, l-attivazzjoni ma kellha ebda effett
għax xejn ma kien jikteb fis-selettur tal-engine). Jekk Qdrant ma jkunx jista'
jintlaħaq jew ma jirritorna xejn, l-irkupru jerġa' lura għal sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — jinkorpora `key + content` bil-mudell ta'
  inkorporazzjoni kkonfigurat, tiżgura li l-kollezzjoni teżisti (toħloq vetturi
  b'distanza cosine mal-ewwel użu), u ddaħħal jew taġġorna punt bil-payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — jinkorpora l-mistoqsija, ifittex
  fil-kollezzjoni ffiltrata skont `kind = "omniroute_memory"` u, b'mod fakultattiv,
  skont `apiKeyId` / `sessionId`. Jillimita `topK` għall-medda `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — iħassar punt wieħed. Tissejjaħ minn
  `deleteMemory()` wara li titneħħa r-ringiela ta' SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — iħassar bil-massa l-punti li
  `expiresAtUnix` tagħhom jinsab fil-passat jew li `createdAtUnix` tagħhom huwa eqdem
  mil-limitu taż-żamma. L-ewwel jgħoddhom sabiex id-dashboard ikun jista' juri n-numri reali.
- `checkQdrantHealth()` — sonda tas-saħħa `GET /readyz` bil-latenza.

L-interfaċċa tas-settings tesponi l-konfigurazzjoni ta' Qdrant, il-verifika tas-saħħa,
it-test tat-tfittxija semantika, u t-tindif fit-tab **Magna** ta' `/dashboard/memory`.
Ir-rotot korrispondenti taħt `src/app/api/settings/qdrant/` huma kollha mqabbda minn v3.8.6:

| Rotta                                   | Metodu        | Deskrizzjoni                                     |
| --------------------------------------- | ------------- | ------------------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Aqra / aġġorna s-settings ta' Qdrant             |
| `/api/settings/qdrant/health`           | `GET`         | Sonda tad-disponibbiltà + latenza                |
| `/api/settings/qdrant/search`           | `POST`        | Test tat-tfittxija semantika                     |
| `/api/settings/qdrant/cleanup`          | `POST`        | Neħħi punti skaduti / qodma                      |
| `/api/settings/qdrant/embedding-models` | `GET`         | Elenka l-mudelli ta' inkorporazzjoni disponibbli |

**Noti dwar l-imġiba (x'għandek tistenna):**

- **Għażla tal-magna** — meta tattiva Qdrant fit-tab Magna, dan isir il-ħażna
  primarja (jissettja `memoryVectorStore="qdrant"`); meta tiddiżattivah, jerġa'
  jiġi ssettjat għal `"auto"` (#5597).
- **Ebda mili retroattiv** — il-memorji maħluqa/aġġornati **wara** li jiġi attivat
  Qdrant biss jinkitbu fih (kitba doppja mingħajr stennija għar-riżultat). Il-memorji
  SQLite li kienu diġà jeżistu **ma jiġux** emigrati; "Indiċizza mill-Ġdid Issa"
  jerġa' jibni biss l-indiċi sqlite-vec, mhux dak ta' Qdrant.
- **Id-dimensjoni tal-vettur tiġi identifikata awtomatikament** mill-inkorporazzjoni
  effettiva mal-ewwel użu — m'hemm ebda kamp tad-dimensjoni x'jimtlew. Il-bidla
  tal-mudell ta' inkorporazzjoni wara li tkun teżisti kollezzjoni **ma tiġix** ittrattata
  awtomatikament: il-kollezzjoni eżistenti titħalla kif inhi, il-kitbiet/tfittxijiet
  b'dimensjonijiet mhux kompatibbli jfallu u jaqgħu lura għal sqlite-vec. Oħloq mill-ġdid
  il-kollezzjoni (isem ġdid, jew ħassarha f'Qdrant) biex tibdel il-mudell ta' inkorporazzjoni.
- **Metrika tad-distanza** — dejjem **Cosine** (kodifikata direttament fil-ħolqien
  tal-kollezzjoni; mhijiex konfigurabbli).
- **Awtentikazzjoni** — ċavetta tal-API biss (tintbagħat bħala l-header `api-key`;
  fakultattiva għal Docker lokali mingħajr awtentikazzjoni). JWT/RBAC ma jintużawx.
- **Kampi tal-konfigurazzjoni** — l-interfaċċa tesponi `host`, `port`, `collection`,
  `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` huma disponibbli biss
  fl-ambjent/DB u `vectorSize` ma jintużax għall-ħolqien tal-kollezzjoni (id-dimensjoni
  tiġi mill-inkorporazzjoni).

### Kwantizzazzjoni tal-vetturi (int8 — fakultattiva, għaż-żewġ backends)

Iż-żewġ backends tal-vetturi jappoġġjaw **kwantizzazzjoni int8 fakultattiva** biex
jitnaqqas l-użu tal-memorja tal-vetturi maħżuna (~4× iżgħar minn Float32), bi tnaqqis
żgħir fil-kapaċità tal-irkupru. B'mod awtomatiku hija **mitfija** fit-tnejn — il-vetturi
jibqgħu bi preċiżjoni sħiħa sakemm ma tiġix attivata espliċitament.

| Backend    | Setting                             | Tip                            | Default  | Minn fejn jinqara                                           |
| ---------- | ----------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (ċavetta DB)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (ambjent) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** jiġi kkonfigurat għal kull istanza permezz taċ-ċavetta tas-setting
  `qdrantQuantization` (esposta bħala l-kamp `quantization` fuq
  `PUT /api/settings/qdrant`). Meta tkun `"int8"`, `buildQuantizationConfig()`
  titlob kwantizzazzjoni skalari (`always_ram`, kwantil `0.99`) u t-tfittxijiet
  jattivaw `rescore: true` sabiex il-vetturi bi preċiżjoni sħiħa jirfinaw is-sett
  ta' kandidati int8.
- Il-kwantizzazzjoni ta' **sqlite-vec** hija **permezz tal-ambjent biss** (mhijiex
  setting tad-DB): issettja `MEMORY_VEC_QUANTIZATION=int8` biex taħżen il-vetturi
  lokali bħala kolonna `int8[dim]` permezz ta' `vec_quantize_int8(?, 'unit')`.
  Il-modalità magħżula tiġi inkorporata f'`embedding_signature` (suffiss `:int8`),
  għalhekk il-bidla bejn il-modalitajiet tiskatta indiċizzazzjoni mill-ġdid sħiħa
  tat-tabella `vec_memories` — l-istess proċess ta' mili retroattiv għażżien użat
  meta jinbidel il-mudell ta' inkorporazzjoni.

## Tipi ta' Memorja

`MemoryType` (`src/lib/memory/types.ts`):

| Tip          | Jintuża għal                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `factual`    | Preferenzi, fatti stabbli dwar l-utent, mudelli ta' mġiba                                                       |
| `episodic`   | Deċiżjonijiet marbuta ma' mument speċifiku ("Għażilt Postgres")                                                 |
| `procedural` | Memorja tal-fluss tax-xogħol / ta' kif tagħmel xi ħaġa (riżervata; bħalissa m'hemm l-ebda estrattur awtomatiku) |
| `semantic`   | Riżervata għal entrati fil-vector store                                                                         |

L-istrateġija tal-irkupru ta' `MemoryConfig` hija waħda minn `exact`, `semantic`, jew `hybrid`,
u l-ambitu huwa wieħed minn `session`, `apiKey`, jew `global`. L-ambitu predefinit minn
`getMemorySettings()` huwa `apiKey`.

## Estrazzjoni tal-Fatti (`extraction.ts`)

L-estrazzjoni hija **bbażata fuq regex**, mhux fuq LLM — titħaddem fil-proċess permezz ta'
`setImmediate()` sabiex qatt ma timblokka l-fluss tar-rispons:

- **Mudelli ta' preferenza** → `MemoryType.FACTUAL`
  (eż. `Nippreferi …`, `Jogħġobni ħafna …`, `il-favorit tiegħi huwa …`, `Nobgħod …`)
- **Mudelli ta' deċiżjoni** → `MemoryType.EPISODIC`
  (eż. `Se nuża …`, `Għażilt …`, `Iddeċidejt fuq …`, `Se nadotta …`)
- **Mudelli ta' drawwiet** → `MemoryType.FACTUAL`
  (eż. `Normalment jien …`, `Jien dejjem …`, `Għandi t-tendenza li …`)

Kull tqabbil jiġi ssanitizzat (`trim`, tnaqqis tal-ispazji bojod, limitat għal 500 karattru),
deduplikat fil-lott permezz ta' `factKey(category, content)` stabbli, u
maħżun permezz ta' `createMemory()` bil-metadata
`{category, extractedAt, source: "llm_response"}`. It-test tal-input huwa limitat għal
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — meta jkun itwal, tintuża l-**parti finali** tat-test
sabiex l-aktar kontenut reċenti tal-assistent dejjem jiġi inkluż.

`extractFactsFromText(text)` hija esportata għat-testijiet u tirritorna l-fatti strutturati
mingħajr ma taħżinhom.

## Irkupru (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` huwa l-punt tad-dħul ewlieni. Dan:

1. Jinnormalizza u jivvalida l-konfigurazzjoni permezz ta' `MemoryConfigSchema`.
2. Jirritorna `[]` immedjatament meta `enabled` ikun false jew `maxTokens <= 0`.
3. Jillimita `maxTokens` għall-medda `[1, 8000]`.
4. Jidentifika jekk teżistix it-tabella moderna `memories` (minflok it-tabella qadima `memory`)
   sabiex databases eqdem jibqgħu jaħdmu.
5. Jibni l-query bażika bi protezzjoni kontra l-iskadenza
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ambitu
   tas-sessjoni fakultattiv, u limitu fakultattiv ta' `retentionDays`.
6. Jagħżel fergħa skont l-istrateġija:
   - **`exact`** (predefinita): ordni kronoloġika `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jekk `config.query` u `memory_fts` jeżistu, jagħmel JOIN ma'
     `memory_fts MATCH ?` u jordna skont il-grad FTS; jerġa' juża l-ordni kronoloġika
     meta FTS jirritorna 0 ringieli.
   - **`hybrid`**: unjoni tar-riżultati FTS (b'rilevanza ogħla) u s-sett
     kronoloġiku, deduplikati skont l-id.
7. Jikkalkula punteġġ ta' rilevanza tal-kliem ewlieni (`getRelevanceScore`) fuq
   `content`, `key`, u l-JSON ta' `metadata` meta tiġi pprovduta query. Ringieli bi
   punteġġ żero jiġu ffiltrati.
8. Jissortja skont il-punteġġ b'mod dixxendenti, imbagħad skont `createdAt` b'mod dixxendenti.
9. Jgħaddi mil-lista kklassifikata u jaċċetta l-entrati sakemm it-total akkumulat ta'
   `estimateTokens(content)` (≈ `length / 4`) jibqa' taħt il-baġit. Dejjem
   jirritorna mill-inqas entrata waħda meta jkun hemm xi tqabbil.

`estimateTokens` hija esportata u tintuża mill-irkupru, mit-taqsir, u mill-għodda MCP
`omniroute_memory_search`.

## Injezzjoni (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Jgħaqqad il-kontenut kollu tal-memorji fi string waħda `Memory context: …`.
2. Jagħżel strateġija skont l-isem tal-fornitur:
   - **Messaġġ tas-sistema** (il-predefinit għal OpenAI, Anthropic, Gemini, …) — iżid
     `{role: "system", content: memoryText}` fil-bidu, qabel kwalunkwe messaġġ eżistenti
     tas-sistema, sabiex il-prompts tas-sistema tal-utent jibqgħu jieħdu preċedenza.
   - **Messaġġ tal-utent** (alternattiva) — għall-fornituri f'
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Dawn jirrifjutaw ir-rwol tas-sistema
     u inkella jirritornaw 400 (ara l-kwistjoni #1701 għal GLM/Zhipu).
3. Jirreġistra l-għadd, l-istrateġija u l-mudell taħt `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` jiġi esportat għal min isejjaħlu u jkollu
bżonn jieħu d-deċiżjonijiet tiegħu stess dwar ir-routing. Fornituri mhux magħrufa jużaw `true`
(ir-rwol tas-sistema huwa permess) bħala valur predefinit għas-sikurezza.

## Settings (`settings.ts`)

Il-konfigurazzjoni tal-memorja hija **maħżuna fit-tabella tas-settings tad-DB**, mhux f'varjabbli tal-ambjent.
`getMemorySettings()` jaqra minn `getSettings()` u jżomm ir-riżultat fil-cache
tal-proċess; `invalidateMemorySettingsCache()` tissejjaħ mir-rotta PUT tas-settings
wara l-kitbiet.

### Oqsma legati (il-verżjonijiet kollha)

| Ċavetta tad-DB        | Tip     | Valur predefinit                                        | Kontroll tal-UI                                                             |
| --------------------- | ------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (mitfi b'mod predefinit minn v3.8.30)           | Memorja mixgħula/mitfija                                                    |
| `memoryMaxTokens`     | integer | `2000` (medda `0–16000`)                                | Baġit tat-tokens għall-injezzjoni                                           |
| `memoryRetentionDays` | integer | `30` (medda `1–365`)                                    | Perjodu taż-żamma                                                           |
| `memoryStrategy`      | enum    | `"hybrid"` (wieħed minn `recent`, `semantic`, `hybrid`) | Strateġija tal-irkupru                                                      |
| `skillsEnabled`       | boolean | `false`                                                 | Jixgħel jew jitfi l-injezzjoni tal-ħiliet għal kull ċavetta (ara SKILLS.md) |

Nota: l-istrateġija tal-UI `"recent"` tiġi mmappjata għall-istrateġija interna tal-irkupru
`"exact"` permezz ta' `toMemoryRetrievalConfig()` (ordni kronoloġika).

### Oqsma ġodda (v3.8.6, pjan 21 D9)

Ara wkoll it-taqsima "Estensjoni tas-settings" hawn fuq għad-deskrizzjonijiet tal-oqsma.

| Ċavetta tad-DB              | Qasam tal-API            | Valur predefinit |
| --------------------------- | ------------------------ | ---------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`         |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`           |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`          |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`          |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`          |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`           |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`         |

Iċ-ċwievet tad-DB relatati ma' Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` bil-valur predefinit `"omniroute_memory"`,
`qdrantEmbeddingModel` bil-valur predefinit `"openai/text-embedding-3-small"`) jinqraw minn
`normalizeQdrantConfig()` f'`qdrant.ts`.

### Varjabbli tal-ambjent (v3.8.6)

Sitt varjabbli fakultattivi tal-ambjent jirregolaw l-imġiba tal-magna waqt l-eżekuzzjoni (iddokumentati f'`.env.example`):

| Varjabbli                       | Valur predefinit           | Deskrizzjoni                                                                                                                                                 |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL tal-cache tal-embeddings (5 minuti)                                                                                                                      |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Għadd massimu ta' entrati fil-cache LRU tal-embeddings                                                                                                       |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repożitorju HF għall-mudell ta' Transformers.js                                                                                                              |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repożitorju HF għall-mudell statiku potion                                                                                                                   |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Fejn għandhom jinħażnu l-mudelli mniżżla                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | Valur top-K predefinit għat-tiftix vettorjali                                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | Il-kostanti k tal-RRF għat-tiftix ibridu                                                                                                                     |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Issettja għal `int8` biex taħżen vetturi lokali ta' sqlite-vec kkwantizzati (madwar 4× iżgħar; fakultattiv). Bidla fil-modalità ġġiegħel indiċjar mill-ġdid. |

## Taqsir (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` jikkompatta kontenut eqdem
meta t-total kumulattiv tat-tokens fil-memorji ta’ ċavetta jaqbeż il-baġit.
Jgħaddi mir-ringieli f’ordni DESC skont `created_at`, iżomm ir-ringieli li
joqogħdu fil-baġit, u fil-bqija jissostitwixxi `content` fl-istess post
bl-ewwel tliet sentenzi tal-oriġinal. `tokensSaved` hija d-differenza
f’`estimateTokens` bejn il-kontenut il-qadim u dak il-ġdid.

Din ir-rutina hija **disponibbli iżda bħalissa ma tissejjaħx awtomatikament**
fil-pipeline taċ-chat — sejħilha minn cron, azzjoni amministrattiva, jew
loġika ta’ integrazzjoni għal `MemoryConfig.autoSummarize` jekk teħtieġ
kompattazzjoni kontinwa. It-telf tad-data huwa irriversibbli: it-test
oriġinali jinkiteb fuqu.

## API REST

L-endpoints kollha jeħtieġu awtentikazzjoni tal-ġestjoni (`requireManagementAuth`).

### Endpoints ewlenin tal-memorja (eżistenti + aġġornati)

| Metodu   | Path                 | Deskrizzjoni                                                                                                                                                                                        |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lista paġnata b’filtri: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Ir-risposta tinkludi `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                      |
| `POST`   | `/api/memory`        | Joħloq entrata (ivvalidata b’Zod: `content`, `key`, u b’mod fakultattiv `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Isejjaħ `createMemory()` li jwettaq upsert fuq `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Iġib entrata waħda permezz tal-UUID                                                                                                                                                                 |
| `PUT`    | `/api/memory/[id]`   | Jaġġorna l-kampijiet tal-entrata (`type`, `key`, `content`, `metadata`). Korp: `MemoryUpdatePutSchema`. Jissinkronizza wkoll il-vector jekk ikun disponibbli s-sors tal-embedding.                  |
| `DELETE` | `/api/memory/[id]`   | Iħassar entrata; iħassarha wkoll minn `vec_memories` (D15) u, fuq bażi tal-aħjar sforz, minn Qdrant. Jirritorna 404 meta ma tinstabx.                                                               |
| `GET`    | `/api/memory/health` | Iħaddem `verifyExtractionPipeline("health-check")` — ċiklu sħiħ ħolqien→elenkar→tħassir. Jirritorna `{working, latencyMs, error?}`                                                                  |

### Endpoints ġodda tal-magna tal-memorja (pjan 21)

| Metodu | Path                              | Deskrizzjoni                                                                                                                                                                                                                          |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Simulazzjoni ta’ `retrieveMemories` — tirritorna riżultati kklassifikati bil-punteġġ, il-livell u t-tokens. Korp: `RetrievePreviewSchema`. MA tinjettax jew timmodifika memorji.                                                      |
| `GET`  | `/api/memory/embedding-providers` | Jelenka l-fornituri bil-mudelli tal-embedding, filwaqt li jindika liema minnhom għandhom ċavetta tal-API kkonfigurata.                                                                                                                |
| `GET`  | `/api/memory/engine-status`       | Jirritorna l-istatus sħiħ tal-magna: livell tal-kliem ewlieni, riżoluzzjoni tal-embedding, statistika tal-ħażna tal-vectors, saħħa ta’ Qdrant, konfigurazzjoni tal-klassifikazzjoni mill-ġdid. Struttura: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Jattiva manwalment il-kompattazzjoni tal-memorja. Korp: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Jirritorna `{candidates, tokensSaved}`.                                                                     |
| `POST` | `/api/memory/reindex`             | Jattiva indiċizzazzjoni mill-ġdid tal-vectors għall-memorji b’`needs_reindex=1`. Korp: `MemoryReindexSchema` (`force`). Jirritorna `{started, pending}`.                                                                              |

### Endpoints tas-settings

| Metodu | Path                                    | Deskrizzjoni                                                                                                 |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` normalizzat attwali (7 kampijiet ġodda + dawk preċedenti)                           |
| `PUT`  | `/api/settings/memory`                  | Jaġġorna kwalunkwe kamp minn `MemorySettingsExtendedSchema` (12-il kamp b’kollox)                            |
| `GET`  | `/api/settings/qdrant`                  | Settings attwali ta’ Qdrant (`QdrantSettingsSchema`)                                                         |
| `PUT`  | `/api/settings/qdrant`                  | Jaġġorna s-settings ta’ Qdrant. Korp: `QdrantSettingsUpdateSchema`. `apiKey` = string vojt ineħħi ċ-ċavetta. |
| `GET`  | `/api/settings/qdrant/health`           | Kontroll tal-aċċessibbiltà fuq l-istanza kkonfigurata ta’ Qdrant. Jirritorna `QdrantHealthResultSchema`.     |
| `POST` | `/api/settings/qdrant/search`           | Test ta’ tfittxija semantika fuq Qdrant. Korp: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | Ineħħi punti ta’ Qdrant għal memorji skaduti / qodma.                                                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | Jelenka l-mudelli tal-embedding disponibbli għal Qdrant.                                                     |

Il-query tal-lista `/api/memory` tappoġġja jew paġnazzjoni bbażata fuq `page`
(`parsePaginationParams`) **jew** `offset` dirett — meta `offset` ikun preżenti,
dan jieħu preċedenza u jiġi kkalkolat `page` derivat għall-istruttura
tar-risposta.

## Għodod MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Meta s-server MCP ikun attivat, jiġu rreġistrati tliet għodod tal-memorja:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → jinkapsula `retrieveMemories()`. Minn v3.8.6 (D16), l-`strategy` tinqara
  minn `getMemorySettings()` minflok ma tkun ikkodifikata b'mod fiss bħala `"exact"`. Jekk
  `query` tkun ipprovduta u `strategy` tkun `semantic` jew `hybrid`, jintuża l-maħżen
  vettorjali meta jkun disponibbli.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → jinkapsula `createMemory()`. Jaċċetta biss l-4 tipi kanoniċi:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → jelenka l-entrati
  li jaqblu, b'għażla li jiffiltrahom skont timestamp ta' ħolqien qabel data speċifika, imbagħad iħassar kull waħda
  permezz ta' `deleteMemory()` (li jneħħi wkoll il-vetturi minn sqlite-vec + Qdrant).

Ara [MCP-SERVER.md](./MCP-SERVER.md) għad-dettalji dwar it-trasport u l-ambitu.

## Dashboard (Studio tal-Memorja)

`src/app/(dashboard)/dashboard/memory/page.tsx` issa huwa **Studio bi 3 tabs**:

### Tab: Memorji

- Kard tal-kunċett (spjegazzjoni kollassabbli "Kif jaħdem").
- Lista, tfittxija u paġinazzjoni f'ħin reali (dewmien ta' 300 ms).
- Filtru tat-tip (`factual` / `episodic` / `procedural` / `semantic` / kollha).
- Modal biex iżżid memorja (ċavetta, kontenut, tip).
- Editjar dirett (buttuna bil-lapes → `PUT /api/memory/[id]`).
- Tħassir għal kull ringiela (b'djalogu ta' konferma).
- Esportazzjoni JSON tal-paġna attwali; importazzjoni JSON permezz ta' selettur tal-fajls.
- Kards tal-istatistika: `totalEntries`, `tokensUsed`, `hitRate`.
- Buttuna "Ikkumpatta l-qodma" → `POST /api/memory/summarize` (l-ewwel eżekuzzjoni ta' prova turi
  l-għadd ta' kandidati, imbagħad titlob konferma).
- Tikka ħadra/ħamra tal-istatus immexxija minn `GET /api/memory/health`.

### Tab: Żona tal-Ittestjar

- Input tal-mistoqsija + selettur tal-istrateġija (Eżatta / Semantika / Ibrida) + baġit tat-tokens.
- "Issimula" → `POST /api/memory/retrieve-preview` — juri riżultati kklassifikati b'
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Pannell tar-riżoluzzjoni li juri liema sors tal-embedding / maħżen vettorjali ntuża u
  jekk seħħx fallback.

### Tab: Magna

- Pannell tal-istatus tal-magna (badge ta' keyword FTS5, badge tal-embedding, badge tal-maħżen vettorjali,
  badge tal-istatus ta' Qdrant, badge tar-riklassifikazzjoni).
- Buttuna "Erġa' Indiċizza Issa" → `POST /api/memory/reindex`.
- Selettur tas-sors tal-embedding (awtomatiku / remot / statiku / transformers + swiċċijiet).
- Kard tal-konfigurazzjoni ta' Qdrant (swiċċ tal-attivazzjoni, host/port/kollezzjoni/ċavetta, test tal-konnessjoni,
  test tat-tfittxija semantika, tindif).
- Kard tal-konfigurazzjoni tar-riklassifikazzjoni (swiċċ tal-attivazzjoni, selettur tal-fornitur/mudell).

Is-settings tal-Memorja u ta' Qdrant jinsabu wkoll taħt
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) għall-
interfaċċa tas-settings preċedenti/globali.

## Caching

`src/lib/memory/store.ts` iżomm cache simili għal LRU fil-proċess
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, bi żgumbrament tal-eqdem 20 %)
għall-qari ta' `getMemory(id)`, flimkien ma' saff ġeneriku ta' ċavetta/valur
`memoryCache` (`src/lib/memory/cache.ts`) b'metodi `get`/`set`/`invalidate`
użati minn min isejjaħ u jrid il-cache tiegħu stess b'ambitu definit (LRU ta' 1 000 entrata,
TTL predefinit ta' 5 min).

## Privatezza u Ċiklu tal-Ħajja

- Is-sjieda tal-memorja hija l-id taċ-ċavetta tal-API (`resolveMemoryOwnerId` f'
  `chatCore.ts`). Mingħajr `apiKeyInfo.id`, la l-irkupru, la l-injezzjoni
  u lanqas l-estrazzjoni ma jitħaddmu.
- Entrati b'`expires_at` fil-futur jiġu ffiltrati mill-irkupru; entrati qodma
  li jaqbżu `retentionDays` jiġu esklużi mill-klawżola
  `created_at >= cutoff` f'`retrieveMemories`.
- Għal tħassir permanenti, uża `DELETE /api/memory/[id]` jew `omniroute_memory_clear`.
- L-estrazzjoni titħaddem mingħajr stennija għar-riżultat permezz ta' `setImmediate`; il-fallimenti jiġu rreġistrati taħt
  `memory.extraction.background.failed` u qatt ma jintwerew lil min jagħmel it-talba.
- Iċ-ċikli ta' verifika (`verifyExtractionPipeline`) inaddfu l-entrati tat-test
  tagħhom stess fi blokka `finally`.

## Ara Wkoll

- [SKILLS.md](./SKILLS.md) — l-issettjar `skillsEnabled` jinjetta d-definizzjonijiet
  tal-għodod flimkien mal-memorja.
- [MCP-SERVER.md](./MCP-SERVER.md) — trasport / ambiti tal-MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — firxa usa' tal-API.
- Moduli tas-sors:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF ibridu
  - `src/lib/memory/embedding/index.ts` — saff ta' embeddings minn diversi sorsi
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — skemi Zod għall-korpi kollha tal-API tal-memorja
  - `src/shared/schemas/qdrant.ts` — skemi Zod għall-issettjar/operazzjonijiet ta' Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD għal `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + subrotot
  - `src/app/(dashboard)/dashboard/memory/` — interfaċċa tal-Istudio (paġna + komponenti +
    tabs + hooks)
  - `open-sse/handlers/chatCore.ts` (konnessjonijiet tal-injezzjoni / estrazzjoni)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Għażla ta' Fornitur tal-Embeddings (v3.8.16+)

Il-magna tal-memorja ta' OmniRoute tappoġġja **erba' sorsi tal-embeddings** (`src/lib/memory/embedding/`). Kull wieħed għandu kompromessi differenti fil-**latenza, spiża, kwalità tal-mudell, u kumplessità tal-konfigurazzjoni**.

### Is-Sorsi tal-Embeddings

| Fornitur       | Sors                                             | Latenza                                               | Spiża                | Kwalità                                                    | Konfigurazzjoni                                    |
| -------------- | ------------------------------------------------ | ----------------------------------------------------- | -------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| `transformers` | Mudell ONNX lokali (Xenova/all-MiniLM-L6-v2)     | ~50-150ms (CPU)                                       | Bla ħlas             | Tajba                                                      | `npm install` biss                                 |
| `static`       | Vetturi kkalkulati minn qabel (fil-cache)        | <1ms                                                  | Bla ħlas             | Mhux applikabbli (tiddependi minn jekk tinstabx fil-cache) | Xejn                                               |
| `remote`       | API ta' OpenAI / Cohere / Voyage                 | ~100-300ms                                            | $0.02-0.10/1M tokens | Eċċellenti                                                 | Ċavetta tal-API                                    |
| `auto`         | Jagħżel l-aħjar sors disponibbli waqt it-tħaddim | L-istess bħas-sors magħżul                            | Bla ħlas             | L-istess bħas-sors magħżul                                 | Xejn                                               |
| _(cache)_      | Saff LRU fil-memorja fuq kwalunkwe sors          | <1ms (jekk tinstab), latenza sħiħa (jekk ma tinstabx) | Bla ħlas             | L-istess bħas-sors sottostanti                             | Dejjem mixgħul (mhuwiex sors li jista' jintgħażel) |

### Siġra tad-Deċiżjonijiet

```
                  X'inhu l-kuntest tal-iskjerament tiegħek?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ŻVILUPP/TEST PROD ŻGĦIR  PROD KBIR     EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (bla ħlas, bla API)       (l-aħjar kwalità) (bla internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            DEJJEM żid saff `cache` fuq nett
            (`LruCache` jinkapsula kwalunkwe fornitur)
```

### Konfigurazzjoni tad-Database u tal-API

L-għażliet tal-embeddings tal-memorja jiġu kkonfigurati permezz tal-API/interfaċċa tal-issettjar, mhux permezz tal-varjabbli tal-ambjent. Iċ-ċwievet rilevanti tad-database tal-issettjar taħt Settings (`normalizeMemorySettings` f'`src/lib/memory/settings.ts`) huma:

- `memoryEmbeddingSource`: `"transformers"` (lokali), `"remote"` (ibbażat fuq API, eż. OpenAI), `"static"` (ħażna esterna), jew `"auto"`
- `memoryEmbeddingProviderModel`: Identifikatur tal-mudell għal sorsi remoti/statiċi (eż., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, jew `"auto"`

#### Mudell Lokali (`transformers`)

Juża transformers.js internament biex iħaddem mudelli lokali:

```bash
# Varjabbli tal-ambjent moqrija fil-kodiċi (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repożitorju tal-mudell HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Mudell potion statiku HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Direttorju tal-cache
```

#### Cache LRU tal-Embeddings

Il-cache tkun dejjem mixgħula b'mod awtomatiku u tiġi kkonfigurata permezz tal-varjabbli tal-ambjent:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Għadd massimu ta' elementi fil-cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 minuti)
```

### Ċifri tal-Prestazzjoni

Test ta' prestazzjoni fuq server x86 tipiku b'4 cores (testi ta' madwar 100 token kull wieħed):

| Fornitur             | p50   | p95   | p99   | Spiża / 1M embeddings              |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Bla ħlas                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Tiddependi mill-hosting ta' Qdrant |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Bla ħlas                           |

---

## Mudelli għall-Estrazzjoni tal-Fatti (v3.8.16+)

Il-modulu `extraction.ts` (`src/lib/memory/extraction.ts`) juża **tqabbil ta’ mudelli b’espressjonijiet regolari** biex joħroġ fatti strutturati mill-messaġġi tal-konverżazzjonijiet. Il-fehim ta’ dawn il-mudelli jgħinek tirfina l-kwalità tal-estrazzjoni għall-każ tal-użu tiegħek.

### Kategoriji tal-Mudelli Predefiniti

| Kategorija          | Eżempju ta’ mudell                                      | X’jaqbad                            |
| ------------------- | ------------------------------------------------------- | ----------------------------------- |
| PREFERENCE_PATTERNS | `"Nippreferi <X>"`, `"Jogħġobni <X>"`, `"Nobgħod <X>"`  | Preferenzi tal-utent                |
| DECISION_PATTERNS   | `"Se nuża <X>"`, `"Iddeċidejt li <X>"`, `"Għażilt <X>"` | Deċiżjonijiet tal-utent (episodiċi) |
| PATTERN_PATTERNS    | `"Normalment <X>"`, `"Dejjem <X>"`, `"Qatt ma <X>"`     | Mudelli persistenti ta’ mġiba       |

### Eżempji ta’ Mudelli (Issimplifikati)

```ts
// Minn src/lib/memory/extraction.ts
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

### X’Jiġi Estratt

Meta utent jgħid:

> "Nippreferi TypeScript. Se nuża Postgres għal dan il-proġett. Dejjem nagħmel commit qabel ma nagħmel push. Python ma jogħġobnix."
> L-estrazzjoni tipproduċi 4 memorji:
>
> | Ċavetta                              | Kategorija | Tip       | Kontenut                       |
> | ------------------------------------ | ---------- | --------- | ------------------------------ |
> | `preference:typescript`              | preferenza | fattwali  | "TypeScript"                   |
> | `decision:postgres_for_this_project` | deċiżjoni  | episodiku | "Postgres għal dan il-proġett" |
> | `pattern:commit_before_pushing`      | mudell     | fattwali  | "commit qabel push"            |
> | `preference:python`                  | preferenza | fattwali  | "Python"                       |

### Limiti tal-Estrazzjoni

Biex tiġi evitata estrazzjoni bla kontroll, japplikaw il-limiti li ġejjin:

| Tul minimu tal-kontenut | 3 karattri |
| Tul massimu tal-kontenut | 500 karattru |

### Meta Għandek Tiddiżattiva l-Estrazzjoni

L-estrazzjoni titħaddem awtomatikament kull meta l-memorja tkun attivata; ma hemm l-ebda
swiċċ separat għall-estrazzjoni biss. Biex titfiha, iddiżattiva l-memorja kompletament (`enabled: false`
permezz ta’ `PUT /api/settings/memory`). Ikkunsidra li tagħmel dan meta:

- Għandek volum għoli ta’ messaġġi u l-ispiża tal-estrazzjoni mhijiex negliġibbli
- Il-konverżazzjonijiet tiegħek huma fil-biċċa l-kbira temporanji (chat, debugging) mingħajr valur fit-tul
- Diġà qed taqbad il-kuntest permezz ta’ plugins personalizzati

---

## Irfinar tal-RRF Ibridu (v3.8.16+)

L-algoritmu **Reciprocal Rank Fusion (RRF)** jgħaqqad ir-riżultati ta’ FTS5 (kelma ewlenija) u dawk vettorjali (semantiċi). Il-parametru `k` jikkontrolla kemm jingħata piż lir-riżultati kklassifikati aktar ’l isfel.

### Il-Formula

Għal kull memorja kandidata, il-punteġġ RRF huwa:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Fejn:

- `k` hija l-kostanti (il-valur predefinit huwa 60)
- `rank_i(d)` hija l-klassifikazzjoni tad-dokument `d` fis-sistema ta’ rkupru i (FTS, vettur)
- Is-somma ssir fuq is-sistemi kollha ta’ rkupru

### Kif `k` Taffettwa r-Riżultati

| Valur ta’ `k`           | Effett                                                                                                  | L-aktar adattat għal                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `k=0`                   | Fużjoni pura tal-klassifikazzjoni (mingħajr twittija)                                                   | Linja bażi teoretika                               |
| `k=10-30`               | Jagħti piż kbir lill-aqwa riżultati, filwaqt li klassifikazzjonijiet baxxi ftit li xejn jikkontribwixxu | Meta l-ewwel 3 riżultati normalment ikunu korretti |
| **`k=60`** (predefinit) | Ibbilanċjat — l-ewwel 10 riżultati kollha jikkontribwixxu b’mod sinifikanti                             | Irkupru għal skopijiet ġenerali                    |
| `k=100+`                | Aktar ċatt — anke riżultati kklassifikati baxxi jistgħu jiddominaw jekk jidhru f’diversi sistemi        | Meta l-kompletezza > il-preċiżjoni tkun kritika    |

### Irfinar ta’ `k` fil-Prattika

```bash
# Valur predefinit
MEMORY_RRF_K=60

# Preċiżjoni aggressiva (memorja żgħira, ftit dokumenti)
MEMORY_RRF_K=20

# Kompletezza massima (memorja kbira, mistoqsijiet varjati)
MEMORY_RRF_K=120
```

**Eżempju b’`k=20`:**

- Klassifikazzjoni FTS 1 → kontribuzzjoni `1/21 = 0.048`
- Klassifikazzjoni FTS 10 → kontribuzzjoni `1/30 = 0.033`
- Klassifikazzjoni vettorjali 1 → kontribuzzjoni `0.048`
- Massimu kkombinat: `0.096`

**Eżempju b’`k=60`:**

- Klassifikazzjoni FTS 1 → kontribuzzjoni `1/61 = 0.016`
- Klassifikazzjoni FTS 10 → kontribuzzjoni `1/70 = 0.014`
- Klassifikazzjoni vettorjali 1 → kontribuzzjoni `0.016`
- Massimu kkombinat: `0.033`

B’`k` ogħla, id-**differenza relattiva** bejn l-ewwel riżultat u dak fil-klassifikazzjoni 10 tkun iżgħar, għalhekk l-algoritmu jiddependi aktar fuq **kunsens bejn is-sistemi ta’ rkupru** milli fuq il-fiduċja fl-ogħla klassifikazzjoni.

### Meta Għandek Tibdel `k`

| Sintomu                                                 | Ipprova                                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| L-ewwel riżultat dejjem jirbaħ, iżda jkun żbaljat       | **Baxxi** k (eż., 20) — il-fiduċja fl-ogħla klassifikazzjoni tkun aktar importanti |
| It-tweġiba t-tajba tinsab fl-ewwel 5 iżda mhux l-ewwel  | **Għolli** k (eż., 100) — punteġġ aktar ċatt jippremja l-kunsens                   |
| Il-kompletezza hija għolja iżda l-preċiżjoni hija baxxa | **Baxxi** k — agħmel il-klassifikazzjoni aktar selettiva                           |
| Il-kompletezza hija baxxa (dokumenti rilevanti neqsin)  | **Għolli** k — agħti opportunità lid-dokumenti kklassifikati aktar ’l isfel        |

### Peżar tal-RRF

Il-fużjoni reċiproka tal-klassifikazzjoni tuża piżijiet indaqs għall-klassifikazzjoni vettorjali semantika u għall-klassifikazzjoni tat-tiftix fit-test sħiħ:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Ma hemm l-ebda varjabbli tal-ambjent biex jiġu aġġustati l-piżijiet individwali (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ma jeżistux).

---

## Strateġija tas-Sommarizzazzjoni (v3.8.16+)

Il-modulu `summarization.ts` (`src/lib/memory/summarization.ts`) jikkompressa memorji eqdem biex iżomm is-sett attiv żgħir filwaqt li jippreserva l-kapaċità ta’ tfakkir.

### Meta Tiġi Attivata s-Sommarizzazzjoni

| Attivatur                   | Limitu (predefinit) |
| --------------------------- | ------------------- |
| Attivazzjoni manwali bl-API | mhux applikabbli    |

### X’Jiġi Sommarizzat

Żewġ punti tad-dħul jiġu esportati minn `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — jikkondensa l-
  memorji għal sessjoni f’test wieħed ta’ sommarju limitat minn baġit ta’ tokens.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — il-kompattazzjoni
  bbażata fuq l-età użata mill-API: tagħżel kull memorja eqdem minn `days`, tibni
  minnhom memorja waħda b’sommarju kkondensat, u (meta `dryRun` ikun `false`) tħassar
  l-oriġinali. Għaddi `dryRun: true` biex tipprevedi s-sett kandidat u t-total ta’
  tokens mingħajr ma timmodifika xejn.

Ma hemm ebda pass ta’ raggruppament skont tag/key jew valutazzjoni għal kull memorja ta’ “core vs summarizable” —
l-għażla hija bbażata biss fuq il-limitu tal-età, u t-test tas-sommarju huwa linja kkondensata,
bi prefiss tat-tip, għal kull kandidat.

### Attivazzjoni tas-Sommarizzazzjoni

Is-sommarizzazzjoni hija **manwali / fuq għażla** — is-setting `autoSummarize` huwa `false`
b’mod predefinit, għalhekk xejn ma jiġi kkumpattat awtomatikament. Attivaha permezz tal-API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Biex tħalliha mitfija, sempliċement żomm `autoSummarize` fil-valur predefinit tiegħu (`false`).

### Suġġerimenti għall-Kwalità tas-Sommarizzazzjoni

- **Ipprevedi l-ewwel b’`dryRun`** — `summarizeMemoriesOlderThan(..., true)` tirritorna
  l-lista tal-kandidati u l-għadd totali ta’ tokens sabiex tkun tista’ tikkonferma x’jiġi amalgamat
  qabel ma tħassar l-oriġinali.
- **Ħaddem is-sommarizzazzjoni matul sigħat bi ftit traffiku** jekk għandek korpus kbir ta’ memorji — is-sejħa lill-LLM hija l-parti li tieħu l-aktar ħin

```bash
# Stil Cron: issommarizza kuljum fit-3am
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Mudell ta’ Fornitur MemoryBackend

> **Sors definittiv:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testijiet:** `src/lib/memory/__tests__/generic-backend.test.ts`

Il-mudell ta’ fornitur MemoryBackend jintroduċi **saff ta’ astrazzjoni tal-backend li jista’ jinbidel** fuq il-magna eżistenti tal-memorja. Minflok ma tkun marbuta ma’ implimentazzjoni waħda tal-ħażna, is-sistema tal-memorja issa tappoġġja diversi backends (SQLite, Obsidian, Notion, backends HTTP personalizzati) b’routing konfigurabbli primarju/ta’ riżerva.

### Arkitettura

```
┌──────────────────────────────────────────────────────────┐
│                    Rotot tal-API                          │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orkestratur Singleton (manager.ts)                  │
│                                                          │
│  Primarju ──► Backend A  (eż. SQLite)                    │
│  Riżerva  ──► Backend B  (eż. Obsidian)                  │
│               Backend C  (eż. Notion permezz ta’ GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend          │
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interfaċċa Ewlenija (`backend.ts`)

Kull backend irid jimplimenta l-interfaċċa `MemoryBackend`:

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

  // Tiftix
  search(config: SearchConfig): Promise<Memory[]>;

  // Stat tas-sistema
  health(): Promise<HealthCheckResult>;

  // Ċiklu tal-ħajja (fakultattiv)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orkestratur Singleton li:

- **Jirreġistra** backends permezz ta’ `register(backend)` — jissejjaħ waqt l-istartjar minn `index.ts`
- **Jikkonfigura** il-backend primarju u dawk ta’ riżerva permezz ta’ `configure(primary, fallbacks)`
- **Jidderieġi** CRUD/tiftix lejn il-backend primarju, b’katina ta’ riżerva f’każ ta’ ħsara
- **Jiċċekkja l-istat tas-sistema** tal-backends kollha perjodikament

**Imġiba tar-riżerva:**

| Operazzjoni | Primarju                      | Riżervi                           |
| ----------- | ----------------------------- | --------------------------------- |
| `create`    | ✅ Primarju biss              | ❌                                |
| `get`       | ✅ Ipprova l-primarju l-ewwel | ✅ Riżerva jekk ikun null         |
| `update`    | ✅ Primarju biss              | ✅ Sinkronizzazzjoni bla stennija |
| `delete`    | ✅ Primarju biss              | ✅ Sinkronizzazzjoni bla stennija |
| `list`      | ✅ Primarju biss              | ❌                                |
| `search`    | ✅ Primarju l-ewwel           | ✅ Riżerva f’każ ta’ żball        |

#### GenericMemoryBackend (`genericBackend.ts`)

Konnettur HTTP ġeneriku li jadatta kwalunkwe REST API għal MemoryBackend. Utli għal:

- **Notion** — qabbad permezz tan-Notion API
- **Obsidian** — qabbad permezz tal-Obsidian Local REST API
- **Backends personalizzati** — kwalunkwe servizz li jesponi API RESTful tal-memorja

**Konfigurazzjoni:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL bażi tal-API tal-backend
  apiKey?: string;           // Token Bearer għall-awtentikazzjoni
  headers?: Record<string, string>;  // Headers HTTP personalizzati
  timeout?: number;          // Timeout tat-talba (default: 30000ms)
  backendType?: string;      // Għal-logging

  // Override tal-endpoints (id-defaults jużaw il-konvenzjonijiet REST)
  endpoints?: {
    search?: string;   // default: "/memories/search"
    create?: string;   // default: "/memories"
    list?: string;     // default: "/memories"
    get?: string;      // default: "/memories/{id}"
    update?: string;   // default: "/memories/{id}"
    delete?: string;   // default: "/memories/{id}"
    health?: string;   // default: "/health"
  };

  // Mappings tal-ismijiet tal-parametri tal-query
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mappings tal-ismijiet tal-parametri tal-path
  pathParams?: {
    id?/memoryId?
  };
}
```

**Backends magħrufa** huma kkonfigurati minn qabel f'`KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend immirat lejn localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend immirat lejn api.notion.com/v1
```

#### Backends Inkorporati

##### SQLiteBackend (`sqliteBackend.ts`)

Il-backend primarju default. Jinkapsula l-ħażna tal-memorja eżistenti bbażata fuq SQLite billi juża `src/lib/memory/store.ts`. Jiġi rreġistrat awtomatikament waqt l-istartjar.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Jinkapsula l-integrazzjoni eżistenti ma' Obsidian (`src/lib/memory/obsidianBackend.ts`). Jikkonnettja ma' vault ta' Obsidian permezz tal-Obsidian Local REST API.

### Settings

Is-settings tal-backend tal-memorja jinħażnu fit-tabella tas-settings tal-app u jiġu ġestiti permezz ta' `src/lib/memory/settings.ts`:

| Setting                          | Ċavetta tal-Env/Konfigurazzjoni | Default    | Deskrizzjoni                                   |
| -------------------------------- | ------------------------------- | ---------- | ---------------------------------------------- |
| Backend primarju                 | `memoryPrimaryBackend`          | `"sqlite"` | ID tal-backend primarju                        |
| Backends ta' fallback            | `memoryFallbackBackends`        | `[]`       | IDs ordnati tal-backends ta' fallback          |
| Konfigurazzjonijiet tal-backends | `memoryBackendConfigs`          | `{}`       | Override tal-konfigurazzjoni għal kull backend |

Is-settings jiġu normalizzati permezz ta' `normalizeMemorySettings()` u jinżammu fil-cache f'`getMemorySettings()`.

### Fluss tal-Inizjalizzazzjoni

```
Bootstrap tal-app
  → imports ta' index.ts (effett sekondarju): jirreġistraw SQLiteBackend
  → initMemoryBackends() tissejjaħ miċ-ċiklu tal-ħajja tal-app:
      1. Tella' s-settings (getMemorySettings)
      2. Ikkonfigura l-backend primarju + il-fallback
      3. Inizjalizza l-backends kollha (kontroll tas-saħħa)
      4. Lest għat-talbiet
```

### Żieda ta' Backend Ġdid

1. **Implimenta l-interface `MemoryBackend`** f'`src/lib/memory/<name>Backend.ts`
2. **Esporta** minn `src/lib/memory/index.ts`
3. **Irreġistra** b'`memoryManager.register(yourBackend)` waqt l-istartjar
4. **Ikkonfigura** permezz tas-settings: issettja `memoryPrimaryBackend` għall-ID tal-backend tiegħek
5. **Ittestja** billi tuża `src/lib/memory/__tests__/generic-backend.test.ts` bħala referenza

#### Eżempju: Brain Backend

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

### Verifika

#### Testijiet tal-unità

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Output mistenni: **35 test, kollha jgħaddu** li jkopru:

- Kostruttur (2)
- Kontroll tas-saħħa (4) — suċċess, falliment 500, żball tan-network, latenza
- Inizjalizzazzjoni (2) — suċċess, falliment
- Ħolqien (2) — endpoint default, endpoint personalizzat
- Kisba (4) — suċċess, 404 → null, non-404 jitfa' eċċezzjoni, parametri tal-path personalizzati
- Aġġornament (2) — suċċess, 404 → false
- Tħassir (2) — suċċess, 404 → false
- Elenkar (2) — parametri tal-query, ismijiet tal-parametri personalizzati
- Tfittxija (3) — parametri tal-query, endpoint personalizzat, serializzazzjoni tal-options
- Headers tal-awtentikazzjoni (2) — token Bearer, headers personalizzati
- Factory (1)

#### Kontroll tat-tipi

```bash
npm run typecheck:core
```

Mistenni: **0 żbalji**.
