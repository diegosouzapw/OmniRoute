# Memory System (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Vir resnice:** `src/lib/memory/` in `src/app/api/memory/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40 (privzeto izklopljeno + naknadna kvantizacija int8)

OmniRoute zagotavlja trajni pomnilnik pogovorov, vezan na ključ API (in
izbirno na ID seje). Spomini se samodejno pridobivajo iz odgovorov LLM
z lahkim ujemanjem vzorcev regularnih izrazov in se znova vstavijo v nadaljnje
zahteve kot začetno sistemsko sporočilo (ali kot prvo uporabniško sporočilo pri
ponudnikih, ki zavračajo sistemsko vlogo).

> **Pomnilnik je privzeto IZKLOPLJEN (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> je zdaj `false` (`src/lib/memory/settings.ts`). Omogočanje pomnilnika v
> **vsako** zahtevo za klepet vstavi do `maxTokens` (~2k) pridobljenega konteksta,
> ki se obračuna — to je lahko nepričakovan strošek pri novih namestitvah in za
> odjemalce, ki sami upravljajo svoj kontekst. Izrecno ga omogočite pod
> **Nastavitve → Pomnilnik** (`MemorySkillsTab` prikaže opozorilo o strošku
> žetonov, ko je pomnilnik omogočen). Odjemalec lahko pomnilnik izklopi za
> posamezno zahtevo z glavo zahteve `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — glejte tabelo glav zahtev v
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Zahteva brez pomnilnika
> nastavi `memoryOwnerId = null`, kar za to zahtevo onemogoči **tako** vstavljanje
> spominov **kot** veščin (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Pomnilnik je **omejen na posamezni ključ API**, ne na posameznega uporabnika —
vse zahteve, overjene z istim ključem API, si delijo isti pomnilniški sklad,
z možnostjo dodatne omejitve po `sessionId`.

## Arhitektura

```
Odjemalec → /v1/chat/completions (apiKeyInfo razrešen predhodno)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # pridobi ID
    → getMemorySettings()                     # predpomnjene nastavitve
    → shouldInjectMemory(body, {enabled})     # prehod
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + izbirni vektor
    → injectMemory(body, memories, provider)  # sistemsko ali uporabniško sporočilo
  → klic ponudnika višje ravni
  → ob odgovoru: extractFacts(text, apiKeyId, sessionId)  # neblokirajoče
    → setImmediate → createMemory(fact) za vsako ujemanje
                   → embed(content) + upsertVector(id, vec)
```

Klicna mesta za vstavljanje in pridobivanje so povezana v
`open-sse/handlers/chatCore.ts` (poiščite `retrieveMemories`, `injectMemory`
in `extractFacts`).

## Arhitektura mehanizma (3-stopenjsko razreševanje)

Pomnilniški mehanizem med izvajanjem določi pot pridobivanja glede na
razpoložljivo infrastrukturo in nastavitve. Obstajajo tri stopnje, ki se
uporabijo po prednostnem vrstnem redu:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  STOPNJA 0 — Ključne besede (FTS5)                          │
  │  Razpoložljivost na podlagi preverjanja: FTS5, kadar ga      │
  │  podpira različica SQLite (better-sqlite3 / node:sqlite /    │
  │  bun:sqlite); ni na voljo v različicah brez FTS5 (npr.       │
  │  sql.js/WASM — "no such module: fts5"). Uporabi se, ko je    │
  │  strategy = "exact", ali kot nadomestna možnost; stanje      │
  │  ključnih besed v stanju mehanizma odraža preverjanje.       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  STOPNJA 1 — Vgrajeni vektor (sqlite-vec)                    │
  │  sqlite-vec v0.1.9, naložen prek db.loadExtension().         │
  │  KNN s surovo silo nad vektorji Float32. Aktivno, kadar:     │
  │   • se sqlite-vec loadExtension uspešno izvede                │
  │   • je na voljo vir vložitev (remote | static |              │
  │     transformers), ki lahko ustvari Float32Array             │
  │   • obstaja tabela vec_memories (ustvari se ob prvem ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  STOPNJA 2 — Qdrant (izbirna zunanja vektorska zbirka)       │
  │  Ko je omogočena, nadomesti sqlite-vec za semantic/hybrid.   │
  │  Zahteva delujoč primerek Qdrant + nastavljen gostitelj/vrata.│
  └─────────────────────────────────────────────────────────────┘
```

Degradacija je samodejna in pregledna:

- Če se sqlite-vec ne naloži, stopnja 1 ni na voljo → uporabi se stopnja 0.
- Če vir vložitev vrne napako, stopnja 1 uporabi stopnjo 0.
- Če Qdrant ne deluje pravilno, stopnja 2 uporabi stopnjo 1 (ali stopnjo 0,
  če tudi stopnja 1 ni na voljo).

## Viri vdelav

Plast za vdelave (`src/lib/memory/embedding/`) določi, kateri vir naj uporabi
na podlagi `MemorySettingsExtended.embeddingSource`:

| Vir            | Opis                                                                                             | Zahtevan ključ | Hladni zagon     |
| -------------- | ------------------------------------------------------------------------------------------------ | -------------- | ---------------- |
| `remote`       | Uporablja API za vdelave konfiguriranega ponudnika (OpenAI, Cohere itd.)                         | Da             | Brez             |
| `static`       | Lokalna vdelava s pregledovalno tabelo prek `potion-base-8M` (WordPiece + povprečno združevanje) | Ne             | ~200ms           |
| `transformers` | Lokalno izvajanje ONNX prek `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                   | Ne             | ~3s + ~400MB RAM |
| `auto`         | Določanje med izvajanjem: oddaljeni → statični → transformers → null                             | Odvisno        | Odvisno          |

**Vrstni red določanja za `auto`:**

1. Poišči prvega ponudnika v `listEmbeddingProviders()`, pri katerem je `hasKey === true` → `remote`.
2. Če je `settings.staticEnabled === true` → `static`.
3. Če je `settings.transformersEnabled === true` → `transformers`.
4. Sicer → `null` (preide na iskanje po ključnih besedah FTS5).

Predpomnilnik vdelav (`src/lib/memory/embedding/cache.ts`) uporablja preslikavo
LRU v pomnilniku s ključi `${source}:${model}:${dim}:${sha256(text)}`, omejeno na
`MEMORY_EMBEDDING_CACHE_MAX` vnosov (privzeto 1000) s časom veljavnosti
`MEMORY_EMBEDDING_CACHE_TTL_MS` (privzeto 5 min). V življenjskem ciklu procesa
je v skupni rabi med vsemi klicatelji.

## Hibridni RRF (k=60)

Ko je `strategy = "hybrid"` in je vektorska shramba na voljo, pridobivanje
uporablja Reciprocal Rank Fusion za združevanje rezultatov FTS5 in vektorskih rezultatov:

```
RRF(d) = Σ  1 / (k + rank_i(d))      kjer je k = 60 (nastavljivo prek MEMORY_RRF_K)
          i
```

Natančneje:

1. Izvedi iskanje FTS5 → razvrščen seznam `R_fts` (položaji 1..N).
2. Izvedi vektorsko iskanje KNN → razvrščen seznam `R_vec` (položaji 1..M).
3. Za vsak enolični `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, če ga ni na seznamu).
4. Razvrsti po `rrf_score` padajoče in uporabi prehod glede na proračun žetonov.

Znano je, da je RRF učinkovit brez normalizacije rezultatov med heterogenimi
sistemi za pridobivanje. Privzeta vrednost `k=60` izhaja iz izvirnega članka
Cormacka in sod. ter dobro deluje pri majhnih korpusih (<10k spominov).

## Zapolnjevanje za nazaj (leno + ponovno indeksiranje)

Ko se model vdelav spremeni (zaznano prek `embedding_signature`), se
vektorska shramba znova zgradi, vsi obstoječi spomini pa so v tabeli
`memories` označeni z `needs_reindex = 1`.

**Leno zapolnjevanje za nazaj**: Pri naslednjem pridobivanju se vsak spomin brez
vektorskega vnosa vdela in vstavi v `vec_memories`, preden se iskanje izvede.
Tako se strošek zapolnjevanja za nazaj porazdeli med dejanske zahteve, ne da bi
blokiral zagon.

**Izrecno ponovno indeksiranje**: Zavihek Engine v `/dashboard/memory` ponuja
gumb »Ponovno indeksiraj zdaj«, ki pokliče `POST /api/memory/reindex`. Obdelovalnik
pokliče `runReindexBatch()` iz `src/lib/memory/reindex.ts`, ki pri vsaki zahtevi
obdela do `limit` čakajočih vnosov. Napredek je mogoče preverjati prek
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabela `memory_vec_meta` (migracija `083_memory_vec.sql`) hrani:

- `active_dim` — trenutna dimenzija vektorja (null = še ni umerjena).
- `embedding_signature` — `${source}:${model}:${dim}`, ki se uporablja za zaznavanje sprememb.
- `last_reset_at` — časovni žig zadnje popolne ponastavitve.
- `vec_loaded` — zastavica 0/1, ki označuje, ali je bil sqlite-vec uspešno naložen.

## Razširitev nastavitev

V `MemorySettingsExtended` v
`src/shared/schemas/memory.ts` je na voljo devet polj za vdelave in vektorje, ki se trajno shranjujejo prek `src/lib/db/settings.ts`:

| Polje                    | Vrsta                                              | Privzeto | Opis                                                            |
| ------------------------ | -------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Kateri vir vdelav naj se uporabi                                |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Ponudnik/model v obliki `provider/model`                        |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Osnovni URL pomnilniške končne točke, združljive z OpenAI       |
| `customModelId`          | `string \| null`                                   | `null`   | ID modela, poslan končni točki po meri                          |
| `transformersEnabled`    | `boolean`                                          | `false`  | Izbirna vključitev Transformers.js (MiniLM, ~400 MB)            |
| `staticEnabled`          | `boolean`                                          | `false`  | Izbirna vključitev lokalnega statičnega modela potion-base-8M   |
| `rerankEnabled`          | `boolean`                                          | `false`  | Omogoči korak ponovnega razvrščanja (doda +200–500 ms/zahtevo)  |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Ponudnik/model za ponovno razvrščanje v obliki `provider/model` |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | Katero vektorsko zaledje naj se uporabi                         |

Ta polja so dostopna prek `GET /PUT /api/settings/memory` (shema `MemorySettingsExtendedSchema`).

Za vir `remote` Memory sprejema tudi izbirni nastavitvi `customBaseUrl` in
`customModelId`. Skupaj izbereta končno točko `/embeddings`, združljivo z OpenAI,
in model, ne da bi spremenili globalni register vdelav. Končna točka se pred uporabo
normalizira in preveri s pravilnikom ponudnika za odhodne URL-je: zahtevan je HTTP(S),
vdelane poverilnice in poizvedbeni nizi so zavrnjeni, naslovi metapodatkov v oblaku
pa ostanejo blokirani. Prazne vrednosti ohranijo izbranega ponudnika iz registra. Napake,
vrnjene nadzorni plošči, so prečiščene, poverilnice končne točke pa se nikoli ne beležijo.

> **TODO (D20):** Obseg `global` (deljenje pomnilnikov med vsemi ključi API) v tej
> izdaji ni implementiran. Zahteva spremembe sheme in globalno pot pridobivanja.
> Obravnavajte ga ločeno.

## Plasti shranjevanja

### Primarna: SQLite (tabela `memories`)

Ustvarjena z migracijo `015_create_memories.sql`:

| Stolpec                     | Vrsta              | Opombe                                                                          |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID, ustvarjen prek `crypto.randomUUID()`                                      |
| `api_key_id`                | `TEXT NOT NULL`    | Lastniški ključ API                                                             |
| `session_id`                | `TEXT`             | Izbirni obseg posameznega pogovora                                              |
| `type`                      | `TEXT NOT NULL`    | Ena od vrednosti `factual`, `episodic`, `procedural`, `semantic`                |
| `key`                       | `TEXT`             | Stabilni ključ za upsert, npr. `preference:i_prefer_python`                     |
| `content`                   | `TEXT NOT NULL`    | Dejansko besedilo dejstva                                                       |
| `metadata`                  | `TEXT`             | Objekt JSON (category, extractedAt, source, ...)                                |
| `created_at` / `updated_at` | `TEXT`             | Nizi ISO 8601                                                                   |
| `expires_at`                | `TEXT`             | Izbirni potek veljavnosti; `NULL` pomeni trajno                                 |
| `memory_id`                 | `INTEGER UNIQUE`   | Dodano z `023_fix_memory_fts_uuid.sql` za povezovanje UUID-jev ↔ rowid-jev FTS5 |

Indeksi: `api_key_id`, `session_id`, `type`, `expires_at` in enolični
indeks `memory_id`.

**Semantika upsert**: `createMemory()` poišče obstoječo vrstico z enakim
`(api_key_id, key)` in jo ob najdbi posodobi na mestu (pri čemer združi `metadata`
s plitko razširitvijo). Tako tabela pri ponavljajočih se izjavah o preferencah ne
raste brez omejitev.

### Iskanje po celotnem besedilu (navidezna tabela `memory_fts`)

`022_add_memory_fts5.sql` ustvari navidezno tabelo FTS5 nad `content` in
`key`. `023_fix_memory_fts_uuid.sql` odpravi napako iz dejanske uporabe, pri kateri
se primarni ključ UUID ni povezal s celoštevilskim rowid-jem FTS5 — migracija doda
stolpec `memory_id`, znova ustvari tabelo FTS in poveže sprožilce
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), ki ob operacijah
INSERT, DELETE in UPDATE ohranjajo FTS sinhroniziran.

Uporablja ga `retrieval.ts` za strategiji `semantic` in `hybrid` (glejte spodaj).
Koda za pridobivanje preveri stanje z `hasTable("memory_fts")` in preklopi na
kronološki vrstni red, če tabela FTS manjka ali poizvedba FTS sproži napako.

### Izbirno: Qdrant (vektorska shramba 2. ravni)

`src/lib/memory/qdrant.ts` implementira izbirno integracijo Qdrant kot vektorsko
shrambo 2. ravni. Pridobivanje se usmeri v Qdrant samo, ko je izbirnik pogona
`memoryVectorStore === "qdrant"` — privzeta vrednost `"auto"` (in `"sqlite-vec"`)
**nikoli** ne izbere Qdrant. Preklopnik na zavihku Engine hkrati nastavi **oboje**,
`qdrantEnabled` in `memoryVectorStore`: omogočanje nastavi Qdrant kot primarno
shrambo, onemogočanje pa ponastavi na `"auto"` (#5597 — pred tem popravkom je bilo
omogočanje brez učinka, ker nič ni zapisalo izbirnika pogona). Če Qdrant ni dosegljiv
ali ne vrne ničesar, pridobivanje preklopi na sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — vdela `key + content` z nastavljenim
  modelom za vdelave, zagotovi obstoj zbirke (ob prvi uporabi ustvari vektorje
  s kosinusno razdaljo) in vstavi ali posodobi točko s koristno vsebino `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — vdela poizvedbo, preišče zbirko,
  filtrirano po `kind = "omniroute_memory"` in po želji po `apiKeyId` /
  `sessionId`. Omeji `topK` na `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — izbriše eno točko. Pokliče jo
  `deleteMemory()` po odstranitvi vrstice iz SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — množično izbriše točke, pri katerih
  je `expiresAtUnix` v preteklosti ali pa je `createdAtUnix` starejši od roka
  hrambe. Najprej jih prešteje, da lahko nadzorna plošča prikaže dejansko število.
- `checkQdrantHealth()` — preverjanje stanja prek `GET /readyz` z zakasnitvijo.

Uporabniški vmesnik nastavitev omogoča konfiguracijo Qdrant, preverjanje stanja, preizkus semantičnega iskanja
in čiščenje na zavihku **Mehanizem** strani `/dashboard/memory`. Ustrezne
poti pod `src/app/api/settings/qdrant/` so povezane od različice v3.8.6:

| Pot                                     | Metoda        | Opis                                     |
| --------------------------------------- | ------------- | ---------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Branje/posodobitev nastavitev Qdrant     |
| `/api/settings/qdrant/health`           | `GET`         | Preverjanje dosegljivosti + zakasnitev   |
| `/api/settings/qdrant/search`           | `POST`        | Preizkus semantičnega iskanja            |
| `/api/settings/qdrant/cleanup`          | `POST`        | Odstranitev poteklih/starih točk         |
| `/api/settings/qdrant/embedding-models` | `GET`         | Seznam razpoložljivih modelov za vdelave |

**Opombe o vedenju (kaj lahko pričakujete):**

- **Izbira mehanizma** — če Qdrant omogočite na zavihku Mehanizem, postane primarna
  shramba (nastavi `memoryVectorStore="qdrant"`); če ga onemogočite, se nastavitev ponastavi na `"auto"` (#5597).
- **Brez naknadnega polnjenja** — vanj se zapisujejo samo pomnilniki, ustvarjeni/posodobljeni **po**
  omogočitvi Qdrant (dvojno zapisovanje brez čakanja na rezultat). Obstoječi pomnilniki SQLite se **ne**
  preselijo; »Ponovno indeksiraj zdaj« znova zgradi samo indeks sqlite-vec, ne pa tudi Qdrant.
- **Dimenzija vektorja se samodejno zazna** iz dejanske vdelave ob prvi uporabi — polja
  za dimenzijo ni treba izpolniti. Sprememba modela za vdelave po tem, ko zbirka že
  obstaja, se **ne** obravnava samodejno: obstoječa zbirka ostane nespremenjena, zapisovanja/iskanja
  z neujemajočimi se dimenzijami pa ne uspejo in se preusmerijo na sqlite-vec. Če želite zamenjati model
  za vdelave, znova ustvarite zbirko (z novim imenom ali tako, da jo izbrišete v Qdrant).
- **Metrika razdalje** — vedno **kosinusna** (trdo kodirana ob ustvarjanju zbirke; ni
  nastavljiva).
- **Preverjanje pristnosti** — samo ključ API (poslan kot glava `api-key`; izbiren za lokalni Docker
  brez preverjanja pristnosti). JWT/RBAC se ne uporabljata.
- **Konfiguracijska polja** — uporabniški vmesnik omogoča `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` sta na voljo samo prek okolja/podatkovne zbirke, pri čemer se `vectorSize`
  ne uporablja za ustvarjanje zbirke (dimenzija izhaja iz vdelave).

### Kvantizacija vektorjev (int8 — izbirna, obe zaledji)

Obe vektorski zaledji podpirata **izbirno kvantizacijo int8**, ki zmanjša pomnilniški
odtis shranjenih vektorjev (približno 4-krat manj kot Float32) za ceno majhnega zmanjšanja priklica.
Privzeto je pri obeh **izklopljena** — vektorji ostanejo v polni natančnosti, razen če je
izrecno omogočena.

| Zaledje    | Nastavitev                         | Vrsta                          | Privzeto | Kje se bere                                                 |
| ---------- | ---------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (ključ DB)    | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (okolje) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** se konfigurira za vsak primerek posebej prek ključa nastavitve
  `qdrantQuantization` (izpostavljenega kot polje `quantization` pri `PUT /api/settings/qdrant`). Ko je
  nastavljen na `"int8"`, `buildQuantizationConfig()` zahteva skalarno kvantizacijo
  (`always_ram`, kvantil `0.99`), iskanja pa omogočijo `rescore: true`, da
  vektorji s polno natančnostjo izboljšajo množico kandidatov int8.
- Kvantizacija **sqlite-vec** se nastavlja **samo prek okolja** (ne prek nastavitve DB): nastavite
  `MEMORY_VEC_QUANTIZATION=int8`, da se lokalni vektorji shranijo kot stolpec `int8[dim]`
  prek `vec_quantize_int8(?, 'unit')`. Izbrani način je vključen v
  `embedding_signature` (pripona `:int8`), zato preklop med načini sproži popolno
  ponovno indeksiranje tabele `vec_memories` — po isti poti lenega naknadnega polnjenja, ki se uporablja ob
  spremembi modela za vdelave.

## Vrste pomnilnika

`MemoryType` (`src/lib/memory/types.ts`):

| Vrsta        | Namen uporabe                                                                            |
| ------------ | ---------------------------------------------------------------------------------------- |
| `factual`    | Preference, nespremenljiva dejstva o uporabniku, vedenjski vzorci                        |
| `episodic`   | Odločitve, vezane na določen trenutek ("I chose Postgres")                               |
| `procedural` | Pomnilnik delovnih postopkov/navodil (rezervirano; trenutno ni samodejnega ekstraktorja) |
| `semantic`   | Rezervirano za vnose v vektorski shrambi                                                 |

Strategija pridobivanja za `MemoryConfig` je ena od `exact`, `semantic` ali `hybrid`,
obseg pa je eden od `session`, `apiKey` ali `global`. Privzeti obseg iz
`getMemorySettings()` je `apiKey`.

## Ekstrakcija dejstev (`extraction.ts`)

Ekstrakcija **temelji na regularnih izrazih**, ne na LLM-ju — izvaja se znotraj procesa prek
`setImmediate()`, zato nikoli ne blokira toka odgovora:

- **Vzorci preferenc** → `MemoryType.FACTUAL`
  (npr. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Vzorci odločitev** → `MemoryType.EPISODIC`
  (npr. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Vzorci navad** → `MemoryType.FACTUAL`
  (npr. `I usually …`, `I always …`, `I tend to …`)

Vsako ujemanje se prečisti (`trim`, strnitev presledkov, omejitev na 500 znakov),
znotraj serije se odstranijo podvojitve prek stabilnega `factKey(category, content)` in
se shrani prek `createMemory()` z metapodatki
`{category, extractedAt, source: "llm_response"}`. Vhodno besedilo je omejeno na
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — če je daljše, se uporabi **konec** besedila,
tako da je vedno vključena najnovejša vsebina pomočnika.

`extractFactsFromText(text)` je izvožena za teste in vrne strukturirana
dejstva, ne da bi jih shranila.

## Pridobivanje (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` je glavna vstopna točka. Funkcija:

1. Normalizira in preveri veljavnost konfiguracije prek `MemoryConfigSchema`.
2. Takoj vrne `[]`, ko je `enabled` nastavljen na false ali je `maxTokens <= 0`.
3. Omeji `maxTokens` na razpon `[1, 8000]`.
4. Zazna, ali obstaja sodobna tabela `memories` (v primerjavi s starejšo tabelo `memory`),
   tako da starejše podatkovne zbirke še naprej delujejo.
5. Sestavi osnovno poizvedbo z varovalom za potek veljavnosti
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), izbirnim
   obsegom seje in izbirno mejno vrednostjo `retentionDays`.
6. Razveji izvajanje glede na strategijo:
   - **`exact`** (privzeto): kronološko `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: če je nastavljen `config.query` in obstaja `memory_fts`, uporabi JOIN
     `memory_fts MATCH ?` ter razvrsti po uvrstitvi FTS; če FTS vrne 0 vrstic,
     uporabi kronološko razvrščanje.
   - **`hybrid`**: unija rezultatov FTS (večja relevantnost) in
     kronološke množice, pri čemer se podvojitve odstranijo po ID-ju.
7. Ko je podana poizvedba, izračuna oceno relevantnosti ključnih besed (`getRelevanceScore`) za
   `content`, `key` in JSON v `metadata`. Vrstice z oceno nič se izločijo.
8. Razvrsti po padajoči oceni in nato po padajočem `createdAt`.
9. Pregleda razvrščeni seznam in sprejema vnose, dokler tekoča vrednost
   `estimateTokens(content)` (≈ `length / 4`) ostaja znotraj omejitve. Če obstaja
   kakršno koli ujemanje, vedno vrne vsaj en vnos.

`estimateTokens` je izvožena in se uporablja pri pridobivanju, povzemanju ter v orodju MCP
`omniroute_memory_search`.

## Vstavljanje (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Združi vso vsebino pomnilnika v en niz `Memory context: …`.
2. Izbere strategijo glede na ime ponudnika:
   - **Sistemsko sporočilo** (privzeto za OpenAI, Anthropic, Gemini, …) — doda
     `{role: "system", content: memoryText}` pred vsa obstoječa sistemska
     sporočila, tako da imajo uporabniški sistemski pozivi še vedno prednost.
   - **Uporabniško sporočilo** (nadomestna možnost) — za ponudnike v
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Ti zavrnejo sistemsko vlogo,
     sicer pa bi vrnili napako 400 (glejte težavo #1701 za GLM/Zhipu).
3. Zabeleži število, strategijo in model pod `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` je izvožena za klicatelje, ki morajo
sprejemati lastne odločitve o usmerjanju. Neznani ponudniki so zaradi varnosti
privzeto nastavljeni na `true` (sistemska vloga je dovoljena).

## Nastavitve (`settings.ts`)

Konfiguracija pomnilnika je **shranjena v tabeli nastavitev zbirke podatkov** in ne v spremenljivkah okolja.
`getMemorySettings()` bere iz `getSettings()` in rezultat predpomni
znotraj procesa; pot PUT za nastavitve po zapisovanju pokliče
`invalidateMemorySettingsCache()`.

### Podedovana polja (vse različice)

| Ključ zbirke podatkov | Vrsta            | Privzeto                                           | Kontrolnik uporabniškega vmesnika                                 |
| --------------------- | ---------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `memoryEnabled`       | logična vrednost | `false` (privzeto izklopljeno od v3.8.30)          | Vklop/izklop pomnilnika                                           |
| `memoryMaxTokens`     | celo število     | `2000` (razpon `0–16000`)                          | Proračun žetonov za vstavljanje                                   |
| `memoryRetentionDays` | celo število     | `30` (razpon `1–365`)                              | Obdobje hrambe                                                    |
| `memoryStrategy`      | naštevanje       | `"hybrid"` (ena od `recent`, `semantic`, `hybrid`) | Strategija pridobivanja                                           |
| `skillsEnabled`       | logična vrednost | `false`                                            | Preklopi vstavljanje veščin za posamezni ključ (glejte SKILLS.md) |

Opomba: strategija uporabniškega vmesnika `"recent"` se prek
`toMemoryRetrievalConfig()` preslika v notranjo strategijo pridobivanja
`"exact"` (kronološki vrstni red).

### Nova polja (v3.8.6, načrt 21 D9)

Za opise polj glejte tudi zgornji razdelek »Razširitev nastavitev«.

| Ključ zbirke podatkov       | Polje API                | Privzeto |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Ključe zbirke podatkov, povezane s Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` s privzeto vrednostjo `"omniroute_memory"`,
`qdrantEmbeddingModel` s privzeto vrednostjo `"openai/text-embedding-3-small"`), prebere
`normalizeQdrantConfig()` v `qdrant.ts`.

### Spremenljivke okolja (v3.8.6)

Šest izbirnih spremenljivk okolja prilagaja obnašanje mehanizma med izvajanjem (dokumentirano v `.env.example`):

| Spremenljivka                   | Privzeto                   | Opis                                                                                                                                                                             |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL predpomnilnika vdelav (5 min)                                                                                                                                                |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Največje število vnosov v predpomnilniku LRU za vdelave                                                                                                                          |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repozitorij HF za model Transformers.js                                                                                                                                          |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repozitorij HF za statični model potion                                                                                                                                          |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Mesto za shranjevanje prenesenih modelov                                                                                                                                         |
| `MEMORY_VEC_TOP_K`              | `20`                       | Privzeti top-K za vektorsko iskanje                                                                                                                                              |
| `MEMORY_RRF_K`                  | `60`                       | Konstanta RRF k za hibridno iskanje                                                                                                                                              |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Nastavite na `int8`, da se lokalni vektorji sqlite-vec shranijo kvantizirano (približno 4-krat manjši; zahteva izrecno vključitev). Sprememba načina vsili ponovno indeksiranje. |

## Povzemanje (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` zgosti starejšo
vsebino, ko skupno število žetonov v pomnilnikih ključa preseže
omejitev. Vrstice obravnava padajoče glede na `created_at`, ohrani tiste, ki
ustrezajo omejitvi, pri preostalih pa `content` zamenja s prvimi tremi stavki
izvirnika. `tokensSaved` je razlika v `estimateTokens` med staro in
novo vsebino.

Ta rutina je **na voljo, vendar se v trenutnem cevovodu za klepet ne kliče samodejno**
— če potrebujete neprekinjeno zgoščevanje, jo pokličite iz opravila cron, skrbniškega
dejanja ali povezovalne logike `MemoryConfig.autoSummarize`. Izguba podatkov
je enosmerna: izvirno besedilo se prepiše.

## REST API

Vse končne točke zahtevajo avtentikacijo za upravljanje (`requireManagementAuth`).

### Osnovne končne točke pomnilnika (obstoječe + posodobljene)

| Metoda   | Pot                  | Opis                                                                                                                                                                                      |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Ostranjen seznam s filtri: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odgovor vključuje `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`            |
| `POST`   | `/api/memory`        | Ustvari vnos (preverjen z Zod: `content`, `key`, izbirno `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Pokliče `createMemory()`, ki izvede upsert glede na `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Pridobi posamezen vnos glede na UUID                                                                                                                                                      |
| `PUT`    | `/api/memory/[id]`   | Posodobi polja vnosa (`type`, `key`, `content`, `metadata`). Telo: `MemoryUpdatePutSchema`. Če je na voljo vir vdelave, sinhronizira tudi vektor.                                         |
| `DELETE` | `/api/memory/[id]`   | Izbriše vnos; izbriše ga tudi iz `vec_memories` (D15) in po najboljših močeh iz Qdrant. Če vnos ne obstaja, vrne 404.                                                                     |
| `GET`    | `/api/memory/health` | Zažene `verifyExtractionPipeline("health-check")` — krožni preizkus ustvari→izpiši seznam→izbriši. Vrne `{working, latencyMs, error?}`                                                    |

### Nove končne točke pomnilniškega mehanizma (načrt 21)

| Metoda | Pot                               | Opis                                                                                                                                                                                              |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Poskusni zagon `retrieveMemories` — vrne razvrščene rezultate z oceno, ravnjo in žetoni. Telo: `RetrievePreviewSchema`. Pomnilnikov NE vstavi ali spremeni.                                       |
| `GET`  | `/api/memory/embedding-providers` | Prikaže ponudnike z modeli vdelav in označi, kateri imajo konfiguriran ključ API.                                                                                                                 |
| `GET`  | `/api/memory/engine-status`       | Vrne celotno stanje mehanizma: raven ključnih besed, razreševanje vdelav, statistiko vektorske shrambe, stanje Qdrant in konfiguracijo ponovnega razvrščanja. Oblika: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ročno sproži zgoščevanje pomnilnika. Telo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Vrne `{candidates, tokensSaved}`.                                                    |
| `POST` | `/api/memory/reindex`             | Sproži ponovno vektorsko indeksiranje pomnilnikov z `needs_reindex=1`. Telo: `MemoryReindexSchema` (`force`). Vrne `{started, pending}`.                                                          |

### Končne točke nastavitev

| Metoda | Pot                                     | Opis                                                                                                  |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Trenutni normalizirani `MemorySettingsExtended` (7 novih polj + podedovana polja)                     |
| `PUT`  | `/api/settings/memory`                  | Posodobi katero koli polje iz `MemorySettingsExtendedSchema` (skupaj 12 polj)                         |
| `GET`  | `/api/settings/qdrant`                  | Trenutne nastavitve Qdrant (`QdrantSettingsSchema`)                                                   |
| `PUT`  | `/api/settings/qdrant`                  | Posodobi nastavitve Qdrant. Telo: `QdrantSettingsUpdateSchema`. `apiKey` = prazen niz odstrani ključ. |
| `GET`  | `/api/settings/qdrant/health`           | Preverjanje delovanja konfiguriranega primerka Qdrant. Vrne `QdrantHealthResultSchema`.               |
| `POST` | `/api/settings/qdrant/search`           | Preizkus semantičnega iskanja v Qdrant. Telo: `QdrantSearchSchema` (`query`, `topK`).                 |
| `POST` | `/api/settings/qdrant/cleanup`          | Odstrani točke Qdrant za potekle/stare pomnilnike.                                                    |
| `GET`  | `/api/settings/qdrant/embedding-models` | Prikaže modele vdelav, ki so na voljo za Qdrant.                                                      |

Poizvedba seznama `/api/memory` podpira bodisi ostranjevanje na podlagi `page`
(`parsePaginationParams`) **bodisi** neposredni `offset` — kadar je prisoten
`offset`, ima prednost, za obliko odgovora pa se izračuna izpeljani `page`.

## Orodja MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Ko je strežnik MCP omogočen, se registrirajo tri orodja za pomnilnik:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → ovija `retrieveMemories()`. Od različice v3.8.6 (D16) se `strategy` prebere
  iz `getMemorySettings()` in ni več neposredno nastavljen na `"exact"`. Če je
  podan `query` in je `strategy` nastavljen na `semantic` ali `hybrid`, se uporabi
  vektorska shramba, ko je na voljo.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → ovija `createMemory()`. Sprejema samo 4 kanonične vrste:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → izpiše ujemajoče se
  vnose, jih po želji filtrira glede na časovni žig nastanka pred določenim datumom,
  nato pa vsakega izbriše prek `deleteMemory()` (ki odstrani tudi vektorje iz sqlite-vec + Qdrant).

Za podrobnosti o transportu in obsegu glejte [MCP-SERVER.md](./MCP-SERVER.md).

## Nadzorna plošča (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` je zdaj **Studio s 3 zavihki**:

### Zavihek: Spomini

- Kartica s konceptom (zložljiva razlaga »Kako deluje«).
- Seznam v realnem času, iskanje in oštevilčenje strani (zakasnitev 300 ms).
- Filter vrst (`factual` / `episodic` / `procedural` / `semantic` / vse).
- Modalno okno za dodajanje spomina (ključ, vsebina, vrsta).
- Urejanje v vrstici (gumb s svinčnikom → `PUT /api/memory/[id]`).
- Brisanje posamezne vrstice (s potrditvenim pogovornim oknom).
- Izvoz trenutne strani v JSON; uvoz datoteke JSON prek izbirnika datotek.
- Kartice s statistiko: `totalEntries`, `tokensUsed`, `hitRate`.
- Gumb »Strni stare« → `POST /api/memory/summarize` (poskusni zagon najprej prikaže
  število kandidatov, nato zahteva potrditev).
- Zelena/rdeča pika stanja, ki jo določa `GET /api/memory/health`.

### Zavihek: Preizkuševalnik

- Vnos poizvedbe + izbirnik strategije (Natančno / Semantično / Hibridno) + proračun žetonov.
- »Simuliraj« → `POST /api/memory/retrieve-preview` — prikaže razvrščene rezultate z
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Plošča razreševanja, ki prikazuje, kateri vir vdelav / katera vektorska shramba je bila uporabljena
  in ali je prišlo do uporabe nadomestne možnosti.

### Zavihek: Mehanizem

- Plošča stanja mehanizma (oznaka ključne besede FTS5, oznaka vdelav, oznaka vektorske shrambe,
  oznaka stanja Qdrant, oznaka ponovnega razvrščanja).
- Gumb »Ponovno indeksiraj zdaj« → `POST /api/memory/reindex`.
- Izbirnik vira vdelav (samodejno / oddaljeno / statično / transformers + preklopna stikala).
- Kartica konfiguracije Qdrant (preklop za omogočanje, gostitelj/vrata/zbirka/ključ, preizkus povezave,
  preizkus semantičnega iskanja, čiščenje).
- Kartica konfiguracije ponovnega razvrščanja (preklop za omogočanje, izbirnik ponudnika/modela).

Nastavitve pomnilnika in Qdrant so na voljo tudi pod
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) kot
podedovana/globalna površina nastavitev.

## Predpomnjenje

`src/lib/memory/store.ts` vzdržuje približek predpomnilnika LRU znotraj procesa
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, z odstranitvijo 20 %
najstarejših vnosov) za branja `getMemory(id)`, poleg tega pa še splošno plast
predpomnilnika ključ/vrednost `memoryCache` (`src/lib/memory/cache.ts`) z metodami
`get`/`set`/`invalidate`, ki jo uporabljajo klicatelji, ki želijo lasten predpomnilnik z določenim obsegom
(LRU s 1 000 vnosi, privzeti TTL 5 min).

## Zasebnost in življenjski cikel

- Lastništvo pomnilnika določa ID ključa API (`resolveMemoryOwnerId` v
  `chatCore.ts`). Brez `apiKeyInfo.id` se ne izvedejo niti pridobivanje niti vstavljanje
  niti ekstrakcija.
- Vnosi z datumom `expires_at` v prihodnosti so izločeni iz pridobivanja; stari
  vnosi, ki presegajo `retentionDays`, so izključeni s pogojem
  `created_at >= cutoff` v `retrieveMemories`.
- Za trajni izbris uporabite `DELETE /api/memory/[id]` ali `omniroute_memory_clear`.
- Ekstrakcija se izvaja brez čakanja na rezultat prek `setImmediate`; napake se beležijo pod
  `memory.extraction.background.failed` in se nikoli ne posredujejo klicatelju.
- Preverjanja z obhodom celotnega procesa (`verifyExtractionPipeline`) počistijo lastne
  testne vnose v bloku `finally`.

## Glejte tudi

- [SKILLS.md](./SKILLS.md) — nastavitev `skillsEnabled` vstavi definicije
  orodij skupaj s pomnilnikom.
- [MCP-SERVER.md](./MCP-SERVER.md) — transport MCP / obsegi.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — širši nabor funkcij API-ja.
- Izvorni moduli:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibridni RRF
  - `src/lib/memory/embedding/index.ts` — večizvorna plast vdelav
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — sheme Zod za vsa telesa zahtev pomnilniškega API-ja
  - `src/shared/schemas/qdrant.ts` — sheme Zod za nastavitve/operacije Qdrant
  - `src/lib/db/memoryVec.ts` — operacije CRUD za `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + podrejene poti
  - `src/app/(dashboard)/dashboard/memory/` — uporabniški vmesnik Studio (stran + komponente +
    zavihki + kavlji)
  - `open-sse/handlers/chatCore.ts` (povezovanje vstavljanja / ekstrakcije)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Izbira ponudnika vdelav (v3.8.16+)

Pomnilniški mehanizem OmniRoute podpira **štiri vire vdelav** (`src/lib/memory/embedding/`). Vsak ponuja različna razmerja med **zakasnitvijo, stroški, kakovostjo modela in zahtevnostjo nastavitve**.

### Viri vdelav

| Ponudnik          | Vir                                               | Zakasnitev                                   | Stroški               | Kakovost                                            | Nastavitev                                             |
| ----------------- | ------------------------------------------------- | -------------------------------------------- | --------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| `transformers`    | Lokalni model ONNX (Xenova/all-MiniLM-L6-v2)      | ~50-150ms (CPE)                              | Brezplačno            | Dobra                                               | Samo `npm install`                                     |
| `static`          | Vnaprej izračunani vektorji (predpomnjeni)        | <1ms                                         | Brezplačno            | Ni relevantno (odvisno od zadetka v predpomnilniku) | Brez                                                   |
| `remote`          | API OpenAI / Cohere / Voyage                      | ~100-300ms                                   | $0.02-0.10/1M žetonov | Odlična                                             | Ključ API                                              |
| `auto`            | Med izvajanjem izbere najboljši razpoložljivi vir | Enako kot izbrani vir                        | Brezplačno            | Enaka kot pri izbranem viru                         | Brez                                                   |
| _(predpomnilnik)_ | Pomnilniška plast LRU nad katerim koli virom      | <1ms (zadetek), polna zakasnitev (zgrešitev) | Brezplačno            | Enaka kot pri osnovnem viru                         | Vedno vključena (ni vir, ki bi ga bilo mogoče izbrati) |

### Odločitveno drevo

```
                  Kakšen je kontekst vaše uvedbe?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 RAZVOJ/TEST  MANJŠA PRODUKCIJA VELIKA PRODUKCIJA ROB / BREZ POVEZAVE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (brezplačno, brez API-ja)   (najboljša kakovost) (brez interneta)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            VEDNO dodajte plast `cache` na vrh
            (LruCache ovije katerega koli ponudnika)
```

### Konfiguracija podatkovne zbirke in API-ja

Možnosti pomnilniških vdelav se konfigurirajo prek API-ja/uporabniškega vmesnika za nastavitve, ne prek spremenljivk okolja. Ustrezni ključi nastavitev podatkovne zbirke pod Nastavitve (`normalizeMemorySettings` v `src/lib/memory/settings.ts`) so:

- `memoryEmbeddingSource`: `"transformers"` (lokalno), `"remote"` (prek API-ja, npr. OpenAI), `"static"` (zunanja shramba) ali `"auto"`
- `memoryEmbeddingProviderModel`: Identifikator modela za oddaljene/statične vire (npr. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` ali `"auto"`

#### Lokalni model (`transformers`)

Za izvajanje lokalnih modelov interno uporablja transformers.js:

```bash
# Spremenljivke okolja, prebrane v kodi (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repozitorij modela HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statični model potion HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Imenik predpomnilnika
```

#### Predpomnilnik vdelav LRU

Predpomnilnik je privzeto vedno vključen in se konfigurira prek spremenljivk okolja:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Največje število predpomnjenih elementov
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Podatki o zmogljivosti

Primerjalni preizkus na običajnem 4-jedrnem strežniku x86 (besedila po približno 100 žetonov):

| Ponudnik             | p50   | p95   | p99   | Strošek / 1 mio. vdelav                  |
| -------------------- | ----- | ----- | ----- | ---------------------------------------- |
| `transformers` (CPE) | 80ms  | 180ms | 350ms | Brezplačno                               |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~0,02 USD (ada-002) / 0,13 USD (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Odvisno od gostovanja Qdrant             |
| `cache` (zadetek)    | <1ms  | <1ms  | 2ms   | Brezplačno                               |

---

## Vzorci pridobivanja dejstev (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) uporablja **ujemanje z regularnimi izrazi** za pridobivanje strukturiranih dejstev iz sporočil v pogovoru. Razumevanje teh vzorcev vam pomaga prilagoditi kakovost pridobivanja vašemu primeru uporabe.

### Privzete kategorije vzorcev

| Kategorija          | Primer vzorca                                               | Zajame                           |
| ------------------- | ----------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Uporabniške preference           |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Uporabniške odločitve (epizodne) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Trajni vedenjski vzorci          |

### Primeri vzorcev (poenostavljeno)

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

### Kaj se pridobi

Ko uporabnik reče:

> "Raje imam TypeScript. Za ta projekt bom uporabil Postgres. Pred potiskanjem vedno izvedem commit. Ne maram Pythona."
> Pridobivanje ustvari 4 spomine:
>
> | Ključ                                | Kategorija | Vrsta    | Vsebina                     |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Omejitve pridobivanja

Za preprečevanje nenadzorovanega pridobivanja veljajo naslednje omejitve:

| Najmanjša dolžina vsebine | 3 znaki |
| Največja dolžina vsebine | 500 znakov |

### Kdaj onemogočiti pridobivanje

Pridobivanje se samodejno izvaja vedno, ko je pomnilnik omogočen; ločenega
stikala samo za pridobivanje ni. Če ga želite izklopiti, v celoti onemogočite pomnilnik (`enabled: false`
prek `PUT /api/settings/memory`). To je smiselno v naslednjih primerih:

- Imate veliko količino sporočil in strošek pridobivanja ni zanemarljiv
- Vaši pogovori so večinoma prehodni (klepet, odpravljanje napak) in nimajo dolgoročne vrednosti
- Kontekst že zajemate prek vtičnikov po meri

---

## Prilagajanje hibridnega RRF (v3.8.16+)

Algoritem **Reciprocal Rank Fusion (RRF)** združuje rezultate FTS5 (iskanje po ključnih besedah) in vektorske (semantične) rezultate. Parameter `k` določa, koliko teže se dodeli nižje uvrščenim rezultatom.

### Formula

Za vsak kandidatni spomin je rezultat RRF:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Pri čemer:

- `k` je konstanta (privzeto 60)
- `rank_i(d)` je uvrstitev dokumenta `d` v i-tem sistemu pridobivanja (FTS, vektorsko)
- Seštevek poteka čez vse sisteme pridobivanja

### Kako `k` vpliva na rezultate

| Vrednost `k`          | Učinek                                                                                         | Najprimerneje za                         |
| --------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `k=0`                 | Čisto združevanje uvrstitev (brez glajenja)                                                    | Teoretično izhodišče                     |
| `k=10-30`             | Močno uteži najvišje rezultate, nizka uvrstitev prispeva komaj kaj                             | Ko so prvi 3 rezultati običajno pravilni |
| **`k=60`** (privzeto) | Uravnoteženo — vseh prvih 10 rezultatov pomembno prispeva                                      | Splošno pridobivanje                     |
| `k=100+`              | Bolj izravnano — tudi nizko uvrščeni rezultati lahko prevladajo, če se pojavijo v več sistemih | Ko je priklic pomembnejši od natančnosti |

### Prilagajanje `k` v praksi

```bash
# Privzeto
MEMORY_RRF_K=60

# Agresivna natančnost (majhen pomnilnik, malo dokumentov)
MEMORY_RRF_K=20

# Največji priklic (velik pomnilnik, raznolike poizvedbe)
MEMORY_RRF_K=120
```

**Primer z `k=20`:**

- Uvrstitev FTS 1 → prispevek `1/21 = 0.048`
- Uvrstitev FTS 10 → prispevek `1/30 = 0.033`
- Vektorska uvrstitev 1 → prispevek `0.048`
- Največja skupna vrednost: `0.096`

**Primer z `k=60`:**

- Uvrstitev FTS 1 → prispevek `1/61 = 0.016`
- Uvrstitev FTS 10 → prispevek `1/70 = 0.014`
- Vektorska uvrstitev 1 → prispevek `0.016`
- Največja skupna vrednost: `0.033`

Pri višjem `k` je **relativna razlika** med prvim in desetim mestom manjša, zato se algoritem bolj zanaša na **soglasje med sistemi pridobivanja** kot na zanesljivost najvišje uvrstitve.

### Kdaj spremeniti `k`

| Simptom                                          | Poskusite                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------- |
| Najvišji rezultat vedno zmaga, vendar je napačen | **Znižajte** k (npr. 20) — zanesljivost najvišje uvrstitve šteje več   |
| Pravilen odgovor je med prvimi 5, ne pa prvi     | **Zvišajte** k (npr. 100) — bolj izravnano točkovanje nagradi soglasje |
| Priklic je visok, vendar je natančnost nizka     | **Znižajte** k — izostrite razvrščanje                                 |
| Priklic je nizek (manjkajo ustrezni dokumenti)   | **Zvišajte** k — ponudite priložnost nižje uvrščenim dokumentom        |

### Uteževanje RRF

Združevanje z vzajemnimi uvrstitvami uporablja enake uteži za semantično vektorsko uvrstitev in uvrstitev pri iskanju po celotnem besedilu:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Za prilagajanje posameznih uteži ni spremenljivk okolja (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ne obstajata).

---

## Strategija povzemanja (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) stisne starejše spomine, da ohrani aktiven nabor majhen, hkrati pa ohrani možnost priklica.

### Kdaj se sproži povzemanje

| Sprožilec                   | Prag (privzeto) |
| --------------------------- | --------------- |
| Ročni sprožilec prek API-ja | ni na voljo     |

### Kaj se povzame

Iz `summarization.ts` sta izvoženi dve vstopni točki:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — strne
  spomine za sejo v eno samo besedilo povzetka, omejeno s proračunom žetonov.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — starostno
  združevanje, ki ga uporablja API: izbere vsak spomin, starejši od `days`, iz njih
  ustvari en strnjen povzetek spomina in (ko je `dryRun` nastavljen na `false`) izbriše
  izvirnike. Podajte `dryRun: true`, da si ogledate nabor kandidatov in skupno število žetonov,
  ne da bi kar koli spremenili.

Ni postopka gručenja po oznakah/ključih ali ocenjevanja posameznih spominov kot »jedrnih ali primernih za povzemanje« —
izbor temelji izključno na starostni meji, besedilo povzetka pa je sestavljeno iz ene strnjene
vrstice s predpono vrste za vsakega kandidata.

### Sprožitev povzemanja

Povzemanje je **ročno / izbirno** — nastavitev `autoSummarize` je privzeto nastavljena na
`false`, zato se nič ne združuje samodejno. Sprožite ga prek API-ja:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Če ga želite pustiti izklopljenega, preprosto ohranite privzeto vrednost nastavitve `autoSummarize` (`false`).

### Nasveti za kakovost povzemanja

- **Najprej si oglejte predogled z `dryRun`** — `summarizeMemoriesOlderThan(..., true)` vrne
  seznam kandidatov in skupno število žetonov, da lahko pred brisanjem izvirnikov preverite,
  kaj bo združeno.
- **Povzemanje izvajajte v času manjšega prometa**, če imate veliko zbirko spominov — klic LLM je najpočasnejši del

```bash
# Po vzoru crona: povzemi vsak dan ob 3. uri zjutraj
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Vzorec ponudnika MemoryBackend

> **Vir resnice:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Preizkusi:** `src/lib/memory/__tests__/generic-backend.test.ts`

Vzorec ponudnika MemoryBackend uvaja **priključljivo abstrakcijsko plast zaledja** nad obstoječim mehanizmom spomina. Namesto vezanosti na eno samo izvedbo shranjevanja sistem spomina zdaj podpira več zaledij (SQLite, Obsidian, Notion, prilagojena zaledja HTTP) z nastavljivim usmerjanjem na primarno/nadomestno zaledje.

### Arhitektura

```
┌──────────────────────────────────────────────────────────┐
│                    Poti API-ja                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orkestrator singleton (manager.ts)                  │
│                                                          │
│  Primarno ──► Zaledje A  (npr. SQLite)                   │
│  Nadomestno ► Zaledje B  (npr. Obsidian)                 │
│               Zaledje C  (npr. Notion prek GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Zaledje    │ │ Zaledje    │ │ Zaledje (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Jedrni vmesnik (`backend.ts`)

Vsako zaledje mora implementirati vmesnik `MemoryBackend`:

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

  // Iskanje
  search(config: SearchConfig): Promise<Memory[]>;

  // Stanje
  health(): Promise<HealthCheckResult>;

  // Življenjski cikel (izbirno)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orkestrator singleton, ki:

- **Registrira** zaledja prek `register(backend)` — poklicano ob zagonu iz `index.ts`
- **Nastavi** primarno in nadomestna zaledja prek `configure(primary, fallbacks)`
- **Usmerja** operacije CRUD/iskanje na primarno zaledje, ob napaki pa po verigi nadomestnih zaledij
- **Preverja stanje** vseh zaledij v rednih intervalih

**Obnašanje nadomestnih zaledij:**

| Operacija | Primarno                    | Nadomestna zaledja                 |
| --------- | --------------------------- | ---------------------------------- |
| `create`  | ✅ Samo primarno            | ❌                                 |
| `get`     | ✅ Najprej poskusi primarno | ✅ Nadomestno, če je rezultat null |
| `update`  | ✅ Samo primarno            | ✅ Sinhronizacija brez čakanja     |
| `delete`  | ✅ Samo primarno            | ✅ Sinhronizacija brez čakanja     |
| `list`    | ✅ Samo primarno            | ❌                                 |
| `search`  | ✅ Najprej primarno         | ✅ Nadomestno ob napaki            |

#### GenericMemoryBackend (`genericBackend.ts`)

Splošni povezovalnik HTTP, ki kateri koli REST API prilagodi vmesniku MemoryBackend. Uporaben za:

- **Notion** — povezava prek Notion API-ja
- **Obsidian** — povezava prek lokalnega REST API-ja Obsidian
- **Zaledja po meri** — katera koli storitev, ki ponuja RESTful API za spomin

**Konfiguracija:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Osnovni URL zalednega API-ja
  apiKey?: string;           // Žeton Bearer za avtentikacijo
  headers?: Record<string, string>;  // Glave HTTP po meri
  timeout?: number;          // Časovna omejitev zahteve (privzeto: 30000ms)
  backendType?: string;      // Za beleženje dnevnika

  // Preglasitve končnih točk (privzete vrednosti uporabljajo konvencije REST)
  endpoints?: {
    search?: string;   // privzeto: "/memories/search"
    create?: string;   // privzeto: "/memories"
    list?: string;     // privzeto: "/memories"
    get?: string;      // privzeto: "/memories/{id}"
    update?: string;   // privzeto: "/memories/{id}"
    delete?: string;   // privzeto: "/memories/{id}"
    health?: string;   // privzeto: "/health"
  };

  // Preslikave imen parametrov poizvedbe
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Preslikave imen parametrov poti
  pathParams?: {
    id?/memoryId?
  };
}
```

**Znana zaledja** so vnaprej konfigurirana v `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend, usmerjen na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend, usmerjen na api.notion.com/v1
```

#### Vgrajena zaledja

##### SQLiteBackend (`sqliteBackend.ts`)

Privzeto primarno zaledje. Ovija obstoječo shrambo pomnilnika, ki temelji na SQLite in uporablja `src/lib/memory/store.ts`. Samodejno se registrira ob zagonu.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Ovija obstoječo integracijo Obsidian (`src/lib/memory/obsidianBackend.ts`). Z uporabo lokalnega API-ja REST za Obsidian se poveže s shrambo Obsidian.

### Nastavitve

Nastavitve zaledja pomnilnika so shranjene v tabeli nastavitev aplikacije in se upravljajo prek `src/lib/memory/settings.ts`:

| Nastavitev            | Ključ okolja/konfiguracije | Privzeto   | Opis                                           |
| --------------------- | -------------------------- | ---------- | ---------------------------------------------- |
| Primarno zaledje      | `memoryPrimaryBackend`     | `"sqlite"` | ID primarnega zaledja                          |
| Rezervna zaledja      | `memoryFallbackBackends`   | `[]`       | Urejen seznam ID-jev rezervnih zaledij         |
| Konfiguracije zaledij | `memoryBackendConfigs`     | `{}`       | Preglasitve konfiguracije za posamezno zaledje |

Nastavitve se normalizirajo prek `normalizeMemorySettings()` in predpomnijo v `getMemorySettings()`.

### Potek inicializacije

```
Zagon aplikacije
  → uvozi v index.ts (stranski učinek): registrirajo SQLiteBackend
  → initMemoryBackends() se pokliče iz življenjskega cikla aplikacije:
      1. Naloži nastavitve (getMemorySettings)
      2. Konfigurira primarno in rezervna zaledja
      3. Inicializira vsa zaledja (preverjanje stanja)
      4. Pripravljeno za zahteve
```

### Dodajanje novega zaledja

1. **Implementirajte vmesnik `MemoryBackend`** v `src/lib/memory/<name>Backend.ts`
2. **Izvozite** iz `src/lib/memory/index.ts`
3. **Registrirajte** z `memoryManager.register(yourBackend)` ob zagonu
4. **Konfigurirajte** prek nastavitev: nastavite `memoryPrimaryBackend` na ID svojega zaledja
5. **Preizkusite** z uporabo `src/lib/memory/__tests__/generic-backend.test.ts` kot referenco

#### Primer: zaledje Brain

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

### Preverjanje

#### Testi enot

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Pričakovani rezultat: **35 testov, vsi uspešni**, ki pokrivajo:

- Konstruktor (2)
- Preverjanje stanja (4) — uspeh, napaka 500, omrežna napaka, zakasnitev
- Inicializacija (2) — uspeh, neuspeh
- Ustvarjanje (2) — privzeta končna točka, končna točka po meri
- Pridobivanje (4) — uspeh, 404 → null, izjema za kode, ki niso 404, parametri poti po meri
- Posodabljanje (2) — uspeh, 404 → false
- Brisanje (2) — uspeh, 404 → false
- Izpis seznama (2) — parametri poizvedbe, imena parametrov po meri
- Iskanje (3) — parametri poizvedbe, končna točka po meri, serializacija možnosti
- Glave za avtentikacijo (2) — žeton Bearer, glave po meri
- Tovarna (1)

#### Preverjanje tipov

```bash
npm run typecheck:core
```

Pričakovano: **0 napak**.
