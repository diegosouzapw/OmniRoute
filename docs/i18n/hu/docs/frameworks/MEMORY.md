# Memory System (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Hiteles forrás:** `src/lib/memory/` és `src/app/api/memory/`
> **Legutóbbi frissítés:** 2026-06-28 — v3.8.40 (alapértelmezetten kikapcsolva + int8 kvantálási felzárkóztatás)

Az OmniRoute API-kulcs alapján (és opcionálisan munkamenet-azonosító alapján) társított, tartós társalgási memóriát biztosít. Az emlékek automatikusan, egyszerű reguláriskifejezés-alapú mintaillesztéssel kerülnek kinyerésre az LLM-válaszokból, majd a későbbi kérésekbe egy bevezető rendszerüzenetként lesznek visszainjektálva (vagy első felhasználói üzenetként azoknál a szolgáltatóknál, amelyek elutasítják a rendszerszerepet).

> **A memória alapértelmezetten KI van kapcsolva (v3.8.30+).** A `DEFAULT_MEMORY_SETTINGS.enabled`
> értéke mostantól `false` (`src/lib/memory/settings.ts`). A memória engedélyezése
> legfeljebb `maxTokens` (~2k) mennyiségű lekért kontextust injektál **minden**
> csevegési kérésbe, ami számlázásra kerül — ez váratlan költséget jelenthet az új
> telepítéseknél és a saját kontextusukat kezelő klienseknél. Kifejezetten engedélyezze a
> **Settings → Memory** menüpontban (a `MemorySkillsTab` a memória engedélyezésekor
> tokenköltségre figyelmeztető kiemelést jelenít meg).
> Egy kliens egyetlen kérés esetén letilthatja ezt az `x-omniroute-no-memory`
> kérésfejléccel (`true`/`1`/`yes`) — lásd a kérésfejlécek táblázatát az
> [API_REFERENCE.md](../reference/API_REFERENCE.md) dokumentumban. A memória nélküli kérés
> `memoryOwnerId = null` értéket állít be, ami az adott kérésnél **mind** a memória,
> **mind** a készségek injektálását letiltja
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

A memória hatóköre **API-kulcsonként**, nem pedig felhasználónként különül el — az ugyanazzal az API-kulccsal hitelesített összes kérés ugyanazt a memóriakészletet használja, amely opcionálisan tovább szűkíthető a `sessionId` alapján.

## Architektúra

```
Kliens → /v1/chat/completions (az apiKeyInfo korábban feloldva)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # kinyeri az azonosítót
    → getMemorySettings()                     # gyorsítótárazott beállítások
    → shouldInjectMemory(body, {enabled})     # engedélyezési feltétel
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + opcionális vektor
    → injectMemory(body, memories, provider)  # rendszer- vagy felhasználói üzenet
  → upstream szolgáltatói hívás
  → válaszkor: extractFacts(text, apiKeyId, sessionId)  # nem blokkoló
    → setImmediate → createMemory(fact) minden találathoz
                   → embed(content) + upsertVector(id, vec)
```

Az injektálási és kinyerési hívási helyek az
`open-sse/handlers/chatCore.ts` fájlban vannak bekötve (keresse a `retrieveMemories`, `injectMemory`
és `extractFacts` elemeket).

## A motor architektúrája (3 szintű feloldás)

A memóriamotor futásidőben, az elérhető infrastruktúra és a beállítások alapján választja ki a lekérési útvonalat. Három szint létezik, amelyek prioritási sorrendben kerülnek alkalmazásra:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  0. SZINT — Kulcsszó (FTS5)                                  │
  │  Próba által meghatározott elérhetőség: FTS5, ha az SQLite-  │
  │  build támogatja (better-sqlite3 / node:sqlite / bun:sqlite);│
  │  FTS5 nélküli buildekben nem érhető el (pl. sql.js/WASM —    │
  │  "no such module: fts5"). Akkor használatos, ha a stratégia  │
  │  = "exact", illetve tartalékként; a motorállapot keyword     │
  │  értéke a próba eredményét tükrözi.                          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  1. SZINT — Beágyazott vektor (sqlite-vec)                   │
  │  Az sqlite-vec v0.1.9 betöltése a db.loadExtension() által.  │
  │  KNN-alapú teljes keresés Float32 vektorokon. Aktív, ha:     │
  │   • a sqlite-vec loadExtension sikeres                       │
  │   • elérhető olyan beágyazási forrás (remote | static |      │
  │     transformers), amely Float32Array értéket tud előállítani│
  │   • létezik a vec_memories tábla (az első ready() során jön  │
  │     létre)                                                   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  2. SZINT — Qdrant (külön engedélyezhető külső vektoradatbázis)│
  │  Ha engedélyezve van, a szemantikus/hibrid keresésnél        │
  │  felváltja a sqlite-vec használatát. Futó Qdrant-példányt és │
  │  konfigurált állomásnevet/portot igényel.                    │
  └─────────────────────────────────────────────────────────────┘
```

A visszalépés automatikus és transzparens:

- Ha a sqlite-vec betöltése sikertelen, az 1. szint nem érhető el → visszalép a 0. szintre.
- Ha a beágyazási forrás hibát ad vissza, az 1. szint visszalép a 0. szintre.
- Ha a Qdrant nem működik megfelelően, a 2. szint visszalép az 1. szintre (vagy a 0. szintre, ha az 1. szint sem érhető el).

## Beágyazási források

A beágyazási réteg (`src/lib/memory/embedding/`) a `MemorySettingsExtended.embeddingSource` alapján határozza meg, hogy melyik forrást használja:

| Forrás         | Leírás                                                                                            | Kulcs szükséges | Hidegindítás     |
| -------------- | ------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| `remote`       | Egy konfigurált szolgáltató beágyazási API-ját használja (OpenAI, Cohere stb.)                    | Igen            | Nincs            |
| `static`       | Helyi keresőtáblás beágyazás a `potion-base-8M` segítségével (WordPiece + átlagpooling)           | Nem             | ~200ms           |
| `transformers` | Helyi ONNX-következtetés az `@huggingface/transformers` v4 és az `all-MiniLM-L6-v2` használatával | Nem             | ~3s + ~400MB RAM |
| `auto`         | Futásidejű feloldás: távoli (ha létezik kulcs) → statikus → transformers → null                   | Attól függ      | Attól függ       |

**Az `auto` feloldási sorrendje:**

1. Az első olyan szolgáltató megkeresése a `listEmbeddingProviders()` eredményében, amelynél `hasKey === true` → `remote`.
2. Ha `settings.staticEnabled === true` → `static`.
3. Ha `settings.transformersEnabled === true` → `transformers`.
4. Ellenkező esetben → `null` (FTS5 kulcsszavas keresésre vált vissza).

A beágyazási gyorsítótár (`src/lib/memory/embedding/cache.ts`) egy memóriában tárolt LRU-leképezést használ, amelynek kulcsa `${source}:${model}:${dim}:${sha256(text)}`, mérete legfeljebb `MEMORY_EMBEDDING_CACHE_MAX` bejegyzés (alapértelmezés szerint 1000), TTL-je pedig `MEMORY_EMBEDDING_CACHE_TTL_MS` (alapértelmezés szerint 5 perc). A folyamat teljes életciklusa alatt minden hívó közösen használja.

## Hibrid RRF (k=60)

Amikor `strategy = "hybrid"` és a vektortár elérhető, a lekérés Reciprocal Rank Fusion használatával egyesíti az FTS5- és a vektoros eredményeket:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ahol k = 60 (a MEMORY_RRF_K segítségével konfigurálható)
          i
```

Konkrétan:

1. FTS5-keresés futtatása → rangsorolt lista: `R_fts` (1..N. pozíció).
2. KNN-vektorkeresés futtatása → rangsorolt lista: `R_vec` (1..M. pozíció).
3. Minden egyedi `memoryId` esetén:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, ha nincs a listában).
4. Rendezés `rrf_score` szerint csökkenő sorrendben, majd a tokenkeret szerinti bejárás alkalmazása.

Az RRF közismerten hatékony anélkül, hogy a heterogén lekérési rendszerek pontszámait normalizálni kellene. Az alapértelmezett `k=60` érték az eredeti Cormack és társai tanulmányból származik, és kis korpuszoknál (<10k memória) jól működik.

## Utólagos feltöltés (lusta + újraindexelés)

Amikor a beágyazási modell megváltozik (az `embedding_signature` alapján észlelve), a vektortár újraépül, és a `memories` táblában minden meglévő memória `needs_reindex = 1` jelölést kap.

**Lusta utólagos feltöltés**: A következő lekéréskor minden olyan memória, amelyhez hiányzik a vektorbejegyzés, beágyazásra és beszúrásra kerül a `vec_memories` táblába a keresés futtatása előtt. Ez a valós kérések között osztja el az utólagos feltöltés költségét anélkül, hogy blokkolná az indítást.

**Kifejezett újraindexelés**: A `/dashboard/memory` Engine lapján található egy „Újraindexelés most” gomb, amely meghívja a `POST /api/memory/reindex` végpontot. A kezelő meghívja a `runReindexBatch()` függvényt a `src/lib/memory/reindex.ts` fájlból, amely kérésenként legfeljebb `limit` függőben lévő bejegyzést dolgoz fel. Az előrehaladás a `GET /api/memory/engine-status` végponton (`vectorStore.needsReindex`) kérdezhető le.

A `memory_vec_meta` tábla (migráció: `083_memory_vec.sql`) a következőket tárolja:

- `active_dim` — az aktuális vektordimenzió (null = még nincs kalibrálva).
- `embedding_signature` — a változások észlelésére használt `${source}:${model}:${dim}`.
- `last_reset_at` — a legutóbbi teljes visszaállítás időbélyege.
- `vec_loaded` — 0/1 jelző arra vonatkozóan, hogy a sqlite-vec betöltése sikeres volt-e.

## Beállítások bővítése

Kilenc beágyazási és vektormező érhető el a `MemorySettingsExtended` típusban, a
`src/shared/schemas/memory.ts` fájlban, és ezek a `src/lib/db/settings.ts` segítségével maradnak tartósan tárolva:

| Mező                     | Típus                                              | Alapérték | Leírás                                                                   |
| ------------------------ | -------------------------------------------------- | --------- | ------------------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`  | A használandó beágyazási forrás                                          |
| `embeddingProviderModel` | `string \| null`                                   | `null`    | Szolgáltató/modell `provider/model` formátumban                          |
| `customBaseUrl`          | `string \| null`                                   | `null`    | Kizárólag a memóriához használt, OpenAI-kompatibilis végpont alap-URL-je |
| `customModelId`          | `string \| null`                                   | `null`    | Az egyéni végpontnak küldött modellazonosító                             |
| `transformersEnabled`    | `boolean`                                          | `false`   | A Transformers.js használatának engedélyezése (MiniLM, ~400MB)           |
| `staticEnabled`          | `boolean`                                          | `false`   | A statikus, helyi potion-base-8M modell használatának engedélyezése      |
| `rerankEnabled`          | `boolean`                                          | `false`   | Az újrarangsorolási lépés engedélyezése (+200-500ms/kérés)               |
| `rerankProviderModel`    | `string \| null`                                   | `null`    | Újrarangsorolási szolgáltató/modell `provider/model` formátumban         |

A `rerankProviderModel` feloldását a `POST /v1/rerank` végzi (loopback kapcsolaton keresztül meghívva), ezért bármit elfogad, amit ez az útvonal is: egy válogatott felhőalapú újrarangsorolási modellt (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …), vagy egy OpenAI-kompatibilis szolgáltatói csomópontot `<node-prefix>/<model>` formában (például `skilled-mini/bge-reranker-v2-m3` egy TEI/Infinity gép esetén). A loopback csomópontok mindig használhatók; egy másik gazdagépen lévő csomóponthoz (LAN, Tailscale) ezenfelül szükséges a `RERANK_REMOTE_PROVIDER_NODES` funkciójelző, és meg kell felelnie a szolgáltatói kimenő URL-ekre vonatkozó szabályzatnak — lásd: [Funkciójelzők](../reference/FEATURE_FLAGS.md). Az irányítópult választója a válogatott szolgáltatókat és a helyi csomópontokat sorolja fel; bármely érvényes `provider/model` karakterlánc közvetlenül is beállítható a `PUT /api/settings/memory` használatával.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | A használandó vektoros háttérrendszer |

Ezek a `GET /PUT /api/settings/memory` útvonalon keresztül érhetők el (`MemorySettingsExtendedSchema` séma).

A `remote` forrás esetén a Memory az opcionális `customBaseUrl` és
`customModelId` beállításokat is elfogadja. Ezek együtt egy OpenAI-kompatibilis `/embeddings`
végpontot és modellt választanak ki a globális beágyazási nyilvántartás módosítása nélkül. A végpont
használat előtt normalizálásra kerül, és a szolgáltatói kimenő URL-ekre vonatkozó szabályzat ellenőrzi: HTTP(S)
szükséges, a beágyazott hitelesítési adatok és a lekérdezési karakterláncok nem engedélyezettek, a felhős metaadat-
címek pedig továbbra is blokkolva maradnak. Az üres értékek megtartják a nyilvántartásban kiválasztott szolgáltatót. Az irányítópultnak
visszaküldött hibák megtisztításra kerülnek, és a végpont hitelesítési adatai soha nem kerülnek naplózásra.

> **TODO (D20):** A `global` hatókör (a memóriák megosztása az összes API-kulcs között)
> ebben a kiadásban nincs megvalósítva. Sémamódosításokat és globális lekérési
> útvonalat igényel. Külön követendő.

## Tárolási rétegek

### Elsődleges: SQLite (`memories` tábla)

A `015_create_memories.sql` migráció hozza létre:

| Oszlop                      | Típus              | Megjegyzések                                                                                 |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | A `crypto.randomUUID()` által generált UUID                                                  |
| `api_key_id`                | `TEXT NOT NULL`    | A tulajdonos API-kulcs                                                                       |
| `session_id`                | `TEXT`             | Opcionális, beszélgetésenkénti hatókör                                                       |
| `type`                      | `TEXT NOT NULL`    | A következők egyike: `factual`, `episodic`, `procedural`, `semantic`                         |
| `key`                       | `TEXT`             | Stabil upsertkulcs, pl. `preference:i_prefer_python`                                         |
| `content`                   | `TEXT NOT NULL`    | A tényleges tény szövege                                                                     |
| `metadata`                  | `TEXT`             | JSON-adatblokk (category, extractedAt, source, ...)                                          |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601-karakterláncok                                                                      |
| `expires_at`                | `TEXT`             | Opcionális lejárat; a `NULL` állandót jelent                                                 |
| `memory_id`                 | `INTEGER UNIQUE`   | A `023_fix_memory_fts_uuid.sql` adta hozzá az UUID-k ↔ FTS5-sorazonosítók összekapcsolásához |

Indexek: `api_key_id`, `session_id`, `type`, `expires_at`, valamint az egyedi
`memory_id` index.

**Upsert szemantikája**: a `createMemory()` megkeresi a már létező, azonos
`(api_key_id, key)` értékekkel rendelkező sort, és ha megtalálja, helyben frissíti (a `metadata`
sekély szétterítéssel történő egyesítésével). Ez megakadályozza, hogy az ismétlődő
preferencianyilatkozatok miatt a tábla korlátlanul növekedjen.

### Teljes szöveges keresés (`memory_fts` virtuális tábla)

A `022_add_memory_fts5.sql` egy FTS5 virtuális táblát hoz létre a `content` és
`key` mezők fölött. A `023_fix_memory_fts_uuid.sql` kijavít egy valós használat során előforduló hibát, amelyben az UUID
elsődleges kulcs nem volt összekapcsolható az FTS5 egész szám típusú sorazonosítójával — a migráció hozzáadja a
`memory_id` oszlopot, újra létrehozza az FTS-táblát, és beállítja az eseményindítókat
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), amelyek INSERT, DELETE és UPDATE
esetén szinkronban tartják az FTS-t.

A `retrieval.ts` használja a `semantic` és `hybrid` stratégiákhoz (lásd alább).
A lekérési kód a `hasTable("memory_fts")` segítségével védekezik, és visszatér az
időrendi sorrendhez, ha az FTS-tábla hiányzik, vagy az FTS-lekérdezés hibát jelez.

### Opcionális: Qdrant (2. szintű vektortároló)

A `src/lib/memory/qdrant.ts` egy opcionális Qdrant-integrációt valósít meg 2. szintű
vektortárolóként. A lekérés csak akkor irányít a Qdrant felé, ha a motorválasztó
`memoryVectorStore === "qdrant"` — az alapértelmezett `"auto"` (és a `"sqlite-vec"`)
**soha** nem választja a Qdrant rendszert. Az Engine lap kapcsolója **együtt** állítja be a `qdrantEnabled` és
`memoryVectorStore` értékeket: az engedélyezés a Qdrant rendszert teszi elsődleges tárolóvá, a letiltás pedig
visszaállítja az értéket `"auto"` állapotra (#5597 — a javítás előtt az engedélyezés hatástalan volt, mert semmi
nem írta a motorválasztó értékét). Ha a Qdrant nem érhető el, vagy nem ad vissza semmit, a lekérés
a sqlite-vec → FTS5 tartalék útvonalra tér át.

- `upsertSemanticMemoryPoint()` — beágyazza a `key + content` értékét a konfigurált
  beágyazási modellel, biztosítja a gyűjtemény létezését (első használatkor
  koszinusztávolság-alapú vektorokat hoz létre), majd beszúr vagy frissít egy pontot
  a következő payload használatával: `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — beágyazza a lekérdezést, majd
  keresést végez a gyűjteményben a `kind = "omniroute_memory"` feltétel szerint,
  opcionálisan pedig az `apiKeyId` / `sessionId` alapján is szűr. A `topK`
  értékét az `[1, 20]` tartományra korlátozza.
- `deleteSemanticMemoryPoint(id)` — egyetlen pont törlése. A `deleteMemory()`
  hívja meg az SQLite-sor eltávolítása után (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — tömegesen törli azokat a pontokat,
  amelyek `expiresAtUnix` értéke már elmúlt, vagy amelyek `createdAtUnix` értéke
  régebbi a megőrzési határidőnél. Először megszámolja őket, hogy az irányítópult
  a tényleges számokat jeleníthesse meg.
- `checkQdrantHealth()` — `GET /readyz` állapotellenőrzés késleltetésméréssel.

A beállítási felület a `/dashboard/memory` **Engine lapján** teszi elérhetővé a
Qdrant konfigurációját, az állapotellenőrzést, a szemantikus keresés tesztelését
és a tisztítást. A `src/app/api/settings/qdrant/` alatti megfelelő útvonalak
a v3.8.6 verziótól kezdve mind be vannak kötve:

| Útvonal                                 | Metódus       | Leírás                                 |
| --------------------------------------- | ------------- | -------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant-beállítások olvasása/frissítése |
| `/api/settings/qdrant/health`           | `GET`         | Elérhetőségi próba + késleltetés       |
| `/api/settings/qdrant/search`           | `POST`        | Szemantikus keresés tesztelése         |
| `/api/settings/qdrant/cleanup`          | `POST`        | Lejárt/régi pontok eltávolítása        |
| `/api/settings/qdrant/embedding-models` | `GET`         | Elérhető beágyazási modellek listázása |

**Működési megjegyzések (mire számíthat):**

- **Motor kiválasztása** — a Qdrant engedélyezése az Engine lapon elsődleges
  tárolóvá teszi azt (beállítja a `memoryVectorStore="qdrant"` értéket); a
  letiltás visszaállítja az értéket `"auto"`-ra (#5597).
- **Nincs utólagos feltöltés** — csak a Qdrant engedélyezése **után** létrehozott
  vagy frissített memóriák kerülnek bele (nem blokkoló kettős írással). A már
  létező SQLite-memóriák migrálása **nem** történik meg; a „Reindex Now” csak
  a sqlite-vec indexét építi újra, a Qdrantét nem.
- **A vektordimenzió automatikusan észlelhető** az első használatkor létrehozott
  tényleges beágyazásból — nincs kitöltendő dimenziómező. A beágyazási modell
  módosítását egy gyűjtemény létrejötte után a rendszer **nem** kezeli
  automatikusan: a meglévő gyűjtemény változatlan marad, a dimenzióeltéréses
  írások/keresések sikertelenek lesznek, és a rendszer visszatér a sqlite-vec
  használatára. A beágyazó váltásához hozza létre újra a gyűjteményt (új névvel,
  vagy a Qdrantban történő törlésével).
- **Távolságmetrika** — mindig **Cosine** (a gyűjtemény létrehozásakor rögzített;
  nem konfigurálható).
- **Hitelesítés** — csak API-kulccsal (az `api-key` fejlécben elküldve; a
  hitelesítés nélküli helyi Docker esetében opcionális). A JWT/RBAC nincs
  használatban.
- **Konfigurációs mezők** — a felület a `host`, `port`, `collection`,
  `embeddingModel`, `apiKey` mezőket teszi elérhetővé. A `vectorSize` /
  `hnswEfConstruct` csak környezeti változón/adatbázison keresztül állítható,
  és a `vectorSize` nincs használatban a gyűjtemény létrehozásakor (a dimenzió
  a beágyazásból származik).

### Vektorkvantálás (int8 — opcionális, mindkét háttérrendszerben)

Mindkét vektoros háttérrendszer támogatja az **opcionális int8-kvantálást** a
tárolt vektorok memóriaigényének csökkentésére (nagyjából 4× kisebb a Float32-nél),
a visszakeresési pontosság csekély romlása árán. Alapértelmezés szerint mindkettőnél
**ki van kapcsolva** — a vektorok teljes pontosságúak maradnak, hacsak nincs
kifejezetten engedélyezve.

| Háttérrendszer | Beállítás                       | Típus                          | Alapértelmezés | Beolvasás helye                                             |
| -------------- | ------------------------------- | ------------------------------ | -------------- | ----------------------------------------------------------- |
| Qdrant         | `qdrantQuantization` (DB-kulcs) | `"none" \| "int8" \| "binary"` | `"none"`       | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec     | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`       | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- A **Qdrant** példányonként konfigurálható a `qdrantQuantization`
  beállításkulccsal (a `PUT /api/settings/qdrant` végponton a `quantization`
  mezőként érhető el). `"int8"` esetén a `buildQuantizationConfig()` skaláris
  kvantálást kér (`always_ram`, `0.99` kvantilis), a keresések pedig engedélyezik
  a `rescore: true` beállítást, így a teljes pontosságú vektorok finomítják az
  int8-jelöltek halmazát.
- A **sqlite-vec** kvantálása **csak környezeti változóval** állítható be (nem
  adatbázis-beállítás): állítsa be a `MEMORY_VEC_QUANTIZATION=int8` értéket,
  hogy a helyi vektorokat `int8[dim]` oszlopként tárolja a
  `vec_quantize_int8(?, 'unit')` használatával. A kiválasztott mód bekerül az
  `embedding_signature` értékébe (`:int8` utótagként), így a módok közötti
  váltás kiváltja a `vec_memories` tábla teljes újraindexelését — ugyanazon
  késleltetett utólagos feltöltési útvonalon, amelyet a rendszer a beágyazási
  modell módosításakor is használ.

## Memóriatípusok

`MemoryType` (`src/lib/memory/types.ts`):

| Típus        | Felhasználás                                                                     |
| ------------ | -------------------------------------------------------------------------------- |
| `factual`    | Preferenciák, stabil felhasználói tények, viselkedési minták                     |
| `episodic`   | Egy adott pillanathoz kötődő döntések („I chose Postgres”)                       |
| `procedural` | Munkafolyamat-/útmutató-memória (fenntartva; jelenleg nincs automatikus kinyerő) |
| `semantic`   | Vektortár-bejegyzések számára fenntartva                                         |

A `MemoryConfig` lekérési stratégiája az `exact`, `semantic` vagy `hybrid`
egyike, a hatóköre pedig a `session`, `apiKey` vagy `global` egyike. A
`getMemorySettings()` által meghatározott alapértelmezett hatókör az `apiKey`.

## Ténykinyerés (`extraction.ts`)

A kinyerés **reguláris kifejezéseken alapul**, nem LLM-alapú — a folyamaton
belül, `setImmediate()` használatával fut, így soha nem blokkolja a válaszfolyamot:

- **Preferenciaminták** → `MemoryType.FACTUAL`
  (pl. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Döntési minták** → `MemoryType.EPISODIC`
  (pl. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Viselkedésiminta-minták** → `MemoryType.FACTUAL`
  (pl. `I usually …`, `I always …`, `I tend to …`)

Minden találat tisztításon megy keresztül (`trim`, az egymást követő
szóközkarakterek összevonása, legfeljebb 500 karakter), a kötegen belül pedig
egy stabil `factKey(category, content)` segítségével deduplikálódik, majd a
`createMemory()` tárolja a következő metaadatokkal:
`{category, extractedAt, source: "llm_response"}`. A bemeneti szöveg legfeljebb
64 KiB lehet (`MAX_EXTRACTION_TEXT_LENGTH`) — hosszabb szöveg esetén annak
**vége** kerül felhasználásra, így a legfrissebb asszisztensi tartalom mindig
részt vesz a feldolgozásban.

Az `extractFactsFromText(text)` tesztelési célokra exportált, és tárolás nélkül
adja vissza a strukturált tényeket.

## Lekérés (`retrieval.ts`)

A `retrieveMemories(apiKeyId, config)` a fő belépési pont. A következőket végzi:

1. Normalizálja és ellenőrzi a konfigurációt a `MemoryConfigSchema` segítségével.
2. Azonnal `[]` értéket ad vissza, ha az `enabled` értéke false, vagy a `maxTokens <= 0`.
3. A `maxTokens` értékét a `[1, 8000]` tartományra korlátozza.
4. Észleli, hogy a modern `memories` tábla létezik-e (a régi `memory`
   táblával szemben), így a régebbi adatbázisok továbbra is működnek.
5. Összeállítja az alaplekérdezést egy lejárati feltétellel
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), opcionális
   munkamenet-hatókörrel és opcionális `retentionDays` határértékkel.
6. A stratégia alapján elágazik:
   - **`exact`** (alapértelmezett): időrendi `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ha a `config.query` és a `memory_fts` létezik, végrehajtja a
     `memory_fts MATCH ?` JOIN-műveletet, és FTS-rangsor szerint rendez; ha az
     FTS 0 sort ad vissza, visszatér az időrendi rendezéshez.
   - **`hybrid`**: az FTS-eredmények (nagyobb relevanciával) és az időrendi
     halmaz uniója, id alapján deduplikálva.
7. Kulcsszó-relevancia-pontszámot (`getRelevanceScore`) számít a `content`,
   `key` és `metadata` JSON mezők alapján, ha van megadva lekérdezés. A nulla
   pontszámú sorokat kiszűri.
8. Először csökkenő pontszám, majd csökkenő `createdAt` szerint rendez.
9. Végigjárja a rangsorolt listát, és addig fogad el bejegyzéseket, amíg az
   összesített `estimateTokens(content)` (≈ `length / 4`) a kereten belül
   marad. Ha van találat, mindig legalább egy bejegyzést ad vissza.

Az `estimateTokens` exportált, és a lekérés, az összegzés, valamint az MCP
`omniroute_memory_search` eszköze használja.

## Injektálás (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Az összes memória tartalmát egyetlen `Memory context: …` karakterlánccá fűzi össze.
2. Stratégiát választ a szolgáltató neve alapján:
   - **Rendszerüzenet** (alapértelmezett az OpenAI, Anthropic, Gemini, … esetében) — egy
     `{role: "system", content: memoryText}` elemet szúr be a meglévő rendszerüzenetek
     elé, így a felhasználó rendszerüzenetei továbbra is elsőbbséget élveznek.
   - **Felhasználói üzenet** (tartalékmegoldás) — a
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` szolgáltatói esetében: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Ezek elutasítják a rendszer szerepkört,
     és enélkül 400-as hibát adnának (lásd a GLM/Zhipu #1701-es problémáját).
3. Naplózza a darabszámot, a stratégiát és a modellt a `memory.injection.injected` alatt.

A `providerSupportsSystemMessage(provider)` exportálva van azon hívók számára, amelyeknek
saját útválasztási döntéseket kell hozniuk. Az ismeretlen szolgáltatók biztonsági okokból
alapértelmezetten `true` értéket kapnak (a rendszerszerepkör engedélyezett).

## Beállítások (`settings.ts`)

A memóriakonfiguráció **az adatbázis beállítási táblájában van tárolva**, nem környezeti változókban.
A `getMemorySettings()` a `getSettings()` függvényből olvas, és a folyamaton belül
gyorsítótárazza az eredményt; az `invalidateMemorySettingsCache()` függvényt a beállítások PUT
útvonala hívja meg az írások után.

### Örökölt mezők (minden verzió)

| Adatbáziskulcs        | Típus   | Alapértelmezett                                      | Felhasználói felületi vezérlő                               |
| --------------------- | ------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| `memoryEnabled`       | logikai | `false` (v3.8.30 óta alapértelmezetten kikapcsolva)  | Memória be-/kikapcsolása                                    |
| `memoryMaxTokens`     | egész   | `2000` (`0–16000` tartomány)                         | Tokenkeret az injektáláshoz                                 |
| `memoryRetentionDays` | egész   | `30` (`1–365` tartomány)                             | Megőrzési időablak                                          |
| `memoryStrategy`      | enum    | `"hybrid"` (a `recent`, `semantic`, `hybrid` egyike) | Visszakeresési stratégia                                    |
| `skillsEnabled`       | logikai | `false`                                              | Kulcsonkénti készséginjektálás kapcsolója (lásd: SKILLS.md) |

Megjegyzés: a felhasználói felület `"recent"` stratégiája a belső `"exact"` visszakeresési
stratégiára képeződik le a `toMemoryRetrievalConfig()` segítségével (időrendi sorrend).

### Új mezők (v3.8.6, 21 D9 terv)

A mezők leírását lásd még a fenti „Beállítások kibővítése” szakaszban.

| Adatbáziskulcs              | API-mező                 | Alapértelmezett |
| --------------------------- | ------------------------ | --------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`        |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`          |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`         |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`         |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`         |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`          |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`        |

A Qdranttal kapcsolatos adatbáziskulcsokat (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` — alapértelmezett értéke `"omniroute_memory"`,
`qdrantEmbeddingModel` — alapértelmezett értéke `"openai/text-embedding-3-small"`) a
`qdrant.ts` fájlban található `normalizeQdrantConfig()` olvassa be.

### Környezeti változók (v3.8.6)

Hat opcionális környezeti változó szabályozza a motor futásidejű viselkedését (dokumentáció: `.env.example`):

| Változó                         | Alapértelmezett            | Leírás                                                                                                                                                   |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | A beágyazási gyorsítótár TTL-je (5 perc)                                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | A beágyazási LRU-gyorsítótár bejegyzéseinek maximális száma                                                                                              |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | A Transformers.js modell HF-adattára                                                                                                                     |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | A statikus potion modell HF-adattára                                                                                                                     |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | A letöltött modellek tárolási helye                                                                                                                      |
| `MEMORY_VEC_TOP_K`              | `20`                       | A vektorkeresés alapértelmezett top-K értéke                                                                                                             |
| `MEMORY_RRF_K`                  | `60`                       | Az RRF k konstansa a hibrid kereséshez                                                                                                                   |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Állítsa `int8` értékre a helyi sqlite-vec vektorok kvantált tárolásához (kb. 4× kisebb; külön engedélyezendő). A módosítás újraindexelést kényszerít ki. |

## Összegzés (`summarization.ts`)

A `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` tömöríti a régebbi
tartalmakat, amikor egy kulcs memóriáinak futó tokenösszege meghaladja a
keretet. A sorokon `created_at` szerint csökkenő sorrendben halad végig, megtartja
azokat, amelyek beleférnek, a többinél pedig helyben lecseréli a `content`
értékét az eredeti tartalom első három mondatára. A `tokensSaved` a régi és az
új tartalom `estimateTokens` értékei közötti különbség.

Ez a rutin **elérhető, de a jelenlegi csevegési folyamat nem hívja meg
automatikusan** — folyamatos tömörítéshez hívd meg cron-feladatból,
adminisztrátori műveletből vagy a `MemoryConfig.autoSummarize` kapcsolódó
logikájából. Az adatvesztés egyirányú: az eredeti szöveg felülíródik.

## REST API

Minden végpont kezelési hitelesítést igényel (`requireManagementAuth`).

### Alapvető memóriavégpontok (meglévők + frissítettek)

| Metódus  | Útvonal              | Leírás                                                                                                                                                                                                                                 |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lapozott lista a következő szűrőkkel: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. A válasz tartalmazza a `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` mezőket                                 |
| `POST`   | `/api/memory`        | Bejegyzés létrehozása (Zod által validálva: `content`, `key`, opcionálisan `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Meghívja a `createMemory()` függvényt, amely upsert műveletet végez az `(apiKeyId, key)` alapján |
| `GET`    | `/api/memory/[id]`   | Egyetlen bejegyzés lekérése UUID alapján                                                                                                                                                                                               |
| `PUT`    | `/api/memory/[id]`   | A bejegyzés mezőinek frissítése (`type`, `key`, `content`, `metadata`). Törzs: `MemoryUpdatePutSchema`. Ha elérhető a beágyazási forrás, a vektort is szinkronizálja.                                                                  |
| `DELETE` | `/api/memory/[id]`   | Bejegyzés törlése; a `vec_memories` (D15) tárolóból és lehetőség szerint a Qdrantból is törli. Ha nem található, 404-es választ ad vissza.                                                                                             |
| `GET`    | `/api/memory/health` | Futtatja a `verifyExtractionPipeline("health-check")` ellenőrzést — teljes létrehozás→listázás→törlés ciklus. Visszatérési érték: `{working, latencyMs, error?}`                                                                       |

### Új memóriamotor-végpontok (21. terv)

| Metódus | Útvonal                           | Leírás                                                                                                                                                                                                   |
| ------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`  | `/api/memory/retrieve-preview`    | A `retrieveMemories` próbaüzemű futtatása — pontszámmal, szinttel és tokenszámmal ellátott, rangsorolt eredményeket ad vissza. Törzs: `RetrievePreviewSchema`. NEM illeszt be és nem módosít memóriákat. |
| `GET`   | `/api/memory/embedding-providers` | Felsorolja a beágyazási modellekkel rendelkező szolgáltatókat, jelezve, hogy melyikhez van konfigurálva API-kulcs.                                                                                       |
| `GET`   | `/api/memory/engine-status`       | Visszaadja a motor teljes állapotát: kulcsszavas szint, beágyazás feloldása, vektortár-statisztikák, Qdrant-állapot, újrarangsorolási konfiguráció. Alak: `MemoryEngineStatusSchema`.                    |
| `POST`  | `/api/memory/summarize`           | Manuálisan elindítja a memóriatömörítést. Törzs: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Visszatérési érték: `{candidates, tokensSaved}`.                                      |
| `POST`  | `/api/memory/reindex`             | Elindítja a `needs_reindex=1` értékű memóriák vektoros újraindexelését. Törzs: `MemoryReindexSchema` (`force`). Visszatérési érték: `{started, pending}`.                                                |

### Beállítási végpontok

| Metódus | Útvonal                                 | Leírás                                                                                                                       |
| ------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/memory`                  | Az aktuális normalizált `MemorySettingsExtended` (7 új mező + örökölt mezők)                                                 |
| `PUT`   | `/api/settings/memory`                  | A `MemorySettingsExtendedSchema` bármely mezőjének frissítése (összesen 12 mező)                                             |
| `GET`   | `/api/settings/qdrant`                  | Aktuális Qdrant-beállítások (`QdrantSettingsSchema`)                                                                         |
| `PUT`   | `/api/settings/qdrant`                  | A Qdrant-beállítások frissítése. Törzs: `QdrantSettingsUpdateSchema`. Az `apiKey` = üres karakterlánc eltávolítja a kulcsot. |
| `GET`   | `/api/settings/qdrant/health`           | Élőségi próba a konfigurált Qdrant-példányon. Visszatérési érték: `QdrantHealthResultSchema`.                                |
| `POST`  | `/api/settings/qdrant/search`           | Szemantikus keresési teszt a Qdranton. Törzs: `QdrantSearchSchema` (`query`, `topK`).                                        |
| `POST`  | `/api/settings/qdrant/cleanup`          | Az elévült / régi memóriákhoz tartozó Qdrant-pontok eltávolítása.                                                            |
| `GET`   | `/api/settings/qdrant/embedding-models` | A Qdranthoz elérhető beágyazási modellek listázása.                                                                          |

Az `/api/memory` listázási lekérdezése támogatja a `page` alapú lapozást
(`parsePaginationParams`) **vagy** a nyers `offset` értéket — ha az `offset`
meg van adva, az élvez elsőbbséget, és a válasz szerkezetéhez egy származtatott
`page` érték kerül kiszámításra.

## MCP-eszközök (`open-sse/mcp-server/tools/memoryTools.ts`)

Amikor az MCP-kiszolgáló engedélyezve van, három memóriaeszköz kerül regisztrálásra:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → a `retrieveMemories()` köré épül. A v3.8.6 (D16) verziótól kezdve a `strategy`
  értékét a `getMemorySettings()` olvassa be ahelyett, hogy az `"exact"` érték
  fixen lenne beégetve. Ha a `query` meg van adva, és a `strategy` értéke
  `semantic` vagy `hybrid`, akkor az elérhető vektortár kerül használatra.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → a `createMemory()` köré épül. Csak a 4 kanonikus típust fogadja el:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → kilistázza az
  egyező bejegyzéseket, opcionálisan a létrehozási időbélyeg alapján szűri őket,
  majd mindegyiket törli a `deleteMemory()` segítségével (amely a vektorokat is
  eltávolítja az sqlite-vec + Qdrant rendszerből).

Az átvitellel és a hatókörrel kapcsolatos részletekért lásd az [MCP-SERVER.md](./MCP-SERVER.md) dokumentumot.

## Irányítópult (Memory Studio)

A `src/app/(dashboard)/dashboard/memory/page.tsx` mostantól egy **3 lapos Studio**:

### Lap: Emlékek

- Koncepciókártya (összecsukható „Hogyan működik” magyarázat).
- Valós idejű lista, keresés és lapozás (300 ms késleltetéssel).
- Típusszűrő (`factual` / `episodic` / `procedural` / `semantic` / összes).
- Emlék hozzáadására szolgáló modális ablak (kulcs, tartalom, típus).
- Beágyazott szerkesztés (ceruzagomb → `PUT /api/memory/[id]`).
- Törlés soronként (megerősítő párbeszédablakkal).
- Az aktuális oldal JSON-exportja; JSON-import fájlválasztón keresztül.
- Statisztikai kártyák: `totalEntries`, `tokensUsed`, `hitRate`.
- „Régiek tömörítése” gomb → `POST /api/memory/summarize` (először egy
  próbaüzem jeleníti meg a jelöltek számát, majd megerősítést kér).
- Egy zöld/piros állapotjelző pont, amelyet a `GET /api/memory/health` vezérel.

### Lap: Játszótér

- Lekérdezésbeviteli mező + stratégiaválasztó (Pontos / Szemantikus / Hibrid) + tokenkeret.
- „Szimuláció” → `POST /api/memory/retrieve-preview` — rangsorolt találatokat
  jelenít meg a következőkkel: `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Feloldási panel, amely megmutatja, hogy mely beágyazási forrás / vektortár
  került használatra, és hogy történt-e tartalékmegoldásra váltás.

### Lap: Motor

- Motorállapot-panel (kulcsszavas FTS5-jelvény, beágyazási jelvény,
  vektortárjelvény, Qdrant-állapotjelvény, újrarangsorolási jelvény).
- „Újraindexelés most” gomb → `POST /api/memory/reindex`.
- Beágyazásiforrás-választó (automatikus / távoli / statikus / transformers + kapcsolók).
- Qdrant-konfigurációs kártya (engedélyezési kapcsoló, gazdagép/port/gyűjtemény/kulcs,
  kapcsolat tesztelése, szemantikus keresés tesztelése, tisztítás).
- Újrarangsorolási konfigurációs kártya (engedélyezési kapcsoló, szolgáltató-/modellválasztó).

A memória- és Qdrant-beállítások a
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) alatt is
elérhetők a régi/globális beállítási felületen.

## Gyorsítótárazás

A `src/lib/memory/store.ts` egy folyamaton belüli, LRU-szerű gyorsítótárat tart fenn
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, a legrégebbi 20 %
kilakoltatásával) a `getMemory(id)` olvasásaihoz, továbbá egy általános kulcs/érték
alapú `memoryCache` réteget (`src/lib/memory/cache.ts`) `get`/`set`/`invalidate`
metódusokkal azon hívók számára, amelyek saját hatókörű gyorsítótárat szeretnének
(1 000 bejegyzéses LRU, alapértelmezett TTL: 5 min).

## Adatvédelem és életciklus

- A memória tulajdonosa az API-kulcs azonosítója (`resolveMemoryOwnerId` a
  `chatCore.ts` fájlban). `apiKeyInfo.id` nélkül sem a lekérdezés, sem a beillesztés,
  sem a kinyerés nem fut le.
- A jövőbeli `expires_at` értékkel rendelkező bejegyzéseket a rendszer kiszűri a lekérdezésből; a
  `retentionDays` értéknél régebbi bejegyzéseket a `retrieveMemories`
  `created_at >= cutoff` feltétele zárja ki.
- Végleges törléshez használja a `DELETE /api/memory/[id]` végpontot vagy az `omniroute_memory_clear` parancsot.
- A kinyerés háttérben, visszajelzés nélkül fut a `setImmediate` segítségével; a hibák a
  `memory.extraction.background.failed` alatt kerülnek naplózásra, és soha nem jutnak el a hívóhoz.
- Az ellenőrzési oda-vissza folyamatok (`verifyExtractionPipeline`) egy `finally` blokkban
  törlik a saját tesztbejegyzéseiket.

## Lásd még

- [SKILLS.md](./SKILLS.md) — a `skillsEnabled` beállítás a memória mellett
  eszközdefiníciókat is beilleszt.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-átvitel / hatókörök.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — szélesebb körű API-felület.
- Forrásmodulok:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibrid RRF
  - `src/lib/memory/embedding/index.ts` — többforrású beágyazási réteg
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-sémák az összes memória-API törzséhez
  - `src/shared/schemas/qdrant.ts` — Zod-sémák a Qdrant beállításaihoz/műveleteihez
  - `src/lib/db/memoryVec.ts` — CRUD a `memory_vec_meta` számára
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
  - `src/app/api/settings/qdrant/route.ts` + alútvonalak
  - `src/app/(dashboard)/dashboard/memory/` — Studio felhasználói felület (oldal + komponensek +
    lapok + hookok)
  - `open-sse/handlers/chatCore.ts` (a beillesztés / kinyerés összekapcsolása)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Beágyazási szolgáltató kiválasztása (v3.8.16+)

Az OmniRoute memóriamotorja **négy beágyazási forrást** támogat (`src/lib/memory/embedding/`). Mindegyik eltérő kompromisszumokat kínál a **késleltetés, a költség, a modellminőség és a beállítás összetettsége** terén.

### A beágyazási források

| Szolgáltató    | Forrás                                             | Késleltetés                                    | Költség             | Minőség                                  | Beállítás                             |
| -------------- | -------------------------------------------------- | ---------------------------------------------- | ------------------- | ---------------------------------------- | ------------------------------------- |
| `transformers` | Helyi ONNX-modell (Xenova/all-MiniLM-L6-v2)        | ~50-150ms (CPU)                                | Ingyenes            | Jó                                       | Csak `npm install`                    |
| `static`       | Előre kiszámított vektorok (gyorsítótárazva)       | <1ms                                           | Ingyenes            | N/A (gyorsítótár-találattól függ)        | Nincs                                 |
| `remote`       | OpenAI / Cohere / Voyage API                       | ~100-300ms                                     | $0.02-0.10/1M token | Kiváló                                   | API-kulcs                             |
| `auto`         | Futásidőben kiválasztja a legjobb elérhető forrást | Megegyezik a kiválasztott forráséval           | Ingyenes            | Megegyezik a kiválasztott forráséval     | Nincs                                 |
| _(cache)_      | Memórián belüli LRU-réteg bármely forrás felett    | <1ms (találat), teljes késleltetés (tévesztés) | Ingyenes            | Megegyezik az alapul szolgáló forráséval | Mindig aktív (nem választható forrás) |

### Döntési fa

```
                  Milyen környezetben történik a telepítés?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  FEJLESZTÉS/  KIS ÜZEMI   NAGY ÜZEMI    PEREMHÁLÓZAT /
    TESZT       RENDSZER     RENDSZER       OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ingyenes, nincs API)     (legjobb minőség) (nincs internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            MINDIG adjon hozzá egy `cache` réteget
            (az LruCache bármely szolgáltatót körülveszi)
```

### Adatbázis- és API-konfiguráció

A memóriabeágyazási beállítások a Beállítások API-n/felhasználói felületen konfigurálhatók, nem környezeti változókon keresztül. A Beállítások alatti vonatkozó adatbáziskulcsok (`normalizeMemorySettings` a `src/lib/memory/settings.ts` fájlban) a következők:

- `memoryEmbeddingSource`: `"transformers"` (helyi), `"remote"` (API-alapú, például OpenAI), `"static"` (külső tár) vagy `"auto"`
- `memoryEmbeddingProviderModel`: A távoli/statikus források modellazonosítója (például `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` vagy `"auto"`

#### Helyi modell (`transformers`)

Belsőleg a transformers.js segítségével futtat helyi modelleket:

```bash
# A kódban beolvasott környezeti változók (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-modelltároló
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statikus potion modell
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Gyorsítótár könyvtára
```

#### LRU beágyazási gyorsítótár

A gyorsítótár alapértelmezés szerint mindig aktív, és környezeti változókkal konfigurálható:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Gyorsítótárazott elemek maximális száma
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 perc)
```

### Teljesítményadatok

Benchmark egy tipikus 4 magos x86-kiszolgálón (egyenként ~100 tokenes szövegek):

| Szolgáltató          | p50   | p95   | p99   | Költség / 1M beágyazás             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Ingyenes                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | A Qdrant-tárhelytől függ           |
| `cache` (találat)    | <1ms  | <1ms  | 2ms   | Ingyenes                           |

---

## Ténykinyerési minták (v3.8.16+)

Az `extraction.ts` modul (`src/lib/memory/extraction.ts`) **reguláris kifejezésekkel végzett mintaillesztést** használ strukturált tények kinyerésére a beszélgetések üzeneteiből. E minták megértése segít a kinyerés minőségének az adott felhasználási esethez igazításában.

### Alapértelmezett mintakategóriák

| Kategória           | Példaminta                                                                         | Kinyert adatok                       |
| ------------------- | ---------------------------------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"Előnyben részesítem: <X>"`, `"Szeretem: <X>"`, `"Utálom: <X>"`                   | Felhasználói preferenciák            |
| DECISION_PATTERNS   | `"<X>-et fogok használni"`, `"Úgy döntöttem, hogy <X>"`, `"<X> mellett döntöttem"` | Felhasználói döntések (epizodikusak) |
| PATTERN_PATTERNS    | `"Általában <X>"`, `"Mindig <X>"`, `"Soha nem <X>"`                                | Tartós viselkedési minták            |

### Példaminták (egyszerűsítve)

```ts
// Forrás: src/lib/memory/extraction.ts
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

### Mi kerül kinyerésre

Amikor egy felhasználó ezt mondja:

> „Előnyben részesítem a TypeScriptet. Ehhez a projekthez Postgrest fogok használni. Mindig commitolok a push előtt. Nem szeretem a Pythont.”
> A kinyerés 4 memóriaelemet hoz létre:
>
> | Kulcs                                | Kategória  | Típus    | Tartalom                      |
> | ------------------------------------ | ---------- | -------- | ----------------------------- |
> | `preference:typescript`              | preference | factual  | „TypeScript”                  |
> | `decision:postgres_for_this_project` | decision   | episodic | „Postgres ehhez a projekthez” |
> | `pattern:commit_before_pushing`      | pattern    | factual  | „commit a push előtt”         |
> | `preference:python`                  | preference | factual  | „Python”                      |

### Kinyerési korlátok

A túlzott kinyerés megelőzése érdekében a következő korlátok érvényesek:

| Minimális tartalomhossz | 3 karakter |
| Maximális tartalomhossz | 500 karakter |

### Mikor érdemes letiltani a kinyerést

A kinyerés automatikusan lefut, amikor a memória engedélyezve van; nincs külön,
csak a kinyerésre vonatkozó kapcsoló. A kikapcsolásához teljesen tiltsa le a memóriát (`enabled: false`
a `PUT /api/settings/memory` végponton keresztül). Ezt a következő esetekben érdemes megfontolni:

- Nagy az üzenetforgalom, és a kinyerés költsége nem elhanyagolható
- A beszélgetések többnyire átmeneti jellegűek (csevegés, hibakeresés), és nincs hosszú távú értékük
- A kontextust már egyéni bővítményeken keresztül rögzíti

---

## A hibrid RRF hangolása (v3.8.16+)

A **Reciprocal Rank Fusion (RRF)** algoritmus egyesíti az FTS5 (kulcsszavas) és a vektoros (szemantikai) találatokat. A `k` paraméter szabályozza, hogy az alacsonyabb rangsorolású találatok mekkora súlyt kapjanak.

### A képlet

Minden memóriajelölt RRF-pontszáma:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Ahol:

- `k` az állandó (alapértelmezett értéke 60)
- `rank_i(d)` a `d` dokumentum rangja az i-edik visszakeresési rendszerben (FTS, vektor)
- Az összegzés minden visszakeresési rendszerre kiterjed

### Hogyan befolyásolja a `k` az eredményeket

| `k` értéke                   | Hatás                                                                                        | Leginkább ehhez ajánlott                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `k=0`                        | Tiszta rangfúzió (simítás nélkül)                                                            | Elméleti alapérték                        |
| `k=10-30`                    | Erősen súlyozza a legjobb találatokat, az alacsony rang alig járul hozzá                     | Amikor az első 3 találat általában helyes |
| **`k=60`** (alapértelmezett) | Kiegyensúlyozott — az első 10 találat mindegyike érdemben hozzájárul                         | Általános célú visszakeresés              |
| `k=100+`                     | Laposabb — még az alacsony rangú találatok is dominálhatnak, ha több rendszerben megjelennek | Amikor a fedés fontosabb a pontosságnál   |

### A `k` gyakorlati hangolása

```bash
# Alapértelmezett
MEMORY_RRF_K=60

# Agresszív pontosság (kis memória, kevés dokumentum)
MEMORY_RRF_K=20

# Maximális fedés (nagy memória, változatos lekérdezések)
MEMORY_RRF_K=120
```

**Példa `k=20` esetén:**

- FTS-rang 1 → hozzájárulás: `1/21 = 0.048`
- FTS-rang 10 → hozzájárulás: `1/30 = 0.033`
- Vektorrang 1 → hozzájárulás: `0.048`
- Együttes maximum: `0.096`

**Példa `k=60` esetén:**

- FTS-rang 1 → hozzájárulás: `1/61 = 0.016`
- FTS-rang 10 → hozzájárulás: `1/70 = 0.014`
- Vektorrang 1 → hozzájárulás: `0.016`
- Együttes maximum: `0.033`

Magasabb `k` esetén az első és a tizedik helyezett közötti **relatív különbség** kisebb, ezért az algoritmus inkább a **visszakeresési rendszerek közötti konszenzusra**, mintsem a legmagasabb rangba vetett bizalomra támaszkodik.

### Mikor érdemes módosítani a `k` értékét

| Jelenség                                             | Javaslat                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Mindig a legjobb találat nyer, de helytelen          | **Csökkentse** a k értékét (pl. 20) — a legjobb rangba vetett bizalom többet számít |
| A helyes válasz az első 5 között van, de nem az első | **Növelje** a k értékét (pl. 100) — a laposabb pontozás jutalmazza a konszenzust    |
| A fedés magas, de a pontosság alacsony               | **Csökkentse** a k értékét — tegye élesebbé a rangsort                              |
| A fedés alacsony (releváns dokumentumok hiányoznak)  | **Növelje** a k értékét — adjon esélyt az alacsonyabb rangú dokumentumoknak         |

### RRF-súlyozás

A reciprok rangfúzió azonos súlyt használ a szemantikai vektorranghoz és a teljes szöveges keresés rangjához:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Az egyes súlyok módosítására nincsenek környezeti változók (a `MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` nem létezik).

---

## Összegzési stratégia (v3.8.16+)

A `summarization.ts` modul (`src/lib/memory/summarization.ts`) tömöríti a régebbi emlékeket, hogy az aktív halmaz kicsi maradjon, miközben megőrzi a felidézhetőséget.

### Mikor aktiválódik az összegzés

| Aktiváló esemény                   | Küszöbérték (alapértelmezett) |
| ---------------------------------- | ----------------------------- |
| Manuális aktiválás API-n keresztül | nem alkalmazható              |

### Mi kerül összegzésre

A `summarization.ts` két belépési pontot exportál:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — egy munkamenet
  emlékeit egyetlen, tokenkerettel korlátozott összegző szöveggé tömöríti.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — az API által használt,
  életkoron alapuló tömörítés: kiválaszt minden, `days` napnál régebbi emléket,
  ezekből egyetlen tömörített összegző emléket készít, majd (ha a `dryRun` értéke
  `false`) törli az eredetiket. A `dryRun: true` átadásával megtekinthető a jelöltek
  halmaza és a tokenek teljes száma anélkül, hogy bármi módosulna.

Nincs címke-/kulcsalapú klaszterezési lépés vagy emlékenkénti „alapvető vagy
összegezhető” pontozás — a kiválasztás kizárólag az életkori határértéken alapul,
az összegző szöveg pedig jelöltenként egy tömörített, típussal előtagolt sor.

### Az összegzés aktiválása

Az összegzés **manuális / külön engedélyezendő** — az `autoSummarize` beállítás
alapértelmezés szerint `false`, így semmi nem kerül automatikusan tömörítésre.
Aktiválja az API-n keresztül:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

A kikapcsolt állapot megőrzéséhez egyszerűen hagyja az `autoSummarize` beállítást
az alapértelmezett értékén (`false`).

### Tippek az összegzés minőségéhez

- **Először használja a `dryRun` előnézetet** — a `summarizeMemoriesOlderThan(..., true)`
  visszaadja a jelöltek listáját és a tokenek teljes számát, így az eredetik törlése
  előtt ellenőrizheti, hogy mi kerülne összevonásra.
- **Az összegzést alacsony forgalmú időszakban futtassa**, ha nagy emlékkorpusszal rendelkezik — az LLM-hívás a lassú rész

```bash
# Cron-stílus: összegzés naponta hajnali 3-kor
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend szolgáltatói minta

> **Hiteles forrás:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tesztek:** `src/lib/memory/__tests__/generic-backend.test.ts`

A MemoryBackend szolgáltatói minta egy **cserélhető backend absztrakciós réteget** vezet be a meglévő memóriamotor fölött. Ahelyett, hogy egyetlen tárolási megvalósításhoz lenne kötve, a memóriarendszer mostantól több backendet (SQLite, Obsidian, Notion, egyéni HTTP-backendek) támogat konfigurálható elsődleges/tartalék útválasztással.

### Architektúra

```
┌──────────────────────────────────────────────────────────┐
│                    API-útvonalak                          │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Egyke példányos vezérlő (manager.ts)                │
│                                                          │
│  Elsődleges ──► Backend A  (pl. SQLite)                  │
│  Tartalék    ─► Backend B  (pl. Obsidian)                │
│                 Backend C  (pl. Notion GenericBackenden   │
│                             keresztül)                    │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ backend    │ │ backend    │ │ backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Alapvető interfész (`backend.ts`)

Minden backendnek meg kell valósítania a `MemoryBackend` interfészt:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD-műveletek
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Keresés
  search(config: SearchConfig): Promise<Memory[]>;

  // Állapot
  health(): Promise<HealthCheckResult>;

  // Életciklus (opcionális)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Egyke példányos vezérlő, amely:

- **Regisztrálja** a backendeket a `register(backend)` segítségével — ezt rendszerindításkor az `index.ts` hívja meg
- **Konfigurálja** az elsődleges és tartalék backendeket a `configure(primary, fallbacks)` segítségével
- **Továbbítja** a CRUD-/keresési műveleteket az elsődleges backendnek, hiba esetén pedig végigmegy a tartalékláncon
- **Rendszeresen ellenőrzi** az összes backend állapotát

**Tartalék működés:**

| Művelet  | Elsődleges                         | Tartalékok                           |
| -------- | ---------------------------------- | ------------------------------------ |
| `create` | ✅ Csak az elsődleges              | ❌                                   |
| `get`    | ✅ Először az elsődleges próbálása | ✅ Tartalék, ha az eredmény null     |
| `update` | ✅ Csak az elsődleges              | ✅ Háttérben indított szinkronizálás |
| `delete` | ✅ Csak az elsődleges              | ✅ Háttérben indított szinkronizálás |
| `list`   | ✅ Csak az elsődleges              | ❌                                   |
| `search` | ✅ Először az elsődleges           | ✅ Hiba esetén tartalék              |

#### GenericMemoryBackend (`genericBackend.ts`)

Általános HTTP-összekötő, amely bármely REST API-t MemoryBackend formátumúvá alakít. Hasznos a következőkhöz:

- **Notion** — csatlakozás a Notion API-n keresztül
- **Obsidian** — csatlakozás az Obsidian Local REST API-n keresztül
- **Egyéni backendek** — bármely REST-alapú memória-API-t biztosító szolgáltatás

**Konfiguráció:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // A háttérszolgáltatás API-jának alap-URL-je
  apiKey?: string;           // Bearer token a hitelesítéshez
  headers?: Record<string, string>;  // Egyéni HTTP-fejlécek
  timeout?: number;          // Kérés időkorlátja (alapértelmezett: 30000ms)
  backendType?: string;      // Naplózáshoz

  // Végpont-felülírások (az alapértelmezések REST-konvenciókat használnak)
  endpoints?: {
    search?: string;   // alapértelmezett: "/memories/search"
    create?: string;   // alapértelmezett: "/memories"
    list?: string;     // alapértelmezett: "/memories"
    get?: string;      // alapértelmezett: "/memories/{id}"
    update?: string;   // alapértelmezett: "/memories/{id}"
    delete?: string;   // alapértelmezett: "/memories/{id}"
    health?: string;   // alapértelmezett: "/health"
  };

  // Lekérdezési paraméternevek leképezései
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Útvonalparaméter-nevek leképezései
  pathParams?: {
    id?/memoryId?
  };
}
```

Az **ismert háttérszolgáltatások** előre konfigurálva vannak a `KNOWN_BACKENDS` objektumban:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 címre mutató GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 címre mutató GenericMemoryBackend
```

#### Beépített háttérszolgáltatások

##### SQLiteBackend (`sqliteBackend.ts`)

Az alapértelmezett elsődleges háttérszolgáltatás. A meglévő, SQLite-alapú memóriatárat foglalja egységbe a `src/lib/memory/store.ts` használatával. Rendszerindításkor automatikusan regisztrálódik.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

A meglévő Obsidian-integrációt (`src/lib/memory/obsidianBackend.ts`) foglalja egységbe. Egy Obsidian-tárolóhoz csatlakozik az Obsidian Local REST API-n keresztül.

### Beállítások

A memória-háttérszolgáltatások beállításait az alkalmazás beállítástáblája tárolja, kezelésük pedig a `src/lib/memory/settings.ts` segítségével történik:

| Beállítás                        | Környezeti/konfigurációs kulcs | Alapértelmezett | Leírás                                             |
| -------------------------------- | ------------------------------ | --------------- | -------------------------------------------------- |
| Elsődleges háttérszolgáltatás    | `memoryPrimaryBackend`         | `"sqlite"`      | Az elsődleges háttérszolgáltatás azonosítója       |
| Tartalék háttérszolgáltatások    | `memoryFallbackBackends`       | `[]`            | Tartalék háttérszolgáltatás-azonosítók sorrendben  |
| Háttérszolgáltatás-konfigurációk | `memoryBackendConfigs`         | `{}`            | Háttérszolgáltatásonkénti konfiguráció-felülírások |

A beállításokat a `normalizeMemorySettings()` normalizálja, a `getMemorySettings()` pedig gyorsítótárazza.

### Inicializálási folyamat

```
Az alkalmazás rendszerindítása
  → index.ts importálása (mellékhatás): regisztrálja a SQLiteBackend háttérszolgáltatást
  → az alkalmazás életciklusa meghívja az initMemoryBackends() függvényt:
      1. Beállítások betöltése (getMemorySettings)
      2. Az elsődleges és a tartalék háttérszolgáltatások konfigurálása
      3. Az összes háttérszolgáltatás inicializálása (állapotellenőrzés)
      4. Készen áll a kérések fogadására
```

### Új háttérszolgáltatás hozzáadása

1. **Valósítsa meg a `MemoryBackend` interfészt** a `src/lib/memory/<name>Backend.ts` fájlban
2. **Exportálja** a `src/lib/memory/index.ts` fájlból
3. **Regisztrálja** rendszerindításkor a `memoryManager.register(yourBackend)` használatával
4. **Konfigurálja** a beállításokon keresztül: állítsa a `memoryPrimaryBackend` értékét a háttérszolgáltatás azonosítójára
5. **Tesztelje** a `src/lib/memory/__tests__/generic-backend.test.ts` referenciaként való használatával

#### Példa: Brain háttérszolgáltatás

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

### Ellenőrzés

#### Egységtesztek

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Várt kimenet: **35 teszt, mind sikeres**, amelyek a következőket fedik le:

- Konstruktor (2)
- Állapotellenőrzés (4) — siker, 500-as hiba, hálózati hiba, késleltetés
- Inicializálás (2) — siker, hiba
- Létrehozás (2) — alapértelmezett végpont, egyéni végpont
- Lekérés (4) — siker, 404 → null, nem 404-es hiba kiváltása, egyéni útvonalparaméterek
- Frissítés (2) — siker, 404 → false
- Törlés (2) — siker, 404 → false
- Listázás (2) — lekérdezési paraméterek, egyéni paraméternevek
- Keresés (3) — lekérdezési paraméterek, egyéni végpont, beállítások szerializálása
- Hitelesítési fejlécek (2) — Bearer token, egyéni fejlécek
- Gyártófüggvény (1)

#### Típusellenőrzés

```bash
npm run typecheck:core
```

Elvárt eredmény: **0 hiba**.
