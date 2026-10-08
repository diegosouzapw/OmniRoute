# RTK Compression (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Az RTK-tömörítés az OmniRoute parancsérzékeny tömörítőmotorja terminál- és eszközkimenetekhez. Olyan kódolásiügynök-munkamenetekhez készült, amelyekben a kontextus növekedésének legnagyobb részét tesztnaplók, buildkimenetek, csomagkezelői zaj, shell-átiratok, Docker-kimenetek, git-kimenetek és veremkövetések okozzák.

Az RTK közvetlenül futtatható a `defaultMode: "rtk"` beállítással, vagy egy egymásra épülő feldolgozási folyamat első lépéseként, általában így:

```txt
rtk -> caveman
```

Ez a sorrend először a zajos gépi kimenetet tömöríti, majd lehetővé teszi, hogy a Caveman tömörítse a fennmaradó prózai szöveget.

Az upstream RTK `60-90%`-os megtakarításról számol be a parancskimeneteknél. A README mintamunkamenete
`~118,000` szabványos tokenről `~23,900` RTK-tokenre csökken, ami `79.7%`-os megtakarítás (`~80%`). Az OmniRoute
ezt az upstream átlagot használja a Caveman bemeneti tömörítésével kombinált megtakarítás kiszámításához:

```txt
RTK-átlag:       80% megtakarítás
Caveman-bemenet: 46% megtakarítás
Kombinált:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% megtakarítás
Tartomány:       1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Mit tömörít?

A beépített katalógus jelenleg 49 szűrőt tartalmaz a következő kategóriákban:

| Kategória | Példák                                                            |
| --------- | ----------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                 |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-tesztek, Cargo-tesztek       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx     |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler     |
| `shell`   | `ls`, `find`, `grep`, általános shellnaplók                       |
| `docker`  | `docker ps`, Docker-naplók                                        |
| `infra`   | Terraform, OpenTofu, `systemctl status`                           |
| `generic` | JSON-kimenet, veremkövetések, általános kimeneti tartalékmegoldás |

Az `open-sse/services/compression/engines/rtk/commandDetector.ts` fájlban található érzékelő a szűrő kiválasztása előtt osztályozza a kimenetet. A szűrők parancsminta vagy kimeneti reguláris kifejezés alapján is illeszkedhetnek, ha egy parancsosztály önmagában nem elegendő.

## Szűrőfeloldás

Az RTK a következő sorrendben tölti be a szűrőket:

1. Projektszűrők a `.rtk/filters.toml` és `.rtk/filters.json` fájlokból, kizárólag megbízhatóként való megjelölés esetén.
2. Globális szűrők a `DATA_DIR/rtk/filters.toml` és `DATA_DIR/rtk/filters.json` fájlokból.
3. Beépített szűrők az `open-sse/services/compression/engines/rtk/filters/` könyvtárból.

Ugyanazon hatókörön belül az RTK TOML schema v1 szűrői elsőbbséget élveznek az OmniRoute JSON-szűrőivel szemben. A TOML
`match_command` kifejezéseinek ellenőrzése a parancstípus szerinti illesztés előtt történik, így egy importált, parancsspecifikus
szűrő felülírhat egy tágabb szűrőt az adott hatókörben. A projekthatókör a fájlformátumtól függetlenül továbbra is elsőbbséget
élvez a globális hatókörrel szemben.

A projektszűrők szándékosan bizalmi ellenőrzéshez kötöttek, mivel a reguláris kifejezéseket használó szűrők megváltoztathatják, hogyan jelenik meg az eszközkimenet
az ügynökök számára. A projektszűrő-fájl akkor kerül elfogadásra, ha a következők egyike teljesül:

- Az `rtkConfig.trustProjectFilters` értéke `true`.
- Az `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` be van állítva.
- A `.rtk/trust.json` tartalmazza a projektszűrő-fájl megfelelő SHA-256-kivonatát.

Példa bizalmi fájlra:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

A kivonatok elkülönülnek: a `filtersSha256` a `.rtk/filters.json`, míg a `filtersTomlSha256`
a `.rtk/filters.toml` fájlt jelöli megbízhatóként. Bármelyik fájl szerkesztése csak a hozzá tartozó bizalmi bejegyzést érvényteleníti. A globális fájlokat
a rendszergazda telepíti, és ezek a globális szűrők meglévő bizalmi működését használják.

Az egyéni szűrők megadhatók egyetlen szűrőobjektumként vagy szűrőobjektumok tömbjeként. Az érvénytelen egyéni szűrőket
a rendszer kihagyja, és az `/api/context/rtk/filters` diagnosztikája jelenti őket. Az érvénytelen beépített szűrők azonnali hibát okoznak.

## RTK TOML-séma v1 kompatibilitás

Az OmniRoute képes az RTK TOML-séma v1 formátumát használó deklaratív szűrőfájlok elemzésére, ellenőrzésére, tesztelésére és telepítésére.
A támogatott mezők: `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty`, valamint a `[[tests.<filter>]]` beágyazott tesztek.
Az ismeretlen mezőket, az érvénytelen vagy nem biztonságos reguláris kifejezéseket, az egyidejű eltávolítási/megőrzési szabályokat, az 1 MiB-nál nagyobb fájlokat, valamint az ismeretlen szűrőkre mutató hivatkozásokat a rendszer elutasítja. Az a fájl, amelynek beágyazott tesztjei sikertelenek, vizsgálati célból ellenőrizhető, de nem telepíthető és nem tölthető be. Az egyéni fájlok betöltési hibái továbbra is nyitott hibakezelésűek: az érvénytelen fájlt a rendszer kihagyja, a többi szűrő pedig tovább működik.

Az OmniRoute az eszköz kimenetét azután kapja meg, hogy a kliens már rögzítette azt, ezért a `filter_stderr = true`
nem módosíthatja a folyamat kimenetének rögzítését. A mezőt a rendszer hatás nélküli műveletként elfogadja, az ellenőrzés pedig figyelmeztetést ad vissza.
Ezt szándékosan **RTK TOML-séma v1 kompatibilitásként** írjuk le, nem pedig az RTK futtatható állományával, a shell-hookokkal, a Rust-parancsimplementációkkal vagy a megbízhatósági tár elrendezésével való teljes kompatibilitásként.

Az irányítópult speciális RTK-nézete beillesztett vagy feltöltött TOML-t fogad el. Az ellenőrzés csak olvasási művelet.
A telepítés korlátozó jogosultságokkal, atomi módon írja ki a `DATA_DIR/rtk/filters.toml` fájlt, és újraindítás nélkül frissíti az aktív szűrőkatalógust. Egy meglévő fájl lecseréléséhez kifejezett `overwrite`
megerősítés szükséges, és a rendszer először létrehozza a `DATA_DIR/rtk/filters.toml.bak` fájlt.

## Szűrő DSL

A szűrők a [Tömörítési szabályok formátuma](./COMPRESSION_RULES_FORMAT.md) című dokumentumban ismertetett JSON-sémát használják.
A futtatókörnyezet a következő szakaszokat alkalmazza sorrendben:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> sorok elvetése/bevétele
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Fontos mezők:

| Mező                         | Rendeltetés                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| `rules.stripAnsi`            | Terminálszín- és vezérlőszekvenciák eltávolítása az illesztés előtt     |
| `rules.filterStderr`         | Gyakori stderr-előtagok normalizálása az illesztés/szűrés előtt         |
| `rules.replace`              | Rendezett regex-helyettesítések alkalmazása                             |
| `rules.matchOutput`          | Tömör összegzés visszaadása, ha a kimenet ismert feltételre illeszkedik |
| `rules.matchOutput[].unless` | A rövidített feldolgozás kihagyása hiba-/meghiúsulási minta esetén      |
| `rules.dropPatterns`         | Zajos sorok eltávolítása                                                |
| `rules.includePatterns`      | Végrehajtható műveletet jelző sorok előnyben részesítése                |
| `rules.collapsePatterns`     | Ismétlődő, illeszkedő sorok összevonása                                 |
| `rules.deduplicate`          | Szűrőnként engedélyezhető: az egymást követő azonos sorok összevonása   |
| `rules.truncateLineAt`       | Unicode-biztos, soronkénti csonkolás                                    |
| `rules.onEmpty`              | Tartaléküzenet, ha minden sort kiszűrtek                                |
| `tests[]`                    | Az ellenőrzési kapu által használt beágyazott minták                    |

A beépített szűrőknek ajánlott beágyazott `tests[]` mintákat tartalmazniuk. Az egyéni szűrőknek is érdemes ilyeneket tartalmazniuk, különösen akkor, ha több projekt között vannak megosztva.

## Sorok deduplikálása (két rétegben)

Az RTK két egymástól független rétegben vonja össze az ismétlődő sorokat:

1. **Szűrőnkénti `deduplicate` (külön engedélyezendő, alapértelmezett értéke `false`).** Egy szűrő beállíthatja a `rules.deduplicate: true` értéket, hogy a csonkolás előtt összevonja az egymást követő ismétlődő sorokat _az adott szűrő által illesztett kimeneten belül_.
   Ez a `lineFilter.ts` fájlban fut. A régi szűrőknél automatikusan engedélyeződik, ha a szűrő definiál `collapsePatterns` értéket. Séma: `deduplicate: z.boolean().default(false)` az
   `open-sse/services/compression/engines/rtk/filterSchema.ts` fájlban.
2. **Motorszintű `deduplicateThreshold` (alapértelmezett értéke `3`).** Az összes szűrő lefutása után a motor a teljes eredményben összevonja az azonos, egymást követő sorok minden olyan sorozatát, amely legalább `deduplicateThreshold` hosszúságú
   (`deduplicateRepeatedLines`, alkalmazási helye: `engines/rtk/index.ts`). Normalizáláskor az érték a 2–100 tartományra van korlátozva.

Először a szűrőnkénti menet fut le (a szűrőn belül), utoljára pedig a motorszintű menet (az összefűzött kimeneten), így a kettő kettős számlálás nélkül működik együtt.

## Sorok csoportosítása (`enableGrouping`)

Ha az `rtkConfig.enableGrouping` értéke `true` (alapértelmezett értéke `false`), az RTK egy további `groupSimilarLines` menetet futtat a deduplikálás utáni eredményen, amely összevonja a _közel azonos_ (nem bájtról bájtra megegyező), egymást követő sorok sorozatait. Az `rtkConfig.groupingThreshold` (alapértelmezett értéke `3`) a csoportosítást kiváltó minimális sorozathossz. Ez a `deduplicateThreshold` strukturális megfelelője: a deduplikálás a pontos ismétlődéseket, a csoportosítás pedig az „azonos alakú, kis eltéréseket tartalmazó” sorokat kezeli. Mindkét jelző a `key_value` táblában tárolt `rtkConfig` JSON része (lásd fent a Konfiguráció című részt), így a beállítás az újraindítások után is megmarad.

## Kódmegjegyzések eltávolítása (`stripCodeComments` / `preserveDocstrings`)

Ha az `rtkConfig.applyToCodeBlocks` engedélyezve van, az RTK a körülhatárolt kódblokkokból is eltávolíthatja a megjegyzéseket:

- `stripCodeComments` (alapértelmezett értéke `false`) — külön engedélyezendő. Ha az értéke `true`, az RTK eltávolítja a megjegyzéseket a JavaScript- és TypeScript-kódblokkokból. Korábban a jelző értékét beolvasták, de soha nem alkalmazták, ezért az alapértelmezett beállítás továbbra is a „megőrzés”, elkerülve ezzel egy észrevétlen éles környezeti változást.
- `preserveDocstrings` (alapértelmezett értéke `true`) — a megjegyzések eltávolításakor a JSDoc/`/** … */` blokkmegjegyzések megmaradnak (az általuk hordozott API-dokumentáció többet ér az általuk elfoglalt bájtoknál). Ezek eltávolításához állítsa `false` értékre.

A megjegyzések eltávolítása az `open-sse/services/compression/engines/rtk/codeStripper.ts` fájlban van megvalósítva. A **TypeScript-elemzőt** használja (nem reguláris kifejezést), így a karakterlánc-, sablon- és reguláriskifejezés-literálokat soha nem téveszti össze megjegyzésekkel, JSX észlelésekor pedig teljesen megszakítja a műveletet (így a JSX-kifejezéstárolók megjegyzései soha nem sérülnek). A megjegyzések eltávolítása jelenleg **csak JavaScriptre és TypeScriptre** vonatkozik — az eltávolító `CodeLanguage` halmazában szereplő más nyelveknél (Python, Rust, Go, Ruby, Java) az üres sorok és a térközök összevonása megtörténik, de a megjegyzések eltávolítása nem. Az eltávolítást végző kódblokkfuttatás az `rtk:code-strip` címkét kapja a `rulesApplied` mezőben.

> **Megjegyzés — a GCF / táblázatos kódolás külön motor.** Az RTK **nem** tartalmazza a „GCF”
> (Graph Compact Format) táblázatos/oszlopalapú JSON-kódolót. Ez a kódoló — amely egy régebbi
> `omni-tabular` kódolót váltott fel — a **headroom** motorban található
> (`open-sse/services/compression/engines/headroom/`, a beágyazott kodekkel a
> `headroom/gcf/` alatt). Nem kapcsolódik az itt dokumentált RTK-szűrőfolyamathoz.

## Konfiguráció

A globális beállítások a `/api/settings/compression` végponton keresztül érhetők el. Az RTK-specifikus beállítások szintén
elérhetők az `/api/context/rtk/config` végponton keresztül.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

Az `enabledFilters` és a `disabledFilters` szűrőazonosítókat használ, például `test-vitest` vagy `git-diff`.

Az `rtkConfig` teljes szerkezetét az `RtkConfig` / `DEFAULT_RTK_CONFIG` határozza meg az
`open-sse/services/compression/types.ts` fájlban. A teljes objektum egyetlen JSON-értékként marad meg
az SQLite `key_value` táblájában a `namespace = "compression"`, `key = "rtkConfig"`
értékek alatt (`src/lib/db/compression.ts`), és beolvasáskor a `normalizeRtkConfig` normalizálja. Így az alábbi
összes mező — beleértve az `enableGrouping`, `groupingThreshold`, `stripCodeComments` és `preserveDocstrings` mezőket —
ugyanazon tárolón keresztül járja meg az oda-vissza utat, és újraindítás után is megmarad.

| Kulcs                  | Alapértelmezés | Rendeltetés                                                                                          |
| ---------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`            | Teljes motorra érvényes: az összevonandó egymást követő azonos sorok minimális száma (2–100 között)  |
| `enableGrouping`       | `false`        | Opcionális: a közel azonos, egymást követő sorok sorozatainak összevonása                            |
| `groupingThreshold`    | `3`            | A csoportosítást kiváltó, egymást követő hasonló sorok minimális száma                               |
| `stripCodeComments`    | `false`        | Opcionális: megjegyzések eltávolítása az elkerített kódblokkokból (az `applyToCodeBlocks` szükséges) |
| `preserveDocstrings`   | `true`         | Megjegyzések eltávolításakor a JSDoc-/`/** … */`-blokkok megőrzése                                   |

## API

| Útvonal                            | Metódus | Rendeltetés                                            |
| ---------------------------------- | ------- | ------------------------------------------------------ |
| `/api/context/rtk/config`          | GET     | Az RTK-konfiguráció beolvasása                         |
| `/api/context/rtk/config`          | PUT     | Az RTK-konfiguráció frissítése                         |
| `/api/context/rtk/filters`         | GET     | A szűrőkatalógus és a betöltési diagnosztika listázása |
| `/api/context/rtk/import`          | POST    | RTK TOML v1 sémafájlok ellenőrzése vagy telepítése     |
| `/api/context/rtk/test`            | POST    | Az RTK-tömörítés előnézete egy szöveges adatcsomaghoz  |
| `/api/context/rtk/raw-output/[id]` | GET     | A megőrzött, kitakart nyers kimenet beolvasása         |
| `/api/compression/preview`         | POST    | Bármely tömörítési mód előnézete                       |

RTK tesztadatcsomag:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Tömörítési előnézet adatcsomagja:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

A felügyeleti útvonalakhoz az irányítópult felügyeleti hitelesítése vagy a megfelelő API-kulcs-szabályzat szükséges.

RTK TOML-ellenőrzési adatcsomag:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Az ellenőrzött fájl globális telepítéséhez használja az `"action": "install"` értéket. Az `"overwrite": true` beállítást csak
egy meglévő globális fájl lecserélésének áttekintése és megerősítése után adja hozzá.

## Nyers kimenet helyreállítása

Az RTK általában csak tömörített szöveget ad vissza. Hibakereséshez a `rawOutputRetention` megőrizheti a kitakart
nyers kimenetet:

| Érték      | Viselkedés                                                    |
| ---------- | ------------------------------------------------------------- |
| `never`    | Nem őrzi meg a nyers kimenetet                                |
| `failures` | Csak a valószínűsíthetően hibás kimenetet őrzi meg            |
| `always`   | Minden tömörített RTK-nyerskimenetet megőriz a kitakarás után |

A megőrzött fájlok ide kerülnek:

```txt
DATA_DIR/rtk/raw-output/
```

A bizalmas adatok a tartós tárolás előtt kitakarásra kerülnek, beleértve a gyakori bearer tokeneket, API-kulcsokat, Slack-tokeneket,
AWS-hozzáférési kulcsokat, valamint az értékadás jellegű `token=...`, `secret=...`, `password=...` értékeket. Az analitika
csak a mutató azonosítóját, a méretet és a hash metaadatait tárolja.

## Ellenőrzési kapu

A célzott ellenőrzési kapu a beépített inline szűrőteszteket külső parancsok meghívása nélkül futtatja:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

A szélesebb körű RTK-kapu:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Kiadás előtt futtasd a széles körű tömörítési kaput:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Az RTK kibővítése

1. Adj hozzá vagy frissíts egy szűrőket tartalmazó JSON-fájlt.
2. Adj meg legalább egy olyan `tests[]` mintát, amely igazolja a fontos működést.
3. Új parancscsaládokhoz adj hozzá egy tesztadatot a `tests/unit/compression/fixtures/rtk/` alatt.
4. Új kimeneti osztály bevezetésekor egészítsd ki a parancsészlelés lefedettségét.
5. Futtasd az ellenőrzési és a szélesebb körű RTK-kapukat.
6. Ha a szűrő projektlokális, véglegesítsd a `.rtk/filters.json` fájlt, és csak felülvizsgálat után frissítsd a `.rtk/trust.json` fájlt.

---

## Intenzitási szintek (v3.8.16+)

Az RTK **3 intenzitási szintet** támogat, amelyek különböző kompromisszumot kínálnak a **tömörítés agresszivitása** és a **biztonság** között. A szint a motor konfigurációjának `config.intensity` beállításával adható meg.

### A 3 szint

| Szint                  | Csonkítási küszöb    | Tokenmegtakarítás | Kockázat        | Leginkább ehhez ajánlott                    |
| ---------------------- | -------------------- | ----------------- | --------------- | ------------------------------------------- |
| `minimal`              | 24 sor szakaszonként | ~20-40%           | Nagyon alacsony | Éles környezet kritikus kontextussal        |
| `standard` (alapérték) | 24 sor szakaszonként | ~50-70%           | Alacsony        | Mindennapi kódolási munkamenetek            |
| `aggressive`           | 16 sor szakaszonként | ~70-90%           | Közepes         | Hosszú munkamenetek, maximális megtakarítás |

### Hol történik a csonkítás

A csonkítási küszöb a `lineFilter.ts` működésére van hatással:

```ts
// Az open-sse/services/compression/engines/rtk/index.ts:329-330 fájlból
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Minden szakasz **eleje** és **vége** megmarad; a középső tartalom kiesik, amikor a csonkítás életbe lép.

### Mi marad meg, és mi kerül eltávolításra

| Tartalom                                | minimal       | standard      | aggressive    |
| --------------------------------------- | ------------- | ------------- | ------------- |
| Hibák / veremkövetések                  | ✅ megmarad   | ✅ megmarad   | ✅ megmarad   |
| Sikertelen tesztek                      | ✅ megmarad   | ✅ megmarad   | ✅ megmarad   |
| Buildelési hibák                        | ✅ megmarad   | ✅ megmarad   | ✅ megmarad   |
| Sikeres tesztek (részletes)             | ✅ megmarad   | 🟡 összevonva | 🟡 összevonva |
| Rutinszerű kimenet (információs naplók) | 🟡 összevonva | 🟡 összevonva | ❌ eldobva    |
| Folyamatjelző sávok                     | 🟡 összevonva | ❌ eldobva    | ❌ eldobva    |
| Fejléc / ASCII-grafika                  | 🟡 összevonva | ❌ eldobva    | ❌ eldobva    |

### A megfelelő intenzitás kiválasztása

```
                  Katasztrofális lenne a kontextus elvesztése?
                  │
      ┌───────────┼───────────┐
      │           │           │
    IGEN         NEM       NEM BIZTOS
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Mennyire fontos  Először próbáld a `standard`
      │      az áteresztés?   szintet (az esetek 80%-ában
      │           │          működik)
      │      ┌────┴────┐
      │      │         │
      │  ALACSONY    MAGAS
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Az intenzitás konfigurálása

**Kombinációnként** (a kombináció konfigurációjában):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programozottan**:

Az `rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) egy
`CompressionEngine`, és nem rendelkezik `updateConfig` metódussal. Ehelyett a regisztrációs segédfüggvényen keresztül
frissítsd a motor konfigurációját:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### A hatás ellenőrzése

Használd az **ellenőrzési kaput** (lásd alább) annak megerősítéséhez, hogy a szűrő biztonságos a kiválasztott intenzitással:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("A szűrők meghiúsultak agresszív intenzitás mellett");
}
```

---

## Egyéni szűrők fejlesztése (v3.8.16+)

Az `engines/rtk/filters/` könyvtár **több mint 49 beépített szűrő JSON-fájlt** tartalmaz. Saját szűrőket is hozzáadhat az alapértelmezett szűrők által nem kezelt egyéni eszközök kimenetének tömörítéséhez.

### Szűrőséma (Zod)

```ts
{
  "id": "string",                      // Kötelező. Szűrőazonosító (kebab-case, például "python-traceback")
  "label": "string",                   // Kötelező. Ember által olvasható szűrőnév
  "description": "string",             // Opcionális (alapértelmezés: ""). A szűrő működésének rövid leírása
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opcionális (0–100, alapértelmezés: 50). Végrehajtási sorrend (a magasabb kerül előre)
  "match": {
    "commands": ["string"],            // Az illesztendő parancsnevek (például "python", "pytest")
    "patterns": ["string"],            // A kimenetre illesztendő reguláris kifejezések
    "outputTypes": ["string"]          // Felismert kimeneti osztályok (például "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opcionális (alapértelmezés: false). Eltávolítja az ANSI-színkódokat
    "replace": [                       // Keresési és csereszabályok (alapértelmezés: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Mintaegyezés esetén megszakítja a további feldolgozást (alapértelmezés: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Kihagyás, ha ez a minta illeszkedik
      }
    ],
    "includePatterns": ["string"],     // Megtartandó sorok (reguláris kifejezések, alapértelmezés: [])
    "dropPatterns": ["string"],        // Eldobandó sorok (reguláris kifejezések, alapértelmezés: [])
    "collapsePatterns": ["string"],    // Egyetlen előfordulásra összevonandó sorok (alapértelmezés: [])
    "deduplicate": boolean,            // Opcionális (alapértelmezés: false). Eltávolítja az ismétlődő sorokat
    "truncateLineAt": number,          // Opcionális (alapértelmezés: 0). A sorokat legfeljebb ennyi karakterre csonkolja
    "maxLines": number,                // Opcionális (alapértelmezés: 0). A sorok teljes számának szigorú felső korlátja
    "headLines": number,               // Opcionális (alapértelmezés: 20). Megtartja az illeszkedő kimenet első N sorát
    "tailLines": number,               // Opcionális (alapértelmezés: 20). Megtartja az illeszkedő kimenet utolsó N sorát
    "onEmpty": "string",               // Opcionális (alapértelmezés: ""). Tartaléküzenet, ha minden sort kiszűrt
    "filterStderr": boolean            // Opcionális (alapértelmezés: false). A stderr kimenetet is szűri
  },
  "preserve": {
    "errorPatterns": ["string"],       // Mindig megőrzendő minták (alapértelmezés: [])
    "summaryPatterns": ["string"]      // A végső összegző sor mintái (alapértelmezés: [])
  },
  "tests": [                           // Beágyazott ellenőrző tesztek (alapértelmezés: [])
    {
      "name": "string",               // Kötelező. A teszt neve
      "input": "sample output",        // Kötelező. Minta bemeneti szöveg
      "expected": "expected output",   // Kötelező. Várt tömörített kimenet
      "command": "optional command"    // Opcionális. Parancskörnyezet
    }
  ]
}
```

### Példa: Python-visszakövetési szűrő

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Egyéni szűrők betöltése

Helyezze a fájlt egy felismert helyre:

```
~/.omniroute/rtk/filters/my-filter.json     # Felhasználói szintű
<project>/.rtk/filters/my-filter.json      # Projektszintű
```

A szűrők indításkor automatikusan betöltődnek az `open-sse/services/compression/engines/rtk/filterLoader.ts` fájlban található `loadRtkFilters()` használatával. A betöltő a következő helyeken keresi a szűrőket:

- Beépített katalógus: `open-sse/services/compression/engines/rtk/filters/`
- Felhasználói könyvtár: `~/.omniroute/rtk/filters/`
- Projektkönyvtár: `<project>/.rtk/filters/`

A szűrők programozott betöltéséhez:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Beállítások: customFiltersEnabled (felhasználói-/projektszűrők betöltése, alapértelmezés szerint engedélyezve),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Ellenőrzés

A szűrőket betöltéskor a Zod-séma alapján ellenőrzi a rendszer. A hibás szerkezetű szűrő betöltése sikertelen lesz, és a rendszer hibát naplóz:

```
RTK_FILTER_LOADER: a(z) "my-filter" szűrő ellenőrzése sikertelen:
  - rules.replace.0.pattern: Érvénytelen reguláris kifejezés
  - match.commands: nem lehet üres
```

Az összes telepített szűrő ellenőrzéséhez hívja meg az `open-sse/services/compression/engines/rtk/verify.ts` által exportált `runRtkFilterTests()` függvényt.

### Bevált gyakorlatok

1. **Mindig add meg a `tests[]` elemet** — ezek bizonyítják, hogy a szűrőd működik, és megakadályozzák a regressziókat
2. **Használd a `matchOutput` elemet rövidre záráshoz** — ha egyetlen sor is elmond mindent, cseréld le vele az egész blokkot
3. **Részesítsd előnyben a `keep` elemet a `strip` helyett** — a kifejezett „mindig megőrzendő” szabályok biztonságosabbak, mint a „mindig eltávolítandó” szabályok
4. **Tesztelj mindhárom intenzitási szinten** — a `minimal` ne végezzen módosítást, az `aggressive` pedig továbbra is őrizze meg a hibákat
5. **Használd az `unless` mezőt** — védd a rövidre zárásokat a „ne aktiválódjon, ha X jelen van” feltétellel

---

## Nyers kimenet helyreállítása és ellenőrzési kapu

Amikor az RTK agresszíven tömöríti a kimenetet, hibakeresési, auditálási vagy visszajátszási célból **helyreállíthatja az eredeti szöveget**.

### A nyers kimenet helyreállításának működése

```
Eredeti kimenet (10K token)
        │
        ▼
RTK-tömörítés (rawOutput.enabled=true beállítással)
        │
        ├─▶ Tömörített kimenet (2K token)  ──▶ az LLM-nek
        │
        └─▶ Eredeti kimenet (10K token)    ──▶ adatbázisban tárolva
                                                  (request_id alapján kapcsolva)
```

### A nyers kimenet tárolásának engedélyezése

**Kérésenként** (a kombinált konfigurációban):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1 MB-os korlát
    }
  }
}
```

**Alapértelmezés**: `rawOutput.enabled: false` (tárhelyet takarít meg).

### Tárhelyköltség

| Kérésenként                | 1 MB-os korlát | 10 MB-os korlát |
| -------------------------- | -------------- | --------------- |
| Átlagos tömörített kimenet | ~5KB           | ~5KB            |
| Tárolt nyers kimenet       | ~50-500KB      | ~500KB-5MB      |
| Napi 1000 kérés esetén     | 50-500MB/nap   | 500MB-5GB/nap   |

> **Javaslat**: A nyers kimenetet csak **hibakeresési munkamenetekhez** vagy **mintavételezett auditáláshoz** engedélyezze, ne folyamatosan.

### Az eredeti kimenet helyreállítása

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId a tömörítési statisztikákból
if (raw) {
  console.log("Original output:", raw);
}
```

A `pointerId` a tömörítés után a `CompressionStats.rtkRawOutputPointers[]` mezőben található.
A függvény szignatúráját lásd itt: `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Az ellenőrzési kapu

Az **RTK-szűrők ellenőrzése** (`open-sse/services/compression/engines/rtk/verify.ts`) minden szűrőt ellenőriz a hozzá tartozó `tests[]` alapján, és biztosítja a helyes működést mindhárom intenzitási szinten.

Az ellenőrzés futtatásához **hívja meg a `runRtkFilterTests()` függvényt**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Amit ellenőriz**:

1. Minden szűrő betöltődik és megfelel a sémaellenőrzésnek
2. Minden `tests[]` bejegyzés az elvárt kimenetet állítja elő
3. A `minimal` intenzitás nem végez módosítást (megőrzi az eredetit, és csak strukturális szűrőket alkalmaz)
4. Az `aggressive` intenzitás megőrzi a hibákat, a teszthibákat és a veremkivonatokat
5. A tömörített kimenet soha nem nagyobb az eredeti bemenetnél

- Forrás: `open-sse/services/compression/engines/rtk/` (63 fájl, ~70KB)

- **Szűrőmódosítás egyesítése előtt** — mindig győződjön meg arról, hogy a tesztek sikeresek
- **Az RTK-motor frissítése után** — előfordulhat, hogy a séma megváltozott
- **Rendszeresen, a monitorozás részeként** — védelmet nyújt a tesztrögzítések eltérései ellen
- **Új eszköz- vagy parancscsalád hozzáadásakor** — bizonyítja, hogy az új szűrő működik

---

## Lásd még

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — A teljes tömörítési folyamat áttekintése
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregiszter és beépített motorok
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Egyéni motorok, nyelvi csomagok, egymásra épülő folyamatok
- Forrás: `open-sse/services/compression/engines/rtk/` (63 fájl, ~70 KB)
