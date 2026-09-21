# Account-Ban / Banned-Keyword Detection (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute сканує відповіді з помилками від постачальників на наявність сигналів, які вказують, що
**обліковий запис постачальника остаточно недоступний** (призупинений / деактивований / заблокований через порушення Умов надання послуг), і, коли
такий сигнал знайдено, переводить це підключення в **термінальний стан `banned`**, щоб воно більше
не вибиралося для запитів. Саме це налаштовує картка параметрів **Security → Banned Keywords**
("Додаткові ключові слова, які ініціюють виявлення остаточного блокування
облікового запису. Вбудовані ключові слова застосовуються завжди.").

На цій сторінці задокументовано вбудований список, процес виявлення, сферу його дії, способи безпечного
додавання власних ключових слів і відновлення позначеного підключення. Сам
термінальний стан є частиною моделі відмовостійкості — див.
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Термінальні стани").

**Джерело істини:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Вбудовані ключові слова

Ці 8 підрядків застосовуються завжди (без урахування регістру), незалежно від будь-якого власного списку:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Цей список змінюється разом зі змінами формулювань блокування в постачальників. Авторитетною
> копією є `ACCOUNT_DEACTIVATED_SIGNALS` у `open-sse/services/accountFallback.ts`;
> розглядайте наведений вище блок як знімок стану.

У тому самому файлі розміщено дві сусідні, **окремі** таблиці сигналів, які _не_ є частиною
виявлення заборонених ключових слів:

- `CREDITS_EXHAUSTED_SIGNALS` — вичерпано баланс/квоту (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → термінальний стан `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **нетермінальні**; оновлення токена може відновити роботу.

Примітка: поширені тимчасові фрази на кшталт **`rate limit`** / `429` обробляються
механізмом обмеження частоти запитів / періоду очікування підключення та **не** є сигналами блокування.

## Процес виявлення

```
відповідь із помилкою від постачальника
  → тіло перетворюється на рядок і переводиться в нижній регістр
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [пошук підрядка]
  → є збіг?
      → testStatus підключення = "banned"      (назавжди — період очікування 1 рік, автоматично не відновлюється)
      → якщо параметр `autoDisableBannedAccounts` увімкнено і `autoDisableBannedScope`
        охоплює це підключення (`all` або `subscription` для OAuth/cookie/session)
        → також isActive = false. Передплачені ключі API залишаються активними, коли область дії —
        `subscription`.
      → підключення пропускається під час вибору облікового запису (статуси комбінації QUOTA_BLOCKING)
```

- Пошук збігу є **пошуком підрядка без урахування регістру** в **тілі** відповіді
  (`isAccountDeactivated`, `accountFallback.ts`).
- Остаточне переведення в термінальний стан `banned` відбувається, якщо тіло містить сигнал блокування, за **будь-якого
  HTTP-статусу** (через `markAccountUnavailable` → `checkFallbackError`). Вужча
  мітка **`deactivated`** (`isActive=false`, коли підключення не має
  резервних ключів API) записується вбудованим шляхом `chatCore.ts` для **HTTP 401 / 403**
  (класифікованим через `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Зверніть увагу, що
  шлях `markAccountUnavailable()` записує _інший_ термінальний статус —
  **`expired`** — для того самого сигналу `ACCOUNT_DEACTIVATED` (через
  `resolveTerminalConnectionStatus`), тому те саме блокування може проявлятися як
  `deactivated` або `expired` залежно від того, який шлях обробив відповідь. (У
  старішому коментарі коду сказано «коли тіло відповіді 401 містить ці рядки» — це
  неповністю описує поточну поведінку.)
- Підключення зі статусом `banned` виключається з вибору скрізь, де фільтруються термінальні статуси
  (`isTerminalConnectionStatus`, комбінація `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Область дії — які провайдери скануються

**Усі провайдери.** Перевірка виконується в загальному конвеєрі обробки помилок,
через який проходить кожен невдалий запит до зовнішнього сервісу — вона **не**
обмежується скраперами OAuth/підписок. Отриманий термінальний стан установлюється
для кожного **підключення**, а не для кожного провайдера.

Водночас вбудовані _рядки_ орієнтовані на провайдерів підписок/OAuth із реальним
ризиком блокування (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Провайдер з API-ключем активує детектор лише тоді, коли тіло його
помилки буквально містить один із підрядків.

`autoDisableBannedScope` (`all` | `subscription`, типово `all`) визначає, чи
встановлюватиметься в разі збігу також `isActive=false`. `subscription` означає
облікові місця з авторизацією через вхід (платні підписки та безкоштовні облікові
записи, включно з вебсеансами на основі cookie). Для передплачених API-ключів
стан `testStatus=banned` усе одно записується, але вони залишаються в пулі
маршрутизації. Надійним рішенням є перевизначення для кожного провайдера та
облікового запису; глобальне перелічення — це перша реалізація.

## Власні ключові слова блокування

Додавайте або видаляйте ключові слова в розділі **Безпека → Ключові слова блокування**
(вони зберігаються як глобальне налаштування `customBannedSignals` через
`PATCH /api/settings`). Вони **додаються до** вбудованого списку, а не замінюють
його, і перезавантажуються без перезапуску після збереження (а також під час
запуску) через `setCustomBannedSignals()`. Довжина кожного ключового слова
обмежена 200 символами; обмеження на довжину масиву немає.

**⚠ Ризик хибних спрацювань — вибирайте конкретні фрази.** Виявлення виконується
за допомогою простого пошуку підрядка в усьому тілі відповіді, а збіг є
**постійним** (період відновлення — 1 рік, відновлення вручну). Надто загальне
ключове слово може заблокувати цілком справне підключення:

- **Погано:** `quota`, `limit`, `error`, `denied` — трапляються в багатьох
  тимчасових помилках.
- **Добре:** повні речення про блокування, наприклад
  `your account has been suspended for`, `account permanently banned`,
  `violation of our terms`.

Надавайте перевагу найдовшій однозначній фразі, яку провайдер повертає в разі
справжнього блокування. Якщо сумніваєтеся, спочатку перегляньте `lastError`
підключення, а потім додайте точне формулювання.

## Відновлення позначеного підключення

Термінальні стани `banned` / `deactivated` **ніколи не відновлюються автоматично**
(їх виключено з циклу проактивного відновлення — самостійно відновлюються лише
стани `unavailable` після завершення періоду очікування). Оператор повинен
явно очистити їх:

1. **Повторно протестувати підключення** — дія **Тест** на інформаційній панелі
   (`POST /api/providers/{id}/test`); успішна перевірка скидає `testStatus` до
   `active` й очищає поля помилок.
2. **Повторно автентифікуватися / відредагувати облікові дані** — для
   OAuth-провайдерів повторно виконайте процес входу / оновлення; маршрути
   створення/імпорту провайдера встановлюють `isActive = true`.
3. **Повторно ввімкнути підключення** — якщо автоматичне вимкнення встановило
   `isActive = false` (область дії `all` або `subscription` для підключення
   OAuth/cookie/сеансу), увімкніть його знову після виправлення облікового
   запису.

Окремої кнопки «очистити позначку блокування» немає — відновлення виконується
через повторне тестування, повторну автентифікацію або повторне ввімкнення
відповідно до загального правила термінальних станів у
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Ізоляція перевірок (тестування всіх моделей)

**Помилка, що виникла під час перевірки** (диспетчеризація тестування всіх
моделей / перевірки працездатності, виконана всередині `runAsProbe`), ніколи
не вилучає підключення з пулу (#9817): вона **записується для видимості**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), але пропускає
**кожну** зміну маршрутизації — періоди очікування, термінальний стан
(`banned` / `deactivated` / `credits_exhausted`), блокування для окремих моделей,
автоматичний вимикач провайдера, 5-хвилинний кеш квоти, оновлення токена OAuth
та автоматичне вимкнення. Деактивацію спричиняє лише помилка на шляху реального
запиту. Записана помилка робить позначений обліковий запис видимим на
інформаційній панелі, водночас він продовжує обслуговувати трафік.

Єдиною точкою ухвалення рішення є `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), яку перевіряє **кожне** місце, здатне
змінити стан маршрутизації через помилку, що виникла під час перевірки:

- `markAccountUnavailable` (`auth.ts`) — лише запис (`lastError` із
  необробленим текстом, `lastErrorType`, `errorCode`, `lastErrorAt`; навмисно
  **без** `backoffLevel`, який активував би автоматичне зменшення під час
  вибору та стер запис)
- `maybeAutoDisableBannedAccount` — без автоматичного вимкнення
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (лише запис,
  без термінального стану `credits_exhausted`), GEO_BLOCKED (без виключення
  на 24 години), MODEL_NOT_FOUND (без `lockModel`), перемикання на інший
  обліковий запис Codex у разі 429 (без `markCodexScopeRateLimited`, без
  збереженого `rate_limited_until`, без очищення прив’язки сеансу),
  `persistCodexQuotaState` (без запису стану квоти, без інвалідації кешу),
  `recordKeyHealthStatus` (ротатор стану ключів залишається без змін)
- Оновлення OAuth — як проактивне оновлення в базовому виконавці
  (`base.ts` `execute()`, без використання ротації токена оновлення), так і
  реактивний шлях 401/403 у `chatCore` (без деактивації `expired`)
- `chat.ts` — автоматичний вимикач провайдера та 5-хвилинний кеш квоти
  (`markAccountExhaustedFrom429`) ніколи не погіршуються

Записана помилка робить позначений обліковий запис видимим на інформаційній
панелі, водночас він продовжує обслуговувати трафік. Примітка: запис перевірки
зберігає **необроблений** (необрізаний) текст помилки, на відміну від обрізання
`slice(0,100)` на шляху реального запиту.

Оператори, які використовують тестування всіх моделей як інструмент технічного
обслуговування, можуть відновити попередню поведінку (перевірка вважається
реальною генерацією) одним із таких способів:

- налаштування `probeCanDisable` (`POST /api/settings` із
  `{"probeCanDisable": true}` або безпосереднє редагування `key_value` у БД), або
- прапорець функції **`PROBE_CAN_DISABLE=true`** (перевизначення через середовище
  або БД; має пріоритет над налаштуванням).

Відмовостійка поведінка: якщо отримання прапорця або налаштувань завершується
помилкою, ізоляція залишається ВВІМКНЕНОЮ.

## Вихідні файли

| Аспект                                                      | Файл                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Таблиці сигналів + зіставлення                              | `open-sse/services/accountFallback.ts`                                                                        |
| Терміналізація / збереження                                 | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Область автоматичного вимкнення                             | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Вбудована класифікація                                      | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Виключення відновлення термінального стану                  | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Завантаження користувацьких ключових слів під час виконання | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Інтерфейс налаштувань                                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
