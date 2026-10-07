# Management Authentication (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute має **чотири сімейства облікових даних**, які можуть авторизувати маршрути управління.
Вони не є взаємозамінними. Ключі API висновків (`sk-…`) **не** керують
сервером, якщо їм явно не було надано область `manage` або `admin`.

Канонічна реалізація: `src/lib/api/requireManagementAuth.ts`.

| Облікові дані              | Типова форма                         | Створено де                                               | Призначення                      | Можливості управління                                                                                    |
| -------------------------- | ------------------------------------ | --------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Сесія JWT панелі керування | cookie `auth_token`                  | Вхід на панель керування                                  | Інтерфейс браузера               | Повне управління панеллю керування, з урахуванням CSRF, локальності та правил завжди захищених маршрутів |
| Токен machine-id CLI       | внутрішній / локальний               | Завантаження CLI (`omniroute` на тій самій машині)        | Локальний CLI                    | Лише локальне управління                                                                                 |
| Токен обмеженого доступу   | `oma_live_…`                         | **Налаштування → Токени доступу** або `omniroute connect` | Віддалений CLI та API управління | Повинен відповідати необхідній області `read`, `write` або `admin` маршруту                              |
| Ключ API висновків         | `sk-…` (та інші префікси ключів API) | **Менеджер API / Ключі API**                              | `/v1/*` висновок                 | **Жодного**, якщо метадані ключа не включають `manage` або `admin`                                       |

Облікові дані `oma_` — це облікові дані для управління/CLI. Вони **не** є ключами API висновків.

Якщо вхід/авторизація за допомогою ключа API вимкнено для сервера, деякі маршрути управління можуть
приймати неаутентифіковані виклики. Локальні та завжди захищені маршрути все ще застосовують
власні правила. Тому надання одних із цих облікових даних не є універсально
обов'язковим, а володіння ними не є універсально достатнім без необхідної
області та локальності маршруту.

Пов'язано: [Віддалений режим](./REMOTE-MODE.md) (як `oma_live_…` створюється для віддаленого CLI).

---

## Матриці областей дії

Області дії для керування API-ключами та області дії access-токенів — це різні термінології.
Області дії інструментів MCP — це третя термінологія, яка перевіряється за допомогою `scopeMatches`, а не будь-якої з функцій у таблицях нижче. Поруч:
[Три простори імен областей дії](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Області дії Access-токенів (`oma_live_…`)

| Область дії | Типові операції                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `read`      | GET-запити списків/статусів, які токену дозволено бачити                                                    |
| `write`     | Мутації (створення/оновлення/видалення) нижче рівня адміністратора                                          |
| `admin`     | Повний віддалений CLI / токен підключення (за замовчуванням тут відбувається початкове завантаження пароля) |

Токен з `read` не може викликати маршрут `write`. Формат повідомлення під час виконання:
`Область дії access-токена '<have>' недостатня; потрібна '<need>'`.

### Області дії для керування API-ключами

| Область дії | Значення                                                                     |
| ----------- | ---------------------------------------------------------------------------- |
| (немає)     | Лише висновок. Маршрути керування повертають 403.                            |
| `manage`    | API керування (той самий шлюз, що й гілка API-ключа `requireManagementAuth`) |
| `admin`     | Також задовольняє `hasManageScope` (розглядається як здатний до керування)   |

Увімкніть `manage` для ключа в інтерфейсі користувача API Keys / API Manager. Не використовуйте повторно ключ клієнта чату для автоматизації, якщо ви свідомо не надали цю область дії.

---

## Як створювати та відкликати

### JWT-сесія панелі керування

1. Відкрийте `/login` і ввійдіть за допомогою пароля керування (`INITIAL_PASSWORD` під час першого запуску).
2. Файл cookie `auth_token` має атрибут HttpOnly. Панель керування в браузері використовує його автоматично.
3. Вийдіть через `/api/auth/logout`. Довготривалого секрету для копіювання немає.

### Токен ідентифікатора машини CLI

1. Запустіть `omniroute` на **тому самому хості**, що й сервер (через loopback).
2. CLI створює токен ідентифікатора машини в `~/.omniroute/` (chmod 600).
3. Це **не** працює з іншої машини. Для віддаленого CLI використовуйте токен доступу.

### Токен доступу з областю дії (`oma_live_…`)

1. Панель керування: **Налаштування → Токени доступу** → створити (ім’я + область дії). **Секрет показується лише один раз.**
2. Або CLI: `omniroute connect <host>` (пароль → токен). Див. [Віддалений режим](./REMOTE-MODE.md).
3. Заголовок: `Authorization: Bearer oma_live_…`
4. Відкличте токен на тій самій сторінці токенів доступу (або видаліть контекст CLI).
5. Сервер зберігає лише хеш. Поводьтеся з відкритим текстом як із паролем.

### Ключ API з областю дії для керування

1. Панель керування: **Менеджер API / Ключі API** → створіть або відредагуйте ключ → увімкніть `manage` (або `admin`).
2. Заголовок: `Authorization: Bearer sk-…` (фактичний префікс ключа).
3. Відкличте ключ або видаліть `manage` у тому самому інтерфейсі.
4. Для автоматизації, яка не використовує CLI, дотримуйтеся принципу найменших привілеїв: надавайте перевагу токену доступу `read` для завдань лише з GET-запитами; використовуйте `manage` для ключа API лише тоді, коли викликувач також має взаємодіяти з `/v1` та інтерфейсом керування.

---

## Формат заголовка

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Не розміщуйте облікові дані керування в шляху URL або рядку запиту. Автентифікація
для керування здійснюється лише через заголовок або cookie.

---

## Приклади для копіювання та вставлення

Лише читання (отримання списку провайдерів). Використовуйте Access Token із рівнем `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Внесення змін (створення підключення до провайдера). Використовуйте Access Token із рівнем `write`/`admin` або
API-ключ з областю доступу `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Інференс (не керування). Звичайний API-ключ, `manage` не потрібен:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Поточні помилки під час виконання (не виводьте секрети)

| Ситуація                                           | Типовий статус | Повідомлення (очищене)                                               |
| :------------------------------------------------- | :------------- | :------------------------------------------------------------------- |
| Немає облікових даних                              | 401            | `Authentication required`                                            |
| Недійсний/прострочений `oma_live_…`                | 401            | `Invalid or expired access token`                                    |
| Дійсний ключ API без `manage`/`admin`              | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Недійсний звичайний ключ API на маршруті керування | 403            | `Invalid management token`                                           |
| Область дії токена доступу занадто низька          | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Недійсний токен керування" означає, що носій **не** був прийнятий як облікові дані для керування. Це **не** вказує, яку сім'ю потрібно створити. Використовуйте таблицю вище: ключам висновків потрібна область дії `manage`; віддаленому CLI потрібен `oma_live_…`; панель керування використовує сесійний файл cookie.

---

## Рекомендований вибір з найменшими привілеями

| Виклик                                              | Використання                                          |
| :-------------------------------------------------- | :---------------------------------------------------- |
| Браузер                                             | Сесія панелі керування                                |
| CLI на хості сервера                                | Машинний токен                                        |
| CLI на ноутбуці, що взаємодіє з віддаленим сервером | `oma_live_…` з `omniroute connect`                    |
| CI / скрипти (лише керування)                       | `oma_live_…` з найменшим можливим обсягом повноважень |
| CI, що має викликати як `/v1`, так і `/api`         | Ключ API з `manage` **або** двома обліковими даними   |
