# ADR: Pluggable persistence boundary (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Statuss:** Ierosināts — pirms izpildlaika izstrādes sākšanas nepieciešams uzturētāja apstiprinājums
- **Izsekošanas problēma:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Tvērums:** Tikai persistences arhitektūra; šis lēmums nepievieno un neizvēlas ārēju datubāzi

## Konteksts

OmniRoute pašlaik nodrošina uz domēniem orientētas persistences funkcijas no `src/lib/db/`, savukārt
koplietotais savienojums, ko atgriež `src/lib/db/core.ts`, īsteno sinhrono `SqliteAdapter`
līgumu no `src/lib/db/adapters/types.ts`. Šis adapters atbalsta vairākas SQLite izpildvides, taču tā
saskarne joprojām ir veidota atbilstoši SQLite: sinhroni sagatavotie priekšraksti, `pragma`, atliktie un tūlītējie
darījumi, vietējā/faila kopēšanas dublēšana, kontrolpunkta izveide un lokāls datubāzes deskriptors.

Pašreizējais palaišanas un atkopšanas ceļš pārvalda arī SQLite faila dzīves ciklu. `src/lib/db/core.ts`
nosaka `storage.sqlite` atrašanās vietu, uztur vienu procesam globālu adapteru, izveido WAL kontrolpunktus, atkopšanas laikā saglabā atlasītās
tabulas un, no jauna izveidojot datubāzi, dzēš SQLite pavadošos failus. Draivera
atlase failā `src/lib/db/adapters/driverFactory.ts` izvēlas kādu no atbalstītajām SQLite izpildvidēm; tā
nav ārējas aizmugursistēmas abstrakcija.

Arī shēmas evolūcija ir līdzīgi cieši saistīta. `src/lib/db/migrationRunner.ts` lieto numurētus SQL failus,
pārbauda `sqlite_master` un `PRAGMA table_info`, nosaka neobligātā FTS5 atbalsta esamību un izpilda migrācijas
darbus SQLite darījumos. Operacionālie moduļi, piemēram, `src/lib/db/backup.ts` un
`src/lib/db/optimizationSettings.ts`, tieši izmanto dublēšanas, `PRAGMA`, WAL, lapas izmēra, automātiskās vakuumēšanas un `VACUUM`
semantiku.

Tās ir pamatotas iegultās SQLite izvietošanas īpašības. Tām ir jāpaliek pieejamām, nepiespiežot
PostgreSQL vai MySQL emulēt SQLite API.

## Lēmums

Pārnesamam pastāvīgi glabājamam stāvoklim ieviest divu līmeņu persistences robežu:

1. **Domēna repozitoriju līgumi** definē persistences operācijas, kas nepieciešamas biznesa un maršrutēšanas
   kodam. Izsaucēji ir atkarīgi no domēna darbības un domēna datiem, nevis SQL teksta, sagatavotajiem priekšrakstiem,
   datubāzes failiem vai dialekta objektiem.
2. **Iekšējs asinhrons aizmugursistēmas līgums** atbalsta repozitoriju implementācijas ar
   darījumu kontekstiem, darbspējas/gatavības pārbaudēm, migrāciju koordinēšanu, aizmugursistēmas iespējām un
   klasificētām kļūdām. Precīza TypeScript saskarne tiks ierosināta pirmajā implementācijas
   PR un apstiprināta ar atbilstības testiem; šis ADR ar nolūku nefiksē spekulatīvu API.

SQLite paliek noklusējuma implementācija. Esošā SQLite draiveru secīgās izvēles sistēma un sinhronais
`SqliteAdapter` paliek paslēpti aiz SQLite repozitorija implementācijas, kamēr domēni tiek migrēti
nelielās vertikālās daļās. Nevienam lietotājam nav obligāti jākonfigurē ārējs pakalpojums.

PostgreSQL ir pirmā ierosinātā ārējā implementācija pēc tam, kad repozitorija robeža ir
pārbaudīta ar SQLite. MySQL tai seko kā līdzvērtīga implementācija, kas izmanto to pašu atbilstības testu kopu,
nevis kā otrs biznesa loģikas atzars.

## Robežas noteikumi

### Pārnesama repozitorija saskarne

Pārnesams repozitorijs drīkst nodrošināt:

- domēna lasīšanas un rakstīšanas operācijas;
- skaidri definētas atomāras operācijas un piekļuvi repozitorijam darījuma tvērumā;
- salīdzināšanas/atjaunināšanas vai nomas operācijas, ja konkurences semantika ir daļa no domēna;
- no aizmugursistēmas neatkarīgu lapošanu, kārtošanu un ierobežojumu kļūdas.

Aizmugursistēmas darbspēja, gatavība un migrāciju koordinēšana ietilpst iekšējā aizmugursistēmas/operacionālajā
līgumā, nevis atsevišķos domēna repozitorijos.

Pārnesams repozitorijs nedrīkst nodrošināt:

- `prepare`, `get`, `all`, `run` vai neapstrādātus draiveru deskriptorus;
- `PRAGMA`, WAL kontrolpunktu režīmus, `VACUUM` vai lapu/kešatmiņas pielāgošanu;
- SQLite failu ceļus, pavadošos failus vai dublēšanu, kopējot failus;
- `lastInsertRowid` kā starpaizmugursistēmu domēna līgumu;
- FTS5 vai `sqlite-vec` sintaksi;
- vispārīgu dialekta apiešanas mehānismu, ko izmanto parastais biznesa kods.

### Aizmugursistēmas iespēju saskarne

Aizmugursistēmai specifiskā darbība paliek skaidri definēta un atrodama. Tikai SQLite paredzētā uzturēšana paliek aiz
savas implementācijas un operacionālās saskarnes, tostarp:

- izpildvides draivera atlase;
- WAL kontrolpunkta izveide un SQLite izslēgšanas darbība;
- lapas izmēra, kešatmiņas izmēra un automātiskās vakuumēšanas iestatījumi;
- datubāzes faila dublēšana, atjaunošana un atkopšana;
- SQLite shēmas introspekcija;
- FTS5 un `sqlite-vec` integrācija.

Ārējai aizmugursistēmai nav jāimitē šīs funkcijas. Repozitorijiem ir vai nu jāizmanto
pārnesama iespēja, jānodrošina aizmugursistēmai specifiska implementācija ar dokumentētu darbību, vai jāziņo,
ka iespēja nav pieejama.

## Transakciju un migrāciju modelis

Repozitoriju API definē atomāro biznesa operāciju; izsaucēji neizvēlas SQL transakcijas režīmu.
Katrai operācijai jādefinē tās novērojamās vienlaicīguma garantijas: aizsargātie invarianti, konfliktu
noteikšana, atkārtošanas klasifikācija, idempotences prasības un transakcijas konteksta pārmantošana.
Implementācijas drīkst izmantot atšķirīgus transakciju un izolācijas mehānismus tikai tad, ja šīs
novērojamās garantijas saglabājas līdzvērtīgas. SQLite iekšēji var turpināt izmantot pašreizējo atlikto
vai tūlītējo transakciju darbību, ja tā atbilst operācijas līgumam.

Ārējām aizmugursistēmām nepieciešama skaidri noteikta migrāciju pārvaldība, lai vairākas lietojumprogrammas
replikas nevarētu vienlaikus mēģināt veikt vienas un tās pašas shēmas izmaiņas. Aizmugursistēmu migrāciju
vēsturei var būt kopīgi loģiskie atskaites punkti, taču netiek pieņemts, ka SQLite SQL faili ir pārnesami
vai atkārtoti izmantojami citā dialektā.

## Starpaizmugursistēmu atbilstības semantika

Atbilstības testiem jāaptver darbība, ne tikai repozitoriju metožu signatūras. Katram migrētajam domēnam
jādefinē un jāpārbauda:

- laikspiedolu laika josla, precizitāte un serializācija;
- `NULL` kārtošanas secība, kolācija un reģistrjutības prasības;
- JSON attēlojums un salīdzināšanas darbība;
- veselu skaitļu, decimālskaitļu un naudas vērtību precizitāte;
- stabila kārtošana un deterministiski vienādu vērtību izšķiršanas kritēriji lapošanai;
- ID ģenerēšana, nepaļaujoties uz SQLite rindu ID;
- unikalitātes un ārējo atslēgu ierobežojumu pārkāpumu klasifikācija;
- ietekmēto rindu noteikšanas darbība bezizmaiņu, salīdzināšanas/atjaunināšanas un dzēšanas operācijām;
- vienlaicīgas rakstīšanas rezultāti, atkārtojami konflikti un idempotenti atkārtojumi.

Ja domēnam nevar noteikt līdzvērtīgu novērojamo semantiku, tas vēl nav pārnesams un tam jāpaliek
konkrētai aizmugursistēmai specifiskam, līdz šāds līgums ir izstrādāts.

## Saderības prasības

Jebkurai implementācijai, kas atbilst šim ADR, jāsaglabā šīs īpašības:

- SQLite joprojām ir noklusējuma izvēle, kurai nav nepieciešama konfigurācija.
- Esošie SQLite faili un migrāciju vēsture joprojām ir nolasāmi.
- npm, Electron, Docker un ierobežotu izpildvides iespēju SQLite atkāpšanās mehānismi saglabā pašreizējo palaišanas ceļu.
- Saglabātajiem pakalpojumu sniedzēju akreditācijas datiem joprojām tiek izmantota esošā lietojumprogrammas šifrēšanas darbība.
- Repozitorija migrācija nemanāmi nemaina maršrutēšanas, kvotu, API atslēgu vai audita semantiku.
- Dublēšanas un atkopšanas darbība tiek dokumentēta katrai aizmugursistēmai atsevišķi, nevis pasniegta kā universāla.
- Tīra instalācija, kas izmanto tikai SQLite, neielādē un nepieprasa ārējas datubāzes draiveri.

## Piegādes secība

1. Publicēt reproducējamu SQLite sasaistes inventarizāciju kā atsevišķu pārskatīšanas artefaktu.
2. Ieviest pirmo domēna repozitoriju līgumus un atbilstības testus.
3. Pielāgot esošo SQLite implementāciju šiem līgumiem, nemainot noklusējuma iestatījumus.
4. Ja uzturētāji to apstiprina, pievienot PostgreSQL kā pirmo ārējo implementāciju vienam
   ierobežotam vadības plaknes apgabalam.
5. Paplašināt kopīgoto stāvokli tikai pēc tam, kad ir pieejami vienlaicīgas rakstīšanas un migrāciju pārvaldības testi.
6. Pirms datubāzes pārslēgšanas iespējas reklamēšanas pievienot bezsaistes režīmā izmantojamu, validētu migrācijas ceļu no SQLite uz ārēju aizmugursistēmu.
7. Pievienot MySQL, izmantojot pārbaudītos repozitoriju un aizmugursistēmu līgumus.

Katrs izpildvides solis ir atsevišķs, pārskatāms PR. Vēlāku soli nedrīkst izmantot, lai pamatotu
nepārbaudītas abstrakcijas apvienošanu agrākā solī.

## Pirmais ieviešanas posms

Pirmais izpildlaika posms jāizvēlas pēc sasaistes inventarizācijas pārskatīšanas. Pakalpojumu sniedzēju
savienojumi, API atslēgas, kombinācijas un maršrutēšanas konfigurācija ir iespējamie kandidāti, jo to pamata tabulas
ir redzamas failā `src/lib/db/core.ts`, taču šis ADR neapstiprina ne tabulu sarakstu, ne migrācijas PR.
Posmā jāiekļauj:

- SQLite darbības saglabāšanas testi;
- repozitorija atbilstības testi;
- skaidri noteiktas transakciju robežas;
- saglabāto akreditācijas datu šifrēšanas un aizklāšanas pārbaude;
- nekādu izmaiņu noklusējuma palaišanas konfigurācijā.

## Apsvērtās alternatīvas

### Pievienot PostgreSQL zem `SqliteAdapter`

Noraidīts. `SqliteAdapter` ir SQLite izpildvidēm paredzēts saderības slānis, kas nodrošina SQLite specifiskas
operācijas. Šīs saskarnes emulēšana pārnestu sinhronus un konkrētam SQL dialektam raksturīgus pieņēmumus uz
jaunu aizmugursistēmu.

### Nodrošināt visiem domēniem vispārīgu vaicājumu/izpildes API

Noraidīts kā primārā robeža. Tas centralizētu savienojumu pārvaldību, taču atstātu SQL dialekta,
transakciju un tabulu sasaisti biznesa moduļos. Zema līmeņa aizmugursistēmas primitīvs var pastāvēt
repozitoriju implementācijās, bet ne kā lietojumprogrammai paredzēta persistences API.

### Pārrakstīt visu persistences slāni pirms viena posma validēšanas

Noraidīts. Pašreizējā persistences saskarne ir plaša un ietver failu dzīves ciklu, atkopšanu, meklēšanu
un darbības iestatījumus. Vertikālie posmi nodrošina pārskatāmu darbību un atrites robežas.

### Aizstāt SQLite kā noklusējuma risinājumu

Noraidīts. Iegultās un darbvirsmas izvietošanas ir atkarīgas no pašreizējā palaišanas modeļa, kuram nav nepieciešams ārējs pakalpojums. Ārēja
aizmugursistēma ir izvēles iespēja.

### Izmantot Redis kā pastāvīgo autoritatīvo datu avotu

Noraidīts. Redis var atbalstīt skaidri definētu īslaicīgu koordināciju, kešatmiņu vai skaitītājus, taču tas
neaizstāj šeit aprakstīto pastāvīgā repozitorija līgumu.

## Sekas

### Ieguvumi

- Biznesa kods iegūst stabilu persistences robežslāni, kas nav atkarīgs no datubāzes dialekta.
- SQLite darbība tiek testēta, pirms ārēja aizmugursistēma nosaka abstrakciju.
- PostgreSQL un MySQL koplieto līgumus un testus, nevis dublē domēna loģiku.
- Tikai SQLite pieejamās iespējas saglabā pirmšķirīgu statusu, nevis kļūst par necaurspīdīgiem saderības starpslāņiem.
- Vairāku repliku migrācijas un transakciju darbība kļūst par skaidri definētu projektēšanas aspektu.

### Izmaksas un riski

- Repozitoriju nodalīšanai nepieciešama pakāpeniska izsaukuma vietu migrācija.
- Asinhronās robežas var izplatīties pašlaik sinhronajā pakalpojumu kodā.
- Semantikai dažādās aizmugursistēmās ir nepieciešami atbilstības testi, kas aptver vairāk nekā tikai SQL sintakses saderību.
- Dublēšana, meklēšana, vektoru glabāšana un uzturēšana joprojām ir atkarīga no konkrētām iespējām.
- Vairāk nekā vienas persistences implementācijas uzturēšana palielina CI un operacionālā atbalsta izmaksas.

## Ārpus tvēruma

Šis ADR:

- nepievieno datubāzes atkarību, vides mainīgo, shēmu vai migrāciju;
- nemaina aktīvo SQLite vieninstanci vai draiveru izvēles kaskādi;
- nesola PostgreSQL vai MySQL atbalstu konkrētā laidienā;
- nepadara FTS5, `sqlite-vec`, dublējuma failus vai SQLite uzturēšanu pārnesamu;
- nedefinē aktīvs–aktīvs gatavību, pirms ir pieejami koplietojamā stāvokļa un koordinācijas testi;
- neapstiprina vienreizēju visas `src/lib/db/` pārrakstīšanu.

## Atvērtie jautājumi uzturētāja apstiprināšanai

1. Vai repozitorijs kopā ar iekšējo asinhronās aizmugursistēmas robežu ir vēlamais virziens, vai arī
   ārējā datu glabāšana jāizvieto aiz atsevišķa vadības plaknes pakalpojuma?
2. Vai PostgreSQL ir pieņemams kā pirmā ārējā implementācija pēc atbilstības nodrošināšanas ar SQLite?
3. Kuram domēnam jābūt pirmajam ierobežotajam repozitorija segmentam?
4. Kurš stāvoklis jākopīgo pirmajā vairāku repliku atskaites punktā, un kurš paliek lokāls mezglam?
5. Kāds savietojamības periods ir nepieciešams pārtrauktai vai atsauktai repozitorija migrācijai?

Kamēr šie jautājumi nav atrisināti, šis dokuments ir priekšlikums un nekāda izpildlaika pārstrukturēšana netiek paredzēta.
