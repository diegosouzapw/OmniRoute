# Merge Queue & Manual Merge-Train Runbook (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od wersji v3.8.49 (WS3.2/WS3.4 planu jakości/szybkości) domyślną ścieżką scalania
zrecenzowanych PR-ów do `release/vX.Y.Z` jest **kolejka scalania Mergify** (`.mergify.yml`);
opisana poniżej **ręczna kolejka scalania** jest rozwiązaniem AWARYJNYM — używanym podczas incydentów,
zamrożeń wydań lub w przypadku zmiany planu Mergify Open Source.

## Ścieżka domyślna: kolejka Mergify

1. PR zostaje zrecenzowany i otrzymuje zielony status od kampanii oraz akceptację w ramach należącej do właściciela
   bramki ⭐ poprzedzającej scalanie (raport + decyzja dla każdego elementu — zobacz `/merge-prs`, krok 0.75).
2. Właściciel (lub sesja działająca na podstawie decyzji właściciela) dodaje etykietę **`queue`**.
   Etykieta JEST zgodą na scalenie; Mergify jedynie ją wykonuje.
3. Mergify grupuje maksymalnie 10 PR-ów oczekujących w kolejce, weryfikuje partię przy użyciu szybkich bramek
   i scala ją (squash). Partia z czerwonym statusem jest **automatycznie dzielona na połowy** — problematyczny PR
   zostaje wyizolowany po około log2(N) ponownych walidacjach i usunięty z kolejki; pozostałe są kontynuowane.
4. Po scaleniu przepływ pracy ciągłej weryfikacji zielonego stanu wydania sprawdza nowy wierzchołek po wypchnięciu
   zmian i otwiera zgłoszenie z informacją o pochodzeniu problemu, jeśli połączenie zmian spowodowało regresję (nigdy nie wykonuje automatycznego wycofania).

Zabezpieczenia (odzwierciedlają twarde reguły nr 21/22 z `CLAUDE.md`):

- **Aktywne zamrożenie wydania** → NIE dodawaj etykiet do PR-ów kierowanych do zamrożonej gałęzi; najpierw zmień ich cel na
  aktywną gałąź `release/vX+1`.
- **PR w toku należący do innej sesji** → nigdy nie dodawaj do niego etykiety; tylko sesja będąca właścicielem umieszcza
  własną pracę w kolejce.
- PR-y zawierające wyłącznie zmiany w testach oraz PR-y z etykietą `hotfix` już uruchamiają ograniczony zestaw CI (zobacz
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); warunki kolejki akceptują dowolny
  faktycznie uruchomiony zestaw kontroli (`#check-failure=0` + `#check-pending=0`).

## Rozwiązanie awaryjne: ręczna kolejka scalania

Używana, gdy kolejka jest niedostępna. Formalizuje praktykę, dzięki której podczas
cyklu v3.8.47 scalono 33 PR-y w ciągu jednego dnia:

1. **Zbierz partię** (~10–30 zrecenzowanych i zaakceptowanych PR-ów). Sprawdź kolizje `linked:`
   (te same `tap.testFiles`, te same fragmenty CHANGELOG-u) i przetwarzaj takie PR-y sekwencyjnie.
2. **Przeprowadź walidację RAZ**: w odizolowanym drzewie roboczym utworzonym od wierzchołka gałęzi wydania scal lokalnie wszystkie
   wierzchołki z partii, a następnie uruchom zestaw równoważny wydaniu
   (`npm run check:release-green`; przed wydaniem dodaj `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatyzuje kroki 1–2 (PR-y powodujące konflikty
   są usuwane, a kolejka jest kontynuowana). Tryb pełny uruchamia `npm run test:unit` — dostrojony
   do maszyny moduł uruchamiający (`--test-concurrency=20`), **a nie** dwa sekwencyjne fragmenty CI
   wykorzystujące po 4 rdzenie, przez które dominująca faza używała około 25% maszyny 16-rdzeniowej (naprawiono
   2026-07-18). `--fast` (opróżnianie dużych kolejek w ciągu dnia, zatwierdzone przez właściciela 2026-07-18)
   zachowuje każdą bramkę statyczną + vitest, ale uruchamia wyłącznie pliki node:test zmienione przez
   dołączone PR-y; PEŁNY zestaw musi mimo to zostać uruchomiony co najmniej raz dziennie na
   skumulowanym wierzchołku (jedna kolejka bez `--fast`).
3. **Zielony status** → scal PR-y po kolei (przed każdym ponownie sprawdzając `state,headRefOid` —
   PR, którego wierzchołek się zmienił, wraca do recenzji). Potwierdź, że wynikowa różnica każdego scalenia stanowi
   wyłącznie zmianę z danego PR-a (bez automatycznego rozwiązywania konfliktów przez wycofywanie zmian: sprawdź `git diff --stat` pod kątem
   usunięć wykraczających poza zakres).
4. **Czerwony status** → dziel partię na połowy (weryfikując każdą połowę), zamiast ponownie weryfikować
   każdy PR osobno; odłóż problematyczny PR z powrotem do kolejki recenzji wraz z dowodami.
5. **Nigdy**: nie scalaj podczas zamrożenia z zamrożoną gałęzią; nie używaj nigdzie `git stash`;
   nie uruchamiaj ponownie całego CI z nadzieją, że czerwony status zniknie (reguła: czerwony status to informacja).

## Poziomy (dlaczego kolejka jest bezpieczna przy użyciu wyłącznie szybkich bramek)

- **Dla każdego PR-a** (szybkie bramki quality.yml): testy objęte TIA + pełne testy jednostkowe w 4 fragmentach +
  vitest + zestaw kontroli lintowania + kontrola typów + integralność dokumentacji/CHANGELOG-u.
- **Dla każdej partii/wierzchołka** (ciągła weryfikacja zielonego stanu wydania): TWARDE bramki `--quick` przy każdym wypchnięciu zmian do
  gałęzi wydania; pełne przebiegi `--with-build --full-ci` 3× dziennie.
- **Dla każdego wydania** (ci.yml w PR-ze wydania): kompletna macierz, w tym E2E ×9,
  package-artifact + test uruchomieniowy paczki tarball, pokrycie/progi zapadkowe.

Nic nie jest weryfikowane w mniejszym zakresie niż wcześniej — obciążające testy są po prostu uruchamiane dla każdej partii/wierzchołka,
zamiast dla każdego PR-a, co eliminuje O(N) rund oczekiwania.
