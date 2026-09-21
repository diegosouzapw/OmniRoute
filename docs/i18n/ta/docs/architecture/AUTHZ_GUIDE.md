# Authorization Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **உண்மையின் மூல ஆதாரம்:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-06-28 — v3.8.40

ஒவ்வொரு API கோரிக்கையையும் கட்டுப்படுத்தும், வழித்தடத்தை அறிந்த அங்கீகாரச் செயலாக்கத் தொடர் OmniRoute-இல் உள்ளது. வகைப்படுத்தல் **நிர்ணயிக்கப்பட்டது** மற்றும் **தவறினால் மூடப்படுவது** — வகைப்படுத்த முடியாத எதுவும் `MANAGEMENT` ஆகக் கருதப்பட்டு, அமர்வு அல்லது மேலாண்மைத் தரத்திலான டோக்கனைக் கோரும். வழித்தடங்களைப் பராமரிக்கும் அல்லது புதிய முனைப்புள்ளிகளை வடிவமைக்கும் பொறியாளர்களுக்காக இந்தப் பக்கம் மாதிரியை விளக்குகிறது.

![AuthZ செயலாக்கத் தொடர் (3 வழித்தட வகைகள் + கொள்கை மதிப்பீடு)](../diagrams/exported/authz-pipeline.svg)

> மூலம்: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## இரண்டு அங்கீகார முறைகள்

### 1. API விசை (Bearer)

OpenAI/Anthropic/Gemini-இணக்கமான கிளையன்ட் API-களுக்கும், விசையில் `manage` வரம்பு இருக்கும்போது சில மேலாண்மை வழித்தடங்களுக்கும் பயன்படுத்தப்படுகிறது.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-இல் உள்ள `isValidApiKey()` / `extractApiKey()` மூலம் சரிபார்க்கப்பட்டு, `src/shared/utils/apiAuth.ts` வழியாக மீண்டும் ஏற்றுமதி செய்யப்படுகிறது. சரிபார்ப்பி, `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` சூழல் மாறிகளையும் நிலையான நேரடி-கடத்தல் விசைகளாக ஏற்கிறது (சிக்கல் #1350).

### 2. கட்டுப்பாட்டுப் பலகை அமர்வு (auth_token குக்கீ)

கட்டுப்பாட்டுப் பலகைப் பக்கங்கள் மற்றும் நிர்வாகச் செயல்பாடுகளுக்கானது.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT சரிபார்ப்பில் வெற்றிபெற்று, **மேலும்** `authenticated: true`-ஐக் கொண்டிருக்கும்போது மட்டுமே ஒரு குக்கீ அமர்வாகும்
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). குக்கீயைப்
பயன்படுத்தும் ஒவ்வொரு கூறும் (வழித்தடக் காவலர், AuthZ செயலாக்கத் தொடர் புதுப்பிப்பு, WebSocket கைகுலுக்கல், நேரடி
சேவையகம், `/api/settings/require-login`, `/api/auth/status`) அந்த உதவிச் செயல்பாட்டின் வழியாகச் செல்கிறது.
`JWT_SECRET` கொண்டு கையொப்பமிடப்பட்ட பிற JWT-களும் உள்ளன — Cursor CLI நேரடி-கடத்தல்,
விசை வைத்திருப்போருக்காக `iss "omniroute" / aud "cursor-cli"` டோக்கன்களை உருவாக்குகிறது — அவை ஒருபோதும் அமர்வுகளாகாது
(#13298).

`src/shared/utils/apiAuth.ts`-இல் உள்ள `isDashboardSessionAuthenticated()` மூலம் சரிபார்க்கப்படுகிறது. JWT-யின் 30 நாள் ஆயுட்காலத்தில் 7 நாட்களுக்கும் குறைவாக மீதமிருக்கும்போது, செயலாக்கத் தொடர் அதைத் தானாகப் புதுப்பிக்கிறது.

சில மேலாண்மை வழித்தடங்கள் **இரண்டு** முறைகளில் ஏதேனும் ஒன்றை ஏற்கின்றன: குக்கீ அல்லது API விசையில் `manage` (அல்லது `admin`) வரம்பு இருக்கும்போது `Bearer <key>`. இதுவே v3.8-இல் சேர்க்கப்பட்ட “API அழைப்புகள் வழியாக உள்ளமைக்கக்கூடியது” என்ற பணிப்போக்கைச் சாத்தியமாக்குகிறது.

#### விருப்பத்தேர்வு OIDC உள்நுழைவு வாயில் (#6973)

இயல்புநிலை கடவுச்சொல் உள்நுழைவுடன் சேர்த்து, கட்டுப்பாட்டுப் பலகை நிர்வாகி உள்நுழைவு ஒரு **விருப்பத்தேர்வு** OIDC (OpenID Connect) ஓட்டத்தையும் ஆதரிக்கிறது — கடவுச்சொல் உள்நுழைவு ஒருபோதும் அகற்றப்படாது; அது கூடுதல் முறையால் மட்டுமே நிறைவு செய்யப்படுகிறது:

- `settings.oidcEnabled === true` ஆகவும், `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` அனைத்தும் உள்ளமைக்கப்பட்டிருக்கவும் வேண்டும் (அமைப்புகள் → அங்கீகாரம்);
  இல்லையெனில் இது முடக்கப்பட்டிருக்கும். இல்லையெனில் `GET /api/auth/oidc/login`, `400`-ஐத் திருப்பி அனுப்பும்.
- `GET /api/auth/oidc/login`, வழங்குநரின்
  `/.well-known/openid-configuration`-இலிருந்து `authorization_endpoint`-ஐக் கண்டறிந்து (`<issuer>/authorize`-ஐ
  மாற்றுவழியாகப் பயன்படுத்தும்), உள்வரும் கோரிக்கையிலிருந்து திருப்பிவிடும் URI-ஐ உருவாக்கி
  (`x-forwarded-proto`-வை உணர்ந்து), `httpOnly` `oidc_state` குக்கீயில் சேமிக்கப்பட்ட சீரற்ற `state` உடன்
  IdP-க்கு திருப்பிவிடுகிறது.
- `GET /api/auth/oidc/callback`, `state`-ஐச் சரிபார்த்து, அங்கீகாரக்
  குறியீட்டைப் பரிமாற்றி, வழங்குநரின் JWKS மூலம் ID டோக்கனின் கையொப்பத்தைச் சரிபார்க்கிறது
  (`jose`-இன் `createRemoteJWKSet`, ஒவ்வொரு JWKS URI-க்கும் தற்காலிகச் சேமிப்புடன்), மேலும் `issuer`/`audience`
  சோதனைகளையும் மேற்கொள்கிறது. விருப்பத்தேர்வான `oidcAllowedSubjects` அனுமதிப்பட்டியல், டோக்கனின்
  `sub` உரிமைக்கூறு அல்லது அதன் `email` உரிமைக்கூறுடன் பொருத்துகிறது — `email_verified === true` ஆக
  இருக்கும்போது மட்டுமே மின்னஞ்சல் உரிமைக்கூறு ஏற்கப்படும்; எனவே IdP-இல் சரிபார்க்கப்படாத மின்னஞ்சல் ஒருபோதும்
  வாயிலைக் கடக்க முடியாது.
- வெற்றிபெற்றால், கடவுச்சொல் உள்நுழைவு வழங்கும் **அதே** 30 நாள் `auth_token` JWT-ஐ இது
  உருவாக்குகிறது (`src/app/api/auth/login/route.ts`); எனவே கட்டுப்பாட்டுப் பலகை அமர்வுச்
  செயலாக்கத் தொடரின் மீதிப்பகுதி (தானியங்குப் புதுப்பிப்பு, குக்கீக் கொடிகள்) மாறாமல் இருக்கும் —
  குக்கீ எவ்வாறு உருவாக்கப்படுகிறது என்பதை மட்டுமே OIDC மாற்றுகிறது, அது வழங்கும் அனுமதிகளை அல்ல.

## வழித்தட வகுப்புகள்

`src/server/authz/types.ts` மூன்று வகுப்புகளை வரையறுக்கிறது; தீர்மானகரமாக வகைப்படுத்த முடியாத எந்த வழித்தடமும் இயல்பாக `MANAGEMENT` வகுப்புக்குத் திரும்பும்.

| வகுப்பு      | விளக்கம்                                                                                                                                                                        | அங்கீகாரம் தேவை                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `PUBLIC`     | வெளிப்படையாகப் பாதுகாப்பான வழித்தடங்கள் — உள்நுழைவு, வெளியேறுதல், நிலை, தொடக்கம், ஆரோக்கியச் சோதனை, அறிமுகத் தொடக்கச் செயல்முறை.                                                | எதுவுமில்லை                                                                       |
| `CLIENT_API` | மாதிரியை வழங்கும் முனைப்புள்ளிகள் — `/api/v1/*`, `/api/v1beta/*`, மேலும் `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` ஆகிய மாற்றுப் பெயர்கள். | நடைமுறையிலுள்ள `REQUIRE_API_KEY` அம்சக் கொடி இயக்கப்பட்டிருக்கும்போது Bearer விசை |
| `MANAGEMENT` | கட்டுப்பாட்டுப் பலகைப் பக்கங்கள், அமைப்புகள், வழங்குநர்கள், விசைகள், நிர்வாக மற்றும் கண்டறிதல் முனைப்புள்ளிகள்.                                                                 | கட்டுப்பாட்டுப் பலகை அமர்வு அல்லது `manage` வரம்புடன் கூடிய Bearer                |

## செயலாக்கத் தொடர்

```
உள்வரும் கோரிக்கை → src/proxy.ts
  → src/server/authz/pipeline.ts-இல் உள்ள runAuthzPipeline()
    1. நம்பகமான உள் தலைப்புகளை அகற்று (x-omniroute-auth-*, x-omniroute-route-class)
    2. கோரிக்கை ID-ஐ உருவாக்கி, classifyRoute() வழியாக வழித்தடத்தை வகைப்படுத்து
    3. pathname == "/" எனில் → /dashboard-க்குத் திருப்பிவிடு
    4. வடிகட்டிச் செயல்நிறுத்தம் (முறையான பணிநிறுத்தம்) நடைபெற்று, /api/* எனில் → 503
    5. GET அல்லாத /api/* எனில் → checkBodySize() பாதுகாப்பைச் சரிபார்
    6. OPTIONS எனில் → CORS முன்சோதனை 204
    7. options.enforce == false எனில் → route-class தலைப்புகளுடன் அப்படியே அனுப்பு
    8. இல்லையெனில்: POLICIES[routeClass].evaluate(ctx)
       - அனுமதி → x-omniroute-auth-{kind,id,label,scopes}-ஐப் பதித்து → NextResponse.next()
       - நிராகரிப்பு → correlation_id உடன் JSON பிழை (கட்டுப்பாட்டுப் பலகைப் பக்கங்கள் → 302 /login)
```

நம்பகமான உள் தலைப்புகள் (`src/server/authz/headers.ts`-இல் வரையறுக்கப்பட்டவை) வகைப்படுத்தலுக்கு முன் **உள்வரும் கோரிக்கைகளிலிருந்து அகற்றப்படுகின்றன** — ஒரு பொருளைப் போல ஆள்மாறாட்டம் செய்ய வாடிக்கையாளர்கள் `x-omniroute-auth-*` தலைப்புகளை முன்கூட்டியே நிரப்ப முடியாது.

### கொள்கை ஒப்பந்தங்கள்

ஒவ்வொரு வழித்தட வகுப்புக்கும் `src/server/authz/policies/`-இல் ஒரு கொள்கை உள்ளது:

- **`publicPolicy`** (`policies/public.ts`) — எப்போதும் `allow({ kind: "anonymous", id: "anonymous" })` என்பதைத் திருப்பித் தரும்.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer-ஐப் பிரித்தெடுத்து, `validateApiKey()` வழியாகச் சரிபார்க்கிறது. நடைமுறையிலுள்ள `REQUIRE_API_KEY` அம்சக் கொடி முடக்கப்பட்டிருக்கும்போது மட்டுமே பெயரிலாப் பயன்பாட்டிற்கு வழிவிடுகிறது. நடைமுறையிலுள்ள கொடி `isRequireApiKeyEnabled()` (`DB அம்சக் கொடி மேலெழுதல் > process.env.REQUIRE_API_KEY > இயல்புநிலை`) வழியாகத் தீர்மானிக்கப்படுவதால், கட்டுப்பாட்டுப் பலகையின் அம்சக் கொடிகளும் சூழல் மாறிகளும் `/api/v1/*`, `/api/v1beta/*` மற்றும் மாற்றுப் பெயர்களை ஒரே மாதிரியாகக் கட்டுப்படுத்துகின்றன; தீர்மானிப்பான் தோல்விகள் அணுகலை மறுக்கும். கிளையன்ட் API வழித்தடங்களில் கட்டுப்பாட்டுப் பலகை அமர்வுக் கோரிக்கைகளை அனுமதிக்கிறது (கட்டுப்பாட்டுப் பலகையின் மாதிரிப் பட்டியல் பயன்படுத்தும் `/api/v1/models` உட்பட).
- **`managementPolicy`** (`policies/management.ts`) — கட்டுப்பாட்டுப் பலகை அமர்வு, உள் மாதிரி-ஒத்திசைவுக் கோரிக்கைகள் (`/api/providers/[name]/(sync-models|models)` உடன் பொருத்தப்படுபவை) ஆகியவற்றை ஏற்கிறது அல்லது `isAuthRequired()` false என்பதைத் திருப்பினால் முழுமையாகத் தவிர்க்கிறது. Bearer டோக்கன் இருந்தும் செல்லுபடியாகாதபோது 403 (`AUTH_001`) என்பதையும், இல்லையெனில் 401 என்பதையும் திருப்பித் தருகிறது. எந்த அங்கீகாரக் கிளைக்கும் முன்பாக வழித்தடப் பாதுகாப்பு அடுக்குகளையும் (LOCAL_ONLY / ALWAYS_PROTECTED) செயல்படுத்துகிறது — [வழித்தடப் பாதுகாப்பு அடுக்குகள்](../security/ROUTE_GUARD_TIERS.md) என்பதைப் பார்க்கவும். `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-இல் உள்ள LOCAL_ONLY பாதைகளை (தற்போது: `/api/mcp/`) Bearer விசை `manage` வரம்பைக் கொண்டிருக்கும்போது loopback அல்லாத இடங்களிலிருந்து அணுகலாம்; மற்ற அனைத்து LOCAL_ONLY பாதைகளும் வரம்பைப் பொருட்படுத்தாமல் கண்டிப்பாக loopback-க்கு மட்டுமே கட்டுப்படுத்தப்பட்டிருக்கும்.

வெற்றிகரமான கொள்கை `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` கொண்ட `AuthSubject`-ஐத் திருப்பித் தருகிறது. கீழ்நிலை கையாளிகள் அங்கீகாரத் தர்க்கத்தை மீண்டும் இயக்குவதற்குப் பதிலாக, `src/server/authz/assertAuth.ts`-இல் உள்ள `assertAuth(request, "CLIENT_API")` வழியாக அதைப் படிக்கலாம்.

## பொது Routes பட்டியல்

`src/shared/constants/publicApiRoutes.ts` என்பது வெளிப்படையான அனுமதிப்பட்டியல்:

இந்தப் பட்டியல் **வடிவத்தின்** அடிப்படையில் பிரிக்கப்பட்டுள்ளது; மேலும் இந்தப் பிரிப்பு முக்கியமானது (GHSA-74g9-q8f6-793h): ஒரு prefix,
`startsWith()` மூலம் பொருத்தப்படுவதால், அதன் தொடக்க எழுத்துகளைப் பகிரும் அருகிலுள்ள ஒவ்வொரு path-உடனும் அது பொருந்தும்.
`/api/usage/om-usage`-ஐ prefix ஆகக் கொண்டது, `/api/usage/om-usage<anything>`-ஐ PUBLIC எனக் குறித்தது; மேலும் Next அதை
`/api/usage/[connectionId]` எனத் தீர்மானிக்கிறது — அதற்கென தனியாக auth இல்லாத ஒரு handler.

```ts
// உண்மையான subtrees. ஒவ்வொரு entry-யும் "/"-இல் முடிய வேண்டும் (unit test மூலம் உறுதிப்படுத்தப்படுகிறது).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-இல் CLIENT_API ஆகக் கருதப்படுகிறது; "no-auth public" ஆக அல்ல
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// தனிப்பட்ட routes, துல்லியமாகப் பொருத்தப்படுகின்றன (இறுதியில் slash இருந்தாலும் இல்லாவிட்டாலும்).
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

// CORS origin தளர்வையும் பெறும் read-only தனிப்பட்ட routes.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS தளர்வு இல்லாத read-only தனிப்பட்ட route.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

பாதுகாப்பான methods-க்கு **மட்டுமே** read-only routes பொது அணுகலுக்குரியவை. குறிப்பு: `classifyRoute()`, PUBLIC fall-through-இலிருந்து `/api/v1/*` மற்றும் `/api/v1beta/*` ஆகியவற்றை விலக்குகிறது — Bearer-key கொள்கை தொடர்ந்து பொருந்துவதற்காக அவை எப்போதும் `CLIENT_API` ஆகவே இருக்கும்.

## புதிய Route ஒன்றைச் சேர்த்தல்

### முறை 1 — பொது client API endpoint (Bearer-auth)

`/api/v1/` மற்றும் `/api/v1beta/`-இன் கீழுள்ள routes தானாகவே `CLIENT_API` என வகைப்படுத்தப்படுகின்றன. Middleware, Bearer சரிபார்ப்பை அமல்படுத்துகிறது; route handlers அதை மீண்டும் செய்ய வேண்டியதில்லை, ஆனால் பயனுள்ளதாக இருந்தால் subject-ஐப் படிக்கலாம்.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler தர்க்கம்
}
```

### முறை 2 — Management endpoint (session அல்லது Bearer + manage)

`src/lib/api/requireManagementAuth.ts`-இலிருந்து `requireManagementAuth()`-ஐப் பயன்படுத்தவும்:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler தர்க்கம்
}
```

வெற்றியின்போது `requireManagementAuth()` ஆனது `null`-ஐ வழங்கும்; இல்லையெனில் JSON error `Response`-ஐ வழங்கும்:

- 401 `AUTH_001` "அங்கீகாரம் தேவை" — எந்த credentials-உம் இல்லை
- 403 — தவறான Bearer **அல்லது** Bearer இருந்தும் key-இல் `manage` / `admin` scope இல்லை

`hasManageScope(scopes)` ஆனது `"manage"` அல்லது `"admin"`-க்கு true-ஐ வழங்கும்.

### முறை 3 — பொது allowlist-இல் சேர்த்தல்

வசதியின் அடிப்படையில் அல்லாமல், வடிவத்தின் அடிப்படையில் set-ஐத் தேர்ந்தெடுக்கவும். ஒரு route, `PUBLIC_API_ROUTES_EXACT`-இல் (அல்லது GET-only எனில் `PUBLIC_READONLY_CORS_API_ROUTES`-இல்) சேர்க்கப்பட வேண்டும்; உண்மையான subtree மட்டுமே `PUBLIC_API_ROUTE_PREFIXES`-இல் சேர்க்கப்பட வேண்டும், மேலும் அது **`/`-இல் முடிய வேண்டும்**. ஒரு தனிப்பட்ட route-ஐ prefix பட்டியலில் சேர்ப்பது, அதன் தொடக்க எழுத்துகளைப் பகிரும் அருகிலுள்ள ஒவ்வொரு path-ஐயும் பொது அணுகலுக்கு வெளியிடும் — பின்னர் சேர்க்கப்படும் dynamic-segment sibling routes உட்பட (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` மற்றும் `tests/unit/authz/classify.test.ts` ஆகியவற்றிலுள்ள unit tests-ஐப் புதுப்பிக்கவும்.

## ஸ்கோப்புகள்

API விசைகள் ஒரு `scopes` வரிசையைக் கொண்டுள்ளன (`api_keys.scopes`-இல் JSON ஆகச் சேமிக்கப்படுகிறது; `src/lib/db/apiKeys.ts`-ஐப் பார்க்கவும்).

### மேலாண்மை ஸ்கோப்

- `manage` / `admin` — Bearer ஆக அனுப்பப்படும்போது, மேலாண்மை API எண்ட்பாயிண்டுகளை அணுகுவதற்கான அனுமதியை விசைக்கு வழங்குகிறது.

### MCP ஸ்கோப்புகள் (`src/shared/constants/mcpScopes.ts`)

ஒவ்வொரு MCP கருவிக்கும் `MCP_TOOL_SCOPES` வழியாகக் குறிப்பிட்ட ஸ்கோப்புகள் தேவைப்படுகின்றன. முழுப் பட்டியல் (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`resolveCallerScopeContext()` ஆனது MCP அங்கீகாரத் தகவல், கோரிக்கை மெட்டாடேட்டா அல்லது `OMNIROUTE_MCP_SCOPES` ஆகியவற்றிலிருந்து ஸ்கோப்புகளைத் தீர்மானித்த பிறகு, `open-sse/mcp-server/server.ts`-இல் உள்ள ஸ்கோப் அமலாக்கம் ஒவ்வொரு கருவியின் ஸ்கோப் பட்டியலையும் `evaluateToolScopes()`-க்கு அனுப்புகிறது.

## அங்கீகாரம் தேவை நிலைமாற்றி

`src/shared/utils/apiAuth.ts`-இல் உள்ள `isAuthRequired()`, ஒரு கோரிக்கைக்கு **ஏதேனும்** அங்கீகாரம் அமலாக்கப்பட வேண்டுமா என்பதைத் தீர்மானிக்கிறது:

- `settings.requireLogin === false` → அங்கீகாரம் உலகளாவிய அளவில் முடக்கப்படும்.
- கடவுச்சொல் எதுவும் உள்ளமைக்கப்படவில்லை **மற்றும்** `INITIAL_PASSWORD` சூழல் மாறியும் இல்லை → தொடக்க அமைப்பு முறை, அறிமுக வழிகாட்டி மற்றும் லூப்பேக் கோரிக்கைகளை அனுமதிக்கிறது; ஆனால் வலையமைப்பில் வெளிப்படுத்தப்பட்ட கோரிக்கைகளுக்கு இன்னும் நற்சான்றுகள் தேவை.
- ஏதேனும் DB பிழை → பாதுகாப்பை முன்னிருப்பாகக் கொண்டு அணுகலை மறுக்கும்.

கிளையன்ட் API விசை அமலாக்கம், `process.env.REQUIRE_API_KEY`-ஐ நேரடியாகப் படிப்பதற்குப் பதிலாக, `src/shared/utils/featureFlags.ts`-இல் உள்ள `isRequireApiKeyEnabled()`-ஐப் பயன்படுத்துகிறது. பயன்படுத்துநிலையில் உள்ள நிறுவல்களுக்கு இது முக்கியமானது: Dashboard → Feature Flags-இல் `REQUIRE_API_KEY`-ஐ மாற்றுவது, DB மேலெழுதலைச் சேமித்து, `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` மற்றும் இந்த உதவிச் செயல்பாட்டைப் பகிரும் பிற கிளையன்ட்-API அங்கீகாரச் சரிபார்ப்புகளை உடனடியாகப் பாதிக்கிறது. அம்சக் கொடி சேமிப்பகத்தைப் படிக்க முடியாவிட்டால், கிளையன்ட் API அங்கீகாரம் பாதுகாப்பை முன்னிருப்பாகக் கொண்டு அணுகலை மறுத்து, ஒரு விசையைக் கட்டாயமாக்குகிறது.

## இணக்கமுறிவு மாற்றம் — v3.8.0

`/api/v1/agents/tasks/*` மற்றும் `/api/resilience/model-cooldowns` எண்ட்பாயிண்டுகளுக்கு **இப்போது மேலாண்மை அங்கீகாரம் தேவை** (`588a0333` commit). முன்பு `manage` ஸ்கோப் இல்லாத சாதாரண API விசையை அனுப்பிய கிளையன்ட்கள் `403` பதிலைப் பெறுகின்றனர். இடம்பெயர்வு: API Keys டாஷ்போர்டில் அந்த விசைக்கு `manage` ஸ்கோப்பை வழங்கவும் அல்லது உள்நுழைந்த டாஷ்போர்டு அமர்வைப் பயன்படுத்தவும்.

## நடத்தையில் மாற்றம் — v3.8.2

`/api/mcp/*` (தொலைநிலை MCP சேவையகம்) இன்னும் முன்னிருப்பாக LOCAL_ONLY ஆக உள்ளது; ஆனால் இப்போது `Authorization: Bearer <api-key>` தலைப்பு `manage` ஸ்கோப்பைக் கொண்டிருக்கும்போது, லூப்பேக் அல்லாத கோரிக்கைகளை ஏற்கிறது. `src/server/authz/routeGuard.ts`-இல் உள்ள `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` வழியாக, இந்த விதிவிலக்கு ஒவ்வொரு பாதைக்கும் வெளிப்படையாகக் கட்டுப்படுத்தப்படுகிறது; தொடர்புடைய LOCAL_ONLY முன்னொட்டான `/api/cli-tools/runtime/*`, எந்தவொரு துணைச் செயல்முறையையும் தொடங்கக்கூடும் என்பதால், திட்டமிட்டே புறக்கணிக்க முடியாததாக உள்ளது. லூப்பேக் அல்லாத இடங்களிலிருந்து `/api/mcp/*`-க்கு வரும் அநாமதேயக் கோரிக்கைகள் தொடர்ந்து `403 LOCAL_ONLY` பதிலைப் பெறும் — எந்தவொரு புதிய LOCAL_ONLY பாதைக்கும் முன்னிருப்பு, லூப்பேக்கை மட்டுமே கண்டிப்பாக அனுமதிப்பதாகவே இருக்கும். [பாதைக் காவலர் அடுக்குகள்](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)-ஐப் பார்க்கவும்.

## சோதனை

- அலகுச் சோதனைகள்: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- பொது அனுமதிப்பட்டியல்: `tests/unit/public-api-routes.test.ts`.
- குறிப்பிட்ட சோதனையை இயக்க: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## பிழைத்திருத்தம்

பைப்லைன் எப்போதும் பதில்களில் பின்வருவனவற்றைப் பதிக்கிறது:

```
x-request-id:               <தொடர்பு ஐடி, பிழை உள்ளடக்கங்களிலும் பிரதிபலிக்கப்படும்>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

அங்கீகரிக்கப்பட்ட கோரிக்கைகளுக்கு, அப்ஸ்ட்ரீம் (ஹேண்ட்லர்-பக்க) கோரிக்கை தலைப்புகளில் பின்வருவனவும் அடங்கும்:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<கடைசி-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (விருப்பத்தேர்வு)
x-omniroute-auth-scopes:    காற்புள்ளியால் பிரிக்கப்பட்ட பட்டியல்
```

ஹேண்ட்லர்களுக்குள் `assertAuth(req, expectedClass)`-ஐப் பயன்படுத்தவும் — மிடில்வேர் தவிர்க்கப்பட்டிருந்தால், இது `AUTHZ_NOT_INITIALIZED` குறியீட்டுடன் `AuthzAssertionError`-ஐ எறியும் (சோதனைகளில் உள்ளமைவு பின்னடைவுகளைக் கண்டறிய உதவும்).

## மேலும் காண்க

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ஒவ்வொரு எண்ட்பாயிண்டுக்குமான அங்கீகாரக் குறியீடு
- [COMPLIANCE.md](../security/COMPLIANCE.md) — அங்கீகார நிகழ்வுகளுக்கான தணிக்கைப் பதிவு
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP ஸ்கோப் அமலாக்க விவரங்கள்
- மூலம்: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
