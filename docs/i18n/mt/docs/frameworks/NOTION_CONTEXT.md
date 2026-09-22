# Notion Context Source (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sors awtorevoli:** `src/lib/notion/api.ts` (klijent REST), `src/lib/db/notion.ts`
> (persistenza tat-token), `open-sse/mcp-server/tools/notionTools.ts` (6 għodod MCP),
> `src/app/api/settings/notion/route.ts` (API tas-settings). Ir-reġistrazzjoni tal-għodod u
> l-konfigurazzjoni tal-ambiti jinsabu f’`open-sse/mcp-server/server.ts`.

## X’inhu

OmniRoute jista’ jaqbad ma’ spazju tax-xogħol ta’ **Notion** bħala **sors ta’ kuntest** —
bażi tal-għarfien għall-qari u l-kitba li l-aġenti jaċċessaw permezz tas-server MCP
inkorporat. Ladarba jiġi kkonfigurat token ta’ integrazzjoni ta’ Notion, l-għodod MCP
jippermettu lil LLM ifittex paġni u databases, jaqra l-kontenut tal-paġni u s-siġar
tal-blokki, jagħmel queries fuq databases b’filtri/ortjar, u jżid blokki ġodda —
kollox ipproksjat permezz ta’ OmniRoute (b’tentattivi mill-ġdid, timeout, u
klassifikazzjoni tal-iżbalji) sabiex il-mudell qatt ma jaċċessa direttament l-API ta’
Notion.

L-integrazzjoni hija wrapper irqiq u msaħħaħ fuq l-API REST uffiċjali ta’ Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Il-klijent
(`src/lib/notion/api.ts`) iżid:

- **Tentattivi mill-ġdid b’dewmien esponenzjali** (sa 3 tentattivi) għal `429` u `5xx`.
- **Timeout ta’ 55 sekonda għat-talbiet** permezz ta’ `AbortController`.
- **Klassifikazzjoni ttajpjata tal-iżbalji** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, jirrispetta l-indikazzjonijiet
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitizzazzjoni tal-messaġġi** li tneħħi frammenti li jixbhu stack traces qabel
  ma jintwerew.

## Konfigurazzjoni

Ma hemm **l-ebda varjabbli tal-ambjent** għat-token ta’ Notion — dan jinħażen fit-tabella
SQLite `key_value` (namespace `notion`, key `integration_token`) permezz ta’
`src/lib/db/notion.ts`. Ikkonfigurah mit-tab **Context Sources** tad-dashboard
tal-Endpoint (il-`NotionSourceCard` maġenb `ObsidianSourceCard`), jew permezz tal-API REST
tas-settings.

> [!NOTE]
> It-token huwa **token ta’ integrazzjoni interna ta’ Notion**. Oħloq integrazzjoni fuq
> <https://www.notion.com/my-integrations>, imbagħad aqsam ma’ dik l-integrazzjoni
> l-paġni/databases li trid li OmniRoute jaċċessa (il-mudell tal-permessi ta’ Notion huwa
> bbażat fuq il-kondiviżjoni, mhux fuq l-ispazju tax-xogħol kollu).

### Ikkonfigura permezz ta’ REST

```bash
# Issejvja u vvalida t-token tal-integrazzjoni (POST jivvalida billi jwettaq tfittxija tat-test)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Iċċekkja l-istatus tal-konnessjoni
curl http://localhost:20128/api/settings/notion

# Skonnettja (ineħħi t-token maħżun)
curl -X DELETE http://localhost:20128/api/settings/notion
```

It-tliet metodi kollha jeħtieġu awtentikazzjoni tad-dashboard (`isAuthenticated`). Fuq
`POST`, OmniRoute jissejvja t-token u immedjatament iwettaq tfittxija tat-test b’riżultat
wieħed; jekk Notion jirritorna oġġett ta’ żball, it-token jitneħħa u s-sejħa tfalli
b’`400`.

## Għodod MCP (6)

Iddefiniti f’`open-sse/mcp-server/tools/notionTools.ts`. It-token jiġi riżolt fil-ħin
tas-sejħa permezz ta’ `getNotionToken()`; jekk l-ebda wieħed ma jkun ikkonfigurat,
l-għodda tarmi
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Għodda                       | Ambitu         | Deskrizzjoni                                                                                      |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fittex paġni u databases permezz ta’ query testwali (jirritorna titli, IDs, URLs). Paġinat.       |
| `notion_get_page`            | `read:notion`  | Ikseb il-kontenut u l-metadata ta’ paġna permezz tal-ID tagħha.                                   |
| `notion_list_block_children` | `read:notion`  | Elenka l-blokki wlied kollha ta’ blokka jew paġna (is-siġra tal-blokki). Paġinat.                 |
| `notion_query_database`      | `read:notion`  | Agħmel query fuq database b’`filter` + `sorts` fakultattivi (format tal-API ta’ Notion). Paġinat. |
| `notion_get_database`        | `read:notion`  | Ikseb l-iskema/metadata ta’ database permezz tal-ID.                                              |
| `notion_append_blocks`       | `write:notion` | Żid blokki wlied ma’ blokka jew paġna eżistenti (massimu ta’ 100 blokka għal kull talba).         |

### Parametri tal-input

- `notion_search` — `query` (1–500 karattru), `pageSize` (1–100, valur predefinit 20),
  `startCursor` (fakultattiv).
- `notion_get_page` — `pageId` (hex jew UUID ta’ 32 karattru).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, valur predefinit 50),
  `startCursor` (fakultattiv).
- `notion_query_database` — `databaseId`, `filter` (fakultattiv, format tal-filtru ta’
  Notion), `sorts` (array fakultattiv), `pageSize` (1–100, valur predefinit 50),
  `startCursor` (fakultattiv).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array ta’ oġġetti ta’ blokki),
  `after` (pożizzjoni fakultattiva).

### Ambiti

L-għodod tal-qari jeħtieġu `read:notion` u l-għodda tal-kitba teħtieġ `write:notion`.
L-ambiti jiġu infurzati minn `withScopeEnforcement()` f’
`open-sse/mcp-server/server.ts` biss meta `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; l-ambiti
permessi għal min jagħmel is-sejħa jiġu minn `OMNIROUTE_MCP_SCOPES` (separati
b’virgoli) jew mill-kuntest tal-ambitu taċ-ċavetta API awtentikata. Ara
[MCP-SERVER.md](./MCP-SERVER.md) għall-mudell sħiħ tal-ambiti.

## Endpoints

| Metodu   | Mogħdija               | Għan                                          |
| -------- | ---------------------- | --------------------------------------------- |
| `GET`    | `/api/settings/notion` | Jirritorna `{ connected, hasToken }`.         |
| `POST`   | `/api/settings/notion` | Isalva + jivvalida t-token tal-integrazzjoni. |
| `DELETE` | `/api/settings/notion` | Jiskonnettja (ineħħi t-token maħżun).         |

> Dawn huma rotot tas-settings tad-dashboard. **Ma jeżisti l-ebda endpoint proxy pubbliku
> `/v1` għal Notion** — Notion jiġi aċċessat esklussivament permezz tal-għodod MCP ta’ hawn fuq.

## Każijiet ta’ użu

- **Tweġibiet ibbażati fuq l-għarfien** — ħalli aġent juża `notion_search` fl-ispazju tax-xogħol u
  `notion_get_page` fuq l-aqwa riżultat qabel iwieġeb, sabiex it-tweġibiet jiċċitaw dokumenti interni reali.
- **Flussi tax-xogħol ibbażati fuq databases** — uża `notion_query_database` fuq database tal-kompiti/CRM
  b’filtri + ordinamenti, imbagħad agħti sommarju tar-ringieli jew ikklassifikahom skont il-prijorità.
- **Kitba lura / reġistrazzjoni** — uża `notion_append_blocks` biex iżżid noti tal-laqgħat, sommarji
  tal-eżekuzzjonijiet, jew l-output tal-aġent ma’ paġna eżistenti (żieda biss; ebda editjar distruttiv).
- **Esplorazzjoni tal-istruttura** — uża `notion_list_block_children` biex timxi mas-siġra tal-blokok ta’ paġna,
  jew `notion_get_database` biex tiskopri l-iskema tal-proprjetajiet ta’ database qabel tagħmel query fuqha.

## Relatat

- [Server MCP](./MCP-SERVER.md) — trasporti, infurzar tal-ambitu, inventarju sħiħ tal-għodod.
- [Sors ta’ Kuntest Obsidian](./OBSIDIAN_CONTEXT.md) — is-sors ta’ kuntest integrat l-ieħor.
- [Sistema tal-Memorja](./MEMORY.md) — memorja persistenti tal-konversazzjonijiet (saff ta’ kuntest
  komplementari, injettat awtomatikament minflok miksub permezz tal-għodod).
