# Authorization Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Источник истины:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Последнее обновление:** 2026-09-22 — пространства имен областей указывают на MCP-SERVER.md

OmniRoute имеет конвейер авторизации, учитывающий маршруты, который контролирует каждый API-запрос. Классификация **детерминирована** и **закрыта при сбое** — всё, что не может быть классифицировано, попадает в категорию `MANAGEMENT` и требует сессии или токена уровня управления. Эта страница объясняет модель для инженеров, поддерживающих маршруты или проектирующих новые конечные точки.

![Конвейер AuthZ (3 класса маршрутов + оценка политики)](../diagrams/exported/authz-pipeline.svg)

> Источник: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима аутентификации

### 1. Ключ API (Bearer)

Используется для клиентских API, совместимых с OpenAI/Anthropic/Gemini, а также для некоторых маршрутов управления, если ключ имеет область действия `manage`.

```
Authorization: Bearer <api-key>
```

Проверяется функциями `isValidApiKey()` / `extractApiKey()` в `src/sse/services/auth.ts`, которые также реэкспортируются через `src/shared/utils/apiAuth.ts`. Валидатор также принимает переменные окружения `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` как постоянные ключи сквозного доступа (задача #1350).

### 2. Сессия панели управления (cookie auth_token)

Используется для страниц панели управления и административных операций.

```
Cookie: auth_token=<JWT, подписанный с помощью JWT_SECRET>
```

Cookie считается сессией только в том случае, если JWT успешно проходит проверку **и** содержит `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Каждый
потребитель этого cookie (защита маршрутов, обновление конвейера авторизации, рукопожатие WebSocket, сервер
обновлений в реальном времени, `/api/settings/require-login`, `/api/auth/status`) использует этот вспомогательный метод.
Существуют и другие JWT, подписанные с помощью `JWT_SECRET`: механизм сквозного доступа Cursor CLI выпускает
для владельцев ключей токены `iss "omniroute" / aud "cursor-cli"`, которые никогда не считаются сессиями
(#13298).

Проверяется функцией `isDashboardSessionAuthenticated()` в `src/shared/utils/apiAuth.ts`. Конвейер автоматически обновляет JWT, если до истечения его 30-дневного срока действия остаётся менее 7 дней.

Некоторые маршруты управления принимают **любой** из режимов: cookie ИЛИ `Bearer <key>`, если ключ API имеет область действия `manage` (или `admin`). Именно это обеспечивает рабочий процесс «настройка с помощью API-вызовов», добавленный в v3.8.

#### Необязательное ограничение входа через OIDC (#6973)

Административный вход в панель управления также поддерживает **опциональный** процесс OIDC (OpenID Connect)
наряду со входом по паролю по умолчанию — вход по паролю не удаляется, а лишь
дополняется:

- Отключено, если `settings.oidcEnabled !== true` **или** не настроен хотя бы один из параметров:
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Настройки → Аутентификация).
  В противном случае `GET /api/auth/oidc/login` возвращает `400`.
- `GET /api/auth/oidc/login` получает `authorization_endpoint` из
  `/.well-known/openid-configuration` поставщика
  (с резервным переходом на `<issuer>/authorize`), формирует URI перенаправления на основе входящего запроса
  (с учётом `x-forwarded-proto`) и перенаправляет к IdP со случайным значением `state`,
  сохранённым в cookie `oidc_state` с флагом `httpOnly`.
- `GET /api/auth/oidc/callback` проверяет `state`, обменивает код авторизации
  и проверяет подпись ID-токена с помощью JWKS поставщика
  (`createRemoteJWKSet` из `jose`, кэшируется для каждого URI JWKS) с проверками `issuer`/`audience`.
  Необязательный список разрешённых субъектов `oidcAllowedSubjects` сопоставляется с утверждением
  `sub` токена или его утверждением `email` — утверждение email учитывается только тогда, когда
  `email_verified === true`, поэтому неподтверждённый адрес электронной почты у IdP никогда не позволит
  пройти ограничение.
- При успешном входе выпускается **точно такой же** 30-дневный JWT `auth_token`, как и при входе
  по паролю (`src/app/api/auth/login/route.ts`), поэтому остальная часть
  конвейера сессии панели управления (автоматическое обновление, флаги cookie) остаётся неизменной —
  OIDC заменяет только способ выпуска cookie, но не предоставляемые им права.

## Классы маршрутов

В `src/server/authz/types.ts` определены три класса; любой маршрут, который невозможно однозначно классифицировать, по умолчанию относится к `MANAGEMENT`.

| Класс        | Описание                                                                                                                                                          | Требуемая аутентификация                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `PUBLIC`     | Явно безопасные маршруты — вход, выход, статус, инициализация, проверка состояния, начальная настройка.                                                           | Не требуется                                                         |
| `CLIENT_API` | Эндпоинты обслуживания моделей — `/api/v1/*`, `/api/v1beta/*`, а также псевдонимы `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-ключ, если эффективный флаг функции `REQUIRE_API_KEY` включён |
| `MANAGEMENT` | Страницы панели управления, настройки, провайдеры, ключи, административные и диагностические эндпоинты.                                                           | Сессия панели управления ИЛИ Bearer с областью действия `manage`     |

## Конвейер

```
Входящий запрос → src/proxy.ts
  → runAuthzPipeline() в src/server/authz/pipeline.ts
    1. Удалить доверенные внутренние заголовки (x-omniroute-auth-*, x-omniroute-route-class)
    2. Сгенерировать идентификатор запроса, классифицировать маршрут через classifyRoute()
    3. Если pathname == "/" → перенаправить на /dashboard
    4. Если идёт завершение работы (штатное отключение) и /api/* → 503
    5. Если запрос к /api/* использует не GET → применить проверку checkBodySize()
    6. Если OPTIONS → предварительный CORS-запрос 204
    7. Если options.enforce == false → пропустить дальше с заголовками класса маршрута
    8. Иначе: POLICIES[routeClass].evaluate(ctx)
       - разрешено → установить x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - отклонено  → ошибка JSON с correlation_id (страницы панели управления → 302 /login)
```

Доверенные внутренние заголовки (определённые в `src/server/authz/headers.ts`) **удаляются из входящих запросов** перед классификацией — клиенты не могут заранее задать `x-omniroute-auth-*`, чтобы выдать себя за субъекта.

### Контракты политик

Для каждого класса маршрутов предусмотрена политика в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — всегда возвращает `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — извлекает Bearer и проверяет его через `validateApiKey()`. Переходит к анонимному доступу только тогда, когда эффективный флаг функции `REQUIRE_API_KEY` отключён. Эффективное значение флага определяется через `isRequireApiKeyEnabled()` (`переопределение флага функции в БД > process.env.REQUIRE_API_KEY > значение по умолчанию`), поэтому флаги функций панели управления и переменные окружения согласованно управляют `/api/v1/*`, `/api/v1beta/*` и псевдонимами; при сбоях распознавателя доступ запрещается. Разрешает запросы с сессией панели управления к маршрутам клиентского API (включая `/api/v1/models`, используемый каталогом моделей панели управления).
- **`managementPolicy`** (`policies/management.ts`) — принимает сессию панели управления и внутренние запросы синхронизации моделей (сопоставляемые с `/api/providers/[name]/(sync-models|models)`) либо полностью пропускает проверку, если `isAuthRequired()` возвращает false. Возвращает 403 (`AUTH_001`), если Bearer-токен присутствует, но недействителен, и 401 в остальных случаях. Кроме того, до выполнения любой ветви аутентификации применяет уровни защиты маршрутов (LOCAL_ONLY / ALWAYS_PROTECTED) — см. [Уровни защиты маршрутов](../security/ROUTE_GUARD_TIERS.md). К путям LOCAL_ONLY из `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (на данный момент: `/api/mcp/`) можно обращаться не с loopback-адреса, если Bearer-ключ имеет область действия `manage`; для всех остальных путей LOCAL_ONLY независимо от области действия сохраняется строгое требование loopback-адреса.

При успешном выполнении политика возвращает `AuthSubject` с `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Нижестоящие обработчики могут получить его через `assertAuth(request, "CLIENT_API")` в `src/server/authz/assertAuth.ts` вместо повторного выполнения логики аутентификации.

## Список публичных маршрутов

`src/shared/constants/publicApiRoutes.ts` содержит явный список разрешённых маршрутов:

Список разделён по **форме маршрута**, и это разделение критически важно (GHSA-74g9-q8f6-793h): префикс сопоставляется с помощью `startsWith()`, поэтому он также совпадает со всеми соседними путями, имеющими те же начальные символы.
Если указать `/api/usage/om-usage` в качестве префикса, это сделает `/api/usage/om-usage<anything>` ПУБЛИЧНЫМ, а Next сопоставит такой путь с `/api/usage/[connectionId]` — обработчиком без собственной аутентификации.

```ts
// Настоящие поддеревья. Каждая запись ДОЛЖНА заканчиваться символом "/" (это проверяется модульным тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // при классификации рассматривается как CLIENT_API, а не как публичный маршрут «без аутентификации»
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Отдельные маршруты, сопоставляемые ТОЧНО (с завершающей косой чертой или без неё).
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

// Отдельные маршруты только для чтения, к которым также применяется послабление CORS для origin.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Отдельный маршрут только для чтения БЕЗ послабления CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршруты только для чтения являются публичными **только** для безопасных методов. Обратите внимание: `classifyRoute()` исключает `/api/v1/*` и `/api/v1beta/*` из механизма отнесения к PUBLIC по умолчанию — они всегда классифицируются как `CLIENT_API`, поэтому к ним по-прежнему применяется политика Bearer-ключей.

## Добавление нового маршрута

### Схема 1 — Публичная конечная точка клиентского API (Bearer-аутентификация)

Маршруты в `/api/v1/` и `/api/v1beta/` автоматически классифицируются как `CLIENT_API`. Middleware обеспечивает проверку Bearer; обработчикам маршрутов не нужно выполнять её повторно, но при необходимости они могут прочитать субъект.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика обработчика
}
```

### Схема 2 — Конечная точка управления (сессия или Bearer + manage)

Используйте `requireManagementAuth()` из `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика обработчика
}
```

`requireManagementAuth()` возвращает `null` при успешной проверке либо JSON-ответ `Response` с ошибкой:

- 401 `AUTH_001` "Требуется аутентификация" — учётные данные полностью отсутствуют
- 403 — недействительный Bearer **или** Bearer присутствует, но у ключа нет области действия `manage` / `admin`

`hasManageScope(scopes)` возвращает true для `"manage"` или `"admin"`.

### Схема 3 — Добавление в список публичных маршрутов

Выбирайте набор по форме маршрута, а не по удобству. Отдельный маршрут следует помещать в `PUBLIC_API_ROUTES_EXACT` (или в `PUBLIC_READONLY_CORS_API_ROUTES`, если он предназначен только для GET); только настоящее поддерево следует помещать в `PUBLIC_API_ROUTE_PREFIXES`, причём оно **должно заканчиваться на `/`**. Помещение отдельного маршрута в список префиксов также делает публичными все соседние пути с теми же начальными символами, включая маршруты с динамическими сегментами, добавленные позднее (GHSA-74g9-q8f6-793h). Обновите модульные тесты в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Области действия

Три пространства имен. Каждый проверяющий читает только свои строки. Сравнительный анализ, включая то, почему `manage` не проходит `scopeMatches` для `read:compression` и почему токен доступа `read` не может выполнить `PATCH /api/keys/{id}`, находится в
[Три пространства имен областей действия](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Ключи API содержат массив `scopes` (хранится как JSON в `api_keys.scopes`, см. `src/lib/db/apiKeys.ts`).

### Область действия управления

- `manage` / `admin` — `hasManageScope`. Bearer-доступ к маршрутам API управления.
- `mcp:connect`, `self:usage`, `self:account-quota` и
  `policy:bypass-provider-quota` являются аддитивными областями действия с точным совпадением. Они находятся
  вне `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` открывает только
  не-loopback вырез `/api/mcp/`.

### Области действия инструментов MCP

Каталог и правила сопоставления (идентичная строка или предоставленная область действия, заканчивающаяся на `*`):
[Области действия инструментов MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` является исходным типизированным
подмножеством, а не полным каталогом. Принудительное применение выполняется в
`open-sse/mcp-server/scopeEnforcement.ts` после того, как `resolveCallerScopeContext()`
разрешает области действия из информации аутентификации MCP, метаданных запроса или `OMNIROUTE_MCP_SCOPES`.
Оно остается выключенным, если только `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Области действия токенов доступа

`read` / `write` / `admin` для токенов `oma_live_…`, ранжированных по `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Этот ранг применяется только к учетным данным
токена доступа. См. [Аутентификация управления](../guides/MANAGEMENT-AUTH.md).

## Переключатель обязательной аутентификации

`isAuthRequired()` в `src/shared/utils/apiAuth.ts` определяет, требуется ли для запроса **какая-либо** аутентификация:

- `settings.requireLogin === false` → аутентификация глобально отключена.
- Пароль не настроен **и** переменная окружения `INITIAL_PASSWORD` отсутствует → режим начальной настройки разрешает доступ к мастеру адаптации и запросы с loopback-интерфейса, но для внешних сетевых запросов по-прежнему требуются учётные данные.
- Любая ошибка БД → доступ запрещается (безопасность по умолчанию).

Проверка API-ключей клиентов использует `isRequireApiKeyEnabled()` из `src/shared/utils/featureFlags.ts`, а не прямое чтение `process.env.REQUIRE_API_KEY`. Это важно для развёрнутых экземпляров: переключение `REQUIRE_API_KEY` в Dashboard → Feature Flags сохраняет переопределение в БД и немедленно влияет на `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` и другие проверки аутентификации клиентского API, использующие этот вспомогательный компонент. Если хранилище флагов функций недоступно для чтения, аутентификация клиентского API работает в режиме запрета по умолчанию и требует ключ.

## Критическое изменение — v3.8.0

Конечные точки `/api/v1/agents/tasks/*` и `/api/resilience/model-cooldowns` **теперь требуют аутентификацию управления** (коммит `588a0333`). Клиенты, ранее отправлявшие обычный API-ключ без области `manage`, получают `403`. Миграция: либо назначьте ключу область `manage` в панели API Keys, либо используйте аутентифицированный сеанс панели управления.

## Изменение поведения — v3.8.2

`/api/mcp/*` (удалённый сервер MCP) по-прежнему по умолчанию имеет уровень LOCAL_ONLY, но теперь принимает запросы не с loopback-интерфейса, если заголовок `Authorization: Bearer <api-key>` содержит область `manage`. Это исключение явно регулируется для каждого пути с помощью `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` в `src/server/authz/routeGuard.ts`; для родственного префикса LOCAL_ONLY `/api/cli-tools/runtime/*` обход намеренно НЕ разрешён, поскольку он может запускать произвольные подпроцессы. Анонимные запросы к `/api/mcp/*` не с loopback-интерфейса по-прежнему получают `403 LOCAL_ONLY` — для любого нового пути LOCAL_ONLY по умолчанию сохраняется строгий режим loopback. См. [Уровни защиты маршрутов](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестирование

- Модульные тесты: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Список разрешённых публичных маршрутов: `tests/unit/public-api-routes.test.ts`.
- Запуск отдельных тестов: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отладка

Конвейер всегда добавляет к ответам следующие заголовки:

```
x-request-id:               <идентификатор корреляции, дублируемый в телах ошибок>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Для аутентифицированных запросов заголовки вышестоящего запроса (на стороне обработчика) также содержат:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<последние 4 символа> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (необязательно)
x-omniroute-auth-scopes:    список, разделённый запятыми
```

Используйте `assertAuth(req, expectedClass)` внутри обработчиков — эта функция выбрасывает `AuthzAssertionError` с кодом `AUTHZ_NOT_INITIALIZED`, если промежуточное ПО было обойдено (это помогает выявлять регрессии конфигурации в тестах).

## См. также

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер аутентификации для каждой конечной точки
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал аудита событий аутентификации
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — три пространства имен областей видимости и каталог областей видимости инструментов MCP
- Источник: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
