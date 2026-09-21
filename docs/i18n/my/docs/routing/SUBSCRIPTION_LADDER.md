# Subscription-first routing (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> `auto/*` id အသစ်နှစ်ခု — `auto/subscription` နှင့် `auto/thrifty`။ နှစ်ခုစလုံးသည်
> အမည်ဖြင့် id ကို caller က တောင်းဆိုမှသာ အသုံးပြုမည့် opt-in ပုံစံဖြစ်သည်။ caller က မတောင်းဆိုပါက
> ၎င်းတို့မှတစ်ဆင့် မည်သည့်အရာကိုမျှ route မလုပ်သည့်အပြင် လက်ရှိ pool၊ strategy သို့မဟုတ် default များလည်း
> ပြောင်းလဲမည်မဟုတ်ပါ။

## ဤအရာ တည်ရှိရသည့်အကြောင်းရင်း

OmniRoute သည် ကုန်ကျစရိတ်နှင့်ဆိုင်သော မေးခွန်းနှစ်ခုကို ဖြေဆိုပေးထားပြီးဖြစ်သော်လည်း ၎င်းတို့နှစ်ခုစလုံးသည် operator အများစု မေးလေ့ရှိသည့် မေးခွန်းမဟုတ်ပါ။

| လက်ရှိယန္တရား                                            | ဖြေဆိုပေးသည့်မေးခွန်း                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "ဤ model ကို အခမဲ့ဟု catalog တွင် သတ်မှတ်ထားသလား?"                  |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "ဤ connection က ကျွန်ုပ်ကို တစ်ချိန်ချိန်တွင် ငွေကောက်ခံနိုင်သလား?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "ဤ connection သည် ၎င်း၏ ကန့်သတ်ချက်နားသို့ ရောက်နေပြီလား?"          |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "အသုံးစရိတ်ကို ကန့်သတ်ပြီး ဈေးအနည်းဆုံးသို့ အဆင့်လျှော့ရန်"         |

အခမဲ့သီးသန့် ယန္တရားတိုင်းသည် **fails closed** ဖြစ်သည် — ကုန်ဆုံးသွားသော free pool သည်
အလွတ် pool သာဖြစ်ပြီး paid option သို့ ဘယ်တော့မှ အဆင့်မြှင့်မည်မဟုတ်ပါ — ထို့အပြင် paid ဘက်ရှိ ယန္တရားတိုင်းသည် tier ကို ထည့်သွင်းစဉ်းစားခြင်းမရှိပါ။ မည်သည့်ယန္တရားကမျှ အောက်ပါမေးခွန်းကို မဖြေဆိုပါ။

> "ကျွန်ုပ် ပေးချေထားပြီးဖြစ်သည့် quota ကို အသုံးပြုပါ။ ၎င်းကုန်သွားသောအခါ ရပ်တန့်ပါ၊ သို့မဟုတ်
> ဈေးအနည်းဆုံး paid option များမှတစ်ဆင့် တစ်ဆင့်ချင်း အဆင့်မြှင့်ပါ — ထို့နောက် reset ဖြစ်သည်နှင့် ချက်ချင်း ပြန်သွားပါ။"

## Billing သည် model နှင့်ဆိုင်သော အချက်အလက်မဟုတ်ဘဲ connection နှင့်ဆိုင်သော အချက်အလက်ဖြစ်သည်

`classifyTier()` (`open-sse/services/tierResolver.ts`) သည် `(provider, model)` ကို အခြေခံပြီး
catalog pricing မှ `free | cheap | premium` ကို ပြန်ပေးသည်။ သို့သော် request တစ်ခုက ထပ်ဆောင်းကုန်ကျငွေ ရှိ၊ မရှိသည်
**မည်သည့် connection က ၎င်းကို ဆောင်ရွက်ပေးသလဲ** ဆိုသည့်အပေါ် မူတည်သည်။ model တစ်ခုတည်းပင် Claude Code
OAuth connection မှတစ်ဆင့်ဆိုလျှင် plan တွင် ပါဝင်ပြီးသားဖြစ်သော်လည်း API-key connection မှတစ်ဆင့်ဆိုလျှင် token အလိုက် ငွေကောက်ခံသည်။

`provider_connections.auth_type` သည် မည်သည့်ဘက်တွင်မျှ ယုံကြည်စိတ်ချရသော proxy မဟုတ်ပါ — metered OAuth
connection များ ရှိသကဲ့သို့ plan တွင် ပါဝင်ပြီးသား API-key connection များလည်း ရှိသည် (Copilot seat token သည်
metered API key မဟုတ်ပါ)။ ထို့ကြောင့် billing class ကို provider တစ်ခုချင်းစီ၏ ထုတ်ပြန်ထားသော စည်းမျဉ်းသတ်မှတ်ချက်များမှ ကိုယ်တိုင်သတ်မှတ်ထားသည့် **စိစစ်ရွေးချယ်ထားသော catalog** ဖြစ်သည့်
`open-sse/config/connectionBillingCatalog.ts` မှ ရယူသည် —
၎င်းသည် free model များအတွက် `FreeModelBudget.hardStopGuaranteed` က စတင်အသုံးပြုထားပြီးဖြစ်သော ပုံစံနှင့် တူညီသည်။

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

ဆုံးဖြတ်သည့်အစဉ် (`autoCombo/connectionBilling.ts`) မှာ synthetic no-auth sentinel →
`keyless`၊ provider **နှင့်** `authType` နှစ်ခုစလုံး ကိုက်ညီသည့် catalog entry၊ provider တစ်ခုလုံးအတွက် entry၊
မဟုတ်ပါက `unknown` ဖြစ်သည်။ **စိစစ်ထည့်သွင်းမထားခြင်းသည် အခမဲ့ဟု မဆိုလိုပါ** — နေရာတိုင်းတွင် `unknown` ကို `metered`
အဖြစ် သုံးစွဲသောကြောင့် မနက်ဖြန်တွင် ထည့်သွင်းသည့် provider သည် subscription rung ၏ အပြင်ဘက်မှ စတင်မည်ဖြစ်ပြီး
၎င်းကို တမင်တကာ စိစစ်ထည့်သွင်းရမည်ဖြစ်သည်။

## Rung model

အဆင့်မြှင့်သည့်အစဉ်အတိုင်း rung ငါးခုရှိသည်။ ၎င်းတို့သည် ဈေးနှုန်းတစ်ခုတည်းတွင်သာ ကွာခြားခြင်းမဟုတ်ဘဲ တစ်ခုချင်းစီတွင် **ကိုယ်ပိုင်**
ကုန်ဆုံးမှု signal ရှိသောကြောင့် ဤအရာသည် ရိုးရိုး sort တစ်ခုမျှသာ မဟုတ်ပါ။

| #   | Rung           | အဖွဲ့ဝင်ဖြစ်မှု                                    | ကုန်ဆုံးသည်ဟု သတ်မှတ်မည့်အချိန်                                 |
| --- | -------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| 0   | `subscription` | စိစစ်ထည့်သွင်းထားသော `billing: "subscription"`     | quota window သည် cutoff တွင် သို့မဟုတ် ၎င်းအောက်တွင် ရှိသည့်အခါ |
| 1   | `keyless`      | synthetic no-auth path                             | connection cooldown / breaker ဖြစ်သည့်အခါ                       |
| 2   | `free`         | metered connection၊ `classifyTier() === "free"`    | free allowance ကုန်ဆုံးသည့်အခါ                                  |
| 3   | `cheap`        | metered connection၊ `classifyTier() === "cheap"`   | rung တစ်ခုချင်းစီအတွက် budget သုံးစွဲပြီးသည့်အခါ                |
| 4   | `premium`      | metered connection၊ `classifyTier() === "premium"` | rung တစ်ခုချင်းစီအတွက် budget သုံးစွဲပြီးသည့်အခါ                |

Rung 0-2 သည် **quota** ပေါ်မူတည်၍ ကုန်ဆုံးပြီး ၎င်းကို စောင့်ကြည့်နိုင်သည့်အပြင် လက်ရှိတွင်လည်း track လုပ်ထားပြီးဖြစ်သည်။ Rung 3-4 တွင်
quota မရှိပါ — paid connection တစ်ခုသည် အကန့်အသတ်မရှိ ဆက်လက်ဆောင်ရွက်ပေးနိုင်သည် — ထို့ကြောင့် ၎င်းတို့အတွက် အဓိပ္ပာယ်ရှိသည့် တစ်ခုတည်းသော ကုန်ဆုံးမှု signal မှာ rung တစ်ခုချင်းစီအတွက်
**budget** ဖြစ်သည်။ ထိုအရာမရှိပါက "cheap ကုန်ဆုံးသည့်အခါ အဆင့်မြှင့်ရန်" ဆိုသည်ကို စတင်စေမည့် trigger မရှိပါ။

## `auto/subscription` — ပိတ်ထားသည့်ဘက်သို့ လုံခြုံစွာပျက်ကွက်ခြင်း

Pool = rung 0 သာဖြစ်ပြီး၊ ပိုလျှံအသုံးပြုမှုကို မှတ်တမ်းတင်ထားသော `hard-stop` အဖြစ် သတ်မှတ်ထားသည့် ချိတ်ဆက်မှုများကိုသာ ကန့်သတ်ထားကာ၊ တစ်ခုချင်းစီတွင် quota အလွတ်ပမာဏရှိကြောင်း လက်ရှိအခြေအနေဖြင့် အတည်ပြုထားသည်။
မရှင်းလင်းသောအရာအားလုံးကို ချန်လှပ်ထားသည်- စိစစ်ရွေးချယ်မထားသော provider၊ အတည်မပြုနိုင်သော quota ဖတ်ရှုချက်၊ သက်တမ်းလွန်ဖတ်ရှုချက် သို့မဟုတ် အခပေးအဖြစ် တိုင်းတာတွက်ချက်သည့် ပိုလျှံအသုံးပြုမှုတို့ ဖြစ်သည်။

Pool အလွတ်ဖြစ်ခြင်းသည် ချို့ယွင်းချက်မဟုတ်ဘဲ **ရည်ရွယ်ထားသော** အဖြေဖြစ်သည် — caller ၏ လက်ရှိ empty-pool လမ်းကြောင်းသည် ၎င်းကို တိတ်တဆိတ် အခကြေးငွေပေးရမည့် fallback အဖြစ် ပြောင်းမည့်အစား ရှင်းလင်းသော error တစ်ခုအဖြစ် ပြောင်းပေးသည်။ ၎င်းသည် ဤ id ကပေးသည့် ကတိတစ်ခုလုံးဖြစ်သည်။

`keyless` သည် ရည်ရွယ်ချက်ရှိရှိ **အကျုံးမဝင်ပါ**- ဤ grouping သည် "ကျွန်ုပ် ငွေပေးချေထားသော plan" ဟု ဆိုလိုသောကြောင့် auth မလိုသည့် backend သည် ၎င်းထဲတွင် မပါဝင်သင့်ပါ။ ထိုသို့အသုံးပြုရန် `auto/thrifty` (သို့မဟုတ် `auto/best-free`) ကို အသုံးပြုပါ။

### ချိတ်ဆက်မှု ဘေးကင်းရေး

Candidate တစ်ခုသည် အမြဲတမ်း connection တစ်ခုတည်းနှင့် ချိတ်ဆက်ထားသည်မဟုတ်ပါ — logical candidate တစ်ခုတွင် `allowedConnectionIds` allowlist ပါရှိပြီး၊ အမှန်တကယ်အသုံးပြုမည့် account ကို dispatch လုပ်ချိန်တွင် `open-sse/services/combo/autoStrategy.ts` က နောက်မှရွေးချယ်သည်။ ထို့ကြောင့် grouping နှစ်ခုစလုံးသည် **connection တစ်ခုချင်းစီကို သီးခြားစီ** အတည်ပြုပြီး `allowedConnectionIds` ကို ဆက်လက်ကျန်ရှိသော subset အတိအကျသာ ပါဝင်စေရန် ပြန်ရေးသည် — မူလ list အပြည့်အစုံကို လုံးဝမသုံးသကဲ့သို့၊ မိမိစိတ်ကြိုက်ရွေးထားသော member တစ်ခုတည်းကိုလည်း လုံးဝမသုံးပါ။ `autoStrategy.ts` သည် ထို array ကို တင်းကျပ်သော allowlist အဖြစ် မူလကတည်းက အတည်ပြုကျင့်သုံးသောကြောင့်၊ ဤနေရာတွင် ပြန်ရေးခြင်းက "အတည်ပြုထားသော" set နှင့် "အမှန်တကယ်အသုံးပြုသော" set ကို ဖွဲ့စည်းပုံအရ တူညီစေသည်။ ၎င်းသည် [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) နှင့် တူညီသော invariant နှင့် တူညီသော အကြောင်းပြချက်ဖြစ်သည်။

## `auto/thrifty` — rung တစ်ဆင့်စီ တိုးမြှင့်ခြင်း

Pool = rung အားလုံးဖြစ်ပြီး rung index အလိုက် စီထားကာ၊ အသုံးပြုခွင့်ကုန်ဆုံးနေသော candidate များကို gate ဖြင့် ဖယ်ထားသည်။ `auto` engine သည် ကျန်ရှိသော pool **အတွင်းတွင်** score ပေးဆဲဖြစ်သည်- ladder က မည်သည့် rung များ ပါဝင်မည်ကို ဆုံးဖြတ်ပြီး၊ scoring က ထို rung များအတွင်း မည်သည့် candidate အနိုင်ရမည်ကို ဆုံးဖြတ်သည်။ Rung တစ်ခုအတွင်း အစီအစဉ်သည် တည်ငြိမ်သောကြောင့် scorer ၏ ကိုယ်ပိုင် ranking ကို ဤ overlay ကြောင့် မည်သည့်အခါမျှ ပြန်လည်စီစဉ်မည်မဟုတ်ပါ။

၎င်းသည် ordering + gating overlay တစ်ခုဖြစ်ပြီး dispatcher အသစ်တစ်ခု **မဟုတ်ပါ**- `combo.ts` ၏ speculative loop သည် target များကို အစီအစဉ်အတိုင်း လိုက်လံစမ်းသပ်ပြီး မအောင်မြင်ပါက နောက်တစ်ခုသို့ ဆက်သွားပြီးသားဖြစ်သောကြောင့်၊ preflight က ကြိုတင်မတွေ့ရှိခဲ့သည့် runtime exhaustion ဖြစ်ပေါ်လျှင်ပင် တူညီသော request အတွင်း နောက် rung သို့ ဆက်လက်တိုးမြှင့်မည်ဖြစ်သည်။

`auto/subscription` သည် ပိတ်ထားသည့်ဘက်သို့ လုံခြုံစွာပျက်ကွက်သော်လည်း `auto/thrifty` သည် **ဖွင့်ထားသည့်ဘက်သို့** ပျက်ကွက်သည်- အသုံးပြုနိုင်သော quota ဖတ်ရှုချက်မရှိသည့် plan တွင် ပါဝင်သော connection ကို ဦးစွာ စမ်းသပ်ဆဲဖြစ်သည်။ ၎င်းကို စမ်းသပ်ခြင်းအတွက် ကုန်ကျစရိတ်မရှိဘဲ၊ အကယ်၍ quota ကုန်ဆုံးနေကြောင်း တွေ့ရှိပါက fall-through က နောက် rung သို့ ရောက်ရှိသွားမည်ဖြစ်သည် — ဆန့်ကျင်ဘက်အားဖြင့် ၎င်းကို စမ်းသပ်ရန် ငြင်းဆန်ပါက telemetry ပျောက်ဆုံးနေချိန်တွင် request ကို အခပေး rung သို့ ပို့မည်ဖြစ်ပြီး၊ ထိုရလဒ်သည် ဤ grouping ကို ရှောင်ရှားရန် ဖန်တီးထားသည့် အတိအကျ ရလဒ်ပင်ဖြစ်သည်။

## Reset ပြီးနောက် plan သို့ ပြန်သွားခြင်း

Routing သည် rung 0 သို့ ပြန်မရောက်မီ သီးခြားအရာသုံးခု သက်တမ်းကုန်ဆုံးရမည်။ တစ်ခုတည်းကိုသာ ပြင်ဆင်ပါက plan ပြန်လည်ဖြည့်တင်းပြီးနောက် အချိန်ကြာမြင့်သည့်တိုင် ladder သည် အခပေး rung များတွင် ဆက်လက်ပိတ်မိနေမည်ဖြစ်သည်။

1. **Quota-state cache** — `freeAccessQuota.ts` သည် `(provider, connection)` တစ်ခုစီအလိုက် 180s TTL ဖြင့် cache လုပ်သည်။
   မိမိ၏ `resetAt` ကျော်လွန်ပြီးဖြစ်သော cached entry တစ်ခုသည် မရှိတော့သည့် window တစ်ခုကို ဖော်ပြနေသောကြောင့်၊ ယခုအခါ ၎င်း၏သက်တမ်းကို **ထည့်သွင်းမစဉ်းစားဘဲ** stale အဖြစ် သတ်မှတ်ပြီး refresh ကို အတင်းပြုလုပ်စေသည်။
   ဤသို့မလုပ်ပါက သန်းခေါင်ယံတွင် ပြန်လည်ဖြည့်တင်းပြီးသော plan တစ်ခုသည် TTL အလိုအလျောက်ကုန်ဆုံးသည့်အချိန်အထိ ကုန်ဆုံးနေသေးသည်ဟု ဆက်လက်ဖတ်ရှုနေမည်ဖြစ်သည်။
2. **Ladder ၏ ကိုယ်ပိုင် state** — ဒီဇိုင်းအရ လုံးဝမရှိပါ။ Pool တည်ဆောက်သည့်အခါတိုင်း လက်ရှိ quota state မှ rung eligibility ကို ပြန်လည်တွက်ချက်သည်။ Reset တစ်ခုထက် ပိုကြာရှည်နေပြီး routing ကို ပိတ်မိစေနိုင်သော persisted "currently on rung 3" record မရှိပါ။
3. **Connection cooldown** — quota ကုန်ဆုံးစေသော 429 သည် exponential backoff မှ `rateLimitedUntil` ကို သတ်မှတ်ပြီး၊ plan connection တစ်ခုအတွက် ၎င်းသည် အမှန်တကယ် reset အချိန်ကို ကျော်လွန်နိုင်သည်။ `clampCooldownToReset()`
   (`subscriptionLadder.ts`) သည် cooldown ကို upstream ၏ ကိုယ်ပိုင် reset အချိန်အထိ လျှော့ချကာ မည်သည့်အခါမျှ သက်တမ်းတိုးမည်မဟုတ်ပါ။ **၎င်းကို အကောင်အထည်ဖော်ပြီး စမ်းသပ်ထားသော်လည်း ချိတ်ဆက်အသုံးပြုခြင်း မရှိသေးပါ**- cooldown တစ်ခုခု မရေးမီ `src/sse/services/auth.ts` တွင် quota cache ကို invalidate လုပ်ထားသောကြောင့်၊ `resetAt` ကို ထို function အတွင်း ပိုမိုစောစီးစွာ ဖမ်းယူရမည် — ၎င်းသည် resilience hot path အတွက် ပြောင်းလဲမှုတစ်ခုဖြစ်ပြီး သီးခြား review ပြုလုပ်ထားသော PR တွင် ထည့်သွင်းသင့်သည်။ ထိုအချိန်မတိုင်မီ re-entry သည် connection cooldown ကုန်ဆုံးသည့်အထိ စောင့်မည်ဖြစ်သည်
   (provider က ပေးပို့သည့်အခါ upstream `Retry-After` hint များကို ယင်း cooldown က ဦးစားပေးထားပြီးဖြစ်သည်)။

### အပြန်အလှန်တုန်ခါမှု တားဆီးခြင်း

ယခုလေးတင် reset ဖြစ်သည့် rung တစ်ခုကို `reentryMinRemainingPercent` (မူလတန်ဖိုး 5) ထက်ကျော်လွန်မှသာ ပြန်လည်လက်ခံပြီး၊ အသုံးပြုနေပြီးသား connection တစ်ခုသည် `exitCutoffPercent` (မူလတန်ဖိုး 2 ဖြစ်ပြီး `quotaPreflight.defaultThresholdPercent` နှင့် ကိုက်ညီသည်) ထက်သာ ဆက်လက်မြင့်နေဖို့ လိုသည်။ ထိုနှစ်ခုကြား ကွာဟချက်သည် hysteresis band ဖြစ်သည် — ၎င်းမရှိပါက cutoff အနီးတွင် ရှိနေသော connection တစ်ခုသည် ဆက်တိုက် request များတွင် rung များကြား အပြန်အလှန် တုန်ခါနေမည်ဖြစ်သည်။

## ပြင်ဆင်သတ်မှတ်ခြင်း

ချိန်ညှိခြင်းအတွက်သာ ဖြစ်သည်။ ရည်ရွယ်ချက်ရှိရှိဖြင့် `enabled` အလံ **မပါရှိပါ**။ ၎င်းတို့ကို ပိတ်နိုင်သည့် toggle တစ်ခုရှိပါက
အခပေး model များအပါအဝင် pool အပြည့်အစုံကို `auto/subscription` က ၎င်း၏အဓိပ္ပာယ်နှင့် ဆန့်ကျင်သည့်
အမည်အောက်တွင် မသိမသာ ဆက်လက်ဝန်ဆောင်မှုပေးနေမည် ဖြစ်သည်။

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 သည် rung တစ်ခုကို လုံးဝပိတ်သည်
  },
}
```

သုံးစွဲငွေ resolver ကို ချိတ်ဆက်မထားမချင်း budget gating သည် သက်ရောက်မှုမရှိပါ။ စာရင်းတွက်ချက်မှု မရရှိနိုင်သည့်အခါ အခပေး
rung ကို အစီအစဉ်ထဲ ထည့်ထားသော်လည်း မည်သည့်အခါမျှ gate လုပ်မည်မဟုတ်ပါ။ v3.8.51 မှစ၍ `rungBudgetUsd` setting ကို
schema က လက်ခံသော်လည်း အကောင်အထည်ဖော် အသုံးချခြင်း မရှိသေးပါ — လက်ရှိအသုံးပြုနေသော သုံးစွဲငွေကန့်သတ်ချက်အဖြစ် မယူဆဘဲ နောင်အသုံးပြုရန် သီးသန့်ထားသော configuration အဖြစ် ယူဆပါ။ Rung အစီအစဉ်သတ်မှတ်ခြင်း၊ quota အခြေပြု ကုန်ဆုံးခြင်းနှင့် reset ပြီးနောက် ပြန်လည်ဝင်ရောက်ခြင်းတို့သည်
၎င်းမပါဘဲလည်း အလုပ်လုပ်သည်။

## ပေါင်းစပ်အသုံးပြုခြင်း

`subscription` နှင့် `thrifty` တို့သည် `AutoTier` value များဖြစ်သောကြောင့် category တိုင်းနှင့် ပေါင်းစပ်အသုံးပြုနိုင်သည်-
`auto/coding:thrifty`, `auto/reasoning:subscription` စသည်တို့ ဖြစ်သည်။ flat id နှစ်ခုဖြစ်သော
(`auto/subscription`, `auto/thrifty`) ကို `/v1/models` နှင့် dashboard တွင် ဖော်ပြထားသည်။

မည်သည့် id မျှ paid-tier မဟုတ်သောကြောင့် `isPaidTierAutoId()` သည် နှစ်ခုစလုံးအတွက် `false` ကို ပြန်ပေးပြီး
`auto/subscription` သည် `hidePaidModels` အသုံးပြုပြီးနောက်တွင်လည်း ကျန်ရှိနေသည်။

## Code တည်ရှိရာနေရာ

| သက်ဆိုင်ရာအကြောင်းအရာ                                        | File                                                |
| ------------------------------------------------------------ | --------------------------------------------------- |
| စိစစ်ရွေးချယ်ထားသော billing အချက်အလက်များ                    | `open-sse/config/connectionBillingCatalog.ts`       |
| Classifier                                                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Rung များ၊ grouping နှစ်မျိုးစလုံးနှင့် ပြန်လည်ဝင်ရောက်ခြင်း | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Candidate pool သို့ ချိတ်ဆက်ထည့်သွင်းခြင်း                   | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Reset ကို သိရှိသည့် cache အဟောင်းဖြစ်မှု                     | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Tier မျက်နှာပြင်                                             | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ဖော်ပြထားသော id များ                                         | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| စမ်းသပ်မှုများ                                               | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
