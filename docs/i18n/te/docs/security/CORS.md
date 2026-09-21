# CORS Configuration & Security (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ఒకే, కేంద్రీకృత అనుమతి జాబితా నుండి ఏ **బ్రౌజర్ మూలాలు** క్రాస్-ఆరిజిన్ ప్రతిస్పందనలను చదవవచ్చో నియంత్రిస్తుంది. ఈ నమూనా **డిఫాల్ట్గా ఫెయిల్-క్లోజ్డ్**:
మీరు ఏదైనా మూలాన్ని స్పష్టంగా అనుమతించే వరకు ఏ మూలానికీ అనుమతి ఉండదు. అనుమతి జాబితా ఎలా పరిష్కరించబడుతుంది, `CORS_ALLOW_ALL=true` వాస్తవంగా వేటిని బహిర్గతం చేస్తుంది (ముఖ్యంగా, వేటిని **చేయదు**), డెవలప్మెంట్ మరియు ప్రొడక్షన్ను సురక్షితంగా ఎలా కాన్ఫిగర్ చేయాలి, అలాగే వైల్డ్కార్డ్ సక్రియంగా ఉన్నప్పుడు డ్యాష్బోర్డ్ చూపించే రన్టైమ్ హెచ్చరిక గురించి ఈ పేజీ వివరిస్తుంది.

**ప్రామాణిక మూలం:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). అనుమతి జాబితా మిడిల్వేర్లో (`src/server/authz/pipeline.ts`) ఒక్కసారి వర్తింపజేయబడుతుంది — ఒక్కో రూట్ హ్యాండ్లర్ స్వయంగా
`Access-Control-Allow-Origin`ను సెట్ చేయదు.

## మూలం ఎలా పరిష్కరించబడుతుంది

ప్రతి అభ్యర్థనకు మిడిల్వేర్ ఈ క్రమంలో `Access-Control-Allow-Origin` విలువను గణిస్తుంది:

1. **`CORS_ALLOW_ALL=true`** (లేదా పాత `CORS_ORIGIN=*`) → కాలర్ యొక్క
   `Origin`ను తిరిగి ప్రతిధ్వనిస్తుంది (`Origin` హెడర్ లేనప్పుడు `*`), అలాగే క్యాష్లు సరిగ్గా ఉండేలా `Vary: Origin`ను జోడిస్తుంది. అదే `applyCorsHeaders()` చోక్పాయింట్, టోకెన్ ద్వారా ప్రామాణీకరించబడిన
   `/v1*`/`/v1beta*` ఉపరితలంపై బాడీ కలిగిన ప్రతి 2xx ప్రతిస్పందనకు
   `Vary: Accept-Encoding`ను కూడా జోడిస్తుంది (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737). తద్వారా దిగువస్థాయి/షేర్డ్ క్యాష్లు కంప్రెస్ చేసిన మరియు కంప్రెస్ చేయని వేరియంట్ల మధ్య సరిగ్గా తేడాను గుర్తించగలవు.
2. లేకపోతే, అభ్యర్థనలోని `Origin` సాధారణీకరించబడుతుంది (చిన్న అక్షరాలకు మార్చి, చివరి స్లాష్ తొలగించబడుతుంది) మరియు **విలీనమైన అనుమతి జాబితా**తో సరిపోల్చబడుతుంది:
   - env **`CORS_ALLOWED_ORIGINS`** — కామాలతో వేరు చేసిన జాబితా, మరియు
   - `src/lib/config/runtimeSettings.ts` నుండి `setRuntimeAllowedOrigins()` ద్వారా ఇంజెక్ట్ చేయబడిన రన్టైమ్ **`corsOrigins`** సెట్టింగ్ (Dashboard → Security → _CORS Allowed Origins_).
3. సరిపోలిక లేదు → **`Access-Control-Allow-Origin` హెడర్ పంపబడదు**. బ్రౌజర్ క్రాస్-ఆరిజిన్ రీడ్ను నిరోధిస్తుంది. ఇదే ఉద్దేశించిన ఫెయిల్-క్లోజ్డ్ డిఫాల్ట్.

| Env var                | అర్థం                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | అనుమతించాల్సిన ఖచ్చితమైన మూలాల CSV (సిఫార్సు చేయబడింది).                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → ఏ మూలాన్నైనా తిరిగి ప్రతిధ్వనిస్తుంది (వైల్డ్కార్డ్). డెవలప్మెంట్కు మాత్రమే.        |
| `CORS_ORIGIN`          | పాతది. `*` అనేది `CORS_ALLOW_ALL` వలె ప్రవర్తిస్తుంది; ఒకే విలువ అనుమతి జాబితాకు జోడించబడుతుంది. |

## ముప్పు నమూనా — `CORS_ALLOW_ALL=true` వాస్తవంగా వేటిని బహిర్గతం చేస్తుంది

సాధారణ OWASP హెచ్చరిక ("వైల్డ్కార్డ్ CORS = ఏ సైట్ అయినా మీ APIని కాల్ చేయగలదు")ను తీవ్రంగా పరిగణించాలి, కానీ ఒక నిర్దిష్ట అమలు వాస్తవం కారణంగా OmniRoute బహిర్గత పరిధి **సాధారణ సందర్భం కంటే పరిమితమైనది**:

> **కేంద్రీకృత `applyCorsHeaders()` ఎప్పుడూ
> `Access-Control-Allow-Credentials`ను పంపదు.** సర్వర్
> `Access-Control-Allow-Credentials: true`ను పంపితే తప్ప, బ్రౌజర్ _క్రెడెన్షియల్తో కూడిన_
> (కుకీని కలిగిన) క్రాస్-ఆరిజిన్ ప్రతిస్పందనను బహిర్గతం చేయదు. OmniRoute యొక్క షేర్డ్ CORS పాత్ అలా ఎప్పుడూ చేయదు.

`CORS_ALLOW_ALL=true` ఉన్నప్పటికీ, ప్రతి ఉపరితలానికి దీని అర్థం:

| ఉపరితలం                               | ప్రామాణీకరణ విధానం         | వైల్డ్కార్డ్ CORS ప్రభావం                                                                                                                                                                                                                                |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`       | కుకీ సెషన్                 | మూలం తిరిగి ప్రతిధ్వనించబడుతుంది, కానీ **`Allow-Credentials` లేకుండా** బ్రౌజర్ క్రెడెన్షియల్తో కూడిన రీడ్ను **నిరోధిస్తుంది**. హానికరమైన క్రాస్-ఆరిజిన్ సైట్ మీ ప్రామాణీకరించిన డ్యాష్బోర్డ్ ప్రతిస్పందనలను **చదవలేదు**, అలాగే సెషన్ కుకీ బహిర్గతం కాదు. |
| Client API `/v1/*`, `/v1beta/*`       | Bearer / `x-api-key` హెడర్ | ఇప్పటికే **రూపకల్పన ప్రకారమే** అనుమతిదాయకంగా ఉంది (`relaxForTokenAuth`): బ్రౌజర్లు `Authorization`/`x-api-key`ను ఎప్పుడూ స్వయంచాలకంగా జోడించవు, కాబట్టి దాడిచేసే వ్యక్తి పేజీ మీ కీని అందించలేదు. `CORS_ALLOW_ALL` దీని పరిధిని పెంచదు.                  |
| పబ్లిక్ రీడ్-ఓన్లీ (`/api/health`, …) | ఏదీ లేదు                   | సున్నితమైనది కాదు; వైల్డ్కార్డ్ హానికరం కాదు.                                                                                                                                                                                                            |

కాబట్టి `CORS_ALLOW_ALL=true` వల్ల మిగిలి ఉండే బహిర్గతం వీటికే పరిమితం: (a)
ఇప్పటికే ప్రామాణీకరణ అవసరం లేని డేటాపై క్రెడెన్షియల్లు లేని క్రాస్-ఆరిజిన్ **రీడ్లు**, మరియు (b)
మేనేజ్మెంట్ రూట్లపై CORS **ప్రీ-ఫ్లైట్ పాస్ కావడానికి** అనుమతించడం — అయితే వాటికి ఇంకా క్రాస్-ఆరిజిన్ పేజీ అందించలేని ప్రామాణీకరణ అవసరం. షేర్డ్ CORS పాత్లో ఇది సెషన్ హైజాకింగ్ లేదా క్రెడెన్షియల్ దొంగతనానికి మార్గం **కాదు**.

### ఒక నిజమైన మినహాయింపు — `/api/v1/agents/`

Cloud-Agent రూట్లు (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) వాటి **స్వంత** CORS హెడర్లను సెట్ చేస్తాయి
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) మరియు
`Access-Control-Allow-Credentials: true`తో పాటు
`Access-Control-Allow-Origin: <origin>|*`ను కూడా పంపుతాయి. మూలాన్ని తిరిగి ప్రతిధ్వనించడం మరియు క్రెడెన్షియల్లు కలిసి ఉండే ఏకైక ఉపరితలం ఇదే, అలాగే ఇది **`CORS_ALLOW_ALL`తో సంబంధం లేకుండా పనిచేస్తుంది**. ఈ రూట్లు మేనేజ్మెంట్ ద్వారా ప్రామాణీకరించబడతాయి
(`requireManagementAuth`); డ్యాష్బోర్డ్ను హోస్ట్ వెలుపల బహిర్గతం చేసే ఆపరేటర్లు, ప్రతిస్పందన హెడర్ల ద్వారా క్రెడెన్షియల్తో కూడిన క్రాస్-ఆరిజిన్ రీడ్కు అనుమతి ఉన్న ఏకైక ప్రదేశం ఇదేనని తెలుసుకోవాలి. దీనిని స్పష్టమైన అనుమతి జాబితాకు పరిమితం చేయడం ఈ CORS మార్గదర్శకత్వం నుండి వేరుగా ట్రాక్ చేయబడుతోంది.

## ప్రొడక్షన్ చెక్లిస్ట్

- **ప్రొడక్షన్లో ఎప్పుడూ `CORS_ALLOW_ALL=true`ని సెట్ చేయవద్దు.** దాన్ని సెట్ చేయకుండా వదిలేయండి.
- **స్పష్టమైన** ఆరిజిన్ జాబితాను సెట్ చేయండి — env var లేదా Security ట్యాబ్ ఫీల్డ్లో:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ఒక రివర్స్ ప్రాక్సీ / టన్నెల్ (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) వెనుక నడుస్తుంటే, CORS మీ ఏకైక నియంత్రణ **కాదు** — లూప్బ్యాక్ రూట్
  గార్డ్ ఇప్పటికీ spawn సామర్థ్యం ఉన్న రూట్లను రక్షిస్తుంది (చూడండి
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). 403ని "పరిష్కరించడానికి"
  `X-Forwarded-For: 127.0.0.1`ను నకిలీగా సృష్టించవద్దు; అలా చేస్తే రూట్ గార్డ్
  మూసివేసే RCE తరగతి మళ్లీ తెరుచుకుంటుంది.
- రన్టైమ్ స్థితిని నిర్ధారించండి: `CORS_ALLOW_ALL=true` అమల్లో ఉన్నప్పుడు,
  Dashboard → Security → Authorization Inventory కింద డ్యాష్బోర్డ్ ఒక **నిరంతర ఆంబర్ బ్యానర్**ను
  చూపుతుంది, అలాగే పర్యవేక్షణ సాధనాలు పోల్ చేయగల
  `cors: { allowAll, allowedOrigins }` ఎన్వలప్ను `/api/settings/authz-inventory` అందిస్తుంది.

## డెవలప్మెంట్ సౌలభ్యం — నిర్దిష్ట లోకల్ ఆరిజిన్లను అనుమతించడం

డెవలప్మెంట్లో కూడా మీకు వైల్డ్కార్డ్ అవసరం కావడం చాలా అరుదు. మీరు ఉపయోగించే డెవ్ సర్వర్లను మాత్రమే అనుమతించండి:

```bash
# లోకల్ OmniRouteకు కాల్ చేసే Vite (5173) + Next.js (3000) డెవ్ సర్వర్లు
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

చివరి స్లాష్ను విస్మరించి, ఆరిజిన్లు కేస్-ఇన్సెన్సిటివ్గా సరిపోల్చబడతాయి, కాబట్టి
`http://localhost:3000` మరియు `http://localhost:3000/` సమానమైనవి. అదే CSVని
రీస్టార్ట్ అవసరం లేకుండా రన్టైమ్లో **Dashboard → Security → CORS Allowed Origins**లో
సెట్ చేయవచ్చు.

## API కీలు vs కుకీ సెషన్లు

- **Bearer / `x-api-key` (`/v1/*` ఇన్ఫరెన్స్ సర్ఫేస్):** బ్రౌజర్లు వీటిని
  ఎప్పుడూ స్వయంచాలకంగా జోడించవు. ఇక్కడ CORS అర్థవంతమైన అవరోధం కాదు — API కీయే
  అవరోధం — అందుకే బ్రౌజర్ మరియు Electron క్లయింట్లు ఇప్పటికే తమకు అర్హత ఉన్న
  ప్రతిస్పందనలను చదవగలిగేలా ఆ సర్ఫేస్ ఉద్దేశపూర్వకంగా అనుమతిపూర్వకంగా ఉంటుంది.
- **కుకీ సెషన్ (డ్యాష్బోర్డ్):** fail-closed డిఫాల్ట్ **మరియు**
  షేర్డ్ పాత్లో `Access-Control-Allow-Credentials` లేకపోవడం ద్వారా రక్షించబడుతుంది.
  నిర్వహణ/డ్యాష్బోర్డ్ ఆరిజిన్లను ఏ అనుమతిపూర్వక కాన్ఫిగ్లోనూ చేర్చవద్దు; అవి ఖచ్చితంగా
  fail-closedగానే ఉండాలి.

## ఉదాహరణ: OmniRoute ముందు రివర్స్ ప్రాక్సీ

CORSను OmniRoute స్వయంగా అమలు చేస్తుంది, కాబట్టి ప్రాక్సీ సాధారణంగా
`Access-Control-*` హెడర్లను జోడించకూడదు లేదా తిరిగి రాయకూడదు (డూప్లికేట్ హెడర్లు బ్రౌజర్లలో సమస్యలు కలిగిస్తాయి).
TLSను టెర్మినేట్ చేసి ఫార్వర్డ్ చేయండి — ప్రీఫ్లైట్కు OmniRouteనే సమాధానం ఇవ్వనివ్వండి:

```nginx
# nginx — OmniRouteకు ఫార్వర్డ్ చేయండి; ఇక్కడ Access-Control-*ను ఇంజెక్ట్ చేయవద్దు
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-Forను 127.0.0.1కు సెట్ చేయవద్దు — అది లూప్బ్యాక్ రూట్ గార్డ్ను నిర్వీర్యం చేస్తుంది.
}
```

అనుమతించబడిన బ్రౌజర్ ఆరిజిన్లను ప్రాక్సీలో కాకుండా OmniRouteలో
(`CORS_ALLOWED_ORIGINS` లేదా Security ట్యాబ్) సెట్ చేయండి.

## సోర్స్ ఫైల్లు

| అంశం                                     | ఫైల్                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| అలౌలిస్ట్ రిజల్యూషన్ + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| మిడిల్వేర్ అప్లికేషన్ (ఏకైక సత్య మూలం)   | `src/server/authz/pipeline.ts`                                       |
| Settings → రన్టైమ్ ఆరిజిన్ ఇంజెక్షన్     | `src/lib/config/runtimeSettings.ts`                                  |
| డ్యాష్బోర్డ్ కోసం రన్టైమ్ స్థితి         | `src/app/api/settings/authz-inventory/route.ts`                      |
| డ్యాష్బోర్డ్ హెచ్చరిక బ్యానర్            | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ఫీల్డ్              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent ప్రతి-రూట్ CORS (మినహాయింపు) | `src/lib/cloudAgent/api.ts`                                          |

## ఇవి కూడా చూడండి

- [రూట్ గార్డ్ స్థాయులు](./ROUTE_GUARD_TIERS.md) — ప్రాసెస్లను ప్రారంభించగల రూట్ల కోసం
  లూప్బ్యాక్ అమలు (ఒక ప్రత్యేకమైన, పరిపూరక నియంత్రణ).
- [అధికార ప్రదాన మార్గదర్శిని](../architecture/AUTHZ_GUIDE.md) — పూర్తి ప్రామాణీకరణ పైప్లైన్.
