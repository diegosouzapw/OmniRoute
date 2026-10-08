# ADR: Pluggable persistence boundary (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Ipò:** Àbá — ó nílò ìfọwọ́sí olùtọ́jú kí iṣẹ́ runtime tó bẹ̀rẹ̀
- **Ọ̀ràn ìtọ́pa:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Ààlà:** Ìṣètò-ìkọ́lé ìtọ́jú-dátà nìkan; ìpinnu yìí kò fi ibi-ipamọ́ dátà ìta kún un tàbí yan ọ̀kan

## Àyíká

Lọ́wọ́lọ́wọ́, OmniRoute ń pèsè àwọn iṣẹ́ ìtọ́jú-dátà tó dá lórí ẹ̀ka láti `src/lib/db/`, nígbà tí
àsopọ̀ àjọpín tí `src/lib/db/core.ts` dá padà ń mú àdéhùn `SqliteAdapter` alámúṣiṣẹpọ̀ tó wà nínú
`src/lib/db/adapters/types.ts` ṣẹ. Adapter náà ṣe àtìlẹ́yìn fún ọ̀pọ̀ runtime SQLite, ṣùgbọ́n ojú-ìlò
rẹ̀ ṣì jẹ́ èyí tí a mọ̀ sí ti SQLite: àwọn gbólóhùn tí a ti pèsè sílẹ̀ tó ń ṣiṣẹ́ ní ìbámu, `pragma`,
àwọn transaction tí a sún síwájú àti èyí tó bẹ̀rẹ̀ lẹ́sẹ̀kẹsẹ̀, backup abinibi/ìṣàdàkọ fáìlì,
checkpoint, àti handle ibi-ipamọ́ dátà abẹ́lé.

Ọ̀nà ìbẹ̀rẹ̀ àti ìmúpadàbọ̀sípò lọ́wọ́lọ́wọ́ tún ń ṣàkóso àyípo-ìgbésí-ayé fáìlì SQLite.
`src/lib/db/core.ts` ń yanjú `storage.sqlite`, ó ń bójú tó adapter kan ṣoṣo tó wọ́pọ̀ fún process,
ó ń ṣe checkpoint WAL, ó ń pa àwọn table tí a yàn mọ́ nígbà ìmúpadàbọ̀sípò, ó sì ń yọ àwọn fáìlì
alábàákẹ́gbẹ́ SQLite kúrò nígbà tí a bá ń tún ibi-ipamọ́ dátà kọ́. Yíyan driver nínú
`src/lib/db/adapters/driverFactory.ts` ń yan láàárín àwọn runtime SQLite tí a ṣe àtìlẹ́yìn fún;
kì í ṣe abstraction fún backend ìta.

Ìdàgbàsókè schema náà ní ìsopọ̀ pẹ̀lú rẹ̀ bákan náà. `src/lib/db/migrationRunner.ts` ń lo àwọn fáìlì
SQL onínọ́mbà, ń ṣàyẹ̀wò `sqlite_master` àti `PRAGMA table_info`, ń ṣàwárí àtìlẹ́yìn FTS5 àṣàyàn,
ó sì ń ṣe iṣẹ́ migration nínú àwọn transaction SQLite. Àwọn module iṣẹ́ bíi
`src/lib/db/backup.ts` àti `src/lib/db/optimizationSettings.ts` ń lo àwọn ìtumọ̀ backup, `PRAGMA`,
WAL, page-size, auto-vacuum, àti `VACUUM` ní tààrà.

Àwọn wọ̀nyí jẹ́ àwọn àbùdá tó bófin mu fún ìmúṣiṣẹ́ SQLite tí a fi sínú ètò. Ó yẹ kí wọ́n ṣì wà láì
fipá mú PostgreSQL tàbí MySQL láti ṣe àfarawé API SQLite.

## Ìpinnu

Gba ààlà ìtọ́jú-dátà onípele méjì fún ipò tó lè gbégbèésẹ̀, tó sì wà pẹ́ títí:

1. **Àwọn àdéhùn repository ti ẹ̀ka** ń ṣàlàyé àwọn iṣẹ́ ìtọ́jú-dátà tí ọgbọ́n iṣẹ́-ajé àti kóòdù
   routing nílò. Àwọn olùpè sinmi lé ìhùwàsí àti dátà ẹ̀ka, kì í ṣe ọ̀rọ̀ SQL, àwọn gbólóhùn tí a ti
   pèsè sílẹ̀, àwọn fáìlì ibi-ipamọ́ dátà, tàbí àwọn ohun dialect.
2. **Àdéhùn backend asynchronous abẹ́nú kan** ń ṣe àtìlẹ́yìn fún àwọn ìmúṣẹ repository pẹ̀lú
   àwọn àyíká transaction, ìlera/ìmúratan, ìṣọ̀kan migration, àwọn agbára backend, àti àwọn àṣìṣe
   tí a pín sí ẹ̀ka. A óò dábàá ojú-ìlò TypeScript pàtó pẹ̀lú PR ìmúṣẹ àkọ́kọ́, a ó sì fi àwọn
   ìdánwò ìbámu fìdí rẹ̀ múlẹ̀; ADR yìí kò mọ̀ọ́mọ̀ dí API àròsọ mọ́lẹ̀.

SQLite ṣì jẹ́ ìmúṣẹ àtìlẹ́yìn àkọ́kọ́. Àtẹ̀jáde driver SQLite tó wà tẹ́lẹ̀ àti `SqliteAdapter`
alámúṣiṣẹpọ̀ yóò wà lẹ́yìn ìmúṣẹ repository SQLite nígbà tí a bá ń ṣí àwọn ẹ̀ka lọ ní àwọn apá
inaró kéékèèké. Kò sí olùlò kankan tí a béèrè pé kó ṣètò iṣẹ́ ìta.

PostgreSQL ni ìmúṣẹ ìta àkọ́kọ́ tí a dábàá lẹ́yìn tí a bá ti fi ìmúṣẹ SQLite fìdí ààlà repository
múlẹ̀. MySQL yóò tẹ̀lé gẹ́gẹ́ bí ìmúṣẹ ojúgbà lòdì sí ìkójọpọ̀ ìdánwò ìbámu kan náà, dípò kí ó jẹ́
ẹ̀ka kejì ti ọgbọ́n iṣẹ́-ajé.

## Àwọn òfin ààlà

### Ojú-ìlò repository tó ṣeé gbégbèésẹ̀

Repository tó ṣeé gbégbèésẹ̀ lè ṣí àwọn wọ̀nyí síta:

- kíkà àti kíkọ ẹ̀ka;
- àwọn iṣẹ́ atomic tó ṣe kedere àti ìráyè repository tó wà lábẹ́ transaction;
- àwọn iṣẹ́ àfiwé/ìmúdójúìwọ̀n tàbí lease níbi tí ìtumọ̀ concurrency ti jẹ́ apá kan ti ẹ̀ka;
- pagination, ordering, àti àwọn àṣìṣe constraint tí kò sinmi lé backend kan pàtó.

Ìlera backend, ìmúratan, àti ìṣọ̀kan migration jẹ́ ti àdéhùn backend/iṣiṣẹ́ abẹ́nú dípò kí wọ́n jẹ́
ti repository ẹ̀ka kọ̀ọ̀kan.

Repository tó ṣeé gbégbèésẹ̀ kò gbọ́dọ̀ ṣí àwọn wọ̀nyí síta:

- `prepare`, `get`, `all`, `run`, tàbí àwọn handle driver àìṣẹ̀dá;
- `PRAGMA`, àwọn mode checkpoint WAL, `VACUUM`, tàbí ìṣàtúnṣe page/cache;
- àwọn ipa-ọ̀nà fáìlì SQLite, àwọn fáìlì alábàákẹ́gbẹ́, tàbí backup ìṣàdàkọ fáìlì;
- `lastInsertRowid` gẹ́gẹ́ bí àdéhùn ẹ̀ka tó gba gbogbo backend;
- syntax FTS5 tàbí `sqlite-vec`;
- ọ̀nà àbáyọ dialect àpapọ̀ tí kóòdù iṣẹ́-ajé deede ń lò.

### Ojú-ìlò agbára backend

Ìhùwàsí pàtó sí backend ṣì hàn gbangba, ó sì ṣeé ṣàwárí. Ìtọju tó jẹ́ ti SQLite nìkan wà lẹ́yìn
ìmúṣẹ àti ojú-ìlò iṣiṣẹ́ tirẹ̀, pẹ̀lú:

- yíyan driver runtime;
- checkpoint WAL àti ìhùwàsí ìpa SQLite;
- àwọn ètò page-size, cache-size, àti auto-vacuum;
- backup fáìlì ibi-ipamọ́ dátà, restore, àti recovery;
- àyẹ̀wò inú schema SQLite;
- ìṣọ̀kan FTS5 àti `sqlite-vec`.

A kò nílò kí backend ìta ṣe àfarawé àwọn ẹ̀ya wọ̀nyẹn. Àwọn repository gbọ́dọ̀ lo agbára tó ṣeé
gbégbèésẹ̀, pèsè ìmúṣẹ pàtó sí backend pẹ̀lú ìhùwàsí tí a ṣàkọsílẹ̀, tàbí jùmọ̀ pé agbára kan kò sí.

## Módẹ́lì ìdúnàádúrà àti ìṣílọ

Àwọn API ibi ìpamọ́ ń ṣàlàyé iṣẹ́ okòwò atomiki; àwọn olùpè kò yan módù ìdúnàádúrà SQL.
Iṣẹ́ kọ̀ọ̀kan gbọ́dọ̀ ṣàlàyé àwọn ìdánilójú ìṣiṣẹ́-pọ̀ rẹ̀ tí a lè ṣàkíyèsí: àwọn invariant tí a dáàbò bò, ìṣàwárí ìforígbárí,
ìsọ̀rí àtúndánwò, àwọn ìfojúsọ́nà nípa idempotency, àti ìtànkálẹ̀ àyíká-ìdúnàádúrà.
Àwọn ìmúṣẹ lè lo oríṣiríṣi ọ̀nà ìdúnàádúrà àti ìyasọ́tọ̀ nìkan nígbà tí àwọn ìdánilójú
tí a lè ṣàkíyèsí wọ̀nyẹn bá ṣì jẹ́ ìwọ̀nkan náà. SQLite lè tẹ̀síwájú láti máa lo ìhùwàsí ìdúnàádúrà
deferred tàbí immediate rẹ̀ lọ́nà inú níbi tí ó ti bá àdéhùn iṣẹ́ náà mu.

Àwọn backend ìta nílò ẹni tó ní ojúṣe ìṣílọ tí a sọ ní kedere, kí ọ̀pọ̀lọpọ̀ ẹ̀dà ohun èlò má bàa
figagbága láti ṣe ìyípadà schema kan náà. Àwọn ìtàn ìṣílọ backend lè pín àwọn ìpele ọgbọ́n inú kan náà, ṣùgbọ́n a kò
gbà pé àwọn fáìlì SQL SQLite ṣeé gbé lọ tàbí ṣeé tún lò gẹ́gẹ́ bí dialect mìíràn.

## Àwọn ìtumọ̀ ìbámu láàárín àwọn backend

Àwọn ìdánwò ìbámu gbọ́dọ̀ bo ìhùwàsí, kì í ṣe àwọn signature method ibi ìpamọ́ nìkan. Domain kọ̀ọ̀kan tí a ṣí lọ
gbọ́dọ̀ ṣàlàyé àti ṣàrídájú:

- timezone, precision, àti serialization timestamp;
- ìtòlẹ́sẹẹsẹ `NULL`, collation, àti àwọn ìfojúsọ́nà nípa fífi ọ̀rọ̀ kékeré àti ńlá yàtọ̀;
- àfihàn JSON àti ìhùwàsí ìfiwéra;
- precision integer, decimal, àti owó;
- ìtòlẹ́sẹẹsẹ tó dúró ṣinṣin àti àwọn tie-breaker tó ṣeé pinnu fún pagination;
- ìṣẹ̀dá ID láìgbẹ́kẹ̀ lé àwọn row ID SQLite;
- ìsọ̀rí ìrúfin uniqueness àti foreign-key;
- ìhùwàsí affected-row fún àwọn iṣẹ́ no-op, compare/update, àti delete;
- àwọn àbájáde ìkọ̀wé alájọṣiṣẹ́pọ̀, àwọn ìforígbárí tí a lè tún gbìyànjú, àti àwọn àtúndánwò idempotent.

Tí domain kan kò bá lè sọ àwọn ìtumọ̀ tó ṣeé ṣàkíyèsí tí ó jẹ́ ìwọ̀nkan, kò tíì ṣeé gbé láti backend kan sí òmíràn, ó sì gbọ́dọ̀ wà
ní pàtó fún backend títí tí a ó fi ṣe àgbékalẹ̀ àdéhùn náà.

## Àwọn ohun tí ìbámu nílò

Ìmúṣẹ èyíkéyìí tó ń tẹ̀lé ADR yìí gbọ́dọ̀ pa àwọn àbùdá wọ̀nyí mọ́:

- SQLite ṣì jẹ́ àṣàyàn àkọ́kọ́ tí kò nílò ìṣètò.
- Àwọn fáìlì SQLite àti ìtàn ìṣílọ tó ti wà tẹ́lẹ̀ ṣì ṣeé kà.
- Àwọn fallback SQLite fún npm, Electron, Docker, àti restricted-runtime ṣì lo ipa ọ̀nà ìbẹ̀rẹ̀ wọn lọ́wọ́lọ́wọ́.
- Àwọn credential provider tí a fi pamọ́ ṣì ń lo ìhùwàsí encryption ohun èlò tó ti wà tẹ́lẹ̀.
- Ìṣílọ ibi ìpamọ́ kò yí routing, quota, API-key, tàbí audit semantics padà ní ìkọ̀kọ̀.
- A ṣe àkọsílẹ̀ ìhùwàsí backup àti recovery fún backend kọ̀ọ̀kan dípò fífi hàn bí ohun tó kan gbogbo wọn.
- Fífi ẹ̀yà SQLite-nìkan tó mọ́ sílẹ̀ kò ní load tàbí nílò external database driver.

## Ọ̀wọ̀ọ̀wọ́ ìfijiṣẹ́

1. Ṣe àtẹ̀jáde àkójọ coupling SQLite tí ẹlòmíràn lè tún ṣe gẹ́gẹ́ bí artifact àyẹ̀wò ọ̀tọ̀.
2. Ṣe àgbékalẹ̀ àwọn àdéhùn repository domain àkọ́kọ́ àti àwọn ìdánwò ìbámu.
3. Ṣàmúlò ìmúṣẹ SQLite tó ti wà tẹ́lẹ̀ lẹ́yìn àwọn àdéhùn wọ̀nyẹn láìyí àwọn àṣàyàn àkọ́kọ́ padà.
4. Lẹ́yìn ìfọwọ́sí maintainer, ṣàfikún PostgreSQL gẹ́gẹ́ bí ìmúṣẹ ìta àkọ́kọ́ fún apá control-plane kan
   tí a fi ààlà sí.
5. Fa shared state gbòòrò kìkì lẹ́yìn tí àwọn ìdánwò concurrent-write àti migration-ownership bá ti wà.
6. Ṣàfikún ipa ọ̀nà ìṣílọ SQLite-to-external tí kò nílò asopọ̀, tí a sì ti fìdí rẹ̀ múlẹ̀, kí a tó polówó ìyípadà database.
7. Ṣàfikún MySQL lórí àwọn àdéhùn repository àti backend tí a ti fìdí wọn múlẹ̀.

Ìgbésẹ̀ runtime kọ̀ọ̀kan jẹ́ PR ọ̀tọ̀ tí a lè ṣàyẹ̀wò. A kò gbọ́dọ̀ lo ìgbésẹ̀ tó tẹ̀lé láti ṣe ìdáláre fífi
abstraction tí a kò tíì fìdí rẹ̀ múlẹ̀ ní ìgbésẹ̀ ìṣáájú darapọ̀.

## Apá ìmúlò àkọ́kọ́

Ó yẹ kí a yan apá runtime àkọ́kọ́ lẹ́yìn tí a bá ti ṣàyẹ̀wò àkójọ àwọn ìsopọ̀ tó wà láàárín àwọn èròjà. Àwọn ìsopọ̀ provider, àwọn kọ́kọ́rọ́ API, àwọn àpapọ̀, àti àtòpọ̀ routing jẹ́ olùdíje nítorí pé àwọn tábìlì ìpìlẹ̀ wọn hàn nínú `src/lib/db/core.ts`, ṣùgbọ́n ADR yìí kò fọwọ́ sí àkójọ tábìlì tàbí PR ìṣíkiri kan. Apá náà gbọ́dọ̀ ní:

- àwọn ìdánwò pípa ìhùwàsí SQLite mọ́;
- àwọn ìdánwò ìbámu repository;
- àwọn ààlà transaction tí a sọ ní kedere;
- ìjẹ́rìísí encryption àti redaction fún àwọn credential tí a fi pamọ́;
- kò gbọdọ̀ sí ìyípadà sí àtòpọ̀ ìbẹ̀rẹ̀ aiyipada.

## Àwọn àṣàyàn mìíràn tí a gbé yẹ̀ wò

### Ṣàfikún PostgreSQL sábẹ́ `SqliteAdapter`

A kọ̀ ọ́. `SqliteAdapter` jẹ́ fẹ́lẹ́fẹ́lẹ́ ìbámu fún àwọn runtime SQLite, ó sì ń ṣí àwọn iṣẹ́ pàtó sí SQLite síta. Ṣíṣe àfarawé ojú-iṣẹ́ yẹn yóò mú àwọn ìrònú synchronous àti àwọn ìrònú tó jẹ́ pàtó sí dialect wọnú backend tuntun.

### Ṣí API query/execute gbogbogbò sí gbogbo àwọn domain

A kọ̀ ọ́ gẹ́gẹ́ bí ààlà àkọ́kọ́. Yóò kó ìṣàkóso ìsopọ̀ sí ibì kan, ṣùgbọ́n yóò fi SQL dialect, transaction, àti ìsopọ̀ mọ́ tábìlì sílẹ̀ nínú àwọn module business. Primitive backend alápele-kékeré kan lè wà nínú àwọn ìmúlò repository, kì í ṣe gẹ́gẹ́ bí API persistence tí application ń lò.

### Ṣàtúnkọ gbogbo persistence kí a tó fìdí apá kan múlẹ̀

A kọ̀ ọ́. Ojú-iṣẹ́ persistence tó wà lọ́wọ́lọ́wọ́ gbòòrò, ó sì ní ìgbésí-ayé file, recovery, search, àti àwọn setting iṣẹ́ nínú. Àwọn apá ináró ń pèsè ìhùwàsí tí a lè ṣàyẹ̀wò àti àwọn ààlà rollback.

### Rọ́pò SQLite gẹ́gẹ́ bí aiyipada

A kọ̀ ọ́. Àwọn deployment embedded àti desktop gbára lé àwòṣe ìbẹ̀rẹ̀ tí kò nílò iṣẹ́ kankan lọ́wọ́lọ́wọ́. Backend ìta jẹ́ ohun tí a yàn láti lò nìkan.

### Lo Redis gẹ́gẹ́ bí aláṣẹ pípẹ́

A kọ̀ ọ́. Redis lè ṣe àtìlẹ́yìn fún ìṣọ̀kan, cache, tàbí àwọn counter aláìpéjọ́ tí a sọ ní kedere, ṣùgbọ́n kò lè rọ́pò àdéhùn repository pípẹ́ tí a ṣàpèjúwe níbí.

## Àwọn àbájáde

### Àwọn rere

- Kóòdù business ń rí ojú-ààlà persistence tó dúró ṣinṣin tí kò gbára lé dialect database.
- A ń dán ìhùwàsí SQLite wò kí backend ìta tó ṣàlàyé abstraction náà.
- PostgreSQL àti MySQL ń pín àwọn àdéhùn àti ìdánwò dípò ṣíṣe àdákọ logic domain.
- Àwọn agbára SQLite-nìkan dúró gẹ́gẹ́ bí ohun pàtàkì dípò kí wọ́n di àwọn shim ìbámu tí ń tú àwọn àlàyé inú jáde.
- Ìṣíkiri àti ìhùwàsí transaction fún ọ̀pọ̀ replica di ọ̀ràn àpẹrẹ tí a sọ ní kedere.

### Àwọn ìnáwó àti ewu

- Yíyọ repository jáde nílò ìṣíkiri call-site ní ìpele-kí-ìpele.
- Àwọn ààlà async lè tàn ká inú kóòdù service tó jẹ́ synchronous lọ́wọ́lọ́wọ́.
- Ìtumọ̀ ìhùwàsí tó bá gbogbo backend mu nílò àwọn ìdánwò ìbámu tó ju ìbámu syntax SQL lọ.
- Backup, search, vector storage, àti maintenance ṣì jẹ́ ohun tó jẹ́ pàtó sí capability.
- Ṣíṣiṣẹ́ ju ìmúlò persistence kan lọ ń pọ̀ sí iye owó CI àti àtìlẹ́yìn iṣẹ́.

## Àwọn ohun tí kì í ṣe àfojúsùn

ADR yìí kò:

- ṣàfikún dependency database, environment variable, schema, tàbí migration;
- yí singleton SQLite tó ń ṣiṣẹ́ tàbí cascade driver padà;
- ṣe ìlérí àtìlẹ́yìn PostgreSQL tàbí MySQL nínú release pàtó kan;
- sọ FTS5, `sqlite-vec`, àwọn file backup, tàbí maintenance SQLite di ohun tó ṣeé gbé lọ;
- ṣàlàyé ìmúrasílẹ̀ active-active kí àwọn ìdánwò shared-state àti coordination tó wà;
- fọwọ́ sí àtúnkọ `src/lib/db/` lẹ́ẹ̀kan ṣoṣo.

## Àwọn ìbéèrè tí kò tíì ní ìdáhùn fún ìfọwọ́sí olùtọ́jú

1. Ṣé repository pẹ̀lú ààlà backend async inú rẹ̀ ni ọ̀nà tí a fẹ́ràn jù, tàbí ó yẹ kí
   persistence ìta wà lẹ́yìn service control-plane ọ̀tọ̀?
2. Ṣé PostgreSQL ṣe ìtẹ́wọ́gbà gẹ́gẹ́ bí implementation ìta àkọ́kọ́ lẹ́yìn conformance SQLite?
3. Domain wo ló yẹ kí ó jẹ́ bounded repository slice àkọ́kọ́?
4. State wo ló gbọ́dọ̀ jẹ́ pínpín fún milestone multi-replica àkọ́kọ́, èwo sì ni yóò ṣì jẹ́ node-local?
5. Àkókò compatibility wo ni a nílò fún migration repository tí ó dá dúró láàárín ọ̀nà tàbí tí a yí padà sẹ́yìn?

Títí tí a ó fi yanjú àwọn ìbéèrè wọ̀nyí, ìwé yìí jẹ́ àbá, kò sì túmọ̀ sí pé a ó ṣe refactor runtime kankan.
