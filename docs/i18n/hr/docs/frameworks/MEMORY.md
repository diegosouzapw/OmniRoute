# Memory System (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Izvor istine:** `src/lib/memory/` i `src/app/api/memory/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40 (prema zadanim postavkama isključeno + naknadna int8 kvantizacija)

OmniRoute pruža trajnu konverzacijsku memoriju vezanu uz API ključ (i
neobavezno ID sesije). Stavke memorije automatski se izdvajaju iz odgovora LLM-a
pomoću jednostavnog podudaranja regex uzoraka te se ponovno umeću u sljedeće
zahtjeve kao početna sistemska poruka (ili prva korisnička poruka za pružatelje
koji odbijaju sistemsku ulogu).

> **Memorija je prema zadanim postavkama ISKLJUČENA (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> sada je `false` (`src/lib/memory/settings.ts`). Omogućavanje memorije umeće do
> `maxTokens` (~2k) dohvaćenog konteksta u **svaki** zahtjev za razgovor, što se
> naplaćuje — neočekivan trošak za nove instalacije i klijente koji upravljaju
> vlastitim kontekstom. Izričito je uključite pod **Postavke → Memorija** (kartica
> `MemorySkillsTab` prikazuje upozorenje o trošku tokena kada je memorija omogućena).
> Klijent može isključiti memoriju za pojedinačni zahtjev pomoću zaglavlja zahtjeva
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — pogledajte tablicu zaglavlja zahtjeva u
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Zahtjev bez memorije postavlja
> `memoryOwnerId = null`, čime se za taj zahtjev onemogućuju **i** umetanje memorije
> **i** umetanje vještina (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Memorija je **ograničena na pojedinačni API ključ**, a ne na pojedinačnog
korisnika — svaki zahtjev autentificiran istim API ključem dijeli isti skup
memorije, uz neobavezno dodatno ograničavanje putem `sessionId`.

## Arhitektura

```
Klijent → /v1/chat/completions (apiKeyInfo razriješen uzvodno)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # izdvaja id
    → getMemorySettings()                     # predmemorirane postavke
    → shouldInjectMemory(body, {enabled})     # kontrolni uvjet
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + neobavezni vektor
    → injectMemory(body, memories, provider)  # sistemska ili korisnička poruka
  → poziv uzvodnog pružatelja
  → pri odgovoru: extractFacts(text, apiKeyId, sessionId)  # bez blokiranja
    → setImmediate → createMemory(fact) za svako podudaranje
                   → embed(content) + upsertVector(id, vec)
```

Mjesta poziva za umetanje i izdvajanje povezana su u
`open-sse/handlers/chatCore.ts` (potražite `retrieveMemories`, `injectMemory`
i `extractFacts`).

## Arhitektura mehanizma (razrješavanje u 3 razine)

Mehanizam memorije tijekom izvođenja određuje put dohvaćanja na temelju dostupne
infrastrukture i postavki. Postoje tri razine koje se primjenjuju prema redoslijedu
prioriteta:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  RAZINA 0 — Ključne riječi (FTS5)                            │
  │  Dostupnost određena provjerom: FTS5 kada ga podržava        │
  │  SQLite međuverzija (better-sqlite3 / node:sqlite /          │
  │  bun:sqlite); nije dostupno u međuverzijama bez FTS5         │
  │  (npr. sql.js/WASM — "no such module: fts5"). Koristi se     │
  │  kada je strategy = "exact" ili kao pričuvna opcija;        │
  │  keyword u engine-status odražava rezultat provjere.         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  RAZINA 1 — Ugrađeni vektor (sqlite-vec)                     │
  │  sqlite-vec v0.1.9 učitava se putem db.loadExtension().      │
  │  KNN pretraživanje grubom silom nad Float32 vektorima.       │
  │  Aktivno kada:                                               │
  │   • učitavanje proširenja sqlite-vec uspije                  │
  │   • dostupan je izvor ugrađivanja (remote | static |         │
  │     transformers) koji može proizvesti Float32Array          │
  │   • postoji tablica vec_memories (stvara se pri prvom        │
  │     pozivu ready())                                          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  RAZINA 2 — Qdrant (neobavezna vanjska vektorska baza)       │
  │  Kada je omogućen, zamjenjuje sqlite-vec za semantic/hybrid. │
  │  Zahtijeva pokrenutu instancu Qdranta te konfigurirane       │
  │  postavke host/port.                                         │
  └─────────────────────────────────────────────────────────────┘
```

Snižavanje razine automatsko je i transparentno:

- Ako se sqlite-vec ne uspije učitati, razina 1 nije dostupna → vraća se na razinu 0.
- Ako izvor ugrađivanja vrati pogrešku, razina 1 vraća se na razinu 0.
- Ako Qdrant nije ispravan, razina 2 vraća se na razinu 1 (ili razinu 0 ako
  ni razina 1 nije dostupna).

## Izvori ugradnji

Sloj za ugradnje (`src/lib/memory/embedding/`) određuje koji će se izvor koristiti
na temelju vrijednosti `MemorySettingsExtended.embeddingSource`:

| Izvor          | Opis                                                                                      | Potreban ključ | Hladno pokretanje |
| -------------- | ----------------------------------------------------------------------------------------- | -------------- | ----------------- |
| `remote`       | Koristi API za ugradnje konfiguriranog pružatelja (OpenAI, Cohere itd.)                   | Da             | Nema              |
| `static`       | Lokalna ugradnja putem tablice pretraživanja `potion-base-8M` (WordPiece + usrednjavanje) | Ne             | ~200ms            |
| `transformers` | Lokalno ONNX zaključivanje putem `@huggingface/transformers` v4, `all-MiniLM-L6-v2`       | Ne             | ~3s + ~400MB RAM  |
| `auto`         | Određivanje tijekom izvođenja: remote (ako ključ postoji) → static → transformers → null  | Ovisi          | Ovisi             |

**Redoslijed određivanja za `auto`:**

1. Pronađi prvog pružatelja u `listEmbeddingProviders()` za kojeg vrijedi `hasKey === true` → `remote`.
2. Ako vrijedi `settings.staticEnabled === true` → `static`.
3. Ako vrijedi `settings.transformersEnabled === true` → `transformers`.
4. U suprotnom → `null` (prelazi na FTS5 pretraživanje po ključnim riječima).

Predmemorija ugradnji (`src/lib/memory/embedding/cache.ts`) koristi LRU mapu u memoriji
s ključem `${source}:${model}:${dim}:${sha256(text)}`, ograničenu na
`MEMORY_EMBEDDING_CACHE_MAX` zapisa (zadano 1000) s TTL-om od
`MEMORY_EMBEDDING_CACHE_TTL_MS` (zadano 5 min). Dijeli se među svim pozivateljima
tijekom životnog ciklusa procesa.

## Hibridni RRF (k=60)

Kada je `strategy = "hybrid"` i vektorska pohrana je dostupna, dohvaćanje koristi
Reciprocal Rank Fusion za spajanje FTS5 i vektorskih rezultata:

```
RRF(d) = Σ  1 / (k + rank_i(d))      gdje je k = 60 (može se konfigurirati putem MEMORY_RRF_K)
          i
```

Konkretno:

1. Pokreni FTS5 pretraživanje → rangirani popis `R_fts` (pozicija 1..N).
2. Pokreni KNN vektorsko pretraživanje → rangirani popis `R_vec` (pozicija 1..M).
3. Za svaki jedinstveni `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 ako nije na popisu).
4. Razvrstaj prema `rrf_score` silazno i primijeni prolazak prema proračunu tokena.

Poznato je da je RRF učinkovit bez potrebe za normalizacijom rezultata između
heterogenih sustava dohvaćanja. Zadana vrijednost `k=60` preuzeta je iz izvornog
rada Cormacka i suradnika te dobro funkcionira za male korpuse (<10k memorija).

## Naknadno popunjavanje (lijeno + ponovno indeksiranje)

Kada se model ugradnji promijeni (što se otkriva putem `embedding_signature`),
vektorska pohrana ponovno se izgrađuje, a sve postojeće memorije označavaju se
vrijednošću `needs_reindex = 1` u tablici `memories`.

**Lijeno naknadno popunjavanje**: Pri sljedećem dohvaćanju svaka memorija kojoj nedostaje vektorski zapis
ugrađuje se i umeće u `vec_memories` prije pokretanja pretraživanja. Time se
trošak naknadnog popunjavanja raspoređuje na stvarne zahtjeve bez blokiranja pokretanja.

**Izričito ponovno indeksiranje**: Kartica Engine u `/dashboard/memory` sadrži
gumb "Ponovno indeksiraj sada" koji poziva `POST /api/memory/reindex`. Rukovatelj poziva
`runReindexBatch()` iz `src/lib/memory/reindex.ts`, koji obrađuje do
`limit` zapisa na čekanju po zahtjevu. Napredak se može periodički provjeravati putem
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tablica `memory_vec_meta` (migracija `083_memory_vec.sql`) pohranjuje:

- `active_dim` — trenutačna dimenzija vektora (null = još nije kalibrirana).
- `embedding_signature` — `${source}:${model}:${dim}` koji se koristi za otkrivanje promjena.
- `last_reset_at` — vremenska oznaka posljednjeg potpunog poništavanja.
- `vec_loaded` — oznaka 0/1 koja pokazuje je li sqlite-vec uspješno učitan.

## Proširenje postavki

Devet polja za ugrađivanje i vektore dostupno je u `MemorySettingsExtended` u
`src/shared/schemas/memory.ts`, a pohranjuju se putem `src/lib/db/settings.ts`:

| Polje                    | Vrsta                                              | Zadano   | Opis                                                                  |
| ------------------------ | -------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Koji izvor ugrađivanja koristiti                                      |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Pružatelj/model u formatu `provider/model`                            |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Osnovni URL krajnje točke kompatibilne s OpenAI-jem, samo za memoriju |
| `customModelId`          | `string \| null`                                   | `null`   | ID modela koji se šalje prilagođenoj krajnjoj točki                   |
| `transformersEnabled`    | `boolean`                                          | `false`  | Izričito uključivanje za Transformers.js (MiniLM, ~400 MB)            |
| `staticEnabled`          | `boolean`                                          | `false`  | Izričito uključivanje lokalnog statičkog modela potion-base-8M        |
| `rerankEnabled`          | `boolean`                                          | `false`  | Omogućivanje koraka ponovnog rangiranja (dodaje +200–500 ms/zahtjev)  |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Pružatelj/model za ponovno rangiranje u formatu `provider/model`      |

`rerankProviderModel` razrješava se putem `POST /v1/rerank` (poziva se preko povratne petlje), pa prihvaća sve što prihvaća ta ruta: odabrani model u oblaku za ponovno rangiranje (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ili čvor pružatelja kompatibilnog s OpenAI-jem u obliku `<node-prefix>/<model>` (npr. `skilled-mini/bge-reranker-v2-m3` za TEI/Infinity poslužitelj). Čvorovi povratne petlje uvijek su prihvatljivi; čvor na drugom računalu (LAN, Tailscale) dodatno zahtijeva zastavicu značajke `RERANK_REMOTE_PROVIDER_NODES` i mora proći pravila za izlazne URL-ove pružatelja — pogledajte [Zastavice značajki](../reference/FEATURE_FLAGS.md). Selektor na nadzornoj ploči prikazuje odabrane pružatelje i lokalne čvorove; bilo koji valjani niz `provider/model` može se postaviti izravno putem `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Koju vektorsku pozadinu koristiti |

Dostupni su putem `GET /PUT /api/settings/memory` (shema `MemorySettingsExtendedSchema`).

Za izvor `remote`, Memory također prihvaća neobavezne postavke `customBaseUrl` i
`customModelId`. Zajedno odabiru krajnju točku `/embeddings` kompatibilnu s OpenAI-jem
i model bez promjene globalnog registra ugrađivanja. Krajnja točka normalizira se
prije uporabe i provjerava prema pravilima za izlazne URL-ove pružatelja: potreban je
HTTP(S), ugrađene vjerodajnice i nizovi upita odbijaju se, a adrese metapodataka u
oblaku ostaju blokirane. Prazne vrijednosti zadržavaju odabranog pružatelja iz registra.
Pogreške vraćene nadzornoj ploči sanitiziraju se, a vjerodajnice krajnje točke nikada
se ne zapisuju u zapisnik.

> **TODO (D20):** Opseg `global` (dijeljenje memorija među svim API ključevima) nije
> implementiran u ovom izdanju. Zahtijeva promjene sheme i globalni put dohvaćanja.
> Pratiti zasebno.

## Slojevi pohrane

### Primarni: SQLite (tablica `memories`)

Stvorena migracijom `015_create_memories.sql`:

| Stupac                      | Vrsta              | Napomene                                                                             |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID generiran putem `crypto.randomUUID()`                                           |
| `api_key_id`                | `TEXT NOT NULL`    | Vlasnički API ključ                                                                  |
| `session_id`                | `TEXT`             | Neobavezni opseg po razgovoru                                                        |
| `type`                      | `TEXT NOT NULL`    | Jedno od `factual`, `episodic`, `procedural`, `semantic`                             |
| `key`                       | `TEXT`             | Stabilni ključ za upsert, npr. `preference:i_prefer_python`                          |
| `content`                   | `TEXT NOT NULL`    | Stvarni tekst činjenice                                                              |
| `metadata`                  | `TEXT`             | JSON objekt (category, extractedAt, source, ...)                                     |
| `created_at` / `updated_at` | `TEXT`             | Nizovi u formatu ISO 8601                                                            |
| `expires_at`                | `TEXT`             | Neobavezni rok valjanosti; `NULL` znači trajno                                       |
| `memory_id`                 | `INTEGER UNIQUE`   | Dodano putem `023_fix_memory_fts_uuid.sql` radi povezivanja UUID-ova ↔ FTS5 rowidova |

Indeksi: `api_key_id`, `session_id`, `type`, `expires_at` te jedinstveni
indeks `memory_id`.

**Semantika upserta**: `createMemory()` traži postojeći redak s istim
`(api_key_id, key)` i, kada ga pronađe, ažurira ga na mjestu (spajajući `metadata`
površinskim spreadom). Time se sprječava neograničen rast tablice zbog ponovljenih
izjava o preferencijama.

### Pretraživanje cijelog teksta (virtualna tablica `memory_fts`)

`022_add_memory_fts5.sql` stvara virtualnu tablicu FTS5 nad stupcima `content` i
`key`. `023_fix_memory_fts_uuid.sql` ispravlja pogrešku iz stvarnog okruženja u kojoj
se primarni ključ UUID nije mogao povezati s cjelobrojnim rowidom sustava FTS5 —
migracija dodaje stupac `memory_id`, ponovno stvara tablicu FTS i povezuje okidače
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) koji održavaju FTS sinkroniziranim
pri operacijama INSERT, DELETE i UPDATE.

Koristi ga `retrieval.ts` za strategije `semantic` i `hybrid` (pogledajte u nastavku).
Kôd za dohvaćanje provjerava pomoću `hasTable("memory_fts")` te se vraća na
kronološki redoslijed ako tablica FTS nedostaje ili upit FTS izazove pogrešku.

### Neobavezno: Qdrant (vektorska pohrana razine 2)

`src/lib/memory/qdrant.ts` implementira neobaveznu integraciju s Qdrantom kao vektorsku
pohranu razine 2. Dohvaćanje se usmjerava u Qdrant samo kada je selektor pogona
`memoryVectorStore === "qdrant"` — zadana vrijednost `"auto"` (kao i `"sqlite-vec"`)
**nikada** ne odabire Qdrant. Prekidač na kartici Engine zajedno postavlja **i**
`qdrantEnabled` i `memoryVectorStore`: uključivanje postavlja Qdrant kao primarnu
pohranu, a isključivanje vraća postavku na `"auto"` (#5597 — prije tog ispravka
uključivanje nije imalo učinka jer ništa nije zapisivalo selektor pogona). Ako Qdrant
nije dostupan ili ne vrati ništa, dohvaćanje se vraća na sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — ugrađuje `key + content` pomoću konfiguriranog
  modela ugrađivanja, osigurava da kolekcija postoji (pri prvoj upotrebi stvara
  vektore s kosinusnom udaljenošću) i umeće ili ažurira točku sa sadržajem `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — ugrađuje upit i pretražuje
  kolekciju filtriranu prema `kind = "omniroute_memory"` te, opcionalno, prema
  `apiKeyId` / `sessionId`. Ograničava `topK` na raspon `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — briše jednu točku. Poziva je
  `deleteMemory()` nakon uklanjanja retka iz SQLitea (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — skupno briše točke kojima je
  `expiresAtUnix` u prošlosti ili kojima je `createdAtUnix` stariji od graničnog
  datuma zadržavanja. Najprije ih prebrojava kako bi nadzorna ploča mogla prikazati stvarne brojke.
- `checkQdrantHealth()` — provjera stanja putem `GET /readyz`, uključujući latenciju.

Korisničko sučelje postavki izlaže konfiguraciju Qdranta, provjeru stanja, test
semantičkog pretraživanja i čišćenje na kartici **Engine** stranice
`/dashboard/memory`. Odgovarajuće rute unutar `src/app/api/settings/qdrant/`
potpuno su povezane od verzije v3.8.6:

| Ruta                                    | Metoda        | Opis                                  |
| --------------------------------------- | ------------- | ------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Čitanje / ažuriranje postavki Qdranta |
| `/api/settings/qdrant/health`           | `GET`         | Provjera dostupnosti + latencija      |
| `/api/settings/qdrant/search`           | `POST`        | Test semantičkog pretraživanja        |
| `/api/settings/qdrant/cleanup`          | `POST`        | Uklanjanje isteklih / starih točaka   |
| `/api/settings/qdrant/embedding-models` | `GET`         | Popis dostupnih modela ugrađivanja    |

**Napomene o ponašanju (što očekivati):**

- **Odabir mehanizma** — omogućavanje Qdranta na kartici Engine postavlja ga kao
  primarno spremište (postavlja `memoryVectorStore="qdrant"`); onemogućavanje vraća
  vrijednost na `"auto"` (#5597).
- **Bez naknadnog popunjavanja** — u njega se zapisuju samo memorije stvorene/ažurirane
  **nakon** omogućavanja Qdranta (dvostruki zapis bez čekanja na rezultat). Prethodno
  postojeće SQLite memorije **ne** migriraju se; „Reindex Now” ponovno izgrađuje samo
  indeks sqlite-vec, ali ne i Qdrant.
- **Dimenzija vektora automatski se otkriva** iz stvarne ugradnje pri prvoj upotrebi —
  ne postoji polje dimenzije koje treba ispuniti. Promjena modela ugrađivanja nakon što
  kolekcija već postoji **ne** obrađuje se automatski: postojeća kolekcija ostaje
  netaknuta, a zapisi/pretraživanja s neusklađenim dimenzijama ne uspijevaju te se
  vraćaju na sqlite-vec. Ponovno stvorite kolekciju (pod novim nazivom ili je izbrišite
  u Qdrantu) kako biste promijenili model ugrađivanja.
- **Metrika udaljenosti** — uvijek **Cosine** (fiksno zadano pri stvaranju kolekcije;
  nije konfigurabilno).
- **Autentifikacija** — samo API ključ (šalje se kao zaglavlje `api-key`; nije obvezan
  za lokalni Docker bez autentifikacije). JWT/RBAC se ne upotrebljavaju.
- **Konfiguracijska polja** — korisničko sučelje izlaže `host`, `port`, `collection`,
  `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` dostupni su samo putem
  okruženja/baze podataka, a `vectorSize` se ne upotrebljava za stvaranje kolekcije
  (dimenzija se dobiva iz ugradnje).

### Kvantizacija vektora (int8 — opcionalna, obje pozadine)

Obje vektorske pozadine podržavaju **opcionalnu int8 kvantizaciju** radi smanjenja
memorijskog otiska pohranjenih vektora (otprilike 4× manje nego Float32), uz mali
gubitak odziva. Zadana je vrijednost **isključeno** za obje — vektori zadržavaju
punu preciznost osim ako se kvantizacija izričito ne omogući.

| Pozadina   | Postavka                        | Vrsta                          | Zadano   | Gdje se čita                                                |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB ključ) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** se konfigurira za svaku instancu putem ključa postavke
  `qdrantQuantization` (izloženog kao polje `quantization` na
  `PUT /api/settings/qdrant`). Kada je vrijednost `"int8"`,
  `buildQuantizationConfig()` zahtijeva skalarnu kvantizaciju (`always_ram`,
  kvantil `0.99`), a pretraživanja omogućuju `rescore: true` kako bi vektori pune
  preciznosti dodatno poboljšali skup int8 kandidata.
- Kvantizacija za **sqlite-vec** dostupna je **samo putem okruženja** (nije postavka
  baze podataka): postavite `MEMORY_VEC_QUANTIZATION=int8` kako bi se lokalni vektori
  pohranjivali kao stupac `int8[dim]` putem `vec_quantize_int8(?, 'unit')`. Odabrani
  način uključen je u `embedding_signature` (sufiks `:int8`), pa promjena načina
  pokreće potpuno ponovno indeksiranje tablice `vec_memories` — istim postupkom
  lijenog naknadnog popunjavanja koji se upotrebljava pri promjeni modela ugrađivanja.

## Vrste memorije

`MemoryType` (`src/lib/memory/types.ts`):

| Vrsta        | Upotreba                                                                           |
| ------------ | ---------------------------------------------------------------------------------- |
| `factual`    | Preferencije, stabilne činjenice o korisniku, obrasci ponašanja                    |
| `episodic`   | Odluke vezane uz određeni trenutak ("Odabrao sam Postgres")                        |
| `procedural` | Memorija tijeka rada / uputa (rezervirano; trenutačno nema automatskog izdvajanja) |
| `semantic`   | Rezervirano za unose u vektorskom spremištu                                        |

Strategija dohvaćanja za `MemoryConfig` može biti `exact`, `semantic` ili `hybrid`,
a opseg može biti `session`, `apiKey` ili `global`. Zadani opseg iz
`getMemorySettings()` jest `apiKey`.

## Izdvajanje činjenica (`extraction.ts`)

Izdvajanje se temelji na **regularnim izrazima**, a ne na LLM-u — izvodi se unutar procesa s
`setImmediate()` kako nikada ne bi blokiralo tok odgovora:

- **Obrasci preferencija** → `MemoryType.FACTUAL`
  (npr. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Obrasci odluka** → `MemoryType.EPISODIC`
  (npr. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Obrasci ponašanja** → `MemoryType.FACTUAL`
  (npr. `I usually …`, `I always …`, `I tend to …`)

Svako se podudaranje pročišćava (`trim`, sažimanje razmaka, ograničenje na 500 znakova),
deduplicira unutar skupa putem stabilnog `factKey(category, content)` i
pohranjuje putem `createMemory()` s metapodacima
`{category, extractedAt, source: "llm_response"}`. Ulazni tekst ograničen je na
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — kada je dulji, upotrebljava se **kraj** teksta
kako bi najnoviji sadržaj asistenta uvijek bio uključen.

`extractFactsFromText(text)` izvozi se za testove i vraća strukturirane
činjenice bez njihova pohranjivanja.

## Dohvaćanje (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` glavna je ulazna točka. Ona:

1. Normalizira i provjerava valjanost konfiguracije putem `MemoryConfigSchema`.
2. Odmah vraća `[]` kada je `enabled` postavljen na false ili je `maxTokens <= 0`.
3. Ograničava `maxTokens` na raspon `[1, 8000]`.
4. Otkriva postoji li moderna tablica `memories` (umjesto naslijeđene tablice `memory`)
   kako bi starije baze podataka nastavile raditi.
5. Izrađuje osnovni upit sa zaštitom od isteka
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), neobaveznim
   opsegom sesije i neobaveznom graničnom vrijednošću `retentionDays`.
6. Grana se ovisno o strategiji:
   - **`exact`** (zadano): kronološki `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ako postoji `config.query` i `memory_fts`, izvršava JOIN s
     `memory_fts MATCH ?` i sortira prema FTS rangu; vraća se na kronološki redoslijed
     kada FTS vrati 0 redaka.
   - **`hybrid`**: unija FTS rezultata (veća relevantnost) i
     kronološkog skupa, deduplicirana prema id-u.
7. Izračunava ocjenu relevantnosti ključnih riječi (`getRelevanceScore`) nad
   `content`, `key` i JSON-om `metadata` kada je upit naveden. Retci s
   ocjenom nula filtriraju se.
8. Sortira silazno prema ocjeni, a zatim silazno prema `createdAt`.
9. Prolazi rangiranim popisom i prihvaća unose dok ukupan
   `estimateTokens(content)` (≈ `length / 4`) ostaje unutar proračuna. Uvijek
   vraća barem jedan unos kada postoji bilo koje podudaranje.

`estimateTokens` izvozi se i upotrebljava za dohvaćanje, sažimanje i MCP alat
`omniroute_memory_search`.

## Umetanje (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Spaja sadržaj svih memorija u jedan niz `Memory context: …`.
2. Odabire strategiju prema nazivu pružatelja:
   - **Sistemska poruka** (zadano za OpenAI, Anthropic, Gemini, …) — umeće
     `{role: "system", content: memoryText}` prije svih postojećih sistemskih
     poruka kako bi korisnički sistemski upiti i dalje imali prednost.
   - **Korisnička poruka** (rezervna opcija) — za pružatelje u
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Oni odbijaju sistemsku ulogu
     i inače bi vratili pogrešku 400 (usp. problem #1701 za GLM/Zhipu).
3. Bilježi broj, strategiju i model pod `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` izvozi se za pozivatelje koji trebaju
donositi vlastite odluke o usmjeravanju. Nepoznati pružatelji zadano vraćaju
`true` (sistemska uloga je dopuštena) radi sigurnosti.

## Postavke (`settings.ts`)

Konfiguracija memorije **pohranjuje se u tablici postavki baze podataka**, a ne u varijablama okruženja.
`getMemorySettings()` čita iz `getSettings()` i predmemorira rezultat
unutar procesa; ruta PUT za postavke nakon zapisivanja poziva
`invalidateMemorySettingsCache()`.

### Naslijeđena polja (sve verzije)

| Ključ baze podataka   | Vrsta   | Zadano                                               | Kontrola u korisničkom sučelju                         |
| --------------------- | ------- | ---------------------------------------------------- | ------------------------------------------------------ |
| `memoryEnabled`       | boolean | `false` (zadano isključeno od v3.8.30)               | Uključivanje/isključivanje memorije                    |
| `memoryMaxTokens`     | integer | `2000` (raspon `0–16000`)                            | Proračun tokena za umetanje                            |
| `memoryRetentionDays` | integer | `30` (raspon `1–365`)                                | Razdoblje zadržavanja                                  |
| `memoryStrategy`      | enum    | `"hybrid"` (jedno od `recent`, `semantic`, `hybrid`) | Strategija dohvaćanja                                  |
| `skillsEnabled`       | boolean | `false`                                              | Uključuje umetanje vještina po ključu (vidi SKILLS.md) |

Napomena: strategija korisničkog sučelja `"recent"` preslikava se u internu
strategiju dohvaćanja `"exact"` putem `toMemoryRetrievalConfig()` (kronološki redoslijed).

### Nova polja (v3.8.6, plan 21 D9)

Za opise polja pogledajte i prethodni odjeljak „Proširenje postavki”.

| Ključ baze podataka         | Polje API-ja             | Zadano   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Ključeve baze podataka povezane s Qdrantom (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` sa zadanom vrijednošću `"omniroute_memory"`,
`qdrantEmbeddingModel` sa zadanom vrijednošću `"openai/text-embedding-3-small"`) čita
`normalizeQdrantConfig()` u `qdrant.ts`.

### Varijable okruženja (v3.8.6)

Šest neobaveznih varijabli okruženja prilagođava ponašanje mehanizma tijekom izvođenja (dokumentirano u `.env.example`):

| Varijabla                       | Zadano                     | Opis                                                                                                                                                                         |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL predmemorije ugrađivanja (5 min)                                                                                                                                         |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Najveći broj unosa u LRU predmemoriji ugrađivanja                                                                                                                            |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF repozitorij za model Transformers.js                                                                                                                                      |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repozitorij za statički model potion                                                                                                                                      |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Mjesto pohrane preuzetih modela                                                                                                                                              |
| `MEMORY_VEC_TOP_K`              | `20`                       | Zadana vrijednost top-K za vektorsko pretraživanje                                                                                                                           |
| `MEMORY_RRF_K`                  | `60`                       | Konstanta k algoritma RRF za hibridno pretraživanje                                                                                                                          |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Postavite na `int8` kako bi se lokalni vektori sqlite-vec pohranjivali kvantizirano (oko 4× manje; mora se uključiti). Promjena načina rada prisiljava ponovno indeksiranje. |

## Sažimanje (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` sažima stariji
sadržaj kada ukupni broj tokena u memorijama ključa premaši
ograničenje. Iterira retke silazno prema `created_at`, zadržava retke koji stanu u ograničenje, a
u ostalima zamjenjuje `content` prvim trima rečenicama izvornog
sadržaja. `tokensSaved` je razlika u `estimateTokens` između starog i
novog sadržaja.

Ova je rutina **dostupna, ali se trenutačno ne poziva automatski** u postojećem
tijeku razgovora — pozovite je iz cron zadatka, administratorske radnje ili
poveznog koda za `MemoryConfig.autoSummarize` ako vam je potrebno kontinuirano sažimanje. Gubitak
podataka je jednosmjeran: izvorni tekst biva prebrisan.

## REST API

Sve krajnje točke zahtijevaju autentikaciju za upravljanje (`requireManagementAuth`).

### Osnovne krajnje točke memorije (postojeće + ažurirane)

| Metoda   | Putanja              | Opis                                                                                                                                                                                        |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Paginirani popis s filtrima: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odgovor uključuje `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`            |
| `POST`   | `/api/memory`        | Stvara zapis (validiran Zodom: `content`, `key`, neobavezni `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Poziva `createMemory()`, koji obavlja upsert prema `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Dohvaća pojedinačni zapis prema UUID-u                                                                                                                                                      |
| `PUT`    | `/api/memory/[id]`   | Ažurira polja zapisa (`type`, `key`, `content`, `metadata`). Tijelo: `MemoryUpdatePutSchema`. Također sinkronizira vektor ako je dostupan izvor ugradnje.                                   |
| `DELETE` | `/api/memory/[id]`   | Briše zapis; također ga briše iz `vec_memories` (D15) i, prema načelu najboljeg pokušaja, iz Qdranta. Vraća 404 ako zapis ne postoji.                                                       |
| `GET`    | `/api/memory/health` | Pokreće `verifyExtractionPipeline("health-check")` — cjeloviti ciklus stvaranje→popis→brisanje. Vraća `{working, latencyMs, error?}`                                                        |

### Nove krajnje točke memorijskog pogona (plan 21)

| Metoda | Putanja                           | Opis                                                                                                                                                                                              |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Probno izvođenje funkcije `retrieveMemories` — vraća rangirane rezultate s rezultatom, razinom i tokenima. Tijelo: `RetrievePreviewSchema`. NE umeće niti mijenja memorije.                       |
| `GET`  | `/api/memory/embedding-providers` | Navodi pružatelje s modelima ugradnje, uz naznaku za koje je konfiguriran API ključ.                                                                                                              |
| `GET`  | `/api/memory/engine-status`       | Vraća potpuno stanje pogona: razinu ključnih riječi, razrješavanje ugradnje, statistiku vektorske pohrane, stanje Qdranta i konfiguraciju ponovnog rangiranja. Oblik: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ručno pokreće sažimanje memorije. Tijelo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Vraća `{candidates, tokensSaved}`.                                                    |
| `POST` | `/api/memory/reindex`             | Pokreće ponovno indeksiranje vektora za memorije s `needs_reindex=1`. Tijelo: `MemoryReindexSchema` (`force`). Vraća `{started, pending}`.                                                        |

### Krajnje točke postavki

| Metoda | Putanja                                 | Opis                                                                                                 |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Trenutačni normalizirani `MemorySettingsExtended` (7 novih polja + naslijeđena polja)                |
| `PUT`  | `/api/settings/memory`                  | Ažurira bilo koje polje iz `MemorySettingsExtendedSchema` (ukupno 12 polja)                          |
| `GET`  | `/api/settings/qdrant`                  | Trenutačne postavke Qdranta (`QdrantSettingsSchema`)                                                 |
| `PUT`  | `/api/settings/qdrant`                  | Ažurira postavke Qdranta. Tijelo: `QdrantSettingsUpdateSchema`. `apiKey` = prazan niz uklanja ključ. |
| `GET`  | `/api/settings/qdrant/health`           | Provjera dostupnosti konfigurirane instance Qdranta. Vraća `QdrantHealthResultSchema`.               |
| `POST` | `/api/settings/qdrant/search`           | Test semantičkog pretraživanja u Qdrantu. Tijelo: `QdrantSearchSchema` (`query`, `topK`).            |
| `POST` | `/api/settings/qdrant/cleanup`          | Uklanja točke iz Qdranta za istekle / stare memorije.                                                |
| `GET`  | `/api/settings/qdrant/embedding-models` | Navodi modele ugradnje dostupne za Qdrant.                                                           |

Upit popisa `/api/memory` podržava paginaciju temeljenu na parametru `page`
(`parsePaginationParams`) **ili** izravni `offset` — kada je `offset` prisutan,
ima prednost, a izvedeni `page` izračunava se za oblik odgovora.

## MCP alati (`open-sse/mcp-server/tools/memoryTools.ts`)

Kada je MCP poslužitelj omogućen, registriraju se tri alata za memoriju:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → obavija `retrieveMemories()`. Od verzije v3.8.6 (D16), `strategy` se čita
  iz `getMemorySettings()` umjesto da bude fiksno postavljen na `"exact"`. Ako
  je naveden `query`, a `strategy` je `semantic` ili `hybrid`, koristi se
  vektorska pohrana kada je dostupna.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → obavija `createMemory()`. Prihvaća samo 4 kanonska tipa:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ispisuje podudarne
  unose, po želji ih filtrira prema vremenskoj oznaci stvaranja prije zadanog vremena, a zatim briše svaki
  putem `deleteMemory()` (koji također uklanja vektore iz sqlite-vec + Qdrant).

Pojedinosti o prijenosu i opsegu pogledajte u [MCP-SERVER.md](./MCP-SERVER.md).

## Nadzorna ploča (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` sada je **Studio s 3 kartice**:

### Kartica: Memorije

- Kartica koncepta (objašnjenje „Kako radi” koje se može sažeti).
- Popis u stvarnom vremenu, pretraživanje i numeriranje stranica (odgoda od 300 ms).
- Filtar tipa (`factual` / `episodic` / `procedural` / `semantic` / svi).
- Modalni prozor za dodavanje memorije (ključ, sadržaj, tip).
- Uređivanje unutar retka (gumb olovke → `PUT /api/memory/[id]`).
- Brisanje po retku (s dijaloškim okvirom za potvrdu).
- JSON izvoz trenutačne stranice; JSON uvoz putem birača datoteka.
- Kartice statistike: `totalEntries`, `tokensUsed`, `hitRate`.
- Gumb „Sažmi stare” → `POST /api/memory/summarize` (probno izvođenje najprije prikazuje
  broj kandidata, a zatim traži potvrdu).
- Zelena/crvena točka stanja koju određuje `GET /api/memory/health`.

### Kartica: Igralište

- Unos upita + birač strategije (Točno / Semantički / Hibridno) + proračun tokena.
- „Simuliraj” → `POST /api/memory/retrieve-preview` — prikazuje rangirane rezultate s
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Ploča razrješenja koja prikazuje koji je izvor ugradnje / vektorska pohrana korištena i
  je li došlo do povratka na pričuvnu opciju.

### Kartica: Mehanizam

- Ploča stanja mehanizma (oznaka ključne riječi FTS5, oznaka ugradnje, oznaka vektorske pohrane,
  oznaka stanja Qdranta, oznaka ponovnog rangiranja).
- Gumb „Ponovno indeksiraj sada” → `POST /api/memory/reindex`.
- Birač izvora ugradnje (automatski / udaljeni / statički / transformeri + prekidači).
- Kartica konfiguracije Qdranta (prekidač za omogućavanje, domaćin/priključak/kolekcija/ključ, testiranje veze,
  test semantičkog pretraživanja, čišćenje).
- Kartica konfiguracije ponovnog rangiranja (prekidač za omogućavanje, birač pružatelja/modela).

Postavke memorije i Qdranta također se nalaze pod
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) kao
naslijeđeno/globalno sučelje postavki.

## Predmemoriranje

`src/lib/memory/store.ts` održava LRU-sličnu predmemoriju unutar procesa
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, uz izbacivanje 20 %
najstarijih unosa) za čitanja `getMemory(id)`, kao i generički sloj predmemorije
ključ/vrijednost `memoryCache` (`src/lib/memory/cache.ts`) s metodama `get`/`set`/`invalidate`
koje koriste pozivatelji kojima je potrebna vlastita predmemorija ograničenog opsega (LRU s 1 000 unosa,
zadani TTL 5 min).

## Privatnost i životni ciklus

- Vlasništvo nad memorijom određuje identifikator API ključa (`resolveMemoryOwnerId` u
  `chatCore.ts`). Bez `apiKeyInfo.id` ne izvršavaju se ni dohvaćanje, ni umetanje,
  ni izdvajanje.
- Zapisi s budućom vrijednošću `expires_at` filtriraju se iz dohvaćanja; stari
  zapisi izvan razdoblja `retentionDays` isključuju se uvjetom
  `created_at >= cutoff` u `retrieveMemories`.
- Za trajno brisanje upotrijebite `DELETE /api/memory/[id]` ili `omniroute_memory_clear`.
- Izdvajanje se izvršava bez čekanja na rezultat putem `setImmediate`; pogreške se bilježe pod
  `memory.extraction.background.failed` i nikada se ne prikazuju pozivatelju.
- Provjere cijelog ciklusa (`verifyExtractionPipeline`) čiste vlastite
  testne zapise u bloku `finally`.

## Pogledajte također

- [SKILLS.md](./SKILLS.md) — postavka `skillsEnabled` umeće definicije alata
  zajedno s memorijom.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP prijenos / opsezi.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — šira površina API-ja.
- Izvorni moduli:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibridni RRF
  - `src/lib/memory/embedding/index.ts` — višestruki sloj za ugradnje
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod sheme za sva tijela memorijskog API-ja
  - `src/shared/schemas/qdrant.ts` — Zod sheme za postavke/operacije Qdranta
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
  - `src/app/api/settings/qdrant/route.ts` + podrute
  - `src/app/(dashboard)/dashboard/memory/` — korisničko sučelje Studija (stranica + komponente +
    kartice + kuke)
  - `open-sse/handlers/chatCore.ts` (povezivanje umetanja / izdvajanja)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Odabir pružatelja ugradnji (v3.8.16+)

OmniRouteov memorijski pogon podržava **četiri izvora ugradnji** (`src/lib/memory/embedding/`). Svaki ima različite kompromise u pogledu **latencije, troška, kvalitete modela i složenosti postavljanja**.

### Izvori ugradnji

| Pružatelj        | Izvor                                             | Latencija                                 | Trošak               | Kvaliteta                                       | Postavljanje                                        |
| ---------------- | ------------------------------------------------- | ----------------------------------------- | -------------------- | ----------------------------------------------- | --------------------------------------------------- |
| `transformers`   | Lokalni ONNX model (Xenova/all-MiniLM-L6-v2)      | ~50-150ms (CPU)                           | Besplatno            | Dobra                                           | Samo `npm install`                                  |
| `static`         | Unaprijed izračunati vektori (predmemorirani)     | <1ms                                      | Besplatno            | Nije primjenjivo (ovisi o pogotku predmemorije) | Nije potrebno                                       |
| `remote`         | OpenAI / Cohere / Voyage API                      | ~100-300ms                                | $0.02-0.10/1M tokena | Izvrsna                                         | API ključ                                           |
| `auto`           | Odabire najbolji dostupni izvor tijekom izvođenja | Isto kao odabrani izvor                   | Besplatno            | Isto kao odabrani izvor                         | Nije potrebno                                       |
| _(predmemorija)_ | LRU sloj u memoriji iznad bilo kojeg izvora       | <1ms (pogodak), puna latencija (promašaj) | Besplatno            | Isto kao temeljni izvor                         | Uvijek uključeno (nije izvor koji se može odabrati) |

### Stablo odluke

```
                  Kakav je kontekst vašeg uvođenja?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  RAZVOJ/TEST  MALA PRODUKCIJA VELIKA PRODUKCIJA RUBNO / IZVANMREŽNO
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (besplatno, bez API-ja)    (najbolja kvaliteta) (bez interneta)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            UVIJEK dodajte sloj `cache` iznad
            (LruCache obavija bilo kojeg pružatelja)
```

### Konfiguracija baze podataka i API-ja

Opcije memorijskih ugradnji konfiguriraju se putem API-ja/korisničkog sučelja postavki, a ne putem varijabli okruženja. Relevantni ključevi postavki baze podataka pod Postavkama (`normalizeMemorySettings` u `src/lib/memory/settings.ts`) jesu:

- `memoryEmbeddingSource`: `"transformers"` (lokalno), `"remote"` (putem API-ja, npr. OpenAI), `"static"` (vanjska pohrana) ili `"auto"`
- `memoryEmbeddingProviderModel`: Identifikator modela za udaljene/statičke izvore (npr. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` ili `"auto"`

#### Lokalni model (`transformers`)

Interno upotrebljava transformers.js za pokretanje lokalnih modela:

```bash
# Varijable okruženja koje se čitaju u kodu (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repozitorij HF modela
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statički HF potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Direktorij predmemorije
```

#### LRU predmemorija ugradnji

Predmemorija je prema zadanim postavkama uvijek uključena i konfigurira se putem varijabli okruženja:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Najveći broj predmemoriranih stavki
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Brojke performansi

Referentno mjerenje na tipičnom 4-jezgrenom x86 poslužitelju (tekstovi od ~100 tokena):

| Pružatelj            | p50   | p95   | p99   | Trošak / 1 mil. vektorskih reprezentacija |
| -------------------- | ----- | ----- | ----- | ----------------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Besplatno                                 |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large)        |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Ovisi o hostingu za Qdrant                |
| `cache` (pogodak)    | <1ms  | <1ms  | 2ms   | Besplatno                                 |

---

## Obrasci izdvajanja činjenica (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) koristi **podudaranje obrazaca regularnih izraza** za izdvajanje strukturiranih činjenica iz poruka razgovora. Razumijevanje ovih obrazaca pomaže vam prilagoditi kvalitetu izdvajanja svojem slučaju uporabe.

### Zadane kategorije obrazaca

| Kategorija          | Primjer obrasca                                               | Izdvaja                        |
| ------------------- | ------------------------------------------------------------- | ------------------------------ |
| PREFERENCE_PATTERNS | `"Preferiram <X>"`, `"Sviđa mi se <X>"`, `"Mrzim <X>"`        | Korisničke preferencije        |
| DECISION_PATTERNS   | `"Koristit ću <X>"`, `"Odlučio sam <X>"`, `"Odabrao sam <X>"` | Korisničke odluke (epizodičke) |
| PATTERN_PATTERNS    | `"Obično <X>"`, `"Uvijek <X>"`, `"Nikad <X>"`                 | Trajni obrasci ponašanja       |

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

### Što se izdvaja

Kada korisnik kaže:

> "Preferiram TypeScript. Koristit ću Postgres za ovaj projekt. Uvijek izvršim commit prije slanja. Ne sviđa mi se Python."
> Izdvajanje stvara 4 memorije:
>
> | Ključ                                | Kategorija   | Vrsta      | Sadržaj                    |
> | ------------------------------------ | ------------ | ---------- | -------------------------- |
> | `preference:typescript`              | preferencija | činjenična | "TypeScript"               |
> | `decision:postgres_for_this_project` | odluka       | epizodička | "Postgres za ovaj projekt" |
> | `pattern:commit_before_pushing`      | obrazac      | činjenična | "commit prije slanja"      |
> | `preference:python`                  | preferencija | činjenična | "Python"                   |

### Ograničenja izdvajanja

Kako bi se spriječilo nekontrolirano izdvajanje, primjenjuju se sljedeća ograničenja:

| Minimalna duljina sadržaja | 3 znaka |
| Maksimalna duljina sadržaja | 500 znakova |

### Kada onemogućiti izdvajanje

Izdvajanje se automatski pokreće kad god je memorija omogućena; ne postoji zaseban
prekidač samo za izdvajanje. Da biste ga isključili, u potpunosti onemogućite memoriju (`enabled: false`
putem `PUT /api/settings/memory`). Razmotrite to u sljedećim slučajevima:

- Imate velik broj poruka, a trošak izdvajanja nije zanemariv
- Vaši su razgovori uglavnom privremeni (razgovor, otklanjanje pogrešaka) i nemaju dugoročnu vrijednost
- Već bilježite kontekst putem prilagođenih dodataka

---

## Podešavanje hibridnog RRF-a (v3.8.16+)

Algoritam **Reciprocal Rank Fusion (RRF)** kombinira rezultate FTS5-a (ključne riječi) i vektorskog pretraživanja (semantika). Parametar `k` određuje kolika se težina daje niže rangiranim rezultatima.

### Formula

Za svaku kandidatsku memoriju RRF rezultat iznosi:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Gdje je:

- `k` konstanta (zadano 60)
- `rank_i(d)` rang dokumenta `d` u i-tom sustavu dohvaćanja (FTS, vektorsko pretraživanje)
- Zbroj se računa preko svih sustava dohvaćanja

### Kako `k` utječe na rezultate

| Vrijednost `k`      | Učinak                                                                                           | Najprikladnije za                     |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `k=0`               | Čista fuzija rangova (bez zaglađivanja)                                                          | Teorijska početna vrijednost          |
| `k=10-30`           | Snažno ponderira najbolje rezultate, dok niski rang jedva doprinosi                              | Kada su prva 3 rezultata obično točna |
| **`k=60`** (zadano) | Uravnoteženo — svih prvih 10 rezultata značajno doprinosi                                        | Dohvaćanje opće namjene               |
| `k=100+`            | Ravnomjernije — čak i nisko rangirani rezultati mogu prevladati ako se pojavljuju u više sustava | Kada je odziv važniji od preciznosti  |

### Podešavanje `k` u praksi

```bash
# Zadano
MEMORY_RRF_K=60

# Agresivna preciznost (mala memorija, malo dokumenata)
MEMORY_RRF_K=20

# Maksimalni odziv (velika memorija, raznoliki upiti)
MEMORY_RRF_K=120
```

**Primjer s `k=20`:**

- FTS rang 1 → doprinos `1/21 = 0.048`
- FTS rang 10 → doprinos `1/30 = 0.033`
- Vektorski rang 1 → doprinos `0.048`
- Maksimalni kombinirani rezultat: `0.096`

**Primjer s `k=60`:**

- FTS rang 1 → doprinos `1/61 = 0.016`
- FTS rang 10 → doprinos `1/70 = 0.014`
- Vektorski rang 1 → doprinos `0.016`
- Maksimalni kombinirani rezultat: `0.033`

Uz viši `k`, **relativna razlika** između prvog i desetog mjesta manja je, pa se algoritam više oslanja na **konsenzus među sustavima dohvaćanja** nego na pouzdanost najvišeg ranga.

### Kada promijeniti `k`

| Simptom                                             | Pokušajte                                                               |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| Najbolji rezultat uvijek pobjeđuje, ali je pogrešan | **Snizite** k (npr. 20) — pouzdanost najvišeg ranga važnija je          |
| Točan odgovor nalazi se među prvih 5, ali nije prvi | **Povisite** k (npr. 100) — ravnomjernije bodovanje nagrađuje konsenzus |
| Odziv je visok, ali je preciznost niska             | **Snizite** k — izoštrite rangiranje                                    |
| Odziv je nizak (nedostaju relevantni dokumenti)     | **Povisite** k — pružite priliku niže rangiranim dokumentima            |

### RRF ponderiranje

Fuzija recipročnih rangova koristi jednake težine za semantički vektorski rang i rang pretraživanja punog teksta:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Ne postoje varijable okruženja za prilagodbu pojedinačnih težina (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ne postoje).

---

## Strategija sažimanja (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) sažima starije memorije kako bi aktivni skup ostao malen, uz očuvanje mogućnosti prisjećanja.

### Kada se pokreće sažimanje

| Okidač                        | Prag (zadano)    |
| ----------------------------- | ---------------- |
| Ručno pokretanje putem API-ja | nije primjenjivo |

### Što se sažima

Iz `summarization.ts` izvoze se dvije ulazne točke:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — sažima
  memorije za sesiju u jedan tekst sažetka ograničen proračunom tokena.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — sažimanje na temelju
  starosti koje koristi API: odabire svaku memoriju stariju od `days`, od njih
  stvara jednu sažetu memoriju i (kada je `dryRun` postavljen na `false`) briše
  izvornike. Proslijedite `dryRun: true` kako biste pregledali skup kandidata i ukupan
  broj tokena bez ikakvih izmjena.

Nema prolaza za grupiranje prema oznakama/ključevima ni ocjenjivanja pojedinačnih memorija kao „ključnih” ili „sažimljivih” —
odabir se temelji isključivo na graničnoj starosti, a tekst sažetka sastoji se od sažetog
retka s prefiksom vrste za svakog kandidata.

### Pokretanje sažimanja

Sažimanje je **ručno / opcionalno** — postavka `autoSummarize` zadano je postavljena na
`false`, stoga se ništa ne sažima automatski. Pokrenite ga putem API-ja:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Kako bi ostalo isključeno, jednostavno zadržite zadanu vrijednost postavke `autoSummarize` (`false`).

### Savjeti za kvalitetu sažimanja

- **Najprije pregledajte pomoću `dryRun`** — `summarizeMemoriesOlderThan(..., true)` vraća
  popis kandidata i ukupan broj tokena kako biste prije brisanja izvornika mogli potvrditi
  što će biti spojeno.
- **Pokrećite sažimanje tijekom razdoblja slabog prometa** ako imate velik korpus memorija — LLM poziv najsporiji je dio

```bash
# U stilu crona: sažimaj svakog dana u 3 sata ujutro
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Obrazac pružatelja MemoryBackend

> **Mjerodavni izvor:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testovi:** `src/lib/memory/__tests__/generic-backend.test.ts`

Obrazac pružatelja MemoryBackend uvodi **izmjenjivi sloj apstrakcije pozadinskog sustava** iznad postojećeg mehanizma memorije. Umjesto vezanosti uz jednu implementaciju pohrane, memorijski sustav sada podržava više pozadinskih sustava (SQLite, Obsidian, Notion, prilagođene HTTP pozadinske sustave) s podesivim usmjeravanjem na primarni i pričuvne sustave.

### Arhitektura

```
┌──────────────────────────────────────────────────────────┐
│                    API rute                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orkestrator singletona (manager.ts)                 │
│                                                          │
│  Primarni ──► Pozadinski sustav A  (npr. SQLite)         │
│  Pričuvni ──► Pozadinski sustav B  (npr. Obsidian)       │
│               Pozadinski sustav C  (npr. Notion putem    │
│               GenericBackend)                            │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ pozadinski │ │ pozadinski │ │ pozadinski       │
│ sustav     │ │ sustav     │ │ sustav (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Osnovno sučelje (`backend.ts`)

Svaki pozadinski sustav mora implementirati sučelje `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD operacije
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Pretraživanje
  search(config: SearchConfig): Promise<Memory[]>;

  // Stanje sustava
  health(): Promise<HealthCheckResult>;

  // Životni ciklus (neobavezno)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orkestrator singletona koji:

- **Registrira** pozadinske sustave putem `register(backend)` — poziva se pri pokretanju iz `index.ts`
- **Konfigurira** primarni i pričuvne sustave putem `configure(primary, fallbacks)`
- **Usmjerava** CRUD operacije/pretraživanje prema primarnom sustavu, uz lanac pričuvnih sustava u slučaju neuspjeha
- **Provjerava stanje** svih pozadinskih sustava u pravilnim intervalima

**Ponašanje pričuvnih sustava:**

| Operacija | Primarni sustav                 | Pričuvni sustavi                        |
| --------- | ------------------------------- | --------------------------------------- |
| `create`  | ✅ Samo primarni                | ❌                                      |
| `get`     | ✅ Najprije pokušaj s primarnim | ✅ Pričuvni ako je rezultat null        |
| `update`  | ✅ Samo primarni                | ✅ Asinkrona sinkronizacija bez čekanja |
| `delete`  | ✅ Samo primarni                | ✅ Asinkrona sinkronizacija bez čekanja |
| `list`    | ✅ Samo primarni                | ❌                                      |
| `search`  | ✅ Najprije primarni            | ✅ Pričuvni u slučaju pogreške          |

#### GenericMemoryBackend (`genericBackend.ts`)

Generički HTTP poveznik koji prilagođava bilo koji REST API u MemoryBackend. Koristan je za:

- **Notion** — povezivanje putem Notion API-ja
- **Obsidian** — povezivanje putem Obsidian Local REST API-ja
- **Prilagođene pozadinske sustave** — bilo koju uslugu koja izlaže RESTful API za memoriju

**Konfiguracija:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Osnovni URL pozadinskog API-ja
  apiKey?: string;           // Bearer token za autentifikaciju
  headers?: Record<string, string>;  // Prilagođena HTTP zaglavlja
  timeout?: number;          // Istek vremena zahtjeva (zadano: 30000ms)
  backendType?: string;      // Za zapisivanje u dnevnik

  // Nadjačavanja krajnjih točaka (zadane vrijednosti koriste REST konvencije)
  endpoints?: {
    search?: string;   // zadano: "/memories/search"
    create?: string;   // zadano: "/memories"
    list?: string;     // zadano: "/memories"
    get?: string;      // zadano: "/memories/{id}"
    update?: string;   // zadano: "/memories/{id}"
    delete?: string;   // zadano: "/memories/{id}"
    health?: string;   // zadano: "/health"
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

**Poznate pozadinske implementacije** unaprijed su konfigurirane u `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend usmjeren na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend usmjeren na api.notion.com/v1
```

#### Ugrađene pozadinske implementacije

##### SQLiteBackend (`sqliteBackend.ts`)

Zadana primarna pozadinska implementacija. Obavija postojeću pohranu memorije temeljenu na SQLiteu koristeći `src/lib/memory/store.ts`. Automatski se registrira pri pokretanju.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Obavija postojeću integraciju s Obsidianom (`src/lib/memory/obsidianBackend.ts`). Povezuje se s Obsidian trezorom putem Obsidian Local REST API-ja.

### Postavke

Postavke pozadinskih implementacija memorije pohranjuju se u tablici postavki aplikacije i njima se upravlja putem `src/lib/memory/settings.ts`:

| Postavka                                 | Ključ okruženja/konfiguracije | Zadano     | Opis                                                     |
| ---------------------------------------- | ----------------------------- | ---------- | -------------------------------------------------------- |
| Primarna pozadinska implementacija       | `memoryPrimaryBackend`        | `"sqlite"` | ID primarne pozadinske implementacije                    |
| Rezervne pozadinske implementacije       | `memoryFallbackBackends`      | `[]`       | Poredani ID-jevi rezervnih pozadinskih implementacija    |
| Konfiguracije pozadinskih implementacija | `memoryBackendConfigs`        | `{}`       | Nadjačavanja konfiguracije po pozadinskoj implementaciji |

Postavke se normaliziraju putem `normalizeMemorySettings()` i predmemoriraju u `getMemorySettings()`.

### Tijek inicijalizacije

```
Pokretanje aplikacije
  → uvozi iz index.ts (popratni učinak): registrira SQLiteBackend
  → initMemoryBackends() poziva se iz životnog ciklusa aplikacije:
      1. Učitavanje postavki (getMemorySettings)
      2. Konfiguriranje primarne i rezervnih implementacija
      3. Inicijalizacija svih pozadinskih implementacija (provjera stanja)
      4. Spremno za zahtjeve
```

### Dodavanje nove pozadinske implementacije

1. **Implementirajte sučelje `MemoryBackend`** u `src/lib/memory/<name>Backend.ts`
2. **Izvezite** iz `src/lib/memory/index.ts`
3. **Registrirajte** s `memoryManager.register(yourBackend)` pri pokretanju
4. **Konfigurirajte** putem postavki: postavite `memoryPrimaryBackend` na ID svoje pozadinske implementacije
5. **Testirajte** koristeći `src/lib/memory/__tests__/generic-backend.test.ts` kao referencu

#### Primjer: pozadinska implementacija Brain

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

### Provjera

#### Jedinični testovi

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Očekivani rezultat: **35 testova, svi prolaze**, koji pokrivaju:

- Konstruktor (2)
- Provjera stanja (4) — uspjeh, neuspjeh 500, mrežna pogreška, latencija
- Inicijalizacija (2) — uspjeh, neuspjeh
- Stvaranje (2) — zadana krajnja točka, prilagođena krajnja točka
- Dohvaćanje (4) — uspjeh, 404 → null, izbacivanje pogreške za status različit od 404, prilagođeni parametri putanje
- Ažuriranje (2) — uspjeh, 404 → false
- Brisanje (2) — uspjeh, 404 → false
- Popis (2) — parametri upita, prilagođeni nazivi parametara
- Pretraživanje (3) — parametri upita, prilagođena krajnja točka, serijalizacija opcija
- Zaglavlja autentifikacije (2) — Bearer token, prilagođena zaglavlja
- Tvornica (1)

#### Provjera tipova

```bash
npm run typecheck:core
```

Očekivano: **0 pogrešaka**.
