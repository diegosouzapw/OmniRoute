# Memory System (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Orísun òtítọ́:** `src/lib/memory/` àti `src/app/api/memory/`
> **Ìmúdójúìwọ̀n tó kẹ́yìn:** 2026-06-28 — v3.8.40 (pípa-nípa-àìyàn + ìmúdójúìwọ̀n quantization int8)

OmniRoute ń pèsè ìrántí ìbánisọ̀rọ̀ tó wà pẹ́ títí, tí a dá lórí kọ́kọ́rọ́ API (àti
id session bí ó bá yẹ). A máa ń yọ àwọn ìrántí jáde láìfọwọ́ṣe láti inú àwọn ìdáhùn LLM
nípasẹ̀ ìbámu àpẹẹrẹ regex fẹ́ẹ́rẹ́, a sì máa ń fi wọ́n padà sínú àwọn
ìbéèrè tó tẹ̀ lé gẹ́gẹ́ bí ìfiránṣẹ́ system àkọ́kọ́ (tàbí ìfiránṣẹ́ user àkọ́kọ́ fún àwọn olùpèsè tó
kọ ipa system).

> **Memory wà ní PÍPA ní àìyàn (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ti di `false` báyìí (`src/lib/memory/settings.ts`). Ṣíṣí memory máa ń fi tó
> `maxTokens` (~2k) ti àyíká-ọ̀rọ̀ tí a gba padà sínú **gbogbo** ìbéèrè chat, èyí tí
> a máa gba owó rẹ̀ — iye owó tí a kò retí fún àwọn fifi-sórí tuntun àti fún àwọn client tó ń ṣàkóso
> àyíká-ọ̀rọ̀ tiwọn. Yan láti darapọ̀ ní kedere lábẹ́ **Settings → Memory** (`MemorySkillsTab`
> máa ń ṣàfihàn ìkìlọ̀ iye owó token nígbà tí memory bá wà ní ṣíṣí).
> Client kan lè yọ ìbéèrè kan ṣoṣo kúrò nípasẹ̀ header ìbéèrè `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — wo tábìlì header ìbéèrè nínú
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Ìbéèrè tí kò lo memory máa ń ṣètò
> `memoryOwnerId = null`, èyí tó máa pa ìfibọ̀ **memory àti skill méjèèjì** fún
> ìbéèrè náà (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

A máa ń **pín Memory sí ìwọ̀n kọ́kọ́rọ́ API kọ̀ọ̀kan**, kì í ṣe sí ìwọ̀n user kọ̀ọ̀kan — gbogbo ìbéèrè tí a fìdí
rẹ̀ múlẹ̀ pẹ̀lú kọ́kọ́rọ́ API kan náà máa ń pín ibi ìkójọpọ̀ memory kan náà, pẹ̀lú àṣàyàn láti tún
pín rẹ̀ sí ìwọ̀n kékeré sí i nípasẹ̀ `sessionId`.

## Àgbékalẹ̀

```
Client → /v1/chat/completions (apiKeyInfo tí a ti yanjú ní ìpele òkè)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # ń yọ id jáde
    → getMemorySettings()                     # àwọn ààtò tí a fi pamọ́ sínú cache
    → shouldInjectMemory(body, {enabled})     # ẹnu-ọ̀nà ìṣàkóso
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector àṣàyàn
    → injectMemory(body, memories, provider)  # ìfiránṣẹ́ system tàbí user
  → ìpè sí olùpèsè upstream
  → lórí ìdáhùn: extractFacts(text, apiKeyId, sessionId)  # kì í dá iṣẹ́ dúró
    → setImmediate → createMemory(fact) fún ìbámu kọ̀ọ̀kan
                   → embed(content) + upsertVector(id, vec)
```

Àwọn ibi ìpè fún ìfibọ̀ àti ìyọjáde ni a ti so pọ̀ sínú
`open-sse/handlers/chatCore.ts` (wá `retrieveMemories`, `injectMemory`,
àti `extractFacts`).

## Àgbékalẹ̀ engine (ìyànjú onípele 3)

Memory Engine máa ń yan ọ̀nà ìgbàpadà ní àkókò ìṣiṣẹ́ gẹ́gẹ́ bí
amúṣètò tó wà àti àwọn ààtò. Àwọn ipele mẹ́ta ló wà, tí a sì ń lò wọ́n ní ìtẹ̀lé ààyò:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  IPELE 0 — Ọ̀rọ̀-ìṣàwárí (FTS5)                              │
  │  Wíwà tó dá lórí àyẹ̀wò: FTS5 nígbà tí build SQLite bá      │
  │  ṣe àtìlẹ́yìn fún un (better-sqlite3 / node:sqlite / bun:sqlite); │
  │  kò sí lórí àwọn build tí kò ní FTS5 (fún àpẹẹrẹ sql.js/WASM — │
  │  "no such module: fts5"). A lò ó nígbà tí strategy = "exact" tàbí │
  │  gẹ́gẹ́ bí fallback; keyword engine-status ń ṣàfihàn àyẹ̀wò náà. │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  IPELE 1 — Vector Inú-Ẹ̀rọ (sqlite-vec)                      │
  │  A gbé sqlite-vec v0.1.9 wọlé nípasẹ̀ db.loadExtension().    │
  │  Ìṣàwárí KNN brute-force lórí àwọn vector Float32. Ó ń ṣiṣẹ́ nígbà tí: │
  │   • sqlite-vec loadExtension bá ṣàṣeyọrí                     │
  │   • Orísun embedding kan bá wà (remote | static |            │
  │     transformers) tó lè ṣe Float32Array                      │
  │   • tábìlì vec_memories bá wà (a dá a ní ready() àkọ́kọ́)    │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  IPELE 2 — Qdrant (database vector òde tí a yàn láti lò)     │
  │  Nígbà tí a bá ṣí i, ó máa rọ́pò sqlite-vec fún semantic/hybrid. │
  │  Ó nílò instance Qdrant tó ń ṣiṣẹ́ + host/port tí a ti ṣètò. │
  └─────────────────────────────────────────────────────────────┘
```

Ìdínkù agbára máa ń ṣẹlẹ̀ láìfọwọ́ṣe àti ní kedere:

- Bí sqlite-vec bá kùnà láti wọlé, ipele 1 kò ní sí → yóò padà sí ipele 0.
- Bí orísun embedding bá dá error padà, ipele 1 yóò padà sí ipele 0.
- Bí Qdrant kò bá ní ìlera, ipele 2 yóò padà sí ipele 1 (tàbí ipele 0 bí ipele 1
  náà kò bá sí).

## Àwọn orísun embedding

Ìpele embedding (`src/lib/memory/embedding/`) ń pinnu orísun tí a ó lò
ní ìbámu pẹ̀lú `MemorySettingsExtended.embeddingSource`:

| Orísun         | Àpèjúwe                                                                             | Bọ́tìnì nílò     | Ìbẹ̀rẹ̀ tútù       |
| -------------- | ----------------------------------------------------------------------------------- | --------------- | ---------------- |
| `remote`       | Ń lo API embedding ti olùpèsè tí a ti ṣètò (OpenAI, Cohere, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)         | Bẹ́ẹ̀ ni          | Kò sí            |
| `static`       | Embedding tábìlì ìṣàwárí agbègbè nípasẹ̀ `potion-base-8M` (WordPiece + mean pooling) | Rárá            | ~200ms           |
| `transformers` | Ìṣirò ONNX agbègbè nípasẹ̀ `@huggingface/transformers` v4, `all-MiniLM-L6-v2`        | Rárá            | ~3s + ~400MB RAM |
| `auto`         | Ìpinnu ní àsìkò ìṣiṣẹ́: remote (bí bọ́tìnì bá wà) → static → transformers → null      | Ó sinmi lórí rẹ̀ | Ó sinmi lórí rẹ̀  |

**Ètò ìpinnu fún `auto`:**

1. Wá olùpèsè àkọ́kọ́ nínú `listEmbeddingProviders()` tí `hasKey === true` → `remote`.
2. Bí `settings.staticEnabled === true` → `static`.
3. Bí `settings.transformersEnabled === true` → `transformers`.
4. Bí bẹ́ẹ̀ kọ́ → `null` (ó dín kù sí ìṣàwárí ọ̀rọ̀-kókó FTS5).

Kaṣe embedding (`src/lib/memory/embedding/cache.ts`) ń lo máàpù LRU inú ìrántí
tí kọ́kọ́rọ́ rẹ̀ jẹ́ `${source}:${model}:${dim}:${sha256(text)}`, tí a fi òpin sí
àwọn àkọsílẹ̀ `MEMORY_EMBEDDING_CACHE_MAX` (àìyípadà 1000), pẹ̀lú TTL ti
`MEMORY_EMBEDDING_CACHE_TTL_MS` (àìyípadà ìṣẹ́jú 5). Gbogbo àwọn olùpè ń pín in
láàárín ìgbésí-ayé process kọ̀ọ̀kan.

## Hybrid RRF (k=60)

Nígbà tí `strategy = "hybrid"` tí ibi ìpamọ́ vector sì wà, ìmúpadàbọ̀ ń lo
Reciprocal Rank Fusion láti darapọ̀ àwọn àbájáde FTS5 àti vector:

```
RRF(d) = Σ  1 / (k + rank_i(d))      where k = 60 (configurable via MEMORY_RRF_K)
          i
```

Ní pàtó:

1. Ṣiṣe ìṣàwárí FTS5 → àtòjọ tí a tò ní ipò `R_fts` (ipò 1..N).
2. Ṣiṣe ìṣàwárí vector KNN → àtòjọ tí a tò ní ipò `R_vec` (ipò 1..M).
3. Fún `memoryId` aláìlẹ́gbẹ́ kọ̀ọ̀kan:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 bí kò bá sí nínú àtòjọ).
4. Tò nípasẹ̀ `rrf_score` DESC, kí o sì lo ìrìn ìnáwó token.

A mọ̀ RRF dáadáa pé ó munadoko láìní láti ṣe ìṣọ̀kan àwọn àmì láàárín
àwọn ètò ìmúpadàbọ̀ oríṣiríṣi. `k=60` àìyípadà náà wá láti inú ìwé ìwádìí
àkọ́kọ́ ti Cormack et al., ó sì ń ṣiṣẹ́ dáadáa fún àkójọpọ̀ kékeré (<10k àwọn ìrántí).

## Ìkúnpadà (lazy + reindex)

Nígbà tí àwòṣe embedding bá yí padà (tí a ṣàwárí nípasẹ̀ `embedding_signature`),
a tún ibi ìpamọ́ vector kọ́, a sì samisi gbogbo àwọn ìrántí tó ti wà pẹ̀lú
`needs_reindex = 1` nínú tábìlì `memories`.

**Ìkúnpadà lazy**: Ní ìmúpadàbọ̀ tó kàn, ìrántí èyíkéyìí tí kò ní àkọsílẹ̀ vector
ni a ó ṣe embedding fún, tí a ó sì fi sínú `vec_memories` kí ìṣàwárí tó bẹ̀rẹ̀.
Èyí ń pín iye owó ìkúnpadà káàkiri àwọn ìbéèrè gidi láìdènà ìbẹ̀rẹ̀.

**Reindex ní tààrà**: Táàbù Engine nínú `/dashboard/memory` ní bọ́tìnì
"Ṣe Reindex Nísinsìnyí" tí ń pe `POST /api/memory/reindex`. Olùdarí náà ń pe
`runReindexBatch()` láti `src/lib/memory/reindex.ts`, èyí tí ń ṣiṣẹ́ lórí
títí dé àwọn àkọsílẹ̀ `limit` tó ń dúró fún ìbéèrè kọ̀ọ̀kan. A lè máa ṣàyẹ̀wò ìlọsíwájú nípasẹ̀
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tábìlì `memory_vec_meta` (migration `083_memory_vec.sql`) ń tọ́jú:

- `active_dim` — ìwọ̀n vector lọ́wọ́lọ́wọ́ (null = a kò tíì ṣe àwọ̀n rẹ̀).
- `embedding_signature` — `${source}:${model}:${dim}` tí a ń lò láti ṣàwárí àwọn ìyípadà.
- `last_reset_at` — àmì-àkókò àtúnṣètò kíkún tó ṣẹ̀ṣẹ̀ wáyé.
- `vec_loaded` — àsíá 0/1 tó ń fi hàn bóyá sqlite-vec ti ṣíṣe ìrùsókè ní àṣeyọrí.

## Ìmúgbòòrò àwọn ètò

Àwọn pápá embedding àti vector mẹ́sàn-án wà nínú `MemorySettingsExtended` ní
`src/shared/schemas/memory.ts`, a sì ń tọ́jú wọn nípasẹ̀ `src/lib/db/settings.ts`:

| Pápá                     | Irú                                                | Àìyípadà | Àpèjúwe                                                |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Orísun embedding tí a ó lò                             |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Olùpèsè/model ní ìlànà `provider/model`                |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL ìpìlẹ̀ endpoint tó bá OpenAI mu fún Memory nìkan    |
| `customModelId`          | `string \| null`                                   | `null`   | ID model tí a fi ránṣẹ́ sí endpoint àdáni               |
| `transformersEnabled`    | `boolean`                                          | `false`  | Yíyàn láti lo Transformers.js (MiniLM, ~400MB)         |
| `staticEnabled`          | `boolean`                                          | `false`  | Yíyàn láti lo model àdúgbò static potion-base-8M       |
| `rerankEnabled`          | `boolean`                                          | `false`  | Mú ìgbésẹ̀ àtúntò ipò ṣiṣẹ́ (ó fi +200-500ms/req kún un) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Olùpèsè/model àtúntò ipò ní ìlànà `provider/model`     |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | Ẹ̀yìn-iṣẹ́ vector tí a ó lò                              |

A mú àwọn wọ̀nyí hàn nípasẹ̀ `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Fún orísun `remote`, Memory tún gba àwọn ètò `customBaseUrl` àti
`customModelId` tí kò pọn dandan. Ní àpapọ̀, wọ́n yan endpoint `/embeddings`
tó bá OpenAI mu àti model kan láìyí ìforúkọsílẹ̀ embedding àgbáyé padà. A máa ń
ṣe endpoint náà sí ọ̀nà ìṣọ̀kan kí a tó lò ó, a sì ń ṣàyẹ̀wò rẹ̀ pẹ̀lú ìlànà URL
àjùmọ̀ṣe jáde ti olùpèsè: HTTP(S) jẹ́ dandan, a kò gba àwọn ẹ̀rí ìdánimọ̀ tí a fi
sínú rẹ̀ tàbí àwọn query string, àwọn àdírẹ́sì metadata awọsánmà sì ṣì jẹ́ dídènà.
Àwọn iye òfo máa ń jẹ́ kí olùpèsè ìforúkọsílẹ̀ tí a yàn wà bí ó ti rí. A máa ń
wẹ àwọn àṣìṣe tí a dá padà sí dashboard mọ́, a kò sì ní kọ àwọn ẹ̀rí ìdánimọ̀
endpoint sínú log láé.

> **TODO (D20):** Scope `global` (pípín àwọn ìrántí káàkiri gbogbo àwọn API key) kò tíì
> jẹ́ mímúṣẹ nínú ìtújáde yìí. Ó nílò àwọn àyípadà schema àti ọ̀nà ìgbàpadà
> àgbáyé kan. Tọpinpin rẹ̀ lọ́tọ̀.

## Àwọn Ìpele Ìtọ́jú

### Àkọ́kọ́: SQLite (tábìlì `memories`)

Migration `015_create_memories.sql` ló ṣẹ̀dá rẹ̀:

| Column                      | Irú                | Àwọn àkíyèsí                                                           |
| --------------------------- | ------------------ | ---------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID tí a ṣẹ̀dá nípasẹ̀ `crypto.randomUUID()`                            |
| `api_key_id`                | `TEXT NOT NULL`    | API key tó ni ín                                                       |
| `session_id`                | `TEXT`             | Scope àṣàyàn fún ìjíròrò kọ̀ọ̀kan                                        |
| `type`                      | `TEXT NOT NULL`    | Ọ̀kan lára `factual`, `episodic`, `procedural`, `semantic`              |
| `key`                       | `TEXT`             | Key upsert tó dúró ṣinṣin, àpẹẹrẹ `preference:i_prefer_python`         |
| `content`                   | `TEXT NOT NULL`    | Ọ̀rọ̀ òtítọ́ gan-an                                                       |
| `metadata`                  | `TEXT`             | Ìdìpọ̀ JSON (category, extractedAt, source, ...)                        |
| `created_at` / `updated_at` | `TEXT`             | Àwọn string ISO 8601                                                   |
| `expires_at`                | `TEXT`             | Ìparí àkókò àṣàyàn; `NULL` túmọ̀ sí pé ó wà títí                        |
| `memory_id`                 | `INTEGER UNIQUE`   | `023_fix_memory_fts_uuid.sql` fi kún un láti so àwọn UUID ↔ FTS5 rowid |

Àwọn index: `api_key_id`, `session_id`, `type`, `expires_at`, pẹ̀lú index
`memory_id` aláìlẹ́gbẹ́.

**Ìwà upsert**: `createMemory()` máa ń wá row tó ti wà tẹ́lẹ̀ tó ní
`(api_key_id, key)` kan náà, ó sì máa ń ṣe ìmúdójúìwọ̀n rẹ̀ ní ibi tó wà nígbà tí
ó bá rí i (nípa pípọ̀ `metadata` pọ̀ pẹ̀lú shallow spread). Èyí ń dènà tábìlì
náà láti máa dàgbà láìlópin nítorí àwọn gbólóhùn ìfẹ́ràn tí a ń sọ léraléra.

### Ìṣàwárí Ọ̀rọ̀-kíkún (tábìlì virtual `memory_fts`)

`022_add_memory_fts5.sql` ṣẹ̀dá tábìlì virtual FTS5 lórí `content` àti
`key`. `023_fix_memory_fts_uuid.sql` tún àṣìṣe tó ṣẹlẹ̀ ní ayé gidi ṣe, níbi tí
primary key UUID kò ti darapọ̀ mọ́ rowid integer ti FTS5 — migration náà fi
column `memory_id` kún un, ó tún tábìlì FTS ṣẹ̀dá, ó sì so àwọn trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) tí ń jẹ́ kí FTS bá a mu nígbà
INSERT, DELETE, àti UPDATE.

`retrieval.ts` ń lò ó fún àwọn ọgbọ́n `semantic` àti `hybrid` (wo ìsàlẹ̀).
Kóòdù ìgbàpadà náà ń dáàbò bo ara rẹ̀ pẹ̀lú `hasTable("memory_fts")`, ó sì máa ń
padà sí ìtòlẹ́sẹẹsẹ àkókò bí tábìlì FTS kò bá sí tàbí bí query FTS bá ju àṣìṣe.

### Àṣàyàn: Qdrant (ipele 2 ibi ìtọ́jú vector)

`src/lib/memory/qdrant.ts` mú ìṣọ̀kan Qdrant àṣàyàn kan ṣiṣẹ́ gẹ́gẹ́ bí ibi
ìtọ́jú vector ipele 2. Ìgbàpadà máa ń darí sí Qdrant nìkan nígbà tí engine selector
`memoryVectorStore === "qdrant"` — àìyípadà `"auto"` (àti `"sqlite-vec"`)
**kì í** yan Qdrant láé. Toggle taabu Engine máa ń ṣètò **àwọn méjèèjì**
`qdrantEnabled` àti `memoryVectorStore` papọ̀: mímú un ṣiṣẹ́ máa ń sọ Qdrant di
ibi ìtọ́jú àkọ́kọ́, pípa á máa ń tún un padà sí `"auto"` (#5597 — ṣáájú àtúnṣe
yẹn, mímú un ṣiṣẹ́ kò ní ipa nítorí kò sí ohun tó ń kọ iye sí engine selector).
Bí Qdrant kò bá ṣeé dé tàbí kò dá nǹkan kan padà, ìgbàpadà máa ń padà sí
sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — fi àwòṣe embedding tí a ti ṣètò ṣe embedding `key + content`, rí i dájú pé collection náà wà (ó máa ṣẹ̀dá àwọn vector cosine-distance ní ìlò àkọ́kọ́), kí o sì ṣe upsert point kan pẹ̀lú payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — ṣe embedding query náà, wá nínú collection tí a ti ṣe filter rẹ̀ nípasẹ̀ `kind = "omniroute_memory"` àti, bí ó bá yẹ, nípasẹ̀ `apiKeyId` / `sessionId`. Ó fi ààlà sí `topK` láàárín `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — pa point kan ṣoṣo rẹ́. `deleteMemory()` máa ń pè é lẹ́yìn tí a bá ti yọ row SQLite náà kúrò (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — pa àwọn point lọ́pọ̀lọpọ̀ tí `expiresAtUnix` wọn ti kọjá tàbí tí `createdAtUnix` wọn ti ju àkókò ìdádúró tí a yàn lọ. Ó kọ́kọ́ ka iye wọn kí dashboard lè fi àwọn nọ́mbà gidi hàn.
- `checkQdrantHealth()` — ìdánwò ìlera `GET /readyz` pẹ̀lú latency.

UI àwọn ààtò ń fi config Qdrant, àyẹ̀wò ìlera, ìdánwò ìṣàwárí semantic,
àti cleanup hàn nínú **taabu Engine** ti `/dashboard/memory`. Gbogbo àwọn
route tó bá wọn mu lábẹ́ `src/app/api/settings/qdrant/` ni a ti so pọ̀ láti v3.8.6:

| Route                                   | Ọ̀nà           | Àpèjúwe                             |
| --------------------------------------- | ------------- | ----------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Ka / ṣe àfikún àwọn ààtò Qdrant     |
| `/api/settings/qdrant/health`           | `GET`         | Ìdánwò liveness + latency           |
| `/api/settings/qdrant/search`           | `POST`        | Ìdánwò ìṣàwárí semantic             |
| `/api/settings/qdrant/cleanup`          | `POST`        | Yọ àwọn point tó ti parí / ti pẹ́    |
| `/api/settings/qdrant/embedding-models` | `GET`         | Ṣe àkójọ àwọn àwòṣe embedding tó wà |

**Àwọn àkíyèsí nípa ìhùwàsí (ohun tí o lè retí):**

- **Yíyan engine** — mímú Qdrant ṣiṣẹ́ nínú taabu Engine máa ń sọ ọ́ di store àkọ́kọ́
  (ó ṣètò `memoryVectorStore="qdrant"`); pípa á padà máa ń tún un ṣètò sí `"auto"` (#5597).
- **Kò sí back-fill** — àwọn memory tí a ṣẹ̀dá/túnṣe **lẹ́yìn** tí a bá ti mú Qdrant ṣiṣẹ́ nìkan
  ni a máa kọ sí i (dual-write irú fire-and-forget). A **kì í** ṣí àwọn memory SQLite tó ti wà tẹ́lẹ̀
  lọ; "Reindex Now" máa ń tún index sqlite-vec nìkan kọ́, kì í ṣe Qdrant.
- **A máa ń ṣàwárí dimension vector fúnra rẹ̀** láti inú embedding gangan ní ìlò àkọ́kọ́ — kò sí
  field dimension kankan láti kún. Yíyí àwòṣe embedding padà lẹ́yìn tí collection kan bá ti
  wà ni a **kò** ṣàkóso fúnra rẹ̀: collection tó wà náà kò ní yí padà, àwọn ìkọ̀wé/ìṣàwárí tí
  dimension wọn kò bá mu yóò kùnà, wọn yóò sì padà lo sqlite-vec. Tún collection náà ṣẹ̀dá
  (orúkọ tuntun, tàbí pa á rẹ́ nínú Qdrant) láti yí embedder padà.
- **Ìwọ̀n distance** — **Cosine** nígbà gbogbo (a ti hardcode rẹ̀ nígbà ṣíṣẹ̀dá collection;
  kò ṣeé ṣètò).
- **Auth** — API key nìkan (a máa fi ránṣẹ́ gẹ́gẹ́ bí header `api-key`; ó jẹ́ àṣàyàn fún
  Docker àdúgbò tí kò ní ìfàṣẹsí). A kò lo JWT/RBAC.
- **Àwọn field config** — UI ń fi `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` hàn. `vectorSize` / `hnswEfConstruct` wà fún env/DB nìkan, a kò sì lo `vectorSize`
  fún ṣíṣẹ̀dá collection (dimension ń wá láti inú embedding).

### Quantization vector (int8 — àṣàyàn, àwọn backend méjèèjì)

Àwọn backend vector méjèèjì ṣe àtìlẹ́yìn fún **quantization int8 tí a lè yàn láti mú ṣiṣẹ́**
láti dín memory tí àwọn vector tí a fipamọ́ ń lò kù (~4× kéré ju Float32) pẹ̀lú ìdínkù kékeré
ní recall. Ní default, ó **wà ní pípa** lórí àwọn méjèèjì — àwọn vector máa dúró ní
full-precision àyàfi tí a bá mú un ṣiṣẹ́ ní kedere.

| Backend    | Ààtò                             | Irú                            | Default  | Ibi tí a ti kà á                                            |
| ---------- | -------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (kọ́kọ́rọ́ DB) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env)  | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ni a ṣètò fún instance kọ̀ọ̀kan nípasẹ̀ kọ́kọ́rọ́ ààtò `qdrantQuantization`
  (tí a fi hàn gẹ́gẹ́ bí field `quantization` lórí `PUT /api/settings/qdrant`). Nígbà tí
  ó jẹ́ `"int8"`, `buildQuantizationConfig()` máa ń béèrè fún scalar quantization
  (`always_ram`, quantile `0.99`), àwọn ìṣàwárí sì máa ń mú `rescore: true` ṣiṣẹ́ kí
  àwọn vector full-precision lè ṣàtúnṣe àkójọpọ̀ candidate int8 náà.
- Quantization **sqlite-vec** jẹ́ ti **environment nìkan** (kì í ṣe ààtò DB): ṣètò
  `MEMORY_VEC_QUANTIZATION=int8` láti fi àwọn vector àdúgbò pamọ́ gẹ́gẹ́ bí column `int8[dim]`
  nípasẹ̀ `vec_quantize_int8(?, 'unit')`. A máa fi mode tí a yàn sínú
  `embedding_signature` (suffix `:int8` kan), nítorí náà yíyí mode padà máa ń fa
  reindex kíkún ti table `vec_memories` — ipa ọ̀nà lazy-backfill kan náà tí a ń lò nígbà
  tí àwòṣe embedding bá yí padà.

## Àwọn Irú Ìrántí

`MemoryType` (`src/lib/memory/types.ts`):

| Irú          | Ohun tí a fi ń lò ó fún                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| `factual`    | Àwọn ààyò, àwọn òtítọ́ olùlò tí kò yí padà, àwọn àṣà ìhùwàsí                        |
| `episodic`   | Àwọn ìpinnu tó so mọ́ àkókò kan pàtó ("Mo yan Postgres")                            |
| `procedural` | Ìrántí ìṣàn-iṣẹ́ / bí a ṣe ń ṣe nǹkan (a fi pamọ́; kò sí olùyọjáde aládàáṣiṣẹ́ lónìí) |
| `semantic`   | A fi pamọ́ fún àwọn àkọsílẹ̀ ibi ìpamọ́ vector                                        |

Ọ̀nà ìgbàpadà `MemoryConfig` jẹ́ ọ̀kan lára `exact`, `semantic`, tàbí `hybrid`,
àti pé ààlà rẹ̀ jẹ́ ọ̀kan lára `session`, `apiKey`, tàbí `global`. Ààlà àiyipada láti
`getMemorySettings()` jẹ́ `apiKey`.

## Ìyọjáde Òtítọ́ (`extraction.ts`)

Ìyọjáde náà dá lórí **regex**, kì í ṣe lórí LLM — ó ń ṣiṣẹ́ nínú process náà pẹ̀lú
`setImmediate()` kí ó má bàa dá ìṣàn ìdáhùn dúró láéláé:

- **Àwọn àpẹẹrẹ ààyò** → `MemoryType.FACTUAL`
  (fún àpẹẹrẹ `Mo fẹ́ràn …`, `Mo fẹ́ràn … gan-an`, `èyí tí mo fẹ́ràn jù ni …`, `Mo kórìíra …`)
- **Àwọn àpẹẹrẹ ìpinnu** → `MemoryType.EPISODIC`
  (fún àpẹẹrẹ `Èmi yóò lo …`, `Mo yan …`, `Mo pinnu láti lo …`, `Èmi yóò bẹ̀rẹ̀ sí í lo …`)
- **Àwọn àpẹẹrẹ ìṣe déédéé** → `MemoryType.FACTUAL`
  (fún àpẹẹrẹ `Mo sábà máa ń …`, `Mo máa ń … ní gbogbo ìgbà`, `Mo ní àṣà láti …`)

A máa ń fọ gbogbo ohun tó bá bá mu mọ́ (`trim`, pípa àlàfo pọ̀, àti dídín in kù sí ohun tí kò ju àmì 500 lọ),
a sì máa ń yọ àwọn àdáwòkọ kúrò nínú batch náà nípasẹ̀ `factKey(category, content)` tí kò yí padà, lẹ́yìn náà
a máa ń fi pamọ́ nípasẹ̀ `createMemory()` pẹ̀lú metadata
`{category, extractedAt, source: "llm_response"}`. Ọ̀rọ̀ àwọlé ní ààlà
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — tí ó bá gùn ju bẹ́ẹ̀ lọ, **ìparí** ọ̀rọ̀ náà ni
a máa ń lò, kí àkóónú assistant tó ṣẹ̀ṣẹ̀ dé lè kópa ní gbogbo ìgbà.

A ṣe àgbéjáde `extractFactsFromText(text)` fún àwọn ìdánwò, ó sì ń dá àwọn òtítọ́
tí a ti ṣètò padà láìfi wọ́n pamọ́.

## Ìgbàpadà (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ni ojú-ọ̀nà àkọ́kọ́. Ó máa ń:

1. Ṣe config náà déédéé, ó sì fìdí rẹ̀ múlẹ̀ nípasẹ̀ `MemoryConfigSchema`.
2. Dá `[]` padà lẹ́sẹ̀kẹsẹ̀ nígbà tí `enabled` bá jẹ́ false tàbí `maxTokens <= 0`.
3. Dín `maxTokens` mọ́ àárín `[1, 8000]`.
4. Ṣàwárí bóyá tábìlì `memories` òde-òní wà (ní ìfiwéra pẹ̀lú tábìlì `memory`
   àtijọ́), kí àwọn database àtijọ́ lè máa ṣiṣẹ́ nìṣó.
5. Kọ query ìpìlẹ̀ pẹ̀lú ààbò ìparí-àkókò
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ààlà
   session àṣàyàn, àti ààlà gígé `retentionDays` àṣàyàn.
6. Pín sí ẹ̀ka gẹ́gẹ́ bí strategy:
   - **`exact`** (àiyipada): ní ìtẹ̀lé àkókò `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: tí `config.query` àti `memory_fts` bá wà, ṣe JOIN
     `memory_fts MATCH ?`, kí o sì to wọ́n gẹ́gẹ́ bí ipò FTS; padà sí ìtẹ̀lé àkókò
     nígbà tí FTS bá dá ìlà 0 padà.
   - **`hybrid`**: àpapọ̀ àwọn èsì FTS (ìbámu tó ga jù) àti àkójọpọ̀
     ìtẹ̀lé àkókò, pẹ̀lú yíyọ àwọn àdáwòkọ kúrò nípasẹ̀ id.
7. Ṣírò àmì ìbámu keyword (`getRelevanceScore`) lórí
   `content`, `key`, àti JSON `metadata` nígbà tí query bá wà. A máa ń yọ àwọn ìlà
   tí àmì wọn jẹ́ òdo kúrò.
8. To wọ́n gẹ́gẹ́ bí àmì láti èyí tó ga sí èyí tó kéré, lẹ́yìn náà gẹ́gẹ́ bí `createdAt` láti tuntun sí àtijọ́.
9. Lọ la àtòjọ tí a ti to kọjá, kí o sì gba àwọn àkọsílẹ̀ níwọ̀n ìgbà tí àpapọ̀
   `estimateTokens(content)` (≈ `length / 4`) kò bá kọjá ìwọ̀n tí a yàn. Ó máa ń
   dá ó kéré tán àkọsílẹ̀ kan padà ní gbogbo ìgbà tí ìbámu èyíkéyìí bá wà.

A ṣe àgbéjáde `estimateTokens`, a sì ń lò ó fún ìgbàpadà, ṣíṣe àkótán, àti irinṣẹ́ MCP
`omniroute_memory_search`.

## Ìfisí (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Ó so gbogbo àkóónú ìrántí pọ̀ sínú ọ̀rọ̀ kan ṣoṣo `Memory context: …`.
2. Ó yan ìlànà kan nípasẹ̀ orúkọ olùpèsè:
   - **Ifiranṣẹ́ ètò** (èyí ni àṣàyàn àkọ́kọ́ fún OpenAI, Anthropic, Gemini, …) — ó fi
     `{role: "system", content: memoryText}` síwájú gbogbo àwọn ifiranṣẹ́ ètò
     tó ti wà tẹ́lẹ̀, kí àwọn ìtọ́nisọ́nà ètò olùlò ṣì lè ní ipò àkọ́kọ́.
   - **Ifiranṣẹ́ olùlò** (àṣàyàn ìpadà) — fún àwọn olùpèsè inú
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Àwọn wọ̀nyí kọ ipa ètò
     yóò sì dá 400 padà bí kò bá rí bẹ́ẹ̀ (wo ìṣòro #1701 fún GLM/Zhipu).
3. Ó ṣe àkọsílẹ̀ iye, ìlànà, àti módẹ́ẹ̀lì lábẹ́ `memory.injection.injected`.

A ń gbé `providerSupportsSystemMessage(provider)` jáde fún àwọn olùpè tí wọ́n nílò
láti ṣe àwọn ìpinnu ìdarí tiwọn. Àwọn olùpèsè tí a kò mọ̀ máa ń lo `true`
(ipa ètò jẹ́ gbígbà láàyè) gẹ́gẹ́ bí àṣàyàn àkọ́kọ́ fún ààbò.

## Àwọn ètò (`settings.ts`)

A ń **tọju àtúnṣe ìrántí sínú tábìlì àwọn ètò DB**, kì í ṣe sínú àwọn oníyípadà àyíká.
`getMemorySettings()` máa ń kà láti `getSettings()` ó sì máa ń fi èsì náà pamọ́
sínú ìlànà tó ń ṣiṣẹ́; ipa ọ̀nà PUT ti àwọn ètò máa ń pe `invalidateMemorySettingsCache()`
lẹ́yìn àwọn ìkọ̀wé.

### Àwọn pápá àtijọ́ (gbogbo ẹ̀yà)

| Kọ́kọ́rọ́ DB             | Irú     | Àṣàyàn àkọ́kọ́                                                | Ìṣàkóso UI                                                  |
| --------------------- | ------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (ó ti wà ní pípa gẹ́gẹ́ bí àṣàyàn àkọ́kọ́ láti v3.8.30) | Ṣí/pa ìrántí                                                |
| `memoryMaxTokens`     | integer | `2000` (ààlà `0–16000`)                                     | Ìnáwó tókìn fún ìfisí                                       |
| `memoryRetentionDays` | integer | `30` (ààlà `1–365`)                                         | Àkókò ìtọ́jú                                                 |
| `memoryStrategy`      | enum    | `"hybrid"` (ọ̀kan nínú `recent`, `semantic`, `hybrid`)       | Ìlànà ìmúpadà                                               |
| `skillsEnabled`       | boolean | `false`                                                     | Ó ń ṣí tàbí pa ìfisí ọgbọ́n fún kọ́kọ́rọ́ kọ̀ọ̀kan (wo SKILLS.md) |

Àkíyèsí: ìlànà UI `"recent"` bá ìlànà ìmúpadà inú `"exact"` mu
nípasẹ̀ `toMemoryRetrievalConfig()` (ní ìtẹ̀lé àkókò).

### Àwọn pápá tuntun (v3.8.6, ètò 21 D9)

Tún wo abala "Ìfẹ̀síwájú àwọn ètò" lókè fún àpèjúwe àwọn pápá.

| Kọ́kọ́rọ́ DB                   | Pápá API                 | Àṣàyàn àkọ́kọ́ |
| --------------------------- | ------------------------ | ------------ |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`     |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`       |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`      |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`      |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`      |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`       |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`     |

`normalizeQdrantConfig()` inú `qdrant.ts` máa ń ka àwọn kọ́kọ́rọ́ DB tó ní í ṣe
pẹ̀lú Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` tí àṣàyàn àkọ́kọ́ rẹ̀ jẹ́ `"omniroute_memory"`,
`qdrantEmbeddingModel` tí àṣàyàn àkọ́kọ́ rẹ̀ jẹ́ `"openai/text-embedding-3-small"`).

### Àwọn oníyípadà àyíká (v3.8.6)

Àwọn oníyípadà àyíká àṣàyàn mẹ́fà ń ṣàtúnṣe ìhùwàsí ẹ́ńjìnnì nígbà ìṣiṣẹ́ (a ṣàkọsílẹ̀ wọn sínú `.env.example`):

| Oníyípadà                       | Àṣàyàn àkọ́kọ́               | Àpèjúwe                                                                                                                                       |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL àpamọ́ embedding (ìṣẹ́jú 5)                                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Iye àkọsílẹ̀ tó pọ̀ jù nínú àpamọ́ LRU embedding                                                                                                 |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Ibi ìpamọ́ HF fún módẹ́ẹ̀lì Transformers.js                                                                                                      |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Ibi ìpamọ́ HF fún módẹ́ẹ̀lì potion àìyípadà                                                                                                      |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Ibi láti tọ́jú àwọn módẹ́ẹ̀lì tí a gbà sílẹ̀                                                                                                      |
| `MEMORY_VEC_TOP_K`              | `20`                       | top-K àkọ́kọ́ fún ìṣàwárí vector                                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | Kónísítáǹtì RRF k fún ìṣàwárí hybrid                                                                                                          |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Ṣètò sí `int8` láti tọ́jú àwọn vector sqlite-vec agbègbè ní ọ̀nà quantized (~4× kéré sí i; àṣàyàn ni). Ìyípadà módù máa ń fipá mú àtúntò atọ́ka. |

## Ìṣókí (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` máa ń fún àkóónú àtijọ́ kúrú nígbà tí àpapọ̀ token tó ń lọ lọ́wọ́ lórí àwọn ìrántí kọ́kọ́rọ́ kan bá kọjá ààlà tí a yàn. Ó máa ń ṣe àyẹ̀wò àwọn ìlà ní ọ̀nà DESC gẹ́gẹ́ bí `created_at`, ó máa ń pa àwọn ìlà tó bá ààlà mu mọ́, àti fún àwọn tó kù, ó máa ń fi àwọn gbólóhùn mẹ́ta àkọ́kọ́ láti inú àkóónú ìpilẹ̀ṣẹ̀ rọ́pò `content` ní ibi kan náà. `tokensSaved` ni ìyàtọ̀ tó wà nínú `estimateTokens` láàárín àkóónú àtijọ́ àti tuntun.

Ìlànà yìí **wà fún lílò ṣùgbọ́n a kò pè é láìfọwọ́yí** nínú ìṣàn ìfọ̀rọ̀wérọ̀ lọ́wọ́lọ́wọ́ — pè é láti inú cron, ìgbésẹ̀ alábójútó, tàbí àsopọ̀ `MemoryConfig.autoSummarize` bí o bá nílò ìṣókí tó ń bá a lọ. Àdánù dátà náà kò ṣeé yí padà: a máa kọ ọ̀rọ̀ ìpilẹ̀ṣẹ̀ lé lórí.

## REST API

Gbogbo endpoint nílò ìfàṣẹ̀sí iṣàkóso (`requireManagementAuth`).

### Àwọn endpoint ìrántí pàtàkì (tó ti wà tẹ́lẹ̀ + tí a ṣe àfikún sí)

| Ọ̀nà      | Path                 | Àpèjúwe                                                                                                                                                                                        |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Àtòjọ tó ní pagination pẹ̀lú àwọn filter: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Ìdáhùn ní `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`           |
| `POST`   | `/api/memory`        | Ṣẹ̀dá àkọsílẹ̀ (tí Zod fọwọ́sí: `content`, `key`, àti `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` tí kò pọn dandan). Ó pe `createMemory()` tó máa ń ṣe upsert lórí `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Gba àkọsílẹ̀ kan ṣoṣo nípasẹ̀ UUID                                                                                                                                                               |
| `PUT`    | `/api/memory/[id]`   | Ṣe àfikún sí àwọn field àkọsílẹ̀ (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Ó tún máa ń mú vector bára mu bí orísun embedding bá wà.                                |
| `DELETE` | `/api/memory/[id]`   | Pa àkọsílẹ̀ kan rẹ́; ó tún máa ń pa á rẹ́ láti inú `vec_memories` (D15) àti Qdrant bí ó bá ṣeé ṣe tó. Ó dá 404 padà bí kò bá sí.                                                                  |
| `GET`    | `/api/memory/health` | Ó ṣiṣẹ́ `verifyExtractionPipeline("health-check")` — ìdánwò àyíká-kíkún ṣẹ̀dá→ṣe àtòjọ→parẹ́. Ó dá `{working, latencyMs, error?}` padà                                                            |

### Àwọn endpoint tuntun fún ẹ́ńjìnnì ìrántí (ètò 21)

| Ọ̀nà    | Path                              | Àpèjúwe                                                                                                                                                                                  |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Ìdánwò láìṣe àyípadà fún `retrieveMemories` — ó dá àwọn èsì tó wà ní ipò padà pẹ̀lú score, tier, àti tokens. Body: `RetrievePreviewSchema`. KÒ fi ìrántí sínú ètò tàbí ṣe àyípadà sí wọn. |
| `GET`  | `/api/memory/embedding-providers` | Ó ṣe àtòjọ àwọn provider pẹ̀lú àwọn model embedding, ní fífi hàn èyí tó ní API key tí a ti ṣètò.                                                                                          |
| `GET`  | `/api/memory/engine-status`       | Ó dá ipò ẹ́ńjìnnì kíkún padà: keyword tier, ìpinnu embedding, àwọn ìṣirò ibi ìpamọ́ vector, ìlera Qdrant, àti àtòjọ rerank. Ìrísí: `MemoryEngineStatusSchema`.                             |
| `POST` | `/api/memory/summarize`           | Bẹ̀rẹ̀ ìṣókí ìrántí pẹ̀lú ọwọ́. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Ó dá `{candidates, tokensSaved}` padà.                                               |
| `POST` | `/api/memory/reindex`             | Bẹ̀rẹ̀ vector reindex fún àwọn ìrántí tó ní `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Ó dá `{started, pending}` padà.                                                      |

### Àwọn endpoint ètò

| Ọ̀nà    | Path                                    | Àpèjúwe                                                                                                         |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` tó ti di ìwọ̀n kan lọ́wọ́lọ́wọ́ (àwọn field tuntun 7 + ti àtijọ́)                            |
| `PUT`  | `/api/settings/memory`                  | Ṣe àfikún sí field èyíkéyìí láti inú `MemorySettingsExtendedSchema` (àpapọ̀ field 12)                            |
| `GET`  | `/api/settings/qdrant`                  | Àwọn ètò Qdrant lọ́wọ́lọ́wọ́ (`QdrantSettingsSchema`)                                                               |
| `PUT`  | `/api/settings/qdrant`                  | Ṣe àfikún sí àwọn ètò Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = okùn òfo máa ń yọ kọ́kọ́rọ́ náà kúrò. |
| `GET`  | `/api/settings/qdrant/health`           | Ìdánwò bóyá instance Qdrant tí a ṣètò ṣì ń ṣiṣẹ́. Ó dá `QdrantHealthResultSchema` padà.                          |
| `POST` | `/api/settings/qdrant/search`           | Ìdánwò semantic search lórí Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                               |
| `POST` | `/api/settings/qdrant/cleanup`          | Yọ àwọn point Qdrant fún àwọn ìrántí tó ti parí / tó ti pẹ́.                                                     |
| `GET`  | `/api/settings/qdrant/embedding-models` | Ṣe àtòjọ àwọn model embedding tó wà fún Qdrant.                                                                 |

Query àtòjọ `/api/memory` ń ṣe àtìlẹ́yìn fún pagination tó dá lórí `page`
(`parsePaginationParams`) **tàbí** `offset` tààrà — nígbà tí `offset` bá wà, òun
ló máa ní ààyò, a ó sì ṣírò `page` kan láti inú rẹ̀ fún ìrísí ìdáhùn náà.

## Àwọn Irinṣẹ́ MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Nígbà tí olupin MCP bá ṣiṣẹ́, a máa forúkọsílẹ̀ àwọn irinṣẹ́ ìrántí mẹ́ta:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → ń fi `retrieveMemories()` yí ká. Láti v3.8.6 (D16), a máa ń ka `strategy`
  láti inú `getMemorySettings()` dípò kí a fi `"exact"` kọ ọ́ sínú kóòdù. Tí
  a bá pèsè `query` tí `strategy` sì jẹ́ `semantic` tàbí `hybrid`, a máa ń lo
  ibi ìtọ́jú vector nígbà tí ó bá wà.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → ń fi `createMemory()` yí ká. Ó gba kìkì àwọn irú canonical mẹ́rin:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ń ṣe àkójọ àwọn
  àkọsílẹ̀ tó bá ohun tí a sọ mu, ó lè yọ àwọn tí timestamp ìṣẹ̀dá wọn kò tíì
  dé àkókò tí a sọ kúrò, lẹ́yìn náà ó ń pa ọ̀kọ̀ọ̀kan rẹ́ nípasẹ̀
  `deleteMemory()` (èyí tí ó tún ń yọ àwọn vector kúrò nínú sqlite-vec + Qdrant).

Wo [MCP-SERVER.md](./MCP-SERVER.md) fún àwọn àlàyé nípa ìgbékalẹ̀ ìrìnnà àti ìwọ̀n ààyè.

## Dasibodu (Studio Ìrántí)

`src/app/(dashboard)/dashboard/memory/page.tsx` ti di **Studio onítábù mẹ́ta** báyìí:

### Tábù: Àwọn Ìrántí

- Káàdì àlàyé èrò (àlàyé "Bí ó ṣe ń ṣiṣẹ́" tí a lè ká pọ̀).
- Àkójọ àkókò-gidi, ìṣàwárí, àti pípín ojú-ewé (ìdádúró 300 ms).
- Ajọ irú (`factual` / `episodic` / `procedural` / `semantic` / gbogbo rẹ̀).
- Fọ́ọ̀mù agbejáde láti ṣàfikún ìrántí (bọ́tìnnì, àkóónú, irú).
- Àtúnṣe lórí ìlà (bọ́tìnnì pẹ́ńsù → `PUT /api/memory/[id]`).
- Piparẹ́ fún ìlà kọ̀ọ̀kan (pẹ̀lú àpótí ìmúdájú).
- Gbé JSON ojú-ewé lọ́wọ́lọ́wọ́ jáde; gbé JSON wọlé nípasẹ̀ olùyan fáìlì.
- Àwọn káàdì ìṣirò: `totalEntries`, `tokensUsed`, `hitRate`.
- Bọ́tìnnì "Ṣe àwọn ti àtijọ́ ní ṣókí" → `POST /api/memory/summarize` (ìdánwò láìṣe àyípadà kọ́kọ́
  máa fi iye olùdíje hàn, lẹ́yìn náà ó máa béèrè ìmúdájú).
- Dọ́ọ̀tì ìlera aláwọ̀ ewé/pupa tí `GET /api/memory/health` ń darí.

### Tábù: Pápá Ìdánwò

- Ààyè ìbéèrè + olùyan ọ̀nà (Gẹ́gẹ́ Bí Ó Ṣe Jẹ́ / Ìtumọ̀ / Àpapọ̀) + ìṣúná token.
- "Ṣe Àfarawé" → `POST /api/memory/retrieve-preview` — ń fi àwọn èsì tó wà ní ipò hàn pẹ̀lú
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Páńẹ́lì ìpinnu tó ń fi orísun embedding / ibi ìtọ́jú vector tí a lò hàn àti
  bóyá a lo ọ̀nà àfẹ́yìntì.

### Tábù: Ẹ́ńjìnnì

- Páńẹ́lì ipò ẹ́ńjìnnì (àmì keyword FTS5, àmì embedding, àmì ibi ìtọ́jú vector,
  àmì ìlera Qdrant, àmì rerank).
- Bọ́tìnnì "Tún Ṣe Ìtọ́ka Nísinsìnyí" → `POST /api/memory/reindex`.
- Olùyan orísun embedding (auto / remote / static / transformers + àwọn bọ́tìnnì tan/pà).
- Káàdì àtòjọ Qdrant (bọ́tìnnì tan/pà, host/port/collection/key, dán ìsopọ̀ wò,
  dán ìṣàwárí semantic wò, ìmọ́tótó).
- Káàdì àtòjọ rerank (bọ́tìnnì tan/pà, olùyan provider/model).

Àwọn àtòjọ Ìrántí àti Qdrant tún wà lábẹ́
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) fún
ojúlé àtòjọ àgbáyé/àtijọ́.

## Ìpamọ́ Káṣì

`src/lib/memory/store.ts` ń tọ́jú káṣì inú-process tó jọ LRU
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, pẹ̀lú pípa 20 %
àwọn tó ti pẹ́ jù lọ) fún àwọn kíkà `getMemory(id)`, pẹ̀lú ipele `memoryCache`
kọ́kọ́rọ́/iye gbogbogbòò (`src/lib/memory/cache.ts`) tó ní àwọn ọ̀nà
`get`/`set`/`invalidate` tí àwọn olùpè tó fẹ́ káṣì àdáni wọn ń lò (LRU oní-àkọsílẹ̀
1 000, TTL àìyípadà 5 min).

## Ìkọ̀kọ̀ & Àyíká-Ìgbésí-ayé

- Ìní ìrántí jẹ́ ti ID kọ́kọ́rọ́ API (`resolveMemoryOwnerId` nínú
  `chatCore.ts`). Láìsí `apiKeyInfo.id`, ìgbàpadà, ìfisí, tàbí ìyọkúrò
  kò ní ṣiṣẹ́.
- Àwọn àkọsílẹ̀ pẹ̀lú `expires_at` ọjọ́ iwájú ni a yọ kúrò nínú ìgbàpadà; àwọn
  àkọsílẹ̀ àtijọ́ tí ó ti kọjá `retentionDays` ni a yọ kúrò nípasẹ̀ gbólóhùn
  `created_at >= cutoff` nínú `retrieveMemories`.
- Fún píparẹ́ pátápátá, lo `DELETE /api/memory/[id]` tàbí `omniroute_memory_clear`.
- Ìyọkúrò ń ṣiṣẹ́ láìdúró de èsì nípasẹ̀ `setImmediate`; a máa ń kọ àwọn ìkùnà sílẹ̀ lábẹ́
  `memory.extraction.background.failed`, wọn kì í sì í hàn sí ẹni tó pè é.
- Àwọn ìrìn-àjò ìmúdájú lọ́wọ́-lọ́wọ́ (`verifyExtractionPipeline`) máa ń pa àwọn
  àkọsílẹ̀ ìdánwò tiwọn rẹ́ nínú bulọ́ọ̀kù `finally`.

## Tún Wo

- [SKILLS.md](./SKILLS.md) — ètò `skillsEnabled` ń fi àwọn ìtumọ̀ irinṣẹ́
  sínú rẹ̀ pẹ̀lú ìrántí.
- [MCP-SERVER.md](./MCP-SERVER.md) — ìgbékalẹ̀ gbigbe MCP / àwọn ààlà.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — àyè iṣẹ́ API tó gbòòrò sí i.
- Àwọn módùlù orísun:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF àdàpọ̀
  - `src/lib/memory/embedding/index.ts` — ipele embedding orísun-púpọ̀
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — àwọn schema Zod fún gbogbo body API ìrántí
  - `src/shared/schemas/qdrant.ts` — àwọn schema Zod fún àwọn ètò/ìṣiṣẹ́ Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD fún `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + àwọn ipa-ọ̀nà abẹ́ rẹ̀
  - `src/app/(dashboard)/dashboard/memory/` — UI Studio (ojú-ìwé + àwọn àkópọ̀ +
    àwọn táàbù + àwọn hook)
  - `open-sse/handlers/chatCore.ts` (ìsopọ̀ ìfisí / ìyọkúrò)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Yíyan Olùpèsè Embedding (v3.8.16+)

Ẹ́ńjìnnì ìrántí OmniRoute ṣe àtìlẹ́yìn fún **orísun embedding mẹ́rin** (`src/lib/memory/embedding/`). Ọ̀kọ̀ọ̀kan ní àwọn ìṣòro àti àǹfààní ọ̀tọ̀ọ̀tọ̀ ní **àkókò ìdádúró, iye owó, dídára módẹ́lì, àti ìdíjú ìṣètò**.

### Àwọn Orísun Embedding

| Olùpèsè        | Orísun                                        | Àkókò ìdádúró                    | Iye owó              | Dídára                       | Ìṣètò                                                  |
| -------------- | --------------------------------------------- | -------------------------------- | -------------------- | ---------------------------- | ------------------------------------------------------ |
| `transformers` | Módẹ́lì ONNX agbègbè (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                  | Ọ̀fẹ́                  | Ó dára                       | `npm install` nìkan                                    |
| `static`       | Àwọn vector tí a ti ṣírò tẹ́lẹ̀ (tí a cache)    | <1ms                             | Ọ̀fẹ́                  | Kò kan (ó dá lórí cache hit) | Kò sí                                                  |
| `remote`       | API OpenAI / Cohere / Voyage                  | ~100-300ms                       | $0.02-0.10/1M tokens | Ó tayọ                       | Kọ́kọ́rọ́ API                                             |
| `auto`         | Yan orísun tó dára jù lọ tó wà ní àkókò ìṣiṣẹ́ | Bí orísun tí a yàn               | Ọ̀fẹ́                  | Bí orísun tí a yàn           | Kò sí                                                  |
| _(cache)_      | Ipele LRU inú-ìrántí lórí orísun èyíkéyìí     | <1ms (hit), ìdádúró kíkún (miss) | Ọ̀fẹ́                  | Bí èyí tó wà lábẹ́ rẹ̀         | Ó máa ń ṣiṣẹ́ nígbà gbogbo (kì í ṣe orísun tí a lè yàn) |

### Igi Ìpinnu

```
                  Kí ni àyíká ìfìṣàkóso rẹ?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 ÌDÀGBÀSÓKÈ/ÌDÁNWÒ ÌṢẸ́ KÉKERÉ ÌṢẸ́ ŃLÁ     ETÍ / AÌSÍ-LÓRÍ-ÍŃTÁNẸ́Ẹ̀TÌ
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ọ̀fẹ́, kò sí API)         (dídára jù lọ)   (kò sí íńtánẹ́ẹ̀tì)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            MÁA ṣàfikún ipele `cache` sí òkè nígbà gbogbo
            (LruCache ń fi àwọ̀n yí olùpèsè èyíkéyìí ká)
```

### Ìṣètò Database & API

A máa ń ṣètò àwọn àṣàyàn embedding ìrántí nípasẹ̀ API/UI Settings, kì í ṣe àwọn environment variable. Àwọn kọ́kọ́rọ́ database ètò tó yẹ lábẹ́ Settings (`normalizeMemorySettings` nínú `src/lib/memory/settings.ts`) ni:

- `memoryEmbeddingSource`: `"transformers"` (agbègbè), `"remote"` (tí ó dá lórí API, àpẹẹrẹ OpenAI), `"static"` (ibi ìpamọ́ òde), tàbí `"auto"`
- `memoryEmbeddingProviderModel`: Àmì ìdánimọ̀ módẹ́lì fún àwọn orísun remote/static (àpẹẹrẹ, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, tàbí `"auto"`

#### Módẹ́lì Agbègbè (`transformers`)

Ó ń lo transformers.js ní inú láti ṣiṣẹ́ àwọn módẹ́lì agbègbè:

```bash
# Àwọn env var tí kóòdù ń kà (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repo módẹ́lì HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Módẹ́lì static potion HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Àpò-ọ̀nà cache
```

#### Cache Embedding LRU

Cache máa ń ṣiṣẹ́ nígbà gbogbo nípa àìyípadà, a sì ń ṣètò rẹ̀ nípasẹ̀ àwọn env var:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Iye àwọn ohun cache tó pọ̀ jù
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (ìṣẹ́jú 5)
```

### Àwọn Òǹkà Ìṣiṣẹ́

Ìdánwò iṣẹ́ lórí server x86 onímójútó 4 tí ó wọ́pọ̀ (àwọn ọ̀rọ̀ ~100 token kọ̀ọ̀kan):

| Olùpèsè              | p50   | p95   | p99   | Iye owó / embedding 1M              |
| -------------------- | ----- | ----- | ----- | ----------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Ọ̀fẹ́                                 |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large)  |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Ó dá lórí ibi tí a ti gbé Qdrant sí |
| `cache` (ìbámu)      | <1ms  | <1ms  | 2ms   | Ọ̀fẹ́                                 |

---

## Àwọn Àpẹẹrẹ Yíyọ Òtítọ́ Jáde (v3.8.16+)

Módùlù `extraction.ts` (`src/lib/memory/extraction.ts`) ń lo **ìbámu àpẹẹrẹ regex** láti yọ àwọn òtítọ́ tí a ṣètò kalẹ̀ jáde láti inú àwọn ìfiránṣẹ́ ìjíròrò. Lílóye àwọn àpẹẹrẹ wọ̀nyí yóò ràn ọ́ lọ́wọ́ láti ṣàtúnṣe dídára yíyọ jáde fún ọ̀nà ìlò rẹ.

### Àwọn Ẹ̀ka Àpẹẹrẹ Àìyípadà

| Ẹ̀ka                 | Àpẹẹrẹ àwòṣe                                                            | Ohun tí ó ń gbà mú               |
| ------------------- | ----------------------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"Mo fẹ́ràn <X> jù"`, `"Mo fẹ́ràn <X>"`, `"Mo kórìíra <X>"`               | Àwọn ààyò aṣàmúlò                |
| DECISION_PATTERNS   | `"Màá lo <X>"`, `"Mo pinnu láti <X>"`, `"Mo yan <X>"`                   | Àwọn ìpinnu aṣàmúlò (episodic)   |
| PATTERN_PATTERNS    | `"Mo sábà máa <X>"`, `"Mo máa ń <X> nígbà gbogbo"`, `"Mi ò <X> láéláé"` | Àwọn àpẹẹrẹ ìhùwàsí tí ó dúró pẹ́ |

### Àwọn Àpẹẹrẹ Àwòṣe (Tí a Mú Rọrùn)

```ts
// Láti inú src/lib/memory/extraction.ts
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

### Ohun Tí A Ń Yọ Jáde

Nígbà tí aṣàmúlò kan bá sọ pé:

> "Mo fẹ́ràn TypeScript jù. Màá lo Postgres fún iṣẹ́ yìí. Mo máa ń commit kí n tó push nígbà gbogbo. Mi ò fẹ́ràn Python."
> Yíyọ jáde ń ṣẹ̀dá ìrántí mẹ́rin:
>
> | Kókó                                 | Ẹ̀ka    | Irú      | Àkóónú                 |
> | ------------------------------------ | ------ | -------- | ---------------------- |
> | `preference:typescript`              | ààyò   | òtítọ́    | "TypeScript"           |
> | `decision:postgres_for_this_project` | ìpinnu | episodic | "Postgres fún iṣẹ́ yìí" |
> | `pattern:commit_before_pushing`      | àpẹẹrẹ | òtítọ́    | "commit kí a tó push"  |
> | `preference:python`                  | ààyò   | òtítọ́    | "Python"               |

### Àwọn Ààlà Yíyọ Jáde

Láti dènà yíyọ jáde tí kò ní ìṣàkóso, àwọn ààlà wọ̀nyí wà ní lílò:

| Gígùn àkóónú tó kéré jù | àwọn àmì 3 |
| Gígùn àkóónú tó pọ̀ jù | àwọn àmì 500 |

### Ìgbà Tí Ó Yẹ Kí A Pa Yíyọ Jáde

Yíyọ jáde máa ń ṣiṣẹ́ fúnra rẹ̀ ní gbogbo ìgbà tí ìrántí bá wà ní ṣíṣiṣẹ́; kò sí
bọ́tìnì yíyọ-jáde-nìkan lọ́tọ̀. Láti pa á, pa ìrántí pátápátá (`enabled: false`
nípasẹ̀ `PUT /api/settings/memory`). Rò ó láti ṣe bẹ́ẹ̀ nígbà tí:

- Ìwọ bá ní ọ̀pọ̀ ìfiránṣẹ́ gan-an, tí iye owó yíyọ jáde kò sì ṣeé fojú kọ
- Àwọn ìjíròrò rẹ bá jẹ́ ti ìgbà díẹ̀ ní pàtàkì (ìtàkurọ̀sọ, àtúnṣe àṣìṣe) tí kò ní iye fún ìgbà pípẹ́
- Ìwọ ti ń gba àyíká ọ̀rọ̀ sílẹ̀ tẹ́lẹ̀ nípasẹ̀ àwọn plugin àkànṣe

---

## Ṣíṣàtúnṣe Hybrid RRF (v3.8.16+)

Àlùgọ́ríítìmù **Reciprocal Rank Fusion (RRF)** ń darapọ̀ àwọn èsì FTS5 (ọ̀rọ̀-kókó) àti vector (ìtumọ̀). Párámítà `k` ń ṣàkóso bí a ṣe ń fún àwọn èsì tí ipò wọn wà ní ìsàlẹ̀ ní ìwọ̀n tó.

### Fọ́ọ̀mùlà Náà

Fún ìrántí kọ̀ọ̀kan tó ṣeé yàn, àmì RRF jẹ́:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Níbi tí:

- `k` ti jẹ́ iye àìyípadà (àìyípadà rẹ̀ jẹ́ 60)
- `rank_i(d)` ti jẹ́ ipò ìwé `d` nínú ètò ìwákiri i-th (FTS, vector)
- Àpapọ̀ náà gba gbogbo àwọn ètò ìwákiri kọjá

### Bí `k` Ṣe Ń Ní Ipa Lórí Àwọn Èsì

| Iye `k`               | Ipa                                                                      | Ó dára jù fún                            |
| --------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| `k=0`                 | Àkópọ̀ ipò lásán (kò sí ìmúrọ̀rùn)                                         | Ìpìlẹ̀ àbá-ìmọ̀                            |
| `k=10-30`             | Ó fún àwọn èsì òkè ní ìwọ̀n púpọ̀, ipò ìsàlẹ̀ kì í fi púpọ̀ kún un           | Nígbà tí àwọn èsì top-3 sábà máa ń tọ́    |
| **`k=60`** (àìyípadà) | Ó dọ́gba — gbogbo àwọn èsì top-10 ń fi ohun tó ní ìtumọ̀ kún un            | Ìwákiri gbogbogbò                        |
| `k=100+`              | Ó fẹlẹ̀ sí i — kódà àwọn èsì ipò ìsàlẹ̀ lè borí bí wọ́n bá hàn nínú ọ̀pọ̀ ètò | Nígbà tí recall > precision bá ṣe pàtàkì |

### Ṣíṣàtúnṣe `k` Ní Ìlò Gidi

```bash
# Àìyípadà
MEMORY_RRF_K=60

# Ìpéye tó lágbára (ìrántí kékeré, ìwé díẹ̀)
MEMORY_RRF_K=20

# Ìrántípadà tó pọ̀ jù (ìrántí ńlá, onírúurú ìbéèrè)
MEMORY_RRF_K=120
```

**Àpẹẹrẹ pẹ̀lú `k=20`:**

- Ipo FTS 1 → àfikún `1/21 = 0.048`
- Ipo FTS 10 → àfikún `1/30 = 0.033`
- Ipo vector 1 → àfikún `0.048`
- Àpapọ̀ tó pọ̀ jù: `0.096`

**Àpẹẹrẹ pẹ̀lú `k=60`:**

- Ipo FTS 1 → àfikún `1/61 = 0.016`
- Ipo FTS 10 → àfikún `1/70 = 0.014`
- Ipo vector 1 → àfikún `0.016`
- Àpapọ̀ tó pọ̀ jù: `0.033`

Pẹ̀lú `k` tó ga, **ìyàtọ̀ ìbátan** láàárín top-1 àti rank-10 kéré sí i, nítorí náà àlùgọ́ríítìmù náà gbára lé **ìfohùnṣọ̀kan láàárín àwọn ètò ìwákiri** ju ìgbẹ́kẹ̀lé ipò òkè lọ.

### Ìgbà Tí Ó Yẹ Kí A Yí `k` Padà

| Àmì ìṣòro                                          | Gbìyànjú                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| Èsì òkè máa ń borí nígbà gbogbo, ṣùgbọ́n ó jẹ́ àṣìṣe | **Dín** k kù (fún àpẹẹrẹ, 20) — ìgbẹ́kẹ̀lé ipò òkè ṣe pàtàkì sí i          |
| Ìdáhùn tó tọ́ wà nínú top-5 ṣùgbọ́n kò sí ní top-1   | **Mú** k ga (fún àpẹẹrẹ, 100) — ìṣírò tó fẹlẹ̀ ń san ìfohùnṣọ̀kan láǹfààní |
| Recall ga ṣùgbọ́n precision kéré                    | **Dín** k kù — mú ìṣètò ipò náà mú sí i                                  |
| Recall kéré (àwọn ìwé tó yẹ kò sí)                 | **Mú** k ga — fún àwọn ìwé ipò ìsàlẹ̀ ní àǹfààní                          |

### Ìwọ̀n RRF

Àkópọ̀ ipò ìyípadà ń lo ìwọ̀n tó dọ́gba fún ipò vector ìtumọ̀ àti ipò ìwákiri ọ̀rọ̀-kíkún:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Kò sí àwọn environment variables láti ṣàtúnṣe àwọn ìwọ̀n kọ̀ọ̀kan (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` kò sí).

---

## Ìlànà Ìṣókí (v3.8.16+)

Módù `summarization.ts` (`src/lib/memory/summarization.ts`) máa ń fún àwọn ìrántí àtijọ́ pọ̀ láti jẹ́ kí àkójọpọ̀ tí ń ṣiṣẹ́ kéré, nígbà tí ó ṣì ń pa agbára ìrántí mọ́.

### Ìgbà Tí Ìṣókí Máa Ń Bẹ̀rẹ̀

| Ohun tó ń fa á           | Ààlà (àìyípadà) |
| ------------------------ | --------------- |
| Ìbẹ̀rẹ̀ afọwọ́ṣe nípasẹ̀ API | kò kan          |

### Ohun Tí A Máa Ń Ṣókí

Àwọn ibi ìwọlé méjì ni a ń ṣe àgbéjáde láti inú `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ó máa ń ṣókí àwọn
  ìrántí fún sáà kan sínú ọ̀rọ̀ àkópọ̀ kan ṣoṣo tí ìwọ̀n token fi ààlà sí.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — ìfúnpọ̀ tó dá lórí ọjọ́-orí
  tí API ń lò: ó máa ń yan gbogbo ìrántí tó ti ju `days` lọ, ó máa ń dá
  ìrántí àkópọ̀ ṣókí kan láti inú wọn, àti pé (nígbà tí `dryRun` bá jẹ́ `false`) ó máa ń pa
  àwọn àkọ́kọ́ rẹ́. Fi `dryRun: true` ránṣẹ́ láti ṣàgbéyẹ̀wò àkójọpọ̀ àwọn olùdíje àti àpapọ̀ token
  láìṣe àtúnṣe ohunkóhun.

Kò sí ìgbésẹ̀ ìṣàkójọpọ̀ tag/key tàbí fífi àmì “core vs summarizable” sí ìrántí kọ̀ọ̀kan —
yíyan dá lórí ààlà ọjọ́-orí nìkan, ọ̀rọ̀ àkópọ̀ náà sì jẹ́ ìlà ṣókí tí irú rẹ̀ wà ní ìbẹ̀rẹ̀ fún olùdíje kọ̀ọ̀kan.

### Bíbẹ̀rẹ̀ Ìṣókí

Ìṣókí jẹ́ **afọwọ́ṣe / ohun tí a ní láti yàn láti lò** — ètò `autoSummarize` jẹ́ `false` ní
àìyípadà, nítorí náà kò sí ohun tí a máa ń fún pọ̀ láìfọwọ́ṣe. Bẹ̀rẹ̀ rẹ̀ nípasẹ̀ API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Láti jẹ́ kó wà ní pípa, kàn jẹ́ kí `autoSummarize` dúró sí iye àìyípadà rẹ̀ (`false`).

### Àwọn Àbá Fún Didára Ìṣókí

- **Kọ́kọ́ ṣàgbéyẹ̀wò pẹ̀lú `dryRun`** — `summarizeMemoriesOlderThan(..., true)` máa ń dá
  àtòjọ àwọn olùdíje àti àpapọ̀ iye token padà, kí o lè fìdí ohun tí a máa dapọ̀ múlẹ̀
  kí o tó pa àwọn àkọ́kọ́ rẹ́.
- **Ṣe ìṣókí ní àwọn wákàtí tí ìlò kò pọ̀** bí o bá ní àkójọpọ̀ ìrántí tó tóbi — ìpè LLM ni apá tó lọra

```bash
# Ní àṣà Cron: ṣe ìṣókí ní aago mẹ́ta òwúrọ̀ lójoojúmọ́
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Àpẹrẹ Olùpèsè MemoryBackend

> **Orísun òtítọ́:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Àwọn ìdánwò:** `src/lib/memory/__tests__/generic-backend.test.ts`

Àpẹrẹ olùpèsè MemoryBackend ń ṣe àfikún **fẹ́lẹ́fẹ́lẹ́ àfojúrí backend tí a lè ṣètò** lórí ẹ́ńjìnnì ìrántí tó wà tẹ́lẹ̀. Dípò kí ètò ìrántí náà di mọ́ ìmúṣẹ ibi ìpamọ́ kan ṣoṣo, ó ti ń ṣètìlẹ́yìn fún ọ̀pọ̀ backend báyìí (SQLite, Obsidian, Notion, àwọn backend HTTP àdáni) pẹ̀lú ipa-ọ̀nà àkọ́kọ́/àfirọ́pò tí a lè ṣètò.

### Ìṣètò

```
┌──────────────────────────────────────────────────────────┐
│                    Àwọn Ipa-ọ̀nà API                      │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Olùṣètò Singleton (manager.ts)                  │
│                                                          │
│  Àkọ́kọ́ ──► Backend A  (fún àpẹẹrẹ SQLite)              │
│  Àfirọ́pò ─► Backend B  (fún àpẹẹrẹ Obsidian)            │
│             Backend C  (fún àpẹẹrẹ Notion nípasẹ̀ GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Ìjánu Pàtàkì (`backend.ts`)

Gbogbo backend gbọ́dọ̀ mú ìjánu `MemoryBackend` ṣẹ:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // Ṣíṣẹ̀dá, kíkà, ṣíṣe àfikún, àti píparẹ́
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Ìṣàwárí
  search(config: SearchConfig): Promise<Memory[]>;

  // Ìlera
  health(): Promise<HealthCheckResult>;

  // Ìyípo ìgbésí-ayé (àṣàyàn)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Olùṣètò Singleton tí ó:

- **Forúkọsílẹ̀** àwọn backend nípasẹ̀ `register(backend)` — tí a ń pè nígbà ìbẹ̀rẹ̀ láti `index.ts`
- **Ṣètò** àkọ́kọ́ + àfirọ́pò nípasẹ̀ `configure(primary, fallbacks)`
- **Darí** CRUD/ìṣàwárí sí backend àkọ́kọ́, pẹ̀lú ẹ̀wọ̀n àfirọ́pò nígbà ìkùnà
- **Ṣàyẹ̀wò ìlera** gbogbo àwọn backend lẹ́ẹ̀kọ̀ọ̀kan

**Ìhùwàsí àfirọ́pò:**

| Ìṣiṣẹ́    | Àkọ́kọ́                  | Àwọn àfirọ́pò                  |
| -------- | ---------------------- | ----------------------------- |
| `create` | ✅ Àkọ́kọ́ nìkan         | ❌                            |
| `get`    | ✅ Kọ́kọ́ gbìyànjú àkọ́kọ́ | ✅ Lo àfirọ́pò bí ó bá jẹ́ null |
| `update` | ✅ Àkọ́kọ́ nìkan         | ✅ Ìmúdọ́gba tí kò dúró de èsì |
| `delete` | ✅ Àkọ́kọ́ nìkan         | ✅ Ìmúdọ́gba tí kò dúró de èsì |
| `list`   | ✅ Àkọ́kọ́ nìkan         | ❌                            |
| `search` | ✅ Àkọ́kọ́ ni àkọ́kọ́      | ✅ Lo àfirọ́pò nígbà àṣìṣe     |

#### GenericMemoryBackend (`genericBackend.ts`)

Asopọ̀ HTTP gbogbogbò kan tí ó ń mú REST API èyíkéyìí bá MemoryBackend mu. Ó wúlò fún:

- **Notion** — sopọ̀ nípasẹ̀ Notion API
- **Obsidian** — sopọ̀ nípasẹ̀ Obsidian Local REST API
- **Àwọn backend àdáni** — iṣẹ́ èyíkéyìí tí ó ṣí API ìrántí RESTful sílẹ̀

**Ìṣètò:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL ìpìlẹ̀ ti API ẹ̀yìn
  apiKey?: string;           // Tóókì Bearer fún ìfàṣẹsí
  headers?: Record<string, string>;  // Àwọn àkọlé HTTP àkànṣe
  timeout?: number;          // Àkókò ìdádúró ìbéèrè (àìyípadà: 30000ms)
  backendType?: string;      // Fún ìkọsílẹ̀ àkọsílẹ̀

  // Àwọn ìyípadà ojú-ọ̀nà (àwọn àìyípadà ń lo àwọn àṣà REST)
  endpoints?: {
    search?: string;   // àìyípadà: "/memories/search"
    create?: string;   // àìyípadà: "/memories"
    list?: string;     // àìyípadà: "/memories"
    get?: string;      // àìyípadà: "/memories/{id}"
    update?: string;   // àìyípadà: "/memories/{id}"
    delete?: string;   // àìyípadà: "/memories/{id}"
    health?: string;   // àìyípadà: "/health"
  };

  // Àwọn ìbámu orúkọ àlàyé ìbéèrè
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Àwọn ìbámu orúkọ àlàyé ipa-ọ̀nà
  pathParams?: {
    id?/memoryId?
  };
}
```

**Àwọn ẹ̀yìn tí a mọ̀** ni a ti ṣètò tẹ́lẹ̀ nínú `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend tí a tọ́ka sí localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend tí a tọ́ka sí api.notion.com/v1
```

#### Àwọn Ẹ̀yìn Tí A Kọ́ Sínú Rẹ̀

##### SQLiteBackend (`sqliteBackend.ts`)

Ẹ̀yìn àkọ́kọ́ àìyípadà. Ó yí ibi ìtọ́jú ìrántí tó dá lórí SQLite tó wà tẹ́lẹ̀ ká ní lílo `src/lib/memory/store.ts`. A máa forúkọsílẹ̀ rẹ̀ láìfọwọ́ṣe nígbà ìbẹ̀rẹ̀.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Ó yí ìṣọ̀kan Obsidian tó wà tẹ́lẹ̀ (`src/lib/memory/obsidianBackend.ts`) ká. Ó sopọ̀ mọ́ àpótí Obsidian nípasẹ̀ Obsidian Local REST API.

### Àwọn Ètò

Àwọn ètò ẹ̀yìn ìrántí ni a tọ́jú sínú tábìlì ètò ètò-ìṣàmúlò, a sì ń ṣàkóso wọn nípasẹ̀ `src/lib/memory/settings.ts`:

| Ètò               | Bọ́tìnì Env/Àtúntò        | Àìyípadà   | Àpèjúwe                             |
| ----------------- | ------------------------ | ---------- | ----------------------------------- |
| Ẹ̀yìn àkọ́kọ́        | `memoryPrimaryBackend`   | `"sqlite"` | ID ti ẹ̀yìn àkọ́kọ́                    |
| Àwọn ẹ̀yìn àfirọ́pò | `memoryFallbackBackends` | `[]`       | Àwọn ID ẹ̀yìn àfirọ́pò ní ìtòlẹ́sẹẹsẹ  |
| Àwọn àtúntò ẹ̀yìn  | `memoryBackendConfigs`   | `{}`       | Àwọn ìyípadà àtúntò fún ẹ̀yìn kọ̀ọ̀kan |

A máa ń mú àwọn ètò bá ìlànà mu nípasẹ̀ `normalizeMemorySettings()`, a sì máa ń fi wọ́n pamọ́ sínú àkọ́jọ́ ìgbà díẹ̀ ní `getMemorySettings()`.

### Ìṣàn Ìpilẹ̀ṣẹ̀

```
Ìbẹ̀rẹ̀ ètò-ìṣàmúlò
  → Àwọn ìgbéwọlé index.ts (ipa-ẹgbẹ́): forúkọsílẹ̀ SQLiteBackend
  → A pe initMemoryBackends() láti inú ìyípo ìgbésí-ayé ètò-ìṣàmúlò:
      1. Gbé àwọn ètò wọlé (getMemorySettings)
      2. Ṣètò ẹ̀yìn àkọ́kọ́ + àfirọ́pò
      3. Pilẹ̀ṣẹ̀ gbogbo àwọn ẹ̀yìn (àyẹ̀wò ìlera)
      4. Ṣetán fún àwọn ìbéèrè
```

### Fífi Ẹ̀yìn Tuntun Kún Un

1. **Ṣàmúlò atọ́kùn `MemoryBackend`** nínú `src/lib/memory/<name>Backend.ts`
2. **Gbé jáde** láti `src/lib/memory/index.ts`
3. **Forúkọsílẹ̀** pẹ̀lú `memoryManager.register(yourBackend)` nígbà ìbẹ̀rẹ̀
4. **Ṣètò** nípasẹ̀ àwọn ètò: ṣètò `memoryPrimaryBackend` sí ID ẹ̀yìn rẹ
5. **Dán wò** pẹ̀lú `src/lib/memory/__tests__/generic-backend.test.ts` gẹ́gẹ́ bí àpẹẹrẹ ìtọ́kasí

#### Àpẹẹrẹ: Ẹ̀yìn Brain

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

### Ìjẹ́rìísí

#### Àwọn ìdánwò ẹyọ

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Àbájáde tí a retí: **ìdánwò 35, gbogbo wọn kọjá** tí ó bo:

- Olùkọ́lé (2)
- Àyẹ̀wò ìlera (4) — àṣeyọrí, ìkùnà 500, àṣìṣe nẹ́tíwọ́ọ̀kì, ìdádúró
- Ìpilẹ̀ṣẹ̀ (2) — àṣeyọrí, ìkùnà
- Ṣẹ̀dá (2) — ojú-ọ̀nà àìyípadà, ojú-ọ̀nà àkànṣe
- Gbà (4) — àṣeyọrí, 404 → null, àìṣe-404 ju àṣìṣe jáde, àwọn àlàyé ipa-ọ̀nà àkànṣe
- Ṣe ìmúdójúìwọ̀n (2) — àṣeyọrí, 404 → false
- Pa rẹ́ (2) — àṣeyọrí, 404 → false
- Ṣe àkójọ (2) — àwọn àlàyé ìbéèrè, àwọn orúkọ àlàyé àkànṣe
- Wá (3) — àwọn àlàyé ìbéèrè, ojú-ọ̀nà àkànṣe, yíyí àwọn àṣàyàn padà sí ọ̀wọ̀ọ̀wọ́
- Àwọn àkọlé ìfàṣẹsí (2) — tóókì Bearer, àwọn àkọlé àkànṣe
- Ilé-iṣẹ́ ìṣẹ̀dá (1)

#### Àyẹ̀wò irú

```bash
npm run typecheck:core
```

Àbájáde tí a retí: **àṣìṣe 0**.
