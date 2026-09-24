# ADR: Pluggable persistence boundary (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Stav:** Navrženo — před zahájením prací na běhovém prostředí je vyžadováno schválení správcem
- **Sledovací issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Rozsah:** Pouze architektura perzistence; toto rozhodnutí nepřidává ani nevybírá externí databázi

## Kontext

OmniRoute v současnosti poskytuje funkce perzistence orientované na domény z `src/lib/db/`, zatímco
sdílené připojení vrácené souborem `src/lib/db/core.ts` implementuje synchronní kontrakt `SqliteAdapter`
v `src/lib/db/adapters/types.ts`. Tento adaptér podporuje několik běhových prostředí SQLite, jeho
rozhraní však zůstává uzpůsobeno SQLite: synchronní připravené příkazy, `pragma`, odložené a okamžité
transakce, nativní zálohování či zálohování kopírováním souboru, checkpoint a lokální databázový handle.

Současný proces spuštění a obnovy rovněž spravuje životní cyklus souboru SQLite. `src/lib/db/core.ts`
vyhledává `storage.sqlite`, udržuje jeden adaptér globální pro celý proces, provádí checkpoint WAL, během
obnovy zachovává vybrané tabulky a při opětovném sestavení databáze odstraňuje doprovodné soubory SQLite.
Výběr ovladače v `src/lib/db/adapters/driverFactory.ts` vybírá mezi podporovanými běhovými prostředími
SQLite; nejedná se o abstrakci externího backendu.

Vývoj schématu je obdobně provázaný. `src/lib/db/migrationRunner.ts` aplikuje číslované soubory SQL,
dotazuje se na `sqlite_master` a `PRAGMA table_info`, zjišťuje volitelnou podporu FTS5 a spouští migrace
v transakcích SQLite. Provozní moduly, jako jsou `src/lib/db/backup.ts` a
`src/lib/db/optimizationSettings.ts`, přímo používají zálohování a sémantiku `PRAGMA`, WAL, velikosti
stránek, automatického vacuumingu a příkazu `VACUUM`.

To jsou platné vlastnosti nasazení s vestavěnou databází SQLite. Měly by zůstat dostupné, aniž by
PostgreSQL nebo MySQL musely emulovat API SQLite.

## Rozhodnutí

Pro přenositelný trvalý stav přijmout dvouúrovňovou hranici perzistence:

1. **Kontrakty doménových repozitářů** definují operace perzistence potřebné obchodním a směrovacím
   kódem. Volající závisejí na chování a datech domény, nikoli na textu SQL, připravených příkazech,
   databázových souborech nebo objektech dialektu.
2. **Interní asynchronní kontrakt backendu** podporuje implementace repozitářů pomocí
   transakčních kontextů, kontroly stavu a připravenosti, koordinace migrací, schopností backendu a
   klasifikovaných chyb. Přesné rozhraní TypeScript bude navrženo v prvním implementačním PR a ověřeno
   testy shody; toto ADR záměrně nefixuje spekulativní API.

SQLite zůstává výchozí implementací. Stávající kaskáda ovladačů SQLite a synchronní
`SqliteAdapter` zůstávají skryté za implementací repozitáře SQLite, zatímco domény budou migrovány
po malých vertikálních řezech. Žádný uživatel nemusí konfigurovat externí službu.

PostgreSQL je první navrhovanou externí implementací poté, co bude hranice repozitáře ověřena
vůči SQLite. MySQL bude následovat jako rovnocenná implementace využívající stejnou sadu testů shody,
nikoli jako druhá větev obchodní logiky.

## Pravidla hranice

### Přenositelné rozhraní repozitáře

Přenositelný repozitář může zpřístupňovat:

- čtení a zápisy domény;
- explicitní atomické operace a přístup k repozitáři v rozsahu transakce;
- operace porovnání/aktualizace nebo pronájmu, pokud je souběžné chování součástí domény;
- stránkování, řazení a chyby omezení nezávislé na backendu.

Kontrola stavu a připravenosti backendu a koordinace migrací patří do interního provozního kontraktu
backendu, nikoli do jednotlivých doménových repozitářů.

Přenositelný repozitář nesmí zpřístupňovat:

- `prepare`, `get`, `all`, `run` ani přímé handly ovladače;
- `PRAGMA`, režimy checkpointů WAL, `VACUUM` ani ladění stránek či mezipaměti;
- cesty k souborům SQLite, doprovodné soubory ani zálohování kopírováním souboru;
- `lastInsertRowid` jako doménový kontrakt použitelný napříč backendy;
- syntaxi FTS5 nebo `sqlite-vec`;
- obecný únikový mechanismus pro dialekt používaný běžným obchodním kódem.

### Rozhraní schopností backendu

Chování specifické pro backend zůstává explicitní a zjistitelné. Údržba určená pouze pro SQLite
zůstává skrytá za vlastní implementací a provozním rozhraním, včetně:

- výběru ovladače běhového prostředí;
- checkpointu WAL a chování při ukončování SQLite;
- nastavení velikosti stránek, velikosti mezipaměti a automatického vacuumingu;
- zálohování, obnovení a zotavení databázového souboru;
- introspekce schématu SQLite;
- integrace FTS5 a `sqlite-vec`.

Externí backend nemusí tyto funkce napodobovat. Repozitáře musí buď používat
přenositelnou schopnost, poskytovat implementaci specifickou pro backend se zdokumentovaným chováním,
nebo oznámit, že daná schopnost není dostupná.

## Model transakcí a migrací

API repozitářů definují atomickou obchodní operaci; volající nevybírají režim SQL transakce.
Každá operace musí definovat své pozorovatelné záruky souběžnosti: chráněné invarianty, detekci
konfliktů, klasifikaci opakovaných pokusů, požadavky na idempotenci a předávání kontextu transakce.
Implementace mohou používat různé mechanismy transakcí a izolace pouze tehdy, pokud tyto pozorovatelné
záruky zůstávají ekvivalentní. SQLite může interně nadále používat své současné chování odložených
nebo okamžitých transakcí, pokud splňuje kontrakt operace.

Externí backendy vyžadují explicitní vlastnictví migrací, aby více replik aplikace nemohlo souběžně
provádět stejnou změnu schématu. Historie migrací backendů mohou sdílet logické milníky, ale
nepředpokládá se, že soubory SQL pro SQLite jsou přenositelné nebo znovupoužitelné v jiném dialektu.

## Sémantika shody mezi backendy

Testy shody musí pokrývat chování, nikoli pouze signatury metod repozitáře. Každá migrovaná doména
musí definovat a ověřovat:

- časové pásmo, přesnost a serializaci časových razítek;
- řazení hodnot `NULL`, kolaci a požadavky na rozlišování velkých a malých písmen;
- reprezentaci JSON a chování při porovnávání;
- přesnost celých čísel, desetinných čísel a peněžních hodnot;
- stabilní řazení a deterministická rozhodovací kritéria při shodě pro stránkování;
- generování ID bez závislosti na identifikátorech řádků SQLite;
- klasifikaci porušení jedinečnosti a cizích klíčů;
- chování počtu ovlivněných řádků u operací bez změny, porovnání/aktualizace a odstranění;
- výsledky souběžných zápisů, opakovatelné konflikty a idempotentní opakované pokusy.

Pokud doména nedokáže stanovit ekvivalentní pozorovatelnou sémantiku, není dosud přenositelná a musí
zůstat specifická pro daný backend, dokud nebude tento kontrakt navržen.

## Požadavky na kompatibilitu

Každá implementace řídící se tímto ADR musí zachovat následující vlastnosti:

- SQLite zůstává výchozí možností bez nutnosti konfigurace.
- Stávající soubory SQLite a historie migrací zůstávají čitelné.
- Záložní mechanismy SQLite pro npm, Electron, Docker a omezená běhová prostředí si zachovávají svou současnou cestu spouštění.
- Uložené přihlašovací údaje poskytovatelů nadále používají stávající způsob šifrování aplikace.
- Migrace repozitáře potichu nemění sémantiku směrování, kvót, API klíčů ani auditu.
- Chování zálohování a obnovy je dokumentováno pro každý backend zvlášť, nikoli prezentováno jako univerzální.
- Čistá instalace používající pouze SQLite nenačítá ani nevyžaduje ovladač externí databáze.

## Pořadí dodávky

1. Publikujte reprodukovatelný soupis vazeb na SQLite jako samostatný artefakt ke kontrole.
2. Zaveďte první kontrakty doménových repozitářů a testy shody.
3. Přizpůsobte stávající implementaci SQLite těmto kontraktům, aniž byste změnili výchozí nastavení.
4. Po schválení správci přidejte PostgreSQL jako první externí implementaci pro jeden
   ohraničený výřez řídicí roviny.
5. Rozšiřte sdílený stav až poté, co budou existovat testy souběžných zápisů a vlastnictví migrací.
6. Před oznámením možnosti přepínání databází přidejte offline a validovanou cestu migrace ze SQLite do externí databáze.
7. Přidejte MySQL na základě ověřených kontraktů repozitářů a backendů.

Každý běhový krok je samostatný, kontrolovatelný PR. Pozdější krok nesmí být použit k odůvodnění
sloučení neověřené abstrakce z dřívějšího kroku.

## První implementační část

První část běhového prostředí by měla být vybrána po kontrole inventáře vazeb. Připojení
k poskytovatelům, API klíče, kombinace a konfigurace směrování jsou kandidáty, protože jejich základní tabulky
jsou viditelné v `src/lib/db/core.ts`, toto ADR však neschvaluje seznam tabulek ani PR s migrací.
Tato část musí zahrnovat:

- testy zachování chování SQLite;
- testy shody repozitářů;
- explicitní hranice transakcí;
- ověření šifrování a redakce uložených přihlašovacích údajů;
- žádnou změnu výchozí konfigurace při spuštění.

## Zvažované alternativy

### Přidat PostgreSQL pod `SqliteAdapter`

Zamítnuto. `SqliteAdapter` je vrstva kompatibility pro běhová prostředí SQLite a zpřístupňuje operace
specifické pro SQLite. Emulace tohoto rozhraní by do nového backendu zanesla synchronní předpoklady a předpoklady
specifické pro daný dialekt.

### Zpřístupnit všem doménám obecné API pro dotazy a provádění příkazů

Zamítnuto jako primární rozhraní. Centralizovalo by zpracování připojení, ale ponechalo by dialekt SQL,
transakce a vazby na tabulky v obchodních modulech. Nízkoúrovňová backendová primitiva mohou existovat uvnitř
implementací repozitářů, nikoli jako API perzistence určené pro aplikaci.

### Přepsat veškerou perzistenci před ověřením jedné části

Zamítnuto. Současné rozhraní perzistence je rozsáhlé a zahrnuje životní cyklus souborů, obnovu, vyhledávání
a provozní nastavení. Vertikální části poskytují kontrolovatelné chování a hranice pro návrat změn.

### Nahradit SQLite jako výchozí řešení

Zamítnuto. Vestavěná a desktopová nasazení závisejí na současném modelu spuštění bez nutnosti služby. Externí
backend je volitelný.

### Použít Redis jako autoritativní úložiště trvalých dat

Zamítnuto. Redis může podporovat explicitně dočasnou koordinaci, mezipaměť nebo čítače, nenahrazuje však
zde popsaný kontrakt repozitáře pro trvalá data.

## Důsledky

### Pozitivní

- Obchodní kód získá stabilní rozhraní perzistence nezávislé na databázovém dialektu.
- Chování SQLite bude otestováno dříve, než abstrakci definuje externí backend.
- PostgreSQL a MySQL budou sdílet kontrakty a testy namísto duplikování doménové logiky.
- Funkce dostupné pouze v SQLite zůstanou plnohodnotné, místo aby se staly netěsnými vrstvami kompatibility.
- Chování migrací a transakcí při provozu více replik se stane explicitním návrhovým hlediskem.

### Náklady a rizika

- Extrakce repozitářů vyžaduje postupnou migraci míst volání.
- Asynchronní rozhraní se mohou rozšířit do aktuálně synchronního kódu služeb.
- Sémantika napříč backendy vyžaduje testy shody nad rámec kompatibility syntaxe SQL.
- Zálohování, vyhledávání, vektorové úložiště a údržba zůstávají specifické pro jednotlivé funkce.
- Provoz více než jedné implementace perzistence zvyšuje náklady na CI a provozní podporu.

## Co není cílem

Toto ADR:

- nepřidává databázovou závislost, proměnnou prostředí, schéma ani migraci;
- nemění aktivní singleton SQLite ani kaskádu ovladačů;
- neslibuje podporu PostgreSQL ani MySQL v konkrétním vydání;
- nečiní FTS5, `sqlite-vec`, záložní soubory ani údržbu SQLite přenositelnými;
- nedefinuje připravenost na aktivní provoz více instancí, dokud nebudou existovat testy sdíleného stavu a koordinace;
- neschvaluje jednorázové přepsání `src/lib/db/`.

## Otevřené otázky ke schválení správcem

1. Je preferovaným směrem repozitář spolu s interním asynchronním rozhraním backendu, nebo by měla
   být externí perzistence skryta za samostatnou službou řídicí roviny?
2. Je PostgreSQL přijatelný jako první externí implementace po ověření shody se SQLite?
3. Která doména by měla být prvním vymezeným úsekem repozitáře?
4. Který stav musí být sdílen pro první milník s více replikami a který zůstane lokální pro uzel?
5. Jaké období kompatibility je vyžadováno pro přerušenou nebo vrácenou migraci repozitáře?

Dokud nebudou tyto otázky vyřešeny, je tento dokument pouze návrhem a nepředpokládá se žádná refaktorizace běhového prostředí.
