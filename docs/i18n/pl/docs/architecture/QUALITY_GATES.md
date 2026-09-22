# Quality Gates Reference (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ten dokument stanowi wiążący materiał referencyjny dla wszystkich bramek jakości CI w OmniRoute.
Opisuje każdą bramkę, zakres jej weryfikacji, zadanie CI, w którym jest uruchamiana, to, czy
wykorzystuje bazową wartość mechanizmu zapadkowego, czy zasady zaliczenia/niezaliczenia, oraz to,
czy blokuje kompilację, czy ma charakter doradczy.

Krótkie podsumowanie i zasady listy dozwolonych wyjątków znajdują się w sekcji „Quality Gates & Ratchets”
w pliku `AGENTS.md`. Krytyczną ocenę, klasyfikację dojrzałości oraz niezależny od narzędzi
plan odtworzenia tego samego systemu zawiera
[Podręcznik bramek jakości](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inwentarz bramek (~90 skryptów)

Skrypty znajdują się w `scripts/check/` (bramki zasad) oraz `scripts/quality/` (mechanizm zapadkowy).
Źródłem prawdy dla CI jest `.github/workflows/ci.yml`.

### Szybka ścieżka dla PR-ów wydania (`quality.yml`)

`.github/workflows/quality.yml` jest uruchamiany dla PR-ów kierowanych do `release/**`. Umożliwia sprawną pracę
na gałęziach współtwórców dzięki szybkim bramkom filtrowanym według ścieżek oraz jednemu doradczemu sygnałowi z kompilacji produkcyjnej dla zmian
w kodzie:

| Zadanie                                          | Zakres                                                                                                                                                                                                                                                     | Blokowanie                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR-y z kodem niebędące wersjami roboczymi oraz gałęzie kolejki Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` z `OMNIROUTE_USE_TURBOPACK=1`; bez przesyłania artefaktów, ponieważ żadne późniejsze zadanie jakości ich nie używa  | **Doradcze** (`continue-on-error: true`; usunąć po tygodniu stabilnych uruchomień dla PR-ów wydania) |
| `Docs Gates (fast-path)`                         | PR-y z dokumentacją/kodem; odwołania w dokumentacji API oraz docs-all                                                                                                                                                                                      | Tak                                                                                                  |
| `Fast Quality Gates`                             | PR-y z kodem; kontrole statyczne, kontrola typów, kontrola typów dashboardu, testy jednostkowe objęte zmianami                                                                                                                                             | Tak                                                                                                  |
| `Forgotten sibling tests`                        | PR-y z kodem; śledzenie zmienionych modułów do statycznych konsumentów i potencjalnych testów równorzędnych; ścieżki przez moduły zbiorcze i importy dynamiczne są raportowane jako diagnostyka doradcza wraz z przywołanymi wyjątkami z listy dozwolonych | **Doradcze**                                                                                         |
| `Vitest (fast-path)`                             | PR-y z kodem; szybki zestaw testów vitest                                                                                                                                                                                                                  | Tak                                                                                                  |
| `Unit Tests fast-path`                           | PR-y z kodem; zestaw testów jednostkowych podzielony na 4 fragmenty                                                                                                                                                                                        | Tak                                                                                                  |
| `No new ESLint warnings`                         | PR-y z kodem; kontrola lintowania uwzględniająca wyciszenia                                                                                                                                                                                                | Tak dla własnego źródła, doradcze dla forków                                                         |
| `Merge integrity (changelog + generated skills)` | PR-y niebędące wersjami roboczymi; synchronizacja dziennika zmian i wygenerowanych umiejętności                                                                                                                                                            | Tak dla własnego źródła, doradcze dla forków                                                         |

#### Raport zapomnianych testów równorzędnych

`npm run check:forgotten-sibling-tests` ponownie wykorzystuje mechanizm rozwiązywania importów używany przez mapę wpływu testów.
Dla każdego zmienionego modułu produkcyjnego raportuje deterministyczne łańcuchy
`zmieniony moduł/symbol -> statyczny konsument -> potencjalny test równorzędny`, gdy potencjalnego
testu nie ma w różnicy zmian pull requestu. Podsumowanie w formacie Markdown i wynik JSON są zachowywane jako
artefakt przepływu pracy `forgotten-sibling-tests` na potrzeby kalibracji przed wdrożeniem trybu blokującego.

Ponowne eksporty przez moduły zbiorcze i importy dynamiczne stanowią wyłącznie diagnostykę rozwiązywania; nigdy nie tworzą
wyniku blokującego. Zatwierdzone wyjątki znajdują się w
`config/quality/forgotten-sibling-allowlist.json`. Każdy wpis musi wskazywać konsumenta i potencjalny
test, zawierać konkretne uzasadnienie oraz link do zgłoszenia lub pull requestu w serwisie GitHub. Nieprawidłowo sformułowane wpisy powodują
odrzucenie. Wyjątki nie mogą pomijać usuniętego potencjalnego testu ani różnicy zmian dodającej `.skip`/`.todo`;
osłabianie asercji i inne formy maskowania pozostają w zakresie niezależnie blokującej
bramki `check:test-masking`.

### Zadanie: `lint`

Uruchamiane dla każdego PR-u do `main`. W przypadku niepowodzenia blokuje scalenie.

| Skrypt (`npm run ...`)            | Sprawdza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokujący                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Czy wersja Node.js mieści się w obsługiwanym zakresie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                          |
| `check:cycles`                    | Importy cykliczne — wszystkie moduły `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Tak                                          |
| `check:route-validation:t06`      | Obecność schematów Zod we wszystkich trasach (zasady poziomu 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                          |
| `check:any-budget:t11`            | Liczba wystąpień `@ts-expect-error // any` nie przekracza limitu (zapadka poziomu 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                          |
| `check:provider-consistency`      | Każdy dostawca w `providers.ts` ma odpowiadający mu wpis w `providerRegistry.ts` (i odwrotnie, w ramach listy dozwolonych)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                          |
| `check:model-lifecycle`           | Trzy ręcznie utrzymywane tabele routingu pozostają spójne z migawką cyklu życia znajdującą się w repozytorium (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nie przypisuje punktacji żadnemu wycofanemu identyfikatorowi, do którego `REGISTRY` może kierować; każdy cel `BUILT_IN_ALIASES` jest obecny w `REGISTRY` i nie występuje w migawce wycofanych identyfikatorów; każdy wycofany identyfikator nadal obecny w `REGISTRY` jest przekierowywany lub wymieniony w `allowedRetiredInCatalog`; a żadne źródło ani cel `DEFAULT_DEGRADATION_MAP` nie figuruje w tej migawce jako wycofane. Nie dowodzi to, że model jest obecnie obsługiwany przez działającą usługę nadrzędną. W trybie offline — porównuje z `config/quality/model-lifecycle.json`, odświeżanym ręcznie za pomocą `npm run quality:refresh-model-lifecycle` (wymaga sieci; nie jest podłączone do CI). `allowedRetiredInCatalog` jest mechanizmem stopniowego ograniczania: wpis należy dodać wyłącznie wraz ze zgłoszeniem umożliwiającym śledzenie. | Tak                                          |
| `check:fetch-targets`             | Każde `fetch("/api/...")` w klienckiej części `src/` prowadzi do rzeczywistego pliku `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                          |
| `check:deps`                      | Wszystkie zależności możliwe do zainstalowania za pomocą `npm install` ze wszystkich plików `package.json` w repozytorium znajdują się w `dependency-allowlist.json`; nowe pakiety bez przypiętej wersji lub wykorzystujące literówki w nazwach są oznaczane                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                          |
| `audit:deps`                      | `npm audit` (katalog główny + electron) — brak ostrzeżeń o wysokim/krytycznym poziomie zagrożenia (częściowo pokrywa się z osv `check:vuln-ratchet`; zobacz Rejestr zadań racjonalizacyjnych)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                          |
| `check:lockfile`                  | Integralność `package-lock.json` — rejestr https, skróty integralności, brak nadpisań hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                          |
| `check:licenses`                  | Lista dozwolonych licencji SPDX dla zależności produkcyjnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                          |
| `check:tracked-artifacts`         | Brak artefaktów kompilacji / zatwierdzonych dowiązań symbolicznych `node_modules` (uruchamiane również przez husky przed zatwierdzeniem; kontrola przed wypchnięciem jest celowo ograniczona — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                          |
| `check:vitest-exclusions`         | Każde wykluczenie Vitest wskazuje zgłoszenie śledzące i znajduje się w `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                          |
| `check:file-size`                 | Żaden plik źródłowy nie przekracza limitu dla danego rozszerzenia (mechanizm zapadkowy: zamrożone duże pliki na liście `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Tak                                          |
| `check:error-helper`              | Odpowiedzi błędów w executorach/procedurach obsługi używają `buildErrorBody()` / `sanitizeErrorMessage()` (Reguła bezwzględna nr 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                          |
| `check:migration-numbering`       | Pliki SQL migracji są numerowane kolejno, bez luk ani duplikatów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Tak                                          |
| `check:public-creds`              | Brak literałów OAuth `client_id`/`client_secret` ani kluczy Firebase Web poza `publicCreds.ts` (Twarda reguła nr 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                          |
| `check:db-rules`                  | Brak surowego SQL poza modułami `src/lib/db/`; brak importów zbiorczych z `localDb.ts` (Twarde reguły nr 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                          |
| `check:known-symbols`             | Wykonawcy dostawców, strategie routingu i translatory zarejestrowane w odpowiednich tabelach dyspozytorskich odpowiadają plikom na dysku — brak osieroconych lub niezadeklarowanych symboli                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                          |
| `check:route-guard-membership`    | Każda trasa uruchamiająca proces potomny jest sklasyfikowana przez `isLocalOnlyPath()` (Twarde reguły nr 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                          |
| `check:test-discovery`            | Każdy plik `*.test.ts` / `*.spec.ts` w repozytorium jest wykrywany przez co najmniej jeden mechanizm uruchamiania testów (mechanizm zapadkowy: lista osieroconych plików w `test-discovery-baseline.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                          |
| `check:agent-skills-sync`         | Wygenerowane artefakty umiejętności agentów są zgodne z ich katalogiem źródłowym (brak rozbieżności)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Logotypy/zasoby dostawców mają zarejestrowany wpis dotyczący pochodzenia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | Pliki konfiguracyjne JSON są poprawnie analizowane i spełniają reguły lintowania repozytorium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | Kompilacja TypeScript bez błędów (tylko ostrzeżenia informacyjne)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                          |
| `typecheck:noimplicit:core`       | Rygorystyczne `noImplicitAny` — ukierunkowane na przyszłość; wiele istniejących miejsc wywołań nadal wymaga adnotacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Informacyjne** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograniczone do `src/app/(dashboard)/**` (#7033) — starannie wyselekcjonowana lista 27 plików w `typecheck:core` nie obejmuje żadnych plików TSX panelu, a `next build` również nigdy nie sprawdza ich typów (`next.config.mjs` ustawia `ignoreBuildErrors: true`), dlatego regresje dotyczące osieroconych identyfikatorów (#6625/#6909) pozostawały niewidoczne dla CI. Różnice są porównywane z zamrożoną bazą liczby błędów dla każdego pliku i kodu TS (`config/quality/dashboard-typecheck-baseline.json`, ten sam wzorzec wymuszania aktualności co w `check:known-symbols`) — tylko NOWE błędy przekraczające liczbę zapisaną w bazie powodują niepowodzenie kontroli; gdy istniejący wcześniej błąd zostanie naprawiony, obniż bazę za pomocą `--update`.                                                                                                                                                                                                                                                   | Tak                                          |

### Zadanie: `quality-gate`

Uruchamiane po `test-coverage`. W przypadku niepowodzenia blokuje scalenie.

| Skrypt                       | Sprawdza                                                                                                                                                                                          | Blokujące                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `quality:collect`            | Generuje `quality-metrics.json` (liczba ostrzeżeń ESLint, pokrycie ze scalonego raportu fragmentów)                                                                                               | Tak (przed mechanizmem zapadkowym) |
| `quality:ratchet`            | Żadna metryka w `quality-baseline.json`` nie uległa pogorszeniu (ostrzeżenia ESLint ≤ wartość bazowa; pokrycie ≥ wartość bazowa)                                                                  | Tak                                |
| `check:duplication`          | Duplikacja kodu (jscpd@4) nie przekracza wartości bazowej w `quality-baseline.json`                                                                                                               | Tak                                |
| `check:complexity`           | Złożoność cyklomatyczna na poziomie pliku nie przekracza limitu (podstawowe reguły ESLint `complexity` + `max-lines-per-function`)                                                                | Tak                                |
| `check:cognitive-complexity` | Mechanizm zapadkowy złożoności poznawczej (`eslint-plugin-sonarjs`) — osobne uruchomienie ESLint; CI uruchamia oba razem jako pojedynczy krok `check:complexity-ratchets`                         | Tak                                |
| `check:dead-code`            | Mechanizm zapadkowy nieużywanych eksportów / plików (knip) nie pogarsza się względem wartości bazowej                                                                                             | Tak                                |
| `check:compression-budget`   | Budżet testu wydajności kompresji — minimalne oszczędności tokenów dla poszczególnych silników nie mogą się pogorszyć                                                                             | Tak                                |
| `check:type-coverage`        | Mechanizm zapadkowy procentowego pokrycia typami (`type-coverage`) nie ulega pogorszeniu; w dużej mierze zastępuje `typecheck:noimplicit:core`                                                    | Tak                                |
| `check:codeql-ratchet`       | Liczba otwartych alertów CodeQL nie wzrasta (odczyt przez `gh api`; łagodne pominięcie bez tokenu) — częstotliwość odświeżania i ręczne uruchamianie: zobacz „Mechanizm zapadkowy CodeQL” poniżej | Tak                                |

### Zadanie: `quality-extended`

Całe zadanie ma charakter doradczy (`continue-on-error: true`). Mechanizmy zapadkowe oparte na npm są uruchamiane
faktycznie; zewnętrzne skanery są instalowane za pomocą `gh release download` i samoczynnie się pomijają (kod wyjścia 0),
gdy plik binarny nadal nie jest dostępny.

| Skrypt                   | Sprawdza poprawność                                                                                                                                                                                                 | Blokowanie   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:circular-deps`    | Brak zależności cyklicznych (dpdm)                                                                                                                                                                                  | **Doradcze** |
| `check:bundle-size`      | Rozmiar pakietu nie przekracza limitu                                                                                                                                                                               | **Doradcze** |
| `check:secrets`          | Skanowanie pod kątem sekretów (gitleaks) — pomijane, jeśli brak pliku binarnego                                                                                                                                     | **Doradcze** |
| `check:vuln-ratchet`     | Podatności zależności (osv-scanner) nie ulegają regresji — pomijane, jeśli brak pliku binarnego                                                                                                                     | **Doradcze** |
| `check:workflows`        | Lintowanie przepływów pracy (actionlint + zizmor) — pomijane, jeśli brak plików binarnych                                                                                                                           | **Doradcze** |
| `check:openapi-breaking` | Zmiany niezgodne wstecznie w publicznym kontrakcie API (`openapi.yaml`) względem gałęzi bazowej (oasdiff) — generuje `openapiBreaking=N`; pomijane, jeśli brak oasdiff lub nie można rozpoznać specyfikacji bazowej | **Doradcze** |

### Zadanie: `docs-sync-strict`

Uruchamiane dla każdego PR do `main`. W przypadku niepowodzenia blokuje scalanie.

| Skrypt                         | Sprawdza poprawność                                                                                                                                                                        | Blokowanie                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `check:docs-all`               | Metabrama uruchamiająca kolejno 6 poniższych bram podrzędnych                                                                                                                              | Tak                         |
| ↳ `check:docs-sync`            | Spójność wersji w CHANGELOG / OpenAPI / llm.txt                                                                                                                                            | Tak                         |
| ↳ `check:docs-counts`          | Liczby w tekście (liczba dostawców, liczba migracji itp.) mieszczą się w oknie mechanizmu zapadkowego względem rzeczywistych wartości                                                      | Tak                         |
| ↳ `check:env-doc-sync`         | Każda zmienna środowiskowa z `.env.example` jest udokumentowana w tabeli dokumentacji i odwrotnie                                                                                          | Tak                         |
| ↳ `check:deprecated-versions`  | Brak ciągów znaków przestarzałych wersji w dokumentacji                                                                                                                                    | Tak                         |
| ↳ `check:doc-links`            | Wewnętrzne łącza markdown w dokumentacji wskazują na istniejące pliki (format `[text]`/`(path)`)                                                                                           | Tak                         |
| ↳ `check:fabricated-docs`      | Trasy, zmienne środowiskowe, polecenia CLI, nazwy hooków i ścieżki plików przywołane w dokumentacji istnieją w bazie kodu. Twarda brama z `--strict`; łagodne niepowodzenie bez tej flagi. | Tak (przez `--strict` w CI) |
| `check:cli-i18n`               | Ciągi znaków poleceń CLI są obecne we wszystkich plikach ustawień regionalnych i18n                                                                                                        | Tak                         |
| `check:openapi-coverage`       | Specyfikacja OpenAPI obejmuje co najmniej ustalony mechanizmem zapadkowym minimalny poziom rzeczywistych tras                                                                              | Tak                         |
| `check:openapi-security-tiers` | Adnotacje poziomów zabezpieczeń w `openapi.yaml` są spójne z klasyfikacjami w `routeGuard.ts`                                                                                              | **Doradcze**                |
| `check:openapi-routes`         | Każda ścieżka w `openapi.yaml` odpowiada rzeczywistemu plikowi `route.ts` (ochrona przed halucynacjami)                                                                                    | Tak                         |
| `check:docs-symbols`           | Każde odwołanie `/api/...` w `docs/**/*.md` odpowiada rzeczywistemu plikowi `route.ts` (ochrona przed halucynacjami)                                                                       | Tak                         |
| `i18n translation drift`       | Nieprzetłumaczone klucze w plikach ustawień regionalnych i18n — tylko ostrzeżenie                                                                                                          | **Doradcze**                |

### Zadanie: `i18n-ui-coverage`

| Skrypt                            | Sprawdza                                                                                                                                                                                                                                      | Blokuje      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (inline) | Pokrycie kluczy i18n interfejsu użytkownika wynosi ≥ 65%                                                                                                                                                                                      | Tak          |
| `check-ui-value-drift` (inline)   | Zmieniona angielska **wartość** nie pozostawia nieaktualnego tłumaczenia                                                                                                                                                                      | Tak          |
| `check-new-key-coverage` (inline) | **Nowy** angielski klucz jest przetłumaczony w każdym języku — znacznik `__MISSING__:` jest odrzucany                                                                                                                                         | Tak          |
| `check-translation-ratio`         | Udział rzeczywistych tłumaczeń w każdym języku (wartości identyczne z angielskimi / symbole zastępcze / brakujące liście spoza listy dozwolonych) nie może przekraczać wartości z `config/quality/i18n-translation-baseline.json` + marginesu | **Doradcze** |

Wymaga `fetch-depth: 0` — bramka rozbieżności wartości porównuje `en.json` z bazą scalania.

#### `check-ui-value-drift` — bramka nieaktualnych tłumaczeń

Wykrywa jedną regresję i18n, której pozostałe bramki nie są w stanie wykryć strukturalnie:
angielska wartość zostaje zmieniona, a tłumaczenia utworzone na podstawie _poprzedniej_
angielskiej wersji pozostają bez zmian, przez co użytkownicy innych wersji językowych nadal
czytają jednoznacznie sformułowaną, lecz już nieprawidłową treść.

Taka sytuacja rzeczywiście trafiła do wydania. Wartość `oauthModal.googleOAuthWarning`
została zmieniona po dodaniu pomocnika logowania Antigravity (#5203); **39 z 43 wersji
językowych** zachowało tekst nakazujący operatorom „skopiować pełny adres URL i wkleić go
poniżej” — przepływ, którego nie da się ukończyć dla tego dostawcy. Problem pozostał
niezauważony aż do #8463, ponieważ:

- `sync-ui-keys` uzupełnia wyłącznie **nieobecne** klucze, nigdy **nieaktualne**;
- `check-ui-keys-coverage` zlicza _obecność_ kluczy, więc nieaktualne tłumaczenie jest uznawane za pokryte;
- `check-translation-drift` śledzi kopie dokumentacji `docs/i18n/<locale>/**.md` —
  nigdy nie odczytuje `src/i18n/messages/*.json`. Blokuje w zadaniu `docs-sync-strict` od
  ponownej synchronizacji 2026-09: edytuj główny dokument → `npm run i18n:run -- --files=<doc>` (na poziomie sekcji, niski koszt).

**Uwzględnia różnice, nie opiera się na wartości bazowej.** Porównuje `en.json` z bazy
scalania z drzewem roboczym; dla każdego klucza, którego angielska wartość uległa zmianie,
każda wersja językowa nadal zawierająca niezmienione tłumaczenie jest nieaktualna. Celowo
**zamraża to istniejący wcześniej dług** — różnica nie pozwala ustalić, z której starej
angielskiej wersji pochodzi istniejące od dawna tłumaczenie, dlatego bramka ocenia wyłącznie
to, czego dotyczy bieżąca zmiana. Alternatywa (wartość bazowa skrótów dla poszczególnych
kluczy) wymagałaby wygenerowanego pliku o rozmiarze około 600 KB, trzykrotnie większego od
największej istniejącej wartości bazowej, zmieniającego się przy każdym PR dotyczącym i18n.

Można spełnić ten warunek na dwa sposoby:

1. zaktualizować odpowiednie tłumaczenia albo
2. ustawić je na `__MISSING__:<new english>` — środowisko uruchomieniowe wyświetli wtedy
   poprawiony tekst angielski (`src/i18n/request.ts::deepMergeFallback`, #7258), a klucz
   trafi do kolejki tłumaczeń.

Jeśli zmieniło się **znaczenie** ciągu, najlepiej **zmienić nazwę klucza**: nowy klucz nie
może odziedziczyć nieaktualnego tłumaczenia. Ten wzorzec zastosowano w #8463.

```bash
npm run i18n:check-value-drift          # tryb ścisły (uruchamiany przez CI)
npm run i18n:check-value-drift:warn     # tylko raport
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kończy działanie kodem 0 i komunikatem `SKIP reason=base-unresolved`, gdy nie można odczytać
katalogu bazowego (płytki klon bez referencji bazowej), analogicznie do
`check-openapi-breaking`.

### Zadanie: `i18n`

Pełna macierz walidacji i18n (jedno zadanie na wersję językową). Całe zadanie ma charakter doradczy.

| Skrypt                          | Sprawdza                                            | Blokuje                                                     |
| ------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Kompletność tłumaczenia dla każdej wersji językowej | **Doradcze** (`continue-on-error: true` dla całego zadania) |

### Zadanie: `pr-test-policy`

Uruchamiane wyłącznie dla pull requestów.

| Skrypt                 | Sprawdza                                                                                                                                                           | Blokuje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `check:pr-test-policy` | PR-y zmieniające kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/` muszą zawierać nowe lub zaktualizowane testy (Twarda reguła nr 8)                   | Tak     |
| `check:test-masking`   | Zmienione pliki testowe nie zmniejszają łącznej liczby asercji ani nie dodają tautologii `assert.ok(true)`                                                         | Tak     |
| `check:pr-evidence`    | Opis PR-a przytacza dowody z testów/VPS dotyczące zmiany (automatyzuje Twardą regułę nr 18 przez przeszukiwanie treści PR-a — rozwiązanie kruche, zob. zaległości) | Tak     |

### Zadanie: `test-vitest`

Uruchamiane po `build`. W przypadku niepowodzenia blokuje scalanie.

| Zestaw           | Sprawdza                                                               | Blokujący                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serwer MCP (110 narzędzi), autoCombo, pamięć podręczna — runner vitest | Tak                                                                                                                                             |
| `test:vitest:ui` | Testy komponentów interfejsu użytkownika — runner vitest               | **Blokujący** — istniejące wcześniej niepowodzenia są jawnie wykluczone w `vitest.config.ts`; nowe niepowodzenia powodują niepowodzenie zadania |

### Nocne przepływy pracy (zaplanowane, informacyjne)

Są uruchamiane zgodnie z harmonogramem cron (oraz przez `workflow_dispatch`), nigdy dla PR-ów. Wszystkie mają charakter informacyjny.

| Przepływ pracy         | Sprawdza                                                                                                                                                                         | Blokujący        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Testy właściwości fast-check z losowym ziarnem i dużą liczbą uruchomień                                                                                                          | **Informacyjny** |
| `nightly-resilience`   | Kontrola przyrostu sterty, wstrzykiwanie błędów typu chaos, testy obciążeniowe/długotrwałe k6                                                                                    | **Informacyjny** |
| `nightly-llm-security` | Ochrona przed wstrzyknięciami promptfoo (tryb blokowania) i sondy garak (pomijane bez sekretu dostawcy)                                                                          | **Informacyjny** |
| `nightly-schemathesis` | Fuzzing kontraktu OpenAPI (schemathesis) względem działającego OmniRoute przy użyciu `docs/openapi.yaml` — ujawnia naruszenia specyfikacji / nieobsłużone błędy 500 (Faza 8 B.4) | **Informacyjny** |
| `nightly-mutation`     | Wynik testów mutacyjnych Stryker dla szybkiej ścieżki testów jednostkowych — mutacje, które przetrwały, ujawniają słabe asercje                                                  | **Informacyjny** |
| `nightly-compat`       | Macierz zgodności silnika Node dla obsługiwanych zakresów `engines.node`                                                                                                         | **Informacyjny** |

---

## Faza szybkości (2026-08-30 → v4.0 LTS): każdy poziom bazowy poluzowany o 20%

Decyzja właściciela (2026-08-30): do czasu modularyzacji w v4.0 szybkość dostarczania jest ważniejsza
niż utrzymywanie długu na dotychczasowym poziomie. Każdy **liczbowy** bazowy próg zapadkowy został
poluzowany o 20% w ramach jednej audytowalnej operacji, a faza jest zadeklarowana w
`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Co się zmieniło                                                                                                                                                                                                                                                  | Gdzie                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — liczby, dla których mniej znaczy lepiej, ×1.2; wartości procentowe, dla których więcej znaczy lepiej, ÷1.2 (minimalne pokrycie pozostaje na poziomie 60, `eslintErrors` nadal wynosi 0, `eslintWarnings` 0 → 20% zamrożonej liczby wyciszeń) | `quality-baseline.json` (uwaga `_relax_velocity_2026_08_30` zawiera wszystkie zmiany przed → po)       |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, każdy limit wierszy `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                         | `file-size-baseline.json`                                                                              |
| liczby dla poszczególnych plików / kodu TS ×1.2                                                                                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` ma charakter doradczy, gdy `_policy.requireTighten === false`                                                                                                                                                                                | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nocne zadanie `bank-ratchet-shrinks` zostaje wstrzymane (zapisałoby zmierzony spadek i zniwelowało zapas)                                                                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Listy dozwolonych wyjątków (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nie** są budżetami i nie zostały zmienione. Bramy zasad typu zaliczone/niezaliczone (sekrety, reguły SQL,
zgodność dokumentacji ze środowiskiem, spójność i18n, testy jednostkowe) pozostają bez zmian — niezaliczony test nadal oznacza niezaliczony test.

**Narzędzia**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorazowe
  poluzowanie (`scripts/quality/relax-baselines.mjs`); odmawia ponownego uruchomienia z tą samą
  notatką.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mierzy każdą bramę liczbową w taki sam sposób jak CI i wyświetla pozostały zapas dla każdej bramy
  (`scripts/quality/baseline-headroom.mjs`). Nocne zadanie `baseline-headroom` publikuje
  tabelę w aktualizowanym zgłoszeniu **📈 Zapas poziomów bazowych (faza szybkości)** i dodaje etykietę
  `headroom-alert`, gdy dowolna brama znajduje się w granicach 10% swojego limitu lub już go przekracza. To zgłoszenie
  stanowi wczesne ostrzeżenie: budżet wyczerpujący się w ciągu kilku dni oznacza, że poluzowanie jest zużywane przez
  kilka PR-ów, a nie przez cały zespół — sprawdź uwagi `_rebaseline_*` dotyczące problematycznej bramy.

**Tryb nowego kodu (Clean-as-You-Code) — od 2026-08-30, tylko szybka ścieżka PR**

Przy zdarzeniach `pull_request` plik `quality.yml` przekazuje `--base-ref <PR base SHA>` do `check:file-size`,
`check:complexity-ratchets` i `check:dead-code`. W tym trybie brama porównuje HEAD z bazą
scalania **wyłącznie w odniesieniu do plików zmodyfikowanych przez PR** (`scripts/check/newCodeMode.mjs`:
baza scalania jest materializowana w tymczasowym `git worktree`, ESLint/knip są uruchamiane w nim oraz na HEAD,
a liczby dla poszczególnych plików są porównywane):

- **blokujące** — PR dodał naruszenia złożoności cyklomatycznej/kognitywnej lub martwe eksporty w zmienionych plikach
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` w dzienniku);
- **doradcze** — globalna suma względem zamrożonego poziomu bazowego. Odziedziczone odchylenia nigdy nie powodują
  niezaliczenia niewinnego PR-u; odchylenia są ponownie zamrażane podczas uzgadniania wydania i monitorowane przez zadanie sprawdzające zapas.

Uruchomienia `workflow_dispatch`, kontrola release-green oraz nocne zadanie sprawdzające zapas nie mają bazy PR
i zachowują porównanie bezwzględne (globalne). Pokrycie, duplikacja i pokrycie typami pozostają na razie globalne
(ich narzędzia nie generują tanio różnic dla poszczególnych plików) — są kandydatami do takiego samego podejścia.

**Zamknięcie fazy w v4.0 (LTS = bardziej rygorystyczne niż wcześniej, a nie „powrót do normy”)**

1. Na czystym wierzchołku `release/v4.0.0`: uruchom `npm run quality:headroom --json` w celach ewidencyjnych, a następnie
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` oraz
   `--update` dla każdej bramki kontroli typów — każda wartość bazowa zostanie obniżona do wartości zmierzonej.
2. Usuń `_policy` z `quality-baseline.json` (ponownie aktywuje `--require-tighten` i nocne
   akumulowanie), przywróć `THRESHOLD = 36` (lub wyższy) w `check-openapi-coverage.mjs`.
3. Zaostrz limity poniżej zmierzonych wartości tam, gdzie modularyzacja przyniosła efekty: przywróć `cap` rozmiaru pliku do 1000
   (lub 800), zwiększ minima pokrycia o 5, ustaw liczbę martwych eksportów na 0 dla zmodularyzowanych pakietów.

## Bazowy poziom mechanizmu zapadkowego (`quality-baseline.json`)

Mechanizm zapadkowy (`scripts/quality/check-quality-ratchet.mjs`) odczytuje plik `quality-baseline.json`
i porównuje go ze świeżo zebranym plikiem `quality-metrics.json`. Każda metryka, która pogorszy się
o wartość większą niż jej epsilon, powoduje niepowodzenie kompilacji.

Obecnie śledzone metryki:

| Metryka               | Kierunek | Znaczenie                                 |
| --------------------- | -------- | ----------------------------------------- |
| `eslintWarnings`      | `down`   | Liczba ostrzeżeń ESLint nie może wzrosnąć |
| `coverage.statements` | `up`     | Pokrycie instrukcji nie może spaść        |
| `coverage.lines`      | `up`     | Pokrycie wierszy nie może spaść           |
| `coverage.functions`  | `up`     | Pokrycie funkcji nie może spaść           |
| `coverage.branches`   | `up`     | Pokrycie gałęzi nie może spaść            |

Aby zaktualizować poziom bazowy po rzeczywistej poprawie:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flaga `--update` zapisuje bieżące zmierzone wartości w pliku `quality-baseline.json`.
Zatwierdź ten plik razem ze zmianą, która poprawiła metrykę. PR, który poprawia
metrykę bez aktualizacji poziomu bazowego, zostanie wykryty przez `--require-tighten` (Faza 6A.5,
oczekuje na implementację).

### Mechanizm zapadkowy CodeQL: częstotliwość odświeżania i ręczne wyzwalanie

`check:codeql-ratchet` odczytuje **stan repozytorium, odświeżany zgodnie z harmonogramem — nie dla każdego PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` raportuje
`state: configured`, `schedule: weekly`: jest to skan domyślnej konfiguracji GitHub, a nie analiza
wykonywana przy każdym wysłaniu zmian. Konsekwencja: po scaleniu PR, który NAPRAWIA alerty, mechanizm zapadkowy nadal odczytuje
starą, wyższą liczbę aż do uruchomienia następnego zaplanowanego skanowania — dlatego raportuje regresję
dla każdego otwartego PR, w tym dla kolejnych zmian dotyczących naprawiającego PR, dopóki wyniki skanowania nie zostaną zaktualizowane.

**Ręczne odświeżenie**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponownie uruchamia
analizę i w ciągu kilku minut ponownie publikuje alerty. Najpierw przeczytaj `.github/workflows/codeql.yml`
— jego nagłówek wyjaśnia, że używa wyłącznie `workflow_dispatch` **ponieważ powoduje konflikt z
„konfiguracją domyślną” GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Przywrócenie wyzwalaczy `push`/`pull_request`/
`schedule` wymaga najpierw **działania właściciela**: Settings → Code security →
CodeQL: Default → Advanced. Nie dodawaj wyzwalacza `schedule:` bez tego przełączenia — będzie
on jedynie powodował nieudane uruchomienia.

**Zaostrz poziom bazowy po spadku liczby** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapisuje nową zmierzoną liczbę w `quality-baseline.json` →
`metrics.codeqlAlerts.value`, dzięki czemu mechanizm zapadkowy nie dopuści po cichu do regresji z powrotem
do starego limitu. Przykład (2026-09-02/03): PR #12502 naprawił 7 rzeczywistych alertów
(13 → 6 zmierzonych otwartych alertów); PR #12530 zaostrzył zamrożony poziom bazowy z 11 → 6, aby był zgodny z wynikiem; pozostałe
6 alertów zostało następnie odrzuconych z indywidualnym uzasadnieniem, co zmniejszyło ich liczbę do 0 otwartych alertów.

**Decyzja o odrzuceniu alertów należy do operatora (Twarda reguła #14)** — nigdy nie odrzucaj alertu CodeQL
bez zapisania technicznego uzasadnienia w komentarzu odrzucenia: `won't fix` w przypadku
wymagania protokołu nadrzędnego, `used in tests` w przypadku danych testowych, `false positive`
w przypadku mechanizmu oczyszczania danych, którego CodeQL nie potrafi wykryć (precedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Zasady ponawiania testów (WS5.4, v3.8.49)

Ponawianie jest konfigurowane osobno dla każdego runnera, nigdy globalnie — globalne ponawianie zamienia rzeczywiste regresje
w niewidoczne niestabilności:

| Runner           | Zasada                                                                                                                                            | Dlaczego                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | `retries: 1` wyłącznie w CI, z `trace: on-first-retry`                                                                                            | Czas wykonania operacji przeglądarki/sieci jest rzeczywiście niedeterministyczny; jedno ponowienie ze śladem zamienia niestabilność w artefakt możliwy do zdiagnozowania |
| Vitest           | BEZ globalnego ponawiania. Test o potwierdzonej niestabilności otrzymuje jawne ponawianie na poziomie testu (widoczne w diffie i sprawdzane w PR) | Utrzymuje listę kwarantanny w repozytorium, nigdy jako nieprzejrzystą konfigurację                                                                                       |
| node:test (unit) | BEZ ponawiania, bez wyjątków                                                                                                                      | Niestabilny test jednostkowy oznacza błąd w teście — napraw go, zamiast uruchamiać ponownie                                                                              |

Docelowe SLO po wdrożeniu telemetrii niestabilności (WS5.2/5.3): współczynnik niestabilności <1% na test
(próg „napraw teraz”), współczynnik powodzenia ≥95% na potok. Wartości referencyjne z branży —
należy je ponownie skalibrować na podstawie własnych pomiarów.

## Dryf limitów zapadkowych na poziomie wydania (WS5.5, v3.8.49)

Gdy limit zapadkowy (rozmiar pliku, złożoność, ostrzeżenia eslint) ulega regresji na CZYSTYM końcu
gałęzi wydania — tj. regresję spowodowała KOMBINACJA scaleń, a żaden pojedynczy PR nie odtwarza jej
na własnej gałęzi — za poprawkę odpowiada **release captain, jednorazowo, na gałęzi
wydania**: preferuj wydzielenie/refaktoryzację; ponownie ustaw wartość bazową tylko wraz z udokumentowanym
uzasadnieniem. Nigdy nie przenoś dryfu kombinacji na PR kontrybutora i nigdy
nie ustawiaj ponownie wartości bazowej dla każdego PR (ukrywa to rzeczywiste regresje). Najpierw rozstrzygnij przyczynę: odtwórz
błąd na czystym końcu gałęzi w roboczym worktree kontrolnym, zanim uznasz, że spowodował go Twój PR.

## Utrwalanie obniżeń limitów zapadkowych — kierunek w dół (#8584)

Mechanizm zapadkowy jest automatyczny tylko w połowie — i to w niewłaściwej połowie. **Podniesienie** limitu to
ręczna edycja JSON, która zajmuje dziesięć sekund i jest najszybszym sposobem na odblokowanie PR z błędem.
**Obniżenie** limitu wymaga uruchomienia `--update` i zatwierdzenia wyniku przez kogoś — a do czasu
wdrożenia zadania `bank-ratchet-shrinks` żaden workflow tego nie wykonywał. Zmierzony skutek
(2026-07-25): 18 zamrożonych plików miało już nie więcej niż limit 800 wierszy dla nowych plików, przy czym najgorszy
przypadek wynosił 132× (`src/shared/validation/schemas.ts`, 19 wierszy z limitem 2 523); pułap
złożoności wzrósł z `1794 → 2169` w około 37 notatkach o ponownym ustawieniu wartości bazowej, przy dokładnie jednym
obniżeniu (−1); a zapis „zaostrz przez `--update` w następnym cyklu” pojawił się 31 razy i został
zrealizowany raz. Limit, który pozostaje po usunięciu kodu będącego jego przyczyną, po cichu zamienia każdy ukończony
podział kodu w przyzwolenie na jego rozrost dla kolejnej osoby edytującej dany plik.

`nightly-release-green.yml` → zadanie **`bank-ratchet-shrinks`** zamyka tę pętlę:

|              |                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Uruchamianie | `schedule` (3× dziennie) + `workflow_dispatch` — celowo **bez** `push`                                                |
| Pomiar       | najwyższa gałąź `release/vX.Y.Z`, z taką samą metodą rozstrzygania i ochroną przed wstrzyknięciem jak `release-green` |
| Zapis        | `check:file-size --update` i `check:complexity-ratchets --update` (oba z założenia mogą wyłącznie obniżać wartości)   |
| Weryfikacja  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                              |
| Dostarczanie | jeden zawsze aktualny PR kierowany do gałęzi wydania — aktualizowany wymuszeniem, bez tworzenia spamu                 |

Utrwalanie odbywa się partiami, a nie przy każdym pushu, ponieważ nie ma wymagań dotyczących opóźnienia (obniżenie
utrwalone w ciągu 8 godzin jest wystarczające), natomiast uruchamianie po każdym scaleniu wielokrotnie przebudowywałoby gałąź PR
podczas serii scaleń i za każdym razem ponosiłoby koszt pełnego przebiegu ESLint. Wykrywanie nadal odbywa się
przy pushu (`release-green`); partiami wykonywane jest wyłącznie utrwalanie.

### Weryfikator bezpieczeństwa

Zadanie zapisuje zmiany w wartościach bazowych bez nadzoru, dlatego `verify-ratchet-bank.mjs` zapewnia
bezpieczeństwo tego procesu. Porównuje drzewo po wykonaniu `--update` z `HEAD` i **przerywa zadanie
przed utworzeniem jakiegokolwiek commita** — bez otwierania PR — chyba że każda zmiana jest jednym z poniższych przypadków:

- wartość liczbowa `frozen` / `testFrozen` została **obniżona** lub **usunięta**
- `complexity-baseline.json` → `count` została **obniżona**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` została **obniżona**

Wszystko inne powoduje błąd: podniesienie liczby, dodanie wpisu, zmiana `cap`/`testCap` lub
usunięcie/przepisanie notatki `_rebaseline_*` (notatki te stanowią ślad audytowy wyjaśniający, dlaczego każdy
pułap istnieje, i są przechowywane w tym samym obiekcie `frozen` co wpisy plików).
Bot, który mógłby podnieść limit, byłby zdecydowanie gorszy niż obecny stan. Zabezpieczenie przed regresją:
`tests/unit/verify-ratchet-bank.test.ts`.

Zadanie nigdy nie wykonuje pushu do `release/*` — PR scala człowiek, więc błędny pomiar
nie może zostać wdrożony bez przeglądu.

## Zasady listy dozwolonych elementów

Każda bramka, która nie może zakończyć się niepowodzeniem z powodu wcześniej istniejących naruszeń, korzysta z zamrożonej listy dozwolonych elementów
(np. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Obowiązuje następująca zasada:

**Napraw główną przyczynę; używaj listy dozwolonych elementów tylko wtedy, gdy naruszenie istniało wcześniej i
nie można go naprawić w tym samym PR.**

Podczas dodawania wpisu do listy dozwolonych elementów:

1. Dołącz komentarz z uzasadnieniem.
2. Podaj odwołanie do zgłoszenia śledzącego (np. `// #3498 — Funkcja z fazy 2, jeszcze niezaimplementowana`).
3. Usuń wpis w tym samym PR, który naprawia naruszenie — nieaktualny wpis, który nie
   wycisza już aktywnego naruszenia, sam jest defektem (mechanizm wykrywania nieaktualnych reguł 6A.3
   spowoduje niepowodzenie bramki z powodu osieroconego wpisu na liście dozwolonych elementów, gdy zostanie zaimplementowany).

**Nie** dodawaj wpisów do listy dozwolonych elementów po to, aby testy przechodziły szybciej. Zielona bramka przy rosnącej
liście dozwolonych elementów daje fałszywe poczucie jakości.

### Gdy bramka nie przechodzi dla Twojego PR

1. **Uważnie przeczytaj dane wyjściowe bramki** — wskazują one dokładnie, który plik lub symbol naruszył
   regułę.
2. **Napraw naruszenie** — większość bramek to deterministyczne kontrole systemu plików, które przechodzą, gdy tylko
   kod jest poprawny.
3. **Jeśli naruszenie istniało wcześniej** (tj. nie zostało wprowadzone przez Ciebie, ale bramka zaczęła je teraz
   obejmować): dodaj wpis do listy dozwolonych elementów wraz z komentarzem uzasadniającym i odwołaniem do zgłoszenia śledzącego.
4. **Jeśli bramka działa jako mechanizm zapadkowy** (pokrycie, ostrzeżenia ESLint, duplikacja, złożoność):
   Twoja zmiana pogorszyła wskaźnik. Napraw problem będący jego przyczyną albo (w rzadkich przypadkach) uruchom
   `npm run quality:ratchet -- --update`, jeśli zmiana jest celowa, a pogorszenie
   wskaźnika jest akceptowalne — wyjaśnij jednak przyczynę w opisie PR.
5. **Bramki doradcze** (`continue-on-error: true`) mają charakter informacyjny — nie blokują
   scalania, ale pojawiają się w podsumowaniu CI. Mimo to je napraw.

---

## Dodawanie nowej bramki

1. Utwórz `scripts/check/check-<name>.mjs` (lub `.ts`). Bramki zasad zwracają kod wyjścia 0/1.
   Bramki typu zapadkowego zapisują wskaźnik w `quality-metrics.json` za pośrednictwem `collect-metrics.mjs`.
2. Dodaj `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
3. Podłącz ją w `.github/workflows/ci.yml` w odpowiednim zadaniu
   (zasady → `lint` lub `docs-sync-strict`; zapadka → `quality-gate`).
4. Jeśli korzysta z listy dozwolonych elementów, zastosuj `reportStaleEntries()` z
   `scripts/check/lib/allowlist.mjs`, aby nieaktualne wpisy były wykrywane automatycznie.
5. Napisz test w `tests/unit/build/` obejmujący logikę wykrywania bramki.
6. Zaktualizuj ten dokument (dodaj wiersz do tabeli odpowiedniego zadania).

---

## Narzędzia dla agentów: LSP w pętli (opcjonalne)

Poza bramkami CI OmniRoute udostępnia **opcjonalny** szkielet `agent-lsp`
(plik `.mcp.json` na poziomie projektu, faza 7, zadanie 15). Utwórz `.mcp.json`,
aby udostępnić agentom programistycznym serwer języka TypeScript, dzięki czemu będą rozwiązywać symbole /
diagnostykę **przed** napisaniem kodu — jest to działające według zasady „najpierw kompilacja, potem deklaracja” uzupełnienie
`typecheck:core`, które eliminuje błędy „wymyślonych symboli” u źródła. Celowo
nie jest ładowany automatycznie (to Ty wybierasz i weryfikujesz most MCP↔LSP); nieprawidłowy wpis jedynie rejestruje
błąd połączenia i nigdy nie zakłóca sesji.

---

## Rejestr racjonalizacji (przegląd ROI — Etap 9, Fala 3)

Ten wykaz uzgodniono z `ci.yml` w dniu 2026-06-17 (w poprzedniej wersji pominięto
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Przegląd ROI uzgodnionego zestawu
wskazał następujących kandydatów do racjonalizacji. **Scalenia są mechanicznymi zmianami
CI; przełączenia/usunięcia są decyzjami dotyczącymi zasad, zastrzeżonymi dla operatora.** Żadna
z poniższych zmian nie została jeszcze zastosowana.

**Pominięte również powyżej** (doradcze, słaby sygnał): zadanie `docs-lint`
(markdownlint + Vale, całe zadanie z `continue-on-error`) oraz samodzielne przepływy pracy skanerów
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Wartość `semgrepFindings: 0` znajduje się w
`quality-baseline.json`, ale nie jest powiązana z blokującym mechanizmem zapadkowym w `ci.yml` — ta metryka
jest obecnie osierocona.

### Scalanie / deduplikacja (mechaniczne, niższe ryzyko)

Każdego kandydata zweryfikowano względem bieżącego stanu bramek w dniu 2026-06-17 (ufaj, ale sprawdzaj);
okazało się, że kilka „oczywistych” scaleń ukrywa dług i **nie** nadaje się do bezpośredniego zastosowania.

- **`check:docs-sync` uruchamia się dwukrotnie** — samodzielnie w zadaniu `lint` oraz ponownie wewnątrz `check:docs-all` (`docs-sync-strict`) i haka husky pre-commit. ✅ **GOTOWE** — usunięto samodzielne wywołanie w `lint`.
- **Skanowanie CVE** — ❌ **NIE jest to proste scalenie.** `audit:deps` kończy się twardym błędem przy każdej luce CVE o wysokiej/krytycznej wadze; `check:vuln-ratchet` (osv) kończy się błędem tylko w przypadku _regresji_ względem poziomu bazowego (obecnie 1 MODERATE). Odmienna semantyka — usunięcie `audit:deps` oznaczałoby utratę bezwzględnej bramki dla luk o wysokiej/krytycznej wadze. Zachować oba.
- **Wykrywanie cykli** — ❌ **NIE jest to proste scalenie.** `check:circular-deps` (dpdm) zgłasza **91 cykli** (dlatego ma charakter doradczy); nie można nadać mu statusu blokującego bez ich uprzedniego rozwiązania, a jego zakres jest szerszy niż w przypadku zielonego, starannie dobranego `check:cycles`. Zachować `check:cycles` jako blokujące; rozwiązanie 91 cykli dpdm stanowi osobną pozycję rejestru.
- **Złożoność** — ✅ **GOTOWE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedno przejście ESLint, zliczanie według ruleId, dzięki czemu bazowe wartości złożoności cyklomatycznej+max-lines oraz złożoności poznawczej pozostają niezależne; poszczególne `check:complexity` / `check:cognitive-complexity` pozostają dostępne do lokalnego użycia z `--update`.
- **Ochrona `/api` przed halucynacjami** — ✅ **GOTOWE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedna inwentaryzacja FS katalogu `src/app/api`, openapi-routes + docs-symbols nadal raportują niezależnie; poszczególne polecenia pozostają dostępne do lokalnych uruchomień.
- **`check:node-runtime` uruchamia się w 11 zadaniach** — ⚠️ **niski ROI.** Każde działa na osobnym runnerze, a kontrola trwa <1s; łączna oszczędność wyniosłaby ~10s kosztem utraty niedrogiej ochrony dla każdego zadania. Nie warto powodować zamieszania.
- **`typecheck:noimplicit:core` w lintowaniu CI** — ✅ **usunięto z zadania lint** (miało charakter doradczy z `continue-on-error`); blokujący zakres kontroli typów zapewniają `typecheck:core` + `check:type-coverage`. Zachowano skrypt lokalny.

### Przełączenie / decyzja (zasady operatora)

- `check:openapi-security-tiers` (doradcze) — ❌ **NIE można go bezpośrednio przełączyć.** Kończy się kodem 0, ale ostrzega, że kilka tras `traffic-inspector` w ramach `LOCAL_ONLY_API_PREFIXES` nie ma adnotacji `x-loopback-only: true`. Wymuszenie tej kontroli wymaga najpierw dodania tych adnotacji do `openapi.yaml`.
- `typecheck:noimplicit:core` (doradcze) — w dużej mierze zastąpione przez blokujący mechanizm zapadkowy `check:type-coverage`. Przełączyć na mechanizm zapadkowy albo usunąć redundantne drugie przejście `tsc`.
- `test:vitest:ui` (obecnie **blokujące**) — wcześniej istniejące błędy są jawnie wykluczone w `vitest.config.ts` za pomocą komentarzy śledzących `// #8618`; nowe błędy powodują niepowodzenie zadania.
- `check:secrets` (gitleaks, blokujący mechanizm zapadkowy zamrożony na poziomie 3 udokumentowanych wyników fałszywie dodatnich) — dodać te 3 przypadki do listy dozwolonych, aby osiągnąć 0, albo obniżyć status do doradczego. Pokrywa się z natywnym skanowaniem sekretów GitHub + `check:public-creds`.
- `check:pr-evidence` (blokujące, przeszukuje tekst opisu PR) — wysokie ryzyko wyników fałszywie dodatnich; usunięcie osłabi egzekwowanie Twardej Reguły nr 18, więc jest to rzeczywista decyzja dotycząca zasad.
- `semgrep` (samodzielne, doradcze) — pokrywa się z CodeQL w zakresie kategorii OWASP; powiązać jego poziom bazowy z mechanizmem zapadkowym albo usunąć.

---

## Powiązana dokumentacja

- Łańcuch dostaw (pochodzenie, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — bramka zgodności zestawów kluczy

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadanie `i18n-ui-coverage`).
Porównuje zestaw kluczy-liści każdego pliku `src/i18n/messages/<locale>.json` z `en.json` i zgłasza
błąd w przypadku każdego brakującego lub nadmiarowego liścia, niezależnie od tego, kiedy klucz został dodany. Symbole zastępcze
`__MISSING__:` liczą się jako obecne (ich zawartość należy do zakresu odpowiedzialności bramki proporcji). Jest to bezwzględne uzupełnienie
dwóch bramek opartych na różnicach/procentach: `check-ui-keys-coverage` wymusza próg 80% dla każdej
lokalizacji (43 brakujące klucze spośród ~13 000 nadal daje wynik 99,7%), a `check-new-key-coverage` ocenia
wyłącznie klucze dodane przez PR do `en.json`. Partia lokalizacji jest generowana na podstawie `en.json` z dnia
utworzenia jej gałęzi i tłumaczona przez wiele dni, podczas gdy baza nadal otrzymuje nowe klucze; PR z partią sam
nie dodaje żadnego klucza, dlatego obie siostrzane bramki milczały, gdy partia 1 (#13044) została scalona z niedoborem 43 kluczy w dziewięciu
lokalizacjach, a partia 2 (#13660) z niedoborem 10 kluczy w ośmiu (2026-09-15). Błąd bramki można naprawić za pomocą
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; liść `extra`
oznacza, że usunięto go ze źródła — należy usunąć go również z lokalizacji. `--warn` raportuje bez zgłaszania błędu.
`--catalog=cli` wykonuje to samo porównanie dla `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroki znajdują się w zadaniu `i18n-ui-coverage`.

#### `check-new-key-coverage` — bramka i18n dla nowych kluczy

Siostrzana bramka `check-ui-value-drift`. Tamta wykrywa angielską wartość, która została **przepisana**,
podczas gdy jej tłumaczenia pozostawiono bez zmian; ta wykrywa angielski klucz, który został **dodany**,
ale nigdy nie trafił do niektórych lokalizacji.

`check-ui-keys-coverage` nie potrafi wykryć tej klasy problemów: wymusza próg procentowy dla każdej lokalizacji, a
jedenaście brakujących kluczy spośród ~13 000 pozostawia pokrycie na poziomie 99,9%. Procent dla danego języka nie może
wyrazić stwierdzenia „ta funkcja została wydana bez tłumaczenia” — cała funkcja może trafić do nowej lokalizacji bez żadnego
tekstu i nigdy nie zmienić tej wartości.

Incydent, który koduje ta bramka: faza 3 Orchestration Canvas przetłumaczyła jedenaście swoich kluczy na
42 lokalizacje, które istniały w tamtym czasie. Kilka godzin później partia języków UE (#13044) zwiększyła liczbę lokalizacji
w repozytorium do 51, a dziewięć nowych (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nigdy
ich nie otrzymało. `deepMergeFallback` zastępuje brakujący klucz tekstem angielskim, więc efektem był
nieprzetłumaczony interfejs, a nie pusty interfejs — rzeczywisty problem, z założenia niewidoczny.

Podobnie jak siostrzana bramka jest ona **świadoma różnic** i porównuje angielską wersję w bazie scalania z drzewem
roboczym, dzięki czemu istniejące wcześniej braki pozostają zamrożone, a włączenie bramki nie wymagało migracji.

**Znacznik `__MISSING__:<english>` nie spełnia wymagań tej bramki (od 2026-09-17).** Wcześniej stanowił on
udokumentowany sposób odroczenia — środowisko wykonawcze używa prawidłowego tekstu angielskiego jako wartości zastępczej — dopóki osiem PR-ów z funkcjami z
2026-09-16 nie dodało 61 kluczy i nie umieściło znacznika we wszystkich 65 lokalizacjach zamiast ich przetłumaczenia: ta
bramka zaakceptowała każdy z nich, nic nie blokowało PR-ów, a blokująca bramka proporcji rzeczywistych tłumaczeń
zaczęła następnie zgłaszać błąd na końcu gałęzi wydania dla wszystkich (pt-BR 3,2% > 2,5% + 0,5). Znacznik jest teraz traktowany
jak brakujące tłumaczenie. Błąd bramki można naprawić za pomocą
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` albo
dla wszystkich lokalizacji równolegle za pomocą `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
bezpieczny po odłączeniu, odmawia uruchomienia bez zmiennych środowiskowych `OMNIROUTE_TRANSLATION_*`). Klucz, który musi pozostać
w języku angielskim (przypięta nazwa produktu/silnika/flagi), powinien znaleźć się w `scripts/i18n/untranslatable-keys.json`,
nigdy za znacznikiem. `vi` całkowicie zabrania znaczników (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — bramka odłożonych testów

Plik znajdujący się na liście `exclude` w `vitest.config.ts` jest testem, który nie jest uruchamiany, a dla osoby
przeglądającej drzewo wygląda jak element pokrycia. Za komentarzem
`// #8618 — istniejący wcześniej błąd; usuń to wykluczenie po jego naprawieniu` zgromadziły się sześćdziesiąt dwa pliki. Zgłoszenie #8618 zamknięto
2026-08-11, podczas gdy śledzona przez nie lista rozrosła się z 45 do 62 wpisów, z których każdy nowy dziedziczył komentarz
wskazujący na nieaktywne zgłoszenie. Gdy w końcu sprawdzono listę plik po pliku (#13204), **51 z 62
przechodziło pomyślnie względem bieżącego drzewa bez żadnych zmian w kodzie źródłowym**.

Bramka wymaga, aby każde wykluczenie wskazujące na rzeczywisty plik (a) wymieniało zgłoszenie śledzące oraz
(b) znajdowało się w `config/quality/vitest-exclusions.json` wraz ze zmierzonym stanem, dzięki czemu dodanie takiego wpisu jest
różnicą podlegającą przeglądowi w dedykowanym pliku, a nie kolejnym wierszem w tablicy zawierającej 60 wpisów. Bramka celowo
nie uruchamia ponownie wykluczonych testów — kosztuje to ~10 minut i należy do zadania okresowego;
inwentarz rejestruje datę ostatniego pomiaru każdego z nich.
