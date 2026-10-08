# Log export (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Průběžný, inkrementální export protokolů volání OmniRoute do externího analytického úložiště.

Karta Logs na řídicím panelu uchovává historii požadavků v SQLite (`call_logs`), jejíž velikost je omezená
rotací a dobou uchování. Export protokolů odesílá podle plánu stejnou sadu záznamů, aby přetrvala
déle než lokální databáze a bylo možné ji propojovat s dalšími daty. Prvním cílem je BigQuery;
pipeline používá registr, takže další cíle lze snadno přidávat.

---

## 1. Jak to funguje

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (sada polí karty Logs)
      → klient cíle.send(dávka)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Plán** — jedna cron úloha `JobRegistry`, `log_export`, ve výchozím nastavení `0 * * * *` (každou hodinu,
  UTC). Registrována v `src/lib/initCloudSync.ts`; lze přepsat pomocí `OMNIROUTE_LOG_EXPORT_CRON`.
  Každé spuštění postupně zpracuje všechny **povolené** cíle.
- **Kurzor** — implicitní `call_logs.rowid` SQLite, uchovávaný pro každý cíl v
  `log_export_destinations.cursor_row_id`. `timestamp` záměrně neslouží jako kurzor: volající
  mohou zadat vlastní hodnotu, takže pomalý požadavek může být zapsán až po rychlejším požadavku, který byl zahájen
  později, a kurzor založený na časovém razítku by jej přeskočil.
- **Dávkování** — `batch_size` řádků na požadavek (výchozí hodnota 500), `max_rows_per_run` řádků na jedno spuštění
  (výchozí hodnota 10000), aby se velký objem nevyřízených dat zpracoval během několika spuštění namísto blokování jediného.
- **Doručení** — kurzor se posune pouze po dokončení `send()`. Neúspěšná dávka ponechá
  kurzor na původním místě, takže stejné řádky budou při dalším spuštění odeslány znovu. Zárukou je
  alespoň jedno doručení společně s deduplikací na straně cíle, nikoli skutečné právě jedno doručení: BigQuery identifikuje každý
  řádek podle ID protokolu volání, které v rámci svého vlastního deduplikačního okna zohledňuje podle principu maximálního úsilí.
- **Ochrana proti překryvu** — cron spuštění a `POST .../run` mohou proběhnout současně. Cíl,
  který se již zpracovává, je přeskočen, aby nebyl zpracován dvakrát (`skipped: true` ve výsledku spuštění),
  takže souběžné spuštění nemůže dávku znovu odeslat ani posunout kurzor zpět.
- **Obnova po vyčištění** — pokud se `cursor_row_id` dostane nad `MAX(rowid)` (celá tabulka byla
  vyčištěna a číslování ID řádků začalo znovu), prováděcí proces vrátí kurzor na 0, aby natrvalo nepřestal zaznamenávat nové řádky.

### Datové obsahy (prompty a dokončení)

Ve výchozím nastavení export obsahuje pouze souhrnná pole zobrazená v **seznamu** karty Logs. Zapnutím možnosti
**Exportovat prompty a odpovědi** (`includeBodies`) se navíc odešle obsah, který panel **podrobností**
karty Logs zobrazuje pro každé volání:

| Pole                             | Co obsahuje                                               |
| -------------------------------- | --------------------------------------------------------- |
| `request_body` / `response_body` | Datové obsahy volání tak, jak je vykresluje řídicí panel  |
| `pipeline_route_decision`        | Který cíl a model směrovač vybral                         |
| `pipeline_client_request`        | Nezpracovaný požadavek přesně tak, jak jej klient odeslal |
| `pipeline_openai_request`        | Po převodu do interního formátu OpenAI                    |
| `pipeline_provider_request`      | Skutečně odeslaný upstreamu, v dialektu poskytovatele     |
| `pipeline_provider_response`     | Nezpracovaná odpověď upstreamu                            |
| `pipeline_client_response`       | Obsah předaný zpět volajícímu                             |
| `pipeline_error`                 | Podrobnosti o chybě pipeline při neúspěšném volání        |
| `bodies_truncated`               | Pravda, pokud některé pole výše dosáhlo `maxBodyBytes`    |

Jde o obsah promptů, takže je tato možnost **ve výchozím nastavení vypnutá** a záměrně se volí pro každý cíl zvlášť.
Odesílá se to, co zobrazuje řídicí panel, protože obě části čtou prostřednictvím `getCallLogById`: datové obsahy jsou
již při zápisu sanitizovány od osobních údajů a jsou z nich odstraněna tajemství. Volání provedené pomocí
API klíče s `noLog` navíc neukládá žádný datový obsah, takže není co exportovat.

Datové obsahy se pro každý řádek načítají z artefaktu v souborovém systému, takže hydratace probíhá pouze pro cíle,
které ji požadují. Řádek, jehož artefakt chybí nebo je poškozený, exportuje svůj souhrn s hodnotami null
v datových obsazích namísto selhání dávky a zablokování kurzoru.

`maxBodyBytes` (výchozí hodnota 262144) omezuje velikost každého pole. Delší datové obsahy jsou **zkráceny, nikoli
zahozeny** — zkrácený prompt stále odpovídá na otázku „co bylo požadováno“ — a řádek je označen pomocí
`bodies_truncated`. Dílčí rozdíly streamované po jednotlivých blocích se neexportují; sestavená odpověď se
již nachází v `pipeline_provider_response` a `pipeline_client_response`.

---

## 2. Soubory

| Součást                   | Umístění                                     |
| ------------------------- | -------------------------------------------- |
| Kontrakt cíle             | `src/lib/logExport/types.ts`                 |
| Registr                   | `src/lib/logExport/registry.ts`              |
| Zpracování tajných údajů  | `src/lib/logExport/secrets.ts`               |
| Spouštěč (smyčka kurzoru) | `src/lib/logExport/runner.ts`                |
| Projekce API              | `src/lib/logExport/presenter.ts`             |
| Cíl BigQuery              | `src/lib/logExport/destinations/bigquery.ts` |
| Ověřování Google SA       | `src/lib/logExport/googleServiceAccount.ts`  |
| Zdroj protokolu volání    | `src/lib/usage/callLogExportSource.ts`       |
| Perzistence               | `src/lib/db/logExportDestinations.ts`        |
| Úloha cron                | `src/lib/jobs/logExportJob.ts`               |
| Vrstva REST               | `src/app/api/log-export/`                    |
| Stránka řídicího panelu   | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Všechny trasy vyžadují ověření pro správu (`requireManagementAuth`). Tajné údaje se nikdy nevracejí:
uložený tajný údaj se vrátí jako doslovná hodnota `__stored__` a odeslání této hodnoty zpět při aktualizaci
zachová uložené přihlašovací údaje.

Vytvoření nebo aktualizace cíle, jehož typ deklaruje tajný údaj, **vyžaduje
`STORAGE_ENCRYPTION_KEY`**. Bez něj je `encrypt()` tichým průchodem beze změny, takže zápis
je odmítnut stavem 400, místo aby byly přihlašovací údaje uloženy v SQLite jako prostý text (stejnou ochranu
používá webhook Telegramu).

| Metoda   | Cesta                                    | Účel                                                           |
| -------- | ---------------------------------------- | -------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy cílů + seznam jejich konfiguračních polí                  |
| `GET`    | `/api/log-export/destinations`           | Výpis cílů (tajné údaje jsou skryté)                           |
| `POST`   | `/api/log-export/destinations`           | Vytvoření cíle                                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | Načtení jednoho cíle                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizace názvu / povolení / konfigurace / dávkování         |
| `DELETE` | `/api/log-export/destinations/{id}`      | Odstranění                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Ověření přihlašovacích údajů bez zápisu                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Okamžité vyprázdnění, stejnou cestou jako naplánované spuštění |
| `GET`    | `/api/log-export/status`                 | Stav cronu, nedávná spuštění, nevyřízené položky podle cíle    |

Právě `GET /api/log-export/types` umožňuje, aby bylo uživatelské rozhraní obecné: formulář řídicího panelu se vykresluje
z vrácených deskriptorů polí, takže nový cíl nevyžaduje žádnou změnu uživatelského rozhraní.

---

## 4. Cíl BigQuery

Konfigurační klíče (`type: "bigquery"`):

| Klíč                 | Poznámky                                                                     |
| -------------------- | ---------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP obsahující datovou sadu                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                              |
| `tableId`            | `[A-Za-z0-9_]+`                                                              |
| `location`           | Používá se pouze v případě, že je nutné vytvořit datovou sadu (výchozí `EU`) |
| `serviceAccountJson` | Klíč účtu služby. Tajný údaj: v úložišti šifrovaný, nikdy se nevrací         |
| `autoCreate`         | Vytvoří datovou sadu a tabulku při prvním exportu (výchozí `true`)           |

Účet služby potřebuje oprávnění `bigquery.tables.updateData` k cílové tabulce a navíc
`bigquery.datasets.create` / `bigquery.tables.create`, pokud je zapnuto `autoCreate`.

Nakonfigurovaná dávka je jednotkou **kurzoru**, nikoli HTTP: `send()` ji rozděluje do volání insertAll
po nejvýše 500 řádcích, takže velká hodnota `batch_size` nemůže překročit limit požadavku BigQuery 10 MB.
Přechodné stavové kódy (408/429/500/502/503/504) se opakují až třikrát s exponenciálním
prodlužováním prodlevy a opětovným použitím stejných insertIds; chyby ověřování a schématu vyvolají výjimku už při prvním pokusu,
místo aby se zbytečně spotřebovával běh.

Tabulka vytvořená před několika okamžiky ještě není viditelná pro streamovací koncový bod, který několik sekund
vrací 404. Tento stav 404 se opakuje, ale **pouze pokud tabulku vytvořil tento běh** —
skutečně chybějící tabulka stále selže okamžitě. Upozorňujeme, že opětovné vytvoření tabulky pod názvem,
který byl nedávno odstraněn, způsobí, že BigQuery několik minut odmítá streamované vkládání; jde o
vlastnost odstranění a následného opětovného vytvoření, proto namísto odstranění a opětovného přidání tabulky raději použijte nový název.

**Částečné selhání přichází jako HTTP 200 s neprázdným `insertErrors[]`.** Považuje se za
selhání a vyvolá výjimku, což zabrání posunu kurzoru za řádky, které BigQuery nikdy
nepřijal; toto chování ukotvuje `tests/unit/log-export-bigquery.test.ts`.

Přenos probíhá přes prosté REST — vlastnoručně podepsané tvrzení RS256 se vymění za přístupový token na
`https://oauth2.googleapis.com/token`, poté se řádky odesílají do `tabledata.insertAll`. Žádná sada Google SDK
se nezahrnuje. Přístupové tokeny se ukládají do mezipaměti v rámci procesu pro každou dvojici (účet služby, rozsah).

Vytvořená tabulka obsahuje jeden sloupec pro každé pole na kartě Protokoly a navíc `exported_at`; její rozložení odpovídá
tomu, jakým způsobem se protokoly volání skutečně dotazují:

- **Rozdělení po dnech podle `timestamp`**, takže dotaz omezený datem prohledá pouze příslušné dny.
- **Shlukování podle `api_key_name`, `provider`, `model`, `status`** (v tomto pořadí), takže filtrování podle
  toho, kdo volání spustil, kam bylo odesláno nebo zda selhalo, omezí bloky uvnitř každého oddílu. BigQuery
  umožňuje nejvýše čtyři sloupce shlukování a na pořadí záleží: samotný filtr podle `api_key_name`
  bloky omezí, samotný filtr podle `status` nikoli.
- **Volitelná doba uchování oddílů** prostřednictvím `partitionExpirationDays` (0 zachová vše), která se použije
  při vytvoření tabulky.

Obě nastavení se použijí při vytváření. Existující tabulka si zachová své aktuální rozvržení, takže
pokud je chcete použít, nastavte jako cíl nové ID tabulky.

`tests/unit/log-export-bigquery.test.ts` ověřuje, že mapování a schéma tabulky zůstávají
synchronizované, takže nový sloupec protokolu volání nelze při exportu bez upozornění vynechat.

Dávky se rozdělují podle **počtu řádků** i velikosti serializovaných dat v bajtech. Samotný počet řádků nestačí,
jakmile se exportují datové části: 500 řádků obsahujících prompty může mít desítky megabajtů a insertAll
odmítne požadavek větší než 10 MB. Bloky se uzavírají při dosažení 500 řádků nebo 9 MB, podle toho, co nastane dříve.

---

## 5. Přidání cíle

1. Vytvořte `src/lib/logExport/destinations/<name>.ts`, který exportuje `LogExportDestinationType`:
   Zod `configSchema`, pole deskriptorů `fields` pro uživatelské rozhraní, `secretFields` a
   `createClient(config)` vracející `test()` / `prepare()` / `send(records)`.
2. Přidejte jej do pole `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napište testy v `tests/unit/`.

To je celá změna: perzistence, úloha cron, vrstva REST, šifrování tajných údajů i formulář
řídicího panelu načítají registr.

Pro nový cíl platí dvě pravidla:

- `send()` **musí vyvolat výjimku** při částečném selhání. Úspěšné dokončení znamená, že „cíl tyto řádky obsahuje“,
  a kurzor se za ně trvale posune.
- Cíl, který přijímá adresu URL zadanou uživatelem, ji musí před načtením ověřit pomocí
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  stejně jako webhooky. BigQuery to nepotřebuje: jeho hostitelé jsou konstantní.

---

## 6. Provoz

- **Řídicí panel**: Integrace → Export protokolů. Přidejte cíl, spusťte **Test** pro kontrolu přihlašovacích údajů
  bez zápisu řádků a poté jej povolte.
- **Nevyřízené záznamy**: každá karta cíle zobrazuje počet čekajících řádků a kurzor; `GET
/api/log-export/status` vrací stejné údaje spolu s posledními 20 spuštěními úlohy.
- **Selhání jednoho cíle nezpůsobí selhání ostatních** — souhrn spuštění zaznamenává stav jednotlivých cílů
  v `last_status` / `last_error` a historie spuštění úloh uchovává souhrnný výsledek.
- **Odstraněním cíle se odstraní i jeho kurzor.** Jeho opětovné přidání začne od nejstaršího uchovaného
  protokolu volání, čímž se znovu odešlou řádky, které už cíl může obsahovat. V BigQuery může
  `insertId` každého řádku tyto duplicity eliminovat pouze v rámci vlastního časového okna pro deduplikaci, proto je vhodnější
  cíl zakázat než odstranit.
