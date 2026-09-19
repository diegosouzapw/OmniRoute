# Reasoning Replay Cache (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ప్రామాణిక మూలం:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **చివరిగా నవీకరించబడింది:** 2026-06-28 — v3.8.40

ఆలోచనా-మోడ్ మోడళ్లు రూపొందించిన అసిస్టెంట్ `reasoning_content`ను OmniRoute సంగ్రహిస్తుంది మరియు అప్స్ట్రీమ్ ప్రొవైడర్కు అది అవసరమైనప్పుడు బహుళ-టర్న్ అభ్యర్థనలలో దానిని పారదర్శకంగా తిరిగి పంపుతుంది. క్లయింట్ సంభాషణ చరిత్రలో మునుపటి టర్న్కు సంబంధించిన రీజనింగ్ లేనప్పుడు కఠినమైన ప్రొవైడర్లు ఇచ్చే HTTP 400 లోపాలను ఇది నివారిస్తుంది.

## ఇది ఎందుకు ఉంది

**మునుపటి అసిస్టెంట్ సందేశంలో అసలైన `reasoning_content` ఉంటే తప్ప** అనేక ఆలోచనా-మోడ్ ప్రొవైడర్లు తదుపరి టర్న్ను తిరస్కరిస్తారు. అప్స్ట్రీమ్ ఇలాంటి సందేశాలతో 400ను అందిస్తుంది:

```
పారామీటర్ తప్పుగా ఉంది: ఆలోచనా మోడ్లోని reasoning_contentను APIకి తిరిగి పంపాలి.
```

అయితే సాధారణ క్లయింట్లు (Cursor, Cline, Roo Code, OpenAI SDK) తాము తిరిగి పంపే చరిత్ర నుండి `reasoning_content`ను తొలగిస్తాయి. అప్స్ట్రీమ్కు కనిపించే అభ్యర్థన స్థిరంగా ఉండేలా OmniRoute దానిని సర్వర్-వైపు క్యాష్ నుండి పునరుద్ధరిస్తుంది. ప్రాసెస్ పునఃప్రారంభాల తర్వాత కూడా క్యాష్ నిలిచి ఉండేందుకు హైబ్రిడ్ మెమరీ/SQLite స్థిర నిల్వను Issue #1628 ప్రవేశపెట్టింది.

## ఆర్కిటెక్చర్

```
టర్న్ N (అసిస్టెంట్ రూపొందిస్తుంది):
  → ప్రతిస్పందనలో reasoning_content + tool_calls ఉంటాయి
  → requiresReasoningReplay(provider, model) అయితే: cacheReasoningFromAssistantMessage()
      ప్రతి tool_call.idను కీగా ఉపయోగించి (మెమరీ + DB)లో వ్రాస్తుంది
  → ప్రతిస్పందనను క్లయింట్కు ఫార్వర్డ్ చేస్తుంది (అది రీజనింగ్ను ఉంచవచ్చు లేదా ఉంచకపోవచ్చు)

టర్న్ N+1 (క్లయింట్ తదుపరి అభ్యర్థనను పంపుతుంది):
  → ట్రాన్స్లేటర్ గుర్తిస్తుంది: requiresReasoningReplay(provider, model) === true
  → tool_calls ఉండి reasoning_content లేని ప్రతి అసిస్టెంట్ సందేశం కోసం:
      lookupReasoning(toolCalls[0].id) → మెమరీ → DB
      హిట్  → msg.reasoning_content = cached; recordReplay()
      మిస్ → msg.reasoning_content = "" (పాత DeepSeek కోసం లెగసీ ఫాల్బ్యాక్)
  → అప్స్ట్రీమ్కు స్థిరమైన చరిత్ర కనిపిస్తుంది → 400 ఉండదు
```

క్యాప్చర్ `open-sse/handlers/chatCore.ts`లో జరుగుతుంది (`cacheReasoningFromAssistantMessage`ను కాల్ చేసే రెండు స్థానాలలో). స్కీమా కోర్షన్ తర్వాత, కానీ డిస్పాచ్కు ముందు, రీప్లే `open-sse/translator/index.ts`లో జరుగుతుంది.

## నిల్వ — హైబ్రిడ్ మెమరీ + SQLite

హాట్ పాత్, క్రాష్ రికవరీ మరియు డ్యాష్బోర్డ్ విజిబిలిటీ కోసం SQLite పట్టిక మద్దతుతో ఉన్న ఇన్-మెమరీ `Map`ను (సృష్టి ఆధారిత LRU) ఉపయోగిస్తుంది.

| లేయర్ | అమలు                                            | ప్రయోజనం                                                     |
| ----- | ----------------------------------------------- | ------------------------------------------------------------ |
| మెమరీ | `open-sse/services/reasoningCache.ts`లోని `Map` | వేగవంతమైన లుకప్లు, 200 వద్ద పురాతనమైనవి తొలగింపు             |
| DB    | `reasoning_cache` పట్టిక (`src/lib/db/`)        | పునఃప్రారంభాల తర్వాత కూడా నిలుస్తుంది, గణాంకాలను అందిస్తుంది |

రైట్లు రెండింటికీ వెళ్తాయి. రీడ్లు మొదట మెమరీలో చూస్తాయి, ఆపై DBకి ఫాల్బ్యాక్ అవుతాయి (DB హిట్లు తిరిగి మెమరీలోకి ప్రమోట్ చేయబడతాయి). DB వైఫల్యాలు ప్రాణాంతకమైనవి కావు — ఇన్-మెమరీ క్యాష్ హాట్ పాత్కు సేవలు అందించడాన్ని కొనసాగిస్తుంది.

**డిఫాల్ట్లు:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- గరిష్ఠ మెమరీ ఎంట్రీలు: `200` (`MAX_MEMORY_ENTRIES`)
- తొలగింపు: ముందుగా అత్యంత పాత `createdAt`

## డేటాబేస్ స్కీమా

మైగ్రేషన్: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ఇండెక్స్లు: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix epoch సెకన్లుగా నిల్వ చేయబడుతుంది; SELECT లేయర్ `EXPIRES_AT_EPOCH_SQL` ద్వారా లెగసీ టెక్స్ట్ విలువలను సాధారణీకరిస్తుంది.

## ప్రొవైడర్ / మోడల్ గుర్తింపు

`requiresReasoningReplay(provider, model)` అనేది `true`ను తిరిగి ఇచ్చినప్పుడు Replay ప్రారంభించబడుతుంది. ఈ ఫంక్షన్ `open-sse/services/reasoningCache.ts`లోని రెండు జాబితాలను తనిఖీ చేస్తుంది.

**ప్రొవైడర్ IDలు (ఖచ్చితమైన సరిపోలిక, case-insensitive):**

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

**మోడల్ regex నమూనాలు (case-insensitive):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` మరియు `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ఐచ్ఛిక `-free` suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

కొత్త strict ప్రొవైడర్/మోడల్ను జోడించాలంటే, ఈ జాబితాల్లో ఒకదానికి దాన్ని జోడించి, replay injectionను నిర్ధారించే unit testను వ్రాయాలి. ఈ మార్పుకు కారణమైన ఖచ్చితమైన upstream 400 stringను PR వివరణలో పేర్కొనాలి.

## REST API

ఈ cache, `src/app/api/cache/reasoning/route.ts` కింద రెండు endpointలను అందుబాటులో ఉంచుతుంది. రెండింటికీ management authentication (`@/shared/utils/apiAuth` నుండి `isAuthenticated`) అవసరం.

| పద్ధతి | Endpoint                                                  | వివరణ                                                             |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | గణాంకాలు + pagination చేసిన entries                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filter చేసిన జాబితా (`limit` `[1, 200]`కు పరిమితం చేయబడుతుంది)    |
| DELETE | `/api/cache/reasoning`                                    | అన్నింటినీ (memory + DB) తొలగించి hit/miss గణనలను reset చేస్తుంది |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ఒక ప్రొవైడర్కు చెందిన entriesను మాత్రమే తొలగిస్తుంది              |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ఒక entryని తొలగిస్తుంది                                           |

**GET response నిర్మాణం:**

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

## కార్యాచరణ గమనికలు

- **Cleanup:** `cleanupReasoningCache()` గడువు ముగిసిన memory entriesను తొలగించి, `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`ను అమలు చేస్తుంది. Health-check workerలు దీన్ని క్రమానుగతంగా కాల్ చేస్తాయి.
- **Crash recovery:** restart తర్వాత memory ఖాళీగా ఉంటుంది, కానీ గడువు ముగియని entries DBలో అలాగే ఉంటాయి. నిర్దిష్ట `tool_call_id` కోసం మొదటి lookup ఒక DB hit అవుతుంది; ఆ తర్వాతి lookupలు memory hitలు అవుతాయి.
- **Reasoning లేకపోతే cache ఉండదు:** assistant messageలో `reasoning_content` / `reasoning` field లేనప్పుడు `cacheReasoningFromAssistantMessage` అనేది `0`ను తిరిగి ఇస్తుంది, కాబట్టి thinking చేయని responseల వల్ల ఎలాంటి ఖర్చూ ఉండదు.
- **Write కూడా gated చేయబడుతుంది:** `chatCore.ts`లోని రెండు call siteలు (non-streaming మరియు streaming), `requiresReasoningReplay(provider, model)` అనేది `true` అయినప్పుడు మాత్రమే `cacheReasoningFromAssistantMessage()`ను కాల్ చేస్తాయి — read వైపు తనిఖీ చేసే predicate కూడా ఇదే. Replay ప్రొవైడర్ను ఎప్పుడూ ఉపయోగించని installationలు, reasoning కలిగిన ప్రతి responseపై write, index update, మరియు try/catch కోసం ఖర్చు చేయడం ఆపేస్తాయి.
- **Non-strict ప్రొవైడర్లు:** `requiresReasoningReplay` అనేది `false`గా ఉండి, target format OpenAI అయినప్పుడు, translator outgoing messageల నుండి ఏదైనా `reasoning_content` fieldను **తొలగిస్తుంది** — OpenAI Chat Completions దాన్ని అంగీకరించదు.

## ఇవి కూడా చూడండి

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — సర్క్యూట్ బ్రేకర్లు, కూల్డౌన్లు, మోడల్ లాకౌట్లు
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — అప్స్ట్రీమ్ 400 లోపాలను నిర్ధారించడం
- సోర్స్: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- మైగ్రేషన్: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API రూట్: `src/app/api/cache/reasoning/route.ts`
- అసలు ఇష్యూ: #1628
