# Reasoning Replay Cache (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Orísun òtítọ́:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ìmúdójúìwọ̀n tó kẹ́yìn:** 2026-06-28 — v3.8.40

OmniRoute ń gba `reasoning_content` olùrànlọ́wọ́ tí àwọn àwòṣe ipò-ìrònú ṣẹ̀dá, ó sì ń tún un ṣe ní gbangba lórí àwọn ìbéèrè olóríṣiríṣi ìyípadà nígbà tí olùpèsè upstream bá nílò rẹ̀. Èyí ń mú àwọn àṣìṣe HTTP 400 tí àwọn olùpèsè tó muna ń gbé jáde kúrò, nígbà tí ìtàn ìjíròrò oníbàárà kò bá ní èrò láti ìyípadà tó ṣáájú.

## Ìdí Tí Èyí Fi Wà

Ọ̀pọ̀ àwọn olùpèsè ipò-ìrònú máa ń kọ ìyípadà àtẹ̀lé bí **ìfiránṣẹ́ olùrànlọ́wọ́ tó ṣáájú kò bá ní `reasoning_content` ojúlówó náà**. Upstream máa ń dá 400 padà pẹ̀lú àwọn ìfiránṣẹ́ bíi:

```
Párámítà Kò Tọ̀nà: A gbọ́dọ̀ fi reasoning_content inú ipò ìrònú padà sí API náà.
```

Ṣùgbọ́n àwọn oníbàárà tí a sábà máa ń lò (Cursor, Cline, Roo Code, OpenAI SDK) máa ń yọ `reasoning_content` kúrò nínú ìtàn tí wọ́n tún ń fi ránṣẹ́. OmniRoute máa ń mú un padà láti inú cache ẹgbẹ́ server kí ìbéèrè tí upstream rí lè wà ní ìbámu. Issue #1628 ló mú ìtọ́jú àkópọ̀ memory/SQLite wọlé kí cache náà lè yè lẹ́yìn ìbẹ̀rẹ̀ process tuntun.

## Àwòrán-ẹ̀rọ

```
Ìyípo N (olùrànlọ́wọ́ ń ṣe àgbéjáde):
  → èsì ní reasoning_content + tool_calls
  → bí requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      kọ̀wé sí (ìrántí + DB), pẹ̀lú gbogbo tool_call.id gẹ́gẹ́ bí kọ́kọ́rọ́
  → fi èsì ránṣẹ́ sí oníbàárà (èyí tí ó lè pa ìrònú mọ́ tàbí kí ó má pa á mọ́)

Ìyípo N+1 (oníbàárà fi ìtẹ̀lé ránṣẹ́):
  → olùtumọ̀ ṣàwárí pé: requiresReasoningReplay(provider, model) === true
  → fún ọ̀kọ̀ọ̀kan àwọn ìfiránṣẹ́ olùrànlọ́wọ́ tí ó ní tool_calls ṣùgbọ́n tí kò ní reasoning_content:
      lookupReasoning(toolCalls[0].id) → ìrántí → DB
      bá rí i  → msg.reasoning_content = cached; recordReplay()
      bí kò bá rí i → msg.reasoning_content = "" (ìpadàsẹ́yìn àtijọ́ fún DeepSeek àgbà)
  → ẹ̀ka òkè rí ìtàn tí ó bá ara rẹ̀ mu → kò sí 400
```

Ìgbàkọsílẹ̀ ń ṣẹlẹ̀ nínú `open-sse/handlers/chatCore.ts` (ní ibi méjì, ní àwọn ibi méjèèjì tí a ti pe `cacheReasoningFromAssistantMessage`). Ìtúnṣàgbéjáde ń ṣẹlẹ̀ nínú `open-sse/translator/index.ts` lẹ́yìn ìfipámú schema ṣùgbọ́n ṣáájú fífi ránṣẹ́.

Àwọn ìyípo olùrànlọ́wọ́ lasan (tí kì í ṣe tool-call) ní ọ̀nà míì tí a fi ń ṣe kọ́kọ́rọ́ wọn: `buildAssistantMessageCacheKey()` ń ṣe digest ti ààlà session pẹ̀lú transcript tó ti jẹ́ normalized ní OpenAI-format títí dé ìyípo yẹn, nítorí DeepSeek nílò ìrònú ti _gbogbo_ ìyípo ṣáájú nígbà tí `tools` bá wà. Fún àwọn ibi-àfojúsùn Responses-API (fún àpẹẹrẹ `opencode-go/deepseek-v4-flash`, tí a darí sí `/responses`), body tí a rán sí ẹ̀ka òkè ní `input`, kì í ṣe `messages`, nítorí náà `translateRequest()` (`open-sse/translator/index.ts`) ń jabo pivot transcript tí ó ṣe digest rẹ̀ nípasẹ̀ aṣàyàn callback, àwọn ibi ìgbàkọsílẹ̀ náà sì ń ṣe digest transcript kan náà. Ìpele ìtúnṣàgbéjáde Responses ń ṣiṣẹ́ lórí pivot OpenAI fún gbogbo source format, nítorí náà àwọn oníbàárà Anthropic Messages (Claude → OpenAI → Responses) tún ń gba ìtúnṣàgbéjáde.

## Ìpamọ́ — Àkópọ̀ Memory + SQLite

Ọ̀nà tí a sábà ń lò máa ń lo `Map` inú memory (LRU-gẹ́gẹ́-bí-àkókò-ẹ̀dá), tí tábìlì SQLite ń ṣe àtìlẹ́yìn fún un láti mú padà lẹ́yìn ìdálẹ́kun àti fún híhàn lórí dashboard.

| Ìpele  | Ìmúlò                                            | Ète                                        |
| ------ | ------------------------------------------------ | ------------------------------------------ |
| Memory | `Map` nínú `open-sse/services/reasoningCache.ts` | Ìṣàwárí kíákíá, yọ èyí tó ti pẹ́ jù ní 200  |
| DB     | Tábìlì `reasoning_cache` (`src/lib/db/`)         | Wà títí lẹ́yìn ìbẹ̀rẹ̀ tuntun, ó ń pèsè stats |

A máa ń kọ sí méjèèjì. Ìkà máa ń kọ́kọ́ ṣàyẹ̀wò memory, lẹ́yìn náà ó máa ń lo DB bí kò bá rí i (àwọn àbájáde DB ni a máa ń gbé padà sínú memory). Ìkùnà DB kì í dá iṣẹ́ dúró — cache inú memory máa ń tẹ̀síwájú láti ṣiṣẹ́ fún ọ̀nà tí a sábà ń lò.

**Àwọn iye àkọ́kọ́:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Àpapọ̀ àkọọlẹ̀ memory tó pọ̀ jù: `200` (`MAX_MEMORY_ENTRIES`)
- Ìyọkúrò: `createdAt` tó ti pẹ́ jù ni àkọ́kọ́

## Àwòrán Ìpìlẹ̀ Data

Ìṣíkiri: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Àwọn atọ́ka: `expires_at`, `provider`, `model`, `created_at`. A máa ń tọ́jú `expires_at` gẹ́gẹ́ bí ìṣẹ́jú-àáyá epoch Unix; ipele SELECT máa ń ṣe àwọn iye ọ̀rọ̀ àtijọ́ ní ìbámu pẹ̀lú ìlànà kan náà nípasẹ̀ `EXPIRES_AT_EPOCH_SQL`.

## Ìṣàwárí Olùpèsè / Mọ́dẹ́lì

A máa ń mú àtúnṣeré ṣiṣẹ́ nígbà tí `requiresReasoningReplay(provider, model)` bá dá `true` padà. Fọ́ńṣọ̀nù náà ń ṣàyẹ̀wò àkójọ méjì nínú `open-sse/services/reasoningCache.ts`.

**Àwọn ID olùpèsè (ìbámu pípé, láìka lẹ́tà ńlá tàbí kékeré sí):**

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

**Àwọn àpẹẹrẹ regex mọ́dẹ́lì (láìka lẹ́tà ńlá tàbí kékeré sí):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` àti `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, àfikún `-free` tí kò pọndandan)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Fífi olùpèsè/mọ́dẹ́lì tó muna tuntun kún un túmọ̀ sí fífi í sí ọ̀kan lára àwọn àkójọ wọ̀nyí àti kíkọ ìdánwò ẹyọ kan tó jẹ́rìí fífi àtúnṣeré sínú rẹ̀. Àpèjúwe PR gbọ́dọ̀ tọ́ka sí gbolóhùn upstream 400 gan-an tó fa ìyípadà náà.

## REST API

Kaṣe náà ṣí àwọn endpoint méjì sílẹ̀ lábẹ́ `src/app/api/cache/reasoning/route.ts`. Àwọn méjèèjì nílò ìfàṣẹsí ìṣàkóso (`isAuthenticated` láti `@/shared/utils/apiAuth`).

| Ọ̀nà    | Endpoint                                                  | Àpèjúwe                                                      |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Ìṣirò + àwọn àkọọlẹ̀ tí a pín sí ojúewé                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Àkójọ tí a ti ṣàlẹ̀mọ́ (`limit` ni a fi mọ́ àárín `[1, 200]`)   |
| DELETE | `/api/cache/reasoning`                                    | Pa gbogbo rẹ̀ rẹ́ (memory + DB), kí o sì tún iye hit/miss ṣètò |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Pa àwọn àkọọlẹ̀ olùpèsè kan ṣoṣo rẹ́                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Pa àkọọlẹ̀ kan ṣoṣo rẹ́                                        |

**Ìrísí ìdáhùn GET:**

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

## Àwọn Àkíyèsí Ìṣiṣẹ́

- **Ìfọ̀mọ́:** `cleanupReasoningCache()` ń yọ àwọn àkọọlẹ̀ memory tí àkókò wọn ti parí, ó sì ń ṣiṣẹ́ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Àwọn worker àyẹ̀wò ìlera máa ń pe èyí lẹ́ẹ̀kọ̀ọ̀kan.
- **Ìmúpadàbọ̀sípò lẹ́yìn ìjákulẹ̀:** Lẹ́yìn àtún bẹ̀rẹ̀, memory máa ṣófo ṣùgbọ́n DB ṣì máa ní àwọn àkọọlẹ̀ tí àkókò wọn kò tíì parí. Ìṣàwárí àkọ́kọ́ fún `tool_call_id` kan jẹ́ hit DB; àwọn ìṣàwárí tó tẹ̀ lé e jẹ́ hit memory.
- **Kò sí ìrònú, kò sí kaṣe:** `cacheReasoningFromAssistantMessage` máa dá `0` padà nígbà tí ìfiránṣẹ́ olùrànlọ́wọ́ kò bá ní pápá `reasoning_content` / `reasoning`, nítorí náà àwọn ìdáhùn tí kì í ṣe ti ìrònú kò ná ohunkóhun.
- **A tún ń ṣàkóso ìkọ̀wé:** àwọn ibi ìpè méjèèjì nínú `chatCore.ts` (èyí tí kì í ṣe streaming àti èyí tí ó jẹ́ streaming) máa ń pe `cacheReasoningFromAssistantMessage()` nìkan nígbà tí `requiresReasoningReplay(provider, model)` bá jẹ́ `true` — predicate kan náà tí apá kíkà ń ṣàyẹ̀wò. Àwọn ìfisílẹ̀ tí kò bá lo olùpèsè àtúnṣeré láéláé kò ní san owó iṣẹ́ ìkọ̀wé, ìmúdójúìwọ̀n index, àti try/catch lórí gbogbo ìdáhùn tó ní ìrònú mọ́.
- **Àwọn olùpèsè tí kò muna:** Nígbà tí `requiresReasoningReplay` bá jẹ́ `false` tí fọ́ọ̀mù àfojúsùn sì jẹ́ OpenAI, atúmọ̀ náà máa ń **yọ** pápá `reasoning_content` èyíkéyìí kúrò nínú àwọn ìfiránṣẹ́ tí ń jáde — OpenAI Chat Completions kò gbà á.

## Tún Wo Èyí Pẹ̀lú

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — àwọn olùdáwọ́dúró àyíká, àwọn àkókò ìtútù, àti dídènà àwọn àwòṣe
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ṣíṣe àyẹ̀wò àwọn àṣìṣe 400 láti upstream
- Kóòdù ìpilẹ̀ṣẹ̀: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Ìṣíkiri: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Ojú-ọ̀nà API: `src/app/api/cache/reasoning/route.ts`
- Ọ̀ràn ìpilẹ̀ṣẹ̀: #1628
