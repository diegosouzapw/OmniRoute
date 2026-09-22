# Notion Context Source (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Извор истине:** `src/lib/notion/api.ts` (REST клијент), `src/lib/db/notion.ts`
> (чување токена), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP алата),
> `src/app/api/settings/notion/route.ts` (API за подешавања). Регистрација алата и повезивање
> опсега налазе се у `open-sse/mcp-server/server.ts`.

## Шта је ово

OmniRoute може да се повеже са **Notion** радним простором као **извором контекста** — базом
знања за читање и писање којој агенти приступају преко уграђеног MCP сервера. Након што се
конфигурише токен Notion интеграције, MCP алати омогућавају LLM-у да претражује странице и базе
података, чита садржај страница и стабла блокова, поставља упите над базама података помоћу филтера/сортирања
и додаје нове блокове — све се прослеђује преко OmniRoute-а (уз поновне покушаје, временско ограничење и
класификацију грешака), тако да модел никада не приступа директно Notion API-ју.

Интеграција је танак, ојачан омотач око званичног Notion REST API-ја
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Клијент
(`src/lib/notion/api.ts`) додаје:

- **Поновне покушаје са експоненцијалним одлагањем** (до 3 покушаја) за `429` и `5xx`.
- **Временско ограничење захтева од 55 секунди** путем `AbortController`.
- **Типизирану класификацију грешака** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, поштује смернице `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Санитизацију порука** која уклања фрагменте налик траговима стека пре него што се прикажу.

## Подешавање

За Notion токен **не постоји променљива окружења** — он се чува у SQLite табели
`key_value` (именски простор `notion`, кључ `integration_token`) путем
`src/lib/db/notion.ts`. Конфигуришите га на картици **Извори контекста** контролне табле
крајње тачке (`NotionSourceCard`, сродна компонента компоненте `ObsidianSourceCard`) или путем REST API-ја за подешавања.

> [!NOTE]
> Токен је **токен интерне Notion интеграције**. Направите интеграцију на
> <https://www.notion.com/my-integrations>, а затим са том интеграцијом поделите странице/базе података
> којима желите да OmniRoute приступа (Notion-ов модел дозвола заснива се на дељењу,
> а не на целом радном простору).

### Конфигурисање путем REST-а

```bash
# Сачувајте и проверите токен интеграције (POST га проверава слањем пробне претраге)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Проверите статус везе
curl http://localhost:20128/api/settings/notion

# Прекините везу (брише сачувани токен)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Сва три метода захтевају аутентификацију на контролној табли (`isAuthenticated`). При `POST`
захтеву, OmniRoute чува токен и одмах покреће пробну претрагу са једним резултатом; ако Notion
врати објекат грешке, токен се брише, а позив се завршава неуспешно са статусом `400`.

## MCP алати (6)

Дефинисани су у `open-sse/mcp-server/tools/notionTools.ts`. Токен се разрешава у тренутку
позива путем `getNotionToken()`; ако ниједан није конфигурисан, алат избацује грешку
`"Токен Notion интеграције није конфигурисан. Подесите га у Подешавања > Извори контекста."`

| Алат                         | Опсег          | Опис                                                                                                  |
| ---------------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Претражује странице и базе података текстуалним упитом (враћа наслове, ID-ове и URL-ове). Страничено. |
| `notion_get_page`            | `read:notion`  | Преузима садржај и метаподатке странице на основу њеног ID-а.                                         |
| `notion_list_block_children` | `read:notion`  | Наводи сву децу блока или странице (стабло блокова). Страничено.                                      |
| `notion_query_database`      | `read:notion`  | Поставља упит над базом података са опционим `filter` + `sorts` (Notion API формат). Страничено.      |
| `notion_get_database`        | `read:notion`  | Преузима шему/метаподатке базе података на основу ID-а.                                               |
| `notion_append_blocks`       | `write:notion` | Додаје блокове децу постојећем блоку или страници (највише 100 блокова по захтеву).                   |

### Улазни параметри

- `notion_search` — `query` (1–500 знакова), `pageSize` (1–100, подразумевано 20),
  `startCursor` (опционо).
- `notion_get_page` — `pageId` (32-знаковни хексадекадни запис или UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, подразумевано 50),
  `startCursor` (опционо).
- `notion_query_database` — `databaseId`, `filter` (опционо, Notion формат филтера),
  `sorts` (опциони низ), `pageSize` (1–100, подразумевано 50), `startCursor` (опционо).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (низ објеката блокова),
  `after` (опциона позиција).

### Опсези

Алати за читање захтевају `read:notion`, а алат за писање захтева `write:notion`.
Опсеге примењује `withScopeEnforcement()` у
`open-sse/mcp-server/server.ts` само када је `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; дозвољени
опсези позиваоца потичу из `OMNIROUTE_MCP_SCOPES` (раздвојени зарезима) или из контекста
опсега аутентификованог API кључа. Погледајте [MCP-SERVER.md](./MCP-SERVER.md) за
потпун модел опсега.

## Крајње тачке

| Метод    | Путања                 | Сврха                                |
| -------- | ---------------------- | ------------------------------------ |
| `GET`    | `/api/settings/notion` | Враћа `{ connected, hasToken }`.     |
| `POST`   | `/api/settings/notion` | Чува и проверава токен интеграције.  |
| `DELETE` | `/api/settings/notion` | Прекида везу (брише сачувани токен). |

> Ово су руте за подешавања контролне табле. **Не постоји јавна `/v1` Notion прокси
> крајња тачка** — Notion-у се приступа искључиво путем горенаведених MCP алата.

## Случајеви употребе

- **Одговори засновани на знању** — омогућите агенту да помоћу `notion_search` претражи радни простор и
  помоћу `notion_get_page` преузме најрелевантнији резултат пре одговарања, како би одговори цитирали стварну интерну документацију.
- **Токови рада засновани на бази података** — помоћу `notion_query_database` упитајте базу задатака/CRM базу са
  филтерима и сортирањем, а затим сумирајте или разврстајте редове.
- **Повратни упис / евидентирање** — користите `notion_append_blocks` за додавање белешки са састанака, сажетака
  извршавања или излаза агента на постојећу страницу (само додавање; без деструктивних измена).
- **Истраживање структуре** — користите `notion_list_block_children` за пролазак кроз стабло блокова странице
  или `notion_get_database` да бисте открили шему својстава базе података пре него што је упитате.

## Повезано

- [MCP сервер](./MCP-SERVER.md) — начини преноса, спровођење опсега, потпун инвентар алата.
- [Obsidian извор контекста](./OBSIDIAN_CONTEXT.md) — други уграђени извор контекста.
- [Систем меморије](./MEMORY.md) — трајна меморија разговора (комплементарни
  слој контекста, аутоматски уметнут уместо преузимања путем алата).
