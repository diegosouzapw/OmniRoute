# Resilience Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute တွင် သီးခြားဖြစ်သော်လည်း အပြန်အလှန်ဆက်နွှယ်နေသော ခံနိုင်ရည်ရှိရေး ယန္တရား သုံးမျိုးရှိသည်။ တစ်ခုစီတွင် မတူညီသော သက်ရောက်မှုနယ်ပယ်နှင့် ရည်ရွယ်ချက်ရှိသည်။ လမ်းကြောင်းသတ်မှတ်မှု အပြုအမူကို အမှားရှာဖွေစစ်ဆေးသည့်အခါ ၎င်းတို့ကို သီးခြားစီ ခွဲခြားထားပါ။

![အလွှာ ၃ ဆင့်ပါ ခံနိုင်ရည်ရှိရေး မော်ဒယ်](../diagrams/exported/resilience-3layers.svg)

> ရင်းမြစ်: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**သက်ရောက်မှုနယ်ပယ်:** provider တစ်ခုလုံး (ဥပမာ `glm`, `openai`, `anthropic`)။

**ရည်ရွယ်ချက်:** upstream/service အဆင့်တွင် ထပ်တလဲလဲ ပျက်ကွက်နေသော provider တစ်ခုထံ traffic ပေးပို့ခြင်းကို ရပ်တန့်ရန်။

**အကောင်အထည်ဖော်ထားပုံ:**

- အဓိက class: `src/shared/utils/circuitBreaker.ts`
- ချိတ်ဆက်ထားမှု: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- အခြေအနေ API: `GET /api/monitoring/health`
- ပြန်လည်သတ်မှတ်ရေး API: `POST /api/resilience/reset`
- Wrapper များ: `open-sse/services/accountFallback.ts`
- DB ဇယား: `domain_circuit_breakers`

**အခြေအနေများ:**

- `CLOSED` — ပုံမှန် traffic ကို ခွင့်ပြုထားသည်
- `DEGRADED` — traffic ကို ဆက်လက်ခွင့်ပြုထားသော်လည်း provider ပျက်ကွက်မှု မြင့်တက်လာခြင်းကို စောင့်ကြည့်မှတ်တမ်းတင်နေသည်
- `OPEN` — provider ကို ယာယီပိတ်ဆို့ထားသည်၊ combo routing က ၎င်းကို ကျော်သွားသည်
- `HALF_OPEN` — reset timeout ကုန်ဆုံးသွားပြီး စမ်းသပ်တောင်းဆိုမှုကို ခွင့်ပြုထားသည်

**ပြင်ဆင်သတ်မှတ်နိုင်သော မူလတန်ဖိုးများ (`open-sse/config/constants.ts`၊ Dashboard → ဆက်တင်များ → ခံနိုင်ရည်ရှိရေး တွင် ဖော်ပြထားသည်):**

| Class   | အဆင့်ကျသည့်အမှတ်    | ဖွင့်သည့်အမှတ်       | Reset timeout |
| ------- | ------------------- | -------------------- | ------------- |
| OAuth   | ပျက်ကွက်မှု 5 ကြိမ် | ပျက်ကွက်မှု 8 ကြိမ်  | 60s           |
| API-key | ပျက်ကွက်မှု 7 ကြိမ် | ပျက်ကွက်မှု 12 ကြိမ် | 30s           |
| Local   | တွက်ချက်ရရှိသည်     | ပျက်ကွက်မှု 2 ကြိမ်  | 15s           |

`degradationThreshold` သည် provider တစ်ခု `DEGRADED` အခြေအနေသို့ ဝင်ရောက်မည့်အချိန်ကို ထိန်းချုပ်ပြီး၊ `failureThreshold` သည် ၎င်းကို ဖွင့်ကာ ကျော်သွားမည့်အချိန်ကို ထိန်းချုပ်သည်။ Local provider profile များကို ခံနိုင်ရည်ရှိရေး ဆက်တင်စာမျက်နှာတွင် မဖော်ပြရသေးပါ။

**ဖြတ်တောက်စေသည့် code များ:** provider အဆင့် status များဖြစ်သော `[408, 500, 502, 503, 504]` အတွက်သာ ဖြစ်သည်။ account အဆင့် error များ (401/403/429 အများစု — ၎င်းတို့သည် cooldown သို့မဟုတ် lockout နှင့် သက်ဆိုင်သည်) အတွက် ဖြတ်တောက်မှု **မပြုလုပ်ပါနှင့်**။

**လိုအပ်ချိန်မှ ပြန်လည်ရယူခြင်း:** `OPEN` သက်တမ်းကုန်သွားသောအခါ `getStatus()`, `canExecute()`, `getRetryAfterMs()` တို့သည် အခြေအနေကို `HALF_OPEN` သို့ ပြန်လည်မွမ်းမံသည်။ နောက်ခံ timer မလိုအပ်ပါ။

---

### ရွေးချယ်ဖွင့်နိုင်သော ကမ္ဘာလုံးဆိုင်ရာ Provider Cooldown (window gate)

စတုတ္ထမြောက် **ရွေးချယ်ဖွင့်နိုင်သည့်** အလွှာ (`PROVIDER_COOLDOWN_ENABLED`၊ မူလအားဖြင့် **ပိတ်ထားသည်**) သည်
ပျက်ကွက်နေသော provider များ၏ request များအကြား မျှဝေသုံးစွဲနိုင်သည့် မှတ်ဉာဏ်ကို
`open-sse/services/providerCooldownTracker.ts` တွင် ထိန်းသိမ်းထားပြီး combo target
ဖြေရှင်းသတ်မှတ်မှုက ၎င်းကို အသုံးပြုသည်။ ထို့ကြောင့် ဆက်တိုက်ဝင်လာသော combo request များသည် မကြာသေးမီက
ပျက်ကွက်ခဲ့သော provider တစ်ခုကို ထပ်မံဖြတ်သန်းစမ်းသပ်ခြင်းမှ ရပ်တန့်သွားသည်။ Provider အဆင့် entry များသည် `PROVIDER_PROFILES` window gate ကို လိုက်နာသည်-

| Profile | (`providerFailureThreshold`) ပြည့်ပြီးနောက် စတင်သည် | (`providerFailureWindowMs`) အတွင်း | (`providerCooldownMs`) ကြာ အေးသွားစေသည် |
| ------- | --------------------------------------------------: | ---------------------------------: | --------------------------------------: |
| OAuth   |                                                `10` |                            `15min` |                                  `5min` |
| API key |                                                `15` |                            `30min` |                                 `10min` |

သတ်မှတ်ချက်အောက်တွင် provider ကို cooling ဖြစ်နေသည်ဟု **မသတ်မှတ်ပါ**၊ အောင်မြင်မှုတစ်ခုက
window ကို ရှင်းလင်းပေးသည်။ Connection အဆင့် entry များ (`provider:connectionId`) သည်
exponential `minRetryCooldownMs → maxRetryCooldownMs` backoff ကို ဆက်လက်အသုံးပြုသည်။ အစားထိုးသတ်မှတ်ချက်များ-
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`။
Regression ကာကွယ်မှု- `tests/unit/provider-cooldown-window-gate.test.ts`။

## 2. ချိတ်ဆက်မှု ခေတ္တရပ်နားချိန်

**သက်ရောက်မှုနယ်ပယ်:** provider ချိတ်ဆက်မှု/account/key တစ်ခုတည်း။

**ရည်ရွယ်ချက်:** provider တစ်ခုတည်းအတွက် အခြားချိတ်ဆက်မှုများက ဆက်လက်ဝန်ဆောင်မှုပေးနေစဉ် ပြဿနာရှိသော key တစ်ခုကို ကျော်သွားရန်။

**အကောင်အထည်ဖော်မှု:**

- မရရှိနိုင်ဟု သတ်မှတ်ခြင်း: `src/sse/services/auth.ts::markAccountUnavailable()`
- ရွေးချယ်မှု: ဖိုင်တစ်ခုတည်းရှိ `getProviderCredentials*`
- ခေတ္တရပ်နားချိန် တွက်ချက်မှု: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ဆက်တင်များ: `src/lib/resilience/settings.ts`

**ချိတ်ဆက်မှုတစ်ခုစီအလိုက် field များ:**

- `rateLimitedUntil` — ခေတ္တရပ်နားချိန် ကုန်ဆုံးမည့်အချိန်အထိ timestamp
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponential backoff counter

**မူလသတ်မှတ် ခေတ္တရပ်နားချိန်များ:**

- OAuth အခြေခံ: 5s
- API-key အခြေခံ: 3s
- API-key 429: upstream `Retry-After`/reset header များ/ခွဲခြမ်းဖတ်ရှုနိုင်သော reset စာသားကို ဦးစားပေးသည်
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**တစ်ပြိုင်နက်တည်း အလုံးအရင်းဖြင့် တောင်းဆိုမှုကို တားဆီးသည့် အကာအကွယ်:** တစ်ပြိုင်နက်ဖြစ်ပေါ်သော ချို့ယွင်းမှုများကြောင့် ခေတ္တရပ်နားချိန်ကို အလွန်အကျွံတိုးချဲ့ခြင်း သို့မဟုတ် `backoffLevel` ကို နှစ်ကြိမ်တိုးခြင်းမှ ကာကွယ်ပေးသည်။

**အပြီးသတ်အခြေအနေများ (ခေတ္တရပ်နားချိန်များ မဟုတ်ပါ):**

- `banned` — ပိတ်ပင်ထားသော keyword / account-ban ရှာဖွေစစ်ဆေးမှု (ကြည့်ရန် [BAN_DETECTION](../security/BAN_DETECTION.md)) နှင့် ဆက်တိုက် upstream per-request ငြင်းပယ်မှု သုံးကြိမ် (`request_rejected`၊ ဥပမာ Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) ကြောင့် သတ်မှတ်သည်။ တစ်ကြိမ်သာ ငြင်းပယ်မှုသည် ချိတ်ဆက်မှုကို ခေတ္တရပ်နားစေခြင်းသာ ဖြစ်သည်
- `expired` (အကန့်အသတ်ရှိသော ပြန်လည်ကြိုးစားမှုများပြီးနောက် အပြီးသတ်အခြေအနေသို့ ပြောင်းသည် — exponential backoff ဖြင့် `EXPIRED_RETRY_MAX = 3` — ထို့ကြောင့် ယာယီ OAuth error များသည် account ကို အမြဲတမ်းပိတ်ထားခြင်းမပြုမီ အလိုအလျောက် ပြန်လည်ကောင်းမွန်နိုင်သည်)
- `credits_exhausted`

credentials များ ပြောင်းလဲသည်အထိ သို့မဟုတ် operator တစ်ဦးက ၎င်းတို့ကို reset လုပ်သည်အထိ ဤအခြေအနေများ ဆက်လက်တည်ရှိသည်။ အပြီးသတ်အခြေအနေများကို ယာယီ ခေတ္တရပ်နားမှုအခြေအနေဖြင့် မရေးထပ်ပါနှင့်။

**လိုအပ်မှ ပြန်လည်ရယူခြင်း:** `rateLimitedUntil` ကျော်လွန်သွားသည့်အခါ ချိတ်ဆက်မှုသည် ထပ်မံရွေးချယ်အသုံးပြုနိုင်လာသည်။ အောင်မြင်စွာ အသုံးပြုပြီးသည့်အခါ `clearAccountError()` က error field အားလုံးကို ရှင်းလင်းသည်။

### Session affinity (#7274)

**သက်ရောက်မှုနယ်ပယ်:** **မည်သည့်** provider အတွက်မဆို ချိတ်ဆက်မှုတစ်ခုနှင့် pin လုပ်ထားသော client session တစ်ခု (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)။

**ရည်ရွယ်ချက်:** request များတစ်လျှောက် multi-turn agent (Claude Code, aider, custom agent များ) ကို account တစ်ခုတည်းတွင် ထိန်းထားခြင်းဖြင့် account များအကြား context ဆုံးရှုံးမှုနှင့် per-account session state ရှိသော provider များတွင် ထပ်တလဲလဲ cold-start 429 ဖြစ်ပေါ်မှုတို့ကို လျှော့ချရန်။

**အကောင်အထည်ဖော်မှု:**

- TTL ဆုံးဖြတ်မှု: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin ရွေးချယ်မှု/ဖန်တီးမှု: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header ထုတ်ယူမှု (ယေဘုယျဖြစ်ပြီး မည်သည့် provider မဆို): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- အမြဲတမ်းသိမ်းဆည်းထားသော pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ဆက်တင်: `sessionAffinityTtlMs` (ms ဖြင့် global TTL၊ `0` သည် ပိတ်သည်) — `src/lib/db/settings.ts`။ ယခင် configure လုပ်ထားသည့် Codex TTL ကို မူလတန်ဖိုးအသစ်အဖြစ် ဆက်လက်သယ်ဆောင်သည့် migration `124_generic_session_affinity_ttl.sql` ဖြင့် Codex အတွက်သာဖြစ်သော `codexSessionAffinityTtlMs` မှ အမည်ပြောင်းထားသည်။

#7274 မတိုင်မီ `resolveSessionAffinityTtlMs()` သည် `codex` မှလွဲ၍ provider အားလုံးအတွက် `0` သို့ ချက်ချင်းရပ်တန့်ပြန်ပို့ခဲ့သောကြောင့် pinning mechanism နှင့် header ထုတ်ယူမှုတို့က provider အပေါ် မမှီခိုဘဲ ရှိနှင့်ပြီးဖြစ်သော်လည်း TTL ဆက်တင် (နှင့် session header များ) သည် အခြားမည်သည့်နေရာတွင်မျှ သက်ရောက်မှုမရှိခဲ့ပါ။ ပြင်ဆင်မှုက အဆိုပါ early-return ကို ဖယ်ရှားခဲ့သည်။ ယခုအခါ TTL ကို globally `0` အထက် သတ်မှတ်ပြီးသည်နှင့် provider အားလုံးတွင် တစ်ပြေးညီ သက်ရောက်သည်။

session-affinity header သုံးခုကို upstream သို့ မည်သည့်အခါမျှ forward မလုပ်ပါ — executor များသည် client header များကို တိုက်ရိုက်ဖြတ်သန်းပေးမည့်အစား ၎င်းတို့၏ကိုယ်ပိုင် upstream header များကို အစမှ ပြန်လည်တည်ဆောက်သောကြောင့် ၎င်းသည် internal correlation id အဖြစ်သာ ရှိနေသည်။

### သီးသန့် managed session ချိတ်ဆက်မှု lease များ

**သက်ရောက်မှုနယ်ပယ်:** လက်ရှိအသုံးပြုနေသော managed HTTP client/session တစ်ခုက အရည်အချင်းပြည့်မီသော OmniRoute ချိတ်ဆက်မှုတစ်ခုကို ပိုင်ဆိုင်သည်။

**ရည်ရွယ်ချက်:** request များတစ်လျှောက် တင်းကျပ်သော routing
အတားအဆီး လိုအပ်သည့် client များအတွက် ကြာရှည်တည်တံ့သော သီးသန့်ချိတ်ဆက်မှုပိုင်ဆိုင်ခွင့်ကို ပေးရန်။ ၎င်းသည် soft continuity preference ဖြစ်သည့် session affinity နှင့် ကွာခြားသည်-
သီးသန့် lease တစ်ခုသည် lifecycle state ကို SQLite တွင် အမြဲတမ်းသိမ်းဆည်းထားပြီး global active-owner နှင့်
active-connection တစ်ခုတည်းသာရှိမှုကို အတည်ပြုစေကာ provider dispatch မတိုင်မီ stale generation ကို ငြင်းပယ်သည်။

ဤလုပ်ဆောင်ချက်ကို API key တစ်ခုစီအလိုက် ရွေးချယ်ဖွင့်ရသည်။ managed key တစ်ခုတွင် `lease:exclusive` scope နှင့်
အလွတ်မဟုတ်သော `allowedConnections` စာရင်းကို တိတိကျကျ သတ်မှတ်ထားရမည်။ မည်သည့် HTTP client မဆို lifecycle endpoint ကို အသုံးပြုနိုင်သည်။
client name၊ user-agent၊ provider၊ OAuth method သို့မဟုတ် model မလိုအပ်ပါ။ lease သည် model ကိုမဟုတ်ဘဲ ချိတ်ဆက်မှုတစ်ခုကို ပိုင်ဆိုင်သောကြောင့် ချိတ်ဆက်မှုသည် ပုံမှန်အတိုင်း
အရည်အချင်းပြည့်မီနေသရွေ့ model ပြောင်းလဲမှုသည် ချိတ်ဆက်ထားမှုကို ဆက်လက်ထိန်းသိမ်းထားသည်။ ပုံမှန် model၊ quota၊ health၊ cooldown နှင့် allowlist စည်းမျဉ်းများသည် ဆက်လက်အာဏာသက်ရောက်ပြီး
တူညီသော generation ကို အခြားလွတ်နေသည့် အရည်အချင်းပြည့်မီသော ချိတ်ဆက်မှုသို့ ပြောင်းနိုင်သည်။

lifecycle သည် JSON action များဖြစ်သော `acquire`၊ `renew` နှင့် `release` တို့ပါဝင်သည့် `POST /api/v1/session-leases` ဖြစ်သည်။
managed inference request များသည် မထင်ရှားသော `X-OmniRoute-Lease-Owner` တန်ဖိုးနှင့် အတိအကျဖြစ်သော
`X-OmniRoute-Lease-Generation` ကို ပေးပို့သည်။ owner သည် `vlo_` နောက်တွင် base64url character 43 လုံးကို ထည့်သုံးသည်။
၎င်း၏ SHA-256 hash ကိုသာ သိမ်းဆည်းသည်။ နောက်ဆုံး dispatch fence တစ်ခုစီသည် authenticated API key ID နှင့်
active connection ID ကိုလည်း ချိတ်ဆက်ထားသည်။ Lease control header များကို log များ၊ သိမ်းဆည်းထားသော request snapshot များနှင့်
upstream executor header များမှ ဖယ်ရှားထားသည်။

သာမန် routing တွင် အရည်အချင်းပြည့်မီသော managed candidate များရှိသော်လည်း လွတ်နေသည့် candidate အားလုံးကို
အခြားသူပိုင် active lease များက အသုံးပြုထားလျှင် OmniRoute သည် HTTP `429`၊ lease-capacity-unavailable code၊
စွမ်းရည်လွတ်လာရန် စောင့်ဆိုင်းနေသော state နှင့် သက်ဆိုင်ရာ အစောဆုံးသက်တမ်းကုန်ဆုံးချိန်မှ ဆင်းသက်လာသည့် အကန့်အသတ်ရှိသော `Retry-After` ကို ပြန်ပေးသည်။
သာမန်အရည်အချင်းပြည့်မီမှု ဗလာဖြစ်ခြင်းသည် lease contention မဟုတ်ဘဲ လက်ရှိ routing error အဓိပ္ပာယ်သတ်မှတ်ချက်များကို ဆက်လက်ထားရှိသည်။

ဆက်စပ် mechanism များသည် သီးခြားစီ ဆက်လက်ရှိနေသည်-

- OAuth session occupancy သည် OAuth account များအတွက် process-local soft distribution ဖြစ်သည်။
- Account semaphore များသည် request-concurrency permit များကို ပေးပြီး request တစ်ခုပြီးဆုံးသည့်အခါ အဆုံးသတ်သည်။
- သီးသန့် managed session lease များသည် generation fence ပါဝင်သော ကြာရှည်တည်တံ့သည့် lifecycle ပိုင်ဆိုင်မှုဖြစ်သည်။

---

## 3. မော်ဒယ် လော့ခ်ချခြင်း

**သက်ရောက်မှုနယ်ပယ်:** provider + connection + model သုံးခုတွဲ။

**အခြေအနေအလိုက် key သက်ရောက်မှုနယ်ပယ်:** လော့ခ်ချမှုကို မည်သည့် key တွင် ရေးမည်ကို ပျက်ကွက်နေသည့် status က ဆုံးဖြတ်သည် (`open-sse/services/accountFallback/exactModelLock.ts` ရှိ `resolveLockoutScope()`):

- `429` / `403` / `402` — quota သို့မဟုတ် အသုံးပြုခွင့်ဆိုင်ရာ အချက်ပြမှု — **quota family** ကို လော့ခ်ချသည်။ codex အတွက် connection ၏ `gpt-5*` model အားလုံးပါဝင်သည့် `codex` / `spark` scope တစ်ခုလုံး၊ အခြား provider များအတွက် `getQuotaScopedModelForProvider()`။
- `404` သည် မူလ model ကို လော့ခ်ချသည် (`getModelLockKey()` က `not_found` ကို နယ်ပယ်ကျဉ်းစေသည်)။
- အခြား status အားလုံး — `5xx` transport/server ပျက်ကွက်မှုများနှင့် quality validation မှ OmniRoute ကိုယ်တိုင် ဖန်တီးသည့် `502` — သည် **အတိအကျဖြစ်သော** provider/connection/model သုံးခုတွဲကိုသာ လော့ခ်ချသည်။ model တစ်ခုရှိ မကောင်းသော stream သည် account ၏ quota နှင့်ပတ်သက်သည့် အထောက်အထား မဟုတ်ပါ။ ဤစည်းမျဉ်း မရှိမီက `codex/gpt-5.6-luna` ရှိ အလွတ် response တစ်ခုကြောင့် quota ကို မထိခိုက်သော်လည်း ထို connection ၏ `gpt-5*` model အားလုံးကို routing မှ 2–30 min အထိ (အဆင့်ဆင့်တိုး၍) ဖယ်ရှားခဲ့သည်။
- ခေါ်ယူသူက `scope` option ကို အတိအလင်း သတ်မှတ်ထားပါက ၎င်းကို အမြဲ ဦးစားပေးသည် (Antigravity က `"exact"` ကို ပေးပို့သည်)။

**ရည်ရွယ်ချက်:** model တစ်ခုသာ မရနိုင်သည့်အခါ သို့မဟုတ် quota ကန့်သတ်ခံရသည့်အခါ connection တစ်ခုလုံးကို ပိတ်မိခြင်းမှ ရှောင်ရှားရန်။

**ဥပမာများ:**

- 429 ပြန်ပေးသည့် model တစ်ခုချင်းစီအလိုက် quota သတ်မှတ်ထားသော provider များ
- ပျောက်ဆုံးနေသည့် model တစ်ခုအတွက် 404 ပြန်ပေးသည့် local provider များ
- Provider အလိုက် mode/model အသုံးပြုခွင့် ပျက်ကွက်မှုများ (ဥပမာ၊ Grok mode များ)

**အကောင်အထည်ဖော်ထားမှု:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`။

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

လက်ရှိ အသက်ဝင်နေသော lockout များကို provider, connection, model, reason, expiresAt တို့နှင့်အတူ စာရင်းပြုစုဖော်ပြသည်။ Operator များသည် card မှ model တစ်ခုကို ကိုယ်တိုင် ပြန်လည်ဖွင့်နိုင်သည်။

**REST API:**

- `GET /api/resilience/model-cooldowns` — လက်ရှိ အသက်ဝင်နေသော lockout များကို စာရင်းပြုစုရန်
- `DELETE /api/resilience/model-cooldowns` — ကိုယ်တိုင် ပြန်လည်ဖွင့်ရန်။ Body: `{provider, connection, model}`။ Auth: management။

### Lockout ဆက်တင် UI + အောင်မြင်မှုအလိုက် တဖြည်းဖြည်းပြန်လည်ရယူခြင်း (v3.8.23)

Model lockout ကို အမြဲဖွင့်ထားသည့် hardcoded လုပ်ဆောင်ပုံမှ ကိုယ်ပိုင် settings card နှင့် မိမိဘာသာ ပြန်လည်ကောင်းမွန်နိုင်သည့် recovery လမ်းကြောင်းပါဝင်သော၊ အပြည့်အဝ ပြင်ဆင်သတ်မှတ်နိုင်ပြီး ရွေးချယ်ဖွင့်ရသည့် feature အဖြစ် ပြောင်းလဲခဲ့သည်။

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)။
၎င်းသည် အထက်ပါ ဖတ်ရှုရန်သာဖြစ်သော `ModelCooldownsCard` (လက်ရှိ အသက်ဝင်နေသော lockout များကိုသာ _စာရင်းပြုစုဖော်ပြသည်_) နှင့် **သီးခြားဖြစ်သည်** — card အသစ်က _parameter များကို ပြင်ဆင်သတ်မှတ်ပေးသည်_။ Default တန်ဖိုးများသည် `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) တွင် ရှိသည်-

| ဆက်တင်                  | Default                          | အဓိပ္ပာယ်                                                                                  |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | အဓိက toggle — model lockout ကို **default အနေဖြင့် ပိတ်ထားသည်**။                           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model နယ်ပယ်အလိုက် ပျက်ကွက်မှုအဖြစ် ရေတွက်သော upstream status များ။                        |
| `baseCooldownMs`        | `120_000` (120 s)                | ပထမဆုံး ပျက်ကွက်မှုအတွက် ကနဦး lockout ကြာချိန်။                                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | အဆင့်ဆင့်တိုးသည့် cooldown ၏ အများဆုံး ကန့်သတ်ချက်။                                        |
| `maxBackoffSteps`       | `10`                             | Exponential-backoff အဆင့်တိုးမှု၏ အများဆုံး အဆင့်အရေအတွက်။                                 |
| `useExponentialBackoff` | `true`                           | ထပ်တလဲလဲ ပျက်ကွက်မှုများကြောင့် cooldown ကို exponential ပုံစံဖြင့် တိုးစေမည်၊ မတိုးစေမည်။ |

ဆက်တင်များကို ပုံမှန် settings store မှတစ်ဆင့် သိမ်းဆည်းထားပြီး resilience settings schema ဖြင့် အတည်ပြုစစ်ဆေးသည်။ Card သည် `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` ဖြစ်စေ၍) နှင့် `maxBackoffSteps` ကို ခွင့်ပြုထားသော အတိုင်းအတာအတွင်း ကန့်သတ်ပေးသည်။

**အောင်မြင်မှုအလိုက် တဖြည်းဖြည်းပြန်လည်ရယူခြင်း:** recovery သည် timer သက်တမ်းကုန်ဆုံးမှုတစ်ခုတည်းအပေါ် **မမူတည်ပါ**။ အောင်မြင်ကောင်းမွန်သော response တစ်ခုသည် model ၏ failure count ကို တဖြည်းဖြည်း ပြန်လျှော့ပေးသောကြောင့် အချိန်ကာလအလယ်တွင် ပြန်လည်ကောင်းမွန်လာသည့် model သည် timer မကုန်ဆုံးမီ အဆင့်တိုးခြင်းကို ရပ်တန့်ပြီး lockout ကို ရှင်းလင်းနိုင်သည်။ အောင်မြင်သော combo target တစ်ခုတွင် `open-sse/services/combo.ts` သည် `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ကို ခေါ်ပြီး သိမ်းဆည်းထားသော `failureCount` ကို **တစ်ဝက်လျှော့သည်** (`Math.floor(failureCount / 2)`)။ ၎င်းသည် `0` သို့ ရောက်သည့်အခါ lockout entry ကို လုံးဝဖျက်ပစ်သည်။ အပြန်အလှန်အားဖြင့် `recordModelLockoutFailure()` သည် escalation window အတွင်း ပျက်ကွက်မှုများ ဖြစ်ပေါ်ပါက count ကို တိုးပြီး cooldown ကို အဆင့်မြှင့်သည်။ ဤ success-decay သည် ပုံမှန် timer သက်တမ်းကုန်ဆုံးမှုအပြင် ထပ်ဆောင်း recovery နည်းလမ်းဖြစ်သည် — မည်သည့်လမ်းကြောင်းမဆို model တစ်ခုကို ပြန်လည်ဖွင့်နိုင်သည်။

**State:** lockout များကို **memory အတွင်း၌သာ** ထိန်းသိမ်းထားသည် (`provider:connectionId:model` ဖြင့် key သတ်မှတ်ထားသော process တစ်ခုချင်းစီ၏ `ModelLockoutEntry` `Map` များ၊ `provider:connectionId:exact:model` ဖြင့် exact-scope lock များ)။ DB တွင် သိမ်းဆည်းထားခြင်း မရှိသဖြင့် restart လုပ်ပါက ပျောက်ဆုံးသွားမည်။ _Settings_ များကို သိမ်းဆည်းထားသော်လည်း လက်ရှိ အသက်ဝင်နေသော lockout _state_ သည် ယာယီသာဖြစ်သည်။

---

## 4. Quota-Share တစ်ပြိုင်နက်လုပ်ဆောင်မှု ထိန်းချုပ်ခြင်း (v3.8.36)

Subscription အကောင့်များ (GLM၊ MiniMax စသည်) သည် ပုံမှန်အားဖြင့် တစ်ချိန်တည်းတွင် request ~1–3 ခုကိုသာ လက်ခံနိုင်ပြီး ယင်းပမာဏကို ကျော်လွန်ပါက 429 များနှင့် cooldown များ ဖြစ်ပေါ်လာသည်။ API key အများအပြားက upstream အကောင့်တစ်ခုတည်းကို မျှဝေအသုံးပြုသည့် **quota-share** (`qtSd/…`) combo များတွင် ဤပြဿနာသည် အထူးပြင်းထန်သည်။ မျှဝေထားသော အကောင့်ထံ request များ အလွန်အကျွံဝင်ရောက်ခြင်းကို အလွှာသုံးဆင့်ဖြင့် တားဆီးပေးသည်။

### Connection တစ်ခုချင်းစီအလိုက် တစ်ပြိုင်နက်လုပ်ဆောင်မှု ကန့်သတ်ချက် (`max_concurrent`)

Provider connection တစ်ခုချင်းစီတွင် `max_concurrent` အမြင့်ဆုံးကန့်သတ်ချက်ကို သတ်မှတ်နိုင်သည်
(`provider_connections.max_concurrent`၊ connection modal / API / DB တွင် သတ်မှတ်နိုင်သည်)။
အကန့်အသတ်မထားလိုပါက ဗလာထားပါ။ ဤတန်ဖိုးတစ်ခုတည်းက အောက်ဖော်ပြပါ serialization
အလွှာကို ထိန်းချုပ်သည် — အကောင့်၏ လက်တွေ့တစ်ပြိုင်နက်လုပ်ဆောင်နိုင်မှုအတိုင်း သတ်မှတ်ပါ (ဥပမာ GLM ~1၊ MiniMax ~2)။

### Quota-share request များကို အစဉ်လိုက်လုပ်ဆောင်ခြင်း

Quota-share dispatch တစ်ခုက အပေါင်းတန်ဖိုးရှိသော
`max_concurrent` ကို သတ်မှတ်ထားသည့် connection တစ်ခုကို ပစ်မှတ်ထားသည့်အခါ ထို **အကောင့်** သို့ တစ်ပြိုင်နက်ဝင်လာသော request များကို
connection တစ်ခုချင်းစီအလိုက် semaphore (key `qsconn:<connectionId>`) မှတစ်ဆင့် အစဉ်လိုက်လုပ်ဆောင်သည်။ ပိုလျှံသော request များသည် အကောင့်ထံ အလုံးအရင်းဖြင့် ပို့မည့်အစား **queue ထဲတွင် စောင့်ဆိုင်းသည်**။ ၎င်းသည် **fail-open** ဖြစ်သည် — queue ပြည့်နေခြင်း သို့မဟုတ် timeout ဖြစ်ခြင်းတို့တွင် dispatch လုပ်နိုင်သော request ကို မည်သည့်အခါမျှ ပယ်ချမည့်အစား slot မရဘဲ ဆက်လက်လုပ်ဆောင်သည်။
**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`၊ ပုံသေအားဖြင့်
ဖွင့်ထားသည်) တွင် အဖွင့်အပိတ်လုပ်နိုင်သည်။ `max_concurrent` ကန့်သတ်ချက်မရှိပါက အပြုအမူမှာ မပြောင်းလဲပါ။

> Quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) ကိုယ်တိုင်ကလည်း
> fail-open ဖြစ်ပြီး ကန့်သတ်ချက်ပြည့်နေသော connection ကို _ဦးစားပေးမှုလျှော့ချခြင်း_ သာ ပြုလုပ်သည် — connection တစ်ခုတည်းရှိသော
> pool တွင် တင်းကျပ်စွာ ကန့်သတ်နိုင်ခြင်းမရှိသောကြောင့် ဤ semaphore ကသာ
> request များ အလုံးအရင်းဝင်လာမှုကို အမှန်တကယ် ထိန်းချုပ်ပေးသည်။

### Combo cooldown ကို ထည့်သွင်းစဉ်းစားသော retry

Combo strategy တိုင်းအတွက် (ဖွင့်ထားသည့်အခါ) ခဏတာမျှသာဖြစ်သော SHORT transient cooldown ကြောင့် 429 အဖြစ် အတည်ဖြစ်သွားမည့် request သည်
429 ကို ပြန်ပေးမည့်အစား cooldown ပြီးဆုံးသည်အထိ စောင့်ပြီး ပြန်လည် dispatch လုပ်သည် — ဤလုပ်ဆောင်ချက်သည် model မျိုးစုံပါဝင်သော combo များတွင် Gemini အမျိုးအစား TPM/RPM window များ (~60s retry-after) ကို လွှမ်းခြုံပေးသည်။ ဥပမာ 2-model combo ၏ target နှစ်ခုလုံးက model တစ်ခုချင်းစီအလိုက် rate limit ကို ထိမိခြင်းဖြစ်သည်။
**Settings → Resilience** ရှိ `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) ဖြင့် ကန့်သတ်ထားသည်။ `quota_exhausted`
(သန်းခေါင်တိုင်အောင် lock ဖြစ်နေခြင်း) သို့မဟုတ် auth/not-found အကြောင်းပြချက်များအတွက် မည်သည့်အခါမျှ မစောင့်ပါ။

---

## 5. Request Queue ဝင်ခွင့် ထိန်းချုပ်ခြင်း (v3.8.49 · issue #6593)

**သက်ရောက်မှုနယ်ပယ်**: အထက်ပါ ယန္တရားသုံးခု၏ အောက်တစ်လွှာတွင်ရှိသော local provider+connection တစ်ခုချင်းစီအလိုက် rate-limit queue (`open-sse/services/rateLimitManager.ts`,
Bottleneck ကို အခြေခံအသုံးပြုထားသည်)။

**`maxWaitMs` သည် execution expiration အတွက် အစဉ်အလာအရ သိမ်းဆည်းထားသော အမည်ဖြစ်သည်။**
`resilienceSettings.requestQueue.maxWaitMs` ကို job
`expiration` အဖြစ် Bottleneck သို့ ပေးပို့ပြီး ယင်း၏ timer သည် dispatch လုပ်ပြီးမှသာ စတင်သည်။ ထို့ကြောင့် ၎င်းသည် local queue ထဲတွင် ကုန်ဆုံးသည့်အချိန်ကို မကန့်သတ်ဘဲ
limiter က စီမံသော execution ကိုသာ ကန့်သတ်သည်။ Expiration ကို ယုံကြည်ရသော local `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) အဖြစ် ဖော်ပြသည်။
ယခင် queue-timeout code အမည်ကို ယုံကြည်ရသော internal backward compatibility အတွက်သာ လက်ခံသည်။ ပုံသေတန်ဖိုးမှာ 15000ms ဖြစ်ပြီး
`RATE_LIMIT_MAX_WAIT_MS` (env) သို့မဟုတ် dashboard (**Settings → Resilience**၊
UI အမြင့်ဆုံးကန့်သတ်ချက် 1–30000ms) မှတစ်ဆင့် ပြောင်းလဲသတ်မှတ်နိုင်သည်။ Queue ထဲတွင် နေထိုင်ချိန်အတွက် အချိန်သတ်မှတ်ချက်မရှိပါ။ Queue ထဲတွင် စောင့်ဆိုင်းနေသော caller များကို ကန့်သတ်ရန် အောက်ပါ
`maxQueueDepth` ကို အသုံးပြုပါ။

**`maxQueueDepth` — ရွေးချယ်ဖွင့်နိုင်သော ဝင်ခွင့်ကန့်သတ်ချက် (အသစ်)။** `resilienceSettings.requestQueue.maxQueueDepth`
သည် provider+connection တစ်ခုအတွက် တစ်ချိန်တည်းတွင် queue ထဲ၌ ထိုင်စောင့်နိုင်သော (dispatch မလုပ်ရသေးသော) request အရေအတွက်ကို ကန့်သတ်သည်။
Queue ထဲတွင် `maxQueueDepth`
request အရေအတွက် ရှိပြီးသားဖြစ်ပါက request အသစ်ကို `limiter.schedule()` သို့ မရောက်မီ **ကြိုတင်၍** type သတ်မှတ်ထားသော
`code: "RATE_LIMIT_QUEUE_FULL"` error ဖြင့် ချက်ချင်းပယ်ချသည်
— ထို့ကြောင့် ပယ်ချခြင်းသည် ကုန်ကျစရိတ်နည်းပြီး ထို request အတွက် downstream
prompt-compression / translation လုပ်ငန်းများ မပြုလုပ်မီ ဖြစ်ပေါ်သည်။ ပုံသေ `0` =
ပိတ်ထားခြင်းဖြစ်ပြီး ရှိပြီးသား ကန့်သတ်ချက်မဲ့ queue အပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်။ သတ်မှတ်နိုင်သော အပိုင်းအခြားမှာ 0–100000 ဖြစ်သည်။
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) သို့မဟုတ်
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) မှတစ်ဆင့် ပြောင်းလဲသတ်မှတ်နိုင်သည်။

ဝင်ခွင့်စစ်ဆေးမှုကိုယ်တိုင်သည် pure function တစ်ခု
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ဖြစ်သောကြောင့်
Bottleneck limiter အစစ်မရှိဘဲ unit test ပြုလုပ်နိုင်သည်။

> #6593 ကို စတင်ဖွင့်လှစ်ခဲ့သော RFC တွင် `bypassCompressionOnRateLimit`
> flag တစ်ခုကိုလည်း အဆိုပြုထားသည်။ ဤ repo ၏ `open-sse/services/compression/` pipeline သည်
> outbound LLM request ပေါ်ရှိ prompt/context compression (`chatCore.ts`၊
> `resolveCompressionSettings`/`selectCompressionStrategy` block ဝန်းကျင်) ဖြစ်ပြီး
> ဖန်တီးထားသော 429 body များအပေါ် HTTP response compression မဟုတ်ပါ — ထို့ကြောင့် literal bypass flag နှင့် ကိုက်ညီသော
> code path မရှိပါ။ ထို prompt-compression အဆင့်သည်လည်း လက်ရှိ request pipeline တွင်
> `withRateLimit()` **မတိုင်မီ** လုပ်ဆောင်သောကြောင့် queue-full ပယ်ချမှုတွင် ၎င်းကို ကျော်သွားနိုင်ရန် အစီအစဉ်ပြန်ပြောင်းခြင်းသည် ဤ issue ၏ သက်ရောက်မှုနယ်ပယ်ထက် သီးခြားဖြစ်ပြီး ပိုမိုကြီးမားသော ပြောင်းလဲမှုတစ်ခုဖြစ်သည်။ ထို့ကြောင့် ဤနေရာတွင် ရည်ရွယ်ချက်ရှိရှိ **အကောင်အထည်မဖော်ခဲ့ပါ**။ CPU ချွေတာမှုအကျိုးကျေးဇူးသည် အစီအစဉ်ပြန်ပြောင်းခြင်း၏ အန္တရာယ်နှင့် ထိုက်တန်ပါက နောက်ဆက်တွဲအဖြစ် ဆက်လက်လုပ်ဆောင်ရန် ချန်ထားသည်။

---

## 6. နှေးကွေးသော stream throughput watchdog (#9709)

ရွေးချယ်အသုံးပြုနိုင်သော `resilienceSettings.streamRecovery.throughputWatchdog` အကာအကွယ်သည်
chunk များကို ဆက်လက်ပို့နေသော်လည်း သတ်မှတ်ထားသော အသုံးဝင်-output နှုန်းအောက်တွင်သာ
assistant output ထုတ်ပေးနေသည့် upstream ကို ရှာဖွေသတ်မှတ်သည်။ ၎င်းကို idle timeout နှင့်
ရည်ရွယ်ချက်ရှိရှိ သီးခြားခွဲထားသည်- heartbeat နှင့် metadata တို့သည် timer နှစ်ခုစလုံးကို
ပြန်လည်မသတ်မှတ်သကဲ့သို့ တိုးတက်မှုအဖြစ်လည်း မရေတွက်ပါ။ ၎င်းသည် hard attempt deadline
(#9153) နှင့်လည်း သီးခြားဖြစ်ပြီး၊ ထို deadline သည် output အရည်အသွေးနှင့်မသက်ဆိုင်ဘဲ
အကြွင်းမဲ့ ဘေးကင်းရေးအမြင့်ဆုံးကန့်သတ်ချက်အဖြစ် ဆက်ရှိနေသည်။

watchdog က ရပ်ဆိုင်းနိုင်ရန် warm-up ကာလတစ်ခုနှင့် ၎င်းနောက် ပြည့်စုံသော rolling window
တစ်ခု လိုအပ်သည်။ ၎င်းသည် Chat Completions နှင့် Responses API output event များမှ
text delta များကို ရေတွက်ပြီး (သတိထားတွက်ချက်ထားသော UTF-8 byte proxy)၊ usage-only နှင့်
ဗလာ event များကို လျစ်လျူရှုကာ tool-call သို့မဟုတ် reasoning event များ လုပ်ဆောင်နေစဉ်
ဆုံးဖြတ်ခြင်းကို ခေတ္တရပ်ထားသည်။ မူလအားဖြင့် ပိတ်ထားပြီး
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ဖြင့် ဖွင့်နိုင်သည်။ window၊ warm-up၊
အနည်းဆုံးနှုန်းနှင့် တိုင်းတာနိုင်သော အနည်းဆုံး output တို့ကို ပုံမှန်
resilience-settings normalization layer က ကန့်သတ်ပေးသည်။

ဖွင့်ထားသည့်အခါ watchdog ရပ်ဆိုင်းမှုကို လက်ရှိလုပ်ဆောင်နေသော upstream attempt တစ်ခုတည်းတွင်သာ
သက်ရောက်စေသည်။ client မြင်နိုင်သော byte တစ်ခုမျှ မပို့မီ ရှိပြီးသား same-account
early-recovery လမ်းကြောင်းက attempt ကို ပြန်ဖွင့်နိုင်သည်။ commit လုပ်ပြီးနောက် stream ကို
မည်သည့်အခါမျှ မစဉ်းစားဘဲ ပြန်မဖွင့်ပါ။ ရှိပြီးသား ဘေးကင်းသော mid-stream continuation
contract ကသာ suffix တစ်ခုကို ဆက်စပ်ပေးနိုင်သည်။ Finalization သည် single-shot အဖြစ်
ဆက်ရှိသောကြောင့် usage accounting နှင့် semaphore release တို့ကို ထပ်မံမလုပ်ဆောင်ပါ။

---

## 7. Upstream Status ပြန်လည်သတ်မှတ်ခြင်း (မှားယွင်းဖော်ပြထားသော quota error များ)

**အကျုံးဝင်မှု:** ယာယီ quota ကုန်ဆုံးမှုကို မှားယွင်းသော HTTP status ဖြင့် အစီရင်ခံသည့် upstream gateway တစ်ခု။

**ရည်ရွယ်ချက်:** classification မပြုလုပ်မီ လွဲမှားစေသော status ကို ပြင်ဆင်ရန်ဖြစ်ပြီး၊ ထို့ကြောင့် downstream consumer များ (fallback engine၊ combo aggregation၊ client-facing response) က failure ၏ အမှန်တကယ် ပြန်လည်ကြိုးစားနိုင်သော သဘောသဘာဝကို မြင်နိုင်သည်။

အချို့ gateway များသည် ယာယီ quota ကုန်ဆုံးမှုကို ပြန်လည်ကြိုးစား၍မရသော HTTP
status ဖြင့် အချက်ပြသည်။ `agentrouter.org` သည် ပုံမှန် `429` အစား တရုတ်စာသားပါသော
body (`用户额度不足` / `额度不足`) နှင့်အတူ `403` (တစ်ခါတစ်ရံ `400`) ကို ပြန်ပေးသည်။
Claude Code ကဲ့သို့သော client များက `403` ကို အမြဲတမ်းဖြစ်သော error အဖြစ် သတ်မှတ်ပြီး
session ကို ရပ်ဆိုင်းသည်။ ထို့ပြင် ပြင်ဆင်မှုမရှိပါက fallback engine သည် ၎င်းကို quota
event အစား `AUTH_ERROR` အဖြစ် classification လုပ်မည်။

**အကောင်အထည်ဖော်မှု:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — provider
  တစ်ခုချင်းစီအလိုက် rule စာရင်း (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) ဖြစ်ပြီး `applyStatusRestatement()` မှတစ်ဆင့် ကိုက်ညီမှုရှာသည်။
- ခေါ်ယူသည့်နေရာ: `open-sse/handlers/chatCore.ts` ရှိ `providerFailure:` block
  (line 3654 ဝန်းကျင်)၊ `parseUpstreamError()` က error HTTP status
  (`!providerResponse.ok`) ပါသော upstream response ကို parse လုပ်ပြီးနောက်နှင့် မည်သည့်
  classification မဆို မလုပ်မီ ဖြစ်သောကြောင့် downstream consumer အားလုံးက ပြင်ဆင်ထားသော
  status ကို မြင်ရသည်။ `200` SSE stream အတွင်း ထည့်သွင်းထားသော error များသည် သီးခြားဖြစ်ပြီး
  နောက်ပိုင်းတွင် လုပ်ဆောင်သော stream-parsing လမ်းကြောင်းကို လိုက်ကာ ယနေ့တွင် ဤ hook ဖြင့်
  **အကျုံးမဝင်ပါ** — ၎င်းသည် သိရှိထားသော ကန့်သတ်ချက်တစ်ခုဖြစ်ပြီး၊ error HTTP status အဖြစ်
  ပေါ်လာသည့် agentrouter ၏ misstatus အတွက် လောလောဆယ် မလိုအပ်သေးပါ။
- ပြန်လည်ကြိုးစားနိုင်မှု: `429` သည် `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) တွင် ပါဝင်သောကြောင့် ပြန်လည်သတ်မှတ်ထားသော error
  သည် အသုံးမဝင်သော `403` အဖြစ် ပေါ်လာမည့်အစား အမှန်တကယ် retry window တစ်ခုကို သယ်ဆောင်လာသည်။
- ဖန်တီးသတ်မှတ်ထားသော `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  သည် ပြန်လည်သတ်မှတ်ထားသော response က **client** ကို အသိပေးသည့် အချိန်သာဖြစ်သည်။ ၎င်းကိုယ်တိုင်က
  connection ၏ အတွင်းပိုင်း cooldown/lockout ကြာချိန် မဟုတ်ပါ — ထိုကြာချိန်ကို
  ပြန်လည်သတ်မှတ်ထားသော error ကို အမှန်တကယ် ကိုင်တွယ်သည့် mechanism က သီးခြားထိန်းချုပ်သည်
  (Connection Cooldown ၏ တိုးမြှင့်သည့် backoff၊ §2၊ API-key provider များအတွက် အခြေခံ `3s`;
  သို့မဟုတ် agentrouter ကဲ့သို့ per-model-quota provider များအတွက် Model Lockout၊ §3)။
  router သည် client ထံ ကြေညာထားသော 60s window ထက်စောပြီး အတွင်းပိုင်းတွင် ပြန်လည်ကြိုးစားရန်
  အကျုံးဝင်လာနိုင်သည် — ၎င်းသည် ရည်ရွယ်ချက်ရှိရှိထားသော အပိုလွတ်လပ်ခွင့်ဖြစ်ပြီး bug မဟုတ်ပါ။

အမြဲတမ်း error များ (agentrouter ၏ `无权访问模型` — ဤ model ကို ဝင်ရောက်အသုံးပြုခွင့်မရှိ)
ကို မည်သည့်အခါမျှ ပြန်လည်မသတ်မှတ်ပါ။ `textMarkers` ကိုက်ညီသည့်တိုင် `excludeMarkers` က
rule ကို ပယ်ဖျက်သောကြောင့် error သည် ၎င်း၏ မူလ status ကို ဆက်ထိန်းထားပြီး မည်သည့်အရာကမျှ
၎င်းကို အဆုံးမရှိ ပြန်လည်ကြိုးစားမည်မဟုတ်ပါ။ ကိုက်ညီသော provider classification rule
(`open-sse/config/providerErrorRules.ts` ရှိ `agentrouter-model-access-denied`:
`reason: "auth_error"`၊ `scope: "model"`၊ ကြေညာထားသော အခြေခံ cooldown `6h`) ကို
`checkFallbackError` (`open-sse/services/accountFallback.ts`) က ယေဘုယျ
apikey-category `FORBIDDEN` early-return မတိုင်မီ စစ်ဆေးပြီး၊
`honorsRuleLockScope(provider)` (#10334 — လက်ရှိတွင် `providerErrorRules.ts` ရှိ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist မှတစ်ဆင့် agentrouter အတွက်သာ သီးသန့်) ပေါ်တွင်
မူတည်ကန့်သတ်ထားသည်။ rule က ကြေညာထားသော 6h cooldown သည်
`fallbackResult.baseCooldownMs` အဖြစ် ဆက်လက်စီးဆင်းသော်လည်း၊ ရှိပြီးသား
per-model-quota lockout လမ်းကြောင်း (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`၊ cooldown ရင်းမြစ်မှလွဲ၍ #10334 ကြောင့် မပြောင်းလဲပါ) ထဲသို့ပင်
ဆက်လက်ဝင်ရောက်သည်။ အခြား model lockout အားလုံးကဲ့သို့ operator ၏
`mlSettings.maxCooldownMs` (မူလ `1_800_000ms` / 30min) အထိ လျှော့ချကန့်သတ်ခံရပြီး၊
_persist လုပ်ထားသော lockout reason_ သည် rule ၏ `"auth_error"` မဟုတ်ဘဲ ရှိပြီးသား
hardcoded `"forbidden"` အဖြစ် ဆက်ရှိနေသည် — cooldown ကြာချိန်ကိုသာ အစမှအဆုံးအထိ
လိုက်နာပြီး reason string ကို မလိုက်နာပါ။ connection ကိုယ်တိုင်သည် active အဖြစ် ဆက်ရှိနေပြီး၊
တူညီသော connection ပေါ်ရှိ အခြား sibling model များကို သက်ရောက်မှုမရှိပါ။

ပြန်လည်သတ်မှတ်ထားသော quota error များ (`额度不足`) သည် production ရှိ provider rule တစ်ခုသို့ ရောက်ရှိသည်
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ၎င်းကိုယ်တိုင် သတ်မှတ်ထားသော cooldown မရှိပါ — persistence layer ၏
အချိုးချထားသော backoff default ကို အသုံးပြုသည်)။ #10334 မှစ၍
`ProviderErrorRuleMatch` ပေါ်ရှိ `scope` ကို အစမှအဆုံးအထိ အမှန်တကယ် အသုံးပြုသော်လည်း၊
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ထဲရှိ provider များအတွက်သာ
အသုံးပြုသည် (`providerErrorRules.ts` — လက်ရှိတွင် `"agentrouter"` တစ်ခုတည်းသာရှိပြီး
`honorsRuleLockScope()` မှတစ်ဆင့် gate လုပ်ထားသည်)။ အခြား provider အားလုံးအတွက်
`scope` သည် #10334 မတိုင်မီကအတိုင်း အချက်အလက်ပေးရန်အတွက်သာ ဖြစ်နေဆဲဖြစ်သည်။
`checkFallbackError` သည် ကိုက်ညီသည့် rule ၏ scope ကို
`fallbackResult.ruleScope` အဖြစ် ဖော်ထုတ်ပေးသည်။ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) သည် `ruleScope` တစ်ခုကို connection တစ်ခုလုံးအတွက်
ကိုယ်တိုင်ပြန်လည်ကောင်းမွန်နိုင်သော signal အဖြစ် အမှန်တကယ် စိတ်ချစွာ လိုက်နာနိုင်ကြောင်း
အတည်ပြုသည့် shared guard ဖြစ်သည် (scope `"connection"`, reason
`quota_exhausted`, `permanent` လုံးဝမဖြစ်ရ၊ `creditsExhausted` လုံးဝမဖြစ်ရ —
နောင်တွင် rule တစ်ခုက scope `"connection"` ကို အမြဲတမ်းဖြစ်သော account state
တစ်ခုနှင့် တွဲဖက်မိခြင်းမှ ကာကွယ်ရန်ဖြစ်သည်)။ consumer နှစ်ခုက ၎င်းကို ခေါ်သုံးသည်။

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider ၏ **model တစ်ခုချင်းစီအလိုက်** lockout branch ထဲသို့
  ဝင်သွားမည့်အစား (agentrouter သည် `passthroughModels: true` ဖြစ်သည် →
  `hasPerModelQuota()` က `true` ပြန်ပေးသည်)၊ ၎င်းသည် **ယာယီ connection cooldown**
  ကို အသုံးပြုသည် — `testStatus: "unavailable"` + `rateLimitedUntil` ဖြစ်ပြီး
  terminal status (`credits_exhausted`/`banned`/`expired`) ကို လုံးဝအသုံးမပြုပါ —
  ထို့ကြောင့် cooldown ကာလကုန်ဆုံးသည့်အခါ connection သည် manual credential reset
  မလိုဘဲ ကိုယ်တိုင်ပြန်လည်ကောင်းမွန်လာသည်။
  `disableCooling: true` ရှိသော connection များအတွက် ကျော်သွားသည် (#2997) —
  ထို opt-out သည် per-model lockout သို့ ပြန်ကျသွားသည် (မှတ်တမ်းတင်ထားသော
  trade-off တစ်ခုဖြစ်သည် — branch အပေါ်ရှိ code comment ကို ကြည့်ပါ)။
- **တူညီသော request အတွင်း combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): တူညီသော guard သည်
  `${provider}:${connectionId}` ဖြင့် key သတ်မှတ်ထားသော in-memory
  `exhaustedConnections` set ထဲသို့ connection ကို မှတ်သားသည်။ ၎င်းသည်
  ကျန်ရှိသော SAME-REQUEST target တစ်ခုက _၎င်း၏ ကိုယ်ပိုင် target object ပေါ်တွင်
  ထို `connectionId` အတိအကျကို ရှိထားပြီးသားဖြစ်မှသာ_ ထို target ကို ကျော်သွားသည်
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ကို `exhaustedConnections` lookup မတိုင်မီ စစ်သည်) — sibling
  target များတွင် ၎င်းတို့ကိုယ်ပိုင် pinned `connectionId` မပါဝင်ဘဲ၊ response ၏
  `X-OmniRoute-Selected-Connection-Id` header မှ dispatch တစ်ကြိမ်စီတွင်သာ
  resolve လုပ်သော ပုံမှန် model-list combo သည် ထို key match ကို လုံးဝမရပါ။
  အဆိုပါ အသုံးများသော case အတွက် ကျန်ရှိသော leg တစ်ခုက ယခုပင် quota ကုန်သွားသော
  account ကို ပြန်လည်အသုံးပြုခြင်းမှ အမှန်တကယ် ကာကွယ်ပေးသည့်အရာမှာ ဤ Set
  **မဟုတ်ပါ** — အထက်ပါ persistence layer (connection ၏ `rateLimitedUntil`
  သည် ယခုအခါ အနာဂတ်အချိန် ဖြစ်နေသည်) နှင့် failure အတွက်
  `transientRateLimitedProviders` ကို တားဆီးပေးသော ဤ guard တို့ကို
  ပေါင်းစပ်ထားခြင်း ဖြစ်သည် (`targetExhaustion.ts` ရှိ
  `isAgentrouterConnectionQuotaScope` branch ပေါ်မှ "အဆင့်နှစ်ဆင့် ဒီဇိုင်း" နှင့်
  code comment ကို ကြည့်ပါ)။ ထို Set ကို မမှတ်သားထားသဖြင့် `combo.ts` ၏
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) သည် provider ၏
  ကျန်ရှိသော leg များအတွက် သက်ဝင်မလာပါ။ ထို့ကြောင့် credential selection ၏
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) ကို ပုံမှန်အတိုင်း
  လိုက်နာပြီး၊ ကျန်ရှိသော leg သည် အခြား eligible ဖြစ်နေဆဲ agentrouter
  connection တစ်ခုကို ရွေးချယ်မည် သို့မဟုတ် credential မရရှိနိုင်သဖြင့်
  မအောင်မြင်မည်ဖြစ်သည် — ဤ branch က ယခုပင် cooldown သတ်မှတ်ထားသော connection
  ပေါ်သို့ အတင်းအကျပ် ပြန်ဝင်မည်မဟုတ်ပါ။

### အဆင့်နှစ်ဆင့် ဒီဇိုင်း- status ပြန်လည်သတ်မှတ်ခြင်း၊ ထို့နောက် အမျိုးအစားခွဲခြားခြင်း

Status ပြန်လည်သတ်မှတ်ခြင်း (`upstreamStatusRestatement.ts`) နှင့် provider
အမျိုးအစားခွဲခြားရေး rule များ (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) သည် provider id နှင့် text marker များကို key အဖြစ်
အသုံးပြုသော သီးခြား registry များဖြစ်သော်လည်း၊ ၎င်းတို့သည် မတူညီသောနေရာများတွင်
အလုပ်လုပ်ပြီး မတူညီသော ရည်ရွယ်ချက်များကို ဆောင်ရွက်သည်။ ပြန်လည်သတ်မှတ်ခြင်းသည်
`chatCore.ts` အစောပိုင်းတွင် HTTP status ကို ပြန်လည်ရေးသားသည်။
အမျိုးအစားခွဲခြားရေး rule များက `checkFallbackError()` အတွင်းရှိ fallback
`reason` နှင့် lock `scope` (`model` / `provider` / `connection`) ကို
ရွေးချယ်သည် (`open-sse/services/accountFallback.ts`)။

အမျိုးအစားခွဲခြားရေး rule များသည် `providerErrorRules.ts` ရှိ
`FULL_TEXT_RULE_PROVIDERS` allowlist တွင် စာရင်းသွင်းထားသော provider များအတွက်သာ
error **text** အပြည့်အစုံကို မြင်ရသည် (`额度不足` ကဲ့သို့ body marker များနှင့်
ကိုက်ညီစေရန် လိုအပ်သည်) — လက်ရှိတွင် `"agentrouter"` တစ်ခုတည်းသာ ဖြစ်သည်။
အခြား **built-in catalog** provider အားလုံးအတွက် `checkFallbackError` သည်
`getProviderErrorRuleMatch` ထံ structured error (`{code, type}`) ကိုသာ
ပေးပို့သည်။ ၎င်းသည် header/status/code အခြေပြု rule များအတွက် လုံလောက်သော်လည်း
body-text marker များကို မမြင်နိုင်ပါ။ `resolveRuleMatchBody()` helper က
ဤရွေးချယ်မှုကို ပြုလုပ်သည် — allowlist ထဲရှိ provider များအတွက် error text
အပြည့်အစုံ၊ မဟုတ်ပါက structured error ကို အသုံးပြုသည်။ **built-in** provider
တစ်ခုကို `FULL_TEXT_RULE_PROVIDERS` ထဲသို့ ထည့်ခြင်းသည် provider တစ်ခုချင်းစီအလိုက်
ရှင်းလင်းစွာ opt-in လုပ်ခြင်းဖြစ်သည် — စာရင်းထဲမပါသော provider တိုင်းအတွက်
default path ကို byte တစ်ခုချင်းစီအထိ မပြောင်းလဲဘဲ ဆက်ထားနိုင်ရန် ၎င်းကို
ဖန်တီးထားခြင်း ဖြစ်သည်။

Rule တစ်ခု၏ `scope` (`model` / `provider` / `connection`) သည်
`FULL_TEXT_RULE_PROVIDERS` နှင့် သီးခြား opt-in တစ်ခုဖြစ်သည်။
`checkFallbackError` သည် ၎င်းကို `fallbackResult.ruleScope` အဖြစ်သာ ဖော်ထုတ်ပြီး၊
downstream consumer များသည် တူညီသော file ရှိ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ထဲမှ provider များအတွက်သာ ၎င်းကို
အချက်အလက်ပေးသော label ထက်ပိုသည့်အရာအဖြစ် လိုက်နာကြသည် (`gated via
honorsRuleLockScope()` — လက်ရှိတွင် `"agentrouter"` တစ်ခုတည်းသာ)။ Provider
တစ်ခုက ထို allowlist ထဲတွင် ပါဝင်လာပြီးနောက် `scope: "connection"` match တစ်ခုက
အမှန်တကယ် မည်သို့လုပ်ဆောင်သည်ကို အထက်ပါ "ပြန်လည်သတ်မှတ်ထားသော quota error များ"
တွင် ကြည့်ပါ။

**#11104 — အော်ပရေတာက သတ်မှတ်ထားသော စည်းမျဉ်းများသည် allowlist နှစ်ခုလုံးကို ကျော်လွှားသည်။** အော်ပရေတာတစ်ဦးသည် ဤဖိုင်ကို ပြင်ဆင်စရာမလိုဘဲ runtime တွင် `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
မှတစ်ဆင့် provider တစ်ခုချင်းစီအတွက် စည်းမျဉ်းတစ်ခုကို သတ်မှတ်နိုင်သည်။ အော်ပရေတာစည်းမျဉ်းတစ်ခုကို
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` နောက်ကွယ်တွင် gate လုပ်ခြင်း — built-in catalog စည်းမျဉ်းများ၏ **ပုံသေ** အပြုအမူကို ကာကွယ်ရန် ရည်ရွယ်ထားသည့် allowlist များ — သည်
စည်းမျဉ်းကို သတ်မှတ်ခြင်းကိုယ်တိုင်က အော်ပရေတာ၏ တိကျပြတ်သားသော opt-in ဖြစ်နေပြီးဖြစ်သောကြောင့်၊ ထိုစာရင်းများတွင် ထည့်သွင်းထားပြီးသား provider များမှအပ ကျန် provider အားလုံးအတွက် settings ယန္တရားကို အသုံးမဝင်ဖြစ်စေမည်။
`resolveRuleMatchBody()` နှင့် `honorsRuleLockScope()` နှစ်ခုလုံးသည်
`hasOperatorRuleForProvider()` ကို ဦးစွာ စစ်ဆေးသည်။ အော်ပရေတာစည်းမျဉ်းရှိသော provider သည်
allowlist တစ်ခုခုတွင် ပါဝင်သည်ဖြစ်စေ၊ မပါဝင်သည်ဖြစ်စေ raw error text ကို ရရှိပြီး ၎င်းသတ်မှတ်ထားသော `scope` ကို လိုက်နာစေသည်။

**သိရှိထားသော လစ်ဟာချက် — HTTP 400 အတွက် `providerRuleRegistry` ကို မည်သည့်အခါမျှ ကိုးကားအသုံးမပြုပါ။**
`checkFallbackError` ၏ `BAD_REQUEST` branch သည် status 400 ကို
၎င်း၏ကိုယ်ပိုင် pattern array များ (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` စသည်ဖြင့် `accountFallback.ts` ထဲရှိ) မှတစ်ဆင့်သာ အမျိုးအစားခွဲခြားပြီး၊ ၎င်းအပေါ်ဘက်ရှိ
`configuredRule`/`getProviderErrorRuleMatch` branch သို့ မရောက်မီ return လုပ်သည်။
`status: 400` ပါသော built-in catalog စည်းမျဉ်း (သို့မဟုတ် အော်ပရေတာစည်းမျဉ်း) သည်
syntax အရ မှန်ကန်သော်လည်း မည်သည့်အခါမျှ အလုပ်လုပ်မည်မဟုတ်ပါ။ လက်ရှိတွင် ရှိပြီးသားစည်းမျဉ်းတစ်ခုမျှ 400 ကို ပစ်မှတ်မထားသောကြောင့်
production ရှိ မည်သည့်အရာကိုမျှ မထိခိုက်ပါ — သို့သော် အနာဂတ် 400 စည်းမျဉ်းတစ်ခုအတွက် ဤ
branch ကို ဦးစွာ ပြင်ဆင်ရန် လိုအပ်ပြီး၊ ၎င်းသည် စည်းမျဉ်းတစ်ခု ထည့်သွင်းခြင်းထက် ပိုမိုကြီးမားသော ပြောင်းလဲမှုဖြစ်သည် (pattern-array
အပြုအမူကို အားထားနေပြီးသား provider တိုင်းအတွက် 400 ကို ပြန်လည်အမျိုးအစားခွဲခြားပေးမည်) ဖြစ်သောကြောင့် provider တစ်ခုတည်းအတွက် စည်းမျဉ်းထည့်သွင်းမှု၏ scope အပြင်ဘက်တွင် ရှိသည်။

### Quota ကို မှားယွင်းဖော်ပြသည့် gateway အသစ်တစ်ခု ထည့်သွင်းခြင်း

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) တွင် စည်းမျဉ်း array တစ်ခုကို မှတ်ပုံတင်ပါ။ `textMarkers` ကို
   provider တစ်ခုချင်းအလိုက် သီးသန့်ထားပါ။ `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) နှင့် တိုက်ဆိုင်နိုင်သော ယေဘုယျ အင်္ဂလိပ်စကားစုများကို မည်သည့်အခါမျှ ပြန်မသုံးပါနှင့်။
2. မှန်ကန်သော lock scope (`connection` သည် account တစ်ခုလုံးဆိုင်ရာ quota အတွက်၊ `model` သည်
   model တစ်ခုချင်းဆိုင်ရာ error များအတွက်) ကို ရွေးချယ်ရန်
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) တွင် classification စည်းမျဉ်းများကို လိုအပ်ပါက မှတ်ပုံတင်ပါ။
   ဤအဆင့်သည် error text အပြည့်အစုံ (body marker များ) လိုအပ်သည့် စည်းမျဉ်းများရှိသော
   provider များအတွက်သာ production တွင် သက်ရောက်သည်။ provider id ကို ထိုဖိုင်ထဲရှိ
   `FULL_TEXT_RULE_PROVIDERS` သို့ ထည့်ပါ — ထိုသို့မဟုတ်ပါက
   `checkFallbackError` သည် structured
   `{code, type}` error ကိုသာ စည်းမျဉ်းထံ ပေးမည်ဖြစ်ပြီး body-text စည်းမျဉ်းသည် live traffic တွင် မည်သည့်အခါမျှ match ဖြစ်မည်မဟုတ်ပါ။
   `status`/`headers` ပေါ်တွင်သာ match လုပ်သော စည်းမျဉ်းများ (Opencode သို့မဟုတ်
   Minimax ၏ စည်းမျဉ်းများကဲ့သို့) အတွက် ဤ opt-in မလိုအပ်ပါ။ သီးခြားအနေဖြင့် စည်းမျဉ်းက
   `scope: "connection"` ဟု သတ်မှတ်ပြီး ရည်ရွယ်ချက်မှာ အချက်အလက်ဖော်ပြသည့် label မျှသာမဟုတ်ဘဲ အမှန်တကယ် connection တစ်ခုလုံးဆိုင်ရာ cooldown
   နှင့် request တစ်ခုတည်းအတွင်း combo ကို skip လုပ်ခြင်းဖြစ်ပါက၊ provider id ကို ထိုဖိုင်ထဲရှိ
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` သို့ ထည့်ပါ — ဤအရာက
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) နှင့်
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) တို့ရှိ `isAgentrouterConnectionQuotaScope()` ပုံစံ အသုံးချမှုကို gate လုပ်ပေးသည်။ ထိုသို့မလုပ်ပါက `scope` သည်
   `fallbackResult.ruleScope` မှတစ်ဆင့် ဆက်လက်စီးဆင်းနေသော်လည်း မည်သည့်အရာကမျှ ၎င်းအပေါ် အရေးယူမည်မဟုတ်ပါ။
3. `tests/unit/upstream-status-restatement.test.ts`
   နှင့် `tests/unit/agentrouter-error-rules.test.ts` ကို ပုံစံတူယူ၍ unit test များ ထည့်ပါ (`not-permanent` / `not-creditsExhausted` guard များအပါအဝင်၊ ထို့အပြင် — provider က
   allowlist လိုအပ်ပါက — `resolveRuleMatchBody()` သည် ထို provider အတွက်သာ
   text အပြည့်အစုံကို ပြန်ပေးကြောင်း အတည်ပြုသည့် test တစ်ခု ထည့်ပါ)။

`chatCore.ts`, `classifyError` သို့မဟုတ် combo ကို ပြောင်းလဲရန် မလိုအပ်ပါ။

#### Egress အလိုက် bucket ခွဲထားသော lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) ထဲရှိ provider များကို IP အလိုက် bucket ခွဲထားသော upstream အဖြစ် သတ်မှတ်သည်
(opencode free tier သည် account အလိုက် bucket ခွဲထားခြင်းမဟုတ်ဘဲ IP အလိုက် bucket ခွဲထားသည် — #9611 ကိုကြည့်ပါ)။ `quota_exhausted`
**သို့မဟုတ်** `rate_limit_exceeded` ဟု အမျိုးအစားခွဲထားသော status-429 တစ်ခုသည် rotation က ၎င်းတို့ကို မစမ်းသပ်မီ
allowlist ထဲရှိ family connection များအနက် နောက်ဆုံးသိရှိထားသော egress IP သည် ပျက်ကွက်နေသော connection ၏ IP နှင့် ကိုက်ညီသည့် connection အားလုံးကို cooldown ချသည်
— ထိုသို့ဖြင့် မလွဲမသွေ ပျက်ကွက်မည့် upstream call N-1 ခုကို ရှောင်ရှားသည် (#10460/#10525 နှင့် ပုံစံတူ)။
`rate_limit_exceeded` ကို ရည်ရွယ်ချက်ရှိရှိ ထည့်သွင်းထားသည်။ `markAccountUnavailable`
လမ်းကြောင်းတွင် opencode သီးသန့်စည်းမျဉ်းများသည် မည်သည့်အခါမျှ match မဖြစ်ပါ (`checkFallbackError` ထံ headers/body မပေးထားဘဲ၊ opencode သည် `FULL_TEXT_RULE_PROVIDERS` ထဲတွင် မပါဝင်ပါ)။ ထို့ကြောင့် body ထဲတွင် subscription-quota စာသား ("monthly usage limit
reached") ပါဝင်သော 429 တစ်ခုကို `status_429` စည်းမျဉ်းသို့ မရောက်မီ
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) က
`quota_exhausted` ဟု အမျိုးအစားခွဲခြားသည် — အခြားတစ်ဖက်တွင် quota-text မပါသော 429 တစ်ခု (သာမန်
rate limiting) ကို `status_429` စည်းမျဉ်းမှတစ်ဆင့် `rate_limit_exceeded` ဟု အမျိုးအစားခွဲခြားပြီး
IP family ကို ဆက်လက် cooldown ချသည်။ allowlist ထဲရှိ provider တစ်ခုအတွက် IP အလိုက် bucket ခွဲထားသော
rate limit သည် ကုန်ဆုံးသွားသော quota နှင့် တူညီသည့် signal ဖြစ်သည်။ အမှန်အတိုင်း ဖော်ပြရမည့် ကန့်သတ်ချက်များ:

- **အကောင်းဆုံးဖြစ်အောင် ကြိုးပမ်းခြင်း**: lock သည် `proxy_logs` မှ connection ၏ နောက်ဆုံးသိရှိထားသော `egress_ip`
  ကို ရှာဖွေသတ်မှတ်သည် (24h အချိန်ကာလ၊ synchronous၊ cache မရှိ)။ Cold cache (egress
  IP ကို တစ်ကြိမ်မျှ probe မလုပ်ရသေးခြင်း) သို့မဟုတ် row မရှိခြင်း → မအောင်မြင်သော connection ကို
  branch က ဆက်လက် cooldown လုပ်ထားသည် (ယနေ့ကဲ့သို့ မှတ်တမ်းတင်သည်)၊ sibling ကိုသာ lock မလုပ်ပါ။
- **မည်သည့်အခါမျှ terminal မဟုတ်ခြင်း**: cooldown သည် သက်တမ်းတိုးနေသော quota အချိန်ကာလဖြစ်သည်
  (`testStatus: "unavailable"`); IP အဆင့် signal တစ်ခုမှ permanent state ကို မည်သည့်အခါမျှ
  ဆင်းသက်သတ်မှတ်ခြင်းမပြုပါ။ `disableCooling` connection များသည် branch ကို လုံးဝကျော်သွားသည်။
- **Allowlist ထဲရှိ family အတွက် lock granularity ပြောင်းလဲခြင်း**: ဤသည်မှာ scope
  ပြောင်းလဲမှုဖြစ်ပြီး sibling optimization သက်သက်မဟုတ်ပါ။ opencode သည် `passthroughModels`
  provider ဖြစ်သောကြောင့် ဤ branch မတိုင်မီ 429 တစ်ခုသည် MODEL တစ်ခုချင်းအလိုက် lockout ဖြစ်စေခဲ့သည်၊ ယခုမူ
  connection cooldown ဖြစ်စေသည် — sibling လုံးဝမရှိဘဲ connection တစ်ခုတည်းကို လည်ပတ်နေသော operator
  အတွက်လည်း အပါအဝင်ဖြစ်သည်။ ၎င်းသည် opencode rule table က မှန်ကန်သည်ဟု ကြေညာထားပြီးဖြစ်သော granularity
  ဖြစ်သည် (`scope: "connection"`,
  `providerErrorRules.ts`)၊ သို့သော် opencode သည်
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ထဲတွင် မပါဝင်သောကြောင့် ယခုအချိန်အထိ လိုက်နာအသုံးပြုခြင်း မရှိခဲ့ပါ။
  ဤ branch သည် connection scope သတ်မှတ်ထားသော agentrouter branch ကို ပုံတူယူ၍ မအောင်မြင်သော
  connection ၏ cooldown + `backoffLevel` ကို ကိုယ်တိုင်ရေးသားပြီး return လုပ်သည် — အောက်ရှိ model တစ်ခုချင်းအလိုက် block နှင့်
  generic path သို့ မည်သည့်အခါမျှ မရောက်ပါ။
- **Combo ပါဝင်ခြင်း**: agentrouter branch ကဲ့သို့ပင်၊ combo caller တစ်ခုက
  429 အပေါ် သက်ရောက်စေသော `persistUnavailableState`/`isCombo` downgrade ကို ဤ scope က ရည်ရွယ်ချက်ရှိရှိ
  လျစ်လျူရှုသည်။ Model တစ်ခုချင်းအလိုက် lockout သည် ဤ scope ၏ ပိုအားနည်းသော ပုံစံမဟုတ်ဘဲ
  မှားယွင်းသော unit ဖြစ်သည်။ ၎င်းသည် ကုန်ဆုံးသွားသော IP အကြောင်း မည်သည့်အရာကိုမျှ မဖော်ပြသောကြောင့် combo
  rotation သည် sibling တစ်ခုချင်းစီအတွက် မအောင်မြင်မည်မှာ သေချာသော call တစ်ခုစီကို ဆက်လက်ဖြုန်းတီးနေမည်ဖြစ်သည်။
- **Sibling ဘေးကင်းလုံခြုံမှု**: terminal ဖြစ်ပြီးသား sibling (banned/credits_exhausted)
  သို့မဟုတ် ပိုရှည်သော cooldown ထဲ ရှိပြီးသား sibling ကို မည်သည့်အခါမျှ overwrite မလုပ်ပါ။
- **သီးသန့် allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ကို ချဲ့ထွင်ခြင်းသည်
  owner ၏ တိကျရှင်းလင်းသော ဆုံးဖြတ်ချက်ဖြစ်သည်။ generic wiring မရှိပါ (pattern #10334/#10419)။
  Sibling query သည် SQL
  literal အဖြစ် ထပ်ရေးမည့်အစား ထို allowlist ကိုပင် bind လုပ်သောကြောင့် ၎င်းကို ချဲ့ထွင်ရာတွင် တစ်ကြောင်းတည်း ပြောင်းလဲရန်သာ လိုသည်။
- **Egress IP rotation၊ ဦးတည်ချက်နှစ်မျိုးလုံး**: lookup အချိန်ကာလ (24h) သည်
  egress-IP cache TTL (5 min) ထက် များစွာပိုကျယ်သောကြောင့် "နောက်ဆုံးသိရှိထားသော IP" သည် လက်ရှိ
  state မဟုတ်ဘဲ history ဖြစ်သည်။ Connection တစ်ခု၏ proxy သည် ထိုအချိန်ကာလအတွင်း rotate ဖြစ်ခဲ့ပါက
  lock သည် အမှန်တကယ် မျှဝေထားသော IP ကို **လွတ်သွားနိုင်သည်** (မှတ်တမ်းတင်ထားသော IP သည် အသစ်ဖြစ်ပြီး
  မကုန်ဆုံးသေးသော IP ဖြစ်သည်) — အလားတူပင် ကုန်ဆုံးသွားသော IP မှ rotate လုပ်ပြီး ထွက်သွားပြီဖြစ်သော
  sibling တစ်ခုကိုလည်း **cool လုပ်မိနိုင်သည်**။ ဒုတိယအခြေအနေတွင် ထို sibling အတွက် cooldown
  အချိန်ကာလတစ်ခု ဆုံးရှုံးသည်။ နှစ်မျိုးလုံးကို history အခြေပြု lookup ၏ လက်ခံထားသော best-effort ကန့်သတ်ချက်များအဖြစ်
  သတ်မှတ်ထားသည်။
- **ကုန်ကျစရိတ်**: `proxy_logs` ကို ကန့်သတ်ထားသော scan နှစ်ကြိမ်ပြုလုပ်သည် (အချိန်ကာလအလိုက်
  `idx_pl_timestamp` ဖြင့် filter လုပ်ထားသည်)၊ 429 ဖြစ်ပွားသော အကြိမ်ရေတွင်သာ လုပ်ဆောင်သည်။ Index အသစ် မရှိပါ (migration 134
  YAGNI)။ အလယ်အလတ်အရွယ်အစားရှိသော real-traffic DB မိတ္တူတစ်ခုတွင် တိုင်းတာထားပြီး
  high-throughput instance တစ်ခုသည် တူညီသော အချိန်ကာလအတွင်း အချိုးကျ ပိုများသော row များကို ထိန်းသိမ်းထားသည်။

---

## အခြား ခံနိုင်ရည်ရှိမှု အင်္ဂါရပ်များ

- **လမ်းကြောင်းရွေးချယ်မှု နည်းဗျူဟာ 19 မျိုး** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ကို ကြည့်ပါ။
- **ပြန်လည်သတ်မှတ်ချိန်ကို အခြေခံသော လမ်းကြောင်းရွေးချယ်မှု** (v3.8.0) — ခွဲတမ်း ပြန်လည်သတ်မှတ်မည့်အချိန်အလိုက် ချိတ်ဆက်မှုများကို ဦးစားပေးသည်။
- **နောက်ခံမုဒ် အဆင့်လျှော့ချမှု** — Responses API `background: true` ကို သတိပေးချက်နှင့်အတူ တစ်ပြိုင်တည်းလုပ်ဆောင်မှုသို့ အဆင့်လျှော့ချသည်။
- **ဒိုင်နမစ် တူးလ်ကန့်သတ်ချက် ရှာဖွေသတ်မှတ်မှု** — တူးလ်အရေအတွက် ကန့်သတ်ချက်သို့ ရောက်သည့်အခါ ပံ့ပိုးသူများကို နောက်ဆုတ်စေသည်။
- **အရေးပေါ် အစားထိုးအသုံးပြုမှု** — `OMNIROUTE_EMERGENCY_FALLBACK` ဖြင့် ထိန်းချုပ်သည်။ အော်ပရေတာများသည် ပြန်လည်စတင်ရန်မလိုဘဲ Feature Flags စာမျက်နှာမှ ၎င်းကို အစားထိုးသတ်မှတ်နိုင်သည်။

---

## အမှားရှာဖွေပြင်ဆင်ခြင်း

- Weighted combo က `503 all_targets_cooling_down` ဖြင့် တုံ့ပြန်သည် (`Retry-After` ကို သတ်မှတ်ထားပြီး `diagnostics.excluded` တွင် target တိုင်းကို `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` နှင့်အတူ စာရင်းပြုထားသည်) → pool ကို configure လုပ်ပြီး ချိတ်ဆက်ထားသော်လည်း target တိုင်းကို resilience timer တစ်ခုကြောင့်သာ ဖယ်ထုတ်ထားခြင်းဖြစ်သည်။ `[COMBO] Weighted selection: every target excluded before dispatch — …` သတိပေးချက်တွင် အကြောင်းရင်းများနှင့် ကျန်ရှိနေသည့် စက္ကန့်များကို ဖော်ပြထားသည်။ အလားတူ combo မှ `404 no_executable_targets` ပြန်လာပါက resilience timer မပါဝင်ခဲ့ကြောင်း ဆိုလိုသည် (လုပ်ဆောင်ရန် ဘာမျှမရှိခြင်း သို့မဟုတ် account တိုင်းသည် availability probe ကို မအောင်မြင်ခြင်း)။ `targetResolution.ts` တွင် စုဆောင်းထားသော exclusions များမှ `open-sse/services/combo/pinRecovery.ts` တွင် ထည့်သွင်းတည်ဆောက်ထားသည်။
- Provider တစ်ခုအတွက် key အားလုံးကို ကျော်သွားသည် → circuit breaker state နှင့် connection တစ်ခုချင်းစီ၏ `rateLimitedUntil`/`testStatus` နှစ်ခုစလုံးကို စစ်ဆေးပါ။
- Reset window ပြီးနောက် provider ကို အမြဲတမ်း ဖယ်ထုတ်ထားသည် → code သည် `getStatus()`/`canExecute()` အစား raw `state` ကို ဖတ်နေခြင်း ဖြစ်နိုင်သည်။
- Key တစ်ခု မအောင်မြင်သော်လည်း အခြား key များ အလုပ်လုပ်သင့်သည် → circuit breaker အစား connection cooldown ကို ဦးစားပေးပါ။
- Model တစ်ခုတည်းသာ မအောင်မြင်သည် → connection cooldown အစား model lockout ကို ဦးစားပေးပါ။
- State သည် အလိုအလျောက် ပြန်လည်ကောင်းမွန်သင့်သော်လည်း မကောင်းမွန်ပါ → အနာဂတ် timestamp နှင့် သက်တမ်းကုန်သွားသော state ကို refresh လုပ်ပေးသည့် read path ရှိမရှိ စစ်ဆေးပါ။ Permanent status များကို manual ပြောင်းလဲမှုများ ပြုလုပ်ရန် လိုအပ်သည်။

---

## TLS လက်ဗွေဖော်ထုတ်ခြင်းနှင့် ခြေရာဖျောက်ခြင်း

ပံ့ပိုးသူအလိုက် ခြေရာဖျောက်မှု (JA3/JA4, CCH, obfuscation) ကို သီးခြား မှတ်တမ်းတင်ထားသည် — `docs/security/STEALTH_GUIDE.md` ကို ကြည့်ပါ (git တွင်သာရှိပြီး `/docs` ထဲသို့ စုစည်းထည့်သွင်းထားခြင်းမရှိပါ)။

---

## ခံနိုင်ရည်ရှိမှု စမ်းသပ်ခြင်း (အဆင့် 8 · ဘလောက် C)

ခံနိုင်ရည်ရှိမှု လုပ်ဆောင်ချက်များအတွက် ယူနစ်စမ်းသပ်မှုများအပြင်၊ စမ်းသပ်မှုသုံးခုက တကယ့်
ဖိအား/ပျက်ကွက်မှု အခြေအနေများအောက်တွင် runtime ကို စမ်းသပ်သည် (အားလုံးသည် integration/nightly ဖြစ်ပြီး PR များကို ပိတ်ဆို့ခြင်းမရှိပါ):

| စမ်းသပ်မှု  | စမ်းသပ်သည့်အရာ                                                                                                                                                                                                                                              | လုပ်ဆောင်ရန်                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Chaos       | Fake-upstream node က တကယ့် latency/reset/timeout/503 ကို ထည့်သွင်းပေးသည်။ circuit breaker က ပွင့်လာခြင်း/ပြန်လည်ကောင်းမွန်ခြင်းနှင့် `checkFallbackError` က 503 ကို ပြန်လည်ကောင်းမွန်နိုင်သော အစားထိုးအသုံးပြုမှုအဖြစ် အမျိုးအစားခွဲခြားကြောင်း အတည်ပြုသည်။ | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| Heap-growth | `--expose-gc` အောက်တွင် `createSSEStream` တစ်ခုစီအတွက် stream ~500 ခု။ heap သည် သတ်မှတ်အမြင့်ဆုံးပမာဏထက် ကျော်လွန်ကြီးထွားပါက ပျက်ကွက်သည် (OOM အကာအကွယ် #3069)။                                                                                             | `npm run test:heap`                   |
| k6 soak     | `/api/monitoring/health` ကို ရေရှည်ဆက်တိုက် ဝန်တင်စမ်းသပ်မှု၊ p95/အမှား သတ်မှတ်ကန့်သတ်ချက်များ။                                                                                                                                                             | `k6 run tests/load/k6-soak.js` (ညစဉ်) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) ဖြင့် စီမံလုပ်ဆောင်သည်။ မူလ
`test:integration` တွင် chaos နှင့် heap တို့သည် (`RUN_CHAOS_INT`/`--expose-gc` မရှိလျှင်) မိမိတို့ဘာသာ ကျော်သွားသည်။

---

## ဆက်လက်ကြည့်ရှုရန်

- [ဗိသုကာ လမ်းညွှန်](./ARCHITECTURE.md) — စနစ်ဗိသုကာနှင့် အတွင်းပိုင်းလုပ်ဆောင်ချက်များ
- [အသုံးပြုသူ လမ်းညွှန်](../guides/USER_GUIDE.md) — ဝန်ဆောင်မှုပေးသူများ၊ ပေါင်းစပ်မှုများ၊ CLI ချိတ်ဆက်အသုံးပြုမှု
- [အလိုအလျောက် ပေါင်းစပ်မှု အင်ဂျင်](../routing/AUTO-COMBO.md) — အချက် ၁၆ ချက်ပါ အမှတ်ပေးစနစ်၊ မုဒ်အစုများ
