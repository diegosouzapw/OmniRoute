# Quality Gates Reference (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ይህ ሰነድ በOmniRoute ውስጥ ላሉ ሁሉም የCI ጥራት መግቢያዎች ዋና ማጣቀሻ ነው።
እያንዳንዱን መግቢያ፣ ምን እንደሚያረጋግጥ፣ በየትኛው የCI ሥራ ውስጥ እንደሚሠራ፣
የratchet መነሻ መስመር ወይም የማለፍ/የመውደቅ ፖሊሲ ይጠቀም እንደሆነ፣ እንዲሁም ግንባታውን የሚያግድ ወይም የምክር ብቻ እንደሆነ ይገልጻል።

ለአጭር ማጠቃለያ እና ለፈቃድ ዝርዝር ፖሊሲው፣ በ`AGENTS.md` ውስጥ ያለውን "የጥራት መግቢያዎች እና Ratchets" ክፍል ይመልከቱ።
ለወሳኝ ግምገማው፣ ለብስለት ምደባው፣ እና ከመሣሪያ ነፃ ለሆነው
የተመሳሳይ ሥርዓት ድግግሞሽ ዕቅድ፣
[የጥራት መግቢያ መመሪያ](../ops/QUALITY_GATE_PLAYBOOK.md)ን ይመልከቱ።

---

## የGate ዝርዝር (~90 ስክሪፕቶች)

ስክሪፕቶቹ በ`scripts/check/` (የፖሊሲ gates) እና በ`scripts/quality/` (የratchet engine) ስር ይገኛሉ።
የCI ዋና እውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` `release/**` ላይ ያነጣጠሩ PRs ሲኖሩ ይሰራል። በpath-filtered ፈጣን gates የአስተዋጽዖ አድራጊዎችን
branches እንዲቀጥሉ ያደርጋል፤ በተጨማሪም ለኮድ
ለውጦች አንድ አማካሪ የproduction-build ምልክት ይሰጣል፦

| Job                                              | ወሰን                                                                                                                                                                                          | አጋጅ                                                                               |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Draft ያልሆኑ የኮድ PRs እና የMergify queue branches፤ Node 24፣ `npm-ci-retry`፣ `check:node-runtime`፣ `npm run build` ከ`OMNIROUTE_USE_TURBOPACK=1` ጋር፤ ቀጣይ quality job ስለማይጠቀምበት artifact upload የለም | **አማካሪ** (`continue-on-error: true`፤ ከአንድ ሳምንት የተረጋጋ የrelease-PR ሩጫዎች በኋላ ያስወግዱት) |
| `Docs Gates (fast-path)`                         | የሰነድ/ኮድ PRs፤ የAPI ሰነዶች refs እና docs-all                                                                                                                                                      | አዎ                                                                                |
| `Fast Quality Gates`                             | የኮድ PRs፤ static checks፣ typecheck፣ dashboard typecheck፣ ተጽዕኖ ያረፈባቸው unit tests                                                                                                               | አዎ                                                                                |
| `Forgotten sibling tests`                        | የኮድ PRs፤ የተቀየሩ modules ወደ static consumers እና እጩ sibling tests ይከታተላሉ፤ barrel እና dynamic-import paths ከተጠቀሱ allowlist exceptions ጋር እንደ አማካሪ diagnostics ሪፖርት ይደረጋሉ                          | **አማካሪ**                                                                          |
| `Vitest (fast-path)`                             | የኮድ PRs፤ ፈጣን vitest suite                                                                                                                                                                    | አዎ                                                                                |
| `Unit Tests fast-path`                           | የኮድ PRs፤ ባለ4-shard unit suite                                                                                                                                                                | አዎ                                                                                |
| `No new ESLint warnings`                         | የኮድ PRs፤ suppressions-aware lint guard                                                                                                                                                       | ለown-origin አዎ፣ ለforks አማካሪ                                                       |
| `Merge integrity (changelog + generated skills)` | Draft ያልሆኑ PRs፤ changelog እና generated skill sync                                                                                                                                            | ለown-origin አዎ፣ ለforks አማካሪ                                                       |

#### የተረሱ sibling tests ሪፖርት

`npm run check:forgotten-sibling-tests` ከtest-impact map በስተጀርባ ያለውን import resolver እንደገና ይጠቀማል።
ለእያንዳንዱ የተቀየረ production module፣ እጩው
test በpull-request diff ውስጥ ከሌለ ወጥ የሆኑ
`changed module/symbol -> static consumer -> candidate sibling test` chains ሪፖርት ያደርጋል። የMarkdown ማጠቃለያው እና የJSON ውጤቱ ከማንኛውም አጋጅ rollout በፊት ለcalibration
እንደ `forgotten-sibling-tests` workflow artifact ይቀመጣሉ።

የBarrel re-exports እና dynamic imports የresolution diagnostics ብቻ ናቸው፤ በፍጹም
አጋጅ finding አይፈጥሩም። የተገመገሙ exceptions በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ entry consumer እና candidate
test መጥቀስ፣ የተወሰነ rationale መስጠት እና ወደ GitHub issue ወይም pull request link ማድረግ አለበት። በተሳሳተ መልኩ የተዘጋጁ entries
fail closed ያደርጋሉ። Exceptions የተሰረዘ candidate test ወይም `.skip`/`.todo` የሚጨምር diff ማፈን አይችሉም፤
assertion weakening እና ሌሎች masking በተናጠል አጋጅ በሆነው
`check:test-masking` gate ሥር ይቆያሉ።

### Job፦ `lint`

ወደ `main` በሚደረግ እያንዳንዱ PR ላይ ይሰራል። ካልተሳካ merge ን ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አጋጅ                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:cycles`                    | ዑደታዊ imports — ሁሉም የ`src/` + `open-sse/` modules                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:route-validation:t06`      | በሁሉም routes ላይ የZod schemas መኖራቸውን (የTier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከተፈቀደው ገደብ እንዳያልፍ (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                      |
| `check:provider-consistency`      | `providers.ts` ውስጥ ያለው እያንዳንዱ provider በ`providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እንዲሁም በተቃራኒው፣ በallowlist ወሰን ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                      |
| `check:model-lifecycle`           | ሦስቱ በእጅ የሚያዙ routing tables ከተመዘገበው lifecycle snapshot (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`)፣ `REGISTRY` ሊያስተላልፈው ለሚችለው ማንኛውም ጡረታ የወጣ id ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` target በ`REGISTRY` ውስጥ ይገኛል እና በጡረታ የወጡ id-ዎች snapshot ውስጥ አይገኝም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ ጡረታ የወጣ id ወደ ሌላ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እንዲሁም ማንኛውም የ`DEFAULT_DEGRADATION_MAP` source ወይም target በዚያ snapshot ውስጥ ጡረታ የወጣ ሆኖ አይታይም። ይህ አንድ model በአሁኑ ጊዜ በቀጥታ በሚሠራ upstream እየቀረበ መሆኑን አያረጋግጥም። Offline — በእጅ በ`npm run quality:refresh-model-lifecycle` (network፤ ከCI ጋር አልተገናኘም) ከሚታደሰው `config/quality/model-lifecycle.json` ጋር ያነጻጽራል። `allowedRetiredInCatalog` ቀስ በቀስ የሚቀንስ ratchet ነው፦ ግቤት የሚጨመረው tracking issue ሲኖር ብቻ ነው። | አዎ                                      |
| `check:fetch-targets`             | በclient-side `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                      |
| `check:deps`                      | በrepo ውስጥ ባለው እያንዳንዱ `package.json` ውስጥ ያሉ፣ በ`npm install` ሊጫኑ የሚችሉ deps በሙሉ በ`dependency-allowlist.json` ውስጥ አሉ፤ አዲስ ያልተሰኩ ወይም slopsquatted packages ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                      |
| `audit:deps`                      | `npm audit` (root + electron) — ከፍተኛ/ወሳኝ ማስጠንቀቂያዎች የሉም (ከosv `check:vuln-ratchet` ጋር ይደራረባል፤ Rationalization Backlogን ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                      |
| `check:lockfile`                  | የ`package-lock.json` ታማኝነት — https registry፣ integrity hashes፣ ምንም host overrides የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                      |
| `check:licenses`                  | ለምርት ጥገኞች የSPDX ፈቃድ የተፈቀዱ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                      |
| `check:tracked-artifacts`         | ምንም የግንባታ ቅርሶች / በcommit የተደረጉ `node_modules` symlink-ዎች የሉም (እንዲሁም በhusky pre-commit ውስጥ ይሰራል፤ pre-push ሆን ተብሎ ቀላል ተደርጓል — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                      |
| `check:ai-attribution`            | በPR commit-ዎች፣ ርዕስ ወይም ይዘት ውስጥ የAI/bot `Co-Authored-By` trailer ወይም የAI ማመንጨት footer የለም — ጥብቅ ደንብ #16 (በ`quality.yml` የPR→`release/**` fast-gates loop ውስጥ — የevent payload-ን ያነባል፣ PR ካልሆነ no-op ያደርጋል — እና በ`ci.yml` lint ውስጥ ለPR→`main` የPR-ብቻ ደረጃ፤ እንዲሁም የhusky `commit-msg` hook፤ ሰብዓዊ ተባባሪ ደራሲያን ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest ማግለያ የመከታተያ issue ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይገኛል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                      |
| `check:file-size`                 | ምንም የምንጭ ፋይል በእያንዳንዱ extension የተወሰነውን ከፍተኛ ገደብ አያልፍም (ratchet፦ የተቆለፉ ትልልቅ ፋይሎች በ`frozen` ዝርዝር ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                      |
| `check:error-helper`              | በexecutor/handler-ዎች ውስጥ ያሉ የስህተት ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()`ን ይጠቀማሉ (ጥብቅ ደንብ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                      |
| `check:migration-numbering`       | የMigration SQL ፋይሎች ያለ ክፍተት ወይም ድግግሞሽ በተከታታይ ተቁጥረዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                      |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቀጥተኛ የOAuth `client_id`/`client_secret` ወይም የFirebase Web ቁልፎች የሉም (ጥብቅ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                      |
| `check:db-rules`                  | ከ`src/lib/db/` ሞጁሎች ውጭ raw SQL የለም፤ ከ`localDb.ts` barrel-imports የሉም (ጥብቅ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                      |
| `check:known-symbols`             | በdispatch tables ውስጥ የተመዘገቡት Provider executors፣ routing strategies እና translators በዲስክ ላይ ካሉት ፋይሎች ጋር ይዛመዳሉ — orphaned ወይም undeclared symbols የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                      |
| `check:route-guard-membership`    | child process የሚጀምር እያንዳንዱ route በ`isLocalOnlyPath()` ተመድቧል (ጥብቅ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                      |
| `check:test-discovery`            | በrepo ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ test runner ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው orphan list ሊቀንስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                      |
| `check:agent-skills-sync`         | የተፈጠሩ የagent-skills አርቲፋክቶች ከምንጭ ካታሎጋቸው ጋር ይዛመዳሉ (ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | የአቅራቢ አርማዎች/አሴቶች የተመዘገበ የምንጭ መረጃ ግቤት አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | የJSON ውቅር ፋይሎች በትክክል ይተነተናሉ እና የrepo lint ደንቦችን ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | የTypeScript ማጠናቀር ያለ ስህተት (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                      |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊትን ያማከለ፤ ከዚህ በፊት የነበሩ ብዙ የጥሪ ቦታዎች አሁንም ማብራሪያዎችን ይፈልጋሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **የምክር ብቻ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | ወደ `src/app/(dashboard)/**` የተወሰነ `tsc` (#7033) — የ`typecheck:core` በጥንቃቄ የተመረጠው የ27-ፋይል allowlist ምንም የdashboard TSX አያካትትም፣ እና `next build` እሱንም ቢሆን በፍጹም type-check አያደርግም (`next.config.mjs` `ignoreBuildErrors: true` ያዘጋጃል)፤ ስለዚህ በዚያ ያሉ የተገለሉ-መለያ ስም ድጋሚ መከሰቶች (#6625/#6909) ለCI የማይታዩ ነበሩ። ልዩነቶችን ከተረጋጋ የበእያንዳንዱ-ፋይል/በእያንዳንዱ-TS-code ብዛት መነሻ መስመር (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የstale-enforcement ንድፍ) ጋር ያነጻጽራል — ከመነሻው ብዛት በላይ ያሉ አዲስ ስህተቶች ብቻ በሩን እንዲወድቅ ያደርጋሉ፤ ቀድሞ የነበረ ስህተት ሲስተካከል በ`--update` መነሻውን ቀስ በቀስ ያሳንሱ።                                                                                                                                                                                | አዎ                                      |

### ሥራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሠራል። ካልተሳካ ውህደትን ያግዳል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                                  | አጋጅ                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` ያመነጫል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደው የshard ሪፖርት የተገኘ ሽፋን)                                                         | አዎ (ከratchet በፊት የሚከናወን) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለው እያንዳንዱ መለኪያ እንዳልተባባሰ ያረጋግጣል (የESLint ማስጠንቀቂያዎች ≤ መነሻ መስመር፤ ሽፋን ≥ መነሻ መስመር)                               | አዎ                       |
| `check:duplication`          | የኮድ ድግግሞሽ (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው መነሻ መስመር እንዳይበልጥ ያረጋግጣል                                                              | አዎ                       |
| `check:complexity`           | በፋይል ደረጃ ያለው የcyclomatic ውስብስብነት ከተቀመጠው ከፍተኛ ገደብ እንዳያልፍ ያረጋግጣል (ዋናው ESLint `complexity` + `max-lines-per-function`)                       | አዎ                       |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ratchet (`eslint-plugin-sonarjs`) — የተለየ የESLint ማለፊያ፤ CI ሁለቱንም በአንድ `check:complexity-ratchets` ደረጃ ውስጥ አዋህዶ ያስኬዳል         | አዎ                       |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ exports / ፋይሎች ratchet (knip) ከመነሻ መስመሩ ጋር ሲነጻጸር እንዳይባባስ ያረጋግጣል                                                               | አዎ                       |
| `check:compression-budget`   | የመጭመቂያ benchmark በጀት — ለእያንዳንዱ engine የተቀመጡ ዝቅተኛ የtoken ቁጠባ ገደቦች መባባስ የለባቸውም                                                              | አዎ                       |
| `check:type-coverage`        | በመቶኛ የተተየበ ኮድ ratchet (`type-coverage`) እንዳይባባስ ያረጋግጣል፤ `typecheck:noimplicit:core`ን በአብዛኛው ይሸፍናል                                         | አዎ                       |
| `check:codeql-ratchet`       | የተከፈቱ የCodeQL ማንቂያዎች ብዛት እንዳይባባስ ያረጋግጣል (በ`gh api` ያነባል፤ token ከሌለ ያለችግር ይዘላል) — የማደሻ ድግግሞሽና በእጅ ስለማስጀመር፦ ከታች ያለውን "CodeQL ratchet" ይመልከቱ | አዎ                       |

### ሥራ፦ `quality-extended`

ሥራው በሙሉ ምክር ሰጪ ነው (`continue-on-error: true`)። npm-ላይ የተመሠረቱት ratchets በእውነት
ይሰራሉ፤ ውጫዊ scanners በ`gh release download` በኩል ይጫናሉ፣ እና binary አሁንም
ከሌለ ራሳቸውን ይዘላሉ (exit 0)።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                            | አጋጅ        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:circular-deps`    | ምንም ዑደታዊ dependencies እንደሌሉ (dpdm)                                                                                                                  | **ምክር ሰጪ** |
| `check:bundle-size`      | የbundle መጠን ከተቀመጠው ከፍተኛ ገደብ እንዳያልፍ                                                                                                                  | **ምክር ሰጪ** |
| `check:secrets`          | የምስጢር መረጃ ቅኝት (gitleaks) — binary ከሌለ ይዘላል                                                                                                          | **ምክር ሰጪ** |
| `check:vuln-ratchet`     | የdependency ተጋላጭነቶች (osv-scanner) እንዳይባባሱ ያረጋግጣል — binary ከሌለ ይዘላል                                                                                  | **ምክር ሰጪ** |
| `check:workflows`        | የworkflow lint (actionlint + zizmor) — binaries ከሌሉ ይዘላል                                                                                            | **ምክር ሰጪ** |
| `check:openapi-breaking` | በpublic API ውል (`openapi.yaml`) ላይ ከbase branch ጋር ሲነጻጸር ያሉ ሰባሪ ለውጦች (oasdiff) — `openapiBreaking=N` ያመነጫል፤ oasdiff ከሌለ ወይም base spec ሊፈታ ካልቻለ ይዘላል | **ምክር ሰጪ** |

### ሥራ፦ `docs-sync-strict`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሰራል። ካልተሳካ merge እንዳይደረግ ያግዳል።

| ስክሪፕት                          | የሚያረጋግጠው                                                                                                                           | እገዳ የሚያደርግ               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ መግቢያዎች በቅደም ተከተል የሚያስኬድ ዋና መግቢያ                                                                                     | አዎ                       |
| ↳ `check:docs-sync`            | የCHANGELOG / OpenAPI / llm.txt ስሪት ወጥነት                                                                                            | አዎ                       |
| ↳ `check:docs-counts`          | በጽሑፍ ውስጥ ያሉ ቁጥሮች (የአቅራቢዎች ብዛት፣ የፍልሰት ብዛት፣ ወዘተ) ከእውነተኛዎቹ ቁጥሮች የራቼት ክልል ውስጥ መሆናቸውን                                                   | አዎ                       |
| ↳ `check:env-doc-sync`         | በ`.env.example` ውስጥ ያለው እያንዳንዱ env var በሰነዶች ሰንጠረዥ ውስጥ መመዝገቡን፣ እንዲሁም በተቃራኒው                                                        | አዎ                       |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ የተቋረጡ የስሪት ሕብረቁምፊዎች አለመኖራቸውን                                                                                             | አዎ                       |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ ውስጣዊ markdown አገናኞች ወደ እውነተኛ ፋይሎች መድረሳቸውን (`[text]`/`(path)` ቅርጽ)                                                     | አዎ                       |
| ↳ `check:fabricated-docs`      | በሰነዶች ውስጥ የተጠቀሱ መስመሮች፣ env vars፣ CLI ትዕዛዞች፣ hook ስሞች እና የፋይል ዱካዎች በcodebase ውስጥ መኖራቸውን። በ`--strict` ከባድ መግቢያ፤ ያለዚህ flag ለስላሳ ውድቀት። | አዎ (በCI ውስጥ በ`--strict`) |
| `check:cli-i18n`               | የCLI ትዕዛዝ ሕብረቁምፊዎች በሁሉም የi18n locale ፋይሎች ውስጥ መኖራቸውን                                                                               | አዎ                       |
| `check:openapi-coverage`       | የOpenAPI ዝርዝር ቢያንስ በራቼት የተወሰነውን ዝቅተኛ የእውነተኛ መስመሮች ብዛት መሸፈኑን                                                                        | አዎ                       |
| `check:openapi-security-tiers` | በ`openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማብራሪያዎች ከ`routeGuard.ts` ምደባዎች ጋር ወጥነት እንዳላቸው                                                    | **አማካሪ**                 |
| `check:openapi-routes`         | በ`openapi.yaml` ውስጥ ያለው እያንዳንዱ path ወደ እውነተኛ `route.ts` መድረሱን (የምናባዊ ፈጠራ መከላከያ)                                                    | አዎ                       |
| `check:docs-symbols`           | በ`docs/**/*.md` ውስጥ ያለው እያንዳንዱ `/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` መድረሱን (የምናባዊ ፈጠራ መከላከያ)                                         | አዎ                       |
| `i18n translation drift`       | በi18n locale ፋይሎች ውስጥ ያልተተረጎሙ ቁልፎች — ማስጠንቀቂያ ብቻ                                                                                    | **አማካሪ**                 |

### ሥራ፦ `i18n-ui-coverage`

| ስክሪፕት                             | የሚያረጋግጠው                                                                                                                                                        | እገዳ የሚያደርግ |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (inline) | የUI i18n ቁልፍ ሽፋን ≥ 65% መሆኑን                                                                                                                                     | አዎ         |
| `check-ui-value-drift` (inline)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ጊዜ ያለፈበትን ትርጉም እንዳያስቀር                                                                                                               | አዎ         |
| `check-new-key-coverage` (inline) | **አዲስ** የእንግሊዝኛ ቁልፍ በእያንዳንዱ locale መተርጎሙን — የ`__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                                      | አዎ         |
| `check-translation-ratio`         | በእያንዳንዱ locale ያለው የእውነተኛ ትርጉም ሬሾ (ከእንግሊዝኛ ጋር ተመሳሳይ / placeholder / ከፈቀዳ ዝርዝሩ ውጭ የጎደሉ ቅጠሎች) ከ`config/quality/i18n-translation-baseline.json` + slack መብለጥ የለበትም | **አማካሪ**   |

`fetch-depth: 0` ያስፈልገዋል — የvalue-drift መግቢያ `en.json`ን ከmerge base ጋር በdiff ያወዳድራል።

#### `check-ui-value-drift` — ጊዜ ያለፈበት ትርጉም መግቢያ

ሌሎቹ መግቢያዎች በመዋቅራዊ ሁኔታ ማየት የማይችሉትን አንዱን የi18n ወደኋላ መመለስ ይይዛል፦ የእንግሊዝኛ እሴት
እንደገና ሲጻፍ፣ ከ_ቀድሞው_ እንግሊዝኛ የተገኙት ትርጉሞች በቦታቸው ይቀራሉ፤ በዚህም
እንግሊዝኛ ያልሆነ ቋንቋ ተጠቃሚዎች በእርግጠኝነት የተጻፈ ነገር ግን አሁን የተሳሳተ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእውነት ለምርት ተለቋል። የAntigravity
የመግቢያ አጋዥ ሲመጣ (#5203) `oauthModal.googleOAuthWarning` እንደገና ተጻፈ፤ **ከ43 locale 39ኙ** ኦፕሬተሮችን «ሙሉውን
URL ገልብጠው ከታች እንዲለጥፉት» የሚነግር ጽሑፍ አስቀሩ — ለዚያ አቅራቢ ሊጠናቀቅ የማይችል ፍሰት ነው። ይህም
እስከ #8463 ድረስ ሳይስተዋል የቀረው፦

- `sync-ui-keys` የሚሞላው **የሌሉ** ቁልፎችን ብቻ ነው፤ **ጊዜ ያለፈባቸውን** ፈጽሞ አይሞላም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ይቆጥራል፣ ስለዚህ ጊዜ ያለፈበት ትርጉም እንደተሸፈነ ነጥብ ያገኛል፤
- `check-translation-drift` የ`docs/i18n/<locale>/**.md` ሰነድ ቅጂዎችን ይከታተላል —
  `src/i18n/messages/*.json`ን ፈጽሞ አያነብም። ከ2026-09 ዳግም ማመሳሰል ጀምሮ በ`docs-sync-strict` ሥራ ውስጥ እገዳ ያደርጋል፦ ዋና ሰነድ ያርትዑ → `npm run i18n:run -- --files=<doc>` (በክፍል ደረጃ፣ ዝቅተኛ ወጪ)።

**ልዩነትን የሚያውቅ እንጂ baseline ላይ የተመሠረተ አይደለም።** በmerge base ላይ ያለውን `en.json` ከworking tree ጋር ያነጻጽራል፤ የእንግሊዝኛ ዋጋው ለተለወጠ እያንዳንዱ key፣ ያልተነካ ትርጉም ይዞ የቀረ ማንኛውም locale ጊዜ ያለፈበት ነው። ይህ ሆን ተብሎ **ከዚህ ቀደም የነበረውን ዕዳ ያቆማል** — ልዩነት ለረጅም ጊዜ የቆየ ትርጉም ከየትኛው የድሮ እንግሊዝኛ እንደመጣ ሊያሳይ ስለማይችል፣ gate የሚገመግመው የአሁኑ ለውጥ የነካውን ብቻ ነው። አማራጩ (ለእያንዳንዱ key የhash baseline) በእያንዳንዱ i18n PR ላይ የሚለዋወጥ፣ ከነባሩ ትልቁ baseline 3× የሚበልጥ፣ በግምት 600 KB የሚሆን generated file ይጠይቃል።

ይህን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተነኩትን ትርጉሞች ያዘምኑ፣ ወይም
2. ወደ `__MISSING__:<new english>` ያዘጋጇቸው — runtime ከዚያ የታረመውን እንግሊዝኛ ያቀርባል
   (`src/i18n/request.ts::deepMergeFallback`፣ #7258) እና key ለትርጉም ወረፋ ውስጥ ይገባል።

የstring **ትርጉም** ከተለወጠ፣ **key-ውን እንደገና መሰየምን** ይምረጡ፦ አዲስ key ጊዜ ያለፈበትን ትርጉም ሊወርስ አይችልም። #8463 የተጠቀመው ንድፍ ይህ ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያስኬደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የbase catalog ሊነበብ በማይችልበት ጊዜ (base ref የሌለው shallow clone)፣ `check-openapi-breaking`ን በመከተል `SKIP reason=base-unresolved` የሚለውን ይዞ በ0 ይወጣል።

### Job፦ `i18n`

ሙሉ የi18n ማረጋገጫ matrix (ለእያንዳንዱ locale አንድ job)። ሙሉው job አማካሪ ነው።

| Script                          | የሚያረጋግጠው                  | እገዳ                                              |
| ------------------------------- | ------------------------- | ------------------------------------------------ |
| `validate_translation.py quick` | በእያንዳንዱ locale የትርጉም ሙሉነት | **አማካሪ** (በሙሉው job ላይ `continue-on-error: true`) |

### Job፦ `pr-test-policy`

በpull request ላይ ብቻ ይሠራል።

| Script                 | የሚያረጋግጠው                                                                                                               | እገዳ |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | በ`src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ production code የሚለውጡ PR-ዎች test-ዎችን ማካተት ወይም ማዘመን አለባቸው (ጥብቅ ደንብ #8) | አዎ  |
| `check:test-masking`   | የተለወጡ test file-ዎች የተጣራ assert ብዛትን አይቀንሱም ወይም `assert.ok(true)` tautology-ዎችን አይጨምሩም                                  | አዎ  |
| `check:pr-evidence`    | የPR ይዘት ለለውጡ የtest/VPS ማስረጃን ይጠቅሳል (የPR ጽሑፍን grep በማድረግ ጥብቅ ደንብ #18ን በራስ-ሰር ያስፈጽማል — ተሰባሪ ነው፣ Backlogን ይመልከቱ)          | አዎ  |

### Job፦ `test-vitest`

ከ`build` በኋላ ይሠራል። ካልተሳካ መዋሃድን ያግዳል።

| Suite            | የሚያረጋግጠው                                                 | እገዳ                                                                                           |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools)፣ autoCombo፣ cache — vitest runner | አዎ                                                                                            |
| `test:vitest:ui` | የUI component test-ዎች — vitest runner                    | **አጋጅ** — ከዚህ ቀደም የነበሩ አለመሳካቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዳዲስ አለመሳካቶች job-ውን ያሳክታሉ |

### የምሽት workflows (በጊዜ ሰሌዳ፣ አማካሪ)

እነዚህ በcron የጊዜ ሰሌዳ (እና `workflow_dispatch`) ይሠራሉ፣ በPR-ዎች ላይ ፈጽሞ አይሠሩም። ሁሉም አማካሪ ናቸው።

| Workflow               | የሚያረጋግጠው                                                                                                                                   | እገዳ      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `nightly-property`     | የfast-check property test-ዎች በrandom seed + ከፍተኛ የrun ብዛት                                                                                  | **አማካሪ** |
| `nightly-resilience`   | የheap-growth gate፣ chaos fault-injection፣ k6 load/soak                                                                                     | **አማካሪ** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probe-ዎች (የprovider secret ከሌለ ይዘለላሉ)                                                       | **አማካሪ** |
| `nightly-schemathesis` | `docs/openapi.yaml`ን በመጠቀም በቀጥታ በሚሠራ OmniRoute ላይ OpenAPI contract fuzzing (schemathesis) — የspec ጥሰቶችን / ያልተያዙ 500-ዎችን ያጋልጣል (Fase 8 B.4) | **አማካሪ** |
| `nightly-mutation`     | በፈጣኑ unit lane ላይ የStryker mutation-testing ውጤት — የተረፉ mutant-ዎች ደካማ assert-ዎችን ያጋልጣሉ                                                      | **አማካሪ** |
| `nightly-compat`       | በሚደገፉት `engines.node` range-ዎች ሁሉ ላይ የNode engine compatibility matrix                                                                     | **አማካሪ** |

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
