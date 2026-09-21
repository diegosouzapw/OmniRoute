# ADR: Pluggable persistence boundary (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **තත්ත්වය:** යෝජිතයි — runtime කාර්යය ආරම්භ කිරීමට පෙර නඩත්තුකරුගේ අනුමැතිය අවශ්ය වේ
- **ලුහුබැඳීමේ ගැටලුව:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **විෂය පථය:** ස්ථායිතා ගෘහනිර්මාණය පමණි; මෙම තීරණය බාහිර දත්ත සමුදායක් එක් කිරීම හෝ තෝරාගැනීම සිදු නොකරයි

## සන්දර්භය

OmniRoute දැනට `src/lib/db/` වෙතින් වසම්-නැඹුරු ස්ථායිතා ශ්රිත ඉදිරිපත් කරන අතර,
`src/lib/db/core.ts` මඟින් ලබාදෙන හවුල් සම්බන්ධතාව `src/lib/db/adapters/types.ts` හි ඇති සමමුහුර්ත `SqliteAdapter`
ගිවිසුම ක්රියාත්මක කරයි. එම adapter එක SQLite runtime කිහිපයකට සහාය දක්වන නමුත්, එහි
අතුරුමුහුණත SQLite ආකාරයෙන්ම පවතී: සමමුහුර්ත සූදානම් කළ ප්රකාශන, `pragma`, කල් දැමූ සහ වහාම සිදු කරන
ගනුදෙනු, ස්වදේශීය/ගොනු-පිටපත් උපස්ථකරණය, checkpoint, සහ දේශීය දත්ත සමුදා handle එකක්.

වත්මන් ආරම්භක සහ ප්රතිසාධන මාර්ගය ද SQLite ගොනුවේ ජීවන චක්රය පාලනය කරයි. `src/lib/db/core.ts`
මඟින් `storage.sqlite` නිරාකරණය කර, ක්රියාවලිය පුරා භාවිත වන තනි ගෝලීය adapter එකක් පවත්වාගෙන යමින්, WAL සඳහා checkpoint සිදු කර, ප්රතිසාධනයේදී තෝරාගත්
වගු සංරක්ෂණය කර, දත්ත සමුදායක් නැවත ගොඩනඟන විට SQLite සහායක ගොනු ඉවත් කරයි. `src/lib/db/adapters/driverFactory.ts` හි
driver තේරීම සහාය දක්වන SQLite runtime අතරින් එකක් තෝරයි; එය බාහිර-backend වියුක්තකරණයක් නොවේ.

Schema පරිණාමයද ඒ හා සමානව බැඳී ඇත. `src/lib/db/migrationRunner.ts` අංකනය කළ SQL ගොනු යොදමින්,
`sqlite_master` සහ `PRAGMA table_info` පරීක්ෂා කර, විකල්ප FTS5 සහාය හඳුනාගෙන, migration
කාර්යය SQLite ගනුදෙනු තුළ ක්රියාත්මක කරයි. `src/lib/db/backup.ts` සහ
`src/lib/db/optimizationSettings.ts` වැනි මෙහෙයුම් මොඩියුල උපස්ථකරණය, `PRAGMA`, WAL, පිටු-ප්රමාණය, ස්වයං-vacuum, සහ `VACUUM`
අර්ථකථන සෘජුව භාවිත කරයි.

මේවා කාවැද්දූ SQLite යෙදවුමේ වලංගු ගුණාංග වේ. PostgreSQL හෝ MySQL වෙත SQLite API එකක් අනුකරණය කිරීමට
බල නොකර ඒවා දිගටම ලබාගත හැකි විය යුතුය.

## තීරණය

ගෙනයා හැකි දිගුකාලීන තත්ත්වය සඳහා මට්ටම් දෙකක ස්ථායිතා සීමාවක් අනුගමනය කරන්න:

1. **වසම් repository ගිවිසුම්** ව්යාපාරික සහ routing
   කේතයට අවශ්ය ස්ථායිතා මෙහෙයුම් නිර්වචනය කරයි. ඇමතුම්කරුවන් රඳා පවතින්නේ SQL පෙළ, සූදානම් කළ ප්රකාශන,
   දත්ත සමුදා ගොනු, හෝ dialect object මත නොව වසම් හැසිරීම් සහ වසම් දත්ත මතය.
2. **අභ්යන්තර අසමමුහුර්ත backend ගිවිසුමක්** ගනුදෙනු සන්දර්භ, සෞඛ්යය/සූදානම, migration සම්බන්ධීකරණය, backend හැකියාවන්, සහ
   වර්ගීකරණය කළ දෝෂ සමඟ repository ක්රියාත්මක කිරීම් සඳහා සහාය දක්වයි. නිශ්චිත TypeScript අතුරුමුහුණත පළමු ක්රියාත්මක කිරීමේ
   PR එක සමඟ යෝජනා කර අනුකූලතා පරීක්ෂණ මඟින් තහවුරු කරනු ඇත; මෙම ADR එක හිතකල්පිත API එකක් හිතාමතාම ස්ථාවර නොකරයි.

SQLite පෙරනිමි ක්රියාත්මක කිරීම ලෙස පවතී. වසම් කුඩා සිරස් කොටස් වශයෙන් migration කරන අතරතුර පවතින SQLite driver cascade එක සහ සමමුහුර්ත
`SqliteAdapter` එක SQLite repository ක්රියාත්මක කිරීම පිටුපස පවතී. කිසිදු පරිශීලකයෙකුට බාහිර සේවාවක් වින්යාස කිරීම අවශ්ය නොවේ.

repository සීමාව SQLite සමඟ තහවුරු කිරීමෙන් පසු යෝජිත පළමු බාහිර ක්රියාත්මක කිරීම PostgreSQL වේ.
MySQL දෙවන ව්යාපාරික-තර්ක ශාඛාවක් ලෙස නොව, එකම අනුකූලතා පරීක්ෂණ කට්ටලයට එරෙහි සම මට්ටමේ ක්රියාත්මක කිරීමක් ලෙස ඉන් පසුව එක්වේ.

## සීමා නීති

### ගෙනයා හැකි repository අතුරුමුහුණත

ගෙනයා හැකි repository එකකට පහත දෑ නිරාවරණය කළ හැක:

- වසම් කියවීම් සහ ලිවීම්;
- පැහැදිලි පරමාණුක මෙහෙයුම් සහ ගනුදෙනු-සීමිත repository ප්රවේශය;
- සමකාලීනතා අර්ථකථන වසමේ කොටසක් වන විට සැසඳීම්/යාවත්කාලීන කිරීම් හෝ lease මෙහෙයුම්;
- backend-නිර්පේක්ෂ පිටුකරණය, අනුපිළිවෙළ සැකසීම, සහ සීමා දෝෂ.

Backend සෞඛ්යය, සූදානම, සහ migration සම්බන්ධීකරණය එක් එක් වසම් repository වෙත නොව අභ්යන්තර backend/මෙහෙයුම්
ගිවිසුමට අයත් වේ.

ගෙනයා හැකි repository එකක් පහත දෑ නිරාවරණය නොකළ යුතුය:

- `prepare`, `get`, `all`, `run`, හෝ අමු driver handle;
- `PRAGMA`, WAL checkpoint ක්රම, `VACUUM`, හෝ පිටු/cache සුසර කිරීම;
- SQLite ගොනු මාර්ග, සහායක ගොනු, හෝ ගොනු-පිටපත් උපස්ථකරණය;
- හරස්-backend වසම් ගිවිසුමක් ලෙස `lastInsertRowid`;
- FTS5 හෝ `sqlite-vec` වාක්ය ඛණ්ඩ;
- සාමාන්ය ව්යාපාරික කේතය භාවිත කරන පොදු dialect ගැලවීමේ මාර්ගයක්.

### Backend හැකියා අතුරුමුහුණත

Backend-විශේෂිත හැසිරීම පැහැදිලිව සහ සොයාගත හැකි ලෙස පවතී. SQLite සඳහා පමණක් වන නඩත්තුව එහිම ක්රියාත්මක කිරීම සහ මෙහෙයුම් අතුරුමුහුණත පිටුපස
පවතින අතර, එයට පහත දෑ ඇතුළත් වේ:

- runtime driver තේරීම;
- WAL checkpoint සහ SQLite වසා දැමීමේ හැසිරීම;
- පිටු-ප්රමාණය, cache-ප්රමාණය, සහ ස්වයං-vacuum සැකසුම්;
- දත්ත සමුදා-ගොනු උපස්ථකරණය, ප්රතිෂ්ඨාපනය, සහ ප්රතිසාධනය;
- SQLite schema අභ්යන්තර පරීක්ෂාව;
- FTS5 සහ `sqlite-vec` ඒකාබද්ධ කිරීම.

එම විශේෂාංග අනුකරණය කිරීම බාහිර backend එකකට අවශ්ය නොවේ. Repository විසින් ගෙනයා හැකි
හැකියාවක් භාවිත කළ යුතුය, ලේඛනගත කළ හැසිරීම් සහිත backend-විශේෂිත ක්රියාත්මක කිරීමක් සැපයිය යුතුය, නැතහොත්
හැකියාව ලබාගත නොහැකි බව වාර්තා කළ යුතුය.

## ගනුදෙනු සහ සංක්රමණ ආකෘතිය

Repository API මගින් පරමාණුක ව්යාපාරික මෙහෙයුම නිර්වචනය කරයි; කැඳවුම්කරුවන් SQL ගනුදෙනු ආකාරයක් තෝරා නොගනී.
සෑම මෙහෙයුමක්ම එහි නිරීක්ෂණය කළ හැකි සමගාමීත්ව සහතික නිර්වචනය කළ යුතුය: ආරක්ෂිත අපරිවර්තක, ගැටුම්
හඳුනාගැනීම, නැවත උත්සාහ වර්ගීකරණය, idempotency අපේක්ෂා සහ ගනුදෙනු-සන්දර්භ ප්රචාරණය.
එම නිරීක්ෂණය කළ හැකි සහතික සමානව පවතින විට පමණක් ක්රියාත්මක කිරීම්වලට වෙනස් ගනුදෙනු සහ හුදකලාකරණ යාන්ත්රණ
භාවිත කළ හැක. මෙහෙයුමේ ගිවිසුම සපුරාලන අවස්ථාවලදී SQLite හට එහි වත්මන් කල්දැමූ හෝ ක්ෂණික
ගනුදෙනු හැසිරීම අභ්යන්තරව දිගටම භාවිත කළ හැක.

යෙදුම් අනුරූ කිහිපයක් එකම schema වෙනස්කම සඳහා තරග කිරීම වැළැක්වීමට බාහිර backend සඳහා පැහැදිලි සංක්රමණ හිමිකාරිත්වයක් අවශ්ය වේ.
Backend සංක්රමණ ඉතිහාසයන්ට තාර්කික සන්ධිස්ථාන හවුලේ භාවිත කළ හැකි නමුත්, SQLite SQL
ගොනු වෙනත් dialect එකකට අතේ ගෙන යා හැකි හෝ නැවත භාවිත කළ හැකි යැයි නොසැලකේ.

## Backend අතර අනුකූලතා අර්ථවිචාර

අනුකූලතා පරීක්ෂණ මගින් repository ක්රමවල signatures පමණක් නොව හැසිරීමද ආවරණය කළ යුතුය. සංක්රමණය කළ සෑම domain එකක්ම
පහත කරුණු නිර්වචනය කර සත්යාපනය කළ යුතුය:

- timestamp කාල කලාපය, නිරවද්යතාව සහ serialization;
- `NULL` අනුපිළිවෙළ, collation සහ අක්ෂර ප්රමාණ සංවේදීතාව පිළිබඳ අපේක්ෂා;
- JSON නිරූපණය සහ සැසඳීමේ හැසිරීම;
- පූර්ණ සංඛ්යා, දශම සහ මූල්ය නිරවද්යතාව;
- pagination සඳහා ස්ථාවර අනුපිළිවෙළ සහ නියතිවාදී සම-අග බිඳීම්;
- SQLite row ID මත රඳා නොපවතින ID ජනනය;
- uniqueness සහ foreign-key උල්ලංඝන වර්ගීකරණය;
- no-op, compare/update සහ delete මෙහෙයුම් සඳහා බලපෑමට ලක් වූ පේළිවල හැසිරීම;
- සමගාමී ලිවීම්වල ප්රතිඵල, නැවත උත්සාහ කළ හැකි ගැටුම් සහ idempotent නැවත උත්සාහ.

domain එකකට සමාන නිරීක්ෂණය කළ හැකි අර්ථවිචාර ප්රකාශ කළ නොහැකි නම්, එය තවමත් අතේ ගෙන යා හැකි නොවන අතර එම ගිවිසුම සැලසුම් කරන තෙක්
backend-විශේෂිතව පැවතිය යුතුය.

## අනුකූලතා අවශ්යතා

මෙම ADR අනුගමනය කරන ඕනෑම ක්රියාත්මක කිරීමක් පහත ගුණාංග සුරැකිය යුතුය:

- SQLite ශූන්ය-වින්යාස පෙරනිමිය ලෙස පවතී.
- පවතින SQLite ගොනු සහ සංක්රමණ ඉතිහාසය දිගටම කියවිය හැකිව පවතී.
- npm, Electron, Docker සහ සීමා කළ-runtime SQLite fallback ඒවායේ වත්මන් ආරම්භක මාර්ගය රඳවා ගනී.
- ගබඩා කළ provider අක්තපත්ර පවතින යෙදුම් encryption හැසිරීම දිගටම භාවිත කරයි.
- repository සංක්රමණයක් routing, quota, API-key හෝ audit අර්ථවිචාර නිහඬව වෙනස් නොකරයි.
- උපස්ථ සහ ප්රතිසාධන හැසිරීම සාර්වත්ර ලෙස ඉදිරිපත් කිරීම වෙනුවට එක් එක් backend සඳහා ලේඛනගත කරයි.
- පිරිසිදු SQLite-පමණක් ස්ථාපනයක් බාහිර database driver එකක් load කිරීම හෝ අවශ්ය කිරීම නොකරයි.

## බෙදාහැරීමේ අනුපිළිවෙළ

1. ප්රතිනිෂ්පාදනය කළ හැකි SQLite සම්බන්ධතා ඉන්වෙන්ටරියක් වෙනම සමාලෝචන කෘතියක් ලෙස ප්රකාශයට පත් කරන්න.
2. පළමු domain repository ගිවිසුම් සහ අනුකූලතා පරීක්ෂණ හඳුන්වා දෙන්න.
3. පෙරනිමි වෙනස් නොකර පවතින SQLite ක්රියාත්මක කිරීම එම ගිවිසුම් පිටුපසට අනුවර්තනය කරන්න.
4. නඩත්තුකරුවන්ගේ අනුමැතියට යටත්ව, එක් සීමා කළ control-plane කොටසක් සඳහා පළමු බාහිර ක්රියාත්මක කිරීම ලෙස PostgreSQL එක්
   කරන්න.
5. සමගාමී-ලිවීම් සහ සංක්රමණ-හිමිකාරිත්ව පරීක්ෂණ පවතින පසු පමණක් හවුල් තත්ත්වය පුළුල් කරන්න.
6. database මාරු කිරීම ප්රචාරණය කිරීමට පෙර offline, වලංගු කළ SQLite-to-external සංක්රමණ මාර්ගයක් එක් කරන්න.
7. තහවුරු කළ repository සහ backend ගිවිසුම් මත MySQL එක් කරන්න.

සෑම runtime පියවරක්ම වෙනම, සමාලෝචනය කළ හැකි PR එකකි. පසු පියවරක්, පෙර පියවරක ඔප්පු නොකළ abstraction එකක් merge කිරීම සාධාරණීකරණය කිරීමට භාවිත නොකළ යුතුය.

## පළමු ක්රියාත්මක කිරීමේ කොටස

සම්බන්ධතා ඉන්වෙන්ටරිය සමාලෝචනය කිරීමෙන් පසු පළමු runtime කොටස තෝරාගත යුතුය. Provider
සම්බන්ධතා, API keys, combos, සහ routing වින්යාසය සඳහා පාදක වගු
`src/lib/db/core.ts` තුළ පෙනෙන බැවින් ඒවා අපේක්ෂකයන් වේ, නමුත් මෙම ADR මඟින් වගු ලැයිස්තුවක් හෝ migration PR එකක් අනුමත නොකරයි.
මෙම කොටසට පහත දෑ ඇතුළත් විය යුතුය:

- SQLite හැසිරීම සුරැකීමේ පරීක්ෂණ;
- repository අනුකූලතා පරීක්ෂණ;
- පැහැදිලි transaction සීමා;
- ගබඩා කළ අක්තපත්ර සඳහා encryption සහ redaction සත්යාපනය;
- පෙරනිමි startup වින්යාසයට කිසිදු වෙනසක් නොකිරීම.

## සලකා බැලූ විකල්ප

### `SqliteAdapter` යටතට PostgreSQL එක් කිරීම

ප්රතික්ෂේප කරන ලදී. `SqliteAdapter` යනු SQLite runtimes සඳහා වන අනුකූලතා ස්තරයක් වන අතර SQLite-විශේෂිත
මෙහෙයුම් නිරාවරණය කරයි. එම මතුපිට අනුකරණය කිරීමෙන් synchronous සහ dialect-විශේෂිත උපකල්පන
නව backend එකකට කාන්දු වනු ඇත.

### සියලු domains වෙත generic query/execute API එකක් නිරාවරණය කිරීම

ප්රධාන සීමාව ලෙස ප්රතික්ෂේප කරන ලදී. එය connection හැසිරවීම මධ්යගත කරන නමුත් SQL dialect,
transaction, සහ table සම්බන්ධතා business modules තුළ ඉතිරි කරයි. පහළ මට්ටමේ backend primitive එකක්
repository ක්රියාත්මක කිරීම් තුළ පැවතිය හැකි නමුත්, යෙදුමට මුහුණ දෙන persistence API එක ලෙස නොවේ.

### එක් කොටසක් සත්යාපනය කිරීමට පෙර සියලු persistence නැවත ලිවීම

ප්රතික්ෂේප කරන ලදී. වත්මන් persistence මතුපිට පුළුල් වන අතර file lifecycle, recovery, search,
සහ මෙහෙයුම් සැකසුම් ඇතුළත් වේ. සිරස් කොටස් මඟින් සමාලෝචනය කළ හැකි හැසිරීම් සහ rollback සීමා සපයයි.

### SQLite පෙරනිමිය ලෙස භාවිත කිරීම නවතා දැමීම

ප්රතික්ෂේප කරන ලදී. Embedded සහ desktop deployments වත්මන් zero-service startup ආකෘතිය මත රඳා පවතී.
බාහිර backend එකක් opt-in වේ.

### Redis කල්පවත්නා අධිකාරිය ලෙස භාවිත කිරීම

ප්රතික්ෂේප කරන ලදී. Redis පැහැදිලිවම තාවකාලික coordination, cache, හෝ counters සඳහා සහාය විය හැකි නමුත්,
මෙහි විස්තර කර ඇති කල්පවත්නා repository contract එක ප්රතිස්ථාපනය නොකරයි.

## ප්රතිවිපාක

### ධනාත්මක

- Business code එකට database dialect එකෙන් ස්වාධීන ස්ථාවර persistence සීමාවක් ලැබේ.
- බාහිර backend එකක් abstraction එක නිර්වචනය කිරීමට පෙර SQLite හැසිරීම පරීක්ෂා කෙරේ.
- PostgreSQL සහ MySQL domain logic අනුපිටපත් කිරීම වෙනුවට contracts සහ tests බෙදාගනී.
- SQLite-පමණක් වන හැකියාවන් කාන්දු වන compatibility shims බවට පත් නොවී ප්රථම පන්තියේම පවතී.
- Multi-replica migration සහ transaction හැසිරීම පැහැදිලි සැලසුම් සලකා බැලීමක් බවට පත් වේ.

### පිරිවැය සහ අවදානම්

- Repository වෙන් කර ගැනීම සඳහා call sites ක්රමිකව සංක්රමණය කිරීම අවශ්ය වේ.
- Async සීමා දැනට synchronous වන service code හරහා පැතිර යා හැක.
- Cross-backend semantics සඳහා SQL syntax අනුකූලතාවයෙන් ඔබ්බට ගිය conformance tests අවශ්ය වේ.
- Backup, search, vector storage, සහ maintenance හැකියාවට විශේෂිතව පවතී.
- Persistence ක්රියාත්මක කිරීම් එකකට වඩා ධාවනය කිරීමෙන් CI සහ මෙහෙයුම් සහාය පිරිවැය ඉහළ යයි.

## අරමුණු නොවන දෑ

මෙම ADR මඟින් පහත දෑ සිදු නොකරයි:

- database dependency එකක්, environment variable එකක්, schema එකක්, හෝ migration එකක් එක් කිරීම;
- සජීවී SQLite singleton එක හෝ driver cascade එක වෙනස් කිරීම;
- නිශ්චිත release එකක PostgreSQL හෝ MySQL සහාය ලබා දෙන බවට පොරොන්දු වීම;
- FTS5, `sqlite-vec`, backup files, හෝ SQLite maintenance අතේ ගෙන යා හැකි කිරීම;
- shared-state සහ coordination tests පැවතීමට පෙර active-active සූදානම නිර්වචනය කිරීම;
- `src/lib/db/` එක එකවර නැවත ලිවීමක් අනුමත කිරීම.

## නඩත්තුකරුගේ අනුමැතිය සඳහා විවෘත ප්රශ්න

1. repository එක සහ අභ්යන්තර async backend සීමාව වඩාත් සුදුසු දිශාවද, නැතහොත්
   බාහිර persistence එක වෙනම control-plane service එකක් පිටුපස තිබිය යුතුද?
2. SQLite අනුකූලතාවයෙන් පසු පළමු බාහිර ක්රියාත්මක කිරීම ලෙස PostgreSQL පිළිගත හැකිද?
3. පළමු සීමාකළ repository කොටස විය යුත්තේ කුමන domain එකද?
4. පළමු multi-replica milestone එක සඳහා බෙදාගත යුතු state එක කුමක්ද, සහ node-local ලෙස පවතින්නේ කුමක්ද?
5. අතරමඟ නතර කළ හෝ ආපසු හැරවූ repository migration එකක් සඳහා අවශ්ය compatibility window එක කුමක්ද?

මෙම ප්රශ්න විසඳන තුරු, මෙම ලේඛනය යෝජනාවක් වන අතර runtime refactor කිරීමක් අදහස් නොකෙරේ.
