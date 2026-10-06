# ADR: Pluggable persistence boundary (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Propost — jeħtieġ l-approvazzjoni tal-mantenitur qabel ma jibda x-xogħol fuq ir-runtime
- **Kwistjoni ta' traċċar:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Ambitu:** L-arkitettura tal-persistenza biss; din id-deċiżjoni ma żżidx u ma tagħżilx database esterna

## Kuntest

OmniRoute bħalissa jippreżenta funzjonijiet ta' persistenza orjentati lejn id-dominju minn `src/lib/db/`, filwaqt li l-konnessjoni kondiviża rritornata minn `src/lib/db/core.ts` timplimenta l-kuntratt sinkroniku `SqliteAdapter` f'`src/lib/db/adapters/types.ts`. Dak l-adapter jappoġġja diversi runtimes ta' SQLite, iżda l-interfaċċa tiegħu tibqa' mfassla skont SQLite: dikjarazzjonijiet ippreparati sinkroniċi, `pragma`, tranżazzjonijiet differiti u immedjati, backup nattiv/permezz ta' kopja tal-fajl, checkpoint, u handle ta' database lokali.

Il-fluss attwali tal-istartjar u tal-irkupru jimmaniġġja wkoll iċ-ċiklu tal-ħajja tal-fajl SQLite. `src/lib/db/core.ts` jirriżolvi `storage.sqlite`, iżomm adapter wieħed globali għall-proċess, joħloq checkpoints tal-WAL, jippreserva tabelli magħżula matul l-irkupru, u jneħħi l-fajls anċillari ta' SQLite meta jerġa' jibni database. L-għażla tad-driver f'`src/lib/db/adapters/driverFactory.ts` tagħżel minn fost ir-runtimes SQLite appoġġjati; mhijiex astrazzjoni ta' backend estern.

L-evoluzzjoni tal-iskema hija marbuta b'mod simili. `src/lib/db/migrationRunner.ts` japplika fajls SQL innumerati, jeżamina `sqlite_master` u `PRAGMA table_info`, jidentifika l-appoġġ fakultattiv għal FTS5, u jwettaq ix-xogħol tal-migrazzjoni fi tranżazzjonijiet SQLite. Moduli operazzjonali bħal `src/lib/db/backup.ts` u `src/lib/db/optimizationSettings.ts` jużaw direttament is-semantika tal-backup, `PRAGMA`, WAL, id-daqs tal-paġna, l-auto-vacuum, u `VACUUM`.

Dawn huma karatteristiċi validi tad-deployment inkorporat ta' SQLite. Għandhom jibqgħu disponibbli mingħajr ma jġiegħlu lil PostgreSQL jew MySQL jimitaw API ta' SQLite.

## Deċiżjoni

Nadottaw konfini ta' persistenza fuq żewġ livelli għall-istat durabbli portabbli:

1. **Il-kuntratti tar-repożitorji tad-dominju** jiddefinixxu l-operazzjonijiet ta' persistenza meħtieġa mill-kodiċi tan-negozju u tar-routing. Il-konsumaturi jiddependu fuq l-imġiba u d-data tad-dominju, mhux fuq test SQL, dikjarazzjonijiet ippreparati, fajls tad-database, jew oġġetti tad-djalett.
2. **Kuntratt intern u asinkroniku tal-backend** jappoġġja l-implimentazzjonijiet tar-repożitorji b'kuntesti tat-tranżazzjonijiet, kontrolli tas-saħħa/prontezza, koordinazzjoni tal-migrazzjonijiet, kapaċitajiet tal-backend, u żbalji kklassifikati. L-interfaċċa TypeScript eżatta se tiġi proposta mal-ewwel PR tal-implimentazzjoni u ppruvata permezz ta' testijiet ta' konformità; dan l-ADR intenzjonalment ma jiffissax API spekulattiva.

SQLite jibqa' l-implimentazzjoni predefinita. Il-kaskata eżistenti tad-drivers SQLite u s-`SqliteAdapter` sinkroniku jibqgħu wara l-implimentazzjoni tar-repożitorju SQLite filwaqt li d-dominji jiġu migrati f'partijiet vertikali żgħar. L-ebda utent mhu meħtieġ jikkonfigura servizz estern.

PostgreSQL huwa l-ewwel implimentazzjoni esterna proposta wara li l-konfini tar-repożitorju jiġu ppruvati ma' SQLite. MySQL isegwi bħala implimentazzjoni parallela abbażi tal-istess ġabra ta' testijiet ta' konformità, minflok bħala tieni fergħa tal-loġika tan-negozju.

## Regoli tal-konfini

### Interfaċċa portabbli tar-repożitorju

Repożitorju portabbli jista' jesponi:

- qari u kitbiet tad-dominju;
- operazzjonijiet atomiċi espliċiti u aċċess għar-repożitorju fl-ambitu ta' tranżazzjoni;
- operazzjonijiet ta' tqabbil/aġġornament jew ta' lease fejn is-semantika tal-konkorenza tkun parti mid-dominju;
- paġinazzjoni, ordni, u żbalji tal-limitazzjonijiet newtrali għall-backend.

Is-saħħa u l-prontezza tal-backend, kif ukoll il-koordinazzjoni tal-migrazzjonijiet, jappartjenu għall-kuntratt intern tal-backend/operazzjonali aktar milli għal repożitorji tad-dominju individwali.

Repożitorju portabbli ma jistax jesponi:

- `prepare`, `get`, `all`, `run`, jew handles mhux ipproċessati tad-driver;
- `PRAGMA`, modi ta' checkpoint tal-WAL, `VACUUM`, jew irfinar tal-paġni/cache;
- mogħdijiet tal-fajls SQLite, fajls anċillari, jew backup permezz ta' kopja tal-fajl;
- `lastInsertRowid` bħala kuntratt tad-dominju bejn backends differenti;
- sintassi FTS5 jew `sqlite-vec`;
- mekkaniżmu ġeneriku ta' ħarba mid-djalett użat mill-kodiċi normali tan-negozju.

### Interfaċċa tal-kapaċitajiet tal-backend

L-imġiba speċifika għall-backend tibqa' espliċita u faċli biex tiġi skoperta. Il-manutenzjoni esklużiva għal SQLite tibqa' wara l-implimentazzjoni u l-interfaċċa operazzjonali tagħha stess, inklużi:

- l-għażla tad-driver tar-runtime;
- il-checkpoint tal-WAL u l-imġiba tal-għeluq ta' SQLite;
- is-settings tad-daqs tal-paġna, id-daqs tal-cache, u l-auto-vacuum;
- il-backup, ir-restawr, u l-irkupru tal-fajl tad-database;
- l-ispezzjoni tal-iskema SQLite;
- l-integrazzjoni ta' FTS5 u `sqlite-vec`.

Backend estern mhuwiex meħtieġ jimita dawk il-karatteristiċi. Ir-repożitorji jridu jew jużaw kapaċità portabbli, jipprovdu implimentazzjoni speċifika għall-backend b'imġiba dokumentata, jew jirrapportaw li kapaċità mhijiex disponibbli.

## Mudell tat-tranżazzjonijiet u tal-migrazzjoni

L-APIs tar-repożitorju jiddefinixxu l-operazzjoni kummerċjali atomika; min isejjaħhom ma jagħżilx modalità ta’ tranżazzjoni SQL.
Kull operazzjoni trid tiddefinixxi l-garanziji osservabbli tagħha dwar il-konkorenza: l-invarjanti protetti, l-individwazzjoni
tal-kunflitti, il-klassifikazzjoni tal-provi mill-ġdid, l-aspettattivi dwar l-idempotenza, u l-propagazzjoni tal-kuntest tat-tranżazzjoni.
L-implimentazzjonijiet jistgħu jużaw mekkaniżmi differenti ta’ tranżazzjoni u iżolament biss meta dawk il-garanziji osservabbli
jibqgħu ekwivalenti. SQLite jista’ jkompli juża internament l-imġiba attwali tiegħu ta’ tranżazzjonijiet differiti jew immedjati
fejn din tissodisfa l-kuntratt tal-operazzjoni.

Il-backends esterni jeħtieġu sjieda espliċita tal-migrazzjoni sabiex diversi repliki tal-applikazzjoni ma jikkompetux
għall-istess bidla fl-iskema. L-istorja tal-migrazzjonijiet tal-backends tista’ tikkondividi stadji importanti loġiċi, iżda l-fajls SQL
ta’ SQLite mhumiex preżunti li huma portabbli jew li jistgħu jerġgħu jintużaw bħala djalett ieħor.

## Semantika tal-konformità bejn il-backends

It-testijiet tal-konformità jridu jkopru l-imġiba, mhux biss il-firem tal-metodi tar-repożitorju. Kull dominju migrat
irid jiddefinixxi u jivverifika:

- iż-żona tal-ħin, il-preċiżjoni, u s-serjalizzazzjoni tat-timestamps;
- l-ordni ta’ `NULL`, il-kollazzjoni, u l-aspettattivi dwar is-sensittività għall-użu ta’ ittri kbar u żgħar;
- ir-rappreżentazzjoni JSON u l-imġiba tat-tqabbil;
- il-preċiżjoni tan-numri sħaħ, tan-numri deċimali, u tal-valuri monetarji;
- ordni stabbli u kriterji deterministiċi għas-soluzzjoni tal-paritajiet fil-paġinazzjoni;
- il-ġenerazzjoni tal-IDs mingħajr dipendenza fuq l-IDs tar-ringieli ta’ SQLite;
- il-klassifikazzjoni tal-ksur tal-uniċità u taċ-ċwievet barranin;
- l-imġiba tan-numru ta’ ringieli affettwati għal operazzjonijiet li ma jagħmlu l-ebda bidla, ta’ tqabbil/aġġornament, u ta’ tħassir;
- ir-riżultati ta’ kitbiet konkorrenti, il-kunflitti li jistgħu jerġgħu jiġu ppruvati, u l-provi mill-ġdid idempotenti.

Jekk dominju ma jistax jiddikjara semantika osservabbli ekwivalenti, għadu mhuwiex portabbli u jrid jibqa’
speċifiku għall-backend sakemm jitfassal dak il-kuntratt.

## Rekwiżiti ta’ kompatibbiltà

Kull implimentazzjoni li ssegwi dan l-ADR trid tippreserva dawn il-proprjetajiet:

- SQLite jibqa’ l-għażla predefinita li ma teħtieġ l-ebda konfigurazzjoni.
- Il-fajls eżistenti ta’ SQLite u l-istorja tal-migrazzjonijiet jibqgħu jistgħu jinqraw.
- Il-mekkaniżmi alternattivi ta’ SQLite għal npm, Electron, Docker, u ambjenti ta’ eżekuzzjoni ristretti jżommu l-proċess attwali tagħhom tal-istartjar.
- Il-kredenzjali maħżuna tal-fornitur ikomplu jużaw l-imġiba eżistenti tal-kriptaġġ tal-applikazzjoni.
- Migrazzjoni tar-repożitorju ma tbiddilx b’mod sieket is-semantika tar-routing, tal-kwoti, taċ-ċwievet tal-API, jew tal-awditjar.
- L-imġiba tal-backup u tal-irkupru tiġi ddokumentata għal kull backend minflok ma tiġi ppreżentata bħala universali.
- Installazzjoni nadifa li tuża SQLite biss ma ttellax u ma teħtieġx driver ta’ database esterna.

## Sekwenza tat-twassil

1. Ippubblika inventarju riproduċibbli tad-dipendenzi fuq SQLite bħala artefatt separat għar-rieżami.
2. Introduċi l-ewwel kuntratti tar-repożitorji tad-dominju u t-testijiet tal-konformità.
3. Adatta l-implimentazzjoni eżistenti ta’ SQLite wara dawk il-kuntratti mingħajr ma tbiddel l-għażliet predefiniti.
4. Soġġett għall-approvazzjoni tal-mantenituri, żid PostgreSQL bħala l-ewwel implimentazzjoni esterna għal parti waħda
   limitata tal-pjan ta’ kontroll.
5. Estendi l-istat kondiviż biss wara li jkunu jeżistu testijiet tal-kitbiet konkorrenti u tas-sjieda tal-migrazzjoni.
6. Żid proċess offline u vvalidat ta’ migrazzjoni minn SQLite għal backend estern qabel ma tirreklama l-bdil tad-database.
7. Żid MySQL skont il-kuntratti ppruvati tar-repożitorju u tal-backend.

Kull pass waqt l-eżekuzzjoni huwa PR separat li jista’ jiġi rieżaminat. Pass aktar tard ma jridx jintuża biex jiġġustifika l-inkorporazzjoni ta’
astrazzjoni mhux ippruvata fi stadju preċedenti.

## L-ewwel parti tal-implimentazzjoni

L-ewwel parti tar-runtime għandha tintgħażel wara li jiġi rivedut l-inventarju tal-akkoppjament. Il-konnessjonijiet mal-fornituri, iċ-ċwievet tal-API, il-kombinazzjonijiet, u l-konfigurazzjoni tar-routing huma kandidati minħabba li t-tabelli bażi tagħhom huma viżibbli f’`src/lib/db/core.ts`, iżda dan l-ADR ma japprovax lista ta’ tabelli jew PR ta’ migrazzjoni. Il-parti trid tinkludi:

- testijiet għall-preservazzjoni tal-imġiba ta’ SQLite;
- testijiet tal-konformità tar-repożitorji;
- limiti espliċiti tat-tranżazzjonijiet;
- verifika tal-kriptaġġ u tar-redazzjoni għall-kredenzjali maħżuna;
- l-ebda bidla fil-konfigurazzjoni predefinita tal-istartjar.

## Alternattivi kkunsidrati

### Żid PostgreSQL taħt `SqliteAdapter`

Miċħuda. `SqliteAdapter` huwa saff ta’ kompatibbiltà għar-runtimes ta’ SQLite u jesponi operazzjonijiet speċifiċi għal SQLite. L-emulazzjoni ta’ dik l-interfaċċa ddaħħal suppożizzjonijiet sinkroniċi u speċifiċi għad-djalett f’backend ġdid.

### Esponi API ġenerika għall-queries/eżekuzzjoni lid-dominji kollha

Miċħuda bħala l-konfini primarju. Din tiċċentralizza l-immaniġġjar tal-konnessjonijiet iżda tħalli l-akkoppjament mad-djalett SQL, mat-tranżazzjonijiet, u mat-tabelli fil-moduli tan-negozju. Primittiva ta’ backend ta’ livell baxx tista’ teżisti ġewwa l-implimentazzjonijiet tar-repożitorji, mhux bħala l-API tal-persistenza esposta lill-applikazzjoni.

### Ikteb mill-ġdid il-persistenza kollha qabel ma tivvalida parti waħda

Miċħuda. L-interfaċċa attwali tal-persistenza hija wiesgħa u tinkludi ċ-ċiklu tal-ħajja tal-fajls, l-irkupru, it-tiftix, u s-settings operazzjonali. Il-partijiet vertikali jipprovdu mġiba u konfini ta’ rollback li jistgħu jiġu riveduti.

### Ibdel SQLite bħala l-għażla predefinita

Miċħuda. Id-deployments inkorporati u tad-desktop jiddependu fuq il-mudell attwali tal-istartjar mingħajr servizzi. Backend estern huwa fakultattiv.

### Uża Redis bħala l-awtorità durabbli

Miċħuda. Redis jista’ jappoġġja koordinazzjoni, cache, jew kontaturi espliċitament temporanji, iżda ma jissostitwixxix il-kuntratt durabbli tar-repożitorju deskritt hawnhekk.

## Konsegwenzi

### Pożittivi

- Il-kodiċi tan-negozju jikseb punt ta’ separazzjoni stabbli għall-persistenza, indipendenti mid-djalett tad-database.
- L-imġiba ta’ SQLite tiġi ttestjata qabel ma backend estern jiddefinixxi l-astrazzjoni.
- PostgreSQL u MySQL jaqsmu kuntratti u testijiet minflok jidduplikaw il-loġika tad-dominju.
- Il-kapaċitajiet esklużivi għal SQLite jibqgħu tal-ewwel klassi minflok isiru saffi ta’ kompatibbiltà li jnixxu d-dettalji.
- L-imġiba tal-migrazzjoni u tat-tranżazzjonijiet b’diversi repliki ssir kwistjoni espliċita tad-disinn.

### Spejjeż u riskji

- L-estrazzjoni tar-repożitorji teħtieġ migrazzjoni inkrementali tal-punti tas-sejħa.
- Il-konfini asinkroniċi jistgħu jinfirxu fil-kodiċi tas-servizzi li bħalissa huwa sinkroniku.
- Is-semantika bejn backends differenti teħtieġ testijiet ta’ konformità lil hinn mill-kompatibbiltà tas-sintassi SQL.
- Il-backup, it-tiftix, il-ħażna tal-vetturi, u l-manutenzjoni jibqgħu speċifiċi għall-kapaċitajiet.
- It-tħaddim ta’ aktar minn implimentazzjoni waħda tal-persistenza jżid l-ispejjeż tas-CI u tal-appoġġ operazzjonali.

## Dak li mhuwiex għan

Dan l-ADR ma:

- jżidx dipendenza tad-database, varjabbli tal-ambjent, skema, jew migrazzjoni;
- jibdilx is-singleton attiv ta’ SQLite jew il-kaskata tad-drivers;
- iwiegħed appoġġ għal PostgreSQL jew MySQL f’rilaxx speċifiku;
- jagħmilx l-FTS5, `sqlite-vec`, il-fajls tal-backup, jew il-manutenzjoni ta’ SQLite portabbli;
- jiddefinixxix il-prontezza active-active qabel ma jeżistu testijiet tal-istat kondiviż u tal-koordinazzjoni;
- japprovax kitba mill-ġdid f’daqqa ta’ `src/lib/db/`.

## Mistoqsijiet miftuħa għall-approvazzjoni tal-mantenitur

1. Ir-repożitorju flimkien ma’ interfaċċa interna asinkronika għall-backend huma d-direzzjoni ppreferuta, jew il-persistenza esterna għandha tkun wara servizz separat tal-pjan ta’ kontroll?
2. PostgreSQL huwa aċċettabbli bħala l-ewwel implimentazzjoni esterna wara l-konformità ma’ SQLite?
3. Liema dominju għandu jkun l-ewwel porzjon limitat tar-repożitorju?
4. Liema stat irid ikun kondiviż għall-ewwel stadju importanti b’diversi repliki, u liema jibqa’ lokali għan-node?
5. Liema perjodu ta’ kompatibbiltà huwa meħtieġ għal migrazzjoni tar-repożitorju li tkun ġiet interrotta jew imreġġgħa lura?

Sakemm dawn il-mistoqsijiet jiġu solvuti, dan id-dokument huwa proposta u ma jimplika l-ebda rifatturizzazzjoni waqt l-eżekuzzjoni.
