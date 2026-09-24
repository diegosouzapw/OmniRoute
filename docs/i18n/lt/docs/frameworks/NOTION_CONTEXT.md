# Notion Context Source (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Tiesos šaltinis:** `src/lib/notion/api.ts` (REST klientas), `src/lib/db/notion.ts`
> (žetono išsaugojimas), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP įrankiai),
> `src/app/api/settings/notion/route.ts` (nustatymų API). Įrankių registravimas ir aprėpčių
> susiejimas atliekamas faile `open-sse/mcp-server/server.ts`.

## Kas tai yra

OmniRoute gali prisijungti prie **Notion** darbo srities kaip prie **konteksto šaltinio** —
skaitymo ir rašymo žinių bazės, kurią agentai pasiekia per integruotą MCP serverį.
Sukonfigūravus Notion integracijos žetoną, MCP įrankiai leidžia LLM ieškoti puslapių ir
duomenų bazių, skaityti puslapių turinį ir blokų medžius, vykdyti duomenų bazių užklausas
su filtrais bei rikiavimu ir pridėti naujų blokų — visa tai perduodama per OmniRoute
(su pakartotiniais bandymais, skirtuoju laiku ir klaidų klasifikavimu), todėl modelis
niekada tiesiogiai nepasiekia Notion API.

Integracija yra plonas, sustiprintas oficialios Notion REST API apvalkalas
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klientas
(`src/lib/notion/api.ts`) suteikia:

- **Pakartotinius bandymus su eksponentiniu delsos didinimu** (iki 3 bandymų), kai gaunama `429` arba `5xx`.
- **55 sekundžių užklausos skirtąjį laiką**, įgyvendintą per `AbortController`.
- **Tipizuotą klaidų klasifikavimą** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, atsižvelgia į `retry after`
  nuorodas), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Pranešimų išvalymą**, pašalinantį į dėklo sekimą panašius fragmentus prieš juos pateikiant.

## Sąranka

Notion žetonui **nėra aplinkos kintamojo** — jis saugomas SQLite lentelėje `key_value`
(vardų sritis `notion`, raktas `integration_token`) naudojant
`src/lib/db/notion.ts`. Sukonfigūruokite jį galinio taško valdymo skydelio skirtuke
**Konteksto šaltiniai** (`ObsidianSourceCard` gretimame komponente `NotionSourceCard`)
arba naudodami nustatymų REST API.

> [!NOTE]
> Žetonas yra **Notion vidinės integracijos žetonas**. Sukurkite integraciją adresu
> <https://www.notion.com/my-integrations>, tada bendrinkite puslapius ir duomenų bazes,
> kurias norite leisti OmniRoute pasiekti, su ta integracija (Notion leidimų modelis
> pagrįstas bendrinimu, o ne visa darbo sritimi).

### Konfigūravimas per REST

```bash
# Išsaugoti ir patikrinti integracijos žetoną (POST patikrina atlikdama bandomąją paiešką)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Patikrinti ryšio būseną
curl http://localhost:20128/api/settings/notion

# Atsijungti (pašalinamas išsaugotas žetonas)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Visiems trims metodams reikalingas valdymo skydelio autentifikavimas (`isAuthenticated`).
Atliekant `POST`, OmniRoute išsaugo žetoną ir nedelsdamas paleidžia bandomąją paiešką,
pateikiančią 1 rezultatą; jei Notion grąžina klaidos objektą, žetonas pašalinamas, o
iškvieta nepavyksta ir grąžina `400`.

## MCP įrankiai (6)

Apibrėžti faile `open-sse/mcp-server/tools/notionTools.ts`. Žetonas nustatomas iškvietimo
metu naudojant `getNotionToken()`; jei jis nesukonfigūruotas, įrankis pateikia klaidą
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Įrankis                      | Aprėptis       | Aprašymas                                                                                                |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Ieško puslapių ir duomenų bazių pagal tekstinę užklausą (grąžina pavadinimus, ID ir URL). Puslapiuojama. |
| `notion_get_page`            | `read:notion`  | Gauna puslapio turinį ir metaduomenis pagal jo ID.                                                       |
| `notion_list_block_children` | `read:notion`  | Pateikia visus bloko arba puslapio antrinius blokus (blokų medį). Puslapiuojama.                         |
| `notion_query_database`      | `read:notion`  | Vykdo duomenų bazės užklausą su pasirenkamais `filter` + `sorts` (Notion API formatu). Puslapiuojama.    |
| `notion_get_database`        | `read:notion`  | Gauna duomenų bazės schemą ir metaduomenis pagal ID.                                                     |
| `notion_append_blocks`       | `write:notion` | Prideda antrinius blokus prie esamo bloko arba puslapio (ne daugiau kaip 100 blokų vienoje užklausoje).  |

### Įvesties parametrai

- `notion_search` — `query` (1–500 simbolių), `pageSize` (1–100, numatytoji reikšmė 20),
  `startCursor` (pasirenkamas).
- `notion_get_page` — `pageId` (32 simbolių šešioliktainė reikšmė arba UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, numatytoji reikšmė 50),
  `startCursor` (pasirenkamas).
- `notion_query_database` — `databaseId`, `filter` (pasirenkamas, Notion filtro formatas),
  `sorts` (pasirenkamas masyvas), `pageSize` (1–100, numatytoji reikšmė 50), `startCursor` (pasirenkamas).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (blokų objektų masyvas),
  `after` (pasirenkama pozicija).

### Aprėptys

Skaitymo įrankiams reikalinga `read:notion`, o rašymo įrankiui — `write:notion`.
Aprėptis faile `open-sse/mcp-server/server.ts` užtikrina `withScopeEnforcement()`, tačiau
tik kai `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; iškvietėjo leidžiamos aprėptys gaunamos iš
`OMNIROUTE_MCP_SCOPES` (atskirtos kableliais) arba autentifikuoto API rakto aprėpties
konteksto. Visas aprėpčių modelis aprašytas faile [MCP-SERVER.md](./MCP-SERVER.md).

## Galiniai taškai

| Metodas  | Kelias                 | Paskirtis                                         |
| -------- | ---------------------- | ------------------------------------------------- |
| `GET`    | `/api/settings/notion` | Grąžina `{ connected, hasToken }`.                |
| `POST`   | `/api/settings/notion` | Išsaugo ir patikrina integracijos prieigos raktą. |
| `DELETE` | `/api/settings/notion` | Atjungia (pašalina išsaugotą prieigos raktą).     |

> Tai yra valdymo skydelio nustatymų maršrutai. Viešojo `/v1` Notion tarpinio serverio
> galinio taško **nėra** — Notion pasiekiama tik per pirmiau nurodytus MCP įrankius.

## Naudojimo atvejai

- **Žiniomis pagrįsti atsakymai** — leiskite agentui atlikti `notion_search` darbo srityje ir
  prieš atsakant panaudoti `notion_get_page` geriausiam rezultatui, kad atsakymuose būtų cituojami tikri vidiniai dokumentai.
- **Duomenų bazėmis pagrįstos darbo eigos** — naudokite `notion_query_database` užduočių / CRM duomenų bazei su
  filtrais ir rikiavimu, tada apibendrinkite arba suskirstykite eilutes pagal prioritetą.
- **Įrašymas atgal / registravimas** — naudokite `notion_append_blocks`, kad pridėtumėte susitikimų užrašus, vykdymo
  suvestines arba agento išvestį į esamą puslapį (tik papildymas; be naikinamųjų pakeitimų).
- **Struktūros tyrinėjimas** — naudokite `notion_list_block_children`, kad pereitumėte puslapio blokų medį,
  arba `notion_get_database`, kad prieš pateikdami užklausą sužinotumėte duomenų bazės ypatybių schemą.

## Susiję dokumentai

- [MCP serveris](./MCP-SERVER.md) — perdavimo būdai, aprėpties užtikrinimas, visas įrankių sąrašas.
- [Obsidian konteksto šaltinis](./OBSIDIAN_CONTEXT.md) — kitas integruotas konteksto šaltinis.
- [Atminties sistema](./MEMORY.md) — nuolatinė pokalbių atmintis (papildomas
  konteksto sluoksnis, įterpiamas automatiškai, o ne gaunamas naudojant įrankius).
