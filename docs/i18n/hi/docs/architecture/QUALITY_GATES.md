# Quality Gates Reference (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

यह दस्तावेज़ OmniRoute में सभी CI गुणवत्ता गेट्स के लिए आधिकारिक संदर्भ है।
यह प्रत्येक गेट, उसके द्वारा सत्यापित चीज़ों, वह किस CI जॉब में चलता है, क्या वह
रैचेट बेसलाइन या पास/फेल नीति का उपयोग करता है, और क्या वह बिल्ड को अवरुद्ध करता है या केवल परामर्शात्मक है, इसका वर्णन करता है।

संक्षिप्त सारांश और अनुमतिसूची नीति के लिए, `AGENTS.md` में
"Quality Gates & Ratchets" अनुभाग देखें। इसी सिस्टम के महत्वपूर्ण आकलन, परिपक्वता वर्गीकरण और
टूल-अज्ञेयवादी प्रतिकृति योजना के लिए,
[गुणवत्ता गेट प्लेबुक](../ops/QUALITY_GATE_PLAYBOOK.md) देखें।

---

## गेट इन्वेंटरी (~90 स्क्रिप्ट)

स्क्रिप्ट `scripts/check/` (नीति गेट) और `scripts/quality/` (रैचेट इंजन) के अंतर्गत रहती हैं।
CI के लिए सत्य का स्रोत `.github/workflows/ci.yml` है।

### रिलीज़ PR फ़ास्ट-पाथ (`quality.yml`)

`.github/workflows/quality.yml`, `release/**` को लक्षित करने वाले PR पर चलता है। यह पाथ-फ़िल्टर किए गए तेज़ गेट के साथ योगदानकर्ता
ब्रांचों को आगे बढ़ाता रहता है, साथ ही कोड परिवर्तनों के लिए एक परामर्शात्मक प्रोडक्शन-बिल्ड संकेत भी देता है:

| जॉब                                              | दायरा                                                                                                                                                                                                                                | अवरोधक                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | गैर-ड्राफ़्ट कोड PR और Mergify क्यू ब्रांच; Node 24, `npm-ci-retry`, `check:node-runtime`, `OMNIROUTE_USE_TURBOPACK=1` के साथ `npm run build`; कोई आर्टिफ़ैक्ट अपलोड नहीं, क्योंकि कोई डाउनस्ट्रीम गुणवत्ता जॉब इसका उपयोग नहीं करता | **परामर्शात्मक** (`continue-on-error: true`; स्थिर रिलीज़-PR रन के एक सप्ताह बाद हटाएँ) |
| `Docs Gates (fast-path)`                         | दस्तावेज़/कोड PR; API दस्तावेज़ संदर्भ और docs-all                                                                                                                                                                                   | हाँ                                                                                     |
| `Fast Quality Gates`                             | कोड PR; स्थैतिक जाँच, टाइपचेक, डैशबोर्ड टाइपचेक, प्रभावित यूनिट टेस्ट                                                                                                                                                                | हाँ                                                                                     |
| `Forgotten sibling tests`                        | कोड PR; बदले गए मॉड्यूल से स्थैतिक उपभोक्ताओं और संभावित सिबलिंग टेस्ट तक ट्रेसिंग; बैरल और डायनेमिक-इम्पोर्ट पाथ को परामर्शात्मक निदान के रूप में रिपोर्ट किया जाता है, साथ में संदर्भित अनुमतिसूची अपवाद                           | **परामर्शात्मक**                                                                        |
| `Vitest (fast-path)`                             | कोड PR; तेज़ vitest सुइट                                                                                                                                                                                                             | हाँ                                                                                     |
| `Unit Tests fast-path`                           | कोड PR; 4-शार्ड यूनिट सुइट                                                                                                                                                                                                           | हाँ                                                                                     |
| `No new ESLint warnings`                         | कोड PR; सप्रेशन-जागरूक लिंट गार्ड                                                                                                                                                                                                    | स्वयं के स्रोत वाले PR के लिए हाँ, फ़ोर्क के लिए परामर्शात्मक                           |
| `Merge integrity (changelog + generated skills)` | गैर-ड्राफ़्ट PR; चेंजलॉग और जनरेट किए गए स्किल का सिंक                                                                                                                                                                               | स्वयं के स्रोत वाले PR के लिए हाँ, फ़ोर्क के लिए परामर्शात्मक                           |

#### भूले हुए सिबलिंग टेस्ट की रिपोर्ट

`npm run check:forgotten-sibling-tests`, टेस्ट-इम्पैक्ट मैप के पीछे मौजूद इम्पोर्ट रिज़ॉल्वर का पुनः उपयोग करता है।
प्रत्येक बदले गए प्रोडक्शन मॉड्यूल के लिए, जब संभावित
टेस्ट पुल-रिक्वेस्ट डिफ़ में मौजूद नहीं होता है, तो यह नियतात्मक
`changed module/symbol -> static consumer -> candidate sibling test` शृंखलाओं की रिपोर्ट करता है। किसी भी अवरोधक रोलआउट से पहले अंशांकन के लिए Markdown सारांश और JSON परिणाम को
`forgotten-sibling-tests` वर्कफ़्लो आर्टिफ़ैक्ट के रूप में रखा जाता है।

बैरल री-एक्सपोर्ट और डायनेमिक इम्पोर्ट केवल रिज़ॉल्यूशन निदान हैं; वे कभी भी कोई
अवरोधक निष्कर्ष नहीं बनाते। समीक्षा किए गए अपवाद
`config/quality/forgotten-sibling-allowlist.json` में रहते हैं। प्रत्येक प्रविष्टि में उपभोक्ता और संभावित
टेस्ट का नाम होना चाहिए, एक विशिष्ट औचित्य देना चाहिए, और किसी GitHub इश्यू या पुल रिक्वेस्ट का लिंक देना चाहिए। विकृत प्रविष्टियाँ
बंद अवस्था में विफल होती हैं। अपवाद किसी हटाए गए संभावित टेस्ट या `.skip`/`.todo` जोड़ने वाले डिफ़ को दबा नहीं सकते;
अभिकथन को कमज़ोर करना और अन्य छिपाव स्वतंत्र रूप से अवरोधक
`check:test-masking` गेट के अधीन रहते हैं।

### जॉब: `lint`

`main` के लिए प्रत्येक PR पर चलता है। विफलता होने पर मर्ज को रोकता है।

| स्क्रिप्ट (`npm run ...`)         | सत्यापित करता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | अवरोधक                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित सीमा के भीतर है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हाँ                                          |
| `check:cycles`                    | चक्रीय इंपोर्ट — सभी `src/` + `open-sse/` मॉड्यूल                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                          |
| `check:route-validation:t06`      | सभी रूट पर Zod स्कीमा मौजूद हैं (टियर 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हाँ                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` की संख्या निर्धारित सीमा से अधिक नहीं है (टियर 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हाँ                                          |
| `check:provider-consistency`      | `providers.ts` में प्रत्येक प्रदाता की `providerRegistry.ts` में एक संगत प्रविष्टि है (और इसके विपरीत, अनुमत सूची के भीतर)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                          |
| `check:model-lifecycle`           | हाथ से अनुरक्षित तीन रूटिंग तालिकाएँ चेक-इन किए गए जीवनचक्र स्नैपशॉट (#11503) के अनुरूप रहती हैं: `FITNESS_TABLE` (`taskFitness.ts`) किसी ऐसे सेवानिवृत्त id को स्कोर नहीं करता जिसे `REGISTRY` रूट कर सकता है; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` में मौजूद है और सेवानिवृत्त-id स्नैपशॉट में अनुपस्थित है; `REGISTRY` में अभी भी मौजूद प्रत्येक सेवानिवृत्त id को फ़ॉरवर्ड किया गया है या `allowedRetiredInCatalog` में सूचीबद्ध किया गया है; और कोई भी `DEFAULT_DEGRADATION_MAP` स्रोत या लक्ष्य उस स्नैपशॉट में सेवानिवृत्त के रूप में दिखाई नहीं देता। यह सिद्ध नहीं करता कि कोई मॉडल वर्तमान में किसी सक्रिय अपस्ट्रीम द्वारा उपलब्ध कराया जा रहा है। ऑफ़लाइन — `config/quality/model-lifecycle.json` के साथ तुलना करता है, जिसे `npm run quality:refresh-model-lifecycle` (नेटवर्क; CI में एकीकृत नहीं) से हाथ से रीफ़्रेश किया जाता है। `allowedRetiredInCatalog` एक क्रमिक कमी वाला रैचेट है: कोई प्रविष्टि केवल ट्रैकिंग इश्यू के साथ जोड़ें। | हाँ                                          |
| `check:fetch-targets`             | क्लाइंट-साइड `src/` में प्रत्येक `fetch("/api/...")` एक वास्तविक `route.ts` में रिज़ॉल्व होता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                          |
| `check:deps`                      | रिपॉज़िटरी के प्रत्येक `package.json` में मौजूद सभी `npm install`-योग्य निर्भरताएँ `dependency-allowlist.json` में हैं; नए अनपिन किए गए या स्लॉपस्क्वैट किए गए पैकेज फ़्लैग किए जाते हैं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हाँ                                          |
| `audit:deps`                      | `npm audit` (रूट + electron) — कोई उच्च/गंभीर एडवाइज़री नहीं (`check:vuln-ratchet` osv के साथ ओवरलैप करता है; युक्तिकरण बैकलॉग देखें)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                          |
| `check:lockfile`                  | `package-lock.json` की अखंडता — https रजिस्ट्री, अखंडता हैश, कोई होस्ट ओवरराइड नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                          |
| `check:licenses`                  | प्रोडक्शन dependencies के लिए SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हाँ                                          |
| `check:tracked-artifacts`         | कोई build artifacts / committed `node_modules` symlinks नहीं (husky pre-commit में भी चलता है; pre-push जानबूझकर हल्का रखा गया है — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                          |
| `check:ai-attribution`            | PR commits, title या body में कोई AI/bot `Co-Authored-By` trailer या AI-generation footer नहीं — कठोर नियम #16 (`quality.yml` के PR→`release/**` fast-gates loop में — event payload पढ़ता है, PR न होने पर कोई कार्रवाई नहीं करता — और PR→`main` के लिए `ci.yml` lint में एक केवल-PR step; साथ ही husky `commit-msg` hook; मानव co-authors की अनुमति है; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | प्रत्येक Vitest exclusion में किसी tracking issue का उल्लेख हो और वह `config/quality/vitest-exclusions.json` में मौजूद हो (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                          |
| `check:file-size`                 | कोई source file प्रति-extension सीमा से अधिक बड़ी न हो (ratchet: `frozen` सूची में स्थिर की गई बड़ी files)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                          |
| `check:error-helper`              | executors/handlers में error responses `buildErrorBody()` / `sanitizeErrorMessage()` का उपयोग करें (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                          |
| `check:migration-numbering`       | माइग्रेशन SQL फ़ाइलें बिना किसी अंतराल या डुप्लिकेट के क्रमिक रूप से क्रमांकित हैं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                          |
| `check:public-creds`              | `publicCreds.ts` के बाहर कोई शाब्दिक OAuth `client_id`/`client_secret` या Firebase Web कुंजियाँ नहीं हैं (कठोर नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हाँ                                          |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल के बाहर कोई रॉ SQL नहीं है; `localDb.ts` से कोई बैरल-इंपोर्ट नहीं है (कठोर नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हाँ                                          |
| `check:known-symbols`             | अपनी डिस्पैच तालिकाओं में पंजीकृत प्रोवाइडर एक्ज़ीक्यूटर, रूटिंग रणनीतियाँ और ट्रांसलेटर डिस्क पर मौजूद फ़ाइलों से मेल खाते हैं—कोई अनाथ या अघोषित सिंबल नहीं है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                          |
| `check:route-guard-membership`    | चाइल्ड प्रोसेस शुरू करने वाला प्रत्येक रूट `isLocalOnlyPath()` द्वारा वर्गीकृत है (कठोर नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                          |
| `check:test-discovery`            | रेपो की प्रत्येक `*.test.ts` / `*.spec.ts` फ़ाइल कम-से-कम एक टेस्ट रनर द्वारा एकत्र की जाती है (रैचेट: `test-discovery-baseline.json` में अनाथ सूची केवल छोटी हो सकती है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हाँ                                          |
| `check:agent-skills-sync`         | जनरेट किए गए agent-skills आर्टिफ़ैक्ट उनके स्रोत कैटलॉग से मेल खाते हैं (कोई विचलन नहीं)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | प्रदाता लोगो/एसेट के साथ दर्ज किया गया उद्गम रिकॉर्ड मौजूद है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON कॉन्फ़िगरेशन फ़ाइलें सफलतापूर्वक पार्स होती हैं और repo के lint नियमों को पूरा करती हैं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | बिना त्रुटियों के TypeScript संकलन (केवल परामर्शात्मक चेतावनियाँ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                          |
| `typecheck:noimplicit:core`       | सख्त `noImplicitAny` — भविष्य-उन्मुख; पहले से मौजूद कई call sites को अभी भी annotations की आवश्यकता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **परामर्शात्मक** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, `src/app/(dashboard)/**` (#7033) तक सीमित है — `typecheck:core` की चयनित 27-फ़ाइलों वाली allowlist में कोई dashboard TSX शामिल नहीं है, और `next build` भी कभी इसका type-check नहीं करता (`next.config.mjs` में `ignoreBuildErrors: true` सेट है), इसलिए वहाँ के orphaned-identifier regressions (#6625/#6909) CI के लिए अदृश्य थे। एक स्थिर, प्रति-फ़ाइल/प्रति-TS-code गणना baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` के समान stale-enforcement पैटर्न) के विरुद्ध अंतर जाँचा जाता है — केवल baseline की गणना से अधिक नई त्रुटियाँ ही gate को विफल करती हैं; पहले से मौजूद किसी त्रुटि को ठीक करने पर `--update` से baseline को क्रमशः कम करें।                                                                                                                                                                                                                                                                  | हाँ                                          |

### Job: `quality-gate`

`test-coverage` के बाद चलता है। विफल होने पर merge को रोकता है।

| स्क्रिप्ट                    | सत्यापित करता है                                                                                                                                                                  | अवरोधक              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | `quality-metrics.json` उत्पन्न करता है (ESLint चेतावनियों की संख्या, मर्ज की गई शार्ड रिपोर्ट से कवरेज)                                                                           | हाँ (रैचेट से पहले) |
| `quality:ratchet`            | `quality-baseline.json` की प्रत्येक मेट्रिक में गिरावट नहीं हुई है (ESLint चेतावनियाँ ≤ बेसलाइन; कवरेज ≥ बेसलाइन)                                                                 | हाँ                 |
| `check:duplication`          | कोड दोहराव (jscpd@4) `quality-baseline.json` में दी गई बेसलाइन से अधिक नहीं है                                                                                                    | हाँ                 |
| `check:complexity`           | फ़ाइल-स्तरीय साइक्लोमैटिक जटिलता निर्धारित सीमा से अधिक नहीं है (मुख्य ESLint `complexity` + `max-lines-per-function`)                                                            | हाँ                 |
| `check:cognitive-complexity` | संज्ञानात्मक जटिलता रैचेट (`eslint-plugin-sonarjs`) — अलग ESLint पास; CI दोनों को एकल `check:complexity-ratchets` चरण के रूप में मर्ज करके चलाता है                               | हाँ                 |
| `check:dead-code`            | अप्रयुक्त एक्सपोर्ट / फ़ाइलों का रैचेट (knip) बेसलाइन की तुलना में पीछे नहीं जाता                                                                                                 | हाँ                 |
| `check:compression-budget`   | संपीड़न बेंचमार्क बजट — प्रत्येक इंजन के लिए न्यूनतम टोकन-बचत में गिरावट नहीं होनी चाहिए                                                                                          | हाँ                 |
| `check:type-coverage`        | टाइप किए गए प्रतिशत का रैचेट (`type-coverage`) पीछे नहीं जाता; यह काफी हद तक `typecheck:noimplicit:core` को समाहित करता है                                                        | हाँ                 |
| `check:codeql-ratchet`       | खुले CodeQL अलर्ट की संख्या नहीं बढ़ती (`gh api` के माध्यम से पढ़ता है; टोकन के बिना सुचारु रूप से छोड़ देता है) — रीफ़्रेश आवृत्ति और मैन्युअल ट्रिगर: नीचे "CodeQL रैचेट" देखें | हाँ                 |

### जॉब: `quality-extended`

पूरा जॉब परामर्शात्मक है (`continue-on-error: true`)। npm-आधारित रैचेट वास्तव में
चलते हैं; बाहरी स्कैनर `gh release download` के माध्यम से इंस्टॉल होते हैं और यदि कोई बाइनरी
अभी भी अनुपस्थित है, तो स्वयं छोड़ देते हैं (exit 0)।

| स्क्रिप्ट                | सत्यापित करता है                                                                                                                                                                                                    | अवरोधक           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check:circular-deps`    | कोई चक्रीय निर्भरताएँ नहीं हैं (dpdm)                                                                                                                                                                               | **परामर्शात्मक** |
| `check:bundle-size`      | बंडल का आकार निर्धारित सीमा से अधिक नहीं है                                                                                                                                                                         | **परामर्शात्मक** |
| `check:secrets`          | गोपनीय जानकारियों की स्कैनिंग (gitleaks) — बाइनरी अनुपस्थित होने पर छोड़ देता है                                                                                                                                    | **परामर्शात्मक** |
| `check:vuln-ratchet`     | निर्भरता की कमज़ोरियाँ (osv-scanner) नहीं बढ़तीं — बाइनरी अनुपस्थित होने पर छोड़ देता है                                                                                                                            | **परामर्शात्मक** |
| `check:workflows`        | वर्कफ़्लो लिंट (actionlint + zizmor) — बाइनरी अनुपस्थित होने पर छोड़ देता है                                                                                                                                        | **परामर्शात्मक** |
| `check:openapi-breaking` | बेस ब्रांच की तुलना में सार्वजनिक API अनुबंध (`openapi.yaml`) में विघटनकारी परिवर्तन (oasdiff) — `openapiBreaking=N` उत्सर्जित करता है; oasdiff अनुपस्थित होने या बेस स्पेसिफ़िकेशन को हल न कर पाने पर छोड़ देता है | **परामर्शात्मक** |

### जॉब: `docs-sync-strict`

`main` पर आने वाले प्रत्येक PR पर चलता है। विफल होने पर मर्ज को अवरुद्ध करता है।

| स्क्रिप्ट                      | सत्यापित करता है                                                                                                                                         | अवरोधक                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | मेटा-गेट, जो नीचे दिए गए 6 उप-गेट क्रमिक रूप से चलाता है                                                                                                 | हाँ                                  |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt संस्करणों की संगति                                                                                                         | हाँ                                  |
| ↳ `check:docs-counts`          | गद्य में दी गई संख्याएँ (प्रदाता संख्या, माइग्रेशन संख्या आदि) वास्तविक संख्याओं की रैचेट विंडो के भीतर हैं                                              | हाँ                                  |
| ↳ `check:env-doc-sync`         | `.env.example` में मौजूद प्रत्येक env var किसी दस्तावेज़ तालिका में दर्ज है, और इसका उलटा भी सत्य है                                                     | हाँ                                  |
| ↳ `check:deprecated-versions`  | दस्तावेज़ों में कोई अप्रचलित संस्करण स्ट्रिंग नहीं है                                                                                                    | हाँ                                  |
| ↳ `check:doc-links`            | दस्तावेज़ों में आंतरिक markdown लिंक वास्तविक फ़ाइलों पर ले जाते हैं (`[text]`/`(path)` प्रारूप)                                                         | हाँ                                  |
| ↳ `check:fabricated-docs`      | दस्तावेज़ों में उल्लिखित रूट, env vars, CLI कमांड, हुक नाम और फ़ाइल पथ कोडबेस में मौजूद हैं। `--strict` के माध्यम से कठोर गेट; फ़्लैग के बिना सॉफ्ट-फेल। | हाँ (CI में `--strict` के माध्यम से) |
| `check:cli-i18n`               | CLI कमांड स्ट्रिंग सभी i18n locale फ़ाइलों में मौजूद हैं                                                                                                 | हाँ                                  |
| `check:openapi-coverage`       | OpenAPI विनिर्देश वास्तविक रूटों की कम-से-कम रैचेट की गई न्यूनतम सीमा को कवर करता है                                                                     | हाँ                                  |
| `check:openapi-security-tiers` | `openapi.yaml` में सुरक्षा स्तर के एनोटेशन `routeGuard.ts` के वर्गीकरणों के अनुरूप हैं                                                                   | **परामर्शात्मक**                     |
| `check:openapi-routes`         | `openapi.yaml` का प्रत्येक पथ किसी वास्तविक `route.ts` पर ले जाता है (भ्रामक जानकारी-रोधी)                                                               | हाँ                                  |
| `check:docs-symbols`           | `docs/**/*.md` में प्रत्येक `/api/...` संदर्भ किसी वास्तविक `route.ts` पर ले जाता है (भ्रामक जानकारी-रोधी)                                               | हाँ                                  |
| `i18n translation drift`       | i18n locale फ़ाइलों में अनुवाद न की गई कुंजियाँ — केवल चेतावनी                                                                                           | **परामर्शात्मक**                     |

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | सत्यापित करता है                                                                                                                                                                      | अवरोधक           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुंजी कवरेज ≥ 65% है                                                                                                                                                          | हाँ              |
| `check-ui-value-drift` (इनलाइन)   | दोबारा लिखा गया अंग्रेज़ी **मान** कोई पुराना अनुवाद पीछे नहीं छोड़ता                                                                                                                  | हाँ              |
| `check-new-key-coverage` (इनलाइन) | एक **नई** अंग्रेज़ी कुंजी प्रत्येक locale में अनूदित है — `__MISSING__:` मार्कर अस्वीकार किया जाता है                                                                                 | हाँ              |
| `check-translation-ratio`         | प्रति locale वास्तविक-अनुवाद अनुपात (allowlist से बाहर अंग्रेज़ी के समान / placeholder / अनुपलब्ध लीफ़) `config/quality/i18n-translation-baseline.json` + छूट से अधिक नहीं होना चाहिए | **परामर्शात्मक** |

`fetch-depth: 0` आवश्यक है — value-drift गेट `en.json` की तुलना merge base से करता है।

#### `check-ui-value-drift` — पुराने-अनुवाद का गेट

यह उस एक i18n रिग्रेशन को पकड़ता है जिसे अन्य गेट संरचनात्मक रूप से नहीं देख सकते: किसी अंग्रेज़ी मान को
दोबारा लिखा जाता है और _पिछले_ अंग्रेज़ी मान से प्राप्त अनुवाद वहीं रह जाते हैं, जिसके कारण
गैर-अंग्रेज़ी उपयोगकर्ता विश्वासपूर्ण भाषा में लिखी हुई, लेकिन अब गलत जानकारी पढ़ते रहते हैं।

यह वास्तव में रिलीज़ हो चुका था। Antigravity लॉगिन हेल्पर आने पर (#5203)
`oauthModal.googleOAuthWarning` को दोबारा लिखा गया था; **43 में से 39 locales** में ऑपरेटरों को "पूरा
URL कॉपी करके नीचे पेस्ट करने" के लिए कहने वाला टेक्स्ट बना रहा — एक ऐसा प्रवाह जो उस प्रदाता के लिए पूरा
नहीं हो सकता। #8463 तक इस पर ध्यान नहीं गया, क्योंकि:

- `sync-ui-keys` केवल उन कुंजियों को बैकफ़िल करता है जो **अनुपस्थित** हैं, उन कुंजियों को कभी नहीं जो **पुरानी** हैं;
- `check-ui-keys-coverage` कुंजी की _मौजूदगी_ गिनता है, इसलिए पुराना अनुवाद भी कवर किया हुआ माना जाता है;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` दस्तावेज़ीकरण मिरर को ट्रैक करता है —
  यह कभी भी `src/i18n/messages/*.json` नहीं पढ़ता। 2026-09 के पुनः सिंक के बाद से जॉब `docs-sync-strict` में अवरोधक: कोई मुख्य दस्तावेज़ संपादित करें → `npm run i18n:run -- --files=<doc>` (अनुभाग-स्तरीय, सस्ता)।

**डिफ़-अवेयर, बेसलाइन-समर्थित नहीं।** यह मर्ज बेस पर मौजूद `en.json` की तुलना
वर्किंग ट्री से करता है; हर उस कुंजी के लिए जिसका अंग्रेज़ी मान बदला है, ऐसा कोई भी लोकेल जिसमें अभी भी
अपरिवर्तित अनुवाद मौजूद है, पुराना माना जाता है। यह जानबूझकर **पहले से मौजूद ऋण को स्थिर रखता है** — कोई डिफ़
यह नहीं बता सकता कि लंबे समय से मौजूद अनुवाद किस पुराने अंग्रेज़ी पाठ से आया था, इसलिए यह गेट
केवल वर्तमान बदलाव से प्रभावित चीज़ों का आकलन करता है। विकल्प (प्रति-कुंजी हैश बेसलाइन) के लिए
लगभग 600 KB की जनरेट की गई फ़ाइल की आवश्यकता होगी, जो सबसे बड़ी मौजूदा बेसलाइन से 3× बड़ी होगी और प्रत्येक i18n PR पर बदलेगी।

इसे संतुष्ट करने के दो तरीके हैं:

1. प्रभावित अनुवादों को अपडेट करें, या
2. उन्हें `__MISSING__:<new english>` पर सेट करें — इसके बाद रनटाइम सही किया गया अंग्रेज़ी पाठ प्रस्तुत करता है
   (`src/i18n/request.ts::deepMergeFallback`, #7258) और कुंजी अनुवाद के लिए कतारबद्ध हो जाती है।

यदि स्ट्रिंग का **अर्थ** बदल गया है, तो **कुंजी का नाम बदलना** बेहतर है: नई कुंजी को
पुराना अनुवाद विरासत में नहीं मिल सकता। #8463 में इसी पैटर्न का उपयोग किया गया था।

```bash
npm run i18n:check-value-drift          # सख़्त (CI यही चलाता है)
npm run i18n:check-value-drift:warn     # केवल रिपोर्ट
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

जब बेस कैटलॉग को पढ़ा नहीं जा सकता (बेस रेफ़ के बिना शैलो
क्लोन), तो `check-openapi-breaking` के व्यवहार को दोहराते हुए, यह `SKIP reason=base-unresolved` के साथ 0 पर समाप्त होता है।

### जॉब: `i18n`

पूर्ण i18n सत्यापन मैट्रिक्स (प्रत्येक लोकेल के लिए एक जॉब)। पूरा जॉब परामर्शात्मक है।

| स्क्रिप्ट                       | सत्यापित करता है              | अवरोधक                                                   |
| ------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल अनुवाद की पूर्णता | **परामर्शात्मक** (पूरे जॉब पर `continue-on-error: true`) |

### जॉब: `pr-test-policy`

केवल पुल रिक्वेस्ट पर चलता है।

| स्क्रिप्ट              | सत्यापित करता है                                                                                                                        | अवरोधक |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, या `bin/` में प्रोडक्शन कोड बदलने वाले PR में टेस्ट शामिल या अपडेट होने चाहिए (कठोर नियम #8)          | हाँ    |
| `check:test-masking`   | बदली गई टेस्ट फ़ाइलें कुल assert संख्या कम नहीं करतीं या `assert.ok(true)` जैसी पुनरुक्तियाँ नहीं जोड़तीं                               | हाँ    |
| `check:pr-evidence`    | PR बॉडी में बदलाव के लिए टेस्ट/VPS साक्ष्य उद्धृत हैं (PR गद्य को grep करके कठोर नियम #18 को यंत्रीकृत करता है — नाज़ुक, Backlog देखें) | हाँ    |

### जॉब: `test-vitest`

`build` के बाद चलता है। विफलता होने पर मर्ज को रोकता है।

| सुइट             | सत्यापित करता है                                 | अवरोधक                                                                                                                           |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्वर (110 टूल), autoCombo, कैश — vitest रनर | हाँ                                                                                                                              |
| `test:vitest:ui` | UI कंपोनेंट टेस्ट — vitest रनर                   | **अवरोधक** — पहले से मौजूद विफलताओं को `vitest.config.ts` में स्पष्ट रूप से बाहर रखा गया है; नई विफलताएँ जॉब को विफल कर देती हैं |

### रात्रिकालीन वर्कफ़्लो (शेड्यूल किए गए, परामर्शात्मक)

ये cron शेड्यूल पर (और `workflow_dispatch` द्वारा) चलते हैं, PR पर कभी नहीं। सभी परामर्शात्मक हैं।

| वर्कफ़्लो              | सत्यापित करता है                                                                                                                                                      | अवरोधक           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | रैंडम सीड + अधिक रन संख्या वाले fast-check प्रॉपर्टी टेस्ट                                                                                                            | **परामर्शात्मक** |
| `nightly-resilience`   | heap-growth गेट, chaos fault-injection, k6 लोड/सोक                                                                                                                    | **परामर्शात्मक** |
| `nightly-llm-security` | promptfoo injection guard (ब्लॉक मोड) + garak प्रोब (प्रोवाइडर सीक्रेट के बिना छोड़े जाते हैं)                                                                        | **परामर्शात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` का उपयोग करके लाइव OmniRoute के विरुद्ध OpenAPI कॉन्ट्रैक्ट फ़ज़िंग (schemathesis) — स्पेक उल्लंघनों / अनहैंडल्ड 500 को उजागर करता है (चरण 8 B.4) | **परामर्शात्मक** |
| `nightly-mutation`     | तेज़ यूनिट लेन पर Stryker म्यूटेशन-टेस्टिंग स्कोर — जीवित बचे म्यूटेंट कमज़ोर asserts को उजागर करते हैं                                                               | **परामर्शात्मक** |
| `nightly-compat`       | समर्थित `engines.node` रेंज में Node इंजन संगतता मैट्रिक्स                                                                                                            | **परामर्शात्मक** |

---

## वेग चरण (2026-08-30 → v4.0 LTS): प्रत्येक बेसलाइन में 20% की ढील

स्वामी का निर्णय (2026-08-30): v4.0 मॉड्यूलराइज़ेशन तक, तकनीकी ऋण की सीमा बनाए रखने की तुलना में
रिलीज़ की गति अधिक महत्वपूर्ण है। प्रत्येक **संख्यात्मक** रैचेट बेसलाइन को एक
ऑडिट-योग्य चरण में 20% ढीला किया गया, और इस चरण की घोषणा `config/quality/quality-baseline.json` में की गई है:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| क्या बदला                                                                                                                                                                            | कहाँ                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — कम-बेहतर गणनाएँ ×1.2, अधिक-बेहतर प्रतिशत ÷1.2 (कवरेज न्यूनतम सीमा 60 पर रखी गई, `eslintErrors` 0 पर ही है, `eslintWarnings` 0 → स्थिर की गई सप्रेशन गणना का 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` नोट प्रत्येक पहले → बाद के मान को सूचीबद्ध करता है) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                   |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` पंक्ति सीमा ×1.2                                                                                                            | `file-size-baseline.json`                                                                                 |
| प्रति-फ़ाइल / प्रति-TS-कोड गणनाएँ ×1.2                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`    |
| `THRESHOLD` 36 → 30                                                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                                |
| `_policy.requireTighten === false` होने पर `--require-tighten` परामर्शात्मक हो जाता है                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                               |
| रात्रिकालीन `bank-ratchet-shrinks` रुक जाता है (यह मापी गई कमी को संचित करके उपलब्ध अतिरिक्त गुंजाइश को समाप्त कर देता)                                                              | `.github/workflows/nightly-release-green.yml`                                                             |

अनुमति-सूचियाँ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) बजट **नहीं** हैं और उन्हें बदला नहीं गया। पास/फ़ेल नीति गेट (सीक्रेट्स, SQL नियम,
docs/env अनुबंध, i18n समानता, यूनिट परीक्षण) अपरिवर्तित हैं — विफल परीक्षण अब भी विफल परीक्षण ही है।

**टूलिंग**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एकबारगी
  ढील (`scripts/quality/relax-baselines.mjs`); समान नोट के साथ दूसरी बार चलने से इनकार करता है।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  प्रत्येक संख्यात्मक गेट को ठीक उसी तरह मापता है जैसे CI करता है और प्रति गेट शेष अतिरिक्त गुंजाइश प्रिंट करता है
  (`scripts/quality/baseline-headroom.mjs`)। रात्रिकालीन `baseline-headroom` जॉब तालिका को
  सक्रिय इश्यू **📈 बेसलाइन अतिरिक्त गुंजाइश (वेग चरण)** पर पोस्ट करता है और जब कोई गेट अपनी सीमा के 10% के भीतर
  हो या पहले ही उसे पार कर चुका हो, तब `headroom-alert` लेबल जोड़ता है। वह इश्यू
  प्रारंभिक चेतावनी है: जो बजट कुछ दिनों में भर जाता है, उसका अर्थ है कि ढील का उपयोग
  पूरी टीम द्वारा नहीं, बल्कि कुछ PRs द्वारा किया जा रहा है — संबंधित गेट के `_rebaseline_*` नोट देखें।

**नए-कोड का मोड (Clean-as-You-Code) — 2026-08-30 से, केवल PR तेज़-पथ**

`pull_request` इवेंट पर `quality.yml`, `check:file-size`,
`check:complexity-ratchets` और `check:dead-code` को `--base-ref <PR base SHA>` पास करता है। उस मोड में गेट HEAD की तुलना
मर्ज-बेस से **केवल उन फ़ाइलों तक सीमित रहकर करता है जिन्हें PR ने बदला है** (`scripts/check/newCodeMode.mjs`:
मर्ज-बेस को एक अस्थायी `git worktree` में मूर्त रूप दिया जाता है, ESLint/knip वहाँ और HEAD पर चलते हैं, तथा
प्रति-फ़ाइल गणनाओं का अंतर निकाला जाता है):

- **अवरोधक** — PR ने अपनी बदली हुई फ़ाइलों में चक्रवाती/संज्ञानात्मक जटिलता उल्लंघन या डेड एक्सपोर्ट जोड़े
  (लॉग में `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **परामर्शात्मक** — वैश्विक योग बनाम स्थिर की गई बेसलाइन। विरासत में मिला विचलन कभी भी किसी
  निर्दोष PR को विफल नहीं करता; रिलीज़ समाधान के समय विचलन को फिर से स्थिर किया जाता है और अतिरिक्त गुंजाइश जॉब उसकी निगरानी करता है।

`workflow_dispatch` रन, रिलीज़-ग्रीन स्वीप और रात्रिकालीन अतिरिक्त गुंजाइश जॉब के पास कोई PR बेस
नहीं होता और वे निरपेक्ष (वैश्विक) तुलना बनाए रखते हैं। कवरेज, डुप्लिकेशन और टाइप-कवरेज अभी
वैश्विक ही रहते हैं (उनके टूल कम लागत में प्रति-फ़ाइल अंतर उत्पन्न नहीं करते) — समान व्यवहार के लिए संभावित उम्मीदवार।

**v4.0 पर चरण समाप्त करना (LTS = पहले से अधिक कड़ा, न कि "सामान्य स्थिति में वापसी")**

1. शुद्ध `release/v4.0.0` टिप पर: रिकॉर्ड के लिए `npm run quality:headroom --json`, फिर
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, और प्रत्येक typecheck गेट का
   `--update` चलाएँ — हर बेसलाइन मापे गए मान तक घट जाती है।
2. `quality-baseline.json` से `_policy` हटाएँ (`--require-tighten` और रात्रिकालीन
   बैंकिंग को फिर से सक्रिय करता है), `check-openapi-coverage.mjs` में `THRESHOLD = 36` (या अधिक) पुनर्स्थापित करें।
3. जहाँ मॉड्यूलराइज़ेशन लाभदायक रहा, वहाँ मापे गए मान से आगे कसाव करें: file-size `cap` को वापस 1000
   (या 800) करें, कवरेज न्यूनतम सीमाएँ +5 करें, और मॉड्यूलराइज़ किए गए पैकेजों के लिए dead exports को 0 करें।

## रैचेट बेसलाइन (`quality-baseline.json`)

रैचेट इंजन (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` को पढ़ता है
और उसकी तुलना नए एकत्र किए गए `quality-metrics.json` से करता है। कोई भी मेट्रिक जो अपने एप्सिलॉन
से अधिक खराब होता है, बिल्ड को विफल कर देता है।

वर्तमान में ट्रैक किए जा रहे मेट्रिक्स:

| मेट्रिक               | दिशा   | अर्थ                                         |
| --------------------- | ------ | -------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint चेतावनियों की संख्या बढ़नी नहीं चाहिए |
| `coverage.statements` | `up`   | स्टेटमेंट कवरेज कम नहीं होना चाहिए           |
| `coverage.lines`      | `up`   | लाइन कवरेज कम नहीं होना चाहिए                |
| `coverage.functions`  | `up`   | फ़ंक्शन कवरेज कम नहीं होना चाहिए             |
| `coverage.branches`   | `up`   | ब्रांच कवरेज कम नहीं होना चाहिए              |

वास्तविक सुधार के बाद बेसलाइन अपडेट करने के लिए:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ़्लैग वर्तमान मापे गए मानों को `quality-baseline.json` में लिखता है।
इस फ़ाइल को उस परिवर्तन के साथ कमिट करें जिसने मेट्रिक में सुधार किया है। ऐसा PR जो बेसलाइन
अपडेट किए बिना किसी मेट्रिक में सुधार करता है, उसे `--require-tighten` द्वारा पकड़ा जाएगा (चरण 6A.5,
कार्यान्वयन लंबित है)।

### CodeQL रैचेट: रीफ़्रेश आवृत्ति और मैन्युअल ट्रिगर

`check:codeql-ratchet` **रेपो की स्थिति पढ़ता है, जिसे निर्धारित समय-सारणी पर रीफ़्रेश किया जाता है — प्रत्येक PR पर नहीं।**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` से
`state: configured`, `schedule: weekly` रिपोर्ट होता है: यह GitHub का डिफ़ॉल्ट-सेटअप स्कैन है, प्रत्येक पुश पर होने वाला
विश्लेषण नहीं। परिणाम: अलर्ट ठीक करने वाला कोई PR मर्ज होने के बाद भी रैचेट पुराने, अधिक काउंट को
तब तक पढ़ता रहता है जब तक अगला निर्धारित स्कैन नहीं चलता — इसलिए स्कैन के अद्यतित होने तक यह
हर खुले PR पर, यहाँ तक कि सुधार करने वाले PR के अपने फ़ॉलो-अप पर भी, रिग्रेशन रिपोर्ट करता है।

**मैन्युअल रीफ़्रेश**: `gh workflow run codeql.yml --ref release/vX.Y.Z` विश्लेषण को फिर से चलाता है
और कुछ ही मिनटों में अलर्ट दोबारा प्रकाशित करता है। पहले `.github/workflows/codeql.yml` पढ़ें
— इसका हेडर बताता है कि यह केवल `workflow_dispatch` है, **क्योंकि यह GitHub के "default setup" से
टकराता है** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)। `push`/`pull_request`/
`schedule` ट्रिगर बहाल करने के लिए पहले **स्वामी द्वारा कार्रवाई** आवश्यक है: Settings → Code security →
CodeQL: Default → Advanced। वह बदलाव किए बिना `schedule:` ट्रिगर न जोड़ें — इससे केवल
विफल रन उत्पन्न होंगे।

**काउंट घटने के बाद बेसलाइन को कसें** — `node scripts/check/check-codeql-ratchet.mjs
--update` नए मापे गए काउंट को `quality-baseline.json` →
`metrics.codeqlAlerts.value` में लिखता है, ताकि रैचेट चुपचाप पुराने अधिकतम स्तर तक वापस होने वाले
रिग्रेशन की अनुमति न दे। व्यावहारिक उदाहरण (2026-09-02/03): PR #12502 ने 7 वास्तविक अलर्ट ठीक किए
(13 → 6 मापे गए खुले अलर्ट); PR #12530 ने मिलान के लिए स्थिर बेसलाइन को 11 → 6 तक कसा; इसके बाद
शेष 6 को प्रत्येक अलर्ट के लिए औचित्य देकर खारिज किया गया, जिससे खुले अलर्ट की संख्या 0 हो गई।

**अलर्ट खारिज करना ऑपरेटर का निर्णय है (कठोर नियम #14)** — खारिज करने वाली टिप्पणी में
तकनीकी औचित्य दर्ज किए बिना कभी भी CodeQL अलर्ट खारिज न करें: अपस्ट्रीम-प्रोटोकॉल आवश्यकता के लिए
`won't fix`, टेस्ट फ़िक्स्चर के लिए `used in tests`, और ऐसे सैनिटाइज़र के लिए जिसे CodeQL नहीं देख सकता
`false positive` (पूर्व उदाहरण: `docs/security/ERROR_SANITIZATION.md`)।

---

## टेस्ट रीट्राई नीति (WS5.4, v3.8.49)

रीट्राई प्रत्येक रनर के लिए अलग है, कभी भी वैश्विक रूप से लागू नहीं होता — सभी पर लागू रीट्राई वास्तविक रिग्रेशन को
अदृश्य फ्लेक्स में बदल देता है:

| रनर              | नीति                                                                                                                                              | कारण                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | केवल CI में `retries: 1`, साथ में `trace: on-first-retry`                                                                                         | ब्राउज़र/नेटवर्क टाइमिंग वास्तव में अनिर्धारित होती है; ट्रेस के साथ एक रीट्राई फ्लेक को निदान-योग्य आर्टिफ़ैक्ट में बदल देता है |
| Vitest           | कोई वैश्विक रीट्राई नहीं। प्रमाणित रूप से फ्लेकी टेस्ट को स्पष्ट प्रति-टेस्ट रीट्राई मिलता है (diff में दिखाई देता है, PR में समीक्षा की जाती है) | क्वारंटीन सूची को repo में रखता है, कभी भी अपारदर्शी नहीं होने देता                                                              |
| node:test (unit) | कभी भी कोई रीट्राई नहीं                                                                                                                           | फ्लेकी यूनिट टेस्ट, टेस्ट में मौजूद बग है — उसे ठीक करें, दोबारा चलाकर किस्मत न आज़माएँ                                          |

फ्लेक टेलीमेट्री उपलब्ध होने के बाद लक्षित SLOs (WS5.2/5.3): प्रति टेस्ट <1% फ्लेक दर
("अभी ठीक करें" सीमा), प्रति पाइपलाइन ≥95% पास दर। उद्योग के संदर्भ मान —
हमारे अपने मापों के आधार पर पुनः कैलिब्रेट करें।

## रिलीज़-स्तरीय रैचेट ड्रिफ्ट (WS5.5, v3.8.49)

जब कोई रैचेट (फ़ाइल आकार, जटिलता, eslint चेतावनियाँ) शुद्ध रिलीज़
टिप पर रिग्रेस करता है — अर्थात, मर्जों के संयोजन ने उसे रिग्रेस किया हो और कोई भी अकेला PR अपनी
शाखा पर उस रिग्रेशन को पुनरुत्पादित न करता हो — तो उसे ठीक करने की ज़िम्मेदारी **रिलीज़ कैप्टन की है, एक बार,
रिलीज़ शाखा पर**: निष्कर्षण/रिफ़ैक्टर को प्राथमिकता दें; केवल दस्तावेज़ीकृत
औचित्य प्रविष्टि के साथ ही रीबेसलाइन करें। संयोजन से आए ड्रिफ्ट को कभी भी किसी योगदानकर्ता के PR पर न डालें, और कभी भी
प्रति-PR रीबेसलाइन न करें (यह वास्तविक रिग्रेशन को छिपाता है)। पहले अंतर स्पष्ट करें: यह मानने से पहले कि आपके PR ने इसे उत्पन्न किया है,
किसी प्रोब worktree में शुद्ध टिप के विरुद्ध विफलता को पुनरुत्पादित करें।

## रैचेट संकुचन को संचित करना — नीचे की दिशा (#8584)

रैचेट केवल आधा स्वचालित है, और वह भी गलत आधा। किसी सीमा को **बढ़ाना** एक
मैन्युअल JSON संपादन है जिसमें दस सेकंड लगते हैं और जो विफल PR को अनब्लॉक करने का सबसे तेज़ तरीका है।
किसी सीमा को **घटाने** के लिए किसी व्यक्ति को `--update` चलाकर परिणाम कमिट करना पड़ता है — और
`bank-ratchet-shrinks` जॉब आने तक किसी भी वर्कफ़्लो ने इसे नहीं चलाया। मापा गया परिणाम
(2026-07-25): 18 फ़्रीज़ की गई फ़ाइलें पहले से ही नई फ़ाइलों के लिए निर्धारित 800-पंक्ति सीमा पर या उससे नीचे थीं, जिनमें सबसे खराब
132× पर थी (`src/shared/validation/schemas.ts`, 19 पंक्तियों के लिए 2,523 की सीमा);
जटिलता की अधिकतम सीमा लगभग 37 रीबेसलाइन नोट्स के दौरान `1794 → 2169` तक बढ़ी, जिसमें ठीक एक
कमी (−1) हुई; और "अगले चक्र में `--update` के माध्यम से कसें" 31 बार लिखा गया और
एक बार पालन किया गया। जिस कोड के कारण कोई सीमा निर्धारित हुई थी, उसके समाप्त होने के बाद भी यदि वह सीमा बनी रहती है, तो वह चुपचाप
हर पूर्ण हो चुके विघटन को उस व्यक्ति के लिए वृद्धि की छूट में बदल देती है जो अगली बार फ़ाइल संपादित करता है।

`nightly-release-green.yml` → जॉब **`bank-ratchet-shrinks`** उस चक्र को पूरा करता है:

|                  |                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| चलता है          | `schedule` (3×/दिन) + `workflow_dispatch` — जानबूझकर **`push` पर नहीं**                                          |
| मापता है         | उच्चतम `release/vX.Y.Z`, `release-green` के समान रिज़ॉल्यूशन + इंजेक्शन गार्ड                                    |
| लिखता है         | `check:file-size --update` और `check:complexity-ratchets --update` (दोनों संरचना के अनुसार केवल संकुचन करते हैं) |
| सत्यापित करता है | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| भेजता है         | रिलीज़ शाखा के विरुद्ध एक हमेशा अद्यतित PR — बलपूर्वक अपडेट किया जाता है, कभी स्पैम नहीं किया जाता               |

संचयन प्रति-पुश के बजाय बैच में किया जाता है क्योंकि इसकी कोई विलंबता आवश्यकता नहीं है (8 घंटे के भीतर संचित
संकुचन पर्याप्त है), जबकि प्रति-मर्ज रन, मर्ज अभियानों के दौरान PR शाखा को बार-बार
पुनर्निर्मित करेगा और हर बार पूर्ण ESLint स्कैन की लागत उठाएगा। पहचान `push` (`release-green`) पर ही रहती है;
केवल संचयन बैच में किया जाता है।

### सुरक्षा सत्यापक

जॉब बिना निगरानी के बेसलाइन में लिखता है, इसलिए `verify-ratchet-bank.mjs` ही इसे
स्वीकार्य बनाता है। यह `--update` के बाद वाले ट्री की तुलना `HEAD` से करता है और **कोई भी कमिट बनने से
पहले जॉब को निरस्त कर देता है** — कोई PR नहीं खोलता — जब तक कि प्रत्येक बदलाव निम्न में से कोई एक न हो:

- किसी `frozen` / `testFrozen` संख्यात्मक प्रविष्टि को **घटाया** या **हटाया** गया हो
- `complexity-baseline.json` → `count` को **घटाया** गया हो
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` को **घटाया** गया हो

बाकी हर चीज़ विफल होती है: किसी संख्या को बढ़ाना, प्रविष्टि जोड़ना, `cap`/`testCap` बदलना, या
किसी `_rebaseline_*` नोट को हटाना/दोबारा लिखना (ये नोट इस बात का ऑडिट ट्रेल हैं कि प्रत्येक
अधिकतम सीमा क्यों मौजूद है और इन्हें फ़ाइल प्रविष्टियों वाले उसी `frozen` ऑब्जेक्ट में संग्रहीत किया जाता है)।
सीमा बढ़ा सकने वाला बॉट मौजूदा स्थिति से भी स्पष्ट रूप से बदतर होगा। रिग्रेशन
गार्ड: `tests/unit/verify-ratchet-bank.test.ts`।

जॉब कभी भी `release/*` पर पुश नहीं करता — कोई मानव PR को मर्ज करता है, इसलिए कोई गलत माप
बिना समीक्षा के शामिल नहीं हो सकता।

## अनुमतिसूची नीति

पहले से मौजूद उल्लंघनों पर विफल न हो सकने वाला प्रत्येक गेट एक स्थिर अनुमतिसूची का उपयोग करता है
(जैसे, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। नीति यह है:

**मूल कारण ठीक करें; अनुमतिसूची का उपयोग केवल तभी करें जब उल्लंघन पहले से मौजूद हो और
उसे उसी PR में ठीक न किया जा सके।**

अनुमतिसूची में कोई प्रविष्टि जोड़ते समय:

1. औचित्य सहित एक टिप्पणी शामिल करें।
2. ट्रैकिंग इश्यू का संदर्भ दें (जैसे, `// #3498 — चरण 2 की सुविधा, अभी तक लागू नहीं की गई`)।
3. उल्लंघन ठीक करने वाले उसी PR में प्रविष्टि हटाएँ — ऐसी अप्रचलित प्रविष्टि, जो अब किसी
   सक्रिय उल्लंघन को दबाती नहीं है, स्वयं एक दोष है (लागू होने के बाद 6A.3 अप्रचलित-प्रवर्तन
   किसी अनाथ अनुमतिसूची प्रविष्टि पर गेट को विफल कर देगा)।

परीक्षणों को जल्दी पास कराने के लिए अनुमतिसूची प्रविष्टियाँ **न जोड़ें**। बढ़ती हुई
अनुमतिसूची के साथ हरा गेट गुणवत्ता का झूठा आभास देता है।

### जब आपके PR पर कोई गेट विफल हो

1. **गेट का आउटपुट ध्यान से पढ़ें** — यह आपको सटीक रूप से बताता है कि किस फ़ाइल या प्रतीक ने
   नियम का उल्लंघन किया।
2. **उल्लंघन ठीक करें** — अधिकांश गेट नियतात्मक फ़ाइल-सिस्टम जाँच हैं, जो कोड सही होते ही
   पास हो जाती हैं।
3. **यदि उल्लंघन पहले से मौजूद है** (अर्थात, आपने इसे प्रस्तुत नहीं किया, लेकिन अब गेट
   इसे कवर करता है): औचित्य वाली टिप्पणी और ट्रैकिंग इश्यू के साथ अनुमतिसूची प्रविष्टि जोड़ें।
4. **यदि गेट रैचेट है** (कवरेज, ESLint चेतावनियाँ, दोहराव, जटिलता):
   आपके बदलाव ने मेट्रिक को खराब किया है। अंतर्निहित समस्या ठीक करें, या (दुर्लभ मामलों में)
   यदि बदलाव जानबूझकर किया गया है और मेट्रिक में गिरावट स्वीकार्य है, तो
   `npm run quality:ratchet -- --update` चलाएँ — लेकिन PR विवरण में इसका कारण दर्ज करें।
5. **परामर्शात्मक गेट** (`continue-on-error: true`) केवल सूचनात्मक होते हैं — वे
   मर्ज को अवरुद्ध नहीं करते, लेकिन CI सारांश में दिखाई देते हैं। फिर भी उन्हें ठीक करें।

---

## नया गेट जोड़ना

1. `scripts/check/check-<name>.mjs` (या `.ts`) बनाएँ। नीति गेट 0/1 के साथ समाप्त होते हैं।
   रैचेट-शैली के गेट `collect-metrics.mjs` के माध्यम से `quality-metrics.json` में एक मेट्रिक उत्सर्जित करते हैं।
2. `package.json` में `"check:<name>": "node scripts/check/check-<name>.mjs"` जोड़ें।
3. इसे `.github/workflows/ci.yml` में उपयुक्त जॉब के अंतर्गत जोड़ें
   (नीति → `lint` या `docs-sync-strict`; रैचेट → `quality-gate`)।
4. यदि इसमें अनुमतिसूची है, तो `scripts/check/lib/allowlist.mjs` से
   `reportStaleEntries()` लागू करें, ताकि अप्रचलित प्रविष्टियों का स्वतः पता लगाया जा सके।
5. गेट के पहचान तर्क को कवर करने वाला परीक्षण `tests/unit/build/` में लिखें।
6. इस दस्तावेज़ को अपडेट करें (संबंधित जॉब तालिका में एक पंक्ति जोड़ें)।

---

## एजेंट टूलिंग: LSP-इन-द-लूप (ऑप्ट-इन)

CI गेट से आगे, OmniRoute एक **ऑप्ट-इन** `agent-lsp` स्कैफ़ोल्ड प्रदान करता है
(प्रोजेक्ट-स्तरीय `.mcp.json`, Fase 7 Task 15)। कोडिंग एजेंटों के लिए TypeScript भाषा सर्वर
उपलब्ध कराने हेतु `.mcp.json` बनाएँ, ताकि वे कोड लिखने से **पहले** प्रतीकों /
डायग्नोस्टिक्स का समाधान करें — यह `typecheck:core` का कंपाइल-बिफोर-क्लेम सहयोगी है,
जो "गढ़े गए प्रतीक" संबंधी त्रुटियों को उनके स्रोत पर ही कम करता है। इसे जानबूझकर
स्वतः लोड नहीं किया जाता (आप MCP↔LSP ब्रिज चुनते और सत्यापित करते हैं); कोई खराब प्रविष्टि केवल
कनेक्शन त्रुटि लॉग करती है और कभी भी सत्रों को बाधित नहीं करती।

---

## युक्तिसंगतीकरण बैकलॉग (ROI समीक्षा — चरण 9 लहर 3)

इस इन्वेंटरी का `ci.yml` के साथ 2026-06-17 को मिलान किया गया था (पिछले संस्करण में
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` छूट गए थे)। मिलान किए गए सेट की ROI समीक्षा
में निम्नलिखित युक्तिसंगतीकरण उम्मीदवारों की पहचान हुई। **मर्ज यांत्रिक CI
परिवर्तन हैं; फ्लिप/ड्रॉप ऑपरेटर के लिए आरक्षित नीतिगत निर्णय हैं।** नीचे दिया गया कुछ भी
अभी लागू नहीं किया गया है।

**ऊपर इसका भी दस्तावेज़ीकरण नहीं किया गया है** (परामर्शात्मक, कम संकेत): `docs-lint` जॉब
(markdownlint + Vale, पूरे जॉब पर `continue-on-error`) और स्वतंत्र स्कैनर वर्कफ़्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`
`quality-baseline.json` में है, लेकिन `ci.yml` में इसे किसी ब्लॉकिंग रैचेट से नहीं जोड़ा गया है — यह मेट्रिक
फ़िलहाल अनाथ है।

### मर्ज / डिडुप्लिकेशन (यांत्रिक, कम जोखिम)

प्रत्येक उम्मीदवार को 2026-06-17 की लाइव गेट स्थिति के विरुद्ध सत्यापित किया गया था (भरोसा करें, लेकिन सत्यापित भी करें);
कई "स्पष्ट" मर्ज वास्तव में छिपे हुए तकनीकी ऋण वाले निकले और वे **साफ़-सुथरे** ड्रॉप-इन नहीं हैं।

- **`check:docs-sync` दो बार चलता है** — `lint` जॉब में स्वतंत्र रूप से और फिर `check:docs-all` (`docs-sync-strict`) तथा husky pre-commit हुक के भीतर। ✅ **पूर्ण** — स्वतंत्र `lint` इनवोकेशन हटा दिया गया।
- **CVE स्कैनिंग** — ❌ **साफ़-सुथरा मर्ज नहीं है।** `audit:deps` किसी भी उच्च/गंभीर CVE पर हार्ड-फेल होता है; `check:vuln-ratchet` (osv) केवल बेसलाइन की तुलना में किसी _प्रतिगमन_ पर विफल होता है (वर्तमान में 1 MODERATE)। अर्थ-विज्ञान अलग हैं — `audit:deps` हटाने से पूर्ण उच्च/गंभीर गेट समाप्त हो जाएगा। दोनों को बनाए रखें।
- **चक्र पहचान** — ❌ **साफ़-सुथरा मर्ज नहीं है।** `check:circular-deps` (dpdm) **91 चक्रों** की रिपोर्ट करता है (इसीलिए यह परामर्शात्मक है); पहले उन्हें हल किए बिना इसे ब्लॉकिंग में प्रोमोट नहीं किया जा सकता, और इसका दायरा हरे, चयनित `check:cycles` से व्यापक है। `check:cycles` को ब्लॉकिंग बनाए रखें; 91 dpdm चक्रों का समाधान स्वयं में एक अलग बैकलॉग है।
- **जटिलता** — ✅ **पूर्ण** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint वॉक, ruleId के अनुसार गणना करता है ताकि cyclomatic+max-lines और cognitive बेसलाइन स्वतंत्र रहें; अलग-अलग `check:complexity` / `check:cognitive-complexity` स्थानीय `--update` के लिए बने रहेंगे।
- **`/api` एंटी-हैलुसिनेशन** — ✅ **पूर्ण** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` की एक FS इन्वेंटरी, openapi-routes + docs-symbols अभी भी स्वतंत्र रूप से रिपोर्ट करते हैं; अलग-अलग जाँच स्थानीय रन के लिए बनी रहेंगी।
- **`check:node-runtime` 11 जॉब में चलता है** — ⚠️ **कम ROI।** प्रत्येक एक अलग रनर है और जाँच <1s लेती है; सस्ती प्रति-जॉब सुरक्षा खोने के बदले कुल बचत ~10s है। इस बदलाव की उठापटक उचित नहीं है।
- **CI lint पर `typecheck:noimplicit:core`** — ✅ **lint जॉब से हटा दिया गया** (यह परामर्शात्मक `continue-on-error` था); ब्लॉकिंग टाइप सतह `typecheck:core` + `check:type-coverage` है। स्थानीय स्क्रिप्ट बरकरार रखी गई।

### फ्लिप / निर्णय (ऑपरेटर नीति)

- `check:openapi-security-tiers` (परामर्शात्मक) — ❌ **साफ़-सुथरे ढंग से फ्लिप नहीं किया जा सकता।** यह 0 के साथ बाहर निकलता है, लेकिन चेतावनी देता है कि `LOCAL_ONLY_API_PREFIXES` के अंतर्गत कई `traffic-inspector` रूट में `x-loopback-only: true` एनोटेशन नहीं है। इसे लागू करने के लिए पहले उन एनोटेशन को `openapi.yaml` में जोड़ना आवश्यक है।
- `typecheck:noimplicit:core` (परामर्शात्मक) — इसे ब्लॉकिंग `check:type-coverage` रैचेट बड़े पैमाने पर समाहित करता है। इसे रैचेट में फ्लिप करें या अनावश्यक दूसरे `tsc` पास को हटा दें।
- `test:vitest:ui` (अब **ब्लॉकिंग**) — पहले से मौजूद विफलताओं को `vitest.config.ts` में `// #8618` ट्रैकिंग टिप्पणियों के साथ स्पष्ट रूप से बाहर रखा गया है; नई विफलताओं से जॉब विफल होगा।
- `check:secrets` (gitleaks, 3 दस्तावेज़ीकृत false-positive पर स्थिर किया गया ब्लॉकिंग रैचेट) — 0 तक पहुँचने के लिए उन 3 को allowlist करें, या इसे परामर्शात्मक में डिमोट करें। यह GitHub की मूल secret-scanning + `check:public-creds` के साथ ओवरलैप करता है।
- `check:pr-evidence` (ब्लॉकिंग, PR-body गद्य को grep करता है) — false-positive का उच्च जोखिम; इसे हटाने से कठोर नियम #18 का प्रवर्तन कमज़ोर होता है, इसलिए यह वास्तव में नीतिगत निर्णय है।
- `semgrep` (परामर्शात्मक स्वतंत्र जाँच) — OWASP परिवारों के लिए CodeQL के साथ ओवरलैप करता है; इसकी बेसलाइन को किसी रैचेट से जोड़ें या इसे हटा दें।

---

## संबंधित दस्तावेज़

- सप्लाई-चेन (उद्गम, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — कुंजी-समुच्चय समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, जॉब `i18n-ui-coverage`)।
यह प्रत्येक `src/i18n/messages/<locale>.json` के लीफ़ कुंजी-समुच्चय की तुलना `en.json` से करता है और
कोई भी लीफ़ अनुपस्थित या अतिरिक्त होने पर विफल हो जाता है, भले ही कुंजी कब जोड़ी गई हो। `__MISSING__:`
प्लेसहोल्डर उपस्थित माने जाते हैं (उनकी सामग्री अनुपात गेट का विषय है)। यह दो
डिफ़-आधारित/प्रतिशत गेटों का पूर्ण पूरक है: `check-ui-keys-coverage` प्रत्येक
लोकेल के लिए न्यूनतम 80 % लागू करता है (~13,000 में से 43 अनुपस्थित कुंजियाँ होने पर भी 99.7 % दिखता है) और `check-new-key-coverage`
केवल उन कुंजियों का आकलन करता है जिन्हें कोई PR `en.json` में जोड़ता है। किसी लोकेल बैच को उस दिन के `en.json` से जनरेट किया जाता है
जिस दिन उसकी ब्रांच बनाई जाती है, और वह कई दिनों तक अनुवाद करता रहता है जबकि बेस में नई कुंजियाँ जुड़ती रहती हैं; बैच PR स्वयं
कोई कुंजी नहीं जोड़ता, इसलिए जब बैच 1 (#13044) नौ लोकेल में 43 कुंजियाँ कम लेकर
और बैच 2 (#13660) आठ लोकेल में 10 कुंजियाँ कम लेकर मर्ज हुए (2026-09-15), तब दोनों संबंधित गेट मौन रहे। विफलता को ठीक करने के लिए
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` चलाएँ; कोई `extra` लीफ़
यह दर्शाता है कि स्रोत ने उसे हटा दिया है — उसे लोकेल से हटाएँ। `--warn` विफल हुए बिना रिपोर्ट करता है।
`--catalog=cli`, `bin/cli/locales` पर वही तुलना चलाता है (`npm run i18n:check-keys:cli`);
दोनों चरण जॉब `i18n-ui-coverage` में हैं।

#### `check-new-key-coverage` — नई-कुंजी i18n गेट

`check-ui-value-drift` का संबंधित गेट। वह ऐसी अंग्रेज़ी वैल्यू पकड़ता है जिसे **फिर से लिखा गया**
लेकिन जिसके अनुवाद पीछे छूट गए; यह ऐसी अंग्रेज़ी कुंजी पकड़ता है जिसे **जोड़ा गया**
लेकिन जिसे कुछ लोकेल ने कभी प्राप्त नहीं किया।

`check-ui-keys-coverage` इस श्रेणी को नहीं देख सकता: यह प्रत्येक लोकेल के लिए प्रतिशत की न्यूनतम सीमा लागू करता है, और
~13,000 में से ग्यारह अनुपस्थित कुंजियाँ होने पर कवरेज 99.9% रहता है। प्रति भाषा कोई प्रतिशत
यह व्यक्त नहीं कर सकता कि "यह फ़ीचर बिना अनुवाद के जारी हुआ" — किसी नए लोकेल में पूरा फ़ीचर बिना किसी
टेक्स्ट के आ सकता है और संख्या में कोई बदलाव नहीं होगा।

वह घटना जिसे यह निरूपित करता है: Orchestration Canvas के Phase 3 ने अपनी ग्यारह कुंजियों का
उस समय मौजूद 42 लोकेल में अनुवाद किया। कुछ घंटों बाद EU-भाषा बैच (#13044) ने रेपो में
लोकेल की संख्या 51 कर दी, और नौ नए लोकेल (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ने उन्हें कभी
प्राप्त नहीं किया। किसी अनुपस्थित कुंजी के लिए `deepMergeFallback` अंग्रेज़ी का उपयोग करता है, इसलिए विफलता के परिणामस्वरूप
रिक्त UI के बजाय अनुवाद-रहित UI दिखा — यह वास्तविक था और संरचनागत रूप से मौन रहा।

अपने संबंधित गेट की तरह यह भी **डिफ़-सजग** है, जो मर्ज बेस पर अंग्रेज़ी की तुलना कार्यशील
ट्री से करता है, इसलिए पहले से मौजूद अंतर स्थिर रहते हैं और गेट को सक्षम करने के लिए किसी माइग्रेशन की आवश्यकता नहीं पड़ी।

**कोई `__MISSING__:<english>` मार्कर इसकी शर्त पूरी नहीं करता (2026-09-17 से)।** पहले यह
दस्तावेज़ित स्थगन था — रनटाइम सही अंग्रेज़ी पर फ़ॉलबैक करता है — लेकिन 2026-09-16 के आठ फ़ीचर PR ने
61 कुंजियाँ जोड़ीं और अनुवाद करने के बजाय सभी 65 लोकेल में मार्कर लगा दिया: इस
गेट ने उन सभी को स्वीकार कर लिया, किसी भी चीज़ ने PR को नहीं रोका, और फिर अवरोधक वास्तविक-अनुवाद अनुपात गेट
रिलीज़ टिप पर सभी के लिए विफल हो गया (pt-BR 3.2 % > 2.5 % + 0.5)। अब मार्कर को
अनुपस्थित अनुवाद माना जाता है। विफलता को ठीक करने के लिए
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` चलाएँ, या
`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
डिटैच्ड-सुरक्षित, `OMNIROUTE_TRANSLATION_*` env के बिना शुरू होने से इनकार करता है) के साथ सभी लोकेल पर समानांतर रूप से चलाएँ। ऐसी कुंजी जिसे
अंग्रेज़ी में ही रहना चाहिए (कोई पिन किया हुआ उत्पाद/इंजन/फ़्लैग नाम), उसे `scripts/i18n/untranslatable-keys.json` में रखा जाना चाहिए,
किसी मार्कर के पीछे कभी नहीं। `vi` मार्करों को पूरी तरह प्रतिबंधित करता है (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — स्थगित-परीक्षण गेट

`vitest.config.ts` की `exclude` सूची में मौजूद फ़ाइल ऐसा परीक्षण है जो चलता नहीं है, लेकिन ट्री पढ़ने वाले व्यक्ति को वह
कवरेज जैसा दिखता है। बासठ फ़ाइलें इस टिप्पणी के पीछे एकत्र हो गईं:
`// #8618 — pre-existing failure; remove this exclusion when fixed`। Issue #8618 को
2026-08-11 को बंद कर दिया गया, जबकि उसके द्वारा ट्रैक की जाने वाली सूची 45 प्रविष्टियों से बढ़कर 62 हो गई; हर नई प्रविष्टि को
एक बंद हो चुके issue की ओर इंगित करने वाली टिप्पणी विरासत में मिली। जब अंततः सूची को फ़ाइल-दर-फ़ाइल मापा गया (#13204), तो **62 में से 51
फ़ाइलें बिना किसी स्रोत परिवर्तन के वर्तमान ट्री पर सफल रहीं**।

गेट के लिए आवश्यक है कि वास्तविक फ़ाइल में रिज़ॉल्व होने वाला प्रत्येक एक्सक्लूज़न (a) किसी ट्रैकिंग issue का नाम दे और
(b) अपनी मापी गई स्थिति सहित `config/quality/vitest-exclusions.json` में दिखाई दे, ताकि किसी एक्सक्लूज़न को जोड़ना
60-प्रविष्टियों वाली ऐरे में एक और पंक्ति जोड़ने के बजाय किसी समर्पित फ़ाइल में समीक्षा योग्य डिफ़ हो। यह जानबूझकर
एक्सक्लूड किए गए परीक्षणों को दोबारा नहीं चलाता — इसमें ~10 मिनट लगते हैं और यह आवधिक जॉब का कार्य है;
इन्वेंटरी दर्ज करती है कि प्रत्येक को अंतिम बार कब मापा गया था।
