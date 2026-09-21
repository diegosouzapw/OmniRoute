# Memory System (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Totuuden lähde:** `src/lib/memory/` ja `src/app/api/memory/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40 (oletusarvoisesti pois käytöstä + int8-kvantisoinnin päivitys)

OmniRoute tarjoaa pysyvän keskustelumuistin, joka on sidottu API-avaimeen (ja
valinnaisesti istuntotunnukseen). Muistot poimitaan automaattisesti LLM-vastauksista
kevyellä regex-hahmontunnistuksella ja lisätään takaisin myöhempiin
pyyntöihin ensimmäisenä järjestelmäviestinä (tai ensimmäisenä käyttäjäviestinä
palveluntarjoajille, jotka eivät hyväksy järjestelmäroolia).

> **Muisti on oletusarvoisesti POIS käytöstä (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` on
> nyt `false` (`src/lib/memory/settings.ts`). Muistin käyttöönotto lisää enintään
> `maxTokens` (~2k) haettua kontekstia **jokaiseen** chat-pyyntöön, mistä
> laskutetaan — tämä voi aiheuttaa odottamattomia kustannuksia uusissa asennuksissa ja asiakkaille, jotka hallitsevat
> omaa kontekstiaan. Ota ominaisuus erikseen käyttöön kohdassa **Asetukset → Muisti** (`MemorySkillsTab`
> näyttää varoituksen token-kustannuksista, kun muisti on käytössä).
> Asiakas voi poistaa muistin käytöstä yksittäisessä pyynnössä
> `x-omniroute-no-memory`-pyyntöotsakkeella (`true`/`1`/`yes`) — katso pyyntöotsakkeiden taulukko
> tiedostosta [API_REFERENCE.md](../reference/API_REFERENCE.md). Muistittomassa pyynnössä
> asetetaan `memoryOwnerId = null`, mikä poistaa käytöstä **sekä** muistin että taitojen lisäämisen
> kyseisessä pyynnössä (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Muisti on **rajattu API-avainkohtaisesti**, ei käyttäjäkohtaisesti — kaikki samalla
API-avaimella todennetut pyynnöt käyttävät samaa muistivarantoa, jota voidaan lisäksi
rajata valinnaisesti `sessionId`-arvolla.

## Arkkitehtuuri

```
Asiakas → /v1/chat/completions (apiKeyInfo selvitetään aiemmin)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # poimii tunnuksen
    → getMemorySettings()                     # välimuistiin tallennetut asetukset
    → shouldInjectMemory(body, {enabled})     # käyttöehto
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + valinnainen vektori
    → injectMemory(body, memories, provider)  # järjestelmä- tai käyttäjäviesti
  → kutsu ylemmän tason palveluntarjoajalle
  → vastauksen yhteydessä: extractFacts(text, apiKeyId, sessionId)  # estämätön
    → setImmediate → createMemory(fact) jokaiselle osumalle
                   → embed(content) + upsertVector(id, vec)
```

Lisäys- ja poimintakutsukohdat on yhdistetty tiedostossa
`open-sse/handlers/chatCore.ts` (etsi kohtia `retrieveMemories`, `injectMemory`
ja `extractFacts`).

## Moottorin arkkitehtuuri (3-tasoinen valinta)

Muistimoottori valitsee hakupolun suorituksen aikana käytettävissä olevan
infrastruktuurin ja asetusten perusteella. Käytössä on kolme tasoa, joita sovelletaan
prioriteettijärjestyksessä:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TASO 0 — Avainsana (FTS5)                                  │
  │  Saatavuus määräytyy tarkistuksen perusteella: FTS5, kun     │
  │  SQLite-koontiversio tukee sitä (better-sqlite3 /            │
  │  node:sqlite / bun:sqlite); ei käytettävissä ilman FTS5:tä   │
  │  olevissa koontiversioissa (esim. sql.js/WASM —              │
  │  "no such module: fts5"). Käytetään, kun strategy = "exact", │
  │  tai varavaihtoehtona; engine-status-arvon keyword kuvastaa  │
  │  tarkistuksen tulosta.                                       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TASO 1 — Upotettu vektori (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 ladataan db.loadExtension()-kutsulla.     │
  │  KNN-raaka-arvohaku Float32-vektoreista. Aktiivinen, kun:    │
  │   • sqlite-vec loadExtension onnistuu                        │
  │   • Saatavilla on upotuslähde (remote | static |             │
  │     transformers), joka voi tuottaa Float32Array-arvon       │
  │   • vec_memories-taulu on olemassa (luodaan ensimmäisen      │
  │     ready()-kutsun yhteydessä)                               │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TASO 2 — Qdrant (valinnainen ulkoinen vektoritietokanta)    │
  │  Kun käytössä, korvaa sqlite-vecin semanttisessa ja           │
  │  hybridihakustrategiassa. Edellyttää käynnissä olevaa        │
  │  Qdrant-instanssia sekä määritettyä isäntää ja porttia.      │
  └─────────────────────────────────────────────────────────────┘
```

Heikentyminen tapahtuu automaattisesti ja läpinäkyvästi:

- Jos sqlite-vecin lataaminen epäonnistuu, taso 1 ei ole käytettävissä → käytetään tason 0 varavaihtoehtoa.
- Jos upotuslähde palauttaa virheen, taso 1 käyttää tason 0 varavaihtoehtoa.
- Jos Qdrant ei ole toimintakuntoinen, taso 2 käyttää tason 1 varavaihtoehtoa (tai tasoa 0, jos myöskään taso 1
  ei ole käytettävissä).

## Upotuslähteet

Upotuskerros (`src/lib/memory/embedding/`) ratkaisee käytettävän lähteen
`MemorySettingsExtended.embeddingSource`-arvon perusteella:

| Lähde          | Kuvaus                                                                                              | Avain vaaditaan | Kylmäkäynnistys  |
| -------------- | --------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| `remote`       | Käyttää määritetyn palveluntarjoajan upotusrajapintaa (OpenAI, Cohere jne.)                         | Kyllä           | Ei viivettä      |
| `static`       | Paikallinen hakutaulukkoon perustuva upotus `potion-base-8M`-mallilla (WordPiece + keskiarvokoonti) | Ei              | ~200ms           |
| `transformers` | Paikallinen ONNX-päättely `@huggingface/transformers` v4:n kautta, `all-MiniLM-L6-v2`               | Ei              | ~3s + ~400MB RAM |
| `auto`         | Ajonaikainen ratkaisu: remote (jos avain on olemassa) → static → transformers → null                | Riippuu         | Riippuu          |

**Ratkaisujärjestys lähteelle `auto`:**

1. Etsi `listEmbeddingProviders()`-palautusarvosta ensimmäinen palveluntarjoaja, jolla `hasKey === true` → `remote`.
2. Jos `settings.staticEnabled === true` → `static`.
3. Jos `settings.transformersEnabled === true` → `transformers`.
4. Muussa tapauksessa → `null` (varajärjestelmänä käytetään FTS5-avainsanahakua).

Upotusvälimuisti (`src/lib/memory/embedding/cache.ts`) käyttää muistissa olevaa
LRU-karttaa, jonka avain on `${source}:${model}:${dim}:${sha256(text)}`. Kartan
enimmäiskoko on `MEMORY_EMBEDDING_CACHE_MAX` merkintää (oletusarvo 1000), ja
merkintöjen elinaika on `MEMORY_EMBEDDING_CACHE_TTL_MS` (oletusarvo 5 min).
Välimuisti jaetaan kaikkien kutsujien kesken prosessin elinkaaren ajan.

## Hybridi-RRF (k=60)

Kun `strategy = "hybrid"` ja vektorivarasto on käytettävissä, haku yhdistää
FTS5- ja vektoritulokset Reciprocal Rank Fusion -menetelmällä:

```
RRF(d) = Σ  1 / (k + rank_i(d))      missä k = 60 (määritettävissä muuttujalla MEMORY_RRF_K)
          i
```

Käytännössä:

1. Suorita FTS5-haku → järjestetty luettelo `R_fts` (sijat 1..N).
2. Suorita KNN-vektorihaku → järjestetty luettelo `R_vec` (sijat 1..M).
3. Jokaiselle yksilölliselle `memoryId`-arvolle:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, jos ei ole luettelossa).
4. Järjestä `rrf_score`-arvon mukaan laskevasti ja käy tulokset läpi token-budjetin rajoissa.

RRF:n tiedetään olevan tehokas ilman heterogeenisten hakujärjestelmien
pisteiden normalisointia. Oletusarvo `k=60` on peräisin Cormackin et al.
alkuperäisestä artikkelista ja toimii hyvin pienissä korpuksissa (<10k muistia).

## Täydennys (laiska + uudelleenindeksointi)

Kun upotusmalli muuttuu (`embedding_signature`-arvon perusteella havaittuna),
vektorivarasto rakennetaan uudelleen ja kaikki olemassa olevat muistit merkitään
`needs_reindex = 1` `memories`-taulussa.

**Laiska täydennys**: Seuraavan haun yhteydessä kaikki muistit, joilta puuttuu
vektorimerkintä, upotetaan ja lisätään `vec_memories`-tauluun ennen haun
suorittamista. Tämä jakaa täydennyksen kustannukset todellisten pyyntöjen
kesken käynnistystä estämättä.

**Eksplisiittinen uudelleenindeksointi**: `/dashboard/memory`-sivun Engine-välilehdellä
on "Indeksoi uudelleen nyt" -painike, joka kutsuu `POST /api/memory/reindex`.
Käsittelijä kutsuu `runReindexBatch()`-funktiota tiedostosta
`src/lib/memory/reindex.ts`, joka käsittelee enintään `limit` odottavaa merkintää
pyyntöä kohden. Edistymistä voidaan seurata kyselyllä
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

`memory_vec_meta`-taulu (migraatio `083_memory_vec.sql`) tallentaa seuraavat tiedot:

- `active_dim` — nykyinen vektorin ulottuvuus (null = ei vielä kalibroitu).
- `embedding_signature` — `${source}:${model}:${dim}`, jota käytetään muutosten havaitsemiseen.
- `last_reset_at` — viimeisimmän täydellisen nollauksen aikaleima.
- `vec_loaded` — 0/1-ilmaisin sille, latautuiko sqlite-vec onnistuneesti.

## Asetusten laajennus

`MemorySettingsExtended` sisältää yhdeksän upotus- ja vektorikenttää tiedostossa
`src/shared/schemas/memory.ts`, ja ne tallennetaan tiedoston `src/lib/db/settings.ts` kautta:

| Kenttä                   | Tyyppi                                             | Oletusarvo | Kuvaus                                                                |
| ------------------------ | -------------------------------------------------- | ---------- | --------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`   | Käytettävä upotuslähde                                                |
| `embeddingProviderModel` | `string \| null`                                   | `null`     | Palveluntarjoaja/malli muodossa `provider/model`                      |
| `customBaseUrl`          | `string \| null`                                   | `null`     | Vain Memoryn käyttämän OpenAI-yhteensopivan päätepisteen perus-URL    |
| `customModelId`          | `string \| null`                                   | `null`     | Mukautettuun päätepisteeseen lähetettävä mallitunnus                  |
| `transformersEnabled`    | `boolean`                                          | `false`    | Transformers.js:n käyttöönotto (MiniLM, ~400MB)                       |
| `staticEnabled`          | `boolean`                                          | `false`    | Paikallisen staattisen potion-base-8M-mallin käyttöönotto             |
| `rerankEnabled`          | `boolean`                                          | `false`    | Ota uudelleenjärjestelyvaihe käyttöön (lisää +200-500ms/pyyntö)       |
| `rerankProviderModel`    | `string \| null`                                   | `null`     | Uudelleenjärjestelyn palveluntarjoaja/malli muodossa `provider/model` |

`rerankProviderModel` ratkaistaan kutsulla `POST /v1/rerank` (joka tehdään takaisinkytkentäyhteyden kautta), joten se hyväksyy kaiken, minkä kyseinen reitti hyväksyy: kuratoidun pilvipohjaisen uudelleenjärjestelymallin (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) tai OpenAI-yhteensopivan palveluntarjoajasolmun muodossa `<node-prefix>/<model>` (esim. `skilled-mini/bge-reranker-v2-m3` TEI/Infinity-palvelimelle). Takaisinkytkentäsolmut ovat aina kelvollisia; toisella isäntäkoneella (LAN, Tailscale) sijaitseva solmu edellyttää lisäksi `RERANK_REMOTE_PROVIDER_NODES`-ominaisuuslippua, ja sen on läpäistävä palveluntarjoajan lähtevien URL-osoitteiden käytäntö — katso [Ominaisuusliput](../reference/FEATURE_FLAGS.md). Hallintapaneelin valitsin luettelee kuratoidut palveluntarjoajat sekä paikalliset solmut; mikä tahansa kelvollinen `provider/model`-merkkijono voidaan asettaa suoraan kutsulla `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Käytettävä vektoritaustajärjestelmä |

Nämä ovat käytettävissä rajapinnan `GET /PUT /api/settings/memory` kautta (skeema `MemorySettingsExtendedSchema`).

`remote`-lähdettä käytettäessä Memory hyväksyy myös valinnaiset `customBaseUrl`- ja
`customModelId`-asetukset. Yhdessä ne valitsevat OpenAI-yhteensopivan `/embeddings`-
päätepisteen ja mallin muuttamatta yleistä upotusrekisteriä. Päätepiste normalisoidaan
ennen käyttöä ja tarkistetaan palveluntarjoajan lähtevien URL-osoitteiden käytännön mukaisesti: HTTP(S)
vaaditaan, upotetut tunnistetiedot ja kyselymerkkijonot hylätään, ja pilvipalvelujen metatieto-
osoitteet pysyvät estettyinä. Tyhjät arvot säilyttävät valitun rekisterin palveluntarjoajan. Hallintapaneelille
palautettavat virheet puhdistetaan, eikä päätepisteen tunnistetietoja koskaan kirjata lokiin.

> **TODO (D20):** `global`-laajuutta (muistojen jakaminen kaikkien API-avainten kesken) ei ole
> toteutettu tässä julkaisussa. Se edellyttää skeemamuutoksia ja yleistä hakupolkua.
> Seurattava erikseen.

## Tallennuskerrokset

### Ensisijainen: SQLite (`memories`-taulu)

Luodaan migraatiolla `015_create_memories.sql`:

| Sarake                      | Tyyppi             | Huomautukset                                                                              |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | Funktiolla `crypto.randomUUID()` luotu UUID                                               |
| `api_key_id`                | `TEXT NOT NULL`    | Omistava API-avain                                                                        |
| `session_id`                | `TEXT`             | Valinnainen keskustelukohtainen laajuus                                                   |
| `type`                      | `TEXT NOT NULL`    | Yksi arvoista `factual`, `episodic`, `procedural`, `semantic`                             |
| `key`                       | `TEXT`             | Vakaa upsert-avain, esim. `preference:i_prefer_python`                                    |
| `content`                   | `TEXT NOT NULL`    | Varsinainen faktateksti                                                                   |
| `metadata`                  | `TEXT`             | JSON-objekti (category, extractedAt, source, ...)                                         |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 -merkkijonot                                                                     |
| `expires_at`                | `TEXT`             | Valinnainen vanhenemisaika; `NULL` tarkoittaa pysyvää                                     |
| `memory_id`                 | `INTEGER UNIQUE`   | Lisätty tiedostossa `023_fix_memory_fts_uuid.sql` yhdistämään UUID:t ↔ FTS5-rivitunnukset |

Indeksit: `api_key_id`, `session_id`, `type`, `expires_at` sekä yksilöllinen
`memory_id`-indeksi.

**Upsert-semanttiikka**: `createMemory()` etsii olemassa olevan rivin, jolla on sama
`(api_key_id, key)`, ja päivittää sen paikallaan, jos sellainen löytyy (yhdistäen `metadata`-tiedot
pinnallisella levityksellä). Tämä estää taulua kasvamasta rajattomasti toistuvien
mieltymyslauseiden vuoksi.

### Kokotekstihaku (`memory_fts`-virtuaalitaulu)

`022_add_memory_fts5.sql` luo FTS5-virtuaalitaulun kentille `content` ja
`key`. `023_fix_memory_fts_uuid.sql` korjaa käytännössä havaitun virheen, jossa UUID-
pääavain ei liittynyt FTS5:n kokonaislukumuotoiseen rivitunnukseen — migraatio lisää
`memory_id`-sarakkeen, luo FTS-taulun uudelleen ja määrittää triggerit
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), jotka pitävät FTS:n synkronoituna
INSERT-, DELETE- ja UPDATE-operaatioissa.

Tiedosto `retrieval.ts` käyttää tätä `semantic`- ja `hybrid`-strategioissa (katso alta).
Hakukoodi tekee suojatarkistuksen funktiolla `hasTable("memory_fts")` ja palaa
kronologiseen järjestykseen, jos FTS-taulu puuttuu tai FTS-kysely aiheuttaa virheen.

### Valinnainen: Qdrant (vektorivaraston taso 2)

`src/lib/memory/qdrant.ts` toteuttaa valinnaisen Qdrant-integraation tason 2
vektorivarastona. Haku ohjataan Qdrantiin vain, kun moottorin valitsin
`memoryVectorStore === "qdrant"` — oletusarvo `"auto"` (ja `"sqlite-vec"`)
**ei koskaan** valitse Qdrantia. Engine-välilehden valitsin asettaa **sekä** `qdrantEnabled`- että
`memoryVectorStore`-arvon yhdessä: käyttöönotto tekee Qdrantista ensisijaisen varaston, ja käytöstäpoisto
palauttaa arvoksi `"auto"` (#5597 — ennen tätä korjausta käyttöönotolla ei ollut vaikutusta, koska mikään
ei kirjoittanut moottorin valitsinta). Jos Qdrant ei ole tavoitettavissa tai ei palauta mitään, haku
palaa ketjussa sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — upottaa arvon `key + content` määritetyllä
  upotusmallilla, varmistaa, että kokoelma on olemassa (luo kosinietäisyyttä
  käyttävät vektorit ensimmäisellä käyttökerralla), ja lisää tai päivittää pisteen,
  jonka hyötykuorma on `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — upottaa kyselyn ja hakee
  kokoelmasta suodattaen ehdolla `kind = "omniroute_memory"` sekä valinnaisesti
  arvoilla `apiKeyId` / `sessionId`. Rajaa arvon `topK` välille `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — poistaa yksittäisen pisteen. Funktio
  `deleteMemory()` kutsuu tätä SQLite-rivin poistamisen jälkeen (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — poistaa joukkona pisteet, joiden
  `expiresAtUnix` on menneisyydessä tai joiden `createdAtUnix` on säilytysajan
  rajaa vanhempi. Laskee pisteet ensin, jotta hallintapaneeli voi näyttää todelliset määrät.
- `checkQdrantHealth()` — `GET /readyz` -toimintakuntotarkistus viiveellä.

Asetuskäyttöliittymä sisältää Qdrant-määritykset, toimintakuntotarkistuksen,
semanttisen haun testin ja puhdistuksen `/dashboard/memory`-sivun
**Engine-välilehdellä**. Vastaavat reitit hakemistossa
`src/app/api/settings/qdrant/` on kaikki kytketty käyttöön versiosta v3.8.6 lähtien:

| Reitti                                  | Menetelmä     | Kuvaus                                     |
| --------------------------------------- | ------------- | ------------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Lue/päivitä Qdrant-asetukset               |
| `/api/settings/qdrant/health`           | `GET`         | Elossaolotarkistus ja viive                |
| `/api/settings/qdrant/search`           | `POST`        | Semanttisen haun testi                     |
| `/api/settings/qdrant/cleanup`          | `POST`        | Poista vanhentuneet/vanhat pisteet         |
| `/api/settings/qdrant/embedding-models` | `GET`         | Luettele käytettävissä olevat upotusmallit |

**Toimintaa koskevat huomautukset (mitä on odotettavissa):**

- **Moottorin valinta** — Qdrantin käyttöönotto Engine-välilehdellä tekee siitä
  ensisijaisen tallennusratkaisun (asettaa arvoksi `memoryVectorStore="qdrant"`);
  käytöstä poistaminen palauttaa arvon `"auto"` (#5597).
- **Ei jälkikäteistä täyttöä** — vain Qdrantin käyttöönoton **jälkeen** luodut tai
  päivitetyt muistit kirjoitetaan siihen (odottamaton kaksoiskirjoitus).
  Aiemmin luotuja SQLite-muisteja **ei** siirretä; "Reindex Now" muodostaa uudelleen
  vain sqlite-vec-indeksin, ei Qdrantia.
- **Vektorin ulottuvuus tunnistetaan automaattisesti** varsinaisesta upotuksesta
  ensimmäisellä käyttökerralla — täytettävää ulottuvuuskenttää ei ole. Upotusmallin
  vaihtamista kokoelman luomisen jälkeen **ei** käsitellä automaattisesti: olemassa
  oleva kokoelma jätetään ennalleen, ulottuvuudeltaan yhteensopimattomat
  kirjoitukset ja haut epäonnistuvat ja vararatkaisuna käytetään sqlite-veciä.
  Luo kokoelma uudelleen (uudella nimellä tai poistamalla se Qdrantista), jotta
  voit vaihtaa upotusmallia.
- **Etäisyysmetriikka** — aina **kosini** (kovakoodattu kokoelman luonnin yhteydessä;
  ei määritettävissä).
- **Todennus** — vain API-avain (lähetetään `api-key`-otsakkeessa; valinnainen
  todentamattomalle paikalliselle Dockerille). JWT:tä/RBAC:ia ei käytetä.
- **Määrityskentät** — käyttöliittymässä ovat `host`, `port`, `collection`,
  `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` ovat käytettävissä
  vain ympäristömuuttujien/tietokannan kautta, eikä arvoa `vectorSize` käytetä
  kokoelman luontiin (ulottuvuus saadaan upotuksesta).

### Vektorikvantisointi (int8 — valinnainen, molemmat taustajärjestelmät)

Molemmat vektoritaustajärjestelmät tukevat **valinnaista int8-kvantisointia**,
joka pienentää tallennettujen vektorien muistijalanjälkeä (noin 4× pienempi kuin
Float32) hieman hakutarkkuuden kustannuksella. Oletusarvoisesti se on **poissa
käytöstä** molemmissa — vektorit säilyttävät täyden tarkkuuden, ellei
kvantisointia oteta erikseen käyttöön.

| Taustajärjestelmä | Asetus                                        | Tyyppi                         | Oletusarvo | Lukupaikka                                                  |
| ----------------- | --------------------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant            | `qdrantQuantization` (DB-avain)               | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec        | `MEMORY_VEC_QUANTIZATION` (ympäristömuuttuja) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** määritetään instanssikohtaisesti `qdrantQuantization`-asetusavaimella
  (näkyy `quantization`-kenttänä reitissä `PUT /api/settings/qdrant`). Kun arvona
  on `"int8"`, `buildQuantizationConfig()` pyytää skalaarista kvantisointia
  (`always_ram`, kvantiili `0.99`), ja haut ottavat käyttöön asetuksen
  `rescore: true`, jotta täyden tarkkuuden vektorit tarkentavat int8-ehdokasjoukkoa.
- **sqlite-vec**-kvantisointi määritetään **vain ympäristömuuttujalla** (ei
  tietokanta-asetuksella): aseta `MEMORY_VEC_QUANTIZATION=int8`, jotta paikalliset
  vektorit tallennetaan `int8[dim]`-sarakkeeseen funktion
  `vec_quantize_int8(?, 'unit')` avulla. Valittu tila sisällytetään
  `embedding_signature`-arvoon (`:int8`-jälkiliitteenä), joten tilan vaihtaminen
  käynnistää `vec_memories`-taulun täydellisen uudelleenindeksoinnin — samaa
  laiskaa jälkitäyttöpolkua käytetään upotusmallin vaihtuessa.

## Muistityypit

`MemoryType` (`src/lib/memory/types.ts`):

| Tyyppi       | Käyttötarkoitus                                                                    |
| ------------ | ---------------------------------------------------------------------------------- |
| `factual`    | Mieltymykset, pysyvät käyttäjätiedot, käyttäytymismallit                           |
| `episodic`   | Tiettyyn hetkeen liittyvät päätökset ("Valitsin Postgresin")                       |
| `procedural` | Työnkulku-/toimintaohjemuisti (varattu; ei automaattista poimintaa tällä hetkellä) |
| `semantic`   | Varattu vektorivaraston merkinnöille                                               |

`MemoryConfig`-hakustrategia on jokin arvoista `exact`, `semantic` tai `hybrid`,
ja laajuus on jokin arvoista `session`, `apiKey` tai `global`. Funktion
`getMemorySettings()` oletuslaajuus on `apiKey`.

## Faktojen poiminta (`extraction.ts`)

Poiminta on **säännöllisiin lausekkeisiin perustuvaa**, ei LLM-pohjaista — se suoritetaan prosessin sisällä
`setImmediate()`-funktion avulla, joten se ei koskaan estä vastausvirtaa:

- **Mieltymysmallit** → `MemoryType.FACTUAL`
  (esim. `Pidän enemmän …`, `Pidän todella paljon …`, `suosikkini on …`, `Vihaan …`)
- **Päätösmallit** → `MemoryType.EPISODIC`
  (esim. `Käytän …`, `Valitsin …`, `Päädyin …`, `Aion ottaa käyttöön …`)
- **Toimintamallit** → `MemoryType.FACTUAL`
  (esim. `Yleensä …`, `Aina …`, `Minulla on tapana …`)

Jokainen osuma siistitään (`trim`, välilyöntien yhdistäminen, enimmäispituus 500 merkkiä),
kaksoiskappaleet poistetaan erän sisällä vakaan `factKey(category, content)`-avaimen avulla, ja
osuma tallennetaan `createMemory()`-funktiolla metatiedoilla
`{category, extractedAt, source: "llm_response"}`. Syöteteksi on rajattu
64 KiB:iin (`MAX_EXTRACTION_TEXT_LENGTH`) — kun teksti on pidempi, käytetään tekstin
**loppuosaa**, jotta avustajan uusin sisältö otetaan aina huomioon.

`extractFactsFromText(text)` viedään testejä varten ja palauttaa jäsennellyt
faktat tallentamatta niitä.

## Haku (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` on ensisijainen aloituspiste. Se:

1. Normalisoi ja validoi määritykset `MemoryConfigSchema`-skeeman avulla.
2. Palauttaa välittömästi `[]`, kun `enabled` on false tai `maxTokens <= 0`.
3. Rajaa `maxTokens`-arvon välille `[1, 8000]`.
4. Tunnistaa, onko nykyaikainen `memories`-taulu olemassa (vanhan `memory`-taulun sijaan), jotta
   vanhemmat tietokannat toimivat edelleen.
5. Muodostaa peruskyselyn vanhenemisehdolla
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), valinnaisella
   istuntolaajuudella ja valinnaisella `retentionDays`-raja-arvolla.
6. Haarautuu strategian mukaan:
   - **`exact`** (oletus): aikajärjestys `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jos `config.query` ja `memory_fts` ovat olemassa, suoritetaan JOIN
     `memory_fts MATCH ?` ja järjestetään FTS-sijoituksen mukaan; jos FTS palauttaa 0 riviä,
     palataan aikajärjestykseen.
   - **`hybrid`**: FTS-tulosten (suurempi relevanssi) ja aikajärjestetyn
     joukon yhdiste, josta poistetaan kaksoiskappaleet tunnuksen perusteella.
7. Laskee avainsanoihin perustuvan relevanssipisteytyksen (`getRelevanceScore`) kentille
   `content`, `key` ja `metadata` JSON, kun kysely on annettu. Rivit, joiden
   pistemäärä on nolla, suodatetaan pois.
8. Lajittelee ensin laskevan pistemäärän ja sitten laskevan `createdAt`-arvon mukaan.
9. Käy järjestetyn luettelon läpi ja hyväksyy merkintöjä niin kauan kuin kumulatiivinen
   `estimateTokens(content)` (≈ `length / 4`) pysyy budjetin rajoissa. Palauttaa aina
   vähintään yhden merkinnän, jos osumia on.

`estimateTokens` viedään ja sitä käyttävät haku, tiivistäminen sekä MCP:n
`omniroute_memory_search`-työkalu.

## Injektio (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Yhdistää kaikkien muistien sisällöt yhdeksi `Memory context: …` -merkkijonoksi.
2. Valitsee strategian palveluntarjoajan nimen perusteella:
   - **Järjestelmäviesti** (oletus OpenAI:lle, Anthropicille, Geminille, …) — lisää
     `{role: "system", content: memoryText}` -objektin ennen olemassa olevia
     järjestelmäviestejä, jotta käyttäjän järjestelmäkehotteet ovat edelleen etusijalla.
   - **Käyttäjäviesti** (varavaihtoehto) — palveluntarjoajille, jotka ovat luettelossa
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Nämä hylkäävät järjestelmäroolin
     ja palauttaisivat muuten 400-virheen (ks. GLM/Zhipua koskeva ongelma #1701).
3. Kirjaa määrän, strategian ja mallin tapahtumana `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` viedään niiden kutsujien käyttöön, joiden
täytyy tehdä omia reitityspäätöksiään. Tuntemattomille palveluntarjoajille oletusarvo
on turvallisuussyistä `true` (järjestelmärooli sallittu).

## Asetukset (`settings.ts`)

Muistimääritykset **tallennetaan tietokannan asetustauluun**, eivätkä ne ole
ympäristömuuttujissa. `getMemorySettings()` lukee asetukset funktiolla `getSettings()`
ja tallentaa tuloksen prosessikohtaiseen välimuistiin; asetusten PUT-reitti kutsuu
kirjoitusten jälkeen funktiota `invalidateMemorySettingsCache()`.

### Vanhat kentät (kaikki versiot)

| Tietokanta-avain      | Tyyppi  | Oletusarvo                                                   | Käyttöliittymän säädin                                                            |
| --------------------- | ------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (oletuksena pois käytöstä versiosta v3.8.30 lähtien) | Muisti käytössä / pois käytöstä                                                   |
| `memoryMaxTokens`     | integer | `2000` (alue `0–16000`)                                      | Injektion token-budjetti                                                          |
| `memoryRetentionDays` | integer | `30` (alue `1–365`)                                          | Säilytysaika                                                                      |
| `memoryStrategy`      | enum    | `"hybrid"` (jokin arvoista `recent`, `semantic`, `hybrid`)   | Hakustrategia                                                                     |
| `skillsEnabled`       | boolean | `false`                                                      | Ottaa käyttöön tai poistaa käytöstä avainkohtaisen taitoinjektion (ks. SKILLS.md) |

Huomautus: käyttöliittymän strategia `"recent"` yhdistetään sisäiseen
`"exact"`-hakustrategiaan funktiolla `toMemoryRetrievalConfig()` (kronologinen järjestys).

### Uudet kentät (v3.8.6, suunnitelma 21 D9)

Katso kenttien kuvaukset myös yllä olevasta osiosta "Asetusten laajennus".

| Tietokanta-avain            | API-kenttä               | Oletusarvo |
| --------------------------- | ------------------------ | ---------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`   |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`     |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`    |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`    |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`    |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`     |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`   |

Qdrantiin liittyvät tietokanta-avaimet (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection`, jonka oletusarvo on `"omniroute_memory"`,
ja `qdrantEmbeddingModel`, jonka oletusarvo on `"openai/text-embedding-3-small"`)
luetaan `qdrant.ts`-tiedoston funktiolla `normalizeQdrantConfig()`.

### Ympäristömuuttujat (v3.8.6)

Kuudella valinnaisella ympäristömuuttujalla voidaan säätää moottorin suorituksenaikaista toimintaa (dokumentoitu tiedostossa `.env.example`):

| Muuttuja                        | Oletusarvo                 | Kuvaus                                                                                                                                                                        |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Upotusvälimuistin elinaika (5 min)                                                                                                                                            |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Upotusten LRU-välimuistin merkintöjen enimmäismäärä                                                                                                                           |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js-mallin HF-tietovarasto                                                                                                                                        |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Staattisen potion-mallin HF-tietovarasto                                                                                                                                      |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Ladattujen mallien tallennuspaikka                                                                                                                                            |
| `MEMORY_VEC_TOP_K`              | `20`                       | Vektorihaun oletusarvoinen top-K                                                                                                                                              |
| `MEMORY_RRF_K`                  | `60`                       | RRF:n k-vakio hybridihakua varten                                                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Aseta arvoksi `int8`, jos haluat tallentaa paikalliset sqlite-vec-vektorit kvantisoituina (noin 4× pienempiä; valinnainen). Tilan vaihtaminen pakottaa uudelleenindeksoinnin. |

## Yhteenveto (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` tiivistää vanhempaa
sisältöä, kun avaimen muistien juokseva tunnistemäärä ylittää
budjetin. Se käy rivit läpi `created_at`-kentän mukaan laskevassa järjestyksessä, säilyttää
budjettiin mahtuvat rivit ja korvaa muiden rivien `content`-kentän
alkuperäisen sisällön kolmella ensimmäisellä virkkeellä. `tokensSaved` on vanhan ja
uuden sisällön `estimateTokens`-arvojen erotus.

Tämä toiminto on **käytettävissä, mutta sitä ei kutsuta automaattisesti** nykyisessä
keskusteluputkessa — kutsu sitä cron-ajosta, ylläpitotoiminnosta tai
`MemoryConfig.autoSummarize`-liitännästä, jos tarvitset jatkuvaa tiivistämistä. Tietojen
menetys on yksisuuntaista: alkuperäinen teksti korvataan.

## REST API

Kaikki päätepisteet edellyttävät hallinnan todennusta (`requireManagementAuth`).

### Muistin keskeiset päätepisteet (nykyiset + päivitetyt)

| Menetelmä | Polku                | Kuvaus                                                                                                                                                                                                                       |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`     | `/api/memory`        | Sivutettu luettelo suodattimilla: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Vastaus sisältää kentät `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                                  |
| `POST`    | `/api/memory`        | Luo tietueen (Zod-validoidut kentät: `content`, `key`, valinnaiset `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Kutsuu `createMemory()`-funktiota, joka tekee upsert-operaation avainparilla `(apiKeyId, key)` |
| `GET`     | `/api/memory/[id]`   | Hakee yksittäisen tietueen UUID-tunnisteella                                                                                                                                                                                 |
| `PUT`     | `/api/memory/[id]`   | Päivittää tietueen kentät (`type`, `key`, `content`, `metadata`). Runko: `MemoryUpdatePutSchema`. Synkronoi myös vektorin, jos upotuksen lähde on käytettävissä.                                                             |
| `DELETE`  | `/api/memory/[id]`   | Poistaa tietueen sekä myös sen `vec_memories`-taulusta (D15) ja mahdollisuuksien mukaan Qdrantista. Palauttaa 404:n, jos tietuetta ei löydy.                                                                                 |
| `GET`     | `/api/memory/health` | Suorittaa `verifyExtractionPipeline("health-check")`-toiminnon — edestakainen luonti→luettelointi→poisto-testi. Palauttaa `{working, latencyMs, error?}`                                                                     |

### Muistimoottorin uudet päätepisteet (suunnitelma 21)

| Menetelmä | Polku                             | Kuvaus                                                                                                                                                                                     |
| --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`    | `/api/memory/retrieve-preview`    | `retrieveMemories`-toiminnon kuivaharjoittelu — palauttaa pisteiden, tason ja tunnistemäärän mukaan järjestetyt tulokset. Runko: `RetrievePreviewSchema`. EI lisää tai muokkaa muisteja.   |
| `GET`     | `/api/memory/embedding-providers` | Luettelee upotusmalleja tarjoavat palveluntarjoajat ja ilmoittaa, mille niistä on määritetty API-avain.                                                                                    |
| `GET`     | `/api/memory/engine-status`       | Palauttaa moottorin täydellisen tilan: avainsanataso, upotuksen määritys, vektorivaraston tilastot, Qdrantin kunto ja uudelleenjärjestelyn määritykset. Muoto: `MemoryEngineStatusSchema`. |
| `POST`    | `/api/memory/summarize`           | Käynnistää muistin tiivistämisen manuaalisesti. Runko: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Palauttaa `{candidates, tokensSaved}`.                            |
| `POST`    | `/api/memory/reindex`             | Käynnistää vektoreiden uudelleenindeksoinnin muisteille, joiden `needs_reindex=1`. Runko: `MemoryReindexSchema` (`force`). Palauttaa `{started, pending}`.                                 |

### Asetusten päätepisteet

| Menetelmä | Polku                                   | Kuvaus                                                                                                        |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `GET`     | `/api/settings/memory`                  | Nykyinen normalisoitu `MemorySettingsExtended` (7 uutta kenttää + vanhat kentät)                              |
| `PUT`     | `/api/settings/memory`                  | Päivittää minkä tahansa `MemorySettingsExtendedSchema`-skeeman kentän (yhteensä 12 kenttää)                   |
| `GET`     | `/api/settings/qdrant`                  | Nykyiset Qdrant-asetukset (`QdrantSettingsSchema`)                                                            |
| `PUT`     | `/api/settings/qdrant`                  | Päivittää Qdrant-asetukset. Runko: `QdrantSettingsUpdateSchema`. `apiKey` = tyhjä merkkijono poistaa avaimen. |
| `GET`     | `/api/settings/qdrant/health`           | Elossaolotarkistus määritettyä Qdrant-instanssia vasten. Palauttaa `QdrantHealthResultSchema`-muodon.         |
| `POST`    | `/api/settings/qdrant/search`           | Semanttisen haun testi Qdrantia vasten. Runko: `QdrantSearchSchema` (`query`, `topK`).                        |
| `POST`    | `/api/settings/qdrant/cleanup`          | Poistaa Qdrantista vanhentuneiden tai vanhojen muistien pisteet.                                              |
| `GET`     | `/api/settings/qdrant/embedding-models` | Luettelee Qdrantille saatavilla olevat upotusmallit.                                                          |

`/api/memory`-luettelokysely tukee joko `page`-pohjaista sivutusta
(`parsePaginationParams`) **tai** suoraa `offset`-arvoa — kun `offset` on annettu, se
on ensisijainen, ja vastauksen muotoa varten lasketaan johdettu `page`-arvo.

## MCP-työkalut (`open-sse/mcp-server/tools/memoryTools.ts`)

Kun MCP-palvelin on käytössä, rekisteröidään kolme muistityökalua:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → toimii `retrieveMemories()`-funktion kääreenä. Versiosta v3.8.6 (D16) alkaen `strategy` luetaan
  `getMemorySettings()`-funktiosta sen sijaan, että arvoksi olisi kovakoodattu `"exact"`. Jos
  `query` on annettu ja `strategy` on `semantic` tai `hybrid`, vektoritietovarastoa
  käytetään, kun se on saatavilla.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → toimii `createMemory()`-funktion kääreenä. Hyväksyy vain neljä kanonista tyyppiä:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → luettelee vastaavat
  tietueet, suodattaa ne valinnaisesti luontia edeltävän aikaleiman perusteella ja poistaa sitten jokaisen
  `deleteMemory()`-funktion avulla (joka poistaa myös vektorit sqlite-vecistä ja Qdrantista).

Katso siirtoa ja käyttöaluetta koskevat tiedot tiedostosta [MCP-SERVER.md](./MCP-SERVER.md).

## Hallintapaneeli (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` on nyt **kolmen välilehden Studio**:

### Välilehti: Muistit

- Konseptikortti (kutistettava "Näin se toimii" -selite).
- Reaaliaikainen luettelo, haku ja sivutus (300 ms:n viiveellä).
- Tyyppisuodatin (`factual` / `episodic` / `procedural` / `semantic` / kaikki).
- Muistin lisäysikkuna (avain, sisältö, tyyppi).
- Muokkaus suoraan rivillä (kynäpainike → `PUT /api/memory/[id]`).
- Poisto riveittäin (vahvistusikkunalla).
- Nykyisen sivun JSON-vienti; JSON-tuonti tiedostovalitsimella.
- Tilastokortit: `totalEntries`, `tokensUsed`, `hitRate`.
- "Tiivistä vanhat" -painike → `POST /api/memory/summarize` (ensin suoritettava kuivaharjoittelu näyttää
  ehdokkaiden määrän, minkä jälkeen toiminto vahvistetaan).
- Vihreä/punainen kuntopiste, jonka tilaa ohjaa `GET /api/memory/health`.

### Välilehti: Kokeiluympäristö

- Kyselykenttä + strategian valitsin (Tarkka / Semanttinen / Hybridi) + tokenbudjetti.
- "Simuloi" → `POST /api/memory/retrieve-preview` — näyttää järjestetyt tulokset sekä
  `score`-, `tier`-, `tokens`-, `vecScore`- ja `ftsScore`-arvot.
- Ratkaisupaneeli, joka näyttää käytetyn upotuslähteen / vektoritietovaraston sekä
  sen, tapahtuiko varamenetelmään siirtyminen.

### Välilehti: Moottori

- Moottorin tilapaneeli (avainsanan FTS5-merkki, upotusmerkki, vektoritietovaraston merkki,
  Qdrantin kuntomerkki ja uudelleenjärjestelyn merkki).
- "Indeksoi uudelleen nyt" -painike → `POST /api/memory/reindex`.
- Upotuslähteen valitsin (automaattinen / etä / staattinen / transformers + valintakytkimet).
- Qdrant-määrityskortti (käyttöönottokytkin, isäntä/portti/kokoelma/avain, yhteystesti,
  semanttisen haun testi, puhdistus).
- Uudelleenjärjestelyn määrityskortti (käyttöönottokytkin, palveluntarjoajan/mallin valitsin).

Muisti- ja Qdrant-asetukset ovat myös kohdassa
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`)
vanhaa/yleistä asetuspintaa varten.

## Välimuisti

`src/lib/memory/store.ts` ylläpitää prosessinsisäistä LRU-tyyppistä välimuistia
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, josta vanhimmat 20 %
poistetaan) `getMemory(id)`-lukuja varten. Lisäksi käytössä on yleinen avain/arvo-pohjainen
`memoryCache`-kerros (`src/lib/memory/cache.ts`), jonka `get`/`set`/`invalidate`-metodeilla
kutsujat voivat toteuttaa oman rajatun välimuistinsa (1 000 tietueen LRU,
oletusarvoinen TTL 5 min).

## Tietosuoja ja elinkaari

- Muistin omistajuus määräytyy API-avaimen tunnuksen perusteella (`resolveMemoryOwnerId`
  tiedostossa `chatCore.ts`). Ilman `apiKeyInfo.id`-arvoa hakua, injektointia
  tai poimintaa ei suoriteta.
- Merkinnät, joiden `expires_at` on tulevaisuudessa, suodatetaan pois hausta; vanhat
  merkinnät, jotka ylittävät `retentionDays`-ajan, rajataan pois
  `created_at >= cutoff`-ehdolla funktiossa `retrieveMemories`.
- Käytä pysyvään poistamiseen `DELETE /api/memory/[id]`-päätepistettä tai `omniroute_memory_clear`-toimintoa.
- Poiminta suoritetaan taustalla odottamatta tulosta `setImmediate`-toiminnon avulla; virheet kirjataan
  tunnisteella `memory.extraction.background.failed`, eikä niitä koskaan välitetä kutsujalle.
- Vahvistuksen edestakaiset testit (`verifyExtractionPipeline`) siivoavat omat
  testimerkintänsä `finally`-lohkossa.

## Katso myös

- [SKILLS.md](./SKILLS.md) — `skillsEnabled`-asetus injektoi työkalujen
  määritykset muistin rinnalle.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-siirtotapa / käyttöoikeusalueet.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — laajempi API-pinta.
- Lähdemoduulit:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybridi-RRF
  - `src/lib/memory/embedding/index.ts` — monilähteinen upotuskerros
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-skeemat kaikille muisti-APIn pyynnöille
  - `src/shared/schemas/qdrant.ts` — Zod-skeemat Qdrant-asetuksille/-toiminnoille
  - `src/lib/db/memoryVec.ts` — CRUD-toiminnot kohteelle `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + alireitit
  - `src/app/(dashboard)/dashboard/memory/` — Studion käyttöliittymä (sivu + komponentit +
    välilehdet + hookit)
  - `open-sse/handlers/chatCore.ts` (injektoinnin / poiminnan kytkennät)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Upotuspalveluntarjoajan valinta (v3.8.16+)

OmniRouten muistimoottori tukee **neljää upotuslähdettä** (`src/lib/memory/embedding/`). Jokaisella on erilaisia kompromisseja **viiveen, kustannusten, mallin laadun ja käyttöönoton monimutkaisuuden** suhteen.

### Upotuslähteet

| Palveluntarjoaja | Lähde                                                            | Viive                            | Kustannus             | Laatu                                   | Käyttöönotto                              |
| ---------------- | ---------------------------------------------------------------- | -------------------------------- | --------------------- | --------------------------------------- | ----------------------------------------- |
| `transformers`   | Paikallinen ONNX-malli (Xenova/all-MiniLM-L6-v2)                 | ~50-150ms (CPU)                  | Ilmainen              | Hyvä                                    | Vain `npm install`                        |
| `static`         | Esilasketut vektorit (välimuistissa)                             | <1ms                             | Ilmainen              | Ei sovellu (riippuu välimuistiosumasta) | Ei mitään                                 |
| `remote`         | OpenAI / Cohere / Voyage API                                     | ~100-300ms                       | $0.02-0.10/1M tokenia | Erinomainen                             | API-avain                                 |
| `auto`           | Valitsee parhaan käytettävissä olevan lähteen suorituksen aikana | Sama kuin valitulla lähteellä    | Ilmainen              | Sama kuin valitulla lähteellä           | Ei mitään                                 |
| _(cache)_        | Muistissa oleva LRU-kerros minkä tahansa lähteen päällä          | <1ms (osuma), täysi viive (huti) | Ilmainen              | Sama kuin taustalla olevalla lähteellä  | Aina käytössä (ei valittavissa lähteeksi) |

### Päätöspuu

```
                  Mikä on käyttöönottoympäristösi?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  KEHITYS/TESTI PIENI TUOTANTO SUURI TUOTANTO REUNA / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ilmainen, ei APIa)        (paras laatu)    (ei internetiä)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Lisää AINA päälle `cache`-kerros
            (LruCache käärii minkä tahansa palveluntarjoajan)
```

### Tietokanta- ja API-määritykset

Muistin upotusasetukset määritetään Asetukset-APIn/-käyttöliittymän kautta, eivät ympäristömuuttujilla. Asiaankuuluvat asetustietokannan avaimet Asetukset-kohdassa (`normalizeMemorySettings` tiedostossa `src/lib/memory/settings.ts`) ovat:

- `memoryEmbeddingSource`: `"transformers"` (paikallinen), `"remote"` (API-pohjainen, esim. OpenAI), `"static"` (ulkoinen tallennusratkaisu) tai `"auto"`
- `memoryEmbeddingProviderModel`: Etä-/staattisten lähteiden mallitunniste (esim. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` tai `"auto"`

#### Paikallinen malli (`transformers`)

Käyttää sisäisesti transformers.js-kirjastoa paikallisten mallien suorittamiseen:

```bash
# Koodissa luettavat ympäristömuuttujat (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-mallirepositorio
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF:n staattinen Potion-malli
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Välimuistihakemisto
```

#### LRU-upotusvälimuisti

Välimuisti on oletusarvoisesti aina käytössä, ja se määritetään ympäristömuuttujilla:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Välimuistissa olevien kohteiden enimmäismäärä
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Suorituskykyluvut

Vertailutesti tyypillisellä 4-ytimisellä x86-palvelimella (tekstit noin 100 tokenia kukin):

| Palveluntarjoaja     | p50   | p95   | p99   | Kustannus / 1 milj. upotusta       |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Ilmainen                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Riippuu Qdrant-hostauksesta        |
| `cache` (osuma)      | <1ms  | <1ms  | 2ms   | Ilmainen                           |

---

## Faktojen poimintamallit (v3.8.16+)

`extraction.ts`-moduuli (`src/lib/memory/extraction.ts`) käyttää **säännöllisten lausekkeiden mallinhakua** jäsenneltyjen faktojen poimimiseen keskusteluviesteistä. Näiden mallien ymmärtäminen auttaa säätämään poiminnan laatua käyttötarkoitukseesi sopivaksi.

### Oletusarvoiset malliluokat

| Luokka              | Esimerkkimalli                                                  | Poimii                           |
| ------------------- | --------------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"Pidän enemmän <X>:stä"`, `"Pidän <X>:stä"`, `"Vihaan <X>:ää"` | Käyttäjän mieltymykset           |
| DECISION_PATTERNS   | `"Käytän <X>:ää"`, `"Päätin <X>"`, `"Valitsin <X>:n"`           | Käyttäjän päätökset (episodiset) |
| PATTERN_PATTERNS    | `"Yleensä <X>"`, `"Aina <X>"`, `"En koskaan <X>"`               | Pysyvät käyttäytymismallit       |

### Esimerkkimallit (yksinkertaistettu)

```ts
// Tiedostosta src/lib/memory/extraction.ts
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

### Mitä poimitaan

Kun käyttäjä sanoo:

> "Pidän enemmän TypeScriptistä. Käytän tässä projektissa Postgresia. Teen aina commitin ennen push-toimintoa. En pidä Pythonista."
> Poiminta tuottaa neljä muistia:
>
> | Avain                                | Luokka    | Tyyppi     | Sisältö                       |
> | ------------------------------------ | --------- | ---------- | ----------------------------- |
> | `preference:typescript`              | mieltymys | fakta      | "TypeScript"                  |
> | `decision:postgres_for_this_project` | päätös    | episodinen | "Postgres tässä projektissa"  |
> | `pattern:commit_before_pushing`      | malli     | fakta      | "commit ennen push-toimintoa" |
> | `preference:python`                  | mieltymys | fakta      | "Python"                      |

### Poiminnan rajat

Hallitsemattoman poiminnan estämiseksi käytössä ovat seuraavat rajat:

| Sisällön vähimmäispituus | 3 merkkiä |
| Sisällön enimmäispituus | 500 merkkiä |

### Milloin poiminta kannattaa poistaa käytöstä

Poiminta suoritetaan automaattisesti aina, kun muisti on käytössä; erillistä
vain poimintaa koskevaa valintaa ei ole. Voit poistaa sen käytöstä poistamalla muistin kokonaan käytöstä (`enabled: false`
`PUT /api/settings/memory`-pyynnöllä). Tätä kannattaa harkita, kun:

- Viestimäärä on suuri ja poiminnan kustannukset ovat merkittäviä
- Keskustelut ovat enimmäkseen tilapäisiä (keskustelu, virheenkorjaus) eikä niillä ole pitkäaikaista arvoa
- Keräät kontekstin jo mukautetuilla liitännäisillä

---

## Hybridi-RRF:n säätäminen (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** -algoritmi yhdistää FTS5-tulokset (avainsanat) ja vektoritulokset (semanttiset). `k`-parametri määrittää, kuinka suuri painoarvo annetaan alemmille sijoituksille.

### Kaava

Kunkin ehdokkaana olevan muistin RRF-pistemäärä on:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Missä:

- `k` on vakio (oletusarvo 60)
- `rank_i(d)` on dokumentin `d` sijoitus i:nnessä hakujärjestelmässä (FTS, vektori)
- Summa lasketaan kaikkien hakujärjestelmien yli

### Miten `k` vaikuttaa tuloksiin

| `k`-arvo            | Vaikutus                                                                                                   | Soveltuu parhaiten tilanteeseen               |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `k=0`               | Puhdas sijoitusten yhdistäminen (ei tasoitusta)                                                            | Teoreettinen vertailutaso                     |
| `k=10-30`           | Painottaa voimakkaasti parhaita tuloksia; matala sijoitus vaikuttaa vain vähän                             | Kun kolme parasta tulosta ovat yleensä oikein |
| **`k=60`** (oletus) | Tasapainoinen — kaikki kymmenen parasta tulosta vaikuttavat merkittävästi                                  | Yleiskäyttöinen haku                          |
| `k=100+`            | Tasaisempi — myös matalalle sijoittuneet tulokset voivat hallita, jos ne esiintyvät useissa järjestelmissä | Kun kattavuus > tarkkuus on kriittinen        |

### `k`:n säätäminen käytännössä

```bash
# Oletusarvo
MEMORY_RRF_K=60

# Aggressiivinen tarkkuus (pieni muisti, vähän dokumentteja)
MEMORY_RRF_K=20

# Suurin mahdollinen kattavuus (suuri muisti, vaihtelevat kyselyt)
MEMORY_RRF_K=120
```

**Esimerkki arvolla `k=20`:**

- FTS-sijoitus 1 → vaikutus `1/21 = 0.048`
- FTS-sijoitus 10 → vaikutus `1/30 = 0.033`
- Vektorisijoitus 1 → vaikutus `0.048`
- Yhdistetty enimmäisarvo: `0.096`

**Esimerkki arvolla `k=60`:**

- FTS-sijoitus 1 → vaikutus `1/61 = 0.016`
- FTS-sijoitus 10 → vaikutus `1/70 = 0.014`
- Vektorisijoitus 1 → vaikutus `0.016`
- Yhdistetty enimmäisarvo: `0.033`

Kun `k` on suurempi, **suhteellinen ero** ensimmäisen ja kymmenennen sijoituksen välillä on pienempi, joten algoritmi luottaa enemmän **hakujärjestelmien väliseen yksimielisyyteen** kuin parhaan sijoituksen varmuuteen.

### Milloin `k`:ta kannattaa muuttaa

| Oire                                                         | Kokeile                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Paras tulos voittaaa aina, mutta on väärä                    | **Pienempää** k:ta (esim. 20) — parhaan sijoituksen varmuudella on enemmän merkitystä |
| Oikea vastaus on viiden parhaan joukossa muttei ensimmäisenä | **Suurempaa** k:ta (esim. 100) — tasaisempi pisteytys palkitsee yksimielisyyden       |
| Kattavuus on suuri mutta tarkkuus heikko                     | **Pienempää** k:ta — terävöitä järjestystä                                            |
| Kattavuus on heikko (olennaisia dokumentteja puuttuu)        | **Suurempaa** k:ta — anna alemmille sijoituksille mahdollisuus                        |

### RRF-painotus

Reciprocal Rank Fusion käyttää yhtäläisiä painoja semanttiselle vektorisijoitukselle ja kokotekstihaun sijoitukselle:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Yksittäisten painojen säätämiseen ei ole ympäristömuuttujia (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` eivät ole olemassa).

---

## Tiivistysstrategia (v3.8.16+)

`summarization.ts`-moduuli (`src/lib/memory/summarization.ts`) pakkaa vanhempia muistoja pitääkseen aktiivisen joukon pienenä ja säilyttääkseen samalla muistettavuuden.

### Milloin tiivistys käynnistyy

| Käynnistin                          | Raja-arvo (oletus) |
| ----------------------------------- | ------------------ |
| Manuaalinen käynnistys API:n kautta | ei sovelleta       |

### Mitä tiivistetään

`summarization.ts` vie kaksi aloituspistettä:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — tiivistää
  istunnon muistot yhdeksi tiivistelmätekstiksi, jonka kokoa rajoittaa token-budjetti.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API:n käyttämä
  ikään perustuva pakkaus: se valitsee kaikki muistot, jotka ovat vanhempia kuin `days`,
  muodostaa niistä yhden tiivistetyn yhteenvetomuiston ja poistaa alkuperäiset
  (kun `dryRun` on `false`). Anna arvoksi `dryRun: true`, jos haluat esikatsella
  ehdokasjoukkoa ja tokenien kokonaismäärää muuttamatta mitään.

Tunnisteisiin tai avaimiin perustuvaa ryhmittelyvaihetta tai muistokohtaista "ydin vs. tiivistettävä" -pisteytystä ei ole —
valinta perustuu yksinomaan ikärajaan, ja yhteenvetoteksti sisältää yhden tiivistetyn,
tyyppietuliitteellä varustetun rivin kutakin ehdokasta kohden.

### Tiivistyksen käynnistäminen

Tiivistys on **manuaalinen / valinnainen** — `autoSummarize`-asetuksen arvo on
oletuksena `false`, joten mitään ei pakata automaattisesti. Käynnistä se API:n kautta:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Jos haluat pitää sen pois käytöstä, säilytä vain `autoSummarize`-asetuksen oletusarvo (`false`).

### Vinkkejä tiivistyksen laatuun

- **Esikatsele ensin `dryRun`-toiminnolla** — `summarizeMemoriesOlderThan(..., true)` palauttaa
  ehdokasluettelon ja tokenien kokonaismäärän, jotta voit varmistaa, mitä yhdistettäisiin,
  ennen alkuperäisten poistamista.
- **Suorita tiivistys vähäisen liikenteen aikana**, jos muistokorpuksesi on suuri — LLM-kutsu on hidas vaihe

```bash
# Cron-tyyli: tiivistä päivittäin klo 3
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend-palveluntarjoajamalli

> **Ensisijainen tietolähde:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testit:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend-palveluntarjoajamalli tuo olemassa olevan muistimoottorin päälle **vaihdettavan taustajärjestelmän abstraktiokerroksen**. Sen sijaan, että muistijärjestelmä olisi sidottu yhteen tallennustoteutukseen, se tukee nyt useita taustajärjestelmiä (SQLite, Obsidian, Notion ja mukautetut HTTP-taustajärjestelmät), joiden ensisijainen ja varareititys voidaan määrittää.

### Arkkitehtuuri

```
┌──────────────────────────────────────────────────────────┐
│                    API-reitit                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│         Singleton-orkestroija (manager.ts)                │
│                                                          │
│  Ensisijainen ──► Taustajärjestelmä A  (esim. SQLite)    │
│  Vara ──────────► Taustajärjestelmä B  (esim. Obsidian)  │
│                   Taustajärjestelmä C  (esim. Notion      │
│                   GenericBackendin kautta)                │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite-    │ │ Obsidian-  │ │ GenericMemory-   │
│ tausta-    │ │ tausta-    │ │ taustajärjestelmä│
│ järjestelmä│ │ järjestelmä│ │ (HTTP)            │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Ydinrajapinta (`backend.ts`)

Jokaisen taustajärjestelmän on toteutettava `MemoryBackend`-rajapinta:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD-toiminnot
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Haku
  search(config: SearchConfig): Promise<Memory[]>;

  // Terveys
  health(): Promise<HealthCheckResult>;

  // Elinkaari (valinnainen)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-orkestroija, joka:

- **Rekisteröi** taustajärjestelmät `register(backend)`-kutsulla — kutsutaan käynnistyksen yhteydessä tiedostosta `index.ts`
- **Määrittää** ensisijaisen taustajärjestelmän ja varajärjestelmät kutsulla `configure(primary, fallbacks)`
- **Reitittää** CRUD-toiminnot ja haut ensisijaiseen taustajärjestelmään käyttäen varaketjua virhetilanteessa
- **Tarkistaa kaikkien taustajärjestelmien kunnon** säännöllisesti

**Varajärjestelmän toiminta:**

| Toiminto | Ensisijainen                  | Varajärjestelmät                            |
| -------- | ----------------------------- | ------------------------------------------- |
| `create` | ✅ Vain ensisijainen          | ❌                                          |
| `get`    | ✅ Kokeile ensin ensisijaista | ✅ Vara, jos tulos on null                  |
| `update` | ✅ Vain ensisijainen          | ✅ Asynkroninen synkronointi ilman odotusta |
| `delete` | ✅ Vain ensisijainen          | ✅ Asynkroninen synkronointi ilman odotusta |
| `list`   | ✅ Vain ensisijainen          | ❌                                          |
| `search` | ✅ Ensisijainen ensin         | ✅ Vara virhetilanteessa                    |

#### GenericMemoryBackend (`genericBackend.ts`)

Yleiskäyttöinen HTTP-yhdistin, joka mukauttaa minkä tahansa REST API:n MemoryBackendiksi. Hyödyllinen seuraaville:

- **Notion** — yhdistä Notion API:n kautta
- **Obsidian** — yhdistä Obsidian Local REST API:n kautta
- **Mukautetut taustajärjestelmät** — mikä tahansa palvelu, joka tarjoaa RESTful-muisti-API:n

**Määritykset:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Taustajärjestelmän API:n perus-URL
  apiKey?: string;           // Bearer-tunniste todentamista varten
  headers?: Record<string, string>;  // Mukautetut HTTP-otsakkeet
  timeout?: number;          // Pyynnön aikakatkaisu (oletus: 30000ms)
  backendType?: string;      // Lokitusta varten

  // Päätepisteiden ohitukset (oletusarvot noudattavat REST-käytäntöjä)
  endpoints?: {
    search?: string;   // oletus: "/memories/search"
    create?: string;   // oletus: "/memories"
    list?: string;     // oletus: "/memories"
    get?: string;      // oletus: "/memories/{id}"
    update?: string;   // oletus: "/memories/{id}"
    delete?: string;   // oletus: "/memories/{id}"
    health?: string;   // oletus: "/health"
  };

  // Kyselyparametrien nimien määritykset
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Polkuparametrien nimien määritykset
  pathParams?: {
    id?/memoryId?
  };
}
```

**Tunnetut taustajärjestelmät** on esimääritetty `KNOWN_BACKENDS`-kohdassa:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend, joka osoittaa osoitteeseen localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend, joka osoittaa osoitteeseen api.notion.com/v1
```

#### Sisäänrakennetut taustajärjestelmät

##### SQLiteBackend (`sqliteBackend.ts`)

Ensisijainen oletustaustajärjestelmä. Kapseloi olemassa olevan SQLite-pohjaisen muistivaraston käyttämällä tiedostoa `src/lib/memory/store.ts`. Rekisteröidään automaattisesti käynnistyksen yhteydessä.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Kapseloi olemassa olevan Obsidian-integraation (`src/lib/memory/obsidianBackend.ts`). Muodostaa yhteyden Obsidian-holviin Obsidian Local REST API:n kautta.

### Asetukset

Muistin taustajärjestelmän asetukset tallennetaan sovelluksen asetustauluun, ja niitä hallitaan tiedoston `src/lib/memory/settings.ts` kautta:

| Asetus                          | Ympäristö-/määritysavain | Oletus     | Kuvaus                                           |
| ------------------------------- | ------------------------ | ---------- | ------------------------------------------------ |
| Ensisijainen taustajärjestelmä  | `memoryPrimaryBackend`   | `"sqlite"` | Ensisijaisen taustajärjestelmän tunnus           |
| Varataustajärjestelmät          | `memoryFallbackBackends` | `[]`       | Järjestetyt varataustajärjestelmien tunnukset    |
| Taustajärjestelmien määritykset | `memoryBackendConfigs`   | `{}`       | Taustajärjestelmäkohtaiset määritysten ohitukset |

Asetukset normalisoidaan `normalizeMemorySettings()`-funktiolla ja tallennetaan välimuistiin `getMemorySettings()`-funktiossa.

### Alustusprosessi

```
Sovelluksen käynnistys
  → index.ts-tuonnit (sivuvaikutuksena): rekisteröi SQLiteBackend-taustajärjestelmän
  → initMemoryBackends() kutsutaan sovelluksen elinkaaren aikana:
      1. Lataa asetukset (getMemorySettings)
      2. Määritä ensisijainen taustajärjestelmä ja varataustajärjestelmät
      3. Alusta kaikki taustajärjestelmät (kuntotarkistus)
      4. Valmis pyyntöjä varten
```

### Uuden taustajärjestelmän lisääminen

1. **Toteuta `MemoryBackend`**-rajapinta tiedostossa `src/lib/memory/<name>Backend.ts`
2. **Vie** tiedostosta `src/lib/memory/index.ts`
3. **Rekisteröi** kutsulla `memoryManager.register(yourBackend)` käynnistyksen yhteydessä
4. **Määritä** asetusten kautta: aseta `memoryPrimaryBackend` taustajärjestelmäsi tunnukseksi
5. **Testaa** käyttämällä viitteenä tiedostoa `src/lib/memory/__tests__/generic-backend.test.ts`

#### Esimerkki: Brain-taustajärjestelmä

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

### Varmennus

#### Yksikkötestit

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Odotettu tulos: **35 testiä, kaikki läpäisty**, kattaen seuraavat:

- Konstruktori (2)
- Kuntotarkistus (4) — onnistuminen, 500-virhe, verkkovirhe, viive
- Alustus (2) — onnistuminen, epäonnistuminen
- Luonti (2) — oletuspäätepiste, mukautettu päätepiste
- Haku tunnuksella (4) — onnistuminen, 404 → null, muu kuin 404 → poikkeus, mukautetut polkuparametrit
- Päivitys (2) — onnistuminen, 404 → false
- Poisto (2) — onnistuminen, 404 → false
- Luettelointi (2) — kyselyparametrit, mukautetut parametrien nimet
- Haku (3) — kyselyparametrit, mukautettu päätepiste, asetusten serialisointi
- Todennusotsakkeet (2) — Bearer-tunniste, mukautetut otsakkeet
- Tehdasfunktio (1)

#### Tyyppitarkistus

```bash
npm run typecheck:core
```

Odotettu tulos: **0 virhettä**.
