# Notion Context Source (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Джерело істини:** `src/lib/notion/api.ts` (REST-клієнт), `src/lib/db/notion.ts`
> (зберігання токена), `open-sse/mcp-server/tools/notionTools.ts` (6 інструментів MCP),
> `src/app/api/settings/notion/route.ts` (API налаштувань). Реєстрація інструментів і
> налаштування областей доступу містяться в `open-sse/mcp-server/server.ts`.

## Що це таке

OmniRoute може підключатися до робочого простору **Notion** як до **джерела контексту** — бази
знань із доступом для читання та запису, до якої агенти звертаються через вбудований сервер MCP.
Після налаштування токена інтеграції Notion інструменти MCP дають змогу LLM шукати сторінки
й бази даних, читати вміст сторінок і дерева блоків, виконувати запити до баз даних із фільтрами
та сортуванням і додавати нові блоки — усе через проксі OmniRoute (із повторними спробами,
тайм-аутом і класифікацією помилок), тож модель ніколи не звертається до API Notion безпосередньо.

Інтеграція є тонкою, захищеною обгорткою над офіційним REST API Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Клієнт
(`src/lib/notion/api.ts`) додає:

- **Повторні спроби з експоненційною затримкою** (до 3 спроб) для `429` і `5xx`.
- **55-секундний тайм-аут запиту** через `AbortController`.
- **Типізовану класифікацію помилок** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, враховує підказки `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Санітизацію повідомлень**, яка вилучає фрагменти, подібні до трасування стека, перед їх показом.

## Налаштування

Для токена Notion **немає змінної середовища** — він зберігається в таблиці SQLite
`key_value` (простір імен `notion`, ключ `integration_token`) через
`src/lib/db/notion.ts`. Налаштуйте його на вкладці **Джерела контексту** панелі керування
кінцевої точки (сусідній із `ObsidianSourceCard` компонент `NotionSourceCard`) або через REST API налаштувань.

> [!NOTE]
> Токен — це **токен внутрішньої інтеграції Notion**. Створіть інтеграцію на
> <https://www.notion.com/my-integrations>, а потім надайте їй доступ до сторінок/баз даних,
> до яких має звертатися OmniRoute (модель дозволів Notion базується на спільному доступі,
> а не на доступі до всього робочого простору).

### Налаштування через REST

```bash
# Зберегти та перевірити токен інтеграції (POST виконує перевірку за допомогою тестового пошуку)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Перевірити стан підключення
curl http://localhost:20128/api/settings/notion

# Відключитися (видаляє збережений токен)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Усі три методи потребують автентифікації в панелі керування (`isAuthenticated`). Під час `POST`
OmniRoute зберігає токен і відразу виконує тестовий пошук з одним результатом; якщо Notion
повертає об'єкт помилки, токен видаляється, а виклик завершується помилкою `400`.

## Інструменти MCP (6)

Визначені в `open-sse/mcp-server/tools/notionTools.ts`. Токен визначається під час виклику
через `getNotionToken()`; якщо його не налаштовано, інструмент повертає виняток
`"Токен інтеграції Notion не налаштовано. Установіть його в Налаштування > Джерела контексту."`

| Інструмент                   | Область доступу | Опис                                                                                                          |
| ---------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`   | Пошук сторінок і баз даних за текстовим запитом (повертає назви, ідентифікатори та URL-адреси). З пагінацією. |
| `notion_get_page`            | `read:notion`   | Отримання вмісту й метаданих сторінки за її ідентифікатором.                                                  |
| `notion_list_block_children` | `read:notion`   | Виведення списку всіх дочірніх блоків блоку або сторінки (дерева блоків). З пагінацією.                       |
| `notion_query_database`      | `read:notion`   | Запит до бази даних із необов'язковими `filter` + `sorts` (формат API Notion). З пагінацією.                  |
| `notion_get_database`        | `read:notion`   | Отримання схеми/метаданих бази даних за ідентифікатором.                                                      |
| `notion_append_blocks`       | `write:notion`  | Додавання дочірніх блоків до наявного блоку або сторінки (щонайбільше 100 блоків на запит).                   |

### Вхідні параметри

- `notion_search` — `query` (1–500 символів), `pageSize` (1–100, типове значення — 20),
  `startCursor` (необов'язковий).
- `notion_get_page` — `pageId` (32-символьне шістнадцяткове значення або UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, типове значення — 50),
  `startCursor` (необов'язковий).
- `notion_query_database` — `databaseId`, `filter` (необов'язковий, у форматі фільтра Notion),
  `sorts` (необов'язковий масив), `pageSize` (1–100, типове значення — 50), `startCursor` (необов'язковий).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (масив об'єктів блоків),
  `after` (необов'язкова позиція).

### Області доступу

Інструменти читання потребують `read:notion`, а інструмент запису — `write:notion`.
Області доступу примусово перевіряються функцією `withScopeEnforcement()` у
`open-sse/mcp-server/server.ts`, лише коли `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; дозволені
для виклику області доступу надходять із `OMNIROUTE_MCP_SCOPES` (значення, розділені комами)
або з контексту областей доступу автентифікованого ключа API. Повну модель областей доступу
наведено в [MCP-SERVER.md](./MCP-SERVER.md).

## Кінцеві точки

| Метод    | Шлях                   | Призначення                             |
| -------- | ---------------------- | --------------------------------------- |
| `GET`    | `/api/settings/notion` | Повертає `{ connected, hasToken }`.     |
| `POST`   | `/api/settings/notion` | Зберігає та перевіряє токен інтеграції. |
| `DELETE` | `/api/settings/notion` | Від’єднує (видаляє збережений токен).   |

> Це маршрути налаштувань панелі керування. Публічної кінцевої точки проксі-сервера Notion
> `/v1` **немає** — доступ до Notion здійснюється виключно через наведені вище інструменти MCP.

## Варіанти використання

- **Відповіді на основі бази знань** — дозвольте агенту виконати `notion_search` у робочому просторі та
  `notion_get_page` для найрелевантнішого результату перед відповіддю, щоб відповіді посилалися на реальні внутрішні документи.
- **Робочі процеси на основі бази даних** — виконайте `notion_query_database` для бази даних завдань/CRM із
  фільтрами та сортуванням, а потім узагальніть або класифікуйте рядки.
- **Зворотний запис / журналювання** — використовуйте `notion_append_blocks`, щоб додавати нотатки зустрічей, підсумки
  виконання або результати роботи агента до наявної сторінки (лише додавання; без деструктивних змін).
- **Дослідження структури** — використовуйте `notion_list_block_children` для обходу дерева блоків сторінки
  або `notion_get_database`, щоб визначити схему властивостей бази даних перед надсиланням запитів до неї.

## Пов’язані матеріали

- [Сервер MCP](./MCP-SERVER.md) — транспорти, контроль областей доступу, повний перелік інструментів.
- [Джерело контексту Obsidian](./OBSIDIAN_CONTEXT.md) — інше вбудоване джерело контексту.
- [Система пам’яті](./MEMORY.md) — постійна пам’ять розмови (додатковий
  шар контексту, який додається автоматично, а не отримується через інструменти).
