# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ma **dwa** lokalne dla procesu systemy ścieżek o różnych zakresach. Są one
komplementarne; operatorzy powinni wiedzieć, na który z nich patrzą.

## 1. Ogólnoprocesowa kontrola dostępu na poziomie bajtów (`chatBodyAdmission.ts`)

- **Zakres:** ścieżka buforowanej treści/sterty dla `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` oraz innych tras o strukturze czatu. Chroni
  przed zwielokrotnieniem zużycia sterty przez duże treści żądań agentów
  programistycznych (#4380).
- **Jeden globalny kontroler procesu, a nie osobne ścieżki dla kluczy (#10110).**
  Każdy klucz API (po zahaszowaniu) lub sesja `anonymous` uzyskuje dostęp
  w ramach **tego samego** współdzielonego budżetu — zahaszowany identyfikator
  sesji jest używany WYŁĄCZNIE jako klucz sprawiedliwego szeregowania
  (dystrybucja oczekujących metodą round-robin), nigdy jako fragment pojemności.
  Poprzednia wersja tego dokumentu opisywała osobne ścieżki dla kluczy
  z niezależną pojemnością; model ten usunięto w #10110, ponieważ pozwalał
  nieuwierzytelnionym fałszywym poświadczeniom zwielokrotniać limit całego
  procesu.
- **Brama (#503-fanout): automatycznie wyliczany budżet BAJTÓW na przyjmowanie
  danych, a nie stały limit liczby żądań.** Starszy limit liczby żądań
  `CHAT_MAX_HEAVY_IN_FLIGHT` (przed tą poprawką domyślnie `1`) ograniczał
  rozgałęzianie agentów programistycznych (wiele podagentów/CLI, treści
  rutynowo > 256 KB) do efektywnej współbieżności wynoszącej około 1, co
  powodowało odpowiedzi 503 przy całkowicie normalnym obciążeniu. Obecnie
  obowiązuje on tylko wtedy, gdy operator jawnie ustawi
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Jeśli zmienna pozostaje nieustawiona,
  dostęp jest zamiast tego kontrolowany przez `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
  — budżet automatycznie wyliczany na podstawie rzeczywistego limitu pamięci
  procesu (`src/shared/middleware/admissionBudget.ts`): 25% mniejszej z wartości
  limitu sterty V8 i dowolnego limitu cgroup/kontenera, podzielone przez
  8-krotny współczynnik przejściowego zwielokrotnienia, z ograniczeniem do
  przedziału od 8 MiB do 2 GiB. Jawne nadpisania podlegają tym samym
  ograniczeniom. Mechanizm skaluje się samoczynnie od kontenera 512 MB po
  komputer stacjonarny z 32 GB pamięci, bez dostrajania zmiennych środowiskowych.
  Treść, która nie mieści się w efektywnym budżecie, jest natychmiast odrzucana
  z `413 body_exceeds_budget`; tylko rywalizacja między treściami, które
  pojedynczo mogą zostać obsłużone, trafia do ograniczonej kolejki sprawiedliwego
  szeregowania. Działający na bieżąco, wielosygnałowy mechanizm śledzenia presji
  na zasoby (współczynnik wykorzystania sterty V8, cgroup, PSI, zdarzenia OOM —
  `open-sse/utils/resourcePressurePolicy.ts`) skraca ograniczony czas oczekiwania
  przy presji `high` i natychmiast odrzuca żądania z `503 resource_pressure`
  przy presji `critical`, zanim zostaną pobrane jakiekolwiek bajty.
- **Dostrajanie:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nadpisanie automatycznie wyliczanego budżetu bajtów
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — starszy limit liczby żądań, tylko po włączeniu
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — czas oczekiwania w kolejce przed odpowiedzią 503 (domyślnie 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — zawór sterty dla bajtów w kolejce (domyślnie 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — przestarzałe
    opcje bez efektu od #10110 (akceptowane dla zgodności konfiguracji, ignorowane)
- **Raportowanie:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — w tym
  dodatki z #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` oraz `countCapEnabled`
  (false we wdrożeniu domyślnym — potwierdza, że faktycznym ograniczeniem jest
  budżet bajtów, a nie starszy limit liczby żądań).

## 2. Adaptacyjne wirtualne pasy środowiska wykonawczego (`open-sse/services/admission`)

- **Zakres:** kontrola dopuszczania według klucza dzierżawcy przy przekazywaniu do dostawcy — koszt kolejki, adaptacja limitów sterowana opóźnieniami, kolejkowanie w pasach oraz metryki pasów.
- **Przełącznik:** **wymaga włączenia.** Funkcja jest wyłączona, jeśli `OMNIROUTE_CHAT_VIRTUAL_LANES=true` nie zostało ustawione. Bez niej kontroler adaptacyjny zachowuje współdzieloną kolejkę (kryterium 1 z #9654 jest spełnione dopiero po włączeniu pasów przez operatora).
- **Dostrajanie:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + konfiguracja adaptacyjna (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Raportowanie:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (nieprzezroczyste identyfikatory pasów, nigdy surowe klucze) oraz `virtualLanes` — miarodajna flaga „pasy są włączone” w migawce.

## 3. Sondy fan-out — kontrola dopuszczania dla każdego celu w combo/fusion (#9654, fala 2)

Combo (priorytet / round-robin) oraz fusion rozdzielają żądanie do N modeli docelowych w ramach jednego żądania nadrzędnego. Od fali 2 w #9654 **każdy cel fan-out podlega kontroli przed przekazaniem** przez sondę dla danego celu (`PerTargetAdmissionHook`, utworzoną przez `createPerTargetAdmissionHook`) względem pasa dzierżawcy **żądania nadrzędnego**.

- **Zakres:** każdy cel fan-out przekazywany przez combo, fusion oraz silnik chaosu.
  System 1 (na poziomie bajtów) pozostaje bez zmian — nigdy nie sonduje celów fan-out.
- **Przełącznik:** **wymaga włączenia wraz z systemem 2.** Gdy `OMNIROUTE_CHAT_VIRTUAL_LANES`
  nie jest ustawione, operacja jest pusta — w tym trybie żądanie nadrzędne już utrzymuje
  dzierżawę współdzielonej kolejki, więc sondowanie powodowałoby podwójne naliczanie
  i odrzucanie celów combo.
- **Semantyka:**
  - **Ściśle nieblokująca — pomiń, nigdy nie kolejkuj.** `maxWaitMs 0`: pełny pas
    powoduje pominięcie celu, a zamiast niego obsługę przejmuje mechanizm awaryjny
    combo (lub panel pozostałych celów fusion). Jest to celowe: cel fan-out stanowi
    pracę nadmiarową, a umieszczenie go w kolejce zwiększa obciążenie dokładnie
    w tych przeciążonych miejscach, którym pasy mają zapobiegać. Dlatego
    `defaultMaxWaitMs` dotyczy **wyłącznie żądania nadrzędnego**; sondy fan-out
    nigdy nie czekają i celowo **nie istnieje parametr**, który pozwalałby im
    czekać (historia zgłoszenia pokazuje, że parametry oczekiwania prowadziły do
    masowych błędów klasy 502/504, którym zapobiega #9654 — należy wrócić do tego
    wyłącznie wtedy, gdy operator zgłosi, że pomijanie celów fan-out obniża jakość
    odpowiedzi).
  - **Zwolnienie po dopuszczeniu.** Dopuszczona sonda natychmiast zwalnia swoją
    dzierżawę: jest bramką pojemności, a nie rezerwacją. Dzierżawa żądania nadrzędnego
    obejmuje fan-out; utrzymywanie dodatkowych N dzierżaw zawyżałoby współdzielony
    aktywny koszt i powodowałoby odrzucanie innych dzierżawców. Jest to mechanizm
    typu best-effort, a nie rezerwacja: pas może ponownie się zapełnić między sondą
    a przekazaniem, więc przy dużej rywalizacji bramka może dopuścić cel do pasa,
    który będzie już ponownie pełny w chwili przekazywania celu.
  - **Wycena na podstawie rzeczywistej treści fan-out.** Sonda szacuje koszt na
    podstawie rzeczywistej treści celu — w tym klasy żądania wyznaczonej na podstawie
    jego flagi `stream`, dokładnie tak samo jak w ścieżce nadrzędnej — dzięki czemu
    elementy panelu fusion (`stream: false`) są wyceniane według klasy niestrumieniowej,
    którą faktycznie zajmą, a cele priorytetowe/RR według klasy zażądanej przez
    użytkownika.
- **Raportowanie:** pominięcie przez sondę po pierwszym celu zwiększa wartość
  `fallbackCount` danego żądania combo (zgodnie z istniejącą semantyką mechanizmu
  awaryjnego; widoczne w logach combo); fusion zwraca 503, gdy pominięto wszystkich
  członków panelu. Obecnie migawka **nie zawiera licznika zbiorczego** (np.
  `virtualFanoutSkipped`) — jeśli operator zgłosi, że nie jest w stanie określić,
  jak często bramka pasa pomija cele fan-out, będzie to sygnał do dodania takiego
  licznika.

## Co jest widoczne w panelu

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptacyjne pasy wirtualne** (system 2).
- `adaptiveAdmission.virtualLanes === true` → sondy fan-out z sekcji 3 są
  również aktywne. Ładunek, w którym brakuje `virtualLanes` lub ma on wartość `false`, oznacza,
  że `OMNIROUTE_CHAT_VIRTUAL_LANES` nie jest ustawiona — pasy na poziomie bajtów (system 1)
  nadal są aktywne, ale nic w ramach `adaptiveAdmission` (ani żadne bramkowanie fan-out)
  nie działa, dopóki ta opcja nie zostanie włączona.

## Dlaczego istnieją oba systemy

Pasy na poziomie bajtów ograniczają obciążającą pamięć ścieżkę parsowania/kompresji; pasy adaptacyjne
ograniczają koszt wysyłania na dzierżawcę. Kryterium 1 z #9654 („nagły wzrost ruchu jednej sesji nie powoduje
błędu 503 w innej”) jest bezwarunkowo egzekwowane przez system 1, a przez system 2 po włączeniu tej funkcji.

## 4. Długie `/v1/responses` w jednym procesie (zapas dla stabilnego stanu)

W [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) dodano
`tryAcquireHealthyHeadroom`, dzięki czemu drugie żądanie o dużej złożoności strukturalnej jest przyjmowane,
gdy wykorzystanie sterty jest poniżej `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Ścieżka BYTE
używana przez `admitChatRequest` (treści ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
domyślnie 256 KiB, w tym `POST /v1/responses`) korzysta z **tego samego** mechanizmu awaryjnego.

Jest to obsługiwany przepis dla **jednego procesu**, pozwalający na więcej niż dwa równoczesne, długotrwałe
połączenia SSE `/v1/responses`: zwiększaj limit podstawowy i zapas dla stabilnego stanu tylko na tyle, na ile pozwalają sterta
oraz ogólnoprocesowy budżet bajtów w trakcie przetwarzania (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Dziesiątki długotrwałych klientów SSE (40–50) to kwestia tego budżetu pamięci,
a nie sztywnego limitu produktu wynoszącego „maksymalnie 2”. Przy przeciążonej stercie żądania nadal są odrzucane
za pomocą ponawialnego błędu `503`, aby problem #7849 nie powrócił.

Aby **zwielokrotnić sterty**, uruchom N niezależnych katalogów `DATA_DIR` (#11024). Nigdy nie ustawiaj
`replicas > 1` dla jednego pliku SQLite (#10350). Ta sekcja nie stanowi ponownego otwarcia
przepisu na skalowanie poziome z użyciem DATA_DIR.
