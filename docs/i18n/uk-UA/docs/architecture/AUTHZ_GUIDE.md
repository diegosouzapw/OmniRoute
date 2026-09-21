# Authorization Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Джерело істини:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute має конвеєр авторизації з урахуванням маршрутів, який контролює кожен API-запит. Класифікація є **детермінованою** та **закритою за замовчуванням** — усе, що неможливо класифікувати, отримує клас `MANAGEMENT` і вимагає сесії або токена рівня керування. На цій сторінці пояснюється модель для інженерів, які супроводжують маршрути або проєктують нові кінцеві точки.

![Конвеєр AuthZ (3 класи маршрутів + оцінювання політик)](../diagrams/exported/authz-pipeline.svg)

> Джерело: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режими автентифікації

### 1. API-ключ (Bearer)

Використовується для клієнтських API, сумісних з OpenAI/Anthropic/Gemini, а також для деяких маршрутів керування, коли ключ має область дії `manage`.

```
Authorization: Bearer <api-key>
```

Перевіряється функціями `isValidApiKey()` / `extractApiKey()` у `src/sse/services/auth.ts` і повторно експортується через `src/shared/utils/apiAuth.ts`. Валідатор також приймає змінні середовища `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` як постійні ключі наскрізного доступу (issue #1350).

### 2. Сесія панелі керування (cookie auth_token)

Для сторінок панелі керування та адміністративних операцій.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie є сесією лише тоді, коли JWT успішно перевірено **і** він містить `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Кожен
споживач цього cookie (захисник маршруту, оновлення конвеєра авторизації, встановлення
з’єднання WebSocket, сервер даних у реальному часі, `/api/settings/require-login`,
`/api/auth/status`) використовує цей допоміжний засіб. Існують й інші JWT, підписані
за допомогою `JWT_SECRET`: механізм наскрізного доступу Cursor CLI створює для власників
ключів токени `iss "omniroute" / aud "cursor-cli"`, які ніколи не є сесіями
(#13298).

Перевіряється функцією `isDashboardSessionAuthenticated()` у `src/shared/utils/apiAuth.ts`. Конвеєр автоматично оновлює JWT, коли до завершення його 30-денного терміну дії залишається менше ніж 7 днів.

Деякі маршрути керування приймають **будь-який** із цих режимів: cookie АБО `Bearer <key>`, якщо API-ключ має область дії `manage` (або `admin`). Саме це забезпечує робочий процес «налаштування через API-виклики», доданий у v3.8.

#### Необов’язковий шлюз входу OIDC (#6973)

Адміністративний вхід до панелі керування також підтримує **опціональний** процес OIDC (OpenID Connect)
поряд зі стандартним входом за паролем — вхід за паролем ніколи не вилучається, а лише
доповнюється:

- Вимкнено, якщо `settings.oidcEnabled !== true` **або** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` налаштовано не всі (Налаштування → Автентифікація).
  Інакше `GET /api/auth/oidc/login` повертає `400`.
- `GET /api/auth/oidc/login` визначає `authorization_endpoint` із
  `/.well-known/openid-configuration` емітента (у разі невдачі використовує
  `<issuer>/authorize`), формує URI перенаправлення на основі вхідного запиту
  (з урахуванням `x-forwarded-proto`) і перенаправляє до IdP із випадковим значенням `state`,
  збереженим у cookie `oidc_state` з атрибутом `httpOnly`.
- `GET /api/auth/oidc/callback` перевіряє `state`, обмінює код авторизації
  та перевіряє підпис ID-токена через JWKS емітента
  (`createRemoteJWKSet` із `jose`, кешований для кожного URI JWKS) із перевірками
  `issuer`/`audience`. Необов’язковий список дозволених значень `oidcAllowedSubjects`
  зіставляється з твердженням `sub` токена або його твердженням `email` — твердження
  електронної пошти враховується лише тоді, коли `email_verified === true`, тому
  неперевірена адреса електронної пошти в IdP ніколи не зможе пройти цей шлюз.
- У разі успіху створюється **точно такий самий** 30-денний JWT `auth_token`, який
  видається під час входу за паролем (`src/app/api/auth/login/route.ts`), тому решта
  конвеєра сесії панелі керування (автоматичне оновлення, атрибути cookie) залишається
  без змін — OIDC замінює лише спосіб створення cookie, а не права, які він надає.

## Класи маршрутів

`src/server/authz/types.ts` визначає три класи; будь-який маршрут, який неможливо класифікувати детерміновано, за замовчуванням належить до `MANAGEMENT`.

| Клас         | Опис                                                                                                                                                                    | Необхідна автентифікація                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `PUBLIC`     | Явно безпечні маршрути — вхід, вихід, стан, ініціалізація, перевірка працездатності, початкове налаштування.                                                            | Не потрібна                                                                |
| `CLIENT_API` | Кінцеві точки обслуговування моделей — `/api/v1/*`, `/api/v1beta/*`, а також псевдоніми `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-ключ, коли ефективний прапорець функції `REQUIRE_API_KEY` увімкнено |
| `MANAGEMENT` | Сторінки панелі керування, налаштування, провайдери, ключі, адміністративні й діагностичні кінцеві точки.                                                               | Сесія панелі керування АБО Bearer зі сферою доступу `manage`               |

## Конвеєр

```
Вхідний запит → src/proxy.ts
  → runAuthzPipeline() у src/server/authz/pipeline.ts
    1. Видалити довірені внутрішні заголовки (x-omniroute-auth-*, x-omniroute-route-class)
    2. Згенерувати ідентифікатор запиту, класифікувати маршрут через classifyRoute()
    3. Якщо pathname == "/" → переспрямувати на /dashboard
    4. Якщо триває завершення роботи (коректне завершення) і /api/* → 503
    5. Якщо не-GET /api/* → перевірка checkBodySize()
    6. Якщо OPTIONS → попередній CORS-запит 204
    7. Якщо options.enforce == false → пропустити із заголовками класу маршруту
    8. Інакше: POLICIES[routeClass].evaluate(ctx)
       - дозволено  → установити x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - відхилено → помилка JSON із correlation_id (сторінки панелі керування → 302 /login)
```

Довірені внутрішні заголовки (визначені в `src/server/authz/headers.ts`) **видаляються з вхідних запитів** перед класифікацією — клієнти не можуть заздалегідь додати `x-omniroute-auth-*`, щоб видати себе за суб’єкта.

### Контракти політик

Кожен клас маршруту має політику в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — завжди повертає `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — отримує Bearer-токен і перевіряє його через `validateApiKey()`. Перехід до анонімного доступу відбувається лише тоді, коли ефективний прапорець функції `REQUIRE_API_KEY` вимкнено. Ефективне значення прапорця визначається через `isRequireApiKeyEnabled()` (`перевизначення прапорця функції в БД > process.env.REQUIRE_API_KEY > значення за замовчуванням`), тому прапорці функцій у панелі керування та змінні середовища узгоджено керують `/api/v1/*`, `/api/v1beta/*` і псевдонімами; у разі помилок засобу визначення доступ забороняється. Дозволяє запити із сесією панелі керування до клієнтських API-маршрутів (зокрема `/api/v1/models`, який використовується каталогом моделей панелі керування).
- **`managementPolicy`** (`policies/management.ts`) — приймає сесію панелі керування, внутрішні запити синхронізації моделей (зіставлені з `/api/providers/[name]/(sync-models|models)`) або повністю пропускає перевірку, якщо `isAuthRequired()` повертає false. Повертає 403 (`AUTH_001`), коли Bearer-токен наявний, але недійсний, інакше — 401. Також застосовує рівні захисту маршрутів (LOCAL_ONLY / ALWAYS_PROTECTED) перед будь-якою гілкою автентифікації — див. [Рівні захисту маршрутів](../security/ROUTE_GUARD_TIERS.md). Шляхи LOCAL_ONLY у `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (наразі: `/api/mcp/`) можуть бути доступними не з loopback-адреси, якщо Bearer-ключ має сферу доступу `manage`; усі інші шляхи LOCAL_ONLY залишаються суворо доступними лише через loopback незалежно від сфери доступу.

Успішна політика повертає `AuthSubject` із `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Наступні обробники можуть зчитати його через `assertAuth(request, "CLIENT_API")` у `src/server/authz/assertAuth.ts` замість повторного виконання логіки автентифікації.

## Список публічних маршрутів

`src/shared/constants/publicApiRoutes.ts` є явним списком дозволених маршрутів:

Список розділено за **формою**, і цей поділ є критично важливим (GHSA-74g9-q8f6-793h): префікс зіставляється за допомогою `startsWith()`, тому він також відповідає кожному суміжному шляху, що має такі самі початкові символи.
Як префікс, `/api/usage/om-usage` робив `/api/usage/om-usage<anything>` ПУБЛІЧНИМ, а Next зіставляє це з `/api/usage/[connectionId]` — обробником без власної автентифікації.

```ts
// Справжні піддерева. Кожен запис МАЄ закінчуватися на "/" (це перевіряється модульним тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // класифікується як CLIENT_API у classify, а не як публічний маршрут "без автентифікації"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Окремі маршрути, що зіставляються ТОЧНО (з кінцевою скісною рискою або без неї).
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

// Окремі маршрути лише для читання, до яких також застосовується послаблення обмежень CORS для джерела.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Окремий маршрут лише для читання БЕЗ послаблення обмежень CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршрути лише для читання є публічними **тільки** для безпечних методів. Примітка: `classifyRoute()` виключає `/api/v1/*` і `/api/v1beta/*` із резервної класифікації PUBLIC — вони завжди мають тип `CLIENT_API`, тому політика ключів Bearer усе одно застосовується.

## Додавання нового маршруту

### Шаблон 1 — Публічна кінцева точка клієнтського API (Bearer-автентифікація)

Маршрути в `/api/v1/` і `/api/v1beta/` автоматично класифікуються як `CLIENT_API`. Проміжне ПЗ забезпечує перевірку Bearer; обробникам маршрутів не потрібно виконувати її повторно, але за потреби вони можуть отримати суб’єкт.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логіка обробника
}
```

### Шаблон 2 — Кінцева точка керування (сеанс або Bearer + manage)

Використовуйте `requireManagementAuth()` із `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логіка обробника
}
```

У разі успіху `requireManagementAuth()` повертає `null`, а в разі помилки — JSON-відповідь `Response`:

- 401 `AUTH_001` "Потрібна автентифікація" — облікові дані повністю відсутні
- 403 — недійсний Bearer **або** Bearer надано, але ключ не має області дії `manage` / `admin`

`hasManageScope(scopes)` повертає true для `"manage"` або `"admin"`.

### Шаблон 3 — Додавання до публічного списку дозволених маршрутів

Вибирайте набір за формою, а не за зручністю. Один маршрут слід додавати до `PUBLIC_API_ROUTES_EXACT` (або до `PUBLIC_READONLY_CORS_API_ROUTES`, якщо він призначений лише для GET); лише справжнє піддерево слід додавати до `PUBLIC_API_ROUTE_PREFIXES`, і воно **має закінчуватися на `/`**. Додавання окремого маршруту до списку префіксів також робить публічним кожен суміжний шлях, що має такі самі початкові символи, — включно зі спорідненими маршрутами з динамічними сегментами, доданими пізніше (GHSA-74g9-q8f6-793h). Оновіть модульні тести в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` і `tests/unit/authz/classify.test.ts`.

## Області доступу

Ключі API містять масив `scopes` (зберігається у форматі JSON у `api_keys.scopes`, див. `src/lib/db/apiKeys.ts`).

### Область керування

- `manage` / `admin` — надає ключу доступ до кінцевих точок API керування, коли його надіслано як Bearer-токен.

### Області MCP (`src/shared/constants/mcpScopes.ts`)

Кожен інструмент MCP потребує певних областей доступу через `MCP_TOOL_SCOPES`. Повний список (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Під час перевірки областей доступу в `open-sse/mcp-server/server.ts` список областей кожного інструмента передається до
`evaluateToolScopes()` після того, як `resolveCallerScopeContext()` визначить області доступу з інформації автентифікації MCP,
метаданих запиту або `OMNIROUTE_MCP_SCOPES`.

## Перемикач обов’язкової автентифікації

`isAuthRequired()` у `src/shared/utils/apiAuth.ts` визначає, чи застосовується **будь-яка** автентифікація для запиту:

- `settings.requireLogin === false` → автентифікацію глобально вимкнено.
- Якщо пароль не налаштовано **і** змінну середовища `INITIAL_PASSWORD` не задано → режим початкового налаштування дозволяє роботу майстра адаптації та запити зі зворотного інтерфейсу, але для запитів із зовнішньої мережі все одно потрібні облікові дані.
- Будь-яка помилка БД → доступ блокується (безпека за замовчуванням).

Для перевірки ключів клієнтського API використовується `isRequireApiKeyEnabled()` із `src/shared/utils/featureFlags.ts`, а не безпосереднє читання `process.env.REQUIRE_API_KEY`. Це важливо для розгорнутих екземплярів: перемикання `REQUIRE_API_KEY` у Dashboard → Feature Flags зберігає перевизначення в БД і негайно впливає на `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` та інші перевірки автентифікації клієнтського API, які використовують цей допоміжний засіб. Якщо сховище прапорців функцій неможливо прочитати, автентифікація клієнтського API блокує доступ за замовчуванням і вимагає ключ.

## Несумісна зміна — v3.8.0

Кінцеві точки `/api/v1/agents/tasks/*` і `/api/resilience/model-cooldowns` **тепер вимагають автентифікації для керування** (коміт `588a0333`). Клієнти, які раніше надсилали звичайний ключ API без області `manage`, отримують `403`. Міграція: або надайте ключу область `manage` на панелі API Keys, або скористайтеся сеансом із виконаним входом на панель керування.

## Зміна поведінки — v3.8.2

`/api/mcp/*` (віддалений сервер MCP) за замовчуванням усе ще має режим LOCAL_ONLY, але тепер приймає запити не зі зворотного інтерфейсу, якщо заголовок `Authorization: Bearer <api-key>` містить область `manage`. Цей виняток явно контролюється для кожного шляху через `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` у `src/server/authz/routeGuard.ts`; обхід для спорідненого префікса LOCAL_ONLY `/api/cli-tools/runtime/*` навмисно неможливий, оскільки він може запускати довільні підпроцеси. Анонімні запити до `/api/mcp/*` не зі зворотного інтерфейсу й надалі отримують `403 LOCAL_ONLY` — за замовчуванням будь-який новий шлях LOCAL_ONLY залишається суворо обмеженим зворотним інтерфейсом. Див. [Рівні захисту маршрутів](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестування

- Модульні тести: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Список дозволених загальнодоступних маршрутів: `tests/unit/public-api-routes.test.ts`.
- Запуск окремого тесту: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Налагодження

Конвеєр завжди додає до відповідей такі заголовки:

```
x-request-id:               <ідентифікатор кореляції, дублюється в тілах помилок>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Для автентифікованих запитів заголовки запиту до висхідного сервера (на стороні обробника) також містять:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<останні-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (необов’язково)
x-omniroute-auth-scopes:    список, розділений комами
```

Використовуйте `assertAuth(req, expectedClass)` усередині обробників — ця функція викидає виняток `AuthzAssertionError` із кодом `AUTHZ_NOT_INITIALIZED`, якщо проміжне програмне забезпечення було обійдено (це допомагає виявляти регресії конфігурації в тестах).

## Дивіться також

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер автентифікації для кожної кінцевої точки
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал аудиту подій автентифікації
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — подробиці перевірки областей доступу MCP
- Джерело: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
