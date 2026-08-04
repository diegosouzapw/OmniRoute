# Zasady bezpieczeństwa i porządku dla asystentów AI

> **Zakres:** reguły dla agentów opartych na Gemini. Dla Claude Code zobacz `CLAUDE.md`. Dla innych asystentów AI zobacz `AGENTS.md`.

## 1. Umieszczanie plików i organizacja

- **Pliki testowe**: WSZYSTKIE testy jednostkowe, integracyjne, ekosystemowe lub pliki Vitest MUSZĄ być umieszczane wyłącznie w katalogu `tests/` (np. `tests/unit/`, `tests/integration/`). NIGDY nie twórz plików testowych w katalogu głównym projektu (`/`).
- **Skrypty i narzędzia pomocnicze**: WSZYSTKIE skrypty konserwacyjne, debugujące, generujące lub eksperymentalne (`.cjs`, `.mjs`, `.js`, `.ts`) MUSZĄ być umieszczane wyłącznie w jednym z podkatalogów `scripts/` (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`). Kod jednorazowy lub eksperymentalny trafia do `scripts/ad-hoc/`. NIGDY nie wrzucaj luźnych skryptów do katalogu głównego projektu (`/`) ani do katalogu najwyższego poziomu `scripts/`.

**Katalog główny projektu MOŻE ZAWIERAĆ WYŁĄCZNIE:**

- Pliki konfiguracyjne (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Pliki zależności (`package.json`, `package-lock.json`)
- Pliki dokumentacji (`README.md`, `CHANGELOG.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`, `Tuto_Qdrant.md`)
- Pliki CI/CD oraz definicje ignorowania (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

Tworząc _jakiekolwiek_ testy walidacyjne lub jednorazowe skrypty logiczne, domyślnie używaj katalogów `scripts/ad-hoc/` lub `tests/unit/` w zależności od celu. Nie zaśmiecaj kontekstu katalogu głównego `/`.

## 2. Twarde reguły (odzwierciedlenie `CLAUDE.md`)

1. **Nigdy nie commituj sekretów ani poświadczeń.** Używaj `.env` (generowanego automatycznie z `.env.example`) lub sejfu. Hasła, sekrety OAuth, klucze API oraz wartości Cookie nigdy nie mogą pojawiać się w commitowanych plikach.
2. **Nigdy nie dodawaj logiki do `src/lib/localDb.ts`.** To wyłącznie barrel re-eksportów.
3. **Nigdy nie używaj `eval()`, `new Function()` ani żadnej formy implied eval.** ESLint tego egzekwuje.
4. **Nigdy nie commituj bezpośrednio do `main`.** Używaj gałęzi `feat/`, `fix/`, `refactor/`, `docs/`, `test/` lub `chore/`.
5. **Nigdy nie pisz surowego SQL w trasach** — zawsze przechodź przez moduły domenowe `src/lib/db/`.
6. **Nigdy nie połykaj cicho błędów w strumieniach SSE** — propaguj je albo czysto przerwij strumień.
7. **Nigdy nie omijaj hooków Husky** (`--no-verify`, `--no-gpg-sign`) bez wyraźnej zgody operatora.
8. **Zawsze waliduj dane wejściowe schematami Zod** z `src/shared/validation/schemas.ts`.
9. **Zawsze dołączaj testy przy zmianach w kodzie produkcyjnym** (`src/`, `open-sse/`, `electron/`, `bin/`).
10. **Pokrycie musi pozostać** ≥ 60 % statements / lines / functions / branches — oficjalna bramka CI (`npm run test:coverage`). Bazowa wartość ratchet w `quality-baseline.json` może zamrozić wyższy próg; nigdy go nie obniżaj.

## 3. Nawigacja po bazie kodu

| Zadanie                     | Przeczytaj najpierw                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zrozumienie bazy kodu       | `docs/architecture/REPOSITORY_MAP.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Przegląd architektury       | `docs/architecture/ARCHITECTURE.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Dokumentacja inżynierska    | `docs/architecture/CODEBASE_DOCUMENTATION.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Dodanie funkcji             | `CONTRIBUTING.md` + odpowiadający `docs/<area>.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Pogłębione analizy obszarów | `docs/frameworks/SKILLS.md`, `docs/frameworks/MEMORY.md`, `docs/frameworks/EVALS.md`, `docs/security/GUARDRAILS.md`, `docs/security/COMPLIANCE.md`, `docs/frameworks/CLOUD_AGENT.md`, `docs/frameworks/MCP-SERVER.md`, `docs/frameworks/A2A-SERVER.md`, `docs/architecture/AUTHZ_GUIDE.md`, `docs/architecture/RESILIENCE_GUIDE.md`, `docs/routing/AUTO-COMBO.md`, `docs/frameworks/WEBHOOKS.md`, `docs/routing/REASONING_REPLAY.md`, `docs/security/STEALTH_GUIDE.md`, `docs/ops/TUNNELS_GUIDE.md`, `docs/guides/ELECTRON_GUIDE.md`, `docs/reference/PROVIDER_REFERENCE.md` |
| Przebieg wydania            | `docs/ops/RELEASE_CHECKLIST.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## 4. Dostęp do lokalnego środowiska deweloperskiego

Dashboard jest dostępny pod wybranym przez operatora adresem URL/portem (domyślnie `http://localhost:20128`). Poświadczenia są specyficzne dla operatora:

- **Początkowe hasło administratora** jest odczytywane ze zmiennej środowiskowej `INITIAL_PASSWORD` przy pierwszej instalacji (domyślnie `CHANGEME` w `.env.example`; zmień je natychmiast po pierwszym logowaniu).
- **Lokalne VPS / współdzielone środowiska deweloperskie**: zapytaj operatora o URL i aktualne poświadczenia — znajdują się w jego osobistym sejfie, NIE w tym repozytorium.

> Wszelkie poświadczenia zauważone w poprzedniej wersji tego pliku były wartościami demonstracyjnymi spoza produkcji; traktuj je jako skompromitowane i nie używaj ich ponownie.
