# Quality Gates Reference (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

यो दस्तावेज OmniRoute का सबै CI गुणस्तर गेटहरूको आधिकारिक सन्दर्भ हो।
यसले प्रत्येक गेट, त्यसले के प्रमाणीकरण गर्छ, त्यो कुन CI job मा चल्छ, त्यसले
ratchet baseline वा pass/fail नीति प्रयोग गर्छ कि गर्दैन, र त्यसले build रोक्छ वा केवल सल्लाहकारी हो भन्ने वर्णन गर्छ।

छोटो सारांश र allowlist नीतिका लागि `AGENTS.md` को "Quality Gates & Ratchets" खण्ड
हेर्नुहोस्। यही प्रणालीको महत्त्वपूर्ण मूल्याङ्कन, परिपक्वता वर्गीकरण, र उपकरण-निरपेक्ष
पुनरावृत्ति योजनाका लागि
[गुणस्तर गेट प्लेबुक](../ops/QUALITY_GATE_PLAYBOOK.md) हेर्नुहोस्।

---

## गेट सूची र कार्यान्वयन प्रोफाइलहरू

### उम्मेदवार स्वीकृति

CI र Quality Gates कार्यप्रवाहहरूले प्रत्येकले स्थिर निर्णय उत्सर्जन गर्छन्: `Gate / CI` र
`Gate / Quality`। तिनको संस्करणबद्ध स्वीकृति नीतिले प्रत्येक अपस्ट्रिम कार्यलाई
आवश्यक वा परामर्शात्मकका रूपमा सूचीकृत गर्छ। लागू हुने आवश्यक कार्य सफल हुनैपर्छ: हराएका,
रद्द गरिएका, छोडिएका, विचाराधीन र अज्ञात नतिजाहरूले PASS स्थापित गर्न सक्दैनन्। मान्य
docs-only वा catalog-only वर्गीकरणले कोड लेनलाई अनुपयुक्त बनाउन सक्छ;
ड्राफ्ट PR स्वीकृत उम्मेदवार होइन। `hotfix` लेबलले प्रमाणको आवश्यकता हटाउँदैन।

दुवै कार्यप्रवाहले PR हरू र main/release शाखाहरूमा हुने पुशहरू, म्यानुअल डिस्प्याच र
मर्ज-समूह घटनाहरू समेट्छन्। पुश, डिस्प्याच र मर्ज-समूहले पूर्ण छनोट चलाउँछन्। फोर्कहरू
र मर्ज समूहहरूले अन्यथा self-hosted रनरहरू चयन गर्ने कार्यहरूका लागि hosted रनरहरू
प्रयोग गर्छन्; रोलआउटअघि पर्याप्त hosted क्षमता प्रमाणित गर्नुपर्छ।

प्रत्येक JSON रसिदले चेकआउट गरिएको SHA, कार्यप्रवाह रन र प्रयास पहिचान गर्छ।
CLI ले checkout/event SHA बेमेल अस्वीकार गर्छ। कार्यप्रवाह परीक्षणहरूले नीति सदस्यतालाई
निर्णय कार्यको `needs` सूचीसँग बाँध्छन्, ताकि नयाँ वा हटाइएको लेन चुपचाप हराउन नसकोस्।
रसिदहरूले आफ्नै कार्यप्रवाह समेट्छन्, प्रकाशन, परिनियोजन वा विद्यमान परामर्शात्मक
स्क्यानरका आन्तरिक पक्षहरू होइनन्। शाखा नियमहरूमा दुवै जाँच नाम सक्रिय गर्नु छुट्टै
प्रशासनिक परिवर्तन हो; यी कार्यहरू थप्दैमा शाखा आफैं सुरक्षित हुँदैन।

### स्थिर स्क्यान सूची

संस्करणबद्ध npm-alias सूची र static-scan सदस्यता
`config/quality/gate-manifest.json` मा रहन्छन्। स्क्रिप्ट नामहरू र ठ्याक्कै मिल्ने आदेशहरू
`package.json` सँग प्रमाणीकरण गर्न `npm run check:gate-manifest` चलाउनुहोस्; थप, हटाइ र
आदेशमा आएको विचलनले स्थानीय हुक र CI का परिवर्तन-वर्गीकरण कार्यहरू दुवैलाई असफल बनाउँछ।
एउटा alias कार्यप्रवाह कार्य, matrix instance वा परीक्षण केस होइन: यी गणनाहरूलाई
परस्पर साट्न मिल्ने रूपमा प्रस्तुत गर्नु हुँदैन।

चयन गरिएका aliases लाई कार्यान्वयन नगरी निरीक्षण गर्न
`npm run quality:scan -- --list` वा `npm run quality:scan:fast -- --list` प्रयोग गर्नुहोस्।
रनरले npm entrypoint आह्वान गर्छ, त्यसैले यसको runtime (कन्फिगर गरिएको ठाउँमा Bun सहित)
संरक्षित रहन्छ। manifest ले ती प्रोफाइलबाहिरका aliases लाई छुट्टै आह्वान गरिने रूपमा
अभिलेख गर्छ, र read-only scan प्रोफाइलहरूमा मर्मतसम्भार आदेशहरू निषेधित छन्।

यी प्रोफाइलहरूले static scan मात्र समेट्छन्। तिनले उत्पादन परीक्षण, coverage, packaging,
बाह्य जाँचहरू वा उम्मेदवारको पूर्ण release acceptance प्रमाणित गर्दैनन्।
कार्यप्रवाह स्वीकृतिले लिङ्क गरिएको `config/quality/admission-policy.json` र
`scripts/quality/admission-verdict.mjs` प्रयोग गर्छ। Release-observer प्रोफाइलहरू अलग नै रहन्छन्;
तिनका लागू हुने जाँचहरू र रसिदहरू स्वतन्त्र रूपमा निरीक्षण गर्नुहोस्। तलको गद्य
सूची सन्दर्भ हो, गेट वास्तवमै चलेको प्रमाण होइन।

स्क्रिप्टहरू `scripts/check/` (नीति गेटहरू) र `scripts/quality/` (ratchet engine) अन्तर्गत रहन्छन्।
CI को आधिकारिक स्रोत `.github/workflows/ci.yml` हो।

### Release PR द्रुत-पथ (`quality.yml`)

`.github/workflows/quality.yml` ले main/release PR हरू, सुरक्षित-शाखा पुशहरू,
डिस्प्याच र मर्ज समूहहरूमा CI लाई पूरक बनाउँछ। PR हरूले path-filtered द्रुत जाँचहरू प्रयोग गर्छन्।
स्थायी रूपमा निष्क्रिय गरिएको दोहोरो build हटाइएको छ; वास्तविक build/package/boot जाँचहरू CI मै रहन्छन्।

| कार्य                                            | कार्यक्षेत्र                                                                                                                                                                                                          | अवरोधक           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR हरू; API docs refs र docs-all                                                                                                                                                                            | हो               |
| `Fast Quality Gates`                             | Code PR हरू; static checks, typecheck, dashboard typecheck, प्रभावित unit tests                                                                                                                                       | हो               |
| `Forgotten sibling tests`                        | Code PR हरू; परिवर्तन गरिएका modules लाई static consumers र सम्भावित sibling tests सम्म ट्रेस गरिन्छ; barrel र dynamic-import paths लाई सन्दर्भित allowlist exceptions सहित परामर्शात्मक निदानका रूपमा रिपोर्ट गरिन्छ | **परामर्शात्मक** |
| `Vitest (fast-path)`                             | Code PR हरू; द्रुत vitest suite                                                                                                                                                                                       | हो               |
| `Unit Tests fast-path`                           | Code PR हरू; 4-shard unit suite                                                                                                                                                                                       | हो               |
| `No new ESLint warnings`                         | Code PR हरू; suppressions-aware lint guard                                                                                                                                                                            | हो, forks सहित   |
| `Merge integrity (changelog + generated skills)` | Non-draft PR हरू; changelog र generated skill sync                                                                                                                                                                    | हो, forks सहित   |

#### बिर्सिएका sibling tests को रिपोर्ट

`npm run check:forgotten-sibling-tests` ले test-impact map पछाडिको import resolver पुनः प्रयोग गर्छ।
परिवर्तन गरिएको प्रत्येक production module का लागि, सम्भावित
test pull-request diff मा अनुपस्थित हुँदा यसले निर्धारणात्मक
`changed module/symbol -> static consumer -> candidate sibling test` शृङ्खलाहरू रिपोर्ट गर्छ।
कुनै पनि अवरोधक rollout अघि calibration का लागि Markdown सारांश र JSON नतिजालाई
`forgotten-sibling-tests` कार्यप्रवाह artifact का रूपमा सुरक्षित राखिन्छ।

Barrel पुनः-निर्यातहरू र गतिशील आयातहरू केवल रिजोल्युसन निदान हुन्; तिनले कहिल्यै
अवरोधक निष्कर्ष सिर्जना गर्दैनन्। समीक्षा गरिएका अपवादहरू
`config/quality/forgotten-sibling-allowlist.json` मा रहन्छन्। प्रत्येक प्रविष्टिले उपभोक्ता र उम्मेदवार
परीक्षणको नाम उल्लेख गर्नुपर्छ, विशिष्ट औचित्य दिनुपर्छ, र GitHub issue वा pull request को लिङ्क दिनुपर्छ। त्रुटिपूर्ण प्रविष्टिहरू
बन्द अवस्थामै असफल हुन्छन्। अपवादहरूले मेटाइएको उम्मेदवार परीक्षण वा `.skip`/`.todo` थप्ने diff लाई दबाउन सक्दैनन्;
assertion कमजोर पार्ने र अन्य masking स्वतन्त्र रूपमा अवरोध गर्ने
`check:test-masking` gate कै जिम्मेवारीमा रहन्छन्।

### Job: `lint`

`main` तर्फको प्रत्येक PR मा चल्छ। असफल भएमा merge रोक्छ।

| Script (`npm run ...`)            | प्रमाणीकरण गर्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | अवरोधक                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Node.js को संस्करण समर्थित दायराभित्र छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                         |
| `check:cycles`                    | चक्रीय आयातहरू — सबै `src/` + `open-sse/` मोड्युलहरू                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                         |
| `check:route-validation:t06`      | सबै routes मा Zod schemas उपस्थित छन् (Tier 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हो                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` को सङ्ख्याले बजेट नाघ्दैन (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                         |
| `check:provider-consistency`      | `providers.ts` मा भएका प्रत्येक provider सँग `providerRegistry.ts` मा मिल्दो entry छ (र allowlist भित्र यसको उल्टो पनि सत्य छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                         |
| `check:model-lifecycle`           | हातैले मर्मत गरिएका तीनवटा routing table हरू checked-in lifecycle snapshot (#11503) सँग एकरूप रहन्छन्: `FITNESS_TABLE` (`taskFitness.ts`) ले `REGISTRY` ले route गर्न सक्ने कुनै पनि retired id लाई score गर्दैन; प्रत्येक `BUILT_IN_ALIASES` target `REGISTRY` मा उपस्थित र retired-id snapshot मा अनुपस्थित छ; `REGISTRY` मा अझै रहेको प्रत्येक retired id लाई forward गरिएको छ वा `allowedRetiredInCatalog` मा सूचीबद्ध गरिएको छ; र कुनै पनि `DEFAULT_DEGRADATION_MAP` source वा target उक्त snapshot मा retired देखिँदैन। यसले कुनै model हाल live upstream द्वारा उपलब्ध गराइएको छ भन्ने प्रमाणित गर्दैन। Offline — `config/quality/model-lifecycle.json` सँग तुलना गर्छ, जसलाई `npm run quality:refresh-model-lifecycle` (network; CI मा जडान गरिएको छैन) मार्फत हातैले refresh गरिन्छ। `allowedRetiredInCatalog` एउटा burn-down ratchet हो: tracking issue भएको अवस्थामा मात्र entry थप्नुहोस्। | हो                                         |
| `check:fetch-targets`             | client-side `src/` मा भएका प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` मा resolve हुन्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                         |
| `check:deps`                      | repo का प्रत्येक `package.json` मा रहेका सबै `npm install` गर्न मिल्ने deps `dependency-allowlist.json` मा छन्; नयाँ unpinned वा slopsquatted packages लाई flag गरिन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                         |
| `audit:deps`                      | `npm audit` (root + electron) — कुनै high/critical advisories छैनन् (osv `check:vuln-ratchet` सँग overlap हुन्छ; Rationalization Backlog हेर्नुहोस्)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                         |
| `check:lockfile`                  | `package-lock.json` को integrity — https registry, integrity hashes, कुनै host overrides छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                         |
| `check:licenses`                  | उत्पादन निर्भरताहरूका लागि SPDX इजाजतपत्र अनुमति-सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                         |
| `check:tracked-artifacts`         | कुनै बिल्ड आर्टिफ्याक्ट / कमिट गरिएका `node_modules` सिमलिङ्कहरू छैनन् (husky pre-commit मा पनि चल्छ; pre-push जानाजानी हल्का राखिएको छ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                         |
| `check:ai-attribution`            | PR कमिटहरू, शीर्षक वा मुख्य भागमा कुनै AI/bot `Co-Authored-By` ट्रेलर वा AI-जेनेरेसन फुटर छैन — कठोर नियम #16 (`quality.yml` को PR→`release/**` का लागि fast-gates लूपमा — इभेन्ट पेलोड पढ्छ, PR बाहिर कुनै कार्य गर्दैन — र `ci.yml` lint मा PR→`main` का लागि PR-मात्र चरण; साथै husky `commit-msg` हुक; मानव सह-लेखकहरूलाई अनुमति छ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करणले ट्र्याकिङ इश्यू उल्लेख गर्छ र `config/quality/vitest-exclusions.json` मा देखिन्छ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                         |
| `check:file-size`                 | कुनै पनि स्रोत फाइलले प्रति-एक्सटेन्सन सीमा नाघ्दैन (र्याचेट: `frozen` सूचीमा स्थिर गरिएका ठूला फाइलहरू)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                         |
| `check:error-helper`              | executors/handlers का त्रुटि प्रतिक्रियाहरूले `buildErrorBody()` / `sanitizeErrorMessage()` प्रयोग गर्छन् (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                         |
| `check:migration-numbering`       | Migration SQL फाइलहरू कुनै खाली क्रम वा दोहोरो नम्बरबिना क्रमिक रूपमा नम्बर गरिएका छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                         |
| `check:public-creds`              | `publicCreds.ts` बाहिर कुनै पनि शाब्दिक OAuth `client_id`/`client_secret` वा Firebase Web कुञ्जीहरू छैनन् (कडा नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                         |
| `check:db-rules`                  | `src/lib/db/` मोड्युलहरू बाहिर कुनै कच्चा SQL छैन; `localDb.ts` बाट कुनै barrel-imports छैनन् (कडा नियमहरू #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                         |
| `check:known-symbols`             | आफ्ना dispatch tables मा दर्ता भएका provider executors, routing strategies, र translators डिस्कमा भएका फाइलहरूसँग मेल खान्छन् — कुनै अनाथ वा अघोषित symbols छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                         |
| `check:route-guard-membership`    | child process सुरु गर्ने प्रत्येक route लाई `isLocalOnlyPath()` द्वारा वर्गीकृत गरिएको छ (कडा नियमहरू #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                         |
| `check:test-discovery`            | repo मा भएका प्रत्येक `*.test.ts` / `*.spec.ts` फाइल कम्तीमा एउटा test runner द्वारा सङ्कलित हुन्छ (`test-discovery-baseline.json` मा रहेको orphan list केवल घट्न सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                         |
| `check:agent-skills-sync`         | उत्पन्न गरिएका agent-skills आर्टिफ्याक्टहरू तिनको स्रोत क्याटलगसँग मेल खान्छन् (कुनै विचलन छैन)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | प्रदायकका लोगो/एसेटहरूमा अभिलेख गरिएको उत्पत्ति प्रविष्टि हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON कन्फिग फाइलहरू पार्स हुन्छन् र repo का lint नियमहरू पूरा गर्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | त्रुटिबिनाको TypeScript कम्पाइलेसन (सल्लाहकारी चेतावनीहरू मात्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                         |
| `typecheck:noimplicit:core`       | कडा `noImplicitAny` — भविष्य-उन्मुख; पहिलेबाट रहेका धेरै call site हरूलाई अझै annotation आवश्यक छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **सल्लाहकारी** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` मा सीमित `tsc` (#7033) — `typecheck:core` को सावधानीपूर्वक चयन गरिएको 27-फाइल allowlist मा कुनै पनि dashboard TSX समावेश छैन, र `next build` ले पनि यसलाई कहिल्यै type-check गर्दैन (`next.config.mjs` ले `ignoreBuildErrors: true` सेट गर्छ), त्यसैले त्यहाँका orphaned-identifier regression हरू (#6625/#6909) CI का लागि अदृश्य थिए। स्थिर गरिएको प्रति-फाइल/प्रति-TS-code सङ्ख्या baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` कै जस्तो stale-enforcement ढाँचा) सँग diff गरिन्छ — baseline गरिएको सङ्ख्याभन्दा बढीका नयाँ त्रुटिहरूले मात्र gate असफल गराउँछन्; पहिलेबाट रहेको त्रुटि समाधान भएपछि `--update` प्रयोग गरेर सीमा क्रमशः घटाउनुहोस्।                                                                                                                                                                                 | हो                                         |

### Job: `quality-gate`

`test-coverage` पछि चल्छ। असफल भएमा merge रोक्छ।

| स्क्रिप्ट                    | प्रमाणीकरण गर्छ                                                                                                                                                               | अवरोधक                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` उत्सर्जन गर्छ (ESLint चेतावनी सङ्ख्या, मर्ज गरिएको shard रिपोर्टबाट coverage)                                                                          | हो (ratchet भन्दा अगाडि) |
| `quality:ratchet`            | `quality-baseline.json` को प्रत्येक metric पछाडि परेको छैन (ESLint चेतावनीहरू ≤ baseline; coverage ≥ baseline)                                                                | हो                       |
| `check:duplication`          | कोड दोहोरोपन (jscpd@4) ले `quality-baseline.json` को baseline नाघ्दैन                                                                                                         | हो                       |
| `check:complexity`           | फाइल-स्तरीय cyclomatic complexity ले सीमा नाघ्दैन (मुख्य ESLint `complexity` + `max-lines-per-function`)                                                                      | हो                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — छुट्टै ESLint pass; CI ले दुवैलाई एउटै `check:complexity-ratchets` चरणका रूपमा मर्ज गरेर चलाउँछ                      | हो                       |
| `check:dead-code`            | प्रयोग नगरिएका exports / files को ratchet (knip) baseline को तुलनामा पछाडि पर्दैन                                                                                             | हो                       |
| `check:compression-budget`   | Compression benchmark budget — प्रति-engine token-savings का न्यूनतम सीमाहरू पछाडि पर्नु हुँदैन                                                                               | हो                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) पछाडि पर्दैन; यसले धेरै हदसम्म `typecheck:noimplicit:core` लाई समेट्छ                                                                 | हो                       |
| `check:codeql-ratchet`       | खुला CodeQL alert सङ्ख्या पछाडि पर्दैन (`gh api` मार्फत पढ्छ; token बिना सुचारु रूपमा skip गर्छ) — refresh cadence र manual trigger का लागि: तलको "CodeQL ratchet" हेर्नुहोस् | हो                       |

### कार्य: `quality-extended`

सम्पूर्ण कार्य परामर्शात्मक हो (`continue-on-error: true`)। npm-आधारित ratchets वास्तविक रूपमा
चल्छन्; बाह्य scanners हरू `gh release download` मार्फत स्थापना हुन्छन् र binary अझै अनुपस्थित हुँदा
आफैँ skip हुन्छन् (exit 0)।

| स्क्रिप्ट                | प्रमाणीकरण गर्छ                                                                                                                                                                                                             | अवरोधक                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | कुनै circular dependencies छैनन् (dpdm)                                                                                                                                                                                     | **परामर्शात्मक**                                |
| `check:bundle-size`      | Bundle size ले सीमा नाघ्दैन                                                                                                                                                                                                 | **परामर्शात्मक**                                |
| `check:secrets`          | Secret scanning (gitleaks) — binary अनुपस्थित भए skip गर्छ                                                                                                                                                                  | **परामर्शात्मक**                                |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) पछाडि पर्दैनन् — binary अनुपस्थित भए skip गर्छ                                                                                                                                     | **परामर्शात्मक**                                |
| `check:workflows`        | Workflow lint (actionlint + zizmor); अनुपस्थित/बिग्रिएका scanners, अमान्य reports वा अनुपस्थित ratchet baseline भए INCOMPLETE का रूपमा असफल हुन्छ। मान्य findings ले चयन गरिएको strict/advisory/ratchet policy पालना गर्छन् | कार्यान्वयन आवश्यक; CI मा zizmor ratchet अवरोधक |
| `check:openapi-breaking` | आधार शाखाको तुलनामा सार्वजनिक API contract (`openapi.yaml`) मा breaking changes (oasdiff) — `openapiBreaking=N` उत्सर्जन गर्छ; oasdiff अनुपस्थित भए वा base spec समाधान गर्न नसकिए skip गर्छ                                | **परामर्शात्मक**                                |

### कार्य: `docs-sync-strict`

`main` तर्फको प्रत्येक PR मा चल्छ। असफल भए merge हुनबाट रोक्छ।

| स्क्रिप्ट                      | प्रमाणीकरण गर्ने विषय                                                                                                                           | अवरोधक                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | तलका ६ वटा उप-गेटलाई क्रमिक रूपमा चलाउने मेटा-गेट                                                                                               | हो                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt संस्करणको एकरूपता                                                                                                 | हो                           |
| ↳ `check:docs-counts`          | गद्यमा भएका सङ्ख्याहरू (प्रदायक सङ्ख्या, माइग्रेसन सङ्ख्या आदि) वास्तविक सङ्ख्याको र्याचेट सीमाभित्र छन्                                        | हो                           |
| ↳ `check:env-doc-sync`         | `.env.example` मा भएको प्रत्येक env var कागजातको तालिकामा अभिलेखित छ, र यसको उल्टो पनि सत्य छ                                                   | हो                           |
| ↳ `check:deprecated-versions`  | कागजातमा बहिष्कृत संस्करण स्ट्रिङहरू छैनन्                                                                                                      | हो                           |
| ↳ `check:doc-links`            | कागजातमा भएका आन्तरिक markdown लिङ्कहरू वास्तविक फाइलहरूमा समाधान हुन्छन् (`[text]`/`(path)` ढाँचा)                                             | हो                           |
| ↳ `check:fabricated-docs`      | कागजातमा उल्लेख गरिएका रुट, env vars, CLI कमान्ड, hook नाम र फाइल पाथहरू कोडबेसमा अवस्थित छन्। `--strict` मार्फत कडा गेट; फ्ल्यागबिना सफ्ट-फेल। | हो (CI मा `--strict` मार्फत) |
| `check:cli-i18n`               | CLI कमान्ड स्ट्रिङहरू सबै i18n locale फाइलहरूमा उपस्थित छन्                                                                                     | हो                           |
| `check:openapi-coverage`       | OpenAPI spec ले वास्तविक रुटहरूको कम्तीमा र्याचेट गरिएको न्यूनतम सीमा समेट्छ                                                                    | हो                           |
| `check:openapi-security-tiers` | `openapi.yaml` मा भएका सुरक्षा तहका एनोटेसनहरू `routeGuard.ts` का वर्गीकरणहरूसँग एकरूप छन्                                                      | **सल्लाहमूलक**               |
| `check:openapi-routes`         | `openapi.yaml` को प्रत्येक पाथ वास्तविक `route.ts` मा समाधान हुन्छ (भ्रमजन्य विवरण-विरोधी)                                                      | हो                           |
| `check:docs-symbols`           | `docs/**/*.md` मा भएको प्रत्येक `/api/...` सन्दर्भ वास्तविक `route.ts` मा समाधान हुन्छ (भ्रमजन्य विवरण-विरोधी)                                  | हो                           |
| `i18n translation drift`       | i18n locale फाइलहरूमा अनुवाद नगरिएका key हरू — चेतावनी मात्र                                                                                    | **सल्लाहमूलक**               |

### कार्य: `i18n-ui-coverage`

| स्क्रिप्ट                         | प्रमाणीकरण गर्ने विषय                                                                                                                                                                   | अवरोधक         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n key कभरेज ≥ 65% छ                                                                                                                                                               | हो             |
| `check-ui-value-drift` (इनलाइन)   | पुनर्लेखन गरिएको अङ्ग्रेजी **मान** ले कुनै पुरानो अनुवाद बाँकी राख्दैन                                                                                                                  | हो             |
| `check-new-key-coverage` (इनलाइन) | **नयाँ** अङ्ग्रेजी key प्रत्येक locale मा अनुवाद गरिएको छ — `__MISSING__:` मार्कर अस्वीकार गरिन्छ                                                                                       | हो             |
| `check-translation-ratio`         | प्रति locale वास्तविक-अनुवाद अनुपात (allowlist बाहिरका अङ्ग्रेजीसँग समान / placeholder / हराएका leaf हरू) `config/quality/i18n-translation-baseline.json` + slack भन्दा बढी हुनु हुँदैन | **सल्लाहमूलक** |

`fetch-depth: 0` आवश्यक पर्छ — value-drift गेटले `en.json` लाई merge base सँग diff गर्छ।

#### `check-ui-value-drift` — पुरानो-अनुवाद गेट

अन्य गेटहरूले संरचनात्मक रूपमा देख्न नसक्ने एउटा i18n regression यसले समात्छ: अङ्ग्रेजी मान
पुनर्लेखन गरिन्छ र _अघिल्लो_ अङ्ग्रेजीबाट व्युत्पन्न अनुवादहरू यथावत् रहन्छन्, जसले गर्दा
गैर-अङ्ग्रेजी प्रयोगकर्ताहरूले आत्मविश्वासपूर्ण शैलीमा लेखिएको तर अहिले गलत भइसकेको पाठ पढिरहन्छन्।

यो समस्या वास्तवमै जारी गरिएको थियो। Antigravity लगइन helper थपिँदा (#5203)
`oauthModal.googleOAuthWarning` पुनर्लेखन गरिएको थियो; **४३ मध्ये ३९ locale** मा अपरेटरहरूलाई
"पूरा URL प्रतिलिपि गरेर तल टाँस्नुहोस्" भन्ने पाठ कायम रह्यो — त्यो प्रदायकका लागि पूरा हुनै नसक्ने प्रक्रिया।
यो #8463 सम्म ध्यानमा आएन, किनभने:

- `sync-ui-keys` ले **अनुपस्थित** key हरू मात्र backfill गर्छ, **पुराना** key हरू कहिल्यै गर्दैन;
- `check-ui-keys-coverage` ले key को _उपस्थिति_ गणना गर्छ, त्यसैले पुरानो अनुवाद पनि समेटिएको मानिन्छ;
- `check-translation-drift` ले `docs/i18n/<locale>/**.md` का कागजात mirror हरू ट्र्याक गर्छ —
  यसले `src/i18n/messages/*.json` कहिल्यै पढ्दैन। 2026-09 को पुनः-सिङ्कदेखि `docs-sync-strict` कार्यमा अवरोधक:
  मुख्य कागजात सम्पादन गर्नुहोस् → `npm run i18n:run -- --files=<doc>` (खण्ड-स्तरीय, कम खर्चिलो)।

**Diff-सचेत, आधाररेखामा निर्भर नरहेको।** यसले merge base मा रहेको `en.json` लाई
working tree सँग तुलना गर्छ; अंग्रेजी मान परिवर्तन भएको प्रत्येक key का लागि, अझै पनि
नछोइएको अनुवाद राख्ने कुनै पनि locale पुरानो मानिन्छ। यसले जानाजानी **पहिलेदेखिको ऋणलाई स्थिर राख्छ** —
लामो समयदेखि रहेको अनुवाद कुन पुरानो अंग्रेजीबाट आएको हो भनेर diff ले देखाउन सक्दैन, त्यसैले gate ले
हालको परिवर्तनले छोएका कुराहरूलाई मात्र जाँच्छ। यसको विकल्प (प्रति-key hash आधाररेखा) का लागि
करिब 600 KB को generated file चाहिन्थ्यो, जुन सबैभन्दा ठूलो विद्यमान आधाररेखाभन्दा 3× ठूलो हो र प्रत्येक i18n PR मा परिवर्तन भइरहन्थ्यो।

यसलाई पूरा गर्ने दुई तरिका छन्:

1. प्रभावित अनुवादहरू अद्यावधिक गर्नुहोस्, वा
2. तिनलाई `__MISSING__:<new english>` मा सेट गर्नुहोस् — त्यसपछि runtime ले सच्याइएको अंग्रेजी
   (`src/i18n/request.ts::deepMergeFallback`, #7258) प्रदान गर्छ र उक्त key अनुवादका लागि पङ्क्तिबद्ध हुन्छ।

यदि string को **अर्थ** परिवर्तन भएको हो भने, **key को नाम परिवर्तन गर्नुलाई** प्राथमिकता दिनुहोस्: नयाँ key ले
पुरानो अनुवाद उत्तराधिकारमा पाउन सक्दैन। #8463 ले प्रयोग गरेको ढाँचा यही हो।

```bash
npm run i18n:check-value-drift          # कडा (CI ले चलाउने)
npm run i18n:check-value-drift:warn     # रिपोर्ट मात्र
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

आधार catalog पढ्न नसकिँदा (base ref बिनाको shallow
clone), `check-openapi-breaking` को व्यवहारअनुरूप `SKIP reason=base-unresolved` सहित 0 मा exit हुन्छ।

### Job: `i18n`

पूर्ण i18n प्रमाणीकरण matrix (प्रति locale एउटा job)। सम्पूर्ण job परामर्शात्मक हो।

| Script                          | प्रमाणीकरण गर्ने कुरा         | अवरोध गर्ने                                                  |
| ------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | प्रति locale अनुवादको पूर्णता | **परामर्शात्मक** (सम्पूर्ण job मा `continue-on-error: true`) |

### Job: `pr-test-policy`

pull request हरूमा मात्र चल्छ।

| Script                 | प्रमाणीकरण गर्ने कुरा                                                                                                                        | अवरोध गर्ने |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, वा `bin/` मा production code परिवर्तन गर्ने PR हरूले test समावेश वा अद्यावधिक गर्नुपर्छ (Hard Rule #8)     | हो          |
| `check:test-masking`   | परिवर्तन गरिएका test file हरूले कुल assert सङ्ख्या घटाउँदैनन् वा `assert.ok(true)` जस्ता स्वतःसिद्ध कथन थप्दैनन्                             | हो          |
| `check:pr-evidence`    | PR body ले परिवर्तनका लागि test/VPS प्रमाण उल्लेख गर्छ (PR prose लाई grep गरेर Hard Rule #18 यान्त्रिकीकरण गर्छ — नाजुक, Backlog हेर्नुहोस्) | हो          |

### Job: `test-vitest`

`build` पछि चल्छ। असफल भएमा merge रोक्छ।

| Suite            | प्रमाणीकरण गर्ने कुरा                                    | अवरोध गर्ने                                                                                                                  |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | हो                                                                                                                           |
| `test:vitest:ui` | UI component test हरू — vitest runner                    | **अवरोध गर्ने** — पहिलेदेखिका failure हरू `vitest.config.ts` मा स्पष्ट रूपमा बहिष्कृत छन्; नयाँ failure ले job असफल गराउँछन् |

### रात्रिकालीन workflow हरू (तालिकाबद्ध, परामर्शात्मक)

यी cron schedule मा (र `workflow_dispatch` मार्फत) चल्छन्, PR हरूमा कहिल्यै चल्दैनन्। सबै परामर्शात्मक हुन्।

| Workflow               | प्रमाणीकरण गर्ने कुरा                                                                                                                                           | अवरोध गर्ने      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | random seed + उच्च run count सहितका fast-check property test हरू                                                                                                | **परामर्शात्मक** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                           | **परामर्शात्मक** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probe हरू (provider secret नभएमा छोडिन्छ)                                                                        | **परामर्शात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` प्रयोग गरी live OmniRoute विरुद्ध OpenAPI contract fuzzing (schemathesis) — spec उल्लङ्घन / सम्हाल्न नसकिएका 500 हरू उजागर गर्छ (चरण 8 B.4) | **परामर्शात्मक** |
| `nightly-mutation`     | द्रुत unit lane मा Stryker mutation-testing score — जीवित रहने mutant हरूले कमजोर assert उजागर गर्छन्                                                           | **परामर्शात्मक** |
| `nightly-compat`       | समर्थित `engines.node` range हरूमा Node engine compatibility matrix                                                                                             | **परामर्शात्मक** |

---

## गति चरण (2026-08-30 → v4.0 LTS): प्रत्येक आधाररेखा 20% ले खुकुलो पारियो

स्वामित्व निर्णय (2026-08-30): v4.0 मोड्युलराइजेसनसम्म, प्राविधिक ऋणको सीमा कायम राख्नुभन्दा
रिलिजको गति बढी महत्त्वपूर्ण हुन्छ। प्रत्येक **सङ्ख्यात्मक** र्याचेट आधाररेखालाई एउटै
लेखापरीक्षणयोग्य प्रक्रियामा 20% ले खुकुलो पारियो, र चरणलाई `config/quality/quality-baseline.json` मा घोषणा गरिएको छ:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| के परिवर्तन भयो                                                                                                                                                                                    | कहाँ                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — कम हुनु राम्रो हुने गणना ×1.2, बढी हुनु राम्रो हुने प्रतिशत ÷1.2 (कभरेजको न्यूनतम सीमा 60 कायम, `eslintErrors` 0 मै, `eslintWarnings` 0 → स्थिर गरिएको suppression गणनाको 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` टिप्पणीले प्रत्येक अघिल्लो → पछिल्लो मान सूचीबद्ध गर्छ) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                       |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` लाइन सीमा ×1.2                                                                                                                            | `file-size-baseline.json`                                                                                     |
| प्रति-फाइल / प्रति-TS-code गणना ×1.2                                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`        |
| `THRESHOLD` 36 → 30                                                                                                                                                                                | `scripts/check/check-openapi-coverage.mjs`                                                                    |
| `_policy.requireTighten === false` हुँदा `--require-tighten` सल्लाहकारी बन्छ                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                                   |
| रात्रिकालीन `bank-ratchet-shrinks` रोकिन्छ (यसले मापन गरिएको कमी सञ्चित गरेर अतिरिक्त सीमा हटाउने थियो)                                                                                            | `.github/workflows/nightly-release-green.yml`                                                                 |

अनुमति सूचीहरू (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **बजेट होइनन्** र तिनलाई परिवर्तन गरिएको छैन। पास/फेल नीति गेटहरू (गोप्य जानकारी, SQL नियमहरू,
कागजात/env सम्झौता, i18n समानता, एकाइ परीक्षणहरू) अपरिवर्तित छन् — रातो परीक्षण अझै पनि रातो परीक्षण नै हो।

**उपकरणहरू**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एकपटक मात्र गरिने
  खुकुलोपना (`scripts/quality/relax-baselines.mjs`); उही टिप्पणीसँग दोस्रोपटक चल्न अस्वीकार गर्छ।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI ले गरेकै तरिकाले प्रत्येक सङ्ख्यात्मक गेट मापन गर्छ र प्रति गेट बाँकी अतिरिक्त सीमा देखाउँछ
  (`scripts/quality/baseline-headroom.mjs`)। रात्रिकालीन `baseline-headroom` कार्यले तालिका
  सक्रिय मुद्दा **📈 आधाररेखाको अतिरिक्त सीमा (गति चरण)** मा पोस्ट गर्छ र कुनै गेट आफ्नो अधिकतम सीमाको 10% भित्र भए वा
  पहिल्यै त्यो सीमा नाघिसकेको भए `headroom-alert` लेबल थप्छ। त्यो मुद्दा प्रारम्भिक चेतावनी हो:
  केही दिनमै भरिने बजेटको अर्थ खुकुलोपना पूरै टोलीले नभई केही PR हरूले उपयोग गरिरहेका छन् —
  समस्या भएको गेटका `_rebaseline_*` टिप्पणीहरू हेर्नुहोस्।

**नयाँ-कोड मोड (कोड लेख्दै सफा राख्ने) — 2026-08-30 देखि, PR द्रुत-मार्गमा मात्र**

`pull_request` घटनाहरूमा `quality.yml` ले `check:file-size`,
`check:complexity-ratchets` र `check:dead-code` लाई `--base-ref <PR base SHA>` पठाउँछ। त्यो मोडमा गेटले HEAD लाई
merge-base सँग **PR ले छोएका फाइलहरूमा मात्र सीमित गरेर** तुलना गर्छ (`scripts/check/newCodeMode.mjs`:
merge-base लाई अस्थायी `git worktree` मा तयार गरिन्छ, ESLint/knip त्यहाँ र HEAD मा चलाइन्छ, अनि
प्रति-फाइल गणनाहरूको भिन्नता निकालिन्छ):

- **अवरोधक** — PR ले परिवर्तन गरेका फाइलहरूमा cyclomatic/cognitive उल्लङ्घन वा dead exports थप्यो
  (लगमा `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **सल्लाहकारी** — स्थिर गरिएको आधाररेखासँग विश्वव्यापी कुलको तुलना। विरासतमा आएको विचलनले निर्दोष
  PR लाई कहिल्यै रातो बनाउँदैन; रिलिज मिलानका क्रममा विचलन पुनः स्थिर गरिन्छ र headroom कार्यले त्यसको निगरानी गर्छ।

`workflow_dispatch` रनहरू, release-green स्वीप र रात्रिकालीन headroom कार्यसँग PR आधार हुँदैन
र तिनले निरपेक्ष (विश्वव्यापी) तुलना कायम राख्छन्। कभरेज, duplication र type-coverage हालका लागि
विश्वव्यापी नै रहन्छन् (तिनका उपकरणहरूले सस्तो रूपमा प्रति-फाइल भिन्नता निकाल्दैनन्) — उही व्यवहारका लागि सम्भावित उम्मेदवारहरू।

**v4.0 मा चरण बन्द गर्ने (LTS = पहिलेभन्दा कडा, "सामान्य अवस्थामा फिर्ता" होइन)**

1. शुद्ध `release/v4.0.0` टिपमा: अभिलेखका लागि `npm run quality:headroom --json`, त्यसपछि
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, प्रत्येक typecheck गेटको
   `--update` — हरेक baseline मापन गरिएको मानमा झर्छ।
2. `quality-baseline.json` बाट `_policy` मेटाउनुहोस् (`--require-tighten` र रात्रिकालीन
   banking लाई पुनः सक्रिय गर्छ), `check-openapi-coverage.mjs` मा `THRESHOLD = 36` (वा बढी) पुनर्स्थापना गर्नुहोस्।
3. modularization प्रभावकारी भएका ठाउँमा मापन गरिएको मानभन्दा अझ कडा बनाउनुहोस्: file-size `cap` लाई पुनः 1000
   (वा 800), coverage floors +5, modularized packages का लागि dead exports 0।

## र्याचेट आधाररेखा (`quality-baseline.json`)

र्याचेट इन्जिन (`scripts/quality/check-quality-ratchet.mjs`) ले `quality-baseline.json`
पढ्छ र त्यसलाई भर्खरै सङ्कलन गरिएको `quality-metrics.json` सँग तुलना गर्छ। आफ्नो इप्सिलनभन्दा
बढी पछाडि गएको कुनै पनि मेट्रिकले बिल्ड असफल गराउँछ।

हाल ट्र्याक गरिएका मेट्रिकहरू:

| मेट्रिक               | दिशा   | अर्थ                                  |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | ESLint चेतावनीको सङ्ख्या बढ्नु हुँदैन |
| `coverage.statements` | `up`   | स्टेटमेन्ट कभरेज घट्नु हुँदैन         |
| `coverage.lines`      | `up`   | लाइन कभरेज घट्नु हुँदैन               |
| `coverage.functions`  | `up`   | फङ्सन कभरेज घट्नु हुँदैन              |
| `coverage.branches`   | `up`   | ब्रान्च कभरेज घट्नु हुँदैन            |

वास्तविक सुधारपछि आधाररेखा अद्यावधिक गर्न:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ्ल्यागले हाल मापन गरिएका मानहरू `quality-baseline.json` मा लेख्छ।
मेट्रिक सुधार गर्ने परिवर्तनसँगै यो फाइल कमिट गर्नुहोस्। मेट्रिक सुधार गर्ने तर
आधाररेखा अद्यावधिक नगर्ने PR लाई `--require-tighten` ले समात्नेछ (चरण 6A.5,
कार्यान्वयन हुन बाँकी)।

### CodeQL र्याचेट: रिफ्रेस आवृत्ति र म्यानुअल ट्रिगर

`check:codeql-ratchet` ले **तालिकाअनुसार रिफ्रेस हुने रिपोको अवस्था पढ्छ — प्रत्येक PR मा होइन।**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ले
`state: configured`, `schedule: weekly` रिपोर्ट गर्छ: यो GitHub को default-setup स्क्यान हो,
प्रत्येक push को विश्लेषण होइन। परिणामस्वरूप: अलर्टहरू समाधान गर्ने PR मर्ज भएपछि, र्याचेटले
अर्को निर्धारित स्क्यान नचल्दासम्म पुरानै, बढी सङ्ख्या पढिरहन्छ — त्यसैले स्क्यान अद्यावधिक
नहुञ्जेल समाधान गर्ने PR कै पछिल्ला PR हरूसहित प्रत्येक खुला PR मा यसले रिग्रेसन रिपोर्ट गर्छ।

**म्यानुअल रिफ्रेस**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ले विश्लेषण पुनः चलाउँछ
र केही मिनेटभित्र अलर्टहरू पुनः प्रकाशित गर्छ। पहिले `.github/workflows/codeql.yml`
पढ्नुहोस् — यसको हेडरले यो `workflow_dispatch`-मात्र हुनुको कारण **GitHub को "default setup"
सँग द्वन्द्व हुनु** हो भनेर व्याख्या गर्छ (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)। `push`/`pull_request`/
`schedule` ट्रिगरहरू पुनर्स्थापना गर्न पहिले **मालिकको कार्य** आवश्यक हुन्छ: Settings → Code security →
CodeQL: Default → Advanced। त्यो स्विच नगरी `schedule:` ट्रिगर नथप्नुहोस् — त्यसले
असफल रनहरू मात्र उत्पादन गर्नेछ।

**सङ्ख्या घटेपछि आधाररेखा कस्नुहोस्** — `node scripts/check/check-codeql-ratchet.mjs
--update` ले नयाँ मापन गरिएको सङ्ख्या `quality-baseline.json` →
`metrics.codeqlAlerts.value` मा लेख्छ, जसले गर्दा र्याचेटले पुरानो अधिकतम सीमासम्मको रिग्रेसनलाई
चुपचाप अनुमति दिँदैन। कार्य गरिएको उदाहरण (2026-09-02/03): PR #12502 ले 7 वटा वास्तविक अलर्ट
समाधान गर्यो (मापन गरिएका खुला अलर्ट 13 → 6); PR #12530 ले त्यससँग मिलाउन स्थिर आधाररेखा 11 → 6
मा कस्यो; त्यसपछि बाँकी 6 वटालाई प्रत्येक अलर्टको औचित्यसहित खारेज गरेर खुला अलर्टको सङ्ख्या 0
मा झारियो।

**खारेजी अपरेटरको निर्णय हो (कडा नियम #14)** — खारेजी टिप्पणीमा प्राविधिक औचित्य अभिलेख नगरी
CodeQL अलर्ट कहिल्यै खारेज नगर्नुहोस्: upstream-protocol आवश्यकताका लागि `won't fix`,
परीक्षण फिक्स्चरका लागि `used in tests`, र CodeQL ले देख्न नसक्ने sanitizer का लागि
`false positive` (नजिर: `docs/security/ERROR_SANITIZATION.md`)।

---

## परीक्षण पुनःप्रयास नीति (WS5.4, v3.8.49)

पुनःप्रयास प्रत्येक रनरका लागि छुट्टाछुट्टै हुन्छ, कहिल्यै पनि विश्वव्यापी रूपमा लागू हुँदैन — सबैमा लागू हुने पुनःप्रयासले वास्तविक रिग्रेसनहरूलाई
अदृश्य फ्लेकहरूमा बदल्छ:

| रनर              | नीति                                                                                                                                | किन                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | CI मा मात्र `retries: 1`, साथै `trace: on-first-retry`                                                                              | ब्राउजर/नेटवर्कको समय निर्धारण वास्तवमै अनिश्चित हुन्छ; ट्रेससहितको एउटा पुनःप्रयासले फ्लेकलाई निदान गर्न सकिने आर्टिफ्याक्टमा बदल्छ |
| Vitest           | विश्वव्यापी पुनःप्रयास हुँदैन। फ्लेकी प्रमाणित परीक्षणले स्पष्ट प्रतिपरीक्षण पुनःप्रयास पाउँछ (diff मा देखिने, PR मा समीक्षा गरिने) | क्वारेन्टिन सूचीलाई repo मै राख्छ, कहिल्यै अपारदर्शी बनाउँदैन                                                                        |
| node:test (unit) | कहिल्यै पुनःप्रयास हुँदैन                                                                                                           | फ्लेकी युनिट परीक्षण भनेको परीक्षणमै भएको बग हो — त्यसलाई सुधार्नुहोस्, फेरि चलाएर भाग्य नजाँच्नुहोस्                                |

फ्लेक टेलिमेट्री उपलब्ध भएपछि लक्षित SLO हरू (WS5.2/5.3): प्रत्येक परीक्षणमा <1% फ्लेक दर
("अहिले नै सुधार्नुहोस्" सीमा), प्रत्येक पाइपलाइनमा ≥95% उत्तीर्ण दर। उद्योगका सन्दर्भ मानहरू —
हाम्रै मापनहरूअनुसार पुनःक्यालिब्रेट गर्नुहोस्।

## रिलिज-स्तरीय र्याचेट ड्रिफ्ट (WS5.5, v3.8.49)

जब कुनै र्याचेट (फाइल आकार, जटिलता, eslint चेतावनीहरू) शुद्ध रिलिज
टिपमा रिग्रेस हुन्छ — अर्थात्, मर्जहरूको संयोजनले त्यसलाई रिग्रेस गराएको हो र कुनै एकल PR ले आफ्नै
ब्रान्चमा उक्त रिग्रेसन पुनरुत्पादन गर्दैन — तब सुधारको जिम्मेवारी **रिलिज क्याप्टेनको हुन्छ, एकपटक,
रिलिज ब्रान्चमा**: एक्स्ट्र्याक्सन/रिफ्याक्टरलाई प्राथमिकता दिनुहोस्; दस्तावेजीकृत
औचित्य प्रविष्टिसहित मात्र पुनःबेसलाइन गर्नुहोस्। संयोजन ड्रिफ्टलाई योगदानकर्ताको PR माथि कहिल्यै नथोपर्नुहोस्, र प्रत्येक
PR का लागि पुनःबेसलाइन कहिल्यै नगर्नुहोस् (त्यसले वास्तविक रिग्रेसनहरू लुकाउँछ)। पहिले छुट्याएर पहिचान गर्नुहोस्: तपाईंको PR ले यो निम्त्याएको हो भनी मान्नुअघि
प्रोब worktree मा शुद्ध टिपविरुद्ध असफलता पुनरुत्पादन गर्नुहोस्।

## र्याचेटका कमीहरू सञ्चित गर्ने — घट्दो दिशा (#8584)

र्याचेट आधा मात्र स्वचालित छ, र त्यो गलत आधा हो। क्याप **बढाउनु** भनेको
दस सेकेन्ड लाग्ने म्यानुअल JSON सम्पादन हो र असफल PR लाई अवरोधमुक्त गर्ने सबैभन्दा छिटो तरिका हो।
क्याप **घटाउन** कसैले `--update` चलाएर नतिजा commit गर्नुपर्छ — र
`bank-ratchet-shrinks` job उपलब्ध नहुँदासम्म कुनै workflow ले यसलाई चलाउँदैनथ्यो। मापन गरिएको परिणाम
(2026-07-25): 18 वटा frozen फाइलहरू पहिले नै 800-लाइनको नयाँ-फाइल क्यापमा वा त्यसभन्दा तल थिए, सबैभन्दा खराब
132× मा (`src/shared/validation/schemas.ts`, 19 लाइनले 2,523 को क्याप बोकेको); जटिलता
सीमा ~37 वटा पुनःबेसलाइन नोटहरूमा `1794 → 2169` पुग्यो, जसमा ठ्याक्कै एकपटक मात्र
कमी (−1) भयो; र "अर्को चक्रमा `--update` मार्फत कस्नुहोस्" 31 पटक लेखियो तर
एकपटक मात्र पालना गरियो। जुन कोडका कारण क्याप तय भएको थियो, त्यो कोडभन्दा लामो समयसम्म क्याप कायम रहँदा सम्पन्न गरिएको हरेक
विघटन चुपचाप उक्त फाइल अर्को पटक सम्पादन गर्ने व्यक्तिका लागि वृद्धि अनुमतिमा बदलिन्छ।

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ले त्यो चक्र पूरा गर्छ:

|               |                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| चल्छ          | `schedule` (दिनमा 3×) + `workflow_dispatch` — जानाजानी `push` मा **होइन**                                  |
| मापन गर्छ     | उच्चतम `release/vX.Y.Z`, `release-green` कै जस्तो रिजोल्युसन + इन्जेक्सन गार्ड                             |
| लेख्छ         | `check:file-size --update` र `check:complexity-ratchets --update` (दुवै संरचनागत रूपमा घटाउन मात्र मिल्ने) |
| प्रमाणित गर्छ | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                   |
| पठाउँछ        | रिलिज ब्रान्चविरुद्ध सधैँ अद्यावधिक रहने एउटा PR — बलपूर्वक अद्यावधिक गरिने, कहिल्यै स्प्याम नगरिने        |

सञ्चय प्रत्येक push मा नगरी ब्याचमा गरिन्छ, किनकि यसमा विलम्बसम्बन्धी कुनै आवश्यकता हुँदैन (8h भित्र
सञ्चित गरिएको कमी पर्याप्त हुन्छ), तर प्रत्येक merge मा चलाउँदा merge अभियानका क्रममा PR ब्रान्च बारम्बार
पुनर्निर्माण हुन्थ्यो र हरेक पटक पूर्ण ESLint वाकको लागत लाग्थ्यो। पहिचान भने
push (`release-green`) मै रहन्छ; सञ्चय मात्र ब्याचमा गरिन्छ।

### सुरक्षा प्रमाणक

job ले मानवीय हस्तक्षेपबिना baselines मा लेख्छ, त्यसैले `verify-ratchet-bank.mjs` ले
त्यसलाई स्वीकार्य बनाउँछ। यसले `--update` पछिको tree लाई `HEAD` सँग diff गर्छ र हरेक परिवर्तन निम्नमध्ये एउटा नभएसम्म
**कुनै commit बन्नुअघि नै job रोक्छ** — र कुनै PR खोल्दैन:

- `frozen` / `testFrozen` को सङ्ख्यात्मक प्रविष्टि **घटाइएको** वा **हटाइएको**
- `complexity-baseline.json` → `count` **घटाइएको**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **घटाइएको**

अरू कुनै पनि परिवर्तन असफल हुन्छ: सङ्ख्या बढाउने, प्रविष्टि थप्ने, `cap`/`testCap` परिवर्तन गर्ने, वा
`_rebaseline_*` नोट मेटाउने/पुनर्लेखन गर्ने (ती नोटहरू प्रत्येक
सीमा किन अस्तित्वमा छ भन्ने अडिट ट्रेल हुन् र फाइल प्रविष्टिहरू रहेकै `frozen` object भित्र भण्डारण गरिएका हुन्छन्)।
क्याप बढाउन सक्ने bot विद्यमान अवस्थाभन्दा निश्चित रूपमा झन् खराब हुन्थ्यो। रिग्रेसन
गार्ड: `tests/unit/verify-ratchet-bank.test.ts`।

job ले `release/*` मा कहिल्यै push गर्दैन — कुनै मानवले PR merge गर्छ, त्यसैले गलत मापन
समीक्षा नभई समावेश हुन सक्दैन।

## अनुमति-सूची नीति

पहिल्यैदेखि रहेका उल्लङ्घनहरूका कारण असफल हुन नसक्ने प्रत्येक गेटले स्थिर अनुमति-सूची प्रयोग गर्छ
(जस्तै, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। नीति यस्तो छ:

**मूल कारण समाधान गर्नुहोस्; उल्लङ्घन पहिल्यैदेखि रहेको र सोही PR मा समाधान गर्न
नसकिने अवस्थामा मात्र अनुमति-सूची प्रयोग गर्नुहोस्।**

अनुमति-सूचीमा प्रविष्टि थप्दा:

1. औचित्यसहितको टिप्पणी समावेश गर्नुहोस्।
2. ट्र्याकिङ इस्यु उल्लेख गर्नुहोस् (जस्तै, `// #3498 — चरण 2 को सुविधा, अझै कार्यान्वयन गरिएको छैन`)।
3. उल्लङ्घन समाधान गर्ने सोही PR मा प्रविष्टि हटाउनुहोस् — अब सक्रिय उल्लङ्घनलाई
   दबाउन नसक्ने पुरानो प्रविष्टि आफैंमा एउटा त्रुटि हो (कार्यान्वयन भएपछि 6A.3 पुरानो-प्रवर्तनले
   अनाथ अनुमति-सूची प्रविष्टिका कारण गेट असफल गराउनेछ)।

परीक्षणहरू छिटो पास गराउन अनुमति-सूचीमा प्रविष्टिहरू **नथप्नुहोस्**। बढ्दो
अनुमति-सूची भएको हरियो गेटले गुणस्तरको झूटो अनुभूति दिन्छ।

### तपाईंको PR मा गेट असफल हुँदा

1. **गेटको आउटपुट ध्यानपूर्वक पढ्नुहोस्** — कुन फाइल वा प्रतीकले नियम उल्लङ्घन गर्यो भन्ने कुरा यसले ठ्याक्कै बताउँछ।
2. **उल्लङ्घन समाधान गर्नुहोस्** — अधिकांश गेटहरू निर्धार्य फाइलसिस्टम जाँच हुन्, जुन कोड सही हुनेबित्तिकै पास हुन्छन्।
3. **उल्लङ्घन पहिल्यैदेखि रहेको भए** (अर्थात्, तपाईंले त्यसलाई ल्याउनुभएको होइन तर अब गेटले
   त्यसलाई समेट्छ): औचित्य टिप्पणी र ट्र्याकिङ इस्युसहित अनुमति-सूचीमा प्रविष्टि थप्नुहोस्।
4. **गेट र्याचेट भए** (कभरेज, ESLint चेतावनीहरू, दोहोरोपन, जटिलता):
   तपाईंको परिवर्तनले मेट्रिक बिगारेको छ। अन्तर्निहित समस्या समाधान गर्नुहोस्, वा (विरलै) परिवर्तन
   जानाजानी गरिएको र मेट्रिकको गिरावट स्वीकार्य भए `npm run quality:ratchet -- --update`
   चलाउनुहोस् — तर PR विवरणमा त्यसको कारण अभिलेख गर्नुहोस्।
5. **परामर्शात्मक गेटहरू** (`continue-on-error: true`) जानकारीमूलक हुन् — तिनले
   मर्ज रोक्दैनन् तर CI सारांशमा देखिन्छन्। तैपनि तिनलाई समाधान गर्नुहोस्।

---

## नयाँ गेट थप्ने

1. `scripts/check/check-<name>.mjs` (वा `.ts`) सिर्जना गर्नुहोस्। नीति गेटहरू 0/1 निकास गर्छन्।
   र्याचेट-शैलीका गेटहरूले `collect-metrics.mjs` मार्फत `quality-metrics.json` मा मेट्रिक उत्सर्जन गर्छन्।
2. `package.json` मा `"check:<name>": "node scripts/check/check-<name>.mjs"` थप्नुहोस्।
3. यसलाई `.github/workflows/ci.yml` मा उपयुक्त जबअन्तर्गत जडान गर्नुहोस्
   (नीति → `lint` वा `docs-sync-strict`; र्याचेट → `quality-gate`)।
4. यसमा अनुमति-सूची छ भने, पुराना प्रविष्टिहरू स्वतः पत्ता लगाउन
   `scripts/check/lib/allowlist.mjs` बाट `reportStaleEntries()` लागू गर्नुहोस्।
5. गेटको पहिचान तर्क समेट्ने परीक्षण `tests/unit/build/` मा लेख्नुहोस्।
6. यो कागजात अद्यावधिक गर्नुहोस् (सान्दर्भिक जब तालिकामा एउटा पङ्क्ति थप्नुहोस्)।

---

## एजेन्ट टुलिङ: LSP-in-the-loop (ऐच्छिक)

CI गेटहरूभन्दा बाहिर, OmniRoute ले **ऐच्छिक** `agent-lsp` स्काफोल्ड
(परियोजना-स्तरीय `.mcp.json`, Fase 7 Task 15) उपलब्ध गराउँछ। कोडिङ एजेन्टहरूलाई TypeScript भाषा सर्भर उपलब्ध गराउन `.mcp.json`
सिर्जना गर्नुहोस्, ताकि तिनले कोड लेख्नुभन्दा **पहिले** प्रतीकहरू /
डायग्नोस्टिक्स समाधान गरून् — यो `typecheck:core` को compile-before-claim सहायक हो,
जसले "आविष्कार गरिएका प्रतीक" त्रुटिहरूलाई स्रोतमै घटाउँछ। यसलाई जानाजानी
स्वतः लोड गरिँदैन (तपाईंले MCP↔LSP ब्रिज छान्नुहुन्छ र प्रमाणीकरण गर्नुहुन्छ); बिग्रिएको प्रविष्टिले
जडान त्रुटि मात्र लग गर्छ र सेसनहरूलाई कहिल्यै बिगार्दैन।

---

## युक्तिसंगतीकरण ब्याकलग (ROI समीक्षा — चरण 9 लहर 3)

यो सूचीलाई 2026-06-17 मा `ci.yml` सँग मिलान गरिएको थियो (अघिल्लो संस्करणमा
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` छुटेका थिए)। मिलान गरिएको सेटको ROI समीक्षाले
निम्न युक्तिसंगतीकरणका उम्मेदवारहरू पहिचान गर्यो। **मर्जहरू यान्त्रिक CI
परिवर्तनहरू हुन्; फ्लिप/हटाउने निर्णयहरू अपरेटरका लागि आरक्षित नीतिगत निर्णय हुन्।** तलका कुनै पनि कुरा
अहिलेसम्म लागू गरिएको छैन।

**माथि कागजातबद्ध नगरिएका थप विषयहरू** (परामर्शात्मक, न्यून सङ्केत): `docs-lint` job
(markdownlint + Vale, सम्पूर्ण job मा `continue-on-error`) र छुट्टाछुट्टै scanner workflow हरू
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`
`quality-baseline.json` मा छ तर `ci.yml` मा अवरोधकारी ratchet सँग जोडिएको छैन — यो metric
हाल अनाथ छ।

### मर्ज / डिडुप्लिकेसन (यान्त्रिक, कम जोखिम)

प्रत्येक उम्मेदवारलाई 2026-06-17 को प्रत्यक्ष gate अवस्थाविरुद्ध मान्य गरिएको थियो (विश्वास गर तर प्रमाणीकरण पनि गर);
धेरै "स्पष्ट" मर्जहरूले वास्तवमा प्राविधिक ऋण लुकाएका रहेछन् र ती **सिधै प्रतिस्थापन गर्न मिल्ने** छैनन्।

- **`check:docs-sync` दुई पटक चल्छ** — `lint` job मा छुट्टै र फेरि `check:docs-all` (`docs-sync-strict`) भित्र तथा husky pre-commit hook मा। ✅ **सम्पन्न** — छुट्टै `lint` invocation हटाइयो।
- **CVE scanning** — ❌ **सिधै मर्ज गर्न मिल्दैन।** `audit:deps` कुनै पनि उच्च/गम्भीर CVE मा कडाइका साथ विफल हुन्छ; `check:vuln-ratchet` (osv) baseline को तुलनामा _प्रतिगमन_ हुँदा मात्र विफल हुन्छ (हाल 1 MODERATE)। अर्थगत व्यवहार फरक छन् — `audit:deps` हटाउँदा निरपेक्ष उच्च/गम्भीर gate हराउँछ। दुवै राख्नुहोस्।
- **Cycle detection** — ❌ **सिधै मर्ज गर्न मिल्दैन।** `check:circular-deps` (dpdm) ले **91 cycles** रिपोर्ट गर्छ (त्यसैले यो परामर्शात्मक छ); पहिले तिनलाई समाधान नगरी यसलाई अवरोधकारी बनाउन सकिँदैन, र यसको दायरा हरियो, चयनित `check:cycles` भन्दा फराकिलो छ। `check:cycles` लाई अवरोधकारी नै राख्नुहोस्; 91 वटा dpdm cycle समाधान गर्नु यसको आफ्नै backlog हो।
- **Complexity** — ✅ **सम्पन्न** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एउटा ESLint walk, ruleId अनुसार गणना गरिएकाले cyclomatic+max-lines र cognitive baseline हरू स्वतन्त्र रहन्छन्; स्थानीय `--update` का लागि छुट्टाछुट्टै `check:complexity` / `check:cognitive-complexity` कायम छन्।
- **`/api` anti-hallucination** — ✅ **सम्पन्न** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` को एउटै FS inventory, openapi-routes + docs-symbols ले अझै स्वतन्त्र रूपमा रिपोर्ट गर्छन्; स्थानीय run का लागि छुट्टाछुट्टै जाँचहरू कायम छन्।
- **`check:node-runtime` 11 वटा job मा चल्छ** — ⚠️ **न्यून ROI।** प्रत्येक छुट्टै runner हो र जाँच <1s लाग्छ; सस्तो per-job guard गुमाउने तुलनामा कुल बचत ~10s मात्र हुन्छ। परिवर्तनको झन्झट लायक छैन।
- **CI lint मा `typecheck:noimplicit:core`** — ✅ **lint job बाट हटाइयो** (परामर्शात्मक `continue-on-error` थियो); अवरोधकारी type surface `typecheck:core` + `check:type-coverage` हो। स्थानीय script कायम राखियो।

### फ्लिप / निर्णय (अपरेटर नीति)

- `check:openapi-security-tiers` (परामर्शात्मक) — ❌ **सफा रूपमा फ्लिप गर्न मिल्दैन।** यो 0 सहित बाहिरिन्छ तर `LOCAL_ONLY_API_PREFIXES` अन्तर्गतका धेरै `traffic-inspector` route मा `x-loopback-only: true` annotation नभएको चेतावनी दिन्छ। यसलाई लागू गर्न पहिले `openapi.yaml` मा ती annotation थप्नुपर्छ।
- `typecheck:noimplicit:core` (परामर्शात्मक) — अवरोधकारी `check:type-coverage` ratchet ले यसलाई धेरै हदसम्म समेट्छ। यसलाई ratchet मा फ्लिप गर्नुहोस् वा दोहोरिएको दोस्रो `tsc` pass हटाउनुहोस्।
- `test:vitest:ui` (अहिले **अवरोधकारी**) — पहिलेबाट रहेका विफलताहरू `vitest.config.ts` मा `// #8618` tracking comment सहित स्पष्ट रूपमा बहिष्कृत गरिएका छन्; नयाँ विफलताले job विफल बनाउँछ।
- `check:secrets` (gitleaks, कागजातबद्ध 3 वटा false-positive मा स्थिर गरिएको अवरोधकारी ratchet) — 0 मा पुग्न ती 3 वटालाई allowlist गर्नुहोस्, वा परामर्शात्मकमा घटाउनुहोस्। यो GitHub को native secret-scanning + `check:public-creds` सँग दोहोरिन्छ।
- `check:pr-evidence` (अवरोधकारी, PR-body को गद्यमा grep गर्छ) — false-positive को उच्च जोखिम; हटाउँदा कडा नियम #18 को कार्यान्वयन कमजोर हुन्छ, त्यसैले यो वास्तविक नीतिगत निर्णय हो।
- `semgrep` (परामर्शात्मक standalone) — OWASP family हरूका लागि CodeQL सँग दोहोरिन्छ; यसको baseline लाई ratchet सँग जोड्नुहोस् वा हटाउनुहोस्।

---

## सम्बन्धित दस्तावेजीकरण

- आपूर्ति शृङ्खला (उत्पत्ति, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — कुञ्जी-सेट समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, कार्य `i18n-ui-coverage`)।
प्रत्येक `src/i18n/messages/<locale>.json` को लीफ कुञ्जी-सेटलाई `en.json` सँग तुलना गर्छ र
कुञ्जी कहिले थपिएको थियो भन्ने कुराको परवाह नगरी कुनै लीफ छुटेमा वा अतिरिक्त भएमा असफल हुन्छ। `__MISSING__:`
प्लेसहोल्डरहरूलाई उपस्थित मानिन्छ (तिनको सामग्री अनुपात गेटको विषय हो)। यो दुईवटा
diff-आधारित/प्रतिशत गेटको पूर्ण पूरक हो: `check-ui-keys-coverage` ले प्रत्येक locale मा 80 % को
न्यूनतम सीमा लागू गर्छ (~13,000 मध्ये 43 कुञ्जी अनुपस्थित हुँदा पनि 99.7 % देखिन्छ) र
`check-new-key-coverage` ले PR ले `en.json` मा थपेका कुञ्जीहरूलाई मात्र मूल्याङ्कन गर्छ। कुनै locale
ब्याचको branch काटिएको दिनको `en.json` बाट त्यो ब्याच सिर्जना गरिन्छ र base मा कुञ्जीहरू थपिँदै गर्दा
अनुवादको काम कैयौँ दिनसम्म चल्छ; ब्याच PR आफैँले कुनै कुञ्जी थप्दैन, त्यसैले ब्याच 1 (#13044)
नौ locale मा 43 कुञ्जी कम र ब्याच 2 (#13660) आठ locale मा 10 कुञ्जी कम भएर समावेश हुँदा पनि
दुवै सहोदर गेट मौन रहे (2026-09-15)। असफलता सच्याउन
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` चलाउनुहोस्; `extra` लीफको
अर्थ स्रोतबाट त्यो हटाइएको हो — locale बाट पनि त्यसलाई मेटाउनुहोस्। `--warn` ले असफल नगराई
रिपोर्ट गर्छ। `--catalog=cli` ले `bin/cli/locales` माथि उही तुलना चलाउँछ
(`npm run i18n:check-keys:cli`); दुवै चरण `i18n-ui-coverage` कार्यमा छन्।

#### `check-new-key-coverage` — नयाँ-कुञ्जी i18n गेट

`check-ui-value-drift` को सहोदर। त्यसले अनुवादहरू अद्यावधिक नगरी छाडिएको अवस्थामा **पुनर्लेखन
गरिएको** अङ्ग्रेजी मान समात्छ; यसले केही locale ले कहिल्यै नपाएको **थपिएको** अङ्ग्रेजी कुञ्जी
समात्छ।

`check-ui-keys-coverage` ले यो वर्ग देख्न सक्दैन: यसले प्रत्येक locale मा प्रतिशतको न्यूनतम सीमा
लागू गर्छ, र ~13,000 मध्ये एघार कुञ्जी अनुपस्थित हुँदा पनि coverage 99.9% नै रहन्छ। प्रत्येक भाषाको
प्रतिशतले "यो सुविधा अनुवाद नभई जारी भयो" भन्ने कुरा व्यक्त गर्न सक्दैन — कुनै पूरै सुविधा नयाँ
locale मा कुनै पाठविनै समावेश हुन सक्छ र सङ्ख्या कहिल्यै परिवर्तन नहुन सक्छ।

यसले अभिलेख गर्ने घटना: Orchestration Canvas को Phase 3 ले त्यस समयमा रहेका 42 locale मा आफ्ना
एघार कुञ्जी अनुवाद गरेको थियो। केही घण्टापछि EU-language ब्याच (#13044) ले repo लाई 51 locale
सम्म पुर्यायो, र नौ नयाँ locale (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ले ती
कुञ्जीहरू कहिल्यै पाएनन्। `deepMergeFallback` ले अनुपस्थित कुञ्जीको सट्टा अङ्ग्रेजी राख्छ, त्यसैले
असफलताको स्वरूप खाली UI नभई अनुवाद नगरिएको UI थियो — वास्तविक, र बनोटकै कारण मौन।

आफ्नो सहोदरजस्तै यो पनि **diff-aware** छ, जसले merge base मा रहेको अङ्ग्रेजीलाई working tree सँग
तुलना गर्छ, त्यसैले पहिलेदेखिका रिक्तताहरू यथावत् रहन्छन् र गेट सक्रिय गर्न कुनै migration आवश्यक
परेन।

**`__MISSING__:<english>` मार्करले यसलाई सन्तुष्ट गर्दैन (2026-09-17 देखि)।** पहिले यो
दस्तावेजीकृत स्थगन-विधि थियो — runtime सही अङ्ग्रेजीमा फर्कन्छ — तर 2026-09-16 मा आठ feature PR ले
61 कुञ्जी थपे र अनुवाद गर्नुको सट्टा सबै 65 locale मा मार्कर राखे: यो गेटले ती सबैलाई स्वीकार गर्यो,
PR हरूलाई केहीले रोकेन, र त्यसपछि blocking real-translation ratio gate सबैका लागि release tip मा
असफल भयो (pt-BR 3.2 % > 2.5 % + 0.5)। अब मार्करलाई अनुपस्थित अनुवादका रूपमा मूल्याङ्कन गरिन्छ।
असफलता सच्याउन
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` चलाउनुहोस्,
वा `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe,
`OMNIROUTE_TRANSLATION_*` env बिना सुरु हुन अस्वीकार गर्छ) मार्फत सबै locale समानान्तर रूपमा
अनुवाद गर्नुहोस्। अङ्ग्रेजीमै रहनुपर्ने कुञ्जी (निश्चित product/engine/flag नाम)
`scripts/i18n/untranslatable-keys.json` मा हुनुपर्छ, मार्कर पछाडि कहिल्यै होइन। `vi` ले मार्करहरू
पूर्ण रूपमा निषेध गर्छ (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — रोकिराखिएका परीक्षणको गेट

`vitest.config.ts` को `exclude` सूचीमा रहेको फाइल नचल्ने परीक्षण हो, र tree पढ्ने व्यक्तिलाई त्यो
coverage जस्तो देखिन्छ। `// #8618 — pre-existing failure; remove this exclusion when fixed`
टिप्पणी पछाडि बयसट्ठी फाइल जम्मा भए। Issue #8618 लाई 2026-08-11 मा बन्द गरिएको थियो, जबकि त्यसले
ट्र्याक गरेको सूची 45 entry बाट 62 सम्म बढ्यो र प्रत्येक नयाँ entry ले निष्क्रिय issue तर्फ
सङ्केत गर्ने टिप्पणी ग्रहण गर्यो। अन्ततः सूचीलाई फाइलअनुसार मापन गर्दा (#13204), **62 मध्ये 51 वटा
हालको tree विरुद्ध कुनै source परिवर्तनविनै सफल भए**।

वास्तविक फाइलमा resolve हुने प्रत्येक exclusion ले (a) tracking issue उल्लेख गर्न र (b) आफ्नो
मापन गरिएको status सहित `config/quality/vitest-exclusions.json` मा देखिन गेटले आवश्यक बनाउँछ,
ताकि एउटा थप्नु भनेको 60-entry array मा अर्को लाइन थप्नुको सट्टा छुट्टै फाइलमा समीक्षा गर्न मिल्ने
diff होस्। यसले जानाजानी excluded परीक्षणहरू पुनः चलाउँदैन — त्यसमा ~10 मिनेट लाग्छ र त्यो आवधिक
कार्यमा पर्छ; प्रत्येकलाई अन्तिम पटक कहिले मापन गरिएको थियो भन्ने inventory ले अभिलेख राख्छ।
