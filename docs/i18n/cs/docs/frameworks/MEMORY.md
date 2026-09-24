# Memory System (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Zdroj pravdy:** `src/lib/memory/` a `src/app/api/memory/`
> **Naposledy aktualizováno:** 2026-06-28 — v3.8.40 (ve výchozím nastavení vypnuto + doplnění kvantizace int8)

OmniRoute poskytuje trvalou konverzační paměť vázanou na klíč API (a
volitelně na ID relace). Vzpomínky se automaticky extrahují z odpovědí LLM
pomocí jednoduchého porovnávání regulárních výrazů a znovu se vkládají do
následujících požadavků jako úvodní systémová zpráva (nebo první uživatelská
zpráva u poskytovatelů, kteří odmítají systémovou roli).

> **Paměť je ve výchozím nastavení VYPNUTÁ (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> má nyní hodnotu `false` (`src/lib/memory/settings.ts`). Povolení paměti vloží
> do **každého** chatovacího požadavku až `maxTokens` (~2k) načteného kontextu,
> který je zpoplatněn — což může být neočekávaný náklad pro nové instalace a
> klienty, kteří spravují vlastní kontext. Výslovně ji zapněte v části
> **Nastavení → Paměť** (když je paměť povolena, `MemorySkillsTab` zobrazuje
> upozornění na náklady za tokeny). Klient může paměť pro jednotlivý požadavek
> vypnout pomocí hlavičky požadavku `x-omniroute-no-memory` (`true`/`1`/`yes`) —
> viz tabulka hlaviček požadavků v
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Požadavek bez paměti nastaví
> `memoryOwnerId = null`, čímž se pro daný požadavek zakáže **jak vkládání
> paměti, tak dovedností** (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Paměť je **omezena na jednotlivé klíče API**, nikoli na jednotlivé uživatele —
každý požadavek ověřený stejným klíčem API sdílí stejný fond paměti s možností
dalšího omezení pomocí `sessionId`.

## Architektura

```
Klient → /v1/chat/completions (apiKeyInfo vyřešeno dříve)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrahuje ID
    → getMemorySettings()                     # nastavení uložené v mezipaměti
    → shouldInjectMemory(body, {enabled})     # kontrolní brána
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + volitelně vektor
    → injectMemory(body, memories, provider)  # systémová nebo uživatelská zpráva
  → volání externího poskytovatele
  → při odpovědi: extractFacts(text, apiKeyId, sessionId)  # neblokující
    → setImmediate → createMemory(fact) pro každou shodu
                   → embed(content) + upsertVector(id, vec)
```

Místa volání pro vkládání a extrakci jsou zapojena v
`open-sse/handlers/chatCore.ts` (hledejte `retrieveMemories`, `injectMemory`
a `extractFacts`).

## Architektura enginu (tříúrovňové rozlišení)

Memory Engine určuje cestu načítání za běhu na základě dostupné infrastruktury
a nastavení. Existují tři úrovně, které se používají v pořadí podle priority:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ÚROVEŇ 0 — Klíčová slova (FTS5)                            │
  │  Dostupnost určená testem: FTS5, pokud ji sestavení SQLite  │
  │  podporuje (better-sqlite3 / node:sqlite / bun:sqlite);     │
  │  nedostupné v sestaveních bez FTS5 (např. sql.js/WASM —    │
  │  "no such module: fts5"). Používá se, když strategy =       │
  │  "exact", nebo jako záložní řešení; položka keyword ve      │
  │  stavu enginu odráží výsledek testu.                        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ÚROVEŇ 1 — Vestavěné vektory (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 načtené přes db.loadExtension().         │
  │  KNN hrubou silou nad vektory Float32. Aktivní, když:       │
  │   • načtení sqlite-vec přes loadExtension proběhne úspěšně  │
  │   • Je dostupný zdroj embeddingů (remote | static |         │
  │     transformers), který dokáže vytvořit Float32Array       │
  │   • existuje tabulka vec_memories (vytvořená při prvním     │
  │     volání ready())                                         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ÚROVEŇ 2 — Qdrant (volitelná externí vektorová databáze)   │
  │  Je-li povolena, nahrazuje sqlite-vec pro semantic/hybrid.  │
  │  Vyžaduje běžící instanci Qdrant + nakonfigurovaný host/port.│
  └─────────────────────────────────────────────────────────────┘
```

Degradace probíhá automaticky a transparentně:

- Pokud se sqlite-vec nepodaří načíst, úroveň 1 není dostupná → použije se
  úroveň 0.
- Pokud zdroj embeddingů vrátí chybu, úroveň 1 přejde na úroveň 0.
- Pokud Qdrant není v pořádku, úroveň 2 přejde na úroveň 1 (nebo na úroveň 0,
  pokud není dostupná ani úroveň 1).

## Zdroje embeddingů

Vrstva embeddingů (`src/lib/memory/embedding/`) určuje, který zdroj použít,
na základě `MemorySettingsExtended.embeddingSource`:

| Zdroj          | Popis                                                                                     | Vyžaduje klíč | Studený start    |
| -------------- | ----------------------------------------------------------------------------------------- | ------------- | ---------------- |
| `remote`       | Používá embeddingové API nakonfigurovaného poskytovatele (OpenAI, Cohere atd.)            | Ano           | Žádný            |
| `static`       | Lokální embedding pomocí vyhledávací tabulky `potion-base-8M` (WordPiece + průměrování)   | Ne            | ~200ms           |
| `transformers` | Lokální inference ONNX prostřednictvím `@huggingface/transformers` v4, `all-MiniLM-L6-v2` | Ne            | ~3s + ~400MB RAM |
| `auto`         | Určení za běhu: remote (pokud existuje klíč) → static → transformers → null               | Závisí        | Závisí           |

**Pořadí vyhodnocování pro `auto`:**

1. Najde prvního poskytovatele v `listEmbeddingProviders()` s `hasKey === true` → `remote`.
2. Pokud `settings.staticEnabled === true` → `static`.
3. Pokud `settings.transformersEnabled === true` → `transformers`.
4. Jinak → `null` (degraduje na vyhledávání klíčových slov pomocí FTS5).

Mezipaměť embeddingů (`src/lib/memory/embedding/cache.ts`) používá mapu LRU v paměti
s klíčem `${source}:${model}:${dim}:${sha256(text)}`, omezenou na
`MEMORY_EMBEDDING_CACHE_MAX` položek (výchozí hodnota 1000) s dobou platnosti
`MEMORY_EMBEDDING_CACHE_TTL_MS` (výchozí hodnota 5 min). Je sdílena všemi volajícími
po dobu životního cyklu procesu.

## Hybridní RRF (k=60)

Když platí `strategy = "hybrid"` a vektorové úložiště je dostupné, načítání používá
Reciprocal Rank Fusion ke sloučení výsledků FTS5 a vektorového vyhledávání:

```
RRF(d) = Σ  1 / (k + rank_i(d))      kde k = 60 (lze konfigurovat pomocí MEMORY_RRF_K)
          i
```

Konkrétně:

1. Spustí vyhledávání FTS5 → seřazený seznam `R_fts` (pozice 1..N).
2. Spustí vektorové vyhledávání KNN → seřazený seznam `R_vec` (pozice 1..M).
3. Pro každé jedinečné `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, pokud v seznamu není).
4. Seřadí podle `rrf_score` sestupně a provede průchod s tokenovým rozpočtem.

Je obecně známo, že RRF funguje efektivně bez nutnosti normalizace skóre napříč
heterogenními vyhledávacími systémy. Výchozí hodnota `k=60` pochází z původního
článku Cormacka a kol. a funguje dobře pro malé korpusy (<10k paměťových záznamů).

## Zpětné doplnění (líné + reindexace)

Když se změní model embeddingů (detekováno prostřednictvím `embedding_signature`),
vektorové úložiště se znovu sestaví a všechny existující paměťové záznamy se v tabulce
`memories` označí pomocí `needs_reindex = 1`.

**Líné zpětné doplnění**: Při následujícím načítání se pro každý paměťový záznam,
kterému chybí vektorová položka, vytvoří embedding a vloží se do `vec_memories`
ještě před spuštěním vyhledávání. Tím se náklady na zpětné doplnění rozloží mezi
skutečné požadavky, aniž by se blokovalo spuštění.

**Explicitní reindexace**: Karta Engine v `/dashboard/memory` nabízí tlačítko
„Reindexovat nyní“, které volá `POST /api/memory/reindex`. Obslužná rutina volá
`runReindexBatch()` ze souboru `src/lib/memory/reindex.ts`, který při každém požadavku
zpracuje až `limit` čekajících položek. Průběh lze pravidelně zjišťovat prostřednictvím
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabulka `memory_vec_meta` (migrace `083_memory_vec.sql`) ukládá:

- `active_dim` — aktuální rozměr vektoru (null = dosud nezkalibrováno).
- `embedding_signature` — `${source}:${model}:${dim}` používaný k detekci změn.
- `last_reset_at` — časové razítko posledního úplného resetování.
- `vec_loaded` — příznak 0/1 určující, zda se sqlite-vec úspěšně načetl.

## Rozšíření nastavení

V `MemorySettingsExtended` v `src/shared/schemas/memory.ts` je k dispozici devět polí pro embeddingy a vektory, která se uchovávají prostřednictvím `src/lib/db/settings.ts`:

| Pole                     | Typ                                                | Výchozí hodnota | Popis                                                                    |
| ------------------------ | -------------------------------------------------- | --------------- | ------------------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`        | Který zdroj embeddingů použít                                            |
| `embeddingProviderModel` | `string \| null`                                   | `null`          | Poskytovatel/model ve formátu `provider/model`                           |
| `customBaseUrl`          | `string \| null`                                   | `null`          | Základní URL endpointu kompatibilního s OpenAI, určeného pouze pro paměť |
| `customModelId`          | `string \| null`                                   | `null`          | ID modelu odesílané vlastnímu endpointu                                  |
| `transformersEnabled`    | `boolean`                                          | `false`         | Výslovné povolení Transformers.js (MiniLM, ~400 MB)                      |
| `staticEnabled`          | `boolean`                                          | `false`         | Výslovné povolení lokálního statického modelu potion-base-8M             |
| `rerankEnabled`          | `boolean`                                          | `false`         | Povolit krok přehodnocení pořadí (přidá +200–500 ms/požadavek)           |
| `rerankProviderModel`    | `string \| null`                                   | `null`          | Poskytovatel/model pro přehodnocení pořadí ve formátu `provider/model`   |

`rerankProviderModel` je vyhodnocován prostřednictvím `POST /v1/rerank` (volaného přes loopback), takže přijímá cokoli, co přijímá tato trasa: vybraný cloudový model pro přehodnocení pořadí (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) nebo uzel poskytovatele kompatibilního s OpenAI ve formátu `<node-prefix>/<model>` (např. `skilled-mini/bge-reranker-v2-m3` pro server TEI/Infinity). Uzly na loopbacku jsou vždy způsobilé; uzel na jiném hostiteli (LAN, Tailscale) navíc vyžaduje příznak funkce `RERANK_REMOTE_PROVIDER_NODES` a musí splňovat zásady odchozích URL poskytovatele — viz [Příznaky funkcí](../reference/FEATURE_FLAGS.md). Selektor na řídicím panelu uvádí vybrané poskytovatele a místní uzly; jakýkoli platný řetězec `provider/model` lze nastavit přímo prostřednictvím `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Který vektorový backend použít |

Tato nastavení jsou zpřístupněna prostřednictvím `GET /PUT /api/settings/memory` (schéma `MemorySettingsExtendedSchema`).

Pro zdroj `remote` přijímá Memory také volitelná nastavení `customBaseUrl` a `customModelId`. Společně vybírají endpoint `/embeddings` kompatibilní s OpenAI a model, aniž by měnily globální registr embeddingů. Endpoint se před použitím normalizuje a kontroluje podle zásad odchozích URL poskytovatele: je vyžadováno HTTP(S), vložené přihlašovací údaje a řetězce dotazu jsou odmítnuty a adresy metadat cloudových služeb zůstávají blokovány. Prázdné hodnoty zachovají vybraného poskytovatele z registru. Chyby vrácené řídicímu panelu jsou očištěny a přihlašovací údaje endpointu se nikdy nezaznamenávají do protokolů.

> **TODO (D20):** Rozsah `global` (sdílení pamětí napříč všemi klíči API) není
> v této verzi implementován. Vyžaduje změny schématu a globální cestu
> načítání. Evidujte jej samostatně.

## Vrstvy úložiště

### Primární: SQLite (tabulka `memories`)

Vytvořeno migrací `015_create_memories.sql`:

| Sloupec                     | Typ                | Poznámky                                                                      |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generované prostřednictvím `crypto.randomUUID()`                         |
| `api_key_id`                | `TEXT NOT NULL`    | Vlastnický klíč API                                                           |
| `session_id`                | `TEXT`             | Volitelný rozsah pro jednotlivé konverzace                                    |
| `type`                      | `TEXT NOT NULL`    | Jedna z hodnot `factual`, `episodic`, `procedural`, `semantic`                |
| `key`                       | `TEXT`             | Stabilní klíč pro upsert, např. `preference:i_prefer_python`                  |
| `content`                   | `TEXT NOT NULL`    | Vlastní text skutečnosti                                                      |
| `metadata`                  | `TEXT`             | Datový blok JSON (category, extractedAt, source, ...)                         |
| `created_at` / `updated_at` | `TEXT`             | Řetězce ISO 8601                                                              |
| `expires_at`                | `TEXT`             | Volitelné vypršení platnosti; `NULL` znamená trvalou platnost                 |
| `memory_id`                 | `INTEGER UNIQUE`   | Přidáno migrací `023_fix_memory_fts_uuid.sql` pro propojení UUID ↔ rowid FTS5 |

Indexy: `api_key_id`, `session_id`, `type`, `expires_at` a jedinečný index
`memory_id`.

**Sémantika upsertu**: `createMemory()` vyhledá existující řádek se stejnou
dvojicí `(api_key_id, key)` a v případě nalezení jej aktualizuje na místě
(sloučí `metadata` pomocí mělkého spreadu). Tím se zabrání neomezenému růstu
tabulky při opakovaných vyjádřeních preferencí.

### Fulltextové vyhledávání (virtuální tabulka `memory_fts`)

Migrace `022_add_memory_fts5.sql` vytvoří virtuální tabulku FTS5 nad poli `content`
a `key`. Migrace `023_fix_memory_fts_uuid.sql` opravuje chybu z reálného provozu,
kdy primární klíč UUID nebylo možné propojit s celočíselným rowid systému FTS5 —
migrace přidá sloupec `memory_id`, znovu vytvoří tabulku FTS a nastaví triggery
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), které udržují FTS
synchronizované při operacích INSERT, DELETE a UPDATE.

Používáno souborem `retrieval.ts` pro strategie `semantic` a `hybrid` (viz níže).
Kód načítání provádí kontrolu pomocí `hasTable("memory_fts")` a přejde na
chronologické řazení, pokud tabulka FTS chybí nebo dotaz FTS vyvolá chybu.

### Volitelné: Qdrant (vektorové úložiště 2. úrovně)

Soubor `src/lib/memory/qdrant.ts` implementuje volitelnou integraci Qdrant jako
vektorové úložiště 2. úrovně. Načítání je směrováno do Qdrant pouze tehdy, když
má selektor enginu `memoryVectorStore` hodnotu `"qdrant"` — výchozí hodnota
`"auto"` (ani `"sqlite-vec"`) Qdrant **nikdy** nevybere. Přepínač na kartě
Engine nastavuje současně **obě** hodnoty `qdrantEnabled` a `memoryVectorStore`:
povolení nastaví Qdrant jako primární úložiště, zakázání obnoví hodnotu `"auto"`
(#5597 — před touto opravou nemělo povolení žádný účinek, protože selektor
enginu nebyl nikde nastavován). Pokud Qdrant není dostupný nebo nic nevrátí,
načítání přejde na sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — vytvoří embedding pro `key + content` pomocí nakonfigurovaného
  embeddingového modelu, zajistí existenci kolekce (při prvním použití vytvoří vektory
  s kosinovou vzdáleností) a vloží nebo aktualizuje bod s payloadem `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — vytvoří embedding dotazu a prohledá
  kolekci filtrovanou podle `kind = "omniroute_memory"` a volitelně podle
  `apiKeyId` / `sessionId`. Omezuje `topK` na rozsah `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — odstraní jeden bod. Volá se z
  `deleteMemory()` po odstranění řádku SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — hromadně odstraní body, jejichž
  `expiresAtUnix` je v minulosti nebo jejichž `createdAtUnix` je starší než mez
  doby uchovávání. Nejprve je spočítá, aby řídicí panel mohl zobrazit skutečné počty.
- `checkQdrantHealth()` — kontrola stavu pomocí `GET /readyz` včetně latence.

Uživatelské rozhraní nastavení zpřístupňuje konfiguraci Qdrantu, kontrolu stavu, test
sémantického vyhledávání a čištění na kartě **Engine** stránky `/dashboard/memory`.
Od verze v3.8.6 jsou zapojeny všechny odpovídající trasy v `src/app/api/settings/qdrant/`:

| Trasa                                   | Metoda        | Popis                                   |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Načtení / aktualizace nastavení Qdrantu |
| `/api/settings/qdrant/health`           | `GET`         | Kontrola dostupnosti + latence          |
| `/api/settings/qdrant/search`           | `POST`        | Test sémantického vyhledávání           |
| `/api/settings/qdrant/cleanup`          | `POST`        | Odstranění expirovaných / starých bodů  |
| `/api/settings/qdrant/embedding-models` | `GET`         | Seznam dostupných embeddingových modelů |

**Poznámky k chování (co očekávat):**

- **Výběr enginu** — povolením Qdrantu na kartě Engine se Qdrant stane primárním
  úložištěm (nastaví `memoryVectorStore="qdrant"`); zakázáním se hodnota obnoví na `"auto"` (#5597).
- **Bez zpětného doplnění** — do Qdrantu se zapisují pouze paměti vytvořené/aktualizované
  **po** jeho povolení (duální zápis typu fire-and-forget). Již existující paměti SQLite se
  **nemigrují**; „Reindex Now“ znovu sestaví pouze index sqlite-vec, nikoli Qdrant.
- **Rozměr vektorů se zjišťuje automaticky** ze skutečného embeddingu při prvním použití —
  není nutné vyplňovat žádné pole rozměru. Změna embeddingového modelu po vytvoření kolekce
  se **nezpracovává** automaticky: existující kolekce zůstane beze změny, zápisy/vyhledávání
  s neodpovídajícím rozměrem selžou a použije se záložní sqlite-vec. Chcete-li změnit
  embedder, vytvořte kolekci znovu (pod novým názvem nebo ji v Qdrantu odstraňte).
- **Metrika vzdálenosti** — vždy **Cosine** (pevně zakódováno při vytváření kolekce;
  nelze konfigurovat).
- **Ověřování** — pouze klíč API (odesílá se v hlavičce `api-key`; u neověřovaného
  lokálního Dockeru je volitelný). JWT/RBAC se nepoužívají.
- **Konfigurační pole** — uživatelské rozhraní zpřístupňuje `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` jsou dostupné pouze prostřednictvím prostředí/DB
  a `vectorSize` se k vytvoření kolekce nepoužívá (rozměr se získá z embeddingu).

### Kvantizace vektorů (int8 — volitelná, oba backendy)

Oba vektorové backendy podporují **volitelnou kvantizaci int8**, která snižuje paměťovou
náročnost uložených vektorů (přibližně 4× menší než Float32) za cenu mírného snížení
úspěšnosti vyhledávání. U obou je ve výchozím nastavení **vypnutá** — vektory si zachovávají
plnou přesnost, pokud není výslovně povolena.

| Backend    | Nastavení                             | Typ                            | Výchozí hodnota | Kde se načítá                                               |
| ---------- | ------------------------------------- | ------------------------------ | --------------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (klíč DB)        | `"none" \| "int8" \| "binary"` | `"none"`        | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (prostředí) | `"none" \| "int8"`             | `"none"`        | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** se konfiguruje pro každou instanci pomocí klíče nastavení
  `qdrantQuantization` (zpřístupněného jako pole `quantization` v `PUT /api/settings/qdrant`).
  Při hodnotě `"int8"` požádá `buildQuantizationConfig()` o skalární kvantizaci
  (`always_ram`, kvantil `0.99`) a vyhledávání povolí `rescore: true`, aby
  vektory s plnou přesností zpřesnily sadu kandidátů int8.
- Kvantizace **sqlite-vec** se nastavuje **pouze prostřednictvím prostředí** (nejde
  o nastavení DB): nastavením `MEMORY_VEC_QUANTIZATION=int8` se lokální vektory uloží
  jako sloupec `int8[dim]` prostřednictvím `vec_quantize_int8(?, 'unit')`. Zvolený režim
  je zahrnut do `embedding_signature` (přípona `:int8`), takže přepnutí režimu vyvolá
  úplnou reindexaci tabulky `vec_memories` — stejnou cestou líného zpětného doplnění,
  která se používá při změně embeddingového modelu.

## Typy paměti

`MemoryType` (`src/lib/memory/types.ts`):

| Typ          | Použití                                                                                |
| ------------ | -------------------------------------------------------------------------------------- |
| `factual`    | Preference, stabilní fakta o uživateli, vzorce chování                                 |
| `episodic`   | Rozhodnutí spojená s konkrétním okamžikem („Zvolil jsem Postgres“)                     |
| `procedural` | Paměť pracovních postupů / návodů (rezervováno; aktuálně bez automatického extraktoru) |
| `semantic`   | Rezervováno pro položky ve vektorovém úložišti                                         |

Strategie načítání `MemoryConfig` je jedna z hodnot `exact`, `semantic` nebo `hybrid`
a rozsah je jeden z `session`, `apiKey` nebo `global`. Výchozí rozsah z
`getMemorySettings()` je `apiKey`.

## Extrakce faktů (`extraction.ts`)

Extrakce je založená na **regulárních výrazech**, nikoli na LLM — probíhá v rámci procesu pomocí
`setImmediate()`, takže nikdy neblokuje proud odpovědi:

- **Vzory preferencí** → `MemoryType.FACTUAL`
  (např. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Vzory rozhodnutí** → `MemoryType.EPISODIC`
  (např. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Vzory chování** → `MemoryType.FACTUAL`
  (např. `I usually …`, `I always …`, `I tend to …`)

Každá shoda je sanitizována (`trim`, sloučení bílých znaků, omezení na 500 znaků),
v rámci dávky deduplikována prostřednictvím stabilního `factKey(category, content)` a
uložena pomocí `createMemory()` s metadaty
`{category, extractedAt, source: "llm_response"}`. Vstupní text je omezen na
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — pokud je delší, použije se **konec** textu,
aby byl vždy zahrnut nejnovější obsah asistenta.

`extractFactsFromText(text)` je exportována pro testy a vrací strukturovaná
fakta bez jejich uložení.

## Načítání (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` je hlavní vstupní bod. Provádí následující:

1. Normalizuje a validuje konfiguraci pomocí `MemoryConfigSchema`.
2. Okamžitě vrátí `[]`, pokud je `enabled` nastaveno na false nebo `maxTokens <= 0`.
3. Omezí `maxTokens` na rozsah `[1, 8000]`.
4. Zjistí, zda existuje moderní tabulka `memories` (oproti zastaralé tabulce `memory`),
   aby nadále fungovaly i starší databáze.
5. Sestaví základní dotaz s kontrolou expirace
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), volitelným
   rozsahem relace a volitelným omezením podle `retentionDays`.
6. Větví se podle strategie:
   - **`exact`** (výchozí): chronologické `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: pokud existuje `config.query` a `memory_fts`, použije JOIN
     `memory_fts MATCH ?` a řazení podle hodnocení FTS; pokud FTS vrátí 0 řádků,
     přejde zpět na chronologické řazení.
   - **`hybrid`**: sjednocení výsledků FTS (s vyšší relevancí) a
     chronologické množiny, deduplikované podle id.
7. Pokud je zadán dotaz, vypočítá skóre relevance klíčových slov (`getRelevanceScore`) nad
   `content`, `key` a JSON v `metadata`. Řádky s nulovým skóre jsou odfiltrovány.
8. Seřadí výsledky sestupně podle skóre a poté sestupně podle `createdAt`.
9. Prochází seřazený seznam a přijímá položky, dokud průběžný součet
   `estimateTokens(content)` (≈ `length / 4`) zůstává v rámci rozpočtu. Pokud existuje
   alespoň jedna shoda, vždy vrátí nejméně jednu položku.

`estimateTokens` je exportována a používá se při načítání, sumarizaci a v nástroji MCP
`omniroute_memory_search`.

## Vkládání (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Spojí obsah všech pamětí do jediného řetězce `Memory context: …`.
2. Vybere strategii podle názvu poskytovatele:
   - **Systémová zpráva** (výchozí pro OpenAI, Anthropic, Gemini, …) — vloží
     `{role: "system", content: memoryText}` před všechny existující systémové
     zprávy, takže systémové výzvy uživatele mají stále přednost.
   - **Uživatelská zpráva** (záložní možnost) — pro poskytovatele v
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Ti systémovou roli odmítají
     a jinak by vrátili chybu 400 (viz problém #1701 pro GLM/Zhipu).
3. Zaznamená počet, strategii a model pod `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` je exportována pro volající, kteří
potřebují provádět vlastní rozhodování o směrování. U neznámých poskytovatelů je
z bezpečnostních důvodů výchozí hodnota `true` (systémová role je povolena).

## Nastavení (`settings.ts`)

Konfigurace paměti je **uložena v tabulce nastavení databáze**, nikoli v proměnných prostředí.
`getMemorySettings()` načítá data z `getSettings()` a ukládá výsledek
do mezipaměti v rámci procesu; `invalidateMemorySettingsCache()` je volána trasou
PUT pro nastavení po provedení zápisů.

### Starší pole (všechny verze)

| Klíč DB               | Typ     | Výchozí hodnota                                     | Ovládací prvek uživatelského rozhraní                            |
| --------------------- | ------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (od v3.8.30 ve výchozím nastavení vypnuto)  | Zapnutí/vypnutí paměti                                           |
| `memoryMaxTokens`     | integer | `2000` (rozsah `0–16000`)                           | Rozpočet tokenů pro vkládání                                     |
| `memoryRetentionDays` | integer | `30` (rozsah `1–365`)                               | Doba uchovávání                                                  |
| `memoryStrategy`      | enum    | `"hybrid"` (jedna z `recent`, `semantic`, `hybrid`) | Strategie vyhledávání                                            |
| `skillsEnabled`       | boolean | `false`                                             | Přepíná vkládání dovedností pro jednotlivé klíče (viz SKILLS.md) |

Poznámka: strategie uživatelského rozhraní `"recent"` se prostřednictvím
`toMemoryRetrievalConfig()` mapuje na interní strategii vyhledávání `"exact"`
(chronologické pořadí).

### Nová pole (v3.8.6, plán 21 D9)

Popisy polí naleznete také výše v části „Rozšíření nastavení“.

| Klíč DB                     | Pole API                 | Výchozí hodnota |
| --------------------------- | ------------------------ | --------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`        |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`          |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`         |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`         |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`         |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`          |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`        |

Klíče DB související s Qdrantem (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` s výchozí hodnotou `"omniroute_memory"`,
`qdrantEmbeddingModel` s výchozí hodnotou `"openai/text-embedding-3-small"`) načítá
`normalizeQdrantConfig()` v `qdrant.ts`.

### Proměnné prostředí (v3.8.6)

Šest volitelných proměnných prostředí upravuje chování enginu za běhu (zdokumentováno v `.env.example`):

| Proměnná                        | Výchozí hodnota            | Popis                                                                                                                                             |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL mezipaměti embeddingů (5 min)                                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maximální počet položek v LRU mezipaměti embeddingů                                                                                               |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repo HF pro model Transformers.js                                                                                                                 |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repo HF pro statický model potion                                                                                                                 |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Umístění pro ukládání stažených modelů                                                                                                            |
| `MEMORY_VEC_TOP_K`              | `20`                       | Výchozí top-K pro vektorové vyhledávání                                                                                                           |
| `MEMORY_RRF_K`                  | `60`                       | Konstanta k RRF pro hybridní vyhledávání                                                                                                          |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Nastavte na `int8`, aby se lokální vektory sqlite-vec ukládaly kvantizovaně (přibližně 4× menší; volitelné). Změna režimu vynutí nové indexování. |

## Sumarizace (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` zkomprimuje starší
obsah, když průběžný celkový počet tokenů v pamětech daného klíče překročí
limit. Prochází řádky sestupně podle `created_at`, ponechá řádky, které se vejdou,
a ve zbývajících nahradí `content` přímo na místě prvními třemi větami
původního obsahu. `tokensSaved` je rozdíl hodnot `estimateTokens` mezi starým a
novým obsahem.

Tato rutina je **dostupná, ale v současném chatovacím řetězci se nevolá automaticky**
— pokud potřebujete průběžnou komprimaci, volejte ji z úlohy cron, akce správce
nebo propojovacího kódu `MemoryConfig.autoSummarize`. Ztráta dat je nevratná:
původní text se přepíše.

## REST API

Všechny koncové body vyžadují ověření správy (`requireManagementAuth`).

### Základní koncové body paměti (stávající + aktualizované)

| Metoda   | Cesta                | Popis                                                                                                                                                                                          |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Stránkovaný seznam s filtry: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odpověď obsahuje `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                |
| `POST`   | `/api/memory`        | Vytvoří záznam (ověřeno pomocí Zod: `content`, `key`, volitelně `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Volá `createMemory()`, která provede upsert podle `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Načte jeden záznam podle UUID                                                                                                                                                                  |
| `PUT`    | `/api/memory/[id]`   | Aktualizuje pole záznamu (`type`, `key`, `content`, `metadata`). Tělo: `MemoryUpdatePutSchema`. Také synchronizuje vektor, pokud je dostupný zdroj embeddingu.                                 |
| `DELETE` | `/api/memory/[id]`   | Odstraní záznam; odstraní jej také z `vec_memories` (D15) a v režimu best-effort z Qdrantu. Pokud neexistuje, vrátí 404.                                                                       |
| `GET`    | `/api/memory/health` | Spustí `verifyExtractionPipeline("health-check")` — cyklus vytvoření→výpis→odstranění. Vrací `{working, latencyMs, error?}`                                                                    |

### Nové koncové body paměťového enginu (plán 21)

| Metoda | Cesta                             | Popis                                                                                                                                                                                    |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Zkušební běh `retrieveMemories` — vrací seřazené výsledky se skóre, úrovní a tokeny. Tělo: `RetrievePreviewSchema`. Paměti NEVKLÁDÁ ani neupravuje.                                      |
| `GET`  | `/api/memory/embedding-providers` | Uvádí poskytovatele s embeddingovými modely a označuje, kteří mají nakonfigurovaný API klíč.                                                                                             |
| `GET`  | `/api/memory/engine-status`       | Vrací úplný stav enginu: úroveň klíčových slov, rozlišení embeddingu, statistiky vektorového úložiště, stav Qdrantu a konfiguraci opětovného řazení. Schéma: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ručně spustí komprimaci paměti. Tělo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Vrací `{candidates, tokensSaved}`.                                               |
| `POST` | `/api/memory/reindex`             | Spustí přeindexování vektorů pro paměti s `needs_reindex=1`. Tělo: `MemoryReindexSchema` (`force`). Vrací `{started, pending}`.                                                          |

### Koncové body nastavení

| Metoda | Cesta                                   | Popis                                                                                                        |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Aktuální normalizované nastavení `MemorySettingsExtended` (7 nových polí + starší pole)                      |
| `PUT`  | `/api/settings/memory`                  | Aktualizuje libovolné pole z `MemorySettingsExtendedSchema` (celkem 12 polí)                                 |
| `GET`  | `/api/settings/qdrant`                  | Aktuální nastavení Qdrantu (`QdrantSettingsSchema`)                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Aktualizuje nastavení Qdrantu. Tělo: `QdrantSettingsUpdateSchema`. `apiKey` = prázdný řetězec odstraní klíč. |
| `GET`  | `/api/settings/qdrant/health`           | Kontrola dostupnosti nakonfigurované instance Qdrantu. Vrací `QdrantHealthResultSchema`.                     |
| `POST` | `/api/settings/qdrant/search`           | Test sémantického vyhledávání v Qdrantu. Tělo: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | Odstraní z Qdrantu body odpovídající pamětem s prošlou platností nebo starým pamětem.                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | Vypíše embeddingové modely dostupné pro Qdrant.                                                              |

Dotaz pro výpis `/api/memory` podporuje buď stránkování založené na `page`
(`parsePaginationParams`), **nebo** přímo zadaný `offset` — pokud je přítomen
`offset`, má přednost a pro strukturu odpovědi se vypočítá odvozená hodnota
`page`.

## Nástroje MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Když je server MCP povolen, zaregistrují se tři paměťové nástroje:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → obaluje `retrieveMemories()`. Od verze v3.8.6 (D16) se `strategy` načítá
  z `getMemorySettings()`, místo aby byla pevně nastavena na `"exact"`. Pokud
  je zadáno `query` a `strategy` je `semantic` nebo `hybrid`, použije se
  vektorové úložiště, je-li dostupné.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → obaluje `createMemory()`. Přijímá pouze 4 kanonické typy:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → vypíše odpovídající
  položky, volitelně je filtruje podle časového razítka vytvoření před zadaným datem a poté
  každou odstraní pomocí `deleteMemory()` (což také odstraní vektory ze sqlite-vec + Qdrant).

Podrobnosti o transportu a rozsahu naleznete v dokumentu [MCP-SERVER.md](./MCP-SERVER.md).

## Řídicí panel (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` je nyní **Studio se 3 kartami**:

### Karta: Vzpomínky

- Karta s popisem konceptu (sbalitelné vysvětlení „Jak to funguje“).
- Seznam, vyhledávání a stránkování v reálném čase (prodleva 300 ms).
- Filtr typu (`factual` / `episodic` / `procedural` / `semantic` / všechny).
- Modální okno pro přidání vzpomínky (klíč, obsah, typ).
- Úprava přímo v řádku (tlačítko s tužkou → `PUT /api/memory/[id]`).
- Odstranění jednotlivých řádků (s potvrzovacím dialogem).
- Export aktuální stránky do JSON; import JSON pomocí výběru souboru.
- Karty statistik: `totalEntries`, `tokensUsed`, `hitRate`.
- Tlačítko „Kompaktovat staré“ → `POST /api/memory/summarize` (nejprve zkušební běh zobrazí
  počet kandidátů, poté požádá o potvrzení).
- Zelený/červený indikátor stavu řízený pomocí `GET /api/memory/health`.

### Karta: Pískoviště

- Vstup pro dotaz + výběr strategie (Přesná / Sémantická / Hybridní) + rozpočet tokenů.
- „Simulovat“ → `POST /api/memory/retrieve-preview` — zobrazí seřazené výsledky s
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel vyhodnocení zobrazující, který zdroj vnoření / které vektorové úložiště bylo použito a
  zda došlo k použití náhradního řešení.

### Karta: Engine

- Panel stavu enginu (štítek klíčových slov FTS5, štítek vnoření, štítek vektorového úložiště,
  štítek stavu Qdrant, štítek opětovného řazení).
- Tlačítko „Reindexovat nyní“ → `POST /api/memory/reindex`.
- Výběr zdroje vnoření (automatický / vzdálený / statický / transformery + přepínače).
- Karta konfigurace Qdrant (přepínač aktivace, hostitel/port/kolekce/klíč, test připojení,
  test sémantického vyhledávání, vyčištění).
- Karta konfigurace opětovného řazení (přepínač aktivace, výběr poskytovatele/modelu).

Nastavení paměti a Qdrant jsou také dostupná v
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) jako
starší/globální rozhraní nastavení.

## Ukládání do mezipaměti

`src/lib/memory/store.ts` udržuje mezipaměť podobnou LRU v rámci procesu
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, s vyřazením 20 %
nejstarších položek) pro čtení `getMemory(id)` a také obecnou vrstvu mezipaměti
klíč/hodnota `memoryCache` (`src/lib/memory/cache.ts`) s metodami `get`/`set`/`invalidate`,
kterou používají volající vyžadující vlastní mezipaměť s vymezeným rozsahem (LRU s 1 000 položkami,
výchozí TTL 5 min).

## Soukromí a životní cyklus

- Vlastníkem paměti je ID klíče API (`resolveMemoryOwnerId` v
  `chatCore.ts`). Bez `apiKeyInfo.id` se nespustí načítání, vkládání
  ani extrakce.
- Záznamy s budoucí hodnotou `expires_at` jsou z načítání odfiltrovány; staré
  záznamy překračující `retentionDays` jsou vyloučeny pomocí podmínky
  `created_at >= cutoff` ve funkci `retrieveMemories`.
- Pro trvalé odstranění použijte `DELETE /api/memory/[id]` nebo `omniroute_memory_clear`.
- Extrakce probíhá asynchronně bez čekání na výsledek prostřednictvím `setImmediate`; selhání jsou protokolována pod
  `memory.extraction.background.failed` a volajícímu se nikdy neprojeví.
- Ověřovací průchody (`verifyExtractionPipeline`) odstraní své vlastní
  testovací záznamy v bloku `finally`.

## Viz také

- [SKILLS.md](./SKILLS.md) — nastavení `skillsEnabled` vkládá definice nástrojů
  společně s pamětí.
- [MCP-SERVER.md](./MCP-SERVER.md) — přenos MCP / rozsahy oprávnění.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — širší rozhraní API.
- Zdrojové moduly:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybridní RRF
  - `src/lib/memory/embedding/index.ts` — vrstva vkládání z více zdrojů
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schémata Zod pro všechna těla požadavků paměťového API
  - `src/shared/schemas/qdrant.ts` — schémata Zod pro nastavení/operace Qdrant
  - `src/lib/db/memoryVec.ts` — operace CRUD pro `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + dílčí trasy
  - `src/app/(dashboard)/dashboard/memory/` — uživatelské rozhraní Studia (stránka + komponenty +
    karty + hooky)
  - `open-sse/handlers/chatCore.ts` (propojení vkládání / extrakce)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Výběr poskytovatele vkládání (v3.8.16+)

Paměťový modul OmniRoute podporuje **čtyři zdroje vkládání** (`src/lib/memory/embedding/`). Každý z nich nabízí jiné kompromisy z hlediska **latence, nákladů, kvality modelu a složitosti nastavení**.

### Zdroje vkládání

| Poskytovatel   | Zdroj                                       | Latence                              | Náklady              | Kvalita                           | Nastavení                              |
| -------------- | ------------------------------------------- | ------------------------------------ | -------------------- | --------------------------------- | -------------------------------------- |
| `transformers` | Místní model ONNX (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                      | Zdarma               | Dobrá                             | Pouze `npm install`                    |
| `static`       | Předpočítané vektory (v mezipaměti)         | <1ms                                 | Zdarma               | N/A (závisí na zásahu mezipaměti) | Žádné                                  |
| `remote`       | API OpenAI / Cohere / Voyage                | ~100-300ms                           | $0.02-0.10/1M tokenů | Vynikající                        | Klíč API                               |
| `auto`         | Za běhu vybere nejlepší dostupný zdroj      | Stejná jako u zvoleného zdroje       | Zdarma               | Stejná jako u zvoleného zdroje    | Žádné                                  |
| _(cache)_      | Vrstva LRU v paměti nad libovolným zdrojem  | <1ms (zásah), plná latence (nezásah) | Zdarma               | Stejná jako u podkladového zdroje | Vždy zapnuto (nelze vybrat jako zdroj) |

### Rozhodovací strom

```
                  Jaký je kontext vašeho nasazení?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  VÝVOJ/TEST   MALÁ PROD.   VELKÁ PROD.   EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (zdarma, bez API)         (nejlepší kvalita) (bez internetu)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            VŽDY přidejte navrch vrstvu `cache`
            (LruCache obaluje libovolného poskytovatele)
```

### Konfigurace databáze a API

Možnosti vkládání paměti se konfigurují prostřednictvím API / uživatelského rozhraní Nastavení, nikoli pomocí proměnných prostředí. Příslušné databázové klíče nastavení v části Nastavení (`normalizeMemorySettings` v `src/lib/memory/settings.ts`) jsou:

- `memoryEmbeddingSource`: `"transformers"` (místní), `"remote"` (založený na API, např. OpenAI), `"static"` (externí úložiště) nebo `"auto"`
- `memoryEmbeddingProviderModel`: Identifikátor modelu pro vzdálené/statické zdroje (např. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` nebo `"auto"`

#### Místní model (`transformers`)

Interně používá transformers.js ke spouštění místních modelů:

```bash
# Proměnné prostředí načítané v kódu (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repozitář modelu HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statický model potion z HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Adresář mezipaměti
```

#### Mezipaměť vkládání LRU

Mezipaměť je ve výchozím nastavení vždy zapnutá a konfiguruje se pomocí proměnných prostředí:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maximální počet položek v mezipaměti
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Údaje o výkonu

Benchmark na typickém 4jádrovém serveru x86 (texty po ~100 tokenech):

| Poskytovatel         | p50   | p95   | p99   | Cena / 1 mil. embeddingů           |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Zdarma                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Závisí na hostingu Qdrant          |
| `cache` (zásah)      | <1ms  | <1ms  | 2ms   | Zdarma                             |

---

## Vzory extrakce faktů (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) používá **porovnávání pomocí regulárních výrazů** k extrakci strukturovaných faktů ze zpráv konverzace. Porozumění těmto vzorům vám pomůže vyladit kvalitu extrakce pro váš případ použití.

### Výchozí kategorie vzorů

| Kategorie           | Příklad vzoru                                                     | Zachycuje                         |
| ------------------- | ----------------------------------------------------------------- | --------------------------------- |
| PREFERENCE_PATTERNS | `"Preferuji <X>"`, `"Mám rád/a <X>"`, `"Nesnáším <X>"`            | Uživatelské preference            |
| DECISION_PATTERNS   | `"Použiji <X>"`, `"Rozhodl/a jsem se <X>"`, `"Zvolil/a jsem <X>"` | Rozhodnutí uživatele (epizodická) |
| PATTERN_PATTERNS    | `"Obvykle <X>"`, `"Vždy <X>"`, `"Nikdy <X>"`                      | Trvalé vzorce chování             |

### Příklady vzorů (zjednodušené)

```ts
// Ze souboru src/lib/memory/extraction.ts
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

### Co se extrahuje

Když uživatel řekne:

> "Preferuji TypeScript. Pro tento projekt použiji Postgres. Vždy před odesláním změn vytvořím commit. Nemám rád/a Python."
> Extrakce vytvoří 4 vzpomínky:
>
> | Klíč                                 | Kategorie  | Typ      | Obsah                                 |
> | ------------------------------------ | ---------- | -------- | ------------------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                          |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres pro tento projekt"          |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "vytvořit commit před odesláním změn" |
> | `preference:python`                  | preference | factual  | "Python"                              |

### Limity extrakce

Aby se zabránilo nekontrolované extrakci, platí následující limity:

| Minimální délka obsahu | 3 znaky |
| Maximální délka obsahu | 500 znaků |

### Kdy extrakci vypnout

Extrakce se spouští automaticky vždy, když je povolena paměť; neexistuje žádný samostatný
přepínač pouze pro extrakci. Chcete-li ji vypnout, zakažte paměť úplně (`enabled: false`
prostřednictvím `PUT /api/settings/memory`). Zvažte to v následujících případech:

- Máte velký objem zpráv a náklady na extrakci nejsou zanedbatelné
- Vaše konverzace jsou převážně dočasné (chat, ladění) a nemají dlouhodobou hodnotu
- Kontext již zachycujete prostřednictvím vlastních pluginů

---

## Ladění hybridního RRF (v3.8.16+)

Algoritmus **Reciprocal Rank Fusion (RRF)** kombinuje výsledky FTS5 (klíčová slova) a vektorového vyhledávání (sémantika). Parametr `k` určuje, jakou váhu dostanou výsledky na nižších pozicích.

### Vzorec

Pro každou kandidátní vzpomínku je skóre RRF následující:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Kde:

- `k` je konstanta (výchozí hodnota 60)
- `rank_i(d)` je pořadí dokumentu `d` v i-tém vyhledávacím systému (FTS, vektor)
- Součet se provádí přes všechny vyhledávací systémy

### Jak `k` ovlivňuje výsledky

| Hodnota `k`          | Účinek                                                                                    | Nejvhodnější pro                           |
| -------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------ |
| `k=0`                | Čistá fúze pořadí (bez vyhlazování)                                                       | Teoretická výchozí úroveň                  |
| `k=10-30`            | Výrazně zvýhodňuje nejlepší výsledky, nízké pořadí přispívá jen minimálně                 | Když jsou první 3 výsledky obvykle správné |
| **`k=60`** (výchozí) | Vyvážené — všech 10 nejlepších výsledků smysluplně přispívá                               | Univerzální vyhledávání                    |
| `k=100+`             | Plošší — i výsledky na nízkých pozicích mohou převážit, pokud se objeví ve více systémech | Když je úplnost > přesnost kritická        |

### Ladění `k` v praxi

```bash
# Výchozí hodnota
MEMORY_RRF_K=60

# Agresivní přesnost (malá paměť, málo dokumentů)
MEMORY_RRF_K=20

# Maximální úplnost (velká paměť, různorodé dotazy)
MEMORY_RRF_K=120
```

**Příklad s `k=20`:**

- FTS pořadí 1 → příspěvek `1/21 = 0.048`
- FTS pořadí 10 → příspěvek `1/30 = 0.033`
- Vektorové pořadí 1 → příspěvek `0.048`
- Kombinované maximum: `0.096`

**Příklad s `k=60`:**

- FTS pořadí 1 → příspěvek `1/61 = 0.016`
- FTS pořadí 10 → příspěvek `1/70 = 0.014`
- Vektorové pořadí 1 → příspěvek `0.016`
- Kombinované maximum: `0.033`

Při vyšším `k` je **relativní rozdíl** mezi 1. a 10. pořadím menší, takže algoritmus více spoléhá na **shodu napříč vyhledávacími systémy** než na jistotu nejvyššího pořadí.

### Kdy změnit `k`

| Příznak                                           | Co vyzkoušet                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| Nejlepší výsledek vždy vyhraje, ale je chybný     | **Nižší** k (např. 20) — jistota nejvyššího pořadí má větší význam |
| Správná odpověď je mezi prvními 5, ale není první | **Vyšší** k (např. 100) — plošší bodování odměňuje shodu           |
| Úplnost je vysoká, ale přesnost nízká             | **Nižší** k — zostřete řazení                                      |
| Úplnost je nízká (relevantní dokumenty chybí)     | **Vyšší** k — dejte šanci dokumentům na nižších pozicích           |

### Váhování RRF

Fúze reciprokého pořadí používá stejné váhy pro sémantické vektorové pořadí a pořadí fulltextového vyhledávání:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Pro úpravu jednotlivých vah neexistují žádné proměnné prostředí (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` neexistují).

---

## Strategie sumarizace (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) komprimuje starší vzpomínky, aby aktivní sada zůstala malá a zároveň byla zachována možnost jejich vyhledání.

### Kdy se sumarizace spouští

| Spouštěč                           | Prahová hodnota (výchozí) |
| ---------------------------------- | ------------------------- |
| Ruční spuštění prostřednictvím API | není k dispozici          |

### Co se sumarizuje

Z `summarization.ts` jsou exportovány dva vstupní body:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — sloučí
  vzpomínky relace do jediného souhrnného textu omezeného tokenovým rozpočtem.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — komprimace podle stáří
  používaná rozhraním API: vybere každou vzpomínku starší než `days`, vytvoří
  z nich jednu zhuštěnou souhrnnou vzpomínku a (pokud je `dryRun` nastaveno na `false`)
  odstraní originály. Předáním `dryRun: true` zobrazíte náhled sady kandidátů
  a celkového počtu tokenů, aniž by se cokoli změnilo.

Neprobíhá žádné seskupování podle značek/klíčů ani hodnocení jednotlivých vzpomínek
jako „základní vs. sumarizovatelné“ — výběr je založen čistě na hranici stáří
a souhrnný text obsahuje pro každého kandidáta jeden zhuštěný řádek s prefixem typu.

### Spuštění sumarizace

Sumarizace je **ruční / volitelná** — nastavení `autoSummarize` má ve výchozím
stavu hodnotu `false`, takže se nic nekomprimuje automaticky. Spusťte ji prostřednictvím API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Chcete-li ji ponechat vypnutou, jednoduše zachovejte výchozí hodnotu `autoSummarize`
(`false`).

### Tipy pro kvalitní sumarizaci

- **Nejprve zobrazte náhled pomocí `dryRun`** — `summarizeMemoriesOlderThan(..., true)`
  vrátí seznam kandidátů a celkový počet tokenů, takže před odstraněním originálů
  můžete ověřit, co bude sloučeno.
- **Spouštějte sumarizaci v době nízkého provozu**, pokud máte rozsáhlý korpus vzpomínek — volání LLM je nejpomalejší část

```bash
# Ve stylu Cronu: sumarizace každý den ve 3:00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Vzor poskytovatele MemoryBackend

> **Zdroj pravdy:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testy:** `src/lib/memory/__tests__/generic-backend.test.ts`

Vzor poskytovatele MemoryBackend zavádí nad stávajícím paměťovým enginem **připojitelnou abstrakční vrstvu backendu**. Namísto vazby na jedinou implementaci úložiště nyní paměťový systém podporuje více backendů (SQLite, Obsidian, Notion, vlastní HTTP backendy) s konfigurovatelným směrováním na primární a záložní backendy.

### Architektura

```
┌──────────────────────────────────────────────────────────┐
│                    Trasy API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│        Singletonový orchestrátor (manager.ts)             │
│                                                          │
│  Primární ──► Backend A  (např. SQLite)                  │
│  Záložní  ──► Backend B  (např. Obsidian)                │
│               Backend C  (např. Notion přes GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Základní rozhraní (`backend.ts`)

Každý backend musí implementovat rozhraní `MemoryBackend`:

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

  // Vyhledávání
  search(config: SearchConfig): Promise<Memory[]>;

  // Stav
  health(): Promise<HealthCheckResult>;

  // Životní cyklus (volitelné)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singletonový orchestrátor, který:

- **Registruje** backendy prostřednictvím `register(backend)` — voláno při spuštění z `index.ts`
- **Konfiguruje** primární a záložní backendy prostřednictvím `configure(primary, fallbacks)`
- **Směruje** operace CRUD a vyhledávání na primární backend, při selhání použije řetězec záložních backendů
- Pravidelně provádí **kontroly stavu** všech backendů

**Chování záložních backendů:**

| Operace  | Primární backend          | Záložní backendy                        |
| -------- | ------------------------- | --------------------------------------- |
| `create` | ✅ Pouze primární         | ❌                                      |
| `get`    | ✅ Nejprve zkusí primární | ✅ Záložní, pokud vrátí null            |
| `update` | ✅ Pouze primární         | ✅ Asynchronní synchronizace bez čekání |
| `delete` | ✅ Pouze primární         | ✅ Asynchronní synchronizace bez čekání |
| `list`   | ✅ Pouze primární         | ❌                                      |
| `search` | ✅ Nejprve primární       | ✅ Záložní při chybě                    |

#### GenericMemoryBackend (`genericBackend.ts`)

Obecný HTTP konektor, který přizpůsobí libovolné REST API rozhraní MemoryBackend. Je užitečný pro:

- **Notion** — připojení prostřednictvím Notion API
- **Obsidian** — připojení prostřednictvím Obsidian Local REST API
- **Vlastní backendy** — jakákoli služba, která poskytuje RESTful paměťové API

**Konfigurace:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Základní URL backendového API
  apiKey?: string;           // Bearer token pro autentizaci
  headers?: Record<string, string>;  // Vlastní HTTP hlavičky
  timeout?: number;          // Časový limit požadavku (výchozí: 30000ms)
  backendType?: string;      // Pro protokolování

  // Přepsání koncových bodů (výchozí hodnoty používají konvence REST)
  endpoints?: {
    search?: string;   // výchozí: "/memories/search"
    create?: string;   // výchozí: "/memories"
    list?: string;     // výchozí: "/memories"
    get?: string;      // výchozí: "/memories/{id}"
    update?: string;   // výchozí: "/memories/{id}"
    delete?: string;   // výchozí: "/memories/{id}"
    health?: string;   // výchozí: "/health"
  };

  // Mapování názvů parametrů dotazu
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapování názvů parametrů cesty
  pathParams?: {
    id?/memoryId?
  };
}
```

**Známé backendy** jsou předem nakonfigurovány v `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend směrující na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend směrující na api.notion.com/v1
```

#### Vestavěné backendy

##### SQLiteBackend (`sqliteBackend.ts`)

Výchozí primární backend. Zapouzdřuje existující úložiště paměti založené na SQLite pomocí `src/lib/memory/store.ts`. Automaticky se registruje při spuštění.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Zapouzdřuje existující integraci s Obsidianem (`src/lib/memory/obsidianBackend.ts`). Připojuje se k trezoru Obsidianu prostřednictvím Obsidian Local REST API.

### Nastavení

Nastavení backendu paměti jsou uložena v tabulce nastavení aplikace a spravována prostřednictvím `src/lib/memory/settings.ts`:

| Nastavení            | Klíč prostředí/konfigurace | Výchozí    | Popis                                        |
| -------------------- | -------------------------- | ---------- | -------------------------------------------- |
| Primární backend     | `memoryPrimaryBackend`     | `"sqlite"` | ID primárního backendu                       |
| Záložní backendy     | `memoryFallbackBackends`   | `[]`       | Seřazená ID záložních backendů               |
| Konfigurace backendů | `memoryBackendConfigs`     | `{}`       | Přepsání konfigurace pro jednotlivé backendy |

Nastavení jsou normalizována pomocí `normalizeMemorySettings()` a ukládána do mezipaměti v `getMemorySettings()`.

### Průběh inicializace

```
Spuštění aplikace
  → importy v index.ts (vedlejší efekt): registrují SQLiteBackend
  → initMemoryBackends() voláno z životního cyklu aplikace:
      1. Načtení nastavení (getMemorySettings)
      2. Konfigurace primárního a záložních backendů
      3. Inicializace všech backendů (kontrola stavu)
      4. Připraveno pro požadavky
```

### Přidání nového backendu

1. **Implementujte rozhraní `MemoryBackend`** v `src/lib/memory/<name>Backend.ts`
2. **Exportujte** z `src/lib/memory/index.ts`
3. **Zaregistrujte** pomocí `memoryManager.register(yourBackend)` při spuštění
4. **Nakonfigurujte** prostřednictvím nastavení: nastavte `memoryPrimaryBackend` na ID svého backendu
5. **Otestujte** s využitím `src/lib/memory/__tests__/generic-backend.test.ts` jako reference

#### Příklad: Backend Brain

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

### Ověření

#### Jednotkové testy

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Očekávaný výstup: **35 testů, všechny úspěšné**, které pokrývají:

- Konstruktor (2)
- Kontrola stavu (4) — úspěch, selhání 500, síťová chyba, latence
- Inicializace (2) — úspěch, selhání
- Vytvoření (2) — výchozí koncový bod, vlastní koncový bod
- Získání (4) — úspěch, 404 → null, jiná chyba než 404, vlastní parametry cesty
- Aktualizace (2) — úspěch, 404 → false
- Odstranění (2) — úspěch, 404 → false
- Výpis (2) — parametry dotazu, vlastní názvy parametrů
- Vyhledávání (3) — parametry dotazu, vlastní koncový bod, serializace možností
- Autorizační hlavičky (2) — Bearer token, vlastní hlavičky
- Tovární funkce (1)

#### Kontrola typů

```bash
npm run typecheck:core
```

Očekáváno: **0 chyb**.
