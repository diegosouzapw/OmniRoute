---
title: "Inwentaryzacja sprzężenia z SQLite"
status: measured-snapshot
lastUpdated: 2026-07-23
---

# Inwentaryzacja sprzężenia z SQLite

- **Tracking issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Snapshot revision:** `9a3b605f3420ae3ab08bd93d6443034f03a1bcbc`
- **Scanned-corpus SHA-256:** `72334620a7a18a42bcede1643fb2fdf95da6eae9ffa66a891ae14ed633ad43f6`
- **Cel:** Zmierz aktualne linie cięcia warstwy persystencji przed zaproponowaniem interfejsów repozytoriów
- **Wpływ na runtime:** Brak; ten dokument i jego skrypt audytu nie zmieniają zachowania bazy danych

## Jak odtworzyć

Z katalogu głównego repozytorium:

```bash
node scripts/check/audit-sqlite-coupling.mjs
node scripts/check/audit-sqlite-coupling.mjs --json
node --test scripts/check/audit-sqlite-coupling.test.mjs
```

Skrypt odczytuje śledzone pliki z Gita, skanuje źródła inne niż testowe w `src/`, `open-sse/`,
`electron/` i `bin/` oraz skanuje SQL migracji w `src/lib/db/migrations/`. Wyklucza
drzewo testów najwyższego poziomu, współlokalizowane katalogi testów, pliki źródłowe test/spec oraz ścieżki poza tymi
skonfigurowanymi korzeniami źródeł (w tym dokumentację i skrypty).

Skrypt odmawia uruchomienia, jeśli śledzone pliki w tych korzeniach źródeł różnią się od `HEAD`. Raportuje
zarówno rewizję narzędzia audytu, jak i SHA-256 nad uporządkowanym korpusem ścieżka/treść. Powyższy snapshot
został wykonany z wymienionej rewizji źródeł; ten PR zmienia wyłącznie wykluczone ścieżki dokumentacji i skryptów,
więc ponowne uruchomienie z czystej gałęzi PR daje ten sam digest korpusu.

To jest **inwentaryzacja leksykalna**, a nie semantyczna analiza TypeScript lub SQL:

- liczby to wystąpienia zdefiniowanych wzorców, a nie liczby odrębnych instrukcji SQL;
- wzorce wywołań adaptera i bezpośredniego singletona najpierw maskują komentarze i treści literałów;
- treści literałów szablonowych, w tym osadzone wyrażenia, są wykluczone z tych zliczeń
  składni kodu;
- lekki masker nie jest parserem JavaScript, więc nietypowa składnia literałów wyrażeń regularnych
  może nadal wymagać ręcznego przeglądu;
- komentarze i literały łańcuchowe mogą wnosić wkład do zliczeń sygnałów dialektu, które celowo przeszukują
  surowy tekst pod kątem osadzonego SQL;
- dopasowanie `.prepare()` poza `src/lib/db/` to trop do przeglądu, a nie dowód, że wywołanie należy przenieść;
- wywołania ukryte za inaczej nazwaną nakładką mogą nie być zliczane;
- liczby plików są deduplikowane, natomiast liczby wystąpień — nie.

Wyjście JSON obejmuje każdą pasującą ścieżkę, dzięki czemu recenzenci mogą sprawdzić lub przeklasyfikować poszczególne
wyniki zamiast opierać się wyłącznie na sumach.

## Zakres snapshota

W zapisanej rewizji skrypt przeskanował:

- 3 830 śledzonych plików źródłowych innych niż testowe;
- 129 plików SQL migracji.

Liczba plików źródłowych jest celowo szeroka, ponieważ celem jest znalezienie sprzężenia persystencji, które
wyszło poza nominalny katalog bazy danych, w tym kod CLI oraz proxy/runtime.

## Sygnały granic

| Signal                                                                           | Files | Occurrences |
| -------------------------------------------------------------------------------- | ----: | ----------: |
| Direct `getDbInstance()` call syntax outside comments/literals and `src/lib/db/` |    45 |         150 |
| `localDb` import consumers                                                       |   211 |           — |
| `SqliteAdapter` type consumers outside comments/literals and `src/lib/db/`       |     3 |           — |

Barrel `localDb` już daje wielu wywołującym szew funkcji domenowych, ale
`src/lib/localDb.ts` pozostaje warstwą re-eksportu, a nie kontraktem backendu. 45 bezpośrednich
konsumentów singletona to najczytelniejszy pierwszy zestaw do przeglądu, ponieważ omijają ten logiczny szew i
trzymają bezpośrednio uchwyt o kształcie adaptera.

Trzy pliki źródłowe inne niż testowe poza `src/lib/db/`, które w składni kodu wspominają typ `SqliteAdapter`,
to:

- `src/app/api/db-backups/import/route.ts`;
- `src/lib/compliance/index.ts`;
- `src/lib/compliance/noLog.ts`.

To nie są równoważne zadania migracyjne. Import kopii zapasowej jest specyficzny dla możliwości; persystencja
compliance może być przenośnym stanem domenowym. Przyszła granica powinna je sklasyfikować, a nie
przenosić wszystkie trzy mechanicznie.

## Składnia wywołań o kształcie adaptera

| Signal            | Occurrences | Files | Outside `src/lib/db/` occurrences | Outside files |
| ----------------- | ----------: | ----: | --------------------------------: | ------------: |
| `.prepare()`      |       1,219 |   163 |                               252 |            52 |
| `.transaction()`  |          62 |    40 |                                12 |            10 |
| `.immediate()`    |           3 |     3 |                                 0 |             0 |
| `.pragma()`       |          39 |    11 |                                 6 |             4 |
| `.backup()`       |           6 |     5 |                                 3 |             3 |
| `.checkpoint()`   |           0 |     0 |                                 0 |             0 |
| `lastInsertRowid` |          15 |     7 |                                 1 |             1 |

Ta tabela pokazuje, dlaczego `SqliteAdapter` jest warstwą zgodności runtime SQLite, a nie przenośną
abstrakcją backendu. Jego synchroniczny kształt instrukcji i transakcji jest szeroko używany, a część
tego kształtu jest widoczna poza nominalną warstwą bazy danych.

Główni bezpośredni konsumenci `getDbInstance()` poza `src/lib/db/` w tej rewizji to:

| File                                               | Occurrences |
| -------------------------------------------------- | ----------: |
| `src/lib/proxySubscription/subscriptionService.ts` |          12 |
| `src/lib/semanticCache.ts`                         |          10 |
| `src/lib/usage/callLogs.ts`                        |           9 |
| `src/lib/cloudAgent/db.ts`                         |           8 |
| `src/lib/memory/store.ts`                          |           8 |
| `src/lib/memory/vectorStore.ts`                    |           8 |
| `src/lib/modelsDevSync.ts`                         |           8 |
| `src/lib/gamification/badges.ts`                   |           5 |
| `src/lib/memory/retrieval.ts`                      |           5 |
| `src/lib/pricingSync.ts`                           |           5 |
| `src/lib/skills/registry.ts`                       |           5 |
| `src/lib/usage/usageHistory.ts`                    |           5 |

Lista obejmuje konfigurację control-plane, dane usage/audit, cache, wyszukiwanie memory/vector, skills,
gamification oraz wsparcie CLI/provider. Jeden generyczny adapter SQL utrwaliłby ten rozrzut;
repozytoria domenowe dają sposób na jego redukcję plaster po plasterku.

## Sygnały dialektu SQLite i cyklu życia

| Signal                | Occurrences | Files |
| --------------------- | ----------: | ----: |
| `PRAGMA` text         |          97 |    41 |
| `sqlite_master`       |          14 |    11 |
| `BEGIN IMMEDIATE`     |           2 |     2 |
| `INSERT OR REPLACE`   |          83 |    45 |
| `AUTOINCREMENT`       |          34 |    24 |
| `datetime('now')`     |         171 |    68 |
| `VACUUM`              |          39 |    10 |
| `wal_checkpoint`      |          13 |     7 |
| `fts5`                |          43 |     8 |
| `vec0`                |           7 |     1 |
| `last_insert_rowid()` |           1 |     1 |

Te wartości to sygnały tekstowe i obejmują komentarze, jeśli występują. Są przydatne do lokalizowania
pracy nad przenośnością, a nie do szacowania nakładu implementacji przez mnożenie.

Zweryfikowane obszary wysokiego sprzężenia obejmują:

- `src/lib/db/core.ts`: cykl życia singletona, ścieżki plików SQLite, checkpoint WAL, recovery, schemat,
  kompaktowanie i tworzenie kopii zapasowych;
- `src/lib/db/migrationRunner.ts`: wykonywanie ponumerowanych migracji SQL, `sqlite_master`,
  `PRAGMA table_info`, zachowanie transakcji oraz opcjonalna obsługa FTS5;
- `src/lib/db/optimizationSettings.ts`: ustawienia page/cache, auto-vacuum, przejścia WAL oraz
  `VACUUM`;
- `src/lib/db/backup.ts`: cykl życia kopii zapasowej i przywracania bazy danych;
- `src/lib/db/schemaColumns.ts`: introspekcja schematu SQLite i kolumny zgodności;
- `src/lib/memory/vectorStore.ts` oraz `src/lib/memory/retrieval.ts`: zachowanie `vec0` i FTS5;
- `src/lib/db/adapters/`: implementacje zgodności dla obsługiwanych runtime'ów SQLite.

Tych obszarów nie należy forsować przez interfejs repozytorium najniższego wspólnego mianownika. Potrzebują
wyraźnych możliwości SQLite albo osobnych implementacji backendu.

## Sprzężenie migracji

Snapshot zawiera 129 śledzonych plików SQL migracji. `src/lib/db/migrationRunner.ts` robi więcej
niż wykonywanie uporządkowanych plików: posiada odkrywanie migracji, historię wersji, bezpieczeństwo duplikatów wersji,
sondy schematu, sprawdzenia możliwości FTS5, bezpieczeństwo przed migracją oraz wykonywanie transakcji SQLite.

W konsekwencji:

- inny dialekt SQL nie może bezpiecznie ponownie użyć plików migracji bez zmian;
- zewnętrzne backendy potrzebują własnej implementacji migracji i historii schematu;
- logiczne kamienie milowe migracji mogą być współdzielone, ale fizyczny SQL i sondy możliwości pozostają
  specyficzne dla backendu;
- praca multi-replica wymaga własności migracji lub blokad, zanim zewnętrzny backend zostanie
  uznany za gotowy.

## Rekomendowane linie cięcia

### 1. Zachowaj nienaruszoną zgodność runtime SQLite

Nie zastępuj `SqliteAdapter` ani kaskady driverów w pierwszym PR dotyczącym repozytoriów. Zachowaj odzyskiwanie plików,
WAL, backup, optymalizację, FTS5 i zachowanie wektorów za bieżącą implementacją SQLite.

### 2. Zacznij od bezpośrednich konsumentów singletona

Użyj listy 45 plików bezpośrednich konsumentów jako początkowej kolejki przeglądu. Sklasyfikuj każdy plik jako:

- przenośny stan domenowy;
- konserwację lub wyszukiwanie specyficzne dla backendu;
- stan lokalny dla procesu lub możliwy do odbudowy;
- dostęp legacy, który powinien wywoływać istniejący moduł domenowy.

Klasyfikacja musi poprzedzać projekt interfejsu. Samo pojawienie się ścieżki w inwentaryzacji nie jest
nakazem utworzenia repozytorium.

### 3. Najpierw udowodnij repozytoria na SQLite

Dla jednej ograniczonej domeny:

1. zdefiniuj operacje repozytorium zorientowane na zachowanie;
2. zaadaptuj bieżące zapytania SQLite za tym repozytorium;
3. uruchom testy zgodności zachowania i transakcji względem SQLite;
4. zmigruj wywołujących bez zmiany domyślnego runtime;
5. dopiero potem zaimplementuj to samo repozytorium dla zewnętrznego backendu.

### 4. Oddziel przenośny stan control-plane od danych specyficznych dla możliwości

Połączenia providerów, klucze API, combos i konfiguracja routingu są kandydatami na pierwszy
przenośny plaster, z zastrzeżeniem zatwierdzenia przez maintainerów i przeglądu ownership tabel. Wyszukiwanie wektorowe memory,
backup/odzyskiwanie plików SQLite oraz optymalizacja bazy danych to słabe pierwsze plastry, ponieważ ich zachowanie
jest celowo specyficzne dla SQLite.

### 5. Traktuj usage, quota, affinity i audit jako późniejszy plaster koordynacji

Te domeny mają semantykę współbieżności i wolumenu wykraczającą poza CRUD. Ich kontrakty repozytoriów powinny
być projektowane razem z testami transakcji multi-replica, lease, retencji i trybów awarii, a nie
kopiowane mechanicznie z bieżącego SQL.

## Czego ta inwentaryzacja nie rozstrzyga

Ta inwentaryzacja nie:

- zatwierdza wsparcia PostgreSQL ani MySQL;
- definiuje interfejsów TypeScript repozytoriów;
- wybiera pierwszej tabeli ani domeny do migracji;
- twierdzi, że każde dopasowanie leksykalne jest defektem;
- twierdzi, że obecne granice modułów są nieskuteczne;
- zmienia SQLite, migracji, backupu, wyszukiwania ani zachowania runtime.

Jej celem jest uczynienie kolejnej dyskusji projektowej opartej na dowodach i odtwarzalnej.
