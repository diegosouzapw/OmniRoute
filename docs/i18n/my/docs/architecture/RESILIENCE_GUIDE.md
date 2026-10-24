# Resilience Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute တွင် ခွဲခြားသီးခြားစီသော်လည်း အပြန်အလှန်ဆက်စပ်နေသည့် resilience ယန္တရား သုံးခု ရှိသည်။ ၎င်းတို့တစ်ခုချင်းစီတွင် ကွာခြားသော scope နှင့် ရည်ရွယ်ချက် ရှိသည်။ routing အပြုအမူကို debug လုပ်စဉ် ၎င်းတို့ကို သီးခြားစီ ခွဲခြားထားပါ။

![resilience 3-အလွှာမော်ဒယ်](../diagrams/exported/resilience-3layers.svg)

> ရင်းမြစ်: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**အကျယ်အဝန်း (Scope):** provider တစ်ခုလုံး (ဥပမာ `glm`, `openai`, `anthropic`)။

**ရည်ရွယ်ချက်:** upstream/service အဆင့်တွင် ထပ်ခါတလဲလဲ ပျက်ကွက်နေသည့် provider ဆီသို့ traffic ပေးပို့ခြင်းကို ရပ်တန့်ရန်။

**အကောင်အထည်ဖော်မှု:**

- အဓိက class: `src/shared/utils/circuitBreaker.ts`
- ချိတ်ဆက်မှု (Wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- အခြေအနေ API: `GET /api/monitoring/health`
- ပြန်လည်သတ်မှတ်ရေး API: `POST /api/resilience/reset`
- Wrapper များ: `open-sse/services/accountFallback.ts`
- DB ဇယား: `domain_circuit_breakers`

**အခြေအနေများ:**

- `CLOSED` — ပုံမှန် traffic ကို ခွင့်ပြုထားသည်
- `DEGRADED` — traffic ကို ဆက်လက်ခွင့်ပြုထားသော်လည်း တိုးပွားလာသော provider ပျက်ကွက်မှုများကို ခြေရာခံနေသည်; အောင်မြင်မှု အလုံအလောက်ရရှိသောအခါ၊ connection test မှန်ကန်သောအခါ၊ သို့မဟုတ် နောက်ဆုံး ပျက်ကွက်မှုအမျိုးအစားအတွက် အရှည်ဆုံး `OPEN` ဆုပ်ကိုင်ချိန် (၎င်း၏ `cooldownByKind` တန်ဖိုး၊ မရှိပါက `resetTimeout`၊ × `maxBackoffMultiplier`၊ အနည်းဆုံး cooldown တစ်ခု) ကြာပြီးနောက် ပျက်ကွက်မှုအသစ် မရှိဘဲ `CLOSED` သို့ ပြန်ရောက်သည်
- `OPEN` — provider ကို ခေတ္တပိတ်ဆို့ထားသည်; combo routing က ၎င်းကို ကျော်သွားသည်
- `HALF_OPEN` — reset timeout ကုန်ဆုံးသွားပြီး; probe request ကို ခွင့်ပြုထားသည်

**စိတ်ကြိုက်သတ်မှတ်နိုင်သော default တန်ဖိုးများ (`open-sse/config/constants.ts`၊ Dashboard → Settings → Resilience တွင် ဖော်ပြထားသည်):**

| အမျိုးအစား | Degraded ဖြစ်မှတ် | Open ဖြစ်မှတ်     | Reset timeout |
| ---------- | ----------------- | ----------------- | ------------- |
| OAuth      | ပျက်ကွက်မှု 5 ခု  | ပျက်ကွက်မှု 8 ခု  | 60s           |
| API-key    | ပျက်ကွက်မှု 7 ခု  | ပျက်ကွက်မှု 12 ခု | 30s           |
| Local      | တွက်ချက်ထားသော    | ပျက်ကွက်မှု 2 ခု  | 15s           |

`degradationThreshold` က provider တစ်ခု `DEGRADED` သို့ ဘယ်အချိန်ဝင်ရောက်မည်ကို ထိန်းချုပ်ပေးသည်; `failureThreshold` က ၎င်း ဘယ်အချိန် open ဖြစ်ပြီး ကျော်သတ်ခံရမည်ကို ထိန်းချုပ်သည်။ Local provider profile များကို Resilience settings စာမျက်နှာတွင် မဖော်ပြရသေးပါ။

**Trip ကုဒ်များ:** provider-အဆင့် status `[408, 500, 502, 503, 504]` များသာ။ account-အဆင့် error များအတွက် trip မလုပ်ပါနှင့် (401/403/429 အများစု — ၎င်းတို့သည် cooldown သို့မဟုတ် lockout နှင့် သက်ဆိုင်သည်)။

**Lazy recovery:** `OPEN` သက်တမ်းကုန်သောအခါ `getStatus()`၊ `canExecute()`၊ `getRetryAfterMs()` များ အခြေအနေကို `HALF_OPEN` သို့ ပြန်လည်အသစ်ပြုပေးသည်။ ထိုဖတ်ရှုမှုများပင်လျှင် (နှင့် နောက်ထပ်ပျက်ကွက်မှု) က ရှေးကျနေသော `DEGRADED` ကို `CLOSED` သို့ ပြန်လည်လျှော့ချပေးသည်။ နောက်ခံ timer မလိုအပ်ပါ။

---

### ရွေးချယ်ဖွင့်နိုင်သော (opt-in) global Provider Cooldown (window gate)

စတုတ္ထမြောက် **opt-in** အလွှာ (`PROVIDER_COOLDOWN_ENABLED`၊ default မှာ **ပိတ်**) သည် `open-sse/services/providerCooldownTracker.ts` တွင် ပျက်ကွက်နေသော provider များ၏ cross-request မှတ်ဉာဏ်ကို သိမ်းထားပြီး၊ combo target resolution က ၎င်းကို ရည်ညွှန်းသုံးစွဲသဖြင့် အဆက်တိုက်လာလာသော combo request များ မကြာသေးမီက ပျက်ကွက်ခဲ့သော provider ကို ထပ်မံရှာဖွေခြင်းမှ ရပ်တန့်စေသည်။ Provider-အဆင့် entry များသည် `PROVIDER_PROFILES` window gate ကို လိုက်နာသည်:

| Profile | trip ဖြစ်စေသော ပျက်ကွက်မှုအရေအတွက် (`providerFailureThreshold`) | ဤကာလအတွင်း (`providerFailureWindowMs`) | cooldown ကြာချိန် (`providerCooldownMs`) |
| ------- | --------------------------------------------------------------: | -------------------------------------: | ---------------------------------------: |
| OAuth   |                                                            `10` |                                `15min` |                                   `5min` |
| API key |                                                            `15` |                                `30min` |                                  `10min` |

threshold အောက်တွင် provider ကို cooldown အဖြစ်အတွက် **မ** မှတ်ယူပါ; အောင်မြင်မှုတစ်ခုက window ကို ရှင်းလင်းပစ်သည်။ Connection-အဆင့် entry များ (`provider:connectionId`) က အဲဒီအစား exponential `minRetryCooldownMs → maxRetryCooldownMs` backoff ကို ဆက်လက်အသုံးပြုသည်။ Override များ: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`။ Regression ကာကွယ်စစ်ဆေးမှု: `tests/unit/provider-cooldown-window-gate.test.ts`။

## 2. ချိတ်ဆက်မှု Cooldown

**သက်ဆိုင်မှုနယ်ပယ်:** provider ချိတ်ဆက်မှု/အကောင့်/key တစ်ခုချင်း။

**ရည်ရွယ်ချက်:** တူညီသော provider ၏ အခြားချိတ်ဆက်မှုများ ဆက်လက်ဝန်ဆောင်မှုပေးနေစဉ် မကောင်းသော key တစ်ခုကို ကျော်သွားစေရန်။

**အကောင်အထည်ဖော်မှု:**

- unavailable ဟု မှတ်သားခြင်း: `src/sse/services/auth.ts::markAccountUnavailable()`
- ရွေးချယ်ခြင်း: တူညီသောဖိုင်အတွင်းရှိ `getProviderCredentials*`
- Cooldown တွက်ချက်ခြင်း: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ဆက်တင်များ: `src/lib/resilience/settings.ts`

**ချိတ်ဆက်မှုတစ်ခုလျှင် field များ:**

- `rateLimitedUntil` — cooldown သက်တမ်းကုန်ဆုံးသည်အထိ timestamp
- `testStatus: "unavailable"`
- `lastError`၊ `lastErrorType`၊ `errorCode`
- `backoffLevel` — exponential backoff ကောင့်တာ

**မူလ cooldown များ:**

- OAuth အခြေခံ: 5s
- API-key အခြေခံ: 3s
- API-key 429: upstream `Retry-After`/reset header များ/ဖတ်ရှုနိုင်သော reset စာသားကို ဦးစားပေးသည်
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Anti-thundering-herd ကာကွယ်စနစ်:** တစ်ပြိုင်နက် ဖြစ်ပေါ်သော ချို့ယွင်းမှုများမှ cooldown ကို လွန်ကဲစွာ ဆန့်တန်းစေခြင်း သို့မဟုတ် `backoffLevel` ကို နှစ်ဆတိုးစေခြင်းကို ကာကွယ်ပေးသည်။

**Concurrency-limit 429 များသည် backoff ဆင့်လှေကားကို မတက်ပါ။** Body တွင် concurrency limit
("too many concurrent requests"၊ "concurrency limit"၊ "parallel request
limit"၊ GLM `并发数过高`) ကို သတင်းပို့ထားသော `429` ဆိုသည်မှာ အကောင့်သည် ကျန်းမာနေသော်လည်း အလုပ်များနေခြင်းကို ဆိုလိုသည်။
`checkFallbackError()` က အကြောင်းပြချက် `concurrency_limited` ကို ပြန်ပေးသည်- ချက်ချင်း နောက်ထပ်ချိတ်ဆက်မှုသို့
failover လုပ်ပါ၊ ဤချိတ်ဆက်မှုကို ပုံသေ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) သို့မဟုတ်
upstream retry အကြံပြုချက်အတိုင်း အေးစေပါ၊ `backoffLevel` ကို မပြောင်းလဲဘဲထားပါ၊ ထို့နောက် `skipProviderBreaker` ကို သတ်မှတ်ပါ။
ရှင်းလင်းသော quota body က ဆက်လက်အနိုင်ရသောကြောင့် quota pattern နှင့် လည်းကိုက်ညီသော body သည် quota
ဆုံးဖြတ်ချက်အဖြစ် ဆက်လက်တည်ရှိမည်။ ရှာဖွေတွေ့ရှိမှု- `src/shared/utils/classify429.ts` အတွင်းရှိ `looksLikeConcurrencyLimit()`၊
ဆုံးဖြတ်ချက်- `open-sse/services/accountFallback/concurrencyLimit429.ts`။ `classify429()` (breaker ၏ `FailureKind`) သည်
မပြောင်းလဲပါဘဲ ဤ body များအတွက် `rate_limit` ကို ဆက်လက်ဖတ်ရှုသည်။

**Stream content stall များက အကောင့်ကို အေးမစေပါ။** Content-stall watchdog
(`open-sse/utils/streamHandler.ts`) က သတ်မှတ်ချိန်အတွင်း model output မပေးပို့သော
stream တစ်ခုကို စွန့်လွှတ်သောအခါ၊ `markAccountUnavailable()` က ချိတ်ဆက်မှုပေါ်တွင် အမှားကို မှတ်သားသော်လည်း
cooldown ကို မသတ်မှတ်ပါ- ထို stall သည် ထို request ၏ပိုင်ဆိုင်မှုဖြစ်ပြီး၊ မကြာခဏဆိုသလို output မထွက်သေးသည့်
ရှည်လျားသော reasoning turn ကြောင့်ဖြစ်သည်။ Operator များသည် `resilienceSettings.streamStallCooldown.enabled`
(မူလ `false`) ဖြင့် ပြန်လည်ရွေးချယ်ပါဝင်နိုင်သည်။

**Reasoning frame များက content-stall ဘတ်ဂျက်ကို ပြန်လည်စတင်စေသည်။** Reasoning model တစ်ခုသည်
ပထမဆုံး မြင်သာသော token မပေါ်မီ မိနစ်အတော်ကြာအောင် တွေးခေါ်နိုင်သည်- Claude သည် thinking စာသား ဗလာဖြစ်နိုင်သော
`thinking_delta` frame များကို stream ပေးပို့ပြီး၊ Responses API သည် reasoning item တစ်ခုပြီးတစ်ခု
stream ပေးပို့သည်။ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) က
ဤ frame များကို မှတ်သားနိုင်ပြီး၊ watchdog သည် turn ကို ပယ်ဖျက်ခြင်းအစား frame တစ်ခုချင်းစီတွင် ၎င်း၏ဘတ်ဂျက်ကို ပြန်လည်စတင်သည်။ ၎င်းတို့သည် model output မဟုတ်ကြပါ၊ ထို့ကြောင့် reasoning ဖြင့်သာ
ပြီးဆုံးသွားသော turn ကို ဗလာအဖြစ် ဆက်လက်အစီရင်ခံခံရမည်ဖြစ်ပြီး၊ reasoning ရပ်သွားကာ heartbeat များသာ
ပေးပို့သော turn ကလည်း watchdog ကို ဆက်လက် trigger လုပ်စေမည်။

Signature ဗလာမဟုတ်သော Kiro ၏ binary `reasoningContentEvent` frame များသည် ဤ
reasoning လှုပ်ရှားမှုကို executor မှတဆင့် ဗလာ `reasoning_content` delta အဖြစ် ထိန်းသိမ်းပေးသည်။ Signature ကို
forward မလုပ်ပါ။ Metadata၊ မပြည့်စုံသော frame များနှင့် ဗလာ signature များက content ဘတ်ဂျက်ကို ပြန်စတင်မစေပါ၊
သီးခြားလုံး active-stream timeout နှင့် client cancellation က ဆက်လက်သက်ဝင်သည်
(`open-sse/executors/kiro/reasoning.ts`)။

**Terminal အခြေအနေများ (cooldown မဟုတ်ပါ):**

- `banned` — ပိတ်ပင်ထားသော keyword / account-ban ရှာဖွေတွေ့ရှိမှုမှ သတ်မှတ်ခြင်း ([BAN_DETECTION](../security/BAN_DETECTION.md) ကြည့်ပါ)၊ နှင့် request တစ်ခုချင်းစီအတွက် တဆက်တည်းသုံးခါသော upstream ငြင်းပယ်မှုများ (`request_rejected`၊ ဥပမာ Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) မှလည်း သတ်မှတ်ခြင်း၊ ငြင်းပယ်မှုတစ်ကြိမ်တည်းက ချိတ်ဆက်မှုကို cooldown လုပ်ရုံသာဖြစ်သည်
- `expired` (ကန့်သတ်ထားသော ပြန်လည်ကြိုးစားမှုများပြီးနောက် terminal သို့ ပြောင်းလဲသွားသည် — exponential backoff ဖြင့် `EXPIRED_RETRY_MAX = 3` — ထို့ကြောင့် ယာယီ OAuth အမှားများသည် အကောင့် အမြဲတမ်းပိတ်ခံရခြင်းမပြုမီ ကိုယ်တိုင်ပြန်ကောင်းလာနိုင်သည်)
- `credits_exhausted`

ဤအရာများသည် credentials ပြောင်းလဲသွားသည်အထိ သို့မဟုတ် operator တစ်ဦးက reset လုပ်သည်အထိ ဆက်လက်တည်ရှိမည်။ Terminal အခြေအနေများကို ယာယီ cooldown အခြေအနေနှင့် အစားမထိုးပါနှင့်။

**Lazy ပြန်လည်ရရှိမှု:** `rateLimitedUntil` ကျော်လွန်သွားသောအခါ၊ ချိတ်ဆက်မှုသည် ထပ်မံရွေးချယ်ခံရနိုင်သော အခြေအနေရောက်မည်။ အောင်မြင်စွာအသုံးပြုပြီးသောအခါ၊ `clearAccountError()` က error field အားလုံးကို ရှင်းလင်းပေးသည်။

### Claude OAuth usage wall: ဦးစားပေးမှုနိမ့့် လမ်းကြောင်း + session-limit reset

**သက်ဆိုင်မှုနယ်ပယ်:** Claude subscription (OAuth) ချိတ်ဆက်မှု တစ်ခု။ ဝိသေသလက္ခဏာနှစ်ခုလုံးသည် **ချိတ်ဆက်မှုတစ်ခုချင်း
opt-in** ဖြစ်သည် (ချိတ်ဆက်မှု ပြင်ဆင်ရန် → Claude ကဏ္ဍ → `providerSpecificData` ထဲရှိ `lowPriorityMode` / `autoLimitReset`၊
နှစ်ခုလုံး မူလအားဖြင့် ပိတ်ထား) ပြီး Claude Code ၏ `/low-priority` နှင့်
`/limit-reset` command များကို အတုယူထားသည် (Claude Code 2.1.263 မှ မှတ်သားရယူထားသော wire contract)။

**အကောင်အထည်ဖော်မှု:**

- State machine + တုံ့ပြန်မှုခွဲခြားသတ်မှတ်ခြင်း: `open-sse/services/claudeLowPriority.ts`
- Reset အခြေအနေ/တောင်းဆိုမှု client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header ထိုးသွင်းခြင်း + တူညီသောအကောင့် retry): `open-sse/executors/base.ts::execute()`
- Opt-in သိမ်းဆည်းမှု: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** 5-နာရီ usage wall — header များတွင်
`anthropic-ratelimit-unified-status: rejected` ပါဝင်ပြီး၊ အကောင့် အရည်အချင်းပြည့်မှီသောအခါ
`anthropic-ratelimit-unified-slow-offer: treatment` ပါဝင်သော `429` ဖြစ်သည်။ ထို ပထမဆုံး wall
429 မတိုင်မီ ဘာမှမပို့ပါ၊ unified header များမပါသော burst 429 သည် ပုံမှန် cooldown လမ်းကြောင်းကိုသာ ဖြတ်သန်းသည်။

**ဦးစားပေးမှုနိမ့့် လမ်းကြောင်း** (`lowPriorityMode`):

- wall 429 တွင် executor သည် offer ကို လက်ခံပြီး `anthropic-usage-limit: slow` ဖြင့် **တူညီသော** account ကို ချက်ချင်း retry လုပ်သည်။ lane သည် ကြေညာထားသော `anthropic-ratelimit-unified-reset` (+60s grace) အထိ active ဆက်လက်ရှိနေပြီး ထို window အတွင်းရှိ request တိုင်းတွင် header ပါဝင်သည်။ intercept လုပ်ခံထားရသော 429 သည် `handleChatCore` ဆီသို့ ဘယ်တော့မှ မရောက်ရှိသဖြင့် connection ကို cooldown အတွင်း **မထည့်ပါ** ဘူးနှင့် rotate လုပ်၍ ဖယ်ရှားခြင်းလည်း မခံရပါ။
- နောက်ပိုင်း response များပေါ်ရှိ `anthropic-ratelimit-unified-slow-status` — `active` / `not_needed` သည် lane ကို ဆက်လက်ထိန်းထားသည်။ `slot_busy` (429) သို့မဟုတ် `529` တစ်ခုသည် server ၏ `anthropic-ratelimit-unified-slow-retry-after` (မူရင်းတန်ဖိုး 20s၊ clamp 5–600s၊ ±30% jitter) ကို စောင့်ဆိုင်းပြီး retry လုပ်သည်၊ `anthropic-ratelimit-unified-slow-max-wait` (မူရင်းတန်ဖိုး 20 မိနစ်၊ clamp 1 မိနစ်–6 နာရီ) ဖြင့် ကန့်သတ်ထားသည် — ထိုအရpswd ကျော်လွန်သွားပါက lane ပြီးဆုံးသွားပြီး 10 မိနစ် cool-off က ပြန်လည်လက်ခံမှုကို တားဆီးသည်။ wait သည် request ၏ကိုယ်ပိုင် upstream-start timeout (`resolveFetchStartTimeout`၊ မူရင်းအားဖြင့် 10 မိနစ်) ၏ ကျန်ရှိချိန်ထဲမှ 5 s margin နုတ်ထားသောပမာဏဖြင့် ထပ်မံကန့်သတ်ခံထားရသည်။ ထို cap မရှိပါက 20 မိနစ် မူရင်း max-wait သည် request ထက် ပိုမိုကြာရှည်သွားပြီး sleep သည် wait အလယ်ခေါင်တွင် abort ခံရမည်ဖြစ်ကာ graceful `max_wait` အဆုံးသတ် + cool-off အစား `TimeoutError` ပေါ်ပေါက်စေလိမ့်မည်။
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`၊ 5 နာရီ window rollover၊ သို့မဟုတ် `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (paid overage က wall ကို ယခုအခါ လုံး၀ ကာကွယ်ပေးနေသောကြောင့် မည်သည့် status ပေါ်မူတည် `extra_usage` အဖြစ် အဆုံးသတ်စေသည်) တို့သည် lane ကို အဆုံးသတ်စေသည်။ response သည် ထိုနောက် ပုံမှန် cooldown လမ်းကြောင်းသို့ စီးဝင်သွားသည်။ `budget_exhausted` ကို ကြေညာထားသော budget reset (≤ 8 ရက်) အထိ မှတ်သားထားသည်။
- wall စစ်ဆေးမှုသည် executor ၏ကိုယ်ပိုင် 400-driven intra-attempt retry များ (context editing၊ thinking/effort clamp များ၊ param auto-learn) ပြီးဆုံးနောက်တွင် run သောကြောင့် ထို retry များအနက်မှ တစ်ခုတွင်သာ ပေါ်ပေါက်လာသော wall 429 သည်ပင် cooldown လမ်းကြောင်းသို့ ရောက်ရှိခြင်းမပြုဘဲ intercept ခံရဆဲဖြစ်သည်။
- State သည် connection တစ်ခုချင်းစီအတွက် in-memory ဖြစ်သည် (restart တစ်ကြိမ်က ပြန်လည်လက်ခံရန်အတွက် နောက်ထပ် wall 429 တစ်ခု ကုန်ကျစေသည်)။

**Session-limit reset** (`autoLimitReset`၊ နှစ်ခုလုံး ဖွင့်ထားသည့်အခါ lane မတိုင်မီ စမ်းသပ်သည်):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` block; `arm: "reset"` နှင့် `available: true` ဖြစ်သည့်အခါ `{ "program": "juniper_tide" }` ဖြင့် `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` (organization UUID သည် `providerSpecificData.organizationUUID` မှ၊ bootstrap fallback)။
- `result: reset|not_limited` → request ကို အမြန်နှုန်းအပြည့်ဖြင့် retry လုပ်သည် (slow header မပါ)။ `already_used` / `not_offered` သည် `next_available_at` ကို memoise လုပ်သည် (မူရင်းတန်ဖိုး တစ်ပတ်)။ မည်သည့် failure မဆို 15 မိနစ် backoff လုပ်သည်။ reset သည် တစ်ပတ်လျှင် တစ်ကြိမ်ဖြစ်ပြီး weekly limit ထဲသို့ ဆက်လက်ထည့်သွင်းတွက်ချက်ခံရသည်။

Regression guard များ: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`။

### Session affinity (#7274)

**အကျုံးဝင်မှု:** client session တစ်ခု (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ကို connection တစ်ခုသို့ pin လုပ်ထားခြင်း၊ **မည်သည့်** provider အတွက်မဆို။

**ရည်ရွယ်ချက်:** multi-turn agent တစ်ခု (Claude Code၊ aider၊ custom agent များ) ကို request များစွာအတ င်း တူညီသော account ပေါ်တွင် ဆက်လက်ထားရှိခြင်း၊ per-account session state ရှိသော provider များတွင် account ကြား context ဆုံးရှုံးမှုနှင့် ထပ်တလဲလဲ cold-start 429 များကို လျှော့ချခြင်း။

**အကောင်အထည်ဖော်မှု:**

- TTL ဆုံးဖြတ်ချက်: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin ရွေးချယ်မှု/ဖန်တီးမှု: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header ထုတ်ယူမှု (ယေဘုယျ၊ မည်သည့် provider မဆို): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persist လုပ်ထားသော pin ဇယား: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (ms အတွင်း global TTL၊ `0` သည် ပိတ်ခြင်း) — `src/lib/db/settings.ts`။ Codex-only `codexSessionAffinityTtlMs` မှ migration `124_generic_session_affinity_ttl.sql` ဖြင့် အမည်ပြောင်းလဲထားခြင်းဖြစ်ပြီး၊ ၎င်းက ယခင်က configure လုပ်ထားသော Codex TTL မည်သည့်အရာကိုမဆို မူရင်းအသစ်အဖြစ် လွှဲပြောင်းယူဆောင်လာသည်။

#7274 မတိုင်ခင် `resolveSessionAffinityTtlMs()` သည် `codex` မဟုတ်သော provider တိုင်းအတွက် `0` သို့ hard-bail လုပ်သောကြောင့် pinning mechanism နှင့် header extraction တို့သည် provider-agnostic ဖြစ်နေပြီဖြစ်သော်လည်း TTL setting (နှင့် session header များ) သည် အခြားနေရာများတွင် အကျိုးသက်ရောက်မှုမရှိခဲ့ပါ။ ထို fix က early-return ကို ဖယ်ရှားလိုက်သည်။ TTL သည် ယခု `0` ထက် မြင့်မားစွာ global ဖြင့် သတ်မှတ်ပြီးနောက်တွင် provider တိုင်းသို့ ညီညွတ်စွာ သက်ရောက်သည်။

Session-affinity header သုံးခုကို upstream သို့ ဘယ်တော့မှ forward မလုပ်ပါ — executor များသည် client header များကို pass-through လုပ်ခြင်းမပြုဘဲ ၎င်းတို့၏ကိုယ်ပိုင် upstream header များကို အစမှတဖန် တည်ဆောက်သောကြောင့် ၎င်းသည် internal correlation id အဖြစ်သာ ဆက်လက်ရှိနေပါသည်။

### သီးသန့် managed session connection lease များ

**အကျုံးဝင်မှု:** active managed HTTP client/session တစ်ခုသည် အရည်အချင်းပြည့်မီသော OmniRoute connection တစ်ခုကို ပိုင်ဆိုင်သည်။

**ရည်ရွယ်ချက်:** request များစွာအတင်း hard routing fence လိုအပ်သော client များအတွက် တာရှည်ခံသော သီးသန့် connection ပိုင်ဆိုင်မှုကို ပေးစွမ်းခြင်း။ ၎င်းသည် soft continuity preference ဖြစ်သော session affinity နှင့် ကွာခြားသည် — သီးသန့် lease တစ်ခုသည် lifecycle state ကို SQLite အတွင်း persist လုပ်ထားပြီး၊ global active-owner နှင့် active-connection uniqueness ကို စည်းကမ်းချက်ဖြင့် အာမခံစေကာ၊ provider dispatch မပြုလုပ်မီ stale generation ကို ပယ်ချသည်။

ဤ feature သည် API key တစ်ခုချင်းစီအလိုက် opt-in ဖြစ်သည်။ managed key တစ်ခုတွင် `lease:exclusive` scope နှင့် explicit non-empty `allowedConnections` list ရှိရမည်။ မည်သည့် HTTP client မဆို lifecycle endpoint ကို အသုံးပြုနိုင်သည်။ client name၊ user-agent၊ provider၊ OAuth method သို့မဟုတ် model မည်သည့်အရာမျှ မလိုအပ်ပါ။ lease သည် model မဟုတ်ဘဲ connection ကို ပိုင်ဆိုင်သောကြောင့် connection သည် ပုံမှန်အတိုင်း အရည်အချင်းပြည့်မီနေဆဲဖြစ်သမျှ model ပြောင်းလဲမှုသည် binding ကို ဆက်လက်ထိန်းသိမ်းထားနိုင်သည်။ ပုံမှန် model၊ quota၊ health၊ cooldown နှင့် allowlist စည်းမျဉ်းများသည် authoritative ဆက်လက်ဖြစ်နေပြီး တူညီသော generation ကို အခြား free ဖြစ်နေသော အရည်အချင်းပြည့်မီသော connection တစ်ခုသို့ လွှဲပြောင်းနိုင်သည်။

Lifecycle ကို `POST /api/v1/session-leases` ဖြင့် JSON action များ `acquire`၊ `renew` နှင့် `release` ဖြင့် ဆောင်ရွက်သည်။
Managed inference request များသည် opaque `X-OmniRoute-Lease-Owner` တန်ဖိုးနှင့် တိကျသော
`X-OmniRoute-Lease-Generation` ကို တင်ပြသည်။ Owner သည် `vlo_` ပြီးနောက် base64url စာလုံး 43 လုံး ကို အသုံးပြုသည်;
၎င်း၏ SHA-256 hash ကိုသာ သိမ်းဆည်းသည်။ နောက်ဆုံး dispatch fence တိုင်းသည် အတည်ပြုထားသော API key ID နှင့်
active connection ID ကိုလည်း ချည်နှောင်ထားသည်။ Lease control header များကို log များ၊ သိမ်းဆည်းထားသော request
snapshot များနှင့် upstream executor header များမှ ဖယ်ရှားသည်။

ပုံမှန် routing တွင် eligible managed candidate များ ရှိနေသော်လည်း free candidate တိုင်းကို
foreign active lease မှ သိမ်းပိုက်ထားပါက၊ OmniRoute သည် HTTP `429`၊ lease-capacity-unavailable code၊
waiting-for-capacity state နှင့် သက်ဆိုင်ရာ အစောဆုံး သက်တမ်းကုန်ဆုံးချိန်မှ ရရှိသော bounded `Retry-After`
ကို ပြန်ပေးသည်။ ပုံမှန် empty eligibility သည် lease contention မဟုတ်ပဲ ၎င်း၏ လက်ရှိ routing error semantics
ကို ထိန်းသိမ်းထားဆဲ ဖြစ်သည်။

ဆက်စပ် mechanism များသည် ခွဲခြားထားဆဲဖြစ်သည်—

- OAuth session occupancy သည် OAuth account များအတွက် process-local soft distribution ဖြစ်သည်။
- Account semaphore များသည် request-concurrency permit များ ပေးအပ်ပြီး request ပြီးဆုံးသည့်အခါ ရပ်ဆိုင်းသည်။
- Exclusive managed session lease များသည် generation fence ပါရှိသော durable lifecycle ownership ဖြစ်သည်။

---

## 3. Model Lockout

**နယ်ပယ် (Scope):** provider + connection + model သုံးခုပေါင်း။

**Status အလိုက် key နယ်ပယ်:** ပျက်စီးသွားသော status က lockout ကို မည်သည့် key သို့
ရေးသွင်းမည်ကို ဆုံးဖြတ်သည် (`open-sse/services/accountFallback/exactModelLock.ts` ရှိ
`resolveLockoutScope()`):

- `429` / `403` / `402` — quota သို့မဟုတ် entitlement signal — **quota family** ကို
  lock လုပ်သည်- codex အတွက်ဆိုရင် `codex` / `spark` နယ်ပယ်တစ်ခုလုံး (ထို
  connection ၏ `gpt-5*` model အားလုံး)၊ အခြား provider များအတွက်
  `getQuotaScopedModelForProvider()`။
- `404` က bare model ကို lock လုပ်သည် (`getModelLockKey()` က `not_found` ကို
  ကျဉ်းစောင်းစေသည်)။
- အခြား status မည်သည်ဖြစ်စေ — `5xx` transport/server ပျက်စီးမှုများနှင့်
  OmniRoute ကိုယ်တိုင် quality validation မှ synthesized ပြုလုပ်သော `502` —
  **တိကျသော** provider/connection/model tuple ကိုသာ lock လုပ်သည်။ Model တစ်ခုရှိ
  bad stream တစ်ခုသည် ထို account ၏ quota အကြောင်းကို သက်သေခံပေးခြင်း မဟုတ်ပါ။
  ဤစည်းမျဉ်းမရှိမီက `codex/gpt-5.6-luna` ပေါ်တွင် response အလွတ်
  တစ်ကြောင်းတည်းက ထို connection ၏ `gpt-5*` model အားလုံးကို routing ထဲမှ
  မိနစ် ၂–၃၀ (တိုးတက်လာသော) ကြာအောင် ဖယ်ထုတ်သွားနိုင်ပြီး ၎င်း၏ quota ကို
  လုံးဝ ထိခိုက်စေခြင်း မရှိပါ။
- ခေါ်ဆိုသူ၏ တည်ရှိသော `scope` option က အမြဲတမ်း အောင်မြင်သည် (Antigravity က
  `"exact"` ကို လွှတ်ပါသည်)။

**ရည်ရွယ်ချက်:** Model တစ်ခုတည်းသာ မရရှိနိုင်ခြင်း သို့မဟုတ် quota ကန့်သတ်ခံထားရခြင်းကြောင့်
connection တစ်ခုလုံးကို ပိတ်ထားခြင်းမှ ရှောင်လွှဲရန်။

**ဥပမာများ:**

- Per-model quota provider များမှ 429 ပြန်ပေးခြင်း
- Local provider များမှ ပျောက်နေသော model တစ်ခုအတွက် 404 ပြန်ပေးခြင်း
- Provider-specific mode/model permission ပျက်စီးမှုများ (ဥပမာ- Grok mode များ)

**အကောင်အထည်ဖော်မှု:** `open-sse/services/accountFallback.ts` — `lockModel()`၊
`clearModelLock()`၊ `getAllModelLockouts()`။

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

လတ်တလော lockout များကို provider၊ connection၊ model၊ reason၊ expiresAt
တို့ဖြင့် စာရင်းပြ显示出သည်။ Operator များသည် model တစ်ခုကို ထို card မှ
လက်ဖြင့် ပြန်ဖွင့်နိုင်သည်။

**REST API:**

- `GET /api/resilience/model-cooldowns` — လတ်တလော lockout များကို စာရင်းပြ
- `DELETE /api/resilience/model-cooldowns` — လက်ဖြင့် ပြန်ဖွင့်ခြင်း။ Body: `{provider, connection, model}`။ Auth: management။

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)။

Provider စာမျက်နှာတစ်ခုစီအစား ယာယီအကြောင်းပြချက်တစ်ခုကြောင့် routing ထဲမှ ထွက်နေသော
connection တိုင်းအတွက် စာမျက်နှာတစ်ခုတည်း။ ၎င်းက connection cooldown များ၊ model
lockout များနှင့် terminal state များကို စာရင်းပြ显示出ပြီး၊ connection အလိုက်၊ ရွေးချယ်မှု
တစ်ခုအတွက်၊ သို့မဟုတ် provider တစ်ခု၏ connection အားလုံးအတွက် ဖျက်ပစ်နိုင်ကာ၊
အများဆုံး tune လုပ်ကြသော cooldown စည်းမျဉ်းများဖြစ်သော
`streamStallCooldown.enabled` နှင့် OAuth / API-key `connectionCooldown` base
cooldown နှင့် maximum backoff steps များကို ပြင်ဆင်နိုင်သည်
(`PATCH /api/resilience` မှတစ်ဆင့် သိမ်းဆည်းသည်)။ Terminal state များ
(`banned`၊ `expired`၊ `credits_exhausted`) ကို စာရင်းပြ显示出သော်လည်း ဤနေရာတွင်
ဘယ်တော့မျှ ဖျက်ပစ်ခြင်း မပြုပါ။

**REST API** (`src/lib/resilience/cooldownManager.ts`၊ auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status၊ ကျန်ရှိသော cooldown၊
  backoff level၊ နောက်ဆုံး error အမျိုးအစားနှင့် model lockout များပါရှိသော
  connection များ (credential များ မပါ)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` သို့မဟုတ်
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ကို ပြန်ပေးသည်

### Lockout settings UI + success-decay ပြန်လည်ရရှိမှု (v3.8.23)

Model lockout သည် အမြဲတမ်းဖွင့်ထားသော hardcode လုပ်ထားသော အပြုအမူမှ ကိုယ်ပိုင်
settings card နှင့် ကိုယ်တိုင်ကုစားနိုင်သော ပြန်လည်ရရှိမှု လမ်းကြောင်းပါရှိသော
အပြည့်အဝ configure လုပ်နိုင်ပြီး opt-in ဖြစ်သော feature တစ်ခုသို့ ပြောင်းလဲသွားသည်။

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)။
ဤသည် အပေါ်တွင် ဖော်ပြထားသော read-only `ModelCooldownsCard` (လတ်တလော
lockout များကို စာရင်းပြ显示出ခြင်းသာ) နှင့် **ကွာခြားသည်** — card အသစ်က
_parameter များကို configure လုပ်သည်_။ Default များသည်
`DEFAULT_MODEL_LOCKOUT_SETTINGS` (`src/lib/resilience/modelLockoutSettings.ts`)
ထဲတွင် ရှိသည်-

| Setting                 | Default                          | အဓိပ္ပာယ်                                                              |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout ကို **default အနေဖြင့် ပိတ်ထားသည်**။     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model-scoped ပျက်စီးမှုအဖြစ် ရေတွက်သော upstream status များ။           |
| `baseCooldownMs`        | `120_000` (120 စက္ကန့်)          | ပထမဆုံး ပျက်စီးမှုအတွက် ကနဦး lockout ကြာချိန်။                         |
| `maxCooldownMs`         | `1_800_000` (မိနစ် ၃၀)           | တိုးတက်လာသော cooldown ၏ အထက်နည်း။                                      |
| `maxBackoffSteps`       | `10`                             | အများဆုံး exponential-backoff တိုးတက်လာမှု အဆင့်များ။                  |
| `useExponentialBackoff` | `true`                           | ထပ်ခါထပ်ခါ ပျက်စီးမှုများက cooldown ကို exponential ပုံစံတိုးစေမည်လား။ |

Settings များကို ပုံမှန် settings store မှတစ်ဆင့် ထပ်တူ persist လုပ်ပြီး resilience
settings schema ဖြင့် validate လုပ်သည်။ ထို card က `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` ဖြင့်) နှင့် `maxBackoffSteps` ကို clamp လုပ်သည်။

**Success-decay ပြန်လည်ရရှိမှု:** ပြန်လည်ရရှိမှုသည် timer သက်တမ်းကုန်ခြင်း
တစ်ခုတည်း **မဟုတ်ပါ**။ ကျန်းမာသော response တစ်ခုက model ၏ ပျက်စီးမှုအရေအတွက်ကို
နောက်ပြန်လျှော့ချသဖြင့် window အလယ်တွင် ပြန်လည်ကောင်းမွန်သွားသော model တစ်ခုသည်
၎င်း၏ timer မကုန်မီ တိုးတက်လာခြင်း (နှင့် ရှင်းလင်းသွားခြင်း) ရပ်တန့်သွားစေသည်။ Combo
target အောင်မြင်မှုတွင် `open-sse/services/combo.ts` က
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) ကို
ခေါ်ဆိုပြီး ၎င်းက သိမ်းထားသော `failureCount` ကို **တစ်ဝက်ချ**သည်
(`Math.floor(failureCount / 2)`)။ ၎င်း `0` သို့ရောက်သွားသောအခါ lockout entry ကို
လုံးဝ ဖျက်ပစ်သည်။ ၎င်း၏ မိတ်ဆွေ `recordModelLockoutFailure()` က escalation
window အတွင်းရှိ ပျက်စီးမှုများတွင် အရေအတွက်ကို တိုးပွားစေသည် (နှင့် cooldown ကို
တိုးတက်စေသည်)။ ဤ success-decay သည် timer သက်တမ်းကုန်ခြင်း သာမက — လမ်းကြောင်း
နှစ်ခုလုံးက model တစ်ခုကို ပြန်ဖွင့်နိုင်သည်။

**State:** lockout များကို **in-memory** တွင် သိမ်းထားသည် (process တစ်ခုချင်း၏
`ModelLockoutEntry` `Map` များ — `provider:connectionId:model` ဖြင့် key
လုပ်ထားပြီး၊ exact-scope lock များကို `provider:connectionId:exact:model` ဖြင့်)၊
DB သို့ persist မလုပ်ပါ — restart လုပ်သောအခါ ပျက်ဆုံးသွားသည်။ _Settings_ များကို
persist လုပ်သော်လည်း လတ်တလော lockout _state_ ကို ephemeral အနေဖြင့်
သိမ်းထားသည်။

---

## 4. Quota-Share တစ်ပြိုင်နက်တည်းအသုံးပြုမှု (Concurrency) ထိန်းချုပ်ခြင်း (v3.8.36)

Subscription account များ (GLM, MiniMax စသည်) သည် တစ်ပြိုင်နက်တည်း တောင်းဆိုမှု ~1–3 ခုခန့်သာ လက်ခံတတ်ကြပြီး၊ ထိုအရေအတွက်ထက် ကျော်လွန်ပါက 429 များနှင့် cooldown များ ဖြစ်စေသည်။ API key အများအပြားက upstream account တစ်ခုတည်းကို မျှဝေအသုံးပြုသည့် **quota-share** (`qtSd/…`) combo များတွင် ဤပြဿနာသည် အထူးပြင်းထန်သည်။ မျှဝေအသုံးပြုထားသော account တစ်ခု တောင်းဆိုမှုများနှင့် ပြည့်နှက်သွားခြင်းမှ ကာကွယ်ရန် အလွှာသုံးခု ရှိသည်။

### Connection အလိုက် concurrency cap (`max_concurrent`)

Provider connection တစ်ခုချင်းစီသည် `max_concurrent` ceiling ကို ကြေညာနိုင်သည် (`provider_connections.max_concurrent`၊ connection modal / API / DB တွင် သတ်မှတ်ပါ)။ ကန့်သတ်ချက်မထားလိုပါက ဗလာထားပါ။ ဤသည်မှာ အောက်ပါ serialization layer ကို မောင်းနှင်စေသော ခလုတ်တစ်ခုတည်း ဖြစ်သည် — ၎င်းကို account ၏ အမှန်တကယ် concurrency (ဥပမာ GLM ~1, MiniMax ~2) သို့ သတ်မှတ်ပါ။

### Model အလိုက် concurrency cap များ (`modelConcurrency`)

Connection တစ်ခုသည် ၎င်း၏ `rateLimitOverrides` map အတွင်းတွင် model တစ်ခုချင်းစီအတွက် အတိအကျ concurrency ceiling များကို ထပ်မံကြေညာနိုင်သည်။

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

၎င်းကို connection modal (**Rate limit overrides → Model အလိုက် concurrency cap များ**၊ တစ်လိုင်းချင်းစီတွင် `model=cap` တစ်ခု) တွင် သတ်မှတ်နိုင်သည်၊ သို့မဟုတ် တူညီသော JSON ပုံစံဖြင့် `PATCH /api/providers/[id]` မှတစ်ဆင့် သတ်မှတ်နိုင်သည်။ အဓိက semantics များ−

- **Connection အလုံးစုံ နှင့် model သီးသန့်:** `maxConcurrent` သည် မျှဝေသုံး connection အလုံးစုံ ceiling အဖြစ် ဆက်လက်တည်ရှိသည်။ နှစ်ခုလုံး သက်ဆိုင်သောအခါ၊ gate နှစ်ခုလုံးကို composite gate တစ်ခုတည်း (`global → provider → account → model`) အတွင်း atomically ရယူသည်။ ထိရောက်သော အပြုအမူမှာ ပိုမိုတင်းကြပ်သော သက်ဆိုင်ရာ ကန့်သတ်ချက် ဖြစ်သည်။
- **Model-key အတိအကျ ကိုက်ညီမှု:** key သည် routing resolution ပြီးနောက် executor သို့ ပေးပို့သော model string ဖြစ်သည် — ပုံမှန်အားဖြင့် bare upstream model id (`glm-5`) ဖြစ်ပြီး client-side `provider/model` alias မဟုတ်ပါ (`zai/glm-5` သည် `glm-5` နှင့် မကိုက်ညီပါ)။ တန်ဖိုးများမှာ positive-integer တစ်ပြိုင်နက်တည်း တောင်းဆိုမှု ceiling များ ဖြစ်သည်။
- **Local queueing၊ discovery မပြုခြင်း:** ပိုလျှံသော တောင်းဆိုမှုများသည် ရှိရင်းစွဲ queue/timeout semantics များအတိုင်း local တွင် queue ဝင်သည် (typed `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` admission error များ)။ OmniRoute သည် upstream policy ကို ရှာဖွေတွေ့ရှိခြင်း သို့မဟုတ် ခန့်မှန်းခြင်း မပြုပါ — operator က သတ်မှတ်ထားသော အတိအကျ ceiling များကိုသာ enforce လုပ်သည်။ ပြည့်နေသော model gate သည် provider ကို ဘယ်တော့မှ disable မလုပ်ပါ၊ အမြဲတမ်း model lockout ကိုမျှ မဖန်တီးပါ။ upstream 429/cooldown/fallback အပြုအမူမှာ error backstop အဖြစ် ဆက်လက်တည်ရှိနေသည်။
- **Connection တစ်ခုချင်း၊ process တစ်ခုချင်း scope:** cap များသည် database connection တစ်ခုချင်းစီအတွက် ဖြစ်ပြီး memory အတွင်းတွင် သိမ်းဆည်းထားသောကြောင့်၊ upstream API key တစ်ခုတည်းကို ပြန်လည်အသုံးပြုသော connection နှစ်ခုသည် အချင်းချင်း coordinate မလုပ်ကြပါ။
- **မသတ်မှတ်ထားခြင်းသည် မပြောင်းလဲခြင်းကို ဆိုလိုသည်:** map ကို ချန်လှပ်ထားခြင်း (သို့မဟုတ် dashboard field ကို ဗလာထားခြင်း) သည် model gate မထပ်ပေါင်းပါ။ မည်သည့် ယေဘုယျ provider ကန့်သတ်ချက်ကိုမျှ အတည်မပြုဘဲ ဥပမာ configuration−

```text
glm-5=1
glm-4.7=3
```

### Quota-share တောင်းဆိုမှု serialization

Quota-share dispatch တစ်ခုသည် positive `max_concurrent` ကြေညာထားသော connection ကို ပစ်မှတ်ထားသောအခါ၊ အဆိုပါ **account** သို့ တစ်ပြိုင်နက်တည်း တောင်းဆိုမှုများကို connection အလိုက် semaphore (key `qsconn:<connectionId>`) မှတစ်ဆင့် serialized ပြုလုပ်သည်။ ပိုလျှံသော တောင်းဆိုမှုများသည် account ကို flood မဖြစ်စေဘဲ **queue အတွင်းတွင် စောင့်ဆိုင်းနေသည်**။ ၎င်းသည် **fail-open** ဖြစ်သည် — queue ပြည့်ခြင်း သို့မဟုတ် timeout ဖြစ်ပါက slot မရရှိဘဲပင် ဆက်လက်လုပ်ဆောင်ပြီး၊ dispatch လုပ်နိုင်သော တောင်းဆိုမှုကို ဘယ်တော့မှ ငြင်းပယ်ခြင်း မပြုပါ။ **ဆက်တင်များ → ခံနိုင်ရည်ရှိမှု → Quota-share connection အလိုက် concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`၊ default on) တွင် toggle လုပ်နိုင်သည်။ `max_concurrent` cap မရှိပါက အပြုအမူ မပြောင်းလဲပါ။

> Quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) သည် ၎င်းကိုယ်တိုင်လည်း fail-open ဖြစ်ပြီး cap ရောက်နေသော connection ကို _ဦးစားပေးမှုလျှော့ချခြင်း_ သာ ပြုလုပ်သည် — connection တစ်ခုတည်းပါ pool တွင် hard-limit ချနိုင်ခြင်း မရှိသောကြောင့်၊ ဤ semaphore မှာပဲ flood ကို တကယ့် ထိန်းသိမ်းပေးသော အရာ ဖြစ်သည်။

### Combo cooldown ကို သတိပြုသော retry

Combo strategy အားလုံး (enable လုပ်ထားသောအခါ) အတွက်၊ SHORT transient cooldown ကြောင့် 429 တစ်ခု ဖြစ်ပေါ်လာစေမည့် တောင်းဆိုမှုသည် 429 ကို ပြန်ပို့မည့်အစား ၎င်းကို စောင့်ဆိုင်းပြီးနောက် ပြန်လည် dispatch လုပ်သည် — ဤသည်မှာ multi-model combo များပေါ်ရှိ Gemini-class TPM/RPM window များ (~60s retry-after) ကို လွှမ်းခြုံပေးသည်၊ ဥပမာ 2-model combo ၏ target နှစ်ခုလုံး model အလိုက် rate limit ထိခိုက်ခြင်း။ **ဆက်တင်များ → ခံနိုင်ရည်ရှိမှု** ရှိ `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ဖြင့် ကန့်သတ်ထားသည်။ ၎င်းသည် `quota_exhausted` (သန်းခေါင်ယံအထိ lock ချထားခြင်း) သို့မဟုတ် auth/not-found အကြောင်းရင်းများအတွက် ဘယ်တော့မှ မစောင့်ပါ။

တူညီသော gate သည် pre-dispatch case (#16319) ကိုလည်း လွှမ်းခြုံပေးသည်။ combo ၏ target အားလုံးသည် ၎င်းတို့၏ model များ short transient lockout အတွင်းတွင် ရှိနေသောကြောင့် မည်သည့် ကြိုးပမ်းမှုမျှ မပြုလုပ်ရသေးဘဲ skip ခံရသောအခါ၊ zero-attempt path သည် hint-less `503 ALL_TARGETS_SKIPPED` ကို ဖြေကြားမည့်အစား တူညီသော ceiling များအောက်တွင် lock ကို စောင့်ဆိုင်းပြီး ပြန်လည် dispatch လုပ်သည်။ စောင့်ဆိုင်းခွင့် မပြုနိုင်သောအခါ (ceiling၊ attempt သို့မဟုတ် budget ကုန်ဆုံးခြင်း၊ သို့မဟုတ် feature ပိတ်ထားခြင်း)၊ terminal response သည် အစောဆုံး transient lock သက်တမ်းကုန်ချိန်မှ `retry_after` / `reset_at` ကို သယ်ဆောင်လာသည့် `429 rate_limit_error` သို့ upgrade ဖြစ်သည်။ quota၊ auth နှင့် not-found lock များကမူ hint-less 503 ကို ဆက်လက်ထားရှိသည်။

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. တောင်းဆိုမှုတန်းစီစာရင်း ဝင်ခွင့်ထိန်းချုပ်မှု (v3.8.49 · issue #6593)

**သက်ရောက်မှုနယ်ပယ်**: အထက်ပါ ယန္တရားသုံးခု၏ အောက်တစ်ဆင့်တွင်ရှိသော local per-provider+connection rate-limit queue (`open-sse/services/rateLimitManager.ts`,
Bottleneck ဖြင့် ပံ့ပိုးထားသည်)။

**`maxWaitMs` သည် တန်းစီစာရင်းစောင့်ချိန်ကို ကန့်သတ်ပြီး၊ `executionMaxWaitMs` သည် လုပ်ဆောင်ချိန်ကို ကန့်သတ်သည်။**
ဤနှစ်ခုကို ရည်ရွယ်ချက်ရှိရှိ သီးခြားခွဲထားပြီး တစ်ခု၏တန်ဖိုးကို အခြားတစ်ခုထံ မပေးပို့ပါ။

`resilienceSettings.requestQueue.maxWaitMs` သည် **တန်းစီစာရင်းစောင့်ဆိုင်းမှု အချိန်ခွဲတမ်း** ဖြစ်သည်။ ၎င်းတွင် provider slot တစ်ခုကို စောင့်ဆိုင်းခြင်းနှင့် ထို့နောက် QUEUED အခြေအနေတွင် ရှိနေခြင်းတို့ ပါဝင်ပြီး၊ job သည် QUEUED မှ ထွက်၍ စတင်လုပ်ဆောင်သည့်အချိန်တွင် ၎င်း၏ timer ကို ချက်ချင်းရှင်းလင်းသည်
(`rateLimitManager.ts`, `wrappedFn`)။ ထိုအချိန်ကို ကျော်လွန်သည့် တောင်းဆိုမှုသည် upstream သို့ လုံးဝမရောက်ပါ။ မူလတန်ဖိုးမှာ 30000ms ဖြစ်ပြီး `src/lib/resilience/settings.ts` ရှိ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
က ပံ့ပိုးကာ `tests/unit/ratelimit-admission-control-6593.test.ts` ဖြင့် သတ်မှတ်အတည်ပြုထားသည်။ ထို့ကြောင့် ၎င်းတန်ဖိုးကို ပြောင်းလဲပါက ဤစာပိုဒ်ကို သတိမပြုဘဲ ခေတ်နောက်ကျကျန်ရစ်စေမည့်အစား ထိုစမ်းသပ်မှု ပျက်ကွက်မည်ဖြစ်သည်။

`resilienceSettings.requestQueue.executionMaxWaitMs` သည် job ၏ `expiration` အဖြစ် Bottleneck ထံ ပေးပို့သည့်တန်ဖိုးဖြစ်ပြီး ၎င်း၏ timer သည် dispatch လုပ်ပြီးနောက်မှသာ စတင်သည်။ ၎င်းသည် ကိုယ်ပိုင် upstream timeout မရှိသော executor များအတွက် နောက်ဆုံးအကာအကွယ်ဖြစ်ပြီး executor ၏ ကိုယ်ပိုင် fetch-start timeout က ပိုကြာပါက ထိုအချိန်အထိ တိုးမြှင့်ပေးသည်။ ထို့ကြောင့် ကောင်းမွန်စွာ လည်ပတ်နေသည့် in-flight response ကို အလယ်တွင် ဖြတ်တောက်မည်မဟုတ်ပါ။ မူလတန်ဖိုးမှာ 600000ms (10 မိနစ်) ဖြစ်သည်။

တန်းစီစာရင်းအချိန်ခွဲတမ်းကို `expiration` ထဲသို့ ထည့်ပေးခဲ့ခြင်းသည် ယခင်က non-incremental gateway များကို လုပ်ဆောင်နေစဉ် အလယ်တွင် ရပ်တန့်စေခဲ့သည့် အကြောင်းရင်းဖြစ်သည် — ၎င်းတို့သည် ပထမဆုံး byte များ မရောက်မီ မိနစ်အတော်ကြာ လုပ်ဆောင်နိုင်ခြင်းမှာ တရားဝင်ဖြစ်သည် — ထို့ကြောင့် expiration တစ်ခုကို `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) အဖြစ် ဖော်ပြသော်လည်း တန်းစီစာရင်းအချိန်ခွဲတမ်းတွင် queue-timeout code ပါရှိသည်။ တစ်ခုခုကို `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) သို့မဟုတ် dashboard
(**Settings → Resilience**) မှတစ်ဆင့် အစားထိုးသတ်မှတ်နိုင်သည်။ နှစ်ခုစလုံးကို normalise လုပ်သည့်အခါ 1ms–24h အတွင်း ကန့်သတ်ထားသည်။

**နှစ်ခုစလုံးအတွက် ဦးစားပေးအစီအစဉ်:** env var သည် _မူလတန်ဖိုး_ ကိုသာ ပံ့ပိုးသည်။ `resilienceSettings.requestQueue` တွင် သိမ်းဆည်းထားသောတန်ဖိုး (dashboard / API patch မှ သတ်မှတ်ပြီး `key_value` တွင် သိမ်းထားသည့်တန်ဖိုး) သည် ၎င်းထက် ဦးစားပေးပြီး၊ per-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` သည် ထိုတန်ဖိုးထက် ထပ်မံဦးစားပေးသည်။ ထို့ကြောင့် သိမ်းဆည်းထားသောတန်ဖိုး ရှိပြီးသား deployment တစ်ခုတွင် env var ကို သတ်မှတ်ခြင်းသည် မည်သည့်အရာကိုမျှ မပြောင်းလဲစေပါ — ယင်းအစား သိမ်းဆည်းထားသော setting ကို ရှင်းလင်းပါ သို့မဟုတ် အပ်ဒိတ်လုပ်ပါ။

တန်းစီစာရင်းတွင် ရှိနေသည့်အချိန်ကို `maxWaitMs` ဖြင့် ကန့်သတ်ပြီး၊ အောက်ပါ `maxQueueDepth` က တစ်ပြိုင်နက်တည်း တန်းစီနိုင်သည့် caller အရေအတွက်ကို ကန့်သတ်သည်။

**Body တွင် ဖော်ပြထားသော ပြန်လည်ကြိုးစားမှုများ: အရှိန်ထိန်းခြင်းနှင့် လော့ခ်ချခြင်း။** 429 body တစ်ခုက ၎င်း၏ ကိုယ်ပိုင်စောင့်ချိန်ကို သတ်မှတ်နိုင်သည်
(Gemini `RetryInfo.retryDelay`, "retry after Ns" စာသား)၊ ၎င်းကို
`updateFromResponseBody` က ဖတ်သည်။ Connection ၏ `maxWaitMs` အတွင်း ဝင်ဆံ့သည့် စောင့်ချိန်သည် အရှိန်ထိန်းခြင်းဖြစ်သည်။ Limiter သည် ထိုကြာချိန်အတွက် ၎င်း၏ reservoir ကို လွတ်အောင်လုပ်ပြီး၊ တန်းစီထားသော call များသည် reservoir ပြန်လည်ဖြည့်သည့်အခါ dispatch လုပ်သည်။ `maxWaitMs` ထက် ပိုကြာသော စောင့်ချိန်ကို တန်းစီစာရင်းက စောင့်ဆိုင်းကျော်ဖြတ်၍ မရပါ — Gemini သည် တစ်ရက်စာ quota ကုန်ဆုံးနေပါက
`retryDelay: "86399s"` ဖြင့် တုံ့ပြန်သည်။ ပြန်လည်တည်ဆောက်ထားသော 429 (#16528) ပေါ်ရှိ relay လုပ်ထားသည့် `Retry-After` က fallback engine အား ထိုအချိန်ကာလအတွက် model ကို လော့ခ်ချစေပြီးသားဖြစ်သော်လည်း၊ limiter ကိုပါ ထိုအချိန်အတွက် ရပ်နားခြင်းသည် key ကို စောစီးစွာ ရောက်လာသည့် call တစ်ခုခုကို
(ဥပမာ resilience reset တစ်ခုပြီးနောက်) `maxWaitMs` တစ်လျှောက်လုံး ရပ်တန့်နေစေဦးမည်ဖြစ်သည်။ ထိုကဲ့သို့သော စောင့်ချိန်သည် typed Google `RetryInfo`
detail (`google_rpc_retry_info` provenance) မှ လာပြီး key ၏ limiter ကို model အဆင့်အထိ သတ်မှတ်ထားပြီးသားဖြစ်ပါက (`getLimiterKey` ကို ကြည့်ပါ) 429 သည် ယင်းအစား ထို connection ပေါ်ရှိ model lockout တစ်ခု ဖြစ်လာသည် (`open-sse/services/rateLimitManager/bodyRetryPause.ts` ရှိ
`lockModelForLongBodyRetry`၊ အများဆုံး 24h အထိ ကန့်သတ်ထားသည်)၊ limiter ကိုမူ ရပ်နားမထားပါ။ Account ရွေးချယ်မှုသည် `isModelLocked()` မှတစ်ဆင့် ထို lock ကို ကျော်သွားပြီး၊ connection နှင့် ချိတ်သတ်မှတ်ထားသော target များအတွက် combo pre-dispatch gate ကလည်း အလားတူ ကျော်သွားသည်။ Limiter ကို quota family တစ်ခုစီအလိုက် သတ်မှတ်ထားသည့် antigravity တွင် lock သည် ၎င်း၏ အခြား quota lock များကဲ့သို့ model အတိအကျပေါ်တွင် ရှိသည်။ Alias တစ်ခုက client တောင်းဆိုသည့်အမည်ကို ထို model သို့ resolve လုပ်ပေးထားပါက ထိုတောင်းဆိုထားသောအမည်ကိုလည်း လော့ခ်ချသည်၊ အဘယ်ကြောင့်ဆိုသော် ထိုစစ်ဆေးမှုများသည် တောင်းဆိုထားသောအမည်ကို အသုံးပြုသောကြောင့်ဖြစ်သည်။ ၎င်းကို အတိအကျ လော့ခ်ချသည် (`lockExactModel`) ဖြစ်သောကြောင့် antigravity quota family သို့မဟုတ် codex scope ကို ဖြတ်ကျော်သည့် alias တစ်ခုသည် ၎င်းကိုယ်တိုင်ကို မည်သည့်အခါမျှ လော့ခ်မချပါ။ စာသားဖြင့် ရေးသားထားသော အရိပ်အမြွက်တစ်ခု၊ typed မလုပ်ထားသော `retryDelay` တစ်ခု သို့မဟုတ်
connection တစ်ခုလုံးက မျှဝေသုံးစွဲသော limiter တစ်ခုဖြစ်ပါက pause ကို ဆက်လက်ထားရှိသည်။ 429 path က ယခုတင် ပြန်လည်တည်ဆောက်ထားသော limiter သည် pause လုပ်သောအခါ caller တစ်ခု၏ လက်ကျန်တန်းစီချိန်သည် pause မပြီးဆုံးမီ ကုန်ဆုံးမည်ဆိုပါက ထိုအချိန်တစ်လျှောက် စောင့်စေမည့်အစား queue-timeout code
(`checkLimiterPause`) ဖြင့် ချက်ချင်း ငြင်းပယ်သည်။ မှတ်တမ်းတင်ထားသော အဆုံးသတ်အချိန်ကို Bottleneck က ၎င်း၏ refresh clock စတင်သည့် limiter မတည်ဆောက်မီ အချိန်၌ အခြေပြုသတ်မှတ်ထားပြီး၊ နောက်ပိုင်း reservoir ကို ပြောင်းလဲမှုတစ်ခုခု ပြုလုပ်ပါက ၎င်းကို မေ့ပျောက်သည်။ ဤအပြုအမူများကို
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` နှင့်
`tests/unit/rate-limit-body-retry-pause.test.ts` တို့ဖြင့် လွှမ်းခြုံစမ်းသပ်ထားသည်။

**`maxQueueDepth` — ရွေးချယ်ဖွင့်နိုင်သော ဝင်ခွင့်ကန့်သတ်ချက် (အသစ်)။** `resilienceSettings.requestQueue.maxQueueDepth`
သည် provider+connection တစ်ခုအတွက် တစ်ပြိုင်နက်တည်း တန်းစီနေနိုင်သည့် (dispatch မလုပ်ရသေးသော) တောင်းဆိုမှုအရေအတွက်ကို ကန့်သတ်သည်။ တန်းစီစာရင်းတွင် `maxQueueDepth`
တောင်းဆိုမှုများ ရှိနှင့်ပြီးဖြစ်ပါက တောင်းဆိုမှုအသစ်ကို typed
`code: "RATE_LIMIT_QUEUE_FULL"` error ဖြင့် `limiter.schedule()` ထံ မရောက်မီ **ကြိုတင်** ချက်ချင်းငြင်းပယ်သည် — ထို့ကြောင့် ငြင်းပယ်မှု၏ ကုန်ကျစရိတ်နည်းပြီး ထိုတောင်းဆိုမှုအတွက် downstream
prompt-compression / translation အလုပ်တစ်ခုခု မစတင်မီ ဖြစ်ပေါ်သည်။ မူလတန်ဖိုး `0` =
ပိတ်ထားခြင်းဖြစ်ပြီး ရှိပြီးသား ကန့်သတ်မထားသည့် တန်းစီစာရင်းအပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်။ ခွင့်ပြုအကွာအဝေးမှာ 0–100000 ဖြစ်သည်။
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) သို့မဟုတ်
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) မှတစ်ဆင့် အစားထိုးသတ်မှတ်နိုင်သည်။

ဝင်ခွင့်စစ်ဆေးမှုကိုယ်တိုင်သည် pure function တစ်ခုဖြစ်သည်
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ဖြစ်သောကြောင့် အမှန်တကယ် Bottleneck limiter မရှိဘဲ unit test လုပ်နိုင်သည်။

> #6593 ကို ဖွင့်ခဲ့သော RFC သည် `bypassCompressionOnRateLimit`
> flag ကိုလည်း တင်ပြခဲ့သည်။ ဤ repo ၏ `open-sse/services/compression/` pipeline သည်
> synthesized 429 body များအပေါ်ရှိ HTTP response compression မဟုတ်ဘဲ၊ outbound LLM
> request (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy`
> block အနီးတွင်) ပေါ်ရှိ prompt/context compression ဖြစ်သည် — literal bypass flag
> အတွက် ကိုက်ညီသော code path မရှိပါ။ ထို prompt-compression အဆင့်သည်လည်း လက်ရှိတွင်
> request pipeline အတွင်းရှိ `withRateLimit()` _မတိုင်မီ_ run နေသောကြောင့်၊ queue-full
> rejection တွင် ၎င်းကို ကျော်ရန် အစီအစဉ်ပြင်ဆင်ခြင်းသည် ဤ issue ၏ scope ထက် ပို၍
> ကြီးမားပြီး သီးခြားသော ပြောင်းလဲမှုတစ်ခုဖြစ်သည်။ ၎င်းကို ဤနေရာတွင်
> ရည်ရွယ်ချက်ရှိရှိ implement **မလုပ်ခဲ့ပါ** နှင့် CPU-saving ရရှိမှုသည် reordering risk
> ကို တန်ဖိုးရှိပါက follow-up အဖြစ် ချန်ထားခဲ့သည်။

### Rate-Limit အလိုအလျောက်ဖွင့်ပေးမှု Safety Net နှင့် Connection ကာကွယ်မှု (`rateLimitProtection`)

**အလိုအလျောက်ဖွင့်ပေးမှု safety net** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ပုံသေ `true`):
ပုံသေအတိုင်း OmniRoute သည် active API-key provider connection အားလုံး (`getProviderCategory(provider) === "apikey"`) အတွက် rate-limit queue ကာကွယ်မှုကို အလိုအလျောက်ဖွင့်ပေးသည်။ ၎င်းသည် rate limit ကို ထိခိုက်လွယ်သော upstream API key များသို့ ဝင်လာသော request များကို upstream 429 error များ ဖြစ်ပေါ်အောင် burst ဝင်ရောက်ခြင်းအစား Bottleneck မှတစ်ဆင့် queue ထဲသို့ထည့်ပြီး throttle လုပ်ခံရစေသည်။ ဤ safety net ကို `RATE_LIMIT_AUTO_ENABLE` environment variable ဖြင့် override လုပ်နိုင်သည် (`false`/`0`/`off` သည် ပိတ်ပစ်သည်၊ `true`/`1`/`on` သည် အတင်းအကျပ်ဖွင့်သည်)၊ ၎င်းသည် persist လုပ်ထားသော dashboard setting (**Settings → Resilience** / `PATCH /api/resilience`) ထက် ဦးစားပေးသည်။

**Connection တစ်ခုချင်းစီ၏ `rateLimitProtection` အဓိပ္ပာယ်ဖွင့်ဆိုချက်:**
Connection တစ်ခုချင်းစီ၏ rate-limit ကာကွယ်မှုကို provider connection များပေါ်ရှိ `rateLimitProtection` boolean field ဖြင့် ခြေရာခံထားသည် (SQLite တွင် `rate_limit_protection` အဖြစ် persist လုပ်ထားသည်):

- **တိကျစွာဖွင့်ထားခြင်း (`rateLimitProtection === true`)**: Provider category ဖြစ်စေ၊ auto-enable safety net ဖွင့်ထားခြင်း ရှိမရှိဖြစ်စေ မဆိုင်ဘဲ ဤ connection အတွက် rate-limit ကာကွယ်မှုကို တိကျစွာ ဖွင့်ထားသည်။
- **တိကျစွာပိတ်ထားခြင်း (`rateLimitProtection === false`)**: တိကျသော ကာကွယ်မှုကို ပိတ်ပစ်သော်လည်း active API-key connection တစ်ခုကို global auto-enable safety net မှ opt-out **မလုပ်ပေးပါ**။ `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) အတွင်းတွင် `false` နှင့် `undefined` သည် တူညီသည်: `rateLimitProtection === true` ကိုသာ တိကျသော override အဖြစ် သတ်မှတ်သည်။ `rateLimitProtection` သည် `false` (သို့မဟုတ် မသတ်မှတ်ထားခြင်း) ဖြစ်ပါက active API-key connection သည် auto-enable အခြေအနေနှင့် ဆက်လက်ကိုက်ညီနေပြီး rate-limit ကာကွယ်မှု ရရှိနေဆဲဖြစ်သည်။
- **Connection တစ်ခုချင်းစီ opt-out မရှိပါ**: Operator တစ်ဦးသည် အခြား connection များအတွက် auto-enable ကို active ထားရင်းဖြင့် "ဤ active API-key connection တစ်ခုတည်းသည် rate-limit queue ကာကွယ်မှုမရှိဘဲ run ရမည်" ဟု လက်ရှိတွင် ဖော်ပြနိုင်ခြင်း မရှိပါ။ API-key connection များကို rate-limit queue လုံးဝမရှိဘဲ run လိုပါက safety net ကို global အားဖြင့် ပိတ်ရမည် (`RATE_LIMIT_AUTO_ENABLE=false` သို့မဟုတ် `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)။

**ပံ့ပိုးထားသော write path များ:**

- **`POST /api/rate-limits`**: Connection တစ်ခုအတွက် `rateLimitProtection` ကို toggle လုပ်ရန် ပံ့ပိုးထားသော management write path (`{ connectionId: string, enabled: boolean }`)။ ၎င်းကို `enabled: true` ဖြင့် ခေါ်ဆိုပါက တိကျသော ကာကွယ်မှုကို ဖွင့်ပေးပြီး၊ `enabled: false` ဖြင့် ခေါ်ဆိုပါက တိကျသော ကာကွယ်မှုကို ဖယ်ရှားပေးသည် (သို့သော် auto-enable ဖွင့်ထားပါက active API-key connection များသည် global safety net အောက်တွင် ဆက်လက်ပါဝင်နေမည်)။
- **`PUT /api/providers/[id]`**: ရည်ရွယ်ချက်ရှိရှိ `rateLimitProtection` ကို လက်ခံခြင်း သို့မဟုတ် flip လုပ်ခြင်း **မလုပ်ပါ** (#11278)။ `PUT /api/providers/[id]` မှတစ်ဆင့် provider connection metadata ကို update လုပ်ခြင်းသည် persist လုပ်ထားသော rate-limit ကာကွယ်မှုအခြေအနေကို ဘယ်တော့မှ မပြောင်းလဲပါ။

---

## 6. နှေးကွေးနေသော stream ၏ throughput watchdog (#9709)

ရွေးချယ်နိုင်သော `resilienceSettings.streamRecovery.throughputWatchdog` ကာကွယ်စနစ်က chunks များ ဆက်လက်ပေးပို့နေဆဲ ဖြစ်သော်လည်း သတ်မှတ်ထားသော အသုံးဝင်သော-output နှုန်းထက် နိမ့်ကျနေသော assistant output ကို ထုတ်လုပ်နေသော upstream ကို စစ်ဆေးတွေ့ရှိသည်။ ၎င်းကို idle timeout မှ ရည်ရွယ်ချက်ရှိရှိ ခွဲခြားထားသည်- heartbeats နှင့် metadata များက timer နှစ်ခုလုံးကို reset လုပ်စေခြင်းလည်း မရှိ၊ တိုးတက်မှုအဖြစ်လည်း ရေတွက်ခြင်းမရှိပါ။ ၎င်းသည် output အရည်အသွေး မည်သို့ပင်ဖြစ်စေ ပကတိ လုံခြုံရေးအဆင့်သတ်မှတ်ချက် (safety ceiling) အဖြစ် ဆက်လက်တည်ရှိနေသော hard attempt deadline (#9153) နှင့်လည်း ကွာခြားသည်။

watchdog သည် abort လုပ်နိုင်ရန် warm-up ကာလတစ်ခုနှင့် ၎င်းနောက်ပိုင်း ပြည့်စုံသော rolling window တစ်ခု လိုအပ်သည်။ ၎င်းက Chat Completions နှင့် Responses API output events များမှ text deltas များကို ရေတွက်သည် (သတိထား၍သုံးသော UTF-8 byte proxy တစ်ခု)၊ usage-only နှင့် empty events များကို လျစ်လျူရှုကာ tool-call သို့မဟုတ် reasoning events များ လည်ပတ်နေစဉ်အတွင်း ဆုံးဖြတ်ချက်ချမှုကို ရပ်ဆိုင်းထားသည်။ ၎င်းကို default အဖြစ် ပိတ်ထားပြီး `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ဖြင့် ဖွင့်နိုင်သည်၊ window၊ warm-up၊ အနိမ့်ဆုံးနှုန်းနှင့် အနိမ့်ဆုံး တိုင်းထွာနိုင်သော output များကို ပုံမှန် resilience-settings normalization layer က ကန့်သတ်ထားသည်။

ဖွင့်ထားသောအခါ၊ watchdog abort ကို active upstream attempt သို့သာ ကျင့်သုံးသည်။ client မြင်နိုင်သော bytes မပေါ်မီ၊ ရှိပြီးသား same-account early-recovery path က attempt ကို ပြန်လည်ဖွင့်နိုင်သည်။ commit ပြီးနောက်တွင် stream ကို မျက်ကန်း replay လုပ်ခြင်း ဘယ်တော့မှမရှိပါ၊ ရှိပြီးသား safe mid-stream continuation contract မှသာ suffix ကို ချိတ်ဆက်ပေးနိုင်သည်။ Finalization သည် single-shot အဖြစ် ဆက်လက်တည်ရှိသဖြင့် usage accounting နှင့် semaphore release များကို ထပ်မံလုပ်ဆောင်ခြင်း မရှိပါ။

---

## 7. Upstream Status Restatement (quota error များ မှားယွင်းဖော်ပြခြင်း)

**နယ်ပယ်:** temporary quota ကုန်ဆုံးသွားခြင်းကို မှားယွင်းသော HTTP status ဖြင့် အစီရင်ခံသော upstream gateway တစ်ခု။

**ရည်ရွယ်ချက်:** classification မပြုလုပ်မီ မှားယွင်းနေသော status ကို ပြင်ဆင်ရန်ဖြစ်ပြီး၊ downstream consumer များ (fallback engine၊ combo aggregation၊ client-facing response) မှ failure ၏ စစ်မှန်သော retryable သဘောသဘာဝကို မြင်တွေ့နိုင်စေရန်ဖြစ်သည်။

Gateway အချို့က TEMPORARY quota ကုန်ဆုံးမှုကို non-retryable HTTP status ဖြင့်
ဖော်ပြသည်။ `agentrouter.org` သည် standard `429` အစား `403` (တစ်ခါတစ်ရံ `400`) ကို
တရုတ်စာဖြင့် (`用户额度不足` / `额度不足`) ပြန်ပေးသည်။ Claude Code ကဲ့သို့သော client
များက `403` ကို permanent အဖြစ် သတ်မှတ်ပြီး session ကို ရပ်တန့်သွားပြီး၊ ပြင်ဆင်ခြင်း
မရှိပါက fallback engine က ၎င်းကို quota event အစား `AUTH_ERROR` အဖြစ်
ခွဲခြားသတ်မှတ်ပါလိမ့်မည်။

**အကောင်အထည်ဖော်မှု:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — provider
  တစ်ခုချင်းစီအတွက် rule စာရင်း (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) ဖြစ်ပြီး `applyStatusRestatement()` မှတစ်ဆင့်
  match လုပ်သည်။
- Call site: `open-sse/handlers/chatCore.ts` ရှိ `providerFailure:` block
  (line 3654 ခန့်) တွင်၊ error HTTP status (`!providerResponse.ok`) ပါသော upstream
  response ကို `parseUpstreamError()` မှ parse ပြုလုပ်ပြီးသည့်နောက်ချိန်တွင်၊
  မည်သည့် classification မဆို မစတင်မီ နေရာတွင် ရှိပြီး၊ downstream consumer
  အားလုံးက ပြင်ဆင်ပြီးသား status ကို မြင်တွေ့နိုင်စေသည်။ `200` SSE stream
  အတွင်းတွင် ပါဝင်နေသော error များမှာ သီးခြားသော နောက်ပိုင်း stream-parsing
  လမ်းကြောင်းတစ်ခုကို လိုက်နာပြီး၊ ဤ hook ဖြင့် ယနေ့တွင် **မကျောက်ပါဝင်ပါ** — ဤမှာ
  သိထားပြီးသား ကန့်သတ်ချက်တစ်ခုဖြစ်ပြီး agentrouter ၏ misstatus အတွက်မှာ မလိုအပ်သေးပါ
  (၎င်းသည် error HTTP status အဖြစ် ပေါ်ပေါက်သောကြောင့်)။
- Retry eligibility: `429` သည် `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) အတွင်းတွင် ပါဝင်သောကြောင့်၊
  restated error တစ်ခုသည် dead `403` အဖြစ်ပေါ်ပေါက်စေခြင်းအစား စစ်မှန်သော retry
  window ကို သယ်ဆောင်လာသည်။
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) သည်
  restated response က **client** ကို ပြောသည့်အချက်သာဖြစ်ပြီး၊ ၎င်းသည် connection
  ၏ internal cooldown/lockout ကြာချိန် မဟုတ်ပါ — ထိုအရာကို restated error ကို
  အမှန်တကယ် ကိုင်တွယ်သည့် mechanism (API-key provider များအတွက် base `3s` ပါသော
  Connection Cooldown ၏ escalating backoff၊ §2; သို့မဟုတ် agentrouter ကဲ့သို့သော
  per-model-quota provider များအတွက် Model Lockout၊ §3) က သီးခြားစီ စီမံသည်။
  Router သည် client ကို ကြေညာသည့် 60s window မတိုင်မီ internally retry
  လုပ်ရန် eligible ဖြစ်နိုင်သည် — ၎င်းမှာ bug မဟုတ်ဘဲ ရည်ရွယ်ချက်ဖြင့် ခွဲဝေထားသော
  headroom ဖြစ်သည်။

Permanent error များ (agentrouter ၏ `无权访问模型` — ဤ model ကို access ရယူရန်
ခွင့်မရှိခြင်း) ကို ဘယ်တော့မှ restate မလုပ်ပါ: `textMarkers` နှင့် match သည်တိုင်အောင်
`excludeMarkers` က rule ကို veto လုပ်သောကြောင့်၊ error သည် မူရင်း status ကို
ထိန်းသိမ်းထားနိုင်ပြီး မည်သည့်အရာကမှ ထိုအရာကို အဆုံးမဲ့ retry မလုပ်ပါ။ သက်ဆိုင်ရာ
provider classification rule
(`open-sse/config/providerErrorRules.ts` ရှိ
`agentrouter-model-access-denied`:
`reason: "auth_error"`၊ `scope: "model"`၊ ကြေညာထားသော base cooldown `6h`) ကို
`checkFallbackError` (`open-sse/services/accountFallback.ts`) မှ generic
apikey-category `FORBIDDEN` early-return _မတိုင်မီ_ ကဆွေးနွေးကြည့်ရှုပြီး၊
`honorsRuleLockScope(provider)` ဖြင့် gate လုပ်ထားသည် (#10334 — လက်ရှိတွင်
`providerErrorRules.ts` ရှိ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist မှတစ်ဆင့်
agentrouter သာလျှင် ရရှိသည်)။ Rule ၏ ကြေညာထားသော 6h cooldown သည်
`fallbackResult.baseCooldownMs` အဖြစ် စီးဆင်းသွားသော်လည်း၊ ၎င်းသည် ရှိပြီးသား
per-model-quota lockout လမ်းကြောင်း (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`၊ cooldown source ကလွဲပြီး #10334 ဖြင့် မပြောင်းလဲပါ) ကို
ဆက်လက်ပံ့ပိုးသည်: ၎င်းကို အခြား model lockout အားလုံးနည်းတူ operator ၏
`mlSettings.maxCooldownMs` (default `1_800_000ms` / 30min) သို့ clamp လုပ်ခံရပြီး၊
_persisted lockout reason_ မှာ rule ၏ `"auth_error"` မဟုတ်ဘဲ ရှိပြီးသား hardcode
ထားသော `"forbidden"` ဖြစ်နေဆဲပါ — end-to-end honor လုပ်ခံရသည်မှာ reason string
မဟုတ်ဘဲ cooldown ကြာချိန်သာဖြစ်သည်။ Connection ကိုယ်တိုင်မှာ active ဖြစ်နေဆဲဖြစ်ပြီး၊
တူညီသော connection ပေါ်ရှိ sibling model များ သက်ရောက်မှုမရှိပါ။

Restated quota error များ (`额度不足`) သည် production တွင် provider rule တစ်ခုသို့
ရောက်ရှိသည် (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope:
"connection"`, ကိုယ်ပိုင်ကြေညာထားသော cooldown မရှိ — persistence layer ၏ scaled
backoff default ကို အသုံးပြုသည်)။ #10334 နောက်ပိုင်း `ProviderErrorRuleMatch` ပေါ်ရှိ
`scope` ကို end-to-end စားသုံးပြီဖြစ်သော်လည်း၊ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlist (`providerErrorRules.ts` — ယနေ့ `"agentrouter"` သာလျှင်၊
`honorsRuleLockScope()` မှတစ်ဆင့် gate လုပ်ထားသည်) အတွင်းရှိ provider များအတွက်
**သာလျှင်** ဖြစ်သည်။ အခြား provider အားလုံးအတွက်မှာ `scope` သည် #10334 မတိုင်ခင်နည်းတူ
informational အဖြစ်သာ ဆက်လက်ရှိနေသည်။
`checkFallbackError` က match လုပ်ထားသော rule ၏ scope ကို
`fallbackResult.ruleScope` အဖြစ် ထုတ်ဖော်ပြပြီး၊ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) သည် `ruleScope` ကို connection-wide, self-recovering
signal အဖြစ် honor လုပ်ရန် စစ်မှန်စွာ လုံခြောက်ကြောင်း အတည်ပြုပေးသော shared guard
ဖြစ်သည် (scope `"connection"`၊ reason `quota_exhausted`၊ ဘယ်တော့မှ `permanent`
မဟုတ်ခြင်း၊ ဘယ်တော့မှ `creditsExhausted` မဟုတ်ခြင်း — scope `"connection"` ကို permanent
account state နှင့် ပေါင်းစပ်မည့် rule အနာဂတ်တစ်ခုအတွက် ကာကွယ်မှုတစ်ခု)။ Consumer
နှစ်ခုက ၎င်းကို ခေါ်ဆိုသည်:

- **အမြဲတမ်းသိမ်းဆည်းမှု** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider ၏ **မော်ဒယ်တစ်ခုချင်းစီအလိုက်** lockout
  branch ထဲသို့ ဝင်သွားမည့်အစား (agentrouter သည် `passthroughModels: true` ဖြစ်သည် → `hasPerModelQuota()`
  က `true` ပြန်ပေးသည်)၊ ၎င်းသည် **ယာယီ connection cooldown** ကို အသုံးပြုသည် —
  `testStatus: "unavailable"` + `rateLimitedUntil` ဖြစ်ပြီး၊ အပြီးသတ် status
  (`credits_exhausted`/`banned`/`expired`) ကို လုံးဝမသုံးပါ — ထို့ကြောင့် cooldown ကာလ
  ပြီးဆုံးသည်နှင့် connection သည် credential ကို ကိုယ်တိုင် ပြန်လည်သတ်မှတ်ရန် မလိုဘဲ
  အလိုအလျောက် ပြန်လည်ကောင်းမွန်လာသည်။
  `disableCooling: true` ပါသော connection များအတွက် ကျော်သွားသည် (#2997)။ ထို opt-out
  သည် ယင်းအစား per-model lockout သို့ ဆက်လက်ဝင်ရောက်သွားသည် (မှတ်တမ်းတင်ထားသော အပေးအယူတစ်ခု —
  branch အပေါ်ရှိ code comment ကို ကြည့်ပါ)။
- **တူညီသော request အတွင်း combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): တူညီသော guard သည် connection ကို
  `${provider}:${connectionId}` ဖြင့် key သတ်မှတ်ထားသည့် in-memory `exhaustedConnections` set
  ထဲတွင် မှတ်သားသည်။ ၎င်းသည် ကျန်ရှိသော SAME-REQUEST target တစ်ခု၏ ကိုယ်ပိုင်
  target object ပေါ်တွင် _အတိအကျ ထို `connectionId` ကိုယ်တိုင် ပါရှိပြီးသား_ ဖြစ်သည့်အခါမှသာ
  ထို target ကို ကျော်သွားသည် (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` သည် `exhaustedConnections` lookup မတိုင်မီ ရှိသည်) — သာမန်
  model-list combo တစ်ခုတွင် sibling target များ၌ ၎င်းတို့ကိုယ်တိုင် pin လုပ်ထားသော `connectionId`
  မပါရှိဘဲ response ၏ `X-OmniRoute-Selected-Connection-Id` header မှ dispatch တစ်ကြိမ်စီတွင်သာ
  resolve လုပ်သောကြောင့် ထို key match ကို လုံးဝမတွေ့ပါ။ ထိုအသုံးများသော အခြေအနေအတွက်
  ကျန်ရှိသည့် leg တစ်ခုက ယခုကုန်ဆုံးသွားသော account ကို ပြန်လည်အသုံးပြုခြင်းမှ တကယ်ကာကွယ်ပေးသည့်အရာမှာ
  ဤ Set မဟုတ်ပါ — အပေါ်ရှိ persistence layer (connection ၏ `rateLimitedUntil` သည် ယခု
  အနာဂတ်အချိန်တစ်ခု ဖြစ်နေသည်) နှင့် failure အတွက် ဤ guard ကပင်
  `transientRateLimitedProviders` ကို တားဆီးထားခြင်းတို့ ပေါင်းစပ်ထားခြင်းဖြစ်သည်
  ("အဆင့်နှစ်ဆင့် ဒီဇိုင်း" နှင့် `targetExhaustion.ts` ရှိ
  `isAgentrouterConnectionQuotaScope` branch ပေါ်မှ code comment ကို ကြည့်ပါ)။ ထို Set ကို
  အမှတ်မထားဘဲ ထားခြင်းဖြင့် `combo.ts` ၏ `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) သည် provider ၏ ကျန်ရှိသော
  leg များအတွက် အသက်ဝင်မလာပါ။ ထို့ကြောင့် credential ရွေးချယ်မှု၏ `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) ကို ပုံမှန်အတိုင်း လိုက်နာပြီး၊
  ကျန်ရှိသော leg သည် အခြားအသုံးပြုနိုင်သေးသော agentrouter connection တစ်ခုကို ရွေးချယ်မည်
  သို့မဟုတ် ရရှိနိုင်သော credential မရှိသဖြင့် မအောင်မြင်မည်ဖြစ်သည် — ဤ branch က
  ယခု cooldown ချထားသော connection ထဲသို့ အတင်းပြန်ဝင်မည် မဟုတ်ပါ။

### အဆင့်နှစ်ဆင့် ဒီဇိုင်း- status ပြန်လည်သတ်မှတ်ခြင်း၊ ထို့နောက် အမျိုးအစားခွဲခြားခြင်း

Status ပြန်လည်သတ်မှတ်ခြင်း (`upstreamStatusRestatement.ts`) နှင့် provider
အမျိုးအစားခွဲခြားရေး rule များ (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) သည် provider id နှင့် text marker များကို အခြေခံ၍ key သတ်မှတ်သည့်
သီးခြား registry များဖြစ်သော်လည်း၊ ၎င်းတို့သည် မတူညီသောနေရာများတွင် လုပ်ဆောင်ပြီး
ရည်ရွယ်ချက်များလည်း မတူညီပါ။ Restatement သည် `chatCore.ts` ၏ အစောပိုင်းတွင် HTTP status ကို
ပြန်လည်ရေးသားသည်။ Classification rule များက `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) အတွင်း fallback `reason` နှင့် lock `scope`
(`model` / `provider` / `connection`) ကို ရွေးချယ်သည်။

Classification rule များသည် `providerErrorRules.ts` ရှိ `FULL_TEXT_RULE_PROVIDERS`
allowlist တွင် ဖော်ပြထားသော provider များအတွက်သာ error **text** အပြည့်အစုံကို မြင်ရသည်
(`额度不足` ကဲ့သို့ body marker များနှင့် ကိုက်ညီမှုစစ်ရန် လိုအပ်သည်) — လက်ရှိတွင်
`"agentrouter"` တစ်ခုတည်းသာ ဖြစ်သည်။ အခြား **built-in catalog** provider အားလုံးအတွက်
`checkFallbackError` သည် `getProviderErrorRuleMatch` ထံ structured error
(`{code, type}`) ကိုသာ ပေးသည်။ ၎င်းသည် header/status/code ကို အခြေခံသော rule များအတွက်
လုံလောက်သော်လည်း body-text marker များကို မမြင်နိုင်ပါ။
`resolveRuleMatchBody()` helper က ဤရွေးချယ်မှုကို လုပ်ဆောင်သည်။ Allowlist ထဲရှိ provider များအတွက်
error text အပြည့်အစုံကို သုံးပြီး၊ အခြား provider များအတွက် structured error ကို သုံးသည်။
**built-in** provider တစ်ခုကို `FULL_TEXT_RULE_PROVIDERS` ထဲသို့ ထည့်ခြင်းသည်
provider တစ်ခုချင်းစီအလိုက် ရှင်းလင်းသော opt-in ဖြစ်သည် — list ထဲမပါသော provider အားလုံးအတွက်
မူလလမ်းကြောင်းကို byte-for-byte မပြောင်းလဲဘဲ ဆက်ထားနိုင်ရန် ၎င်းကို ထားရှိခြင်းဖြစ်သည်။

Rule တစ်ခု၏ `scope` (`model` / `provider` / `connection`) သည်
`FULL_TEXT_RULE_PROVIDERS` နှင့် သီးခြားဖြစ်သော opt-in တစ်ခုဖြစ်သည်။
`checkFallbackError` သည် ၎င်းကို `fallbackResult.ruleScope` အဖြစ်သာ ထုတ်ပေးပြီး၊
downstream consumer များကလည်း တူညီသော file ရှိ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ထဲမှ provider များအတွက်သာ
၎င်းကို အချက်အလက်ဖော်ပြသည့် label ထက်ပိုသောအရာအဖြစ် လိုက်နာသည်
(`honorsRuleLockScope()` မှတစ်ဆင့် gate လုပ်ထားသည် — ယနေ့အထိ `"agentrouter"` တစ်ခုတည်းသာ)။
Provider တစ်ခုသည် ထို allowlist တွင် ပါဝင်ပြီးနောက် `scope: "connection"` match တစ်ခုက
အမှန်တကယ် ဘာလုပ်သည်ကို အပေါ်ရှိ "ပြန်လည်သတ်မှတ်ထားသော quota error များ" တွင် ကြည့်ပါ။

**#11104 — operator က ကြေညာထားသော rule များသည် allowlist နှစ်ခုစလုံးကို ကျော်ဖြတ်သည်။**
Operator တစ်ဦးသည် ဤ file ကို မပြင်ဆင်ဘဲ runtime တွင် `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) မှတစ်ဆင့်
provider တစ်ခုချင်းစီအလိုက် rule တစ်ခုကို ကြေညာနိုင်သည်။ Operator rule တစ်ခုကို
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` နောက်တွင် gate လုပ်ခြင်း —
**built-in catalog rule များ၏ မူလ** အပြုအမူကို ကာကွယ်ရန် ရည်ရွယ်ထားသော allowlist များ —
သည် ထိုနေရာတွင် ဖော်ပြထားပြီးသား provider များမှလွဲ၍ ကျန် provider အားလုံးအတွက်
settings ယန္တရားကို အသုံးမဝင်စေမည်ဖြစ်သည်။ အကြောင်းမှာ rule ကို ကြေညာခြင်းကိုယ်တိုင်က
operator ၏ ရှင်းလင်းသော opt-in ဖြစ်ပြီးသားကြောင့် ဖြစ်သည်။ `resolveRuleMatchBody()` နှင့်
`honorsRuleLockScope()` နှစ်ခုစလုံးသည် `hasOperatorRuleForProvider()` ကို ဦးစွာစစ်ဆေးသည်။
Operator rule ပါသော provider သည် allowlist တစ်ခုခုတွင် ပါဝင်သည်ဖြစ်စေ မပါဝင်သည်ဖြစ်စေ
raw error text ကို ရရှိပြီး ၎င်းကြေညာထားသော `scope` ကို လိုက်နာစေသည်။

**သိရှိထားသော ကွက်လပ် — HTTP 400 အတွက် `providerRuleRegistry` ကို လုံးဝ မတိုင်ပင်ပါ။**
`checkFallbackError` ၏ `BAD_REQUEST` branch သည် status 400 ကို ၎င်း၏ကိုယ်ပိုင်
pattern array များ (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` စသည်တို့ကို `accountFallback.ts` တွင် တွေ့နိုင်သည်) မှတစ်ဆင့်
လုံးဝအမျိုးအစားခွဲခြားပြီး၊ ၎င်းအပေါ်ရှိ `configuredRule`/`getProviderErrorRuleMatch` branch
သို့ မရောက်မီ return ပြန်သည်။ `status: 400` ပါသော built-in catalog rule
(သို့မဟုတ် operator rule) သည် syntax အရ မှန်ကန်သော်လည်း မည်သည့်အခါမျှ အသက်ဝင်မည်မဟုတ်ပါ။
ယနေ့ လက်ရှိ rule တစ်ခုမှ 400 ကို ပစ်မှတ်မထားသောကြောင့် production ရှိ မည်သည့်အရာကိုမျှ
မထိခိုက်ပါ — သို့သော် အနာဂတ် 400 rule တစ်ခုအတွက် ဤ branch ကို ဦးစွာပြင်ဆင်ရန် လိုအပ်သည်။
၎င်းသည် rule တစ်ခုထည့်ခြင်းထက် ပိုမိုကြီးမားသော ပြောင်းလဲမှုဖြစ်ပြီး
(pattern-array အပြုအမူအပေါ် မှီခိုနေပြီးသား provider အားလုံးအတွက် 400 ကို
ပြန်လည်အမျိုးအစားခွဲခြားသည့်အတွက်) provider တစ်ခုတည်းအတွက် rule ထည့်သွင်းမှု၏
နယ်ပယ်ပြင်ပတွင် ရှိသည်။

### quota မှန်ကန်စွာပြင်ဆင်ပေးသော gateway အသစ် ထည့်သွင်းခြင်း

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ထဲတွင် rule array တစ်ခု မှတ်ပုံတင်ပါ။ `textMarkers`
   များကို provider အလိုက်သီးသန့်ဖြစ်စေပါ။
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) နှင့်
   တိုက်ဆိုင်နိုင်သော ယေဘုယျအင်္ဂလိပ်စာကြောင်းများကို ဘယ်တော့မှ ပြန်သုံးမထားပါစေနဲ့။
2. မှန်ကန်သော lock scope (`connection` ကို account-wide quota အတွက်၊
   per-model errors အတွက်ဆိုလျှင် `model`) ရွေးချယ်နိုင်ရန်
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) တွင်
   classification rules များကို လိုအပ်လျှင် မှတ်ပုံတင်ပါ။ ဤအဆင့်သည်
   error text အပြည့်အစုံ (body markers) လိုအပ်သော rules ရှိသော providers များအတွက်
   production တွင်သာ အကျိုးသက်ရောက်ပါသည်။ ထို provider id ကို
   အ identical ဖိုင်ရှိ `FULL_TEXT_RULE_PROVIDERS` ထဲသို့ ထည့်ပါ။
   မဟုတ်လျှင် `checkFallbackError` က rule ဆီသို့ structured
   `{code, type}` error ကိုသာ အမြဲတမ်းလက်ဆင့်ကမ်းပေးမည်ဖြစ်ပြီး
   body-text rule တစ်ခုက live traffic ကို ဘယ်တော့မှ match မဖြစ်နိုင်ပါ။
   `status`/`headers` ပေါ်တွင်သာမန်စွာစီမှန် match သော rules များ
   (Opencode၏ သို့မဟုတ် Minimax၏ rules ကဲ့သို့) အတွက်ဤ opt-in မလိုအပ်ပါ။
   ထို့အပြင်၊ rule က `scope: "connection"` ကို ကြေညာထားပြီး
   ရည်ရွယ်ချက်က စစ်မှန်သော connection-wide cooldown နှင့်
   same-request combo skip (အချက်အလက်ပုံသဏ္ဌာန်ခေါင်းစဉ်သာမဟုတ်ဘဲ) ဖြစ်လျှင်
   provider id ကို အ identical ဖိုင်ရှိ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
   ထဲသို့ ထည့်ပါ။ ၎င်းက `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) နှင့် `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ရှိ
   `isAgentrouterConnectionQuotaScope()` ပုံစံအသုံးပြုမှုကို
   ထိန်းချုပ်ပေးခြင်း ဖြစ်ပါသည်။ ၎င်းမပါလျှင် `scope` သည်
   `fallbackResult.ruleScope` မှတစ်ဆင့် ဆက်လက်စီးဆင်းနေသော်လည်း
   မည်သည့်အရာကမျှ ၎င်းပေါ်တွင် လုပ်ဆောင်မည်မဟုတ်ပါ။
3. `tests/unit/upstream-status-restatement.test.ts` နှင့်
   `tests/unit/agentrouter-error-rules.test.ts` ကို ပုံစံတူထားသော unit tests
   များ ထည့်ပါ (not-permanent / not-creditsExhausted guards များအပါအဝင်၊
   ထို့အပြင် provider က allowlist လိုအပ်လျှင် ထို provider အတွက်သာ
   `resolveRuleMatchBody()` က full text ပြန်ပေးကြောင်း စစ်ဆေးသော test တစ်ခု)။

`chatCore.ts`၊ `classifyError` သို့မဟုတ် combo တို့အတွက် မည်သည့်ပြောင်းလဲမှုမျှ မလိုအပ်ပါ။

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode မိသားစု) ထဲရှိ providers များကို
IP-bucketed upstream အဖြစ်ဆောင်ရွက်ပါသည် (opencode free tier သည်
account-bucketed မဟုတ်ဘဲ IP-bucketed ဖြစ်ပါသည် — #9611 ကို ကြည့်ပါ)။
status-429 ဖြင့် classify လုပ်ထားသော `quota_exhausted` **သို့မဟုတ်**
`rate_limit_exceeded` ဖြစ်လျှင်၊ rotation က ၎င်းတို့ကို စမ်းသပ်နိုင်မချင်း
failing connection ၏ နောက်ဆုံးသိရှိထားသော egress IP နှင့် ကိုက်ညီသော
allowlisted-family connection တိုင်းကို cooldown လုပ်ပါသည်
— N-1 ကြုံတွေ့ရမှန်း သေချာနေသော ပျက်ကွက်မည့် upstream calls များကို ရှောင်ရှားရန်ဖြစ်ပါသည် (#10460/#10525 နှင့် ပုံသဏ္ဌာန်အတူတူပင်)။
`rate_limit_exceeded` ကို ရည်ရွယ်ချက်ရှိရှိ ထည့်သွင်းထားခြင်းဖြစ်သည်။
`markAccountUnavailable` လမ်းကြောင်းပေါ်တွင် opencode-specific rules များ
ဘယ်တော့မှ match မဖြစ်နိုင်ပါ (`checkFallbackError` ဆီသို့ headers/body
လက်ဆင့်ကမ်းမပေးခြင်း၊ opencode က `FULL_TEXT_RULE_PROVIDERS` ထဲတွင် မရှိခြင်း)။
ထို့ကြောင့် subscription-quota စာသား ("monthly usage limit reached")
ပါရှိသော body ရှိ 429 တစ်ခုကို `status_429` rule သို့ မရောက်မီ
quota-text fallback (`buildSubscriptionQuotaFallback`၊ `accountFallback.ts`၊
1h cooldown) က `quota_exhausted` အဖြစ် classify လုပ်ပါသည် — တစ်ဖက်တွင်
quota-text မပါသော 429 (ပုံမှန် rate limiting) ကိုမူ
`status_429` rule မှတစ်ဆင့် `rate_limit_exceeded` အဖြစ် classify လုပ်ပြီး
IP မိသားစုကို ဆက်လက် cooldown လုပ်ပါသည်။ allowlisted provider တစ်ခုအတွက်
IP-bucketed rate limit သည် ကုန်ဆုံးသွားသော quota နှင့်
signal အတူတူပင်ဖြစ်ပါသည်။ ရိုးသားစွာဖော်ပြရသော ကန့်သတ်ချက်များ:

- **အကောင်းဆုံးကြိုးစားမှု (best-effort)**: lock သည် connection ၏ နောက်ဆုံးသိ
  `egress_ip` ကို `proxy_logs` မှ ဆုံးဖြတ်ရှာဖွေသည် (24 နာရီ window၊
  synchronous၊ cache မရှိ)။ Cold cache (egress IP ကို ဘယ်တော့မှ probe
  မပြုလုပ်ရသေးခြင်း) သို့မဟုတ် row မရှိခြင်း → branch သည် ကျရှုံးသွားသော
  connection ကို (ယနေ့အတိုင်း မှတ်သားပြီး) ဆက်လက် cool လုပ်ပါမည်၊ sibling ကိုသာ
  lock မချတော့ပါ။
- **ဘယ်တော့မှ terminal မဟုတ်ပါ**: cooldown သည် သစ်လုပ်ပြန်လည်နိုင်သော quota
  window (`testStatus: "unavailable"`) ဖြစ်သည်; IP-level signal တစ်ခုမှ
  အမြဲတမ်း state ကို ဘယ်တော့မှ ဆင်းသက်စေမည် မဟုတ်ပါ။ `disableCooling`
  connection များသည် branch ကို လုံးဝ ကျော်သွားပါသည်။
- **allowlist ပါဝင်သော family အတွက် lock granularity ပြောင်းလဲသွားသည်**:
  ဤအရာသည် sibling optimization တစ်ခုတည်း မဟုတ်ဘဲ scope ပြောင်းလဲမှုတစ်ခု
  ဖြစ်သည်။ opencode သည် `passthroughModels` provider ဖြစ်သောကြောင့်၊ ဤ
  branch မရှိခင်က 429 တစ်ခုသည် per-MODEL lockout ကို ဖြစ်ပေါ်စေခဲ့သည်;
  ယခုအခါ ၎င်းသည် connection cooldown ကို ဖြစ်ပေါ်စေသည် — sibling
  လုံးဝမရှိဘဲ connection တစ်ခုတည်းကို run နေသော operator အတွက်ပါ ပါဝင်သည်။
  ထို့သည်မှာ opencode rule ဇယားက ယခင်ကတည်းက မှန်ကန်ကြောင်း ကြေညာထားပြီးဖြစ်
  သော granularity ဖြစ်သည် (`scope: "connection"`၊ `providerErrorRules.ts`)၊
  opencode သည် `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ထဲတွင် မပါဝင်သောကြောင့်
  ယခုအထိ ဘယ်တော့မှ လေးစားလိုက်နာခြင်း မခံရပါ။ Branch သည် connection-scoped
  agentrouter branch ကို ပုံတူပွားကာ ကျရှုံးသော connection ၏ cooldown +
  `backoffLevel` ကို ကိုယ်တိုင်ရေးသားပြီး return ပြန်ပါသည် — per-model block
  နှင့် အောက်ပါ generic path သို့ ဘယ်တော့မှ မရောက်ရှိပါ။
- **Combo ပါဝင်သည်**: agentrouter branch ကဲ့သို့ပင်၊ scope သည် combo caller
  တစ်ခုက 429 သို့ အသုံးချသော `persistUnavailableState`/`isCombo` downgrade
  ကို ရည်ရွယ်ချက်ရှိရှိ လျစ်လျူရှုပါသည်။ Per-model lockout သည် ဤ scope ၏
  ပို၍အားနည်းသောပုံစံ မဟုတ်ပါ၊ ၎င်းသည် မှားယွင်းသော unit ဖြစ်သည်: ၎င်းသည်
  ကုန်ခမ်းသွားသော IP အကြောင်း ဘာမျှမပြောနိုင်သောကြောင့်၊ combo rotation သည်
  sibling တစ်ခုချင်းစီအတွက် ကျရှုံးမည်မှာ သေချာနေသော call တစ်ခုကို ဆက်လက်
  လောင်ကျွမ်းနေပါလိမ့်မည်။
- **Sibling ဘေးလုံခြုံမှု**: terminal ဖြစ်နေပြီးသား sibling
  (banned/credits_exhausted) သို့မဟုတ် ပို၍ရှည်လျားသော cooldown ထဲတွင်
  ရှိနေပြီးသား sibling ကို ဘယ်တော့မှ ရေးလွှဲမည် မဟုတ်ပါ။
- **သီးသန့် allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ကို ချဲ့ထွင်ခြင်းသည်
  ရှင်းလင်းသော ပိုင်ရှင်ဆုံးဖြတ်ချက်တစ်ခု ဖြစ်သည်; generic wiring မရှိပါ
  (pattern #10334/#10419)။ Sibling query သည် ၎င်းကို SQL literal အဖြစ်
  ထပ်ခါတလဲလဲဖော်ပြခြင်းမပြုဘဲ ထို allowlist တူးတစ်ခုချင်းကို bind
  လုပ်ထားသောကြောင့်၊ ၎င်းကို ချဲ့ထွင်ခြင်းသည် တစ်ကြောင်းတည်း ပြောင်းလဲမှု
  အဖြစ် ဆက်လက်ရှိနေပါမည်။
- **Egress IP rotation၊ နှစ်လမ်းလုံး**: lookup window (24 နာရီ) သည် egress-IP
  cache TTL (5 မိနစ်) ထက် အလွန်ကျယ်ဝန်းသောကြောင့်၊ "နောက်ဆုံးသိ IP" သည်
  လက်ရှိ state မဟုတ်ဘဲ history ဖြစ်သည်။ Connection ၏ proxy သည် window
  အတွင်းတွင် rotate ဖြစ်သွားခဲ့ပါက lock သည် အမှန်တကယ် မျှဝေသုံးစွဲနေသော IP
  ကို **လွဲမှား**နိုင်ပါသည် (မှတ်သားထားသော IP သည် အသစ်ဖြစ်ပြီး မကုန်ခမ်း
  ရသေးသော IP ဖြစ်နေသည်) — နှင့် ဆင်တူစွာပင် ၎င်းသည် ကုန်ခမ်းသွားသော IP မှ
  ထိုအချိန်ကတည်းက rotate ဖြစ်ကာ ထွက်သွားပြီဖြစ်သော sibling တစ်ခုကို **cool
  လုပ်မိနိုင်ပါသည်**။ ဒုတိယအခြေအနေက ထို sibling ကို cooldown window တစ်ခု
  ကုန်ကျစေပါသည်; နှစ်ခုလုံးမှာ history-based lookup ၏ လက်ခံထားပြီးဖြစ်သော
  best-effort ကန့်သတ်ချက်များ ဖြစ်ပါသည်။
- **ကုန်ကျစရိတ်**: `proxy_logs` ၏ ကန့်သတ်ထားသော scan နှစ်ခု (`idx_pl_timestamp`
  မှတဆင့် window-filtered)၊ 429 frequency တွင်သာ။ Index အသစ် မရှိပါ
  (migration 134 YAGNI)။ အလယ်အလတ်အရွယ်အစား ရှိသော real-traffic DB
  မိတ္တူတစ်ခုပေါ်တွင် တိုင်းထားထားသည်; high-throughput instance တစ်ခုသည်
  window တူအတွင်းတွင် rows များကို ပမာဏအချိုးကျ ပို၍များစွာ ကိုင်ထားပါမည်။

---

## အခြား Resilience Feature များ

- **21 routing strategies** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ကို ကြည့်ပါ။
- **Reset-aware routing** (v3.8.0) — quota reset အချိန်အရ connections များကို ဦးစားပေးသည်။
- **Background mode degradation** — Responses API `background: true` ကို သတိပေးချက်ဖြင့် sync သို့ လျှော့ချပေးသည်။
- **Dynamic tool limit detection** — tool အရေအတွက် ကန့်သတ်ချက်များ ရောက်ရှိသောအခါ providers များကို back off လုပ်စေသည်။
- **Emergency fallback** — `OMNIROUTE_EMERGENCY_FALLBACK` ဖြင့် ထိန်းချုပ်ထားသည်; operators များသည် restart မလုပ်ဘဲ Feature Flags စာမျက်နှာမှ ၎င်းကို override လုပ်နိုင်သည်။

---

## အမှားရှာဖွေခြင်း

- Weighted combo သည် `503 all_targets_cooling_down` ကို ပြန်ပေးသည် (`Retry-After` သတ်မှတ်ထားပြီး၊ `diagnostics.excluded` က target တိုင်းကို `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ဖြင့် စာရင်းပြသည်) → pool သည် configure လုပ်ပြီး ချိတ်ဆက်ပြီးဖြစ်ကာ၊ target တိုင်းကို resilience timer တစ်ခုခုကသာ ဖယ်ထုတ်ထားခြင်းဖြစ်သည်; `[COMBO] Weighted selection: every target excluded before dispatch — …` warning သည် အကြောင်းရင်းများနှင့် ကျန်ရှိနေသော seconds များကို ဖော်ပြသည်။ Combo တစ်ခုတည်းမှ လာသော `404 no_executable_targets` ဆိုလျှင် resilience timer ဘာမှ ပါဝင်ခြင်းမရှိဟု ဆိုလိုသည် (လည်ပတ်စရာအရာ မရှိခြင်း၊ သို့မဟုတ် account တိုင်းသည် availability probe ကို မအောင်မြင်ခြင်း)။ `targetResolution.ts` တွင် စုဆောင်းထားသော exclusions များကို အခြေခံ၍ `open-sse/services/combo/pinRecovery.ts` တွင် တည်ဆောက်ထားသည်။
- Provider တစ်ခုအတွက် key အားလုံး ကျော်ခံသွားပါက → circuit breaker အခြေအနေ **နှင့်** connection တစ်ခုချင်းစီ၏ `rateLimitedUntil`/`testStatus` နှစ်ခုလုံးကို စစ်ဆေးပါ။
- Reset window ပြီးနောက် provider ကို အမြဲတမ်း ဖယ်ထုတ်ထားပါက → `getStatus()`/`canExecute()` အစား raw `state` ကို ဖတ်နေသော code ဖြစ်နေခြင်းဖြစ်သည်။
- Key တစ်ခု ပျက်ကွက်ပြီး အခြားအရာများ အလုပ်လုပ်သင့်ပါက → circuit breaker အစား connection cooldown ကို ဦးစားပေးပါ။
- Model တစ်ခုသာ ပျက်ကွက်ပါက → connection cooldown အစား model lockout ကို ဦးစားပေးပါ။
- အခြေအနေသည် အလိုအလျောက် ပြန်လည်ကောင်းသင့်သော်လည်း မဖြစ်ပါက → အနာဂတ် timestamp ရှိမရှိ နှင့် သက်တမ်းကုန်ဆုံးသွားသော အခြေအနေကို refresh လုပ်ပေးသော read path ရှိမရှိ စစ်ဆေးပါ။ Permanent statuses များသည် manual ပြောင်းလဲမှုများ လိုအပ်သည်။

---

## Runtime အခြေအနေ — agent အမြန် ရည်ညွှန်း

> agent လမ်းညွှန်သည် 40k context budget အောက်တွင် ဆက်လက်ရှိနေစေရန်
> `AGENTS.md` → "Resilience Runtime State" (PR #12743) မှ verbatim အတိုင်း ရွှေ့ပြောင်းထားခြင်း ဖြစ်သည်။
> ၎င်းသည် အပေါ်ရှိ ကဏ္ဍများ၏ အကျဉ်းချုပ်၊ agent-facing ရှုထောင့်ဖြစ်ပြီး;
> နံပါတ်ရှိသော ကဏ္ဍများမှာ အပြည့်အစုံ ရည်ညွှန်းချက်အဖြစ် ဆက်လက်တည်ရှိသည်။

OmniRoute တွင် ဆက်စပ်သော်လည်း ကွဲပြားသော temporary-failure ယန္တရား သုံးခု ရှိသည်။ routing
အပြုအမူကို debug လုပ်သည့်အခါ ၎င်းတို့၏ scope ကို သပ်သပ်စီ ခွဲထားပါ။
တစ်ချက်ကြည့်လျှင် မြင်နိုင်သော မြေပုံတစ်ခုအတွက်
[3-အလွှာ resilience diagram](../diagrams/exported/resilience-3layers.svg)
(source: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
ကို ကြည့်ပါ။

### Provider Circuit Breaker

**အကျယ်အဝန်း**: provider တစ်ခုလုံး၊ ဥပမာ `glm`, `openai`, `anthropic`။

**ရည်ရွယ်ချက်**: upstream/service အဆင့်တွင် ထပ်ခါထပ်ခါ ပျက်ကွက်နေသော provider သို့ traffic ပေးပို့ခြင်းကို
ရပ်တန့်စေရန်၊ ထိုသို့ဖြင့် ကျန်းမာရေးမကောင်းသော provider တစ်ခုတည်းက တောင်းဆိုမှုတိုင်းကို
နှေးကွေးစေမည် မဟုတ်ပေ။

**အကောင်အထည်ဖော်မှု**:

- အဓိက class: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution ချိတ်ဆက်မှု: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- မျှဝေအသုံးပြုသော wrappers: `open-sse/services/accountFallback.ts`
- သိမ်းဆည်းထားသော state ဇယား: `domain_circuit_breakers`

**အခြေအနေများ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ပုံမှန် traffic ကို ခွင့်ပြုထားသည်။
- `DEGRADED`: အစောပိုင်း သတိပေးချက် အပိုင်း — ပျက်ကွက်မှုများသည် degradation threshold ကို
  ကျော်သွားသော်လည်း breaker threshold ကို မကျော်ရသေးပါ; traffic ဆက်လက်စီးဆင်းနေပြီး၊
  dashboards များတွင် သတိပေးချက်ကို ပြသသည်။ မှန်ကန်သော connection test တစ်ခု သို့မဟုတ်
  ပျက်ကွက်မှုအသစ်မရှိသော တည်ငြိမ်သော window တစ်ခုက ၎င်းကို `CLOSED` သို့ ပြန်လည်ရောက်ရှိစေသည်
  (window ကို `docs/architecture/RESILIENCE_GUIDE.md` တွင် ဖော်ပြထားသည်)။
- `OPEN`: provider ကို ခေတ္တ ပိတ်ဆို့ထားသည်; callers များသည် provider-circuit-open
  တုံ့ပြန်ချက်ကို ရရှိမည်ဖြစ်ပြီး၊ သို့မဟုတ် combo routing သည် အခြား target တစ်ခုသို့ ကျော်သွားမည်ဖြစ်သည်။
- `HALF_OPEN`: reset timeout ကုန်ဆုံးသွားပြီ ဖြစ်သည်; probe request တစ်ခုကို ခွင့်ပြုပါ။
  အောင်မြင်ပါက breaker ပိတ်သွားပြီး၊ ပျက်ကွက်ပါက ပြန်ဖွင့်သွားမည်ဖြစ်သည်။

**ပုံသေတန်ဖိုးများ** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
`src/lib/resilience/settings.ts` ရှိ `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` မှတစ်ဆင့်
အသုံးပြုသည် → `src/sse/handlers/chatHelpers.ts` ရှိ `getCircuitBreaker(provider, …)`)။
Provider တစ်ခုလုံး breaker သည် `circuitBreakerThreshold` / `circuitBreakerReset` ပေါ်တွင်
လည်ပတ်သည်:

| Profile |    degrade အဆင့် | open အဆင့် (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ---------------: | -------------------------------------: | ----------------------------: |
| OAuth   |              `5` |                                    `8` |                         `60s` |
| API key |              `7` |                                   `12` |                         `30s` |
| Local   | (ဆင်းသက်တွက်ထား) |                                    `2` |                         `15s` |

`PROVIDER_PROFILES` သည် `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 မိနစ်) နှင့် `providerCooldownMs` (5/10/1 မိနစ်) ကိုလည်း
သတ်မှတ်ပေးသည်: ၎င်းတို့သည် **opt-in global Provider Cooldown ၏ window gate** ကို
မောင်းနှင်စေသည် (`PROVIDER_COOLDOWN_ENABLED`, ပုံသေအဖြစ် ပိတ်ထား) —
`open-sse/services/providerCooldownTracker.ts` ရှိ provider-level entry တစ်ခုသည်
`providerFailureWindowMs` အတွင်း `providerFailureThreshold` ကြိမ် ပျက်ကွက်ပြီးနောက်သာ
cooldown အဖြစ် ရေတွက်ခံရပြီး၊ ထို့နောက် `providerCooldownMs` ကြာအောင် cooldown ဖြစ်သည်။
၎င်းတို့သည် လက်ရှိ breaker ၏ thresholds များ **မဟုတ်ပါ** — breaker အပြုအမူကို
မျှော်လင့်ပြီး ၎င်းတို့ကို မညှိနှိုင်းပါနှင့်။ ပုံသေတန်ဖိုးတိုင်းကို
`OMNIROUTE_PROVIDER_BREAKER_*` နှင့် `OMNIROUTE_CIRCUIT_BREAKER_*` env vars များမှတစ်ဆင့်
override လုပ်နိုင်ပြီး; runtime-အတိုင်း တိကျသော ရည်ညွှန်းဇယားသည်
`docs/architecture/RESILIENCE_GUIDE.md` တွင် ရှိသည်။

Provider-level ပျက်ကွက်မှု statuses များသာ provider breaker ကို trip လုပ်သင့်သည်:

```ts
(408, 500, 502, 503, 504);
```

ပုံမှန် account/key/model အမှားများ (ဥပမာ `401`, `403`, သို့မဟုတ် `429` cases အများစု) အတွက်
provider တစ်ခုလုံး breaker ကို trip မလုပ်ပါနှင့်။ ၎င်းတို့သည် ပုံမှန်အားဖြင့် connection
cooldown သို့မဟုတ် model lockout ၏ ကဏ္ဍဖြစ်သည်။ Generic API-key provider `403` တစ်ခုသည်
terminal provider/account error အဖြစ် ခွဲခြားသတ်မှတ်ခံရခြင်း မရှိပါက ပြန်လည်ကောင်းမွန်နိုင်သင့်သည်။

Breaker သည် background timer မဟုတ်ဘဲ lazy recovery ကို အသုံးပြုသည်။ `OPEN` သက်တမ်းကုန်သွားသောအခါ၊ `getStatus()`၊ `canExecute()` နှင့် `getRetryAfterMs()` ကဲ့သို့သော read များက state ကို `HALF_OPEN` သို့ ပြန်လည်သစ်စေသောကြောင့်၊ dashboard များနှင့် combo candidate builder များသည် သက်တမ်းကုန်သွားသော provider ကို အဆုံးအဖြတ် ချန်လှပ်ထားခြင်း မရှိတော့ပါ။

### Connection Cooldown

**အကျုံးဝင်ပိုင်နက်**: provider connection/account/key တစ်ခု။

**ရည်ရွယ်ချက်**: တူညီသော provider ၏ အခြား connection များ ဆက်လက် request များ ဝန်ဆောင်မှုပေးနေစဉ်၊ ညံ့ဖျင်းနေသော key/account တစ်ခုကို ခေတ္တကျော်လွှားရန်။

**အကောင်အထည်ဖော်ပုံ**:

- ရေးသား/အပ်ဒိတ်လုပ်ရန် လမ်းကြောင်း: `src/sse/services/auth.ts::markAccountUnavailable()`
- Account ရွေးချယ်မှု/စစ်ထုတ်မှု: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown တွက်ချက်မှု: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ဆက်တင်များ: `src/lib/resilience/settings.ts`

Provider connection များပေါ်ရှိ အရေးကြီးသော field များ:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Account ရွေးချယ်စဉ်တွင်၊ အောက်ပါအခြေအနေဖြစ်နေချိန် connection တစ်ခုကို ကျော်လွှားပါသည်:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown များသည်လည်း lazy ဖြစ်သည်: `rateLimitedUntil` သည် အတိတ်ကာလသို့ ရောက်သွားသောအခါ connection သည် ပြန်လည်အသုံးပြုနိုင်အဆင့်သို့ ရောက်ရှိသွားသည်။ အောင်မြင်စွာအသုံးပြုပြီးနောက် `clearAccountError()` က `testStatus`၊ `rateLimitedUntil`၊ error field များနှင့် `backoffLevel` ကို ရှင်းလင်းပေးသည်။

မူရင်းသတ်မှတ်ထားသော connection cooldown အပြုအမူ:

- OAuth အခြေခံ cooldown: `5s`။
- API-key အခြေခံ cooldown: `3s`။
- API-key `429` အတွက် ရရှိနိုင်သောအခါ upstream retry အကြံပြုချက်များ (`Retry-After`၊ reset header များ သို့မဟုတ် parse လုပ်နိုင်သော reset စာသား) ကို ဦးစားပေးသင့်သည်။
- ထပ်ခါတလဲလဲဖြစ်သော ပြန်လည်ကုစားနိုင်သော ချို့ယွင်းချက်များသည် exponential backoff ကို အသုံးပြုသည်:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd guard သည် တူညီသော connection ပေါ်တွင် တပြိုင်နက်တည်း ဖြစ်ပေါ်သော ချို့ယွင်းချက်များမှ cooldown ကို ထပ်ခါတလဲလဲ တိုးချဲ့ခြင်း သို့မဟုတ် `backoffLevel` ကို နှစ်ဆတိုးခြင်းမှ တားဆီးပေးသည်။

Terminal state များသည် cooldown များ မဟုတ်ပါ။ `banned`၊ `expired` (`EXPIRED_RETRY_MAX` မှတဆင့် ကန့်သတ်ထားသော retry N ကြိမ်ပြီးမှသာ terminal ဖြစ်သွားသည်) နှင့် `credits_exhausted` တို့သည် credentials/settings ပြောင်းလဲမှု သို့မဟုတ် operator ၏ ပြန်လည်သတ်မှတ်မှု မရှိမချင်း မရရှိနိုင်ဘဲ ဆက်လက်နေထိုင်ရန် ရည်ရွယ်ထားသည်။ Terminal state များကို ခေတ္တ cooldown state ဖြင့် အစားထိုးရေးသားခြင်း မပြုပါနှင့်။

### Model Lockout

**အကျုံးဝင်ပိုင်နက်**: provider + connection + မော်ဒယ်။

**ရည်ရွယ်ချက်**: ၎င်း connection အတွက် မော်ဒယ်တစ်ခုတည်းသာ မရရှိနိုင်ခြင်း သို့မဟုတ် quota ကန့်သတ်ခံရခြင်း ဖြစ်စဉ်၊ connection တစ်ခုလုံးကို ပိတ်ထားခြင်းမှ ရှောင်ကြဉ်ရန်။

ဥပမာများ:

- `429` ပြန်ပေးသော မော်ဒယ်လိုက် quota provider များ။
- ပျောက်ဆုံးနေသော မော်ဒယ်တစ်ခုအတွက် `404` ပြန်ပေးသော local provider များ။
- ရွေးချယ်ထားသော Grok mode များကဲ့သို့သော provider သီးခြား mode/model ခွင့်ပြုချက် ချို့ယွင်းမှုများ။

Model lockout သည် `open-sse/services/accountFallback.ts` တွင် တည်ရှိပြီး၊ တူညီသော connection မှ အခြားမော်ဒယ်များကို ဆက်လက်ဝန်ဆောင်မှုပေးနိုင်စေသည်။

### Debugging လမ်းညွှန်ချက်များ

- Provider တစ်ခု၏ key အားလုံး ကျော်လွှားခံနေရပါက၊ provider breaker state နှင့် connection တစ်ခုချင်းစီ၏ `rateLimitedUntil`/`testStatus` နှစ်ခုလုံးကို စစ်ဆေးပါ။
- Reset window ပြီးနောက် provider တစ်ခုကို အမြဲတမ်း ချန်လှပ်ထားသကဲ့သို့ တွေ့ရပါက၊ code သည် `getStatus()`/`canExecute()` ကို အသုံးမပြုဘဲ raw `state` ကို ဖတ်နေသည်ရှိမရှိ စစ်ဆေးပါ။
- Provider key တစ်ခု ချို့ယွင်းသော်လည်း အခြားသော key များ အလုပ်လုပ်သင့်ပါက၊ provider breaker ထက် connection cooldown ကို ဦးစားပေးပါ။
- မော်ဒယ်တစ်ခုတည်းသာ ချို့ယွင်းပါက၊ connection cooldown ထက် model lockout ကို ဦးစားပေးပါ။
- State တစ်ခု ကိုယ်တိုင်ပြန်လည်ကောင်းမွန်သင့်ပါက၊ ၎င်းတွင် အနာဂတ် timestamp/reset timeout နှင့် သက်တမ်းကုန်သွားသော state ကို ပြန်လည်သစ်စေသော read path ရှိသင့်သည်။ အမြဲတမ်း status များအတွက်မှာ manual credential သို့မဟုတ် config ပြောင်းလဲမှုများ လိုအပ်သည်။

---

## TLS Fingerprinting နှင့် Stealth

Provider အလိုက် stealth (JA3/JA4, CCH, obfuscation) ကို သီးခြားစီ မှတ်တမ်းတင်ထားပါသည် — `docs/security/STEALTH_GUIDE.md` ကို ကြည့်ပါ (git တွင်သာရှိပြီး `/docs` အတွင်းသို့ compile လုပ်မထားပါ)။

---

## ခံနိုင်ရည် စမ်းသပ်ခြင်း (Phase 8 · Block C)

Resilience logic အတွက် unit test များအပြင်၊ test သုံးခုက runtime ကို အစစ်အမှန် stress/ပျက်စီးမှုအခြေအနေများအောက်တွင် စမ်းသပ်ပါသည် (အားလုံးသည် integration/nightly ဖြစ်ပြီး — PR များကို block လုပ်ခြင်း မရှိပါ):

| Test        | ဘာကို စမ်းသပ်သနည်း                                                                                                                                                                                                                      | Run                                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node က အစစ်အမှန် latency/reset/timeout/503 ကို ထည့်သွင်းစမ်းသပ်ပြီး circuit breaker ဖွင့်ခြင်း/ပြန်လည်ကောင်းမွန်လာခြင်းနှင့် `checkFallbackError` က 503 ကို recoverable fallback အဖြစ် ခွဲခြားသတ်မှတ်မှုကို အတည်ပြုပါသည်။ | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` အောက်တွင် `createSSEStream` တစ်ခုလျှင် stream ခန ၅၀၀; heap သည် သတ်မှတ်ထားသော ceiling ကျော်လွန်ကြီးထွားလာပါက fail ဖြစ်ပါသည် (OOM guard #3069)။                                                                             | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` သို့ ဆက်တိုက်ဝန်ပေါစေခြင်း; p95/error thresholds များ။                                                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) မှ စီစဉ်ဆောင်ရွက်ပါသည်။ Default `test:integration` တွင် chaos နှင့် heap ကို ကိုယ်တိုင် skip လုပ်ပါသည် (`RUN_CHAOS_INT`/`--expose-gc` မပါဝင်ပါက)။

---

## ဆက်စပ်ကြည့်ရှုရန်

- [Architecture Guide](./ARCHITECTURE.md) — စနစ်တည်ဆောက်ပုံနှင့် အတွင်းပိုင်းဆိုင်ရာ အသေးစိတ်များ
- [အသုံးပြုသူလမ်းညွှန်](../guides/USER_GUIDE.md) — Provider များ၊ combo များ၊ CLI integration
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — အချက် ၁၆ ခု scoring၊ mode pack များ
