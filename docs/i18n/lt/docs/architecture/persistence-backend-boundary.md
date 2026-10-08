# ADR: Pluggable persistence boundary (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Būsena:** Siūloma — prieš pradedant vykdymo aplinkos darbus reikalingas prižiūrėtojo patvirtinimas
- **Sekimo užduotis:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Apimtis:** Tik išliekamumo architektūra; šiuo sprendimu nepridedama ir nepasirenkama išorinė duomenų bazė

## Kontekstas

Šiuo metu „OmniRoute“ teikia į domeną orientuotas išliekamumo funkcijas iš `src/lib/db/`, o bendras ryšys, kurį grąžina `src/lib/db/core.ts`, įgyvendina sinchroninę `SqliteAdapter` sutartį, apibrėžtą `src/lib/db/adapters/types.ts`. Šis adapteris palaiko kelias SQLite vykdymo aplinkas, tačiau jo sąsaja išlieka pritaikyta SQLite: sinchroniniai paruošti teiginiai, `pragma`, atidėtosios ir neatidėliotinos operacijos, savasis arba failo kopijavimu pagrįstas atsarginių kopijų kūrimas, kontrolinių taškų kūrimas ir vietinės duomenų bazės deskriptorius.

Dabartinis paleidimo ir atkūrimo procesas taip pat valdo SQLite failo gyvavimo ciklą. `src/lib/db/core.ts` nustato `storage.sqlite` vietą, prižiūri vieną visam procesui bendrą adapterį, kuria WAL kontrolinius taškus, atkūrimo metu išsaugo pasirinktas lenteles ir, iš naujo kurdamas duomenų bazę, pašalina SQLite lydimuosius failus. Tvarkyklės parinkimas faile `src/lib/db/adapters/driverFactory.ts` pasirenka vieną iš palaikomų SQLite vykdymo aplinkų; tai nėra išorinių posistemių abstrakcija.

Schemos evoliucija yra panašiai glaudžiai susieta. `src/lib/db/migrationRunner.ts` pritaiko sunumeruotus SQL failus, tikrina `sqlite_master` ir `PRAGMA table_info`, aptinka pasirinktinį FTS5 palaikymą ir vykdo migravimo darbus SQLite operacijose. Tokie operaciniai moduliai kaip `src/lib/db/backup.ts` ir `src/lib/db/optimizationSettings.ts` tiesiogiai naudoja atsarginių kopijų kūrimo, `PRAGMA`, WAL, puslapio dydžio, automatinio sutankinimo ir `VACUUM` semantiką.

Tai yra tinkamos įterptosios SQLite diegimo konfigūracijos savybės. Jos turėtų likti prieinamos neverčiant PostgreSQL ar MySQL imituoti SQLite API.

## Sprendimas

Pritaikyti dviejų lygių išliekamumo ribą perkeliamai ilgalaikei būsenai:

1. **Domeno saugyklų sutartys** apibrėžia verslo ir maršruto parinkimo kodui reikalingas išliekamumo operacijas. Kviečiantis kodas priklauso nuo domeno elgsenos ir domeno duomenų, o ne nuo SQL teksto, paruoštų teiginių, duomenų bazės failų ar dialekto objektų.
2. **Vidinė asinchroninė posistemio sutartis** palaiko saugyklų realizacijas, suteikdama operacijų kontekstus, būklės ir parengties tikrinimą, migracijų koordinavimą, posistemio galimybes ir klasifikuotas klaidas. Tiksli TypeScript sąsaja bus pasiūlyta kartu su pirmąja realizacijos PR ir patvirtinta atitikties testais; šiuo ADR sąmoningai neįtvirtinama spekuliatyvi API.

SQLite lieka numatytąja realizacija. Esama SQLite tvarkyklių pasirinkimo seka ir sinchroninis `SqliteAdapter` lieka paslėpti už SQLite saugyklos realizacijos, o domenai perkeliami nedideliais vertikaliais pjūviais. Nė vienas naudotojas neprivalo konfigūruoti išorinės paslaugos.

PostgreSQL yra pirmoji siūloma išorinė realizacija po to, kai saugyklos riba bus patikrinta su SQLite. MySQL vėliau įgyvendinama kaip lygiavertė realizacija pagal tą patį atitikties testų rinkinį, o ne kaip antroji verslo logikos atšaka.

## Ribos taisyklės

### Perkeliama saugyklos sąsaja

Perkeliama saugykla gali teikti:

- domeno skaitymo ir rašymo operacijas;
- aiškiai apibrėžtas atomines operacijas ir operacijos aprėptyje pasiekiamą saugyklą;
- palyginimo ir atnaujinimo arba nuomos operacijas, kai lygiagretumo semantika yra domeno dalis;
- nuo posistemio nepriklausomą puslapių skaidymą, rikiavimą ir apribojimų klaidas.

Posistemio būklės bei parengties tikrinimas ir migracijų koordinavimas priklauso vidinei posistemio ar operacinei sutarčiai, o ne atskiroms domeno saugykloms.

Perkeliama saugykla negali teikti:

- `prepare`, `get`, `all`, `run` ar neapdorotų tvarkyklės deskriptorių;
- `PRAGMA`, WAL kontrolinių taškų režimų, `VACUUM` ar puslapių ir podėlio derinimo;
- SQLite failų kelių, lydimųjų failų ar failo kopijavimu pagrįsto atsarginių kopijų kūrimo;
- `lastInsertRowid` kaip keliems posistemiams bendros domeno sutarties;
- FTS5 ar `sqlite-vec` sintaksės;
- bendrosios dialekto apėjimo priemonės, naudojamos įprastame verslo kode.

### Posistemio galimybių sąsaja

Posistemiui būdinga elgsena lieka aiškiai išreikšta ir aptinkama. Tik SQLite skirta priežiūra lieka paslėpta už atskiros realizacijos ir operacinės sąsajos, įskaitant:

- vykdymo aplinkos tvarkyklės parinkimą;
- WAL kontrolinių taškų kūrimą ir SQLite išjungimo elgseną;
- puslapio dydžio, podėlio dydžio ir automatinio sutankinimo nuostatas;
- duomenų bazės failo atsarginės kopijos kūrimą, atkūrimą iš atsarginės kopijos ir atkūrimą po gedimo;
- SQLite schemos introspekciją;
- FTS5 ir `sqlite-vec` integraciją.

Išorinis posistemis neprivalo imituoti šių funkcijų. Saugyklos turi naudoti perkeliamą galimybę, pateikti posistemiui būdingą realizaciją su dokumentuota elgsena arba pranešti, kad galimybė nepasiekiama.

## Transakcijų ir migracijų modelis

Saugyklos API apibrėžia atominę verslo operaciją; kviečiančioji šalis nepasirenka SQL transakcijos režimo.
Kiekviena operacija turi apibrėžti savo stebimas lygiagretumo garantijas: apsaugotus invariantus, konfliktų
aptikimą, pakartotinių bandymų klasifikavimą, idempotentiškumo lūkesčius ir transakcijos konteksto perdavimą.
Įgyvendinimuose gali būti naudojami skirtingi transakcijų ir izoliavimo mechanizmai tik tada, kai tos stebimos
garantijos išlieka lygiavertės. SQLite viduje gali ir toliau naudoti dabartinę atidėtųjų arba neatidėliotinų
transakcijų elgseną, kai ji atitinka operacijos sutartį.

Išorinėms duomenų bazėms būtina aiškiai apibrėžta migracijų nuosavybė, kad kelios programos replikos
negalėtų vienu metu vykdyti to paties schemos pakeitimo. Skirtingų duomenų bazių migracijų istorijose gali
būti bendri loginiai etapai, tačiau nelaikoma, kad SQLite SQL failai yra perkeliami ar pakartotinai naudojami
su kitu dialektu.

## Atitikties semantika skirtingose duomenų bazėse

Atitikties testai turi apimti elgseną, o ne tik saugyklos metodų signatūras. Kiekvienai perkeltai domeno
sričiai turi būti apibrėžta ir patikrinta:

- laiko žymų laiko juosta, tikslumas ir serializavimas;
- `NULL` rikiavimas, rūšiavimo taisyklės ir lūkesčiai dėl didžiųjų bei mažųjų raidžių skyrimo;
- JSON pateikimas ir palyginimo elgsena;
- sveikųjų skaičių, dešimtainių skaičių ir piniginių reikšmių tikslumas;
- stabilus rikiavimas ir deterministiniai vienodų reikšmių atskyrimo kriterijai puslapiavimui;
- ID generavimas nesiremiant SQLite eilučių ID;
- unikalumo ir išorinių raktų pažeidimų klasifikavimas;
- paveiktų eilučių elgsena operacijoms, kurios nieko nekeičia, palyginimo / atnaujinimo ir šalinimo operacijoms;
- lygiagretaus rašymo rezultatai, pakartotinai bandytini konfliktai ir idempotentiški pakartotiniai bandymai.

Jei domeno sričiai negalima apibrėžti lygiavertės stebimos semantikos, ji dar nėra perkeliama ir turi likti
specifinė konkrečiai duomenų bazei, kol bus suprojektuota tokia sutartis.

## Suderinamumo reikalavimai

Bet koks šiuo ADR besivadovaujantis įgyvendinimas turi išsaugoti šias savybes:

- SQLite išlieka numatytuoju pasirinkimu, kuriam nereikia konfigūracijos.
- Esami SQLite failai ir migracijų istorija išlieka nuskaitomi.
- npm, Electron, Docker ir ribotos vykdymo aplinkos SQLite atsarginiai mechanizmai išlaiko dabartinį paleidimo kelią.
- Išsaugoti paslaugų teikėjų prisijungimo duomenys ir toliau naudoja esamą programos šifravimo mechanizmą.
- Saugyklos migracija nepastebimai nepakeičia maršrutizavimo, kvotų, API raktų ar audito semantikos.
- Atsarginių kopijų kūrimo ir atkūrimo elgsena dokumentuojama kiekvienai duomenų bazei atskirai, o ne pateikiama kaip universali.
- Švari tik SQLite naudojanti diegtis neįkelia ir nereikalauja išorinės duomenų bazės tvarkyklės.

## Įgyvendinimo seka

1. Kaip atskirą peržiūros artefaktą paskelbti atkuriamą SQLite susiejimų inventorių.
2. Įdiegti pirmąsias domeno saugyklų sutartis ir atitikties testus.
3. Pritaikyti esamą SQLite įgyvendinimą šioms sutartims nekeičiant numatytųjų nustatymų.
4. Gavus prižiūrėtojų patvirtinimą, pridėti PostgreSQL kaip pirmąjį išorinį įgyvendinimą vienai
   aiškiai apribotai valdymo plokštumos sričiai.
5. Bendrinamą būseną plėsti tik sukūrus lygiagretaus rašymo ir migracijų nuosavybės testus.
6. Prieš skelbiant apie galimybę perjungti duomenų bazes, pridėti autonominį, patikrintą migravimo iš SQLite į išorinę duomenų bazę būdą.
7. Pridėti MySQL pagal patikrintas saugyklos ir duomenų bazės sutartis.

Kiekvienas vykdymo aplinkos žingsnis yra atskiras, peržiūrimas PR. Vėlesnis žingsnis negali būti naudojamas
nepatikrintos abstrakcijos sujungimui ankstesniame žingsnyje pagrįsti.

## Pirmasis įgyvendinimo etapas

Pirmasis vykdymo aplinkos etapas turėtų būti pasirinktas peržiūrėjus susiejimų inventorių. Teikėjų
ryšiai, API raktai, kombinacijos ir maršrutizavimo konfigūracija yra galimi kandidatai, nes jų bazinės lentelės
matomos faile `src/lib/db/core.ts`, tačiau šis ADR nepatvirtina lentelių sąrašo ar migracijos PR.
Etapas turi apimti:

- SQLite elgsenos išsaugojimo testus;
- saugyklų atitikties testus;
- aiškias operacijų ribas;
- saugomų prisijungimo duomenų šifravimo ir maskavimo patikrą;
- jokių numatytosios paleidimo konfigūracijos pakeitimų.

## Svarstytos alternatyvos

### Pridėti PostgreSQL po `SqliteAdapter`

Atmesta. `SqliteAdapter` yra SQLite vykdymo aplinkų suderinamumo sluoksnis, teikiantis SQLite būdingas
operacijas. Imituojant šią sąsają, sinchroninės ir konkrečiai SQL tarmei būdingos prielaidos prasiskverbtų į
naują vidinę sistemą.

### Visoms sritims pateikti bendrąją užklausų / vykdymo API

Atmesta kaip pagrindinė riba. Tai centralizuotų ryšių valdymą, tačiau SQL tarmės,
operacijų ir lentelių susiejimai liktų verslo moduliuose. Žemo lygio vidinės sistemos primityvas gali būti naudojamas
saugyklų realizacijose, bet ne kaip programai skirta duomenų išlaikymo API.

### Perrašyti visą duomenų išlaikymo sluoksnį prieš patikrinant vieną etapą

Atmesta. Dabartinė duomenų išlaikymo sąsaja yra plati ir apima failų gyvavimo ciklą, atkūrimą, paiešką
bei operacinius nustatymus. Vertikalūs etapai suteikia aiškias elgsenos peržiūros ir grąžinimo į ankstesnę būseną ribas.

### Pakeisti SQLite kaip numatytąjį sprendimą

Atmesta. Įterptosios ir darbalaukio diegimo aplinkos priklauso nuo dabartinio paleidimo modelio, kuriam nereikia jokios išorinės tarnybos. Išorinė vidinė sistema yra pasirenkama.

### Naudoti Redis kaip patikimą ilgalaikių duomenų šaltinį

Atmesta. Redis gali palaikyti aiškiai laikiną koordinavimą, podėlį ar skaitiklius, tačiau jis
nepakeičia čia aprašytos ilgalaikės saugyklos sutarties.

## Pasekmės

### Teigiamos

- Verslo kodas įgyja stabilią, nuo duomenų bazės SQL tarmės nepriklausomą duomenų išlaikymo ribą.
- SQLite elgsena ištestuojama prieš išorinei vidinei sistemai apibrėžiant abstrakciją.
- PostgreSQL ir MySQL naudoja bendras sutartis ir testus, užuot dubliavusios srities logiką.
- Tik SQLite būdingos galimybės išlieka visavertės, užuot tapusios pralaidžiais suderinamumo tarpiniais sluoksniais.
- Migravimo ir operacijų elgsena naudojant kelias replikas tampa aiškiai apibrėžtu projektavimo aspektu.

### Sąnaudos ir rizikos

- Saugyklų išskyrimui reikia palaipsniui migruoti iškvietimo vietas.
- Asinchroninės ribos gali išplisti į šiuo metu sinchroninį tarnybų kodą.
- Skirtingų vidinių sistemų semantikai reikia atitikties testų, neapsiribojančių SQL sintaksės suderinamumu.
- Atsarginių kopijų kūrimas, paieška, vektorių saugojimas ir priežiūra išlieka priklausomi nuo konkrečių galimybių.
- Daugiau nei vienos duomenų išlaikymo realizacijos naudojimas didina CI ir operacinio palaikymo sąnaudas.

## Ne tikslai

Šis ADR:

- neprideda duomenų bazės priklausomybės, aplinkos kintamojo, schemos ar migracijos;
- nekeičia aktyvaus SQLite vienetinio egzemplioriaus ar tvarkyklių kaskados;
- nežada PostgreSQL ar MySQL palaikymo konkrečioje laidoje;
- nepadaro FTS5, `sqlite-vec`, atsarginių kopijų failų ar SQLite priežiūros perkeliamų;
- neapibrėžia aktyvaus–aktyvaus režimo parengties, kol nėra bendros būsenos ir koordinavimo testų;
- nepatvirtina vienkartinio viso `src/lib/db/` perrašymo.

## Atviri klausimai, kuriems reikalingas prižiūrėtojo patvirtinimas

1. Ar saugykla kartu su vidine asinchroninės galinės sistemos riba yra pageidaujama kryptis, ar išorinis išliekamumas turėtų būti užtikrinamas per atskirą valdymo lygmens paslaugą?
2. Ar PostgreSQL priimtina kaip pirmoji išorinė realizacija po atitikties SQLite?
3. Kuri sritis turėtų būti pirmoji apribota saugyklos dalis?
4. Kokia būsena turi būti bendrinama pasiekus pirmąjį kelių replikų etapą, o kuri turi likti lokali mazgui?
5. Koks suderinamumo laikotarpis reikalingas, jei saugyklos migracija nutraukiama arba atšaukiama?

Kol šie klausimai neišspręsti, šis dokumentas yra pasiūlymas ir nenumato jokio vykdymo aplinkos pertvarkymo.
