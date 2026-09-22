# ADR: Pluggable persistence boundary (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Hali:** Imependekezwa — inahitaji idhini ya mtunzaji kabla ya kazi ya runtime kuanza
- **Suala la ufuatiliaji:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Upeo:** Usanifu wa uhifadhi pekee; uamuzi huu hauongezi wala kuchagua hifadhidata ya nje

## Muktadha

Kwa sasa OmniRoute inawasilisha vitendaji vya uhifadhi vinavyolenga vikoa kutoka `src/lib/db/`, huku
muunganisho wa pamoja unaorejeshwa na `src/lib/db/core.ts` ukitekeleza mkataba landanishi wa `SqliteAdapter`
katika `src/lib/db/adapters/types.ts`. Adapta hiyo inatumia mazingira kadhaa ya utekelezaji ya SQLite, lakini
kiolesura chake bado kimeundwa kwa mtindo wa SQLite: kauli zilizoandaliwa landanishi, `pragma`, miamala iliyoahirishwa na ya papo hapo,
uhifadhi nakala asilia/kwa kunakili faili, checkpoint, na kishikio cha hifadhidata ya ndani.

Njia ya sasa ya uanzishaji na urejeshaji pia inasimamia mzunguko wa maisha wa faili ya SQLite. `src/lib/db/core.ts`
hutatua `storage.sqlite`, hudumisha adapta moja ya kimchakato inayotumika kote, huweka checkpoint ya WAL, huhifadhi majedwali
yaliyochaguliwa wakati wa urejeshaji, na huondoa faili saidizi za SQLite wakati wa kujenga upya hifadhidata. Uteuzi wa
driver katika `src/lib/db/adapters/driverFactory.ts` huchagua kati ya mazingira ya utekelezaji ya SQLite yanayotumika; si
ufichaji wa backend ya nje.

Mageuzi ya skema pia yameunganishwa kwa namna hiyo hiyo. `src/lib/db/migrationRunner.ts` hutumia faili za SQL zenye nambari,
huchunguza `sqlite_master` na `PRAGMA table_info`, hugundua uwepo wa hiari wa FTS5, na huendesha
kazi ya uhamishaji ndani ya miamala ya SQLite. Moduli za uendeshaji kama vile `src/lib/db/backup.ts` na
`src/lib/db/optimizationSettings.ts` hutumia moja kwa moja semantiki za kuhifadhi nakala, `PRAGMA`, WAL, ukubwa wa ukurasa, uvakuishaji wa kiotomatiki, na `VACUUM`.

Hizi ni sifa halali za usambazaji uliopachikwa wa SQLite. Zinapaswa kuendelea kupatikana bila
kulazimisha PostgreSQL au MySQL kuiga API ya SQLite.

## Uamuzi

Tumia mpaka wa uhifadhi wa ngazi mbili kwa hali endelevu inayoweza kuhamishika:

1. **Mikataba ya hazina ya kikoa** hufafanua operesheni za uhifadhi zinazohitajika na msimbo wa biashara na uelekezaji.
   Wapigaji simu hutegemea tabia ya kikoa na data ya kikoa, si matini ya SQL, kauli zilizoandaliwa,
   faili za hifadhidata, au vipengee vya lahaja.
2. **Mkataba wa ndani wa backend usiolandanishi** hutumia utekelezaji wa hazina kwa
   miktadha ya miamala, afya/utayari, uratibu wa uhamishaji, uwezo wa backend, na
   hitilafu zilizoainishwa. Kiolesura kamili cha TypeScript kitapendekezwa pamoja na PR ya kwanza ya utekelezaji
   na kuthibitishwa kwa majaribio ya ulinganifu; ADR hii kwa makusudi haigandishi API ya kubahatisha.

SQLite inasalia kuwa utekelezaji chaguomsingi. Mfuatano uliopo wa driver za SQLite na `SqliteAdapter` landanishi
hubaki nyuma ya utekelezaji wa hazina ya SQLite huku vikoa vikihamishwa katika
vipande vidogo vya wima. Hakuna mtumiaji anayehitajika kusanidi huduma ya nje.

PostgreSQL ndiyo utekelezaji wa kwanza wa nje unaopendekezwa baada ya mpaka wa hazina kuthibitishwa
dhidi ya SQLite. MySQL hufuata kama utekelezaji mwenza dhidi ya mkusanyiko uleule wa majaribio ya ulinganifu badala
ya kuwa tawi la pili la mantiki ya biashara.

## Kanuni za mpaka

### Kiolesura cha hazina kinachoweza kuhamishika

Hazina inayoweza kuhamishika inaweza kuwasilisha:

- usomaji na uandishi wa kikoa;
- operesheni za atomiki zilizo wazi na ufikiaji wa hazina uliofungamana na muktadha wa muamala;
- operesheni za kulinganisha/kusasisha au ukodishaji pale ambapo semantiki za ukinzani ni sehemu ya kikoa;
- upangaji wa kurasa, upangaji wa matokeo, na hitilafu za vizuizi zisizofungamana na backend.

Afya ya backend, utayari, na uratibu wa uhamishaji ni sehemu ya mkataba wa ndani wa backend/uendeshaji
badala ya kuwa sehemu ya hazina binafsi za kikoa.

Hazina inayoweza kuhamishika haipaswi kuwasilisha:

- `prepare`, `get`, `all`, `run`, au vishikio ghafi vya driver;
- `PRAGMA`, modi za checkpoint za WAL, `VACUUM`, au usanidi wa ukurasa/kashe;
- njia za faili za SQLite, faili saidizi, au uhifadhi nakala kwa kunakili faili;
- `lastInsertRowid` kama mkataba wa kikoa unaotumika katika backend mbalimbali;
- sintaksia ya FTS5 au `sqlite-vec`;
- njia ya jumla ya kukwepa lahaja inayotumiwa na msimbo wa kawaida wa biashara.

### Kiolesura cha uwezo wa backend

Tabia mahususi kwa backend hubaki wazi na inayoweza kugunduliwa. Matengenezo yanayohusu SQLite pekee hubaki nyuma
ya utekelezaji wake yenyewe na kiolesura cha uendeshaji, ikijumuisha:

- uteuzi wa driver ya runtime;
- checkpoint ya WAL na tabia ya kuzima SQLite;
- mipangilio ya ukubwa wa ukurasa, ukubwa wa kashe, na uvakuishaji wa kiotomatiki;
- kuhifadhi nakala, kurejesha, na kuokoa faili ya hifadhidata;
- ukaguzi wa skema ya SQLite;
- ujumuishaji wa FTS5 na `sqlite-vec`.

Backend ya nje haihitajiki kuiga vipengele hivyo. Hazina lazima zitumie
uwezo unaoweza kuhamishika, zitoe utekelezaji mahususi kwa backend wenye tabia iliyorekodiwa, au ziripoti
kwamba uwezo fulani haupatikani.

## Muundo wa miamala na uhamishaji

API za hifadhi hufafanua operesheni atomiki ya biashara; wapigaji hawachagui hali ya muamala wa SQL.
Kila operesheni lazima ifafanue hakikisho zake zinazoonekana za ushindani: kanuni zisizobadilika zinazolindwa, utambuzi wa migongano, uainishaji wa majaribio upya, matarajio ya kutorudia athari, na uenezaji wa muktadha wa muamala.
Utekelezaji unaweza kutumia mbinu tofauti za miamala na utengaji pale tu ambapo hakikisho hizo zinazoonekana zinasalia kuwa sawa. SQLite inaweza kuendelea kutumia ndani tabia yake ya sasa ya miamala iliyoahirishwa au ya mara moja pale inapokidhi mkataba wa operesheni.

Mifumo ya nje inahitaji umiliki wa wazi wa uhamishaji ili nakala nyingi za programu zisishindanie mabadiliko yale yale ya skima. Historia za uhamishaji za mifumo zinaweza kushiriki hatua muhimu za kimantiki, lakini faili za SQL za SQLite hazichukuliwi kuwa zinaweza kuhamishwa au kutumika tena kama lahaja nyingine.

## Semantiki za ulinganifu baina ya mifumo

Majaribio ya ulinganifu lazima yahusishe tabia, si saini za mbinu za hifadhi pekee. Kila kikoa kilichohamishwa lazima kifafanue na kuthibitisha:

- saa za eneo, usahihi, na usarifu wa mihuri ya muda;
- mpangilio wa `NULL`, kanuni za ulinganishaji, na matarajio ya kuzingatia ukubwa wa herufi;
- uwakilishi wa JSON na tabia ya ulinganishaji;
- usahihi wa namba kamili, desimali, na thamani za fedha;
- mpangilio thabiti na vigezo bainifu vya kuamua matokeo yanapolingana kwa ajili ya ugawaji wa kurasa;
- utengenezaji wa ID bila kutegemea ID za safu za SQLite;
- uainishaji wa ukiukaji wa upekee na funguo za kigeni;
- tabia ya safu zilizoathiriwa kwa operesheni zisizoleta mabadiliko, za kulinganisha/kusasisha, na za kufuta;
- matokeo ya uandishi wa wakati mmoja, migongano inayoweza kujaribiwa upya, na majaribio upya yasiyorudia athari.

Ikiwa kikoa hakiwezi kubainisha semantiki zinazoonekana zilizo sawa, bado hakiwezi kuhamishwa na lazima kisalie mahsusi kwa mfumo hadi mkataba huo utakapoundwa.

## Mahitaji ya uoanifu

Utekelezaji wowote unaofuata ADR hii lazima uhifadhi sifa hizi:

- SQLite inasalia kuwa chaguo-msingi lisilohitaji usanidi.
- Faili zilizopo za SQLite na historia ya uhamishaji zinasalia kusomeka.
- Mibadala ya SQLite ya npm, Electron, Docker, na mazingira ya utekelezaji yenye vizuizi inaendelea kutumia njia yake ya sasa ya kuanzisha.
- Vitambulisho vya mtoa huduma vilivyohifadhiwa vinaendelea kutumia tabia iliyopo ya usimbaji fiche ya programu.
- Uhamishaji wa hifadhi haubadilishi kimyakimya semantiki za uelekezaji, mgao, ufunguo wa API, au ukaguzi.
- Tabia ya kuhifadhi nakala na urejeshaji inaandikwa kwa kila mfumo badala ya kuwasilishwa kama ya jumla.
- Usakinishaji safi unaotumia SQLite pekee haupakii wala hauhitaji kiendeshi cha hifadhidata ya nje.

## Mfuatano wa uwasilishaji

1. Chapisha orodha inayoweza kuzalishwa tena ya utegemezi kwa SQLite kama matokeo tofauti ya ukaguzi.
2. Anzisha mikataba ya kwanza ya hifadhi za kikoa na majaribio ya ulinganifu.
3. Rekebisha utekelezaji uliopo wa SQLite nyuma ya mikataba hiyo bila kubadilisha chaguo-msingi.
4. Kwa kutegemea idhini ya watunzaji, ongeza PostgreSQL kama utekelezaji wa kwanza wa nje kwa sehemu moja
   yenye mipaka ya safu ya udhibiti.
5. Panua hali inayoshirikiwa tu baada ya kuwepo kwa majaribio ya uandishi wa wakati mmoja na umiliki wa uhamishaji.
6. Ongeza njia ya uhamishaji kutoka SQLite hadi mfumo wa nje inayofanya kazi nje ya mtandao na iliyothibitishwa kabla ya kutangaza ubadilishaji wa hifadhidata.
7. Ongeza MySQL kwa kufuata mikataba iliyothibitishwa ya hifadhi na mfumo.

Kila hatua ya mazingira ya utekelezaji ni PR tofauti inayoweza kukaguliwa. Hatua ya baadaye haipaswi kutumiwa kuhalalisha kuunganishwa kwa dhana dhahania isiyothibitishwa katika hatua ya awali.

## Sehemu ya kwanza ya utekelezaji

Sehemu ya kwanza ya wakati wa utekelezaji inapaswa kuchaguliwa baada ya orodha ya utegemeano kukaguliwa. Miunganisho ya watoa huduma, funguo za API, michanganyiko, na usanidi wa uelekezaji ni chaguo zinazowezekana kwa sababu majedwali yake ya msingi yanaonekana katika `src/lib/db/core.ts`, lakini ADR hii haiidhinishi orodha ya majedwali wala PR ya uhamishaji.
Sehemu hiyo lazima ijumuishe:

- majaribio ya kuhifadhi tabia ya SQLite;
- majaribio ya uzingatiaji wa hazina;
- mipaka bayana ya miamala;
- uthibitishaji wa usimbaji fiche na ufichaji wa taarifa nyeti kwa vitambulisho vilivyohifadhiwa;
- kutobadilishwa kwa usanidi chaguo-msingi wa uanzishaji.

## Mibadala iliyozingatiwa

### Kuongeza PostgreSQL chini ya `SqliteAdapter`

Imekataliwa. `SqliteAdapter` ni safu ya uoanifu kwa mazingira ya wakati wa utekelezaji ya SQLite na huanika operesheni mahususi za SQLite. Kuiga kiolesura hicho kungeingiza makisio ya usawazishaji na mahususi kwa lahaja katika mfumo mpya wa nyuma.

### Kuanika API ya jumla ya hoja/utekelezaji kwa vikoa vyote

Imekataliwa kama mpaka mkuu. Ingeweka ushughulikiaji wa miunganisho mahali pamoja lakini ingeacha utegemeano wa lahaja ya SQL, miamala, na majedwali katika moduli za biashara. Kijenzi cha kiwango cha chini cha mfumo wa nyuma kinaweza kuwepo ndani ya utekelezaji wa hazina, si kama API ya uhifadhi inayotumiwa na programu.

### Kuandika upya uhifadhi wote kabla ya kuthibitisha sehemu moja

Imekataliwa. Kiolesura cha sasa cha uhifadhi ni kipana na kinajumuisha mzunguko wa maisha wa faili, urejeshaji, utafutaji, na mipangilio ya uendeshaji. Sehemu wima hutoa tabia inayoweza kukaguliwa na mipaka ya kurejesha mabadiliko.

### Kubadilisha SQLite kama chaguo-msingi

Imekataliwa. Upelekaji uliopachikwa na wa kompyuta za mezani hutegemea muundo wa sasa wa uanzishaji usiohitaji huduma. Mfumo wa nyuma wa nje ni wa hiari.

### Kutumia Redis kama mamlaka ya kudumu

Imekataliwa. Redis inaweza kusaidia uratibu wa muda mfupi uliobainishwa bayana, akiba, au vihesabio, lakini haichukui nafasi ya mkataba wa hazina ya kudumu ulioelezwa hapa.

## Matokeo

### Chanya

- Msimbo wa biashara unapata mpaka thabiti wa uhifadhi usiotegemea lahaja ya hifadhidata.
- Tabia ya SQLite inajaribiwa kabla ya mfumo wa nyuma wa nje kufafanua uondoaji huo.
- PostgreSQL na MySQL zinatumia kwa pamoja mikataba na majaribio badala ya kurudia mantiki ya kikoa.
- Uwezo wa SQLite pekee unaendelea kuwa wa kiwango cha kwanza badala ya kuwa safu za uoanifu zinazovujisha maelezo ya utekelezaji.
- Tabia ya uhamishaji na miamala katika nakala nyingi inakuwa suala bayana la usanifu.

### Gharama na hatari

- Utengaji wa hazina unahitaji uhamishaji wa hatua kwa hatua wa maeneo ya wito.
- Mipaka ya asinkroni inaweza kuenea katika msimbo wa huduma ambao kwa sasa ni sinkroni.
- Semantiki za mifumo tofauti ya nyuma zinahitaji majaribio ya uzingatiaji yanayozidi uoanifu wa sintaksia ya SQL.
- Hifadhi rudufu, utafutaji, uhifadhi wa vekta, na matengenezo yanaendelea kutegemea uwezo mahususi.
- Kuendesha zaidi ya utekelezaji mmoja wa uhifadhi huongeza gharama za CI na usaidizi wa uendeshaji.

## Yasiyolengwa

ADR hii haifanyi yafuatayo:

- kuongeza utegemezi wa hifadhidata, kigezo cha mazingira, skimu, au uhamishaji;
- kubadilisha singleton hai ya SQLite au msururu wa viendeshaji;
- kuahidi usaidizi wa PostgreSQL au MySQL katika toleo mahususi;
- kufanya FTS5, `sqlite-vec`, faili za hifadhi rudufu, au matengenezo ya SQLite yaweze kuhamishika;
- kufafanua utayari wa active-active kabla ya kuwepo kwa majaribio ya hali inayoshirikiwa na uratibu;
- kuidhinisha uandikaji upya wa mara moja wa `src/lib/db/`.

## Maswali ya wazi yanayohitaji idhini ya mtunzaji

1. Je, hazina pamoja na mpaka wa ndani wa backend usio sawia ndiyo mwelekeo unaopendelewa, au uhifadhi wa nje unapaswa kuwekwa nyuma ya huduma tofauti ya control-plane?
2. Je, PostgreSQL inakubalika kama utekelezaji wa kwanza wa nje baada ya uthibitishaji wa ulinganifu wa SQLite?
3. Ni kikoa kipi kinapaswa kuwa sehemu ya kwanza ya hazina yenye mipaka?
4. Ni hali ipi lazima ishirikiwe kwa hatua muhimu ya kwanza ya nakala nyingi, na ni ipi itaendelea kuwa ya ndani ya node?
5. Ni muda gani wa uoanifu unaohitajika kwa uhamishaji wa hazina uliokatizwa au uliorejeshwa nyuma?

Hadi maswali haya yatatuliwe, hati hii ni pendekezo na haimaanishi refactor yoyote ya runtime.
