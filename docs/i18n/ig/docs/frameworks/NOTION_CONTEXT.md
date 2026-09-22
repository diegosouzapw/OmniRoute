# Notion Context Source (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Isi mmalite nke eziokwu:** `src/lib/notion/api.ts` (onye ahịa REST), `src/lib/db/notion.ts`
> (nchekwa token), `open-sse/mcp-server/tools/notionTools.ts` (ngwaọrụ MCP 6),
> `src/app/api/settings/notion/route.ts` (API ntọala). Ndebanye aha ngwaọrụ na njikọ scope
> dị na `open-sse/mcp-server/server.ts`.

## Ihe ọ bụ

OmniRoute nwere ike ijikọ na workspace **Notion** dịka **isi iyi ọnọdụ** — ebe nchekwa
ihe ọmụma a pụrụ ịgụ/dee nke ndị agent na-enweta site na sava MCP arụnyere n'ime ya. Ozugbo
ahaziri token njikọta Notion, ngwaọrụ MCP na-enye LLM ohere ịchọ peeji na database,
ịgụ ọdịnaya peeji na osisi block, iji filter/sort mee query na database, na ịgbakwunye
block ọhụrụ — a na-ebufe ha niile site na OmniRoute (nwere retry, timeout, na nhazi njehie)
ka model ghara imetụ Notion API aka ozugbo.

Njikọta a bụ wrapper dị mfe ma sie ike nke dị n'elu Notion REST API gọọmentị
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Onye ahịa ahụ
(`src/lib/notion/api.ts`) na-agbakwunye:

- **Retry nwere exponential backoff** (ruo mbọ 3) maka `429` na `5xx`.
- **Timeout arịrịọ nke sekọnd 55** site na `AbortController`.
- **Nhazi njehie nwere ụdị** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, na-asọpụrụ ntụziaka `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Nhicha ozi** nke na-ewepụ iberibe yiri stack trace tupu e gosipụta ha.

## Nhazi

Enweghị **environment variable** maka token Notion — a na-echekwa ya na tebụl SQLite
`key_value` (namespace `notion`, key `integration_token`) site na
`src/lib/db/notion.ts`. Hazie ya site na taabụ **Isi Iyi Ọnọdụ** nke dashboard Endpoint
(`NotionSourceCard`, nke bụ nwanne `ObsidianSourceCard`), ma ọ bụ site na REST API ntọala.

> [!NOTE]
> Token ahụ bụ **token njikọta ime Notion**. Mepụta integration na
> <https://www.notion.com/my-integrations>, wee kesaa peeji/database ndị ịchọrọ ka
> OmniRoute nweta na integration ahụ (usoro ikike Notion dabere na nkekọrịta,
> ọ bụghị workspace niile).

### Hazie site na REST

```bash
# Chekwaa + nyochaa token integration (POST na-enyocha site n'ime ọchụchọ ule)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Lelee ọnọdụ njikọ
curl http://localhost:20128/api/settings/notion

# Kwụpụ njikọ (na-ehichapụ token echekwara)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Ụzọ atọ a niile chọrọ nyocha njirimara dashboard (`isAuthenticated`). Na `POST`,
OmniRoute na-echekwa token ahụ ma na-eme ọchụchọ ule nwere nsonaazụ 1 ozugbo; ọ bụrụ na Notion
weghachite ihe njehie, a ga-ehichapụ token ahụ, oku ahụ adaakwa na `400`.

## Ngwaọrụ MCP (6)

A kọwara ha na `open-sse/mcp-server/tools/notionTools.ts`. A na-achọpụta token n'oge
oku site na `getNotionToken()`; ọ bụrụ na ahazighị nke ọ bụla, ngwaọrụ ahụ na-atụpụ
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Ngwaọrụ                      | Scope          | Nkọwa                                                                                         |
| ---------------------------- | -------------- | --------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Jiri ajụjụ ederede chọọ peeji na database (na-eweghachi aha, ID, URL). E kewara ya na peeji.  |
| `notion_get_page`            | `read:notion`  | Nweta ọdịnaya na metadata nke peeji site na ID ya.                                            |
| `notion_list_block_children` | `read:notion`  | Depụta block ụmụ niile nke block ma ọ bụ peeji (osisi block). E kewara ya na peeji.           |
| `notion_query_database`      | `read:notion`  | Jiri `filter` + `sorts` nhọrọ mee query na database (usoro Notion API). E kewara ya na peeji. |
| `notion_get_database`        | `read:notion`  | Nweta schema/metadata nke database site na ID.                                                |
| `notion_append_blocks`       | `write:notion` | Tinye block ụmụ na block ma ọ bụ peeji dị adị (karịa akarị block 100 n'otu arịrịọ).           |

### Paramita ntinye

- `notion_search` — `query` (mkpụrụedemede 1–500), `pageSize` (1–100, ndabara 20),
  `startCursor` (nhọrọ).
- `notion_get_page` — `pageId` (hex mkpụrụedemede 32 ma ọ bụ UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, ndabara 50),
  `startCursor` (nhọrọ).
- `notion_query_database` — `databaseId`, `filter` (nhọrọ, usoro filter Notion),
  `sorts` (array nhọrọ), `pageSize` (1–100, ndabara 50), `startCursor` (nhọrọ).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array nke ihe block),
  `after` (ọnọdụ nhọrọ).

### Scopes

Ngwaọrụ ọgụgụ chọrọ `read:notion`, ebe ngwaọrụ odide chọrọ `write:notion`.
`withScopeEnforcement()` dị na
`open-sse/mcp-server/server.ts` na-amanye scopes naanị mgbe `OMNIROUTE_MCP_ENFORCE_SCOPES=true`;
scopes ndị e kwere ka onye na-akpọ oku jiri na-abịa site na `OMNIROUTE_MCP_SCOPES` (e ji rikoma kewaa)
ma ọ bụ ọnọdụ scope nke API key enyochara njirimara ya. Lee [MCP-SERVER.md](./MCP-SERVER.md) maka
usoro scope zuru ezu.

## Ebe njedebe

| Usoro    | Ụzọ                    | Ebumnuche                              |
| -------- | ---------------------- | -------------------------------------- |
| `GET`    | `/api/settings/notion` | Weghachite `{ connected, hasToken }`.  |
| `POST`   | `/api/settings/notion` | Chekwaa + nyochaa token njikọta ahụ.   |
| `DELETE` | `/api/settings/notion` | Kwụpụ njikọ (hichapụ token echekwara). |

> Ndị a bụ ụzọ ntọala dashboard. **Enweghị proxy endpoint Notion `/v1` ọha
> ọ bụla** — a na-enweta Notion naanị site na ngwa MCP ndị dị n'elu.

## Ọnọdụ ojiji

- **Azịza dabere na ihe ọmụma** — kwe ka onye nnọchi anya jiri `notion_search` chọọ n'ime workspace ahụ ma
  jiri `notion_get_page` nweta nsonaazụ kacha elu tupu ọ zaa, ka nzaghachi wee rụtụ aka n'akwụkwọ ime ụlọ ndị bụ eziokwu.
- **Usoro ọrụ ndị nchekwa data na-akwado** — jiri `notion_query_database` jụọ nchekwa data ọrụ/CRM ajụjụ site na
  nzacha + nhazi, wee chịkọta ma ọ bụ hazie ahịrị ndị ahụ dịka mkpa ha si dị.
- **Ideghachi / ndekọ** — jiri `notion_append_blocks` gbakwunye ndetu nzukọ, nchịkọta
  nke mmezu, ma ọ bụ nsonaazụ onye nnọchi anya n'ime ibe dị adị (naanị mgbakwunye; enweghị ndezi na-emebi ihe).
- **Nnyocha nhazi** — jiri `notion_list_block_children` gafee osisi blọk nke ibe,
  ma ọ bụ jiri `notion_get_database` chọpụta schema njirimara nchekwa data tupu ịjụ ya ajụjụ.

## Ihe ndị metụtara ya

- [Sava MCP](./MCP-SERVER.md) — ụzọ mbufe, mmanye oke ikike, ndepụta ngwa niile.
- [Isi Iyi Ọdịnaya Obsidian](./OBSIDIAN_CONTEXT.md) — isi iyi ọdịnaya ọzọ arụnyere n'ime ya.
- [Sistemụ Ncheta](./MEMORY.md) — ncheta mkparịta ụka na-adịgide adịgide (akwa
  ọdịnaya nkwado, nke a na-etinye na-akpaghị aka kama iji ngwa weta ya).
