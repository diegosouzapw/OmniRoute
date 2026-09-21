# Subscription-first routing (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dwa nowe identyfikatory `auto/*` — `auto/subscription` i `auto/thrifty`. Oba wymagają jawnego
> wskazania w żądaniu: nic nie jest przez nie trasowane, chyba że wywołujący zażąda identyfikatora
> po nazwie; żaden istniejący pool, strategy ani ustawienie domyślne nie ulega zmianie.

## Dlaczego to istnieje

OmniRoute odpowiada już na dwa pytania dotyczące kosztów, ale żadne z nich nie jest tym, które zadaje większość operatorów.

| Istniejący mechanizm                                     | Odpowiada na pytanie                                 |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „czy ten model jest skatalogowany jako darmowy?”     |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „czy to połączenie może kiedykolwiek mnie obciążyć?” |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „czy to połączenie zbliża się do swojego limitu?”    |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „ogranicz wydatki, przejdź na najtańszą opcję”       |

Każdy mechanizm ograniczony wyłącznie do opcji darmowych **odmawia działania w bezpieczny sposób** — wyczerpana pula darmowa staje się pustą pulą, nigdy
przejściem na opcję płatną — a każdy mechanizm po stronie płatnej nie uwzględnia poziomów cenowych. Żaden z nich nie odpowiada na pytanie:

> „Wykorzystaj limit, za który już płacę. Gdy się wyczerpie, zatrzymaj się albo przechodź po jednym
> szczeblu przez najtańsze płatne opcje — i wróć natychmiast po zresetowaniu limitu.”

## Rozliczanie jest właściwością połączenia, a nie modelu

`classifyTier()` (`open-sse/services/tierResolver.ts`) używa klucza `(provider, model)` i zwraca
`free | cheap | premium` na podstawie cen katalogowych. Jednak to, czy żądanie generuje dodatkowy koszt,
zależy od tego, **które połączenie je obsługuje**: ten sam model jest uwzględniony w abonamencie przez połączenie
OAuth Claude Code, a przy połączeniu korzystającym z klucza API jest rozliczany za token.

`provider_connections.auth_type` nie jest bezpiecznym wskaźnikiem w żadnym kierunku — istnieją
rozliczane według użycia połączenia OAuth, a także uwzględnione w abonamencie połączenia z kluczem API
(token stanowiska Copilot nie jest rozliczanym według użycia kluczem API). Dlatego klasa rozliczeniowa pochodzi z **ręcznie utrzymywanego katalogu**,
`open-sse/config/connectionBillingCatalog.ts`, skonfigurowanego ręcznie na podstawie opublikowanych warunków każdego dostawcy —
zgodnie z tym samym wzorcem, który `FreeModelBudget.hardStopGuaranteed` ustanowił już dla darmowych modeli.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Kolejność rozstrzygania (`autoCombo/connectionBilling.ts`): syntetyczny znacznik braku uwierzytelnienia →
`keyless`; wpis katalogowy pasujący do dostawcy **i** `authType`; wpis obejmujący całego dostawcę;
w przeciwnym razie `unknown`. **Brak w katalogu nie oznacza opcji darmowej** — `unknown` jest wszędzie traktowane jako `metered`,
więc dostawca dodany jutro początkowo znajdzie się poza szczeblem subskrypcji i będzie musiał zostać
jawnie dodany do katalogu.

## Model szczebli

Pięć szczebli w kolejności eskalacji. Różnią się czymś więcej niż ceną — każdy ma **własny**
sygnał wyczerpania, dlatego nie jest to jedynie sortowanie.

| #   | Szczebel       | Kryterium przynależności                              | Uznawany za wyczerpany, gdy             |
| --- | -------------- | ----------------------------------------------------- | --------------------------------------- |
| 0   | `subscription` | ręcznie ustawione `billing: "subscription"`           | okno limitu osiąga próg lub mniej       |
| 1   | `keyless`      | syntetyczna ścieżka bez uwierzytelnienia              | okres wyciszenia połączenia / wyłącznik |
| 2   | `free`         | połączenie rozliczane, `classifyTier() === "free"`    | darmowy limit został wyczerpany         |
| 3   | `cheap`        | połączenie rozliczane, `classifyTier() === "cheap"`   | budżet szczebla został zużyty           |
| 4   | `premium`      | połączenie rozliczane, `classifyTier() === "premium"` | budżet szczebla został zużyty           |

Szczeble 0–2 wyczerpują się na podstawie **limitu**, który jest obserwowalny i już monitorowany. Szczeble 3–4 nie mają
limitu — płatne połączenie może obsługiwać żądania bez końca — dlatego jedynym sensownym sygnałem ich wyczerpania jest
**budżet** przypisany do szczebla. Bez niego „eskaluj po wyczerpaniu taniej opcji” nie ma żadnego wyzwalacza.

## `auto/subscription` — bezpieczne odrzucanie

Pula = wyłącznie szczebel 0, ograniczony do połączeń, dla których przekroczenie limitu jest udokumentowanym mechanizmem `hard-stop`, a każde z nich zostało zweryfikowane na żywo pod kątem dostępnego zapasu limitu. Wszystkie niejednoznaczne przypadki są wykluczane: niesklasyfikowany dostawca, niemożliwy do zweryfikowania odczyt limitu, nieaktualny odczyt lub przekroczenie limitu naliczane jako płatne użycie.

Pusta pula jest **zamierzonym** wynikiem, a nie usterką — istniejąca ścieżka obsługi pustej puli po stronie wywołującego przekształca ją w jednoznaczny błąd zamiast cichego, płatnego mechanizmu awaryjnego. Na tym polega cała gwarancja tego identyfikatora.

`keyless` celowo **nie** spełnia kryteriów: to grupowanie oznacza „plan, za który płacę”, więc backend niewymagający uwierzytelniania do niego nie należy. W takim przypadku użyj `auto/thrifty` (lub `auto/best-free`).

### Bezpieczeństwo połączeń

Kandydat nie zawsze jest powiązany z jednym połączeniem — kandydat logiczny zawiera listę dozwolonych wartości `allowedConnectionIds`, a faktycznie używane konto jest wybierane później, podczas wysyłania, przez `open-sse/services/combo/autoStrategy.ts`. Oba grupowania weryfikują zatem **każde połączenie osobno** i zawężają `allowedConnectionIds` dokładnie do podzbioru połączeń, które przeszły weryfikację — nigdy do pełnej pierwotnej listy ani do jednego arbitralnie wybranego elementu. Ponieważ `autoStrategy.ts` już wymusza tę tablicę jako ścisłą listę dozwolonych wartości, jej nadpisanie w tym miejscu sprawia, że zbiory „zweryfikowanych” i „faktycznie używanych” połączeń są z założenia identyczne. Jest to ten sam niezmiennik i to samo uzasadnienie co w przypadku [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — przechodzenie o jeden szczebel naraz

Pula = wszystkie szczeble uporządkowane według indeksu szczebla, z odfiltrowanymi wyczerpanymi kandydatami. Silnik `auto` nadal przyznaje oceny **w obrębie** pozostałej puli: drabina określa, które szczeble są brane pod uwagę, a mechanizm oceniania decyduje, który kandydat na nich zwycięża. Kolejność w obrębie szczebla jest stabilna, więc ta nakładka nigdy nie zmienia rankingu ustalonego przez mechanizm oceniania.

Jest to nakładka porządkująca i filtrująca, **a nie** nowy dyspozytor: pętla spekulatywna w `combo.ts` już przechodzi po celach w ustalonej kolejności i po niepowodzeniu przechodzi do następnego, dlatego wyczerpanie limitu w czasie działania, którego kontrola wstępna nie wykryła, nadal powoduje przejście do kolejnego szczebla w ramach tego samego żądania.

Podczas gdy `auto/subscription` odrzuca w razie niepewności, `auto/thrifty` działa **otwarcie**: połączenie uwzględnione w planie, dla którego nie ma użytecznego odczytu limitu, nadal jest wypróbowywane jako pierwsze. Wypróbowanie go nic nie kosztuje, a jeśli okaże się wyczerpane, mechanizm przejścia awaryjnego i tak dotrze do kolejnego szczebla — odmowa jego wypróbowania skierowałaby natomiast żądanie do płatnego szczebla z powodu braku telemetrii, czyli spowodowałaby dokładnie ten rezultat, któremu to grupowanie ma zapobiegać.

## Powrót do planu po zresetowaniu limitu

Zanim routing wróci do szczebla 0, muszą wygasnąć trzy niezależne elementy. Naprawienie tylko jednego z nich sprawi, że drabina pozostanie zablokowana na płatnych szczeblach jeszcze długo po odnowieniu planu.

1. **Pamięć podręczna stanu limitu** — `freeAccessQuota.ts` przechowuje dane dla każdej pary `(provider, connection)` z czasem TTL wynoszącym 180 s. Wpis w pamięci podręcznej, którego własna wartość `resetAt` już minęła, opisuje okno, które już nie istnieje, dlatego jest teraz uznawany za nieaktualny **niezależnie od wieku** i wymusza odświeżenie. Bez tego plan odnowiony o północy nadal byłby odczytywany jako wyczerpany aż do przypadkowego wygaśnięcia TTL.
2. **Własny stan drabiny** — z założenia nie istnieje. Kwalifikacja szczebli jest ponownie obliczana na podstawie bieżącego stanu limitu przy każdym tworzeniu puli; nie istnieje utrwalony wpis „obecnie na szczeblu 3”, który mógłby przetrwać reset i zablokować routing.
3. **Okres karencji połączenia** — odpowiedź 429 sygnalizująca wyczerpanie ustawia `rateLimitedUntil` na podstawie wykładniczego wycofywania, które w przypadku połączenia objętego planem może wykraczać poza rzeczywisty moment resetu. `clampCooldownToReset()` (`subscriptionLadder.ts`) skraca okres karencji do momentu resetu określonego przez usługę nadrzędną i nigdy nie może go wydłużyć. **Mechanizm jest zaimplementowany i przetestowany, ale nie został jeszcze podłączony**: pamięć podręczna limitu jest unieważniana w `src/sse/services/auth.ts` _przed_ zapisaniem jakiegokolwiek okresu karencji, dlatego `resetAt` musi zostać przechwycone wcześniej w tej funkcji — jest to zmiana w krytycznej ścieżce odporności, która powinna trafić do osobnego, poddanego przeglądowi PR-a. Do tego czasu ponowne dopuszczenie następuje dopiero po upływie okresu karencji połączenia (który już teraz preferuje wskazówki `Retry-After` z usługi nadrzędnej, jeśli dostawca je wysyła).

### Zapobieganie oscylacjom

Szczebel, którego limit właśnie się zresetował, jest ponownie dopuszczany dopiero po przekroczeniu `reentryMinRemainingPercent` (domyślnie 5), natomiast połączenie już będące w użyciu musi jedynie utrzymywać się powyżej `exitCutoffPercent` (domyślnie 2, zgodnie z `quotaPreflight.defaultThresholdPercent`). Różnica między tymi progami stanowi pasmo histerezy — bez niego połączenie oscylujące wokół wartości granicznej przełączałoby się między szczeblami przy kolejnych żądaniach.

## Konfiguracja

Tylko dostrajanie. Celowo **nie ma** flagi `enabled`: przełącznik umożliwiający ich wyłączenie
sprawiłby, że `auto/subscription` po cichu udostępniałby pełną pulę — w tym płatne modele — pod
nazwą, która obiecuje coś przeciwnego.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 całkowicie wyłącza szczebel
  },
}
```

Ograniczanie na podstawie budżetu pozostaje nieaktywne, dopóki nie zostanie podłączony mechanizm
ustalania wydatków: przy braku danych rozliczeniowych płatny szczebel jest uwzględniany w kolejności,
ale nigdy nie jest ograniczany. Od v3.8.51 ustawienie `rungBudgetUsd` jest akceptowane przez schemat,
ale NIE jest jeszcze egzekwowane — należy je traktować jako zarezerwowaną konfigurację, a nie aktywny
limit wydatków. Kolejność szczebli, wyczerpywanie na podstawie limitu oraz ponowne wejście po
zresetowaniu działają bez niego.

## Kompozycja

`subscription` i `thrifty` są wartościami `AutoTier`, więc można je łączyć z każdą kategorią:
`auto/coding:thrifty`, `auto/reasoning:subscription` itd. Dwa płaskie identyfikatory
(`auto/subscription`, `auto/thrifty`) są udostępniane w `/v1/models` oraz w panelu.

Żaden z identyfikatorów nie należy do płatnej warstwy, dlatego `isPaidTierAutoId()` zwraca `false`
dla obu, a `auto/subscription` pozostaje dostępny po zastosowaniu `hidePaidModels`.

## Lokalizacja kodu

| Obszar                                                  | Plik                                                |
| ------------------------------------------------------- | --------------------------------------------------- |
| Wyselekcjonowane dane rozliczeniowe                     | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasyfikator                                            | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Szczeble, oba grupowania i ponowne wejście              | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Podłączenie do puli kandydatów                          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Dezaktualizacja pamięci podręcznej uwzględniająca reset | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Powierzchnia warstwy                                    | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Udostępniane identyfikatory                             | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testy                                                   | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
