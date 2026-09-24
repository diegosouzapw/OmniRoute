# ADR: Pluggable persistence boundary (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Ọnọdụ:** Atụpụtara — ọ chọrọ nkwado onye na-elekọta tupu ọrụ runtime amalite
- **Okwu nleba anya:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Oke:** Naanị nhazi persistence; mkpebi a anaghị atụkwasị ma ọ bụ họrọ database mpụga

## Ọnọdụ gbara ya gburugburu

OmniRoute na-enye ugbu a ọrụ persistence ndị a haziri dịka ngalaba site na `src/lib/db/`, ebe njikọ
a na-ekekọrịta nke `src/lib/db/core.ts` na-eweghachi na-emejuputa nkwekọrịta `SqliteAdapter`
synchronous dị na `src/lib/db/adapters/types.ts`. Adapter ahụ na-akwado ọtụtụ SQLite runtimes, mana
interface ya ka nwere ọdịdị SQLite: prepared statements synchronous, `pragma`, transactions ndị
deferred na immediate, backup native/nke idetuo faịlụ, checkpoint, na handle database dị n'ime igwe.

Usoro mmalite na mgbake dị ugbu a na-ejikwa lifecycle faịlụ SQLite. `src/lib/db/core.ts`
na-achọpụta ebe `storage.sqlite` dị, na-edobe otu adapter process-global, na-eme checkpoint WAL, na-echekwa
tables ahọpụtara n'oge mgbake, ma na-ewepụ faịlụ ndị na-eso SQLite mgbe a na-ewughachi database. Nhọrọ
driver dị na `src/lib/db/adapters/driverFactory.ts` na-ahọrọ n'etiti SQLite runtimes ndị akwadoro; ọ
bụghị abstraction maka backend mpụga.

Mgbanwe schema jikọtara n'otu ụzọ ahụ. `src/lib/db/migrationRunner.ts` na-etinye faịlụ SQL ndị e nyere nọmba,
na-enyocha `sqlite_master` na `PRAGMA table_info`, na-achọpụta nkwado FTS5 nhọrọ, ma na-arụ ọrụ migration
n'ime transactions SQLite. Modulu arụmọrụ dịka `src/lib/db/backup.ts` na
`src/lib/db/optimizationSettings.ts` na-eji semantics nke backup, `PRAGMA`, WAL, page-size, auto-vacuum,
na `VACUUM` ozugbo.

Ihe ndị a bụ njirimara ziri ezi nke ntinye SQLite e wuru n'ime sistemụ. Ha kwesịrị ịdịgide n'enweghị
ịmanye PostgreSQL ma ọ bụ MySQL ime ka à ga-asị na ha bụ API SQLite.

## Mkpebi

Nabata ókè persistence nwere ọkwa abụọ maka state na-adịgide adịgide nke a pụrụ ibufe:

1. **Nkwekọrịta repository nke ngalaba** na-akọwa ọrụ persistence nke business na routing
   code chọrọ. Ndị na-akpọ ha na-adabere na omume ngalaba na data ngalaba, ọ bụghị ederede SQL, prepared statements,
   faịlụ database, ma ọ bụ dialect objects.
2. **Nkwekọrịta backend asynchronous dị n'ime** na-akwado mmejuputa repository site na
   transaction contexts, health/readiness, nhazi migration, backend capabilities, na
   njehie e kewara n'ụdị. A ga-atụpụta interface TypeScript kpọmkwem n'ime PR mmejuputa mbụ
   ma jiri conformance tests gosi ya; ADR a kpachaara anya ghara imechi API a na-eche n'echiche.

SQLite ka bụ mmejuputa ndabara. Usoro nhọrọ driver SQLite dị ugbu a na `SqliteAdapter`
synchronous ga-anọgide n'azụ mmejuputa repository SQLite ka a na-akwaga ngalaba n'otu n'otu
site na obere vertical slices. Ọ dịghị onye ọrụ a chọrọ ka ọ hazie service mpụga.

PostgreSQL bụ mmejuputa mpụga mbụ a tụrụ aro mgbe e gosipụtara na ókè repository
na-arụ ọrụ megide SQLite. MySQL ga-esochi dịka mmejuputa ibe ya megide otu conformance suite ahụ
kama ịbụ business-logic fork nke abụọ.

## Iwu ókè

### Interface repository a pụrụ ibufe

Repository a pụrụ ibufe nwere ike ikpughe:

- ịgụ na ide data ngalaba;
- ọrụ atomic doro anya na ohere repository dị n'ime transaction;
- ọrụ compare/update ma ọ bụ lease ebe concurrency semantics bụ akụkụ nke ngalaba;
- pagination, ordering, na constraint errors ndị anaghị adabere na backend.

Health, readiness, na nhazi migration nke backend bụ nke nkwekọrịta backend/arụmọrụ dị n'ime
kama ịbụ nke repository ngalaba nke ọ bụla.

Repository a pụrụ ibufe agaghị ekpughe:

- `prepare`, `get`, `all`, `run`, ma ọ bụ raw driver handles;
- `PRAGMA`, ụdị WAL checkpoint, `VACUUM`, ma ọ bụ nhazi page/cache;
- ụzọ faịlụ SQLite, faịlụ ndị na-eso ya, ma ọ bụ backup site n'ịdetuo faịlụ;
- `lastInsertRowid` dịka nkwekọrịta ngalaba cross-backend;
- syntax FTS5 ma ọ bụ `sqlite-vec`;
- generic dialect escape hatch nke business code nkịtị na-eji.

### Interface capability nke backend

Omume pụrụ iche nke backend ga-anọgide bụrụ nke doro anya ma dị mfe ịchọpụta. Mmezi naanị maka SQLite ga-anọgide n'azụ
mmejuputa na interface arụmọrụ nke ya, gụnyere:

- nhọrọ runtime driver;
- WAL checkpoint na omume mmechi SQLite;
- ntọala page-size, cache-size, na auto-vacuum;
- backup, restore, na recovery nke faịlụ database;
- introspection schema SQLite;
- njikọ FTS5 na `sqlite-vec`.

A chọghị ka backend mpụga ṅomie atụmatụ ndị ahụ. Repositories ga-eji
capability a pụrụ ibufe, nye mmejuputa pụrụ iche maka backend nwere omume e dere nke ọma, ma ọ bụ kọọ
na capability adịghị.

## Ụdị azụmahịa na mbugharị

API nke ebe nchekwa na-akọwa ọrụ azụmahịa a na-eme n’otu oge; ndị na-akpọ ya anaghị ahọrọ ụdị azụmahịa SQL.
Ọrụ ọ bụla ga-akọwarịrị nkwa mmekọrịta ya ndị a pụrụ ịhụ: ihe ndị a na-echekwa ka ha ghara ịgbanwe, nchọpụta esemokwu,
nhazi nke nnwale ọzọ, atụmanya idempotency, na nnyefe ọnọdụ azụmahịa.
Mmejuputa nwere ike iji usoro azụmahịa na ikewapụ dị iche iche naanị mgbe nkwa ndị ahụ a pụrụ ịhụ
ka bụ otu ihe. SQLite nwere ike ịga n’ihu iji omume azụmahịa deferred ma ọ bụ immediate
ọ na-eji ugbu a n’ime ya ebe ọ na-emezu nkwekọrịta ọrụ ahụ.

Backend mpụga chọrọ ka e nwee onye nwe mbugharị a kọwara nke ọma ka ọtụtụ oyiri ngwa ghara ịsọ mpi
ime otu mgbanwe schema ahụ. Akụkọ mbugharị backend nwere ike ịkekọrịta ọkwa ezi uche dị na ya, mana anaghị
ewere faịlụ SQL nke SQLite dị ka ihe a pụrụ ibufe ma ọ bụ jiri ọzọ dịka dialect ọzọ.

## Nkọwa nkwekọrịta n’ofe backend

Nnwale nkwekọrịta ga-ekpuchirịrị omume, ọ bụghị naanị signature nke method ebe nchekwa. Domain ọ bụla e bugharịrị
ga-akọwarịrị ma nyochaa:

- mpaghara oge, izi ezi, na serialization nke timestamp;
- nhazi `NULL`, collation, na atụmanya gbasara mmetụta mkpụrụedemede ukwu na nta;
- nnọchite JSON na omume ntụnyere;
- izi ezi nke integer, decimal, na ego;
- nhazi kwụsiri ike na ụzọ doro anya isi kpebie mgbe ihe hà nhata maka pagination;
- imepụta ID na-adabereghị na row ID nke SQLite;
- nhazi mmebi iwu uniqueness na foreign-key;
- omume nke ahịrị emetụtara maka ọrụ na-adịghị agbanwe ihe, ntụnyere/mmelite, na nhichapụ;
- nsonaazụ ide ihe n’otu oge, esemokwu ndị a pụrụ ịnwale ọzọ, na nnwale ọzọ ndị idempotent.

Ọ bụrụ na domain enweghị ike ịkọwa semantics ndị a pụrụ ịhụ nke hà nhata, ọ kabeghị njikere ibufe ma ga-anọgide
na-abụ nke backend ahụ kpọmkwem ruo mgbe e mepụtara nkwekọrịta ahụ.

## Ihe ndakọrịta chọrọ

Mmejuputa ọ bụla na-agbaso ADR a ga-echekwaghị njirimara ndị a:

- SQLite ga-anọgide na-abụ nhọrọ ndabara na-achọghị nhazi.
- Faịlụ SQLite na akụkọ mbugharị ndị dị ugbu a ga-anọgide na-agụpụta.
- npm, Electron, Docker, na fallback SQLite nke restricted-runtime ga-ejigide ụzọ mmalite ha dị ugbu a.
- Credential provider echekwara ga-anọgide na-eji omume izo ya ezo nke ngwa dị ugbu a.
- Mbugharị ebe nchekwa agaghị agbanwe routing, quota, API-key, ma ọ bụ semantics audit n’amaghị ama.
- A ga-edekọ omume backup na recovery maka backend ọ bụla kama igosi ya dịka nke zuru ụwa ọnụ.
- Nwụnye dị ọcha nke nwere naanị SQLite agaghị ebudata ma ọ bụ chọọ driver database mpụga.

## Usoro nnyefe

1. Bipụta ndepụta njikọ SQLite a pụrụ imepụtaghachi dịka artifact nyocha dị iche.
2. Tinye nkwekọrịta ebe nchekwa domain mbụ na nnwale nkwekọrịta.
3. Hazie mmejuputa SQLite dị ugbu a n’azụ nkwekọrịta ndị ahụ n’agbanweghị ndabara.
4. Dabere na nkwado ndị na-elekọta ya, tinye PostgreSQL dịka mmejuputa mpụga mbụ maka otu
   akụkụ nwere oke nke oyi akwa njikwa.
5. Gbasaa state a na-ekekọrịta naanị mgbe nnwale ide ihe n’otu oge na nnwale onye nwe mbugharị dị.
6. Tinye ụzọ mbugharị SQLite-gaa-na-mpụga nke na-arụ ọrụ offline ma kwadoro tupu ịkpọsa mgbanwe database.
7. Tinye MySQL dabere na nkwekọrịta ebe nchekwa na backend ndị egosipụtara na ha na-arụ ọrụ.

Nzọụkwụ runtime ọ bụla bụ PR dị iche nke a pụrụ inyocha. Agaghị eji nzọụkwụ e mesịrị kwado ijikọ
abstraction a na-egosibeghị na ọ na-arụ ọrụ n’ime nzọụkwụ mbụ.

## Akụkụ mmejuputa mbụ

A ga-ahọrọ akụkụ runtime mbụ mgbe e nyochachara ndepụta njikọ dị n'etiti ihe ndị ahụ. Njikọ provider, API keys, combos, na nhazi routing bụ ndị a pụrụ ịtụle n’ihi na a na-ahụ tebụl ntọala ha na `src/lib/db/core.ts`, mana ADR a anaghị akwado ndepụta tebụl ma ọ bụ PR migration. Akụkụ ahụ ga-agụnye:

- ule nchekwa-omume SQLite;
- ule nrubeisi repository;
- oke transaction ndị akọwapụtara nke ọma;
- nkwenye encryption na redaction maka credentials echekwara;
- enweghị mgbanwe na nhazi startup ndabara.

## Nhọrọ ndị a tụlere

### Tinye PostgreSQL n'okpuru `SqliteAdapter`

Ajụrụ ya. `SqliteAdapter` bụ compatibility layer maka runtime SQLite ma na-ekpughe ọrụ ndị pụrụ iche nye SQLite. Iṅomi interface ahụ ga-eme ka echiche ndị dabere na synchronous execution na dialect banye na backend ọhụrụ.

### Kpughee API query/execute izugbe nye domain niile

Ajụrụ ya dịka oke njikọ bụ isi. Ọ ga-eme ka njikwa connection dịrị n’otu ebe, mana ọ ga-ahapụ SQL dialect, transaction, na njikọ tebụl n’ime modulu azụmahịa. Backend primitive dị ala nwere ike ịdị n’ime mmejuputa repository, ọ bụghị dịka persistence API nke ngwa ahụ na-eji ozugbo.

### Degharịa persistence niile tupu e kwadoo otu akụkụ

Ajụrụ ya. Interface persistence dị ugbu a sara mbara ma gụnye lifecycle faịlụ, recovery, search, na operational settings. Akụkụ kwụ ọtọ na-enye oke omume na rollback ndị a pụrụ inyocha.

### Dochie SQLite dịka ndabara

Ajụrụ ya. Deployment embedded na desktop dabere na ụdị startup dị ugbu a nke na-achọghị service ọ bụla. Backend mpụga bụ nhọrọ onye ọrụ ga-ahọrọ n’onwe ya.

### Jiri Redis dịka isi ikike durable

Ajụrụ ya. Redis nwere ike ịkwado coordination ephemeral akọwapụtara nke ọma, cache, ma ọ bụ counters, mana ọ naghị anọchi contract repository durable akọwara ebe a.

## Nsonaazụ

### Ihe ọma

- Koodu azụmahịa na-enweta interface persistence kwụsiri ike nke na-adabereghị na database dialect.
- A na-anwale omume SQLite tupu backend mpụga akọwaa abstraction ahụ.
- PostgreSQL na MySQL na-ekekọrịta contracts na ule kama imepụtaghachi domain logic.
- Ikike ndị bụ naanị nke SQLite na-anọgide bụrụ ndị dị mkpa kama ịghọ compatibility shims na-ekpughe nkọwa ime.
- Omume migration na transaction n’ọnọdụ multi-replica na-aghọ ihe nhazi a kọwara nke ọma.

### Ọnụ ahịa na ihe ize ndụ

- Iwepụta repository chọrọ ịkwaga call-site nke nta nke nta.
- Oke async nwere ike ịgbasa n’ime koodu service ndị na-arụ ọrụ synchronous ugbu a.
- Semantics gafee backend dị iche iche chọrọ ule nrubeisi karịrị ndakọrịta SQL syntax.
- Backup, search, vector storage, na maintenance na-anọgide bụrụ ndị dabere na capability.
- Ịgba ihe karịrị otu mmejuputa persistence na-abawanye ọnụ ahịa CI na nkwado ọrụ.

## Ihe ndị na-abụghị ebumnuche

ADR a anaghị:

- etinye database dependency, environment variable, schema, ma ọ bụ migration;
- agbanwe singleton SQLite na-arụ ọrụ ugbu a ma ọ bụ driver cascade;
- ekwe nkwa nkwado PostgreSQL ma ọ bụ MySQL na release akọwapụtara;
- mee ka FTS5, `sqlite-vec`, faịlụ backup, ma ọ bụ maintenance SQLite bụrụ portable;
- kọwaa njikere active-active tupu ule shared-state na coordination adị;
- kwado idegharị `src/lib/db/` niile n’otu oge.

## Ajụjụ ndị ka ghe oghe maka nkwado onye na-elekọta

1. Repository ahụ tinyere ókè backend async dị n'ime ọ bụ ntụziaka a họọrọ, ka ekwesịrị
   idowe nchekwa data mpụga n'azụ ọrụ control-plane dị iche?
2. PostgreSQL ọ dabara dịka mmejuputa mpụga mbụ mgbe SQLite mezuru nkwekọrịta?
3. Kedu domain kwesịrị ịbụ akụkụ repository mbụ nwere oke?
4. Kedu state a ga-ekekọrịta maka milestone multi-replica mbụ, oleekwa nke ga-anọgide naanị na node?
5. Ogologo oge ndakọrịta ole ka achọrọ maka migration repository a kwụsịrị n'etiti ma ọ bụ laghachiri azụ?

Ruo mgbe a ga-edozi ajụjụ ndị a, akwụkwọ a bụ atụmatụ, ọ pụtaghịkwa na a ga-eme refactor runtime ọ bụla.
