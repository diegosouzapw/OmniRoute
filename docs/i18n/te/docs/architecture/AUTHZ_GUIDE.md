# Authorization Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ప్రామాణిక మూలం:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **చివరిగా నవీకరించబడింది:** 2026-06-28 — v3.8.40

ప్రతి API అభ్యర్థనను నియంత్రించే, రూట్ను పరిగణనలోకి తీసుకునే అధికార నిర్ధారణ పైప్లైన్ OmniRouteలో ఉంది. వర్గీకరణ **నిర్ణయాత్మకమైనది** మరియు **విఫలమైతే నిరాకరించేది** — వర్గీకరించలేని ఏదైనా చివరికి `MANAGEMENT`గా పరిగణించబడి, సెషన్ లేదా మేనేజ్మెంట్-స్థాయి టోకెన్ను కోరుతుంది. రూట్లను నిర్వహించే లేదా కొత్త ఎండ్పాయింట్లను రూపొందించే ఇంజినీర్ల కోసం ఈ పేజీ నమూనాను వివరిస్తుంది.

![AuthZ పైప్లైన్ (3 రూట్ తరగతులు + విధాన మూల్యాంకనం)](../diagrams/exported/authz-pipeline.svg)

> మూలం: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## రెండు ప్రామాణీకరణ మోడ్లు

### 1. API కీ (Bearer)

OpenAI/Anthropic/Gemini-అనుకూల క్లయింట్ APIల కోసం, అలాగే కీకి `manage` స్కోప్ ఉన్నప్పుడు కొన్ని మేనేజ్మెంట్ రూట్ల కోసం ఉపయోగించబడుతుంది.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`లోని `isValidApiKey()` / `extractApiKey()` ద్వారా ధృవీకరించబడి, `src/shared/utils/apiAuth.ts` ద్వారా మళ్లీ ఎగుమతి చేయబడుతుంది. ధృవీకరణకర్త `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` పర్యావరణ వేరియబుల్స్ను స్థిరమైన పాస్త్రూ కీలుగా కూడా అంగీకరిస్తుంది (సమస్య #1350).

### 2. డ్యాష్బోర్డ్ సెషన్ (auth_token కుకీ)

డ్యాష్బోర్డ్ పేజీలు మరియు అడ్మిన్ కార్యకలాపాల కోసం.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ధృవీకరించబడి, **అలాగే** `authenticated: true`ను కలిగి ఉన్నప్పుడు మాత్రమే కుకీ ఒక సెషన్ అవుతుంది
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). కుకీని
ఉపయోగించే ప్రతి అంశం (రూట్ గార్డ్, authz పైప్లైన్ రిఫ్రెష్, WebSocket హ్యాండ్షేక్, లైవ్
సర్వర్, `/api/settings/require-login`, `/api/auth/status`) ఆ సహాయకం ద్వారానే వెళ్తుంది.
`JWT_SECRET`తో సంతకం చేయబడిన ఇతర JWTలు కూడా ఉన్నాయి — కీ హోల్డర్ల కోసం Cursor CLI పాస్త్రూ
`iss "omniroute" / aud "cursor-cli"` టోకెన్లను జారీ చేస్తుంది — అవి ఎప్పటికీ సెషన్లు కావు
(#13298).

`src/shared/utils/apiAuth.ts`లోని `isDashboardSessionAuthenticated()` ద్వారా ధృవీకరించబడుతుంది. JWT యొక్క 30 రోజుల జీవితకాలంలో 7 రోజుల కంటే తక్కువ సమయం మిగిలి ఉన్నప్పుడు పైప్లైన్ దానిని స్వయంచాలకంగా రిఫ్రెష్ చేస్తుంది.

కొన్ని మేనేజ్మెంట్ రూట్లు **ఏదో ఒక** మోడ్ను అంగీకరిస్తాయి: కుకీ లేదా API కీకి `manage` (లేదా `admin`) స్కోప్ ఉన్నప్పుడు `Bearer <key>`. v3.8లో జోడించిన "API కాల్స్ ద్వారా కాన్ఫిగర్ చేయదగినది" వర్క్ఫ్లోను సాధ్యం చేసేది ఇదే.

#### ఐచ్ఛిక OIDC లాగిన్ గేట్ (#6973)

డ్యాష్బోర్డ్ అడ్మిన్ లాగిన్, డిఫాల్ట్ పాస్వర్డ్ లాగిన్తోపాటు **ఎంపిక చేసుకుంటే మాత్రమే పనిచేసే** OIDC (OpenID Connect) ఫ్లోకు కూడా మద్దతు ఇస్తుంది — పాస్వర్డ్ లాగిన్ ఎప్పటికీ తొలగించబడదు, దానికి అదనంగా మాత్రమే ఇది అందించబడుతుంది:

- `settings.oidcEnabled === true` అయి, **అలాగే** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` అన్నీ కాన్ఫిగర్ చేయబడితే తప్ప ఇది నిలిపివేయబడి ఉంటుంది (Settings → Auth).
  లేకపోతే `GET /api/auth/oidc/login` `400`ను తిరిగి ఇస్తుంది.
- `GET /api/auth/oidc/login`, జారీదారు యొక్క
  `/.well-known/openid-configuration` నుండి `authorization_endpoint`ను కనుగొంటుంది (`<issuer>/authorize`ను
  ప్రత్యామ్నాయంగా ఉపయోగిస్తుంది), ఇన్కమింగ్ అభ్యర్థన నుండి రీడైరెక్ట్ URIని రూపొందిస్తుంది
  (`x-forwarded-proto`ను పరిగణనలోకి తీసుకుంటుంది), అలాగే యాదృచ్ఛిక `state`తో IdPకి రీడైరెక్ట్ చేస్తుంది;
  ఆ `state`, `httpOnly` `oidc_state` కుకీలో నిల్వ చేయబడుతుంది.
- `GET /api/auth/oidc/callback`, `state`ను ధృవీకరిస్తుంది, ఆథరైజేషన్
  కోడ్ను మార్పిడి చేస్తుంది, అలాగే జారీదారు యొక్క JWKS ద్వారా ID టోకెన్ సంతకాన్ని
  (`jose` యొక్క `createRemoteJWKSet`, ప్రతి JWKS URIకి క్యాష్ చేయబడుతుంది) `issuer`/`audience`
  తనిఖీలతో ధృవీకరిస్తుంది. ఐచ్ఛిక `oidcAllowedSubjects` అనుమతి జాబితా, టోకెన్ యొక్క
  `sub` క్లెయిమ్ లేదా దాని `email` క్లెయిమ్తో సరిపోల్చుతుంది — `email_verified === true` అయినప్పుడు
  మాత్రమే ఇమెయిల్ క్లెయిమ్ గౌరవించబడుతుంది; కాబట్టి IdPలో ధృవీకరించబడని ఇమెయిల్ ఎప్పటికీ
  గేట్ను దాటలేదు.
- విజయవంతమైతే, పాస్వర్డ్ లాగిన్ జారీ చేసే **అదే** 30 రోజుల `auth_token` JWTని
  (`src/app/api/auth/login/route.ts`) జారీ చేస్తుంది; కాబట్టి మిగతా
  డ్యాష్బోర్డ్ సెషన్ పైప్లైన్ (స్వయంచాలక రిఫ్రెష్, కుకీ ఫ్లాగ్లు) మారదు —
  OIDC కేవలం కుకీ ఎలా జారీ చేయబడుతుందో మాత్రమే భర్తీ చేస్తుంది, అది ఇచ్చే అనుమతులను కాదు.

## రూట్ క్లాసులు

`src/server/authz/types.ts` మూడు క్లాసులను నిర్వచిస్తుంది; నిర్ణయాత్మకంగా వర్గీకరించలేని ఏ రూట్ అయినా డిఫాల్ట్గా `MANAGEMENT`కు వెళుతుంది.

| క్లాస్       | వివరణ                                                                                                                                                         | అవసరమైన ప్రమాణీకరణ                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `PUBLIC`     | స్పష్టంగా సురక్షితమైన రూట్లు — లాగిన్, లాగౌట్, స్థితి, ప్రారంభీకరణ, ఆరోగ్య తనిఖీ, ఆన్బోర్డింగ్ బూట్స్ట్రాప్.                                                  | ఏదీ లేదు                                                                   |
| `CLIENT_API` | మోడల్ను అందించే ఎండ్పాయింట్లు — `/api/v1/*`, `/api/v1beta/*`, అలాగే అలియాస్లు `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ప్రభావవంతమైన `REQUIRE_API_KEY` ఫీచర్ ఫ్లాగ్ ప్రారంభించబడినప్పుడు Bearer కీ |
| `MANAGEMENT` | డ్యాష్బోర్డ్ పేజీలు, సెట్టింగ్లు, ప్రొవైడర్లు, కీలు, అడ్మిన్ మరియు డయాగ్నస్టిక్స్ ఎండ్పాయింట్లు.                                                              | డ్యాష్బోర్డ్ సెషన్ లేదా `manage` స్కోప్తో Bearer                           |

## పైప్లైన్

```
వచ్చే అభ్యర్థన → src/proxy.ts
  → src/server/authz/pipeline.tsలో runAuthzPipeline()
    1. విశ్వసనీయ అంతర్గత హెడర్లను తొలగించండి (x-omniroute-auth-*, x-omniroute-route-class)
    2. అభ్యర్థన idని రూపొందించి, classifyRoute() ద్వారా రూట్ను వర్గీకరించండి
    3. pathname == "/" అయితే → /dashboardకు మళ్లించండి
    4. డ్రెయినింగ్లో ఉంటే (సజావైన షట్డౌన్) మరియు /api/* అయితే → 503
    5. GET కాని /api/* అయితే → checkBodySize() గార్డ్
    6. OPTIONS అయితే → CORS ప్రీఫ్లైట్ 204
    7. options.enforce == false అయితే → route-class హెడర్లతో యథాతథంగా పంపండి
    8. లేకపోతే: POLICIES[routeClass].evaluate(ctx)
       - అనుమతిస్తే  → x-omniroute-auth-{kind,id,label,scopes} ముద్రించండి → NextResponse.next()
       - తిరస్కరిస్తే → correlation_idతో JSON లోపం (డ్యాష్బోర్డ్ పేజీలు → 302 /login)
```

విశ్వసనీయ అంతర్గత హెడర్లు (`src/server/authz/headers.ts`లో నిర్వచించబడినవి) వర్గీకరణకు ముందు **వచ్చే అభ్యర్థనల నుండి తొలగించబడతాయి** — ఒక సబ్జెక్ట్లా నటించడానికి క్లయింట్లు `x-omniroute-auth-*`ను ముందుగానే నింపలేరు.

### పాలసీ ఒప్పందాలు

ప్రతి రూట్ క్లాస్కు `src/server/authz/policies/`లో ఒక పాలసీ ఉంటుంది:

- **`publicPolicy`** (`policies/public.ts`) — ఎల్లప్పుడూ `allow({ kind: "anonymous", id: "anonymous" })`ను అందిస్తుంది.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearerను సంగ్రహించి, `validateApiKey()` ద్వారా ధ్రువీకరిస్తుంది. ప్రభావవంతమైన `REQUIRE_API_KEY` ఫీచర్ ఫ్లాగ్ నిలిపివేయబడినప్పుడు మాత్రమే అనామక యాక్సెస్కు అనుమతిస్తుంది. ప్రభావవంతమైన ఫ్లాగ్ `isRequireApiKeyEnabled()` (`DB ఫీచర్ ఫ్లాగ్ ఓవర్రైడ్ > process.env.REQUIRE_API_KEY > డిఫాల్ట్`) ద్వారా పరిష్కరించబడుతుంది; కాబట్టి డ్యాష్బోర్డ్ ఫీచర్ ఫ్లాగ్లు మరియు ఎన్విరాన్మెంట్ వేరియబుల్స్ `/api/v1/*`, `/api/v1beta/*`, మరియు అలియాస్లను స్థిరంగా నియంత్రిస్తాయి; రిజాల్వర్ వైఫల్యాలు యాక్సెస్ను నిరాకరిస్తాయి. క్లయింట్ API రూట్లపై డ్యాష్బోర్డ్-సెషన్ అభ్యర్థనలను అనుమతిస్తుంది (డ్యాష్బోర్డ్ మోడల్ కేటలాగ్ ఉపయోగించే `/api/v1/models`తో సహా).
- **`managementPolicy`** (`policies/management.ts`) — డ్యాష్బోర్డ్ సెషన్ను, అంతర్గత మోడల్-సింక్ అభ్యర్థనలను (`/api/providers/[name]/(sync-models|models)`తో సరిపోల్చబడినవి) అంగీకరిస్తుంది, లేదా `isAuthRequired()` falseను అందిస్తే పూర్తిగా దాటవేస్తుంది. Bearer టోకెన్ ఉన్నప్పటికీ అది చెల్లనప్పుడు 403 (`AUTH_001`)ను, లేకపోతే 401ను అందిస్తుంది. ఏ ప్రమాణీకరణ శాఖకు ముందైనా రూట్-గార్డ్ స్థాయిలను (LOCAL_ONLY / ALWAYS_PROTECTED) కూడా అమలు చేస్తుంది — [రూట్ గార్డ్ స్థాయిలు](../security/ROUTE_GUARD_TIERS.md) చూడండి. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`లోని LOCAL_ONLY పాత్లను (ప్రస్తుతం: `/api/mcp/`) Bearer కీ `manage` స్కోప్ను కలిగి ఉన్నప్పుడు లూప్బ్యాక్ కాని చిరునామా నుండి యాక్సెస్ చేయవచ్చు; స్కోప్తో సంబంధం లేకుండా మిగతా LOCAL_ONLY పాత్లన్నీ ఖచ్చితంగా లూప్బ్యాక్కే పరిమితమవుతాయి.

విజయవంతమైన పాలసీ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`తో `AuthSubject`ను అందిస్తుంది. దిగువస్థాయి హ్యాండ్లర్లు ప్రమాణీకరణ లాజిక్ను మళ్లీ అమలు చేయడానికి బదులుగా, `src/server/authz/assertAuth.ts`లోని `assertAuth(request, "CLIENT_API")` ద్వారా దాన్ని చదవవచ్చు.

## పబ్లిక్ రూట్ల జాబితా

`src/shared/constants/publicApiRoutes.ts` అనేది స్పష్టమైన అనుమతి జాబితా:

ఈ జాబితా **ఆకృతి** ఆధారంగా విభజించబడింది, అలాగే ఈ విభజన అత్యంత కీలకమైనది (GHSA-74g9-q8f6-793h): ఒక ప్రిఫిక్స్ను
`startsWith()` ఉపయోగించి సరిపోల్చుతారు, కాబట్టి దాని ప్రారంభ అక్షరాలను పంచుకునే ప్రతి సమీప పాత్తో కూడా అది సరిపోలుతుంది.
`/api/usage/om-usage`ను ప్రిఫిక్స్గా ఉంచడం వల్ల `/api/usage/om-usage<anything>` పబ్లిక్గా గుర్తించబడింది, అలాగే Next దాన్ని
`/api/usage/[connectionId]`కు పరిష్కరిస్తుంది — ఇది స్వంత ఆథెంటికేషన్ లేని హ్యాండ్లర్.

```ts
// నిజమైన సబ్ట్రీలు. ప్రతి ఎంట్రీ తప్పనిసరిగా "/"తో ముగియాలి (యూనిట్ టెస్ట్ ద్వారా నిర్ధారించబడుతుంది).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classifyలో CLIENT_APIగా పరిగణించబడుతుంది, "ఆథెంటికేషన్ అవసరం లేని పబ్లిక్"గా కాదు
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ఒకే రూట్లు, ఖచ్చితంగా సరిపోల్చబడతాయి (చివరలో స్లాష్ ఉన్నా లేకపోయినా).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS మూల పరిమితి సడలింపు కూడా వర్తించే, చదవడానికి మాత్రమే ఉద్దేశించిన ఒకే రూట్లు.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS సడలింపు లేని, చదవడానికి మాత్రమే ఉద్దేశించిన ఒకే రూట్.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

చదవడానికి మాత్రమే ఉద్దేశించిన రూట్లు సురక్షితమైన మెథడ్లకు **మాత్రమే** పబ్లిక్గా ఉంటాయి. గమనిక: `classifyRoute()` పబ్లిక్ ఫాల్-త్రూ నుండి `/api/v1/*` మరియు `/api/v1beta/*`ను మినహాయిస్తుంది — Bearer కీ పాలసీ ఇప్పటికీ వర్తించేలా అవి ఎల్లప్పుడూ `CLIENT_API`గానే ఉంటాయి.

## కొత్త రూట్ను జోడించడం

### నమూనా 1 — పబ్లిక్ క్లయింట్ API ఎండ్పాయింట్ (Bearer ఆథెంటికేషన్)

`/api/v1/` మరియు `/api/v1beta/` కింద ఉన్న రూట్లు స్వయంచాలకంగా `CLIENT_API`గా వర్గీకరించబడతాయి. మిడిల్వేర్ Bearer తనిఖీని అమలు చేస్తుంది; రూట్ హ్యాండ్లర్లు దాన్ని మళ్లీ చేయాల్సిన అవసరం లేదు, కానీ ఉపయోగకరమైతే సబ్జెక్ట్ను చదవవచ్చు.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... హ్యాండ్లర్ లాజిక్
}
```

### నమూనా 2 — నిర్వహణ ఎండ్పాయింట్ (సెషన్ లేదా Bearer + manage)

`src/lib/api/requireManagementAuth.ts` నుండి `requireManagementAuth()`ను ఉపయోగించండి:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... హ్యాండ్లర్ లాజిక్
}
```

విజయవంతమైనప్పుడు `requireManagementAuth()` `null`ను, లేకపోతే JSON ఎర్రర్ `Response`ను తిరిగి ఇస్తుంది:

- 401 `AUTH_001` "ఆథెంటికేషన్ అవసరం" — ఎలాంటి క్రెడెన్షియల్స్ లేవు
- 403 — చెల్లని Bearer **లేదా** Bearer ఉన్నప్పటికీ కీకి `manage` / `admin` స్కోప్ లేదు

`hasManageScope(scopes)` అనేది `"manage"` లేదా `"admin"` కోసం trueను తిరిగి ఇస్తుంది.

### నమూనా 3 — పబ్లిక్ అనుమతి జాబితాకు జోడించడం

సౌలభ్యం ఆధారంగా కాకుండా, ఆకృతి ఆధారంగా సెట్ను ఎంచుకోండి. ఒక రూట్ను `PUBLIC_API_ROUTES_EXACT`లో ఉంచాలి (లేదా GET-మాత్రమే అయితే `PUBLIC_READONLY_CORS_API_ROUTES`లో); నిజమైన సబ్ట్రీని మాత్రమే `PUBLIC_API_ROUTE_PREFIXES`లో ఉంచాలి, అలాగే అది **తప్పనిసరిగా `/`తో ముగియాలి**. ఒకే రూట్ను ప్రిఫిక్స్ జాబితాలో ఉంచడం వల్ల, దాని ప్రారంభ అక్షరాలను పంచుకునే ప్రతి సమీప పాత్ కూడా పబ్లిక్ అవుతుంది — భవిష్యత్తులో జోడించే డైనమిక్-సెగ్మెంట్ సిబ్లింగ్లతో సహా (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` మరియు `tests/unit/authz/classify.test.ts` వద్ద ఉన్న యూనిట్ టెస్ట్లను నవీకరించండి.

## స్కోప్లు

API కీలు ఒక `scopes` అరేను కలిగి ఉంటాయి (`api_keys.scopes`లో JSONగా నిల్వ చేయబడుతుంది, `src/lib/db/apiKeys.ts` చూడండి).

### నిర్వహణ స్కోప్

- `manage` / `admin` — Bearerగా పంపినప్పుడు, నిర్వహణ API ఎండ్పాయింట్లకు యాక్సెస్ను కీకి మంజూరు చేస్తుంది.

### MCP స్కోప్లు (`src/shared/constants/mcpScopes.ts`)

ప్రతి MCP టూల్కు `MCP_TOOL_SCOPES` ద్వారా నిర్దిష్ట స్కోప్లు అవసరం. పూర్తి జాబితా (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts`లోని స్కోప్ అమలు, MCP ప్రమాణీకరణ సమాచారం,
అభ్యర్థన మెటాడేటా లేదా `OMNIROUTE_MCP_SCOPES` నుండి `resolveCallerScopeContext()` స్కోప్లను పరిష్కరించిన తర్వాత,
ప్రతి టూల్ స్కోప్ జాబితాను `evaluateToolScopes()`లోకి పంపుతుంది.

## ప్రమాణీకరణ అవసరం టాగుల్

`src/shared/utils/apiAuth.ts`లోని `isAuthRequired()`, ఒక అభ్యర్థన కోసం **ఏదైనా** ప్రమాణీకరణ అమలు చేయాలా వద్దా అని నిర్ణయిస్తుంది:

- `settings.requireLogin === false` → ప్రమాణీకరణ ప్రపంచవ్యాప్తంగా నిలిపివేయబడుతుంది.
- పాస్వర్డ్ కాన్ఫిగర్ చేయబడకపోవడం **మరియు** `INITIAL_PASSWORD` env var లేకపోవడం → బూట్స్ట్రాప్ మోడ్ ఆన్బోర్డింగ్ విజార్డ్ మరియు లూప్బ్యాక్ అభ్యర్థనలను అనుమతిస్తుంది, కానీ నెట్వర్క్కు బహిర్గతమైన అభ్యర్థనలకు ఇప్పటికీ క్రెడెన్షియల్స్ అవసరం.
- ఏదైనా DB ఎర్రర్ → యాక్సెస్ను నిరాకరిస్తుంది (డిఫాల్ట్గా సురక్షితం).

క్లయింట్ API కీ అమలు, నేరుగా `process.env.REQUIRE_API_KEY`ను చదవకుండా, `src/shared/utils/featureFlags.ts`లోని `isRequireApiKeyEnabled()`ను ఉపయోగిస్తుంది. డిప్లాయ్ చేసిన ఇన్స్టాన్స్లకు ఇది ముఖ్యమైనది: Dashboard → Feature Flagsలో `REQUIRE_API_KEY`ను టాగుల్ చేయడం DB ఓవర్రైడ్ను నిల్వ చేస్తుంది మరియు ఈ సహాయకాన్ని పంచుకునే `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` మరియు ఇతర క్లయింట్-API ప్రమాణీకరణ తనిఖీలపై వెంటనే ప్రభావం చూపుతుంది. ఫీచర్ ఫ్లాగ్ స్టోర్ను చదవలేకపోతే, క్లయింట్ API ప్రమాణీకరణ యాక్సెస్ను నిరాకరించి కీని తప్పనిసరి చేస్తుంది.

## బ్రేకింగ్ మార్పు — v3.8.0

`/api/v1/agents/tasks/*` మరియు `/api/resilience/model-cooldowns` ఎండ్పాయింట్లకు **ఇప్పుడు నిర్వహణ ప్రమాణీకరణ అవసరం** (కమిట్ `588a0333`). గతంలో `manage` స్కోప్ లేని సాధారణ API కీని పంపిన క్లయింట్లు `403`ను అందుకుంటారు. మైగ్రేషన్: API Keys డ్యాష్బోర్డ్లో కీకి `manage` స్కోప్ను కేటాయించండి లేదా లాగిన్ చేసిన డ్యాష్బోర్డ్ సెషన్ను ఉపయోగించండి.

## ప్రవర్తన మార్పు — v3.8.2

`/api/mcp/*` (రిమోట్ MCP సర్వర్) ఇప్పటికీ డిఫాల్ట్గా LOCAL_ONLYగా ఉంటుంది, కానీ `Authorization: Bearer <api-key>` హెడర్లో `manage` స్కోప్ ఉన్నప్పుడు ఇప్పుడు లూప్బ్యాక్ కాని అభ్యర్థనలను అంగీకరిస్తుంది. `src/server/authz/routeGuard.ts`లోని `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ద్వారా ఈ మినహాయింపు ప్రతి పాత్కు స్పష్టంగా నియంత్రించబడుతుంది; సమాన స్థాయి LOCAL_ONLY ప్రిఫిక్స్ `/api/cli-tools/runtime/*` ఏవైనా సబ్ప్రాసెస్లను ప్రారంభించగలదు కాబట్టి, దాన్ని ఉద్దేశపూర్వకంగానే బైపాస్ చేయడం సాధ్యం కాదు. లూప్బ్యాక్ కాని చోట్ల నుండి `/api/mcp/*`కు వచ్చే అనామక అభ్యర్థనలు weiterhin `403 LOCAL_ONLY`ను అందుకుంటాయి — ఏదైనా కొత్త LOCAL_ONLY పాత్కు డిఫాల్ట్గా కఠినమైన లూప్బ్యాక్ నియమమే వర్తిస్తుంది. [రూట్ గార్డ్ స్థాయిలు](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) చూడండి.

## టెస్టింగ్

- యూనిట్ టెస్ట్లు: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- పబ్లిక్ అనుమతి జాబితా: `tests/unit/public-api-routes.test.ts`.
- నిర్దిష్ట టెస్ట్ను అమలు చేయడానికి: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## డీబగ్గింగ్

పైప్లైన్ ఎల్లప్పుడూ ప్రతిస్పందనలకు వీటిని జోడిస్తుంది:

```
x-request-id:               <సహసంబంధ ఐడి, లోప ప్రతిస్పందనల్లో తిరిగి పంపబడుతుంది>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ప్రమాణీకరించిన అభ్యర్థనల కోసం అప్స్ట్రీమ్ (హ్యాండ్లర్ వైపు) అభ్యర్థన హెడర్లలో ఇవి కూడా ఉంటాయి:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<చివరి-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ఐచ్ఛికం)
x-omniroute-auth-scopes:    కామాలతో వేరు చేసిన జాబితా
```

హ్యాండ్లర్లలో `assertAuth(req, expectedClass)`ను ఉపయోగించండి — మిడిల్వేర్ను దాటవేసినట్లయితే, ఇది `AUTHZ_NOT_INITIALIZED` కోడ్తో `AuthzAssertionError`ను విసురుతుంది (పరీక్షల్లో కాన్ఫిగరేషన్ రిగ్రెషన్లను గుర్తించడానికి ఉపయోగకరం).

## ఇవి కూడా చూడండి

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ప్రతి ఎండ్పాయింట్కు ప్రమాణీకరణ మార్కర్
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ప్రమాణీకరణ ఈవెంట్ల కోసం ఆడిట్ లాగ్
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP స్కోప్ అమలు వివరాలు
- సోర్స్: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
