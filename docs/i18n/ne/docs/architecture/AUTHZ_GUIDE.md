# Authorization Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **आधिकारिक स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **पछिल्लो अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute मा प्रत्येक API अनुरोधलाई नियन्त्रण गर्ने रुट-सचेत प्राधिकरण पाइपलाइन छ। वर्गीकरण **निर्धारक** र **विफलता हुँदा बन्द हुने** प्रकृतिको छ — वर्गीकरण गर्न नसकिने कुनै पनि कुरा अन्ततः `MANAGEMENT` मा पर्छ र त्यसका लागि सेसन वा व्यवस्थापन-स्तरको टोकन आवश्यक हुन्छ। यस पृष्ठले रुटहरू मर्मत गर्ने वा नयाँ एन्डपोइन्टहरू डिजाइन गर्ने इन्जिनियरहरूका लागि यो मोडेलको व्याख्या गर्छ।

![AuthZ पाइपलाइन (३ रुट वर्ग + नीति मूल्याङ्कन)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## दुई प्रमाणीकरण मोड

### १. API कुञ्जी (Bearer)

OpenAI/Anthropic/Gemini-सङ्गत क्लाइन्ट API हरू र कुञ्जीसँग `manage` स्कोप हुँदा केही व्यवस्थापन रुटहरूका लागि प्रयोग गरिन्छ।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` मा रहेको `isValidApiKey()` / `extractApiKey()` द्वारा प्रमाणीकरण गरिन्छ र `src/shared/utils/apiAuth.ts` मार्फत पुनः निर्यात गरिन्छ। प्रमाणीकरणकर्ताले `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` वातावरणीय चरहरूलाई स्थायी पासथ्रु कुञ्जीका रूपमा पनि स्वीकार गर्छ (मुद्दा #1350)।

### २. ड्यासबोर्ड सेसन (auth_token कुकी)

ड्यासबोर्ड पृष्ठहरू र प्रशासकीय कार्यहरूका लागि।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT प्रमाणित हुँदा **र** त्यसमा `authenticated: true` हुँदा मात्र कुकीलाई सेसन मानिन्छ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। कुकी प्रयोग गर्ने प्रत्येक
भाग (रुट गार्ड, authz पाइपलाइन रिफ्रेस, WebSocket ह्यान्डसेक, लाइभ
सर्भर, `/api/settings/require-login`, `/api/auth/status`) त्यो सहायकमार्फत जान्छ।
`JWT_SECRET` ले हस्ताक्षर गरिएका अन्य JWT हरू पनि छन् — Cursor CLI पासथ्रुले
कुञ्जी धारकहरूका लागि `iss "omniroute" / aud "cursor-cli"` टोकनहरू जारी गर्छ — र तिनलाई कहिल्यै सेसन मानिँदैन
(#13298)।

`src/shared/utils/apiAuth.ts` मा रहेको `isDashboardSessionAuthenticated()` द्वारा प्रमाणीकरण गरिन्छ। JWT को ३०-दिने आयुमा ७ दिनभन्दा कम समय बाँकी हुँदा पाइपलाइनले त्यसलाई स्वतः रिफ्रेस गर्छ।

केही व्यवस्थापन रुटहरूले **जुनसुकै** मोड स्वीकार गर्छन्: कुकी वा API कुञ्जीसँग `manage` (वा `admin`) स्कोप हुँदा `Bearer <key>`। यही व्यवस्थाले v3.8 मा थपिएको "API कलहरूबाट कन्फिगर गर्न मिल्ने" कार्यप्रवाहलाई सम्भव बनाउँछ।

#### वैकल्पिक OIDC लगइन गेट (#6973)

ड्यासबोर्डको प्रशासक लगइनले पूर्वनिर्धारित पासवर्ड लगइनसँगै **स्वेच्छिक रूपमा सक्रिय गर्न मिल्ने** OIDC (OpenID Connect) प्रवाहलाई पनि समर्थन गर्छ — पासवर्ड लगइन कहिल्यै हटाइँदैन, केवल
पूरक बनाइन्छ:

- `settings.oidcEnabled === true` **र** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` सबै कन्फिगर नभएसम्म निष्क्रिय रहन्छन् (Settings → Auth)।
  अन्यथा `GET /api/auth/oidc/login` ले `400` फर्काउँछ।
- `GET /api/auth/oidc/login` ले जारीकर्ताको
  `/.well-known/openid-configuration` बाट `authorization_endpoint` पत्ता लगाउँछ (`<issuer>/authorize`
  लाई वैकल्पिक रूपमा प्रयोग गर्छ), आगमन अनुरोधबाट रिडाइरेक्ट URI बनाउँछ
  (`x-forwarded-proto`-सचेत), र अनियमित `state` लाई `httpOnly` `oidc_state`
  कुकीमा भण्डारण गरेर IdP तर्फ रिडाइरेक्ट गर्छ।
- `GET /api/auth/oidc/callback` ले `state` प्रमाणीकरण गर्छ, प्राधिकरण
  कोड साट्छ, र जारीकर्ताको JWKS मार्फत ID टोकनको हस्ताक्षर प्रमाणित गर्छ
  (`jose` को `createRemoteJWKSet`, प्रत्येक JWKS URI का लागि क्यास गरिएको), साथै `issuer`/`audience`
  जाँच गर्छ। वैकल्पिक `oidcAllowedSubjects` अनुमति-सूचीले टोकनको
  `sub` दाबी वा यसको `email` दाबीसँग मिलान गर्छ — `email_verified === true` हुँदा मात्र इमेल दाबी स्वीकार गरिन्छ, त्यसैले IdP मा अप्रमाणित इमेलले कहिल्यै
  गेट पार गर्न सक्दैन।
- सफल भएपछि यसले पासवर्ड लगइनले जारी गर्ने (`src/app/api/auth/login/route.ts`) **ठ्याक्कै उही** ३०-दिने `auth_token` JWT
  जारी गर्छ, त्यसैले ड्यासबोर्ड सेसन पाइपलाइनका बाँकी भाग (स्वतः रिफ्रेस, कुकी फ्ल्यागहरू) अपरिवर्तित रहन्छन् —
  OIDC ले कुकी कसरी जारी हुन्छ भन्ने मात्र प्रतिस्थापन गर्छ, त्यसले प्रदान गर्ने अनुमति होइन।

## रुट वर्गहरू

`src/server/authz/types.ts` ले तीनवटा वर्ग परिभाषित गर्छ; निर्धारक रूपमा वर्गीकरण गर्न नसकिने कुनै पनि रुट पूर्वनिर्धारित रूपमा `MANAGEMENT` मा पर्छ।

| वर्ग         | विवरण                                                                                                                                                           | आवश्यक प्रमाणीकरण                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | स्पष्ट रूपमा सुरक्षित रुटहरू — लगइन, लगआउट, स्थिति, प्रारम्भ, स्वास्थ्य, अनबोर्डिङ बुटस्ट्र्याप।                                                                | कुनै पनि होइन                                                         |
| `CLIENT_API` | मोडेल उपलब्ध गराउने एन्डपोइन्टहरू — `/api/v1/*`, `/api/v1beta/*`, साथै उपनामहरू `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | प्रभावकारी `REQUIRE_API_KEY` सुविधा फ्ल्याग सक्षम हुँदा Bearer कुञ्जी |
| `MANAGEMENT` | ड्यासबोर्ड पृष्ठहरू, सेटिङहरू, प्रदायकहरू, कुञ्जीहरू, प्रशासकीय तथा निदानसम्बन्धी एन्डपोइन्टहरू।                                                                | ड्यासबोर्ड सत्र वा `manage` स्कोपसहितको Bearer                        |

## पाइपलाइन

```
आगमन अनुरोध → src/proxy.ts
  → src/server/authz/pipeline.ts मा runAuthzPipeline()
    1. विश्वसनीय आन्तरिक हेडरहरू हटाउने (x-omniroute-auth-*, x-omniroute-route-class)
    2. अनुरोध id उत्पन्न गर्ने, classifyRoute() मार्फत रुट वर्गीकरण गर्ने
    3. यदि pathname == "/" → /dashboard मा रिडाइरेक्ट गर्ने
    4. यदि निकासको प्रक्रियामा (सहज बन्द) छ र /api/* हो → 503
    5. यदि GET बाहेकको /api/* हो → checkBodySize() सुरक्षा जाँच
    6. यदि OPTIONS हो → CORS प्रिफ्लाइट 204
    7. यदि options.enforce == false हो → route-class हेडरसहित जस्ताको तस्तै अगाडि पठाउने
    8. अन्यथा: POLICIES[routeClass].evaluate(ctx)
       - अनुमति  → x-omniroute-auth-{kind,id,label,scopes} अंकित गर्ने → NextResponse.next()
       - अस्वीकार → correlation_id सहितको JSON त्रुटि (ड्यासबोर्ड पृष्ठहरू → 302 /login)
```

विश्वसनीय आन्तरिक हेडरहरू (`src/server/authz/headers.ts` मा परिभाषित) वर्गीकरण गर्नुअघि **आगमन अनुरोधहरूबाट हटाइन्छन्** — क्लाइन्टहरूले कुनै विषयको प्रतिरूपण गर्न `x-omniroute-auth-*` पहिले नै भर्न सक्दैनन्।

### नीति अनुबन्धहरू

प्रत्येक रुट वर्गका लागि `src/server/authz/policies/` मा एउटा नीति छ:

- **`publicPolicy`** (`policies/public.ts`) — सधैँ `allow({ kind: "anonymous", id: "anonymous" })` फर्काउँछ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer निकाल्छ र `validateApiKey()` मार्फत प्रमाणीकरण गर्छ। प्रभावकारी `REQUIRE_API_KEY` सुविधा फ्ल्याग असक्षम हुँदा मात्र अज्ञात पहुँचमा जान दिन्छ। प्रभावकारी फ्ल्याग `isRequireApiKeyEnabled()` (`DB सुविधा फ्ल्याग अधिलेखन > process.env.REQUIRE_API_KEY > पूर्वनिर्धारित`) मार्फत निर्धारित गरिन्छ, ताकि ड्यासबोर्ड सुविधा फ्ल्यागहरू र वातावरण चरहरूले `/api/v1/*`, `/api/v1beta/*`, र उपनामहरूलाई एकरूप रूपमा नियन्त्रण गरून्; रिजल्भर विफल हुँदा पहुँच बन्द हुन्छ। क्लाइन्ट API रुटहरूमा ड्यासबोर्ड-सत्र अनुरोधहरूलाई अनुमति दिन्छ (`/api/v1/models` सहित, जुन ड्यासबोर्ड मोडेल क्याटलगले प्रयोग गर्छ)।
- **`managementPolicy`** (`policies/management.ts`) — ड्यासबोर्ड सत्र, आन्तरिक मोडेल-सिङ्क अनुरोधहरू (`/api/providers/[name]/(sync-models|models)` सँग मिलान गरिएका) स्वीकार गर्छ, वा `isAuthRequired()` ले false फर्काएमा पूर्ण रूपमा छोड्छ। Bearer टोकन उपस्थित तर अमान्य हुँदा 403 (`AUTH_001`), अन्यथा 401 फर्काउँछ। यसले कुनै पनि प्रमाणीकरण शाखाअघि रुट-गार्ड तहहरू (LOCAL_ONLY / ALWAYS_PROTECTED) पनि लागू गर्छ — [रुट गार्ड तहहरू](../security/ROUTE_GUARD_TIERS.md) हेर्नुहोस्। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मा रहेका LOCAL_ONLY पथहरू (हाल: `/api/mcp/`) लाई Bearer कुञ्जीमा `manage` स्कोप हुँदा गैर-लुपब्याकबाट पहुँच गर्न सकिन्छ; अन्य सबै LOCAL_ONLY पथहरू स्कोप जेसुकै भए पनि कडाइका साथ लुपब्याकमा मात्र सीमित रहन्छन्।

सफल नीतिले `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` भएको `AuthSubject` फर्काउँछ। डाउनस्ट्रिम ह्यान्डलरहरूले प्रमाणीकरण तर्क पुनः सञ्चालन गर्नुको सट्टा `src/server/authz/assertAuth.ts` मा रहेको `assertAuth(request, "CLIENT_API")` मार्फत यसलाई पढ्न सक्छन्।

## सार्वजनिक रुटहरूको सूची

`src/shared/constants/publicApiRoutes.ts` स्पष्ट अनुमति-सूची हो:

सूचीलाई **आकार** अनुसार विभाजन गरिएको छ, र यो विभाजन अत्यावश्यक छ (GHSA-74g9-q8f6-793h): कुनै prefix लाई
`startsWith()` मार्फत मिलाइन्छ, त्यसैले यसले उही प्रारम्भिक अक्षरहरू भएका प्रत्येक छेउछाउका path लाई पनि मिलाउँछ।
prefix का रूपमा रहेको `/api/usage/om-usage` ले `/api/usage/om-usage<anything>` लाई PUBLIC बनायो, र Next ले
त्यसलाई `/api/usage/[connectionId]` मा resolve गर्छ — आफ्नै auth नभएको handler।

```ts
// वास्तविक subtree हरू। प्रत्येक entry "/" मा अन्त्य हुनैपर्छ (unit test द्वारा सुनिश्चित गरिएको)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify मा CLIENT_API का रूपमा व्यवहार गरिन्छ, "no-auth public" का रूपमा होइन
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// एकल route हरू, ठ्याक्कै मिलाइने (अन्त्यमा slash भए वा नभए पनि)।
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

// CORS origin छुटसमेत प्राप्त गर्ने read-only एकल route हरू।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS छुटबिनाको read-only एकल route।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

सुरक्षित method हरूका लागि **मात्र** read-only route हरू सार्वजनिक हुन्छन्। ध्यान दिनुहोस्: `classifyRoute()` ले `/api/v1/*` र `/api/v1beta/*` लाई PUBLIC fall-through बाट अलग गर्छ — ती सधैँ `CLIENT_API` हुन्छन्, जसले गर्दा Bearer-key policy अझै लागू हुन्छ।

## नयाँ रुट थप्ने

### ढाँचा 1 — सार्वजनिक client API endpoint (Bearer-auth)

`/api/v1/` र `/api/v1beta/` अन्तर्गतका route हरू स्वतः `CLIENT_API` का रूपमा वर्गीकृत हुन्छन्। middleware ले Bearer जाँच लागू गर्छ; route handler हरूले त्यसलाई फेरि दोहोर्याउनुपर्दैन, तर उपयोगी भएमा subject पढ्न सक्छन्।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler को तर्क
}
```

### ढाँचा 2 — व्यवस्थापन endpoint (session वा Bearer + manage)

`src/lib/api/requireManagementAuth.ts` बाट `requireManagementAuth()` प्रयोग गर्नुहोस्:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler को तर्क
}
```

`requireManagementAuth()` ले सफल हुँदा `null` वा JSON error `Response` फर्काउँछ:

- 401 `AUTH_001` "प्रमाणीकरण आवश्यक छ" — कुनै credential नै छैन
- 403 — अमान्य Bearer **वा** Bearer उपस्थित छ तर key मा `manage` / `admin` scope छैन

`hasManageScope(scopes)` ले `"manage"` वा `"admin"` का लागि true फर्काउँछ।

### ढाँचा 3 — सार्वजनिक अनुमति-सूचीमा थप्ने

सुविधाका आधारमा होइन, आकारका आधारमा set छान्नुहोस्। एउटा route लाई `PUBLIC_API_ROUTES_EXACT` मा राखिन्छ (वा GET-only का लागि `PUBLIC_READONLY_CORS_API_ROUTES` मा); वास्तविक subtree लाई मात्र `PUBLIC_API_ROUTE_PREFIXES` मा राखिन्छ, र त्यो **`/` मा अन्त्य हुनैपर्छ**। prefix सूचीमा एउटै route राख्दा त्यसका प्रारम्भिक अक्षरहरू साझा गर्ने प्रत्येक छेउछाउको path पनि सार्वजनिक हुन्छ — पछि थपिएका dynamic-segment sibling हरूसमेत (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` र `tests/unit/authz/classify.test.ts` मा रहेका unit test हरू अद्यावधिक गर्नुहोस्।

## स्कोपहरू

API कुञ्जीहरूले `scopes` एरे बोक्छन् (`api_keys.scopes` मा JSON को रूपमा भण्डारण गरिएको छ, `src/lib/db/apiKeys.ts` हेर्नुहोस्)।

### व्यवस्थापन स्कोप

- `manage` / `admin` — Bearer को रूपमा पठाउँदा कुञ्जीलाई व्यवस्थापन API एन्डपोइन्टहरूमा पहुँच प्रदान गर्छ।

### MCP स्कोपहरू (`src/shared/constants/mcpScopes.ts`)

प्रत्येक MCP उपकरणलाई `MCP_TOOL_SCOPES` मार्फत विशिष्ट स्कोपहरू आवश्यक पर्छन्। पूर्ण सूची (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` मा स्कोप कार्यान्वयनले `resolveCallerScopeContext()` ले MCP प्रमाणीकरण जानकारी,
अनुरोध मेटाडेटा, वा `OMNIROUTE_MCP_SCOPES` बाट स्कोपहरू समाधान गरेपछि प्रत्येक उपकरणको स्कोप सूची
`evaluateToolScopes()` मा पठाउँछ।

## प्रमाणीकरण आवश्यक टगल

`src/shared/utils/apiAuth.ts` मा रहेको `isAuthRequired()` ले अनुरोधका लागि **कुनै पनि** प्रमाणीकरण लागू हुन्छ कि हुँदैन भन्ने निर्णय गर्छ:

- `settings.requireLogin === false` → प्रमाणीकरण विश्वव्यापी रूपमा असक्षम हुन्छ।
- कुनै पासवर्ड कन्फिगर गरिएको छैन **र** कुनै `INITIAL_PASSWORD` env var छैन → बुटस्ट्र्याप मोडले अनबोर्डिङ विजार्ड र लूपब्याक अनुरोधहरूलाई अनुमति दिन्छ, तर एक्स्पोज गरिएका नेटवर्क अनुरोधहरूलाई अझै पनि प्रमाणहरू आवश्यक पर्छन्।
- कुनै पनि DB त्रुटि → बन्द भएर असफल हुन्छ (पूर्वनिर्धारित रूपमा सुरक्षित)।

क्लाइन्ट API कुञ्जी कार्यान्वयनले प्रत्यक्ष `process.env.REQUIRE_API_KEY` पढाइ होइन, `src/shared/utils/featureFlags.ts` मा रहेको `isRequireApiKeyEnabled()` प्रयोग गर्छ। यो डिप्लोय गरिएका इन्स्ट्यान्सहरूका लागि महत्त्वपूर्ण छ: Dashboard → Feature Flags मा `REQUIRE_API_KEY` टगल गर्दा DB ओभरराइड भण्डारण हुन्छ र त्यसले तुरुन्तै `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, र यही सहायक साझा गर्ने अन्य क्लाइन्ट-API प्रमाणीकरण जाँचहरूलाई प्रभाव पार्छ। यदि फिचर फ्ल्याग स्टोर पढ्न सकिँदैन भने, क्लाइन्ट API प्रमाणीकरण बन्द भएर असफल हुन्छ र कुञ्जी आवश्यक पर्छ।

## ब्रेकिङ परिवर्तन — v3.8.0

`/api/v1/agents/tasks/*` र `/api/resilience/model-cooldowns` एन्डपोइन्टहरूलाई **अब व्यवस्थापन प्रमाणीकरण आवश्यक पर्छ** (कमिट `588a0333`)। पहिले `manage` स्कोपबिनाको सामान्य API कुञ्जी पठाउने क्लाइन्टहरूले `403` प्राप्त गर्छन्। माइग्रेसन: API Keys ड्यासबोर्डमा कुञ्जीलाई `manage` स्कोप जारी गर्नुहोस्, वा लगइन गरिएको ड्यासबोर्ड सत्र प्रयोग गर्नुहोस्।

## व्यवहार परिवर्तन — v3.8.2

`/api/mcp/*` (रिमोट MCP सर्भर) अझै पनि पूर्वनिर्धारित रूपमा LOCAL_ONLY छ, तर `Authorization: Bearer <api-key>` हेडरमा `manage` स्कोप हुँदा अब यसले गैर-लूपब्याक अनुरोधहरू स्वीकार गर्छ। यो अपवादलाई `src/server/authz/routeGuard.ts` मा रहेको `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मार्फत प्रत्येक पाथका लागि स्पष्ट रूपमा गेट गरिएको छ; सँगैको LOCAL_ONLY प्रिफिक्स `/api/cli-tools/runtime/*` लाई जानीजानी बाइपास गर्न नमिल्ने बनाइएको छ, किनभने यसले स्वेच्छाचारी सबप्रोसेसहरू सुरु गर्न सक्छ। गैर-लूपब्याकबाट `/api/mcp/*` मा आउने बेनामी अनुरोधहरूले अझै पनि `403 LOCAL_ONLY` फर्काउँछन् — कुनै पनि नयाँ LOCAL_ONLY पाथको पूर्वनिर्धारित अवस्था कडा-लूपब्याक नै रहन्छ। [रुट गार्ड तहहरू](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) हेर्नुहोस्।

## परीक्षण

- युनिट परीक्षणहरू: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- सार्वजनिक अनुमति सूची: `tests/unit/public-api-routes.test.ts`।
- केन्द्रित रूपमा चलाउनुहोस्: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## डिबगिङ

पाइपलाइनले प्रतिक्रियाहरूमा सधैं निम्न हेडरहरू राख्छ:

```
x-request-id:               <सहसम्बन्ध ID, त्रुटि बडीहरूमा दोहोर्याइने>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणीकृत अनुरोधहरूका लागि अपस्ट्रिम (ह्यान्डलर-पक्षका) अनुरोध हेडरहरूमा निम्न पनि समावेश हुन्छन्:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (वैकल्पिक)
x-omniroute-auth-scopes:    अल्पविरामद्वारा छुट्याइएको सूची
```

ह्यान्डलरहरूभित्र `assertAuth(req, expectedClass)` प्रयोग गर्नुहोस् — यदि मिडलवेयरलाई बाइपास गरिएको थियो भने यसले `AUTHZ_NOT_INITIALIZED` कोडसहित `AuthzAssertionError` थ्रो गर्छ (परीक्षणहरूमा कन्फिगरेसन रिग्रेसनहरू पत्ता लगाउन उपयोगी हुन्छ)।

## यो पनि हेर्नुहोस्

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रत्येक एन्डपोइन्टको प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण घटनाहरूको अडिट लग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP स्कोप कार्यान्वयनसम्बन्धी विवरणहरू
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
