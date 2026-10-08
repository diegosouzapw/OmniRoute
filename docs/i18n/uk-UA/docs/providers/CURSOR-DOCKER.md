# Cursor Provider in Docker Environments (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Коли OmniRoute працює всередині Docker, застарілі сценарії **Імпортувати з Cursor IDE** /
`cursor-agent` не працюють, оскільки контейнер не бачить інсталяцію Cursor на хості.
Натомість використовуйте **Увійти через Cursor** (PKCE із глибоким керуванням).

## Чому імпорт з IDE / CLI не працює в Docker

1. **Ізоляція файлової системи** — автоматичний імпорт шукає шляхи Linux, як-от
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _всередині_ контейнера.
   У Docker Desktop для macOS база даних IDE на хості за замовчуванням не
   монтується, а ОС контейнера — Linux, навіть якщо хост працює на Darwin.
2. **Відсутній виконуваний файл `cursor-agent`** — офіційні образи OmniRoute
   не містять `cursor-agent`. Раніше функція доступних моделей запускала
   `cursor-agent --list-models` через оболонку й у разі невдачі використовувала
   статичний каталог.
3. **Неправильний виконуваний файл** — **не** монтуйте через bind mount версію
   `cursor-agent` для macOS у контейнер Linux. Вона не виконуватиметься.

## Рекомендовано: увійдіть через Cursor

1. Відкрийте **Панель керування → Провайдери → Cursor**.
2. Виберіть вкладку **Увійти через Cursor**.
3. Натисніть **Увійти через Cursor** — OmniRoute відкриє
   `https://cursor.com/loginDeepControl?…` у браузері на вашому **хості**.
4. Підтвердьте вхід у браузері, а потім поверніться до панелі керування.
   OmniRoute опитуватиме `api2.cursor.sh/auth/poll`, доки не надійдуть токени.
5. OmniRoute зберігає токени **доступу й оновлення** та оновлює їх через
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Цей спосіб не потребує Cursor IDE або `cursor-agent` всередині контейнера.

## Виявлення моделей

За наявності авторизованого підключення функція **Доступні моделі / Автосинхронізація**
надає перевагу HTTP-каталогу Cursor `AiService/AvailableModels`, використовуючи
Bearer-токен підключення. Якщо це не вдається, OmniRoute усе одно намагається
використати `cursor-agent` на хості (якщо він наявний), а потім — початковий
статичний реєстр.

OmniRoute завжди показує **`auto`** у каталозі (відображувана назва — «Auto»),
а також режими маршрутизатора у стилі OpenCodex: **`auto-cost`**,
**`auto-balance`** і **`auto-intelligence`**. Під час передавання вони
зіставляються з моделлю Cursor `default` (із `optimization` ModelParameter
для трьох варіантів). Коли ліміт використання преміуммоделей вичерпано,
віддавайте перевагу `cu/auto` — для Auto часто ще залишається доступний ліміт.

### Після синхронізації використовується виключно актуальний каталог

Після успішної синхронізації моделей Cursor (`cursor-agent --list-models` →
збережений синхронізований каталог або наведене вище отримання `AvailableModels`
з Bearer-автентифікацією) **панель керування**, **`/v1/models`** і
**Перевірити всі** показують:

1. Моделі, повернуті актуальною синхронізацією
2. Додані ідентифікатори автоматичного маршрутизатора: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Користувацькі** моделі оператора (імпортовані / додані вручну) — вони ніколи не видаляються під час синхронізації

Великий статичний реєстр у
`open-sse/config/providers/registry/cursor/` використовується **лише як резервний
варіант офлайн**. Якщо синхронізований каталог порожній (або виявлення не
вдалося), список формується на основі цього реєстру.

Ідентифікатори із суфіксом рівня зусиль (наприклад, `claude-4.6-sonnet-high`)
усе одно можна **запитувати** під час виконання: `resolveRequestedModel`
відокремлює суфікс у передаваний ModelParameter. Виключний список навмисно
приховує ці статичні варіанти від функції «Перевірити всі», щоб перевірки
відповідали моделям, які Cursor фактично повертає як доступні.

### Допоміжні функції

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — об’єднання для панелі керування
- `ensureCursorAutoCatalogEntry` — додавання auto* під час виявлення та формування списку
- `shouldSuppressStaticModelForExclusiveListing` — цикл статичних моделей `/v1/models`

## Ліміти провайдера (квота)

Розділ **Використання → Ліміти провайдера** для Cursor використовує Bearer API
на `api2.cursor.sh` (`GetCurrentPeriodUsage` → зведення використання →
auth/usage) після PKCE або імпорту токенів. Застарілий шлях через cookie та
панель `cursor.com` залишається останнім резервним варіантом для старіших
сеансів, імпортованих з IDE.

Вікна зазвичай містять **Загалом**, **Auto + Composer** і **API**. Якщо ліміти
виглядають порожніми, повторно виконайте **Вхід через Cursor** або повторно
імпортуйте токени (імпорт лише з IDE більше не потрібен).

## Порожні відповіді / вичерпаний ліміт використання

Коли Cursor приймає Run, але не повертає тексту асистента (що часто трапляється,
коли ліміт використання преміуммоделей вичерпано), OmniRoute повертає
інформативну помилку **429** (з ознаками квоти) або **502** з рекомендаціями,
а не просто «Провайдер повернув порожній вміст». Помилки потокового передавання,
як-от `not_found: AI Model Not Found` (вичерпано ліміт у вікні використання),
класифікуються як **перевищення обмеження частоти запитів / ліміту використання
Cursor**, і це повідомлення зберігається протягом усього конвеєра SSE
(спільний захист від порожнього потоку не перезаписує вже надіслану помилку).
Перевірте ліміти провайдера, спробуйте модель **`auto`** або збільште ліміти
тарифного плану Cursor.

## Версія клієнта (без графічного інтерфейсу)

За відсутності локальної інсталяції `cursor-agent` OmniRoute визначає
`x-cursor-client-version` спочатку через змінну середовища
`CURSOR_AGENT_CLI_VERSION`, потім — через кешований на диску результат аналізу
скрипту інсталятора Cursor, а після цього — через закріплений ідентифікатор
збірки. За потреби перевизначте значення за допомогою
`CURSOR_AGENT_CLI_VERSION`.

## Резервний варіант: ручний імпорт токенів

Якщо ви не можете завершити вхід через браузер:

1. На хості витягніть токени з `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Відкрийте **Імпортувати токен** у модальному вікні автентифікації Cursor.
3. Вставте **токен доступу** та, якщо він наявний, **токен оновлення**
   (необхідний для автоматичного оновлення). Ідентифікатор машини необов’язковий.

Імпорт лише токена доступу також працює, але без токена оновлення термін його
дії завершиться — виконайте повторний імпорт, коли чат почне повертати помилки
автентифікації.

## Пов’язані матеріали

- Рекомендації щодо Zed у Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Довідка OpenCodex щодо входу через Cursor (зовнішнє посилання):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
