# Reasoning Replay Cache (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Foinse na fírinne:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Gabhann OmniRoute `reasoning_content` an chúntóra a tháirgeann samhlacha mód smaointeoireachta agus athsheinneann sé go trédhearcach é ar iarratais ilseala nuair a éilíonn an soláthraí réamhtheachtach é. Cuireann sé seo deireadh leis na hearráidí HTTP 400 a ghineann soláthraithe dochta nuair atá réasúnaíocht na seal roimhe sin ar iarraidh ó stair chomhrá an chliaint.

## Cén Fáth a bhfuil Seo Ann

Diúltaíonn roinnt soláthraithe mód smaointeoireachta do sheal leantach mura bhfuil an **`reasoning_content` bunaidh san áireamh i dteachtaireacht an chúntóra roimhe sin**. Filleann an córas réamhtheachtach 400 le teachtaireachtaí amhail:

```
Paraiméadar Mícheart: Ní mór an reasoning_content sa mhód smaointeoireachta a chur ar ais chuig an API.
```

Ach baineann gnáthchliaint (Cursor, Cline, Roo Code, OpenAI SDK) `reasoning_content` den stair a athsheinneann siad. Aischuireann OmniRoute é ó thaisce ar thaobh an fhreastalaí ionas go mbeidh an t-iarratas a fheiceann an córas réamhtheachtach comhsheasmhach. Tugadh isteach mar chuid d'eagrán #1628 an mharthanacht hibrideach cuimhne/SQLite ionas go mairfidh an taisce i ndiaidh atosuithe próisis.

## Ailtireacht

```
Seal N (gineann an cúntóir):
  → tá reasoning_content + tool_calls sa fhreagra
  → má tá requiresReasoningReplay(provider, model) i bhfeidhm: cacheReasoningFromAssistantMessage()
      scríobhann sé (cuimhne + DB), agus gach tool_call.id mar eochair
  → cuirtear an freagra ar aghaidh chuig an gcliant (agus d’fhéadfadh sé an réasúnú a choinneáil nó gan é a choinneáil)

Seal N+1 (seolann an cliant teachtaireacht leantach):
  → braitheann an t-aistritheoir: requiresReasoningReplay(provider, model) === true
  → do gach teachtaireacht ón gcúntóir ina bhfuil tool_calls ach nach bhfuil reasoning_content:
      lookupReasoning(toolCalls[0].id) → cuimhne → DB
      aimsiú  → msg.reasoning_content = cached; recordReplay()
      teip    → msg.reasoning_content = "" (cúltaca oidhreachta do leaganacha níos sine de DeepSeek)
  → feiceann an córas réamhtheachtach stair chomhsheasmhach → gan 400
```

Déantar an ghabháil in `open-sse/handlers/chatCore.ts` (in dhá áit, ag an dá shuíomh glao ar `cacheReasoningFromAssistantMessage`). Déantar an t-athsheinm in `open-sse/translator/index.ts` tar éis comhéigean na scéime ach roimh an seoladh.

Úsáidtear eochracha éagsúla do shealanna simplí ón gcúntóir (gan ghlao uirlise): déanann `buildAssistantMessageCacheKey()` achoimre den scóip seisiúin mar aon leis an tras-scríbhinn normalaithe i bhformáid OpenAI suas go dtí an seal sin, mar éilíonn DeepSeek réasúnú _gach_ seala roimhe sin a luaithe a bhíonn `tools` ann. I gcás spriocanna Responses-API (mar shampla `opencode-go/deepseek-v4-flash`, a sheoltar chuig `/responses`), iompraíonn an corp réamhtheachtach `input`, seachas `messages`, agus mar sin tuairiscíonn `translateRequest()` (`open-sse/translator/index.ts`) an tras-scríbhinn mhaighdeogach a ndearna sé achoimre di trí rogha aisghlao, agus déanann na suíomhanna gabhála achoimre den tras-scríbhinn chéanna. Ritheann pas athsheinm Responses ar mhaighdeog OpenAI i gcás gach formáide foinse, agus mar sin déantar athsheinm freisin do chliaint Anthropic Messages (Claude → OpenAI → Responses).

## Stóráil — Cuimhne Hibrideach + SQLite

Úsáideann an chonair the in-chuimhne `Map` (LRU de réir cruthaithe), agus tacaíonn tábla SQLite léi chun téarnamh ó chliseadh agus infheictheacht sa deais a sholáthar.

| Sraith  | Cur Chun Feidhme                               | Cuspóir                                                  |
| ------- | ---------------------------------------------- | -------------------------------------------------------- |
| Cuimhne | `Map` in `open-sse/services/reasoningCache.ts` | Cuardaigh thapa, díbríonn sé an ceann is sine ag 200     |
| DB      | tábla `reasoning_cache` (`src/lib/db/`)        | Maireann sé thar atosuithe, cumhachtaíonn sé staitisticí |

Téann scríbhinní chuig an dá cheann. Seiceálann léamha an chuimhne ar dtús, agus ansin téann siad siar chuig DB (cuirtear torthaí ó DB chun cinn ar ais isteach sa chuimhne). Níl teipeanna DB marfach — leanann an taisce in-chuimhne de bheith ag freastal ar an gconair the.

**Réamhshocruithe:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Uasmhéid iontrálacha cuimhne: `200` (`MAX_MEMORY_ENTRIES`)
- Díbirt: an `createdAt` is sine ar dtús

## Scéimre an Bhunachair Sonraí

Imirce: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Innéacsanna: `expires_at`, `provider`, `model`, `created_at`. Stóráiltear `expires_at` mar shoicindí Aga Unix; normalaíonn an tsraith SELECT luachanna téacs oidhreachta trí `EXPIRES_AT_EPOCH_SQL`.

## Brath Soláthraí / Samhla

Cumasaítear athsheinm nuair a fhilleann `requiresReasoningReplay(provider, model)` `true`. Seiceálann an fheidhm dhá liosta in `open-sse/services/reasoningCache.ts`.

**Aitheantais soláthraí (meaitseáil bheacht, gan beann ar chás):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Patrúin slonn rialta samhla (gan beann ar chás):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` agus `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, iarmhír roghnach `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Chun soláthraí/samhail dhocht nua a chur leis, ní mór cur le ceann de na liostaí seo agus tástáil aonaid a scríobh a dhearbhaíonn instealladh athsheinnte. Ba cheart don tuairisc PR an teaghrán 400 cruinn réamhtheachtach ba chúis leis an athrú a lua.

## REST API

Nochtann an taisce dhá chríochphointe faoi `src/app/api/cache/reasoning/route.ts`. Éilíonn an dá cheann fíordheimhniú bainistíochta (`isAuthenticated` ó `@/shared/utils/apiAuth`).

| Modh   | Críochphointe                                             | Cur síos                                                         |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Staitisticí + iontrálacha uimhrithe ina leathanaigh              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Liostú scagtha (`limit` clampáilte go `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Glan gach rud (cuimhne + DB) agus athshocraigh áirimh amas/teipe |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Glan iontrálacha le haghaidh soláthraí amháin                    |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Scrios iontráil aonair                                           |

**Cruth freagartha GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Nótaí Oibríochtúla

- **Glanadh:** Glanann `cleanupReasoningCache()` iontrálacha cuimhne atá imithe in éag agus ritheann sé `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Glaonn próisis oibre seiceála sláinte air seo go tréimhsiúil.
- **Athshlánú tar éis tuairteála:** Tar éis atosaithe, bíonn an chuimhne folamh ach coinníonn an DB iontrálacha nár imigh in éag. Is amas DB é an chéad chuardach le haghaidh `tool_call_id` ar leith; is amais chuimhne iad cuardaigh ina dhiaidh sin.
- **Gan réasúnaíocht, gan taisce:** Filleann `cacheReasoningFromAssistantMessage` `0` nuair nach bhfuil réimse `reasoning_content` / `reasoning` i dteachtaireacht an chúntóra, mar sin ní bhíonn aon chostas ag baint le freagraí nach mbaineann smaointeoireacht leo.
- **Tá an scríobh geataithe freisin:** ní ghlaonn an dá ionad glao in `chatCore.ts` (neamhshruthaithe agus sruthaithe) ar `cacheReasoningFromAssistantMessage()` ach amháin nuair atá `requiresReasoningReplay(provider, model)` cothrom le `true` — an tuar céanna a sheiceálann taobh na léitheoireachta. Ní íocann suiteálacha nach mbaineann riamh le soláthraí athsheinnte as an scríobh, nuashonrú na hinnéacsála, ná an try/catch ar gach freagra ina bhfuil réasúnaíocht.
- **Soláthraithe neamhdhochta:** Nuair atá `requiresReasoningReplay` cothrom le `false` agus OpenAI mar spriocfhormáid, **baineann** an t-aistritheoir aon réimse `reasoning_content` de theachtaireachtaí amach — ní ghlacann OpenAI Chat Completions leis.

## Féach Freisin

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — scoradáin chiorcaid, tréimhsí fuaraithe, frithdhúnadh samhlacha
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 400í réamhtheachtacha a dhiagnóisiú
- Foinse: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Imirce: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Bealach API: `src/app/api/cache/reasoning/route.ts`
- Buncheist: #1628
