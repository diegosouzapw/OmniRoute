# Memory System (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Zdroj pravdy:** `src/lib/memory/` a `src/app/api/memory/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40 (predvolene vypnuté + dobehnutie kvantizácie int8)

OmniRoute poskytuje trvalú konverzačnú pamäť viazanú na kľúč API (a
voliteľne na ID relácie). Spomienky sa automaticky extrahujú z odpovedí LLM
pomocou jednoduchého porovnávania vzorov regulárnych výrazov a opätovne sa vkladajú do následných
požiadaviek ako úvodná systémová správa (alebo prvá používateľská správa pri poskytovateľoch, ktorí
odmietajú systémovú rolu).

> **Pamäť je predvolene VYPNUTÁ (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` je
> teraz `false` (`src/lib/memory/settings.ts`). Zapnutie pamäte vloží až
> `maxTokens` (~2k) získaného kontextu do **každej** chatovej požiadavky, čo je
> spoplatnené — ide o neočakávaný náklad pri nových inštaláciách a pre klientov, ktorí spravujú
> vlastný kontext. Zapnite ju explicitne v časti **Nastavenia → Pamäť** (karta
> `MemorySkillsTab` pri zapnutej pamäti zobrazuje upozornenie na náklady za tokeny).
> Klient môže pamäť pre jednu požiadavku vypnúť pomocou hlavičky požiadavky
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — pozrite si tabuľku hlavičiek požiadaviek v
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Požiadavka bez pamäte nastaví
> `memoryOwnerId = null`, čím sa pre danú požiadavku vypne **aj** vkladanie pamäte,
> **aj** vkladanie zručností (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Pamäť má **rozsah podľa kľúča API**, nie podľa používateľa — každá požiadavka overená
rovnakým kľúčom API zdieľa rovnaký fond pamäte, s voliteľným ďalším
vymedzením rozsahu podľa `sessionId`.

## Architektúra

```
Klient → /v1/chat/completions (apiKeyInfo vyriešené vyššie v toku)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrahuje ID
    → getMemorySettings()                     # nastavenia vo vyrovnávacej pamäti
    → shouldInjectMemory(body, {enabled})     # kontrolná brána
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + voliteľný vektor
    → injectMemory(body, memories, provider)  # systémová alebo používateľská správa
  → volanie nadradeného poskytovateľa
  → pri odpovedi: extractFacts(text, apiKeyId, sessionId)  # neblokujúce
    → setImmediate → createMemory(fact) pre každú zhodu
                   → embed(content) + upsertVector(id, vec)
```

Miesta volania na vkladanie a extrakciu sú zapojené v
`open-sse/handlers/chatCore.ts` (vyhľadajte `retrieveMemories`, `injectMemory`
a `extractFacts`).

## Architektúra enginu (3-úrovňové rozlíšenie)

Memory Engine určuje cestu získavania údajov za behu podľa dostupnej
infraštruktúry a nastavení. Existujú tri úrovne, ktoré sa uplatňujú v poradí podľa priority:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ÚROVEŇ 0 — Kľúčové slová (FTS5)                            │
  │  Dostupnosť riadená sondou: FTS5, keď ho zostava SQLite     │
  │  podporuje (better-sqlite3 / node:sqlite / bun:sqlite);     │
  │  nedostupné v zostavách bez FTS5 (napr. sql.js/WASM —       │
  │  "no such module: fts5"). Používa sa pri strategy = "exact" │
  │  alebo ako záložná možnosť; hodnota keyword v stave enginu  │
  │  zodpovedá výsledku sondy.                                  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ÚROVEŇ 1 — Vstavaný vektor (sqlite-vec)                    │
  │  sqlite-vec v0.1.9 načítané cez db.loadExtension().         │
  │  KNN hrubou silou nad vektormi Float32. Aktívne, keď:       │
  │   • načítanie sqlite-vec cez loadExtension uspeje            │
  │   • Je dostupný zdroj embeddingov (remote | static |         │
  │     transformers), ktorý dokáže vytvoriť Float32Array        │
  │   • Existuje tabuľka vec_memories (vytvorí sa pri prvom ready()) │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ÚROVEŇ 2 — Qdrant (voliteľná externá vektorová databáza)    │
  │  Keď je zapnutá, nahrádza sqlite-vec pre semantic/hybrid.    │
  │  Vyžaduje spustenú inštanciu Qdrant + nakonfigurovaný host/port. │
  └─────────────────────────────────────────────────────────────┘
```

Degradácia je automatická a transparentná:

- Ak sa sqlite-vec nepodarí načítať, úroveň 1 je nedostupná → použije sa úroveň 0.
- Ak zdroj embeddingov vráti chybu, úroveň 1 použije ako zálohu úroveň 0.
- Ak Qdrant nie je funkčný, úroveň 2 použije ako zálohu úroveň 1 (alebo úroveň 0, ak je
  nedostupná aj úroveň 1).

## Zdroje embeddingov

Vrstva embeddingov (`src/lib/memory/embedding/`) určuje, ktorý zdroj sa má použiť,
na základe `MemorySettingsExtended.embeddingSource`:

| Zdroj          | Popis                                                                          | Vyžaduje sa kľúč | Studený štart    |
| -------------- | ------------------------------------------------------------------------------ | ---------------- | ---------------- |
| `remote`       | Používa embedding API nakonfigurovaného poskytovateľa (OpenAI, Cohere atď.)    | Áno              | Žiadny           |
| `static`       | Lokálny tabuľkový embedding cez `potion-base-8M` (WordPiece + mean pooling)    | Nie              | ~200ms           |
| `transformers` | Lokálna inferencia ONNX cez `@huggingface/transformers` v4, `all-MiniLM-L6-v2` | Nie              | ~3s + ~400MB RAM |
| `auto`         | Určenie za behu: remote (ak existuje kľúč) → static → transformers → null      | Závisí           | Závisí           |

**Poradie určovania pre `auto`:**

1. Nájde prvého poskytovateľa v `listEmbeddingProviders()` s `hasKey === true` → `remote`.
2. Ak `settings.staticEnabled === true` → `static`.
3. Ak `settings.transformersEnabled === true` → `transformers`.
4. V opačnom prípade → `null` (prejde na vyhľadávanie podľa kľúčových slov pomocou FTS5).

Vyrovnávacia pamäť embeddingov (`src/lib/memory/embedding/cache.ts`) používa mapu
LRU v pamäti s kľúčom `${source}:${model}:${dim}:${sha256(text)}`, obmedzenú na
`MEMORY_EMBEDDING_CACHE_MAX` položiek (predvolene 1000) s TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (predvolene 5 min). Je zdieľaná všetkými volajúcimi
počas životného cyklu procesu.

## Hybridné RRF (k=60)

Keď je `strategy = "hybrid"` a vektorové úložisko je dostupné, načítavanie používa
Reciprocal Rank Fusion na zlúčenie výsledkov FTS5 a vektorového vyhľadávania:

```
RRF(d) = Σ  1 / (k + rank_i(d))      kde k = 60 (konfigurovateľné cez MEMORY_RRF_K)
          i
```

Konkrétne:

1. Spustí vyhľadávanie FTS5 → zoradený zoznam `R_fts` (pozície 1..N).
2. Spustí vektorové vyhľadávanie KNN → zoradený zoznam `R_vec` (pozície 1..M).
3. Pre každý jedinečný `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, ak sa v zozname nenachádza).
4. Zoradí podľa `rrf_score` zostupne a použije priechod s tokenovým rozpočtom.

Je dobre známe, že RRF je efektívne bez potreby normalizácie skóre medzi
heterogénnymi vyhľadávacími systémami. Predvolená hodnota `k=60` pochádza z pôvodnej
práce Cormacka a kol. a funguje dobre pre malé korpusy (<10k pamätí).

## Doplnenie (lenivé + preindexovanie)

Keď sa zmení model embeddingov (zistené pomocou `embedding_signature`), vektorové
úložisko sa znova vytvorí a všetky existujúce pamäte sa v tabuľke `memories`
označia hodnotou `needs_reindex = 1`.

**Lenivé doplnenie**: Pri nasledujúcom načítaní sa pre každú pamäť, ktorej chýba
vektorová položka, vytvorí embedding a vloží sa do `vec_memories` ešte pred
spustením vyhľadávania. Tým sa náklady na doplnenie rozložia medzi skutočné
požiadavky bez blokovania spustenia.

**Explicitné preindexovanie**: Karta Engine v `/dashboard/memory` poskytuje tlačidlo
„Preindexovať teraz“, ktoré volá `POST /api/memory/reindex`. Obslužná rutina volá
`runReindexBatch()` zo súboru `src/lib/memory/reindex.ts`, ktorý pri každej
požiadavke spracuje najviac `limit` čakajúcich položiek. Priebeh možno zisťovať
pomocou `GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabuľka `memory_vec_meta` (migrácia `083_memory_vec.sql`) uchováva:

- `active_dim` — aktuálny rozmer vektora (null = zatiaľ nekalibrovaný).
- `embedding_signature` — `${source}:${model}:${dim}` používaný na zisťovanie zmien.
- `last_reset_at` — časová pečiatka posledného úplného resetovania.
- `vec_loaded` — príznak 0/1 určujúci, či sa sqlite-vec úspešne načítal.

## Rozšírenie nastavení

V `MemorySettingsExtended` v
`src/shared/schemas/memory.ts` je k dispozícii deväť polí pre embeddingy a vektory,
ktoré sa ukladajú prostredníctvom `src/lib/db/settings.ts`:

| Pole                     | Typ                                                | Predvolená hodnota | Popis                                                              |
| ------------------------ | -------------------------------------------------- | ------------------ | ------------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`           | Ktorý zdroj embeddingov sa má použiť                               |
| `embeddingProviderModel` | `string \| null`                                   | `null`             | Poskytovateľ/model vo formáte `provider/model`                     |
| `customBaseUrl`          | `string \| null`                                   | `null`             | Základná URL koncového bodu kompatibilného s OpenAI, iba pre pamäť |
| `customModelId`          | `string \| null`                                   | `null`             | ID modelu odosielané vlastnému koncovému bodu                      |
| `transformersEnabled`    | `boolean`                                          | `false`            | Výslovné povolenie Transformers.js (MiniLM, ~400MB)                |
| `staticEnabled`          | `boolean`                                          | `false`            | Výslovné povolenie lokálneho statického modelu potion-base-8M      |
| `rerankEnabled`          | `boolean`                                          | `false`            | Povolenie kroku zmeny poradia (pridáva +200-500ms/požiadavku)      |
| `rerankProviderModel`    | `string \| null`                                   | `null`             | Poskytovateľ/model zmeny poradia vo formáte `provider/model`       |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`           | Ktoré vektorové úložisko sa má použiť                              |

Tieto polia sú sprístupnené prostredníctvom `GET /PUT /api/settings/memory` (schéma `MemorySettingsExtendedSchema`).

Pre zdroj `remote` podporuje Memory aj voliteľné nastavenia `customBaseUrl` a
`customModelId`. Spoločne vyberajú koncový bod `/embeddings` kompatibilný s OpenAI
a model bez zmeny globálneho registra embeddingov. Koncový bod sa pred použitím
normalizuje a kontroluje pravidlami poskytovateľa pre odchádzajúce URL: vyžaduje
sa HTTP(S), vložené prihlasovacie údaje a reťazce dopytov sa odmietajú a adresy
cloudových metadát zostávajú blokované. Prázdne hodnoty zachovajú vybraného
poskytovateľa z registra. Chyby vrátené do ovládacieho panela sú sanitizované
a prihlasovacie údaje koncového bodu sa nikdy nezaznamenávajú do protokolov.

> **TODO (D20):** Rozsah `global` (zdieľanie pamätí medzi všetkými kľúčmi API) nie je
> v tomto vydaní implementovaný. Vyžaduje zmeny schémy a globálnu cestu načítavania.
> Evidujte ho samostatne.

## Vrstvy úložiska

### Primárna vrstva: SQLite (tabuľka `memories`)

Vytvára ju migrácia `015_create_memories.sql`:

| Stĺpec                      | Typ                | Poznámky                                                                        |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID vygenerované prostredníctvom `crypto.randomUUID()`                         |
| `api_key_id`                | `TEXT NOT NULL`    | Vlastniaci kľúč API                                                             |
| `session_id`                | `TEXT`             | Voliteľný rozsah pre jednotlivú konverzáciu                                     |
| `type`                      | `TEXT NOT NULL`    | Jedna z hodnôt `factual`, `episodic`, `procedural`, `semantic`                  |
| `key`                       | `TEXT`             | Stabilný kľúč upsertu, napr. `preference:i_prefer_python`                       |
| `content`                   | `TEXT NOT NULL`    | Samotný text faktu                                                              |
| `metadata`                  | `TEXT`             | Blok JSON (category, extractedAt, source, ...)                                  |
| `created_at` / `updated_at` | `TEXT`             | Reťazce ISO 8601                                                                |
| `expires_at`                | `TEXT`             | Voliteľné vypršanie platnosti; `NULL` znamená trvalú platnosť                   |
| `memory_id`                 | `INTEGER UNIQUE`   | Pridané pomocou `023_fix_memory_fts_uuid.sql` na prepojenie UUID ↔ FTS5 rowidov |

Indexy: `api_key_id`, `session_id`, `type`, `expires_at` a tiež jedinečný
index `memory_id`.

**Sémantika upsertu**: `createMemory()` vyhľadá existujúci riadok s rovnakou
dvojicou `(api_key_id, key)` a po nájdení ho aktualizuje na mieste (pričom zlúči
`metadata` pomocou plytkého rozbalenia). Tým sa zabráni neobmedzenému rastu
tabuľky pri opakovaných vyjadreniach preferencií.

### Fulltextové vyhľadávanie (virtuálna tabuľka `memory_fts`)

`022_add_memory_fts5.sql` vytvára virtuálnu tabuľku FTS5 nad poľami `content` a
`key`. `023_fix_memory_fts_uuid.sql` opravuje chybu z reálneho používania, pri
ktorej sa primárny kľúč UUID nedal prepojiť s celočíselným rowidom FTS5 — migrácia
pridáva stĺpec `memory_id`, znova vytvára tabuľku FTS a zapája triggery
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), ktoré pri operáciách
INSERT, DELETE a UPDATE udržiavajú FTS synchronizované.

Používa ho `retrieval.ts` pre stratégie `semantic` a `hybrid` (pozri nižšie).
Kód načítavania vykonáva kontrolu pomocou `hasTable("memory_fts")` a ak tabuľka
FTS chýba alebo dopyt FTS vyvolá chybu, použije ako záložné riešenie chronologické
poradie.

### Voliteľná vrstva: Qdrant (vektorové úložisko úrovne 2)

`src/lib/memory/qdrant.ts` implementuje voliteľnú integráciu Qdrant ako vektorové
úložisko úrovne 2. Načítavanie smeruje do Qdrant iba vtedy, keď je selektor enginu
`memoryVectorStore === "qdrant"` — predvolená hodnota `"auto"` (ani `"sqlite-vec"`)
Qdrant **nikdy** nevyberie. Prepínač na karte Engine nastavuje **obe** hodnoty
`qdrantEnabled` a `memoryVectorStore` súčasne: povolením sa Qdrant nastaví ako
primárne úložisko, zakázaním sa nastavenie obnoví na `"auto"` (#5597 — pred touto
opravou nemalo povolenie žiadny účinok, pretože selektor enginu sa nikde
nezapisoval). Ak je Qdrant nedostupný alebo nič nevráti, načítavanie použije
záložné riešenie sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — vloží vektorovú reprezentáciu `key + content` pomocou nakonfigurovaného
  modelu vektorových reprezentácií, zabezpečí existenciu kolekcie (pri prvom použití vytvorí
  vektory s kosínusovou vzdialenosťou) a vloží alebo aktualizuje bod s údajmi `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — vloží vektorovú reprezentáciu dotazu, prehľadá
  kolekciu filtrovanú podľa `kind = "omniroute_memory"` a voliteľne podľa
  `apiKeyId` / `sessionId`. Obmedzí `topK` na rozsah `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — odstránenie jedného bodu. Volá ho
  `deleteMemory()` po odstránení riadka zo SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — hromadne odstráni body, ktorých
  `expiresAtUnix` je v minulosti alebo ktorých `createdAtUnix` je staršie než
  hranica uchovávania. Najprv ich spočíta, aby ovládací panel mohol zobraziť skutočné počty.
- `checkQdrantHealth()` — kontrola stavu `GET /readyz` s meraním latencie.

Používateľské rozhranie nastavení sprístupňuje konfiguráciu Qdrant, kontrolu stavu, test sémantického vyhľadávania
a čistenie na **karte Engine** v `/dashboard/memory`. Zodpovedajúce
trasy v `src/app/api/settings/qdrant/` sú od verzie v3.8.6 všetky prepojené:

| Trasa                                   | Metóda        | Popis                                               |
| --------------------------------------- | ------------- | --------------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Načítanie/aktualizácia nastavení Qdrant             |
| `/api/settings/qdrant/health`           | `GET`         | Kontrola dostupnosti + latencia                     |
| `/api/settings/qdrant/search`           | `POST`        | Test sémantického vyhľadávania                      |
| `/api/settings/qdrant/cleanup`          | `POST`        | Odstránenie exspirovaných/starých bodov             |
| `/api/settings/qdrant/embedding-models` | `GET`         | Zoznam dostupných modelov vektorových reprezentácií |

**Poznámky k správaniu (čo očakávať):**

- **Výber enginu** — povolením Qdrant na karte Engine sa z neho stane primárne
  úložisko (nastaví `memoryVectorStore="qdrant"`); zakázaním sa nastavenie obnoví na `"auto"` (#5597).
- **Bez spätného doplnenia** — zapisujú sa doň iba pamäte vytvorené/aktualizované **po** povolení Qdrant
  (duálny zápis bez čakania na výsledok). Už existujúce pamäte SQLite sa **nemigrujú**;
  „Preindexovať teraz“ znova zostaví iba index sqlite-vec, nie Qdrant.
- **Rozmer vektora sa zisťuje automaticky** zo skutočnej vektorovej reprezentácie pri prvom použití — nie je potrebné
  vypĺňať žiadne pole rozmeru. Zmena modelu vektorových reprezentácií po vytvorení kolekcie
  sa **nespracuje** automaticky: existujúca kolekcia zostane nezmenená, zápisy/vyhľadávania
  s nezhodným rozmerom zlyhajú a použije sa sqlite-vec. Ak chcete zmeniť model vektorových reprezentácií, vytvorte kolekciu
  znova (s novým názvom alebo ju odstráňte v Qdrant).
- **Metrika vzdialenosti** — vždy **kosínusová** (pevne nastavená pri vytvorení kolekcie;
  nedá sa konfigurovať).
- **Autentifikácia** — iba kľúč API (odosiela sa v hlavičke `api-key`; pre neautentifikovaný
  lokálny Docker je voliteľný). JWT/RBAC sa nepoužívajú.
- **Konfiguračné polia** — používateľské rozhranie sprístupňuje `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` sú dostupné iba cez prostredie/DB a `vectorSize` sa
  pri vytváraní kolekcie nepoužíva (rozmer pochádza z vektorovej reprezentácie).

### Kvantizácia vektorov (int8 — voliteľná, oba backendy)

Oba vektorové backendy podporujú **voliteľnú kvantizáciu int8**, ktorá znižuje pamäťovú
náročnosť uložených vektorov (približne 4× menšia než pri Float32) za cenu malého zníženia úspešnosti vyhľadávania.
Predvolene je v oboch prípadoch **vypnutá** — vektory zostávajú v plnej presnosti, pokiaľ sa
výslovne nepovolí.

| Backend    | Nastavenie                             | Typ                            | Predvolené | Miesto načítania                                            |
| ---------- | -------------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (kľúč DB)         | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (prostredie) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** sa konfiguruje pre každú inštanciu pomocou kľúča nastavenia `qdrantQuantization`
  (sprístupneného ako pole `quantization` v `PUT /api/settings/qdrant`). Pri hodnote
  `"int8"` funkcia `buildQuantizationConfig()` požaduje skalárnu kvantizáciu
  (`always_ram`, kvantil `0.99`) a vyhľadávania povolia `rescore: true`, aby
  vektory s plnou presnosťou spresnili množinu kandidátov int8.
- Kvantizácia **sqlite-vec** sa nastavuje **iba cez prostredie** (nejde o nastavenie DB): nastavte
  `MEMORY_VEC_QUANTIZATION=int8`, aby sa lokálne vektory ukladali ako stĺpec `int8[dim]`
  prostredníctvom `vec_quantize_int8(?, 'unit')`. Zvolený režim sa zahrnie do
  `embedding_signature` (prípona `:int8`), takže prepnutie režimov spustí úplné
  preindexovanie tabuľky `vec_memories` — rovnakou cestou odloženého spätného doplnenia, aká sa používa pri
  zmene modelu vektorových reprezentácií.

## Typy pamäte

`MemoryType` (`src/lib/memory/types.ts`):

| Typ          | Použitie                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------- |
| `factual`    | Preferencie, stabilné fakty o používateľovi, vzorce správania                            |
| `episodic`   | Rozhodnutia viazané na konkrétny okamih („Vybral som si Postgres“)                       |
| `procedural` | Pamäť pracovných postupov/návodov (rezervované; momentálne bez automatického extraktora) |
| `semantic`   | Rezervované pre položky vo vektorovom úložisku                                           |

Stratégia načítania `MemoryConfig` je jedna z možností `exact`, `semantic` alebo `hybrid`
a rozsah je jeden z `session`, `apiKey` alebo `global`. Predvolený rozsah z
`getMemorySettings()` je `apiKey`.

## Extrakcia faktov (`extraction.ts`)

Extrakcia je **založená na regulárnych výrazoch**, nie na LLM — vykonáva sa priamo v procese pomocou
`setImmediate()`, takže nikdy neblokuje prúd odpovede:

- **Vzory preferencií** → `MemoryType.FACTUAL`
  (napr. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Vzory rozhodnutí** → `MemoryType.EPISODIC`
  (napr. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Vzory správania** → `MemoryType.FACTUAL`
  (napr. `I usually …`, `I always …`, `I tend to …`)

Každá zhoda sa sanitizuje (`trim`, zlúčenie medzier, obmedzenie na 500 znakov),
deduplikuje v rámci dávky pomocou stabilného `factKey(category, content)` a
uloží prostredníctvom `createMemory()` s metadátami
`{category, extractedAt, source: "llm_response"}`. Vstupný text je obmedzený na
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — ak je dlhší, použije sa **koniec** textu,
aby sa vždy spracoval najnovší obsah asistenta.

`extractFactsFromText(text)` sa exportuje pre testy a vracia štruktúrované
fakty bez ich uloženia.

## Načítanie (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` je hlavný vstupný bod. Vykonáva toto:

1. Normalizuje a overí konfiguráciu prostredníctvom `MemoryConfigSchema`.
2. Okamžite vráti `[]`, keď je `enabled` nastavené na false alebo `maxTokens <= 0`.
3. Obmedzí `maxTokens` na rozsah `[1, 8000]`.
4. Zistí, či existuje moderná tabuľka `memories` (namiesto staršej tabuľky `memory`),
   aby staršie databázy naďalej fungovali.
5. Zostaví základný dopyt s kontrolou exspirácie
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), voliteľným
   rozsahom relácie a voliteľnou hranicou `retentionDays`.
6. Rozvetví sa podľa stratégie:
   - **`exact`** (predvolená): chronologické `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ak je nastavené `config.query` a existuje `memory_fts`, vykoná JOIN
     `memory_fts MATCH ?` a zoradí podľa poradia FTS; ak FTS vráti 0 riadkov,
     použije chronologické poradie.
   - **`hybrid`**: zjednotenie výsledkov FTS (vyššia relevancia) a
     chronologickej množiny, deduplikované podľa id.
7. Vypočíta skóre relevantnosti kľúčových slov (`getRelevanceScore`) nad
   `content`, `key` a JSON metadátami `metadata`, ak je zadaný dopyt. Riadky
   s nulovým skóre sa odfiltrujú.
8. Zoradí podľa skóre zostupne a potom podľa `createdAt` zostupne.
9. Prechádza zoradený zoznam a prijíma položky, kým priebežný súčet
   `estimateTokens(content)` (≈ `length / 4`) zostáva pod limitom. Ak existuje
   akákoľvek zhoda, vždy vráti aspoň jednu položku.

`estimateTokens` sa exportuje a používa pri načítaní, sumarizácii a v nástroji MCP
`omniroute_memory_search`.

## Vkladanie (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Spojí obsah všetkých pamätí do jedného reťazca `Memory context: …`.
2. Vyberie stratégiu podľa názvu poskytovateľa:
   - **Systémová správa** (predvolené pre OpenAI, Anthropic, Gemini, …) — vloží
     `{role: "system", content: memoryText}` pred všetky existujúce systémové
     správy, takže systémové pokyny používateľa majú naďalej prednosť.
   - **Používateľská správa** (záložná možnosť) — pre poskytovateľov v
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Títo odmietajú systémovú rolu,
     inak by vrátili stav 400 (pozri problém č. 1701 pre GLM/Zhipu).
3. Zaznamená počet, stratégiu a model pod `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` sa exportuje pre volajúcich, ktorí
potrebujú vykonávať vlastné rozhodnutia o smerovaní. Neznámi poskytovatelia majú
z bezpečnostných dôvodov predvolenú hodnotu `true` (systémová rola je povolená).

## Nastavenia (`settings.ts`)

Konfigurácia pamäte je **uložená v tabuľke nastavení databázy**, nie v premenných
prostredia. `getMemorySettings()` číta údaje z `getSettings()` a ukladá výsledok
do vyrovnávacej pamäte v rámci procesu; `invalidateMemorySettingsCache()` je po
zápise volaná trasou PUT pre nastavenia.

### Staršie polia (všetky verzie)

| Kľúč DB               | Typ     | Predvolená hodnota                                  | Ovládací prvok používateľského rozhrania                  |
| --------------------- | ------- | --------------------------------------------------- | --------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (predvolene vypnuté od verzie v3.8.30)      | Zapnutie/vypnutie pamäte                                  |
| `memoryMaxTokens`     | integer | `2000` (rozsah `0–16000`)                           | Rozpočet tokenov na vkladanie                             |
| `memoryRetentionDays` | integer | `30` (rozsah `1–365`)                               | Obdobie uchovávania                                       |
| `memoryStrategy`      | enum    | `"hybrid"` (jedna z `recent`, `semantic`, `hybrid`) | Stratégia vyhľadávania                                    |
| `skillsEnabled`       | boolean | `false`                                             | Prepína vkladanie zručností podľa kľúča (pozri SKILLS.md) |

Poznámka: stratégia používateľského rozhrania `"recent"` sa prostredníctvom
`toMemoryRetrievalConfig()` mapuje na internú stratégiu vyhľadávania `"exact"`
(chronologické poradie).

### Nové polia (v3.8.6, plán 21 D9)

Opis polí nájdete aj v časti „Rozšírenie nastavení“ vyššie.

| Kľúč DB                     | Pole API                 | Predvolená hodnota |
| --------------------------- | ------------------------ | ------------------ |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`           |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`             |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`            |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`            |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`            |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`             |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`           |

Kľúče DB súvisiace s Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` s predvolenou hodnotou `"omniroute_memory"`,
`qdrantEmbeddingModel` s predvolenou hodnotou `"openai/text-embedding-3-small"`)
číta funkcia `normalizeQdrantConfig()` v súbore `qdrant.ts`.

### Premenné prostredia (v3.8.6)

Šesť voliteľných premenných prostredia upravuje správanie jadra počas behu
(zdokumentované v `.env.example`):

| Premenná                        | Predvolená hodnota         | Opis                                                                                                                                               |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL vyrovnávacej pamäte embeddingov (5 min)                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maximálny počet záznamov vo vyrovnávacej pamäti embeddingov typu LRU                                                                               |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repozitár HF pre model Transformers.js                                                                                                             |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repozitár HF pre statický model potion                                                                                                             |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Miesto na ukladanie stiahnutých modelov                                                                                                            |
| `MEMORY_VEC_TOP_K`              | `20`                       | Predvolená hodnota top-K pre vektorové vyhľadávanie                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | Konštanta k algoritmu RRF pre hybridné vyhľadávanie                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Nastavením na `int8` sa lokálne vektory sqlite-vec uložia kvantizované (približne 4× menšie; voliteľné). Zmena režimu vynúti opätovné indexovanie. |

## Sumarizácia (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` zhutňuje starší
obsah, keď priebežný celkový počet tokenov v pamätiach kľúča prekročí
rozpočet. Iteruje riadky zostupne podľa `created_at`, ponechá riadky, ktoré sa
zmestia, a v ostatných nahradí `content` priamo na mieste prvými tromi vetami
pôvodného obsahu. `tokensSaved` predstavuje rozdiel v `estimateTokens` medzi
starým a novým obsahom.

Táto rutina je v aktuálnom procese chatu **dostupná, ale nevolá sa automaticky**
— ak potrebujete priebežné zhutňovanie, volajte ju z úlohy cron, administrátorskej
akcie alebo prepojovacej logiky `MemoryConfig.autoSummarize`. Strata údajov je
jednosmerná: pôvodný text sa prepíše.

## REST API

Všetky koncové body vyžadujú autentifikáciu správy (`requireManagementAuth`).

### Základné koncové body pamäte (existujúce + aktualizované)

| Metóda   | Cesta                | Popis                                                                                                                                                                                          |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Stránkovaný zoznam s filtrami: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odpoveď obsahuje `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`              |
| `POST`   | `/api/memory`        | Vytvorí záznam (overené pomocou Zod: `content`, `key`, voliteľné `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Volá `createMemory()`, ktoré vykoná upsert podľa `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Načíta jeden záznam podľa UUID                                                                                                                                                                 |
| `PUT`    | `/api/memory/[id]`   | Aktualizuje polia záznamu (`type`, `key`, `content`, `metadata`). Telo: `MemoryUpdatePutSchema`. Ak je dostupný zdroj embeddingu, synchronizuje aj vektor.                                     |
| `DELETE` | `/api/memory/[id]`   | Odstráni záznam; zároveň ho odstráni z `vec_memories` (D15) a podľa možností aj z Qdrant. Ak záznam neexistuje, vráti 404.                                                                     |
| `GET`    | `/api/memory/health` | Spustí `verifyExtractionPipeline("health-check")` — cyklus vytvorenie→výpis→odstránenie. Vráti `{working, latencyMs, error?}`                                                                  |

### Nové koncové body pamäťového mechanizmu (plán 21)

| Metóda | Cesta                             | Popis                                                                                                                                                                                        |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Skúšobné spustenie `retrieveMemories` — vráti zoradené výsledky so skóre, úrovňou a tokenmi. Telo: `RetrievePreviewSchema`. NEVKLADÁ ani neupravuje pamäte.                                  |
| `GET`  | `/api/memory/embedding-providers` | Vypíše poskytovateľov s embeddingovými modelmi a uvedie, ktorí majú nakonfigurovaný API kľúč.                                                                                                |
| `GET`  | `/api/memory/engine-status`       | Vráti úplný stav mechanizmu: kľúčovú úroveň, rozlíšenie embeddingu, štatistiky vektorového úložiska, stav Qdrant a konfiguráciu opätovného zoradenia. Štruktúra: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Manuálne spustí zhutnenie pamäte. Telo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Vráti `{candidates, tokensSaved}`.                                                 |
| `POST` | `/api/memory/reindex`             | Spustí opätovné indexovanie vektorov pre pamäte s `needs_reindex=1`. Telo: `MemoryReindexSchema` (`force`). Vráti `{started, pending}`.                                                      |

### Koncové body nastavení

| Metóda | Cesta                                   | Popis                                                                                                        |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Aktuálny normalizovaný objekt `MemorySettingsExtended` (7 nových polí + staršie polia)                       |
| `PUT`  | `/api/settings/memory`                  | Aktualizuje ľubovoľné pole zo schémy `MemorySettingsExtendedSchema` (celkovo 12 polí)                        |
| `GET`  | `/api/settings/qdrant`                  | Aktuálne nastavenia Qdrant (`QdrantSettingsSchema`)                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Aktualizuje nastavenia Qdrant. Telo: `QdrantSettingsUpdateSchema`. `apiKey` = prázdny reťazec odstráni kľúč. |
| `GET`  | `/api/settings/qdrant/health`           | Kontrola dostupnosti nakonfigurovanej inštancie Qdrant. Vráti `QdrantHealthResultSchema`.                    |
| `POST` | `/api/settings/qdrant/search`           | Test sémantického vyhľadávania v Qdrant. Telo: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | Odstráni z Qdrant body pre exspirované/staré pamäte.                                                         |
| `GET`  | `/api/settings/qdrant/embedding-models` | Vypíše embeddingové modely dostupné pre Qdrant.                                                              |

Dotaz zoznamu `/api/memory` podporuje buď stránkovanie založené na `page`
(`parsePaginationParams`), **alebo** priamy parameter `offset` — ak je prítomný
`offset`, má prednosť a pre štruktúru odpovede sa vypočíta odvodená hodnota
`page`.

## Nástroje MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Keď je server MCP povolený, zaregistrujú sa tri pamäťové nástroje:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → zapuzdruje `retrieveMemories()`. Od verzie v3.8.6 (D16) sa `strategy` načítava
  z `getMemorySettings()` namiesto pevného nastavenia na `"exact"`. Ak je
  zadané `query` a `strategy` je `semantic` alebo `hybrid`, použije sa vektorové
  úložisko, ak je dostupné.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → zapuzdruje `createMemory()`. Prijíma iba 4 kanonické typy:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → vypíše zodpovedajúce
  záznamy, voliteľne ich vyfiltruje podľa časovej pečiatky vytvorenia pred určeným
  dátumom a potom každý odstráni prostredníctvom `deleteMemory()` (ktoré zároveň
  odstráni vektory zo sqlite-vec + Qdrant).

Podrobnosti o prenose a rozsahu nájdete v [MCP-SERVER.md](./MCP-SERVER.md).

## Ovládací panel (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` je teraz **štúdio s 3 kartami**:

### Karta: Pamäte

- Karta s konceptom (zbaliteľné vysvetlenie „Ako to funguje“).
- Zoznam v reálnom čase, vyhľadávanie a stránkovanie (oneskorenie 300 ms).
- Filter typov (`factual` / `episodic` / `procedural` / `semantic` / všetky).
- Modálne okno na pridanie pamäte (kľúč, obsah, typ).
- Úprava priamo na mieste (tlačidlo s ceruzkou → `PUT /api/memory/[id]`).
- Odstránenie jednotlivých riadkov (s potvrdzovacím dialógovým oknom).
- Export aktuálnej stránky do formátu JSON; import súboru JSON prostredníctvom výberu súboru.
- Karty so štatistikami: `totalEntries`, `tokensUsed`, `hitRate`.
- Tlačidlo „Kompaktovať staré“ → `POST /api/memory/summarize` (najprv sa pri skúšobnom
  spustení zobrazí počet kandidátov, potom sa vyžiada potvrdenie).
- Zelený/červený indikátor stavu riadený požiadavkou `GET /api/memory/health`.

### Karta: Testovacie prostredie

- Vstup pre dopyt + výber stratégie (Presná / Sémantická / Hybridná) + rozpočet tokenov.
- „Simulovať“ → `POST /api/memory/retrieve-preview` — zobrazí zoradené výsledky s
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel rozlíšenia zobrazujúci, ktorý zdroj embeddingov/vektorové úložisko sa použilo
  a či došlo k použitiu záložného riešenia.

### Karta: Engine

- Panel stavu enginu (indikátor kľúčových slov FTS5, indikátor embeddingov, indikátor vektorového úložiska,
  indikátor stavu Qdrant, indikátor opätovného zoradenia).
- Tlačidlo „Reindexovať teraz“ → `POST /api/memory/reindex`.
- Výber zdroja embeddingov (automatický / vzdialený / statický / transformers + prepínače).
- Karta konfigurácie Qdrant (prepínač povolenia, hostiteľ/port/kolekcia/kľúč, test pripojenia,
  test sémantického vyhľadávania, vyčistenie).
- Karta konfigurácie opätovného zoradenia (prepínač povolenia, výber poskytovateľa/modelu).

Nastavenia pamäte a Qdrant sa nachádzajú aj v časti
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) ako
staršie/globálne rozhranie nastavení.

## Ukladanie do vyrovnávacej pamäte

`src/lib/memory/store.ts` udržiava vyrovnávaciu pamäť podobnú LRU v rámci procesu
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, s odstránením 20 %
najstarších položiek) pre čítania `getMemory(id)`, ako aj všeobecnú vrstvu
`memoryCache` typu kľúč/hodnota (`src/lib/memory/cache.ts`) s metódami `get`/`set`/`invalidate`,
ktorú používajú volajúci vyžadujúci vlastnú vyrovnávaciu pamäť s konkrétnym rozsahom (LRU s 1 000 položkami,
predvolená hodnota TTL je 5 min).

## Súkromie a životný cyklus

- Vlastníkom pamäte je ID kľúča API (`resolveMemoryOwnerId` v
  `chatCore.ts`). Bez `apiKeyInfo.id` sa nevykonáva načítanie, vloženie
  ani extrakcia.
- Záznamy s budúcou hodnotou `expires_at` sa z načítania odfiltrujú; staré
  záznamy presahujúce `retentionDays` sú vylúčené pomocou podmienky
  `created_at >= cutoff` vo funkcii `retrieveMemories`.
- Na trvalé odstránenie použite `DELETE /api/memory/[id]` alebo `omniroute_memory_clear`.
- Extrakcia sa vykonáva asynchrónne bez čakania na výsledok prostredníctvom `setImmediate`; zlyhania sa zaznamenávajú pod
  `memory.extraction.background.failed` a volajúcemu sa nikdy nezobrazia.
- Overovacie cykly (`verifyExtractionPipeline`) odstránia svoje vlastné
  testovacie záznamy v bloku `finally`.

## Pozrite tiež

- [SKILLS.md](./SKILLS.md) — nastavenie `skillsEnabled` vkladá definície
  nástrojov spolu s pamäťou.
- [MCP-SERVER.md](./MCP-SERVER.md) — prenos MCP / rozsahy.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — širšie rozhranie API.
- Zdrojové moduly:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybridné RRF
  - `src/lib/memory/embedding/index.ts` — vrstva vkladania z viacerých zdrojov
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schémy Zod pre všetky telá rozhrania API pamäte
  - `src/shared/schemas/qdrant.ts` — schémy Zod pre nastavenia/operácie Qdrant
  - `src/lib/db/memoryVec.ts` — operácie CRUD pre `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + podriadené trasy
  - `src/app/(dashboard)/dashboard/memory/` — používateľské rozhranie Studio (stránka + komponenty +
    karty + hooky)
  - `open-sse/handlers/chatCore.ts` (prepojenie vkladania / extrakcie)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Výber poskytovateľa vkladania (v3.8.16+)

Pamäťový mechanizmus OmniRoute podporuje **štyri zdroje vkladania** (`src/lib/memory/embedding/`). Každý ponúka iné kompromisy z hľadiska **latencie, nákladov, kvality modelu a zložitosti nastavenia**.

### Zdroje vkladania

| Poskytovateľ   | Zdroj                                              | Latencia                                  | Náklady               | Kvalita                                                    | Nastavenie                               |
| -------------- | -------------------------------------------------- | ----------------------------------------- | --------------------- | ---------------------------------------------------------- | ---------------------------------------- |
| `transformers` | Lokálny model ONNX (Xenova/all-MiniLM-L6-v2)       | ~50-150ms (CPU)                           | Bezplatné             | Dobrá                                                      | Iba `npm install`                        |
| `static`       | Vopred vypočítané vektory (vo vyrovnávacej pamäti) | <1ms                                      | Bezplatné             | Neuplatňuje sa (závisí od nájdenia vo vyrovnávacej pamäti) | Žiadne                                   |
| `remote`       | API OpenAI / Cohere / Voyage                       | ~100-300ms                                | $0.02-0.10/1M tokenov | Vynikajúca                                                 | Kľúč API                                 |
| `auto`         | Za behu vyberie najlepší dostupný zdroj            | Rovnaká ako pri vybranom zdroji           | Bezplatné             | Rovnaká ako pri vybranom zdroji                            | Žiadne                                   |
| _(cache)_      | Vrstva LRU v pamäti nad ľubovoľným zdrojom         | <1ms (nájdené), plná latencia (nenájdené) | Bezplatné             | Rovnaká ako pri podkladovom zdroji                         | Vždy zapnutá (nie je voliteľným zdrojom) |

### Rozhodovací strom

```
                  Aký je kontext vášho nasadenia?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  VÝVOJ/TEST  MALÁ PROD.   VEĽKÁ PROD.   EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (bezplatné, bez API)       (najlepšia kvalita) (bez internetu)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            VŽDY pridajte navrch vrstvu `cache`
            (LruCache obaľuje ľubovoľného poskytovateľa)
```

### Konfigurácia databázy a API

Možnosti vkladania pamäte sa konfigurujú prostredníctvom API/používateľského rozhrania nastavení, nie pomocou premenných prostredia. Príslušné databázové kľúče nastavení v časti Nastavenia (`normalizeMemorySettings` v `src/lib/memory/settings.ts`) sú:

- `memoryEmbeddingSource`: `"transformers"` (lokálne), `"remote"` (založené na API, napr. OpenAI), `"static"` (externé úložisko) alebo `"auto"`
- `memoryEmbeddingProviderModel`: Identifikátor modelu pre vzdialené/statické zdroje (napr. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` alebo `"auto"`

#### Lokálny model (`transformers`)

Interne používa transformers.js na spúšťanie lokálnych modelov:

```bash
# Premenné prostredia načítané v kóde (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repozitár modelu HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statický model potion z HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Adresár vyrovnávacej pamäte
```

#### Vyrovnávacia pamäť vkladania LRU

Vyrovnávacia pamäť je predvolene vždy zapnutá a konfiguruje sa prostredníctvom premenných prostredia:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maximálny počet položiek vo vyrovnávacej pamäti
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Výkonnostné údaje

Benchmark na typickom 4-jadrovom serveri x86 (texty s približne 100 tokenmi):

| Poskytovateľ         | p50   | p95   | p99   | Náklady / 1 mil. embeddingov       |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Zadarmo                            |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Závisí od hostingu Qdrant          |
| `cache` (zásah)      | <1ms  | <1ms  | 2ms   | Zadarmo                            |

---

## Vzory extrakcie faktov (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) používa **porovnávanie pomocou regulárnych výrazov** na extrakciu štruktúrovaných faktov zo správ konverzácie. Pochopenie týchto vzorov vám pomôže vyladiť kvalitu extrakcie pre váš prípad použitia.

### Predvolené kategórie vzorov

| Kategória           | Príklad vzoru                                                 | Zachytáva                            |
| ------------------- | ------------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"Preferujem <X>"`, `"Mám rád <X>"`, `"Neznášam <X>"`         | Preferencie používateľa              |
| DECISION_PATTERNS   | `"Použijem <X>"`, `"Rozhodol som sa <X>"`, `"Vybral som <X>"` | Rozhodnutia používateľa (epizodické) |
| PATTERN_PATTERNS    | `"Zvyčajne <X>"`, `"Vždy <X>"`, `"Nikdy <X>"`                 | Trvalé vzorce správania              |

### Príklady vzorov (zjednodušené)

```ts
// Zo súboru src/lib/memory/extraction.ts
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

### Čo sa extrahuje

Keď používateľ povie:

> "Preferujem TypeScript. Pre tento projekt použijem Postgres. Pred odoslaním zmien vždy vykonám commit. Nemám rád Python."
> Extrakcia vytvorí 4 pamäťové záznamy:
>
> | Kľúč                                 | Kategória   | Typ        | Obsah                         |
> | ------------------------------------ | ----------- | ---------- | ----------------------------- |
> | `preference:typescript`              | preferencia | faktický   | "TypeScript"                  |
> | `decision:postgres_for_this_project` | rozhodnutie | epizodický | "Postgres pre tento projekt"  |
> | `pattern:commit_before_pushing`      | vzor        | faktický   | "commit pred odoslaním zmien" |
> | `preference:python`                  | preferencia | faktický   | "Python"                      |

### Limity extrakcie

Aby sa zabránilo nekontrolovanej extrakcii, platia nasledujúce limity:

| Minimálna dĺžka obsahu | 3 znaky |
| Maximálna dĺžka obsahu | 500 znakov |

### Kedy vypnúť extrakciu

Extrakcia sa spúšťa automaticky vždy, keď je povolená pamäť; neexistuje samostatný
prepínač iba pre extrakciu. Ak ju chcete vypnúť, úplne zakážte pamäť (`enabled: false`
prostredníctvom `PUT /api/settings/memory`). Zvážte to v nasledujúcich prípadoch:

- Máte veľký objem správ a náklady na extrakciu nie sú zanedbateľné
- Vaše konverzácie sú prevažne dočasné (chat, ladenie) a nemajú dlhodobú hodnotu
- Kontext už zachytávate pomocou vlastných pluginov

---

## Ladenie hybridného RRF (v3.8.16+)

Algoritmus **Reciprocal Rank Fusion (RRF)** kombinuje výsledky FTS5 (kľúčové slová) a vektorového (sémantického) vyhľadávania. Parameter `k` určuje, aká váha sa priradí výsledkom s nižším poradím.

### Vzorec

Pre každý kandidátsky pamäťový záznam je skóre RRF:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Kde:

- `k` je konštanta (predvolená hodnota 60)
- `rank_i(d)` je poradie dokumentu `d` v i-tom vyhľadávacom systéme (FTS, vektor)
- Súčet zahŕňa všetky vyhľadávacie systémy

### Ako `k` ovplyvňuje výsledky

| Hodnota `k`             | Účinok                                                                                        | Najvhodnejšie pre                       |
| ----------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------- |
| `k=0`                   | Čistá fúzia poradí (bez vyhladzovania)                                                        | Teoretická základná hodnota             |
| `k=10-30`               | Výrazne zvýhodňuje najlepšie výsledky, nízke poradie prispieva len minimálne                  | Keď sú prvé 3 výsledky zvyčajne správne |
| **`k=60`** (predvolené) | Vyvážené — všetkých prvých 10 výsledkov zmysluplne prispieva                                  | Všeobecné vyhľadávanie                  |
| `k=100+`                | Plochšie — aj výsledky s nízkym poradím môžu dominovať, ak sa zobrazia vo viacerých systémoch | Keď je úplnosť > presnosť rozhodujúca   |

### Ladenie `k` v praxi

```bash
# Predvolené
MEMORY_RRF_K=60

# Agresívna presnosť (malá pamäť, málo dokumentov)
MEMORY_RRF_K=20

# Maximálna úplnosť (veľká pamäť, rôznorodé dopyty)
MEMORY_RRF_K=120
```

**Príklad s `k=20`:**

- Poradie FTS 1 → príspevok `1/21 = 0.048`
- Poradie FTS 10 → príspevok `1/30 = 0.033`
- Poradie vektora 1 → príspevok `0.048`
- Kombinované maximum: `0.096`

**Príklad s `k=60`:**

- Poradie FTS 1 → príspevok `1/61 = 0.016`
- Poradie FTS 10 → príspevok `1/70 = 0.014`
- Poradie vektora 1 → príspevok `0.016`
- Kombinované maximum: `0.033`

Pri vyššom `k` je **relatívny rozdiel** medzi prvým a desiatym miestom menší, takže algoritmus sa viac spolieha na **zhodu medzi vyhľadávacími systémami** než na istotu najvyššieho poradia.

### Kedy zmeniť `k`

| Príznak                                         | Skúste                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Najlepší výsledok vždy vyhrá, ale je nesprávny  | **Nižšie** k (napr. 20) — istota najvyššieho poradia je dôležitejšia |
| Správna odpoveď je medzi prvými 5, ale nie prvá | **Vyššie** k (napr. 100) — plochejšie skórovanie odmeňuje zhodu      |
| Úplnosť je vysoká, ale presnosť nízka           | **Nižšie** k — zvýraznite rozdiely v poradí                          |
| Úplnosť je nízka (chýbajú relevantné dokumenty) | **Vyššie** k — dajte šancu dokumentom s nižším poradím               |

### Váhovanie RRF

Recipročná fúzia poradí používa rovnaké váhy pre sémantické vektorové poradie a poradie fulltextového vyhľadávania:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Na úpravu jednotlivých váh neexistujú žiadne premenné prostredia (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` neexistujú).

---

## Stratégia sumarizácie (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) komprimuje staršie pamäte, aby aktívna množina zostala malá, pričom zachováva možnosť ich vyvolania.

### Kedy sa spúšťa sumarizácia

| Spúšťač                    | Prahová hodnota (predvolená) |
| -------------------------- | ---------------------------- |
| Manuálne spustenie cez API | nevzťahuje sa                |

### Čo sa sumarizuje

Zo súboru `summarization.ts` sa exportujú dva vstupné body:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — skondenzuje
  pamäte relácie do jedného súhrnného textu obmedzeného rozpočtom tokenov.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — komprimácia na základe
  veku používaná rozhraním API: vyberie každú pamäť staršiu než `days`, vytvorí
  z nich jednu skondenzovanú súhrnnú pamäť a (keď je `dryRun` nastavené na `false`)
  odstráni originály. Odovzdaním `dryRun: true` zobrazíte náhľad množiny kandidátov
  a celkového počtu tokenov bez toho, aby sa čokoľvek zmenilo.

Nevykonáva sa žiadne zoskupovanie podľa značiek/kľúčov ani hodnotenie jednotlivých pamätí
typu „jadro vs. sumarizovateľné“ — výber je založený výlučne na vekovej hranici
a text súhrnu obsahuje pre každého kandidáta skondenzovaný riadok s prefixom typu.

### Spustenie sumarizácie

Sumarizácia je **manuálna / voliteľná** — nastavenie `autoSummarize` má predvolene
hodnotu `false`, takže sa nič nekomprimuje automaticky. Spustite ju cez API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Ak ju chcete ponechať vypnutú, jednoducho nechajte `autoSummarize` na predvolenej
hodnote (`false`).

### Tipy na kvalitu sumarizácie

- **Najprv zobrazte náhľad pomocou `dryRun`** — `summarizeMemoriesOlderThan(..., true)`
  vráti zoznam kandidátov a celkový počet tokenov, aby ste mohli pred odstránením
  originálov potvrdiť, čo sa zlúči.
- **Sumarizáciu spúšťajte v čase nízkej prevádzky**, ak máte veľký korpus pamätí — volanie LLM je najpomalšia časť

```bash
# V štýle cronu: sumarizovať denne o 3:00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Vzor poskytovateľa MemoryBackend

> **Zdroj pravdy:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testy:** `src/lib/memory/__tests__/generic-backend.test.ts`

Vzor poskytovateľa MemoryBackend zavádza nad existujúcim pamäťovým jadrom **vrstvu abstrakcie s vymeniteľnými backendmi**. Namiesto väzby na jedinú implementáciu úložiska teraz pamäťový systém podporuje viacero backendov (SQLite, Obsidian, Notion, vlastné HTTP backendy) s konfigurovateľným smerovaním na primárny a záložné backendy.

### Architektúra

```
┌──────────────────────────────────────────────────────────┐
│                    Trasy API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Koordinátor typu singleton (manager.ts)             │
│                                                          │
│  Primárny ──► Backend A  (napr. SQLite)                  │
│  Záložný  ──► Backend B  (napr. Obsidian)                │
│              Backend C  (napr. Notion cez GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ backend    │ │ backend    │ │ backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Základné rozhranie (`backend.ts`)

Každý backend musí implementovať rozhranie `MemoryBackend`:

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

  // Vyhľadávanie
  search(config: SearchConfig): Promise<Memory[]>;

  // Stav
  health(): Promise<HealthCheckResult>;

  // Životný cyklus (voliteľné)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Koordinátor typu singleton, ktorý:

- **Registruje** backendy prostredníctvom `register(backend)` — volá sa pri spustení zo súboru `index.ts`
- **Konfiguruje** primárny a záložné backendy prostredníctvom `configure(primary, fallbacks)`
- **Smeruje** operácie CRUD a vyhľadávanie na primárny backend, pričom pri zlyhaní používa reťaz záložných backendov
- **Kontroluje stav** všetkých backendov v pravidelných intervaloch

**Správanie záložných backendov:**

| Operácia | Primárny                  | Záložné                         |
| -------- | ------------------------- | ------------------------------- |
| `create` | ✅ Iba primárny           | ❌                              |
| `get`    | ✅ Najprv skúsiť primárny | ✅ Záložný, ak je výsledok null |
| `update` | ✅ Iba primárny           | ✅ Asynchrónna synchronizácia   |
| `delete` | ✅ Iba primárny           | ✅ Asynchrónna synchronizácia   |
| `list`   | ✅ Iba primárny           | ❌                              |
| `search` | ✅ Najprv primárny        | ✅ Záložný pri chybe            |

#### GenericMemoryBackend (`genericBackend.ts`)

Všeobecný HTTP konektor, ktorý prispôsobí ľubovoľné REST API na MemoryBackend. Je užitočný pre:

- **Notion** — pripojenie prostredníctvom Notion API
- **Obsidian** — pripojenie prostredníctvom Obsidian Local REST API
- **Vlastné backendy** — ľubovoľná služba, ktorá poskytuje RESTful API pre pamäť

**Konfigurácia:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Základná URL adresa backendového API
  apiKey?: string;           // Token Bearer na autentifikáciu
  headers?: Record<string, string>;  // Vlastné HTTP hlavičky
  timeout?: number;          // Časový limit požiadavky (predvolene: 30000ms)
  backendType?: string;      // Na zaznamenávanie do denníka

  // Prepísania koncových bodov (predvolené hodnoty používajú konvencie REST)
  endpoints?: {
    search?: string;   // predvolené: "/memories/search"
    create?: string;   // predvolené: "/memories"
    list?: string;     // predvolené: "/memories"
    get?: string;      // predvolené: "/memories/{id}"
    update?: string;   // predvolené: "/memories/{id}"
    delete?: string;   // predvolené: "/memories/{id}"
    health?: string;   // predvolené: "/health"
  };

  // Mapovania názvov parametrov dotazu
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapovania názvov parametrov cesty
  pathParams?: {
    id?/memoryId?
  };
}
```

**Známe backendy** sú vopred nakonfigurované v `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend smerujúci na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend smerujúci na api.notion.com/v1
```

#### Vstavané backendy

##### SQLiteBackend (`sqliteBackend.ts`)

Predvolený primárny backend. Zapuzdruje existujúce úložisko pamäte založené na SQLite pomocou `src/lib/memory/store.ts`. Automaticky sa registruje pri spustení.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Zapuzdruje existujúcu integráciu Obsidian (`src/lib/memory/obsidianBackend.ts`). Pripája sa k trezoru Obsidian prostredníctvom lokálneho REST API Obsidian.

### Nastavenia

Nastavenia backendu pamäte sú uložené v tabuľke nastavení aplikácie a spravované prostredníctvom `src/lib/memory/settings.ts`:

| Nastavenie             | Kľúč prostredia/konfigurácie | Predvolená hodnota | Popis                                           |
| ---------------------- | ---------------------------- | ------------------ | ----------------------------------------------- |
| Primárny backend       | `memoryPrimaryBackend`       | `"sqlite"`         | ID primárneho backendu                          |
| Záložné backendy       | `memoryFallbackBackends`     | `[]`               | Zoradené ID záložných backendov                 |
| Konfigurácie backendov | `memoryBackendConfigs`       | `{}`               | Prepísania konfigurácie pre jednotlivé backendy |

Nastavenia sa normalizujú prostredníctvom `normalizeMemorySettings()` a ukladajú do vyrovnávacej pamäte v `getMemorySettings()`.

### Priebeh inicializácie

```
Spustenie aplikácie
  → importy index.ts (vedľajší účinok): zaregistrujú SQLiteBackend
  → initMemoryBackends() volaná zo životného cyklu aplikácie:
      1. Načítať nastavenia (getMemorySettings)
      2. Nakonfigurovať primárny + záložné backendy
      3. Inicializovať všetky backendy (kontrola stavu)
      4. Pripravené na požiadavky
```

### Pridanie nového backendu

1. **Implementujte rozhranie `MemoryBackend`** v `src/lib/memory/<name>Backend.ts`
2. **Exportujte** z `src/lib/memory/index.ts`
3. **Zaregistrujte** pomocou `memoryManager.register(yourBackend)` pri spustení
4. **Nakonfigurujte** prostredníctvom nastavení: nastavte `memoryPrimaryBackend` na ID svojho backendu
5. **Otestujte** podľa `src/lib/memory/__tests__/generic-backend.test.ts`

#### Príklad: Backend Brain

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

### Overenie

#### Jednotkové testy

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Očakávaný výstup: **35 testov, všetky úspešné**, ktoré pokrývajú:

- Konštruktor (2)
- Kontrola stavu (4) — úspech, zlyhanie 500, chyba siete, latencia
- Inicializácia (2) — úspech, zlyhanie
- Vytvorenie (2) — predvolený koncový bod, vlastný koncový bod
- Získanie (4) — úspech, 404 → null, vyvolanie výnimky pri inom kóde ako 404, vlastné parametre cesty
- Aktualizácia (2) — úspech, 404 → false
- Odstránenie (2) — úspech, 404 → false
- Výpis (2) — parametre dotazu, vlastné názvy parametrov
- Vyhľadávanie (3) — parametre dotazu, vlastný koncový bod, serializácia možností
- Autentifikačné hlavičky (2) — token Bearer, vlastné hlavičky
- Továreň (1)

#### Kontrola typov

```bash
npm run typecheck:core
```

Očakáva sa: **0 chýb**.
