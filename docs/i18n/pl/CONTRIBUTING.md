# Contributing to OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Dziękujemy za zainteresowanie współtworzeniem projektu! Ten przewodnik zawiera wszystko, czego potrzebujesz, aby rozpocząć.

Oficjalny proces dotyczący poszczególnych zmian opisano w
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Dokument ten przyporządkowuje zmiany dotyczące dostawców, routingu,
UI/UX, i18n, CLI, bazy danych oraz kompilacji/wdrażania do odpowiednich kontraktów, ukierunkowanych testów, zakresu CI
i kroków uzgadniania.

---

## Konfiguracja środowiska programistycznego

### Wymagania wstępne

- **Node.js** `>=22.22.3 <23` lub `>=24.0.0 <27` (zalecane: 24 LTS)
- **npm** 10+

> **Użytkownicy npm v11+ (Node 24+):** Po wykonaniu `npm install` sprawdź, czy moduły natywne zostały zainstalowane:
> `node -e "require('better-sqlite3')"`. Jeśli polecenie zakończy się błędem `MODULE_NOT_FOUND`,
> uruchom `npm approve-scripts better-sqlite3 && npm install`. Zobacz
> [Rozwiązywanie problemów](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonowanie i instalacja

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Zmienne środowiskowe

```bash
# Utwórz plik .env na podstawie szablonu
cp .env.example .env

# Wygeneruj wymagane sekrety
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Najważniejsze zmienne używane podczas programowania:

| Zmienna                | Domyślna wartość deweloperska | Opis                               |
| ---------------------- | ----------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                       | Port serwera                       |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`      | Bazowy adres URL interfejsu        |
| `JWT_SECRET`           | (wygeneruj powyżej)           | Sekret do podpisywania tokenów JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`                    | Hasło pierwszego logowania         |
| `APP_LOG_LEVEL`        | `info`                        | Poziom szczegółowości dzienników   |

### Ustawienia panelu

Panel udostępnia przełączniki interfejsu dla funkcji, które można również konfigurować za pomocą zmiennych środowiskowych:

| Lokalizacja ustawienia    | Przełącznik               | Opis                                           |
| ------------------------- | ------------------------- | ---------------------------------------------- |
| Ustawienia → Zaawansowane | Tryb debugowania          | Włącza dzienniki debugowania żądań (interfejs) |
| Ustawienia → Ogólne       | Widoczność paska bocznego | Pokazuje/ukrywa sekcje paska bocznego          |

Ustawienia te są przechowywane w bazie danych i zachowywane po ponownym uruchomieniu, zastępując domyślne wartości zmiennych środowiskowych, jeśli zostały ustawione.

### Uruchamianie lokalne

```bash
# Tryb programistyczny (automatyczne przeładowywanie)
npm run dev

# Kompilacja produkcyjna
npm run build    # next build → .build/next/, następnie assembleStandalone → dist/
npm run start

# Szybka kompilacja tylko backendu/API na potrzeby zmian wprowadzanych przez współtwórców
npm run build:contributor

# Kompilacja wydania (czysta ponowna kompilacja + znacznik HEAD — wymagana do wdrożenia)
npm run build:release   # rm -rf .build dist && build + zapisuje dist/BUILD_SHA

# Typowa konfiguracja portu
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Kompilacja dla współtwórców przeprowadza wyłącznie walidację kompilacji: nie tworzy samodzielnej
dystrybucji ani opcjonalnych natywnych zasobów pakietu. Użyj standardowej kompilacji produkcyjnej,
gdy musisz zweryfikować pakiet gotowy do dystrybucji.

### Układ wyników kompilacji

| Katalog   | Zawartość                                                                                 | Śledzony |
| --------- | ----------------------------------------------------------------------------------------- | -------- |
| `src/`    | Kod źródłowy aplikacji (TypeScript / TSX)                                                 | Tak      |
| `.build/` | Pliki pośrednie — wynik `next build` (ignorowany przez Git, `distDir = .build/next`)      | Nie      |
| `dist/`   | Pakiet gotowy do dystrybucji — tworzony przez `assembleStandalone` (ignorowany przez Git) | Nie      |

Potok kompilacji przebiega w jednym przejściu:

```
npm run build
  └─ next build → .build/next/standalone  (wynik Next.js)
  └─ assembleStandalone()                 (kopiuje wersję samodzielną + pliki statyczne + publiczne + zasoby natywne)
       └─ wynik: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatkowo najpierw czyści oba katalogi i zapisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) jako znacznik integralności wdrożenia.

`npm run build:contributor` korzysta z profilu kompilacji obejmującego wyłącznie backend. Podczas kompilacji tymczasowo zastępuje
pliki interfejsu panelu atrapami, zachowuje procedury obsługi tras API, a po kompilacji przywraca oryginalne pliki.
Użyj `npm run build` w przypadku zmian wpływających na interfejs panelu lub do pełnej
walidacji wydania; profil dla współtwórców nie zastępuje kompilacji wydania.

> **Uwaga dotycząca wdrażania na VPS:** katalog obrazu zdalnego `/usr/lib/node_modules/omniroute/app/`
> pozostaje bez zmian. Narzędzia wdrożeniowe synchronizują do niego zawartość katalogu `dist/` za pomocą rsync.
> Zmieniła się jedynie ścieżka wynikowa kompilacji w repozytorium (`app/` → `dist/`).

Domyślne adresy URL:

- **Panel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Przepływ pracy z Git

> ⚠️ **NIGDY nie wykonuj commitów bezpośrednio do `main`.** Zawsze używaj gałęzi funkcjonalnych.
>
> **Gałąź bazowa PR:** wybierz aktywną gałąź `release/vX.Y.Z` (nie `main`). Zobacz
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md), aby poznać model
> osobnej gałęzi dla każdego wydania oraz tworzenia tagu podczas publikacji.

```bash
# Utwórz gałąź od najnowszego commita aktywnej gałęzi wydania (przykład: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... wprowadź zmiany ...
git commit -m "feat: opisz swoją zmianę"
git push -u origin feat/your-feature-name
# Otwórz Pull Request z base = release/v3.8.49
```

### Nazewnictwo gałęzi

| Prefiks     | Przeznaczenie                |
| ----------- | ---------------------------- |
| `feat/`     | Nowe funkcje                 |
| `fix/`      | Poprawki błędów              |
| `refactor/` | Restrukturyzacja kodu        |
| `docs/`     | Zmiany w dokumentacji        |
| `test/`     | Dodawanie/poprawianie testów |
| `chore/`    | Narzędzia, CI, zależności    |

### Komunikaty commitów

Stosuj standard [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: dodaj wyłącznik awaryjny dla wywołań dostawców
fix: rozwiąż przypadek brzegowy walidacji sekretu JWT
docs: zaktualizuj SECURITY.md o ochronę danych PII
test: dodaj testy jednostkowe obserwowalności
refactor(db): skonsoliduj tabele limitów szybkości
```

Zakresy (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Uruchamianie testów

```bash
# Wszystkie testy (jednostkowe + vitest + ekosystemowe + e2e)
npm run test:all

# Pojedynczy plik testowy (natywny mechanizm uruchamiania testów Node.js — korzysta z niego większość testów)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tylko testy jednostkowe, na które wpływa Twoja zmiana (ten sam selektor TIA co w bramce CI, #8084)
npm run test:scoped            # zmiany w ostatnim commicie (lub w drzewie roboczym)
npm run test:scoped:staged     # tylko przygotowane zmiany — dobrze współpracuje z uruchomieniem przed commitem
npm run test:scoped:full       # najpierw przebuduj mapę grafu importów (po dodaniu/przeniesieniu plików)
# Kod wyjścia 1 + „uruchom pełny zestaw” oznacza, że zmienił się plik centralny (tsconfig, package.json, …)
# lub nieodwzorowany plik źródłowy — selektor działa bezpiecznie i nigdy nie pomija niczego po cichu.

# Vitest (serwer MCP, autoCombo, pamięć podręczna)
npm run test:vitest

# Testy E2E (wymagają Playwright)
npm run test:e2e

# Testy E2E klientów protokołów (transporty MCP, A2A)
npm run test:protocols:e2e

# Testy zgodności z ekosystemem
npm run test:ecosystem

# Bramka pokrycia: 60% instrukcji/wierszy/funkcji/gałęzi
npm run test:coverage
npm run coverage:report

# Lintowanie + sprawdzanie formatowania
npm run lint
npm run check

# Warunkowo uruchamiany test dymny kombinacji z rzeczywistymi usługami upstream (wymaga dostępu do VPS + środków u rzeczywistych dostawców)
# Korzysta z RZECZYWISTYCH dostawców — generuje niewielkie koszty. NIGDY nie jest uruchamiany w CI. Bez warunku jest prawidłowo pomijany.
# Wymaga: dostępu ssh root@192.168.0.15 (pobiera z VPS migawkę bazy danych tylko do odczytu).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Test dymny na żywo VPS fazy 3 — zwykłe skrypty Node ESM komunikujące się bezpośrednio z działającym serwerem .15.
# Wymaga: dostępu ssh root@192.168.0.15 (kombinacje są tworzone/usuwane przez SSH sqlite).
# Korzysta z RZECZYWISTYCH dostawców (niewielki koszt). Tworzy/usuwa tylko kombinacje __live_test__*. NIGDY nie jest uruchamiany w CI.
# REQUIRE_API_KEY=false na .15, więc klucz API nie jest potrzebny, ale respektuje COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, jeśli je ustawiono.
npm run test:combo:live:vps              # 7 scenariuszy HTTP (priorytet/cykliczny/ważony/koszt/fuzja/automatyczny + kondycja)
npm run test:combo:live:vps:failover     # dodaje rzeczywisty scenariusz przełączania awaryjnego między dostawcami (łącznie 8)
```

Uwagi dotyczące pokrycia:

- `npm run test:coverage` mierzy pokrycie kodu źródłowego przez główny zestaw testów jednostkowych, wyklucza `tests/**` i obejmuje `open-sse/**`
- Pull requesty muszą utrzymywać próg pokrycia na poziomie **60%+** instrukcji/wierszy/funkcji/gałęzi
- Jeśli PR zmienia kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/`, musi w tym samym PR dodawać lub aktualizować testy automatyczne
- `npm run coverage:report` wyświetla szczegółowy raport dla poszczególnych plików z ostatniego uruchomienia testów pokrycia
- `npm run test:coverage:legacy` zachowuje starszą metrykę na potrzeby porównań historycznych
- Zobacz `docs/ops/COVERAGE_PLAN.md`, aby poznać etapowy plan poprawy pokrycia

### Wymagania dotyczące Pull Requestów

Przed otwarciem PR skorzystaj z
[zalecanej ścieżki wnoszenia wkładu](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), aby uruchomić ukierunkowaną pętlę dla
wprowadzonych zmian. Za pełny zestaw testów jednostkowych (4 fragmenty CI), Vitest, bramkę pokrycia **60%+** oraz
kompilację produkcyjną odpowiada CI — uruchamianie ich lokalnie nie dostarcza żadnych dodatkowych informacji ponad to,
co i tak zapewnią kontrole PR, a na słabszych maszynach może przeciążyć hosta (#8084):

- Uruchom pliki testowe obejmujące Twoją zmianę: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Uruchom `npm run lint`
- Za każdym razem, gdy zmienia się kod produkcyjny, dodaj lub zaktualizuj testy automatyczne w tym samym PR
- Jeśli zmienił się kod produkcyjny, wymień zmienione lub dodane pliki testowe w opisie PR
- Sprawdź wynik SonarQube w PR, gdy sekrety projektu są skonfigurowane w CI

Aktualny stan testów: **122 pliki testów jednostkowych** obejmujące:

- Translatory dostawców i konwersję formatów
- Ograniczanie szybkości, wyłącznik awaryjny i odporność
- Semantyczną pamięć podręczną, idempotencję i śledzenie postępu
- Operacje na bazie danych i schemat (21 modułów DB)
- Przepływy OAuth i uwierzytelnianie
- Walidację punktów końcowych API (Zod v4)
- Narzędzia serwera MCP i wymuszanie zakresów
- Systemy Memory i Skills

---

## Styl kodu

- **ESLint** — uruchom `npm run lint` przed zatwierdzeniem zmian
- **Prettier** — automatyczne formatowanie za pomocą `lint-staged` podczas zatwierdzania zmian (2 spacje, średniki, podwójne cudzysłowy, szerokość 100 znaków, końcowe przecinki zgodne z es5)
- **TypeScript** — cały kod w `src/` używa `.ts`/`.tsx`; `open-sse/` używa `.ts`/`.js`; dokumentuj za pomocą TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint wymusza `no-eval`, `no-implied-eval`, `no-new-func`
- **Walidacja Zod** — używaj schematów Zod v4 do walidacji wszystkich danych wejściowych API
- **Nazewnictwo**: pliki = camelCase/kebab-case, komponenty = PascalCase, stałe = UPPER_SNAKE

### Obsługa błędów / puste bloki catch

Nigdy nie pozostawiaj bloku `catch` bez wyjaśnienia. Przypisz go do jednej z dwóch kategorii (stanowi to praktyczne zastosowanie
bezwzględnej zasady „nigdy nie ignoruj po cichu błędów w strumieniach SSE”):

- **Celowe (nasze własne czyszczenie/telemetria typu best-effort)** — błąd w tym miejscu jest oczekiwany i
  nieszkodliwy; dodaj jednowierszowy komentarz z uzasadnieniem, bez logowania (ta konwencja pozwala uniknąć
  szumu wynikającego z logowania każdego żądania).

  ```ts
  } catch {} // zamknięcie już zamkniętego kontrolera po rozłączeniu klienta jest oczekiwane
  ```

- **Należy logować (kod zewnętrzny/dostarczony przez wywołującego albo zignorowanie błędu zmienia przepływ sterowania)** — zachowaj
  blok catch (nigdy nie pozwalaj, aby przerwał strumień), ale wyemituj kontekstowy wpis `console.debug`/`warn`, aby
  błąd można było wykryć.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Przykłady zastosowania znajdują się w `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts`.

---

## Struktura projektu

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router Next.js 16
│   ├── (dashboard)/        # Strony panelu (23 sekcje)
│   ├── api/                # Trasy API (51 katalogów)
│   └── login/              # Strony uwierzytelniania (.tsx)
├── domain/                 # Silnik zasad (policyEngine, comboResolver, costRules itd.)
├── lib/                    # Podstawowa logika biznesowa (.ts)
│   ├── a2a/                # Serwer protokołu Agent-to-Agent v0.3
│   ├── acp/                # Rejestr Agent Communication Protocol
│   ├── compliance/         # Silnik zasad zgodności
│   ├── db/                 # Moduły domenowe SQLite + 130 migracji
│   ├── memory/             # Trwała pamięć konwersacyjna
│   ├── oauth/              # Dostawcy, usługi i narzędzia OAuth
│   ├── skills/             # Rozszerzalny framework umiejętności
│   ├── usage/              # Śledzenie użycia i obliczanie kosztów
│   └── localDb.ts          # Wyłącznie warstwa ponownego eksportu — nigdy nie dodawaj tutaj logiki
├── middleware/              # Oprogramowanie pośredniczące żądań (promptInjectionGuard)
├── mitm/                   # Proxy MITM (certyfikaty, DNS, routing docelowy)
├── shared/
│   ├── components/         # Komponenty React (.tsx)
│   ├── constants/          # Definicje dostawców (329), zakresy MCP, 19 strategii routingu
│   ├── utils/              # Wyłącznik obwodu, sanityzator, narzędzia uwierzytelniania
│   └── validation/         # Schematy Zod v4
└── sse/                    # Potok proxy SSE

open-sse/                   # Przestrzeń robocza @omniroute/open-sse
├── executors/              # 89 modułów implementacji wykonawców
├── handlers/               # 11 procedur obsługi żądań (czat, odpowiedzi, osadzenia, obrazy itd.)
├── mcp-server/             # Serwer MCP (110 unikalnych narzędzi, 3 transporty, 33 zakresy)
├── services/               # 178 usług najwyższego poziomu (combo, autoCombo, rateLimitManager itd.)
├── translator/             # Translatory formatów (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformator Responses API
└── utils/                  # 22 moduły narzędziowe (strumień, TLS, proxy, logowanie)

electron/                   # Wieloplatformowa aplikacja komputerowa Electron

tests/
├── unit/                   # Mechanizm uruchamiania testów Node.js (1 574 pliki testowe)
├── integration/            # Testy integracyjne
├── e2e/                    # Testy Playwright
├── security/               # Testy bezpieczeństwa
├── translator/             # Testy dotyczące translatora
└── load/                   # Testy obciążeniowe

docs/
├── adr/                     # Rejestry decyzji architektonicznych
├── architecture/            # Architektura i odporność systemu
├── comparison/              # OmniRoute w porównaniu z alternatywami
├── compression/             # Przewodniki i reguły kompresji
├── dev/                     # Przewodniki programistyczne
├── diagrams/                # Diagramy architektury
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Podręcznik użytkownika, Docker, konfiguracja, rozwiązywanie problemów
├── i18n/                    # Międzynarodowe tłumaczenia README
├── marketing/               # Materiały marketingowe
├── ops/                     # Wdrażanie, proxy, pokrycie, wydania
├── providers/               # Dokumentacja dotycząca dostawców
├── reference/               # Dokumentacja API, zmienne środowiskowe, narzędzia CLI, bezpłatne plany
├── releases/                # Informacje o wydaniach
├── routing/                 # Silnik automatycznego łączenia, odtwarzanie rozumowania
├── screenshots/             # Zrzuty ekranu panelu
├── security/                # Mechanizmy ochronne, zgodność, ukrywanie, tokeny
└── specs/                   # Specyfikacje projektowe
```

---

## Dodawanie nowego dostawcy

### Krok 1: Zarejestruj stałe dostawcy

Dodaj je do `src/shared/constants/providers.ts` — są walidowane przez Zod podczas ładowania modułu.

### Krok 2: Dodaj executor (jeśli wymagana jest niestandardowa logika)

Utwórz executor w `open-sse/executors/your-provider.ts`, rozszerzający bazowy executor.

### Krok 3: Dodaj translator (jeśli format jest niezgodny z OpenAI)

Utwórz translatory żądań/odpowiedzi w `open-sse/translator/`.

### Krok 4: Dodaj konfigurację OAuth (jeśli dostawca korzysta z OAuth)

Dodaj dane uwierzytelniające OAuth w `src/lib/oauth/constants/oauth.ts` oraz usługę w `src/lib/oauth/services/`.

Jeśli dostawca nadrzędny rozpowszechnia publiczny OAuth client_id/secret lub klucz Firebase Web API w swoim publicznym CLI / pakiecie przeglądarkowym, **nie** osadzaj go jako literału ciągu znaków. Użyj `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` i dodaj zamaskowany wpis bajtowy do `EMBEDDED_DEFAULTS`. Pełny obowiązkowy proces opisano w [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

W handlerach/executorach komunikaty o błędach przekazywane klientowi muszą przechodzić przez `buildErrorBody()` / `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — nigdy nie umieszczaj nieprzetworzonego `err.stack` ani `err.message` w treści Response. Zobacz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Krok 5: Zarejestruj modele

Dodaj definicje modeli w `open-sse/config/providerRegistry.ts`.

### Krok 6: Dodaj testy

Napisz testy jednostkowe w `tests/unit/`, obejmujące co najmniej:

- Rejestrację dostawcy
- Translację żądań/odpowiedzi
- Obsługę błędów

---

## Lista kontrolna Pull Requesta

- [ ] Testy przechodzą pomyślnie (`npm test`)
- [ ] Lintowanie przechodzi pomyślnie (`npm run lint`)
- [ ] Kompilacja kończy się powodzeniem (`npm run build`)
- [ ] Dodano typy TypeScript dla nowych publicznych funkcji i interfejsów
- [ ] Brak zakodowanych na stałe sekretów lub wartości zapasowych
- [ ] Publiczne dane uwierzytelniające usług nadrzędnych osadzono za pomocą `resolvePublicCred()` (zobacz [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nigdy jako literały
- [ ] Odpowiedzi błędów są przetwarzane przez `buildErrorBody()` / `sanitizeErrorMessage()` — brak surowych śladów stosu w treści odpowiedzi (zobacz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Polecenia powłoki (`exec` / `spawn`) przekazują wartości czasu wykonywania przez `env`, a nie przez interpolację ciągów znaków
- [ ] Wszystkie dane wejściowe są walidowane za pomocą schematów Zod
- [ ] Dla zmian widocznych dla użytkowników dodano **fragment** dziennika zmian w `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (zobacz [`changelog.d/README.md`](./changelog.d/README.md)) — **nie** edytuj bezpośrednio pliku `CHANGELOG.md`; fragmenty są agregowane podczas wydania i nigdy nie powodują konfliktów między Pull Requestami
- [ ] Dokumentacja została zaktualizowana (jeśli dotyczy)
- [ ] Nie utworzono nowych alertów CodeQL / Secret-Scanning lub każdy z nich został odrzucony z technicznym uzasadnieniem odwołującym się do odpowiedniego dokumentu w `docs/security/`
- [ ] Trasy uruchamiające procesy podrzędne (`/api/mcp/`, `/api/cli-tools/runtime/`) sklasyfikowano jako `isLocalOnlyPath()` w `src/server/authz/routeGuard.ts` — zobacz [Twarda reguła nr 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Brak stopek `Co-authored-by` dotyczących AI/botów w komunikatach commitów (Twarda reguła nr 16) — współpracownicy będący ludźmi, których praca została ponownie wykorzystana, są wymieniani za pomocą standardowych stopek `Co-authored-by: Name <email>`

---

## Wydawanie wersji

Wydania są zarządzane za pomocą przepływu pracy `/generate-release`. Po utworzeniu nowego wydania GitHub pakiet jest **automatycznie publikowany w npm** za pośrednictwem GitHub Actions.

W przypadku wdrożeń na VPS użyj `npm run build:release` (zamiast `npm run build`) — polecenie wykonuje czystą
przebudowę, przygotowuje pakiet w katalogu `dist/` i zapisuje plik kontrolny `dist/BUILD_SHA`.
Następnie użyj umiejętności `/deploy-vps-*-cc`, które synchronizują katalog `dist/` zdalnie za pomocą rsync do katalogu `app/`.

---

## Uzyskiwanie pomocy

- **Architektura**: Zobacz [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Dokumentacja API**: Zobacz [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentacja bezpieczeństwa**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumentacja operacyjna**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Zgłoszenia**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
