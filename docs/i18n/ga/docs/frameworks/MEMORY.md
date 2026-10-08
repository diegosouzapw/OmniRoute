# Memory System (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Foinse na fírinne:** `src/lib/memory/` agus `src/app/api/memory/`
> **Nuashonraithe an uair dheireanach:** 2026-06-28 — v3.8.40 (díchumasaithe de réir réamhshocraithe + cúiteamh cainníochtaithe int8)

Soláthraíonn OmniRoute cuimhne chomhrá mharthanach atá eochraithe de réir eochair API
(agus, go roghnach, de réir aitheantas seisiúin). Baintear cuimhní go huathoibríoch as freagraí LLM
trí mheaitseáil éadrom patrún le sloinn rialta agus instealltar ar ais iad in iarratais
ina dhiaidh sin mar theachtaireacht tosaigh córais (nó mar an chéad teachtaireacht úsáideora i gcás soláthraithe a
dhiúltaíonn do ról an chórais).

> **Tá an chuimhne MÚCHTA de réir réamhshocraithe (v3.8.30+).** Tá `DEFAULT_MEMORY_SETTINGS.enabled`
> anois `false` (`src/lib/memory/settings.ts`). Nuair a chumasaítear an chuimhne, instealltar suas le
> `maxTokens` (~2k) de chomhthéacs aisghafa isteach i **ngach** iarratas comhrá, agus
> gearrtar táille air sin — costas gan choinne do shuiteálacha nua agus do chliaint a bhainistíonn a
> gcomhthéacs féin. Roghnaigh é go sainráite faoi **Socruithe → Cuimhne** (taispeánann
> `MemorySkillsTab` glao amach rabhaidh faoi chostas comharthaí nuair atá an chuimhne cumasaithe).
> Is féidir le cliant roghnú gan cuimhne a úsáid d'iarratas aonair leis an gceanntásc iarratais
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — féach an tábla ceanntásca iarratais in
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Socraíonn iarratas gan chuimhne
> `memoryOwnerId = null`, rud a dhíchumasaíonn instealladh **cuimhne agus scileanna araon** don
> iarratas sin (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Tá an chuimhne **scópáilte de réir eochair API**, ní de réir úsáideora — roinneann gach iarratas atá fíordheimhnithe
leis an eochair API chéanna an linn chuimhne chéanna, agus is féidir í a scóipeáil tuilleadh go roghnach
de réir `sessionId`.

## Ailtireacht

```
Cliant → /v1/chat/completions (apiKeyInfo réitithe níos luaithe sa sruth)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # baintear an t-aitheantas
    → getMemorySettings()                     # socruithe taiscthe
    → shouldInjectMemory(body, {enabled})     # geata
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + veicteoir roghnach
    → injectMemory(body, memories, provider)  # teachtaireacht córais nó úsáideora
  → glao chuig an soláthraí réamhtheachtach
  → ar fhreagra: extractFacts(text, apiKeyId, sessionId)  # neamhbhacach
    → setImmediate → createMemory(fact) do gach meaitseáil
                   → embed(content) + upsertVector(id, vec)
```

Tá suíomhanna glaoite an insteallta agus na hasbhainte sreangaithe in
`open-sse/handlers/chatCore.ts` (cuardaigh `retrieveMemories`, `injectMemory`,
agus `extractFacts`).

## Ailtireacht an innill (réiteach 3 shraith)

Réitíonn an tInneall Cuimhne an chonair aisghabhála ag am rite bunaithe ar an
mbonneagar agus na socruithe atá ar fáil. Tá trí shraith ann, a chuirtear i bhfeidhm in ord tosaíochta:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  SRAITH 0 — Eochairfhocail (FTS5)                           │
  │  Infhaighteacht bunaithe ar thástáil: FTS5 nuair a          │
  │  thacaíonn an leagan SQLite leis (better-sqlite3 /           │
  │  node:sqlite / bun:sqlite); níl sé ar fáil ar leaganacha     │
  │  gan FTS5 (m.sh. sql.js/WASM — "no such module: fts5").      │
  │  Úsáidtear é nuair atá strategy = "exact" nó mar chúltaca;   │
  │  léiríonn keyword i stádas an innill toradh na tástála.      │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  SRAITH 1 — Veicteoir Leabaithe (sqlite-vec)                 │
  │  sqlite-vec v0.1.9 luchtaithe trí db.loadExtension().        │
  │  KNN fórsa brúid thar veicteoirí Float32. Gníomhach nuair:   │
  │   • a éiríonn le loadExtension sqlite-vec                    │
  │   • atá foinse leabaithe ar fáil (remote | static |          │
  │     transformers) atá in ann Float32Array a tháirgeadh       │
  │   • atá an tábla vec_memories ann (cruthaithe ar an gcéad    │
  │     ready())                                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  SRAITH 2 — Qdrant (bunachar sonraí veicteoirí seachtrach    │
  │  roghnach)                                                   │
  │  Nuair a chumasaítear é, tagann sé in ionad sqlite-vec le    │
  │  haghaidh semantic/hybrid. Teastaíonn ásc Qdrant atá ag      │
  │  rith + óstríomhaire/port cumraithe.                         │
  └─────────────────────────────────────────────────────────────┘
```

Tarlaíonn díghrádú go huathoibríoch agus go trédhearcach:

- Má theipeann ar sqlite-vec luchtú, níl sraith 1 ar fáil → titeann sé siar go sraith 0.
- Má chuireann an fhoinse leabaithe earráid ar ais, titeann sraith 1 siar go sraith 0.
- Mura bhfuil Qdrant sláintiúil, titeann sraith 2 siar go sraith 1 (nó go sraith 0 mura bhfuil sraith 1
  ar fáil ach an oiread).

## Foinsí leabaithe

Réitíonn an tsraith leabaithe (`src/lib/memory/embedding/`) cén fhoinse atá le húsáid
bunaithe ar `MemorySettingsExtended.embeddingSource`:

| Foinse         | Cur síos                                                                           | Eochair de dhíth | Tosú fuar        |
| -------------- | ---------------------------------------------------------------------------------- | ---------------- | ---------------- |
| `remote`       | Úsáideann sé API leabaithe soláthraí cumraithe (OpenAI, Cohere, etc.)              | Tá               | Dada             |
| `static`       | Leabú tábla cuardaigh logánta trí `potion-base-8M` (WordPiece + meán-chomhthiomsú) | Níl              | ~200ms           |
| `transformers` | Tátal ONNX logánta trí `@huggingface/transformers` v4, `all-MiniLM-L6-v2`          | Níl              | ~3s + ~400MB RAM |
| `auto`         | Réiteach ag am rite: cianda (má tá eochair ann) → statach → claochladáin → null    | Braitheann sé    | Braitheann sé    |

**Ord réitigh do `auto`:**

1. Aimsigh an chéad soláthraí in `listEmbeddingProviders()` a bhfuil `hasKey === true` aige → `remote`.
2. Má tá `settings.staticEnabled === true` → `static`.
3. Má tá `settings.transformersEnabled === true` → `transformers`.
4. Seachas sin → `null` (téann sé i léig go cuardach eochairfhocal FTS5).

Úsáideann an taisce leabaithe (`src/lib/memory/embedding/cache.ts`) léarscáil LRU
sa chuimhne, eochraithe de réir `${source}:${model}:${dim}:${sha256(text)}`, atá teoranta
do `MEMORY_EMBEDDING_CACHE_MAX` iontráil (1000 de réir réamhshocraithe) le TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (5 nóiméad de réir réamhshocraithe). Comhroinntear í idir gach glaoiteoir
ar feadh shaolré an phróisis.

## RRF hibrideach (k=60)

Nuair atá `strategy = "hybrid"` agus an stór veicteoirí ar fáil, úsáideann an aisghabháil
Comhleá Rang Cómhalartach chun torthaí FTS5 agus veicteora a chumasc:

```
RRF(d) = Σ  1 / (k + rank_i(d))      áit a bhfuil k = 60 (inchumraithe trí MEMORY_RRF_K)
          i
```

Go sonrach:

1. Rith cuardach FTS5 → liosta rangaithe `R_fts` (suíomh 1..N).
2. Rith cuardach veicteora KNN → liosta rangaithe `R_vec` (suíomh 1..M).
3. I gcás gach `memoryId` uathúil:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 mura bhfuil sé ar an liosta).
4. Sórtáil de réir `rrf_score` DESC, cuir an tsiúlóid bhuiséid comharthaí i bhfeidhm.

Is eol go forleathan go bhfuil RRF éifeachtach gan gá le normalú scóir trasna
córais aisghabhála ilchineálacha. Tagann an `k=60` réamhshocraithe ón mbunpháipéar
le Cormack et al. agus oibríonn sé go maith do chorpas beag (<10k cuimhne).

## Aislíonadh (leisciúil + athinnéacsú)

Nuair a athraíonn an tsamhail leabaithe (braite trí `embedding_signature`), atógtar an
stór veicteoirí agus marcáiltear gach cuimhne atá ann cheana le
`needs_reindex = 1` sa tábla `memories`.

**Aislíonadh leisciúil**: Ar an gcéad aisghabháil eile, leabaítear aon chuimhne nach bhfuil
iontráil veicteora aici agus cuirtear isteach in `vec_memories` í sula ritear an cuardach. Déanann sé seo
costas an aislíonta a amúchadh thar fhíoriarratais gan an tosú a bhlocáil.

**Athinnéacsú sainráite**: Soláthraíonn cluaisín an Innill in `/dashboard/memory`
cnaipe "Athinnéacsaigh Anois" a ghlaonn `POST /api/memory/reindex`. Glaonn an láimhseálaí
`runReindexBatch()` ó `src/lib/memory/reindex.ts`, a phróiseálann suas le
`limit` iontráil ar feitheamh in aghaidh an iarratais. Is féidir dul chun cinn a sheiceáil go tréimhsiúil trí
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Stórálann an tábla `memory_vec_meta` (aistriú `083_memory_vec.sql`):

- `active_dim` — tois veicteora reatha (null = gan chalabrú fós).
- `embedding_signature` — `${source}:${model}:${dim}` a úsáidtear chun athruithe a bhrath.
- `last_reset_at` — stampa ama an athshocraithe iomláin dheireanaigh.
- `vec_loaded` — bratach 0/1 a léiríonn ar lódáladh sqlite-vec go rathúil.

## Síneadh socruithe

Tá naoi réimse leabaithe agus veicteora ar fáil in `MemorySettingsExtended` in
`src/shared/schemas/memory.ts`, agus déantar iad a bhuanú trí `src/lib/db/settings.ts`:

| Réimse                   | Cineál                                             | Réamhshocrú | Cur síos                                                             |
| ------------------------ | -------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`    | An fhoinse leabaithe atá le húsáid                                   |
| `embeddingProviderModel` | `string \| null`                                   | `null`      | Soláthraí/samhail i bhformáid `provider/model`                       |
| `customBaseUrl`          | `string \| null`                                   | `null`      | Bun-URL críochphointe comhoiriúnach le OpenAI, don chuimhne amháin   |
| `customModelId`          | `string \| null`                                   | `null`      | Aitheantas na samhla a sheoltar chuig an gcríochphointe saincheaptha |
| `transformersEnabled`    | `boolean`                                          | `false`     | Rogha chun Transformers.js a úsáid (MiniLM, ~400MB)                  |
| `staticEnabled`          | `boolean`                                          | `false`     | Rogha chun samhail áitiúil statach potion-base-8M a úsáid            |
| `rerankEnabled`          | `boolean`                                          | `false`     | Cumasaigh céim athrangaithe (cuireann sé +200-500ms/req leis)        |
| `rerankProviderModel`    | `string \| null`                                   | `null`      | Soláthraí/samhail athrangaithe i bhformáid `provider/model`          |

Déantar `rerankProviderModel` a réiteach le `POST /v1/rerank` (a ghlaoitear thar loopback), mar sin glacann sé le haon rud a nglacann an bealach sin leis: samhail athrangaithe néil roghnaithe (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) nó nód soláthraí atá comhoiriúnach le OpenAI mar `<node-prefix>/<model>` (m.sh. `skilled-mini/bge-reranker-v2-m3` do bhosca TEI/Infinity). Bíonn nóid loopback incháilithe i gcónaí; i gcás nód ar óstach eile (LAN, Tailscale), teastaíonn an bhratach ghné `RERANK_REMOTE_PROVIDER_NODES` freisin agus ní mór dó polasaí URL amach an tsoláthraí a chomhlíonadh — féach [Bratacha Gné](../reference/FEATURE_FLAGS.md). Liostaíonn roghnóir an deais soláthraithe roghnaithe chomh maith le nóid áitiúla; is féidir aon teaghrán bailí `provider/model` a shocrú go díreach trí `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | An t-inneall veicteora atá le húsáid |

Nochtar iad seo trí `GET /PUT /api/settings/memory` (scéimre `MemorySettingsExtendedSchema`).

Maidir leis an bhfoinse `remote`, glacann Memory leis na socruithe roghnacha `customBaseUrl` agus
`customModelId` freisin. Le chéile, roghnaíonn siad críochphointe `/embeddings`
atá comhoiriúnach le OpenAI agus samhail gan an chlárlann leabaithe dhomhanda a athrú. Déantar an críochphointe a
normalú sula n-úsáidtear é agus seiceálann polasaí URL amach an tsoláthraí é: tá HTTP(S)
riachtanach, diúltaítear do dhintiúir leabaithe agus do theaghráin iarratais, agus fanann
seoltaí meiteashonraí néil blocáilte. Caomhnaíonn luachanna folmha an soláthraí clárlainne roghnaithe. Déantar earráidí
a chuirtear ar ais chuig an deais a shláintiú agus ní logáiltear dintiúir críochphointe riamh.

> **LE DÉANAMH (D20):** Níl an scóip `global` (cuimhní a chomhroinnt thar gach eochair API)
> curtha i bhfeidhm san eisiúint seo. Teastaíonn athruithe scéimre agus conair aisghabhála
> dhomhanda uaithi. Rianaigh ar leithligh í.

## Sraitheanna Stórála

### Príomhshraith: SQLite (tábla `memories`)

Cruthaithe leis an ascnamh `015_create_memories.sql`:

| Colún                       | Cineál             | Nótaí                                                                              |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID ginte trí `crypto.randomUUID()`                                               |
| `api_key_id`                | `TEXT NOT NULL`    | Eochair API úinéireachta                                                           |
| `session_id`                | `TEXT`             | Scóip roghnach in aghaidh an chomhrá                                               |
| `type`                      | `TEXT NOT NULL`    | Ceann de `factual`, `episodic`, `procedural`, `semantic`                           |
| `key`                       | `TEXT`             | Eochair upsert chobhsaí, m.sh. `preference:i_prefer_python`                        |
| `content`                   | `TEXT NOT NULL`    | Téacs iarbhír na fírice                                                            |
| `metadata`                  | `TEXT`             | Blob JSON (catagóir, extractedAt, foinse, ...)                                     |
| `created_at` / `updated_at` | `TEXT`             | Teaghráin ISO 8601                                                                 |
| `expires_at`                | `TEXT`             | Dul in éag roghnach; ciallaíonn `NULL` buan                                        |
| `memory_id`                 | `INTEGER UNIQUE`   | Curtha leis ag `023_fix_memory_fts_uuid.sql` chun UUIDanna ↔ rowids FTS5 a nascadh |

Innéacsanna: `api_key_id`, `session_id`, `type`, `expires_at`, chomh maith leis an innéacs uathúil
`memory_id`.

**Séimeantaic upsert**: Lorgaíonn `createMemory()` ró atá ann cheana leis an
`(api_key_id, key)` céanna agus nuashonraíonn sé san áit é nuair a aimsítear é (`metadata` á chumasc trí
leathadh éadomhain). Cuireann sé seo cosc ar an tábla fás gan teorainn de bharr ráitis
rogha a dhéantar arís agus arís eile.

### Cuardach lántéacs (`memory_fts` tábla fíorúil)

Cruthaíonn `022_add_memory_fts5.sql` tábla fíorúil FTS5 thar `content` agus
`key`. Réitíonn `023_fix_memory_fts_uuid.sql` fabht ón bhfíorshaol nár nasc
an phríomheochair UUID le rowid slánuimhreach FTS5 — cuireann an t-ascnamh an colún
`memory_id` leis, athchruthaíonn sé an tábla FTS, agus nascann sé truicir
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) a choinníonn FTS sioncronaithe ar
INSERT, DELETE, agus UPDATE.

Úsáideann `retrieval.ts` é do na straitéisí `semantic` agus `hybrid` (féach thíos).
Cosnaíonn an cód aisghabhála é féin le `hasTable("memory_fts")` agus filleann sé ar
ord croineolaíoch má tá an tábla FTS ar iarraidh nó má chaitheann an t-iarratas FTS earráid.

### Roghnach: Qdrant (sraith 2 den stór veicteora)

Cuireann `src/lib/memory/qdrant.ts` comhtháthú roghnach Qdrant i bhfeidhm mar shraith 2
den stór veicteora. Ní threoraítear aisghabháil chuig Qdrant ach amháin nuair is é
`memoryVectorStore === "qdrant"` roghnóir an innill — ní roghnaíonn an réamhshocrú `"auto"` (ná `"sqlite-vec"`)
Qdrant **riamh**. Socraíonn an lasc i gcluaisín an Innill **an dá cheann**, `qdrantEnabled` agus
`memoryVectorStore`, le chéile: nuair a chumasaítear é, déantar Qdrant den phríomhstór; nuair a dhíchumasaítear é,
athshocraítear go `"auto"` é (#5597 — roimh an gceartúchán sin, ní raibh aon éifeacht leis an gcumasú mar níor
scríobh aon rud chuig roghnóir an innill). Mura féidir Qdrant a shroicheadh nó mura dtugann sé aon toradh ar ais, filleann an aisghabháil
ar sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — leabaigh `key + content` leis an tsamhail leabaithe
  chumraithe, cinntigh go bhfuil an bailiúchán ann (cruthaítear veicteoirí a úsáideann
  fad comhshínis ar an gcéad úsáid), agus ionsáigh nó nuashonraigh pointe leis an bpálasta
  `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — leabaigh an t-iarratas, cuardaigh an
  bailiúchán arna scagadh de réir `kind = "omniroute_memory"` agus, más gá, de réir
  `apiKeyId` / `sessionId`. Cuireann sé teorainn `[1, 20]` le `topK`.
- `deleteSemanticMemoryPoint(id)` — scriosadh pointe aonair. Glaonn
  `deleteMemory()` air tar éis an ró SQLite a bhaint (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — scrios pointí ar an mórchóir a bhfuil
  a `expiresAtUnix` san am atá thart nó a bhfuil a `createdAtUnix` níos sine ná an
  scoithphointe coinneála. Déantar iad a chomhaireamh ar dtús ionas gur féidir leis an
  deais na fíoruimhreacha a thaispeáint.
- `checkQdrantHealth()` — tóireadóir sláinte `GET /readyz` lena n-áirítear aga folaigh.

Nochtann comhéadan úsáideora na socruithe cumraíocht Qdrant, seiceáil sláinte, tástáil
chuardaigh shéimeantaigh, agus glanadh sa **chluaisín Engine** de `/dashboard/memory`.
Tá na bealaí comhfhreagracha faoi `src/app/api/settings/qdrant/` uile sreangaithe ó v3.8.6 amach:

| Bealach                                 | Modh          | Cur síos                                     |
| --------------------------------------- | ------------- | -------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Léigh / nuashonraigh socruithe Qdrant        |
| `/api/settings/qdrant/health`           | `GET`         | Tóireadóir beochtachta + aga folaigh         |
| `/api/settings/qdrant/search`           | `POST`        | Tástáil chuardaigh shéimeantaigh             |
| `/api/settings/qdrant/cleanup`          | `POST`        | Bain pointí éagtha / seanphointí             |
| `/api/settings/qdrant/embedding-models` | `GET`         | Liostaigh na samhlacha leabaithe atá ar fáil |

**Nótaí iompair (cad ba cheart a bheith ag súil leis):**

- **Roghnú innill** — má chumasaítear Qdrant sa chluaisín Engine, is é an príomhstór
  é (socraítear `memoryVectorStore="qdrant"`); má dhíchumasaítear é, athshocraítear go
  `"auto"` é (#5597).
- **Gan aislíonadh** — ní scríobhtar chuige ach cuimhní a chruthaítear/a nuashonraítear
  **tar éis** Qdrant a chumasú (déscríobh gan fanacht ar thoradh). **Ní** aistrítear
  cuimhní SQLite a bhí ann cheana; ní atógann "Reindex Now" ach an t-innéacs sqlite-vec,
  ní Qdrant.
- **Braitear toise an veicteora go huathoibríoch** ón leabú iarbhír ar an gcéad úsáid —
  níl aon réimse toise le líonadh isteach. **Ní** láimhseáiltear go huathoibríoch athrú
  na samhla leabaithe tar éis bailiúchán a chruthú: fágtar an bailiúchán atá ann gan
  athrú, teipeann ar scríbhinní/cuardaigh nach bhfuil a dtoisí comhoiriúnach agus
  téitear ar ais chuig sqlite-vec. Athchruthaigh an bailiúchán (ainm nua, nó scrios é
  in Qdrant) chun leabaitheoirí a athrú.
- **Méadracht faid** — **Cosine** i gcónaí (crua-chódaithe agus an bailiúchán á chruthú;
  ní féidir í a chumrú).
- **Fíordheimhniú** — eochair API amháin (seoltar í mar an ceanntásc `api-key`;
  roghnach le haghaidh Docker logánta gan fhíordheimhniú). Ní úsáidtear JWT/RBAC.
- **Réimsí cumraíochta** — nochtann an comhéadan úsáideora `host`, `port`, `collection`,
  `embeddingModel`, `apiKey`. Is don timpeallacht/DB amháin iad `vectorSize` /
  `hnswEfConstruct`, agus ní úsáidtear `vectorSize` chun bailiúchán a chruthú
  (tagann an toise ón leabú).

### Cainníochtú veicteoirí (int8 — roghnach, an dá inneall)

Tacaíonn an dá inneall veicteoirí le **cainníochtú roghnach int8** chun lorg cuimhne
na veicteoirí stóráilte a laghdú (~4× níos lú ná Float32), ar chostas beag maidir le
haisghairm. Tá sé **díchumasaithe** de réir réamhshocraithe ar an dá cheann — fanann na
veicteoirí ag lánchruinneas mura gcumasaítear é go sainráite.

| Inneall    | Socrú                                    | Cineál                         | Réamhshocrú | An áit a léitear é                                          |
| ---------- | ---------------------------------------- | ------------------------------ | ----------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (eochair DB)        | `"none" \| "int8" \| "binary"` | `"none"`    | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (timpeallacht) | `"none" \| "int8"`             | `"none"`    | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- Cumraítear **Qdrant** de réir ásc tríd an eochair socraithe
  `qdrantQuantization` (nochta mar an réimse `quantization` ar
  `PUT /api/settings/qdrant`). Nuair is `"int8"` atá ann, iarrann
  `buildQuantizationConfig()` cainníochtú scálach (`always_ram`, candamh
  `0.99`) agus cumasaíonn cuardaigh `rescore: true` ionas go ndéanann na
  veicteoirí lánchruinnis beachtú ar thacar na n-iarrthóirí int8.
- Is **tríd an timpeallacht amháin** a chumraítear cainníochtú **sqlite-vec**
  (ní socrú DB é): socraigh `MEMORY_VEC_QUANTIZATION=int8` chun na veicteoirí
  logánta a stóráil mar cholún `int8[dim]` trí
  `vec_quantize_int8(?, 'unit')`. Cuirtear an mód roghnaithe san áireamh san
  `embedding_signature` (iarmhír `:int8`), mar sin spreagann athrú mód
  athinnéacsú iomlán ar an tábla `vec_memories` — an chonair chéanna
  leisciúil aislíonta a úsáidtear nuair a athraíonn an tsamhail leabaithe.

## Cineálacha Cuimhne

`MemoryType` (`src/lib/memory/types.ts`):

| Cineál       | Úsáidtear le haghaidh                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `factual`    | Sainroghanna, fíricí cobhsaí faoin úsáideoir, patrúin iompraíochta                                  |
| `episodic`   | Cinntí a bhaineann le tráth ar leith ("I chose Postgres")                                           |
| `procedural` | Cuimhne ar shreafaí oibre / treoracha (curtha in áirithe; níl aon uath-eastóscóir ann faoi láthair) |
| `semantic`   | Curtha in áirithe d’iontrálacha sa stór veicteoirí                                                  |

Tá straitéis aisghabhála `MemoryConfig` ar cheann de `exact`, `semantic`, nó `hybrid`,
agus tá an raon feidhme ar cheann de `session`, `apiKey`, nó `global`. Is é `apiKey`
an raon feidhme réamhshocraithe ó `getMemorySettings()`.

## Eastóscadh Fíricí (`extraction.ts`)

Tá an t-eastóscadh **bunaithe ar shloinn rialta**, ní ar LLM — ritheann sé sa phróiseas le
`setImmediate()` ionas nach gcuireann sé bac ar an sruth freagartha riamh:

- **Patrúin sainroghanna** → `MemoryType.FACTUAL`
  (m.sh. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Patrúin cinnidh** → `MemoryType.EPISODIC`
  (m.sh. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Patrúin iompraíochta** → `MemoryType.FACTUAL`
  (m.sh. `I usually …`, `I always …`, `I tend to …`)

Déantar gach meaitseáil a shláintiú (`trim`, comhdhlúthú spáis bháin, teorainn 500 carachtar),
a dhídhúbailt laistigh den bhaisc trí `factKey(category, content)` cobhsaí, agus
a stóráil trí `createMemory()` le meiteashonraí
`{category, extractedAt, source: "llm_response"}`. Cuirtear teorainn 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`) le téacs ionchuir — nuair atá sé níos faide, úsáidtear
**deireadh** an téacs ionas go gcuirtear an t-ábhar is déanaí ón gcúntóir san áireamh i gcónaí.

Easpórtáiltear `extractFactsFromText(text)` le haghaidh tástálacha agus tugann sé na fíricí
struchtúrtha ar ais gan iad a stóráil.

## Aisghabháil (`retrieval.ts`)

Is é `retrieveMemories(apiKeyId, config)` an príomhphointe iontrála. Déanann sé na nithe seo a leanas:

1. Normalaíonn agus bailíochtaíonn sé an chumraíocht trí `MemoryConfigSchema`.
2. Tugann sé `[]` ar ais láithreach nuair atá `enabled` bréagach nó nuair atá `maxTokens <= 0`.
3. Teorannaíonn sé `maxTokens` don raon `[1, 8000]`.
4. Aimsíonn sé an bhfuil an tábla nua-aimseartha `memories` ann (seachas an tábla oidhreachta `memory`)
   ionas go leanfaidh bunachair sonraí níos sine de bheith ag obair.
5. Tógann sé an bhun-iarratas le cosaint éaga
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), raon feidhme roghnach
   seisiúin, agus scoithphointe roghnach `retentionDays`.
6. Craobhaíonn sé de réir straitéise:
   - **`exact`** (réamhshocrú): `ORDER BY created_at DESC LIMIT 100` croineolaíoch.
   - **`semantic`**: má tá `config.query` ann agus má tá `memory_fts` ann, déanann sé JOIN ar
     `memory_fts MATCH ?` agus sórtálann sé de réir rangú FTS; filleann sé ar an ord croineolaíoch
     nuair a thugann FTS 0 ró ar ais.
   - **`hybrid`**: aontas de thorthaí FTS (ábharthacht níos airde) agus an tacar
     croineolaíoch, agus iad dídhúbailte de réir id.
7. Ríomhann sé scór ábharthachta eochairfhocal (`getRelevanceScore`) thar
   `content`, `key`, agus JSON `metadata` nuair a chuirtear iarratas ar fáil. Scagtar amach róanna
   a bhfuil scór nialais acu.
8. Sórtálann sé de réir scóir in ord íslitheach, ansin de réir `createdAt` in ord íslitheach.
9. Téann sé tríd an liosta rangaithe agus glacann sé le hiontrálacha fad a fhanann
   `estimateTokens(content)` reatha (≈ `length / 4`) faoi bhun an bhuiséid. Tugann sé
   iontráil amháin ar a laghad ar ais i gcónaí nuair atá meaitseáil ar bith ann.

Easpórtáiltear `estimateTokens` agus úsáideann aisghabháil, achoimriú, agus uirlis MCP
`omniroute_memory_search` é.

## Instealladh (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Nascann sé inneachar uile na gcuimhní in aon teaghrán amháin `Memory context: …`.
2. Roghnaíonn sé straitéis de réir ainm an tsoláthraí:
   - **Teachtaireacht chórais** (réamhshocrú do OpenAI, Anthropic, Gemini, …) — cuireann sé
     `{role: "system", content: memoryText}` roimh aon teachtaireachtaí córais
     atá ann cheana, ionas go mbeidh tosaíocht fós ag leideanna córais an úsáideora.
   - **Teachtaireacht úsáideora** (cúltaca) — do sholáthraithe in
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Diúltaíonn siad seo don ról córais
     agus thabharfaidís 400 murach sin (féach saincheist #1701 maidir le GLM/Zhipu).
3. Logálann sé an líon, an straitéis agus an tsamhail faoi `memory.injection.injected`.

Easpórtáiltear `providerSupportsSystemMessage(provider)` do ghlaoiteoirí ar gá dóibh
a gcinntí ródaithe féin a dhéanamh. Is é `true` an réamhshocrú do sholáthraithe
anaithnide (ceadaítear ról an chórais) ar mhaithe le sábháilteacht.

## Socruithe (`settings.ts`)

**Stóráiltear cumraíocht na cuimhne i dtábla socruithe an DB**, ní in athróga timpeallachta.
Léann `getMemorySettings()` ó `getSettings()` agus cuireann sé an toradh i dtaisce
laistigh den phróiseas; glaonn an bealach PUT socruithe ar
`invalidateMemorySettingsCache()` tar éis scríbhinní.

### Réimsí oidhreachta (gach leagan)

| Eochair DB            | Cineál  | Réamhshocrú                                          | Rialtán UI                                                          |
| --------------------- | ------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (múchta de réir réamhshocraithe ó v3.8.30)   | Cuimhne ar siúl/as                                                  |
| `memoryMaxTokens`     | integer | `2000` (raon `0–16000`)                              | Buiséad comharthaí don instealladh                                  |
| `memoryRetentionDays` | integer | `30` (raon `1–365`)                                  | Tréimhse choinneála                                                 |
| `memoryStrategy`      | enum    | `"hybrid"` (ceann de `recent`, `semantic`, `hybrid`) | Straitéis aisghabhála                                               |
| `skillsEnabled`       | boolean | `false`                                              | Scoránaíonn sé instealladh scile de réir eochrach (féach SKILLS.md) |

Nóta: mapálann straitéis UI `"recent"` chuig an straitéis aisghabhála inmheánach
`"exact"` trí `toMemoryRetrievalConfig()` (ord croineolaíoch).

### Réimsí nua (v3.8.6, plean 21 D9)

Féach freisin an rannán "Síneadh socruithe" thuas le haghaidh tuairiscí ar na réimsí.

| Eochair DB                  | Réimse API               | Réamhshocrú |
| --------------------------- | ------------------------ | ----------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`    |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`      |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`     |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`     |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`     |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`      |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`    |

Léann `normalizeQdrantConfig()` in `qdrant.ts` na heochracha DB a bhaineann le Qdrant
(`qdrantEnabled`, `qdrantHost`, `qdrantPort`, `qdrantApiKey`,
`qdrantCollection` leis an réamhshocrú `"omniroute_memory"`,
`qdrantEmbeddingModel` leis an réamhshocrú `"openai/text-embedding-3-small"`).

### Athróga timpeallachta (v3.8.6)

Tiúnálann sé athróg timpeallachta roghnacha iompar ama rite an innill (doiciméadaithe in `.env.example`):

| Athróg                          | Réamhshocrú                | Tuairisc                                                                                                                                             |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL thaisce na leabuithe (5 nóiméad)                                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Uaslíon iontrálacha i dtaisce LRU na leabuithe                                                                                                       |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Stór HF don tsamhail Transformers.js                                                                                                                 |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Stór HF don tsamhail statach potion                                                                                                                  |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | An áit ina stórálfar samhlacha íoslódáilte                                                                                                           |
| `MEMORY_VEC_TOP_K`              | `20`                       | Top-K réamhshocraithe do chuardach veicteora                                                                                                         |
| `MEMORY_RRF_K`                  | `60`                       | Tairiseach k RRF do chuardach hibrideach                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Socraigh go `int8` chun veicteoirí áitiúla sqlite-vec a stóráil cainníochtaithe (~4× níos lú; roghnach). Cuireann athrú móid athinnéacsú i bhfeidhm. |

## Achoimriú (`summarization.ts`)

Déanann `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` inneachar níos sine
a dhlúthú nuair a sháraíonn iomlán reatha na dtóiceán i gcuimhní eochrach an
buiséad. Téann sé trí na rónna in ord DESC de réir `created_at`, coinníonn sé na rónna a oireann, agus
don chuid eile cuireann sé na chéad trí abairt den bhunleagan in ionad `content`
san áit chéanna. Is é `tokensSaved` an difríocht in `estimateTokens` idir an seaninneachar agus
an t-inneachar nua.

Tá an gnáthamh seo **ar fáil ach ní ghlaoitear air go huathoibríoch** sa phíblíne
chomhrá reatha — glaoigh air ó cron, ó ghníomh riaracháin, nó ó
chód ceangail `MemoryConfig.autoSummarize` má theastaíonn dlúthú leanúnach uait. Is
aontreo é an caillteanas sonraí: déantar an buntéacs a fhorscríobh.

## REST API

Éilíonn gach críochphointe fíordheimhniú bainistíochta (`requireManagementAuth`).

### Croíchríochphointí cuimhne (reatha + nuashonraithe)

| Modh     | Conair               | Cur síos                                                                                                                                                                                                   |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Liosta le huimhriú leathanach agus scagairí: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Áirítear sa fhreagairt `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`      |
| `POST`   | `/api/memory`        | Cruthaigh iontráil (bailíochtaithe le Zod: `content`, `key`, agus `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` roghnach). Glaonn sé ar `createMemory()` a dhéanann upsert ar `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Faigh iontráil aonair de réir UUID                                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | Nuashonraigh réimsí na hiontrála (`type`, `key`, `content`, `metadata`). Corp: `MemoryUpdatePutSchema`. Sioncronaíonn sé an veicteoir freisin má tá foinse leabaithe ar fáil.                              |
| `DELETE` | `/api/memory/[id]`   | Scrios iontráil; scriosann sé ó `vec_memories` (D15) agus ó Qdrant ar bhonn na hiarrachta is fearr freisin. Tugann sé 404 ar ais nuair atá sí in easnamh.                                                  |
| `GET`    | `/api/memory/health` | Ritheann sé `verifyExtractionPipeline("health-check")` — cruthú→liostú→scriosadh timthriallach. Tugann sé `{working, latencyMs, error?}` ar ais                                                            |

### Críochphointí nua innill cuimhne (plean 21)

| Modh   | Conair                            | Cur síos                                                                                                                                                                                         |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/memory/retrieve-preview`    | Triail thirim ar `retrieveMemories` — tugann sí torthaí rangaithe ar ais lena scór, sraith agus tóic éin. Corp: `RetrievePreviewSchema`. NÍ dhéanann sí cuimhní a instealladh ná a mhodhnú.      |
| `GET`  | `/api/memory/embedding-providers` | Liostaíonn sé soláthraithe a bhfuil samhlacha leabaithe acu agus léiríonn sé cé acu a bhfuil eochair API cumraithe acu.                                                                          |
| `GET`  | `/api/memory/engine-status`       | Tugann sé stádas iomlán an innill ar ais: sraith eochairfhocal, réiteach leabaithe, staitisticí an stóir veicteoirí, sláinte Qdrant, cumraíocht athrangaithe. Cruth: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Cuir dlúthú cuimhne ar siúl de láimh. Corp: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Tugann sé `{candidates, tokensSaved}` ar ais.                                      |
| `POST` | `/api/memory/reindex`             | Cuir athinnéacsú veicteoirí ar siúl do chuimhní a bhfuil `needs_reindex=1` acu. Corp: `MemoryReindexSchema` (`force`). Tugann sé `{started, pending}` ar ais.                                    |

### Críochphointí socruithe

| Modh   | Conair                                  | Cur síos                                                                                                           |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | An `MemorySettingsExtended` normalaithe reatha (7 réimse nua + réimsí oidhreachta)                                 |
| `PUT`  | `/api/settings/memory`                  | Nuashonraigh aon réimse ó `MemorySettingsExtendedSchema` (12 réimse san iomlán)                                    |
| `GET`  | `/api/settings/qdrant`                  | Socruithe reatha Qdrant (`QdrantSettingsSchema`)                                                                   |
| `PUT`  | `/api/settings/qdrant`                  | Nuashonraigh socruithe Qdrant. Corp: `QdrantSettingsUpdateSchema`. Baineann `apiKey` = teaghrán folamh an eochair. |
| `GET`  | `/api/settings/qdrant/health`           | Tóireadóir beocht in aghaidh na hásáide cumraithe Qdrant. Tugann sé `QdrantHealthResultSchema` ar ais.             |
| `POST` | `/api/settings/qdrant/search`           | Tástáil chuardaigh shéimeantaigh in aghaidh Qdrant. Corp: `QdrantSearchSchema` (`query`, `topK`).                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Bain pointí Qdrant le haghaidh cuimhní atá imithe in éag / sean.                                                   |
| `GET`  | `/api/settings/qdrant/embedding-models` | Liostaigh samhlacha leabaithe atá ar fáil do Qdrant.                                                               |

Tacaíonn iarratas liosta `/api/memory` le huimhriú leathanach bunaithe ar `page`
(`parsePaginationParams`) **nó** `offset` amh — nuair atá `offset` i láthair bíonn
tosaíocht aige agus ríomhtar `page` díorthaithe do chruth na freagartha.

## Uirlisí MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Nuair atá an freastalaí MCP cumasaithe, cláraítear trí uirlis chuimhne:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → timfhilleann sé `retrieveMemories()`. Ó v3.8.6 (D16) amach, léitear an
  `strategy` ó `getMemorySettings()` seachas é a bheith códaithe go crua mar
  `"exact"`. Má chuirtear `query` ar fáil agus más `semantic` nó `hybrid` é
  `strategy`, úsáidtear an stór veicteoirí nuair atá sé ar fáil.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → timfhilleann sé `createMemory()`. Ní ghlacann sé ach leis na 4
  chineál chanónacha: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → liostaíonn sé
  iontrálacha comhoiriúnacha, scagann sé go roghnach iad de réir stampa ama
  cruthaithe-roimh, agus ansin scriosann sé gach ceann acu trí `deleteMemory()`
  (a bhaineann veicteoirí ó sqlite-vec + Qdrant freisin).

Féach [MCP-SERVER.md](./MCP-SERVER.md) le haghaidh sonraí iompair agus scóipe.

## Deais (Stiúideo Cuimhne)

Is **Stiúideo 3 chluaisín** anois é `src/app/(dashboard)/dashboard/memory/page.tsx`:

### Cluaisín: Cuimhní

- Cárta coincheapa (míniú infhillte "Conas a oibríonn sé").
- Liosta fíor-ama, cuardach agus uimhriú leathanach (moill mhaolaithe 300 ms).
- Scagaire cineáil (`factual` / `episodic` / `procedural` / `semantic` / uile).
- Mód- dialóg chun cuimhne a chur leis (eochair, ábhar, cineál).
- Eagarthóireacht inlíne (cnaipe peann luaidhe → `PUT /api/memory/[id]`).
- Scriosadh de réir ró (le dialóg deimhnithe).
- Easpórtáil JSON den leathanach reatha; iompórtáil JSON trí roghnóir comhaid.
- Cártaí staitisticí: `totalEntries`, `tokensUsed`, `hitRate`.
- Cnaipe "Dlúthaigh na seanchinn" → `POST /api/memory/summarize` (taispeánann
  an rith tástála líon na n-iarrthóirí ar dtús, agus deimhnítear ansin é).
- Ponc sláinte glas/dearg atá á thiomáint ag `GET /api/memory/health`.

### Cluaisín: Clós Súgartha

- Ionchur iarratais + roghnóir straitéise (Beacht / Séimeantach / Hibrid) +
  buiséad comharthaí.
- "Insamhail" → `POST /api/memory/retrieve-preview` — taispeánann sé torthaí
  rangaithe ina bhfuil `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Painéal réitigh a thaispeánann cén fhoinse leabaithe / stór veicteoirí a
  úsáideadh agus ar tharla cúlú.

### Cluaisín: Inneall

- Painéal stádais innill (slis FTS5 eochairfhocal, slis leabaithe, slis stór
  veicteoirí, slis sláinte Qdrant, slis athrangaithe).
- Cnaipe "Athinnéacsaigh Anois" → `POST /api/memory/reindex`.
- Roghnóir foinse leabaithe (uathoibríoch / cianda / statach / claochladáin +
  lascáin).
- Cárta cumraíochta Qdrant (lasc cumasaithe, óstach/port/bailiúchán/eochair,
  tástáil naisc, tástáil chuardaigh shéimeantaigh, glantachán).
- Cárta cumraíochta athrangaithe (lasc cumasaithe, roghnóir soláthraí/samhla).

Tá socruithe Cuimhne agus Qdrant ar fáil freisin faoi
`/dashboard/settings → Cuimhne & Scileanna` (`MemorySkillsTab.tsx`) don
chomhéadan socruithe oidhreachta/domhandaithe.

## Taisceadh

Coinníonn `src/lib/memory/store.ts` taisce ar nós LRU laistigh den phróiseas
(`MEMORY_CACHE_TTL = 1 nóim`, `MEMORY_MAX_CACHE_SIZE = 500`, agus díshealbhú
an 20 % is sine) do léamha `getMemory(id)`, chomh maith le sraith ghinearálta
eochrach/luacha `memoryCache` (`src/lib/memory/cache.ts`) ina bhfuil modhanna
`get`/`set`/`invalidate`, a úsáideann glaoiteoirí ar mian leo a dtaisce
scóipithe féin a bheith acu (LRU 1 000 iontráil, TTL réamhshocraithe 5 nóim).

## Príobháideachas & Saolré

- Is é aitheantas na heochrach API úinéir na cuimhne (`resolveMemoryOwnerId` in
  `chatCore.ts`). Gan `apiKeyInfo.id`, ní ritheann aisghabháil, instealladh
  ná eastóscadh.
- Scagtar iontrálacha a bhfuil `expires_at` acu amach as an aisghabháil má tá an dáta sin sa todhchaí; fágtar seaniontrálacha
  atá níos sine ná `retentionDays` as an áireamh leis an gclásal
  `created_at >= cutoff` in `retrieveMemories`.
- Le haghaidh buanscriosta, úsáid `DELETE /api/memory/[id]` nó `omniroute_memory_clear`.
- Déantar eastóscadh gan fanacht le toradh trí `setImmediate`; logáiltear teipeanna faoi
  `memory.extraction.background.failed` agus ní nochtar don ghlaoiteoir iad riamh.
- Glanann turais iomlána fíoraithe (`verifyExtractionPipeline`) a gcuid
  iontrálacha tástála féin i mbloc `finally`.

## Féach Freisin

- [SKILLS.md](./SKILLS.md) — insteallann an socrú `skillsEnabled` sainmhínithe uirlisí
  taobh leis an gcuimhne.
- [MCP-SERVER.md](./MCP-SERVER.md) — iompar / scóip MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — dromchla API níos leithne.
- Modúil foinse:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF hibrideach
  - `src/lib/memory/embedding/index.ts` — sraith leabaithe ilfhoinsí
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — scéimeanna Zod do gach corp API cuimhne
  - `src/shared/schemas/qdrant.ts` — scéimeanna Zod do shocruithe/oibríochtaí Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD do `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + fofobhealaí
  - `src/app/(dashboard)/dashboard/memory/` — comhéadan úsáideora Studio (leathanach + comhpháirteanna +
    cluaisíní + crúcaí)
  - `open-sse/handlers/chatCore.ts` (sreangú insteallta / eastósctha)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Soláthraí Leabaithe a Roghnú (v3.8.16+)

Tacaíonn inneall cuimhne OmniRoute le **ceithre fhoinse leabaithe** (`src/lib/memory/embedding/`). Tá comhbhabhtálacha éagsúla ag gach ceann acu maidir le **foighne, costas, cáilíocht samhla, agus castacht socraithe**.

### Na Foinsí Leabaithe

| Soláthraí      | Foinse                                                | Foighne                                    | Costas                  | Cáilíocht                                  | Socrú                                       |
| -------------- | ----------------------------------------------------- | ------------------------------------------ | ----------------------- | ------------------------------------------ | ------------------------------------------- |
| `transformers` | Samhail áitiúil ONNX (Xenova/all-MiniLM-L6-v2)        | ~50-150ms (LAP)                            | Saor in aisce           | Maith                                      | `npm install` amháin                        |
| `static`       | Veicteoirí réamhríofa (taiscithe)                     | <1ms                                       | Saor in aisce           | N/B (ag brath ar amas taisce)              | Dada                                        |
| `remote`       | API OpenAI / Cohere / Voyage                          | ~100-300ms                                 | $0.02-0.10/1M comhartha | Ar fheabhas                                | Eochair API                                 |
| `auto`         | Roghnaíonn an fhoinse is fearr atá ar fáil ag am rite | Mar an gcéanna leis an bhfoinse roghnaithe | Saor in aisce           | Mar an gcéanna leis an bhfoinse roghnaithe | Dada                                        |
| _(taisce)_     | Sraith LRU sa chuimhne thar aon fhoinse               | <1ms (amas), foighne iomlán (teip)         | Saor in aisce           | Mar an gcéanna leis an mbunfhoinse         | Ar siúl i gcónaí (ní foinse inroghnaithe í) |

### Crann Cinntí

```
                  Cad é comhthéacs d'imlonnaithe?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  FORBR./TÁST. TÁIRG. BHEAG TÁIRG. MHÓR   IMEALL / AS LÍNE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (saor, gan API)           (cáilíocht is fearr) (gan idirlíon)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            CUIR sraith `cache` ar a bharr I GCÓNAÍ
            (timfhilleann LruCache aon soláthraí)
```

### Cumraíocht Bunachair Sonraí & API

Cumraítear roghanna leabaithe cuimhne tríd an API/comhéadan úsáideora Socruithe, ní trí athróga timpeallachta. Is iad seo na heochracha ábhartha sa bhunachar sonraí socruithe faoi Shocruithe (`normalizeMemorySettings` in `src/lib/memory/settings.ts`):

- `memoryEmbeddingSource`: `"transformers"` (áitiúil), `"remote"` (bunaithe ar API, e.g. OpenAI), `"static"` (stór seachtrach), nó `"auto"`
- `memoryEmbeddingProviderModel`: Aitheantóir samhla d'fhoinsí cianda/statacha (e.g., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, nó `"auto"`

#### Samhail Áitiúil (`transformers`)

Úsáideann sé transformers.js go hinmheánach chun samhlacha áitiúla a rith:

```bash
# Athróga timpeallachta a léitear sa chód (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Stór samhla HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Samhail statach potion HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Comhadlann taisce
```

#### Taisce Leabaithe LRU

Bíonn an taisce ar siúl de réir réamhshocraithe i gcónaí agus cumraítear í trí athróga timpeallachta:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Uasmhéid míreanna taiscthe
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 nóiméad)
```

### Uimhreacha Feidhmíochta

Tagarmharc ar ghnáthfhreastalaí x86 4 chroí (téacsanna ~100 comhartha an ceann):

| Soláthraí            | p50   | p95   | p99   | Costas / 1M leabú                  |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (LAP) | 80ms  | 180ms | 350ms | Saor in aisce                      |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Ag brath ar óstáil Qdrant          |
| `cache` (aimsiú)     | <1ms  | <1ms  | 2ms   | Saor in aisce                      |

---

## Patrúin Eastósctha Fíoras (v3.8.16+)

Úsáideann an modúl `extraction.ts` (`src/lib/memory/extraction.ts`) **meaitseáil patrún le sloinn ionadaíochta** chun fíorais struchtúrtha a eastóscadh as teachtaireachtaí comhrá. Má thuigeann tú na patrúin seo, cabhróidh sé leat cáilíocht an eastósctha a choigeartú do do chás úsáide.

### Catagóirí Réamhshocraithe Patrún

| Catagóir            | Patrún samplach                                                                | A ngabhann sé                    |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------------- |
| PREFERENCE_PATTERNS | `"Is fearr liom <X>"`, `"Is maith liom <X>"`, `"Is fuath liom <X>"`            | Sainroghanna úsáideora           |
| DECISION_PATTERNS   | `"Úsáidfidh mé <X>"`, `"Chinn mé <X> a dhéanamh"`, `"Roghnaigh mé <X>"`        | Cinntí úsáideora (eipeasóideach) |
| PATTERN_PATTERNS    | `"De ghnáth déanaim <X>"`, `"Déanaim <X> i gcónaí"`, `"Ní dhéanaim <X> riamh"` | Patrúin iompraíochta bhuana      |

### Patrúin Shamplacha (Simplithe)

```ts
// Ó src/lib/memory/extraction.ts
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

### An Méid a Eastósctar

Nuair a deir úsáideoir:

> "Is fearr liom TypeScript. Úsáidfidh mé Postgres don tionscadal seo. Déanaim commit i gcónaí sula ndéanaim push. Ní maith liom Python."
> Cruthaíonn an t-eastóscadh 4 chuimhne:
>
> | Eochair                              | Catagóir  | Cineál        | Ábhar                         |
> | ------------------------------------ | --------- | ------------- | ----------------------------- |
> | `preference:typescript`              | sainrogha | fíorasach     | "TypeScript"                  |
> | `decision:postgres_for_this_project` | cinneadh  | eipeasóideach | "Postgres don tionscadal seo" |
> | `pattern:commit_before_pushing`      | patrún    | fíorasach     | "commit sula ndéantar push"   |
> | `preference:python`                  | sainrogha | fíorasach     | "Python"                      |

### Teorainneacha Eastósctha

Chun eastóscadh gan srian a chosc, tá feidhm ag na teorainneacha seo a leanas:

| Íosfhad ábhair | 3 charachtar |
| Uasfhad ábhair | 500 carachtar |

### Cathain is Ceart Eastóscadh a Dhíchumasú

Ritear an t-eastóscadh go huathoibríoch aon uair a bhíonn an chuimhne cumasaithe; níl aon scorán ar leith ann don eastóscadh amháin. Chun é a mhúchadh, díchumasaigh an chuimhne go hiomlán (`enabled: false`
trí `PUT /api/settings/memory`). Smaoinigh ar é sin a dhéanamh sna cásanna seo:

- Tá líon mór teachtaireachtaí agat agus níl costas an eastósctha beag
- Is comhráite neamhbhuana den chuid is mó atá agat (comhrá, dífhabhtú), gan luach fadtéarmach
- Tá comhthéacs á ghabháil agat cheana féin trí bhreiseáin shaincheaptha

---

## Tiúnadh RRF Hibrideach (v3.8.16+)

Comhcheanglaíonn an t-algartam **Comhleá Cómhalartach Ranguithe (RRF)** torthaí FTS5 (eochairfhocail) agus veicteora (séimeantacha). Rialaíonn an paraiméadar `k` an méid meáchain a thugtar do thorthaí atá níos ísle sa rangú.

### An Fhoirmle

I gcás gach cuimhne iarrthóra, is é an scór RRF:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Áit a bhfuil:

- Is é `k` an tairiseach (60 de réir réamhshocraithe)
- Is é `rank_i(d)` rang na cáipéise `d` sa i-ú córas aisghabhála (FTS, veicteoir)
- Ríomhtar an tsuim thar na córais aisghabhála go léir

### An Tionchar a Imríonn `k` ar Thorthaí

| Luach `k`                | Éifeacht                                                                                                            | Is fearr dó                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `k=0`                    | Comhleá ranguithe íon (gan aon smúdáil)                                                                             | Bonnlíne theoiriciúil                                |
| `k=10-30`                | Tugtar meáchan mór do na torthaí is airde; is beag a chuireann rang íseal leis                                      | Nuair is gnách go mbíonn na 3 thoradh is airde ceart |
| **`k=60`** (réamhshocrú) | Cothromaithe — cuireann na 10 dtoradh is airde go suntasach leis                                                    | Aisghabháil ilchuspóireach                           |
| `k=100+`                 | Níos cothroime — féadfaidh fiú torthaí ísealrangaithe forlámhas a fháil má bhíonn siad le feiceáil in iliomad córas | Nuair atá aisghairm > beachtas ríthábhachtach        |

### `k` a Thiúnadh go Praiticiúil

```bash
# Réamhshocrú
MEMORY_RRF_K=60

# Beachtas ionsaitheach (cuimhne bheag, beagán doiciméad)
MEMORY_RRF_K=20

# Aisghairm uasta (cuimhne mhór, ceisteanna éagsúla)
MEMORY_RRF_K=120
```

**Sampla le `k=20`:**

- Rang FTS 1 → rannchuidiú `1/21 = 0.048`
- Rang FTS 10 → rannchuidiú `1/30 = 0.033`
- Rang veicteora 1 → rannchuidiú `0.048`
- Uasmhéid comhcheangailte: `0.096`

**Sampla le `k=60`:**

- Rang FTS 1 → rannchuidiú `1/61 = 0.016`
- Rang FTS 10 → rannchuidiú `1/70 = 0.014`
- Rang veicteora 1 → rannchuidiú `0.016`
- Uasmhéid comhcheangailte: `0.033`

Le `k` níos airde, bíonn an **difríocht choibhneasta** idir an toradh is airde agus rang 10 níos lú, mar sin braitheann an t-algartam níos mó ar **chomhdhearcadh idir córais aisghabhála** ná ar mhuinín sa rang is airde.

### Cathain is Ceart `k` a Athrú

| Siomptóm                                                           | Bain triail as                                                                               |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Bíonn an toradh is airde chun tosaigh i gcónaí, ach tá sé mícheart | **Ísligh** k (m.sh., 20) — bíonn níos mó tábhachta le muinín sa rang is airde                |
| Tá an freagra ceart sna 5 thoradh is airde ach níl sé ar bharr     | **Ardaigh** k (m.sh., 100) — tugann scóráil níos cothroime luach saothair don chomhdhearcadh |
| Tá an aisghairm ard ach tá an beachtas íseal                       | **Ísligh** k — géaraigh an rangú                                                             |
| Tá an aisghairm íseal (doiciméid ábhartha ar iarraidh)             | **Ardaigh** k — tabhair seans do dhoiciméid atá níos ísle sa rangú                           |

### Ualú RRF

Úsáideann comhleá cómhalartach ranguithe meáchain chothroma do rang an veicteora shéimeantaigh agus do rang an chuardaigh lántéacs:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Níl aon athróga timpeallachta ann chun meáchain aonair a choigeartú (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` níl siad ann).

---

## Straitéis Achoimrithe (v3.8.16+)

Comhbhrúnn an modúl `summarization.ts` (`src/lib/memory/summarization.ts`) cuimhní níos sine chun an tacar gníomhach a choinneáil beag agus cumas aisghairme a chaomhnú ag an am céanna.

### Cathain a Spreagtar Achoimriú

| Truicear                    | Tairseach (réamhshocrú) |
| --------------------------- | ----------------------- |
| Truicear láimhe tríd an API | n/b                     |

### Cad a Achoimrítear

Easpórtáiltear dhá phointe iontrála ó `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — comhdhlúthaíonn sé
  na cuimhní do sheisiún ina théacs achoimre amháin atá teoranta ag buiséad comharthaí.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — an comhdhlúthú
  aoisbhunaithe a úsáideann an API: roghnaíonn sé gach cuimhne atá níos sine ná `days`,
  cruthaíonn sé cuimhne achoimre chomhdhlúite amháin astu, agus (nuair atá `dryRun`
  `false`) scriosann sé na bunchuimhní. Tabhair `dryRun: true` chun réamhamharc a fháil
  ar an tacar iarrthóirí agus ar iomlán na gcomharthaí gan aon rud a mhodhnú.

Níl aon phas cnuasaithe clibe/eochrach ná aon scóráil "lárnach in aghaidh inachoimrithe" in aghaidh na cuimhne —
tá an roghnú bunaithe go hiomlán ar an scoithphointe aoise, agus is líne chomhdhlúite
le réimír cineáil do gach iarrthóir é an téacs achoimre.

### Achoimriú a Spreagadh

Tá an t-achoimriú **láimhe / roghnach** — tá an socrú `autoSummarize` `false` de
réir réamhshocraithe, mar sin ní chomhdhlúthaítear aon rud go huathoibríoch. Spreag é tríd an API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Chun é a fhágáil múchta, níl le déanamh ach `autoSummarize` a choinneáil ag a luach réamhshocraithe (`false`).

### Leideanna maidir le Cáilíocht an Achoimrithe

- **Faigh réamhamharc ar dtús le `dryRun`** — tugann `summarizeMemoriesOlderThan(..., true)`
  liosta na n-iarrthóirí agus líon iomlán na gcomharthaí ar ais ionas gur féidir leat a dheimhniú cad a chumascfaí
  sula scriosfaí na bunchuimhní.
- **Rith an t-achoimriú le linn uaireanta ísealtráchta** má tá corpas mór cuimhne agat — is é glao an LLM an chuid is moille

```bash
# Ar nós Cron: déan achoimriú gach lá ag 3am
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Patrún Soláthraí MemoryBackend

> **Foinse na fírinne:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tástálacha:** `src/lib/memory/__tests__/generic-backend.test.ts`

Tugann patrún soláthraí MemoryBackend **sraith astarraingthe innill deiridh inphlugáilte** isteach os cionn an innill cuimhne atá ann cheana. In ionad a bheith ceangailte le feidhmiú stórála amháin, tacaíonn an córas cuimhne anois le hinnill deiridh iomadúla (SQLite, Obsidian, Notion, innill deiridh shaincheaptha HTTP) agus le ródú príomhúil/cúltaca inchumraithe.

### Ailtireacht

```
┌──────────────────────────────────────────────────────────┐
│                    Bealaí API                            │
│            (src/app/api/memory/route.ts)                 │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                          │
│          Ceolfhoirneoir aonáis (manager.ts)              │
│                                                          │
│  Príomhúil ──► Inneall Deiridh A  (m.sh. SQLite)         │
│  Cúltaca   ──► Inneall Deiridh B  (m.sh. Obsidian)       │
│                Inneall Deiridh C  (m.sh. Notion trí      │
│                GenericBackend)                           │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Inneall    │ │ Inneall    │ │ Inneall          │
│ Deiridh    │ │ Deiridh    │ │ GenericMemory    │
│ SQLite     │ │ Obsidian   │ │ (HTTP)            │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Croíchomhéadan (`backend.ts`)

Ní mór do gach inneall deiridh an comhéadan `MemoryBackend` a chur i bhfeidhm:

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

  // Cuardach
  search(config: SearchConfig): Promise<Memory[]>;

  // Sláinte
  health(): Promise<HealthCheckResult>;

  // Saolré (roghnach)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Ceolfhoirneoir aonáis a dhéanann na nithe seo a leanas:

- **Cláraíonn** sé innill deiridh trí `register(backend)` — glaoitear air ag an tosú ó `index.ts`
- **Cumraíonn** sé an príomhinneall + cúltaca trí `configure(primary, fallbacks)`
- **Ródálann** sé CRUD/cuardach chuig an bpríomhinneall, le slabhra cúltaca ar theip
- Déanann sé **seiceálacha sláinte** ar gach inneall deiridh go tréimhsiúil

**Iompar cúltaca:**

| Oibríocht | Príomhúil                               | Cúltacaí                            |
| --------- | --------------------------------------- | ----------------------------------- |
| `create`  | ✅ Príomhúil amháin                     | ❌                                  |
| `get`     | ✅ Bain triail as an bpríomhúil ar dtús | ✅ Cúltaca más null é               |
| `update`  | ✅ Príomhúil amháin                     | ✅ Sioncrónú gan fanacht le freagra |
| `delete`  | ✅ Príomhúil amháin                     | ✅ Sioncrónú gan fanacht le freagra |
| `list`    | ✅ Príomhúil amháin                     | ❌                                  |
| `search`  | ✅ Príomhúil ar dtús                    | ✅ Cúltaca ar earráid               |

#### GenericMemoryBackend (`genericBackend.ts`)

Nascóir cineálach HTTP a chuireann aon REST API in oiriúint ina MemoryBackend. Úsáideach do:

- **Notion** — ceangail trí Notion API
- **Obsidian** — ceangail trí Obsidian Local REST API
- **Innill deiridh shaincheaptha** — aon seirbhís a nochtann API cuimhne RESTful

**Cumraíocht:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Bun-URL API an inneall
  apiKey?: string;           // Ceadchomhartha Bearer le haghaidh fíordheimhnithe
  headers?: Record<string, string>;  // Ceanntásca saincheaptha HTTP
  timeout?: number;          // Teorainn ama iarratais (réamhshocrú: 30000ms)
  backendType?: string;      // Le haghaidh logála

  // Sáruithe críochphointe (úsáideann na réamhshocruithe coinbhinsiúin REST)
  endpoints?: {
    search?: string;   // réamhshocrú: "/memories/search"
    create?: string;   // réamhshocrú: "/memories"
    list?: string;     // réamhshocrú: "/memories"
    get?: string;      // réamhshocrú: "/memories/{id}"
    update?: string;   // réamhshocrú: "/memories/{id}"
    delete?: string;   // réamhshocrú: "/memories/{id}"
    health?: string;   // réamhshocrú: "/health"
  };

  // Mapálacha ainmneacha paraiméadar iarratais
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapálacha ainmneacha paraiméadar conairí
  pathParams?: {
    id?/memoryId?
  };
}
```

Tá **innill aitheanta** réamhchumraithe in `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend dírithe ar localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend dírithe ar api.notion.com/v1
```

#### Innill ionsuite

##### SQLiteBackend (`sqliteBackend.ts`)

An t-inneall príomhúil réamhshocraithe. Timfhilleann sé an stór cuimhne reatha atá bunaithe ar SQLite agus `src/lib/memory/store.ts` á úsáid aige. Cláraítear go huathoibríoch é ag am tosaithe.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Timfhilleann sé an comhtháthú reatha Obsidian (`src/lib/memory/obsidianBackend.ts`). Nascann sé le cruinneachán Obsidian trí Obsidian Local REST API.

### Socruithe

Stóráiltear socruithe inneall cuimhne i dtábla socruithe na haipe agus bainistítear iad trí `src/lib/memory/settings.ts`:

| Socrú                | Eochair Timpeallachta/Cumraíochta | Réamhshocrú | Cur síos                             |
| -------------------- | --------------------------------- | ----------- | ------------------------------------ |
| Inneall príomhúil    | `memoryPrimaryBackend`            | `"sqlite"`  | ID an innill phríomhúil              |
| Innill chúltaca      | `memoryFallbackBackends`          | `[]`        | IDanna ordaithe na n-inneall cúltaca |
| Cumraíochtaí inneall | `memoryBackendConfigs`            | `{}`        | Sáruithe cumraíochta de réir innill  |

Normalaítear na socruithe trí `normalizeMemorySettings()` agus cuirtear i dtaisce iad ag `getMemorySettings()`.

### Sreabhadh Túsaithe

```
Bústrapáil na haipe
  → Iompórtálacha index.ts (fo-iarmhairt): cláraítear SQLiteBackend
  → Glaoitear initMemoryBackends() ó shaolré na haipe:
      1. Lódáil socruithe (getMemorySettings)
      2. Cumraigh an t-inneall príomhúil + na hinnill chúltaca
      3. Tosaigh gach inneall (seiceáil sláinte)
      4. Réidh le haghaidh iarratas
```

### Inneall Nua a Chur Leis

1. **Cuir comhéadan `MemoryBackend` i bhfeidhm** in `src/lib/memory/<name>Backend.ts`
2. **Easpórtáil** ó `src/lib/memory/index.ts`
3. **Cláraigh** le `memoryManager.register(yourBackend)` ag am tosaithe
4. **Cumraigh** trí shocruithe: socraigh `memoryPrimaryBackend` mar ID d'innill
5. **Déan tástáil** agus `src/lib/memory/__tests__/generic-backend.test.ts` á úsáid mar thagairt

#### Sampla: Inneall Brain

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

### Fíorú

#### Tástálacha aonaid

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Aschur a bhfuiltear ag súil leis: **35 tástáil, iad uile ag pasáil**, lena gcumhdaítear:

- Cruthaitheoir (2)
- Seiceáil sláinte (4) — rath, teip 500, earráid líonra, aga folaigh
- Túsú (2) — rath, teip
- Cruthú (2) — críochphointe réamhshocraithe, críochphointe saincheaptha
- Fáil (4) — rath, 404 → null, caitheamh earráide nach 404 í, paraiméadair chonairí shaincheaptha
- Nuashonrú (2) — rath, 404 → false
- Scriosadh (2) — rath, 404 → false
- Liostú (2) — paraiméadair iarratais, ainmneacha paraiméadar saincheaptha
- Cuardach (3) — paraiméadair iarratais, críochphointe saincheaptha, srathú roghanna
- Ceanntásca fíordheimhnithe (2) — ceadchomhartha Bearer, ceanntásca saincheaptha
- Monarcha (1)

#### Seiceáil cineáil

```bash
npm run typecheck:core
```

A bhfuiltear ag súil leis: **0 earráid**.
