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

## የጌት ዝርዝር እና የአፈጻጸም መገለጫዎች

### የእጩ ተቀባይነት

የCI እና Quality Gates የስራ ፍሰቶች እያንዳንዳቸው የማይለወጥ ውሳኔ ያወጣሉ፦ `Gate / CI` እና
`Gate / Quality`። በስሪት የሚተዳደረው የተቀባይነት ፖሊሲያቸው እያንዳንዱን የላይኛው ደረጃ ስራ
እንደ አስፈላጊ ወይም አማካሪ ይዘረዝራል። ተፈጻሚ የሆነ አስፈላጊ ስራ መሳካት አለበት፦ የጎደሉ፣
የተሰረዙ፣ የታለፉ፣ በመጠባበቅ ላይ ያሉ እና ያልታወቁ ውጤቶች PASSን ማረጋገጥ አይችሉም። ትክክለኛ
docs-only ወይም catalog-only ምደባ የኮድ መስመርን ተፈጻሚ ያልሆነ ሊያደርገው ይችላል፤
ረቂቅ PR ተቀባይነት ያገኘ እጩ አይደለም። የ`hotfix` መለያ ማስረጃን አያስቀርም።

ሁለቱም የስራ ፍሰቶች PRዎችን፣ ወደ main/release ቅርንጫፎች የሚደረጉ pushesን፣ manual dispatchን እና
merge-group ክስተቶችን ይሸፍናሉ። Push፣ dispatch እና merge-group ሙሉውን ምርጫ ያስኬዳሉ። Forks
እና merge groups በሌላ ሁኔታ self-hosted runnersን ለሚመርጡ ስራዎች hosted runnersን ይጠቀማሉ፤
ከማሰማራት በፊት በቂ hosted አቅም መኖሩ መረጋገጥ አለበት።

እያንዳንዱ JSON ደረሰኝ checked-out SHAን፣ workflow runን እና attemptን ይለያል።
CLIው የcheckout/event SHA አለመዛመድን ውድቅ ያደርጋል። የስራ ፍሰት ሙከራዎች የፖሊሲ አባልነትን
ከውሳኔ ስራው `needs` ዝርዝር ጋር ያስተሳስራሉ፣ ስለዚህ አዲስ ወይም የተወገደ መስመር በዝምታ ሊጠፋ አይችልም።
ደረሰኞቹ የሚሸፍኑት የራሳቸውን የስራ ፍሰት እንጂ ህትመትን፣ deploymentን ወይም የነባር አማካሪ scanner ውስጣዊ
አሰራሮችን አይደለም። ሁለቱንም የcheck ስሞች በbranch rules ውስጥ ማንቃት የተለየ አስተዳደራዊ ለውጥ ነው፤
እነዚህን ስራዎች መጨመር በራሱ ቅርንጫፍን አይጠብቅም።

### የስታቲክ ቅኝት ዝርዝር

በስሪት የሚተዳደረው የnpm-alias ዝርዝር እና የstatic-scan አባልነት በ
`config/quality/gate-manifest.json` ውስጥ ይገኛሉ። የscript ስሞችን እና ትክክለኛ ትዕዛዞችን ከ`package.json` ጋር
ለማረጋገጥ `npm run check:gate-manifest`ን ያስኪዱ፤ መጨመሮች፣ ማስወገዶች እና
የትዕዛዝ ለውጦች ሁለቱንም local hook እና በCI ውስጥ ያሉትን የchange-classification ስራዎች ያሳክታሉ።
alias የworkflow ስራ፣ matrix instance ወይም test case አይደለም፦ እነዚህ ቁጥሮች
በአንድ ዓይነት ሊቀርቡ አይገባም።

የተመረጡትን aliases ሳያስኬዷቸው ለመመርመር `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list`ን
ይጠቀሙ። runnerው የnpm entrypointን ይጠራል፣ ስለዚህ runtimeው (በተዋቀረበት ቦታ Bunን ጨምሮ) እንዳለ ይጠበቃል።
manifestው ከእነዚያ መገለጫዎች ውጭ ያሉ aliasesን በተናጠል እንደሚጠሩ ይመዘግባል፣ እና
የጥገና ትዕዛዞች በread-only የቅኝት መገለጫዎች ውስጥ የተከለከሉ ናቸው።

እነዚህ መገለጫዎች የሚሸፍኑት የስታቲክ ቅኝትን ብቻ ነው። የምርት ሙከራዎችን፣
coverageን፣ packagingን፣ ውጫዊ checksን ወይም የእጩን ሙሉ የrelease ተቀባይነት አያረጋግጡም።
የስራ ፍሰት ተቀባይነት የተገናኘውን `config/quality/admission-policy.json` እና
`scripts/quality/admission-verdict.mjs` ይጠቀማል። የRelease-observer መገለጫዎች ተለይተው ይቆያሉ፤
ተፈጻሚ checksና ደረሰኞቻቸውን በተናጠል ይመርምሩ። ከታች ያለው ገላጭ
ዝርዝር ማጣቀሻ እንጂ አንድ gate በትክክል እንደተሰራ ማረጋገጫ አይደለም።

Scripts በ`scripts/check/` (የፖሊሲ gates) እና `scripts/quality/` (ratchet engine) ስር ይገኛሉ።
የCI ዋና የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` በmain/release PRዎች፣ ወደ የተጠበቁ ቅርንጫፎች በሚደረጉ
pushes፣ dispatch እና merge groups ላይ CIን ያሟላል። PRዎች በpath የተጣሩ ፈጣን checksን ይጠቀማሉ። በቋሚነት
የተሰናከለው የተባዛ build ተወግዷል፤ እውነተኛዎቹ build/package/boot checks በCI ውስጥ ይቀራሉ።

| ስራ                                               | ወሰን                                                                                                                                                                       | አጋጅ            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRዎች፤ የAPI docs refs እና docs-all                                                                                                                                | አዎ             |
| `Fast Quality Gates`                             | Code PRዎች፤ static checks፣ typecheck፣ dashboard typecheck፣ ተጽዕኖ የደረሰባቸው unit tests                                                                                         | አዎ             |
| `Forgotten sibling tests`                        | Code PRዎች፤ የተለወጡ modules ወደ static consumers እና candidate sibling tests ይከታተላሉ፤ barrel እና dynamic-import paths ከተጠቀሱት allowlist exceptions ጋር እንደ አማካሪ diagnostics ይመዘገባሉ | **አማካሪ**       |
| `Vitest (fast-path)`                             | Code PRዎች፤ ፈጣን vitest suite                                                                                                                                               | አዎ             |
| `Unit Tests fast-path`                           | Code PRዎች፤ ባለ4-shard unit suite                                                                                                                                           | አዎ             |
| `No new ESLint warnings`                         | Code PRዎች፤ suppressions-aware lint guard                                                                                                                                  | አዎ፣ forksን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆኑ PRዎች፤ changelog እና generated skill sync                                                                                                                          | አዎ፣ forksን ጨምሮ |

#### የተረሱ sibling tests ሪፖርት

`npm run check:forgotten-sibling-tests` ከtest-impact map ጀርባ ያለውን import resolver እንደገና ይጠቀማል።
ለእያንዳንዱ የተለወጠ production module፣ እጩው
test በpull-request diff ውስጥ በማይኖርበት ጊዜ ወጥነት ያላቸውን `changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶች ይመዘግባል።
የMarkdown ማጠቃለያው እና JSON ውጤቱ ማንኛውም አጋጅ ማሰማራት ከመደረጉ በፊት ለcalibration እንደ
`forgotten-sibling-tests` የworkflow artifact ተይዘው ይቆያሉ።

Barrel re-exports እና dynamic imports የresolution ምርመራዎች ብቻ ናቸው፤ መቼም
የሚያግድ ግኝት አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ ግቤት consumer-ን እና candidate
test-ን መጥቀስ፣ የተወሰነ ምክንያት መስጠት እና ወደ GitHub issue ወይም pull request ማገናኘት አለበት። ቅርጸታቸው የተበላሸ ግቤቶች
በነባሪነት ይከለከላሉ። ልዩ ሁኔታዎች የተሰረዘ candidate test-ን ወይም `.skip`/`.todo` የሚጨምር diff-ን ማፈን አይችሉም፤
assertion weakening እና ሌሎች masking ዘዴዎች አሁንም ራሱን ችሎ የሚያግደው
`check:test-masking` gate ኃላፊነት ናቸው።

### ሥራ፦ `lint`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሰራል። ካልተሳካ merge እንዳይደረግ ያግዳል።

| Script (`npm run ...`)            | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አጋጅ                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                      |
| `check:cycles`                    | በሁሉም `src/` + `open-sse/` ውስጥ ያሉ circular imports (በAST ላይ የተመሠረተ፣ የtsconfig `paths` የተፈቱ)። ብቻውን ሲሰራ = ምክር ሰጪ ሲሆን cycles-ን ይዘረዝራል። `check:cycles:ratchet` (CI የሚያስኬደው) ብዛቱ በ`quality-baseline.json` ውስጥ ያለውን የ`metrics.cycles` ጣሪያ ሲያልፍ ያግዳል — በአሁኑ ጊዜ 14፣ `direction: down` ስለሆነ መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ (ratchet)                            |
| `check:route-validation:t06`      | በሁሉም routes ላይ የZod schemas መኖራቸውን (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                      |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከተፈቀደው budget እንደማይበልጥ (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:provider-consistency`      | `providers.ts` ውስጥ ያለው እያንዳንዱ provider `providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እንዲሁም በተቃራኒው፣ በallowlist ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                      |
| `check:model-lifecycle`           | ሦስቱ በእጅ የሚጠበቁ routing table-ዎች ከተመዘገበው lifecycle snapshot (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`)፣ `REGISTRY` route ሊያደርገው ለሚችል ከአገልግሎት የወጣ id ነጥብ አይሰጥም፤ እያንዳንዱ `BUILT_IN_ALIASES` target በ`REGISTRY` ውስጥ ይገኛል እና ከretired-id snapshot ውስጥ አይገኝም፤ አሁንም `REGISTRY` ውስጥ ያለ እያንዳንዱ ከአገልግሎት የወጣ id ወደ ሌላ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ይዘረዘራል፤ እንዲሁም ምንም የ`DEFAULT_DEGRADATION_MAP` source ወይም target በዚያ snapshot ውስጥ ከአገልግሎት እንደወጣ አይታይም። ይህ፣ አንድ model በአሁኑ ጊዜ በቀጥታ upstream እየቀረበ መሆኑን አያረጋግጥም። Offline — በ`config/quality/model-lifecycle.json` ላይ በማነጻጸር ይሰራል፤ ይህም በእጅ `npm run quality:refresh-model-lifecycle` በመጠቀም ይታደሳል (network፤ ከCI ጋር አልተገናኘም)። `allowedRetiredInCatalog` የburn-down ratchet ነው፦ ግቤት ያክሉ ከtracking issue ጋር ብቻ። | አዎ                                      |
| `check:fetch-targets`             | በclient-side `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                      |
| `check:deps`                      | በrepo ውስጥ ባለው እያንዳንዱ `package.json` ውስጥ `npm install` ሊደረጉ የሚችሉ ሁሉም deps በ`dependency-allowlist.json` ውስጥ አሉ፤ አዲስ unpinned ወይም slopsquatted package-ዎች ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                      |
| `audit:deps`                      | `npm audit` (root + electron) — ከፍተኛ/ወሳኝ advisories የሉም (ከosv `check:vuln-ratchet` ጋር ይደራረባል፤ Rationalization Backlogን ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                      |
| `check:lockfile`                  | የ`package-lock.json` ትክክለኛነት — https registry፣ integrity hashes፣ ምንም host overrides የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:licenses`                  | ለምርት ጥገኞች የSPDX ፈቃድ የተፈቀዱ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                      |
| `check:tracked-artifacts`         | ምንም የግንባታ ቅሪቶች / የተመዘገቡ `node_modules` ምሳሌያዊ አገናኞች የሉም (በተጨማሪም በhusky pre-commit ውስጥ ይሰራል፤ pre-push ሆን ተብሎ ቀላል ተደርጓል — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                      |
| `check:ai-attribution`            | በPR commits፣ title ወይም body ውስጥ የAI/bot `Co-Authored-By` trailer ወይም የAI ማመንጨት footer የለም — ጥብቅ ደንብ #16 (ለPR→`release/**` በ`quality.yml` fast-gates loop ውስጥ — event payloadን ያነባል፣ PR ካልሆነ no-op ይሆናል — እና ለPR→`main` በ`ci.yml` lint ውስጥ ያለ PR-ብቻ step፤ እንዲሁም የhusky `commit-msg` hook፤ ሰብዓዊ co-authors ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest exclusion የመከታተያ issueን ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይገኛል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                      |
| `check:file-size`                 | ምንም source file በextension የተወሰነውን ከፍተኛ ገደብ አያልፍም (ratchet፦ የተቆለፉ ትልልቅ files በ`frozen` list ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                      |
| `check:error-helper`              | በexecutors/handlers ውስጥ ያሉ error responses `buildErrorBody()` / `sanitizeErrorMessage()`ን ይጠቀማሉ (ጥብቅ ደንብ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                      |
| `check:migration-numbering`       | የMigration SQL ፋይሎች ያለ ክፍተት ወይም ድግግሞሽ በቅደም ተከተል ቁጥር ተሰጥቷቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                      |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቀጥተኛ የOAuth `client_id`/`client_secret` ወይም የFirebase Web ቁልፎች የሉም (ጥብቅ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                      |
| `check:db-rules`                  | ከ`src/lib/db/` ሞጁሎች ውጭ ቀጥተኛ SQL የለም፤ ከ`localDb.ts` የbarrel-imports የሉም (ጥብቅ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:known-symbols`             | በdispatch ሰንጠረዦቻቸው ውስጥ የተመዘገቡ የአቅራቢ አስፈጻሚዎች፣ የማዘዋወሪያ ስልቶች እና ተርጓሚዎች በዲስክ ላይ ካሉት ፋይሎች ጋር ይዛመዳሉ — ወላጅ አልባ ወይም ያልታወጁ ምልክቶች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                      |
| `check:route-guard-membership`    | ንዑስ ሂደትን የሚጀምር እያንዳንዱ route በ`isLocalOnlyPath()` ተመድቧል (ጥብቅ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                      |
| `check:test-discovery`            | በrepo ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ የሙከራ አስኪያጅ ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው የወላጅ አልባ ፋይሎች ዝርዝር መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                      |
| `check:agent-skills-sync`         | የተፈጠሩ agent-skills አርቲፋክቶች ከምንጭ ካታሎጋቸው ጋር ይዛመዳሉ (ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | የአቅራቢ አርማዎች/ንብረቶች የተመዘገበ የምንጭ መረጃ ግቤት አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | የJSON ውቅር ፋይሎች ያለ ስህተት ይተነተናሉ፣ እንዲሁም የrepo lint ደንቦችን ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | የTypeScript ማጠናቀር ያለ ስህተት (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                      |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊትን ያማከለ፤ ከዚህ ቀደም የነበሩ ብዙ የጥሪ ቦታዎች አሁንም ማብራሪያ ያስፈልጋቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **የምክር ብቻ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | በ`src/app/(dashboard)/**` (#7033) ላይ የተወሰነ `tsc` — የ`typecheck:core` በጥንቃቄ የተመረጠው የ27 ፋይሎች allowlist ምንም dashboard TSX አያካትትም፣ እንዲሁም `next build` እሱን ፈጽሞ type-check አያደርገውም (`next.config.mjs` `ignoreBuildErrors: true` ያዘጋጃል)፤ ስለዚህ በዚያ ያሉ የተተዉ-መለያ መመለሻ ስህተቶች (#6625/#6909) ለCI የማይታዩ ነበሩ። ልዩነቶቹ ከቀዘቀዘው የእያንዳንዱ-ፋይል/የእያንዳንዱ-TS-ኮድ ብዛት መነሻ (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የጊዜ-ያለፈበት ማስገደጃ ንድፍ) ጋር ይነጻጸራሉ — ከመነሻው ብዛት በላይ ያሉ አዲስ ስህተቶች ብቻ በሩን ያሳንፋሉ፤ ቀድሞ የነበረ ስህተት ሲስተካከል በ`--update` መነሻውን ወደ ታች ያስተካክሉ።                                                                                                                                                                                                            | አዎ                                      |

### ስራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሰራል። ካልተሳካ ውህደትን ይከለክላል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                                    | የሚያግድ                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` ያመነጫል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደው shard ሪፖርት የተገኘ ሽፋን)                                                            | አዎ (ከratchet በፊት የሚከናወን) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለው እያንዳንዱ መለኪያ ወደ ኋላ አለመመለሱን ያረጋግጣል (የESLint ማስጠንቀቂያዎች ≤ መነሻ መስመር፤ ሽፋን ≥ መነሻ መስመር)                            | አዎ                       |
| `check:duplication`          | የኮድ መደጋገም (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው መነሻ መስመር አይበልጥም                                                                        | አዎ                       |
| `check:complexity`           | የፋይል ደረጃ cyclomatic complexity ከገደቡ አይበልጥም (ዋናው ESLint `complexity` + `max-lines-per-function`)                                             | አዎ                       |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ratchet (`eslint-plugin-sonarjs`) — የተለየ የESLint ማለፊያ፤ CI ሁለቱንም በአንድ `check:complexity-ratchets` ደረጃ ውስጥ አዋህዶ ያስኬዳል           | አዎ                       |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ exports / ፋይሎች ratchet (knip) ከመነሻ መስመሩ አንጻር ወደ ኋላ አይመለስም                                                                       | አዎ                       |
| `check:compression-budget`   | የመጭመቂያ ቤንችማርክ በጀት — ለእያንዳንዱ engine የtoken ቁጠባ ዝቅተኛ ገደቦች ወደ ኋላ መመለስ የለባቸውም                                                                   | አዎ                       |
| `check:type-coverage`        | በዓይነት የተገለጸው መቶኛ ratchet (`type-coverage`) ወደ ኋላ አይመለስም፤ `typecheck:noimplicit:core`ን በአብዛኛው ያካትታል                                          | አዎ                       |
| `check:codeql-ratchet`       | የተከፈቱ CodeQL ማንቂያዎች ብዛት ወደ ኋላ አይመለስም (በ`gh api` ያነባል፤ token ከሌለ ችግር ሳይፈጥር ይዘላል) — የማደሻ ድግግሞሽ እና በእጅ ማስጀመሪያ፦ ከታች ያለውን "CodeQL ratchet" ይመልከቱ | አዎ                       |

### ሥራ፦ `quality-extended`

ሙሉው ሥራ አማካሪ ነው (`continue-on-error: true`)። በnpm ላይ የተመሠረቱ ratchets በተግባር
ይሠራሉ፤ ውጫዊ scanners በ`gh release download` በኩል ይጫናሉ፣ binary አሁንም ከሌለም
በራሳቸው ይዘላሉ (exit 0)።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                                                               | የሚያግድ                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | ምንም ዑደታዊ dependencies የሉም (dpdm)                                                                                                                                                       | **አማካሪ**                                     |
| `check:bundle-size`      | የbundle መጠን ከገደቡ አይበልጥም                                                                                                                                                                | **አማካሪ**                                     |
| `check:secrets`          | የምስጢሮች ቅኝት (gitleaks) — binary ከሌለ ይዘላል                                                                                                                                                | **አማካሪ**                                     |
| `check:vuln-ratchet`     | የdependency ተጋላጭነቶች (osv-scanner) ወደ ኋላ አይመለሱም — binary ከሌለ ይዘላል                                                                                                                       | **አማካሪ**                                     |
| `check:workflows`        | የworkflow lint (actionlint + zizmor)፤ የጠፉ/የተበላሹ scanners፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደለ ratchet መነሻ መስመር INCOMPLETE በሚል እንዲወድቅ ያደርጋሉ። ትክክለኛ ግኝቶች የተመረጠውን strict/advisory/ratchet policy ይከተላሉ | መፈጸም ያስፈልጋል፤ zizmor ratchet በCI ውስጥ የሚያግድ ነው |
| `check:openapi-breaking` | ከመሠረታዊው branch (oasdiff) ጋር ሲነጻጸር በይፋዊው API contract (`openapi.yaml`) ላይ ያሉ አፍራሽ ለውጦች — `openapiBreaking=N` ያመነጫል፤ oasdiff ከሌለ ወይም መሠረታዊው spec ሊፈታ ካልቻለ ይዘላል                           | **አማካሪ**                                     |

### ሥራ፦ `docs-sync-strict`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሠራል። ካልተሳካ ውህደትን ያግዳል።

| ስክሪፕት                          | የሚያረጋግጠው                                                                                                                                    | አጋጅ                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ-ጌቶች በቅደም ተከተል የሚያስኬድ ሜታ-ጌት                                                                                                   | አዎ                           |
| ↳ `check:docs-sync`            | የCHANGELOG / OpenAPI / llm.txt ስሪት ወጥነት                                                                                                     | አዎ                           |
| ↳ `check:docs-counts`          | በጽሑፍ ውስጥ ያሉ ቁጥሮች (የአቅራቢዎች ብዛት፣ የፍልሰት ብዛት፣ ወዘተ) ከእውነተኛዎቹ ቁጥሮች የራቼት ክልል ውስጥ መሆናቸውን                                                            | አዎ                           |
| ↳ `check:env-doc-sync`         | በ`.env.example` ውስጥ ያለ እያንዳንዱ የአካባቢ ተለዋዋጭ በሰነዶች ሰንጠረዥ ውስጥ መመዝገቡን፣ እንዲሁም በተቃራኒው                                                              | አዎ                           |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ የተቋረጡ የስሪት ሕብረቁምፊዎች አለመኖራቸውን                                                                                                      | አዎ                           |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ ውስጣዊ markdown አገናኞች ወደ እውነተኛ ፋይሎች መድረሳቸውን (`[text]`/`(path)` ቅርጸት)                                                             | አዎ                           |
| ↳ `check:fabricated-docs`      | በሰነዶች ውስጥ የተጠቀሱ መስመሮች፣ የአካባቢ ተለዋዋጮች፣ የCLI ትዕዛዞች፣ የhook ስሞች እና የፋይል ዱካዎች በኮድ ማከማቻው ውስጥ መኖራቸውን። በ`--strict` በኩል ጠንካራ ጌት፤ ያለ ይህ ጥቆማ ለስላሳ-ውድቀት። | አዎ (በCI ውስጥ በ`--strict` በኩል) |
| `check:cli-i18n`               | የCLI ትዕዛዝ ሕብረቁምፊዎች በሁሉም የi18n አካባቢ ፋይሎች ውስጥ መኖራቸውን                                                                                          | አዎ                           |
| `check:openapi-coverage`       | የOpenAPI ዝርዝር መግለጫ ቢያንስ ራቼት የተደረገ ዝቅተኛ የእውነተኛ መስመሮች ብዛት መሸፈኑን                                                                               | አዎ                           |
| `check:openapi-security-tiers` | በ`openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማብራሪያዎች ከ`routeGuard.ts` ምደባዎች ጋር ወጥነት እንዳላቸው                                                             | **ምክር ሰጪ**                   |
| `check:openapi-routes`         | በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ ዱካ ወደ እውነተኛ `route.ts` መድረሱን (ምናባዊ መረጃን ለመከላከል)                                                               | አዎ                           |
| `check:docs-symbols`           | በ`docs/**/*.md` ውስጥ ያለ እያንዳንዱ የ`/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` መድረሱን (ምናባዊ መረጃን ለመከላከል)                                                 | አዎ                           |
| `i18n translation drift`       | በi18n አካባቢ ፋይሎች ውስጥ ያልተተረጎሙ ቁልፎች — ማስጠንቀቂያ ብቻ                                                                                               | **ምክር ሰጪ**                   |

### ሥራ፦ `i18n-ui-coverage`

| ስክሪፕት                               | የሚያረጋግጠው                                                                                                                                                        | አጋጅ        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (ውስጠ-መስመር) | የUI i18n ቁልፍ ሽፋን ≥ 65% መሆኑን                                                                                                                                     | አዎ         |
| `check-ui-value-drift` (ውስጠ-መስመር)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ጊዜ ያለፈበት ትርጉም እንዳያስቀር                                                                                                                | አዎ         |
| `check-new-key-coverage` (ውስጠ-መስመር) | **አዲስ** የእንግሊዝኛ ቁልፍ በእያንዳንዱ አካባቢ መተርጎሙን — የ`__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                                        | አዎ         |
| `check-translation-ratio`           | በእያንዳንዱ አካባቢ ያለው የእውነተኛ-ትርጉም ጥምርታ (ከእንግሊዝኛ ጋር ተመሳሳይ / ቦታ ያዥ / ከተፈቀዱት ዝርዝር ውጭ የጎደሉ ቅጠሎች) ከ`config/quality/i18n-translation-baseline.json` + ተጨማሪ ክፍተት መብለጥ የለበትም | **ምክር ሰጪ** |

`fetch-depth: 0` ያስፈልገዋል — የእሴት-ለውጥ ጌቱ `en.json`ን ከውህደት መነሻው ጋር ያነጻጽራል።

#### `check-ui-value-drift` — ጊዜ ያለፈበት-ትርጉም ጌት

ሌሎቹ ጌቶች በመዋቅራዊ መንገድ ሊያዩት የማይችሉትን አንድ የi18n ድግግሞሽ ስህተት ይይዛል፦ አንድ የእንግሊዝኛ እሴት
እንደገና ሲጻፍ እና ከ_ቀድሞው_ እንግሊዝኛ የተወሰዱት ትርጉሞች ሳይቀየሩ ሲቀሩ፣
እንግሊዝኛ ያልሆነ ቋንቋ ተጠቃሚዎች በእርግጠኝነት የተጻፈ ነገር ግን አሁን የተሳሳተ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእውነት ለምርት ተለቋል። የAntigravity
የመግቢያ አጋዥ ሲጨመር (#5203) `oauthModal.googleOAuthWarning` እንደገና ተጻፈ፤ **ከ43 አካባቢዎች 39ኙ** ኦፕሬተሮችን «ሙሉውን URL ገልብጠው ከታች እንዲለጥፉት» የሚነግር ጽሑፍ አቆዩ — ለዚያ አቅራቢ ሊጠናቀቅ የማይችል ሂደት። ይህም
እስከ #8463 ድረስ ሳይስተዋል ቀረ፣ ምክንያቱም፦

- `sync-ui-keys` የሚሞላው **የጎደሉ** ቁልፎችን ብቻ ነው፣ **ጊዜ ያለፈባቸውን** በፍጹም አይሞላም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ስለሚቆጥር፣ ጊዜ ያለፈበት ትርጉም እንደተሸፈነ ይቆጠራል፤
- `check-translation-drift` የ`docs/i18n/<locale>/**.md` የሰነድ ነጸብራቆችን ይከታተላል —
  `src/i18n/messages/*.json`ን በፍጹም አያነብም። ከ2026-09 ዳግም-ማመሳሰል ጀምሮ በ`docs-sync-strict` ሥራ ውስጥ አጋጅ ነው፦ ዋና ሰነድን አርትዕ → `npm run i18n:run -- --files=<doc>` (በክፍል ደረጃ፣ አነስተኛ ወጪ ያለው)።

**ልዩነትን የሚያገናዝብ እንጂ በመነሻ መስመር የማይደገፍ።** በውህደት መነሻው ላይ ያለውን `en.json` ከስራ ዛፉ ጋር ያወዳድራል፤
የእንግሊዝኛ እሴቱ ለተቀየረው እያንዳንዱ ቁልፍ፣ ያልተነካ ትርጉም የያዘ ማንኛውም አካባቢያዊ ቋንቋ
ጊዜ ያለፈበት ነው። ይህ ሆን ብሎ **ቀድሞ የነበረውን ዕዳ ያቆማል** — ልዩነት
ለረጅም ጊዜ የቆየ ትርጉም ከየትኛው የቀድሞ እንግሊዝኛ እንደመጣ ማሳየት ስለማይችል፣ መግቢያ መቆጣጠሪያው
የአሁኑ ለውጥ የሚነካውን ብቻ ይገመግማል። አማራጩ (ለእያንዳንዱ ቁልፍ የhash መነሻ መስመር) ወደ
~600 KB የሚጠጋ የሚመነጭ ፋይል ይጠይቃል፤ ይህም ካለው ትልቁ መነሻ መስመር 3× ሲሆን፣ በእያንዳንዱ i18n PR ላይ ይለዋወጣል።

ይህን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተነኩትን ትርጉሞች ያዘምኑ፣ ወይም
2. ወደ `__MISSING__:<new english>` ያቀናብሯቸው — ከዚያ runtime የታረመውን እንግሊዝኛ
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ያቀርባል፣ እና ቁልፉ ለትርጉም ወረፋ ይይዛል።

የሕብረቁምፊው **ትርጉም** ከተቀየረ፣ **ቁልፉን እንደገና መሰየም** ይመረጣል፦ አዲስ ቁልፍ
ጊዜ ያለፈበትን ትርጉም ሊወርስ አይችልም። #8463 የተጠቀመው ስርዓተ ጥለት ይህ ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያስኬደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

መነሻ ካታሎጉ ሊነበብ በማይችልበት ጊዜ (የመነሻ ref የሌለው shallow
clone) `check-openapi-breaking`ን በመከተል፣ `SKIP reason=base-unresolved` ከሚለው ጋር በ0 ይወጣል።

### ስራ፦ `i18n`

ሙሉ የi18n ማረጋገጫ ማትሪክስ (ለእያንዳንዱ አካባቢያዊ ቋንቋ አንድ ስራ)። ሙሉው ስራ አማካሪ ነው።

| ስክሪፕት                           | የሚያረጋግጠው                      | አጋጅ                                             |
| ------------------------------- | ----------------------------- | ----------------------------------------------- |
| `validate_translation.py quick` | የትርጉም ሙሉነት በእያንዳንዱ አካባቢያዊ ቋንቋ | **አማካሪ** (በሙሉው ስራ ላይ `continue-on-error: true`) |

### ስራ፦ `pr-test-policy`

በpull requestዎች ላይ ብቻ ይሰራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                           | አጋጅ |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | --- |
| `check:pr-test-policy` | በ`src/`፣ `open-sse/`፣ `electron/`፣ ወይም `bin/` ውስጥ ያለ የምርት ኮድን የሚቀይሩ PRዎች ሙከራዎችን ማካተት ወይም ማዘመን አለባቸው (ጥብቅ ደንብ #8)   | አዎ  |
| `check:test-masking`   | የተቀየሩ የሙከራ ፋይሎች አጠቃላይ የassert ብዛትን እንዳይቀንሱ ወይም የ`assert.ok(true)` tautologyዎችን እንዳይጨምሩ                             | አዎ  |
| `check:pr-evidence`    | የPR ይዘት ለለውጡ የtest/VPS ማስረጃን እንዲጠቅስ (የPR ጽሑፍን በgrep በመፈለግ ጥብቅ ደንብ #18ን በራስ-ሰር ይተገብራል — ደካማ ነው፣ የኋላ ስራ ዝርዝርን ይመልከቱ) | አዎ  |

### ስራ፦ `test-vitest`

ከ`build` በኋላ ይሰራል። ሲከሽፍ ውህደትን ያግዳል።

| ስብስብ             | የሚያረጋግጠው                                                 | አጋጅ                                                                                 |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሳሪያዎች)፣ autoCombo፣ cache — vitest runner | አዎ                                                                                  |
| `test:vitest:ui` | የUI ክፍሎች ሙከራዎች — vitest runner                           | **አጋጅ** — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዳዲስ ውድቀቶች ስራውን ያወድቃሉ |

### የምሽት workflows (የጊዜ ሰሌዳ ያላቸው፣ አማካሪ)

እነዚህ በcron የጊዜ ሰሌዳ (እና `workflow_dispatch`) ይሰራሉ፣ በPRዎች ላይ በፍጹም አይሰሩም። ሁሉም አማካሪ ናቸው።

| Workflow               | የሚያረጋግጠው                                                                                                                            | አጋጅ      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | የfast-check property ሙከራዎች ከዘፈቀደ seed እና ከፍተኛ የማስኬጃ ብዛት ጋር                                                                          | **አማካሪ** |
| `nightly-resilience`   | የheap ዕድገት መግቢያ መቆጣጠሪያ፣ chaos fault-injection፣ k6 የload/soak ሙከራ                                                                    | **አማካሪ** |
| `nightly-llm-security` | የpromptfoo injection መከላከያ (block mode) + garak probes (የprovider secret ከሌለ ይዘለላል)                                                 | **አማካሪ** |
| `nightly-schemathesis` | `docs/openapi.yaml`ን በመጠቀም ቀጥታ OmniRoute ላይ የOpenAPI contract fuzzing (schemathesis) — የspec ጥሰቶችን / ያልተያዙ 500ዎችን ያጋልጣል (ደረጃ 8 B.4) | **አማካሪ** |
| `nightly-mutation`     | በፈጣኑ unit lane ላይ የStryker mutation-testing ውጤት — የተረፉ mutants ደካማ assertዎችን ያጋልጣሉ                                                  | **አማካሪ** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ሁሉ የNode engine ተኳኋኝነት ማትሪክስ                                                                             | **አማካሪ** |

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

## የምክንያታዊ ማድረግ የኋላ ዝርዝር (የROI ግምገማ — ደረጃ 9 ሞገድ 3)

ይህ ንብረት ዝርዝር በ2026-06-17 ከ`ci.yml` ጋር ተመሳክሯል (ቀዳሚው ስሪት
`audit:deps`፣ `check:tracked-artifacts`፣ `check:lockfile`፣ `check:licenses`፣
`check:dead-code`፣ `check:cognitive-complexity`፣ `check:type-coverage`፣
`check:codeql-ratchet`፣ `check:pr-evidence`ን አላካተተም ነበር)። የተመሳከረው ስብስብ የROI ግምገማ
የሚከተሉትን የምክንያታዊ ማድረግ ዕጩዎች ለይቷል። **ውህደቶቹ መካኒካዊ የCI
ለውጦች ናቸው፤ መቀየር/ማስወገድ ውሳኔዎቹ ለኦፕሬተሩ የተተዉ የፖሊሲ ውሳኔዎች ናቸው።** ከታች ካሉት ውስጥ
እስካሁን የተተገበረ የለም።

**ከላይ ያልተመዘገቡ ተጨማሪ ነገሮችም** (አማካሪ፣ ዝቅተኛ ምልክት)፦ የ`docs-lint` ሥራ
(markdownlint + Vale፣ ሙሉው ሥራ `continue-on-error`) እና ራሳቸውን የቻሉ የስካነር የሥራ ፍሰቶች
`semgrep.yml` / `codeql.yml` / `scorecard.yml`። `semgrepFindings: 0` በ
`quality-baseline.json` ውስጥ አለ፣ ነገር ግን በ`ci.yml` ውስጥ ከሚያግድ ራቼት ጋር አልተገናኘም — መለኪያው
በአሁኑ ጊዜ ወላጅ አልባ ነው።

### ማዋሃድ / ብዜት ማስወገድ (መካኒካዊ፣ ዝቅተኛ አደጋ)

እያንዳንዱ ዕጩ በ2026-06-17 በነበረው የቀጥታ ጌት ሁኔታ ላይ ተረጋግጧል (እመን-ግን-አረጋግጥ)፤
በርካታ "ግልጽ" የሚመስሉ ውህደቶች ዕዳን እንደሚደብቁ ታውቋል እና **ንጹሕ** ቀጥተኛ ምትኮች አይደሉም።

- **`check:docs-sync` ሁለት ጊዜ ይሰራል** — በ`lint` ሥራ ውስጥ ራሱን ችሎ እና እንደገና በ`check:docs-all` (`docs-sync-strict`) ውስጥ እንዲሁም በhusky pre-commit hook ውስጥ። ✅ **ተጠናቋል** — ራሱን የቻለው የ`lint` ጥሪ ተወግዷል።
- **የCVE ቅኝት** — ❌ **ንጹሕ ውህደት አይደለም።** `audit:deps` በማንኛውም high/critical CVE ላይ በጥብቅ ይወድቃል፤ `check:vuln-ratchet` (osv) የሚወድቀው ከመነሻ መስመሩ ጋር ሲነጻጸር _መመለስ_ ሲኖር ብቻ ነው (በአሁኑ ጊዜ 1 MODERATE)። የተለያየ ትርጉም አላቸው — `audit:deps`ን ማስወገድ ፍጹሙን high/critical ጌት ያሳጣል። ሁለቱንም አቆዩ።
- **የዑደት ማወቂያ** — ✅ **ተጠናቋል** (#15159 G-01/G-02)። እዚህ የነበረው የድሮ ጽሑፍ `check:cycles`ን "አረንጓዴው፣ በጥንቃቄ የተመረጠው" ጌት ብሎ ጠርቶታል እና `check:circular-deps` (dpdm) 91 ዑደቶችን ስለዘገበ እንደ አጋጅ መቆየቱን አጽድቋል። ያ አረንጓዴ ውጤት **ሐሰተኛ አረንጓዴ** ነበር፦ `check:cycles` 5 ንዑስ ማውጫዎችን (450 ፋይሎች) ቃኝቷል፣ static `import|export … from`ን ብቻ አዛምዷል፣ እና እያንዳንዱን `@/` እና `@omniroute/open-sse/` specifier አስወግዷል፤ ስለዚህ በrepoው ውስጥ የበዙትን dynamic-import + alias ዑደቶች ማየት አልቻለም። ተስተካክሏል፦ ጌቱ አሁን `src` + `open-sse`ን (5023 ፋይሎች) ያስሳል፣ specifierዎችን ከTypeScript AST ይሰበስባል (ስለዚህ `import("…")` ይቆጠራል እና በtype-position ያለ `typeof import("…")` አይቆጠርም)፣ እንዲሁም የtsconfig `paths`ን ይፈታል። 0 ሳይሆን **14** ዑደቶችን ያገኛል። ቀድሞ የነበሩት 14 ዑደቶች በጌት PR ውስጥ ሊስተካከሉ ስለማይችሉ፣ `check:cycles` አሁን **ራቼት** ነው (`--ratchet`፣ በ`quality-baseline.json` ውስጥ ጣሪያው `metrics.cycles.value = 14`፣ `direction: down`) — ማንኛውንም _መመለስ_ ያግዳል እና ቁጥሩ መቀነስ ብቻ ይችላል። CI `npm run check:cycles:ratchet`ን ያስኬዳል። ቀስ በቀስ የማጥፋት ሥራው ከ**A-01** ጋር ይከናወናል። `check:circular-deps` (dpdm) እንደ ሰፊ ሁለተኛ አስተያየት አማካሪ ሆኖ ይቆያል።
- **ውስብስብነት** — ✅ **ተጠናቋል** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`)፦ አንድ የESLint ቅኝት፣ cyclomatic+max-lines እና cognitive መነሻ መስመሮች እርስ በርሳቸው ነጻ ሆነው እንዲቆዩ በruleId ይቆጥራል፤ የተናጠል `check:complexity` / `check:cognitive-complexity` ለአካባቢያዊ `--update` ይቆያሉ።
- **የ`/api` ፀረ-ቅዠት** — ✅ **ተጠናቋል** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`)፦ አንድ የ`src/app/api` FS ንብረት ዝርዝር፣ openapi-routes + docs-symbols አሁንም በተናጠል ሪፖርት ያደርጋሉ፤ የተናጠል ስክሪፕቶቹ ለአካባቢያዊ ማስኬዶች ይቆያሉ።
- **`check:node-runtime` በ11 ሥራዎች ውስጥ ይሰራል** — ⚠️ **ዝቅተኛ ROI።** እያንዳንዱ የተለየ runner ነው እና ፍተሻው <1s ነው፤ ጠቅላላ ቁጠባው ~10s ነው፣ በምላሹ ግን ርካሽ የየሥራውን ጥበቃ ማጣት ይኖራል። የለውጥ ውጣ ውረዱን አያዋጣም።
- **በCI lint ላይ `typecheck:noimplicit:core`** — ✅ **ከlint ሥራ ተወግዷል** (አማካሪ `continue-on-error` ነበር)፤ አጋጁ የtype ወሰን `typecheck:core` + `check:type-coverage` ነው። አካባቢያዊ ስክሪፕቱ ተቀምጧል።

### መቀየር / መወሰን (የኦፕሬተር ፖሊሲ)

- `check:openapi-security-tiers` (አማካሪ) — ❌ **በንጽሕና ሊቀየር አይችልም።** በ0 ይወጣል፣ ነገር ግን በ`LOCAL_ONLY_API_PREFIXES` ስር ያሉ በርካታ `traffic-inspector` መስመሮች የ`x-loopback-only: true` ማብራሪያ እንደሌላቸው ያስጠነቅቃል። ማስገደድ በመጀመሪያ እነዚያን ማብራሪያዎች ወደ`openapi.yaml` መጨመርን ይጠይቃል።
- `typecheck:noimplicit:core` (አማካሪ) — በአብዛኛው በአጋጁ `check:type-coverage` ራቼት ውስጥ ተካቷል። ወደ ራቼት ይቀየር ወይም ተደጋጋሚው ሁለተኛ የ`tsc` ማለፊያ ይወገድ።
- `test:vitest:ui` (አሁን **አጋጅ**) — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በ`// #8618` የክትትል አስተያየቶች በግልጽ ተገልለዋል፤ አዲስ ውድቀቶች ሥራውን ያወድቃሉ።
- `check:secrets` (gitleaks፣ በ3 የተመዘገቡ ሐሰተኛ-አዎንታዊ ውጤቶች ላይ የቀዘቀዘ አጋጅ ራቼት) — 0 ላይ ለመድረስ 3ቱን allowlist ውስጥ ያስገቡ፣ ወይም ወደ አማካሪ ዝቅ ያድርጉት። ከGitHub ቤተኛ secret-scanning + `check:public-creds` ጋር ይደራረባል።
- `check:pr-evidence` (አጋጅ፣ የPR-body ስድ ንባብን በgrep ይፈልጋል) — ከፍተኛ የሐሰት-አዎንታዊ አደጋ አለው፤ ከተወገደ የHard Rule #18 ማስፈጸሚያን ያዳክማል፣ ስለዚህ ይህ እውነተኛ የፖሊሲ ውሳኔ ነው።
- `semgrep` (ራሱን የቻለ አማካሪ) — ለOWASP ቤተሰቦች ከCodeQL ጋር ይደራረባል፤ መነሻ መስመሩን ከራቼት ጋር ያገናኙ ወይም ያስወግዱት።

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
