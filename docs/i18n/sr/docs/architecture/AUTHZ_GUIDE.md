# Authorization Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Извор истине:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute има процес ауторизације свестан рута који контролише сваки API захтев. Класификација је **детерминистичка** и **затворена у случају грешке** — све што не може да се класификује завршава као `MANAGEMENT` и захтева сесију или токен са управљачким нивоом приступа. Ова страница објашњава модел инжењерима који одржавају руте или пројектују нове крајње тачке.

![AuthZ процес (3 класе рута + процена смерница)](../diagrams/exported/authz-pipeline.svg)

> Извор: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима аутентификације

### 1. API кључ (Bearer)

Користи се за клијентске API-је компатибилне са OpenAI/Anthropic/Gemini и за неколико управљачких рута када кључ има опсег `manage`.

```
Authorization: Bearer <api-key>
```

Проверава се помоћу `isValidApiKey()` / `extractApiKey()` у `src/sse/services/auth.ts` и поново се извози преко `src/shared/utils/apiAuth.ts`. Валидатор такође прихвата променљиве окружења `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` као трајне кључеве за директно прослеђивање (проблем #1350).

### 2. Сесија контролне табле (auth_token колачић)

За странице контролне табле и администраторске операције.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Колачић представља сесију само када је JWT успешно проверен **и** садржи `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Сваки
корисник колачића (заштитни механизам руте, освежавање AuthZ процеса, WebSocket руковање, сервер
уживо, `/api/settings/require-login`, `/api/auth/status`) користи тај помоћни механизам.
Постоје и други JWT-ови потписани помоћу `JWT_SECRET` — Cursor CLI директно прослеђивање издаје
токене `iss "omniroute" / aud "cursor-cli"` власницима кључева — и они никада не представљају сесије
(#13298).

Проверава се помоћу `isDashboardSessionAuthenticated()` у `src/shared/utils/apiAuth.ts`. Процес аутоматски освежава JWT када је до истека његовог 30-дневног трајања остало мање од 7 дана.

Неке управљачке руте прихватају **било који** режим: колачић ИЛИ `Bearer <key>` када API кључ има опсег `manage` (или `admin`). То омогућава ток рада „подесиво путем API позива“ додат у v3.8.

#### Опциона OIDC контрола пријаве (#6973)

Администраторска пријава на контролну таблу такође подржава **опциони** OIDC (OpenID Connect) ток
поред подразумеване пријаве лозинком — пријава лозинком се никада не уклања, већ се само
допуњује:

- Онемогућено је осим ако је `settings.oidcEnabled === true` **и** ако су `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` сви подешени (Подешавања → Аутентификација).
  `GET /api/auth/oidc/login` у супротном враћа `400`.
- `GET /api/auth/oidc/login` открива `authorization_endpoint` из
  издаваочевог `/.well-known/openid-configuration` (као резерву користи
  `<issuer>/authorize`), гради URI за преусмеравање на основу долазног захтева
  (узимајући у обзир `x-forwarded-proto`) и преусмерава на IdP са насумичним `state`
  сачуваним у `httpOnly` колачићу `oidc_state`.
- `GET /api/auth/oidc/callback` проверава `state`, размењује ауторизациони
  кôд и проверава потпис ID токена преко издавачевог JWKS-а
  (`createRemoteJWKSet` из пакета `jose`, кеширано по JWKS URI-ју) уз провере
  `issuer`/`audience`. Опциона листа дозвољених вредности `oidcAllowedSubjects` упоређује
  `sub` тврдњу токена или његову `email` тврдњу — `email` тврдња се прихвата само када
  је `email_verified === true`, тако да непроверена адреса е-поште код IdP-а никада не може проћи
  контролу.
- У случају успеха, издаје **потпуно исти** 30-дневни `auth_token` JWT као пријава
  лозинком (`src/app/api/auth/login/route.ts`), тако да остатак процеса сесије
  контролне табле (аутоматско освежавање, ознаке колачића) остаје непромењен —
  OIDC мења само начин на који се колачић издаје, а не права која он додељује.

## Класе рута

`src/server/authz/types.ts` дефинише три класе; свака рута која се не може детерминистички класификовати подразумевано се сврстава у `MANAGEMENT`.

| Класа        | Опис                                                                                                                                                          | Потребна аутентификација                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Експлицитно безбедне руте — пријава, одјава, статус, иницијализација, провера исправности, почетно подешавање.                                                | Није потребна                                                                |
| `CLIENT_API` | Крајње тачке за послуживање модела — `/api/v1/*`, `/api/v1beta/*`, уз алијасе `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer кључ када је ефективна заставица функције `REQUIRE_API_KEY` омогућена |
| `MANAGEMENT` | Странице контролне табле, подешавања, добављачи, кључеви, административне и дијагностичке крајње тачке.                                                       | Сесија контролне табле ИЛИ Bearer са опсегом `manage`                        |

## Ток обраде

```
Долазни захтев → src/proxy.ts
  → runAuthzPipeline() у src/server/authz/pipeline.ts
    1. Уклони поуздана интерна заглавља (x-omniroute-auth-*, x-omniroute-route-class)
    2. Генериши идентификатор захтева, класификуј руту преко classifyRoute()
    3. Ако је pathname == "/" → преусмери на /dashboard
    4. Ако је у току пражњење (контролисано гашење) и /api/* → 503
    5. Ако је non-GET /api/* → примени checkBodySize() заштиту
    6. Ако је OPTIONS → CORS preflight 204
    7. Ако је options.enforce == false → проследи са заглављима класе руте
    8. У супротном: POLICIES[routeClass].evaluate(ctx)
       - allow  → постави x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON грешка са correlation_id (странице контролне табле → 302 /login)
```

Поуздана интерна заглавља (дефинисана у `src/server/authz/headers.ts`) се **уклањају из долазних захтева** пре класификације — клијенти не могу унапред поставити `x-omniroute-auth-*` како би се представили као други субјект.

### Уговори смерница

Свака класа руте има смерницу у `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — увек враћа `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — издваја Bearer и проверава га преко `validateApiKey()`. Прелази на анонимни приступ само када је ефективна заставица функције `REQUIRE_API_KEY` онемогућена. Ефективна заставица се одређује преко `isRequireApiKeyEnabled()` (`DB замена заставице функције > process.env.REQUIRE_API_KEY > подразумевана вредност`), тако да заставице функција на контролној табли и променљиве окружења доследно управљају рутама `/api/v1/*`, `/api/v1beta/*` и алијасима; грешке механизма за одређивање доводе до одбијања приступа. Дозвољава захтеве са сесијом контролне табле на клијентским API рутама (укључујући `/api/v1/models`, коју користи каталог модела на контролној табли).
- **`managementPolicy`** (`policies/management.ts`) — прихвата сесију контролне табле, интерне захтеве за синхронизацију модела (који се подударају са `/api/providers/[name]/(sync-models|models)`) или у потпуности прескаче проверу ако `isAuthRequired()` врати false. Враћа 403 (`AUTH_001`) када је Bearer токен присутан, али неважећи, а у супротном 401. Такође примењује нивое заштите рута (LOCAL_ONLY / ALWAYS_PROTECTED) пре било које гране аутентификације — погледајте [Нивои заштите рута](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY путањама у `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (тренутно: `/api/mcp/`) може се приступити ван loopback интерфејса када Bearer кључ садржи опсег `manage`; све остале LOCAL_ONLY путање остају строго ограничене на loopback без обзира на опсег.

Успешна смерница враћа `AuthSubject` са `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Накнадни обрађивачи могу да га прочитају преко `assertAuth(request, "CLIENT_API")` у `src/server/authz/assertAuth.ts`, уместо да поново извршавају логику аутентификације.

## Листа јавних рута

`src/shared/constants/publicApiRoutes.ts` представља експлицитну листу дозвољених рута:

Листа је подељена према **облику**, а ова подела је безбедносно критична (GHSA-74g9-q8f6-793h): префикс се
подудара помоћу `startsWith()`, па се такође подудара са сваком суседном путањом која дели његове почетне знакове.
Префикс `/api/usage/om-usage` означио је `/api/usage/om-usage<anything>` као PUBLIC, а Next то разрешава
као `/api/usage/[connectionId]` — обрађивач који нема сопствену аутентификацију.

```ts
// Стварна подстабла. Свака ставка МОРА да се завршава са „/“ (што се проверава јединичним тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // у classify се третира као CLIENT_API, а не као јавна рута „без аутентификације“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Појединачне руте које се подударају ТАЧНО (са завршном косом цртом или без ње).
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

// Појединачне руте само за читање на које се такође примењује ублажавање CORS ограничења порекла.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Појединачна рута само за читање БЕЗ ублажавања CORS ограничења.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Руте само за читање су јавне **само** за безбедне методе. Напомена: `classifyRoute()` искључује `/api/v1/*` и `/api/v1beta/*` из резервне PUBLIC класификације — оне су увек `CLIENT_API`, тако да се политика Bearer кључева и даље примењује.

## Додавање нове руте

### Образац 1 — Јавна крајња тачка клијентског API-ја (Bearer аутентификација)

Руте под `/api/v1/` и `/api/v1beta/` аутоматски се класификују као `CLIENT_API`. Посреднички софтвер спроводи Bearer проверу; обрађивачи рута не морају да је понављају, али могу да прочитају субјекат ако је то корисно.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика обрађивача
}
```

### Образац 2 — Управљачка крајња тачка (сесија или Bearer + manage)

Користите `requireManagementAuth()` из `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика обрађивача
}
```

`requireManagementAuth()` враћа `null` у случају успеха или JSON грешку типа `Response`:

- 401 `AUTH_001` „Аутентификација је обавезна“ — акредитиви уопште нису наведени
- 403 — неважећи Bearer **или** је Bearer присутан, али кључ нема опсег `manage` / `admin`

`hasManageScope(scopes)` враћа true за `"manage"` или `"admin"`.

### Образац 3 — Додавање на јавну листу дозвољених рута

Изаберите скуп према облику, а не према погодности. Једна рута иде у `PUBLIC_API_ROUTES_EXACT` (или у `PUBLIC_READONLY_CORS_API_ROUTES` ако је намењена само за GET); само стварно подстабло иде у `PUBLIC_API_ROUTE_PREFIXES` и оно **мора да се завршава са `/`**. Стављање једне руте на листу префикса такође објављује сваку суседну путању која дели њене почетне знакове — укључујући сродне руте са динамичким сегментима које се додају касније (GHSA-74g9-q8f6-793h). Ажурирајте јединичне тестове у `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Opsezi

API ključevi sadrže niz `scopes` (čuva se kao JSON u `api_keys.scopes`, pogledajte `src/lib/db/apiKeys.ts`).

### Upravljački opseg

- `manage` / `admin` — omogućava ključu pristup krajnjim tačkama upravljačkog API-ja kada se šalje kao Bearer.

### MCP opsezi (`src/shared/constants/mcpScopes.ts`)

Svaki MCP alat zahteva određene opsege putem `MCP_TOOL_SCOPES`. Kompletna lista (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Provera opsega u `open-sse/mcp-server/server.ts` prosleđuje listu opsega svakog alata funkciji
`evaluateToolScopes()` nakon što `resolveCallerScopeContext()` razreši opsege iz MCP informacija za autentifikaciju,
metapodataka zahteva ili `OMNIROUTE_MCP_SCOPES`.

## Prekidač za obaveznu autentifikaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` određuje da li se za zahtev primenjuje **bilo kakva** autentifikacija:

- `settings.requireLogin === false` → autentifikacija je globalno onemogućena.
- Nije konfigurisana lozinka **i** ne postoji promenljiva okruženja `INITIAL_PASSWORD` → režim inicijalnog podešavanja dozvoljava čarobnjak za uvođenje i zahteve sa povratne sprege, ali zahtevi preko izložene mreže i dalje zahtevaju akreditive.
- Bilo koja greška baze podataka → pristup se odbija (podrazumevano bezbedno ponašanje).

Primena API ključa klijenta koristi `isRequireApiKeyEnabled()` iz `src/shared/utils/featureFlags.ts`, a ne direktno čitanje `process.env.REQUIRE_API_KEY`. Ovo je važno za primenjene instance: prebacivanje opcije `REQUIRE_API_KEY` u Dashboard → Feature Flags čuva zamenu u bazi podataka i odmah utiče na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provere autentifikacije klijentskog API-ja koje dele ovu pomoćnu funkciju. Ako skladište oznaka funkcionalnosti ne može da se pročita, autentifikacija klijentskog API-ja odbija pristup i zahteva ključ.

## Promena koja narušava kompatibilnost — v3.8.0

Krajnje tačke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtevaju upravljačku autentifikaciju** (izmena `588a0333`). Klijenti koji su ranije slali običan API ključ bez opsega `manage` dobijaju `403`. Migracija: dodelite ključu opseg `manage` na kontrolnoj tabli API ključeva ili koristite prijavljenu sesiju kontrolne table.

## Promena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP server) je i dalje podrazumevano LOCAL_ONLY, ali sada prihvata zahteve koji ne dolaze sa povratne sprege kada zaglavlje `Authorization: Bearer <api-key>` sadrži opseg `manage`. Izuzetak se eksplicitno omogućava za svaku putanju putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; srodni prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` namerno nije moguće zaobići jer može da pokrene proizvoljne potprocese. Anonimni zahtevi ka `/api/mcp/*` koji ne dolaze sa povratne sprege i dalje vraćaju `403 LOCAL_ONLY` — podrazumevano ponašanje za svaku novu LOCAL_ONLY putanju ostaje strogo ograničeno na povratnu spregu. Pogledajte [Nivoi zaštite ruta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javna lista dozvoljenih ruta: `tests/unit/public-api-routes.test.ts`.
- Pokretanje ciljanog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отклањање грешака

Систем за обраду увек означава одговоре следећим заглављима:

```
x-request-id:               <идентификатор корелације, поновљен у телима грешака>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

За аутентификоване захтеве, заглавља захтева прослеђеног узводној страни (руковаоцу) такође садрже:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<последње 4 цифре> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (опционо)
x-omniroute-auth-scopes:    листа раздвојена зарезима
```

Користите `assertAuth(req, expectedClass)` унутар руковалаца — баца `AuthzAssertionError` са кодом `AUTHZ_NOT_INITIALIZED` ако је посреднички софтвер заобиђен (корисно за откривање регресија конфигурације у тестовима).

## Погледајте и

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ознака аутентификације за сваку крајњу тачку
- [COMPLIANCE.md](../security/COMPLIANCE.md) — евиденција ревизије за догађаје аутентификације
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — детаљи примене MCP опсега
- Извор: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
