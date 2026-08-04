---
title: "ADR: Pluggable persistence boundary"
status: proposed
lastUpdated: 2026-07-23
---

# ADR: Podłączalna granica persystencji

- **Status:** Zaproponowany — wymaga zatwierdzenia maintainerów przed rozpoczęciem prac runtime
- **Tracking issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Zakres:** Wyłącznie architektura persystencji; ta decyzja nie dodaje ani nie wybiera zewnętrznej bazy danych

## Kontekst

OmniRoute obecnie udostępnia zorientowane domenowo funkcje persystencji z `src/lib/db/`, podczas gdy
współdzielone połączenie zwracane przez `src/lib/db/core.ts` implementuje synchroniczny kontrakt
`SqliteAdapter` w `src/lib/db/adapters/types.ts`. Ten adapter obsługuje kilka runtime'ów SQLite, ale
jego powierzchnia pozostaje ukształtowana pod SQLite: synchroniczne prepared statements, `pragma`,
transakcje deferred i immediate, natywny backup / backup przez kopiowanie pliku, checkpoint oraz
lokalny uchwyt bazy danych.

Obecna ścieżka startu i odzyskiwania posiada także cykl życia pliku SQLite. `src/lib/db/core.ts`
rozwiązuje `storage.sqlite`, utrzymuje jeden procesowo-globalny adapter, wykonuje checkpoint WAL,
zachowuje wybrane tabele podczas odzyskiwania i usuwa pliki towarzyszące SQLite przy przebudowie
bazy. Wybór sterownika w `src/lib/db/adapters/driverFactory.ts` dotyczy obsługiwanych runtime'ów
SQLite; nie jest abstrakcją zewnętrznego backendu.

Ewolucja schematu jest podobnie sprzężona. `src/lib/db/migrationRunner.ts` stosuje numerowane pliki
SQL, sonduje `sqlite_master` i `PRAGMA table_info`, wykrywa opcjonalne wsparcie FTS5 i uruchamia
migracje w transakcjach SQLite. Moduły operacyjne takie jak `src/lib/db/backup.ts` i
`src/lib/db/optimizationSettings.ts` korzystają bezpośrednio z semantyki backupu, `PRAGMA`, WAL,
page-size, auto-vacuum oraz `VACUUM`.

Są to prawidłowe właściwości osadzonego wdrożenia SQLite. Powinny pozostać dostępne bez zmuszania
PostgreSQL ani MySQL do emulowania API SQLite.

## Decyzja

Przyjąć dwupoziomową granicę persystencji dla przenośnego trwałego stanu:

1. **Kontrakty repozytoriów domenowych** definiują operacje persystencji potrzebne kodowi biznesowemu
   i routingu. Wywołujący zależą od zachowania domenowego i danych domenowych, a nie od tekstu SQL,
   prepared statements, plików bazy ani obiektów dialektu.
2. **Wewnętrzny asynchroniczny kontrakt backendu** wspiera implementacje repozytoriów kontekstami
   transakcji, health/readiness, koordynacją migracji, możliwościami backendu oraz sklasyfikowanymi
   błędami. Dokładna powierzchnia TypeScript zostanie zaproponowana wraz z pierwszym PR
   implementacyjnym i potwierdzona testami zgodności; ten ADR celowo nie zamraża spekulacyjnego API.

SQLite pozostaje domyślną implementacją. Istniejąca kaskada sterowników SQLite oraz synchroniczny
`SqliteAdapter` pozostają za implementacją repozytorium SQLite, podczas gdy domeny są migrowane w
małych pionowych wycinkach. Żaden użytkownik nie jest zobowiązany do konfigurowania zewnętrznej
usługi.

PostgreSQL jest pierwszą proponowaną zewnętrzną implementacją po udowodnieniu granicy repozytorium
wobec SQLite. MySQL następuje jako równorzędna implementacja wobec tej samej suity zgodności, a nie
jako drugi fork logiki biznesowej.

## Reguły granicy

### Przenośna powierzchnia repozytorium

Przenośne repozytorium może udostępniać:

- odczyty i zapisy domenowe;
- jawne operacje atomowe oraz dostęp do repozytorium w zakresie transakcji;
- operacje compare/update lub lease, gdy semantyka współbieżności jest częścią domeny;
- neutralne względem backendu paginację, porządkowanie oraz błędy ograniczeń.

Health backendu, readiness oraz koordynacja migracji należą do wewnętrznego kontraktu
backendu/operacyjnego, a nie do poszczególnych repozytoriów domenowych.

Przenośne repozytorium nie może udostępniać:

- `prepare`, `get`, `all`, `run` ani surowych uchwytów sterownika;
- `PRAGMA`, trybów checkpoint WAL, `VACUUM` ani strojenia page/cache;
- ścieżek plików SQLite, plików towarzyszących ani backupu przez kopiowanie pliku;
- `lastInsertRowid` jako międzybackendowego kontraktu domenowego;
- składni FTS5 lub `sqlite-vec`;
- generycznego wyłomu dialektu używanego przez zwykły kod biznesowy.

### Powierzchnia możliwości backendu

Zachowanie specyficzne dla backendu pozostaje jawne i odkrywalne. Utrzymanie wyłącznie dla SQLite
pozostaje za własną implementacją i interfejsem operacyjnym, w tym:

- wybór sterownika w runtime;
- checkpoint WAL oraz zachowanie zamykania SQLite;
- ustawienia page-size, cache-size i auto-vacuum;
- backup, restore i odzyskiwanie pliku bazy;
- introspekcja schematu SQLite;
- integracja FTS5 i `sqlite-vec`.

Zewnętrzny backend nie jest zobowiązany do naśladowania tych funkcji. Repozytoria muszą albo użyć
przenośnej możliwości, dostarczyć implementację specyficzną dla backendu z udokumentowanym
zachowaniem, albo zgłosić, że możliwość jest niedostępna.

## Model transakcji i migracji

API repozytoriów definiują atomową operację biznesową; wywołujący nie wybierają trybu transakcji SQL.
Każda operacja musi zdefiniować swoje obserwowalne gwarancje współbieżności: chronione niezmienniki,
wykrywanie konfliktów, klasyfikację ponowień, oczekiwania idempotencji oraz propagację kontekstu
transakcji. Implementacje mogą używać różnych mechanizmów transakcji i izolacji tylko wtedy, gdy te
obserwowalne gwarancje pozostają równoważne. SQLite może wewnętrznie nadal używać obecnego
zachowania transakcji deferred lub immediate, o ile spełnia kontrakt operacji.

Zewnętrzne backendy wymagają jawnej własności migracji, aby wiele replik aplikacji nie mogło ścigać
się o tę samą zmianę schematu. Historie migracji backendów mogą współdzielić logiczne kamienie
milowe, ale pliki SQL SQLite nie są zakładane jako przenośne ani wielokrotnego użytku jako inny
dialekt.

## Semantyka zgodności między backendami

Testy zgodności muszą obejmować zachowanie, a nie tylko sygnatury metod repozytorium. Każda
migrowana domena musi zdefiniować i zweryfikować:

- strefę czasową znaczników czasu, precyzję i serializację;
- oczekiwania dotyczące porządkowania `NULL`, collation oraz wrażliwości na wielkość liter;
- reprezentację JSON i zachowanie porównań;
- precyzję liczb całkowitych, dziesiętnych i monetarnych;
- stabilne porządkowanie i deterministyczne rozstrzyganie remisów przy paginacji;
- generowanie ID bez polegania na row ID SQLite;
- klasyfikację naruszeń unikalności i kluczy obcych;
- zachowanie affected-row dla operacji no-op, compare/update i delete;
- wyniki współbieżnych zapisów, konflikty nadające się do ponowienia oraz idempotentne ponowienia.

Jeśli domena nie potrafi wyrazić równoważnej obserwowalnej semantyki, nie jest jeszcze przenośna i
musi pozostać specyficzna dla backendu, dopóki ten kontrakt nie zostanie zaprojektowany.

## Wymagania zgodności

Każda implementacja zgodna z tym ADR musi zachować te właściwości:

- SQLite pozostaje domyślnym wariantem zero-configuration.
- Istniejące pliki SQLite i historia migracji pozostają czytelne.
- Fallbacki SQLite dla npm, Electron, Docker i restricted-runtime zachowują obecną ścieżkę startu.
- Przechowywane poświadczenia providerów nadal używają istniejącego zachowania szyfrowania aplikacji.
- Migracja repozytorium nie zmienia po cichu semantyki routingu, quota, kluczy API ani audytu.
- Zachowanie backupu i odzyskiwania jest dokumentowane per backend, a nie przedstawiane jako uniwersalne.
- Czysta instalacja wyłącznie SQLite nie ładuje ani nie wymaga zewnętrznego sterownika bazy danych.

## Sekwencja dostarczania

1. Opublikować odtwarzalny inwentarz sprzężenia z SQLite jako osobny artefakt przeglądu.
2. Wprowadzić pierwsze kontrakty repozytoriów domenowych i testy zgodności.
3. Zaadaptować istniejącą implementację SQLite za tymi kontraktami bez zmiany domyślnych ustawień.
4. Po zatwierdzeniu przez maintainerów dodać PostgreSQL jako pierwszą zewnętrzną implementację dla
   jednego ograniczonego wycinka control-plane.
5. Rozszerzać współdzielony stan dopiero po istnieniu testów concurrent-write i migration-ownership.
6. Dodać offline, zweryfikowaną ścieżkę migracji SQLite-to-external przed reklamowaniem przełączania bazy.
7. Dodać MySQL wobec sprawdzonych kontraktów repozytorium i backendu.

Każdy krok runtime to osobny, podlegający przeglądowi PR. Późniejszy krok nie może służyć do
uzasadnienia scalenia niedowiedzionej abstrakcji we wcześniejszym kroku.

## Pierwszy wycinek implementacji

Pierwszy wycinek runtime powinien zostać wybrany po przeglądzie inwentarza sprzężenia. Połączenia
providerów, klucze API, combo i konfiguracja routingu są kandydatami, ponieważ ich tabele bazowe są
widoczne w `src/lib/db/core.ts`, ale ten ADR nie zatwierdza listy tabel ani PR migracyjnego.
Wycinek musi obejmować:

- testy zachowania zachowujące SQLite;
- testy zgodności repozytorium;
- jawne granice transakcji;
- weryfikację szyfrowania i redakcji dla przechowywanych poświadczeń;
- brak zmian w domyślnej konfiguracji startu.

## Rozważane alternatywy

### Dodać PostgreSQL pod `SqliteAdapter`

Odrzucone. `SqliteAdapter` to warstwa zgodności dla runtime'ów SQLite i udostępnia operacje
specyficzne dla SQLite. Emulowanie tej powierzchni wpuściłoby synchroniczne i dialektyczne założenia
do nowego backendu.

### Udostępnić generyczne API query/execute wszystkim domenom

Odrzucone jako główna granica. Scentralizowałoby obsługę połączeń, ale pozostawiłoby sprzężenie
dialektu SQL, transakcji i tabel w modułach biznesowych. Niskopoziomowy prymityw backendu może istnieć
wewnątrz implementacji repozytoriów, a nie jako aplikacyjne API persystencji.

### Przepisać całą persystencję przed walidacją jednego wycinka

Odrzucone. Obecna powierzchnia persystencji jest szeroka i obejmuje cykl życia plików, odzyskiwanie,
wyszukiwanie oraz ustawienia operacyjne. Pionowe wycinki zapewniają podlegające przeglądowi zachowanie
i granice wycofania.

### Zastąpić SQLite jako domyślny

Odrzucone. Osadzone i desktopowe wdrożenia zależą od obecnego modelu startu zero-service. Zewnętrzny
backend jest opt-in.

### Użyć Redis jako trwałego autorytetu

Odrzucone. Redis może wspierać jawnie efemeryczną koordynację, cache lub liczniki, ale nie zastępuje
opisanego tu trwałego kontraktu repozytorium.

## Konsekwencje

### Pozytywne

- Kod biznesowy zyskuje stabilny szew persystencji niezależny od dialektu bazy.
- Zachowanie SQLite jest testowane, zanim zewnętrzny backend zdefiniuje abstrakcję.
- PostgreSQL i MySQL współdzielą kontrakty i testy zamiast duplikować logikę domenową.
- Możliwości wyłącznie SQLite pozostają pierwszorzędne, zamiast stawać się nieszczelnymi shimami zgodności.
- Zachowanie migracji multi-replica i transakcji staje się jawną troską projektową.

### Koszty i ryzyka

- Wydzielenie repozytoriów wymaga przyrostowej migracji miejsc wywołań.
- Granice async mogą się propagować przez obecnie synchroniczny kod usług.
- Semantyka między backendami wymaga testów zgodności wykraczających poza zgodność składni SQL.
- Backup, wyszukiwanie, magazyn wektorowy i utrzymanie pozostają specyficzne dla możliwości.
- Uruchamianie więcej niż jednej implementacji persystencji zwiększa koszt CI i wsparcia operacyjnego.

## Cele poza zakresem

Ten ADR nie:

- dodaje zależności bazy, zmiennej środowiskowej, schematu ani migracji;
- zmienia działającego singletona SQLite ani kaskady sterowników;
- obiecuje wsparcia PostgreSQL ani MySQL w konkretnym wydaniu;
- czyni FTS5, `sqlite-vec`, plików backupu ani utrzymania SQLite przenośnymi;
- definiuje gotowości active-active, zanim powstaną testy shared-state i koordynacji;
- zatwierdza jednorazowego przepisania `src/lib/db/`.

## Otwarte pytania do zatwierdzenia przez maintainerów

1. Czy repozytorium plus wewnętrzna asynchroniczna granica backendu to preferowany kierunek, czy
   zewnętrzna persystencja powinna żyć za osobną usługą control-plane?
2. Czy PostgreSQL jest akceptowalny jako pierwsza zewnętrzna implementacja po zgodności SQLite?
3. Która domena powinna być pierwszym ograniczonym wycinkiem repozytorium?
4. Który stan musi być współdzielony dla pierwszego kamienia milowego multi-replica, a który pozostaje lokalny dla węzła?
5. Jaka gwarancja zgodności jest wymagana dla przerwanej lub wycofanej migracji repozytorium?

Dopóki te pytania nie zostaną rozstrzygnięte, ten dokument jest propozycją i nie implikuje żadnego
refaktoringu runtime.
