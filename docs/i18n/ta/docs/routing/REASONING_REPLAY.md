# Reasoning Replay Cache (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **உண்மையின் ஆதார மூலம்:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-06-28 — v3.8.40

சிந்தனைப் பயன்முறை மாதிரிகள் உருவாக்கும் உதவியாளரின் `reasoning_content`-ஐ OmniRoute சேகரித்து, அப்ஸ்ட்ரீம் வழங்குநருக்கு அது தேவைப்படும்போது பல-முறை கோரிக்கைகளில் வெளிப்படையாக மீண்டும் வழங்குகிறது. கிளையன்ட்டின் உரையாடல் வரலாற்றில் முந்தைய முறையின் பகுத்தறிவு இல்லாதபோது, கடுமையான வழங்குநர்கள் எழுப்பும் HTTP 400 பிழைகளை இது நீக்குகிறது.

## இது ஏன் உள்ளது

பல சிந்தனைப் பயன்முறை வழங்குநர்கள், **முந்தைய உதவியாளர் செய்தியில் அசல் `reasoning_content` இடம்பெறாவிட்டால்**, தொடர்ச்சியான முறையை நிராகரிக்கின்றனர். அப்ஸ்ட்ரீம் பின்வருவது போன்ற செய்திகளுடன் 400-ஐ வழங்குகிறது:

```
அளவுரு தவறானது: சிந்தனைப் பயன்முறையில் உள்ள reasoning_content மீண்டும் API-க்கு அனுப்பப்பட வேண்டும்.
```

ஆனால் வழக்கமான கிளையன்ட்கள் (Cursor, Cline, Roo Code, OpenAI SDK), தாங்கள் மீண்டும் வழங்கும் வரலாற்றிலிருந்து `reasoning_content`-ஐ நீக்கிவிடுகின்றன. அப்ஸ்ட்ரீம் காணும் கோரிக்கை சீராக இருக்கும்படி, சேவையகப் பக்கத் தேக்ககத்திலிருந்து OmniRoute அதை மீட்டமைக்கிறது. செயல்முறை மறுதொடக்கங்களுக்குப் பிறகும் தேக்ககம் நிலைத்திருக்கும்படி, கலப்பின நினைவகம்/SQLite நிலைத்தன்மையை Issue #1628 அறிமுகப்படுத்தியது.

## கட்டமைப்பு

```
முறை N (உதவியாளர் உருவாக்குகிறது):
  → பதிலில் reasoning_content + tool_calls உள்ளன
  → requiresReasoningReplay(provider, model) எனில்: cacheReasoningFromAssistantMessage()
      ஒவ்வொரு tool_call.id-ஐயும் சாவியாகக் கொண்டு (நினைவகம் + DB)-இல் எழுதுகிறது
  → பதிலை கிளையன்ட்டுக்கு அனுப்புகிறது (அது பகுத்தறிவைத் தக்கவைத்திருக்கலாம் அல்லது வைத்திருக்காமலும் இருக்கலாம்)

முறை N+1 (கிளையன்ட் தொடர்ச்சிக் கோரிக்கையை அனுப்புகிறது):
  → மொழிமாற்றி கண்டறிகிறது: requiresReasoningReplay(provider, model) === true
  → tool_calls உள்ளதும் reasoning_content இல்லாததுமான ஒவ்வொரு உதவியாளர் செய்திக்கும்:
      lookupReasoning(toolCalls[0].id) → நினைவகம் → DB
      கிடைத்தால்  → msg.reasoning_content = cached; recordReplay()
      கிடைக்காவிட்டால் → msg.reasoning_content = "" (பழைய DeepSeek-க்கான மரபு மாற்றுவழி)
  → அப்ஸ்ட்ரீம் சீரான வரலாற்றைக் காண்கிறது → 400 இல்லை
```

சேகரிப்பு `open-sse/handlers/chatCore.ts`-இல் (`cacheReasoningFromAssistantMessage` அழைக்கப்படும் இரண்டு இடங்களில்) நிகழ்கிறது. மறுவழங்கல், திட்டவடிவக் கட்டாய மாற்றத்திற்குப் பிறகும் அனுப்புதலுக்கு முன்பும் `open-sse/translator/index.ts`-இல் நிகழ்கிறது.

## சேமிப்பகம் — கலப்பின நினைவகம் + SQLite

விரைவான பாதை, செயலிழப்பிலிருந்து மீட்பதற்கும் முகப்புப்பலகையில் காண்பிப்பதற்கும் SQLite அட்டவணையால் ஆதரிக்கப்படும் நினைவகத்திலுள்ள `Map`-ஐ (உருவாக்க நேரத்தின் அடிப்படையிலான LRU) பயன்படுத்துகிறது.

| அடுக்கு  | செயலாக்கம்                                           | நோக்கம்                                                                     |
| -------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| நினைவகம் | `open-sse/services/reasoningCache.ts`-இல் உள்ள `Map` | விரைவான தேடல்கள், 200-ஐ எட்டும்போது பழமையானதை வெளியேற்றுகிறது               |
| DB       | `reasoning_cache` அட்டவணை (`src/lib/db/`)            | மறுதொடக்கங்களுக்குப் பிறகும் நிலைத்திருக்கிறது, புள்ளிவிவரங்களை இயக்குகிறது |

எழுதுதல்கள் இரண்டிலும் மேற்கொள்ளப்படுகின்றன. வாசிப்புகள் முதலில் நினைவகத்தைச் சரிபார்த்து, பின்னர் DB-ஐ மாற்றுவழியாகப் பயன்படுத்துகின்றன (DB-இல் கிடைப்பவை மீண்டும் நினைவகத்திற்குப் பதவி உயர்த்தப்படுகின்றன). DB தோல்விகள் தீவிரமானவை அல்ல — நினைவகத் தேக்ககம் விரைவான பாதைக்குத் தொடர்ந்து சேவை வழங்குகிறது.

**இயல்புநிலைகள்:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- அதிகபட்ச நினைவகப் பதிவுகள்: `200` (`MAX_MEMORY_ENTRIES`)
- வெளியேற்றம்: முதலில் மிகப் பழைய `createdAt`

## தரவுத்தளத் திட்டவடிவம்

இடம்பெயர்வு: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

குறியீடுகள்: `expires_at`, `provider`, `model`, `created_at`. `expires_at` என்பது Unix epoch வினாடிகளாகச் சேமிக்கப்படுகிறது; SELECT அடுக்கு, மரபு உரை மதிப்புகளை `EXPIRES_AT_EPOCH_SQL` மூலம் இயல்பாக்குகிறது.

## வழங்குநர் / மாதிரி கண்டறிதல்

`requiresReasoningReplay(provider, model)` என்பது `true` எனத் திருப்பும்போது மீளியக்கம் செயல்படுத்தப்படும். இந்தச் செயல்பாடு `open-sse/services/reasoningCache.ts` கோப்பிலுள்ள இரண்டு பட்டியல்களைச் சரிபார்க்கிறது.

**வழங்குநர் ID-கள் (துல்லியப் பொருத்தம், எழுத்துப் பெரிய/சிறிய வேறுபாடின்றி):**

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

**மாதிரி regex வடிவங்கள் (எழுத்துப் பெரிய/சிறிய வேறுபாடின்றி):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` மற்றும் `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, விருப்பத்திற்குரிய `-free` பின்னொட்டு)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

புதிய கண்டிப்பான வழங்குநர்/மாதிரியைச் சேர்க்க, இந்தப் பட்டியல்களில் ஒன்றில் அதை இணைத்து, மீளியக்கச் செருகலை உறுதிப்படுத்தும் unit test ஒன்றை எழுத வேண்டும். மாற்றத்தைத் தூண்டிய upstream 400 சரத்தின் துல்லியமான உரையை PR விளக்கம் மேற்கோள் காட்ட வேண்டும்.

## REST API

இந்த cache, `src/app/api/cache/reasoning/route.ts` என்பதன் கீழ் இரண்டு endpoint-களை வெளிப்படுத்துகிறது. இரண்டிற்கும் மேலாண்மை அங்கீகாரம் (`@/shared/utils/apiAuth` இலிருந்து `isAuthenticated`) தேவை.

| முறை   | Endpoint                                                  | விளக்கம்                                                                           |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | புள்ளிவிவரங்கள் + பக்கங்களாக்கப்பட்ட பதிவுகள்                                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | வடிகட்டப்பட்ட பட்டியல் (`limit` ஆனது `[1, 200]` வரம்பிற்குள் கட்டுப்படுத்தப்படும்) |
| DELETE | `/api/cache/reasoning`                                    | அனைத்தையும் (நினைவகம் + DB) அழித்து, hit/miss எண்ணிக்கைகளை மீட்டமைக்கும்           |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ஒரு வழங்குநருக்கான பதிவுகளை மட்டும் அழிக்கும்                                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ஒற்றைப் பதிவை நீக்கும்                                                             |

**GET பதிலின் வடிவம்:**

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

## செயல்பாட்டுக் குறிப்புகள்

- **தூய்மைப்படுத்தல்:** `cleanupReasoningCache()` காலாவதியான நினைவகப் பதிவுகளை அகற்றி, `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` என்பதை இயக்குகிறது. Health-check worker-கள் இதை அவ்வப்போது அழைக்கின்றன.
- **செயலிழப்பிலிருந்து மீட்பு:** மறுதொடக்கத்திற்குப் பிறகு நினைவகம் காலியாக இருக்கும், ஆனால் காலாவதியாகாத பதிவுகளை DB தொடர்ந்து வைத்திருக்கும். குறிப்பிட்ட `tool_call_id`-க்கான முதல் lookup ஒரு DB hit ஆகும்; அடுத்தடுத்த lookup-கள் memory hit-களாக இருக்கும்.
- **Reasoning இல்லை, cache இல்லை:** assistant செய்தியில் `reasoning_content` / `reasoning` புலம் இல்லாதபோது `cacheReasoningFromAssistantMessage` ஆனது `0` எனத் திருப்பும்; எனவே reasoning இல்லாத பதில்களுக்கு எந்தச் செலவும் இல்லை.
- **எழுதுதலும் கட்டுப்படுத்தப்படுகிறது:** `chatCore.ts`-இல் உள்ள இரு call site-களும் (non-streaming மற்றும் streaming), `requiresReasoningReplay(provider, model)` என்பது `true` ஆக இருக்கும்போது மட்டுமே `cacheReasoningFromAssistantMessage()`-ஐ அழைக்கின்றன — வாசிப்புப் பக்கம் சரிபார்க்கும் அதே predicate இதுவாகும். மீளியக்க வழங்குநரை ஒருபோதும் பயன்படுத்தாத நிறுவல்கள், reasoning கொண்ட ஒவ்வொரு பதிலுக்கும் write, index update மற்றும் try/catch ஆகியவற்றுக்கான செலவைச் செலுத்துவதை நிறுத்துகின்றன.
- **கண்டிப்பற்ற வழங்குநர்கள்:** `requiresReasoningReplay` என்பது `false` ஆகவும் இலக்கு வடிவம் OpenAI ஆகவும் இருக்கும்போது, வெளியேறும் செய்திகளிலுள்ள எந்த `reasoning_content` புலத்தையும் translator **அகற்றுகிறது** — OpenAI Chat Completions அதை ஏற்றுக்கொள்வதில்லை.

## மேலும் காண்க

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — சர்க்யூட் பிரேக்கர்கள், குளிர்விப்பு காலங்கள், மாதிரி முடக்கங்கள்
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — அப்ஸ்ட்ரீம் 400 பிழைகளைக் கண்டறிதல்
- மூலம்: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- இடமாற்றம்: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API வழித்தடம்: `src/app/api/cache/reasoning/route.ts`
- அசல் சிக்கல்: #1628
