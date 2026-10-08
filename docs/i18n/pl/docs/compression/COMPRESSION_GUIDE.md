# 🗜️ Prompt Compression Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatycznie oszczędzaj 15–95% tokenów w kwalifikującym się kontekście. Krótkie omówienie znajdziesz w [sekcji README dotyczącej kompresji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Omówienie

OmniRoute implementuje modułowy potok kompresji promptów, który działa **proaktywnie**, zanim żądania trafią do dostawców nadrzędnych. Oznacza to, że tokeny są oszczędzane w sposób niezauważalny — bez konieczności wprowadzania zmian w przepływie pracy.

```
Żądanie klienta
  → Selektor strategii kompresji
    → Nadpisanie przez kombinację? → Użyj ustawienia kombinacji
    → Próg automatycznego uruchomienia? → Użyj trybu automatycznego
    → Tryb domyślny? → Użyj ustawienia globalnego
    → Wyłączone? → Pomiń kompresję
  → Wybrany tryb kompresji
    → Wyłączony: Bez kompresji
    → Lekki: Bezpieczne porządkowanie białych znaków i formatowania (~15%)
    → Standardowy: Usuwanie wypełniaczy w stylu mowy jaskiniowca (~30%)
    → Agresywny: Starzenie historii + podsumowywanie (~50%)
    → Ultra: Przycinanie heurystyczne + redukcja bloków kodu (~75%)
    → RTK: Filtrowanie danych wyjściowych terminala/narzędzi z uwzględnieniem poleceń (60–90% po stronie dostawcy nadrzędnego)
    → Warstwowy: Uporządkowany potok wielu silników, zwykle RTK, a następnie Caveman (78–95% kwalifikującego się zakresu)
  → Skompresowane żądanie → Dostawca
```

---

## Tryby kompresji

### Wyłączony

Kompresja nie jest stosowana. Wszystkie wiadomości są przekazywane bez zmian.

### Tryb lekki (~15% oszczędności, opóźnienie <1ms)

Najbezpieczniejszy tryb — bez zmian semantycznych, wyłącznie porządkowanie formatowania:

| Technika                 | Opis                                                           |
| ------------------------ | -------------------------------------------------------------- |
| `collapseWhitespace`     | Łączenie kolejnych pustych wierszy i usuwanie końcowych spacji |
| `dedupSystemPrompt`      | Usuwanie zduplikowanych wiadomości systemowych                 |
| `compressToolResults`    | Kompresowanie rozwlekłych wyników narzędzi/funkcji             |
| `removeRedundantContent` | Usuwanie powtarzających się instrukcji                         |
| `replaceImageUrls`       | Skracanie identyfikatorów URI danych obrazów base64            |

**Najlepszy do:** Stałego użycia i przepływów pracy o krytycznym znaczeniu dla bezpieczeństwa.

### Tryb standardowy (~30% oszczędności)

Inspirowany rozwiązaniem [Caveman](https://github.com/JuliusBrussee/caveman) — usuwa słowa-wypełniacze i rozwlekłe sformułowania, zachowując znaczenie:

- Usuwa słowa-wypełniacze („proszę”, „myślę, że”, „zasadniczo”, „właściwie”)
- Skraca rozwlekłe wyrażenia („w celu” → „aby”, „w wyniku” → „ponieważ”)
- Usuwa uprzejme asekuracyjne sformułowania („Czy zechcesz...”, „Jeśli mógłbyś...”)
- Ponad 30 reguł regex dostosowanych do promptów programistycznych

**Najlepszy do:** Codziennych zadań programistycznych i zespołów dbających o koszty.

### Tryb agresywny (~50% oszczędności)

Inteligentne zarządzanie historią podczas długich sesji:

- **Starzenie wiadomości** — starsze wiadomości są stopniowo coraz bardziej kompresowane
- **Kompresja wyników narzędzi** — długie wyniki narzędzi są skracane lub pomijane (pierwsze/ostatnie wiersze,
  filtrowanie wierszy z dopasowaniami, kompaktowanie kluczy JSON)
- **Mechanizmy ochrony integralności strukturalnej** — zapewniają spójność par `tool_use` + `tool_result`
- **Uwzględnianie okna kontekstu** — respektuje limity tokenów poszczególnych modeli

**Najlepszy do:** Rozbudowanych sesji debugowania i dużych baz kodu.

### Tryb Ultra (~75% oszczędności)

Maksymalna kompresja w scenariuszach, w których liczba tokenów ma krytyczne znaczenie:

- **Przycinanie heurystyczne** — przycinanie tokenów w prozie na podstawie punktacji
- **Zachowanie struktury** — wydzielone bloki kodu, kod wbudowany, adresy URL i identyfikatory są
  zastępowane znacznikami i ponownie wstawiane bez żadnych zmian; nigdy nie są przycinane
- **Opcjonalna warstwa SLM** — po skonfigurowaniu mały model lokalny może doprecyzować przycinanie
- Niezależny od trybu agresywnego: nie uruchamia starzenia wiadomości, kompresji wyników narzędzi
  ani awaryjnego modułu podsumowującego (tylko awaria warstwy SLM może skierować przebieg awaryjny
  przez tryb agresywny)

**Najlepszy do:** Sytuacji, w których wielokrotnie osiągasz limity kontekstu.

### Tryb RTK (60–90% po stronie dostawcy nadrzędnego)

Tryb RTK jest zoptymalizowany pod kątem obszernych wyników narzędzi pojawiających się w sesjach agentów programistycznych:

- Wykrywa klasy poleceń/wyników, takie jak `git status`, `git diff`, `git log`, narzędzia uruchamiające testy,
  kompilacje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audyty/instalacje npm, logi Docker, wyniki narzędzi infrastrukturalnych
  oraz ogólne wyniki powłoki
- Stosuje pakiety filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schematu RTK TOML v1 z projektowych lub globalnych plików `filters.toml`, z walidacją
  testów wbudowanych i kontrolą zaufania dla plików projektowych
- Zawiera 55 wbudowanych filtrów z osadzonymi przykładami weryfikacyjnymi
- Usuwa sekwencje sterujące ANSI, paski postępu, powtarzające się wiersze i nieistotny szum
- Zachowuje awarie, błędy, ostrzeżenia, zmienione pliki, podsumowania i końcową część długich wyników
- Obsługuje projektowe filtry z kontrolą zaufania, filtry globalne oraz opcjonalne odzyskiwanie zredagowanych surowych wyników

**Najlepszy do:** Sesji agentów obejmujących powłokę, kompilowanie, testowanie, git, grep i transkrypcje wyników plikowych.

### Tryb warstwowy (78–95% kwalifikującego się zakresu)

Tryb warstwowy uruchamia wiele silników kompresji w deterministycznej kolejności. Domyślny potok to:

```txt
RTK -> Caveman
```

Ta kolejność najpierw kompaktuje wyniki terminala/narzędzi, a następnie stosuje semantyczne skracanie Caveman do
pozostałej części promptu w języku naturalnym. Potoki warstwowe można konfigurować globalnie lub za pomocą
kombinacji kompresji przypisanych do kombinacji routingu.

**Najlepszy do:** Mieszanego kontekstu zawierającego duże logi narzędzi oraz instrukcje użytkownika lub podsumowania asystenta.

---

## Obliczanie oszczędności względem projektów bazowych

OmniRoute dokumentuje oszczędności wynikające z kompresji na podstawie dwóch źródeł: testów wydajności projektów bazowych oraz
własnej kompozycji silników OmniRoute.

| Źródło  | Wartość z README projektu bazowego użyta tutaj                                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` mniej tokenów wyjściowych, średnio `65%` oszczędności wyjścia w testach, zakres `22-87%` oraz narzędzie zapewniające `~46%` kompresji wejścia |
| RTK     | `60-90%` oszczędności dla danych wyjściowych poleceń; przykładowa sesja: `~118,000 -> ~23,900` tokenów, czyli oszczędność `79.7%` (`~80%`)           |

W przypadku nakładających się danych narzędzi i kontekstu domyślna kombinacja OmniRoute łączy silniki w następującej kolejności:

```txt
RTK -> Caveman
```

Łączne oszczędności są obliczane multiplikatywnie, a nie addytywnie:

```txt
łącznie = 1 - (1 - oszczędności RTK) * (1 - oszczędności wejścia Caveman)
średnia = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
zakres  = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Wartość `78-95%` ma zastosowanie, gdy zarówno RTK, jak i Caveman mogą zredukować te same dane wejściowe lub kontekst.
Tryb odpowiedzi wyjściowej Caveman jest niezależny: po jego włączeniu należy przyjąć własne oszczędności wyjścia Caveman (`65%`
średnio, `~75%` według głównej deklarowanej wartości, zakres `22-87%`). Łączne oszczędności rozliczeniowe zależą od proporcji danych wejściowych i wyjściowych.

### Co właściwie oznacza „kwalifikujący się”

Deklarowany zakres 15-95% jest rzeczywisty, ale dotyczy wyłącznie **nadmiarowej lub rozwlekłej** treści — powtarzających się
wierszy błędów, dziennika kompilacji zasypywanego tym samym ostrzeżeniem albo zbyt obszernego wyniku `grep`/odczytu pliku. **Nie**
oznacza to, że każde żądanie pozwala uzyskać takie oszczędności.

Potwierdzono empirycznie (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uruchomienie
`stacked` (RTK + Caveman) na bloku `tool_result` w formacie Anthropic, zawierającym 300 identycznych
wierszy błędów, zapewniło **95.93% oszczędności tokenów / 96.26% oszczędności znaków** — dokładnie w deklarowanym
zakresie. Jednak ten sam potok zastosowany do zwykłych, pozbawionych nadmiarowości danych wyjściowych narzędzia (czystej listy dopasowań `grep`,
krótkiego odczytu pliku lub zwykłego tekstu konwersacyjnego) prawidłowo zapewnia **oszczędności bliskie zeru**, ponieważ
nie ma w nich powtarzalnych treści do usunięcia, a `validateCompression()` (`validation.ts`) nie zezwala na przekazanie
przekształconej treści, która usuwałaby lub zmieniała bloki kodu, adresy URL, nagłówki, wersje albo identyfikatory stałych zapisane WIELKIMI LITERAMI.

Jest to oczekiwane i bezpieczne zachowanie, a nie błąd: sesja programistyczna, która głównie odczytuje/przeszukuje czyste pliki,
zapewni umiarkowane łączne oszczędności nawet przy w pełni włączonej kompresji, natomiast sesja, która napotka zapętloną awarię
lub bardzo gadatliwy linter, osiągnie pełny zakres 78-95% dla tego ruchu. Nie należy uznawać niskiego łącznego procentu
oszczędności z pojedynczej sesji za dowód błędnej konfiguracji kompresji — najpierw należy sprawdzić, czy
bazowe dane wyjściowe narzędzia rzeczywiście były nadmiarowe.

---

## Wizualizacja oszczędności tokenów

```
Bez kompresji:          47K tokenów wysłanych do LLM
Z Lite:                 40K tokenów wysłanych          (15% oszczędności — bezpieczne, zawsze włączone)
Ze Standard:            33K tokenów wysłanych          (30% oszczędności — reguły caveman-speak)
Z Aggressive:           24K tokenów wysłanych          (50% oszczędności — starzenie + podsumowywanie)
Z Ultra:                12K tokenów wysłanych          (75% oszczędności — przycinanie heurystyczne)
Z RTK:                  19K-5K tokenów wysłanych       (60-90% oszczędności na danych wyjściowych poleceń/narzędzi)
Ze Stacked:             10K-2.5K tokenów wysłanych     (kwalifikujący się zakres 78-95% dla RTK+Caveman)
```

---

## Konfiguracja

### Panel

Przejdź do `Dashboard → Context & Cache`:

- **Caveman** — wybór trybu, pakiety językowe, podgląd i globalne ustawienia domyślne
- **RTK** — podgląd filtra poleceń, ustawienia bezpieczeństwa RTK i katalog filtrów
- **Compression Combos** — nazwane potoki silników przypisane do kombinacji routingu
- **Auto-Trigger Threshold** — automatyczne włączanie kompresji, gdy liczba tokenów przekroczy próg

### Nadpisanie dla kombinacji

W `Dashboard → Context & Cache → Compression Combos` przypisz kombinację kompresji do kombinacji
routingu:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Pozwala to używać wieloetapowej kompresji u darmowych dostawców i dostawców przeznaczonych do
programowania, zachowując jednocześnie tryb lekki w płatnych subskrypcjach.

To przypisanie „Nadpisanie dla kombinacji” jest innym mechanizmem sterującym niż nadpisanie
**trybu kompresji kombinacji routingu** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses —
schemat tego pola akceptuje również `rtk`, `stacked` i `omniglyph`) — to nadpisanie nie wybiera
nazwanego potoku kombinacji kompresji, lecz jedynie ustawia pole `compressionMode` używane przez
`resolveCompressionPlan`. Można je ustawić na karcie kombinacji (`Dashboard → Combos`) lub, od wersji
#6760, dla każdej kombinacji routingu na liście „Assign to routing” w
`Dashboard → Context & Cache → Compression Combos`, tuż obok opisanego powyżej pola wyboru
przypisania potoku. Oba interfejsy zapisują dane za pośrednictwem tego samego punktu końcowego
`PUT /api/combos/{id}`.

### Nadpisanie dla żądania

Wyślij nagłówek żądania `x-omniroute-compression`, aby nadpisać plan kompresji dla pojedynczego
żądania. Ma on najwyższy priorytet — zastępuje nadpisanie kombinacji routingu, aktywny profil,
automatyczne wyzwalanie oraz wartość domyślną z panelu. Nieznane wartości są ignorowane (żądanie
nigdy nie jest odrzucane), a globalny przełącznik główny nadal kontroluje wszystkie ustawienia:
gdy kompresja jest globalnie wyłączona, nagłówek nie może jej włączyć. Wartości:

| Wartość       | Efekt                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Brak kompresji dla tego żądania.                                                                                              |
| `default`     | Domyślny profil określony w panelu (ignoruje aktywny profil). Silniki stratne pozostają wyłączone.                            |
| `safe`        | Tak samo jak przy pominięciu nagłówka: tylko deduplikacja i redukcja białych znaków.                                          |
| `allow-lossy` | Zachowuje plan operatora tego żądania, w tym podsumowania, filtry trafności i zmiany stylu.                                   |
| `engine:<id>` | Pojedynczy silnik, jeśli jest włączony, np. `engine:rtk`. Jest to zgoda na użycie tego silnika dla danego żądania.            |
| `<combo>`     | Nazwana kombinacja, dopasowywana najpierw według nazwy (bez rozróżniania wielkości liter), a następnie według identyfikatora. |

Bez `allow-lossy`, `engine:<id>` lub nazwanej kombinacji silniki stratne nie są stosowane. Jeśli
kompresja jest włączona, żądanie nadal podlega deduplikacji sesji i redukcji białych znaków.

Zastosowany plan jest zwracany w nagłówku odpowiedzi
`X-OmniRoute-Compression: <mode>; source=<source>`, gdzie `<source>` przyjmuje jedną z wartości:
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` lub `off`.

### API

```bash
# Pobierz ustawienia kompresji
curl http://localhost:20128/api/settings/compression

# Zaktualizuj ustawienia kompresji
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Wyświetl podgląd określonego ładunku RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Wyświetl listę pakietów filtrów RTK
curl http://localhost:20128/api/context/rtk/filters

# Przetestuj RTK bezpośrednio z opcjonalnymi metadanymi polecenia
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Co podlega ochronie

Silnik kompresji **zawsze zachowuje:**

- ✅ Bloki kodu (wydzielone i wbudowane)
- ✅ Adresy URL i ścieżki plików
- ✅ Struktury JSON i dane strukturalne
- ✅ Identyfikatory i chronione tokeny techniczne
- ✅ Wyrażenia matematyczne
- ✅ Definicje wywołań narzędzi/funkcji
- ✅ Prompty systemowe (w trybie lite)

Mechanizm odzyskiwania surowych danych wyjściowych RTK redaguje typowe klucze API, tokeny bearer, tokeny Slack, klucze dostępu AWS,
hasła, tokeny i dane poufne, zanim cokolwiek zostanie utrwalone.

---

## Statystyki kompresji

Każde skompresowane żądanie zawiera statystyki w logach serwera:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Harmonogram etapów

| Etap    | Tryby                                                                                                                                                         | Status    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Etap 1  | Wyłączony, Lekki                                                                                                                                              | ✅ Wydano |
| Etap 2  | Standardowy, Agresywny, Ultra                                                                                                                                 | ✅ Wydano |
| Etap 3  | RTK, Stosowy, Kombinacje kompresji                                                                                                                            | ✅ Wydano |
| Etap 4  | Style danych wyjściowych, Ultra klasy SLM, zestaw ewaluacyjny                                                                                                 | ✅ Wydano |
| Etap 4C | Adaptacyjny budżet kontekstu („pokrętło”) — silnik obliczeniowy + API (`contextBudget` w `PUT /api/settings/compression`) + kontrolki trybu/polityki w panelu | ✅ Wydano |

---

## Podziękowania

Reguły kompresji trybu standardowego są inspirowane projektem **[Caveman](https://github.com/JuliusBrussee/caveman)** autorstwa **[Juliusa Brussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — popularnym projektem „po co używać wielu tokenów, skoro kilka wystarczy”. Caveman raportuje `~75%` mniej tokenów wyjściowych, średnią oszczędność danych wyjściowych w testach porównawczych na poziomie `65%`, zakres oszczędności danych wyjściowych `22-87%` oraz narzędzie do kompresji danych wejściowych na poziomie `~46%`.

Tryb RTK jest inspirowany projektem **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** autorstwa **[RTK AI](https://github.com/rtk-ai)** — wysokowydajnym projektem kompresji danych wyjściowych poleceń, przeznaczonym do filtrowania danych wyjściowych terminala, kompilacji, testów, systemu git i narzędzi. RTK raportuje oszczędności na poziomie `60-90%`, a przykładowa sesja w pliku README pokazuje oszczędność `~80%`.

---

## Zaawansowane systemy kompresji

Poza 7 trybami opisanymi powyżej (kod źródłowy akceptuje również tryby `codex-responses` i
`omniglyph`, których ten przewodnik nie omawia) poniższe sekcje opisują funkcje
działające wewnątrz tych trybów lub obok nich: kompresja wyników narzędzi i progresywne starzenie
to kroki 1 i 2 silnika agresywnego (tryb Agresywny i krok `aggressive`
potoku stosowego), potok stosowy określa sposób działania trybu Stosowego, kompresja
uwzględniająca pamięć podręczną obniża `aggressive` i `ultra` do `standard` w przypadku dostawców
korzystających z pamięci podręcznej, gdy kompresja jest włączona, natomiast tryb wyjściowy Caveman i style danych wyjściowych są opcjonalnymi instrukcjami promptu systemowego,
domyślnie wyłączonymi, które kształtują dane wyjściowe modelu zamiast kompresować żądanie.

### Kompresja uwzględniająca pamięć podręczną

Niektórzy dostawcy (np. Anthropic z buforowaniem promptów) obsługują **buforowanie promptów**,
co pozwala im przechowywać części promptu w pamięci podręcznej w celu zmniejszenia kosztów i opóźnień. Gdy
buforowanie jest włączone, agresywna kompresja może w rzeczywistości **pogorszyć** wydajność,
ponieważ zmienia buforowane tokeny, unieważniając pamięć podręczną.

Moduł `cachingAware.ts` rozwiązuje ten problem przez **wykrywanie kontekstu buforowania** i
**odpowiednie dostosowywanie strategii kompresji**.

#### Jak to działa

1. **Wykrywanie kontekstu buforowania** — skanuje treść żądania pod kątem znaczników `cache_control`
2. **Identyfikowanie dostawców obsługujących buforowanie** — sprawdza, czy docelowy dostawca obsługuje buforowanie
3. **Dostosowywanie strategii** — obniża `aggressive`/`ultra` do `standard` w przypadku dostawców obsługujących buforowanie
4. **Pomijanie promptu systemowego** — prompty systemowe są zwykle buforowane, dlatego nie należy ich kompresować

Funkcja pomocnicza strategii zwraca również flagę `deterministicOnly`, ale konstruktor planu wykorzystuje
wyłącznie strategię — obecnie żaden dalszy element nie odczytuje tej flagi.

#### Przykład kodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Znacznik pamięci podręcznej
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kiedy używać

Kompresja uwzględniająca pamięć podręczną jest **zawsze włączona** — nie wymaga konfiguracji. Uruchamia się, gdy
kompresja jest włączona, a docelowy dostawca obsługuje buforowanie promptów (Anthropic, OpenAI
itd.); jawne znaczniki `cache_control` nie są wymagane — sam dostawca obsługujący buforowanie
wyzwala obniżenie trybu, natomiast same znaczniki nigdy tego nie robią (wykrywanie znaczników dostarcza danych telemetrycznych pamięci podręcznej,
a nie wpływa na decyzję dotyczącą strategii).

### Progresywne starzenie

Długie konwersacje gromadzą wiele tur wiadomości, ale starsze tury stają się mniej
istotne. Moduł `progressiveAging.ts` **degraduje wiadomości na podstawie odległości w turach**
(odległość jest mierzona od końca konwersacji). Przy dostarczanych ustawieniach domyślnych
(`verbatim: 2, light: 2, moderate: 3`):

- **Ostatnie 2 tury (odległość ≤ 2)**: Zachowywane bez zmian
- **Odległość 3**: Kompresja jaskiniowa (usuwanie wypełniaczy)
- **Odległość 4+**: Wiadomości asystenta są podsumowywane; wiadomości użytkownika są skracane do pierwszego
  wiersza, maksymalnie do 120 znaków; pozostałe role pozostają bez zmian. Prompty systemowe, wiadomości już poddane
  starzeniu oraz najnowsza wiadomość użytkownika są zawsze zachowywane bez zmian, niezależnie od odległości.
  Nic nie jest całkowicie usuwane, a przedział `light`
  jest nieosiągalny przy dostarczanych ustawieniach domyślnych (`light` jest równe `verbatim`).

#### Przykład kodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 kolejnych tur ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ostatnie 3 tury: bez zmian
  light: 8, // odległość <= 8: lekka kompresja
  moderate: 20, // odległość <= 20: kompresja jaskiniowa
  fullSummary: 5, // wymagane przez typ, nieodczytywane przez kod podziału na przedziały
  // odległość > 20: podsumowanie (asystent) / zachowany pierwszy wiersz (użytkownik)
});

// saved = liczba zaoszczędzonych tokenów
```

#### Kiedy używać

Progresywne starzenie jest **zawsze włączone** w trybie `aggressive` — jest to krok 2 funkcji
`compressAggressive()`. Tryb Ultra go nie uruchamia. Jest ono
szczególnie skuteczne w przypadku:

- Długotrwałych sesji programistycznych
- Wielodniowych konwersacji
- Przepływów pracy agentów z wieloma wywołaniami narzędzi

### Tryb odpowiedzi jaskiniowej

Tryb odpowiedzi jaskiniowej dodaje **instrukcje promptu systemowego**, które proszą sam model o
zwięzłe odpowiedzi — poziom `lite` prosi o zwięzłe odpowiedzi zachowujące pełne zdania, `full`
prosi, aby „odpowiadać zwięźle jak bystry jaskiniowiec”, a `ultra` prosi o odpowiedzi telegraficzne;
instrukcje jedynie o to proszą i nie mogą tego zagwarantować. Żądania otrzymują je za pośrednictwem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` najpierw ustala wybór za pomocą warstwy zgodności wstecznej
(`resolveOutputStyleSelection()` w
`open-sse/services/compression/outputStyles/backCompat.ts`), która, gdy `outputStyles`
jest puste, mapuje włączone `cavemanOutputMode` na styl odpowiedzi `terse-prose` z poziomem
`cavemanOutputMode.intensity` (patrz Zgodność wsteczna poniżej); niepusty wybór `outputStyles`
jest używany bez zmian, a `cavemanOutputMode.enabled` i `intensity` nie mają wtedy żadnego
wpływu, natomiast przełącznik `autoClarity` nadal obowiązuje. Plik `outputMode.ts` zawiera
teksty instrukcji (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), mechanizm pomijania zawartości oraz
funkcję pomocniczą określającą miejsce używane przez mechanizm wstrzykiwania; jego własny
mechanizm wstrzykiwania `applyCavemanOutputMode()` nie ma wywołującego go kodu produkcyjnego.

#### Jak to działa

Ten tryb nie kompresuje danych wejściowych. Dodaje blok instrukcji do promptu systemowego
(patrz Jak działa wstrzykiwanie poniżej), a dowolny tryb kompresji danych wejściowych wybrany dla żądania
jest nadal uruchamiany później na treści, która zawiera już ten blok. Przed wspólną
klauzulą ograniczeń, którą kończy się każdy poziom, angielski poziom `full` ma następującą treść:

> „Odpowiadaj zwięźle jak bystry jaskiniowiec. Pomijaj rodzajniki (a/an/the), wypełniacze (just/really/basically/actually/simply), uprzejmości i wyrażenia asekuracyjne. Równoważniki zdań są dozwolone. Używaj krótkich synonimów (big zamiast extensive, fix zamiast implement). Zachowuj bez zmian całą treść techniczną, kod, błędy, adresy URL i identyfikatory.”

Działa to szczególnie dobrze w przypadku:

- Generowania kodu (zwięźlejsze odpowiedzi = mniej tokenów)
- Szybkich pytań i odpowiedzi (bez potrzeby rozbudowanych wyjaśnień)
- Przetwarzania wsadowego (maksymalizacja przepustowości)

#### Kiedy używać

Tryb odpowiedzi jaskiniowej jest **opcjonalny**. Przy włączonej kompresji (`enabled: true`, główny przełącznik
na stronie Compression Settings) włącz go za pomocą `cavemanOutputMode.enabled`; `intensity`
wybiera `lite`, `full` lub `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Przełącznik **Output Mode** kombinacji kompresji (`outputMode`, z poziomem określonym przez `outputModeIntensity`)
ustawia ten sam przełącznik dla żądań, do których ma zastosowanie dana kombinacja, a narzędzie MCP
`omniroute_set_compression_engine` zapisuje go za pośrednictwem swojego logicznego argumentu `outputMode`.
Niepusty wybór `outputStyles` ma pierwszeństwo przed tym przełącznikiem. W panelu włączenie stylu odpowiedzi
**Terse prose** powoduje wstrzyknięcie tego samego bloku (patrz Style odpowiedzi poniżej).

### Style odpowiedzi (katalog)

Opisany powyżej tryb odpowiedzi jaskiniowej jest **starszą ścieżką pojedynczego stylu**. Faza 4 uogólniła go
do postaci katalogu komponowalnych stylów odpowiedzi: `OUTPUT_STYLE_CATALOG` w
`open-sse/services/compression/outputStyles/catalog.ts`. Każdy styl jest instrukcją promptu systemowego,
która prosi sam model o generowanie tańszych odpowiedzi; style można włączać
jednocześnie i są one wstrzykiwane w kolejności katalogowej.

| Styl                      | `id`          | Działanie                                                                                                                                                                                                                                                   | Języki instrukcji                                       |
| ------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Zwięzła proza             | `terse-prose` | Usuwa wypełniacze/rodzajniki/asekuracyjne sformułowania; zachowuje precyzyjną treść techniczną. Ten sam tekst co w starszym trybie wyjściowym caveman (przywołany, nieprzepisywany).                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Mniej kodu                | `less-code`   | Drabina YAGNI: najmniejsza działająca zmiana, bez niezamówionych abstrakcji.                                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Kucyk (leniwy senior dev) | `ponytail`    | „Najlepszy kod to kod, którego nigdy nie napisano”: ponowne użycie > przepisywanie, główna przyczyna > objaw, najkrótszy działający diff.                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Mam ADHD (najpierw akcja) | `i-have-adhd` | Najpierw działanie (polecenie/ścieżka/fragment przed opisem), numerowane kroki o ograniczonym zakresie, JEDEN konkretny następny krok, bez wstępu/podsumowania/zakończenia. Na podstawie [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Zwięzły CJK (文言)        | `terse-cjk`   | Odpowiedź `full`/`ultra` w klasycznym języku chińskim (文言); `lite` jedynie wymaga krótkich odpowiedzi bez wyrazów funkcyjnych, uprzejmości ani ozdobników.                                                                                                | zh (ograniczone ustawieniami regionalnymi, patrz niżej) |

Każdy styl jest dostępny w trzech poziomach intensywności — `lite`, `full`, `ultra` — a każdy poziom
kończy się wspólną klauzulą ograniczeń (`SHARED_BOUNDARIES` w `outputMode.ts`), która
zachowuje dokładną postać bloków kodu, ścieżek plików, poleceń, błędów i adresów URL. Teksty poziomów
`terse-prose` i `terse-cjk` dodają do tej listy identyfikatory.

`terse-cjk` jest ograniczony do ustawienia regionalnego `zh` w dwóch miejscach. Strona ustawień kompresji wyświetla
jego wiersz tylko wtedy, gdy językiem interfejsu panelu jest chiński (`zh-CN` lub `zh-TW`), a
`applyOutputStyles()` wstrzykuje go tylko wtedy, gdy ustalonym językiem żądania (patrz sekcja Wybór
języka poniżej) jest `zh`. Ukrycie wiersza nie usuwa zapisanego wyboru `terse-cjk`:
API ustawień akceptuje dowolny identyfikator stylu, a zapisywanie innych stylów na stronie zachowuje ten wybór. Podczas
obsługi żądania sprawdzenie języka w `applyOutputStyles()` jest jedynym ograniczeniem regionalnym.

#### Jak działa wstrzykiwanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) dopasowuje
wybór do katalogu (nieznane identyfikatory i style niezgodne z ustawieniem regionalnym są
odrzucane bez zgłaszania błędu; wybór, który nie daje żadnego stylu, pozostawia treść
bez zmian i jest pomijany jako `no_styles`), łączy wybrane instrukcje w kolejności
katalogowej,
jednokrotnie dołącza klauzulę ograniczeń **raz** (oraz klauzulę bezpieczeństwa, `SAFETY_BOUNDARIES` lub jej
tłumaczenie, gdy wybrano `less-code` albo `ponytail`) i rozpoczyna blok pojedynczym
znacznikiem idempotencji (`[OmniRoute Output Styles]`), dzięki czemu ponowne zastosowanie niczego nie zmienia. Gdy
ustalony język (patrz sekcja Wybór języka poniżej) ma tłumaczenie, zamiast angielskiej
instrukcji wstrzykiwana jest wersja zlokalizowana.

W treści z niepustą tablicą `messages` sprawdzenie idempotencji odbywa się przed
pominięciem na podstawie zawartości: gdy znacznik `[OmniRoute Output Styles]` znajduje się już w polu
`system` najwyższego poziomu (jako ciąg znaków lub tablica bloków treści) albo w komunikacie systemowym z treścią
tekstową, treść pozostaje bez zmian ze statusem `already_applied`, a sprawdzanie słów kluczowych nie jest wykonywane.
W przeciwnym razie mechanizm pomijania na podstawie zawartości (`shouldBypassCavemanOutputMode()` w
`open-sse/services/compression/outputMode.ts`) sprawdza tekst trzech ostatnich
wiadomości niezależnie od ich roli i pomija style dla całej tury, gdy tekst
pasuje do słów kluczowych dotyczących bezpieczeństwa, nieodwracalnych działań lub doprecyzowania albo do
sekwencji zależnej od kolejności: `first`, `then`, `after that`, `before`, `rollback` lub
`backup`, po których w obrębie 240 znaków występuje `delete`, `drop`, `migrate`, `deploy` lub
`release`. Pomijanie działa, gdy przełącznik **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, domyślnie włączony) jest aktywny; wyłączenie przełącznika pomija
sprawdzanie słów kluczowych.

Gdy mechanizm pomijania przepuści turę, `placeSystemInstruction()` (ten sam plik), który
nigdy nie tworzy nowego `messages[0]`, umieszcza blok w pierwszym znalezionym miejscu z poniższych:

1. Początkowy komunikat systemowy z treścią tekstową: blok jest dołączany po jego tekście.
2. Pole `system` najwyższego poziomu: blok jest dołączany po tekście ciągu znaków albo
   dodawany jako nowy blok tekstowy do tablicy bloków treści.
3. Pierwszy późniejszy komunikat systemowy z treścią tekstową: blok jest dołączany po jego
   tekście.
4. Żadne z powyższych: blok trafia do nowego komunikatu systemowego na końcu `messages`.

W treści bez tablicy `messages` (lub z pustą tablicą) nie jest wykonywane pomijanie na podstawie zawartości,
a pole `system` najwyższego poziomu nie jest brane pod uwagę. Blok jest dołączany po tekście
tekstowego pola `instructions`, chyba że pole to zawiera już znacznik
`[OmniRoute Output Styles]`; w takim przypadku treść pozostaje bez zmian ze statusem
`already_applied`. Gdy treść nie ma tekstowego pola `instructions`, ale zawiera `input`
(jako ciąg znaków lub tablicę), blok staje się wartością `instructions`, zastępując każdą nietekstową wartość,
która wcześniej znajdowała się w tym polu. Treść bez tekstowego pola `instructions` ani tekstowego lub tablicowego
`input` pozostaje bez zmian i jest pomijana jako `no_messages`.

#### Jak włączyć

W panelu: **Kontekst kompresji → Ustawienia kompresji**
(`/dashboard/context/settings`), w sekcji stylów wyjściowych: jeden wiersz na styl, z
przełącznikiem wł./wył. i selektorem poziomu. Style są wstrzykiwane, gdy sama kompresja
jest włączona (główny przełącznik strony, `enabled`). Przełącznik **Auto-Clarity Bypass**
znajduje się na stronie **Caveman** (`/dashboard/context/caveman`), na jej karcie
**Tryb wyjściowy**. Programistycznie konfiguracja kompresji zapisuje wybór jako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Zgodność wsteczna: gdy `outputStyles` jest puste, starsze ustawienie
`cavemanOutputMode.enabled` jest mapowane na `terse-prose` z poziomem
`cavemanOutputMode.intensity`. Blok zaczyna się następnie od znacznika
`[OmniRoute Output Styles]`, podczas gdy starszy mechanizm wstrzykiwania
`applyCavemanOutputMode()` dodawał `[OmniRoute Caveman Output Mode]`. Poniżej znacznika
tekst odpowiada starszemu wstrzyknięciu w językach en, pt-BR, es, de, fr, it, ru, id i
vi; w ja i zh zawiera jedną dodatkową spację przed klauzulą dotyczącą granic.
`terse-prose` ma tłumaczenia na pt-BR, es, de, fr, it, ru, zh, ja, id i vi, więc żądanie,
dla którego rozpoznanym językiem jest `hu`, otrzymuje tekst angielski, podczas gdy
starszy mechanizm wstrzykiwania używał tekstu węgierskiego.

Wybór języka stylu wyjściowego (`resolveOutputStyleLanguage()` w
`outputStyles/apply.ts`): gdy `languageConfig.enabled` jest włączone, `autoDetect`
pobiera próbkę z najnowszej wiadomości użytkownika w tablicy `messages` żądania, która
zawiera tekst (treść będącą ciągiem znaków albo `text` jej części składowych), i
uruchamia na niej mechanizm wykrywania Caveman (`detectCompressionLanguage()`).
Mechanizm wykrywania zwraca `zh` dla tekstu zawierającego znaki Han i niezawierającego
kany; w przeciwnym razie zwraca ten spośród języków `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` i `id`, który ma najwięcej dopasowań wskazówek, a `en`, gdy nie ma
żadnych dopasowań — tekst, którego nie można sklasyfikować, otrzymuje język angielski,
nigdy `defaultLanguage`, a `vi` nigdy nie jest wykrywany, mimo że style zawierają tekst
w języku `vi`. Treść interfejsu Responses API przechowuje swoje wypowiedzi w `input`,
który nie jest próbkowany, dlatego używany jest `defaultLanguage`, a następnie język
angielski. Gdy żadna wiadomość użytkownika w `messages` nie zawiera tekstu albo gdy
`autoDetect` jest wyłączone, stosowany jest `defaultLanguage`, a następnie język
angielski. Gdy `languageConfig.enabled` jest wyłączone, językiem jest angielski — chyba
że do żądania ma zastosowanie kombinacja kompresji (kombinacja przypisana do kombinacji
trasowania żądania albo domyślna kombinacja kompresji, której `chatCore` używa awaryjnie
dla wbudowanego potoku warstwowego): zastosowanie kombinacji włącza
`languageConfig.enabled` dla tego żądania i ustawia `defaultLanguage` na podstawie
pakietów językowych kombinacji (zapisana wartość, jeśli należy do pakietów kombinacji,
w przeciwnym razie pierwszy pakiet kombinacji, który domyślnie ma wartość `en`), podczas
gdy zapisane ustawienie `autoDetect` (domyślnie włączone) nadal ma zastosowanie. Silnik
wejściowy Caveman wybiera język pakietu reguł inaczej — osobno dla każdej części tekstu,
a przy wyłączonym automatycznym wykrywaniu jest dodatkowo ograniczany przez
`enabledPacks`.

Macierz styl × język jest ustalona przez
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: każdy styl katalogowy musi
mieć wpis w `BASELINE_LANGUAGES` testu; styl, który nie jest ograniczony do określonych
ustawień regionalnych, musi zawierać tłumaczenie na pt-BR (ograniczony regionalnie
`terse-cjk` jest zwolniony z tej reguły), chyba że jest wymieniony w
`KNOWN_ENGLISH_ONLY`, które może zawierać wyłącznie style nieposiadające żadnych
tłumaczeń — wymieniony styl, który ma jakiekolwiek tłumaczenie, powoduje niepowodzenie
testu; styl powoduje również niepowodzenie testu, jeśli utraci język wymieniony w jego
wpisie `BASELINE_LANGUAGES`. Aby dodać styl, zobacz
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresja wyników narzędzi

`compressToolResult()` w `open-sse/services/compression/toolResultCompressor.ts`
kompresuje tekst wyników narzędzi przy użyciu **5 strategii**. Próbuje ich w tej
kolejności, a pierwsza włączona strategia, której warunek pasuje do treści, określa
wynik:

1. **`fileContent`**: zawartość składająca się z co najmniej 3 wierszy, w której co najmniej jeden wiersz, po pominięciu
   początkowych wcięć, zaczyna się od `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` lub `return ` (słowo kluczowe wraz ze spacją) albo od `if`,
   `for` lub `while`, po którym następuje `(` lub ` (`, zachowuje pierwsze 20 i ostatnie 5 wierszy,
   a pominięty środek zostaje oznaczony.
2. **`grepSearch`**: zawartość z co najmniej jednym wierszem w postaci `<path>:<digits>:`,
   gdzie tekst przed pierwszym dwukropkiem nie zawiera białych znaków, zachowuje wyłącznie takie wiersze,
   maksymalnie 30, po których podawana jest liczba pozostałych dopasowań oraz lista dopasowanych plików;
   każdy inny wiersz jest usuwany. Jeden taki wiersz wystarcza do uruchomienia strategii, więc
   wiersz dziennika rozpoczynający się znacznikiem czasu, takim jak `12:30:45`, również jest uwzględniany.
3. **`shellOutput`**: dane wyjściowe zawierające sekwencję ANSI CSI (`ESC[`, następnie cyfry lub
   średniki, a potem literę, jak w kodach kolorów) albo znak `$`, po którym w dowolnym miejscu tekstu
   występuje biały znak, tracą te sekwencje (inne sekwencje sterujące, takie jak `ESC[?25l` lub
   sekwencja OSC tytułu okna, są zachowywane) i zachowują ostatnie 50 wierszy, przy czym kolejne
   powtarzające się wiersze są scalane. Ponieważ to sprawdzenie jest wykonywane przed `json` i `errorMessage`,
   dane wyjściowe JSON lub błędu zawierające taki znak `$` nigdy do nich nie trafiają, gdy
   `shellOutput` jest włączone.
4. **`json`**: ładunek JSON o długości ponad 2000 znaków, który zaczyna się od `{` lub `[` (po
   opcjonalnych białych znakach) i może zostać przeanalizowany, jest podsumowywany: tablica zawierająca więcej niż 7 elementów zachowuje
   pierwszych 5 i ostatnie 2 elementy oraz ich łączną liczbę, natomiast obiekt zachowuje pierwszych 20
   kluczy, przy czym każda wartość będąca zagnieżdżonym obiektem lub tablicą jest zastępowana symbolem zastępczym `{…N keys}`
   (w przypadku tablicy N oznacza jej długość) oraz znacznikiem `_remaining_<N>_keys` zliczającym klucze
   pominięte po pierwszych 20. Wartości skalarne są kopiowane w całości, więc obiekt zawierający nie więcej niż 20 kluczy
   i bez zagnieżdżonych wartości otrzymuje jedynie nowe wcięcia — wersja zminimalizowana zyskuje znaki
   i pozostaje bez zmian.
5. **`errorMessage`**: dane wyjściowe zawierające w dowolnym miejscu i przy dowolnej wielkości liter `error:`,
   `error ` (słowo zakończone spacją, jak w `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` lub `traceback` zachowują pierwszy wiersz,
   kolejnych 10 wierszy oraz ostatnie 3, a wiersze między nimi są zastępowane znacznikiem
   `… [N frames elided] …`. Znacznik pojawia się tylko wtedy, gdy po pierwszym wierszu występuje więcej
   niż 13 wierszy, dlatego dane wyjściowe błędu składające się z nie więcej niż 14 wierszy nie są skracane (przy 12 lub 13 wierszach
   ostatnie 3 powtarzają wiersze już zachowane).

Po dopasowaniu strategii kolejne strategie nie są sprawdzane, nawet jeśli dana strategia
niczego nie zaoszczędzi. Gdy dopasowana strategia nie oszczędza żadnych szacowanych tokenów (długość ÷ 4, zaokrąglona w górę) —
na przykład w przypadku pliku przypominającego kod, zawierającego nie więcej niż 25 wierszy, lub tablicy JSON o długości ponad 2000
znaków, zawierającej nie więcej niż 7 elementów — silnik agresywny zachowuje oryginalny wynik narzędzia:
oba wywołania (`compressAggressive()` i `compressAnthropicToolResultBlock()`)
zachowują oryginał, gdy `saved` wynosi 0 lub mniej, podczas gdy sama funkcja `compressToolResult()`
nadal zwraca wynik tej strategii. Etap wyniku narzędzia nie jest ostateczny:
awaryjny mechanizm podsumowujący silnika może nadal skrócić komunikat `tool` lub `function` dłuższy
niż 8192 znaki (`maxTokensPerMessage`, 2048, pomnożone przez 4).

#### Kiedy używać

Kompresja wyników narzędzi stanowi krok 1 silnika agresywnego (`compressAggressive()` w
`open-sse/services/compression/aggressive.ts`), dlatego działa w trybie Aggressive oraz w kroku
`aggressive` potoku stosowego. Kompresuje komunikaty `tool` i `function` w formacie OpenAI
oraz tekst wewnątrz bloków Anthropic `tool_result`. Każda strategia ma własny
przełącznik w `aggressive.toolStrategies`; wszystkie są domyślnie włączone. W panelu
przełączniki znajdują się w widoku **Advanced** strony Caveman, gdy kompresja jest włączona,
a domyślnym trybem jest Aggressive.

### Potok stosowy

Tryb stosowy uruchamia **wiele silników kolejno** — zwykle najpierw RTK
(60–90% oszczędności w wynikach narzędzi), a następnie Caveman na pozostałym tekście (~46%
oszczędności danych wejściowych). Łącznie daje to **kwalifikujący się zakres 78–95%** (patrz Obliczanie oszczędności nadrzędnych
powyżej): `1 - (1 - 0.60..0.90) × (1 - 0.46)` daje średnio ≈89%.

#### Jak to działa

```
Dane wejściowe (1000 tokenów)
  → RTK (filtr uwzględniający polecenia) → 200 tokenów
    → Caveman (usuwanie wypełniaczy) → 108 tokenów
  → Dane wyjściowe (108 tokenów, ~89% oszczędności)
```

#### Kiedy używać

Używaj trybu stosowego w przypadku:

- Przepływów pracy intensywnie korzystających z narzędzi (programowanie agentowe, badania)
- Przetwarzania wsadowego wrażliwego na koszty
- Sytuacji, gdy potrzebujesz maksymalnej oszczędności tokenów

Potoki stosowe konfiguruje się za pomocą globalnego ustawienia kompresji `stackedPipeline`
albo za pomocą nazwanego zestawu kompresji przypisanego do zestawu routingu (patrz
Nadpisywanie dla poszczególnych zestawów powyżej) — nie za pomocą `modePack` automatycznego zestawu (to pole jedynie
zmienia wagi wyboru modelu automatycznego zestawu, a `stacked` nie jest prawidłową nazwą pakietu).

---

## Nadpisywanie kompresji dla kombinacji

Możesz nadpisać globalny tryb kompresji **dla każdej kombinacji osobno**, aby precyzyjnie dostosować zachowanie
do różnych przypadków użycia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Jest to przydatne w przypadku:

- **Kombinacji do programowania**: użyj trybu `aggressive` podczas długich sesji
- **Kombinacji do szybkich pytań i odpowiedzi**: użyj trybu `lite`, aby uzyskać szybkie odpowiedzi
- **Kombinacji intensywnie korzystających z narzędzi**: użyj trybu `stacked`, aby uzyskać maksymalne oszczędności
- **Kombinacji produkcyjnych**: pozostaw nadpisywanie wyłączone w przypadku dostawców obsługujących buforowanie — zawsze aktywne
  dostosowanie uwzględniające pamięć podręczną automatycznie zmienia tryb `aggressive`/`ultra` na `standard`
  (nie istnieje możliwy do wybrania tryb `cache-aware`)

---

## Zobacz także

- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — zmienne środowiskowe kompresji
- [Przewodnik po architekturze](../architecture/ARCHITECTURE.md) — wewnętrzne mechanizmy potoku kompresji
- [Podręcznik użytkownika](../guides/USER_GUIDE.md) — rozpoczęcie pracy z kompresją
- [Kompresja RTK](./RTK_COMPRESSION.md) — filtry RTK, model zaufania, bramka weryfikacji i odzyskiwanie nieprzetworzonych danych wyjściowych
- [Mechanizmy kompresji](./COMPRESSION_ENGINES.md) — Caveman, RTK, tryb `stacked`, interfejsy API, MCP i panel sterowania
- [Format reguł kompresji](./COMPRESSION_RULES_FORMAT.md) — format pakietu reguł JSON
- [Pakiety językowe kompresji](./COMPRESSION_LANGUAGE_PACKS.md) — reguły Caveman specyficzne dla języka
