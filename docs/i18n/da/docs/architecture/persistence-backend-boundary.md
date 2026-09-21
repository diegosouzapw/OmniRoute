# ADR: Pluggable persistence boundary (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Foreslået — kræver godkendelse fra en vedligeholder, før arbejdet med kørselstidsmiljøet påbegyndes
- **Sporingsissue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Omfang:** Kun persistensarkitektur; denne beslutning tilføjer eller vælger ikke en ekstern database

## Kontekst

OmniRoute stiller i øjeblikket domæneorienterede persistensfunktioner til rådighed fra `src/lib/db/`, mens den
delte forbindelse, der returneres af `src/lib/db/core.ts`, implementerer den synkrone `SqliteAdapter`-kontrakt
i `src/lib/db/adapters/types.ts`. Denne adapter understøtter flere SQLite-kørselstidsmiljøer, men dens
grænseflade er fortsat formet efter SQLite: synkrone forberedte statements, `pragma`, udskudte og øjeblikkelige
transaktioner, indbygget backup/backup via filkopiering, checkpoint og et lokalt databasehandle.

Den nuværende opstarts- og genoprettelsessti håndterer også SQLite-filens livscyklus. `src/lib/db/core.ts`
finder `storage.sqlite`, vedligeholder én procesglobal adapter, opretter checkpoints for WAL, bevarer udvalgte
tabeller under genoprettelse og fjerner SQLite-ledsagefiler, når en database genopbygges. Valg af driver
i `src/lib/db/adapters/driverFactory.ts` vælger mellem de understøttede SQLite-kørselstidsmiljøer; det
er ikke en abstraktion for eksterne backends.

Skemaudvikling er tilsvarende tæt koblet. `src/lib/db/migrationRunner.ts` anvender nummererede SQL-filer,
undersøger `sqlite_master` og `PRAGMA table_info`, registrerer valgfri FTS5-understøttelse og udfører
migreringsarbejde i SQLite-transaktioner. Driftsmoduler såsom `src/lib/db/backup.ts` og
`src/lib/db/optimizationSettings.ts` anvender direkte semantikken for backup, `PRAGMA`, WAL, sidestørrelse,
automatisk vacuum og `VACUUM`.

Dette er gyldige egenskaber ved den indlejrede SQLite-udrulning. De bør fortsat være tilgængelige uden
at tvinge PostgreSQL eller MySQL til at efterligne en SQLite-API.

## Beslutning

Indfør en persistensgrænse i to niveauer for portabel, varig tilstand:

1. **Kontrakter for domænerepositorier** definerer de persistensoperationer, som forretnings- og routingkode
   har brug for. Kaldende kode afhænger af domæneadfærd og domænedata, ikke SQL-tekst, forberedte statements,
   databasefiler eller dialektobjekter.
2. **En intern asynkron backendkontrakt** understøtter repositorieimplementeringer med
   transaktionskontekster, sundhed/parathed, migreringskoordinering, backendfunktioner og
   klassificerede fejl. Den præcise TypeScript-grænseflade vil blive foreslået i den første implementerings-PR
   og dokumenteret gennem konformitetstests; denne ADR fastlåser bevidst ikke en spekulativ API.

SQLite forbliver standardimplementeringen. Den eksisterende kæde af SQLite-drivere og den synkrone
`SqliteAdapter` forbliver bag SQLite-repositorieimplementeringen, mens domæner migreres i
små vertikale udsnit. Ingen bruger er forpligtet til at konfigurere en ekstern tjeneste.

PostgreSQL er den første foreslåede eksterne implementering, efter at repositoriegrænsen er dokumenteret
mod SQLite. MySQL følger som en sideordnet implementering mod den samme konformitetstestsuite frem for
som en separat forgrening af forretningslogikken.

## Regler for grænsefladen

### Portabel repositoriegrænseflade

Et portabelt repositorie må eksponere:

- læsninger og skrivninger i domænet;
- eksplicitte atomare operationer og transaktionsafgrænset repositorieadgang;
- sammenlign/opdater-operationer eller lease-operationer, hvor samtidighedssemantik er en del af domænet;
- backendneutral paginering, sortering og begrænsningsfejl.

Backendsundhed, parathed og migreringskoordinering hører til den interne backend-/driftskontrakt
frem for til de enkelte domænerepositorier.

Et portabelt repositorie må ikke eksponere:

- `prepare`, `get`, `all`, `run` eller rå driverhandles;
- `PRAGMA`, WAL-checkpointtilstande, `VACUUM` eller finjustering af sider/cache;
- SQLite-filstier, ledsagefiler eller backup via filkopiering;
- `lastInsertRowid` som en domænekontrakt på tværs af backends;
- FTS5- eller `sqlite-vec`-syntaks;
- en generisk dialektgenvej, der bruges af almindelig forretningskode.

### Grænseflade for backendfunktioner

Backendspecifik adfærd forbliver eksplicit og synlig. Vedligeholdelse, der kun gælder for SQLite, forbliver
bag sin egen implementering og driftsgrænseflade, herunder:

- valg af driver ved kørselstid;
- WAL-checkpoint og SQLite-nedlukningsadfærd;
- indstillinger for sidestørrelse, cachestørrelse og automatisk vacuum;
- backup, gendannelse og genoprettelse af databasefiler;
- introspektion af SQLite-skemaet;
- integration med FTS5 og `sqlite-vec`.

En ekstern backend er ikke forpligtet til at efterligne disse funktioner. Repositorier skal enten anvende en
portabel funktion, levere en backendspecifik implementering med dokumenteret adfærd eller rapportere,
at en funktion ikke er tilgængelig.

## Transaktions- og migreringsmodel

Repository-API'er definerer den atomare forretningsoperation; kaldere vælger ikke en SQL-transaktionstilstand.
Hver operation skal definere sine observerbare samtidighedsgarantier: beskyttede invarianter, konfliktdetektering, klassificering af genforsøg, forventninger til idempotens og videresendelse af transaktionskontekst.
Implementeringer må kun bruge forskellige transaktions- og isolationsmekanismer, når disse observerbare garantier forbliver ækvivalente. SQLite kan fortsat bruge sin nuværende interne adfærd for udskudte eller øjeblikkelige transaktioner, hvor dette opfylder operationens kontrakt.

Eksterne backends kræver eksplicit ejerskab over migreringer, så flere applikationsreplikaer ikke konkurrerer om den samme skemaændring. Migreringshistorikker for backends kan dele logiske milepæle, men SQLite SQL-filer antages ikke at være portable eller genanvendelige i en anden dialekt.

## Semantik for konformitet på tværs af backends

Konformitetstest skal dække adfærd og ikke kun signaturer for repository-metoder. Hvert migreret domæne skal definere og verificere:

- tidszone, præcision og serialisering for tidsstempler;
- forventninger til `NULL`-sortering, kollation og forskel på store og små bogstaver;
- JSON-repræsentation og sammenligningsadfærd;
- præcision for heltal, decimaltal og pengebeløb;
- stabil sortering og deterministiske afgørelser ved lighed for paginering;
- ID-generering uden at være afhængig af SQLite-række-ID'er;
- klassificering af overtrædelser af entydigheds- og fremmednøglerestriktioner;
- adfærd for antal berørte rækker ved operationer uden effekt samt sammenlignings-/opdaterings- og sletteoperationer;
- resultater af samtidige skrivninger, konflikter, der kan forsøges igen, og idempotente genforsøg.

Hvis et domæne ikke kan angive ækvivalent observerbar semantik, er det endnu ikke portabelt og skal forblive backend-specifikt, indtil denne kontrakt er udformet.

## Kompatibilitetskrav

Enhver implementering, der følger denne ADR, skal bevare disse egenskaber:

- SQLite forbliver standardvalget uden konfiguration.
- Eksisterende SQLite-filer og migreringshistorik forbliver læsbare.
- SQLite-reserveløsninger for npm, Electron, Docker og begrænsede runtime-miljøer bevarer deres nuværende opstartsforløb.
- Gemte loginoplysninger til providere fortsætter med at bruge applikationens eksisterende krypteringsadfærd.
- En repository-migrering ændrer ikke stiltiende semantik for routing, kvoter, API-nøgler eller revision.
- Adfærd for sikkerhedskopiering og gendannelse dokumenteres pr. backend frem for at blive præsenteret som universel.
- En ren SQLite-installation indlæser eller kræver ikke en ekstern databasedriver.

## Leveringsrækkefølge

1. Udgiv en reproducerbar oversigt over SQLite-koblinger som et separat reviewartefakt.
2. Introducer de første kontrakter og konformitetstest for domænerepositories.
3. Tilpas den eksisterende SQLite-implementering bag disse kontrakter uden at ændre standardindstillingerne.
4. Tilføj, med forbehold for vedligeholdernes godkendelse, PostgreSQL som den første eksterne implementering for en afgrænset del af kontrolplanet.
5. Udvid kun delt tilstand, efter at der findes test for samtidige skrivninger og ejerskab over migreringer.
6. Tilføj en offline, valideret migreringssti fra SQLite til en ekstern database, før databaseskift markedsføres.
7. Tilføj MySQL baseret på de afprøvede repository- og backend-kontrakter.

Hvert runtime-trin er en separat PR, der kan gennemgås uafhængigt. Et senere trin må ikke bruges til at retfærdiggøre sammenfletning af en uafprøvet abstraktion i et tidligere trin.

## Første implementeringsudsnit

Det første runtime-udsnit skal vælges, efter at koblingsoversigten er blevet gennemgået. Provider-
forbindelser, API-nøgler, kombinationer og routingkonfiguration er kandidater, fordi deres basistabeller
er synlige i `src/lib/db/core.ts`, men denne ADR godkender ikke en tabelliste eller en migrations-PR.
Udsnittet skal omfatte:

- tests, der sikrer bevarelse af SQLite-adfærd;
- konformitetstests for repositories;
- eksplicitte transaktionsgrænser;
- verificering af kryptering og maskering af gemte legitimationsoplysninger;
- ingen ændring af standardkonfigurationen ved opstart.

## Overvejede alternativer

### Tilføj PostgreSQL under `SqliteAdapter`

Afvist. `SqliteAdapter` er et kompatibilitetslag til SQLite-runtimes og eksponerer SQLite-specifikke
operationer. Emulering af denne grænseflade ville lække synkrone og dialektspecifikke antagelser ind i
en ny backend.

### Eksponér en generisk API til forespørgsler og udførelse for alle domæner

Afvist som den primære grænseflade. Det ville centralisere forbindelseshåndteringen, men efterlade SQL-dialekt,
transaktioner og tabelkobling i forretningsmoduler. En backend-primitiv på lavt niveau kan eksistere internt
i repository-implementeringer, men ikke som applikationens persistens-API.

### Omskriv al persistens, før ét udsnit valideres

Afvist. Den nuværende persistensgrænseflade er omfattende og inkluderer filers livscyklus, gendannelse, søgning
og driftsindstillinger. Vertikale udsnit giver overskuelige grænser for gennemgang og tilbagerulning.

### Erstat SQLite som standard

Afvist. Indlejrede implementeringer og desktopimplementeringer er afhængige af den nuværende opstartsmodel uden
eksterne tjenester. En ekstern backend er valgfri.

### Brug Redis som den varige autoritet

Afvist. Redis kan understøtte eksplicit flygtig koordinering, cache eller tællere, men erstatter ikke
den varige repository-kontrakt, der er beskrevet her.

## Konsekvenser

### Positive

- Forretningskoden får et stabilt persistensgrænsepunkt, der er uafhængigt af databasedialekten.
- SQLite-adfærd testes, før en ekstern backend definerer abstraktionen.
- PostgreSQL og MySQL deler kontrakter og tests i stedet for at duplikere domænelogik.
- Funktioner, der kun findes i SQLite, forbliver førsteklasses i stedet for at blive utætte kompatibilitetslag.
- Migrerings- og transaktionsadfærd for flere replikaer bliver et eksplicit designhensyn.

### Omkostninger og risici

- Udtrækning af repositories kræver trinvis migrering af kaldesteder.
- Asynkrone grænser kan brede sig gennem servicekode, der i øjeblikket er synkron.
- Semantik på tværs af backends kræver konformitetstests ud over kompatibilitet med SQL-syntaks.
- Sikkerhedskopiering, søgning, vektorlagring og vedligeholdelse forbliver kapacitetsspecifikke.
- Kørsel af mere end én persistensimplementering øger omkostningerne til CI og driftssupport.

## Ikke-mål

Denne ADR:

- tilføjer ikke en databaseafhængighed, miljøvariabel, et skema eller en migrering;
- ændrer ikke den aktive SQLite-singleton eller driverkaskade;
- lover ikke understøttelse af PostgreSQL eller MySQL i en bestemt udgivelse;
- gør ikke FTS5, `sqlite-vec`, backupfiler eller SQLite-vedligeholdelse portable;
- definerer ikke understøttelse af active-active, før der findes tests af delt tilstand og koordinering;
- godkender ikke en samlet omskrivning af `src/lib/db/`.

## Åbne spørgsmål til godkendelse hos vedligeholderen

1. Er repositoryet sammen med den interne asynkrone backend-grænse den foretrukne retning, eller bør
   ekstern persistens placeres bag en separat kontrolplanstjeneste?
2. Er PostgreSQL acceptabel som den første eksterne implementering efter SQLite-konformitet?
3. Hvilket domæne bør være det første afgrænsede repository-udsnit?
4. Hvilken tilstand skal deles ved den første milepæl med flere replikaer, og hvilken skal forblive lokal for noden?
5. Hvilket kompatibilitetsvindue kræves for en afbrudt eller tilbagerullet repository-migrering?

Indtil disse spørgsmål er afklaret, er dette dokument et forslag, og der lægges ikke op til nogen refaktorering af kørselstidsmiljøet.
