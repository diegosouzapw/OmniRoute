# Quality Gates Reference (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

මෙම ලේඛනය OmniRoute හි සියලුම CI තත්ත්ව ද්වාර සඳහා බලයලත් යොමුව වේ.
එය එක් එක් ද්වාරය, එය වලංගු කරන්නේ කුමක්ද, එය ක්රියාත්මක වන්නේ කුමන CI කාර්යයේද, එය
ratchet මූලික රේඛාවක් හෝ සමත්/අසමත් ප්රතිපත්තියක් භාවිත කරන්නේද, සහ එය build එක අවහිර කරන්නේද නැතහොත් උපදේශාත්මකද යන්න විස්තර කරයි.

කෙටි සාරාංශයක් සහ අවසර ලැයිස්තු ප්රතිපත්තිය සඳහා, `AGENTS.md` හි
"තත්ත්ව ද්වාර සහ Ratchets" කොටස බලන්න. එම පද්ධතියේ විවේචනාත්මක ඇගයීම, පරිණතභාව වර්ගීකරණය සහ මෙවලම්-ස්වාධීන
ප්රතිනිර්මාණ සැලැස්ම සඳහා,
[තත්ත්ව ද්වාර ක්රියාමාර්ග අත්පොත](../ops/QUALITY_GATE_PLAYBOOK.md) බලන්න.

---

## ද්වාර ලැයිස්තුව (~90 ස්ක්රිප්ට්)

ස්ක්රිප්ට් `scripts/check/` (ප්රතිපත්ති ද්වාර) සහ `scripts/quality/` (රැචට් එන්ජිම) යටතේ පවතී.
CI සඳහා සත්යයේ මූලාශ්රය `.github/workflows/ci.yml` වේ.

### නිකුතු PR වේගවත් මාර්ගය (`quality.yml`)

`.github/workflows/quality.yml` ක්රියාත්මක වන්නේ `release/**` ඉලක්ක කරන PR මතය. එය මාර්ග අනුව පෙරහන් කළ වේගවත් ද්වාර සහ කේත
වෙනස්කම් සඳහා උපදේශාත්මක නිෂ්පාදන-build සංඥාවක් භාවිත කරමින් දායකයන්ගේ ශාඛා ඉදිරියට ගෙන යයි:

| කාර්යය                                           | විෂය පථය                                                                                                                                                                                                                            | අවහිර කිරීම                                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | කෙටුම්පත් නොවන කේත PR සහ Mergify පෝලිම් ශාඛා; Node 24, `npm-ci-retry`, `check:node-runtime`, `OMNIROUTE_USE_TURBOPACK=1` සමඟ `npm run build`; කිසිදු පහළ ප්රවාහයේ ගුණාත්මක කාර්යයක් එය භාවිත නොකරන බැවින් කලාකෘති උඩුගත කිරීමක් නැත | **උපදේශාත්මකයි** (`continue-on-error: true`; ස්ථාවර නිකුතු-PR ධාවන සතියකට පසු ඉවත් කරන්න) |
| `Docs Gates (fast-path)`                         | ලේඛන/කේත PR; API ලේඛන යොමු සහ සියලු ලේඛන                                                                                                                                                                                            | ඔව්                                                                                       |
| `Fast Quality Gates`                             | කේත PR; ස්ථිතික පරීක්ෂණ, වර්ග පරීක්ෂාව, උපකරණ පුවරු වර්ග පරීක්ෂාව, බලපෑමට ලක් වූ ඒකක පරීක්ෂණ                                                                                                                                        | ඔව්                                                                                       |
| `Forgotten sibling tests`                        | කේත PR; වෙනස් වූ මොඩියුලවල සිට ස්ථිතික පරිභෝජකයන් සහ අපේක්ෂක සහෝදර පරීක්ෂණ දක්වා ලුහුබැඳීම; යොමු කළ අවසර ලැයිස්තු ව්යතිරේක සමඟ barrel සහ ගතික-import මාර්ග උපදේශාත්මක රෝගනිශ්චයන් ලෙස වාර්තා කෙරේ                                   | **උපදේශාත්මකයි**                                                                          |
| `Vitest (fast-path)`                             | කේත PR; වේගවත් Vitest පරීක්ෂණ කට්ටලය                                                                                                                                                                                                | ඔව්                                                                                       |
| `Unit Tests fast-path`                           | කේත PR; කොටස් 4ක ඒකක පරීක්ෂණ කට්ටලය                                                                                                                                                                                                 | ඔව්                                                                                       |
| `No new ESLint warnings`                         | කේත PR; මැඩපැවැත්වීම් පිළිබඳ දැනුවත් lint ආරක්ෂකය                                                                                                                                                                                   | ස්වකීය මූලාශ්ර සඳහා ඔව්, fork සඳහා උපදේශාත්මකයි                                           |
| `Merge integrity (changelog + generated skills)` | කෙටුම්පත් නොවන PR; වෙනස්කම් ලොගය සහ ජනනය කළ කුසලතා සමමුහුර්තකරණය                                                                                                                                                                    | ස්වකීය මූලාශ්ර සඳහා ඔව්, fork සඳහා උපදේශාත්මකයි                                           |

#### අමතක වූ සහෝදර පරීක්ෂණ වාර්තාව

`npm run check:forgotten-sibling-tests` පරීක්ෂණ-බලපෑම් සිතියමට පාදක වන import විසඳුම්කාරකය නැවත භාවිත කරයි.
වෙනස් වූ සෑම නිෂ්පාදන මොඩියුලයක් සඳහාම, අපේක්ෂක
පරීක්ෂණය pull-request වෙනස්කම් කට්ටලයේ නොමැති විට, එය නිශ්චිත අනුපිළිවෙළකින්
`changed module/symbol -> static consumer -> candidate sibling test` දාම වාර්තා කරයි. ඕනෑම අවහිර කිරීමේ දියත් කිරීමකට පෙර ක්රමාංකනය සඳහා Markdown සාරාංශය සහ JSON ප්රතිඵලය
`forgotten-sibling-tests` workflow කලාකෘතිය ලෙස රඳවා තබා ගනී.

Barrel නැවත-export කිරීම් සහ ගතික imports යනු විසඳුම් රෝගනිශ්චයන් පමණි; ඒවා කිසිවිටෙක
අවහිර කරන සොයාගැනීමක් සාදන්නේ නැත. සමාලෝචනය කළ ව්යතිරේක
`config/quality/forgotten-sibling-allowlist.json` තුළ පවතී. සෑම ඇතුළත් කිරීමක්ම පරිභෝජකයා සහ අපේක්ෂක
පරීක්ෂණය නම් කළ යුතු අතර, නිශ්චිත හේතුවක් ලබා දී GitHub issue එකකට හෝ pull request එකකට සබැඳියක් සැපයිය යුතුය. වැරදි ලෙස සකස් කළ ඇතුළත් කිරීම්
අවහිර කිරීමෙන් අසමත් වේ. ව්යතිරේකවලට මකා දැමූ අපේක්ෂක පරීක්ෂණයක් හෝ `.skip`/`.todo` එක් කරන වෙනස්කම් කට්ටලයක් මැඩපැවැත්විය නොහැක;
assertion දුර්වල කිරීම සහ අනෙකුත් සැඟවීම් ස්වාධීනව අවහිර කරන
`check:test-masking` ද්වාරය සතු වගකීමක් ලෙස පවතී.

### කාර්යය: `lint`

`main` වෙත යොමු වන සෑම PR එකකම ක්රියාත්මක වේ. අසමත් වුවහොත් ඒකාබද්ධ කිරීම අවහිර කරයි.

| ස්ක්රිප්ට් (`npm run ...`)        | වලංගු කරන්නේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | අවහිරකාරී                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js අනුවාදය සහාය දක්වන පරාසය තුළ පවතී                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                          |
| `check:cycles`                    | චක්රීය ආයාත — සියලුම `src/` + `open-sse/` මොඩියුල                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                          |
| `check:route-validation:t06`      | සියලුම මාර්ගවල Zod යෝජනා ක්රම පවතී (Tier 6 ප්රතිපත්තිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` ගණන අයවැය නොඉක්මවයි (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                          |
| `check:provider-consistency`      | `providers.ts` හි ඇති සෑම provider එකකටම `providerRegistry.ts` හි ගැළපෙන entry එකක් ඇත (එමෙන්ම ප්රතිවිරුද්ධ දිශාවටද, allowlist එක තුළ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                          |
| `check:model-lifecycle`           | අතින් නඩත්තු කරන routing table තුන checked-in lifecycle snapshot (#11503) සමඟ අනුකූලව පවතී: `FITNESS_TABLE` (`taskFitness.ts`) විසින් `REGISTRY` හරහා route කළ හැකි retired id එකකටවත් score ලබා නොදෙයි; සෑම `BUILT_IN_ALIASES` target එකක්ම `REGISTRY` තුළ පවතින අතර retired-id snapshot එකේ නොපවතී; තවමත් `REGISTRY` තුළ පවතින සෑම retired id එකක්ම forward කර හෝ `allowedRetiredInCatalog` තුළ ලැයිස්තුගත කර ඇත; එමෙන්ම `DEFAULT_DEGRADATION_MAP` හි කිසිදු source එකක් හෝ target එකක් එම snapshot එකේ retired ලෙස නොපෙන්වයි. මෙයින් model එකක් දැනට සජීවී upstream එකක් මඟින් සේවය කරනු ලබන බව සනාථ නොවේ. Offline — `config/quality/model-lifecycle.json` සමඟ සසඳයි; එය `npm run quality:refresh-model-lifecycle` මඟින් අතින් refresh කරයි (network; CI වෙත සම්බන්ධ කර නැත). `allowedRetiredInCatalog` යනු burn-down ratchet එකකි: entry එකක් එක් කළ යුත්තේ tracking issue එකක් සමඟ පමණි. | ඔව්                                          |
| `check:fetch-targets`             | client-side `src/` තුළ ඇති සෑම `fetch("/api/...")` එකක්ම සැබෑ `route.ts` එකකට resolve වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ඔව්                                          |
| `check:deps`                      | repo එකේ සෑම `package.json` එකක් පුරාම ඇති `npm install` කළ හැකි සියලු deps `dependency-allowlist.json` තුළ පවතී; අලුතින් එක් කළ unpinned හෝ slopsquatted packages සලකුණු කරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ඔව්                                          |
| `audit:deps`                      | `npm audit` (root + electron) — high/critical advisories නොමැත (osv `check:vuln-ratchet` සමඟ අතිච්ඡාදනය වේ; Rationalization Backlog බලන්න)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                          |
| `check:lockfile`                  | `package-lock.json` අඛණ්ඩතාව — https registry, integrity hashes, host overrides නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                          |
| `check:licenses`                  | නිෂ්පාදන පරායත්තතා සඳහා SPDX බලපත්ර අවසර ලැයිස්තුව                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                          |
| `check:tracked-artifacts`         | ගොඩනැගීමේ කෘතික නොමැත / commit කළ `node_modules` සංකේතාත්මක සබැඳි නොමැත (husky pre-commit තුළද ධාවනය වේ; pre-push හිතාමතාම සැහැල්ලුව තබා ඇත — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                          |
| `check:ai-attribution`            | PR commit, මාතෘකාව හෝ අන්තර්ගතය තුළ AI/bot `Co-Authored-By` පසුපෙළක් හෝ AI-ජනන පාදකයක් නොතිබිය යුතුය — දැඩි රීතිය #16 (`quality.yml` හි PR→`release/**` සඳහා වන fast-gates ලූපය තුළ — සිදුවීම් payload එක කියවයි, PR නොවන විට කිසිවක් නොකරයි — සහ PR→`main` සඳහා `ci.yml` lint තුළ ඇති PR-පමණක් පියවරක්; husky `commit-msg` hook එකද; මානව සම-කර්තෘවරුන්ට අවසර ඇත; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | සෑම Vitest බැහැර කිරීමක්ම ලුහුබැඳීමේ issue එකක් නම් කරන අතර `config/quality/vitest-exclusions.json` තුළ දක්වා ඇත (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                          |
| `check:file-size`                 | කිසිදු මූලාශ්ර ගොනුවක් එහි දිගුව අනුව නියමිත උපරිමය ඉක්මවන්නේ නැත (ratchet: විශාල ගොනු `frozen` ලැයිස්තුවේ ස්ථාවර කර ඇත)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ඔව්                                          |
| `check:error-helper`              | executors/handlers තුළ දෝෂ ප්රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` භාවිත කරයි (දැඩි රීතිය #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                          |
| `check:migration-numbering`       | Migration SQL ගොනු හිඩැස් හෝ අනුපිටපත් නොමැතිව අනුක්රමිකව අංකනය කර ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                          |
| `check:public-creds`              | `publicCreds.ts`-ට පිටතින් වචනානුසාරී OAuth `client_id`/`client_secret` හෝ Firebase Web යතුරු නොමැත (දැඩි රීතිය #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                          |
| `check:db-rules`                  | `src/lib/db/` මොඩියුලවලට පිටතින් අමු SQL නොමැත; `localDb.ts` වෙතින් barrel-imports නොමැත (දැඩි රීති #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                          |
| `check:known-symbols`             | ඒවායේ dispatch වගුවල ලියාපදිංචි කර ඇති provider executors, routing strategies සහ translators තැටියේ ඇති ගොනුවලට ගැළපේ — අනාථ හෝ ප්රකාශ නොකළ symbols නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                          |
| `check:route-guard-membership`    | child process එකක් ආරම්භ කරන සෑම route එකක්ම `isLocalOnlyPath()` මඟින් වර්ගීකරණය කර ඇත (දැඩි රීති #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                          |
| `check:test-discovery`            | repo තුළ ඇති සෑම `*.test.ts` / `*.spec.ts` ගොනුවක්ම අවම වශයෙන් එක් test runner එකක් මඟින් එකතු කරනු ලැබේ (ratchet: `test-discovery-baseline.json` තුළ ඇති අනාථ ලැයිස්තුවට හැකි වන්නේ කුඩා වීම පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව්                                          |
| `check:agent-skills-sync`         | ජනනය කරන ලද agent-skills කෘතික ඒවායේ මූලාශ්ර නාමාවලිය සමඟ ගැළපේ (වෙනස්වීමක් නොමැත)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | සපයන්නාගේ ලාංඡන/වත්කම් සඳහා වාර්තාගත මූලාශ්ර සටහනක් ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON වින්යාස ගොනු නිවැරදිව විග්රහ වන අතර repo lint නීති සපුරාලයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | දෝෂ රහිත TypeScript සම්පාදනය (උපදේශාත්මක අනතුරු ඇඟවීම් පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                          |
| `typecheck:noimplicit:core`       | දැඩි `noImplicitAny` — අනාගතය අරමුණු කරගත් එකකි; පෙර සිට පවතින බොහෝ ඇමතුම් ස්ථාන සඳහා තවමත් අනුසටහන් අවශ්ය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **උපදේශාත්මකයි** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` වෙත සීමා කළ `tsc` (#7033) — `typecheck:core` හි තෝරාගත් ගොනු 27ක අවසර ලැයිස්තුවට කිසිදු dashboard TSX ගොනුවක් ඇතුළත් නොවන අතර, `next build` ද කිසිවිටෙක එහි වර්ග පරීක්ෂාව සිදු නොකරයි (`next.config.mjs` මඟින් `ignoreBuildErrors: true` සකසයි), එබැවින් එහි තිබූ අනාථ-හඳුනාගැනීම් ප්රතිගමන (#6625/#6909) CI වෙත නොපෙනුණි. ස්ථාවර කළ එක්-ගොනුවකට/එක්-TS-කේතයකට අදාළ ගණන් මූලිකරේඛාවකට (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` හි ඇති එකම යල්පැනීම-බලාත්මක කිරීමේ රටාව) සාපේක්ෂව වෙනස්කම් පරීක්ෂා කරයි — මූලිකරේඛාගත ගණන ඉක්මවන නව දෝෂ පමණක් ද්වාරය අසමත් කරයි; පෙර සිට පැවති දෝෂයක් නිවැරදි කළ විට `--update` සමඟ මූලිකරේඛාව පහළට සකසන්න.                                                                                                                                                                                         | ඔව්                                          |

### කාර්යය: `quality-gate`

`test-coverage` පසු ක්රියාත්මක වේ. අසමත් වුවහොත් ඒකාබද්ධ කිරීම අවහිර කරයි.

| ස්ක්රිප්ට්                   | වලංගු කරන්නේ                                                                                                                                                             | අවහිර කිරීම           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `quality:collect`            | `quality-metrics.json` නිකුත් කරයි (ESLint අනතුරු ඇඟවීම් ගණන, ඒකාබද්ධ කළ shard වාර්තාවෙන් ආවරණය)                                                                         | ඔව් (ratchet එකට පෙර) |
| `quality:ratchet`            | `quality-baseline.json` හි සෑම මිනුමක්ම පසුබැස නැත (ESLint අනතුරු ඇඟවීම් ≤ මූලික අගය; ආවරණය ≥ මූලික අගය)                                                                 | ඔව්                   |
| `check:duplication`          | කේත අනුපිටපත් වීම (jscpd@4) `quality-baseline.json` හි මූලික අගය ඉක්මවා නොයයි                                                                                            | ඔව්                   |
| `check:complexity`           | ගොනු මට්ටමේ චක්රීය සංකීර්ණතාව සීමාව ඉක්මවා නොයයි (මූලික ESLint `complexity` + `max-lines-per-function`)                                                                  | ඔව්                   |
| `check:cognitive-complexity` | සංජානන සංකීර්ණතා ratchet (`eslint-plugin-sonarjs`) — වෙනම ESLint ධාවනයකි; CI මෙය තනි `check:complexity-ratchets` පියවර ලෙස ඒකාබද්ධව ධාවනය කරයි                           | ඔව්                   |
| `check:dead-code`            | භාවිත නොකළ exports / ගොනු ratchet (knip) මූලික අගයට සාපේක්ෂව පසුබැස නැත                                                                                                  | ඔව්                   |
| `check:compression-budget`   | සම්පීඩන මිණුම් පරීක්ෂණ අයවැය — එක් එක් engine සඳහා token ඉතිරි කිරීමේ අවම සීමා පසුබැසිය නොයුතුය                                                                          | ඔව්                   |
| `check:type-coverage`        | ටයිප් කළ ප්රතිශතයේ ratchet (`type-coverage`) පසුබැස නැත; බොහෝ දුරට `typecheck:noimplicit:core` ආවරණය කරයි                                                                | ඔව්                   |
| `check:codeql-ratchet`       | විවෘත CodeQL ඇඟවීම් ගණන පසුබැස නැත (`gh api` හරහා කියවයි; token නොමැති විට ආරක්ෂිතව මඟ හරියි) — යාවත්කාලීන වාර ගණන සහ අතින් ක්රියාත්මක කිරීම: පහත "CodeQL ratchet" බලන්න | ඔව්                   |

### කාර්යය: `quality-extended`

සම්පූර්ණ කාර්යයම උපදේශාත්මකය (`continue-on-error: true`). npm-පදනම් වූ ratchets
සැබෑ ලෙස ධාවනය වේ; බාහිර scanners `gh release download` හරහා ස්ථාපනය වන අතර binary එකක්
තවමත් නොමැති විට ස්වයංක්රීයව මඟ හැරෙයි (exit 0).

| ස්ක්රිප්ට්               | වලංගු කරන්නේ                                                                                                                                                                                     | අවහිර කිරීම      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `check:circular-deps`    | චක්රීය dependencies නොමැති බව (dpdm)                                                                                                                                                             | **උපදේශාත්මකයි** |
| `check:bundle-size`      | Bundle ප්රමාණය සීමාව ඉක්මවා නොයන බව                                                                                                                                                              | **උපදේශාත්මකයි** |
| `check:secrets`          | රහස් පරිලෝකනය (gitleaks) — binary එක නොමැති නම් මඟ හරියි                                                                                                                                         | **උපදේශාත්මකයි** |
| `check:vuln-ratchet`     | Dependency අවදානම් (osv-scanner) පසුබැස නොයන බව — binary එක නොමැති නම් මඟ හරියි                                                                                                                  | **උපදේශාත්මකයි** |
| `check:workflows`        | Workflow lint කිරීම (actionlint + zizmor) — binaries නොමැති නම් මඟ හරියි                                                                                                                         | **උපදේශාත්මකයි** |
| `check:openapi-breaking` | මූලික branch එකට සාපේක්ෂව පොදු API ගිවිසුමේ (`openapi.yaml`) බිඳීම් ඇති කරන වෙනස්කම් (oasdiff) — `openapiBreaking=N` නිකුත් කරයි; oasdiff නොමැති නම් හෝ මූලික spec එක විසඳිය නොහැකි නම් මඟ හරියි | **උපදේශාත්මකයි** |

### කාර්යය: `docs-sync-strict`

`main` වෙත යොමු කරන සෑම PR එකකදීම ධාවනය වේ. අසාර්ථක වුවහොත් ඒකාබද්ධ කිරීම අවහිර කරයි.

| ස්ක්රිප්ටය                     | වලංගු කරන්නේ                                                                                                                                              | අවහිර කිරීම                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | පහත උප-ගේට්ටු 6 අනුක්රමිකව ධාවනය කරන මෙටා-ගේට්ටුව                                                                                                         | ඔව්                          |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt අනුවාද අනුකූලතාව                                                                                                            | ඔව්                          |
| ↳ `check:docs-counts`          | ගද්යයේ ඇති ගණන් (සපයන්නන් ගණන, සංක්රමණ ගණන ආදිය) සැබෑ ගණන්වල ratchet කවුළුව තුළ පවතී                                                                      | ඔව්                          |
| ↳ `check:env-doc-sync`         | `.env.example` හි ඇති සෑම env විචල්යයක්ම docs වගුවක ලේඛනගත කර ඇති අතර, එහි ප්රතිලෝමයද සත්ය වේ                                                             | ඔව්                          |
| ↳ `check:deprecated-versions`  | docs තුළ අත්හරින ලද අනුවාද පෙළ නොමැත                                                                                                                      | ඔව්                          |
| ↳ `check:doc-links`            | docs තුළ ඇති අභ්යන්තර markdown සබැඳි සැබෑ ගොනු වෙත විසඳේ (`[text]`/`(path)` ආකෘතිය)                                                                       | ඔව්                          |
| ↳ `check:fabricated-docs`      | docs තුළ සඳහන් routes, env විචල්ය, CLI විධාන, hook නම් සහ ගොනු මාර්ග codebase එකේ පවතී. `--strict` හරහා දැඩි ගේට්ටුවකි; flag එක නොමැතිව මෘදු අසමත් වීමකි. | ඔව් (CI තුළ `--strict` හරහා) |
| `check:cli-i18n`               | CLI විධාන පෙළ සියලු i18n locale ගොනුවල පවතී                                                                                                               | ඔව්                          |
| `check:openapi-coverage`       | OpenAPI පිරිවිතරය සැබෑ routes සඳහා අවම වශයෙන් ratchet කළ පහළ සීමාවක් ආවරණය කරයි                                                                           | ඔව්                          |
| `check:openapi-security-tiers` | `openapi.yaml` හි ආරක්ෂක මට්ටම් අනුසටහන් `routeGuard.ts` වර්ගීකරණයන් සමඟ අනුකූල වේ                                                                        | **උපදේශාත්මකයි**             |
| `check:openapi-routes`         | `openapi.yaml` හි සෑම මාර්ගයක්ම සැබෑ `route.ts` එකකට විසඳේ (ව්යාජ නිර්මාණ වැළැක්වීම)                                                                      | ඔව්                          |
| `check:docs-symbols`           | `docs/**/*.md` හි සෑම `/api/...` යොමුවක්ම සැබෑ `route.ts` එකකට විසඳේ (ව්යාජ නිර්මාණ වැළැක්වීම)                                                            | ඔව්                          |
| `i18n translation drift`       | i18n locale ගොනුවල පරිවර්තනය නොකළ keys — අනතුරු ඇඟවීමක් පමණි                                                                                              | **උපදේශාත්මකයි**             |

### කාර්යය: `i18n-ui-coverage`

| ස්ක්රිප්ටය                        | වලංගු කරන්නේ                                                                                                                                                                             | අවහිර කිරීම      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | UI i18n key ආවරණය ≥ 65% වේ                                                                                                                                                               | ඔව්              |
| `check-ui-value-drift` (inline)   | නැවත ලියන ලද ඉංග්රීසි **අගයක්** පරණ පරිවර්තනයක් ඉතිරි නොකරයි                                                                                                                             | ඔව්              |
| `check-new-key-coverage` (inline) | **නව** ඉංග්රීසි key එකක් සෑම locale එකකම පරිවර්තනය කර ඇත — `__MISSING__:` සලකුණක් ප්රතික්ෂේප කෙරේ                                                                                        | ඔව්              |
| `check-translation-ratio`         | locale එකකට සැබෑ පරිවර්තන අනුපාතය (allowlist එකෙන් පිටත ඇති ඉංග්රීසි සමඟ සමාන / placeholder / අස්ථානගත leaves) `config/quality/i18n-translation-baseline.json` + slack ඉක්මවා නොයා යුතුය | **උපදේශාත්මකයි** |

`fetch-depth: 0` අවශ්ය වේ — value-drift ගේට්ටුව merge base එකට සාපේක්ෂව `en.json` හි වෙනස්කම් සසඳයි.

#### `check-ui-value-drift` — යල් පැන ගිය පරිවර්තන ගේට්ටුව

අනෙක් ගේට්ටුවලට ව්යුහාත්මකව දැකිය නොහැකි එක් i18n ප්රතිගමනය මෙය හඳුනාගනී: ඉංග්රීසි අගයක්
නැවත ලියා ඇති නමුත් _පෙර_ ඉංග්රීසි අගයෙන් ව්යුත්පන්න වූ පරිවර්තන එලෙසම ඉතිරි වන බැවින්,
ඉංග්රීසි නොවන පරිශීලකයන් නිසැක ස්වරයකින් ලියූ, දැන් වැරදි වූ පෙළ දිගටම කියවයි.

මෙය සැබෑවටම නිකුත් විය. Antigravity පිවිසුම් සහායකය එක් කළ විට (#5203)
`oauthModal.googleOAuthWarning` නැවත ලියන ලදී; **locales 43න් 39ක්** ක්රියාකරුවන්ට "සම්පූර්ණ
URL එක පිටපත් කර පහතින් අලවන්න" යැයි පැවසූ පෙළ රඳවාගෙන තිබුණි — එම සපයන්නා සඳහා සම්පූර්ණ කළ
නොහැකි ප්රවාහයකි. පහත හේතු නිසා #8463 දක්වා එය හඳුනා නොගන්නා ලදී:

- `sync-ui-keys` පසුපිරවීම කරන්නේ **නොපවතින** keys පමණි, **යල් පැන ගිය** ඒවා කිසි විටෙක නොවේ;
- `check-ui-keys-coverage` key එකේ _පැවැත්ම_ ගණන් කරන බැවින්, යල් පැන ගිය පරිවර්තනයක් ආවරණය වූවක් ලෙස ලකුණු ලබයි;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ලේඛනකරණ පිළිබිඹු නිරීක්ෂණය කරයි —
  එය කිසි විටෙක `src/i18n/messages/*.json` කියවන්නේ නැත. 2026-09 යළි සමමුහුර්ත කිරීමේ සිට
  `docs-sync-strict` කාර්යයේ අවහිර කරයි: මූලික doc එකක් සංස්කරණය කරන්න → `npm run i18n:run -- --files=<doc>` (අංශ මට්ටමේ, අඩු වියදම්).

**Diff පිළිබඳ දැනුවත්ය, baseline මත පදනම් නොවේ.** එය merge base හි ඇති `en.json`, working tree එක සමඟ සසඳයි; ඉංග්රීසි අගය වෙනස් වූ සෑම key එකක් සඳහාම, තවමත් වෙනස් නොකළ පරිවර්තනයක් දරන ඕනෑම locale එකක් යල්පැන ඇත. මෙය හිතාමතාම **පෙර පැවති ණය ස්ථාවර කරයි** — දිගු කලක් පවතින පරිවර්තනයක් පැමිණියේ කුමන පැරණි ඉංග්රීසි පාඨයෙන්දැයි diff එකකට අනාවරණය කළ නොහැකි බැවින්, gate එක විනිශ්චය කරන්නේ වත්මන් වෙනස ස්පර්ශ කරන දේ පමණි. විකල්පය (එක් එක් key එක සඳහා hash baseline එකක්) සඳහා ~600 KB ප්රමාණයේ ජනනය කළ ගොනුවක් අවශ්ය වන අතර, එය දැනට පවතින විශාලතම baseline එක මෙන් 3× ක් විශාල සහ සෑම i18n PR එකකදීම වෙනස් වනු ඇත.

එය සපුරාලීමට ක්රම දෙකක් ඇත:

1. බලපෑමට ලක් වූ පරිවර්තන යාවත්කාලීන කරන්න, හෝ
2. ඒවා `__MISSING__:<new english>` ලෙස සකසන්න — එවිට runtime එක නිවැරදි කළ ඉංග්රීසි පාඨය සපයයි
   (`src/i18n/request.ts::deepMergeFallback`, #7258), සහ key එක පරිවර්තනය සඳහා පෝලිම්ගත වේ.

string එකේ **අර්ථය** වෙනස් වී ඇත්නම්, **key එක නැවත නම් කිරීමට** ප්රමුඛත්වය දෙන්න: නව key එකකට යල්පැන ගිය පරිවර්තනයක් උරුම විය නොහැක. #8463 භාවිත කළේ එම රටාවයි.

```bash
npm run i18n:check-value-drift          # දැඩි (CI ධාවනය කරන ආකාරය)
npm run i18n:check-value-drift:warn     # වාර්තා කිරීම පමණි
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

base catalog එක කියවිය නොහැකි විට (base ref එක නොමැති shallow clone එකක්), `check-openapi-breaking` අනුකරණය කරමින් `SKIP reason=base-unresolved` සමඟ 0 ලෙස පිටවෙයි.

### කාර්යය: `i18n`

සම්පූර්ණ i18n වලංගුකරණ matrix එක (එක් locale එකකට එක් කාර්යයක්). සම්පූර්ණ කාර්යයම උපදේශාත්මකය.

| Script                          | වලංගු කරන්නේ                          | අවහිර කරන්නේද                                                   |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | එක් locale එකකට පරිවර්තන සම්පූර්ණත්වය | **උපදේශාත්මකයි** (සම්පූර්ණ කාර්යය මත `continue-on-error: true`) |

### කාර්යය: `pr-test-policy`

pull request මත පමණක් ධාවනය වේ.

| Script                 | වලංගු කරන්නේ                                                                                                                         | අවහිර කරන්නේද |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, හෝ `bin/` තුළ production code වෙනස් කරන PR, පරීක්ෂණ ඇතුළත් හෝ යාවත්කාලීන කළ යුතුය (දැඩි රීතිය #8)  | ඔව්           |
| `check:test-masking`   | වෙනස් කළ test ගොනු ශුද්ධ assert ගණන අඩු නොකරන අතර `assert.ok(true)` පුනරුක්ති එක් නොකරයි                                             | ඔව්           |
| `check:pr-evidence`    | PR body එක වෙනස සඳහා test/VPS සාක්ෂි උපුටා දක්වයි (PR ගද්යය grep කිරීමෙන් දැඩි රීතිය #18 යාන්ත්රික කරයි — බිඳෙනසුලුය, Backlog බලන්න) | ඔව්           |

### කාර්යය: `test-vitest`

`build` පසු ධාවනය වේ. අසාර්ථක වුවහොත් merge කිරීම අවහිර කරයි.

| Suite            | වලංගු කරන්නේ                                             | අවහිර කරන්නේද                                                                                                       |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (tools 110), autoCombo, cache — vitest runner | ඔව්                                                                                                                 |
| `test:vitest:ui` | UI component tests — vitest runner                       | **අවහිර කරයි** — පෙර පැවති අසාර්ථකතා `vitest.config.ts` තුළ පැහැදිලිව බැහැර කර ඇත; නව අසාර්ථකතා කාර්යය අසාර්ථක කරයි |

### රාත්රී workflows (කාලසටහන්ගත, උපදේශාත්මක)

මේවා cron කාලසටහනකට අනුව (සහ `workflow_dispatch` මඟින්) ධාවනය වන අතර, කිසිවිටෙකත් PR මත ධාවනය නොවේ. සියල්ල උපදේශාත්මකය.

| Workflow               | වලංගු කරන්නේ                                                                                                                                                   | අවහිර කරන්නේද    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | අහඹු seed එකක් + ඉහළ ධාවන සංඛ්යාවක් සහිත fast-check property tests                                                                                             | **උපදේශාත්මකයි** |
| `nightly-resilience`   | heap වර්ධන gate එක, chaos fault-injection, k6 load/soak                                                                                                        | **උපදේශාත්මකයි** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret එකක් නොමැතිව මඟහරිනු ලැබේ)                                                              | **උපදේශාත්මකයි** |
| `nightly-schemathesis` | `docs/openapi.yaml` භාවිතයෙන් සජීවී OmniRoute එකකට එරෙහි OpenAPI contract fuzzing (schemathesis) — spec උල්ලංඝන / හසුරුවා නොගත් 500 දෝෂ මතු කරයි (අදියර 8 B.4) | **උපදේශාත්මකයි** |
| `nightly-mutation`     | වේගවත් unit lane එක මත Stryker mutation-testing ලකුණු — ඉතිරි වන mutants දුර්වල asserts හෙළි කරයි                                                              | **උපදේශාත්මකයි** |
| `nightly-compat`       | සහාය දක්වන `engines.node` පරාස හරහා Node engine ගැළපුම් matrix එක                                                                                              | **උපදේශාත්මකයි** |

---

## Velocity අදියර (2026-08-30 → v4.0 LTS): සෑම මූලික සීමාවක්ම 20%කින් ලිහිල් කරන ලදී

හිමිකරුගේ තීරණය (2026-08-30): v4.0 මොඩියුලීකරණය දක්වා, තාක්ෂණික ණය සීමාව
පවත්වා ගැනීමට වඩා නිකුත් කිරීමේ වේගය වැදගත් වේ. සෑම **සංඛ්යාත්මක** ratchet මූලික සීමාවක්ම
විගණනය කළ හැකි එක් වරක ක්රියාවලියකින් 20%කින් ලිහිල් කළ අතර, අදියර
`config/quality/quality-baseline.json` තුළ ප්රකාශ කර ඇත:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| වෙනස් කළ දේ                                                                                                                                                                                               | ස්ථානය                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — අඩු අගයක් වඩා හොඳ වන ගණන් ×1.2, වැඩි අගයක් වඩා හොඳ වන ප්රතිශත ÷1.2 (coverage අවම සීමාව 60 ලෙස තබා ඇත, `eslintErrors` 0 ලෙසම පවතී, `eslintWarnings` 0 → ස්ථිර කළ suppression ගණනේ 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` සටහනෙහි සෑම පෙර අගයක් → පසු අගයක්ම ලැයිස්තුගත කර ඇත) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                    |
| `cap`, `testCap`, සෑම `frozen[*]` / `testFrozen[*]` පේළි සීමාවක්ම ×1.2                                                                                                                                    | `file-size-baseline.json`                                                                                  |
| එක් ගොනුවකට / එක් TS කේතයකට අදාළ ගණන් ×1.2                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                                 |
| `_policy.requireTighten === false` වන විට `--require-tighten` උපදේශාත්මක වේ                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                                |
| රාත්රී `bank-ratchet-shrinks` ක්රියාවලිය විරාම ගනී (එය මනින ලද අඩු වීම තැන්පත් කර, අතිරේක ඉඩ අවලංගු කරනු ඇත)                                                                                              | `.github/workflows/nightly-release-green.yml`                                                              |

අවසර ලැයිස්තු (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) යනු අයවැය **නොවන** අතර ඒවා වෙනස් කර නැත. සමත්/අසමත් ප්රතිපත්ති දොරටු (රහස්, SQL නීති,
docs/env ගිවිසුම, i18n සමානතාව, ඒකක පරීක්ෂණ) වෙනස් කර නැත — අසමත් පරීක්ෂණයක් තවමත් අසමත් පරීක්ෂණයකි.

**මෙවලම්**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — එක් වරක් පමණක්
  සිදු කරන ලිහිල් කිරීම (`scripts/quality/relax-baselines.mjs`); එකම සටහන සමඟ දෙවරක් ධාවනය කිරීම ප්රතික්ෂේප කරයි.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI විසින් කරන ආකාරයටම සෑම සංඛ්යාත්මක දොරටුවක්ම මනින අතර එක් එක් දොරටුවට ඉතිරිව ඇති අතිරේක ඉඩ පෙන්වයි
  (`scripts/quality/baseline-headroom.mjs`). රාත්රී `baseline-headroom` කාර්යය
  **📈 Baseline headroom (velocity phase)** යන සක්රිය issue එකට වගුව පළ කරන අතර,
  යම් දොරටුවක් එහි සීමාවෙන් 10%ක් ඇතුළත හෝ දැනටමත් එය ඉක්මවා ඇත්නම්
  `headroom-alert` ලේබලය එක් කරයි. එම issue එක පූර්ව අනතුරු ඇඟවීමයි: දින කිහිපයකින්
  පිරෙන අයවැයක් අදහස් කරන්නේ ලිහිල් කිරීම මුළු කණ්ඩායම විසින් නොව PR කිහිපයක් විසින්
  පරිභෝජනය කරන බවයි — අදාළ දොරටුවේ `_rebaseline_*` සටහන් බලන්න.

**නව-කේත ප්රකාරය (Clean-as-You-Code) — 2026-08-30 සිට, PR වේගවත් මාර්ගය සඳහා පමණි**

`pull_request` සිදුවීම්වලදී `quality.yml`, `check:file-size`,
`check:complexity-ratchets` සහ `check:dead-code` වෙත `--base-ref <PR base SHA>` ලබා දෙයි.
එම ප්රකාරයේදී දොරටුව, PR එක ස්පර්ශ කළ ගොනුවලට **සීමා කර**, HEAD merge-base එක සමඟ
සසඳයි (`scripts/check/newCodeMode.mjs`: merge-base එක තාවකාලික `git worktree` එකක
නිර්මාණය කර, ESLint/knip එහි සහ HEAD මත ධාවනය කර, එක් එක් ගොනුවේ ගණන්වල වෙනස ගණනය කරයි):

- **අවහිර කරන** — PR එක වෙනස් කළ ගොනුවලට cyclomatic/cognitive උල්ලංඝන හෝ dead exports එක් කර ඇත
  (ලොගය තුළ `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **උපදේශාත්මක** — ස්ථිර කළ මූලික සීමාවට සාපේක්ෂ ගෝලීය එකතුව. උරුම වූ අපගමනයක්
  නිදොස් PR එකක් කිසිවිටෙක අසමත් නොකරයි; නිකුතු ප්රතිසන්ධානයේදී එම අපගමනය නැවත ස්ථිර කර,
  headroom කාර්යය මඟින් නිරීක්ෂණය කරයි.

`workflow_dispatch` ධාවන, release-green පූර්ණ පරීක්ෂාව සහ රාත්රී headroom කාර්යයට PR base එකක්
නොමැති බැවින් නිරපේක්ෂ (ගෝලීය) සැසඳීම දිගටම භාවිත කරයි. Coverage, duplication සහ type-coverage
දැනට ගෝලීයව පවතී (ඒවායේ මෙවලම් අඩු වියදමකින් එක් ගොනුවකට අදාළ වෙනසක් ලබා නොදේ) — එම
සැලකීමම යෙදීම සඳහා අපේක්ෂකයන් වේ.

**v4.0 දී අදියර අවසන් කිරීම (LTS = පෙරට වඩා දැඩි වීම, "නැවත සාමාන්ය තත්ත්වයට" නොවේ)**

1. පිරිසිදු `release/v4.0.0` ශීර්ෂයේදී: වාර්තාව සඳහා `npm run quality:headroom --json` ධාවනය කර, ඉන්පසු
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, සහ එක් එක් typecheck ද්වාරයේ
   `--update` ධාවනය කරන්න — සෑම baseline එකක්ම මනින ලද අගය දක්වා පහත වැටේ.
2. `quality-baseline.json` වෙතින් `_policy` මකා දමන්න (`--require-tighten` සහ රාත්රී
   banking නැවත සක්රිය කරයි), `check-openapi-coverage.mjs` තුළ `THRESHOLD = 36` (හෝ ඊට වැඩි අගයක්) ප්රතිසාධනය කරන්න.
3. මොඩියුලකරණයෙන් ප්රතිලාභ ලැබුණු තැන්වල මනින ලද අගයටත් වඩා සීමා දැඩි කරන්න: file-size `cap` නැවත 1000
   (හෝ 800) දක්වා, coverage floors +5 කින්, මොඩියුලකරණය කළ packages සඳහා dead exports 0 දක්වා.

## Ratchet මූලික රේඛාව (`quality-baseline.json`)

Ratchet එන්ජිම (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` කියවා,
අලුතින් රැස් කළ `quality-metrics.json` සමඟ එය සසඳයි. එහි epsilon සීමාව ඉක්මවා
පසුබැසෙන ඕනෑම ප්රමිතිකයක් build එක අසාර්ථක කරයි.

දැනට නිරීක්ෂණය කරන ප්රමිතික:

| ප්රමිතිකය             | දිශාව  | අර්ථය                                     |
| --------------------- | ------ | ----------------------------------------- |
| `eslintWarnings`      | `down` | ESLint අනතුරු ඇඟවීම් ගණන වැඩි නොවිය යුතුය |
| `coverage.statements` | `up`   | Statement coverage අඩු නොවිය යුතුය        |
| `coverage.lines`      | `up`   | Line coverage අඩු නොවිය යුතුය             |
| `coverage.functions`  | `up`   | Function coverage අඩු නොවිය යුතුය         |
| `coverage.branches`   | `up`   | Branch coverage අඩු නොවිය යුතුය           |

සැබෑ වැඩිදියුණු කිරීමකින් පසු මූලික රේඛාව යාවත්කාලීන කිරීමට:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ධජය දැනට මනින ලද අගයන් `quality-baseline.json` වෙත ලියයි.
ප්රමිතිකය වැඩිදියුණු කළ වෙනස සමඟ මෙම ගොනුව commit කරන්න. මූලික රේඛාව යාවත්කාලීන
නොකර ප්රමිතිකයක් වැඩිදියුණු කරන PR එකක් `--require-tighten` මඟින් හඳුනාගනු ඇත
(අදියර 6A.5, ක්රියාත්මක කිරීම අපේක්ෂිතයි).

### CodeQL ratchet: නැවුම් කිරීමේ වාර ගණන සහ අතින් ක්රියාත්මක කිරීම

`check:codeql-ratchet` කියවන්නේ **කාලසටහනකට අනුව නැවුම් කරන repo තත්ත්වයයි — එක් එක් PR සඳහා නොවේ.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` මඟින්
`state: configured`, `schedule: weekly` වාර්තා කරයි: මෙය එක් එක් push සඳහා කරන
විශ්ලේෂණයක් නොව, GitHub හි default-setup scan එකයි. ප්රතිවිපාකය: alerts නිවැරදි කරන
PR එකක් merge කිරීමෙන් පසුව, ඊළඟ කාලසටහන්ගත scan එක ක්රියාත්මක වන තුරු ratchet එක
පැරණි, වැඩි ගණන දිගටම කියවයි — එබැවින් scan එක යාවත්කාලීන වන තුරු, නිවැරදි කිරීමේ
PR එකටම අදාළ follow-up ඇතුළුව සෑම විවෘත PR එකකම එය පසුබැසීමක් වාර්තා කරයි.

**අතින් නැවුම් කිරීම**: `gh workflow run codeql.yml --ref release/vX.Y.Z` මඟින්
විශ්ලේෂණය නැවත ක්රියාත්මක කර මිනිත්තු කිහිපයක් ඇතුළත alerts නැවත ප්රකාශයට පත් කරයි.
පළමුව `.github/workflows/codeql.yml` කියවන්න — එය `workflow_dispatch` පමණක් වන්නේ
**එය GitHub හි "default setup" සමඟ ගැටෙන නිසා** බව එහි ශීර්ෂකය පැහැදිලි කරයි
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` triggers නැවත ස්ථාපනය කිරීමට පෙර **owner ක්රියාවක්**
අවශ්ය වේ: Settings → Code security → CodeQL: Default → Advanced. එම මාරුව සිදු
නොකර `schedule:` trigger එකක් එක් නොකරන්න — එයින් සිදුවන්නේ අසාර්ථක runs පමණි.

**ගණන අඩු වූ පසු මූලික රේඛාව දැඩි කරන්න** — `node scripts/check/check-codeql-ratchet.mjs
--update` මඟින් අලුතින් මනින ලද ගණන `quality-baseline.json` →
`metrics.codeqlAlerts.value` වෙත ලියයි. එබැවින් පැරණි උපරිම සීමාව දක්වා නැවත සිදුවන
පසුබැසීමකට ratchet එක නිහඬව අවසර නොදෙයි. ක්රියාත්මක කළ උදාහරණය (2026-09-02/03):
PR #12502 මඟින් සැබෑ alerts 7ක් නිවැරදි කරන ලදී (මනින ලද විවෘත alerts 13 → 6);
PR #12530 මඟින් එයට ගැළපෙන ලෙස ස්ථාවර කළ මූලික රේඛාව 11 → 6 දක්වා දැඩි කරන ලදී;
ඉතිරි 6 පසුව එක් එක් alert සඳහා හේතු දැක්වීමක් සහිතව ඉවත් කර, විවෘත ගණන 0 දක්වා අඩු කරන ලදී.

**ඉවත් කිරීම් තීරණය කිරීම operator සතුය (දැඩි නීතිය #14)** — dismissal comment එකේ
තාක්ෂණික හේතුව සටහන් නොකර කිසිවිටෙක CodeQL alert එකක් ඉවත් නොකරන්න: upstream-protocol
අවශ්යතාවක් සඳහා `won't fix`, test fixture එකක් සඳහා `used in tests`, CodeQL හට
හඳුනාගත නොහැකි sanitizer එකක් සඳහා `false positive` (පූර්වාදර්ශය:
`docs/security/ERROR_SANITIZATION.md`).

---

## පරීක්ෂණ නැවත උත්සාහ කිරීමේ ප්රතිපත්තිය (WS5.4, v3.8.49)

නැවත උත්සාහ කිරීම එක් එක් runner එකට අදාළ වන අතර, කිසිවිටෙකත් සමස්ත පද්ධතියටම අදාළ පොදු ආවරණයක් නොවේ — පොදු නැවත උත්සාහ කිරීමක් සැබෑ ප්රතිගමන
නොපෙනෙන අස්ථාවරතා බවට පත් කරයි:

| Runner           | ප්රතිපත්තිය                                                                                                                                                        | හේතුව                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI තුළ පමණක් `retries: 1`, `trace: on-first-retry` සමඟ                                                                                                             | බ්රවුසර/ජාල කාලගැන්වීම සැබැවින්ම අනියතය; trace එකක් සහිත එක් නැවත උත්සාහයක් අස්ථාවරතාවක් විශ්ලේෂණය කළ හැකි artifact එකක් බවට පත් කරයි |
| Vitest           | ගෝලීය නැවත උත්සාහ කිරීමක් නැත. අස්ථාවර බව තහවුරු වූ පරීක්ෂණයකට පැහැදිලි, එක්-පරීක්ෂණ නැවත උත්සාහ කිරීමක් ලබා දෙයි (diff එකේ දෘශ්යමාන වන අතර, PR තුළ සමාලෝචනය කෙරේ) | නිරෝධායන ලැයිස්තුව repo එක තුළ තබයි, කිසිවිටෙකත් අපැහැදිලි නොවේ                                                                       |
| node:test (unit) | කිසිවිටෙකත් නැවත උත්සාහ නොකරන්න                                                                                                                                    | අස්ථාවර unit පරීක්ෂණයක් යනු පරීක්ෂණයේ දෝෂයකි — එය නිවැරදි කරන්න, නැවත වාසනාව උරගා නොබලන්න                                             |

අස්ථාවරතා telemetry එක ක්රියාත්මක වූ පසු ඉලක්කගත SLO (WS5.2/5.3): එක් පරීක්ෂණයකට <1% අස්ථාවරතා අනුපාතයක්
("දැන් නිවැරදි කරන්න" සීමාව), එක් pipeline එකකට ≥95% සමත් අනුපාතයක්. කර්මාන්තයේ යොමු අගයන් —
අපගේම මිනුම්වලට අනුව නැවත ක්රමාංකනය කරන්න.

## නිකුතු-මට්ටමේ Ratchet විස්ථාපනය (WS5.5, v3.8.49)

ratchet එකක් (ගොනු ප්රමාණය, සංකීර්ණත්වය, eslint අවවාද) පිරිසිදු නිකුතු
tip එක මත ප්රතිගමනය වන විට — එනම් merges වල **සංයෝජනය** එය ප්රතිගමනය කර ඇති අතර, කිසිදු තනි PR එකක් තමන්ගේම branch එක මත
එම ප්රතිගමනය ප්රතිනිෂ්පාදනය නොකරන විට — නිවැරදි කිරීම **release captainට, එක් වරක්,
release branch එක මත** අයත් වේ: extraction/refactor කිරීම වඩාත් සුදුසුය; ලේඛනගත
සාධාරණීකරණ සටහනක් සමඟ පමණක් rebaseline කරන්න. සංයෝජන විස්ථාපනයක් කිසිවිටෙකත් contributor PR එකකට පවරන්න එපා, එසේම
එක් එක් PR සඳහා rebaseline කරන්නත් එපා (එය සැබෑ ප්රතිගමන සඟවයි). පළමුව වෙනස හඳුනාගන්න: ඔබගේ PR එක එයට හේතු වූ බව උපකල්පනය කිරීමට පෙර
probe worktree එකක පිරිසිදු tip එකට එරෙහිව අසමත් තත්ත්වය ප්රතිනිෂ්පාදනය කරන්න.

## Ratchet හැකිළීම් බැංකුගත කිරීම — පහළට යන දිශාව (#8584)

ratchet එක අර්ධ වශයෙන් පමණක් ස්වයංක්රීය වන අතර, ස්වයංක්රීයව ඇත්තේ වැරදි අර්ධයයි. සීමාවක් **ඉහළ දැමීම**
තත්පර දහයක් ගතවන අතින් සිදුකරන JSON සංස්කරණයක් වන අතර, අසමත් PR එකක අවහිරතාව ඉවත් කිරීමට ඇති වේගවත්ම ක්රමයයි.
සීමාවක් **පහළ දැමීමට** යමෙකු `--update` ධාවනය කර ප්රතිඵලය commit කළ යුතුය — තවද
`bank-ratchet-shrinks` job එක එක් කරන තෙක්, කිසිදු workflow එකක් එය ධාවනය කළේ නැත. මනින ලද ප්රතිවිපාකය
(2026-07-25): frozen ගොනු 18ක් දැනටමත් පේළි 800ක නව-ගොනු සීමාවට හෝ ඊට පහළින් තිබූ අතර, නරකම එක
132× විය (`src/shared/validation/schemas.ts`, පේළි 19ක් සඳහා 2,523ක සීමාවක්); සංකීර්ණත්ව උපරිමය
~37 rebaseline සටහන් හරහා `1794 → 2169` දක්වා ගමන් කළ අතර අඩුවීමක් තිබුණේ හරියටම එකක් පමණි
(−1); තවද "ඊළඟ චක්රයේ `--update` හරහා තද කරන්න" යන්න 31 වතාවක් ලියා, ක්රියාත්මක කර තිබුණේ
එක් වරක් පමණි. එය උපයා දුන් කේතයට වඩා දිගුකල් පවතින සීමාවක්, සම්පූර්ණ කළ සෑම
විභජනයක්ම ඊළඟට එම ගොනුව සංස්කරණය කරන අය සඳහා වර්ධන දීමනාවක් බවට නිහඬව පරිවර්තනය කරයි.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** job එක එම චක්රය වසයි:

|                 |                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| ධාවනය වන්නේ     | `schedule` (දිනකට 3×) + `workflow_dispatch` මත — හිතාමතාම `push` මත **නොවේ**                                       |
| මනින්නේ         | ඉහළම `release/vX.Y.Z`, `release-green` හි ඇති resolution + injection guard එකම භාවිතයෙන්                           |
| ලියන්නේ         | `check:file-size --update` සහ `check:complexity-ratchets --update` (දෙකම සැලසුමෙන් හැකිළීමට පමණක් සීමා වේ)         |
| සත්යාපනය කරන්නේ | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                           |
| යවන්නේ          | release branch එකට එරෙහිව සෑමවිටම වත්මන්ව පවතින එක් PR එකක් — බලයෙන් යාවත්කාලීන කෙරෙන අතර, කිසිවිටෙකත් spam නොකෙරේ |

බැංකුගත කිරීම එක් එක් push එකකට නොව batch වශයෙන් සිදු කරන්නේ එයට ප්රමාද අවශ්යතාවක් නොමැති බැවිනි (පැය 8ක් ඇතුළත
බැංකුගත කළ හැකිළීමක් ප්රමාණවත්ය), නමුත් එක් එක් merge එකකට ධාවනය කිරීමක් merge ව්යාපාර අතරතුර
PR branch එක නැවත නැවත ගොඩනඟා, සෑම වරකම සම්පූර්ණ ESLint පරීක්ෂාවකට ගෙවීමට සිදුවනු ඇත. හඳුනාගැනීම
push මත (`release-green`) පවතී; batch කරන්නේ බැංකුගත කිරීම පමණි.

### ආරක්ෂිත සත්යාපකය

job එක අධීක්ෂණයකින් තොරව baselines වෙත ලියන බැවින්, එය පිළිගත හැකි කරන්නේ `verify-ratchet-bank.mjs` ය.
එය `--update` පසු tree එක `HEAD` සමඟ diff කර, සෑම වෙනස්කමක්ම පහත දැක්වෙන ඒවායින් එකක් නොවේ නම්
**කිසිදු commit එකක් සෑදීමට පෙර job එක නවතයි** — කිසිදු PR එකක් විවෘත නොකරයි:

- `frozen` / `testFrozen` සංඛ්යාත්මක ඇතුළත් කිරීමක් **පහළ දැමීම** හෝ **ඉවත් කිරීම**
- `complexity-baseline.json` → `count` **පහළ දැමීම**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **පහළ දැමීම**

වෙනත් ඕනෑම දෙයක් අසමත් වේ: අංකයක් ඉහළ දැමීම, ඇතුළත් කිරීමක් එක් කිරීම, `cap`/`testCap` වෙනස් කිරීම, හෝ
`_rebaseline_*` සටහනක් මකා දැමීම/නැවත ලිවීම (එම සටහන් එක් එක්
උපරිමය පවතින්නේ ඇයිද යන්න පිළිබඳ විගණන වාර්තාව වන අතර, ගොනු ඇතුළත් කිරීම් තිබෙන `frozen` object එක තුළම ගබඩා කර ඇත).
සීමාවක් ඉහළ දැමිය හැකි bot එකක් පවතින තත්ත්වයට වඩා නිසැකවම නරක වනු ඇත. ප්රතිගමන
guard: `tests/unit/verify-ratchet-bank.test.ts`.

job එක කිසිවිටෙකත් `release/*` වෙත push නොකරයි — මනුෂ්යයෙකු PR එක merge කරන බැවින්, වැරදි මිනුමක්
සමාලෝචනයකින් තොරව ඇතුළත් විය නොහැක.

## අවසර ලැයිස්තු ප්රතිපත්තිය

පෙර සිට පවතින උල්ලංඝන හේතුවෙන් අසමත් විය නොහැකි සෑම gate එකක්ම ස්ථිර කළ අවසර ලැයිස්තුවක්
(උදා., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) භාවිත කරයි. ප්රතිපත්තිය මෙයයි:

**මූලික හේතුව නිවැරදි කරන්න; උල්ලංඝනය පෙර සිට පවතින අතර එය එම PR එක තුළම
නිවැරදි කළ නොහැකි විට පමණක් අවසර ලැයිස්තුව භාවිත කරන්න.**

අවසර ලැයිස්තුවකට ඇතුළත් කිරීමක් එක් කරන විට:

1. සාධාරණීකරණය සහිත අදහස් දැක්වීමක් ඇතුළත් කරන්න.
2. හඹායෑමේ issue එක සඳහන් කරන්න (උදා., `// #3498 — අදියර 2 විශේෂාංගය, තවම ක්රියාත්මක කර නැත`).
3. උල්ලංඝනය නිවැරදි කරන PR එක තුළම ඇතුළත් කිරීම ඉවත් කරන්න — තවදුරටත් සක්රිය
   උල්ලංඝනයක් යටපත් නොකරන යල්පැනගිය ඇතුළත් කිරීමක් ද දෝෂයකි (6A.3 stale-enforcement
   ක්රියාත්මක කළ පසු, අනාථ අවසර ලැයිස්තු ඇතුළත් කිරීමක් හේතුවෙන් gate එක අසමත් වනු ඇත).

පරීක්ෂණ වේගයෙන් සමත් කරවා ගැනීමට අවසර ලැයිස්තු ඇතුළත් කිරීම් එක් **නොකරන්න**. වර්ධනය වන
අවසර ලැයිස්තුවක් සමඟ ඇති හරිත gate එකක් යනු ගුණාත්මකභාවය පිළිබඳ ව්යාජ විශ්වාසයකි.

### ඔබේ PR එක නිසා gate එකක් අසමත් වන විට

1. **gate ප්රතිදානය ප්රවේශමෙන් කියවන්න** — රීතිය උල්ලංඝනය කළ නිශ්චිත ගොනුව හෝ symbol එක එය ඔබට පෙන්වයි.
2. **උල්ලංඝනය නිවැරදි කරන්න** — බොහෝ gate යනු code එක නිවැරදි වූ සැණින් සමත් වන නියත filesystem පරීක්ෂණ වේ.
3. **උල්ලංඝනය පෙර සිට පවතී නම්** (එනම්, ඔබ එය හඳුන්වා නොදුන් නමුත් gate එක දැන්
   එය ආවරණය කරයි නම්): සාධාරණීකරණ අදහස් දැක්වීමක් සහ හඹායෑමේ issue එකක් සමඟ අවසර ලැයිස්තු ඇතුළත් කිරීමක් එක් කරන්න.
4. **gate එක ratchet එකක් නම්** (coverage, ESLint warnings, duplication, complexity):
   ඔබේ වෙනස metric එක වඩාත් නරක කර ඇත. යටින් පවතින ගැටලුව නිවැරදි කරන්න, නැතහොත් වෙනස
   හිතාමතා කළ එකක් සහ metric පිරිහීම පිළිගත හැකි එකක් නම් (කලාතුරකින්)
   `npm run quality:ratchet -- --update` ධාවනය කරන්න — නමුත් PR විස්තරයේ හේතුව ලේඛනගත කරන්න.
5. **උපදේශාත්මක gate** (`continue-on-error: true`) තොරතුරු සඳහා පමණි — ඒවා merge කිරීම
   අවහිර නොකරන නමුත් CI සාරාංශයේ දිස් වේ. එසේ වුවද ඒවා නිවැරදි කරන්න.

---

## නව Gate එකක් එක් කිරීම

1. `scripts/check/check-<name>.mjs` (හෝ `.ts`) සාදන්න. ප්රතිපත්ති gate 0/1 සමඟ පිටවෙයි.
   Ratchet-ආකාරයේ gate, `collect-metrics.mjs` හරහා `quality-metrics.json` වෙත metric එකක් නිකුත් කරයි.
2. `package.json` වෙත `"check:<name>": "node scripts/check/check-<name>.mjs"` එක් කරන්න.
3. සුදුසු job එක යටතේ `.github/workflows/ci.yml` තුළ එය සම්බන්ධ කරන්න
   (ප්රතිපත්තිය → `lint` හෝ `docs-sync-strict`; ratchet → `quality-gate`).
4. එයට අවසර ලැයිස්තුවක් තිබේ නම්, යල්පැනගිය ඇතුළත් කිරීම් ස්වයංක්රීයව හඳුනාගැනීමට
   `scripts/check/lib/allowlist.mjs` වෙතින් `reportStaleEntries()` යොදන්න.
5. gate එකේ හඳුනාගැනීමේ තර්කය ආවරණය කරමින් `tests/unit/build/` තුළ පරීක්ෂණයක් ලියන්න.
6. මෙම ලේඛනය යාවත්කාලීන කරන්න (අදාළ job වගුවට පේළියක් එක් කරන්න).

---

## Agent මෙවලම්කරණය: LSP-in-the-loop (තෝරාගත හැකි)

CI gate වලට අමතරව, OmniRoute විසින් **තෝරාගත හැකි** `agent-lsp` මූලික සැකිල්ලක්
(ව්යාපෘති මට්ටමේ `.mcp.json`, Fase 7 Task 15) සපයයි. coding agent වෙත TypeScript language server එකක්
නිරාවරණය කිරීමට `.mcp.json` සාදන්න, එවිට ඔවුන් code ලිවීමට **පෙර** symbol /
diagnostic විසඳයි — එය "invented symbol" දෝෂ මූලාශ්රයේදීම අඩු කරන
`typecheck:core` සඳහා compile-before-claim සහායකයකි. එය හිතාමතාම
ස්වයංක්රීයව load නොවේ (ඔබ MCP↔LSP bridge එක තෝරා සත්යාපනය කරයි); බිඳුණු ඇතුළත් කිරීමක්
connection error එකක් log කිරීම පමණක් කරන අතර session කිසිවිටෙක බිඳ නොදමයි.

---

## තාර්කිකකරණ පසුබැසීම් ලැයිස්තුව (ROI සමාලෝචනය — අදියර 9 රැල්ල 3)

මෙම ඉන්වෙන්ටරිය 2026-06-17 දින `ci.yml` සමඟ සැසඳීමෙන් සමාදාන කරන ලදී (පෙර අනුවාදයේ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` අත්හැරී තිබුණි). සමාදාන කළ කට්ටලය පිළිබඳ ROI සමාලෝචනයකින්
පහත තාර්කිකකරණ අපේක්ෂකයන් හඳුනා ගන්නා ලදී. **ඒකාබද්ධ කිරීම් යාන්ත්රික CI
වෙනස්කම් වේ; තත්ත්ව මාරු කිරීම්/ඉවත් කිරීම් යනු ක්රියාකරු සඳහා වෙන් කළ ප්රතිපත්තිමය තීරණ වේ.** පහත කිසිවක්
තවම යොදා නැත.

**ඉහත ලේඛනගත කර නොමැති තවත් දෑ** (උපදේශාත්මක, අඩු සංඥාවක් සහිත): `docs-lint` කාර්යය
(markdownlint + Vale, සම්පූර්ණ කාර්යයම `continue-on-error`) සහ ස්වාධීන ස්කෑනර් කාර්ය ප්රවාහ
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` යන්න
`quality-baseline.json` තුළ ඇතත්, `ci.yml` හි අවහිර කරන රැචට්ටුවකට සම්බන්ධ කර නැත — මෙම ප්රමිතිකය
දැනට අනාථව ඇත.

### ඒකාබද්ධ කිරීම / අනුපිටපත් ඉවත් කිරීම (යාන්ත්රික, අඩු අවදානමක්)

සෑම අපේක්ෂකයෙකුම 2026-06-17 දින සජීවී ද්වාර තත්ත්වයට එරෙහිව වලංගු කරන ලදී (විශ්වාස කරන්න, නමුත් සත්යාපනය කරන්න);
“පැහැදිලි” ලෙස පෙනුණු ඒකාබද්ධ කිරීම් කිහිපයක් ණය සඟවා ඇති බව පෙනී ගිය අතර ඒවා **පිරිසිදු සෘජු ආදේශන නොවේ**.

- **`check:docs-sync` දෙවරක් ක්රියාත්මක වේ** — `lint` කාර්යය තුළ ස්වාධීනවද, නැවත `check:docs-all` (`docs-sync-strict`) තුළ සහ husky pre-commit hook එක තුළද ක්රියාත්මක වේ. ✅ **අවසන්** — ස්වාධීන `lint` ආමන්ත්රණය ඉවත් කරන ලදී.
- **CVE ස්කෑන් කිරීම** — ❌ **පිරිසිදු ඒකාබද්ධ කිරීමක් නොවේ.** `audit:deps` ඕනෑම ඉහළ/අතිශය තීරණාත්මක CVE එකක් මත දැඩි ලෙස අසාර්ථක වේ; `check:vuln-ratchet` (osv) අසාර්ථක වන්නේ මූලික මට්ටමට සාපේක්ෂව _පසුබෑමක්_ ඇති විට පමණි (දැනට MODERATE 1ක්). අර්ථවිද්යාව වෙනස්ය — `audit:deps` ඉවත් කිරීමෙන් නිරපේක්ෂ ඉහළ/අතිශය තීරණාත්මක ද්වාරය අහිමි වනු ඇත. දෙකම තබා ගන්න.
- **චක්ර හඳුනාගැනීම** — ❌ **පිරිසිදු ඒකාබද්ධ කිරීමක් නොවේ.** `check:circular-deps` (dpdm) මඟින් **චක්ර 91ක්** වාර්තා කරයි (එය උපදේශාත්මක වන්නේ ඒ නිසාය); ඒවා මුලින් විසඳීමකින් තොරව එය අවහිර කරන තත්ත්වයට උසස් කළ නොහැකි අතර, හරිත තත්ත්වයේ පවතින තෝරාගත් `check:cycles` ට වඩා පුළුල් විෂය පථයක් එයට ඇත. `check:cycles` අවහිර කරන ලෙස තබා ගන්න; dpdm චක්ර 91 විසඳීම වෙනම පසුබැසීම් කාර්යයකි.
- **සංකීර්ණත්වය** — ✅ **අවසන්** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): එක් ESLint පරිලෝකනයක්, `ruleId` අනුව ගණනය කරන බැවින් cyclomatic+max-lines සහ cognitive මූලික මට්ටම් ස්වාධීනව පවතී; දේශීය `--update` සඳහා තනි `check:complexity` / `check:cognitive-complexity` තවදුරටත් පවතී.
- **`/api` ප්රති-භ්රාන්තිය** — ✅ **අවසන්** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` සඳහා එක් FS ඉන්වෙන්ටරියක්, openapi-routes + docs-symbols තවමත් ස්වාධීනව වාර්තා කරයි; දේශීය ක්රියාත්මක කිරීම් සඳහා තනි ඒවා තවදුරටත් පවතී.
- **`check:node-runtime` කාර්ය 11ක ක්රියාත්මක වේ** — ⚠️ **අඩු ROI.** සෑම එකක්ම වෙනම runner එකක් වන අතර පරීක්ෂාව තත්පර 1කට අඩුය; ලාභදායී එක්-කාර්ය ආරක්ෂකයක් අහිමි කිරීමට සාපේක්ෂව, සමස්ත ඉතිරිය තත්පර ~10කි. මෙම කැලඹීම වටින්නේ නැත.
- **CI lint මත `typecheck:noimplicit:core`** — ✅ **lint කාර්යයෙන් ඉවත් කරන ලදී** (එය උපදේශාත්මක `continue-on-error` එකක් විය); අවහිර කරන type පෘෂ්ඨය `typecheck:core` + `check:type-coverage` වේ. දේශීය ස්ක්රිප්ට් එක රඳවා ඇත.

### තත්ත්වය මාරු කිරීම / තීරණය කිරීම (ක්රියාකරු ප්රතිපත්තිය)

- `check:openapi-security-tiers` (උපදේශාත්මක) — ❌ **පිරිසිදුව තත්ත්වය මාරු කළ නොහැක.** එය 0 සමඟ පිටවන නමුත්, `LOCAL_ONLY_API_PREFIXES` යටතේ ඇති `traffic-inspector` මාර්ග කිහිපයක `x-loopback-only: true` අනුසටහන නොමැති බවට අනතුරු අඟවයි. එය බලාත්මක කිරීමට පළමුව එම අනුසටහන් `openapi.yaml` වෙත එක් කිරීම අවශ්ය වේ.
- `typecheck:noimplicit:core` (උපදේශාත්මක) — අවහිර කරන `check:type-coverage` රැචට්ටුව මඟින් බොහෝ දුරට ආවරණය කර ඇත. එය රැචට්ටුවකට මාරු කරන්න, නැතහොත් අතිරික්ත දෙවන `tsc` වාරය ඉවත් කරන්න.
- `test:vitest:ui` (දැන් **අවහිර කරන**) — පෙර සිට පැවති අසාර්ථකවීම් `vitest.config.ts` තුළ `// #8618` ලුහුබැඳීමේ අදහස් සමඟ පැහැදිලිව බැහැර කර ඇත; නව අසාර්ථකවීම් කාර්යය අසාර්ථක කරයි.
- `check:secrets` (gitleaks, ලේඛනගත ව්යාජ ධනාත්මක 3කදී ස්ථිර කළ අවහිර කරන රැචට්ටුව) — 0 දක්වා ළඟා වීමට එම 3 අවසර ලැයිස්තුවට එක් කරන්න, නැතහොත් උපදේශාත්මක තත්ත්වයට පහත හෙළන්න. GitHub හි ස්වදේශීය secret-scanning + `check:public-creds` සමඟ අතිච්ඡාදනය වේ.
- `check:pr-evidence` (අවහිර කරන, PR-body ගද්යය තුළ සොයයි) — ව්යාජ ධනාත්මක සඳහා ඉහළ අවදානමක් ඇත; ඉවත් කළහොත් Hard Rule #18 බලාත්මක කිරීම දුර්වල වේ, එබැවින් මෙය සැබෑ ප්රතිපත්තිමය තීරණයකි.
- `semgrep` (ස්වාධීන උපදේශාත්මක කාර්යයක්) — OWASP පවුල් සම්බන්ධයෙන් CodeQL සමඟ අතිච්ඡාදනය වේ; එහි මූලික මට්ටම රැචට්ටුවකට සම්බන්ධ කරන්න, නැතහොත් ඉවත් කරන්න.

---

## අදාළ ලේඛන

- සැපයුම් දාමය (මූලාශ්ර විස්තර, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — යතුරු කට්ටල සමානතා ද්වාරය

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, කාර්යය `i18n-ui-coverage`).
සෑම `src/i18n/messages/<locale>.json` ගොනුවකම ඇති අවසාන මට්ටමේ යතුරු කට්ටලය `en.json` සමඟ සසඳන අතර, යතුර එක් කළේ කවදාද යන්න නොසලකා, කිසියම් අවසාන මට්ටමේ යතුරක් නොමැති හෝ අමතර නම් අසමත් වේ. `__MISSING__:` ස්ථානධාරක තිබෙන ලෙස ගණන් ගැනේ (ඒවායේ අන්තර්ගතය අනුපාත ද්වාරයේ වගකීමයි). මෙය වෙනස්කම් මත පදනම් වූ/ප්රතිශත මත පදනම් වූ අනෙක් ද්වාර දෙකට නිරපේක්ෂ පරිපූරකය වේ: `check-ui-keys-coverage` සෑම පෙදෙසකටම 80 % අවම සීමාවක් බලාත්මක කරයි (~13,000 අතරින් යතුරු 43ක් නොමැති වුවද එය තවමත් 99.7 % ලෙස පෙන්වයි), සහ `check-new-key-coverage` විනිශ්චය කරන්නේ PR එකක් `en.json` වෙත එක් කරන යතුරු පමණි. පෙදෙස් සමූහයක් උත්පාදනය කරන්නේ එහි ශාඛාව වෙන් කරන දිනයේ තිබෙන `en.json` වෙතින් වන අතර, මූලික ශාඛාව දිගටම යතුරු එක් කරන අතරතුර එය දින ගණනක් පරිවර්තනය කරයි; සමූහ PR එකම කිසිදු යතුරක් එක් නොකරන නිසා, 1 වන සමූහය (#13044) පෙදෙස් නවයක යතුරු 43ක් අඩුවෙන්ද, 2 වන සමූහය (#13660) පෙදෙස් අටක යතුරු 10ක් අඩුවෙන්ද එක් වූ විට (2026-09-15), සහෝදර පරීක්ෂණ දෙකම නිහඬව පැවතුණි. අසමත් තත්ත්වයක්
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` මඟින් නිවැරදි කරන්න; `extra` අවසාන මට්ටමේ යතුරක් යනු මූලාශ්රයෙන් එය ඉවත් කර ඇති බවයි — එය පෙදෙසෙන් මකා දමන්න. `--warn` අසමත් නොකර වාර්තා කරයි.
`--catalog=cli` භාවිතයෙන් `bin/cli/locales` මත එම සැසඳීමම ක්රියාත්මක වේ (`npm run i18n:check-keys:cli`); පියවර දෙකම `i18n-ui-coverage` කාර්යය තුළ ඇත.

#### `check-new-key-coverage` — නව යතුරු i18n ද්වාරය

`check-ui-value-drift` හි සහෝදර පරීක්ෂණයයි. පරිවර්තන යාවත්කාලීන නොකර ඉංග්රීසි අගයක් **නැවත ලියූ** විට එය හඳුනාගන්නේ පළමු පරීක්ෂණයයි; සමහර පෙදෙස්වලට කිසිදා නොලැබුණු ඉංග්රීසි යතුරක් **එක් කළ** විට එය හඳුනාගන්නේ මෙයයි.

`check-ui-keys-coverage` හට මෙම ප්රභේදය හඳුනාගත නොහැක: එය සෑම පෙදෙසකටම ප්රතිශත අවම සීමාවක් බලාත්මක කරන අතර, ~13,000ක් අතරින් යතුරු එකොළහක් නොමැති වුවද ආවරණය 99.9% ලෙස පවතී. භාෂාවකට ප්රතිශතයකින් "මෙම විශේෂාංගය පරිවර්තනය නොකර නිකුත් විය" යන්න ප්රකාශ කළ නොහැක — සම්පූර්ණ විශේෂාංගයක්ම නව පෙදෙසකට කිසිදු පෙළක් නොමැතිව එක් කළ හැකි අතර, එම අගය කිසිවිටෙක වෙනස් නොවිය හැක.

මෙය සංකේතනය කරන සිදුවීම: Orchestration Canvas හි 3 වන අදියර, එවකට පැවති පෙදෙස් 42 පුරා එහි යතුරු එකොළහ පරිවර්තනය කළේය. පැය කිහිපයකට පසු EU භාෂා සමූහය (#13044) ගබඩාව පෙදෙස් 51ක් දක්වා ගෙන ගිය අතර, නව පෙදෙස් නවයට (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ඒවා කිසිදා නොලැබුණි. නොමැති යතුරක් සඳහා `deepMergeFallback` ඉංග්රීසි ආදේශ කරන බැවින්, අසමත් වීමේ ආකාරය හිස් UI එකක් වෙනුවට පරිවර්තනය නොකළ UI එකක් විය — සැබෑ ගැටලුවක් වූ අතර, සැලසුම අනුවම නිහඬ විය.

එහි සහෝදර පරීක්ෂණය මෙන්ම මෙයද **වෙනස්කම් පිළිබඳ දැනුවත්** වන අතර, ඒකාබද්ධ කිරීමේ මූලයේ ඇති ඉංග්රීසි අන්තර්ගතය ක්රියාකාරී ගස සමඟ සසඳයි. එබැවින් පෙර සිට පැවති හිඩැස් නොවෙනස්ව තබන අතර, ද්වාරය සක්රිය කිරීමට කිසිදු සංක්රමණයක් අවශ්ය නොවීය.

**`__MISSING__:<english>` සලකුණක් මෙය සපුරාලන්නේ නැත (2026-09-17 සිට).** පෙර එය ලේඛනගත කල් දැමීමේ ක්රමය විය — ධාවන කාලයේදී නිවැරදි ඉංග්රීසි පෙළ වෙත ආපසු යයි — නමුත් 2026-09-16 දින විශේෂාංග PR අටක් යතුරු 61ක් එක් කර ඒවා පරිවර්තනය කිරීම වෙනුවට පෙදෙස් 65ටම සලකුණ ඇතුළත් කළේය: මෙම ද්වාරය ඒ සියල්ල පිළිගත්තේය, කිසිවක් PR අවහිර නොකළ අතර, සැබෑ පරිවර්තන අනුපාතය බලාත්මක කරන ද්වාරය පසුව නිකුතු අග්රයේදී සියලු දෙනා සඳහා අසමත් විය (pt-BR 3.2 % > 2.5 % + 0.5). දැන් සලකුණක් නොමැති පරිවර්තනයක් ලෙස විනිශ්චය කෙරේ. අසමත් තත්ත්වයක්
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` මඟින්, හෝ සියලු පෙදෙස් සමාන්තරව `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
වෙන් කළ තත්ත්වයකදී ආරක්ෂිත වන අතර `OMNIROUTE_TRANSLATION_*` පරිසර විචල්ය නොමැතිව ආරම්භ වීම ප්රතික්ෂේප කරයි) මඟින් නිවැරදි කරන්න. ඉංග්රීසියෙන්ම පැවතිය යුතු යතුරක් (ස්ථාවර කළ නිෂ්පාදන/එන්ජින්/ධජ නාමයක්) සලකුණක් පිටුපස නොව, `scripts/i18n/untranslatable-keys.json` තුළ තිබිය යුතුය. `vi` සලකුණු සම්පූර්ණයෙන්ම තහනම් කරයි (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — අත්හිටවූ පරීක්ෂණ ද්වාරය

`vitest.config.ts` හි `exclude` ලැයිස්තුවේ ඇති ගොනුවක් යනු ක්රියාත්මක නොවන පරීක්ෂණයකි; එහෙත් ගස කියවන කෙනෙකුට එය ආවරණයක් ලෙස පෙනේ. ගොනු හැට දෙකක්
`// #8618 — pre-existing failure; remove this exclusion when fixed` අදහස් දැක්වීම පිටුපස එකතු වී තිබුණි. #8618 ගැටලුව 2026-08-11 දින වසා දැමූ නමුත්, එය නිරීක්ෂණය කළ ලැයිස්තුව ඇතුළත් කිරීම් 45 සිට 62 දක්වා වර්ධනය වූ අතර, සෑම නව ඇතුළත් කිරීමකටම අවසන් කළ ගැටලුවක් වෙත යොමු කරන අදහස් දැක්වීමක් උරුම විය. අවසානයේ ලැයිස්තුව ගොනුවෙන් ගොනුව මිනුම් කළ විට (#13204), **මූලාශ්රයේ කිසිදු වෙනසක් නොමැතිව 62න් 51ක් වත්මන් ගසට එරෙහිව සමත් විය**.

සැබෑ ගොනුවකට විසඳෙන සෑම බැහැර කිරීමක්ම (a) නිරීක්ෂණ ගැටලුවක් නම් කළ යුතු අතර (b) එහි මිනුම් කළ තත්ත්වය සමඟ `config/quality/vitest-exclusions.json` තුළ දිස්විය යුතු බව ද්වාරය නියම කරයි. එබැවින් එකක් එක් කිරීම, ඇතුළත් කිරීම් 60ක අරාවකට තවත් පේළියක් එක් කිරීම වෙනුවට, ඒ සඳහා වෙන්වූ ගොනුවක සමාලෝචනය කළ හැකි වෙනසක් වේ. එය හිතාමතාම බැහැර කළ පරීක්ෂණ නැවත ක්රියාත්මක නොකරයි — ඒ සඳහා මිනිත්තු ~10ක් වැය වන අතර එය ආවර්තික කාර්යයකට අයත් වේ; එක් එක් පරීක්ෂණය අවසන් වරට මිනුම් කළ වේලාව ඉන්වෙන්ටරිය වාර්තා කරයි.
