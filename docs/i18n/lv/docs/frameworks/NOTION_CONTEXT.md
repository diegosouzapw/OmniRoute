# Notion Context Source (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Patiesības avots:** `src/lib/notion/api.ts` (REST klients), `src/lib/db/notion.ts`
> (pilnvaras marķiera glabāšana), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP rīki),
> `src/app/api/settings/notion/route.ts` (iestatījumu API). Rīku reģistrācija un tvērumu
> piesaiste atrodas failā `open-sse/mcp-server/server.ts`.

## Kas tas ir

OmniRoute var izveidot savienojumu ar **Notion** darbvietu kā **konteksta avotu** — lasāmu un rakstāmu
zināšanu bāzi, kurai aģenti piekļūst, izmantojot iebūvēto MCP serveri. Kad ir konfigurēts Notion
integrācijas pilnvaras marķieris, MCP rīki ļauj LLM meklēt lapās un datubāzēs,
lasīt lapu saturu un bloku kokus, vaicāt datubāzes ar filtriem/kārtošanu un pievienot jaunus
blokus — tas viss tiek starpniekots caur OmniRoute (ar atkārtotiem mēģinājumiem, noildzi un kļūdu klasifikāciju),
lai modelis nekad tieši nepiekļūtu Notion API.

Integrācija ir vienkāršs, pastiprināti aizsargāts oficiālās Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`) ietvars. Klients
(`src/lib/notion/api.ts`) nodrošina:

- **Atkārtotus mēģinājumus ar eksponenciālu aizturi** (līdz 3 mēģinājumiem) `429` un `5xx` atbildēm.
- **55 sekunžu pieprasījuma noildzi**, izmantojot `AbortController`.
- **Tipizētu kļūdu klasifikāciju** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, ievēro `retry after`
  norādes), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Ziņojumu sanitizēšanu**, kas pirms parādīšanas noņem steka izsekojumam līdzīgus fragmentus.

## Iestatīšana

Notion pilnvaras marķierim **nav vides mainīgā** — tas tiek glabāts
SQLite tabulā `key_value` (nosaukumvieta `notion`, atslēga `integration_token`), izmantojot
`src/lib/db/notion.ts`. Konfigurējiet to galapunkta informācijas paneļa cilnē **Konteksta avoti**
(`ObsidianSourceCard` blakus esošajā `NotionSourceCard`) vai izmantojot iestatījumu REST API.

> [!NOTE]
> Pilnvaras marķieris ir **Notion iekšējās integrācijas pilnvaras marķieris**. Izveidojiet integrāciju vietnē
> <https://www.notion.com/my-integrations>, pēc tam kopīgojiet ar šo integrāciju tās lapas/datubāzes, kurām
> OmniRoute ir jāpiekļūst (Notion atļauju modeļa pamatā ir kopīgošana,
> nevis piekļuve visai darbvietai).

### Konfigurēšana, izmantojot REST

```bash
# Saglabā un validē integrācijas pilnvaras marķieri (POST validē, izpildot testa meklēšanu)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Pārbauda savienojuma statusu
curl http://localhost:20128/api/settings/notion

# Atvieno (notīra saglabāto pilnvaras marķieri)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Visām trim metodēm ir nepieciešama informācijas paneļa autentifikācija (`isAuthenticated`). Saņemot `POST`,
OmniRoute saglabā pilnvaras marķieri un nekavējoties izpilda testa meklēšanu ar 1 rezultātu; ja Notion
atgriež kļūdas objektu, pilnvaras marķieris tiek notīrīts un izsaukums neizdodas ar `400`.

## MCP rīki (6)

Definēti failā `open-sse/mcp-server/tools/notionTools.ts`. Pilnvaras marķieris izsaukuma
laikā tiek iegūts, izmantojot `getNotionToken()`; ja tas nav konfigurēts, rīks izmet kļūdu
`"Notion integrācijas pilnvaras marķieris nav konfigurēts. Iestatiet to sadaļā Iestatījumi > Konteksta avoti."`

| Rīks                         | Tvērums        | Apraksts                                                                                        |
| ---------------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Meklē lapas un datubāzes pēc teksta vaicājuma (atgriež nosaukumus, ID un URL). Ar lapošanu.     |
| `notion_get_page`            | `read:notion`  | Iegūst lapas saturu un metadatus pēc tās ID.                                                    |
| `notion_list_block_children` | `read:notion`  | Uzskaita visus bloka vai lapas pakārtotos blokus (bloku koku). Ar lapošanu.                     |
| `notion_query_database`      | `read:notion`  | Vaicā datubāzi ar neobligātiem `filter` + `sorts` (Notion API formātā). Ar lapošanu.            |
| `notion_get_database`        | `read:notion`  | Iegūst datubāzes shēmu/metadatus pēc ID.                                                        |
| `notion_append_blocks`       | `write:notion` | Pievieno pakārtotus blokus esošam blokam vai lapai (ne vairāk kā 100 bloku vienā pieprasījumā). |

### Ievades parametri

- `notion_search` — `query` (1–500 rakstzīmes), `pageSize` (1–100, noklusējums 20),
  `startCursor` (neobligāts).
- `notion_get_page` — `pageId` (32 rakstzīmju heksadecimāla vērtība vai UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, noklusējums 50),
  `startCursor` (neobligāts).
- `notion_query_database` — `databaseId`, `filter` (neobligāts, Notion filtra formāts),
  `sorts` (neobligāts masīvs), `pageSize` (1–100, noklusējums 50), `startCursor` (neobligāts).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (bloku objektu masīvs),
  `after` (neobligāta pozīcija).

### Tvērumi

Lasīšanas rīkiem ir nepieciešams `read:notion`, bet rakstīšanas rīkam — `write:notion`.
Tvērumus izpilda `withScopeEnforcement()` failā
`open-sse/mcp-server/server.ts` tikai tad, ja `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; izsaucējam
atļautie tvērumi tiek iegūti no `OMNIROUTE_MCP_SCOPES` (atdalīti ar komatiem) vai
autentificētās API atslēgas tvērumu konteksta. Pilnu tvērumu modeli skatiet failā
[MCP-SERVER.md](./MCP-SERVER.md).

## Galapunkti

| Metode   | Ceļš                   | Mērķis                                     |
| -------- | ---------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/notion` | Atgriezt `{ connected, hasToken }`.        |
| `POST`   | `/api/settings/notion` | Saglabāt un validēt integrācijas pilnvaru. |
| `DELETE` | `/api/settings/notion` | Atvienot (notīrīt saglabāto pilnvaru).     |

> Šie ir informācijas paneļa iestatījumu maršruti. **Nav publiska `/v1` Notion
> starpniekservera galapunkta** — Notion ir sasniedzams tikai ar iepriekš minētajiem MCP rīkiem.

## Lietošanas gadījumi

- **Zināšanās balstītas atbildes** — ļaujiet aģentam izmantot `notion_search` darbvietā un
  `notion_get_page` labākajam rezultātam pirms atbildēšanas, lai atbildēs būtu atsauces uz īstiem iekšējiem dokumentiem.
- **Datubāzē balstītas darbplūsmas** — izmantojiet `notion_query_database` uzdevumu/CRM datubāzei ar
  filtriem un kārtošanu, pēc tam apkopojiet vai prioritizējiet rindas.
- **Atpakaļierakstīšana / žurnalēšana** — izmantojiet `notion_append_blocks`, lai esošai lapai pievienotu sapulču piezīmes, izpildes
  kopsavilkumus vai aģenta izvadi (tikai pievienošana; bez destruktīvām izmaiņām).
- **Struktūras izpēte** — izmantojiet `notion_list_block_children`, lai pārlūkotu lapas bloku koku,
  vai `notion_get_database`, lai pirms vaicājuma izpildes noskaidrotu datubāzes rekvizītu shēmu.

## Saistītie materiāli

- [MCP serveris](./MCP-SERVER.md) — transporti, tvēruma piemērošana, pilns rīku saraksts.
- [Obsidian konteksta avots](./OBSIDIAN_CONTEXT.md) — otrs iebūvētais konteksta avots.
- [Atmiņas sistēma](./MEMORY.md) — pastāvīga sarunu atmiņa (papildinošs
  konteksta slānis, kas tiek ievietots automātiski, nevis iegūts ar rīku).
