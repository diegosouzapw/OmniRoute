# ADR: Pluggable persistence boundary (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Állapot:** Javasolt — a futásidejű munka megkezdése előtt karbantartói jóváhagyást igényel
- **Nyomon követési feladat:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Hatókör:** Kizárólag a perzisztencia-architektúra; ez a döntés nem ad hozzá és nem választ ki külső adatbázist

## Kontextus

Az OmniRoute jelenleg tartományorientált perzisztenciafüggvényeket biztosít a `src/lib/db/` könyvtárból, míg a
`src/lib/db/core.ts` által visszaadott megosztott kapcsolat a `src/lib/db/adapters/types.ts` fájlban definiált szinkron `SqliteAdapter`
szerződést valósítja meg. Ez az adapter több SQLite-futtatókörnyezetet támogat, a
felülete azonban továbbra is SQLite-jellegű: szinkron előkészített utasítások, `pragma`, késleltetett és azonnali
tranzakciók, natív vagy fájlmásolásos biztonsági mentés, ellenőrzőpont-képzés és helyi adatbázis-kezelő.

A jelenlegi indítási és helyreállítási folyamat az SQLite-fájl életciklusát is kezeli. A `src/lib/db/core.ts`
feloldja a `storage.sqlite` helyét, fenntart egyetlen, folyamatszintű globális adaptert, WAL-ellenőrzőpontot készít, helyreállítás
során megőrzi a kiválasztott táblákat, és az adatbázis újraépítésekor eltávolítja az SQLite kísérőfájljait. A
`src/lib/db/adapters/driverFactory.ts` fájlban lévő illesztőprogram-kiválasztás a támogatott SQLite-futtatókörnyezetek közül választ; ez
nem külső háttérrendszerek absztrakciója.

A séma továbbfejlesztése hasonlóan szorosan kötődik az SQLite-hoz. A `src/lib/db/migrationRunner.ts` számozott SQL-fájlokat alkalmaz,
lekérdezi az `sqlite_master` és a `PRAGMA table_info` értékeit, észleli az opcionális FTS5-támogatást, és a migrációs
műveleteket SQLite-tranzakciókban futtatja. Az olyan üzemeltetési modulok, mint a `src/lib/db/backup.ts` és a
`src/lib/db/optimizationSettings.ts`, közvetlenül használják a biztonsági mentés, a `PRAGMA`, a WAL, az oldalméret, az automatikus kiürítés és a `VACUUM`
szemantikáját.

Ezek a beágyazott SQLite-telepítés érvényes tulajdonságai. Továbbra is elérhetőnek kell maradniuk anélkül,
hogy a PostgreSQL vagy a MySQL rendszert egy SQLite API utánzására kényszerítenénk.

## Döntés

Kétszintű perzisztenciahatárt vezetünk be a hordozható, tartós állapothoz:

1. **A tartományi adattár-szerződések** határozzák meg az üzleti és útválasztási
   kód által igényelt perzisztenciaműveleteket. A hívók a tartományi viselkedéstől és tartományi adatoktól függenek, nem pedig SQL-szövegtől, előkészített utasításoktól,
   adatbázisfájloktól vagy dialektusobjektumoktól.
2. **Egy belső aszinkron háttérrendszer-szerződés** támogatja az adattár-megvalósításokat
   tranzakciós környezetekkel, állapot- és készenléti ellenőrzéssel, migrációkoordinációval, háttérrendszer-képességekkel és
   osztályozott hibákkal. A pontos TypeScript-felületre az első megvalósítási
   PR tesz majd javaslatot, és megfelelőségi tesztek igazolják; ez az ADR szándékosan nem rögzít előre egy spekulatív API-t.

Az SQLite marad az alapértelmezett megvalósítás. A meglévő SQLite illesztőprogram-lánc és a szinkron
`SqliteAdapter` az SQLite-adattár megvalósítása mögött marad, miközben a tartományok áttelepítése
kis vertikális szeletekben történik. Egyetlen felhasználónak sem kötelező külső szolgáltatást konfigurálnia.

A PostgreSQL az első javasolt külső megvalósítás, miután az adattárhatár működését
SQLite-tal igazoltuk. A MySQL azonos szintű megvalósításként követi ugyanazt a megfelelőségi tesztkészletet,
nem pedig az üzleti logika második elágazásaként.

## Határszabályok

### Hordozható adattárfelület

Egy hordozható adattár a következőket teheti elérhetővé:

- tartományi olvasási és írási műveletek;
- explicit atomi műveletek és tranzakció hatókörére korlátozott adattár-hozzáférés;
- összehasonlítási/frissítési vagy bérleti műveletek, amennyiben a párhuzamossági szemantika a tartomány része;
- háttérrendszer-semleges lapozás, rendezés és megszorítási hibák.

A háttérrendszer állapot- és készenléti ellenőrzése, valamint a migrációkoordináció a belső háttérrendszeri/üzemeltetési
szerződéshez tartozik, nem pedig az egyes tartományi adattárakhoz.

Egy hordozható adattár nem teheti elérhetővé a következőket:

- `prepare`, `get`, `all`, `run` vagy nyers illesztőprogram-kezelők;
- `PRAGMA`, WAL-ellenőrzőpont-módok, `VACUUM` vagy oldal-/gyorsítótár-hangolás;
- SQLite-fájlútvonalak, kísérőfájlok vagy fájlmásolásos biztonsági mentés;
- `lastInsertRowid` háttérrendszerek közötti tartományi szerződésként;
- FTS5- vagy `sqlite-vec`-szintaxis;
- a normál üzleti kód által használt általános dialektus-kiskapu.

### Háttérrendszer-képességek felülete

A háttérrendszer-specifikus viselkedés explicit és felderíthető marad. A kizárólag SQLite-hoz tartozó karbantartási műveletek
a saját megvalósításuk és üzemeltetési interfészük mögött maradnak, beleértve a következőket:

- futásidejű illesztőprogram-választás;
- WAL-ellenőrzőpont-képzés és SQLite-leállítási viselkedés;
- oldalméret-, gyorsítótárméret- és automatikuskiürítés-beállítások;
- adatbázisfájl biztonsági mentése, visszaállítása és helyreállítása;
- SQLite-séma introspekciója;
- FTS5- és `sqlite-vec`-integráció.

A külső háttérrendszereknek nem kell utánozniuk ezeket a funkciókat. Az adattáraknak vagy egy
hordozható képességet kell használniuk, vagy dokumentált viselkedésű, háttérrendszer-specifikus megvalósítást kell biztosítaniuk, vagy jelezniük kell,
hogy az adott képesség nem érhető el.

## Tranzakciós és migrációs modell

A repository API-k határozzák meg az atomi üzleti műveletet; a hívók nem választanak SQL-tranzakciós módot.
Minden műveletnek meg kell határoznia a megfigyelhető párhuzamossági garanciáit: a védett invariánsokat, az ütközések
észlelését, az újrapróbálkozások besorolását, az idempotenciára vonatkozó elvárásokat és a tranzakciós kontextus továbbadását.
A megvalósítások csak akkor használhatnak eltérő tranzakciós és izolációs mechanizmusokat, ha ezek a megfigyelhető
garanciák egyenértékűek maradnak. A SQLite belsőleg továbbra is használhatja a jelenlegi halasztott vagy azonnali
tranzakciós viselkedését, amennyiben az megfelel a művelet szerződésének.

A külső backendek esetében egyértelműen meg kell határozni a migrációk tulajdonjogát, hogy több alkalmazásreplika ne próbálhassa
egyidejűleg végrehajtani ugyanazt a sémamódosítást. A backendek migrációs előzményei közös logikai mérföldköveket követhetnek, de a SQLite SQL-fájljairól
nem feltételezzük, hogy más dialektusban is hordozhatók vagy újrafelhasználhatók.

## Backendek közötti megfelelőség szemantikája

A megfelelőségi teszteknek nemcsak a repository-metódusok szignatúráira, hanem a viselkedésre is ki kell terjedniük. Minden migrált tartománynak
meg kell határoznia és ellenőriznie kell a következőket:

- az időbélyegek időzónája, pontossága és szerializációja;
- a `NULL` rendezése, a rendezési szabályok és a kis- és nagybetűk megkülönböztetésére vonatkozó elvárások;
- a JSON reprezentációja és összehasonlítási viselkedése;
- az egész számok, tizedes törtek és pénzértékek pontossága;
- a stabil rendezés és a determinisztikus holtverseny-felbontás a lapozáshoz;
- azonosítók generálása a SQLite sorazonosítóira való támaszkodás nélkül;
- az egyediségi és idegenkulcs-megsértések besorolása;
- az érintett sorokra vonatkozó viselkedés a hatás nélküli, összehasonlítási/frissítési és törlési műveleteknél;
- a párhuzamos írások eredményei, az újrapróbálható ütközések és az idempotens újrapróbálkozások.

Ha egy tartományhoz nem határozható meg egyenértékű, megfigyelhető szemantika, akkor az még nem hordozható, és
backend-specifikusnak kell maradnia mindaddig, amíg ezt a szerződést meg nem tervezik.

## Kompatibilitási követelmények

Az ezen ADR-t követő bármely megvalósításnak meg kell őriznie a következő tulajdonságokat:

- A SQLite marad a konfigurációt nem igénylő alapértelmezés.
- A meglévő SQLite-fájlok és migrációs előzmények továbbra is olvashatók maradnak.
- Az npm, Electron, Docker és a korlátozott futtatókörnyezetek SQLite tartalékmechanizmusai megtartják jelenlegi indítási útvonalukat.
- A tárolt szolgáltatói hitelesítő adatok továbbra is a meglévő alkalmazásszintű titkosítási viselkedést használják.
- Egy repository-migráció nem változtatja meg észrevétlenül az útválasztási, kvóta-, API-kulcs- vagy auditálási szemantikát.
- A biztonsági mentési és helyreállítási viselkedést backendként dokumentáljuk, nem pedig univerzálisként mutatjuk be.
- Egy tiszta, kizárólag SQLite-ot használó telepítés nem tölt be és nem igényel külső adatbázis-illesztőprogramot.

## Szállítási sorrend

1. Tegyenek közzé egy reprodukálható SQLite-csatolási leltárt külön felülvizsgálati dokumentumként.
2. Vezessék be az első tartományi repository-szerződéseket és megfelelőségi teszteket.
3. Illesszék a meglévő SQLite-megvalósítást e szerződések mögé az alapértelmezések megváltoztatása nélkül.
4. A karbantartók jóváhagyásától függően adják hozzá a PostgreSQL-t első külső megvalósításként egy
   jól körülhatárolt vezérlősík-részhez.
5. Csak a párhuzamos írást és a migrációk tulajdonjogát ellenőrző tesztek elkészülte után bővítsék a megosztott állapotot.
6. Az adatbázisváltás meghirdetése előtt hozzanak létre egy offline, validált SQLite–külső adatbázis migrációs útvonalat.
7. Adják hozzá a MySQL-t a már bizonyított repository- és backend-szerződések alapján.

Minden futásidejű lépés különálló, felülvizsgálható PR. Egy későbbi lépés nem használható fel egy
korábbi lépésben szereplő, még nem bizonyított absztrakció összevonásának igazolására.

## Első megvalósítási szelet

Az első futásidejű szeletet a csatolási leltár áttekintése után kell kiválasztani. A szolgáltatói kapcsolatok, API-kulcsok, kombinációk és az útválasztási konfiguráció lehetséges jelöltek, mivel az alaptábláik láthatók a `src/lib/db/core.ts` fájlban, ez az ADR azonban nem hagy jóvá sem táblalistát, sem migrációs PR-t. A szeletnek a következőket kell tartalmaznia:

- a SQLite viselkedésének megőrzését ellenőrző tesztek;
- a repository-k megfelelőségi tesztjei;
- explicit tranzakcióhatárok;
- a tárolt hitelesítő adatok titkosításának és maszkolásának ellenőrzése;
- az alapértelmezett indítási konfiguráció változatlanul hagyása.

## Megfontolt alternatívák

### PostgreSQL hozzáadása a `SqliteAdapter` alá

Elutasítva. A `SqliteAdapter` a SQLite-futtatókörnyezetek kompatibilitási rétege, és SQLite-specifikus műveleteket tesz elérhetővé. Ennek a felületnek az emulálása szinkron és dialektusspecifikus feltételezéseket szivárogtatna át egy új háttérrendszerbe.

### Általános lekérdezési/végrehajtási API elérhetővé tétele minden tartomány számára

Elsődleges határfelületként elutasítva. Központosítaná a kapcsolatok kezelését, de az SQL-dialektushoz, tranzakciókhoz és táblákhoz való csatolást az üzleti modulokban hagyná. Alacsony szintű háttérrendszer-primitív létezhet a repository-megvalósításokon belül, de nem az alkalmazás felé néző perzisztencia-API-ként.

### A teljes perzisztenciaréteg újraírása egyetlen szelet validálása előtt

Elutasítva. A jelenlegi perzisztenciafelület széles körű, és magában foglalja a fájlok életciklusát, a helyreállítást, a keresést és az üzemeltetési beállításokat. A vertikális szeletek áttekinthető viselkedést és visszaállítási határokat biztosítanak.

### A SQLite lecserélése alapértelmezettként

Elutasítva. A beágyazott és asztali telepítések a jelenlegi, szolgáltatás nélküli indítási modellre támaszkodnak. A külső háttérrendszer használata opcionális.

### Redis használata tartós, hiteles adatforrásként

Elutasítva. A Redis támogathat kifejezetten ideiglenes koordinációt, gyorsítótárat vagy számlálókat, de nem helyettesíti az itt leírt tartós repository-szerződést.

## Következmények

### Előnyök

- Az üzleti kód stabil, az adatbázis-dialektustól független perzisztencia-illesztési pontot kap.
- A SQLite viselkedését még azelőtt teszteljük, hogy egy külső háttérrendszer meghatározná az absztrakciót.
- A PostgreSQL és a MySQL közös szerződéseket és teszteket használ a tartományi logika duplikálása helyett.
- A kizárólag SQLite-ban elérhető képességek első osztályúak maradnak ahelyett, hogy szivárgó kompatibilitási rétegekké válnának.
- A több replikát érintő migrációs és tranzakciós viselkedés explicit tervezési szemponttá válik.

### Költségek és kockázatok

- A repository-k kiemelése a hívási helyek fokozatos migrációját igényli.
- Az aszinkron határok továbbterjedhetnek a jelenleg szinkron szolgáltatáskódon keresztül.
- A háttérrendszerek közötti szemantika az SQL-szintaktikai kompatibilitáson túlmutató megfelelőségi teszteket igényel.
- A biztonsági mentés, a keresés, a vektortárolás és a karbantartás továbbra is képességspecifikus marad.
- Egynél több perzisztencia-megvalósítás futtatása növeli a CI és az üzemeltetési támogatás költségeit.

## Nem célok

Ez az ADR nem:

- ad hozzá adatbázis-függőséget, környezeti változót, sémát vagy migrációt;
- módosítja az aktív SQLite singleton példányt vagy az illesztőprogramok tartalékláncát;
- ígér PostgreSQL- vagy MySQL-támogatást egy konkrét kiadásban;
- teszi hordozhatóvá az FTS5, a `sqlite-vec`, a biztonsági mentési fájlok vagy a SQLite-karbantartás használatát;
- definiálja az aktív-aktív működésre való felkészültséget a megosztott állapotra és koordinációra vonatkozó tesztek megléte előtt;
- hagyja jóvá a `src/lib/db/` egyetlen lépésben történő újraírását.

## Nyitott kérdések a karbantartói jóváhagyáshoz

1. A repozitórium és a belső aszinkron háttérrendszer közötti határvonal az előnyben részesített irány, vagy a külső perzisztenciát külön vezérlősík-szolgáltatás mögé kell helyezni?
2. Elfogadható-e a PostgreSQL első külső implementációként az SQLite-kompatibilitás biztosítása után?
3. Melyik tartomány legyen az első körülhatárolt repozitóriumszelet?
4. Mely állapotokat kell megosztani az első többpéldányos mérföldkőhöz, és melyek maradjanak csomópontlokálisak?
5. Milyen kompatibilitási időszak szükséges egy megszakított vagy visszaállított repozitórium-migrációhoz?

Amíg ezek a kérdések nem rendeződnek, ez a dokumentum javaslatnak minősül, és nem von maga után futásidejű refaktorálást.
