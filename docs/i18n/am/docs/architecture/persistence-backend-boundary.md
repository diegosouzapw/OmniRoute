# ADR: Pluggable persistence boundary (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **ሁኔታ:** የቀረበ — የሩጫ ጊዜ ሥራ ከመጀመሩ በፊት የጠጋኝ አስተዳዳሪ ማጽደቅን ይፈልጋል
- **የክትትል ጉዳይ:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **ወሰን:** የዘላቂ ማከማቻ ንድፈ ሕንፃ ብቻ፤ ይህ ውሳኔ ውጫዊ የውሂብ ጎታን አይጨምርም ወይም አይመርጥም

## አውድ

OmniRoute በአሁኑ ጊዜ ከ`src/lib/db/` ጎራ-ተኮር የዘላቂ ማከማቻ ተግባራትን ያቀርባል፤ በ`src/lib/db/core.ts` የሚመለሰው የጋራ ግንኙነት ደግሞ በ`src/lib/db/adapters/types.ts` ያለውን የተመሳሰለ `SqliteAdapter` ውል ይተገብራል። ያ አስማሚ በርካታ የSQLite የሩጫ ጊዜዎችን ይደግፋል፤ ሆኖም በይነገጹ የSQLite ቅርጽ እንዳለው ይቀራል፦ የተመሳሰሉ የተዘጋጁ መግለጫዎች፣ `pragma`፣ የዘገዩ እና ፈጣን ግብይቶች፣ ቤተኛ/ፋይል-ቅጂ ምትኬ፣ መቆጣጠሪያ ነጥብ እና የአካባቢ የውሂብ ጎታ መያዣ።

አሁን ያለው የማስጀመሪያ እና የመልሶ ማግኛ መንገድ የSQLite ፋይል የሕይወት ዑደትንም ይቆጣጠራል። `src/lib/db/core.ts` `storage.sqlite`ን ይፈታል፣ አንድ የሂደት-አቀፍ አስማሚን ይጠብቃል፣ WALን ወደ መቆጣጠሪያ ነጥብ ያደርሳል፣ በመልሶ ማግኛ ጊዜ የተመረጡ ሰንጠረዦችን ይጠብቃል፣ እንዲሁም የውሂብ ጎታ እንደገና ሲገነባ የSQLite አጋዥ ፋይሎችን ያስወግዳል። በ`src/lib/db/adapters/driverFactory.ts` ውስጥ ያለው የነጂ ምርጫ ከሚደገፉት የSQLite የሩጫ ጊዜዎች መካከል ይመርጣል፤ ይህ የውጫዊ ጀርባ-አገልግሎት ማጠቃለያ አይደለም።

የመርሐግብር ለውጥም በተመሳሳይ ሁኔታ የተሳሰረ ነው። `src/lib/db/migrationRunner.ts` ቁጥር የተሰጣቸውን የSQL ፋይሎች ይተገብራል፣ `sqlite_master`ን እና `PRAGMA table_info`ን ይመረምራል፣ አማራጭ የFTS5 ድጋፍን ይለያል፣ እንዲሁም የፍልሰት ሥራን በSQLite ግብይቶች ውስጥ ያከናውናል። እንደ `src/lib/db/backup.ts` እና `src/lib/db/optimizationSettings.ts` ያሉ የክወና ሞጁሎች ምትኬ፣ `PRAGMA`፣ WAL፣ የገጽ መጠን፣ ራስ-ሰር ባዶ ማድረግ እና `VACUUM` ትርጉሞችን በቀጥታ ይጠቀማሉ።

እነዚህ የተካተተው የSQLite ስርጭት ትክክለኛ ባህሪያት ናቸው። PostgreSQL ወይም MySQL የSQLite APIን እንዲያስመስሉ ሳያስገድዱ እንደተገኙ መቆየት አለባቸው።

## ውሳኔ

ለተንቀሳቃሽ ዘላቂ ሁኔታ ባለሁለት ደረጃ የዘላቂ ማከማቻ ወሰን ይወሰድ፦

1. **የጎራ ማከማቻ ውሎች** በንግድ እና በማዞሪያ ኮድ የሚፈለጉትን የዘላቂ ማከማቻ ክዋኔዎች ይገልጻሉ። ጠሪዎች በSQL ጽሑፍ፣ በተዘጋጁ መግለጫዎች፣ በውሂብ ጎታ ፋይሎች ወይም በቀበሌኛ ነገሮች ሳይሆን በጎራ ባህሪ እና በጎራ ውሂብ ላይ ይመረኮዛሉ።
2. **ውስጣዊ ያልተመሳሰለ የጀርባ-አገልግሎት ውል** የማከማቻ ትግበራዎችን በግብይት አውዶች፣ በጤና/ዝግጁነት፣ በፍልሰት ማስተባበር፣ በጀርባ-አገልግሎት ችሎታዎች እና በተመደቡ ስህተቶች ይደግፋል። ትክክለኛው የTypeScript በይነገጽ ከመጀመሪያው የትግበራ PR ጋር ይቀርባል እና በተኳኋኝነት ፈተናዎች ይረጋገጣል፤ ይህ ADR ሆን ብሎ ግምታዊ APIን አያጸናም።

SQLite ነባሪ ትግበራ ሆኖ ይቀጥላል። ነባሩ የSQLite ነጂዎች ተከታታይ ምርጫ እና የተመሳሰለው `SqliteAdapter` ጎራዎች በትንንሽ ቀጥተኛ ክፍሎች ሲፈልሱ ከSQLite ማከማቻ ትግበራ በስተጀርባ ይቆያሉ። ማንኛውም ተጠቃሚ ውጫዊ አገልግሎትን እንዲያዋቅር አይገደድም።

የማከማቻ ወሰኑ በSQLite ላይ ከተረጋገጠ በኋላ PostgreSQL የመጀመሪያው የቀረበ ውጫዊ ትግበራ ነው። MySQL እንደ ሁለተኛ የንግድ-አመክንዮ ቅርንጫፍ ሳይሆን በተመሳሳዩ የተኳኋኝነት ፈተና ስብስብ ላይ የተመሠረተ አቻ ትግበራ ሆኖ ይከተላል።

## የወሰን ደንቦች

### ተንቀሳቃሽ የማከማቻ በይነገጽ

ተንቀሳቃሽ ማከማቻ የሚከተሉትን ሊያቀርብ ይችላል፦

- የጎራ ንባቦች እና ጽሑፎች፤
- ግልጽ አቶሚክ ክዋኔዎች እና በግብይት ወሰን ውስጥ ያለ የማከማቻ መዳረሻ፤
- የትይዩነት ትርጉሞች የጎራው አካል በሆኑበት ጊዜ የማነጻጸር/ማዘመን ወይም የኪራይ ይዞታ ክዋኔዎች፤
- ከጀርባ-አገልግሎት ነጻ የገጽ ክፍፍል፣ ቅደም ተከተል እና የገደብ ስህተቶች።

የጀርባ-አገልግሎት ጤና፣ ዝግጁነት እና የፍልሰት ማስተባበር የእያንዳንዱ የጎራ ማከማቻ ሳይሆኑ የውስጣዊው ጀርባ-አገልግሎት/የክወና ውል አካል ናቸው።

ተንቀሳቃሽ ማከማቻ የሚከተሉትን ማቅረብ የለበትም፦

- `prepare`፣ `get`፣ `all`፣ `run` ወይም ጥሬ የነጂ መያዣዎች፤
- `PRAGMA`፣ የWAL መቆጣጠሪያ ነጥብ ሁነታዎች፣ `VACUUM` ወይም የገጽ/መሸጎጫ ማስተካከያ፤
- የSQLite ፋይል ዱካዎች፣ አጋዥ ፋይሎች ወይም የፋይል-ቅጂ ምትኬ፤
- `lastInsertRowid` እንደ ጀርባ-አገልግሎት አቋራጭ የጎራ ውል፤
- የFTS5 ወይም `sqlite-vec` አገባብ፤
- በመደበኛ የንግድ ኮድ ጥቅም ላይ የሚውል አጠቃላይ የቀበሌኛ ማምለጫ መንገድ።

### የጀርባ-አገልግሎት ችሎታ በይነገጽ

ለጀርባ-አገልግሎት የተለየ ባህሪ ግልጽ እና ሊገኝ የሚችል ሆኖ ይቀራል። SQLite-ብቻ የሆነ ጥገና ከራሱ ትግበራ እና የክወና በይነገጽ በስተጀርባ ይቆያል፤ ይህም የሚከተሉትን ያካትታል፦

- የሩጫ ጊዜ ነጂ ምርጫ፤
- የWAL መቆጣጠሪያ ነጥብ እና የSQLite መዝጋት ባህሪ፤
- የገጽ መጠን፣ የመሸጎጫ መጠን እና የራስ-ሰር ባዶ ማድረግ ቅንብሮች፤
- የውሂብ ጎታ ፋይል ምትኬ፣ መመለስ እና መልሶ ማግኘት፤
- የSQLite መርሐግብር ውስጣዊ ምርመራ፤
- የFTS5 እና `sqlite-vec` ውህደት።

ውጫዊ ጀርባ-አገልግሎት እነዚያን ባህሪያት እንዲያስመስል አይጠበቅበትም። ማከማቻዎች ተንቀሳቃሽ ችሎታን መጠቀም፣ የተመዘገበ ባህሪ ያለውን ለጀርባ-አገልግሎት የተለየ ትግበራ ማቅረብ ወይም ችሎታው እንደማይገኝ ማሳወቅ አለባቸው።

## የግብይት እና የዝውውር ሞዴል

የማከማቻ APIዎች አቶሚክ የንግድ ሥራውን ይወስናሉ፤ ጠሪዎች የSQL ግብይት ሁነታን አይመርጡም።
እያንዳንዱ ክዋኔ ሊስተዋሉ የሚችሉ የተጓዳኝነት ዋስትናዎቹን መወሰን አለበት፦ የተጠበቁ የማይለወጡ ደንቦች፣ የግጭት
ማወቂያ፣ የድጋሚ ሙከራ ምደባ፣ የidempotency ግምቶች እና የግብይት አውድ ማስተላለፍ።
ትግበራዎች የተለያዩ የግብይት እና የማግለል ስልቶችን መጠቀም የሚችሉት እነዚያ ሊስተዋሉ የሚችሉ
ዋስትናዎች ተመጣጣኝ ሆነው ሲቀጥሉ ብቻ ነው። SQLite የክዋኔውን ውል በሚያሟላበት ጊዜ የአሁኑን የተላለፈ ወይም ፈጣን
የግብይት ባህሪውን በውስጡ መጠቀሙን መቀጠል ይችላል።

በርካታ የመተግበሪያ ቅጂዎች ለተመሳሳዩ የመርሐግብር ለውጥ እንዳይፎካከሩ፣ ውጫዊ backends ግልጽ የዝውውር ባለቤትነትን ይፈልጋሉ።
የbackend ዝውውር ታሪኮች አመክንዮአዊ ወሳኝ ምዕራፎችን ሊጋሩ ይችላሉ፣ ነገር ግን የSQLite SQL
ፋይሎች ወደ ሌላ dialect ሊዛወሩ ወይም እንደገና ሊጠቀሙባቸው እንደሚችሉ አይታሰብም።

## በbackends መካከል ያሉ የተስማሚነት ፍቺዎች

የተስማሚነት ሙከራዎች የማከማቻ ሜቶድ ፊርማዎችን ብቻ ሳይሆን ባህሪንም መሸፈን አለባቸው። እያንዳንዱ የተዘዋወረ domain
የሚከተሉትን መወሰን እና ማረጋገጥ አለበት፦

- የtimestamp የሰዓት ሰቅ፣ ትክክለኛነት እና serialization፤
- የ`NULL` ቅደም ተከተል፣ collation እና የፊደል አቢይነት ትብነት ግምቶች፤
- የJSON ውክልና እና የንጽጽር ባህሪ፤
- የኢንቲጀር፣ የዴሲማል እና የገንዘብ ትክክለኛነት፤
- ለpagination የተረጋጋ ቅደም ተከተል እና የማያወላውሉ የእኩልነት መፍቻዎች፤
- በSQLite row IDs ላይ ሳይመሠረት ID ማመንጨት፤
- የuniqueness እና የforeign-key ጥሰት ምደባ፤
- ለno-op፣ compare/update እና delete ክዋኔዎች የተነኩ ረድፎች ባህሪ፤
- የተጓዳኝ ጽሕፈት ውጤቶች፣ ድጋሚ ሊሞከሩ የሚችሉ ግጭቶች እና idempotent ድጋሚ ሙከራዎች።

አንድ domain ተመጣጣኝ ሊስተዋል የሚችል ፍቺ ማስቀመጥ ካልቻለ፣ ገና portable አይደለም፤ ያ ውል
እስኪነደፍ ድረስ ለbackend ብቻ የተወሰነ ሆኖ መቆየት አለበት።

## የተኳኋኝነት መስፈርቶች

ይህን ADR የሚከተል ማንኛውም ትግበራ እነዚህን ባህሪያት ጠብቆ ማቆየት አለበት፦

- SQLite ምንም ውቅር የማይፈልገው ነባሪ ሆኖ ይቀጥላል።
- ነባር የSQLite ፋይሎች እና የዝውውር ታሪክ ሊነበቡ የሚችሉ ሆነው ይቀጥላሉ።
- npm፣ Electron፣ Docker እና የተገደበ-runtime SQLite fallbackዎች የአሁኑን የማስጀመሪያ መንገዳቸውን ይዘው ይቀጥላሉ።
- የተከማቹ የprovider ማረጋገጫዎች ነባሩን የመተግበሪያ encryption ባህሪ መጠቀማቸውን ይቀጥላሉ።
- የማከማቻ ዝውውር routing፣ quota፣ API-key ወይም audit ፍቺዎችን በድብቅ አይለውጥም።
- የbackup እና recovery ባህሪ ሁሉን አቀፍ ተደርጎ ከመቅረብ ይልቅ ለእያንዳንዱ backend በተናጠል ይመዘገባል።
- ንጹሕ SQLite-only ጭነት ውጫዊ database driver አይጭንም ወይም አይፈልግም።

## የማቅረቢያ ቅደም ተከተል

1. እንደ ተለየ የግምገማ artifact እንደገና ሊፈጠር የሚችል የSQLite ቁርኝት ዝርዝር ያትሙ።
2. የመጀመሪያዎቹን የdomain ማከማቻ ውሎች እና የተስማሚነት ሙከራዎች ያስተዋውቁ።
3. ነባሪዎችን ሳይቀይሩ ነባሩን የSQLite ትግበራ ከእነዚያ ውሎች ጀርባ ያስማሙ።
4. በmaintainer ፈቃድ መሠረት፣ ለአንድ የተወሰነ control-plane ክፍል PostgreSQLን እንደ መጀመሪያው ውጫዊ ትግበራ
   ያክሉ።
5. የተጓዳኝ ጽሕፈት እና የዝውውር ባለቤትነት ሙከራዎች ከተኖሩ በኋላ ብቻ የጋራ stateን ያስፋፉ።
6. database switchingን ከማስተዋወቅዎ በፊት offline እና የተረጋገጠ የSQLite-to-external ዝውውር መንገድ ያክሉ።
7. በተረጋገጡት የማከማቻ እና backend ውሎች ላይ MySQLን ያክሉ።

እያንዳንዱ የruntime ደረጃ የተለየና ሊገመገም የሚችል PR ነው። በኋላ ያለ ደረጃ ቀደም ባለ ደረጃ
ያልተረጋገጠ abstractionን ማዋሃድ ተገቢ መሆኑን ለማስረዳት መጠቀም የለበትም።

## የመጀመሪያው የአተገባበር ክፍል

የመጀመሪያው የruntime ክፍል የcoupling inventory ከተገመገመ በኋላ መመረጥ አለበት። የProvider ግንኙነቶች፣ API keys፣ combos እና የrouting ውቅር መሠረታዊ tables በ`src/lib/db/core.ts` ውስጥ ስለሚታዩ ዕጩዎች ናቸው፤ ሆኖም ይህ ADR የtable ዝርዝር ወይም migration PR አያጸድቅም።
ክፍሉ የሚከተሉትን ማካተት አለበት፦

- የSQLite ባህሪን የመጠበቅ ሙከራዎች፤
- የrepository ተገዢነት ሙከራዎች፤
- በግልጽ የተወሰኑ የtransaction ወሰኖች፤
- ለተከማቹ credentials የencryption እና redaction ማረጋገጫ፤
- በነባሪው የstartup ውቅር ላይ ምንም ለውጥ አለመኖር።

## የታሰቡ አማራጮች

### PostgreSQLን ከ`SqliteAdapter` በታች ማከል

ውድቅ ተደርጓል። `SqliteAdapter` ለSQLite runtimes የተዘጋጀ compatibility layer ሲሆን SQLite-ተኮር operationsን ያቀርባል። ያንን surface መምሰል synchronous እና dialect-ተኮር assumptionsን ወደ አዲሱ backend እንዲገቡ ያደርጋል።

### ለሁሉም domains አጠቃላይ query/execute API ማቅረብ

እንደ ዋና boundary ውድቅ ተደርጓል። የconnection አያያዝን ማዕከላዊ ቢያደርግም፣ SQL dialect፣ transaction እና table couplingን በbusiness modules ውስጥ ይተዋል። ዝቅተኛ-ደረጃ backend primitive በrepository implementations ውስጥ ሊኖር ይችላል፤ ነገር ግን ለapplication የሚቀርብ persistence API መሆን የለበትም።

### አንድን ክፍል ከማረጋገጥ በፊት ሁሉንም persistence እንደገና መጻፍ

ውድቅ ተደርጓል። አሁን ያለው የpersistence surface ሰፊ ሲሆን file lifecycle፣ recovery፣ search እና operational settingsን ያካትታል። Vertical slices ሊገመገም የሚችል ባህሪ እና የrollback ወሰኖችን ይሰጣሉ።

### SQLiteን እንደ ነባሪ መተካት

ውድቅ ተደርጓል። Embedded እና desktop deployments አሁን ባለው zero-service startup model ላይ ይመረኮዛሉ። ውጫዊ backend በምርጫ ብቻ የሚነቃ ነው።

### Redisን እንደ durable authority መጠቀም

ውድቅ ተደርጓል። Redis በግልጽ ephemeral ተብለው የተወሰኑ coordination፣ cache ወይም countersን ሊደግፍ ይችላል፤ ነገር ግን እዚህ የተገለጸውን durable repository contract አይተካም።

## ውጤቶች

### አዎንታዊ

- የBusiness code ከdatabase dialect ነጻ የሆነ የተረጋጋ persistence seam ያገኛል።
- ውጫዊ backend abstractionን ከመወሰኑ በፊት የSQLite ባህሪ ይፈተናል።
- PostgreSQL እና MySQL domain logicን ከመድገም ይልቅ contracts እና testsን ይጋራሉ።
- SQLite-ብቻ የሆኑ capabilities መረጃ የሚያፈስሱ compatibility shims ከመሆን ይልቅ first-class ሆነው ይቀጥላሉ።
- የMulti-replica migration እና transaction ባህሪ በግልጽ ሊታሰብበት የሚገባ የንድፍ ጉዳይ ይሆናል።

### ወጪዎች እና አደጋዎች

- Repository extraction ቀስ በቀስ የሚከናወን call-site migration ይፈልጋል።
- Async boundaries በአሁኑ ጊዜ synchronous በሆነው service code ውስጥ ሊስፋፉ ይችላሉ።
- Cross-backend semantics ከSQL syntax compatibility በላይ የሆኑ conformance testsን ይፈልጋሉ።
- Backup፣ search፣ vector storage እና maintenance capability-ተኮር ሆነው ይቀጥላሉ።
- ከአንድ በላይ persistence implementation ማስኬድ የCI እና operational support ወጪን ይጨምራል።

## ዒላማ ያልሆኑ ነገሮች

ይህ ADR የሚከተሉትን አያደርግም፦

- database dependency፣ environment variable፣ schema ወይም migration አይጨምርም፤
- በሥራ ላይ ያለውን SQLite singleton ወይም driver cascade አይለውጥም፤
- PostgreSQL ወይም MySQL support በአንድ የተወሰነ release ውስጥ እንደሚቀርብ ቃል አይገባም፤
- FTS5፣ `sqlite-vec`፣ backup files ወይም SQLite maintenanceን portable አያደርግም፤
- shared-state እና coordination tests ከመኖራቸው በፊት active-active readinessን አይወስንም፤
- `src/lib/db/`ን በአንድ ጊዜ ሙሉ በሙሉ እንደገና መጻፍን አያጸድቅም።

## ለጥገና ኃላፊው ማጽደቅ ክፍት የሆኑ ጥያቄዎች

1. ማከማቻው ከውስጣዊው async backend ወሰን ጋር የሚጠቀም አቅጣጫ ተመራጭ ነው፣ ወይስ
   ውጫዊ የውሂብ ቋሚ ማከማቻ ከተለየ control-plane አገልግሎት በስተጀርባ መኖር አለበት?
2. ከSQLite ተኳኋኝነት በኋላ PostgreSQL እንደ መጀመሪያው ውጫዊ ትግበራ ተቀባይነት አለው?
3. የትኛው domain የመጀመሪያው ወሰን ያለው የማከማቻ ክፍል መሆን አለበት?
4. ለመጀመሪያው ባለብዙ-replica ምዕራፍ የትኛው state መጋራት አለበት፣ እና የትኛው node-local ሆኖ ይቀራል?
5. ለተቋረጠ ወይም ወደኋላ ለተመለሰ የማከማቻ migration ምን ዓይነት የተኳኋኝነት ጊዜ መስኮት ያስፈልጋል?

እነዚህ ጥያቄዎች እስኪፈቱ ድረስ፣ ይህ ሰነድ ሀሳብ ብቻ ነው፣ እና ምንም runtime refactor እንደሚደረግ አያመለክትም።
