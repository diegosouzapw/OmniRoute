# Authorization Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ប្រភពយោងចម្បង:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-06-28 — v3.8.40

OmniRoute មានខ្សែដំណើរការផ្តល់សិទ្ធិដែលយល់ដឹងអំពី route និងគ្រប់គ្រងរាល់សំណើ API។ ការចាត់ថ្នាក់គឺ **មានលក្ខណៈកំណត់ច្បាស់លាស់** និង **បិទការចូលប្រើនៅពេលបរាជ័យ** — អ្វីក៏ដោយដែលមិនអាចចាត់ថ្នាក់បាន នឹងត្រូវចាត់ជា `MANAGEMENT` ហើយទាមទារ session ឬ token កម្រិតគ្រប់គ្រង។ ទំព័រនេះពន្យល់អំពីម៉ូដែលសម្រាប់វិស្វករដែលថែទាំ route ឬរចនា endpoint ថ្មីៗ។

![ខ្សែដំណើរការ AuthZ (ចំណាត់ថ្នាក់ route 3 + ការវាយតម្លៃគោលការណ៍)](../diagrams/exported/authz-pipeline.svg)

> ប្រភព៖ [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## របៀបផ្ទៀងផ្ទាត់អត្តសញ្ញាណពីរ

### 1. API Key (Bearer)

ប្រើសម្រាប់ API របស់ client ដែលត្រូវគ្នាជាមួយ OpenAI/Anthropic/Gemini និង route គ្រប់គ្រងមួយចំនួន នៅពេល key មាន scope `manage`។

```
Authorization: Bearer <api-key>
```

ត្រូវបានផ្ទៀងផ្ទាត់ដោយ `isValidApiKey()` / `extractApiKey()` នៅក្នុង `src/sse/services/auth.ts` ហើយត្រូវបាន export ឡើងវិញតាមរយៈ `src/shared/utils/apiAuth.ts`។ កម្មវិធីផ្ទៀងផ្ទាត់ក៏ទទួលយក env vars `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ជា passthrough key អចិន្ត្រៃយ៍ផងដែរ (បញ្ហា #1350)។

### 2. Dashboard Session (cookie auth_token)

សម្រាប់ទំព័រ dashboard និងប្រតិបត្តិការរដ្ឋបាល។

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

cookie មួយត្រូវបានចាត់ទុកជា session លុះត្រាតែ JWT ត្រូវបានផ្ទៀងផ្ទាត់ **ហើយ** មាន `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)។ គ្រប់
កន្លែងដែលប្រើប្រាស់ cookie (route guard, ការធ្វើឱ្យ authz pipeline ស្រស់ឡើងវិញ, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) សុទ្ធតែឆ្លងកាត់ helper នោះ។
មាន JWT ផ្សេងទៀតដែលបានចុះហត្ថលេខាដោយ `JWT_SECRET` — Cursor CLI passthrough បង្កើត
token `iss "omniroute" / aud "cursor-cli"` សម្រាប់អ្នកកាន់ key — ហើយ token ទាំងនេះមិនត្រូវបានចាត់ទុកជា session ឡើយ
(#13298)។

ត្រូវបានផ្ទៀងផ្ទាត់ដោយ `isDashboardSessionAuthenticated()` នៅក្នុង `src/shared/utils/apiAuth.ts`។ ខ្សែដំណើរការនេះធ្វើឱ្យ JWT ស្រស់ឡើងវិញដោយស្វ័យប្រវត្តិ នៅពេលវាមានសុពលភាពនៅសល់តិចជាង 7 ថ្ងៃ ក្នុងរយៈពេលសុពលភាពសរុប 30 ថ្ងៃ។

route គ្រប់គ្រងមួយចំនួនទទួលយក **របៀបណាមួយក៏បាន**៖ cookie ឬ `Bearer <key>` នៅពេល API key មាន scope `manage` (ឬ `admin`)។ នេះជាអ្វីដែលអនុញ្ញាតឱ្យមានលំហូរការងារ "អាចកំណត់រចនាសម្ព័ន្ធតាមរយៈការហៅ API" ដែលបានបន្ថែមនៅក្នុង v3.8។

#### ច្រកចូល OIDC ជាជម្រើស (#6973)

ការចូលជាអ្នកគ្រប់គ្រង dashboard ក៏គាំទ្រលំហូរ OIDC (OpenID Connect) ដែលត្រូវតែ **បើកប្រើដោយជាក់លាក់**
រួមជាមួយការចូលដោយពាក្យសម្ងាត់លំនាំដើម — ការចូលដោយពាក្យសម្ងាត់មិនត្រូវបានលុបចេញឡើយ គ្រាន់តែ
ត្រូវបានបំពេញបន្ថែមប៉ុណ្ណោះ៖

- ត្រូវបានបិទ លុះត្រាតែ `settings.oidcEnabled === true` **ហើយ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ទាំងអស់ត្រូវបានកំណត់រចនាសម្ព័ន្ធ (Settings → Auth)។
  `GET /api/auth/oidc/login` ត្រឡប់ `400` បើមិនដូច្នោះទេ។
- `GET /api/auth/oidc/login` ស្វែងរក `authorization_endpoint` ពី
  `/.well-known/openid-configuration` របស់ issuer (បើរកមិនឃើញ វាប្រើ
  `<issuer>/authorize`) បង្កើត redirect URI ពីសំណើដែលចូលមក
  (គាំទ្រ `x-forwarded-proto`) ហើយបញ្ជូនបន្តទៅ IdP ជាមួយ `state` ចៃដន្យ
  ដែលរក្សាទុកក្នុង cookie `oidc_state` ប្រភេទ `httpOnly`។
- `GET /api/auth/oidc/callback` ផ្ទៀងផ្ទាត់ `state` ប្តូរ authorization
  code ហើយផ្ទៀងផ្ទាត់ហត្ថលេខារបស់ ID token តាមរយៈ JWKS របស់ issuer
  (`createRemoteJWKSet` របស់ `jose` ដែលត្រូវបាន cache សម្រាប់ JWKS URI នីមួយៗ) ជាមួយការត្រួតពិនិត្យ `issuer`/`audience`។
  បញ្ជីអនុញ្ញាត `oidcAllowedSubjects` ដែលជាជម្រើស ផ្គូផ្គងនឹង claim
  `sub` របស់ token ឬ claim `email` របស់វា — claim អ៊ីមែលត្រូវបានទទួលស្គាល់តែនៅពេល
  `email_verified === true` ប៉ុណ្ណោះ ដូច្នេះអ៊ីមែលដែលមិនបានផ្ទៀងផ្ទាត់នៅ IdP មិនអាចឆ្លងកាត់
  ច្រកត្រួតពិនិត្យនេះបានឡើយ។
- នៅពេលជោគជ័យ វាបង្កើត JWT `auth_token` អាយុកាល 30 ថ្ងៃដែល **ដូចគ្នាបេះបិទ** នឹង JWT ដែលការចូលដោយពាក្យសម្ងាត់
  ចេញឱ្យ (`src/app/api/auth/login/route.ts`) ដូច្នេះផ្នែកផ្សេងទៀតនៃ
  ខ្សែដំណើរការ dashboard session (ការធ្វើឱ្យស្រស់ដោយស្វ័យប្រវត្តិ និង cookie flags) នៅតែមិនផ្លាស់ប្តូរ —
  OIDC គ្រាន់តែជំនួសរបៀបដែល cookie ត្រូវបានបង្កើតប៉ុណ្ណោះ មិនមែនសិទ្ធិដែលវាផ្តល់ឱ្យនោះទេ។

## ថ្នាក់ Route

`src/server/authz/types.ts` កំណត់ class ចំនួនបី; route ណាមួយដែលមិនអាចចាត់ថ្នាក់បានយ៉ាងច្បាស់លាស់ នឹងត្រឡប់ទៅប្រើ `MANAGEMENT`។

| ថ្នាក់       | សេចក្ដីពិពណ៌នា                                                                                                                                            | តម្រូវការ Auth                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Route ដែលបានកំណត់យ៉ាងច្បាស់ថាមានសុវត្ថិភាព — ការចូល ការចាកចេញ ស្ថានភាព ការចាប់ផ្ដើម សុខភាព និងការរៀបចំដំបូងសម្រាប់ onboarding។                            | មិនត្រូវការ                                                                  |
| `CLIENT_API` | Endpoint សម្រាប់បម្រើ model — `/api/v1/*`, `/api/v1beta/*` ព្រមទាំង alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`។ | Bearer key នៅពេល feature flag `REQUIRE_API_KEY` ដែលមានប្រសិទ្ធភាពត្រូវបានបើក |
| `MANAGEMENT` | ទំព័រ Dashboard ការកំណត់ provider key endpoint សម្រាប់ admin និងការធ្វើរោគវិនិច្ឆ័យ។                                                                      | Session របស់ Dashboard ឬ Bearer ដែលមាន scope `manage`                        |

## Pipeline

```
Request ចូលមក → src/proxy.ts
  → runAuthzPipeline() នៅក្នុង src/server/authz/pipeline.ts
    1. ដក header ខាងក្នុងដែលទុកចិត្តបានចេញ (x-omniroute-auth-*, x-omniroute-route-class)
    2. បង្កើត request id ហើយចាត់ថ្នាក់ route តាមរយៈ classifyRoute()
    3. ប្រសិនបើ pathname == "/" → បញ្ជូនបន្តទៅ /dashboard
    4. ប្រសិនបើកំពុងបញ្ចប់ដំណើរការ (graceful shutdown) ហើយជា /api/* → 503
    5. ប្រសិនបើជា /api/* ដែលមិនមែនជា GET → ប្រើ guard checkBodySize()
    6. ប្រសិនបើជា OPTIONS → CORS preflight 204
    7. ប្រសិនបើ options.enforce == false → ឆ្លងកាត់ជាមួយ header សម្រាប់ route class
    8. បើមិនដូច្នោះទេ៖ POLICIES[routeClass].evaluate(ctx)
       - អនុញ្ញាត  → កំណត់ x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - បដិសេធ → JSON error ជាមួយ correlation_id (ទំព័រ dashboard → 302 /login)
```

Header ខាងក្នុងដែលទុកចិត្តបាន (កំណត់នៅក្នុង `src/server/authz/headers.ts`) ត្រូវបាន **ដកចេញពី request ចូលមក** មុនពេលចាត់ថ្នាក់ — client មិនអាចកំណត់ `x-omniroute-auth-*` ជាមុន ដើម្បីក្លែងខ្លួនជាប្រធានបទណាមួយបានទេ។

### កិច្ចសន្យារបស់ Policy

ថ្នាក់ route នីមួយៗមាន policy មួយនៅក្នុង `src/server/authz/policies/`៖

- **`publicPolicy`** (`policies/public.ts`) — តែងតែត្រឡប់ `allow({ kind: "anonymous", id: "anonymous" })`។
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ទាញយក Bearer ហើយផ្ទៀងផ្ទាត់តាមរយៈ `validateApiKey()`។ វាបន្តទៅជា anonymous តែនៅពេល feature flag `REQUIRE_API_KEY` ដែលមានប្រសិទ្ធភាពត្រូវបានបិទប៉ុណ្ណោះ។ Flag ដែលមានប្រសិទ្ធភាពត្រូវបានកំណត់តាមរយៈ `isRequireApiKeyEnabled()` (`ការកំណត់ជាន់លើដោយ DB feature flag > process.env.REQUIRE_API_KEY > តម្លៃលំនាំដើម`) ដូច្នេះ Dashboard Feature Flags និង environment variables គ្រប់គ្រង `/api/v1/*`, `/api/v1beta/*` និង alias ឱ្យស្របគ្នា; ប្រសិនបើ resolver បរាជ័យ ប្រព័ន្ធនឹងបិទជាលំនាំដើម។ អនុញ្ញាត request ដែលមាន dashboard session នៅលើ client API route (រួមទាំង `/api/v1/models` ដែលត្រូវបានប្រើដោយបញ្ជី model របស់ dashboard)។
- **`managementPolicy`** (`policies/management.ts`) — ទទួលយក dashboard session, request សមកាលកម្ម model ខាងក្នុង (ដែលផ្គូផ្គងនឹង `/api/providers/[name]/(sync-models|models)`) ឬរំលងទាំងស្រុង ប្រសិនបើ `isAuthRequired()` ត្រឡប់ false។ ត្រឡប់ 403 (`AUTH_001`) នៅពេលមាន Bearer token ប៉ុន្តែមិនត្រឹមត្រូវ ហើយត្រឡប់ 401 ក្នុងករណីផ្សេងទៀត។ វាក៏អនុវត្តកម្រិត route guard (LOCAL_ONLY / ALWAYS_PROTECTED) មុន auth branch ណាមួយផងដែរ — សូមមើល [កម្រិត Route Guard](../security/ROUTE_GUARD_TIERS.md)។ Path ប្រភេទ LOCAL_ONLY នៅក្នុង `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (បច្ចុប្បន្ន៖ `/api/mcp/`) អាចត្រូវបានចូលប្រើពី non-loopback នៅពេល Bearer key មាន scope `manage`; path ប្រភេទ LOCAL_ONLY ផ្សេងទៀតទាំងអស់ នៅតែតម្រូវឱ្យជា strict-loopback ដោយមិនគិតពី scope។

Policy ដែលជោគជ័យត្រឡប់ `AuthSubject` ដែលមាន `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`។ Handler នៅខ្សែដំណើរការបន្ទាប់អាចអានវាតាមរយៈ `assertAuth(request, "CLIENT_API")` នៅក្នុង `src/server/authz/assertAuth.ts` ជំនួសឱ្យការដំណើរការ logic សម្រាប់ auth ឡើងវិញ។

## បញ្ជី Route សាធារណៈ

`src/shared/constants/publicApiRoutes.ts` គឺជា allowlist ដែលបានកំណត់យ៉ាងច្បាស់៖

បញ្ជីនេះត្រូវបានបែងចែកតាម **ទម្រង់** ហើយការបែងចែកនេះមានសារៈសំខាន់ចាំបាច់ (GHSA-74g9-q8f6-793h)៖ prefix មួយត្រូវបានផ្គូផ្គងដោយប្រើ `startsWith()` ដូច្នេះវាក៏ផ្គូផ្គងនឹង path ជាប់គ្នាទាំងអស់ដែលមានតួអក្សរដើមដូចគ្នាផងដែរ។
ការដាក់ `/api/usage/om-usage` ជា prefix បានកំណត់ឱ្យ `/api/usage/om-usage<anything>` ជា PUBLIC ហើយ Next បកស្រាយវាទៅជា `/api/usage/[connectionId]` — ដែលជា handler គ្មានការផ្ទៀងផ្ទាត់អត្តសញ្ញាណផ្ទាល់ខ្លួន។

```ts
// Subtree ពិតប្រាកដ។ ធាតុនីមួយៗត្រូវតែបញ្ចប់ដោយ "/" (ត្រូវបានផ្ទៀងផ្ទាត់ដោយ unit test)។
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ត្រូវបានចាត់ទុកជា CLIENT_API នៅក្នុង classify មិនមែនជា "សាធារណៈដោយមិនត្រូវការការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ" ទេ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Route ទោល ដែលត្រូវបានផ្គូផ្គងយ៉ាងជាក់លាក់ (មាន ឬគ្មាន trailing slash)។
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

// Route ទោលសម្រាប់តែអាន ដែលក៏ទទួលបានការបន្ធូរបន្ថយលើ CORS origin ផងដែរ។
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route ទោលសម្រាប់តែអាន ដោយគ្មានការបន្ធូរបន្ថយ CORS។
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Route សម្រាប់តែអានគឺសាធារណៈ **តែ** សម្រាប់ method ដែលមានសុវត្ថិភាពប៉ុណ្ណោះ។ ចំណាំ៖ `classifyRoute()` ដក `/api/v1/*` និង `/api/v1beta/*` ចេញពី PUBLIC fall-through — ទាំងនេះតែងតែជា `CLIENT_API` ដើម្បីឱ្យគោលការណ៍ Bearer-key នៅតែត្រូវបានអនុវត្ត។

## ការបន្ថែម Route ថ្មី

### លំនាំទី 1 — Endpoint សាធារណៈសម្រាប់ client API (ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណដោយ Bearer)

Route ក្រោម `/api/v1/` និង `/api/v1beta/` ត្រូវបានចាត់ថ្នាក់ជា `CLIENT_API` ដោយស្វ័យប្រវត្តិ។ Middleware អនុវត្តការត្រួតពិនិត្យ Bearer។ Route handler មិនចាំបាច់ធ្វើវាឡើងវិញទេ ប៉ុន្តែអាចអាន subject បាន ប្រសិនបើមានប្រយោជន៍។

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... តក្កវិជ្ជារបស់ handler
}
```

### លំនាំទី 2 — Endpoint សម្រាប់ការគ្រប់គ្រង (session ឬ Bearer + manage)

ប្រើ `requireManagementAuth()` ពី `src/lib/api/requireManagementAuth.ts`៖

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... តក្កវិជ្ជារបស់ handler
}
```

`requireManagementAuth()` ត្រឡប់ `null` នៅពេលជោគជ័យ ឬ JSON error `Response`៖

- 401 `AUTH_001` "តម្រូវឱ្យមានការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ" — គ្មានព័ត៌មានសម្គាល់អត្តសញ្ញាណសោះ
- 403 — Bearer មិនត្រឹមត្រូវ **ឬ** មាន Bearer ប៉ុន្តែ key ខ្វះ scope `manage` / `admin`

`hasManageScope(scopes)` ត្រឡប់ true សម្រាប់ `"manage"` ឬ `"admin"`។

### លំនាំទី 3 — ការបន្ថែមទៅក្នុង allowlist សាធារណៈ

ជ្រើសរើស set តាមទម្រង់ មិនមែនតាមភាពងាយស្រួលទេ។ Route មួយត្រូវដាក់ក្នុង `PUBLIC_API_ROUTES_EXACT` (ឬ `PUBLIC_READONLY_CORS_API_ROUTES` សម្រាប់ GET-only)។ មានតែ subtree ពិតប្រាកដប៉ុណ្ណោះដែលត្រូវដាក់ក្នុង `PUBLIC_API_ROUTE_PREFIXES` ហើយវា **ត្រូវតែបញ្ចប់ដោយ `/`**។ ការដាក់ route ទោលមួយក្នុងបញ្ជី prefix ក៏ធ្វើឱ្យ path ជាប់គ្នាទាំងអស់ដែលមានតួអក្សរដើមដូចគ្នាក្លាយជាសាធារណៈផងដែរ — រួមទាំង dynamic-segment sibling ដែលត្រូវបានបន្ថែមនៅពេលក្រោយ (GHSA-74g9-q8f6-793h)។ ធ្វើបច្ចុប្បន្នភាព unit test នៅ `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` និង `tests/unit/authz/classify.test.ts`។

## វិសាលភាព

API key មានអារេ `scopes` (រក្សាទុកជា JSON នៅក្នុង `api_keys.scopes` សូមមើល `src/lib/db/apiKeys.ts`)។

### វិសាលភាពគ្រប់គ្រង

- `manage` / `admin` — ផ្តល់សិទ្ធិឱ្យ key ចូលប្រើ endpoint របស់ management API នៅពេលផ្ញើជា Bearer។

### វិសាលភាព MCP (`src/shared/constants/mcpScopes.ts`)

ឧបករណ៍ MCP នីមួយៗតម្រូវឱ្យមានវិសាលភាពជាក់លាក់តាមរយៈ `MCP_TOOL_SCOPES`។ បញ្ជីពេញលេញ (`MCP_SCOPE_LIST`)៖

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

ការអនុវត្តវិសាលភាពនៅក្នុង `open-sse/mcp-server/server.ts` បញ្ជូនបញ្ជីវិសាលភាពរបស់ឧបករណ៍នីមួយៗទៅក្នុង
`evaluateToolScopes()` បន្ទាប់ពី `resolveCallerScopeContext()` កំណត់វិសាលភាពពីព័ត៌មានផ្ទៀងផ្ទាត់ MCP,
metadata របស់ request ឬ `OMNIROUTE_MCP_SCOPES`។

## ការបិទបើកតម្រូវការផ្ទៀងផ្ទាត់

`isAuthRequired()` នៅក្នុង `src/shared/utils/apiAuth.ts` សម្រេចថាតើការផ្ទៀងផ្ទាត់ **ណាមួយ** ត្រូវបានអនុវត្តសម្រាប់ request ដែរឬទេ៖

- `settings.requireLogin === false` → ការផ្ទៀងផ្ទាត់ត្រូវបានបិទជាសកល។
- មិនមាន password ដែលបានកំណត់រចនាសម្ព័ន្ធ **និង** មិនមាន env var `INITIAL_PASSWORD` → bootstrap mode អនុញ្ញាត onboarding wizard និង loopback request ប៉ុន្តែ request តាមបណ្ដាញដែលបើកឱ្យចូលប្រើនៅតែត្រូវការព័ត៌មានសម្គាល់អត្តសញ្ញាណ។
- កំហុស DB ណាមួយ → បដិសេធជានិច្ច (សុវត្ថិភាពតាមលំនាំដើម)។

ការអនុវត្ត API key របស់ client ប្រើ `isRequireApiKeyEnabled()` នៅក្នុង `src/shared/utils/featureFlags.ts` មិនមែនអាន `process.env.REQUIRE_API_KEY` ដោយផ្ទាល់ទេ។ ចំណុចនេះសំខាន់សម្រាប់ instance ដែលបាន deploy៖ ការបិទបើក `REQUIRE_API_KEY` នៅក្នុង Dashboard → Feature Flags នឹងរក្សាទុក override ក្នុង DB ហើយមានប្រសិទ្ធភាពភ្លាមៗលើ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` និងការត្រួតពិនិត្យផ្ទៀងផ្ទាត់ client API ផ្សេងទៀតដែលប្រើ helper នេះរួមគ្នា។ ប្រសិនបើមិនអាចអាន feature flag store បានទេ ការផ្ទៀងផ្ទាត់ client API នឹងបដិសេធជានិច្ច និងតម្រូវឱ្យមាន key។

## ការផ្លាស់ប្តូរដែលមិនត្រូវគ្នាជាមួយកំណែមុន — v3.8.0

endpoint `/api/v1/agents/tasks/*` និង `/api/resilience/model-cooldowns` **ឥឡូវនេះតម្រូវឱ្យមានការផ្ទៀងផ្ទាត់សម្រាប់ការគ្រប់គ្រង** (commit `588a0333`)។ Client ដែលពីមុនផ្ញើ API key ធម្មតាដោយគ្មានវិសាលភាព `manage` នឹងទទួលបាន `403`។ ការធ្វើ migration៖ ផ្តល់វិសាលភាព `manage` ដល់ key នៅក្នុង dashboard API Keys ឬប្រើ dashboard session ដែលបាន log in។

## ការផ្លាស់ប្តូរឥរិយាបថ — v3.8.2

`/api/mcp/*` (ម៉ាស៊ីនមេ MCP ពីចម្ងាយ) នៅតែជា LOCAL_ONLY តាមលំនាំដើម ប៉ុន្តែឥឡូវនេះវាទទួលយក request ដែលមិនមែនជា loopback នៅពេល header `Authorization: Bearer <api-key>` មានវិសាលភាព `manage`។ ករណីលើកលែងនេះត្រូវបានគ្រប់គ្រងយ៉ាងច្បាស់លាស់តាម path នីមួយៗតាមរយៈ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` នៅក្នុង `src/server/authz/routeGuard.ts`។ prefix LOCAL_ONLY ដែលនៅជាប់គ្នា `/api/cli-tools/runtime/*` មានចេតនា **មិន** អនុញ្ញាតឱ្យរំលងទេ ព្រោះវាអាចបង្កើត subprocess តាមអំពើចិត្ត។ Anonymous request ទៅកាន់ `/api/mcp/*` ពី non-loopback នៅតែបន្តទទួលបាន `403 LOCAL_ONLY` — លំនាំដើមសម្រាប់ path LOCAL_ONLY ថ្មីណាមួយនៅតែតម្រូវឱ្យជា loopback យ៉ាងតឹងរ៉ឹង។ សូមមើល [កម្រិត Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)។

## ការធ្វើតេស្ត

- Unit test៖ `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`។
- Public allowlist៖ `tests/unit/public-api-routes.test.ts`។
- ដំណើរការ test ជាក់លាក់៖ `node --import tsx/esm --test tests/unit/authz/classify.test.ts`។

## ការបំបាត់កំហុស

Pipeline តែងតែបន្ថែមសញ្ញាសម្គាល់លើចម្លើយតបដោយ៖

```
x-request-id:               <លេខសម្គាល់ទំនាក់ទំនង ដែលត្រូវបានបង្ហាញឡើងវិញក្នុងតួអត្ថបទកំហុស>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

សម្រាប់សំណើដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណ បឋមកថាសំណើនៅ upstream (ខាង handler) ក៏រួមបញ្ចូលផងដែរ៖

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<លេខ 4 ខ្ទង់ចុងក្រោយ> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ស្រេចចិត្ត)
x-omniroute-auth-scopes:    បញ្ជីដែលបំបែកដោយសញ្ញាក្បៀស
```

ប្រើ `assertAuth(req, expectedClass)` នៅក្នុង handlers — វាបោះ `AuthzAssertionError` ដែលមានកូដ `AUTHZ_NOT_INITIALIZED` ប្រសិនបើ middleware ត្រូវបានរំលង (មានប្រយោជន៍សម្រាប់ការរកឃើញការថយចុះគុណភាពនៃការកំណត់រចនាសម្ព័ន្ធក្នុងការធ្វើតេស្ត)។

## សូមមើលផងដែរ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — សញ្ញាសម្គាល់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណតាម endpoint នីមួយៗ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — កំណត់ហេតុសវនកម្មសម្រាប់ព្រឹត្តិការណ៍ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — ព័ត៌មានលម្អិតអំពីការអនុវត្ត MCP scope
- កូដប្រភព៖ `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
