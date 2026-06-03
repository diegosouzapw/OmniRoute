# CLAUDE.md (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Ten plik zawiera wskazówki dla Claude Code (claude.ai/code) podczas pracy z kodem w tym repozytorium.

## Szybki Start

```bash
npm install                    # Instalacja zależności (automatyczne generowanie .env z .env.example)
npm run dev                    # Serwer deweloperski na http://localhost:20128
npm run build                  # Budowa produkcyjna (Next.js 16 standalone)
npm run lint                   # ESLint (0 błędów oczekiwanych; ostrzeżenia są już istniejące)
npm run typecheck:core         # Sprawdzenie TypeScript (powinno być czyste)
npm run typecheck:noimplicit:core  # Ścisłe sprawdzenie (brak implicit any)
npm run test:coverage          # Testy jednostkowe + bramka pokrycia (75/75/75/70 — instrukcje/linie/funkcje/gałęzie)
npm run check                  # lint + testy połączone
npm run check:cycles           # Wykrywanie cyklicznych zależności
```

### Uruchamianie Testów

```bash
# Pojedynczy plik testowy (wbudowany runner testów Node.js — większość testów)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (serwer MCP, autoCombo, cache)
npm run test:vitest

# Wszystkie zestawy
npm run test:all
```

Aby zobaczyć pełną macierz testów, zapoznaj się z `CONTRIBUTING.md` → "Uruchamianie Testów". Aby zobaczyć głęboką architekturę, zapoznaj się z `AGENTS.md`.

---

## Projekt w Skrócie

**OmniRoute** — zjednoczony proxy/router AI. Jeden punkt końcowy, 160+ dostawców LLM, automatyczne przełączanie.

| Warstwa       | Lokalizacja             | Cel                                                                                |
| ------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Router aplikacji Next.js — punkty wejścia                                          |
| Handlers      | `open-sse/handlers/`    | Przetwarzanie żądań (czat, osadzenia itp.)                                         |
| Executors     | `open-sse/executors/`   | Specyficzne dla dostawcy wysyłanie HTTP                                            |
| Translators   | `open-sse/translator/`  | Konwersja formatów (OpenAI↔Claude↔Gemini)                                          |
| Transformer   | `open-sse/transformer/` | API odpowiedzi ↔ Uzupełnienia czatu                                                |
| Services      | `open-sse/services/`    | Routing combo, limity prędkości, cache itp.                                        |
| Database      | `src/lib/db/`           | Moduły domeny SQLite (45+ plików, 55 migracji)                                     |
| Domain/Policy | `src/domain/`           | Silnik polityki, zasady kosztów, logika przełączania                               |
| MCP Server    | `open-sse/mcp-server/`  | 37 narzędzi (30 bazowych + 3 pamięci + 4 umiejętności), 3 transporty, ~13 zakresów |
| A2A Server    | `src/lib/a2a/`          | Protokół agenta JSON-RPC 2.0                                                       |
| Skills        | `src/lib/skills/`       | Rozszerzalna struktura umiejętności                                                |
| Memory        | `src/lib/memory/`       | Trwała pamięć konwersacyjna                                                        |

Monorepo: `src/` (aplikacja Next.js 16), `open-sse/` (workspace silnika strumieniowego), `electron/` (aplikacja desktopowa), `tests/`, `bin/` (punkt wejścia CLI).

---

## Pipeline Żądań

```
Klient → /v1/chat/completions (trasa Next.js)
  → CORS → walidacja Zod → autoryzacja? → sprawdzenie polityki → ochrona przed wstrzyknięciem promptu
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → sprawdzenie pamięci podręcznej → limit szybkości → routowanie combo?
      → resolveComboTargets() → handleSingleModel() dla każdego celu
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → ponów z opóźnieniem
    → tłumaczenie odpowiedzi → strumień SSE lub JSON
    → Jeśli API Odpowiedzi: responsesTransformer.ts TransformStream
```

Trasy API podążają za spójnym wzorem: `Trasa → wstępne zapytanie CORS → walidacja ciała Zod → Opcjonalna autoryzacja (extractApiKey/isValidApiKey) → egzekwowanie polityki klucza API → delegacja obsługi (open-sse)`. Brak globalnego middleware Next.js — przechwytywanie jest specyficzne dla trasy.

**Routowanie combo** (`open-sse/services/combo.ts`): 14 strategii (priorytet, ważony, fill-first, round-robin, P2C, losowy, najmniej używany, zoptymalizowany kosztowo, świadomy resetu, ścisły losowy, auto, lkgp, zoptymalizowany kontekstowo, relay kontekstowy). Każdy cel wywołuje `handleSingleModel()`, który owija `handleChatCore()` z obsługą błędów dla każdego celu i sprawdzeniami wyłącznika obwodu. Zobacz `docs/routing/AUTO-COMBO.md` dla 9-czynnikowego punktowania Auto-Combo i `docs/architecture/RESILIENCE_GUIDE.md` dla 3 warstw odporności.

---

## Stan Czasu Wykonania Odporności

OmniRoute ma trzy powiązane, ale odrębne mechanizmy tymczasowej awarii. Zachowaj ich zakres oddzielnie podczas debugowania zachowania routingu. Zobacz
[diagram odporności 3-warstwowej](./docs/diagrams/exported/resilience-3layers.svg)
(źródło: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
dla szybkiej mapy.

### Wyłącznik Obwodu Dostawcy

**Zakres**: cały dostawca, np. `glm`, `openai`, `anthropic`.

**Cel**: zatrzymać wysyłanie ruchu do dostawcy, który wielokrotnie zawodzi na poziomie upstream/usługi, aby jeden niezdrowy dostawca nie spowalniał każdego żądania.

**Implementacja**:

- Klasa główna: `src/shared/utils/circuitBreaker.ts`
- Połączenie bramki czatu/wykonania: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusu czasu wykonania: `src/app/api/monitoring/health/route.ts`
- Wspólne opakowania: `open-sse/services/accountFallback.ts`
- Tabela stanu utrwalanego: `domain_circuit_breakers`

**Stany**:

- `CLOSED`: normalny ruch jest dozwolony.
- `OPEN`: dostawca jest tymczasowo zablokowany; dzwoniący otrzymują odpowiedź provider-circuit-open
  lub routowanie combo pomija inny cel.
- `HALF_OPEN`: czas resetu upłynął; zezwól na żądanie próbne. Sukces zamyka
  wyłącznik, niepowodzenie ponownie go otwiera.

**Domyślne** (`open-sse/config/constants.ts`):

- Dostawcy OAuth: próg `3`, czas resetu `60s`.
- Dostawcy kluczy API: próg `5`, czas resetu `30s`.
- Dostawcy lokalni: próg `2`, czas resetu `15s`.

Tylko statusy awarii na poziomie dostawcy powinny uruchamiać wyłącznik dostawcy:

```ts
(408, 500, 502, 503, 504);
```

Nie uruchamiaj wyłącznika całego dostawcy dla normalnych błędów konta/klucza/modelu, takich jak większość
`401`, `403` lub `429`. Zwykle należą one do cooldownu połączenia lub zablokowania modelu. Ogólny błąd dostawcy klucza API `403` powinien być możliwy do odzyskania, chyba że zostanie sklasyfikowany
jako terminalny błąd dostawcy/konta.

Wyłącznik używa leniwego odzyskiwania, a nie tła. Gdy `OPEN` wygasa, odczyty takie jak `getStatus()`, `canExecute()`, i `getRetryAfterMs()` odświeżają stan do
`HALF_OPEN`, aby pulpity nawigacyjne i budowniczy kandydatów combo nie wykluczali wygasłego dostawcy na zawsze.

### Cooldown Połączenia

**Zakres**: jedno połączenie dostawcy/konto/klucz.

**Cel**: tymczasowo pominąć jeden zły klucz/konto, pozwalając innym połączeniom dla
tego samego dostawcy kontynuować obsługę żądań.

**Implementacja**:

- Ścieżka zapisu/aktualizacji: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór/filtracja konta: `src/sse/services/auth.ts::getProviderCredentials...`
- Obliczanie cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

Ważne pola w połączeniach dostawcy:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Podczas wyboru konta, połączenie jest pomijane, gdy:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny są również leniwe: gdy `rateLimitedUntil` jest w przeszłości, połączenie staje się
ponownie kwalifikowalne. Po udanym użyciu, `clearAccountError()` czyści `testStatus`,
`rateLimitedUntil`, pola błędów i `backoffLevel`.

Domyślne zachowanie cooldownu połączenia:

- Podstawowy cooldown OAuth: `5s`.
- Podstawowy cooldown klucza API: `3s`.
- Klucz API `429` powinien preferować wskazówki ponownego próbowania upstream (`Retry-After`, nagłówki resetu lub
  tekst resetu do analizy) gdy są dostępne.
- Powtarzające się odzyskiwalne błędy używają wykładniczego opóźnienia:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ochrona przed zjawiskiem "thundering herd" zapobiega równoczesnym awariom na tym samym połączeniu, które
wielokrotnie wydłużają cooldown lub podwajają `backoffLevel`.

Stany terminalne nie są cooldownami. `banned`, `expired`, i `credits_exhausted` mają
pozostać niedostępne, aż zmienią się dane uwierzytelniające/ustawienia lub operator je zresetuje. Nie nadpisuj stanów terminalnych stanem cooldownu.

### Zablokowanie Modelu

**Zakres**: dostawca + połączenie + model.

**Cel**: unikać wyłączania całego połączenia, gdy tylko jeden model jest niedostępny lub
ograniczony kwotowo dla tego połączenia.

Przykłady:

- Dostawcy z kwotą na model zwracający `429`.
- Dostawcy lokalni zwracający `404` dla jednego brakującego modelu.
- Specyficzne dla dostawcy błędy uprawnień trybu/modelu, takie jak wybrane tryby Grok.

Zablokowanie modelu znajduje się w `open-sse/services/accountFallback.ts` i pozwala temu samemu
połączeniu kontynuować obsługę innych modeli.

### Wskazówki Debuggingowe

- Jeśli wszystkie klucze dla dostawcy są pomijane, sprawdź zarówno stan wyłącznika dostawcy, jak i `rateLimitedUntil`/`testStatus` każdego
  połączenia.
- Jeśli dostawca wydaje się na stałe wykluczony po oknie resetu, sprawdź, czy kod
  odczytuje surowy `state` zamiast używać `getStatus()`/`canExecute()`.
- Jeśli jeden klucz dostawcy zawodzi, ale inne powinny działać, preferuj cooldown połączenia nad
  wyłącznikiem dostawcy.
- Jeśli tylko jeden model zawodzi, preferuj zablokowanie modelu nad cooldownem połączenia.
- Jeśli stan powinien samodzielnie się odzyskać, powinien mieć przyszły znacznik czasu/czas resetu i ścieżkę
  odczytu, która odświeża wygasły stan. Statusy permanentne wymagają ręcznych zmian danych uwierzytelniających
  lub konfiguracji.

## Kluczowe Konwencje

### Styl Kodowania

- **2 spacje**, średniki, podwójne cudzysłowy, szerokość 100 znaków, es5 przecinki na końcu (egzekwowane przez lint-staged za pomocą Prettier)
- **Importy**: zewnętrzne → wewnętrzne (`@/`, `@omniroute/open-sse`) → względne
- **Nazewnictwo**: pliki=camelCase/kebab, komponenty=PascalCase, stałe=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = błąd wszędzie; `no-explicit-any` = ostrzeżenie w `open-sse/` i `tests/`
- **TypeScript**: `strict: false`, cel ES2022, moduł esnext, rozdzielczość bundler. Preferuj jawne typy.

### Baza Danych

- **Zawsze** korzystaj z modułów domenowych w `src/lib/db/` — **nigdy** nie pisz surowego SQL w trasach lub handlerach
- **Nigdy** nie dodawaj logiki do `src/lib/localDb.ts` (tylko warstwa re-exportu)
- **Nigdy** nie importuj z `localDb.ts` w sposób barrel-import — zamiast tego importuj konkretne moduły `db/`
- Singleton DB: `getDbInstance()` z `src/lib/db/core.ts` (dziennik WAL)
- Migracje: `src/lib/db/migrations/` — wersjonowane pliki SQL, idempotentne, uruchamiane w transakcjach

### Obsługa Błędów

- try/catch z konkretnymi typami błędów, loguj z kontekstem pino
- Nigdy nie ignoruj błędów w strumieniach SSE — używaj sygnałów przerywających do czyszczenia
- Zwracaj odpowiednie kody statusu HTTP (4xx/5xx)

### Bezpieczeństwo

- **Nigdy** nie używaj `eval()`, `new Function()`, ani implikowanego eval
- Waliduj wszystkie dane wejściowe za pomocą schematów Zod
- Szyfruj dane uwierzytelniające w spoczynku (AES-256-GCM)
- Lista nagłówków denylist: `src/shared/constants/upstreamHeaders.ts` — utrzymuj sanitizację, schematy Zod i testy jednostkowe w zgodzie podczas edytowania
- **Publiczne dane uwierzytelniające upstream** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + klucze Firebase Web wyciągnięte z publicznych CLI): **MUSZĄ** być osadzone za pomocą `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` — **nigdy** jako literały stringowe. Zobacz `docs/security/PUBLIC_CREDS.md` dla obowiązkowego wzoru.
- **Odpowiedzi błędów** (HTTP / SSE / executor / MCP handler): **MUSZĄ** przechodzić przez `buildErrorBody()` lub `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — **nigdy** nie umieszczaj surowego `err.stack` lub `err.message` w ciele odpowiedzi. Zobacz `docs/security/ERROR_SANITIZATION.md`.
- **Polecenia powłoki budowane z zmiennych**: podczas wywoływania `exec()`/`spawn()` z skryptem, który potrzebuje wartości w czasie wykonywania, przekaż je za pomocą opcji `env` (automatycznie escapowane w powłoce) — **nigdy** nie interpoluj nieufnych/zewnętrznych ścieżek do ciała skryptu. Odniesienie: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biblioteki zabezpieczone domyślnie** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferuj Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink zamiast własnych implementacji, gdy dodajesz nowe powierzchnie wrażliwe na bezpieczeństwo.

---

## Typowe Scenariusze Modyfikacji

### Dodawanie Nowego Dostawcy

1. Zarejestruj w `src/shared/constants/providers.ts` (walidowane przez Zod przy ładowaniu)
2. Dodaj executor w `open-sse/executors/`, jeśli potrzebna jest logika niestandardowa (rozszerz `BaseExecutor`)
3. Dodaj translator w `open-sse/translator/`, jeśli format nie jest OpenAI
4. Dodaj konfigurację OAuth w `src/lib/oauth/constants/oauth.ts`, jeśli oparta na OAuth — jeśli upstream CLI dostarcza publiczny client_id/secret, osadź za pomocą `resolvePublicCred()` (zobacz `docs/security/PUBLIC_CREDS.md`), **nigdy** jako literał
5. Zarejestruj modele w `open-sse/config/providerRegistry.ts`
6. Napisz testy w `tests/unit/` (dołącz asercję kształtu publicCreds, jeśli dodałeś nowy osadzony domyślny)

### Dodawanie Nowej Trasy API

1. Utwórz katalog pod `src/app/api/v1/your-route/`
2. Utwórz `route.ts` z handlerami `GET`/`POST`
3. Postępuj zgodnie ze wzorem: CORS → walidacja ciała Zod → opcjonalna autoryzacja → delegacja handlera
4. Handler umieść w `open-sse/handlers/` (importuj stamtąd, nie inline)
5. Odpowiedzi błędów używają `buildErrorBody()` / `errorResponse()` z `open-sse/utils/error.ts` (automatycznie sanitizowane — nigdy nie umieszczaj surowego `err.stack` lub `err.message` w ciele). Zobacz `docs/security/ERROR_SANITIZATION.md`.
6. Dodaj testy — w tym przynajmniej jedną asercję, że odpowiedzi błędów nie ujawniają śladów stosu (`!body.error.message.includes("at /")`)

### Dodawanie Nowego Modułu DB

1. Utwórz `src/lib/db/yourModule.ts` — importuj `getDbInstance` z `./core.ts`
2. Eksportuj funkcje CRUD dla swojej tabeli domenowej
3. Dodaj migrację w `src/lib/db/migrations/`, jeśli potrzebne są nowe tabele
4. Re-exportuj z `src/lib/localDb.ts` (dodaj tylko do listy re-exportu)
5. Napisz testy

### Dodawanie Nowego Narzędzia MCP

1. Dodaj definicję narzędzia w `open-sse/mcp-server/tools/` z schematem wejściowym Zod + asynchronicznym handlerem
2. Zarejestruj w zestawie narzędzi (połączone przez `createMcpServer()`)
3. Przypisz do odpowiednich zakresów
4. Napisz testy (wywołanie narzędzia logowane do tabeli `mcp_audit`)

### Dodawanie Nowej Umiejętności A2A

1. Utwórz umiejętność w `src/lib/a2a/skills/` (istnieje już 5: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Umiejętność otrzymuje kontekst zadania (wiadomości, metadane) → zwraca uporządkowany wynik
3. Zarejestruj w `A2A_SKILL_HANDLERS` w `src/lib/a2a/taskExecution.ts`
4. Udostępnij w `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Napisz testy w `tests/unit/`
6. Udokumentuj w tabeli umiejętności w `docs/frameworks/A2A-SERVER.md`

### Dodawanie Nowego Agenta Chmurowego

1. Utwórz klasę agenta w `src/lib/cloudAgent/agents/`, rozszerzając `CloudAgentBase` (istnieją już 3: codex-cloud, devin, jules)
2. Zaimplementuj `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Zarejestruj w `src/lib/cloudAgent/registry.ts`
4. Dodaj obsługę OAuth/danych uwierzytelniających, jeśli to konieczne (`src/lib/oauth/providers/`)
5. Testy + dokumentacja w `docs/frameworks/CLOUD_AGENT.md`

### Dodawanie Nowego Guardrail / Eval / Skill / Wydarzenia Webhook

- Guardrail: `src/lib/guardrails/` → dokumentacja: `docs/security/GUARDRAILS.md`
- Zestaw Eval: `src/lib/evals/` → dokumentacja: `docs/frameworks/EVALS.md`
- Umiejętność (sandbox): `src/lib/skills/` → dokumentacja: `docs/frameworks/SKILLS.md`
- Wydarzenie Webhook: `src/lib/webhookDispatcher.ts` → dokumentacja: `docs/frameworks/WEBHOOKS.md`

## Dokumentacja referencyjna

Dla każdej niebanalnej zmiany, najpierw przeczytaj odpowiedni szczegółowy dokument:

| Obszar                                              | Dokument                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Nawigacja repozytoriów                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architektura                                        | `docs/architecture/ARCHITECTURE.md`                               |
| Dokumentacja inżynieryjna                           | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-czynnikowe ocenianie, 14 strategii)   | `docs/routing/AUTO-COMBO.md`                                      |
| Odporność (3 mechanizmy)                            | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Odtwarzanie rozumowania                             | `docs/routing/REASONING_REPLAY.md`                                |
| Ramy umiejętności                                   | `docs/frameworks/SKILLS.md`                                       |
| System pamięci (FTS5 + Qdrant)                      | `docs/frameworks/MEMORY.md`                                       |
| Agenci chmurowi                                     | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Zasady bezpieczeństwa (PII / wstrzykiwanie / wizja) | `docs/security/GUARDRAILS.md`                                     |
| Publiczne dane uwierzytelniające (Gemini/itd.)      | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanityzacja komunikatów o błędach                   | `docs/security/ERROR_SANITIZATION.md`                             |
| Oceny                                               | `docs/frameworks/EVALS.md`                                        |
| Zgodność / audyt                                    | `docs/security/COMPLIANCE.md`                                     |
| Webhooki                                            | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline autoryzacji                                | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / odcisk palca)                        | `docs/security/STEALTH_GUIDE.md`                                  |
| Protokoły agentów (A2A / ACP / Cloud)               | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Serwer MCP                                          | `docs/frameworks/MCP-SERVER.md`                                   |
| Serwer A2A                                          | `docs/frameworks/A2A-SERVER.md`                                   |
| Referencja API + OpenAPI                            | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalog dostawców (automatycznie generowany)        | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Proces wydania                                      | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Testowanie

| Co                      | Komenda                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| Testy jednostkowe       | `npm run test:unit`                                                      |
| Pojedynczy plik         | `node --import tsx/esm --test tests/unit/file.test.ts`                   |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                    |
| E2E (Playwright)        | `npm run test:e2e`                                                       |
| Protokół E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                             |
| Ekosystem               | `npm run test:ecosystem`                                                 |
| Brama pokrycia          | `npm run test:coverage` (75/75/75/70 — instrukcje/linie/funkcje/gałęzie) |
| Raport pokrycia         | `npm run coverage:report`                                                |

**Zasada PR**: Jeśli zmieniasz kod produkcyjny w `src/`, `open-sse/`, `electron/`, lub `bin/`, musisz dodać lub zaktualizować testy w tym samym PR.

**Preferencje warstwy testów**: najpierw jednostkowe → integracyjne (wielomodułowe lub stan DB) → e2e (tylko UI/flow). Zakoduj reprodukcje błędów jako automatyczne testy przed lub równolegle z poprawką.

**Polityka pokrycia Copilot**: Gdy PR zmienia kod produkcyjny, a pokrycie jest poniżej 75% (instrukcje/linie/funkcje) lub 70% (gałęzie), nie tylko zgłaszaj — dodaj lub zaktualizuj testy, uruchom ponownie bramę pokrycia, a następnie poproś o potwierdzenie. Dołącz uruchomione komendy, zmienione pliki testowe i ostateczny wynik pokrycia w raporcie PR.

---

## Workflow Git

```bash
# Nigdy nie commituj bezpośrednio do main
git checkout -b feat/your-feature
git commit -m "feat: opisz swoją zmianę"
git push -u origin feat/your-feature
```

**Prefiksy gałęzi**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format commitów** (Conventional Commits): `feat(db): dodaj circuit breaker` — zakresy: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Haki Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Środowisko

- **Czas działania**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, cel ES2022, moduł esnext, rozdzielczość bundler
- **Alias ścieżek**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Domyślny port**: 20128 (API + dashboard na tym samym porcie)
- **Katalog danych**: zmienna środowiskowa `DATA_DIR`, domyślnie `~/.omniroute/`
- **Kluczowe zmienne środowiskowe**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Konfiguracja: `cp .env.example .env`, a następnie wygeneruj `JWT_SECRET` (`openssl rand -base64 48`) i `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Twarde zasady

1. Nigdy nie commituj sekretów ani poświadczeń
2. Nigdy nie dodawaj logiki do `localDb.ts`
3. Nigdy nie używaj `eval()` / `new Function()` / domyślnego eval
4. Nigdy nie commituj bezpośrednio do `main`
5. Nigdy nie pisz surowego SQL w trasach — używaj modułów `src/lib/db/`
6. Nigdy nie ignoruj błędów w strumieniach SSE
7. Zawsze waliduj dane wejściowe za pomocą schematów Zod
8. Zawsze dołączaj testy przy zmianie kodu produkcyjnego
9. Pokrycie musi wynosić ≥75% (instrukcje, linie, funkcje) / ≥70% (gałęzie). Aktualnie zmierzone: ~82%.
10. Nigdy nie omijaj haków Husky (`--no-verify`, `--no-gpg-sign`) bez wyraźnej zgody operatora.
11. Nigdy nie osadzaj publicznych upstream OAuth client_id/secret ani kluczy Firebase Web jako literałów stringowych — zawsze korzystaj z `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Zobacz `docs/security/PUBLIC_CREDS.md`.
12. Nigdy nie zwracaj surowego `err.stack` / `err.message` w odpowiedziach HTTP / SSE / executor — zawsze kieruj przez `buildErrorBody()` lub `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Zobacz `docs/security/ERROR_SANITIZATION.md`.
13. Nigdy nie interpoluj zewnętrznych ścieżek ani wartości czasu wykonania do skryptów powłoki przekazywanych do `exec()`/`spawn()` — przekazuj przez opcję `env`. Odniesienie: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nigdy nie ignoruj alertu CodeQL / Secret-Scanning bez (a) najpierw sprawdzenia dokumentacji wzorców powyżej, aby zobaczyć, czy pomocnik ma zastosowanie, oraz (b) zapisania uzasadnienia technicznego w komentarzu o odrzuceniu. Precedens: `js/stack-trace-exposure` zgłoszone w miejscach wywołania, które już kierują przez `sanitizeErrorMessage()`, jest znanym ograniczeniem CodeQL (niestandardowe sanitizery nie są rozpoznawane) — odrzuć jako `fałszywy pozytyw`, odnosząc się do `docs/security/ERROR_SANITIZATION.md`.
15. Nigdy nie udostępniaj tras, które uruchamiają procesy podrzędne (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasyfikacji `isLocalOnlyPath()` w `src/server/authz/routeGuard.ts`. Egzekucja loopback odbywa się bezwarunkowo przed jakąkolwiek kontrolą autoryzacji — wyciekający JWT przez tunel nie może uruchomić procesów. Zobacz `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nigdy nie dołączaj nagłówków `Co-Authored-By`, które przypisują zasługi asystentowi AI, LLM lub kontu automatyzacji (np. nazwy zawierające "Claude", "GPT", "Copilot", "Bot"; e-maile w `anthropic.com` / `openai.com` / adresach `noreply.github.com` należących do botów). Takie nagłówki kierują atrybucję commitów do konta bota na GitHubie, ukrywając prawdziwego autora (`diegosouzapw`) w historii PR. Współpracownicy ludzcy — w tym autorzy upstream PR i zgłaszający issues portowanych do OmniRoute — MOGĄ i POWINNI być uznawani standardowymi nagłówkami `Co-authored-by: Name <email>`; przepływy pracy upstream-port (`/port-upstream-features`, `/port-upstream-issues`) zależą od tego.
