# Router Backends & Embedded Services — architecture contract (ADR) (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **స్థితి:** ఆమోదించబడింది · **సందర్భం:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ఒప్పందం:** `domain/routing/routerBackends.ts`
> (టైప్డ్ రిజిస్ట్రీ — కోడ్ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)తో చేరుతుంది)

ఈ ADR, `ts` (నేటివ్), `bifrost`, `cliproxy`, `9router`, మరియు
VibeProxy-అనుకూల ఇంజిన్లు ఒకదానితో మరొకటి ఎలా సంబంధం కలిగి ఉంటాయో నిర్దిష్టంగా నిర్వచిస్తుంది, తద్వారా సహకారులు
ఆర్కిటెక్చర్ పరంగా వేర్వేరైన రెండు విషయాలను కలిపి చూడకుండా ఉంటారు. రౌటర్-బ్యాకెండ్-రిజిస్ట్రీ పనిలో ప్రవేశపెట్టిన టైప్డ్
రిజిస్ట్రీని ఈ నమూనాకు ఏకైక అధికారిక సమాచార మూలంగా ఇది డాక్యుమెంట్ చేస్తుంది.

## ప్రధాన వ్యత్యాసం — రెండు పరస్పర స్వతంత్ర అక్షాలు

ఒక ఇంజిన్ పాత్రను **రెండు స్వతంత్ర అక్షాలు** వివరిస్తాయి; ఇవి రిజిస్ట్రీలోని
`RouterBackendDefinition`లో కలిపి ఎన్కోడ్ చేయబడ్డాయి:

1. **లైఫ్సైకిల్** (`RouterBackendLifecycle`) — _ఇంజిన్ ఎలా నడుస్తుంది_:
   - `in-process` — OmniRoute Node ప్రాసెస్ లోపల నడుస్తుంది (నేటివ్ TS పైప్లైన్).
   - `supervised` — OmniRoute, `ServiceSupervisor` ద్వారా ఇన్స్టాల్/ప్రారంభం/నిలిపివేత/హెల్త్-చెక్ చేసే
     స్థానిక చైల్డ్ ప్రాసెస్; ఆపై దానిని ప్రొవైడర్ కనెక్షన్గా ఉపయోగిస్తుంది.
   - `external` — OmniRoute అభ్యర్థనలను పంపే HTTP ఎండ్పాయింట్, కానీ దాన్ని **నిర్వహించదు**
     (env బేస్ URL ద్వారా కాన్ఫిగర్ చేయబడుతుంది).
   - `disabled` — నమోదు చేయబడింది, కానీ ఎంచుకోలేరు.
2. **ఎంపిక అక్షం** (రిలే రౌటింగ్ బ్యాకెండ్) — _రిలే దానికి అభ్యర్థనలను పంపుతుందా లేదా_:
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`లో
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`.

నివారించాల్సిన పొరపాటు: "ఎంబెడెడ్ సర్వీస్" మరియు "రౌటింగ్ బ్యాకెండ్"లను ఒకే
జాబితాగా పరిగణించడం. అవి ఒకటి కావు. `supervised` ఇంజిన్ (9router/cliproxy) అనేది **నేటివ్ పైప్లైన్ ఉపయోగించే
ప్రొవైడర్ కనెక్షన్**, ప్రత్యామ్నాయ రిలే డిస్పాచ్ బ్యాకెండ్ కాదు. `bifrost` దీనికి వ్యతిరేకం — ఇది (చారిత్రకంగా)
`external`-మాత్రమే అయిన రిలే డిస్పాచ్ బ్యాకెండ్.

## రిజిస్ట్రీ — ఏకైక అధికారిక సమాచార మూలం

`domain/routing/routerBackends.ts` ఒప్పందం (కోడ్
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)తో చేరుతుంది) ప్రతి ఇంజిన్ను దాని
లైఫ్సైకిల్, సామర్థ్యాలు, సర్వీస్ గుర్తింపు, డిఫాల్ట్ పోర్ట్, హెల్త్ కాన్ఫిగరేషన్ మరియు
టెలిమెట్రీ మద్దతుతో ఒక్కసారి మాత్రమే ప్రకటిస్తుంది. ప్రతి సైడ్కార్కు ప్రత్యేక షరతులు రాయడానికి బదులుగా,
వినియోగదారులు `getRouterBackend(id)`, `listRouterBackends()`, మరియు
`listRouterBackendsByCapability(cap)` ద్వారా ఇంజిన్లను వెతుకుతారు.

| బ్యాకెండ్   | లైఫ్సైకిల్   | సర్వీస్ (అక్షం A) | రిలే బ్యాకెండ్ (అక్షం B) | హెల్త్        | డిఫాల్ట్ పోర్ట్ |
| ----------- | ------------ | ----------------- | ------------------------ | ------------- | --------------- |
| `ts`        | `in-process` | —                 | `ts` (నేటివ్)            | —             | —               |
| `bifrost`   | `external`¹  | —¹                | `bifrost` / `auto`       | `/health`     | —               |
| `cliproxy`  | `supervised` | `cliproxy`        | — (ప్రొవైడర్)            | `/v1/models`  | 8317            |
| `9router`   | `supervised` | `9router`         | — (ప్రొవైడర్)            | `/api/health` | 20130           |
| `vibeproxy` | `external`   | —                 | — (ప్రొవైడర్ అడాప్టర్)   | `/v1/models`  | —               |

¹ Bifrostను `/api/services/bifrost/` నుండి ఇన్స్టాల్/ప్రారంభించగల `supervised` ఎంబెడెడ్ సర్వీస్గా
ప్రమోట్ చేసే పని [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)లో ట్రాక్ చేయబడుతోంది; అది మెర్జ్ అయ్యే వరకు,
Bifrost `external`-మాత్రమే (`BIFROST_BASE_URL` ద్వారా మాత్రమే చేరుకోగలదు).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ప్రతి ఐడీకి ప్రత్యేక బ్రాంచ్లను హార్డ్-కోడ్ చేయడానికి బదులుగా,
ఒక ఇంజిన్ వాస్తవంగా ఏం చేయగలదో దాని ఆధారంగా ఫిల్టర్ చేసుకునేందుకు కాలర్లను అనుమతిస్తుంది.

## అక్షం A — ఎంబెడెడ్ సేవలు (పర్యవేక్షిత ప్రాసెస్ వైపు)

- **పర్యవేక్షిత ప్రాసెస్ల రిజిస్ట్రీ:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ప్రస్తుతం: `9router`, `cliproxy`).
- **లైఫ్సైకిల్ యజమాని:** `src/lib/services/ServiceSupervisor.ts` — `start()` చైల్డ్
  ప్రాసెస్ను స్పాన్ చేస్తుంది, `waitForHealthy()` పూర్తయ్యే వరకు గేట్ చేస్తుంది, stdout/stderrను రింగ్ బఫర్లోకి మళ్లిస్తుంది;
  `stop()` SIGTERM→SIGKILL; అన్నీ ఒక లాక్ కింద క్రమబద్ధీకరించబడతాయి.
- **స్టేట్ యూనియన్** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, దీనితో పాటు స్వతంత్రంగా
  `HealthState = healthy | unhealthy | unknown`.
- **ప్రత్యేక ప్రాసెస్ ఎందుకు (ఇన్-ప్రాసెస్ SDK కాకుండా)?** ప్రాసెస్ ఐసోలేషన్ వల్లనే
  ప్రతి సైడ్కార్కు install/start/stop/health/logsను స్వతంత్రంగా నియంత్రించవచ్చు మరియు
  లూప్బ్యాక్ స్పాన్-గార్డ్ను వర్తింపజేయవచ్చు. ఇన్-ప్రాసెస్ అడాప్టర్ను మోడల్ చేయడం భవిష్యత్ పని —
  దాన్ని వ్యక్తీకరించాల్సిన ప్రదేశం `native-hot-path` సామర్థ్య ఫ్లాగ్.

### లైఫ్సైకిల్ రూట్ ఒప్పందం (`/api/services/<tool>/…`)

స్టేటస్ కోడ్లు **ఉద్దేశపూర్వకంగా state/verb/pathకు నిర్దిష్టమైనవి** — ఇది ఒప్పందమే, అసంగతత
కాదు:

| కాల్                         | షరతు                            | స్టేటస్                              |
| ---------------------------- | ------------------------------- | ------------------------------------ |
| `POST .../start`             | సేవ `not_installed`             | **409** (ముందస్తు షరతు)              |
| `POST .../stop`              | ఇప్పటికే ఆపివేయబడింది           | **200** (ఐడెంపొటెంట్ నో-ఆప్)         |
| `GET .../status`             | సరే                             | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | స్పాన్ వైఫల్యం                  | **503** (తాత్కాలికం)                 |
| `GET .../status`, `.../stop` | పట్టుకోని లోపం                  | **500**                              |
| `GET /api/services/<x>/logs` | తెలియని టూల్ `<x>`              | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` లేదు    | **403** (`9router`కు మాత్రమే)        |
| **ఏదైనా** `/api/services/*`  | కాలర్ loopback/private-LAN కాదు | **403 LOCAL_ONLY**                   |

అన్ని ఎరర్ బాడీలు `createErrorResponse()` ద్వారా →
`{ error: { message, type }, requestId }` ఆకృతిలో ఉంటాయి, ఇక్కడ `type` స్టేటస్ నుండి
ఉత్పన్నమవుతుంది (`500→server_error`, `404→not_found`, `409→conflict`, లేకపోతే `invalid_request`) మరియు
ఇది మెషీన్ ద్వారా చర్య తీసుకోగల డిస్క్రిమినేటర్. సందేశాలు ముందుగానే శానిటైజ్ చేయబడతాయి
(`sanitizeErrorMessage()`, కఠిన నియమం #12).

**లూప్బ్యాక్ గార్డ్** అనేది `403`కు అత్యంత సాధారణ మూలం: `/api/services/` అనేది
`LOCAL_ONLY_API_PREFIXES`లో ఉంది (`src/server/authz/routeGuard.ts`) మరియు
`src/server/authz/policies/management.ts` ఏదైనా non-loopback / non-private-LAN
కాలర్ను **ఆథ్కు ముందే** తిరస్కరిస్తుంది, ఎందుకంటే ఈ రూట్లు చైల్డ్ ప్రాసెస్లను స్పాన్ చేస్తాయి (కఠిన నియమాలు 15
మరియు 17). పబ్లిక్ టన్నెల్ ద్వారా వీటిని చేరుకోవడం ఉద్దేశపూర్వకంగానే `403` అవుతుంది.

## అక్షం B — రిలే రూటింగ్ బ్యాకెండ్ (డిస్పాచ్ వైపు)

రిలే ప్రాక్సీ పాత్ `/api/v1/relay/chat/completions` మాత్రమే డిస్పాచ్
బ్యాకెండ్ను ఎంచుకుంటుంది; ప్రధాన `/api/v1/chat/completions` సర్ఫేస్ ఎప్పుడూ
`routingBackend.ts`ను సంప్రదించదు.

- **ఎంపిక** (`resolveRelayRoutingBackend`): ఒకే గ్లోబల్ env టాగుల్ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  సెట్ చేయకపోతే, Bifrost కాన్ఫిగర్ చేసి+ఎనేబుల్ చేసినప్పుడు `auto`, లేకపోతే `ts`.
- **ప్రవర్తన:**
  - `bifrost` (బలవంతంగా): Bifrost వైఫల్యం → హార్డ్ `502`, ఫాల్బ్యాక్ లేదు.
  - `auto`: Bifrostను ప్రయత్నిస్తుంది, వైఫల్యం/కూల్డౌన్ సమయంలో నిశ్శబ్దంగా నేటివ్కు మారుతుంది.
  - `ts` / ఫాల్బ్యాక్ తర్వాత: నేటివ్ `open-sse` ట్రాన్స్లేటర్/ఎగ్జిక్యూటర్ పైప్లైన్.
- **కూల్డౌన్:** `bifrostCooldown.ts`లో ప్రతి-`baseUrl` వైఫల్య కూల్డౌన్.

ప్రస్తుతం ఎంపిక రిలే స్థాయిలో **పూర్తిగా-లేదా-అసలే-లేదు** విధానంలో ఉంటుంది — `release/v3.8.43`లో
ప్రతి-ప్రొవైడర్ లేదా ప్రతి-రిక్వెస్ట్ ఇంజిన్ మార్పిడి లేదు. ప్రతి-రిక్వెస్ట్ గేట్ను
సైడ్కార్-మానిఫెస్ట్ పని ద్వారా జోడిస్తున్నారు
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) మానిఫెస్ట్ +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ఇది మానిఫెస్ట్కు అర్హమైన ప్రొవైడర్లను మాత్రమే Bifrost ద్వారా రూట్ చేయడానికి `auto`ను అనుమతిస్తుంది.

## డ్యాష్బోర్డ్ అనుసంధానం

సేవల డ్యాష్బోర్డ్ ప్రతి 5sకు
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` ద్వారా
`GET /api/services/<tool>/status`ను పోల్ చేస్తుంది, ఇది `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`ను తిరిగి అందిస్తుంది. భాగస్వామ్య availability-context ప్రొవైడర్ ఏదీ లేదు —
ప్రతి కాంపోనెంట్ ఒక్కో టూల్ కోసం ఈ హుక్ను కాల్ చేస్తుంది. `!res.ok` అయినప్పుడు, ప్రస్తుతం ఈ హుక్ కేవలం
`HTTP <status>`ను చూపిస్తుంది; `error.type` ఫీల్డ్ను మనుషులకు అర్థమయ్యే వివరణకు మ్యాప్ చేయడం
ట్రాక్ చేయబడుతున్న UX మెరుగుదల మాత్రమే, కాంట్రాక్ట్ మార్పు కాదు.

## పర్యవసానాలు

- కొత్త ఇంజిన్లు `ROUTER_BACKENDS`లో ఒక్కసారి నమోదు అవుతాయి; కొత్త per-id బ్రాంచ్లు లేకుండానే వినియోగదారులు capability
  క్వెరీల ద్వారా వాటిని పొందుతారు.
- "ఇది సేవా లేదా రౌటింగ్ బ్యాకెండా?" అనే ప్రశ్నకు సమాధానం, ఏ జాబితాలో ఒక id కనిపిస్తుందనే దాని ద్వారా కాకుండా,
  `lifecycle` ఫీల్డ్ ద్వారా నిర్ణయించబడుతుంది.
- Bifrost పర్యవేక్షణ (#5817) మరియు స్థానిక hot-path మైగ్రేషన్ (#5670), ప్రతి sidecarను ప్రత్యేక సందర్భంగా పరిగణించే బదులు
  ఈ భాగస్వామ్య కాంట్రాక్ట్పై ఆధారపడి నిర్మించబడతాయి.
