# ADR: Pluggable persistence boundary (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Stav:** Navrhované — pred začatím prác na runtime sa vyžaduje schválenie správcom
- **Sledovací problém:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Rozsah:** Iba architektúra perzistencie; toto rozhodnutie nepridáva ani nevyberá externú databázu

## Kontext

OmniRoute v súčasnosti poskytuje doménovo orientované funkcie perzistencie z `src/lib/db/`, zatiaľ čo
zdieľané pripojenie vrátené z `src/lib/db/core.ts` implementuje synchrónny kontrakt `SqliteAdapter`
v `src/lib/db/adapters/types.ts`. Tento adaptér podporuje viacero runtime prostredí SQLite, jeho
rozhranie však naďalej zodpovedá SQLite: synchrónne pripravené príkazy, `pragma`, odložené a okamžité
transakcie, natívne zálohovanie alebo zálohovanie kopírovaním súboru, kontrolné body a lokálny databázový handle.

Aktuálny proces spúšťania a obnovy zároveň riadi životný cyklus súboru SQLite. `src/lib/db/core.ts`
určuje umiestnenie `storage.sqlite`, udržiava jeden adaptér globálny pre celý proces, vytvára kontrolné
body WAL, počas obnovy zachováva vybrané tabuľky a pri opätovnom vytváraní databázy odstraňuje
sprievodné súbory SQLite. Výber ovládača v `src/lib/db/adapters/driverFactory.ts` vyberá spomedzi
podporovaných runtime prostredí SQLite; nejde o abstrakciu externého backendu.

Vývoj schémy je previazaný podobným spôsobom. `src/lib/db/migrationRunner.ts` aplikuje očíslované súbory SQL,
kontroluje `sqlite_master` a `PRAGMA table_info`, zisťuje voliteľnú podporu FTS5 a vykonáva
migračné operácie v transakciách SQLite. Prevádzkové moduly, ako napríklad `src/lib/db/backup.ts` a
`src/lib/db/optimizationSettings.ts`, priamo používajú zálohovanie, `PRAGMA`, WAL, veľkosť stránok,
automatické uvoľňovanie priestoru a sémantiku `VACUUM`.

Ide o platné vlastnosti nasadenia so zabudovanou databázou SQLite. Mali by zostať dostupné bez toho,
aby boli PostgreSQL alebo MySQL nútené emulovať API SQLite.

## Rozhodnutie

Prijať dvojúrovňové rozhranie perzistencie pre prenositeľný trvalý stav:

1. **Kontrakty doménových repozitárov** definujú operácie perzistencie potrebné pre biznisovú a smerovaciu
   logiku. Volajúci závisia od doménového správania a doménových údajov, nie od textu SQL, pripravených
   príkazov, databázových súborov ani objektov dialektu.
2. **Interný asynchrónny kontrakt backendu** podporuje implementácie repozitárov pomocou
   transakčných kontextov, kontroly zdravia a pripravenosti, koordinácie migrácií, schopností backendu a
   klasifikovaných chýb. Presné rozhranie TypeScript bude navrhnuté v prvom implementačnom
   PR a overené testami zhody; toto ADR zámerne nefixuje špekulatívne API.

SQLite zostáva predvolenou implementáciou. Existujúca kaskáda ovládačov SQLite a synchrónny
`SqliteAdapter` zostávajú skryté za implementáciou repozitárov SQLite, zatiaľ čo domény budú migrované
v malých vertikálnych častiach. Od žiadneho používateľa sa nevyžaduje konfigurácia externej služby.

PostgreSQL je prvou navrhovanou externou implementáciou po overení rozhrania repozitárov
voči SQLite. MySQL bude nasledovať ako rovnocenná implementácia overovaná rovnakým súborom testov zhody,
nie ako druhá vetva biznisovej logiky.

## Pravidlá rozhrania

### Prenositeľné rozhranie repozitárov

Prenositeľný repozitár môže poskytovať:

- čítanie a zápis doménových údajov;
- explicitné atómové operácie a prístup k repozitárom v rozsahu transakcie;
- operácie porovnania/aktualizácie alebo prenájmu, ak je súbežnosť súčasťou sémantiky domény;
- stránkovanie, radenie a chyby obmedzení nezávislé od backendu.

Kontrola zdravia a pripravenosti backendu a koordinácia migrácií patria do interného backendového/prevádzkového
kontraktu, nie do jednotlivých doménových repozitárov.

Prenositeľný repozitár nesmie sprístupňovať:

- `prepare`, `get`, `all`, `run` ani nespracované handle ovládača;
- `PRAGMA`, režimy kontrolných bodov WAL, `VACUUM` ani ladenie stránok alebo vyrovnávacej pamäte;
- cesty k súborom SQLite, sprievodné súbory ani zálohovanie kopírovaním súborov;
- `lastInsertRowid` ako doménový kontrakt naprieč backendmi;
- syntax FTS5 alebo `sqlite-vec`;
- všeobecnú únikovú cestu cez dialekt používanú bežnou biznisovou logikou.

### Rozhranie schopností backendu

Správanie špecifické pre backend zostáva explicitné a zistiteľné. Údržba špecifická pre SQLite zostáva skrytá
za vlastnou implementáciou a prevádzkovým rozhraním vrátane:

- výberu runtime ovládača;
- kontrolných bodov WAL a správania pri ukončení SQLite;
- nastavení veľkosti stránok, veľkosti vyrovnávacej pamäte a automatického uvoľňovania priestoru;
- zálohovania, obnovy a zotavenia databázového súboru;
- introspekcie schémy SQLite;
- integrácie FTS5 a `sqlite-vec`.

Externý backend nemusí tieto funkcie napodobňovať. Repozitáre musia buď používať
prenositeľnú schopnosť, poskytnúť implementáciu špecifickú pre backend so zdokumentovaným správaním, alebo oznámiť,
že daná schopnosť nie je dostupná.

## Model transakcií a migrácií

API repozitárov definujú atómovú obchodnú operáciu; volajúci nevyberajú režim SQL transakcie.
Každá operácia musí definovať svoje pozorovateľné záruky súbežnosti: chránené invarianty, detekciu
konfliktov, klasifikáciu opakovaných pokusov, očakávania idempotencie a propagáciu kontextu transakcie.
Implementácie môžu používať odlišné mechanizmy transakcií a izolácie iba vtedy, ak zostanú tieto
pozorovateľné záruky rovnocenné. SQLite môže naďalej interne používať svoje súčasné odložené alebo
okamžité správanie transakcií tam, kde spĺňa kontrakt operácie.

Externé backendy vyžadujú explicitné vlastníctvo migrácií, aby viacero replík aplikácie nemohlo
súbežne vykonať rovnakú zmenu schémy. Histórie migrácií backendov môžu zdieľať logické míľniky,
ale nepredpokladá sa, že SQL súbory pre SQLite sú prenosné alebo opätovne použiteľné v inom dialekte.

## Sémantika zhody medzi backendmi

Testy zhody musia pokrývať správanie, nielen signatúry metód repozitára. Každá migrovaná doména
musí definovať a overovať:

- časové pásmo, presnosť a serializáciu časových pečiatok;
- očakávania týkajúce sa poradia hodnôt `NULL`, kolácie a rozlišovania veľkosti písmen;
- reprezentáciu JSON a správanie pri porovnávaní;
- presnosť celých čísel, desatinných čísel a peňažných hodnôt;
- stabilné zoradenie a deterministické rozhodovanie pri zhodách pre stránkovanie;
- generovanie ID bez spoliehania sa na ID riadkov SQLite;
- klasifikáciu porušení jedinečnosti a cudzích kľúčov;
- správanie počtu ovplyvnených riadkov pri operáciách bez zmeny, porovnania/aktualizácie a odstránenia;
- výsledky súbežných zápisov, konflikty umožňujúce opakovanie a idempotentné opakované pokusy.

Ak doména nedokáže stanoviť rovnocennú pozorovateľnú sémantiku, ešte nie je prenosná a musí zostať
špecifická pre backend, kým nebude tento kontrakt navrhnutý.

## Požiadavky na kompatibilitu

Každá implementácia podľa tohto ADR musí zachovať tieto vlastnosti:

- SQLite zostáva predvolenou voľbou bez potreby konfigurácie.
- Existujúce súbory SQLite a história migrácií zostávajú čitateľné.
- Záložné mechanizmy SQLite pre npm, Electron, Docker a obmedzené runtime prostredia si zachovajú svoju súčasnú cestu spustenia.
- Uložené prihlasovacie údaje poskytovateľov naďalej používajú existujúce šifrovanie aplikácie.
- Migrácia repozitára potichu nemení sémantiku smerovania, kvót, API kľúčov ani auditovania.
- Správanie zálohovania a obnovy je zdokumentované pre každý backend osobitne a nie je prezentované ako univerzálne.
- Čistá inštalácia používajúca iba SQLite nenačítava ani nevyžaduje ovládač externej databázy.

## Postup dodania

1. Publikovať reprodukovateľný inventár väzieb na SQLite ako samostatný artefakt na posúdenie.
2. Zaviesť prvé kontrakty doménových repozitárov a testy zhody.
3. Prispôsobiť existujúcu implementáciu SQLite týmto kontraktom bez zmeny predvolených nastavení.
4. So súhlasom správcov pridať PostgreSQL ako prvú externú implementáciu pre jednu
   ohraničenú časť riadiacej vrstvy.
5. Rozšíriť zdieľaný stav až po vytvorení testov súbežných zápisov a vlastníctva migrácií.
6. Pred propagovaním prepínania databáz pridať offline validovaný spôsob migrácie zo SQLite do externej databázy.
7. Pridať MySQL podľa overených kontraktov repozitára a backendu.

Každý krok týkajúci sa runtime prostredia predstavuje samostatný PR, ktorý možno nezávisle posúdiť. Neskorší krok sa nesmie používať na odôvodnenie zlúčenia
neoverenej abstrakcie v skoršom kroku.

## Prvý implementačný krok

Prvý krok implementácie runtime vrstvy sa má vybrať po preskúmaní inventára väzieb. Pripojenia
k poskytovateľom, API kľúče, kombinácie a konfigurácia smerovania sú kandidátmi, pretože ich základné tabuľky
sú viditeľné v `src/lib/db/core.ts`, táto ADR však neschvaľuje zoznam tabuliek ani PR migrácie.
Tento krok musí zahŕňať:

- testy zachovania správania SQLite;
- testy zhody repozitárov;
- explicitné hranice transakcií;
- overenie šifrovania a redigovania uložených prihlasovacích údajov;
- žiadnu zmenu predvolenej konfigurácie spúšťania.

## Zvažované alternatívy

### Pridať PostgreSQL pod `SqliteAdapter`

Zamietnuté. `SqliteAdapter` je vrstva kompatibility pre runtime prostredia SQLite a sprístupňuje operácie
špecifické pre SQLite. Emulácia tohto rozhrania by preniesla synchrónne predpoklady a predpoklady špecifické
pre daný dialekt do nového backendu.

### Sprístupniť všetkým doménam všeobecné API na dopytovanie a vykonávanie

Zamietnuté ako primárne rozhranie. Centralizovalo by spracovanie pripojení, ale ponechalo by väzby na
dialekt SQL, transakcie a tabuľky v obchodných moduloch. Nízkoúrovňová backendová primitíva môže existovať
vnútri implementácií repozitárov, nie však ako perzistenčné API určené pre aplikáciu.

### Prepísať celú perzistenčnú vrstvu pred overením jedného kroku

Zamietnuté. Súčasné perzistenčné rozhranie je rozsiahle a zahŕňa životný cyklus súborov, obnovu, vyhľadávanie
a prevádzkové nastavenia. Vertikálne kroky poskytujú kontrolovateľné správanie a hranice návratu k predchádzajúcemu stavu.

### Nahradiť SQLite ako predvolenú možnosť

Zamietnuté. Vstavané a desktopové nasadenia závisia od súčasného modelu spúšťania bez potreby služieb.
Externý backend je voliteľný.

### Použiť Redis ako autoritatívny zdroj trvalých dát

Zamietnuté. Redis môže podporovať explicitne dočasnú koordináciu, vyrovnávaciu pamäť alebo počítadlá, ale
nenahrádza tu opísaný kontrakt trvalého repozitára.

## Dôsledky

### Pozitíva

- Obchodný kód získa stabilné perzistenčné rozhranie nezávislé od databázového dialektu.
- Správanie SQLite sa otestuje skôr, než abstrakciu definuje externý backend.
- PostgreSQL a MySQL zdieľajú kontrakty a testy namiesto duplikovania doménovej logiky.
- Funkcie dostupné iba v SQLite zostávajú plnohodnotné namiesto toho, aby sa z nich stali netesné vrstvy kompatibility.
- Správanie migrácií a transakcií vo viacerých replikách sa stáva explicitnou súčasťou návrhu.

### Náklady a riziká

- Extrakcia repozitárov si vyžaduje postupnú migráciu miest volania.
- Asynchrónne hranice sa môžu rozšíriť do aktuálne synchrónneho kódu služieb.
- Sémantika naprieč backendmi si vyžaduje testy zhody nad rámec kompatibility syntaxe SQL.
- Zálohovanie, vyhľadávanie, vektorové úložisko a údržba zostávajú špecifické pre jednotlivé schopnosti.
- Prevádzka viac než jednej implementácie perzistenčnej vrstvy zvyšuje náklady na CI a prevádzkovú podporu.

## Neciele

Táto ADR:

- nepridáva databázovú závislosť, premennú prostredia, schému ani migráciu;
- nemení aktívny singleton SQLite ani kaskádu ovládačov;
- nesľubuje podporu PostgreSQL alebo MySQL v konkrétnom vydaní;
- nerobí FTS5, `sqlite-vec`, záložné súbory ani údržbu SQLite prenositeľnými;
- nedefinuje pripravenosť na režim active-active pred existenciou testov zdieľaného stavu a koordinácie;
- neschvaľuje jednorazové prepísanie `src/lib/db/`.

## Otvorené otázky na schválenie správcom

1. Je preferovaným smerovaním repozitár spolu s interným asynchrónnym rozhraním backendu, alebo má byť externá perzistencia umiestnená za samostatnou službou riadiacej roviny?
2. Je PostgreSQL prijateľný ako prvá externá implementácia po overení súladu so SQLite?
3. Ktorá doména má byť prvou ohraničenou časťou repozitára?
4. Ktorý stav musí byť zdieľaný pre prvý míľnik s viacerými replikami a ktorý má zostať lokálny pre uzol?
5. Aké obdobie kompatibility sa vyžaduje pri prerušenej alebo vrátenej migrácii repozitára?

Kým sa tieto otázky nevyriešia, tento dokument je návrhom a nepredpokladá sa žiadna refaktorizácia za behu.
