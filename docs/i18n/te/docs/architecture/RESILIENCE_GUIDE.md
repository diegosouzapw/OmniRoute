# Resilience Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRouteలో మూడు విభిన్నమైన, కానీ పరస్పరం సంబంధిత స్థితిస్థాపకత విధానాలు ఉన్నాయి. ప్రతి దానికీ వేర్వేరు పరిధి మరియు ఉద్దేశ్యం ఉన్నాయి. రూటింగ్ ప్రవర్తనను డీబగ్ చేసేటప్పుడు వాటిని వేర్వేరుగా పరిగణించండి.

![3-లేయర్ స్థితిస్థాపకత నమూనా](../diagrams/exported/resilience-3layers.svg)

> మూలం: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. ప్రొవైడర్ సర్క్యూట్ బ్రేకర్

**పరిధి:** మొత్తం ప్రొవైడర్ (ఉదా., `glm`, `openai`, `anthropic`).

**ఉద్దేశ్యం:** అప్స్ట్రీమ్/సర్వీస్ స్థాయిలో పదేపదే విఫలమవుతున్న ప్రొవైడర్కు ట్రాఫిక్ పంపడాన్ని నిలిపివేయడం.

**అమలు:**

- కోర్ క్లాస్: `src/shared/utils/circuitBreaker.ts`
- వైరింగ్: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- స్థితి API: `GET /api/monitoring/health`
- రీసెట్ API: `POST /api/resilience/reset`
- ర్యాపర్లు: `open-sse/services/accountFallback.ts`
- DB పట్టిక: `domain_circuit_breakers`

**స్థితులు:**

- `CLOSED` — సాధారణ ట్రాఫిక్ అనుమతించబడుతుంది
- `DEGRADED` — ట్రాఫిక్ ఇప్పటికీ అనుమతించబడుతుంది, కానీ పెరిగిన ప్రొవైడర్ వైఫల్యాలు ట్రాక్ చేయబడతాయి
- `OPEN` — ప్రొవైడర్ తాత్కాలికంగా బ్లాక్ చేయబడుతుంది; కాంబో రూటింగ్ దాన్ని దాటవేస్తుంది
- `HALF_OPEN` — రీసెట్ టైమ్అవుట్ ముగిసింది; ప్రోబ్ అభ్యర్థన అనుమతించబడుతుంది

**కాన్ఫిగర్ చేయగల డిఫాల్ట్లు (`open-sse/config/constants.ts`, Dashboard → Settings → Resilienceలో అందుబాటులో ఉంటాయి):**

| క్లాస్  | డీగ్రేడ్ అయ్యేది | ఓపెన్ అయ్యేది | రీసెట్ టైమ్అవుట్ |
| ------- | ---------------- | ------------- | ---------------- |
| OAuth   | 5 వైఫల్యాలు      | 8 వైఫల్యాలు   | 60s              |
| API-key | 7 వైఫల్యాలు      | 12 వైఫల్యాలు  | 30s              |
| లోకల్   | ఉత్పన్నమైనది     | 2 వైఫల్యాలు   | 15s              |

ప్రొవైడర్ `DEGRADED` స్థితిలోకి ఎప్పుడు ప్రవేశించాలో `degradationThreshold` నియంత్రిస్తుంది; అది ఎప్పుడు ఓపెన్ అయి దాటవేయబడాలో `failureThreshold` నియంత్రిస్తుంది. లోకల్ ప్రొవైడర్ ప్రొఫైల్లు ఇంకా Resilience సెట్టింగ్ల పేజీలో అందుబాటులో లేవు.

**ట్రిప్ కోడ్లు:** ప్రొవైడర్-స్థాయి స్థితులు `[408, 500, 502, 503, 504]` మాత్రమే. అకౌంట్-స్థాయి లోపాలకు (చాలా వరకు 401/403/429 — అవి కూల్డౌన్ లేదా లాకౌట్కు సంబంధించినవి) ట్రిప్ చేయవద్దు.

**లేజీ రికవరీ:** `OPEN` గడువు ముగిసినప్పుడు, `getStatus()`, `canExecute()`, `getRetryAfterMs()` స్థితిని `HALF_OPEN`కు రిఫ్రెష్ చేస్తాయి. బ్యాక్గ్రౌండ్ టైమర్ అవసరం లేదు.

---

### ఆప్ట్-ఇన్ గ్లోబల్ ప్రొవైడర్ కూల్డౌన్ (విండో గేట్)

నాలుగవ, **ఆప్ట్-ఇన్** లేయర్ (`PROVIDER_COOLDOWN_ENABLED`, డిఫాల్ట్గా **ఆఫ్**) విఫలమవుతున్న ప్రొవైడర్ల క్రాస్-రిక్వెస్ట్ మెమరీని
`open-sse/services/providerCooldownTracker.ts`లో ఉంచుతుంది. వరుస కాంబో అభ్యర్థనలు ఇప్పుడే
విఫలమైన ప్రొవైడర్ను మళ్లీ మళ్లీ పరిశీలించకుండా ఉండేందుకు, కాంబో టార్గెట్
రిజల్యూషన్ దీన్ని సంప్రదిస్తుంది. ప్రొవైడర్-స్థాయి ఎంట్రీలు `PROVIDER_PROFILES` విండో గేట్ను అనుసరిస్తాయి:

| ప్రొఫైల్ | ఇన్ని వైఫల్యాల తర్వాత ట్రిప్ అవుతుంది (`providerFailureThreshold`) | ఈ వ్యవధిలో (`providerFailureWindowMs`) | ఇంతసేపు కూల్ అవుతుంది (`providerCooldownMs`) |
| -------- | -----------------------------------------------------------------: | -------------------------------------: | -------------------------------------------: |
| OAuth    |                                                               `10` |                                `15min` |                                       `5min` |
| API కీ   |                                                               `15` |                                `30min` |                                      `10min` |

థ్రెషోల్డ్ కంటే తక్కువగా ఉంటే ప్రొవైడర్ **కూలింగ్** స్థితిలో ఉన్నట్లు పరిగణించబడదు; ఒక విజయవంతమైన అభ్యర్థన
విండోను క్లియర్ చేస్తుంది. కనెక్షన్-స్థాయి ఎంట్రీలు (`provider:connectionId`) బదులుగా
ఎక్స్పోనెన్షియల్ `minRetryCooldownMs → maxRetryCooldownMs` బ్యాక్ఆఫ్ను కొనసాగిస్తాయి. ఓవర్రైడ్లు:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
రిగ్రెషన్ గార్డ్: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. కనెక్షన్ కూల్డౌన్

**పరిధి:** ఒకే ప్రొవైడర్ కనెక్షన్/ఖాతా/కీ.

**ఉద్దేశ్యం:** అదే ప్రొవైడర్కు చెందిన ఇతర కనెక్షన్లు సేవలను కొనసాగిస్తుండగా, సమస్యాత్మకమైన ఒక కీని దాటవేయడం.

**అమలు:**

- అందుబాటులో లేనిదిగా గుర్తించడం: `src/sse/services/auth.ts::markAccountUnavailable()`
- ఎంపిక: అదే ఫైల్లోని `getProviderCredentials*`
- కూల్డౌన్ గణన: `open-sse/services/accountFallback.ts::checkFallbackError()`
- సెట్టింగ్లు: `src/lib/resilience/settings.ts`

**ప్రతి కనెక్షన్కు ఫీల్డ్లు:**

- `rateLimitedUntil` — కూల్డౌన్ ముగిసే వరకు ఉండే టైమ్స్టాంప్
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్ కౌంటర్

**డిఫాల్ట్ కూల్డౌన్లు:**

- OAuth ఆధారం: 5s
- API-key ఆధారం: 3s
- API-key 429: అప్స్ట్రీమ్ `Retry-After`/రీసెట్ హెడర్లు/పార్స్ చేయగల రీసెట్ టెక్స్ట్కు ప్రాధాన్యం ఇస్తుంది
- బ్యాక్ఆఫ్: `baseCooldownMs * 2 ** failureIndex`

**థండరింగ్-హెర్డ్ నిరోధక రక్షణ:** ఏకకాల వైఫల్యాలు కూల్డౌన్ను అతిగా పొడిగించకుండా లేదా `backoffLevel`ను రెండుసార్లు పెంచకుండా నిరోధిస్తుంది.

**టెర్మినల్ స్థితులు (కూల్డౌన్లు కావు):**

- `banned` — నిషేధిత కీవర్డ్ / ఖాతా నిషేధ గుర్తింపు ద్వారా సెట్ చేయబడుతుంది ([BAN_DETECTION](../security/BAN_DETECTION.md) చూడండి), అలాగే వరుసగా మూడు అప్స్ట్రీమ్ ప్రతి-అభ్యర్థన తిరస్కరణల ద్వారా (`request_rejected`, ఉదా. Anthropic OAuth 403 "అభ్యర్థనకు అనుమతి లేదు" — `open-sse/services/requestRejectedStreak.ts`) సెట్ చేయబడుతుంది; ఒక్క తిరస్కరణ కనెక్షన్ను కూల్డౌన్లో మాత్రమే ఉంచుతుంది
- `expired` (పరిమిత రీట్రైల తర్వాత టెర్మినల్ స్థితికి మారుతుంది — ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్తో `EXPIRED_RETRY_MAX = 3` — తద్వారా తాత్కాలిక OAuth లోపాలు ఖాతా శాశ్వతంగా డీయాక్టివేట్ కావడానికి ముందే స్వయంగా కోలుకోగలవు)
- `credits_exhausted`

క్రెడెన్షియల్లు మారే వరకు లేదా ఆపరేటర్ వాటిని రీసెట్ చేసే వరకు ఇవి కొనసాగుతాయి. తాత్కాలిక కూల్డౌన్ స్థితితో టెర్మినల్ స్థితులను ఓవర్రైట్ చేయవద్దు.

**లేజీ రికవరీ:** `rateLimitedUntil` సమయం దాటినప్పుడు, కనెక్షన్ మళ్లీ అర్హత పొందుతుంది. విజయవంతంగా ఉపయోగించినప్పుడు, `clearAccountError()` అన్ని లోప ఫీల్డ్లను క్లియర్ చేస్తుంది.

### Claude OAuth వినియోగ పరిమితి: తక్కువ-ప్రాధాన్యత లేన్ + సెషన్-పరిమితి రీసెట్

**పరిధి:** ఒక Claude సబ్స్క్రిప్షన్ (OAuth) కనెక్షన్. రెండు ఫీచర్లు **ప్రతి కనెక్షన్కు ఆప్ట్-ఇన్
చేయాల్సినవి** (కనెక్షన్ను సవరించండి → Claude విభాగం → `providerSpecificData`లోని
`lowPriorityMode` / `autoLimitReset`, రెండూ డిఫాల్ట్గా ఆఫ్లో ఉంటాయి) మరియు Claude Code యొక్క `/low-priority`,
`/limit-reset` కమాండ్లను ప్రతిబింబిస్తాయి (Claude Code 2.1.263 నుండి వైర్ కాంట్రాక్ట్ సంగ్రహించబడింది).

**అమలు:**

- స్టేట్ మెషిన్ + రెస్పాన్స్ వర్గీకరణ: `open-sse/services/claudeLowPriority.ts`
- రీసెట్ స్థితి/క్లెయిమ్ క్లయింట్: `open-sse/services/claudeLimitReset.ts`
- ఎగ్జిక్యూటర్ హుక్ (హెడర్ ఇంజెక్షన్ + అదే-ఖాతా రీట్రై): `open-sse/executors/base.ts::execute()`
- ఆప్ట్-ఇన్ స్థిర నిల్వ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ట్రిగ్గర్:** 5-గంటల వినియోగ పరిమితి — హెడర్లలో
`anthropic-ratelimit-unified-status: rejected` ఉండి, ఖాతా అర్హత కలిగి ఉన్నప్పుడు,
`anthropic-ratelimit-unified-slow-offer: treatment` కూడా ఉండే `429`. ఆ మొదటి పరిమితి
429కి ముందు ఏదీ పంపబడదు; యూనిఫైడ్ హెడర్లు లేని బర్స్ట్ 429 సాధారణ కూల్డౌన్ మార్గం ద్వారా వెళ్తుంది.

**తక్కువ-ప్రాధాన్యత లేన్** (`lowPriorityMode`):

- పరిమితి 429 వచ్చినప్పుడు, ఎగ్జిక్యూటర్ ఆ ఆఫర్ను అంగీకరించి వెంటనే **అదే**
  ఖాతాను `anthropic-usage-limit: slow`తో మళ్లీ ప్రయత్నిస్తుంది; ప్రకటించిన
  `anthropic-ratelimit-unified-reset` (+60s గ్రేస్) వరకు లేన్ యాక్టివ్గా ఉంటుంది మరియు ఆ విండోలోని ప్రతి అభ్యర్థన
  ఆ హెడర్ను కలిగి ఉంటుంది. అడ్డుకోబడిన 429 ఎప్పటికీ `handleChatCore`కు చేరదు, కాబట్టి కనెక్షన్
  కూల్డౌన్లో **ఉంచబడదు** మరియు వేరొకదానికి రొటేట్ చేయబడదు.
- తరువాతి రెస్పాన్స్లలోని `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  లేన్ను కొనసాగిస్తాయి; `slot_busy` (429) లేదా `529`, సర్వర్ యొక్క
  `anthropic-ratelimit-unified-slow-retry-after` వరకు వేచి (డిఫాల్ట్ 20s, 5–600sకు పరిమితం, ±30% జిట్టర్)
  మళ్లీ ప్రయత్నిస్తుంది; ఇది `anthropic-ratelimit-unified-slow-max-wait` ద్వారా పరిమితం చేయబడుతుంది (డిఫాల్ట్ 20 min, పరిమితి
  1 min–6 h) — అది దాటితే లేన్ ముగుస్తుంది మరియు 10-నిమిషాల కూల్-ఆఫ్ మళ్లీ అంగీకరించడాన్ని నిరోధిస్తుంది. ఈ
  నిరీక్షణను అభ్యర్థనకు స్వంతమైన అప్స్ట్రీమ్-స్టార్ట్ టైమ్అవుట్లో మిగిలిన సమయం
  (`resolveFetchStartTimeout`, డిఫాల్ట్గా 10 min) నుంచి 5 s మార్జిన్ తీసివేసి అదనంగా పరిమితం చేస్తారు: ఆ పరిమితి లేకుంటే,
  డిఫాల్ట్ 20-నిమిషాల గరిష్ఠ నిరీక్షణ అభ్యర్థన కంటే ఎక్కువసేపు కొనసాగి, నిరీక్షణ మధ్యలో స్లీప్ రద్దవుతుంది;
  దీనివల్ల సునాయాసమైన `max_wait` ముగింపు + కూల్-ఆఫ్కు బదులుగా `TimeoutError` బయటపడుతుంది.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-విండో రోల్ఓవర్, లేదా
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (చెల్లింపు ఓవర్ఏజ్ ఇప్పుడు పరిమితిని కవర్ చేస్తుంది కాబట్టి,
  ఏ స్థితిలోనైనా దీన్ని `extra_usage`గా ముగిస్తుంది) లేన్ను ముగిస్తాయి; ఆపై
  రెస్పాన్స్ సాధారణ కూల్డౌన్ మార్గం ద్వారా వెళ్తుంది. `budget_exhausted` ప్రకటించిన బడ్జెట్ రీసెట్ వరకు
  (≤ 8 రోజులు) గుర్తుంచుకోబడుతుంది.
- ఎగ్జిక్యూటర్కు స్వంతమైన 400-ఆధారిత ప్రయత్నం-లోపలి రీట్రైల తర్వాత పరిమితి తనిఖీ నడుస్తుంది (కాంటెక్స్ట్
  ఎడిటింగ్, థింకింగ్/ఎఫర్ట్ క్లాంప్లు, పారామ్ ఆటో-లెర్న్), కాబట్టి వాటిలోని ఏదైనా రీట్రైలో మాత్రమే
  కనిపించే పరిమితి 429 కూడా కూల్డౌన్ మార్గానికి చేరకుండా అడ్డుకోబడుతుంది.
- స్థితి ప్రతి కనెక్షన్కు ఇన్-మెమరీలో ఉంటుంది (రీస్టార్ట్ చేసినప్పుడు మళ్లీ అంగీకరించడానికి ఒక అదనపు పరిమితి 429 అవసరమవుతుంది).

**సెషన్-పరిమితి రీసెట్** (`autoLimitReset`, రెండూ ఆన్లో ఉన్నప్పుడు లేన్కు ముందు ప్రయత్నించబడుతుంది):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  బ్లాక్; `arm: "reset"` మరియు `available: true` అయినప్పుడు,
  `{ "program": "juniper_tide" }`తో
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (`providerSpecificData.organizationUUID` నుండి సంస్థ UUID, బూట్స్ట్రాప్ ఫాల్బ్యాక్).
- `result: reset|not_limited` → అభ్యర్థన పూర్తి వేగంతో మళ్లీ ప్రయత్నించబడుతుంది (స్లో హెడర్ ఉండదు).
  `already_used` / `not_offered`, `next_available_at`ను మెమోయిజ్ చేస్తాయి (డిఫాల్ట్గా ఒక వారం); ఏదైనా
  వైఫల్యం 15 నిమిషాలు బ్యాక్ఆఫ్ అవుతుంది. రీసెట్ వారానికి ఒక్కసారి మాత్రమే లభిస్తుంది మరియు అయినప్పటికీ
  వారపు పరిమితిలో లెక్కించబడుతుంది.

రిగ్రెషన్ రక్షణలు: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### సెషన్ అనుబంధం (#7274)

**పరిధి:** **ఏ** ప్రొవైడర్కైనా, ఒక కనెక్షన్కు పిన్ చేయబడిన ఒక క్లయింట్ సెషన్ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` హెడర్).

**ఉద్దేశ్యం:** బహుళ-టర్న్ ఏజెంట్ను (Claude Code, aider, అనుకూల ఏజెంట్లు) అభ్యర్థనలన్నింటిలో ఒకే ఖాతాపై ఉంచడం ద్వారా, ఖాతాల మధ్య సందర్భ నష్టాన్ని మరియు ఒక్కో ఖాతాకు సెషన్ స్థితిని కలిగి ఉండే ప్రొవైడర్లలో పునరావృతమయ్యే కోల్డ్-స్టార్ట్ 429లను తగ్గించడం.

**అమలు:**

- TTL నిర్ధారణ: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- పిన్ ఎంపిక/సృష్టి: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- హెడర్ వెలికితీత (సాధారణమైనది, ఏ ప్రొవైడర్కైనా): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- స్థిరంగా భద్రపరచబడిన పిన్ పట్టిక: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- సెట్టింగ్: `sessionAffinityTtlMs` (msలో గ్లోబల్ TTL, `0` నిలిపివేస్తుంది) — `src/lib/db/settings.ts`. ఇది Codexకు మాత్రమే పరిమితమైన `codexSessionAffinityTtlMs` నుండి `124_generic_session_affinity_ttl.sql` మైగ్రేషన్ ద్వారా పేరు మార్చబడింది; గతంలో కాన్ఫిగర్ చేసిన ఏ Codex TTLనైనా ఇది కొత్త డిఫాల్ట్గా కొనసాగిస్తుంది.

#7274కు ముందు, `codex` మినహా ప్రతి ప్రొవైడర్కూ `resolveSessionAffinityTtlMs()` వెంటనే `0`ను ఇచ్చి నిష్క్రమించేది. అందువల్ల పిన్నింగ్ యంత్రాంగం మరియు హెడర్ వెలికితీత ఇప్పటికే ప్రొవైడర్-అజ్ఞేయంగా ఉన్నప్పటికీ, TTL సెట్టింగ్కు (మరియు సెషన్ హెడర్లకు) మిగతా చోట్ల ఎలాంటి ప్రభావమూ ఉండేది కాదు. పరిష్కారంలో ఆ ముందస్తు రిటర్న్ తొలగించబడింది; ఇప్పుడు గ్లోబల్గా `0` కంటే ఎక్కువగా సెట్ చేసిన తర్వాత TTL ప్రతి ప్రొవైడర్కు ఏకరీతిగా వర్తిస్తుంది.

మూడు సెషన్-అఫినిటీ హెడర్లు ఎప్పటికీ అప్స్ట్రీమ్కు ఫార్వర్డ్ చేయబడవు — ఎగ్జిక్యూటర్లు క్లయింట్ హెడర్లను యథాతథంగా పంపకుండా తమ స్వంత అప్స్ట్రీమ్ హెడర్లను మొదటి నుంచీ నిర్మిస్తారు, కాబట్టి ఇది అంతర్గత సహసంబంధ IDగానే ఉంటుంది.

### ప్రత్యేక మేనేజ్డ్ సెషన్ కనెక్షన్ లీజులు

**పరిధి:** ఒక సక్రియ మేనేజ్డ్ HTTP క్లయింట్/సెషన్, అర్హత కలిగిన ఒక OmniRoute కనెక్షన్ను స్వంతం చేసుకుంటుంది.

**ఉద్దేశ్యం:** అభ్యర్థనలన్నింటిలోనూ కఠినమైన రూటింగ్ సరిహద్దు అవసరమయ్యే క్లయింట్లకు మన్నికైన ప్రత్యేక కనెక్షన్ యాజమాన్యాన్ని అందించడం. ఇది మృదువైన కొనసాగింపు ప్రాధాన్యతగా ఉండే సెషన్ అఫినిటీకి భిన్నమైనది: ప్రత్యేక లీజు తన జీవనచక్ర స్థితిని SQLiteలో నిల్వ చేస్తుంది, గ్లోబల్ సక్రియ-యజమాని మరియు సక్రియ-కనెక్షన్ ప్రత్యేకతను అమలు చేస్తుంది, అలాగే ప్రొవైడర్ డిస్పాచ్కు ముందు కాలం చెల్లిన జనరేషన్ను తిరస్కరిస్తుంది.

ఈ ఫీచర్ను ఒక్కో API కీకి ఎంపిక చేసుకోవాలి. మేనేజ్డ్ కీకి `lease:exclusive` స్కోప్ మరియు స్పష్టమైన, ఖాళీ కాని `allowedConnections` జాబితా తప్పనిసరిగా ఉండాలి. ఏ HTTP క్లయింట్ అయినా జీవనచక్ర ఎండ్పాయింట్ను ఉపయోగించవచ్చు; క్లయింట్ పేరు, యూజర్-ఏజెంట్, ప్రొవైడర్, OAuth పద్ధతి లేదా మోడల్ అవసరం లేదు. లీజు ఒక కనెక్షన్ను స్వంతం చేసుకుంటుంది, మోడల్ను కాదు; అందువల్ల కనెక్షన్ సాధారణంగా అర్హంగానే ఉన్నంతవరకు మోడల్ మార్పు జరిగినా బైండింగ్ అలాగే కొనసాగుతుంది. సాధారణ మోడల్, కోటా, ఆరోగ్యం, కూల్డౌన్ మరియు అనుమతి జాబితా నియమాలు అధికారికంగా కొనసాగుతాయి; అవి అదే జనరేషన్ను అర్హత కలిగిన మరొక ఖాళీ కనెక్షన్కు మార్చవచ్చు.

జీవనచక్రం `acquire`, `renew`, మరియు `release` JSON చర్యలతో `POST /api/v1/session-leases`గా ఉంటుంది. మేనేజ్డ్ ఇన్ఫరెన్స్ అభ్యర్థనలు అపారదర్శకమైన `X-OmniRoute-Lease-Owner` విలువను మరియు ఖచ్చితమైన `X-OmniRoute-Lease-Generation`ను సమర్పిస్తాయి. యజమాని విలువ `vlo_`తో ప్రారంభమై, దాని తర్వాత 43 base64url అక్షరాలను కలిగి ఉంటుంది; దాని SHA-256 హాష్ మాత్రమే నిల్వ చేయబడుతుంది. ప్రతి తుది డిస్పాచ్ సరిహద్దు కూడా ప్రామాణీకరించబడిన API కీ IDని మరియు సక్రియ కనెక్షన్ IDని బైండ్ చేస్తుంది. లీజ్ నియంత్రణ హెడర్లు లాగ్లు, నిల్వ ఉంచిన అభ్యర్థన స్నాప్షాట్లు మరియు అప్స్ట్రీమ్ ఎగ్జిక్యూటర్ హెడర్ల నుంచి తొలగించబడతాయి.

సాధారణ రూటింగ్లో అర్హత కలిగిన మేనేజ్డ్ అభ్యర్థులు ఉన్నప్పటికీ, ప్రతి ఖాళీ అభ్యర్థి వేరొకరి సక్రియ లీజు ఆధీనంలో ఉంటే, OmniRoute HTTP `429`, లీజ్-సామర్థ్యం-అందుబాటులో-లేదు కోడ్, సామర్థ్యం-కోసం-వేచి-ఉంది స్థితి మరియు సంబంధిత గడువుల్లో అత్యంత ముందుగా ముగిసే గడువు నుంచి లెక్కించిన పరిమిత `Retry-After`ను అందిస్తుంది. సాధారణంగా అర్హత ఖాళీగా ఉండటం లీజ్ పోటీ కాదు; అది ఇప్పటికే ఉన్న రూటింగ్ లోప అర్థవివరణలను కొనసాగిస్తుంది.

సంబంధిత యంత్రాంగాలు వేర్వేరుగానే ఉంటాయి:

- OAuth సెషన్ ఆక్యుపెన్సీ అనేది OAuth ఖాతాల కోసం ప్రాసెస్-లోకల్ మృదువైన పంపిణీ.
- ఖాతా సెమాఫోర్లు అభ్యర్థన-ఏకకాలికత అనుమతులను మంజూరు చేస్తాయి మరియు అభ్యర్థన పూర్తయినప్పుడు ముగుస్తాయి.
- ప్రత్యేక మేనేజ్డ్ సెషన్ లీజులు అనేవి జనరేషన్ సరిహద్దుతో కూడిన మన్నికైన జీవనచక్ర యాజమాన్యం.

---

## 3. మోడల్ లాకౌట్

**పరిధి:** provider + connection + model త్రయం.

**స్థితి ఆధారంగా కీ పరిధి:** విఫలమైన స్థితి, లాకౌట్ ఏ కీకి వ్రాయాలో నిర్ణయిస్తుంది
(`open-sse/services/accountFallback/exactModelLock.ts`లోని `resolveLockoutScope()`):

- `429` / `403` / `402` — కోటా లేదా అర్హత సంకేతం — **కోటా కుటుంబాన్ని** లాక్ చేస్తాయి:
  codex కోసం మొత్తం `codex` / `spark` పరిధి (connectionలోని ప్రతి `gpt-5*` model),
  ఇతర providers కోసం `getQuotaScopedModelForProvider()`.
- `404` ప్రాథమిక modelను లాక్ చేస్తుంది (`getModelLockKey()` `not_found`ను సంకుచితం చేస్తుంది).
- ఏదైనా ఇతర స్థితి — `5xx` రవాణా/సర్వర్ వైఫల్యాలు మరియు నాణ్యత ధ్రువీకరణ నుండి
  OmniRoute స్వయంగా రూపొందించిన `502` — ఖచ్చితమైన
  provider/connection/model ట్యూపుల్ను మాత్రమే లాక్ చేస్తుంది. ఒక modelలో చెడ్డ stream
  రావడం account కోటా గురించి ఆధారం కాదు; ఈ నియమానికి ముందు
  `codex/gpt-5.6-luna`లో వచ్చిన ఒక ఖాళీ response, దాని కోటా ప్రభావితం కాకపోయినా,
  ఆ connectionలోని ప్రతి `gpt-5*` modelను 2–30 నిమిషాల పాటు (క్రమంగా పెరుగుతూ)
  routing నుండి తొలగించేది.
- caller స్పష్టంగా అందించిన `scope` ఎంపిక ఎల్లప్పుడూ ప్రాధాన్యం పొందుతుంది (Antigravity `"exact"`ను పంపుతుంది).

**ఉద్దేశ్యం:** ఒక model మాత్రమే అందుబాటులో లేనప్పుడు లేదా కోటా-పరిమితికి లోనైనప్పుడు, మొత్తం connectionను నిలిపివేయకుండా చూడటం.

**ఉదాహరణలు:**

- ఒక్కో modelకు ప్రత్యేక కోటా ఉన్న providers `429`ను తిరిగి ఇవ్వడం
- ఒక model అందుబాటులో లేనందుకు local providers `404`ను తిరిగి ఇవ్వడం
- Provider-నిర్దిష్ట mode/model అనుమతి వైఫల్యాలు (ఉదా., Grok modes)

**అమలు:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### మోడల్ కూల్డౌన్స్ డ్యాష్బోర్డ్ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

సక్రియ lockoutsను ఈ వివరాలతో జాబితా చేస్తుంది: provider, connection, model, reason, expiresAt. Operators ఈ card నుండి modelను మాన్యువల్గా తిరిగి ప్రారంభించగలరు.

**REST API:**

- `GET /api/resilience/model-cooldowns` — సక్రియ lockoutsను జాబితా చేయడం
- `DELETE /api/resilience/model-cooldowns` — మాన్యువల్గా తిరిగి ప్రారంభించడం. Body: `{provider, connection, model}`. Auth: management.

### లాకౌట్ సెట్టింగ్స్ UI + విజయ-క్షీణత రికవరీ (v3.8.23)

Model lockout ఎల్లప్పుడూ ఆన్లో ఉండే hardcoded ప్రవర్తన నుండి, దాని స్వంత
settings card మరియు స్వయంగా కోలుకునే recovery మార్గం కలిగిన, పూర్తిగా కాన్ఫిగర్ చేయగల
opt-in ఫీచర్గా మారింది.

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ఇది పైన ఉన్న read-only `ModelCooldownsCard`కు **భిన్నమైనది** (అది సక్రియ lockoutsను మాత్రమే
_జాబితా చేస్తుంది_) — కొత్త card _పారామీటర్లను కాన్ఫిగర్ చేస్తుంది_. Defaults
`DEFAULT_MODEL_LOCKOUT_SETTINGS`లో ఉన్నాయి
(`src/lib/resilience/modelLockoutSettings.ts`):

| సెట్టింగ్               | డిఫాల్ట్                         | అర్థం                                                        |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | ప్రధాన toggle — model lockout **డిఫాల్ట్గా ఆఫ్లో ఉంటుంది**.  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model-పరిధి వైఫల్యంగా పరిగణించే upstream statuses.           |
| `baseCooldownMs`        | `120_000` (120 s)                | మొదటి వైఫల్యానికి ప్రారంభ lockout వ్యవధి.                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | క్రమంగా పెరిగిన cooldownకు గరిష్ఠ పరిమితి.                   |
| `maxBackoffSteps`       | `10`                             | గరిష్ఠ exponential-backoff పెంపు దశలు.                       |
| `useExponentialBackoff` | `true`                           | పునరావృత వైఫల్యాలు cooldownను ఘాతాంకంగా పెంచాలా వద్దా అనేది. |

Settings సాధారణ settings store ద్వారా నిల్వ చేయబడతాయి మరియు
resilience settings schema ద్వారా ధ్రువీకరించబడతాయి; card `baseCooldownMs`/`maxCooldownMs`ను
(`maxCooldownMs ≥ baseCooldownMs`తో) మరియు `maxBackoffSteps`ను పరిమితుల్లో ఉంచుతుంది.

**విజయ-క్షీణత రికవరీ:** recovery అనేది పూర్తిగా timer గడువు ముగియడంపై మాత్రమే ఆధారపడదు. ఒక సక్రమమైన
response, model యొక్క failure countను క్రమంగా తగ్గిస్తుంది; అందువల్ల మధ్యలోనే కోలుకున్న model,
దాని timer ముగియకముందే escalationను ఆపి lockoutను తొలగించుకోగలదు. విజయవంతమైన
combo targetపై, `open-sse/services/combo.ts`లోని `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) పిలవబడుతుంది; ఇది నిల్వ చేసిన
`failureCount`ను **సగం చేస్తుంది** (`Math.floor(failureCount / 2)`); అది `0`కు
చేరుకున్నప్పుడు lockout entry పూర్తిగా తొలగించబడుతుంది. దీనికి ప్రతిరూపమైన
`recordModelLockoutFailure()`, escalation windowలో వైఫల్యాలు సంభవించినప్పుడు countను
పెంచుతుంది (అలాగే cooldownను పెంచుతుంది). ఈ విజయ-క్షీణత సాధారణ timer గడువు ముగియడానికి
అదనంగా పనిచేస్తుంది — ఈ రెండు మార్గాల్లో ఏదైనా modelను తిరిగి ప్రారంభించగలదు.

**స్థితి:** lockouts **in-memory**లో ఉంచబడతాయి (ఒక్కో processకు చెందిన `Map`లు;
`provider:connectionId:model` ద్వారా key చేయబడిన `ModelLockoutEntry`, exact-scope locks
`provider:connectionId:exact:model` ద్వారా key చేయబడతాయి), DBలో నిల్వ చేయబడవు
— restart చేసినప్పుడు అవి పోతాయి. _Settings_ నిల్వ చేయబడతాయి; సక్రియ
lockout _స్థితి_ తాత్కాలికమైనది.

---

## 4. కోటా-షేర్ సమకాలీనత నియంత్రణ (v3.8.36)

సబ్స్క్రిప్షన్ ఖాతాలు (GLM, MiniMax మొదలైనవి) తరచుగా ఒకేసారి ~1–3 అభ్యర్థనలను మాత్రమే
అంగీకరిస్తాయి; దాన్ని మించితే 429లు మరియు కూల్డౌన్లు ట్రిగ్గర్ అవుతాయి. అనేక API కీలు ఒకే అప్స్ట్రీమ్
ఖాతాను పంచుకునే **కోటా-షేర్** (`qtSd/…`) కాంబోలలో ఇది మరింత తీవ్రంగా ఉంటుంది.
మూడు లేయర్లు షేర్ చేసిన ఖాతా అభ్యర్థనలతో ముంచెత్తబడకుండా చూస్తాయి.

### ప్రతి కనెక్షన్ సమకాలీనత పరిమితి (`max_concurrent`)

ప్రతి ప్రొవైడర్ కనెక్షన్ ఒక `max_concurrent` గరిష్ఠ పరిమితిని ప్రకటించవచ్చు
(`provider_connections.max_concurrent`, కనెక్షన్ మోడల్ / API / DBలో సెట్ చేయబడుతుంది).
పరిమితి వద్దనుకుంటే దాన్ని ఖాళీగా ఉంచండి. దిగువన ఉన్న సీరియలైజేషన్ లేయర్ను నియంత్రించే ఏకైక
సెట్టింగ్ ఇదే — దీన్ని ఖాతా యొక్క వాస్తవ సమకాలీనతకు సెట్ చేయండి (ఉదా. GLM ~1, MiniMax ~2).

### కోటా-షేర్ అభ్యర్థన సీరియలైజేషన్

కోటా-షేర్ డిస్పాచ్, పాజిటివ్ `max_concurrent`ను ప్రకటించిన కనెక్షన్ను లక్ష్యంగా చేసుకున్నప్పుడు,
ఆ **ఖాతా**కు వెళ్లే సమకాలీన అభ్యర్థనలు ప్రతి కనెక్షన్ సెమాఫోర్
(కీ `qsconn:<connectionId>`) ద్వారా సీరియలైజ్ చేయబడతాయి: అదనపు అభ్యర్థనలు ఖాతాను
ముంచెత్తడానికి బదులుగా **క్యూలో వేచి ఉంటాయి**. ఇది **ఫెయిల్-ఓపెన్** — నిండిపోయిన
క్యూ లేదా టైమ్అవుట్, డిస్పాచ్ చేయగల అభ్యర్థనను తిరస్కరించకుండా స్లాట్ లేకుండానే
కొనసాగుతుంది. దీన్ని **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, డిఫాల్ట్గా
ఆన్)లో టాగుల్ చేయండి. `max_concurrent` పరిమితి లేకపోతే ప్రవర్తనలో మార్పు ఉండదు.

> కోటా-షేర్ రూటింగ్ గేట్ (`selectQuotaShareTarget`, DRR + P2C) కూడా
> ఫెయిల్-ఓపెన్గానే ఉంటుంది మరియు పరిమితికి చేరుకున్న కనెక్షన్కు కేవలం _తక్కువ ప్రాధాన్యత_
> ఇస్తుంది — ఒకే కనెక్షన్ ఉన్న పూల్లో అది కఠిన పరిమితిని విధించలేదు, కాబట్టి అభ్యర్థనల
> వెల్లువను వాస్తవంగా అదుపు చేసేది ఈ సెమాఫోరే.

### కాంబో కూల్డౌన్ను పరిగణించే రీట్రై

ప్రతి కాంబో వ్యూహానికి (ప్రారంభించబడినప్పుడు), స్వల్పకాలిక కూల్డౌన్ కారణంగా 429ను
ఖరారు చేసే అభ్యర్థన, 429ను తిరిగి ఇవ్వడానికి బదులుగా అది ముగిసే వరకు వేచి ఉండి,
మళ్లీ డిస్పాచ్ అవుతుంది — ఇది బహుళ-మోడల్ కాంబోలలో Gemini-తరహా TPM/RPM విండోలను
(~60s retry-after) కవర్ చేస్తుంది; ఉదాహరణకు, 2-మోడల్ కాంబోలోని రెండు లక్ష్యాలు
ప్రతి-మోడల్ రేట్ లిమిట్ను తాకడం. ఇది **Settings → Resilience**లోని
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ద్వారా
పరిమితం చేయబడుతుంది. `quota_exhausted` (అర్ధరాత్రి వరకు లాక్ చేయబడింది) లేదా
ప్రామాణీకరణ/కనుగొనబడలేదు కారణాలపై ఇది ఎప్పుడూ వేచి ఉండదు.

---

## 5. అభ్యర్థన క్యూ ప్రవేశ నియంత్రణ (v3.8.49 · issue #6593)

**పరిధి**: పైన పేర్కొన్న మూడు యంత్రాంగాలకు ఒక స్థాయి దిగువన ఉండే, స్థానిక provider+connection-కు చెందిన rate-limit క్యూ (`open-sse/services/rateLimitManager.ts`,
Bottleneck ఆధారితమైనది).

**`maxWaitMs` క్యూ నిరీక్షణను పరిమితం చేస్తుంది; `executionMaxWaitMs` అమలును పరిమితం చేస్తుంది.**
ఈ రెండూ ఉద్దేశపూర్వకంగా వేర్వేరుగా ఉంచబడ్డాయి, అలాగే ఏదీ మరొకదానికి విలువను అందించదు.

`resilienceSettings.requestQueue.maxWaitMs` అనేది **క్యూ-నిరీక్షణ బడ్జెట్**: ఇది
provider slot కోసం వేచి ఉండటం, ఆపై QUEUED స్థితిలో ఉండటం రెండింటినీ
కవర్ చేస్తుంది; job QUEUED స్థితిని విడిచి అమలు కావడం ప్రారంభించిన వెంటనే
దాని timer తొలగించబడుతుంది
(`rateLimitManager.ts`, `wrappedFn`). దీనిని మించిన అభ్యర్థన
upstream వరకు ఎప్పటికీ చేరదు. డిఫాల్ట్ 30000ms; ఇది
`src/lib/resilience/settings.ts`లోని `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ద్వారా అందించబడుతుంది మరియు
`tests/unit/ratelimit-admission-control-6593.test.ts` ద్వారా స్థిరపరచబడింది.
కాబట్టి దీన్ని మార్చితే ఈ పేరాగ్రాఫ్ నిశ్శబ్దంగా పాతబడిపోకుండా, ఆ test
విఫలమవుతుంది.

`resilienceSettings.requestQueue.executionMaxWaitMs` అనేది Bottleneckకు
job `expiration`గా అందే విలువ; దాని timer dispatch తర్వాత మాత్రమే
ప్రారంభమవుతుంది. తమ స్వంత upstream timeout లేని executors కోసం ఇది
ఒక తుది రక్షణగా పనిచేస్తుంది. executor యొక్క స్వంత fetch-start timeout
దీనికంటే ఎక్కువగా ఉంటే, ఇది ఆ timeoutకు పెంచబడుతుంది; కాబట్టి ఆరోగ్యకరంగా
కొనసాగుతున్న in-flight responseను ఇది మధ్యలో నిలిపివేయదు. డిఫాల్ట్
600000ms (10 నిమిషాలు).

క్యూ బడ్జెట్ను `expiration`కు అందించడం వల్లనే గతంలో non-incremental
gateways మధ్యలోనే నిలిచిపోయేవి — మొదటి bytes రావడానికి ముందు అవి
సమంజసంగానే నిమిషాలపాటు నడుస్తాయి — అందుకే expiration అనేది `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504)గా చూపబడుతుంది, కాగా క్యూ బడ్జెట్
queue-timeout codeను కలిగి ఉంటుంది. `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) లేదా dashboard
(**Settings → Resilience**) ద్వారా వీటిలో దేనినైనా override చేయండి. normalize
చేసేటప్పుడు రెండూ 1ms–24h పరిధికి పరిమితం చేయబడతాయి.

**రెండింటికీ వర్తించే ప్రాధాన్యత క్రమం:** env var కేవలం _డిఫాల్ట్_ విలువను
అందిస్తుంది. `resilienceSettings.requestQueue`లో నిల్వ చేయబడిన విలువ
(dashboard / API patch, `key_value`లో నిల్వ చేయబడేది) దానికంటే ప్రాధాన్యత
పొందుతుంది; per-connection `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` దానికంటే కూడా ప్రాధాన్యత పొందుతుంది. కాబట్టి ఇప్పటికే
నిల్వ చేసిన విలువ ఉన్న deploymentలో env varను సెట్ చేసినా ఏమీ మారదు —
బదులుగా నిల్వ చేసిన settingను తొలగించండి లేదా నవీకరించండి.

క్యూలో ఉండే సమయం `maxWaitMs` ద్వారా పరిమితం చేయబడుతుంది; ఒకేసారి ఎంతమంది
callersను క్యూలో ఉంచవచ్చో క్రింద ఉన్న `maxQueueDepth` పరిమితం చేస్తుంది.

**`maxQueueDepth` — ఎంపికచేసి ప్రారంభించగల ప్రవేశ పరిమితి (కొత్తది).** `resilienceSettings.requestQueue.maxQueueDepth`
ఒక provider+connection కోసం ఒకేసారి ఎన్ని అభ్యర్థనలు క్యూలో (ఇంకా dispatch
కాకుండా) ఉండవచ్చో పరిమితం చేస్తుంది. క్యూ ఇప్పటికే `maxQueueDepth`
అభ్యర్థనలను కలిగి ఉన్నప్పుడు, కొత్త అభ్యర్థన `limiter.schedule()`కు
చేరకముందే typed `code: "RATE_LIMIT_QUEUE_FULL"` errorతో వెంటనే
తిరస్కరించబడుతుంది — కాబట్టి ఈ తిరస్కరణ తక్కువ ఖర్చుతో జరుగుతుంది మరియు ఆ
అభ్యర్థనకు సంబంధించిన ఏదైనా downstream prompt-compression / translation
పని జరగకముందే సంభవిస్తుంది. డిఫాల్ట్ `0` = నిలిపివేయబడింది; ఇది ఇప్పటికే
ఉన్న అపరిమిత-క్యూ ప్రవర్తనను అలాగే ఉంచుతుంది; పరిమితి 0–100000.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) లేదా
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) ద్వారా
override చేయండి.

ప్రవేశ తనిఖీ స్వయంగా ఒక pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), కాబట్టి
నిజమైన Bottleneck limiter లేకుండానే దీనిని unit-test చేయవచ్చు.

> #6593ను ప్రారంభించిన RFC ఒక `bypassCompressionOnRateLimit`
> flagను కూడా ప్రతిపాదించింది. ఈ repoలోని `open-sse/services/compression/`
> pipeline అనేది outbound LLM అభ్యర్థనపై prompt/context compression
> (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy`
> block సమీపంలో); synthesized 429 bodiesపై HTTP response compression కాదు —
> కాబట్టి అక్షరార్థ bypass flagకు సరిపోయే code path లేదు. ఆ
> prompt-compression దశ ప్రస్తుతం request pipelineలో `withRateLimit()`కు
> _ముందే_ నడుస్తుంది; అందువల్ల queue-full తిరస్కరణ సమయంలో దాన్ని దాటవేయడానికి
> క్రమాన్ని మార్చడం ఈ issue పరిధికంటే వేరైన, మరింత పెద్ద మార్పు. ఇది
> ఉద్దేశపూర్వకంగా ఇక్కడ అమలు చేయబడలేదు; CPU ఆదా ప్రయోజనం reordering ప్రమాదానికి
> తగినదైతే, దీనిని follow-upగా చేపట్టవచ్చు.

---

## 6. స్లో-స్ట్రీమ్ త్రూపుట్ వాచ్డాగ్ (#9709)

ఐచ్ఛిక `resilienceSettings.streamRecovery.throughputWatchdog` రక్షణ, ఇంకా చంక్లను పంపుతూనే ఉన్నప్పటికీ కాన్ఫిగర్ చేసిన ఉపయోగకర-అవుట్పుట్ రేటు కంటే తక్కువ అసిస్టెంట్ అవుట్పుట్ను ఉత్పత్తి చేస్తున్న అప్స్ట్రీమ్ను గుర్తిస్తుంది. ఇది ఉద్దేశపూర్వకంగానే ఐడిల్ టైమ్అవుట్కు భిన్నంగా ఉంటుంది: హార్ట్బీట్లు మరియు మెటాడేటా ఏ టైమర్నూ రీసెట్ చేయవు, అలాగే అవి పురోగతిగా పరిగణించబడవు. ఇది హార్డ్ అటెంప్ట్ డెడ్లైన్కు (#9153) కూడా భిన్నంగా ఉంటుంది; అవుట్పుట్ నాణ్యతతో సంబంధం లేకుండా అది సంపూర్ణ భద్రతా పరిమితిగా కొనసాగుతుంది.

వాచ్డాగ్ అబార్ట్ చేయగలగడానికి ముందు వార్మ్-అప్ వ్యవధి, దాని తర్వాత పూర్తి రోలింగ్ విండో అవసరం. ఇది Chat Completions మరియు Responses API అవుట్పుట్ ఈవెంట్ల నుండి టెక్స్ట్ డెల్టాలను లెక్కిస్తుంది (UTF-8 బైట్లకు ఒక జాగ్రత్తపూర్వక ప్రాక్సీ), వినియోగానికి మాత్రమే సంబంధించిన మరియు ఖాళీ ఈవెంట్లను విస్మరిస్తుంది, అలాగే టూల్-కాల్ లేదా రీజనింగ్ ఈవెంట్లు ప్రాసెస్లో ఉన్నప్పుడు మూల్యాంకనాన్ని నిలిపివేస్తుంది. ఇది డిఫాల్ట్గా నిలిపివేయబడి ఉంటుంది; `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`తో ప్రారంభించవచ్చు. విండో, వార్మ్-అప్, కనిష్ఠ రేటు మరియు కొలవగల కనిష్ఠ అవుట్పుట్ సాధారణ రెసిలియన్స్-సెట్టింగ్ల నార్మలైజేషన్ లేయర్ ద్వారా పరిమితం చేయబడతాయి.

ప్రారంభించినప్పుడు, వాచ్డాగ్ అబార్ట్ సక్రియ అప్స్ట్రీమ్ అటెంప్ట్కు మాత్రమే వర్తింపజేయబడుతుంది. క్లయింట్కు కనిపించే బైట్లు ఏవీ పంపబడకముందు, ఇప్పటికే ఉన్న అదే-అకౌంట్ ఎర్లీ-రికవరీ మార్గం అటెంప్ట్ను మళ్లీ తెరవవచ్చు. కమిట్ తర్వాత, స్ట్రీమ్ను విచక్షణ లేకుండా ఎప్పటికీ రీప్లే చేయరు; ఇప్పటికే ఉన్న సురక్షిత మిడ్-స్ట్రీమ్ కంటిన్యుయేషన్ ఒప్పందం మాత్రమే సఫిక్స్ను జోడించగలదు. ఫైనలైజేషన్ ఒక్కసారి మాత్రమే జరుగుతుంది, కాబట్టి వినియోగ అకౌంటింగ్ మరియు సెమాఫోర్ విడుదల నకలు కావు.

---

## 7. అప్స్ట్రీమ్ స్టేటస్ పునర్వ్యాఖ్యానం (తప్పుగా పేర్కొన్న కోటా ఎర్రర్లు)

**పరిధి:** తాత్కాలిక కోటా అయిపోవడాన్ని తప్పు HTTP స్టేటస్తో నివేదించే ఒక అప్స్ట్రీమ్ గేట్వే.

**ఉద్దేశ్యం:** వర్గీకరణకు ముందు తప్పుదారి పట్టించే స్టేటస్ను సరిచేయడం, తద్వారా డౌన్స్ట్రీమ్ వినియోగదారులు (ఫాల్బ్యాక్ ఇంజిన్, కాంబో అగ్రిగేషన్, క్లయింట్కు చూపించే రెస్పాన్స్) వైఫల్యం యొక్క నిజమైన రీట్రై చేయదగిన స్వభావాన్ని చూడగలుగుతారు.

కొన్ని గేట్వేలు తాత్కాలిక కోటా అయిపోవడాన్ని రీట్రై చేయలేని HTTP స్టేటస్తో సూచిస్తాయి. `agentrouter.org`, ప్రామాణిక `429`కు బదులుగా చైనీస్ బాడీతో (`用户额度不足` / `额度不足`) `403`ను (కొన్నిసార్లు `400`) తిరిగి ఇస్తుంది. Claude Code వంటి క్లయింట్లు `403`ను శాశ్వతమైనదిగా పరిగణించి సెషన్ను అబార్ట్ చేస్తాయి; సవరణ లేకుండా ఫాల్బ్యాక్ ఇంజిన్ దానిని కోటా ఈవెంట్గా కాకుండా `AUTH_ERROR`గా వర్గీకరిస్తుంది.

**అమలు:**

- రిజిస్ట్రీ + మ్యాచర్: `open-sse/config/upstreamStatusRestatement.ts` — ప్రతి ప్రొవైడర్కు నియమాల జాబితా (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` ద్వారా మ్యాచ్ చేయబడుతుంది.
- కాల్ సైట్: `open-sse/handlers/chatCore.ts`లోని `providerFailure:` బ్లాక్ (దాదాపు 3654వ లైన్ వద్ద), `parseUpstreamError()` ఎర్రర్ HTTP స్టేటస్తో (`!providerResponse.ok`) ఉన్న అప్స్ట్రీమ్ రెస్పాన్స్ను పార్స్ చేసిన వెంటనే, ఏ వర్గీకరణ జరగకముందు ఉంటుంది; అందువల్ల ప్రతి డౌన్స్ట్రీమ్ వినియోగదారు సరిచేసిన స్టేటస్ను చూస్తారు. `200` SSE స్ట్రీమ్లో పొందుపరిచిన ఎర్రర్లు వేరే, తర్వాతి స్ట్రీమ్-పార్సింగ్ మార్గాన్ని అనుసరిస్తాయి మరియు నేడు ఈ హుక్ ద్వారా **కవర్ చేయబడవు** — ఇది తెలిసిన పరిమితి; agentrouter తప్పుగా ఇచ్చే స్టేటస్కు (ఇది ఎర్రర్ HTTP స్టేటస్గా కనిపిస్తుంది) ఇంకా దీని అవసరం లేదు.
- రీట్రై అర్హత: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`లో ఉంది (`open-sse/services/combo/unavailableRetryGate.ts`), కాబట్టి పునర్వ్యాఖ్యానించిన ఎర్రర్ పనికిరాని `403`గా కనిపించకుండా, వాస్తవ రీట్రై విండోను కలిగి ఉంటుంది.
- సింథటిక్ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) అనేది పునర్వ్యాఖ్యానించిన రెస్పాన్స్ **క్లయింట్కు** తెలియజేసేది మాత్రమే; అది కనెక్షన్ అంతర్గత కూల్డౌన్/లాకౌట్ వ్యవధి కాదు — పునర్వ్యాఖ్యానించిన ఎర్రర్ను వాస్తవంగా నిర్వహించే యంత్రాంగం దానిని విడిగా నియంత్రిస్తుంది (Connection Cooldown యొక్క పెరుగుతూ పోయే బ్యాక్ఆఫ్, §2, API-key ప్రొవైడర్లకు బేస్ `3s`; లేదా agentrouter వంటి ప్రతి-మోడల్-కోటా ప్రొవైడర్ల కోసం Model Lockout, §3). క్లయింట్కు ప్రకటించే 60s విండో కంటే ముందుగానే రౌటర్ అంతర్గతంగా రీట్రై చేయడానికి అర్హత పొందవచ్చు — ఇది ఉద్దేశపూర్వక అదనపు వ్యవధి, బగ్ కాదు.

శాశ్వత ఎర్రర్లు (agentrouter యొక్క `无权访问模型` — ఈ మోడల్ను యాక్సెస్ చేసే అధికారం లేదు) ఎప్పటికీ పునర్వ్యాఖ్యానించబడవు: `textMarkers` మ్యాచ్ అయినప్పటికీ `excludeMarkers` నియమాన్ని వీటో చేస్తుంది, కాబట్టి ఎర్రర్ తన అసలు స్టేటస్ను అలాగే ఉంచుకుంటుంది మరియు ఏదీ దానిని నిరవధికంగా రీట్రై చేయదు. సరిపోలే ప్రొవైడర్ వర్గీకరణ నియమాన్ని (`open-sse/config/providerErrorRules.ts`లోని `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, ప్రకటిత `6h` బేస్ కూల్డౌన్) సాధారణ apikey-కేటగిరీ `FORBIDDEN` ఎర్లీ-రిటర్న్కు _ముందు_ `checkFallbackError` (`open-sse/services/accountFallback.ts`) పరిశీలిస్తుంది; ఇది `honorsRuleLockScope(provider)` ఆధారంగా గేట్ చేయబడుతుంది (#10334 — ప్రస్తుతం `providerErrorRules.ts`లోని `HONORS_RULE_LOCK_SCOPE_PROVIDERS` అలౌలిస్ట్ ద్వారా agentrouterకు మాత్రమే పరిమితం). నియమం ప్రకటించిన 6h కూల్డౌన్ `fallbackResult.baseCooldownMs`గా ముందుకు ప్రవహిస్తుంది, కానీ అది ఇప్పటికీ ముందే ఉన్న ప్రతి-మోడల్-కోటా లాకౌట్ మార్గానికే (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, కూల్డౌన్ మూలం మినహా #10334 వల్ల మార్పులేదు) అందించబడుతుంది: ప్రతి ఇతర మోడల్ లాకౌట్లాగే, ఇది ఆపరేటర్ యొక్క `mlSettings.maxCooldownMs` (డిఫాల్ట్ `1_800_000ms` / 30min)కు తగ్గించబడుతుంది; అలాగే _నిల్వ చేయబడిన లాకౌట్ కారణం_ నియమంలోని `"auth_error"` కాకుండా, ముందే ఉన్న హార్డ్కోడ్ చేసిన `"forbidden"`గానే ఉంటుంది — కారణ స్ట్రింగ్ కాదు, కూల్డౌన్ వ్యవధి మాత్రమే ప్రారంభం నుండి ముగింపు వరకు గౌరవించబడుతుంది. కనెక్షన్ సక్రియంగానే ఉంటుంది; అదే కనెక్షన్లోని ఇతర మోడల్లపై ఎలాంటి ప్రభావమూ ఉండదు.

పునర్వ్యాఖ్యానించబడిన కోటా లోపాలు (`额度不足`) ప్రొడక్షన్లో ఒక ప్రొవైడర్ నియమాన్ని చేరుకుంటాయి
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, దీనికి స్వంతంగా ప్రకటించిన cooldown లేదు — persistence layer యొక్క
scaled backoff డిఫాల్ట్ వర్తిస్తుంది). #10334 నుండి,
`ProviderErrorRuleMatch` లోని `scope` మొదటి నుండి చివరి వరకు వినియోగించబడుతోంది, కానీ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist లో ఉన్న ప్రొవైడర్లకు **మాత్రమే**
(`providerErrorRules.ts` — ప్రస్తుతం `"agentrouter"` మాత్రమే,
`honorsRuleLockScope()` ద్వారా నియంత్రించబడుతుంది). మిగతా ప్రతి
ప్రొవైడర్కు `scope`, #10334 కు ముందు ఉన్నట్లే, సమాచారాత్మకంగానే ఉంటుంది.
`checkFallbackError` సరిపోలిన నియమం యొక్క scope ను
`fallbackResult.ruleScope` గా బహిర్గతం చేస్తుంది;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) అనేది ఒక `ruleScope` ను connection-వ్యాప్తంగా,
స్వయంగా పునరుద్ధరించుకోగల సంకేతంగా పరిగణించడం నిజంగా సురక్షితమేనని నిర్ధారించే
భాగస్వామ్య guard (`scope` `"connection"`, reason `quota_exhausted`, ఎప్పటికీ
`permanent` కాదు, ఎప్పటికీ `creditsExhausted` కాదు — భవిష్యత్తులో ఏదైనా నియమం
`"connection"` scope ను శాశ్వత account స్థితితో జతచేయడాన్ని నిరోధించే రక్షణ).
దీన్ని ఇద్దరు consumers కాల్ చేస్తారు:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider **per-model** lockout branch లోకి వెళ్లడానికి బదులుగా
  (agentrouter కు `passthroughModels: true` ఉంది → `hasPerModelQuota()`
  `true` ను తిరిగి ఇస్తుంది), ఇది ఒక **తాత్కాలిక connection cooldown** ను
  వర్తింపజేస్తుంది — `testStatus: "unavailable"` + `rateLimitedUntil`,
  terminal status (`credits_exhausted`/`banned`/`expired`) ను ఎప్పటికీ
  వర్తింపజేయదు — అందువల్ల cooldown ముగిసిన తర్వాత connection స్వయంగా
  పునరుద్ధరించుకుంటుంది; మాన్యువల్ credential reset అవసరం ఉండదు.
  `disableCooling: true` ఉన్న connections కోసం ఇది దాటవేయబడుతుంది (#2997):
  ఆ opt-out బదులుగా per-model lockout కు కొనసాగుతుంది (ఇది డాక్యుమెంట్ చేసిన
  trade-off — branch పైన ఉన్న code comment చూడండి).
- **అదే-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): అదే guard, connection ను
  `${provider}:${connectionId}` key తో in-memory `exhaustedConnections` set లో
  గుర్తిస్తుంది. ఇది మిగిలిన SAME-REQUEST target ను, దాని స్వంత target object పై
  _అదే ఖచ్చితమైన `connectionId` ఇప్పటికే ఉన్నప్పుడు మాత్రమే_ దాటవేస్తుంది
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` అనేది `exhaustedConnections` lookup కు ముందు) — సాధారణ
  model-list combo లో sibling targets తమవైన pinned `connectionId` ను కలిగి
  ఉండవు; response లోని `X-OmniRoute-Selected-Connection-Id` header నుండి
  dispatch కు ఒకసారి మాత్రమే అది resolve అవుతుంది, కాబట్టి ఆ key match
  ఎప్పటికీ జరగదు. ఆ సాధారణ సందర్భంలో, మిగిలిన leg ఇప్పుడే exhausted అయిన
  account ను మళ్లీ ఉపయోగించకుండా ఇచ్చే నిజమైన రక్షణ ఈ Set **కాదు** — అది పైన
  ఉన్న persistence layer (connection యొక్క `rateLimitedUntil` ఇప్పుడు
  భవిష్యత్తులో ఉంది), అలాగే failure కోసం ఇదే guard
  `transientRateLimitedProviders` ను అణచివేయడం (క్రింద ఉన్న
  "రెండు-దశల రూపకల్పన" మరియు `targetExhaustion.ts` లోని
  `isAgentrouterConnectionQuotaScope` branch పై ఉన్న code comment చూడండి):
  ఆ Set గుర్తించబడకుండా ఉంచబడినప్పుడు, `combo.ts` యొక్క
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ప్రొవైడర్కు చెందిన
  మిగిలిన legs కోసం అమలులోకి **రాదు**; అందువల్ల credential selection యొక్క
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) సాధారణంగానే
  గౌరవించబడుతుంది, మరియు మిగిలిన leg వేరొక, ఇంకా eligible గా ఉన్న
  agentrouter connection ను ఎంచుకుంటుంది లేదా credentials అందుబాటులో లేవనే
  కారణంతో విఫలమవుతుంది — ఈ branch ఇప్పుడే cooldown చేసిన connection పైకి
  బలవంతంగా తిరిగి వెళ్లదు.

### రెండు-దశల రూపకల్పన: status పునర్వ్యాఖ్యానం, ఆపై వర్గీకరణ

Status పునర్వ్యాఖ్యానం (`upstreamStatusRestatement.ts`) మరియు ప్రొవైడర్
వర్గీకరణ నియమాలు (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) రెండూ provider id మరియు text markers ఆధారంగా key
చేసే వేర్వేరు registries, కానీ అవి వేర్వేరు చోట్ల అమలై వేర్వేరు
ప్రయోజనాలను నెరవేరుస్తాయి: restatement అనేది `chatCore.ts` లో HTTP status ను
ముందుగానే తిరిగి రాస్తుంది; classification rules అనేవి
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) లో fallback
`reason` మరియు lock `scope` (`model` / `provider` / `connection`) ను
ఎంచుకుంటాయి.

Classification rules, `providerErrorRules.ts` లోని
`FULL_TEXT_RULE_PROVIDERS` allowlist లో జాబితా చేసిన ప్రొవైడర్ల కోసం మాత్రమే
పూర్తి error **text** ను చూస్తాయి (`额度不足` వంటి body markers ను సరిపోల్చడానికి
ఇది అవసరం) — ప్రస్తుతం `"agentrouter"` మాత్రమే. మిగతా ప్రతి
**built-in catalog** ప్రొవైడర్ కోసం, `checkFallbackError` అనేది
`getProviderErrorRuleMatch` కు structured error (`{code, type}`) ను మాత్రమే
అందిస్తుంది; ఇది header/status/code ఆధారిత నియమాలకు సరిపోతుంది, కానీ
body-text markers ను చూడలేదు. `resolveRuleMatchBody()` helper ఈ ఎంపికను
చేస్తుంది: allowlist లోని ప్రొవైడర్లకు పూర్తి error text, మిగతావారికి
structured error. ఒక **built-in** ప్రొవైడర్ను `FULL_TEXT_RULE_PROVIDERS` కు
జోడించడం అనేది స్పష్టమైన per-provider opt-in — list లో లేని ప్రతి ప్రొవైడర్కు
డిఫాల్ట్ path byte-for-byte మారకుండా ఉండటానికే ఇది ఉంది.

ఒక నియమం యొక్క `scope` (`model` / `provider` / `connection`) అనేది
`FULL_TEXT_RULE_PROVIDERS` నుండి వేరైన opt-in: `checkFallbackError` దాన్ని
`fallbackResult.ruleScope` గా మాత్రమే బహిర్గతం చేస్తుంది, మరియు అదే file లోని
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist లో ఉన్న ప్రొవైడర్లకు మాత్రమే
downstream consumers దాన్ని సమాచారాత్మక label కాకుండా మరేదైనదిగా గౌరవిస్తారు
(`honorsRuleLockScope()` ద్వారా నియంత్రించబడుతుంది — ప్రస్తుతం
`"agentrouter"` మాత్రమే). ఒక ప్రొవైడర్ ఆ allowlist లో చేరిన తర్వాత
`scope: "connection"` match నిజంగా ఏమి చేస్తుందో తెలుసుకోవడానికి పైన ఉన్న
"పునర్వ్యాఖ్యానించబడిన కోటా లోపాలు" చూడండి.

**#11104 — ఆపరేటర్ ప్రకటించిన నియమాలు రెండు అనుమతి జాబితాలనూ దాటవేస్తాయి.** ఈ ఫైల్ను సవరించకుండానే, ఒక ఆపరేటర్ రన్టైమ్లో `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ద్వారా ప్రతి ప్రొవైడర్కు ఒక నియమాన్ని ప్రకటించవచ్చు. అంతర్నిర్మిత క్యాటలాగ్ నియమాల
**డిఫాల్ట్** ప్రవర్తనను రక్షించడానికి ఉద్దేశించిన అనుమతి జాబితాలైన
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` వెనుక ఆపరేటర్
నియమాన్ని గేట్ చేస్తే, ఇప్పటికే వాటిలో జాబితా చేయబడిన ప్రొవైడర్లు మినహా ప్రతి
ప్రొవైడర్కూ సెట్టింగ్ల యంత్రాంగం పనిచేయకుండా పోతుంది, ఎందుకంటే నియమాన్ని
ప్రకటించడమే ఇప్పటికే ఆపరేటర్ ఇచ్చే స్పష్టమైన సమ్మతి. `resolveRuleMatchBody()`
మరియు `honorsRuleLockScope()` రెండూ ముందుగా `hasOperatorRuleForProvider()`ని
తనిఖీ చేస్తాయి: ఆపరేటర్ నియమం ఉన్న ప్రొవైడర్కు ముడి ఎర్రర్ టెక్స్ట్
అందుతుంది మరియు ఆ ప్రొవైడర్ ప్రకటించిన `scope` గౌరవించబడుతుంది; అది ఈ రెండు
అనుమతి జాబితాల్లో దేనిలోనైనా ఉందా లేదా అన్నది దీనిపై ప్రభావం చూపదు.

**తెలిసిన లోటు — HTTP 400 కోసం `providerRuleRegistry`ను ఎప్పుడూ సంప్రదించరు.**
`checkFallbackError`లోని `BAD_REQUEST` శాఖ, స్థితి 400ను పూర్తిగా తన స్వంత
నమూనా అరేల (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`
మొదలైనవి `accountFallback.ts`లో ఉన్నాయి) ద్వారా వర్గీకరిస్తుంది మరియు దాని
పైన ఉన్న `configuredRule`/`getProviderErrorRuleMatch` శాఖకు చేరకముందే
తిరిగి వస్తుంది. `status: 400` ఉన్న అంతర్నిర్మిత క్యాటలాగ్ నియమం (లేదా
ఆపరేటర్ నియమం) సింటాక్స్ పరంగా చెల్లుబాటు అవుతుంది, కానీ ఎప్పటికీ అమలు కాదు.
ప్రస్తుతం ఉన్న ఏ నియమమూ 400ను లక్ష్యంగా చేసుకోవడం లేదు, కాబట్టి ప్రొడక్షన్లో
ఏదీ ప్రభావితం కావడం లేదు — కానీ భవిష్యత్తులో 400 నియమాన్ని జోడించాలంటే ముందుగా
ఈ శాఖను మార్చాల్సి ఉంటుంది. ఇది కేవలం ఒక నియమాన్ని జోడించడం కంటే పెద్ద మార్పు
(నమూనా-అరే ప్రవర్తనపై ఇప్పటికే ఆధారపడుతున్న ప్రతి ప్రొవైడర్ కోసం 400ను ఇది
మళ్లీ వర్గీకరిస్తుంది), అందువల్ల ఒకే ప్రొవైడర్ నియమాన్ని జోడించే పరిధికి ఇది
వెలుపల ఉంటుంది.

### కోటాను తప్పుగా తెలిపే కొత్త గేట్వేను జోడించడం

1. `statusRestatementRegistry`లో
   (`open-sse/config/upstreamStatusRestatement.ts`) ఒక నియమ అరేను నమోదు
   చేయండి. `textMarkers`ను ప్రొవైడర్కు నిర్దిష్టంగా ఉంచండి;
   `CREDITS_EXHAUSTED_SIGNALS`తో (`open-sse/services/accountFallback.ts`)
   ఘర్షణ పడే సాధారణ ఆంగ్ల పదబంధాలను ఎప్పుడూ మళ్లీ ఉపయోగించవద్దు.
2. సరైన లాక్ స్కోప్ను ఎంచుకోవడానికి ఐచ్ఛికంగా
   `open-sse/config/providerErrorRules.ts`లో (`providerRuleRegistry`)
   వర్గీకరణ నియమాలను నమోదు చేయండి (ఖాతా-వ్యాప్త కోటా కోసం `connection`,
   ప్రతి-మోడల్ ఎర్రర్ల కోసం `model`). పూర్తి ఎర్రర్ టెక్స్ట్ అవసరమయ్యే
   నియమాలు ఉన్న ప్రొవైడర్లకు మాత్రమే ఈ దశ ప్రొడక్షన్లో ప్రభావం చూపుతుంది
   (బాడీ మార్కర్లు): అదే ఫైల్లోని `FULL_TEXT_RULE_PROVIDERS`కు ప్రొవైడర్
   idని జోడించండి — లేకపోతే `checkFallbackError` నియమానికి నిర్మితమైన
   `{code, type}` ఎర్రర్ను మాత్రమే అందిస్తుంది మరియు బాడీ-టెక్స్ట్ నియమం
   ప్రత్యక్ష ట్రాఫిక్తో ఎప్పటికీ సరిపోలదు. పూర్తిగా `status`/`headers`
   ఆధారంగానే సరిపోలే నియమాలకు (Opencode లేదా Minimax నియమాల వంటివి) ఈ
   సమ్మతి అవసరం లేదు. విడిగా, నియమం `scope: "connection"`ను ప్రకటించి,
   ఉద్దేశం కేవలం సమాచార లేబుల్ కాకుండా నిజమైన కనెక్షన్-వ్యాప్త కూల్డౌన్తో
   పాటు అదే-రిక్వెస్ట్ కాంబో స్కిప్ అయితే, అదే ఫైల్లోని
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`కు ప్రొవైడర్ idని జోడించండి — ఇదే
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) మరియు
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)లోని
   `isAgentrouterConnectionQuotaScope()`-శైలి వినియోగాన్ని గేట్ చేస్తుంది;
   ఇది లేకపోతే `scope` ఇప్పటికీ `fallbackResult.ruleScope` ద్వారా ప్రవహిస్తుంది,
   కానీ దానిపై ఎటువంటి చర్యా జరగదు.
3. `tests/unit/upstream-status-restatement.test.ts` మరియు
   `tests/unit/agentrouter-error-rules.test.ts`లను ప్రతిబింబించే యూనిట్
   పరీక్షలను జోడించండి (`not-permanent` / `not-creditsExhausted` గార్డ్లతో
   సహా; అలాగే — ప్రొవైడర్కు అనుమతి జాబితా అవసరమైతే —
   `resolveRuleMatchBody()` ఆ ప్రొవైడర్కు మాత్రమే పూర్తి టెక్స్ట్ను
   తిరిగి ఇస్తుందని నిర్ధారించే పరీక్షను జోడించండి).

`chatCore.ts`, `classifyError` లేదా కాంబోలో ఎటువంటి మార్పులూ అవసరం లేదు.

#### ఎగ్రెస్-బకెట్ ఆధారిత లాక్ (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`లోని ప్రొవైడర్లు (opencode కుటుంబం)
IP-బకెట్ ఆధారిత అప్స్ట్రీమ్గా పరిగణించబడతారు (opencode ఉచిత శ్రేణి
ఖాతా-బకెట్ ఆధారితం కాదు, IP-బకెట్ ఆధారితం — #9611 చూడండి): స్థితి-429ను
`quota_exhausted` **లేదా** `rate_limit_exceeded`గా వర్గీకరిస్తే,
రోటేషన్ వాటిని ప్రయత్నించకముందే విఫలమైన కనెక్షన్కు చివరిగా తెలిసిన ఎగ్రెస్
IPతో సరిపోలే ప్రతి అనుమతి-జాబితా కుటుంబ కనెక్షన్ను కూల్డౌన్లో ఉంచుతుంది
— తద్వారా తప్పకుండా విఫలమయ్యే N-1 అప్స్ట్రీమ్ కాల్లను నివారిస్తుంది
(#10460/#10525 ఆకృతికి సమానం). `rate_limit_exceeded`ను ఉద్దేశపూర్వకంగానే
చేర్చారు: `markAccountUnavailable` మార్గంలో opencode-నిర్దిష్ట నియమాలు
ఎప్పుడూ సరిపోలవు (`checkFallbackError`కు headers/body ఇవ్వబడవు, opencode
`FULL_TEXT_RULE_PROVIDERS`లో లేదు), కాబట్టి సబ్స్క్రిప్షన్-కోటా టెక్స్ట్
("monthly usage limit reached")ను బాడీలో కలిగిన 429, `status_429` నియమానికి
చేరకముందే కోటా-టెక్స్ట్ ఫాల్బ్యాక్ (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1h కూల్డౌన్) ద్వారా `quota_exhausted`గా
వర్గీకరించబడుతుంది — అయితే కోటా టెక్స్ట్ లేని 429 (సాధారణ రేట్ లిమిటింగ్)
`status_429` నియమం ద్వారా `rate_limit_exceeded`గా వర్గీకరించబడుతుంది మరియు
అప్పటికీ ఆ IP కుటుంబాన్ని కూల్డౌన్లో ఉంచుతుంది. అనుమతి జాబితాలోని
ప్రొవైడర్కు IP-బకెట్ ఆధారిత రేట్ లిమిట్ అనేది కోటా అయిపోయిందనే సంకేతంతో
సమానం. వాస్తవ పరిమితులు:

- **సాధ్యమైనంత ఉత్తమ ప్రయత్నం**: లాక్, కనెక్షన్కు చివరిగా తెలిసిన `egress_ip`ను
  `proxy_logs` నుంచి గుర్తిస్తుంది (24h విండో, సింక్రోనస్, క్యాష్ లేదు). కోల్డ్ క్యాష్ (egress
  IPను ఎప్పుడూ ప్రోబ్ చేయకపోవడం) లేదా రో లేకపోవడం → విఫలమైన కనెక్షన్ను ఇప్పటిలాగే
  బ్రాంచ్ కూల్డౌన్లో ఉంచుతుంది (ప్రస్తుత విధంగానే రికార్డ్ చేస్తుంది), కానీ ఏ సిబ్లింగ్నూ లాక్ చేయదు.
- **ఎప్పటికీ టెర్మినల్ కాదు**: కూల్డౌన్ అనేది పునరుద్ధరించబడే కోటా విండో
  (`testStatus: "unavailable"`); IP-స్థాయి సిగ్నల్ నుంచి శాశ్వత స్థితిని ఎప్పుడూ
  నిర్ధారించరు. `disableCooling` కనెక్షన్లు బ్రాంచ్ను పూర్తిగా దాటవేస్తాయి.
- **అనుమతించబడిన ఫ్యామిలీకి లాక్ గ్రాన్యులారిటీ మారుతుంది**: ఇది కేవలం
  సిబ్లింగ్ ఆప్టిమైజేషన్ మాత్రమే కాదు, స్కోప్ మార్పు. opencode ఒక `passthroughModels`
  ప్రొవైడర్, కాబట్టి ఈ బ్రాంచ్కు ముందు 429 ప్రతి-MODEL లాకౌట్ను సృష్టించేది; ఇప్పుడు అది
  కనెక్షన్ కూల్డౌన్ను సృష్టిస్తుంది — ఎలాంటి సిబ్లింగ్ లేకుండా ఒకే కనెక్షన్ను
  నడుపుతున్న ఆపరేటర్కు కూడా ఇది వర్తిస్తుంది. opencode రూల్ పట్టిక ఇప్పటికే సరైనదిగా
  ప్రకటించిన గ్రాన్యులారిటీ ఇదే (`scope: "connection"`,
  `providerErrorRules.ts`); అయితే opencode, `HONORS_RULE_LOCK_SCOPE_PROVIDERS`లో
  లేకపోవడం వల్ల ఇప్పటివరకు ఇది ఎప్పుడూ అమలు కాలేదు. కనెక్షన్-స్కోప్ గల
  agentrouter బ్రాంచ్ను అనుకరిస్తూ, ఈ బ్రాంచ్ విఫలమైన కనెక్షన్కు సంబంధించిన
  కూల్డౌన్ + `backoffLevel`ను స్వయంగా రాసి, రిటర్న్ అవుతుంది — దిగువనున్న ప్రతి-model
  బ్లాక్ మరియు సాధారణ పాత్ను ఎప్పుడూ చేరుకోదు.
- **కాంబో కూడా చేర్చబడింది**: agentrouter బ్రాంచ్ మాదిరిగానే, కాంబో కాలర్ 429కి
  వర్తింపజేసే `persistUnavailableState`/`isCombo` డౌన్గ్రేడ్ను ఈ స్కోప్ ఉద్దేశపూర్వకంగా
  విస్మరిస్తుంది. ప్రతి-model లాకౌట్ ఈ స్కోప్కు బలహీనమైన రూపం కాదు; అది తప్పు యూనిట్:
  ఖాళీ అయిన IP గురించి అది ఏమీ తెలియజేయదు, కాబట్టి కాంబో రొటేషన్ ప్రతి సిబ్లింగ్కు
  ఖచ్చితంగా విఫలమయ్యే ఒక్కో కాల్ను చేస్తూనే ఉంటుంది.
- **సిబ్లింగ్ భద్రత**: ఇప్పటికే టెర్మినల్ స్థితిలో ఉన్న (banned/credits_exhausted)
  లేదా ఇప్పటికే మరింత సుదీర్ఘ కూల్డౌన్లో ఉన్న సిబ్లింగ్ను ఎప్పుడూ ఓవర్రైట్ చేయరు.
- **ప్రత్యేక అనుమతి జాబితా**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ను విస్తరించడం అనేది
  స్పష్టమైన ఓనర్ నిర్ణయం; సాధారణ వైరింగ్ కాదు (pattern #10334/#10419). సిబ్లింగ్
  క్వెరీ అదే అనుమతి జాబితాను SQL లిటరల్గా పునరావృతం చేయకుండా బైండ్ చేస్తుంది, కాబట్టి
  దాన్ని విస్తరించడం ఒకే-లైన్ మార్పుగా ఉంటుంది.
- **Egress IP రొటేషన్, రెండు దిశల్లోనూ**: లుకప్ విండో (24h), egress-IP క్యాష్ TTL
  (5 min) కంటే చాలా పెద్దది, కాబట్టి "చివరిగా తెలిసిన IP" అనేది చరిత్ర, ప్రస్తుత స్థితి
  కాదు. విండోలోపల ఒక కనెక్షన్ ప్రాక్సీ రొటేట్ అయితే, నిజంగా షేర్ చేయబడిన IPని లాక్
  **మిస్ చేయవచ్చు** (రికార్డ్ చేసిన IP కొత్తది, ఇంకా ఖాళీ కానిది) — అదే విధంగా, ఖాళీ
  అయిన IP నుంచి అప్పటికే రొటేట్ అయి దూరమైన **సిబ్లింగ్ను కూల్డౌన్లో ఉంచవచ్చు**.
  రెండవ సందర్భంలో ఆ సిబ్లింగ్కు ఒక కూల్డౌన్ విండో ఖర్చవుతుంది; ఈ రెండింటినీ
  చరిత్ర-ఆధారిత లుకప్కు చెందిన ఆమోదించబడిన సాధ్యమైనంత-ఉత్తమ పరిమితులుగా పరిగణిస్తారు.
- **ఖర్చు**: `proxy_logs`పై రెండు పరిమిత స్కాన్లు (`idx_pl_timestamp` ద్వారా
  విండో-ఫిల్టర్ చేయబడినవి), అవి కూడా 429 సంభవించే ఫ్రీక్వెన్సీ వద్ద మాత్రమే. కొత్త
  ఇండెక్స్ లేదు (migration 134 YAGNI). మధ్యస్థ పరిమాణంలో ఉన్న నిజమైన-ట్రాఫిక్ DB
  కాపీపై కొలవబడింది; అధిక-త్రూపుట్ ఇన్స్టాన్స్ అదే విండోలో దానికి అనుపాతంగా ఎక్కువ
  రోలను కలిగి ఉంటుంది.

---

## ఇతర స్థితిస్థాపకత ఫీచర్లు

- **19 రూటింగ్ వ్యూహాలు** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) చూడండి.
- **రీసెట్-అవేర్ రూటింగ్** (v3.8.0) — కోటా రీసెట్ సమయం ఆధారంగా కనెక్షన్లకు ప్రాధాన్యత ఇస్తుంది.
- **బ్యాక్గ్రౌండ్ మోడ్ డీగ్రడేషన్** — Responses API `background: true` హెచ్చరికతో సింక్ మోడ్కు డీగ్రేడ్ చేయబడుతుంది.
- **డైనమిక్ టూల్ పరిమితి గుర్తింపు** — టూల్ల సంఖ్య పరిమితులను చేరుకున్నప్పుడు ప్రొవైడర్లను బ్యాక్ఆఫ్ చేస్తుంది.
- **అత్యవసర ఫాల్బ్యాక్** — `OMNIROUTE_EMERGENCY_FALLBACK` ద్వారా నియంత్రించబడుతుంది; ఆపరేటర్లు రీస్టార్ట్ చేయకుండానే Feature Flags పేజీ నుండి దీన్ని ఓవర్రైడ్ చేయగలరు.

---

## డీబగ్గింగ్

- వెయిటెడ్ కాంబో `503 all_targets_cooling_down`తో సమాధానమిస్తుంది (`Retry-After` సెట్ చేయబడి ఉంటుంది, `diagnostics.excluded`లో ప్రతి టార్గెట్ `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`తో జాబితా చేయబడుతుంది) → పూల్ కాన్ఫిగర్ చేయబడి, కనెక్ట్ అయి ఉంది; ప్రతి టార్గెట్ కేవలం ఒక రెసిలియెన్స్ టైమర్ కారణంగా మినహాయించబడింది; `[COMBO] Weighted selection: every target excluded before dispatch — …` హెచ్చరిక కారణాలను, మిగిలిన సెకన్లను తెలియజేస్తుంది. అదే కాంబో నుంచి వచ్చే `404 no_executable_targets` అంటే ఎలాంటి రెసిలియెన్స్ టైమర్ ప్రమేయం లేదని అర్థం (అమలు చేయడానికి ఏమీ లేదు లేదా ప్రతి అకౌంట్ అవైలబిలిటీ ప్రోబ్లో విఫలమైంది). `targetResolution.ts`లో సేకరించిన మినహాయింపుల ఆధారంగా `open-sse/services/combo/pinRecovery.ts`లో నిర్మించబడింది.
- ఒక ప్రొవైడర్కు సంబంధించిన అన్ని కీలు దాటవేయబడ్డాయి → సర్క్యూట్ బ్రేకర్ స్థితితో పాటు ప్రతి కనెక్షన్ యొక్క `rateLimitedUntil`/`testStatus`ను కూడా తనిఖీ చేయండి.
- రీసెట్ విండో తర్వాత కూడా ప్రొవైడర్ శాశ్వతంగా మినహాయించబడింది → కోడ్ `getStatus()`/`canExecute()`కు బదులుగా ముడి `state`ను చదువుతోంది.
- ఒక కీ విఫలమైనా, మిగిలినవి పని చేయాలి → సర్క్యూట్ బ్రేకర్కు బదులుగా కనెక్షన్ కూల్డౌన్కు ప్రాధాన్యం ఇవ్వండి.
- ఒక్క మోడల్ మాత్రమే విఫలమవుతోంది → కనెక్షన్ కూల్డౌన్కు బదులుగా మోడల్ లాకౌట్కు ప్రాధాన్యం ఇవ్వండి.
- స్థితి స్వయంగా రికవర్ కావాలి కానీ కావడం లేదు → భవిష్యత్ టైమ్స్టాంప్తో పాటు గడువు ముగిసిన స్థితిని రిఫ్రెష్ చేసే రీడ్ పాత్ను తనిఖీ చేయండి. శాశ్వత స్టేటస్లకు మాన్యువల్ మార్పులు అవసరం.

---

## TLS ఫింగర్ప్రింటింగ్ & స్టెల్త్

ప్రొవైడర్-నిర్దిష్ట స్టెల్త్ (JA3/JA4, CCH, obfuscation) విడిగా డాక్యుమెంట్ చేయబడింది — `docs/security/STEALTH_GUIDE.md` చూడండి (gitలో ఉంది; `/docs`లోకి కంపైల్ చేయబడదు).

---

## స్థితిస్థాపకత పరీక్ష (Phase 8 · Block C)

స్థితిస్థాపకత లాజిక్కు సంబంధించిన యూనిట్ పరీక్షలకు అదనంగా, మూడు పరీక్షలు వాస్తవ
ఒత్తిడి/వైఫల్య పరిస్థితుల్లో రన్టైమ్ను పరీక్షిస్తాయి (అన్నీ integration/nightly — ఏవీ PRలను నిరోధించవు):

| పరీక్ష      | పరీక్షించేది                                                                                                                                                                                                            | అమలు                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | నకిలీ అప్స్ట్రీమ్ నోడ్ వాస్తవ latency/reset/timeout/503ను ప్రవేశపెడుతుంది; సర్క్యూట్ బ్రేకర్ తెరుచుకోవడం/పునరుద్ధరించబడటం మరియు `checkFallbackError` 503ను పునరుద్ధరించగల ఫాల్బ్యాక్గా వర్గీకరించడాన్ని ధృవీకరిస్తుంది. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` కింద ప్రతి `createSSEStream`కు ~500 స్ట్రీమ్లు; హీప్ గరిష్ఠ పరిమితిని మించి పెరిగితే విఫలమవుతుంది (OOM గార్డ్ #3069).                                                                                     | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health`పై నిరంతర లోడ్; p95/ఎర్రర్ థ్రెషోల్డ్లు.                                                                                                                                                        | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) ద్వారా ఆర్కెస్ట్రేట్ చేయబడుతుంది. డిఫాల్ట్
`test:integration`లో, chaos మరియు heap పరీక్షలు (`RUN_CHAOS_INT`/`--expose-gc` లేకుండా) స్వయంగా దాటవేయబడతాయి.

---

## ఇవి కూడా చూడండి

- [ఆర్కిటెక్చర్ గైడ్](./ARCHITECTURE.md) — సిస్టమ్ ఆర్కిటెక్చర్ మరియు అంతర్గత అంశాలు
- [వినియోగదారు గైడ్](../guides/USER_GUIDE.md) — ప్రొవైడర్లు, కాంబోలు, CLI ఇంటిగ్రేషన్
- [ఆటో-కాంబో ఇంజిన్](../routing/AUTO-COMBO.md) — 16-కారకాల స్కోరింగ్, మోడ్ ప్యాక్లు
