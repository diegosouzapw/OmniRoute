# Release-Green: keeping the queue and release branch green (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ይህ የሚፈታው ችግር

**ሙሉው ጌት** (`.github/workflows/ci.yml` — unit shards፣ vitest፣ ratchets፣
`package-artifact`፣ SonarQube፣ E2E) የሚሰራው **በrelease PR ላይ ብቻ** (PR → `main`) ነው።
`release/**`ን ዒላማ ያደረጉ PRዎች **fast-gates**ን (`quality.yml`፦ TIA-ተጽዕኖ ያረፈባቸው
ሙከራዎች + typecheck + lint) እና፣ ለኮድ ለውጦች፣ **አማካሪ** production buildን
ያገኛሉ። ውጤቱ፦ በrelease ላይ ብቻ የሚከሰቱ አለመሳካቶች በrelease ቅርንጫፍ ላይ በዝምታ
መከማቸታቸውን ሊቀጥሉ እና በrelease ጊዜ **እያንዳንዳቸው በ~40 ደቂቃ የሚፈጁ ደረጃዎች**
ሆነው ሊፈነዱ ይችላሉ።

የ"release-green family" ዓላማ እነዚያን አለመሳካቶች **አስቀድሞ መተንበይ** ነው —
ከሙሉው ጌት ጋር ተመጣጣኝ የሆነውን **በአካባቢያዊ ሁኔታ / ከrelease ውጭ**፣
በማንኛውም ጊዜ ማረጋገጥ፣ በዚህም release PR በመጀመሪያው CI አሂዶቱ አረንጓዴ
እንዲሆን ማድረግ ነው።

> **ለድርድር የማይቀርብ መርህ፦** ከዚህ ውስጥ ምንም ነገር አስተዋጽዖ አበርካቹን
> አያግድም። PRቸው እንዲወድቅ የሚያደርግ አስገዳጅ check አንጨምርም። **drift**ው
> (ratchets) በrelease ጊዜ ጠባቂው rebaseline እንዲያደርገው ነው — በፍጹም
> የአስተዋጽዖ አበርካቹ ጉዳይ አይደለም። የትኛውም ክፍል PRን **አይዘጋም**
> (የእውቅና ስርቆት)፣ እንዲያልፍም ሙከራን **አያዳክምም**።

## ስብስቡ (4 ክፍሎች) — እያንዳንዱም እንዴት ለብቻው እንደሚሰራ

| ክፍል                                                                        | ምንነቱ                                                         | መቼ እንደሚሰራ                                            | ወሰን                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- | -------------------------- |
| **`/green-prs`** (Solution A)                                              | ጠባቂው **የክፍት PRዎች ወረፋ** ላይ በፍላጎት የሚያካሂደው ቅኝት                  | **ለብቻው፣ በየጊዜው** — በተለይም ከ`/generate-release` **በፊት** | ሙሉው የPR ወረፋ → `release/**` |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | የማረጋገጫ ሞተር፦ ሙሉውን ጌት በአንድ ቅርንጫፍ ወይም በmerge እጩ ላይ እንደገና ያከናውናል | ለብቻው፣ በማንኛውም ጊዜ                                      | የተወሰነ ቅርንጫፍ ወይም merge-PR   |
| **`/babysit <PR#>`**                                                       | የ**አንድ** PRን **ቀጥታ CI** ወደ አረንጓዴ ያደርሳል                       | ለብቻው፣ ለእያንዳንዱ PR                                     | አንድ PR                     |
| **`nightly-release-green.yml`** (Solution D)                               | ራስ-ሰር የሆነ የማታ workflow፤ HARD red ሲኖር issue ይከፍታል             | ራስ-ሰር (cron)                                         | ንቁው release ቅርንጫፍ          |

**ለ"ይህ ለreleaseዎች ብቻ ነው?" አጭር መልስ፦** **አይደለም።** `/green-prs` የተነደፈው
**በየጊዜው፣ በreleaseዎች መካከል** እንዲሰራ ነው። ለብቻው ማስኬድ መደበኛው አጠቃቀም
ነው — release ማለት እሱን ማስኬድ ከፍተኛውን ዋጋ የሚሰጥበት ጊዜ ብቻ ነው።

## ከPR-ወደ-release የምክር ግንባታ

`quality.yml` አሁን draft ላልሆኑ የኮድ PR-ዎች እና የMergify ወረፋ ቅርንጫፎች `Build (advisory)`ን ያካትታል።
በ`ci.yml` ውስጥ ያለውን የproduction ግንባታ አሠራር ይደግማል፦ Node 24፣ `npm-ci-retry`፣
`check:node-runtime`፣ እና `OMNIROUTE_USE_TURBOPACK=1`ን በመጠቀም `npm run build`። በዚህ workflow ውስጥ ከዚያ በኋላ ያለ ምንም quality job የግንባታ artifact ስለማይጠቀም፣ ሆን ብሎ የግንባታ artifact አይሰቅልም።
ምልክቱ ከPR-ወደ-release የሚያግድ gate እንዲሆን፣ አንድ ሳምንት የተረጋጋ የrelease-PR ሂደት ካለፈ በኋላ `continue-on-error`ን ያስወግዱ።

## መፍትሔ C — `npm run check:release-green` (ሞተሩ)

ከአሁኑ working tree ጋር የrelease ደረጃን የሚያክል validation ይደግማል፣ እና እያንዳንዱን ቀይ ሁኔታ ይመድባል፦

- **HARD** (typecheck፣ lint errors፣ unit፣ vitest፣ db-rules፣ public-creds፣ አማራጭ
  `package-artifact`) → **እውነተኛ ጉድለት**፤ `exit 1`። በsource branch ላይ ይስተካከላል (TDD፣ Rule #18)።
- **DRIFT** (eslint **warnings**፣ cognitive-complexity፣ file-size) → በዑደቱ ውስጥ የተከማቸ ratchet drift ነው፣ **የአስተዋጽዖ አድራጊው ጥፋት አይደለም**፤ የሚደረገው ሪፖርት ማድረግ ብቻ ሲሆን፣ **በrelease ወቅት በmaintainer እንደገና baseline ይደረጋል**። Drift **በፍጹም** exit codeን አይለውጥም — ስለዚህ ማንንም አያግድም።

```bash
npm run check:release-green                 # የአሁኑ branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # የተዋቀረ output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitestን ይዘላል (drift+typecheck+lint ብቻ)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifactን ያካትታል (ቀርፋፋ)
```

ምርመራ አድርጎ **ሪፖርት** ብቻ ያቀርባል (ራስ-ሰር ማስተካከያ የለም)። የfix-to-green ማቀናበሪያው
በ`/green-prs` እና `/review-prs` ውስጥ ይገኛል።

## መፍትሔ A — `/green-prs` (የወረፋ ቅኝት)

ሂደት (ማጠቃለያ — ዝርዝሩን በ`green-prs` skill ይመልከቱ)፦

1. ከንቁ release branch ጋር የሚነጻጸሩ ክፍት PR-ዎችን ወረፋ **ይመዝግቡ**።
2. እያንዳንዱን PR **ይመድቡ** (አዋጭ / ውድቅ ሊደረግ የሚገባ / የደራሲ እርምጃ የሚያስፈልገው) — ውድቅ ሊደረጉ የሚገባቸው/የደራሲ እርምጃ የሚያስፈልጋቸው **ሪፖርት ይደረጋሉ እንጂ አይዘጉም** (ደራሲው ይወስናል)።
3. ለእያንዳንዱ አዋጭ PR፣ በ**ተነጠለ worktree** (Rule #19) ውስጥ PR-ውን ወደ release tip ያምጡ እና
   `npm run check:release-green`ን ያስኪዱ፦
   - **HARD** → co-authorshipን በመጠቀም **በአስተዋጽዖ አድራጊው branch ላይ** ያስተካክሉ (የደራሲውን «Merged» ሁኔታ ይጠብቃል)፣
     ሁሉም HARD-ዎች እስኪወገዱ ድረስ እንደገና ያስኪዱ።
   - **DRIFT** → እንዳለ ይተዉት፤ በrelease ወቅት እንደገና baseline ይደረጋል።
4. የPR × (ፍርድ፣ HARD reds፣ ተስተካክሏል?፣ DRIFT፣ አሁን release-green ነው?) ሰንጠረዥ **ሪፖርት ያድርጉ**።

ወረፋውን merge ሳያደርግ **ማዘጋጀት** ይችላል፤ merge የሚያደርገው በግልጽ ሲጠየቅ ብቻ ነው — PRንም በፍጹም አይዘጋም።

## የሚመከር የጊዜ ሰሌዳ

- **`/green-prs`ን በየጊዜው ያስኪዱ** (ለምሳሌ፣ በየሳምንቱ) እና **ሁልጊዜ ከ
  `/generate-release` በፊት**።
- **`nightly-release-green.yml`ን** (መፍትሔ D) እንደ ቀጣይነት ያለው ምልክት ያቆዩ፦ HARD red issue ሲከፍት፣ ቅኝት ለማድረግ ጊዜው ነው።
- branchን ወይም የተወሰነ merge candidateን ለመፈተሽ **`/validate-release-green`ን** እንደ አስፈላጊነቱ ይጠቀሙ።
- አንድ የተወሰነ PR በቀጥታ CI ላይ ወደ green መድረስ ሲያስፈልገው **`/babysit <PR#>`ን** ይጠቀሙ።

## ከrelease ጋር ያለው ግንኙነት

- `/generate-release` validationን በ**Phase 0 (pre-flight)** ውስጥ ይጠራል፦ DRIFTን እንደገና baseline ያደርጋል፣ እና release PRን ከመክፈቱ በፊት
  HARDን ያስተካክላል።
- `/review-prs` በmerge ውሳኔ ደረጃ ላይ release-green gateን ይጠቀማል (ከmerge በፊት green)።

የሁሉም ክፍሎች ግብ አንድ ነው፦ በrelease ቀን በ40 ደቂቃ ንብርብሮች ውስጥ ቀይ ሁኔታዎችን ከመከታተል ይልቅ፣ **በመጀመሪያው CI run ላይ green የሆነ release PR**።
