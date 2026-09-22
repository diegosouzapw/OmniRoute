# 🗜️ Prompt Compression Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatycznie oszczędzaj 15–95% kwalifikującego się kontekstu. Krótkie omówienie znajdziesz w [sekcji README dotyczącej kompresji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Przegląd

OmniRoute implementuje modułowy potok kompresji promptów, który działa **proaktywnie**, zanim żądania trafią do dostawców nadrzędnych. Oznacza to, że tokeny są oszczędzane w sposób transparentny — nie musisz niczego zmieniać w swoim przepływie pracy.

```
Żądanie klienta
  → Selektor strategii kompresji
    → Nadpisanie przez kombinację? → Użyj ustawienia kombinacji
    → Próg automatycznego wyzwalania? → Użyj trybu automatycznego
    → Tryb domyślny? → Użyj ustawienia globalnego
    → Wyłączona? → Pomiń kompresję
  → Wybrany tryb kompresji
    → Wyłączony: Brak kompresji
    → Lekki: Bezpieczne czyszczenie białych znaków i formatowania (~15%)
    → Standardowy: Usuwanie zbędnych wyrażeń w stylu telegraficznym (~30%)
    → Agresywny: Starzenie historii i podsumowywanie (~50%)
    → Ultra: Przycinanie heurystyczne i odchudzanie bloków kodu (~75%)
    → RTK: Filtrowanie danych wyjściowych terminala/narzędzi z uwzględnieniem poleceń (zakres 60–90% po stronie nadrzędnej)
    → Warstwowy: Uporządkowany potok wielu silników, zwykle RTK, a następnie Caveman (zakres 78–95% kwalifikującej się treści)
  → Skompresowane żądanie → Dostawca
```

---

## Tryby kompresji

### Wyłączony

Kompresja nie jest stosowana. Wszystkie wiadomości są przekazywane bez zmian.

### Tryb lekki (~15% oszczędności, opóźnienie <1 ms)

Najbezpieczniejszy tryb — bez żadnych zmian semantycznych, wyłącznie czyszczenie formatowania:

| Technika                 | Opis                                                           |
| ------------------------ | -------------------------------------------------------------- |
| `collapseWhitespace`     | Łączenie kolejnych pustych wierszy i usuwanie końcowych spacji |
| `dedupSystemPrompt`      | Usuwanie zduplikowanych wiadomości systemowych                 |
| `compressToolResults`    | Kompresowanie rozwlekłych wyników narzędzi/funkcji             |
| `removeRedundantContent` | Usuwanie powtarzających się instrukcji                         |
| `replaceImageUrls`       | Skracanie identyfikatorów URI obrazów w formacie base64        |

**Najlepszy do:** Stałego stosowania i przepływów pracy o krytycznym znaczeniu dla bezpieczeństwa.

### Tryb standardowy (~30% oszczędności)

Inspirowany projektem [Caveman](https://github.com/JuliusBrussee/caveman) — usuwa zbędne słowa i rozwlekłe sformułowania, zachowując znaczenie:

- Usuwa zbędne słowa („please”, „I think”, „basically”, „actually”)
- Skraca rozwlekłe wyrażenia („in order to” → „to”, „as a result of” → „because”)
- Usuwa nadmiernie uprzejme i asekuracyjne sformułowania („Would you mind...”, „If you could possibly...”)
- Ponad 30 reguł wyrażeń regularnych dostrojonych do promptów programistycznych

**Najlepszy do:** Codziennych zadań programistycznych i zespołów dbających o koszty.

### Tryb agresywny (~50% oszczędności)

Inteligentne zarządzanie historią długich sesji:

- **Starzenie wiadomości** — starsze wiadomości są stopniowo coraz bardziej kompresowane
- **Podsumowywanie wyników narzędzi** — długie wyniki narzędzi są zastępowane podsumowaniami
- **Mechanizmy ochrony integralności strukturalnej** — zapewniają spójność par `tool_use` + `tool_result`
- **Uwzględnianie okna kontekstu** — respektuje limity tokenów poszczególnych modeli

**Najlepszy do:** Długich sesji debugowania i dużych baz kodu.

### Tryb Ultra (~75% oszczędności)

Maksymalna kompresja w scenariuszach, w których liczba tokenów ma krytyczne znaczenie:

- **Przycinanie heurystyczne** — usuwa wiadomości poniżej progu istotności
- **Odchudzanie bloków kodu** — kompresuje powtarzalne przykłady kodu
- **Obcinanie z użyciem wyszukiwania binarnego** — znajduje optymalny punkt odcięcia dla okna kontekstu
- Obejmuje wszystkie funkcje trybu agresywnego

**Najlepszy do:** Sytuacji, w których wielokrotnie osiągasz limity kontekstu.

### Tryb RTK (zakres 60–90% po stronie nadrzędnej)

Tryb RTK jest zoptymalizowany pod kątem rozwlekłych wyników narzędzi pojawiających się w sesjach agentów programistycznych:

- Wykrywa klasy poleceń/wyników, takie jak `git status`, `git diff`, `git log`, narzędzia uruchamiające testy,
  kompilacje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audyty/instalacje npm, logi Docker, dane wyjściowe
  infrastruktury i ogólne dane wyjściowe powłoki
- Stosuje pakiety filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schematu RTK TOML v1 z projektowych lub globalnych plików `filters.toml`, z walidacją
  testów wbudowanych i kontrolą zaufania dla plików projektowych
- Zawiera 49 wbudowanych filtrów z wbudowanymi przykładami weryfikacyjnymi
- Usuwa sekwencje sterujące ANSI, paski postępu, powtarzające się wiersze i nieprzydatny szum
- Zachowuje informacje o niepowodzeniach, błędach, ostrzeżeniach, zmienionych plikach, podsumowaniach i końcowej części długich danych wyjściowych
- Obsługuje filtry projektowe podlegające kontroli zaufania, filtry globalne i opcjonalne odzyskiwanie zredagowanych surowych danych wyjściowych

**Najlepszy do:** Sesji agentów zawierających transkrypcje powłoki, kompilacji, testów, poleceń git i grep oraz operacji na plikach.

### Tryb warstwowy (zakres 78–95% kwalifikującej się treści)

Tryb warstwowy uruchamia wiele silników kompresji w deterministycznej kolejności. Domyślny potok to:

```txt
RTK -> Caveman
```

Ta kolejność najpierw kompresuje dane wyjściowe terminala/narzędzi, a następnie stosuje semantyczną kondensację Caveman do
pozostałego promptu w języku naturalnym. Potoki warstwowe można konfigurować globalnie lub za pomocą
kombinacji kompresji przypisanych do kombinacji routingu.

**Najlepszy do:** Mieszanego kontekstu zawierającego duże logi narzędzi oraz instrukcje użytkownika lub podsumowania asystenta.

---

## Obliczanie oszczędności z projektów bazowych

OmniRoute dokumentuje oszczędności wynikające z kompresji na podstawie dwóch źródeł: testów wydajności projektów bazowych oraz
własnej kompozycji silników OmniRoute.

| Źródło  | Wartość z README projektu bazowego użyta tutaj                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` mniej tokenów wyjściowych, średnia oszczędność wyjściowa w testach wynosząca `65%`, zakres `22-87%` oraz narzędzie do kompresji danych wejściowych o wartości `~46%` |
| RTK     | `60-90%` oszczędności na danych wyjściowych poleceń; przykładowa sesja: `~118,000 -> ~23,900` tokenów, czyli oszczędność `79.7%` (`~80%`)                                   |

W przypadku nakładających się danych narzędzi/kontekstu domyślna kombinacja OmniRoute łączy silniki kaskadowo:

```txt
RTK -> Caveman
```

Łączne oszczędności są mnożone, a nie dodawane:

```txt
łącznie  = 1 - (1 - oszczędności RTK) * (1 - oszczędności wejściowe Caveman)
średnia  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
zakres   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Wartość `78-95%` ma zastosowanie, gdy zarówno RTK, jak i Caveman mogą zmniejszyć ten sam ładunek wejściowy/kontekstowy.
Tryb wyjściowy odpowiedzi Caveman jest osobny: po jego włączeniu należy używać własnych wartości oszczędności wyjściowych Caveman (`65%`
średnio, `~75%` w głównej deklaracji, zakres `22-87%`). Całkowite oszczędności rozliczeniowe zależą od proporcji promptów i danych wyjściowych.

### Co właściwie oznacza „kwalifikujący się”

Deklarowany zakres 15-95% jest rzeczywisty, ale dotyczy wyłącznie **nadmiarowej lub rozwlekłej** treści — powtarzających się
wierszy błędów, dziennika kompilacji zasypywanego tym samym ostrzeżeniem czy zbyt obszernego wyniku `grep`/odczytu pliku. **Nie**
oznacza to, że każde żądanie zapewni taką oszczędność.

Potwierdzono empirycznie (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uruchomienie
`stacked` (RTK + Caveman) na bloku `tool_result` w formacie Anthropic, zawierającym 300 identycznych
wierszy błędów, przyniosło **95.93% oszczędności tokenów / 96.26% oszczędności znaków** — dokładnie w reklamowanym
zakresie. Jednak uruchomienie tego samego potoku na zwykłych, nienadmiarowych danych wyjściowych narzędzia (czysta lista dopasowań `grep`,
krótki odczyt pliku, zwykły tekst konwersacyjny) prawidłowo daje **oszczędności bliskie zeru**, ponieważ
nie ma niczego powtarzalnego do usunięcia, a `validateCompression()` (`validation.ts`) nie zezwala na użycie
przekształconej treści, która usuwałaby lub zmieniała bloki kodu, adresy URL, nagłówki, wersje albo identyfikatory stałych zapisane WIELKIMI_LITERAMI.

Jest to oczekiwane i bezpieczne zachowanie, a nie błąd: sesja programistyczna, która głównie odczytuje/przeszukuje czyste pliki,
przyniesie umiarkowane łączne oszczędności nawet przy w pełni włączonej kompresji, natomiast sesja, która trafi na zapętlony
błąd lub nadmiernie gadatliwy linter, osiągnie pełny zakres 78-95% dla tego ruchu. Nie należy traktować niskiego
łącznego procentu oszczędności z pojedynczej sesji jako dowodu na nieprawidłową konfigurację kompresji — najpierw sprawdź, czy
bazowe dane wyjściowe narzędzia rzeczywiście były nadmiarowe.

---

## Wizualizacja oszczędności tokenów

```
Bez kompresji:       47K tokenów wysłanych do LLM
Z Lite:              40K tokenów wysłanych          (15% oszczędności — bezpiecznie, zawsze włączone)
Ze Standard:         33K tokenów wysłanych          (30% oszczędności — reguły caveman-speak)
Z Aggressive:        24K tokenów wysłanych          (50% oszczędności — starzenie + podsumowywanie)
Z Ultra:             12K tokenów wysłanych          (75% oszczędności — przycinanie heurystyczne)
Z RTK:               19K-5K tokenów wysłanych       (60-90% oszczędności na danych wyjściowych poleceń/narzędzi)
Ze Stacked:          10K-2.5K tokenów wysłanych     (kwalifikujący się zakres RTK+Caveman: 78-95%)
```

---

## Konfiguracja

### Panel sterowania

Przejdź do `Dashboard → Context & Cache`:

- **Caveman** — wybór trybu, pakiety językowe, podgląd i globalne ustawienia domyślne
- **RTK** — podgląd filtrowania poleceń, ustawienia bezpieczeństwa RTK i katalog filtrów
- **Compression Combos** — nazwane potoki silników przypisane do kombinacji routingu
- **Auto-Trigger Threshold** — automatyczne włączanie kompresji, gdy liczba tokenów przekroczy próg

### Nadpisanie dla kombinacji

W `Dashboard → Context & Cache → Compression Combos` przypisz kombinację kompresji do kombinacji
routingu:

```txt
Kombinacja: "free-tier-fallback"
  Kombinacja kompresji: "coding-agent-stack"
  Potok: RTK -> Caveman
  Cele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Pozwala to używać kompresji wieloetapowej u bezpłatnych dostawców lub dostawców przeznaczonych do
kodowania, zachowując jednocześnie tryb uproszczony w płatnych subskrypcjach.

To przypisanie „Nadpisanie dla kombinacji” jest innym mechanizmem sterowania niż nadpisanie
**trybu kompresji kombinacji routingu** (Default/Off/Lite/Standard/Aggressive/Ultra) — to nadpisanie
nie wybiera nazwanego potoku kombinacji kompresji; ustawia jedynie pole `compressionMode`
uwzględniane przez `resolveCompressionPlan`. Można je ustawić na karcie kombinacji
(`Dashboard → Combos`) lub, od wersji #6760, dla każdej kombinacji routingu na liście
„Assign to routing” w `Dashboard → Context & Cache → Compression Combos`, tuż obok pola wyboru
przypisania potoku opisanego powyżej. Ustawienia z obu miejsc są zapisywane przez ten sam punkt
końcowy `PUT /api/combos/{id}`.

### Nadpisanie dla żądania

Wyślij nagłówek żądania `x-omniroute-compression`, aby nadpisać plan kompresji dla pojedynczego
żądania. Ma on najwyższy priorytet — zastępuje nadpisanie kombinacji routingu, aktywny profil,
automatyczne wyzwalanie oraz ustawienie Default z panelu. Nieznane wartości są ignorowane
(żądanie nigdy nie zostaje odrzucone), a globalny przełącznik główny nadal kontroluje całość:
gdy kompresja jest globalnie wyłączona, nagłówek nie może jej włączyć. Wartości:

| Wartość       | Efekt                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Brak kompresji dla tego żądania.                                                                                              |
| `default`     | Domyślny profil wynikający z ustawień panelu (ignoruje aktywny profil).                                                       |
| `engine:<id>` | Pojedynczy silnik, jeśli jest włączony, np. `engine:rtk`.                                                                     |
| `<combo>`     | Nazwana kombinacja, dopasowywana najpierw według nazwy (bez rozróżniania wielkości liter), a następnie według identyfikatora. |

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

# Wyświetl podgląd określonego ładunku RTK/wieloetapowego
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

Mechanizm kompresji **zawsze zachowuje:**

- ✅ Bloki kodu (wydzielone i w tekście)
- ✅ Adresy URL i ścieżki plików
- ✅ Struktury JSON i dane strukturalne
- ✅ Identyfikatory i chronione tokeny techniczne
- ✅ Wyrażenia matematyczne
- ✅ Definicje wywołań narzędzi/funkcji
- ✅ Prompty systemowe (w trybie lite)

Odzyskiwanie surowych danych wyjściowych RTK redaguje typowe klucze API, tokeny bearer, tokeny Slack, klucze dostępu AWS,
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

## Plan etapów

| Etap    | Tryby                                                                                                                                                            | Status    |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Etap 1  | Off, Lite                                                                                                                                                        | ✅ Wydano |
| Etap 2  | Standard, Aggressive, Ultra                                                                                                                                      | ✅ Wydano |
| Etap 3  | RTK, Stacked, kombinacje kompresji                                                                                                                               | ✅ Wydano |
| Etap 4  | Style danych wyjściowych, Ultra klasy SLM, zestaw ewaluacyjny                                                                                                    | ✅ Wydano |
| Etap 4C | Adaptacyjny budżet kontekstu („pokrętło”) — mechanizm obliczeniowy + API (`contextBudget` w `PUT /api/settings/compression`) + kontrolki trybu/polityki w panelu | ✅ Wydano |

---

## Podziękowania

Reguły kompresji trybu Standard są inspirowane projektem **[Caveman](https://github.com/JuliusBrussee/caveman)** autorstwa **[Juliusa Brussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — wirusowym projektem „po co używać wielu tokenów, skoro kilka wystarczy”. Caveman deklaruje `~75%` mniej tokenów wyjściowych, średnią oszczędność danych wyjściowych w benchmarkach na poziomie `65%`, zakres oszczędności danych wyjściowych wynoszący `22-87%` oraz narzędzie do kompresji danych wejściowych na poziomie `~46%`.

Tryb RTK jest inspirowany projektem **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** autorstwa **[RTK AI](https://github.com/rtk-ai)** — wysokowydajnym projektem kompresji danych wyjściowych poleceń, przeznaczonym do filtrowania danych wyjściowych terminala, kompilacji, testów, git i narzędzi. RTK deklaruje oszczędności na poziomie `60-90%`, a przykładowa sesja w pliku README pokazuje oszczędność wynoszącą `~80%`.

---

## Zaawansowane systemy kompresji

Oprócz 7 standardowych trybów OmniRoute obejmuje kilka zaawansowanych systemów kompresji,
które działają automatycznie w zależności od kontekstu.

### Kompresja uwzględniająca pamięć podręczną

Niektórzy dostawcy (np. Anthropic z buforowaniem promptów) obsługują **buforowanie promptów**,
co pozwala im zapisywać części promptu w pamięci podręcznej w celu zmniejszenia kosztów i opóźnień. Gdy
buforowanie jest włączone, agresywna kompresja może w rzeczywistości **pogorszyć** wydajność,
ponieważ zmienia buforowane tokeny, unieważniając pamięć podręczną.

Moduł `cachingAware.ts` rozwiązuje ten problem poprzez **wykrywanie kontekstu buforowania** i
odpowiednie **dostosowywanie strategii kompresji**.

#### Jak to działa

1. **Wykrywanie kontekstu buforowania** — Skanuje treść żądania pod kątem znaczników `cache_control`
2. **Identyfikacja dostawców obsługujących buforowanie** — Sprawdza, czy docelowy dostawca obsługuje buforowanie
3. **Dostosowanie strategii** — Obniża poziom `aggressive`/`ultra` do `standard` w przypadku dostawców obsługujących buforowanie
4. **Pomijanie promptu systemowego** — Prompty systemowe są zwykle buforowane, dlatego nie należy ich kompresować
5. **Używanie deterministycznych transformacji** — Używa wyłącznie transformacji generujących spójne dane wyjściowe

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kiedy używać

Kompresja uwzględniająca pamięć podręczną jest **zawsze włączona** — nie wymaga konfiguracji. Uruchamia się tylko
wtedy, gdy:

- Żądanie zawiera znaczniki `cache_control`
- Docelowy dostawca obsługuje buforowanie promptów (Anthropic, OpenAI itp.)

### Stopniowe starzenie

Długie konwersacje gromadzą wiele tur wiadomości, ale starsze tury stają się mniej
istotne. Moduł `progressiveAging.ts` **degraduje wiadomości zależnie od odległości między turami**:

- **Ostatnie tury (0-3)**: Zachowywane dosłownie (pełne szczegóły)
- **Średnio odległe tury (4-8)**: Kompresja Lite (czyszczenie odstępów i formatowania)
- **Stare tury (9+)**: Kompresja Caveman (usuwanie wypełniaczy, podsumowywanie)
- **Bardzo stare tury (20+)**: Intensywnie podsumowywane lub usuwane

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
  verbatim: 3, // Pierwsze 3 tury: dosłownie
  light: 8, // Tury 4-8: kompresja lite
  moderate: 20, // Tury 9-20: kompresja caveman
  // Tury 21+: intensywne podsumowywanie
});

// saved = liczba zaoszczędzonych tokenów
```

#### Kiedy używać

Progresywne starzenie jest **zawsze włączone** w trybach `aggressive` i `ultra`. Jest
szczególnie skuteczne w przypadku:

- Długotrwałych sesji programistycznych
- Wielodniowych konwersacji
- Agentowych przepływów pracy z wieloma wywołaniami narzędzi

### Tryb wyjścia Caveman

Moduł `outputMode.ts` wstrzykuje **instrukcje promptu systemowego**, aby sam
model generował skompresowane, zwięzłe odpowiedzi (w stylu „caveman”).

#### Jak to działa

Zamiast kompresować dane wejściowe, ten tryb dodaje prompt systemowy podobny do:

> „Odpowiadaj minimalną liczbą słów. Pomijaj uprzejmości. Używaj krótkich zdań.”

Działa to szczególnie dobrze w przypadku:

- Generowania kodu (zwięźlejsze odpowiedzi = mniej tokenów)
- Szybkich pytań i odpowiedzi (bez potrzeby rozbudowanych wyjaśnień)
- Przetwarzania wsadowego (maksymalizacja przepustowości)

#### Kiedy używać

Tryb wyjścia Caveman jest **opcjonalny** — ustaw go za pomocą konfiguracji łączonej:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Style wyjścia (katalog)

Opisany powyżej tryb wyjścia Caveman to **starsza ścieżka pojedynczego stylu**. Faza 4 rozszerzyła go
do postaci katalogu komponowalnych stylów wyjścia: `OUTPUT_STYLE_CATALOG` w
`open-sse/services/compression/outputStyles/catalog.ts`. Każdy styl jest instrukcją promptu
systemowego, która skłania model do generowania tańszych odpowiedzi; style można włączać
jednocześnie, a są one wstrzykiwane w kolejności katalogowej.

| Styl                               | `id`          | Działanie                                                                                                                                                                                                                                                    | Języki instrukcji                                                                                   |
| ---------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Zwięzła proza                      | `terse-prose` | Usuwa wypełniacze/rodzajniki/asekuracyjne sformułowania; zachowuje dokładną treść techniczną. Ten sam tekst co w starszym trybie wyjścia Caveman (przywoływany, a nie powielany).                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                       |
| Mniej kodu                         | `less-code`   | Drabina YAGNI: najmniejsza działająca zmiana, bez niezamawianych abstrakcji.                                                                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                       |
| Kucyk (leniwy starszy programista) | `ponytail`    | „Najlepszy kod to kod, który nigdy nie powstał”: ponowne użycie > przepisywanie, przyczyna źródłowa > objaw, najkrótszy działający diff.                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                       |
| Mam ADHD (najpierw działanie)      | `i-have-adhd` | Najpierw działanie (polecenie/ścieżka/fragment przed opisem), ponumerowane kroki o ograniczonej liczbie, JEDEN konkretny następny krok, bez wstępu/podsumowania/zakończeń. Zaadaptowano z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                       |
| Zwięzły CJK (文言)                 | `terse-cjk`   | Ultranwięzły styl klasycznego języka chińskiego.                                                                                                                                                                                                             | zh (ograniczony ustawieniami regionalnymi: oferowany tylko wtedy, gdy ustalonym językiem jest `zh`) |

Każdy styl udostępnia trzy poziomy intensywności — `lite`, `full`, `ultra` — a każdy poziom
kończy się wspólną klauzulą ograniczeń, która zachowuje bloki kodu, ścieżki plików, polecenia,
komunikaty błędów, adresy URL i identyfikatory bez zmian.

#### Jak działa wstrzykiwanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) dopasowuje
wybór do katalogu (nieznane identyfikatory i style niedopasowane do ustawień regionalnych są
pomijane i nigdy nie powodują błędu), łączy wybrane instrukcje w kolejności katalogowej,
dołącza klauzulę ograniczeń **jeden raz** i umieszcza wynik na początku promptu
systemowego za pojedynczym znacznikiem idempotencji (`[OmniRoute Output Styles]`) — ponowne zastosowanie
nie powoduje żadnych zmian. Gdy dostępne jest tłumaczenie dla wykrytego języka żądania,
zamiast instrukcji angielskiej wstrzykiwana jest instrukcja zlokalizowana.

#### Jak włączyć

W panelu: **Kontekst → Ustawienia → Kompresja** — po jednym wierszu na styl, z
przełącznikiem włączania/wyłączania i selektorem poziomu. Programowo konfiguracja kompresji zapisuje
wybór jako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Zgodność wsteczna: starsze ustawienie łączone `outputMode: "caveman"` nadal działa i jest mapowane na
`terse-prose`, z identycznym ciągiem bajtów jak stare wstrzyknięcie w każdym starszym języku.

Wybór języka: przy włączonym `languageConfig.enabled` opcja `autoDetect` wybiera
język najnowszej wiadomości użytkownika (ten sam detektor co w silnikach wejściowych);
wyłączenie `autoDetect` wymusza `defaultLanguage`. Wyłączone → angielski.

Macierz styl × język jest utrwalona przez
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: nowy styl nie może zostać wydany
bez co najmniej tłumaczenia pt-BR (lub jawnie śledzonego wyjątku), a
istniejący styl nie może po cichu utracić wersji językowej. Aby dodać styl, zobacz
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresja wyników narzędzi

Moduł `toolResultCompressor.ts` udostępnia **5 wyspecjalizowanych strategii kompresji**
wyników narzędzi (wywołań funkcji, wyników agentów, wyników wyszukiwania itd.):

1. **Kompresja wyników wyszukiwania** — Usuwa nadmiarowe wyniki, zachowuje top-N
2. **Kompresja odczytu plików** — Skraca duże pliki, zachowuje nagłówki/importy
3. **Kompresja wykonania kodu** — Zachowuje tylko niezbędne stdout/stderr
4. **Kompresja zapytań do bazy danych** — Ogranicza liczbę wierszy, usuwa rozbudowane metadane
5. **Kompresja odpowiedzi API** — Usuwa pola null, kondensuje tablice

#### Kiedy używać

Kompresja wyników narzędzi jest **zawsze włączona**, gdy występują wywołania narzędzi. Nie wymaga
konfiguracji.

### Potok stosowy

Tryb stosowy uruchamia **wiele silników po kolei** — zwykle najpierw RTK
(60–90% oszczędności na wynikach narzędzi), a następnie Caveman (dodatkowe 30% oszczędności na
pozostałym tekście). Pozwala to osiągnąć **78–95% łącznych oszczędności**.

#### Jak to działa

```
Wejście (1000 tokenów)
  → RTK (filtr uwzględniający polecenia) → 200 tokenów
    → Caveman (usuwanie wypełniaczy) → 140 tokenów
  → Wyjście (140 tokenów, 86% oszczędności)
```

#### Kiedy używać

Używaj trybu stosowego w przypadku:

- Przepływów pracy intensywnie korzystających z narzędzi (programowanie agentowe, badania)
- Przetwarzania wsadowego wrażliwego na koszty
- Gdy potrzebujesz maksymalnej oszczędności tokenów

Skonfiguruj za pomocą konfiguracji łączonej:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Nadpisywanie kompresji dla kombinacji

Możesz nadpisać globalny tryb kompresji **dla każdej kombinacji osobno**, aby precyzyjnie dostosować zachowanie
do różnych przypadków użycia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Jest to przydatne w przypadku:

- **Kombinacji do programowania**: użyj trybu `aggressive` podczas długich sesji
- **Kombinacji do szybkich pytań i odpowiedzi**: użyj trybu `lite`, aby uzyskać szybkie odpowiedzi
- **Kombinacji intensywnie korzystających z narzędzi**: użyj trybu `stacked`, aby uzyskać maksymalne oszczędności
- **Kombinacji produkcyjnych**: użyj trybu `cache-aware` w przypadku dostawców obsługujących buforowanie

---

## Zobacz także

- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — zmienne środowiskowe kompresji
- [Przewodnik po architekturze](../architecture/ARCHITECTURE.md) — wewnętrzne mechanizmy potoku kompresji
- [Podręcznik użytkownika](../guides/USER_GUIDE.md) — pierwsze kroki z kompresją
- [Kompresja RTK](./RTK_COMPRESSION.md) — filtry RTK, model zaufania, bramka weryfikacyjna i odzyskiwanie nieprzetworzonych danych wyjściowych
- [Mechanizmy kompresji](./COMPRESSION_ENGINES.md) — Caveman, RTK, tryb stosowy, interfejsy API, MCP i panel sterowania
- [Format reguł kompresji](./COMPRESSION_RULES_FORMAT.md) — format pakietu reguł JSON
- [Pakiety językowe kompresji](./COMPRESSION_LANGUAGE_PACKS.md) — reguły Caveman specyficzne dla języka
