# OmniRoute MCP Server Documentation (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Сервер Model Context Protocol со 110 инструментами для операций маршрутизации, кэширования, сжатия, памяти, навыков, прокси, пула, Radar и источников контекста.
>
> Источник истины: `open-sse/mcp-server/server.ts` вычисляет **110 уникальных инструментов** с помощью `countUniqueMcpTools()`: 45 канонических определений (включая шесть инструментов жизненного цикла CCR, три инструмента навыков агента, `omniroute_radar_catalog` и `omniroute_x_search`), а также инструменты памяти (3), навыков (4), навыков GitHub (3), пула (6), геймификации (8), плагинов (8), Notion (6), Obsidian (22), локального корпуса (3) и два инструмента сжатия только для RTK.

## Установка

OmniRoute MCP встроен. Запустите его командой:

```bash
omniroute --mcp
```

Или через транспорт open-sse:

```bash
# Потоковый HTTP-транспорт (порт 20130)
omniroute --dev  # MCP автоматически запускается на конечной точке /mcp
```

HTTP-транспорты (`sse` / `streamable-http`, обслуживаемые сервером панели управления в рамках того же процесса)
по умолчанию отключены, и ранее переключать их можно было только на странице `/dashboard/mcp`. Начиная с v3.8.51
CLI обладает теми же возможностями:

```bash
omniroute mcp status                                  # состояние enabled/online, транспорт, количество инструментов
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # сбрасывает активные сеансы sse/streamable-http
```

`mcp enable`/`mcp disable` отправляют PATCH-запрос для того же параметра `mcpEnabled` (и, при необходимости, `mcpTransport`),
который панель управления переключает через `/api/settings`. `mcp restart` вызывает `POST /api/mcp/restart`: он завершает
активные сеансы `sse`/`streamable-http`, чтобы следующий запрос выполнил чистую повторную инициализацию, возвращает
`409`, если MCP отключен, и `501` для транспорта `stdio` (клиенты stdio управляют собственными
подпроцессами — внутрипроцессного дескриптора для перезапуска не существует).

## Транспорты

Сервер MCP предоставляет три транспорта, использующих одну и ту же фабрику `createMcpServer()`:

| Транспорт         | Где                                           | Когда использовать                                               |
| :---------------- | :-------------------------------------------- | :--------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | Интеграции с IDE (Claude Desktop, Cursor и т. д.)                |
| `sse`             | `POST/GET /api/mcp/sse` через `httpTransport` | Браузерные клиенты и клиенты-агенты, которым нужен поток событий |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | Многосеансовые HTTP-клиенты (заголовок `mcp-session-id`)         |

Активный HTTP-транспорт (`sse` или `streamable-http`) выбирается параметром `mcpTransport`. При переключении транспорта существующие сеансы другого транспорта закрываются.

### Удалённый доступ (обход через область manage)

`/api/mcp/*` относится к уровню LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — по умолчанию доступ к нему разрешён только с loopback-хостов (`localhost`, `127.0.0.1`, `::1`). Начиная с v3.8.2 клиенты не с loopback-адресов могут подключаться, если передают `Authorization: Bearer <api-key>`, где ключ имеет область `manage`. Это единственный способ получить удалённый доступ к серверу MCP через туннель, обратный прокси или публичное имя хоста.

```bash
# Предоставьте область manage: откройте страницу API Keys панели управления и включите
# «Management Access» для ключа либо передайте POST scopes:["manage"] при создании.

# Затем подключитесь из удалённого клиента MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ключ без области manage (или отсутствие Bearer) приводит к ответу `403 LOCAL_ONLY`. Для соседнего префикса `/api/cli-tools/runtime/*` обход намеренно НЕ предусмотрен — см. [Уровни Route Guard — исключение для области manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Конфигурация IDE

См. раздел [Конфигурация клиента MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration), чтобы настроить Claude Desktop,
Cursor, Cline и совместимые клиенты MCP.

---

## Основные инструменты (14) — этап 1

| Инструмент                      | Области доступа       | Описание                                                                                                                           |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Время непрерывной работы, память, автоматические выключатели, ограничения частоты запросов, статистика кэша                        |
| `omniroute_list_combos`         | `read:combos`         | Все настроенные комбинации со стратегиями (метрики необязательны)                                                                  |
| `omniroute_get_combo_metrics`   | `read:combos`         | Метрики производительности для конкретной комбинации                                                                               |
| `omniroute_switch_combo`        | `write:combos`        | Активация или деактивация комбинации                                                                                               |
| `omniroute_create_combo`        | `write:combos`        | Создание проверенной комбинации через существующий API комбинаций                                                                  |
| `omniroute_check_quota`         | `read:quota`          | Использованная/общая квота, процент остатка, время сброса, состояние токена                                                        |
| `omniroute_route_request`       | `execute:completions` | Отправка запроса на завершение чата через маршрутизацию OmniRoute                                                                  |
| `omniroute_cost_report`         | `read:usage`          | Отчёт о затратах по периодам (сеанс/день/неделя/месяц)                                                                             |
| `omniroute_list_models_catalog` | `read:models`         | Полный каталог моделей с возможностями, состоянием и ценами                                                                        |
| `omniroute_radar_catalog`       | `read:radar`          | Локальный подписанный каталог Radar; необязательные фильтры по поставщику/семейству                                                |
| `omniroute_tool_search`         | `read:tools`          | Поиск инструментов в зарегистрированном каталоге MCP                                                                               |
| `omniroute_web_search`          | `execute:search`      | Поиск в интернете через настроенных поставщиков поиска. Не для X/Twitter.                                                          |
| `omniroute_x_search`            | `execute:search`      | Поиск в X через xAI/SuperGrok или выбор `xquik-search` для результатов API Xquik. Требуются учётные данные для выбранного бэкенда. |
| `omniroute_web_fetch`           | `execute:search`      | Получение веб-контента через настроенных поставщиков извлечения данных                                                             |

## Расширенные инструменты (11) — этап 2

| Инструмент                         | Области доступа                      | Описание                                                                                                                                                   |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Пробная симуляция маршрутизации с деревом резервных вариантов                                                                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | Бюджет сеанса с действием по снижению качества, блокировке или оповещению                                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Обновление стратегии комбинации во время выполнения (priority/weighted/auto/etc.)                                                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Применение предустановленного профиля отказоустойчивости `aggressive` / `balanced` / `conservative`                                                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Проверка каждого провайдера в комбинации с помощью реального запроса к вышестоящему сервису                                                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | Метрики по каждому провайдеру с задержкой p50/p95/p99 и состоянием автоматического выключателя                                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Рекомендация комбинации по типу задачи с учётом ограничений бюджета и задержки                                                                             |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Объяснение выбора провайдера для маршрутизации запроса (факторы оценки + резервные варианты)                                                               |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Полный снимок сеанса: стоимость, токены, основные модели/провайдеры, ошибки, контроль бюджета                                                              |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Диагностика (и при необходимости автоматическое исправление) рассинхронизации базы данных, например повреждённых ссылок на комбинации или потерянных строк |
| `omniroute_sync_pricing`           | `pricing:write`                      | Синхронизация данных о ценах из внешних источников (LiteLLM); поддерживает `dryRun`                                                                        |

## Инструменты кеширования (2)

| Инструмент              | Области доступа | Описание                                                        |
| :---------------------- | :-------------- | :-------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`    | Статистика семантического кеша, кеша промптов и идемпотентности |
| `omniroute_cache_flush` | `write:cache`   | Очистка кеша глобально или по сигнатуре/модели                  |

## Инструменты сжатия (13)

| Инструмент                          | Области доступа     | Описание                                                                                                                               |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Настройки сжатия, сводка аналитики и статистика с учётом кеша (включая метаданные `analytics.mcpDescriptionCompression`)               |
| `omniroute_compression_configure`   | `write:compression` | Настройка режима сжатия, порогового значения, целевого коэффициента, сохранения системного промпта и переключателя сжатия описаний MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Выбор активного движка (off/caveman/rtk/stacked) и интенсивности Caveman/RTK                                                           |
| `omniroute_list_compression_combos` | `read:compression`  | Список именованных комбинаций сжатия и их конвейеров движков                                                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Аналитика, сгруппированная по комбинации сжатия и движку                                                                               |
| `omniroute_ccr_store`               | `write:compression` | Сохранение изолированного содержимого вызывающей стороны в ограниченном хранилище CCR в памяти и возврат маркера со ссылкой `ccr://`   |
| `omniroute_ccr_retrieve`            | `read:compression`  | Получение содержимого CCR полностью или в режимах начала, конца, строк, grep и статистики                                              |
| `omniroute_ccr_inspect`             | `read:compression`  | Просмотр метаданных CCR, принадлежащих вызывающей стороне, без возврата содержимого                                                    |
| `omniroute_ccr_list`                | `read:compression`  | Список метаданных с пагинацией для блоков CCR, принадлежащих вызывающей стороне                                                        |
| `omniroute_ccr_delete`              | `write:compression` | Удаление блока CCR, принадлежащего вызывающей стороне                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | Отчёт об использовании памяти вызывающей стороной, счётчиках жизненного цикла и лимитах хранилища                                      |
| `omniroute_rtk_discover`            | `read:compression`  | Обнаружение повторяющегося шума в добровольно предоставленных образцах вывода RTK                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | Создание доступного для проверки черновика фильтра RTK на основе добровольно предоставленных образцов                                  |

Записи CCR хранятся только в памяти и исчезают после перезапуска. Размер каждого блока ограничен 2 МиБ, для каждого
субъекта — 16 МиБ, а для глобального хранилища — 64 МиБ. По умолчанию срок жизни записей составляет 24 часа (максимум —
семь дней). Полное получение через MCP ограничено 256 КиБ; более крупные блоки остаются доступными в
режимах диапазона и grep. Хранение, получение, перечисление, просмотр, удаление и статистика изолированы по
аутентифицированному субъекту API-ключа. Записи аудита содержат хеши и метаданные размера, но никогда не содержимое.

`omniroute_compression_status` сообщает о сжатии описаний MCP отдельно в
`analytics.mcpDescriptionCompression`. Эти значения представляют собой оценки размера метаданных для доступных для перечисления
описаний MCP (`tools`, `prompts`, `resources` и `resourceTemplates`); они не являются
данными об использовании от провайдера и помечены как `source: "mcp_metadata_estimate"`.

### Фильтр дерева доступности MCP (v3.8.0)

Помимо описанных выше инструментов сжатия, OmniRoute включает фильтр постобработки, который
сжимает **результаты работы инструментов** браузера/доступности MCP перед их возвратом
агенту. Этот фильтр сам по себе не является инструментом — он прозрачно обрабатывает любой результат инструмента, содержащий
подробный текст дерева доступности или снимка браузера (≥2000 символов).

Основные особенности:

- Сворачивает ≥30 последовательных повторяющихся строк одного уровня в сводку из начала и конца
- Сохраняет якоря `[ref=eXX]`, необходимые для Playwright/computer-use
- Жёстко обрезает слишком большой текст (>50 000 символов), добавляя подсказку по навигации
- Ожидаемая экономия: **60–80%** для полезной нагрузки снимков браузера

Конфигурация: `compression.mcpAccessibility` в глобальных настройках (миграция 056).
Реализация: `open-sse/services/compression/engines/mcpAccessibility/`.
Полная документация: [Механизмы сжатия — фильтр дерева доступности MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Сведения о модели сжатия во время выполнения, лежащей в основе этих инструментов, см. в разделах
[Механизмы сжатия](../compression/COMPRESSION_ENGINES.md) и [Сжатие RTK](../compression/RTK_COMPRESSION.md).

## Инструменты 1Proxy (3)

| Инструмент                  | Области доступа | Описание                                                                                                 |
| :-------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies`  | Получение бесплатных прокси из маркетплейса 1proxy (фильтры по протоколу, стране, качеству и количеству) |
| `omniroute_oneproxy_rotate` | `read:proxies`  | Получение следующего доступного прокси согласно стратегии (`random` / `quality` / `sequential`)          |
| `omniroute_oneproxy_stats`  | `read:proxies`  | Статистика пула, состояние синхронизации, распределение по протоколам и странам                          |

## Инструменты памяти (3)

Определены в `open-sse/mcp-server/tools/memoryTools.ts`. Аутентификация и области доступа обеспечиваются стандартным конвейером областей доступа MCP.

| Инструмент                | Области доступа | Описание                                                                                             |
| :------------------------ | :-------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`   | Поиск воспоминаний по запросу, типу или ключу API с соблюдением бюджета токенов                      |
| `omniroute_memory_add`    | `write:memory`  | Добавление новой записи в память (`factual` / `episodic` / `procedural` / `semantic`)                |
| `omniroute_memory_clear`  | `write:memory`  | Очистка воспоминаний для ключа API с возможностью фильтрации по типу или временной метке `olderThan` |

## Инструменты навыков (4)

Определены в `open-sse/mcp-server/tools/skillTools.ts`. Используют `src/lib/skills/registry` + `src/lib/skills/executor`.

| Инструмент                    | Области доступа  | Описание                                                                                               |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Вывод списка зарегистрированных навыков с необязательной фильтрацией по ключу API, имени или состоянию |
| `omniroute_skills_enable`     | `write:skills`   | Включение или отключение определённого навыка по ID                                                    |
| `omniroute_skills_execute`    | `execute:skills` | Выполнение навыка с предоставленными входными данными и возврат записи о выполнении                    |
| `omniroute_skills_executions` | `read:skills`    | Вывод списка недавней истории выполнения навыков                                                       |

## Источник контекста Notion (6)

Определён в `open-sse/mcp-server/tools/notionTools.ts`. Токен хранится в таблице `key_value` посредством `src/lib/db/notion.ts`. REST-клиент находится в `src/lib/notion/api.ts`. API настроек находится в `src/app/api/settings/notion/route.ts`. Пользовательский интерфейс панели управления находится в `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Настройте токен интеграции Notion на вкладке **Источники контекста** в панели управления Endpoint или через REST API:

```bash
# Установить токен
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Проверить состояние
curl http://localhost:20128/api/settings/notion

# Отключить
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Инструмент                   | Области доступа | Описание                                                                |
| :--------------------------- | :-------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`   | Полнотекстовый поиск по всем страницам и базам данных                   |
| `notion_get_page`            | `read:notion`   | Получение страницы по ID вместе с её свойствами                         |
| `notion_list_block_children` | `read:notion`   | Вывод списка дочерних блоков страницы или блока                         |
| `notion_query_database`      | `read:notion`   | Запрос к базе данных с фильтрами, сортировкой и пагинацией              |
| `notion_get_database`        | `read:notion`   | Получение схемы базы данных по ID                                       |
| `notion_append_blocks`       | `write:notion`  | Добавление дочерних блоков в родительский блок (не более 100 за запрос) |

## Инструменты каталога навыков агентов (3)

Определены в `open-sse/mcp-server/tools/agentSkillTools.ts`. Работают на базе `src/lib/agentSkills/catalog`. Эти инструменты предоставляют клиентам MCP и внешним агентам доступ к каталогу документации Agent Skills, содержащему 45 записей. Область доступа: `read:catalog`.

| Инструмент                        | Области доступа | Описание                                                                                                                                                                       |
| :-------------------------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog`  | Выводит список всех 45 навыков агентов с необязательными фильтрами `category` (api\|cli) и `area`; возвращает метаданные и сведения о покрытии                                 |
| `omniroute_agent_skills_get`      | `read:catalog`  | Возвращает полные метаданные и содержимое SKILL.md для одного навыка по каноническому `id`                                                                                     |
| `omniroute_agent_skills_coverage` | `read:catalog`  | Статистика покрытия: у скольких из 23 навыков API, 21 навыка CLI и 1 навыка конфигурации имеются файлы SKILL.md в файловой системе по сравнению с общим количеством в каталоге |

Полный каталог и сведения о том, как внешние агенты используют его, см. в [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Связанные фреймворки (v3.8.0)

Приведённый выше набор инструментов MCP (110 уникальных инструментов, подсчитанных с помощью `countUniqueMcpTools()`) намеренно
ограничен операциями маршрутизации, кэширования, сжатия, памяти, навыков, прокси и источников контекста во время выполнения. В v3.8.0
вместе с сервером MCP поставляются два смежных фреймворка, которые документированы отдельно:

### Облачные агенты

Облачные агенты — это выполняемые вне процесса ИИ-агенты для разработки (codex-cloud, cursor-cloud, devin, jules), подключённые к
OmniRoute через ту же модель соединения, которая используется для поставщиков LLM. Они доступны через
собственный REST-интерфейс (`/api/v1/agents/*`) и **не** являются частью каталога инструментов MCP
— вызов облачного агента не использует область доступа MCP.

- Реализация: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Жизненный цикл: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Документация: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Защитные механизмы

Защитные механизмы — это фильтры, применяемые до и после выполнения (vision-bridge, pii-masker, prompt-injection)
внутри конвейера чата. Они запускаются до достижения уровня инструментов и маршрутов MCP
и отправляют структурированные сведения о нарушениях в конвейер аудита; они не вызываются как инструменты MCP.

- Реализация: `src/lib/guardrails/`.
- Документация: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

При отладке вызова MCP, который выглядит заблокированным, проверяйте как журнал аудита MCP
(записи `scope_denied:*`), так и журнал аудита защитных механизмов — запрос может быть отклонён
защитным механизмом **до** того, как он достигнет уровня проверки областей доступа MCP.

---

## Конечные точки REST API

| Конечная точка         | Метод                 | Описание                                                                                                                 | Аутентификация                    |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| `/api/mcp/status`      | `GET`                 | Состояние сервера: сигнал работоспособности, состояние HTTP-транспорта, сводка активности аудита                         | Управление (сессия/администратор) |
| `/api/mcp/tools`       | `GET`                 | Каталог инструментов (имя, описание, области доступа, этап, исходные конечные точки)                                     | Управление                        |
| `/api/mcp/sse`         | `GET` / `POST`        | Конечная точка транспорта SSE (доступна при `mcpEnabled` + `mcpTransport === "sse"`)                                     | Ключ API + области доступа        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Потоковый HTTP-транспорт (использует заголовок `mcp-session-id`; `DELETE` завершает сессию)                              | Ключ API + области доступа        |
| `/api/mcp/audit`       | `GET`                 | Записи журнала аудита из `mcp_tool_audit` (фильтры: `limit`, `offset`, `tool`, `success`, `apiKeyId`)                    | Управление                        |
| `/api/mcp/audit/stats` | `GET`                 | Агрегированная статистика аудита (`totalCalls`, `successRate`, `avgDurationMs`, наиболее часто используемые инструменты) | Управление                        |

Исходные файлы: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Транспорты SSE и Streamable HTTP заблокированы до тех пор, пока сервер MCP не будет включён в настройках (`mcpEnabled`) и не будет выбран соответствующий `mcpTransport`. Если настроен неверный транспорт, маршрут возвращает HTTP 400 с подсказкой о необходимости изменить настройки.

---

## Аутентификация и области видимости

Инструмент MCP считывает строки областей видимости от вызывающей стороны. Эта проверка является одним из трех независимых пространств имен. Успешная проверка одним механизмом не означает успешную проверку другими. Правила описаны в разделе [Три пространства имен областей видимости](#three-scope-namespaces). Каталог инструментов находится в разделе [Области видимости инструментов MCP](#mcp-tool-scopes).

### Три пространства имен областей видимости

`manage` для ключа API, `read:compression` для инструмента MCP и `read` для токена доступа `oma_live_…` — это три разных разрешения. Вызывающие стороны, которые отправляют токен доступа `read` на изменяющий маршрут управления, получают HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Этот ранг — `scopeSatisfies`. Он не обращается к таблице MCP, и сопоставитель MCP не обращается к нему.

| Пространство имен                  | Учетные данные                                                 | Проверяющий механизм     | Успешная проверка разрешает                                    |
| :--------------------------------- | :------------------------------------------------------------- | :----------------------- | :------------------------------------------------------------- |
| Управление API-ключом              | `api_keys.scopes`                                              | `hasManageScope`         | Управление REST для этого ключа Bearer                         |
| Дополнительный API-ключ            | тот же массив, одна точная строка                              | помощник, указанный ниже | Только эта одна возможность                                    |
| Области видимости инструментов MCP | тот же массив, иначе MCP `_meta`, иначе `OMNIROUTE_MCP_SCOPES` | `scopeMatches`           | Этот инструмент, как только включено принудительное применение |
| Токен доступа                      | `oma_live_…`                                                   | `scopeSatisfies`         | Маршрут управления, метод и путь которого требуют этого ранга  |

Создание каждого учетного данных описано в разделе [Аутентификация управления](../guides/MANAGEMENT-AUTH.md).

#### Области видимости API-ключа

Один массив `api_keys.scopes` выполняет две задачи. Они используют разные функции.

**Управление REST.** `manage` и `admin` являются членами `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` — это то, что авторизует маршруты управления для этого ключа. `admin` способен управлять этими маршрутами. Слово `admin` здесь не является рангом токена доступа и не расширяется до областей видимости инструментов MCP.

**Дополнительные строки.** Каждая из них является точной проверкой членства, и каждая из них остается вне `MANAGEMENT_API_KEY_SCOPES`.

| Область видимости              | Успешная проверка разрешает                                                                                                                                                           |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | Только не-loopback `/api/mcp/` LOCAL_ONLY (`hasMcpConnectOrManageScope`). Ключ с `manage` или `admin` по-прежнему проходит эту проверку.                                              |
| `self:usage`                   | `GET /api/v1/me/status` для этого ключа (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` добавляет эту область видимости при создании (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Квоты учетной записи вышестоящего уровня внутри этой полезной нагрузки статуса (`src/lib/usage/apiKeySelfService.ts`). Маршрут статуса по-прежнему требует `self:usage`.              |
| `policy:bypass-provider-quota` | Вызовы вывода этого ключа пропускают политику квот поставщика (`hasProviderQuotaBypassScope` в `src/sse/handlers/chat.ts`).                                                           |

#### Сопоставление

Каталог — это таблица в разделе [Области видимости инструментов MCP](#mcp-tool-scopes). Не рассматривайте `MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` как этот каталог: это исходное типизированное подмножество. Более поздние инструменты объявляют дополнительные области видимости рядом с ним (`read:notion`, `read:skills`, `read:local-corpus` и остальная часть таблицы).

`evaluateToolScopes` в `open-sse/mcp-server/scopeEnforcement.ts` разрешает вызов, когда каждая требуемая область видимости соответствует некоторой предоставленной области видимости:

- `*` соответствует каждой требуемой области видимости.
- Предоставленная область видимости, заканчивающаяся на `*`, соответствует требуемой области видимости, которая начинается с префикса перед звездочкой. `read:*` соответствует `read:compression`.
- Каждая другая предоставленная область видимости соответствует только идентичной требуемой строке.

Ключ, области видимости которого `["manage"]`, не проходит `scopeMatches` для `read:compression`. Тот же вызов не проходит для `admin`, `mcp:connect`, `read` и `write`, когда это единственные предоставленные строки. Между областями видимости инструментов MCP нет иерархии, кроме конечной `*`.

Принудительное применение отключено, если `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (по умолчанию `false`). Пока оно отключено, `evaluateToolScopes` разрешает вызов и пропускает каталог. Пока оно включено, HTTP использует `api_keys.scopes` ключа Bearer в качестве `authInfo` (см. [Привязка области видимости HTTP для каждого ключа](#per-key-http-scope-binding-7895)). Если области видимости ключа не разрешаются, предоставленный набор переходит к MCP `_meta`, затем к `OMNIROUTE_MCP_SCOPES`.

#### Области видимости токена доступа

Токены `oma_live_…` (`src/lib/accessTokens/scopes.ts`) несут `read`, `write` или `admin`. `scopeSatisfies` — это ранг: `admin` охватывает `write` и `read`, а `write` охватывает `read`. Неизвестные области видимости ничего не охватывают.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) сравнивает этот ранг с `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` и `OPTIONS` требуют `read`.
- Каждый другой метод требует `write`.
- Пути в `ADMIN_SCOPE_PREFIXES` требуют `admin` для каждого метода. `/api/mcp` находится в этом списке, поэтому токен доступа `write` по-прежнему не может вызывать HTTP-интерфейс MCP.
- Пути в `ADMIN_MUTATION_PREFIXES` требуют `admin` только для мутаций.

`PATCH /api/keys/{id}` является мутацией и не входит в эти списки администраторов, поэтому токен
`read` получает 403
`Access token scope 'read' is insufficient; 'write' required.`
Токен доступа `write` или `admin` удовлетворяет этому маршруту. JWT панели управления,
токен machine-id CLI loopback и ключ API с `manage` или `admin` используют
другие ветви и не сужаются этим рангом.

Токен доступа, который проходит `scopeSatisfies` для `/api/mcp`, очистил
только шлюз управления. Вызовы инструментов по-прежнему запускают `scopeMatches`
против областей действия ключей API. Ранг токена доступа не является входными данными для `scopeMatches`.

### Области действия инструментов MCP

Применение областей действия централизовано в `open-sse/mcp-server/scopeEnforcement.ts`.
Каждый инструмент требует определенных областей действия:

| Область               | Инструменты                                                                                                                                                                               |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                         |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                                 |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                    |
| `read:quota`          | `check_quota`                                                                                                                                                                             |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                    |
| `read:models`         | `list_models_catalog`                                                                                                                                                                     |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                             |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                     |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                        |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                               |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                            |
| `read:cache`          | `cache_stats`                                                                                                                                                                             |
| `write:cache`         | `cache_flush`                                                                                                                                                                             |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                                |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                         |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                     |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                          |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                    |
| `read:memory`         | `memory_search`                                                                                                                                                                           |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                              |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                        |
| `write:skills`        | `skills_enable`                                                                                                                                                                           |
| `execute:skills`      | `skills_execute`                                                                                                                                                                          |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                          |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                   |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                                 |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                          |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                            |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                        |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                           |
| `read:obsidian`       | 13 инструментов для чтения — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 инструментов для записи — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                         |

Поддерживаются групповые области видимости: `read:*` предоставляет все области видимости для чтения, `*` предоставляет полный доступ.

### `mcp:connect` — узкая возможность маршрута (#7895)

Доступ к транспорту HTTP/SSE MCP (`/api/mcp/*`) из не-loopback требует исключения `/api/mcp/` LOCAL_ONLY (см. `docs/security/ROUTE_GUARD_TIERS.md`). Исторически это исключение принимало только ключ API с полной областью видимости `manage`/`admin` — слишком широкой для вызывающей стороны, которой нужно только общаться с MCP. Файл `src/shared/constants/managementScopes.ts` теперь экспортирует `MCP_CONNECT_SCOPE = "mcp:connect"`: аддитивную, узкую область видимости (по тому же прецеденту, что и `SELF_USAGE_SCOPE`), которая авторизует ТОЛЬКО обход `/api/mcp/` в `src/server/authz/policies/management.ts` — она не предоставляет никакого другого доступа к маршрутам управления и намеренно исключена из `MANAGEMENT_API_KEY_SCOPES`. Ключ, содержащий `manage`/`admin`, по-прежнему проходит исключение без изменений; `mcp:connect` — это альтернатива с более низкими привилегиями для удаленных вызывающих сторон, работающих только с MCP, проверяемая через `hasMcpConnectOrManageScope()`.

### Привязка области видимости HTTP к каждому ключу (#7895)

Через HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` теперь разрешает реальные `api_keys.scopes` вызывающей стороны через `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) и передает их в `transport.handleRequest(req, { authInfo })` SDK MCP, так что `extra.authInfo.scopes`, достигающие каждого вызова инструмента, отражают собственные области видимости Bearer-ключа. Метод `resolveCallerScopeContext()` из `scopeEnforcement.ts` уже отдавал приоритет `authInfo` над `_meta` и запасным вариантом `OMNIROUTE_MCP_SCOPES` из переменных окружения — это изменение лишь заполняет этот первый, наивысший приоритетный источник, который ранее не использовался через HTTP. Если ключ API не разрешается (нет заголовка, недействительный ключ), `authInfo` остается `undefined`, и разрешение переходит к существующей цепочке `meta`/env без изменений. Это НЕ меняет значение по умолчанию `OMNIROUTE_MCP_ENFORCE_SCOPES` — принудительное применение по-прежнему должно быть явно включено; это изменение лишь делает путь для каждого ключа приоритетным, как только оно включено. stdio не имеет идентификации для каждого вызывающего (см. `mcpCallerIdentity.ts`) и не затрагивается — оно остается в цепочке запасных вариантов `_meta`/env.

---

## Переменные окружения

| Переменная                              | Значение по умолчанию              | Назначение                                                                                                                                                         |
| :-------------------------------------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | Базовый URL-адрес, используемый сервером MCP при вызове внутренних API OmniRoute                                                                                   |
| `OMNIROUTE_API_KEY`                     | (пусто)                            | Ключ API, передаваемый внутренним вызовам API в виде `Authorization: Bearer`                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (включает только `"true"`) | Если включено, отсутствие областей доступа блокирует вызовы инструментов и записывает `scope_denied:<reason>` в журнал аудита                                      |
| `OMNIROUTE_MCP_SCOPES`                  | (пусто)                            | Разделённый запятыми список разрешённых областей доступа, считающихся «доступными» по умолчанию (если вызывающая сторона не указывает собственные области доступа) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (не задано = включено)             | Если задано значение `0/false/off/no`, отключает сжатие описаний MCP во время регистрации                                                                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (не задано = включено)             | Альтернативный псевдоним для указанного выше переключателя                                                                                                         |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Лимит времени до отмены внутренних управляющих запросов на чтение (работоспособность, отказоустойчивость, комбинации, квота, использование)                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Лимит времени до отмены переходов, ожидающих ответа поставщика (`route_request`, `web_search`, `web_fetch`)                                                        |
| `MCP_TOOL_DENY`                         | (не задано = без фильтра)          | Разделённые запятыми имена инструментов, исключаемых из `tools/list` (сокращение количества инструментов — см. ниже)                                               |
| `MCP_TOOL_ALLOW`                        | (не задано = без фильтра)          | Разделённые запятыми имена инструментов, которые следует оставить исключительно (режим списка разрешений — см. ниже)                                               |
| `DATA_DIR`                              | `~/.omniroute`                     | Файл пульса записывается в `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                |

---

## Сжатие описаний

Реестры инструментов, запросов и ресурсов MCP могут сжимать описания во время регистрации или получения списка, чтобы уменьшить объём метаданных, предоставляемых клиентам (и, следовательно, затраты контекста запроса). Реализация находится в `open-sse/mcp-server/descriptionCompressor.ts` и подключена к серверу MCP через `compressMcpRegistryMetadata` внутри `createMcpServer()`.

- Сжатие применяется к тексту описания с использованием набора правил Caveman (`getRulesForContext("all", "full")`) и извлечением сохраняемых блоков (фрагментов кода, блоков с ограждением и т. д.), поэтому структурное содержимое не изменяется.
- Переключение для каждого развёртывания выполняется через значение `compression.mcpDescriptionCompressionEnabled` в таблице настроек `key_value` (по умолчанию включено) — в пользовательском интерфейсе доступно как **Аналитика → Сжатие описаний MCP**.
- Переключение для всего процесса выполняется с помощью `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` или `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Статистика в реальном времени доступна через `omniroute_compression_status` в разделе `analytics.mcpDescriptionCompression` и помечается `source: "mcp_metadata_estimate"`, чтобы отличать её от фактических данных об использовании поставщика.

---

## Сокращение количества инструментов (F4.3)

Сжатие описаний уменьшает объём метаданных каждого инструмента; **сокращение количества инструментов** идёт ещё дальше, уменьшая _число_ объявляемых инструментов. Публикация меньшего количества инструментов в манифесте `tools/list` снижает затраты токенов на каждый запрос, которые несёт модель клиента из-за каталога инструментов (сжатие «уровня 5»). Реализация представляет собой чистый фильтр без состояния в `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), подключённый к циклу регистрации в `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Включается явно и по умолчанию отключено.** Фильтр запускается только тогда, когда задана хотя бы одна из двух переменных окружения; если не задана ни одна из них, все 110 инструментов объявляются без изменений.

| Переменная       | Режим                                                                                                             |
| :--------------- | :---------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Чёрный список — разделённые запятыми имена инструментов, которые всегда исключаются из `tools/list`               |
| `MCP_TOOL_ALLOW` | Список разрешённых — разделённые запятыми имена инструментов; сохраняются только они, а все остальные исключаются |

`deny` имеет приоритет над `allow`. Имена разделяются запятыми, пробелы по краям удаляются, а пустые элементы игнорируются. Примеры:

```bash
# Исключить два инструмента из каталога
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Объявить только инструменты маршрутизации и квот (режим списка разрешённых)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Как удаляются отфильтрованные инструменты:** регистрация всегда выполняется успешно; затем для инструмента, отклонённого профилем, вызывается `.disable()` у дескриптора MCP SDK, поэтому он никогда не появляется в `tools/list`, но вся связующая логика остаётся нетронутой (чистое включение/отключение без повторной регистрации). Парсер профиля — `readMcpToolProfileFromEnv(process.env)`, который возвращает `null` (без фильтрации), когда обе переменные пусты.

Более функциональная структура `ToolProfile`, лежащая в основе `reduceToolManifest`, также поддерживает фильтрацию по пересечению областей доступа (`allowScopes`, с сопоставлением по шаблону вида `read:*`) и детерминированное ограничение `maxTools`, однако для этих двух параметров во время регистрации требуется полный манифест, и сегодня они **не** доступны через переменные окружения (отслеживаемая последующая задача — перехватчик на уровне `tools/list`). Функция `estimateManifestTokens()` позволяет сравнивать затраты токенов на манифест до и после сокращения.

---

## Пульс среды выполнения

Транспорт stdio каждые 5 секунд сохраняет сведения о работоспособности в `${DATA_DIR}/runtime/mcp-heartbeat.json`. Панель управления (`/api/mcp/status`) считывает этот файл и проверяет активность PID, чтобы определить значение `online`. HTTP-транспорты вместо этого сообщают состояние через внутрипроцессную функцию `getMcpHttpStatus()` (без записи в файл).

Снимок пульса содержит:

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

## Журналирование аудита

Каждый вызов инструмента регистрируется в таблице SQLite `mcp_tool_audit` модулем `open-sse/mcp-server/audit.ts`:

- Имя инструмента, аргументы (хешированные/усечённые в соответствии с `auditLevel` конкретного инструмента), результат
- Длительность в мс, признак успеха/сбоя, сообщение об ошибке (если применимо)
- Хеш ключа API, временная метка
- Отказы из-за областей доступа регистрируются как `scope_denied:<reason>` со списком недостающих областей

Для просмотра последних вызовов используйте панель управления или REST-эндпоинты `/api/mcp/audit` и `/api/mcp/audit/stats`.

---

## Файлы

| Файл                                                                     | Назначение                                                                           |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Фабрика MCP-сервера, точка входа stdio, регистрация инструментов по областям доступа |
| `open-sse/mcp-server/httpTransport.ts`                                   | Транспорт SSE + Streamable HTTP (управление сеансами)                                |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Проверка областей доступа инструментов и определение вызывающей стороны              |
| `open-sse/mcp-server/audit.ts`                                           | Журналирование вызовов инструментов (`mcp_tool_audit`)                               |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Запись сигнала активности stdio (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Сжатие описаний для реестров инструментов, запросов и ресурсов                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Схемы Zod + реестр инструментов (`MCP_TOOLS`, 45 записей)                            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Обработчики инструментов Phase 2, кэша и 1proxy                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Обработчики инструментов сжатия                                                      |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Определения инструментов памяти (3 инструмента)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Определения инструментов навыков (4 инструмента)                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Определения инструментов источника контекста Notion (6 инструментов)                 |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Определения инструментов геймификации (8 инструментов)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Инструменты регистрации плагинов и управления ими (8 инструментов)                   |
| `src/app/api/mcp/status/route.ts`                                        | Конечная точка `/api/mcp/status`                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | Конечная точка `/api/mcp/tools`                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | Маршрут транспорта SSE `/api/mcp/sse`                                                |
| `src/app/api/mcp/stream/route.ts`                                        | Маршрут транспорта Streamable HTTP `/api/mcp/stream`                                 |
| `src/app/api/mcp/audit/route.ts`                                         | Запрос журнала аудита `/api/mcp/audit`                                               |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Агрегированные метрики аудита `/api/mcp/audit/stats`                                 |
| `src/lib/notion/api.ts`                                                  | Клиент REST API Notion (повторные попытки, тайм-аут, классификация ошибок)           |
| `src/lib/db/notion.ts`                                                   | Постоянное хранение токена Notion (таблица `key_value`)                              |
| `src/app/api/settings/notion/route.ts`                                   | API настроек Notion (GET/POST/DELETE)                                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Интерфейс управления токеном Notion                                                  |
| `tests/unit/notion-api.test.ts`                                          | Тесты клиента API Notion (7)                                                         |
| `tests/unit/notion-tools.test.ts`                                        | Тесты проверки областей доступа инструментов Notion (10)                             |
| `tests/unit/db/notion.test.mjs`                                          | Тесты модуля БД Notion (3)                                                           |
