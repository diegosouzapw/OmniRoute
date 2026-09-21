# Authorization Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ჭეშმარიტების წყარო:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ბოლო განახლება:** 2026-06-28 — v3.8.40

OmniRoute-ს აქვს მარშრუტის გათვალისწინებით მოქმედი ავტორიზაციის კონვეიერი, რომელიც ყველა API მოთხოვნას აკონტროლებს. კლასიფიკაცია **დეტერმინისტული** და **უარისკენ ნაგულისხმევი**ა — ყველაფერი, რისი კლასიფიცირებაც ვერ ხერხდება, `MANAGEMENT` კატეგორიაში ხვდება და სესიას ან მართვის დონის ტოკენს მოითხოვს. ამ გვერდზე აღწერილია მოდელი ინჟინრებისთვის, რომლებიც მარშრუტებს უვლიან ან ახალ საბოლოო წერტილებს აპროექტებენ.

![AuthZ კონვეიერი (მარშრუტების 3 კლასი + პოლიტიკის შეფასება)](../diagrams/exported/authz-pipeline.svg)

> წყარო: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ავთენტიფიკაციის ორი რეჟიმი

### 1. API გასაღები (Bearer)

გამოიყენება OpenAI/Anthropic/Gemini-თან თავსებადი კლიენტის API-ებისთვის და რამდენიმე მართვის მარშრუტისთვის, როდესაც გასაღებს `manage` წვდომის არე აქვს.

```
Authorization: Bearer <api-key>
```

მოწმდება `isValidApiKey()` / `extractApiKey()` ფუნქციებით `src/sse/services/auth.ts`-ში და ხელახლა ექსპორტირდება `src/shared/utils/apiAuth.ts`-ის მეშვეობით. ვალიდატორი ასევე იღებს `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` გარემოს ცვლადებს, როგორც მუდმივ გამტარ გასაღებებს (საკითხი #1350).

### 2. მართვის პანელის სესია (auth_token cookie)

მართვის პანელის გვერდებისა და ადმინისტრაციული ოპერაციებისთვის.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

cookie სესიად მხოლოდ მაშინ ითვლება, როდესაც JWT წარმატებით მოწმდება **და** შეიცავს `authenticated: true`-ს
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). cookie-ს ყველა
მომხმარებელი (მარშრუტის დამცველი, authz კონვეიერის განახლება, WebSocket ხელის ჩამორთმევა, პირდაპირი
სერვერი, `/api/settings/require-login`, `/api/auth/status`) ამ დამხმარე ფუნქციას იყენებს.
არსებობს `JWT_SECRET`-ით ხელმოწერილი სხვა JWT-ებიც — Cursor CLI-ის გამტარი რეჟიმი გასაღების
მფლობელებისთვის ქმნის `iss "omniroute" / aud "cursor-cli"` ტოკენებს — და ისინი არასოდეს ითვლება სესიებად
(#13298).

მოწმდება `isDashboardSessionAuthenticated()` ფუნქციით `src/shared/utils/apiAuth.ts`-ში. კონვეიერი ავტომატურად განაახლებს JWT-ს, როდესაც მისი 30-დღიანი მოქმედების ვადის ამოწურვამდე 7 დღეზე ნაკლები რჩება.

ზოგიერთი მართვის მარშრუტი იღებს **ნებისმიერ** რეჟიმს: cookie-ს ან `Bearer <key>`-ს, როდესაც API გასაღებს აქვს `manage` (ან `admin`) წვდომის არე. სწორედ ეს იძლევა v3.8-ში დამატებული „API გამოძახებების მეშვეობით კონფიგურირებადი“ სამუშაო პროცესის გამოყენების შესაძლებლობას.

#### არასავალდებულო OIDC შესვლის ბარიერი (#6973)

მართვის პანელის ადმინისტრატორის შესვლა ნაგულისხმევ პაროლით შესვლასთან ერთად ასევე მხარს უჭერს **სურვილისამებრ ჩასართავ** OIDC (OpenID Connect) პროცესს — პაროლით შესვლა არასოდეს იშლება, მხოლოდ
ივსება დამატებითი მეთოდით:

- გამორთულია, თუ `settings.oidcEnabled === true` **და** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ყველა კონფიგურირებული არ არის (პარამეტრები → ავთენტიფიკაცია).
  წინააღმდეგ შემთხვევაში `GET /api/auth/oidc/login` აბრუნებს `400`-ს.
- `GET /api/auth/oidc/login` გამომცემლის
  `/.well-known/openid-configuration`-იდან აღმოაჩენს `authorization_endpoint`-ს (სარეზერვო ვარიანტად იყენებს
  `<issuer>/authorize`-ს), შემომავალი მოთხოვნის საფუძველზე აგებს გადამისამართების URI-ს
  (`x-forwarded-proto`-ს გათვალისწინებით) და IdP-ზე გადაამისამართებს შემთხვევით `state`-თან ერთად,
  რომელიც `httpOnly` `oidc_state` cookie-ში ინახება.
- `GET /api/auth/oidc/callback` ამოწმებს `state`-ს, ავტორიზაციის
  კოდს ცვლის და გამომცემლის JWKS-ის მეშვეობით ამოწმებს ID ტოკენის ხელმოწერას
  (`jose`-ის `createRemoteJWKSet`, დაკეშილი თითოეული JWKS URI-სთვის), `issuer`/`audience`
  შემოწმებებით. არასავალდებულო `oidcAllowedSubjects` ნებადართული მნიშვნელობების სია შესაბამისობას ამოწმებს ტოკენის
  `sub` მოთხოვნასთან ან მის `email` მოთხოვნასთან — ელფოსტის მოთხოვნა მხოლოდ მაშინ მიიღება, როდესაც
  `email_verified === true`, ამიტომ IdP-ზე დაუდასტურებელი ელფოსტა ბარიერს ვერასოდეს გაივლის.
- წარმატების შემთხვევაში იქმნება **ზუსტად იგივე** 30-დღიანი `auth_token` JWT, რომელსაც პაროლით
  შესვლის პროცესი გასცემს (`src/app/api/auth/login/route.ts`), ამიტომ მართვის პანელის
  სესიის დანარჩენი კონვეიერი (ავტომატური განახლება, cookie-ს ალმები) უცვლელი რჩება —
  OIDC მხოლოდ cookie-ს შექმნის მეთოდს ცვლის და არა მის მიერ მინიჭებულ უფლებებს.

## მარშრუტების კლასები

`src/server/authz/types.ts` განსაზღვრავს სამ კლასს; ნებისმიერი მარშრუტი, რომლის ცალსახად კლასიფიცირებაც შეუძლებელია, ნაგულისხმევად მიეკუთვნება `MANAGEMENT`-ს.

| კლასი        | აღწერა                                                                                                                                                                      | საჭიროა ავთენტიფიკაცია                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | აშკარად უსაფრთხო მარშრუტები — სისტემაში შესვლა, სისტემიდან გამოსვლა, სტატუსი, ინიციალიზაცია, ჯანმრთელობის შემოწმება, პირველადი კონფიგურაცია.                                | არა                                                                          |
| `CLIENT_API` | მოდელის მომსახურების საბოლოო წერტილები — `/api/v1/*`, `/api/v1beta/*`, აგრეთვე ფსევდონიმები `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer გასაღები, როდესაც ეფექტური `REQUIRE_API_KEY` ფუნქციური ალამი ჩართულია |
| `MANAGEMENT` | მართვის პანელის გვერდები, პარამეტრები, პროვაიდერები, გასაღებები, ადმინისტრირებისა და დიაგნოსტიკის საბოლოო წერტილები.                                                        | მართვის პანელის სესია ან Bearer `manage` წვდომის სფეროთი                     |

## დამუშავების კონვეიერი

```
შემომავალი მოთხოვნა → src/proxy.ts
  → runAuthzPipeline() ფაილში src/server/authz/pipeline.ts
    1. სანდო შიდა სათაურების მოცილება (x-omniroute-auth-*, x-omniroute-route-class)
    2. მოთხოვნის იდენტიფიკატორის გენერირება, მარშრუტის კლასიფიცირება classifyRoute()-ის მეშვეობით
    3. თუ pathname == "/" → გადამისამართება /dashboard-ზე
    4. თუ მიმდინარეობს მოთხოვნების ამოწურვა (კორექტული გამორთვა) და /api/* → 503
    5. თუ მოთხოვნა არა-GET ტიპისაა და მიმართულია /api/*-ზე → checkBodySize() დამცავი შემოწმება
    6. თუ OPTIONS → CORS-ის წინასწარი მოთხოვნის პასუხი 204
    7. თუ options.enforce == false → უცვლელად გატარება მარშრუტის კლასის სათაურებით
    8. წინააღმდეგ შემთხვევაში: POLICIES[routeClass].evaluate(ctx)
       - დაშვება  → x-omniroute-auth-{kind,id,label,scopes}-ის მითითება → NextResponse.next()
       - უარყოფა → JSON შეცდომა correlation_id-ით (მართვის პანელის გვერდები → 302 /login)
```

სანდო შიდა სათაურები (განსაზღვრულია `src/server/authz/headers.ts`-ში) კლასიფიკაციამდე **იშლება შემომავალი მოთხოვნებიდან** — კლიენტებს არ შეუძლიათ `x-omniroute-auth-*`-ის წინასწარ შევსება სუბიექტის გასასაღებლად.

### პოლიტიკების კონტრაქტები

მარშრუტის თითოეულ კლასს აქვს პოლიტიკა `src/server/authz/policies/`-ში:

- **`publicPolicy`** (`policies/public.ts`) — ყოველთვის აბრუნებს `allow({ kind: "anonymous", id: "anonymous" })`-ს.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ამოიღებს Bearer-ს და ამოწმებს `validateApiKey()`-ის მეშვეობით. ანონიმურ წვდომაზე გადადის მხოლოდ მაშინ, როდესაც ეფექტური `REQUIRE_API_KEY` ფუნქციური ალამი გამორთულია. ეფექტური ალამი განისაზღვრება `isRequireApiKeyEnabled()`-ის მეშვეობით (`DB ფუნქციური ალმის უპირატესი მნიშვნელობა > process.env.REQUIRE_API_KEY > ნაგულისხმევი მნიშვნელობა`), რათა მართვის პანელის ფუნქციურმა ალმებმა და გარემოს ცვლადებმა თანმიმდევრულად მართონ `/api/v1/*`, `/api/v1beta/*` და მათი ფსევდონიმები; გამხსნელის შეცდომის შემთხვევაში წვდომა იკეტება. კლიენტის API მარშრუტებზე უშვებს მართვის პანელის სესიის მქონე მოთხოვნებსაც (მათ შორის `/api/v1/models`, რომელსაც მართვის პანელის მოდელების კატალოგი იყენებს).
- **`managementPolicy`** (`policies/management.ts`) — იღებს მართვის პანელის სესიას, მოდელების სინქრონიზაციის შიდა მოთხოვნებს (რომლებიც ემთხვევა `/api/providers/[name]/(sync-models|models)`-ს), ან შემოწმებას მთლიანად გამოტოვებს, თუ `isAuthRequired()` დააბრუნებს false-ს. აბრუნებს 403-ს (`AUTH_001`), როდესაც Bearer ტოკენი წარმოდგენილია, მაგრამ არავალიდურია; სხვა შემთხვევაში — 401-ს. ასევე, ავთენტიფიკაციის ნებისმიერ განშტოებამდე უზრუნველყოფს მარშრუტის დამცავი დონეების (LOCAL_ONLY / ALWAYS_PROTECTED) დაცვას — იხილეთ [მარშრუტის დამცავი დონეები](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ში მოქცეულ LOCAL_ONLY ბილიკებზე (ამჟამად: `/api/mcp/`) წვდომა შესაძლებელია არა-loopback მისამართებიდანაც, როდესაც Bearer გასაღებს აქვს `manage` წვდომის სფერო; ყველა სხვა LOCAL_ONLY ბილიკი წვდომის სფეროს მიუხედავად მხოლოდ loopback-ზე რჩება მკაცრად შეზღუდული.

წარმატებული პოლიტიკა აბრუნებს `AuthSubject`-ს, სადაც `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. შემდგომ დამმუშავებლებს მისი წაკითხვა შეუძლიათ `assertAuth(request, "CLIENT_API")`-ის მეშვეობით `src/server/authz/assertAuth.ts`-ში, ავთენტიფიკაციის ლოგიკის ხელახლა შესრულების ნაცვლად.

## საჯარო მარშრუტების სია

`src/shared/constants/publicApiRoutes.ts` არის მკაფიოდ განსაზღვრული ნებადართული მარშრუტების სია:

სია დაყოფილია **ფორმის** მიხედვით და ამ დაყოფას კრიტიკული მნიშვნელობა აქვს (GHSA-74g9-q8f6-793h): პრეფიქსი მოწმდება `startsWith()`-ით, ამიტომ ის ასევე ემთხვევა ყველა მომიჯნავე ბილიკს, რომელსაც იგივე საწყისი სიმბოლოები აქვს.
`/api/usage/om-usage`-ის პრეფიქსად მითითებამ `/api/usage/om-usage<anything>` საჯარო გახადა, ხოლო Next ამას მიმართავს
`/api/usage/[connectionId]`-ზე — დამმუშავებელზე, რომელსაც საკუთარი ავტორიზაციის შემოწმება არ აქვს.

```ts
// ნამდვილი ქვეხეები. ყოველი ჩანაწერი აუცილებლად უნდა მთავრდებოდეს სიმბოლოთი "/" (ამას მოდულური ტესტი ამოწმებს).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ში განიხილება როგორც CLIENT_API და არა როგორც „ავთენტიფიკაციის გარეშე საჯარო“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ცალკეული მარშრუტები, რომლებიც ზუსტად უნდა დაემთხვეს (ბოლო დახრილი ხაზით ან მის გარეშე).
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

// მხოლოდ წასაკითხი ცალკეული მარშრუტები, რომლებზეც ასევე ვრცელდება CORS origin-ის შემსუბუქება.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// მხოლოდ წასაკითხი ცალკეული მარშრუტი CORS-ის შემსუბუქების გარეშე.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

მხოლოდ წასაკითხი მარშრუტები საჯაროა **მხოლოდ** უსაფრთხო მეთოდებისთვის. შენიშვნა: `classifyRoute()` გამორიცხავს `/api/v1/*`-სა და `/api/v1beta/*`-ს PUBLIC-ში ნაგულისხმევად მოხვედრისგან — ისინი ყოველთვის `CLIENT_API`-ად კლასიფიცირდება, რათა Bearer-გასაღების პოლიტიკა კვლავ მოქმედებდეს.

## ახალი მარშრუტის დამატება

### ნიმუში 1 — საჯარო კლიენტის API-ის საბოლოო წერტილი (Bearer-ავთენტიფიკაცია)

`/api/v1/`-ისა და `/api/v1beta/`-ის ქვეშ არსებული მარშრუტები ავტომატურად კლასიფიცირდება როგორც `CLIENT_API`. შუამავალი პროგრამული უზრუნველყოფა Bearer-ის შემოწმებას უზრუნველყოფს; მარშრუტის დამმუშავებლებს მისი ხელახლა შესრულება არ სჭირდებათ, თუმცა საჭიროების შემთხვევაში შეუძლიათ სუბიექტის წაკითხვა.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... დამმუშავებლის ლოგიკა
}
```

### ნიმუში 2 — მართვის საბოლოო წერტილი (სესია ან Bearer + manage)

გამოიყენეთ `requireManagementAuth()` ფაილიდან `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... დამმუშავებლის ლოგიკა
}
```

წარმატების შემთხვევაში `requireManagementAuth()` აბრუნებს `null`-ს, ხოლო შეცდომისას — JSON შეცდომის `Response`-ს:

- 401 `AUTH_001` "ავთენტიფიკაცია აუცილებელია" — ავტორიზაციის მონაცემები საერთოდ არ არის წარმოდგენილი
- 403 — არასწორი Bearer **ან** Bearer წარმოდგენილია, მაგრამ გასაღებს `manage` / `admin` მოქმედების სფერო არ აქვს

`hasManageScope(scopes)` აბრუნებს true-ს `"manage"`-ის ან `"admin"`-ის შემთხვევაში.

### ნიმუში 3 — საჯარო ნებადართულ სიაში დამატება

სიმრავლე აირჩიეთ ფორმის მიხედვით და არა მოხერხებულობისთვის. ერთი მარშრუტი უნდა მოთავსდეს `PUBLIC_API_ROUTES_EXACT`-ში (ან მხოლოდ GET-ისთვის — `PUBLIC_READONLY_CORS_API_ROUTES`-ში); მხოლოდ ნამდვილი ქვეხე უნდა მოთავსდეს `PUBLIC_API_ROUTE_PREFIXES`-ში და ის **აუცილებლად უნდა მთავრდებოდეს `/`-ით**. ერთი მარშრუტის პრეფიქსების სიაში მოთავსება ასევე საჯაროს ხდის ყველა მომიჯნავე ბილიკს, რომელსაც იგივე საწყისი სიმბოლოები აქვს — მათ შორის მოგვიანებით დამატებულ დინამიკური სეგმენტების მქონე მეზობელ მარშრუტებსაც (GHSA-74g9-q8f6-793h). განაახლეთ მოდულური ტესტები ფაილებში `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` და `tests/unit/authz/classify.test.ts`.

## მოქმედების არეები

API გასაღებები შეიცავს `scopes` მასივს (ინახება JSON-ის სახით `api_keys.scopes`-ში, იხილეთ `src/lib/db/apiKeys.ts`).

### მართვის მოქმედების არე

- `manage` / `admin` — Bearer-ის სახით გაგზავნისას გასაღებს მართვის API-ის საბოლოო წერტილებზე წვდომას ანიჭებს.

### MCP-ის მოქმედების არეები (`src/shared/constants/mcpScopes.ts`)

თითოეული MCP ინსტრუმენტი `MCP_TOOL_SCOPES`-ის მეშვეობით კონკრეტულ მოქმედების არეებს მოითხოვს. სრული სია (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts`-ში მოქმედების არეების აღსრულება თითოეული ინსტრუმენტის მოქმედების არეების სიას გადასცემს
`evaluateToolScopes()`-ს მას შემდეგ, რაც `resolveCallerScopeContext()` მოქმედების არეებს MCP ავთენტიფიკაციის ინფორმაციიდან,
მოთხოვნის მეტამონაცემებიდან ან `OMNIROUTE_MCP_SCOPES`-იდან განსაზღვრავს.

## ავთენტიფიკაციის მოთხოვნის გადამრთველი

`src/shared/utils/apiAuth.ts`-ში არსებული `isAuthRequired()` განსაზღვრავს, აღსრულდება თუ არა მოთხოვნისთვის **რაიმე** ავთენტიფიკაცია:

- `settings.requireLogin === false` → ავთენტიფიკაცია გლობალურად გამორთულია.
- პაროლი არ არის კონფიგურირებული **და** არ არსებობს `INITIAL_PASSWORD` გარემოს ცვლადი → საწყისი კონფიგურაციის რეჟიმი უშვებს პირველადი დაყენების ოსტატსა და უკუმარყუჟის მოთხოვნებს, თუმცა ქსელში გარედან ხელმისაწვდომ მოთხოვნებს კვლავ სჭირდება ავტორიზაციის მონაცემები.
- მონაცემთა ბაზის ნებისმიერი შეცდომა → წვდომა იკეტება (ნაგულისხმევად უსაფრთხო რეჟიმი).

კლიენტის API გასაღების მოთხოვნის აღსრულება იყენებს `src/shared/utils/featureFlags.ts`-ში არსებულ `isRequireApiKeyEnabled()`-ს და არა `process.env.REQUIRE_API_KEY`-ის პირდაპირ წაკითხვას. ეს მნიშვნელოვანია განთავსებული ინსტანციებისთვის: Dashboard → Feature Flags-ში `REQUIRE_API_KEY`-ის გადართვა მონაცემთა ბაზაში ინახავს გადაფარვას და დაუყოვნებლივ მოქმედებს `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` და კლიენტის API-ის ავთენტიფიკაციის სხვა შემოწმებებზე, რომლებიც ამ დამხმარე ფუნქციას იყენებს. თუ ფუნქციური ალმების საცავის წაკითხვა შეუძლებელია, კლიენტის API-ის ავთენტიფიკაცია იკეტება და გასაღებს მოითხოვს.

## შეუთავსებელი ცვლილება — v3.8.0

`/api/v1/agents/tasks/*` და `/api/resilience/model-cooldowns` საბოლოო წერტილები **ახლა მართვის ავთენტიფიკაციას მოითხოვს** (კომიტი `588a0333`). კლიენტები, რომლებიც მანამდე `manage` მოქმედების არეს მოკლებულ ჩვეულებრივ API გასაღებს აგზავნიდნენ, იღებენ `403`-ს. მიგრაცია: ან API Keys მართვის პანელში გასაღებს მიანიჭეთ `manage` მოქმედების არე, ან გამოიყენეთ მართვის პანელში ავტორიზებული სესია.

## ქცევის ცვლილება — v3.8.2

`/api/mcp/*` (დისტანციური MCP სერვერი) ნაგულისხმევად კვლავ LOCAL_ONLY-ია, თუმცა ახლა იღებს არაუკუმარყუჟის მოთხოვნებს, როდესაც `Authorization: Bearer <api-key>` სათაური შეიცავს `manage` მოქმედების არეს. ეს გამონაკლისი თითოეული ბილიკისთვის ცალსახად კონტროლდება `src/server/authz/routeGuard.ts`-ში არსებული `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ის მეშვეობით; მონათესავე LOCAL_ONLY პრეფიქსის, `/api/cli-tools/runtime/*`-ის, გვერდის ავლა განზრახ შეუძლებელია, რადგან მას ნებისმიერი ქვეპროცესის გაშვება შეუძლია. არაუკუმარყუჟიდან `/api/mcp/*`-ზე გაგზავნილი ანონიმური მოთხოვნები კვლავ აბრუნებს `403 LOCAL_ONLY`-ს — ნებისმიერი ახალი LOCAL_ONLY ბილიკისთვის ნაგულისხმევი რეჟიმი კვლავაც მხოლოდ უკუმარყუჟზე მკაცრი შეზღუდვაა. იხილეთ [მარშრუტის დაცვის დონეები](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## ტესტირება

- მოდულური ტესტები: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- საჯარო დასაშვები სია: `tests/unit/public-api-routes.test.ts`.
- მიზნობრივი გაშვება: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## გამართვა

კონვეიერი პასუხებს ყოველთვის ამ სათაურებით აღნიშნავს:

```
x-request-id:               <კორელაციის იდენტიფიკატორი, გამეორებულია შეცდომის სხეულებში>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ავთენტიფიცირებული მოთხოვნებისთვის ზემდგომი მხარის (დამმუშავებლის მხარეს არსებული) მოთხოვნის სათაურები ასევე მოიცავს:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ბოლო-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (არასავალდებულო)
x-omniroute-auth-scopes:    მძიმით გამოყოფილი სია
```

დამმუშავებლებში გამოიყენეთ `assertAuth(req, expectedClass)` — თუ შუამავალი პროგრამული შრე გამოტოვებულია, ის აგენერირებს `AuthzAssertionError`-ს კოდით `AUTHZ_NOT_INITIALIZED` (სასარგებლოა ტესტებში კონფიგურაციის რეგრესიების აღმოსაჩენად).

## აგრეთვე იხილეთ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ავთენტიფიკაციის მარკერი თითოეული საბოლოო წერტილისთვის
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ავთენტიფიკაციის მოვლენების აუდიტის ჟურნალი
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP-ის მოქმედების ფარგლების აღსრულების დეტალები
- წყარო: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
