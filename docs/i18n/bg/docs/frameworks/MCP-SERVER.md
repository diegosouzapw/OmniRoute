# OmniRoute MCP Server Documentation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Сървър за Model Context Protocol със 110 инструмента за операции с маршрутизиране, кеш, компресия, памет, умения, прокси, пул, Radar и източници на контекст.
>
> Достоверен източник: `open-sse/mcp-server/server.ts` изчислява **110 уникални инструмента** чрез `countUniqueMcpTools()`: 45 канонични дефиниции (включително шестте инструмента за жизнения цикъл на CCR, трите инструмента за агентски умения, `omniroute_radar_catalog` и `omniroute_x_search`), плюс памет (3), умения (4), GitHub умения (3), пул (6), геймификация (8), плъгини (8), Notion (6), Obsidian (22), локален корпус (3) и два инструмента за компресия само за RTK.

## Инсталиране

OmniRoute MCP е вграден. Стартирайте го с:

```bash
omniroute --mcp
```

Или чрез транспорта open-sse:

```bash
# Поточно предаван HTTP транспорт (порт 20130)
omniroute --dev  # MCP се стартира автоматично в крайната точка /mcp
```

HTTP транспортите (`sse` / `streamable-http`, обслужвани в рамките на процеса от сървъра на таблото)
са деактивирани по подразбиране и преди можеха да се превключват само от страницата `/dashboard/mcp`. От v3.8.51
CLI предлага същите възможности:

```bash
omniroute mcp status                                  # активиран/онлайн, транспорт, брой инструменти
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # нулира активните sse/streamable-http сесии
```

`mcp enable`/`mcp disable` изпращат PATCH заявка към същата настройка `mcpEnabled` (и по избор `mcpTransport`),
която таблото превключва чрез `/api/settings`. `mcp restart` извиква `POST /api/mcp/restart`: прекратява
активните `sse`/`streamable-http` сесии, така че следващата заявка да извърши чиста повторна инициализация, връща
`409`, ако MCP е деактивиран, и `501` за транспорта `stdio` (stdio клиентите управляват собствен
подпроцес — няма манипулатор в рамките на процеса, който да бъде рестартиран).

## Транспорти

MCP сървърът предоставя три транспорта, всички базирани на една и съща фабрика `createMcpServer()`:

| Транспорт         | Къде                                         | Кога да се използва                                              |
| :---------------- | :------------------------------------------- | :--------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Интеграции с IDE (Claude Desktop, Cursor и др.)                  |
| `sse`             | `POST/GET /api/mcp/sse` чрез `httpTransport` | Клиенти за браузъри/агенти, които се нуждаят от поток от събития |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | HTTP клиенти с множество сесии (`mcp-session-id` заглавка)       |

Активният HTTP транспорт (`sse` или `streamable-http`) се избира чрез настройката `mcpTransport`. Превключването на транспортите затваря съществуващите сесии на другия транспорт.

### Отдалечен достъп (заобикаляне чрез обхвата manage)

`/api/mcp/*` е в нивото LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — по подразбиране до него имат достъп само loopback хостове (`localhost`, `127.0.0.1`, `::1`). От v3.8.2 клиентите извън loopback могат да се свързват, ако предоставят `Authorization: Bearer <api-key>`, чийто ключ включва обхвата `manage`. Това е единственият начин за достъп до отдалечения MCP сървър през тунел, обратно прокси или публично име на хост.

```bash
# Предоставяне на обхват manage: отворете страницата API Keys в таблото и включете
# „Management Access“ за ключа или изпратете POST с scopes:["manage"] при създаването му.

# След това се свържете от отдалечен MCP клиент:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ключ без обхват `manage` (или без Bearer) връща `403 LOCAL_ONLY`. Съседният префикс `/api/cli-tools/runtime/*` умишлено НЕ може да бъде заобиколен — вижте [Нива на Route Guard — изключение за обхвата manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Конфигурация на IDE

Вижте [Конфигурация на MCP клиент](../guides/SETUP_GUIDE.md#mcp-client-configuration) за настройването на Claude Desktop,
Cursor, Cline и съвместими MCP клиенти.

---

## Основни инструменти (14) — Фаза 1

| Инструмент                      | Обхвати               | Описание                                                                                                                                 |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Време на работа, памет, прекъсвачи на вериги, ограничения на заявките, статистика за кеша                                                |
| `omniroute_list_combos`         | `read:combos`         | Всички конфигурирани комбинации със стратегии (незадължителни метрики)                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | Метрики за производителността на конкретна комбинация                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | Активиране или деактивиране на комбинация                                                                                                |
| `omniroute_create_combo`        | `write:combos`        | Създаване на валидирана комбинация чрез съществуващия API за комбинации                                                                  |
| `omniroute_check_quota`         | `read:quota`          | Използвана/обща квота, оставащ процент, време за нулиране, състояние на токена                                                           |
| `omniroute_route_request`       | `execute:completions` | Изпращане на заявка за завършване на чат чрез маршрутизирането на OmniRoute                                                              |
| `omniroute_cost_report`         | `read:usage`          | Отчет за разходите по периоди (сесия/ден/седмица/месец)                                                                                  |
| `omniroute_list_models_catalog` | `read:models`         | Пълен каталог с модели, включващ възможности, състояние и цени                                                                           |
| `omniroute_radar_catalog`       | `read:radar`          | Локален подписан каталог Radar; незадължителни филтри по доставчик/семейство                                                             |
| `omniroute_tool_search`         | `read:tools`          | Откриване на инструменти от регистрирания MCP каталог                                                                                    |
| `omniroute_web_search`          | `execute:search`      | Търсене в мрежата чрез конфигурираните доставчици за търсене. Не поддържа X/Twitter.                                                     |
| `omniroute_x_search`            | `execute:search`      | Търсене в X чрез xAI/SuperGrok или избор на `xquik-search` за резултати от Xquik API. Изисква идентификационни данни за избрания бекенд. |
| `omniroute_web_fetch`           | `execute:search`      | Извличане на уеб съдържание чрез конфигурираните доставчици за извличане                                                                 |

## Разширени инструменти (11) — Фаза 2

| Инструмент                         | Обхвати                              | Описание                                                                                                                                  |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Симулация на маршрутизирането без реално изпълнение с дърво за резервно превключване                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Бюджет за сесията с действие за понижаване, блокиране или предупреждение                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Актуализиране на стратегията на комбинацията по време на изпълнение (приоритетна/претеглена/автоматична и т.н.)                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Прилагане на предварително зададен профил за устойчивост: `aggressive` / `balanced` / `conservative`                                      |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Тест в реално време на всеки доставчик в комбинация чрез действителна заявка към външна услуга                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Метрики по доставчици със закъснение p50/p95/p99 и състояние на автоматичния прекъсвач                                                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Препоръчване на комбинация според типа задача с ограничения за бюджет и закъснение                                                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Обяснение защо заявката е маршрутизирана към даден доставчик (фактори за оценяване + резервни варианти)                                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Пълна моментна снимка на сесията: разходи, токени, водещи модели/доставчици, грешки, защита на бюджета                                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Диагностика (и по избор автоматично поправяне) на несъответствия в базата данни, като повредени препратки към комбинации/осиротели редове |
| `omniroute_sync_pricing`           | `pricing:write`                      | Синхронизиране на ценови данни от външни източници (LiteLLM); поддържа `dryRun`                                                           |

## Инструменти за кеширане (2)

| Инструмент              | Обхвати       | Описание                                                          |
| :---------------------- | :------------ | :---------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Статистики за семантичния кеш, кеша за подкани и идемпотентността |
| `omniroute_cache_flush` | `write:cache` | Изчистване на кеша глобално или по сигнатура/модел                |

## Инструменти за компресиране (13)

| Инструмент                          | Обхвати             | Описание                                                                                                                                                 |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Настройки за компресиране, обобщение на анализите и статистики, отчитащи кеша (включва метаданни `analytics.mcpDescriptionCompression`)                  |
| `omniroute_compression_configure`   | `write:compression` | Конфигуриране на режима на компресиране, прага, целевото съотношение, запазването на системната подкана и превключвателя за компресиране на MCP описания |
| `omniroute_set_compression_engine`  | `write:compression` | Избор на активния механизъм (off/caveman/rtk/stacked) и интензитета на Caveman/RTK                                                                       |
| `omniroute_list_compression_combos` | `read:compression`  | Изброяване на именуваните комбинации за компресиране и техните конвейери от механизми                                                                    |
| `omniroute_compression_combo_stats` | `read:compression`  | Анализи, групирани по комбинация за компресиране и механизъм                                                                                             |
| `omniroute_ccr_store`               | `write:compression` | Съхраняване на изолирано по извикващ съдържание в ограничения CCR склад в паметта и връщане на маркер и препратка `ccr://`                               |
| `omniroute_ccr_retrieve`            | `read:compression`  | Извличане на CCR съдържание изцяло или чрез режимите за начало, край, редове, grep и статистики                                                          |
| `omniroute_ccr_inspect`             | `read:compression`  | Проверка на притежаваните от извикващия CCR метаданни без връщане на съдържание                                                                          |
| `omniroute_ccr_list`                | `read:compression`  | Изброяване със страниране на метаданните за притежаваните от извикващия CCR блокове                                                                      |
| `omniroute_ccr_delete`              | `write:compression` | Изтриване на притежаван от извикващия CCR блок                                                                                                           |
| `omniroute_ccr_stats`               | `read:compression`  | Отчитане на използването на паметта за извикващия, броячите за жизнения цикъл и ограниченията на хранилището                                             |
| `omniroute_rtk_discover`            | `read:compression`  | Откриване на повтарящ се шум в доброволно предоставени RTK изходни извадки                                                                               |
| `omniroute_rtk_learn`               | `read:compression`  | Генериране на подлежаща на преглед чернова на RTK филтър от доброволно предоставени извадки                                                              |

CCR записите се съхраняват само в паметта и изчезват при рестартиране. Всеки блок е ограничен до 2 MiB, всеки
субект — до 16 MiB, а глобалното хранилище — до 64 MiB. По подразбиране записите имат 24-часов TTL (максимум
седем дни). Пълното извличане чрез MCP е ограничено до 256 KiB; по-големите блокове остават достъпни чрез
режимите за диапазон и grep. Съхранението, извличането, изброяването, проверката, изтриването и статистиките са изолирани според
удостоверения чрез API ключ субект. Одитните записи съдържат хешове и метаданни за размера, но никога съдържанието.

`omniroute_compression_status` отчита компресирането на MCP описания отделно в
`analytics.mcpDescriptionCompression`. Тези стойности са приблизителни оценки за размера на метаданните на
описанията, които могат да бъдат изброени от MCP (`tools`, `prompts`, `resources` и `resourceTemplates`); те не са отчети
за използването от доставчика и са маркирани със `source: "mcp_metadata_estimate"`.

### Филтър за дървото за достъпност на MCP (v3.8.0)

Отделно от инструментите за компресиране по-горе, OmniRoute включва филтър след изпълнение, който
компресира **резултатите от инструментите** на MCP инструменти за браузъри/достъпност, преди да бъдат върнати на
агента. Този филтър сам по себе си не е инструмент — той се изпълнява прозрачно за всеки резултат от инструмент, който съдържа
подробен текст от дърво за достъпност или моментна снимка на браузър (≥2000 знака).

Основни поведения:

- Свива ≥30 последователни повтарящи се сродни реда в обобщение с началото + края
- Запазва опорните маркери `[ref=eXX]`, изисквани от Playwright/computer-use
- Принудително съкращава прекалено голям текст (>50 000 знака) с подсказка за навигация
- Очаквани икономии: **60–80%** при полезния товар на моментни снимки от браузъра

Конфигурация: `compression.mcpAccessibility` в глобалните настройки (миграция 056).
Имплементация: `open-sse/services/compression/engines/mcpAccessibility/`.
Пълна документация: [Механизми за компресиране — филтър за дървото за достъпност на MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Вижте [Механизми за компресиране](../compression/COMPRESSION_ENGINES.md) и [RTK компресиране](../compression/RTK_COMPRESSION.md) за
модела за компресиране по време на изпълнение, който стои зад тези инструменти.

## Инструменти на 1Proxy (3)

| Инструмент                  | Обхвати        | Описание                                                                                        |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Извличане на безплатни проксита от пазара на 1proxy (филтри за протокол/държава/качество/лимит) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Получаване на следващото налично прокси според стратегия (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | Статистика за пула, състояние на синхронизацията и разпределение по протокол и държава          |

## Инструменти за памет (3)

Дефинирани в `open-sse/mcp-server/tools/memoryTools.ts`. Удостоверяването/обхватът се прилага чрез стандартния механизъм за MCP обхвати.

| Инструмент                | Обхвати        | Описание                                                                                             |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Търсене в спомените по заявка / тип / API ключ с прилагане на ограничение за бюджета от токени       |
| `omniroute_memory_add`    | `write:memory` | Добавяне на нов запис в паметта (`factual` / `episodic` / `procedural` / `semantic`)                 |
| `omniroute_memory_clear`  | `write:memory` | Изчистване на спомените за API ключ, с възможност за филтриране по тип или времеви печат `olderThan` |

## Инструменти за умения (4)

Дефинирани в `open-sse/mcp-server/tools/skillTools.ts`. Поддържани от `src/lib/skills/registry` + `src/lib/skills/executor`.

| Инструмент                    | Обхвати          | Описание                                                                                                     |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Изброяване на регистрираните умения с незадължително филтриране по API ключ, име или състояние на активиране |
| `omniroute_skills_enable`     | `write:skills`   | Активиране или деактивиране на конкретно умение по ID                                                        |
| `omniroute_skills_execute`    | `execute:skills` | Изпълнение на умение с предоставени входни данни и връщане на записа за изпълнението                         |
| `omniroute_skills_executions` | `read:skills`    | Изброяване на скорошната хронология на изпълненията на умения                                                |

## Източник на контекст Notion (6)

Дефинирани в `open-sse/mcp-server/tools/notionTools.ts`. Токенът се съхранява в таблицата `key_value` чрез `src/lib/db/notion.ts`. REST клиентът се намира в `src/lib/notion/api.ts`. API за настройките се намира в `src/app/api/settings/notion/route.ts`. Потребителският интерфейс на таблото се намира в `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Конфигурирайте токена за интеграция с Notion от раздела **Източници на контекст** в таблото на крайната точка или чрез REST API:

```bash
# Задаване на токен
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Проверка на състоянието
curl http://localhost:20128/api/settings/notion

# Прекъсване на връзката
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Инструмент                   | Обхвати        | Описание                                                                 |
| :--------------------------- | :------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Пълнотекстово търсене във всички страници и бази данни                   |
| `notion_get_page`            | `read:notion`  | Получаване на страница по ID заедно с нейните свойства                   |
| `notion_list_block_children` | `read:notion`  | Изброяване на дъщерните блокове на страница или блок                     |
| `notion_query_database`      | `read:notion`  | Заявка към база данни с филтри, сортиране и страниране                   |
| `notion_get_database`        | `read:notion`  | Получаване на схемата на база данни по ID                                |
| `notion_append_blocks`       | `write:notion` | Добавяне на дъщерни блокове към родителски блок (максимум 100 на заявка) |

## Инструменти за каталога с умения на агенти (3)

Дефинирани в `open-sse/mcp-server/tools/agentSkillTools.ts`. Поддържани от `src/lib/agentSkills/catalog`. Тези инструменти предоставят на MCP клиенти и външни агенти достъп до каталога с документация за 45 умения на агенти. Обхват: `read:catalog`.

| Инструмент                        | Обхвати        | Описание                                                                                                                                                    |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Изброява всички 45 умения на агенти с незадължителни филтри `category` (api\|cli) и `area`; връща метаданни + покритие                                      |
| `omniroute_agent_skills_get`      | `read:catalog` | Получава пълните метаданни + съдържанието на SKILL.md за конкретно умение по каноничен `id`                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Статистика за покритието: колко от 23-те API, 21-те CLI и 1 конфигурационно умение имат файлове SKILL.md във файловата система спрямо общия брой в каталога |

Вижте [AGENT-SKILLS.md](./AGENT-SKILLS.md) за пълния каталог и начина, по който външните агенти го използват.

## Свързани платформи (v3.8.0)

Списъкът с MCP инструменти по-горе (110 уникални инструмента, изчислени чрез `countUniqueMcpTools()`) е умишлено
ограничен до операции по маршрутизиране по време на изпълнение, кеширане, компресиране, памет, умения, прокси и източници на контекст. Две съседни
платформи се доставят заедно с MCP сървъра във v3.8.0 и са документирани отделно:

### Облачни агенти

Облачните агенти са AI агенти за програмиране, изпълнявани извън процеса (codex-cloud, cursor-cloud, devin, jules), свързани с
OmniRoute чрез същия модел за свързване, който се използва за доставчиците на LLM. Те са достъпни чрез
собствен REST интерфейс (`/api/v1/agents/*`) и **не** са част от каталога с MCP инструменти
— извикването на облачен агент не използва MCP обхват.

- Реализация: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Жизнен цикъл: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Документация: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Предпазни механизми

Предпазните механизми са филтри преди/след изпълнение (vision-bridge, pii-masker, prompt-injection),
прилагани в конвейера за чат. Те се изпълняват, преди да бъде достигнат слоят за MCP инструменти/маршрути,
и изпращат структурирани нарушения към конвейера за одит; не се извикват като MCP инструменти.

- Реализация: `src/lib/guardrails/`.
- Документация: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Когато отстранявате проблем с привидно блокирано MCP извикване, проверете както одитния дневник на MCP
(записи `scope_denied:*`), така и одитната следа на предпазните механизми — заявката може да бъде отхвърлена от
предпазен механизъм, **преди** изобщо да достигне слоя за налагане на MCP обхватите.

---

## Крайни точки на REST API

| Крайна точка           | Метод                 | Описание                                                                                                 | Удостоверяване                   |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `/api/mcp/status`      | `GET`                 | Състояние на сървъра: сигнал за активност, състояние на HTTP транспорта, обобщение на одитната активност | Управление (сесия/администратор) |
| `/api/mcp/tools`       | `GET`                 | Каталог с инструменти (име, описание, обхвати, фаза, изходни крайни точки)                               | Управление                       |
| `/api/mcp/sse`         | `GET` / `POST`        | Крайна точка за SSE транспорт (ограничена чрез `mcpEnabled` + `mcpTransport === "sse"`)                  | API ключ + обхвати               |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Поточен HTTP транспорт (използва заглавката `mcp-session-id`; `DELETE` прекратява сесията)               | API ключ + обхвати               |
| `/api/mcp/audit`       | `GET`                 | Записи в одитния дневник от `mcp_tool_audit` (филтри: `limit`, `offset`, `tool`, `success`, `apiKeyId`)  | Управление                       |
| `/api/mcp/audit/stats` | `GET`                 | Обобщена одитна статистика (`totalCalls`, `successRate`, `avgDurationMs`, най-използвани инструменти)    | Управление                       |

Изходни файлове: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Както SSE, така и поточният HTTP транспорт са блокирани, докато MCP сървърът не бъде активиран в настройките (`mcpEnabled`) и не бъде избран подходящият `mcpTransport`. Ако е конфигуриран неправилен транспорт, маршрутът връща HTTP 400 с указание за промяна на настройките.

---

## Удостоверяване и обхвати

Извикванията на MCP инструменти прочитат низовете за обхват от извикващата страна. Тази проверка е едно от три
независими пространства от имена. Успешната проверка от един проверяващ механизъм не означава успешна проверка от останалите.
Правилата са в [Три пространства от имена за обхвати](#three-scope-namespaces).
Каталогът с инструменти е в [Обхвати на MCP инструменти](#mcp-tool-scopes).

### Три пространства от имена за обхвати

`manage` в API ключ, `read:compression` в MCP инструмент и `read` в
токен за достъп `oma_live_…` са три различни разрешения. Извикващите страни, които изпратят токен за достъп с `read`
към променящ маршрут за управление, получават HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
Тази йерархия е `scopeSatisfies`. Тя не проверява MCP таблицата, а MCP
съпоставянето не я проверява.

| Пространство от имена      | Удостоверение                                                 | Проверяващ механизъм                | Успешната проверка позволява                                 |
| :------------------------- | :------------------------------------------------------------ | :---------------------------------- | :----------------------------------------------------------- |
| Управление с API ключ      | `api_keys.scopes`                                             | `hasManageScope`                    | REST управление за този Bearer ключ                          |
| Добавъчни API обхвати      | същият масив, един точно съвпадащ низ                         | помощната функция, посочена по-долу | Само тази конкретна възможност                               |
| Обхвати на MCP инструменти | същият масив, иначе MCP `_meta`, иначе `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                      | Този инструмент, след като прилагането е включено            |
| Токен за достъп            | `oma_live_…`                                                  | `scopeSatisfies`                    | Маршрута за управление, чийто метод и път изискват това ниво |

Създаването на всяко удостоверение е описано в
[Удостоверяване за управление](../guides/MANAGEMENT-AUTH.md).

#### Обхвати на API ключове

Един масив `api_keys.scopes` обслужва две задачи. Те използват различни функции.

**REST управление.** `manage` и `admin` са членовете на
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
`hasManageScope` удостоверява маршрутите за управление за този ключ. `admin`
дава възможност за управление по тези маршрути. Думата `admin` тук не е
нивото на токена за достъп и не се разгръща в обхвати на MCP инструменти.

**Добавъчни низове.** Всеки от тях се проверява за точно наличие и остава
извън `MANAGEMENT_API_KEY_SCOPES`.

| Обхват                         | Успешната проверка позволява                                                                                                                                             |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Само изключението от LOCAL_ONLY за `/api/mcp/`, когато адресът не е loopback (`hasMcpConnectOrManageScope`). Ключ с `manage` или `admin` също преминава това изключение. |
| `self:usage`                   | `GET /api/v1/me/status` за този ключ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` добавя този обхват при създаване (`normalizeSelfServiceScopesForCreate`).   |
| `self:account-quota`           | Квотите на upstream акаунта в този статус payload (`src/lib/usage/apiKeySelfService.ts`). Маршрутът за статус все още изисква `self:usage`.                              |
| `policy:bypass-provider-quota` | Inference извикванията на този ключ пропускат правилото за квота на доставчика (`hasProviderQuotaBypassScope` в `src/sse/handlers/chat.ts`).                             |

#### Съпоставяне

Каталогът е таблицата в [Обхвати на MCP инструменти](#mcp-tool-scopes). Не
приемайте `MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` за този каталог:
това е първоначалното типизирано подмножество. По-късните инструменти декларират допълнителни обхвати до него
(`read:notion`, `read:skills`, `read:local-corpus` и останалите от таблицата).

`evaluateToolScopes` в `open-sse/mcp-server/scopeEnforcement.ts` позволява извикване,
когато всеки задължителен обхват съвпада с някой предоставен обхват:

- `*` съвпада с всеки задължителен обхват.
- Предоставен обхват, завършващ на `*`, съвпада със задължителен обхват, който започва с
  префикса преди звездичката. `read:*` съвпада с `read:compression`.
- Всеки друг предоставен обхват съвпада само с идентичния задължителен низ.

Ключ с обхвати `["manage"]` не преминава `scopeMatches` за `read:compression`.
Същото извикване е неуспешно при `admin`, `mcp:connect`, `read` и `write`, когато това
са единствените предоставени низове. Няма йерархия между обхватите на MCP инструменти
извън завършващия символ `*`.

Прилагането е изключено, освен ако `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (по подразбиране
`false`). Докато е изключено, `evaluateToolScopes` позволява извикването и пропуска
каталога. Докато е включено, HTTP използва `api_keys.scopes` на Bearer ключа като
`authInfo` (вижте [HTTP обвързване на обхвати за отделен ключ](#per-key-http-scope-binding-7895)).
Когато не бъдат намерени обхвати на ключа, наборът от предоставени обхвати преминава към MCP `_meta`, а след това към
`OMNIROUTE_MCP_SCOPES`.

#### Обхвати на токени за достъп

Токените `oma_live_…` (`src/lib/accessTokens/scopes.ts`) носят `read`, `write`
или `admin`. `scopeSatisfies` представлява йерархия: `admin` покрива `write` и `read`, а
`write` покрива `read`. Неизвестните обхвати не покриват нищо.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) сравнява тази
йерархия с `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` и `OPTIONS` изискват `read`.
- Всеки друг метод изисква `write`.
- Пътищата в `ADMIN_SCOPE_PREFIXES` изискват `admin` за всеки метод. `/api/mcp`
  е в този списък, така че токен за достъп с `write` все пак не може да извиква MCP HTTP
  повърхността.
- Пътищата в `ADMIN_MUTATION_PREFIXES` изискват `admin` само за промени.

`PATCH /api/keys/{id}` е мутация и не е в тези администраторски списъци, затова токен с
`read` получава 403
`Обхватът на токена за достъп 'read' е недостатъчен; изисква се 'write'.`
Токен за достъп с `write` или `admin` удовлетворява изискванията на този маршрут. JWT от таблото за управление,
machine-id токенът на loopback CLI и API ключ с `manage` или `admin` преминават
през други разклонения и не са ограничени от този ранг.

Токен за достъп, който преминава `scopeSatisfies` за `/api/mcp`, е преминал само
проверката за управление. Извикванията на инструменти все още изпълняват `scopeMatches` спрямо обхватите
на API ключа. Рангът на токена за достъп не е входен параметър за `scopeMatches`.

### Обхвати на MCP инструментите

Прилагането на обхватите е централизирано в `open-sse/mcp-server/scopeEnforcement.ts`.
Всеки инструмент изисква конкретни обхвати:

| Обхват                | Инструменти                                                                                                                                                                             |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                       |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                               |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                  |
| `read:quota`          | `check_quota`                                                                                                                                                                           |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                  |
| `read:models`         | `list_models_catalog`                                                                                                                                                                   |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                           |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                   |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                      |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                             |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                          |
| `read:cache`          | `cache_stats`                                                                                                                                                                           |
| `write:cache`         | `cache_flush`                                                                                                                                                                           |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                              |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                       |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                   |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                        |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                  |
| `read:memory`         | `memory_search`                                                                                                                                                                         |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                            |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                      |
| `write:skills`        | `skills_enable`                                                                                                                                                                         |
| `execute:skills`      | `skills_execute`                                                                                                                                                                        |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                        |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                 |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                               |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                        |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                          |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                      |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                         |
| `read:obsidian`       | 13 инструмента за четене — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 инструмента за запис — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                       |

Поддържат се обхвати със заместващи символи: `read:*` предоставя всички обхвати за четене, а `*` предоставя пълен достъп.

### `mcp:connect` — тясно ограничена възможност за маршрут (#7895)

Достъпът до HTTP/SSE MCP транспорта (`/api/mcp/*`) извън loopback изисква
изключението LOCAL_ONLY за `/api/mcp/` (вижте `docs/security/ROUTE_GUARD_TIERS.md`). Исторически
това изключение приемаше само API ключ с пълен обхват `manage`/`admin` — твърде широк за
клиент, който трябва единствено да комуникира с MCP. `src/shared/constants/managementScopes.ts` вече
експортира `MCP_CONNECT_SCOPE = "mcp:connect"`: допълващ, тясно ограничен обхват (по същия прецедент като
`SELF_USAGE_SCOPE`), който разрешава САМО заобикалянето за `/api/mcp/` в
`src/server/authz/policies/management.ts` — той не предоставя достъп до други маршрути за управление
и умишлено е оставен ИЗВЪН `MANAGEMENT_API_KEY_SCOPES`. Ключ с `manage`/`admin`
продължава да преминава през изключението без промяна; `mcp:connect` е алтернатива с по-ниски привилегии за
отдалечени клиенти, използващи само MCP, проверявана чрез `hasMcpConnectOrManageScope()`.

### Обвързване на HTTP обхватите за всеки ключ (#7895)

При HTTP/SSE `open-sse/mcp-server/httpTransport.ts` вече извлича действителните
`api_keys.scopes` на клиента чрез `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
и ги предава към `transport.handleRequest(req, { authInfo })` на MCP SDK, така че
`extra.authInfo.scopes`, достигащи до всяко извикване на инструмент, отразяват собствените обхвати на Bearer ключа.
`resolveCallerScopeContext()` от `scopeEnforcement.ts` вече даваше приоритет на `authInfo` пред
резервния вариант с `_meta` и променливата на средата `OMNIROUTE_MCP_SCOPES` — тази промяна само попълва този първи
източник с най-висок приоритет, който преди не получаваше данни при HTTP. Когато не бъде открит API ключ
(липсваща заглавка, невалиден ключ), `authInfo` остава `undefined` и разрешаването преминава към
съществуващата верига `meta`/променлива на средата без промяна. Това НЕ променя стойността по подразбиране на
`OMNIROUTE_MCP_ENFORCE_SCOPES` — прилагането все още трябва да бъде изрично активирано; тази промяна само гарантира, че
пътят за отделния ключ получава приоритет, след като бъде активиран. stdio няма идентичност за отделните клиенти (вижте
`mcpCallerIdentity.ts`) и не се засяга — продължава да използва резервната верига `_meta`/променлива на средата.

---

## Променливи на средата

| Променлива                              | Стойност по подразбиране            | Предназначение                                                                                                                                |
| :-------------------------------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`            | Базов URL адрес, който MCP сървърът използва при извикване на вътрешните API на OmniRoute                                                     |
| `OMNIROUTE_API_KEY`                     | (празно)                            | API ключ, препращан като `Authorization: Bearer` към вътрешните API извиквания                                                                |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (само `"true"` го активира) | Когато е активирано, липсващите обхвати отказват извикванията на инструменти и записват `scope_denied:<reason>` в журнала за одит             |
| `OMNIROUTE_MCP_SCOPES`                  | (празно)                            | Разделен със запетаи списък с разрешени обхвати, считани по подразбиране за „налични“ (използва се, когато извикващата страна не зададе свои) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (не е зададено = включено)          | Когато е зададено на `0/false/off/no`, деактивира компресирането на MCP описанията при регистрация                                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (не е зададено = включено)          | Алтернативен псевдоним за същия превключвател като по-горе                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                             | Времеви лимит за прекратяване на вътрешни заявки за управление (изправност, устойчивост, комбинации, квота, потребление)                      |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                             | Времеви лимит за прекратяване на стъпки, изчакващи доставчик (`route_request`, `web_search`, `web_fetch`)                                     |
| `MCP_TOOL_DENY`                         | (не е зададено = без филтър)        | Разделени със запетаи имена на инструменти, които да бъдат премахнати от `tools/list` (намаляване на броя инструменти — вижте по-долу)        |
| `MCP_TOOL_ALLOW`                        | (не е зададено = без филтър)        | Разделени със запетаи имена на инструменти, които да бъдат запазени изключително (режим със списък на разрешените — вижте по-долу)            |
| `DATA_DIR`                              | `~/.omniroute`                      | Файлът за периодичен сигнал се записва в `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                             |

---

## Компресиране на описанията

Регистрите на MCP инструменти, подкани и ресурси могат да компресират описанията при регистрация/извеждане на списък, за да намалят обема на метаданните, предоставяни на клиентите (и следователно разхода за контекста на подкана). Реализацията се намира в `open-sse/mcp-server/descriptionCompressor.ts` и е свързана с MCP сървъра чрез `compressMcpRegistryMetadata` в `createMcpServer()`.

- Компресирането се прилага върху текста на описанието чрез набора от правила Caveman (`getRulesForContext("all", "full")`) с извличане на запазени блокове (фрагменти код, оградени блокове и т.н.), така че структурното съдържание да не бъде променяно.
- Превключва се за всяко внедряване чрез стойността `compression.mcpDescriptionCompressionEnabled` в таблицата с настройки `key_value` (по подразбиране: активирано) — достъпно в потребителския интерфейс като **Анализи → Компресиране на MCP описанията**.
- Превключва се за целия процес чрез `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` или `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Статистиките в реално време се предоставят чрез `omniroute_compression_status` под `analytics.mcpDescriptionCompression` и са маркирани с `source: "mcp_metadata_estimate"`, за да се разграничават от действителните отчети за потребление от доставчика.

---

## Намаляване на броя инструменти (F4.3)

Компресирането на описанията намалява метаданните на всеки инструмент; **намаляването на броя инструменти** отива една стъпка по-далеч, като намалява _броя_ на обявяваните инструменти. Обявяването на по-малко инструменти в манифеста `tools/list` намалява разхода на токени за всяка заявка, който моделът на клиента плаща за каталога с инструменти („слой 5“ на компресията). Реализацията представлява чист филтър без състояние в `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), включен в цикъла за регистриране в `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Активира се по избор и по подразбиране е изключено.** Филтърът се изпълнява само когато е зададена поне една от двете променливи на средата; ако нито една не е зададена, всичките 110 инструмента се обявяват без промяна.

| Променлива       | Режим                                                                                                                |
| :--------------- | :------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Черен списък — разделени със запетаи имена на инструменти, които винаги се премахват от `tools/list`                 |
| `MCP_TOOL_ALLOW` | Списък с разрешени — разделени със запетаи имена на инструменти; запазват се само те, а всички останали се премахват |

`deny` има приоритет пред `allow`. Имената са разделени със запетаи, интервалите около тях се премахват, а празните записи се игнорират. Примери:

```bash
# Премахване на два инструмента от каталога
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Обявяване само на инструментите за маршрутизиране и квоти (режим със списък с разрешени)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Как се премахват филтрираните инструменти:** регистрирането винаги е успешно; след това за инструмент, който профилът отхвърля, се извиква `.disable()` върху манипулатора на MCP SDK, така че той никога да не се появява в `tools/list`, но свързването остава непокътнато (чисто активиране/деактивиране без повторно регистриране). Парсерът на профила е `readMcpToolProfileFromEnv(process.env)`, който връща `null` (без филтриране), когато и двете променливи са празни.

По-богатата структура `ToolProfile` зад `reduceToolManifest` поддържа също филтриране чрез сечение на обхвати (`allowScopes`, със съпоставяне чрез заместващи символи от типа `read:*`) и детерминирано ограничение `maxTools`, но тези две настройки изискват пълния манифест по време на регистрирането и днес **не** са достъпни чрез променливите на средата (проследява се последваща задача за кука на ниво `tools/list`). `estimateManifestTokens()` може да се използва за сравняване на разхода на токени за манифеста преди и след намаляването.

---

## Периодичен сигнал за състоянието по време на изпълнение

Транспортът stdio записва информация за активността в `${DATA_DIR}/runtime/mcp-heartbeat.json` на всеки 5 секунди. Таблото (`/api/mcp/status`) прочита този файл заедно със състоянието на PID, за да определи `online`. Вместо това HTTP транспортите отчитат състоянието чрез вътрешнопроцесния `getMcpHttpStatus()` (без запис във файл).

Моментната снимка на периодичния сигнал съдържа:

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

## Одитно регистриране

Всяко извикване на инструмент се записва в SQLite таблицата `mcp_tool_audit` от `open-sse/mcp-server/audit.ts`:

- Име на инструмента, аргументи (хеширани/съкратени според специфичното за инструмента `auditLevel`), резултат
- Продължителност в ms, флаг за успех/неуспех, съобщение за грешка (когато е приложимо)
- Хеш на API ключа, времеви печат
- Отказите за обхват се записват като `scope_denied:<reason>` със списъка на липсващите обхвати

Използвайте таблото или REST крайните точки `/api/mcp/audit` и `/api/mcp/audit/stats`, за да прегледате последните извиквания.

---

## Файлове

| Файл                                                                     | Предназначение                                                                         |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Фабрика за MCP сървър, входна точка за stdio, регистрации на инструменти с обхват      |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP транспорт (управление на сесии)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Оценяване на обхвата на инструментите и определяне на извикващата страна               |
| `open-sse/mcp-server/audit.ts`                                           | Одитно регистриране на извикванията на инструменти (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Записване на stdio heartbeat (`mcp-heartbeat.json`)                                    |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Компресиране на описанията за регистрите на инструменти / подкани / ресурси            |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod схеми + регистър на инструменти (`MCP_TOOLS`, 45 записа)                           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Манипулатори за инструменти от фаза 2 + кеш + 1proxy                                   |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Манипулатори за инструменти за компресиране                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Дефиниции на инструменти за памет (3 инструмента)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Дефиниции на инструменти за умения (4 инструмента)                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Дефиниции на инструменти за източник на контекст от Notion (6 инструмента)             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Дефиниции на инструменти за геймификация (8 инструмента)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Инструменти за регистриране и управление на приставки (8 инструмента)                  |
| `src/app/api/mcp/status/route.ts`                                        | Крайна точка `/api/mcp/status`                                                         |
| `src/app/api/mcp/tools/route.ts`                                         | Крайна точка `/api/mcp/tools`                                                          |
| `src/app/api/mcp/sse/route.ts`                                           | Маршрут за SSE транспорт `/api/mcp/sse`                                                |
| `src/app/api/mcp/stream/route.ts`                                        | Маршрут за Streamable HTTP транспорт `/api/mcp/stream`                                 |
| `src/app/api/mcp/audit/route.ts`                                         | Заявка към одитния регистър `/api/mcp/audit`                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Обобщени одитни показатели `/api/mcp/audit/stats`                                      |
| `src/lib/notion/api.ts`                                                  | Клиент за Notion REST API (повторни опити, време за изчакване, класификация на грешки) |
| `src/lib/db/notion.ts`                                                   | Съхраняване на Notion токени (таблица `key_value`)                                     |
| `src/app/api/settings/notion/route.ts`                                   | API за настройките на Notion (GET/POST/DELETE)                                         |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Потребителски интерфейс за управление на Notion токени                                 |
| `tests/unit/notion-api.test.ts`                                          | Тестове на клиента за Notion API (7)                                                   |
| `tests/unit/notion-tools.test.ts`                                        | Тестове за налагане на обхвата на инструментите за Notion (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Тестове на модула за базата данни на Notion (3)                                        |
