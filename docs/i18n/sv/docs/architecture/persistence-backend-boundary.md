# ADR: Pluggable persistence boundary (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Föreslagen — kräver godkännande av ansvariga innan arbetet med körningen påbörjas
- **Spårningsärende:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Omfattning:** Endast persistensarkitektur; detta beslut lägger inte till eller väljer en extern databas

## Kontext

OmniRoute tillhandahåller för närvarande domänorienterade persistensfunktioner från `src/lib/db/`, medan den
delade anslutningen som returneras av `src/lib/db/core.ts` implementerar det synkrona kontraktet
`SqliteAdapter` i `src/lib/db/adapters/types.ts`. Den adaptern stöder flera SQLite-körmiljöer, men dess
gränssnitt är fortfarande utformat efter SQLite: synkrona förberedda satser, `pragma`, uppskjutna och omedelbara
transaktioner, inbyggd säkerhetskopiering eller säkerhetskopiering via filkopiering, kontrollpunkter samt ett lokalt databashandtag.

Den nuvarande sökvägen för uppstart och återställning hanterar även SQLite-filens livscykel. `src/lib/db/core.ts`
fastställer sökvägen till `storage.sqlite`, upprätthåller en processglobal adapter, skapar kontrollpunkter för WAL, bevarar utvalda
tabeller under återställning och tar bort tillhörande SQLite-filer när en databas byggs om. Valet av
drivrutin i `src/lib/db/adapters/driverFactory.ts` görs bland de SQLite-körmiljöer som stöds; det
är inte en abstraktion för externa backend-system.

Schemats utveckling är kopplad på liknande sätt. `src/lib/db/migrationRunner.ts` tillämpar numrerade SQL-filer,
undersöker `sqlite_master` och `PRAGMA table_info`, identifierar valfritt stöd för FTS5 och kör migreringsarbete
i SQLite-transaktioner. Driftsmoduler som `src/lib/db/backup.ts` och
`src/lib/db/optimizationSettings.ts` använder direkt semantik för säkerhetskopiering, `PRAGMA`, WAL, sidstorlek, automatisk vakuumrensning och `VACUUM`.

Detta är giltiga egenskaper hos den inbäddade SQLite-distributionen. De bör förbli tillgängliga utan
att PostgreSQL eller MySQL tvingas efterlikna ett SQLite-API.

## Beslut

Inför en persistensgräns i två nivåer för portabelt, varaktigt tillstånd:

1. **Kontrakt för domänarkiv** definierar de persistensåtgärder som affärs- och routningskod
   behöver. Anropare är beroende av domänbeteende och domändata, inte av SQL-text, förberedda satser,
   databasfiler eller dialektobjekt.
2. **Ett internt asynkront backend-kontrakt** stöder arkivimplementationer med
   transaktionskontexter, hälsa/beredskap, migreringssamordning, backend-funktioner och
   klassificerade fel. Det exakta TypeScript-gränssnittet kommer att föreslås i den första implementationens
   PR och verifieras genom överensstämmelsetester; detta ADR låser avsiktligt inte ett spekulativt API.

SQLite förblir standardimplementationen. Den befintliga kaskaden av SQLite-drivrutiner och den synkrona
`SqliteAdapter` förblir bakom SQLite-arkivimplementationen medan domäner migreras i
små vertikala delar. Ingen användare behöver konfigurera en extern tjänst.

PostgreSQL är den första föreslagna externa implementationen efter att arkivgränsen har verifierats
mot SQLite. MySQL följer som en jämbördig implementation mot samma överensstämmelsesvit snarare
än som en andra förgrening av affärslogiken.

## Gränsregler

### Portabelt arkivgränssnitt

Ett portabelt arkiv får exponera:

- läs- och skrivåtgärder för domänen;
- explicita atomära åtgärder och transaktionsbegränsad arkivåtkomst;
- jämförelse-/uppdaterings- eller leasingåtgärder där samtidighetssemantik ingår i domänen;
- backend-neutral paginering, sortering och begränsningsfel.

Backend-hälsa, beredskap och migreringssamordning hör till det interna backend-/driftskontraktet
snarare än till enskilda domänarkiv.

Ett portabelt arkiv får inte exponera:

- `prepare`, `get`, `all`, `run` eller råa drivrutinshandtag;
- `PRAGMA`, WAL-kontrollpunktslägen, `VACUUM` eller justering av sid-/cacheinställningar;
- sökvägar till SQLite-filer, tillhörande filer eller säkerhetskopiering via filkopiering;
- `lastInsertRowid` som ett domänkontrakt mellan backend-system;
- syntax för FTS5 eller `sqlite-vec`;
- en generell reservlösning för specifika dialekter som används av normal affärskod.

### Gränssnitt för backend-funktioner

Backend-specifikt beteende förblir explicit och identifierbart. Underhåll som endast gäller SQLite förblir bakom
dess egen implementation och sitt eget driftsgränssnitt, inklusive:

- val av drivrutin för körmiljön;
- WAL-kontrollpunkter och nedstängningsbeteende för SQLite;
- inställningar för sidstorlek, cachestorlek och automatisk vakuumrensning;
- säkerhetskopiering, återställning och återskapande av databasfiler;
- inspektion av SQLite-scheman;
- integrering av FTS5 och `sqlite-vec`.

Ett externt backend-system behöver inte efterlikna dessa funktioner. Arkiv måste antingen använda en
portabel funktion, tillhandahålla en backend-specifik implementation med dokumenterat beteende eller rapportera
att en funktion inte är tillgänglig.

## Transaktions- och migreringsmodell

Repository-API:er definierar den atomära verksamhetsoperationen; anropare väljer inte ett SQL-transaktionsläge.
Varje operation måste definiera sina observerbara samtidighetsgarantier: skyddade invarianter, konfliktidentifiering,
klassificering för återförsök, idempotensförväntningar och vidarebefordran av transaktionskontext.
Implementeringar får använda olika transaktions- och isoleringsmekanismer endast när dessa observerbara
garantier förblir likvärdiga. SQLite får fortsätta att internt använda sitt nuvarande uppskjutna eller omedelbara
transaktionsbeteende där det uppfyller operationens kontrakt.

Externa backend-system kräver uttryckligt ägarskap för migreringar så att flera applikationsrepliker inte samtidigt försöker
genomföra samma schemaändring. Backend-systemens migreringshistorik kan dela logiska milstolpar, men SQLite-SQL-filer
förutsätts inte vara portabla eller återanvändbara med en annan dialekt.

## Semantik för överensstämmelse mellan backend-system

Överensstämmelsetester måste omfatta beteende, inte enbart repository-metodernas signaturer. Varje migrerad domän
måste definiera och verifiera:

- tidsstämplars tidszon, precision och serialisering;
- förväntningar på sortering av `NULL`, kollationering och skiftlägeskänslighet;
- representation och jämförelsebeteende för JSON;
- precision för heltal, decimaltal och monetära värden;
- stabil sortering och deterministiska utslagsregler för sidindelning;
- ID-generering utan beroende av SQLite-rad-ID:n;
- klassificering av överträdelser av unikhetsvillkor och främmande nycklar;
- beteende för antalet påverkade rader vid operationer utan effekt, jämförelse/uppdatering och borttagning;
- utfall vid samtidiga skrivningar, konflikter som kan återförsökas och idempotenta återförsök.

Om en domän inte kan ange likvärdig observerbar semantik är den ännu inte portabel och måste förbli
backend-specifik tills det kontraktet har utformats.

## Kompatibilitetskrav

Varje implementering som följer denna ADR måste bevara följande egenskaper:

- SQLite förblir standardalternativet utan konfiguration.
- Befintliga SQLite-filer och befintlig migreringshistorik förblir läsbara.
- SQLite-reservlösningar för npm, Electron, Docker och begränsade körningsmiljöer behåller sin nuvarande startsekvens.
- Lagrade leverantörsautentiseringsuppgifter fortsätter att använda applikationens befintliga krypteringsbeteende.
- En repository-migrering ändrar inte obemärkt semantik för dirigering, kvoter, API-nycklar eller revision.
- Beteende för säkerhetskopiering och återställning dokumenteras per backend-system i stället för att presenteras som universellt.
- En ren installation som endast använder SQLite läser inte in eller kräver någon extern databasdrivrutin.

## Leveransordning

1. Publicera en reproducerbar inventering av SQLite-kopplingar som en separat granskningsartefakt.
2. Introducera de första repository-kontrakten för domäner och överensstämmelsetesterna.
3. Anpassa den befintliga SQLite-implementeringen bakom dessa kontrakt utan att ändra standardinställningarna.
4. Efter godkännande från underhållarna, lägg till PostgreSQL som den första externa implementeringen för en
   avgränsad del av kontrollplanet.
5. Utöka delat tillstånd först när tester för samtidiga skrivningar och migreringsägarskap finns.
6. Lägg till en offlinebaserad, validerad migreringsväg från SQLite till ett externt system innan databasbyte marknadsförs.
7. Lägg till MySQL baserat på de beprövade repository- och backend-kontrakten.

Varje körningssteg är en separat PR som kan granskas individuellt. Ett senare steg får inte användas för att motivera sammanslagning av en
obeprövad abstraktion i ett tidigare steg.

## Första implementeringsdelen

Den första delen av körningsmiljön ska väljas efter att inventeringen av kopplingar har granskats. Leverantörsanslutningar, API-nycklar, kombinationer och routningskonfiguration är kandidater eftersom deras bastabeller är synliga i `src/lib/db/core.ts`, men denna ADR godkänner inte en tabellista eller en PR för migrering.
Delen måste omfatta:

- tester som verifierar att SQLite-beteendet bevaras;
- konformitetstester för repositories;
- explicita transaktionsgränser;
- verifiering av kryptering och maskering av lagrade autentiseringsuppgifter;
- ingen ändring av standardkonfigurationen för uppstart.

## Övervägda alternativ

### Lägg till PostgreSQL under `SqliteAdapter`

Avvisat. `SqliteAdapter` är ett kompatibilitetslager för SQLite-körningsmiljöer och exponerar SQLite-specifika åtgärder. Att emulera detta gränssnitt skulle läcka synkrona och dialektspecifika antaganden till en ny backend.

### Exponera ett generiskt API för frågor/körning till alla domäner

Avvisat som den primära gränsen. Det skulle centralisera anslutningshanteringen men lämna kopplingar till SQL-dialekt, transaktioner och tabeller i affärsmodulerna. En backend-primitiv på låg nivå kan finnas inuti repository-implementationer, men inte som det beständighets-API som applikationen använder.

### Skriv om all beständighetslogik innan en enskild del valideras

Avvisat. Den nuvarande beständighetsytan är omfattande och inkluderar filers livscykel, återställning, sökning och driftsinställningar. Vertikala delar ger granskningsbara beteenden och tydliga gränser för återställning.

### Ersätt SQLite som standard

Avvisat. Inbäddade installationer och skrivbordsinstallationer är beroende av den nuvarande uppstartsmodellen utan externa tjänster. En extern backend är ett aktivt tillval.

### Använd Redis som beständig auktoritativ källa

Avvisat. Redis kan stödja uttryckligen tillfällig samordning, cachelagring eller räknare, men ersätter inte det beständiga repository-kontrakt som beskrivs här.

## Konsekvenser

### Positiva

- Affärskoden får en stabil beständighetsgräns som är oberoende av databasdialekt.
- SQLite-beteendet testas innan en extern backend definierar abstraktionen.
- PostgreSQL och MySQL delar kontrakt och tester i stället för att duplicera domänlogik.
- Funktioner som endast finns i SQLite förblir fullvärdiga i stället för att bli läckande kompatibilitetslösningar.
- Migrerings- och transaktionsbeteende för flera repliker blir en uttrycklig designfråga.

### Kostnader och risker

- Extrahering av repositories kräver stegvis migrering av anropsställen.
- Asynkrona gränser kan spridas genom tjänstekod som för närvarande är synkron.
- Semantik mellan olika backends kräver konformitetstester utöver kompatibilitet med SQL-syntax.
- Säkerhetskopiering, sökning, vektorlagring och underhåll förblir funktionsspecifika.
- Att köra mer än en beständighetsimplementation ökar kostnaden för CI och driftstöd.

## Icke-mål

Denna ADR:

- lägger inte till något databasberoende, någon miljövariabel, något schema eller någon migrering;
- ändrar inte den aktiva SQLite-singletonen eller kaskaden av drivrutiner;
- utlovar inte stöd för PostgreSQL eller MySQL i en viss version;
- gör inte FTS5, `sqlite-vec`, säkerhetskopior eller SQLite-underhåll portabla;
- definierar inte beredskap för aktiv-aktiv drift innan tester för delat tillstånd och samordning finns;
- godkänner inte en fullständig omskrivning av `src/lib/db/` i ett enda steg.

## Öppna frågor för godkännande av ansvarig utvecklare

1. Är gränssnittet mellan repositoryt och den interna asynkrona backend-delen den föredragna inriktningen, eller bör
   extern persistens ligga bakom en separat kontrollplanstjänst?
2. Är PostgreSQL acceptabelt som den första externa implementationen efter verifiering av överensstämmelse med SQLite?
3. Vilken domän bör utgöra den första avgränsade repository-delen?
4. Vilket tillstånd måste delas för den första milstolpen med flera repliker, och vilket förblir nodlokalt?
5. Vilket kompatibilitetsfönster krävs för en avbruten eller återställd repository-migrering?

Tills dessa frågor har lösts är detta dokument ett förslag, och ingen refaktorisering av exekveringsmiljön är underförstådd.
