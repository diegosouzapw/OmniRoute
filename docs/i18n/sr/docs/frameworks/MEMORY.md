# Memory System (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Извор истине:** `src/lib/memory/` и `src/app/api/memory/`
> **Последњи пут ажурирано:** 2026-06-28 — v3.8.40 (подразумевано искључено + накнадна int8 квантизација)

OmniRoute обезбеђује трајну меморију разговора везану за API кључ (и
опционо за идентификатор сесије). Сећања се аутоматски издвајају из LLM одговора
помоћу једноставног подударања regex образаца и поново умећу у наредне
захтеве као почетна системска порука (или као прва корисничка порука код провајдера који
одбацују системску улогу).

> **Меморија је подразумевано ИСКЉУЧЕНА (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` је
> сада `false` (`src/lib/memory/settings.ts`). Омогућавањем меморије умеће се до
> `maxTokens` (~2k) преузетог контекста у **сваки** захтев за ћаскање, што се
> наплаћује — неочекиван трошак за нове инсталације и клијенте који управљају
> сопственим контекстом. Омогућите је изричито у одељку **Подешавања → Меморија** (
> `MemorySkillsTab` приказује упозорење о трошку токена када је меморија омогућена).
> Клијент може да искључи меморију за појединачни захтев помоћу
> заглавља захтева `x-omniroute-no-memory` (`true`/`1`/`yes`) — погледајте табелу заглавља захтева у
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Захтев без меморије поставља
> `memoryOwnerId = null`, чиме се за тај захтев онемогућавају **и** уметање меморије и уметање вештина
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Меморија је **ограничена на појединачни API кључ**, а не на корисника — сваки захтев аутентификован
истим API кључем дели исти скуп меморије, уз опционо додатно
ограничавање помоћу `sessionId`.

## Архитектура

```
Клијент → /v1/chat/completions (apiKeyInfo је разрешен раније у току обраде)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # издваја id
    → getMemorySettings()                     # кеширана подешавања
    → shouldInjectMemory(body, {enabled})     # условна провера
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + опциони вектор
    → injectMemory(body, memories, provider)  # системска или корисничка порука
  → позив провајдера на вишем нивоу
  → по пријему одговора: extractFacts(text, apiKeyId, sessionId)  # неблокирајуће
    → setImmediate → createMemory(fact) за свако подударање
                   → embed(content) + upsertVector(id, vec)
```

Места позива за уметање и издвајање повезана су у
`open-sse/handlers/chatCore.ts` (потражите `retrieveMemories`, `injectMemory`
и `extractFacts`).

## Архитектура механизма (разрешавање у 3 нивоа)

Механизам меморије одређује путању преузимања током извршавања на основу доступне
инфраструктуре и подешавања. Постоје три нивоа, који се примењују према редоследу приоритета:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  НИВО 0 — Кључне речи (FTS5)                                │
  │  Доступност утврђена провером: FTS5 када га SQLite верзија   │
  │  подржава (better-sqlite3 / node:sqlite / bun:sqlite);       │
  │  недоступан у верзијама без FTS5 (нпр. sql.js/WASM —         │
  │  "no such module: fts5"). Користи се када је strategy =      │
  │  "exact" или као резервна опција; keyword у статусу          │
  │  механизма одражава резултат провере.                        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  НИВО 1 — Уграђени вектори (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 учитан преко db.loadExtension().          │
  │  KNN претрага грубом силом над Float32 векторима. Активан    │
  │  када:                                                       │
  │   • sqlite-vec loadExtension успе                            │
  │   • Доступан је извор уграђивања (remote | static |          │
  │     transformers) који може да произведе Float32Array        │
  │   • Постоји табела vec_memories (прави се при првом ready()) │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  НИВО 2 — Qdrant (опциона спољна векторска база података)    │
  │  Када је омогућен, замењује sqlite-vec за semantic/hybrid.   │
  │  Захтева покренуту Qdrant инстанцу + подешене host/port.     │
  └─────────────────────────────────────────────────────────────┘
```

Деградација је аутоматска и неприметна:

- Ако учитавање sqlite-vec не успе, ниво 1 није доступан → прелази се на ниво 0.
- Ако извор уграђивања врати грешку, ниво 1 прелази на ниво 0.
- Ако Qdrant није исправан, ниво 2 прелази на ниво 1 (или на ниво 0 ако ниво 1
  такође није доступан).

## Извори уграђивања

Слој за уграђивање (`src/lib/memory/embedding/`) одређује који извор треба користити
на основу `MemorySettingsExtended.embeddingSource`:

| Извор          | Опис                                                                                       | Кључ је обавезан | Хладно покретање |
| -------------- | ------------------------------------------------------------------------------------------ | ---------------- | ---------------- |
| `remote`       | Користи API за уграђивање конфигурисаног добављача (OpenAI, Cohere итд.)                   | Да               | Нема             |
| `static`       | Локално уграђивање путем табеле претраге помоћу `potion-base-8M` (WordPiece + усредњавање) | Не               | ~200ms           |
| `transformers` | Локално ONNX закључивање путем `@huggingface/transformers` v4, `all-MiniLM-L6-v2`          | Не               | ~3s + ~400MB RAM |
| `auto`         | Одређивање током извршавања: удаљени (ако кључ постоји) → статички → трансформатори → null | Зависи           | Зависи           |

**Редослед одређивања за `auto`:**

1. Пронађи првог добављача у `listEmbeddingProviders()` за којег је `hasKey === true` → `remote`.
2. Ако је `settings.staticEnabled === true` → `static`.
3. Ако је `settings.transformersEnabled === true` → `transformers`.
4. У супротном → `null` (прелази на FTS5 претрагу по кључним речима).

Кеш уграђивања (`src/lib/memory/embedding/cache.ts`) користи LRU мапу у меморији
са кључем `${source}:${model}:${dim}:${sha256(text)}`, ограничену на
`MEMORY_EMBEDDING_CACHE_MAX` ставки (подразумевано 1000), са TTL-ом од
`MEMORY_EMBEDDING_CACHE_TTL_MS` (подразумевано 5 минута). Дели се међу свим позиваоцима
током животног циклуса процеса.

## Хибридни RRF (k=60)

Када је `strategy = "hybrid"` и складиште вектора је доступно, преузимање користи
Reciprocal Rank Fusion за спајање FTS5 и векторских резултата:

```
RRF(d) = Σ  1 / (k + rank_i(d))      где је k = 60 (подесиво путем MEMORY_RRF_K)
          i
```

Конкретно:

1. Покрени FTS5 претрагу → рангирана листа `R_fts` (позиције 1..N).
2. Покрени KNN векторску претрагу → рангирана листа `R_vec` (позиције 1..M).
3. За сваки јединствени `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 ако није на листи).
4. Сортирај по `rrf_score` опадајуће и примени пролаз у оквиру буџета токена.

Познато је да је RRF ефикасан без потребе за нормализацијом оцена између
хетерогених система за преузимање. Подразумевана вредност `k=60` потиче из оригиналног
рада Cormack и сарадника и добро функционише за мале корпусе (<10k меморија).

## Допунско попуњавање (лењо + поновно индексирање)

Када се модел уграђивања промени (откривено путем `embedding_signature`),
складиште вектора се поново изграђује, а све постојеће меморије се означавају са
`needs_reindex = 1` у табели `memories`.

**Лењо допунско попуњавање**: При следећем преузимању, свака меморија којој недостаје векторски запис
уграђује се и умеће у `vec_memories` пре покретања претраге. Овим се
трошак допунског попуњавања распоређује на стварне захтеве без блокирања покретања.

**Експлицитно поновно индексирање**: Картица Engine у `/dashboard/memory` садржи дугме
„Поново индексирај сада“, које позива `POST /api/memory/reindex`. Обрађивач позива
`runReindexBatch()` из `src/lib/memory/reindex.ts`, који обрађује највише
`limit` ставки на чекању по захтеву. Напредак се може проверавати путем
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Табела `memory_vec_meta` (миграција `083_memory_vec.sql`) чува:

- `active_dim` — тренутна димензија вектора (null = још није калибрисано).
- `embedding_signature` — `${source}:${model}:${dim}` који се користи за откривање промена.
- `last_reset_at` — временска ознака последњег потпуног ресетовања.
- `vec_loaded` — ознака 0/1 која показује да ли је sqlite-vec успешно учитан.

## Проширење подешавања

Девет поља за уграђивање и векторе доступно је у `MemorySettingsExtended` у
`src/shared/schemas/memory.ts`, а трајно се чувају путем `src/lib/db/settings.ts`:

| Поље                     | Тип                                                | Подразумевано | Опис                                                           |
| ------------------------ | -------------------------------------------------- | ------------- | -------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`      | Који извор уграђивања треба користити                          |
| `embeddingProviderModel` | `string \| null`                                   | `null`        | Добављач/модел у формату `provider/model`                      |
| `customBaseUrl`          | `string \| null`                                   | `null`        | Основни URL OpenAI-компатибилне крајње тачке само за Memory    |
| `customModelId`          | `string \| null`                                   | `null`        | ID модела који се шаље прилагођеној крајњој тачки              |
| `transformersEnabled`    | `boolean`                                          | `false`       | Добровољно укључивање Transformers.js (MiniLM, ~400MB)         |
| `staticEnabled`          | `boolean`                                          | `false`       | Добровољно укључивање локалног статичког модела potion-base-8M |
| `rerankEnabled`          | `boolean`                                          | `false`       | Омогућавање корака поновног рангирања (додаје +200-500ms/req)  |
| `rerankProviderModel`    | `string \| null`                                   | `null`        | Добављач/модел за поновно рангирање у формату `provider/model` |

`rerankProviderModel` се разрешава путем `POST /v1/rerank` (позваног преко повратне петље), па прихвата све што прихвата и та рута: одабрани модел у облаку за поновно рангирање (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) или чвор OpenAI-компатибилног добављача у облику `<node-prefix>/<model>` (нпр. `skilled-mini/bge-reranker-v2-m3` за TEI/Infinity систем). Чворови на повратној петљи су увек прихватљиви; чвор на другом хосту (LAN, Tailscale) додатно захтева заставицу функције `RERANK_REMOTE_PROVIDER_NODES` и мора да задовољи политику одлазних URL-ова добављача — погледајте [Заставице функција](../reference/FEATURE_FLAGS.md). Селектор на контролној табли приказује одабране добављаче и локалне чворове; сваки важећи ниска `provider/model` може се директно поставити путем `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Коју векторску позадину треба користити |

Ова подешавања су доступна путем `GET /PUT /api/settings/memory` (шема `MemorySettingsExtendedSchema`).

За извор `remote`, Memory такође прихвата опционална подешавања `customBaseUrl` и
`customModelId`. Заједно бирају OpenAI-компатибилну крајњу тачку `/embeddings`
и модел без измене глобалног регистра уграђивања. Крајња тачка се нормализује
пре употребе и проверава према политици одлазних URL-ова добављача: захтева се
HTTP(S), уграђени акредитиви и ниске упита се одбацују, а адресе метаподатака
у облаку остају блокиране. Празне вредности задржавају изабраног добављача из
регистра. Грешке враћене контролној табли су пречишћене, а акредитиви крајње
тачке се никада не евидентирају.

> **ЗАДАТАК (D20):** Опсег `global` (дељење меморија између свих API кључева) није
> имплементиран у овом издању. Захтева измене шеме и глобалну путању за
> преузимање. Пратити засебно.

## Слојеви складиштења

### Примарни: SQLite (табела `memories`)

Креирана миграцијом `015_create_memories.sql`:

| Колона                      | Тип                | Напомене                                                                                    |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID генерисан преко `crypto.randomUUID()`                                                  |
| `api_key_id`                | `TEXT NOT NULL`    | Власнички API кључ                                                                          |
| `session_id`                | `TEXT`             | Опциони опсег по разговору                                                                  |
| `type`                      | `TEXT NOT NULL`    | Једно од `factual`, `episodic`, `procedural`, `semantic`                                    |
| `key`                       | `TEXT`             | Стабилан кључ за upsert, нпр. `preference:i_prefer_python`                                  |
| `content`                   | `TEXT NOT NULL`    | Стварни текст чињенице                                                                      |
| `metadata`                  | `TEXT`             | JSON објекат (категорија, extractedAt, извор, ...)                                          |
| `created_at` / `updated_at` | `TEXT`             | Ниске у формату ISO 8601                                                                    |
| `expires_at`                | `TEXT`             | Опциони рок важења; `NULL` означава трајно                                                  |
| `memory_id`                 | `INTEGER UNIQUE`   | Додато помоћу `023_fix_memory_fts_uuid.sql` ради повезивања UUID-ова ↔ FTS5 rowid вредности |

Индекси: `api_key_id`, `session_id`, `type`, `expires_at`, као и јединствени
индекс `memory_id`.

**Семантика upsert операције**: `createMemory()` тражи постојећи ред са истим
`(api_key_id, key)` и ажурира га на месту када га пронађе (спајајући `metadata` путем
плитког spread-а). Ово спречава неограничен раст табеле услед поновљених
изјава о преференцијама.

### Претрага целог текста (виртуелна табела `memory_fts`)

`022_add_memory_fts5.sql` креира FTS5 виртуелну табелу над пољима `content` и
`key`. `023_fix_memory_fts_uuid.sql` исправља грешку из стварног окружења у којој се UUID
примарни кључ није могао спојити са целобројним rowid-ом у FTS5 — миграција додаје
колону `memory_id`, поново креира FTS табелу и повезује окидаче
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) који одржавају FTS синхронизованим при
INSERT, DELETE и UPDATE операцијама.

Користи га `retrieval.ts` за стратегије `semantic` и `hybrid` (погледајте испод).
Код за преузимање врши проверу помоћу `hasTable("memory_fts")` и враћа се на
хронолошки редослед ако FTS табела недостаје или FTS упит изазове грешку.

### Опционо: Qdrant (векторско складиште нивоа 2)

`src/lib/memory/qdrant.ts` имплементира опционалну Qdrant интеграцију као векторско
складиште нивоа 2. Преузимање се усмерава на Qdrant само када је селектор механизма
`memoryVectorStore === "qdrant"` — подразумевана вредност `"auto"` (као и `"sqlite-vec"`)
**никада** не бира Qdrant. Прекидач на картици Engine истовремено поставља **и** `qdrantEnabled` и
`memoryVectorStore`: омогућавање поставља Qdrant као примарно складиште, док онемогућавање
враћа вредност на `"auto"` (#5597 — пре те исправке, омогућавање није имало ефекта јер ништа
није уписивало вредност селектора механизма). Ако Qdrant није доступан или не врати ништа, преузимање
се враћа на sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — векторски представља `key + content` помоћу конфигурисаног
  модела за векторско представљање, обезбеђује да колекција постоји (при првој употреби
  прави векторе са косинусном дистанцом) и умеће или ажурира тачку са корисним садржајем `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — векторски представља упит, претражује
  колекцију филтрирану према `kind = "omniroute_memory"` и, опционо, према
  `apiKeyId` / `sessionId`. Ограничава `topK` на `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — брише једну тачку. Позива га
  `deleteMemory()` након што се уклони ред из SQLite-а (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — групно брише тачке чији је
  `expiresAtUnix` у прошлости или чији је `createdAtUnix` старији од граничне
  вредности периода задржавања. Прво их пребројава како би контролна табла могла да прикаже стварне бројеве.
- `checkQdrantHealth()` — провера стања путем `GET /readyz`, уз мерење кашњења.

Кориснички интерфејс за подешавања приказује Qdrant конфигурацију, проверу стања, тест семантичке претраге
и чишћење на **картици Механизам** странице `/dashboard/memory`. Одговарајуће
руте у `src/app/api/settings/qdrant/` у потпуности су повезане од верзије v3.8.6:

| Рута                                    | Метод         | Опис                                    |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Читање / ажурирање Qdrant подешавања    |
| `/api/settings/qdrant/health`           | `GET`         | Провера доступности + кашњење           |
| `/api/settings/qdrant/search`           | `POST`        | Тест семантичке претраге                |
| `/api/settings/qdrant/cleanup`          | `POST`        | Уклањање истеклих / старих тачака       |
| `/api/settings/qdrant/embedding-models` | `GET`         | Листа доступних модела за векторизацију |

**Напомене о понашању (шта можете очекивати):**

- **Избор механизма** — омогућавање Qdrant-а на картици Механизам поставља га као примарно
  складиште (поставља `memoryVectorStore="qdrant"`); онемогућавање враћа вредност на `"auto"` (#5597).
- **Нема накнадног попуњавања** — у њега се уписују само меморије направљене/ажуриране **након**
  омогућавања Qdrant-а (двоструки упис без чекања на резултат). Претходно постојеће SQLite меморије се **не**
  мигрирају; „Поново индексирај сада“ поново гради само sqlite-vec индекс, а не Qdrant.
- **Димензија вектора се аутоматски открива** из стварног векторског представљања при првој употреби — не
  постоји поље за унос димензије. Промена модела за векторско представљање након што колекција
  већ постоји **не** обрађује се аутоматски: постојећа колекција остаје непромењена, а уписи/претраге
  са неусклађеним димензијама не успевају и прелазе на sqlite-vec. Поново направите колекцију
  (под новим именом или је избришите у Qdrant-у) да бисте променили модел за векторизацију.
- **Метрика дистанце** — увек је **косинусна** (непроменљиво дефинисана при прављењу колекције;
  не може се конфигурисати).
- **Аутентификација** — само API кључ (шаље се као заглавље `api-key`; опционо за локални Docker
  без аутентификације). JWT/RBAC се не користе.
- **Поља конфигурације** — кориснички интерфејс приказује `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` доступни су само преко окружења/базе података, а `vectorSize` се не
  користи за прављење колекције (димензија се добија из векторског представљања).

### Квантизација вектора (int8 — опциона, оба позадинска система)

Оба векторска позадинска система подржавају **опциону int8 квантизацију** ради смањења
меморијског простора који заузимају сачувани вектори (~4× мање него Float32), уз мало смањење тачности проналажења.
Подразумевано је **искључена** на оба система — вектори остају у пуној прецизности осим ако се изричито
не омогући.

| Позадински систем | Подешавање                      | Тип                            | Подразумевано | Где се чита                                                 |
| ----------------- | ------------------------------- | ------------------------------ | ------------- | ----------------------------------------------------------- |
| Qdrant            | `qdrantQuantization` (DB кључ)  | `"none" \| "int8" \| "binary"` | `"none"`      | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec        | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`      | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** се конфигурише за сваку инстанцу помоћу кључа подешавања `qdrantQuantization`
  (изложеног као поље `quantization` у `PUT /api/settings/qdrant`). Када је вредност
  `"int8"`, `buildQuantizationConfig()` захтева скаларну квантизацију
  (`always_ram`, квантил `0.99`), а претраге омогућавају `rescore: true` како би
  вектори пуне прецизности прецизирали скуп int8 кандидата.
- **sqlite-vec** квантизација доступна је **само преко окружења** (није подешавање базе података): поставите
  `MEMORY_VEC_QUANTIZATION=int8` да бисте локалне векторе чували као колону `int8[dim]`
  помоћу `vec_quantize_int8(?, 'unit')`. Изабрани режим укључује се у
  `embedding_signature` (суфикс `:int8`), па промена режима покреће потпуно
  поновно индексирање табеле `vec_memories` — истом путањом лењог накнадног попуњавања која се користи када
  се промени модел за векторско представљање.

## Типови меморије

`MemoryType` (`src/lib/memory/types.ts`):

| Тип          | Користи се за                                                                       |
| ------------ | ----------------------------------------------------------------------------------- |
| `factual`    | Преференције, стабилне чињенице о кориснику, обрасци понашања                       |
| `episodic`   | Одлуке везане за одређени тренутак („Изабрао сам Postgres“)                         |
| `procedural` | Меморија тока рада / упутстава (резервисано; тренутно нема аутоматског екстрактора) |
| `semantic`   | Резервисано за уносе у векторском складишту                                         |

Стратегија преузимања за `MemoryConfig` може бити `exact`, `semantic` или `hybrid`,
а опсег може бити `session`, `apiKey` или `global`. Подразумевани опсег из
`getMemorySettings()` је `apiKey`.

## Издвајање чињеница (`extraction.ts`)

Издвајање је засновано на **регуларним изразима**, а не на LLM-у — извршава се унутар процеса помоћу
`setImmediate()`, тако да никада не блокира ток одговора:

- **Обрасци преференција** → `MemoryType.FACTUAL`
  (нпр. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Обрасци одлука** → `MemoryType.EPISODIC`
  (нпр. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Обрасци понашања** → `MemoryType.FACTUAL`
  (нпр. `I usually …`, `I always …`, `I tend to …`)

Сваки резултат подударања се чисти (`trim`, сажимање размака, ограничење на 500 знакова),
дедуплицира унутар пакета помоћу стабилног `factKey(category, content)` и
чува преко `createMemory()` са метаподацима
`{category, extractedAt, source: "llm_response"}`. Улазни текст је ограничен на
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — када је дужи, користи се **крај** текста
како би најновији садржај асистента увек био обухваћен.

`extractFactsFromText(text)` се извози за тестове и враћа структуриране
чињенице без њиховог чувања.

## Преузимање (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` је главна улазна тачка. Она:

1. Нормализује и проверава конфигурацију помоћу `MemoryConfigSchema`.
2. Одмах враћа `[]` када је `enabled` нетачно или је `maxTokens <= 0`.
3. Ограничава `maxTokens` на опсег `[1, 8000]`.
4. Открива да ли постоји савремена табела `memories` (уместо застареле табеле `memory`)
   како би старије базе података наставиле да раде.
5. Гради основни упит са провером истека
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), опционим
   опсегом сесије и опционим ограничењем `retentionDays`.
6. Грана се на основу стратегије:
   - **`exact`** (подразумевано): хронолошки `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ако `config.query` и `memory_fts` постоје, користи JOIN
     `memory_fts MATCH ?` и сортира према FTS рангу; враћа се на хронолошки редослед
     када FTS врати 0 редова.
   - **`hybrid`**: унија FTS резултата (већа релевантност) и
     хронолошког скупа, дедуплицирана према id-у.
7. Израчунава оцену релевантности кључних речи (`getRelevanceScore`) над
   `content`, `key` и JSON-ом `metadata` када је упит наведен. Редови са
   оценом нула се филтрирају.
8. Сортира опадајуће према оцени, а затим опадајуће према `createdAt`.
9. Пролази кроз рангирану листу и прихвата уносе док текући збир
   `estimateTokens(content)` (≈ `length / 4`) остаје у оквиру буџета. Увек
   враћа најмање један унос када постоји било које подударање.

`estimateTokens` се извози и користи за преузимање, сажимање и MCP
алатку `omniroute_memory_search`.

## Убризгавање (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Обједињује сав садржај меморије у један стринг `Memory context: …`.
2. Бира стратегију на основу назива провајдера:
   - **Системска порука** (подразумевано за OpenAI, Anthropic, Gemini, …) — додаје
     `{role: "system", content: memoryText}` испред свих постојећих системских
     порука, тако да кориснички системски упити и даље имају предност.
   - **Корисничка порука** (резервна опција) — за провајдере у
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Они одбацују системску улогу
     и у супротном би вратили 400 (видети проблем #1701 за GLM/Zhipu).
3. Бележи број, стратегију и модел под `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` се извози за позиваоце којима је
потребно да самостално доносе одлуке о усмеравању. За непознате провајдере подразумевана
вредност је `true` (системска улога је дозвољена) ради безбедности.

## Подешавања (`settings.ts`)

Конфигурација меморије се **чува у табели подешавања базе података**, а не у променљивама окружења.
`getMemorySettings()` чита из `getSettings()` и кешира резултат
унутар процеса; `invalidateMemorySettingsCache()` се позива преко PUT
руте за подешавања након уписа.

### Застарела поља (све верзије)

| Кључ у бази података  | Тип       | Подразумевано                                        | Контрола корисничког интерфејса                          |
| --------------------- | --------- | ---------------------------------------------------- | -------------------------------------------------------- |
| `memoryEnabled`       | логички   | `false` (подразумевано искључено од v3.8.30)         | Укључивање/искључивање меморије                          |
| `memoryMaxTokens`     | цео број  | `2000` (опсег `0–16000`)                             | Буџет токена за убризгавање                              |
| `memoryRetentionDays` | цео број  | `30` (опсег `1–365`)                                 | Период задржавања                                        |
| `memoryStrategy`      | набрајање | `"hybrid"` (једно од `recent`, `semantic`, `hybrid`) | Стратегија преузимања                                    |
| `skillsEnabled`       | логички   | `false`                                              | Укључује убризгавање вештина по кључу (видети SKILLS.md) |

Напомена: стратегија корисничког интерфејса `"recent"` мапира се на интерну стратегију преузимања
`"exact"` преко `toMemoryRetrievalConfig()` (хронолошки редослед).

### Нова поља (v3.8.6, план 21 D9)

Описе поља погледајте и у одељку „Проширење подешавања“ изнад.

| Кључ у бази података        | API поље                 | Подразумевано |
| --------------------------- | ------------------------ | ------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`      |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`        |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`       |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`       |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`       |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`        |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`      |

Кључеве базе података повезане са Qdrant-ом (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` са подразумеваном вредношћу `"omniroute_memory"`,
`qdrantEmbeddingModel` са подразумеваном вредношћу `"openai/text-embedding-3-small"`) чита
`normalizeQdrantConfig()` у `qdrant.ts`.

### Променљиве окружења (v3.8.6)

Шест опционих променљивих окружења подешава понашање механизма током извршавања (документовано у `.env.example`):

| Променљива                      | Подразумевано              | Опис                                                                                                                                                  |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL кеша угњежђивања (5 мин)                                                                                                                          |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Максималан број ставки у LRU кешу угњежђивања                                                                                                         |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF репозиторијум за Transformers.js модел                                                                                                             |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF репозиторијум за статички potion модел                                                                                                             |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Место за чување преузетих модела                                                                                                                      |
| `MEMORY_VEC_TOP_K`              | `20`                       | Подразумевани top-K за векторску претрагу                                                                                                             |
| `MEMORY_RRF_K`                  | `60`                       | RRF константа k за хибридну претрагу                                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Поставите на `int8` да бисте локалне sqlite-vec векторе чували квантизоване (приближно 4× мање; опционо). Промена режима захтева поновно индексирање. |

## Сажимање (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` сажима старији
садржај када текући укупан број токена у меморијама једног кључа премаши
ограничење. Пролази кроз редове опадајуће по `created_at`, задржава редове који
се уклапају, а у осталима замењује `content` на лицу места првим трима реченицама
оригинала. `tokensSaved` представља разлику у `estimateTokens` између старог и
новог садржаја.

Ова рутина је **доступна, али се не позива аутоматски** у тренутном
систему за обраду ћаскања — позовите је из cron задатка, администраторске радње или
спојног кода за `MemoryConfig.autoSummarize` ако вам је потребно континуирано сажимање. Губитак
података је неповратан: оригинални текст се преписује.

## REST API

Све крајње тачке захтевају управљачку аутентификацију (`requireManagementAuth`).

### Основне крајње тачке за меморију (постојеће + ажуриране)

| Метод    | Путања               | Опис                                                                                                                                                                                    |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Страничена листа са филтерима: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Одговор садржи `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`         |
| `POST`   | `/api/memory`        | Креира унос (проверен помоћу Zod-а: `content`, `key`, опционо `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Позива `createMemory()`, који врши upsert на `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Добавља један унос према UUID-у                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | Ажурира поља уноса (`type`, `key`, `content`, `metadata`). Тело: `MemoryUpdatePutSchema`. Такође синхронизује вектор ако је доступан извор угнежђивања.                                 |
| `DELETE` | `/api/memory/[id]`   | Брише унос; такође га брише из `vec_memories` (D15) и, по принципу најбољег покушаја, из Qdrant-а. Враћа 404 када унос не постоји.                                                      |
| `GET`    | `/api/memory/health` | Покреће `verifyExtractionPipeline("health-check")` — кружни ток креирање→листање→брисање. Враћа `{working, latencyMs, error?}`                                                          |

### Нове крајње тачке механизма меморије (план 21)

| Метод  | Путања                            | Опис                                                                                                                                                                                             |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/memory/retrieve-preview`    | Пробно покретање `retrieveMemories` — враћа рангиране резултате са оценом, нивоом и токенима. Тело: `RetrievePreviewSchema`. НЕ умеће нити мења меморије.                                        |
| `GET`  | `/api/memory/embedding-providers` | Наводи добављаче са моделима угнежђивања и означава који од њих имају конфигурисан API кључ.                                                                                                     |
| `GET`  | `/api/memory/engine-status`       | Враћа потпуни статус механизма: ниво кључних речи, разрешење угнежђивања, статистику векторског складишта, стање Qdrant-а и конфигурацију поновног рангирања. Облик: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ручно покреће сажимање меморије. Тело: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Враћа `{candidates, tokensSaved}`.                                                      |
| `POST` | `/api/memory/reindex`             | Покреће поновно векторско индексирање меморија са `needs_reindex=1`. Тело: `MemoryReindexSchema` (`force`). Враћа `{started, pending}`.                                                          |

### Крајње тачке за подешавања

| Метод  | Путања                                  | Опис                                                                                                   |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Тренутни нормализовани `MemorySettingsExtended` (7 нових поља + застарела поља)                        |
| `PUT`  | `/api/settings/memory`                  | Ажурира било које поље из `MemorySettingsExtendedSchema` (укупно 12 поља)                              |
| `GET`  | `/api/settings/qdrant`                  | Тренутна подешавања за Qdrant (`QdrantSettingsSchema`)                                                 |
| `PUT`  | `/api/settings/qdrant`                  | Ажурира подешавања за Qdrant. Тело: `QdrantSettingsUpdateSchema`. `apiKey` = празна ниска уклања кључ. |
| `GET`  | `/api/settings/qdrant/health`           | Провера доступности конфигурисане инстанце Qdrant-а. Враћа `QdrantHealthResultSchema`.                 |
| `POST` | `/api/settings/qdrant/search`           | Тест семантичке претраге у Qdrant-у. Тело: `QdrantSearchSchema` (`query`, `topK`).                     |
| `POST` | `/api/settings/qdrant/cleanup`          | Уклања тачке из Qdrant-а за истекле / старе меморије.                                                  |
| `GET`  | `/api/settings/qdrant/embedding-models` | Наводи моделе угнежђивања доступне за Qdrant.                                                          |

Упит за листу `/api/memory` подржава или страничење засновано на параметру `page`
(`parsePaginationParams`) **или** директни `offset` — када је `offset` присутан, он
има предност, а изведени `page` се израчунава за структуру одговора.

## MCP алати (`open-sse/mcp-server/tools/memoryTools.ts`)

Када је MCP сервер омогућен, региструју се три алата за меморију:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → обавија `retrieveMemories()`. Од верзије v3.8.6 (D16), `strategy` се чита
  из `getMemorySettings()` уместо да буде фиксно подешена на `"exact"`. Ако
  је наведен `query`, а `strategy` је `semantic` или `hybrid`, користи се
  векторско складиште када је доступно.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → обавија `createMemory()`. Прихвата само 4 канонска типа:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → излистава
  одговарајуће ставке, опционо их филтрира према временској ознаци креирања,
  а затим сваку брише помоћу `deleteMemory()` (чиме се такође уклањају вектори
  из sqlite-vec + Qdrant).

За детаље о транспорту и опсегу погледајте [MCP-SERVER.md](./MCP-SERVER.md).

## Контролна табла (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` је сада **Studio са 3 картице**:

### Картица: Меморије

- Картица концепта (склопиво објашњење „Како функционише“).
- Листа у реалном времену, претрага и пагинација (одлагање од 300 ms).
- Филтер типова (`factual` / `episodic` / `procedural` / `semantic` / сви).
- Модални прозор за додавање меморије (кључ, садржај, тип).
- Измена у реду (дугме са оловком → `PUT /api/memory/[id]`).
- Брисање по реду (са дијалогом за потврду).
- JSON извоз тренутне странице; JSON увоз преко бирача датотека.
- Картице статистике: `totalEntries`, `tokensUsed`, `hitRate`.
- Дугме „Сажми старе“ → `POST /api/memory/summarize` (пробно покретање прво
  приказује број кандидата, а затим тражи потврду).
- Зелена/црвена тачка стања којом управља `GET /api/memory/health`.

### Картица: Игралиште

- Поље за упит + бирач стратегије (Тачно / Семантичко / Хибридно) + буџет токена.
- „Симулирај“ → `POST /api/memory/retrieve-preview` — приказује рангиране резултате
  са `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Панел разрешења који приказује који су извор угнежђења / векторско складиште
  коришћени и да ли је дошло до преласка на резервну опцију.

### Картица: Механизам

- Панел стања механизма (ознака за FTS5 претрагу по кључним речима, ознака за
  угнежђење, ознака за векторско складиште, ознака стања Qdrant-а, ознака за
  поновно рангирање).
- Дугме „Поново индексирај сада“ → `POST /api/memory/reindex`.
- Бирач извора угнежђења (аутоматски / удаљени / статички / трансформатори +
  прекидачи).
- Картица за подешавање Qdrant-а (прекидач за омогућавање,
  хост/порт/колекција/кључ, тестирање везе, тест семантичке претраге, чишћење).
- Картица за подешавање поновног рангирања (прекидач за омогућавање, бирач
  добављача/модела).

Подешавања меморије и Qdrant-а такође се налазе у одељку
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) као
наслеђени/глобални интерфејс за подешавања.

## Кеширање

`src/lib/memory/store.ts` одржава LRU кеш налик процесном
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, уз уклањање 20 %
најстаријих ставки) за читања `getMemory(id)`, као и генерички слој
`memoryCache` са кључевима и вредностима (`src/lib/memory/cache.ts`), са
методама `get`/`set`/`invalidate`, који користе позиваоци којима је потребан
сопствени кеш ограниченог опсега (LRU од 1 000 ставки, подразумевани TTL 5 min).

## Приватност и животни циклус

- Власништво над меморијом одређује ID API кључа (`resolveMemoryOwnerId` у
  `chatCore.ts`). Без `apiKeyInfo.id` не извршавају се ни преузимање, ни уметање,
  ни издвајање.
- Уноси са `expires_at` у будућности филтрирају се из резултата преузимања; стари
  уноси изван периода `retentionDays` искључују се клаузулом
  `created_at >= cutoff` у `retrieveMemories`.
- За трајно брисање користите `DELETE /api/memory/[id]` или `omniroute_memory_clear`.
- Издвајање се покреће асинхроно, без чекања на резултат, преко `setImmediate`; грешке се евидентирају под
  `memory.extraction.background.failed` и никада се не приказују позиваоцу.
- Кружне провере (`verifyExtractionPipeline`) чисте сопствене
  тестне уносе у блоку `finally`.

## Такође погледајте

- [SKILLS.md](./SKILLS.md) — подешавање `skillsEnabled` умеће дефиниције
  алата заједно са меморијом.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP транспорт / опсези.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — шири опсег API-ја.
- Изворни модули:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + хибридни RRF
  - `src/lib/memory/embedding/index.ts` — слој за уграђивање из више извора
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod шеме за сва тела API захтева за меморију
  - `src/shared/schemas/qdrant.ts` — Zod шеме за Qdrant подешавања/операције
  - `src/lib/db/memoryVec.ts` — CRUD за `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + подруте
  - `src/app/(dashboard)/dashboard/memory/` — кориснички интерфејс Студија (страница + компоненте +
    картице + куке)
  - `open-sse/handlers/chatCore.ts` (повезивање уметања / издвајања)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Избор добављача уграђивања (v3.8.16+)

OmniRoute механизам меморије подржава **четири извора уграђивања** (`src/lib/memory/embedding/`). Сваки има различите компромисе у погледу **кашњења, цене, квалитета модела и сложености подешавања**.

### Извори уграђивања

| Добављач       | Извор                                        | Кашњење                                 | Цена                 | Квалитет                                 | Подешавање                                      |
| -------------- | -------------------------------------------- | --------------------------------------- | -------------------- | ---------------------------------------- | ----------------------------------------------- |
| `transformers` | Локални ONNX модел (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                         | Бесплатно            | Добар                                    | Само `npm install`                              |
| `static`       | Унапред израчунати вектори (кеширани)        | <1ms                                    | Бесплатно            | Није применљиво (зависи од поготка кеша) | Није потребно                                   |
| `remote`       | OpenAI / Cohere / Voyage API                 | ~100-300ms                              | $0.02-0.10/1M токена | Одличан                                  | API кључ                                        |
| `auto`         | Бира најбољи доступан извор током извршавања | Исто као изабрани извор                 | Бесплатно            | Исто као изабрани извор                  | Није потребно                                   |
| _(кеш)_        | LRU слој у меморији изнад било ког извора    | <1ms (погодак), пуно кашњење (промашај) | Бесплатно            | Исто као основни извор                   | Увек укључен (није извор који се може изабрати) |

### Стабло одлучивања

```
                  Какво је ваше окружење за примену?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  РАЗВОЈ/ТЕСТ  МАЛА ПРОД.  ВЕЛИКА ПРОД.  EDGE / ВАН МРЕЖЕ
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (бесплатно, без API-ја)    (најбољи квалитет) (без интернета)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            УВЕК додајте слој `cache` изнад
            (LruCache обавија било ког добављача)
```

### Конфигурација базе података и API-ја

Опције уграђивања меморије конфигуришу се преко API-ја/корисничког интерфејса за подешавања, а не преко променљивих окружења. Релевантни кључеви подешавања базе података у оквиру Подешавања (`normalizeMemorySettings` у `src/lib/memory/settings.ts`) су:

- `memoryEmbeddingSource`: `"transformers"` (локално), `"remote"` (засновано на API-ју, нпр. OpenAI), `"static"` (спољно складиште) или `"auto"`
- `memoryEmbeddingProviderModel`: Идентификатор модела за удаљене/статичке изворе (нпр. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` или `"auto"`

#### Локални модел (`transformers`)

Интерно користи transformers.js за покретање локалних модела:

```bash
# Променљиве окружења које се читају у коду (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Репозиторијум HF модела
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion модел
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Директоријум кеша
```

#### LRU кеш уграђивања

Кеш је подразумевано увек укључен и конфигурише се преко променљивих окружења:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Максималан број кешираних ставки
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 мин)
```

### Показатељи перформанси

Резултати мерења на типичном x86 серверу са 4 језгра (текстови од ~100 токена):

| Провајдер            | p50   | p95   | p99   | Цена / 1M уграђивања               |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Бесплатно                          |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Зависи од Qdrant хостинга          |
| `cache` (погодак)    | <1ms  | <1ms  | 2ms   | Бесплатно                          |

---

## Обрасци за издвајање чињеница (v3.8.16+)

Модул `extraction.ts` (`src/lib/memory/extraction.ts`) користи **подударање помоћу регуларних израза** за издвајање структурираних чињеница из порука у разговору. Разумевање ових образаца помаже вам да прилагодите квалитет издвајања свом случају употребе.

### Подразумеване категорије образаца

| Категорија          | Пример обрасца                                              | Издваја                     |
| ------------------- | ----------------------------------------------------------- | --------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Корисничке преференције     |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Одлуке корисника (епизодне) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Трајни обрасци понашања     |

### Примери образаца (поједностављено)

```ts
// Из src/lib/memory/extraction.ts
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

### Шта се издваја

Када корисник каже:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Издвајање производи 4 меморије:
>
> | Кључ                                 | Категорија | Тип      | Садржај                     |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Ограничења издвајања

Да би се спречило неконтролисано издвајање, примењују се следећа ограничења:

| Минимална дужина садржаја | 3 знака |
| Максимална дужина садржаја | 500 знакова |

### Када онемогућити издвајање

Издвајање се покреће аутоматски кад год је меморија омогућена; не постоји засебан
прекидач само за издвајање. Да бисте га искључили, потпуно онемогућите меморију (`enabled: false`
путем `PUT /api/settings/memory`). Размотрите то у следећим случајевима:

- Имате велики обим порука, а трошак издвајања није занемарљив
- Ваши разговори су углавном привремени (ћаскање, отклањање грешака) и немају дугорочну вредност
- Већ прикупљате контекст помоћу прилагођених додатака

---

## Подешавање хибридног RRF-а (v3.8.16+)

Алгоритам **Reciprocal Rank Fusion (RRF)** комбинује FTS5 резултате (кључне речи) и векторске резултате (семантичке). Параметар `k` контролише колика се тежина додељује ниже рангираним резултатима.

### Формула

За сваку кандидатску меморију, RRF резултат је:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Где је:

- `k` константа (подразумевано 60)
- `rank_i(d)` ранг документа `d` у i-том систему за проналажење (FTS, векторски)
- Збир се рачуна преко свих система за проналажење

### Како `k` утиче на резултате

| Вредност `k`               | Ефекат                                                                                         | Најбоље за                               |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `k=0`                      | Чисто обједињавање рангова (без углађивања)                                                    | Теоријску полазну основу                 |
| `k=10-30`                  | Снажно фаворизује најбоље резултате, док ниски рангови једва доприносе                         | Када су прва 3 резултата обично исправна |
| **`k=60`** (подразумевано) | Уравнотежено — свих првих 10 резултата значајно доприноси                                      | Проналажење опште намене                 |
| `k=100+`                   | Равномерније — чак и ниско рангирани резултати могу доминирати ако се појављују у више система | Када је одзив важнији од прецизности     |

### Подешавање `k` у пракси

```bash
# Подразумевано
MEMORY_RRF_K=60

# Агресивна прецизност (мала меморија, мало докумената)
MEMORY_RRF_K=20

# Максималан одзив (велика меморија, разноврсни упити)
MEMORY_RRF_K=120
```

**Пример са `k=20`:**

- FTS ранг 1 → допринос `1/21 = 0.048`
- FTS ранг 10 → допринос `1/30 = 0.033`
- Векторски ранг 1 → допринос `0.048`
- Максимум у комбинацији: `0.096`

**Пример са `k=60`:**

- FTS ранг 1 → допринос `1/61 = 0.016`
- FTS ранг 10 → допринос `1/70 = 0.014`
- Векторски ранг 1 → допринос `0.016`
- Максимум у комбинацији: `0.033`

Са већим `k`, **релативна разлика** између првог и десетог ранга је мања, па се алгоритам више ослања на **сагласност између система за проналажење** него на поузданост највишег ранга.

### Када променити `k`

| Симптом                                         | Покушај                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Најбољи резултат увек побеђује, али је погрешан | **Смањите** k (нпр. 20) — поузданост највишег ранга је важнија          |
| Прави одговор је међу првих 5, али није први    | **Повећајте** k (нпр. 100) — равномерније бодовање награђује сагласност |
| Одзив је висок, али је прецизност ниска         | **Смањите** k — изоштрите рангирање                                     |
| Одзив је низак (недостају релевантни документи) | **Повећајте** k — дајте шансу ниже рангираним документима               |

### RRF пондерисање

Обједињавање реципрочних рангова користи једнаке тежине за семантички векторски ранг и ранг претраге целог текста:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Не постоје променљиве окружења за подешавање појединачних тежина (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` не постоје).

---

## Стратегија сажимања (v3.8.16+)

Модул `summarization.ts` (`src/lib/memory/summarization.ts`) сажима старије меморије како би активни скуп остао мали, уз очување могућности присећања.

### Када се сажимање покреће

| Окидач                       | Праг (подразумевано) |
| ---------------------------- | -------------------- |
| Ручно покретање путем API-ја | није примењиво       |

### Шта се сажима

Из `summarization.ts` се извозе две улазне тачке:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — сажима
  меморије за сесију у један текстуални сажетак ограничен буџетом токена.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — сажимање засновано
  на старости које користи API: бира сваку меморију старију од `days`, од њих
  прави једну сажету меморију и (када је `dryRun` постављен на `false`) брише
  оригинале. Проследите `dryRun: true` да бисте прегледали скуп кандидата и укупан
  број токена без измене било чега.

Не постоји фаза груписања по ознакама/кључевима нити оцењивање појединачних меморија као „основних наспрам оних које се могу сажети“ —
избор се заснива искључиво на старосној граници, а текст сажетка представља сажет,
типом префиксиран ред за сваког кандидата.

### Покретање сажимања

Сажимање је **ручно / опционо** — подешавање `autoSummarize` је подразумевано
постављено на `false`, тако да се ништа не сажима аутоматски. Покрените га путем API-ја:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Да би остало искључено, једноставно задржите `autoSummarize` на подразумеваној вредности (`false`).

### Савети за квалитет сажимања

- **Прво прегледајте помоћу `dryRun`** — `summarizeMemoriesOlderThan(..., true)` враћа
  листу кандидата и укупан број токена, како бисте могли да потврдите шта ће бити спојено
  пре брисања оригинала.
- **Покрећите сажимање током периода малог саобраћаја** ако имате велики корпус меморија — LLM позив је најспорији део

```bash
# У стилу cron-а: сажимај сваког дана у 3 ујутру
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Образац добављача MemoryBackend

> **Меродавни извори:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Тестови:** `src/lib/memory/__tests__/generic-backend.test.ts`

Образац добављача MemoryBackend уводи **заменљиви слој апстракције позадинског система** преко постојећег механизма меморије. Уместо везивања за једну имплементацију складишта, систем меморије сада подржава више позадинских система (SQLite, Obsidian, Notion, прилагођене HTTP позадинске системе) са подесивим усмеравањем на примарни и резервне системе.

### Архитектура

```
┌──────────────────────────────────────────────────────────┐
│                    API руте                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Singleton оркестратор (manager.ts)                  │
│                                                          │
│  Примарни ──► Позадински систем A  (нпр. SQLite)         │
│  Резервни  ─► Позадински систем B  (нпр. Obsidian)       │
│               Позадински систем C  (нпр. Notion путем    │
│                                      GenericBackend)      │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ позадински │ │ позадински │ │ позадински       │
│ систем     │ │ систем     │ │ систем (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Основни интерфејс (`backend.ts`)

Сваки позадински систем мора да имплементира интерфејс `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD операције
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Претрага
  search(config: SearchConfig): Promise<Memory[]>;

  // Стање
  health(): Promise<HealthCheckResult>;

  // Животни циклус (опционо)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton оркестратор који:

- **Региструје** позадинске системе помоћу `register(backend)` — позива се при покретању из `index.ts`
- **Подешава** примарни и резервне системе помоћу `configure(primary, fallbacks)`
- **Усмерава** CRUD операције/претрагу ка примарном систему, уз ланац резервних система у случају отказа
- **Проверава стање** свих позадинских система у редовним интервалима

**Понашање резервних система:**

| Операција | Примарни                     | Резервни                               |
| --------- | ---------------------------- | -------------------------------------- |
| `create`  | ✅ Само примарни             | ❌                                     |
| `get`     | ✅ Прво покушај са примарним | ✅ Резервни ако је резултат null       |
| `update`  | ✅ Само примарни             | ✅ Асинхрона синхронизација без чекања |
| `delete`  | ✅ Само примарни             | ✅ Асинхрона синхронизација без чекања |
| `list`    | ✅ Само примарни             | ❌                                     |
| `search`  | ✅ Прво примарни             | ✅ Резервни у случају грешке           |

#### GenericMemoryBackend (`genericBackend.ts`)

Генерички HTTP конектор који прилагођава било који REST API интерфејсу MemoryBackend. Користан је за:

- **Notion** — повезивање путем Notion API-ја
- **Obsidian** — повезивање путем Obsidian Local REST API-ја
- **Прилагођене позадинске системе** — било коју услугу која излаже RESTful API за меморију

**Конфигурација:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Основни URL позадинског API-ја
  apiKey?: string;           // Bearer токен за аутентификацију
  headers?: Record<string, string>;  // Прилагођена HTTP заглавља
  timeout?: number;          // Временско ограничење захтева (подразумевано: 30000ms)
  backendType?: string;      // За евидентирање

  // Замене крајњих тачака (подразумеване вредности користе REST конвенције)
  endpoints?: {
    search?: string;   // подразумевано: "/memories/search"
    create?: string;   // подразумевано: "/memories"
    list?: string;     // подразумевано: "/memories"
    get?: string;      // подразумевано: "/memories/{id}"
    update?: string;   // подразумевано: "/memories/{id}"
    delete?: string;   // подразумевано: "/memories/{id}"
    health?: string;   // подразумевано: "/health"
  };

  // Мапирања назива параметара упита
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Мапирања назива параметара путање
  pathParams?: {
    id?/memoryId?
  };
}
```

**Позадински системи са познатом конфигурацијом** су унапред конфигурисани у `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend усмерен на localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend усмерен на api.notion.com/v1
```

#### Уграђени позадински системи

##### SQLiteBackend (`sqliteBackend.ts`)

Подразумевани примарни позадински систем. Обухвата постојеће SQLite складиште меморије користећи `src/lib/memory/store.ts`. Аутоматски се региструје при покретању.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Обухвата постојећу Obsidian интеграцију (`src/lib/memory/obsidianBackend.ts`). Повезује се са Obsidian трезором преко Obsidian Local REST API-ја.

### Подешавања

Подешавања позадинског система меморије чувају се у табели подешавања апликације и њима се управља преко `src/lib/memory/settings.ts`:

| Подешавање                  | Кључ окружења/конфигурације | Подразумевано | Опис                                         |
| --------------------------- | --------------------------- | ------------- | -------------------------------------------- |
| Примарни позадински систем  | `memoryPrimaryBackend`      | `"sqlite"`    | ID примарног позадинског система             |
| Резервни позадински системи | `memoryFallbackBackends`    | `[]`          | Уређена листа ID-јева резервних система      |
| Конфигурације система       | `memoryBackendConfigs`      | `{}`          | Замене конфигурације за сваки систем засебно |

Подешавања се нормализују помоћу `normalizeMemorySettings()` и кеширају у `getMemorySettings()`.

### Ток иницијализације

```
Покретање апликације
  → index.ts увози (као споредни ефекат): региструје SQLiteBackend
  → initMemoryBackends() се позива из животног циклуса апликације:
      1. Учитавање подешавања (getMemorySettings)
      2. Конфигурисање примарног и резервних система
      3. Иницијализација свих позадинских система (провера исправности)
      4. Спремно за захтеве
```

### Додавање новог позадинског система

1. **Имплементирајте `MemoryBackend`** интерфејс у `src/lib/memory/<name>Backend.ts`
2. **Извезите** из `src/lib/memory/index.ts`
3. **Региструјте** помоћу `memoryManager.register(yourBackend)` при покретању
4. **Конфигуришите** преко подешавања: поставите `memoryPrimaryBackend` на ID свог позадинског система
5. **Тестирајте** користећи `src/lib/memory/__tests__/generic-backend.test.ts` као референцу

#### Пример: Brain позадински систем

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

### Провера

#### Јединични тестови

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Очекивани резултат: **35 тестова, сви успешни**, који обухватају:

- Конструктор (2)
- Провера исправности (4) — успех, грешка 500, мрежна грешка, кашњење
- Иницијализација (2) — успех, неуспех
- Креирање (2) — подразумевана крајња тачка, прилагођена крајња тачка
- Добављање (4) — успех, 404 → null, грешка која није 404 се прослеђује, прилагођени параметри путање
- Ажурирање (2) — успех, 404 → false
- Брисање (2) — успех, 404 → false
- Листање (2) — параметри упита, прилагођени називи параметара
- Претрага (3) — параметри упита, прилагођена крајња тачка, серијализација опција
- Заглавља за аутентификацију (2) — Bearer токен, прилагођена заглавља
- Фабрика (1)

#### Провера типова

```bash
npm run typecheck:core
```

Очекивано: **0 грешака**.
