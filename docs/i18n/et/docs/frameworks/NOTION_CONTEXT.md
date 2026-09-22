# Notion Context Source (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Tõeallikad:** `src/lib/notion/api.ts` (REST-klient), `src/lib/db/notion.ts`
> (tokeni püsiv salvestamine), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-tööriista),
> `src/app/api/settings/notion/route.ts` (seadete API). Tööriistade registreerimine ja õiguste
> sidumine asuvad failis `open-sse/mcp-server/server.ts`.

## Mis see on

OmniRoute saab ühendada **Notioni** tööruumiga, kasutades seda **kontekstiallikana** — lugemis- ja kirjutamisõigusega
teadmusbaasina, millele agendid pääsevad juurde sisseehitatud MCP-serveri kaudu. Kui Notioni
integratsioonitoken on seadistatud, võimaldavad MCP-tööriistad LLM-il otsida lehti ja andmebaase,
lugeda lehtede sisu ja plokipuid, teha andmebaasipäringuid filtrite ja sortimisega ning lisada uusi
plokke — kõike seda vahendab OmniRoute (koos korduskatsete, ajalõpu ja vigade liigitamisega),
nii et mudel ei pöördu kunagi otse Notioni API poole.

Integratsioon on ametliku Notioni REST API õhuke, töökindlamaks muudetud ümbris
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klient
(`src/lib/notion/api.ts`) lisab:

- **Korduskatsed eksponentsiaalse viivitusega** (kuni 3 katset) vastuste `429` ja `5xx` korral.
- **55-sekundilise päringu ajalõpu** `AbortController`-i kaudu.
- **Tüübitud vigade liigitamise** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, arvestab `retry after`
  vihjeid), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sõnumite puhastamise**, mis eemaldab enne kuvamist pinujälge meenutavad fragmendid.

## Seadistamine

Notioni tokeni jaoks **pole keskkonnamuutujat** — see salvestatakse SQLite'i
tabelisse `key_value` (nimeruum `notion`, võti `integration_token`) faili
`src/lib/db/notion.ts` kaudu. Seadistage see lõpp-punkti töölaua vahekaardil **Context Sources**
(`ObsidianSourceCard`-i kõrval olev `NotionSourceCard`) või seadete REST API kaudu.

> [!NOTE]
> Token on **Notioni sisemise integratsiooni token**. Looge integratsioon aadressil
> <https://www.notion.com/my-integrations> ja seejärel jagage integratsiooniga lehti/andmebaase, millele
> soovite OmniRoute'ile juurdepääsu anda (Notioni õiguste mudel põhineb jagamisel,
> mitte kogu tööruumi hõlmaval juurdepääsul).

### Seadistamine REST-i kaudu

```bash
# Salvesta ja valideeri integratsioonitoken (POST valideerib ühe tulemusega testotsingu abil)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kontrolli ühenduse olekut
curl http://localhost:20128/api/settings/notion

# Katkesta ühendus (kustutab salvestatud tokeni)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Kõik kolm meetodit nõuavad töölaua autentimist (`isAuthenticated`). `POST`-päringu korral
salvestab OmniRoute tokeni ja käivitab kohe ühe tulemusega testotsingu; kui Notion
tagastab veaobjekti, kustutatakse token ja kutse nurjub olekukoodiga `400`.

## MCP-tööriistad (6)

Määratletud failis `open-sse/mcp-server/tools/notionTools.ts`. Token lahendatakse kutse
ajal funktsiooni `getNotionToken()` kaudu; kui seda pole seadistatud, tagastab tööriist vea
`"Notioni integratsioonitoken pole seadistatud. Seadistage see jaotises Settings > Context Sources."`

| Tööriist                     | Õigus          | Kirjeldus                                                                                                      |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Otsib tekstipäringu alusel lehti ja andmebaase (tagastab pealkirjad, ID-d ja URL-id). Lehekülgede kaupa.       |
| `notion_get_page`            | `read:notion`  | Hangib lehe ID alusel selle sisu ja metaandmed.                                                                |
| `notion_list_block_children` | `read:notion`  | Loetleb kõik ploki või lehe alamplokid (plokipuu). Lehekülgede kaupa.                                          |
| `notion_query_database`      | `read:notion`  | Teeb andmebaasipäringu valikuliste `filter` + `sorts` parameetritega (Notioni API vorming). Lehekülgede kaupa. |
| `notion_get_database`        | `read:notion`  | Hangib ID alusel andmebaasi skeemi/metaandmed.                                                                 |
| `notion_append_blocks`       | `write:notion` | Lisab olemasolevale plokile või lehele alamplokke (kuni 100 plokki päringu kohta).                             |

### Sisendparameetrid

- `notion_search` — `query` (1–500 märki), `pageSize` (1–100, vaikimisi 20),
  `startCursor` (valikuline).
- `notion_get_page` — `pageId` (32-märgiline kuueteistkümnendarv või UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, vaikimisi 50),
  `startCursor` (valikuline).
- `notion_query_database` — `databaseId`, `filter` (valikuline, Notioni filtrivorming),
  `sorts` (valikuline massiiv), `pageSize` (1–100, vaikimisi 50), `startCursor` (valikuline).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (plokiobjektide massiiv),
  `after` (valikuline asukoht).

### Õigused

Lugemistööriistad nõuavad õigust `read:notion` ja kirjutamistööriist õigust `write:notion`.
Õigusi jõustab funktsioon `withScopeEnforcement()` failis
`open-sse/mcp-server/server.ts` ainult siis, kui `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; kutsuja
lubatud õigused pärinevad komadega eraldatud muutujast `OMNIROUTE_MCP_SCOPES` või
autenditud API-võtme õiguste kontekstist. Täielikku õiguste mudelit kirjeldab
[MCP-SERVER.md](./MCP-SERVER.md).

## Lõpp-punktid

| Meetod   | Tee                    | Eesmärk                                           |
| -------- | ---------------------- | ------------------------------------------------- |
| `GET`    | `/api/settings/notion` | Tagastab `{ connected, hasToken }`.               |
| `POST`   | `/api/settings/notion` | Salvestab ja valideerib integratsioonitõendi.     |
| `DELETE` | `/api/settings/notion` | Katkestab ühenduse (kustutab salvestatud tõendi). |

> Need on töölaua seadete marsruudid. Avalikku `/v1` Notioni puhverserveri
> lõpp-punkti **ei ole** — Notioniga suheldakse ainult ülaltoodud MCP-tööriistade kaudu.

## Kasutusjuhud

- **Teadmusel põhinevad vastused** — laske agendil teha tööruumis `notion_search` ja
  enne vastamist parima vaste jaoks `notion_get_page`, et vastustes viidataks tegelikele sisedokumentidele.
- **Andmebaasipõhised töövood** — tehke ülesannete/CRM-i andmebaasis filtrite ja
  sortimisega `notion_query_database`, seejärel tehke ridadest kokkuvõte või määrake nende prioriteedid.
- **Tagasikirjutamine/logimine** — kasutage `notion_append_blocks`, et lisada olemasolevale
  lehele koosolekumärkmeid, käivituste kokkuvõtteid või agendi väljundit (ainult lisamine; hävitavaid muudatusi ei tehta).
- **Struktuuri uurimine** — kasutage lehe plokipuu läbimiseks `notion_list_block_children`
  või andmebaasi atribuudiskeemi tuvastamiseks enne päringu tegemist `notion_get_database`.

## Seotud teemad

- [MCP-server](./MCP-SERVER.md) — transpordid, ulatuse jõustamine ja tööriistade täielik loend.
- [Obsidiani kontekstiallikas](./OBSIDIAN_CONTEXT.md) — teine sisseehitatud kontekstiallikas.
- [Mälusüsteem](./MEMORY.md) — püsiv vestlusmälu (täiendav kontekstikiht,
  mis lisatakse automaatselt, mitte ei hangita tööriistaga).
