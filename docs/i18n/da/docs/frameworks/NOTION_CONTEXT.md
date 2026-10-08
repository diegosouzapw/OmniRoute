# Notion Context Source (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sandhedskilde:** `src/lib/notion/api.ts` (REST-klient), `src/lib/db/notion.ts`
> (tokenlagring), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-værktøjer),
> `src/app/api/settings/notion/route.ts` (indstillings-API). Værktøjsregistrering og
> scope-kobling findes i `open-sse/mcp-server/server.ts`.

## Hvad det er

OmniRoute kan oprette forbindelse til et **Notion**-arbejdsområde som en **kontekstkilde** — en
vidensbase med læse- og skriveadgang, som agenter tilgår via den indbyggede MCP-server. Når et
Notion-integrationstoken er konfigureret, gør MCP-værktøjerne det muligt for en LLM at søge i sider
og databaser, læse sideindhold og bloktræer, forespørge databaser med filtre/sorteringer og tilføje
nye blokke — alt sammen videresendt gennem OmniRoute (med genforsøg, timeout og fejlklassificering),
så modellen aldrig tilgår Notion-API'en direkte.

Integrationen er en enkel, robust wrapper omkring den officielle Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klienten
(`src/lib/notion/api.ts`) tilføjer:

- **Genforsøg med eksponentiel backoff** (op til 3 forsøg) for `429` og `5xx`.
- **Timeout for anmodninger på 55 sekunder** via `AbortController`.
- **Typet fejlklassificering** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respekterer `retry after`-
  anvisninger), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Rensning af meddelelser**, der fjerner fragmenter, som ligner stacktraces, før de vises.

## Opsætning

Der er **ingen miljøvariabel** til Notion-tokenet — det gemmes i SQLite-tabellen
`key_value` (namespace `notion`, nøgle `integration_token`) via
`src/lib/db/notion.ts`. Konfigurer det fra fanen **Kontekstkilder** i endpointets
dashboard (`ObsidianSourceCard`s søskende `NotionSourceCard`) eller via REST-API'en til indstillinger.

> [!NOTE]
> Tokenet er et **internt Notion-integrationstoken**. Opret en integration på
> <https://www.notion.com/my-integrations>, og del derefter de sider/databaser, som
> OmniRoute skal have adgang til, med denne integration (Notions tilladelsesmodel er baseret på deling,
> ikke på adgang til hele arbejdsområdet).

### Konfigurer via REST

```bash
# Gem og valider integrationstokenet (POST validerer ved at udføre en testsøgning)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kontrollér forbindelsesstatus
curl http://localhost:20128/api/settings/notion

# Afbryd forbindelsen (rydder det gemte token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Alle tre metoder kræver dashboard-godkendelse (`isAuthenticated`). Ved `POST`
gemmer OmniRoute tokenet og udfører straks en testsøgning med 1 resultat. Hvis Notion
returnerer et fejlobjekt, ryddes tokenet, og kaldet mislykkes med `400`.

## MCP-værktøjer (6)

Defineret i `open-sse/mcp-server/tools/notionTools.ts`. Tokenet hentes på
kaldetidspunktet via `getNotionToken()`; hvis intet er konfigureret, udløser værktøjet fejlen
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Værktøj                      | Scope          | Beskrivelse                                                                                          |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Søg i sider og databaser med en tekstforespørgsel (returnerer titler, ID'er og URL'er). Sideinddelt. |
| `notion_get_page`            | `read:notion`  | Hent indholdet og metadataene for en side ud fra dens ID.                                            |
| `notion_list_block_children` | `read:notion`  | Vis alle underblokke for en blok eller side (bloktræet). Sideinddelt.                                |
| `notion_query_database`      | `read:notion`  | Forespørg en database med valgfri `filter` + `sorts` (Notion API-format). Sideinddelt.               |
| `notion_get_database`        | `read:notion`  | Hent skemaet/metadataene for en database ud fra ID.                                                  |
| `notion_append_blocks`       | `write:notion` | Føj underblokke til en eksisterende blok eller side (maks. 100 blokke pr. anmodning).                |

### Inputparametre

- `notion_search` — `query` (1–500 tegn), `pageSize` (1–100, standardværdi 20),
  `startCursor` (valgfri).
- `notion_get_page` — `pageId` (32-tegns hex-værdi eller UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, standardværdi 50),
  `startCursor` (valgfri).
- `notion_query_database` — `databaseId`, `filter` (valgfrit, Notion-filterformat),
  `sorts` (valgfrit array), `pageSize` (1–100, standardværdi 50), `startCursor` (valgfri).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array af blokobjekter),
  `after` (valgfri position).

### Scopes

Læseværktøjerne kræver `read:notion`, og skriveværktøjet kræver `write:notion`.
Scopes håndhæves af `withScopeEnforcement()` i
`open-sse/mcp-server/server.ts`, men kun når `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; kalderens
tilladte scopes kommer fra `OMNIROUTE_MCP_SCOPES` (kommasepareret) eller den
godkendte API-nøgles scope-kontekst. Se [MCP-SERVER.md](./MCP-SERVER.md) for den
fulde scope-model.

## Endpoints

| Metode   | Sti                    | Formål                                     |
| -------- | ---------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/notion` | Returnér `{ connected, hasToken }`.        |
| `POST`   | `/api/settings/notion` | Gem og valider integrationstokenet.        |
| `DELETE` | `/api/settings/notion` | Afbryd forbindelsen (ryd det gemte token). |

> Dette er indstillingsruter til dashboardet. Der findes **ikke noget offentligt `/v1`-Notion-proxy-
> endpoint** — Notion tilgås udelukkende via MCP-værktøjerne ovenfor.

## Anvendelsestilfælde

- **Svar baseret på viden** — lad en agent bruge `notion_search` i arbejdsområdet og
  `notion_get_page` på det øverste resultat, før den svarer, så svarene henviser til faktiske interne dokumenter.
- **Databasebaserede arbejdsgange** — brug `notion_query_database` på en opgave-/CRM-database med
  filtre og sorteringer, og opsummer eller prioriter derefter rækkerne.
- **Tilbageskrivning/logning** — brug `notion_append_blocks` til at tilføje mødenoter, kørsels-
  opsummeringer eller agentoutput til en eksisterende side (kun tilføjelse; ingen destruktive redigeringer).
- **Udforskning af struktur** — brug `notion_list_block_children` til at gennemgå en sides bloktræ
  eller `notion_get_database` til at finde en databases egenskabsskema, før den forespørges.

## Relateret

- [MCP-server](./MCP-SERVER.md) — transporter, håndhævelse af anvendelsesområde og komplet værktøjsoversigt.
- [Obsidian-kontekstkilde](./OBSIDIAN_CONTEXT.md) — den anden indbyggede kontekstkilde.
- [Hukommelsessystem](./MEMORY.md) — vedvarende samtalehukommelse (supplerende
  kontekstlag, der indsprøjtes automatisk i stedet for at blive hentet via værktøjer).
