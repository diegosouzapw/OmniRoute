# Merge Queue & Manual Merge-Train Runbook (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od wersji v3.8.49 (WS3.2/WS3.4 planu jakości/szybkości) domyślną ścieżką scalania
zrecenzowanych PR-ów do `release/vX.Y.Z` jest **kolejka scalania Mergify** (`.mergify.yml`);
opisany poniżej **ręczny merge train** stanowi ROZWIĄZANIE AWARYJNE — używane podczas incydentów,
zamrożeń wydań lub w przypadku zmiany planu Mergify Open Source.

## Domyślna ścieżka: kolejka Mergify

1. PR zostaje sprawdzony/otrzymuje zielony status w ramach kampanii i zatwierdzony przez należącą do właściciela bramkę ⭐
   przed scaleniem (raport + decyzja dla każdej pozycji — zobacz krok 0.75 w `/merge-prs`).
2. Właściciel (lub sesja działająca na podstawie decyzji właściciela) nadaje etykietę **`queue`**.
   Etykieta JEST zgodą na scalenie; Mergify jedynie je wykonuje.
3. Mergify weryfikuje PR-y w kolejce **sekwencyjnie** (pojedynczo) względem szybkich bramek
   i scala je (squash). Grupowanie + automatyczna bisekcja wymagają płatnego planu Mergify
   („Cannot use Merge Queue batch” w bezpłatnym planie, #7220), dlatego `.mergify.yml` nie ustawia
   `batch_size`; grupowanie pozostaje zadaniem ręcznego procesu merge-train opisanego poniżej. PR, którego
   testy nadal oczekują po upływie `checks_timeout` (240 min = 2× zmierzony p95 dla
   `quality.yml`), zostaje usunięty z kolejki, zamiast ją blokować.
4. Po scaleniu ciągły workflow weryfikacji wydania sprawdza nowy najnowszy commit po pushu
   i otwiera issue wskazujące źródło problemu, jeśli dana kombinacja spowodowała regresję (nigdy nie wykonuje automatycznego revertu).

Zabezpieczenia (odzwierciedlają Twarde reguły #21/#22 z `CLAUDE.md`):

- **Aktywne zamrożenie wydania** → NIE nadawaj etykiet PR-om kierowanym do zamrożonej gałęzi; najpierw
  zmień ich gałąź docelową na aktywną `release/vX+1`.
- **PR innej sesji będący w toku** → nigdy nie nadawaj mu etykiety; tylko sesja będąca właścicielem dodaje
  własną pracę do kolejki.
- Zmiany obejmujące wyłącznie testy oraz PR-y z etykietą `hotfix` już korzystają z ograniczonego CI (zobacz
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); warunki kolejki akceptują dowolny zestaw
  testów, który faktycznie został uruchomiony (`#check-failure=0` + `#check-pending=0`).

## Rozwiązanie awaryjne: ręczny merge train

Używane, gdy kolejka jest niedostępna. Formalizuje praktykę, dzięki której w ciągu jednego dnia
w cyklu v3.8.47 przetworzono 33 PR-y:

1. **Zbierz grupę** (~10–30 zrecenzowanych i zatwierdzonych PR-ów). Sprawdź kolizje `linked:`
   (te same `tap.testFiles`, te same fragmenty CHANGELOG-u) i przetwarzaj je sekwencyjnie.
2. **Przeprowadź walidację RAZ**: w odizolowanym worktree utworzonym na wierzchołku gałęzi wydania scal lokalnie wszystkie
   wierzchołki z grupy, a następnie uruchom zestaw równoważny procesowi wydania
   (`npm run check:release-green`; przed wydaniem dodaj `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatyzuje kroki 1–2 (PR-y powodujące konflikty
   są usuwane, a merge train jest kontynuowany). Tryb pełny uruchamia `npm run test:unit` — dostrojony
   do maszyny runner (`--test-concurrency=20`), **a nie** dwa sekwencyjne, 4-rdzeniowe shardy CI,
   przez które dominująca faza wykorzystywała około 25% maszyny 16-rdzeniowej (naprawiono
   2026-07-18). `--fast` (opróżnianie dużych merge trainów w ciągu dnia, zatwierdzone przez właściciela 2026-07-18)
   zachowuje każdą bramkę statyczną oraz vitest, ale uruchamia jedynie pliki node:test zmienione przez
   PR-y dołączone do merge trainu; PEŁNY zestaw nadal musi zostać uruchomiony co najmniej raz dziennie na
   skumulowanym wierzchołku (jeden merge train bez `--fast`).
3. **Zielony status** → scal PR-y po kolei (przed każdym ponownie sprawdzając `state,headRefOid` —
   PR, którego wierzchołek się zmienił, wraca do recenzji). Udowodnij, że wynikowa różnica każdego scalenia odpowiada
   wyłącznie zmianom z danego PR-a (bez automatycznego rozwiązywania przez wycofanie zmian: sprawdź `git diff --stat` pod kątem
   usunięć wykraczających poza zakres).
4. **Czerwony status** → dziel grupę na połowy (sprawdzając każdą z nich), zamiast ponownie sprawdzać
   każdy PR osobno; odeślij powodujący problem PR do kolejki recenzji wraz z dowodami.
5. **Nigdy**: nie scalaj podczas zamrożenia z zamrożoną gałęzią; nie używaj nigdzie `git stash`;
   nie uruchamiaj ponownie całego CI z nadzieją, że czerwony status zniknie (zasada: czerwony status jest informacją).

## Poziomy (dlaczego kolejka jest bezpieczna przy użyciu wyłącznie szybkich bramek)

- **Dla każdego PR-a** (szybkie bramki quality.yml): testy zależne od wpływu według TIA + pełne testy jednostkowe w 4 shardach +
  vitest + zestaw lintowania + typecheck + kontrola integralności dokumentacji/CHANGELOG-u.
- **Dla każdej grupy/wierzchołka** (ciągły release-green): TWARDЕ bramki `--quick` przy każdym wypchnięciu zmian do
  gałęzi wydania; pełne przebiegi `--with-build --full-ci` 3× dziennie.
- **Dla każdego wydania** (ci.yml dla PR-a wydania): pełna macierz, w tym E2E ×9,
  package-artifact + test uruchomieniowy paczki tarball, coverage/ratchets.

Zakres walidacji nie jest mniejszy niż wcześniej — ciężkie testy są po prostu uruchamiane dla każdej grupy/wierzchołka,
a nie dla każdego PR-a, co eliminuje O(N) rund komunikacji.

## Wymagania wstępne świeżego checkoutu dla `merge-train.sh`

Skrypt uruchamia na głównym checkoucie **kontrolę wstępną** kończącą działanie przy pierwszym błędzie (przed jakimikolwiek operacjami
na worktree), dzięki czemu uszkodzona instalacja nigdy nie może zostać błędnie uznana za czerwony merge train:

1. Uruchom `npm ci`, a następnie skrypt postinstall pakietu `bun`, który npm blokuje:
   `(cd node_modules/bun && node install.js)` — w przeciwnym razie `check:provider-consistency`
   i `check:known-symbols` (oba używają `bun scripts/…`) zakończą się niepowodzeniem zarówno dla merge trainu, JAK I bazy,
   bez wskazania naruszenia.
2. Brak zbędnego `node_modules/node_modules` (zduplikowanego drzewa zależności; React ładuje się dwukrotnie,
   a zestawy testów interfejsu użytkownika w vitest natychmiast kończą się niepowodzeniem).
3. `node_modules/.bin/tsc` musi istnieć i być wykonywalny (brakuje go w niepełnej instalacji).

Merge train uruchamia blokujące `npm run check:cycles:ratchet`; samo `npm run check:cycles`
ma charakter informacyjny (wyświetla SCC i kończy się kodem niezerowym nawet dla prawidłowej bazy).
