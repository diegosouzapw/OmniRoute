---
title: "System Memory"
version: 3.8.40
lastUpdated: 2026-06-28
---

# System Memory

> **Source of truth:** `src/lib/memory/` and `src/app/api/memory/`
> **Last updated:** 2026-06-28 — v3.8.40 (off-by-default + int8 quantization catch-up)

OmniRoute zapewnia trwałą pamięć konwersacyjną powiązaną z kluczem API (oraz
opcjonalnie z identyfikatorem sesji). Wspomnienia są wyodrębniane automatycznie
z odpowiedzi LLM poprzez lekkie dopasowanie wzorców regex i wstrzykiwane z powrotem
do kolejnych żądań jako wiodąca wiadomość systemowa (albo pierwsza wiadomość
użytkownika dla dostawców, którzy odrzucają rolę system).

> **Memory jest WYŁĄCZONE domyślnie (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ma teraz wartość `false` (`src/lib/memory/settings.ts`). Włączenie pamięci wstrzykuje
> do `maxTokens` (~2k) pobranego kontekstu do **każdego** żądania chat, co jest
> rozliczane — zaskakujący koszt przy nowych instalacjach i dla klientów, które
> same zarządzają swoim kontekstem. Włącz jawnie w **Settings → Memory**
> (`MemorySkillsTab` pokazuje ostrzeżenie o koszcie tokenów, gdy pamięć jest włączona).
> Klient może wyłączyć pamięć dla pojedynczego żądania nagłówkiem `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — zobacz tabelę nagłówków żądań w
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Żądanie no-memory ustawia
> `memoryOwnerId = null`, co wyłącza **zarówno** wstrzykiwanie pamięci, jak i skilli
> dla tego żądania (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Pamięć jest **zakresowana per klucz API**, nie per użytkownik — każde żądanie
uwierzytelnione tym samym kluczem API dzieli ten sam pulę pamięci, z opcjonalnym
dalszym zakresowaniem przez `sessionId`.

## Architektura

```
Client → /v1/chat/completions (apiKeyInfo resolved upstream)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extracts id
    → getMemorySettings()                     # cached settings
    → shouldInjectMemory(body, {enabled})     # gate
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + optional vector
    → injectMemory(body, memories, provider)  # system or user message
  → upstream provider call
  → on response: extractFacts(text, apiKeyId, sessionId)  # non-blocking
    → setImmediate → createMemory(fact) per match
                   → embed(content) + upsertVector(id, vec)
```

Miejsca wywołań wstrzykiwania i ekstrakcji są podpięte w
`open-sse/handlers/chatCore.ts` (szukaj `retrieveMemories`, `injectMemory`
oraz `extractFacts`).

## Architektura silnika (rozstrzyganie 3-poziomowe)

Memory Engine rozstrzyga ścieżkę retrieval w runtime na podstawie dostępnej
infrastruktury i ustawień. Istnieją trzy poziomy, stosowane w kolejności priorytetu:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 0 — Keyword (FTS5)                                     │
  │  Always available. SQLite FTS5 full-text search over         │
  │  content + key. Used when strategy = "exact" or as fallback. │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 1 — Embedded Vector (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 loaded via db.loadExtension().            │
  │  KNN brute-force over Float32 vectors. Active when:          │
  │   • sqlite-vec loadExtension succeeds                        │
  │   • An embedding source is available (remote | static |      │
  │     transformers) that can produce a Float32Array            │
  │   • vec_memories table exists (created on first ready())     │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 2 — Qdrant (opt-in external vector database)           │
  │  When enabled, replaces sqlite-vec for semantic/hybrid.      │
  │  Requires running Qdrant instance + configured host/port.    │
  └─────────────────────────────────────────────────────────────┘
```

Degradacja jest automatyczna i przezroczysta:

- Jeśli sqlite-vec nie załaduje się, tier 1 jest niedostępny → fallback do tier 0.
- Jeśli źródło embeddingów zwróci błąd, tier 1 spada do tier 0.
- Jeśli Qdrant jest niezdrowy, tier 2 spada do tier 1 (lub tier 0, jeśli tier 1
  też jest niedostępny).

## Źródła embeddingów

Warstwa embeddingów (`src/lib/memory/embedding/`) rozstrzyga, którego źródła użyć
na podstawie `MemorySettingsExtended.embeddingSource`:

| Source         | Description                                                                      | Key required | Cold start       |
| -------------- | -------------------------------------------------------------------------------- | ------------ | ---------------- |
| `remote`       | Używa API embeddingów skonfigurowanego dostawcy (OpenAI, Cohere itd.)            | Yes          | None             |
| `static`       | Lokalny embedding lookup-table przez `potion-base-8M` (WordPiece + mean pooling) | No           | ~200ms           |
| `transformers` | Lokalna inferencja ONNX przez `@huggingface/transformers` v4, `all-MiniLM-L6-v2` | No           | ~3s + ~400MB RAM |
| `auto`         | Rozstrzyganie runtime: remote (jeśli jest klucz) → static → transformers → null  | Depends      | Depends          |

**Kolejność rozstrzygania dla `auto`:**

1. Znajdź pierwszego dostawcę w `listEmbeddingProviders()` z `hasKey === true` → `remote`.
2. Jeśli `settings.staticEnabled === true` → `static`.
3. Jeśli `settings.transformersEnabled === true` → `transformers`.
4. W przeciwnym razie → `null` (degradacja do wyszukiwania słów kluczowych FTS5).

Cache embeddingów (`src/lib/memory/embedding/cache.ts`) używa mapy LRU w pamięci
kluczowanej przez `${source}:${model}:${dim}:${sha256(text)}`, ograniczonej do
`MEMORY_EMBEDDING_CACHE_MAX` wpisów (domyślnie 1000) z TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (domyślnie 5 min). Współdzielony między wszystkimi
wywołującymi w cyklu życia procesu.

## Hybrid RRF (k=60)

Gdy `strategy = "hybrid"` i magazyn wektorowy jest dostępny, retrieval używa
Reciprocal Rank Fusion do scalenia wyników FTS5 i wektorowych:

```
RRF(d) = Σ  1 / (k + rank_i(d))      where k = 60 (configurable via MEMORY_RRF_K)
          i
```

Konkretnie:

1. Uruchom wyszukiwanie FTS5 → ranking `R_fts` (pozycja 1..N).
2. Uruchom wyszukiwanie wektorowe KNN → ranking `R_vec` (pozycja 1..M).
3. Dla każdego unikalnego `memoryId`:
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 jeśli nie ma na liście).
4. Sortuj po `rrf_score` DESC, zastosuj przejście budżetu tokenów.

RRF jest znany z skuteczności bez normalizacji score'ów między
heterogenicznymi systemami retrieval. Domyślne `k=60` pochodzi z oryginalnego
artykułu Cormack et al. i dobrze działa dla małych korpusów (<10k memories).

## Backfill (leniwy + reindex)

Gdy model embeddingów się zmienia (wykrywane przez `embedding_signature`),
magazyn wektorowy jest przebudowywany, a wszystkie istniejące memories dostają
`needs_reindex = 1` w tabeli `memories`.

**Lazy backfill**: Przy następnym retrieval każde memory bez wpisu wektorowego jest
embedowane i wstawiane do `vec_memories` przed uruchomieniem wyszukiwania. To
amortyzuje koszt backfillu na realnych żądaniach bez blokowania startu.

**Explicit reindex**: Zakładka Engine w `/dashboard/memory` udostępnia przycisk
"Reindex Now", który wywołuje `POST /api/memory/reindex`. Handler woła
`runReindexBatch()` z `src/lib/memory/reindex.ts`, które przetwarza do
`limit` oczekujących wpisów na żądanie. Postęp można odpytywać przez
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabela `memory_vec_meta` (migracja `073_memory_vec.sql`) przechowuje:

- `active_dim` — bieżący wymiar wektora (null = jeszcze nie skalibrowany).
- `embedding_signature` — `${source}:${model}:${dim}` używany do wykrywania zmian.
- `last_reset_at` — znacznik czasu ostatniego pełnego resetu.
- `vec_loaded` — flaga 0/1, czy sqlite-vec załadował się pomyślnie.

## Rozszerzenie ustawień

Do `MemorySettingsExtended` (plan 21, D9) w
`src/shared/schemas/memory.ts` dodano siedem nowych pól, utrwalanych przez
`src/lib/db/settings.ts`:

| Field                    | Type                                               | Default  | Description                                       |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Którego źródła embeddingów użyć                   |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Provider/model w formacie `provider/model`        |
| `transformersEnabled`    | `boolean`                                          | `false`  | Opt-in dla Transformers.js (MiniLM, ~400MB)       |
| `staticEnabled`          | `boolean`                                          | `false`  | Opt-in dla lokalnego modelu static potion-base-8M |
| `rerankEnabled`          | `boolean`                                          | `false`  | Włącz krok rerankingu (+200–500 ms/req)           |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Provider/model rerank w formacie `provider/model` |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | Którego backendu wektorowego użyć                 |

Są one wystawione przez `GET /PUT /api/settings/memory` (schemat `MemorySettingsExtendedSchema`).

> **TODO (D20):** Scope `global` (współdzielenie memories między wszystkimi kluczami API)
> nie jest zaimplementowany w tym wydaniu. Wymaga zmian schematu i globalnej ścieżki
> retrieval. Śledź osobno.

## Warstwy przechowywania

### Primary: SQLite (tabela `memories`)

Utworzona przez migrację `015_create_memories.sql`:

| Column                      | Type               | Notes                                                                        |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generowany przez `crypto.randomUUID()`                                  |
| `api_key_id`                | `TEXT NOT NULL`    | Właścicielski klucz API                                                      |
| `session_id`                | `TEXT`             | Opcjonalny zakres per-rozmowa                                                |
| `type`                      | `TEXT NOT NULL`    | Jedno z: `factual`, `episodic`, `procedural`, `semantic`                     |
| `key`                       | `TEXT`             | Stabilny klucz upsert, np. `preference:i_prefer_python`                      |
| `content`                   | `TEXT NOT NULL`    | Właściwy tekst faktu                                                         |
| `metadata`                  | `TEXT`             | Blob JSON (category, extractedAt, source, ...)                               |
| `created_at` / `updated_at` | `TEXT`             | Ciągi ISO 8601                                                               |
| `expires_at`                | `TEXT`             | Opcjonalne wygaśnięcie; `NULL` oznacza trwałe                                |
| `memory_id`                 | `INTEGER UNIQUE`   | Dodane przez `023_fix_memory_fts_uuid.sql` do mostkowania UUID ↔ FTS5 rowids |

Indeksy: `api_key_id`, `session_id`, `type`, `expires_at`, plus unikalny
indeks `memory_id`.

**Semantyka upsert**: `createMemory()` szuka istniejącego wiersza z tym samym
`(api_key_id, key)` i aktualizuje go w miejscu, gdy znajdzie (scalając `metadata`
przez płytki spread). Dzięki temu tabela nie rośnie bez ograniczeń przy
powtarzanych stwierdzeniach preferencji.

### Full-text Search (wirtualna tabela `memory_fts`)

`022_add_memory_fts5.sql` tworzy wirtualną tabelę FTS5 nad `content` i
`key`. `023_fix_memory_fts_uuid.sql` naprawia rzeczywisty bug, w którym UUID
klucza głównego nie łączył się z integer rowid FTS5 — migracja dodaje kolumnę
`memory_id`, odtwarza tabelę FTS i podpina triggery
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), które utrzymują FTS w synchronizacji przy
INSERT, DELETE i UPDATE.

Używane przez `retrieval.ts` dla strategii `semantic` i `hybrid` (patrz poniżej).
Kod retrieval pilnuje `hasTable("memory_fts")` i spada do
kolejności chronologicznej, jeśli tabela FTS nie istnieje lub zapytanie FTS rzuci wyjątek.

### Opcjonalnie: Qdrant (vector store tier 2)

`src/lib/memory/qdrant.ts` implementuje opcjonalną integrację Qdrant jako tier 2
magazynu wektorowego. Retrieval kieruje do Qdrant tylko gdy selektor silnika
`memoryVectorStore === "qdrant"` — domyślne `"auto"` (oraz `"sqlite-vec"`)
**nigdy** nie wybierają Qdrant. Przełącznik w zakładce Engine ustawia **oba**
`qdrantEnabled` i `memoryVectorStore` razem: włączenie czyni Qdrant magazynem
głównym, wyłączenie resetuje do `"auto"` (#5597 — przed tą poprawką włączenie
było martwe, bo nic nie zapisywało selektora silnika). Jeśli Qdrant jest
nieosiągalny lub nic nie zwróci, retrieval spada do sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — embeduje `key + content` skonfigurowanym
  modelem embeddingów, zapewnia istnienie kolekcji (tworzy wektory
  cosine-distance przy pierwszym użyciu) i upsertuje punkt z payloadem
  `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — embeduje zapytanie, przeszukuje
  kolekcję filtrowaną po `kind = "omniroute_memory"` oraz opcjonalnie po
  `apiKeyId` / `sessionId`. Ogranicza `topK` do `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — usunięcie pojedynczego punktu. Wołane przez
  `deleteMemory()` po usunięciu wiersza SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — masowe usuwanie punktów, których
  `expiresAtUnix` jest w przeszłości lub `createdAtUnix` jest starszy niż
  próg retencji. Najpierw liczy, żeby dashboard mógł pokazać rzeczywiste liczby.
- `checkQdrantHealth()` — sonda zdrowia `GET /readyz` z latencją.

UI ustawień udostępnia konfigurację Qdrant, health check, test wyszukiwania
semantycznego i cleanup w **zakładce Engine** `/dashboard/memory`. Odpowiadające
trasy pod `src/app/api/settings/qdrant/` są w pełni podpięte od v3.8.6:

| Route                                   | Method        | Description                           |
| --------------------------------------- | ------------- | ------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Odczyt / aktualizacja ustawień Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | Sonda liveness + latencja             |
| `/api/settings/qdrant/search`           | `POST`        | Test wyszukiwania semantycznego       |
| `/api/settings/qdrant/cleanup`          | `POST`        | Usuń wygasłe / stare punkty           |
| `/api/settings/qdrant/embedding-models` | `GET`         | Lista dostępnych modeli embeddingów   |

**Uwagi behawioralne (czego się spodziewać):**

- **Wybór silnika** — włączenie Qdrant w zakładce Engine czyni go magazynem głównym
  (ustawia `memoryVectorStore="qdrant"`); wyłączenie resetuje do `"auto"` (#5597).
- **Brak back-fill** — do Qdrant trafiają tylko memories utworzone/zaktualizowane
  **po** włączeniu (dual-write fire-and-forget). Istniejące memories SQLite **nie**
  są migrowane; "Reindex Now" przebudowuje tylko indeks sqlite-vec, nie Qdrant.
- **Wymiar wektora jest wykrywany automatycznie** z rzeczywistego embeddinga przy
  pierwszym użyciu — nie ma pola wymiaru do wypełnienia. Zmiana modelu embeddingów
  po utworzeniu kolekcji **nie** jest obsługiwana automatycznie: istniejąca kolekcja
  zostaje nietknięta, zapisy/wyszukiwania z niezgodnym wymiarem kończą się błędem
  i spadają do sqlite-vec. Odtwórz kolekcję (nowa nazwa albo usuń w Qdrant),
  aby zmienić embedder.
- **Metryka odległości** — zawsze **Cosine** (zahardkodowana przy tworzeniu kolekcji;
  niekonfigurowalna).
- **Auth** — tylko klucz API (wysyłany jako nagłówek `api-key`; opcjonalny dla
  lokalnego Dockera bez auth). JWT/RBAC nie są używane.
- **Pola konfiguracji** — UI udostępnia `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` są tylko env/DB, a `vectorSize` nie jest
  używane przy tworzeniu kolekcji (wymiar pochodzi z embeddinga).

### Kwantyzacja wektorów (int8 — opt-in, oba backendy)

Oba backendy wektorowe wspierają **opcjonalną kwantyzację int8**, aby zmniejszyć
zużycie pamięci przechowywanych wektorów (~4× mniejsze niż Float32) przy niewielkim
koszcie recall. Domyślnie **wyłączone** na obu — wektory pozostają pełnej precyzji,
dopóki nie włączysz jawnie.

| Backend    | Setting                         | Type                           | Default  | Where read                                                  |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** konfiguruje się per-instancja przez klucz ustawień `qdrantQuantization`
  (wystawiony jako pole `quantization` na `PUT /api/settings/qdrant`). Przy
  `"int8"` `buildQuantizationConfig()` żąda scalar quantization
  (`always_ram`, quantile `0.99`), a wyszukiwania włączają `rescore: true`, żeby
  wektory pełnej precyzji doprecyzowały zbiór kandydatów int8.
- **sqlite-vec** kwantyzacja jest **tylko środowiskowa** (nie ustawienie DB): ustaw
  `MEMORY_VEC_QUANTIZATION=int8`, aby przechowywać lokalne wektory jako kolumnę
  `int8[dim]` przez `vec_quantize_int8(?, 'unit')`. Wybrany tryb jest włączany do
  `embedding_signature` (sufiks `:int8`), więc zmiana trybu wymusza pełny
  reindex tabeli `vec_memories` — ta sama ścieżka lazy-backfill co przy
  zmianie modelu embeddingów.

## Typy Memory

`MemoryType` (`src/lib/memory/types.ts`):

| Type         | Used for                                                       |
| ------------ | -------------------------------------------------------------- |
| `factual`    | Preferencje, stabilne fakty użytkownika, wzorce behawioralne   |
| `episodic`   | Decyzje powiązane z konkretnym momentem („I chose Postgres”)   |
| `procedural` | Pamięć workflow / how-to (zarezerwowane; brak auto-extractora) |
| `semantic`   | Zarezerwowane dla wpisów magazynu wektorowego                  |

Strategia retrieval w `MemoryConfig` to jedno z: `exact`, `semantic` lub `hybrid`,
a scope to jedno z: `session`, `apiKey` lub `global`. Domyślny scope z
`getMemorySettings()` to `apiKey`.

## Ekstrakcja faktów (`extraction.ts`)

Ekstrakcja jest **oparta na regex**, nie na LLM — działa in-process z
`setImmediate()`, więc nigdy nie blokuje strumienia odpowiedzi:

- **Wzorce preferencji** → `MemoryType.FACTUAL`
  (np. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Wzorce decyzji** → `MemoryType.EPISODIC`
  (np. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Wzorce wzorców** → `MemoryType.FACTUAL`
  (np. `I usually …`, `I always …`, `I tend to …`)

Każde dopasowanie jest sanityzowane (`trim`, zwinięcie białych znaków, limit 500 znaków),
deduplikowane w batchu przez stabilny `factKey(category, content)` i
przechowywane przez `createMemory()` z metadanymi
`{category, extractedAt, source: "llm_response"}`. Tekst wejściowy jest ograniczony do
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — gdy dłuższy, używany jest **ogon** tekstu,
żeby najnowsza treść asystenta zawsze brała udział.

`extractFactsFromText(text)` jest eksportowane do testów i zwraca ustrukturyzowane
fakty bez ich zapisywania.

## Retrieval (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` to główny punkt wejścia. Robi:

1. Normalizuje i waliduje config przez `MemoryConfigSchema`.
2. Zwraca `[]` natychmiast, gdy `enabled` jest false lub `maxTokens <= 0`.
3. Ogranicza `maxTokens` do `[1, 8000]`.
4. Wykrywa, czy istnieje nowoczesna tabela `memories` (vs legacy `memory`),
   żeby starsze bazy nadal działały.
5. Buduje bazowe zapytanie z ochroną wygaśnięcia
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), opcjonalnym
   zakresem sesji i opcjonalnym progiem `retentionDays`.
6. Rozgałęzia się po strategii:
   - **`exact`** (domyślna): chronologiczne `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jeśli jest `config.query` i istnieje `memory_fts`, JOIN
     `memory_fts MATCH ?` i sortowanie po rankingu FTS; fallback do chronologicznego,
     gdy FTS zwróci 0 wierszy.
   - **`hybrid`**: unia wyników FTS (wyższa relevantność) i zbioru
     chronologicznego, deduplikowana po id.
7. Liczy keyword relevance score (`getRelevanceScore`) po
   `content`, `key` i JSON `metadata`, gdy podano query. Wiersze z
   zerowym score są odfiltrowywane.
8. Sortuje po score desc, potem `createdAt` desc.
9. Przechodzi ranking i akceptuje wpisy, dopóki bieżący
   `estimateTokens(content)` (≈ `length / 4`) mieści się w budżecie. Zawsze
   zwraca co najmniej jeden wpis, gdy cokolwiek pasowało.

`estimateTokens` jest eksportowane i używane przez retrieval, summarisation oraz narzędzie MCP
`omniroute_memory_search`.

## Injection (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Łączy wszystkie treści memories w jeden ciąg `Memory context: …`.
2. Wybiera strategię według nazwy providera:
   - **Wiadomość system** (domyślnie dla OpenAI, Anthropic, Gemini, …) — wstawia
     `{role: "system", content: memoryText}` przed istniejącymi wiadomościami
     system, żeby system prompy użytkownika nadal miały pierwszeństwo.
   - **Wiadomość user** (fallback) — dla providerów w
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Te odrzucają rolę system
     i w przeciwnym razie zwróciłyby 400 (por. issue #1701 dla GLM/Zhipu).
3. Loguje count, strategię i model pod `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` jest eksportowane dla wywołujących, którzy
chcą sami podejmować decyzje routingu. Nieznani providerzy domyślnie dostają `true`
(rola system dozwolona) dla bezpieczeństwa.

## Ustawienia (`settings.ts`)

Konfiguracja Memory jest **przechowywana w tabeli settings DB**, nie w zmiennych env.
`getMemorySettings()` czyta z `getSettings()` i cache'uje wynik
in-process; `invalidateMemorySettingsCache()` jest wołane przez trasę settings PUT
po zapisach.

### Pola legacy (wszystkie wersje)

| DB key                | Type    | Default                                             | UI control                                          |
| --------------------- | ------- | --------------------------------------------------- | --------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (wyłączone domyślnie od v3.8.30)            | Memory on/off                                       |
| `memoryMaxTokens`     | integer | `2000` (zakres `0–16000`)                           | Budżet tokenów na injection                         |
| `memoryRetentionDays` | integer | `30` (zakres `1–365`)                               | Okno retencji                                       |
| `memoryStrategy`      | enum    | `"hybrid"` (jedno z `recent`, `semantic`, `hybrid`) | Strategia retrieval                                 |
| `skillsEnabled`       | boolean | `false`                                             | Przełącza injection skilli per-key (zob. SKILLS.md) |

Uwaga: strategia UI `"recent"` mapuje się na wewnętrzną strategię retrieval `"exact"`
przez `toMemoryRetrievalConfig()` (kolejność chronologiczna).

### Nowe pola (v3.8.6, plan 21 D9)

Zobacz też sekcję „Rozszerzenie ustawień” powyżej dla opisów pól.

| DB key                      | API field                | Default  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Klucze DB związane z Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` domyślnie `"omniroute_memory"`,
`qdrantEmbeddingModel` domyślnie `"openai/text-embedding-3-small"`) czyta
`normalizeQdrantConfig()` w `qdrant.ts`.

### Zmienne środowiskowe (v3.8.6)

Sześć opcjonalnych zmiennych env dostraja zachowanie runtime silnika (udokumentowane w `.env.example`):

| Variable                        | Default                    | Description                                                                                                                   |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL cache embeddingów (5 min)                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maks. wpisów w LRU cache embeddingów                                                                                          |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repo HF dla modelu Transformers.js                                                                                            |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repo HF dla modelu static potion                                                                                              |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Gdzie przechowywać pobrane modele                                                                                             |
| `MEMORY_VEC_TOP_K`              | `20`                       | Domyślne top-K dla wyszukiwania wektorowego                                                                                   |
| `MEMORY_RRF_K`                  | `60`                       | Stała k RRF dla hybrid search                                                                                                 |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Ustaw `int8`, aby przechowywać lokalne wektory sqlite-vec skwantyzowane (~4× mniejsze; opt-in). Zmiana trybu wymusza reindex. |

## Summarisation (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` kompaktuje starszą
treść, gdy bieżąca suma tokenów nad memories klucza przekracza
budżet. Iteruje wiersze DESC po `created_at`, zachowuje te, które mieszczą się,
a dla reszty zastępuje `content` w miejscu pierwszymi trzema zdaniami
oryginału. `tokensSaved` to różnica `estimateTokens` między starą a
nową treścią.

Ta procedura jest **dostępna, ale nie wywoływana automatycznie** w bieżącym
pipeline chatu — wołaj ją z crona, akcji admina albo
kleju `MemoryConfig.autoSummarize`, jeśli potrzebujesz ciągłej kompakcji. Utrata
danych jest jednokierunkowa: oryginalny tekst jest nadpisywany.

## REST API

Wszystkie endpointy wymagają management auth (`requireManagementAuth`).

### Główne endpointy memory (istniejące + zaktualizowane)

| Method   | Path                 | Description                                                                                                                                                                        |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lista stronicowana z filtrami: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odpowiedź zawiera `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` |
| `POST`   | `/api/memory`        | Utwórz wpis (walidacja Zod: `content`, `key`, opcjonalnie `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Woła `createMemory()`, które upsertuje po `(apiKeyId, key)`   |
| `GET`    | `/api/memory/[id]`   | Pobierz pojedynczy wpis po UUID                                                                                                                                                    |
| `PUT`    | `/api/memory/[id]`   | Aktualizuj pola wpisu (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Synchronizuje też wektor, jeśli źródło embeddingów jest dostępne.                     |
| `DELETE` | `/api/memory/[id]`   | Usuń wpis; usuwa też z `vec_memories` (D15) i Qdrant best-effort. Zwraca 404, gdy brak.                                                                                            |
| `GET`    | `/api/memory/health` | Uruchamia `verifyExtractionPipeline("health-check")` — round-trip create→list→delete. Zwraca `{working, latencyMs, error?}`                                                        |

### Nowe endpointy memory engine (plan 21)

| Method | Path                              | Description                                                                                                                                                   |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Dry-run `retrieveMemories` — zwraca ranking z score, tier, tokens. Body: `RetrievePreviewSchema`. NIE wstrzykuje ani nie modyfikuje memories.                 |
| `GET`  | `/api/memory/embedding-providers` | Lista providerów z modelami embeddingów, ze wskazaniem które mają skonfigurowany klucz API.                                                                   |
| `GET`  | `/api/memory/engine-status`       | Pełny status silnika: keyword tier, rozstrzygnięcie embeddingów, stats magazynu wektorowego, health Qdrant, config rerank. Shape: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ręczne uruchomienie kompakcji pamięci. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Zwraca `{candidates, tokensSaved}`.            |
| `POST` | `/api/memory/reindex`             | Wyzwól reindex wektorowy dla memories z `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Zwraca `{started, pending}`.                                |

### Endpointy ustawień

| Method | Path                                    | Description                                                                                            |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Bieżące znormalizowane `MemorySettingsExtended` (7 nowych pól + legacy)                                |
| `PUT`  | `/api/settings/memory`                  | Aktualizuj dowolne pole z `MemorySettingsExtendedSchema` (12 pól łącznie)                              |
| `GET`  | `/api/settings/qdrant`                  | Bieżące ustawienia Qdrant (`QdrantSettingsSchema`)                                                     |
| `PUT`  | `/api/settings/qdrant`                  | Aktualizuj ustawienia Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = pusty string usuwa klucz. |
| `GET`  | `/api/settings/qdrant/health`           | Sonda liveness wobec skonfigurowanej instancji Qdrant. Zwraca `QdrantHealthResultSchema`.              |
| `POST` | `/api/settings/qdrant/search`           | Test wyszukiwania semantycznego wobec Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).            |
| `POST` | `/api/settings/qdrant/cleanup`          | Usuń punkty Qdrant dla wygasłych / starych memories.                                                   |
| `GET`  | `/api/settings/qdrant/embedding-models` | Lista modeli embeddingów dostępnych dla Qdrant.                                                        |

Query listy `/api/memory` obsługuje albo paginację opartą o `page`
(`parsePaginationParams`) **albo** surowy `offset` — gdy `offset` jest obecny,
ma pierwszeństwo, a wyprowadzone `page` jest liczone pod kształt odpowiedzi.

## Narzędzia MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Gdy serwer MCP jest włączony, rejestrowane są trzy narzędzia memory:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → opakowuje `retrieveMemories()`. Od v3.8.6 (D16) `strategy` jest czytane
  z `getMemorySettings()` zamiast być zahardkodowane na `"exact"`. Jeśli
  podano `query` i `strategy` to `semantic` lub `hybrid`, używany jest magazyn
  wektorowy, gdy dostępny.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → opakowuje `createMemory()`. Przyjmuje tylko 4 kanoniczne typy:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → listuje pasujące
  wpisy, opcjonalnie filtruje po znaczniku created-before, potem usuwa każdy
  przez `deleteMemory()` (co usuwa też wektory z sqlite-vec + Qdrant).

Zobacz [MCP-SERVER.md](./MCP-SERVER.md) po szczegóły transportu i scope'ów.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` to teraz **Studio 3-zakładkowe**:

### Zakładka: Memories

- Karta koncepcji (zwijany explainer „How it works”).
- Lista w czasie rzeczywistym, wyszukiwanie i paginacja (debounce 300 ms).
- Filtr typu (`factual` / `episodic` / `procedural` / `semantic` / all).
- Modal dodawania memory (key, content, type).
- Inline edit (przycisk ołówka → `PUT /api/memory/[id]`).
- Usuwanie per wiersz (z dialogiem potwierdzenia).
- Eksport JSON bieżącej strony; import JSON przez file picker.
- Karty statystyk: `totalEntries`, `tokensUsed`, `hitRate`.
- Przycisk „Compact old” → `POST /api/memory/summarize` (najpierw dry-run pokazuje
  liczbę kandydatów, potem potwierdzenie).
- Zielona/czerwona kropka health napędzana przez `GET /api/memory/health`.

### Zakładka: Playground

- Input zapytania + selektor strategii (Exact / Semantic / Hybrid) + budżet tokenów.
- „Simulate” → `POST /api/memory/retrieve-preview` — pokazuje ranking z
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel rozstrzygnięcia pokazujący, które źródło embeddingów / magazyn wektorowy
  zostało użyte i czy nastąpił fallback.

### Zakładka: Engine

- Panel statusu silnika (chip keyword FTS5, chip embedding, chip vector store,
  chip health Qdrant, chip rerank).
- Przycisk „Reindex Now” → `POST /api/memory/reindex`.
- Selektor źródła embeddingów (auto / remote / static / transformers + przełączniki).
- Karta config Qdrant (toggle enable, host/port/collection/key, test połączenia,
  test wyszukiwania semantycznego, cleanup).
- Karta config rerank (toggle enable, selektor provider/model).

Ustawienia Memory i Qdrant żyją też pod
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) jako
legacy/globalna powierzchnia ustawień.

## Caching

`src/lib/memory/store.ts` trzyma in-process cache w stylu LRU
(`MEMORY_CACHE_TTL = 5 min`, `MEMORY_MAX_CACHE_SIZE = 10 000`, z 20%
ewikcją najstarszych) dla odczytów `getMemory(id)`, plus generyczną warstwę
key/value `memoryCache` (`src/lib/memory/cache.ts`) z metodami `get`/`set`/`invalidate`
używanymi przez wywołujących, którzy chcą własny scoped cache (LRU 1000 wpisów,
domyślny TTL 5 min).

## Prywatność i cykl życia

- Własność memory to id klucza API (`resolveMemoryOwnerId` w
  `chatCore.ts`). Bez `apiKeyInfo.id` nie działa ani retrieval, ani injection,
  ani extraction.
- Wpisy z przyszłym `expires_at` są odfiltrowywane z retrieval; stare
  wpisy poza `retentionDays` są wykluczane przez klauzulę
  `created_at >= cutoff` w `retrieveMemories`.
- Do twardego usunięcia użyj `DELETE /api/memory/[id]` lub `omniroute_memory_clear`.
- Extraction jest fire-and-forget przez `setImmediate`; błędy logowane są pod
  `memory.extraction.background.failed` i nigdy nie wychodzą do wywołującego.
- Round-tripy weryfikacji (`verifyExtractionPipeline`) sprzątają własne
  wpisy testowe w bloku `finally`.

## Zobacz też

- [SKILLS.md](./SKILLS.md) — ustawienie `skillsEnabled` wstrzykuje definicje
  narzędzi obok memory.
- [MCP-SERVER.md](./MCP-SERVER.md) — transport / scope'y MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — szersza powierzchnia API.
- Moduły źródłowe:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — wieloźródłowa warstwa embeddingów
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schematy Zod dla wszystkich body API memory
  - `src/shared/schemas/qdrant.ts` — schematy Zod dla ustawień/ops Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD dla `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `073_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + sub-routes
  - `src/app/(dashboard)/dashboard/memory/` — UI Studio (page + components +
    tabs + hooks)
  - `open-sse/handlers/chatCore.ts` (wiring injection / extraction)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Wybór providera embeddingów (v3.8.16+)

Silnik memory OmniRoute wspiera **cztery źródła embeddingów** (`src/lib/memory/embedding/`). Każde ma inne kompromisy w **latencji, koszcie, jakości modelu i złożoności setupu**.

### Cztery providery

| Provider       | Source                                       | Latency                           | Cost                 | Quality                   | Setup               |
| -------------- | -------------------------------------------- | --------------------------------- | -------------------- | ------------------------- | ------------------- |
| `transformers` | Lokalny model ONNX (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                   | Free                 | Good                      | tylko `npm install` |
| `static`       | Wstępnie wyliczone wektory (cache)           | <1ms                              | Free                 | N/A (zależy od cache hit) | None                |
| `remote`       | API OpenAI / Cohere / Voyage                 | ~100-300ms                        | $0.02-0.10/1M tokens | Excellent                 | API key             |
| `cache`        | Warstwa LRU in-memory nad dowolnym źródłem   | <1ms (hit), pełna latencja (miss) | Free                 | Taka jak underlying       | None                |

### Drzewo decyzyjne

```
                  What's your deployment context?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    SMALL PROD   LARGE PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (free, no API)            (best quality)   (no internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ALWAYS add `cache` layer on top
            (LruCache wraps any provider)
```

### Konfiguracja Database & API

Opcje embeddingów memory konfiguruje się przez Settings API/UI, nie zmienne środowiskowe. Istotne klucze ustawień w DB pod Settings (`normalizeMemorySettings` w `src/lib/memory/settings.ts`) to:

- `memoryEmbeddingSource`: `"transformers"` (lokalne), `"remote"` (API, np. OpenAI), `"static"` (zewnętrzny store) lub `"auto"`
- `memoryEmbeddingProviderModel`: Identyfikator modelu dla źródeł remote/static (np. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` lub `"auto"`

#### Model lokalny (`transformers`)

Używa transformers.js wewnętrznie do uruchamiania lokalnych modeli:

```bash
# Env vars read in code (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repo
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cache directory
```

#### LRU Embedding Cache

Cache jest domyślnie zawsze włączony i konfigurowany przez zmienne env:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Max cached items
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Liczby wydajnościowe

Benchmark na typowym serwerze 4-core x86 (teksty ~100 tokenów każdy):

| Provider             | p50   | p95   | p99   | Cost / 1M embeddings               |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Free                               |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depends on Qdrant hosting          |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Free                               |

---

## Wzorce ekstrakcji faktów (v3.8.16+)

Moduł `extraction.ts` (`src/lib/memory/extraction.ts`) używa **dopasowania wzorców regex** do wyodrębniania ustrukturyzowanych faktów z wiadomości rozmowy. Zrozumienie tych wzorców pomaga dostroić jakość ekstrakcji do Twojego przypadku użycia.

### Domyślne kategorie wzorców

| Category            | Example pattern                                             | Captures                       |
| ------------------- | ----------------------------------------------------------- | ------------------------------ |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Preferencje użytkownika        |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Decyzje użytkownika (episodic) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Trwałe wzorce behawioralne     |

### Przykładowe wzorce (uproszczone)

```ts
// From src/lib/memory/extraction.ts
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

### Co jest wyodrębniane

Gdy użytkownik mówi:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Ekstrakcja produkuje 4 memories:
>
> | Key                                  | Category   | Type     | Content                     |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Limity ekstrakcji

Aby zapobiec niekontrolowanej ekstrakcji, obowiązują następujące limity:

| Min content length | 3 chars |
| Max content length | 500 chars |

### Kiedy wyłączyć ekstrakcję

Ekstrakcja działa automatycznie, gdy memory jest włączone; nie ma osobnego
przełącznika tylko-ekstrakcja. Aby ją wyłączyć, wyłącz całkowicie memory (`enabled: false`
przez `PUT /api/settings/memory`). Rozważ to, gdy:

- Masz duży wolumen wiadomości i koszt ekstrakcji jest niebanalny
- Twoje rozmowy są głównie efemeryczne (chat, debugging) bez długoterminowej wartości
- Już przechwytujesz kontekst przez własne pluginy

---

## Dostrajanie Hybrid RRF (v3.8.16+)

Algorytm **Reciprocal Rank Fusion (RRF)** łączy wyniki FTS5 (słowa kluczowe) i wektorowe (semantyczne). Parametr `k` kontroluje, ile wagi dostają niżej rankingowane wyniki.

### Formuła

Dla każdego kandydata memory score RRF wynosi:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Gdzie:

- `k` to stała (domyślnie 60)
- `rank_i(d)` to ranga dokumentu `d` w i-tym systemie retrieval (FTS, vector)
- Suma biegnie po wszystkich systemach retrieval

### Jak `k` wpływa na wyniki

| `k` value            | Effect                                                                          | Best for                              |
| -------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| `k=0`                | Czysta fuzja rang (bez wygładzania)                                             | Teoretyczna baza                      |
| `k=10-30`            | Silnie waży top wyniki, niski rank prawie nie wnosi                             | Gdy top-3 zwykle jest poprawne        |
| **`k=60`** (default) | Zbalansowane — top-10 wyniki wszystkie wnoszą sensownie                         | Retrieval ogólnego przeznaczenia      |
| `k=100+`             | Płaskiej — nawet niski rank może dominować, jeśli pojawia się w wielu systemach | Gdy recall > precision jest krytyczne |

### Dostrajanie `k` w praktyce

```bash
# Default
MEMORY_RRF_K=60

# Aggressive precision (small memory, few docs)
MEMORY_RRF_K=20

# Maximum recall (large memory, varied queries)
MEMORY_RRF_K=120
```

**Przykład z `k=20`:**

- FTS rank 1 → wkład `1/21 = 0.048`
- FTS rank 10 → wkład `1/30 = 0.033`
- Vector rank 1 → wkład `0.048`
- Combined max: `0.096`

**Przykład z `k=60`:**

- FTS rank 1 → wkład `1/61 = 0.016`
- FTS rank 10 → wkład `1/70 = 0.014`
- Vector rank 1 → wkład `0.016`
- Combined max: `0.033`

Przy wyższym `k` **względna różnica** między top-1 a rank-10 jest mniejsza, więc algorytm bardziej polega na **konsensusie między systemami retrieval** niż na pewności top-rank.

### Kiedy zmieniać `k`

| Symptom                                  | Try                                                          |
| ---------------------------------------- | ------------------------------------------------------------ |
| Top wynik zawsze wygrywa, ale jest zły   | **Obniż** k (np. 20) — pewność top-rank ma większe znaczenie |
| Dobra odpowiedź jest w top-5, nie top-1  | **Podnieś** k (np. 100) — płaskie scoring nagradza konsensus |
| Recall wysoki, precision niska           | **Obniż** k — wyostrz ranking                                |
| Recall niski (brakuje relevantnych docs) | **Podnieś** k — daj szansę niżej rankingowanym docs          |

### Wagi RRF

Reciprocal rank fusion używa równych wag dla rangi wektorowej semantycznej i rangi full-text search:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Nie ma zmiennych środowiskowych do regulacji wag indywidualnych (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` nie istnieją).

---

## Strategia summarization (v3.8.16+)

Moduł `summarization.ts` (`src/lib/memory/summarization.ts`) kompresuje starsze memories, żeby aktywny zbiór był mały przy zachowaniu recall.

### Kiedy wyzwala się summarization

| Trigger                | Threshold (default) |
| ---------------------- | ------------------- |
| Manual trigger via API | n/a                 |

### Co jest summarizowane

Dwa punkty wejścia eksportowane z `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — kondensuje
  memories sesji do pojedynczego tekstu podsumowania ograniczonego budżetem tokenów.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — kompakcja oparta o wiek
  używana przez API: wybiera każde memory starsze niż `days`, buduje
  jedno skondensowane summary memory i (gdy `dryRun` jest `false`) usuwa
  oryginały. Podaj `dryRun: true`, aby podejrzeć zbiór kandydatów i sumę tokenów
  bez modyfikacji.

Nie ma przejścia klastrowania tag/key ani scoringu per-memory „core vs summarizable” —
selekcja to czysto próg wieku, a tekst summary to skondensowana,
prefiksowana typem linia na kandydata.

### Wyzwalanie summarization

Summarization jest **ręczne / opt-in** — ustawienie `autoSummarize` jest `false` domyślnie,
więc nic nie jest kompaktowane automatycznie. Wyzwól przez API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Aby zostawić wyłączone, po prostu trzymaj `autoSummarize` na domyślnym (`false`).

### Wskazówki jakości summarization

- **Najpierw podgląd z `dryRun`** — `summarizeMemoriesOlderThan(..., true)` zwraca
  listę kandydatów i całkowitą liczbę tokenów, żeby potwierdzić, co zostałoby scalone
  przed usunięciem oryginałów.
- **Uruchamiaj summarization w godzinach niskiego ruchu**, jeśli masz duży korpus memory — wywołanie LLM to wolna część

```bash
# Cron-style: summarize at 3am daily
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```
