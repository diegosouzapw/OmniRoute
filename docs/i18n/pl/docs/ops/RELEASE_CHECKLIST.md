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

- [ ] Wszystkie PR-y przeznaczone do tego wydania zostały scalone z `release/vX.Y.0`
- [ ] Wszystkie otwarte elementy Linear/zgłoszenia dotyczące tej wersji zostały zamknięte lub przeniesione do następnego kamienia milowego
- [ ] CI działa poprawnie na gałęzi `release/vX.Y.0`
- [ ] Brak znaczników `TODO(release)` w kodzie: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Bazowy obraz Docker jest aktualny (obecnie `node:24.15.0-trixie-slim`)

### Wersja i dziennik zmian

- [ ] Uruchom `/version-bump-cc <patch|minor|major>` (umiejętność Claude Code)
  - Aktualizuje wersję w `package.json`, `electron/package.json`
  - Ponownie generuje `CHANGELOG.md` na podstawie commitów git od ostatniego tagu
  - Aktualizuje odznaki w README.md
- [ ] Ręcznie przejrzyj CHANGELOG.md i w razie potrzeby popraw komunikaty commitów
- [ ] Upewnij się, że najnowsza sekcja semver w `CHANGELOG.md` odpowiada wersji w `package.json`
- [ ] Zachowaj `## [Unreleased]` jako pierwszą sekcję dziennika zmian dla nadchodzących prac
- [ ] Zaktualizuj `docs/openapi.yaml` → `info.version` musi odpowiadać wersji w `package.json`

### Jakość kodu

- [ ] `npm run lint` — 0 błędów (ostrzeżenia istniały wcześniej)
- [ ] `npm run typecheck:core` — bez błędów
- [ ] `npm run typecheck:noimplicit:core` — bez błędów (tryb ścisły)
- [ ] `npm run check:cycles:ratchet` — w granicach zamrożonego limitu `metrics.cycles` (samo `check:cycles` kończy się kodem 1 przy dowolnym cyklu, #15281)
- [ ] `npm run check:any-budget:t11` — w granicach budżetu
- [ ] `npm run check:route-validation:t06` — bez błędów
- [ ] `npm run check:node-runtime` — spełniono minimalne wymagania obsługiwanego środowiska uruchomieniowego (`>=22.22.2 <23`, `>=24.0.0 <27`, zgodnie z `SUPPORTED_NODE_RANGE` w `src/shared/utils/nodeRuntimeSupport.ts`; zgodne z `engines` w `package.json`)

### Testowanie

- [ ] `npm run test:unit` — zakończone pomyślnie
- [ ] `npm run test:vitest` — zakończone pomyślnie (serwer MCP, autoCombo, pamięć podręczna)
- [ ] `npm run test:coverage` — spełniony próg 60/60/60/60 (instrukcje/wiersze/funkcje/gałęzie)
- [ ] `npm run test:integration` — zakończone pomyślnie (jeśli zmiany dotyczą bazy danych / procedur obsługi)
- [ ] `npm run test:combo:matrix` — zakończone pomyślnie (macierz strategii combo: deterministycznie potwierdza decyzje wyboru wszystkich 21 publicznych strategii routingu; uruchom w przypadku zmian routingu combo, rozstrzygania strategii lub logiki rezerwowej)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcjonalne/ręczne** (test dymny z kontrolowanym dostępem do rzeczywistych usług nadrzędnych; pobiera migawkę bazy danych tylko do odczytu z VPS `root@192.168.0.15`; korzysta z rzeczywistych dostawców i zużywa środki; nigdy nie jest uruchamiany w CI; bez ustawionej bramki jest prawidłowo pomijany)
- [ ] `npm run test:combo:live:vps` — **opcjonalne/ręczne** (test dymny VPS na żywo fazy 3: 7 scenariuszy HTTP wykonywanych względem działającego serwera `.15` za pomocą zwykłego Node ESM; wymaga `ssh root@192.168.0.15`; tworzy/usuwa wyłącznie kombinacje `__live_test__*`; korzysta z rzeczywistych dostawców; nigdy nie jest uruchamiany w CI)
- [ ] `npm run test:e2e` — zakończone pomyślnie (zmiany interfejsu użytkownika)
- [ ] `npm run test:protocols:e2e` — zakończone pomyślnie (zmiany MCP/A2A)
- [ ] `npm run test:ecosystem` — zakończone pomyślnie

### Hooki (zweryfikowane przez Husky)

Hooki Husky znajdują się w `.husky/` i są uruchamiane automatycznie podczas operacji git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** szybkie, deterministyczne bramki — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktywowane 2026-06-13). Celowo wyklucza `test:unit` (wolne; objęte zadaniem CI `test-unit`).
  - Uruchom `npm run test:unit` ręcznie przed wypchnięciem gałęzi wydania.

Jeśli hook zakończy się niepowodzeniem: napraw przyczynę problemu, nie omijaj go za pomocą `--no-verify`.

### Konwencjonalne commity

Wszystkie commity przeznaczone do wydania muszą mieć format `type(scope): subject`.

**Prawidłowe typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Prawidłowe zakresy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Zmiany niekompatybilne wstecz: dodaj stopkę `BREAKING CHANGE:` lub `!` po zakresie (np. `feat(api)!: drop /v0`).

### Dokumentacja

- [ ] `npm run check:docs-sync` przechodzi pomyślnie (uruchamiane automatycznie przez pre-commit)
- [ ] `npm run check:docs-all` przechodzi pomyślnie (kontrola zbiorcza: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` kończy się kodem 0 — kontrakt zmiennych środowiskowych między kodem ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` pozostaje spójny
- [ ] `npm run check:doc-links` kończy się kodem 0 — brak uszkodzonych wewnętrznych odwołań markdown po zmianie struktury
- [ ] `docs/architecture/ARCHITECTURE.md` przejrzano pod kątem rozbieżności dotyczących pamięci masowej/środowiska uruchomieniowego
- [ ] `docs/guides/TROUBLESHOOTING.md` przejrzano pod kątem rozbieżności dotyczących zmiennych środowiskowych i działania systemu
- [ ] Jeśli zmieniono `.env.example`: zaktualizowano `docs/reference/ENVIRONMENT.md`
- [ ] Jeśli nowa funkcja ma interfejs użytkownika: wspomniano o niej w `docs/guides/USER_GUIDE.md`
- [ ] Jeśli nowa funkcja ma API: zaktualizowano `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Jeśli nowa funkcja jest modułem: istnieje dedykowany plik `docs/<MODULE>.md`
- [ ] Jeśli jest to zmiana niekompatybilna wstecz: `docs/guides/TROUBLESHOOTING.md` zawiera informację o migracji

### i18n

- [ ] `npm run i18n:check` kończy się kodem 0 — stan tłumaczeń (`.i18n-state.json`) jest zsynchronizowany z dokumentacją źródłową (brak rozbieżności w źródłach w trybie ścisłym; ostrzeżenie w trybie ostrzegawczym jest dopuszczalne w przypadku poprawek dokumentacji w ostatniej chwili, ale przed utworzeniem tagu wynik powinien wynosić 0)
- [ ] `npm run i18n:check-ui-coverage` kończy się kodem 0 — każdy język interfejsu użytkownika osiąga co najmniej minimalny poziom pokrycia wynoszący 80%
- [ ] `npm run i18n:sync-ui:dry` zgłasza 0 brakujących kluczy we wszystkich 66 językach docelowych (każdy język poza źródłowym `en`)
- [ ] Jeśli zmieniono źródłową dokumentację angielską, przed utworzeniem tagu uruchom `npm run i18n:run` (wymaga `OMNIROUTE_TRANSLATION_API_KEY` w `.env`)
- [ ] Drobne wkłady w tłumaczenia można odłożyć do następnego wydania (odnotuj w CHANGELOG)

### Migracje bazy danych

- [ ] Jeśli w `src/lib/db/migrations/` znajdują się nowe pliki:
  - [ ] Każda migracja jest idempotentna (`CREATE TABLE IF NOT EXISTS` itd.)
  - [ ] Migracje są opakowane w transakcje
  - [ ] Migracje są prawidłowo ponumerowane (bez luk w sekwencji)
- [ ] Przetestuj na świeżej instalacji: usuń `~/.omniroute/omniroute.db` i uruchom `npm run dev`
- [ ] Przetestuj na istniejącej instalacji: utwórz kopię zapasową bazy danych, uruchom migrację i zweryfikuj schemat
- [ ] Pliki WAL (`-wal`, `-shm`) są prawidłowo obsługiwane, jeśli migracja przepisuje tabele

### Katalog dostawców (walidowany przez Zod)

- [ ] Schemat Zod w `src/shared/constants/providers.ts` jest prawidłowy podczas ładowania
  - [ ] Wszyscy dostawcy mają wymagane pola (`id`, `label`, `kind` itd.)
  - [ ] Dla nowych bezpłatnych dostawców podano `freeNote`
  - [ ] Dostawcy OAuth mają `oauthConfig` zarejestrowaną w `src/lib/oauth/constants/oauth.ts`
- [ ] Jeśli dodano nowego dostawcę: istnieje odpowiadający mu executor w `open-sse/executors/`
- [ ] Jeśli format nie jest zgodny z OpenAI: istnieje translator w `open-sse/translator/`
- [ ] Modele są zarejestrowane w `open-sse/config/providerRegistry.ts`
- [ ] Testy jednostkowe w `tests/unit/` obejmują klasyfikację dostawców i routing

### Aplikacja desktopowa (Electron)

Jeśli zmieniono `electron/`:

- [ ] `npm run electron:smoke:packaged` przechodzi pomyślnie
- [ ] Buildy przetestowano dla co najmniej jednego z `:win`, `:mac`, `:linux`
- [ ] Certyfikaty podpisywania kodu nie wygasły (jeśli używane jest podpisywanie)
- [ ] Wersja w `electron/package.json` jest zgodna z głównym plikiem `package.json`
- [ ] Wskaźnik kanału automatycznych aktualizacji został zaktualizowany, jeśli wydanie trafia do `stable`

### Układ buildu

Repozytorium używa trzech odrębnych katalogów wyjściowych — nigdy ich nie mieszaj:

| Katalog   | Przeznaczenie                                                  | Śledzony?                  |
| --------- | -------------------------------------------------------------- | -------------------------- |
| `src/`    | Kod źródłowy aplikacji (TypeScript / TSX)                      | Tak                        |
| `.build/` | Pliki pośrednie buildu — wynik `next build` (`distDir`)        | Nie (ignorowany przez git) |
| `dist/`   | Dystrybucyjny pakiet npm — składany przez `assembleStandalone` | Nie (ignorowany przez git) |

> **Uwaga dla operatora:** katalog obrazu na zdalnym VPS nadal znajduje się pod ścieżką `/usr/lib/node_modules/omniroute/app/`.
> Przeniesiono wyłącznie wynik buildu **wewnątrz repozytorium** (`app/` → `dist/`). Narzędzia wdrożeniowe synchronizują przez rsync
> zawartość `dist/` do zdalnego katalogu `app/` — nie są wymagane żadne zmiany ścieżek na VPS.

**Przepływ pojedynczego buildu:**

```
npm run build:release
  └─ rm -rf .build dist          (czyszczenie)
  └─ next build → .build/next/   (pliki pośrednie)
  └─ assembleStandalone          (kopiuje standalone + static + public + natives → dist/)
  └─ zapisuje dist/BUILD_SHA     (znacznik HEAD)
```

NIE uruchamiaj `npm run build`, a następnie osobno `npm run build:cli` na potrzeby wdrożenia — użyj
`npm run build:release`, które wykonuje czysty rebuild i zapisuje znacznik za pomocą jednego polecenia.

### Walidacja artefaktów

- [ ] `npm run build:release` kończy się powodzeniem, a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` nie zgłasza problemów — brak `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani innych lokalnych pozostałości
- [ ] Po buildzie istnieje `dist/server.js`
- [ ] Opcjonalny lokalny test dymny spakowanego środowiska uruchomieniowego: `npm run dev:candidate -- validate` po `npm run dev:candidate -- build` uruchamia spakowany archiwum tar w izolowanym `DATA_DIR` i sprawdza `/api/health` oraz `/v1/models` (zobacz [Zalecany proces wnoszenia zmian](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Tagowanie i wydanie

- [ ] Uruchom `/generate-release-cc` (narzędzie Claude Code):
  - Tworzy tag `vX.Y.Z`
  - Wysyła tag i gałąź
  - Tworzy GitHub Release z treścią changelogu
  - Dołącza instalatory Electron (jeśli zostały zbudowane)
- [ ] Lub wykonaj ręcznie:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Wdrożenie

Narzędzia wdrożeniowe używają lekkiego przepływu rsync — bez `npm pack` i bez `npm i -g`:

- [ ] Użyj narzędzia wdrożeniowego odpowiadającego środowisku docelowemu:
  - `/deploy-vps-local-cc` — lokalny VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Przed wdrożeniem potwierdź, że `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build musi zostać wykonany tam, gdzie `node_modules` jest rzeczywistym katalogiem (główny checkout lub worktree przygotowany przez `npm ci` — NIE worktree używający dowiązania symbolicznego)
- [ ] Przeprowadź test dymny wdrożonej instancji:
  - Otwórz `/dashboard/health` → sprawdź, czy ciąg wersji jest zgodny z wydaniem
  - Wyślij żądanie `/v1/chat/completions` do znanego dostawcy
  - Sprawdź, czy `/api/monitoring/health` zwraca wyłączniki automatyczne w stanie `CLOSED`
  - Potwierdź, że transporty MCP odpowiadają (`/mcp` HTTP, `/mcp-sse` SSE)

### Po wydaniu

- [ ] Uruchom `/capture-release-evidences-cc` (narzędzie Claude Code)
  - Rejestruje zrzuty ekranu/nagrania WebP nowych funkcji
  - Dołącza je do informacji o wydaniu / wpisu na blogu
- [ ] Zaktualizuj GitHub Discussions / Discord, publikując ogłoszenie o wydaniu
- [ ] Otwórz kamień milowy dla następnej wersji
- [ ] Jeśli wydanie jest krytyczne: przypnij dyskusję lub opublikuj wpis w `news.json`, aby wyświetlić baner w aplikacji

### Bramka publicznego uruchomienia Radar

Ogłoszenie Radar zostało celowo zatwierdzone z ustawieniem `active: false`. Aktywacja jest osobną
zmianą wykonywaną po udokumentowaniu każdego z poniższych punktów:

- [ ] Wszystkie skumulowane PR-y Radar zostały scalone, a CI dla końcówki wydania jest zielone
- [ ] Wdróż i przetestuj dymnie trasy OSS Radar, gdy `RADAR_ENABLED` jest nadal domyślnie wyłączone
- [ ] Przetestuj dymnie `GET /planos`, `/termos`, `/privacidade` oraz `/reembolso` na wskazanym hoście Radar
- [ ] Zapisz tożsamość/dane kontaktowe/adres operatora oraz zatwierdzony przez właściciela przegląd prawny w prywatnej usłudze
- [ ] Przetestuj Stripe Checkout i podpisany webhook wyłącznie w trybie testowym
- [ ] Przetestuj jedną zaszyfrowaną wiadomość transakcyjną z zatwierdzonym nadawcą/domeną
- [ ] Udowodnij możliwość odtworzenia kopii zapasowej i wykonaj jedno nadzorowane badanie z limitem budżetu
- [ ] Zatwierdź zasady przeglądu BRL/PIX przed rozpoczęciem akceptowania dowodów darowizn
- [ ] Włącz publiczny Checkout dopiero po spełnieniu wcześniejszych bramek, a następnie aktywuj nowy identyfikator w `news.json`
- [ ] Sprawdź, czy baner na stronie głównej używa zlokalizowanej treści oraz czy nowy identyfikator pojawia się ponownie po odrzuceniu starszego identyfikatora

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

Po v3.8.59 następną wersją jest 3.9.0, a jej wierzchołek staje się początkiem dwóch długotrwałych gałęzi:
`stable/v3` (linia v3 LTS, npm `latest`) oraz `develop` (v4, z wersją podniesioną do 4.0.0, npm
`nightly`). Model gałęzi/kanałów, przenoszenie zmian do nowszych wersji oraz etykiety opisano w
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plan znajduje się w [ROADMAP](../../ROADMAP.md) (faza 3). Wydzielenie wykonywane jest raz;
w 3.8.58 zostaje przećwiczone od początku do końca na forku, a 3.8.59 kończy się
[listą kontrolną GO/NO-GO](./LTS_GO_NO_GO.md).

### Przebieg próbny (tylko do odczytu, bezpieczny w dowolnym momencie)

```bash
npm run release:dry-run-lts-cut                       # rzeczywiste wydzielenie: 3.9.0 z HEAD, poprzedni tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # przypnij commit źródłowy
```

`scripts/release/dry-run-lts-cut.mjs` niczego nie wykonuje: odczytuje dane z git i `gh`, po czym wyświetla
całą sekwencję — warunki wstępne (źródło jest rozpoznawane, repozytorium źródłowe zawiera pełną historię —
płytki klon nie może wypchnąć `stable/v3`, ponieważ strona odbierająca odrzuca pakiet przy pierwszym
sztucznie dołączonym rodzicu, dlatego wydzielenie należy wykonać z pełnego klonu lub najpierw uruchomić
`git fetch --unshallow origin` — poprzedni tag istnieje, `package.json` zawiera wersję docelową, otwarte jest
zgłoszenie `release-freeze`, nie ma otwartego zgłoszenia `Release branch not green`
dla istniejącej gałęzi wydania — nieistniejąca gałąź zwraca `?`, czyli stan nieznany, nigdy
zielony — kolejka Mergify `release` jest skonfigurowana (G11: `queue_rules`, `checks_timeout`,
etykieta `queue`), zestaw reguł `release/*` nadal blokuje usuwanie i wymuszone wypychanie, a
`stable/v3` i `develop` jeszcze nie istnieją), dwa kroki tworzenia gałęzi, informację o tym, które wyzwalacze
nieaktywnych przepływów pracy i warunki `if:` stają się prawdziwe (oraz które pozostają zablokowane przez
zmienną repozytorium lub przypięte do repozytorium kanonicznego), oczekiwane dist-tagi (`latest` → 3.9.0,
`next` i `nightly` puste) oraz procedurę wycofania. Kod zakończenia `0` = `RESULT: READY`, `1` = niespełniony
blokujący warunek wstępny (`✗`), `2` = błąd użycia. `--advisory <id,...>` obniża rangę kontroli do
ostrzeżenia (`!`), nie ukrywając jej.

Uruchom przebieg próbny rzeczywistego wydzielenia, gdy zamrożenie wydania 3.9.0 jest nadal aktywne — gałęzie
są tworzone po tagu i przed zniesieniem zamrożenia w fazie 12c.

### Próba 3.8.58 (wyłącznie na forku)

```bash
# 1. Przebieg próbny na bieżącym wierzchołku z parametrami próby
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Wykonanie względem zdalnego FORKA (origin ani żadne zdalne repozytorium, którego URL
#    wskazuje repozytorium kanoniczne, nie jest dozwolone; każdy krok wymaga potwierdzenia w terminalu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Uruchomienie nieaktywnych przepływów pracy w forku (workflow_dispatch tam, gdzie przebieg próbny
#    zgłasza przypięcie do repozytorium kanonicznego), a następnie wycofanie zmian
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit podnoszący wersję w `develop` jest tworzony za pomocą niskopoziomowych mechanizmów git (bez modyfikowania
drzewa roboczego) i aktualizuje te same pięć plików co commit otwierający cykl: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` oraz `docs/openapi.yaml`. Sekcja `[4.0.0]`
w CHANGELOG-u oraz jej odpowiedniki i18n są następnie otwierane na `develop`, przed pierwszym
PR-em tej gałęzi. Skrypt nigdy nie zmienia dist-tagów npm — przećwicz to na pakiecie testowym.

### Artefakt podglądowy PR-a (zbuduj raz, promuj dokładnie te same bajty)

`.github/workflows/preview-artifact.yml` buduje jeden produkcyjny tarball z wierzchołka PR-a i
weryfikuje dokładnie ten build (fragment (a) zadania #8084). Obsługiwane są wyłącznie PR-y z tego samego repozytorium;
nic nie jest publikowane.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # lub dodaj etykietę `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalacja podglądowa
```

Przebieg wykonuje `npm ci`, `npm run build:release` oraz `npm run check:pack-artifact`, pakuje
tarball, uruchamia `npm run check:pack-boot` (fikcyjne sekrety, efemeryczny katalog danych), ponownie
pakuje i kończy się niepowodzeniem, jeśli skrót nie jest identyczny, po czym zapisuje
`artifact-identity.json` (SHA wierzchołka, SHA bazy, skrót pliku blokady, platforma, architektura,
ABI node, bundler, zasady budowania — `scripts/release/artifact-identity.mjs`) i poświadcza tarball
w osobnym zadaniu. Promowanie podglądu oznacza instalację tego tarballa: nigdy nie buduj go ponownie ze źródeł.

### Wydzielenie (3.9.0, po decyzji GO)

1. Decyzja GO jest zapisana w [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` wyświetla `RESULT: READY`.
3. Utwórz ręcznie gałęzie w `origin`, używając poleceń wyświetlonych przez przebieg próbny —
   skrypt odmawia wypychania do `origin`. Aby ponownie wykorzystać sprawdzony commit dla `develop`, najpierw uruchom
   próbę `--execute` na wierzchołku 3.9.0 względem swojego forka; wyświetli ona oba SHA, a następnie
   można wypchnąć te same commity:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zabezpiecz `stable/v3` i `develop` (zestawy reguł + kolejka scalania), zanim pierwszy PR zostanie scalony.
5. Nieaktywne przepływy pracy zostaną włączone po utworzeniu odpowiednich gałęzi: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR-y do `stable/v3`) oraz `nightly-v4-build.yml`
   (kompilacje gałęzi `develop`). Przed uruchomieniem ustaw sekret repozytorium `secrets.FORWARD_PORT_TOKEN` (aby CI uruchamiało się dla
   PR-ów typu forward-port); publikowanie kompilacji nocnych pozostanie wyłączone, dopóki właściciel nie ustawi zmiennej repozytorium
   `vars.NIGHTLY_PUBLISH` na `true`, a funkcja Trusted Publishing w npm nie zaakceptuje
   `nightly-v4-build.yml`. Za rozpoznawanie kanałów odpowiada `scripts/release/dist-tag.mjs` — ten sam
   mechanizm, którego używa `npm-publish.yml`.
6. Zweryfikuj kanały: `npm view omniroute dist-tags --json` pokazuje `latest` = 3.9.0 oraz brak
   `next` / `nightly` do czasu opublikowania v4.
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
