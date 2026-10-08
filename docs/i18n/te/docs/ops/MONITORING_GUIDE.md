# Monitoring & Observability Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute అంతర్నిర్మిత ఆరోగ్య పర్యవేక్షణ, ప్రొవైడర్ ఆటోపైలట్, కోటా ట్రాకింగ్ మరియు పరిశీలనీయత హుక్స్తో అందించబడుతుంది. ఈ గైడ్ డ్యాష్బోర్డ్, హెచ్చరికలు మరియు సమస్య పరిష్కారాన్ని వివరిస్తుంది.

**మూలాలు:**

- `src/lib/monitoring/observability.ts` — పరిశీలనీయత స్నాప్షాట్
- `src/lib/monitoring/comboHealthAutopilot.ts` — కాంబో ఆరోగ్య ఆటోపైలట్
- `src/lib/monitoring/providerHealthAutopilot.ts` — ప్రొవైడర్ ఆటోపైలట్
- `src/lib/monitoring/providerHealthMatrix.ts` — ప్రొవైడర్ ఆరోగ్య మ్యాట్రిక్స్
- `src/lib/localHealthCheck.ts` — స్థానిక ఆరోగ్య తనిఖీ
- `src/lib/tokenHealthCheck.ts` — టోకెన్ రిఫ్రెష్ ఆరోగ్యం
- `src/lib/proxyHealth.ts` — ప్రాక్సీ ఆరోగ్య క్యాష్ (PROXY_GUIDE.mdలో వివరించబడింది)

---

## అవలోకనం

OmniRouteలో **3 పర్యవేక్షణ లేయర్లు** ఉన్నాయి:

```
┌──────────────────────────────────────────────────────────────┐
│  లేయర్ 1: సిస్టమ్ ఆరోగ్యం (సర్వర్ స్థాయి)                     │
│  ├─ localHealthCheck.ts — DB, పోర్ట్లు, నేటివ్ డిపెండెన్సీలు │
│  ├─ db/healthCheck.ts — సమగ్రత, FK, అనాథ ఆర్టిఫాక్ట్లు       │
│  └─ డ్యాష్బోర్డ్: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  లేయర్ 2: ప్రొవైడర్ ఆరోగ్యం (ప్రతి ప్రొవైడర్కు స్థితిస్థాపకత) │
│  ├─ providerHealthAutopilot.ts — సర్క్యూట్ బ్రేకర్, కూల్డౌన్లు │
│  ├─ providerHealthMatrix.ts — ప్రొవైడర్/మోడల్ వారీగా ఆరోగ్య స్కోర్లు │
│  └─ డ్యాష్బోర్డ్: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  లేయర్ 3: ప్రత్యక్ష పరిశీలనీయత (రన్టైమ్ స్నాప్షాట్లు)       │
│  ├─ observability.ts — సర్క్యూట్ బ్రేకర్లు, సెషన్లు, కోటా    │
│  ├─ tokenHealthCheck.ts — OAuth టోకెన్ రిఫ్రెష్ ఆరోగ్యం       │
│  └─ MCP సాధనాలు: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## డ్యాష్బోర్డ్ పేజీలు

### `/dashboard/health` (సిస్టమ్ ఆరోగ్యం)

అగ్ర-స్థాయి ఆరోగ్య డ్యాష్బోర్డ్ వీటిని చూపుతుంది:

| విభాగం                | ఇది చూపించేది                                                |
| --------------------- | ------------------------------------------------------------ |
| **సర్వర్ స్థితి**     | అప్టైమ్, వెర్షన్, పోర్ట్, సక్రియ కనెక్షన్లు                  |
| **డేటాబేస్**          | కనెక్షన్, సమగ్రత, WAL పరిమాణం, ఇటీవలి మైగ్రేషన్లు            |
| **ప్రొవైడర్ సారాంశం** | సక్రియ సంఖ్య, ఆరోగ్యకరమైన వాటి సంఖ్య, తెరిచిన బ్రేకర్ల సంఖ్య |
| **కోటా మానిటర్లు**    | సక్రియ సెషన్లు, హెచ్చరిక స్థితి, పరిమితి పూర్తయినవి          |
| **ఇటీవలి లోపాలు**     | స్టాక్ ట్రేస్లతో చివరి 10 లోపాలు                             |
| **వనరుల వినియోగం**    | మెమరీ, CPU, హీప్ ఒత్తిడి సూచిక                               |

### `/dashboard/providers` (ప్రొవైడర్ ఆరోగ్యం)

ప్రతి ప్రొవైడర్కు సంబంధించిన డ్యాష్బోర్డ్:

| కాలమ్      | వివరణ                                        |
| ---------- | -------------------------------------------- |
| ప్రొవైడర్  | ప్రొవైడర్ ID + ప్రదర్శన పేరు                 |
| ఆరోగ్యం    | ఆకుపచ్చ/పసుపు/ఎరుపు స్థితి                   |
| సర్క్యూట్  | తెరిచి/మూసి/పాక్షికంగా తెరిచిన స్థితి        |
| కనెక్షన్లు | కనెక్షన్ల సంఖ్య, చివరి రిఫ్రెష్              |
| మోడల్లు    | అందుబాటులో ఉన్న మోడల్లు, ప్రతి మోడల్ ఆరోగ్యం |
| ఖర్చు      | నేటి ఖర్చు, 7-రోజుల ట్రెండ్                  |
| లోపాలు     | గత 24 గంటల లోపాల సంఖ్య, అగ్ర లోప తరగతి       |

కింది వివరాలను చూడటానికి ఒక ప్రొవైడర్పై క్లిక్ చేయండి:

- లేటెన్సీ విభజనతో ఇటీవలి అభ్యర్థనలు
- ప్రతి కనెక్షన్కు సంబంధించిన ఆరోగ్య స్కోర్లు
- ప్రతి మోడల్కు సంబంధించిన లాక్అవుట్లు
- ఆటోపైలట్ సిఫార్సులు

### `/dashboard/quota` (కోటా ట్రాకింగ్)

ప్రతి API కీ కోసం:

- పరిమితితో పోలిస్తే ప్రస్తుత వినియోగం (ప్రోగ్రెస్ బార్)
- కోటా ట్రెండ్ (30-రోజుల చార్ట్)
- తదుపరి రీసెట్ సమయం
- హెచ్చరిక చరిత్ర

### `/dashboard/combos` (కాంబో ఆరోగ్యం)

ప్రతి కాంబోకు:

- వ్యూహం + లక్ష్యాలు
- ప్రతి లక్ష్యానికి సంబంధించిన ఆరోగ్యం
- ఇటీవలి ఫాల్బ్యాక్ ఈవెంట్లు
- విజయ రేటు (24గం, 7రోజులు, 30రోజులు)

---

## హెల్త్ చెక్ API

OmniRoute **రెండు** HTTP హెల్త్ ఉపరితలాలను అందిస్తుంది. ఆర్కెస్ట్రేటర్ల కోసం వీటిని పరస్పరం మార్చి ఉపయోగించకూడదు.

| పాత్                         | ఉద్దేశ్యం                                                        | భారం                              | దీని కోసం ఉపయోగించండి                                                             |
| ---------------------------- | ---------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| `GET /healthz`               | లైఫ్సైకిల్ లైవ్నెస్/రెడీనెస్ (`ok` / `starting` / `stopping`)    | అతి స్వల్పం (ఫేజ్ ఫ్లాగ్ మాత్రమే) | Kubernetes **రెడీనెస్**; HTTP తప్పనిసరిగా ఉపయోగించాల్సి వస్తే సాఫ్ట్ **లైవ్నెస్** |
| `GET /api/monitoring/health` | సమగ్ర సిస్టమ్ + ప్రొవైడర్ సారాంశం (DB, హీప్, కేటలాగ్ లెక్కలు, …) | అధికం (సింక్ DB / మానిటరింగ్ పని) | డ్యాష్బోర్డులు, బ్లాక్బాక్స్ సమగ్ర తనిఖీలు, Docker అంతర్నిర్మిత హెల్త్చెక్        |

> **గమనిక:** ప్రొవైడర్ హెల్త్ మ్యాట్రిక్స్లు, ఆటోపైలట్ సమస్యలు, కోటా మానిటర్లు, టోకెన్ హెల్త్ మరియు `/api/monitoring/health`కు మించిన లేటెన్సీ వివరాలు **MCP టూల్** `observability_snapshot` లేదా **డ్యాష్బోర్డ్** పేజీల ద్వారా అందుబాటులో ఉంటాయి — వాటి కోసం ప్రత్యేక REST రూట్లు లేవు.

రెండు రూట్లూ రిక్వెస్ట్ హ్యాండ్లింగ్ ఉపయోగించే **అదే Node ఈవెంట్ లూప్**లో నడుస్తాయి. CPU-బౌండ్ పాత్ (పెద్ద `GET /v1/models` కేటలాగ్ పని, దీర్ఘ-కాంటెక్స్ట్ కంప్రెషన్ / టోకెన్ లెక్కింపు) `/healthz`తో సహా **అన్ని** HTTP హ్యాండ్లర్లను ఆలస్యం చేయగలదు. ఈవెంట్ లూప్ బిజీగా ఉండటం ≠ ప్రాసెస్ నిలిచిపోవడం. వనరులను అధికంగా వినియోగించే పనిని సరిచేయడానికే ప్రాధాన్యం ఇవ్వండి; ప్రోబ్ ట్యూనింగ్ తప్పుడు కిల్లను మాత్రమే తగ్గిస్తుంది.

### తేలికపాటి ఆర్కెస్ట్రేటర్ ప్రోబ్

```bash
GET /healthz
# లేదా HEAD /healthz
```

- సర్వర్ లైఫ్సైకిల్ ఫేజ్ సిద్ధంగా ఉన్నప్పుడు **200** + బాడీ `ok`
- బూట్ లేదా షట్డౌన్ సమయంలో **503** + `starting` / `stopping`
- ఇంప్లిమెంటేషన్: `src/app/healthz/route.ts` (DB పింగ్ లేదు)

### సిస్టమ్ హెల్త్ (సమగ్రం)

```bash
GET /api/monitoring/health
```

రెస్పాన్స్:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: ప్రోబ్-క్యాష్ vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` అనేది **ఇన్-మెమరీ ప్రోబ్-క్యాష్
గేజ్**, `provider_connections.test_status` యొక్క లైవ్ డంప్ కాదు. #12532 తర్వాత
రిక్వెస్ట్ పాత్ `getCachedCredentialHealthSummary()`ను మాత్రమే చదువుతుంది; బ్యాక్గ్రౌండ్ ప్రోబ్లు
ఈవెంట్ లూప్కు వెలుపల క్యాష్ను రిఫ్రెష్ చేస్తాయి.

| లేయర్                    | ఎక్కడ                                                                 | దాని అర్థం                                                                                                                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ప్రోబ్-క్యాష్ గేజ్       | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ప్రాసెస్ మెమరీలో ఇంకా నిల్వ ఉన్న చివరి క్రెడెన్షియల్-హెల్త్ ప్రోబ్ ఫలితాలు. `source` ఎల్లప్పుడూ `probe-cache`గా ఉంటుంది.                                                                                                                |
| విఫలమైన కనెక్షన్ వివరాలు | `credentialHealth.failedConnections`                                  | **`failed > 0` అయినప్పుడు మాత్రమే** ఉంటుంది. `status=error` కలిగిన క్యాష్ రోల పరిమిత జాబితా (`connectionId`, `status`, శానిటైజ్ చేసిన `lastError` / `lastErrorType`). జాబితాపై పరిమితి విధించినప్పుడు `failedOmitted` సెట్ చేయబడుతుంది. |
| SQLite స్టికీ స్టేటస్    | `credentialHealth.staleDbNonOkCount`                                  | పెర్సిస్ట్ చేసిన `test_status` తెలిసిన non-ok విలువ (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)గా ఉన్న **యాక్టివ్** (`is_active=1`) కనెక్షన్ రోల సంఖ్య.                                           |

ఈ రెండు లేయర్లు ఉద్దేశపూర్వకంగానే భిన్నంగా ఉండవచ్చు:

- గేజ్ `failed=0`గా ఉండగా `staleDbNonOkCount>0` — తాజా
  ప్రోబ్-క్యాష్ స్నాప్షాట్ `status=error`గా లెక్కించని స్టికీ
  `test_status` (ఉదాహరణకు `expired` లేదా `credits_exhausted`) ఇప్పటికీ SQLiteలో ఉంది.
- గేజ్ `failed>0`గా ఉండగా SQLite హెల్తీగా కనిపించడం — ఇటీవలి ప్రోబ్ విఫలమై
  క్యాష్ చేయబడింది; DB రో ఇంకా అప్డేట్ కాలేదు లేదా తర్వాత క్లియర్ చేయబడింది.

ఈ ఎండ్పాయింట్ను స్క్రేప్ చేస్తున్నప్పుడు కేవలం `provider_connections.test_status` ఆధారంగా
అలర్ట్ చేయవద్దు. లైవ్ ప్రోబ్ వైఫల్యాల కోసం `failed` + `failedConnections`ను,
పెర్సిస్ట్ చేసిన స్టికీ-స్టేటస్ సంఖ్య అవసరమైనప్పుడు `staleDbNonOkCount`ను ఉపయోగించండి.

### Kubernetes ప్రోబ్ సిఫార్సులు

OmniRoute అనేది **ఒకే Node ప్రాసెస్** (ఒక ఈవెంట్ లూప్). ప్రామాణిక Docker `HEALTHCHECK` తేలికపాటి `/healthz`ను లక్ష్యంగా చేసుకుంటుంది. kubelet లైవ్నెస్ ఇంటర్వల్ల కోసం `/api/monitoring/health` **చాలా భారమైనది**.

| ప్రోబ్                 | సిఫార్సు చేసిన లక్ష్యం                                                             | గమనికలు                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ప్రారంభం**           | సుదీర్ఘ `failureThreshold` (లేదా పెద్ద `startPeriod`)తో HTTP `GET /healthz`        | కోల్డ్ స్టార్ట్ + SQLite మైగ్రేషన్కు కొన్ని సెకన్ల కంటే ఎక్కువ సమయం పట్టవచ్చు                                                                                                                                                                                                                                                                                                                   |
| **సిద్ధత**             | HTTP `GET /healthz`                                                                | లైఫ్సైకిల్ `ok` / `starting` / `stopping` (200 వర్సెస్ 503). లూప్ CPU వల్ల బ్లాక్ అయితే ఇప్పటికీ అస్థిరంగా మారుతుంది. **ప్రతిస్పందనకు అనేక సెకన్లు పట్టే 200 ఆరోగ్యకరమైనది కాదు** (#10303) — 3-బైట్ హ్యాండ్లర్ అమలు కావడానికి ముందు ఈవెంట్ లూప్కు వనరులు అందలేదని దీని అర్థం                                                                                                                    |
| **సజీవత**              | HTTP `GET /livez`, **లేదా ప్రధాన సర్వీస్ పోర్ట్పై TCP** (`PORT`, డిఫాల్ట్ `20128`) | `/livez` కేవలం ప్రాసెస్ సజీవంగా ఉందో లేదో మాత్రమే చూపుతుంది (హ్యాండ్లర్ అమలైతే ఎల్లప్పుడూ 200). ఇది కూడా అదే ఈవెంట్ లూప్ను పంచుకుంటుంది — బిజీ ≠ డెడ్, అలాగే ఇది TCP కంటే మెరుగ్గా ఈవెంట్-లూప్ వనరుల కొరతను (#10303) గుర్తించదు. కేటలాగ్/కంప్రెషన్ లోడ్లో HTTP ప్రోబ్లు టైమ్ అవుట్ అయితే **TCP**ని ఎంచుకోండి; ఏ పద్ధతిలోనైనా స్వల్పకాలిక ఈవెంట్-లూప్ నిలిచిపోవడాల కారణంగా పాడ్ను నిలిపివేయవద్దు |
| **లోతైన ఆరోగ్య తనిఖీ** | బాహ్య చెకర్ నుండి `GET /api/monitoring/health`                                     | kubelet `livenessProbe` / తక్కువ విరామం గల `readinessProbe` కోసం కాదు                                                                                                                                                                                                                                                                                                                           |

నమూనా ఆకృతి (మీ కోల్డ్-స్టార్ట్ మరియు కంప్రెషన్ లోడ్కు అనుగుణంగా థ్రెషోల్డ్లను సర్దుబాటు చేయండి):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # ఈవెంట్-లూప్ నిలిచిపోయినప్పుడు HTTP /livez కూడా టైమ్ అవుట్ కావచ్చు. TCP అనేది
  # మరింత సురక్షితమైన ప్రత్యామ్నాయం:
  # tcpSocket:
  #   port: http
```

kubelet **సజీవత** తనిఖీని `/api/monitoring/health`కు సూచించవద్దు. ఆ పాత్ వాస్తవ DB/మానిటరింగ్ పనిని చేస్తుంది, కాబట్టి లోడ్లో తప్పుడు పాజిటివ్లను ఇస్తుంది.

సంబంధితవి: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ఈవెంట్ లూప్ బిజీగా ఉన్నప్పుడు ప్రోబ్లు), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (కేటలాగ్ ధరల నిర్ధారణ వల్ల వనరుల అధిక వినియోగం), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (కంప్రెషన్ టోకెన్ లెక్కింపు వల్ల వనరుల అధిక వినియోగం).

### ఐచ్ఛిక రిక్వెస్ట్-పాత్ పని (మెమరీ, స్కిల్స్, టోకెన్ రిఫ్రెష్)

మెమరీ ఎక్స్ట్రాక్షన్, స్కిల్స్ ఇంజెక్షన్ మరియు OAuth టోకెన్ రిఫ్రెష్ అనేవి `/healthz`తో **ప్రధాన Node ఈవెంట్ లూప్**ను పంచుకుంటాయి. అవి డ్యాష్బోర్డ్-టాగుల్ ఫీచర్లు (`memoryEnabled`, `skillsEnabled`), వర్కర్ పూల్ కాదు. [ఎన్విరాన్మెంట్ — ఈవెంట్-లూప్ వ్యయం](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) చూడండి.

### ప్రొవైడర్ ఆరోగ్యం

> **REST ఎండ్పాయింట్ లేదు.** ప్రొవైడర్ ఆరోగ్య డేటా MCP టూల్ `observability_snapshot` లేదా డ్యాష్బోర్డ్ `/dashboard/providers` పేజీ ద్వారా అందుబాటులో ఉంటుంది.

### ప్రొవైడర్ వివరాలు

> **REST ఎండ్పాయింట్ లేదు.** ఒక్కో ప్రొవైడర్కు సంబంధించిన వివరాలు డ్యాష్బోర్డ్ `/dashboard/providers` పేజీ ద్వారా అందుబాటులో ఉంటాయి.

---

## ప్రొవైడర్ హెల్త్ ఆటోపైలట్

`providerHealthAutopilot.ts` మాడ్యూల్ ఒక **స్వీయ-స్వస్థత వ్యవస్థ**, ఇది:

1. ప్రొవైడర్ సమస్యలను గుర్తిస్తుంది (సర్క్యూట్ తెరుచుకోవడం, కూల్డౌన్లు, లాక్అవుట్లు, కోటా హెచ్చరికలు)
2. వాటిని పరిష్కరించడానికి **సిఫార్సు చేసిన చర్యలను** రూపొందిస్తుంది
3. ఐచ్ఛికంగా తక్కువ-ప్రమాదం గల చర్యలను **స్వయంచాలకంగా అమలు చేస్తుంది**

### గుర్తించబడే సమస్య రకాలు

| సమస్య రకం                    | తీవ్రత       | ఉదాహరణ పరిస్థితి                                |
| ---------------------------- | ------------ | ----------------------------------------------- |
| `provider_circuit_open`      | క్లిష్టమైనది | 5 వైఫల్యాల తర్వాత సర్క్యూట్ బ్రేకర్ తెరుచుకుంది |
| `provider_circuit_half_open` | హెచ్చరిక     | సర్క్యూట్ పునరుద్ధరణను పరీక్షిస్తోంది           |
| `connection_cooldown`        | హెచ్చరిక     | 429 తర్వాత కనెక్షన్ కూల్డౌన్లో ఉంది             |
| `stale_connection_error`     | హెచ్చరిక     | చివరి రిఫ్రెష్ 30+ నిమిషాల క్రితం విఫలమైంది     |
| `terminal_connection_error`  | క్లిష్టమైనది | OAuth రద్దు చేయబడింది, కీ చెల్లదు               |
| `inactive_connection`        | సమాచారం      | సెట్టింగ్లలో కనెక్షన్ నిలిపివేయబడింది           |
| `model_lockout`              | హెచ్చరిక     | నిర్దిష్ట మోడల్ క్వారంటైన్లో ఉంది               |
| `quota_monitor_warning`      | హెచ్చరిక     | కోటా వినియోగం 80%+ వద్ద ఉంది                    |

### రూపొందించబడే చర్య రకాలు

| చర్య                           | ప్రమాదం  | వివరణ                                            |
| ------------------------------ | -------- | ------------------------------------------------ |
| `clear_provider_breaker`       | మధ్యస్థం | సర్క్యూట్ బ్రేకర్ను మూసిన స్థితికి రీసెట్ చేయండి |
| `clear_connection_cooldown`    | తక్కువ   | కనెక్షన్ నుండి కూల్డౌన్ను తొలగించండి             |
| `clear_stale_connection_error` | తక్కువ   | పాత ఎర్రర్ ఫ్లాగ్ను క్లియర్ చేయండి               |
| `clear_model_lockout`          | తక్కువ   | క్వారంటైన్లో ఉన్న మోడల్ను మళ్లీ ప్రారంభించండి    |
| `reactivate_connection`        | మధ్యస్థం | నిష్క్రియం చేసిన కనెక్షన్ను మళ్లీ ప్రారంభించండి  |
| `deactivate_connection`        | అధికం    | సమస్యాత్మక కనెక్షన్ను నిలిపివేయండి               |

### API

> **REST ఎండ్పాయింట్ లేదు.** ఆటోపైలట్ సమస్యలు MCP సాధనం `observability_snapshot` లేదా డాష్బోర్డ్ ద్వారా అందుబాటులో ఉంటాయి. ఆటోపైలట్ అంతర్గతంగా నడుస్తుంది; దాని ప్రవర్తన పర్యావరణ వేరియబుల్స్ ద్వారా కాకుండా సెట్టింగ్ల DBలో (ప్రతి-కనెక్షన్ `autopilotMode` ఫీల్డ్) కాన్ఫిగర్ చేయబడుతుంది — ఆటోపైలట్-మోడ్ env var కోసం `grep -rn` సున్నా ఫలితాలను అందిస్తుంది.

### ఆటోపైలట్ మోడ్

ఆటోపైలట్ డిఫాల్ట్గా **మాన్యువల్ మోడ్**లో పనిచేస్తుంది — ఇది సమస్యలను గుర్తించి సిఫార్సు చేసిన చర్యలను రూపొందిస్తుంది, కానీ వాటిని స్వయంచాలకంగా వర్తింపజేయదు. చర్యలను డాష్బోర్డ్ ద్వారా వర్తింపజేయవచ్చు.

---

## కాంబో హెల్త్ ఆటోపైలట్

`comboHealthAutopilot.ts` అనేది ప్రొవైడర్ ఆటోపైలట్కు **కాంబో-నిర్దిష్ట** సమానమైనది. ఇది:

- అనారోగ్యకరమైన కాంబోలను గుర్తిస్తుంది
- టార్గెట్లను తిరిగి క్రమబద్ధీకరించాలని సిఫార్సు చేస్తుంది
- పని చేయని టార్గెట్లను నిలిపివేయాలని సూచిస్తుంది
- N వైఫల్యాల తర్వాత పనిచేయని టార్గెట్లను స్వయంచాలకంగా తొలగిస్తుంది

### కాంబో సమస్య ఉదాహరణలు

```
కాంబో "always-on" (ప్రాధాన్యత వ్యూహం)
├─ టార్గెట్ 1: openai/gpt-5 (ఆరోగ్యకరం)
├─ టార్గెట్ 2: anthropic/claude-opus-4-6 (⚠️ 14:00 వరకు మోడల్ లాక్అవుట్)
└─ టార్గెట్ 3: kiro/claude-sonnet-4-5 (ఆరోగ్యకరం)

సిఫార్సు చేసిన చర్య: తిరిగి క్రమబద్ధీకరించండి — లాక్అవుట్ గడువు ముగిసే వరకు kiroను anthropic కంటే పైకి తరలించండి
```

---

## కోటా మానిటర్లు

`observability.ts` సబ్స్క్రిప్షన్ ప్రొవైడర్ల (Claude Code, Codex, GitHub Copilot) కోసం **ప్రతి-సెషన్ కోటా మానిటర్లను** అందిస్తుంది:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### స్థితుల అర్థాలు

| స్థితి      | ఎప్పుడు                          | UI చర్య                                      |
| ----------- | -------------------------------- | -------------------------------------------- |
| `starting`  | ప్రారంభ పోలింగ్ కొనసాగుతోంది     | స్పిన్నర్                                    |
| `idle`      | ఇటీవలి కార్యకలాపం లేదు           | డాష్బోర్డ్ నుండి దాచబడుతుంది                 |
| `healthy`   | 50% కంటే ఎక్కువ కోటా మిగిలి ఉంది | ఆకుపచ్చ బిందువు                              |
| `warning`   | 50% కంటే తక్కువ కోటా మిగిలి ఉంది | పసుపు హెచ్చరిక                               |
| `exhausted` | కోటా = 0%                        | ఎరుపు బ్లాక్, తదుపరి ప్రొవైడర్కు రూట్ చేయండి |
| `error`     | పోలింగ్ విఫలమైంది                | ఎరుపు బిందువు, త్వరలో మళ్లీ ప్రయత్నించండి    |

### API

> **REST ఎండ్పాయింట్ లేదు.** కోటా మానిటర్ డేటా MCP సాధనం `observability_snapshot` లేదా డాష్బోర్డ్ ద్వారా అందుబాటులో ఉంటుంది.

---

## పరిశీలనీయత స్నాప్షాట్

MCP సాధనం `observability_snapshot`, AI ఏజెంట్ల కోసం **పూర్తి సిస్టమ్ స్నాప్షాట్ను** అందిస్తుంది:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* పైన చూడండి */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ఏజెంట్లు **రూటింగ్ నిర్ణయాలు** తీసుకోవడానికి దీనిని ఉపయోగిస్తారు — ఉదాహరణకు, "openai సర్క్యూట్ తెరిచి ఉంటే, ముందుగా anthropicకు రూట్ చేయండి".

---

## టోకెన్ ఆరోగ్య తనిఖీ

OAuth ప్రొవైడర్లకు (Claude Code, GitHub Copilot, Cursor) **కాలానుగుణ టోకెన్ రిఫ్రెష్** అవసరం. `src/lib/tokenHealthCheck.ts` నేపథ్యంలో షెడ్యూలర్ను అమలు చేస్తుంది:

- **స్వీప్ టిక్**: ప్రతి 60 సెకన్లకు (`src/lib/tokenHealthCheck.ts:30` వద్ద `TICK_MS = 60 * 1000`లో స్వీప్)
- **ఒక్కో కనెక్షన్ ఆరోగ్య తనిఖీ విరామం**: డిఫాల్ట్గా 60 నిమిషాలు (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); సెట్టింగ్ల DB ద్వారా కాన్ఫిగర్ చేయవచ్చు
- **401పై ముందస్తు రిఫ్రెష్**: ఒక్కో కనెక్షన్ ఇంటర్సెప్టర్ ద్వారా నిర్వహించబడుతుంది

### టోకెన్ ఆరోగ్య స్థితి

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### కాన్ఫిగరేషన్

టోకెన్ ఆరోగ్య తనిఖీ కాన్ఫిగరేషన్ను `tokenHealthCheck.ts` అంతర్గతంగా నిర్వహిస్తుంది.

### టోకెన్ ఆరోగ్యం

> **REST ఎండ్పాయింట్ లేదు.** టోకెన్ ఆరోగ్య డేటా డ్యాష్బోర్డ్ లేదా MCP సాధనం `observability_snapshot` ద్వారా అందుబాటులో ఉంటుంది.

---

## హెచ్చరికలు

### అంతర్నిర్మిత ఛానెల్లు

OmniRoute **3 హెచ్చరిక ఛానెల్లకు** మద్దతు ఇస్తుంది:

| ఛానెల్               | సెటప్                    | వినియోగ సందర్భం            |
| -------------------- | ------------------------ | -------------------------- |
| డ్యాష్బోర్డ్ బ్యానర్ | ఎల్లప్పుడూ ఆన్లో ఉంటుంది | యాప్లోని నోటిఫికేషన్లు     |
| Webhook              | URLను కాన్ఫిగర్ చేయండి   | Slack, Discord, PagerDuty  |
| లాగ్                 | డిఫాల్ట్                 | బాహ్య లాగ్ అగ్రిగేషన్ కోసం |

### Webhook కాన్ఫిగరేషన్

> **గమనిక:** Webhook హెచ్చరిక కాన్ఫిగరేషన్ డ్యాష్బోర్డ్లోని Settings పేజీ ద్వారా నిర్వహించబడుతుంది. Webhook URL, ఈవెంట్ ఫిల్టరింగ్ మరియు పేలోడ్ అనుకూలీకరణ కోసం Settings UIను చూడండి.

### హెచ్చరిక రకాలు

| హెచ్చరిక                     | ఎప్పుడు                                              | డిఫాల్ట్ తీవ్రత |
| ---------------------------- | ---------------------------------------------------- | --------------- |
| `provider_circuit_open`      | సర్క్యూట్ తెరుచుకున్నప్పుడు                          | క్లిష్టమైనది    |
| `provider_circuit_half_open` | సర్క్యూట్ పునరుద్ధరణను పరీక్షిస్తున్నప్పుడు          | సమాచారం         |
| `quota_warning`              | కోటా 80%+ వద్ద ఉన్నప్పుడు                            | హెచ్చరిక        |
| `quota_exhausted`            | కోటా 100% వద్ద ఉన్నప్పుడు                            | క్లిష్టమైనది    |
| `token_refresh_failed`       | వరుసగా 3+ రిఫ్రెష్ వైఫల్యాలు సంభవించినప్పుడు         | హెచ్చరిక        |
| `token_expired`              | టోకెన్ గడువు ముగిసినప్పుడు                           | క్లిష్టమైనది    |
| `combo_target_unhealthy`     | కాంబో లక్ష్యం 1గం+ పాటు కూల్డౌన్లో ఉన్నప్పుడు        | హెచ్చరిక        |
| `db_integrity_warning`       | FK ఉల్లంఘనలు > 0 ఉన్నప్పుడు                          | హెచ్చరిక        |
| `heap_pressure`              | హీప్ వినియోగం పరిమితిలో 80% కంటే ఎక్కువగా ఉన్నప్పుడు | హెచ్చరిక        |

---

## పనితీరు మెట్రిక్లు

### ట్రాక్ చేయబడే మెట్రిక్లు

| మెట్రిక్                | రకం          | మూలం                            |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | కౌంటర్       | `services/usage.ts`             |
| `request_latency_ms`    | హిస్టోగ్రామ్ | `services/usage.ts`             |
| `tokens_consumed`       | కౌంటర్       | `services/usage.ts`             |
| `cost_usd`              | కౌంటర్       | `services/usage.ts`             |
| `provider_errors`       | కౌంటర్       | `services/errorClassifier.ts`   |
| `circuit_state_changes` | కౌంటర్       | `services/resilience.ts`        |
| `cache_hits`            | కౌంటర్       | `services/signatureCache.ts`    |
| `compression_savings`   | హిస్టోగ్రామ్ | `services/compression/stats.ts` |
| `quota_used`            | గేజ్         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | గేజ్         | `observability.ts`              |

### లేటెన్సీ పర్సెంటైల్లు (p50/p95/p99)

> **REST ఎండ్పాయింట్ లేదు.** లేటెన్సీ పర్సెంటైల్ డేటా డ్యాష్బోర్డ్లోని `/dashboard/health` పేజీ ద్వారా అందుబాటులో ఉంటుంది. Prometheus/OpenTelemetry ఎగుమతి v3.9 కోసం ప్రణాళిక చేయబడింది.

### Prometheus / OpenTelemetry ఎగుమతి (దశ 2)

v3.9 కోసం ప్రణాళిక చేయబడింది: Prometheus, OpenTelemetry, Datadogలకు స్థానిక ఎగుమతి.

ప్రస్తుతానికి, ఏదైనా HTTP-ఆధారిత మానిటరింగ్ సిస్టమ్తో (Prometheus blackbox exporter, Datadog HTTP check మొదలైనవి) `/api/monitoring/health`ను స్క్రేప్ చేయండి.

---

## అలర్టింగ్ విధానాలు

### Slack

> **గమనిక:** Webhook అలర్టింగ్ డ్యాష్బోర్డ్లోని Settings పేజీ ద్వారా కాన్ఫిగర్ చేయబడుతుంది — ప్రత్యేక webhook env vars ఏవీ లేవు (`grep -rn` సున్నా ఫలితాలను ఇస్తుంది). Webhook URL, ఈవెంట్ ఫిల్టరింగ్ మరియు పేలోడ్ అనుకూలీకరణ కోసం Settings UIని చూడండి.

### Discord

> Webhook అలర్టింగ్ Slack మాదిరిగానే అదే Settings UI ప్రవాహాన్ని ఉపయోగిస్తుంది. Discord అదే JSON పేలోడ్ ఆకృతిని అంగీకరిస్తుంది.

### PagerDuty

> Webhook అలర్టింగ్ అదే Settings UI ప్రవాహాన్ని ఉపయోగిస్తుంది. PagerDuty Events API v2 రూటింగ్ కీలు Settings UIలో కాన్ఫిగర్ చేయబడతాయి.

### అనుకూల Webhook (JSON)

> JSON బాడీతో POSTను అంగీకరించే ఏ HTTP ఎండ్పాయింట్ అయినా పని చేస్తుంది. Settings UIలో URLను కాన్ఫిగర్ చేయండి.

---

## డ్యాష్బోర్డ్ కాన్ఫిగరేషన్

### Health డ్యాష్బోర్డ్ను అనుకూలీకరించండి

ఒక `~/.omniroute/dashboard.json`ను సృష్టించండి:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ఒక ప్రొవైడర్ను ఎగువన పిన్ చేయండి

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## సమస్య పరిష్కారం

### "ప్రొవైడర్ ఆరోగ్యంగా ఉందని చూపుతోంది, కానీ అభ్యర్థనలు విఫలమవుతున్నాయి"

1. **autopilot సమస్యలను** తనిఖీ చేయండి — ఏదైనా మోడల్ లాక్ చేయబడి ఉండవచ్చు
2. నిర్దిష్ట ఎర్రర్ క్లాస్ కోసం **ఇటీవలి ఎర్రర్లను** చూడండి
3. ప్రొవైడర్ కార్డ్లోని **కనెక్షన్ టెస్ట్**ను ప్రయత్నించండి
4. ప్రొవైడర్ **అప్స్ట్రీమ్లో రేట్-లిమిట్ చేయబడిందా** అని తనిఖీ చేయండి (స్థానికంగా కనిపించదు)

### "కోటా ఆరోగ్యంగా ఉందని చూపుతోంది, కానీ నాకు 429లు కనిపిస్తున్నాయి"

- 429 అంటే మీరు మీ కోటాను ఉపయోగించేశారని ప్రొవైడర్ చెబుతోంది
- OmniRoute కోటా ట్రాకింగ్ **కాలం చెల్లినదై** ఉండవచ్చు — ప్రొవైడర్ వద్ద ఉన్న అప్స్ట్రీమ్ సమాచారమే వాస్తవం
- అంతర్గత కోటా మానిటర్ ద్వారా కోటా డేటా స్వయంచాలకంగా రిఫ్రెష్ అవుతుంది

### "అన్ని లక్ష్యాలు ఆరోగ్యంగా కనిపిస్తున్నప్పటికీ Combo విఫలమవుతోంది"

- లక్ష్యాల క్రమ సమస్యల కోసం **combo health** డ్యాష్బోర్డ్ను తనిఖీ చేయండి
- **fallback ఈవెంట్లను** చూడండి — combo చాలా త్వరగా అన్ని ఎంపికలను ఉపయోగించి ఉండవచ్చు
- **strategy** మీ వినియోగ సందర్భానికి సరిపోతుందో లేదో ధృవీకరించండి (priority vs round-robin vs auto)

### "డేటాబేస్ health check విఫలమవుతోంది"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`ను అమలు చేయండి
- "ok" అయితే — ఇది తప్పుడు హెచ్చరిక; health check మరీ కఠినంగా ఉంది
- మరేదైనా ఫలితం వస్తే — **OmniRouteను ఆపివేసి**, [విపత్తు పునరుద్ధరణ మార్గదర్శిని](./DATABASE_GUIDE.md#disaster-recovery) అనుసరించండి

### "మెమరీ heap ఒత్తిడి తీవ్రంగా ఉంది"

```bash
# ప్రస్తుత heapను తనిఖీ చేయండి
node -e "console.log(process.memoryUsage())"

# మాన్యువల్ GCని ట్రిగ్గర్ చేయండి (--expose-gc ఉంటే)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ఏకకాల అభ్యర్థనలను తగ్గించండి (env var ద్వారా కాకుండా, డ్యాష్బోర్డ్ Settings పేజీ ద్వారా సెట్ చేయండి)
# `MAX_CONCURRENT_REQUESTS` env var లేదు — దాన్ని Settings → Concurrencyలో కాన్ఫిగర్ చేయండి.
```

---

## ఇవి కూడా చూడండి

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — వినియోగం & వ్యయ ట్రాకింగ్
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB స్కీమా + స్థితి
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ప్రాక్సీ స్థితి (ప్రత్యేక క్యాష్)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — సిస్టమ్ ఆర్కిటెక్చర్
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — సర్క్యూట్ బ్రేకర్ వివరాలు
- సోర్స్: `src/lib/monitoring/` (4 ఫైళ్లు, 2121 LOC)
