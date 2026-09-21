# Notion Context Source (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sannhetskilde:** `src/lib/notion/api.ts` (REST-klient), `src/lib/db/notion.ts`
> (lagring av token), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-verktøy),
> `src/app/api/settings/notion/route.ts` (innstillings-API). Registrering av verktøy og
> konfigurering av tilgangsområder ligger i `open-sse/mcp-server/server.ts`.

## Hva det er

OmniRoute kan koble til et **Notion**-arbeidsområde som en **kontekstkilde** — en
lesbar og skrivbar kunnskapsbase som agenter får tilgang til gjennom den innebygde
MCP-serveren. Når et integrasjonstoken for Notion er konfigurert, lar MCP-verktøyene
en LLM søke i sider og databaser, lese sideinnhold og blokktrær, spørre databaser med
filtre/sorteringer og legge til nye blokker — alt videresendt gjennom OmniRoute (med
nye forsøk, tidsavbrudd og feilklassifisering), slik at modellen aldri kommuniserer
direkte med Notion-API-et.

Integrasjonen er et tynt, robust lag over det offisielle REST-API-et til Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klienten
(`src/lib/notion/api.ts`) legger til:

- **Nye forsøk med eksponentiell tilbakeventing** (opptil 3 forsøk) for `429` og `5xx`.
- **55 sekunders tidsavbrudd for forespørsler** via `AbortController`.
- **Typebasert feilklassifisering** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, tar hensyn til
  `retry after`-hint), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Rensing av meldinger** som fjerner fragmenter som ligner stakkspor før de vises.

## Oppsett

Det finnes **ingen miljøvariabel** for Notion-tokenet — det lagres i SQLite-tabellen
`key_value` (navnerom `notion`, nøkkel `integration_token`) via
`src/lib/db/notion.ts`. Konfigurer det fra fanen **Kontekstkilder** i endepunktets
kontrollpanel (`NotionSourceCard`, som ligger ved siden av `ObsidianSourceCard`), eller
via REST-API-et for innstillinger.

> [!NOTE]
> Tokenet er et **internt integrasjonstoken for Notion**. Opprett en integrasjon på
> <https://www.notion.com/my-integrations>, og del deretter sidene/databasene du vil
> at OmniRoute skal få tilgang til, med denne integrasjonen (Notions tilgangsmodell
> er delingsbasert, ikke basert på hele arbeidsområdet).

### Konfigurer via REST

```bash
# Lagre + valider integrasjonstokenet (POST validerer ved å utføre et testsøk)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kontroller tilkoblingsstatus
curl http://localhost:20128/api/settings/notion

# Koble fra (sletter det lagrede tokenet)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Alle tre metodene krever autentisering i kontrollpanelet (`isAuthenticated`). Ved
`POST` lagrer OmniRoute tokenet og utfører umiddelbart et testsøk med 1 resultat.
Hvis Notion returnerer et feilobjekt, slettes tokenet, og kallet mislykkes med `400`.

## MCP-verktøy (6)

Definert i `open-sse/mcp-server/tools/notionTools.ts`. Tokenet hentes ved kall via
`getNotionToken()`; hvis ingen token er konfigurert, kaster verktøyet feilen
`"Integrasjonstoken for Notion er ikke konfigurert. Angi det under Innstillinger > Kontekstkilder."`

| Verktøy                      | Tilgangsområde | Beskrivelse                                                                                   |
| ---------------------------- | -------------- | --------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Søk etter sider og databaser med et tekstsøk (returnerer titler, ID-er og URL-er). Paginert.  |
| `notion_get_page`            | `read:notion`  | Hent innholdet og metadataene til en side ved hjelp av side-ID-en.                            |
| `notion_list_block_children` | `read:notion`  | Vis alle underblokker for en blokk eller side (blokktreet). Paginert.                         |
| `notion_query_database`      | `read:notion`  | Spør en database med valgfrie `filter` + `sorts` (Notion API-format). Paginert.               |
| `notion_get_database`        | `read:notion`  | Hent skjemaet/metadataene til en database ved hjelp av ID-en.                                 |
| `notion_append_blocks`       | `write:notion` | Legg til underblokker i en eksisterende blokk eller side (maks. 100 blokker per forespørsel). |

### Inndataparametere

- `notion_search` — `query` (1–500 tegn), `pageSize` (1–100, standardverdi 20),
  `startCursor` (valgfri).
- `notion_get_page` — `pageId` (32-tegns heksadesimal verdi eller UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, standardverdi 50),
  `startCursor` (valgfri).
- `notion_query_database` — `databaseId`, `filter` (valgfritt, Notion-filterformat),
  `sorts` (valgfri matrise), `pageSize` (1–100, standardverdi 50), `startCursor` (valgfri).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (matrise med blokkobjekter),
  `after` (valgfri posisjon).

### Tilgangsområder

Leseverktøyene krever `read:notion`, og skriveverktøyet krever `write:notion`.
Tilgangsområdene håndheves av `withScopeEnforcement()` i
`open-sse/mcp-server/server.ts` bare når `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; de
tillatte tilgangsområdene til den som utfører kallet, kommer fra
`OMNIROUTE_MCP_SCOPES` (kommaseparert) eller tilgangskonteksten til den autentiserte
API-nøkkelen. Se [MCP-SERVER.md](./MCP-SERVER.md) for hele tilgangsmodellen.

## Endepunkter

| Metode   | Bane                   | Formål                                 |
| -------- | ---------------------- | -------------------------------------- |
| `GET`    | `/api/settings/notion` | Returner `{ connected, hasToken }`.    |
| `POST`   | `/api/settings/notion` | Lagre og valider integrasjonstokenet.  |
| `DELETE` | `/api/settings/notion` | Koble fra (slett det lagrede tokenet). |

> Dette er innstillingsruter for kontrollpanelet. Det finnes **ikke noe offentlig `/v1`-proxyendepunkt
> for Notion** — Notion nås utelukkende via MCP-verktøyene ovenfor.

## Bruksområder

- **Kunnskapsbaserte svar** — la en agent bruke `notion_search` i arbeidsområdet og
  `notion_get_page` på det øverste treffet før den svarer, slik at svarene henviser til faktiske interne dokumenter.
- **Databasebaserte arbeidsflyter** — bruk `notion_query_database` mot en oppgave-/CRM-database med
  filtre og sorteringer, og oppsummer eller prioriter deretter radene.
- **Tilbakeskriving/loggføring** — bruk `notion_append_blocks` for å legge til møtenotater, kjørings-
  sammendrag eller agentutdata på en eksisterende side (kun tillegg; ingen destruktive redigeringer).
- **Utforsking av struktur** — bruk `notion_list_block_children` for å gå gjennom blokkstrukturen på en side,
  eller `notion_get_database` for å finne egenskapsskjemaet til en database før du spør den.

## Relatert

- [MCP-server](./MCP-SERVER.md) — transporter, håndheving av omfang og fullstendig verktøyoversikt.
- [Obsidian-kontekstkilde](./OBSIDIAN_CONTEXT.md) — den andre innebygde kontekstkilden.
- [Minnesystem](./MEMORY.md) — vedvarende samtaleminne (et komplementært
  kontekstlag som injiseres automatisk i stedet for å hentes med verktøy).
