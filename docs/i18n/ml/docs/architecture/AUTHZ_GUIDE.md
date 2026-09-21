# Authorization Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ആധികാരിക ഉറവിടം:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **അവസാനം പുതുക്കിയത്:** 2026-06-28 — v3.8.40

എല്ലാ API അഭ്യർത്ഥനകളെയും നിയന്ത്രിക്കുന്ന റൂട്ട്-അവബോധമുള്ള ഒരു ഓതറൈസേഷൻ പൈപ്പ്ലൈൻ OmniRoute-ലുണ്ട്. വർഗ്ഗീകരണം **നിർണ്ണയാത്മകവും** **പരാജയപ്പെടുമ്പോൾ അടച്ചിടുന്നതുമാണ്** — വർഗ്ഗീകരിക്കാൻ കഴിയാത്ത എന്തും `MANAGEMENT` ആയി പരിഗണിക്കപ്പെടുകയും ഒരു സെഷനോ മാനേജ്മെന്റ്-ഗ്രേഡ് ടോക്കണോ ആവശ്യപ്പെടുകയും ചെയ്യും. റൂട്ടുകൾ പരിപാലിക്കുന്നതോ പുതിയ എൻഡ്പോയിന്റുകൾ രൂപകൽപ്പന ചെയ്യുന്നതോ ആയ എൻജിനീയർമാർക്കായി ഈ പേജ് മോഡൽ വിശദീകരിക്കുന്നു.

![AuthZ പൈപ്പ്ലൈൻ (3 റൂട്ട് ക്ലാസുകൾ + പോളിസി വിലയിരുത്തൽ)](../diagrams/exported/authz-pipeline.svg)

> ഉറവിടം: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## രണ്ട് ഓത്ത് മോഡുകൾ

### 1. API കീ (Bearer)

OpenAI/Anthropic/Gemini-അനുയോജ്യമായ ക്ലയന്റ് API-കൾക്കും, കീയ്ക്ക് `manage` സ്കോപ്പ് ഉള്ളപ്പോൾ ഏതാനും മാനേജ്മെന്റ് റൂട്ടുകൾക്കും ഉപയോഗിക്കുന്നു.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-ലെ `isValidApiKey()` / `extractApiKey()` ഉപയോഗിച്ച് സാധൂകരിക്കുകയും `src/shared/utils/apiAuth.ts` വഴി വീണ്ടും എക്സ്പോർട്ട് ചെയ്യുകയും ചെയ്യുന്നു. സ്ഥിരമായ പാസ്ത്രൂ കീകളായി `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` എൻവയോൺമെന്റ് വേരിയബിളുകളും വാലിഡേറ്റർ സ്വീകരിക്കുന്നു (issue #1350).

### 2. ഡാഷ്ബോർഡ് സെഷൻ (auth_token കുക്കി)

ഡാഷ്ബോർഡ് പേജുകൾക്കും അഡ്മിൻ പ്രവർത്തനങ്ങൾക്കും.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT സാധൂകരിക്കപ്പെടുകയും **കൂടാതെ** അതിൽ `authenticated: true` ഉണ്ടായിരിക്കുകയും ചെയ്യുമ്പോൾ മാത്രമാണ് ഒരു കുക്കിയെ സെഷനായി കണക്കാക്കുന്നത്
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). കുക്കിയുടെ ഓരോ
ഉപഭോക്താവും (റൂട്ട് ഗാർഡ്, authz പൈപ്പ്ലൈൻ റിഫ്രഷ്, WebSocket ഹാൻഡ്ഷേക്ക്, ലൈവ്
സെർവർ, `/api/settings/require-login`, `/api/auth/status`) ആ ഹെൽപ്പർ വഴിയാണ് കടന്നുപോകുന്നത്.
`JWT_SECRET` ഉപയോഗിച്ച് സൈൻ ചെയ്ത മറ്റ് JWT-കളും നിലവിലുണ്ട് — കീ ഉടമകൾക്കായി Cursor CLI പാസ്ത്രൂ
`iss "omniroute" / aud "cursor-cli"` ടോക്കണുകൾ സൃഷ്ടിക്കുന്നു — അവ ഒരിക്കലും സെഷനുകളല്ല
(#13298).

`src/shared/utils/apiAuth.ts`-ലെ `isDashboardSessionAuthenticated()` ഉപയോഗിച്ചാണ് സാധൂകരിക്കുന്നത്. 30 ദിവസത്തെ കാലാവധിയിൽ 7 ദിവസത്തിൽ താഴെ മാത്രം ശേഷിക്കുമ്പോൾ പൈപ്പ്ലൈൻ JWT സ്വയമേവ പുതുക്കുന്നു.

ചില മാനേജ്മെന്റ് റൂട്ടുകൾ **ഏതെങ്കിലും ഒരു** മോഡ് സ്വീകരിക്കുന്നു: കുക്കി അല്ലെങ്കിൽ API കീയ്ക്ക് `manage` (അല്ലെങ്കിൽ `admin`) സ്കോപ്പ് ഉള്ളപ്പോൾ `Bearer <key>`. v3.8-ൽ ചേർത്ത "API കോളുകൾ വഴി കോൺഫിഗർ ചെയ്യാവുന്ന" വർക്ക്ഫ്ലോ സാധ്യമാക്കുന്നത് ഇതാണ്.

#### ഐച്ഛിക OIDC ലോഗിൻ ഗേറ്റ് (#6973)

ഡിഫോൾട്ട് പാസ്വേഡ് ലോഗിനോടൊപ്പം ഡാഷ്ബോർഡ് അഡ്മിൻ ലോഗിൻ ഒരു **ഓപ്റ്റ്-ഇൻ** OIDC (OpenID Connect) ഫ്ലോയും പിന്തുണയ്ക്കുന്നു — പാസ്വേഡ് ലോഗിൻ ഒരിക്കലും നീക്കം ചെയ്യപ്പെടുന്നില്ല, അതിനൊപ്പം ഇത് കൂട്ടിച്ചേർക്കുക മാത്രമാണ് ചെയ്യുന്നത്:

- `settings.oidcEnabled === true` ആയിരിക്കുകയും **കൂടാതെ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` എന്നിവയെല്ലാം കോൺഫിഗർ ചെയ്തിരിക്കുകയും ചെയ്തില്ലെങ്കിൽ ഇത് പ്രവർത്തനരഹിതമാണ് (Settings → Auth).
  അല്ലാത്തപക്ഷം `GET /api/auth/oidc/login`, `400` മടക്കിനൽകുന്നു.
- `GET /api/auth/oidc/login`, ഇഷ്യൂവറുടെ
  `/.well-known/openid-configuration`-ൽ നിന്ന് `authorization_endpoint` കണ്ടെത്തുന്നു (`<issuer>/authorize`-ലേക്ക്
  ഫാൾബാക്ക് ചെയ്യുന്നു), ഇൻകമിങ് അഭ്യർത്ഥനയിൽ നിന്ന് റീഡയറക്ട് URI നിർമ്മിക്കുന്നു
  (`x-forwarded-proto`-അവബോധത്തോടെ), തുടർന്ന് `httpOnly` `oidc_state` കുക്കിയിൽ സംഭരിച്ചിരിക്കുന്ന യാദൃച്ഛിക `state`
  സഹിതം IdP-യിലേക്ക് റീഡയറക്ട് ചെയ്യുന്നു.
- `GET /api/auth/oidc/callback`, `state` സാധൂകരിക്കുകയും ഓതറൈസേഷൻ
  കോഡ് കൈമാറ്റം ചെയ്യുകയും ഇഷ്യൂവറുടെ JWKS വഴി ID ടോക്കണിന്റെ സിഗ്നേച്ചർ പരിശോധിക്കുകയും ചെയ്യുന്നു
  (`jose`-ന്റെ `createRemoteJWKSet`, ഓരോ JWKS URI-ക്കും കാഷ് ചെയ്തത്), കൂടാതെ `issuer`/`audience`
  പരിശോധനകളും നടത്തുന്നു. ഐച്ഛികമായ `oidcAllowedSubjects` അലൗലിസ്റ്റ് ടോക്കണിന്റെ
  `sub` ക്ലെയിമുമായോ അതിന്റെ `email` ക്ലെയിമുമായോ പൊരുത്തപ്പെടുത്തുന്നു — `email_verified === true` ആയിരിക്കുമ്പോൾ
  മാത്രമേ ഇമെയിൽ ക്ലെയിം അംഗീകരിക്കൂ; അതിനാൽ IdP-യിലെ സ്ഥിരീകരിക്കാത്ത ഇമെയിലിന് ഒരിക്കലും
  ഗേറ്റ് കടക്കാൻ കഴിയില്ല.
- വിജയിച്ചാൽ, പാസ്വേഡ് ലോഗിൻ നൽകുന്ന **കൃത്യമായി അതേ** 30 ദിവസത്തെ `auth_token` JWT തന്നെയാണ് ഇത് സൃഷ്ടിക്കുന്നത്
  (`src/app/api/auth/login/route.ts`), അതിനാൽ ഡാഷ്ബോർഡ്
  സെഷൻ പൈപ്പ്ലൈനിലെ ശേഷിക്കുന്ന ഭാഗങ്ങൾ (ഓട്ടോ-റിഫ്രഷ്, കുക്കി ഫ്ലാഗുകൾ) മാറ്റമില്ലാതെ തുടരുന്നു —
  കുക്കി എങ്ങനെ സൃഷ്ടിക്കപ്പെടുന്നു എന്നത് മാത്രമാണ് OIDC മാറ്റിസ്ഥാപിക്കുന്നത്, അത് നൽകുന്ന അനുമതികളെയല്ല.

## റൂട്ട് ക്ലാസുകൾ

`src/server/authz/types.ts` മൂന്ന് ക്ലാസുകൾ നിർവചിക്കുന്നു; നിർണ്ണായകമായി വർഗ്ഗീകരിക്കാൻ കഴിയാത്ത ഏത് റൂട്ടും `MANAGEMENT`-ലേക്ക് ഫാൾബാക്ക് ചെയ്യും.

| ക്ലാസ്       | വിവരണം                                                                                                                                                                | ആവശ്യമായ ഓത്ത്                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `PUBLIC`     | വ്യക്തമായി സുരക്ഷിതമായ റൂട്ടുകൾ — ലോഗിൻ, ലോഗൗട്ട്, സ്റ്റാറ്റസ്, ഇനിഷ്യലൈസേഷൻ, ഹെൽത്ത്, ഓൺബോർഡിംഗ് ബൂട്ട്സ്ട്രാപ്പ്.                                                   | ഒന്നുമില്ല                                                                        |
| `CLIENT_API` | മോഡൽ നൽകുന്ന എൻഡ്പോയിന്റുകൾ — `/api/v1/*`, `/api/v1beta/*`, കൂടാതെ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` എന്നീ അപരനാമങ്ങളും. | പ്രാബല്യത്തിലുള്ള `REQUIRE_API_KEY` ഫീച്ചർ ഫ്ലാഗ് പ്രവർത്തനക്ഷമമാകുമ്പോൾ ബെയറർ കീ |
| `MANAGEMENT` | ഡാഷ്ബോർഡ് പേജുകൾ, ക്രമീകരണങ്ങൾ, പ്രൊവൈഡറുകൾ, കീകൾ, അഡ്മിൻ, ഡയഗ്നോസ്റ്റിക്സ് എൻഡ്പോയിന്റുകൾ.                                                                           | ഡാഷ്ബോർഡ് സെഷൻ അല്ലെങ്കിൽ `manage` സ്കോപ്പുള്ള ബെയറർ                              |

## പൈപ്പ്ലൈൻ

```
ഇൻകമിംഗ് അഭ്യർത്ഥന → src/proxy.ts
  → src/server/authz/pipeline.ts-ലെ runAuthzPipeline()
    1. വിശ്വസനീയമായ ആന്തരിക ഹെഡറുകൾ നീക്കംചെയ്യുക (x-omniroute-auth-*, x-omniroute-route-class)
    2. അഭ്യർത്ഥന ഐഡി സൃഷ്ടിച്ച് classifyRoute() വഴി റൂട്ട് വർഗ്ഗീകരിക്കുക
    3. pathname == "/" ആണെങ്കിൽ → /dashboard-ലേക്ക് റീഡയറക്ട് ചെയ്യുക
    4. ഡ്രെയിനിംഗ് അവസ്ഥയിലാണെങ്കിൽ (ക്രമാനുസൃത ഷട്ട്ഡൗൺ), കൂടാതെ /api/* ആണെങ്കിൽ → 503
    5. GET അല്ലാത്ത /api/* ആണെങ്കിൽ → checkBodySize() ഗാർഡ്
    6. OPTIONS ആണെങ്കിൽ → CORS പ്രീഫ്ലൈറ്റ് 204
    7. options.enforce == false ആണെങ്കിൽ → റൂട്ട്-ക്ലാസ് ഹെഡറുകളോടെ അതേപടി കടത്തിവിടുക
    8. അല്ലെങ്കിൽ: POLICIES[routeClass].evaluate(ctx)
       - അനുവദിക്കുക  → x-omniroute-auth-{kind,id,label,scopes} പതിപ്പിക്കുക → NextResponse.next()
       - നിരസിക്കുക → correlation_id സഹിതമുള്ള JSON പിശക് (ഡാഷ്ബോർഡ് പേജുകൾ → 302 /login)
```

വിശ്വസനീയമായ ആന്തരിക ഹെഡറുകൾ (`src/server/authz/headers.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു) വർഗ്ഗീകരണത്തിനു മുമ്പ് **ഇൻകമിംഗ് അഭ്യർത്ഥനകളിൽനിന്ന് നീക്കംചെയ്യപ്പെടുന്നു** — ഒരു സബ്ജക്റ്റായി ആൾമാറാട്ടം നടത്താൻ ക്ലയന്റുകൾക്ക് `x-omniroute-auth-*` മുൻകൂട്ടി പൂരിപ്പിക്കാൻ കഴിയില്ല.

### പോളിസി കരാറുകൾ

ഓരോ റൂട്ട് ക്ലാസിനും `src/server/authz/policies/`-ൽ ഒരു പോളിസിയുണ്ട്:

- **`publicPolicy`** (`policies/public.ts`) — എല്ലായ്പ്പോഴും `allow({ kind: "anonymous", id: "anonymous" })` മടക്കിനൽകുന്നു.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ബെയറർ എക്സ്ട്രാക്റ്റ് ചെയ്ത് `validateApiKey()` വഴി സാധൂകരിക്കുന്നു. പ്രാബല്യത്തിലുള്ള `REQUIRE_API_KEY` ഫീച്ചർ ഫ്ലാഗ് പ്രവർത്തനരഹിതമായിരിക്കുമ്പോൾ മാത്രമേ അനോണിമസ് ആക്സസിലേക്ക് ഫാൾ ത്രൂ ചെയ്യൂ. ഡാഷ്ബോർഡ് ഫീച്ചർ ഫ്ലാഗുകളും എൻവയോൺമെന്റ് വേരിയബിളുകളും `/api/v1/*`, `/api/v1beta/*`, അവയുടെ അപരനാമങ്ങൾ എന്നിവയെ ഒരേ രീതിയിൽ നിയന്ത്രിക്കുന്നതിനായി, പ്രാബല്യത്തിലുള്ള ഫ്ലാഗ് `isRequireApiKeyEnabled()` (`DB ഫീച്ചർ ഫ്ലാഗ് ഓവർറൈഡ് > process.env.REQUIRE_API_KEY > ഡിഫോൾട്ട്`) വഴിയാണ് പരിഹരിക്കുന്നത്; റിസോൾവർ പരാജയങ്ങൾ ആക്സസ് നിഷേധിക്കും. ക്ലയന്റ് API റൂട്ടുകളിൽ ഡാഷ്ബോർഡ്-സെഷൻ അഭ്യർത്ഥനകൾ അനുവദിക്കുന്നു (ഡാഷ്ബോർഡ് മോഡൽ കാറ്റലോഗ് ഉപയോഗിക്കുന്ന `/api/v1/models` ഉൾപ്പെടെ).
- **`managementPolicy`** (`policies/management.ts`) — ഡാഷ്ബോർഡ് സെഷൻ, ആന്തരിക മോഡൽ-സിങ്ക് അഭ്യർത്ഥനകൾ (`/api/providers/[name]/(sync-models|models)`-മായി പൊരുത്തപ്പെടുത്തുന്നവ) എന്നിവ സ്വീകരിക്കുന്നു; അല്ലെങ്കിൽ `isAuthRequired()` false മടക്കിനൽകുകയാണെങ്കിൽ പൂർണ്ണമായും ഒഴിവാക്കുന്നു. ബെയറർ ടോക്കൺ നൽകിയിട്ടുണ്ടെങ്കിലും അസാധുവാണെങ്കിൽ 403 (`AUTH_001`) മടക്കിനൽകുന്നു; അല്ലെങ്കിൽ 401. ഏതെങ്കിലും ഓത്ത് ബ്രാഞ്ചിനു മുമ്പായി റൂട്ട്-ഗാർഡ് ടയറുകളും (LOCAL_ONLY / ALWAYS_PROTECTED) നിർബന്ധമാക്കുന്നു — [റൂട്ട് ഗാർഡ് ടയറുകൾ](../security/ROUTE_GUARD_TIERS.md) കാണുക. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ലെ LOCAL_ONLY പാതകൾ (നിലവിൽ: `/api/mcp/`) ബെയറർ കീയിൽ `manage` സ്കോപ്പ് ഉണ്ടെങ്കിൽ നോൺ-ലൂപ്പ്ബാക്കിൽനിന്നും ആക്സസ് ചെയ്യാം; മറ്റ് എല്ലാ LOCAL_ONLY പാതകളും സ്കോപ്പ് പരിഗണിക്കാതെ സ്ട്രിക്റ്റ്-ലൂപ്പ്ബാക്കായി തുടരും.

വിജയകരമായ ഒരു പോളിസി `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ഉള്ള `AuthSubject` മടക്കിനൽകുന്നു. ഡൗൺസ്ട്രീം ഹാൻഡ്ലറുകൾക്ക് ഓത്ത് ലോജിക് വീണ്ടും പ്രവർത്തിപ്പിക്കുന്നതിനുപകരം `src/server/authz/assertAuth.ts`-ലെ `assertAuth(request, "CLIENT_API")` വഴി അത് വായിക്കാം.

## പൊതു റൂട്ടുകളുടെ പട്ടിക

`src/shared/constants/publicApiRoutes.ts` എന്നത് വ്യക്തമായ allowlist ആണ്:

പട്ടിക **ഘടന** അനുസരിച്ച് വിഭജിച്ചിരിക്കുന്നു, ഈ വിഭജനം നിർണായകമാണ് (GHSA-74g9-q8f6-793h): ഒരു prefix,
`startsWith()` ഉപയോഗിച്ചാണ് പൊരുത്തപ്പെടുത്തുന്നത്, അതിനാൽ അതേ ആരംഭ അക്ഷരങ്ങൾ പങ്കിടുന്ന സമീപത്തുള്ള എല്ലാ path-കളുമായും അത് പൊരുത്തപ്പെടും.
`/api/usage/om-usage` ഒരു prefix ആയി ഉപയോഗിച്ചപ്പോൾ `/api/usage/om-usage<anything>` PUBLIC ആയി അടയാളപ്പെടുത്തി, തുടർന്ന് Next അതിനെ
`/api/usage/[connectionId]` എന്നതിലേക്ക് resolve ചെയ്യുന്നു — സ്വന്തമായി auth ഇല്ലാത്ത ഒരു handler.

```ts
// യഥാർഥ subtree-കൾ. ഓരോ entry-യും "/"-ൽ അവസാനിക്കണം (unit test ഉപയോഗിച്ച് ഉറപ്പാക്കിയിരിക്കുന്നു).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ൽ CLIENT_API ആയി പരിഗണിക്കുന്നു, "no-auth public" ആയി അല്ല
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// കൃത്യമായി മാത്രം പൊരുത്തപ്പെടുത്തുന്ന ഒറ്റപ്പെട്ട route-കൾ (അവസാനത്തിൽ slash ഉണ്ടായാലും ഇല്ലെങ്കിലും).
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

// CORS origin ഇളവും ലഭിക്കുന്ന, read-only ആയ ഒറ്റപ്പെട്ട route-കൾ.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ഇളവ് ഇല്ലാത്ത read-only ഒറ്റപ്പെട്ട route.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

സുരക്ഷിതമായ method-ുകൾക്ക് **മാത്രമാണ്** read-only route-ുകൾ public ആകുന്നത്. ശ്രദ്ധിക്കുക: `classifyRoute()` `/api/v1/*`, `/api/v1beta/*` എന്നിവയെ PUBLIC fall-through-ൽ നിന്ന് ഒഴിവാക്കുന്നു — Bearer-key നയം തുടർന്നും ബാധകമാകുന്നതിനായി അവ എല്ലായ്പ്പോഴും `CLIENT_API` ആയിരിക്കും.

## പുതിയൊരു Route ചേർക്കൽ

### മാതൃക 1 — പൊതു client API endpoint (Bearer-auth)

`/api/v1/`, `/api/v1beta/` എന്നിവയ്ക്കു കീഴിലുള്ള route-ുകൾ സ്വയമേവ `CLIENT_API` ആയി വർഗ്ഗീകരിക്കപ്പെടുന്നു. Middleware Bearer പരിശോധന നടപ്പാക്കുന്നു; route handler-ുകൾ അത് വീണ്ടും ചെയ്യേണ്ടതില്ല, എന്നാൽ പ്രയോജനകരമാണെങ്കിൽ subject വായിക്കാം.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler-ന്റെ logic
}
```

### മാതൃക 2 — Management endpoint (session അല്ലെങ്കിൽ Bearer + manage)

`src/lib/api/requireManagementAuth.ts`-ൽ നിന്നുള്ള `requireManagementAuth()` ഉപയോഗിക്കുക:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler-ന്റെ logic
}
```

വിജയിക്കുമ്പോൾ `requireManagementAuth()` `null` തിരികെ നൽകും; അല്ലെങ്കിൽ ഒരു JSON error `Response` നൽകും:

- 401 `AUTH_001` "Authentication required" — credentials ഒന്നും നൽകിയിട്ടില്ല
- 403 — അസാധുവായ Bearer **അല്ലെങ്കിൽ** Bearer നൽകിയിട്ടുണ്ടെങ്കിലും key-ക്ക് `manage` / `admin` scope ഇല്ല

`"manage"` അല്ലെങ്കിൽ `"admin"` ലഭിക്കുമ്പോൾ `hasManageScope(scopes)` true തിരികെ നൽകും.

### മാതൃക 3 — പൊതു allowlist-ലേക്ക് ചേർക്കൽ

സൗകര്യം നോക്കിയല്ല, ഘടന അനുസരിച്ച് set തിരഞ്ഞെടുക്കുക. ഒറ്റ route `PUBLIC_API_ROUTES_EXACT`-ലാണ് ചേർക്കേണ്ടത് (അല്ലെങ്കിൽ GET-only ആണെങ്കിൽ `PUBLIC_READONLY_CORS_API_ROUTES`-ൽ); യഥാർഥ subtree മാത്രം `PUBLIC_API_ROUTE_PREFIXES`-ൽ ചേർക്കുക, അത് **`/`-ൽ അവസാനിക്കുകയും വേണം**. ഒരു ഒറ്റ route prefix പട്ടികയിൽ ചേർത്താൽ, അതേ ആരംഭ അക്ഷരങ്ങൾ പങ്കിടുന്ന സമീപത്തുള്ള എല്ലാ path-കളും public ആകും — പിന്നീട് ചേർക്കുന്ന dynamic-segment sibling-ുകൾ ഉൾപ്പെടെ (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, `tests/unit/authz/classify.test.ts` എന്നിവയിലെ unit test-ുകൾ പുതുക്കുക.

## സ്കോപ്പുകൾ

API കീകൾ ഒരു `scopes` അറേ വഹിക്കുന്നു (`api_keys.scopes`-ൽ JSON ആയി സംഭരിക്കുന്നു; `src/lib/db/apiKeys.ts` കാണുക).

### മാനേജ്മെന്റ് സ്കോപ്പ്

- `manage` / `admin` — Bearer ആയി അയയ്ക്കുമ്പോൾ മാനേജ്മെന്റ് API എൻഡ്പോയിന്റുകളിലേക്കുള്ള ആക്സസ് കീയ്ക്ക് നൽകുന്നു.

### MCP സ്കോപ്പുകൾ (`src/shared/constants/mcpScopes.ts`)

ഓരോ MCP ടൂളിനും `MCP_TOOL_SCOPES` വഴി നിർദ്ദിഷ്ട സ്കോപ്പുകൾ ആവശ്യമാണ്. പൂർണ്ണ പട്ടിക (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`resolveCallerScopeContext()` MCP ഓത്ത് വിവരങ്ങൾ, അഭ്യർത്ഥനാ മെറ്റാഡാറ്റ, അല്ലെങ്കിൽ `OMNIROUTE_MCP_SCOPES` എന്നിവയിൽനിന്ന് സ്കോപ്പുകൾ നിർണ്ണയിച്ചശേഷം, `open-sse/mcp-server/server.ts`-ലെ സ്കോപ്പ് നിർബന്ധമാക്കൽ ഓരോ ടൂളിന്റെയും സ്കോപ്പ് പട്ടിക `evaluateToolScopes()`-ലേക്ക് കൈമാറുന്നു.

## ഓത്ത് ആവശ്യകതാ ടോഗിൾ

ഒരു അഭ്യർത്ഥനയ്ക്കായി **ഏതെങ്കിലും** ഓത്ത് നിർബന്ധമാക്കണമോ എന്ന് `src/shared/utils/apiAuth.ts`-ലെ `isAuthRequired()` തീരുമാനിക്കുന്നു:

- `settings.requireLogin === false` → ഓത്ത് ആഗോളമായി പ്രവർത്തനരഹിതമാക്കുന്നു.
- പാസ്വേഡ് കോൺഫിഗർ ചെയ്തിട്ടില്ലാത്തതും `INITIAL_PASSWORD` എൻവ് വേരിയബിൾ ഇല്ലാത്തതുമായിരിക്കുമ്പോൾ → ബൂട്ട്സ്ട്രാപ്പ് മോഡ് ഓൺബോർഡിംഗ് വിസാർഡിനെയും ലൂപ്പ്ബാക്ക് അഭ്യർത്ഥനകളെയും അനുവദിക്കുന്നു, എന്നാൽ നെറ്റ്വർക്കിലേക്ക് തുറന്ന അഭ്യർത്ഥനകൾക്ക് തുടർന്നും ക്രെഡൻഷ്യലുകൾ ആവശ്യമാണ്.
- ഏതെങ്കിലും DB പിശക് → ആക്സസ് നിഷേധിക്കുന്നു (സുരക്ഷാ-ഡിഫോൾട്ട്).

ക്ലയന്റ് API കീ നിർബന്ധമാക്കൽ നേരിട്ടുള്ള `process.env.REQUIRE_API_KEY` റീഡിനു പകരം `src/shared/utils/featureFlags.ts`-ലെ `isRequireApiKeyEnabled()` ഉപയോഗിക്കുന്നു. ഡിപ്ലോയ് ചെയ്ത ഇൻസ്റ്റൻസുകൾക്ക് ഇത് പ്രധാനമാണ്: Dashboard → Feature Flags-ൽ `REQUIRE_API_KEY` ടോഗിൾ ചെയ്യുന്നത് ഒരു DB ഓവർറൈഡ് സംഭരിക്കുകയും, ഈ ഹെൽപ്പർ പങ്കിടുന്ന `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` എന്നിവയെയും മറ്റ് ക്ലയന്റ്-API ഓത്ത് പരിശോധനകളെയും ഉടനടി ബാധിക്കുകയും ചെയ്യുന്നു. ഫീച്ചർ ഫ്ലാഗ് സ്റ്റോർ വായിക്കാൻ കഴിയുന്നില്ലെങ്കിൽ, ക്ലയന്റ് API ഓത്ത് ആക്സസ് നിഷേധിക്കുകയും ഒരു കീ ആവശ്യപ്പെടുകയും ചെയ്യുന്നു.

## ബ്രേക്കിംഗ് മാറ്റം — v3.8.0

`/api/v1/agents/tasks/*`, `/api/resilience/model-cooldowns` എന്നീ എൻഡ്പോയിന്റുകൾക്ക് **ഇപ്പോൾ മാനേജ്മെന്റ് ഓത്ത് ആവശ്യമാണ്** (കമ്മിറ്റ് `588a0333`). മുമ്പ് `manage` സ്കോപ്പ് ഇല്ലാത്ത ഒരു സാധാരണ API കീ അയച്ചിരുന്ന ക്ലയന്റുകൾക്ക് `403` ലഭിക്കും. മൈഗ്രേഷൻ: API Keys ഡാഷ്ബോർഡിൽ കീയ്ക്ക് `manage` സ്കോപ്പ് നൽകുക, അല്ലെങ്കിൽ ലോഗിൻ ചെയ്ത ഡാഷ്ബോർഡ് സെഷൻ ഉപയോഗിക്കുക.

## പെരുമാറ്റ മാറ്റം — v3.8.2

`/api/mcp/*` (റിമോട്ട് MCP സെർവർ) ഇപ്പോഴും ഡിഫോൾട്ടായി LOCAL_ONLY ആണ്, എന്നാൽ `Authorization: Bearer <api-key>` ഹെഡറിൽ `manage` സ്കോപ്പ് ഉണ്ടെങ്കിൽ ഇപ്പോൾ ലൂപ്പ്ബാക്ക് അല്ലാത്ത അഭ്യർത്ഥനകളും സ്വീകരിക്കുന്നു. `src/server/authz/routeGuard.ts`-ലെ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` വഴി ഓരോ പാത്തിനും ഈ ഒഴിവാക്കൽ വ്യക്തമായി നിയന്ത്രിക്കുന്നു; അനുബന്ധ LOCAL_ONLY പ്രിഫിക്സ് ആയ `/api/cli-tools/runtime/*`-ന് മനഃപൂർവം ഈ ബൈപാസ് അനുവദിച്ചിട്ടില്ല, കാരണം അതിന് ഏതുതരം സബ്പ്രോസസും സ്പോൺ ചെയ്യാൻ കഴിയും. ലൂപ്പ്ബാക്ക് അല്ലാത്ത ഇടങ്ങളിൽനിന്ന് `/api/mcp/*`-ലേക്കുള്ള അജ്ഞാത അഭ്യർത്ഥനകൾ തുടർന്നും `403 LOCAL_ONLY` നൽകും — ഏതൊരു പുതിയ LOCAL_ONLY പാത്തിനുമുള്ള ഡിഫോൾട്ട് കർശനമായ ലൂപ്പ്ബാക്ക് മാത്രമായി തുടരും. [റൂട്ട് ഗാർഡ് ടിയറുകൾ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) കാണുക.

## പരിശോധന

- യൂണിറ്റ് ടെസ്റ്റുകൾ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- പൊതു അലൗലിസ്റ്റ്: `tests/unit/public-api-routes.test.ts`.
- കേന്ദ്രീകൃതമായി പ്രവർത്തിപ്പിക്കുക: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## ഡീബഗ്ഗിംഗ്

പൈപ്പ്ലൈൻ എല്ലായ്പ്പോഴും പ്രതികരണങ്ങളിൽ ഇനിപ്പറയുന്നവ ചേർക്കുന്നു:

```
x-request-id:               <കോറിലേഷൻ ഐഡി, പിശക് ബോഡികളിൽ പ്രതിധ്വനിക്കുന്നു>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ഓതന്റിക്കേറ്റ് ചെയ്ത അഭ്യർത്ഥനകൾക്കായി, അപ്സ്ട്രീം (ഹാൻഡ്ലർ-സൈഡ്) അഭ്യർത്ഥനാ ഹെഡറുകളിൽ ഇനിപ്പറയുന്നവയും ഉൾപ്പെടുന്നു:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<അവസാന-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ഐച്ഛികം)
x-omniroute-auth-scopes:    കോമ ഉപയോഗിച്ച് വേർതിരിച്ച പട്ടിക
```

ഹാൻഡ്ലറുകൾക്കുള്ളിൽ `assertAuth(req, expectedClass)` ഉപയോഗിക്കുക — മിഡിൽവെയർ മറികടന്നിട്ടുണ്ടെങ്കിൽ, ഇത് `AUTHZ_NOT_INITIALIZED` കോഡോടുകൂടിയ `AuthzAssertionError` എറിയുന്നു (ടെസ്റ്റുകളിൽ കോൺഫിഗറേഷൻ റിഗ്രഷനുകൾ കണ്ടെത്താൻ സഹായകരമാണ്).

## ഇതും കാണുക

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ഓരോ എൻഡ്പോയിന്റിനുമുള്ള ഓത്ത് മാർക്കർ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ഓത്ത് ഇവന്റുകൾക്കുള്ള ഓഡിറ്റ് ലോഗ്
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP സ്കോപ്പ് എൻഫോഴ്സ്മെന്റ് വിശദാംശങ്ങൾ
- ഉറവിടം: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
