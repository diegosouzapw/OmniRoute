# ADR: Pluggable persistence boundary (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Stanje:** Predlagano — pred začetkom dela na izvajanju je potrebna odobritev vzdrževalca
- **Težava za sledenje:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Obseg:** Samo arhitektura trajnega shranjevanja; ta odločitev ne dodaja ali izbira zunanje podatkovne zbirke

## Kontekst

OmniRoute trenutno ponuja domensko usmerjene funkcije trajnega shranjevanja iz `src/lib/db/`, medtem ko
skupna povezava, ki jo vrne `src/lib/db/core.ts`, implementira sinhrono pogodbo `SqliteAdapter`
iz `src/lib/db/adapters/types.ts`. Ta vmesnik podpira več izvajalnih okolij SQLite, vendar njegova
površina ostaja oblikovana po SQLite: sinhroni pripravljeni stavki, `pragma`, odložene in takojšnje
transakcije, izvorno varnostno kopiranje oziroma kopiranje datotek, kontrolne točke in lokalni ročaj podatkovne zbirke.

Trenutna pot zagona in obnovitve prav tako upravlja življenjski cikel datoteke SQLite. `src/lib/db/core.ts`
razreši `storage.sqlite`, vzdržuje en procesno globalen vmesnik, ustvarja kontrolne točke WAL, med obnovitvijo
ohranja izbrane tabele in pri ponovni gradnji podatkovne zbirke odstrani spremljevalne datoteke SQLite. Izbira
gonilnika v `src/lib/db/adapters/driverFactory.ts` izbira med podprtimi izvajalnimi okolji SQLite; to
ni abstrakcija zunanjega zalednega sistema.

Razvoj sheme je podobno tesno povezan. `src/lib/db/migrationRunner.ts` uporablja oštevilčene datoteke SQL,
preverja `sqlite_master` in `PRAGMA table_info`, zaznava izbirno podporo za FTS5 ter izvaja
migracijska opravila v transakcijah SQLite. Operativni moduli, kot sta `src/lib/db/backup.ts` in
`src/lib/db/optimizationSettings.ts`, neposredno uporabljajo semantiko varnostnega kopiranja, `PRAGMA`, WAL,
velikosti strani, samodejnega vakuumiranja in `VACUUM`.

To so veljavne lastnosti vdelane namestitve SQLite. Ostati morajo na voljo, ne da bi
PostgreSQL ali MySQL silili v posnemanje API-ja SQLite.

## Odločitev

Za prenosljivo trajno stanje se uvede dvonivojska meja trajnega shranjevanja:

1. **Pogodbe domenskih repozitorijev** določajo operacije trajnega shranjevanja, ki jih potrebujejo poslovna logika in
   koda za usmerjanje. Klicatelji so odvisni od domenskega vedenja in domenskih podatkov, ne pa od besedila SQL, pripravljenih stavkov,
   datotek podatkovne zbirke ali objektov narečja.
2. **Notranja asinhrona pogodba zalednega sistema** podpira implementacije repozitorijev s
   transakcijskimi konteksti, preverjanjem zdravja in pripravljenosti, usklajevanjem migracij, zmožnostmi zalednega sistema ter
   razvrščenimi napakami. Natančna površina TypeScript bo predlagana v prvem PR-ju z implementacijo
   in dokazana s testi skladnosti; ta ADR namenoma ne določa dokončno špekulativnega API-ja.

SQLite ostaja privzeta implementacija. Obstoječa kaskada gonilnikov SQLite in sinhroni
`SqliteAdapter` ostaneta za implementacijo repozitorija SQLite, medtem ko se domene selijo v
majhnih navpičnih rezinah. Nobenemu uporabniku ni treba konfigurirati zunanje storitve.

PostgreSQL je prva predlagana zunanja implementacija, potem ko je meja repozitorija potrjena
s SQLite. MySQL sledi kot enakovredna implementacija z isto zbirko testov skladnosti,
ne pa kot druga veja poslovne logike.

## Pravila meje

### Površina prenosljivega repozitorija

Prenosljiv repozitorij lahko izpostavi:

- domenska branja in zapise;
- eksplicitne atomske operacije in dostop do repozitorija v obsegu transakcije;
- operacije primerjave/posodobitve ali zakupa, kadar je semantika sočasnosti del domene;
- od zalednega sistema neodvisno ostranjevanje, razvrščanje in napake omejitev.

Preverjanje zdravja in pripravljenosti zalednega sistema ter usklajevanje migracij sodijo v notranjo zaledno/operativno
pogodbo, ne pa v posamezne domenske repozitorije.

Prenosljiv repozitorij ne sme izpostaviti:

- `prepare`, `get`, `all`, `run` ali neobdelanih ročajev gonilnika;
- `PRAGMA`, načinov kontrolnih točk WAL, `VACUUM` ali prilagajanja strani/predpomnilnika;
- poti do datotek SQLite, spremljevalnih datotek ali varnostnega kopiranja s kopiranjem datotek;
- `lastInsertRowid` kot medzaledne domenske pogodbe;
- sintakse FTS5 ali `sqlite-vec`;
- generičnega izhoda v narečje, ki ga uporablja običajna poslovna koda.

### Površina zmožnosti zalednega sistema

Vedenje, specifično za zaledni sistem, ostaja eksplicitno in odkrivno. Vzdrževanje, omejeno na SQLite, ostaja za
lastno implementacijo in operativnim vmesnikom, vključno z:

- izbiro gonilnika izvajalnega okolja;
- kontrolnimi točkami WAL in vedenjem SQLite ob zaustavitvi;
- nastavitvami velikosti strani, velikosti predpomnilnika in samodejnega vakuumiranja;
- varnostnim kopiranjem, obnovitvijo in reševanjem datoteke podatkovne zbirke;
- introspekcijo sheme SQLite;
- integracijo FTS5 in `sqlite-vec`.

Zunanjemu zalednemu sistemu ni treba posnemati teh funkcij. Repozitoriji morajo bodisi uporabljati
prenosljivo zmožnost, zagotoviti implementacijo, specifično za zaledni sistem, z dokumentiranim vedenjem bodisi sporočiti,
da zmožnost ni na voljo.

## Model transakcij in migracij

API-ji repozitorijev opredeljujejo atomsko poslovno operacijo; klicatelji ne izbirajo načina transakcije SQL.
Vsaka operacija mora opredeliti svoja opazna jamstva glede sočasnosti: zaščitene invariante, zaznavanje
sporov, razvrščanje ponovnih poskusov, pričakovanja glede idempotentnosti in posredovanje transakcijskega
konteksta. Implementacije lahko uporabljajo različne mehanizme transakcij in izolacije le, če ta opazna
jamstva ostanejo enakovredna. SQLite lahko interno še naprej uporablja trenutno obnašanje odloženih ali
takojšnjih transakcij, kadar to izpolnjuje pogodbo operacije.

Zunanje zaledne storitve zahtevajo izrecno lastništvo migracij, da več replik aplikacije ne more hkrati
izvajati iste spremembe sheme. Zgodovine migracij zalednih storitev si lahko delijo logične mejnike, vendar
se ne predpostavlja, da so datoteke SQL za SQLite prenosljive ali ponovno uporabne v drugem narečju.

## Semantika skladnosti med zalednimi storitvami

Preizkusi skladnosti morajo zajemati obnašanje, ne le podpisov metod repozitorija. Vsaka migrirana domena
mora opredeliti in preveriti:

- časovni pas, natančnost in serializacijo časovnih žigov;
- pričakovanja glede razvrščanja vrednosti `NULL`, pravila primerjanja in občutljivosti na velikost črk;
- predstavitev JSON in obnašanje pri primerjanju;
- natančnost celih števil, decimalnih števil in denarnih vrednosti;
- stabilno razvrščanje in deterministična dodatna merila za razreševanje izenačenih vrednosti pri ostranjevanju;
- ustvarjanje ID-jev brez zanašanja na ID-je vrstic SQLite;
- razvrščanje kršitev enoličnosti in tujih ključev;
- obnašanje števila prizadetih vrstic pri operacijah brez sprememb, primerjanja/posodabljanja in brisanja;
- izide sočasnega pisanja, spore, pri katerih je mogoč ponovni poskus, in idempotentne ponovne poskuse.

Če domena ne more opredeliti enakovredne opazne semantike, še ni prenosljiva in mora ostati
specifična za zaledno storitev, dokler ta pogodba ni zasnovana.

## Zahteve glede združljivosti

Vsaka implementacija, ki sledi temu ADR-ju, mora ohraniti naslednje lastnosti:

- SQLite ostane privzeta možnost brez potrebe po konfiguraciji.
- Obstoječe datoteke SQLite in zgodovina migracij ostanejo berljive.
- Nadomestne možnosti SQLite za npm, Electron, Docker in okolja izvajanja z omejitvami ohranijo svojo trenutno zagonsko pot.
- Shranjene poverilnice ponudnikov še naprej uporabljajo obstoječe šifriranje aplikacije.
- Migracija repozitorija ne spremeni poti usmerjanja, kvot, ključev API ali semantike revizijske sledi brez izrecnega opozorila.
- Obnašanje varnostnega kopiranja in obnovitve je dokumentirano za vsako zaledno storitev posebej, namesto da bi bilo predstavljeno kot univerzalno.
- Čista namestitev, ki uporablja samo SQLite, ne naloži ali zahteva gonilnika zunanje podatkovne zbirke.

## Zaporedje dobave

1. Objavite ponovljiv popis povezanosti s SQLite kot ločen artefakt za pregled.
2. Uvedite prve pogodbe repozitorijev domen in preizkuse skladnosti.
3. Prilagodite obstoječo implementacijo SQLite tem pogodbam, ne da bi spremenili privzete nastavitve.
4. Ob odobritvi vzdrževalcev dodajte PostgreSQL kot prvo zunanjo implementacijo za en
   omejen del nadzorne ravnine.
5. Skupno stanje razširite šele, ko obstajajo preizkusi sočasnega pisanja in lastništva migracij.
6. Pred oglaševanjem preklapljanja med podatkovnimi zbirkami dodajte nepovezano, preverjeno pot migracije iz SQLite v zunanjo podatkovno zbirko.
7. Dodajte MySQL na podlagi preverjenih pogodb repozitorijev in zalednih storitev.

Vsak korak izvajalnega okolja je ločen PR, ki ga je mogoče neodvisno pregledati. Poznejšega koraka ni
dovoljeno uporabljati kot utemeljitev za združitev nepreverjene abstrakcije iz zgodnejšega koraka.

## Prvi implementacijski sklop

Prvi izvajalni sklop je treba izbrati po pregledu popisa sklopljenosti. Povezave s ponudniki, ključi API, kombinacije in konfiguracija usmerjanja so možni kandidati, ker so njihove osnovne tabele vidne v `src/lib/db/core.ts`, vendar ta ADR ne odobri seznama tabel ali PR-ja za migracijo. Sklop mora vključevati:

- teste ohranjanja vedenja SQLite;
- teste skladnosti repozitorijev;
- eksplicitne meje transakcij;
- preverjanje šifriranja in prekrivanja shranjenih poverilnic;
- nobene spremembe privzete zagonske konfiguracije.

## Obravnavane alternative

### Dodajanje PostgreSQL pod `SqliteAdapter`

Zavrnjeno. `SqliteAdapter` je združljivostna plast za izvajalna okolja SQLite in izpostavlja operacije, specifične za SQLite. Posnemanje tega vmesnika bi preneslo sinhrone predpostavke in predpostavke, specifične za narečje, v novo zaledno rešitev.

### Izpostavitev generičnega API-ja za poizvedovanje/izvajanje vsem domenam

Zavrnjeno kot primarna meja. S tem bi centralizirali upravljanje povezav, vendar bi sklopljenost z narečjem SQL, transakcijami in tabelami ostala v poslovnih modulih. Nizkonivojski gradnik zaledne rešitve lahko obstaja znotraj implementacij repozitorijev, ne pa kot API za trajno shranjevanje, namenjen aplikaciji.

### Ponovno pisanje celotnega sloja trajnega shranjevanja pred potrditvijo enega sklopa

Zavrnjeno. Trenutna površina trajnega shranjevanja je obsežna ter vključuje življenjski cikel datotek, obnovitev, iskanje in operativne nastavitve. Navpični sklopi zagotavljajo pregledljive meje vedenja in povrnitve.

### Zamenjava SQLite kot privzete možnosti

Zavrnjeno. Vdelane in namizne uvedbe so odvisne od trenutnega zagonskega modela brez storitev. Zunanja zaledna rešitev je izbirna.

### Uporaba Redis kot trajnega avtoritativnega vira

Zavrnjeno. Redis lahko podpira izrecno kratkotrajno koordinacijo, predpomnilnik ali števce, vendar ne nadomešča tukaj opisane pogodbe repozitorija za trajno shranjevanje.

## Posledice

### Pozitivne

- Poslovna koda pridobi stabilno mejo za trajno shranjevanje, neodvisno od narečja podatkovne zbirke.
- Vedenje SQLite je preizkušeno, preden abstrakcijo opredeli zunanja zaledna rešitev.
- PostgreSQL in MySQL uporabljata skupne pogodbe in teste, namesto da bi podvajala domensko logiko.
- Zmogljivosti, ki so na voljo samo v SQLite, ostanejo prvovrstne, namesto da bi postale prepustni združljivostni vmesniki.
- Vedenje migracij in transakcij z več replikami postane eksplicitna oblikovalska skrb.

### Stroški in tveganja

- Izločitev repozitorijev zahteva postopno migracijo mest klica.
- Asinhrone meje se lahko razširijo v trenutno sinhrono storitveno kodo.
- Semantika med zalednimi rešitvami zahteva teste skladnosti, ki presegajo združljivost sintakse SQL.
- Varnostne kopije, iskanje, vektorsko shranjevanje in vzdrževanje ostajajo vezani na posamezne zmogljivosti.
- Uporaba več kot ene implementacije trajnega shranjevanja povečuje stroške CI-ja in operativne podpore.

## Cilji, ki niso vključeni

Ta ADR ne:

- dodaja odvisnosti podatkovne zbirke, spremenljivke okolja, sheme ali migracije;
- spreminja aktivnega singletona SQLite ali zaporedja nadomestnih gonilnikov;
- obljublja podpore za PostgreSQL ali MySQL v določeni izdaji;
- zagotavlja prenosljivosti za FTS5, `sqlite-vec`, datoteke varnostnih kopij ali vzdrževanje SQLite;
- opredeljuje pripravljenosti za aktivno-aktivno delovanje, preden obstajajo testi skupnega stanja in koordinacije;
- odobrava enkratnega celovitega ponovnega pisanja `src/lib/db/`.

## Odprta vprašanja za odobritev vzdrževalca

1. Ali je repozitorij skupaj z interno asinhrono mejo zalednega sistema prednostna usmeritev ali naj bo
   zunanja trajna hramba dostopna prek ločene storitve nadzorne ravnine?
2. Ali je PostgreSQL sprejemljiv kot prva zunanja implementacija po zagotovitvi skladnosti s SQLite?
3. Katera domena naj bo prvi omejeni izsek repozitorija?
4. Katero stanje mora biti skupno za prvi mejnik z več replikami in katero ostane lokalno za posamezno vozlišče?
5. Kakšno obdobje združljivosti je potrebno za prekinjeno ali razveljavljeno migracijo repozitorija?

Dokler ta vprašanja niso razrešena, je ta dokument predlog in ne predvideva nobenega preoblikovanja izvajalnega okolja.
