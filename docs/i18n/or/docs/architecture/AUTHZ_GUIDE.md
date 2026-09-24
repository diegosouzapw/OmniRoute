# Authorization Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ସତ୍ୟର ଉତ୍ସ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ଶେଷ ଅପଡେଟ୍:** 2026-09-22 — ସ୍କୋପ୍ ନାମସ୍ପେସ୍ MCP-SERVER.md କୁ ସୂଚାଏ

OmniRoute ରେ ଏକ ରୁଟ୍-ସଚେତନ ଅନୁମତି ପାଇପଲାଇନ୍ ଅଛି ଯାହା ପ୍ରତ୍ୟେକ API ଅନୁରୋଧକୁ ଗେଟ୍ କରେ। ବର୍ଗୀକରଣ **ନିର୍ଣ୍ଣାୟକ** ଏବଂ **ଫେଲ୍-କ୍ଲୋଜ୍ଡ** — ଯାହା ବର୍ଗୀକୃତ ହୋଇପାରିବ ନାହିଁ ତାହା `MANAGEMENT` ଭାବରେ ଶେଷ ହୁଏ ଏବଂ ଏକ ସେସନ୍ କିମ୍ବା ମ୍ୟାନେଜମେଣ୍ଟ-ଗ୍ରେଡ୍ ଟୋକେନ୍ ଆବଶ୍ୟକ କରେ। ଏହି ପୃଷ୍ଠାଟି ରୁଟ୍ ରକ୍ଷଣାବେକ୍ଷଣ କରୁଥିବା କିମ୍ବା ନୂତନ ଏଣ୍ଡପଏଣ୍ଟ୍ ଡିଜାଇନ୍ କରୁଥିବା ଇଞ୍ଜିନିୟରମାନଙ୍କ ପାଇଁ ମଡେଲ୍ ବ୍ୟାଖ୍ୟା କରେ।

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ଉତ୍ସ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ଦୁଇଟି ପ୍ରାମାଣିକରଣ ମୋଡ୍

### 1. API କି (ବିୟରର୍)

OpenAI/Anthropic/Gemini-ସୁସଙ୍ଗତ କ୍ଲାଏଣ୍ଟ API ଏବଂ କିଛି ପରିଚାଳନା ରୁଟ୍ ପାଇଁ ବ୍ୟବହୃତ ହୁଏ, ଯେତେବେଳେ କି’ରେ `manage` ସ୍କୋପ୍ ଥାଏ।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ଭିତରେ ଥିବା `isValidApiKey()` / `extractApiKey()` ଦ୍ୱାରା ବୈଧତା ଯାଞ୍ଚ କରାଯାଏ ଏବଂ `src/shared/utils/apiAuth.ts` ମାଧ୍ୟମରେ ପୁନଃ-ରପ୍ତାନି କରାଯାଏ। ବୈଧତା ଯାଞ୍ଚକାରୀ ସ୍ଥାୟୀ ପାସ୍ଥ୍ରୁ କି ଭାବେ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env varsକୁ ମଧ୍ୟ ଗ୍ରହଣ କରେ (issue #1350)।

### 2. ଡ୍ୟାସ୍ବୋର୍ଡ ସେସନ୍ (auth_token କୁକି)

ଡ୍ୟାସ୍ବୋର୍ଡ ପୃଷ୍ଠା ଏବଂ ଆଡ୍ମିନ୍ କାର୍ଯ୍ୟଗୁଡ଼ିକ ପାଇଁ।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

ଏକ କୁକି କେବଳ ସେତେବେଳେ ସେସନ୍ ହୁଏ, ଯେତେବେଳେ JWT ସଫଳତାର ସହ ଯାଞ୍ଚ ହୁଏ **ଏବଂ** ସେଥିରେ `authenticated: true`
ଥାଏ (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। କୁକିର ପ୍ରତ୍ୟେକ
ଉପଭୋକ୍ତା (ରୁଟ୍ ଗାର୍ଡ, authz ପାଇପ୍ଲାଇନ୍ ରିଫ୍ରେଶ୍, WebSocket ହ୍ୟାଣ୍ଡଶେକ୍, ଲାଇଭ୍
ସର୍ଭର୍, `/api/settings/require-login`, `/api/auth/status`) ସେହି ସହାୟକ ମାଧ୍ୟମରେ ଯାଏ।
`JWT_SECRET` ସହ ସ୍ୱାକ୍ଷରିତ ଅନ୍ୟ JWTଗୁଡ଼ିକ ମଧ୍ୟ ରହିଛି — Cursor CLI ପାସ୍ଥ୍ରୁ କି ଧାରକମାନଙ୍କ ପାଇଁ
`iss "omniroute" / aud "cursor-cli"` ଟୋକନ୍ ତିଆରି କରେ — ଏବଂ ସେଗୁଡ଼ିକ କେବେବି ସେସନ୍ ନୁହେଁ
(#13298)।

`src/shared/utils/apiAuth.ts` ଭିତରେ ଥିବା `isDashboardSessionAuthenticated()` ଦ୍ୱାରା ଯାଞ୍ଚ କରାଯାଏ। JWTର 30-ଦିନିଆ ଆୟୁଷରେ 7 ଦିନରୁ କମ୍ ସମୟ ବାକି ଥିଲେ, ପାଇପ୍ଲାଇନ୍ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଏହାକୁ ରିଫ୍ରେଶ୍ କରେ।

କିଛି ପରିଚାଳନା ରୁଟ୍ **ଉଭୟ ମଧ୍ୟରୁ ଯେକୌଣସି** ମୋଡ୍ ଗ୍ରହଣ କରେ: କୁକି କିମ୍ବା `Bearer <key>`, ଯେତେବେଳେ API କି’ରେ `manage` (କିମ୍ବା `admin`) ସ୍କୋପ୍ ଥାଏ। ଏହାହିଁ v3.8ରେ ଯୋଡ଼ାଯାଇଥିବା "API କଲ୍ ମାଧ୍ୟମରେ ବିନ୍ୟାସଯୋଗ୍ୟ" କାର୍ଯ୍ୟପ୍ରବାହକୁ ସକ୍ଷମ କରେ।

#### ଇଚ୍ଛାଧୀନ OIDC ଲଗଇନ୍ ଗେଟ୍ (#6973)

ଡ୍ୟାସ୍ବୋର୍ଡ ଆଡ୍ମିନ୍ ଲଗଇନ୍ ଡିଫଲ୍ଟ ପାସ୍ୱାର୍ଡ ଲଗଇନ୍ ସହିତ ଏକ **ଇଚ୍ଛାଧୀନ**
OIDC (OpenID Connect) ପ୍ରବାହକୁ ମଧ୍ୟ ସମର୍ଥନ କରେ — ପାସ୍ୱାର୍ଡ ଲଗଇନ୍ କେବେବି ଅପସାରିତ ହୁଏ ନାହିଁ, କେବଳ
ପରିପୂରକ ଭାବେ ଯୋଡ଼ାଯାଏ:

- `settings.oidcEnabled === true` ଥିବା **ଏବଂ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ସବୁ ବିନ୍ୟାସିତ ହୋଇଥିବା ବ୍ୟତୀତ ଏହା ଅକ୍ଷମ ରହେ (Settings → Auth)।
  ଅନ୍ୟଥା `GET /api/auth/oidc/login` `400` ଫେରାଏ।
- `GET /api/auth/oidc/login`, ଇସ୍ୟୁଅର୍ର
  `/.well-known/openid-configuration`ରୁ `authorization_endpoint` ଆବିଷ୍କାର କରେ (ବିକଳ୍ପ ଭାବେ
  `<issuer>/authorize` ବ୍ୟବହାର କରେ), ଆଗତ ଅନୁରୋଧରୁ ରିଡାଇରେକ୍ଟ URI ନିର୍ମାଣ କରେ
  (`x-forwarded-proto`-ସଚେତନ), ଏବଂ ଏକ `httpOnly` `oidc_state` କୁକିରେ ସଂରକ୍ଷିତ ଯାଦୃଚ୍ଛିକ `state`
  ସହିତ IdPକୁ ରିଡାଇରେକ୍ଟ କରେ।
- `GET /api/auth/oidc/callback`, `state`କୁ ବୈଧ କରେ, ପ୍ରାଧିକରଣ
  କୋଡ୍ ବିନିମୟ କରେ, ଏବଂ ଇସ୍ୟୁଅର୍ର JWKS ମାଧ୍ୟମରେ ID ଟୋକନ୍ର ସ୍ୱାକ୍ଷର
  (`jose`ର `createRemoteJWKSet`, ପ୍ରତ୍ୟେକ JWKS URI ପାଇଁ କ୍ୟାଶ୍ କରାଯାଇଥିବା) `issuer`/`audience`
  ଯାଞ୍ଚ ସହିତ ସତ୍ୟାପନ କରେ। ଏକ ଇଚ୍ଛାଧୀନ `oidcAllowedSubjects` ଅନୁମତି-ତାଲିକା ଟୋକନ୍ର
  `sub` କ୍ଲେମ୍ କିମ୍ବା ଏହାର `email` କ୍ଲେମ୍ ସହ ମେଳ ଖାଏ — `email` କ୍ଲେମ୍କୁ କେବଳ
  `email_verified === true` ଥିଲେ ଗ୍ରହଣ କରାଯାଏ, ତେଣୁ IdPରେ ଥିବା ଏକ ଅଯାଞ୍ଚିତ ଇମେଲ୍ କେବେବି
  ଗେଟ୍ ଅତିକ୍ରମ କରିପାରିବ ନାହିଁ।
- ସଫଳ ହେଲେ ଏହା ପାସ୍ୱାର୍ଡ ଲଗଇନ୍ ଦ୍ୱାରା ଜାରି କରାଯାଉଥିବା **ଠିକ୍ ସେହି** 30-ଦିନିଆ `auth_token` JWT
  ତିଆରି କରେ (`src/app/api/auth/login/route.ts`), ତେଣୁ ଡ୍ୟାସ୍ବୋର୍ଡ
  ସେସନ୍ ପାଇପ୍ଲାଇନ୍ର ଅବଶିଷ୍ଟ ଅଂଶ (ସ୍ୱୟଂଚାଳିତ ରିଫ୍ରେଶ୍, କୁକି ଫ୍ଲାଗ୍ଗୁଡ଼ିକ) ଅପରିବର୍ତ୍ତିତ ରହେ —
  OIDC କେବଳ କୁକି କିପରି ତିଆରି ହୁଏ ତାହାକୁ ବଦଳାଏ, ଏହା କେଉଁ ଅନୁମତି ପ୍ରଦାନ କରେ ତାହାକୁ ନୁହେଁ।

## ରୁଟ୍ କ୍ଲାସ୍ଗୁଡ଼ିକ

`src/server/authz/types.ts` ତିନୋଟି କ୍ଲାସ୍ ପରିଭାଷିତ କରେ; ଯେକୌଣସି ରୁଟ୍କୁ ଯଦି ନିର୍ଦ୍ଧାରଣାତ୍ମକ ଭାବେ ବର୍ଗୀକୃତ କରାଯାଇପାରେ ନାହିଁ, ତେବେ ଏହା `MANAGEMENT`କୁ ଫେରିଯାଏ।

| କ୍ଲାସ୍       | ବର୍ଣ୍ଣନା                                                                                                                                                     | ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକତା                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `PUBLIC`     | ସ୍ପଷ୍ଟ ଭାବେ ସୁରକ୍ଷିତ ରୁଟ୍ଗୁଡ଼ିକ — ଲଗ୍ଇନ୍, ଲଗ୍ଆଉଟ୍, ସ୍ଥିତି, ପ୍ରାରମ୍ଭୀକରଣ, ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ, ଅନବୋର୍ଡିଂ ବୁଟ୍ଷ୍ଟ୍ରାପ୍।                                            | କିଛି ନୁହେଁ                                                      |
| `CLIENT_API` | ମଡେଲ୍-ସର୍ଭିଂ ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ — `/api/v1/*`, `/api/v1beta/*`, ଏବଂ ଉପନାମଗୁଡ଼ିକ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | ପ୍ରଭାବୀ `REQUIRE_API_KEY` ଫିଚର୍ ଫ୍ଲାଗ୍ ସକ୍ଷମ ଥିବାବେଳେ Bearer କୀ |
| `MANAGEMENT` | ଡ୍ୟାସ୍ବୋର୍ଡ ପୃଷ୍ଠା, ସେଟିଂସ୍, ପ୍ରଦାତା, କୀ, ପ୍ରଶାସନ ଏବଂ ଡାୟାଗ୍ନୋଷ୍ଟିକ୍ସ ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ।                                                                       | ଡ୍ୟାସ୍ବୋର୍ଡ ସେସନ୍ କିମ୍ବା `manage` ସ୍କୋପ୍ ସହିତ Bearer            |

## ପାଇପ୍ଲାଇନ୍

```
ଆସୁଥିବା ଅନୁରୋଧ → src/proxy.ts
  → src/server/authz/pipeline.tsରେ runAuthzPipeline()
    1. ବିଶ୍ୱସ୍ତ ଆଭ୍ୟନ୍ତରୀଣ ହେଡର୍ଗୁଡ଼ିକୁ ବାଦ ଦିଅନ୍ତୁ (x-omniroute-auth-*, x-omniroute-route-class)
    2. ଅନୁରୋଧ id ସୃଷ୍ଟି କରନ୍ତୁ, classifyRoute() ମାଧ୍ୟମରେ ରୁଟ୍ ବର୍ଗୀକରଣ କରନ୍ତୁ
    3. ଯଦି pathname == "/" → /dashboardକୁ ପୁନଃନିର୍ଦ୍ଦେଶ କରନ୍ତୁ
    4. ଯଦି ଡ୍ରେନିଂ ଚାଲିଛି (ସୁବ୍ୟବସ୍ଥିତ ଶଟ୍ଡାଉନ୍) ଏବଂ /api/* → 503
    5. ଯଦି non-GET /api/* → checkBodySize() ଗାର୍ଡ
    6. ଯଦି OPTIONS → CORS ପ୍ରିଫ୍ଲାଇଟ୍ 204
    7. ଯଦି options.enforce == false → ରୁଟ୍-କ୍ଲାସ୍ ହେଡର୍ଗୁଡ଼ିକ ସହିତ ପାସ୍-ଥ୍ରୁ
    8. ଅନ୍ୟଥା: POLICIES[routeClass].evaluate(ctx)
       - ଅନୁମତି  → x-omniroute-auth-{kind,id,label,scopes} ଯୋଡ଼ନ୍ତୁ → NextResponse.next()
       - ପ୍ରତ୍ୟାଖ୍ୟାନ → correlation_id ସହିତ JSON ତ୍ରୁଟି (ଡ୍ୟାସ୍ବୋର୍ଡ ପୃଷ୍ଠାଗୁଡ଼ିକ → 302 /login)
```

ବିଶ୍ୱସ୍ତ ଆଭ୍ୟନ୍ତରୀଣ ହେଡର୍ଗୁଡ଼ିକ (`src/server/authz/headers.ts`ରେ ପରିଭାଷିତ) ବର୍ଗୀକରଣ ପୂର୍ବରୁ **ଆସୁଥିବା ଅନୁରୋଧଗୁଡ଼ିକରୁ ବାଦ ଦିଆଯାଏ** — କ୍ଲାଏଣ୍ଟମାନେ କୌଣସି ବିଷୟର ଛଦ୍ମବେଶ ଧାରଣ କରିବା ପାଇଁ `x-omniroute-auth-*`କୁ ଆଗୁଆ ପୂରଣ କରିପାରିବେ ନାହିଁ।

### ପଲିସି ଚୁକ୍ତିଗୁଡ଼ିକ

ପ୍ରତ୍ୟେକ ରୁଟ୍ କ୍ଲାସ୍ର `src/server/authz/policies/`ରେ ଏକ ପଲିସି ଅଛି:

- **`publicPolicy`** (`policies/public.ts`) — ସର୍ବଦା `allow({ kind: "anonymous", id: "anonymous" })` ଫେରାଏ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ବାହାର କରେ, `validateApiKey()` ମାଧ୍ୟମରେ ବୈଧତା ଯାଞ୍ଚ କରେ। ପ୍ରଭାବୀ `REQUIRE_API_KEY` ଫିଚର୍ ଫ୍ଲାଗ୍ ଅକ୍ଷମ ଥିଲେ ମାତ୍ର ଅଜ୍ଞାତ ଉପଯୋଗକର୍ତ୍ତାକୁ ଫଲ୍-ଥ୍ରୁ କରେ। ପ୍ରଭାବୀ ଫ୍ଲାଗ୍ଟି `isRequireApiKeyEnabled()` (`DB ଫିଚର୍ ଫ୍ଲାଗ୍ ଓଭର୍ରାଇଡ୍ > process.env.REQUIRE_API_KEY > ଡିଫଲ୍ଟ`) ମାଧ୍ୟମରେ ସମାଧାନ କରାଯାଏ, ଯାହାଦ୍ୱାରା ଡ୍ୟାସ୍ବୋର୍ଡ ଫିଚର୍ ଫ୍ଲାଗ୍ ଏବଂ ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ `/api/v1/*`, `/api/v1beta/*` ଓ ଉପନାମଗୁଡ଼ିକୁ ସୁସଙ୍ଗତ ଭାବେ ନିୟନ୍ତ୍ରଣ କରନ୍ତି; ରିଜଲ୍ଭର୍ ବିଫଳତାଗୁଡ଼ିକ ଆକ୍ସେସ୍ ବନ୍ଦ ରଖେ। କ୍ଲାଏଣ୍ଟ API ରୁଟ୍ଗୁଡ଼ିକରେ ଡ୍ୟାସ୍ବୋର୍ଡ-ସେସନ୍ ଅନୁରୋଧଗୁଡ଼ିକୁ ଅନୁମତି ଦିଏ (`/api/v1/models` ସମେତ, ଯାହା ଡ୍ୟାସ୍ବୋର୍ଡ ମଡେଲ୍ କ୍ୟାଟାଲଗ୍ ଦ୍ୱାରା ବ୍ୟବହୃତ)।
- **`managementPolicy`** (`policies/management.ts`) — ଡ୍ୟାସ୍ବୋର୍ଡ ସେସନ୍, ଆଭ୍ୟନ୍ତରୀଣ ମଡେଲ୍-ସିଙ୍କ୍ ଅନୁରୋଧଗୁଡ଼ିକ (`/api/providers/[name]/(sync-models|models)` ସହିତ ମେଳ କରାଯାଇଥିବା) ଗ୍ରହଣ କରେ, କିମ୍ବା `isAuthRequired()` false ଫେରାଇଲେ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଏଡ଼ାଇଯାଏ। ଏକ Bearer ଟୋକେନ୍ ଉପସ୍ଥିତ କିନ୍ତୁ ଅବୈଧ ହେଲେ 403 (`AUTH_001`), ଅନ୍ୟଥା 401 ଫେରାଏ। କୌଣସି ପ୍ରମାଣୀକରଣ ଶାଖା ପୂର୍ବରୁ ରୁଟ୍-ଗାର୍ଡ ସ୍ତରଗୁଡ଼ିକ (LOCAL_ONLY / ALWAYS_PROTECTED) ମଧ୍ୟ ପ୍ରୟୋଗ କରେ — [ରୁଟ୍ ଗାର୍ଡ ସ୍ତରଗୁଡ଼ିକ](../security/ROUTE_GUARD_TIERS.md) ଦେଖନ୍ତୁ। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`ରେ ଥିବା LOCAL_ONLY ପଥଗୁଡ଼ିକ (ବର୍ତ୍ତମାନ: `/api/mcp/`)ରେ Bearer କୀ `manage` ସ୍କୋପ୍ ବହନ କଲେ non-loopbackରୁ ପ୍ରବେଶ କରାଯାଇପାରେ; ଅନ୍ୟ ସମସ୍ତ LOCAL_ONLY ପଥ ସ୍କୋପ୍କୁ ଖାତିର ନକରି strict-loopback ହୋଇ ରହେ।

ଏକ ସଫଳ ପଲିସି `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ସହିତ `AuthSubject` ଫେରାଏ। ଡାଉନ୍ଷ୍ଟ୍ରିମ୍ ହ୍ୟାଣ୍ଡଲର୍ଗୁଡ଼ିକ ପ୍ରମାଣୀକରଣ ତର୍କକୁ ପୁନଃ ଚଳାଇବା ପରିବର୍ତ୍ତେ `src/server/authz/assertAuth.ts`ରେ ଥିବା `assertAuth(request, "CLIENT_API")` ମାଧ୍ୟମରେ ଏହାକୁ ପଢ଼ିପାରିବେ।

## ସାର୍ବଜନୀନ ରୁଟ୍ଗୁଡ଼ିକର ତାଲିକା

`src/shared/constants/publicApiRoutes.ts` ହେଉଛି ସ୍ପଷ୍ଟ ଅନୁମୋଦିତ ତାଲିକା:

ତାଲିକାଟି **ଆକୃତି** ଅନୁସାରେ ବିଭକ୍ତ, ଏବଂ ଏହି ବିଭାଜନଟି ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ (GHSA-74g9-q8f6-793h): ଏକ ଉପସର୍ଗକୁ
`startsWith()` ସହିତ ମେଳ କରାଯାଏ, ତେଣୁ ଏହାର ପ୍ରାରମ୍ଭିକ ଅକ୍ଷରଗୁଡ଼ିକ ସମାନ ଥିବା ପ୍ରତ୍ୟେକ ସଂଲଗ୍ନ ପଥ ସହିତ ମଧ୍ୟ ଏହା ମେଳ ଖାଏ।
ଉପସର୍ଗ ଭାବରେ `/api/usage/om-usage`, `/api/usage/om-usage<anything>`କୁ ସାର୍ବଜନୀନ ଭାବେ ଚିହ୍ନିତ କରିଥିଲା, ଏବଂ Next ଏହାକୁ
`/api/usage/[connectionId]` ଭାବରେ ସମାଧାନ କରେ — ଏପରି ଏକ ହ୍ୟାଣ୍ଡଲର୍ ଯାହାର ନିଜସ୍ୱ ପ୍ରମାଣୀକରଣ ନାହିଁ।

```ts
// ପ୍ରକୃତ ଉପବୃକ୍ଷଗୁଡ଼ିକ। ପ୍ରତ୍ୟେକ ଏଣ୍ଟ୍ରି "/"ରେ ଶେଷ ହେବା ଆବଶ୍ୟକ (ଏକ ୟୁନିଟ୍ ପରୀକ୍ଷା ଦ୍ୱାରା ଏହା ନିଶ୍ଚିତ କରାଯାଇଛି)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classifyରେ CLIENT_API ଭାବେ ବିବେଚିତ, "ପ୍ରମାଣୀକରଣ-ବିହୀନ ସାର୍ବଜନୀନ" ଭାବେ ନୁହେଁ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ଏକକ ରୁଟ୍ଗୁଡ଼ିକ, ଠିକ୍ ଭାବରେ ମେଳ କରାଯାଏ (ଶେଷରେ ସ୍ଲାସ୍ ଥାଉ କିମ୍ବା ନଥାଉ)।
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

// କେବଳ-ପଠନୀୟ ଏକକ ରୁଟ୍ଗୁଡ଼ିକ, ଯେଉଁଗୁଡ଼ିକ CORS ଉତ୍ସ ଶିଥିଳତା ମଧ୍ୟ ପାଆନ୍ତି।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ଶିଥିଳତା ବିନା କେବଳ-ପଠନୀୟ ଏକକ ରୁଟ୍।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

କେବଳ-ପଠନୀୟ ରୁଟ୍ଗୁଡ଼ିକ ସୁରକ୍ଷିତ ପଦ୍ଧତି ପାଇଁ **କେବଳ** ସାର୍ବଜନୀନ। ଧ୍ୟାନ ଦିଅନ୍ତୁ: `classifyRoute()`, `/api/v1/*` ଏବଂ `/api/v1beta/*`କୁ PUBLIC ଫଲ୍-ଥ୍ରୁରୁ ବାଦ ଦିଏ — ସେଗୁଡ଼ିକ ସର୍ବଦା `CLIENT_API`, ତେଣୁ Bearer-କୀ ନୀତି ଏବେ ମଧ୍ୟ ପ୍ରୟୋଗ ହୁଏ।

## ଏକ ନୂତନ ରୁଟ୍ ଯୋଡ଼ିବା

### ପ୍ୟାଟର୍ନ 1 — ସାର୍ବଜନୀନ କ୍ଲାଏଣ୍ଟ API ଏଣ୍ଡପଏଣ୍ଟ (Bearer-ପ୍ରମାଣୀକରଣ)

`/api/v1/` ଏବଂ `/api/v1beta/` ଅଧୀନରେ ଥିବା ରୁଟ୍ଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବରେ `CLIENT_API` ଭାବେ ବର୍ଗୀକୃତ କରାଯାଏ। ମିଡଲ୍ୱେର୍ Bearer ଯାଞ୍ଚକୁ ବାଧ୍ୟତାମୂଳକ କରେ; ରୁଟ୍ ହ୍ୟାଣ୍ଡଲର୍ଗୁଡ଼ିକୁ ଏହା ପୁନର୍ବାର କରିବାର ଆବଶ୍ୟକତା ନାହିଁ, କିନ୍ତୁ ଉପଯୋଗୀ ହେଲେ ସବ୍ଜେକ୍ଟକୁ ପଢ଼ିପାରିବେ।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ହ୍ୟାଣ୍ଡଲର୍ ତର୍କ
}
```

### ପ୍ୟାଟର୍ନ 2 — ପରିଚାଳନା ଏଣ୍ଡପଏଣ୍ଟ (ସେସନ୍ କିମ୍ବା Bearer + manage)

`src/lib/api/requireManagementAuth.ts`ରୁ `requireManagementAuth()` ବ୍ୟବହାର କରନ୍ତୁ:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ହ୍ୟାଣ୍ଡଲର୍ ତର୍କ
}
```

ସଫଳ ହେଲେ `requireManagementAuth()` `null` ଫେରାଏ, ନଚେତ୍ ଏକ JSON ତ୍ରୁଟି `Response` ଫେରାଏ:

- 401 `AUTH_001` "ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକ" — ଆଦୌ କୌଣସି ପରିଚୟପତ୍ର ନାହିଁ
- 403 — ଅବୈଧ Bearer **କିମ୍ବା** Bearer ଉପସ୍ଥିତ ଅଛି, କିନ୍ତୁ କୀ ପାଖରେ `manage` / `admin` ସ୍କୋପ୍ ନାହିଁ

`"manage"` କିମ୍ବା `"admin"` ପାଇଁ `hasManageScope(scopes)` true ଫେରାଏ।

### ପ୍ୟାଟର୍ନ 3 — ସାର୍ବଜନୀନ ଅନୁମୋଦିତ ତାଲିକାରେ ଯୋଡ଼ିବା

ସୁବିଧା ଅନୁସାରେ ନୁହେଁ, ଆକୃତି ଅନୁସାରେ ସେଟ୍ ବାଛନ୍ତୁ। ଗୋଟିଏ ରୁଟ୍ `PUBLIC_API_ROUTES_EXACT`ରେ ଯାଏ (କିମ୍ବା କେବଳ-GET ପାଇଁ `PUBLIC_READONLY_CORS_API_ROUTES`ରେ); କେବଳ ଏକ ପ୍ରକୃତ ଉପବୃକ୍ଷ `PUBLIC_API_ROUTE_PREFIXES`ରେ ଯାଏ, ଏବଂ ଏହା **`/`ରେ ଶେଷ ହେବା ଆବଶ୍ୟକ**। ଉପସର୍ଗ ତାଲିକାରେ ଗୋଟିଏ ଏକକ ରୁଟ୍ ରଖିବା ଦ୍ୱାରା ଏହାର ପ୍ରାରମ୍ଭିକ ଅକ୍ଷରଗୁଡ଼ିକ ସମାନ ଥିବା ପ୍ରତ୍ୟେକ ସଂଲଗ୍ନ ପଥ ମଧ୍ୟ ସାର୍ବଜନୀନ ହୋଇଯାଏ — ଏଥିରେ ପରେ ଯୋଡ଼ାଯାଇଥିବା ଡାଇନାମିକ୍-ସେଗମେଣ୍ଟ ସହୋଦର ରୁଟ୍ଗୁଡ଼ିକ ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ଏବଂ `tests/unit/authz/classify.test.ts`ରେ ଥିବା ୟୁନିଟ୍ ପରୀକ୍ଷାଗୁଡ଼ିକୁ ଅଦ୍ୟତନ କରନ୍ତୁ।

## ସ୍କୋପ୍ସ

ତିନୋଟି ନାମସ୍ପେସ୍। ପ୍ରତ୍ୟେକ ଚେକର୍ କେବଳ ନିଜର ଷ୍ଟ୍ରିଙ୍ଗ୍ ପଢ଼େ। `manage` କାହିଁକି `read:compression` ପାଇଁ `scopeMatches` ରେ ବିଫଳ ହୁଏ ଏବଂ `read` ଆକ୍ସେସ୍ ଟୋକେନ୍ କାହିଁକି `PATCH /api/keys/{id}` କରିପାରିବ ନାହିଁ, ତାହା ସହିତ ପାର୍ଶ୍ୱ-ପାର୍ଶ୍ୱ ତୁଳନା [ତିନୋଟି ସ୍କୋପ୍ ନାମସ୍ପେସ୍](../frameworks/MCP-SERVER.md#three-scope-namespaces) ରେ ଦିଆଯାଇଛି।

API କି'ଗୁଡ଼ିକ ଏକ `scopes` ଆରେ ଧାରଣ କରନ୍ତି (JSON ଭାବରେ `api_keys.scopes` ରେ ସଂରକ୍ଷିତ, `src/lib/db/apiKeys.ts` ଦେଖନ୍ତୁ)।

### ପରିଚାଳନା ସ୍କୋପ୍

- `manage` / `admin` — `hasManageScope`। ପରିଚାଳନା API ରୁଟ୍ଗୁଡ଼ିକୁ ବେୟରର୍ ଆକ୍ସେସ୍।
- `mcp:connect`, `self:usage`, `self:account-quota`, ଏବଂ
  `policy:bypass-provider-quota` ହେଉଛି ଯୋଗାତ୍ମକ ସଠିକ୍-ମେଳ ସ୍କୋପ୍ସ। ସେଗୁଡ଼ିକ
  `MANAGEMENT_API_KEY_SCOPES` ବାହାରେ ରୁହନ୍ତି। `mcp:connect` କେବଳ
  `/api/mcp/` ନନ୍-ଲୁପ୍ବ୍ୟାକ୍ କାର୍ଭ-ଆଉଟ୍ ଖୋଲିଥାଏ।

### MCP ଟୁଲ୍ ସ୍କୋପ୍ସ

କାଟାଲଗ୍ ଏବଂ ମେଳ ଖାଉଥିବା ନିୟମ (ସମାନ ଷ୍ଟ୍ରିଙ୍ଗ୍, କିମ୍ବା `*` ରେ ଶେଷ ହେଉଥିବା ଏକ ଅନୁମତିପ୍ରାପ୍ତ ସ୍କୋପ୍):
[MCP ଟୁଲ୍ ସ୍କୋପ୍ସ](../frameworks/MCP-SERVER.md#mcp-tool-scopes)।
`src/shared/constants/mcpScopes.ts` ରେ ଥିବା `MCP_SCOPE_LIST` ହେଉଛି ମୂଳ ଟାଇପ୍ କରାଯାଇଥିବା ସବ୍ସେଟ୍,
ସମ୍ପୂର୍ଣ୍ଣ କାଟାଲଗ୍ ନୁହେଁ। `resolveCallerScopeContext()` MCP ଅଥ୍ ସୂଚନା, ଅନୁରୋଧ ମେଟାଡାଟା,
କିମ୍ବା `OMNIROUTE_MCP_SCOPES` ରୁ ସ୍କୋପ୍ସ ସମାଧାନ କରିବା ପରେ
`open-sse/mcp-server/scopeEnforcement.ts` ରେ ଏନଫୋର୍ସମେଣ୍ଟ ଚାଲିଥାଏ।
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` ନହେବା ପର୍ଯ୍ୟନ୍ତ ଏହା ବନ୍ଦ ରୁହେ।

### ଆକ୍ସେସ୍-ଟୋକେନ୍ ସ୍କୋପ୍ସ

`oma_live_…` ଟୋକେନ୍ଗୁଡ଼ିକ ଉପରେ `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ଦ୍ୱାରା ମାନ୍ୟତାପ୍ରାପ୍ତ। ଏହି ମାନ୍ୟତା କେବଳ
ଆକ୍ସେସ୍-ଟୋକେନ୍ କ୍ରେଡେନ୍ସିଆଲ୍ ପାଇଁ ପ୍ରଯୁଜ୍ୟ। [ପରିଚାଳନା ପ୍ରମାଣୀକରଣ](../guides/MANAGEMENT-AUTH.md) ଦେଖନ୍ତୁ।

## ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକ ଟଗଲ୍

`src/shared/utils/apiAuth.ts`ରେ ଥିବା `isAuthRequired()` କୌଣସି ଅନୁରୋଧ ପାଇଁ **କୌଣସି ପ୍ରକାରର** ପ୍ରମାଣୀକରଣ ପ୍ରବର୍ତ୍ତନ କରାଯିବ କି ନାହିଁ, ତାହା ନିର୍ଣ୍ଣୟ କରେ:

- `settings.requireLogin === false` → ପ୍ରମାଣୀକରଣ ବିଶ୍ୱବ୍ୟାପୀ ଭାବେ ଅକ୍ଷମ ହୋଇଛି।
- କୌଣସି ପାସ୍ୱାର୍ଡ୍ କନଫିଗର୍ ହୋଇନାହିଁ **ଏବଂ** କୌଣସି `INITIAL_PASSWORD` env var ନାହିଁ → ବୁଟ୍ଷ୍ଟ୍ରାପ୍ ମୋଡ୍ ଅନ୍ବୋର୍ଡିଂ ୱିଜାର୍ଡ୍ ଏବଂ ଲୁପ୍ବ୍ୟାକ୍ ଅନୁରୋଧଗୁଡ଼ିକୁ ଅନୁମତି ଦିଏ, କିନ୍ତୁ ନେଟ୍ୱର୍କରେ ଉନ୍ମୁକ୍ତ ଅନୁରୋଧଗୁଡ଼ିକ ପାଇଁ ତଥାପି ପ୍ରମାଣପତ୍ର ଆବଶ୍ୟକ।
- ଯେକୌଣସି DB ତ୍ରୁଟି → ପ୍ରବେଶ ବନ୍ଦ କରେ (ଡିଫଲ୍ଟ ଭାବେ ସୁରକ୍ଷିତ)।

କ୍ଲାଏଣ୍ଟ API କୀ ପ୍ରବର୍ତ୍ତନ ସିଧାସଳଖ `process.env.REQUIRE_API_KEY` ପଢ଼ିବା ପରିବର୍ତ୍ତେ `src/shared/utils/featureFlags.ts`ରେ ଥିବା `isRequireApiKeyEnabled()` ବ୍ୟବହାର କରେ। ଡିପ୍ଲୟ କରାଯାଇଥିବା ଇନ୍ଷ୍ଟାନ୍ସଗୁଡ଼ିକ ପାଇଁ ଏହା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ: Dashboard → Feature Flagsରେ `REQUIRE_API_KEY` ଟଗଲ୍ କରିବା ଏକ DB ଓଭର୍ରାଇଡ୍ ସଂରକ୍ଷଣ କରେ ଏବଂ ତୁରନ୍ତ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ଏବଂ ଏହି ସହାୟକକୁ ଅଂଶୀଦାର କରୁଥିବା ଅନ୍ୟ କ୍ଲାଏଣ୍ଟ-API ପ୍ରମାଣୀକରଣ ଯାଞ୍ଚଗୁଡ଼ିକୁ ପ୍ରଭାବିତ କରେ। ଯଦି ଫିଚର୍ ଫ୍ଲାଗ୍ ଷ୍ଟୋର୍ ପଢ଼ାଯାଇପାରେ ନାହିଁ, ତେବେ କ୍ଲାଏଣ୍ଟ API ପ୍ରମାଣୀକରଣ ପ୍ରବେଶ ବନ୍ଦ କରେ ଏବଂ ଏକ କୀ ଆବଶ୍ୟକ କରେ।

## ବ୍ରେକିଂ ପରିବର୍ତ୍ତନ — v3.8.0

`/api/v1/agents/tasks/*` ଏବଂ `/api/resilience/model-cooldowns` ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ ପାଇଁ **ବର୍ତ୍ତମାନ ପରିଚାଳନା ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକ** (commit `588a0333`)। ପୂର୍ବରୁ `manage` ସ୍କୋପ୍ ବିନା ଏକ ସାଧାରଣ API କୀ ପଠାଉଥିବା କ୍ଲାଏଣ୍ଟଗୁଡ଼ିକ `403` ପାଇବେ। ମାଇଗ୍ରେସନ୍: API Keys ଡ୍ୟାସ୍ବୋର୍ଡ୍ରେ କୀକୁ `manage` ସ୍କୋପ୍ ଦିଅନ୍ତୁ, କିମ୍ବା ଏକ ଲଗ୍ଇନ୍ ହୋଇଥିବା ଡ୍ୟାସ୍ବୋର୍ଡ୍ ସେସନ୍ ବ୍ୟବହାର କରନ୍ତୁ।

## ଆଚରଣ ପରିବର୍ତ୍ତନ — v3.8.2

`/api/mcp/*` (ରିମୋଟ୍ MCP ସର୍ଭର୍) ଏବେ ମଧ୍ୟ ଡିଫଲ୍ଟ ଭାବେ LOCAL_ONLY ଅଟେ, କିନ୍ତୁ `Authorization: Bearer <api-key>` ହେଡର୍ରେ `manage` ସ୍କୋପ୍ ଥିଲେ ଏହା ବର୍ତ୍ତମାନ ଅଣ-ଲୁପ୍ବ୍ୟାକ୍ ଅନୁରୋଧଗୁଡ଼ିକୁ ଗ୍ରହଣ କରେ। ଏହି ବିଶେଷ ଛାଡ଼ `src/server/authz/routeGuard.ts`ରେ ଥିବା `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ମାଧ୍ୟମରେ ପ୍ରତ୍ୟେକ ପଥ ପାଇଁ ସ୍ପଷ୍ଟ ଭାବେ ନିୟନ୍ତ୍ରିତ; ସମାନ ସ୍ତରର LOCAL_ONLY ପ୍ରିଫିକ୍ସ `/api/cli-tools/runtime/*`କୁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ ବାଇପାସ୍ଯୋଗ୍ୟ କରାଯାଇନାହିଁ, କାରଣ ଏହା ଇଚ୍ଛାମୁତାବକ ସବ୍ପ୍ରୋସେସ୍ଗୁଡ଼ିକୁ ସୃଷ୍ଟି କରିପାରେ। ଅଣ-ଲୁପ୍ବ୍ୟାକ୍ରୁ `/api/mcp/*`କୁ ଆସୁଥିବା ଅଜ୍ଞାତ ଅନୁରୋଧଗୁଡ଼ିକ `403 LOCAL_ONLY` ଫେରାଇବା ଜାରି ରଖେ — ଯେକୌଣସି ନୂତନ LOCAL_ONLY ପଥ ପାଇଁ ଡିଫଲ୍ଟ ନୀତି କଠୋର-ଲୁପ୍ବ୍ୟାକ୍ ହୋଇ ରହେ। [ରୁଟ୍ ଗାର୍ଡ୍ ସ୍ତରଗୁଡ଼ିକ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ଦେଖନ୍ତୁ।

## ପରୀକ୍ଷଣ

- ୟୁନିଟ୍ ପରୀକ୍ଷଣଗୁଡ଼ିକ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- ସାର୍ବଜନୀନ ଅନୁମୋଦିତ ତାଲିକା: `tests/unit/public-api-routes.test.ts`।
- କେନ୍ଦ୍ରିତ ଭାବେ ଚଲାନ୍ତୁ: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## ଡିବଗିଂ

ପାଇପଲାଇନ୍ ସର୍ବଦା ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକରେ ନିମ୍ନଲିଖିତ ହେଡର୍ ଯୋଡ଼େ:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ପ୍ରମାଣିତ ଅନୁରୋଧଗୁଡ଼ିକ ପାଇଁ ଅପ୍ଷ୍ଟ୍ରିମ୍ (ହ୍ୟାଣ୍ଡଲର୍-ପାର୍ଶ୍ୱ) ଅନୁରୋଧ ହେଡର୍ଗୁଡ଼ିକରେ ଏଗୁଡ଼ିକ ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ ଥାଏ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ହ୍ୟାଣ୍ଡଲର୍ଗୁଡ଼ିକ ଭିତରେ `assertAuth(req, expectedClass)` ବ୍ୟବହାର କରନ୍ତୁ — ଯଦି ମିଡଲୱେର୍କୁ ବାଇପାସ୍ କରାଯାଇଥାଏ, ଏହା `AUTHZ_NOT_INITIALIZED` କୋଡ୍ ସହିତ `AuthzAssertionError` ଥ୍ରୋ କରେ (ପରୀକ୍ଷଣଗୁଡ଼ିକରେ ବିନ୍ୟାସ ରିଗ୍ରେସନ୍ ଚିହ୍ନଟ କରିବା ପାଇଁ ଉପଯୋଗୀ)।

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ପ୍ରତି ଏଣ୍ଡପଏଣ୍ଟ ପାଇଁ ଅଥ୍ ମାର୍କର୍
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ଅଥ୍ ଇଭେଣ୍ଟଗୁଡ଼ିକ ପାଇଁ ଅଡିଟ୍ ଲଗ୍
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ତିନୋଟି ସ୍କୋପ୍ ନେମସ୍ପେସ୍ ଏବଂ MCP ଟୁଲ୍-ସ୍କୋପ୍ କାଟାଲଗ୍
- ଉତ୍ସ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
