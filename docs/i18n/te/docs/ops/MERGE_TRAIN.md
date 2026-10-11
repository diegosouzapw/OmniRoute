# Merge Queue & Manual Merge-Train Runbook (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 నుండి (నాణ్యత/వేగ ప్రణాళికలోని WS3.2/WS3.4), సమీక్షించబడిన PRలను
`release/vX.Y.Z`లో విలీనం చేయడానికి డిఫాల్ట్ మార్గం **Mergify విలీన క్యూ** (`.mergify.yml`);
క్రింద డాక్యుమెంట్ చేసిన **మాన్యువల్ విలీన-ట్రైన్** అనేది ప్రత్యామ్నాయ మార్గం — ఘటనల సమయంలో,
రిలీజ్ ఫ్రీజ్ల సమయంలో, లేదా Mergify Open Source ప్లాన్ ఎప్పుడైనా మారితే దీన్ని ఉపయోగించాలి.

## డిఫాల్ట్ మార్గం: Mergify క్యూ

1. PRను క్యాంపెయిన్లు సమీక్షించి/గ్రీన్గా నిర్ధారిస్తాయి మరియు యజమాని యొక్క ప్రీ-మెర్జ్ ⭐
   గేట్ ద్వారా ఆమోదిస్తాయి (నివేదిక + ప్రతి అంశంపై నిర్ణయం — `/merge-prs` దశ 0.75 చూడండి).
2. యజమాని (లేదా యజమాని నిర్ణయం తరఫున పనిచేస్తున్న సెషన్) **`queue`**
   లేబుల్ను వర్తింపజేస్తారు. ఆ లేబులే మెర్జ్ ఆమోదం; Mergify దానిని అమలు చేయడం మాత్రమే చేస్తుంది.
3. Mergify క్యూ చేసిన PRలను ఫాస్ట్-గేట్లకు అనుగుణంగా **వరుసగా** (ఒకేసారి ఒకదాన్ని)
   ధ్రువీకరించి, మెర్జ్ చేస్తుంది (squash). బ్యాచింగ్ + స్వయంచాలక బైసెక్షన్ అనేది చెల్లింపు Mergify టైర్
   (ఉచిత ప్లాన్లో "Cannot use Merge Queue batch", #7220), కాబట్టి `.mergify.yml`లో
   `batch_size` సెట్ చేయబడదు; బ్యాచింగ్ అనేది దిగువనున్న మాన్యువల్ మెర్జ్-ట్రెయిన్ బాధ్యతగానే ఉంటుంది. ఏదైనా PR యొక్క
   తనిఖీలు `checks_timeout` (240 నిమి = `quality.yml`లో కొలిచిన p95కు 2×) తర్వాత కూడా పెండింగ్లో ఉంటే,
   క్యూ నిలిచిపోకుండా ఆ PRను క్యూ నుంచి తొలగిస్తారు.
4. మెర్జ్ తర్వాత, నిరంతర రిలీజ్-గ్రీన్ వర్క్ఫ్లో పుష్పై కొత్త టిప్ను ధ్రువీకరిస్తుంది
   మరియు ఆ కలయికలో రిగ్రెషన్ ఏర్పడితే అట్రిబ్యూషన్ ఇష్యూను తెరుస్తుంది (ఎప్పుడూ స్వయంచాలకంగా రివర్ట్ చేయదు).

రక్షణ నియమాలు (`CLAUDE.md`లోని కఠిన నియమాలు #21/#22కు ప్రతిరూపం):

- **రిలీజ్ ఫ్రీజ్ అమల్లో ఉంది** → ఫ్రీజ్ చేసిన బ్రాంచ్ను లక్ష్యంగా చేసుకున్న PRలకు లేబుల్ వర్తింపజేయవద్దు; ముందుగా
  సక్రియ `release/vX+1`కు రీటార్గెట్ చేయండి.
- **మరొక సెషన్కు చెందిన ప్రాసెస్లో ఉన్న PR** → దానికి ఎప్పుడూ లేబుల్ వర్తింపజేయవద్దు; యాజమాన్య సెషన్ మాత్రమే
  తన స్వంత పనిని క్యూలో ఉంచుతుంది.
- పరీక్షలకు మాత్రమే సంబంధించిన డిఫ్లు మరియు `hotfix` లేబుల్ ఉన్న PRలు ఇప్పటికే తగ్గించిన CIని అమలు చేస్తాయి (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane చూడండి); వాస్తవంగా అమలైన తనిఖీల సమితి ఏదైనా
  క్యూ షరతులు దాన్ని అంగీకరిస్తాయి (`#check-failure=0` + `#check-pending=0`).

## ప్రత్యామ్నాయం: మాన్యువల్ విలీన-ట్రైన్

క్యూ అందుబాటులో లేనప్పుడు ఉపయోగించాలి. ఇది v3.8.47 చక్రంలో ఒకే రోజులో 33 PRలను
పూర్తి చేసిన పద్ధతిని ప్రమాణీకరిస్తుంది:

1. **బ్యాచ్ను సమీకరించండి** (సమీక్షించి+ఆమోదించిన దాదాపు 10–30 PRలు). `linked:` ఘర్షణలను
   (ఒకే `tap.testFiles`, ఒకే CHANGELOG భాగాలు) తనిఖీ చేసి, వాటిని వరుసగా ప్రాసెస్ చేయండి.
2. **ఒక్కసారి మాత్రమే ధృవీకరించండి**: release tip ఆధారంగా వేరుచేసిన worktreeలో బ్యాచ్కు చెందిన అన్ని
   headలను స్థానికంగా విలీనం చేసి, ఆపై రిలీజ్కు సమానమైన సూట్ను అమలు చేయండి
   (`npm run check:release-green`, రిలీజ్కు ముందు `--with-build` జోడించండి).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2 దశలను ఆటోమేట్ చేస్తుంది (ఘర్షణ పడే
   PRలు బయటకు పంపబడతాయి, ట్రైన్ కొనసాగుతుంది). పూర్తి మోడ్ `npm run test:unit`ను అమలు చేస్తుంది —
   బాక్స్కు ట్యూన్ చేసిన రన్నర్ (`--test-concurrency=20`), **రెండు వరుస 4-core CI
   shardలు కాదు**; అవి 16-core బాక్స్లో ప్రధాన దశను సుమారు 25% వినియోగంతో నడిపించాయి (పరిష్కరించిన తేదీ
   2026-07-18). `--fast` (ఒకే రోజులో mega-train ఖాళీ చేయడం, 2026-07-18న ఓనర్ ఆమోదించారు)
   ప్రతి static gate + vitestను ఉంచుతుంది, కానీ ట్రైన్లో చేరిన PRలు మార్చిన node:test ఫైళ్లను మాత్రమే
   అమలు చేస్తుంది; సమీకరించిన tipపై పూర్తి సూట్ను ఇప్పటికీ రోజుకు కనీసం ఒక్కసారైనా
   అమలు చేయాలి (`--fast` లేకుండా ఒక ట్రైన్).
3. **గ్రీన్** → PRలను వరుసగా విలీనం చేయండి (ప్రతి దానికి ముందు `state,headRefOid`ను మళ్లీ తనిఖీ చేస్తూ —
   head మారిన PR మళ్లీ సమీక్షలోకి ప్రవేశిస్తుంది). ప్రతి విలీనం యొక్క నికర diff ఆ
   PRకు చెందిన మార్పేనని నిరూపించండి (స్వయంచాలకంగా resolve చేసిన revertలు వద్దు: పరిధికి వెలుపలి
   తొలగింపుల కోసం `git diff --stat`ను ఆడిట్ చేయండి).
4. **రెడ్** → ఒక్కొక్కటిగా మళ్లీ ధృవీకరించడానికి బదులుగా బ్యాచ్ను సగాలుగా ద్విభజన చేయండి
   (ప్రతి సగాన్ని ధృవీకరించండి); సమస్యాత్మక PRను ఆధారాలతో తిరిగి సమీక్ష క్యూలో ఉంచండి.
5. **ఎప్పుడూ చేయకూడనివి**: ఫ్రీజ్ సమయంలో ఫ్రీజ్ చేసిన బ్రాంచ్లో విలీనం చేయడం; ఎక్కడైనా `git stash`
   ఉపయోగించడం; రెడ్ స్థితి పోతుందనే ఆశతో CI మొత్తాన్ని మళ్లీ అమలు చేయడం (నియమం: రెడ్ అనేది సమాచారం).

## స్థరీకరణ (ఫాస్ట్-గేట్లతో మాత్రమే క్యూ ఎందుకు సురక్షితం)

- **ప్రతి PRకు** (quality.yml ఫాస్ట్-గేట్లు): TIA ప్రభావిత పరీక్షలు + పూర్తి unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog సమగ్రత.
- **ప్రతి బ్యాచ్/tipకు** (నిరంతర release-green): release బ్రాంచ్కు చేసే ప్రతి pushపై `--quick` HARD
  గేట్లు; రోజుకు 3× పూర్తి `--with-build --full-ci` స్వీప్లు.
- **ప్రతి రిలీజ్కు** (రిలీజ్ PRపై ci.yml): E2E ×9తో సహా పూర్తి matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

ఇంతకు ముందు కంటే ఏదీ తక్కువగా ధృవీకరించబడదు — భారీ ఉపరితలం ప్రతి PRకు బదులుగా ప్రతి బ్యాచ్/tipకు
అమలవుతుంది; ఇదే O(N) రౌండ్-ట్రిప్లను తొలగిస్తుంది.

## `merge-train.sh` కోసం తాజా-checkout ముందస్తు అవసరాలు

పాడైన install ఎప్పటికీ రెడ్ ట్రైన్గా కనిపించకుండా ఉండేందుకు, స్క్రిప్ట్ ఏదైనా worktree
పని ప్రారంభించే ముందు root checkoutపై వైఫల్యం సంభవించగానే ఆగిపోయే **preflight**ను అమలు చేస్తుంది:

1. `npm ci`, ఆపై npm నిరోధించే `bun` postinstallను అమలు చేయండి:
   `(cd node_modules/bun && node install.js)` — లేకపోతే `check:provider-consistency`
   మరియు `check:known-symbols` (రెండూ `bun scripts/…`) ఉల్లంఘన లైన్ లేకుండానే ట్రైన్పై మరియు baseపై
   విఫలమవుతాయి.
2. అనవసరమైన `node_modules/node_modules` ఉండకూడదు (ఇది duplicate dependency tree; React రెండుసార్లు
   లోడ్ అవుతుంది మరియు UI vitest సూట్లు వెంటనే విఫలమవుతాయి).
3. `node_modules/.bin/tsc` ఉండాలి మరియు అమలు చేయగలిగేలా ఉండాలి (పాక్షిక installలో అది ఉండదు).

ట్రైన్ తప్పనిసరి `npm run check:cycles:ratchet`ను అమలు చేస్తుంది; సాధారణ `npm run check:cycles`
సూచనాత్మకమైనది (ఇది SCCలను జాబితా చేసి, ఆరోగ్యకరమైన baseపై కూడా non-zeroతో నిష్క్రమిస్తుంది).
