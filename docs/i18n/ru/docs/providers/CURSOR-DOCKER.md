# Cursor Provider in Docker Environments (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Когда OmniRoute работает внутри Docker, устаревшие способы **Импортировать из Cursor IDE** /
`cursor-agent` не работают, поскольку контейнер не видит установленный на хосте Cursor.
Вместо этого используйте **Войти через Cursor** (deep-control PKCE).

## Почему импорт из IDE / CLI не работает в Docker

1. **Изоляция файловой системы** — автоматический импорт ищет Linux-пути, такие как
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _внутри_ контейнера.
   В Docker Desktop для macOS база данных IDE с хоста по умолчанию не монтируется,
   а ОС контейнера — Linux, даже если хост работает под управлением Darwin.
2. **Отсутствует бинарный файл `cursor-agent`** — официальные образы OmniRoute не содержат
   `cursor-agent`. Ранее функция «Доступные модели» запускала
   `cursor-agent --list-models` и при неудаче использовала статический каталог.
3. **Неподходящий бинарный файл** — **не** монтируйте через bind mount версию
   `cursor-agent` для macOS в Linux-контейнер. Она не запустится.

## Рекомендуемый способ: вход через Cursor

1. Откройте **Панель управления → Провайдеры → Cursor**.
2. Выберите вкладку **Войти через Cursor**.
3. Нажмите **Войти через Cursor** — OmniRoute откроет
   `https://cursor.com/loginDeepControl?…` в браузере на вашем **хосте**.
4. Подтвердите вход в браузере, затем вернитесь на панель управления. OmniRoute
   опрашивает `api2.cursor.sh/auth/poll`, пока не получит токены.
5. OmniRoute сохраняет токены **доступа и обновления** и обновляет их через
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Для этого способа не требуются Cursor IDE или `cursor-agent` внутри контейнера.

## Обнаружение моделей

При наличии подключения с выполненным входом функция **Доступные модели / Автосинхронизация**
предпочитает HTTP-каталог Cursor `AiService/AvailableModels`, используя bearer-токен подключения.
Если это не удаётся, OmniRoute всё равно пытается использовать `cursor-agent` на хосте
(при его наличии), а затем — начальный набор из статического реестра.

OmniRoute всегда предоставляет **`auto`** в каталоге (отображаемое имя — «Auto»), а также
режимы маршрутизации в стиле OpenCodex: **`auto-cost`**, **`auto-balance`** и
**`auto-intelligence`**. При передаче они сопоставляются с моделью Cursor `default`
(с параметром `optimization` в `ModelParameter` для трёх вариантов). Если лимит
использования премиум-моделей исчерпан, отдавайте предпочтение `cu/auto` — у Auto
зачастую всё ещё остаётся доступный лимит.

### После синхронизации используется исключительно актуальный каталог

После успешной синхронизации моделей Cursor (`cursor-agent --list-models` → сохранённый
синхронизированный каталог или описанный выше запрос `AvailableModels` с bearer-аутентификацией)
**панель управления**, **`/v1/models`** и список **Проверить все** отображают:

1. Модели, возвращённые актуальной синхронизацией
2. Добавленные идентификаторы автоматического маршрутизатора: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Пользовательские** модели оператора (импортированные / добавленные вручную) — они никогда не удаляются при синхронизации

Большой статический реестр в
`open-sse/config/providers/registry/cursor/` используется **только как резервный вариант
в автономном режиме**. Если синхронизированный каталог пуст (или обнаружение завершилось
неудачей), список формируется из этого реестра.

Идентификаторы с суффиксами уровня усилий (например, `claude-4.6-sonnet-high`) по-прежнему
можно **запрашивать** во время выполнения: `resolveRequestedModel` удаляет суффикс,
преобразуя его в передаваемый `ModelParameter`. Эксклюзивный список намеренно скрывает
эти статические варианты из раздела «Проверить все», чтобы проверки соответствовали
моделям, которые Cursor фактически возвращает как доступные.

### Вспомогательные функции

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — объединение для панели управления
- `ensureCursorAutoCatalogEntry` — добавление auto* при обнаружении и формировании списка
- `shouldSuppressStaticModelForExclusiveListing` — цикл статических моделей `/v1/models`

## Лимиты провайдера (квота)

Раздел **Использование → Лимиты провайдера** для Cursor использует API с bearer-аутентификацией
на `api2.cursor.sh` (`GetCurrentPeriodUsage` → сводка использования → auth/usage) после
PKCE или импорта токена. Устаревший способ через cookie/панель управления `cursor.com`
остаётся последним резервным вариантом для старых сеансов, импортированных из IDE.

Окна обычно включают **Всего**, **Auto + Composer** и **API**. Если сведения о лимитах
пусты, повторно выполните **Войти через Cursor** или заново импортируйте токены
(импорт только из IDE больше не требуется).

## Пустые ответы / исчерпание лимита

Когда Cursor принимает Run, но не возвращает текст ответа ассистента (что часто происходит
после исчерпания лимита премиум-использования), OmniRoute возвращает информативную ошибку
**429** (с указанием на квоту) или **502** с рекомендациями, а не просто
«Провайдер вернул пустое содержимое». Ошибки потоковой передачи, такие как
`not_found: AI Model Not Found` (окно использования исчерпано), классифицируются как
**превышение ограничения частоты запросов / лимита использования Cursor**, и это сообщение
сохраняется на всём протяжении конвейера SSE (общая защита от пустого потока не
перезаписывает уже отправленную ошибку). Проверьте лимиты провайдера, попробуйте модель
**`auto`** или увеличьте лимиты тарифного плана Cursor.

## Версия клиента (без графического интерфейса)

При отсутствии локально установленного `cursor-agent` OmniRoute определяет
`x-cursor-client-version` сначала через переменную окружения `CURSOR_AGENT_CLI_VERSION`,
затем через сохранённый на диске результат извлечения данных из скрипта установки Cursor,
а после этого использует закреплённый идентификатор сборки. При необходимости задайте
собственное значение через `CURSOR_AGENT_CLI_VERSION`.

## Резервный вариант: импорт токена вручную

Если вы не можете завершить вход через браузер:

1. На хосте извлеките токены из `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Откройте **Импортировать токен** в модальном окне аутентификации Cursor.
3. Вставьте **токен доступа** и, если он доступен, **токен обновления** (он необходим
   для автоматического обновления). Идентификатор машины указывать необязательно.

Импорт только токена доступа по-прежнему работает, но без токена обновления срок его действия
истечёт — выполните повторный импорт, когда чат начнёт возвращать ошибки аутентификации.

## Связанные материалы

- Руководство по Zed в Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Справочная реализация входа Cursor в OpenCodex (внешняя ссылка):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
