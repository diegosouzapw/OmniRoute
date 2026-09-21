# Notion Context Source (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sanningskälla:** `src/lib/notion/api.ts` (REST-klient), `src/lib/db/notion.ts`
> (tokenlagring), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-verktyg),
> `src/app/api/settings/notion/route.ts` (inställnings-API). Verktygsregistrering och
> omfångskoppling finns i `open-sse/mcp-server/server.ts`.

## Vad det är

OmniRoute kan ansluta till en **Notion**-arbetsyta som en **kontextkälla** – en skriv- och
läsbar kunskapsbas som agenter når via den inbyggda MCP-servern. När en
Notion-integrationstoken har konfigurerats kan MCP-verktygen låta en LLM söka bland sidor och databaser,
läsa sidinnehåll och blockträd, fråga databaser med filter/sorteringar och lägga till nya
block – allt via en proxy genom OmniRoute (med återförsök, tidsgräns och felklassificering),
så att modellen aldrig använder Notion API direkt.

Integrationen är ett tunt, förstärkt omslag runt Notions officiella REST-API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klienten
(`src/lib/notion/api.ts`) lägger till:

- **Återförsök med exponentiell fördröjning** (upp till 3 försök) för `429` och `5xx`.
- **55 sekunders tidsgräns för begäranden** via `AbortController`.
- **Typad felklassificering** – `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respekterar anvisningar om `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Meddelandesanering** som tar bort stackspårningsliknande fragment innan de visas.

## Konfiguration

Det finns **ingen miljövariabel** för Notion-token – den lagras i SQLite-tabellen
`key_value` (namnrymd `notion`, nyckel `integration_token`) via
`src/lib/db/notion.ts`. Konfigurera den från fliken **Kontextkällor** på slutpunktens
instrumentpanel (`ObsidianSourceCard`:s syskonkomponent `NotionSourceCard`) eller via REST-API:t för inställningar.

> [!NOTE]
> Token är en **intern integrationstoken för Notion**. Skapa en integration på
> <https://www.notion.com/my-integrations> och dela sedan de sidor/databaser som du vill
> att OmniRoute ska få åtkomst till med den integrationen (Notions behörighetsmodell är delningsbaserad,
> inte arbetsyteomfattande).

### Konfigurera via REST

```bash
# Spara och validera integrationstoken (POST validerar genom att utföra en testsökning)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kontrollera anslutningsstatus
curl http://localhost:20128/api/settings/notion

# Koppla från (rensar den lagrade token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Alla tre metoder kräver autentisering för instrumentpanelen (`isAuthenticated`). Vid `POST`
sparar OmniRoute token och kör omedelbart en testsökning med 1 resultat. Om Notion
returnerar ett felobjekt rensas token och anropet misslyckas med `400`.

## MCP-verktyg (6)

Definieras i `open-sse/mcp-server/tools/notionTools.ts`. Token hämtas vid
anropstillfället via `getNotionToken()`; om ingen har konfigurerats utlöser verktyget
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Verktyg                      | Omfång         | Beskrivning                                                                                                   |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Sök efter sidor och databaser med en textfråga (returnerar titlar, ID:n och URL:er). Sidindelad.              |
| `notion_get_page`            | `read:notion`  | Hämta innehåll och metadata för en sida via dess ID.                                                          |
| `notion_list_block_children` | `read:notion`  | Lista alla underordnade block för ett block eller en sida (blockträdet). Sidindelad.                          |
| `notion_query_database`      | `read:notion`  | Fråga en databas med valfria `filter` + `sorts` (Notion API-format). Sidindelad.                              |
| `notion_get_database`        | `read:notion`  | Hämta schemat/metadatan för en databas via ID.                                                                |
| `notion_append_blocks`       | `write:notion` | Lägg till underordnade block i ett befintligt block eller på en befintlig sida (högst 100 block per begäran). |

### Indataparametrar

- `notion_search` – `query` (1–500 tecken), `pageSize` (1–100, standardvärde 20),
  `startCursor` (valfri).
- `notion_get_page` – `pageId` (hexadecimal sträng med 32 tecken eller UUID).
- `notion_list_block_children` – `blockId`, `pageSize` (1–100, standardvärde 50),
  `startCursor` (valfri).
- `notion_query_database` – `databaseId`, `filter` (valfritt, Notion-filterformat),
  `sorts` (valfri array), `pageSize` (1–100, standardvärde 50), `startCursor` (valfri).
- `notion_get_database` – `databaseId`.
- `notion_append_blocks` – `blockId`, `children` (array med blockobjekt),
  `after` (valfri position).

### Omfång

Läsverktygen kräver `read:notion` och skrivverktyget kräver `write:notion`.
Omfång tillämpas av `withScopeEnforcement()` i
`open-sse/mcp-server/server.ts` endast när `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; anroparens
tillåtna omfång kommer från `OMNIROUTE_MCP_SCOPES` (kommaseparerade) eller den
autentiserade API-nyckelns omfångskontext. Se [MCP-SERVER.md](./MCP-SERVER.md) för den
fullständiga omfångsmodellen.

## Ändpunkter

| Metod    | Sökväg                 | Syfte                                 |
| -------- | ---------------------- | ------------------------------------- |
| `GET`    | `/api/settings/notion` | Returnera `{ connected, hasToken }`.  |
| `POST`   | `/api/settings/notion` | Spara och validera integrationstoken. |
| `DELETE` | `/api/settings/notion` | Koppla från (rensa lagrad token).     |

> Dessa är inställningsrutter för kontrollpanelen. Det finns **ingen offentlig `/v1`-proxyändpunkt
> för Notion** — Notion nås uteslutande via MCP-verktygen ovan.

## Användningsfall

- **Svar grundade i kunskapsbasen** — låt en agent köra `notion_search` i arbetsytan och
  `notion_get_page` på den främsta träffen innan den svarar, så att svaren hänvisar till verkliga interna dokument.
- **Databasbaserade arbetsflöden** — kör `notion_query_database` mot en uppgifts-/CRM-databas med
  filter och sorteringar och sammanfatta eller prioritera sedan raderna.
- **Återskrivning/loggning** — använd `notion_append_blocks` för att lägga till mötesanteckningar, körningssammanfattningar
  eller agentutdata på en befintlig sida (endast tillägg; inga destruktiva ändringar).
- **Utforskning av struktur** — använd `notion_list_block_children` för att gå igenom en sidas blockträd
  eller `notion_get_database` för att identifiera en databas egenskapsschema innan den frågas.

## Relaterat

- [MCP-server](./MCP-SERVER.md) — transporter, omfångskontroll och fullständig verktygsförteckning.
- [Obsidian-kontextkälla](./OBSIDIAN_CONTEXT.md) — den andra inbyggda kontextkällan.
- [Minnessystem](./MEMORY.md) — beständigt konversationsminne (kompletterande
  kontextlager som injiceras automatiskt i stället för att hämtas med verktyg).
