# Merge Queue & Manual Merge-Train Runbook (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

నాణ్యత/వేగ ప్రణాళికలోని v3.8.49 (WS3.2/WS3.4) నుండి, సమీక్షించబడిన PRలను
`release/vX.Y.Z`లో విలీనం చేయడానికి డిఫాల్ట్ మార్గం **Mergify merge queue** (`.mergify.yml`);
క్రింద డాక్యుమెంట్ చేసిన **manual merge-train** అనేది FALLBACK — సంఘటనలు,
రిలీజ్ ఫ్రీజ్లు లేదా Mergify Open Source ప్లాన్ ఎప్పుడైనా మారితే దీనిని ఉపయోగిస్తారు.

## డిఫాల్ట్ మార్గం: Mergify క్యూ

1. PRను క్యాంపెయిన్లు సమీక్షించి/గ్రీన్ చేసి, యజమాని యొక్క ప్రీ-మెర్జ్ ⭐
   గేట్ ఆమోదిస్తుంది (రిపోర్ట్ + ప్రతి అంశానికి నిర్ణయం — `/merge-prs` దశ 0.75 చూడండి).
2. యజమాని (లేదా యజమాని నిర్ణయం ఆధారంగా పనిచేస్తున్న సెషన్) **`queue`**
   లేబుల్ను వర్తింపజేస్తారు. ఆ లేబులే మెర్జ్ ఆమోదం; Mergify దాన్ని అమలు మాత్రమే చేస్తుంది.
3. Mergify క్యూలోని గరిష్ఠంగా 10 PRలను బ్యాచ్గా చేసి, ఆ బ్యాచ్ను fast-gatesతో ధృవీకరించి,
   విలీనం చేస్తుంది (squash). రెడ్ బ్యాచ్ **స్వయంచాలకంగా రెండుగా విభజించబడుతుంది** — సమస్యాత్మక PR
   సుమారు log2(N) పునఃధృవీకరణల్లో వేరుచేయబడి క్యూ నుండి తొలగించబడుతుంది; మిగిలినవి కొనసాగుతాయి.
4. మెర్జ్ తర్వాత, continuous release-green workflow పుష్ సమయంలో కొత్త tipను ధృవీకరిస్తుంది
   మరియు ఆ కలయికలో రిగ్రెషన్ ఏర్పడితే attribution issueను తెరుస్తుంది (ఎప్పటికీ స్వయంచాలకంగా revert చేయదు).

రక్షణ నియమాలు (`CLAUDE.md` Hard Rules #21/#22కు సమానమైనవి):

- **Release freeze తెరిచి ఉంది** → ఫ్రీజ్ చేసిన బ్రాంచ్ను లక్ష్యంగా చేసుకున్న PRలకు లేబుల్ వేయవద్దు;
  ముందుగా సక్రియ `release/vX+1`కు retarget చేయండి.
- **మరొక సెషన్కు చెందిన ప్రోగ్రెస్లో ఉన్న PR** → దానికి ఎప్పుడూ లేబుల్ వేయవద్దు; దాని యజమాని సెషన్ మాత్రమే
  తన స్వంత పనిని క్యూలో ఉంచాలి.
- కేవలం టెస్ట్లకు సంబంధించిన diffలు మరియు `hotfix` లేబుల్ ఉన్న PRలు ఇప్పటికే తగ్గించిన CIని అమలు చేస్తాయి (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane చూడండి); వాస్తవంగా అమలైన ఏ check setనైనా
  క్యూ షరతులు అంగీకరిస్తాయి (`#check-failure=0` + `#check-pending=0`).

## ప్రత్యామ్నాయం: manual merge-train

క్యూ అందుబాటులో లేనప్పుడు దీనిని ఉపయోగిస్తారు. v3.8.47 చక్రంలో ఒకే రోజులో 33 PRలను
పూర్తి చేసిన పద్ధతిని ఇది నియమబద్ధం చేస్తుంది:

1. **బ్యాచ్ను సమీకరించండి** (సుమారు 10–30 సమీక్షించబడిన+ఆమోదించబడిన PRలు). `linked:` ఘర్షణలను
   (ఒకే `tap.testFiles`, ఒకే CHANGELOG భాగాలు) తనిఖీ చేసి, వాటిని క్రమానుసారంగా అమలు చేయండి.
2. **ఒక్కసారే ధృవీకరించండి**: రిలీజ్ tip ఆధారంగా ఒక ప్రత్యేక worktreeలో, అన్ని బ్యాచ్
   headలను స్థానికంగా మెర్జ్ చేసి, ఆపై రిలీజ్కు సమానమైన suiteను అమలు చేయండి
   (`npm run check:release-green`; రిలీజ్కు ముందు `--with-build`ను జోడించండి).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2 దశలను స్వయంచాలకం చేస్తుంది (ఘర్షణపడే
   PRలు బయటకు పంపబడతాయి, train కొనసాగుతుంది). పూర్తి మోడ్ `npm run test:unit`ను అమలు చేస్తుంది —
   అది బాక్స్కు అనుకూలీకరించిన runner (`--test-concurrency=20`), **రెండు వరుస 4-core CI
   shardలు కాదు**; అవి 16-core బాక్స్లో ప్రధాన దశను సుమారు 25% వినియోగంతో నడిపాయి (దీనిని
   2026-07-18న పరిష్కరించారు). `--fast` (ఒకే రోజులో mega-trainలను ఖాళీ చేయడానికి, యజమాని ఆమోదం
   2026-07-18) ప్రతి static gate + vitestను ఉంచుతుంది, కానీ ఎక్కించిన PRలు మార్చిన
   node:test ఫైళ్లను మాత్రమే అమలు చేస్తుంది; సమీకరించిన tipపై FULL suiteను ఇప్పటికీ రోజుకు కనీసం
   ఒక్కసారైనా అమలు చేయాలి (`--fast` లేకుండా ఒక train).
3. **గ్రీన్** → PRలను క్రమానుసారంగా మెర్జ్ చేయండి (ప్రతిదానికి ముందు `state,headRefOid`ను మళ్లీ
   తనిఖీ చేస్తూ — head మారిన PR మళ్లీ సమీక్షలోకి వెళ్తుంది). ప్రతి మెర్జ్ యొక్క నికర diff,
   ఆ PRకు చెందిన మార్పు మాత్రమేనని నిరూపించండి (auto-resolve revertలు వద్దు: పరిధికి వెలుపల ఉన్న
   తొలగింపుల కోసం `git diff --stat`ను ఆడిట్ చేయండి).
4. **రెడ్** → ఒక్కొక్కటిగా మళ్లీ ధృవీకరించడానికి బదులుగా బ్యాచ్ను సగాలుగా విభజించండి
   (ప్రతి సగాన్ని ధృవీకరించండి); సమస్యాత్మక PRను ఆధారాలతో తిరిగి సమీక్ష క్యూలో ఉంచండి.
5. **ఎప్పుడూ చేయవద్దు**: ఫ్రీజ్ సమయంలో ఫ్రీజ్ చేసిన బ్రాంచ్లోకి మెర్జ్ చేయడం; ఎక్కడైనా
   `git stash` ఉపయోగించడం; రెడ్ పోతుందనే ఆశతో CIని మొత్తంగా మళ్లీ అమలు చేయడం
   (నియమం: రెడ్ అనేది సమాచారం).

## స్థరీకరణ (కేవలం fast-gatesతో క్యూ ఎందుకు సురక్షితం)

- **ప్రతి PRకు** (quality.yml fast-gates): TIA ప్రభావిత టెస్ట్లు + పూర్తి unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog సమగ్రత.
- **ప్రతి batch/tipకు** (continuous release-green): release branchకు ప్రతి pushపై `--quick`
  HARD gates; రోజుకు 3 సార్లు పూర్తి `--with-build --full-ci` sweeps.
- **ప్రతి releaseకు** (release PRపై ci.yml): E2E ×9తో సహా పూర్తి matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

మునుపటి కంటే ఏదీ తక్కువగా ధృవీకరించబడదు — భారీ surface ప్రతి PRకు బదులుగా ప్రతి batch/tipకు
అమలవుతుంది; ఇదే O(N) round-tripలను తొలగిస్తుంది.
