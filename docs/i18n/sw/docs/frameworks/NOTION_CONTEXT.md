# Notion Context Source (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Chanzo rasmi:** `src/lib/notion/api.ts` (kiteja cha REST), `src/lib/db/notion.ts`
> (uhifadhi wa tokeni), `open-sse/mcp-server/tools/notionTools.ts` (zana 6 za MCP),
> `src/app/api/settings/notion/route.ts` (API ya mipangilio). Usajili wa zana na
> uunganishaji wa mawanda unapatikana katika `open-sse/mcp-server/server.ts`.

## Ni nini

OmniRoute inaweza kuunganishwa na nafasi ya kazi ya **Notion** kama **chanzo cha muktadha** — hazina ya maarifa
inayoweza kusomwa/kuandikwa ambayo mawakala huifikia kupitia seva ya MCP iliyojengewa ndani. Baada ya tokeni ya
muunganisho wa Notion kusanidiwa, zana za MCP huruhusu LLM kutafuta kurasa na hifadhidata,
kusoma maudhui ya kurasa na miti ya vizuizi, kuhoji hifadhidata kwa vichujio/mipangilio ya kupanga, na kuambatisha
vizuizi vipya — yote yakipitishwa kupitia OmniRoute (ikiwa na majaribio upya, muda wa kuisha, na uainishaji wa hitilafu)
ili modeli isiwasiliane moja kwa moja na API ya Notion.

Muunganisho huu ni kifuniko chepesi na kilichoimarishwa juu ya API rasmi ya REST ya Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Kiteja
(`src/lib/notion/api.ts`) huongeza:

- **Kujaribu upya kwa ucheleweshaji unaoongezeka kwa kasi** (hadi majaribio 3) kwa `429` na `5xx`.
- **Muda wa ombi kuisha wa sekunde 55** kupitia `AbortController`.
- **Uainishaji wa hitilafu wenye aina bayana** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, huzingatia vidokezo vya `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Usafishaji wa ujumbe** unaoondoa vipande vinavyofanana na ufuatiliaji wa rundo kabla ya kuonyeshwa.

## Usanidi

Hakuna **kigezo cha mazingira** kwa tokeni ya Notion — huhifadhiwa katika
jedwali la SQLite la `key_value` (nafasi ya majina `notion`, ufunguo `integration_token`) kupitia
`src/lib/db/notion.ts`. Isanidi kutoka kwenye kichupo cha **Vyanzo vya Muktadha** cha dashibodi ya Endpoint
(`NotionSourceCard`, ambayo ni kipengele jirani cha `ObsidianSourceCard`), au kupitia API ya REST ya mipangilio.

> [!NOTE]
> Tokeni hiyo ni **tokeni ya muunganisho wa ndani wa Notion**. Unda muunganisho katika
> <https://www.notion.com/my-integrations>, kisha shiriki na muunganisho huo kurasa/hifadhidata unazotaka
> OmniRoute ifikie (mfumo wa ruhusa wa Notion hutegemea kushiriki,
> si nafasi nzima ya kazi).

### Sanidi kupitia REST

```bash
# Hifadhi + thibitisha tokeni ya muunganisho (POST huthibitisha kwa kufanya utafutaji wa majaribio)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Angalia hali ya muunganisho
curl http://localhost:20128/api/settings/notion

# Kata muunganisho (hufuta tokeni iliyohifadhiwa)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Mbinu zote tatu zinahitaji uthibitishaji wa dashibodi (`isAuthenticated`). Kwa `POST`,
OmniRoute huhifadhi tokeni na mara moja huendesha utafutaji wa majaribio wenye tokeo 1; ikiwa Notion
itarejesha kipengee cha hitilafu, tokeni hufutwa na ombi hushindwa kwa `400`.

## Zana za MCP (6)

Zimefafanuliwa katika `open-sse/mcp-server/tools/notionTools.ts`. Tokeni hupatikana wakati wa
ombi kupitia `getNotionToken()`; ikiwa hakuna iliyosanidiwa, zana hutupa
`"Tokeni ya muunganisho wa Notion haijasanidiwa. Isanidi katika Mipangilio > Vyanzo vya Muktadha."`

| Zana                         | Wigo           | Maelezo                                                                                                              |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Tafuta kurasa na hifadhidata kwa hoja ya maandishi (hurejesha vichwa, vitambulisho, URL). Imegawanywa katika kurasa. |
| `notion_get_page`            | `read:notion`  | Pata maudhui na metadata ya ukurasa kwa kutumia kitambulisho chake.                                                  |
| `notion_list_block_children` | `read:notion`  | Orodhesha vizuizi vyote vya chini vya kizuizi au ukurasa (mti wa vizuizi). Imegawanywa katika kurasa.                |
| `notion_query_database`      | `read:notion`  | Hoji hifadhidata kwa `filter` + `sorts` za hiari (muundo wa API ya Notion). Imegawanywa katika kurasa.               |
| `notion_get_database`        | `read:notion`  | Pata skima/metadata ya hifadhidata kwa kutumia kitambulisho.                                                         |
| `notion_append_blocks`       | `write:notion` | Ambatisha vizuizi vya chini kwenye kizuizi au ukurasa uliopo (kiwango cha juu ni vizuizi 100 kwa kila ombi).         |

### Vigezo vya ingizo

- `notion_search` — `query` (herufi 1–500), `pageSize` (1–100, chaguo-msingi 20),
  `startCursor` (hiari).
- `notion_get_page` — `pageId` (heksadesimali ya herufi 32 au UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, chaguo-msingi 50),
  `startCursor` (hiari).
- `notion_query_database` — `databaseId`, `filter` (hiari, muundo wa kichujio cha Notion),
  `sorts` (safu ya hiari), `pageSize` (1–100, chaguo-msingi 50), `startCursor` (hiari).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (safu ya vipengee vya vizuizi),
  `after` (nafasi ya hiari).

### Mawanda

Zana za kusoma zinahitaji `read:notion` na zana ya kuandika inahitaji `write:notion`.
Mawanda hutekelezwa na `withScopeEnforcement()` katika
`open-sse/mcp-server/server.ts` tu wakati `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; mawanda
yanayoruhusiwa ya mpigaji hutoka kwenye `OMNIROUTE_MCP_SCOPES` (yakitenganishwa kwa koma) au
muktadha wa mawanda wa ufunguo wa API uliothibitishwa. Tazama [MCP-SERVER.md](./MCP-SERVER.md) kwa
mfumo kamili wa mawanda.

## Vituo vya mwisho

| Mbinu    | Njia                   | Kusudi                                      |
| -------- | ---------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/notion` | Rudisha `{ connected, hasToken }`.          |
| `POST`   | `/api/settings/notion` | Hifadhi + thibitisha tokeni ya ujumuishaji. |
| `DELETE` | `/api/settings/notion` | Tenganisha (futa tokeni iliyohifadhiwa).    |

> Hizi ni njia za mipangilio ya dashibodi. **Hakuna endpoint ya umma ya proksi ya Notion ya `/v1`
> ** — Notion hufikiwa kupitia zana za MCP zilizo hapo juu pekee.

## Matukio ya matumizi

- **Majibu yanayotegemea maarifa** — ruhusu ajenti kutumia `notion_search` katika eneo la kazi na
  `notion_get_page` kwenye tokeo la kwanza kabla ya kujibu, ili majibu yanukuu hati halisi za ndani.
- **Mitiririko ya kazi inayotegemea hifadhidata** — tumia `notion_query_database` kwenye hifadhidata ya majukumu/CRM ukiwa na
  vichujio + mipangilio ya kupanga, kisha fupisha au panga safu kulingana na kipaumbele.
- **Kuandika tena / kuweka kumbukumbu** — tumia `notion_append_blocks` kuambatisha madokezo ya mikutano, mihtasari ya utekelezaji,
  au matokeo ya ajenti kwenye ukurasa uliopo (kuambatisha pekee; hakuna uhariri unaofuta yaliyopo).
- **Kuchunguza muundo** — tumia `notion_list_block_children` kupitia mti wa vizuizi wa ukurasa,
  au `notion_get_database` kugundua schema ya sifa za hifadhidata kabla ya kuihoji.

## Yanayohusiana

- [Seva ya MCP](./MCP-SERVER.md) — njia za usafirishaji, utekelezaji wa mawanda, orodha kamili ya zana.
- [Chanzo cha Muktadha cha Obsidian](./OBSIDIAN_CONTEXT.md) — chanzo kingine cha muktadha kilichojengewa ndani.
- [Mfumo wa Kumbukumbu](./MEMORY.md) — kumbukumbu endelevu ya mazungumzo (safu ya muktadha inayokamilisha,
  inayoingizwa kiotomatiki badala ya kuletwa kwa kutumia zana).
