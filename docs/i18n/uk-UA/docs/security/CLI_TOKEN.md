# CLI Machine-ID Token (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Огляд

Команди OmniRoute CLI автентифікуються в локальному API керування за допомогою токена
`HMAC-SHA256(machine-id, salt)`, переданого через заголовок запиту
`x-omniroute-cli-token`.

Це дає змогу підкомандам CLI (`omniroute status`, `omniroute providers` тощо)
викликати кінцеві точки керування без необхідності щоразу вводити JWT або
пароль.

## Як це працює

1. `getMachineTokenSync()` зчитує апаратний ідентифікатор машини за допомогою `node-machine-id`
   (у разі помилки використовує порожній рядок, вимикаючи автентифікацію CLI).
2. Функція обчислює `HMAC-SHA256(machine_id, salt)` і повертає повний 64-символьний
   шістнадцятковий дайджест — детермінований, незворотний токен, прив’язаний до цієї машини.
3. CLI надсилає токен як `x-omniroute-cli-token`, лише якщо визначене
   місце призначення є явною loopback-URL-адресою (`localhost`, `127.0.0.0/8` або
   loopback IPv6). Запити, що містять токен, використовують `redirect: error`, тому локальне
   перенаправлення не може передати його до іншого джерела. Віддалені контексти натомість використовують
   токени доступу з обмеженою областю дії. Якщо отримати токен неможливо, CLI не додає заголовок,
   а `omniroute doctor` повідомляє про помилку замість того, щоб вважати порожній токен
   дійсним.
4. Сервер (`src/server/authz/policies/management.ts`) повторно обчислює
   очікуваний токен із тією самою сіллю та порівнює його за допомогою `timingSafeEqual`,
   щоб запобігти вилученню токена на основі аналізу часу виконання.

## Властивості безпеки

| Властивість                              | Докладний опис                                                                                                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Лише loopback**                        | Приймається лише тоді, коли довірена серверна позначка локальності вузла (отримана з фактичної адреси TCP-вузла) вказує на loopback. Керований клієнтом заголовок `Host` ніколи не використовується для визначення локальності. |
| **Порівняння зі сталим часом виконання** | `crypto.timingSafeEqual` запобігає атакам на основі аналізу часу виконання.                                                                                                                                                     |
| **Незворотність**                        | З вихідного значення HMAC неможливо відновити machine-id.                                                                                                                                                                       |
| **Без обходу захисту `always`**          | `isAlwaysProtectedPath()` виконується до перевірки токена CLI. `/api/shutdown` і `/api/settings/database` завжди потребують JWT.                                                                                                |
| **Неекспортованість**                    | Токен ніколи не записується на диск і не потрапляє до журналів.                                                                                                                                                                 |

## Сіль за замовчуванням (випадкова для кожної інсталяції)

Якщо `OMNIROUTE_CLI_SALT` не встановлено, сіллю є випадковий 64-символьний
шістнадцятковий рядок, який генерується один раз і зберігається у файлі
`<DATA_DIR>/cli-token-salt.json` (режим `0600`), а не літерал
`omniroute-cli-auth-v1`, доданий до репозиторію. І `getActiveSalt()` у
`src/lib/machineToken.ts`, і його дзеркальна реалізація в `bin/cli/utils/cliToken.mjs`
зчитують той самий файл, тому сервер і кожен виклик CLI у цій інсталяції використовують
однакове значення. Доданий до репозиторію літерал застосовується лише як крайній резервний
варіант, коли збережену сіль або сіль зі змінної середовища ще неможливо отримати
(наприклад, у новій інсталяції лише CLI до першого запуску сервера). Це усуває
слабке місце старого фіксованого значення за замовчуванням: `/etc/machine-id` зазвичай
доступний для читання всім користувачам, тому інакше будь-який локальний користувач міг би
отримати той самий токен для кожної інсталяції, у якій не було встановлено
`OMNIROUTE_CLI_SALT`.

## Ротація солі

Установіть `OMNIROUTE_CLI_SALT`, щоб змінити похідний токен без змін у коді — це
значення завжди має пріоритет над збереженою сіллю для конкретної інсталяції. Після ротації всі процеси CLI
на цьому комп’ютері автоматично використовуватимуть новий токен. Це корисно після
витоку списку процесів, який міг розкрити попереднє похідне значення.

```bash
# Постійна ротація (додайте до профілю оболонки)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Перевірте, що використовується новий токен
omniroute status
```

## Застарілий формат (SHA-256, 32 символи) — усе ще підтримується

До появи наведеного вище формату HMAC CLI генерував свій токен як
`SHA-256(machineId + salt).hex[0..32]` (32-символьний префікс) у
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` у `src/lib/machineToken.ts`).

Для зворотної сумісності сервер підтримує **обидва** формати: засіб перевірки формує
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` і порівнює
отриманий заголовок із кожним із них за допомогою `timingSafeEqual`
(`src/server/authz/policies/management.ts` і `src/lib/middleware/cliTokenAuth.ts`).
Отже, токен є дійсним, якщо він відповідає **або** 64-символьному дайджесту HMAC, **або** 32-символьному
застарілому префіксу SHA-256.

**Відмова від використання:** установіть `OMNIROUTE_DISABLE_CLI_TOKEN=true` (у середовищі або `.env`), щоб повністю вимкнути
механізм токенів CLI; після цього для будь-якого доступу потрібен явний ключ API. На багатокористувацьких
хостах це рекомендовано, оскільки `machine-id` визначається для пристрою (а не для користувача), і інший
користувач на тому самому хості може обчислити такий самий токен.

## Файли

| Файл                                      | Призначення                                        |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Генерування токена (`getMachineTokenSync`)         |
| `bin/cli/utils/cliToken.mjs`              | Реалізація такого самого генерування на боці CLI   |
| `<DATA_DIR>/cli-token-salt.json`          | Збережена випадкова сіль для конкретної інсталяції |
| `src/server/authz/headers.ts`             | Константа `CLI_TOKEN_HEADER`                       |
| `src/server/authz/policies/management.ts` | Перевірка на боці сервера                          |
| `src/server/authz/routeGuard.ts`          | Перевірка локального хоста (`isLoopbackHost`)      |

## Дивіться також

- `docs/security/ROUTE_GUARD_TIERS.md` — рівні захисту маршрутів
- `docs/architecture/AUTHZ_GUIDE.md` — повний конвеєр авторизації
