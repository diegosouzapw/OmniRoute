# Quality Gates Reference (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

हा दस्तऐवज OmniRoute मधील सर्व CI गुणवत्ता गेट्ससाठी अधिकृत संदर्भ आहे.
यामध्ये प्रत्येक गेट, ते कशाची पडताळणी करते, ते कोणत्या CI जॉबमध्ये चालते, ते
रॅचेट बेसलाइन वापरते की उत्तीर्ण/अनुत्तीर्ण धोरण, आणि ते बिल्ड अवरोधित करते की केवळ सूचनात्मक आहे, याचे वर्णन केले आहे.

संक्षिप्त सारांश आणि अनुमतीसूची धोरणासाठी, `AGENTS.md` मधील
"Quality Gates & Ratchets" विभाग पहा. त्याच प्रणालीचे चिकित्सक मूल्यमापन, परिपक्वता वर्गीकरण आणि
साधन-स्वतंत्र प्रतिकृतीकरण योजना यांसाठी
[गुणवत्ता गेट मार्गदर्शिका](../ops/QUALITY_GATE_PLAYBOOK.md) पहा.

---

## गेट इन्व्हेंटरी आणि अंमलबजावणी प्रोफाइल्स

### उमेदवार स्वीकृती

CI आणि Quality Gates वर्कफ्लो प्रत्येकी एक स्थिर निकाल देतात: `Gate / CI` आणि
`Gate / Quality`. त्यांचे आवृत्तीकृत स्वीकृती धोरण प्रत्येक अपस्ट्रीम जॉब आवश्यक
किंवा सल्लात्मक म्हणून सूचीबद्ध करते. लागू असलेला आवश्यक जॉब यशस्वी होणे आवश्यक आहे:
गहाळ, रद्द केलेले, वगळलेले, प्रलंबित आणि अज्ञात निकाल PASS सिद्ध करू शकत नाहीत. वैध
केवळ-दस्तऐवज किंवा केवळ-कॅटलॉग वर्गीकरणामुळे कोड लेन अनुपयुक्त ठरू शकते;
मसुदा PR हा स्वीकारलेला उमेदवार नाही. `hotfix` लेबल पुराव्याची आवश्यकता रद्द करत नाही.

दोन्ही वर्कफ्लो PRs आणि main/release शाखांवरील pushes, मॅन्युअल dispatch आणि
merge-group इव्हेंट्स समाविष्ट करतात. Push, dispatch आणि merge-group संपूर्ण निवड चालवतात. Forks
आणि merge groups अशा जॉबसाठी hosted runners वापरतात, जे अन्यथा self-hosted
runners निवडतात; रोलआउटपूर्वी पुरेशी hosted क्षमता सत्यापित करणे आवश्यक आहे.

प्रत्येक JSON पावती checkout केलेला SHA, workflow run आणि attempt ओळखते.
CLI checkout/event SHA विसंगती नाकारते. Workflow चाचण्या धोरणातील सदस्यत्व
निकाल जॉबच्या `needs` सूचीशी बांधतात, ज्यामुळे एखादी नवीन किंवा काढून टाकलेली लेन लक्षात न येता अदृश्य होऊ शकत नाही.
पावत्या त्यांच्या स्वतःच्या workflow ला समाविष्ट करतात; publication, deployment किंवा
विद्यमान advisory scanner च्या अंतर्गत बाबींना नाही. Branch rules मध्ये दोन्ही check names सक्रिय करणे हा
स्वतंत्र प्रशासकीय बदल आहे; हे jobs जोडल्याने आपोआप branch संरक्षित होत नाही.

### स्टॅटिक स्कॅन इन्व्हेंटरी

आवृत्तीकृत npm-alias इन्व्हेंटरी आणि static-scan सदस्यत्व
`config/quality/gate-manifest.json` मध्ये आहेत. Script names आणि अचूक commands
`package.json` शी पडताळण्यासाठी `npm run check:gate-manifest` चालवा; additions, removals आणि
command drift मुळे local hook आणि CI मधील change-classification jobs दोन्ही अयशस्वी होतात.
Alias म्हणजे workflow job, matrix instance किंवा test case नाही: या संख्या
परस्पर बदलून वापरता येण्यासारख्या म्हणून सादर करू नयेत.

निवडलेले aliases कार्यान्वित न करता तपासण्यासाठी `npm run quality:scan -- --list` किंवा
`npm run quality:scan:fast -- --list` वापरा.
Runner npm entrypoint कार्यान्वित करतो, त्यामुळे त्याचे runtime (जिथे कॉन्फिगर केले आहे तिथे Bun सहित) जतन केले जाते.
Manifest त्या प्रोफाइल्सच्या बाहेरील aliases स्वतंत्रपणे कार्यान्वित केलेले म्हणून नोंदवतो आणि
read-only scan profiles मध्ये maintenance commands प्रतिबंधित आहेत.

ही प्रोफाइल्स केवळ static scan समाविष्ट करतात. ती product tests,
coverage, packaging, external checks किंवा उमेदवाराची संपूर्ण release acceptance प्रमाणित करत नाहीत.
Workflow admission लिंक केलेले `config/quality/admission-policy.json` आणि
`scripts/quality/admission-verdict.mjs` वापरते. Release-observer profiles स्वतंत्र राहतात;
त्यांचे लागू checks आणि receipts स्वतंत्रपणे तपासा. खालील गद्य
इन्व्हेंटरी हा संदर्भ आहे; gate प्रत्यक्षात चालला याचा पुरावा नाही.

Scripts `scripts/check/` (policy gates) आणि `scripts/quality/` (ratchet engine) अंतर्गत आहेत.
CI साठी सत्याचा अधिकृत स्रोत `.github/workflows/ci.yml` आहे.

### Release PR जलद-मार्ग (`quality.yml`)

`.github/workflows/quality.yml` हे main/release PRs, protected-branch
pushes, dispatch आणि merge groups वर CI ला पूरक ठरते. PRs path-filtered fast checks वापरतात. कायमस्वरूपी
अक्षम केलेला duplicate build काढून टाकण्यात आला; वास्तविक build/package/boot checks CI मध्ये कायम आहेत.

| जॉब                                              | व्याप्ती                                                                                                                                                                                                          | अवरोधक          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs आणि docs-all                                                                                                                                                                         | होय             |
| `Fast Quality Gates`                             | Code PRs; static checks, typecheck, dashboard typecheck, impacted unit tests                                                                                                                                      | होय             |
| `Forgotten sibling tests`                        | Code PRs; बदललेले modules हे static consumers आणि candidate sibling tests पर्यंत ट्रेस केले जातात; barrel आणि dynamic-import paths सल्लात्मक diagnostics म्हणून नोंदवले जातात, तसेच संदर्भित allowlist exceptions | **सल्लात्मक**   |
| `Vitest (fast-path)`                             | Code PRs; fast vitest suite                                                                                                                                                                                       | होय             |
| `Unit Tests fast-path`                           | Code PRs; 4-shard unit suite                                                                                                                                                                                      | होय             |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                                                                                           | होय, forks सहित |
| `Merge integrity (changelog + generated skills)` | मसुदा नसलेले PRs; changelog आणि generated skill sync                                                                                                                                                              | होय, forks सहित |

#### विसरलेल्या sibling tests चा अहवाल

`npm run check:forgotten-sibling-tests` test-impact map मागील import resolver पुन्हा वापरते.
प्रत्येक बदललेल्या production module साठी, candidate
test हा pull-request diff मध्ये अनुपस्थित असताना ते निश्चित
`changed module/symbol -> static consumer -> candidate sibling test` साखळ्या नोंदवते.
कोणत्याही blocking rollout पूर्वी calibration करण्यासाठी Markdown summary आणि JSON result
`forgotten-sibling-tests` workflow artifact म्हणून राखून ठेवले जातात.

Barrel री-एक्सपोर्ट्स आणि डायनॅमिक इम्पोर्ट्स केवळ रिझोल्यूशन निदानांसाठी आहेत; ते कधीही
ब्लॉक करणारा निष्कर्ष निर्माण करत नाहीत. पुनरावलोकन केलेले अपवाद
`config/quality/forgotten-sibling-allowlist.json` मध्ये असतात. प्रत्येक नोंदीमध्ये consumer आणि candidate
test नमूद करणे, विशिष्ट कारण देणे आणि GitHub issue किंवा pull request ची लिंक देणे आवश्यक आहे. चुकीच्या स्वरूपातील नोंदी
fail closed होतात. अपवाद हटवलेली candidate test किंवा `.skip`/`.todo` जोडणारा diff दडपू शकत नाहीत;
assertion कमकुवत करणे आणि इतर masking यांची जबाबदारी स्वतंत्रपणे ब्लॉक करणाऱ्या
`check:test-masking` gate कडेच राहते.

### जॉब: `lint`

`main` वरील प्रत्येक PR साठी चालतो. अपयश आल्यास merge ब्लॉक करतो.

| स्क्रिप्ट (`npm run ...`)         | काय प्रमाणित करते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ब्लॉक करणारे                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js आवृत्ती समर्थित श्रेणीत आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                       |
| `check:cycles`                    | संपूर्ण `src/` + `open-sse/` मधील circular imports (AST-आधारित, tsconfig `paths` resolve केलेले). स्वतंत्रपणे चालवल्यास = सल्लात्मक, cycles ची सूची दाखवते. `check:cycles:ratchet` (जे CI चालवते) `quality-baseline.json` मधील `metrics.cycles` कमाल मर्यादेपेक्षा संख्या जास्त झाल्यास ब्लॉक करते — सध्या 14, `direction: down`, त्यामुळे ती केवळ कमी होऊ शकते (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय (ratchet)                             |
| `check:route-validation:t06`      | सर्व routes वर Zod schemas उपस्थित आहेत (Tier 6 धोरण)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` ची संख्या budget पेक्षा जास्त नाही (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                       |
| `check:provider-consistency`      | `providers.ts` मधील प्रत्येक provider साठी `providerRegistry.ts` मध्ये जुळणारी नोंद आहे (आणि उलटही, allowlist च्या मर्यादेत)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                       |
| `check:model-lifecycle`           | हाताने सांभाळले जाणारे तीन routing tables तपासून ठेवलेल्या lifecycle snapshot (#11503) शी सुसंगत राहतात: `FITNESS_TABLE` (`taskFitness.ts`) अशा कोणत्याही निवृत्त id ला score देत नाही ज्याकडे `REGISTRY` route करू शकते; प्रत्येक `BUILT_IN_ALIASES` target `REGISTRY` मध्ये उपस्थित आणि retired-id snapshot मध्ये अनुपस्थित आहे; `REGISTRY` मध्ये अजूनही असलेला प्रत्येक निवृत्त id पुढे पाठवला जातो किंवा `allowedRetiredInCatalog` मध्ये सूचीबद्ध केला जातो; आणि कोणताही `DEFAULT_DEGRADATION_MAP` source किंवा target त्या snapshot मध्ये निवृत्त म्हणून दिसत नाही. यावरून एखादे model सध्या थेट upstream द्वारे उपलब्ध केले जात आहे, हे सिद्ध होत नाही. Offline — `config/quality/model-lifecycle.json` शी तुलना करते; हे `npm run quality:refresh-model-lifecycle` वापरून हाताने refresh केले जाते (network; CI मध्ये जोडलेले नाही). `allowedRetiredInCatalog` हे burn-down ratchet आहे: tracking issue असल्यासच नोंद जोडा. | होय                                       |
| `check:fetch-targets`             | client-side `src/` मधील प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` शी resolve होतो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय                                       |
| `check:deps`                      | repo मधील प्रत्येक `package.json` तील सर्व `npm install`-योग्य deps `dependency-allowlist.json` मध्ये आहेत; नवीन unpinned किंवा slopsquatted packages flag केले जातात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                       |
| `audit:deps`                      | `npm audit` (root) — कोणतेही high/critical advisories नाहीत (osv `check:vuln-ratchet` शी overlap होते; Rationalization Backlog पहा)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                       |
| `check:lockfile`                  | `package-lock.json` ची अखंडता — https registry, integrity hashes, कोणतेही host overrides नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                       |
| `check:licenses`                  | उत्पादन अवलंबनांसाठी SPDX परवाना अनुमतसूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:tracked-artifacts`         | कोणतीही बिल्ड आर्टिफॅक्ट्स / कमिट केलेल्या `node_modules` सिमलिंक्स नाहीत (husky pre-commit मध्येही चालते; pre-push हेतुपुरस्सर हलके ठेवले आहे — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | होय                                       |
| `check:ai-attribution`            | PR कमिट्स, शीर्षक किंवा मजकुरात कोणताही AI/bot `Co-Authored-By` ट्रेलर किंवा AI-निर्मिती फूटर नाही — कठोर नियम #16 (`quality.yml` मधील PR→`release/**` साठीच्या fast-gates लूपमध्ये — इव्हेंट पेलोड वाचतो, PR नसल्यास काहीही करत नाही — आणि `ci.yml` lint मध्ये PR→`main` साठी केवळ-PR पायरी; तसेच husky `commit-msg` हुक; मानवी सह-लेखकांना परवानगी आहे; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | प्रत्येक Vitest वगळण्यात ट्रॅकिंग इश्यू नमूद केलेला असतो आणि ते `config/quality/vitest-exclusions.json` मध्ये दिसते (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                       |
| `check:file-size`                 | कोणतीही स्रोत फाइल प्रति-विस्तार मर्यादा ओलांडत नाही (रॅचेट: `frozen` सूचीतील गोठवलेल्या मोठ्या फाइल्स)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | होय                                       |
| `check:error-helper`              | executors/handlers मधील त्रुटी प्रतिसाद `buildErrorBody()` / `sanitizeErrorMessage()` वापरतात (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | होय                                       |
| `check:migration-numbering`       | Migration SQL फाइल्सना कोणतीही पोकळी किंवा डुप्लिकेट नसलेले सलग क्रमांक दिलेले आहेत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                       |
| `check:public-creds`              | `publicCreds.ts` च्या बाहेर कोणतेही अक्षरशः OAuth `client_id`/`client_secret` किंवा Firebase Web कीज नाहीत (कठोर नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल्सच्या बाहेर कोणतेही रॉ SQL नाही; `localDb.ts` मधून कोणतेही barrel-imports नाहीत (कठोर नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | होय                                       |
| `check:known-symbols`             | त्यांच्या dispatch tables मध्ये नोंदणीकृत provider executors, routing strategies आणि translators हे डिस्कवरील फाइल्सशी जुळतात — कोणतेही अनाथ किंवा अघोषित symbols नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | होय                                       |
| `check:route-guard-membership`    | child process सुरू करणारा प्रत्येक route `isLocalOnlyPath()` द्वारे वर्गीकृत केला जातो (कठोर नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:test-discovery`            | repo मधील प्रत्येक `*.test.ts` / `*.spec.ts` फाइल किमान एका test runner द्वारे संकलित केली जाते (ratchet: `test-discovery-baseline.json` मधील orphan list फक्त कमी होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                       |
| `check:agent-skills-sync`         | व्युत्पन्न agent-skills आर्टिफॅक्ट्स त्यांच्या स्रोत कॅटलॉगशी जुळतात (कोणताही फरक नाही)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | प्रदाता लोगो/आर्टिफॅक्ट्ससाठी नोंदवलेली उगम नोंद उपलब्ध आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON कॉन्फिगरेशन फाइल्स पार्स होतात आणि रेपोच्या लिंट नियमांची पूर्तता करतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | त्रुटींविना TypeScript संकलन (केवळ सल्लात्मक इशारे)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                       |
| `typecheck:noimplicit:core`       | कठोर `noImplicitAny` — भविष्योन्मुख; आधीपासून अस्तित्वात असलेल्या अनेक कॉल साइट्सना अजूनही ॲनोटेशन्सची आवश्यकता आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **सल्लात्मक** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` पुरते मर्यादित `tsc` (#7033) — `typecheck:core` च्या काळजीपूर्वक निवडलेल्या 27-फाइल अनुमतीसूचीत कोणतेही डॅशबोर्ड TSX समाविष्ट नाही आणि `next build` देखील त्याची कधीही प्रकार-तपासणी करत नाही (`next.config.mjs` मध्ये `ignoreBuildErrors: true` सेट केले आहे), त्यामुळे तेथील अनाथ-आयडेंटिफायर रिग्रेशन्स (#6625/#6909) CI ला दिसत नव्हते. गोठवलेल्या प्रति-फाइल/प्रति-TS-कोड संख्या बेसलाइनशी (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` प्रमाणेच जुन्या नोंदींच्या अंमलबजावणीचा नमुना) फरक तपासते — बेसलाइन संख्येपलीकडील केवळ नवीन त्रुटींमुळे गेट अयशस्वी होते; आधीपासून असलेली त्रुटी दुरुस्त केल्यावर `--update` वापरून बेसलाइन कमी करा.                                                                                                                                                                                                                           | होय                                       |

### जॉब: `quality-gate`

`test-coverage` नंतर चालतो. अयशस्वी झाल्यास मर्ज अवरोधित करतो.

| स्क्रिप्ट                    | काय प्रमाणित करते                                                                                                                                              | अवरोधक                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` तयार करते (ESLint चेतावण्यांची संख्या, विलीन केलेल्या शार्ड अहवालातील कव्हरेज)                                                          | होय (रॅचेटच्या अपस्ट्रीमला) |
| `quality:ratchet`            | `quality-baseline.json` मधील प्रत्येक मेट्रिकची घसरण झालेली नाही (ESLint चेतावण्या ≤ बेसलाइन; कव्हरेज ≥ बेसलाइन)                                               | होय                         |
| `check:duplication`          | कोडची पुनरावृत्ती (jscpd@4) `quality-baseline.json` मधील बेसलाइनपेक्षा जास्त नाही                                                                              | होय                         |
| `check:complexity`           | फाइल-स्तरीय सायक्लोमॅटिक जटिलता कमाल मर्यादेपेक्षा जास्त नाही (मूलभूत ESLint `complexity` + `max-lines-per-function`)                                          | होय                         |
| `check:cognitive-complexity` | संज्ञानात्मक जटिलता रॅचेट (`eslint-plugin-sonarjs`) — स्वतंत्र ESLint पास; CI हे दोन्ही एकत्रित करून एकच `check:complexity-ratchets` चरण म्हणून चालवते         | होय                         |
| `check:dead-code`            | न वापरलेल्या एक्सपोर्ट्स / फाइल्सच्या रॅचेटची (knip) बेसलाइनच्या तुलनेत घसरण होत नाही                                                                          | होय                         |
| `check:compression-budget`   | कॉम्प्रेशन बेंचमार्क बजेट — प्रत्येक इंजिनसाठी टोकन-बचतीच्या किमान मर्यादांची घसरण होता कामा नये                                                               | होय                         |
| `check:type-coverage`        | टाइप केलेल्या कोडच्या टक्केवारीचे रॅचेट (`type-coverage`) घसरत नाही; हे बहुतांशी `typecheck:noimplicit:core` समाविष्ट करते                                     | होय                         |
| `check:codeql-ratchet`       | उघड्या CodeQL अलर्टची संख्या वाढत नाही (`gh api` द्वारे वाचते; टोकन नसल्यास सुरळीतपणे वगळते) — रीफ्रेश वारंवारता आणि मॅन्युअल ट्रिगर: खालील "CodeQL रॅचेट" पहा | होय                         |

### जॉब: `quality-extended`

संपूर्ण जॉब सल्लागार स्वरूपाचा आहे (`continue-on-error: true`). npm-आधारित रॅचेट्स
प्रत्यक्ष चालतात; बाह्य स्कॅनर्स `gh release download` द्वारे स्थापित होतात आणि बायनरी अद्याप
उपलब्ध नसल्यास स्वतःच वगळले जातात (exit 0).

| स्क्रिप्ट                | काय प्रमाणित करते                                                                                                                                                                                                             | अवरोधक स्थिती                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | कोणतीही चक्रीय अवलंबित्वे नाहीत (dpdm)                                                                                                                                                                                        | **सल्लागार**                                    |
| `check:bundle-size`      | बंडलचा आकार कमाल मर्यादेपेक्षा जास्त नाही                                                                                                                                                                                     | **सल्लागार**                                    |
| `check:secrets`          | गुपितांचे स्कॅनिंग (gitleaks) — बायनरी उपलब्ध नसल्यास वगळते                                                                                                                                                                   | **सल्लागार**                                    |
| `check:vuln-ratchet`     | अवलंबित्वांमधील असुरक्षा (osv-scanner) वाढत नाहीत — बायनरी उपलब्ध नसल्यास वगळते                                                                                                                                               | **सल्लागार**                                    |
| `check:workflows`        | वर्कफ्लो लिंट (actionlint + zizmor); स्कॅनर्स अनुपलब्ध/बिघडलेले असल्यास, अहवाल अवैध असल्यास किंवा रॅचेट बेसलाइन अनुपलब्ध असल्यास INCOMPLETE म्हणून अपयशी ठरते. वैध निष्कर्ष निवडलेल्या कठोर/सल्लागार/रॅचेट धोरणाचे पालन करतात | अंमलबजावणी आवश्यक; CI मध्ये zizmor रॅचेट अवरोधक |
| `check:openapi-breaking` | बेस ब्रँचच्या तुलनेत सार्वजनिक API करारामधील (`openapi.yaml`) ब्रेकिंग बदल (oasdiff) — `openapiBreaking=N` तयार करते; oasdiff उपलब्ध नसल्यास किंवा बेस स्पेसिफिकेशनचे निराकरण शक्य नसल्यास वगळते                              | **सल्लागार**                                    |

### जॉब: `docs-sync-strict`

`main` वरील प्रत्येक PR साठी चालते. अपयश आल्यास मर्ज अवरोधित करते.

| स्क्रिप्ट                      | काय सत्यापित करते                                                                                                                                                         | अवरोधक                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | खालील 6 उप-गेट्स अनुक्रमे चालवणारे मेटा-गेट                                                                                                                               | होय                              |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt आवृत्तीतील सुसंगतता                                                                                                                         | होय                              |
| ↳ `check:docs-counts`          | गद्यातील संख्या (प्रदात्यांची संख्या, स्थलांतरांची संख्या इ.) वास्तविक संख्यांच्या रॅचेट मर्यादेत आहेत                                                                    | होय                              |
| ↳ `check:env-doc-sync`         | `.env.example` मधील प्रत्येक पर्यावरणीय चल दस्तऐवजांच्या तक्त्यात नोंदवलेला आहे आणि त्याउलटही                                                                             | होय                              |
| ↳ `check:deprecated-versions`  | दस्तऐवजांमध्ये कालबाह्य आवृत्ती स्ट्रिंग नाहीत                                                                                                                            | होय                              |
| ↳ `check:doc-links`            | दस्तऐवजांमधील अंतर्गत markdown दुवे वास्तविक फाइल्सकडे निर्देशित होतात (`[text]`/`(path)` स्वरूप)                                                                         | होय                              |
| ↳ `check:fabricated-docs`      | दस्तऐवजांमध्ये उद्धृत केलेले रूट्स, पर्यावरणीय चल, CLI कमांड्स, हुकची नावे आणि फाइल पाथ्स कोडबेसमध्ये अस्तित्वात आहेत. `--strict` द्वारे कठोर गेट; फ्लॅगशिवाय सौम्य अपयश. | होय (CI मध्ये `--strict` द्वारे) |
| `check:cli-i18n`               | CLI कमांड स्ट्रिंग्स सर्व i18n लोकेल फाइल्समध्ये उपस्थित आहेत                                                                                                             | होय                              |
| `check:openapi-coverage`       | OpenAPI तपशील वास्तविक रूट्सच्या किमान रॅचेट केलेल्या तळमर्यादेला व्यापतो                                                                                                 | होय                              |
| `check:openapi-security-tiers` | `openapi.yaml` मधील सुरक्षा स्तर भाष्ये `routeGuard.ts` वर्गीकरणांशी सुसंगत आहेत                                                                                          | **सल्लात्मक**                    |
| `check:openapi-routes`         | `openapi.yaml` मधील प्रत्येक पाथ वास्तविक `route.ts` कडे निर्देशित होतो (भ्रमनिर्मितीविरोधी)                                                                              | होय                              |
| `check:docs-symbols`           | `docs/**/*.md` मधील प्रत्येक `/api/...` संदर्भ वास्तविक `route.ts` कडे निर्देशित होतो (भ्रमनिर्मितीविरोधी)                                                                | होय                              |
| `i18n translation drift`       | i18n लोकेल फाइल्समधील अनुवाद न केलेल्या की — केवळ इशारा                                                                                                                   | **सल्लात्मक**                    |

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | काय सत्यापित करते                                                                                                                                                                     | अवरोधक        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n की कव्हरेज ≥ 65% आहे                                                                                                                                                          | होय           |
| `check-ui-value-drift` (इनलाइन)   | पुन्हा लिहिलेल्या इंग्रजी **मूल्यामुळे** कोणताही कालबाह्य अनुवाद मागे राहत नाही                                                                                                       | होय           |
| `check-new-key-coverage` (इनलाइन) | **नवीन** इंग्रजी की प्रत्येक लोकेलमध्ये अनुवादित केलेली आहे — `__MISSING__:` मार्कर नाकारला जातो                                                                                      | होय           |
| `check-translation-ratio`         | प्रत्येक लोकेलसाठी वास्तविक-अनुवाद गुणोत्तर (इंग्रजीशी समान / प्लेसहोल्डर / अनुमतीसूचीबाहेरील गहाळ लीफ) `config/quality/i18n-translation-baseline.json` + शिथिलता यापेक्षा अधिक नसावे | **सल्लात्मक** |

`fetch-depth: 0` आवश्यक आहे — मूल्य-ड्रिफ्ट गेट मर्ज बेसच्या तुलनेत `en.json` चा फरक तपासतो.

#### `check-ui-value-drift` — कालबाह्य-अनुवाद गेट

इतर गेट्सना संरचनात्मकदृष्ट्या दिसू न शकणारी एक i18n प्रतिगती हे पकडते: एखादे इंग्रजी मूल्य
पुन्हा लिहिले जाते आणि _मागील_ इंग्रजीवर आधारित अनुवाद तसेच मागे राहतात, त्यामुळे
इंग्रजीतर वापरकर्ते आत्मविश्वासपूर्ण शैलीतील, पण आता चुकीचा असलेला मजकूर वाचत राहतात.

हे प्रत्यक्षात रिलीज झाले होते. Antigravity लॉगिन सहाय्यक जोडला गेला तेव्हा (#5203)
`oauthModal.googleOAuthWarning` पुन्हा लिहिले गेले; **43 पैकी 39 लोकेल्समध्ये** ऑपरेटर्सना "संपूर्ण
URL कॉपी करा आणि खाली पेस्ट करा" असे सांगणारा मजकूर कायम राहिला — अशी प्रक्रिया जी त्या प्रदात्यासाठी पूर्णच होऊ शकत नाही. #8463 पर्यंत
हे लक्षात आले नाही, कारण:

- `sync-ui-keys` केवळ **अनुपस्थित** की भरतो, **कालबाह्य** की कधीही भरत नाही;
- `check-ui-keys-coverage` कीची _उपस्थिती_ मोजतो, त्यामुळे कालबाह्य अनुवाद कव्हर झालेला म्हणून गणला जातो;
- `check-translation-drift` हे `docs/i18n/<locale>/**.md` दस्तऐवजीकरण प्रतिबिंबांचा मागोवा घेते —
  ते `src/i18n/messages/*.json` कधीही वाचत नाही. 2026-09 पुनः-सिंक्रोनायझेशनपासून `docs-sync-strict` जॉबमध्ये अवरोधक: मुख्य दस्तऐवज संपादित करा → `npm run i18n:run -- --files=<doc>` (विभाग-स्तरीय, कमी खर्चिक).

**फरक-जागरूक, आधाररेषेवर अवलंबून नाही.** हे मर्ज बेसवरील `en.json` ची वर्किंग ट्रीशी तुलना करते; ज्या प्रत्येक कीचे इंग्रजी मूल्य बदलले आहे, त्या कीसाठी अजूनही न बदललेले भाषांतर असलेले कोणतेही लोकेल कालबाह्य मानले जाते. हे जाणीवपूर्वक **आधीपासूनचे प्रलंबित काम गोठवते** — दीर्घकाळ अस्तित्वात असलेले भाषांतर कोणत्या जुन्या इंग्रजी मजकुरावरून आले हे फरकातून समजू शकत नाही, त्यामुळे गेट केवळ सध्याच्या बदलाने स्पर्श केलेल्या गोष्टींचे मूल्यमापन करते. पर्यायासाठी (प्रत्येक कीसाठी हॅश आधाररेषा) सुमारे 600 KB आकाराची जनरेट केलेली फाइल लागेल, जी विद्यमान सर्वांत मोठ्या आधाररेषेच्या 3× असेल आणि प्रत्येक i18n PR वेळी बदलेल.

ही अट पूर्ण करण्याचे दोन मार्ग:

1. प्रभावित भाषांतरे अद्ययावत करा, किंवा
2. त्यांना `__MISSING__:<new english>` असे सेट करा — त्यानंतर रनटाइम सुधारित इंग्रजी मजकूर देते
   (`src/i18n/request.ts::deepMergeFallback`, #7258) आणि ती की भाषांतरासाठी रांगेत जाते.

स्ट्रिंगचा **अर्थ** बदलला असल्यास, **कीचे नाव बदलण्याला** प्राधान्य द्या: नवीन कीला कालबाह्य भाषांतर वारशाने मिळू शकत नाही. #8463 मध्ये हाच पॅटर्न वापरला होता.

```bash
npm run i18n:check-value-drift          # कठोर (CI जे चालवते ते)
npm run i18n:check-value-drift:warn     # केवळ अहवाल
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

बेस कॅटलॉग वाचता येत नसल्यास (`base ref` नसलेला shallow clone), `check-openapi-breaking` प्रमाणेच `SKIP reason=base-unresolved` सह 0 एक्झिट कोड देते.

### जॉब: `i18n`

संपूर्ण i18n प्रमाणीकरण मॅट्रिक्स (प्रत्येक लोकेलसाठी एक जॉब). संपूर्ण जॉब सल्लात्मक आहे.

| स्क्रिप्ट                       | काय प्रमाणित करते                     | ब्लॉकिंग                                                |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | प्रत्येक लोकेलसाठी भाषांतराची पूर्णता | **सल्लात्मक** (संपूर्ण जॉबवर `continue-on-error: true`) |

### जॉब: `pr-test-policy`

फक्त pull requests वर चालते.

| स्क्रिप्ट              | काय प्रमाणित करते                                                                                                                                      | ब्लॉकिंग |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, किंवा `bin/` मधील प्रॉडक्शन कोड बदलणाऱ्या PRs मध्ये चाचण्यांचा समावेश किंवा अद्ययावत चाचण्या असणे आवश्यक आहे (कठोर नियम #8)       | होय      |
| `check:test-masking`   | बदललेल्या चाचणी फाइल्स निव्वळ assert संख्या कमी करत नाहीत किंवा `assert.ok(true)` सारखी स्वयंसिद्ध विधाने जोडत नाहीत                                   | होय      |
| `check:pr-evidence`    | PR च्या मजकुरात बदलासाठी चाचणी/VPS पुराव्याचा उल्लेख आहे (PR मधील गद्य मजकुरावर grep करून कठोर नियम #18 यांत्रिकरीत्या लागू करते — नाजूक; Backlog पहा) | होय      |

### जॉब: `test-vitest`

`build` नंतर चालते. अपयशी झाल्यास मर्ज ब्लॉक करते.

| संच              | काय प्रमाणित करते                                      | ब्लॉकिंग                                                                                                      |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्व्हर (110 टूल्स), autoCombo, cache — vitest रनर | होय                                                                                                           |
| `test:vitest:ui` | UI कॉम्पोनंट चाचण्या — vitest रनर                      | **ब्लॉकिंग** — आधीपासूनची अपयशे `vitest.config.ts` मध्ये स्पष्टपणे वगळली आहेत; नवीन अपयशांमुळे जॉब अपयशी होतो |

### रात्रीच्या वर्कफ्लोज (शेड्यूल केलेले, सल्लात्मक)

हे cron शेड्यूलवर (आणि `workflow_dispatch` द्वारे) चालतात, PRs वर कधीही चालत नाहीत. हे सर्व सल्लात्मक आहेत.

| वर्कफ्लो               | काय प्रमाणित करते                                                                                                                                               | ब्लॉकिंग      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | यादृच्छिक seed आणि मोठ्या run count सह fast-check property चाचण्या                                                                                              | **सल्लात्मक** |
| `nightly-resilience`   | heap-growth गेट, chaos fault-injection, k6 load/soak                                                                                                            | **सल्लात्मक** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret शिवाय वगळले जातात)                                                                       | **सल्लात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` वापरून लाइव्ह OmniRoute विरुद्ध OpenAPI contract fuzzing (schemathesis) — स्पेसिफिकेशनचे उल्लंघन / न हाताळलेल्या 500s उघड करते (Fase 8 B.4) | **सल्लात्मक** |
| `nightly-mutation`     | जलद unit lane वरील Stryker mutation-testing स्कोअर — टिकून राहिलेले mutants कमकुवत asserts उघड करतात                                                            | **सल्लात्मक** |
| `nightly-compat`       | समर्थित `engines.node` श्रेणींमधील Node engine सुसंगतता मॅट्रिक्स                                                                                               | **सल्लात्मक** |

---

## वेग टप्पा (2026-08-30 → v4.0 LTS): प्रत्येक आधाररेषा 20% ने शिथिल केली

मालकाचा निर्णय (2026-08-30): v4.0 मॉड्युलरायझेशनपर्यंत, तांत्रिक कर्जाची मर्यादा कायम राखण्यापेक्षा
रिलीजचा वेग अधिक महत्त्वाचा आहे. प्रत्येक **संख्यात्मक** रॅचेट आधाररेषा एका
लेखापरीक्षणयोग्य प्रक्रियेत 20% ने शिथिल केली गेली आणि हा टप्पा `config/quality/quality-baseline.json` मध्ये घोषित केला आहे:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| काय बदलले                                                                                                                                                                                                                    | कुठे                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — कमी असणे चांगले असलेल्या संख्या ×1.2, जास्त असणे चांगले असलेल्या टक्केवाऱ्या ÷1.2 (कव्हरेजची किमान मर्यादा 60 कायम, `eslintErrors` अजूनही 0, `eslintWarnings` 0 → गोठवलेल्या suppression संख्येच्या 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` नोंदीत प्रत्येक आधीचे → नंतरचे मूल्य दिले आहे)   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` ओळ मर्यादा ×1.2                                                                                                                                                     | `file-size-baseline.json`                                                                              |
| प्रत्येक फाइलसाठी / प्रत्येक TS कोडसाठी संख्या ×1.2                                                                                                                                                                          | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` असताना `--require-tighten` केवळ सल्लात्मक होते                                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| रात्रीचे `bank-ratchet-shrinks` थांबते (ते मोजलेली घट साठवून उपलब्ध अतिरिक्त मर्यादा रद्द करेल)                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                          |

परवानगी-सूच्या (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) या **अर्थसंकल्पीय मर्यादा** नाहीत आणि त्यांना स्पर्श केलेला नाही. उत्तीर्ण/अनुत्तीर्ण धोरण-द्वारे (गोपनीय माहिती, SQL नियम,
दस्तऐवज/पर्यावरण करार, i18n समतुल्यता, युनिट चाचण्या) अपरिवर्तित आहेत — अपयशी चाचणी अजूनही अपयशीच आहे.

**साधने**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एकदाच केली जाणारी
  शिथिलीकरण प्रक्रिया (`scripts/quality/relax-baselines.mjs`); एकाच नोंदीसह ती दुसऱ्यांदा चालवण्यास नकार देते.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI ज्या पद्धतीने प्रत्येक संख्यात्मक द्वार मोजते त्याच पद्धतीने ते मोजते आणि प्रत्येक द्वारासाठी उरलेली अतिरिक्त मर्यादा दाखवते
  (`scripts/quality/baseline-headroom.mjs`). रात्रीचे `baseline-headroom` कार्य चालू असलेल्या
  **📈 Baseline headroom (velocity phase)** समस्येवर तक्ता पोस्ट करते आणि कोणतेही द्वार त्याच्या कमाल मर्यादेच्या 10% अंतरात असल्यास किंवा
  ती मर्यादा आधीच ओलांडली असल्यास `headroom-alert` लेबल जोडते. ती समस्या म्हणजे पूर्वसूचना आहे:
  काही दिवसांतच पूर्ण होणारी मर्यादा म्हणजे हे शिथिलीकरण संपूर्ण संघाऐवजी
  काही PR कडून वापरले जात आहे — संबंधित द्वाराच्या `_rebaseline_*` नोंदी पाहा.

**नवीन-कोड मोड (Clean-as-You-Code) — 2026-08-30 पासून, केवळ PR जलद मार्गासाठी**

`pull_request` इव्हेंटवर `quality.yml`, `check:file-size`,
`check:complexity-ratchets` आणि `check:dead-code` यांना `--base-ref <PR base SHA>` पाठवते. त्या मोडमध्ये द्वार HEAD ची
merge-base शी **PR ने बदललेल्या फाइलपुरती मर्यादित ठेवून** तुलना करते (`scripts/check/newCodeMode.mjs`:
merge-base तात्पुरत्या `git worktree` मध्ये प्रत्यक्षात आणला जातो, ESLint/knip तेथे आणि HEAD वर चालवले जातात आणि
प्रत्येक फाइलच्या संख्यांमधील फरक काढला जातो):

- **अवरोधक** — PR ने बदललेल्या फाइलमध्ये cyclomatic/cognitive उल्लंघने किंवा dead exports जोडले
  (लॉगमध्ये `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **सल्लात्मक** — गोठवलेल्या आधाररेषेच्या तुलनेतील जागतिक एकूण संख्या. वारशाने आलेले विचलन कधीही
  निर्दोष PR ला अपयशी ठरवत नाही; रिलीज समेटाच्या वेळी विचलन पुन्हा गोठवले जाते आणि headroom कार्याद्वारे त्यावर लक्ष ठेवले जाते.

`workflow_dispatch` धावा, release-green तपासणी आणि रात्रीचे headroom कार्य यांना PR आधार नसतो
आणि ते निरपेक्ष (जागतिक) तुलना कायम ठेवतात. कव्हरेज, पुनरावृत्ती आणि प्रकार-कव्हरेज सध्या
जागतिकच राहतात (त्यांची साधने प्रत्येक फाइलनुसार फरक स्वस्तात तयार करत नाहीत) — त्यांनाही अशीच प्रक्रिया लागू करण्याचा विचार आहे.

**v4.0 वर टप्पा समाप्त करणे (LTS = पूर्वीपेक्षा अधिक कडक, केवळ "पुन्हा सामान्य" नव्हे)**

1. स्वच्छ `release/v4.0.0` टिपवर: नोंदीसाठी `npm run quality:headroom --json`, त्यानंतर
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, प्रत्येक typecheck गेटचे
   `--update` चालवा — प्रत्येक baseline मोजलेल्या मूल्यापर्यंत खाली येतो.
2. `quality-baseline.json` मधून `_policy` हटवा (`--require-tighten` आणि रात्रीचे
   बँकिंग पुन्हा सक्रिय करते), `check-openapi-coverage.mjs` मध्ये `THRESHOLD = 36` (किंवा अधिक) पुनर्स्थापित करा.
3. मॉड्युलरीकरणाचा लाभ झालेल्या ठिकाणी मोजलेल्या मूल्यापेक्षा अधिक कडक मर्यादा लागू करा: file-size `cap` पुन्हा 1000
   (किंवा 800), coverage किमान मर्यादा +5, मॉड्युलर केलेल्या packages साठी dead exports 0.

## रॅचेट बेसलाइन (`quality-baseline.json`)

रॅचेट इंजिन (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` वाचते
आणि त्याची नव्याने संकलित केलेल्या `quality-metrics.json` शी तुलना करते. जी कोणतीही मेट्रिक
तिच्या एप्सिलॉनच्या पलीकडे खालावते, ती बिल्ड अयशस्वी करते.

सध्या ट्रॅक केल्या जाणाऱ्या मेट्रिक्स:

| मेट्रिक               | दिशा   | अर्थ                                    |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint इशाऱ्यांची संख्या वाढता कामा नये |
| `coverage.statements` | `up`   | स्टेटमेंट कव्हरेज कमी होता कामा नये     |
| `coverage.lines`      | `up`   | लाइन कव्हरेज कमी होता कामा नये          |
| `coverage.functions`  | `up`   | फंक्शन कव्हरेज कमी होता कामा नये        |
| `coverage.branches`   | `up`   | ब्रँच कव्हरेज कमी होता कामा नये         |

खरोखर सुधारणा झाल्यानंतर बेसलाइन अद्ययावत करण्यासाठी:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ्लॅग सध्याची मोजलेली मूल्ये `quality-baseline.json` मध्ये लिहितो.
मेट्रिक सुधारलेल्या बदलासोबत ही फाइल कमिट करा. मेट्रिक सुधारूनही बेसलाइन
अद्ययावत न करणारा PR `--require-tighten` द्वारे पकडला जाईल (टप्पा 6A.5,
अंमलबजावणी प्रलंबित).

### CodeQL रॅचेट: रीफ्रेश वारंवारता आणि मॅन्युअल ट्रिगर

`check:codeql-ratchet` **रिपॉझिटरीची स्थिती वाचतो, जी ठरावीक वेळापत्रकानुसार रीफ्रेश केली जाते — प्रत्येक PR साठी नाही.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` हे
`state: configured`, `schedule: weekly` नोंदवते: हे GitHub चे default-setup स्कॅन आहे, प्रत्येक पुशवरील
विश्लेषण नाही. परिणामतः: अलर्ट दुरुस्त करणारा PR मर्ज झाल्यानंतर, पुढील नियोजित स्कॅन
चालेपर्यंत रॅचेट जुनी, अधिक संख्या वाचत राहतो — त्यामुळे स्कॅन अद्ययावत होईपर्यंत
तो प्रत्येक खुल्या PR वर, दुरुस्ती करणाऱ्या PR च्या स्वतःच्या पुढील PR सह, रिग्रेशन नोंदवतो.

**मॅन्युअल रीफ्रेश**: `gh workflow run codeql.yml --ref release/vX.Y.Z` विश्लेषण पुन्हा
चालवते आणि काही मिनिटांत अलर्ट पुन्हा प्रकाशित करते. प्रथम `.github/workflows/codeql.yml`
वाचा — त्याच्या हेडरमध्ये स्पष्ट केले आहे की ते केवळ `workflow_dispatch` आहे, **कारण त्याचा
GitHub च्या "default setup" शी संघर्ष होतो** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ट्रिगर पुनर्स्थापित करण्यासाठी प्रथम **मालकाने कृती करणे** आवश्यक आहे: Settings → Code security →
CodeQL: Default → Advanced. तो बदल केल्याशिवाय `schedule:` ट्रिगर जोडू नका — त्यामुळे
केवळ अयशस्वी रन तयार होतील.

**संख्या कमी झाल्यानंतर बेसलाइन अधिक कडक करा** — `node scripts/check/check-codeql-ratchet.mjs
--update` नवीन मोजलेली संख्या `quality-baseline.json` →
`metrics.codeqlAlerts.value` मध्ये लिहिते, त्यामुळे रॅचेट जुन्या कमाल मर्यादेपर्यंतच्या रिग्रेशनला
गुपचूप परवानगी देत नाही. कार्य केलेले उदाहरण (2026-09-02/03): PR #12502 ने 7 वास्तविक अलर्ट
दुरुस्त केले (मोजलेले खुले अलर्ट 13 → 6); त्यानुसार PR #12530 ने गोठवलेली बेसलाइन 11 → 6 अशी
कडक केली; त्यानंतर उरलेले 6 अलर्ट प्रत्येक अलर्टसाठी स्वतंत्र समर्थन नोंदवून डिसमिस केले गेले
आणि खुल्या अलर्टची संख्या 0 झाली.

**डिसमिसल्स हा ऑपरेटरचा निर्णय आहे (कठोर नियम #14)** — डिसमिसल टिप्पणीमध्ये
तांत्रिक समर्थन नोंदवल्याशिवाय CodeQL अलर्ट कधीही डिसमिस करू नका: अपस्ट्रीम-प्रोटोकॉलच्या
आवश्यकतेसाठी `won't fix`, चाचणी फिक्स्चरसाठी `used in tests`, CodeQL ला न दिसणाऱ्या
सॅनिटायझरसाठी `false positive` (पूर्वोदाहरण: `docs/security/ERROR_SANITIZATION.md`).

---

## चाचणी पुनर्प्रयत्न धोरण (WS5.4, v3.8.49)

पुनर्प्रयत्न प्रत्येक रनरसाठी स्वतंत्र आहे, कधीही सर्वांना लागू होणारा जागतिक नियम नाही — सर्वांना लागू होणारा पुनर्प्रयत्न वास्तविक रिग्रेशन्सना
अदृश्य अधूनमधून होणाऱ्या अपयशांमध्ये रूपांतरित करतो:

| रनर              | धोरण                                                                                                                                                        | कारण                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | केवळ CI मध्ये `retries: 1`, तसेच `trace: on-first-retry`                                                                                                    | ब्राउझर/नेटवर्क टाइमिंग खरोखरच अनिर्धारित असते; ट्रेससह एक पुनर्प्रयत्न अधूनमधून होणाऱ्या अपयशाला निदान करता येण्याजोग्या आर्टिफॅक्टमध्ये बदलतो |
| Vitest           | जागतिक पुनर्प्रयत्न नाही. अधूनमधून अपयशी ठरणे सिद्ध झालेल्या चाचणीला स्पष्ट प्रतिचाचणी पुनर्प्रयत्न मिळतो (diff मध्ये दृश्यमान, PR मध्ये पुनरावलोकन केलेला) | यामुळे क्वारंटाइन यादी repo मध्ये राहते, कधीही अपारदर्शक होत नाही                                                                               |
| node:test (unit) | कधीही पुनर्प्रयत्न नाही                                                                                                                                     | अधूनमधून अपयशी होणारी युनिट चाचणी हा चाचणीतील बग आहे — तो दुरुस्त करा, ती चाचणी पुन्हा नशिबावर चालवू नका                                        |

अधूनमधून होणाऱ्या अपयशांची टेलिमेट्री उपलब्ध झाल्यानंतरची लक्ष्यित SLOs (WS5.2/5.3): प्रत्येक चाचणीसाठी <1% अधूनमधून अपयश दर
("आत्ताच दुरुस्त करा" मर्यादा), प्रत्येक पाइपलाइनसाठी ≥95% उत्तीर्ण दर. उद्योगातील संदर्भ मूल्ये —
आमच्या स्वतःच्या मोजमापांनुसार पुन्हा कॅलिब्रेट करा.

## रिलीज-स्तरीय रॅचेट ड्रिफ्ट (WS5.5, v3.8.49)

जेव्हा एखादा रॅचेट (फाइल आकार, जटिलता, eslint इशारे) PURE रिलीज
टिपवर रिग्रेस होतो — म्हणजेच मर्जेसच्या एकत्रित परिणामामुळे तो रिग्रेस झाला आणि कोणताही एक PR स्वतःच्या ब्रँचवर तो
रिग्रेशन पुन्हा निर्माण करत नाही — तेव्हा दुरुस्तीची जबाबदारी **रिलीज कॅप्टनची, एकदाच, रिलीज
ब्रँचवर** असते: एक्स्ट्रॅक्शन/रिफॅक्टरला प्राधान्य द्या; केवळ दस्तऐवजीकृत
समर्थन नोंदीसहच बेसलाइन पुन्हा निश्चित करा. कॉम्बिनेशन ड्रिफ्टचे ओझे कधीही योगदानकर्त्याच्या PR वर टाकू नका आणि
प्रत्येक PR साठी बेसलाइन पुन्हा निश्चित करू नका (त्यामुळे वास्तविक रिग्रेशन्स लपतात). प्रथम फरक ओळखा: तुमच्या PR मुळे ते झाले असे गृहीत धरण्यापूर्वी
प्रोब worktree मध्ये शुद्ध टिपविरुद्ध रेड पुन्हा निर्माण करा.

## रॅचेटमधील कपात बँक करणे — खालच्या दिशेने (#8584)

रॅचेट केवळ अर्धवट स्वयंचलित आहे आणि स्वयंचलित झालेला भाग चुकीचा आहे. मर्यादा **वाढवणे** हे
दहा सेकंद लागणारे हाताने केलेले JSON संपादन आहे आणि रेड PR अनब्लॉक करण्याचा सर्वांत जलद मार्ग आहे.
मर्यादा **कमी करण्यासाठी** कोणीतरी `--update` चालवून त्याचा परिणाम कमिट करणे आवश्यक आहे — आणि
`bank-ratchet-shrinks` जॉब उपलब्ध होईपर्यंत कोणताही वर्कफ्लो ते चालवत नव्हता. मोजलेला परिणाम
(2026-07-25): 18 फ्रोझन फाइल्स आधीच 800-ओळींच्या नवीन-फाइल मर्यादेवर किंवा त्याखाली होत्या, सर्वांत वाईट
132× वर (`src/shared/validation/schemas.ts`, 19 ओळींसाठी 2,523 ची मर्यादा); जटिलतेची कमाल मर्यादा
~37 बेसलाइन-पुनर्निर्धारण नोंदींमध्ये `1794 → 2169` अशी वाढली आणि त्यात नेमकी एक
घट (−1) झाली; तसेच "पुढील चक्रात `--update` द्वारे कडक करा" असे 31 वेळा लिहिले गेले आणि
एकदाच पाळले गेले. ज्या कोडमुळे मर्यादा मिळाली त्या कोडपेक्षा अधिक काळ टिकणारी मर्यादा, पूर्ण झालेल्या प्रत्येक
विघटनाला, पुढे ती फाइल संपादित करणाऱ्या व्यक्तीसाठी वाढीच्या मुभेत शांतपणे रूपांतरित करते.

`nightly-release-green.yml` → जॉब **`bank-ratchet-shrinks`** हे चक्र पूर्ण करतो:

|         |                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------- |
| चालतो   | `schedule` (3×/दिवस) + `workflow_dispatch` — मुद्दाम **`push` वर नाही**                                 |
| मोजतो   | सर्वोच्च `release/vX.Y.Z`, `release-green` प्रमाणेच रिझोल्यूशन + इंजेक्शन गार्ड                         |
| लिहितो  | `check:file-size --update` आणि `check:complexity-ratchets --update` (दोन्ही रचनेनुसार केवळ कपात करणारे) |
| पडताळतो | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                |
| पाठवतो  | रिलीज ब्रँचविरुद्ध नेहमी अद्ययावत असलेला एक PR — सक्तीने अद्ययावत केला जातो, कधीही स्पॅम केला जात नाही  |

बँकिंग प्रत्येक पुशऐवजी बॅचमध्ये केले जाते, कारण त्यासाठी विलंबाची कोणतीही अट नाही (8 तासांच्या आत
बँक केलेली कपात पुरेशी आहे), तर प्रत्येक मर्जवर चालवल्यास मर्ज मोहिमांदरम्यान PR ब्रँच वारंवार
पुन्हा बिल्ड होईल आणि प्रत्येक वेळी संपूर्ण ESLint वॉकची किंमत मोजावी लागेल. शोध `push` वरच राहतो
(`release-green`); केवळ बँकिंग बॅचमध्ये केले जाते.

### सुरक्षा पडताळक

जॉब देखरेखीशिवाय बेसलाइन्समध्ये लिहितो, त्यामुळे `verify-ratchet-bank.mjs` मुळेच
ते स्वीकारार्ह ठरते. तो `--update` नंतरच्या ट्रीचा `HEAD` विरुद्ध diff घेतो आणि प्रत्येक बदल खालीलपैकी एक नसल्यास
**कोणताही कमिट अस्तित्वात येण्यापूर्वी जॉब रद्द करतो** — कोणताही PR उघडत नाही:

- एखादी `frozen` / `testFrozen` संख्यात्मक नोंद **कमी केलेली** किंवा **काढलेली**
- `complexity-baseline.json` → `count` **कमी केलेला**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **कमी केलेले**

इतर काहीही अपयशी ठरते: संख्या वाढवणे, नोंद जोडणे, `cap`/`testCap` बदलणे किंवा
`_rebaseline_*` नोंद हटवणे/पुन्हा लिहिणे (प्रत्येक कमाल मर्यादा का अस्तित्वात आहे याचा ऑडिट मागोवा या नोंदी आहेत
आणि त्या फाइल नोंदींसोबत त्याच `frozen` ऑब्जेक्टमध्ये साठवल्या जातात).
मर्यादा वाढवू शकणारा बॉट विद्यमान स्थितीपेक्षा निश्चितच अधिक वाईट ठरेल. रिग्रेशन
गार्ड: `tests/unit/verify-ratchet-bank.test.ts`.

जॉब कधीही `release/*` वर पुश करत नाही — मानव PR मर्ज करतो, त्यामुळे चुकीचे मोजमाप
पुनरावलोकनाशिवाय समाविष्ट होऊ शकत नाही.

## अनुमतसूची धोरण

पूर्वीपासून अस्तित्वात असलेल्या उल्लंघनांवर अपयशी होऊ न शकणारा प्रत्येक गेट गोठवलेली अनुमतसूची वापरतो
(उदा., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). धोरण असे आहे:

**मूळ कारण दुरुस्त करा; उल्लंघन पूर्वीपासून अस्तित्वात असेल आणि त्याच PR मध्ये
दुरुस्त करता येत नसेल, तेव्हाच अनुमतसूची वापरा.**

अनुमतसूचीत नोंद जोडताना:

1. कारणमीमांसेसह टिप्पणी समाविष्ट करा.
2. ट्रॅकिंग इश्यूचा संदर्भ द्या (उदा., `// #3498 — टप्पा 2 वैशिष्ट्य, अद्याप अंमलात आणलेले नाही`).
3. उल्लंघन दुरुस्त करणाऱ्या त्याच PR मध्ये नोंद काढून टाका — जे कोणतेही सक्रिय उल्लंघन यापुढे
   दडपत नाही अशी कालबाह्य नोंद ही स्वतःच एक त्रुटी आहे (अंमलबजावणी झाल्यानंतर 6A.3 कालबाह्य-अंमलबजावणी
   अनाथ अनुमतसूची नोंदीवर गेट अपयशी करेल).

चाचण्या अधिक लवकर उत्तीर्ण करण्यासाठी अनुमतसूची नोंदी जोडू **नका**. वाढत्या
अनुमतसूचीसह हिरवा गेट गुणवत्तेबद्दलचा खोटा दिलासा आहे.

### तुमच्या PR वर गेट अपयशी झाल्यास

1. **गेटचे आउटपुट काळजीपूर्वक वाचा** — कोणत्या फाइलने किंवा चिन्हाने नियमाचे उल्लंघन केले आहे, हे ते नेमकेपणाने सांगते.
2. **उल्लंघन दुरुस्त करा** — बहुतांश गेट या निर्धारक फाइलसिस्टम तपासण्या आहेत ज्या कोड योग्य होताच उत्तीर्ण होतात.
3. **उल्लंघन पूर्वीपासून अस्तित्वात असल्यास** (म्हणजे, तुम्ही ते आणलेले नाही, पण आता गेटने ते
   कव्हर केले आहे): कारणमीमांसा टिप्पणी आणि ट्रॅकिंग इश्यूसह अनुमतसूची नोंद जोडा.
4. **गेट रॅचेट असल्यास** (कव्हरेज, ESLint चेतावण्या, पुनरावृत्ती, गुंतागुंत):
   तुमच्या बदलामुळे मेट्रिक खालावले आहे. मूळ समस्या दुरुस्त करा, किंवा बदल हेतुपुरस्सर असेल आणि मेट्रिकमधील
   घसरण स्वीकारार्ह असेल तर (क्वचितच) `npm run quality:ratchet -- --update` चालवा —
   पण PR वर्णनात त्याचे कारण नमूद करा.
5. **सल्लागार गेट** (`continue-on-error: true`) माहितीपर असतात — ते मर्ज रोखत नाहीत,
   पण CI सारांशात दिसतात. तरीही ते दुरुस्त करा.

---

## नवीन गेट जोडणे

1. `scripts/check/check-<name>.mjs` (किंवा `.ts`) तयार करा. धोरण गेट 0/1 एक्झिट करतात.
   रॅचेट-शैलीचे गेट `collect-metrics.mjs` द्वारे `quality-metrics.json` मध्ये मेट्रिक उत्सर्जित करतात.
2. `package.json` मध्ये `"check:<name>": "node scripts/check/check-<name>.mjs"` जोडा.
3. योग्य जॉबअंतर्गत `.github/workflows/ci.yml` मध्ये ते जोडा
   (धोरण → `lint` किंवा `docs-sync-strict`; रॅचेट → `quality-gate`).
4. त्यात अनुमतसूची असल्यास, कालबाह्य नोंदी आपोआप शोधण्यासाठी
   `scripts/check/lib/allowlist.mjs` मधील `reportStaleEntries()` लागू करा.
5. गेटच्या शोध तर्काला कव्हर करणारी चाचणी `tests/unit/build/` मध्ये लिहा.
6. हा दस्तऐवज अद्ययावत करा (संबंधित जॉब तक्त्यात एक पंक्ती जोडा).

---

## एजंट साधने: LSP-in-the-loop (ऐच्छिक)

CI गेटच्या पलीकडे, OmniRoute मध्ये **ऐच्छिक** `agent-lsp` मूलभूत संरचना
(प्रकल्प-स्तरीय `.mcp.json`, टप्पा 7 कार्य 15) समाविष्ट आहे. कोडिंग एजंटना TypeScript भाषा सर्व्हर उपलब्ध करून देण्यासाठी `.mcp.json`
तयार करा, जेणेकरून ते कोड लिहिण्यापूर्वीच चिन्हे /
निदानांचे निराकरण करतील — स्रोतावरच "कल्पित चिन्ह" त्रुटी कमी करणारा
`typecheck:core` चा संकलन-करा-मग-दावा-करा सहकारी. हे हेतुपुरस्सर
आपोआप लोड केले जात नाही (तुम्ही MCP↔LSP ब्रिज निवडून पडताळता); सदोष नोंद केवळ
कनेक्शन त्रुटी लॉग करते आणि सत्रे कधीही खंडित करत नाही.

---

## सुसूत्रीकरण अनुशेष (ROI पुनरावलोकन — टप्पा 9 लाट 3)

ही सूची 2026-06-17 रोजी `ci.yml` च्या तुलनेत समेट करण्यात आली होती (आधीच्या आवृत्तीमध्ये
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` वगळले गेले होते). समेट केलेल्या संचाच्या ROI पुनरावलोकनाने
खालील सुसूत्रीकरण उमेदवार ओळखले. **विलीनीकरणे ही यांत्रिक CI
बदल आहेत; फ्लिप/वगळण्याचे निर्णय हे ऑपरेटरसाठी राखीव धोरणात्मक निर्णय आहेत.** खालीलपैकी काहीही
अद्याप लागू केलेले नाही.

**वर दस्तऐवजीकरण न केलेले आणखी घटक** (सल्लात्मक, कमी संकेत): `docs-lint` जॉब
(markdownlint + Vale, संपूर्ण जॉब `continue-on-error`) आणि स्वतंत्र स्कॅनर वर्कफ्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` हे
`quality-baseline.json` मध्ये आहे, परंतु `ci.yml` मधील ब्लॉकिंग रॅचेटशी जोडलेले नाही — हे मेट्रिक
सध्या अनाथ आहे.

### विलीनीकरण / डिड्युप्लिकेशन (यांत्रिक, कमी जोखीम)

प्रत्येक उमेदवाराची 2026-06-17 रोजी प्रत्यक्ष गेट स्थितीच्या तुलनेत पडताळणी करण्यात आली (विश्वास ठेवा, पण पडताळा);
अनेक "सुस्पष्ट" विलीनीकरणांमध्ये तांत्रिक ऋण दडलेले असल्याचे आढळले आणि ती **स्वच्छ थेट पर्याय** नाहीत.

- **`check:docs-sync` दोनदा चालते** — `lint` जॉबमध्ये स्वतंत्रपणे आणि पुन्हा `check:docs-all` (`docs-sync-strict`) तसेच husky pre-commit हुकमध्ये. ✅ **पूर्ण** — स्वतंत्र `lint` आवाहन काढून टाकले.
- **CVE स्कॅनिंग** — ❌ **स्वच्छ विलीनीकरण नाही.** कोणत्याही उच्च/गंभीर CVE वर `audit:deps` हार्ड-फेल होते; `check:vuln-ratchet` (osv) फक्त आधाररेषेच्या तुलनेत _प्रतिगमन_ झाल्यास अपयशी होते (सध्या 1 MODERATE). अर्थभेद आहेत — `audit:deps` वगळल्यास निरपेक्ष उच्च/गंभीर गेट नष्ट होईल. दोन्ही ठेवा.
- **चक्र शोध** — ✅ **पूर्ण** (#15159 G-01/G-02). येथील जुन्या मजकुराने `check:cycles` ला "हिरवा, निवडक" गेट म्हटले होते आणि `check:circular-deps` (dpdm) ने 91 चक्रे नोंदवल्यामुळे ते ब्लॉकिंग ठेवण्याचे समर्थन केले होते. तो हिरवा निकाल **खोटा हिरवा** होता: `check:cycles` ने 5 उपनिर्देशिका (450 फाइल्स) स्कॅन केल्या, फक्त स्थिर `import|export … from` जुळवले आणि प्रत्येक `@/` व `@omniroute/open-sse/` स्पेसिफायर वगळला, त्यामुळे रेपोमध्ये प्रबळ असलेली डायनॅमिक-import + alias चक्रे त्याला दिसू शकली नाहीत. दुरुस्त केले: गेट आता `src` + `open-sse` (5023 फाइल्स) मधून जाते, TypeScript AST मधून स्पेसिफायर संकलित करते (म्हणून `import("…")` मोजले जाते आणि type-position `typeof import("…")` मोजले जात नाही), तसेच tsconfig `paths` रिजॉल्व्ह करते. त्याला 0 नव्हे, तर **14** चक्रे आढळतात. आधीपासून अस्तित्वात असलेली 14 चक्रे गेट PR मध्ये दुरुस्त करता येत नसल्यामुळे, `check:cycles` आता **रॅचेट** आहे (`--ratchet`, `quality-baseline.json` मध्ये कमाल मर्यादा `metrics.cycles.value = 14`, `direction: down`) — ते कोणतेही _प्रतिगमन_ ब्लॉक करते आणि संख्या फक्त कमी होऊ शकते. CI मध्ये `npm run check:cycles:ratchet` चालते. कमी करण्याचे काम **A-01** सोबत केले जाईल. व्यापक दुसरे मत म्हणून `check:circular-deps` (dpdm) सल्लात्मक राहते.
- **गुंतागुंत** — ✅ **पूर्ण** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint वॉक, ruleId नुसार मोजणी, जेणेकरून cyclomatic+max-lines आणि cognitive आधाररेषा स्वतंत्र राहतील; स्थानिक `--update` साठी स्वतंत्र `check:complexity` / `check:cognitive-complexity` कायम राहतात.
- **`/api` भ्रम-विरोधी तपासणी** — ✅ **पूर्ण** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` ची एक FS सूची, openapi-routes + docs-symbols अजूनही स्वतंत्रपणे अहवाल देतात; स्थानिक रनसाठी स्वतंत्र तपासण्या कायम राहतात.
- **`check:node-runtime` 11 जॉबमध्ये चालते** — ⚠️ **कमी ROI.** प्रत्येक स्वतंत्र रनर आहे आणि तपासणी <1s आहे; स्वस्त प्रति-जॉब संरक्षक गमावण्याच्या बदल्यात एकूण बचत ~10s. या उलथापालथीची किंमत योग्य नाही.
- **CI lint वरील `typecheck:noimplicit:core`** — ✅ **lint जॉबमधून काढले** (पूर्वी सल्लात्मक `continue-on-error` होते); ब्लॉकिंग प्रकार-पृष्ठभाग म्हणजे `typecheck:core` + `check:type-coverage`. स्थानिक स्क्रिप्ट कायम ठेवली.

### फ्लिप / निर्णय (ऑपरेटर धोरण)

- `check:openapi-security-tiers` (सल्लात्मक) — ❌ **स्वच्छपणे फ्लिप करता येत नाही.** ते 0 सह बाहेर पडते, परंतु `LOCAL_ONLY_API_PREFIXES` अंतर्गत अनेक `traffic-inspector` रूट्समध्ये `x-loopback-only: true` भाष्य नसल्याची चेतावणी देते. त्याची अंमलबजावणी करण्यासाठी आधी `openapi.yaml` मध्ये ही भाष्ये जोडावी लागतील.
- `typecheck:noimplicit:core` (सल्लात्मक) — ब्लॉकिंग `check:type-coverage` रॅचेटमध्ये मोठ्या प्रमाणावर समाविष्ट आहे. रॅचेटमध्ये फ्लिप करा किंवा अनावश्यक दुसरा `tsc` पास वगळा.
- `test:vitest:ui` (आता **ब्लॉकिंग**) — आधीपासून अस्तित्वात असलेली अपयशे `vitest.config.ts` मध्ये `// #8618` ट्रॅकिंग टिप्पण्यांसह स्पष्टपणे वगळली आहेत; नवीन अपयशांमुळे जॉब अपयशी होतो.
- `check:secrets` (gitleaks, 3 दस्तऐवजीकृत चुकीच्या-सकारात्मक निकालांवर गोठवलेले ब्लॉकिंग रॅचेट) — 0 पर्यंत पोहोचण्यासाठी त्या 3 निकालांना allowlist मध्ये जोडा किंवा सल्लात्मक स्तरावर अवनत करा. GitHub चे मूळ secret-scanning + `check:public-creds` यांच्याशी आच्छादित होते.
- `check:pr-evidence` (ब्लॉकिंग, PR-body मधील गद्य मजकुरावर grep करते) — चुकीच्या-सकारात्मक निकालांचा उच्च धोका; वगळल्यास कठोर नियम #18 ची अंमलबजावणी कमकुवत होते, त्यामुळे हा खरोखरच धोरणात्मक निर्णय आहे.
- `semgrep` (स्वतंत्र सल्लात्मक) — OWASP कुटुंबांसाठी CodeQL शी आच्छादित होते; त्याची आधाररेषा रॅचेटशी जोडा किंवा वगळा.

---

## संबंधित दस्तऐवजीकरण

- पुरवठा-साखळी (उत्पत्ती, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — की-संच समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, जॉब `i18n-ui-coverage`).
प्रत्येक `src/i18n/messages/<locale>.json` मधील लीफ की-संचाची `en.json` शी तुलना करते आणि
की कधी जोडली गेली याची पर्वा न करता, कोणतीही लीफ अनुपस्थित किंवा अतिरिक्त असल्यास अपयशी ठरते.
`__MISSING__:` प्लेसहोल्डर उपस्थित म्हणून मोजले जातात (त्यांचा मजकूर हा गुणोत्तर गेटचा विषय आहे).
हे दोन diff-आधारित/टक्केवारी गेटचे पूर्णतः पूरक आहे: `check-ui-keys-coverage` प्रत्येक
लोकेलसाठी 80 % ची किमान मर्यादा लागू करते (~13,000 पैकी 43 की अनुपस्थित असल्या तरीही 99.7 %
दिसते) आणि `check-new-key-coverage` फक्त PR ने `en.json` मध्ये जोडलेल्या की तपासते.
लोकेल बॅचची शाखा ज्या दिवशी तयार केली जाते, त्या दिवसाच्या `en.json` वरून ती निर्माण होते आणि
बेसमध्ये नवीन की जोडल्या जात असताना अनेक दिवस भाषांतर सुरू राहते; बॅच PR स्वतः कोणतीही की जोडत
नाही, त्यामुळे बॅच 1 (#13044) नऊ लोकेलमध्ये 43 की कमी असताना आणि बॅच 2 (#13660) आठ लोकेलमध्ये
10 की कमी असताना समाविष्ट झाली, तरी दोन्ही संबंधित गेट शांत राहिले (2026-09-15). लाल स्थितीचे
निराकरण करण्यासाठी `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`
वापरा; `extra` लीफचा अर्थ स्रोतामधून ती काढून टाकली आहे — ती लोकेलमधून हटवा.
`--warn` अपयशी न ठरवता अहवाल देते. `--catalog=cli` हेच तुलनात्मक परीक्षण
`bin/cli/locales` वर चालवते (`npm run i18n:check-keys:cli`); दोन्ही पायऱ्या
`i18n-ui-coverage` जॉबमध्ये आहेत.

#### `check-new-key-coverage` — नवीन-की i18n गेट

`check-ui-value-drift` चे संबंधित गेट. ते इंग्रजी मूल्य **पुन्हा लिहिले** गेले असताना त्याची
भाषांतरे मागे राहिल्याचे शोधते; हे गेट इंग्रजी की **जोडली** गेली असताना काही लोकेलना ती
कधीच मिळाली नसल्याचे शोधते.

`check-ui-keys-coverage` या प्रकारची समस्या शोधू शकत नाही: ते प्रत्येक लोकेलसाठी टक्केवारीची
किमान मर्यादा लागू करते आणि ~13,000 पैकी अकरा की अनुपस्थित असल्या तरी कव्हरेज 99.9% राहते.
प्रत्येक भाषेची टक्केवारी "हे वैशिष्ट्य भाषांतराशिवाय प्रदर्शित झाले" हे व्यक्त करू शकत नाही —
संपूर्ण वैशिष्ट्य मजकुराविना नवीन लोकेलमध्ये दाखल होऊ शकते आणि तरीही आकडा अजिबात बदलत नाही.

हे ज्या घटनेची नोंद ठेवते ती अशी: Orchestration Canvas च्या Phase 3 मधील अकरा कींचे त्या वेळी
अस्तित्वात असलेल्या 42 लोकेलमध्ये भाषांतर झाले. काही तासांनंतर EU-भाषा बॅचने (#13044) रेपोची
लोकेल-संख्या 51 केली आणि नऊ नव्या लोकेलना (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
त्या की कधीच मिळाल्या नाहीत. अनुपस्थित कीसाठी `deepMergeFallback` इंग्रजी मजकूर वापरते,
त्यामुळे अपयशाचा परिणाम रिकाम्या UI ऐवजी भाषांतर न झालेल्या UI च्या स्वरूपात झाला — प्रत्यक्ष,
आणि रचनेनुसार निःशब्द.

त्याच्या संबंधित गेटप्रमाणे हेही **diff-जागरूक** आहे; ते मर्ज बेसवरील इंग्रजीची वर्किंग ट्रीशी
तुलना करते, त्यामुळे आधीपासून असलेल्या त्रुटी तशाच स्थिर राहतात आणि गेट सुरू करण्यासाठी
कोणतेही मायग्रेशन आवश्यक नव्हते.

**`__MISSING__:<english>` मार्कर ही अट पूर्ण करत नाही (2026-09-17 पासून).** पूर्वी तो
दस्तऐवजीकृत स्थगितीचा पर्याय होता — रनटाइम योग्य इंग्रजीवर फॉलबॅक होते — पण 2026-09-16 रोजी
आठ वैशिष्ट्य PR नी 61 की जोडल्या आणि भाषांतर करण्याऐवजी सर्व 65 लोकेलमध्ये मार्कर लावला:
या गेटने प्रत्येक PR स्वीकारला, कोणताही PR रोखला गेला नाही आणि त्यानंतर ब्लॉकिंग
वास्तविक-भाषांतर गुणोत्तर गेट सर्वांसाठी रिलीज टिपवर अपयशी ठरले (pt-BR 3.2 % > 2.5 % + 0.5).
आता मार्करला अनुपस्थित भाषांतर मानले जाते. लाल स्थितीचे निराकरण करण्यासाठी
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
वापरा किंवा `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
डिटॅच्ड-सुरक्षित, `OMNIROUTE_TRANSLATION_*` env शिवाय सुरू होण्यास नकार देते) वापरून सर्व
लोकेलचे समांतर भाषांतर करा. जी की इंग्रजीतच राहणे आवश्यक आहे (पिन केलेले
उत्पादन/इंजिन/फ्लॅग नाव), ती `scripts/i18n/untranslatable-keys.json` मध्ये असली पाहिजे,
मार्करच्या मागे कधीही नाही. `vi` मध्ये मार्करवर पूर्ण बंदी आहे
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — बाजूला ठेवलेल्या चाचण्यांचे गेट

`vitest.config.ts` च्या `exclude` यादीतील फाइल ही न चालणारी चाचणी असते, आणि ट्री वाचणाऱ्या
व्यक्तीला ती कव्हरेजसारखी दिसते. बासष्ट फाइल खालील टिप्पणीच्या मागे जमा झाल्या:
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618
2026-08-11 रोजी बंद करण्यात आला, पण त्याने ट्रॅक केलेली यादी 45 नोंदींवरून 62 नोंदींपर्यंत
वाढली; प्रत्येक नवीन नोंदीला बंद झालेल्या issue कडे निर्देश करणारी टिप्पणी वारशाने मिळाली.
शेवटी यादीतील प्रत्येक फाइल स्वतंत्रपणे मोजली गेली तेव्हा (#13204), **62 पैकी 51 फाइल कोणताही
स्रोत-बदल न करता वर्तमान ट्रीवर यशस्वी झाल्या**.

वास्तविक फाइलमध्ये रूपांतरित होणाऱ्या प्रत्येक exclusion ने (a) ट्रॅकिंग issue चे नाव देणे आणि
(b) त्याच्या मोजलेल्या स्थितीसह `config/quality/vitest-exclusions.json` मध्ये दिसणे हे गेट
अनिवार्य करते, जेणेकरून एखादी exclusion जोडणे म्हणजे 60-नोंदींच्या अॅरेमध्ये आणखी एक ओळ
जोडण्याऐवजी स्वतंत्र फाइलमधील पुनरावलोकनयोग्य diff ठरेल. हे मुद्दाम वगळलेल्या चाचण्या पुन्हा
चालवत नाही — त्यासाठी ~10 मिनिटे लागतात आणि ते नियतकालिक जॉबमध्ये असायला हवे; प्रत्येक चाचणी
शेवटची कधी मोजली गेली याची नोंद इन्व्हेंटरीमध्ये असते.
