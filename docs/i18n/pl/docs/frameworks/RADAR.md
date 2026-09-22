# Radar Free-Model Catalog (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Źródło prawdy:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Ostatnia aktualizacja:** 2026-09-01 — v3.8.51
> **Granica materiału dowodowego dotyczącego usługi hostowanej:** opisane tutaj reguły po stronie serwera zweryfikowano
> 2026-09-01 względem celowo prywatnego serwera Radar w dokładnej rewizji
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Ta implementacja nie jest rozpowszechniana w
> tym repozytorium OSS; dostępność usługi hostowanej pozostaje odrębnym stanem operacyjnym.

Radar to **opcjonalny dodatek**, który nakłada podpisany, na bieżąco aktualizowany katalog
bezpłatnych modeli na bazowy katalog wydania (`FREE_MODEL_BUDGETS` w
`open-sse/config/freeModelCatalog.data.ts`). Powstał, ponieważ krajobraz bezpłatnych planów zmienia się
szybciej niż cykl wydań — dostawcy dodają, zmniejszają lub wycofują bezpłatne limity pomiędzy
wydaniami, a bazowy katalog można odświeżyć dopiero wraz z publikacją nowej wersji.

**Nic, co jest dziś bezpłatne, nie przestaje takie być z powodu zdalnego źródła danych.** Radar nigdy
nie obejmuje płatnym dostępem pozycji z katalogu bazowego; jedynie odświeża pola limitów/statusu w czasie odczytu i może
dodawać warstwowo nowo odkryte bezpłatne modele pomiędzy wydaniami. Operator nadal może lokalnie ukryć
model, a następnie przywrócić go z tego samego panelu. Sam katalog bazowy
nigdy nie jest modyfikowany na dysku — zobacz
[Reguły scalania nakładki w czasie odczytu](#read-time-overlay-merge-rules) poniżej.

---

## Stan dostarczania w v3.8.51

Poniższe zestawienie rozróżnia funkcje zaimplementowane w tym wydaniu OSS od późniejszych
strumieni prac nad Radar. Jest to stan na poziomie kodu, a nie obietnica, że konkretne wdrożenie hostowane
lub integracja zewnętrzna są obecnie dostępne.

| Obszar                                 | Stan w tym wydaniu                                                                                                                                                                                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Klient podpisanego katalogu            | Zaimplementowany za `RADAR_ENABLED`, z oddzielną zgodą na włączenie, weryfikacją Ed25519, lokalnymi zaszyfrowanymi ustawieniami/pamięcią podręczną, trwałymi nadpisaniami widoczności/włączenia, odwracalnymi nagrobkami, harmonogramem i panelem.                                                                             |
| Aktywacja dla współtwórców             | Panel zawiera odsyłacz do hostowanego na serwerze procesu zgłaszania uprawnień przez GitHub i akceptuje istniejący klucz `omr_…`. Uprawnienia współtwórcy ustala prywatna usługa; klient OSS nie zawiera tokena GitHub ani logiki wydawania kluczy.                                                                            |
| Aktywacja kluczem wspierającego        | Zaimplementowana. Nieprzetworzony klucz jest sprawdzany, szyfrowany w spoczynku, maskowany podczas odczytu i wysyłany wyłącznie przez synchronizację po stronie serwera. Zmiana lub usunięcie klucza unieważnia wszystkie cztery pamięci podręczne źródeł zależne od uprawnień.                                                |
| Łącza polecające                       | Zaimplementowane jako oddzielne, podpisane źródło danych odświeżane co godzinę. Stałe łącza są natychmiast dostępne dla poziomu społecznościowego; ograniczone kampanie pozostają danymi aktywnego poziomu.                                                                                                                    |
| Oferty dla wspierających               | Zaimplementowane jako oddzielne, podpisane źródło danych dostępne wyłącznie dla aktywnego poziomu oraz osobna strona panelu. Klient ponownie sprawdza zamknięty schemat korzyści, zachowuje ostatnią poprawną pamięć podręczną, odfiltrowuje wygasłe pozycje i wyraźnie oznacza oferty partnerów.                              |
| Informacje i wyróżnianie wspierających | Zaimplementowane jako rygorystyczne, podpisane źródło danych dostępne wyłącznie dla aktywnego poziomu, z należącym do Radar systemem ELO, faktycznymi danymi o aktualności/trendach katalogu, zweryfikowaną lokalną odznaką wspierającego, stroną panelu oraz lokalnymi poleceniami CLI do sprawdzania stanu i synchronizacji. |
| Płatności i e-maile transakcyjne       | Niezimplementowane w kliencie OSS. Zakupy, darowizny, przegląd potwierdzeń, odzyskiwanie dostępu i dostarczanie poczty należą do prywatnej usługi; dostępność hostowana nadal zależy od jej nadzorowanego wdrożenia i konfiguracji dostawcy.                                                                                   |
| Strumień prac nad agentem badawczym    | Nie jest częścią tego wydania klienta. Zawartość kuratorowanych źródeł danych pozostaje po stronie serwera; żadna autonomiczna instancja agenta badawczego nie działa w instalacji OmniRoute.                                                                                                                                  |

---

## Czytnik publicznych ogłoszeń

Ogólny czytnik ogłoszeń jest niezależny od flagi funkcji Radar. Strona główna panelu oraz
przeglądarka dziennika zmian pobierają publiczny plik `news.json` repozytorium za pomocą zwykłego żądania `GET` do
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Nie wysyłają żadnych ustawień Radar, promptów, konfiguracji
dostawców, rekordów użycia ani lokalnego stanu odrzucenia.

Plik `news.json` używa zamkniętego schematu v2 zaimplementowanego przez `parseNewsPayload()`:

- `schemaVersion: 2` i kolekcja `items[]` o ograniczonym rozmiarze;
- stabilne, unikalne wartości `id` ogłoszeń;
- jawne pola `active` i `publishedAt` w formacie ISO;
- wymagana treść w języku angielskim z opcjonalnymi wersjami zlokalizowanymi;
- opcjonalne łącza HTTPS niewymagające danych uwierzytelniających oraz ikona z listy dozwolonych;
- wybór najnowszego aktywnego ogłoszenia w pierwszej kolejności, użycie języka angielskiego jako zapasowego oraz lokalne odrzucanie według identyfikatora.

Parser tymczasowo akceptuje wcześniejszą, pojedynczą strukturę `{ active, title, message, ... }`, aby
starsze forki mogły przeprowadzić migrację bez uszkodzenia widoku dziennika zmian. Nieprawidłowe kanały pozostają nieaktywne. Wpis dotyczący uruchomienia
Radar jest dostarczany z `active: false`; zmiana tej wartości na `true` jest osobnym działaniem wydaniowym wykonywanym po scaleniu i wdrożeniu
i nie zmienia `RADAR_ENABLED` ani niezależnej zgody na synchronizację kanału.

---

## Flaga: `RADAR_ENABLED` (domyślnie wyłączona)

Radar jest kompleksowo kontrolowany przez flagę funkcji `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategoria `policies`,
`defaultValue: "false"`).

**Gdy flaga jest wyłączona, ta funkcjonalność nie istnieje:**

- Wszystkie punkty końcowe `/api/radar/*`, w tym lokalne odczyty i zapisy stanu modelu,
  zwracają `404` przed odwołaniem się do jakiegokolwiek modułu Radar.
- Ekrany panelu (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderują
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) zwraca niezmieniony stan bazowy —
  tę samą liczbę wpisów, te same wartości, każdy wpis oznaczony jako `origin: "baseline"` — i nigdy
  nie odczytuje pamięci podręcznej kanału.
- Nigdy nie jest wykonywane żadne wywołanie sieciowe Radar; każdy moduł synchronizacji zwraca `{ status: "disabled" }`
  przed wywołaniem `fetch`.

Jest to ścisła nadrzędna blokada: włączenie flagi odblokowuje wyłącznie _ekrany_,
nic więcej. Nie powoduje przesyłania danych, nie uruchamia synchronizacji w tle ani nie zmienia
trasowania lub wyboru modelu — zobacz osobną zgodę poniżej.

---

## Synchronizacja danych wymaga OSOBNEJ zgody — gwarancja prywatności

Włączenie `RADAR_ENABLED` odblokowuje tylko interfejs użytkownika. Synchronizacja kanału wymaga drugiej,
niezależnej zgody przechowywanej w `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migracja `136_radar_cache_settings.sql`). `syncRadar()` sprawdza flagę _oraz_ zgodę
przed wykonaniem jakiegokolwiek wywołania sieciowego:

```
Flaga wyłączona  → { status: "disabled" }   — brak wywołania sieciowego
Brak zgody       → { status: "opt_out" }    — brak wywołania sieciowego
```

Gdy obie są włączone, ścieżka synchronizacji wygląda następująco:

1. `GET <bazowy adres URL kanału>/v1/catalog/latest` z nagłówkiem `x-omniroute-radar-schema: 2` i opcjonalnym
   nagłówkiem `Authorization: Bearer <klucz wspierającego>` (zobacz poniżej). W przypadku braku nagłówka schematu serwery domyślnie
   używają osobno podpisanego artefaktu przejściowego v1, dzięki czemu starsze zainstalowane klienty nadal
   otrzymują aktualizacje.
2. Jest to przepływ aplikacji służący wyłącznie do pobierania danych, ale nadal stanowi żądanie HTTPS. Hostowana
   infrastruktura otrzymuje zwykłe metadane połączenia, takie jak źródłowy adres IP. Gdy skonfigurowany jest klucz wspierającego,
   synchronizacja wysyła również ten klucz w nagłówku Bearer, aby usługa mogła określić
   uprawnienie. W dokładnej rewizji prywatnego serwera wskazanej powyżej w granicy materiału dowodowego
   rozliczanie żądań kanału wykorzystuje skróty kluczy, zagregowane użycie oraz zmieniany codziennie, skrócony HMAC
   adresu IP do ręcznego przeglądu nadużyć; tabele te nie przechowują ani klucza, ani adresu IP w postaci nieprzetworzonej.
   Dzienniki dostępu infrastruktury i zaszyfrowana skrzynka nadawcza są odrębnymi
   granicami operacyjnymi.
3. OmniRoute nigdy nie wysyła do usługi Radar promptów, odpowiedzi, konwersacji, danych uwierzytelniających dostawców, ruchu modeli,
   czasu dostępności, opóźnień ani lokalnej konfiguracji dostawców.
4. Odpowiedź jest weryfikowana, walidowana i zapisywana w lokalnej pamięci podręcznej (zobacz
   [Model zabezpieczeń](#security-model)). Radar ma dokładnie cztery ścieżki sieciowe po stronie serwera:
   `syncRadar()` dla katalogu, `syncRadarReferrals()` dla poleceń oraz
   `syncRadarOffers()` / `syncRadarIntel()` dla ofert i danych Intel dostępnych wyłącznie dla wspierających.

**Klucz wspierającego** jest opcjonalnym tokenem Bearer (`radar_settings.supporter_key`),
który pozwala usłudze kanału zdecydować, który poziom udostępnić (zobacz
[Poziomy](#tiers-community-and-live)). Klucz ten jest:

- Przechowywany **w spoczynku w formie zaszyfrowanej** przy użyciu tych samych funkcji pomocniczych AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`), które są używane dla danych uwierzytelniających dostawców.
- Ustawiany przez `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) i
  **nigdy nie jest zwracany w całości** — odpowiedź zawiera zamaskowaną postać (`omr_****abcd`).
- Jego zmiana lub usunięcie atomowo unieważnia pamięci podręczne katalogu, poleceń, ofert i danych Intel. Następna
  synchronizacja lub odczyt ustala nowe uprawnienie po stronie serwera; zapisanie klucza samo w sobie nie powoduje
  żądania sieciowego ani nie zużywa jednorazowego klucza aktywacyjnego.
- Wysyłany do usługi kanału jako token Bearer podczas żądania synchronizacji GET — żadne inne informacje o
  kluczu nigdy nie opuszczają klienta.

---

## Zasady dostępu i bezpieczeństwa wyświetlane przed wyrażeniem zgody

Nieaktywny pulpit wyświetla te zasady z pliku
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **przed** wykonaniem którejkolwiek z czynności aktywacyjnych.
Kanoniczna skala dostępu wygląda następująco:

| Poziom                      | Kryteria kwalifikacji                                                                                           | Dostęp                                                          | Zasada ponownego przyznawania/wygasania                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Społeczność                 | Każdy; bez klucza                                                                                               | Pełny katalog opóźniony o około 30 dni                          | Zawsze dostępny; bez wydawania klucza                                      |
| Gwiazdka + obserwowanie     | GitHub OAuth weryfikuje zarówno oznaczenie repozytorium gwiazdką, jak i obserwowanie właściciela                | Jeden odczyt katalogu na żywo, następnie dostęp Społeczności    | Jedno przyznanie na logowanie; nigdy nie jest przyznawane ponownie         |
| Współtwórca Top 10          | Pozycje 1–10 w najnowszym kompletnym rankingu tygodniowym                                                       | 365 dni dostępu na żywo                                         | Odbierane na żądanie; wypadnięcie z rankingu nie skraca przyznanego okresu |
| Współtwórca Top 100         | Pozycje 11–100 w tym rankingu                                                                                   | 90 dni dostępu na żywo                                          | Ta sama zasada odbioru na żądanie/idempotentnego                           |
| Zakup przez wspierającego   | Jednorazowy zakup na 6 miesięcy, 1 rok lub bezterminowo                                                         | Katalog na żywo, podpisane oferty na żywo oraz Intel            | Bez automatycznego odnawiania                                              |
| Darowizna/ręczne przyznanie | Darowizna zweryfikowana przez właściciela lub przyznanie przez właściciela na określoną liczbę dni/bezterminowo | Takie samo uprawnienie do dostępu na żywo przez przyznany okres | Audytowane, idempotentne przyznanie                                        |

Scalone PR-y, commity i zmienione wiersze są **wyłącznie danymi wejściowymi rankingu**. Logowanie poza Top 100
nie zapewnia żadnego uprawnienia współtwórcy, niezależnie od liczby PR-ów. Okresy dostępu z zakupów terminowych, darowizn, statusu współtwórcy i
ręcznych przyznań kumulują się od bieżącej daty wygaśnięcia; dostęp bezterminowy ma pierwszeństwo. Zmiana pozycji w rankingu nigdy
nie cofa ani nie skraca już przyznanego czasu.

Hostowana licencja jest osobista, a zasada przedstawiana użytkownikowi zezwala na jedną aktywną instalację w danym momencie. To
wydanie **nie** deklaruje blokady sprzętowej: synchronizacja OSS nie identyfikuje sprzętu odciskiem ani nie utrzymuje
kryptograficznej dzierżawy urządzenia. W zweryfikowanej powyżej rewizji serwera prywatnego zaimplementowane egzekwowanie
obejmuje walidację uprawnień oraz sygnał do ręcznej weryfikacji, gdy ten sam aktywny klucz zostanie wykryty z czwartego
unikalnego adresu IP w ciągu 24 godzin. Ten sygnał nigdy nie blokuje ani automatycznie nie unieważnia klucza. Procedura odzyskiwania
unieważnia i zastępuje utracony klucz, zachowując dotychczasową datę wygaśnięcia; nie rozpoczyna ponownie
zakupionego ani przyznanego okresu.

Oferty na żywo są wybierane ręcznie i mogą się zmieniać lub wygasać. Ekran wyrażenia zgody wskazuje również dokładną
granicę prywatności: podpisane metadane katalogu/poleceń są pobierane; prawidłowy klucz dodatkowo odblokowuje
podpisane oferty oraz Intel; klucz Bearer i standardowe metadane połączenia trafiają do hostowanej usługi;
prompty, odpowiedzi, rozmowy, dane uwierzytelniające dostawców, ruch modeli, czas dostępności, opóźnienia oraz lokalna
konfiguracja dostawców — nie.

---

## Uzyskiwanie klucza wspierającego

Ekran aktywacji (`/dashboard/radar`) zawiera odnośniki do dwóch ścieżek **uzyskania**
klucza wspierającego. Samo repozytorium OSS nigdy go nie wydaje, nie uruchamia kodu płatności i
**nigdy nie podaje ceny** — ceny są ustalane i wyświetlane wyłącznie na
stronach docelowych, a nie w tym repozytorium (decyzja specyfikacji D14).

- **„Jestem współtwórcą”** — otwiera `RADAR_CONTRIBUTOR_CLAIM_URL` (domyślnie
  `https://radar.omniroute.online/auth/github`), proces odbioru przez GitHub OAuth hostowany na
  prywatnym serwerze Radar. Sprawdza najnowszy kompletny cotygodniowy ranking: pierwsze 10 osób otrzymuje 365 dni,
  a osoby na pozycjach 11–100 otrzymują 90 dni. Poza pierwszą setką liczba PR-ów nigdy nie zapewnia dostępu; proces
  sprawdza w zamian oddzielny, jednorazowy poziom oparty na gwiazdce i obserwowaniu.
- **„Wesprzyj projekt”** — otwiera `RADAR_SUPPORTER_PLANS_URL` (domyślnie
  `https://radar.omniroute.online/planos`), hostowaną stronę z jednorazowymi opcjami na 6 miesięcy, 1 rok oraz
  bezterminową. Strona OSS nadal nie wyświetla żadnej wartości pieniężnej.

Oba adresy URL są rozpoznawane po stronie serwera (`src/lib/radar/links.ts`, ten sam wzorzec
nadpisywania przez zmienne środowiskowe co w przypadku `RADAR_FEED_URL`) i przekazywane do panelu przez istniejącą
odpowiedź `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — komponent
kliencki nigdy samodzielnie nie odczytuje `process.env`.

| Zmienna                       | Przeznaczenie                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Nadpisuje adres URL odbioru dla współtwórców (domyślnie `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Nadpisuje adres URL planów dla wspierających (domyślnie `https://radar.omniroute.online/planos`).      |

### Odzyskiwanie utraconego klucza wspierającego

Punktem wejścia do odzyskiwania w hostowanej usłudze jest `https://radar.omniroute.online/recover`; odnośnik do niego
znajduje się również na stronie planów. Odzyskiwanie pozostaje całkowicie poza klientem OSS, ponieważ lokalna
instalacja nigdy nie otrzymuje adresu e-mail kupującego/współtwórcy i nie może odtworzyć nieprzetworzonego klucza na podstawie
zaszyfrowanych ustawień.

1. Prześlij adres e-mail powiązany z kluczem. Usługa zwraca tę samą stronę potwierdzenia niezależnie od tego, czy
   istnieje licencja możliwa do odzyskania, dzięki czemu formularz nie ujawnia istnienia kont.
2. Jeśli użytkownik się kwalifikuje, proces dostarczania wysyła krótkotrwały, jednorazowy odnośnik. Jego otwarcie natychmiast przenosi
   token do tymczasowego, zaszyfrowanego pliku cookie `HttpOnly`/`Secure` i przekierowuje do czystego
   adresu URL `/recover`; strona nie zawiera tokenu, adresu e-mail, starego klucza ani klucza zastępczego.
3. Potwierdź unieważnienie. Prywatna usługa unieważnia poprzedni klucz, tworzy klucz zastępczy z
   tym samym planem/terminem wygaśnięcia i kolejkuje go do wysłania pocztą e-mail w ramach jednej transakcji. Klucz zastępczy nigdy
   nie jest zwracany do przeglądarki.
4. Wklej klucz zastępczy w `/dashboard/radar`. Stary klucz musi teraz obniżyć poziom do `community`;
   klucz zastępczy musi skutkować zweryfikowaną synchronizacją `live`. Ponowne otwarcie tego samego odnośnika odzyskiwania musi zakończyć się
   niepowodzeniem z ogólnym komunikatem o nieprawidłowym lub wygasłym odnośniku.

Hostowana trasa odzyskiwania i proces pocztowy mogą znajdować się w kodzie, a mimo to być niedostępne w danym
wdrożeniu. Nie uznawaj procesu za gotowy do środowiska produkcyjnego, dopóki serwer nie zostanie wdrożony, dostawca
usługi dostarczania nie zostanie skonfigurowany z kontrolowanym odbiorcą, a pełny jednorazowy odnośnik nie zostanie przetestowany.

Gdy odwiedzający ma już klucz (`omr_` + 40 znaków szesnastkowych), ekran aktywacji
(`src/app/(dashboard)/dashboard/radar/page.tsx`) udostępnia pole wklejania klucza jako główną
ścieżkę: wklejenie klucza i wysłanie formularza powoduje przesłanie `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) w jednym wywołaniu — wklejenie klucza jednocześnie go ustawia i wyraża zgodę,
odblokowując ekran. Format (`omr_` + 40 znaków szesnastkowych) jest najpierw sprawdzany po stronie klienta
za pomocą współdzielonej funkcji pomocniczej `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
dla wygody użytkownika; niezależnie od tego schemat Zod po stronie serwera stanowi rozstrzygającą walidację. Po
ustawieniu klucza ekran aktywacji wyświetla jego zamaskowaną postać (`supporterKeyMasked` z
`GET /api/radar/settings`) zamiast pustego pola, wraz z kontrolką „zmień klucz” umożliwiającą
wklejenie nowego — nieprzetworzony klucz nigdy nie jest ponownie wyświetlany. Dwa powyższe przyciski odbioru/planów
pozostają sposobem na _uzyskanie_ klucza; to pole służy operatorowi, który
już go ma, do jego aktywacji.

### Kompleksowa aktywacja i konfiguracja z przewodnikiem

Prywatna usługa kanału i ten klient OSS mają celowo wąsko zdefiniowaną granicę: usługa
wydaje i weryfikuje klucz wspierającego, natomiast lokalna instalacja OmniRoute szyfruje klucz,
synchronizuje podpisane artefakty po stronie serwera i prowadzi przez konfigurację dostawcy. Kolejność wspomaganej walidacji jest następująca:

1. Uzyskaj nowo wydany lub odzyskany klucz w procesie zgłoszenia kontrybutora, zakupu planu, odzyskiwania
   albo od autoryzowanego operatora prywatnego serwera. Nie wklejaj surowego klucza do logów,
   zrzutów ekranu, komentarzy w zgłoszeniach ani argumentów wiersza poleceń.
2. Włącz flagę funkcji `RADAR_ENABLED` w lokalnej instalacji OmniRoute. Udostępnia to interfejs użytkownika,
   ale nie powoduje żadnej aktywności sieciowej, dopóki nie zostanie zapisane osobne wyrażenie zgody.
3. Otwórz `/dashboard/radar`, wklej klucz i aktywuj usługę. Przeglądarka wysyła jedno lokalne żądanie
   `POST /api/radar/settings` z `{ optIn: true, supporterKey }`; klucz jest szyfrowany lokalnie,
   a odpowiedź zawiera tylko `omr_****<last4>`.
4. Poczekaj, aż ekran aktywacji zsynchronizuje katalog, lub wybierz **Synchronizuj teraz**. Upewnij się, że strona
   zgłasza stan `live`, wersję źródła i czas pobrania. W ramach uwierzytelnionej diagnostyki lokalnej
   `GET /api/radar/status` zgłasza stan wyrażenia zgody/obecności klucza oraz cztery stany pamięci podręcznej bez zwracania
   klucza. `POST /api/radar/sync-all` może jawnie odświeżyć katalog, polecenia, oferty i dane Intel.
5. Otwórz `/dashboard/radar/setup?provider=<provider>`. Przejdź pod należący do dostawcy adres URL poświadczeń,
   wybierz **Dodaj klucz API**, zapisz go za pomocą właściwego formularza dostawcy, wróć do przewodnika i uruchom
   **Testuj połączenie**. Przewodnik korzysta ze standardowych tras `/api/providers` oraz
   `/api/providers/<connection-id>/test`; nie tworzy równoległego poświadczenia Radar.
6. Otwórz `/dashboard/radar/combos`, gdy aktywne są co najmniej dwa zgodne połączenia z dostawcami.
   Przejrzyj sugerowaną rodzinę i utwórz kombinację za pomocą istniejącego API kombinacji. Oferty i
   dane Intel pozostają oddzielnymi, podpisanymi pamięciami podręcznymi dostępnymi tylko w trybie `live` i można je sprawdzić na poświęconych im stronach Radar.
7. Ponownie załaduj `/dashboard/radar` oraz stronę konfiguracji. Wyrażenie zgody, stan zamaskowanego klucza, zweryfikowana pamięć podręczna, zapisane
   połączenie z dostawcą oraz akcja testowa muszą przetrwać ponowne załadowanie. Zarejestruj dowody dopiero wtedy, gdy
   surowy klucz i poświadczenie dostawcy nie będą już widoczne.

Samo zapisanie klucza nie stanowi dowodu aktywnego uprawnienia. Dowodem jest połączenie wyniku
`GET /v1/license/check` prywatnej usługi, warstwy `live` udostępnianej przez katalog OSS, zweryfikowanej podpisanej
pamięci podręcznej oraz rzeczywistego przepływu połączenia z dostawcą i jego testowania. Nieprawidłowy, wygasły lub unieważniony klucz bezpiecznie
przełącza katalog na `community`; nie wolno tego zgłaszać jako pomyślnej walidacji aktywnego klucza.

### Łącze do prywatnego panelu administracyjnego

`RADAR_ADMIN_URL` opcjonalnie dodaje pozycję **Administracja Radar ↗** bezpośrednio po przeznaczonej dla użytkownika
pozycji Radar w sekcji Koszty paska bocznego. Celowo nie ma ona wartości domyślnej: gdy zmienna jest
nieustawiona lub nieprawidłowa, statyczny pasek boczny, paleta poleceń oraz ekran dostosowywania paska bocznego nie zawierają
pozycji administracyjnej ani prywatnego adresu URL.

Wartość jest rozpoznawana po stronie serwera i przekazywana za pośrednictwem wymagającej uwierzytelnienia zarządzania
odpowiedzi `GET /api/settings` wyłącznie do uwierzytelnionej sesji panelu albo do zaufanego
właściciela interfejsu loopback podczas lokalnego uruchamiania bez logowania. Uwierzytelnianie za pomocą CLI, usług wewnętrznych i kluczy API
z zakresem zarządzania nie zapewnia do niej dostępu. Przeglądarka ponownie weryfikuje odpowiedź przed utworzeniem
zewnętrznego łącza, które otwiera się z atrybutami `noopener noreferrer`.

Użyj pozbawionego poświadczeń adresu URL tunelu HTTPS lub sieci tailnet. Zwykły protokół HTTP jest akceptowany wyłącznie dla przekierowania SSH
na interfejsie loopback, takiego jak `http://127.0.0.1:9351`; inne schematy, osadzone poświadczenia, nieprawidłowe adresy URL oraz
zdalne lokalizacje docelowe HTTP są bezpiecznie odrzucane, a nawigacja pozostaje nieaktywna.

---

## Model bezpieczeństwa

### Podpis Ed25519 obejmujący dokładne bajty

Payload kanału jest podpisany za pomocą Ed25519. Funkcja `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) weryfikuje podpis obejmujący **dokładne bajty odpowiedzi**
odebrane przez sieć — przed weryfikacją payload nigdy nie jest ponownie serializowany,
więc ponowne zakodowanie bajt po bajcie nie może niepostrzeżenie unieważnić ani ominąć
weryfikacji podpisu. Niepowodzenie weryfikacji (`invalid_signature`) przerywa
synchronizację, zanim payload zostanie przeanalizowany lub zapisany w pamięci
podręcznej.

### Przypięty klucz publiczny i jego rotacja

Klucz publiczny używany do weryfikacji jest przypięty w pliku
`src/lib/radar/pinnedKeys.ts` (`PINNED_FEED_PUBLIC_KEYS`). Jest to tablica, dzięki
czemu przed rotacją można dodać nowy klucz na początku, a stare kanały zapisane
w pamięci podręcznej i podpisane poprzednim kluczem pozostają prawidłowe do czasu
ponownej synchronizacji.

### Przyjazne dla forków nadpisywanie przez zmienne środowiskowe

Dwie zmienne środowiskowe pozwalają forkom i osobom korzystającym z samodzielnego
hostingu skierować klienta do własnego kanału zamiast domyślnej usługi OmniRoute —
patrz [Jak samodzielnie hostować kanał](#how-to-self-host-a-feed) poniżej:

| Zmienna             | Przeznaczenie                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Nadpisuje bazowy adres URL kanału (domyślnie `https://radar.omniroute.online`).                                                                  |
| `RADAR_FEED_PUBKEY` | Nadpisuje przypięty klucz publiczny (SPKI w formacie DER zakodowanym jako base64 lub PEM), zastępując wbudowaną tablicę tym pojedynczym kluczem. |

### Minimalna wersja

Funkcja `syncRadar()` odrzuca pobrany kanał, którego `version` nie jest ściśle nowsza
od wersji znajdującej się obecnie w pamięci podręcznej (`compareVersions()`,
porównanie formatu kropkowego `YYYY.MM.DD.n`) — `{ status: "stale" }`. Zapobiega to
cofnięciu klienta do starszego payloadu podpisanego innym kluczem przez przejęty lub
błędnie skonfigurowany punkt końcowy kanału.

### Dwie daty i powód przechowywania obu

Kanał zapisany w pamięci podręcznej zawiera dwie odrębne daty, a możliwość ich
pomylenia jest właśnie powodem przechowywania obu:

| Pole          | Źródło                 | Odpowiada na pytanie               |
| ------------- | ---------------------- | ---------------------------------- |
| `generatedAt` | podpisana treść kanału | jak stare są **dane**              |
| `fetchedAt`   | zegar tej instalacji   | kiedy ta instalacja je **pobrała** |

Kanał pobrany kilka minut temu może zawierać dane sprzed kilku tygodni, dlatego samo
`fetchedAt` nie pozwala operatorowi ustalić, czy nakładka jest nowsza od danych
bazowych, na których się opiera. Obie wartości są przechowywane w
`radar_feed_cache`, zwracane przez `getRadarCatalog().meta` i raportowane oddzielnie
przez `GET /api/radar/status`. Wiersz zapisany w pamięci podręcznej przed utworzeniem
kolumny `generated_at` (migracja 163) jest odczytywany jako `null` — wartość nieznana
pozostaje nieznana zamiast przyjmować czas pobrania. Tabela `radar_referrals_cache`
przechowuje własne `generated_at` od migracji 142.

Opisana powyżej minimalna wersja porównuje `version`, a nie żadną z tych dat.

Pozostają dwie luki, obie zamierzone: panel nadal wyświetla tylko `Last fetched`, więc
pokazanie w nim daty kompilacji wymaga nowej etykiety (oraz jej 41 wersji językowych);
ponadto pamięci podręczne ofert i informacji nie przechowują daty kompilacji, mimo że
ich schematy kanałów ją zawierają — dlatego `GET /api/radar/status` pomija to pole dla
tych dwóch przypadków, zamiast raportować `null`, które zostałoby odczytane jako
„nieznane”.

### Walidacja schematu

Pobrane bajty są analizowane i walidowane względem `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, schemat Zod) **po** weryfikacji podpisu. Niezgodność
ze schematem zwraca `{ status: "invalid_schema" }`, a pamięć podręczna pozostaje
nienaruszona. Payload zapisany w pamięci podręcznej jest zapobiegawczo ponownie
walidowany przy każdym odczycie (`getRadarCatalog()`) — uszkodzony lub ręcznie
zmodyfikowany wiersz pamięci podręcznej powoduje użycie danych bazowych zamiast jego
udostępnienia.

### Limit rozmiaru odpowiedzi (10 MB)

Funkcja `syncRadar()` wymusza **sztywny limit 10 MB** dla treści odpowiedzi kanału —
podpisany kanał jest dokumentem JSON o rozmiarze rzędu kilobajtów, więc przekroczenie
tego limitu wskazuje na błędnie skonfigurowany lub złośliwy `RADAR_FEED_URL` (albo
serwer pośredniczący zwracający nieprawidłowe dane), a nie na prawidłowy katalog.
Mechanizm egzekwowania ma dwie warstwy:

1. Wstępne sprawdzenie `Content-Length` całkowicie pomija odczytywanie treści, gdy
   nagłówek już deklaruje wartość przekraczającą limit.
2. Sprawdzanie bieżącej sumy podczas odczytu treści wymusza limit nawet wtedy, gdy
   `Content-Length` jest nieobecny lub zaniża rzeczywisty rozmiar — sam nagłówek nigdy
   nie jest uznawany za wiarygodny. Połączenie zgromadzonych fragmentów zachowuje
   dokładne bajty potrzebne do późniejszej weryfikacji podpisu Ed25519.

Przekroczenie limitu zwraca `{ status: "too_large" }` i pozostawia pamięć podręczną
nienaruszoną, zgodnie z tym samym niedestrukcyjnym wzorcem co wszystkie pozostałe
błędy synchronizacji (`invalid_signature`, `invalid_schema`, `stale`).

---

## Poziomy: `community` i `live`

Schemat kanału zawiera pole `tier: "community" | "live"`, określane **po stronie serwera**
przez usługę kanału na podstawie żądania (obecności i poprawności klucza wspierającego)
— klient nigdy nie określa własnego poziomu.

- **`community`** — bezpłatny katalog opóźniony o około 30 dni względem najnowszych
  danych. Otrzymują go żądania nieuwierzytelnione lub zawierające nieprawidłowy klucz.
- **`live`** — najnowszy katalog, udostępniany żądaniom zawierającym prawidłowy klucz
  wspierającego.

**Nieprawidłowy lub wygasły klucz wspierającego powoduje przejście do poziomu `community` — nigdy nie jest
to błąd.** Ścieżka synchronizacji rozróżnia jedynie błędy podpisu/schematu/wersji (wszystkie
możliwe do obsłużenia, żaden nie wpływa krytycznie na stan pamięci podręcznej) od pomyślnego wyniku `{ status:
"updated", version, tier }`. Nie istnieje ścieżka błędu specyficzna dla poziomu, którą klient musiałby
obsługiwać.

### Udostępniany poziom pochodzi z nagłówka odpowiedzi, a nie z podpisanej treści

Pole `tier` w **treści** podpisanego kanału ma zawsze wartość `"live"` — usługa kanału publikuje
**dwa podpisane artefakty dla każdej wersji**: wariant live obejmuje bieżące kampanie, a wariant community
je pomija. Każdy artefakt jest podpisywany na podstawie własnej dokładnej sekwencji bajtów. Treść nadal nie
stanowi podstawy decyzji o uprawnieniach; poziom faktycznie wybrany dla żądania jest przekazywany
w **nagłówku odpowiedzi `x-omniroute-feed-tier`**, ustalanym po stronie serwera na podstawie klucza
`Authorization` zawartego w żądaniu.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) jest jedynym miejscem,
które ustala poziom, jaki klient powinien uznać za wiarygodny:

1. Parsuje `x-omniroute-feed-tier` za pomocą `RadarTierSchema` (Zod) — brak nagłówka lub
   wartość inna niż dokładnie `"community"` albo `"live"` są traktowane jako **nie
   podane** (nigdy nie trafiają w niezmienionej postaci do pamięci podręcznej/interfejsu jako zaufane; obejmuje to również starsze serwery
   kanału, które powstały przed wprowadzeniem tego nagłówka).
2. Tylko gdy krok 1 nie zwróci wyniku, używa pola `tier` z podpisanej treści (zawsze `"live"`)
   jako wartości zastępczej.
3. Ustalony poziom jest zapisywany w pamięci podręcznej i zwracany jako `{ status: "updated",
version, tier }` — panel wyświetla właśnie tę wartość, nigdy nieprzetworzone pole
   z treści.

---

## Reguły scalania nakładki podczas odczytu

`applyFeed()` (`src/lib/radar/applyFeed.ts`) scala kanał z pamięci podręcznej **nad**
statyczną bazą **podczas odczytu**, wewnątrz `getRadarCatalog()`. Tablica bazowa
(`FREE_MODEL_BUDGETS`) nigdy nie jest modyfikowana — przy każdym wywołaniu od nowa obliczana
jest tablica `MergedEntry[]`.

Cztery reguły w kolejności pierwszeństwa:

1. **Kanał nigdy nie nadpisuje lokalnego ustawienia.** Dla każdego pola: jeśli operator
   dostosował pole wpisu (mapa `localOverrides`, indeksowana przez `provider:modelId`),
   wartość tego konkretnego pola z kanału jest pomijana — wartość operatora ma pierwszeństwo.
2. **`enabled: false` wyłącza wpis z podaniem pochodzenia.** Wpis kanału, który wyłącza
   dany wpis, ustawia `enabled: false` i `disabledBy: "radar"` w scalonym wyniku,
   dzięki czemu interfejs może wyjaśnić, _dlaczego_ wpis zmienił stan z dostępnego na wyłączony.
3. **Wpis dodany przez użytkownika, którego nie ma w kanale, pozostaje niezmieniony.** Wpisy,
   które istnieją tylko w bazie (lub zostały dodane lokalnie) i nie mają odpowiadającego im wpisu
   w kanale, przechodzą bez zmian.
4. **Wpis oznaczony nagrobkiem nigdy nie jest przywracany.** Jeśli operator jawnie usunął
   wpis (zbiór `tombstones`), ponowne dodanie tego `provider:modelId` przez kanał w późniejszej
   wersji nie przywraca go.

Edytowalne pola i nagrobki są utrwalane w
`radar_local_model_state` (migracja `153_radar_local_model_state.sql`). Publiczny adapter bazy danych
(`src/lib/db/radar.ts`) konwertuje te wiersze na mapę `localOverrides` i zbiór
`tombstones` używane przez `applyFeed()`; produkcyjna funkcja `getRadarCatalog()` wczytuje ten stan
po pomyślnym przejściu kontroli flagi, pamięci podręcznej i schematu. Operator może edytować tylko pola `displayName` i `enabled`.
Tożsamości dostawcy/modelu, pochodzenia danych z kanału, limitu, możliwości, warunków świadczenia usług
oraz danych konfiguracyjnych nie można zapisywać za pośrednictwem tego interfejsu.

Panel udostępnia cztery działania lokalne:

- **Edytuj** zmienia lokalną nazwę wyświetlaną i stan włączenia.
- **Resetuj zmiany lokalne** czyści oba edytowalne pola bez zmiany nagrobka.
- **Ukryj** tworzy nagrobek, dzięki czemu późniejsze aktualizacje kanału nie mogą odtworzyć wiersza.
- **Przywróć** usuwa nagrobek; każde zapisane oddzielnie ustawienie nadal obowiązuje.

Wartość `enabled: false` z kanału pozostaje wyjątkiem bezpieczeństwa: ma pierwszeństwo przed nieaktualnym lokalnym
`enabled: true`, utrzymuje scalony wpis w stanie wyłączonym i zapisuje `disabledBy: "radar"`.

Publikacje katalogu używają `schemaVersion: 2`. `contextWindow` oraz każde z pól `tools`, `vision` i
`thinking` są niezależnie typu `number | null` / `boolean | null`: `null` oznacza brak wiedzy, natomiast
`false` oznacza, że oficjalne źródło dostawcy, potwierdzone zgodnie z D16, jawnie stwierdza brak danej możliwości.
Wewnętrzne flagi rejestru/specyfikacji modeli OmniRoute nigdy nie są bezpośrednio przekształcane w fakty kanału. Klient
nadal akceptuje migawki v1; ponieważ stary konstruktor używał `false` jako symbolu zastępczego braku danych, wartość `false` w v1 jest
normalizowana do braku wiedzy, natomiast `true` w v1 pozostaje faktem. Nieznane wersje schematu są bezpiecznie odrzucane, a
ostatnia prawidłowa pamięć podręczna pozostaje dostępna. Każdy model v2 z niepustą wartością kontekstu/możliwości musi zawierać
niewymagający poświadczeń adres HTTPS w `metadataEvidenceUrls[]`; w przeciwnym razie walidacja schematu kończy się niepowodzeniem, a pamięć podręczna
nie jest zastępowana. Tabela katalogu przedstawia wszystkie trzy stany jako `✓`, `✕` i `?`.

### Prowadzone kombinacje i dostęp MCP

Potwierdzone wartości `familyId` pozostają zachowane po nałożeniu warstwy podczas odczytu i są używane przez czysty
moduł `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Rodzina jest sugerowana
tylko wtedy, gdy co najmniej dwóch różnych dostawców ma aktywne połączenia i udostępnia dokładnie określony, wyselekcjonowany identyfikator
modelu. Wyłączone modele, nieaktywni dostawcy, brakujące identyfikatory modeli, rodziny jednoelementowe i niejednoznaczne
dopasowania aliasów/prefiksów są bezpiecznie odrzucane. Sugestie korzystają z istniejącej strategii `priority`, porządkując je
najpierw według największego cyklicznego budżetu miesięcznego; interfejs tworzy je wyłącznie za pośrednictwem `POST /api/combos`.

Interfejs z przewodnikiem znajduje się pod adresem `/dashboard/radar/combos`. Odczytuje wyłącznie lokalne
endpointy `GET /api/radar/catalog` oraz `GET /api/combos/builder/options`. Nigdy nie uruchamia synchronizacji Radar,
nie odczytuje danych uwierzytelniających dostawcy ani nie zapisuje bezpośrednio do bazy danych kombinacji.

Klienci MCP mogą odczytywać tę samą lokalną projekcję za pomocą `omniroute_radar_catalog` (`read:radar`). Opcjonalne
filtry `provider`, `familyId` i `enabledOnly` są stosowane po jednym lokalnym odczycie
`GET /api/radar/catalog`. Jego zamknięty wynik zawiera metadane katalogu oraz dostawcę/model,
nazwę wyświetlaną, `familyId`, limit, możliwości, stan włączenia, pochodzenie i `disabledBy`; adresy URL konfiguracji,
kroki, połączenia, adresy e-mail, klucze i dane polecające nigdy nie są zwracane. To narzędzie jest
tylko do odczytu i nigdy nie wywołuje `/api/radar/sync`.

### Znaczniki pochodzenia

Każdy scalony wpis zawiera pole `origin`, które interfejs wyświetla jako odznakę:

- `"baseline"` — niezmieniony wpis ze statycznego katalogu wydania.
- `"radar"` — co najmniej jedno pole zostało odświeżone przez źródło danych.
- `"local"` — operator ma co najmniej jedno lokalne nadpisanie dla tego wpisu (lokalne
  nadpisania zawsze mają pierwszeństwo przed źródłem danych zgodnie z regułą 1, niezależnie od informacji przekazywanych przez źródło).

---

## Lokalne interfejsy — nigdy jako proxy kanału danych

Poniższe rodziny lokalnych tras Radar obsługują interfejs użytkownika w `src/app/api/radar/`:

| Trasa                          | Metoda | Przeznaczenie                                                                                                                            |
| ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Zwraca scalony katalog (`getRadarCatalog()`) z lokalnej pamięci podręcznej.                                                              |
| `/api/radar/sync`              | POST   | Uruchamia `syncRadar()` po stronie serwera i zwraca wynikowy stan.                                                                       |
| `/api/radar/settings`          | GET    | Zwraca `{ optIn, hasSupporterKey, supporterKeyMasked }` — nigdy nie zwraca nieprzetworzonego klucza.                                     |
| `/api/radar/settings`          | POST   | Ustawia zgodę i/lub (zaszyfrowany) klucz wspierającego.                                                                                  |
| `/api/radar/referrals`         | GET    | Zwraca `{ fixed, campaigns, tier }` z lokalnej pamięci podręcznej — zobacz [Linki polecające](#referral-links-free-credits) poniżej.     |
| `/api/radar/offers`            | GET    | Zwraca aktywne oferty ze zweryfikowanej lokalnej pamięci podręcznej danych bieżących; nigdy nie zwraca klucza wspierającego.             |
| `/api/radar/offers/sync`       | POST   | Uruchamia po stronie serwera potok `syncRadarOffers()`, korzystający wyłącznie z aktywnego klucza.                                       |
| `/api/radar/intel`             | GET    | Zwraca zweryfikowane lokalne bieżące dane Intel oraz wartość logiczną rozpoznania wspierającego; nigdy nie zwraca tożsamości ani klucza. |
| `/api/radar/intel/sync`        | POST   | Uruchamia po stronie serwera potok `syncRadarIntel()`, korzystający wyłącznie z aktywnego klucza.                                        |
| `/api/radar/status`            | GET    | Zwraca lokalny stan ustawień/pamięci podręcznej tylko do odczytu dla katalogu, poleceń, ofert i Intel, bez danych poufnych.              |
| `/api/radar/sync-all`          | POST   | Uruchamia wszystkie cztery moduły synchronizacji po stronie serwera i zwraca osobny stan dla każdego kanału danych.                      |
| `/api/radar/local-model-state` | GET    | Wyświetla utrwalone nadpisania i znaczniki usunięcia na potrzeby kontrolek edycji/przywracania.                                          |
| `/api/radar/local-model-state` | PATCH  | Ustawia lub usuwa zweryfikowane pola nadpisania `displayName`/`enabled`.                                                                 |
| `/api/radar/local-model-state` | PUT    | Tworzy lub usuwa znacznik usunięcia za pomocą `{ provider, modelId, tombstoned }`.                                                       |
| `/api/radar/local-model-state` | DELETE | Usuwa edytowalne pola nadpisania, zachowując ewentualny znacznik usunięcia.                                                              |

**Twarda zasada: te trasy nigdy nie działają jako proxy usługi kanału danych.** Przeglądarka komunikuje się wyłącznie
z lokalnym serwerem OmniRoute. Cztery moduły, które komunikują się z usługą Radar, to
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (polecenia) oraz
`src/lib/radar/offersSync.ts` (oferty), a także `src/lib/radar/intelSync.ts` (Intel); wszystkie działają
po stronie serwera, nigdy po stronie klienta. Dzięki temu
adres URL kanału danych i każdy klucz wspierającego są całkowicie niewidoczne w ruchu sieciowym po stronie klienta.

Wszystkie punkty końcowe Radar zwracają `404`, gdy `RADAR_ENABLED` jest wyłączone (zobacz
[Flagę](#flag-radar_enabled-default-off) powyżej), a odpowiedzi z błędami tras są przetwarzane przez
`buildErrorBody()`/`sanitizeErrorMessage()` zgodnie z obowiązującą w całym repozytorium zasadą oczyszczania błędów
(`docs/security/ERROR_SANITIZATION.md`).

### Uwierzytelnianie

Wszystkie punkty końcowe Radar wymagają uwierzytelnienia za pomocą `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — pliku cookie sesji panelu lub klucza API z zakresem zarządzania,
czyli tej samej bramy, która chroni pozostałą część `/api/settings/*`. Sprawdzenie `404`
dla wyłączonej flagi zawsze odbywa się **przed** sprawdzeniem uwierzytelnienia, dzięki czemu instalacja z wyłączonym
`RADAR_ENABLED` pozostaje identyczna na poziomie bajtów (bez monitu o uwierzytelnienie tylko po to, aby dowiedzieć się, że dany interfejs nie istnieje);
po włączeniu flagi nieuwierzytelnione żądanie otrzymuje `401` przed jakimkolwiek odczytem z bazy danych lub
zapisem do niej. `GET /api/radar/settings` nigdy nie zwraca nieprzetworzonego klucza wspierającego, niezależnie od
stanu uwierzytelnienia — wyłącznie jego zamaskowaną postać i wartość logiczną `hasSupporterKey`.

---

## Oferty dla wspierających

Oferty korzystają z własnego podpisanego artefaktu, `GET /v1/offers/latest`, i nigdy nie współdzielą pamięci podręcznej katalogu ani poleceń. Punkt końcowy serwera wymaga prawidłowego, aktywnego klucza Bearer wspierającego; nie ma trybu awaryjnego dla społeczności. Dlatego `syncRadarOffers()` zatrzymuje się przed wykonaniem żądania sieciowego, gdy flaga funkcji jest wyłączona, operator nie wyraził zgody lub nie skonfigurowano klucza wspierającego.

Po pomyślnym żądaniu GET klient weryfikuje podpis Ed25519 względem dokładnych bajtów odpowiedzi, sprawdza zgodność z `RadarOffersFeedSchema`, wymaga, aby zarówno podpisana treść, jak i nagłówek `x-omniroute-feed-tier` wskazywały wartość `live`, wymusza ściśle nowszą wersję w notacji kropkowej i dopiero wtedy atomowo zastępuje `radar_offers_cache` (migracja `144_radar_offers_cache.sql`). Obowiązuje ten sam limit 10 MB dla nagłówka i strumienia, którego używają pozostałe kanały. Błędy podpisu, schematu, poziomu, powtórzenia, rozmiaru, HTTP i sieci zawsze zachowują ostatnią zweryfikowaną pamięć podręczną.

Zamknięty format oferty obsługuje trzy porównywalne rodzaje korzyści: wartość procentową w punktach bazowych, środki w najmniejszych jednostkach waluty lub dni okresu próbnego. Oferta partnera musi zawierać publiczną wartość bazową tego samego rodzaju, a jej korzyść musi być ściśle większa; oferty oficjalne nie mają wartości bazowej partnera. Adresy URL muszą używać HTTPS i nie mogą zawierać danych uwierzytelniających. `getRadarOffers()` na potrzeby ochrony ponownie sprawdza poprawność danych zapisanych w pamięci podręcznej i filtruje wygasłe wpisy przy każdym lokalnym odczycie; `/dashboard/radar/offers` ponownie filtruje wpisy według daty wygaśnięcia przed ich renderowaniem, używa tekstu portugalskiego, jeśli jest dostępny, z angielskim jako wariantem zapasowym, oraz wyraźnie oznacza oferty partnerów.

Przeglądarka wywołuje wyłącznie trasy lokalne: odczytuje zamaskowany obraz ustawień, wysyła żądanie do `POST /api/radar/offers/sync`, aby odświeżyć dane po stronie serwera, a następnie odczytuje `GET /api/radar/offers`. W przypadku braku klucza zamiast próby wysłania żądania do kanału wyświetla istniejące łącza dla współtwórców i wspierających. Zewnętrzne łącza do ofert otwierają się w nowej karcie z `noopener noreferrer`. W tym wydaniu nie jest udostępniane żadne narzędzie MCP `radar_offers`.

---

## Radar Intel, odznaka wspierającego i CLI

Intel jest podpisanym artefaktem dostępnym pod adresem `GET /v1/intel/latest`. Zamknięty schemat `RadarIntelFeedSchema` akceptuje wyłącznie rankingi ELO należące do Radar, wyprowadzone przez prywatnego kuratora z potwierdzonych porównań, oraz faktyczne różnice wieku i liczebności katalogu wyprowadzone z podpisanych obrazów katalogu. Metodologia jest ustalona na ocenę początkową 1000 i K=32. Pusty ranking jest prawidłowy, jeśli nie potwierdzono żadnego porównania; klient nigdy nie generuje go samodzielnie.

`syncRadarIntel()` stosuje takie same mechanizmy jak oferty: Bearer po stronie serwera, 30-sekundowy limit czasu, limit strumienia wynoszący 10 MiB, weryfikację Ed25519 względem dokładnych bajtów, ścisłą walidację schematu, wymóg wartości `live` w treści i nagłówku, minimalną wersję oraz zachowanie ostatniej prawidłowej pamięci podręcznej. Po zapisaniu zweryfikowanego aktywnego obrazu klient wyprowadza `radar:<sha256(supporter key)>`, przechowuje wyłącznie tę jednokierunkową tożsamość i emituje dedykowane zdarzenie uznania `radar_supporter`. Odznaka `radar-supporter` jest idempotentna i przyznaje zero XP; nigdy nie aktualizuje tabel wyników ani nie wykorzystuje ponownie `token_share`. `/dashboard/radar/intel` renderuje odznakę wyłącznie na podstawie zweryfikowanych metadanych lokalnej pamięci podręcznej.

CLI udostępnia polecenia `omniroute radar status` i `omniroute radar sync`. Oba komunikują się wyłącznie z lokalnym API OmniRoute. `status` wykonuje tylko do odczytu żądanie `GET /api/radar/status`; `sync` wysyła jedno żądanie `POST /api/radar/sync-all` i wyświetla wynik dla każdego kanału. Żadne z tych poleceń nie odczytuje, nie przyjmuje ani nie wyświetla klucza wspierającego oraz żadne nie kontaktuje się bezpośrednio z usługą Radar.

---

## Linki polecające (darmowe środki)

Linki polecające są udostępniane z **samodzielnego, zawsze aktualnego** źródła —
`GET /v1/referrals/latest` — niezależnego od źródła katalogu. Jest to celowe: źródło
katalogu w warstwie community stanowi migawkę, która może mieć do 30 dni, więc link
polecający pobrany z tego źródła był wcześniej opóźniony względem rzeczywistej listy
linków na serwerze o taki sam okres (nowo dodany link polecający mógł nie dotrzeć do
użytkownika bezpłatnego/community nawet przez miesiąc). Źródło linków polecających
usuwa to opóźnienie, synchronizując się niezależnie i znacznie częściej.

```ts
// Treść odpowiedzi GET /v1/referrals/latest (podpisana za pomocą Ed25519, ten sam przypięty klucz co
// w źródle katalogu):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministyczne: max(updatedAt) dla wszystkich linków
                                  // polecających, dzięki czemu dwa identyczne żądania generują dokładnie
                                  // te same podpisane bajty/podpis
  referrals: {
    fixed: RadarReferral[],      // obecne w KAŻDEJ warstwie, w tym bez uwierzytelnienia/community
    campaigns: RadarReferral[],  // wypełniane tylko dla prawidłowego, aktywnego klucza Bearer (supporter);
                                  // żądania bez uwierzytelnienia/z wygasłym kluczem otrzymują []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

W przeciwieństwie do źródła katalogu ta treść w ogóle nie zawiera pola `tier` — serwer
decyduje, co uwzględnić dla każdego żądania na podstawie klucza `Authorization`, dlatego
nagłówek odpowiedzi `x-omniroute-feed-tier` jest JEDYNYM źródłem informacji o
udostępnionej warstwie (`referralsSync.ts::syncRadarReferrals`); brakujący lub
nierozpoznany nagłówek powoduje przejście do `"community"`, czyli założenia o najmniejszych
uprawnieniach. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) waliduje całą treść, ponownie wykorzystując ten
sam schemat `RadarReferralSchema` dla poszczególnych linków polecających, eksportowany
z `feedSchema.ts`, dzięki czemu oba źródła walidują poszczególne linki polecające
identycznie. Każdy `RadarReferral.url` musi używać `https://` — adres URL z `http://`
nie przejdzie walidacji schematu.

STARE pole `referrals` osadzone w katalogu w `RadarFeedSchema` (`feedSchema.ts`) jest
zachowane ze względu na zgodność wsteczną z już zapisanymi w pamięci podręcznej źródłami
katalogu, ale `getRadarReferrals()` już go nie odczytuje — zobacz
[Akcesor](#accessor) poniżej.

### Synchronizacja

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) jest JEDYNYM modułem, który
korzysta z sieci na potrzeby linków polecających, dokładnie odwzorowując kontrakt
`syncRadar()`: wyłączona flaga → `disabled`; brak zgody → `opt_out`; pobiera
`${RADAR_FEED_URL}/v1/referrals/latest` (z tymi samymi nadpisaniami
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` dla forków co katalog), weryfikuje podpis Ed25519
dla dokładnych bajtów odpowiedzi (`verifyFeedBytes`), waliduje względem
`RadarReferralsFeedSchema` i zapisuje w pamięci podręcznej w tabeli
`radar_referrals_cache` (migracja `142_radar_referrals_cache.sql`) — całkowicie
oddzielnej od tabeli `radar_feed_cache` katalogu. Limit odpowiedzi wynoszący 10 MB oraz
dolna granica `generatedAt` powodują odrzucenie przychodzącego źródła starszego niż
źródło zapisane w pamięci podręcznej, chroniąc przed ponownym odtworzeniem starszego
podpisanego artefaktu. Taki sam znacznik czasu jest akceptowany: serwer celowo nadaje
wariantom linków polecających community i live tę samą deterministyczną wartość
`generatedAt`, dzięki czemu podpisany ładunek i udostępniona warstwa mogą się zmienić po
zmianie klucza supporter bez zmiany bazowego zestawu linków. Funkcja nigdy nie zgłasza
wyjątków — zawsze zwraca obiekt statusu; błędy nigdy nie zawierają śladu stosu w
`reason`.

Pamięć podręczna linków polecających jest utrzymywana w stanie aktualnym przez dwa
mechanizmy wyzwalające, oba niezależne od własnego 24-godzinnego cyklu katalogu:

- **Synchronizacja przy odczycie** — samo `GET /api/radar/referrals` wywołuje
  `syncRadarReferrals()` bezpośrednio, gdy brakuje pamięci podręcznej lub gdy jest ona
  starsza niż `REFERRALS_STALE_MS` (1 godz., `shouldSyncReferralsOnRead()`), przed
  udostępnieniem odpowiedzi. Dzięki temu stałe linki są „zawsze aktualne” już przy
  kolejnym załadowaniu panelu, bez oczekiwania na jakikolwiek licznik czasu działający
  w tle.
- **Dodatkowa synchronizacja harmonogramu** — `radarSchedulerTick()` (`scheduler.ts`)
  niezależnie ocenia aktualność linków polecających podczas tego samego cogodzinnego
  cyklu używanego dla katalogu, wywołując `syncRadarReferrals()`, gdy jest to wymagane.
  Działa to niezależnie od tego, czy w danym cyklu przypadała synchronizacja samego
  katalogu, i nigdy nie wpływa na strukturę `RadarTickResult` (jedynie dodatkowy efekt
  typu best effort, a błędy są ignorowane).

### Akcesor

`src/lib/radar/index.ts` eksportuje dwa akcesory tylko do odczytu, z których żaden nigdy
nie zgłasza wyjątków (ten sam defensywny kontrakt co `getRadarCatalog()` — wyłączona
flaga, brak pamięci podręcznej lub uszkodzony ładunek w pamięci podręcznej skutkują
zwróceniem pustej struktury zamiast błędu):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  odczytuje dane z `radar_referrals_cache` (za pośrednictwem
  `getRadarReferralsCache()`) i waliduje je przez `RadarReferralsFeedSchema` — **nie**
  przez pamięć podręczną katalogu.
- `getDefaultReferralFor(provider)` → link polecający `fixed` z `isDefault: true` dla
  danego dostawcy albo `null`. Uwzględnia tylko `fixed` — kampania nigdy nie jest
  używana jako „domyślny” link dostawcy.

Właściwa reguła określająca, „który link polecający jest domyślny dla dostawcy”, znajduje
się w `findDefaultReferral()` (`src/lib/radar/referrals.ts`), małej czystej funkcji
**bez importu DB** — można ją bezpiecznie importować do komponentu `"use client"`.
`getRadarReferrals`/`getDefaultReferralFor` (w `index.ts`) importują `@/lib/db/radar`,
dlatego pozostają dostępne wyłącznie po stronie serwera; panel dostawców importuje
bezpośrednio `referrals.ts` zamiast `index.ts` (zobacz poniżej), aby uniknąć dołączania
`better-sqlite3` do pakietu przeglądarki.

### `GET /api/radar/referrals`

Zachowuje dokładnie tę samą kolejność bramek co każda inna trasa Radar: wyłączone `RADAR_ENABLED` →
`404` (sprawdzane jako pierwsze, zachowując identyczność bajtową); brak uwierzytelnienia → `401`; w przeciwnym razie
uruchamia synchronizację przy odczycie (zobacz wyżej), gdy dane są nieaktualne, a następnie zwraca `200` z
`{ fixed, campaigns, tier }` — `tier` pochodzi bezpośrednio z (być może właśnie odświeżonego)
wiersza pamięci podręcznej i ma charakter wyłącznie informacyjny (steruje tekstem subtelnej zachęty do przejścia
na wyższy plan w interfejsie poniżej). Nigdy nie pośredniczy bezpośrednio w dostępie do serwera kanału danych —
kod źródłowy samej trasy nie zawiera wywołania `fetch(`; komunikacja sieciowa odbywa się wyłącznie wewnątrz
`syncRadarReferrals()`, zgodnie z tą samą zasadą korzystania wyłącznie z lokalnej pamięci podręcznej
co `/api/radar/catalog`.

### Interfejs panelu — karta „Darmowe środki” na `/dashboard/radar`

Wykorzystuje istniejącą stronę Radar (`src/app/(dashboard)/dashboard/radar/page.tsx`) jako
drugą kartę zamiast nowej trasy — oznacza to mniejszy zakres routingu/i18n dla funkcji będącej
wariantem danych, które ta strona już pobiera. Po włączeniu funkcji pasek kart oferuje
**Katalog** (istniejąca tabela) oraz **Darmowe środki**:

- Stałe linki są pogrupowane według dostawcy; każdy z nich wyświetla `requiredAction` (jeśli jest
  dostępne) oraz przycisk z `target="_blank" rel="noopener noreferrer"` prowadzący do adresu polecającego.
- Kampanie wyświetlają te same informacje, a dodatkowo `validUntil`, jeśli jest dostępne.
- Gdy `campaigns` jest puste, **a** obsługiwany poziom to `community`, interfejs wyświetla
  krótką zachętę do przejścia na wyższy plan („kampanie ograniczone czasowo są dodatkiem dla wspierających”) —
  **nigdy** nie ukrywa ona ani nie blokuje listy stałych linków, która pozostaje w pełni dostępna
  na każdym poziomie. Zachęta ma wyłącznie charakter informacyjny i nigdy niczego nie blokuje.

### Link polecający w nazwie dostawcy (panel dostawców)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
już wcześniej zmieniał nazwę dostawcy w link do `providerInfo.website`, gdy ta wartość była dostępna, a także
miał jeden przykład linku monetyzowanego: notę dotyczącą linku partnerskiego Kimi (Moonshot AI)
(klucz i18n `providers.kimiPartnerLinkNote`). D28 ponownie wykorzystuje dokładnie ten sam wzorzec
dyskretnej noty dla domyślnych poleceń Radar, zamiast wprowadzać nowy klucz.

Luźne powiązanie, zgodnie z założeniem:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  jest funkcją **czystą** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — bez zależności od `@/lib/radar` ani `@/lib/db/*`. Cały plik `providerPageUtils.ts`
  również pozostaje wolny od tych importów (co jest weryfikowane przez
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponent `"use client"`) jest jedynym miejscem, w którym
  dozwolone jest pobieranie danych Radar — za pośrednictwem `fetch("/api/radar/referrals")`, zgodnie z tym samym
  wzorcem lokalnej trasy, którego używa sama strona panelu Radar — i oblicza domyślne polecenie
  po stronie klienta za pomocą `findDefaultReferral()` z niezależnego od bazy danych pliku
  `src/lib/radar/referrals.ts`.
- Gdy `RADAR_ENABLED` jest wyłączone, żądanie zwraca 404, `referralUrl` pozostaje `null`, a
  `resolveProviderHeaderLink()` zwraca niezmienioną statyczną wartość `website` z katalogu —
  strona dostawcy jest identyczna bajt w bajt z wersją sprzed wprowadzenia tej funkcji. Taki sam rezultat
  występuje, gdy pamięć podręczna jeszcze nie istnieje lub nie ma domyślnego polecenia dla danego dostawcy.
- Gdy domyślne polecenie ma zastosowanie, `ProviderPageHeader` otrzymuje `isReferralLink`
  i wyświetla tę samą dyskretną notę/podpowiedź co link partnerski Kimi (ponownie wykorzystując
  klucz `providers.kimiPartnerLinkNote`) — nigdy nie wprowadza nowego, osobnego sposobu prezentacji.

---

## Jak samodzielnie hostować kanał

Fork lub osoba samodzielnie hostująca usługę, która chce mieć pełną kontrolę nad katalogiem, może uruchomić własną usługę kanału bez modyfikowania kodu klienta:

1. Udostępnij punkt końcowy `GET /v1/catalog/latest`, zwracający treść JSON zgodną z `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — z polami najwyższego poziomu `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` oraz `totals`. Obsługuj `x-omniroute-radar-schema: 2`; serwer zgodny z okresem przejściowym powinien domyślnie zwracać dla żądań bez tego nagłówka osobno podpisany artefakt v1.
2. Podpisz dokładne bajty odpowiedzi parą kluczy Ed25519 i zwróć podpis w formacie base64 w nagłówku odpowiedzi `x-omniroute-feed-signature`.
3. Ustaw `RADAR_FEED_URL` na nowy bazowy adres URL, a `RADAR_FEED_PUBKEY` na odpowiadający mu klucz publiczny (SPKI w formacie base64-DER lub PEM) — zobacz [dokumentację zmiennych środowiskowych](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Włącz `RADAR_ENABLED` i wyraź zgodę za pomocą `POST /api/radar/settings` (`{ optIn: true }`).

Nie są wymagane żadne inne zmiany w kodzie — `verifyFeedBytes()` automatycznie korzysta z nadpisanej konfiguracji (`getFeedPublicKeys()` w `src/lib/radar/pinnedKeys.ts`), a porównywanie wersji, walidacja schematu i reguły scalania działają identycznie dla samodzielnie hostowanego kanału.

Linki polecające (zobacz [Linki polecające (bezpłatne środki)](#referral-links-free-credits) powyżej) stanowią osobny, opcjonalny artefakt: fork, który udostępnia tylko `/v1/catalog/latest`, nadal działa w pełni — `syncRadarReferrals()` przechodzi do `{ status: "error" }` po otrzymaniu odpowiedzi `404` z `/v1/referrals/latest`, a pamięć podręczna pozostaje po prostu pusta, dzięki czemu `GET /api/radar/referrals` nadal zwraca `{ fixed: [], campaigns: [], tier: null }`, zamiast powodować awarię pozostałej części strony. Aby udostępnić także linki polecające, wystaw `GET /v1/referrals/latest` zgodny z `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) i podpisz go tą samą parą kluczy Ed25519 co kanał katalogu.

Oferty dla wspierających są kolejnym opcjonalnym artefaktem. Aby je udostępnić, zaimplementuj `GET /v1/offers/latest` zgodnie z zamkniętym schematem `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), wymagaj aktywnego uprawnienia, zwracaj `x-omniroute-feed-tier: live` i podpisuj dokładne bajty tym samym kluczem. Fork, który pomija ten punkt końcowy, zachowuje niezmienione działanie katalogu i poleceń; odświeżenie ofert kończy się niepowodzeniem bez utraty danych, a ostatnia zweryfikowana lokalna pamięć podręczna ofert pozostaje dostępna.

Dane Intel są opcjonalne w taki sam sposób. Osoba samodzielnie hostująca usługę może udostępnić `GET /v1/intel/latest` zgodny z `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), wymagać aktywnego uprawnienia, zwracać `x-omniroute-feed-tier: live` i podpisywać dokładne bajty współdzielonym kluczem Ed25519. Pominięcie tego punktu końcowego nie wpływa na katalog, polecenia ani oferty; odświeżenie danych Intel zachowuje ostatnią zweryfikowaną lokalną migawkę, jeśli taka istnieje.

---

## Powiązana dokumentacja

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — wzorzec odpowiedzi błędów stosowany przez trasy `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — dokumentacja `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
