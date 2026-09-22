# Reasoning Replay Cache (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **အမှန်တရား၏ မူရင်းရင်းမြစ်:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **နောက်ဆုံးအပ်ဒိတ်:** 2026-06-28 — v3.8.40

OmniRoute သည် thinking-mode မော်ဒယ်များက ထုတ်ပေးသော assistant `reasoning_content` ကို ဖမ်းယူပြီး၊ upstream provider က လိုအပ်သည့်အခါ အကြိမ်များစွာ အပြန်အလှန်ပြောဆိုသော request များတွင် ပွင့်လင်းမြင်သာစွာ ပြန်လည်ထည့်သွင်းပေးသည်။ ဤနည်းဖြင့် client ၏ conversation history တွင် ယခင်အကြိမ်၏ reasoning မပါဝင်သည့်အခါ တင်းကျပ်သော provider များက ပြန်ပေးသည့် HTTP 400 error များကို ဖယ်ရှားပေးသည်။

## ဤစနစ် ရှိရသည့်အကြောင်းရင်း

thinking-mode provider အချို့သည် **ယခင် assistant message တွင် မူလ `reasoning_content` ပါဝင်ခြင်းမရှိပါက** နောက်ဆက်တွဲအကြိမ်ကို ငြင်းပယ်ကြသည်။ Upstream သည် အောက်ပါကဲ့သို့သော message များနှင့်အတူ 400 ကို ပြန်ပေးသည်-

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

သို့သော် ပုံမှန် client များ (Cursor, Cline, Roo Code, OpenAI SDK) သည် ၎င်းတို့ ပြန်လည်ပေးပို့သော history မှ `reasoning_content` ကို ဖယ်ရှားကြသည်။ OmniRoute သည် upstream မြင်ရသည့် request တစ်သမတ်တည်းဖြစ်စေရန် server-side cache မှ ၎င်းကို ပြန်လည်ထည့်သွင်းပေးသည်။ Issue #1628 တွင် process ပြန်လည်စတင်ပြီးနောက် cache ဆက်လက်တည်ရှိစေရန် ပေါင်းစပ် memory/SQLite persistence ကို စတင်ထည့်သွင်းခဲ့သည်။

## ဗိသုကာဖွဲ့စည်းပုံ

```
Turn N (assistant က ထုတ်ပေးသည်):
  → response တွင် reasoning_content + tool_calls ပါဝင်သည်
  → requiresReasoningReplay(provider, model) ဖြစ်ပါက: cacheReasoningFromAssistantMessage()
      tool_call.id တစ်ခုချင်းစီကို key အဖြစ် အသုံးပြုပြီး (memory + DB) သို့ ရေးသားသည်
  → response ကို client ထံ လွှဲပို့သည် (client က reasoning ကို ထိန်းသိမ်းထားနိုင်သလို မထားနိုင်လည်း ဖြစ်နိုင်သည်)

Turn N+1 (client က နောက်ဆက်တွဲကို ပေးပို့သည်):
  → translator က requiresReasoningReplay(provider, model) === true ဖြစ်ကြောင်း ရှာဖွေသိရှိသည်
  → tool_calls ပါရှိပြီး reasoning_content မရှိသော assistant message တစ်ခုချင်းစီအတွက်:
      lookupReasoning(toolCalls[0].id) → memory → DB
      တွေ့ရှိ → msg.reasoning_content = cached; recordReplay()
      မတွေ့ရှိ → msg.reasoning_content = "" (DeepSeek ဗားရှင်းအဟောင်းများအတွက် အရန်နည်းလမ်း)
  → upstream က တစ်သမတ်တည်းဖြစ်သော history ကို မြင်ရသည် → 400 မဖြစ်ပေါ်
```

ဖမ်းယူသိမ်းဆည်းမှုကို `open-sse/handlers/chatCore.ts` တွင် (`cacheReasoningFromAssistantMessage` ကို ခေါ်သည့် နေရာနှစ်ခု၌) လုပ်ဆောင်သည်။ ပြန်လည်ထည့်သွင်းမှုကို schema coercion ပြုလုပ်ပြီးနောက်၊ dispatch မလုပ်မီ `open-sse/translator/index.ts` တွင် လုပ်ဆောင်သည်။

သာမန် (tool-call မဟုတ်သော) assistant turn များအတွက် key သတ်မှတ်ပုံမှာ ကွဲပြားသည်။ `tools` ပါရှိလာသည်နှင့် ယခင် turn _တိုင်း_ ၏ reasoning ကို DeepSeek က လိုအပ်သောကြောင့် `buildAssistantMessageCacheKey()` သည် session scope နှင့် ထို turn အထိ normalize လုပ်ထားသော OpenAI-format transcript ကို ပေါင်းစပ်၍ digest လုပ်သည်။ Responses-API target များအတွက် (ဥပမာ `/responses` သို့ route လုပ်ထားသော `opencode-go/deepseek-v4-flash`) upstream body သည် `messages` မဟုတ်ဘဲ `input` ကို သယ်ဆောင်သောကြောင့် `translateRequest()` (`open-sse/translator/index.ts`) က ၎င်း digest လုပ်ခဲ့သော pivot transcript ကို callback option မှတစ်ဆင့် အစီရင်ခံပြီး capture site များကလည်း ထို transcript ကိုပင် digest လုပ်သည်။ Responses replay pass ကို source format အားလုံးအတွက် OpenAI pivot ပေါ်တွင် လုပ်ဆောင်သောကြောင့် Anthropic Messages client များ (Claude → OpenAI → Responses) ကိုလည်း ပြန်လည်ထည့်သွင်းပေးသည်။

## သိမ်းဆည်းမှု — ပေါင်းစပ် Memory + SQLite

Hot path သည် crash recovery နှင့် dashboard visibility အတွက် SQLite table တစ်ခုဖြင့် ပံ့ပိုးထားသော in-memory `Map` (ဖန်တီးချိန်အလိုက် LRU) ကို အသုံးပြုသည်။

| အလွှာ  | အကောင်အထည်ဖော်မှု                               | ရည်ရွယ်ချက်                                                            |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------- |
| Memory | `open-sse/services/reasoningCache.ts` ရှိ `Map` | မြန်ဆန်စွာ ရှာဖွေခြင်း၊ 200 ပြည့်ပါက အဟောင်းဆုံးကို ဖယ်ရှားခြင်း       |
| DB     | `reasoning_cache` table (`src/lib/db/`)         | ပြန်လည်စတင်ပြီးနောက် ဆက်လက်တည်ရှိခြင်း၊ စာရင်းအင်းများကို ပံ့ပိုးခြင်း |

ရေးသားမှုများကို နှစ်ခုစလုံးသို့ ပေးပို့သည်။ ဖတ်ရှုမှုများသည် memory ကို ဦးစွာစစ်ဆေးပြီးနောက် DB ကို fallback အဖြစ် အသုံးပြုသည် (DB တွင် တွေ့ရှိသည့် entry များကို memory ထဲသို့ ပြန်လည်မြှင့်တင်သည်)။ DB ချို့ယွင်းမှုများသည် ဆိုးရွားသောအမှားမဟုတ်ပါ — in-memory cache သည် hot path ကို ဆက်လက်ဝန်ဆောင်မှုပေးသည်။

**မူလသတ်မှတ်ချက်များ:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Memory entry အများဆုံး: `200` (`MAX_MEMORY_ENTRIES`)
- ဖယ်ရှားမှု: အဟောင်းဆုံး `createdAt` ကို ဦးစွာဖယ်ရှားသည်

## ဒေတာဘေ့စ် စခီမာ

မိုင်ဂရေးရှင်း: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

အညွှန်းများ: `expires_at`, `provider`, `model`, `created_at`။ `expires_at` ကို Unix epoch စက္ကန့်များအဖြစ် သိမ်းဆည်းထားသည်။ SELECT အလွှာသည် အမွေဆက်ခံထားသော စာသားတန်ဖိုးများကို `EXPIRES_AT_EPOCH_SQL` မှတစ်ဆင့် စံညှိပေးသည်။

## Provider / Model စစ်ဆေးသတ်မှတ်ခြင်း

`requiresReasoningReplay(provider, model)` က `true` ပြန်ပေးသည့်အခါ Replay ကို ဖွင့်ထားသည်။ ဤ function သည် `open-sse/services/reasoningCache.ts` ထဲရှိ စာရင်းနှစ်ခုကို စစ်ဆေးသည်။

**Provider ID များ (စာလုံးအကြီးအသေး မခွဲခြားဘဲ အတိအကျကိုက်ညီမှု):**

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

**Model regex pattern များ (စာလုံးအကြီးအသေး မခွဲခြား):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` နှင့် `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro၊ ထည့်ရန်မလိုသော `-free` suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

တင်းကျပ်သော provider/model အသစ်တစ်ခု ထည့်သွင်းရာတွင် ဤစာရင်းများထဲမှ တစ်ခုသို့ ဖြည့်စွက်ပြီး replay ထည့်သွင်းမှုကို အတည်ပြုသည့် unit test တစ်ခု ရေးသားရမည်။ PR ဖော်ပြချက်တွင် ဤပြောင်းလဲမှုကို ပြုလုပ်ရသည့် အကြောင်းရင်းဖြစ်သော upstream 400 စာသားအတိအကျကို ကိုးကားဖော်ပြသင့်သည်။

## REST API

Cache သည် `src/app/api/cache/reasoning/route.ts` အောက်တွင် endpoint နှစ်ခုကို ဖော်ထုတ်ပေးထားသည်။ နှစ်ခုစလုံးတွင် စီမံခန့်ခွဲမှု authentication (`@/shared/utils/apiAuth` မှ `isAuthenticated`) လိုအပ်သည်။

| Method | Endpoint                                                  | ဖော်ပြချက်                                                                        |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | ကိန်းဂဏန်းအချက်အလက်များ + စာမျက်နှာခွဲထားသော entry များ                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | စစ်ထုတ်ထားသော စာရင်း (`limit` ကို `[1, 200]` အတွင်း ကန့်သတ်ထားသည်)                |
| DELETE | `/api/cache/reasoning`                                    | အားလုံးကို ရှင်းလင်းပြီး (memory + DB) hit/miss အရေအတွက်များကို ပြန်လည်သတ်မှတ်သည် |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Provider တစ်ခုအတွက် entry များကိုသာ ရှင်းလင်းသည်                                  |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Entry တစ်ခုတည်းကို ဖျက်သည်                                                        |

**GET response ဖွဲ့စည်းပုံ:**

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

## လည်ပတ်မှုဆိုင်ရာ မှတ်ချက်များ

- **ရှင်းလင်းခြင်း:** `cleanupReasoningCache()` သည် သက်တမ်းကုန်ဆုံးသွားသော memory entry များကို ဖယ်ရှားပြီး `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` ကို လုပ်ဆောင်သည်။ Health-check worker များက ၎င်းကို အချိန်မှန် ခေါ်ယူလုပ်ဆောင်သည်။
- **ပျက်ကျမှုမှ ပြန်လည်ရယူခြင်း:** ပြန်လည်စတင်ပြီးနောက် memory သည် အလွတ်ဖြစ်နေသော်လည်း DB ထဲတွင် သက်တမ်းမကုန်သေးသော entry များ ရှိနေဆဲဖြစ်သည်။ သတ်မှတ်ထားသော `tool_call_id` အတွက် ပထမဆုံး ရှာဖွေမှုသည် DB hit ဖြစ်ပြီး နောက်ဆက်တွဲ ရှာဖွေမှုများသည် memory hit များ ဖြစ်သည်။
- **Reasoning မရှိလျှင် cache မရှိပါ:** Assistant message တွင် `reasoning_content` / `reasoning` field မရှိသည့်အခါ `cacheReasoningFromAssistantMessage` သည် `0` ပြန်ပေးသောကြောင့် thinking မပါသည့် response များအတွက် အပိုကုန်ကျမှု မရှိပါ။
- **ရေးသားခြင်းကိုလည်း ကန့်သတ်ထိန်းချုပ်ထားသည်:** `chatCore.ts` ထဲရှိ call site နှစ်ခုစလုံး (non-streaming နှင့် streaming) သည် `requiresReasoningReplay(provider, model)` က `true` ဖြစ်သည့်အခါမှသာ `cacheReasoningFromAssistantMessage()` ကို ခေါ်သည် — ၎င်းသည် ဖတ်ရှုသည့်ဘက်က စစ်ဆေးသော predicate နှင့် တူညီသည်။ Replay provider ကို လုံးဝအသုံးမပြုသော installation များသည် reasoning ပါဝင်သည့် response တိုင်းအတွက် ရေးသားမှု၊ index update နှင့် try/catch တို့၏ ကုန်ကျမှုကို မခံရတော့ပါ။
- **တင်းကျပ်မှုမရှိသော provider များ:** `requiresReasoningReplay` က `false` ဖြစ်ပြီး ပစ်မှတ် format က OpenAI ဖြစ်သည့်အခါ translator သည် အပြင်သို့ပို့မည့် message များမှ `reasoning_content` field မှန်သမျှကို **ဖယ်ရှားသည်** — OpenAI Chat Completions က ၎င်းကို လက်မခံပါ။

## ထပ်မံကြည့်ရှုရန်

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ဆားကစ်ဖြတ်တောက်ကိရိယာများ၊ ပြန်လည်ကြိုးစားမီ စောင့်ဆိုင်းချိန်များ၊ မော်ဒယ်အသုံးပြုခွင့် ပိတ်ပင်မှုများ
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — upstream 400 အမှားများကို ရှာဖွေစစ်ဆေးခြင်း
- မူရင်းကုဒ်: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- ရွှေ့ပြောင်းမှု: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API လမ်းကြောင်း: `src/app/api/cache/reasoning/route.ts`
- မူရင်းပြဿနာ: #1628
