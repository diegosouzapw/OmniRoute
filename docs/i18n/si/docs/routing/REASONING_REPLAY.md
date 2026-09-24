# Reasoning Replay Cache (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute, thinking-mode ආකෘති මඟින් නිපදවන සහායක `reasoning_content` ග්රහණය කර, upstream සපයන්නාට එය අවශ්ය වන විට බහු-වාර ඉල්ලීම් සඳහා විනිවිදභාවයෙන් නැවත ධාවනය කරයි. සේවාලාභියෙකුගේ සංවාද ඉතිහාසයේ පෙර වාරයේ reasoning අන්තර්ගතය නොමැති විට දැඩි සපයන්නන් විසින් ඇති කරන HTTP 400 දෝෂ මෙයින් ඉවත් කෙරේ.

## මෙය පවතින්නේ ඇයි

**පෙර සහායක පණිවිඩයට මුල් `reasoning_content` ඇතුළත් නොවන්නේ නම්**, thinking-mode සපයන්නන් කිහිප දෙනෙක් පසු විපරම් වාරයක් ප්රතික්ෂේප කරති. Upstream සේවාව පහත ආකාරයේ පණිවිඩ සමඟ 400 ප්රතිචාරයක් ලබා දෙයි:

```
පරාමිතිය වැරදියි: thinking mode හි reasoning_content නැවත API වෙත යැවිය යුතුය.
```

එහෙත් සාමාන්ය සේවාලාභීන් (Cursor, Cline, Roo Code, OpenAI SDK) ඔවුන් නැවත ධාවනය කරන ඉතිහාසයෙන් `reasoning_content` ඉවත් කරති. Upstream සේවාව දකින ඉල්ලීම අනුකූල වන පරිදි OmniRoute එය සේවාදායක-පාර්ශ්ව cache එකකින් ප්රතිස්ථාපනය කරයි. ක්රියාවලි නැවත ආරම්භ කිරීම් හරහා cache එක පවත්වා ගැනීම සඳහා දෙමුහුන් memory/SQLite ස්ථායීතාව ගැටලුව #1628 මඟින් හඳුන්වා දෙන ලදී.

## ගෘහනිර්මාණය

```
වාරය N (සහායකයා ජනනය කරයි):
  → ප්රතිචාරයේ reasoning_content + tool_calls අඩංගු වේ
  → requiresReasoningReplay(provider, model) නම්: cacheReasoningFromAssistantMessage()
      සෑම tool_call.id එකක්ම යතුර ලෙස භාවිත කරමින් (මතකය + DB) වෙත ලියයි
  → ප්රතිචාරය සේවාලාභියා වෙත යොමු කරයි (ඔහු reasoning රඳවා තබාගැනීමට හෝ නොගැනීමට ඉඩ ඇත)

වාරය N+1 (සේවාලාභියා පසු විමසුමක් යවයි):
  → පරිවර්තකය හඳුනාගනී: requiresReasoningReplay(provider, model) === true
  → tool_calls ඇති සහ reasoning_content නොමැති සෑම සහායක පණිවිඩයක් සඳහාම:
      lookupReasoning(toolCalls[0].id) → මතකය → DB
      හමු විය  → msg.reasoning_content = cached; recordReplay()
      හමු නොවීය → msg.reasoning_content = "" (පැරණි DeepSeek සඳහා අනුකූලතා පසුබැසීම)
  → ඉහළ ප්රවාහයට අනුකූල ඉතිහාසයක් පෙනේ → 400 දෝෂයක් නැත
```

ග්රහණය කිරීම `open-sse/handlers/chatCore.ts` තුළ සිදු වේ (`cacheReasoningFromAssistantMessage` කැඳවන ස්ථාන දෙකෙහි). නැවත ධාවනය, schema බලහත්කාර පරිවර්තනයෙන් පසුව නමුත් යොමු කිරීමට පෙර, `open-sse/translator/index.ts` තුළ සිදු වේ.

සාමාන්ය (tool-call නොවන) සහායක වාර සඳහා යතුරු වෙනස් ආකාරයකින් නිර්මාණය කෙරේ: `buildAssistantMessageCacheKey()` මඟින් session විෂය පථය සහ එම වාරය දක්වා සාමාන්යකරණය කළ OpenAI-ආකෘතියේ පිටපත සාරාංශගත කරයි, මන්ද `tools` පවතින විට පෙර පැවති _සෑම_ වාරයකම reasoning DeepSeek හට අවශ්ය වන බැවිනි. Responses-API ඉලක්ක සඳහා (උදාහරණයක් ලෙස `/responses` වෙත යොමු කෙරෙන `opencode-go/deepseek-v4-flash`) ඉහළ ප්රවාහයේ body එක `messages` නොව `input` රැගෙන යයි. එබැවින් `translateRequest()` (`open-sse/translator/index.ts`) callback විකල්පයක් හරහා තමන් සාරාංශගත කළ pivot පිටපත වාර්තා කරන අතර, ග්රහණ ස්ථාන එම පිටපතම සාරාංශගත කරයි. සෑම මූලාශ්ර ආකෘතියක් සඳහාම Responses නැවත ධාවන අදියර OpenAI pivot මත ක්රියාත්මක වන බැවින්, Anthropic Messages සේවාලාභීන්ද (Claude → OpenAI → Responses) නැවත ධාවනය කෙරේ.

## ගබඩාව — දෙමුහුන් Memory + SQLite

උණුසුම් මාර්ගය, බිඳවැටීම්වලින් ප්රතිසාධනය සහ dashboard දෘශ්යතාව සඳහා SQLite වගුවක පිටුබලය ලැබූ memory තුළ ඇති `Map` එකක් (නිර්මාණ කාලය අනුව LRU) භාවිත කරයි.

| ස්තරය  | ක්රියාත්මක කිරීම                                | අරමුණ                                         |
| ------ | ----------------------------------------------- | --------------------------------------------- |
| Memory | `open-sse/services/reasoningCache.ts` තුළ `Map` | වේගවත් සෙවීම්; 200 දී පැරණිතම ඒවා ඉවත් කරයි   |
| DB     | `reasoning_cache` වගුව (`src/lib/db/`)          | නැවත ආරම්භ කිරීම් හරහා පවතී; සංඛ්යාලේඛන සපයයි |

ලියවීම් දෙකටම යයි. කියවීම් පළමුව memory පරීක්ෂා කර, පසුව DB වෙත fallback වේ (DB තුළ හමු වූ දත්ත නැවත memory වෙත උසස් කෙරේ). DB අසමත්වීම් මාරාන්තික නොවේ — memory තුළ ඇති cache එක දිගටම උණුසුම් මාර්ගයට සේවය කරයි.

**පෙරනිමි අගයන්:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- උපරිම memory ඇතුළත් කිරීම්: `200` (`MAX_MEMORY_ENTRIES`)
- ඉවත් කිරීම: පැරණිතම `createdAt` පළමුව

## දත්ත සමුදා යෝජනා ක්රමය

සංක්රමණය: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

දර්ශක: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix epoch තත්පර ලෙස ගබඩා කර ඇත; SELECT ස්තරය `EXPIRES_AT_EPOCH_SQL` හරහා පැරණි පෙළ අගයන් සාමාන්යකරණය කරයි.

## සපයන්නා / ආකෘතිය හඳුනාගැනීම

`requiresReasoningReplay(provider, model)` මඟින් `true` ලබා දෙන විට නැවත ධාවනය සක්රීය වේ. මෙම ශ්රිතය `open-sse/services/reasoningCache.ts` තුළ ඇති ලැයිස්තු දෙකක් පරීක්ෂා කරයි.

**සපයන්නාගේ IDs (නිශ්චිත ගැළපීම, අක්ෂර ප්රමාණය නොසලකා):**

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

**ආකෘති regex රටා (අක්ෂර ප්රමාණය නොසලකා):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` සහ `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, විකල්ප `-free` උපසර්ගය)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

නව දැඩි සපයන්නෙකු/ආකෘතියක් එක් කිරීම යනු මෙම ලැයිස්තුවලින් එකකට එය අගින් එක් කර, නැවත ධාවන ඇතුළත් කිරීම තහවුරු කරන ඒකක පරීක්ෂණයක් ලිවීමයි. වෙනසට හේතු වූ upstream 400 පණිවිඩය PR විස්තරය තුළ නිශ්චිතව උපුටා දැක්විය යුතුය.

## REST API

හැඹිලිය `src/app/api/cache/reasoning/route.ts` යටතේ අන්ත ලක්ෂ්ය දෙකක් සපයයි. දෙකටම කළමනාකරණ සත්යාපනය අවශ්ය වේ (`@/shared/utils/apiAuth` වෙතින් `isAuthenticated`).

| ක්රමය  | අන්ත ලක්ෂ්යය                                              | විස්තරය                                                       |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | සංඛ්යාලේඛන + පිටුකරණය කළ ඇතුළත් කිරීම්                        |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | පෙරහන් කළ ලැයිස්තුව (`limit` අගය `[1, 200]` පරාසයට සීමා කෙරේ) |
| DELETE | `/api/cache/reasoning`                                    | සියල්ල (මතකය + DB) හිස් කර hit/miss ගණන් යළි සකසයි            |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | එක් සපයන්නෙකු සඳහා වන ඇතුළත් කිරීම් පමණක් හිස් කරයි           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | තනි ඇතුළත් කිරීමක් මකයි                                       |

**GET ප්රතිචාරයේ ව්යුහය:**

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

## මෙහෙයුම් සටහන්

- **පිරිසිදු කිරීම:** `cleanupReasoningCache()` කල් ඉකුත් වූ මතක ඇතුළත් කිරීම් ඉවත් කර `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` ධාවනය කරයි. සෞඛ්ය පරීක්ෂණ workers මෙය කාලානුරූපව කැඳවයි.
- **බිඳවැටීමෙන් ප්රතිසාධනය:** නැවත ආරම්භ කිරීමකින් පසු මතකය හිස් වුවද, DB තුළ තවමත් කල් ඉකුත් නොවූ ඇතුළත් කිරීම් පවතී. දී ඇති `tool_call_id` සඳහා පළමු සෙවීම DB hit එකක් වන අතර, ඉන්පසු සෙවීම් memory hits වේ.
- **තර්කනයක් නැත්නම් හැඹිලියක් නැත:** සහායක පණිවිඩයේ `reasoning_content` / `reasoning` ක්ෂේත්රයක් නොමැති විට `cacheReasoningFromAssistantMessage` මඟින් `0` ලබා දෙන බැවින්, තර්කන නොවන ප්රතිචාර සඳහා කිසිදු පිරිවැයක් නොමැත.
- **ලිවීමද කොන්දේසියකට යටත්ය:** `chatCore.ts` තුළ ඇති කැඳවුම් ස්ථාන දෙකම (ප්රවාහ නොවන සහ ප්රවාහ) `requiresReasoningReplay(provider, model)` අගය `true` වන විට පමණක් `cacheReasoningFromAssistantMessage()` කැඳවයි — මෙය කියවීමේ පාර්ශ්වය පරීක්ෂා කරන එම predicate එකම වේ. නැවත ධාවන සපයන්නෙකු කිසිවිටෙක භාවිත නොකරන ස්ථාපනයන්ට, සෑම තර්කනයක් සහිත ප්රතිචාරයකදීම ලිවීම, දර්ශක යාවත්කාලීනය සහ try/catch සඳහා වන පිරිවැය තවදුරටත් දැරීමට සිදු නොවේ.
- **දැඩි නොවන සපයන්නන්:** `requiresReasoningReplay` අගය `false` වන විට සහ ඉලක්ක ආකෘතිය OpenAI වන විට, පරිවර්තකය පිටතට යවන පණිවිඩවලින් ඕනෑම `reasoning_content` ක්ෂේත්රයක් **ඉවත් කරයි** — OpenAI Chat Completions එය පිළිගන්නේ නැත.

## මෙයද බලන්න

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — පරිපථ බිඳිනයන්, සිසිලන කාලයන්, ආකෘති අගුලු දැමීම්
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — උඩුගං 400 දෝෂ හඳුනාගැනීම
- මූලාශ්රය: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- සංක්රමණය: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API මාර්ගය: `src/app/api/cache/reasoning/route.ts`
- මුල් ගැටලුව: #1628
