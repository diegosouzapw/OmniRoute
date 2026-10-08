# Notion Context Source (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

# Notion Context Source

> **Izvor istine:** `src/lib/notion/api.ts` (REST klijent), `src/lib/db/notion.ts`
> (trajno čuvanje tokena), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP alata),
> `src/app/api/settings/notion/route.ts` (settings API). Registracija alata i
> povezivanje opsega (scope) se nalazi u `open-sse/mcp-server/server.ts`.

## Šta je to

OmniRoute se može povezati sa **Notion** radnim prostorom kao **izvor konteksta** — baza znanja za čitanje/pisanje kojoj agenti pristupaju putem ugrađenog MCP servera. Kada je Notion integracijski token konfigurisan, MCP alati omogućavaju LLM-u da pretražuje stranice i baze podataka, čita sadržaj stranica i stabla blokova, pretražuje baze podataka sa filterima/sortiranjem i dodaje nove blokove — sve to posredovano kroz OmniRoute (uz ponovni pokušaj, vremensko ograničenje i klasifikaciju grešaka) tako da model nikada ne pristupa Notion API-ju direktno.

Integracija je tanak, ojačan omotač (wrapper) preko zvaničnog Notion REST API-ja
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klijent
(`src/lib/notion/api.ts`) dodaje:

- **Ponovni pokušaj sa eksponencijalnim odlaganjem** (do 3 pokušaja) za `429` i `5xx`.
- **Vremensko ograničenje zahtjeva od 55 sekundi** putem `AbortController`.
- **Klasifikacija tipiziranih grešaka** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, poštuje `retry after`
  savjete), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitizacija poruka** koja uklanja fragmente slične stack-trace-u prije prikazivanja.

## Podešavanje

Ne postoji **environment variable** za Notion token — on se čuva u SQLite `key_value`
tabeli (namespace `notion`, ključ `integration_token`) putem `src/lib/db/notion.ts`.
Konfigurišite ga sa kartice **Context Sources** na kontrolnoj tabli Endpoint-a
(sestrinska kartica `ObsidianSourceCard`-a, `NotionSourceCard`), ili putem settings
REST API-ja.

> [!NOTE]
> Token je **Notion internal integration token**. Kreirajte integraciju na
> <https://www.notion.com/my-integrations>, zatim podijelite stranice/baze podataka
> kojima želite da OmniRoute pristupi sa tom integracijom (Notion-ov model dozvola je
> zasnovan na dijeljenju, a ne na nivou cijelog radnog prostora).

### Konfiguracija putem REST-a

```bash
# Sačuvaj + validiraj integracijski token (POST validira izdavanjem testne pretrage)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Provjeri status veze
curl http://localhost:20128/api/settings/notion

# Prekini vezu (briše sačuvani token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Sve tri metode zahtijevaju autentifikaciju kontrolne table (`isAuthenticated`).
Prilikom `POST` zahtjeva, OmniRoute čuva token i odmah pokreće testnu pretragu sa 1
rezultatom; ako Notion vrati objekat greške, token se briše i poziv ne uspijeva sa
`400`.

## MCP alati (6)

Definisani u `open-sse/mcp-server/tools/notionTools.ts`. Token se razrješava u
vrijeme poziva putem `getNotionToken()`; ako nijedan nije konfigurisan, alat
izbacuje grešku `"Notion integracijski token nije konfigurisan. Podesite ga u Settings > Context Sources."`

| Alat                         | Opseg (Scope)  | Opis                                                                                                         |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Pretraživanje stranica i baza podataka putem tekstualnog upita (vraća naslove, ID-ove, URL-ove). Paginirano. |
| `notion_get_page`            | `read:notion`  | Dobavljanje sadržaja i metapodataka stranice putem njenog ID-a.                                              |
| `notion_list_block_children` | `read:notion`  | Listanje svih blokova djece nekog bloka ili stranice (stablo blokova). Paginirano.                           |
| `notion_query_database`      | `read:notion`  | Upit nad bazom podataka sa opcionim `filter` + `sorts` (Notion API format). Paginirano.                      |
| `notion_get_database`        | `read:notion`  | Dobavljanje šeme/metapodataka baze podataka putem ID-a.                                                      |
| `notion_append_blocks`       | `write:notion` | Dodavanje blokova djece postojećem bloku ili stranici (maksimalno 100 blokova po zahtjevu).                  |

### Ulazni parametri

- `notion_search` — `query` (1–500 znakova), `pageSize` (1–100, podrazumijevano 20),
  `startCursor` (opciono).
- `notion_get_page` — `pageId` (32-karakterni heksadecimalni ili UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, podrazumijevano 50),
  `startCursor` (opciono).
- `notion_query_database` — `databaseId`, `filter` (opciono, Notion format filtera),
  `sorts` (opcioni niz), `pageSize` (1–100, podrazumijevano 50), `startCursor` (opciono).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (niz objekata blokova),
  `after` (opciona pozicija).

### Opsezi (Scopes)

Alati za čitanje zahtijevaju `read:notion`, a alat za pisanje zahtijeva `write:notion`.
Opsezi se primjenjuju putem `withScopeEnforcement()` u
`open-sse/mcp-server/server.ts` samo kada je `OMNIROUTE_MCP_ENFORCE_SCOPES=true`;
dozvoljeni opsezi pozivaoca dolaze iz `OMNIROUTE_MCP_SCOPES` (odvojeni zarezima) ili
iz konteksta opsega autentifikovanog API ključa. Pogledajte
[MCP-SERVER.md](./MCP-SERVER.md) za kompletan model opsega.

## Krajnje tačke

| Metoda   | Putanja                | Svrha                                   |
| -------- | ---------------------- | --------------------------------------- |
| `GET`    | `/api/settings/notion` | Vraća `{ connected, hasToken }`.        |
| `POST`   | `/api/settings/notion` | Spremi + validiraj integracijski token. |
| `DELETE` | `/api/settings/notion` | Prekini vezu (obriši pohranjeni token). |

> Ovo su rute za postavke kontrolne ploče. Ne postoji **javna `/v1` Notion proxy krajnja tačka** — Notion se doseže isključivo putem MCP alata iznad.

## Slučajevi upotrebe

- **Odgovori utemeljeni na znanju** — omogućite agentu da `notion_search` radni prostor i `notion_get_page` najbolji rezultat prije odgovaranja, tako da odgovori citiraju stvarne interne dokumente.
- **Radni procesi podržani bazom podataka** — `notion_query_database` nad bazom podataka zadataka/CRM-a sa filterima + sortiranjem, a zatim sumirajte ili trijažirajte redove.
- **Povratno pisanje / evidentiranje** — `notion_append_blocks` za dodavanje bilješki sa sastanaka, pokretanje sažetaka ili izlaza agenta na postojeću stranicu (samo dodavanje; bez destruktivnih izmjena).
- **Istraživanje strukture** — `notion_list_block_children` za prolazak kroz stablo blokova stranice, ili `notion_get_database` za otkrivanje sheme svojstava baze podataka prije upita.

## Povezano

- [MCP Server](./MCP-SERVER.md) — transporti, provođenje opsega, potpuni inventar alata.
- [Obsidian Context Source](./OBSIDIAN_CONTEXT.md) — drugi ugrađeni izvor konteksta.
- [Memory System](./MEMORY.md) — trajna konverzacijska memorija (komplementarni sloj konteksta, ubrizgava se automatski umjesto da se dohvaća alatom).
