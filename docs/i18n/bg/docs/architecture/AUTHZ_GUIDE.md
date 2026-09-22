# Authorization Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Източник на истина:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute разполага с конвейер за оторизация, който отчита маршрутите и контролира всяка API заявка. Класификацията е **детерминирана** и **отказва по подразбиране** — всичко, което не може да бъде класифицирано, попада в `MANAGEMENT` и изисква сесия или токен с права за управление. Тази страница обяснява модела за инженерите, които поддържат маршрути или проектират нови крайни точки.

![Конвейер за AuthZ (3 класа маршрути + оценяване на правила)](../diagrams/exported/authz-pipeline.svg)

> Източник: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима за удостоверяване

### 1. API ключ (Bearer)

Използва се за клиентските API, съвместими с OpenAI/Anthropic/Gemini, както и за няколко маршрута за управление, когато ключът има обхвата `manage`.

```
Authorization: Bearer <api-key>
```

Валидира се чрез `isValidApiKey()` / `extractApiKey()` в `src/sse/services/auth.ts` и се експортира повторно чрез `src/shared/utils/apiAuth.ts`. Валидаторът също приема променливите на средата `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` като постоянни ключове за директно предаване (проблем #1350).

### 2. Сесия на таблото за управление (бисквитка auth_token)

За страниците на таблото за управление и административните операции.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Дадена бисквитка е сесия само когато JWT е успешно проверен **и** съдържа `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Всеки
потребител на бисквитката (защита на маршрути, опресняване на конвейера за оторизация, WebSocket ръкостискане, сървър
на живо, `/api/settings/require-login`, `/api/auth/status`) преминава през тази помощна функция.
Съществуват и други JWT, подписани с `JWT_SECRET` — механизмът за директно предаване на Cursor CLI издава
токени с `iss "omniroute" / aud "cursor-cli"` за притежателите на ключове — и те никога не са сесии
(#13298).

Проверява се чрез `isDashboardSessionAuthenticated()` в `src/shared/utils/apiAuth.ts`. Конвейерът автоматично опреснява JWT, когато остават по-малко от 7 дни от 30-дневния му срок на валидност.

Някои маршрути за управление приемат **който и да е** от двата режима: бисквитка ИЛИ `Bearer <key>`, когато API ключът има обхват `manage` (или `admin`). Това позволява работния процес „конфигуриране чрез API извиквания“, добавен във v3.8.

#### Незадължителна OIDC защита при влизане (#6973)

Административното влизане в таблото за управление поддържа и **незадължителен** поток чрез OIDC (OpenID Connect)
наред със стандартното влизане с парола — влизането с парола никога не се премахва, а само
се допълва:

- Деактивиран е, освен ако `settings.oidcEnabled === true` **и** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` са конфигурирани (Настройки → Удостоверяване).
  В противен случай `GET /api/auth/oidc/login` връща `400`.
- `GET /api/auth/oidc/login` открива `authorization_endpoint` от
  `/.well-known/openid-configuration` на издателя (с резервен вариант
  `<issuer>/authorize`), създава URI за пренасочване от входящата заявка
  (с отчитане на `x-forwarded-proto`) и пренасочва към IdP със случайна стойност `state`,
  съхранена в `httpOnly` бисквитка `oidc_state`.
- `GET /api/auth/oidc/callback` валидира `state`, обменя кода за оторизация
  и проверява подписа на ID токена чрез JWKS на издателя
  (`createRemoteJWKSet` на `jose`, кеширан за всеки JWKS URI), с проверки за `issuer`/`audience`.
  Незадължителен списък с разрешени стойности `oidcAllowedSubjects` съпоставя твърдението `sub`
  или твърдението `email` на токена — твърдението за имейл се приема само когато
  `email_verified === true`, така че непотвърден имейл при IdP никога не може да премине
  проверката.
- При успех се издава **точно същият** 30-дневен JWT `auth_token`, който се издава при
  влизане с парола (`src/app/api/auth/login/route.ts`), така че останалата част от
  конвейера за сесии на таблото за управление (автоматично опресняване, атрибути на бисквитката) остава непроменена —
  OIDC заменя само начина, по който се издава бисквитката, но не и правата, които тя предоставя.

## Класове маршрути

`src/server/authz/types.ts` дефинира три класа; всеки маршрут, който не може да бъде класифициран еднозначно, по подразбиране се отнася към `MANAGEMENT`.

| Клас         | Описание                                                                                                                                                                  | Необходима автентикация                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `PUBLIC`     | Изрично безопасни маршрути — вход, изход, състояние, инициализация, проверка на изправността, първоначално настройване.                                                   | Няма                                                                                 |
| `CLIENT_API` | Крайни точки за обслужване на модели — `/api/v1/*`, `/api/v1beta/*`, както и псевдонимите `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer ключ, когато ефективният флаг за функционалност `REQUIRE_API_KEY` е активиран |
| `MANAGEMENT` | Страници на таблото, настройки, доставчици, ключове, административни и диагностични крайни точки.                                                                         | Сесия на таблото ИЛИ Bearer с обхват `manage`                                        |

## Конвейер

```
Входяща заявка → src/proxy.ts
  → runAuthzPipeline() в src/server/authz/pipeline.ts
    1. Премахване на доверените вътрешни заглавки (x-omniroute-auth-*, x-omniroute-route-class)
    2. Генериране на идентификатор на заявката, класифициране на маршрута чрез classifyRoute()
    3. Ако pathname == "/" → пренасочване към /dashboard
    4. Ако се извършва изчакване за плавно спиране и /api/* → 503
    5. Ако методът не е GET и маршрутът е /api/* → проверка чрез защитата checkBodySize()
    6. Ако методът е OPTIONS → CORS предварителна заявка 204
    7. Ако options.enforce == false → пропускане със заглавки за класа на маршрута
    8. В противен случай: POLICIES[routeClass].evaluate(ctx)
       - разрешаване → задаване на x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - отхвърляне → JSON грешка с correlation_id (страници на таблото → 302 /login)
```

Доверените вътрешни заглавки (дефинирани в `src/server/authz/headers.ts`) се **премахват от входящите заявки** преди класифицирането — клиентите не могат предварително да задават `x-omniroute-auth-*`, за да се представят за друг субект.

### Договори на политиките

Всеки клас маршрут има политика в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — винаги връща `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — извлича Bearer и го валидира чрез `validateApiKey()`. Преминава към анонимен достъп само когато ефективният флаг за функционалност `REQUIRE_API_KEY` е деактивиран. Ефективният флаг се определя чрез `isRequireApiKeyEnabled()` (`замяна от флаг за функционалност в БД > process.env.REQUIRE_API_KEY > стойност по подразбиране`), така че флаговете за функционалност в таблото и променливите на средата да управляват последователно `/api/v1/*`, `/api/v1beta/*` и псевдонимите; при грешка в определянето достъпът се отказва. Разрешава заявки със сесия на таблото към клиентски API маршрути (включително `/api/v1/models`, използван от каталога с модели на таблото).
- **`managementPolicy`** (`policies/management.ts`) — приема сесия на таблото, вътрешни заявки за синхронизиране на модели (съпоставяни с `/api/providers/[name]/(sync-models|models)`) или пропуска изцяло проверката, ако `isAuthRequired()` върне false. Връща 403 (`AUTH_001`), когато е предоставен Bearer токен, но той е невалиден, и 401 във всички останали случаи. Освен това прилага нивата за защита на маршрутите (LOCAL_ONLY / ALWAYS_PROTECTED) преди който и да е клон за автентикация — вижте [Нива за защита на маршрутите](../security/ROUTE_GUARD_TIERS.md). Пътищата LOCAL_ONLY в `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (понастоящем: `/api/mcp/`) могат да бъдат достъпвани извън loopback интерфейса, когато Bearer ключът има обхват `manage`; всички останали пътища LOCAL_ONLY остават строго ограничени до loopback независимо от обхвата.

Успешната политика връща `AuthSubject` с `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Обработчиците надолу по веригата могат да го прочетат чрез `assertAuth(request, "CLIENT_API")` в `src/server/authz/assertAuth.ts`, вместо да изпълняват повторно логиката за автентикация.

## Списък с публични маршрути

`src/shared/constants/publicApiRoutes.ts` е изричният списък с разрешени маршрути:

Списъкът е разделен според **формата**, като това разделение е критично важно (GHSA-74g9-q8f6-793h): префиксът се съпоставя чрез `startsWith()`, така че съвпада и с всеки съседен път, който споделя началните му символи.
Използването на `/api/usage/om-usage` като префикс направи `/api/usage/om-usage<anything>` ПУБЛИЧЕН, а Next го преобразува до `/api/usage/[connectionId]` — обработчик без собствено удостоверяване.

```ts
// Реални поддървета. Всеки запис ТРЯБВА да завършва с "/" (проверява се от модулен тест).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // третира се като CLIENT_API в classify, а не като публичен маршрут „без удостоверяване“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Единични маршрути, съпоставяни ТОЧНО (със или без завършваща наклонена черта).
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

// Единични маршрути само за четене, за които се прилага и облекчаването на ограниченията за CORS origin.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Единичен маршрут само за четене БЕЗ облекчаване на ограниченията за CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршрутите само за четене са публични **единствено** за безопасни методи. Забележка: `classifyRoute()` изключва `/api/v1/*` и `/api/v1beta/*` от резервното класифициране като PUBLIC — те винаги са `CLIENT_API`, така че политиката за Bearer ключове продължава да се прилага.

## Добавяне на нов маршрут

### Шаблон 1 — Публична крайна точка на клиентския API (Bearer удостоверяване)

Маршрутите под `/api/v1/` и `/api/v1beta/` автоматично се класифицират като `CLIENT_API`. Middleware компонентът налага Bearer проверката; не е необходимо обработчиците на маршрути да я повтарят, но могат да прочетат субекта, ако това е полезно.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика на обработчика
}
```

### Шаблон 2 — Крайна точка за управление (сесия или Bearer + manage)

Използвайте `requireManagementAuth()` от `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика на обработчика
}
```

При успех `requireManagementAuth()` връща `null`, а при грешка — JSON `Response`:

- 401 `AUTH_001` „Изисква се удостоверяване“ — липсват каквито и да е идентификационни данни
- 403 — невалиден Bearer **или** е предоставен Bearer, но ключът няма обхват `manage` / `admin`

`hasManageScope(scopes)` връща true за `"manage"` или `"admin"`.

### Шаблон 3 — Добавяне към публичния списък с разрешени маршрути

Изберете множеството според формата, а не според удобството. Единичен маршрут се добавя в `PUBLIC_API_ROUTES_EXACT` (или в `PUBLIC_READONLY_CORS_API_ROUTES`, ако е само за GET); единствено реално поддърво се добавя в `PUBLIC_API_ROUTE_PREFIXES` и то **трябва да завършва с `/`**. Добавянето на единичен маршрут в списъка с префикси прави публичен и всеки съседен път, който споделя началните му символи — включително маршрути със сродни динамични сегменти, добавени по-късно (GHSA-74g9-q8f6-793h). Актуализирайте модулните тестове в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Обхвати

API ключовете съдържат масив `scopes` (съхраняван като JSON в `api_keys.scopes`, вижте `src/lib/db/apiKeys.ts`).

### Обхват за управление

- `manage` / `admin` — предоставя на ключа достъп до крайните точки на API за управление, когато е изпратен като Bearer.

### MCP обхвати (`src/shared/constants/mcpScopes.ts`)

Всеки MCP инструмент изисква конкретни обхвати чрез `MCP_TOOL_SCOPES`. Пълен списък (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Прилагането на обхватите в `open-sse/mcp-server/server.ts` предава списъка с обхвати на всеки инструмент към
`evaluateToolScopes()`, след като `resolveCallerScopeContext()` определи обхватите от информацията за MCP удостоверяване,
метаданните на заявката или `OMNIROUTE_MCP_SCOPES`.

## Превключвател за задължително удостоверяване

`isAuthRequired()` в `src/shared/utils/apiAuth.ts` определя дали за дадена заявка се прилага **каквото и да е** удостоверяване:

- `settings.requireLogin === false` → удостоверяването е глобално деактивирано.
- Няма конфигурирана парола **и** няма променлива на средата `INITIAL_PASSWORD` → режимът за първоначално настройване позволява съветника за въвеждане в системата и loopback заявките, но заявките от външната мрежа все още изискват идентификационни данни.
- Всяка грешка в БД → достъпът се отказва (сигурност по подразбиране).

Прилагането на изискването за клиентски API ключ използва `isRequireApiKeyEnabled()` в `src/shared/utils/featureFlags.ts`, а не директно прочитане на `process.env.REQUIRE_API_KEY`. Това е важно за внедрените инстанции: превключването на `REQUIRE_API_KEY` в Dashboard → Feature Flags съхранява заместване в БД и незабавно засяга `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` и другите проверки за удостоверяване на клиентския API, които използват същата помощна функция. Ако хранилището за флагове на функционалности не може да бъде прочетено, удостоверяването на клиентския API отказва достъп и изисква ключ.

## Несъвместима промяна — v3.8.0

Крайните точки `/api/v1/agents/tasks/*` и `/api/resilience/model-cooldowns` **вече изискват удостоверяване за управление** (commit `588a0333`). Клиентите, които преди са изпращали обикновен API ключ без обхвата `manage`, получават `403`. Миграция: или задайте на ключа обхвата `manage` в таблото API Keys, или използвайте сесия с влизане в таблото.

## Промяна в поведението — v3.8.2

`/api/mcp/*` (отдалеченият MCP сървър) все още е LOCAL_ONLY по подразбиране, но вече приема заявки, които не са loopback, когато заглавката `Authorization: Bearer <api-key>` съдържа обхвата `manage`. Изключението се управлява изрично за всеки път чрез `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` в `src/server/authz/routeGuard.ts`; сродният LOCAL_ONLY префикс `/api/cli-tools/runtime/*` умишлено НЕ може да бъде заобиколен, защото може да стартира произволни подпроцеси. Анонимните заявки към `/api/mcp/*`, които не са loopback, продължават да връщат `403 LOCAL_ONLY` — поведението по подразбиране за всеки нов LOCAL_ONLY път остава строго ограничено до loopback. Вижте [Нива на защита на маршрутите](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестване

- Модулни тестове: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Публичен списък с разрешени маршрути: `tests/unit/public-api-routes.test.ts`.
- Изпълнение на конкретен тест: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отстраняване на грешки

Конвейерът винаги добавя към отговорите:

```
x-request-id:               <идентификатор за корелация, повтарян в телата на грешките>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

При удостоверени заявки заглавките на заявката към upstream (от страната на обработчика) включват също:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<последните-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (незадължително)
x-omniroute-auth-scopes:    списък, разделен със запетаи
```

Използвайте `assertAuth(req, expectedClass)` в обработчиците — тя хвърля `AuthzAssertionError` с код `AUTHZ_NOT_INITIALIZED`, ако междинният софтуер е бил заобиколен (полезно за откриване на регресии в конфигурацията при тестове).

## Вижте също

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер за удостоверяване за всяка крайна точка
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал за одит на събитията за удостоверяване
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — подробности за прилагането на обхвата на MCP
- Изходен код: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
