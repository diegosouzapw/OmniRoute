# Release-Green: keeping the queue and release branch green (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## यसले समाधान गर्ने समस्या

**पूर्ण गेट** (`.github/workflows/ci.yml` — युनिट शार्डहरू, vitest, र्याचेटहरू,
`package-artifact`, SonarQube, E2E) **रिलिज PR मा मात्र** (PR → `main`) चल्छ। `release/**`
लाई लक्षित गर्ने PR हरूले **फास्ट-गेटहरू** (`quality.yml`: TIA-प्रभावित परीक्षणहरू + टाइपचेक + लिन्ट)
र, कोड परिवर्तनहरूका लागि, एउटा **सल्लाहकारी** प्रोडक्सन बिल्ड प्राप्त गर्छन्। परिणामस्वरूप: रिलिजमा मात्र देखिने रातो अवस्था
रिलिज ब्रान्चमा चुपचाप जम्मा हुन सक्छ र रिलिजको समयमा **एक-एक गर्दै ~40 मिनेटका तहहरूमा विस्फोट हुन सक्छ**।

"release-green परिवार" ती रातो अवस्थाहरूलाई **पहिल्यै अनुमान गर्न**का लागि छ — पूर्ण गेटको समकक्षलाई
**स्थानीय रूपमा / रिलिजबाहिर**, जुनसुकै समयमा प्रमाणित गर्न, ताकि रिलिज PR आफ्नो पहिलो CI रनमै
हरियो होस्।

> **अपरिवर्तनीय सिद्धान्त:** यसमध्ये कुनै पनि कुराले योगदानकर्तालाई अवरुद्ध गर्दैन। हामी उनीहरूको PR असफल बनाउने कुनै आवश्यक
> जाँच थप्दैनौँ। **ड्रिफ्ट** (र्याचेटहरू) रिलिजको समयमा मेन्टेनरले पुनः आधाररेखा निर्धारण गर्नका लागि हो —
> यो कहिल्यै योगदानकर्ताको सरोकार होइन। कुनै पनि अंशले PR **बन्द गर्दैन** (श्रेय चोरी) न त
> पास गराउन परीक्षणलाई **कमजोर बनाउँछ**।

## परिवार (4 अंशहरू) — र प्रत्येक कसरी स्वतन्त्र रूपमा चल्छ

| अंश                                                                      | यो के हो                                                                            | कहिले चलाउने                                                                 | दायरा                              |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------- |
| **`/green-prs`** (समाधान A)                                              | मेन्टेनरद्वारा **खुला PR हरूको पङ्क्ति** को मागअनुसार स्क्यान                       | **स्वतन्त्र रूपमा, आवधिक रूपमा** — र विशेष गरी `/generate-release` चलाउनुअघि | सम्पूर्ण PR पङ्क्ति → `release/**` |
| **`/validate-release-green`** (समाधान C — `npm run check:release-green`) | प्रमाणीकरण इन्जिन: कुनै ब्रान्च वा मर्ज उम्मेदवारविरुद्ध पूर्ण गेट पुनरुत्पादन गर्छ | स्वतन्त्र रूपमा, जुनसुकै समयमा                                               | कुनै निश्चित ब्रान्च वा मर्ज-PR    |
| **`/babysit <PR#>`**                                                     | **एउटा** PR को **लाइभ CI** लाई हरियो अवस्थासम्म पुर्याउँछ                           | स्वतन्त्र रूपमा, प्रत्येक PR का लागि                                         | एउटा PR                            |
| **`nightly-release-green.yml`** (समाधान D)                               | स्वचालित रात्रिकालीन कार्यप्रवाह; HARD रातो अवस्थामा इस्यु खोल्छ                    | स्वचालित (cron)                                                              | सक्रिय रिलिज ब्रान्च               |

**"के यो रिलिजहरूका लागि मात्र हो?" को छोटो उत्तर:** **होइन।** `/green-prs` लाई
**रिलिजहरूबीच, आवधिक रूपमा** चलाउन डिजाइन गरिएको थियो। यसलाई स्वतन्त्र रूपमा चलाउनु सामान्य प्रयोग हो —
रिलिज त केवल त्यो क्षण हो जतिबेला यसलाई चलाउँदा सबैभन्दा धेरै लाभ मिल्छ।

## PR-देखि-release परामर्शात्मक build

`quality.yml` मा अब non-draft code PR हरू र Mergify queue branch हरूका लागि `Build (advisory)` समावेश छ।
यसले `ci.yml` को production build recipe अनुकरण गर्छ: Node 24, `npm-ci-retry`,
`check:node-runtime`, र `OMNIROUTE_USE_TURBOPACK=1` सहित `npm run build`। यस workflow मा कुनै पनि downstream quality job ले build artifact प्रयोग नगर्ने भएकाले यसले जानाजानी
build artifact upload गर्दैन।
एक हप्तासम्म स्थिर release-PR run भएपछि `continue-on-error` हटाउनुहोस्, ताकि यो signal एउटा
blocking PR-to-release gate बनोस्।

## समाधान C — `npm run check:release-green` (engine)

हालको working tree विरुद्ध release-समान validation पुनःउत्पादन गर्छ र प्रत्येक असफलतालाई वर्गीकरण गर्छ:

- **HARD** (typecheck, lint error, unit, vitest, db-rules, public-creds, वैकल्पिक
  `package-artifact`) → **वास्तविक defect**; `exit 1`। source branch मै समाधान गरिन्छ (TDD, नियम #18)।
- **DRIFT** (eslint **warning**, cognitive-complexity, file-size) → cycle मा जम्मा भएको ratchet drift,
  **contributor को गल्ती होइन**; यसलाई केवल report गरिन्छ र **release का बेला maintainer ले rebaseline गर्छन्**।
  Drift ले exit code **कहिल्यै** परिवर्तन गर्दैन — त्यसैले यसले कसैलाई पनि कहिल्यै रोक्दैन।

```bash
npm run check:release-green                 # हालको branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # संरचित output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest छोड्छ (drift+typecheck+lint मात्र)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact समावेश गर्छ (ढिलो)
```

निदान गर्छ र **report** मात्र गर्छ (auto-fix गर्दैन)। fix-to-green orchestration
`/green-prs` र `/review-prs` मा हुन्छ।

## समाधान A — `/green-prs` (queue scan)

प्रक्रिया (सारांश — विवरणका लागि `green-prs` skill हेर्नुहोस्):

1. सक्रिय release branch विरुद्ध open PR हरूको queue को **inventory** तयार गर्नुहोस्।
2. प्रत्येक PR लाई **triage** गर्नुहोस् (viable / reject-worthy / needs-author) — reject/needs-author लाई
   **report गरिन्छ, close गरिँदैन** (author ले निर्णय गर्छन्)।
3. प्रत्येक viable PR का लागि, एउटा **isolated worktree** (नियम #19) मा PR लाई release tip सम्म ल्याउनुहोस् र
   `npm run check:release-green` चलाउनुहोस्:
   - **HARD** → co-authorship मार्फत **contributor को branch मै** समाधान गर्नुहोस् (author को "Merged" status जोगिन्छ),
     सबै HARD हटुन्जेल पुनः चलाउनुहोस्।
   - **DRIFT** → यथावत् छोड्नुहोस्; release का बेला यसलाई rebaseline गरिनेछ।
4. PR × (verdict, HARD failure, fixed?, DRIFT, अहिले release-green?) table **report** गर्नुहोस्।

यसले merge नगरी queue **तयार** गर्न सक्छ; स्पष्ट रूपमा अनुरोध गरिएको अवस्थामा मात्र merge गर्छ — र PR कहिल्यै close गर्दैन।

## सिफारिस गरिएको cadence

- **`/green-prs` आवधिक रूपमा चलाउनुहोस्** (उदाहरणका लागि, साप्ताहिक) र
  `/generate-release` अघि **सधैँ** चलाउनुहोस्।
- **`nightly-release-green.yml`** (समाधान D) लाई निरन्तर signal का रूपमा कायम राख्नुहोस्: यसले
  HARD failure issue खोल्दा scan गर्ने समय भएको हुन्छ।
- कुनै branch वा विशिष्ट merge candidate जाँच्न आवश्यकताअनुसार **`/validate-release-green`** प्रयोग गर्नुहोस्।
- कुनै विशिष्ट PR लाई live CI मा green सम्म पुर्याउनुपर्ने हुँदा **`/babysit <PR#>`** प्रयोग गर्नुहोस्।

## Release सँगको सम्बन्ध

- `/generate-release` ले **Phase 0 (pre-flight)** मा validation call गर्छ: release PR खोल्नुअघि DRIFT लाई rebaseline गर्छ र
  HARD समाधान गर्छ।
- `/review-prs` ले merge निर्णय चरणमा release-green gate प्रयोग गर्छ (green-before-merge)।

सबै अंशहरूको लक्ष्य एउटै हो: release को दिन 40-मिनेटका तहहरूमा failure पछ्याउँदै जानुको सट्टा,
**पहिलो CI run मै green release PR** प्राप्त गर्नु।
