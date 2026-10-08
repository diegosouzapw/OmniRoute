# Notion Context Source (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Bron van waarheid:** `src/lib/notion/api.ts` (REST-client), `src/lib/db/notion.ts`
> (tokenopslag), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-tools),
> `src/app/api/settings/notion/route.ts` (instellingen-API). Toolregistratie en
> scopekoppeling bevinden zich in `open-sse/mcp-server/server.ts`.

## Wat het is

OmniRoute kan verbinding maken met een **Notion**-werkruimte als **contextbron** — een
kennisbank met lees- en schrijftoegang die agents via de ingebouwde MCP-server kunnen
benaderen. Zodra een Notion-integratietoken is geconfigureerd, kunnen de MCP-tools een
LLM pagina's en databases laten doorzoeken, pagina-inhoud en blokstructuren laten lezen,
databases met filters/sorteringen laten doorzoeken en nieuwe blokken laten toevoegen —
dit alles verloopt via OmniRoute (met nieuwe pogingen, time-outs en foutclassificatie),
zodat het model de Notion-API nooit rechtstreeks benadert.

De integratie is een dunne, geharde wrapper rond de officiële Notion REST-API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). De client
(`src/lib/notion/api.ts`) voegt het volgende toe:

- **Nieuwe pogingen met exponentiële vertraging** (maximaal 3 pogingen) voor `429` en `5xx`.
- **Time-out van 55 seconden per verzoek** via `AbortController`.
- **Getypeerde foutclassificatie** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, houdt rekening met
  `retry after`-aanwijzingen), `NotionValidationError` (400/409), `NotionServerError`
  (5xx), `NotionTimeoutError`.
- **Opschoning van berichten**, waarbij fragmenten die op stacktraces lijken worden
  verwijderd voordat ze worden getoond.

## Configuratie

Er is **geen omgevingsvariabele** voor het Notion-token — het wordt opgeslagen in de
SQLite-tabel `key_value` (naamruimte `notion`, sleutel `integration_token`) via
`src/lib/db/notion.ts`. Configureer het via het tabblad **Context Sources** van het
Endpoint-dashboard (`NotionSourceCard`, naast `ObsidianSourceCard`), of via de
REST-API voor instellingen.

> [!NOTE]
> Het token is een **intern integratietoken van Notion**. Maak een integratie aan op
> <https://www.notion.com/my-integrations> en deel vervolgens de pagina's/databases
> waartoe OmniRoute toegang moet hebben met die integratie (het machtigingsmodel van
> Notion is gebaseerd op delen, niet op toegang tot de volledige werkruimte).

### Configureren via REST

```bash
# Sla het integratietoken op en valideer het (POST valideert door een testzoekopdracht uit te voeren)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Controleer de verbindingsstatus
curl http://localhost:20128/api/settings/notion

# Verbreek de verbinding (wist het opgeslagen token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Alle drie de methoden vereisen dashboardauthenticatie (`isAuthenticated`). Bij `POST`
slaat OmniRoute het token op en voert het onmiddellijk een testzoekopdracht met 1
resultaat uit. Als Notion een foutobject retourneert, wordt het token gewist en mislukt
de aanroep met `400`.

## MCP-tools (6)

Gedefinieerd in `open-sse/mcp-server/tools/notionTools.ts`. Het token wordt bij elke
aanroep opgehaald via `getNotionToken()`; als er geen token is geconfigureerd, genereert
de tool de fout
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Tool                         | Scope          | Beschrijving                                                                                         |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Zoek pagina's en databases via een tekstquery (retourneert titels, ID's en URL's). Gepagineerd.      |
| `notion_get_page`            | `read:notion`  | Haal de inhoud en metadata van een pagina op aan de hand van het ID.                                 |
| `notion_list_block_children` | `read:notion`  | Geef alle onderliggende blokken van een blok of pagina weer (de blokstructuur). Gepagineerd.         |
| `notion_query_database`      | `read:notion`  | Doorzoek een database met optionele `filter` + `sorts` (Notion-API-indeling). Gepagineerd.           |
| `notion_get_database`        | `read:notion`  | Haal het schema/de metadata van een database op aan de hand van het ID.                              |
| `notion_append_blocks`       | `write:notion` | Voeg onderliggende blokken toe aan een bestaand blok of bestaande pagina (maximaal 100 per verzoek). |

### Invoerparameters

- `notion_search` — `query` (1–500 tekens), `pageSize` (1–100, standaard 20),
  `startCursor` (optioneel).
- `notion_get_page` — `pageId` (32-tekens lange hexadecimale waarde of UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, standaard 50),
  `startCursor` (optioneel).
- `notion_query_database` — `databaseId`, `filter` (optioneel, Notion-filterindeling),
  `sorts` (optionele array), `pageSize` (1–100, standaard 50), `startCursor` (optioneel).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array van blokobjecten),
  `after` (optionele positie).

### Scopes

De leestools vereisen `read:notion` en de schrijftool vereist `write:notion`.
Scopes worden alleen afgedwongen door `withScopeEnforcement()` in
`open-sse/mcp-server/server.ts` wanneer `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; de
toegestane scopes van de aanroeper zijn afkomstig uit `OMNIROUTE_MCP_SCOPES`
(kommagescheiden) of uit de scopecontext van de geauthenticeerde API-sleutel. Zie
[MCP-SERVER.md](./MCP-SERVER.md) voor het volledige scopemodel.

## Eindpunten

| Methode  | Pad                    | Doel                                                 |
| -------- | ---------------------- | ---------------------------------------------------- |
| `GET`    | `/api/settings/notion` | Retourneert `{ connected, hasToken }`.               |
| `POST`   | `/api/settings/notion` | Slaat het integratietoken op en valideert het.       |
| `DELETE` | `/api/settings/notion` | Verbreekt de verbinding (wist het opgeslagen token). |

> Dit zijn instellingenroutes voor het dashboard. Er is **geen openbaar `/v1`-proxy-
> eindpunt voor Notion** — Notion wordt uitsluitend benaderd via de bovenstaande MCP-tools.

## Gebruiksscenario's

- **Antwoorden gebaseerd op kennis** — laat een agent de werkruimte doorzoeken met `notion_search` en
  vóór het antwoorden het beste resultaat ophalen met `notion_get_page`, zodat antwoorden naar echte interne documentatie verwijzen.
- **Databasegestuurde workflows** — bevraag een taken-/CRM-database met
  `notion_query_database` en filters + sorteringen, en vat de rijen vervolgens samen of prioriteer ze.
- **Terugschrijven / logboekregistratie** — gebruik `notion_append_blocks` om vergadernotities, uitvoerings-
  samenvattingen of agentuitvoer aan een bestaande pagina toe te voegen (alleen toevoegen; geen destructieve bewerkingen).
- **Structuur verkennen** — gebruik `notion_list_block_children` om de blokkenboom van een pagina te doorlopen,
  of `notion_get_database` om het eigenschappenschema van een database te ontdekken voordat deze wordt bevraagd.

## Gerelateerd

- [MCP-server](./MCP-SERVER.md) — transportmethoden, afdwinging van bereik en volledig tooloverzicht.
- [Obsidian-contextbron](./OBSIDIAN_CONTEXT.md) — de andere ingebouwde contextbron.
- [Geheugensysteem](./MEMORY.md) — persistent gespreksgeheugen (aanvullende
  contextlaag die automatisch wordt geïnjecteerd in plaats van via tools te worden opgehaald).
