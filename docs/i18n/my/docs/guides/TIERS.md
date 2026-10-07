# OmniRoute Tiers — User Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute သည် ပံ့ပိုးထားသော provider 352 ခုကို စီးပွားရေးအရ အဆင့် 3 ဆင့်အဖြစ် စုစည်းထားသည်။ Request တစ်ခုစီသည် အောင်မြင်စွာ response ပြန်ပေးနိုင်သည့် provider တစ်ခုကို တွေ့သည်အထိ ၎င်းတို့ကို အစဉ်လိုက် ဖြတ်သန်းသွားသည် — fallback code ကို လုံးဝရေးစရာမလိုဘဲ အသုံးပြုနိုင်သည့် ဈေးအနည်းဆုံး response ကို ရရှိမည်ဖြစ်သည်။

## အဆင့် 1 — Subscription

**သင် ငွေပေးချေထားပြီးဖြစ်သော provider များ။** OmniRoute သည် quota သက်တမ်းမကုန်ဆုံးမီ ကျန်ရှိသမျှကို အပြည့်အဝအသုံးပြုသည်။

| Provider                            | အဆင့် 1 ဖြစ်ရသည့်အကြောင်းရင်း                                               |
| ----------------------------------- | --------------------------------------------------------------------------- |
| Claude Code OAuth                   | Anthropic Pro/Team — နှုန်းထားပုံသေဖြစ်ပြီး မကြာခဏ အသုံးမပြုဘဲ ကျန်နေတတ်သည် |
| OpenAI Codex (ChatGPT subscription) | Plus/Team တွင် Codex quota ပါဝင်သည်                                         |
| GitHub Copilot                      | အသုံးပြုသူတစ်ဦးချင်းစီအလိုက် — quota ကို လစဉ် ပြန်လည်သတ်မှတ်သည်             |
| Cursor IDE                          | Pro plan quota                                                              |
| Antigravity / Devin Desktop         | ထည့်သွင်းပေးထားသော quota များ                                               |

**နည်းဗျူဟာ**: model ၏ အားသာချက်များနှင့် ကိုက်ညီသော request တိုင်းကို ဤနေရာသို့ ဦးစွာ route လုပ်ပါ။ Quota tracker သည် နီးကပ်လာသော reset များကို စောင့်ကြည့်ပြီး `reset-aware`
combo နည်းဗျူဟာက ၎င်းနှင့်အညီ ဦးစားပေးသည်။ အဆင့် 1 သို့ ဦးစွာ route လုပ်ပြီး quota ကုန်ဆုံးမှသာ ငွေပေးချေရသော အဆင့်များသို့ ကူးပြောင်းရန် `auto/thrifty` id ကို အသုံးပြုပါ — သို့မဟုတ် plan တွင် ပါဝင်သော capacity ပေါ်တွင်သာ ဆက်ရှိပြီး မရနိုင်ပါက ရပ်တန့်စေရန် `auto/subscription`
ကို အသုံးပြုပါ။ [Subscription ကို ဦးစားပေးသော routing](../routing/SUBSCRIPTION_LADDER.md) ကို ကြည့်ပါ။

## အဆင့် 2 — ဈေးသက်သာ

**Token 1M လျှင် $1 အောက်ကျသင့်သော အသုံးပြုသလောက်ပေးချေရသည့် provider များ။** ပမာဏများပြားသော အလုပ်များအတွက် သို့မဟုတ် အဆင့် 1 quota များ ကန့်သတ်ချက်သို့ ရောက်ပြီးနောက် အသုံးပြုရန် သီးသန့်ထားသည်။

| Provider                     | ဈေးနှုန်း (input/output) | အားသာချက်များ          |
| ---------------------------- | ------------------------ | ---------------------- |
| DeepSeek V4 Pro              | 1M လျှင် $0.27 / $1.10   | Code၊ reasoning        |
| GLM-4.5                      | 1M လျှင် $0.60 / $2.20   | ရှည်လျားသော context    |
| MiniMax M1                   | 1M လျှင် $0.20 / $1.10   | မြန်နှုန်း             |
| Qwen Coder                   | 1M လျှင် $0.30 / $1.20   | Code                   |
| OpenRouter (price-optimized) | အပြောင်းအလဲရှိသည်        | Model 100+ ခု၊ dynamic |

**နည်းဗျူဟာ**: combo `cost-optimized` သည် task ၏ capability filter (vision၊ JSON mode၊ tools၊ max-context) နှင့် ကိုက်ညီသော model များထဲမှ token တစ်ခုလျှင် ဈေးအနည်းဆုံး model ကို ရွေးချယ်သည်။

## အဆင့် 3 — အခမဲ့

**ကုန်ကျစရိတ်မရှိသော provider များ** — အခမဲ့အဆင့်များ၊ credit အစီအစဉ်များနှင့် OAuth နေ့စဉ် quota များ။

| Provider         | အခမဲ့ quota / credit များ                      |
| ---------------- | ---------------------------------------------- |
| Kiro AI          | အခမဲ့ Claude အဆင့် (အသုံးပြုခွင့် များပြားသည်) |
| OpenCode Free    | Auth မလိုအပ်ဘဲ rate limit များ များပြားသည်     |
| Qoder            | အခမဲ့ OAuth                                    |
| Google Vertex AI | Account အသစ်အတွက် $300 credit                  |
| Amazon Q         | AWS အသုံးပြုသူများအတွက် အခမဲ့အဆင့်             |
| Pollinations     | အများသုံး public API                           |
| Cloudflare AI    | Workers AI အခမဲ့အဆင့်                          |

**နည်းဗျူဟာ**: budget cap ပါသော combo `auto` သည် အဆင့် 1+2 မအောင်မြင်သည့်အခါ သို့မဟုတ် `useFreeOnly=true` ဟု သတ်မှတ်ထားသည့်အခါ ဤနေရာသို့ route လုပ်သည်။ အခမဲ့ provider များတွင် rate limit အားနည်းတတ်သည် — circuit breaker သည် backoff ပြီးနောက် ၎င်းတို့ကို ပြန်လည်အသုံးပြုနိုင်အောင် လုပ်ပေးသည်။

## အဆင့်များကို စီစဉ်သတ်မှတ်ခြင်း

Dashboard → **Tiers** → သင်၏ provider များကို သက်ဆိုင်ရာအဆင့်များ သတ်မှတ်ပါ။ မူလသတ်မှတ်ချက်များ (`tierDefaults.json` မှ) သည် သင့်လျော်ပြီး အသုံးပြုနိုင်သည်။ ဦးစားပေးလိုသော subscription များ သို့မဟုတ် ဖယ်ထုတ်လိုသော provider များရှိပါက ပြင်ဆင်ပါ။

Auto-Combo ၏ အချက် 16 ချက်ပါ scoring သည် အဆင့်ကိုလည်း ထည့်သွင်းစဉ်းစားသည်။ [`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md) ကို ကြည့်ပါ။

## Telemetry

Dashboard → **Usage** တွင် အဆင့်တစ်ခုစီအလိုက် တစ်နေ့လျှင် အသုံးပြုခဲ့သော token များကို ပြသသည်။ ၎င်းကို အောက်ပါတို့အတွက် အသုံးပြုပါ။

- အဆင့် 1 ကို အပြည့်အဝအသုံးပြုထားကြောင်း အတည်ပြုရန် (သို့မဟုတ်ပါက subscription ၏ တန်ဖိုးကို အလဟဿဖြစ်စေသည်)
- အဆင့် 2 model များထဲမှ မည်သည့် model များကို အများဆုံးရွေးချယ်ထားကြောင်း ဖော်ထုတ်ရန် (1-2 ခုအထိ စုစည်းပါ)
- စမ်းသပ်ခြင်း/စူးစမ်းလေ့လာခြင်း workload များတွင် အဆင့် 3 က ငွေကုန်သက်သာစေကြောင်း စစ်ဆေးရန်

## အသုံးများသော ပုံစံများ

### အခမဲ့သီးသန့် workload

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

အဆင့် 3 ဘက်သို့ အလေးအနက် ဦးတည်စေပြီး အဆင့် 3 မရနိုင်မှသာ အဆင့် 2 ကို အသုံးပြုသည်။

### Subscription ကို ဦးစားပေးပြီး ဈေးသက်သာသော fallback ထားရှိခြင်း

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

အဆင့် 1 → အဆင့် 2 → အဆင့် 3 နှင့် ကိုက်ညီသော တိကျသည့် အစဉ်လိုက်စာရင်း။
