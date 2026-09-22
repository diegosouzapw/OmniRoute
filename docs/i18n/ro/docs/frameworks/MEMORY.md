# Memory System (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sursa oficială:** `src/lib/memory/` și `src/app/api/memory/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40 (dezactivată implicit + recuperarea decalajului cuantizării int8)

OmniRoute oferă memorie conversațională persistentă, asociată cheii API (și,
opțional, ID-ului sesiunii). Amintirile sunt extrase automat din răspunsurile LLM
prin identificarea simplă a unor tipare regex și reinjectate în solicitările
ulterioare sub forma unui mesaj system inițial (sau a primului mesaj al
utilizatorului pentru furnizorii care resping rolul system).

> **Memoria este DEZACTIVATĂ implicit (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> este acum `false` (`src/lib/memory/settings.ts`). Activarea memoriei injectează
> până la `maxTokens` (~2k) de context recuperat în **fiecare** solicitare de chat,
> ceea ce este facturat — un cost neașteptat pentru instalările noi și pentru
> clienții care își gestionează propriul context. Activați-o explicit din
> **Settings → Memory** (`MemorySkillsTab` afișează un avertisment privind costul
> tokenurilor atunci când memoria este activată). Un client poate exclude o
> singură solicitare folosind antetul de solicitare `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — consultați tabelul anteturilor de solicitare din
> [API_REFERENCE.md](../reference/API_REFERENCE.md). O solicitare fără memorie
> setează `memoryOwnerId = null`, ceea ce dezactivează **atât** injectarea memoriei,
> **cât și** pe cea a abilităților pentru solicitarea respectivă
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Memoria este **izolată pentru fiecare cheie API**, nu pentru fiecare utilizator —
toate solicitările autentificate cu aceeași cheie API folosesc în comun același
fond de memorie, cu posibilitatea unei izolări suplimentare prin `sessionId`.

## Arhitectură

```
Client → /v1/chat/completions (apiKeyInfo rezolvat în amonte)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrage ID-ul
    → getMemorySettings()                     # setări memorate în cache
    → shouldInjectMemory(body, {enabled})     # condiție de acces
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector opțional
    → injectMemory(body, memories, provider)  # mesaj system sau al utilizatorului
  → apel către furnizorul din amonte
  → la răspuns: extractFacts(text, apiKeyId, sessionId)  # neblocant
    → setImmediate → createMemory(fact) pentru fiecare potrivire
                   → embed(content) + upsertVector(id, vec)
```

Punctele de apel pentru injectare și extragere sunt conectate în
`open-sse/handlers/chatCore.ts` (căutați `retrieveMemories`, `injectMemory`
și `extractFacts`).

## Arhitectura motorului (rezoluție pe 3 niveluri)

Motorul de memorie stabilește în timpul execuției calea de recuperare în funcție
de infrastructura și setările disponibile. Există trei niveluri, aplicate în
ordinea priorității:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVELUL 0 — Cuvinte-cheie (FTS5)                            │
  │  Disponibilitate determinată prin testare: FTS5 atunci când  │
  │  versiunea SQLite îl acceptă (better-sqlite3 / node:sqlite / │
  │  bun:sqlite); indisponibil în versiunile fără FTS5           │
  │  (de ex., sql.js/WASM — "no such module: fts5"). Utilizat    │
  │  când strategy = "exact" sau ca variantă de rezervă; starea  │
  │  keyword a motorului reflectă rezultatul testării.           │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVELUL 1 — Vector încorporat (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 încărcat prin db.loadExtension().         │
  │  KNN prin forță brută pe vectori Float32. Activ atunci când: │
  │   • încărcarea extensiei sqlite-vec reușește                 │
  │   • este disponibilă o sursă de încorporări (remote | static│
  │     | transformers) care poate produce un Float32Array       │
  │   • există tabelul vec_memories (creat la primul ready())    │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVELUL 2 — Qdrant (bază de date vectorială externă,        │
  │  activată opțional)                                          │
  │  Când este activată, înlocuiește sqlite-vec pentru           │
  │  semantic/hybrid. Necesită o instanță Qdrant în execuție și  │
  │  o gazdă/un port configurat.                                 │
  └─────────────────────────────────────────────────────────────┘
```

Degradarea este automată și transparentă:

- Dacă sqlite-vec nu se încarcă, nivelul 1 este indisponibil → se revine la nivelul 0.
- Dacă sursa de încorporări returnează o eroare, nivelul 1 revine la nivelul 0.
- Dacă Qdrant nu funcționează corespunzător, nivelul 2 revine la nivelul 1 (sau
  la nivelul 0 dacă și nivelul 1 este indisponibil).

## Surse de embedding

Stratul de embedding (`src/lib/memory/embedding/`) stabilește sursa care trebuie utilizată
pe baza valorii `MemorySettingsExtended.embeddingSource`:

| Sursă          | Descriere                                                                                     | Necesită cheie | Pornire la rece  |
| -------------- | --------------------------------------------------------------------------------------------- | -------------- | ---------------- |
| `remote`       | Utilizează API-ul de embedding al unui furnizor configurat (OpenAI, Cohere etc.)              | Da             | Niciuna          |
| `static`       | Embedding local bazat pe un tabel de căutare prin `potion-base-8M` (WordPiece + mean pooling) | Nu             | ~200ms           |
| `transformers` | Inferență ONNX locală prin `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                 | Nu             | ~3s + ~400MB RAM |
| `auto`         | Rezolvare la rulare: remote (dacă există cheia) → static → transformers → null                | Depinde        | Depinde          |

**Ordinea de rezolvare pentru `auto`:**

1. Găsește primul furnizor din `listEmbeddingProviders()` pentru care `hasKey === true` → `remote`.
2. Dacă `settings.staticEnabled === true` → `static`.
3. Dacă `settings.transformersEnabled === true` → `transformers`.
4. În caz contrar → `null` (revine la căutarea după cuvinte-cheie FTS5).

Cache-ul de embedding (`src/lib/memory/embedding/cache.ts`) utilizează o hartă LRU în memorie,
indexată după `${source}:${model}:${dim}:${sha256(text)}`, limitată la
`MEMORY_EMBEDDING_CACHE_MAX` intrări (implicit 1000), cu un TTL de
`MEMORY_EMBEDDING_CACHE_TTL_MS` (implicit 5 min). Este partajată între toți apelanții
pe durata ciclului de viață al procesului.

## RRF hibrid (k=60)

Când `strategy = "hybrid"` și depozitul vectorial este disponibil, regăsirea utilizează
Reciprocal Rank Fusion pentru a combina rezultatele FTS5 și vectoriale:

```
RRF(d) = Σ  1 / (k + rank_i(d))      unde k = 60 (configurabil prin MEMORY_RRF_K)
          i
```

Mai exact:

1. Rulează căutarea FTS5 → lista ordonată `R_fts` (pozițiile 1..N).
2. Rulează căutarea vectorială KNN → lista ordonată `R_vec` (pozițiile 1..M).
3. Pentru fiecare `memoryId` unic:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 dacă nu se află în listă).
4. Sortează după `rrf_score` DESC, apoi aplică parcurgerea în limita bugetului de tokenuri.

RRF este recunoscut ca fiind eficient fără a necesita normalizarea scorurilor între
sisteme de regăsire eterogene. Valoarea implicită `k=60` provine din lucrarea originală
a lui Cormack et al. și funcționează bine pentru corpusuri mici (<10k memorii).

## Completare retroactivă (leneșă + reindexare)

Când modelul de embedding se schimbă (detectat prin `embedding_signature`),
depozitul vectorial este reconstruit, iar toate memoriile existente sunt marcate cu
`needs_reindex = 1` în tabelul `memories`.

**Completare retroactivă leneșă**: La următoarea regăsire, orice memorie căreia îi lipsește o intrare vectorială
primește un embedding și este inserată în `vec_memories` înainte de rularea căutării. Aceasta
amortizează costul completării retroactive între solicitările reale, fără a bloca pornirea.

**Reindexare explicită**: Fila Engine din `/dashboard/memory` oferă un buton
„Reindexează acum”, care apelează `POST /api/memory/reindex`. Handlerul apelează
`runReindexBatch()` din `src/lib/memory/reindex.ts`, care procesează până la
`limit` intrări în așteptare per solicitare. Progresul poate fi verificat periodic prin
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabelul `memory_vec_meta` (migrarea `083_memory_vec.sql`) stochează:

- `active_dim` — dimensiunea vectorială curentă (null = încă necalibrată).
- `embedding_signature` — `${source}:${model}:${dim}`, utilizată pentru detectarea modificărilor.
- `last_reset_at` — marca temporală a ultimei resetări complete.
- `vec_loaded` — indicator 0/1 care arată dacă sqlite-vec s-a încărcat cu succes.

## Extensia setărilor

Nouă câmpuri pentru embeddings și vectori sunt disponibile în `MemorySettingsExtended` din
`src/shared/schemas/memory.ts` și sunt persistate prin `src/lib/db/settings.ts`:

| Câmp                     | Tip                                                | Valoare implicită | Descriere                                                                |
| ------------------------ | -------------------------------------------------- | ----------------- | ------------------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`          | Sursa de embeddings care trebuie utilizată                               |
| `embeddingProviderModel` | `string \| null`                                   | `null`            | Furnizor/model în formatul `provider/model`                              |
| `customBaseUrl`          | `string \| null`                                   | `null`            | URL de bază al endpointului compatibil cu OpenAI, exclusiv pentru Memory |
| `customModelId`          | `string \| null`                                   | `null`            | ID-ul modelului trimis către endpointul personalizat                     |
| `transformersEnabled`    | `boolean`                                          | `false`           | Activare opțională pentru Transformers.js (MiniLM, ~400MB)               |
| `staticEnabled`          | `boolean`                                          | `false`           | Activare opțională pentru modelul local static potion-base-8M            |
| `rerankEnabled`          | `boolean`                                          | `false`           | Activează etapa de reclasificare (adaugă +200-500ms/cerere)              |
| `rerankProviderModel`    | `string \| null`                                   | `null`            | Furnizor/model de reclasificare în formatul `provider/model`             |

`rerankProviderModel` este rezolvat prin `POST /v1/rerank` (apelat prin interfața loopback), astfel încât acceptă orice acceptă ruta respectivă: un model cloud de reclasificare din lista selectată (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) sau un nod furnizor compatibil cu OpenAI sub forma `<node-prefix>/<model>` (de exemplu, `skilled-mini/bge-reranker-v2-m3` pentru un server TEI/Infinity). Nodurile loopback sunt întotdeauna eligibile; un nod de pe altă gazdă (LAN, Tailscale) necesită suplimentar indicatorul de funcționalitate `RERANK_REMOTE_PROVIDER_NODES` și trebuie să respecte politica pentru URL-urile de ieșire ale furnizorului — consultați [Indicatori de funcționalitate](../reference/FEATURE_FLAGS.md). Selectorul din panoul de control afișează furnizorii selectați și nodurile locale; orice șir valid `provider/model` poate fi setat direct prin `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backendul vectorial care trebuie utilizat |

Acestea sunt expuse prin `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Pentru sursa `remote`, Memory acceptă și setările opționale `customBaseUrl` și
`customModelId`. Împreună, acestea selectează un endpoint `/embeddings` compatibil
cu OpenAI și un model, fără a modifica registrul global de embeddings. Endpointul este
normalizat înainte de utilizare și verificat conform politicii pentru URL-urile de ieșire
ale furnizorului: este necesar HTTP(S), credențialele încorporate și șirurile de interogare
sunt respinse, iar adresele de metadate cloud rămân blocate. Valorile necompletate păstrează
furnizorul selectat din registru. Erorile returnate panoului de control sunt igienizate, iar
credențialele endpointului nu sunt înregistrate niciodată în jurnale.

> **DE FĂCUT (D20):** Domeniul `global` (partajarea memoriilor între toate cheile API) nu este
> implementat în această versiune. Acesta necesită modificări ale schemei și o cale globală
> de recuperare. Trebuie urmărit separat.

## Straturi de stocare

### Principal: SQLite (tabelul `memories`)

Creat prin migrarea `015_create_memories.sql`:

| Coloană                     | Tip                | Note                                                                                    |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generat prin `crypto.randomUUID()`                                                 |
| `api_key_id`                | `TEXT NOT NULL`    | Cheia API proprietară                                                                   |
| `session_id`                | `TEXT`             | Domeniu opțional pentru fiecare conversație                                             |
| `type`                      | `TEXT NOT NULL`    | Una dintre valorile `factual`, `episodic`, `procedural`, `semantic`                     |
| `key`                       | `TEXT`             | Cheie stabilă pentru upsert, de ex. `preference:i_prefer_python`                        |
| `content`                   | `TEXT NOT NULL`    | Textul efectiv al faptului                                                              |
| `metadata`                  | `TEXT`             | Obiect JSON (categorie, extractedAt, sursă, ...)                                        |
| `created_at` / `updated_at` | `TEXT`             | Șiruri ISO 8601                                                                         |
| `expires_at`                | `TEXT`             | Expirare opțională; `NULL` înseamnă permanent                                           |
| `memory_id`                 | `INTEGER UNIQUE`   | Adăugat de `023_fix_memory_fts_uuid.sql` pentru a conecta UUID-urile ↔ rowid-urile FTS5 |

Indexuri: `api_key_id`, `session_id`, `type`, `expires_at`, plus indexul unic
`memory_id`.

**Semantica upsert**: `createMemory()` caută un rând existent cu aceeași
pereche `(api_key_id, key)` și îl actualizează pe loc atunci când este găsit
(combinând `metadata` printr-o răspândire superficială). Astfel, tabelul nu crește
nelimitat în cazul declarațiilor repetate privind preferințele.

### Căutare integrală (`memory_fts` — tabel virtual)

`022_add_memory_fts5.sql` creează un tabel virtual FTS5 pentru `content` și
`key`. `023_fix_memory_fts_uuid.sql` corectează o eroare întâlnită în practică,
în care cheia primară UUID nu putea fi asociată cu rowid-ul întreg al FTS5 —
migrarea adaugă coloana `memory_id`, recreează tabelul FTS și configurează
declanșatoarele (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) care mențin
FTS sincronizat la operațiile INSERT, DELETE și UPDATE.

Este utilizat de `retrieval.ts` pentru strategiile `semantic` și `hybrid` (consultați
mai jos). Codul de recuperare verifică prin `hasTable("memory_fts")` și revine la
ordinea cronologică dacă tabelul FTS lipsește sau interogarea FTS generează o
eroare.

### Opțional: Qdrant (nivelul 2 al depozitului vectorial)

`src/lib/memory/qdrant.ts` implementează o integrare opțională cu Qdrant ca
depozit vectorial de nivel 2. Recuperarea este direcționată către Qdrant numai
atunci când selectorul motorului `memoryVectorStore === "qdrant"` — valoarea
implicită `"auto"` (și `"sqlite-vec"`) nu selectează **niciodată** Qdrant.
Comutatorul din fila Engine setează **atât** `qdrantEnabled`, cât și
`memoryVectorStore`: activarea face din Qdrant depozitul principal, iar
dezactivarea îl resetează la `"auto"` (#5597 — înainte de această corecție,
activarea nu avea niciun efect, deoarece nimic nu scria selectorul motorului).
Dacă Qdrant nu este accesibil sau nu returnează nimic, recuperarea revine la
sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — încorporează `key + content` folosind modelul de încorporare configurat, se asigură că respectiva colecție există (creează vectori cu distanță cosinus la prima utilizare) și inserează sau actualizează un punct cu sarcina utilă `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — încorporează interogarea, caută în colecția filtrată după `kind = "omniroute_memory"` și, opțional, după `apiKeyId` / `sessionId`. Limitează `topK` la intervalul `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — ștergerea unui singur punct. Apelată de `deleteMemory()` după eliminarea rândului SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — șterge în masă punctele al căror `expiresAtUnix` este în trecut sau al căror `createdAtUnix` este mai vechi decât pragul de retenție. Le numără mai întâi, astfel încât panoul de control să poată afișa valorile reale.
- `checkQdrantHealth()` — sondă de stare `GET /readyz`, cu latență.

Interfața de configurare pune la dispoziție configurarea Qdrant, verificarea stării, testarea căutării semantice și curățarea în fila **Motor** din `/dashboard/memory`. Rutele corespunzătoare din `src/app/api/settings/qdrant/` sunt toate conectate începând cu v3.8.6:

| Rută                                    | Metodă        | Descriere                                    |
| --------------------------------------- | ------------- | -------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Citește / actualizează setările Qdrant       |
| `/api/settings/qdrant/health`           | `GET`         | Sondă de disponibilitate + latență           |
| `/api/settings/qdrant/search`           | `POST`        | Test de căutare semantică                    |
| `/api/settings/qdrant/cleanup`          | `POST`        | Elimină punctele expirate / vechi            |
| `/api/settings/qdrant/embedding-models` | `GET`         | Listează modelele de încorporare disponibile |

**Note privind comportamentul (la ce să vă așteptați):**

- **Selectarea motorului** — activarea Qdrant în fila Motor îl transformă în depozitul principal (setează `memoryVectorStore="qdrant"`); dezactivarea îl resetează la `"auto"` (#5597).
- **Fără populare retroactivă** — numai memoriile create/actualizate **după** activarea Qdrant sunt scrise în acesta (scriere duală de tip fire-and-forget). Memoriile SQLite preexistente **nu** sunt migrate; „Reindexează acum” reconstruiește doar indexul sqlite-vec, nu și Qdrant.
- **Dimensiunea vectorului este detectată automat** din încorporarea efectivă la prima utilizare — nu există niciun câmp pentru dimensiune care trebuie completat. Schimbarea modelului de încorporare după ce există deja o colecție **nu** este gestionată automat: colecția existentă rămâne nemodificată, iar scrierile/căutările cu dimensiuni incompatibile eșuează și revin la sqlite-vec. Recreați colecția (folosind un nume nou sau ștergând-o din Qdrant) pentru a schimba modelul de încorporare.
- **Metrica distanței** — întotdeauna **Cosinus** (codificată direct la crearea colecției; nu este configurabilă).
- **Autentificare** — numai prin cheia API (trimisă în antetul `api-key`; opțională pentru instanțele Docker locale fără autentificare). JWT/RBAC nu sunt utilizate.
- **Câmpuri de configurare** — interfața expune `host`, `port`, `collection`, `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` sunt disponibile numai prin variabile de mediu/baza de date, iar `vectorSize` nu este utilizat la crearea colecției (dimensiunea provine din încorporare).

### Cuantizarea vectorilor (int8 — opțională, ambele backenduri)

Ambele backenduri vectoriale acceptă **cuantizarea int8 opțională** pentru a reduce amprenta de memorie a vectorilor stocați (de aproximativ 4 ori mai mică decât Float32), cu prețul unei mici pierderi a ratei de regăsire. În mod implicit, aceasta este **dezactivată** pentru ambele — vectorii rămân la precizie maximă dacă funcția nu este activată explicit.

| Backend    | Setare                          | Tip                            | Valoare implicită | Locul citirii                                               |
| ---------- | ------------------------------- | ------------------------------ | ----------------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (cheie DB) | `"none" \| "int8" \| "binary"` | `"none"`          | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`          | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** este configurat pentru fiecare instanță prin cheia de setare `qdrantQuantization` (expusă drept câmpul `quantization` în `PUT /api/settings/qdrant`). Când valoarea este `"int8"`, `buildQuantizationConfig()` solicită cuantizare scalară (`always_ram`, cuantila `0.99`), iar căutările activează `rescore: true`, astfel încât vectorii la precizie maximă să rafineze setul de candidați int8.
- Cuantizarea **sqlite-vec** se configurează **numai prin mediul de execuție** (nu printr-o setare din baza de date): setați `MEMORY_VEC_QUANTIZATION=int8` pentru a stoca vectorii locali sub forma unei coloane `int8[dim]` prin `vec_quantize_int8(?, 'unit')`. Modul ales este inclus în `embedding_signature` (un sufix `:int8`), astfel încât schimbarea modului declanșează reindexarea completă a tabelului `vec_memories` — aceeași cale de populare retroactivă întârziată utilizată atunci când se schimbă modelul de încorporare.

## Tipuri de memorie

`MemoryType` (`src/lib/memory/types.ts`):

| Tip          | Utilizat pentru                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `factual`    | Preferințe, informații stabile despre utilizator, tipare comportamentale                                    |
| `episodic`   | Decizii asociate unui moment specific („Am ales Postgres”)                                                  |
| `procedural` | Memorie despre fluxuri de lucru / instrucțiuni practice (rezervată; în prezent nu există extractor automat) |
| `semantic`   | Rezervată pentru intrările din depozitul vectorial                                                          |

Strategia de regăsire `MemoryConfig` este una dintre `exact`, `semantic` sau `hybrid`,
iar domeniul este unul dintre `session`, `apiKey` sau `global`. Domeniul implicit din
`getMemorySettings()` este `apiKey`.

## Extragerea informațiilor (`extraction.ts`)

Extragerea este **bazată pe expresii regulate**, nu pe LLM — rulează în cadrul procesului cu
`setImmediate()`, astfel încât nu blochează niciodată fluxul de răspuns:

- **Tipare de preferințe** → `MemoryType.FACTUAL`
  (de ex. `Prefer …`, `Îmi place foarte mult …`, `preferatul meu este …`, `Urăsc …`)
- **Tipare de decizii** → `MemoryType.EPISODIC`
  (de ex. `Voi folosi …`, `Am ales …`, `Am optat pentru …`, `Voi adopta …`)
- **Tipare comportamentale** → `MemoryType.FACTUAL`
  (de ex. `De obicei …`, `Întotdeauna …`, `Am tendința să …`)

Fiecare potrivire este igienizată (`trim`, restrângerea spațiilor albe, limitare la 500 de caractere),
deduplicată în cadrul lotului printr-un `factKey(category, content)` stabil și
stocată prin `createMemory()` cu metadatele
`{category, extractedAt, source: "llm_response"}`. Textul de intrare este limitat la
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — când este mai lung, este utilizată **partea finală** a textului,
astfel încât cel mai recent conținut al asistentului să fie întotdeauna inclus.

`extractFactsFromText(text)` este exportată pentru teste și returnează informațiile
structurate fără a le stoca.

## Regăsirea (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` este punctul principal de intrare. Aceasta:

1. Normalizează și validează configurația prin `MemoryConfigSchema`.
2. Returnează imediat `[]` atunci când `enabled` este false sau `maxTokens <= 0`.
3. Limitează `maxTokens` la intervalul `[1, 8000]`.
4. Detectează dacă există tabelul modern `memories` (în locul tabelului vechi `memory`),
   astfel încât bazele de date mai vechi să continue să funcționeze.
5. Construiește interogarea de bază cu verificarea expirării
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), domeniul
   opțional al sesiunii și pragul opțional `retentionDays`.
6. Se ramifică în funcție de strategie:
   - **`exact`** (implicită): ordonare cronologică `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: dacă există `config.query` și `memory_fts`, efectuează `JOIN`
     cu `memory_fts MATCH ?` și ordonează după rangul FTS; revine la ordonarea cronologică
     atunci când FTS returnează 0 rânduri.
   - **`hybrid`**: reunește rezultatele FTS (cu relevanță mai mare) și setul
     cronologic, cu deduplicare după id.
7. Calculează un scor de relevanță bazat pe cuvinte-cheie (`getRelevanceScore`) pentru
   `content`, `key` și JSON-ul `metadata` atunci când este furnizată o interogare. Rândurile cu
   scor zero sunt eliminate.
8. Sortează descrescător după scor, apoi descrescător după `createdAt`.
9. Parcurge lista ordonată și acceptă intrări atât timp cât totalul cumulativ
   `estimateTokens(content)` (≈ `length / 4`) rămâne sub limita alocată. Returnează întotdeauna
   cel puțin o intrare atunci când există vreo potrivire.

`estimateTokens` este exportată și utilizată de regăsire, rezumare și instrumentul MCP
`omniroute_memory_search`.

## Injectare (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Reunește conținutul tuturor memoriilor într-un singur șir `Memory context: …`.
2. Alege o strategie în funcție de numele furnizorului:
   - **Mesaj de sistem** (implicit pentru OpenAI, Anthropic, Gemini, …) — adaugă înainte
     un `{role: "system", content: memoryText}` în fața oricăror mesaje de sistem
     existente, astfel încât solicitările de sistem ale utilizatorului să aibă în continuare prioritate.
   - **Mesaj de utilizator** (alternativă) — pentru furnizorii din
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Aceștia resping rolul de sistem
     și, în caz contrar, ar returna 400 (consultați problema #1701 pentru GLM/Zhipu).
3. Înregistrează numărul, strategia și modelul sub `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` este exportată pentru apelanții care trebuie să
ia propriile decizii de rutare. Furnizorii necunoscuți folosesc implicit `true`
(rol de sistem permis), din motive de siguranță.

## Setări (`settings.ts`)

Configurația memoriei este **stocată în tabelul de setări din baza de date**, nu în variabile de mediu.
`getMemorySettings()` citește din `getSettings()` și memorează rezultatul în cache
la nivelul procesului; `invalidateMemorySettingsCache()` este apelată de ruta PUT
a setărilor după scrieri.

### Câmpuri vechi (toate versiunile)

| Cheie DB              | Tip     | Valoare implicită                                      | Control UI                                                      |
| --------------------- | ------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (dezactivat implicit începând cu v3.8.30)      | Activarea/dezactivarea memoriei                                 |
| `memoryMaxTokens`     | integer | `2000` (interval `0–16000`)                            | Bugetul de tokenuri pentru injectare                            |
| `memoryRetentionDays` | integer | `30` (interval `1–365`)                                | Perioada de păstrare                                            |
| `memoryStrategy`      | enum    | `"hybrid"` (una dintre `recent`, `semantic`, `hybrid`) | Strategia de regăsire                                           |
| `skillsEnabled`       | boolean | `false`                                                | Comută injectarea abilităților per cheie (consultați SKILLS.md) |

Notă: strategia UI `"recent"` corespunde strategiei interne de regăsire `"exact"`
prin `toMemoryRetrievalConfig()` (ordine cronologică).

### Câmpuri noi (v3.8.6, planul 21 D9)

Consultați și secțiunea „Extinderea setărilor” de mai sus pentru descrierea câmpurilor.

| Cheie DB                    | Câmp API                 | Valoare implicită |
| --------------------------- | ------------------------ | ----------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`          |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`            |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`           |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`           |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`           |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`            |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`          |

Cheile DB asociate cu Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` cu valoarea implicită `"omniroute_memory"`,
`qdrantEmbeddingModel` cu valoarea implicită `"openai/text-embedding-3-small"`) sunt citite de
`normalizeQdrantConfig()` în `qdrant.ts`.

### Variabile de mediu (v3.8.6)

Șase variabile de mediu opționale ajustează comportamentul motorului la rulare (documentate în `.env.example`):

| Variabilă                       | Valoare implicită          | Descriere                                                                                                                                       |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL-ul cache-ului pentru înglobări (5 min)                                                                                                      |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Numărul maxim de intrări în cache-ul LRU pentru înglobări                                                                                       |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Depozitul HF pentru modelul Transformers.js                                                                                                     |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Depozitul HF pentru modelul static potion                                                                                                       |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Locația de stocare a modelelor descărcate                                                                                                       |
| `MEMORY_VEC_TOP_K`              | `20`                       | Valoarea top-K implicită pentru căutarea vectorială                                                                                             |
| `MEMORY_RRF_K`                  | `60`                       | Constanta k RRF pentru căutarea hibridă                                                                                                         |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Setați la `int8` pentru a stoca vectorii locali sqlite-vec cuantizați (de ~4 ori mai mici; opțional). Schimbarea modului forțează o reindexare. |

## Rezumare (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compactează conținutul
mai vechi atunci când totalul curent de tokenuri din memoriile unei chei depășește
bugetul. Funcția parcurge rândurile DESC după `created_at`, păstrează rândurile care
se încadrează, iar pentru restul înlocuiește local `content` cu primele trei propoziții
ale originalului. `tokensSaved` reprezintă diferența valorii `estimateTokens` dintre
conținutul vechi și cel nou.

Această rutină este **disponibilă, dar nu este apelată automat** în fluxul actual
de chat — apelați-o dintr-un cron, dintr-o acțiune administrativă sau prin codul de
integrare `MemoryConfig.autoSummarize` dacă aveți nevoie de compactare continuă.
Pierderea datelor este ireversibilă: textul original este suprascris.

## API REST

Toate endpointurile necesită autentificare de administrare (`requireManagementAuth`).

### Endpointuri de bază pentru memorie (existente + actualizate)

| Metodă   | Cale                 | Descriere                                                                                                                                                                                    |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Listă paginată cu filtre: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Răspunsul include `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                |
| `POST`   | `/api/memory`        | Creează o intrare (validată cu Zod: `content`, `key`, opțional `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Apelează `createMemory()`, care face upsert după `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Preia o singură intrare după UUID                                                                                                                                                            |
| `PUT`    | `/api/memory/[id]`   | Actualizează câmpurile intrării (`type`, `key`, `content`, `metadata`). Corp: `MemoryUpdatePutSchema`. Sincronizează și vectorul dacă sursa reprezentării embedding este disponibilă.        |
| `DELETE` | `/api/memory/[id]`   | Șterge o intrare; o șterge și din `vec_memories` (D15), precum și din Qdrant în regim best-effort. Returnează 404 dacă lipsește.                                                             |
| `GET`    | `/api/memory/health` | Rulează `verifyExtractionPipeline("health-check")` — ciclu complet creare→listare→ștergere. Returnează `{working, latencyMs, error?}`                                                        |

### Endpointuri noi ale motorului de memorie (planul 21)

| Metodă | Cale                              | Descriere                                                                                                                                                                                                             |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Simulare a `retrieveMemories` — returnează rezultate clasificate, cu scor, nivel și tokenuri. Corp: `RetrievePreviewSchema`. NU injectează și nu modifică memorii.                                                    |
| `GET`  | `/api/memory/embedding-providers` | Listează furnizorii împreună cu modelele de embedding, indicând care dintre aceștia au configurată o cheie API.                                                                                                       |
| `GET`  | `/api/memory/engine-status`       | Returnează starea completă a motorului: nivelul cuvintelor-cheie, rezoluția embeddingului, statisticile depozitului vectorial, starea Qdrant și configurația de reclasificare. Structură: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Declanșează manual compactarea memoriei. Corp: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Returnează `{candidates, tokensSaved}`.                                                              |
| `POST` | `/api/memory/reindex`             | Declanșează reindexarea vectorială pentru memoriile cu `needs_reindex=1`. Corp: `MemoryReindexSchema` (`force`). Returnează `{started, pending}`.                                                                     |

### Endpointuri pentru setări

| Metodă | Cale                                    | Descriere                                                                                             |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Valoarea `MemorySettingsExtended` normalizată curentă (7 câmpuri noi + câmpuri moștenite)             |
| `PUT`  | `/api/settings/memory`                  | Actualizează orice câmp din `MemorySettingsExtendedSchema` (12 câmpuri în total)                      |
| `GET`  | `/api/settings/qdrant`                  | Setările Qdrant curente (`QdrantSettingsSchema`)                                                      |
| `PUT`  | `/api/settings/qdrant`                  | Actualizează setările Qdrant. Corp: `QdrantSettingsUpdateSchema`. `apiKey` = șirul gol elimină cheia. |
| `GET`  | `/api/settings/qdrant/health`           | Verificare a disponibilității instanței Qdrant configurate. Returnează `QdrantHealthResultSchema`.    |
| `POST` | `/api/settings/qdrant/search`           | Test de căutare semantică în Qdrant. Corp: `QdrantSearchSchema` (`query`, `topK`).                    |
| `POST` | `/api/settings/qdrant/cleanup`          | Elimină punctele Qdrant pentru memorii expirate / vechi.                                              |
| `GET`  | `/api/settings/qdrant/embedding-models` | Listează modelele de embedding disponibile pentru Qdrant.                                             |

Interogarea listei `/api/memory` acceptă fie paginarea bazată pe `page`
(`parsePaginationParams`), **fie** valoarea brută `offset` — când `offset` este prezent,
acesta are prioritate, iar pentru structura răspunsului este calculată o valoare `page`
derivată.

## Instrumente MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Când serverul MCP este activat, sunt înregistrate trei instrumente de memorie:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → încapsulează `retrieveMemories()`. Începând cu v3.8.6 (D16), `strategy` este citită
  din `getMemorySettings()`, în loc să fie codificată explicit ca `"exact"`. Dacă
  `query` este furnizată și `strategy` este `semantic` sau `hybrid`, depozitul
  vectorial este utilizat atunci când este disponibil.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → încapsulează `createMemory()`. Acceptă doar cele 4 tipuri canonice:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → listează intrările
  corespunzătoare, le filtrează opțional după marcajul temporal „create-before”, apoi le șterge pe fiecare
  prin `deleteMemory()` (care elimină și vectorii din sqlite-vec + Qdrant).

Consultați [MCP-SERVER.md](./MCP-SERVER.md) pentru detalii despre transport și domeniul de aplicare.

## Panou de control (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` este acum un **Studio cu 3 file**:

### Filă: Memorii

- Card conceptual (explicație restrângibilă „Cum funcționează”).
- Listă în timp real, căutare și paginare (temporizare de 300 ms).
- Filtru după tip (`factual` / `episodic` / `procedural` / `semantic` / toate).
- Fereastră modală pentru adăugarea memoriei (cheie, conținut, tip).
- Editare în linie (buton creion → `PUT /api/memory/[id]`).
- Ștergere pentru fiecare rând (cu dialog de confirmare).
- Export JSON al paginii curente; import JSON prin selectorul de fișiere.
- Carduri cu statistici: `totalEntries`, `tokensUsed`, `hitRate`.
- Butonul „Compactează intrările vechi” → `POST /api/memory/summarize` (simularea inițială afișează
  numărul de candidați, apoi solicită confirmarea).
- Un indicator verde/roșu pentru starea de funcționare, actualizat prin `GET /api/memory/health`.

### Filă: Spațiu de testare

- Câmp pentru interogare + selector de strategie (Exactă / Semantică / Hibridă) + buget de tokenuri.
- „Simulează” → `POST /api/memory/retrieve-preview` — afișează rezultatele clasificate cu
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panou de rezoluție care afișează ce sursă de încorporări / depozit vectorial a fost utilizat și
  dacă s-a recurs la o variantă de rezervă.

### Filă: Motor

- Panou pentru starea motorului (indicator FTS5 pentru cuvinte-cheie, indicator pentru încorporări, indicator pentru depozitul vectorial,
  indicator pentru starea Qdrant, indicator pentru reclasificare).
- Butonul „Reindexează acum” → `POST /api/memory/reindex`.
- Selector pentru sursa încorporărilor (automat / la distanță / static / transformatoare + comutatoare).
- Card de configurare Qdrant (comutator de activare, gazdă/port/colecție/cheie, testarea conexiunii,
  test de căutare semantică, curățare).
- Card de configurare a reclasificării (comutator de activare, selector furnizor/model).

Setările pentru memorie și Qdrant sunt disponibile și în
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) pentru
interfața de setări moștenită/globală.

## Memorare în cache

`src/lib/memory/store.ts` păstrează un cache aproximativ LRU în cadrul procesului
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, cu eliminarea celor mai vechi 20 %
dintre intrări) pentru citirile `getMemory(id)`, precum și un strat generic cheie/valoare
`memoryCache` (`src/lib/memory/cache.ts`), cu metodele `get`/`set`/`invalidate`,
utilizat de apelanții care doresc propriul cache cu domeniu de aplicare specific (LRU cu 1 000 de intrări,
TTL implicit de 5 min).

## Confidențialitate și ciclu de viață

- Proprietarul memoriei este ID-ul cheii API (`resolveMemoryOwnerId` în
  `chatCore.ts`). Fără un `apiKeyInfo.id`, nu rulează nici regăsirea, nici injectarea,
  nici extragerea.
- Intrările cu un `expires_at` din viitor sunt excluse din rezultatele regăsirii; intrările
  vechi care depășesc `retentionDays` sunt excluse prin clauza
  `created_at >= cutoff` din `retrieveMemories`.
- Pentru ștergerea definitivă, utilizați `DELETE /api/memory/[id]` sau `omniroute_memory_clear`.
- Extragerea este lansată fără a se aștepta rezultatul prin `setImmediate`; erorile sunt înregistrate sub
  `memory.extraction.background.failed` și nu sunt niciodată expuse apelantului.
- Verificările complete (`verifyExtractionPipeline`) își elimină propriile
  intrări de test într-un bloc `finally`.

## Consultați și

- [SKILLS.md](./SKILLS.md) — setarea `skillsEnabled` injectează definițiile
  instrumentelor împreună cu memoria.
- [MCP-SERVER.md](./MCP-SERVER.md) — transportul / domeniile MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — suprafața API mai largă.
- Module sursă:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF hibrid
  - `src/lib/memory/embedding/index.ts` — strat de încorporare cu surse multiple
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — scheme Zod pentru toate corpurile API de memorie
  - `src/shared/schemas/qdrant.ts` — scheme Zod pentru setările/operațiunile Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD pentru `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + subrute
  - `src/app/(dashboard)/dashboard/memory/` — interfața Studio (pagină + componente +
    file + hook-uri)
  - `open-sse/handlers/chatCore.ts` (conectarea injectării / extragerii)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Alegerea unui furnizor de încorporări (v3.8.16+)

Motorul de memorie OmniRoute acceptă **patru surse de încorporări** (`src/lib/memory/embedding/`). Fiecare presupune compromisuri diferite privind **latența, costul, calitatea modelului și complexitatea configurării**.

### Sursele de încorporări

| Furnizor       | Sursă                                          | Latență                                  | Cost                   | Calitate                           | Configurare                               |
| -------------- | ---------------------------------------------- | ---------------------------------------- | ---------------------- | ---------------------------------- | ----------------------------------------- |
| `transformers` | Model ONNX local (Xenova/all-MiniLM-L6-v2)     | ~50-150ms (CPU)                          | Gratuit                | Bună                               | Doar `npm install`                        |
| `static`       | Vectori precalculați (în cache)                | <1ms                                     | Gratuit                | N/A (depinde de prezența în cache) | Niciuna                                   |
| `remote`       | API OpenAI / Cohere / Voyage                   | ~100-300ms                               | $0.02-0.10/1M tokenuri | Excelentă                          | Cheie API                                 |
| `auto`         | Alege la rulare cea mai bună sursă disponibilă | La fel ca sursa aleasă                   | Gratuit                | La fel ca sursa aleasă             | Niciuna                                   |
| _(cache)_      | Strat LRU în memorie peste orice sursă         | <1ms (găsit), latență completă (negăsit) | Gratuit                | La fel ca sursa subiacentă         | Mereu activ (nu este o sursă selectabilă) |

### Arbore decizional

```
                  Care este contextul implementării?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 DEZV./TEST   PROD. MICĂ   PROD. MARE    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratuit, fără API)        (calitate optimă) (fără internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Adăugați ÎNTOTDEAUNA stratul `cache` deasupra
            (`LruCache` învelește orice furnizor)
```

### Configurarea bazei de date și a API-ului

Opțiunile de încorporare pentru memorie sunt configurate prin API-ul/interfața de setări, nu prin variabile de mediu. Cheile relevante din baza de date pentru setări, aflate sub Setări (`normalizeMemorySettings` în `src/lib/memory/settings.ts`), sunt:

- `memoryEmbeddingSource`: `"transformers"` (local), `"remote"` (bazat pe API, de exemplu OpenAI), `"static"` (stocare externă) sau `"auto"`
- `memoryEmbeddingProviderModel`: identificatorul modelului pentru sursele remote/statice (de exemplu, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` sau `"auto"`

#### Model local (`transformers`)

Utilizează intern transformers.js pentru a rula modele locale:

```bash
# Variabile de mediu citite în cod (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Depozitul modelului HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Model potion static HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Directorul cache-ului
```

#### Cache LRU pentru încorporări

Cache-ul este întotdeauna activ în mod implicit și este configurat prin variabile de mediu:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Numărul maxim de elemente în cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Valori de performanță

Benchmark pe un server x86 tipic cu 4 nuclee (texte de aproximativ 100 de tokenuri fiecare):

| Furnizor             | p50   | p95   | p99   | Cost / 1M de înglobări             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratuit                            |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depinde de găzduirea Qdrant        |
| `cache` (reușită)    | <1ms  | <1ms  | 2ms   | Gratuit                            |

---

## Modele de extragere a faptelor (v3.8.16+)

Modulul `extraction.ts` (`src/lib/memory/extraction.ts`) utilizează **potrivirea modelelor prin expresii regulate** pentru a extrage fapte structurate din mesajele conversațiilor. Înțelegerea acestor modele vă ajută să ajustați calitatea extragerii pentru cazul dumneavoastră de utilizare.

### Categorii implicite de modele

| Categorie           | Exemplu de model                                          | Ce capturează                        |
| ------------------- | --------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"Prefer <X>"`, `"Îmi place <X>"`, `"Urăsc <X>"`          | Preferințele utilizatorului          |
| DECISION_PATTERNS   | `"Voi folosi <X>"`, `"Am decis să <X>"`, `"Am ales <X>"`  | Deciziile utilizatorului (episodice) |
| PATTERN_PATTERNS    | `"De obicei <X>"`, `"Întotdeauna <X>"`, `"Niciodată <X>"` | Modele comportamentale persistente   |

### Exemple de modele (simplificate)

```ts
// Din src/lib/memory/extraction.ts
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

### Ce se extrage

Când un utilizator spune:

> „Prefer TypeScript. Voi folosi Postgres pentru acest proiect. Fac întotdeauna commit înainte de push. Nu îmi place Python.”
> Extragerea produce 4 memorii:
>
> | Cheie                                | Categorie  | Tip      | Conținut                        |
> | ------------------------------------ | ---------- | -------- | ------------------------------- |
> | `preference:typescript`              | preference | factual  | „TypeScript”                    |
> | `decision:postgres_for_this_project` | decision   | episodic | „Postgres pentru acest proiect” |
> | `pattern:commit_before_pushing`      | pattern    | factual  | „commit înainte de push”        |
> | `preference:python`                  | preference | factual  | „Python”                        |

### Limitele extragerii

Pentru a preveni extragerea necontrolată, se aplică următoarele limite:

| Lungimea minimă a conținutului | 3 caractere |
| Lungimea maximă a conținutului | 500 caractere |

### Când să dezactivați extragerea

Extragerea rulează automat ori de câte ori memoria este activată; nu există un comutator separat
doar pentru extragere. Pentru a o opri, dezactivați complet memoria (`enabled: false`
prin `PUT /api/settings/memory`). Luați în considerare această opțiune atunci când:

- Aveți un volum mare de mesaje, iar costul extragerii nu este neglijabil
- Conversațiile dumneavoastră sunt în mare parte temporare (chat, depanare), fără valoare pe termen lung
- Capturați deja contextul prin pluginuri personalizate

---

## Ajustarea RRF hibridă (v3.8.16+)

Algoritmul **Reciprocal Rank Fusion (RRF)** combină rezultatele FTS5 (cuvinte-cheie) și vectoriale (semantice). Parametrul `k` controlează ponderea acordată rezultatelor clasate mai jos.

### Formula

Pentru fiecare memorie candidată, scorul RRF este:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Unde:

- `k` este constanta (valoarea implicită este 60)
- `rank_i(d)` este poziția documentului `d` în al i-lea sistem de regăsire (FTS, vectorial)
- Suma se calculează pentru toate sistemele de regăsire

### Cum influențează `k` rezultatele

| Valoarea `k`          | Efect                                                                                     | Recomandat pentru                               |
| --------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `k=0`                 | Fuziune pură a clasamentelor (fără netezire)                                              | Referință teoretică                             |
| `k=10-30`             | Acordă o pondere mare rezultatelor de top; pozițiile joase contribuie foarte puțin        | Când primele 3 rezultate sunt de obicei corecte |
| **`k=60`** (implicit) | Echilibrat — toate primele 10 rezultate contribuie semnificativ                           | Regăsire cu scop general                        |
| `k=100+`              | Mai uniform — chiar și rezultatele slab clasate pot domina dacă apar în mai multe sisteme | Când acoperirea > precizia este esențială       |

### Ajustarea `k` în practică

```bash
# Valoare implicită
MEMORY_RRF_K=60

# Precizie agresivă (memorie mică, puține documente)
MEMORY_RRF_K=20

# Acoperire maximă (memorie mare, interogări variate)
MEMORY_RRF_K=120
```

**Exemplu cu `k=20`:**

- Poziția FTS 1 → contribuție `1/21 = 0.048`
- Poziția FTS 10 → contribuție `1/30 = 0.033`
- Poziția vectorială 1 → contribuție `0.048`
- Maxim combinat: `0.096`

**Exemplu cu `k=60`:**

- Poziția FTS 1 → contribuție `1/61 = 0.016`
- Poziția FTS 10 → contribuție `1/70 = 0.014`
- Poziția vectorială 1 → contribuție `0.016`
- Maxim combinat: `0.033`

Cu un `k` mai mare, **diferența relativă** dintre prima poziție și poziția a zecea este mai mică, astfel încât algoritmul se bazează mai mult pe **consensul dintre sistemele de regăsire** decât pe încrederea asociată poziției de top.

### Când să modificați `k`

| Simptom                                                | Încercați                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Primul rezultat câștigă mereu, dar este greșit         | **Reduceți** k (de exemplu, 20) — încrederea în poziția de top contează mai mult |
| Răspunsul corect este în primele 5, dar nu este primul | **Măriți** k (de exemplu, 100) — punctajul mai uniform recompensează consensul   |
| Acoperirea este mare, dar precizia este scăzută        | **Reduceți** k — faceți clasamentul mai precis                                   |
| Acoperirea este scăzută (lipsesc documente relevante)  | **Măriți** k — acordați o șansă documentelor clasate mai jos                     |

### Ponderarea RRF

Fuziunea reciprocă a clasamentelor utilizează ponderi egale pentru poziția vectorială semantică și poziția din căutarea în text integral:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Nu există variabile de mediu pentru ajustarea ponderilor individuale (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` nu există).

---

## Strategia de rezumare (v3.8.16+)

Modulul `summarization.ts` (`src/lib/memory/summarization.ts`) comprimă amintirile mai vechi pentru a menține redus setul activ, păstrând în același timp capacitatea de reamintire.

### Când se declanșează rezumarea

| Declanșator                 | Prag (implicit) |
| --------------------------- | --------------- |
| Declanșare manuală prin API | nu se aplică    |

### Ce se rezumă

Din `summarization.ts` sunt exportate două puncte de intrare:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condensează
  amintirile unei sesiuni într-un singur text rezumativ, limitat de un buget de tokenuri.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — compactarea bazată pe
  vechime utilizată de API: selectează fiecare amintire mai veche de `days`, construiește
  din acestea o singură amintire rezumativă condensată și (când `dryRun` este `false`) șterge
  originalele. Transmiteți `dryRun: true` pentru a previzualiza setul de elemente candidate și
  numărul total de tokenuri fără a modifica nimic.

Nu există nicio etapă de grupare după etichetă/cheie și nicio evaluare individuală a amintirilor drept „esențiale vs. rezumabile” —
selecția se bazează exclusiv pe limita de vechime, iar textul rezumatului este alcătuit din
câte un rând condensat, prefixat cu tipul, pentru fiecare element candidat.

### Declanșarea rezumării

Rezumarea este **manuală / opțională** — setarea `autoSummarize` este `false` în mod
implicit, astfel încât nimic nu este compactat automat. Declanșați-o prin API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Pentru a o menține dezactivată, păstrați pur și simplu valoarea implicită (`false`) pentru `autoSummarize`.

### Recomandări pentru calitatea rezumării

- **Previzualizați mai întâi cu `dryRun`** — `summarizeMemoriesOlderThan(..., true)` returnează
  lista elementelor candidate și numărul total de tokenuri, astfel încât să puteți confirma ce urmează să fie combinat
  înainte de ștergerea originalelor.
- **Rulați rezumarea în perioadele cu trafic redus** dacă aveți un corpus mare de amintiri — apelul către LLM este partea lentă

```bash
# Stil cron: rezumă zilnic la ora 3 dimineața
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Modelul de furnizor MemoryBackend

> **Sursa oficială:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Teste:** `src/lib/memory/__tests__/generic-backend.test.ts`

Modelul de furnizor MemoryBackend introduce un **strat de abstractizare cu backend interschimbabil** peste motorul de memorie existent. În loc să fie dependent de o singură implementare de stocare, sistemul de memorie acceptă acum mai multe backenduri (SQLite, Obsidian, Notion, backenduri HTTP personalizate), cu rutare configurabilă principală/de rezervă.

### Arhitectură

```
┌──────────────────────────────────────────────────────────┐
│                    Rute API                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orchestrator singleton (manager.ts)                 │
│                                                          │
│  Principal ─► Backend A  (de ex. SQLite)                 │
│  Rezervă   ─► Backend B  (de ex. Obsidian)               │
│              Backend C  (de ex. Notion prin GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend de       │
│ SQLite     │ │ Obsidian   │ │ memorie generic  │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interfața principală (`backend.ts`)

Fiecare backend trebuie să implementeze interfața `MemoryBackend`:

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

  // Căutare
  search(config: SearchConfig): Promise<Memory[]>;

  // Stare de funcționare
  health(): Promise<HealthCheckResult>;

  // Ciclu de viață (opțional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orchestrator singleton care:

- **Înregistrează** backenduri prin `register(backend)` — apelat la pornire din `index.ts`
- **Configurează** backendul principal și cele de rezervă prin `configure(primary, fallbacks)`
- **Rutează** operațiunile CRUD/căutare către backendul principal, cu un lanț de rezervă în caz de eșec
- **Verifică periodic starea de funcționare** a tuturor backendurilor

**Comportamentul mecanismului de rezervă:**

| Operațiune | Principal                         | Backenduri de rezervă                     |
| ---------- | --------------------------------- | ----------------------------------------- |
| `create`   | ✅ Numai principal                | ❌                                        |
| `get`      | ✅ Încearcă mai întâi principalul | ✅ Rezervă dacă rezultatul este null      |
| `update`   | ✅ Numai principal                | ✅ Sincronizare fără a aștepta rezultatul |
| `delete`   | ✅ Numai principal                | ✅ Sincronizare fără a aștepta rezultatul |
| `list`     | ✅ Numai principal                | ❌                                        |
| `search`   | ✅ Mai întâi principalul          | ✅ Rezervă în caz de eroare               |

#### GenericMemoryBackend (`genericBackend.ts`)

Un conector HTTP generic care adaptează orice API REST la un MemoryBackend. Util pentru:

- **Notion** — conectare prin Notion API
- **Obsidian** — conectare prin Obsidian Local REST API
- **Backenduri personalizate** — orice serviciu care expune un API RESTful pentru memorie

**Configurare:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL-ul de bază al API-ului backend
  apiKey?: string;           // Token Bearer pentru autentificare
  headers?: Record<string, string>;  // Antete HTTP personalizate
  timeout?: number;          // Timp de expirare al cererii (implicit: 30000ms)
  backendType?: string;      // Pentru jurnalizare

  // Suprascrieri ale endpointurilor (valorile implicite folosesc convențiile REST)
  endpoints?: {
    search?: string;   // implicit: "/memories/search"
    create?: string;   // implicit: "/memories"
    list?: string;     // implicit: "/memories"
    get?: string;      // implicit: "/memories/{id}"
    update?: string;   // implicit: "/memories/{id}"
    delete?: string;   // implicit: "/memories/{id}"
    health?: string;   // implicit: "/health"
  };

  // Mapări ale numelor parametrilor de interogare
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapări ale numelor parametrilor de cale
  pathParams?: {
    id?/memoryId?
  };
}
```

**Backendurile cunoscute** sunt preconfigurate în `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend orientat către localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend orientat către api.notion.com/v1
```

#### Backenduri încorporate

##### SQLiteBackend (`sqliteBackend.ts`)

Backendul principal implicit. Încapsulează depozitul de memorie existent, bazat pe SQLite, utilizând `src/lib/memory/store.ts`. Este înregistrat automat la pornire.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Încapsulează integrarea Obsidian existentă (`src/lib/memory/obsidianBackend.ts`). Se conectează la un seif Obsidian prin API-ul REST local Obsidian.

### Setări

Setările backendurilor de memorie sunt stocate în tabelul cu setările aplicației și gestionate prin `src/lib/memory/settings.ts`:

| Setare                | Cheie env/config         | Valoare implicită | Descriere                                          |
| --------------------- | ------------------------ | ----------------- | -------------------------------------------------- |
| Backend principal     | `memoryPrimaryBackend`   | `"sqlite"`        | ID-ul backendului principal                        |
| Backenduri de rezervă | `memoryFallbackBackends` | `[]`              | ID-uri ordonate ale backendurilor de rezervă       |
| Configurații backend  | `memoryBackendConfigs`   | `{}`              | Suprascrieri de configurare pentru fiecare backend |

Setările sunt normalizate prin `normalizeMemorySettings()` și stocate în cache în `getMemorySettings()`.

### Fluxul de inițializare

```
Inițializarea aplicației
  → importurile index.ts (efect secundar): înregistrează SQLiteBackend
  → initMemoryBackends() este apelată din ciclul de viață al aplicației:
      1. Încarcă setările (getMemorySettings)
      2. Configurează backendul principal și backendurile de rezervă
      3. Inițializează toate backendurile (verificarea stării)
      4. Pregătit pentru cereri
```

### Adăugarea unui backend nou

1. **Implementați interfața `MemoryBackend`** în `src/lib/memory/<name>Backend.ts`
2. **Exportați** din `src/lib/memory/index.ts`
3. **Înregistrați** cu `memoryManager.register(yourBackend)` la pornire
4. **Configurați** prin setări: setați `memoryPrimaryBackend` la ID-ul backendului dvs.
5. **Testați** folosind `src/lib/memory/__tests__/generic-backend.test.ts` drept referință

#### Exemplu: backendul Brain

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

### Verificare

#### Teste unitare

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Rezultat așteptat: **35 de teste, toate reușite**, care acoperă:

- Constructor (2)
- Verificarea stării (4) — succes, eroare 500, eroare de rețea, latență
- Inițializare (2) — succes, eșec
- Creare (2) — endpoint implicit, endpoint personalizat
- Obținere (4) — succes, 404 → null, eroare non-404, parametri de cale personalizați
- Actualizare (2) — succes, 404 → false
- Ștergere (2) — succes, 404 → false
- Listare (2) — parametri de interogare, nume de parametri personalizate
- Căutare (3) — parametri de interogare, endpoint personalizat, serializarea opțiunilor
- Antete de autentificare (2) — token Bearer, antete personalizate
- Fabrică (1)

#### Verificarea tipurilor

```bash
npm run typecheck:core
```

Rezultat așteptat: **0 erori**.
