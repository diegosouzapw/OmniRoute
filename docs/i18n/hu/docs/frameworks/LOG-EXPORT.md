# Log export (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Az OmniRoute hívásnaplóinak folyamatos, inkrementális exportálása egy külső analitikai adattárba.

A Naplók irányítópultlap SQLite-ban (`call_logs`) őrzi a kérések előzményeit, amelyek méretét
a rotáció és a megőrzési idő korlátozza. A naplóexport ugyanazt a rekordkészletet ütemezetten
továbbítja, így az a helyi adatbázisnál hosszabb ideig megőrizhető, és más adatokkal összekapcsolható.
Az első célhely a BigQuery; a folyamatleíró egy regisztrációs jegyzék, így további célhelyek
egyszerűen hozzáadhatók.

---

## 1. Működés

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (a Naplók lap mezőkészlete)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Ütemezés** — egyetlen `JobRegistry` cron-feladat, a `log_export`, amelynek alapértelmezett
  ütemezése `0 * * * *` (óránként, UTC szerint). Regisztrációja a `src/lib/initCloudSync.ts`
  fájlban történik; az `OMNIROUTE_LOG_EXPORT_CRON` használatával felülbírálható. Minden futás
  egymás után kiüríti az összes **engedélyezett** célhelyet.
- **Kurzor** — az SQLite implicit `call_logs.rowid` értéke, célhelyenként tárolva a
  `log_export_destinations.cursor_row_id` mezőben. A `timestamp` szándékosan nem kurzor: a hívók
  saját értéket adhatnak meg, ezért egy lassú kérés később is beírható, mint egy később indult,
  de gyorsabb kérés, és egy időbélyegalapú kurzor kihagyná azt.
- **Kötegelt feldolgozás** — kérésenként `batch_size` sor (alapértelmezés szerint 500),
  futásonként pedig `max_rows_per_run` sor (alapértelmezés szerint 10000), hogy egy nagy
  lemaradás több futás alatt kerüljön feldolgozásra, ahelyett hogy egyetlen futást blokkolna.
- **Kézbesítés** — a kurzor csak a `send()` sikeres befejeződése után lép tovább. Sikertelen
  köteg esetén a kurzor változatlan marad, így a következő futás ugyanazokkal a sorokkal próbálkozik
  újra. A garancia legalább egyszeri kézbesítés és célhelyoldali deduplikáció, nem valódi pontosan
  egyszeri kézbesítés: a BigQuery minden sort a hívásnapló azonosítójával kulcsol, amelyet a saját
  deduplikációs időablakán belül a lehetőségekhez mérten vesz figyelembe.
- **Átfedés elleni védelem** — a cron-futás és a `POST .../run` egyszerre is elindulhat. A rendszer
  kihagyja a már feldolgozás alatt álló célhelyet, ahelyett hogy kétszer ürítené ki (`skipped: true`
  a futás eredményében), így egy párhuzamos futás nem küldhet el újra egy köteget, és nem írhatja
  visszafelé a kurzort.
- **Helyreállítás törlés után** — ha a `cursor_row_id` értéke a `MAX(rowid)` fölé kerül (a teljes
  táblát törölték, és a sorazonosítók újraindultak), a futtató 0-ra állítja vissza a kurzort,
  ahelyett hogy végleg elveszítené a sorok nyomon követését.

### Hasznos adatok (promptok és válaszok)

Alapértelmezés szerint az export csak azokat az összegző mezőket tartalmazza, amelyeket a Naplók
**listája** megjelenít. A **Promptok és válaszok exportálása** (`includeBodies`) bekapcsolásával
hívásonként azok az adatok is továbbításra kerülnek, amelyeket a Naplók **részletező** panelje mutat:

| Mező                             | Tartalma                                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| `request_body` / `response_body` | A hívás hasznos adatai az irányítópulton megjelenő formában               |
| `pipeline_route_decision`        | A router által kiválasztott cél és modell                                 |
| `pipeline_client_request`        | A nyers kérés, pontosan úgy, ahogy az ügyfél elküldte                     |
| `pipeline_openai_request`        | A belső OpenAI-formátumra történő átalakítás után                         |
| `pipeline_provider_request`      | A szolgáltató dialektusában, ténylegesen upstream irányba elküldött kérés |
| `pipeline_provider_response`     | A nyers upstream válasz                                                   |
| `pipeline_client_response`       | A hívónak visszaadott tartalom                                            |
| `pipeline_error`                 | Folyamatszintű hibarészletek sikertelen hívás esetén                      |
| `bodies_truncated`               | Igaz, ha bármelyik fenti mező elérte a `maxBodyBytes` korlátot            |

Ez prompttartalom, ezért **alapértelmezés szerint ki van kapcsolva**, és szándékosan célhelyenként
választható beállítás. Az kerül továbbításra, amit az irányítópult megjelenít, mivel mindkettő a
`getCallLogById` használatával olvas: a hasznos adatokban található PII-adatok már anonimizálva,
a titkos értékek pedig kitakarva kerülnek tárolásra, és egy `noLog` API-kulccsal indított hívás
egyáltalán nem tárol hasznos adatot, így nincs mit exportálni.

A hasznos adatok soronként kerülnek beolvasásra a fájlrendszerbeli melléktermékből, ezért a
kiegészítés csak az azt kérő célhelyeknél fut le. Az a sor, amelynek mellékterméke hiányzik vagy
sérült, null értékű hasznos adatokkal exportálja az összegzést, ahelyett hogy meghiúsítaná a
köteget és megakasztaná a kurzort.

A `maxBodyBytes` (alapértelmezés szerint 262144) mezőnként szab korlátot. A hosszabb hasznos
adatok **csonkolásra kerülnek, nem pedig eldobásra** — egy levágott prompt továbbra is megválaszolja,
hogy „mi volt a kérés” —, a sor pedig megkapja a `bodies_truncated` jelölést. A darabonként
streamelt változáskülönbségek nem kerülnek exportálásra; az összeállított válasz már megtalálható
a `pipeline_provider_response` és a `pipeline_client_response` mezőben.

---

## 2. Fájlok

| Elem                  | Hely                                         |
| --------------------- | -------------------------------------------- |
| Célhely szerződése    | `src/lib/logExport/types.ts`                 |
| Regiszter             | `src/lib/logExport/registry.ts`              |
| Titokkezelés          | `src/lib/logExport/secrets.ts`               |
| Futtató (kurzorhurok) | `src/lib/logExport/runner.ts`                |
| API-leképezés         | `src/lib/logExport/presenter.ts`             |
| BigQuery-célhely      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-hitelesítés | `src/lib/logExport/googleServiceAccount.ts`  |
| Hívásnapló-forrás     | `src/lib/usage/callLogExportSource.ts`       |
| Perzisztencia         | `src/lib/db/logExportDestinations.ts`        |
| Cron-feladat          | `src/lib/jobs/logExportJob.ts`               |
| REST-réteg            | `src/app/api/log-export/`                    |
| Irányítópult oldala   | `src/app/(dashboard)/dashboard/log-export/`  |

Séma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Minden útvonal kezelői hitelesítést használ (`requireManagementAuth`). A titkos értékek soha nem kerülnek visszaadásra:
a tárolt titkos érték helyett a literális `__stored__` érték érkezik vissza, és ha frissítéskor ezt az értéket küldik vissza,
a tárolt hitelesítési adat változatlan marad.

Olyan célhely létrehozásához vagy frissítéséhez, amelynek típusa titkos értéket deklarál, **szükséges a
`STORAGE_ENCRYPTION_KEY`**. Enélkül az `encrypt()` észrevétlenül változtatás nélkül továbbítja az értéket, ezért az írás
400-as hibával elutasításra kerül, ahelyett hogy a hitelesítési adat egyszerű szövegként kerülne az SQLite-ba (ugyanezt a védelmet
alkalmazza a Telegram-webhook is).

| Metódus  | Útvonal                                  | Cél                                                          |
| -------- | ---------------------------------------- | ------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Célhelytípusok és konfigurációs mezőik listája               |
| `GET`    | `/api/log-export/destinations`           | Célhelyek listázása (titkok kitakarva)                       |
| `POST`   | `/api/log-export/destinations`           | Célhely létrehozása                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | Egy célhely lekérése                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | Név / engedélyezés / konfiguráció / kötegelés frissítése     |
| `DELETE` | `/api/log-export/destinations/{id}`      | Törlés                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Hitelesítési adatok ellenőrzése írás nélkül                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Azonnali kiürítés, az ütemezett futtatással azonos útvonalon |
| `GET`    | `/api/log-export/status`                 | Cron-állapot, legutóbbi futtatások, célhelyenkénti hátralék  |

A `GET /api/log-export/types` teszi általánossá a felhasználói felületet: az irányítópult űrlapja
a visszaadott mezőleírókból épül fel, így egy új célhelyhez nincs szükség felhasználóifelület-módosításra.

---

## 4. BigQuery-célhely

Konfigurációs kulcsok (`type: "bigquery"`):

| Kulcs                | Megjegyzések                                                                          |
| -------------------- | ------------------------------------------------------------------------------------- |
| `projectId`          | Az adatkészletet tartalmazó GCP-projekt                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                       |
| `tableId`            | `[A-Za-z0-9_]+`                                                                       |
| `location`           | Csak akkor használatos, ha az adatkészletet létre kell hozni (alapértelmezett: `EU`)  |
| `serviceAccountJson` | Szolgáltatásfiók kulcsa. Titkos: tároláskor titkosított, soha nem kerül visszaadásra  |
| `autoCreate`         | Az adatkészlet és a tábla létrehozása az első exportáláskor (alapértelmezett: `true`) |

A szolgáltatásfióknak `bigquery.tables.updateData` jogosultságra van szüksége a céltáblán, továbbá
`bigquery.datasets.create` / `bigquery.tables.create` jogosultságokra, ha az `autoCreate` be van kapcsolva.

A beállított köteg **kurzor**egység, nem HTTP-egység: a `send()` legfeljebb 500 soros insertAll-hívásokra
bontja, így egy nagy `batch_size` sem lépheti túl a BigQuery 10 MB-os kérési korlátját.
Az átmeneti állapotok (408/429/500/502/503/504) legfeljebb háromszor kerülnek újrapróbálásra exponenciális
visszalépéssel, ugyanazon insertIds értékek újrafelhasználásával; a hitelesítési és sémahibák már az első próbálkozáskor kivételt
váltanak ki, ahelyett hogy feleslegesen felhasználnák a futtatást.

Az alig néhány pillanattal korábban létrehozott tábla még nem látható a streamelési végpont számára, amely
néhány másodpercig 404-es választ ad. Ez a 404-es hiba újrapróbálásra kerül, de **csak akkor, ha ezt a futtatást a tábla hozta létre** —
egy valóban hiányzó tábla esetén a művelet továbbra is azonnal meghiúsul. Fontos, hogy egy nemrég törölt tábla nevével
új tábla létrehozásakor a BigQuery több percig elutasítja a streamelt beszúrásokat; ez
a törlés, majd újbóli létrehozás sajátossága, ezért a tábla eldobása és újbóli hozzáadása helyett célszerű új táblanevet használni.

**A részleges hiba HTTP 200-as válaszként, nem üres `insertErrors[]` tömbbel érkezik.** Ez hibának minősül,
és kivételt vált ki, ami megakadályozza, hogy a kurzor túllépjen azokon a sorokon, amelyeket a BigQuery nem
fogadott el; ezt a viselkedést a `tests/unit/log-export-bigquery.test.ts` rögzíti.

Az átvitel egyszerű REST-en keresztül történik — egy saját aláírású RS256-állítás hozzáférési tokenre cserélődik a
`https://oauth2.googleapis.com/token` címen, majd a sorok a `tabledata.insertAll` végpontra kerülnek. Google SDK
nincs bevonva. A hozzáférési tokenek folyamaton belül, (szolgáltatásfiók, hatókör) páronként gyorsítótárazódnak.

A létrehozott tábla a Naplók lap minden mezőjéhez egy-egy oszlopot, valamint egy `exported_at` oszlopot tartalmaz, és
a hívásnaplók tényleges lekérdezési módjához igazodik:

- **Nap szerint particionált a `timestamp` alapján**, így egy dátummal behatárolt lekérdezés csak az adott napokat vizsgálja.
- **Az `api_key_name`, `provider`, `model`, `status` szerint klaszterezett** (ebben a sorrendben), így annak szűrése, hogy
  ki futtatta, hová irányult, illetve sikertelen volt-e, az egyes partíciókon belüli blokkokat szűkíti. A BigQuery
  legfeljebb négy klaszterezési oszlopot engedélyez, és a sorrend számít: az önmagában alkalmazott `api_key_name` szűrő
  szűkíti a vizsgált blokkokat, az önmagában alkalmazott `status` szűrő viszont nem.
- **Opcionális partíciómegőrzés** a `partitionExpirationDays` segítségével (a 0 mindent megőriz), amely
  a tábla létrehozásakor kerül alkalmazásra.

Mindkét beállítás a létrehozáskor lép érvénybe. Egy meglévő tábla megtartja a már meglévő elrendezését, ezért
ha alkalmazni szeretné ezeket a beállításokat, a célként egy új táblaazonosítót adjon meg.

A `tests/unit/log-export-bigquery.test.ts` ellenőrzi, hogy a leképező és a táblaséma összhangban
maradjon, így egy új hívásnapló-oszlop nem maradhat ki észrevétlenül az exportálás során.

A kötegek darabolása **mind** a sorok száma, **mind** a szerializált méret alapján történik. A hasznos adatok
exportálásakor önmagában a sorok száma nem elegendő: 500, promptokat tartalmazó sor mérete több tíz megabájt is
lehet, az insertAll pedig elutasítja a 10 MB-nál nagyobb kéréseket. Egy darab 500 sornál vagy 9 MB-nál zárul le,
attól függően, hogy melyik határt éri el előbb.

---

## 5. Cél hozzáadása

1. Hozza létre a `src/lib/logExport/destinations/<name>.ts` fájlt, amely egy `LogExportDestinationType` típust exportál:
   egy Zod `configSchema` sémát, egy felhasználói felülethez tartozó `fields` leírótömböt, `secretFields` mezőket, valamint egy
   `createClient(config)` függvényt, amely `test()` / `prepare()` / `send(records)` metódusokat ad vissza.
2. Adja hozzá a `DESTINATIONS` tömbhöz a `src/lib/logExport/registry.ts` fájlban.
3. Írjon teszteket a `tests/unit/` könyvtárban.

Ez a teljes módosítás: az adatmegőrzés, a cron-feladat, a REST-réteg, a titkos adatok titkosítása és az
irányítópult űrlapja egyaránt a regisztert használja.

Két szabály vonatkozik az új célokra:

- A `send()` függvénynek részleges hiba esetén **kivételt kell dobnia**. A sikeres visszatérés azt jelenti, hogy „a cél rendelkezik ezekkel a sorokkal”,
  és a kurzor véglegesen túllép rajtuk.
- A felhasználó által megadott URL-t fogadó célnak a lekérés előtt a
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) segítségével kell ellenőriznie azt,
  ugyanúgy, ahogy a webhookok teszik. A BigQuery esetében erre nincs szükség: a gazdagépnevei állandók.

---

## 6. Üzemeltetés

- **Irányítópult**: Integrációk → Naplóexportálás. Adjon hozzá egy célt, a hitelesítő adatok sorok írása nélküli
  ellenőrzéséhez futtassa a **Teszt** műveletet, majd engedélyezze a célt.
- **Feldolgozási hátralék**: minden cél kártyája megjeleníti a függőben lévő sorokat és a kurzort; a `GET
/api/log-export/status` ugyanezeket az adatokat adja vissza az utolsó 20 feladatfuttatással együtt.
- **Egy cél hibája nem okozza a többi cél hibáját** — a futtatási összesítés célonként rögzíti az
  állapotot a `last_status` / `last_error` mezőkben, a feladatfuttatások előzményei pedig megőrzik az összesített eredményt.
- **Egy cél törlése annak kurzorát is törli.** Az újbóli hozzáadás a legrégebbi megőrzött
  hívásnaplótól indul, így ismét elküldi azokat a sorokat, amelyekkel a cél esetleg már rendelkezik. A BigQuery esetében a soronkénti
  `insertId` ezt csak a BigQuery saját deduplikációs időablakán belül kezeli, ezért a cél törlése helyett inkább annak letiltását
  részesítse előnyben.
