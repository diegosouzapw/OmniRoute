# Notion Context Source (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Zdroj pravdy:** `src/lib/notion/api.ts` (klient REST), `src/lib/db/notion.ts`
> (uchovávanie tokenu), `open-sse/mcp-server/tools/notionTools.ts` (6 nástrojov MCP),
> `src/app/api/settings/notion/route.ts` (API nastavení). Registrácia nástrojov a prepojenie
> rozsahov sa nachádzajú v `open-sse/mcp-server/server.ts`.

## Čo to je

OmniRoute sa môže pripojiť k pracovnému priestoru **Notion** ako k **zdroju kontextu** — databáze
znalostí na čítanie a zápis, ku ktorej agenti pristupujú prostredníctvom vstavaného servera MCP. Po
nakonfigurovaní integračného tokenu Notion umožnia nástroje MCP modelu LLM vyhľadávať stránky a
databázy, čítať obsah stránok a stromy blokov, vyhľadávať v databázach pomocou filtrov/zoradenia
a pridávať nové bloky — všetko je sprostredkované cez OmniRoute (s opakovaním, časovým limitom a
klasifikáciou chýb), takže model nikdy nepristupuje priamo k API Notion.

Integrácia je jednoduchá a odolná nadstavba nad oficiálnym rozhraním Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klient
(`src/lib/notion/api.ts`) pridáva:

- **Opakovanie s exponenciálnym oneskorením** (najviac 3 pokusy) pre `429` a `5xx`.
- **55-sekundový časový limit požiadavky** prostredníctvom `AbortController`.
- **Typovú klasifikáciu chýb** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, rešpektuje pokyny `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitizáciu správ**, ktorá pred ich zobrazením odstraňuje fragmenty podobné výpisom zásobníka.

## Nastavenie

Pre token Notion **neexistuje žiadna premenná prostredia** — ukladá sa do tabuľky SQLite
`key_value` (menný priestor `notion`, kľúč `integration_token`) prostredníctvom
`src/lib/db/notion.ts`. Nakonfigurujte ho na karte **Zdroje kontextu** ovládacieho panela
koncového bodu (`NotionSourceCard` vedľa `ObsidianSourceCard`) alebo prostredníctvom REST API nastavení.

> [!NOTE]
> Token je **token internej integrácie Notion**. Vytvorte integráciu na adrese
> <https://www.notion.com/my-integrations> a následne s ňou zdieľajte stránky/databázy,
> ku ktorým má mať OmniRoute prístup (model oprávnení Notion je založený na zdieľaní,
> nie na prístupe k celému pracovnému priestoru).

### Konfigurácia prostredníctvom REST

```bash
# Uloženie a overenie integračného tokenu (POST vykoná overenie pomocou testovacieho vyhľadávania)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kontrola stavu pripojenia
curl http://localhost:20128/api/settings/notion

# Odpojenie (vymaže uložený token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Všetky tri metódy vyžadujú autentifikáciu ovládacieho panela (`isAuthenticated`). Pri požiadavke `POST`
OmniRoute uloží token a okamžite spustí testovacie vyhľadávanie s 1 výsledkom; ak Notion
vráti objekt chyby, token sa vymaže a volanie zlyhá so stavom `400`.

## Nástroje MCP (6)

Definované v `open-sse/mcp-server/tools/notionTools.ts`. Token sa načítava pri volaní
prostredníctvom `getNotionToken()`; ak nie je žiadny nakonfigurovaný, nástroj vyvolá chybu
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Nástroj                      | Rozsah         | Opis                                                                                                |
| ---------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Vyhľadáva stránky a databázy podľa textového dopytu (vracia názvy, ID a URL). Stránkované.          |
| `notion_get_page`            | `read:notion`  | Získa obsah a metadáta stránky podľa jej ID.                                                        |
| `notion_list_block_children` | `read:notion`  | Vypíše všetky podradené bloky bloku alebo stránky (strom blokov). Stránkované.                      |
| `notion_query_database`      | `read:notion`  | Vyhľadáva v databáze s voliteľnými parametrami `filter` + `sorts` (formát API Notion). Stránkované. |
| `notion_get_database`        | `read:notion`  | Získa schému/metadáta databázy podľa ID.                                                            |
| `notion_append_blocks`       | `write:notion` | Pridá podradené bloky do existujúceho bloku alebo stránky (najviac 100 blokov na požiadavku).       |

### Vstupné parametre

- `notion_search` — `query` (1–500 znakov), `pageSize` (1–100, predvolene 20),
  `startCursor` (voliteľné).
- `notion_get_page` — `pageId` (32-znaková hexadecimálna hodnota alebo UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, predvolene 50),
  `startCursor` (voliteľné).
- `notion_query_database` — `databaseId`, `filter` (voliteľné, formát filtra Notion),
  `sorts` (voliteľné pole), `pageSize` (1–100, predvolene 50), `startCursor` (voliteľné).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (pole objektov blokov),
  `after` (voliteľná pozícia).

### Rozsahy

Nástroje na čítanie vyžadujú `read:notion` a nástroj na zápis vyžaduje `write:notion`.
Rozsahy vynucuje `withScopeEnforcement()` v
`open-sse/mcp-server/server.ts` iba vtedy, keď `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; povolené
rozsahy volajúceho pochádzajú z `OMNIROUTE_MCP_SCOPES` (oddelené čiarkami) alebo z kontextu
rozsahov autentifikovaného kľúča API. Úplný model rozsahov nájdete v
[MCP-SERVER.md](./MCP-SERVER.md).

## Koncové body

| Metóda   | Cesta                  | Účel                              |
| -------- | ---------------------- | --------------------------------- |
| `GET`    | `/api/settings/notion` | Vrátiť `{ connected, hasToken }`. |
| `POST`   | `/api/settings/notion` | Uložiť a overiť integračný token. |
| `DELETE` | `/api/settings/notion` | Odpojiť (vymazať uložený token).  |

> Toto sú trasy nastavení ovládacieho panela. Neexistuje **žiadny verejný proxy
> koncový bod Notion `/v1`** — k službe Notion sa pristupuje výhradne prostredníctvom nástrojov MCP uvedených vyššie.

## Prípady použitia

- **Odpovede založené na znalostiach** — umožnite agentovi použiť `notion_search` na prehľadanie pracovného priestoru a
  `notion_get_page` na získanie najrelevantnejšieho výsledku pred zodpovedaním otázky, aby odpovede citovali skutočnú internú dokumentáciu.
- **Pracovné postupy podporované databázou** — použite `notion_query_database` na databázu úloh/CRM s
  filtrami a zoradením a potom zhrňte alebo roztrieďte riadky.
- **Spätný zápis/protokolovanie** — použite `notion_append_blocks` na pridanie poznámok zo stretnutí, súhrnov
  spustení alebo výstupu agenta na existujúcu stránku (iba pridávanie; bez deštruktívnych úprav).
- **Preskúmanie štruktúry** — použite `notion_list_block_children` na prechádzanie stromom blokov stránky
  alebo `notion_get_database` na zistenie schémy vlastností databázy pred jej dotazovaním.

## Súvisiace

- [Server MCP](./MCP-SERVER.md) — transporty, vynucovanie rozsahu, úplný zoznam nástrojov.
- [Zdroj kontextu Obsidian](./OBSIDIAN_CONTEXT.md) — ďalší vstavaný zdroj kontextu.
- [Pamäťový systém](./MEMORY.md) — trvalá konverzačná pamäť (doplnková
  vrstva kontextu, ktorá sa vkladá automaticky namiesto získavania pomocou nástrojov).
