# Authorization Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **အမှန်တကယ် ကိုးကားရမည့် ရင်းမြစ်:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **နောက်ဆုံး အပ်ဒိတ်လုပ်ထားသည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute တွင် API တောင်းဆိုမှုတိုင်းကို ထိန်းချုပ်ကန့်သတ်ပေးသည့် route-aware authorization pipeline တစ်ခု ရှိသည်။ အမျိုးအစားခွဲခြားမှုသည် **တိကျသတ်မှတ်ထားသော (deterministic)** ပုံစံဖြစ်ပြီး **မသေချာလျှင် ပိတ်ပင်သော (fail-closed)** ပုံစံလည်း ဖြစ်သည် — အမျိုးအစား မခွဲခြားနိုင်သည့် မည်သည့်အရာမဆို နောက်ဆုံးတွင် `MANAGEMENT` အဖြစ် သတ်မှတ်ခံရပြီး session သို့မဟုတ် management အဆင့် token တစ်ခု လိုအပ်သည်။ ဤစာမျက်နှာတွင် route များကို ထိန်းသိမ်းနေသော သို့မဟုတ် endpoint အသစ်များကို ဒီဇိုင်းရေးဆွဲနေသော အင်ဂျင်နီယာများအတွက် model ကို ရှင်းပြထားသည်။

![AuthZ pipeline (route အမျိုးအစား 3 ခု + policy အကဲဖြတ်ခြင်း)](../diagrams/exported/authz-pipeline.svg)

> ရင်းမြစ်: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Auth Mode နှစ်မျိုး

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini နှင့် ကိုက်ညီသော client API များအတွက် အသုံးပြုပြီး key တွင် `manage` scope ရှိသည့်အခါ management route အချို့အတွက်လည်း အသုံးပြုသည်။

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ရှိ `isValidApiKey()` / `extractApiKey()` တို့ဖြင့် စစ်ဆေးအတည်ပြုပြီး `src/shared/utils/apiAuth.ts` မှတစ်ဆင့် ပြန်လည် export လုပ်ထားသည်။ Validator သည် `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars များကို အမြဲတမ်းအသုံးပြုနိုင်သော passthrough key များအဖြစ်လည်း လက်ခံသည် (issue #1350)။

### 2. Dashboard Session (auth_token cookie)

Dashboard စာမျက်နှာများနှင့် admin လုပ်ဆောင်ချက်များအတွက် ဖြစ်သည်။

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ကို အတည်ပြုနိုင်ပြီး **ထို့အပြင်** `authenticated: true` ပါရှိသည့်အခါမှသာ cookie တစ်ခုကို session အဖြစ် သတ်မှတ်သည်
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)။ Cookie ကို
အသုံးပြုသူတိုင်း (route guard၊ authz pipeline refresh၊ WebSocket handshake၊ live
server၊ `/api/settings/require-login`၊ `/api/auth/status`) သည် ထို helper မှတစ်ဆင့်
လုပ်ဆောင်သည်။ `JWT_SECRET` ဖြင့် လက်မှတ်ထိုးထားသည့် အခြား JWT များလည်း ရှိသည် — Cursor CLI passthrough သည်
key ကိုင်ဆောင်သူများအတွက် `iss "omniroute" / aud "cursor-cli"` token များကို ထုတ်ပေးသည် — သို့သော် ၎င်းတို့ကို session များအဖြစ်
မည်သည့်အခါမျှ မသတ်မှတ်ပါ
(#13298)။

`src/shared/utils/apiAuth.ts` ရှိ `isDashboardSessionAuthenticated()` ဖြင့် စစ်ဆေးအတည်ပြုသည်။ ရက် 30 သက်တမ်းအတွင်း ကျန်ရှိသည့်အချိန် 7 ရက်အောက် ရောက်သွားသောအခါ pipeline က JWT ကို အလိုအလျောက် refresh လုပ်သည်။

Management route အချို့သည် mode **တစ်မျိုးမျိုးကို** လက်ခံသည်- API key တွင် `manage` (သို့မဟုတ် `admin`) scope ရှိပါက cookie သို့မဟုတ် `Bearer <key>` ဖြစ်သည်။ ဤအချက်က v3.8 တွင် ထည့်သွင်းခဲ့သည့် "API call များမှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်နိုင်သော" workflow ကို အသုံးပြုနိုင်စေသည်။

#### ရွေးချယ်အသုံးပြုနိုင်သော OIDC login gate (#6973)

Dashboard admin login သည် မူလ password login နှင့်အတူ **ရွေးချယ်ဖွင့်နိုင်သော** OIDC (OpenID Connect) flow ကိုလည်း
ပံ့ပိုးသည် — password login ကို မည်သည့်အခါမျှ ဖယ်ရှားခြင်းမရှိဘဲ
ထပ်မံဖြည့်စွက်ပေးခြင်းသာ ဖြစ်သည်-

- `settings.oidcEnabled === true` ဖြစ်ပြီး **ထို့အပြင်** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` အားလုံးကို ပြင်ဆင်သတ်မှတ်ထားသည့်အခါမှသာ ဖွင့်ထားသည် (Settings → Auth)။
  မဟုတ်ပါက `GET /api/auth/oidc/login` သည် `400` ကို ပြန်ပေးသည်။
- `GET /api/auth/oidc/login` သည် issuer ၏
  `/.well-known/openid-configuration` မှ `authorization_endpoint` ကို ရှာဖွေသည်
  (`<issuer>/authorize` ကို fallback အဖြစ် အသုံးပြုသည်)၊ ဝင်လာသော request မှ redirect URI ကို တည်ဆောက်သည်
  (`x-forwarded-proto` ကို ထည့်သွင်းစဉ်းစားသည်)၊ ထို့နောက် `httpOnly` `oidc_state` cookie ထဲတွင်
  သိမ်းဆည်းထားသော ကျပန်း `state` တစ်ခုနှင့်အတူ IdP သို့ redirect လုပ်သည်။
- `GET /api/auth/oidc/callback` သည် `state` ကို စစ်ဆေးအတည်ပြုကာ authorization
  code ကို လဲလှယ်ပြီး issuer ၏ JWKS မှတစ်ဆင့် ID token ၏ လက်မှတ်ကို
  (`jose` ၏ `createRemoteJWKSet`၊ JWKS URI တစ်ခုချင်းစီအလိုက် cache လုပ်ထားသည်) `issuer`/`audience`
  စစ်ဆေးမှုများနှင့်အတူ အတည်ပြုသည်။ ရွေးချယ်အသုံးပြုနိုင်သော `oidcAllowedSubjects` allowlist သည် token ၏
  `sub` claim သို့မဟုတ် ၎င်း၏ `email` claim နှင့် ကိုက်ညီမှုကို စစ်ဆေးသည် — `email_verified === true` ဖြစ်သည့်အခါမှသာ
  email claim ကို လက်ခံသောကြောင့် IdP ရှိ အတည်မပြုရသေးသော email တစ်ခုသည်
  gate ကို မည်သည့်အခါမျှ ဖြတ်ကျော်နိုင်မည် မဟုတ်ပါ။
- အောင်မြင်ပါက password login မှ ထုတ်ပေးသည့် **အတိအကျ တူညီသော** ရက် 30 သက်တမ်းရှိ `auth_token` JWT ကို
  ထုတ်ပေးသည် (`src/app/api/auth/login/route.ts`)။ ထို့ကြောင့် ကျန်ရှိသော
  dashboard session pipeline (အလိုအလျောက် refresh လုပ်ခြင်း၊ cookie flag များ) သည် မပြောင်းလဲပါ —
  OIDC သည် cookie က ပေးအပ်သည့် ခွင့်ပြုချက်ကို မပြောင်းလဲဘဲ cookie ထုတ်ပေးသည့်နည်းလမ်းကိုသာ အစားထိုးသည်။

## Route အတန်းအစားများ

`src/server/authz/types.ts` တွင် အတန်းအစားသုံးခုကို သတ်မှတ်ထားသည်။ မည်သည့် route ကိုမဆို တိကျသေချာစွာ အမျိုးအစားခွဲခြား၍ မရပါက `MANAGEMENT` သို့ ပြန်လည်သတ်မှတ်သည်။

| အတန်းအစား    | ဖော်ပြချက်                                                                                                                                                                     | လိုအပ်သော အထောက်အထားစိစစ်မှု                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `PUBLIC`     | လုံခြုံကြောင်း အတိအလင်းသတ်မှတ်ထားသည့် route များ — login၊ logout၊ status၊ init၊ health၊ onboarding bootstrap။                                                                  | မလိုအပ်ပါ                                                                             |
| `CLIENT_API` | မော်ဒယ်ဝန်ဆောင်မှုပေးသည့် endpoint များ — `/api/v1/*`၊ `/api/v1beta/*` နှင့် alias များဖြစ်သော `/v1/*`၊ `/v1beta/*`၊ `/chat/completions`၊ `/responses`၊ `/models`၊ `/codex/*`။ | သက်ရောက်နေသော `REQUIRE_API_KEY` feature flag ကို ဖွင့်ထားသည့်အခါ Bearer key လိုအပ်သည် |
| `MANAGEMENT` | Dashboard စာမျက်နှာများ၊ ဆက်တင်များ၊ provider များ၊ key များ၊ admin နှင့် စစ်ဆေးရှာဖွေရေး endpoint များ။                                                                       | Dashboard session သို့မဟုတ် `manage` scope ပါရှိသော Bearer                            |

## လုပ်ငန်းစဉ်

```
ဝင်လာသော request → src/proxy.ts
  → src/server/authz/pipeline.ts ရှိ runAuthzPipeline()
    1. ယုံကြည်ရသော internal header များကို ဖယ်ရှားပါ (x-omniroute-auth-*, x-omniroute-route-class)
    2. request id ကို ထုတ်လုပ်ပြီး classifyRoute() မှတစ်ဆင့် route ကို အမျိုးအစားခွဲပါ
    3. pathname == "/" ဖြစ်ပါက → /dashboard သို့ redirect လုပ်ပါ
    4. draining (graceful shutdown) ဖြစ်နေပြီး /api/* ဖြစ်ပါက → 503
    5. GET မဟုတ်သော /api/* ဖြစ်ပါက → checkBodySize() guard ဖြင့် စစ်ဆေးပါ
    6. OPTIONS ဖြစ်ပါက → CORS preflight 204
    7. options.enforce == false ဖြစ်ပါက → route-class header များနှင့်အတူ တိုက်ရိုက်ဆက်လက်ပေးပို့ပါ
    8. သို့မဟုတ်ပါက: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} ကို သတ်မှတ် → NextResponse.next()
       - reject → correlation_id ပါဝင်သည့် JSON error (dashboard စာမျက်နှာများ → 302 /login)
```

ယုံကြည်ရသော internal header များ (`src/server/authz/headers.ts` တွင် သတ်မှတ်ထားသည်) ကို အမျိုးအစားမခွဲခြားမီ **ဝင်လာသော request များမှ ဖယ်ရှားသည်** — client များသည် subject တစ်ခုအဖြစ် အယောင်ဆောင်ရန် `x-omniroute-auth-*` ကို ကြိုတင်ဖြည့်သွင်း၍ မရပါ။

### Policy စာချုပ်များ

Route အတန်းအစားတစ်ခုစီတွင် `src/server/authz/policies/` အောက်၌ policy တစ်ခုစီရှိသည်-

- **`publicPolicy`** (`policies/public.ts`) — `allow({ kind: "anonymous", id: "anonymous" })` ကို အမြဲပြန်ပေးသည်။
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ကို ထုတ်ယူပြီး `validateApiKey()` မှတစ်ဆင့် အတည်ပြုသည်။ သက်ရောက်နေသော `REQUIRE_API_KEY` feature flag ကို ပိတ်ထားသည့်အခါမှသာ anonymous အဖြစ် ဆက်လက်လုပ်ဆောင်သည်။ သက်ရောက်နေသော flag ကို `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) မှတစ်ဆင့် သတ်မှတ်သောကြောင့် Dashboard Feature Flags နှင့် environment variable များသည် `/api/v1/*`၊ `/api/v1beta/*` နှင့် alias များကို တစ်သမတ်တည်း ထိန်းချုပ်သည်။ resolver ချို့ယွင်းမှုများ ဖြစ်ပေါ်ပါက ပိတ်ဆို့ငြင်းပယ်သည်။ Client API route များတွင် dashboard-session request များကို ခွင့်ပြုသည် (`/api/v1/models` အပါအဝင်ဖြစ်ပြီး dashboard model catalog က အသုံးပြုသည်)။
- **`managementPolicy`** (`policies/management.ts`) — dashboard session၊ internal model-sync request များ (`/api/providers/[name]/(sync-models|models)` နှင့် ကိုက်ညီစစ်ဆေးသည်) ကို လက်ခံသည်၊ သို့မဟုတ် `isAuthRequired()` က false ပြန်ပေးပါက လုံးဝကျော်သွားသည်။ Bearer token ပါရှိသော်လည်း မမှန်ကန်ပါက 403 (`AUTH_001`) ကို ပြန်ပေးပြီး၊ မဟုတ်ပါက 401 ကို ပြန်ပေးသည်။ မည်သည့် auth လမ်းခွဲမတိုင်မီတွင်မဆို route-guard အဆင့်များ (LOCAL_ONLY / ALWAYS_PROTECTED) ကိုလည်း မဖြစ်မနေ သက်ရောက်စေသည် — [Route Guard အဆင့်များ](../security/ROUTE_GUARD_TIERS.md) ကို ကြည့်ပါ။ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ရှိ LOCAL_ONLY path များ (လက်ရှိတွင် `/api/mcp/`) ကို Bearer key ၌ `manage` scope ပါရှိပါက non-loopback မှ ဝင်ရောက်အသုံးပြုနိုင်သည်။ အခြား LOCAL_ONLY path အားလုံးသည် scope မည်သို့ပင်ဖြစ်စေ strict-loopback အဖြစ် ဆက်လက်ကန့်သတ်ထားသည်။

အောင်မြင်သော policy တစ်ခုသည် `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ပါဝင်သည့် `AuthSubject` ကို ပြန်ပေးသည်။ Downstream handler များသည် auth logic ကို ထပ်မံလုပ်ဆောင်မည့်အစား `src/server/authz/assertAuth.ts` ရှိ `assertAuth(request, "CLIENT_API")` မှတစ်ဆင့် ၎င်းကို ဖတ်ရှုနိုင်သည်။

## အများသုံး Route များစာရင်း

`src/shared/constants/publicApiRoutes.ts` သည် တိကျစွာ သတ်မှတ်ထားသော allowlist ဖြစ်သည်-

စာရင်းကို **ပုံသဏ္ဌာန်** အလိုက် ခွဲထားပြီး ထိုသို့ခွဲထားခြင်းသည် လုံခြုံရေးအတွက် အရေးကြီးသည် (GHSA-74g9-q8f6-793h)- prefix တစ်ခုကို `startsWith()` ဖြင့် တိုက်စစ်သည့်အတွက် ၎င်း၏ ရှေ့စာလုံးများ တူညီသော အနီးကပ် path အားလုံးနှင့်လည်း ကိုက်ညီသွားသည်။
`/api/usage/om-usage` ကို prefix အဖြစ် သတ်မှတ်ခဲ့ခြင်းကြောင့် `/api/usage/om-usage<anything>` ကို PUBLIC အဖြစ် သတ်မှတ်ခဲ့ပြီး Next က ၎င်းကို
`/api/usage/[connectionId]` သို့ ဖြေရှင်းပေးသည် — ယင်းသည် ကိုယ်ပိုင် auth မရှိသော handler တစ်ခုဖြစ်သည်။

```ts
// စစ်မှန်သော subtree များ။ Entry တိုင်းသည် "/" ဖြင့် အဆုံးသတ်ရမည် (unit test ဖြင့် အတည်ပြုထားသည်)။
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify တွင် CLIENT_API အဖြစ် သတ်မှတ်ပြီး "auth မလိုသော public" အဖြစ် မသတ်မှတ်ပါ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// တစ်ခုချင်း route များကို အတိအကျ တိုက်စစ်သည် (နောက်ဆုံးတွင် slash ပါသည်ဖြစ်စေ၊ မပါသည်ဖြစ်စေ)။
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

// CORS origin ကန့်သတ်ချက် လျှော့ပေးမှုကိုပါ ရရှိသော ဖတ်ရှုရန်သက်သက် တစ်ခုချင်း route များ။
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ကန့်သတ်ချက် လျှော့ပေးမှု မပါသော ဖတ်ရှုရန်သက်သက် တစ်ခုချင်း route။
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ဖတ်ရှုရန်သက်သက် route များသည် လုံခြုံသော method များအတွက်သာ public ဖြစ်သည်။ မှတ်ချက်- `classifyRoute()` သည် `/api/v1/*` နှင့် `/api/v1beta/*` တို့ကို PUBLIC fall-through မှ ချန်လှပ်ထားသည် — Bearer key မူဝါဒ ဆက်လက်သက်ရောက်စေရန် ၎င်းတို့ကို အမြဲတမ်း `CLIENT_API` အဖြစ် သတ်မှတ်သည်။

## Route အသစ်တစ်ခု ထည့်သွင်းခြင်း

### ပုံစံ 1 — အများသုံး client API endpoint (Bearer-auth)

`/api/v1/` နှင့် `/api/v1beta/` အောက်ရှိ route များကို `CLIENT_API` အဖြစ် အလိုအလျောက် သတ်မှတ်သည်။ Middleware က Bearer စစ်ဆေးမှုကို မဖြစ်မနေ လုပ်ဆောင်ပေးသောကြောင့် route handler များတွင် ထပ်မံလုပ်ဆောင်ရန် မလိုသော်လည်း အသုံးဝင်ပါက subject ကို ဖတ်နိုင်သည်။

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler ၏ လုပ်ဆောင်ချက်
}
```

### ပုံစံ 2 — စီမံခန့်ခွဲမှု endpoint (session သို့မဟုတ် Bearer + manage)

`src/lib/api/requireManagementAuth.ts` မှ `requireManagementAuth()` ကို အသုံးပြုပါ-

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler ၏ လုပ်ဆောင်ချက်
}
```

`requireManagementAuth()` သည် အောင်မြင်ပါက `null` ကို ပြန်ပေးပြီး မအောင်မြင်ပါက JSON error `Response` ကို ပြန်ပေးသည်-

- 401 `AUTH_001` "Authentication required" — credential လုံးဝမရှိပါ
- 403 — Bearer မမှန်ခြင်း **သို့မဟုတ်** Bearer ပါရှိသော်လည်း key တွင် `manage` / `admin` scope မရှိခြင်း

`hasManageScope(scopes)` သည် `"manage"` သို့မဟုတ် `"admin"` အတွက် true ပြန်ပေးသည်။

### ပုံစံ 3 — အများသုံး allowlist ထဲသို့ ထည့်သွင်းခြင်း

အဆင်ပြေမှုအလိုက် မဟုတ်ဘဲ ပုံသဏ္ဌာန်အလိုက် set ကို ရွေးချယ်ပါ။ Route တစ်ခုတည်းကို `PUBLIC_API_ROUTES_EXACT` ထဲတွင် ထည့်ပါ (သို့မဟုတ် GET-only ဖြစ်ပါက `PUBLIC_READONLY_CORS_API_ROUTES` ထဲတွင် ထည့်ပါ)။ စစ်မှန်သော subtree ကိုသာ `PUBLIC_API_ROUTE_PREFIXES` ထဲတွင် ထည့်ရမည်ဖြစ်ပြီး ၎င်းသည် **`/` ဖြင့် အဆုံးသတ်ရမည်**။ Route တစ်ခုတည်းကို prefix စာရင်းထဲတွင် ထည့်သွင်းခြင်းသည် ၎င်း၏ ရှေ့စာလုံးများ တူညီသော အနီးကပ် path အားလုံးကိုပါ public အဖြစ် ဖွင့်ပေးသွားမည် — နောင်တွင် ထည့်သွင်းမည့် dynamic-segment sibling များလည်း ပါဝင်သည် (GHSA-74g9-q8f6-793h)။ `tests/unit/public-api-routes.test.ts`၊ `tests/unit/authz/public-route-exact-match.test.ts` နှင့် `tests/unit/authz/classify.test.ts` ရှိ unit test များကို အပ်ဒိတ်လုပ်ပါ။

## Scope များ

API key များတွင် `scopes` array တစ်ခု ပါဝင်သည် (`api_keys.scopes` တွင် JSON အဖြစ် သိမ်းဆည်းထားပြီး `src/lib/db/apiKeys.ts` ကို ကြည့်ပါ)။

### စီမံခန့်ခွဲမှု scope

- `manage` / `admin` — Bearer အဖြစ် ပေးပို့သည့်အခါ key ကို စီမံခန့်ခွဲမှု API endpoint များသို့ ဝင်ရောက်ခွင့် ပေးသည်။

### MCP scope များ (`src/shared/constants/mcpScopes.ts`)

MCP tool တစ်ခုစီသည် `MCP_TOOL_SCOPES` မှတစ်ဆင့် သတ်မှတ်ထားသော scope များ လိုအပ်သည်။ စာရင်းအပြည့်အစုံ (`MCP_SCOPE_LIST`) မှာ-

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` ရှိ scope စည်းကမ်းသတ်မှတ်ချက်သည် `resolveCallerScopeContext()` က MCP auth အချက်အလက်၊ request metadata သို့မဟုတ် `OMNIROUTE_MCP_SCOPES` မှ scope များကို ဖြေရှင်းပြီးနောက် tool တစ်ခုစီ၏ scope စာရင်းကို `evaluateToolScopes()` သို့ ပေးပို့သည်။

## Auth လိုအပ်မှု အဖွင့်/အပိတ်

`src/shared/utils/apiAuth.ts` ရှိ `isAuthRequired()` သည် request တစ်ခုအတွက် **မည်သည့်** auth ကိုမဆို အတည်ပြုစစ်ဆေးမည်လားဆိုသည်ကို ဆုံးဖြတ်သည်-

- `settings.requireLogin === false` → auth ကို စနစ်တစ်ခုလုံးအတွက် ပိတ်ထားသည်။
- Password သတ်မှတ်မထားဘဲ `INITIAL_PASSWORD` env var လည်း မရှိပါက → bootstrap mode သည် onboarding wizard နှင့် loopback request များကို ခွင့်ပြုသော်လည်း ကွန်ရက်ပေါ် ဖွင့်လှစ်ထားသော request များအတွက် credential များ လိုအပ်နေဆဲဖြစ်သည်။
- DB error တစ်ခုခု ဖြစ်ပေါ်ပါက → ပုံမှန်အားဖြင့် လုံခြုံမှုရှိစေရန် ဝင်ရောက်ခွင့်ကို ပိတ်ထားသည် (secure-by-default)။

Client API key စည်းကမ်းသတ်မှတ်ချက်သည် `process.env.REQUIRE_API_KEY` ကို တိုက်ရိုက်ဖတ်ခြင်းမဟုတ်ဘဲ `src/shared/utils/featureFlags.ts` ရှိ `isRequireApiKeyEnabled()` ကို အသုံးပြုသည်။ ဤအချက်သည် deploy လုပ်ထားသော instance များအတွက် အရေးကြီးသည်။ Dashboard → Feature Flags တွင် `REQUIRE_API_KEY` ကို အဖွင့်/အပိတ် ပြောင်းလဲခြင်းက DB override တစ်ခုကို သိမ်းဆည်းပြီး ဤ helper ကို အတူတကွ အသုံးပြုသော `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` နှင့် အခြား client-API auth စစ်ဆေးမှုများအပေါ် ချက်ချင်း သက်ရောက်သည်။ Feature flag store ကို ဖတ်၍မရပါက client API auth သည် ဝင်ရောက်ခွင့်ကို ပိတ်ထားပြီး key တစ်ခု လိုအပ်သည်။

## လိုက်ဖက်ညီမှုကို ချိုးဖောက်သော ပြောင်းလဲမှု — v3.8.0

`/api/v1/agents/tasks/*` နှင့် `/api/resilience/model-cooldowns` endpoint များသည် ယခုအခါ **စီမံခန့်ခွဲမှု auth လိုအပ်သည်** (commit `588a0333`)။ ယခင်က `manage` scope မပါသော ပုံမှန် API key ကို ပေးပို့သည့် client များသည် `403` ကို လက်ခံရရှိမည်။ ပြောင်းရွှေ့ရန်- API Keys dashboard တွင် key အား `manage` scope ထည့်ပေးပါ သို့မဟုတ် login ဝင်ထားသော dashboard session ကို အသုံးပြုပါ။

## လုပ်ဆောင်ပုံ ပြောင်းလဲမှု — v3.8.2

`/api/mcp/*` (အဝေးထိန်း MCP server) သည် ပုံမှန်အားဖြင့် LOCAL_ONLY ဖြစ်နေဆဲဖြစ်သော်လည်း `Authorization: Bearer <api-key>` header တွင် `manage` scope ပါဝင်ပါက loopback မဟုတ်သော request များကို ယခု လက်ခံသည်။ ဤခြွင်းချက်ကို `src/server/authz/routeGuard.ts` ရှိ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` မှတစ်ဆင့် path တစ်ခုချင်းစီအလိုက် အတိအလင်း ထိန်းချုပ်ထားသည်။ တူညီသောအဆင့်ရှိ LOCAL_ONLY prefix `/api/cli-tools/runtime/*` သည် မည်သည့် subprocess ကိုမဆို စတင်နိုင်သောကြောင့် ရည်ရွယ်ချက်ရှိရှိ bypass လုပ်၍မရအောင် ထားရှိထားသည်။ Loopback မဟုတ်သော နေရာမှ `/api/mcp/*` သို့ ပေးပို့သည့် anonymous request များသည် `403 LOCAL_ONLY` ကို ဆက်လက် ပြန်ပေးမည်ဖြစ်သည် — LOCAL_ONLY path အသစ်တိုင်းအတွက် ပုံသေမူဝါဒမှာ strict-loopback ဖြစ်နေဆဲဖြစ်သည်။ [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ကို ကြည့်ပါ။

## စမ်းသပ်ခြင်း

- Unit test များ- `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`။
- Public allowlist- `tests/unit/public-api-routes.test.ts`။
- သီးသန့် စမ်းသပ်ရန်- `node --import tsx/esm --test tests/unit/authz/classify.test.ts`။

## အမှားရှာဖွေခြင်း

Pipeline သည် တုံ့ပြန်ချက်များတွင် အောက်ပါတို့ကို အမြဲတမ်း ထည့်သွင်းပေးသည်-

```
x-request-id:               <ဆက်စပ်မှု ID၊ အမှားတုံ့ပြန်ချက်များတွင် ပြန်လည်ဖော်ပြသည်>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

စစ်မှန်ကြောင်းအတည်ပြုထားသော တောင်းဆိုမှုများအတွက် upstream (handler ဘက်ရှိ) တောင်းဆိုမှု header များတွင် အောက်ပါတို့လည်း ပါဝင်သည်-

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<နောက်ဆုံး-4 လုံး> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ချန်လှပ်ထားနိုင်သည်)
x-omniroute-auth-scopes:    ကော်မာဖြင့် ခွဲထားသော စာရင်း
```

Handler များအတွင်း `assertAuth(req, expectedClass)` ကို အသုံးပြုပါ — middleware ကို ကျော်သွားခဲ့ပါက ၎င်းသည် `AUTHZ_NOT_INITIALIZED` ကုဒ်ပါဝင်သော `AuthzAssertionError` ကို throw လုပ်သည် (စမ်းသပ်မှုများတွင် configuration နောက်ပြန်ဆုတ်မှုများကို ဖမ်းမိရန် အသုံးဝင်သည်)။

## ထပ်မံကြည့်ရှုရန်

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoint တစ်ခုချင်းစီအလိုက် auth အမှတ်အသား
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth event များအတွက် audit log
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP scope အတည်ပြုကျင့်သုံးမှု အသေးစိတ်
- အရင်းအမြစ်- `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
