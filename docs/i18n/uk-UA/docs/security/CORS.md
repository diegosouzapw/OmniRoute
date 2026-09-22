# CORS Configuration & Security (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute керує тим, які **джерела браузера** можуть читати відповіді між джерелами,
за допомогою єдиного централізованого списку дозволів. Модель **за замовчуванням
забороняє доступ**: жодне джерело не дозволене, доки ви явно не додасте його.
На цій сторінці описано, як обробляється список дозволів, що насправді відкриває
`CORS_ALLOW_ALL=true` (і, що важливо, чого він **не** відкриває), як безпечно
налаштувати середовище розробки та робоче середовище, а також попередження під час
виконання, яке відображається на панелі керування, коли активний шаблон дозволу.

**Джерело істини:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Список дозволів застосовується один раз у
проміжному ПЗ (`src/server/authz/pipeline.ts`) — обробники окремих маршрутів не
встановлюють `Access-Control-Allow-Origin` самостійно.

## Як визначається джерело

Для кожного запиту проміжне ПЗ обчислює значення `Access-Control-Allow-Origin`
у такому порядку:

1. **`CORS_ALLOW_ALL=true`** (або застаріле `CORS_ORIGIN=*`) → повертає джерело
   виклику з `Origin` (або `*`, якщо заголовок `Origin` відсутній), додаючи
   `Vary: Origin`, щоб кеші працювали коректно. Та сама єдина точка обробки
   `applyCorsHeaders()` також додає `Vary: Accept-Encoding` до кожної відповіді
   2xx із тілом на поверхні `/v1*`/`/v1beta*`, автентифікованій токеном
   (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), щоб нижчі за потоком і
   спільні кеші могли правильно розрізняти стиснуті та нестиснуті варіанти.
2. В іншому разі `Origin` запиту нормалізується (перетворюється на нижній регістр,
   кінцева скісна риска видаляється) і порівнюється з **об’єднаним списком
   дозволів**:
   - змінна середовища **`CORS_ALLOWED_ORIGINS`** — список, розділений комами, і
   - параметр часу виконання **`corsOrigins`** (Панель керування → Безпека →
     _Дозволені джерела CORS_), переданий через `setRuntimeAllowedOrigins()` із
     `src/lib/config/runtimeSettings.ts`.
3. Збігів немає → **заголовок `Access-Control-Allow-Origin` не додається**.
   Браузер блокує читання між джерелами. Це передбачена поведінка із забороною
   за замовчуванням.

| Змінна середовища      | Значення                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV-список точних джерел, які потрібно дозволити (рекомендовано).                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → повертати будь-яке джерело (шаблон дозволу). Лише для розробки.           |
| `CORS_ORIGIN`          | Застаріла. `*` працює як `CORS_ALLOW_ALL`; одне значення додається до списку дозволів. |

## Модель загроз — що насправді відкриває `CORS_ALLOW_ALL=true`

До загального застереження OWASP («CORS із шаблоном дозволу = будь-який сайт може
викликати ваш API») варто поставитися серйозно, але в OmniRoute область впливу
**вужча, ніж у загальному випадку**, через один конкретний факт реалізації:

> **Центральна функція `applyCorsHeaders()` ніколи не додає
> `Access-Control-Allow-Credentials`.** Браузер не надасть доступу до
> _автентифікованої_ міжджерельної відповіді (що містить cookie), якщо сервер не
> надішле `Access-Control-Allow-Credentials: true`. Спільний шлях CORS в OmniRoute
> ніколи цього не робить.

Ось що це означає для кожної поверхні, навіть із `CORS_ALLOW_ALL=true`:

| Поверхня                                             | Механізм автентифікації        | Вплив CORS із шаблоном дозволу                                                                                                                                                                                                      |
| ---------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Панель керування / MANAGEMENT `/api/*`               | Сеанс на основі cookie         | Джерело повертається, але **без `Allow-Credentials`** браузер **блокує** читання з обліковими даними. Зловмисний сторонній сайт **не може прочитати** автентифіковані відповіді панелі керування, а cookie сеансу не розкривається. |
| Клієнтський API `/v1/*`, `/v1beta/*`                 | Заголовок Bearer / `x-api-key` | Уже дозволено **за задумом** (`relaxForTokenAuth`): браузери ніколи автоматично не додають `Authorization`/`x-api-key`, тому сторінка зловмисника не може надати ваш ключ. `CORS_ALLOW_ALL` не розширює цей доступ.                 |
| Загальнодоступне лише для читання (`/api/health`, …) | Немає                          | Нечутливі дані; шаблон дозволу не становить загрози.                                                                                                                                                                                |

Отже, **залишкова** область впливу `CORS_ALLOW_ALL=true` обмежується: (a)
міжджерельним **читанням** уже неавтентифікованих даних без облікових даних і (b)
дозволом на проходження **попередніх запитів** CORS на маршрутах керування, які
все одно вимагають автентифікації, недоступної для сторонньої сторінки. На
спільному шляху CORS це **не** є вектором викрадення сеансу або облікових даних.

### Один справжній виняток — `/api/v1/agents/`

Маршрути Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)
встановлюють **власні** заголовки CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) і **додають**
`Access-Control-Allow-Origin: <origin>|*` разом із
`Access-Control-Allow-Credentials: true`. Це єдина поверхня, де повернення
джерела поєднується з обліковими даними, і вона **не залежить від
`CORS_ALLOW_ALL`**. Ці маршрути автентифікуються як маршрути керування
(`requireManagementAuth`); операторам, які роблять панель керування доступною
поза локальним хостом, слід враховувати, що це єдине місце, де заголовки
відповіді дозволяють міжджерельне читання з обліковими даними. Обмеження цього
доступу явним списком дозволів відстежується окремо від цих рекомендацій щодо
CORS.

## Контрольний список для продакшену

- **Ніколи не встановлюйте `CORS_ALLOW_ALL=true` у продакшені.** Залиште цю змінну невстановленою.
- Укажіть **явний** список джерел — за допомогою змінної середовища або поля на вкладці Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Якщо OmniRoute працює за зворотним проксі-сервером / тунелем (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS — **не** єдиний засіб контролю: захист маршрутів
  loopback усе ще захищає маршрути, здатні запускати процеси (див.
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Не підробляйте
  `X-Forwarded-For: 127.0.0.1`, щоб «виправити» помилку 403; це знову відкриє клас
  уразливостей RCE, від якого захищає цей механізм.
- Перевірте стан середовища виконання: на панелі керування відображається **постійний бурштиновий банер**
  у розділі Dashboard → Security → Authorization Inventory, коли
  `CORS_ALLOW_ALL=true` активна, а `/api/settings/authz-inventory` повертає
  оболонку `cors: { allowAll, allowedOrigins }`, яку можуть опитувати засоби моніторингу.

## Зручність розробки — дозвіл певних локальних джерел

Навіть під час розробки символ підстановки потрібен рідко. Дозвольте лише ті сервери розробки, які використовуєте:

```bash
# Сервери розробки Vite (5173) і Next.js (3000), що звертаються до локального OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Джерела зіставляються без урахування регістру, а кінцева похила риска ігнорується, тому
`http://localhost:3000` і `http://localhost:3000/` є еквівалентними. Той самий CSV
можна налаштувати під час виконання в розділі **Dashboard → Security → CORS Allowed Origins** без
перезапуску.

## Ключі API і сеанси cookie

- **Bearer / `x-api-key` (поверхня інференсу `/v1/*`):** браузери ніколи не додають
  їх автоматично. CORS тут не є значущим бар’єром — бар’єром є ключ API,
  тому ця поверхня навмисно дозволяє доступ, щоб браузерні та
  Electron-клієнти могли читати відповіді, на які вони вже мають право.
- **Сеанс cookie (панель керування):** захищений стандартним режимом із забороною доступу **та**
  відсутністю `Access-Control-Allow-Credentials` у спільному шляху. Не додавайте
  джерела керування/панелі керування до будь-якої дозвільної конфігурації; для них має точно
  зберігатися стандартний режим із забороною доступу.

## Приклад: зворотний проксі-сервер перед OmniRoute

CORS застосовується самим OmniRoute, тому проксі-сервер зазвичай **не** повинен додавати або
перезаписувати заголовки `Access-Control-*` (дубльовані заголовки порушують роботу браузерів). Завершуйте TLS
і пересилайте запити — дозвольте OmniRoute відповідати на попередні запити:

```nginx
# nginx — пересилання до OmniRoute; НЕ додавайте тут Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # НЕ встановлюйте X-Forwarded-For у 127.0.0.1 — це обходить захист маршрутів loopback.
}
```

Налаштовуйте дозволені джерела браузера в OmniRoute (`CORS_ALLOWED_ORIGINS` або на
вкладці Security), а не в проксі-сервері.

## Файли вихідного коду

| Призначення                                             | Файл                                                                 |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| Визначення списку дозволених джерел + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Застосування проміжного ПЗ (єдине джерело істини)       | `src/server/authz/pipeline.ts`                                       |
| Налаштування → додавання джерел під час виконання       | `src/lib/config/runtimeSettings.ts`                                  |
| Стан середовища виконання для панелі керування          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Банер попередження на панелі керування                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Поле CORS Allowed Origins                               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS для окремих маршрутів Cloud-Agent (виняток)        | `src/lib/cloudAgent/api.ts`                                          |

## Див. також

- [Рівні захисту маршрутів](./ROUTE_GUARD_TIERS.md) — обмеження доступу лише через loopback-інтерфейс для
  маршрутів, здатних створювати процеси (окремий, взаємодоповнювальний засіб контролю).
- [Посібник з авторизації](../architecture/AUTHZ_GUIDE.md) — повний конвеєр авторизації.
