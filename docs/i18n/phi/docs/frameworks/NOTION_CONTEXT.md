# Notion Context Source (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/notion/api.ts` (REST client), `src/lib/db/notion.ts`
> (pagpapanatili ng token), `open-sse/mcp-server/tools/notionTools.ts` (6 na MCP tool),
> `src/app/api/settings/notion/route.ts` (settings API). Ang pagpaparehistro ng tool at
> pagkakabit ng scope ay nasa `open-sse/mcp-server/server.ts`.

## Ano ito

Maaaring kumonekta ang OmniRoute sa isang **Notion** workspace bilang **pinagmumulan ng konteksto** — isang read/write
na knowledge base na naa-access ng mga agent sa pamamagitan ng built-in na MCP server. Kapag na-configure na ang isang
Notion integration token, magagamit ng isang LLM ang mga MCP tool upang maghanap ng mga page at database,
magbasa ng nilalaman ng page at mga block tree, mag-query ng mga database gamit ang mga filter/sort, at magdagdag ng mga
bagong block — lahat ay ipinapadaan sa OmniRoute (na may retry, timeout, at pag-uuri ng error)
upang hindi kailanman direktang ma-access ng modelo ang Notion API.

Ang integration ay isang manipis at pinatibay na wrapper sa opisyal na Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Nagdaragdag ang client
(`src/lib/notion/api.ts`) ng:

- **Retry na may exponential backoff** (hanggang 3 pagtatangka) para sa `429` at `5xx`.
- **55-segundong timeout ng request** sa pamamagitan ng `AbortController`.
- **May-type na pag-uuri ng error** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, sinusunod ang mga pahiwatig na `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Paglilinis ng mensahe** na nag-aalis ng mga fragment na kahawig ng stack trace bago ipakita.

## Pag-setup

Walang **environment variable** para sa Notion token — iniimbak ito sa
SQLite `key_value` table (namespace `notion`, key `integration_token`) sa pamamagitan ng
`src/lib/db/notion.ts`. I-configure ito mula sa tab na **Context Sources** ng Endpoint
dashboard (`NotionSourceCard`, na kapatid ng `ObsidianSourceCard`), o sa pamamagitan ng settings REST API.

> [!NOTE]
> Ang token ay isang **Notion internal integration token**. Gumawa ng integration sa
> <https://www.notion.com/my-integrations>, pagkatapos ay ibahagi sa integration na iyon ang mga page/database na nais mong
> ma-access ng OmniRoute (nakabatay sa pagbabahagi ang modelo ng pahintulot ng Notion,
> hindi ito para sa buong workspace).

### I-configure sa pamamagitan ng REST

```bash
# I-save at i-validate ang integration token (nagva-validate ang POST sa pamamagitan ng test search)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Suriin ang status ng koneksyon
curl http://localhost:20128/api/settings/notion

# Idiskonekta (binubura ang nakaimbak na token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Nangangailangan ang lahat ng tatlong method ng authentication sa dashboard (`isAuthenticated`). Sa `POST`,
sine-save ng OmniRoute ang token at agad na nagpapatakbo ng test search na may 1 resulta; kung
magbalik ang Notion ng error object, buburahin ang token at mabibigo ang call na may `400`.

## Mga MCP tool (6)

Tinukoy sa `open-sse/mcp-server/tools/notionTools.ts`. Kinukuha ang token sa oras ng call
sa pamamagitan ng `getNotionToken()`; kung walang naka-configure, magti-throw ang tool ng
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Tool                         | Scope          | Paglalarawan                                                                                                  |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Maghanap ng mga page at database ayon sa text query (nagbabalik ng mga pamagat, ID, at URL). Naka-pagination. |
| `notion_get_page`            | `read:notion`  | Kunin ang nilalaman at metadata ng isang page ayon sa ID nito.                                                |
| `notion_list_block_children` | `read:notion`  | Ilista ang lahat ng child block ng isang block o page (ang block tree). Naka-pagination.                      |
| `notion_query_database`      | `read:notion`  | Mag-query ng database gamit ang opsyonal na `filter` + `sorts` (format ng Notion API). Naka-pagination.       |
| `notion_get_database`        | `read:notion`  | Kunin ang schema/metadata ng isang database ayon sa ID.                                                       |
| `notion_append_blocks`       | `write:notion` | Magdagdag ng mga child block sa isang umiiral na block o page (maximum na 100 block bawat request).           |

### Mga input parameter

- `notion_search` — `query` (1–500 character), `pageSize` (1–100, default na 20),
  `startCursor` (opsyonal).
- `notion_get_page` — `pageId` (32-character na hex o UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, default na 50),
  `startCursor` (opsyonal).
- `notion_query_database` — `databaseId`, `filter` (opsyonal, format ng Notion filter),
  `sorts` (opsyonal na array), `pageSize` (1–100, default na 50), `startCursor` (opsyonal).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array ng mga block object),
  `after` (opsyonal na posisyon).

### Mga scope

Nangangailangan ang mga read tool ng `read:notion`, at nangangailangan ang write tool ng `write:notion`.
Ipinapatupad ang mga scope ng `withScopeEnforcement()` sa
`open-sse/mcp-server/server.ts` kapag `OMNIROUTE_MCP_ENFORCE_SCOPES=true` lamang; ang
mga pinapayagang scope ng tumatawag ay nagmumula sa `OMNIROUTE_MCP_SCOPES` (pinaghihiwalay ng kuwit) o sa
scope context ng na-authenticate na API key. Tingnan ang [MCP-SERVER.md](./MCP-SERVER.md) para sa
kumpletong modelo ng scope.

## Mga Endpoint

| Pamamaraan | Path                   | Layunin                                       |
| ---------- | ---------------------- | --------------------------------------------- |
| `GET`      | `/api/settings/notion` | Ibalik ang `{ connected, hasToken }`.         |
| `POST`     | `/api/settings/notion` | I-save + i-validate ang integration token.    |
| `DELETE`   | `/api/settings/notion` | Idiskonekta (burahin ang nakaimbak na token). |

> Mga route ito para sa mga setting ng dashboard. **Walang pampublikong `/v1` Notion proxy
> endpoint** — maa-access lamang ang Notion sa pamamagitan ng mga MCP tool sa itaas.

## Mga kaso ng paggamit

- **Mga sagot na nakabatay sa kaalaman** — hayaan ang isang agent na gamitin ang `notion_search` sa workspace at
  ang `notion_get_page` sa nangungunang resulta bago sumagot, upang makapagbanggit ang mga tugon ng mga aktuwal na internal doc.
- **Mga workflow na sinusuportahan ng database** — gamitin ang `notion_query_database` sa isang tasks/CRM database na may
  mga filter + sort, pagkatapos ay ibuod o i-triage ang mga row.
- **Pagsulat pabalik / pag-log** — gamitin ang `notion_append_blocks` upang idagdag ang mga tala ng pulong, mga buod ng run,
  o output ng agent sa isang umiiral na page (append-only; walang mapanirang pag-edit).
- **Paggalugad ng istruktura** — gamitin ang `notion_list_block_children` upang libutin ang block tree ng isang page,
  o ang `notion_get_database` upang matuklasan ang property schema ng isang database bago ito i-query.

## Kaugnay

- [MCP Server](./MCP-SERVER.md) — mga transport, pagpapatupad ng saklaw, kumpletong imbentaryo ng mga tool.
- [Obsidian Context Source](./OBSIDIAN_CONTEXT.md) — ang isa pang built-in na context source.
- [Memory System](./MEMORY.md) — persistent na memorya ng pag-uusap (komplementaryong
  context layer, awtomatikong ini-inject sa halip na kunin gamit ang tool).
