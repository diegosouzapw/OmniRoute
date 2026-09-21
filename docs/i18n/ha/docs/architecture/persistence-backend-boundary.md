# ADR: Pluggable persistence boundary (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Matsayi:** An gabatar — yana buƙatar amincewar mai kula kafin a fara aikin lokacin gudana
- **Batun sa ido:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Iyaka:** Tsarin gine-ginen adana bayanai kawai; wannan shawarar ba ta ƙara ko zaɓar ma’ajiyar bayanai ta waje ba

## Yanayi

A halin yanzu OmniRoute yana gabatar da ayyukan adana bayanai da aka tsara bisa yanki daga `src/lib/db/`, yayin da
haɗin gama-gari da `src/lib/db/core.ts` ke dawo da shi yake aiwatar da ƙa’idar `SqliteAdapter`
mai aiki kai tsaye a `src/lib/db/adapters/types.ts`. Wannan adafta yana goyon bayan mahallai da dama na SQLite, amma
fuskar mu’amalarsa har yanzu tana da tsarin SQLite: shirye-shiryen umarni masu aiki kai tsaye, `pragma`, ma’amalolin da aka
jinkirta da na gaggawa, wariyar ajiya ta asali/kwafin fayil, checkpoint, da maƙallin ma’ajiyar bayanai na cikin gida.

Hanyar farawa da farfadowa ta yanzu ita ma tana kula da zagayowar rayuwar fayil ɗin SQLite. `src/lib/db/core.ts`
yana ƙayyade `storage.sqlite`, yana kula da adafta guda ɗaya na bai ɗaya ga tsarin aiki, yana yin checkpoint na WAL, yana adana
zaɓaɓɓun tebura yayin farfadowa, sannan yana cire fayilolin rakiyar SQLite lokacin sake gina ma’ajiyar bayanai. Zaɓin
direba a `src/lib/db/adapters/driverFactory.ts` yana zaɓar daga cikin mahallan SQLite da ake goyon baya; shi
ba abstraction na backend na waje ba ne.

Sauye-sauyen schema ma suna da irin wannan dogaro. `src/lib/db/migrationRunner.ts` yana amfani da fayilolin SQL masu lambobi,
yana bincikar `sqlite_master` da `PRAGMA table_info`, yana gano goyon bayan FTS5 na zaɓi, sannan yana gudanar da
aikin migration a cikin ma’amalolin SQLite. Modulan gudanarwa kamar `src/lib/db/backup.ts` da
`src/lib/db/optimizationSettings.ts` suna amfani da ma’anonin backup, `PRAGMA`, WAL, page-size, auto-vacuum, da `VACUUM`
kai tsaye.

Waɗannan halaye ne ingantattu na tsarin SQLite da aka saka a ciki. Ya kamata su ci gaba da kasancewa ba tare da
tilasta wa PostgreSQL ko MySQL su kwaikwayi API na SQLite ba.

## Shawara

A ɗauki iyakar adana bayanai mai matakai biyu don bayanai masu ɗorewa da za a iya amfani da su a backend daban-daban:

1. **Ƙa’idojin ma’ajiyar yanki** suna bayyana ayyukan adana bayanai da lambar kasuwanci da routing
   ke buƙata. Masu kira suna dogara da halayen yanki da bayanan yanki, ba rubutun SQL, shirye-shiryen umarni,
   fayilolin ma’ajiyar bayanai, ko abubuwan dialect ba.
2. **Ƙa’idar backend ta cikin gida mai aiki ba tare da jiran kammalawa ba** tana tallafa wa aiwatar da ma’ajiyoyi ta hanyar
   mahallan ma’amala, lafiya/shirye-shiryen aiki, daidaita migration, damar backend, da
   kurakuran da aka rarraba. Za a gabatar da ainihin fuskar TypeScript tare da PR na aiwatarwa na farko,
   sannan a tabbatar da ita ta gwaje-gwajen daidaito; wannan ADR da gangan ba ya kulle API na hasashe.

SQLite zai ci gaba da kasancewa tsohon aiwatarwa. Jerin zaɓin direbobin SQLite da ke akwai da `SqliteAdapter`
mai aiki kai tsaye za su ci gaba da kasancewa a bayan aiwatarwar ma’ajiyar SQLite yayin da ake ƙaura da yankuna
a ƙananan sassa masu cikakken tsari. Ba a buƙatar wani mai amfani ya saita sabis na waje.

PostgreSQL shi ne aiwatarwar waje ta farko da aka gabatar bayan an tabbatar da iyakar ma’ajiyar
da SQLite. MySQL zai biyo baya a matsayin aiwatarwa makamanciya bisa wannan rukunin gwaje-gwajen daidaito
maimakon zama reshe na biyu na dabarun kasuwanci.

## Dokokin iyaka

### Fuskar ma’ajiyar da za a iya amfani da ita a backend daban-daban

Ma’ajiyar da za a iya amfani da ita a backend daban-daban na iya gabatar da:

- karantawa da rubutawa na yanki;
- ayyukan atomic da aka bayyana a sarari da samun damar ma’ajiya a cikin iyakar ma’amala;
- ayyukan kwatantawa/sabuntawa ko lease inda ma’anonin aiki tare suke cikin yanki;
- pagination, ordering, da kurakuran constraint waɗanda ba su dogara da backend ba.

Lafiyar backend, shirye-shiryen aiki, da daidaita migration suna cikin ƙa’idar backend/gudanarwa
ta cikin gida maimakon kasancewa cikin kowace ma’ajiyar yanki.

Dole ne ma’ajiyar da za a iya amfani da ita a backend daban-daban kada ta gabatar da:

- `prepare`, `get`, `all`, `run`, ko maƙullan direba kai tsaye;
- `PRAGMA`, hanyoyin checkpoint na WAL, `VACUUM`, ko daidaita page/cache;
- hanyoyin fayilolin SQLite, fayilolin rakiyarsu, ko wariyar ajiya ta kwafin fayil;
- `lastInsertRowid` a matsayin ƙa’idar yanki da ake amfani da ita tsakanin backend daban-daban;
- tsarin rubutun FTS5 ko `sqlite-vec`;
- hanyar tsallake dialect ta gama-gari da lambar kasuwanci ta yau da kullum ke amfani da ita.

### Fuskar damar backend

Halayen da suka keɓanta ga backend suna ci gaba da kasancewa a bayyane kuma masu sauƙin ganowa. Ayyukan kula da
SQLite kawai za su kasance a bayan aiwatarwa da fuskar gudanarwarsu, ciki har da:

- zaɓin direba na lokacin gudana;
- checkpoint na WAL da halayen kashe SQLite;
- saitunan page-size, cache-size, da auto-vacuum;
- wariyar ajiya, maidowa, da farfadowar fayil ɗin ma’ajiyar bayanai;
- binciken tsarin schema na SQLite;
- haɗin FTS5 da `sqlite-vec`.

Ba a buƙatar backend na waje ya kwaikwayi waɗannan fasaloli. Dole ne ma’ajiyoyi su yi amfani da
damar da za a iya amfani da ita a backend daban-daban, su samar da aiwatarwa ta musamman ga backend tare da halayen da aka rubuta, ko su bayar da rahoton
cewa damar ba ta samuwa.

## Samfurin ma'amala da ƙaura

APIs na ma'ajiyar bayanai suna ayyana aikin kasuwanci na atomik; masu kira ba sa zaɓar yanayin ma'amalar SQL.
Kowane aiki dole ne ya ayyana tabbacin da ake iya lura da shi game da aiki a lokaci guda: ƙa'idodin da ake karewa, gano
rikici, rarraba sake-gwaji, tsammanin idempotency, da isar da mahallin ma'amala.
Aiwatarwa na iya amfani da hanyoyin ma'amala da warewa daban-daban ne kawai idan waɗannan tabbacin da ake iya
lura da su sun kasance daidai. SQLite na iya ci gaba da amfani da halin ma'amalarsa na yanzu na deferred ko immediate
a ciki, idan hakan ya cika yarjejeniyar aikin.

Tsarukan baya na waje suna buƙatar fayyace mallakar ƙaura domin kada kwafi da yawa na manhaja su yi gogayya
wajen aiwatar da canjin tsari iri ɗaya. Tarihin ƙaurar tsarukan baya na iya amfani da matakan ci gaba na ma'ana iri ɗaya, amma ba a
ɗauka cewa fayilolin SQL na SQLite za su iya aiki ko a sake amfani da su a wani yare na bayanai ba.

## Ma'anonin daidaituwa tsakanin tsarukan baya

Gwaje-gwajen daidaituwa dole ne su rufe halayya, ba sa hannun hanyoyin ma'ajiya kaɗai ba. Kowane fannin da aka ƙaura
dole ne ya ayyana kuma ya tabbatar da:

- yankin lokaci, daidaito, da serialization na timestamp;
- jerantawar `NULL`, collation, da tsammanin bambance manya da ƙananan haruffa;
- wakilcin JSON da halayyar kwatantawa;
- daidaiton integer, decimal, da kuɗi;
- tsayayyen jerantawa da tabbatattun hanyoyin warware canjaras don pagination;
- samar da ID ba tare da dogaro da SQLite row IDs ba;
- rarraba karya ƙa'idar uniqueness da foreign-key;
- halayyar affected-row ga ayyukan no-op, compare/update, da delete;
- sakamakon rubutu a lokaci guda, rikice-rikicen da za a iya sake gwadawa, da sake-gwaji masu idempotency.

Idan wani fanni ba zai iya bayyana ma'anoni daidaitattu da ake iya lura da su ba, to bai shirya a ɗauke shi tsakanin tsarukan baya ba tukuna, kuma dole ne ya ci gaba da kasancewa
na takamaiman tsarin baya har sai an tsara wannan yarjejeniya.

## Bukatun dacewa

Duk wani aiwatarwa da ke bin wannan ADR dole ne ya kiyaye waɗannan siffofi:

- SQLite ya ci gaba da kasancewa zaɓin tsoho wanda ba ya buƙatar saiti.
- Fayilolin SQLite da tarihin ƙaura da suke akwai su ci gaba da kasancewa masu karantawa.
- npm, Electron, Docker, da madadin SQLite na restricted-runtime su ci gaba da amfani da hanyar farawa ta yanzu.
- Bayanan shaidar masu samarwa da aka adana su ci gaba da amfani da halin ɓoyewar bayanai na manhajar da ke akwai.
- Ƙaurar ma'ajiya kada ta sauya ma'anonin routing, quota, API-key, ko audit a ɓoye.
- A rubuta bayanin halayyar backup da recovery ga kowane tsarin baya maimakon gabatar da ita a matsayin gama-gari.
- Sabon shigarwa mai amfani da SQLite kawai kada ya loda ko buƙaci direban rumbun bayanai na waje.

## Jerin isarwa

1. Buga cikakken jerin abubuwan da ke da alaƙa da SQLite wanda za a iya sake samarwa a matsayin takardar nazari ta daban.
2. Gabatar da yarjejeniyoyin ma'ajiyar fanni na farko da gwaje-gwajen daidaituwa.
3. Daidaita aiwatarwar SQLite da ke akwai a bayan waɗannan yarjejeniyoyi ba tare da sauya zaɓuɓɓukan tsoho ba.
4. Bisa amincewar masu kula, ƙara PostgreSQL a matsayin aiwatarwar waje ta farko ga wani
   iyakantaccen ɓangare na control-plane.
5. Faɗaɗa yanayin da aka raba ne kawai bayan an samar da gwaje-gwajen rubutu a lokaci guda da mallakar ƙaura.
6. Ƙara hanyar ƙaura daga SQLite zuwa tsarin waje wadda take offline kuma aka inganta, kafin tallata sauya rumbun bayanai.
7. Ƙara MySQL bisa tabbatattun yarjejeniyoyin ma'ajiya da tsarin baya.

Kowane matakin runtime PR ne na daban wanda za a iya dubawa. Kada a yi amfani da wani mataki na gaba don kafa hujjar haɗa
abstraction da ba a tabbatar da shi ba a wani mataki na farko.

## Yankin aiwatarwa na farko

Ya kamata a zaɓi yankin runtime na farko bayan an duba jerin abubuwan da ke da alaƙa da juna. Haɗin masu samarwa, API keys, combos, da saitunan routing su ne masu yiwuwa saboda ana ganin tushen teburorinsu a cikin `src/lib/db/core.ts`, amma wannan ADR ba ya amincewa da jerin teburori ko migration PR. Dole ne yankin ya haɗa da:

- gwaje-gwajen tabbatar da kiyaye halayen SQLite;
- gwaje-gwajen daidaiton repository;
- iyakokin transaction da aka fayyace a sarari;
- tabbatar da encryption da redaction ga bayanan sirrin shiga da aka adana;
- babu wani canji ga saitunan farawa na asali.

## Zaɓuɓɓukan da aka yi la'akari da su

### Ƙara PostgreSQL a ƙarƙashin `SqliteAdapter`

An ƙi. `SqliteAdapter` wani compatibility layer ne na SQLite runtimes kuma yana fallasa ayyukan da suka keɓanta da SQLite. Kwaikwayon wannan interface zai sa zato game da aiki na synchronous da takamaiman dialect su shiga cikin sabon backend.

### Fallasa API na query/execute na gama-gari ga duk domains

An ƙi a matsayin babban iyaka. Zai tattara sarrafa haɗi a wuri guda, amma zai bar SQL dialect, transaction, da alaƙar teburori a cikin business modules. Ƙaramin backend primitive na iya kasancewa a cikin aiwatarwar repository, ba a matsayin persistence API da application ke amfani da shi kai tsaye ba.

### Sake rubuta duk persistence kafin tabbatar da yanki guda

An ƙi. Persistence surface na yanzu yana da faɗi kuma ya haɗa da file lifecycle, recovery, search, da operational settings. Vertical slices suna samar da halaye da iyakokin rollback waɗanda za a iya dubawa.

### Sauya SQLite a matsayin na asali

An ƙi. Embedded da desktop deployments sun dogara da tsarin farawa na yanzu wanda ba ya buƙatar service. External backend zaɓi ne na opt-in.

### Amfani da Redis a matsayin durable authority

An ƙi. Redis na iya tallafa wa ephemeral coordination, cache, ko counters da aka fayyace a sarari, amma ba ya maye gurbin durable repository contract da aka bayyana a nan.

## Sakamako

### Fa'idodi

- Business code yana samun tsayayyen persistence seam wanda bai dogara da database dialect ba.
- Ana gwada halayen SQLite kafin external backend ya ayyana abstraction.
- PostgreSQL da MySQL suna raba contracts da gwaje-gwaje maimakon maimaita domain logic.
- Ƙwarewar da ta keɓanta da SQLite tana ci gaba da kasancewa first-class maimakon zama compatibility shims masu fallasa bayanan ciki.
- Halayen migration da transaction na multi-replica suna zama batutuwan ƙira da aka fayyace a sarari.

### Kuɗaɗe da haɗurra

- Ciro repositories yana buƙatar migration na call sites a hankali.
- Iyakokin async na iya bazuwa zuwa service code da ke aiki synchronously a halin yanzu.
- Ma’anonin aiki a tsakanin backends suna buƙatar conformance tests fiye da daidaiton SQL syntax kawai.
- Backup, search, vector storage, da maintenance suna ci gaba da kasancewa takamaimai ga capability.
- Gudanar da persistence implementation fiye da ɗaya yana ƙara kuɗin CI da operational support.

## Abubuwan da ba a nufa ba

Wannan ADR ba ya:

- ƙara database dependency, environment variable, schema, ko migration;
- canza SQLite singleton mai aiki ko driver cascade;
- yin alƙawarin tallafawa PostgreSQL ko MySQL a wani takamaiman release;
- sa FTS5, `sqlite-vec`, backup files, ko SQLite maintenance su zama portable;
- ayyana shirye-shiryen active-active kafin a samar da gwaje-gwajen shared-state da coordination;
- amincewa da sake rubuta `src/lib/db/` gaba ɗaya a lokaci guda.

## Buɗaɗɗun tambayoyi don amincewar mai kula

1. Shin ma'ajiyar lambar tare da iyakar backend na async na ciki ne alkiblar da aka fi so, ko ya kamata
   adana bayanai na waje ya kasance a bayan wani sabis na control-plane na daban?
2. Shin PostgreSQL ya dace a matsayin aiwatarwar waje ta farko bayan tabbatar da daidaiton SQLite?
3. Wane domain ya kamata ya zama yanki na farko mai iyaka na ma'ajiyar?
4. Wane state ne dole a raba don milestone na multi-replica na farko, kuma wane ne zai ci gaba da zama na node-local?
5. Wane compatibility window ake buƙata idan an katse ko aka mayar da repository migration baya?

Har sai an warware waɗannan tambayoyin, wannan daftarin shawara ne kawai kuma ba ya nuna cewa za a yi runtime refactor.
