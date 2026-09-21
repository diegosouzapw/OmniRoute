# Notion Context Source (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Foinse na fírinne:** `src/lib/notion/api.ts` (cliant REST), `src/lib/db/notion.ts`
> (buanseasmhacht an chomhartha), `open-sse/mcp-server/tools/notionTools.ts` (6 uirlis MCP),
> `src/app/api/settings/notion/route.ts` (API socruithe). Tá clárú uirlisí agus sreangú
> scóip in `open-sse/mcp-server/server.ts`.

## Cad atá ann

Is féidir le OmniRoute nascadh le spás oibre **Notion** mar **fhoinse comhthéacs** — bunachar
eolais inléite/inscríofa a mbaineann gníomhairí amach tríd an bhfreastalaí MCP ionsuite. Nuair
a bheidh comhartha comhtháthaithe Notion cumraithe, ligeann na huirlisí MCP do LLM leathanaigh
agus bunachair sonraí a chuardach, inneachar leathanaigh agus crainn bloc a léamh, bunachair
sonraí a cheistiú le scagairí/sórtálacha, agus bloic nua a chur i gceangal — iad uile seachfhreastáilte
trí OmniRoute (le hatriail, teorainn ama, agus aicmiú earráidí), ionas nach dteagmhaíonn an tsamhail
leis an Notion API go díreach riamh.

Is fillteán tanaí, treisithe é an comhtháthú timpeall ar an Notion REST API oifigiúil
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Cuireann an cliant
(`src/lib/notion/api.ts`) na nithe seo a leanas leis:

- **Atriail le cúlú easpónantúil** (suas le 3 iarracht) i gcás `429` agus `5xx`.
- **Teorainn ama 55 soicind ar iarratais** trí `AbortController`.
- **Aicmiú clóscríofa earráidí** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, cloíonn sé le leideanna
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sláintiú teachtaireachtaí** a bhaineann blúirí atá cosúil le rian cruaiche sula dtaispeántar iad.

## Socrú

Níl **aon athróg timpeallachta** ann don chomhartha Notion — stóráiltear é sa tábla
SQLite `key_value` (ainmspás `notion`, eochair `integration_token`) trí
`src/lib/db/notion.ts`. Cumraigh é ón gcluaisín **Foinsí Comhthéacs** ar dheais an Chríochphointe
(`NotionSourceCard`, siblín `ObsidianSourceCard`), nó trí API REST na socruithe.

> [!NOTE]
> Is **comhartha comhtháthaithe inmheánach Notion** é an comhartha. Cruthaigh comhtháthú ag
> <https://www.notion.com/my-integrations>, ansin comhroinn na leathanaigh/bunachair sonraí ar mian
> leat go mbeadh rochtain ag OmniRoute orthu leis an gcomhtháthú sin (tá samhail ceadanna Notion
> bunaithe ar chomhroinnt, ní ar an spás oibre ina iomláine).

### Cumrú trí REST

```bash
# Sábháil + bailíochtaigh an comhartha comhtháthaithe (déanann POST bailíochtú trí chuardach tástála a eisiúint)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Seiceáil stádas an naisc
curl http://localhost:20128/api/settings/notion

# Dícheangail (glanann sé an comhartha stóráilte)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Éilíonn na trí mhodh fíordheimhniú deaise (`isAuthenticated`). Ar `POST`,
sábhálann OmniRoute an comhartha agus ritheann sé cuardach tástála 1 toradh láithreach; má
fhilleann Notion oibiacht earráide, glantar an comhartha agus teipeann ar an nglao le `400`.

## Uirlisí MCP (6)

Sainmhínítear iad in `open-sse/mcp-server/tools/notionTools.ts`. Réitítear an comhartha tráth
an ghlao trí `getNotionToken()`; mura bhfuil ceann ar bith cumraithe, caitheann an uirlis
`"Níl comhartha comhtháthaithe Notion cumraithe. Socraigh é in Socruithe > Foinsí Comhthéacs."`

| Uirlis                       | Scóip          | Cur síos                                                                                                                         |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Cuardaigh leathanaigh agus bunachair sonraí de réir iarratais téacs (filleann sé teidil, aitheantais, URLanna). Leathanachaithe. |
| `notion_get_page`            | `read:notion`  | Faigh inneachar agus meiteashonraí leathanaigh de réir a aitheantais.                                                            |
| `notion_list_block_children` | `read:notion`  | Liostaigh gach macbhloc de bhloc nó de leathanach (an crann bloc). Leathanachaithe.                                              |
| `notion_query_database`      | `read:notion`  | Cuir ceist ar bhunachar sonraí le `filter` + `sorts` roghnacha (formáid Notion API). Leathanachaithe.                            |
| `notion_get_database`        | `read:notion`  | Faigh scéimre/meiteashonraí bunachair sonraí de réir a aitheantais.                                                              |
| `notion_append_blocks`       | `write:notion` | Cuir macbhloic i gceangal le bloc nó leathanach atá ann cheana (uasmhéid 100 bloc in aghaidh an iarratais).                      |

### Paraiméadair ionchuir

- `notion_search` — `query` (1–500 carachtar), `pageSize` (1–100, réamhshocrú 20),
  `startCursor` (roghnach).
- `notion_get_page` — `pageId` (heics 32 carachtar nó UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, réamhshocrú 50),
  `startCursor` (roghnach).
- `notion_query_database` — `databaseId`, `filter` (roghnach, formáid scagaire Notion),
  `sorts` (eagar roghnach), `pageSize` (1–100, réamhshocrú 50), `startCursor` (roghnach).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (eagar oibiachtaí bloc),
  `after` (suíomh roghnach).

### Scóipeanna

Éilíonn na huirlisí léitheoireachta `read:notion` agus éilíonn an uirlis scríbhneoireachta
`write:notion`. Cuireann `withScopeEnforcement()` in
`open-sse/mcp-server/server.ts` na scóipeanna i bhfeidhm nuair atá
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` amháin; tagann scóipeanna ceadaithe an ghlaoiteora ó
`OMNIROUTE_MCP_SCOPES` (deighilte le camóga) nó ó chomhthéacs scóip na heochrach API
fíordheimhnithe. Féach [MCP-SERVER.md](./MCP-SERVER.md) le haghaidh na samhla scóip
iomláine.

## Críochphointí

| Modh     | Conair                 | Cuspóir                                              |
| -------- | ---------------------- | ---------------------------------------------------- |
| `GET`    | `/api/settings/notion` | Tabhair `{ connected, hasToken }` ar ais.            |
| `POST`   | `/api/settings/notion` | Sábháil + bailíochtaigh an comhartha comhtháthaithe. |
| `DELETE` | `/api/settings/notion` | Dícheangail (glan an comhartha stóráilte).           |

> Is bealaí socruithe deaise iad seo. Níl aon chríochphointe seachfhreastalaí Notion
> poiblí `/v1` ann — ní shroichtear Notion ach trí na huirlisí MCP thuas.

## Cásanna úsáide

- **Freagraí bunaithe ar eolas** — lig do ghníomhaire `notion_search` a dhéanamh sa spás oibre agus
  `notion_get_page` a dhéanamh ar an toradh is fearr sula bhfreagraíonn sé, ionas go luann na freagraí fíordhoiciméid inmheánacha.
- **Sreafaí oibre bunaithe ar bhunachar sonraí** — déan `notion_query_database` ar bhunachar sonraí tascanna/CRM le
  scagairí + sórtálacha, ansin déan achoimre ar na rónna nó triáiseáil iad.
- **Aisscríobh / logáil** — úsáid `notion_append_blocks` chun nótaí cruinnithe, achoimrí
  rite, nó aschur gníomhaire a chur le leathanach atá ann cheana (iarcheangal amháin; gan aon eagarthóireacht scriosach).
- **Iniúchadh struchtúir** — úsáid `notion_list_block_children` chun crann bloc leathanach a shiúl,
  nó `notion_get_database` chun scéimre airíonna bunachair sonraí a aimsiú sula gcuirtear ceist air.

## Gaolmhar

- [Freastalaí MCP](./MCP-SERVER.md) — iompróirí, forfheidhmiú raoin, fardal iomlán uirlisí.
- [Foinse Comhthéacs Obsidian](./OBSIDIAN_CONTEXT.md) — an fhoinse chomhthéacs ionsuite eile.
- [Córas Cuimhne](./MEMORY.md) — cuimhne chomhrá mharthanach (ciseal comhthéacs
  comhlántach, a instealltar go huathoibríoch seachas a aisghabháil le huirlis).
