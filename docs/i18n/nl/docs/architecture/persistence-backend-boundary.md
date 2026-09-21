# ADR: Pluggable persistence boundary (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Voorgesteld — goedkeuring van een maintainer is vereist voordat het runtimewerk begint
- **Tracking-issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Reikwijdte:** Alleen persistentiearchitectuur; deze beslissing voegt geen externe database toe en selecteert er ook geen

## Context

OmniRoute biedt momenteel domeingerichte persistentiefuncties vanuit `src/lib/db/`, terwijl de
gedeelde verbinding die door `src/lib/db/core.ts` wordt geretourneerd, het synchrone `SqliteAdapter`-
contract in `src/lib/db/adapters/types.ts` implementeert. Die adapter ondersteunt meerdere SQLite-runtimes, maar het
oppervlak blijft op SQLite geënt: synchrone prepared statements, `pragma`, uitgestelde en onmiddellijke
transacties, native back-ups/back-ups via bestandskopieën, checkpoints en een lokale databasehandle.

Het huidige opstart- en herstelpad beheert ook de levenscyclus van het SQLite-bestand. `src/lib/db/core.ts`
bepaalt de locatie van `storage.sqlite`, onderhoudt één procesglobale adapter, voert checkpoints uit op de WAL, behoudt geselecteerde
tabellen tijdens herstel en verwijdert begeleidende SQLite-bestanden wanneer een database opnieuw wordt opgebouwd. De selectie
van drivers in `src/lib/db/adapters/driverFactory.ts` kiest uit de ondersteunde SQLite-runtimes; dit
is geen abstractie voor externe backends.

Schema-evolutie is op vergelijkbare wijze gekoppeld. `src/lib/db/migrationRunner.ts` past genummerde SQL-bestanden toe,
onderzoekt `sqlite_master` en `PRAGMA table_info`, detecteert optionele ondersteuning voor FTS5 en voert migratiewerk
uit binnen SQLite-transacties. Operationele modules zoals `src/lib/db/backup.ts` en
`src/lib/db/optimizationSettings.ts` gebruiken rechtstreeks semantiek voor back-ups, `PRAGMA`, WAL, paginagrootte, automatisch vacuüm en `VACUUM`.

Dit zijn geldige eigenschappen van de ingebedde SQLite-implementatie. Ze moeten beschikbaar blijven zonder
PostgreSQL of MySQL te dwingen een SQLite-API te emuleren.

## Beslissing

Voer een persistentiegrens met twee niveaus in voor overdraagbare duurzame status:

1. **Domeinrepositorycontracten** definiëren de persistentiebewerkingen die bedrijfs- en routeringscode
   nodig heeft. Aanroepende code is afhankelijk van domeingedrag en domeingegevens, niet van SQL-tekst, prepared statements,
   databasebestanden of dialectobjecten.
2. **Een intern asynchroon backendcontract** ondersteunt repository-implementaties met
   transactiecontexten, status- en gereedheidscontroles, migratiecoördinatie, backendmogelijkheden en
   geclassificeerde fouten. Het exacte TypeScript-oppervlak wordt voorgesteld bij de eerste implementatie-PR
   en aangetoond met conformiteitstests; deze ADR legt bewust geen speculatieve API vast.

SQLite blijft de standaardimplementatie. De bestaande SQLite-drivercascade en synchrone
`SqliteAdapter` blijven achter de SQLite-repository-implementatie terwijl domeinen in
kleine verticale segmenten worden gemigreerd. Geen enkele gebruiker hoeft een externe service te configureren.

PostgreSQL is de eerste voorgestelde externe implementatie nadat de repositorygrens
met SQLite is gevalideerd. MySQL volgt als gelijkwaardige implementatie op basis van dezelfde conformiteitssuite,
in plaats van als een tweede afsplitsing van de bedrijfslogica.

## Regels voor de grens

### Overdraagbaar repositoryoppervlak

Een overdraagbare repository mag het volgende aanbieden:

- domeinlees- en schrijfbewerkingen;
- expliciete atomaire bewerkingen en repositorytoegang binnen een transactiecontext;
- vergelijkings-/bijwerkbewerkingen of leasebewerkingen wanneer gelijktijdigheidssemantiek deel uitmaakt van het domein;
- backendneutrale paginering, sortering en constraintfouten.

Backendstatus, gereedheid en migratiecoördinatie behoren tot het interne backend-/operationele
contract en niet tot afzonderlijke domeinrepositories.

Een overdraagbare repository mag het volgende niet aanbieden:

- `prepare`, `get`, `all`, `run` of onbewerkte driverhandles;
- `PRAGMA`, WAL-checkpointmodi, `VACUUM` of afstemming van pagina's/caches;
- SQLite-bestandspaden, begeleidende bestanden of back-ups via bestandskopieën;
- `lastInsertRowid` als een backendoverschrijdend domeincontract;
- FTS5- of `sqlite-vec`-syntaxis;
- een generieke dialectuitweg die door normale bedrijfscode wordt gebruikt.

### Oppervlak voor backendmogelijkheden

Backendspecifiek gedrag blijft expliciet en vindbaar. Onderhoud dat uitsluitend voor SQLite geldt, blijft achter
de eigen implementatie en operationele interface ervan, waaronder:

- selectie van runtimedrivers;
- WAL-checkpoints en SQLite-afsluitgedrag;
- instellingen voor paginagrootte, cachegrootte en automatisch vacuüm;
- back-up, herstel en reconstructie van databasebestanden;
- SQLite-schema-inspectie;
- integratie van FTS5 en `sqlite-vec`.

Een externe backend hoeft deze functies niet te imiteren. Repositories moeten een
overdraagbare mogelijkheid gebruiken, een backendspecifieke implementatie met gedocumenteerd gedrag bieden of melden
dat een mogelijkheid niet beschikbaar is.

## Transactie- en migratiemodel

Repository-API's definiëren de atomaire bedrijfsbewerking; aanroepers selecteren geen SQL-transactiemodus.
Elke bewerking moet haar waarneembare gelijktijdigheidsgaranties definiëren: beschermde invarianten, conflictdetectie, classificatie voor nieuwe pogingen, verwachtingen ten aanzien van idempotentie en propagatie van de transactiecontext.
Implementaties mogen alleen verschillende transactie- en isolatiemechanismen gebruiken wanneer die waarneembare garanties gelijkwaardig blijven. SQLite mag intern het huidige uitgestelde of onmiddellijke transactiegedrag blijven gebruiken wanneer dit voldoet aan het contract van de bewerking.

Externe backends vereisen expliciet eigenaarschap van migraties, zodat meerdere applicatiereplica's niet gelijktijdig dezelfde schemawijziging proberen uit te voeren. Migratiegeschiedenissen van backends mogen logische mijlpalen delen, maar er wordt niet aangenomen dat SQLite SQL-bestanden overdraagbaar of herbruikbaar zijn voor een ander dialect.

## Conformantiesemantiek voor verschillende backends

Conformiteitstests moeten gedrag bestrijken, niet alleen de signatures van repositorymethoden. Elk gemigreerd domein moet het volgende definiëren en verifiëren:

- tijdzone, precisie en serialisatie van timestamps;
- verwachtingen voor de sortering van `NULL`, collatie en hoofdlettergevoeligheid;
- JSON-representatie en vergelijkingsgedrag;
- precisie van gehele getallen, decimalen en geldbedragen;
- stabiele sortering en deterministische beslissingscriteria bij gelijke waarden voor paginering;
- ID-generatie zonder afhankelijkheid van SQLite-rij-ID's;
- classificatie van schendingen van uniciteits- en refererende-sleutelbeperkingen;
- gedrag met betrekking tot het aantal beïnvloede rijen bij no-op-, vergelijkings-/bijwerkings- en verwijderingsbewerkingen;
- resultaten van gelijktijdige schrijfbewerkingen, conflicten waarbij een nieuwe poging mogelijk is en idempotente nieuwe pogingen.

Als een domein geen gelijkwaardige waarneembare semantiek kan vastleggen, is het nog niet overdraagbaar en moet het backendspecifiek blijven totdat dat contract is ontworpen.

## Compatibiliteitsvereisten

Elke implementatie die deze ADR volgt, moet de volgende eigenschappen behouden:

- SQLite blijft de standaard zonder configuratie.
- Bestaande SQLite-bestanden en migratiegeschiedenis blijven leesbaar.
- SQLite-fallbacks voor npm, Electron, Docker en omgevingen met runtimebeperkingen behouden hun huidige opstartpad.
- Opgeslagen providerreferenties blijven het bestaande versleutelingsgedrag van de applicatie gebruiken.
- Een repositorymigratie wijzigt niet stilzwijgend de semantiek voor routering, quota, API-sleutels of audits.
- Back-up- en herstelgedrag wordt per backend gedocumenteerd en niet als universeel gepresenteerd.
- Een schone installatie die uitsluitend SQLite gebruikt, laadt of vereist geen extern databasestuurprogramma.

## Opleveringsvolgorde

1. Publiceer een reproduceerbare inventarisatie van SQLite-koppelingen als afzonderlijk reviewartefact.
2. Introduceer de eerste domeinrepositorycontracten en conformiteitstests.
3. Pas de bestaande SQLite-implementatie achter die contracten aan zonder de standaardinstellingen te wijzigen.
4. Voeg, onder voorbehoud van goedkeuring door de maintainers, PostgreSQL toe als de eerste externe implementatie voor één afgebakend onderdeel van het control plane.
5. Breid de gedeelde status pas uit nadat er tests bestaan voor gelijktijdige schrijfbewerkingen en migratie-eigenaarschap.
6. Voeg een offline, gevalideerd migratiepad van SQLite naar een externe database toe voordat het wisselen van database wordt aangekondigd.
7. Voeg MySQL toe op basis van de bewezen repository- en backendcontracten.

Elke runtimestap is een afzonderlijke, beoordeelbare PR. Een latere stap mag niet worden gebruikt om het samenvoegen van een onbewezen abstractie in een eerdere stap te rechtvaardigen.

## Eerste implementatiefase

De eerste runtimefase moet worden geselecteerd nadat de inventarisatie van koppelingen is beoordeeld. Providerverbindingen, API-sleutels, combo's en routeringsconfiguratie zijn kandidaten omdat hun basistabellen zichtbaar zijn in `src/lib/db/core.ts`, maar deze ADR verleent geen goedkeuring voor een tabellenlijst of een migratie-PR.
De fase moet het volgende omvatten:

- tests voor behoud van SQLite-gedrag;
- conformiteitstests voor repositories;
- expliciete transactiegrenzen;
- verificatie van versleuteling en redactie van opgeslagen referenties;
- geen wijziging van de standaardopstartconfiguratie.

## Overwogen alternatieven

### PostgreSQL onder `SqliteAdapter` toevoegen

Afgewezen. `SqliteAdapter` is een compatibiliteitslaag voor SQLite-runtimes en stelt SQLite-specifieke bewerkingen beschikbaar. Het emuleren van dat API-oppervlak zou synchrone en dialectspecifieke aannames laten doorsijpelen naar een nieuwe backend.

### Een generieke query/execute-API aan alle domeinen beschikbaar stellen

Afgewezen als primaire grens. Dit zou de afhandeling van verbindingen centraliseren, maar de koppeling aan SQL-dialecten, transacties en tabellen in bedrijfsmodules laten bestaan. Een primitief backendmechanisme op laag niveau mag binnen repository-implementaties bestaan, maar niet als de applicatiegerichte persistentie-API.

### Alle persistentie herschrijven voordat één fase is gevalideerd

Afgewezen. Het huidige persistentieoppervlak is breed en omvat de levenscyclus van bestanden, herstel, zoeken en operationele instellingen. Verticale fasen bieden overzichtelijke gedrags- en terugdraaigrenzen.

### SQLite als standaard vervangen

Afgewezen. Ingebedde en desktopimplementaties zijn afhankelijk van het huidige opstartmodel zonder externe service. Een externe backend is optioneel.

### Redis als duurzame autoriteit gebruiken

Afgewezen. Redis kan expliciet tijdelijke coördinatie, caching of tellers ondersteunen, maar vervangt het hier beschreven duurzame repositorycontract niet.

## Gevolgen

### Positief

- Bedrijfscode krijgt een stabiele persistentiegrens die onafhankelijk is van het databasedialect.
- SQLite-gedrag wordt getest voordat een externe backend de abstractie bepaalt.
- PostgreSQL en MySQL delen contracten en tests in plaats van domeinlogica te dupliceren.
- Functies die alleen in SQLite beschikbaar zijn, blijven volwaardige mogelijkheden in plaats van lekkende compatibiliteitsshims te worden.
- Migratie- en transactiegedrag met meerdere replica's wordt een expliciet ontwerpaandachtspunt.

### Kosten en risico's

- Het extraheren van repositories vereist een stapsgewijze migratie van aanroeplocaties.
- Asynchrone grenzen kunnen doorwerken in momenteel synchrone servicecode.
- Semantiek tussen backends vereist conformiteitstests die verder gaan dan compatibiliteit van SQL-syntaxis.
- Back-ups, zoeken, vectoropslag en onderhoud blijven mogelijkheidsspecifiek.
- Het uitvoeren van meer dan één persistentie-implementatie verhoogt de kosten voor CI en operationele ondersteuning.

## Niet-doelstellingen

Deze ADR:

- voegt geen databaseafhankelijkheid, omgevingsvariabele, schema of migratie toe;
- wijzigt de actieve SQLite-singleton of drivercascade niet;
- belooft geen ondersteuning voor PostgreSQL of MySQL in een specifieke release;
- maakt FTS5, `sqlite-vec`, back-upbestanden of SQLite-onderhoud niet overdraagbaar;
- definieert geen gereedheid voor active-active voordat tests voor gedeelde status en coördinatie bestaan;
- keurt geen eenmalige volledige herschrijving van `src/lib/db/` goed.

## Openstaande vragen ter goedkeuring door de beheerder

1. Is de repository plus de interne asynchrone backendgrens de voorkeursrichting, of moet
   externe persistentie achter een afzonderlijke control-plane-service worden geplaatst?
2. Is PostgreSQL aanvaardbaar als eerste externe implementatie na SQLite-conformiteit?
3. Welk domein moet de eerste afgebakende repositoryslice zijn?
4. Welke status moet worden gedeeld voor de eerste mijlpaal met meerdere replica's, en welke blijft lokaal voor het knooppunt?
5. Welke compatibiliteitsperiode is vereist voor een onderbroken of teruggedraaide repositorymigratie?

Totdat deze vragen zijn beantwoord, is dit document een voorstel en wordt er geen runtime-refactoring verondersteld.
