# Memory System (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Źródło prawdy:** `src/lib/memory/` i `src/app/api/memory/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40 (domyślnie wyłączona + uzupełnienie kwantyzacji int8)

OmniRoute zapewnia trwałą pamięć konwersacji powiązaną z kluczem API (oraz
opcjonalnie identyfikatorem sesji). Wspomnienia są automatycznie wyodrębniane
z odpowiedzi LLM za pomocą lekkiego dopasowywania wzorców opartego na
wyrażeniach regularnych i ponownie wstrzykiwane do kolejnych żądań jako
początkowa wiadomość systemowa (lub pierwsza wiadomość użytkownika w przypadku
dostawców, którzy odrzucają rolę systemową).

> **Pamięć jest domyślnie WYŁĄCZONA (v3.8.30+).** Wartość
> `DEFAULT_MEMORY_SETTINGS.enabled` wynosi teraz `false`
> (`src/lib/memory/settings.ts`). Włączenie pamięci powoduje wstrzykiwanie do
> **każdego** żądania czatu maksymalnie `maxTokens` (~2k) pobranego kontekstu,
> co podlega opłacie — jest to nieoczekiwany koszt w przypadku nowych instalacji
> oraz klientów zarządzających własnym kontekstem. Włącz ją jawnie w sekcji
> **Ustawienia → Pamięć** (`MemorySkillsTab` wyświetla ostrzeżenie o kosztach
> tokenów, gdy pamięć jest włączona). Klient może zrezygnować z użycia pamięci
> dla pojedynczego żądania za pomocą nagłówka `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — zobacz tabelę nagłówków żądań w
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Żądanie bez pamięci ustawia
> `memoryOwnerId = null`, co wyłącza **zarówno** wstrzykiwanie pamięci, jak
> i umiejętności dla tego żądania
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Pamięć jest **ograniczona do konkretnego klucza API**, a nie użytkownika —
każde żądanie uwierzytelnione przy użyciu tego samego klucza API korzysta
z tej samej puli pamięci, z opcjonalnym dodatkowym zakresem określonym przez
`sessionId`.

## Architektura

```
Klient → /v1/chat/completions (apiKeyInfo rozwiązane wcześniej)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # wyodrębnia id
    → getMemorySettings()                     # ustawienia z pamięci podręcznej
    → shouldInjectMemory(body, {enabled})     # bramka
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + opcjonalny wektor
    → injectMemory(body, memories, provider)  # wiadomość systemowa lub użytkownika
  → wywołanie dostawcy nadrzędnego
  → po odpowiedzi: extractFacts(text, apiKeyId, sessionId)  # nieblokujące
    → setImmediate → createMemory(fact) dla każdego dopasowania
                   → embed(content) + upsertVector(id, vec)
```

Miejsca wywołań odpowiedzialne za wstrzykiwanie i wyodrębnianie są podłączone
w `open-sse/handlers/chatCore.ts` (wyszukaj `retrieveMemories`, `injectMemory`
oraz `extractFacts`).

## Architektura silnika (3-poziomowe rozstrzyganie)

Silnik pamięci wybiera ścieżkę pobierania w czasie działania na podstawie
dostępnej infrastruktury i ustawień. Istnieją trzy poziomy stosowane zgodnie
z kolejnością priorytetów:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  POZIOM 0 — Słowa kluczowe (FTS5)                            │
  │  Dostępność określana przez test: FTS5, gdy kompilacja       │
  │  SQLite go obsługuje (better-sqlite3 / node:sqlite /         │
  │  bun:sqlite); niedostępny w kompilacjach bez FTS5 (np.       │
  │  sql.js/WASM — "no such module: fts5"). Używany, gdy         │
  │  strategy = "exact", lub jako rozwiązanie awaryjne; stan     │
  │  keyword silnika odzwierciedla wynik testu.                  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  POZIOM 1 — Wbudowane wektory (sqlite-vec)                   │
  │  sqlite-vec v0.1.9 ładowany przez db.loadExtension().        │
  │  KNN metodą siłową na wektorach Float32. Aktywny, gdy:       │
  │   • sqlite-vec loadExtension zakończy się powodzeniem        │
  │   • Dostępne jest źródło osadzeń (remote | static |          │
  │     transformers), które może utworzyć Float32Array          │
  │   • Istnieje tabela vec_memories (tworzona przy pierwszym    │
  │     wywołaniu ready())                                       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  POZIOM 2 — Qdrant (opcjonalna zewnętrzna baza wektorowa)    │
  │  Po włączeniu zastępuje sqlite-vec dla semantic/hybrid.      │
  │  Wymaga działającej instancji Qdrant oraz skonfigurowanego   │
  │  hosta/portu.                                                │
  └─────────────────────────────────────────────────────────────┘
```

Degradacja odbywa się automatycznie i w sposób przezroczysty:

- Jeśli nie uda się załadować sqlite-vec, poziom 1 jest niedostępny → następuje
  przełączenie awaryjne na poziom 0.
- Jeśli źródło osadzeń zwróci błąd, poziom 1 przełącza się awaryjnie na poziom 0.
- Jeśli Qdrant nie działa prawidłowo, poziom 2 przełącza się awaryjnie na poziom
  1 (lub poziom 0, jeśli poziom 1 również jest niedostępny).

## Źródła osadzeń

Warstwa osadzeń (`src/lib/memory/embedding/`) określa, którego źródła użyć,
na podstawie `MemorySettingsExtended.embeddingSource`:

| Źródło         | Opis                                                                                                  | Wymagany klucz | Zimny start      |
| -------------- | ----------------------------------------------------------------------------------------------------- | -------------- | ---------------- |
| `remote`       | Używa API osadzeń skonfigurowanego dostawcy (OpenAI, Cohere itp.)                                     | Tak            | Brak             |
| `static`       | Lokalne osadzanie oparte na tablicy wyszukiwania za pomocą `potion-base-8M` (WordPiece + uśrednianie) | Nie            | ~200ms           |
| `transformers` | Lokalne wnioskowanie ONNX za pomocą `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                | Nie            | ~3s + ~400MB RAM |
| `auto`         | Wybór w czasie działania: zdalne (jeśli istnieje klucz) → statyczne → transformers → null             | To zależy      | To zależy        |

**Kolejność wyboru dla `auto`:**

1. Znajdź pierwszego dostawcę w `listEmbeddingProviders()`, dla którego `hasKey === true` → `remote`.
2. Jeśli `settings.staticEnabled === true` → `static`.
3. Jeśli `settings.transformersEnabled === true` → `transformers`.
4. W przeciwnym razie → `null` (przejście awaryjne na wyszukiwanie słów kluczowych FTS5).

Pamięć podręczna osadzeń (`src/lib/memory/embedding/cache.ts`) używa przechowywanej w pamięci
mapy LRU z kluczami `${source}:${model}:${dim}:${sha256(text)}`, ograniczonej do
`MEMORY_EMBEDDING_CACHE_MAX` wpisów (domyślnie 1000) z czasem TTL wynoszącym
`MEMORY_EMBEDDING_CACHE_TTL_MS` (domyślnie 5 min). Jest współdzielona przez wszystkich wywołujących
w całym cyklu życia procesu.

## Hybrydowy RRF (k=60)

Gdy `strategy = "hybrid"` i magazyn wektorowy jest dostępny, pobieranie używa
metody Reciprocal Rank Fusion do łączenia wyników FTS5 i wyników wektorowych:

```
RRF(d) = Σ  1 / (k + rank_i(d))      gdzie k = 60 (konfigurowalne za pomocą MEMORY_RRF_K)
          i
```

W praktyce:

1. Wykonaj wyszukiwanie FTS5 → uporządkowana lista `R_fts` (pozycje 1..N).
2. Wykonaj wyszukiwanie wektorowe KNN → uporządkowana lista `R_vec` (pozycje 1..M).
3. Dla każdego unikatowego `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, jeśli nie znajduje się na liście).
4. Posortuj według `rrf_score` DESC i zastosuj iterowanie z uwzględnieniem budżetu tokenów.

RRF jest dobrze znaną metodą, która działa skutecznie bez konieczności normalizacji wyników między
heterogenicznymi systemami wyszukiwania. Domyślna wartość `k=60` pochodzi z oryginalnej
pracy Cormacka i in. i sprawdza się dobrze w przypadku małych korpusów (<10 tys. wspomnień).

## Uzupełnianie wsteczne (leniwe + ponowne indeksowanie)

Gdy model osadzeń ulegnie zmianie (co jest wykrywane za pomocą `embedding_signature`),
magazyn wektorowy jest przebudowywany, a wszystkie istniejące wspomnienia są oznaczane
wartością `needs_reindex = 1` w tabeli `memories`.

**Leniwe uzupełnianie wsteczne**: Podczas następnego pobierania każde wspomnienie bez wpisu wektorowego
jest osadzane i wstawiane do `vec_memories` przed rozpoczęciem wyszukiwania. Pozwala to
rozłożyć koszt uzupełniania na rzeczywiste żądania bez blokowania uruchamiania.

**Jawne ponowne indeksowanie**: Karta Engine w `/dashboard/memory` udostępnia
przycisk „Indeksuj ponownie teraz”, który wywołuje `POST /api/memory/reindex`. Procedura obsługi wywołuje
`runReindexBatch()` z `src/lib/memory/reindex.ts`, która przetwarza do
`limit` oczekujących wpisów na żądanie. Postęp można cyklicznie sprawdzać za pomocą
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabela `memory_vec_meta` (migracja `083_memory_vec.sql`) przechowuje:

- `active_dim` — bieżący wymiar wektora (null = jeszcze nieskalibrowany).
- `embedding_signature` — `${source}:${model}:${dim}` używany do wykrywania zmian.
- `last_reset_at` — znacznik czasu ostatniego pełnego resetowania.
- `vec_loaded` — flaga 0/1 określająca, czy sqlite-vec został pomyślnie załadowany.

## Rozszerzenie ustawień

Dziewięć pól osadzania i wektorów jest dostępnych w `MemorySettingsExtended` w
`src/shared/schemas/memory.ts` i utrwalanych za pośrednictwem `src/lib/db/settings.ts`:

| Pole                     | Typ                                                | Wartość domyślna | Opis                                                                        |
| ------------------------ | -------------------------------------------------- | ---------------- | --------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`         | Określa używane źródło osadzania                                            |
| `embeddingProviderModel` | `string \| null`                                   | `null`           | Dostawca/model w formacie `provider/model`                                  |
| `customBaseUrl`          | `string \| null`                                   | `null`           | Bazowy URL punktu końcowego zgodnego z OpenAI, używanego tylko przez pamięć |
| `customModelId`          | `string \| null`                                   | `null`           | Identyfikator modelu wysyłany do niestandardowego punktu końcowego          |
| `transformersEnabled`    | `boolean`                                          | `false`          | Opcjonalne włączenie Transformers.js (MiniLM, ~400MB)                       |
| `staticEnabled`          | `boolean`                                          | `false`          | Opcjonalne włączenie lokalnego, statycznego modelu potion-base-8M           |
| `rerankEnabled`          | `boolean`                                          | `false`          | Włącza etap ponownego szeregowania (dodaje +200-500ms/żądanie)              |
| `rerankProviderModel`    | `string \| null`                                   | `null`           | Dostawca/model ponownego szeregowania w formacie `provider/model`           |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`         | Określa używany backend wektorowy                                           |

Są one udostępniane za pośrednictwem `GET /PUT /api/settings/memory` (schemat `MemorySettingsExtendedSchema`).

Dla źródła `remote` pamięć akceptuje również opcjonalne ustawienia `customBaseUrl` i
`customModelId`. Razem wybierają one zgodny z OpenAI punkt końcowy `/embeddings`
oraz model bez zmiany globalnego rejestru osadzania. Punkt końcowy jest
normalizowany przed użyciem i sprawdzany zgodnie z zasadami dostawcy dotyczącymi
wychodzących adresów URL: wymagany jest protokół HTTP(S), osadzone dane
uwierzytelniające i ciągi zapytania są odrzucane, a adresy metadanych chmurowych
pozostają zablokowane. Puste wartości zachowują dostawcę wybranego w rejestrze. Błędy
zwracane do panelu są oczyszczane, a dane uwierzytelniające punktu końcowego nigdy
nie są rejestrowane w logach.

> **TODO (D20):** Zakres `global` (współdzielenie pamięci między wszystkimi kluczami API) nie jest
> zaimplementowany w tym wydaniu. Wymaga zmian schematu i globalnej ścieżki
> pobierania. Należy śledzić to oddzielnie.

## Warstwy przechowywania

### Podstawowa: SQLite (tabela `memories`)

Utworzona przez migrację `015_create_memories.sql`:

| Kolumna                     | Typ                | Uwagi                                                                                     |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generowany za pomocą `crypto.randomUUID()`                                           |
| `api_key_id`                | `TEXT NOT NULL`    | Klucz API będący właścicielem                                                             |
| `session_id`                | `TEXT`             | Opcjonalny zakres dla poszczególnych konwersacji                                          |
| `type`                      | `TEXT NOT NULL`    | Jedna z wartości `factual`, `episodic`, `procedural`, `semantic`                          |
| `key`                       | `TEXT`             | Stabilny klucz operacji upsert, np. `preference:i_prefer_python`                          |
| `content`                   | `TEXT NOT NULL`    | Właściwy tekst faktu                                                                      |
| `metadata`                  | `TEXT`             | Obiekt JSON (category, extractedAt, source, ...)                                          |
| `created_at` / `updated_at` | `TEXT`             | Ciągi znaków w formacie ISO 8601                                                          |
| `expires_at`                | `TEXT`             | Opcjonalna data wygaśnięcia; `NULL` oznacza brak wygaśnięcia                              |
| `memory_id`                 | `INTEGER UNIQUE`   | Dodane przez `023_fix_memory_fts_uuid.sql`, aby połączyć UUID ↔ identyfikatory rowid FTS5 |

Indeksy: `api_key_id`, `session_id`, `type`, `expires_at` oraz unikatowy
indeks `memory_id`.

**Semantyka operacji upsert**: `createMemory()` wyszukuje istniejący wiersz z taką samą
parą `(api_key_id, key)` i, jeśli go znajdzie, aktualizuje go w miejscu (scalając `metadata`
za pomocą płytkiego rozwinięcia). Zapobiega to nieograniczonemu rozrastaniu się tabeli
w przypadku powtarzających się deklaracji preferencji.

### Wyszukiwanie pełnotekstowe (tabela wirtualna `memory_fts`)

`022_add_memory_fts5.sql` tworzy tabelę wirtualną FTS5 obejmującą `content` i
`key`. `023_fix_memory_fts_uuid.sql` naprawia błąd występujący w praktyce, w którym klucz
główny UUID nie łączył się z całkowitoliczbowym identyfikatorem rowid FTS5 — migracja dodaje
kolumnę `memory_id`, ponownie tworzy tabelę FTS i konfiguruje wyzwalacze
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`), które synchronizują FTS podczas operacji
INSERT, DELETE i UPDATE.

Używane przez `retrieval.ts` dla strategii `semantic` i `hybrid` (zobacz poniżej).
Kod pobierania stosuje zabezpieczenie `hasTable("memory_fts")` i powraca do
porządku chronologicznego, jeśli brakuje tabeli FTS lub zapytanie FTS zgłosi błąd.

### Opcjonalna: Qdrant (magazyn wektorowy warstwy 2)

`src/lib/memory/qdrant.ts` implementuje opcjonalną integrację z Qdrant jako magazyn
wektorowy warstwy 2. Pobieranie jest kierowane do Qdrant tylko wtedy, gdy selektor silnika
`memoryVectorStore === "qdrant"` — domyślna wartość `"auto"` (oraz `"sqlite-vec"`)
**nigdy** nie wybiera Qdrant. Przełącznik na karcie Engine ustawia **jednocześnie**
`qdrantEnabled` i `memoryVectorStore`: włączenie powoduje ustawienie Qdrant jako
magazynu podstawowego, a wyłączenie przywraca wartość `"auto"` (#5597 — przed tą poprawką
włączenie nie przynosiło efektu, ponieważ nic nie zapisywało selektora silnika). Jeśli Qdrant
jest nieosiągalny lub niczego nie zwraca, pobieranie powraca do sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — tworzy osadzenie `key + content` za pomocą skonfigurowanego
  modelu osadzania, upewnia się, że kolekcja istnieje (przy pierwszym użyciu tworzy
  wektory z odległością cosinusową), i wstawia lub aktualizuje punkt z ładunkiem `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — tworzy osadzenie zapytania, przeszukuje
  kolekcję filtrowaną według `kind = "omniroute_memory"` oraz opcjonalnie według
  `apiKeyId` / `sessionId`. Ogranicza `topK` do zakresu `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — usuwa pojedynczy punkt. Wywoływana przez
  `deleteMemory()` po usunięciu wiersza SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — zbiorczo usuwa punkty, których
  `expiresAtUnix` wskazuje przeszłość lub których `createdAtUnix` jest starsze niż
  granica okresu przechowywania. Najpierw je zlicza, aby panel mógł wyświetlać rzeczywiste liczby.
- `checkQdrantHealth()` — test kondycji `GET /readyz` wraz z pomiarem opóźnienia.

Interfejs ustawień udostępnia konfigurację Qdrant, kontrolę kondycji, test wyszukiwania semantycznego
oraz czyszczenie na karcie **Engine** strony `/dashboard/memory`. Od wersji v3.8.6
wszystkie odpowiadające im trasy w `src/app/api/settings/qdrant/` są podłączone:

| Trasa                                   | Metoda        | Opis                                |
| --------------------------------------- | ------------- | ----------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Odczyt/aktualizacja ustawień Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | Test dostępności + opóźnienie       |
| `/api/settings/qdrant/search`           | `POST`        | Test wyszukiwania semantycznego     |
| `/api/settings/qdrant/cleanup`          | `POST`        | Usuwanie wygasłych/starych punktów  |
| `/api/settings/qdrant/embedding-models` | `GET`         | Lista dostępnych modeli osadzania   |

**Uwagi dotyczące działania (czego się spodziewać):**

- **Wybór silnika** — włączenie Qdrant na karcie Engine ustawia go jako główny
  magazyn (ustawia `memoryVectorStore="qdrant"`); wyłączenie przywraca wartość `"auto"` (#5597).
- **Brak uzupełniania danych historycznych** — do Qdrant zapisywane są tylko wspomnienia utworzone/zaktualizowane
  **po** jego włączeniu (podwójny zapis typu „uruchom i nie czekaj”). Istniejące wcześniej wspomnienia SQLite **nie są**
  migrowane; opcja „Reindex Now” przebudowuje wyłącznie indeks sqlite-vec, a nie Qdrant.
- **Wymiar wektora jest wykrywany automatycznie** na podstawie rzeczywistego osadzenia przy pierwszym użyciu —
  nie ma pola wymiaru do uzupełnienia. Zmiana modelu osadzania po utworzeniu kolekcji
  **nie** jest obsługiwana automatycznie: istniejąca kolekcja pozostaje niezmieniona, a operacje zapisu/wyszukiwania
  z niezgodnym wymiarem kończą się niepowodzeniem i przełączają się awaryjnie na sqlite-vec. Aby zmienić model osadzania,
  utwórz kolekcję ponownie (pod nową nazwą albo usuń ją w Qdrant).
- **Metryka odległości** — zawsze **Cosine** (zakodowana na stałe podczas tworzenia kolekcji;
  nie można jej konfigurować).
- **Uwierzytelnianie** — wyłącznie klucz API (wysyłany w nagłówku `api-key`; opcjonalny w przypadku nieuwierzytelnionego
  lokalnego Dockera). JWT/RBAC nie są używane.
- **Pola konfiguracji** — interfejs udostępnia `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` są dostępne wyłącznie przez zmienne środowiskowe/bazę danych, a `vectorSize` nie jest
  używane podczas tworzenia kolekcji (wymiar pochodzi z osadzenia).

### Kwantyzacja wektorów (int8 — opcjonalna, oba backendy)

Oba backendy wektorowe obsługują **opcjonalną kwantyzację int8**, która zmniejsza zajętość pamięci
przez przechowywane wektory (około 4× mniej niż Float32) kosztem niewielkiego spadku trafności.
Domyślnie jest ona **wyłączona** w obu przypadkach — wektory zachowują pełną precyzję, chyba że zostanie
jawnie włączona.

| Backend    | Ustawienie                                       | Typ                            | Domyślnie | Miejsce odczytu                                             |
| ---------- | ------------------------------------------------ | ------------------------------ | --------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (klucz DB)                  | `"none" \| "int8" \| "binary"` | `"none"`  | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (zmienna środowiskowa) | `"none" \| "int8"`             | `"none"`  | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** jest konfigurowany osobno dla każdej instancji za pomocą klucza ustawienia
  `qdrantQuantization` (udostępnionego jako pole `quantization` w `PUT /api/settings/qdrant`). W przypadku
  wartości `"int8"` funkcja `buildQuantizationConfig()` żąda kwantyzacji skalarnej
  (`always_ram`, kwantyl `0.99`), a wyszukiwania włączają `rescore: true`, dzięki czemu
  wektory o pełnej precyzji doprecyzowują zbiór kandydatów int8.
- Kwantyzacja **sqlite-vec** jest konfigurowana **wyłącznie za pomocą zmiennej środowiskowej** (nie jest ustawieniem DB): ustaw
  `MEMORY_VEC_QUANTIZATION=int8`, aby przechowywać lokalne wektory jako kolumnę `int8[dim]`
  za pomocą `vec_quantize_int8(?, 'unit')`. Wybrany tryb jest uwzględniany w
  `embedding_signature` (sufiks `:int8`), dlatego przełączenie trybu powoduje pełne
  ponowne indeksowanie tabeli `vec_memories` — przy użyciu tej samej ścieżki leniwego uzupełniania danych co
  przy zmianie modelu osadzania.

## Typy pamięci

`MemoryType` (`src/lib/memory/types.ts`):

| Typ          | Zastosowanie                                                                          |
| ------------ | ------------------------------------------------------------------------------------- |
| `factual`    | Preferencje, trwałe fakty o użytkowniku, wzorce zachowań                              |
| `episodic`   | Decyzje związane z konkretnym momentem („Wybrałem Postgres”)                          |
| `procedural` | Pamięć procedur i instrukcji (zarezerwowana; obecnie brak automatycznego ekstraktora) |
| `semantic`   | Zarezerwowana dla wpisów w magazynie wektorowym                                       |

Strategia pobierania `MemoryConfig` to jedna z wartości `exact`, `semantic` lub `hybrid`,
a zakres to jedna z wartości `session`, `apiKey` lub `global`. Domyślnym zakresem z
`getMemorySettings()` jest `apiKey`.

## Ekstrakcja faktów (`extraction.ts`)

Ekstrakcja jest oparta na **wyrażeniach regularnych**, a nie na LLM — działa w ramach procesu za pomocą
`setImmediate()`, dzięki czemu nigdy nie blokuje strumienia odpowiedzi:

- **Wzorce preferencji** → `MemoryType.FACTUAL`
  (np. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Wzorce decyzji** → `MemoryType.EPISODIC`
  (np. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Wzorce zachowań** → `MemoryType.FACTUAL`
  (np. `I usually …`, `I always …`, `I tend to …`)

Każde dopasowanie jest oczyszczane (`trim`, zwijanie białych znaków, ograniczenie do 500 znaków),
deduplikowane w obrębie partii za pomocą stabilnego `factKey(category, content)` i
zapisywane przez `createMemory()` z metadanymi
`{category, extractedAt, source: "llm_response"}`. Tekst wejściowy jest ograniczony do
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — jeśli jest dłuższy, używany jest **koniec** tekstu,
aby najnowsza treść odpowiedzi asystenta zawsze uczestniczyła w ekstrakcji.

`extractFactsFromText(text)` jest eksportowana na potrzeby testów i zwraca ustrukturyzowane
fakty bez ich zapisywania.

## Pobieranie (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` jest głównym punktem wejścia. Funkcja ta:

1. Normalizuje i weryfikuje konfigurację za pomocą `MemoryConfigSchema`.
2. Natychmiast zwraca `[]`, gdy `enabled` ma wartość false lub `maxTokens <= 0`.
3. Ogranicza `maxTokens` do zakresu `[1, 8000]`.
4. Wykrywa, czy istnieje nowoczesna tabela `memories` (zamiast starszej tabeli `memory`),
   dzięki czemu starsze bazy danych nadal działają.
5. Buduje zapytanie bazowe z warunkiem wygaśnięcia
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), opcjonalnym
   zakresem sesji i opcjonalną wartością graniczną `retentionDays`.
6. Rozgałęzia działanie zależnie od strategii:
   - **`exact`** (domyślna): chronologiczne `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jeśli istnieją `config.query` i `memory_fts`, wykonuje JOIN
     `memory_fts MATCH ?` i sortuje według rangi FTS; wraca do kolejności chronologicznej,
     gdy FTS zwróci 0 wierszy.
   - **`hybrid`**: suma wyników FTS (o wyższej trafności) i zbioru
     chronologicznego, z deduplikacją według id.
7. Oblicza wynik trafności słów kluczowych (`getRelevanceScore`) na podstawie
   `content`, `key` i kodu JSON `metadata`, gdy podano zapytanie. Wiersze z
   wynikiem równym zero są odfiltrowywane.
8. Sortuje malejąco według wyniku, a następnie malejąco według `createdAt`.
9. Przechodzi przez listę uporządkowaną według trafności i przyjmuje wpisy, dopóki sumaryczna
   wartość `estimateTokens(content)` (≈ `length / 4`) mieści się w budżecie. Zawsze
   zwraca co najmniej jeden wpis, jeśli istnieje jakiekolwiek dopasowanie.

`estimateTokens` jest eksportowana i używana przez mechanizmy pobierania i podsumowywania oraz narzędzie MCP
`omniroute_memory_search`.

## Wstrzykiwanie (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Łączy zawartość wszystkich wspomnień w jeden ciąg `Memory context: …`.
2. Wybiera strategię na podstawie nazwy dostawcy:
   - **Wiadomość systemowa** (domyślna dla OpenAI, Anthropic, Gemini, …) — dodaje
     `{role: "system", content: memoryText}` przed wszystkimi istniejącymi
     wiadomościami systemowymi, dzięki czemu systemowe monity użytkownika nadal mają pierwszeństwo.
   - **Wiadomość użytkownika** (strategia rezerwowa) — dla dostawców z
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Odrzucają oni rolę systemową,
     co w przeciwnym razie skutkowałoby błędem 400 (zob. zgłoszenie #1701 dotyczące GLM/Zhipu).
3. Rejestruje liczbę, strategię i model pod kluczem `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` jest eksportowana dla kodu wywołującego, który musi
samodzielnie podejmować decyzje dotyczące routingu. Nieznani dostawcy domyślnie zwracają `true`
(rola systemowa jest dozwolona) ze względów bezpieczeństwa.

## Ustawienia (`settings.ts`)

Konfiguracja pamięci jest **przechowywana w tabeli ustawień bazy danych**, a nie w zmiennych środowiskowych.
`getMemorySettings()` odczytuje dane z `getSettings()` i buforuje wynik
w obrębie procesu; `invalidateMemorySettingsCache()` jest wywoływana przez trasę PUT
ustawień po zapisaniu zmian.

### Starsze pola (wszystkie wersje)

| Klucz DB              | Typ     | Wartość domyślna                                     | Element sterujący interfejsu                                                    |
| --------------------- | ------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (domyślnie wyłączone od v3.8.30)             | Włączanie/wyłączanie pamięci                                                    |
| `memoryMaxTokens`     | integer | `2000` (zakres `0–16000`)                            | Budżet tokenów na wstrzykiwanie                                                 |
| `memoryRetentionDays` | integer | `30` (zakres `1–365`)                                | Okres przechowywania                                                            |
| `memoryStrategy`      | enum    | `"hybrid"` (jedna z: `recent`, `semantic`, `hybrid`) | Strategia pobierania                                                            |
| `skillsEnabled`       | boolean | `false`                                              | Przełącza wstrzykiwanie umiejętności dla poszczególnych kluczy (zob. SKILLS.md) |

Uwaga: strategia interfejsu `"recent"` jest mapowana na wewnętrzną strategię pobierania
`"exact"` przez `toMemoryRetrievalConfig()` (kolejność chronologiczna).

### Nowe pola (v3.8.6, plan 21 D9)

Opisy pól znajdują się również w sekcji „Rozszerzenie ustawień” powyżej.

| Klucz DB                    | Pole API                 | Wartość domyślna |
| --------------------------- | ------------------------ | ---------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`         |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`           |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`          |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`          |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`          |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`           |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`         |

Klucze DB związane z Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` z wartością domyślną `"omniroute_memory"`,
`qdrantEmbeddingModel` z wartością domyślną `"openai/text-embedding-3-small"`) są odczytywane przez
`normalizeQdrantConfig()` w pliku `qdrant.ts`.

### Zmienne środowiskowe (v3.8.6)

Sześć opcjonalnych zmiennych środowiskowych dostosowuje zachowanie silnika podczas działania (opisano je w `.env.example`):

| Zmienna                         | Wartość domyślna           | Opis                                                                                                                                                              |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Czas TTL pamięci podręcznej osadzeń (5 min)                                                                                                                       |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maksymalna liczba wpisów w pamięci podręcznej LRU osadzeń                                                                                                         |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repozytorium HF modelu Transformers.js                                                                                                                            |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repozytorium HF statycznego modelu potion                                                                                                                         |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Miejsce przechowywania pobranych modeli                                                                                                                           |
| `MEMORY_VEC_TOP_K`              | `20`                       | Domyślna wartość top-K dla wyszukiwania wektorowego                                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | Stała k algorytmu RRF dla wyszukiwania hybrydowego                                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Ustaw na `int8`, aby przechowywać lokalne wektory sqlite-vec w postaci skwantyzowanej (około 4× mniejsze; opcjonalne). Zmiana trybu wymusza ponowne indeksowanie. |

## Podsumowywanie (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` kompresuje starszą
zawartość, gdy bieżąca łączna liczba tokenów w pamięciach klucza przekracza
budżet. Funkcja iteruje po wierszach malejąco według `created_at`, zachowuje
wiersze mieszczące się w limicie, a w pozostałych zastępuje `content`
pierwszymi trzema zdaniami oryginału. `tokensSaved` to różnica wartości
`estimateTokens` między starą a nową zawartością.

Ta procedura jest **dostępna, ale nie jest wywoływana automatycznie** w bieżącym
potoku czatu — jeśli potrzebujesz ciągłej kompresji, wywołuj ją z zadania cron,
akcji administratora lub kodu integrującego `MemoryConfig.autoSummarize.`
Utrata danych jest nieodwracalna: oryginalny tekst zostaje nadpisany.

## REST API

Wszystkie punkty końcowe wymagają uwierzytelniania zarządczego (`requireManagementAuth`).

### Główne punkty końcowe pamięci (istniejące i zaktualizowane)

| Metoda   | Ścieżka              | Opis                                                                                                                                                                                                  |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Stronicowana lista z filtrami: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Odpowiedź zawiera `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                    |
| `POST`   | `/api/memory`        | Tworzy wpis (walidowany przez Zod: `content`, `key`, opcjonalnie `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Wywołuje `createMemory()`, które wykonuje upsert według `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Pobiera pojedynczy wpis według UUID                                                                                                                                                                   |
| `PUT`    | `/api/memory/[id]`   | Aktualizuje pola wpisu (`type`, `key`, `content`, `metadata`). Treść żądania: `MemoryUpdatePutSchema`. Synchronizuje również wektor, jeśli dostępne jest źródło osadzenia.                            |
| `DELETE` | `/api/memory/[id]`   | Usuwa wpis; usuwa go również z `vec_memories` (D15) oraz, w miarę możliwości, z Qdrant. Zwraca 404, gdy wpis nie istnieje.                                                                            |
| `GET`    | `/api/memory/health` | Uruchamia `verifyExtractionPipeline("health-check")` — pełny cykl utworzenie→lista→usunięcie. Zwraca `{working, latencyMs, error?}`                                                                   |

### Nowe punkty końcowe silnika pamięci (plan 21)

| Metoda | Ścieżka                           | Opis                                                                                                                                                                                              |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Próbne uruchomienie `retrieveMemories` — zwraca uszeregowane wyniki z punktacją, warstwą i tokenami. Treść żądania: `RetrievePreviewSchema`. NIE wstrzykuje ani nie modyfikuje pamięci.           |
| `GET`  | `/api/memory/embedding-providers` | Wyświetla dostawców wraz z modelami osadzania, wskazując, którzy mają skonfigurowany klucz API.                                                                                                   |
| `GET`  | `/api/memory/engine-status`       | Zwraca pełny stan silnika: warstwę słów kluczowych, konfigurację osadzania, statystyki magazynu wektorów, stan Qdrant i konfigurację ponownego szeregowania. Schemat: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ręcznie uruchamia kompresję pamięci. Treść żądania: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Zwraca `{candidates, tokensSaved}`.                                         |
| `POST` | `/api/memory/reindex`             | Uruchamia ponowne indeksowanie wektorów pamięci z `needs_reindex=1`. Treść żądania: `MemoryReindexSchema` (`force`). Zwraca `{started, pending}`.                                                 |

### Punkty końcowe ustawień

| Metoda | Ścieżka                                 | Opis                                                                                                                  |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Bieżący znormalizowany `MemorySettingsExtended` (7 nowych pól i pola starszego typu)                                  |
| `PUT`  | `/api/settings/memory`                  | Aktualizuje dowolne pole z `MemorySettingsExtendedSchema` (łącznie 12 pól)                                            |
| `GET`  | `/api/settings/qdrant`                  | Bieżące ustawienia Qdrant (`QdrantSettingsSchema`)                                                                    |
| `PUT`  | `/api/settings/qdrant`                  | Aktualizuje ustawienia Qdrant. Treść żądania: `QdrantSettingsUpdateSchema`. `apiKey` = pusty ciąg znaków usuwa klucz. |
| `GET`  | `/api/settings/qdrant/health`           | Sprawdza dostępność skonfigurowanej instancji Qdrant. Zwraca `QdrantHealthResultSchema`.                              |
| `POST` | `/api/settings/qdrant/search`           | Test wyszukiwania semantycznego w Qdrant. Treść żądania: `QdrantSearchSchema` (`query`, `topK`).                      |
| `POST` | `/api/settings/qdrant/cleanup`          | Usuwa z Qdrant punkty odpowiadające wygasłym lub starym pamięciom.                                                    |
| `GET`  | `/api/settings/qdrant/embedding-models` | Wyświetla modele osadzania dostępne dla Qdrant.                                                                       |

Zapytanie listy `/api/memory` obsługuje stronicowanie oparte na `page`
(`parsePaginationParams`) **lub** bezpośrednią wartość `offset` — gdy podano
`offset`, ma ona pierwszeństwo, a na potrzeby struktury odpowiedzi obliczana
jest wynikowa wartość `page`.

## Narzędzia MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Gdy serwer MCP jest włączony, rejestrowane są trzy narzędzia pamięci:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → opakowuje `retrieveMemories()`. Od wersji v3.8.6 (D16) wartość `strategy`
  jest odczytywana z `getMemorySettings()`, zamiast być zakodowana na stałe
  jako `"exact"`. Jeśli podano `query`, a `strategy` ma wartość `semantic` lub
  `hybrid`, używany jest magazyn wektorowy, o ile jest dostępny.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → opakowuje `createMemory()`. Akceptuje tylko 4 kanoniczne typy:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → wyświetla pasujące
  wpisy, opcjonalnie filtruje je według znacznika czasu utworzenia wcześniejszego
  niż wskazany, a następnie usuwa każdy z nich za pomocą `deleteMemory()` (co
  usuwa również wektory z sqlite-vec i Qdrant).

Szczegóły dotyczące transportu i zakresu znajdują się w pliku [MCP-SERVER.md](./MCP-SERVER.md).

## Panel (Studio pamięci)

`src/app/(dashboard)/dashboard/memory/page.tsx` jest teraz **Studiem z 3 kartami**:

### Karta: Pamięci

- Karta koncepcyjna (zwijane objaśnienie „Jak to działa”).
- Lista w czasie rzeczywistym, wyszukiwanie i paginacja (opóźnienie 300 ms).
- Filtr typów (`factual` / `episodic` / `procedural` / `semantic` / wszystkie).
- Okno modalne dodawania pamięci (klucz, zawartość, typ).
- Edycja w wierszu (przycisk ołówka → `PUT /api/memory/[id]`).
- Usuwanie poszczególnych wierszy (z oknem dialogowym potwierdzenia).
- Eksport bieżącej strony do JSON; import JSON za pomocą selektora plików.
- Karty statystyk: `totalEntries`, `tokensUsed`, `hitRate`.
- Przycisk „Kompaktuj stare” → `POST /api/memory/summarize` (najpierw próbne
  uruchomienie pokazuje liczbę kandydatów, a następnie prosi o potwierdzenie).
- Zielony/czerwony wskaźnik kondycji sterowany przez `GET /api/memory/health`.

### Karta: Plac zabaw

- Pole zapytania + selektor strategii (Dokładna / Semantyczna / Hybrydowa) +
  budżet tokenów.
- „Symuluj” → `POST /api/memory/retrieve-preview` — wyświetla uszeregowane wyniki
  z wartościami `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel rozstrzygnięcia pokazujący, które źródło osadzania / magazyn wektorowy
  zostały użyte oraz czy nastąpiło przełączenie awaryjne.

### Karta: Silnik

- Panel stanu silnika (znacznik słów kluczowych FTS5, znacznik osadzania,
  znacznik magazynu wektorowego, znacznik kondycji Qdrant, znacznik ponownego
  szeregowania).
- Przycisk „Reindeksuj teraz” → `POST /api/memory/reindex`.
- Selektor źródła osadzania (automatyczne / zdalne / statyczne / transformers +
  przełączniki).
- Karta konfiguracji Qdrant (przełącznik włączenia, host/port/kolekcja/klucz,
  test połączenia, test wyszukiwania semantycznego, czyszczenie).
- Karta konfiguracji ponownego szeregowania (przełącznik włączenia, selektor
  dostawcy/modelu).

Ustawienia pamięci i Qdrant są również dostępne w sekcji
`/dashboard/settings → Pamięć i umiejętności` (`MemorySkillsTab.tsx`) jako
starszy/globalny interfejs ustawień.

## Buforowanie

`src/lib/memory/store.ts` utrzymuje działającą w ramach procesu pamięć podręczną
zbliżoną do LRU (`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, z
usuwaniem 20 % najstarszych wpisów) dla odczytów `getMemory(id)`, a także ogólną
warstwę pamięci podręcznej klucz/wartość `memoryCache`
(`src/lib/memory/cache.ts`) z metodami `get`/`set`/`invalidate`, używaną przez
wywołujących, którzy potrzebują własnej pamięci podręcznej o określonym zakresie
(LRU mieszczące 1 000 wpisów, domyślny TTL wynosi 5 min).

## Prywatność i cykl życia

- Właścicielem pamięci jest identyfikator klucza API (`resolveMemoryOwnerId` w
  `chatCore.ts`). Bez `apiKeyInfo.id` nie jest wykonywane ani pobieranie, ani
  wstrzykiwanie, ani ekstrakcja.
- Wpisy z wartością `expires_at` wskazującą przyszłość są odfiltrowywane podczas pobierania;
  stare wpisy wykraczające poza `retentionDays` są wykluczane przez warunek
  `created_at >= cutoff` w `retrieveMemories`.
- Aby trwale usunąć dane, użyj `DELETE /api/memory/[id]` lub `omniroute_memory_clear`.
- Ekstrakcja jest wykonywana asynchronicznie bez oczekiwania na wynik za pomocą `setImmediate`;
  błędy są rejestrowane pod kluczem `memory.extraction.background.failed` i nigdy nie są
  przekazywane wywołującemu.
- Przebiegi weryfikacyjne (`verifyExtractionPipeline`) usuwają własne
  wpisy testowe w bloku `finally`.

## Zobacz także

- [SKILLS.md](./SKILLS.md) — ustawienie `skillsEnabled` wstrzykuje definicje
  narzędzi wraz z pamięcią.
- [MCP-SERVER.md](./MCP-SERVER.md) — transport MCP / zakresy uprawnień.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — szerszy zakres interfejsu API.
- Moduły źródłowe:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrydowe RRF
  - `src/lib/memory/embedding/index.ts` — wieloźródłowa warstwa embeddingów
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schematy Zod dla wszystkich treści żądań interfejsu API pamięci
  - `src/shared/schemas/qdrant.ts` — schematy Zod dla ustawień/operacji Qdrant
  - `src/lib/db/memoryVec.ts` — operacje CRUD dla `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + podtrasy
  - `src/app/(dashboard)/dashboard/memory/` — interfejs użytkownika Studio (strona + komponenty +
    karty + hooki)
  - `open-sse/handlers/chatCore.ts` (integracja wstrzykiwania / ekstrakcji)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Wybór dostawcy embeddingów (v3.8.16+)

Silnik pamięci OmniRoute obsługuje **cztery źródła embeddingów** (`src/lib/memory/embedding/`). Każde z nich wiąże się z innymi kompromisami w zakresie **opóźnień, kosztów, jakości modelu i złożoności konfiguracji**.

### Źródła embeddingów

| Dostawca       | Źródło                                                 | Opóźnienie                                          | Koszt                 | Jakość                                                 | Konfiguracja                                 |
| -------------- | ------------------------------------------------------ | --------------------------------------------------- | --------------------- | ------------------------------------------------------ | -------------------------------------------- |
| `transformers` | Lokalny model ONNX (Xenova/all-MiniLM-L6-v2)           | ~50-150ms (CPU)                                     | Bezpłatnie            | Dobra                                                  | Tylko `npm install`                          |
| `static`       | Wstępnie obliczone wektory (w pamięci podręcznej)      | <1ms                                                | Bezpłatnie            | Nie dotyczy (zależy od trafienia w pamięci podręcznej) | Brak                                         |
| `remote`       | API OpenAI / Cohere / Voyage                           | ~100-300ms                                          | $0.02-0.10/1M tokenów | Doskonała                                              | Klucz API                                    |
| `auto`         | Wybiera najlepsze dostępne źródło w czasie wykonywania | Jak dla wybranego źródła                            | Bezpłatnie            | Jak dla wybranego źródła                               | Brak                                         |
| _(cache)_      | Warstwa LRU w pamięci nad dowolnym źródłem             | <1ms (trafienie), pełne opóźnienie (brak trafienia) | Bezpłatnie            | Jak dla źródła bazowego                                | Zawsze włączona (nie jest źródłem do wyboru) |

### Drzewo decyzyjne

```
                  Jaki jest kontekst wdrożenia?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    MAŁA PROD.   DUŻA PROD.    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (bezpłatne, bez API)      (najlepsza jakość) (bez internetu)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ZAWSZE dodawaj warstwę `cache`
            (LruCache opakowuje dowolnego dostawcę)
```

### Konfiguracja bazy danych i API

Opcje embeddingów pamięci konfiguruje się za pośrednictwem API/interfejsu ustawień, a nie zmiennych środowiskowych. Odpowiednie klucze ustawień bazy danych w sekcji Ustawienia (`normalizeMemorySettings` w `src/lib/memory/settings.ts`) to:

- `memoryEmbeddingSource`: `"transformers"` (lokalne), `"remote"` (oparte na API, np. OpenAI), `"static"` (zewnętrzny magazyn) lub `"auto"`
- `memoryEmbeddingProviderModel`: identyfikator modelu dla źródeł zdalnych/statycznych (np. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` lub `"auto"`

#### Model lokalny (`transformers`)

Wewnętrznie używa transformers.js do uruchamiania modeli lokalnych:

```bash
# Zmienne środowiskowe odczytywane w kodzie (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repozytorium modelu HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statyczny model potion z HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Katalog pamięci podręcznej
```

#### Pamięć podręczna LRU embeddingów

Pamięć podręczna jest domyślnie zawsze włączona i konfigurowana za pomocą zmiennych środowiskowych:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maksymalna liczba elementów w pamięci podręcznej
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Dane dotyczące wydajności

Test wydajności na typowym 4-rdzeniowym serwerze x86 (teksty po ~100 tokenów każdy):

| Dostawca             | p50   | p95   | p99   | Koszt / 1 mln embeddingów          |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Bezpłatnie                         |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Zależy od hostingu Qdrant          |
| `cache` (trafienie)  | <1ms  | <1ms  | 2ms   | Bezpłatnie                         |

---

## Wzorce wyodrębniania faktów (v3.8.16+)

Moduł `extraction.ts` (`src/lib/memory/extraction.ts`) wykorzystuje **dopasowywanie wzorców za pomocą wyrażeń regularnych**, aby wyodrębniać ustrukturyzowane fakty z wiadomości w konwersacji. Zrozumienie tych wzorców pomaga dostosować jakość wyodrębniania do konkretnego przypadku użycia.

### Domyślne kategorie wzorców

| Kategoria           | Przykładowy wzorzec                                         | Przechwytywane dane               |
| ------------------- | ----------------------------------------------------------- | --------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Preferencje użytkownika           |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Decyzje użytkownika (epizodyczne) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Trwałe wzorce zachowań            |

### Przykładowe wzorce (uproszczone)

```ts
// Z pliku src/lib/memory/extraction.ts
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
> W wyniku wyodrębniania powstają 4 wspomnienia:
>
> | Klucz                                | Kategoria  | Typ      | Treść                       |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Limity wyodrębniania

Aby zapobiec niekontrolowanemu wyodrębnianiu, obowiązują następujące limity:

| Minimalna długość treści | 3 znaki |
| Maksymalna długość treści | 500 znaków |

### Kiedy wyłączyć wyodrębnianie

Wyodrębnianie jest uruchamiane automatycznie zawsze, gdy pamięć jest włączona; nie ma osobnego
przełącznika wyłącznie dla wyodrębniania. Aby je wyłączyć, należy całkowicie wyłączyć pamięć (`enabled: false`
za pomocą `PUT /api/settings/memory`). Warto to rozważyć, gdy:

- Liczba wiadomości jest duża, a koszt wyodrębniania nie jest pomijalny
- Konwersacje mają głównie charakter tymczasowy (czat, debugowanie) i nie mają wartości długoterminowej
- Kontekst jest już przechwytywany za pomocą niestandardowych wtyczek

---

## Dostrajanie hybrydowego RRF (v3.8.16+)

Algorytm **Reciprocal Rank Fusion (RRF)** łączy wyniki FTS5 (wyszukiwanie według słów kluczowych) oraz wyniki wektorowe (semantyczne). Parametr `k` określa, jak dużą wagę otrzymują wyniki znajdujące się niżej w rankingu.

### Wzór

Dla każdego kandydującego wspomnienia wynik RRF wynosi:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Gdzie:

- `k` jest stałą (domyślnie 60)
- `rank_i(d)` jest pozycją dokumentu `d` w i-tym systemie wyszukiwania (FTS, wektorowym)
- Suma obejmuje wszystkie systemy wyszukiwania

### Wpływ parametru `k` na wyniki

| Wartość `k`            | Efekt                                                                                               | Najlepsze zastosowanie                      |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `k=0`                  | Czysta fuzja rankingów (bez wygładzania)                                                            | Teoretyczna wartość bazowa                  |
| `k=10-30`              | Silnie premiuje najlepsze wyniki, niskie pozycje mają minimalny wkład                               | Gdy pierwsze 3 wyniki są zazwyczaj poprawne |
| **`k=60`** (domyślnie) | Zrównoważone — wszystkie wyniki z pierwszej dziesiątki mają istotny wkład                           | Wyszukiwanie ogólnego przeznaczenia         |
| `k=100+`               | Bardziej płaskie — nawet wyniki z niskich pozycji mogą dominować, jeśli występują w wielu systemach | Gdy kompletność > precyzja jest kluczowa    |

### Dostrajanie `k` w praktyce

```bash
# Wartość domyślna
MEMORY_RRF_K=60

# Agresywna precyzja (mała pamięć, niewiele dokumentów)
MEMORY_RRF_K=20

# Maksymalna kompletność (duża pamięć, zróżnicowane zapytania)
MEMORY_RRF_K=120
```

**Przykład z `k=20`:**

- Pozycja FTS 1 → wkład `1/21 = 0.048`
- Pozycja FTS 10 → wkład `1/30 = 0.033`
- Pozycja wektorowa 1 → wkład `0.048`
- Maksymalny wynik łączny: `0.096`

**Przykład z `k=60`:**

- Pozycja FTS 1 → wkład `1/61 = 0.016`
- Pozycja FTS 10 → wkład `1/70 = 0.014`
- Pozycja wektorowa 1 → wkład `0.016`
- Maksymalny wynik łączny: `0.033`

Przy wyższej wartości `k` **względna różnica** między pierwszym wynikiem a wynikiem na pozycji 10 jest mniejsza, dlatego algorytm w większym stopniu opiera się na **zgodności między systemami wyszukiwania** niż na pewności najlepszego wyniku.

### Kiedy zmienić `k`

| Objaw                                                                            | Co wypróbować                                                           |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Najlepszy wynik zawsze wygrywa, ale jest błędny                                  | **Niższe** k (np. 20) — pewność najwyższej pozycji ma większe znaczenie |
| Poprawna odpowiedź znajduje się w pierwszej piątce, ale nie na pierwszym miejscu | **Wyższe** k (np. 100) — bardziej płaska punktacja premiuje zgodność    |
| Kompletność jest wysoka, ale precyzja niska                                      | **Niższe** k — wyostrz ranking                                          |
| Kompletność jest niska (brakuje trafnych dokumentów)                             | **Wyższe** k — daj szansę dokumentom z niższych pozycji                 |

### Ważenie RRF

Fuzja oparta na odwrotności pozycji wykorzystuje równe wagi dla semantycznego rankingu wektorowego i rankingu wyszukiwania pełnotekstowego:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Nie istnieją zmienne środowiskowe umożliwiające dostosowanie poszczególnych wag (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` nie istnieją).

---

## Strategia podsumowywania (v3.8.16+)

Moduł `summarization.ts` (`src/lib/memory/summarization.ts`) kompresuje starsze wspomnienia, aby utrzymać mały aktywny zestaw przy jednoczesnym zachowaniu możliwości ich przywoływania.

### Kiedy uruchamiane jest podsumowywanie

| Wyzwalacz                  | Próg (domyślny) |
| -------------------------- | --------------- |
| Ręczne wywołanie przez API | nie dotyczy     |

### Co jest podsumowywane

Z pliku `summarization.ts` eksportowane są dwa punkty wejścia:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — kondensuje
  wspomnienia z sesji do pojedynczego tekstu podsumowania ograniczonego budżetem tokenów.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — kompresja oparta na wieku,
  używana przez API: wybiera każde wspomnienie starsze niż `days`, tworzy z nich jedno
  skondensowane wspomnienie podsumowujące i (gdy `dryRun` ma wartość `false`) usuwa
  oryginały. Przekaż `dryRun: true`, aby wyświetlić podgląd zestawu kandydatów i łącznej
  liczby tokenów bez wprowadzania żadnych zmian.

Nie ma etapu grupowania według tagów/kluczy ani oceny poszczególnych wspomnień jako
„kluczowe lub możliwe do podsumowania” — wybór opiera się wyłącznie na granicy wieku,
a tekst podsumowania składa się ze skondensowanych wierszy dla każdego kandydata,
poprzedzonych jego typem.

### Uruchamianie podsumowywania

Podsumowywanie jest **ręczne / opcjonalne** — ustawienie `autoSummarize` ma domyślnie
wartość `false`, dlatego nic nie jest automatycznie kompresowane. Uruchom je przez API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Aby pozostawić tę funkcję wyłączoną, zachowaj domyślną wartość `autoSummarize` (`false`).

### Wskazówki dotyczące jakości podsumowywania

- **Najpierw wyświetl podgląd za pomocą `dryRun`** — `summarizeMemoriesOlderThan(..., true)`
  zwraca listę kandydatów i łączną liczbę tokenów, dzięki czemu można sprawdzić, co
  zostanie połączone przed usunięciem oryginałów.
- **Uruchamiaj podsumowywanie w godzinach małego ruchu**, jeśli masz duży korpus wspomnień — wywołanie LLM jest najwolniejszym etapem

```bash
# W stylu Cron: podsumowuj codziennie o 3:00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Wzorzec dostawcy MemoryBackend

> **Źródło prawdy:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testy:** `src/lib/memory/__tests__/generic-backend.test.ts`

Wzorzec dostawcy MemoryBackend wprowadza **wymienną warstwę abstrakcji backendu** nad istniejącym silnikiem pamięci. Zamiast być powiązanym z jedną implementacją pamięci masowej, system pamięci obsługuje teraz wiele backendów (SQLite, Obsidian, Notion, niestandardowe backendy HTTP) z konfigurowalnym routingiem podstawowym i rezerwowym.

### Architektura

```
┌──────────────────────────────────────────────────────────┐
│                    Trasy API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orkiestrator singletonowy (manager.ts)              │
│                                                          │
│  Podstawowy ──► Backend A  (np. SQLite)                  │
│  Rezerwowy  ──► Backend B  (np. Obsidian)                │
│                 Backend C  (np. Notion przez GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ GenericMemory    │
│ SQLite     │ │ Obsidian   │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Główny interfejs (`backend.ts`)

Każdy backend musi implementować interfejs `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // Operacje CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Wyszukiwanie
  search(config: SearchConfig): Promise<Memory[]>;

  // Stan
  health(): Promise<HealthCheckResult>;

  // Cykl życia (opcjonalnie)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orkiestrator singletonowy, który:

- **Rejestruje** backendy za pomocą `register(backend)` — wywoływane podczas uruchamiania z `index.ts`
- **Konfiguruje** backend podstawowy i rezerwowe za pomocą `configure(primary, fallbacks)`
- **Kieruje** operacje CRUD/wyszukiwania do backendu podstawowego, korzystając z łańcucha backendów rezerwowych w przypadku awarii
- **Sprawdza stan** wszystkich backendów w regularnych odstępach czasu

**Zachowanie mechanizmu rezerwowego:**

| Operacja | Backend podstawowy             | Backendy rezerwowe                         |
| -------- | ------------------------------ | ------------------------------------------ |
| `create` | ✅ Tylko backend podstawowy    | ❌                                         |
| `get`    | ✅ Najpierw backend podstawowy | ✅ Rezerwowy, jeśli wynik to null          |
| `update` | ✅ Tylko backend podstawowy    | ✅ Synchronizacja bez oczekiwania na wynik |
| `delete` | ✅ Tylko backend podstawowy    | ✅ Synchronizacja bez oczekiwania na wynik |
| `list`   | ✅ Tylko backend podstawowy    | ❌                                         |
| `search` | ✅ Najpierw backend podstawowy | ✅ Rezerwowy w przypadku błędu             |

#### GenericMemoryBackend (`genericBackend.ts`)

Ogólny konektor HTTP, który dostosowuje dowolne REST API do interfejsu MemoryBackend. Przydatny w przypadku:

- **Notion** — połączenie przez Notion API
- **Obsidian** — połączenie przez Obsidian Local REST API
- **Niestandardowych backendów** — dowolnej usługi udostępniającej RESTful API pamięci

**Konfiguracja:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Bazowy adres URL interfejsu API backendu
  apiKey?: string;           // Token Bearer do uwierzytelniania
  headers?: Record<string, string>;  // Niestandardowe nagłówki HTTP
  timeout?: number;          // Limit czasu żądania (domyślnie: 30000ms)
  backendType?: string;      // Do rejestrowania zdarzeń

  // Nadpisania endpointów (wartości domyślne używają konwencji REST)
  endpoints?: {
    search?: string;   // domyślnie: "/memories/search"
    create?: string;   // domyślnie: "/memories"
    list?: string;     // domyślnie: "/memories"
    get?: string;      // domyślnie: "/memories/{id}"
    update?: string;   // domyślnie: "/memories/{id}"
    delete?: string;   // domyślnie: "/memories/{id}"
    health?: string;   // domyślnie: "/health"
  };

  // Mapowania nazw parametrów zapytania
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapowania nazw parametrów ścieżki
  pathParams?: {
    id?/memoryId?
  };
}
```

**Znane backendy** są wstępnie skonfigurowane w `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend wskazujący na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend wskazujący na api.notion.com/v1
```

#### Wbudowane backendy

##### SQLiteBackend (`sqliteBackend.ts`)

Domyślny backend główny. Opakowuje istniejący magazyn pamięci oparty na SQLite, używając `src/lib/memory/store.ts`. Jest automatycznie rejestrowany podczas uruchamiania.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Opakowuje istniejącą integrację z Obsidianem (`src/lib/memory/obsidianBackend.ts`). Łączy się z magazynem Obsidian za pośrednictwem lokalnego interfejsu REST API Obsidiana.

### Ustawienia

Ustawienia backendu pamięci są przechowywane w tabeli ustawień aplikacji i zarządzane za pośrednictwem `src/lib/memory/settings.ts`:

| Ustawienie             | Klucz środowiska/konfiguracji | Domyślnie  | Opis                                                 |
| ---------------------- | ----------------------------- | ---------- | ---------------------------------------------------- |
| Backend główny         | `memoryPrimaryBackend`        | `"sqlite"` | Identyfikator głównego backendu                      |
| Backendy rezerwowe     | `memoryFallbackBackends`      | `[]`       | Uporządkowane identyfikatory backendów rezerwowych   |
| Konfiguracje backendów | `memoryBackendConfigs`        | `{}`       | Nadpisania konfiguracji dla poszczególnych backendów |

Ustawienia są normalizowane za pomocą `normalizeMemorySettings()` i buforowane w `getMemorySettings()`.

### Przebieg inicjalizacji

```
Uruchomienie aplikacji
  → importy index.ts (efekt uboczny): rejestrują SQLiteBackend
  → initMemoryBackends() wywoływane z cyklu życia aplikacji:
      1. Wczytanie ustawień (getMemorySettings)
      2. Skonfigurowanie backendu głównego i rezerwowych
      3. Zainicjalizowanie wszystkich backendów (kontrola stanu)
      4. Gotowość do obsługi żądań
```

### Dodawanie nowego backendu

1. **Zaimplementuj interfejs `MemoryBackend`** w `src/lib/memory/<name>Backend.ts`
2. **Wyeksportuj** z `src/lib/memory/index.ts`
3. **Zarejestruj** za pomocą `memoryManager.register(yourBackend)` podczas uruchamiania
4. **Skonfiguruj** za pomocą ustawień: ustaw `memoryPrimaryBackend` na identyfikator swojego backendu
5. **Przetestuj**, używając `src/lib/memory/__tests__/generic-backend.test.ts` jako punktu odniesienia

#### Przykład: backend Brain

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

### Weryfikacja

#### Testy jednostkowe

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Oczekiwany wynik: **35 testów, wszystkie zakończone powodzeniem**, obejmujących:

- Konstruktor (2)
- Kontrolę stanu (4) — powodzenie, błąd 500, błąd sieci, opóźnienie
- Inicjalizację (2) — powodzenie, niepowodzenie
- Tworzenie (2) — domyślny endpoint, niestandardowy endpoint
- Pobieranie (4) — powodzenie, 404 → null, zgłoszenie wyjątku dla kodu innego niż 404, niestandardowe parametry ścieżki
- Aktualizację (2) — powodzenie, 404 → false
- Usuwanie (2) — powodzenie, 404 → false
- Wyświetlanie listy (2) — parametry zapytania, niestandardowe nazwy parametrów
- Wyszukiwanie (3) — parametry zapytania, niestandardowy endpoint, serializacja opcji
- Nagłówki uwierzytelniania (2) — token Bearer, niestandardowe nagłówki
- Fabrykę (1)

#### Sprawdzanie typów

```bash
npm run typecheck:core
```

Oczekiwany wynik: **0 błędów**.
