# ADR: Pluggable persistence boundary (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Olek:** Kavandatud — enne käituskeskkonna töö alustamist on vaja hooldaja kinnitust
- **Jälgimisülesanne:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Ulatus:** Ainult püsivusarhitektuur; see otsus ei lisa ega vali välist andmebaasi

## Kontekst

OmniRoute pakub praegu domeenipõhiseid püsivusfunktsioone asukohast `src/lib/db/`, samas kui
faili `src/lib/db/core.ts` tagastatav jagatud ühendus rakendab failis `src/lib/db/adapters/types.ts`
määratletud sünkroonset `SqliteAdapter` lepingut. See adapter toetab mitut SQLite'i käituskeskkonda,
kuid selle liides jääb SQLite'i-keskseks: sünkroonsed ettevalmistatud laused, `pragma`, edasilükatud ja
kohesed transaktsioonid, natiivne/faili kopeerimisel põhinev varundamine, kontrollpunkt ning kohaliku
andmebaasi pidem.

Praegune käivitus- ja taasteprotsess haldab ka SQLite'i faili elutsüklit. `src/lib/db/core.ts`
määrab faili `storage.sqlite` asukoha, hoiab üht protsessiülest adapterit, loob WAL-i kontrollpunkte,
säilitab taastamise ajal valitud tabelid ning eemaldab andmebaasi uuesti loomisel SQLite'i
kaasfailid. Draiveri valimine failis `src/lib/db/adapters/driverFactory.ts` valib toetatud SQLite'i
käituskeskkondade vahel; see ei ole väliste taustsüsteemide abstraktsioon.

Skeemi arendamine on samamoodi tihedalt seotud. `src/lib/db/migrationRunner.ts` rakendab nummerdatud
SQL-faile, kontrollib `sqlite_master` ja `PRAGMA table_info` kaudu, tuvastab valikulise FTS5 toe ning
käitab migratsioonitööd SQLite'i transaktsioonides. Operatsioonimoodulid, nagu `src/lib/db/backup.ts`
ja `src/lib/db/optimizationSettings.ts`, kasutavad otseselt varundamise, `PRAGMA`, WAL-i, lehekülje
suuruse, automaatse vaakumkoristuse ja `VACUUM` semantikat.

Need on sisseehitatud SQLite'i juurutuse sobivad omadused. Need peaksid jääma kättesaadavaks, ilma et
PostgreSQL või MySQL oleks sunnitud SQLite'i API-t emuleerima.

## Otsus

Võtta teisaldatava püsioleku jaoks kasutusele kahetasandiline püsivuspiir:

1. **Domeenirepositooriumide lepingud** määratlevad äri- ja marsruutimiskoodi jaoks vajalikud
   püsivustoimingud. Kutsujad sõltuvad domeeni käitumisest ja domeeniandmetest, mitte SQL-tekstist,
   ettevalmistatud lausetest, andmebaasifailidest ega dialektiobjektidest.
2. **Sisemine asünkroonne taustsüsteemi leping** toetab repositooriumide teostusi
   transaktsioonikontekstide, tervise-/valmisolekukontrolli, migratsioonide koordineerimise,
   taustsüsteemi võimekuste ja klassifitseeritud vigadega. Täpne TypeScripti liides esitatakse koos
   esimese teostuse PR-iga ja tõendatakse vastavustestidega; see ADR ei fikseeri tahtlikult
   spekulatiivset API-t.

SQLite jääb vaikimisi teostuseks. Olemasolev SQLite'i draiverite valikuahel ja sünkroonne
`SqliteAdapter` jäävad SQLite'i repositooriumiteostuse taha, samal ajal kui domeenid migreeritakse
väikeste vertikaalsete lõikudena. Üheltki kasutajalt ei nõuta välise teenuse seadistamist.

PostgreSQL on esimene kavandatud väline teostus pärast seda, kui repositooriumipiir on SQLite'i
suhtes tõendatud. MySQL lisatakse seejärel sama vastavustestide komplekti suhtes võrdväärse
teostusena, mitte teise äriloogika haruna.

## Piirireeglid

### Teisaldatava repositooriumi liides

Teisaldatav repositoorium võib pakkuda järgmist:

- domeeni lugemis- ja kirjutamistoimingud;
- selgesõnalised atomaarsed toimingud ja transaktsiooni ulatusega ligipääs repositooriumile;
- võrdlemis-/uuendamis- või renditoimingud, kui konkurentsuse semantika on domeeni osa;
- taustsüsteemist sõltumatu lehekülgjaotus, järjestamine ja piirangutega seotud vead.

Taustsüsteemi tervise- ja valmisolekukontroll ning migratsioonide koordineerimine kuuluvad sisemisse
taustsüsteemi-/operatsioonilepingusse, mitte üksikutesse domeenirepositooriumidesse.

Teisaldatav repositoorium ei tohi pakkuda järgmist:

- `prepare`, `get`, `all`, `run` ega draiverite toorpidemed;
- `PRAGMA`, WAL-i kontrollpunktirežiimid, `VACUUM` ega lehekülje/vahemälu häälestamine;
- SQLite'i failiteed, kaasfailid ega faili kopeerimisel põhinev varundamine;
- `lastInsertRowid` taustsüsteemideülese domeenilepinguna;
- FTS5 või `sqlite-vec` süntaks;
- üldine dialekti väljapääsutee, mida kasutab tavapärane äriloogika.

### Taustsüsteemi võimekuste liides

Taustsüsteemispetsiifiline käitumine jääb selgesõnaliseks ja leitavaks. Ainult SQLite'ile omane
hooldus jääb selle enda teostuse ja operatsiooniliidese taha, sealhulgas:

- käitusaegne draiveri valimine;
- WAL-i kontrollpunkt ja SQLite'i sulgemiskäitumine;
- lehekülje suuruse, vahemälu suuruse ja automaatse vaakumkoristuse sätted;
- andmebaasifaili varundamine, taastamine ja avariitaaste;
- SQLite'i skeemi introspektsioon;
- FTS5 ja `sqlite-vec` integratsioon.

Väliselt taustsüsteemilt ei nõuta nende funktsioonide jäljendamist. Repositooriumid peavad kas
kasutama teisaldatavat võimekust, pakkuma dokumenteeritud käitumisega taustsüsteemispetsiifilist
teostust või teatama, et võimekus pole saadaval.

## Tehingu- ja migratsioonimudel

Hoidla API-d määratlevad atomaarse äritoimingu; väljakutsujad ei vali SQL-i tehingurežiimi.
Iga toiming peab määratlema oma jälgitavad konkurentsuse garantiid: kaitstud invariandid, konfliktide
tuvastamise, korduskatsete klassifikatsiooni, idempotentsuse nõuded ja tehingukonteksti edastamise.
Teostused võivad kasutada erinevaid tehingu- ja isolatsioonimehhanisme ainult siis, kui nende jälgitavad
garantiid jäävad samaväärseks. SQLite võib jätkata sisemiselt oma praeguse edasilükatud või kohese
tehingukäitumise kasutamist, kui see vastab toimingu lepingule.

Välised taustsüsteemid nõuavad migratsioonide selgelt määratud omanikku, et mitu rakenduse replikaati
ei saaks sama skeemimuudatuse pärast võistelda. Taustsüsteemide migratsiooniajalood võivad jagada
loogilisi verstaposte, kuid SQLite'i SQL-faile ei käsitleta teise dialekti jaoks porditavate ega
korduskasutatavatena.

## Taustsüsteemideülese vastavuse semantika

Vastavustestid peavad hõlmama käitumist, mitte ainult hoidla meetodite signatuure. Iga migreeritud
domeen peab määratlema ja kontrollima järgmist:

- ajatemplite ajavöönd, täpsus ja serialiseerimine;
- `NULL`-väärtuste järjestamine, kollatsioon ja tõstutundlikkuse nõuded;
- JSON-i esitus- ja võrdluskäitumine;
- täisarvude, kümnendarvude ja rahaliste väärtuste täpsus;
- stabiilne järjestus ja deterministlikud viigimurdjad lehekülgjaotuse jaoks;
- ID-de genereerimine ilma SQLite'i rea-ID-dele tuginemata;
- unikaalsus- ja välisvõtmepiirangute rikkumiste klassifikatsioon;
- mõjutatud ridadega seotud käitumine muudatuseta, võrdlemis-/uuendamis- ja kustutamistoimingute puhul;
- samaaegsete kirjutamiste tulemused, korratavad konfliktid ja idempotentsed korduskatsed.

Kui domeeni jaoks ei saa määratleda samaväärset jälgitavat semantikat, ei ole see veel porditav ja peab
jääma taustsüsteemispetsiifiliseks, kuni vastav leping on välja töötatud.

## Ühilduvusnõuded

Kõik seda ADR-i järgivad teostused peavad säilitama järgmised omadused:

- SQLite jääb nullkonfiguratsiooniga vaikevalikuks.
- Olemasolevad SQLite'i failid ja migratsiooniajalugu jäävad loetavaks.
- npm-i, Electroni, Dockeri ja piiratud käituskeskkonna SQLite'i varumehhanismid säilitavad oma praeguse käivitustee.
- Salvestatud teenusepakkuja identimisteave kasutab jätkuvalt rakenduse olemasolevat krüptimiskäitumist.
- Hoidla migratsioon ei muuda märkamatult marsruutimise, kvootide, API-võtmete ega auditeerimise semantikat.
- Varundus- ja taastekäitumine dokumenteeritakse taustsüsteemide kaupa, mitte ei esitata universaalsena.
- Puhas ainult SQLite'i kasutav install ei laadi ega nõua välise andmebaasi draiverit.

## Tarnejärjekord

1. Avaldage eraldi ülevaatusartefaktina reprodutseeritav SQLite'i sõltuvuste inventuur.
2. Võtke kasutusele esimeste domeenide hoidlalepingud ja vastavustestid.
3. Kohandage olemasolev SQLite'i teostus nende lepingute taha ilma vaikeväärtusi muutmata.
4. Hooldajate heakskiidul lisage PostgreSQL esimese välise teostusena ühe
   piiritletud juhtimistasandi osa jaoks.
5. Laiendage jagatud olekut alles pärast samaaegse kirjutamise ja migratsioonide omandiõiguse testide olemasolu.
6. Lisage enne andmebaasi vahetamise väljakuulutamist võrguühenduseta valideeritud migratsioonitee SQLite'ist välisesse andmebaasi.
7. Lisage MySQL, tuginedes tõendatud hoidla- ja taustsüsteemilepingutele.

Iga käituskeskkonna etapp on eraldiseisev ja ülevaadatav PR. Hilisemat etappi ei tohi kasutada varasemas
etapis tõendamata abstraktsiooni ühendamise põhjendamiseks.

## Esimene juurutusetapp

Esimene käitusaegne etapp tuleb valida pärast seoste inventuuri ülevaatamist. Pakkujate
ühendused, API-võtmed, kombinatsioonid ja marsruutimise konfiguratsioon on kandidaadid, sest nende baastabelid
on nähtavad failis `src/lib/db/core.ts`, kuid see ADR ei kiida heaks tabelite loendit ega migratsiooni PR-i.
Etapp peab sisaldama järgmist:

- SQLite'i käitumise säilimist kontrollivad testid;
- hoidla vastavustestid;
- selgesõnalised tehingupiirid;
- salvestatud identimisteabe krüptimise ja redigeerimise kontroll;
- vaikekäivituse konfiguratsiooni ei muudeta.

## Kaalutud alternatiivid

### PostgreSQL-i lisamine `SqliteAdapter`-i alla

Tagasi lükatud. `SqliteAdapter` on SQLite'i käituskeskkondade ühilduvuskiht ja pakub SQLite'i-spetsiifilisi
toiminguid. Selle liidese emuleerimine tooks uude
taustsüsteemi sünkroonsed ja dialektispetsiifilised eeldused.

### Üldise päringu-/käivitus-API avaldamine kõigile domeenidele

Peamise piirina tagasi lükatud. See tsentraliseeriks ühenduste haldamise, kuid jätaks SQL-i dialekti,
tehingute ja tabelite seosed ärimoodulitesse. Madala taseme taustsüsteemi primitiiv võib paikneda
hoidlate teostustes, kuid mitte rakendusele suunatud püsivus-API-na.

### Kogu püsivuskihi ümberkirjutamine enne ühe etapi valideerimist

Tagasi lükatud. Praegune püsivuskiht on ulatuslik ning hõlmab failide elutsüklit, taastamist, otsingut
ja käitussätteid. Vertikaalsed etapid tagavad ülevaadatava käitumise ja tagasipööramise piirid.

### SQLite'i asendamine vaikevalikuna

Tagasi lükatud. Manustatud ja töölauarakenduste juurutused sõltuvad praegusest käivitusmudelist, mis ei nõua eraldi teenust. Väline
taustsüsteem on valikuline.

### Redise kasutamine püsiva esmase andmeallikana

Tagasi lükatud. Redis võib toetada selgesõnaliselt efemeerset koordineerimist, vahemälu või loendureid, kuid see ei
asenda siin kirjeldatud püsiva hoidla lepingut.

## Tagajärjed

### Positiivsed

- Ärikood saab stabiilse püsivusliidese, mis ei sõltu andmebaasi dialektist.
- SQLite'i käitumist testitakse enne, kui väline taustsüsteem abstraktsiooni määratleb.
- PostgreSQL ja MySQL jagavad lepinguid ja teste, selle asemel et domeeniloogikat dubleerida.
- Ainult SQLite'ile omased võimalused jäävad esmaklassiliseks, selle asemel et muutuda lekkivateks ühilduvuskihtideks.
- Mitme replika migratsiooni- ja tehingukäitumine muutub selgesõnaliseks disainiküsimuseks.

### Kulud ja riskid

- Hoidlate eraldamine nõuab väljakutsekohtade järkjärgulist migreerimist.
- Asünkroonsed piirid võivad levida praegu sünkroonsesse teenusekoodi.
- Taustsüsteemideülese semantika kontrollimiseks on vaja vastavusteste, mis ulatuvad SQL-i süntaksi ühilduvusest kaugemale.
- Varundamine, otsing, vektorsalvestus ja hooldus jäävad võimekuspõhiseks.
- Rohkem kui ühe püsivuskihi teostuse käitamine suurendab CI ja käitustoe kulusid.

## Mitte-eesmärgid

See ADR ei:

- lisa andmebaasisõltuvust, keskkonnamuutujat, skeemi ega migratsiooni;
- muuda kasutusel olevat SQLite'i singletoni ega draiverite kaskaadi;
- luba PostgreSQL-i või MySQL-i tuge konkreetses väljalaskes;
- muuda FTS5-t, `sqlite-vec`-i, varundusfaile ega SQLite'i hooldust portatiivseks;
- määratle aktiiv-aktiivvalmidust enne jagatud oleku ja koordineerimise testide olemasolu;
- kiida heaks kataloogi `src/lib/db/` ühekorraga ümberkirjutamist.

## Lahtised küsimused hooldaja heakskiidu saamiseks

1. Kas eelistatud suund on repositoorium koos sisemise asünkroonse taustsüsteemi piiriga või peaks
   väline püsimälu asuma eraldi juhtimistasandi teenuse taga?
2. Kas PostgreSQL sobib esimeseks väliseks teostuseks pärast SQLite'i vastavuse tagamist?
3. Milline domeen peaks olema esimene piiritletud repositooriumiosa?
4. Millist olekut tuleb esimese mitme replika verstaposti jaoks jagada ja milline jääb sõlmepõhiseks?
5. Millist ühilduvusperioodi nõutakse katkestatud või tagasipööratud repositooriumi migratsiooni korral?

Kuni need küsimused pole lahendatud, on see dokument ettepanek ja see ei eelda käitusaegset refaktoreerimist.
