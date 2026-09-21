# Memory System (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Tõeallikas:** `src/lib/memory/` ja `src/app/api/memory/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40 (vaikimisi väljas + int8 kvantimise järelejõudmine)

OmniRoute pakub püsivat vestlusmälu, mis on seotud API-võtmega (ja
valikuliselt seansi ID-ga). Mälukirjed eraldatakse LLM-i vastustest automaatselt
kergekaalulise regulaaravaldiste mustrisobituse abil ning lisatakse järgmistesse
päringutesse juhtiva süsteemisõnumina (või esimese kasutajasõnumina teenusepakkujate
puhul, kes süsteemirolli ei aktsepteeri).

> **Mälu on vaikimisi VÄLJAS (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` on
> nüüd `false` (`src/lib/memory/settings.ts`). Mälu lubamisel lisatakse
> **igasse** vestluspäringusse kuni `maxTokens` (~2k) ulatuses leitud konteksti,
> mille eest esitatakse arve — see võib olla ootamatu kulu uute installide ja
> oma konteksti haldavate klientide jaoks. Lubage see selgesõnaliselt jaotises
> **Seaded → Mälu** (`MemorySkillsTab` kuvab mälu lubamisel hoiatuse tokenite
> kulu kohta). Klient saab üksiku päringu mälukasutusest välistada päringupäisega
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — vaadake päringupäiste tabelit
> failis [API_REFERENCE.md](../reference/API_REFERENCE.md). Mäluta päring määrab
> `memoryOwnerId = null`, mis keelab selle päringu jaoks **nii** mälu kui ka
> oskuste lisamise (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Mälu on **piiritletud API-võtme, mitte kasutaja järgi** — kõik sama API-võtmega
autenditud päringud jagavad sama mälukogumit, mida saab valikuliselt täiendavalt
piiritleda `sessionId` järgi.

## Arhitektuur

```
Klient → /v1/chat/completions (apiKeyInfo lahendatakse eelnevas etapis)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # eraldab ID
    → getMemorySettings()                     # vahemällu salvestatud seaded
    → shouldInjectMemory(body, {enabled})     # kontrollvärav
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + valikuline vektor
    → injectMemory(body, memories, provider)  # süsteemi- või kasutajasõnum
  → ülesvoolu teenusepakkuja väljakutse
  → vastuse saabumisel: extractFacts(text, apiKeyId, sessionId)  # mitteblokeeriv
    → setImmediate → createMemory(fact) iga vaste kohta
                   → embed(content) + upsertVector(id, vec)
```

Lisamise ja eraldamise väljakutsed on ühendatud failis
`open-sse/handlers/chatCore.ts` (otsige `retrieveMemories`, `injectMemory`
ja `extractFacts`).

## Mootori arhitektuur (3-tasemeline valik)

Mälumootor valib täitmisajal otsingutee saadaoleva taristu ja seadete põhjal.
Kasutusel on kolm taset, mida rakendatakse tähtsuse järjekorras:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TASE 0 — Märksõna (FTS5)                                   │
  │  Testipõhine saadavus: FTS5, kui SQLite'i järg seda toetab    │
  │  (better-sqlite3 / node:sqlite / bun:sqlite); pole saadaval  │
  │  FTS5-ta järkudes (nt sql.js/WASM —                          │
  │  "no such module: fts5"). Kasutatakse, kui strategy =        │
  │  "exact", või varuvariandina; engine-status keyword         │
  │  peegeldab testi tulemust.                                   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TASE 1 — Sisseehitatud vektor (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 laaditakse db.loadExtension() kaudu.      │
  │  KNN-i toore jõu otsing Float32-vektorite hulgast. Aktiivne, │
  │  kui:                                                        │
  │   • sqlite-vec loadExtension õnnestub                        │
  │   • Saadaval on manustusallikas (remote | static |           │
  │     transformers), mis suudab luua Float32Array             │
  │   • Tabel vec_memories on olemas (luuakse esimesel ready())  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TASE 2 — Qdrant (valikuline väline vektorandmebaas)         │
  │  Kui see on lubatud, asendab semantilise/hübriidotsingu      │
  │  puhul sqlite-vec-i. Vajab töötavat Qdranti eksemplari ning  │
  │  seadistatud hosti/porti.                                    │
  └─────────────────────────────────────────────────────────────┘
```

Taandumine toimub automaatselt ja läbipaistvalt:

- Kui sqlite-vec-i laadimine ebaõnnestub, pole tase 1 saadaval → taandutakse tasemele 0.
- Kui manustusallikas tagastab vea, taandub tase 1 tasemele 0.
- Kui Qdrant pole töökorras, taandub tase 2 tasemele 1 (või tasemele 0, kui ka
  tase 1 pole saadaval).

## Vektoriesituste allikad

Vektoriesituste kiht (`src/lib/memory/embedding/`) määrab kasutatava allika
`MemorySettingsExtended.embeddingSource` põhjal:

| Allikas        | Kirjeldus                                                                                              | Võti nõutav | Külmkäivitus       |
| -------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ------------------ |
| `remote`       | Kasutab konfigureeritud teenusepakkuja vektoriesituste API-t (OpenAI, Cohere jne)                      | Jah         | Puudub             |
| `static`       | Kohalik otsingutabelil põhinev vektoriesitus `potion-base-8M` abil (WordPiece + keskmistav koondamine) | Ei          | ~200ms             |
| `transformers` | Kohalik ONNX-järeldus `@huggingface/transformers` v4 ja `all-MiniLM-L6-v2` abil                        | Ei          | ~3s + ~400MB RAM-i |
| `auto`         | Käitusaegne valik: kaugallikas (kui võti on olemas) → staatiline → transformers → null                 | Oleneb      | Oleneb             |

**Lahendusjärjekord `auto` puhul:**

1. Leia funktsioonist `listEmbeddingProviders()` esimene teenusepakkuja, millel on `hasKey === true` → `remote`.
2. Kui `settings.staticEnabled === true` → `static`.
3. Kui `settings.transformersEnabled === true` → `transformers`.
4. Vastasel juhul → `null` (taandub FTS5 märksõnaotsingule).

Vektoriesituste vahemälu (`src/lib/memory/embedding/cache.ts`) kasutab mälusisest
LRU-kaarti võtmega `${source}:${model}:${dim}:${sha256(text)}`, mille maht on piiratud
`MEMORY_EMBEDDING_CACHE_MAX` kirjega (vaikimisi 1000) ja mille TTL on
`MEMORY_EMBEDDING_CACHE_TTL_MS` (vaikimisi 5 min). Seda jagavad protsessi
elutsükli jooksul kõik kutsujad.

## Hübriidne RRF (k=60)

Kui `strategy = "hybrid"` ja vektorihoidla on saadaval, kasutab otsing
FTS5 ja vektortulemuste ühendamiseks pöördrangi fusiooni (Reciprocal Rank Fusion):

```
RRF(d) = Σ  1 / (k + rank_i(d))      kus k = 60 (seadistatav muutuja MEMORY_RRF_K kaudu)
          i
```

Täpsemalt:

1. Käivita FTS5-otsing → järjestatud loend `R_fts` (positsioonid 1..N).
2. Käivita KNN-vektorotsing → järjestatud loend `R_vec` (positsioonid 1..M).
3. Iga kordumatu `memoryId` puhul:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, kui loendis puudub).
4. Sordi `rrf_score` järgi kahanevalt ja rakenda tokenieelarve läbimist.

RRF on tuntud oma tõhususe poolest, ilma et heterogeensete otsingusüsteemide
skoore oleks vaja normaliseerida. Vaikeväärtus `k=60` pärineb Cormacki jt
algsest artiklist ja toimib hästi väikeste korpuste puhul (<10k mälukirjet).

## Tagantjärele täitmine (laisk + taasindekseerimine)

Kui vektoriesituse mudel muutub (tuvastatakse `embedding_signature` kaudu),
luuakse vektorihoidla uuesti ja kõik olemasolevad mälukirjed märgitakse tabelis
`memories` väärtusega `needs_reindex = 1`.

**Laisk tagantjärele täitmine**: Järgmise otsingu ajal luuakse igale vektorkirjeta
mälukirjele vektoriesitus ja see lisatakse enne otsingu käivitamist tabelisse
`vec_memories`. See jaotab tagantjärele täitmise kulu tegelike päringute vahel,
ilma käivitamist blokeerimata.

**Otsene taasindekseerimine**: Jaotise `/dashboard/memory` vahekaart Engine sisaldab
nuppu „Indekseeri kohe”, mis kutsub välja `POST /api/memory/reindex`. Töötleja kutsub
failist `src/lib/memory/reindex.ts` välja funktsiooni `runReindexBatch()`, mis töötleb
ühe päringu kohta kuni `limit` ootel kirjet. Edenemist saab küsitleda
`GET /api/memory/engine-status` kaudu (`vectorStore.needsReindex`).

Tabel `memory_vec_meta` (migratsioon `083_memory_vec.sql`) talletab:

- `active_dim` — praegune vektori mõõtmelisus (null = pole veel kalibreeritud).
- `embedding_signature` — `${source}:${model}:${dim}`, mida kasutatakse muudatuste tuvastamiseks.
- `last_reset_at` — viimase täieliku lähtestamise ajatempel.
- `vec_loaded` — lipp 0/1, mis näitab, kas sqlite-vec laaditi edukalt.

## Seadete laiendus

Üheksa põimendus- ja vektorvälja on saadaval liideses `MemorySettingsExtended` failis
`src/shared/schemas/memory.ts` ning need salvestatakse faili `src/lib/db/settings.ts` kaudu:

| Väli                     | Tüüp                                               | Vaikeväärtus | Kirjeldus                                                         |
| ------------------------ | -------------------------------------------------- | ------------ | ----------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`     | Kasutatav põimendusallikas                                        |
| `embeddingProviderModel` | `string \| null`                                   | `null`       | Pakkuja/mudel vormingus `provider/model`                          |
| `customBaseUrl`          | `string \| null`                                   | `null`       | Ainult Memory jaoks mõeldud OpenAI-ga ühilduva otspunkti baas-URL |
| `customModelId`          | `string \| null`                                   | `null`       | Kohandatud otspunktile saadetav mudeli ID                         |
| `transformersEnabled`    | `boolean`                                          | `false`      | Transformers.js-i kasutamise lubamine (MiniLM, ~400MB)            |
| `staticEnabled`          | `boolean`                                          | `false`      | Staatilise kohaliku mudeli potion-base-8M kasutamise lubamine     |
| `rerankEnabled`          | `boolean`                                          | `false`      | Ümberjärjestamise etapi lubamine (lisab +200-500ms/päring)        |
| `rerankProviderModel`    | `string \| null`                                   | `null`       | Ümberjärjestamise pakkuja/mudel vormingus `provider/model`        |

`rerankProviderModel` lahendatakse marsruudi `POST /v1/rerank` kaudu (kutsutakse loopback-liidese kaudu), seega aktsepteerib see kõike, mida vastav marsruut aktsepteerib: kureeritud pilvepõhist ümberjärjestusmudelit (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) või OpenAI-ga ühilduva pakkuja sõlme kujul `<node-prefix>/<model>` (nt `skilled-mini/bge-reranker-v2-m3` TEI/Infinity serveri puhul). Loopback-sõlmed on alati sobilikud; teises hostis (LAN, Tailscale) asuv sõlm nõuab lisaks funktsioonilippu `RERANK_REMOTE_PROVIDER_NODES` ja peab vastama pakkuja väljaminevate URL-ide poliitikale — vt [Funktsioonilipud](../reference/FEATURE_FLAGS.md). Töölaua valik kuvab kureeritud pakkujad ja kohalikud sõlmed; mis tahes kehtiva `provider/model` stringi saab määrata otse marsruudi `PUT /api/settings/memory` kaudu.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Kasutatav vektorsalvestuse taustsüsteem |

Need väljad on kättesaadavad marsruudi `GET /PUT /api/settings/memory` kaudu (skeem `MemorySettingsExtendedSchema`).

Allika `remote` puhul aktsepteerib Memory ka valikulisi seadeid `customBaseUrl` ja
`customModelId`. Koos valivad need OpenAI-ga ühilduva `/embeddings`-otspunkti ja
mudeli ilma globaalset põimendusregistrit muutmata. Otspunkt normaliseeritakse enne
kasutamist ja seda kontrollitakse pakkuja väljaminevate URL-ide poliitika alusel: nõutav
on HTTP(S), manustatud autentimisandmed ja päringustringid lükatakse tagasi ning
pilvkeskkonna metaandmete aadressid jäävad blokeerituks. Tühjad väärtused säilitavad
valitud registripakkuja. Töölauale tagastatavad vead puhastatakse ja otspunkti
autentimisandmeid ei logita kunagi.

> **TODO (D20):** Ulatus `global` (mälestuste jagamine kõigi API-võtmete vahel) ei ole
> selles versioonis rakendatud. See nõuab skeemimuudatusi ja globaalset otsinguteed.
> Jälgida eraldi.

## Salvestuskihid

### Esmane: SQLite (`memories` tabel)

Loodud migratsiooniga `015_create_memories.sql`:

| Veerg                       | Tüüp               | Märkused                                                                                  |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | Funktsiooniga `crypto.randomUUID()` loodud UUID                                           |
| `api_key_id`                | `TEXT NOT NULL`    | Omanikuks olev API-võti                                                                   |
| `session_id`                | `TEXT`             | Valikuline vestlusepõhine ulatus                                                          |
| `type`                      | `TEXT NOT NULL`    | Üks väärtustest `factual`, `episodic`, `procedural`, `semantic`                           |
| `key`                       | `TEXT`             | Stabiilne üleskirjutusvõti, nt `preference:i_prefer_python`                               |
| `content`                   | `TEXT NOT NULL`    | Tegelik fakti tekst                                                                       |
| `metadata`                  | `TEXT`             | JSON-plokk (category, extractedAt, source, ...)                                           |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 stringid                                                                         |
| `expires_at`                | `TEXT`             | Valikuline aegumisaeg; `NULL` tähendab püsivat                                            |
| `memory_id`                 | `INTEGER UNIQUE`   | Lisatud migratsiooniga `023_fix_memory_fts_uuid.sql`, et siduda UUID-d ↔ FTS5 reatunnused |

Indeksid: `api_key_id`, `session_id`, `type`, `expires_at` ning unikaalne
`memory_id` indeks.

**Üleskirjutamise semantika**: `createMemory()` otsib olemasolevat rida sama
`(api_key_id, key)` paariga ja värskendab selle leidmisel olemasolevat rida (ühendades `metadata`
pindmise hajutamise teel). See takistab tabeli piiramatut kasvamist korduvate
eelistuslausete tõttu.

### Täistekstiotsing (`memory_fts` virtuaaltabel)

`022_add_memory_fts5.sql` loob väljade `content` ja
`key` jaoks FTS5 virtuaaltabeli. `023_fix_memory_fts_uuid.sql` parandab tegelikus kasutuses esinenud vea, mille puhul UUID
primaarvõtit ei saanud ühendada FTS5 täisarvulise reatunnusega — migratsioon lisab
veeru `memory_id`, loob FTS-tabeli uuesti ja seadistab päästikud
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), mis hoiavad FTS-i sünkroonis toimingute
INSERT, DELETE ja UPDATE ajal.

Seda kasutab `retrieval.ts` strateegiate `semantic` ja `hybrid` jaoks (vt allpool).
Otsingukood teeb kontrolli funktsiooniga `hasTable("memory_fts")` ja kasutab
kronoloogilist järjestust varuvariandina, kui FTS-tabel puudub või FTS-päring põhjustab vea.

### Valikuline: Qdrant (2. taseme vektorhoidla)

`src/lib/memory/qdrant.ts` rakendab valikulise Qdranti integratsiooni 2. taseme
vektorhoidlana. Otsing suunatakse Qdranti ainult siis, kui mootori valija
`memoryVectorStore === "qdrant"` — vaikeväärtus `"auto"` (ja `"sqlite-vec"`)
**ei** vali kunagi Qdranti. Mootori vahekaardi lüliti määrab **mõlemad**, nii `qdrantEnabled` kui ka
`memoryVectorStore`, koos: lubamisel muutub Qdrant esmaseks hoidlaks, keelamisel
lähtestatakse väärtuseks `"auto"` (#5597 — enne seda parandust ei avaldanud lubamine mõju, sest miski
ei kirjutanud mootori valija väärtust). Kui Qdrant pole kättesaadav või ei tagasta midagi, kasutab otsing
varuvariantidena sqlite-vec-i → FTS5.

- `upsertSemanticMemoryPoint()` — manustab `key + content` seadistatud
  manustusmudeliga, tagab kollektsiooni olemasolu (loob esmakasutusel
  koosinuskaugusega vektorid) ning lisab või uuendab punkti kasuliku koormusega `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — manustab päringu, otsib
  kollektsioonist filtriga `kind = "omniroute_memory"` ja valikuliselt filtritega
  `apiKeyId` / `sessionId`. Piirab `topK` vahemikku `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — ühe punkti kustutamine. Seda kutsub
  `deleteMemory()` pärast SQLite'i rea eemaldamist (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — kustutab hulgi punktid, mille
  `expiresAtUnix` on minevikus või mille `createdAtUnix` on säilitustähtajast
  vanem. Loendab esmalt, et töölaud saaks näidata tegelikke arve.
- `checkQdrantHealth()` — `GET /readyz` seisundikontroll koos latentsusega.

Seadete kasutajaliidese `/dashboard/memory` vahekaart **Mootor** sisaldab Qdranti
konfiguratsiooni, seisundikontrolli, semantilise otsingu testi ja puhastamist.
Vastavad marsruudid kataloogis `src/app/api/settings/qdrant/` on alates versioonist
v3.8.6 kõik ühendatud:

| Marsruut                                | Meetod        | Kirjeldus                             |
| --------------------------------------- | ------------- | ------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdranti seadete lugemine/uuendamine   |
| `/api/settings/qdrant/health`           | `GET`         | Elusolekukontroll ja latentsus        |
| `/api/settings/qdrant/search`           | `POST`        | Semantilise otsingu test              |
| `/api/settings/qdrant/cleanup`          | `POST`        | Aegunud/vanade punktide eemaldamine   |
| `/api/settings/qdrant/embedding-models` | `GET`         | Saadaolevate manustusmudelite loetelu |

**Käitumist puudutavad märkused (mida oodata):**

- **Mootori valik** — Qdranti lubamine vahekaardil Mootor muudab selle peamiseks
  talletuskohaks (määrab `memoryVectorStore="qdrant"`); keelamine lähtestab väärtuseks
  `"auto"` (#5597).
- **Tagantjärele täitmist ei toimu** — sinna kirjutatakse ainult mälud, mis on loodud
  või uuendatud **pärast** Qdranti lubamist (tulemust ootamata topeltkirjutamine).
  Olemasolevaid SQLite'i mälusid **ei** migreerita; „Indekseeri kohe uuesti” koostab
  uuesti ainult sqlite-vec indeksi, mitte Qdranti oma.
- **Vektori mõõde tuvastatakse automaatselt** esmakasutusel tegeliku manustuse põhjal —
  täidetavat mõõtmevälja ei ole. Manustusmudeli muutmist pärast kollektsiooni loomist
  **ei** käsitleta automaatselt: olemasolevat kollektsiooni ei muudeta, mõõtmete
  mittevastavusega kirjutamised/otsingud ebaõnnestuvad ja kasutusele võetakse
  sqlite-vec. Manustusmudeli vahetamiseks looge kollektsioon uuesti (kasutage uut
  nime või kustutage see Qdrantist).
- **Kaugusmõõdik** — alati **koosinus** (kollektsiooni loomisel püsikodeeritud;
  pole seadistatav).
- **Autentimine** — ainult API-võti (saadetakse päisena `api-key`; autentimata
  kohaliku Dockeri puhul valikuline). JWT-d/RBAC-i ei kasutata.
- **Konfiguratsiooniväljad** — kasutajaliideses on saadaval `host`, `port`,
  `collection`, `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` on
  saadaval ainult keskkonnamuutuja/andmebaasi kaudu ning `vectorSize` ei kasutata
  kollektsiooni loomisel (mõõde saadakse manustusest).

### Vektorite kvantimine (int8 — valikuline, mõlemad taustsüsteemid)

Mõlemad vektorite taustsüsteemid toetavad **valikulist int8-kvantimist**, et vähendada
salvestatud vektorite mälumahtu (umbes 4× väiksem kui Float32) väikese meenutustäpsuse
kao hinnaga. Mõlema puhul on see vaikimisi **välja lülitatud** — vektorid säilitavad
täistäpsuse, kui seda pole sõnaselgelt lubatud.

| Taustsüsteem | Seade                           | Tüüp                           | Vaikeväärtus | Lugemiskoht                                                 |
| ------------ | ------------------------------- | ------------------------------ | ------------ | ----------------------------------------------------------- |
| Qdrant       | `qdrantQuantization` (DB võti)  | `"none" \| "int8" \| "binary"` | `"none"`     | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec   | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`     | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** seadistatakse eksemplaripõhiselt võtmega `qdrantQuantization`
  (avaldatud väljana `quantization` päringus `PUT /api/settings/qdrant`). Väärtuse
  `"int8"` korral taotleb `buildQuantizationConfig()` skalaarset kvantimist
  (`always_ram`, kvantiil `0.99`) ning otsingud lubavad `rescore: true`, et
  täistäpsusega vektorid saaksid int8 kandidaatide hulka täpsustada.
- **sqlite-vec** kvantimine on saadaval **ainult keskkonnamuutuja kaudu** (see pole
  andmebaasiseade): määrake `MEMORY_VEC_QUANTIZATION=int8`, et salvestada kohalikud
  vektorid veeruna `int8[dim]`, kasutades `vec_quantize_int8(?, 'unit')`. Valitud
  režiim lisatakse väärtusse `embedding_signature` (järelliide `:int8`), seega
  käivitab režiimi vahetamine tabeli `vec_memories` täieliku taasindekseerimise —
  kasutatakse sama laiska tagantjärele täitmise rada nagu manustusmudeli muutmisel.

## Mälutüübid

`MemoryType` (`src/lib/memory/types.ts`):

| Tüüp         | Kasutusotstarve                                                        |
| ------------ | ---------------------------------------------------------------------- |
| `factual`    | Eelistused, kasutaja püsivad faktid, käitumismustrid                   |
| `episodic`   | Konkreetse hetkega seotud otsused („I chose Postgres”)                 |
| `procedural` | Töövoo-/juhismälu (reserveeritud; praegu automaatne ekstraktor puudub) |
| `semantic`   | Reserveeritud vektorsalve kirjetele                                    |

`MemoryConfig`-i otsingustrateegia on üks järgnevatest: `exact`, `semantic` või `hybrid`,
ja ulatus on üks järgnevatest: `session`, `apiKey` või `global`. Funktsiooni
`getMemorySettings()` vaikimisi ulatus on `apiKey`.

## Faktide eraldamine (`extraction.ts`)

Eraldamine põhineb **regulaaravaldistel**, mitte LLM-il — see töötab protsessi sees
funktsiooniga `setImmediate()`, mistõttu ei blokeeri see kunagi vastusevoogu:

- **Eelistusmustrid** → `MemoryType.FACTUAL`
  (nt `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Otsustusmustrid** → `MemoryType.EPISODIC`
  (nt `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Käitumismustrid** → `MemoryType.FACTUAL`
  (nt `I usually …`, `I always …`, `I tend to …`)

Iga vaste puhastatakse (`trim`, tühimärkide koondamine, piirang 500 märki),
duplikaadid eemaldatakse paketi sees stabiilse `factKey(category, content)` abil ning
tulemus salvestatakse funktsiooniga `createMemory()` koos metaandmetega
`{category, extractedAt, source: "llm_response"}`. Sisendteksti maht on piiratud
64 KiB-ni (`MAX_EXTRACTION_TEXT_LENGTH`) — pikema teksti korral kasutatakse teksti
**lõpuosa**, et assistendi kõige hiljutisem sisu oleks alati kaasatud.

`extractFactsFromText(text)` eksporditakse testide jaoks ja see tagastab
struktureeritud faktid neid salvestamata.

## Otsing (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` on peamine sisenemispunkt. See:

1. Normaliseerib ja valideerib konfiguratsiooni skeemi `MemoryConfigSchema` abil.
2. Tagastab kohe `[]`, kui `enabled` on väär või `maxTokens <= 0`.
3. Piirab `maxTokens`-i vahemikku `[1, 8000]`.
4. Tuvastab, kas tänapäevane tabel `memories` on olemas (võrreldes pärandtabeliga `memory`),
   et vanemad andmebaasid töötaksid edasi.
5. Koostab baaspäringu koos aegumiskontrolliga
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), valikulise
   seansiulatuse ja valikulise `retentionDays`-i piirväärtusega.
6. Hargneb strateegia järgi:
   - **`exact`** (vaikimisi): kronoloogiline `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: kui `config.query` on määratud ja `memory_fts` on olemas, kasutab
     `memory_fts MATCH ?`-iga `JOIN`-i ning järjestab FTS-i asetuse järgi; kui FTS
     tagastab 0 rida, kasutatakse kronoloogilist järjestust.
   - **`hybrid`**: FTS-i tulemuste (suurema asjakohasusega) ja kronoloogilise
     kogumi ühend, millest eemaldatakse duplikaadid id järgi.
7. Arvutab päringu olemasolul märksõnapõhise asjakohasuse skoori (`getRelevanceScore`)
   väljade `content`, `key` ja `metadata` JSON-i põhjal. Nullskooriga
   read filtreeritakse välja.
8. Sordib skoori järgi kahanevalt ja seejärel `createdAt` järgi kahanevalt.
9. Läbib järjestatud loendi ja kaasab kirjeid seni, kuni jooksev
   `estimateTokens(content)` (≈ `length / 4`) jääb eelarve piiresse. Kui leidub
   vasteid, tagastab alati vähemalt ühe kirje.

`estimateTokens` eksporditakse ning seda kasutavad otsing, kokkuvõtete koostamine ja MCP
tööriist `omniroute_memory_search`.

## Sisestamine (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Ühendab kogu mälusisu üheks stringiks `Memory context: …`.
2. Valib strateegia teenusepakkuja nime järgi:
   - **Süsteemisõnum** (vaikimisi OpenAI, Anthropic, Gemini jne puhul) — lisab
     `{role: "system", content: memoryText}` olemasolevate süsteemisõnumite
     ette, et kasutaja süsteemiviibad jääksid endiselt prioriteetseks.
   - **Kasutajasõnum** (varuvariant) — teenusepakkujatele loendis
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Need lükkavad süsteemirolli
     tagasi ja vastasel juhul tagastaksid vea 400 (vt GLM/Zhipu probleemi #1701).
3. Logib arvu, strateegia ja mudeli sündmuse `memory.injection.injected` alla.

`providerSupportsSystemMessage(provider)` eksporditakse kutsujatele, kes peavad
ise marsruutimisotsuseid tegema. Tundmatute teenusepakkujate puhul kasutatakse
ohutuse tagamiseks vaikimisi väärtust `true` (süsteemiroll on lubatud).

## Seaded (`settings.ts`)

Mälukonfiguratsioon **salvestatakse andmebaasi seadete tabelisse**, mitte
keskkonnamuutujatesse. `getMemorySettings()` loeb andmed funktsioonist
`getSettings()` ja salvestab tulemuse protsessisisesesse vahemällu;
`invalidateMemorySettingsCache()` kutsutakse seadete PUT-marsruudi poolt pärast
kirjutamist.

### Pärandväljad (kõik versioonid)

| Andmebaasi võti       | Tüüp       | Vaikeväärtus                                                | Kasutajaliidese juhtelement                                        |
| --------------------- | ---------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| `memoryEnabled`       | tõeväärtus | `false` (vaikimisi välja lülitatud alates v3.8.30)          | Mälu sisse/välja                                                   |
| `memoryMaxTokens`     | täisarv    | `2000` (vahemik `0–16000`)                                  | Sisestamise tokenieelarve                                          |
| `memoryRetentionDays` | täisarv    | `30` (vahemik `1–365`)                                      | Säilitusperiood                                                    |
| `memoryStrategy`      | enum       | `"hybrid"` (üks väärtustest `recent`, `semantic`, `hybrid`) | Otsingustrateegia                                                  |
| `skillsEnabled`       | tõeväärtus | `false`                                                     | Lülitab võtmepõhise oskuste sisestamise sisse/välja (vt SKILLS.md) |

Märkus: kasutajaliidese strateegia `"recent"` vastab funktsiooni
`toMemoryRetrievalConfig()` kaudu sisemisele otsingustrateegiale `"exact"`
(kronoloogiline järjestus).

### Uued väljad (v3.8.6, plaan 21 D9)

Väljade kirjeldusi vaadake ka ülalolevast jaotisest „Seadete laiendus“.

| Andmebaasi võti             | API väli                 | Vaikeväärtus |
| --------------------------- | ------------------------ | ------------ |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`     |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`       |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`      |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`      |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`      |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`       |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`     |

Qdrantiga seotud andmebaasivõtmeid (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` vaikeväärtusega `"omniroute_memory"`,
`qdrantEmbeddingModel` vaikeväärtusega `"openai/text-embedding-3-small"`) loeb
funktsioon `normalizeQdrantConfig()` failis `qdrant.ts`.

### Keskkonnamuutujad (v3.8.6)

Kuus valikulist keskkonnamuutujat kohandavad mootori käitusaegset käitumist (dokumenteeritud failis `.env.example`):

| Muutuja                         | Vaikeväärtus               | Kirjeldus                                                                                                                                                        |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Vektorite vahemälu TTL (5 min)                                                                                                                                   |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maksimaalne kirjete arv vektorite LRU-vahemälus                                                                                                                  |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js-i mudeli HF-hoidla                                                                                                                               |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Staatilise potion-mudeli HF-hoidla                                                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Allalaaditud mudelite salvestuskoht                                                                                                                              |
| `MEMORY_VEC_TOP_K`              | `20`                       | Vaikimisi top-K vektorotsingu jaoks                                                                                                                              |
| `MEMORY_RRF_K`                  | `60`                       | RRF-i k-konstant hübriidotsingu jaoks                                                                                                                            |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Määrake väärtuseks `int8`, et salvestada kohalikud sqlite-vec-vektorid kvanditud kujul (~4× väiksemad; valikuline). Režiimi muutmine sunnib uuesti indekseerima. |

## Kokkuvõtete tegemine (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` tihendab vanemat
sisu, kui võtme mälukirjete jooksev tokenite koguarv ületab
eelarve. See itereerib ridu `created_at` järgi DESC-järjestuses, säilitab
mahtuvad read ning asendab ülejäänute `content`-välja kohapeal algse
sisu esimese kolme lausega. `tokensSaved` on vana ja uue sisu
`estimateTokens`-väärtuste vahe.

See protseduur on **saadaval, kuid praeguses vestluskonveieris ei kutsuta seda automaatselt välja**
— käivitage see cron-töö, administraatori toimingu või
`MemoryConfig.autoSummarize` siduskoodi kaudu, kui vajate pidevat tihendamist. Andmekadu
on pöördumatu: algne tekst kirjutatakse üle.

## REST API

Kõik lõpp-punktid nõuavad halduse autentimist (`requireManagementAuth`).

### Mälu põhilõpp-punktid (olemasolevad + uuendatud)

| Meetod   | Tee                  | Kirjeldus                                                                                                                                                                                                  |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lehekülgedeks jaotatud loend filtritega: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Vastus sisaldab `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                 |
| `POST`   | `/api/memory`        | Kirje loomine (Zod-valideeritud: `content`, `key`, valikulised `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Kutsub välja `createMemory()`, mis teeb `(apiKeyId, key)` alusel upsert-toimingu |
| `GET`    | `/api/memory/[id]`   | Ühe kirje toomine UUID alusel                                                                                                                                                                              |
| `PUT`    | `/api/memory/[id]`   | Kirje väljade (`type`, `key`, `content`, `metadata`) uuendamine. Keha: `MemoryUpdatePutSchema`. Kui manustamise allikas on saadaval, sünkroonib ka vektori.                                                |
| `DELETE` | `/api/memory/[id]`   | Kirje kustutamine; kustutab selle ka `vec_memories`-st (D15) ja võimaluse korral Qdrantist. Puuduva kirje korral tagastab 404.                                                                             |
| `GET`    | `/api/memory/health` | Käivitab `verifyExtractionPipeline("health-check")` — loomise→loendi→kustutamise täistsükkel. Tagastab `{working, latencyMs, error?}`                                                                      |

### Uued mälumootori lõpp-punktid (plaan 21)

| Meetod | Tee                               | Kirjeldus                                                                                                                                                                              |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Funktsiooni `retrieveMemories` kuivkäivitus — tagastab skoori, taseme ja tokenitega järjestatud tulemused. Keha: `RetrievePreviewSchema`. EI sisesta ega muuda mälukirjeid.            |
| `GET`  | `/api/memory/embedding-providers` | Loetleb manustamismudelitega pakkujad ja näitab, milliste jaoks on API-võti seadistatud.                                                                                               |
| `GET`  | `/api/memory/engine-status`       | Tagastab mootori täieliku oleku: märksõnatase, manustamise lahendus, vektorihoidla statistika, Qdranti seisund ja ümberjärjestamise konfiguratsioon. Kuju: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Käivitab mälu tihendamise käsitsi. Keha: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Tagastab `{candidates, tokensSaved}`.                                       |
| `POST` | `/api/memory/reindex`             | Käivitab `needs_reindex=1` mälukirjete vektorindeksi uuesti koostamise. Keha: `MemoryReindexSchema` (`force`). Tagastab `{started, pending}`.                                          |

### Seadete lõpp-punktid

| Meetod | Tee                                     | Kirjeldus                                                                                              |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Praegune normaliseeritud `MemorySettingsExtended` (7 uut välja + pärandväljad)                         |
| `PUT`  | `/api/settings/memory`                  | Mis tahes välja uuendamine skeemist `MemorySettingsExtendedSchema` (kokku 12 välja)                    |
| `GET`  | `/api/settings/qdrant`                  | Praegused Qdranti seaded (`QdrantSettingsSchema`)                                                      |
| `PUT`  | `/api/settings/qdrant`                  | Qdranti seadete uuendamine. Keha: `QdrantSettingsUpdateSchema`. `apiKey` = tühi string eemaldab võtme. |
| `GET`  | `/api/settings/qdrant/health`           | Elusoleku kontroll seadistatud Qdranti eksemplari suhtes. Tagastab `QdrantHealthResultSchema`.         |
| `POST` | `/api/settings/qdrant/search`           | Semantilise otsingu test Qdranti suhtes. Keha: `QdrantSearchSchema` (`query`, `topK`).                 |
| `POST` | `/api/settings/qdrant/cleanup`          | Aegunud / vanade mälukirjete Qdranti punktide eemaldamine.                                             |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdranti jaoks saadaolevate manustamismudelite loend.                                                   |

Loendipäring `/api/memory` toetab kas `page`-põhist lehekülgedeks jaotamist
(`parsePaginationParams`) **või** töötlemata `offset`-väärtust — kui `offset` on olemas, on
see prioriteetne ning vastuse kuju jaoks arvutatakse tuletatud `page`.

## MCP tööriistad (`open-sse/mcp-server/tools/memoryTools.ts`)

Kui MCP server on lubatud, registreeritakse kolm mälutööriista:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → ümbritseb funktsiooni `retrieveMemories()`. Alates versioonist v3.8.6 (D16) loetakse `strategy`
  funktsioonist `getMemorySettings()`, mitte ei määrata püsiväärtuseks `"exact"`. Kui
  `query` on esitatud ja `strategy` on `semantic` või `hybrid`, kasutatakse võimaluse
  korral vektorandmebaasi.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → ümbritseb funktsiooni `createMemory()`. Aktsepteerib ainult nelja kanoonilist tüüpi:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → loetleb sobivad
  kirjed, filtreerib need soovi korral loomiseelsest ajatemplist lähtudes ja kustutab seejärel kõik
  funktsiooni `deleteMemory()` kaudu (mis eemaldab vektorid ka sqlite-vec-ist ja Qdrantist).

Transpordi ja ulatuse üksikasju vaadake failist [MCP-SERVER.md](./MCP-SERVER.md).

## Töölaud (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` on nüüd **kolme vahekaardiga Studio**:

### Vahekaart: Mälud

- Kontseptsioonikaart (ahendatav „Kuidas see töötab?” selgitus).
- Reaalajas loend, otsing ja lehekülgjaotus (300 ms viivitusega).
- Tüübifilter (`factual` / `episodic` / `procedural` / `semantic` / kõik).
- Mälu lisamise modaalaken (võti, sisu, tüüp).
- Reasisene muutmine (pliiatsinupp → `PUT /api/memory/[id]`).
- Kustutamine rea kaupa (kinnitusdialoogiga).
- Praeguse lehe eksport JSON-vormingus; JSON-i import failivalija kaudu.
- Statistikakaardid: `totalEntries`, `tokensUsed`, `hitRate`.
- Nupp „Tihenda vanad” → `POST /api/memory/summarize` (esmalt kuvatakse
  proovikäitusega kandidaatide arv, seejärel küsitakse kinnitust).
- Roheline/punane olekutäpp, mida juhib `GET /api/memory/health`.

### Vahekaart: Mänguväljak

- Päringusisend + strateegiavalija (Täpne / Semantiline / Hübriidne) + sõne-eelarve.
- „Simuleeri” → `POST /api/memory/retrieve-preview` — kuvab järjestatud tulemused koos
  väljadega `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Lahenduspaneel, mis näitab, millist põiminguallikat / vektorandmebaasi kasutati ja
  kas toimus varuvariandile lülitumine.

### Vahekaart: Mootor

- Mootori olekupaneel (märksõna FTS5 märk, põimingu märk, vektorandmebaasi märk,
  Qdranti seisundi märk, ümberjärjestamise märk).
- Nupp „Indekseeri kohe uuesti” → `POST /api/memory/reindex`.
- Põiminguallika valija (automaatne / kaugallikas / staatiline / transformers + lülitid).
- Qdranti seadistuskaart (lubamise lüliti, host/port/collection/key, ühenduse test,
  semantilise otsingu test, puhastamine).
- Ümberjärjestamise seadistuskaart (lubamise lüliti, pakkuja/mudeli valija).

Mälu ja Qdranti sätted asuvad ka jaotises
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`), mis on mõeldud
pärand-/globaalsete sätete jaoks.

## Vahemällu salvestamine

`src/lib/memory/store.ts` haldab protsessisisest LRU-laadset vahemälu
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, millest eemaldatakse 20 %
vanimaid kirjeid) funktsiooni `getMemory(id)` lugemiste jaoks ning üldist võtme/väärtuse
`memoryCache`-kihti (`src/lib/memory/cache.ts`) meetoditega `get`/`set`/`invalidate`,
mida kasutavad väljakutsujad, kes soovivad oma ulatusega vahemälu (1 000 kirjega LRU,
vaikimisi TTL 5 min).

## Privaatsus ja elutsükkel

- Mälu omanik on API-võtme ID (`resolveMemoryOwnerId` failis
  `chatCore.ts`). Ilma väärtuseta `apiKeyInfo.id` ei käivitata otsingut,
  sisestamist ega eraldamist.
- Kirjed, mille `expires_at` on tulevikus, filtreeritakse otsingust välja;
  vanad kirjed, mis ületavad `retentionDays` väärtust, jäetakse välja funktsiooni
  `retrieveMemories` tingimusega `created_at >= cutoff`.
- Püsivaks kustutamiseks kasutage `DELETE /api/memory/[id]` või
  `omniroute_memory_clear`.
- Eraldamine käivitatakse asünkroonselt funktsiooniga `setImmediate`; tõrked
  logitakse võtme `memory.extraction.background.failed` all ja neid ei edastata
  kunagi kutsujale.
- Kontrollivad edasi-tagasi päringud (`verifyExtractionPipeline`) eemaldavad
  oma testkirjed plokis `finally`.

## Vaadake ka

- [SKILLS.md](./SKILLS.md) — säte `skillsEnabled` sisestab tööriistade
  definitsioonid koos mäluga.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transport / õigusalad.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — API laiem funktsionaalsus.
- Lähtekoodimoodulid:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hübriidne RRF
  - `src/lib/memory/embedding/index.ts` — mitme allikaga manustamiskiht
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-skeemid kõigi mälu-API päringukehade jaoks
  - `src/shared/schemas/qdrant.ts` — Zod-skeemid Qdranti seadete/toimingute jaoks
  - `src/lib/db/memoryVec.ts` — CRUD tabeli `memory_vec_meta` jaoks
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
  - `src/app/api/settings/qdrant/route.ts` + alammarsruudid
  - `src/app/(dashboard)/dashboard/memory/` — Studio kasutajaliides (leht + komponendid +
    vahekaardid + konksud)
  - `open-sse/handlers/chatCore.ts` (sisestamise / eraldamise sidumine)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Manustamisteenuse pakkuja valimine (v3.8.16+)

OmniRoute'i mälumängur toetab **nelja manustamisallikat** (`src/lib/memory/embedding/`). Igal neist on erinevad kompromissid **latentsuse, maksumuse, mudeli kvaliteedi ja seadistamise keerukuse** vahel.

### Manustamisallikad

| Pakkuja        | Allikas                                       | Latentsus                                     | Maksumus            | Kvaliteet                                   | Seadistamine                          |
| -------------- | --------------------------------------------- | --------------------------------------------- | ------------------- | ------------------------------------------- | ------------------------------------- |
| `transformers` | Kohalik ONNX-mudel (Xenova/all-MiniLM-L6-v2)  | ~50-150ms (CPU)                               | Tasuta              | Hea                                         | Ainult `npm install`                  |
| `static`       | Eelarvutatud vektorid (vahemällu salvestatud) | <1ms                                          | Tasuta              | Pole kohaldatav (sõltub vahemälutabamusest) | Puudub                                |
| `remote`       | OpenAI / Cohere / Voyage API                  | ~100-300ms                                    | $0.02-0.10/1M sõnet | Suurepärane                                 | API-võti                              |
| `auto`         | Valib käitusajal parima saadaoleva allika     | Sama mis valitud allikal                      | Tasuta              | Sama mis valitud allikal                    | Puudub                                |
| _(cache)_      | Mälusisene LRU-kiht mis tahes allika peal     | <1ms (tabamus), täielik latentsus (möödalask) | Tasuta              | Sama mis aluseks oleval allikal             | Alati aktiivne (pole valitav allikas) |

### Otsustuspuu

```
                  Milline on teie juurutuskeskkond?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ARENDUS/TEST  VÄIKE TOODANG  SUUR TOODANG  SERV / VÕRGUÜHENDUSETA
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (tasuta, API-ta)           (parim kvaliteet) (internetita)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            lisage ALATI peale `cache`-kiht
            (LruCache ümbritseb mis tahes pakkujat)
```

### Andmebaasi ja API konfiguratsioon

Mälu manustamisvalikuid konfigureeritakse seadete API/kasutajaliidese, mitte keskkonnamuutujate kaudu. Asjakohased seadete andmebaasivõtmed jaotises Settings (`normalizeMemorySettings` failis `src/lib/memory/settings.ts`) on:

- `memoryEmbeddingSource`: `"transformers"` (kohalik), `"remote"` (API-põhine, nt OpenAI), `"static"` (väline hoidla) või `"auto"`
- `memoryEmbeddingProviderModel`: kaug-/staatiliste allikate mudeliidentifikaator (nt `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` või `"auto"`

#### Kohalik mudel (`transformers`)

Kasutab kohalike mudelite käitamiseks sisemiselt transformers.js-i:

```bash
# Koodis loetavad keskkonnamuutujad (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-i mudelihoidla
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF-i staatiline Potioni mudel
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Vahemälukataloog
```

#### LRU manustamisvahemälu

Vahemälu on vaikimisi alati sisse lülitatud ja seda konfigureeritakse keskkonnamuutujate kaudu:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Vahemällu salvestatud üksuste maksimumarv
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Jõudlusnäitajad

Võrdlustest tüüpilisel 4-tuumalisel x86-serveril (tekstid ~100 tokenit igaüks):

| Pakkuja              | p50   | p95   | p99   | Maksumus / 1 mln vektoriesitust    |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Tasuta                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Sõltub Qdranti hostimislahendusest |
| `cache` (tabamus)    | <1ms  | <1ms  | 2ms   | Tasuta                             |

---

## Faktide eraldamise mustrid (v3.8.16+)

Moodul `extraction.ts` (`src/lib/memory/extraction.ts`) kasutab vestlussõnumitest struktureeritud faktide eraldamiseks **regulaaravaldiste mustrite sobitamist**. Nende mustrite mõistmine aitab kohandada eraldamise kvaliteeti oma kasutusjuhu jaoks.

### Vaikimisi mustrikategooriad

| Kategooria          | Näidismuster                                                     | Jäädvustab                       |
| ------------------- | ---------------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"Ma eelistan <X>"`, `"Mulle meeldib <X>"`, `"Ma vihkan <X>"`    | Kasutaja eelistused              |
| DECISION_PATTERNS   | `"Ma kasutan <X>"`, `"Otsustasin <X>"`, `"Valisin <X>"`          | Kasutaja otsused (episoodilised) |
| PATTERN_PATTERNS    | `"Ma tavaliselt <X>"`, `"Ma alati <X>"`, `"Ma mitte kunagi <X>"` | Püsivad käitumismustrid          |

### Näidismustrid (lihtsustatud)

```ts
// Failist src/lib/memory/extraction.ts
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

### Mida eraldatakse

Kui kasutaja ütleb:

> "Ma eelistan TypeScripti. Kasutan selle projekti jaoks Postgresi. Teen alati enne üleslükkamist commiti. Mulle ei meeldi Python."
> Eraldamise tulemusena luuakse 4 mälukirjet:
>
> | Võti                                 | Kategooria | Tüüp         | Sisu                            |
> | ------------------------------------ | ---------- | ------------ | ------------------------------- |
> | `preference:typescript`              | eelistus   | faktiline    | "TypeScript"                    |
> | `decision:postgres_for_this_project` | otsus      | episoodiline | "Postgres selle projekti jaoks" |
> | `pattern:commit_before_pushing`      | muster     | faktiline    | "commit enne üleslükkamist"     |
> | `preference:python`                  | eelistus   | faktiline    | "Python"                        |

### Eraldamise piirangud

Kontrollimatu eraldamise vältimiseks kehtivad järgmised piirangud:

| Sisu minimaalne pikkus | 3 märki |
| Sisu maksimaalne pikkus| 500 märki |

### Millal eraldamine keelata

Eraldamine käivitatakse automaatselt alati, kui mälu on lubatud; eraldi
ainult eraldamise lülitit ei ole. Selle väljalülitamiseks keelake mälu täielikult (`enabled: false`
päringu `PUT /api/settings/memory` kaudu). Kaaluge seda järgmistel juhtudel:

- Teil on suur sõnumimaht ja eraldamise kulu ei ole tühine
- Teie vestlused on enamasti ajutised (vestlus, silumine) ega oma pikaajalist väärtust
- Juba jäädvustate konteksti kohandatud pistikprogrammide kaudu

---

## Hübriidse RRF-i häälestamine (v3.8.16+)

Algoritm **Reciprocal Rank Fusion (RRF)** ühendab FTS5 (märksõnapõhise) ja vektorotsingu (semantilised) tulemused. Parameeter `k` määrab, kui suur kaal antakse madalama asetusega tulemustele.

### Valem

Iga kandidaat-mälukirje RRF-i skoor on:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Kus:

- `k` on konstant (vaikimisi 60)
- `rank_i(d)` on dokumendi `d` asetus i-ndas otsingusüsteemis (FTS, vektor)
- Summa arvutatakse üle kõigi otsingusüsteemide

### Kuidas `k` tulemusi mõjutab

| `k` väärtus            | Mõju                                                                                               | Sobib kõige paremini                         |
| ---------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `k=0`                  | Puhas asetuste liitmine (ilma silumiseta)                                                          | Teoreetiline lähtealus                       |
| `k=10-30`              | Annab tipptulemustele suure kaalu, madal asetus panustab väga vähe                                 | Kui esikolmiku tulemused on tavaliselt õiged |
| **`k=60`** (vaikimisi) | Tasakaalustatud — kõik esikümne tulemused panustavad märkimisväärselt                              | Üldotstarbeline otsing                       |
| `k=100+`               | Ühtlasem — isegi madala asetusega tulemused võivad domineerida, kui need esinevad mitmes süsteemis | Kui saagis > täpsus on kriitilise tähtsusega |

### `k` häälestamine praktikas

```bash
# Vaikeväärtus
MEMORY_RRF_K=60

# Agressiivne täpsus (väike mälu, vähe dokumente)
MEMORY_RRF_K=20

# Maksimaalne saagis (suur mälu, mitmekesised päringud)
MEMORY_RRF_K=120
```

**Näide väärtusega `k=20`:**

- FTS-i asetus 1 → panus `1/21 = 0.048`
- FTS-i asetus 10 → panus `1/30 = 0.033`
- Vektori asetus 1 → panus `0.048`
- Kombineeritud maksimum: `0.096`

**Näide väärtusega `k=60`:**

- FTS-i asetus 1 → panus `1/61 = 0.016`
- FTS-i asetus 10 → panus `1/70 = 0.014`
- Vektori asetus 1 → panus `0.016`
- Kombineeritud maksimum: `0.033`

Suurema `k` korral on **suhteline erinevus** esimese ja kümnenda asetuse vahel väiksem, mistõttu tugineb algoritm rohkem **otsingusüsteemide konsensusele** kui kõrgeima asetuse kindlusele.

### Millal `k` väärtust muuta

| Sümptom                                           | Proovige                                                              |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| Tipptulemus võidab alati, kuid on vale            | **Vähendage** k-d (nt 20) — kõrgeima asetuse kindlus loeb rohkem      |
| Õige vastus on esiviisikus, kuid mitte esimene    | **Suurendage** k-d (nt 100) — ühtlasem hindamine premeerib konsensust |
| Saagis on kõrge, kuid täpsus madal                | **Vähendage** k-d — muutke järjestus teravamaks                       |
| Saagis on madal (asjakohased dokumendid puuduvad) | **Suurendage** k-d — andke madalama asetusega dokumentidele võimalus  |

### RRF-i kaalumine

Pöördasetuste liitmine kasutab semantilise vektori asetuse ja täistekstiotsingu asetuse jaoks võrdseid kaale:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Üksikute kaalude kohandamiseks puuduvad keskkonnamuutujad (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ei ole olemas).

---

## Kokkuvõtmisstrateegia (v3.8.16+)

Moodul `summarization.ts` (`src/lib/memory/summarization.ts`) tihendab vanemaid mälukirjeid, et aktiivne kogum püsiks väike, säilitades samal ajal nende meenutamise võimaluse.

### Millal kokkuvõtmine käivitub

| Käivitaja                     | Lävend (vaikimisi) |
| ----------------------------- | ------------------ |
| Käsitsi käivitamine API kaudu | ei kohaldu         |

### Millest kokkuvõte tehakse

Failist `summarization.ts` eksporditakse kaks sisenemispunkti:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — tihendab seansi
  mälukirjed üheks kokkuvõtlikuks tekstiks, mille pikkust piirab tokenite eelarve.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API kasutatav
  vanusepõhine tihendamine: see valib kõik mälukirjed, mis on vanemad kui `days`,
  loob neist ühe tihendatud kokkuvõtliku mälukirje ja kustutab originaalid, kui
  `dryRun` on `false`. Anna edasi `dryRun: true`, et vaadata kandidaatide kogumit
  ja tokenite koguarvu ilma midagi muutmata.

Siltide/võtmete põhjal klasterdamist ega iga mälukirje „põhiline vs kokkuvõetav“
hindamist ei toimu — valik põhineb üksnes vanusepiiril ning kokkuvõtte tekst
koosneb iga kandidaadi tihendatud, tüübiprefiksiga reast.

### Kokkuvõtmise käivitamine

Kokkuvõtmine on **käsitsi käivitatav / vabatahtlik** — seadistus `autoSummarize`
on vaikimisi `false`, seega ei tihendata midagi automaatselt. Käivita see API kaudu:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Selle väljalülitatuna hoidmiseks jäta `autoSummarize` lihtsalt vaikeväärtusele
(`false`).

### Näpunäited kvaliteetseks kokkuvõtmiseks

- **Esmalt tee eelvaade parameetriga `dryRun`** — `summarizeMemoriesOlderThan(..., true)`
  tagastab kandidaatide loendi ja tokenite koguarvu, et saaksid enne originaalide
  kustutamist kontrollida, mis ühendatakse.
- **Käivita kokkuvõtmine väikese koormusega ajal**, kui sul on suur mälukorpus —
  LLM-i väljakutse on protsessi aeglane osa.

```bash
# Croni laadis: tee kokkuvõte iga päev kell 3 öösel
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackendi pakkujamuster

> **Tõeallikas:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testid:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackendi pakkujamuster lisab olemasolevale mälumootorile **vahetatava taustsüsteemi abstraktsioonikihi**. Ühe salvestusimplementatsiooniga seotuse asemel toetab mälusüsteem nüüd mitut taustsüsteemi (SQLite, Obsidian, Notion, kohandatud HTTP-taustsüsteemid) koos seadistatava esmase/varu marsruutimisega.

### Arhitektuur

```
┌──────────────────────────────────────────────────────────┐
│                    API marsruudid                         │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│         Singleton-orkestreerija (manager.ts)              │
│                                                          │
│  Esmane ───► Taustsüsteem A  (nt SQLite)                 │
│  Varu ─────► Taustsüsteem B  (nt Obsidian)               │
│              Taustsüsteem C  (nt Notion GenericBackendi  │
│                               kaudu)                     │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite'i   │ │ Obsidiani  │ │ GenericMemory    │
│ taustsüst. │ │ taustsüst. │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Põhiliides (`backend.ts`)

Iga taustsüsteem peab implementeerima liidese `MemoryBackend`:

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

  // Otsing
  search(config: SearchConfig): Promise<Memory[]>;

  // Seisund
  health(): Promise<HealthCheckResult>;

  // Elutsükkel (valikuline)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-orkestreerija, mis:

- **registreerib** taustsüsteemid meetodiga `register(backend)` — seda kutsutakse käivitamisel failist `index.ts`;
- **seadistab** esmase ja varutaustsüsteemid meetodiga `configure(primary, fallbacks)`;
- **marsruudib** CRUD-toimingud ja otsingu esmasele taustsüsteemile ning kasutab tõrke korral varuahelat;
- **kontrollib** regulaarselt kõigi taustsüsteemide seisundit.

**Varusüsteemi käitumine:**

| Toiming  | Esmane                  | Varusüsteemid                                    |
| -------- | ----------------------- | ------------------------------------------------ |
| `create` | ✅ Ainult esmane        | ❌                                               |
| `get`    | ✅ Proovi esmalt esmast | ✅ Kasuta varusüsteemi, kui tulemus on null      |
| `update` | ✅ Ainult esmane        | ✅ Asünkroonne „käivita ja unusta“ sünkroonimine |
| `delete` | ✅ Ainult esmane        | ✅ Asünkroonne „käivita ja unusta“ sünkroonimine |
| `list`   | ✅ Ainult esmane        | ❌                                               |
| `search` | ✅ Esmalt esmane        | ✅ Tõrke korral kasuta varusüsteemi              |

#### GenericMemoryBackend (`genericBackend.ts`)

Üldine HTTP-konnektor, mis kohandab mis tahes REST API MemoryBackendiks. Kasulik järgmiste jaoks:

- **Notion** — ühendamine Notion API kaudu;
- **Obsidian** — ühendamine Obsidian Local REST API kaudu;
- **Kohandatud taustsüsteemid** — mis tahes teenus, mis pakub RESTful-mälu-API-t.

**Konfiguratsioon:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Taustsüsteemi API baas-URL
  apiKey?: string;           // Bearer-tõend autentimiseks
  headers?: Record<string, string>;  // Kohandatud HTTP-päised
  timeout?: number;          // Päringu ajalõpp (vaikimisi: 30000ms)
  backendType?: string;      // Logimiseks

  // Lõpp-punktide ülekirjutused (vaikeväärtused järgivad REST-i tavasid)
  endpoints?: {
    search?: string;   // vaikimisi: "/memories/search"
    create?: string;   // vaikimisi: "/memories"
    list?: string;     // vaikimisi: "/memories"
    get?: string;      // vaikimisi: "/memories/{id}"
    update?: string;   // vaikimisi: "/memories/{id}"
    delete?: string;   // vaikimisi: "/memories/{id}"
    health?: string;   // vaikimisi: "/health"
  };

  // Päringuparameetrite nimede vastendused
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Teekonnaparameetrite nimede vastendused
  pathParams?: {
    id?/memoryId?
  };
}
```

**Tuntud taustsüsteemid** on `KNOWN_BACKENDS`-is eelkonfigureeritud:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend, mis osutab aadressile localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend, mis osutab aadressile api.notion.com/v1
```

#### Sisseehitatud taustsüsteemid

##### SQLiteBackend (`sqliteBackend.ts`)

Vaikimisi kasutatav peamine taustsüsteem. Mähib olemasoleva SQLite-põhise mälusalvesti, kasutades faili `src/lib/memory/store.ts`. Registreeritakse käivitamisel automaatselt.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Mähib olemasoleva Obsidiani integratsiooni (`src/lib/memory/obsidianBackend.ts`). Ühendub Obsidiani hoidla Obsidian Local REST API kaudu.

### Sätted

Mälu taustsüsteemi sätted salvestatakse rakenduse sätete tabelisse ja neid hallatakse faili `src/lib/memory/settings.ts` kaudu:

| Säte                              | Keskkonna-/konfiguratsioonivõti | Vaikeväärtus | Kirjeldus                                           |
| --------------------------------- | ------------------------------- | ------------ | --------------------------------------------------- |
| Peamine taustsüsteem              | `memoryPrimaryBackend`          | `"sqlite"`   | Peamise taustsüsteemi ID                            |
| Varutaustsüsteemid                | `memoryFallbackBackends`        | `[]`         | Järjestatud varutaustsüsteemide ID-d                |
| Taustsüsteemide konfiguratsioonid | `memoryBackendConfigs`          | `{}`         | Taustsüsteemipõhised konfiguratsiooni ülekirjutused |

Sätted normaliseeritakse funktsiooniga `normalizeMemorySettings()` ja puhverdatakse funktsioonis `getMemorySettings()`.

### Lähtestamisvoog

```
Rakenduse alglaadimine
  → index.ts impordid (kõrvalmõjuna): registreerib SQLiteBackend-i
  → initMemoryBackends() kutsutakse rakenduse elutsüklist:
      1. Sätete laadimine (getMemorySettings)
      2. Peamise ja varutaustsüsteemide konfigureerimine
      3. Kõigi taustsüsteemide lähtestamine (tervisekontroll)
      4. Päringute vastuvõtmiseks valmis
```

### Uue taustsüsteemi lisamine

1. **Rakendage liides `MemoryBackend`** failis `src/lib/memory/<name>Backend.ts`
2. **Eksportige** failist `src/lib/memory/index.ts`
3. **Registreerige** käivitamisel käsuga `memoryManager.register(yourBackend)`
4. **Konfigureerige** sätete kaudu: määrake `memoryPrimaryBackend` väärtuseks oma taustsüsteemi ID
5. **Testige**, kasutades viitena faili `src/lib/memory/__tests__/generic-backend.test.ts`

#### Näide: Braini taustsüsteem

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

### Kontrollimine

#### Üksustestid

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Oodatav väljund: **35 testi, kõik edukad**, mis hõlmavad järgmist:

- Konstruktor (2)
- Tervisekontroll (4) — õnnestumine, tõrge 500, võrgutõrge, latentsus
- Lähtestamine (2) — õnnestumine, tõrge
- Loomine (2) — vaikimisi lõpp-punkt, kohandatud lõpp-punkt
- Hankimine (4) — õnnestumine, 404 → null, muu kui 404 korral erind, kohandatud teekonnaparameetrid
- Uuendamine (2) — õnnestumine, 404 → false
- Kustutamine (2) — õnnestumine, 404 → false
- Loetlemine (2) — päringuparameetrid, kohandatud parameetrinimed
- Otsing (3) — päringuparameetrid, kohandatud lõpp-punkt, suvandite serialiseerimine
- Autentimispäised (2) — Bearer-tõend, kohandatud päised
- Tehas (1)

#### Tüübikontroll

```bash
npm run typecheck:core
```

Oodatav tulemus: **0 viga**.
