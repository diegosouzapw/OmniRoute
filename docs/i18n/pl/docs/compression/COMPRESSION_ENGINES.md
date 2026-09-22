# Compression Engines (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Kompresja OmniRoute opiera się na kontraktach silników. Tryb może uruchamiać bezpośrednio jeden silnik
(`caveman` lub `rtk`) albo deterministyczny potok stosowy, który wykonuje wiele silników w określonej kolejności.

## Tryby

| Tryb         | Ścieżka silnika                          | Przeznaczone dane wejściowe                                 |
| ------------ | ---------------------------------------- | ----------------------------------------------------------- |
| `off`        | brak                                     | Dokładne zachowanie promptu                                 |
| `lite`       | Lekkie funkcje pomocnicze Caveman        | Zawsze aktywne czyszczenie niskiego ryzyka                  |
| `standard`   | Caveman                                  | Kondensacja promptów w języku naturalnym                    |
| `aggressive` | Caveman + podsumowania historii/narzędzi | Długie sesje czatu                                          |
| `ultra`      | Caveman + funkcje pomocnicze przycinania | Odzyskiwanie po osiągnięciu limitu kontekstu                |
| `rtk`        | RTK                                      | Dane wyjściowe terminala, powłoki, kompilacji, testów i git |
| `omniglyph`  | OmniGlyph                                | Kontekst jako obraz w natywnym protokole dostawcy           |
| `stacked`    | Potok, domyślnie `rtk -> caveman`        | Mieszane logi narzędzi i proza, maksymalna oszczędność      |

### Profile kompresji OmniGlyph

Silnik `omniglyph` (pakiet `omniglyph`, 1.4.0+) przyjmuje nazwany profil semantyczny, ustawiany
globalnie za pomocą `omniglyph.profile` w ustawieniach kompresji lub dla poszczególnych kroków za pomocą
konfiguracji kroku potoku stosowego:

| Profil        | Zakres                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Domyślny. Polityka użyta w opublikowanych pomiarach — przekształca system, dokumentację narzędzi i obszerną historię w obrazy |
| `balanced`    | Zachowuje aktywny stan w postaci natywnej, chroni ostatnie 8 tur i zwija starszą, zamkniętą historię                          |
| `coding-safe` | Zachowuje uprawnienia, schematy narzędzi i aktywne dane wyjściowe narzędzi w postaci natywnej oraz chroni ostatnie 12 tur     |
| `passthrough` | Przekazuje bez przekształcania; silnik jest pomijany                                                                          |

Profil stanowi **górną, a nie dolną granicę**: `mergeCompressionProfileOptions` w pakiecie
nie pozwala ustawieniom wywołującego ponownie otworzyć kanału kompresji stratnej zamkniętego przez profil, dlatego ustawienie
`preserveSystemPrompt: false` dla pojedynczego kroku nie może ponownie włączyć kompresji systemowej w profilu `coding-safe`.

Pomiary w tej bazie kodu wykazały, że profile `coding-safe` i `balanced` podnoszą `minCompressChars` do
maksymalnej wartości oraz zachowują system, schematy narzędzi i wyniki narzędzi w postaci natywnej, więc sesja, która nie
zgromadziła jeszcze historii, kończy się ze statusem `below_min_chars`, a silnik niczego nie przekształca. Z tego
powodu domyślnym profilem jest `aggressive`, a nie najbezpieczniejszy profil.

Pakiet określa własny zakres modeli i profil na podstawie swojej konfiguracji środowiskowej.
OmniRoute nigdy nie deleguje tej decyzji: adapter ogranicza bramkę modelu do najbardziej
restrykcyjnego zakresu pakietu, dlatego ustawienia środowiska hosta mogą jedynie zawężać listę dozwolonych modeli, ale nigdy
nie mogą rozszerzyć jej poza zakres potwierdzony pomiarami OmniRoute.

## Rejestr silników

Rejestr znajduje się w `open-sse/services/compression/engines/registry.ts`. Silniki udostępniają wspólny
kontrakt:

- `id`: stabilny identyfikator silnika, taki jak `caveman` lub `rtk`
- `apply(text, config)`: starsza ścieżka wykonywania używana przez potoki stosowe
- `compress(input, config)`: główna ścieżka wykonywania zwracająca tekst i statystyki
- `getConfigSchema()`: zwraca strukturę podobną do JSON Schema, opisującą prawidłową konfigurację
- `validateConfig(config)`: zwraca `{ valid, errors[] }`

Rejestracja odbywa się za pomocą `registerCompressionEngine(engine)` (lub `registerEngine` w bardziej zaawansowanych przypadkach),
co powoduje wywołanie `assertValidEngine()` i `validateConfig(defaultConfig)` przed zaakceptowaniem.
Użyj `unregisterCompressionEngine(id)`, aby usunąć silnik w czasie działania.

`strategySelector.ts` rejestruje wbudowane silniki przed rozpoczęciem kompresji. Dzięki temu podgląd,
kompresja w czasie działania, tryb stosowy, testy i przyszłe silniki korzystają z tej samej ścieżki wykonywania.

### Kompresja opisów MCP (powiązane)

Oddzielny rejestr kompresuje metadane opisów narzędzi MCP na poziomie rejestru — zobacz
`open-sse/mcp-server/descriptionCompressor.ts` i [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ponownie wykorzystuje
reguły Caveman, ale działa na metadanych narzędzi, a nie na ładunkach żądań.

### Dodatkowe wbudowane silniki

Poza Caveman, RTK i LLMLingua-2 rejestr zawiera kilka wyspecjalizowanych silników bezstratnych /
strukturalnych (używanych przez potoki stosowe, środowisko testowe i testy):

| Silnik        | Id              | Działanie                                                                                                                                                                                                   |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): zastępuje duże, ciągłe bloki tekstu odwołaniami opartymi na zawartości, dzięki czemu powtarzające się/duże bloki są wysyłane raz, a następnie przywoływane przez odwołania. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): bezstratna kompaktacja tabelaryczna jednorodnych ładunków w postaci tablic JSON do kolumnowej postaci `[N rows]`.                                                                   |
| ionizer       | `ionizer`       | Próbkowanie wierszy z początku/środka/końca bardzo dużych jednorodnych bloków, z przechowywaniem pominiętego środka jako odwołania CCR opartego na zawartości.                                              |
| session-dedup | `session-dedup` | Deduplikacja między turami oparta na zawartości (inspirowana TokenMizer): pomija tekst widziany już we wcześniejszych turach tej samej sesji.                                                               |

**Instrukcja protokołu pobierania CCR (#8033):** gdy CCR po raz pierwszy zastąpi ≥1 blok w
żądaniu, silnik dodaje na początku pojedynczą, idempotentną wiadomość `system` (rozpoczynającą się
wartością sygnalizacyjną `[CCR protocol]`), która objaśnia wywołującemu kontrakt znacznik → narzędzie: co oznacza
znacznik `[CCR retrieve hash=<24hex> chars=N]`, że skrót musi zostać skopiowany bez zmian
(wszystkie 24 znaki szesnastkowe — błędnie skopiowane skróty są prawdopodobną przyczyną
błędów „block not found”) oraz że znacznik `[dedup:ref sha=...]` oznacza „sprawdź wcześniejszą historię”, a nie „wywołaj
narzędzie”. Informacja jest dodawana **tylko wtedy, gdy zadeklarowane przez wywołującego `tools[]` potwierdza, że może on
rzeczywiście uzyskać dostęp do `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` w
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — zwykły klient
zgodny z OpenAI, który nie ma tego narzędzia, nigdy nie otrzymuje instrukcji wywołania czegoś,
do czego nie ma dostępu. Idempotencja jest wymuszana przez przeszukanie historii wiadomości pod kątem wartości sygnalizacyjnej
przed dodaniem instrukcji, dzięki czemu żądania wieloturowe (które ponownie odtwarzają wcześniejsze wiadomości) nie dodają kolejnych
kopii informacji w każdej turze.

## Caveman

Tryb Caveman koncentruje się na semantycznej kondensacji zwykłej prozy:

- zachowuje bloki kodu, adresy URL, JSON, ścieżki i dane strukturalne
- usuwa wypełniacze, asekuracyjne sformułowania, powtarzający się kontekst i rozwlekłe zwroty łączące
- obsługuje zależne od języka zestawy reguł plików w `open-sse/services/compression/rules/`
- pozostaje dostępny za pośrednictwem starszych trybów `standard`, `aggressive` i `ultra`

Odpowiednia sekcja panelu to `Dashboard -> Context & Cache -> Caveman`.

Projekt źródłowy Caveman deklaruje `~75%` mniej tokenów wyjściowych, średnią oszczędność danych wyjściowych na poziomie `65%` w testach porównawczych
w zakresie `22-87%` oraz narzędzie kompresji danych wejściowych osiągające `~46%`. OmniRoute wykorzystuje wartość
Caveman dotyczącą danych wejściowych podczas dokumentowania łącznych oszczędności wynikających z kompresji promptów/kontekstu; tryb wyjściowy Caveman pozostaje oddzielną
funkcją wpływającą na sposób generowania odpowiedzi.

## RTK

Tryb RTK koncentruje się na danych wyjściowych poleceń i narzędzi:

- wykrywa klasy danych wyjściowych, takie jak `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testy Cargo/Go, kompilacje TypeScript/Vite/Webpack, ESLint, audyty/instalacje npm, logi Docker,
  polecenia powłoki `find`/`grep`, ślady stosu i ogólne logi
- stosuje 49 filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- obsługuje deklaratywny potok w stylu RTK: usuwanie sekwencji ANSI, zastępowanie, skracanie na podstawie dopasowania danych wyjściowych,
  usuwanie/zachowywanie wierszy, skracanie poszczególnych wierszy, skracanie początku/końca lub do maksymalnej liczby wierszy oraz wartość zastępczą dla pustego wyniku
- obsługuje wymagające zaufania filtry projektu w `.rtk/filters.json` oraz filtry globalne w
  `DATA_DIR/rtk/filters.json`
- usuwa sekwencje ANSI, szum związany z postępem, powtarzające się wiersze i nieprzydatny tekst standardowy
- zachowuje błędy wymagające działania, ostrzeżenia, podsumowania, zmienione pliki i kontekst końcowy
- może opcjonalnie zachowywać zredagowane surowe dane wyjściowe na potrzeby odzyskiwania/debugowania za pośrednictwem uwierzytelnionych tras zarządzania

Odpowiednia sekcja panelu to `Dashboard -> Context & Cache -> RTK`.

Szczegóły operacyjne dotyczące filtrów niestandardowych, zaufania, weryfikacji i odzyskiwania surowych danych wyjściowych znajdują się w
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Projekt źródłowy RTK deklaruje oszczędności na poziomie `60-90%` w przypadku kompresji danych wyjściowych poleceń. Przykład w jego pliku README przedstawia
30-minutową sesję Claude Code, w której liczba tokenów spadła z `~118,000` do `~23,900`, co oznacza oszczędność `79.7%`.

## LLMLingua-2 (przycinanie semantyczne)

Tryb LLMLingua-2 wykonuje **semantyczne przycinanie tokenów** w prozie przy użyciu małego klasyfikatora
tokenów ONNX, uzupełniając oparte na regułach silniki Caveman i RTK:

- kompresuje prozę wyłącznie w komunikatach innych niż systemowe; bloki kodu wydzielone znacznikami i inne zachowywane
  konstrukcje nigdy nie są modyfikowane
- uruchamia backend `@atjsh/llmlingua-2` (ONNX za pośrednictwem `@huggingface/transformers`) w
  wątku roboczym, dzięki czemu wnioskowanie modelu nigdy nie blokuje pętli zdarzeń żądania
- można go **łączyć w stos** (`stackPriority` 35): w potoku stosowym działa po
  silnikach strukturalnych (CCR, session-dedup, headroom, Caveman), ale przed `ultra`, ponieważ
  przycinanie semantyczne jest najskuteczniejsze w przypadku tekstu już skompresowanego strukturalnie — np.
  `rtk -> caveman -> llmlingua`
- w przypadku **dowolnego błędu stosuje mechanizm fail-open** (brakujące zależności opcjonalne, uruchomienie procesu roboczego, ładowanie modelu, wnioskowanie
  lub przekroczenie limitu czasu) → oryginalny tekst jest zwracany bez zmian; nigdy nie jest zwracany błąd

Lokalizacja silnika: `open-sse/services/compression/engines/llmlingua/`. Odpowiednia sekcja panelu
to `Dashboard -> Context & Cache -> LLMLingua`.

### Modele

Domyślnym modelem jest **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
szybki). Model **BERT-base** o większej dokładności (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) jest dostępny za pośrednictwem pola `model` konfiguracji silnika. `@huggingface/transformers`
pobiera wybrany model leniwie z HuggingFace Hub do
`${DATA_DIR}/models/llmlingua` przy pierwszym wywołaniu (`modelStore.ts`); nadpisanie konfiguracji za pomocą `modelPath`
wskazuje zamiast tego lokalną kopię (instalacje offline / odizolowane od sieci).

### Opcjonalne zależności i instalacja na żądanie

Możliwy do pominięcia zestaw zależności równorzędnych środowiska uruchomieniowego LLMLingua jest **opcjonalny**. Dwa pakiety zadeklarowano jako
`optionalDependencies` w `package.json` i pozostawiono jako **zewnętrzne** w kompilacji produkcyjnej
(`scripts/build/prepublish.ts` ich nie dołącza):

| Pakiet               | Wersja (przypięta) | Uwagi                                                             |
| -------------------- | ------------------ | ----------------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Pakiet wejściowy; deklaruje pozostałe jako zależności równorzędne |
| `js-tiktoken`        | `^1.0.20`          | Tokenizator                                                       |

Pakiet `@huggingface/transformers` jest przypięty do wersji `^4.2.0` (współdzielony z lokalną ścieżką osadzania i
również uwzględniany w autonomicznym pakiecie); `@atjsh/llmlingua-2@2.0.5` deklaruje go jako zależność równorzędną w wersji
`"^3.5.2 || ^4.0.0"`, dlatego obsługiwane są zarówno Transformers.js v3, jak i v4. Od wersji 2.0.4
pakiet `@atjsh/llmlingua-2` nie wymaga już `@tensorflow/tfjs`, co wyeliminowało największy pojedynczy
składnik (TensorFlow.js) ze stosu SLM. Tylko dwa powyższe pakiety są możliwymi do pominięcia zależnościami równorzędnymi SLM.
Standardowe polecenie `npm install` (środowisko deweloperskie) instaluje opcjonalny stos automatycznie, chyba że zależności opcjonalne
zostaną pominięte.

**Dlaczego na żądanie:** pakiet publikowany w npm, autonomiczny pakiet i obraz Docker
są dostarczane **bez** tych zależności, aby zachować niewielki rozmiar. Gdy są one nieobecne, kontrola
zależności procesu roboczego (próba rozwiązania `@atjsh/llmlingua-2` w `worker.ts`) kończy się niepowodzeniem, a silnik
**po cichu stosuje mechanizm fail-open** — wybranie LLMLingua nie powoduje żadnej operacji (tekst jest zwracany bez zmian, a
błąd nie jest rejestrowany). Aby go aktywować w odchudzonym środowisku, zainstaluj opcjonalny stos:

```bash
# przypnij do wersji zadeklarowanych w optionalDependencies w package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Usunięcie `@tensorflow/tfjs` (2.0.4+) eliminuje wcześniej dominujący składnik o rozmiarze ~800 MB
— pozostały rozmiar obejmuje środowiska uruchomieniowe transformers.js i onnxruntime-node
oraz model TinyBERT (~57 MB) pobierany przy pierwszym użyciu (nie za pośrednictwem npm).

Dla poszczególnych środowisk:

- **Środowisko deweloperskie / `npm install`** — instalowane automatycznie, chyba że użyto opcji `--omit=optional`
  (lub `--no-optional`). Nie trzeba podejmować żadnych działań.
- **Globalny npm (`npm i -g omniroute`) / instalacja samodzielna** — uruchom powyższe polecenie instalacji w
  katalogu zainstalowanego pakietu lub zainstaluj go ponownie bez pomijania opcjonalnych zależności.
- **Docker** — dodaj polecenie instalacji w warstwie obrazu pochodnego; opublikowany obraz
  jest celowo odchudzony.
- **VPS (PM2)** — zainstaluj w katalogu `node_modules` aplikacji, a następnie uruchom proces ponownie, aby
  worker ponownie sprawdził bramkę.
- **Surowa wersja samodzielna Next (`npm run build` → `.build/next/standalone/server.js`)** — ślad
  wersji samodzielnej nie zawiera ANI workera, ANI opcjonalnych zależności, dlatego silnik po cichu
  przechodzi w tryb fail-open. `scripts/build/colocate-standalone.mjs` ponownie dodaje oba elementy (worker esbuild +
  domknięcie opcjonalnych zależności w drzewie wersji samodzielnej); jest uruchamiany automatycznie przez
  hook npm `postbuild` po każdym buildzie. Jest idempotentny i działa w trybie fail-soft, gdy zależności są nieobecne.

**Sprawdź, czy funkcja jest aktywna:** po wybraniu LLMLingua rzeczywisty tekst faktycznie zostaje skrócony (silnik
przestaje przechodzić w tryb fail-open), a pierwsze żądanie wyzwala pobranie modelu do
`${DATA_DIR}/models/llmlingua`. Bramka celowo sprawdza tylko `@atjsh/llmlingua-2` —
pozostałe pakiety równorzędne są dostępne wyłącznie jako ESM, a `require.resolve` zgłasza dla nich wyjątek, nawet gdy są obecne — dlatego
worker nadal przechodzi w tryb fail-open, jeśli podczas wykonywania `import()` rzeczywiście brakuje któregokolwiek pakietu równorzędnego.

## Potoki stosowe

Tryb stosowy uruchamia kroki potoku w określonej kolejności. Domyślna kolejność to:

```txt
rtk -> caveman
```

Używaj tego trybu w sesjach z agentami programistycznymi, w których prompt łączy dane wyjściowe poleceń z tekstem napisanym przez człowieka lub asystenta. RTK najpierw redukuje zaszumione logi narzędzi, a następnie Caveman kompresuje pozostały język naturalny.

Kroki potoku konfiguruje się za pomocą `stackedPipeline` w ustawieniach kompresji lub poprzez kombinacje kompresji.

Gdy oba silniki redukują ten sam kwalifikujący się ładunek, oszczędności się kumulują:

```txt
łącznie = 1 - (1 - oszczędności RTK) * (1 - oszczędności danych wejściowych Caveman)
średnio = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
zakres  = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtr drzewa dostępności MCP

Inteligentny filtr drzewa dostępności MCP jest warstwą kompresji działającą po wykonaniu i przetwarzającą **wyniki narzędzi** MCP, a nie prompty ani kontekst. Jego celem są rozbudowane ładunki drzewa dostępności i migawek przeglądarki zwracane przez narzędzia takie jak Playwright, computer-use oraz serwery MCP do automatyzacji przeglądarek.

### Sposób działania

1. **Usuwanie szumu** — usuwa puste wpisy ogólne/tekstowe (`- generic:`, `- text: ""`)
2. **Zwijanie elementów sąsiadujących** — gdy ≥ `collapseThreshold` (domyślnie 30) kolejnych wierszy stanowi powtórzenia strukturalne, zwija je do pierwszych `collapseKeepHead` (domyślnie 10) wierszy + podsumowania liczby + ostatnich `collapseKeepTail` (domyślnie 5) wierszy
3. **Zachowanie odwołań** — kotwice `[ref=eXX]` wymagane przez Playwright/computer-use nigdy nie są modyfikowane
4. **Twarde obcinanie** — jeśli tekst po zwinięciu nadal przekracza `maxTextChars` (domyślnie 50 000), zostaje obcięty wraz ze wskazówką nawigacyjną, aby agent mógł kontynuować pracę

### Lokalizacja silnika

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← punkt wejścia smartFilterText()
  collapseRepeated.ts ← algorytm zwijania elementów sąsiadujących
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguracja

Sterowanie odbywa się za pomocą `compression.mcpAccessibility` w ustawieniach globalnych (migracja 056). Konfiguracja domyślna:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filtr jest stosowany wyłącznie do ładunków wyników narzędzi, których `type` ma wartość `"text"` i których długość przekracza `minLengthToProcess`. Nie wpływa na kompresję promptów ani ładunki żądań.

### Oczekiwane oszczędności

60–80% w przypadku wyników narzędzi zawierających migawki przeglądarki, zależnie od złożoności strony. Algorytm zwijania ma złożoność O(n) względem liczby wierszy i powoduje pomijalne opóźnienie.

### Ten filtr a powyższe silniki kompresji

| Aspekt      | Caveman / RTK / Stacked    | Filtr dostępności MCP                  |
| ----------- | -------------------------- | -------------------------------------- |
| Cel         | Prompty żądań / kontekst   | Wyniki narzędzi MCP                    |
| Wyzwalacz   | Ustawienie trybu kompresji | `compression.mcpAccessibility.enabled` |
| Zakres      | Wszystkie komunikaty SSE   | Tylko wyniki narzędzi                  |
| Kotwice ref | Nie dotyczy                | Zachowywane bezwarunkowo               |

---

## Kombinacje kompresji

Kombinacje kompresji to nazwane profile kompresji, które można przypisywać do kombinacji routingu:

- `compression_combos`: przechowuje tryb, potok, konfigurację RTK, konfigurację języka oraz znacznik domyślny
- `compression_combo_assignments`: mapuje kombinację kompresji na kombinację routingu
- integracja środowiska uruchomieniowego rozpoznaje przypisaną kombinację kompresji przed ogólnymi nadpisaniami kombinacji
- analityka obejmuje `compression_combo_id` i `engine`

Lokalizacja w panelu: `Dashboard -> Context & Cache -> Compression Combos`.

## Interfejs API

| Trasa                                  | Przeznaczenie                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globalne ustawienia kompresji (obejmują konfigurację `mcpAccessibility`)           |
| `/api/compression/preview`             | Podgląd dowolnego trybu kompresji                                                  |
| `/api/compression/language-packs`      | Lista dostępnych pakietów językowych Caveman                                       |
| `/api/context/caveman/config`          | Alias ustawień Caveman                                                             |
| `/api/context/rtk/config`              | Ustawienia domyślne i konfiguracja RTK                                             |
| `/api/context/rtk/filters`             | Katalog filtrów RTK                                                                |
| `/api/context/rtk/test`                | Punkt końcowy podglądu/testowania RTK                                              |
| `/api/context/rtk/raw-output/[id]`     | Uwierzytelnione odzyskiwanie zanonimizowanych nieprzetworzonych danych wyjściowych |
| `/api/context/combos`                  | Operacje CRUD na kombinacjach kompresji                                            |
| `/api/context/combos/[id]/assignments` | Operacje CRUD na przypisaniach kombinacji routingu                                 |
| `/api/context/analytics`               | Alias analityki kompresji                                                          |

Trasy zarządzania wymagają uwierzytelnienia zarządczego lub kontroli zasad klucza API.

## Narzędzia MCP

Kompresja udostępnia pięć narzędzi MCP:

| Narzędzie                           | Zakres              | Przeznaczenie                                        |
| ----------------------------------- | ------------------- | ---------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ustawienia, analityka, statystyki pamięci podręcznej |
| `omniroute_compression_configure`   | `write:compression` | Aktualizacja ustawień globalnych                     |
| `omniroute_set_compression_engine`  | `write:compression` | Ustawienie trybu i opcjonalnego potoku               |
| `omniroute_list_compression_combos` | `read:compression`  | Lista kombinacji kompresji                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Odczyt analityki kombinacji/silnika                  |

## Zakres i wykluczenia

**Osadzenia nigdy nie są kompresowane.** `open-sse/handlers/embeddings.ts` nigdy nie wywołuje żadnego
silnika kompresji — treści żądania/odpowiedzi są przekazywane bezpośrednio do wykonawcy bez żadnych zmian.
Obecnie wynika to ze struktury (osadzenia i uzupełnienia czatu mają odrębne procedury obsługi), a nie z
kontroli w czasie wykonywania, lecz oznacza to, że problem zniekształcenia wektorów opisany w #8034 nie ma żadnej powierzchni
ekspozycji w ścieżce osadzeń.

**Filtr wykluczeń dla poszczególnych modeli/punktów końcowych (#8034).** W przypadku uzupełnień czatu operator może wskazać
identyfikatory modeli / cele `provider/model`, które nigdy nie mogą być kompresowane — jest to zabezpieczenie przydatne, jeśli
kompresja zostanie kiedyś podłączona bliżej ścieżki sąsiadującej z osadzeniami, a także ogólnie przydatne
dla każdego modelu, w którym istotna jest dokładna zgodność promptu co do bajtu (deterministyczne ewaluacje, prefiksy
zależne od pamięci podręcznej itp.).

- Pole ustawień: `exclusions?: string[]` w globalnej konfiguracji kompresji
  (`GET`/`PUT /api/settings/compression`), utrwalane za pośrednictwem istniejącej przestrzeni nazw kompresji `key_value`
  (`src/lib/db/compression.ts`) — bez nowej tabeli.
- Karta panelu: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Składnia wzorców: `*` jest jedynym symbolem wieloznacznym. Każdy inny metaznak wyrażenia regularnego we wzorcu jest
  poprzedzany znakiem ucieczki przed dopasowaniem, dlatego `gpt-5.6` pasuje wyłącznie do ciągu literałowego, nigdy do `gpt-5x6`
  (odporność na ReDoS, ograniczona złożoność, bez zagnieżdżonych kwantyfikatorów). Wzorce są dopasowywane bez uwzględniania wielkości liter zarówno do
  samego identyfikatora modelu, jak i złożenia `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  oraz `openai/*` działają, a samo `*` wyklucza każdy model.
- Dopasowywanie: `isCompressionExcluded()` / `normalizeCompressionExclusions()` w
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` sprawdza wykluczony cel
  bezpośrednio po rozpoznaniu ustawień kompresji, **zanim zostanie uruchomiony jakikolwiek silnik**, i traktuje dopasowanie
  dokładnie tak samo jak globalne wyłączenie kompresji — treść żądania jest w sposób możliwy do udowodnienia
  identyczna co do bajtu. Pominięcie jest rejestrowane za pomocą `writeCompressionSkip(..., "excluded")`, aby było
  widoczne w analityce.
- Domyślne zachowanie (pusta/brakująca lista): identyczne jak przed #8034 — nic nie jest wykluczone.

## Znane ograniczenia

- **LLMLingua-2 (SLM) wymaga opcjonalnych zależności umieszczonych w tej samej lokalizacji.** Proces roboczy działa w
  kompilacji produkcyjnej tylko wtedy, gdy `@atjsh/llmlingua-2` i jego zależności równorzędne są umieszczone razem w
  `dist/node_modules` (zobacz `scripts/build/colocateOptionals.mjs`, #4286). Bez nich
  silnik działa w trybie fail-open (zwraca oryginalny tekst). Rozwiązywanie procesu roboczego nie zależy już od
  `import.meta.url` (który przestaje działać w samodzielnym pakiecie) — opiera się na bieżącym katalogu
  środowiska uruchomieniowego / `argv[1]`.
- **Pakiety językowe Caveman `de` / `fr` / `ja` są częściowe.** Zawierają reguły `context` +
  `filler` + `structural`, ale nie zawierają pakietów `dedup` / `ultra`, więc intensywność `ultra` nie jest
  dla tych języków większa niż `full` (używają wyłącznie własnych reguł — nie ma
  niejawnego mechanizmu rezerwowego korzystającego z angielskich reguł `dedup`/`ultra`, które zniekształciłyby tekst w innych językach).
  Pakiety `en` / `es` / `id` / `pt-BR` są kompletne. Mile widziane są kontrybucje plików `dedup.json` + `ultra.json`
  do częściowych pakietów.
- **Telemetria stosowa wyświetla tylko silniki, które dokonały kompresji.** Krok potoku stosowego, którego
  silnik został uruchomiony, ale zapewnił 0% oszczędności, zwraca `stats:null`, dlatego nie pojawia się w
  `engineBreakdown` — jest nieodróżnialny od pominiętego kroku. Rozróżnienie
  „uruchomiono, 0%” od „pominięto” wymagałoby zmiany modelu zestawienia i zostało odłożone na później.

## Walidacja

Ukierunkowane testy kontrolne dla tego obszaru to:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
