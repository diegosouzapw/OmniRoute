# Notion Context Source (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Izvor istine:** `src/lib/notion/api.ts` (REST klijent), `src/lib/db/notion.ts`
> (pohrana tokena), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP alata),
> `src/app/api/settings/notion/route.ts` (API za postavke). Registracija alata i povezivanje
> opsega nalaze se u `open-sse/mcp-server/server.ts`.

## Što je to

OmniRoute se može povezati s radnim prostorom **Notion** kao **izvorom konteksta** — bazom
znanja za čitanje i pisanje kojoj agenti pristupaju putem ugrađenog MCP poslužitelja. Nakon
konfiguriranja tokena integracije Notion, MCP alati omogućuju LLM-u pretraživanje stranica i
baza podataka, čitanje sadržaja stranica i stabala blokova, slanje upita bazama podataka uz
filtre/sortiranje te dodavanje novih blokova — sve posredstvom OmniRoutea (uz ponovne pokušaje,
vremensko ograničenje i klasifikaciju pogrešaka), tako da model nikada izravno ne pristupa
Notion API-ju.

Integracija je tanak, ojačan omotač oko službenog Notion REST API-ja
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klijent
(`src/lib/notion/api.ts`) dodaje:

- **Ponovne pokušaje s eksponencijalnim odmakom** (do 3 pokušaja) za `429` i `5xx`.
- **Vremensko ograničenje zahtjeva od 55 sekundi** putem `AbortController`.
- **Tipiziranu klasifikaciju pogrešaka** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, poštuje smjernice `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitizaciju poruka** koja uklanja fragmente nalik tragovima stoga prije prikazivanja.

## Postavljanje

Za token Notion **ne postoji varijabla okruženja** — pohranjuje se u SQLite tablici
`key_value` (imenski prostor `notion`, ključ `integration_token`) putem
`src/lib/db/notion.ts`. Konfigurirajte ga na kartici **Izvori konteksta** nadzorne ploče
krajnje točke (`NotionSourceCard`, susjedna komponenta komponente `ObsidianSourceCard`) ili
putem REST API-ja za postavke.

> [!NOTE]
> Token je **token interne integracije Notion**. Izradite integraciju na
> <https://www.notion.com/my-integrations>, a zatim s tom integracijom podijelite stranice/baze
> podataka kojima želite omogućiti pristup OmniRouteu (Notionov model dopuštenja temelji se na
> dijeljenju, a ne na pristupu cijelom radnom prostoru).

### Konfiguriranje putem REST-a

```bash
# Spremite i provjerite token integracije (POST provjerava izvođenjem probnog pretraživanja)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Provjerite status veze
curl http://localhost:20128/api/settings/notion

# Prekinite vezu (briše pohranjeni token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Sve tri metode zahtijevaju autentifikaciju nadzorne ploče (`isAuthenticated`). Pri zahtjevu
`POST` OmniRoute sprema token i odmah pokreće probno pretraživanje s jednim rezultatom; ako
Notion vrati objekt pogreške, token se briše, a poziv ne uspijeva uz status `400`.

## MCP alati (6)

Definirani su u `open-sse/mcp-server/tools/notionTools.ts`. Token se dohvaća u trenutku
poziva putem `getNotionToken()`; ako nije konfiguriran, alat izbacuje pogrešku
`"Token integracije Notion nije konfiguriran. Postavite ga u Postavke > Izvori konteksta."`

| Alat                         | Opseg          | Opis                                                                                                                 |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pretražuje stranice i baze podataka prema tekstualnom upitu (vraća naslove, ID-ove i URL-ove). Podržava straničenje. |
| `notion_get_page`            | `read:notion`  | Dohvaća sadržaj i metapodatke stranice prema njezinu ID-u.                                                           |
| `notion_list_block_children` | `read:notion`  | Navodi sve podređene blokove bloka ili stranice (stablo blokova). Podržava straničenje.                              |
| `notion_query_database`      | `read:notion`  | Šalje upit bazi podataka uz neobavezne `filter` + `sorts` (format Notion API-ja). Podržava straničenje.              |
| `notion_get_database`        | `read:notion`  | Dohvaća shemu/metapodatke baze podataka prema ID-u.                                                                  |
| `notion_append_blocks`       | `write:notion` | Dodaje podređene blokove postojećem bloku ili stranici (najviše 100 blokova po zahtjevu).                            |

### Ulazni parametri

- `notion_search` — `query` (1–500 znakova), `pageSize` (1–100, zadano 20),
  `startCursor` (neobavezno).
- `notion_get_page` — `pageId` (32-znamenkasti heksadecimalni niz ili UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, zadano 50),
  `startCursor` (neobavezno).
- `notion_query_database` — `databaseId`, `filter` (neobavezno, format filtra Notion),
  `sorts` (neobavezni niz), `pageSize` (1–100, zadano 50), `startCursor` (neobavezno).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (niz objekata blokova),
  `after` (neobavezni položaj).

### Opsezi

Alati za čitanje zahtijevaju `read:notion`, a alat za pisanje zahtijeva `write:notion`.
Opsege provodi `withScopeEnforcement()` u
`open-sse/mcp-server/server.ts` samo kada je `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; dopušteni
opsezi pozivatelja dolaze iz `OMNIROUTE_MCP_SCOPES` (odvojeni zarezima) ili konteksta opsega
autentificiranog API ključa. Cjelovit model opsega potražite u
[MCP-SERVER.md](./MCP-SERVER.md).

## Krajnje točke

| Metoda   | Putanja                | Svrha                                    |
| -------- | ---------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/notion` | Vraća `{ connected, hasToken }`.         |
| `POST`   | `/api/settings/notion` | Sprema i provjerava integracijski token. |
| `DELETE` | `/api/settings/notion` | Prekida vezu (briše pohranjeni token).   |

> Ovo su rute za postavke nadzorne ploče. **Ne postoji javna `/v1` proxy krajnja
> točka za Notion** — Notionu se pristupa isključivo putem gore navedenih MCP alata.

## Slučajevi upotrebe

- **Odgovori utemeljeni na znanju** — omogućite agentu da pomoću `notion_search` pretraži radni prostor i
  pomoću `notion_get_page` dohvati najrelevantniji rezultat prije odgovaranja kako bi odgovori citirali stvarnu internu dokumentaciju.
- **Tijekovi rada utemeljeni na bazi podataka** — pomoću `notion_query_database` pretražite bazu zadataka/CRM-a uz
  filtre i sortiranja, a zatim sažmite ili trijažirajte retke.
- **Povratni zapis / bilježenje** — upotrijebite `notion_append_blocks` za dodavanje bilješki sa sastanaka, sažetaka
  izvođenja ili izlaza agenta na postojeću stranicu (samo dodavanje; bez destruktivnih izmjena).
- **Istraživanje strukture** — upotrijebite `notion_list_block_children` za obilazak stabla blokova stranice
  ili `notion_get_database` za otkrivanje sheme svojstava baze podataka prije njezina pretraživanja.

## Povezano

- [MCP poslužitelj](./MCP-SERVER.md) — prijenosi, provedba opsega, potpuni popis alata.
- [Obsidian kao izvor konteksta](./OBSIDIAN_CONTEXT.md) — drugi ugrađeni izvor konteksta.
- [Sustav memorije](./MEMORY.md) — trajna konverzacijska memorija (komplementarni
  sloj konteksta koji se umeće automatski umjesto dohvaćanja alatom).
