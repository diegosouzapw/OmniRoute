# Release Checklist (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Ostatnia aktualizacja:** 2026-08-28 — v3.8.51
> Usprawniony proces wydawania, który wykorzystuje umiejętności Claude Code do automatyzacji.
>
> **Utrzymuj kolejkę/gałąź w stanie green między wydaniami:** zobacz [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodzina `/green-prs` + `npm run check:release-green` + `/babysit` + zadanie nocne). Okresowe uruchamianie
> tego procesu — a zwłaszcza **przed** wykonaniem tej listy kontrolnej — sprawia, że PR wydania rozpoczyna się w stanie green.

## TL;DR

```bash
# 1. Zwiększ wersję + wygeneruj CHANGELOG (umiejętność)
/version-bump-cc patch    # albo minor/major

# 2. Uruchom lokalnie bramkę jakości
npm run check              # lintowanie + testy
npm run test:coverage      # pełna bramka pokrycia (60/60/60/60)

# 3. Zbuduj i wykonaj testy dymne
npm run build
npm run test:e2e           # opcjonalne, ale zalecane

# 4. Wygeneruj wydanie (umiejętność)
/generate-release-cc

# 5. Wdróż (umiejętność)
/deploy-vps-both-cc        # albo akamai-cc / local-cc

# 6. Zbierz dowody wydania (umiejętność)
/capture-release-evidences-cc
```

## npm Trusted Publishing (domyślnie od v3.8.51) — publikowanie etapowe na żądanie, bezpośrednie jako rozwiązanie awaryjne

`npm-publish.yml` domyślnie publikuje za pośrednictwem **npm Trusted Publishing (OIDC)**:
zadanie `stage-npm` (hostowane przez GitHub) wymienia token id-token GitHuba na krótkotrwałe
poświadczenie npm dla danego uruchomienia — bez długoterminowego tokenu npm w sekretach repozytorium,
bez monitu 2FA, z dołączonym poświadczeniem pochodzenia.
Jest to obejście dopuszczone obecnie przez npm, gdy tokeny pomijające 2FA są wycofywane;
przywraca ono w pełni automatyczny proces, który projekt miał do wersji v3.8.48, zachowując
gwarancję WS1.3 (wyciek tokenu nie umożliwia samodzielnego opublikowania — token nie istnieje).

**Konfiguracja jednorazowa (właściciel):** npmjs.com → pakiet `omniroute` → Settings → _Trusted
Publisher_ → GitHub: właściciel `diegosouzapw`, repozytorium `OmniRoute`, przepływ pracy `npm-publish.yml`
(środowisko: brak). Dopóki taka konfiguracja nie istnieje, automatyczny krok kończy się błędem `ENEEDAUTH`:
uruchom ponownie z `publish_mode=staged` (poniżej) albo `direct`.

### Publikowanie etapowe (na żądanie — `publish_mode=staged`)

Przepływ pracy npm-publish nie publikuje już bezpośrednio: uruchamia spakowany tarball
(`check:pack-boot`), a następnie wykonuje `npm stage publish` — dokładnie te same bajty są umieszczane
w rejestrze, ale **nie można ich zainstalować**, dopóki właściciel ich nie zatwierdzi. Bramka 2FA wymagająca
interwencji człowieka została przeniesiona na etap PO weryfikacji, a nie przed nią.

**Proces właściciela po pomyślnym zakończeniu przepływu pracy:**

1. `npm stage list omniroute` — znajdź identyfikator etapu (jest on również wyświetlany w podsumowaniu przepływu pracy).
2. Zweryfikuj przygotowane bajty (zalecane): `npm stage download <id>`, następnie zainstaluj
   pobrany tarball w tymczasowym prefiksie i uruchom go (`npm run check:pack-boot` automatyzuje
   w CI tę samą weryfikację pakowanie→instalacja→uruchomienie).
3. `npm stage approve <id>` — monit 2FA JEST publikacją. `npm stage reject <id>` odrzuca etap.
4. Zabezpieczenie po publikacji: weryfikator po publikacji (WS1.4 planu v3.8.49) instaluje
   opublikowaną wersję z publicznego rejestru w czystym kontenerze i ją uruchamia.

**Awaryjne rozwiązanie:** `workflow_dispatch` z `publish_mode=direct` przywraca
starszy, natychmiastowy proces `npm publish` (używaj tylko wtedy, gdy samo publikowanie etapowe działa nieprawidłowo; zapisz przyczynę).

**Jednorazowe utwardzenie zabezpieczeń (właściciel, npmjs.com):** skonfiguruj Trusted Publisher dla
`omniroute` w trybie wyłącznie etapowym, aby wyciek długoterminowego tokenu nie umożliwiał bezpośredniego
wykonania `npm publish` z dowolnego miejsca — CI może jedynie przygotować etap; tylko 2FA właściciela może wydać pakiet.

**Procedura obsługi uszkodzonego artefaktu (bez zmian):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
jako domyślna reakcja (kilka minut, działanie odwracalne); `npm unpublish` tylko w 72-godzinnym oknie,
gdy nie ma pakietów zależnych, i nigdy jako pierwszy krok. Docker: nigdy nie nadpisuj tagu wersji —
wycofanie wydania polega na ponownym wskazaniu przez `latest` ostatniego poprawnego skrótu.

**Docker Hub `latest` (wymagane przy każdej publikacji stabilnej wersji SemVer):**
przepływ pracy `docker-publish` musi oznaczyć **zarówno** `X.Y.Z`, jak i — gdy
`should-promote-latest.sh` potwierdzi, że jest to najwyższa stabilna wersja SemVer — `:latest`
przy użyciu **tego samego skrótu**. Po wykonaniu zadania: skrót `latest` w Hubie jest równy skrótowi
nowej wersji SemVer, a `last_updated` został zaktualizowany. Nie pozostawiaj `:latest` wskazującego
starszy obraz, gdy informacje o wydaniu opisują poprawki dostępne wyłącznie w git. Szybkie konfiguracje
Compose używają `:latest`; GitOps powinien nadal przypinać `X.Y.Z`. Zobacz
[Kanały wydań Dockera](../guides/DOCKER_GUIDE.md#release-channels) i #10317.

## Szybka ścieżka poprawek awaryjnych (etykieta `hotfix`)

PR z etykietą `hotfix` pomija rozbudowaną macierz CI (9-częściowe E2E, mechanizm zapadkowy pokrycia,
quality-gate, quality-extended) i zachowuje szybkie mechanizmy kontrolne o wysokiej wartości diagnostycznej: kompilację,
części testów jednostkowych, testy integracyjne, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
oraz test uruchomienia z archiwum tar (`check:pack-boot`). Cel: zielony status w ≤15 min zamiast ~33 min.

**Zasady dostępu — wymagane są wszystkie cztery warunki (wzorowane na awaryjnych ścieżkach Chromium/VS Code/Node):**

1. **Waga problemu**: środowisko produkcyjne nie działa — opublikowany artefakt ulega awarii podczas uruchamiania /
   poprawka bezpieczeństwa / problem dotyczy każdego użytkownika wydania. „Ważne” nie oznacza „niedziałające”.
2. **Uprawnienia**: tylko właściciel repozytorium nadaje etykietę `hotfix`. Etykieta JEST
   zatwierdzeniem — nigdy nie należy nadawać jej samodzielnie w PR kampanii.
3. **Dowody**: opis PR zawiera odnośnik do poprzedniego, w pełni zielonego uruchomienia rozbudowanego zestawu testów (zestawu, który
   pomijane zadania ponownie by zweryfikowały) oraz do testu samej poprawki, który najpierw kończył się niepowodzeniem, a następnie powodzeniem.
4. **Zakres**: wyłącznie cherry-pick — minimalna poprawka, bez refaktoryzacji ani dodatkowych zmian.

Pomijany zakres pokrycia/mechanizmu zapadkowego jest ponownie weryfikowany przez następne pełne uruchomienie na
gałęzi wydania (ciągły zielony status wydania) — ścieżka pomija OCZEKIWANIE, nigdy walidację.
Zmiany obejmujące wyłącznie testy (wszystkie pliki w `tests/`, żadne w `tests/e2e/`) automatycznie pomijają macierz
E2E, bez żadnej etykiety.

## Szczegółowa lista kontrolna

### Przed wydaniem

- [ ] Wszystkie PR-y przeznaczone do tego wydania są scalone z `release/vX.Y.0`
- [ ] Wszystkie otwarte elementy Linear/zgłoszenia dla tej wersji są zamknięte lub przeniesione do następnego kamienia milowego
- [ ] CI ma zielony status na gałęzi `release/vX.Y.0`
- [ ] Brak znaczników `TODO(release)` w kodzie: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Bazowy obraz Docker jest aktualny (obecnie `node:24.15.0-trixie-slim`)

### Wersja i dziennik zmian

- [ ] Uruchom `/version-bump-cc <patch|minor|major>` (umiejętność Claude Code)
  - Aktualizuje wersję w `package.json`, `electron/package.json`
  - Ponownie generuje `CHANGELOG.md` na podstawie commitów git od ostatniego tagu
  - Aktualizuje plakietki w README.md
- [ ] Ręcznie przejrzyj CHANGELOG.md i w razie potrzeby popraw komunikaty commitów
- [ ] Upewnij się, że najnowsza sekcja semver w `CHANGELOG.md` odpowiada wersji w `package.json`
- [ ] Zachowaj `## [Unreleased]` jako pierwszą sekcję dziennika zmian dla przyszłych prac
- [ ] Zaktualizuj `docs/openapi.yaml` → `info.version` musi odpowiadać wersji w `package.json`

### Jakość kodu

- [ ] `npm run lint` — 0 błędów (ostrzeżenia istniały wcześniej)
- [ ] `npm run typecheck:core` — bez błędów
- [ ] `npm run typecheck:noimplicit:core` — bez błędów (tryb ścisły)
- [ ] `npm run check:cycles` — brak zależności cyklicznych
- [ ] `npm run check:any-budget:t11` — w granicach budżetu
- [ ] `npm run check:route-validation:t06` — bez błędów
- [ ] `npm run check:node-runtime` — spełniono minimalne wymagania obsługiwanego środowiska uruchomieniowego (`>=22.22.2 <23`, `>=24.0.0 <27`, zgodnie z `SUPPORTED_NODE_RANGE` w `src/shared/utils/nodeRuntimeSupport.ts`; spójne z `engines` w `package.json`)

### Testowanie

- [ ] `npm run test:unit` — zakończone powodzeniem
- [ ] `npm run test:vitest` — zakończone powodzeniem (serwer MCP, autoCombo, pamięć podręczna)
- [ ] `npm run test:coverage` — spełniony próg 60/60/60/60 (instrukcje/wiersze/funkcje/gałęzie)
- [ ] `npm run test:integration` — zakończone powodzeniem (jeśli zmiany dotyczą bazy danych / procedur obsługi)
- [ ] `npm run test:combo:matrix` — zakończone powodzeniem (macierz strategii combo: deterministycznie potwierdza decyzje wyboru wszystkich 19 publicznych strategii routingu; uruchamiaj przy zmianach dotyczących routingu combo, rozstrzygania strategii lub logiki mechanizmu rezerwowego)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcjonalne/ręczne** (test dymny z kontrolowanym dostępem do rzeczywistych usług nadrzędnych; pobiera migawkę bazy danych tylko do odczytu z VPS `root@192.168.0.15`; korzysta z rzeczywistych dostawców i zużywa środki; nigdy nie jest uruchamiany w CI; jest prawidłowo pomijany bez odpowiedniego zezwolenia)
- [ ] `npm run test:combo:live:vps` — **opcjonalne/ręczne** (test dymny na żywo VPS fazy 3: 7 scenariuszy HTTP względem działającego serwera `.15` przy użyciu zwykłego Node ESM; wymaga `ssh root@192.168.0.15`; tworzy/usuwa wyłącznie combo `__live_test__*`; korzysta z rzeczywistych dostawców; nigdy nie jest uruchamiany w CI)
- [ ] `npm run test:e2e` — zakończone powodzeniem (zmiany interfejsu użytkownika)
- [ ] `npm run test:protocols:e2e` — zakończone powodzeniem (zmiany MCP/A2A)
- [ ] `npm run test:ecosystem` — zakończone powodzeniem

### Hooki (zweryfikowane przez Husky)

Hooki Husky znajdują się w `.husky/` i są uruchamiane automatycznie podczas operacji git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** szybkie, deterministyczne mechanizmy kontrolne — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktywowane 2026-06-13). Celowo pomija `test:unit` (wolne; objęte zadaniem CI `test-unit`).
  - Uruchom `npm run test:unit` ręcznie przed wypchnięciem gałęzi wydań.

Jeśli hook zakończy się niepowodzeniem: napraw przyczynę problemu, nie pomijaj go za pomocą `--no-verify`.

### Conventional Commits

Wszystkie commity przeznaczone do wydania muszą mieć format `type(scope): subject`.

**Dozwolone typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Dozwolone zakresy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Zmiany niezgodne wstecznie: dodaj stopkę `BREAKING CHANGE:` lub `!` po zakresie (np. `feat(api)!: drop /v0`).

### Dokumentacja

- [ ] `npm run check:docs-sync` przechodzi pomyślnie (uruchamiane automatycznie przez pre-commit)
- [ ] `npm run check:docs-all` przechodzi pomyślnie (zbiorcze sprawdzenie: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` kończy działanie z kodem 0 — kontrakt zmiennych środowiskowych między kodem ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` pozostaje spójny
- [ ] `npm run check:doc-links` kończy działanie z kodem 0 — brak uszkodzonych wewnętrznych odwołań Markdown po zmianie struktury
- [ ] Sprawdzono `docs/architecture/ARCHITECTURE.md` pod kątem rozbieżności dotyczących pamięci masowej/środowiska uruchomieniowego
- [ ] Sprawdzono `docs/guides/TROUBLESHOOTING.md` pod kątem rozbieżności dotyczących zmiennych środowiskowych i działania
- [ ] Jeśli zmieniono `.env.example`: zaktualizowano `docs/reference/ENVIRONMENT.md`
- [ ] Jeśli nowa funkcja ma interfejs użytkownika: wspomniano o niej w `docs/guides/USER_GUIDE.md`
- [ ] Jeśli nowa funkcja ma API: zaktualizowano `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Jeśli nowa funkcja jest modułem: istnieje dedykowany plik `docs/<MODULE>.md`
- [ ] Jeśli zmiana narusza zgodność wsteczną: `docs/guides/TROUBLESHOOTING.md` zawiera notę migracyjną

### i18n

- [ ] `npm run i18n:check` kończy działanie z kodem 0 — stan tłumaczeń (`.i18n-state.json`) jest zsynchronizowany z dokumentacją źródłową (brak rozbieżnych źródeł w trybie ścisłym; ostrzeżenie w trybie ostrzegawczym jest dopuszczalne w przypadku poprawek dokumentacji w ostatniej chwili, ale przed utworzeniem tagu wynik powinien wynosić 0)
- [ ] `npm run i18n:check-ui-coverage` kończy działanie z kodem 0 — każda lokalizacja interfejsu użytkownika osiąga lub przekracza minimalny próg pokrycia wynoszący 80%
- [ ] `npm run i18n:sync-ui:dry` zgłasza 0 brakujących kluczy we wszystkich 42 lokalizacjach
- [ ] Jeśli zmieniła się źródłowa dokumentacja w języku angielskim, przed utworzeniem tagu uruchom `npm run i18n:run` (wymaga `OMNIROUTE_TRANSLATION_API_KEY` w `.env`)
- [ ] Drobne zmiany w tłumaczeniach można odłożyć do następnego wydania (należy je śledzić w CHANGELOG)

### Migracje bazy danych

- [ ] Jeśli katalog `src/lib/db/migrations/` zawiera nowe pliki:
  - [ ] Każda migracja jest idempotentna (`CREATE TABLE IF NOT EXISTS` itd.)
  - [ ] Migracje są opakowane w transakcje
  - [ ] Numeracja jest poprawna (brak luk w sekwencji)
- [ ] Test na czystej instalacji: usuń `~/.omniroute/omniroute.db` i uruchom `npm run dev`
- [ ] Test na istniejącej instalacji: utwórz kopię zapasową bazy danych, uruchom migrację i zweryfikuj schemat
- [ ] Pliki WAL (`-wal`, `-shm`) są prawidłowo obsługiwane, jeśli migracja ponownie zapisuje tabele

### Katalog dostawców (walidowany przez Zod)

- [ ] Schemat Zod w `src/shared/constants/providers.ts` jest prawidłowy podczas ładowania
  - [ ] Wszyscy dostawcy mają wymagane pola (`id`, `label`, `kind` itd.)
  - [ ] Dla nowych bezpłatnych dostawców podano `freeNote`
  - [ ] Dostawcy OAuth mają `oauthConfig` zarejestrowane w `src/lib/oauth/constants/oauth.ts`
- [ ] Jeśli dodano nowego dostawcę: odpowiedni executor znajduje się w `open-sse/executors/`
- [ ] Jeśli format nie jest zgodny z OpenAI: translator znajduje się w `open-sse/translator/`
- [ ] Modele są zarejestrowane w `open-sse/config/providerRegistry.ts`
- [ ] Testy jednostkowe w `tests/unit/` obejmują klasyfikację dostawców i routing

### Aplikacja desktopowa (Electron)

Jeśli zmieniono `electron/`:

- [ ] `npm run electron:smoke:packaged` przechodzi pomyślnie
- [ ] Kompilacje przetestowano dla co najmniej jednego z wariantów `:win`, `:mac`, `:linux`
- [ ] Certyfikaty podpisywania kodu nie wygasły (jeśli używane jest podpisywanie)
- [ ] Wersja w `electron/package.json` jest zgodna z głównym plikiem `package.json`
- [ ] Wskaźnik kanału automatycznych aktualizacji został zaktualizowany w przypadku publikowania w kanale `stable`

### Układ kompilacji

Repozytorium używa trzech odrębnych katalogów wyjściowych — nigdy ich nie mieszaj:

| Katalog   | Przeznaczenie                                                          | Śledzony?         |
| --------- | ---------------------------------------------------------------------- | ----------------- |
| `src/`    | Kod źródłowy aplikacji (TypeScript / TSX)                              | Tak               |
| `.build/` | Pliki pośrednie kompilacji — dane wyjściowe `next build` (`distDir`)   | Nie (w gitignore) |
| `dist/`   | Pakiet npm gotowy do dystrybucji — składany przez `assembleStandalone` | Nie (w gitignore) |

> **Uwaga dla operatora:** katalog obrazu na zdalnym VPS nadal znajduje się w `/usr/lib/node_modules/omniroute/app/`.
> Zmienił się tylko wynik kompilacji **wewnątrz repozytorium** (`app/` → `dist/`). Mechanizmy wdrażania synchronizują
> zawartość `dist/` przez rsync ze zdalnym katalogiem `app/` — nie są wymagane żadne zmiany ścieżek na VPS.

**Przepływ pojedynczej kompilacji:**

```
npm run build:release
  └─ rm -rf .build dist          (czyszczenie)
  └─ next build → .build/next/   (pliki pośrednie)
  └─ assembleStandalone          (kopiuje standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (wartownik HEAD)
```

NIE uruchamiaj `npm run build`, a następnie osobno `npm run build:cli` na potrzeby wdrożenia — użyj
`npm run build:release`, które wykonuje czystą, ponowną kompilację i tworzy wartownik za pomocą jednego polecenia.

### Walidacja artefaktów

- [ ] `npm run build:release` kończy się powodzeniem, a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` nie zgłasza problemów — brak `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani innych lokalnych pozostałości
- [ ] Po kompilacji istnieje `dist/server.js`
- [ ] Opcjonalny lokalny test dymny spakowanego środowiska uruchomieniowego: `npm run dev:candidate -- validate` po wykonaniu `npm run dev:candidate -- build` uruchamia spakowany archiwum tar w izolowanym `DATA_DIR` i sprawdza `/api/health` + `/v1/models` (zobacz [Zalecany proces wnoszenia zmian](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Tagowanie i wydanie

- [ ] Uruchom `/generate-release-cc` (mechanizm Claude Code):
  - Tworzy tag `vX.Y.Z`
  - Wypycha tag i gałąź
  - Tworzy wydanie GitHub z treścią changelogu
  - Dołącza instalatory Electron (jeśli zostały zbudowane)
- [ ] Lub wykonaj czynności ręcznie:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Wdrożenie

Mechanizmy wdrażania używają lekkiego przepływu rsync — bez `npm pack` i bez `npm i -g`:

- [ ] Użyj skilla wdrożeniowego odpowiadającego środowisku docelowemu:
  - `/deploy-vps-local-cc` — lokalny VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Przed wdrożeniem potwierdź, że `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Kompilacja musi zostać uruchomiona w miejscu, w którym `node_modules` jest rzeczywistym katalogiem (główna kopia robocza lub worktree, w którym wykonano `npm ci` — NIE worktree z dowiązaniem symbolicznym)
- [ ] Przeprowadź test dymny wdrożonej instancji:
  - Otwórz `/dashboard/health` → sprawdź, czy ciąg wersji odpowiada wydaniu
  - Wykonaj żądanie `/v1/chat/completions` względem znanego dostawcy
  - Sprawdź, czy `/api/monitoring/health` zwraca wyłączniki obwodu w stanie `CLOSED`
  - Potwierdź, że transporty MCP odpowiadają (`/mcp` HTTP, `/mcp-sse` SSE)

### Po wydaniu

- [ ] Uruchom `/capture-release-evidences-cc` (skill Claude Code)
  - Rejestruje zrzuty ekranu/nagrania nowych funkcji w formacie WebP
  - Dołącza je do informacji o wydaniu / wpisu na blogu
- [ ] Zaktualizuj GitHub Discussions / Discord, publikując ogłoszenie o wydaniu
- [ ] Otwórz kamień milowy dla następnej wersji
- [ ] Jeśli wydanie jest krytyczne: przypnij dyskusję lub opublikuj wpis w `news.json`, aby wyświetlić baner w aplikacji

### Warunek uruchomienia publicznego Radaru

Ogłoszenie Radaru zostało celowo zatwierdzone z ustawieniem `active: false`. Aktywacja jest osobną
zmianą wykonywaną po udokumentowaniu każdego z poniższych punktów:

- [ ] Wszystkie powiązane PR-y Radaru zostały scalone, a CI dla końcowej wersji wydania zakończyło się powodzeniem
- [ ] Wdróż i przetestuj dymnie trasy OSS Radaru, pozostawiając `RADAR_ENABLED` domyślnie wyłączone
- [ ] Przetestuj dymnie `GET /planos`, `/termos`, `/privacidade` oraz `/reembolso` na wskazanym hoście Radaru
- [ ] Zarejestruj tożsamość/dane kontaktowe/adres operatora oraz zatwierdzony przez właściciela przegląd prawny w prywatnej usłudze
- [ ] Przetestuj Stripe Checkout oraz podpisany webhook wyłącznie w trybie testowym
- [ ] Przetestuj jedną zaszyfrowaną dostawę wiadomości transakcyjnej z użyciem zatwierdzonego nadawcy/domeny
- [ ] Potwierdź możliwość odtworzenia kopii zapasowej oraz przeprowadź jedno nadzorowane uruchomienie badawcze z ograniczonym budżetem
- [ ] Zatwierdź zasady weryfikacji BRL/PIX przed rozpoczęciem przyjmowania dowodów wpłat
- [ ] Włącz publiczny Checkout dopiero po spełnieniu powyższych warunków, a następnie aktywuj nowy identyfikator w `news.json`
- [ ] Sprawdź, czy baner na stronie głównej używa zlokalizowanej treści oraz czy nowy identyfikator powoduje ponowne wyświetlenie banera po odrzuceniu starszego identyfikatora

## Testy dymne usług wbudowanych (v3.8.4+)

Przed wydaniem dowolnej wersji zawierającej zmiany w usługach wbudowanych sprawdź:

### Uruchamianie ze świeżą bazą danych (wykrywa kolizje migracji — dodano po poprawce v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — odczekaj 10 s na uruchomienie
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` zwraca `"9router"` (NIE 404 ani 500). Potwierdza zastosowanie migracji `071_services.sql` i dodanie rekordu.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` zwraca 3 wiersze.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` zwraca 2 wiersze (potwierdza zastosowanie migracji `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` przechodzi pomyślnie — zabezpiecza przed przyszłymi kolizjami.

### 9Router

- [ ] `POST /api/services/9router/install` zwraca 200 z `installedVersion` w czasie poniżej 2 min
- [ ] `POST /api/services/9router/start` zwraca 200 i `state: "running"` w czasie poniżej 30 s
- [ ] `GET /api/services/9router/status` zgłasza `health: "healthy"`
- [ ] `POST /v1/chat/completions` z `"model": "9router/auto/..."` zwraca 200 (kompleksowy test routingu przez 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderuje natywny interfejs 9Router wewnątrz proxy (bez bezpośredniego iframe `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` zwraca `{ keyRotated: true }`, a usługa uruchamia się ponownie bez błędów
- [ ] `POST /api/services/9router/stop` zwraca 200 i `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` zwraca strumień SSE ze zdarzeniem `snapshot` zawierającym ostatnie wiersze
- [ ] Instalacja w środowisku bez `npm` w PATH zwraca 500 z przyjaznym komunikatem o błędzie (bez śladu stosu)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` zwraca 200 w czasie poniżej 2 min
- [ ] `POST /api/services/cliproxy/start` zwraca 200 i `state: "running"` w czasie poniżej 30 s
- [ ] `GET /api/services/cliproxy/status` zgłasza `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` zwraca 200 i `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` zwraca strumień SSE

### Regresja zabezpieczeń

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` zwraca `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` zwraca `403 LOCAL_ONLY`
- [ ] Odpowiedzi z błędami z `/api/services/*` nie zawierają `err.stack` ani bezwzględnych ścieżek plików

## Kontrole dla v3.8.0+

Przed wydaniem dowolnej wersji v3.8.x sprawdź także następujące elementy:

- [ ] `omniroute --tray` uruchamia się w systemie macOS (systray2 zainstalowano w `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` uruchamia się w systemie Linux (wymaga DISPLAY; czytelny błąd, jeśli nie ustawiono)
- [ ] `omniroute --tray` uruchamia się w systemie Windows (PowerShell NotifyIcon, bez dodatkowych plików binarnych)
- [ ] `omniroute config tray enable` tworzy wpis autostartu; wyłączenie go usuwa
- [ ] `npm install -g omniroute@<this-version>` wykonuje skrypt poinstalacyjny bez błędu krytycznego
- [ ] Ścieżka aktualizacji zachowuje zależności opcjonalne: `omniroute update --apply` oraz automatyczny aktualizator
      uruchamiają `npm install -g … --include=optional`, dzięki czemu `optionalDependencies` (better-sqlite3,
      keytar, tls-client oraz stos SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) pozostają dostępne po aktualizacji. Poziom SLM ultra z `modelPath` wymaga również modelu
      tinybert, pobieranego automatycznie do `${DATA_DIR}/models/llmlingua` przy pierwszym użyciu. Następnie skrypt poinstalacyjny
      (`scripts/build/colocateOptionals.mjs`) umieszcza domknięcie opcjonalnych zależności SLM w
      `dist/node_modules`, dzięki czemu proces roboczy rozpoznaje JEDNĄ instancję `@huggingface/transformers` ^4.2.0
      — autonomiczny pakiet śledzenia obejmuje tylko transformers, a nie opcjonalne zależności importowane dynamicznie,
      więc bez tego proces roboczy załadowałby llmlingua-2 z transformers z katalogu głównego,
      a poziom SLM po cichu przeszedłby w tryb awaryjny.
- [ ] `omniroute status` działa bez `.env` (ścieżka tokenu CLI, tylko interfejs loopback)
- [ ] `curl http://localhost:20128/api/shutdown` zwraca 401 (trasa zawsze chroniona)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` zwraca 401 (zabezpieczenie loopback)
- [ ] Środowisko uruchomieniowe SQLite przy pierwszym uruchomieniu jest rozpoznawane jako `bundled` (dołączony plik binarny jest prawidłowy dla danej platformy)
- [ ] Środowisko uruchomieniowe SQLite przełącza się na `runtime`, gdy `node_modules/better-sqlite3` zostanie usunięty
- [ ] Inteligentny filtr MCP kompresuje rzeczywiste dane wyjściowe `playwright-mcp browser_snapshot` (redukcja o ≥50%)
- [ ] Wszystkie 10 plików `skills/omniroute*/SKILL.md` jest publicznie dostępnych za pośrednictwem surowego adresu URL GitHub
- [ ] Kreator wdrożenia przy pierwszej konfiguracji wyświetla krok prezentacji poziomów „Jak to działa”
- [ ] Widżet pokrycia poziomów na głównym panelu wyświetla liczbę skonfigurowanych i aktywnych elementów

---

## Wydzielenie 3.9.0 LTS (przećwiczone w 3.8.58)

Po v3.8.59 następną wersją jest 3.9.0, a jej wierzchołek staje się początkiem dwóch długowiecznych gałęzi:
`stable/v3` (linia v3 LTS, npm `latest`) oraz `develop` (v4, z wersją podniesioną do 4.0.0, npm
`nightly`). Model gałęzi/kanałów, forward-port oraz etykiety opisano w
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plan znajduje się w [ROADMAP](../../ROADMAP.md) (faza 3). Wydzielenie jest wykonywane tylko raz;
w 3.8.58 zostaje przećwiczone od początku do końca na forku, a 3.8.59 kończy się
[listą kontrolną GO/NO-GO](./LTS_GO_NO_GO.md).

### Przebieg próbny (tylko do odczytu, bezpieczny w dowolnym momencie)

```bash
npm run release:dry-run-lts-cut                       # właściwe wydzielenie: 3.9.0 z HEAD, poprzedni tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # przypnij commit źródłowy
```

`scripts/release/dry-run-lts-cut.mjs` niczego nie wykonuje: odczytuje dane z git i `gh`, po czym wypisuje
całą sekwencję — warunki wstępne (źródło zostaje rozwiązane, poprzedni tag istnieje, `package.json` ma
wersję docelową, otwarte jest zgłoszenie `release-freeze`, nie ma otwartego zgłoszenia `Release branch not green`
dla istniejącej gałęzi wydania — gałąź, która nie istnieje, jest zgłaszana jako `?` nieznana, nigdy
jako zielona — kolejka Mergify `release` jest skonfigurowana (G11: `queue_rules`, `checks_timeout`,
etykieta `queue`), zestaw reguł `release/*` nadal blokuje usuwanie i force-push, a
`stable/v3` oraz `develop` jeszcze nie istnieją), dwa kroki dotyczące gałęzi, informacje o tym, które wyzwalacze
nieaktywnych przepływów pracy i warunki `if:` stają się prawdziwe (a które pozostają zablokowane przez zmienną repozytorium lub
przypięte do kanonicznego repozytorium), oczekiwane dist-tags (`latest` → 3.9.0, puste `next` i
`nightly`) oraz wycofanie zmian. Kod wyjścia `0` = `RESULT: READY`, `1` = niespełniony blokujący warunek wstępny
(`✗`), `2` = błąd użycia. `--advisory <id,...>` obniża rangę sprawdzenia do ostrzeżenia (`!`)
bez jego ukrywania.

Uruchom przebieg próbny właściwego wydzielenia, gdy zamrożenie wydania 3.9.0 jest nadal aktywne — gałęzie są
tworzone po tagu i przed zniesieniem zamrożenia w fazie 12c.

### Próba 3.8.58 (tylko na forku)

```bash
# 1. Przebieg próbny na bieżącym wierzchołku z parametrami próby
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Wykonanie względem zdalnego FORKA (origin ani żaden zdalny adres, którego URL wskazuje
#    kanoniczne repozytorium, nie są akceptowane; każdy krok wymaga potwierdzenia w terminalu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Przetestowanie nieaktywnych przepływów pracy na forku (workflow_dispatch tam, gdzie przebieg próbny
#    zgłasza przypięcie do kanonicznego repozytorium), a następnie wycofanie zmian
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit podnoszący wersję w develop jest tworzony za pomocą niskopoziomowych mechanizmów git (bez modyfikowania drzewa roboczego) i aktualizuje
te same pięć plików co commit otwierający cykl: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` oraz `docs/openapi.yaml`. Sekcja `[4.0.0]`
w CHANGELOG-u i jej odpowiedniki i18n są następnie otwierane na `develop`, przed pierwszym
PR-em tej gałęzi. Skrypt nigdy nie zmienia dist-tags npm — przećwicz je na tymczasowym pakiecie.

### Artefakt podglądowy PR-a (zbuduj raz, promuj te same bajty)

`.github/workflows/preview-artifact.yml` buduje jeden produkcyjny tarball z wierzchołka PR-a i
weryfikuje dokładnie ten sam build (fragment (a) zadania #8084). Tylko PR-y z tego samego repozytorium; nic nie jest publikowane.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # albo dodaj etykietę `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalacja wersji podglądowej
```

Uruchomienie wykonuje `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, pakuje
tarball, uruchamia `npm run check:pack-boot` (fikcyjne sekrety, efemeryczny katalog danych), ponownie pakuje artefakt i
kończy się niepowodzeniem, jeśli skrót nie jest identyczny, a następnie zapisuje `artifact-identity.json` (SHA wierzchołka, SHA
bazy, skrót pliku blokady, platformę, architekturę, ABI node, bundler, zasady budowania —
`scripts/release/artifact-identity.mjs`) i w osobnym zadaniu poświadcza tarball. Promowanie
wersji podglądowej oznacza instalację tego tarballa: nigdy nie przebudowuj go ze źródeł.

### Wydzielenie (3.9.0, po decyzji GO)

1. Decyzja GO zapisana w [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` wypisuje `RESULT: READY`.
3. Utwórz ręcznie gałęzie na `origin`, używając poleceń wypisanych przez przebieg próbny — skrypt
   odmawia wysyłania zmian do `origin`. Aby ponownie wykorzystać sprawdzony commit develop, najpierw uruchom
   próbę z opcją `--execute` na wierzchołku 3.9.0 względem swojego forka; skrypt wypisze oba SHA, a
   te same commity będzie można wysłać:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zabezpiecz `stable/v3` i `develop` (zestawy reguł + kolejka scalania), zanim zostanie scalony pierwszy PR.
5. Nieaktywne przepływy pracy włączają się po wykryciu istnienia gałęzi: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR-y do `stable/v3`) oraz `nightly-v4-build.yml`
   (buduje `develop`). Przed uruchomieniem produkcyjnym ustaw sekret repozytorium `secrets.FORWARD_PORT_TOKEN` (aby CI uruchamiało się dla
   PR-ów forward-port); nocne publikowanie pozostaje wyłączone, dopóki właściciel nie ustawi zmiennej repozytorium
   `vars.NIGHTLY_PUBLISH` na `true`, a npm Trusted Publishing nie zaakceptuje
   `nightly-v4-build.yml`. Rozwiązywanie kanałów obsługuje `scripts/release/dist-tag.mjs` — ten sam
   mechanizm, którego używa `npm-publish.yml`.
6. Zweryfikuj kanały: `npm view omniroute dist-tags --json` pokazuje `latest` = 3.9.0 oraz brak
   `next` / `nightly`, dopóki v4 nie zostanie opublikowane.
7. W razie potrzeby wycofaj zmiany: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   oraz `npm dist-tag add omniroute@3.8.59 latest`.

---

## Wycofanie wydania

Jeśli wydanie zawiera krytyczny problem:

1. `gh release edit vX.Y.Z --prerelease` (oznacza wydanie jako niebędące najnowszym)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (tylko jeśli użytkownicy jeszcze go nie wdrożyli)
3. Lub: poprawka krytyczna na `release/vX.Y.0` → wydanie poprawkowe `vX.Y.(Z+1)`
4. Natychmiast poinformuj o tym w GitHub Discussions i na Discordzie

## Bezwzględne zasady

- Nigdy nie zatwierdzaj zmian bezpośrednio w `main`
- Nigdy nie używaj `git push --force` dla gałęzi `main` ani `release/*`
- Nigdy nie pomijaj hooków Husky (`--no-verify`)
- Nigdy nie zatwierdzaj sekretów, danych uwierzytelniających ani plików `.env`
- Pokrycie testami musi pozostać na poziomie ≥60/60/60/60 (instrukcje/wiersze/funkcje/gałęzie)
- Zawsze dodawaj lub aktualizuj testy podczas zmiany kodu produkcyjnego w `src/`, `open-sse/`, `electron/` lub `bin/`

## Automatyczne sprawdzanie synchronizacji

Przed otwarciem PR uruchom lokalnie mechanizm sprawdzający synchronizację dokumentacji:

```bash
npm run check:docs-sync
```

CI również uruchamia tę kontrolę w `.github/workflows/ci.yml` (zadanie lintowania).
