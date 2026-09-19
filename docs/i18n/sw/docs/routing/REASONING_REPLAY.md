# Reasoning Replay Cache (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Chanzo cha ukweli:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ilisasishwa mwisho:** 2026-06-28 — v3.8.40

OmniRoute hunasa `reasoning_content` ya msaidizi inayozalishwa na modeli za hali ya kufikiri na kuicheza tena kwa uwazi kwenye maombi yenye zamu nyingi wakati mtoa huduma wa upande wa juu anapohitaji hivyo. Hii huondoa hitilafu za HTTP 400 ambazo watoa huduma wenye masharti makali hutoa wakati historia ya mazungumzo ya mteja haina maudhui ya kufikiri ya zamu iliyotangulia.

## Kwa Nini Hii Ipo

Watoa huduma kadhaa wa hali ya kufikiri hukataa zamu inayofuata isipokuwa **ujumbe uliotangulia wa msaidizi ujumuishe `reasoning_content` ya awali**. Mfumo wa upande wa juu hurejesha 400 ukiwa na ujumbe kama:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Lakini wateja wa kawaida (Cursor, Cline, Roo Code, OpenAI SDK) huondoa `reasoning_content` kwenye historia wanayoicheza tena. OmniRoute huirejesha kutoka kwenye akiba ya upande wa seva ili ombi linaloonekana na mfumo wa upande wa juu liwe thabiti. Suala #1628 lilianzisha uhifadhi mseto wa kumbukumbu/SQLite ili akiba idumu baada ya michakato kuanzishwa upya.

## Usanifu

```
Zamu N (msaidizi anazalisha):
  → jibu lina reasoning_content + tool_calls
  → ikiwa requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      huandika (kumbukumbu + DB), kwa kutumia kila tool_call.id kama ufunguo
  → sambaza jibu kwa mteja (ambaye anaweza kuhifadhi au kutohifadhi maudhui ya kufikiri)

Zamu N+1 (mteja anatuma ombi linalofuata):
  → kitafsiri hugundua: requiresReasoningReplay(provider, model) === true
  → kwa kila ujumbe wa msaidizi wenye tool_calls na usio na reasoning_content:
      lookupReasoning(toolCalls[0].id) → kumbukumbu → DB
      imepatikana  → msg.reasoning_content = cached; recordReplay()
      haijapatikana → msg.reasoning_content = "" (njia mbadala ya zamani kwa DeepSeek ya zamani)
  → mfumo wa upande wa juu huona historia thabiti → hakuna 400
```

Unasaji hufanyika katika `open-sse/handlers/chatCore.ts` (sehemu mbili, kwenye sehemu mbili ambazo `cacheReasoningFromAssistantMessage` huitwa). Uchezaji upya hufanyika katika `open-sse/translator/index.ts` baada ya ulazimishaji wa skema lakini kabla ya utumaji.

## Hifadhi — Kumbukumbu Mseto + SQLite

Njia inayotumiwa mara kwa mara hutumia `Map` ya ndani ya kumbukumbu (LRU-kulingana-na-wakati-wa-kuundwa) inayoungwa mkono na jedwali la SQLite kwa ajili ya urejeshaji baada ya hitilafu na uonekanaji kwenye dashibodi.

| Tabaka     | Utekelezaji                                        | Kusudi                                                    |
| ---------- | -------------------------------------------------- | --------------------------------------------------------- |
| Kumbukumbu | `Map` katika `open-sse/services/reasoningCache.ts` | Utafutaji wa haraka, huondoa ya zamani zaidi ikifikia 200 |
| DB         | Jedwali la `reasoning_cache` (`src/lib/db/`)       | Hudumu baada ya kuanzishwa upya, huendesha takwimu        |

Maandishi huenda kwenye zote mbili. Usomaji huangalia kumbukumbu kwanza, kisha hutumia DB ikiwa haujapata matokeo (matokeo yanayopatikana katika DB hurudishwa kwenye kumbukumbu). Hitilafu za DB si hatari — akiba ya ndani ya kumbukumbu huendelea kuhudumia njia inayotumiwa mara kwa mara.

**Chaguo-msingi:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Idadi ya juu zaidi ya rekodi kwenye kumbukumbu: `200` (`MAX_MEMORY_ENTRIES`)
- Uondoaji: `createdAt` ya zamani zaidi kwanza

## Skema ya Hifadhidata

Uhamishaji: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` huhifadhiwa kama sekunde za Unix epoch; safu ya SELECT husawazisha thamani za maandishi za zamani kupitia `EXPIRES_AT_EPOCH_SQL`.

## Utambuzi wa Mtoa Huduma / Modeli

Urudiaji huwashwa wakati `requiresReasoningReplay(provider, model)` inaporejesha `true`. Kitendakazi hiki hukagua orodha mbili katika `open-sse/services/reasoningCache.ts`.

**Vitambulisho vya watoa huduma (ulinganifu kamili, bila kujali herufi kubwa au ndogo):**

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

**Ruwaza za regex za modeli (bila kujali herufi kubwa au ndogo):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` na `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, kiambishi tamati cha hiari `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Kuongeza mtoa huduma/modeli mpya yenye masharti makali kunamaanisha kuambatisha kwenye mojawapo ya orodha hizi na kuandika jaribio la kitengo linalothibitisha uingizaji wa urudiaji. Maelezo ya PR yanapaswa kunukuu mfuatano halisi wa hitilafu ya 400 kutoka chanzo cha juu uliosababisha mabadiliko hayo.

## API ya REST

Akiba hutoa ncha mbili chini ya `src/app/api/cache/reasoning/route.ts`. Zote zinahitaji uthibitishaji wa usimamizi (`isAuthenticated` kutoka `@/shared/utils/apiAuth`).

| Mbinu  | Ncha                                                      | Maelezo                                                          |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Takwimu + maingizo yaliyogawanywa katika kurasa                  |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Orodha iliyochujwa (`limit` imewekewa mipaka ya `[1, 200]`)      |
| DELETE | `/api/cache/reasoning`                                    | Futa kila kitu (kumbukumbu + DB) na uweke upya idadi ya hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Futa maingizo ya mtoa huduma mmoja pekee                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Futa ingizo moja                                                 |

**Muundo wa jibu la GET:**

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

## Maelezo ya Uendeshaji

- **Usafishaji:** `cleanupReasoningCache()` huondoa maingizo ya kumbukumbu yaliyopitwa na muda na kutekeleza `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Vitekelezaji vya ukaguzi wa afya huiita mara kwa mara.
- **Urejeshaji baada ya hitilafu:** Baada ya kuwasha upya, kumbukumbu huwa tupu lakini DB bado huhifadhi maingizo ambayo muda wake haujaisha. Utafutaji wa kwanza wa `tool_call_id` fulani hupata matokeo kutoka DB; utafutaji unaofuata hupata matokeo kutoka kwenye kumbukumbu.
- **Hakuna ujalilishaji, hakuna akiba:** `cacheReasoningFromAssistantMessage` hurejesha `0` wakati ujumbe wa msaidizi hauna uga wa `reasoning_content` / `reasoning`, kwa hivyo majibu yasiyotumia ujalilishaji hayana gharama yoyote.
- **Uandishi pia unadhibitiwa:** sehemu zote mbili za uitaji katika `chatCore.ts` (isiyotiririsha na inayotiririsha) huita `cacheReasoningFromAssistantMessage()` tu wakati `requiresReasoningReplay(provider, model)` ni `true` — kihusishi kilekile kinachokaguliwa na upande wa usomaji. Usakinishaji ambao kamwe hautumii mtoa huduma wa urudiaji huepuka gharama ya uandishi, usasishaji wa faharasa, na try/catch katika kila jibu lenye ujalilishaji.
- **Watoa huduma wasio na masharti makali:** Wakati `requiresReasoningReplay` ni `false` na umbizo lengwa ni OpenAI, kitafsiri **huondoa** uga wowote wa `reasoning_content` kutoka kwenye ujumbe unaotumwa — OpenAI Chat Completions hauukubali.

## Tazama Pia

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — vivunja saketi, vipindi vya kusubiri, kuzuiwa kwa modeli
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — utambuzi wa hitilafu za 400 kutoka huduma za juu
- Msimbo chanzo: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Uhamishaji: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Njia ya API: `src/app/api/cache/reasoning/route.ts`
- Tatizo la awali: #1628
