# Notion Context Source (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Tushen gaskiya:** `src/lib/notion/api.ts` (abokin hulɗar REST), `src/lib/db/notion.ts`
> (adana token), `open-sse/mcp-server/tools/notionTools.ts` (kayan aikin MCP guda 6),
> `src/app/api/settings/notion/route.ts` (API na saituna). Rijistar kayan aiki da haɗa
> scopes suna cikin `open-sse/mcp-server/server.ts`.

## Mene ne wannan

OmniRoute na iya haɗuwa da filin aiki na **Notion** a matsayin **tushen mahallin bayanai** — ma'ajiyar
ilimi ta karantawa/rubutawa wadda wakilai ke samu ta uwar garken MCP da ke ciki. Da zarar an
saita token na haɗin Notion, kayan aikin MCP suna ba LLM damar bincika shafuka da rumbunan bayanai,
karanta abun cikin shafi da bishiyoyin tubalan, yin tambaya ga rumbunan bayanai tare da matatu/tsarawa, da ƙara sabbin
tubala — duk ana bi da su ta cikin OmniRoute (tare da sake gwadawa, iyakar lokacin jira, da rarraba kurakurai)
don kada samfurin ya taɓa Notion API kai tsaye.

Haɗin wani siririn kundi ne mai ƙarfi a kan Notion REST API na hukuma
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Abokin hulɗar
(`src/lib/notion/api.ts`) yana ƙara:

- **Sake gwadawa tare da jinkirin da ke ƙaruwa a hankali** (har zuwa yunƙuri 3) don `429` da `5xx`.
- **Iyakar lokacin buƙata na daƙiƙa 55** ta hanyar `AbortController`.
- **Rarraba kurakurai masu nau'i** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, yana bin alamomin `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Tsabtace saƙo** wanda ke cire ɓangarori masu kama da sawun stack kafin a nuna su.

## Saitawa

Babu **environment variable** don token na Notion — ana adana shi a cikin teburin SQLite
`key_value` (namespace `notion`, key `integration_token`) ta hanyar
`src/lib/db/notion.ts`. Saita shi daga shafin **Context Sources** na dashboard ɗin Endpoint
(`NotionSourceCard`, ɗan'uwan `ObsidianSourceCard`), ko ta hanyar REST API na saituna.

> [!NOTE]
> Token ɗin **token na haɗin cikin gida na Notion** ne. Ƙirƙiri haɗi a
> <https://www.notion.com/my-integrations>, sannan ka raba shafuka/rumbunan bayanan da kake son
> OmniRoute ya samu damar shiga da wannan haɗin (tsarin izinin Notion ya dogara ne da rabawa,
> ba ga dukkan filin aiki ba).

### Saitawa ta REST

```bash
# Ajiye + tabbatar da token na haɗin (POST yana tabbatarwa ta hanyar aika binciken gwaji)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Duba matsayin haɗin
curl http://localhost:20128/api/settings/notion

# Cire haɗin (yana share token da aka adana)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Duk hanyoyin guda uku suna buƙatar tantancewar dashboard (`isAuthenticated`). A kan `POST`,
OmniRoute yana adana token sannan nan take ya gudanar da binciken gwaji mai sakamako 1; idan Notion
ya dawo da abin kuskure, za a share token ɗin kuma kiran ya gaza da `400`.

## Kayan aikin MCP (6)

An ayyana su a cikin `open-sse/mcp-server/tools/notionTools.ts`. Ana samo token a lokacin kira
ta hanyar `getNotionToken()`; idan ba a saita ko ɗaya ba, kayan aikin zai jefa
`"Ba a saita token na haɗin Notion ba. Saita shi a Settings > Context Sources."`

| Kayan aiki                   | Scope          | Bayani                                                                                                 |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Bincika shafuka da rumbunan bayanai ta tambayar rubutu (yana dawo da take, IDs, URLs). Mai shafuffuka. |
| `notion_get_page`            | `read:notion`  | Samo abun ciki da metadata na shafi ta ID ɗinsa.                                                       |
| `notion_list_block_children` | `read:notion`  | Jera dukkan tubalan da ke ƙarƙashin tubali ko shafi (bishiyar tubalan). Mai shafuffuka.                |
| `notion_query_database`      | `read:notion`  | Yi tambaya ga rumbun bayanai tare da `filter` + `sorts` na zaɓi (tsarin Notion API). Mai shafuffuka.   |
| `notion_get_database`        | `read:notion`  | Samo schema/metadata na rumbun bayanai ta ID.                                                          |
| `notion_append_blocks`       | `write:notion` | Ƙara tubalan yara zuwa tubali ko shafin da ke akwai (iyakar tubala 100 a kowace buƙata).               |

### Sigogin shigarwa

- `notion_search` — `query` (haruffa 1–500), `pageSize` (1–100, tsoho 20),
  `startCursor` (na zaɓi).
- `notion_get_page` — `pageId` (hex mai haruffa 32 ko UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, tsoho 50),
  `startCursor` (na zaɓi).
- `notion_query_database` — `databaseId`, `filter` (na zaɓi, tsarin matatar Notion),
  `sorts` (jerin na zaɓi), `pageSize` (1–100, tsoho 50), `startCursor` (na zaɓi).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (jerin abubuwan tubali),
  `after` (matsayi na zaɓi).

### Scopes

Kayan aikin karantawa suna buƙatar `read:notion`, kuma kayan aikin rubutawa yana buƙatar `write:notion`.
`withScopeEnforcement()` a cikin `open-sse/mcp-server/server.ts` yana tilasta scopes ne kawai idan
`OMNIROUTE_MCP_ENFORCE_SCOPES=true`; scopes da aka yarda wa mai kira suna fitowa daga
`OMNIROUTE_MCP_SCOPES` (waƙafi ne ke raba su) ko mahallin scope na API key da aka tantance.
Duba [MCP-SERVER.md](./MCP-SERVER.md) don cikakken tsarin scope.

## Endpoints

| Hanya    | Path                   | Manufa                                          |
| -------- | ---------------------- | ----------------------------------------------- |
| `GET`    | `/api/settings/notion` | Mayar da `{ connected, hasToken }`.             |
| `POST`   | `/api/settings/notion` | Ajiye + tabbatar da ingancin integration token. |
| `DELETE` | `/api/settings/notion` | Cire haɗin (share token ɗin da aka adana).      |

> Waɗannan su ne hanyoyin saitunan dashboard. **Babu public `/v1` Notion proxy
> endpoint** — ana isa ga Notion ne kawai ta hanyar kayan aikin MCP da ke sama.

## Yanayin amfani

- **Amsoshi masu tushe daga ilimi** — ba agent damar yin `notion_search` a workspace sannan ya yi
  `notion_get_page` ga sakamakon farko kafin ya ba da amsa, domin amsoshin su ambaci takardun cikin gida na ainihi.
- **Tsarukan aiki masu dogaro da database** — yi `notion_query_database` ga database na tasks/CRM tare da
  filters + sorts, sannan a taƙaita ko a tantance rows ɗin.
- **Mayar da rubutu / logging** — yi `notion_append_blocks` don ƙara bayanan taro, taƙaitattun
  runs, ko output na agent cikin page da ke akwai (ƙari-kawai; babu gyare-gyare masu lalata bayanai).
- **Binciken tsari** — yi `notion_list_block_children` don bi ta block tree na page,
  ko `notion_get_database` don gano property schema na database kafin a yi query a kansa.

## Masu alaƙa

- [MCP Server](./MCP-SERVER.md) — transports, aiwatar da scope, cikakken jerin kayan aiki.
- [Obsidian Context Source](./OBSIDIAN_CONTEXT.md) — ɗayan ginannen context source.
- [Memory System](./MEMORY.md) — conversational memory mai ɗorewa (complementary
  context layer, ana saka shi ta atomatik maimakon a ɗebo shi da kayan aiki).
