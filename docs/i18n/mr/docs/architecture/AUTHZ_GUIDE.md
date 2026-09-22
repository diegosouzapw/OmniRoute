# Authorization Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **सत्याचा अधिकृत स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute मध्ये मार्ग-जागरूक अधिकृतता पाइपलाइन आहे, जी प्रत्येक API विनंतीला प्रवेश देण्यापूर्वी तपासते. वर्गीकरण **निर्धारक** आणि **fail-closed** आहे — ज्याचे वर्गीकरण करता येत नाही अशी कोणतीही गोष्ट शेवटी `MANAGEMENT` म्हणून वर्गीकृत होते आणि त्यासाठी सत्र किंवा व्यवस्थापन-स्तरीय टोकन आवश्यक असते. मार्गांची देखभाल करणाऱ्या किंवा नवीन एंडपॉइंट डिझाइन करणाऱ्या अभियंत्यांसाठी हे पृष्ठ मॉडेल स्पष्ट करते.

![AuthZ पाइपलाइन (3 मार्ग वर्ग + धोरण मूल्यमापन)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## दोन प्रमाणीकरण पद्धती

### 1. API की (Bearer)

OpenAI/Anthropic/Gemini-सुसंगत क्लायंट API साठी आणि कीकडे `manage` स्कोप असल्यास काही व्यवस्थापन मार्गांसाठी वापरली जाते.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` मधील `isValidApiKey()` / `extractApiKey()` द्वारे पडताळली जाते आणि `src/shared/utils/apiAuth.ts` द्वारे पुन्हा निर्यात केली जाते. पडताळक `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` पर्यावरण चलांनादेखील कायमस्वरूपी पासथ्रू की म्हणून स्वीकारतो (समस्या #1350).

### 2. डॅशबोर्ड सत्र (auth_token कुकी)

डॅशबोर्ड पृष्ठे आणि प्रशासकीय क्रियांसाठी.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ची पडताळणी यशस्वी झाली **आणि** त्यात `authenticated: true` असेल, तरच कुकीला सत्र मानले जाते
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). कुकीचा वापर करणारा प्रत्येक
घटक (मार्ग संरक्षक, authz पाइपलाइन रीफ्रेश, WebSocket हँडशेक, लाइव्ह
सर्व्हर, `/api/settings/require-login`, `/api/auth/status`) त्या सहाय्यकाद्वारे प्रक्रिया करतो.
`JWT_SECRET` वापरून स्वाक्षरी केलेले इतर JWT देखील अस्तित्वात आहेत — Cursor CLI पासथ्रू
की धारकांसाठी `iss "omniroute" / aud "cursor-cli"` टोकन तयार करतो — आणि त्यांना कधीही सत्र मानले जात नाही
(#13298).

`src/shared/utils/apiAuth.ts` मधील `isDashboardSessionAuthenticated()` द्वारे पडताळले जाते. JWT च्या 30 दिवसांच्या कालावधीतील 7 दिवसांपेक्षा कमी कालावधी उरला असल्यास पाइपलाइन त्याचे स्वयंचलितपणे नूतनीकरण करते.

काही व्यवस्थापन मार्गांवर **दोन्हींपैकी कोणतीही एक** पद्धत स्वीकारली जाते: कुकी किंवा API कीकडे `manage` (किंवा `admin`) स्कोप असल्यास `Bearer <key>`. यामुळेच v3.8 मध्ये जोडलेली "API कॉलद्वारे कॉन्फिगर करता येणारी" कार्यपद्धती शक्य होते.

#### पर्यायी OIDC लॉगिन गेट (#6973)

डॅशबोर्ड प्रशासक लॉगिनमध्ये डीफॉल्ट पासवर्ड लॉगिनसोबत **निवड करून सक्षम करता येणारा** OIDC (OpenID Connect) प्रवाहदेखील समर्थित आहे — पासवर्ड लॉगिन कधीही काढून टाकले जात नाही, त्याला केवळ
पूरक पर्याय दिला जातो:

- `settings.oidcEnabled === true` **आणि** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` हे सर्व कॉन्फिगर केलेले नसल्यास तो अक्षम असतो (Settings → Auth).
  अन्यथा `GET /api/auth/oidc/login` `400` परत करतो.
- `GET /api/auth/oidc/login`, इश्युअरच्या
  `/.well-known/openid-configuration` मधून `authorization_endpoint` शोधतो (`<issuer>/authorize`
  वर फॉलबॅक करतो), येणाऱ्या विनंतीवरून रीडायरेक्ट URI तयार करतो
  (`x-forwarded-proto`-जागरूक), आणि यादृच्छिक `state`
  `httpOnly` `oidc_state` कुकीमध्ये साठवून IdP कडे रीडायरेक्ट करतो.
- `GET /api/auth/oidc/callback`, `state` ची पडताळणी करतो, अधिकृतता
  कोडची देवाणघेवाण करतो आणि इश्युअरच्या JWKS द्वारे ID टोकनच्या स्वाक्षरीची
  (`jose` चे `createRemoteJWKSet`, प्रत्येक JWKS URI साठी कॅश केलेले) `issuer`/`audience`
  तपासण्यांसह पडताळणी करतो. पर्यायी `oidcAllowedSubjects` अनुमतीसूची टोकनच्या
  `sub` क्लेमशी किंवा त्याच्या `email` क्लेमशी जुळवली जाते — `email_verified === true` असेल तेव्हाच ईमेल क्लेमचा
  विचार केला जातो, त्यामुळे IdP वरील अपडताळलेला ईमेल कधीही
  गेटमधून जाऊ शकत नाही.
- यशस्वी झाल्यावर, पासवर्ड लॉगिनद्वारे जारी केला जाणारा **अगदी तोच** 30 दिवसांचा `auth_token` JWT तयार केला जातो
  (`src/app/api/auth/login/route.ts`), त्यामुळे उर्वरित
  डॅशबोर्ड सत्र पाइपलाइनमध्ये (स्वयंचलित नूतनीकरण, कुकी फ्लॅग) कोणताही बदल होत नाही —
  OIDC फक्त कुकी कशी तयार केली जाते हे बदलते, ती कोणते अधिकार देते हे नाही.

## मार्ग वर्ग

`src/server/authz/types.ts` तीन वर्ग परिभाषित करते; निर्धारकपणे वर्गीकृत न करता येणारा कोणताही मार्ग डीफॉल्टनुसार `MANAGEMENT` मध्ये जातो.

| वर्ग         | वर्णन                                                                                                                                                            | आवश्यक प्रमाणीकरण                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `PUBLIC`     | स्पष्टपणे सुरक्षित मार्ग — लॉगिन, लॉगआउट, स्थिती, प्रारंभ, आरोग्य, ऑनबोर्डिंग बूटस्ट्रॅप.                                                                        | काहीही नाही                                                 |
| `CLIENT_API` | मॉडेल उपलब्ध करून देणारे एंडपॉइंट — `/api/v1/*`, `/api/v1beta/*`, तसेच `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` ही उपनावे. | प्रभावी `REQUIRE_API_KEY` फीचर फ्लॅग सक्षम असताना Bearer की |
| `MANAGEMENT` | डॅशबोर्ड पृष्ठे, सेटिंग्ज, प्रोव्हायडर, की, प्रशासकीय आणि निदान एंडपॉइंट.                                                                                        | डॅशबोर्ड सत्र किंवा `manage` स्कोप असलेला Bearer            |

## पाइपलाइन

```
येणारी विनंती → src/proxy.ts
  → src/server/authz/pipeline.ts मधील runAuthzPipeline()
    1. विश्वासार्ह अंतर्गत हेडर काढून टाका (x-omniroute-auth-*, x-omniroute-route-class)
    2. विनंती आयडी तयार करा, classifyRoute() द्वारे मार्गाचे वर्गीकरण करा
    3. pathname == "/" असल्यास → /dashboard कडे पुनर्निर्देशित करा
    4. ड्रेनिंग सुरू असल्यास (सुरक्षित शटडाउन) आणि /api/* असल्यास → 503
    5. non-GET /api/* असल्यास → checkBodySize() गार्ड
    6. OPTIONS असल्यास → CORS प्रीफ्लाइट 204
    7. options.enforce == false असल्यास → route-class हेडरसह पुढे पाठवा
    8. अन्यथा: POLICIES[routeClass].evaluate(ctx)
       - परवानगी  → x-omniroute-auth-{kind,id,label,scopes} मुद्रांकित करा → NextResponse.next()
       - नकार → correlation_id सह JSON त्रुटी (डॅशबोर्ड पृष्ठे → 302 /login)
```

विश्वासार्ह अंतर्गत हेडर (`src/server/authz/headers.ts` मध्ये परिभाषित) वर्गीकरणापूर्वी **येणाऱ्या विनंत्यांमधून काढून टाकले जातात** — एखाद्या सब्जेक्टचे प्रतिरूपण करण्यासाठी क्लायंट `x-omniroute-auth-*` आधीच भरू शकत नाहीत.

### पॉलिसी करार

प्रत्येक मार्ग वर्गाची `src/server/authz/policies/` मध्ये एक पॉलिसी आहे:

- **`publicPolicy`** (`policies/public.ts`) — नेहमी `allow({ kind: "anonymous", id: "anonymous" })` परत करते.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer काढते आणि `validateApiKey()` द्वारे त्याची पडताळणी करते. प्रभावी `REQUIRE_API_KEY` फीचर फ्लॅग अक्षम असतानाच निनावी प्रवेशाची अनुमती देते. प्रभावी फ्लॅग `isRequireApiKeyEnabled()` (`DB फीचर फ्लॅग ओव्हरराइड > process.env.REQUIRE_API_KEY > डीफॉल्ट`) द्वारे निर्धारित केला जातो, त्यामुळे डॅशबोर्ड फीचर फ्लॅग आणि पर्यावरणीय चल `/api/v1/*`, `/api/v1beta/*` आणि त्यांच्या उपनावांवर सुसंगतपणे नियंत्रण ठेवतात; रिझॉल्वर अयशस्वी झाल्यास प्रवेश नाकारला जातो. क्लायंट API मार्गांवर डॅशबोर्ड-सत्र विनंत्यांना अनुमती देते (डॅशबोर्ड मॉडेल कॅटलॉगद्वारे वापरल्या जाणाऱ्या `/api/v1/models` सह).
- **`managementPolicy`** (`policies/management.ts`) — डॅशबोर्ड सत्र, अंतर्गत मॉडेल-सिंक विनंत्या (`/api/providers/[name]/(sync-models|models)` शी जुळणाऱ्या) स्वीकारते किंवा `isAuthRequired()` ने false परत केल्यास पूर्णपणे वगळते. Bearer टोकन उपस्थित पण अवैध असल्यास 403 (`AUTH_001`), अन्यथा 401 परत करते. कोणत्याही प्रमाणीकरण शाखेपूर्वी route-guard स्तरही (LOCAL_ONLY / ALWAYS_PROTECTED) लागू करते — [मार्ग गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md) पहा. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मधील LOCAL_ONLY पथ (सध्या: `/api/mcp/`) Bearer कीमध्ये `manage` स्कोप असल्यास non-loopback वरून वापरता येतात; स्कोप कोणताही असला तरी इतर सर्व LOCAL_ONLY पथांसाठी strict-loopback बंधन कायम राहते.

यशस्वी पॉलिसी `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` असलेला `AuthSubject` परत करते. प्रमाणीकरण लॉजिक पुन्हा चालवण्याऐवजी डाउनस्ट्रीम हँडलर `src/server/authz/assertAuth.ts` मधील `assertAuth(request, "CLIENT_API")` द्वारे तो वाचू शकतात.

## सार्वजनिक रूट्सची सूची

`src/shared/constants/publicApiRoutes.ts` ही स्पष्ट अनुमतीसूची आहे:

सूची **आकारानुसार** विभागलेली आहे आणि हे विभाजन अत्यावश्यक आहे (GHSA-74g9-q8f6-793h): उपसर्गाची जुळवणी
`startsWith()` वापरून केली जाते, त्यामुळे समान सुरुवातीची अक्षरे असणाऱ्या प्रत्येक लगतच्या पथाशीही तो जुळतो.
उपसर्ग म्हणून `/api/usage/om-usage` मुळे `/api/usage/om-usage<anything>` हे PUBLIC म्हणून चिन्हांकित झाले आणि Next त्याचे
निराकरण `/api/usage/[connectionId]` असे करतो — हा असा हँडलर आहे ज्याचे स्वतःचे प्रमाणीकरण नाही.

```ts
// वास्तविक उपवृक्ष. प्रत्येक नोंद "/" ने संपलीच पाहिजे (युनिट चाचणीद्वारे पडताळले जाते).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify मध्ये CLIENT_API म्हणून हाताळले जाते, "no-auth public" म्हणून नाही
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// स्वतंत्र रूट्स, ज्यांची तंतोतंत जुळवणी केली जाते (शेवटी स्लॅश असो वा नसो).
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

// केवळ-वाचन स्वतंत्र रूट्स, ज्यांना CORS origin शिथिलताही लागू होते.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS शिथिलतेशिवाय केवळ-वाचन स्वतंत्र रूट.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

केवळ-वाचन रूट्स हे फक्त सुरक्षित पद्धतींसाठी **सार्वजनिक** असतात. नोंद: `classifyRoute()` हे `/api/v1/*` आणि `/api/v1beta/*` यांना PUBLIC फॉल-थ्रूमधून वगळते — ते नेहमी `CLIENT_API` असतात, त्यामुळे Bearer-की धोरण लागू राहते.

## नवीन रूट जोडणे

### नमुना 1 — सार्वजनिक क्लायंट API एंडपॉइंट (Bearer-auth)

`/api/v1/` आणि `/api/v1beta/` अंतर्गत असलेले रूट्स स्वयंचलितपणे `CLIENT_API` म्हणून वर्गीकृत केले जातात. मिडलवेअर Bearer तपासणी लागू करते; रूट हँडलर्सना ती पुन्हा करण्याची आवश्यकता नसते, परंतु उपयुक्त असल्यास ते subject वाचू शकतात.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... हँडलरचे लॉजिक
}
```

### नमुना 2 — व्यवस्थापन एंडपॉइंट (session किंवा Bearer + manage)

`src/lib/api/requireManagementAuth.ts` मधील `requireManagementAuth()` वापरा:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... हँडलरचे लॉजिक
}
```

यशस्वी झाल्यास `requireManagementAuth()` हे `null` परत करते; अन्यथा JSON त्रुटी असलेला `Response` परत करते:

- 401 `AUTH_001` "Authentication required" — कोणतीही प्रमाणीकरण माहिती उपलब्ध नाही
- 403 — अवैध Bearer **किंवा** Bearer उपलब्ध आहे, पण कीमध्ये `manage` / `admin` स्कोप नाही

`hasManageScope(scopes)` हे `"manage"` किंवा `"admin"` साठी true परत करते.

### नमुना 3 — सार्वजनिक अनुमतीसूचीत भर घालणे

सोयीनुसार नव्हे, तर आकारानुसार संच निवडा. एक स्वतंत्र रूट `PUBLIC_API_ROUTES_EXACT` मध्ये जातो (किंवा फक्त GET साठी `PUBLIC_READONLY_CORS_API_ROUTES` मध्ये); केवळ वास्तविक उपवृक्षच `PUBLIC_API_ROUTE_PREFIXES` मध्ये जातो आणि तो **`/` ने संपलाच पाहिजे**. उपसर्ग सूचीमध्ये एक स्वतंत्र रूट ठेवल्यास, समान सुरुवातीची अक्षरे असलेला प्रत्येक लगतचा पथही सार्वजनिक होतो — यामध्ये नंतर जोडलेली dynamic-segment भावंडेही समाविष्ट असतात (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` आणि `tests/unit/authz/classify.test.ts` येथील युनिट चाचण्या अद्ययावत करा.

## स्कोप्स

API कीमध्ये `scopes` अॅरे असतो (तो `api_keys.scopes` मध्ये JSON म्हणून संग्रहित केला जातो, `src/lib/db/apiKeys.ts` पहा).

### व्यवस्थापन स्कोप

- `manage` / `admin` — Bearer म्हणून पाठवल्यास कीला व्यवस्थापन API एंडपॉइंट्समध्ये प्रवेश प्रदान करतो.

### MCP स्कोप्स (`src/shared/constants/mcpScopes.ts`)

प्रत्येक MCP साधनाला `MCP_TOOL_SCOPES` द्वारे विशिष्ट स्कोप्स आवश्यक असतात. संपूर्ण यादी (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` मधील स्कोप अंमलबजावणी, `resolveCallerScopeContext()` द्वारे MCP प्रमाणीकरण माहिती,
विनंती मेटाडेटा किंवा `OMNIROUTE_MCP_SCOPES` मधून स्कोप्स निर्धारित झाल्यानंतर, प्रत्येक साधनाची स्कोप यादी
`evaluateToolScopes()` मध्ये पाठवते.

## प्रमाणीकरण आवश्यक टॉगल

`src/shared/utils/apiAuth.ts` मधील `isAuthRequired()` एखाद्या विनंतीसाठी **कोणतेही** प्रमाणीकरण लागू केले जाईल की नाही हे ठरवते:

- `settings.requireLogin === false` → प्रमाणीकरण जागतिक स्तरावर अक्षम केले जाते.
- कोणताही पासवर्ड कॉन्फिगर केलेला नसल्यास **आणि** `INITIAL_PASSWORD` env var नसल्यास → बूटस्ट्रॅप मोड ऑनबोर्डिंग विझार्ड आणि लूपबॅक विनंत्यांना परवानगी देतो, परंतु नेटवर्कवर उघड केलेल्या विनंत्यांना तरीही क्रेडेन्शियल्स आवश्यक असतात.
- कोणतीही DB त्रुटी → प्रवेश नाकारला जातो (डीफॉल्टनुसार-सुरक्षित).

क्लायंट API कीची अंमलबजावणी थेट `process.env.REQUIRE_API_KEY` वाचण्याऐवजी `src/shared/utils/featureFlags.ts` मधील `isRequireApiKeyEnabled()` वापरते. डिप्लॉय केलेल्या इन्स्टन्सेससाठी हे महत्त्वाचे आहे: Dashboard → Feature Flags मध्ये `REQUIRE_API_KEY` टॉगल केल्याने DB ओव्हरराइड संग्रहित होतो आणि `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` तसेच हा हेल्पर सामायिक करणाऱ्या इतर क्लायंट-API प्रमाणीकरण तपासण्यांवर त्वरित परिणाम होतो. फीचर फ्लॅग स्टोअर वाचता न आल्यास, क्लायंट API प्रमाणीकरण प्रवेश नाकारते आणि की आवश्यक ठरवते.

## ब्रेकिंग बदल — v3.8.0

`/api/v1/agents/tasks/*` आणि `/api/resilience/model-cooldowns` एंडपॉइंट्सना **आता व्यवस्थापन प्रमाणीकरण आवश्यक आहे** (कमिट `588a0333`). पूर्वी `manage` स्कोपशिवाय सामान्य API की पाठवणाऱ्या क्लायंटना `403` मिळतो. स्थलांतर: एकतर API Keys डॅशबोर्डमध्ये कीला `manage` स्कोप द्या किंवा लॉग-इन केलेले डॅशबोर्ड सत्र वापरा.

## वर्तनातील बदल — v3.8.2

`/api/mcp/*` (रिमोट MCP सर्व्हर) अजूनही डीफॉल्टनुसार LOCAL_ONLY आहे, परंतु `Authorization: Bearer <api-key>` हेडरमध्ये `manage` स्कोप असल्यास तो आता लूपबॅक नसलेल्या विनंत्या स्वीकारतो. हा अपवाद `src/server/authz/routeGuard.ts` मधील `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` द्वारे प्रत्येक पाथसाठी स्पष्टपणे नियंत्रित केला जातो; संबंधित LOCAL_ONLY प्रीफिक्स `/api/cli-tools/runtime/*` हेतुपुरस्सर बायपास करता येत नाही, कारण तो कोणत्याही प्रकारच्या सबप्रोसेसेस सुरू करू शकतो. लूपबॅक नसलेल्या स्त्रोतांकडून `/api/mcp/*` कडे येणाऱ्या अनामिक विनंत्यांना पुढेही `403 LOCAL_ONLY` मिळतो — कोणत्याही नवीन LOCAL_ONLY पाथसाठी डीफॉल्ट नियम कठोर-लूपबॅकच राहतो. [रूट गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) पहा.

## चाचणी

- युनिट चाचण्या: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- सार्वजनिक अनुमतसूची: `tests/unit/public-api-routes.test.ts`.
- लक्ष केंद्रित करून चालवा: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## डीबगिंग

पाइपलाइन प्रतिसादांवर नेहमी खालील शिक्के लावते:

```
x-request-id:               <सहसंबंध आयडी, त्रुटीच्या मजकुरात पुन्हा दर्शविला जातो>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणीकृत विनंत्यांसाठी, अपस्ट्रीम (हँडलर-बाजूच्या) विनंती हेडर्समध्ये पुढील गोष्टीदेखील समाविष्ट असतात:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<शेवटचे-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (पर्यायी)
x-omniroute-auth-scopes:    स्वल्पविरामाने विभक्त केलेली सूची
```

हँडलर्समध्ये `assertAuth(req, expectedClass)` वापरा — मिडलवेअर वगळले गेले असल्यास ते `AUTHZ_NOT_INITIALIZED` कोडसह `AuthzAssertionError` फेकते (चाचण्यांमधील कॉन्फिगरेशन रिग्रेशन्स शोधण्यासाठी उपयुक्त).

## हे देखील पहा

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रत्येक एंडपॉइंटसाठी प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण इव्हेंट्ससाठी ऑडिट लॉग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP स्कोप अंमलबजावणीचे तपशील
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
