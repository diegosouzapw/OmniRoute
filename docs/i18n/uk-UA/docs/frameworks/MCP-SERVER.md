# OmniRoute MCP Server Documentation (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Сервер Model Context Protocol зі 110 інструментами для операцій із маршрутизацією, кешем, стисненням, пам’яттю, навичками, проксі, пулом, Radar і джерелами контексту.
>
> Джерело істини: `open-sse/mcp-server/server.ts` обчислює **110 унікальних інструментів** за допомогою `countUniqueMcpTools()`: 45 канонічних визначень (зокрема шість інструментів життєвого циклу CCR, тріо агентських навичок, `omniroute_radar_catalog` та `omniroute_x_search`), а також пам’ять (3), навички (4), навички GitHub (3), пул (6), гейміфікація (8), плагіни (8), Notion (6), Obsidian (22), локальний корпус (3) і два інструменти стиснення лише для RTK.

## Встановлення

OmniRoute MCP є вбудованим. Запустіть його так:

```bash
omniroute --mcp
```

Або через транспорт open-sse:

```bash
# Потоковий транспорт HTTP (порт 20130)
omniroute --dev  # MCP автоматично запускається на кінцевій точці /mcp
```

Транспорти HTTP (`sse` / `streamable-http`, які обслуговуються сервером інформаційної панелі в межах процесу)
за замовчуванням вимкнені, і раніше перемикати їх можна було лише на сторінці `/dashboard/mcp`. Починаючи з v3.8.51,
CLI має рівноцінні можливості:

```bash
omniroute mcp status                                  # стан enabled/online, транспорт, кількість інструментів
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # скидає активні сеанси sse/streamable-http
```

`mcp enable`/`mcp disable` надсилають PATCH-запит для того самого параметра `mcpEnabled` (і, за потреби, `mcpTransport`),
який інформаційна панель перемикає через `/api/settings`. `mcp restart` викликає `POST /api/mcp/restart`: він завершує
активні сеанси `sse`/`streamable-http`, щоб наступний запит виконав чисту повторну ініціалізацію, повертає
`409`, якщо MCP вимкнено, і `501` для транспорту `stdio` (клієнти stdio керують власним
підпроцесом — внутрішньопроцесного дескриптора для перезапуску немає).

## Транспорти

Сервер MCP надає три транспорти, які використовують ту саму фабрику `createMcpServer()`:

| Транспорт         | Де                                            | Коли використовувати                                     |
| :---------------- | :-------------------------------------------- | :------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | Інтеграції з IDE (Claude Desktop, Cursor тощо)           |
| `sse`             | `POST/GET /api/mcp/sse` через `httpTransport` | Клієнти браузерів/агентів, яким потрібен потік подій     |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | Багатосеансові HTTP-клієнти (заголовок `mcp-session-id`) |

Активний HTTP-транспорт (`sse` або `streamable-http`) вибирається параметром `mcpTransport`. Перемикання транспортів закриває наявні сеанси іншого транспорту.

### Віддалений доступ (обхід обмеження через область `manage`)

`/api/mcp/*` належить до рівня LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — за замовчуванням доступ до нього мають лише loopback-вузли (`localhost`, `127.0.0.1`, `::1`). Починаючи з v3.8.2, клієнти не з loopback-адрес можуть підключатися, якщо вони передають `Authorization: Bearer <api-key>` із ключем, що має область `manage`. Це єдиний спосіб отримати доступ до віддаленого сервера MCP через тунель, зворотний проксі або публічне ім’я хоста.

```bash
# Надайте область manage: відкрийте сторінку API Keys інформаційної панелі та ввімкніть
# "Management Access" для ключа або передайте POST scopes:["manage"] під час створення.

# Потім підключіться з віддаленого клієнта MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ключ без області `manage` (або без Bearer) повертає `403 LOCAL_ONLY`. Для спорідненого префікса `/api/cli-tools/runtime/*` обхід навмисно НЕ передбачено — див. [Рівні захисту маршрутів — виняток для області manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Конфігурація IDE

Див. [Конфігурацію клієнта MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) для налаштування Claude Desktop,
Cursor, Cline та сумісних клієнтів MCP.

---

## Основні інструменти (14) — Етап 1

| Інструмент                      | Області доступу       | Опис                                                                                                                                            |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Час безперебійної роботи, пам’ять, автоматичні вимикачі, обмеження частоти запитів, статистика кешу                                             |
| `omniroute_list_combos`         | `read:combos`         | Усі налаштовані комбінації зі стратегіями (необов’язкові метрики)                                                                               |
| `omniroute_get_combo_metrics`   | `read:combos`         | Метрики продуктивності для певної комбінації                                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | Активація або деактивація комбінації                                                                                                            |
| `omniroute_create_combo`        | `write:combos`        | Створення перевіреної комбінації через наявний API комбінацій                                                                                   |
| `omniroute_check_quota`         | `read:quota`          | Використана/загальна квота, відсоток залишку, час скидання, стан токена                                                                         |
| `omniroute_route_request`       | `execute:completions` | Надсилання запиту на завершення чату через маршрутизацію OmniRoute                                                                              |
| `omniroute_cost_report`         | `read:usage`          | Звіт про витрати за періодами (сеанс/день/тиждень/місяць)                                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | Повний каталог моделей із можливостями, станом і цінами                                                                                         |
| `omniroute_radar_catalog`       | `read:radar`          | Локальний підписаний каталог Radar; необов’язкові фільтри за постачальником/сімейством                                                          |
| `omniroute_tool_search`         | `read:tools`          | Пошук інструментів у зареєстрованому каталозі MCP                                                                                               |
| `omniroute_web_search`          | `execute:search`      | Пошук в інтернеті через налаштованих постачальників пошуку. Не для X/Twitter.                                                                   |
| `omniroute_x_search`            | `execute:search`      | Пошук у X через xAI/SuperGrok або вибір `xquik-search` для результатів API Xquik. Потребує облікових даних для вибраного серверного компонента. |
| `omniroute_web_fetch`           | `execute:search`      | Отримання вебвмісту через налаштованих постачальників                                                                                           |

## Розширені інструменти (11) — Етап 2

| Інструмент                         | Області доступу                      | Опис                                                                                                                                      |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Симуляція маршрутизації в тестовому режимі з деревом резервних варіантів                                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Бюджет сеансу з діями зниження якості, блокування або сповіщення                                                                          |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Оновлення стратегії комбінації під час виконання (priority/weighted/auto/тощо)                                                            |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Застосування попередньо налаштованого профілю відмовостійкості `aggressive` / `balanced` / `conservative`                                 |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Перевірка в реальному часі кожного постачальника в комбінації за допомогою справжнього зовнішнього виклику                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | Метрики для кожного постачальника із затримкою p50/p95/p99 і станом автоматичного вимикача                                                |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Рекомендація комбінації за типом завдання з урахуванням обмежень бюджету та затримки                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Пояснення, чому запит було спрямовано до постачальника (чинники оцінювання + резервні варіанти)                                           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Повний знімок сеансу: вартість, токени, найпопулярніші моделі/постачальники, помилки, контроль бюджету                                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Діагностика (і, за потреби, автоматичне виправлення) розбіжностей бази даних, як-от пошкоджені посилання на комбінації чи осиротілі рядки |
| `omniroute_sync_pricing`           | `pricing:write`                      | Синхронізація даних про ціни із зовнішніх джерел (LiteLLM); підтримує `dryRun`                                                            |

## Інструменти кешування (2)

| Інструмент              | Області доступу | Опис                                                           |
| :---------------------- | :-------------- | :------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`    | Статистика семантичного кешу, кешу підказок та ідемпотентності |
| `omniroute_cache_flush` | `write:cache`   | Очищення кешу глобально або за сигнатурою/моделлю              |

## Інструменти стиснення (13)

| Інструмент                          | Області доступу     | Опис                                                                                                                                        |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Налаштування стиснення, підсумок аналітики та статистика з урахуванням кешу (включно з метаданими `analytics.mcpDescriptionCompression`)    |
| `omniroute_compression_configure`   | `write:compression` | Налаштування режиму стиснення, порогового значення, цільового коефіцієнта, збереження системної підказки та перемикача стиснення описів MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Вибір активного рушія (off/caveman/rtk/stacked) та інтенсивності Caveman/RTK                                                                |
| `omniroute_list_compression_combos` | `read:compression`  | Перелік іменованих комбінацій стиснення та конвеєрів їхніх рушіїв                                                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Аналітика, згрупована за комбінацією стиснення та рушієм                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Збереження ізольованого за викликачем вмісту в обмеженому сховищі CCR у пам’яті та повернення маркера разом із посиланням `ccr://`          |
| `omniroute_ccr_retrieve`            | `read:compression`  | Отримання повного вмісту CCR або його частини в режимах head, tail, lines, grep і stats                                                     |
| `omniroute_ccr_inspect`             | `read:compression`  | Перегляд метаданих CCR, що належать викликачу, без повернення вмісту                                                                        |
| `omniroute_ccr_list`                | `read:compression`  | Виведення сторінкового переліку метаданих блоків CCR, що належать викликачу                                                                 |
| `omniroute_ccr_delete`              | `write:compression` | Видалення блока CCR, що належить викликачу                                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | Звіт про використання пам’яті в межах викликача, лічильники життєвого циклу та обмеження сховища                                            |
| `omniroute_rtk_discover`            | `read:compression`  | Виявлення повторюваного шуму в добровільно наданих зразках виведення RTK                                                                    |
| `omniroute_rtk_learn`               | `read:compression`  | Створення доступної для перевірки чернетки фільтра RTK із добровільно наданих зразків                                                       |

Записи CCR зберігаються лише в пам’яті та зникають після перезапуску. Розмір кожного блока обмежено 2 MiB, для кожного
принципала — 16 MiB, а для глобального сховища — 64 MiB. Стандартний TTL записів становить 24 години (максимум —
сім днів). Повне отримання через MCP обмежено 256 KiB; більші блоки залишаються доступними через режими
діапазонів і grep. Зберігання, отримання, формування переліку, перегляд, видалення та статистика ізольовані за
автентифікованим принципалом API-ключа. Записи аудиту містять хеші та метадані розміру, але ніколи не містять сам вміст.

`omniroute_compression_status` повідомляє про стиснення описів MCP окремо в
`analytics.mcpDescriptionCompression`. Ці значення є оцінками розміру метаданих для доступних у списках
описів MCP (`tools`, `prompts`, `resources` і `resourceTemplates`); вони не є
даними про використання від провайдера та позначаються як `source: "mcp_metadata_estimate"`.

### Фільтр дерева доступності MCP (v3.8.0)

Окремо від наведених вище інструментів стиснення OmniRoute містить фільтр постобробки, який
стискає **результати інструментів** браузерних інструментів та інструментів доступності MCP, перш ніж вони повертаються
агенту. Цей фільтр сам по собі не є інструментом — він прозоро обробляє будь-який результат інструмента, що містить
деталізований текст дерева доступності або знімка браузера (≥2000 символів).

Основні особливості:

- Згортає ≥30 послідовних повторюваних рядків одного рівня у стислий виклад із початком і кінцем
- Зберігає якорі `[ref=eXX]`, необхідні для Playwright/computer-use
- Жорстко обрізає завеликий текст (>50 000 символів), додаючи підказку щодо навігації
- Очікувана економія: **60–80%** для корисного навантаження знімків браузера

Конфігурація: `compression.mcpAccessibility` у глобальних налаштуваннях (міграція 056).
Реалізація: `open-sse/services/compression/engines/mcpAccessibility/`.
Повна документація: [Механізми стиснення — фільтр дерева доступності MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Див. [Механізми стиснення](../compression/COMPRESSION_ENGINES.md) і [Стиснення RTK](../compression/RTK_COMPRESSION.md), щоб дізнатися про
модель стиснення під час виконання, на якій базуються ці інструменти.

## Інструменти 1Proxy (3)

| Інструмент                  | Області доступу | Опис                                                                                               |
| :-------------------------- | :-------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies`  | Отримати безкоштовні проксі з маркетплейсу 1proxy (фільтри за протоколом/країною/якістю/кількістю) |
| `omniroute_oneproxy_rotate` | `read:proxies`  | Отримати наступний доступний проксі відповідно до стратегії (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies`  | Статистика пулу, стан синхронізації, розподіл за протоколом і країною                              |

## Інструменти пам’яті (3)

Визначені в `open-sse/mcp-server/tools/memoryTools.ts`. Автентифікація та області доступу контролюються через стандартний конвеєр областей доступу MCP.

| Інструмент                | Області доступу | Опис                                                                                                   |
| :------------------------ | :-------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`   | Шукати спогади за запитом / типом / ключем API із застосуванням обмеження бюджету токенів              |
| `omniroute_memory_add`    | `write:memory`  | Додати новий запис пам’яті (`factual` / `episodic` / `procedural` / `semantic`)                        |
| `omniroute_memory_clear`  | `write:memory`  | Очистити пам’ять для ключа API з необов’язковою фільтрацією за типом або часовою позначкою `olderThan` |

## Інструменти навичок (4)

Визначені в `open-sse/mcp-server/tools/skillTools.ts`. Працюють на основі `src/lib/skills/registry` + `src/lib/skills/executor`.

| Інструмент                    | Області доступу  | Опис                                                                                                    |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Показати зареєстровані навички з необов’язковою фільтрацією за ключем API, назвою або станом увімкнення |
| `omniroute_skills_enable`     | `write:skills`   | Увімкнути або вимкнути певну навичку за ID                                                              |
| `omniroute_skills_execute`    | `execute:skills` | Виконати навичку з наданими вхідними даними та повернути запис про виконання                            |
| `omniroute_skills_executions` | `read:skills`    | Показати нещодавню історію виконання навичок                                                            |

## Джерело контексту Notion (6)

Визначене в `open-sse/mcp-server/tools/notionTools.ts`. Токен зберігається в таблиці `key_value` через `src/lib/db/notion.ts`. REST-клієнт розташований у `src/lib/notion/api.ts`. API налаштувань — у `src/app/api/settings/notion/route.ts`. Інтерфейс панелі керування — у `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Налаштуйте токен інтеграції Notion на вкладці **Джерела контексту** в панелі керування Endpoint або через REST API:

```bash
# Установити токен
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Перевірити стан
curl http://localhost:20128/api/settings/notion

# Від’єднати
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Інструмент                   | Області доступу | Опис                                                                        |
| :--------------------------- | :-------------- | :-------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`   | Повнотекстовий пошук на всіх сторінках і в усіх базах даних                 |
| `notion_get_page`            | `read:notion`   | Отримати сторінку за ID разом із її властивостями                           |
| `notion_list_block_children` | `read:notion`   | Показати дочірні блоки сторінки або блока                                   |
| `notion_query_database`      | `read:notion`   | Надіслати запит до бази даних із фільтрами, сортуванням і пагінацією        |
| `notion_get_database`        | `read:notion`   | Отримати схему бази даних за ID                                             |
| `notion_append_blocks`       | `write:notion`  | Додати дочірні блоки до батьківського блока (щонайбільше 100 за один запит) |

## Інструменти каталогу навичок агентів (3)

Визначені в `open-sse/mcp-server/tools/agentSkillTools.ts`. Працюють на основі `src/lib/agentSkills/catalog`. Ці інструменти надають клієнтам MCP і зовнішнім агентам доступ до каталогу документації Agent Skills, що містить 45 записів. Область доступу: `read:catalog`.

| Інструмент                        | Області доступу | Опис                                                                                                                                                             |
| :-------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog`  | Показує всі 45 навичок агентів із необов’язковими фільтрами `category` (api\|cli) та `area`; повертає метадані й дані про покриття                               |
| `omniroute_agent_skills_get`      | `read:catalog`  | Отримує повні метадані та вміст SKILL.md для окремої навички за канонічним `id`                                                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog`  | Статистика покриття: скільки з 23 API-, 21 CLI- та 1 конфігураційної навички мають файли SKILL.md у файловій системі порівняно із загальною кількістю в каталозі |

Повний каталог та інформацію про те, як його використовують зовнішні агенти, див. у [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Пов’язані фреймворки (v3.8.0)

Наведений вище перелік інструментів MCP (110 унікальних інструментів, обчислених за допомогою `countUniqueMcpTools()`) навмисно
обмежений операціями маршрутизації, кешування, стиснення, пам’яті, навичок, проксі та джерел контексту під час виконання. Два суміжні
фреймворки постачаються разом із сервером MCP у v3.8.0 і документуються окремо:

### Хмарні агенти

Хмарні агенти — це зовнішні AI-агенти для програмування (codex-cloud, cursor-cloud, devin, jules), інтегровані в
OmniRoute через ту саму модель підключення, що використовується для постачальників LLM. Вони доступні через
власний інтерфейс REST (`/api/v1/agents/*`) і **не** є частиною каталогу інструментів MCP
— виклик хмарного агента не використовує область доступу MCP.

- Реалізація: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Життєвий цикл: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Документація: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Захисні механізми

Захисні механізми — це фільтри до/після виконання (vision-bridge, pii-masker, prompt-injection),
що застосовуються всередині конвеєра чату. Вони запускаються до досягнення рівня інструментів/маршрутів MCP
і надсилають структуровані порушення до конвеєра аудиту; вони не викликаються як інструменти MCP.

- Реалізація: `src/lib/guardrails/`.
- Документація: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Під час налагодження виклику MCP, який, схоже, заблоковано, перевірте як журнал аудиту MCP
(записи `scope_denied:*`), так і журнал аудиту захисних механізмів — запит може бути відхилено
захисним механізмом **до того**, як він досягне рівня контролю областей доступу MCP.

---

## Кінцеві точки REST API

| Кінцева точка          | Метод                 | Опис                                                                                                    | Автентифікація                  |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------------ |
| `/api/mcp/status`      | `GET`                 | Стан сервера: пульс, стан HTTP-транспорту, зведення активності аудиту                                   | Керування (сеанс/адміністратор) |
| `/api/mcp/tools`       | `GET`                 | Каталог інструментів (назва, опис, області доступу, фаза, вихідні кінцеві точки)                        | Керування                       |
| `/api/mcp/sse`         | `GET` / `POST`        | Кінцева точка транспорту SSE (доступ контролюється `mcpEnabled` + `mcpTransport === "sse"`)             | Ключ API + області доступу      |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Потоковий HTTP-транспорт (використовує заголовок `mcp-session-id`; `DELETE` завершує сеанс)             | Ключ API + області доступу      |
| `/api/mcp/audit`       | `GET`                 | Записи журналу аудиту з `mcp_tool_audit` (фільтри: `limit`, `offset`, `tool`, `success`, `apiKeyId`)    | Керування                       |
| `/api/mcp/audit/stats` | `GET`                 | Агрегована статистика аудиту (`totalCalls`, `successRate`, `avgDurationMs`, найпопулярніші інструменти) | Керування                       |

Вихідні файли: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Транспорти SSE і Streamable HTTP заблоковані, доки сервер MCP не буде ввімкнено в налаштуваннях (`mcpEnabled`) і не буде вибрано відповідний `mcpTransport`. Якщо налаштовано неправильний транспорт, маршрут повертає HTTP 400 із підказкою змінити налаштування.

---

## Автентифікація та області доступу

Інструменти MCP автентифікуються за допомогою областей доступу ключа API. Перевірка областей доступу централізована у
`open-sse/mcp-server/scopeEnforcement.ts`. Для кожного інструмента потрібні певні області доступу:

| Область дії           | Інструменти                                                                                                                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                      |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                              |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                 |
| `read:quota`          | `check_quota`                                                                                                                                                                          |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                 |
| `read:models`         | `list_models_catalog`                                                                                                                                                                  |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                          |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                  |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                     |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                            |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                         |
| `read:cache`          | `cache_stats`                                                                                                                                                                          |
| `write:cache`         | `cache_flush`                                                                                                                                                                          |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                             |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                      |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                  |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                       |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                 |
| `read:memory`         | `memory_search`                                                                                                                                                                        |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                           |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                     |
| `write:skills`        | `skills_enable`                                                                                                                                                                        |
| `execute:skills`      | `skills_execute`                                                                                                                                                                       |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                       |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                              |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                       |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                         |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                     |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                        |
| `read:obsidian`       | 13 інструментів читання — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 інструментів запису — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                      |

Підтримуються шаблонні області дії: `read:*` надає всі області читання, `*` надає повний доступ.

### `mcp:connect` — вузькоспеціалізована можливість маршруту (#7895)

Доступ до транспорту HTTP/SSE MCP (`/api/mcp/*`) не через loopback вимагає
винятку LOCAL_ONLY для `/api/mcp/` (див. `docs/security/ROUTE_GUARD_TIERS.md`). Історично
цей виняток приймав лише ключ API з повною областю дії `manage`/`admin` — надто широкою для
клієнта, якому потрібно лише взаємодіяти з MCP. `src/shared/constants/managementScopes.ts` тепер
експортує `MCP_CONNECT_SCOPE = "mcp:connect"`: додаткову вузьку область дії (за тим самим прецедентом, що й
`SELF_USAGE_SCOPE`), яка дозволяє ЛИШЕ обхід для `/api/mcp/` у
`src/server/authz/policies/management.ts` — вона не надає доступу до жодних інших маршрутів керування
та навмисно НЕ включена до `MANAGEMENT_API_KEY_SCOPES`. Ключ з областю дії `manage`/`admin`
як і раніше проходить цей виняток без змін; `mcp:connect` є альтернативою з нижчими привілеями для
віддалених клієнтів, що використовують лише MCP, і перевіряється через `hasMcpConnectOrManageScope()`.

### Прив’язування області дії HTTP для кожного ключа (#7895)

Через HTTP/SSE файл `open-sse/mcp-server/httpTransport.ts` тепер визначає фактичні
`api_keys.scopes` клієнта за допомогою `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
і передає їх до `transport.handleRequest(req, { authInfo })` SDK MCP, тому
`extra.authInfo.scopes`, що надходять до кожного виклику інструмента, відображають власні області дії Bearer-ключа.
`resolveCallerScopeContext()` з `scopeEnforcement.ts` уже надавав пріоритет `authInfo` над
`_meta` та резервним значенням змінної середовища `OMNIROUTE_MCP_SCOPES` — ця зміна лише заповнює це перше
джерело з найвищим пріоритетом, яке раніше не отримувало даних через HTTP. Якщо жоден ключ API не визначено
(немає заголовка, недійсний ключ), `authInfo` залишається `undefined`, а визначення без змін переходить до
наявного ланцюжка `meta`/env. Це НЕ змінює значення за замовчуванням для `OMNIROUTE_MCP_ENFORCE_SCOPES` —
застосування обмежень усе одно потрібно явно ввімкнути; ця зміна лише надає шляху для окремого ключа
пріоритет після його ввімкнення. stdio не має окремої ідентичності для кожного клієнта (див.
`mcpCallerIdentity.ts`) і не зазнає змін — для нього й надалі використовується резервний ланцюжок `_meta`/env.

---

## Змінні середовища

| Змінна                                  | Значення за замовчуванням         | Призначення                                                                                                                                                |
| :-------------------------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`          | Базова URL-адреса, яку сервер MCP використовує для виклику внутрішніх API OmniRoute                                                                        |
| `OMNIROUTE_API_KEY`                     | (порожнє)                         | Ключ API, що передається як `Authorization: Bearer` до внутрішніх викликів API                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (лише `"true"` вмикає це) | Якщо ввімкнено, відсутні області доступу блокують виклики інструментів, а в журналі аудиту записується `scope_denied:<reason>`                             |
| `OMNIROUTE_MCP_SCOPES`                  | (порожнє)                         | Розділений комами список дозволених областей доступу, які типово вважаються «доступними» (використовується, якщо виклик не надає власних областей доступу) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (не задано = увімкнено)           | Якщо встановлено значення `0/false/off/no`, стискання описів MCP під час реєстрації вимикається                                                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (не задано = увімкнено)           | Альтернативний псевдонім для того самого перемикача, що й вище                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                           | Ліміт часу до переривання внутрішніх керівних запитів читання (справність, стійкість, комбінації, квота, використання)                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                           | Ліміт часу до переривання переходів, які очікують на провайдера (`route_request`, `web_search`, `web_fetch`)                                               |
| `MCP_TOOL_DENY`                         | (не задано = без фільтра)         | Розділені комами назви інструментів, які потрібно вилучити з `tools/list` (зменшення кількості інструментів — див. нижче)                                  |
| `MCP_TOOL_ALLOW`                        | (не задано = без фільтра)         | Розділені комами назви інструментів, які потрібно залишити винятково (режим списку дозволених — див. нижче)                                                |
| `DATA_DIR`                              | `~/.omniroute`                    | Файл пульсу записується до `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                        |

---

## Стискання описів

Реєстри інструментів, підказок і ресурсів MCP можуть стискати описи під час реєстрації або формування списку, щоб зменшити обсяг метаданих, доступних клієнтам (і, відповідно, витрати контексту підказки). Реалізація міститься в `open-sse/mcp-server/descriptionCompressor.ts` та підключена до сервера MCP через `compressMcpRegistryMetadata` усередині `createMcpServer()`.

- Стискання застосовується до тексту опису за допомогою набору правил Caveman (`getRulesForContext("all", "full")`) із вилученням збережених блоків (фрагментів коду, огороджених блоків тощо), щоб не змінювати структурований вміст.
- Перемикайте для кожного розгортання за допомогою значення `compression.mcpDescriptionCompressionEnabled` у таблиці налаштувань `key_value` (за замовчуванням увімкнено) — у користувацькому інтерфейсі доступно як **Аналітика → Стискання описів MCP**.
- Перемикайте для всього процесу за допомогою `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` або `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Статистика в реальному часі доступна через `omniroute_compression_status` у `analytics.mcpDescriptionCompression` і позначена тегом `source: "mcp_metadata_estimate"`, щоб відрізняти її від фактичних квитанцій про використання провайдера.

---

## Зменшення кількості інструментів (F4.3)

Стиснення описів зменшує метадані кожного інструмента; **зменшення кількості інструментів** іде на крок далі, скорочуючи _кількість_ інструментів, про які взагалі оголошується. Оголошення меншої кількості інструментів у маніфесті `tools/list` знижує витрати токенів на кожен запит, які модель клієнта витрачає на каталог інструментів (стиснення «рівня 5»). Реалізація є чистим фільтром без стану в `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), інтегрованим у цикл реєстрації в `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Вмикається за бажанням, типово вимкнено.** Фільтр запускається лише тоді, коли встановлено принаймні одну з двох змінних середовища; якщо не встановлено жодної, усі 110 інструментів оголошуються без змін.

| Змінна           | Режим                                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Чорний список — розділені комами назви інструментів, які завжди вилучаються з `tools/list`             |
| `MCP_TOOL_ALLOW` | Список дозволених — розділені комами назви інструментів; залишаються лише вони, а всі інші вилучаються |

`deny` має пріоритет над `allow`. Назви розділяються комами, пробіли на початку та в кінці видаляються, а порожні елементи ігноруються. Приклади:

```bash
# Вилучити два інструменти з каталогу
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Оголосити лише інструменти маршрутизації та квот (режим списку дозволених)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Як вилучаються відфільтровані інструменти:** реєстрація завжди виконується успішно; після цього для інструмента, відхиленого профілем, викликається `.disable()` у дескрипторі MCP SDK, тож він ніколи не з’являється в `tools/list`, але зв’язування залишається незмінним (коректне ввімкнення/вимкнення без повторної реєстрації). Парсер профілю — `readMcpToolProfileFromEnv(process.env)`, який повертає `null` (без фільтрації), коли обидві змінні порожні.

Розширена структура `ToolProfile`, що лежить в основі `reduceToolManifest`, також підтримує фільтрацію за перетином областей доступу (`allowScopes`, із зіставленням за шаблоном на кшталт `read:*`) і детерміноване обмеження `maxTools`, але ці два параметри потребують повного маніфесту під час реєстрації та **наразі не** доступні через змінні середовища (підтримка перехоплення на рівні `tools/list` запланована як наступне завдання). `estimateManifestTokens()` можна використовувати для порівняння витрат токенів маніфесту до та після скорочення.

---

## Пульс середовища виконання

Транспорт stdio кожні 5 секунд записує дані про працездатність у `${DATA_DIR}/runtime/mcp-heartbeat.json`. Панель керування (`/api/mcp/status`) читає цей файл і перевіряє активність PID, щоб визначити `online`. Натомість HTTP-транспорти повідомляють стан через внутрішньопроцесний `getMcpHttpStatus()` (без запису у файл).

Знімок пульсу містить:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Журналювання аудиту

Кожен виклик інструмента записується до таблиці SQLite `mcp_tool_audit` модулем `open-sse/mcp-server/audit.ts`:

- Назва інструмента, аргументи (хешовані/скорочені відповідно до `auditLevel` кожного інструмента), результат
- Тривалість у мс, ознака успіху/помилки, повідомлення про помилку (якщо застосовно)
- Хеш ключа API, позначка часу
- Відмови через області доступу записуються як `scope_denied:<reason>` зі списком відсутніх областей доступу

Використовуйте панель керування або REST-кінцеві точки `/api/mcp/audit` і `/api/mcp/audit/stats`, щоб переглянути нещодавні виклики.

---

## Файли

| Файл                                                                     | Призначення                                                                     |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | Фабрика MCP-сервера, точка входу stdio, реєстрація інструментів з областями дії |
| `open-sse/mcp-server/httpTransport.ts`                                   | Транспорт SSE + Streamable HTTP (керування сеансами)                            |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Оцінювання областей дії інструментів і визначення викликувача                   |
| `open-sse/mcp-server/audit.ts`                                           | Журналювання аудиту викликів інструментів (`mcp_tool_audit`)                    |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Запис сигналу активності stdio (`mcp-heartbeat.json`)                           |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Стиснення описів для реєстрів інструментів / підказок / ресурсів                |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Схеми Zod + реєстр інструментів (`MCP_TOOLS`, 45 записів)                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Обробники інструментів фази 2 + кешу + 1proxy                                   |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Обробники інструментів стиснення                                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Визначення інструментів пам’яті (3 інструменти)                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Визначення інструментів навичок (4 інструменти)                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Визначення інструментів джерела контексту Notion (6 інструментів)               |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Визначення інструментів гейміфікації (8 інструментів)                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Інструменти реєстрації та керування плагінами (8 інструментів)                  |
| `src/app/api/mcp/status/route.ts`                                        | Кінцева точка `/api/mcp/status`                                                 |
| `src/app/api/mcp/tools/route.ts`                                         | Кінцева точка `/api/mcp/tools`                                                  |
| `src/app/api/mcp/sse/route.ts`                                           | Маршрут транспорту SSE `/api/mcp/sse`                                           |
| `src/app/api/mcp/stream/route.ts`                                        | Маршрут транспорту Streamable HTTP `/api/mcp/stream`                            |
| `src/app/api/mcp/audit/route.ts`                                         | Запит журналу аудиту `/api/mcp/audit`                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Агреговані метрики аудиту `/api/mcp/audit/stats`                                |
| `src/lib/notion/api.ts`                                                  | Клієнт REST API Notion (повторні спроби, тайм-аут, класифікація помилок)        |
| `src/lib/db/notion.ts`                                                   | Збереження токена Notion (таблиця `key_value`)                                  |
| `src/app/api/settings/notion/route.ts`                                   | API налаштувань Notion (GET/POST/DELETE)                                        |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Інтерфейс керування токеном Notion                                              |
| `tests/unit/notion-api.test.ts`                                          | Тести клієнта API Notion (7)                                                    |
| `tests/unit/notion-tools.test.ts`                                        | Тести дотримання областей дії інструментів Notion (10)                          |
| `tests/unit/db/notion.test.mjs`                                          | Тести модуля БД Notion (3)                                                      |
