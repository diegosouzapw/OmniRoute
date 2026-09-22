# Notion Context Source (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Источник истины:** `src/lib/notion/api.ts` (REST-клиент), `src/lib/db/notion.ts`
> (хранение токена), `open-sse/mcp-server/tools/notionTools.ts` (6 инструментов MCP),
> `src/app/api/settings/notion/route.ts` (API настроек). Регистрация инструментов и
> настройка областей доступа находятся в `open-sse/mcp-server/server.ts`.

## Что это такое

OmniRoute может подключаться к рабочему пространству **Notion** в качестве **источника контекста** — базы знаний с доступом на чтение и запись, к которой агенты обращаются через встроенный сервер MCP. После настройки токена интеграции Notion инструменты MCP позволяют LLM искать страницы и базы данных, читать содержимое страниц и деревья блоков, запрашивать базы данных с фильтрами и сортировкой, а также добавлять новые блоки — все запросы проксируются через OmniRoute (с повторными попытками, тайм-аутом и классификацией ошибок), поэтому модель никогда не обращается к API Notion напрямую.

Интеграция представляет собой тонкую и надёжно защищённую оболочку над официальным REST API Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Клиент
(`src/lib/notion/api.ts`) предоставляет:

- **Повторные попытки с экспоненциальной задержкой** (до 3 попыток) для `429` и `5xx`.
- **Тайм-аут запроса в 55 секунд** с помощью `AbortController`.
- **Типизированную классификацию ошибок** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, учитывает указания `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Очистку сообщений**, удаляющую фрагменты, похожие на трассировку стека, перед их отображением.

## Настройка

Для токена Notion **нет переменной окружения** — он хранится в таблице SQLite
`key_value` (пространство имён `notion`, ключ `integration_token`) через
`src/lib/db/notion.ts`. Настройте его на вкладке **Источники контекста** панели управления конечной точкой
(соседний с `ObsidianSourceCard` компонент `NotionSourceCard`) или через REST API настроек.

> [!NOTE]
> Токен — это **токен внутренней интеграции Notion**. Создайте интеграцию на странице
> <https://www.notion.com/my-integrations>, а затем предоставьте этой интеграции доступ к страницам и базам данных, к которым должен обращаться OmniRoute (модель разрешений Notion основана на предоставлении доступа,
> а не на доступе ко всему рабочему пространству).

### Настройка через REST

```bash
# Сохранить и проверить токен интеграции (POST выполняет проверку с помощью тестового поиска)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Проверить состояние подключения
curl http://localhost:20128/api/settings/notion

# Отключиться (удаляет сохранённый токен)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Все три метода требуют аутентификации в панели управления (`isAuthenticated`). При `POST`
OmniRoute сохраняет токен и немедленно выполняет тестовый поиск с одним результатом; если Notion
возвращает объект ошибки, токен удаляется, а вызов завершается ошибкой `400`.

## Инструменты MCP (6)

Определены в `open-sse/mcp-server/tools/notionTools.ts`. Токен разрешается во время вызова
через `getNotionToken()`; если токен не настроен, инструмент выдаёт ошибку
`"Токен интеграции Notion не настроен. Задайте его в разделе «Настройки» > «Источники контекста»."`

| Инструмент                   | Область доступа | Описание                                                                                                               |
| ---------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`   | Поиск страниц и баз данных по текстовому запросу (возвращает заголовки, идентификаторы и URL). Поддерживает пагинацию. |
| `notion_get_page`            | `read:notion`   | Получение содержимого и метаданных страницы по её идентификатору.                                                      |
| `notion_list_block_children` | `read:notion`   | Получение списка всех дочерних блоков блока или страницы (дерева блоков). Поддерживает пагинацию.                      |
| `notion_query_database`      | `read:notion`   | Запрос к базе данных с необязательными `filter` + `sorts` (в формате API Notion). Поддерживает пагинацию.              |
| `notion_get_database`        | `read:notion`   | Получение схемы и метаданных базы данных по идентификатору.                                                            |
| `notion_append_blocks`       | `write:notion`  | Добавление дочерних блоков к существующему блоку или странице (не более 100 блоков за запрос).                         |

### Входные параметры

- `notion_search` — `query` (1–500 символов), `pageSize` (1–100, по умолчанию 20),
  `startCursor` (необязательно).
- `notion_get_page` — `pageId` (32-символьное шестнадцатеричное значение или UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, по умолчанию 50),
  `startCursor` (необязательно).
- `notion_query_database` — `databaseId`, `filter` (необязательно, формат фильтра Notion),
  `sorts` (необязательный массив), `pageSize` (1–100, по умолчанию 50), `startCursor` (необязательно).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (массив объектов блоков),
  `after` (необязательная позиция).

### Области доступа

Инструментам чтения требуется `read:notion`, а инструменту записи — `write:notion`.
Области доступа контролируются функцией `withScopeEnforcement()` в
`open-sse/mcp-server/server.ts` только при `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; разрешённые
области доступа вызывающей стороны берутся из `OMNIROUTE_MCP_SCOPES` (значения, разделённые запятыми) или из
контекста областей доступа аутентифицированного API-ключа. Полное описание модели областей доступа см. в
[MCP-SERVER.md](./MCP-SERVER.md).

## Конечные точки

| Метод    | Путь                   | Назначение                                        |
| -------- | ---------------------- | ------------------------------------------------- |
| `GET`    | `/api/settings/notion` | Возвращает `{ connected, hasToken }`.             |
| `POST`   | `/api/settings/notion` | Сохраняет и проверяет токен интеграции.           |
| `DELETE` | `/api/settings/notion` | Отключает интеграцию (удаляет сохранённый токен). |

> Это маршруты настроек панели управления. Публичной прокси-конечной точки
> `/v1` для Notion **нет** — доступ к Notion осуществляется исключительно через указанные выше инструменты MCP.

## Сценарии использования

- **Ответы на основе базы знаний** — позвольте агенту выполнить `notion_search` в рабочем пространстве и
  `notion_get_page` для первого результата перед ответом, чтобы ответы ссылались на реальные внутренние документы.
- **Рабочие процессы на основе базы данных** — выполните `notion_query_database` для базы данных задач/CRM с
  фильтрами и сортировкой, а затем обобщите или распределите строки по приоритетам.
- **Обратная запись / ведение журнала** — используйте `notion_append_blocks`, чтобы добавлять заметки со встреч, сводки
  запусков или результаты работы агента на существующую страницу (только добавление; без деструктивных изменений).
- **Исследование структуры** — используйте `notion_list_block_children` для обхода дерева блоков страницы
  или `notion_get_database`, чтобы узнать схему свойств базы данных перед выполнением запроса к ней.

## Связанные материалы

- [Сервер MCP](./MCP-SERVER.md) — способы передачи данных, применение ограничений области доступа и полный список инструментов.
- [Источник контекста Obsidian](./OBSIDIAN_CONTEXT.md) — другой встроенный источник контекста.
- [Система памяти](./MEMORY.md) — постоянная память бесед (дополнительный
  слой контекста, который внедряется автоматически, а не извлекается инструментами).
