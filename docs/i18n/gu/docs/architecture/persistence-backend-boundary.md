# ADR: Pluggable persistence boundary (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **સ્થિતિ:** પ્રસ્તાવિત — રનટાઇમ કાર્ય શરૂ થાય તે પહેલાં જાળવણીકર્તાની મંજૂરી જરૂરી છે
- **ટ્રેકિંગ ઇશ્યૂ:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **વ્યાપ:** માત્ર પર્સિસ્ટન્સ આર્કિટેક્ચર; આ નિર્ણય કોઈ બાહ્ય ડેટાબેઝ ઉમેરતો કે પસંદ કરતો નથી

## સંદર્ભ

OmniRoute હાલમાં `src/lib/db/`માંથી ડોમેન-લક્ષી પર્સિસ્ટન્સ ફંક્શન્સ પ્રસ્તુત કરે છે, જ્યારે
`src/lib/db/core.ts` દ્વારા પરત કરવામાં આવતું શેર કરેલું કનેક્શન `src/lib/db/adapters/types.ts`માંના
સિંક્રોનસ `SqliteAdapter` કરારને અમલમાં મૂકે છે. તે ઍડૅપ્ટર અનેક SQLite રનટાઇમને સપોર્ટ કરે છે, પરંતુ તેનું
ઇન્ટરફેસ SQLite-આકારનું જ રહે છે: સિંક્રોનસ પ્રિપેર્ડ સ્ટેટમેન્ટ્સ, `pragma`, ડિફર્ડ અને ઇમિડિયેટ
ટ્રાન્ઝેક્શન્સ, નેટિવ/ફાઇલ-કૉપી બૅકઅપ, ચેકપોઇન્ટ અને સ્થાનિક ડેટાબેઝ હૅન્ડલ.

વર્તમાન સ્ટાર્ટઅપ અને રિકવરી પાથ SQLite ફાઇલ લાઇફસાઇકલનું સંચાલન પણ કરે છે. `src/lib/db/core.ts`
`storage.sqlite`ને રિઝૉલ્વ કરે છે, એક પ્રોસેસ-ગ્લોબલ ઍડૅપ્ટર જાળવે છે, WALને ચેકપોઇન્ટ કરે છે, રિકવરી
દરમિયાન પસંદ કરેલા કોષ્ટકોને જાળવી રાખે છે અને ડેટાબેઝ ફરી બનાવતી વખતે SQLiteની સહાયક ફાઇલો દૂર કરે છે. `src/lib/db/adapters/driverFactory.ts`માં
ડ્રાઇવર પસંદગી સપોર્ટેડ SQLite રનટાઇમમાંથી પસંદ કરે છે; તે બાહ્ય-બૅકએન્ડ ઍબ્સ્ટ્રૅક્શન નથી.

સ્કીમાનો વિકાસ પણ એ જ રીતે જોડાયેલો છે. `src/lib/db/migrationRunner.ts` ક્રમાંકિત SQL ફાઇલો લાગુ કરે છે,
`sqlite_master` અને `PRAGMA table_info`ની તપાસ કરે છે, વૈકલ્પિક FTS5 સપોર્ટ શોધે છે અને માઇગ્રેશનનું
કાર્ય SQLite ટ્રાન્ઝેક્શન્સમાં ચલાવે છે. `src/lib/db/backup.ts` અને
`src/lib/db/optimizationSettings.ts` જેવા ઑપરેશનલ મૉડ્યુલો બૅકઅપ, `PRAGMA`, WAL, પેજ-સાઇઝ, ઑટો-વૅક્યુમ અને `VACUUM`
સિમેન્ટિક્સનો સીધો ઉપયોગ કરે છે.

આ એમ્બેડેડ SQLite ડિપ્લોયમેન્ટના માન્ય ગુણધર્મો છે. PostgreSQL અથવા MySQLને SQLite APIનું અનુકરણ
કરવાની ફરજ પાડ્યા વિના તે ઉપલબ્ધ રહેવા જોઈએ.

## નિર્ણય

પોર્ટેબલ ટકાઉ સ્ટેટ માટે બે-સ્તરીય પર્સિસ્ટન્સ બાઉન્ડરી અપનાવો:

1. **ડોમેન રિપોઝિટરી કરારો** બિઝનેસ અને રાઉટિંગ કોડને જરૂરી પર્સિસ્ટન્સ ઑપરેશન્સ વ્યાખ્યાયિત કરે છે.
   કૉલર્સ SQL ટેક્સ્ટ, પ્રિપેર્ડ સ્ટેટમેન્ટ્સ, ડેટાબેઝ ફાઇલો અથવા ડાયલેક્ટ ઑબ્જેક્ટ્સ પર નહીં, પરંતુ
   ડોમેન વર્તન અને ડોમેન ડેટા પર નિર્ભર રહે છે.
2. **એક આંતરિક અસિંક્રોનસ બૅકએન્ડ કરાર** ટ્રાન્ઝેક્શન કોન્ટેક્સ્ટ્સ, હેલ્થ/રેડીનેસ, માઇગ્રેશન
   કોઓર્ડિનેશન, બૅકએન્ડ ક્ષમતાઓ અને વર્ગીકૃત ભૂલો સાથે રિપોઝિટરી અમલીકરણોને સપોર્ટ કરે છે. ચોક્કસ TypeScript
   ઇન્ટરફેસ પ્રથમ અમલીકરણ PR સાથે પ્રસ્તાવિત કરવામાં આવશે અને કન્ફોર્મન્સ ટેસ્ટ્સ દ્વારા સાબિત કરવામાં આવશે;
   આ ADR ઇરાદાપૂર્વક કોઈ અનુમાનિત APIને સ્થિર કરતું નથી.

SQLite ડિફૉલ્ટ અમલીકરણ તરીકે યથાવત્ રહે છે. ડોમેન્સને નાના વર્ટિકલ સ્લાઇસમાં માઇગ્રેટ કરવામાં આવે ત્યારે
હાલની SQLite ડ્રાઇવર કૅસ્કેડ અને સિંક્રોનસ `SqliteAdapter`, SQLite રિપોઝિટરી અમલીકરણની પાછળ રહે છે.
કોઈપણ વપરાશકર્તા માટે બાહ્ય સેવા કન્ફિગર કરવી આવશ્યક નથી.

SQLite સામે રિપોઝિટરી બાઉન્ડરી સાબિત થયા પછી PostgreSQL પ્રથમ પ્રસ્તાવિત બાહ્ય અમલીકરણ છે.
MySQL બીજા બિઝનેસ-લૉજિક ફોર્ક તરીકે નહીં, પરંતુ એ જ કન્ફોર્મન્સ સ્યુટ સામે સમકક્ષ અમલીકરણ તરીકે અનુસરે છે.

## બાઉન્ડરીના નિયમો

### પોર્ટેબલ રિપોઝિટરી ઇન્ટરફેસ

પોર્ટેબલ રિપોઝિટરી નીચેનું પ્રસ્તુત કરી શકે છે:

- ડોમેન રીડ્સ અને રાઇટ્સ;
- સ્પષ્ટ ઍટૉમિક ઑપરેશન્સ અને ટ્રાન્ઝેક્શન-સ્કોપ્ડ રિપોઝિટરી ઍક્સેસ;
- જ્યાં કન્કરન્સી સિમેન્ટિક્સ ડોમેનનો ભાગ હોય ત્યાં કમ્પેર/અપડેટ અથવા લીઝ ઑપરેશન્સ;
- બૅકએન્ડ-ન્યૂટ્રલ પેજિનેશન, ઑર્ડરિંગ અને કન્સ્ટ્રેઇન્ટ ભૂલો.

બૅકએન્ડ હેલ્થ, રેડીનેસ અને માઇગ્રેશન કોઓર્ડિનેશન વ્યક્તિગત ડોમેન રિપોઝિટરીઓને બદલે આંતરિક બૅકએન્ડ/ઑપરેશનલ
કરારના ભાગ છે.

પોર્ટેબલ રિપોઝિટરીએ નીચેનું પ્રસ્તુત ન કરવું જોઈએ:

- `prepare`, `get`, `all`, `run` અથવા રૉ ડ્રાઇવર હૅન્ડલ્સ;
- `PRAGMA`, WAL ચેકપોઇન્ટ મોડ્સ, `VACUUM` અથવા પેજ/કૅશ ટ્યુનિંગ;
- SQLite ફાઇલ પાથ્સ, સહાયક ફાઇલો અથવા ફાઇલ-કૉપી બૅકઅપ;
- ક્રોસ-બૅકએન્ડ ડોમેન કરાર તરીકે `lastInsertRowid`;
- FTS5 અથવા `sqlite-vec` સિન્ટેક્સ;
- સામાન્ય બિઝનેસ કોડ દ્વારા ઉપયોગમાં લેવાતો જેનરિક ડાયલેક્ટ એસ્કેપ હૅચ.

### બૅકએન્ડ ક્ષમતાનું ઇન્ટરફેસ

બૅકએન્ડ-વિશિષ્ટ વર્તન સ્પષ્ટ અને સરળતાથી શોધી શકાય તેવું રહે છે. માત્ર SQLite માટેનું જાળવણી કાર્ય તેના
પોતાના અમલીકરણ અને ઑપરેશનલ ઇન્ટરફેસની પાછળ રહે છે, જેમાં આનો સમાવેશ થાય છે:

- રનટાઇમ ડ્રાઇવર પસંદગી;
- WAL ચેકપોઇન્ટ અને SQLite શટડાઉન વર્તન;
- પેજ-સાઇઝ, કૅશ-સાઇઝ અને ઑટો-વૅક્યુમ સેટિંગ્સ;
- ડેટાબેઝ-ફાઇલ બૅકઅપ, રિસ્ટોર અને રિકવરી;
- SQLite સ્કીમા ઇન્ટ્રોસ્પેક્શન;
- FTS5 અને `sqlite-vec` ઇન્ટિગ્રેશન.

બાહ્ય બૅકએન્ડ માટે તે સુવિધાઓનું અનુકરણ કરવું આવશ્યક નથી. રિપોઝિટરીઓએ કાં તો પોર્ટેબલ ક્ષમતાનો ઉપયોગ કરવો,
દસ્તાવેજીકૃત વર્તન સાથે બૅકએન્ડ-વિશિષ્ટ અમલીકરણ પ્રદાન કરવું અથવા ક્ષમતા ઉપલબ્ધ નથી તે રિપોર્ટ કરવું આવશ્યક છે.

## ટ્રાન્ઝેક્શન અને માઇગ્રેશન મોડેલ

Repository APIs પરમાણુ બિઝનેસ ઑપરેશનને વ્યાખ્યાયિત કરે છે; કૉલર્સ SQL ટ્રાન્ઝેક્શન મોડ પસંદ કરતા નથી.
દરેક ઑપરેશને તેની અવલોકનક્ષમ સમકાલીનતા ગેરંટી વ્યાખ્યાયિત કરવી આવશ્યક છે: સુરક્ષિત invariants, conflict
detection, retry classification, idempotency અપેક્ષાઓ અને transaction-context propagation.
અમલીકરણો અલગ ટ્રાન્ઝેક્શન અને isolation મિકેનિઝમનો ઉપયોગ માત્ર ત્યારે જ કરી શકે છે, જ્યારે તે અવલોકનક્ષમ
ગેરંટી સમકક્ષ રહે. જ્યાં ઑપરેશનનો contract સંતોષાતો હોય ત્યાં SQLite આંતરિક રીતે તેની વર્તમાન deferred અથવા immediate
ટ્રાન્ઝેક્શન વર્તણૂકનો ઉપયોગ કરવાનું ચાલુ રાખી શકે છે.

બહુવિધ application replicas એક જ schema ફેરફાર માટે સ્પર્ધા ન કરે તે માટે બાહ્ય backends ને સ્પષ્ટ migration ownership જરૂરી છે.
Backend migration histories તાર્કિક milestones શેર કરી શકે છે, પરંતુ SQLite SQL
ફાઇલો અન્ય dialect માટે portable અથવા પુનઃઉપયોગ કરી શકાય તેવી હોવાનું માનવામાં આવતું નથી.

## Cross-backend conformance semantics

Conformance tests માં માત્ર repository method signatures જ નહીં, પરંતુ વર્તણૂક પણ આવરી લેવી આવશ્યક છે. દરેક migrated domain
એ નીચેની બાબતો વ્યાખ્યાયિત અને ચકાસવી આવશ્યક છે:

- timestamp timezone, precision અને serialization;
- `NULL` ordering, collation અને case-sensitivity અપેક્ષાઓ;
- JSON representation અને comparison વર્તણૂક;
- integer, decimal અને monetary precision;
- pagination માટે stable ordering અને deterministic tie-breakers;
- SQLite row IDs પર આધાર રાખ્યા વિના ID generation;
- uniqueness અને foreign-key violation classification;
- no-op, compare/update અને delete ઑપરેશનો માટે affected-row વર્તણૂક;
- concurrent-write outcomes, retryable conflicts અને idempotent retries.

જો કોઈ domain સમકક્ષ અવલોકનક્ષમ semantics સ્પષ્ટ કરી શકતું ન હોય, તો તે હજી portable નથી અને તે contract ડિઝાઇન ન થાય
ત્યાં સુધી backend-specific જ રહેવું આવશ્યક છે.

## સુસંગતતાની આવશ્યકતાઓ

આ ADR ને અનુસરતા કોઈપણ અમલીકરણે આ ગુણધર્મો જાળવવા આવશ્યક છે:

- SQLite zero-configuration ડિફૉલ્ટ તરીકે યથાવત્ રહે છે.
- હાલની SQLite ફાઇલો અને migration history વાંચી શકાય તેવી રહે છે.
- npm, Electron, Docker અને restricted-runtime SQLite fallbacks તેમના વર્તમાન startup path ને જાળવી રાખે છે.
- સંગ્રહિત provider credentials હાલની application encryption વર્તણૂકનો ઉપયોગ કરવાનું ચાલુ રાખે છે.
- Repository migration routing, quota, API-key અથવા audit semantics ને જાણ કર્યા વિના બદલતું નથી.
- Backup અને recovery વર્તણૂકને universal તરીકે રજૂ કરવાને બદલે દરેક backend માટે દસ્તાવેજીકૃત કરવામાં આવે છે.
- સ્વચ્છ SQLite-only installation કોઈ બાહ્ય database driver લોડ કરતું નથી અથવા તેની આવશ્યકતા રાખતું નથી.

## ડિલિવરી ક્રમ

1. એક અલગ review artifact તરીકે પુનરુત્પાદિત કરી શકાય તેવી SQLite coupling inventory પ્રકાશિત કરો.
2. પ્રથમ domain repository contracts અને conformance tests રજૂ કરો.
3. ડિફૉલ્ટ્સ બદલ્યા વિના હાલના SQLite implementation ને તે contracts પાછળ અનુકૂલિત કરો.
4. Maintainer ની મંજૂરીને આધીન રહીને, એક
   bounded control-plane slice માટે પ્રથમ external implementation તરીકે PostgreSQL ઉમેરો.
5. Concurrent-write અને migration-ownership tests અસ્તિત્વમાં આવ્યા પછી જ shared state વિસ્તારો.
6. Database switching ની જાહેરાત કરતાં પહેલાં offline, validated SQLite-to-external migration path ઉમેરો.
7. સાબિત થયેલા repository અને backend contracts સામે MySQL ઉમેરો.

દરેક runtime step એક અલગ, સમીક્ષા કરી શકાય તેવી PR છે. પછીના step નો ઉપયોગ અગાઉના step માં
અપ્રમાણિત abstraction merge કરવાનું યોગ્ય ઠેરવવા માટે થવો ન જોઈએ.

## પ્રથમ અમલીકરણ સ્લાઇસ

કપલિંગ ઇન્વેન્ટરીની સમીક્ષા કર્યા પછી પ્રથમ રનટાઇમ સ્લાઇસ પસંદ કરવો જોઈએ. પ્રોવાઇડર
કનેક્શન્સ, API કીઝ, કોમ્બોઝ અને રાઉટિંગ કન્ફિગરેશન સંભવિત ઉમેદવારો છે, કારણ કે તેમના બેઝ ટેબલ્સ
`src/lib/db/core.ts`માં દેખાય છે, પરંતુ આ ADR કોઈ ટેબલ યાદી અથવા માઇગ્રેશન PRને મંજૂરી આપતું નથી.
સ્લાઇસમાં આનો સમાવેશ આવશ્યક છે:

- SQLite વર્તન-જાળવણી પરીક્ષણો;
- રિપોઝિટરી અનુરૂપતા પરીક્ષણો;
- સ્પષ્ટ ટ્રાન્ઝેક્શન સીમાઓ;
- સંગ્રહિત ક્રેડેન્શિયલ્સ માટે એન્ક્રિપ્શન અને રીડેક્શનની ચકાસણી;
- ડિફૉલ્ટ સ્ટાર્ટઅપ કન્ફિગરેશનમાં કોઈ ફેરફાર નહીં.

## વિચારવામાં આવેલા વિકલ્પો

### `SqliteAdapter`ની નીચે PostgreSQL ઉમેરવું

નકારવામાં આવ્યું. `SqliteAdapter` એ SQLite રનટાઇમ્સ માટેનું કમ્પેટિબિલિટી લેયર છે અને SQLite-વિશિષ્ટ
ઑપરેશન્સ ઉપલબ્ધ કરાવે છે. તે સપાટીનું અનુકરણ કરવાથી સિંક્રોનસ અને ડાયલેક્ટ-વિશિષ્ટ ધારણાઓ નવા
બૅકએન્ડમાં લીક થશે.

### બધા ડોમેન્સ માટે સામાન્ય query/execute API ખુલ્લું મૂકવું

પ્રાથમિક સીમા તરીકે નકારવામાં આવ્યું. તે કનેક્શન હેન્ડલિંગને કેન્દ્રિત કરશે, પરંતુ SQL ડાયલેક્ટ,
ટ્રાન્ઝેક્શન અને ટેબલ કપલિંગને બિઝનેસ મોડ્યુલ્સમાં જ રહેવા દેશે. નીચલા સ્તરનું બૅકએન્ડ પ્રિમિટિવ
રિપોઝિટરી અમલીકરણોની અંદર હોઈ શકે છે, પરંતુ એપ્લિકેશન-ફેસિંગ પર્સિસ્ટન્સ API તરીકે નહીં.

### એક સ્લાઇસને માન્ય કરતાં પહેલાં સમગ્ર પર્સિસ્ટન્સ ફરીથી લખવું

નકારવામાં આવ્યું. વર્તમાન પર્સિસ્ટન્સ સપાટી વ્યાપક છે અને તેમાં ફાઇલ લાઇફસાઇકલ, રિકવરી, સર્ચ
અને ઑપરેશનલ સેટિંગ્સનો સમાવેશ થાય છે. વર્ટિકલ સ્લાઇસિસ સમીક્ષા કરી શકાય તેવું વર્તન અને રોલબૅક
સીમાઓ પ્રદાન કરે છે.

### SQLiteને ડિફૉલ્ટ તરીકે બદલવું

નકારવામાં આવ્યું. એમ્બેડેડ અને ડેસ્કટૉપ ડિપ્લોયમેન્ટ્સ વર્તમાન ઝીરો-સર્વિસ સ્ટાર્ટઅપ મોડલ પર
આધાર રાખે છે. બાહ્ય બૅકએન્ડ ઑપ્ટ-ઇન છે.

### ટકાઉ અધિકૃત સ્રોત તરીકે Redisનો ઉપયોગ કરવો

નકારવામાં આવ્યું. Redis સ્પષ્ટપણે ક્ષણિક કોઓર્ડિનેશન, કૅશ અથવા કાઉન્ટર્સને સમર્થન આપી શકે છે, પરંતુ
તે અહીં વર્ણવેલા ટકાઉ રિપોઝિટરી કૉન્ટ્રાક્ટનું સ્થાન લેતું નથી.

## પરિણામો

### સકારાત્મક

- બિઝનેસ કોડને ડેટાબેઝ ડાયલેક્ટથી સ્વતંત્ર, સ્થિર પર્સિસ્ટન્સ સીમ મળે છે.
- કોઈ બાહ્ય બૅકએન્ડ એબ્સ્ટ્રૅક્શનને વ્યાખ્યાયિત કરે તે પહેલાં SQLiteના વર્તનનું પરીક્ષણ થાય છે.
- PostgreSQL અને MySQL ડોમેન લૉજિકનું ડુપ્લિકેશન કરવાને બદલે કૉન્ટ્રાક્ટ્સ અને પરીક્ષણો વહેંચે છે.
- માત્ર SQLite માટેની ક્ષમતાઓ લીકી કમ્પેટિબિલિટી શિમ્સ બનવાને બદલે પ્રથમ-વર્ગની રહે છે.
- મલ્ટિ-રેપ્લિકા માઇગ્રેશન અને ટ્રાન્ઝેક્શન વર્તન સ્પષ્ટ ડિઝાઇન સંબંધિત મુદ્દો બને છે.

### ખર્ચ અને જોખમો

- રિપોઝિટરી એક્સ્ટ્રૅક્શન માટે કૉલ-સાઇટનું ક્રમિક માઇગ્રેશન જરૂરી છે.
- Async સીમાઓ હાલમાં સિંક્રોનસ સર્વિસ કોડમાં પ્રસરી શકે છે.
- ક્રોસ-બૅકએન્ડ સેમેન્ટિક્સ માટે SQL સિન્ટેક્સ કમ્પેટિબિલિટીથી આગળ વધતા અનુરૂપતા પરીક્ષણો જરૂરી છે.
- બૅકઅપ, સર્ચ, વેક્ટર સ્ટોરેજ અને મેન્ટેનન્સ ક્ષમતા-વિશિષ્ટ રહે છે.
- એકથી વધુ પર્સિસ્ટન્સ અમલીકરણો ચલાવવાથી CI અને ઑપરેશનલ સપોર્ટનો ખર્ચ વધે છે.

## બિન-લક્ષ્યો

આ ADR નીચેના કાર્યો કરતું નથી:

- ડેટાબેઝ ડિપેન્ડન્સી, એન્વાયર્નમેન્ટ વેરિએબલ, સ્કીમા અથવા માઇગ્રેશન ઉમેરવું;
- લાઇવ SQLite સિંગલ્ટન અથવા ડ્રાઇવર કૅસ્કેડ બદલવું;
- કોઈ ચોક્કસ રિલીઝમાં PostgreSQL અથવા MySQL સપોર્ટનું વચન આપવું;
- FTS5, `sqlite-vec`, બૅકઅપ ફાઇલો અથવા SQLite મેન્ટેનન્સને પોર્ટેબલ બનાવવું;
- શેર્ડ-સ્ટેટ અને કોઓર્ડિનેશન પરીક્ષણો અસ્તિત્વમાં આવે તે પહેલાં ઍક્ટિવ-ઍક્ટિવ તત્પરતા વ્યાખ્યાયિત કરવી;
- `src/lib/db/`ના એકમુશ્ત પુનર્લેખનને મંજૂરી આપવી.

## જાળવણીકર્તાની મંજૂરી માટે ખુલ્લા પ્રશ્નો

1. રિપોઝિટરી અને આંતરિક async બેકએન્ડ સીમાનું સંયોજન પસંદગીની દિશા છે, કે પછી
   બાહ્ય પર્સિસ્ટન્સને અલગ કંટ્રોલ-પ્લેન સર્વિસની પાછળ રાખવું જોઈએ?
2. SQLite અનુરૂપતા પછીના પ્રથમ બાહ્ય અમલીકરણ તરીકે PostgreSQL સ્વીકાર્ય છે?
3. પ્રથમ સીમાબદ્ધ રિપોઝિટરી સ્લાઇસ કયા ડોમેનની હોવી જોઈએ?
4. પ્રથમ મલ્ટિ-રેપ્લિકા માઇલસ્ટોન માટે કઈ સ્થિતિ શેર કરવી આવશ્યક છે, અને કઈ નોડ-લોકલ રહેવી જોઈએ?
5. વિક્ષેપિત અથવા રોલ-બૅક કરાયેલા રિપોઝિટરી માઇગ્રેશન માટે કઈ સુસંગતતા અવધિ આવશ્યક છે?

આ પ્રશ્નોનું નિરાકરણ ન આવે ત્યાં સુધી, આ દસ્તાવેજ એક પ્રસ્તાવ છે અને તે કોઈ રનટાઇમ રિફૅક્ટર સૂચવતો નથી.
