# AgentRouter Setup Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) သည် Anthropic နှင့် တွဲဖက်အသုံးပြုနိုင်သော relay တစ်ခုဖြစ်ပြီး Claude နှင့် အခြား model များကို တိုက်ရိုက် Anthropic API ထက် မကြာခဏ ပိုမိုသက်သာသော ဈေးနှုန်းများဖြင့် ပြန်လည်ရောင်းချပေးသည်။ ၎င်းကို တရားဝင် Claude Code client အတွက် အစားထိုးထည့်သွင်းသုံးနိုင်သော `ANTHROPIC_BASE_URL` အဖြစ် ဒီဇိုင်းရေးဆွဲထားသဖြင့် Claude Code ၏ wire image (သီးခြား User-Agent၊ `anthropic-beta` flag များ၊ Stainless SDK header များ စသည်) နှင့် ကိုက်ညီသော traffic ကိုသာ လက်ခံသည်။

## အမြန်စတင်ခြင်း — မူရင်း `agentrouter` provider ကို အသုံးပြုပါ (အကြံပြုထားသည်)

အသုံးပြုသူအများစုအတွက် **အထူးပြင်ဆင်သတ်မှတ်မှု မလိုအပ်ပါ**။ OmniRoute တွင် Claude Code wire image အပြည့်အစုံကို ကြိုတင်ထည့်သွင်းထားသည့် built-in `agentrouter` provider ပါဝင်ပြီးသားဖြစ်သည် (`open-sse/config/providerRegistry.ts` → `agentrouter` ကို ကြည့်ပါ)။ ၎င်းကို အသုံးပြုရန်-

1. **Dashboard → Providers → Add Provider** ကို ဖွင့်ပါ။
2. စာရင်းမှ **AgentRouter** ကို ရွေးချယ်ပါ။
3. သင့် `sk-...` API key ကို ထည့်ပြီး သိမ်းဆည်းပါ။

ဤမျှသာဖြစ်သည် — environment variable များ သို့မဟုတ် custom provider type မလိုအပ်ပါ။ Built-in model များတွင် `claude-opus-4-6`၊ `claude-haiku-4-5-20251001`၊ `glm-5.1` နှင့် `deepseek-v3.2` တို့ ပါဝင်သည်။

ဤလမ်းညွှန်၏ ကျန်အပိုင်းတွင် **အဆင့်မြင့်နည်းလမ်း** ဖြစ်သော `anthropic-compatible-cc-*` provider type အသုံးပြုပုံကို ဖော်ပြထားသည်။ Wire image ကို ပိုမိုထိန်းချုပ်ရန် လိုအပ်သည့်အခါ—ဥပမာ၊ မူရင်း provider registry တွင် မပါဝင်သေးသော အခြား AgentRouter ပုံစံ relay များနှင့် ချိတ်ဆက်သည့်အခါ သို့မဟုတ် base URL၊ chat path သို့မဟုတ် header အစုကို အစားထိုးသတ်မှတ်လိုသည့်အခါ—၎င်းကို အသုံးပြုပါ။

---

## အဆင့်မြင့်- Claude Code နှင့် တွဲဖက်အသုံးပြုနိုင်သော provider type မှတစ်ဆင့် ချိတ်ဆက်ခြင်း

OmniRoute သည် မှန်ကန်သော wire image ဖြင့် Anthropic Messages API ကို ဆက်သွယ်အသုံးပြုသည့် **Claude Code နှင့် တွဲဖက်အသုံးပြုနိုင်သော** provider type (`anthropic-compatible-cc-*`) မှတစ်ဆင့် AgentRouter (နှင့် အလားတူ relay များ) ကိုလည်း ပံ့ပိုးပေးသည်။ `https://agentrouter.org` ကို ညွှန်ပြထားသော ယေဘုယျ `openai-compatible-chat` provider တစ်ခုသည် **အလုပ်လုပ်မည်မဟုတ်ပါ**—အထက်ပိုင်း WAF သည် Claude Code ကဲ့သို့ မမြင်ရသော request များကို ငြင်းပယ်သည်။

---

## ကြိုတင်လိုအပ်ချက်များ

- AgentRouter account နှင့် API key တစ်ခု။ အကောင့်အသစ်ဖွင့်သူများသည် project [README](../README.md) ရှိ affiliate link မှတစ်ဆင့် အခမဲ့ credit များ ရရှိသည်။
- `ENABLE_CC_COMPATIBLE_PROVIDER` feature flag ကို ဖွင့်ထားပြီး OmniRoute လည်ပတ်နေခြင်း (အောက်တွင် ကြည့်ပါ)။

## 1. CC-compatible provider type ကို ဖွင့်ပါ

Claude Code နှင့် တွဲဖက်အသုံးပြုနိုင်သော provider type သည် တရားဝင် Claude Code client ကို အနီးကပ်တုပထားသော traffic ပေးပို့သောကြောင့် feature flag နောက်ကွယ်တွင် ထားရှိထားသည်။ OmniRoute ကို မစတင်မီ environment variable တစ်ခု သတ်မှတ်ခြင်းဖြင့် ၎င်းကို ဖွင့်ပါ-

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker ဥပမာ-

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

ပြန်လည်စတင်ပြီးနောက် dashboard တွင် ရှိပြီးသား OpenAI-compatible နှင့် Anthropic-compatible flow များအပြင် **Add Claude Code Compatible** ရွေးချယ်စရာကို ဖော်ပြပေးသည်။

## 2. Dashboard တွင် provider ကို ဖန်တီးပါ

1. **Dashboard → Providers → Add Provider** ကို ဖွင့်ပါ။
2. **Add Claude Code Compatible** ကို ရွေးချယ်ပါ (အထက်ပါ flag ကို သတ်မှတ်ထားမှသာ မြင်ရမည်)။
3. အောက်ပါ field များကို ဖြည့်ပါ-

| Field     | Value                                                                          |
| --------- | ------------------------------------------------------------------------------ |
| အမည်      | `AgentRouter` (သို့မဟုတ် မည်သည့် label မဆို)                                   |
| Prefix    | `agentrouter` (log များနှင့် dashboard တွင် ဖော်ပြသော ဖတ်ရှုရလွယ်ကူသည့် alias) |
| Base URL  | `https://agentrouter.org`                                                      |
| Chat path | `/v1/messages?beta=true` (မူလတန်ဖိုး — မပြောင်းဘဲထားပါ)                        |

> Canonical model identifier သည် provider node ID အပြည့်အစုံ
> (`anthropic-compatible-cc-{uuid}/{model}`) ကို ဆက်လက်အသုံးပြုသည်။ **Prefix** သည် log output ကို
> ဖတ်ရှုရ ပိုမိုလွယ်ကူစေရန် `src/lib/usage/callLogs.ts` က ဖြေရှင်းပေးသည့် display
> alias တစ်ခုသာဖြစ်သည်။

4. (မဖြစ်မနေမဟုတ်) မသိမ်းဆည်းမီ ချိတ်ဆက်နိုင်မှုကို အတည်ပြုရန် **Validate** field တွင် သင့် API key ကို ထည့်ပြီး **Check** ကို နှိပ်ပါ။
5. **Add** ကို နှိပ်ပါ။

ဖန်တီးပြီးသည်နှင့် provider ကို ဖွင့်ပြီး သင့် AgentRouter API key (`sk-...`) ဖြင့် **Connection** တစ်ခု ထည့်ပါ။ Connection ၏ `test_status` သည် `active` သို့ ပြောင်းသွားသင့်သည်။

## 3. combo မှတစ်ဆင့် သို့မဟုတ် တိုက်ရိုက် အသုံးပြုပါ

သင့် provider ၏ prefix ကို namespace အဖြစ် အသုံးပြုပြီး model ကို ရည်ညွှန်းပါ-

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Canonical model ID ဖြစ်သည့် `anthropic-compatible-cc-{uuid}/claude-opus-4-6` ကိုလည်း အသုံးပြုနိုင်ပြီး
၎င်းသည် database နှင့် combo configuration တွင် ပေါ်လာသည့် ID ဖြစ်သည်။

သို့မဟုတ် အခြား provider များကဲ့သို့ routing၊ fallback နှင့် quota management အတွက်
၎င်းကို combo တစ်ခုထဲသို့ ထည့်ပါ။

---

## Wire image အသေးစိတ်များ

ကိုးကားရန်အတွက် cc-compatible bridge သည် upstream request တစ်ခုစီတွင် အောက်ပါတို့ကို
ပေးပို့သည် (`open-sse/services/claudeCodeCompatible.ts` ကို ကြည့်ပါ)-

| Header                                                    | Value                                                                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                           | `Bearer <api-key>`                                                                                             |
| `User-Agent`                                              | `claude-cli/2.1.258 (external, sdk-cli)`                                                                       |
| `anthropic-version`                                       | `2023-06-01`                                                                                                   |
| `anthropic-beta`                                          | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                       |
| Connection တစ်ခုချင်းစီအလိုက် redact-thinking beta toggle | Redacted thinking stream များကို အထူးလိုအပ်သည့် upstream များအတွက် `redact-thinking-2026-02-12` ကို ထည့်ပေးသည် |
| Connection တစ်ခုချင်းစီအလိုက် summarized thinking toggle  | Display mode မသတ်မှတ်ရသေးသော CC Compatible thinking request များတွင် `display: "summarized"` ကို ထည့်ပေးသည်    |
| `anthropic-dangerous-direct-browser-access`               | `true`                                                                                                         |
| `x-app`                                                   | `cli`                                                                                                          |
| `X-Stainless-*`                                           | Stainless SDK header အမျိုးမျိုး (ဘာသာစကား၊ package version၊ OS၊ architecture စသည်)                            |

ဤအချက်များကြောင့် request များသည် upstream WAF / client whitelist ကို ဖြတ်သန်းနိုင်ခြင်းဖြစ်သည်။

---

## ပြဿနာဖြေရှင်းခြင်း

**`{"error":{"message":"unauthorized client detected, ..."}}`** — သင့် request သည်
Claude Code wire image နှင့် မကိုက်ညီပါ။ Provider ကို `anthropic-compatible-cc` အစား
`openai-compatible-chat` အဖြစ် configure လုပ်ထားသည့်အခါ သို့မဟုတ် startup တွင်
`ENABLE_CC_COMPATIBLE_PROVIDER=true` flag ကို မသတ်မှတ်ထားသည့်အခါ ဤပြဿနာဖြစ်ပေါ်သည်။

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token မမှန်ကန်ပါ"။ Wire image မှန်ကန်သော်လည်း API key ကို ငြင်းပယ်ထားသည်။ AgentRouter
dashboard တွင် key အသစ်တစ်ခု ထုတ်လုပ်ပြီး connection ကို အပ်ဒိတ်လုပ်ပါ။

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter ၏ moderation hook က request content ကို ငြင်းပယ်ခဲ့ခြင်း သို့မဟုတ်
key ၏ plan က တောင်းဆိုထားသော model ကို အသုံးပြုခွင့်မပေးခြင်း ဖြစ်သည်။ အခြား prompt သို့မဟုတ် model တစ်ခုကို စမ်းကြည့်ပါ၊
အန္တရာယ်မရှိသော prompt တစ်ခု အမြဲတမ်း block ခံနေရပါက AgentRouter support ကို ဆက်သွယ်ပါ။

**သတ်မှတ်ထားသော model များတွင်သာ ဖြစ်ပေါ်သည့် `[400]: content-blocked`** — AgentRouter plan အများစုသည်
model အချို့ကိုသာ အသုံးပြုခွင့်ပေးသည် (ဥပမာ `claude-opus-4-6`)။ Key မှန်ကန်နေသော်လည်း အခြား model ID များက
`unauthorized_client_error` ကို ပြန်ပေးသည်။ သင့် plan က မည်သည့် model များကို လွှမ်းခြုံထားသည်ကို AgentRouter dashboard တွင် စစ်ဆေးပါ။

**omniroute log များမှ `Invalid JSON response from provider (reset after Ns)`** —
Upstream က JSON မဟုတ်သော body တစ်ခုကို ပြန်ပေးခဲ့သည် (အများအားဖြင့် WAF မှ HTML error page ဖြစ်သည်)။
၎င်းသည် ပုံမှန်အားဖြင့် request သည် AgentRouter backend သို့ လုံးဝမရောက်ခဲ့ကြောင်း ဆိုလိုသည် — provider ID သည်
`anthropic-compatible-cc-` ဖြင့် စတင်ကြောင်း ပြန်စစ်ပါ (နောက်ဆုံးရှိ dash ကို သတိပြုပါ —
`open-sse/services/claudeCodeCompatible.ts` ရှိ `CLAUDE_CODE_COMPATIBLE_PREFIX` ကို ကြည့်ပါ)
ထို့ပြင် feature flag ကို ဖွင့်ထားကြောင်း စစ်ဆေးပါ။

**AgentRouter provider ရှိပြီးသားဖြစ်သော်လည်း `unauthorized client detected` / HTML error page
ဖြစ်ပေါ်ခြင်း** — သင့်တွင် AgentRouter provider **တစ်ခုထက်ပို၍** ရှိနိုင်ပြီး
သင့် request သည် မှားယွင်းသော provider သို့ ရောက်ရှိနေခြင်း ဖြစ်နိုင်သည်။ ကျန်ရှိနေသော ကိုယ်တိုင်ဖန်တီးထားသည့်
`anthropic-compatible-*` (`cc` မဟုတ်သော) သို့မဟုတ် `openai-compatible-chat-*` provider ကို
`agentrouter` prefix ဖြင့် ဖန်တီးထားပါက ၎င်းသည် `agentrouter/<model>` model
ID များကို ပိုင်ဆိုင်နိုင်သည် (ထို့ပြင် combo များက ၎င်းကို node ID ဖြင့် ရည်ညွှန်းထားနိုင်သည်)။ ထို့ကြောင့် traffic သည်
မှန်ကန်သော wire image ကို မူလကတည်းက ပေးထားသည့် built-in `agentrouter` provider အစား —
သာမန် User-Agent ကို ပေးပို့၍ ငြင်းပယ်ခံရသည့် ထို provider သို့ route လုပ်သွားသည်။
Model အမှန်တကယ် မည်သည့်နေရာသို့ resolve ဖြစ်သည်ကို omniroute log များတွင် စစ်ဆေးပါ (`ROUTING` tag တွင်
`agentrouter/<model> → <providerId>/<model>` ကို ပြသသည်)။ `<providerId>` သည်
`agentrouter` မဟုတ်ပါက native provider ပေါ်တွင် စုစည်းပါ- combo များကို
`agentrouter/<model>` (providerId `agentrouter`) သို့ ညွှန်ပေးပြီး ထပ်နေသော
compatible provider များကို ဖျက်ပါ။ Native provider သည် wire-image configuration နှင့်
`customUserAgent` မလိုအပ်ပါ။

---

## ထပ်မံကြည့်ရှုရန်

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web provider ပေါင်းစည်းမှုဆိုင်ရာ မှတ်စုများ
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — အခမဲ့အဆင့် provider
  စာရင်း
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire image အကောင်အထည်ဖော်မှု
