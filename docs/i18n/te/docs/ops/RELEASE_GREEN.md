# Release-Green: keeping the queue and release branch green (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ఇది పరిష్కరించే సమస్య

**పూర్తి గేట్** (`.github/workflows/ci.yml` — యూనిట్ షార్డ్లు, vitest, రాచెట్లు,
`package-artifact`, SonarQube, E2E) **రిలీజ్ PRలో మాత్రమే** (PR → `main`) నడుస్తుంది.
`release/**`ను లక్ష్యంగా చేసుకున్న PRలకు **ఫాస్ట్-గేట్లు** (`quality.yml`: TIA ప్రభావిత పరీక్షలు + టైప్చెక్ + లింట్)
మరియు, కోడ్ మార్పుల కోసం, ఒక **సలహాత్మక** ప్రొడక్షన్ బిల్డ్ అందుతాయి. పర్యవసానంగా: రిలీజ్లో మాత్రమే కనిపించే రెడ్లు
రిలీజ్ బ్రాంచ్లో నిశ్శబ్దంగా పేరుకుపోయి, రిలీజ్ సమయంలో **ఒక్కొక్కటిగా ~40 నిమిషాల లేయర్లుగా
పేలవచ్చు**.

ఆ రెడ్లను **ముందుగానే ఊహించడం** కోసమే "release-green family" ఉంది — పూర్తి గేట్కు సమానమైనదాన్ని
ఏ సమయంలోనైనా **స్థానికంగా / రిలీజ్ వెలుపల** ధ్రువీకరించడం ద్వారా, రిలీజ్ PR తన మొదటి CI రన్లోనే
గ్రీన్గా ఉండేలా చేస్తుంది.

> **రాజీ పడలేని సూత్రం:** ఇందులో ఏదీ కాంట్రిబ్యూటర్ను అడ్డుకోదు. వారి PRను విఫలం చేసే తప్పనిసరి
> చెక్ను మేము జోడించము. **డ్రిఫ్ట్** (రాచెట్లు) అనేది రిలీజ్ సమయంలో మెయింటైనర్ రీబేస్లైన్ చేయాల్సినది —
> అది ఎప్పటికీ కాంట్రిబ్యూటర్కు సంబంధించిన విషయం కాదు. ఏ భాగమూ PRను **మూసివేయదు** (క్రెడిట్ అపహరణ)
> లేదా పాస్ కావడానికి పరీక్షను **బలహీనపరచదు**.

## ఫ్యామిలీ (4 భాగాలు) — మరియు ప్రతి భాగం స్వతంత్రంగా ఎలా నడుస్తుంది

| భాగం                                                                        | అది ఏమిటి                                                                                | ఎప్పుడు నడపాలి                                                           | పరిధి                            |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------- |
| **`/green-prs`** (సొల్యూషన్ A)                                              | **ఓపెన్ PRల క్యూను** మెయింటైనర్ అవసరమైనప్పుడు స్కాన్ చేయడం                               | **స్వతంత్రంగా, క్రమానుగతంగా** — ముఖ్యంగా `/generate-release`కు **ముందు** | మొత్తం PR క్యూ → `release/**`    |
| **`/validate-release-green`** (సొల్యూషన్ C — `npm run check:release-green`) | ధ్రువీకరణ ఇంజిన్: ఒక బ్రాంచ్ లేదా మెర్జ్ అభ్యర్థిపై పూర్తి గేట్ను పునరుత్పత్తి చేస్తుంది | స్వతంత్రంగా, ఏ సమయంలోనైనా                                                | నిర్దిష్ట బ్రాంచ్ లేదా మెర్జ్-PR |
| **`/babysit <PR#>`**                                                        | **ఒక** PR యొక్క **లైవ్ CI**ని గ్రీన్ స్థితికి నడిపిస్తుంది                               | స్వతంత్రంగా, ప్రతి PRకు                                                  | ఒక్క PR                          |
| **`nightly-release-green.yml`** (సొల్యూషన్ D)                               | ఆటోమేటెడ్ నైట్లీ వర్క్ఫ్లో; HARD రెడ్ వచ్చినప్పుడు ఇష్యూ తెరుస్తుంది                     | ఆటోమేటిక్ (cron)                                                         | యాక్టివ్ రిలీజ్ బ్రాంచ్          |

**"ఇది రిలీజ్ల కోసం మాత్రమేనా?" అనే ప్రశ్నకు సంక్షిప్త సమాధానం:** **కాదు.** `/green-prs`ను
**రిలీజ్ల మధ్య, క్రమానుగతంగా** నడపడానికి రూపొందించారు. దాన్ని స్వతంత్రంగా నడపడమే సాధారణ వినియోగం —
రిలీజ్ అనేది దాన్ని నడపడం ద్వారా అత్యధిక విలువ లభించే సందర్భం మాత్రమే.

## PR-నుండి-రిలీజ్ సలహా బిల్డ్

`quality.yml` ఇప్పుడు డ్రాఫ్ట్ కాని కోడ్ PRలు మరియు Mergify క్యూ బ్రాంచ్ల కోసం `Build (advisory)`ను కలిగి ఉంది.
ఇది `ci.yml`లోని ప్రొడక్షన్ బిల్డ్ విధానాన్ని ప్రతిబింబిస్తుంది: Node 24, `npm-ci-retry`,
`check:node-runtime`, మరియు `OMNIROUTE_USE_TURBOPACK=1`తో `npm run build`. ఈ వర్క్ఫ్లోలో
తదుపరి క్వాలిటీ జాబ్ ఏదీ బిల్డ్ ఆర్టిఫ్యాక్ట్ను ఉపయోగించదు కాబట్టి, ఇది ఉద్దేశపూర్వకంగానే దాన్ని
అప్లోడ్ చేయదు. ఒక వారం పాటు స్థిరమైన release-PR రన్ల తర్వాత `continue-on-error`ను తొలగించండి,
తద్వారా ఈ సంకేతం PR-నుండి-రిలీజ్కు బ్లాకింగ్ గేట్గా మారుతుంది.

## పరిష్కారం C — `npm run check:release-green` (ఇంజిన్)

ప్రస్తుత వర్కింగ్ ట్రీపై రిలీజ్కు సమానమైన ధృవీకరణను పునరుత్పత్తి చేసి, ప్రతి వైఫల్యాన్ని వర్గీకరిస్తుంది:

- **HARD** (typecheck, lint లోపాలు, unit, vitest, db-rules, public-creds, ఐచ్ఛిక
  `package-artifact`) → **నిజమైన లోపం**; `exit 1`. సోర్స్ బ్రాంచ్లోనే పరిష్కరించబడుతుంది (TDD, నియమం #18).
- **DRIFT** (eslint **హెచ్చరికలు**, cognitive-complexity, file-size) → సైకిల్లో పేరుకుపోయిన ratchet drift,
  **కాంట్రిబ్యూటర్ తప్పు కాదు**; ఇది కేవలం నివేదించబడుతుంది మరియు **రిలీజ్ సమయంలో మెయింటైనర్ ద్వారా
  తిరిగి baseline చేయబడుతుంది**. Drift **ఎప్పుడూ** exit codeను మార్చదు — కాబట్టి ఇది ఎవరినీ బ్లాక్ చేయదు.

```bash
npm run check:release-green                 # ప్రస్తుత బ్రాంచ్ (వర్కింగ్ ట్రీ)
node scripts/quality/validate-release-green.mjs --json   # నిర్మిత అవుట్పుట్
node scripts/quality/validate-release-green.mjs --quick  # unit+vitestను దాటవేస్తుంది (drift+typecheck+lint మాత్రమే)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifactను కలుపుతుంది (నెమ్మది)
```

నిర్ధారించి **నివేదించడం** మాత్రమే చేస్తుంది (ఆటోమేటిక్ పరిష్కారం లేదు). గ్రీన్ స్థితికి తీసుకెళ్లే ఆర్కెస్ట్రేషన్
`/green-prs` మరియు `/review-prs`లో ఉంటుంది.

## పరిష్కారం A — `/green-prs` (క్యూ స్కాన్)

విధానం (సారాంశం — వివరాల కోసం `green-prs` స్కిల్ను చూడండి):

1. యాక్టివ్ రిలీజ్ బ్రాంచ్కు వ్యతిరేకంగా ఉన్న ఓపెన్ PRల క్యూను **జాబితా చేయండి**.
2. ప్రతి PRను **వర్గీకరించండి** (అనుకూలం / తిరస్కరణకు అర్హం / రచయిత చర్య అవసరం) — తిరస్కరణ/రచయిత చర్య అవసరమైనవి
   **నివేదించబడతాయి, మూసివేయబడవు** (రచయితే నిర్ణయిస్తారు).
3. ప్రతి అనుకూలమైన PR కోసం, ఒక **వేరుచేసిన worktree**లో (నియమం #19), PRను రిలీజ్ tipకు తీసుకువచ్చి
   `npm run check:release-green`ను అమలు చేయండి:
   - **HARD** → సహ-రచయితత్వం ద్వారా **కాంట్రిబ్యూటర్ బ్రాంచ్లోనే** పరిష్కరించండి (రచయిత యొక్క "Merged" స్థితిని కాపాడుతుంది),
     అన్ని HARDలు తొలగిపోయే వరకు మళ్లీ అమలు చేయండి.
   - **DRIFT** → అలాగే వదిలేయండి; రిలీజ్ సమయంలో అది తిరిగి baseline చేయబడుతుంది.
4. PR × (తీర్పు, HARD వైఫల్యాలు, పరిష్కరించబడిందా?, DRIFT, ఇప్పుడు release-greenగా ఉందా?) పట్టికను **నివేదించండి**.

మెర్జ్ చేయకుండానే క్యూను **సిద్ధం చేయగలదు**; స్పష్టంగా అభ్యర్థించినప్పుడు మాత్రమే మెర్జ్ చేస్తుంది — మరియు PRను ఎప్పుడూ మూసివేయదు.

## సిఫార్సు చేసిన అమలు వ్యవధి

- **`/green-prs`ను క్రమానుగతంగా** (ఉదా., వారానికి ఒకసారి) మరియు **`/generate-release`కు ముందు ఎల్లప్పుడూ**
  అమలు చేయండి.
- నిరంతర సంకేతంగా **`nightly-release-green.yml`**ను (పరిష్కారం D) కొనసాగించండి: అది HARD వైఫల్య సమస్యను
  తెరిచినప్పుడు, స్కాన్ చేయాల్సిన సమయం వచ్చినట్లు అర్థం.
- ఒక బ్రాంచ్ లేదా నిర్దిష్ట మెర్జ్ అభ్యర్థిని తనిఖీ చేయడానికి అవసరమైనప్పుడు **`/validate-release-green`**ను ఉపయోగించండి.
- ఒక నిర్దిష్ట PRను లైవ్ CIలో గ్రీన్ స్థితికి తీసుకురావాల్సి ఉన్నప్పుడు **`/babysit <PR#>`**ను ఉపయోగించండి.

## రిలీజ్తో సంబంధం

- `/generate-release` **Phase 0 (pre-flight)**లో ధృవీకరణను పిలుస్తుంది: రిలీజ్ PRను తెరవడానికి ముందు DRIFTను
  తిరిగి baseline చేసి, HARDను పరిష్కరిస్తుంది.
- `/review-prs` మెర్జ్ నిర్ణయ దశలో release-green గేట్ను ఉపయోగిస్తుంది (మెర్జ్కు ముందు గ్రీన్).

అన్ని భాగాల లక్ష్యం ఒకటే: రిలీజ్ రోజున 40-నిమిషాల పొరల్లో వైఫల్యాలను వెంబడించడానికి బదులుగా,
**మొదటి CI రన్లోనే గ్రీన్గా ఉండే రిలీజ్ PR**.
