# Notion Context Source (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Vir resnice:** `src/lib/notion/api.ts` (odjemalec REST), `src/lib/db/notion.ts`
> (shranjevanje žetona), `open-sse/mcp-server/tools/notionTools.ts` (6 orodij MCP),
> `src/app/api/settings/notion/route.ts` (API za nastavitve). Registracija orodij in
> povezovanje obsegov sta določena v `open-sse/mcp-server/server.ts`.

## Kaj je to

OmniRoute se lahko poveže z delovnim prostorom **Notion** kot **virom konteksta** — zbirko
znanja za branje in pisanje, do katere agenti dostopajo prek vgrajenega strežnika MCP.
Ko je integracijski žeton za Notion konfiguriran, lahko LLM z orodji MCP išče po straneh
in podatkovnih zbirkah, bere vsebino strani in drevesa blokov, poizveduje po podatkovnih
zbirkah s filtri/razvrščanjem ter dodaja nove bloke — vse prek posredniškega strežnika
OmniRoute (s ponovnimi poskusi, časovno omejitvijo in razvrščanjem napak), tako da model
nikoli ne dostopa neposredno do API-ja Notion.

Integracija je tanek, utrjen ovoj okoli uradnega API-ja REST za Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Odjemalec
(`src/lib/notion/api.ts`) dodaja:

- **Ponovne poskuse z eksponentnim podaljševanjem čakanja** (do 3 poskusi) za `429` in `5xx`.
- **55-sekundno časovno omejitev zahteve** prek `AbortController`.
- **Tipizirano razvrščanje napak** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, upošteva namige `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Čiščenje sporočil**, ki pred prikazom odstrani dele, podobne sledem sklada.

## Nastavitev

Za žeton Notion **ni okoljske spremenljivke** — prek
`src/lib/db/notion.ts` je shranjen v tabeli SQLite `key_value` (imenski prostor `notion`,
ključ `integration_token`). Konfigurirate ga lahko na zavihku **Viri konteksta** na
nadzorni plošči končne točke (sorodna komponenta `NotionSourceCard` komponente
`ObsidianSourceCard`) ali prek API-ja REST za nastavitve.

> [!NOTE]
> Žeton je **žeton interne integracije Notion**. Ustvarite integracijo na
> <https://www.notion.com/my-integrations>, nato pa s to integracijo delite strani/podatkovne
> zbirke, do katerih želite OmniRoute omogočiti dostop (Notionov model dovoljenj temelji
> na deljenju in ne velja za celoten delovni prostor).

### Konfiguracija prek REST

```bash
# Shranite in preverite integracijski žeton (POST ga preveri z izvedbo preizkusnega iskanja)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Preverite stanje povezave
curl http://localhost:20128/api/settings/notion

# Prekinite povezavo (izbriše shranjeni žeton)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Vsi trije načini zahtevajo preverjanje pristnosti na nadzorni plošči (`isAuthenticated`).
Pri `POST` OmniRoute shrani žeton in takoj izvede preizkusno iskanje z enim rezultatom;
če Notion vrne objekt napake, se žeton izbriše, klic pa ne uspe s kodo `400`.

## Orodja MCP (6)

Določena so v `open-sse/mcp-server/tools/notionTools.ts`. Žeton se ob klicu pridobi
prek `getNotionToken()`; če ni konfiguriran, orodje sproži izjemo
`"Integracijski žeton Notion ni konfiguriran. Nastavite ga v Nastavitve > Viri konteksta."`

| Orodje                       | Obseg          | Opis                                                                                                    |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Iskanje strani in podatkovnih zbirk po besedilni poizvedbi (vrne naslove, ID-je in URL-je). Ostranjeno. |
| `notion_get_page`            | `read:notion`  | Pridobivanje vsebine in metapodatkov strani na podlagi njenega ID-ja.                                   |
| `notion_list_block_children` | `read:notion`  | Seznam vseh podrejenih blokov bloka ali strani (drevo blokov). Ostranjeno.                              |
| `notion_query_database`      | `read:notion`  | Poizvedovanje po podatkovni zbirki z izbirnima `filter` + `sorts` (oblika API-ja Notion). Ostranjeno.   |
| `notion_get_database`        | `read:notion`  | Pridobivanje sheme/metapodatkov podatkovne zbirke na podlagi ID-ja.                                     |
| `notion_append_blocks`       | `write:notion` | Dodajanje podrejenih blokov obstoječemu bloku ali strani (največ 100 blokov na zahtevo).                |

### Vhodni parametri

- `notion_search` — `query` (1–500 znakov), `pageSize` (1–100, privzeto 20),
  `startCursor` (izbirno).
- `notion_get_page` — `pageId` (32-mestno šestnajstiško število ali UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, privzeto 50),
  `startCursor` (izbirno).
- `notion_query_database` — `databaseId`, `filter` (izbirno, oblika filtra Notion),
  `sorts` (izbirna matrika), `pageSize` (1–100, privzeto 50), `startCursor` (izbirno).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (matrika objektov blokov),
  `after` (izbirni položaj).

### Obsegi

Orodja za branje zahtevajo `read:notion`, orodje za pisanje pa zahteva `write:notion`.
Obsege uveljavlja `withScopeEnforcement()` v
`open-sse/mcp-server/server.ts` samo, ko je `OMNIROUTE_MCP_ENFORCE_SCOPES=true`;
dovoljeni obsegi klicatelja izvirajo iz `OMNIROUTE_MCP_SCOPES` (ločeni z vejicami) ali
konteksta obsega overjenega ključa API. Celoten model obsegov je opisan v
[MCP-SERVER.md](./MCP-SERVER.md).

## Končne točke

| Metoda   | Pot                    | Namen                                       |
| -------- | ---------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/notion` | Vrne `{ connected, hasToken }`.             |
| `POST`   | `/api/settings/notion` | Shrani in preveri integracijski žeton.      |
| `DELETE` | `/api/settings/notion` | Prekine povezavo (izbriše shranjeni žeton). |

> To so poti nastavitev nadzorne plošče. **Javna posredniška končna točka `/v1` za Notion
> ne obstaja** — dostop do storitve Notion poteka izključno prek zgornjih orodij MCP.

## Primeri uporabe

- **Odgovori, podprti z znanjem** — agent naj z `notion_search` preišče delovni prostor in
  z `notion_get_page` pridobi najboljši zadetek, preden odgovori, tako da se odgovori sklicujejo na dejansko interno dokumentacijo.
- **Delovni tokovi, podprti s podatkovno zbirko** — z `notion_query_database` poizvedujte po podatkovni zbirki opravil/CRM
  s filtri in razvrščanjem, nato pa povzemite ali razvrstite vrstice.
- **Povratno zapisovanje/dnevniško beleženje** — z `notion_append_blocks` dodajte zapiske sestankov, povzetke
  izvajanj ali izhod agenta na obstoječo stran (samo dodajanje; brez destruktivnih sprememb).
- **Raziskovanje strukture** — z `notion_list_block_children` preglejte drevo blokov strani
  ali pa z `notion_get_database` odkrijte shemo lastnosti podatkovne zbirke, preden po njej izvedete poizvedbo.

## Sorodno

- [Strežnik MCP](./MCP-SERVER.md) — transporti, uveljavljanje obsega in celoten seznam orodij.
- [Vir konteksta Obsidian](./OBSIDIAN_CONTEXT.md) — drugi vgrajeni vir konteksta.
- [Pomnilniški sistem](./MEMORY.md) — trajni pogovorni pomnilnik (dopolnilna
  kontekstna plast, ki se samodejno vstavi, namesto da bi jo pridobilo orodje).
