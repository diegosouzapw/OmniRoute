# ADR: Pluggable persistence boundary (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **ស្ថានភាព:** បានស្នើឡើង — តម្រូវឱ្យមានការអនុម័តពីអ្នកថែទាំ មុនពេលចាប់ផ្តើមការងារលើ runtime
- **បញ្ហាតាមដាន:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **វិសាលភាព:** ស្ថាបត្យកម្ម persistence ប៉ុណ្ណោះ; សេចក្តីសម្រេចនេះមិនបន្ថែម ឬជ្រើសរើសមូលដ្ឋានទិន្នន័យខាងក្រៅទេ

## បរិបទ

បច្ចុប្បន្ន OmniRoute បង្ហាញមុខងារ persistence ដែលផ្តោតលើដែនពី `src/lib/db/` ខណៈដែលការតភ្ជាប់រួម ដែលត្រឡប់ដោយ `src/lib/db/core.ts` អនុវត្តតាមកិច្ចសន្យា `SqliteAdapter` បែបសមកាលកម្មនៅក្នុង `src/lib/db/adapters/types.ts`។ Adapter នោះគាំទ្រ SQLite runtime ជាច្រើន ប៉ុន្តែផ្ទៃប្រើប្រាស់របស់វានៅតែមានទម្រង់តាម SQLite៖ prepared statements បែបសមកាលកម្ម, `pragma`, transaction ប្រភេទ deferred និង immediate, ការបម្រុងទុកបែប native/ចម្លងឯកសារ, checkpoint និង handle មូលដ្ឋានទិន្នន័យមូលដ្ឋាន។

ផ្លូវ startup និង recovery បច្ចុប្បន្នក៏គ្រប់គ្រងវដ្តជីវិតឯកសារ SQLite ផងដែរ។ `src/lib/db/core.ts` កំណត់ទីតាំង `storage.sqlite`, រក្សាទុក adapter សកលមួយសម្រាប់ដំណើរការទាំងមូល, ធ្វើ checkpoint លើ WAL, រក្សាទុកតារាងដែលបានជ្រើសរើសក្នុងអំឡុងពេល recovery និងលុបឯកសាររួមដំណើររបស់ SQLite នៅពេលស្ថាបនាមូលដ្ឋានទិន្នន័យឡើងវិញ។ ការជ្រើសរើស driver នៅក្នុង `src/lib/db/adapters/driverFactory.ts` ជ្រើសរើសក្នុងចំណោម SQLite runtime ដែលបានគាំទ្រ; វាមិនមែនជា abstraction សម្រាប់ backend ខាងក្រៅទេ។

ការវិវត្ត schema ក៏ត្រូវបានភ្ជាប់យ៉ាងជិតស្និទ្ធដូចគ្នា។ `src/lib/db/migrationRunner.ts` អនុវត្តឯកសារ SQL ដែលមានលេខរៀង, ពិនិត្យ `sqlite_master` និង `PRAGMA table_info`, រកឃើញការគាំទ្រ FTS5 ដែលមានជាជម្រើស និងដំណើរការការងារ migration ក្នុង SQLite transaction។ ម៉ូឌុលប្រតិបត្តិការ ដូចជា `src/lib/db/backup.ts` និង `src/lib/db/optimizationSettings.ts` ប្រើ semantics នៃការបម្រុងទុក, `PRAGMA`, WAL, page-size, auto-vacuum និង `VACUUM` ដោយផ្ទាល់។

ទាំងនេះជាលក្ខណៈត្រឹមត្រូវសម្រាប់ការដាក់ឱ្យប្រើប្រាស់ SQLite ដែលបង្កប់ក្នុងកម្មវិធី។ លក្ខណៈទាំងនេះគួរតែនៅតែអាចប្រើបាន ដោយមិនបង្ខំឱ្យ PostgreSQL ឬ MySQL ធ្វើត្រាប់តាម SQLite API ទេ។

## សេចក្តីសម្រេច

អនុម័តព្រំដែន persistence ពីរកម្រិតសម្រាប់ស្ថានភាពអចិន្ត្រៃយ៍ដែលអាចផ្ទេរបាន៖

1. **កិច្ចសន្យា domain repository** កំណត់ប្រតិបត្តិការ persistence ដែលត្រូវការដោយកូដអាជីវកម្ម និង routing។ អ្នកហៅពឹងផ្អែកលើឥរិយាបថ និងទិន្នន័យរបស់ដែន មិនមែនលើអត្ថបទ SQL, prepared statements, ឯកសារមូលដ្ឋានទិន្នន័យ ឬ dialect objects ទេ។
2. **កិច្ចសន្យា backend ខាងក្នុងបែបអសមកាល** គាំទ្រការអនុវត្ត repository ដោយមាន transaction contexts, health/readiness, ការសម្របសម្រួល migration, សមត្ថភាព backend និងកំហុសដែលបានចាត់ថ្នាក់។ ផ្ទៃ TypeScript ជាក់លាក់នឹងត្រូវបានស្នើជាមួយ implementation PR ដំបូង និងផ្ទៀងផ្ទាត់ដោយ conformance tests; ADR នេះមានចេតនាមិនកំណត់ API បែបសន្មតទុកជាមុនឱ្យថេរទេ។

SQLite នៅតែជាការអនុវត្តលំនាំដើម។ លំដាប់ជ្រើសរើស SQLite driver និង `SqliteAdapter` បែបសមកាលកម្មដែលមានស្រាប់ នឹងនៅពីក្រោយការអនុវត្ត SQLite repository ខណៈដែលដែននានាត្រូវបានផ្ទេរជាបំណែកបញ្ឈរតូចៗ។ អ្នកប្រើប្រាស់មិនត្រូវបានតម្រូវឱ្យកំណត់រចនាសម្ព័ន្ធសេវាខាងក្រៅឡើយ។

PostgreSQL គឺជាការអនុវត្តខាងក្រៅដំបូងដែលបានស្នើ បន្ទាប់ពីព្រំដែន repository ត្រូវបានផ្ទៀងផ្ទាត់ជាមួយ SQLite។ MySQL នឹងបន្តជាការអនុវត្តស្មើគ្នាមួយប្រឆាំងនឹង conformance suite ដូចគ្នា ជាជាងបំបែក business logic ជាលើកទីពីរ។

## ច្បាប់ព្រំដែន

### ផ្ទៃ repository ដែលអាចផ្ទេរបាន

Repository ដែលអាចផ្ទេរបាន អាចបង្ហាញ៖

- ការអាន និងការសរសេរទិន្នន័យដែន;
- ប្រតិបត្តិការ atomic ដែលបានកំណត់ច្បាស់ និងការចូលប្រើ repository ដែលមានវិសាលភាពក្នុង transaction;
- ប្រតិបត្តិការ compare/update ឬ lease នៅពេលដែល concurrency semantics ជាផ្នែកមួយនៃដែន;
- pagination, ordering និង constraint errors ដែលមិនអាស្រ័យលើ backend។

Health, readiness និងការសម្របសម្រួល migration របស់ backend ជាកម្មសិទ្ធិរបស់កិច្ចសន្យា backend/ប្រតិបត្តិការខាងក្នុង ជាជាងរបស់ domain repository នីមួយៗ។

Repository ដែលអាចផ្ទេរបាន មិនត្រូវបង្ហាញ៖

- `prepare`, `get`, `all`, `run` ឬ raw driver handles;
- `PRAGMA`, WAL checkpoint modes, `VACUUM` ឬការកែតម្រូវ page/cache;
- ផ្លូវឯកសារ SQLite, ឯកសាររួមដំណើរ ឬការបម្រុងទុកដោយចម្លងឯកសារ;
- `lastInsertRowid` ជាកិច្ចសន្យាដែនឆ្លង backend;
- វាក្យសម្ពន្ធ FTS5 ឬ `sqlite-vec`;
- ច្រកគេច dialect ទូទៅដែលប្រើដោយកូដអាជីវកម្មធម្មតា។

### ផ្ទៃសមត្ថភាព backend

ឥរិយាបថជាក់លាក់តាម backend នៅតែត្រូវបង្ហាញយ៉ាងច្បាស់ និងអាចស្វែងរកឃើញ។ ការថែទាំសម្រាប់តែ SQLite នៅពីក្រោយការអនុវត្ត និងចំណុចប្រទាក់ប្រតិបត្តិការរបស់វាផ្ទាល់ រួមមាន៖

- ការជ្រើសរើស runtime driver;
- WAL checkpoint និងឥរិយាបថបិទ SQLite;
- ការកំណត់ page-size, cache-size និង auto-vacuum;
- ការបម្រុងទុក ការស្ដារ និង recovery នៃឯកសារមូលដ្ឋានទិន្នន័យ;
- ការត្រួតពិនិត្យ schema របស់ SQLite;
- ការរួមបញ្ចូល FTS5 និង `sqlite-vec`។

Backend ខាងក្រៅមិនត្រូវបានតម្រូវឱ្យធ្វើត្រាប់តាមមុខងារទាំងនោះទេ។ Repository ត្រូវតែប្រើសមត្ថភាពដែលអាចផ្ទេរបាន, ផ្តល់ការអនុវត្តជាក់លាក់តាម backend ជាមួយឥរិយាបថដែលមានឯកសារពន្យល់ ឬរាយការណ៍ថាសមត្ថភាពមួយមិនអាចប្រើបាន។

## ម៉ូដែលប្រតិបត្តិការ និងការធ្វើចំណាកស្រុក

API របស់ repository កំណត់ប្រតិបត្តិការអាជីវកម្មបែបអាតូមិច។ អ្នកហៅមិនជ្រើសរើសរបៀបប្រតិបត្តិការ SQL ទេ។
ប្រតិបត្តិការនីមួយៗត្រូវតែកំណត់ការធានាអំពី concurrency ដែលអាចសង្កេតឃើញបានរបស់វា៖ invariant ដែលត្រូវបានការពារ ការរកឃើញ conflict ការចាត់ថ្នាក់ retry ការរំពឹងទុកអំពី idempotency និងការបញ្ជូនបន្ត transaction context។
ការអនុវត្តអាចប្រើយន្តការប្រតិបត្តិការ និង isolation ផ្សេងៗគ្នា បានតែក្នុងករណីដែលការធានាដែលអាចសង្កេតឃើញបានទាំងនោះនៅតែសមមូល។ SQLite អាចបន្តប្រើឥរិយាបថប្រតិបត្តិការ deferred ឬ immediate បច្ចុប្បន្នរបស់វានៅខាងក្នុង នៅកន្លែងដែលវាបំពេញតាមកិច្ចសន្យារបស់ប្រតិបត្តិការ។

backend ខាងក្រៅតម្រូវឱ្យមានភាពជាម្ចាស់លើការធ្វើចំណាកស្រុកដែលបានកំណត់យ៉ាងច្បាស់ ដើម្បីកុំឱ្យ replica ច្រើនរបស់កម្មវិធីប្រណាំងគ្នាធ្វើការផ្លាស់ប្តូរ schema ដូចគ្នា។ ប្រវត្តិការធ្វើចំណាកស្រុករបស់ backend អាចមានដំណាក់កាលសំខាន់ៗផ្នែកតក្កវិជ្ជារួមគ្នា ប៉ុន្តែឯកសារ SQL របស់ SQLite មិនត្រូវបានសន្មតថាអាចចល័ត ឬប្រើឡើងវិញជាមួយ dialect ផ្សេងបានទេ។

## សេម៉ង់ទិកនៃភាពអនុលោមឆ្លងកាត់ backend

ការធ្វើតេស្តភាពអនុលោមត្រូវតែគ្របដណ្តប់លើឥរិយាបថ មិនមែនត្រឹមតែ signature នៃ method របស់ repository ប៉ុណ្ណោះទេ។ domain នីមួយៗដែលត្រូវបានធ្វើចំណាកស្រុកត្រូវតែកំណត់ និងផ្ទៀងផ្ទាត់៖

- timezone ភាពជាក់លាក់ និង serialization របស់ timestamp;
- ការរៀបលំដាប់ `NULL`, collation និងការរំពឹងទុកអំពី case sensitivity;
- តំណាងទិន្នន័យ JSON និងឥរិយាបថនៃការប្រៀបធៀប;
- ភាពជាក់លាក់របស់ចំនួនគត់ ទសភាគ និងតម្លៃរូបិយវត្ថុ;
- ការរៀបលំដាប់មានស្ថិរភាព និងការសម្រេច tie-breaker បែបកំណត់ច្បាស់លាស់សម្រាប់ pagination;
- ការបង្កើត ID ដោយមិនពឹងផ្អែកលើ row ID របស់ SQLite;
- ការចាត់ថ្នាក់ការរំលោភលើ uniqueness និង foreign key;
- ឥរិយាបថ affected-row សម្រាប់ប្រតិបត្តិការ no-op, compare/update និង delete;
- លទ្ធផលនៃ concurrent write, conflict ដែលអាច retry បាន និង retry បែប idempotent។

ប្រសិនបើ domain មួយមិនអាចបញ្ជាក់សេម៉ង់ទិកដែលអាចសង្កេតឃើញបានសមមូលទេ វាមិនទាន់អាចចល័តបាននៅឡើយ ហើយត្រូវតែបន្តជាក់លាក់ចំពោះ backend រហូតដល់កិច្ចសន្យានោះត្រូវបានរចនា។

## តម្រូវការភាពឆបគ្នា

ការអនុវត្តណាមួយដែលអនុវត្តតាម ADR នេះត្រូវតែរក្សាលក្ខណៈសម្បត្តិទាំងនេះ៖

- SQLite នៅតែជាជម្រើសលំនាំដើមដែលមិនតម្រូវឱ្យកំណត់រចនាសម្ព័ន្ធ។
- ឯកសារ SQLite និងប្រវត្តិការធ្វើចំណាកស្រុកដែលមានស្រាប់នៅតែអាចអានបាន។
- fallback របស់ SQLite សម្រាប់ npm, Electron, Docker និង restricted-runtime នៅតែរក្សា startup path បច្ចុប្បន្នរបស់វា។
- credential របស់ provider ដែលបានរក្សាទុក បន្តប្រើឥរិយាបថ encryption ដែលមានស្រាប់របស់កម្មវិធី។
- ការធ្វើចំណាកស្រុក repository មិនផ្លាស់ប្តូរសេម៉ង់ទិកនៃ routing, quota, API key ឬ audit ដោយស្ងាត់ស្ងៀមទេ។
- ឥរិយាបថ backup និង recovery ត្រូវបានចងក្រងជាឯកសារតាម backend នីមួយៗ ជាជាងបង្ហាញថាជាលក្ខណៈសកល។
- ការដំឡើងស្អាតដែលប្រើតែ SQLite មិនផ្ទុក ឬតម្រូវឱ្យមាន driver មូលដ្ឋានទិន្នន័យខាងក្រៅទេ។

## លំដាប់នៃការផ្តល់ជូន

1. បោះពុម្ពផ្សាយបញ្ជីសារពើភណ្ឌ SQLite coupling ដែលអាចបង្កើតឡើងវិញបាន ជាឯកសារសម្រាប់ការពិនិត្យដាច់ដោយឡែក។
2. ណែនាំកិច្ចសន្យា repository របស់ domain ដំបូង និងការធ្វើតេស្តភាពអនុលោម។
3. សម្របការអនុវត្ត SQLite ដែលមានស្រាប់ឱ្យនៅពីក្រោយកិច្ចសន្យាទាំងនោះ ដោយមិនផ្លាស់ប្តូរជម្រើសលំនាំដើម។
4. ដោយមានការយល់ព្រមពីអ្នកថែទាំ បន្ថែម PostgreSQL ជាការអនុវត្តខាងក្រៅដំបូងសម្រាប់ផ្នែក control-plane ដែលមានព្រំដែនច្បាស់លាស់មួយ។
5. ពង្រីក shared state តែបន្ទាប់ពីមានការធ្វើតេស្ត concurrent write និងភាពជាម្ចាស់លើការធ្វើចំណាកស្រុក។
6. បន្ថែមផ្លូវធ្វើចំណាកស្រុកពី SQLite ទៅប្រព័ន្ធខាងក្រៅ ដែលដំណើរការ offline និងបានឆ្លងកាត់ validation មុនពេលផ្សព្វផ្សាយអំពីការប្តូរមូលដ្ឋានទិន្នន័យ។
7. បន្ថែម MySQL ដោយផ្អែកលើកិច្ចសន្យា repository និង backend ដែលបានបញ្ជាក់ប្រសិទ្ធភាពរួចហើយ។

ជំហាន runtime នីមួយៗគឺជា PR ដាច់ដោយឡែកដែលអាចពិនិត្យបាន។ ជំហានក្រោយមិនត្រូវបានប្រើដើម្បីបង្ហាញហេតុផលគាំទ្រការរួមបញ្ចូល abstraction ដែលមិនទាន់ត្រូវបានបញ្ជាក់នៅក្នុងជំហានមុនទេ។

## ផ្នែកអនុវត្តដំបូង

ផ្នែក runtime ដំបូងគួរត្រូវបានជ្រើសរើស បន្ទាប់ពីបានពិនិត្យបញ្ជីភាពជាប់ទាក់ទងគ្នា។ ការតភ្ជាប់ទៅកាន់ provider,
API keys, combos និងការកំណត់រចនាសម្ព័ន្ធ routing គឺជាបេក្ខភាព ពីព្រោះតារាងមូលដ្ឋានរបស់វា
អាចមើលឃើញនៅក្នុង `src/lib/db/core.ts` ប៉ុន្តែ ADR នេះមិនអនុម័តបញ្ជីតារាង ឬ migration PR ណាមួយទេ។
ផ្នែកនេះត្រូវតែរួមបញ្ចូល៖

- ការធ្វើតេស្តរក្សាឥរិយាបថរបស់ SQLite;
- ការធ្វើតេស្តអនុលោមតាមកិច្ចសន្យារបស់ repository;
- ព្រំដែន transaction ដែលបានកំណត់យ៉ាងច្បាស់;
- ការផ្ទៀងផ្ទាត់ការអ៊ិនគ្រីប និងការលាក់បាំងព័ត៌មានរសើបសម្រាប់ credentials ដែលបានរក្សាទុក;
- មិនមានការផ្លាស់ប្តូរចំពោះការកំណត់រចនាសម្ព័ន្ធ startup លំនាំដើម។

## ជម្រើសដែលបានពិចារណា

### បន្ថែម PostgreSQL នៅក្រោម `SqliteAdapter`

បានបដិសេធ។ `SqliteAdapter` គឺជាស្រទាប់ភាពឆបគ្នាសម្រាប់ SQLite runtimes និងបង្ហាញប្រតិបត្តិការ
ជាក់លាក់សម្រាប់ SQLite។ ការធ្វើត្រាប់តាម interface នោះ នឹងធ្វើឱ្យការសន្មតដែលមានលក្ខណៈ synchronous និងជាក់លាក់ចំពោះ dialect
លេចធ្លាយចូលទៅក្នុង backend ថ្មី។

### បង្ហាញ query/execute API ទូទៅដល់ domain ទាំងអស់

បានបដិសេធក្នុងនាមជាព្រំដែនចម្បង។ វានឹងធ្វើឱ្យការគ្រប់គ្រងការតភ្ជាប់ស្ថិតនៅកណ្តាល ប៉ុន្តែនៅតែទុក SQL dialect,
transaction និងភាពជាប់ទាក់ទងនឹងតារាងនៅក្នុង business modules។ backend primitive កម្រិតទាបអាចមាននៅខាងក្នុង
ការអនុវត្ត repository ប៉ុន្តែមិនមែនជា persistence API ដែលបង្ហាញទៅកម្មវិធីនោះទេ។

### សរសេរ persistence ទាំងអស់ឡើងវិញ មុនពេលផ្ទៀងផ្ទាត់ផ្នែកមួយ

បានបដិសេធ។ ផ្ទៃ persistence បច្ចុប្បន្នមានវិសាលភាពធំទូលាយ និងរួមបញ្ចូល file lifecycle, recovery, search,
និង operational settings។ Vertical slices ផ្តល់នូវឥរិយាបថដែលអាចពិនិត្យបាន និងព្រំដែន rollback។

### ជំនួស SQLite ជាលំនាំដើម

បានបដិសេធ។ ការដាក់ឱ្យដំណើរការប្រភេទ embedded និង desktop ពឹងផ្អែកលើគំរូ startup បច្ចុប្បន្នដែលមិនត្រូវការសេវាកម្ម។
backend ខាងក្រៅគឺជាជម្រើសដែលត្រូវបើកប្រើដោយចេតនា។

### ប្រើ Redis ជាប្រភពទិន្នន័យប្រើប្រាស់បានយូរដែលមានសិទ្ធិអំណាច

បានបដិសេធ។ Redis អាចគាំទ្រការសម្របសម្រួលបណ្តោះអាសន្ន cache ឬ counters ដែលបានកំណត់យ៉ាងច្បាស់ ប៉ុន្តែវាមិន
ជំនួសកិច្ចសន្យា repository ដែលប្រើប្រាស់បានយូរ និងបានពិពណ៌នានៅទីនេះទេ។

## ផលវិបាក

### វិជ្ជមាន

- Business code ទទួលបានចំណុចប្រទាក់ persistence ដែលមានស្ថិរភាព និងឯករាជ្យពី database dialect។
- ឥរិយាបថ SQLite ត្រូវបានធ្វើតេស្ត មុនពេល backend ខាងក្រៅកំណត់ abstraction។
- PostgreSQL និង MySQL ចែករំលែកកិច្ចសន្យា និងការធ្វើតេស្ត ជំនួសឱ្យការចម្លង domain logic។
- សមត្ថភាពដែលមានតែនៅក្នុង SQLite នៅតែជាសមត្ថភាពថ្នាក់ទីមួយ ជំនួសឱ្យការក្លាយជា compatibility shims ដែលលេចធ្លាយ។
- ឥរិយាបថ migration និង transaction ដែលមាន replicas ច្រើន ក្លាយជាកង្វល់នៃការរចនាដែលបានកំណត់យ៉ាងច្បាស់។

### ការចំណាយ និងហានិភ័យ

- ការបំបែក repository ចេញ ទាមទារឱ្យមានការផ្លាស់ប្តូរ call sites ជាបណ្តើរៗ។
- ព្រំដែន async អាចរាលដាលតាមរយៈ service code ដែលបច្ចុប្បន្នជា synchronous។
- semantics ឆ្លង backend ទាមទារការធ្វើតេស្តអនុលោមតាមកិច្ចសន្យា លើសពីភាពឆបគ្នានៃ SQL syntax។
- Backup, search, vector storage និង maintenance នៅតែជាក់លាក់តាមសមត្ថភាព។
- ការដំណើរការ persistence implementation ច្រើនជាងមួយ បង្កើនការចំណាយសម្រាប់ CI និងការគាំទ្រប្រតិបត្តិការ។

## អ្វីដែលមិនមែនជាគោលដៅ

ADR នេះមិន៖

- បន្ថែម database dependency, environment variable, schema ឬ migration;
- ផ្លាស់ប្តូរ SQLite singleton ដែលកំពុងដំណើរការ ឬ driver cascade;
- សន្យាផ្តល់ការគាំទ្រ PostgreSQL ឬ MySQL នៅក្នុង release ជាក់លាក់ណាមួយ;
- ធ្វើឱ្យ FTS5, `sqlite-vec`, backup files ឬ SQLite maintenance អាចប្រើឆ្លង platform បាន;
- កំណត់ភាពត្រៀមខ្លួនសម្រាប់ active-active មុនពេលមានការធ្វើតេស្ត shared-state និង coordination;
- អនុម័តការសរសេរ `src/lib/db/` ឡើងវិញទាំងអស់ក្នុងពេលតែមួយ។

## សំណួរបើកចំហសម្រាប់ការអនុម័តពីអ្នកថែទាំ

1. តើ repository រួមជាមួយព្រំដែន async backend ខាងក្នុង គឺជាទិសដៅដែលពេញចិត្ត ឬគួរតែដាក់ persistence ខាងក្រៅនៅពីក្រោយសេវា control-plane ដាច់ដោយឡែក?
2. តើ PostgreSQL អាចទទួលយកបានដែរឬទេ ក្នុងនាមជាការអនុវត្តខាងក្រៅដំបូង បន្ទាប់ពីការផ្ទៀងផ្ទាត់ភាពស្របគ្នាជាមួយ SQLite?
3. តើ domain មួយណាគួរតែជា bounded repository slice ដំបូង?
4. តើ state មួយណាត្រូវតែចែករំលែកសម្រាប់ multi-replica milestone ដំបូង ហើយ state មួយណានៅតែជា node-local?
5. តើត្រូវការរយៈពេល compatibility window ប៉ុនណា សម្រាប់ repository migration ដែលត្រូវបានផ្អាកកណ្ដាលទី ឬ rollback?

រហូតដល់សំណួរទាំងនេះត្រូវបានដោះស្រាយ ឯកសារនេះគឺជាសំណើ ហើយមិនមានន័យថាត្រូវធ្វើ runtime refactor ណាមួយឡើយ។
