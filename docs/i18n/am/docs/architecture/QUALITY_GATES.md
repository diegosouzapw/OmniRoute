# Quality Gates Reference (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ይህ ሰነድ በOmniRoute ውስጥ ላሉ ሁሉም የCI ጥራት መግቢያዎች ዋና ማጣቀሻ ነው።
እያንዳንዱን መግቢያ፣ ምን እንደሚያረጋግጥ፣ በየትኛው የCI ሥራ ውስጥ እንደሚሠራ፣
የratchet መነሻ መስመር ወይም የማለፍ/የመውደቅ ፖሊሲ ይጠቀም እንደሆነ፣ እንዲሁም ግንባታውን የሚያግድ ወይም የምክር ብቻ እንደሆነ ይገልጻል።

ለአጭር ማጠቃለያ እና ለፈቃድ ዝርዝር ፖሊሲው፣ በ`AGENTS.md` ውስጥ ያለውን "የጥራት መግቢያዎች እና Ratchets" ክፍል ይመልከቱ።
ለወሳኝ ግምገማው፣ ለብስለት ምደባው፣ እና ከመሣሪያ ነፃ ለሆነው
የተመሳሳይ ሥርዓት ድግግሞሽ ዕቅድ፣
[የጥራት መግቢያ መመሪያ](../ops/QUALITY_GATE_PLAYBOOK.md)ን ይመልከቱ።

---

## የጌቶች ዝርዝር (~90 ስክሪፕቶች)

ስክሪፕቶቹ በ`scripts/check/` (የፖሊሲ ጌቶች) እና በ`scripts/quality/` (የratchet ሞተር) ስር ይገኛሉ።
የCI ዋና የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የልቀት PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` ወደ `release/**` ያነጣጠሩ PRዎች ላይ ይሰራል። በዱካ የተጣሩ ፈጣን ጌቶችን በመጠቀም የአስተዋጽዖ አድራጊዎች ቅርንጫፎች እንዲቀጥሉ ያደርጋል፤ በተጨማሪም ለኮድ
ለውጦች አንድ የምክር ምርት-ግንባታ ምልክት ይሰጣል፦

| ሥራ                                               | ወሰን                                                                                                                                                                                   | አጋጅ                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `Build (advisory)`                               | ረቂቅ ያልሆኑ የኮድ PRዎች እና የMergify ወረፋ ቅርንጫፎች፤ Node 24፣ `npm-ci-retry`፣ `check:node-runtime`፣ `OMNIROUTE_USE_TURBOPACK=1` ያለው `npm run build`፤ ምንም የታችኛው የጥራት ሥራ ስለማይጠቀምበት artifact አይሰቀልም | **ምክር ሰጪ** (`continue-on-error: true`፤ ከአንድ ሳምንት የተረጋጋ የልቀት-PR ሂደቶች በኋላ ያስወግዱት) |
| `Docs Gates (fast-path)`                         | የሰነድ/ኮድ PRዎች፤ የAPI ሰነዶች ማጣቀሻዎች እና docs-all                                                                                                                                            | አዎ                                                                              |
| `Fast Quality Gates`                             | የኮድ PRዎች፤ የማይለወጡ ፍተሻዎች፣ typecheck፣ የdashboard typecheck፣ ተጽዕኖ ያረፈባቸው የunit ፈተናዎች                                                                                                      | አዎ                                                                              |
| `Forgotten sibling tests`                        | የኮድ PRዎች፤ የተቀየሩ ሞጁሎች ወደ የማይለወጡ ተጠቃሚዎች እና ዕጩ sibling ፈተናዎች ይከታተላሉ፤ የbarrel እና የdynamic-import ዱካዎች እንደ ምክር ሰጪ ምርመራዎች ይዘገባሉ፣ ከተጠቀሱ የallowlist ልዩ ሁኔታዎች ጋር                               | **ምክር ሰጪ**                                                                      |
| `Vitest (fast-path)`                             | የኮድ PRዎች፤ ፈጣን የvitest ስብስብ                                                                                                                                                            | አዎ                                                                              |
| `Unit Tests fast-path`                           | የኮድ PRዎች፤ ባለ4-shard የunit ስብስብ                                                                                                                                                        | አዎ                                                                              |
| `No new ESLint warnings`                         | የኮድ PRዎች፤ suppressionsን የሚያውቅ lint ጥበቃ                                                                                                                                                | ከራስ ምንጭ ለሆኑ አዎ፣ ለforks ምክር ሰጪ                                                   |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆኑ PRዎች፤ changelog እና የተፈጠሩ skill ማመሳሰል                                                                                                                                         | ከራስ ምንጭ ለሆኑ አዎ፣ ለforks ምክር ሰጪ                                                   |

#### የተረሱ sibling ፈተናዎች ሪፖርት

`npm run check:forgotten-sibling-tests` ከፈተና-ተጽዕኖ ካርታው ጀርባ ያለውን import resolver እንደገና ይጠቀማል።
ለእያንዳንዱ የተቀየረ የምርት ሞጁል፣ ዕጩው
ፈተና በpull-request diff ውስጥ ከሌለ የተወሰኑ
`changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ይዘግባል። የMarkdown ማጠቃለያው እና የJSON ውጤቱ ማንኛውም አጋጅ ማሰማራት ከመጀመሩ በፊት ለመለካት እንደ
`forgotten-sibling-tests` workflow artifact ይቀመጣሉ።

የBarrel re-exports እና dynamic imports የresolution ምርመራዎች ብቻ ናቸው፤ በፍጹም
አጋጅ ግኝት አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ ግቤት consumerን እና ዕጩ
ፈተናውን መጥቀስ፣ የተወሰነ ምክንያት መስጠት እና ወደ GitHub issue ወይም pull request ማገናኘት አለበት። በስህተት የተቀረጹ ግቤቶች
በዝግ ሁኔታ ይከሽፋሉ። ልዩ ሁኔታዎች የተሰረዘ ዕጩ ፈተናን ወይም `.skip`/`.todo` የሚጨምር diffን ማፈን አይችሉም፤
የassertion ማዳከም እና ሌሎች masking በተናጥል አጋጅ በሆነው
`check:test-masking` ጌት ስር ይቆያሉ።

### ሥራ፦ `lint`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሰራል። ከከሸፈ mergeን ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አጋጅ                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                   |
| `check:cycles`                    | ዑደታዊ ኢምፖርቶችን — ሁሉንም `src/` + `open-sse/` ሞጁሎች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                   |
| `check:route-validation:t06`      | በሁሉም ራውቶች ላይ የZod ስኪማዎች መኖራቸውን (Tier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                   |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከተመደበው ገደብ እንደማያልፍ (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                   |
| `check:provider-consistency`      | `providers.ts` ውስጥ ያለው እያንዳንዱ provider `providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒውም፣ በ allowlist ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                   |
| `check:model-lifecycle`           | በእጅ የሚያዙት ሦስቱ የ routing tables ከተመዘገበው lifecycle snapshot (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`)፣ `REGISTRY` ሊያስተላልፈው ለሚችለው ከአገልግሎት የወጣ id ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` target በ`REGISTRY` ውስጥ ይገኛል እና ከ retired-id snapshot ውስጥ የለም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ retired id ወደ ሌላ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እንዲሁም የ`DEFAULT_DEGRADATION_MAP` source ወይም target በዚያ snapshot ውስጥ retired ሆኖ አይታይም። ይህ፣ model በአሁኑ ጊዜ በቀጥታ በሚሰራ upstream እየቀረበ መሆኑን አያረጋግጥም። Offline — በእጅ እና በ`npm run quality:refresh-model-lifecycle` (network፤ ከCI ጋር አልተገናኘም) ከሚታደሰው `config/quality/model-lifecycle.json` ጋር ያነጻጽራል። `allowedRetiredInCatalog` ቀስ በቀስ የሚቀንስ ratchet ነው፦ ግቤት የሚጨመረው የመከታተያ issue ካለው ብቻ ነው። | አዎ                                   |
| `check:fetch-targets`             | በclient-side `src/` ውስጥ ያለው እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይዛመዳል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                   |
| `check:deps`                      | በrepo ውስጥ ባሉ ሁሉም `package.json` ፋይሎች ውስጥ በ`npm install` ሊጫኑ የሚችሉ deps በ`dependency-allowlist.json` ውስጥ ይገኛሉ፤ አዲስ ያልተሰኩ ወይም slopsquatted packages ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                   |
| `audit:deps`                      | `npm audit` (root + electron) — ከፍተኛ/ወሳኝ advisories የሉም (ከosv `check:vuln-ratchet` ጋር ይደራረባል፤ Rationalization Backlogን ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                   |
| `check:lockfile`                  | የ`package-lock.json` integrity — https registry፣ integrity hashes፣ የhost overrides የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                   |
| `check:licenses`                  | ለproduction dependencies የSPDX license የተፈቀዱ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                   |
| `check:tracked-artifacts`         | build artifacts / commit የተደረጉ `node_modules` symlinks አይኖሩም (በhusky pre-commit ውስጥም ይሰራል፤ pre-push ሆን ተብሎ ቀላል ተደርጓል — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                   |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest exclusion የtracking issue ስም ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይገኛል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                   |
| `check:file-size`                 | ምንም source file በextension የተወሰነውን ከፍተኛ መጠን አያልፍም (ratchet፦ የታገዱ ትልልቅ files በ`frozen` list ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                   |
| `check:error-helper`              | በexecutors/handlers ውስጥ ያሉ error responses `buildErrorBody()` / `sanitizeErrorMessage()` ይጠቀማሉ (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                   |
| `check:migration-numbering`       | Migration SQL files ያለ ክፍተት ወይም ድግግሞሽ በቅደም ተከተል ቁጥር ተሰጥቷቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                   |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase Web ቁልፎች የሉም (ጥብቅ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                   |
| `check:db-rules`                  | ከ`src/lib/db/` ሞጁሎች ውጭ ጥሬ SQL የለም፤ ከ`localDb.ts` የሚደረጉ barrel-imports የሉም (ጥብቅ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                   |
| `check:known-symbols`             | በdispatch ሰንጠረዦቻቸው ውስጥ የተመዘገቡ provider executors፣ routing strategies እና translators በዲስክ ላይ ካሉት ፋይሎች ጋር ይዛመዳሉ — ወላጅ-አልባ ወይም ያልታወጁ symbols የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                   |
| `check:route-guard-membership`    | child process የሚያስጀምር እያንዳንዱ route በ`isLocalOnlyPath()` ይመደባል (ጥብቅ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                   |
| `check:test-discovery`            | በrepo ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ test runner ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው የወላጅ-አልባ ፋይሎች ዝርዝር መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                   |
| `check:agent-skills-sync`         | የተመነጩ agent-skills artifacts ከምንጭ catalog ጋር ይዛመዳሉ (መዛባት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | የprovider አርማዎች/assets የተመዘገበ provenance entry አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | የJSON ውቅር ፋይሎች ያለችግር መተንተናቸውን እና የማከማቻውን lint ደንቦች ማሟላታቸውን ያረጋግጣል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | ያለስህተት የTypeScript ማጠናቀር (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                   |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊትን ያማከለ፤ ቀድሞ የነበሩ ብዙ የጥሪ ቦታዎች አሁንም ማብራሪያዎችን ይፈልጋሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **የምክር** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | ለ`src/app/(dashboard)/**` የተወሰነ `tsc` (#7033) — የ`typecheck:core` በጥንቃቄ የተመረጠው የ27 ፋይሎች የፈቃድ ዝርዝር ምንም የዳሽቦርድ TSX አያካትትም፣ እንዲሁም `next build` በፍጹም የአይነት ማረጋገጫ አያደርግለትም (`next.config.mjs` `ignoreBuildErrors: true` ያቀናብራል)፤ ስለዚህ በዚያ ያሉ የተገለሉ መለያ ማገገሚያዎች (#6625/#6909) ለCI የማይታዩ ነበሩ። ልዩነቶችን ከተወሰነ የእያንዳንዱ ፋይል/የእያንዳንዱ TS ኮድ ብዛት መነሻ (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የጊዜ ያለፈበትን የማስፈጸም ንድፍ) ጋር ያነጻጽራል — ከመነሻው ብዛት በላይ ያሉ አዲስ ስህተቶች ብቻ መግቢያውን ያሳንፋሉ፤ ቀድሞ የነበረ ስህተት ሲስተካከል በ`--update` መነሻውን ዝቅ ያድርጉ።                                                                                                                                                                                                  | አዎ                                   |

### ሥራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሰራል። ካልተሳካ ውህደትን ያግዳል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                           | አጋጅ                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json`ን ያወጣል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደው shard ሪፖርት የተገኘ ሽፋን)                                                   | አዎ (ከratchet በፊት የሚሰራ) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለው እያንዳንዱ መለኪያ ወደኋላ አለመሄዱን ያረጋግጣል (የESLint ማስጠንቀቂያዎች ≤ መነሻ፤ ሽፋን ≥ መነሻ)                               | አዎ                     |
| `check:duplication`          | የኮድ ድግግሞሽ (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው መነሻ አይበልጥም                                                                    | አዎ                     |
| `check:complexity`           | የፋይል ደረጃ የዙራዊ ውስብስብነት ከገደቡ አይበልጥም (ዋና ESLint `complexity` + `max-lines-per-function`)                                              | አዎ                     |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ratchet (`eslint-plugin-sonarjs`) — የተለየ የESLint ሂደት፤ CI ሁለቱንም አዋህዶ እንደ አንድ `check:complexity-ratchets` ደረጃ ያስኬዳል    | አዎ                     |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ ወደ ውጭ የሚላኩ ክፍሎች / ፋይሎች ratchet (knip) ከመነሻው አንጻር ወደኋላ አይሄድም                                                            | አዎ                     |
| `check:compression-budget`   | የመጭመቂያ መለኪያ በጀት — የእያንዳንዱ ሞተር ዝቅተኛ የቶከን ቁጠባ ወደኋላ መሄድ የለበትም                                                                         | አዎ                     |
| `check:type-coverage`        | በአይነት የተገለጸው መቶኛ ratchet (`type-coverage`) ወደኋላ አይሄድም፤ `typecheck:noimplicit:core`ን በአብዛኛው ይሸፍናል                                   | አዎ                     |
| `check:codeql-ratchet`       | ክፍት የCodeQL ማንቂያዎች ብዛት ወደኋላ አይሄድም (በ`gh api` ያነባል፤ ቶከን ከሌለ በአግባቡ ይዘላል) — የማደሻ ድግግሞሽ እና በእጅ ማስጀመሪያ፦ ከታች ያለውን "CodeQL ratchet" ይመልከቱ | አዎ                     |

### ሥራ፦ `quality-extended`

መላው ሥራ የምክር ደረጃ ነው (`continue-on-error: true`)። በ-npm ላይ የተመሠረቱ የደረጃ መቆጣጠሪያዎች በተጨባጭ ይሰራሉ፤ ውጫዊ ስካነሮቹ በ`gh release download` በኩል ይጫናሉ፣ እና ባይነሪው አሁንም ከሌለ ራሳቸውን ይዘላሉ (በ0 ይወጣሉ)።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                        | አጋጅ        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:circular-deps`    | ዑደታዊ ጥገኛነቶች አለመኖራቸውን (dpdm)                                                                                                                     | **ምክር ሰጪ** |
| `check:bundle-size`      | የጥቅሉ መጠን ከተቀመጠው ከፍተኛ ገደብ እንደማያልፍ                                                                                                                | **ምክር ሰጪ** |
| `check:secrets`          | የሚስጥር መረጃ ቅኝት (gitleaks) — ባይነሪው ከሌለ ይዘለላል                                                                                                      | **ምክር ሰጪ** |
| `check:vuln-ratchet`     | የጥገኛ ጥቅሎች ተጋላጭነቶች (osv-scanner) እንዳይባባሱ — ባይነሪው ከሌለ ይዘለላል                                                                                       | **ምክር ሰጪ** |
| `check:workflows`        | የየሥራ ፍሰት ቅርጸት ምርመራ (actionlint + zizmor) — ባይነሪዎቹ ከሌሉ ይዘለላል                                                                                     | **ምክር ሰጪ** |
| `check:openapi-breaking` | የሕዝባዊ API ውል (`openapi.yaml`) ከመሠረታዊው ቅርንጫፍ (oasdiff) ጋር ሲነጻጸር ሰባሪ ለውጦች — `openapiBreaking=N` ያወጣል፤ oasdiff ከሌለ ወይም የመሠረቱ ዝርዝር መፍታት ካልተቻለ ይዘለላል | **ምክር ሰጪ** |

### ሥራ፦ `docs-sync-strict`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሰራል። ካልተሳካ ውህደትን ያግዳል።

| ስክሪፕት                          | የሚያረጋግጠው                                                                                                                                  | አጋጅ                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ መግቢያዎች በቅደም ተከተል የሚያስኬድ ዋና መግቢያ                                                                                            | አዎ                           |
| ↳ `check:docs-sync`            | የCHANGELOG / OpenAPI / llm.txt ስሪት ወጥነት                                                                                                   | አዎ                           |
| ↳ `check:docs-counts`          | በጽሑፍ ውስጥ ያሉ ቁጥሮች (የአቅራቢዎች ብዛት፣ የፍልሰት ብዛት፣ ወዘተ) ከእውነተኛዎቹ ቁጥሮች የደረጃ መቆጣጠሪያ ክልል ውስጥ መሆናቸውን                                                   | አዎ                           |
| ↳ `check:env-doc-sync`         | በ`.env.example` ውስጥ ያለ እያንዳንዱ የአካባቢ ተለዋዋጭ በሰነዶች ሰንጠረዥ ውስጥ መመዝገቡን፣ እና በተቃራኒውም                                                              | አዎ                           |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ የተቋረጡ የስሪት ሕብረቁምፊዎች አለመኖራቸውን                                                                                                    | አዎ                           |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ ውስጣዊ የmarkdown አገናኞች ወደ እውነተኛ ፋይሎች መፍታታቸውን (`[text]`/`(path)` ቅርጽ)                                                           | አዎ                           |
| ↳ `check:fabricated-docs`      | በሰነዶች ውስጥ የተጠቀሱ መስመሮች፣ የአካባቢ ተለዋዋጮች፣ የCLI ትዕዛዞች፣ የhook ስሞች እና የፋይል ዱካዎች በኮድ መዝገቡ ውስጥ መኖራቸውን። በ`--strict` በኩል ጥብቅ መግቢያ፤ ያለ ጠቋሚው ለስላሳ ውድቀት። | አዎ (በCI ውስጥ በ`--strict` በኩል) |
| `check:cli-i18n`               | የCLI ትዕዛዝ ሕብረቁምፊዎች በሁሉም የi18n አካባቢ ፋይሎች ውስጥ መኖራቸውን                                                                                        | አዎ                           |
| `check:openapi-coverage`       | የOpenAPI ዝርዝር ቢያንስ በደረጃ መቆጣጠሪያው የተወሰነውን ዝቅተኛ የእውነተኛ መስመሮች ሽፋን መሸፈኑን                                                                       | አዎ                           |
| `check:openapi-security-tiers` | በ`openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማብራሪያዎች ከ`routeGuard.ts` ምደባዎች ጋር ወጥነት እንዳላቸው                                                           | **ምክር ሰጪ**                   |
| `check:openapi-routes`         | በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ ዱካ ወደ እውነተኛ `route.ts` መፍታቱን (የተፈበረከ መረጃን ለመከላከል)                                                           | አዎ                           |
| `check:docs-symbols`           | በ`docs/**/*.md` ውስጥ ያለ እያንዳንዱ `/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` መፍታቱን (የተፈበረከ መረጃን ለመከላከል)                                              | አዎ                           |
| `i18n translation drift`       | በi18n አካባቢ ፋይሎች ውስጥ ያልተተረጎሙ ቁልፎች — ማስጠንቀቂያ ብቻ                                                                                             | **ምክር ሰጪ**                   |

### ሥራ፦ `i18n-ui-coverage`

| ስክሪፕት                               | የሚያረጋግጠው                                                                                                                                                 | አጋጅ      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` (ውስጠ-መስመር) | የUI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                                | አዎ       |
| `check-ui-value-drift` (ውስጠ-መስመር)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ያረጀ ትርጉም እንደማይተው                                                                                                              | አዎ       |
| `check-new-key-coverage` (ውስጠ-መስመር) | **አዲስ** የእንግሊዝኛ ቁልፍ በእያንዳንዱ locale መተርጎሙን — የ`__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                               | አዎ       |
| `check-translation-ratio`           | በእያንዳንዱ locale ያለው የእውነተኛ ትርጉም ምጣኔ (ከእንግሊዝኛው ጋር ተመሳሳይ / ቦታ ያዥ / ከፈቃድ ዝርዝሩ ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + ትርፍን ማለፍ የለበትም | **አማካሪ** |

`fetch-depth: 0` ያስፈልገዋል — የvalue-drift መግቢያው `en.json`ን ከmerge base ጋር diff ያደርጋል።

#### `check-ui-value-drift` — ያረጀ-ትርጉም መግቢያ

ሌሎቹ መግቢያዎች በመዋቅራዊ ሁኔታ ሊያዩት የማይችሉትን አንድ የi18n ወደኋላ-መመለስ ይይዛል፦ አንድ የእንግሊዝኛ እሴት
እንደገና ሲጻፍ፣ ከ_ቀድሞው_ እንግሊዝኛ የተወሰዱት ትርጉሞች ሳይቀየሩ ይቀራሉ፤ ስለዚህ
እንግሊዝኛ ያልሆኑ ተጠቃሚዎች በእርግጠኝነት የተጻፈ፣ አሁን ግን የተሳሳተ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእውነት ወደ ምርት ተልኳል። የAntigravity
የመግቢያ አጋዥ ሲጨመር (#5203) `oauthModal.googleOAuthWarning` እንደገና ተጽፏል፤ **ከ43 locales 39ኙ**
ኦፕሬተሮችን «ሙሉውን URL ቅዳና ከታች ለጥፍ» የሚል ጽሑፍ እንዲያነቡ አድርገው ቀሩ — ለዚያ provider ሊጠናቀቅ የማይችል ፍሰት ነው። ይህ
እስከ #8463 ድረስ ሳይስተዋል የቀረው፦

- `sync-ui-keys` የሚሞላው **የሌሉ** ቁልፎችን ብቻ እንጂ **ያረጁትን** ፈጽሞ አይደለም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ስለሚቆጥር፣ ያረጀ ትርጉም እንደተሸፈነ ይቆጠራል፤
- `check-translation-drift` የ`docs/i18n/<locale>/**.md` ሰነድ መስተዋቶችን ይከታተላል —
  `src/i18n/messages/*.json`ን ፈጽሞ አያነብም። ከ2026-09 ዳግም-ማመሳሰል ጀምሮ በjob `docs-sync-strict` ውስጥ አጋጅ ነው፦ ዋና ሰነድን ያርትዑ → `npm run i18n:run -- --files=<doc>` (በክፍል ደረጃ፣ ዝቅተኛ ወጪ)።

**Diffን የሚያገናዝብ እንጂ baselineን የተመሠረተ አይደለም።** በmerge base ላይ ያለውን `en.json` ከworking tree ጋር ያወዳድራል፤
የእንግሊዝኛ እሴቱ ለተቀየረበት ለእያንዳንዱ ቁልፍ፣ ሳይነካ የቀረ ትርጉም የያዘ ማንኛውም locale
ያረጀ ነው። ይህ ሆን ብሎ **ከዚህ በፊት የነበረውን እዳ ያስቀራል** — አንድ diff ለረጅም ጊዜ የኖረ ትርጉም
ከየትኛው የድሮ እንግሊዝኛ እንደመጣ ሊገልጽ ስለማይችል፣ መግቢያው የሚመዝነው
የአሁኑ ለውጥ የነካውን ብቻ ነው። አማራጩ (ለእያንዳንዱ ቁልፍ hash baseline) ~600 KB የሚያህል የሚመነጭ ፋይል፣
ከነባር ትልቁ baseline 3× የሚበልጥ፣ እና በእያንዳንዱ i18n PR የሚቀያየር ይሆናል።

እሱን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተጎዱትን ትርጉሞች ያዘምኑ፣ ወይም
2. ወደ `__MISSING__:<new english>` ያቀናብሯቸው — runtime ከዚያ ትክክለኛውን እንግሊዝኛ
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ያቀርባል፣ ቁልፉም ለትርጉም ወረፋ ይይዛል።

የሕብረቁምፊው **ትርጉም** ከተቀየረ፣ **ቁልፉን እንደገና መሰየምን** ይምረጡ፦ አዲስ ቁልፍ
ያረጀ ትርጉም ሊወርስ አይችልም። #8463 የተጠቀመው ንድፍ ይህ ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያስኬደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የመሠረቱ catalog ሊነበብ በማይችልበት ጊዜ (base ref የሌለው shallow
clone) `check-openapi-breaking`ን በመከተል፣ `SKIP reason=base-unresolved` በማሳየት በ0 ይወጣል።

### Job፦ `i18n`

ሙሉ የi18n ማረጋገጫ matrix (ለእያንዳንዱ locale አንድ job)። መላው job አማካሪ ነው።

| ስክሪፕት                           | የሚያረጋግጠው                  | አጋጅ                                              |
| ------------------------------- | ------------------------- | ------------------------------------------------ |
| `validate_translation.py quick` | በእያንዳንዱ locale የትርጉም ሙሉነት | **አማካሪ** (`continue-on-error: true` በመላው job ላይ) |

### Job፦ `pr-test-policy`

በpull requests ላይ ብቻ ይሰራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                                | አጋጅ |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | በ`src/`፣ `open-sse/`፣ `electron/`፣ ወይም `bin/` ውስጥ ያለ production code የሚቀይሩ PRዎች ፈተናዎችን ማካተት ወይም ማዘመን አለባቸው (ጥብቅ ደንብ #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የፈተና ፋይሎች ጠቅላላ የassert ብዛትን እንደማይቀንሱ ወይም የ`assert.ok(true)` tautologies እንደማይጨምሩ                                  | አዎ  |
| `check:pr-evidence`    | የPR body ለለውጡ የtest/VPS ማስረጃ መጥቀሱን (የPR ጽሑፍን grep በማድረግ ጥብቅ ደንብ #18ን በራስ-ሰር ያስፈጽማል — ተሰባሪ ነው፣ Backlogን ይመልከቱ)           | አዎ  |

### Job፦ `test-vitest`

ከ`build` በኋላ ይሰራል። ካልተሳካ mergeን ያግዳል።

| ስብስብ             | የሚያረጋግጠው                                              | አጋጅ                                                                                 |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሣሪያዎች)፣ autoCombo፣ መሸጎጫ — vitest አስኬጅ | አዎ                                                                                  |
| `test:vitest:ui` | የUI ክፍል ሙከራዎች — vitest አስኬጅ                           | **አጋጅ** — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዳዲስ ውድቀቶች ስራውን ያወድቃሉ |

### የምሽት የስራ ፍሰቶች (በጊዜ ሰሌዳ የሚከናወኑ፣ አማካሪ)

እነዚህ በcron የጊዜ ሰሌዳ (እና `workflow_dispatch`) ይሰራሉ፤ በPRዎች ላይ ፈጽሞ አይሰሩም። ሁሉም አማካሪ ናቸው።

| የስራ ፍሰት                | የሚያረጋግጠው                                                                                                                                     | አጋጅነት    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | የfast-check ባህሪ ሙከራዎች በዘፈቀደ ዘር + ከፍተኛ የአስኬጅ ብዛት                                                                                              | **አማካሪ** |
| `nightly-resilience`   | የheap ዕድገት መግቢያ፣ የብልሽት መርፌ ትርምስ፣ የk6 ጭነት/የረጅም ጊዜ ጭነት ሙከራ                                                                                     | **አማካሪ** |
| `nightly-llm-security` | የpromptfoo መርፌ መከላከያ (የማገድ ሁነታ) + የgarak መመርመሪያዎች (የአቅራቢ ምስጢር ከሌለ ይዘለላሉ)                                                                     | **አማካሪ** |
| `nightly-schemathesis` | `docs/openapi.yaml`ን በመጠቀም በቀጥታ በሚሰራ OmniRoute ላይ የOpenAPI ውል ፈዘዝ ሙከራ (schemathesis) — የዝርዝር መግለጫ ጥሰቶችን / ያልተያዙ 500 ስህተቶችን ያጋልጣል (ደረጃ 8 B.4) | **አማካሪ** |
| `nightly-mutation`     | በፈጣኑ የዩኒት መስመር ላይ የStryker ሚውቴሽን ሙከራ ውጤት — በሕይወት የሚተርፉ ሚውታንቶች ደካማ ማረጋገጫዎችን ያጋልጣሉ                                                             | **አማካሪ** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ላይ የNode ሞተር ተኳኋኝነት ማትሪክስ                                                                                         | **አማካሪ** |

---

## የፍጥነት ምዕራፍ (2026-08-30 → v4.0 LTS): እያንዳንዱ መነሻ መስፈርት በ20% ላላ

የባለቤቱ ውሳኔ (2026-08-30)፦ እስከ v4.0 ሞዱላራይዜሽን ድረስ፣ የቴክኒክ ዕዳውን ገደብ
ከመጠበቅ ይልቅ የማድረስ ፍጥነት የበለጠ አስፈላጊ ነው። እያንዳንዱ **ቁጥራዊ** የራቼት መነሻ መስፈርት
ኦዲት ሊደረግበት በሚችል አንድ ዙር በ20% ላልቷል፣ እና ምዕራፉ በ`config/quality/quality-baseline.json`
ውስጥ ታውጇል፦

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| የተለወጠው                                                                                                                                                                        | ቦታ                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ዝቅተኛ መሆን የሚሻላቸው ቆጠራዎች ×1.2፣ ከፍተኛ መሆን የሚሻላቸው መቶኛዎች ÷1.2 (የሽፋን ዝቅተኛ ወለል 60 እንዳለ ተጠብቋል፣ `eslintErrors` 0 ሆኖ ይቆያል፣ `eslintWarnings` 0 → ከተቀዘቀዘው የማፈኛ ቆጠራ 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` ማስታወሻ እያንዳንዱን ከበፊት → በኋላ ይዘረዝራል)                 |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`፣ `testCap`፣ እያንዳንዱ `frozen[*]` / `testFrozen[*]` የመስመር ገደብ ×1.2                                                                                                         | `file-size-baseline.json`                                                                              |
| የእያንዳንዱ ፋይል / የእያንዳንዱ TS ኮድ ቆጠራዎች ×1.2                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` በሚሆንበት ጊዜ `--require-tighten` አማካሪ ይሆናል                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| የሌሊቱ `bank-ratchet-shrinks` ባለበት ይቆማል (የተለካውን መቀነስ እንደ ክምችት በመመዝገብ ተጨማሪውን ክፍተት ይሽረው ነበር)                                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

የፈቃድ ዝርዝሮች (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) በጀቶች **አይደሉም** እና አልተነኩም። የማለፍ/የመውደቅ ፖሊሲ በሮች (ምስጢሮች፣ የSQL ደንቦች፣
የሰነዶች/አካባቢ ውል፣ የi18n እኩልነት፣ የዩኒት ሙከራዎች) አልተለወጡም — የወደቀ ሙከራ አሁንም የወደቀ ሙከራ ነው።

**መሣሪያዎች**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — የአንድ ጊዜ
  ማላላት (`scripts/quality/relax-baselines.mjs`)፤ በተመሳሳይ ማስታወሻ ሁለት ጊዜ መሄድን አይፈቅድም።
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI በሚለካበት መንገድ እያንዳንዱን ቁጥራዊ በር ይለካል እና ለእያንዳንዱ በር የቀረውን ክፍተት
  ያትማል (`scripts/quality/baseline-headroom.mjs`)። የሌሊቱ `baseline-headroom` ሥራ ሰንጠረዡን
  በቀጣይነት በሚዘመነው **📈 የመነሻ መስፈርት ክፍተት (የፍጥነት ምዕራፍ)** ጉዳይ ላይ ይለጥፋል፣ እና ማንኛውም በር
  ከገደቡ በ10% ውስጥ ከሆነ ወይም ገደቡን ካለፈ `headroom-alert` መለያን ያክላል። ይህ ጉዳይ
  የቅድሚያ ማስጠንቀቂያ ነው፦ በቀናት ውስጥ የሚሞላ በጀት ማለት ማላላቱን እየተጠቀመ ያለው
  መላው ቡድን ሳይሆን ጥቂት PRs ናቸው — የችግሩን በር `_rebaseline_*` ማስታወሻዎች ይመልከቱ።

**የአዲስ ኮድ ሁነታ (በምትጽፉበት ጊዜ ያጽዱ) — ከ2026-08-30 ጀምሮ፣ ለPR ፈጣን መንገድ ብቻ**

በ`pull_request` ክስተቶች ላይ `quality.yml` `--base-ref <PR base SHA>`ን ወደ `check:file-size`፣
`check:complexity-ratchets` እና `check:dead-code` ያስተላልፋል። በዚያ ሁነታ በሩ HEADን ከ
merge-base ጋር **PR በነካቸው ፋይሎች ብቻ በመገደብ** ያነጻጽራል (`scripts/check/newCodeMode.mjs`፦
merge-base በጊዜያዊ `git worktree` ውስጥ ይፈጠራል፣ ESLint/knip በዚያ እና በHEAD ላይ ይሰራሉ፣
ከዚያም የእያንዳንዱ ፋይል ቆጠራዎች ልዩነት ይሰላል)፦

- **አጋጅ** — PRው በቀየራቸው ፋይሎች ውስጥ የሳይክሎማቲክ/ኮግኒቲቭ ጥሰቶችን ወይም ጥቅም ላይ ያልዋሉ exportsን ጨምሯል
  (`complexityNewCode=`፣ `cognitiveComplexityNewCode=`፣ `deadExportsNewCode=` በሎጉ ውስጥ)፤
- **አማካሪ** — ዓለም አቀፉ ጠቅላላ ከተቀዘቀዘው መነሻ መስፈርት ጋር። በውርስ የመጣ ልዩነት ንጹሕ PRን ፈጽሞ
  አያስወድቅም፤ ልዩነቱ በልቀት ማስታረቂያ ጊዜ እንደገና ይቀዘቅዛል እና በክፍተት ሥራው ይከታተላል።

`workflow_dispatch` አሂዶች፣ የrelease-green ሙሉ ፍተሻ እና የሌሊቱ የክፍተት ሥራ የPR መነሻ
የላቸውም፣ እና ፍጹም (ዓለም አቀፍ) ንጽጽሩን ይጠብቃሉ። ሽፋን፣ ድግግሞሽ እና የዓይነት ሽፋን ለአሁኑ
ዓለም አቀፍ ሆነው ይቆያሉ (መሣሪያዎቻቸው የእያንዳንዱን ፋይል ልዩነት በቀላሉ አያመነጩም) — ተመሳሳይ አያያዝ ሊደረግላቸው የሚችሉ እጩዎች ናቸው።

**ምዕራፉን በv4.0 መዝጋት (LTS = ከበፊቱ የበለጠ ጥብቅ፣ "ወደ መደበኛው መመለስ" አይደለም)**

1. በንጹህ `release/v4.0.0` የመጨረሻ ኮሚት ላይ፦ ለመዝገብ `npm run quality:headroom --json`ን ያስኪዱ፤ ከዚያ
   `npm run quality:ratchet -- --update`፣ `check:file-size --update`፣
   `check:complexity-ratchets --update`፣ `check:dead-code --update` እና የእያንዳንዱ typecheck ጌት
   `--update` — እያንዳንዱ baseline ወደ ተለካው እሴት ዝቅ ይላል።
2. `_policy`ን ከ`quality-baseline.json` ይሰርዙ (`--require-tighten`ን እና የማታውን
   ማጠራቀም እንደገና ያነቃል)፤ በ`check-openapi-coverage.mjs` ውስጥ `THRESHOLD = 36`ን (ወይም ከዚያ በላይ) ይመልሱ።
3. ሞዱላራይዜሽኑ ውጤት ባስገኘባቸው ቦታዎች ከተለካው እሴት በላይ ያጥብቁ፦ የፋይል መጠን `cap`ን ወደ 1000
   (ወይም 800) ይመልሱ፣ የcoverage ዝቅተኛ ገደቦችን +5 ያድርጉ፣ እና ሞዱላራይዝ ለተደረጉት packages የdead exports ብዛትን 0 ያድርጉ።

## የRatchet መነሻ መስመር (`quality-baseline.json`)

የratchet ሞተሩ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`ን
በማንበብ አዲስ ከተሰበሰበው `quality-metrics.json` ጋር ያነጻጽረዋል። ከየራሱ epsilon
በላይ የሚያሽቆለቁል ማንኛውም መለኪያ buildን እንዲወድቅ ያደርጋል።

በአሁኑ ጊዜ ክትትል የሚደረግባቸው መለኪያዎች፦

| መለኪያ                  | አቅጣጫ   | ትርጉም                             |
| --------------------- | ------ | -------------------------------- |
| `eslintWarnings`      | `down` | የESLint ማስጠንቀቂያዎች ብዛት መጨመር የለበትም |
| `coverage.statements` | `up`   | የstatement coverage መቀነስ የለበትም   |
| `coverage.lines`      | `up`   | የline coverage መቀነስ የለበትም        |
| `coverage.functions`  | `up`   | የfunction coverage መቀነስ የለበትም    |
| `coverage.branches`   | `up`   | የbranch coverage መቀነስ የለበትም      |

እውነተኛ ማሻሻያ ከተደረገ በኋላ መነሻ መስመሩን ለማዘመን፦

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

የ`--update` flag አሁን የተለኩትን እሴቶች ወደ `quality-baseline.json` ይጽፋል።
ይህን ፋይል መለኪያውን ካሻሻለው ለውጥ ጋር አብረው commit ያድርጉ። መነሻ መስመሩን
ሳያዘምን መለኪያን የሚያሻሽል PR በ`--require-tighten` ይያዛል (ደረጃ 6A.5፣
ትግበራው በመጠባበቅ ላይ ነው)።

### የCodeQL ratchet፦ የማደሻ ድግግሞሽ እና በእጅ ማስጀመር

`check:codeql-ratchet` **በጊዜ ሰሌዳ የሚታደሰውን የrepo ሁኔታ እንጂ በእያንዳንዱ PR የሚታደሰውን አያነብም።**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`
`state: configured`፣ `schedule: weekly` የሚል ውጤት ይሰጣል፦ ይህ የGitHub default-setup scan እንጂ
በእያንዳንዱ push የሚካሄድ analysis አይደለም። ውጤቱም፦ alertsን የሚያስተካክል PR merge ከተደረገ በኋላ፣
ቀጣዩ በጊዜ ሰሌዳ የተያዘ scan እስኪካሄድ ድረስ ratchet የቆየውን ከፍተኛ ብዛት ማንበቡን ይቀጥላል፤
ስለዚህ scanው እስኪያዘምን ድረስ በሁሉም ክፍት PR ላይ፣ የማስተካከያው PR ተከታይ ለውጦችንም ጨምሮ፣
ወደኋላ መመለስ እንዳለ ያሳያል።

**በእጅ ማደስ**፦ `gh workflow run codeql.yml --ref release/vX.Y.Z` analysisን እንደገና
ያስኬድና alertsን በደቂቃዎች ውስጥ እንደገና ያትማል። መጀመሪያ `.github/workflows/codeql.yml`ን
ያንብቡ፤ ራስጌው `workflow_dispatch`-ብቻ የሆነው **ከGitHub "default setup" ጋር ስለሚጋጭ**
መሆኑን ያብራራል (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)። የ`push`/`pull_request`/
`schedule` triggersን መልሶ ማስጀመር በመጀመሪያ **የowner እርምጃ** ይፈልጋል፦ Settings → Code security →
CodeQL: Default → Advanced። ያንን ለውጥ ሳያደርጉ `schedule:` trigger አይጨምሩ፤
ውድቀት የሚያጋጥማቸውን runs ብቻ ይፈጥራል።

**ብዛቱ ከቀነሰ በኋላ መነሻ መስመሩን ያጥብቁ**፦ `node scripts/check/check-codeql-ratchet.mjs
--update` አዲሱን የተለካ ብዛት ወደ `quality-baseline.json` →
`metrics.codeqlAlerts.value` ይጽፋል፤ በዚህም ratchet እንደገና ወደ ቀድሞው ከፍተኛ ገደብ
የሚደረግን ወደኋላ መመለስ በዝምታ እንዳይፈቅድ ያደርጋል። የተሰራ ምሳሌ (2026-09-02/03)፦ PR #12502
7 እውነተኛ alertsን አስተካክሏል (13 → 6 የተለኩ ክፍት alerts)፤ PR #12530 ከዚህ ጋር እንዲዛመድ
የቀዘቀዘውን መነሻ መስመር ከ11 → 6 አጥብቋል፤ ቀሪዎቹ 6 alerts ከዚያ በኋላ ለእያንዳንዱ alert
ምክንያት በመመዝገብ እስከ 0 ክፍት alerts ድረስ dismiss ተደርገዋል።

**Dismissals የoperator ውሳኔ ናቸው (ጥብቅ ደንብ #14)**፦ በdismissal አስተያየቱ ውስጥ ቴክኒካዊ
ምክንያቱን ሳይመዘግቡ የCodeQL alertን በፍጹም dismiss አያድርጉ፦ ለupstream-protocol መስፈርት `won't fix`፣
ለtest fixture `used in tests`፣ CodeQL ማየት ለማይችለው sanitizer `false positive`
(ቀዳሚ ምሳሌ፦ `docs/security/ERROR_SANITIZATION.md`)።

---

## የሙከራ ድጋሚ ማስኬጃ ፖሊሲ (WS5.4, v3.8.49)

ድጋሚ ማስኬድ ለእያንዳንዱ runner የተለየ እንጂ አጠቃላይ የሚሸፍን አይደለም — አጠቃላይ ድጋሚ ማስኬድ እውነተኛ የኋሊት መመለሶችን
ወደማይታዩ አልፎ አልፎ የሚከሰቱ ውድቀቶች ይቀይራቸዋል፦

| Runner           | ፖሊሲ                                                                                                        | ምክንያቱ                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | በCI ውስጥ ብቻ `retries: 1`፣ ከ`trace: on-first-retry` ጋር                                                       | የአሳሽ/አውታረ መረብ ጊዜ በእውነት የማይወሰን ነው፤ አንድ ድጋሚ ማስኬድ ከtrace ጋር አልፎ አልፎ የሚከሰት ውድቀትን ሊመረመር ወደሚችል artifact ይቀይረዋል |
| Vitest           | አጠቃላይ ድጋሚ ማስኬድ የለም። አልፎ አልፎ እንደሚወድቅ የተረጋገጠ ሙከራ ግልጽ የሆነ ለሙከራው-ብቻ ድጋሚ ማስኬጃ ያገኛል (በdiff ውስጥ የሚታይ፣ በPR የሚገመገም) | የለይቶ ማቆያ ዝርዝሩን በrepo ውስጥ ያቆየዋል፣ በፍጹም ድብቅ አይሆንም                                                           |
| node:test (unit) | በፍጹም ድጋሚ ማስኬድ የለም                                                                                          | አልፎ አልፎ የሚወድቅ unit test በሙከራው ውስጥ ያለ bug ነው — ያስተካክሉት፣ እንደገና በዕድል አያስኬዱት                                 |

የአልፎ አልፎ ውድቀት telemetry ከተተገበረ በኋላ የሚፈለጉ SLOs (WS5.2/5.3)፦ ለእያንዳንዱ ሙከራ <1% የአልፎ አልፎ ውድቀት መጠን
("አሁን አስተካክል" ገደብ)፣ ለእያንዳንዱ pipeline ≥95% የማለፍ መጠን። የኢንዱስትሪ ማጣቀሻ እሴቶች —
በራሳችን መለኪያዎች መሠረት እንደገና ይስተካከሉ።

## በልቀት ደረጃ የRatchet መዛባት (WS5.5, v3.8.49)

አንድ ratchet (የፋይል መጠን፣ ውስብስብነት፣ eslint ማስጠንቀቂያዎች) በንጹሕ የልቀት
ጫፍ ላይ ወደኋላ ሲመለስ — ማለትም የmergeዎች **ጥምረት** ወደኋላ እንዲመለስ አድርጎታል፣ እና የትኛውም ነጠላ PR በራሱ branch ላይ
የኋሊት መመለሱን አያስከስተውም — ማስተካከያው የ**release captain ሲሆን፣ አንድ ጊዜ፣ በ
release branch ላይ** መደረግ አለበት፦ extraction/refactorን ይምረጡ፤ rebaseline ማድረግ ያለበት በሰነድ የተመዘገበ
የማስረጃ ግቤት ካለ ብቻ ነው። የጥምረት መዛባትን በአበርካች PR ላይ በፍጹም አይጫኑ፣ እና
ለእያንዳንዱ PR rebaseline በፍጹም አያድርጉ (ያ እውነተኛ የኋሊት መመለሶችን ይደብቃል)። መጀመሪያ ለይተው ይወቁ፦ PRዎ እንዳስከተለው ከመገመትዎ በፊት በprobe worktree ውስጥ
በንጹሑ ጫፍ ላይ ቀዩን ውጤት እንደገና ያስከስቱ።

## የRatchet መቀነሶችን ማከማቸት — ወደታች ያለው አቅጣጫ (#8584)

ratchet በግማሽ ብቻ አውቶማቲክ ነው፣ እሱም የተሳሳተው ግማሽ ነው። capን **ማሳደግ**
አሥር ሰከንድ የሚወስድ በእጅ የሚደረግ JSON አርትዖት ሲሆን ቀይ PRን ለመክፈት ፈጣኑ መንገድ ነው።
አንዱን **መቀነስ** ግን አንድ ሰው `--update`ን አስኪዶ ውጤቱን commit እንዲያደርግ ይጠይቃል — እና
የ`bank-ratchet-shrinks` job እስኪተገበር ድረስ ይህን የሚያስኬድ workflow አልነበረም። የተለካው ውጤት
(2026-07-25)፦ 18 frozen ፋይሎች አስቀድመው ከ800-line የአዲስ ፋይል cap ጋር እኩል ወይም ከዚያ በታች ሲሆኑ፣ ከሁሉ የከፋው
በ132× (`src/shared/validation/schemas.ts`፣ 19 መስመሮች 2,523 capን የተሸከሙ) ነበር፤
የውስብስብነት ጣሪያው በ~37 rebaseline ማስታወሻዎች ውስጥ `1794 → 2169` ከፍ አለ፣ በትክክል አንድ
መቀነስ (−1) ብቻ ነበረው፤ እና "በቀጣዩ ዙር በ`--update` አጥብቅ" 31 ጊዜ ተጽፎ አንድ ጊዜ
ብቻ ተከበረ። ያስገኘው ኮድ ከጠፋ በኋላም የሚቆይ cap እያንዳንዱን የተጠናቀቀ decomposition በጸጥታ
ቀጥሎ ፋይሉን ለሚያርትዕ ሰው የዕድገት ፈቃድ ያደርገዋል።

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ያንን ዑደት ይዘጋል፦

|          |                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------- |
| የሚሰራበት   | `schedule` (3×/day) + `workflow_dispatch` — ሆን ተብሎ **`push` አይደለም**                            |
| የሚለካው    | ከፍተኛውን `release/vX.Y.Z`፣ ከ`release-green` ጋር ተመሳሳይ resolution + injection guard                |
| የሚጽፈው    | `check:file-size --update` እና `check:complexity-ratchets --update` (ሁለቱም በአወቃቀራቸው መቀነስ-ብቻ ናቸው) |
| የሚያረጋግጠው | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                       |
| የሚልከው    | አንድ ሁልጊዜ-ወቅታዊ PR ወደ release branch — በግድ የሚዘምን፣ በፍጹም spam የማይደረግ                               |

ማከማቸቱ ለእያንዳንዱ push ከመሆን ይልቅ በቡድን ይከናወናል፤ ምክንያቱም የlatency መስፈርት የለውም (በ8h ውስጥ
የተከማቸ መቀነስ በቂ ነው)፣ ለእያንዳንዱ merge ማስኬድ ግን በmerge ዘመቻዎች ወቅት PR branchን ደጋግሞ
እንደገና ይገነባ እና በእያንዳንዱ ጊዜ ለሙሉ ESLint ማለፊያ ወጪ ይከፍላል። ማግኘቱ በ
push (`release-green`) ላይ ይቆያል፤ በቡድን የሚከናወነው ማከማቸቱ ብቻ ነው።

### የደህንነት አረጋጋጭ

jobው ያለ ክትትል ወደ baselines ይጽፋል፣ ስለዚህ `verify-ratchet-bank.mjs` ይህን
ተቀባይነት ያለው ያደርገዋል። ከ`--update` በኋላ ያለውን tree ከ`HEAD` ጋር diff ያደርጋል፣ እና እያንዳንዱ ለውጥ
ከሚከተሉት አንዱ ካልሆነ **ምንም commit ከመኖሩ በፊት jobውን ያቋርጣል** — ምንም PR አይከፍትም፦

- የ`frozen` / `testFrozen` ቁጥራዊ ግቤት **የተቀነሰ** ወይም **የተወገደ**
- `complexity-baseline.json` → `count` **የተቀነሰ**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **የተቀነሰ**

ሌላ ማንኛውም ነገር ያወድቃል፦ ቁጥር ማሳደግ፣ ግቤት መጨመር፣ `cap`/`testCap`ን መቀየር፣ ወይም
የ`_rebaseline_*` ማስታወሻን መሰረዝ/እንደገና መጻፍ (እነዚያ ማስታወሻዎች እያንዳንዱ ጣሪያ ለምን
እንደሚኖር የሚገልጹ የኦዲት ዱካዎች ሲሆኑ ከፋይል ግቤቶቹ ጋር በተመሳሳዩ `frozen` object ውስጥ ይቀመጣሉ)።
capን ማሳደግ የሚችል bot ከአሁኑ ሁኔታ በእጅጉ የከፋ ይሆናል። የኋሊት መመለስ
መከላከያ፦ `tests/unit/verify-ratchet-bank.test.ts`።

jobው ወደ `release/*` በፍጹም push አያደርግም — PRን የሚያዋህደው ሰው ነው፣ ስለዚህ የተሳሳተ መለኪያ
ሳይገመገም ሊገባ አይችልም።

## የAllowlist ፖሊሲ

ቀድሞ በነበሩ ጥሰቶች ምክንያት ሊወድቅ የማይችል እያንዳንዱ gate የተወሰነ allowlist
ይጠቀማል (ለምሳሌ፣ `KNOWN_STALE_DOC_REFS`፣ `KNOWN_MISSING`፣ `KNOWN_RAW_SQL`)። ፖሊሲው፦

**ዋናውን መንስኤ ያስተካክሉ፤ allowlistን ጥሰቱ ቀድሞ የነበረ እና
በዚያው PR ውስጥ ሊስተካከል የማይችል ከሆነ ብቻ ይጠቀሙ።**

ወደ allowlist ግቤት ሲጨምሩ፦

1. ምክንያቱን የሚያብራራ አስተያየት ያካትቱ።
2. የክትትል issueውን ይጥቀሱ (ለምሳሌ፣ `// #3498 — የደረጃ 2 ባህሪ፣ እስካሁን አልተተገበረም`)።
3. ጥሰቱን በሚያስተካክለው PR ውስጥ ግቤቱንም ያስወግዱ — ንቁ ጥሰትን ከእንግዲህ
   የማይገታ ያረጀ ግቤት በራሱ ጉድለት ነው (6A.3 stale-enforcement ከተተገበረ በኋላ
   ባለቤት በሌለው allowlist ግቤት ምክንያት gateውን ያሳክታል)።

ሙከራዎችን በፍጥነት ለማሳለፍ የallowlist ግቤቶችን **አይጨምሩ**። እያደገ ያለ allowlist ያለው
አረንጓዴ gate ስለ ጥራት የተሳሳተ እምነት ይፈጥራል።

### በእርስዎ PR ላይ gate ሲወድቅ

1. **የgateውን ውጤት በጥንቃቄ ያንብቡ** — ደንቡን የጣሰው የትኛው ፋይል ወይም symbol እንደሆነ
   በትክክል ይነግርዎታል።
2. **ጥሰቱን ያስተካክሉ** — አብዛኞቹ gates ኮዱ ትክክል እንደሆነ
   የሚያልፉ ተወስነው የሚሠሩ የfilesystem ፍተሻዎች ናቸው።
3. **ጥሰቱ ቀድሞ የነበረ ከሆነ** (ማለትም፣ እርስዎ ያላስገቡት ነገር ግን gateው አሁን
   የሚሸፍነው ከሆነ)፦ የምክንያት አስተያየት እና የክትትል issue ያለው የallowlist ግቤት ያክሉ።
4. **gateው ratchet ከሆነ** (coverage፣ ESLint warnings፣ duplication፣ complexity)፦
   ለውጥዎ መለኪያውን አባብሶታል። መሠረታዊውን ችግር ያስተካክሉ፣ ወይም (አልፎ አልፎ) ለውጡ
   ሆን ተብሎ የተደረገ እና የመለኪያው መቀነስ ተቀባይነት ያለው ከሆነ
   `npm run quality:ratchet -- --update`ን ያስኪዱ — ነገር ግን ምክንያቱን በPR መግለጫው ውስጥ ይመዝግቡ።
5. **የምክር gates** (`continue-on-error: true`) ለመረጃ ብቻ ናቸው — mergeን አያግዱም፣
   ነገር ግን በCI ማጠቃለያው ውስጥ ይታያሉ። ሆኖም ያስተካክሏቸው።

---

## አዲስ Gate ማከል

1. `scripts/check/check-<name>.mjs`ን (ወይም `.ts`) ይፍጠሩ። የፖሊሲ gates በ0/1 ይወጣሉ።
   Ratchet-style gates `collect-metrics.mjs`ን በመጠቀም መለኪያን ወደ `quality-metrics.json` ያስገባሉ።
2. `"check:<name>": "node scripts/check/check-<name>.mjs"`ን ወደ `package.json` ያክሉ።
3. በተገቢው job ስር በ`.github/workflows/ci.yml` ውስጥ ያገናኙት
   (policy → `lint` ወይም `docs-sync-strict`፤ ratchet → `quality-gate`)።
4. allowlist ካለው፣ ያረጁ ግቤቶች በራስ-ሰር እንዲገኙ
   `reportStaleEntries()`ን ከ`scripts/check/lib/allowlist.mjs` ይተግብሩ።
5. የgateውን የማግኘት ሎጂክ የሚሸፍን ሙከራ በ`tests/unit/build/` ውስጥ ይጻፉ።
6. ይህን ሰነድ ያዘምኑ (ወደ ተገቢው የjob ሰንጠረዥ አንድ ረድፍ ያክሉ)።

---

## የAgent መሣሪያዎች፦ LSP-in-the-loop (opt-in)

ከCI gates በተጨማሪ፣ OmniRoute **opt-in** የሆነ `agent-lsp` scaffold
(በፕሮጀክት ደረጃ ያለ `.mcp.json`፣ Fase 7 Task 15) ይዞ ይመጣል። TypeScript language serverን ለcoding agents ለማጋለጥ `.mcp.json`ን
ይፍጠሩ፤ ይህም ኮድ ከመጻፋቸው **በፊት** symbols /
diagnosticsን እንዲፈቱ ያደርጋል — የ"የተፈጠረ symbol" ስህተቶችን ከመነሻቸው የሚቀንስ፣
ከ`typecheck:core` ጋር የሚሠራ compile-before-claim አጋዥ ነው። ሆን ተብሎ
በራስ-ሰር እንዳይጫን ተደርጓል (የMCP↔LSP bridgeን እርስዎ ይመርጣሉ እና ያረጋግጣሉ)፤ የተበላሸ ግቤት የግንኙነት
ስህተትን ብቻ ይመዘግባል እንጂ sessionsን ፈጽሞ አያቋርጥም።

---

## የማቀላጠፍ የኋላ ቀር ሥራዎች (የROI ግምገማ — ደረጃ 9 ሞገድ 3)

ይህ ዝርዝር በ2026-06-17 ከ`ci.yml` ጋር ተመሳክሯል (ቀዳሚው ስሪት
`audit:deps`፣ `check:tracked-artifacts`፣ `check:lockfile`፣ `check:licenses`፣
`check:dead-code`፣ `check:cognitive-complexity`፣ `check:type-coverage`፣
`check:codeql-ratchet`፣ `check:pr-evidence`ን አላካተተም ነበር)። በተመሳከረው ስብስብ ላይ የተደረገ የROI ግምገማ
የሚከተሉትን የማቀላጠፍ እጩዎች ለይቷል። **ውህደቶቹ ሜካኒካዊ የCI
ለውጦች ናቸው፤ ማስገደጃ ለውጦቹ/ማስወገዶቹ ለኦፕሬተሩ የተተዉ የፖሊሲ ውሳኔዎች ናቸው።** ከታች ያለው ምንም ነገር
እስካሁን አልተተገበረም።

**ከላይ ያልተመዘገቡ ተጨማሪ ነገሮች** (አማካሪ፣ ዝቅተኛ ምልክት ያላቸው)፦ የ`docs-lint` ሥራ
(markdownlint + Vale፣ ሙሉው ሥራ `continue-on-error`) እና ራሳቸውን የቻሉት የስካነር የሥራ ፍሰቶች
`semgrep.yml` / `codeql.yml` / `scorecard.yml`። `semgrepFindings: 0` በ
`quality-baseline.json` ውስጥ አለ፣ ነገር ግን በ`ci.yml` ውስጥ ከአጋጅ ራቸት ጋር አልተገናኘም — መለኪያው
በአሁኑ ጊዜ ወላጅ አልባ ነው።

### ማዋሃድ / ድግግሞሽን ማስወገድ (ሜካኒካዊ፣ ዝቅተኛ ስጋት)

እያንዳንዱ እጩ በ2026-06-17 በነበረው ቀጥታ የጌት ሁኔታ ላይ ተረጋግጧል (እመን-ግን-አረጋግጥ)፤
ብዙ “ግልጽ” የሚመስሉ ውህደቶች እዳን የሚደብቁ ሆነው ተገኝተዋል እና **ያለ ችግር በቀጥታ የሚተኩ አይደሉም**።

- **`check:docs-sync` ሁለት ጊዜ ይሠራል** — በ`lint` ሥራ ውስጥ ራሱን ችሎ እና እንደገና በ`check:docs-all` (`docs-sync-strict`) እና በhusky pre-commit hook ውስጥ። ✅ **ተጠናቋል** — ራሱን የቻለው የ`lint` ጥሪ ተወግዷል።
- **የCVE ቅኝት** — ❌ **ንጹሕ ውህደት አይደለም።** `audit:deps` በማንኛውም ከፍተኛ/ወሳኝ CVE ላይ በጥብቅ ይወድቃል፤ `check:vuln-ratchet` (osv) የሚወድቀው ከመነሻ መስመሩ ጋር ሲነጻጸር _ማሽቆልቆል_ ሲኖር ብቻ ነው (በአሁኑ ጊዜ 1 MODERATE)። የተለያየ ትርጉም አላቸው — `audit:deps`ን ማስወገድ ፍጹሙን የከፍተኛ/ወሳኝ ጌት ያስቀራል። ሁለቱንም ያቆዩ።
- **የዑደት ማወቂያ** — ❌ **ንጹሕ ውህደት አይደለም።** `check:circular-deps` (dpdm) **91 ዑደቶችን** ያሳውቃል (አማካሪ የሆነውም ለዚህ ነው)፤ መጀመሪያ እነሱን ሳይፈታ ወደ አጋጅነት ማሳደግ አይቻልም፣ እንዲሁም አረንጓዴ ከሆነውና በጥንቃቄ ከተመረጠው `check:cycles` የበለጠ ሰፊ ወሰን አለው። `check:cycles`ን አጋጅ አድርገው ያቆዩ፤ 91ዱን የdpdm ዑደቶች መፍታት የራሱ የኋላ ቀር ሥራ ነው።
- **ውስብስብነት** — ✅ **ተጠናቋል** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`)፦ አንድ የESLint ዳሰሳ፣ በruleId ይቆጥራል፣ ስለዚህ የcyclomatic+max-lines እና cognitive መነሻ መስመሮች ተለያይተው ይቆያሉ፤ ነጠላዎቹ `check:complexity` / `check:cognitive-complexity` ለአካባቢያዊ `--update` ይቆያሉ።
- **የ`/api` ፀረ-ቅዠት** — ✅ **ተጠናቋል** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`)፦ አንድ የ`src/app/api` FS ቆጠራ፣ openapi-routes + docs-symbols አሁንም ራሳቸውን ችለው ሪፖርት ያደርጋሉ፤ ነጠላዎቹ ለአካባቢያዊ ማስኬዶች ይቆያሉ።
- **`check:node-runtime` በ11 ሥራዎች ውስጥ ይሠራል** — ⚠️ **ዝቅተኛ ROI።** እያንዳንዱ የተለየ runner ነው፣ እና ምርመራው <1s ነው፤ አጠቃላይ ቁጠባው ~10s ሲሆን፣ በእያንዳንዱ ሥራ ያለውን ርካሽ መከላከያ ማጣትን አያካክስም። ለዚህ ለውጥ የሚደረገው ጥረት ዋጋ የለውም።
- **በCI lint ላይ `typecheck:noimplicit:core`** — ✅ **ከlint ሥራ ተወግዷል** (አማካሪ `continue-on-error` ነበር)፤ አጋጁ የዓይነት ወሰን `typecheck:core` + `check:type-coverage` ነው። አካባቢያዊው ስክሪፕት ተይዟል።

### ማስገደጃን መቀየር / መወሰን (የኦፕሬተር ፖሊሲ)

- `check:openapi-security-tiers` (አማካሪ) — ❌ **በንጽሕና ወደ አጋጅነት ሊቀየር አይችልም።** በ0 ይወጣል፣ ነገር ግን በ`LOCAL_ONLY_API_PREFIXES` ስር ያሉ በርካታ የ`traffic-inspector` መንገዶች የ`x-loopback-only: true` ማብራሪያ እንደሌላቸው ያስጠነቅቃል። ማስገደድ በመጀመሪያ እነዚያን ማብራሪያዎች ወደ`openapi.yaml` ማከልን ይጠይቃል።
- `typecheck:noimplicit:core` (አማካሪ) — በአብዛኛው በአጋጁ `check:type-coverage` ራቸት ተሸፍኗል። ወደ ራቸት ይቀይሩት ወይም ተደጋጋሚውን ሁለተኛ የ`tsc` ማስኬድ ያስወግዱ።
- `test:vitest:ui` (አሁን **አጋጅ**) — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በ`// #8618` የክትትል አስተያየቶች በግልጽ ተገልለዋል፤ አዳዲስ ውድቀቶች ሥራውን ያወድቃሉ።
- `check:secrets` (gitleaks፣ በ3 በሰነድ የተመዘገቡ የሐሰት-አዎንታዊ ውጤቶች ላይ የቀዘቀዘ አጋጅ ራቸት) — 0 ላይ ለመድረስ 3ቱን allowlist ያድርጉ፣ ወይም ወደ አማካሪነት ዝቅ ያድርጉት። ከGitHub ቤተኛ secret-scanning + `check:public-creds` ጋር ይደራረባል።
- `check:pr-evidence` (አጋጅ፣ የPR-body ጽሑፍን በgrep ይፈልጋል) — ከፍተኛ የሐሰት-አዎንታዊ ስጋት አለው፤ ከተወገደ የHard Rule #18 ማስፈጸሚያን ያዳክማል፣ ስለዚህ ይህ እውነተኛ የፖሊሲ ውሳኔ ነው።
- `semgrep` (ራሱን የቻለ አማካሪ) — ለOWASP ምድቦች ከCodeQL ጋር ይደራረባል፤ መነሻ መስመሩን ከራቸት ጋር ያገናኙ ወይም ያስወግዱት።

---

## ተዛማጅ ሰነዶች

- የአቅርቦት ሰንሰለት (provenance፣ SBOM፣ Trivy፣ Scorecard)፦ [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — የቁልፍ-ስብስብ እኩልነት መቆጣጠሪያ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`፣ job `i18n-ui-coverage`)።
የእያንዳንዱን `src/i18n/messages/<locale>.json` የመጨረሻ ደረጃ ቁልፍ ስብስብ ከ`en.json` ጋር ያነጻጽራል፣ እና
ቁልፉ መቼ እንደታከለ ሳይመለከት በማንኛውም የጎደለ ወይም ተጨማሪ የመጨረሻ ደረጃ ቁልፍ ላይ ይወድቃል። `__MISSING__:` ቦታ-ያዥ ምልክቶች
እንዳሉ ይቆጠራሉ (ይዘታቸው የሬሾ መቆጣጠሪያው ጉዳይ ነው)። ይህ በልዩነት/መቶኛ ላይ የተመሠረቱትን
ሁለት መቆጣጠሪያዎች ሙሉ በሙሉ ያሟላል፦ `check-ui-keys-coverage` ለእያንዳንዱ
locale የ80 % ዝቅተኛ ገደብ ያስፈጽማል (ከ~13,000 ውስጥ 43 ቁልፎች ቢጎድሉም አሁንም 99.7 % ይነበባል)፣ እና `check-new-key-coverage`
PR ወደ `en.json` የሚያክላቸውን ቁልፎች ብቻ ይገመግማል። የlocale ቡድን ቅርንጫፉ በተፈጠረበት ቀን ካለው `en.json`
የሚመነጭ ሲሆን፣ base አዳዲስ ቁልፎችን ማከሉን ሲቀጥል ለቀናት ትርጉም ያከናውናል፤ የቡድኑ PR ራሱ
ምንም ቁልፍ አይጨምርም፣ ስለዚህ batch 1 (#13044) በዘጠኝ locales 43 ቁልፎች ጎድለውት
እና batch 2 (#13660) በስምንት locales 10 ቁልፎች ጎድለውት ሲዋሃዱ (2026-09-15) ሁለቱም ተዛማጅ መቆጣጠሪያዎች ዝም ብለው ቀርተዋል። ቀይ ስህተትን በ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ያስተካክሉ፤ `extra` የመጨረሻ ደረጃ ቁልፍ
ምንጩ እንዳስወገደው ያመለክታል — ከlocale ይሰርዙት። `--warn` ሳያወድቅ ሪፖርት ያደርጋል።
`--catalog=cli` በ`bin/cli/locales` ላይ ተመሳሳዩን ንጽጽር ያካሂዳል (`npm run i18n:check-keys:cli`)፤
ሁለቱም ደረጃዎች በjob `i18n-ui-coverage` ውስጥ ይገኛሉ።

#### `check-new-key-coverage` — የአዲስ-ቁልፍ i18n መቆጣጠሪያ

የ`check-ui-value-drift` ተዛማጅ መቆጣጠሪያ ነው። ያኛው፣ ትርጉሞቹ ሳይዘምኑ የቀረ የእንግሊዝኛ እሴት **እንደገና ሲጻፍ**
ይለያል፤ ይህኛው ደግሞ አንዳንድ locales ሳይቀበሉት የቀረ የእንግሊዝኛ ቁልፍ **ሲታከል**
ይለያል።

`check-ui-keys-coverage` ይህን ዓይነት ማየት አይችልም፦ ለእያንዳንዱ locale የመቶኛ ዝቅተኛ ገደብ ያስፈጽማል፣ እና
ከ~13,000 የመጨረሻ ደረጃ ቁልፎች ውስጥ አሥራ አንዱ ቢጎድል ሽፋኑ 99.9% ሆኖ ይቀራል። የእያንዳንዱ ቋንቋ መቶኛ
“ይህ ባህሪ ሳይተረጎም ተለቀቀ” የሚለውን መግለጽ አይችልም — አንድ ሙሉ ባህሪ ምንም
ጽሑፍ ሳይኖረው በአዲስ locale ውስጥ ሊገባ እና ቁጥሩን ፈጽሞ ላይቀይር ይችላል።

ይህ የሚወክለው ክስተት፦ የOrchestration Canvas Phase 3 አሥራ አንዱን ቁልፎች በወቅቱ
በነበሩት 42 locales ተርጉሟል። ከሰዓታት በኋላ የEU-ቋንቋ ቡድን (#13044) repoውን
ወደ 51 locales አሳደገ፣ እና ዘጠኙ አዲስ ገቢዎች (`el`፣ `et`፣ `ga`፣ `hr`፣ `lt`፣ `lv`፣ `mt`፣ `sl`፣ `sr`)
እነዚህን ፈጽሞ አልተቀበሉም። `deepMergeFallback` በጎደለ ቁልፍ ምትክ እንግሊዝኛን ያስገባል፣ ስለዚህ የብልሽቱ ሁኔታ
ባዶ UI ሳይሆን ያልተተረጎመ UI ነበር — እውነተኛ፣ እና በአወቃቀሩ ምክንያት ዝምተኛ።

እንደ ተዛማጅ መቆጣጠሪያው ይህም **ልዩነትን የሚያውቅ** ነው፤ በmerge base ላይ ያለውን እንግሊዝኛ ከworking
tree ጋር ያነጻጽራል፣ ስለዚህ ቀድሞ የነበሩ ክፍተቶች ባሉበት ይቆያሉ እና መቆጣጠሪያውን ለማብራት ምንም migration አላስፈለገም።

**የ`__MISSING__:<english>` ምልክት መስፈርቱን አያሟላም (ከ2026-09-17 ጀምሮ)።** ቀደም ሲል በሰነድ የተገለጸው
የማዘግየት ዘዴ ነበር — runtimeው ወደ ትክክለኛው እንግሊዝኛ ይመለሳል — ነገር ግን በ
2026-09-16 ስምንት የባህሪ PRs 61 ቁልፎችን አክለው ከመተርጎም ይልቅ ምልክቱን በሁሉም 65 locales ውስጥ
አስገብተዋል፦ ይህ መቆጣጠሪያ ሁሉንም ተቀብሏል፣ PRsን ምንም ነገር አላገዳቸውም፣ እና ማገጃው የእውነተኛ-ትርጉም ሬሾ መቆጣጠሪያ
በመቀጠል በrelease tip ላይ ለሁሉም ወደቀ (pt-BR 3.2 % > 2.5 % + 0.5)። አሁን ምልክት
እንደጎደለ ትርጉም ይቆጠራል። ቀይ ስህተትን በ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`፣ ወይም
ሁሉንም locales በአንድ ጊዜ በ`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`፣
detached-safe፣ ያለ `OMNIROUTE_TRANSLATION_*` env መጀመርን የሚከለክል) ያስተካክሉ። በእንግሊዝኛ መቆየት ያለበት
ቁልፍ (የተወሰነ የምርት/engine/flag ስም) በ`scripts/i18n/untranslatable-keys.json` ውስጥ መኖር አለበት፣
ከምልክት ጀርባ ፈጽሞ መሆን የለበትም። `vi` ምልክቶችን ሙሉ በሙሉ ይከለክላል (`tests/unit/i18n-vi-completeness.test.ts`)።

#### `check-vitest-exclusions` — የታገዱ-ፈተናዎች መቆጣጠሪያ

በ`vitest.config.ts` `exclude` ዝርዝር ውስጥ ያለ ፋይል የማይሠራ ፈተና ነው፣ እና treeውን ለሚያነብ ሰው
ሽፋን ያለ ይመስላል። ስልሳ ሁለት ፋይሎች
`// #8618 — ቀድሞ የነበረ ውድቀት፤ ሲስተካከል ይህን exclusion ያስወግዱ` ከሚለው አስተያየት ጀርባ ተከማቹ። Issue #8618 በ
2026-08-11 ተዘግቷል፣ እሱ የሚከታተለው ዝርዝር ግን ከ45 ግቤቶች ወደ 62 አደገ፤ እያንዳንዱ አዲስ ግቤት
ወደተዘጋ issue የሚያመለክት አስተያየት ወርሷል። በመጨረሻ ዝርዝሩ ፋይል በፋይል ሲለካ (#13204)፣ **ከ62ቱ 51ዱ
ምንም የsource ለውጥ ሳይደረግ በአሁኑ tree ላይ አልፈዋል**።

መቆጣጠሪያው ወደ እውነተኛ ፋይል የሚያመለክት እያንዳንዱ exclusion (a) የመከታተያ issue እንዲጠቅስ እና
(b) ከተለካው ሁኔታው ጋር በ`config/quality/vitest-exclusions.json` ውስጥ እንዲታይ ይጠይቃል፤ ስለዚህ አንድ መጨመር
በ60-ግቤት array ውስጥ ሌላ አንድ መስመር ከመሆን ይልቅ በተለየ ፋይል ውስጥ ሊገመገም የሚችል diff ይሆናል። ሆን ብሎ
የተገለሉትን ፈተናዎች እንደገና አያስኬድም — ይህ ~10 ደቂቃዎችን ይወስዳል እና በየጊዜው በሚሠራ job ውስጥ መከናወን አለበት፤
inventoryው እያንዳንዱ ለመጨረሻ ጊዜ መቼ እንደተለካ ይመዘግባል።
