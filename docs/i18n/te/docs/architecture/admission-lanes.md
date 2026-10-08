# Admission lanes (#9654) — two lane systems, what gates each, where each reports (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRouteలో విభిన్న పరిధులు గల **రెండు** ప్రాసెస్-లోకల్ లేన్ వ్యవస్థలు ఉన్నాయి. అవి
పరస్పర పూరకమైనవి; ఆపరేటర్లు తాము దేనిని పరిశీలిస్తున్నారో తెలుసుకోవాలి.

## 1. బైట్-స్థాయి ప్రాసెస్-వ్యాప్త అడ్మిషన్ (`chatBodyAdmission.ts`)

- **పరిధి:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses` మరియు ఇతర చాట్-ఆకారపు రూట్ల కోసం బఫర్ చేసిన-బాడీ/హీప్ మార్గం. పెద్ద కోడింగ్-ఏజెంట్ బాడీల వల్ల ఏర్పడే హీప్ విస్తరణ నుంచి రక్షిస్తుంది (#4380).
- **ప్రతి-కీ లేన్లు కాకుండా, ఒకే ప్రాసెస్-గ్లోబల్ కంట్రోలర్ (#10110).** ప్రతి API కీ (హ్యాష్ చేయబడినది) లేదా `anonymous` సెషన్ **అదే** భాగస్వామ్య బడ్జెట్కు వ్యతిరేకంగా అడ్మిషన్ పొందుతుంది — హ్యాష్ చేసిన సెషన్ id కేవలం న్యాయమైన షెడ్యూలింగ్ కీగా మాత్రమే ఉపయోగించబడుతుంది (వేచి ఉన్నవారి మధ్య రౌండ్-రాబిన్ డిస్పాచ్), సామర్థ్య షార్డ్గా ఎప్పుడూ ఉపయోగించబడదు. ఈ డాక్ యొక్క మునుపటి వెర్షన్ స్వతంత్ర సామర్థ్యం గల ప్రతి-కీ లేన్లను వివరించింది; ప్రామాణీకరించని నకిలీ క్రెడెన్షియల్లు ప్రాసెస్-వ్యాప్త పరిమితిని అనేక రెట్లు పెంచడానికి ఆ మోడల్ అనుమతించినందున, అది #10110లో తొలగించబడింది.
- **గేట్ (#503-fanout): స్థిరమైన రిక్వెస్ట్ సంఖ్య కాదు, స్వయంచాలకంగా ఉత్పన్నమయ్యే ఇన్జెస్ట్ BYTE బడ్జెట్.** లెగసీ `CHAT_MAX_HEAVY_IN_FLIGHT` రిక్వెస్ట్-సంఖ్య పరిమితి (ఈ పరిష్కారానికి ముందు డిఫాల్ట్ `1`) కోడింగ్-ఏజెంట్ ఫ్యాన్-అవుట్ను (అనేక సబ్ఏజెంట్లు/CLIలు, సాధారణంగా > 256 KB ఉండే బాడీలు) సమర్థవంతమైన ~1 సమకాలీనతకు కుదించింది, దాంతో పూర్తిగా సాధారణ లోడ్లోనే 503 ప్రతిస్పందనలు వచ్చేవి. ఇప్పుడు ఆపరేటర్ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`ను స్పష్టంగా సెట్ చేసినప్పుడు మాత్రమే అది పరిమితిని విధిస్తుంది. దాన్ని సెట్ చేయకుండా వదిలేస్తే, అడ్మిషన్ బదులుగా `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ద్వారా గేట్ చేయబడుతుంది — ఇది ప్రాసెస్ యొక్క వాస్తవ మెమరీ గరిష్ఠ పరిమితి నుంచి స్వయంచాలకంగా ఉత్పన్నమయ్యే బడ్జెట్ (`src/shared/middleware/admissionBudget.ts`): V8 హీప్ పరిమితి మరియు ఏదైనా cgroup/container పరిమితిలో మరింత కఠినమైనదాని 25%, దాన్ని 8x తాత్కాలిక-విస్తరణ గుణకంతో భాగించి, 8 MiB మరియు 2 GiB మధ్య క్లాంప్ చేస్తారు. స్పష్టమైన ఓవర్రైడ్లు కూడా అవే క్లాంప్లను ఉపయోగిస్తాయి. env ట్యూనింగ్ ఏదీ లేకుండానే ఇది 512 MB కంటైనర్ నుంచి 32 GB డెస్క్టాప్ వరకు స్వయంగా స్కేల్ అవుతుంది. ప్రభావవంతమైన బడ్జెట్లో సరిపోని బాడీ `413 body_exceeds_budget`తో వెంటనే విఫలమవుతుంది; విడివిడిగా సర్వీస్ చేయగల బాడీల మధ్య పోటీ మాత్రమే పరిమిత న్యాయసమ్మత క్యూలోకి ప్రవేశిస్తుంది. లైవ్ బహుళ-సిగ్నల్ వనరు-ఒత్తిడి ట్రాకర్ (V8 హీప్ నిష్పత్తి, cgroup, PSI, OOM ఈవెంట్లు — `open-sse/utils/resourcePressurePolicy.ts`) `high` ఒత్తిడిలో పరిమిత నిరీక్షణను తగ్గిస్తుంది మరియు ఏ బైట్లనైనా ఇన్జెస్ట్ చేయకముందే `critical` ఒత్తిడిలో `503 resource_pressure`తో వెంటనే లోడ్ను తొలగిస్తుంది. అందుబాటులో ఉన్నప్పుడు PSI ఈ యూనిట్ యొక్క cgroup `memory.pressure` నుంచి చదవబడుతుంది (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` హోస్ట్-వ్యాప్తమైనది మరియు బేర్ మెటల్ / cgroup v1లో మాత్రమే ఫాల్బ్యాక్గా ఉపయోగించబడుతుంది, కాబట్టి స్వాపింగ్ చేస్తున్న హోస్ట్ నిష్క్రియ కంటైనర్కు 503 కలిగించలేదు.
- **ట్యూనింగ్:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — స్వయంచాలకంగా ఉత్పన్నమయ్యే బైట్ బడ్జెట్కు ఓవర్రైడ్
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — లెగసీ రిక్వెస్ట్-సంఖ్య పరిమితి, ఆప్ట్-ఇన్ మాత్రమే
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503కు ముందు క్యూలో నిరీక్షణ (డిఫాల్ట్ `RATE_LIMIT_MAX_WAIT_MS`)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — క్యూలో ఉన్న-బైట్ల హీప్ వాల్వ్ (డిఫాల్ట్ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 నుంచి డిప్రికేట్ చేయబడిన
    no-opలు (కాన్ఫిగ్ అనుకూలత కోసం అంగీకరించబడతాయి, విస్మరించబడతాయి)
- **రిపోర్ట్లు:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanoutలో చేర్చిన `inflightBytes`, `maxInflightBytes`, `budgetSource` (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, మరియు `countCapEnabled` సహా (డిఫాల్ట్ డిప్లాయ్మెంట్లో false — వాస్తవంగా పరిమితిని విధించేది లెగసీ సంఖ్య పరిమితి కాకుండా బైట్ బడ్జెట్ అని నిర్ధారిస్తుంది).

## 2. అనుకూలనీయ రన్టైమ్ వర్చువల్ లేన్లు (`open-sse/services/admission`)

- **పరిధి:** ప్రొవైడర్ డిస్పాచ్ కోసం టెనెంట్-కీ అడ్మిషన్ — క్యూ వ్యయం, లేటెన్సీ-ఆధారిత
  పరిమితి అనుసరణ, లేన్ క్యూయింగ్ మరియు లేన్ మెట్రిక్స్.
- **గేట్:** **ఎంపిక చేసుకుంటేనే ప్రారంభమవుతుంది.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` అయితే తప్ప నిలిపివేయబడి ఉంటుంది. అది లేకుండా,
  అనుకూలనీయ కంట్రోలర్ షేర్డ్ క్యూ ప్రవర్తనను కొనసాగిస్తుంది (#9654లోని ప్రమాణం 1
  ఆపరేటర్ లేన్లను ప్రారంభించిన తర్వాత మాత్రమే వర్తిస్తుంది).
- **ట్యూనింగ్:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + అనుకూలనీయ కాన్ఫిగ్ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **రిపోర్టులు:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (అపారదర్శక లేన్ IDలు, ముడి
  కీలు ఎప్పుడూ కాదు), మరియు `virtualLanes` — స్నాప్షాట్లో "లేన్లు ఆన్లో ఉన్నాయి" అని నిర్ధారించే ప్రామాణిక ఫ్లాగ్.

## 3. ఫ్యాన్-అవుట్ ప్రోబ్లు — కాంబో/ఫ్యూజన్ కోసం ప్రతి టార్గెట్కు అడ్మిషన్ (#9654 Wave 2)

కాంబో (ప్రాధాన్యత / రౌండ్-రాబిన్) మరియు ఫ్యూజన్, ఒక పేరెంట్
రిక్వెస్ట్ కింద N మోడల్ టార్గెట్లకు ఫ్యాన్-అవుట్ చేస్తాయి. #9654 Wave 2 నుండి, **ప్రతి ఫ్యాన్-అవుట్ టార్గెట్ డిస్పాచ్కు ముందు గేట్ చేయబడుతుంది**;
దీని కోసం **పేరెంట్కు చెందిన** టెనెంట్ లేన్పై ప్రతి టార్గెట్ ప్రోబ్ (`PerTargetAdmissionHook`, `createPerTargetAdmissionHook` ద్వారా నిర్మించబడింది)
ఉపయోగించబడుతుంది.

- **పరిధి:** కాంబో, ఫ్యూజన్ మరియు కేయాస్ ఇంజిన్ ద్వారా డిస్పాచ్ చేయబడే ప్రతి ఫ్యాన్-అవుట్ టార్గెట్.
  సిస్టమ్ 1 (బైట్-స్థాయి) ప్రభావితం కాదు — అది ఫ్యాన్-అవుట్ టార్గెట్లను ఎప్పుడూ ప్రోబ్ చేయదు.
- **గేట్:** **సిస్టమ్ 2తో ఎంపిక చేసుకుంటేనే ప్రారంభమవుతుంది.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  సెట్ చేయనప్పుడు ఇది ఎలాంటి చర్యా చేయదు — ఆ మోడ్లో పేరెంట్ రిక్వెస్ట్ ఇప్పటికే షేర్డ్-క్యూ లీజ్ను కలిగి ఉంటుంది,
  కాబట్టి ప్రోబింగ్ చేస్తే రెండుసార్లు లెక్కించి కాంబో టార్గెట్లను తిరస్కరిస్తుంది.
- **సెమాంటిక్స్:**
  - **పూర్తిగా నాన్-బ్లాకింగ్ — దాటవేయాలి, క్యూలో ఎప్పుడూ ఉంచకూడదు.** `maxWaitMs 0`: నిండిన లేన్
    టార్గెట్ను దాటవేస్తుంది; బదులుగా కాంబో యొక్క ఫాల్బ్యాక్ యంత్రాంగం (లేదా ఫ్యూజన్ యొక్క సర్వైవర్
    ప్యానెల్) సేవలందిస్తుంది. ఇది ఉద్దేశపూర్వకమైనది: ఫ్యాన్-అవుట్ టార్గెట్ అనవసరంగా పునరావృతమయ్యే
    పని; దానిని క్యూలో ఉంచడం వల్ల, లేన్లు అడ్డుకోవడానికి ఉద్దేశించిన అదే కంజెషన్పై మరింత లోడ్
    పేరుకుపోతుంది. అందువల్ల `defaultMaxWaitMs` **పేరెంట్ రిక్వెస్ట్కు మాత్రమే** వర్తిస్తుంది;
    ఫ్యాన్-అవుట్ ప్రోబ్లు ఎప్పుడూ వేచి ఉండవు, అలాగే వాటిని వేచి ఉండేలా చేయడానికి ఉద్దేశపూర్వకంగానే
    **ఎలాంటి నాబ్ లేదు** (వేచి ఉండే నాబ్లు భారీ స్థాయి 502/504 సమస్యలను సృష్టించాయని ఇష్యూ చరిత్ర
    చూపిస్తుంది; #9654 వాటినే నివారిస్తుంది — దాటవేయబడిన ఫ్యాన్-అవుట్ టార్గెట్ల వల్ల
    ప్రతిస్పందన నాణ్యత దెబ్బతింటోందని ఆపరేటర్ నివేదిస్తే మాత్రమే పునఃపరిశీలించాలి).
  - **అడ్మిట్ చేసిన వెంటనే విడుదల.** అడ్మిట్ అయిన ప్రోబ్ తన లీజ్ను వెంటనే విడుదల చేస్తుంది: ఇది
    సామర్థ్య గేట్ మాత్రమే, హోల్డ్ కాదు. పేరెంట్ లీజ్ ఫ్యాన్-అవుట్ను కవర్ చేస్తుంది; అదనంగా N
    లీజ్లను హోల్డ్ చేయడం షేర్డ్ యాక్టివ్ వ్యయాన్ని పెంచి ఇతర టెనెంట్లను తిరస్కరిస్తుంది. ఇది
    సాధ్యమైనంత మేరకు చేసే ప్రయత్నం మాత్రమే, రిజర్వేషన్ కాదు: ప్రోబ్ మరియు డిస్పాచ్ మధ్య లేన్ మళ్లీ నిండవచ్చు;
    అందువల్ల భారీ కంటెన్షన్లో, టార్గెట్ డిస్పాచ్ అయ్యే సమయానికి మళ్లీ నిండిపోయిన లేన్లోకి
    గేట్ అడ్మిట్ చేయవచ్చు.
  - **వాస్తవ ఫ్యాన్-అవుట్ బాడీ ఆధారంగా ధర నిర్ణయం.** ప్రోబ్, టార్గెట్ యొక్క
    వాస్తవ బాడీ నుండి వ్యయాన్ని అంచనా వేస్తుంది — పేరెంట్ పాత్లో మాదిరిగానే, దాని `stream`
    ఫ్లాగ్ నుండి ఉత్పన్నమైన రిక్వెస్ట్ క్లాస్తో సహా — కాబట్టి ఫ్యూజన్ ప్యానెల్ సభ్యులకు (`stream: false`)
    అవి వాస్తవంగా ఆక్రమించే నాన్-స్ట్రీమింగ్ క్లాస్ ప్రకారం, అలాగే ప్రాధాన్యత/RR
    టార్గెట్లకు యూజర్ అభ్యర్థించిన దాని ప్రకారం ధర నిర్ణయించబడుతుంది.
- **రిపోర్టులు:** మొదటి టార్గెట్ తర్వాత ప్రోబ్ దాటవేత జరిగితే, కాంబో యొక్క ప్రతి రిక్వెస్ట్కు చెందిన
  `fallbackCount` పెరుగుతుంది (ప్రస్తుత ఫాల్బ్యాక్ సెమాంటిక్స్ను ప్రతిబింబిస్తూ; కాంబో
  లాగ్లలో కనిపిస్తుంది); ప్రతి ప్యానెల్ సభ్యుడు దాటవేయబడితే ఫ్యూజన్ 503ను తిరిగి ఇస్తుంది. ప్రస్తుతం
  స్నాప్షాట్లో **ఎలాంటి సమగ్ర కౌంటర్ లేదు** (ఉదా. `virtualFanoutSkipped`) —
  లేన్ గేట్ ఫ్యాన్-అవుట్ టార్గెట్లను ఎంత తరచుగా దాటవేస్తుందో తెలుసుకోలేకపోతున్నామని
  ఆపరేటర్ నివేదిస్తే, అటువంటి కౌంటర్ను జోడించడానికి అదే ప్రేరకంగా పరిగణించాలి.

## డ్యాష్బోర్డ్లో ఏది కనిపిస్తోంది

- `adaptiveAdmission.laneCount` / `laneTenants` → **అడాప్టివ్ వర్చువల్ లేన్లు** (సిస్టమ్ 2).
- `adaptiveAdmission.virtualLanes === true` → విభాగం 3లోని ఫ్యాన్-అవుట్ ప్రోబ్లు
  కూడా యాక్టివ్గా ఉంటాయి. `virtualLanes` లేని లేదా `false`గా ఉన్న పేలోడ్ అంటే
  `OMNIROUTE_CHAT_VIRTUAL_LANES` సెట్ చేయబడలేదని అర్థం — బైట్-స్థాయి లేన్లు (సిస్టమ్ 1)
  ఇప్పటికీ యాక్టివ్గా ఉంటాయి, కానీ దీన్ని ప్రారంభించే వరకు `adaptiveAdmission` కింద
  ఏదీ (మరియు ఫ్యాన్-అవుట్ గేటింగ్ కూడా) అమల్లో ఉండదు.

## రెండూ ఎందుకు ఉన్నాయి

బైట్-స్థాయి లేన్లు అధిక మెమరీ అవసరమయ్యే పార్స్/కంప్రెస్ పాత్ను పరిమితం చేస్తాయి; అడాప్టివ్ లేన్లు
ప్రతి టెనెంట్కు సంబంధించిన డిస్పాచ్ ఖర్చును పరిమితం చేస్తాయి. #9654 యొక్క ప్రమాణం 1 ("ఒక సెషన్లోని బర్స్ట్
మరోదానికి 503 కలిగించదు") సిస్టమ్ 1 ద్వారా షరతులు లేకుండా, అలాగే ఆప్ట్-ఇన్ ప్రారంభించిన తర్వాత సిస్టమ్ 2 ద్వారా అమలు చేయబడుతుంది.

## 4. ఒకే ప్రాసెస్లో దీర్ఘ `/v1/responses` (ఆరోగ్యకరమైన-హెడ్రూమ్)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ద్వారా
`tryAcquireHealthyHeadroom` జోడించబడింది, తద్వారా హీప్
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` కంటే తక్కువగా ఉన్నప్పుడు నిర్మాణపరంగా భారమైన రెండవ రిక్వెస్ట్ అనుమతించబడుతుంది.
`admitChatRequest` ఉపయోగించే BYTE పాత్ (`OMNIROUTE_CHAT_LARGE_BODY_BYTES`కు సమానమైన లేదా అంతకంటే పెద్ద బాడీలు,
డిఫాల్ట్ 256 KiB, `POST /v1/responses`తో సహా) **అదే** ఎస్కేప్ను ఉపయోగిస్తుంది.

రెండు కంటే ఎక్కువ ఏకకాల దీర్ఘ
SSE `/v1/responses` కోసం మద్దతున్న **ఒకే-ప్రాసెస్** విధానం ఇది: హీప్
మరియు ప్రాసెస్-వ్యాప్త ఇన్ఫ్లైట్-బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) అనుమతించే మేరకు మాత్రమే ప్రైమరీ + ఆరోగ్యకరమైన-హెడ్రూమ్ను పెంచండి. పదుల సంఖ్యలో దీర్ఘ SSE క్లయింట్లు (40–50) అనేది ఆ మెమరీ-బడ్జెట్కు
సంబంధించిన ప్రశ్న, కఠినమైన “గరిష్ఠం 2” ప్రొడక్ట్ పరిమితి కాదు. ఒత్తిడిలో ఉన్న హీప్ ఇప్పటికీ
మళ్లీ ప్రయత్నించదగిన `503`తో లోడ్ను తగ్గిస్తుంది, కాబట్టి #7849 తిరిగి సంభవించదు.

**హీప్లను గుణించడానికి**, N స్వతంత్ర `DATA_DIR`లను అమలు చేయండి (#11024). ఒకే SQLite ఫైల్పై
`replicas > 1`ను ఎప్పుడూ ఉపయోగించవద్దు (#10350). ఈ విభాగం
DATA_DIR స్కేల్-అవుట్ విధానాన్ని మళ్లీ తెరవడం కాదు.
