# ADR: Pluggable persistence boundary (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Katayuan:** Iminumungkahi — nangangailangan ng pag-apruba ng maintainer bago magsimula ang gawain sa runtime
- **Isyung sinusubaybayan:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Saklaw:** Arkitektura ng persistence lamang; hindi nagdaragdag o pumipili ang desisyong ito ng panlabas na database

## Konteksto

Kasalukuyang naglalahad ang OmniRoute ng mga function ng persistence na nakatuon sa domain mula sa `src/lib/db/`, habang ipinapatupad ng nakabahaging koneksiyong ibinabalik ng `src/lib/db/core.ts` ang synchronous na kontratang `SqliteAdapter` sa `src/lib/db/adapters/types.ts`. Sinusuportahan ng adapter na iyon ang ilang SQLite runtime, ngunit nananatiling nakahubog sa SQLite ang interface nito: mga synchronous na prepared statement, `pragma`, mga deferred at immediate na transaksyon, native/file-copy na backup, checkpoint, at lokal na database handle.

Pinamamahalaan din ng kasalukuyang daloy ng pagsisimula at pag-recover ang lifecycle ng SQLite file. Tinutukoy ng `src/lib/db/core.ts` ang `storage.sqlite`, nagpapanatili ng isang process-global na adapter, nagsasagawa ng checkpoint sa WAL, pinananatili ang mga napiling table habang nagre-recover, at nag-aalis ng mga kasamang SQLite file kapag muling binubuo ang isang database. Pumipili ang driver selection sa `src/lib/db/adapters/driverFactory.ts` mula sa mga sinusuportahang SQLite runtime; hindi ito isang abstraction para sa panlabas na backend.

Nakaugnay din dito ang ebolusyon ng schema. Inilalapat ng `src/lib/db/migrationRunner.ts` ang mga may-numerong SQL file, sinusuri ang `sqlite_master` at `PRAGMA table_info`, tinutukoy ang opsyonal na suporta sa FTS5, at pinapatakbo ang migration sa loob ng mga SQLite transaction. Direktang ginagamit ng mga operational module gaya ng `src/lib/db/backup.ts` at `src/lib/db/optimizationSettings.ts` ang mga semantika ng backup, `PRAGMA`, WAL, page-size, auto-vacuum, at `VACUUM`.

Ang mga ito ay mga wastong katangian ng naka-embed na deployment ng SQLite. Dapat manatiling available ang mga ito nang hindi pinipilit ang PostgreSQL o MySQL na tularan ang isang SQLite API.

## Desisyon

Gumamit ng dalawang-antas na persistence boundary para sa portable at durable na state:

1. **Mga kontrata ng domain repository** ang tumutukoy sa mga operasyon ng persistence na kailangan ng business at routing code. Umaasa ang mga caller sa gawi at data ng domain, hindi sa SQL text, mga prepared statement, database file, o dialect object.
2. **Isang internal na asynchronous backend contract** ang sumusuporta sa mga repository implementation gamit ang mga transaction context, health/readiness, koordinasyon ng migration, mga kakayahan ng backend, at mga naklasipikang error. Imumungkahi ang eksaktong TypeScript interface sa unang implementation PR at patutunayan sa pamamagitan ng mga conformance test; sadyang hindi itinatakda ng ADR na ito ang isang haka-hakang API.

Mananatiling default na implementation ang SQLite. Ang kasalukuyang SQLite driver cascade at synchronous na `SqliteAdapter` ay mananatili sa likod ng SQLite repository implementation habang inililipat ang mga domain sa maliliit na vertical slice. Walang user na kinakailangang mag-configure ng panlabas na serbisyo.

Ang PostgreSQL ang unang iminumungkahing panlabas na implementation matapos mapatunayan ang repository boundary gamit ang SQLite. Susunod ang MySQL bilang kapantay na implementation laban sa parehong conformance suite sa halip na maging pangalawang fork ng business logic.

## Mga panuntunan sa boundary

### Portable na interface ng repository

Maaaring ilantad ng isang portable na repository ang:

- mga pagbasa at pagsulat sa domain;
- mga tahasang atomic operation at transaction-scoped na access sa repository;
- mga compare/update o lease operation kung bahagi ng domain ang concurrency semantics;
- backend-neutral na pagination, ordering, at mga constraint error.

Ang backend health, readiness, at koordinasyon ng migration ay kabilang sa internal na backend/operational contract sa halip na sa mga indibidwal na domain repository.

Hindi dapat ilantad ng isang portable na repository ang:

- `prepare`, `get`, `all`, `run`, o mga raw driver handle;
- `PRAGMA`, mga WAL checkpoint mode, `VACUUM`, o pag-tune ng page/cache;
- mga path ng SQLite file, mga kasamang file, o file-copy na backup;
- `lastInsertRowid` bilang isang cross-backend na kontrata ng domain;
- syntax ng FTS5 o `sqlite-vec`;
- isang generic na dialect escape hatch na ginagamit ng karaniwang business code.

### Interface ng kakayahan ng backend

Nananatiling tahasan at madaling matuklasan ang gawi na partikular sa backend. Nananatili ang SQLite-only na maintenance sa likod ng sarili nitong implementation at operational interface, kabilang ang:

- pagpili ng runtime driver;
- WAL checkpoint at gawi ng pag-shutdown ng SQLite;
- mga setting ng page-size, cache-size, at auto-vacuum;
- backup, restore, at recovery ng database file;
- introspection ng SQLite schema;
- integrasyon ng FTS5 at `sqlite-vec`.

Hindi kinakailangang tularan ng isang panlabas na backend ang mga feature na iyon. Dapat gumamit ang mga repository ng isang portable na kakayahan, magbigay ng backend-specific na implementation na may dokumentadong gawi, o iulat na hindi available ang isang kakayahan.

## Modelo ng transaksyon at migrasyon

Tinutukoy ng mga repository API ang atomikong operasyong pangnegosyo; hindi pumipili ang mga tumatawag ng SQL transaction mode.
Dapat tukuyin ng bawat operasyon ang mga napapansing garantiya nito sa concurrency: mga pinoprotektahang invariant, pagtukoy
ng conflict, klasipikasyon ng retry, mga inaasahan sa idempotency, at pagpapasa ng konteksto ng transaksyon.
Maaaring gumamit ang mga implementasyon ng magkakaibang mekanismo ng transaksyon at isolation kung mananatiling katumbas
ang mga napapansing garantiyang iyon. Maaaring patuloy na gamitin ng SQLite ang kasalukuyan nitong deferred o immediate
na gawi ng transaksyon sa loob kung natutugunan nito ang kontrata ng operasyon.

Nangangailangan ang mga external backend ng tahasang pagmamay-ari ng migrasyon upang hindi mag-unahan ang maraming replica
ng application sa iisang pagbabago sa schema. Maaaring magbahagi ng mga lohikal na milestone ang mga kasaysayan ng migrasyon
ng backend, ngunit hindi ipinapalagay na portable o magagamit muli bilang ibang dialect ang mga SQLite SQL file.

## Mga semantika ng conformance sa iba't ibang backend

Dapat saklawin ng mga conformance test ang gawi, hindi lamang ang mga signature ng repository method. Dapat tukuyin at
beripikahin ng bawat na-migrate na domain ang:

- timezone, precision, at serialization ng timestamp;
- mga inaasahan sa pagkakasunod-sunod ng `NULL`, collation, at case sensitivity;
- representasyon ng JSON at gawi ng paghahambing;
- precision ng integer, decimal, at halaga ng salapi;
- matatag na pagkakasunod-sunod at mga deterministikong tie-breaker para sa pagination;
- pagbuo ng ID nang hindi umaasa sa mga row ID ng SQLite;
- klasipikasyon ng mga paglabag sa uniqueness at foreign key;
- gawi ng mga apektadong row para sa mga operasyong no-op, compare/update, at delete;
- mga resulta ng sabayang pagsusulat, mga conflict na maaaring i-retry, at mga idempotent na retry.

Kung hindi makapagtatakda ang isang domain ng magkakatumbas na napapansing semantika, hindi pa ito portable at dapat manatiling
backend-specific hanggang sa maidisenyo ang kontratang iyon.

## Mga kinakailangan sa compatibility

Dapat panatilihin ng anumang implementasyong sumusunod sa ADR na ito ang mga sumusunod na katangian:

- Nananatiling zero-configuration default ang SQLite.
- Nananatiling nababasa ang mga umiiral na SQLite file at kasaysayan ng migrasyon.
- Nananatili sa kasalukuyan nilang startup path ang npm, Electron, Docker, at mga SQLite fallback para sa restricted runtime.
- Patuloy na ginagamit ng mga nakaimbak na credential ng provider ang umiiral na gawi ng application sa encryption.
- Hindi tahimik na binabago ng repository migration ang mga semantika ng routing, quota, API key, o audit.
- Nakadokumento ang gawi sa backup at recovery para sa bawat backend sa halip na ilahad bilang pangkalahatan.
- Hindi naglo-load o nangangailangan ng external database driver ang isang malinis na SQLite-only installation.

## Pagkakasunod-sunod ng paghahatid

1. Maglathala ng reproducible na imbentaryo ng coupling sa SQLite bilang hiwalay na artifact para sa review.
2. Ipakilala ang mga unang kontrata ng domain repository at mga conformance test.
3. Iangkop ang umiiral na implementasyon ng SQLite sa likod ng mga kontratang iyon nang hindi binabago ang mga default.
4. Kapag inaprubahan ng maintainer, idagdag ang PostgreSQL bilang unang external na implementasyon para sa isang
   bounded na bahagi ng control plane.
5. Palawakin lamang ang shared state kapag mayroon nang mga test para sa sabayang pagsusulat at pagmamay-ari ng migrasyon.
6. Magdagdag ng offline at validated na landas ng migrasyon mula SQLite patungo sa external na backend bago ianunsyo ang pagpapalit ng database.
7. Idagdag ang MySQL batay sa napatunayang mga kontrata ng repository at backend.

Ang bawat hakbang sa runtime ay isang hiwalay at mare-review na PR. Hindi dapat gamitin ang susunod na hakbang upang bigyang-katwiran
ang pag-merge ng isang hindi pa napatunayang abstraction sa naunang hakbang.

## Unang bahagi ng implementasyon

Dapat piliin ang unang bahagi ng runtime pagkatapos suriin ang imbentaryo ng coupling. Ang mga koneksyon sa provider, API key, combo, at configuration ng routing ay mga kandidato dahil makikita ang kanilang mga base table sa `src/lib/db/core.ts`, ngunit hindi inaaprubahan ng ADR na ito ang isang listahan ng mga table o isang migration PR. Dapat kabilang sa bahaging ito ang:

- mga pagsubok sa pagpapanatili ng gawi ng SQLite;
- mga pagsubok sa pagsunod ng repository;
- tahasang mga hangganan ng transaksyon;
- beripikasyon ng encryption at redaction para sa mga nakaimbak na credential;
- walang pagbabago sa default na configuration sa pagsisimula.

## Mga alternatibong isinaalang-alang

### Idagdag ang PostgreSQL sa ilalim ng `SqliteAdapter`

Tinanggihan. Ang `SqliteAdapter` ay isang compatibility layer para sa mga runtime ng SQLite at naglalantad ng mga operasyong partikular sa SQLite. Ang pagtulad sa interface na iyon ay magpapasok ng mga synchronous at partikular-sa-dialect na assumption sa isang bagong backend.

### Maglantad ng generic na query/execute API sa lahat ng domain

Tinanggihan bilang pangunahing hangganan. Isesentralisa nito ang pangangasiwa ng koneksyon ngunit iiwan ang coupling ng SQL dialect, transaksyon, at table sa mga business module. Maaaring magkaroon ng low-level na backend primitive sa loob ng mga implementasyon ng repository, ngunit hindi bilang persistence API na ginagamit ng application.

### Isulat muli ang lahat ng persistence bago mag-validate ng isang bahagi

Tinanggihan. Malawak ang kasalukuyang saklaw ng persistence at kabilang dito ang lifecycle ng file, recovery, search, at mga operational setting. Nagbibigay ang mga vertical slice ng masusuring gawi at malinaw na mga hangganan para sa rollback.

### Palitan ang SQLite bilang default

Tinanggihan. Umaasa ang mga embedded at desktop deployment sa kasalukuyang modelo ng pagsisimula na hindi nangangailangan ng serbisyo. Ang external na backend ay opt-in.

### Gamitin ang Redis bilang durable na awtoridad

Tinanggihan. Maaaring suportahan ng Redis ang tahasang ephemeral na koordinasyon, cache, o mga counter, ngunit hindi nito pinapalitan ang durable na repository contract na inilalarawan dito.

## Mga kahihinatnan

### Positibo

- Nagkakaroon ang business code ng matatag na persistence seam na hindi nakadepende sa database dialect.
- Sinusubok ang gawi ng SQLite bago tukuyin ng external na backend ang abstraction.
- Nagbabahagi ang PostgreSQL at MySQL ng mga contract at pagsubok sa halip na magdoble ng domain logic.
- Nananatiling first-class ang mga capability na para lamang sa SQLite sa halip na maging mga tumatagas na compatibility shim.
- Nagiging tahasang usapin sa disenyo ang migration at gawi ng transaksyon para sa maraming replica.

### Mga gastos at panganib

- Nangangailangan ang pag-extract ng repository ng unti-unting migration ng mga call site.
- Maaaring kumalat ang mga async boundary sa kasalukuyang synchronous na service code.
- Nangangailangan ang mga semantics sa iba’t ibang backend ng mga conformance test na higit pa sa compatibility ng SQL syntax.
- Nananatiling partikular sa capability ang backup, search, vector storage, at maintenance.
- Ang pagpapatakbo ng higit sa isang implementasyon ng persistence ay nagpapataas sa gastos ng CI at operational support.

## Mga hindi layunin

Hindi ginagawa ng ADR na ito ang sumusunod:

- magdagdag ng database dependency, environment variable, schema, o migration;
- baguhin ang live na SQLite singleton o driver cascade;
- mangako ng suporta para sa PostgreSQL o MySQL sa isang partikular na release;
- gawing portable ang FTS5, `sqlite-vec`, mga backup file, o maintenance ng SQLite;
- tukuyin ang kahandaan para sa active-active bago magkaroon ng mga pagsubok sa shared state at koordinasyon;
- aprubahan ang isang one-shot na muling pagsulat ng `src/lib/db/`.

## Mga bukas na tanong para sa pag-apruba ng maintainer

1. Ang repository kasama ang panloob na async backend boundary ba ang mas gustong direksyon, o dapat bang
   nasa likod ng isang hiwalay na control-plane service ang external persistence?
2. Katanggap-tanggap ba ang PostgreSQL bilang unang external implementation pagkatapos ng SQLite conformance?
3. Aling domain ang dapat maging unang bounded repository slice?
4. Aling state ang dapat ibahagi para sa unang multi-replica milestone, at alin ang mananatiling node-local?
5. Anong compatibility window ang kinakailangan para sa isang naantala o ni-rollback na repository migration?

Hangga't hindi nareresolba ang mga tanong na ito, panukala lamang ang dokumentong ito at walang ipinahihiwatig na runtime refactor.
