# ADR: Pluggable persistence boundary (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Foreslått — krever godkjenning fra en vedlikeholder før arbeid på kjøretidsmiljøet påbegynnes
- **Sporingssak:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Omfang:** Kun persistensarkitektur; denne beslutningen legger ikke til eller velger en ekstern database

## Kontekst

OmniRoute tilbyr for øyeblikket domeneorienterte persistensfunksjoner fra `src/lib/db/`, mens den
delte tilkoblingen som returneres av `src/lib/db/core.ts`, implementerer den synkrone `SqliteAdapter`-kontrakten
i `src/lib/db/adapters/types.ts`. Denne adapteren støtter flere SQLite-kjøretidsmiljøer, men
grensesnittet er fortsatt utformet etter SQLite: synkrone forberedte uttrykk, `pragma`, utsatte og umiddelbare
transaksjoner, innebygd sikkerhetskopiering eller sikkerhetskopiering ved filkopiering, kontrollpunkt og et lokalt databasehåndtak.

Den nåværende oppstarts- og gjenopprettingsflyten styrer også livssyklusen til SQLite-filen. `src/lib/db/core.ts`
finner `storage.sqlite`, opprettholder én prosessglobal adapter, oppretter kontrollpunkter for WAL, bevarer utvalgte
tabeller under gjenoppretting og fjerner SQLite-tilleggsfiler når en database bygges opp på nytt. Valg av driver
i `src/lib/db/adapters/driverFactory.ts` velger blant de støttede SQLite-kjøretidsmiljøene; dette
er ikke en abstraksjon for eksterne bakender.

Skjemautvikling er koblet på tilsvarende måte. `src/lib/db/migrationRunner.ts` bruker nummererte SQL-filer,
undersøker `sqlite_master` og `PRAGMA table_info`, oppdager valgfri støtte for FTS5 og kjører
migreringsarbeid i SQLite-transaksjoner. Driftsmoduler som `src/lib/db/backup.ts` og
`src/lib/db/optimizationSettings.ts` bruker semantikk for sikkerhetskopiering, `PRAGMA`, WAL, sidestørrelse, automatisk tømming og `VACUUM`
direkte.

Dette er gyldige egenskaper ved den innebygde SQLite-distribusjonen. De bør fortsatt være tilgjengelige uten
å tvinge PostgreSQL eller MySQL til å etterligne et SQLite-API.

## Beslutning

Innfør et persistensskille på to nivåer for portabel, varig tilstand:

1. **Kontrakter for domenerepositorier** definerer persistensoperasjonene som forretnings- og rutingskoden
   trenger. Kallende kode avhenger av domeneatferd og domenedata, ikke SQL-tekst, forberedte uttrykk,
   databasefiler eller dialektobjekter.
2. **En intern asynkron backend-kontrakt** støtter repositorieimplementasjoner med
   transaksjonskontekster, helse/beredskap, migreringskoordinering, backend-funksjonalitet og
   klassifiserte feil. Det nøyaktige TypeScript-grensesnittet vil bli foreslått i den første implementerings-PR-en
   og verifisert gjennom samsvarstester; denne ADR-en fastlåser bevisst ikke et spekulativt API.

SQLite forblir standardimplementasjonen. Den eksisterende SQLite-driverkjeden og synkrone
`SqliteAdapter` forblir bak SQLite-repositorieimplementasjonen mens domener migreres i
små, vertikale deler. Ingen brukere må konfigurere en ekstern tjeneste.

PostgreSQL er den første foreslåtte eksterne implementasjonen etter at repositoriegrensen er verifisert
mot SQLite. MySQL følger som en likestilt implementasjon mot den samme samsvarstestsamlingen, fremfor
som en alternativ gren av forretningslogikken.

## Regler for grensesnittet

### Portabelt repositoriegrensesnitt

Et portabelt repositorium kan eksponere:

- lesing og skriving av domenedata;
- eksplisitte atomiske operasjoner og transaksjonsavgrenset repositorietilgang;
- sammenlignings-/oppdaterings- eller leieoperasjoner der samtidighetssemantikk er en del av domenet;
- backend-nøytral paginering, sortering og begrensningsfeil.

Backend-helse, beredskap og migreringskoordinering hører hjemme i den interne backend-/driftskontrakten
fremfor i individuelle domenerepositorier.

Et portabelt repositorium skal ikke eksponere:

- `prepare`, `get`, `all`, `run` eller rå driverhåndtak;
- `PRAGMA`, WAL-kontrollpunktmoduser, `VACUUM` eller justering av side-/hurtigbufferinnstillinger;
- SQLite-filstier, tilleggsfiler eller sikkerhetskopiering ved filkopiering;
- `lastInsertRowid` som en domenekontrakt på tvers av bakender;
- syntaks for FTS5 eller `sqlite-vec`;
- en generell utvei til databasespesifikke dialekter som brukes av vanlig forretningskode.

### Grensesnitt for backend-funksjonalitet

Backend-spesifikk atferd forblir eksplisitt og synlig. Vedlikehold som kun gjelder SQLite, forblir bak
sin egen implementasjon og sitt eget driftsgrensesnitt, inkludert:

- valg av kjøretidsdriver;
- WAL-kontrollpunkt og avslutningsatferd for SQLite;
- innstillinger for sidestørrelse, hurtigbufferstørrelse og automatisk tømming;
- sikkerhetskopiering, gjenoppretting og reparasjon av databasefiler;
- inspeksjon av SQLite-skjemaet;
- integrasjon med FTS5 og `sqlite-vec`.

En ekstern backend er ikke pålagt å etterligne disse funksjonene. Repositorier må enten bruke en
portabel funksjon, tilby en backend-spesifikk implementasjon med dokumentert atferd eller rapportere
at en funksjon ikke er tilgjengelig.

## Transaksjons- og migreringsmodell

Repository-API-er definerer den atomiske forretningsoperasjonen; kallere velger ikke en SQL-transaksjonsmodus.
Hver operasjon må definere sine observerbare samtidighetsgarantier: beskyttede invarianter, konfliktdeteksjon,
klassifisering av nye forsøk, forventninger til idempotens og videreføring av transaksjonskontekst.
Implementasjoner kan bruke ulike transaksjons- og isolasjonsmekanismer bare når disse observerbare
garantiene forblir likeverdige. SQLite kan fortsette å bruke sin nåværende utsatte eller umiddelbare
transaksjonsatferd internt der dette oppfyller operasjonens kontrakt.

Eksterne backender krever eksplisitt eierskap til migreringer, slik at flere applikasjonsreplikaer ikke kan konkurrere
om den samme skjemaendringen. Migreringshistorikk for backender kan dele logiske milepæler, men SQLite SQL-filer
antas ikke å være portable eller gjenbrukbare i en annen dialekt.

## Semantikk for samsvar på tvers av backender

Samsvarstester må dekke atferd, ikke bare signaturer for repository-metoder. Hvert migrerte domene
må definere og verifisere:

- tidssonen, presisjonen og serialiseringen for tidsstempler;
- forventninger til `NULL`-sortering, kollasjon og forskjell på store og små bokstaver;
- JSON-representasjon og sammenligningsatferd;
- presisjon for heltall, desimaltall og pengebeløp;
- stabil sortering og deterministiske mekanismer for å bryte likhet ved paginering;
- ID-generering uten å være avhengig av SQLite-rad-ID-er;
- klassifisering av brudd på entydighets- og fremmednøkkelregler;
- atferd for antall berørte rader ved operasjoner uten effekt, sammenligning/oppdatering og sletting;
- utfall ved samtidige skrivinger, konflikter som kan forsøkes på nytt, og idempotente nye forsøk.

Hvis et domene ikke kan angi likeverdig observerbar semantikk, er det ennå ikke portabelt og må forbli
backend-spesifikt inntil denne kontrakten er utformet.

## Kompatibilitetskrav

Enhver implementasjon som følger denne ADR-en, må bevare disse egenskapene:

- SQLite forblir standardvalget uten konfigurasjon.
- Eksisterende SQLite-filer og migreringshistorikk forblir lesbare.
- SQLite-reserveløsningene for npm, Electron, Docker og begrensede kjøretidsmiljøer beholder sin nåværende oppstartssekvens.
- Lagret påloggingsinformasjon for leverandører fortsetter å bruke applikasjonens eksisterende krypteringsatferd.
- En repository-migrering endrer ikke i det skjulte semantikk for ruting, kvoter, API-nøkler eller revisjonslogging.
- Atferd for sikkerhetskopiering og gjenoppretting dokumenteres per backend i stedet for å fremstilles som universell.
- En ren installasjon som bare bruker SQLite, laster ikke inn eller krever en ekstern databasedriver.

## Leveranserekkefølge

1. Publiser en reproduserbar oversikt over SQLite-koblinger som en separat gjennomgangsartefakt.
2. Introduser de første kontraktene for domenerepositorier og samsvarstestene.
3. Tilpass den eksisterende SQLite-implementasjonen bak disse kontraktene uten å endre standardinnstillingene.
4. Med forbehold om godkjenning fra vedlikeholderne, legg til PostgreSQL som den første eksterne implementasjonen for én
   avgrenset del av kontrollplanet.
5. Utvid delt tilstand først etter at tester for samtidige skrivinger og migreringseierskap finnes.
6. Legg til en frakoblet, validert migreringsbane fra SQLite til ekstern database før databasebytte markedsføres.
7. Legg til MySQL basert på de utprøvde repository- og backend-kontraktene.

Hvert kjøretidstrinn er en separat PR som kan gjennomgås. Et senere trinn må ikke brukes til å rettferdiggjøre sammenslåing av en
uprøvd abstraksjon i et tidligere trinn.

## Første implementeringsdel

Den første delen av kjøretidsimplementeringen skal velges etter at kartleggingen av koblinger er gjennomgått. Leverandørtilkoblinger, API-nøkler, kombinasjoner og rutingskonfigurasjon er kandidater fordi basistabellene deres er synlige i `src/lib/db/core.ts`, men denne ADR-en godkjenner ikke en tabelliste eller en migrerings-PR.
Delen må omfatte:

- tester som sikrer at SQLite-atferden bevares;
- konformitetstester for repositorier;
- eksplisitte transaksjonsgrenser;
- verifisering av kryptering og maskering av lagret legitimasjon;
- ingen endring av standardkonfigurasjonen ved oppstart.

## Vurderte alternativer

### Legge til PostgreSQL under `SqliteAdapter`

Avvist. `SqliteAdapter` er et kompatibilitetslag for SQLite-kjøretidsmiljøer og eksponerer SQLite-spesifikke operasjoner. Å emulere dette grensesnittet ville føre synkrone og dialektspesifikke antakelser inn i en ny backend.

### Eksponere et generisk API for spørringer og kjøring til alle domener

Avvist som primær grense. Det ville sentralisere tilkoblingshåndteringen, men la koblinger til SQL-dialekt, transaksjoner og tabeller bli værende i forretningsmodulene. En backend-primitiv på lavt nivå kan finnes internt i repositorieimplementasjoner, men ikke som applikasjonens grensesnitt for persistens.

### Skrive om all persistens før én del valideres

Avvist. Det nåværende persistensgrensesnittet er omfattende og inkluderer fillivssyklus, gjenoppretting, søk og driftsinnstillinger. Vertikale deler gir oversiktlige grenser for gjennomgang av atferd og tilbakerulling.

### Erstatte SQLite som standard

Avvist. Innebygde installasjoner og skrivebordsinstallasjoner er avhengige av den nåværende oppstartsmodellen uten separate tjenester. En ekstern backend er valgfri.

### Bruke Redis som varig autoritativ kilde

Avvist. Redis kan støtte eksplisitt midlertidig koordinering, hurtigbuffer eller tellere, men erstatter ikke den varige repositoriekontrakten som beskrives her.

## Konsekvenser

### Positive

- Forretningskoden får et stabilt persistensgrensesnitt som er uavhengig av databasedialekt.
- SQLite-atferden testes før en ekstern backend definerer abstraksjonen.
- PostgreSQL og MySQL deler kontrakter og tester i stedet for å duplisere domenelogikk.
- Funksjoner som bare finnes i SQLite, forblir fullverdige i stedet for å bli utette kompatibilitetslag.
- Migrerings- og transaksjonsatferd med flere replikaer blir et eksplisitt designhensyn.

### Kostnader og risikoer

- Utskilling av repositorier krever trinnvis migrering av kallesteder.
- Asynkrone grenser kan forplante seg gjennom tjenestekode som i dag er synkron.
- Semantikk på tvers av backender krever konformitetstester utover kompatibilitet med SQL-syntaks.
- Sikkerhetskopiering, søk, vektorlagring og vedlikehold forblir funksjonsspesifikke.
- Drift av mer enn én persistensimplementasjon øker kostnadene for CI og driftsstøtte.

## Ikke-mål

Denne ADR-en:

- legger ikke til en databaseavhengighet, miljøvariabel, et skjema eller en migrering;
- endrer ikke den aktive SQLite-singletonen eller driverkaskaden;
- lover ikke støtte for PostgreSQL eller MySQL i en bestemt utgivelse;
- gjør ikke FTS5, `sqlite-vec`, sikkerhetskopifiler eller SQLite-vedlikehold portabelt;
- definerer ikke beredskap for aktiv-aktiv drift før det finnes tester for delt tilstand og koordinering;
- godkjenner ikke en engangsomskriving av `src/lib/db/`.

## Åpne spørsmål som krever godkjenning fra vedlikeholder

1. Er repositoryet med en intern asynkron backend-grense den foretrukne retningen, eller bør
   ekstern persistens ligge bak en separat kontrollplantjeneste?
2. Er PostgreSQL akseptabelt som den første eksterne implementasjonen etter SQLite-konformitet?
3. Hvilket domene bør være den første avgrensede repository-delen?
4. Hvilken tilstand må deles for den første milepælen med flere replikaer, og hvilken skal forbli lokal for noden?
5. Hvilket kompatibilitetsvindu kreves for en avbrutt eller tilbakestilt repository-migrering?

Inntil disse spørsmålene er avklart, er dette dokumentet et forslag, og ingen refaktorering av kjøretidsmiljøet er underforstått.
