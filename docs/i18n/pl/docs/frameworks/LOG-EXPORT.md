# Log export (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Ciągły, przyrostowy eksport dzienników wywołań OmniRoute do zewnętrznego magazynu analitycznego.

Karta panelu Dzienniki przechowuje historię żądań w SQLite (`call_logs`), której rozmiar jest ograniczony przez
rotację i retencję. Eksport dzienników wysyła ten sam zestaw rekordów zgodnie z harmonogramem, dzięki czemu mogą one być przechowywane
dłużej niż w lokalnej bazie danych i łączone z innymi danymi. BigQuery jest pierwszym miejscem docelowym;
potok korzysta z rejestru, więc można do niego dodawać kolejne miejsca docelowe.

---

## 1. Jak to działa

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (zestaw pól karty Dzienniki)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Harmonogram** — jedno zadanie cron `JobRegistry`, `log_export`, domyślnie `0 * * * *` (co godzinę,
  UTC). Rejestrowane w `src/lib/initCloudSync.ts`; można je nadpisać za pomocą `OMNIROUTE_LOG_EXPORT_CRON`.
  Każde uruchomienie opróżnia kolejno wszystkie **włączone** miejsca docelowe.
- **Kursor** — niejawne `call_logs.rowid` SQLite, utrwalane osobno dla każdego miejsca docelowego w
  `log_export_destinations.cursor_row_id`. `timestamp` celowo nie jest kursorem: wywołujący
  mogą podawać własną wartość, więc wolne żądanie może zostać zapisane po szybszym, które rozpoczęło się
  później, a kursor oparty na znaczniku czasu pominąłby je.
- **Przetwarzanie wsadowe** — `batch_size` wierszy na żądanie (domyślnie 500), `max_rows_per_run` wierszy na uruchomienie
  (domyślnie 10000), dzięki czemu duża zaległość jest opróżniana w ciągu kilku uruchomień zamiast blokować jedno z nich.
- **Dostarczanie** — kursor przesuwa się dopiero po zakończeniu `send()`. Nieudane wysłanie partii pozostawia
  kursor w dotychczasowym miejscu, więc te same wiersze są ponawiane przy następnym uruchomieniu. Gwarancją jest
  co najmniej jednokrotne dostarczenie wraz z deduplikacją po stronie miejsca docelowego, a nie rzeczywiste dokładnie jednokrotne dostarczenie: BigQuery identyfikuje każdy
  wiersz za pomocą identyfikatora dziennika wywołania, który respektuje w miarę możliwości w ramach własnego okna deduplikacji.
- **Ochrona przed nakładaniem się uruchomień** — wywołanie cron i `POST .../run` mogą nastąpić jednocześnie. Miejsce docelowe,
  które jest już opróżniane, zostaje pominięte zamiast ponownie opróżnione (`skipped: true` w wyniku uruchomienia),
  dzięki czemu równoległe uruchomienie nie może ponownie wysłać partii ani cofnąć kursora.
- **Odzyskiwanie po czyszczeniu** — jeśli `cursor_row_id` znajdzie się powyżej `MAX(rowid)` (cała tabela została
  wyczyszczona, a identyfikatory wierszy zaczęły się od nowa), mechanizm wykonujący zadanie cofa kursor do 0, zamiast trwale przestać wykrywać nowe dane.

### Ładunki (prompty i uzupełnienia)

Domyślnie eksport obejmuje tylko pola podsumowania wyświetlane na **liście** Dzienników. Włączenie opcji
**Eksportuj prompty i odpowiedzi** (`includeBodies`) dodatkowo wysyła dane wyświetlane w panelu **szczegółów**
Dzienników dla każdego wywołania:

| Pole                             | Zawartość                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Ładunki wywołania w postaci renderowanej przez panel                                  |
| `pipeline_route_decision`        | Cel i model wybrane przez router                                                      |
| `pipeline_client_request`        | Surowe żądanie dokładnie w postaci wysłanej przez klienta                             |
| `pipeline_openai_request`        | Żądanie po przekształceniu do wewnętrznego formatu OpenAI                             |
| `pipeline_provider_request`      | Żądanie faktycznie wysłane do usługi nadrzędnej, w dialekcie dostawcy                 |
| `pipeline_provider_response`     | Surowa odpowiedź usługi nadrzędnej                                                    |
| `pipeline_client_response`       | Dane zwrócone wywołującemu                                                            |
| `pipeline_error`                 | Szczegóły błędu na poziomie potoku dla nieudanego wywołania                           |
| `bodies_truncated`               | Wartość prawdziwa, jeśli którekolwiek z powyższych pól osiągnęło limit `maxBodyBytes` |

Są to treści promptów, dlatego ta opcja jest **domyślnie wyłączona** i celowo konfigurowana osobno dla każdego miejsca docelowego.
Wysyłane są dane widoczne w panelu, ponieważ oba mechanizmy odczytują je za pomocą `getCallLogById`: ładunki są
już oczyszczone z danych osobowych i zredagowane pod kątem sekretów podczas zapisu, a wywołanie wykonane z kluczem API
`noLog` nie zapisuje żadnego ładunku, więc nie ma czego eksportować.

Ładunki są odczytywane osobno dla każdego wiersza z artefaktu w systemie plików, dlatego uzupełnianie danych jest wykonywane tylko dla miejsc docelowych,
które tego zażądały. Wiersz, którego artefaktu brakuje lub jest on uszkodzony, zostaje wyeksportowany z podsumowaniem i wartościami null
ładunków, zamiast powodować niepowodzenie partii i zablokowanie kursora.

`maxBodyBytes` (domyślnie 262144) ogranicza rozmiar każdego pola. Dłuższe ładunki są **obcinane, a nie
odrzucane** — skrócony prompt nadal odpowiada na pytanie „o co zapytano” — a wiersz jest oznaczany za pomocą
`bodies_truncated`. Fragmenty różnic przesyłane strumieniowo nie są eksportowane; złożona odpowiedź znajduje się już
w `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Pliki

| Element                              | Lokalizacja                                  |
| ------------------------------------ | -------------------------------------------- |
| Kontrakt miejsca docelowego          | `src/lib/logExport/types.ts`                 |
| Rejestr                              | `src/lib/logExport/registry.ts`              |
| Obsługa sekretów                     | `src/lib/logExport/secrets.ts`               |
| Moduł wykonawczy (pętla kursora)     | `src/lib/logExport/runner.ts`                |
| Projekcja API                        | `src/lib/logExport/presenter.ts`             |
| Miejsce docelowe BigQuery            | `src/lib/logExport/destinations/bigquery.ts` |
| Uwierzytelnianie konta usługi Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Źródło rejestru wywołań              | `src/lib/usage/callLogExportSource.ts`       |
| Warstwa trwałości                    | `src/lib/db/logExportDestinations.ts`        |
| Zadanie cron                         | `src/lib/jobs/logExportJob.ts`               |
| Warstwa REST                         | `src/app/api/log-export/`                    |
| Strona panelu                        | `src/app/(dashboard)/dashboard/log-export/`  |

Schemat: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Wszystkie trasy wymagają uwierzytelnienia zarządzającego (`requireManagementAuth`). Sekrety nigdy nie są zwracane:
zapisany sekret jest zwracany jako literał `__stored__`, a przesłanie tej wartości z powrotem podczas aktualizacji
zachowuje zapisane dane uwierzytelniające.

Utworzenie lub aktualizacja miejsca docelowego, którego typ deklaruje sekret, **wymaga
`STORAGE_ENCRYPTION_KEY`**. Bez niego `encrypt()` po cichu przepuszcza dane bez zmian, dlatego zapis
jest odrzucany z kodem 400 zamiast umieszczenia danych uwierzytelniających w SQLite jako zwykłego tekstu (jest to takie samo zabezpieczenie,
jakie stosuje webhook Telegrama).

| Metoda   | Ścieżka                                  | Przeznaczenie                                                                 |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy miejsc docelowych i lista ich pól konfiguracji                           |
| `GET`    | `/api/log-export/destinations`           | Wyświetlenie miejsc docelowych (sekrety ukryte)                               |
| `POST`   | `/api/log-export/destinations`           | Utworzenie miejsca docelowego                                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | Odczyt jednego miejsca docelowego                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizacja nazwy / stanu włączenia / konfiguracji / przetwarzania wsadowego |
| `DELETE` | `/api/log-export/destinations/{id}`      | Usunięcie                                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Sprawdzenie danych uwierzytelniających bez zapisywania                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Natychmiastowe opróżnienie kolejki, tą samą ścieżką co wykonanie zaplanowane  |
| `GET`    | `/api/log-export/status`                 | Stan cron, ostatnie wykonania, zaległości dla każdego celu                    |

`GET /api/log-export/types` sprawia, że interfejs użytkownika jest ogólny: formularz panelu jest renderowany na podstawie
zwróconych deskryptorów pól, dzięki czemu nowe miejsce docelowe nie wymaga zmiany interfejsu użytkownika.

---

## 4. Miejsce docelowe BigQuery

Klucze konfiguracji (`type: "bigquery"`):

| Klucz                | Uwagi                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP zawierający zbiór danych                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Używane tylko wtedy, gdy trzeba utworzyć zbiór danych (domyślnie `EU`)           |
| `serviceAccountJson` | Klucz konta usługi. Sekret: szyfrowany w spoczynku, nigdy niezwracany            |
| `autoCreate`         | Utworzenie zbioru danych i tabeli podczas pierwszego eksportu (domyślnie `true`) |

Konto usługi wymaga uprawnienia `bigquery.tables.updateData` do tabeli docelowej, a także
`bigquery.datasets.create` / `bigquery.tables.create`, gdy `autoCreate` jest włączone.

Skonfigurowana partia jest jednostką **kursora**, a nie HTTP: `send()` dzieli ją na wywołania insertAll
obejmujące maksymalnie 500 wierszy, dzięki czemu duża wartość `batch_size` nie może przekroczyć limitu żądania BigQuery wynoszącego 10 MB.
Przejściowe statusy (408/429/500/502/503/504) są ponawiane maksymalnie trzy razy z wykładniczo rosnącym
opóźnieniem, przy ponownym użyciu tych samych insertIds; błędy uwierzytelniania i schematu powodują wyjątek przy pierwszej próbie,
zamiast zużywać całe wykonanie.

Tabela utworzona przed chwilą nie jest jeszcze widoczna dla punktu końcowego przesyłania strumieniowego, który przez
kilka sekund odpowiada kodem 404. Taka odpowiedź 404 jest ponawiana, ale **tylko wtedy, gdy tabela została utworzona podczas tego wykonania** —
rzeczywiście brakująca tabela nadal powoduje natychmiastowe niepowodzenie. Należy pamiętać, że ponowne utworzenie tabeli pod nazwą, która
została niedawno usunięta, sprawia, że BigQuery przez kilka minut odrzuca strumieniowe wstawianie danych; jest to
właściwość operacji usunięcia i ponownego utworzenia, dlatego zamiast usuwać i ponownie dodawać tabelę, lepiej użyć nowej nazwy.

**Częściowe niepowodzenie przychodzi jako HTTP 200 z niepustą tablicą `insertErrors[]`.** Jest ono traktowane jako
błąd i powoduje wyjątek, co zapobiega przesunięciu kursora poza wiersze, których BigQuery nigdy
nie przyjął; `tests/unit/log-export-bigquery.test.ts` utrwala to zachowanie.

Transport odbywa się przez zwykły REST — samodzielnie podpisana asercja RS256 jest wymieniana na token dostępu pod adresem
`https://oauth2.googleapis.com/token`, a następnie wiersze trafiają do `tabledata.insertAll`. Żaden pakiet SDK Google nie jest
dołączany. Tokeny dostępu są buforowane w ramach procesu dla każdej pary (konto usługi, zakres).

Utworzona tabela zawiera po jednej kolumnie dla każdego pola karty Logs oraz `exported_at` i jest zorganizowana pod kątem
rzeczywistego sposobu wykonywania zapytań do rejestrów wywołań:

- **Partycjonowanie dzienne według `timestamp`**, dzięki czemu zapytanie ograniczone według daty skanuje tylko te dni.
- **Klastrowanie według `api_key_name`, `provider`, `model`, `status`** (w tej kolejności), dzięki czemu filtrowanie według
  tego, kto uruchomił wywołanie, dokąd zostało skierowane lub czy zakończyło się niepowodzeniem, pomija bloki wewnątrz każdej partycji. BigQuery
  dopuszcza maksymalnie cztery kolumny klastrowania, a ich kolejność ma znaczenie: filtr obejmujący wyłącznie `api_key_name`
  umożliwia pomijanie, natomiast filtr obejmujący wyłącznie `status` — nie.
- **Opcjonalny okres przechowywania partycji** za pomocą `partitionExpirationDays` (0 zachowuje wszystko), stosowany
  podczas tworzenia tabeli.

Oba ustawienia są stosowane podczas tworzenia. Istniejąca tabela zachowuje swój dotychczasowy układ, dlatego
jeśli chcesz je zastosować, wskaż jako miejsce docelowe nowy identyfikator tabeli.

`tests/unit/log-export-bigquery.test.ts` sprawdza, czy mapper i schemat tabeli pozostają
zsynchronizowane, dzięki czemu nowa kolumna dziennika wywołań nie może zostać po cichu pominięta podczas eksportu.

Partie są dzielone zarówno według liczby wierszy, jak i liczby bajtów po serializacji. Sama liczba wierszy nie wystarcza,
gdy eksportowane są ładunki: 500 wierszy zawierających prompty może zajmować dziesiątki megabajtów, a insertAll
odrzuca żądania przekraczające 10 MB. Fragmenty są zamykane po osiągnięciu 500 wierszy lub 9 MB — w zależności od tego, co nastąpi wcześniej.

---

## 5. Dodawanie miejsca docelowego

1. Utwórz plik `src/lib/logExport/destinations/<name>.ts` eksportujący typ `LogExportDestinationType`:
   schemat Zod `configSchema`, tablicę deskryptorów `fields` dla interfejsu użytkownika, `secretFields` oraz
   funkcję `createClient(config)` zwracającą `test()` / `prepare()` / `send(records)`.
2. Dodaj go do tablicy `DESTINATIONS` w pliku `src/lib/logExport/registry.ts`.
3. Napisz testy w katalogu `tests/unit/`.

To cała zmiana: mechanizmy trwałego przechowywania, zadanie cron, warstwa REST, szyfrowanie sekretów i
formularz w panelu administracyjnym korzystają z rejestru.

Dwie zasady dotyczące nowego miejsca docelowego:

- `send()` **musi zgłaszać wyjątek** w przypadku częściowego niepowodzenia. Pomyślne zakończenie oznacza „miejsce docelowe zawiera te wiersze”,
  a kursor zostaje trwale przesunięty poza nie.
- Miejsce docelowe przyjmujące adres URL podany przez użytkownika musi przed pobraniem zweryfikować go za pomocą
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  tak samo jak webhooki. BigQuery tego nie wymaga, ponieważ jego hosty są stałe.

---

## 6. Obsługa

- **Panel administracyjny**: Integracje → Eksport logów. Dodaj miejsce docelowe, uruchom **Test**, aby sprawdzić dane uwierzytelniające
  bez zapisywania wierszy, a następnie je włącz.
- **Zaległości**: każda karta miejsca docelowego pokazuje oczekujące wiersze i kursor; `GET
/api/log-export/status` zwraca te same dane oraz informacje o ostatnich 20 uruchomieniach zadania.
- **Awaria jednego miejsca docelowego nie powoduje awarii pozostałych** — podsumowanie uruchomienia zapisuje status każdego miejsca docelowego
  w `last_status` / `last_error`, a historia uruchomień zadania przechowuje dane zbiorcze.
- **Usunięcie miejsca docelowego powoduje usunięcie jego kursora.** Ponowne dodanie rozpoczyna eksport od najstarszego zachowanego
  logu wywołań, co powoduje ponowne wysłanie wierszy, które miejsce docelowe może już zawierać. W BigQuery identyfikator
  `insertId` przypisany do każdego wiersza zapobiega temu jedynie w ramach własnego okna deduplikacji BigQuery, dlatego zamiast usuwać
  miejsce docelowe, lepiej je wyłączyć.
