# Authorization Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **सत्य का स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **अंतिम बार अपडेट किया गया:** 2026-09-22 — स्कोप नेमस्पेस MCP-SERVER.md की ओर इशारा करते हैं

ओम्नीराउट में एक रूट-जागरूक प्रमाणीकरण पाइपलाइन है जो हर एपीआई अनुरोध को नियंत्रित करती है। वर्गीकरण **निर्धारित** और **फेल-क्लोज्ड** है — जो कुछ भी वर्गीकृत नहीं किया जा सकता है वह `MANAGEMENT` के रूप में समाप्त होता है और एक सत्र या प्रबंधन-ग्रेड टोकन की मांग करता है। यह पृष्ठ उन इंजीनियरों के लिए मॉडल की व्याख्या करता है जो रूट्स का रखरखाव कर रहे हैं या नए एंडपॉइंट्स डिज़ाइन कर रहे हैं।

![AuthZ पाइपलाइन (3 रूट क्लास + नीति मूल्यांकन)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## दो प्रमाणीकरण मोड

### 1. API कुंजी (Bearer)

OpenAI/Anthropic/Gemini-संगत क्लाइंट API और कुछ प्रबंधन रूट के लिए उपयोग किया जाता है, जब कुंजी में `manage` स्कोप हो।

```
Authorization: Bearer <api-key>
```

इसे `src/sse/services/auth.ts` में `isValidApiKey()` / `extractApiKey()` द्वारा सत्यापित किया जाता है और `src/shared/utils/apiAuth.ts` के माध्यम से पुनः एक्सपोर्ट किया जाता है। सत्यापनकर्ता `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars को स्थायी पासथ्रू कुंजियों के रूप में भी स्वीकार करता है (इश्यू #1350)।

### 2. डैशबोर्ड सेशन (auth_token कुकी)

डैशबोर्ड पृष्ठों और एडमिन कार्रवाइयों के लिए।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

कोई कुकी केवल तभी सेशन होती है, जब JWT सत्यापित हो **और** उसमें `authenticated: true`
हो (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। कुकी का
प्रत्येक उपभोक्ता (रूट गार्ड, authz पाइपलाइन रीफ़्रेश, WebSocket हैंडशेक, लाइव
सर्वर, `/api/settings/require-login`, `/api/auth/status`) इसी हेल्पर से होकर गुजरता है।
`JWT_SECRET` से हस्ताक्षरित अन्य JWT भी मौजूद हैं — Cursor CLI पासथ्रू, कुंजी धारकों के लिए
`iss "omniroute" / aud "cursor-cli"` टोकन जारी करता है — और वे कभी भी सेशन नहीं होते
(#13298)।

इसे `src/shared/utils/apiAuth.ts` में `isDashboardSessionAuthenticated()` द्वारा सत्यापित किया जाता है। जब JWT की 30-दिन की अवधि में 7 दिन से कम समय शेष होता है, तो पाइपलाइन उसे स्वतः रीफ़्रेश कर देती है।

कुछ प्रबंधन रूट **दोनों में से किसी भी** मोड को स्वीकार करते हैं: कुकी या `Bearer <key>`, जब API कुंजी में `manage` (या `admin`) स्कोप हो। यही v3.8 में जोड़े गए "API कॉल के माध्यम से कॉन्फ़िगर करने योग्य" वर्कफ़्लो को संभव बनाता है।

#### वैकल्पिक OIDC लॉगिन गेट (#6973)

डैशबोर्ड एडमिन लॉगिन, डिफ़ॉल्ट पासवर्ड लॉगिन के साथ एक **ऑप्ट-इन** OIDC (OpenID Connect) फ़्लो का भी समर्थन करता है — पासवर्ड लॉगिन कभी हटाया नहीं जाता, केवल उसमें
पूरक सुविधा जोड़ी जाती है:

- यह तब तक अक्षम रहता है, जब तक `settings.oidcEnabled === true` **और** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` सभी कॉन्फ़िगर न हों (Settings → Auth)।
  अन्यथा `GET /api/auth/oidc/login`, `400` लौटाता है।
- `GET /api/auth/oidc/login`, जारीकर्ता के
  `/.well-known/openid-configuration` से `authorization_endpoint` खोजता है (`<issuer>/authorize`
  पर फ़ॉलबैक करता है), आने वाले अनुरोध से रीडायरेक्ट URI बनाता है
  (`x-forwarded-proto`-जागरूक), और `httpOnly` `oidc_state` कुकी में संग्रहीत एक रैंडम `state`
  के साथ IdP पर रीडायरेक्ट करता है।
- `GET /api/auth/oidc/callback`, `state` को सत्यापित करता है, प्राधिकरण
  कोड का विनिमय करता है और जारीकर्ता के JWKS के माध्यम से ID टोकन के हस्ताक्षर सत्यापित करता है
  (`jose` का `createRemoteJWKSet`, प्रत्येक JWKS URI के लिए कैश किया गया), साथ ही `issuer`/`audience`
  जाँच करता है। वैकल्पिक `oidcAllowedSubjects` अनुमति-सूची, टोकन के
  `sub` क्लेम या उसके `email` क्लेम से मिलान करती है — ईमेल क्लेम को केवल तभी स्वीकार किया जाता है, जब
  `email_verified === true` हो, इसलिए IdP पर कोई असत्यापित ईमेल कभी भी
  इस गेट को पार नहीं कर सकता।
- सफल होने पर, यह पासवर्ड लॉगिन द्वारा जारी किया जाने वाला **बिल्कुल वही** 30-दिन का `auth_token`
  JWT जारी करता है (`src/app/api/auth/login/route.ts`), इसलिए शेष
  डैशबोर्ड सेशन पाइपलाइन (ऑटो-रीफ़्रेश, कुकी फ़्लैग) अपरिवर्तित रहती है —
  OIDC केवल यह बदलता है कि कुकी कैसे जारी की जाती है, यह नहीं कि वह कौन-सी अनुमतियाँ देती है।

## रूट क्लास

`src/server/authz/types.ts` तीन क्लास परिभाषित करता है; कोई भी रूट जिसे निश्चित रूप से वर्गीकृत नहीं किया जा सकता, वह डिफ़ॉल्ट रूप से `MANAGEMENT` में जाता है।

| क्लास        | विवरण                                                                                                                                               | आवश्यक प्रमाणीकरण                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `PUBLIC`     | स्पष्ट रूप से सुरक्षित रूट — लॉगिन, लॉगआउट, स्थिति, आरंभीकरण, स्वास्थ्य, ऑनबोर्डिंग बूटस्ट्रैप।                                                     | कोई नहीं                                                          |
| `CLIENT_API` | मॉडल-सर्विंग एंडपॉइंट — `/api/v1/*`, `/api/v1beta/*`, साथ ही एलियास `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | प्रभावी `REQUIRE_API_KEY` फ़ीचर फ़्लैग सक्षम होने पर Bearer कुंजी |
| `MANAGEMENT` | डैशबोर्ड पेज, सेटिंग्स, प्रदाता, कुंजियाँ, एडमिन और डायग्नोस्टिक्स एंडपॉइंट।                                                                        | डैशबोर्ड सत्र या `manage` स्कोप वाला Bearer                       |

## पाइपलाइन

```
आने वाला अनुरोध → src/proxy.ts
  → src/server/authz/pipeline.ts में runAuthzPipeline()
    1. विश्वसनीय आंतरिक हेडर हटाएँ (x-omniroute-auth-*, x-omniroute-route-class)
    2. अनुरोध आईडी जनरेट करें, classifyRoute() के माध्यम से रूट वर्गीकृत करें
    3. यदि pathname == "/" → /dashboard पर रीडायरेक्ट करें
    4. यदि ड्रेनिंग (ग्रेसफ़ुल शटडाउन) हो और /api/* हो → 503
    5. यदि गैर-GET /api/* हो → checkBodySize() गार्ड
    6. यदि OPTIONS हो → CORS प्रीफ़्लाइट 204
    7. यदि options.enforce == false हो → रूट-क्लास हेडर के साथ पास-थ्रू
    8. अन्यथा: POLICIES[routeClass].evaluate(ctx)
       - अनुमति  → x-omniroute-auth-{kind,id,label,scopes} अंकित करें → NextResponse.next()
       - अस्वीकार → correlation_id सहित JSON त्रुटि (डैशबोर्ड पेज → 302 /login)
```

विश्वसनीय आंतरिक हेडर (`src/server/authz/headers.ts` में परिभाषित) वर्गीकरण से पहले **आने वाले अनुरोधों से हटा दिए जाते हैं** — क्लाइंट किसी विषय का प्रतिरूपण करने के लिए `x-omniroute-auth-*` को पहले से भर नहीं सकते।

### पॉलिसी अनुबंध

प्रत्येक रूट क्लास की `src/server/authz/policies/` में एक पॉलिसी है:

- **`publicPolicy`** (`policies/public.ts`) — हमेशा `allow({ kind: "anonymous", id: "anonymous" })` लौटाती है।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer निकालती है और `validateApiKey()` के माध्यम से सत्यापित करती है। केवल तभी अनाम पहुँच पर फ़ॉल-थ्रू करती है, जब प्रभावी `REQUIRE_API_KEY` फ़ीचर फ़्लैग अक्षम हो। प्रभावी फ़्लैग का निर्धारण `isRequireApiKeyEnabled()` (`DB फ़ीचर फ़्लैग ओवरराइड > process.env.REQUIRE_API_KEY > डिफ़ॉल्ट`) के माध्यम से किया जाता है, ताकि डैशबोर्ड फ़ीचर फ़्लैग और पर्यावरण चर `/api/v1/*`, `/api/v1beta/*` तथा एलियास को एकसमान रूप से नियंत्रित करें; रिज़ॉल्वर की विफलता पर पहुँच अस्वीकृत रहती है। क्लाइंट API रूट पर डैशबोर्ड-सत्र अनुरोधों की अनुमति देती है (जिसमें डैशबोर्ड मॉडल कैटलॉग द्वारा उपयोग किया जाने वाला `/api/v1/models` शामिल है)।
- **`managementPolicy`** (`policies/management.ts`) — डैशबोर्ड सत्र, आंतरिक मॉडल-सिंक अनुरोध (`/api/providers/[name]/(sync-models|models)` से मिलान किए गए) स्वीकार करती है, या यदि `isAuthRequired()` false लौटाता है तो पूरी तरह छोड़ देती है। Bearer टोकन मौजूद लेकिन अमान्य होने पर 403 (`AUTH_001`) लौटाती है, अन्यथा 401। यह किसी भी प्रमाणीकरण शाखा से पहले रूट-गार्ड स्तरों (LOCAL_ONLY / ALWAYS_PROTECTED) को भी लागू करती है — [रूट गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md) देखें। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` में मौजूद LOCAL_ONLY पथ (वर्तमान में: `/api/mcp/`) गैर-लूपबैक से तब एक्सेस किए जा सकते हैं, जब Bearer कुंजी में `manage` स्कोप हो; अन्य सभी LOCAL_ONLY पथ स्कोप की परवाह किए बिना सख़्ती से केवल लूपबैक तक सीमित रहते हैं।

एक सफल पॉलिसी `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` वाला `AuthSubject` लौटाती है। डाउनस्ट्रीम हैंडलर प्रमाणीकरण लॉजिक को दोबारा चलाने के बजाय `src/server/authz/assertAuth.ts` में `assertAuth(request, "CLIENT_API")` के माध्यम से इसे पढ़ सकते हैं।

## सार्वजनिक रूट्स की सूची

`src/shared/constants/publicApiRoutes.ts` स्पष्ट अनुमति-सूची है:

सूची को **आकार** के आधार पर विभाजित किया गया है, और यह विभाजन सुरक्षा के लिए अत्यंत महत्वपूर्ण है (GHSA-74g9-q8f6-793h): किसी prefix का मिलान
`startsWith()` से किया जाता है, इसलिए यह समान आरंभिक वर्णों वाले हर निकटवर्ती path से भी मेल खाता है।
prefix के रूप में `/api/usage/om-usage` ने `/api/usage/om-usage<anything>` को PUBLIC चिह्नित कर दिया था, और Next इसे
`/api/usage/[connectionId]` पर resolve करता है — ऐसा handler जिसका अपना कोई auth नहीं है।

```ts
// वास्तविक subtrees। प्रत्येक entry "/" पर समाप्त होनी ही चाहिए (unit test द्वारा सत्यापित)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify में CLIENT_API माना जाता है, "no-auth public" नहीं
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// एकल routes, जिनका मिलान बिल्कुल सटीक रूप से होता है (trailing slash के साथ या उसके बिना)।
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

// केवल-पढ़ने योग्य एकल routes, जिन पर CORS origin छूट भी लागू होती है।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS छूट के बिना केवल-पढ़ने योग्य एकल route।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

केवल-पढ़ने योग्य routes सिर्फ़ सुरक्षित methods के लिए ही सार्वजनिक हैं। ध्यान दें: `classifyRoute()` `/api/v1/*` और `/api/v1beta/*` को PUBLIC fall-through से बाहर रखता है — वे हमेशा `CLIENT_API` होते हैं, ताकि Bearer-key नीति लागू रहे।

## नया Route जोड़ना

### पैटर्न 1 — सार्वजनिक client API endpoint (Bearer-auth)

`/api/v1/` और `/api/v1beta/` के अंतर्गत आने वाले routes अपने-आप `CLIENT_API` के रूप में वर्गीकृत होते हैं। middleware Bearer जाँच लागू करता है; route handlers को इसे दोबारा करने की आवश्यकता नहीं है, लेकिन उपयोगी होने पर वे subject को पढ़ सकते हैं।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler का logic
}
```

### पैटर्न 2 — प्रबंधन endpoint (session या Bearer + manage)

`src/lib/api/requireManagementAuth.ts` से `requireManagementAuth()` का उपयोग करें:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler का logic
}
```

सफलता पर `requireManagementAuth()` `null` लौटाता है, अन्यथा JSON त्रुटि वाला `Response`:

- 401 `AUTH_001` "प्रमाणीकरण आवश्यक है" — कोई भी credentials मौजूद नहीं
- 403 — अमान्य Bearer **या** Bearer मौजूद है, लेकिन key में `manage` / `admin` scope नहीं है

`hasManageScope(scopes)` `"manage"` या `"admin"` के लिए true लौटाता है।

### पैटर्न 3 — सार्वजनिक अनुमति-सूची में जोड़ना

set को सुविधा के आधार पर नहीं, बल्कि आकार के आधार पर चुनें। एक route को `PUBLIC_API_ROUTES_EXACT` में रखें (या केवल GET के लिए `PUBLIC_READONLY_CORS_API_ROUTES` में); केवल वास्तविक subtree को `PUBLIC_API_ROUTE_PREFIXES` में रखें, और वह **`/` पर समाप्त होना ही चाहिए**। किसी एकल route को prefix सूची में रखने से समान आरंभिक वर्णों वाला हर निकटवर्ती path भी सार्वजनिक हो जाता है — इसमें बाद में जोड़े गए dynamic-segment siblings भी शामिल हैं (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` और `tests/unit/authz/classify.test.ts` में unit tests अपडेट करें।

## स्कोप्स

तीन नेमस्पेस। प्रत्येक चेकर केवल अपनी स्ट्रिंग्स पढ़ता है। साइड-बाय-साइड तुलना, जिसमें यह भी शामिल है कि `manage` `read:compression` के लिए `scopeMatches` में क्यों विफल होता है और एक `read` एक्सेस टोकन `PATCH /api/keys/{id}` क्यों नहीं कर सकता, [तीन स्कोप नेमस्पेस](../frameworks/MCP-SERVER.md#three-scope-namespaces) में है।

एपीआई कुंजियों में एक `scopes` ऐरे होता है (जो `api_keys.scopes` में JSON के रूप में संग्रहीत होता है, देखें `src/lib/db/apiKeys.ts`)।

### प्रबंधन स्कोप

- `manage` / `admin` — `hasManageScope`। प्रबंधन एपीआई राउट्स तक बेयरर एक्सेस।
- `mcp:connect`, `self:usage`, `self:account-quota`, और
  `policy:bypass-provider-quota` योगात्मक सटीक-मैच स्कोप्स हैं। वे `MANAGEMENT_API_KEY_SCOPES` के बाहर स्थित हैं। `mcp:connect` केवल `/api/mcp/` नॉन-लूपबैक कार्व-आउट खोलता है।

### MCP टूल स्कोप्स

कैटलॉग और मिलान नियम (समान स्ट्रिंग, या `*` में समाप्त होने वाला एक स्वीकृत स्कोप):
[MCP टूल स्कोप्स](../frameworks/MCP-SERVER.md#mcp-tool-scopes)।
`src/shared/constants/mcpScopes.ts` में `MCP_SCOPE_LIST` मूल टाइप किया गया सबसेट है, न कि वह पूरा कैटलॉग। प्रवर्तन
`open-sse/mcp-server/scopeEnforcement.ts` में `resolveCallerScopeContext()` द्वारा MCP प्रमाणीकरण जानकारी, अनुरोध मेटाडेटा, या `OMNIROUTE_MCP_SCOPES` से स्कोप्स को हल करने के बाद चलता है।
यह तब तक बंद रहता है जब तक `OMNIROUTE_MCP_ENFORCE_SCOPES=true` नहीं होता।

### एक्सेस-टोकन स्कोप्स

`oma_live_…` टोकन पर `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) द्वारा रैंक किए गए। यह रैंक केवल एक्सेस-टोकन क्रेडेंशियल पर लागू होती है। देखें [प्रबंधन प्रमाणीकरण](../guides/MANAGEMENT-AUTH.md)।

## प्रमाणीकरण आवश्यक टॉगल

`src/shared/utils/apiAuth.ts` में `isAuthRequired()` यह तय करता है कि किसी अनुरोध के लिए **कोई भी** प्रमाणीकरण लागू किया जाएगा या नहीं:

- `settings.requireLogin === false` → प्रमाणीकरण वैश्विक रूप से अक्षम है।
- कोई पासवर्ड कॉन्फ़िगर नहीं है **और** कोई `INITIAL_PASSWORD` पर्यावरण चर नहीं है → बूटस्ट्रैप मोड ऑनबोर्डिंग विज़ार्ड और लूपबैक अनुरोधों की अनुमति देता है, लेकिन नेटवर्क पर उजागर अनुरोधों के लिए अब भी क्रेडेंशियल आवश्यक हैं।
- कोई भी DB त्रुटि → सुरक्षित रूप से पहुँच अस्वीकार करता है (डिफ़ॉल्ट रूप से सुरक्षित)।

क्लाइंट API कुंजी प्रवर्तन, प्रत्यक्ष `process.env.REQUIRE_API_KEY` रीड के बजाय `src/shared/utils/featureFlags.ts` में `isRequireApiKeyEnabled()` का उपयोग करता है। यह डिप्लॉय किए गए इंस्टेंस के लिए महत्वपूर्ण है: Dashboard → Feature Flags में `REQUIRE_API_KEY` को टॉगल करने से DB ओवरराइड संग्रहीत होता है और यह तुरंत `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` तथा इस हेल्पर को साझा करने वाली अन्य क्लाइंट-API प्रमाणीकरण जाँचों को प्रभावित करता है। यदि फ़ीचर फ़्लैग स्टोर को पढ़ा नहीं जा सकता, तो क्लाइंट API प्रमाणीकरण सुरक्षित रूप से पहुँच अस्वीकार करता है और कुंजी की आवश्यकता रखता है।

## असंगत परिवर्तन — v3.8.0

`/api/v1/agents/tasks/*` और `/api/resilience/model-cooldowns` एंडपॉइंट को **अब प्रबंधन प्रमाणीकरण की आवश्यकता है** (कमिट `588a0333`)। पहले `manage` स्कोप के बिना सामान्य API कुंजी भेजने वाले क्लाइंट को `403` प्राप्त होता है। माइग्रेशन: API Keys डैशबोर्ड में कुंजी को `manage` स्कोप प्रदान करें, या लॉग-इन किए हुए डैशबोर्ड सत्र का उपयोग करें।

## व्यवहार परिवर्तन — v3.8.2

`/api/mcp/*` (रिमोट MCP सर्वर) अब भी डिफ़ॉल्ट रूप से LOCAL_ONLY है, लेकिन अब यह गैर-लूपबैक अनुरोधों को स्वीकार करता है, जब `Authorization: Bearer <api-key>` हेडर में `manage` स्कोप होता है। यह अपवाद `src/server/authz/routeGuard.ts` में `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` के माध्यम से प्रत्येक पथ के लिए स्पष्ट रूप से नियंत्रित होता है; समान स्तर वाला LOCAL_ONLY प्रीफ़िक्स `/api/cli-tools/runtime/*` जानबूझकर बायपास नहीं किया जा सकता, क्योंकि यह मनमानी सबप्रोसेस शुरू कर सकता है। गैर-लूपबैक से `/api/mcp/*` पर आने वाले अनाम अनुरोध अब भी `403 LOCAL_ONLY` लौटाते हैं — किसी भी नए LOCAL_ONLY पथ के लिए डिफ़ॉल्ट सख्त-लूपबैक ही रहता है। देखें [रूट गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)।

## परीक्षण

- यूनिट परीक्षण: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- सार्वजनिक अनुमति-सूची: `tests/unit/public-api-routes.test.ts`।
- केंद्रित परीक्षण चलाएँ: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## डीबगिंग

पाइपलाइन हमेशा प्रतिक्रियाओं पर ये हेडर अंकित करती है:

```
x-request-id:               <सहसंबंध आईडी, त्रुटि बॉडी में दोहराई जाती है>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणित अनुरोधों के लिए अपस्ट्रीम (हैंडलर-साइड) अनुरोध हेडर में ये भी शामिल होते हैं:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<अंतिम-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (वैकल्पिक)
x-omniroute-auth-scopes:    कॉमा से अलग की गई सूची
```

हैंडलर के अंदर `assertAuth(req, expectedClass)` का उपयोग करें — यदि मिडलवेयर को बायपास किया गया हो, तो यह `AUTHZ_NOT_INITIALIZED` कोड के साथ `AuthzAssertionError` थ्रो करता है (परीक्षणों में कॉन्फ़िगरेशन रिग्रेशन पकड़ने के लिए उपयोगी)।

## इन्हें भी देखें

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रति एंडपॉइंट प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण घटनाओं के लिए ऑडिट लॉग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — तीन स्कोप नेमस्पेस और एमसीपी टूल-स्कोप कैटलॉग
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
