# Compression Engines (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute compression ကို engine contract များအပေါ် အခြေခံ၍ တည်ဆောက်ထားသည်။ mode တစ်ခုသည် engine တစ်ခုကို တိုက်ရိုက်
(`caveman` သို့မဟုတ် `rtk`) အသုံးပြုနိုင်သကဲ့သို့ engine အများအပြားကို သတ်မှတ်ထားသောအစီအစဉ်အတိုင်း လုပ်ဆောင်သည့် အဆုံးအဖြတ်တိကျသော stacked pipeline ကိုလည်း အသုံးပြုနိုင်သည်။

## Mode များ

| Mode         | Engine လမ်းကြောင်း                        | ရည်ရွယ်ထားသော input                                          |
| ------------ | ----------------------------------------- | ------------------------------------------------------------ |
| `off`        | မရှိ                                      | Prompt ကို မူလအတိုင်း အတိအကျ ထိန်းသိမ်းခြင်း                 |
| `lite`       | Caveman lite helper များ                  | အန္တရာယ်နည်းပြီး အမြဲဖွင့်ထားနိုင်သော ရှင်းလင်းခြင်း         |
| `standard`   | Caveman                                   | သဘာဝဘာသာစကား prompt ကို ကျစ်လျစ်စေခြင်း                      |
| `aggressive` | Caveman + history/tool summarizer များ    | ရှည်လျားသော chat session များ                                |
| `ultra`      | Caveman + pruning helper များ             | Context limit ပြန်လည်ရရှိရေး                                 |
| `rtk`        | RTK                                       | Terminal၊ shell၊ build၊ test နှင့် git output                |
| `omniglyph`  | OmniGlyph                                 | မူရင်း provider wire ပေါ်ရှိ context-as-image                |
| `stacked`    | Pipeline၊ မူလသတ်မှတ်ချက် `rtk -> caveman` | Tool log နှင့် စာသား ရောနှောထားသော input၊ ချွေတာမှုအများဆုံး |

### OmniGlyph compression profile များ

`omniglyph` engine (package `omniglyph`, 1.4.0+) သည် အမည်ပေးထားသော semantic profile တစ်ခုကို လက်ခံပြီး ၎င်းကို compression setting များအတွင်းရှိ `omniglyph.profile` မှတစ်ဆင့် တစ်ကမ္ဘာလုံးအတိုင်းအတာဖြင့်ဖြစ်စေ၊
stacked pipeline ၏ step config မှတစ်ဆင့် step တစ်ခုချင်းစီအလိုက်ဖြစ်စေ သတ်မှတ်နိုင်သည်-

| Profile       | နယ်နိမိတ်                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | မူလသတ်မှတ်ချက်။ ထုတ်ပြန်ထားသော receipt များဖြင့် တိုင်းတာခဲ့သည့် policy — system၊ tool doc များနှင့် ထူထပ်သော history ကို image အဖြစ် ပြောင်းသည် |
| `balanced`    | လက်ရှိ state ကို မူရင်းအတိုင်း ထားရှိပြီး နောက်ဆုံး 8 turn ကို ကာကွယ်ကာ ပိတ်ပြီးသား history အဟောင်းများကို ကျစ်လျစ်စေသည်                         |
| `coding-safe` | authority၊ tool schema များနှင့် လက်ရှိ tool output ကို မူရင်းအတိုင်း ထားရှိပြီး နောက်ဆုံး 12 turn ကို ကာကွယ်သည်                                 |
| `passthrough` | အသွင်ပြောင်းခြင်းမပြုဘဲ route လုပ်သည်၊ engine ကို ကျော်သွားသည်                                                                                   |

Profile သည် **အနိမ့်ဆုံးသတ်မှတ်ချက်မဟုတ်ဘဲ အမြင့်ဆုံးကန့်သတ်ချက်ဖြစ်သည်**- package အတွင်းရှိ `mergeCompressionProfileOptions` သည် profile က ပိတ်ထားသော ဆုံးရှုံးမှုရှိသည့် lane ကို caller override တစ်ခုက ပြန်ဖွင့်ခွင့်မပြုသောကြောင့် step တစ်ခုချင်းစီ၏
`preserveSystemPrompt: false` သည် `coding-safe` အောက်တွင် system compression ကို ပြန်ဖွင့်နိုင်မည်မဟုတ်ပါ။

ဤ codebase ပေါ်တွင် တိုင်းတာချက်အရ `coding-safe` နှင့် `balanced` တို့သည် `minCompressChars` ကို ၎င်း၏
အမြင့်ဆုံးတန်ဖိုးအထိ မြှင့်တင်ပြီး system၊ tool schema များနှင့် tool result များကို မူရင်းအတိုင်း ထိန်းသိမ်းထားသောကြောင့် history မစုဆောင်းရသေးသည့် session တစ်ခုသည်
`below_min_chars` တွင် ရပ်တန့်သွားပြီး engine က မည်သည့်အရာကိုမျှ အသွင်မပြောင်းပါ။ ထို့ကြောင့် အလုံခြုံဆုံး profile အစား `aggressive` ကို မူလသတ်မှတ်ချက်အဖြစ် အသုံးပြုထားခြင်းဖြစ်သည်။

Package သည် ၎င်းကိုယ်ပိုင် model scope နှင့် profile ကို environment configuration မှ ဖြေရှင်းသတ်မှတ်သည်။
OmniRoute သည် ဆုံးဖြတ်ချက်ကို မည်သည့်အခါမျှ လွှဲအပ်ခြင်းမရှိပါ- adapter သည် model gate ကို package ၏
အတင်းကျပ်ဆုံး scope တွင် သတ်မှတ်ထားသောကြောင့် host environment setting များသည် allowlist ကို ပိုမိုကျဉ်းမြောင်းစေရုံသာ လုပ်နိုင်ပြီး OmniRoute ၏ တိုင်းတာထားသော receipt များထက် ကျော်လွန်၍ ချဲ့ထွင်နိုင်ခြင်း မရှိပါ။

## Engine Registry

Registry သည် `open-sse/services/compression/engines/registry.ts` တွင် ရှိသည်။ Engine များသည် အောက်ပါ ဘုံ
contract ကို ဖော်ထုတ်ပေးသည်-

- `id`: `caveman` သို့မဟုတ် `rtk` ကဲ့သို့ တည်ငြိမ်သော engine id
- `apply(text, config)`: stacked pipeline များက အသုံးပြုသော အမွေဆက်ခံထားသည့် လုပ်ဆောင်မှုလမ်းကြောင်း
- `compress(input, config)`: text + stats ကို ပြန်ပေးသည့် အဓိကလုပ်ဆောင်မှုလမ်းကြောင်း
- `getConfigSchema()`: မှန်ကန်သော config ၏ JSON-Schema ပုံစံနှင့်ဆင်တူသည့် ဖွဲ့စည်းပုံကို ပြန်ပေးသည်
- `validateConfig(config)`: `{ valid, errors[] }` ကို ပြန်ပေးသည်

မှတ်ပုံတင်ခြင်းအတွက် `registerCompressionEngine(engine)` (သို့မဟုတ် အဆင့်မြင့်အသုံးပြုမှုများအတွက် `registerEngine`)
ကို အသုံးပြုပြီး၊ ၎င်းသည် လက်မခံမီ `assertValidEngine()` နှင့် `validateConfig(defaultConfig)` ကို ခေါ်သည်။
Runtime တွင် engine တစ်ခုကို ဖယ်ရှားရန် `unregisterCompressionEngine(id)` ကို အသုံးပြုပါ။

`strategySelector.ts` သည် compression မလုပ်ဆောင်မီ built-in engine များကို မှတ်ပုံတင်ပေးသည်။ ထို့ကြောင့် preview၊
runtime compression၊ stacked mode၊ test များနှင့် အနာဂတ် engine များသည် တူညီသော လုပ်ဆောင်မှုလမ်းကြောင်းကို အသုံးပြုနိုင်သည်။

### MCP description compression (ဆက်စပ်မှုရှိသည်)

သီးခြား registry တစ်ခုသည် registry အဆင့်တွင် MCP tool description metadata ကို ချုံ့ပေးသည် — အသေးစိတ်ကို
`open-sse/mcp-server/descriptionCompressor.ts` နှင့် [MCP-SERVER.md](../frameworks/MCP-SERVER.md) တွင် ကြည့်ပါ။ ၎င်းသည်
Caveman စည်းမျဉ်းများကို ပြန်လည်အသုံးပြုသော်လည်း request payload များအစား tool metadata အပေါ် လုပ်ဆောင်သည်။

### နောက်ထပ် built-in engine များ

Caveman၊ RTK နှင့် LLMLingua-2 တို့အပြင် registry တွင် အထူးပြု lossless /
structural engine အများအပြား ပါဝင်သည် (stacked pipeline များ၊ playground နှင့် test များက အသုံးပြုသည်)-

| Engine        | Id              | လုပ်ဆောင်ပုံ                                                                                                                                                                                                                           |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4)- ဆက်တိုက်ရှိသော ကြီးမားသည့် text block များကို content-addressed reference များဖြင့် အစားထိုးပြီး၊ ထပ်နေသော/ကြီးမားသော block များကို တစ်ကြိမ်သာ ပေးပို့ကာ နောက်ပိုင်းတွင် reference ဖြင့် ရည်ညွှန်းသည်။ |
| headroom      | `headroom`      | SmartCrusher (H3 + N5)- တူညီသောပုံစံရှိသည့် JSON-array payload များကို columnar `[N rows]` ပုံစံသို့ ဆုံးရှုံးမှုမရှိဘဲ ဇယားပုံစံဖြင့် ကျစ်လျစ်စေသည်။                                                                                  |
| ionizer       | `ionizer`       | အလွန်ကြီးမားသော တူညီသည့်ပုံစံရှိ block များအတွက် အစ/အလယ်/အဆုံး row sampling ပြုလုပ်ပြီး ချန်လှပ်ထားသည့် အလယ်ပိုင်းကို CCR content-addressed reference အဖြစ် သိမ်းဆည်းသည်။                                                              |
| session-dedup | `session-dedup` | Content-addressed cross-turn deduplication (TokenMizer ကို အခြေခံထားသည်)- တူညီသော session ၏ အစောပိုင်း turn များတွင် တွေ့ရှိပြီးသော text ကို ချန်လှပ်သည်။                                                                              |

**CCR retrieve-protocol ညွှန်ကြားချက် (#8033)-** request တစ်ခုတွင် CCR က block ≥1 ခုကို
ပထမဆုံးအကြိမ် အစားထိုးသည့်အခါ engine သည် caller အား marker → tool contract ကို သင်ကြားပေးရန်
`[CCR protocol]` sentinel ဖြင့် စတင်သော တစ်ခုတည်းဖြစ်ပြီး idempotent ဖြစ်သည့် `system` message ကို ရှေ့တွင် ထည့်သွင်းသည်-
`[CCR retrieve hash=<24hex> chars=N]` marker ၏ အဓိပ္ပာယ်၊ hash ကို စာလုံးမပြောင်းဘဲ အတိအကျ ကူးယူရမည်ဖြစ်ကြောင်း
(hex စာလုံး 24 လုံးစလုံး — hash များကို မှားယွင်းကူးယူခြင်းသည် "block not found"
ဖြစ်ရခြင်း၏ ဖြစ်နိုင်ခြေအများဆုံး အကြောင်းရင်းဖြစ်သည်) နှင့် `[dedup:ref sha=...]` marker သည် "history ထဲတွင် ပြန်ရှာပါ" ဟု ဆိုလိုပြီး "tool ကို ခေါ်ပါ" ဟု မဆိုလိုကြောင်း ဖြစ်သည်။
ဤမှတ်ချက်ကို **caller က ကြေညာထားသော `tools[]` အရ
`omniroute_ccr_retrieve` ကို အမှန်တကယ် ခေါ်ဆိုနိုင်ကြောင်း သက်သေပြသည့်အခါမှသာ** ထည့်သွင်းသည်
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts` ရှိ `callerSupportsCcrRetrieve()`) — ထို tool
မပါဝင်သော သာမန် OpenAI-compatible caller သည် ၎င်းလက်လှမ်းမမီနိုင်သော အရာကို ခေါ်ရန် ညွှန်ကြားချက်ကို မည်သည့်အခါမျှ
လက်ခံရရှိမည်မဟုတ်ပါ။ Idempotency ကို ထည့်သွင်းခြင်းမပြုမီ message history တွင် sentinel ရှိမရှိ စစ်ဆေးခြင်းဖြင့်
အတည်ပြုထားသောကြောင့် ယခင် message များကို ပြန်လည်ပေးပို့သည့် multi-turn request များတွင်
turn တစ်ခုစီတိုင်းအတွက် မှတ်ချက် ထပ်မတိုးသွားပါ။

## Caveman

Caveman မုဒ်သည် ပုံမှန်စကားပြေ၏ အဓိပ္ပာယ်ဆိုင်ရာ ချုံ့သိပ်မှုကို အဓိကထားသည်-

- code block များ၊ URL များ၊ JSON၊ path များနှင့် ဖွဲ့စည်းပုံကျသော ဒေတာများကို မူလအတိုင်း ထိန်းသိမ်းသည်
- မလိုအပ်သော ဖြည့်စွက်စကားများ၊ မသေချာမှုဖော်ပြချက်များ၊ ထပ်တလဲလဲပါဝင်သည့် အကြောင်းအရာနှင့် ရှည်လျားသော ဆက်စပ်စကားစုများကို ဖယ်ရှားသည်
- `open-sse/services/compression/rules/` ရှိ ဘာသာစကားအလိုက် file rule pack များကို ပံ့ပိုးသည်
- legacy `standard`၊ `aggressive` နှင့် `ultra` မုဒ်များမှတစ်ဆင့်လည်း ဆက်လက်အသုံးပြုနိုင်သည်

Dashboard ပေါ်ရှိ တည်နေရာမှာ `Dashboard -> Context & Cache -> Caveman` ဖြစ်သည်။

Caveman upstream က output token `~75%` ပိုနည်းခြင်း၊ benchmark များတွင် ပျမ်းမျှ output ချွေတာမှု `65%`
နှင့် အကွာအဝေး `22-87%`၊ ထို့ပြင် input ချုံ့သိပ်မှု tool `~46%` ရှိကြောင်း အစီရင်ခံထားသည်။
OmniRoute သည် stacked prompt/context ချွေတာမှုများကို မှတ်တမ်းတင်ရာတွင် Caveman ၏ input-side
ကိန်းဂဏန်းကို အသုံးပြုသည်။ Caveman output မုဒ်သည် သီးခြား response-behavior လုပ်ဆောင်ချက်အဖြစ် ဆက်လက်ရှိနေသည်။

## RTK

RTK မုဒ်သည် command နှင့် tool output ကို အဓိကထားသည်-

- `git status`၊ `git branch`၊ `git diff`၊ Vitest/Jest/Pytest၊
  Cargo/Go test များ၊ TypeScript/Vite/Webpack build များ၊ ESLint၊ npm audit/install များ၊ Docker log များ၊
  shell `find`/`grep`၊ stack trace များနှင့် ယေဘုယျ log များကဲ့သို့ output အမျိုးအစားများကို ရှာဖွေသတ်မှတ်သည်
- `open-sse/services/compression/engines/rtk/filters/` မှ JSON filter 49 ခုကို အသုံးချသည်
- RTK ပုံစံ declarative pipeline ကို ပံ့ပိုးသည်- ANSI ဖယ်ရှားခြင်း၊ အစားထိုးခြင်း၊ match-output short-circuit၊
  line များကို ဖယ်ရှား/ထိန်းသိမ်းခြင်း၊ line တစ်ခုချင်းစီ ဖြတ်တောက်ခြင်း၊ head/tail/max-line ဖြတ်တောက်ခြင်းနှင့် output မရှိချိန် fallback
- `.rtk/filters.json` ရှိ trust-gated project filter များနှင့်
  `DATA_DIR/rtk/filters.json` ရှိ global filter များကို ပံ့ပိုးသည်
- ANSI sequence များ၊ progress noise၊ ထပ်တလဲလဲ line များနှင့် အသုံးမဝင်သော boilerplate များကို ဖယ်ရှားသည်
- လုပ်ဆောင်ဖြေရှင်းနိုင်သော failure များ၊ warning များ၊ summary များ၊ ပြောင်းလဲထားသော file များနှင့် tail context ကို ထိန်းသိမ်းသည်
- authenticated management route များမှတစ်ဆင့် ပြန်လည်ရယူခြင်း/debugging ပြုလုပ်ရန် redact လုပ်ထားသော raw output ကို
  ရွေးချယ်၍ သိမ်းဆည်းထားနိုင်သည်

Dashboard ပေါ်ရှိ တည်နေရာမှာ `Dashboard -> Context & Cache -> RTK` ဖြစ်သည်။

Custom filter များ၊ trust၊ verify နှင့် raw-output ပြန်လည်ရယူခြင်းဆိုင်ရာ လုပ်ငန်းလည်ပတ်မှု အသေးစိတ်များကို
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) တွင် ဖော်ပြထားသည်။

RTK upstream က command-output ချုံ့သိပ်မှုအတွက် `60-90%` ချွေတာနိုင်ကြောင်း အစီရင်ခံထားသည်။ ၎င်း၏ README ဥပမာတွင်
မိနစ် 30 ကြာ Claude Code session တစ်ခုသည် token `~118,000` မှ `~23,900` သို့ လျော့ကျသွားပြီး `79.7%` ချွေတာနိုင်ကြောင်း ပြထားသည်။

## LLMLingua-2 (အဓိပ္ပာယ်အခြေပြု ဖြတ်တောက်ခြင်း)

LLMLingua-2 မုဒ်သည် သေးငယ်သော ONNX token
classifier ကို အသုံးပြု၍ စကားပြေပေါ်တွင် **အဓိပ္ပာယ်အခြေပြု token ဖြတ်တောက်ခြင်း** ကို လုပ်ဆောင်ပြီး rule-based Caveman နှင့် RTK engine များကို ဖြည့်စွက်ပေးသည်-

- system မဟုတ်သော message များရှိ စကားပြေကိုသာ ချုံ့သိပ်သည်။ fenced code block များနှင့် အခြားထိန်းသိမ်းထားသော
  တည်ဆောက်ပုံများကို လုံးဝမပြောင်းလဲပါ
- `@atjsh/llmlingua-2` backend (`@huggingface/transformers` မှတစ်ဆင့် ONNX) ကို
  worker thread တစ်ခုအတွင်း လုပ်ဆောင်သဖြင့် model inference သည် request event loop ကို မည်သည့်အခါမျှ ပိတ်ဆို့ခြင်းမရှိပါ
- **ထပ်ဆင့်အသုံးပြုနိုင်သည်** (`stackPriority` 35)- stacked pipeline တစ်ခုတွင် ၎င်းသည်
  structural engine များ (CCR၊ session-dedup၊ headroom၊ Caveman) ပြီးနောက်၊ သို့သော် `ultra` မတိုင်မီ လုပ်ဆောင်သည်။ အဘယ်ကြောင့်ဆိုသော်
  အဓိပ္ပာယ်အခြေပြု ဖြတ်တောက်ခြင်းသည် ဖွဲ့စည်းပုံအရ ချုံ့သိပ်ပြီးသားစာသားတွင် အထိရောက်ဆုံးဖြစ်သောကြောင့်ဖြစ်သည် — ဥပမာ
  `rtk -> caveman -> llmlingua`
- **မည်သည့် error ဖြစ်ပေါ်မှုတွင်မဆို fail-open ပြုလုပ်သည်** (optional dependency များ ပျောက်ဆုံးခြင်း၊ worker spawn၊ model load၊ inference
  သို့မဟုတ် timeout) → မူလစာသားကို မပြောင်းလဲဘဲ ပြန်ပေးပြီး error ကို မည်သည့်အခါမျှ မပြန်ပေးပါ

Engine တည်နေရာ- `open-sse/services/compression/engines/llmlingua/`။ Dashboard ပေါ်ရှိ တည်နေရာမှာ
`Dashboard -> Context & Cache -> LLMLingua` ဖြစ်သည်။

### Model များ

Default model သည် **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
မြန်ဆန်သည်) ဖြစ်သည်။ ပိုမိုတိကျသော **BERT-base** model (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) ကို engine config ၏ `model` field မှတစ်ဆင့် အသုံးပြုနိုင်သည်။ `@huggingface/transformers`
သည် ပထမဆုံးခေါ်ယူမှုတွင် ရွေးချယ်ထားသော model ကို HuggingFace Hub မှ
`${DATA_DIR}/models/llmlingua` ထဲသို့ လိုအပ်ချိန်မှသာ download လုပ်သည် (`modelStore.ts`)။ `modelPath` config
override ဖြင့် ၎င်းကို local copy တစ်ခုသို့ ညွှန်ပြနိုင်သည် (offline / air-gapped install များ)။

### Optional dependency များနှင့် လိုအပ်ချိန်မှ install လုပ်ခြင်း

ဖြတ်တောက်ဖယ်ရှားနိုင်သော LLMLingua runtime peer stack သည် **optional** ဖြစ်သည်။ Package နှစ်ခုကို
`package.json` တွင် `optionalDependencies` အဖြစ် ကြေညာထားပြီး production build က **external** အဖြစ် ထားရှိသည်
(`scripts/build/prepublish.ts` သည် ၎င်းတို့ကို bundle မလုပ်ပါ)-

| Package              | Version (pin) | မှတ်ချက်များ                                            |
| -------------------- | ------------- | ------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | အဓိက package၊ အခြား package များကို peer အဖြစ် ကြေညာသည် |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                               |

`@huggingface/transformers` ကို `^4.2.0` တွင် pin လုပ်ထားသည် (local embedding path နှင့် မျှဝေထားပြီး
standalone bundle ထဲသို့လည်း trace လုပ်ထားသည်)။ `@atjsh/llmlingua-2@2.0.5` သည်
`"^3.5.2 || ^4.0.0"` ဖြင့် ၎င်းကို peer လုပ်ထားသောကြောင့် Transformers.js v3 နှင့် v4 နှစ်မျိုးစလုံးကို ပံ့ပိုးသည်။ 2.0.4 မှစ၍
`@atjsh/llmlingua-2` သည် `@tensorflow/tfjs` ကို မလိုအပ်တော့သဖြင့် SLM stack အတွက် အကြီးဆုံးပါဝင်ပမာဏရှိခဲ့သော
TensorFlow.js ကို ဖယ်ရှားနိုင်ခဲ့သည်။ အထက်ပါ package နှစ်ခုသာ ဖြတ်တောက်ဖယ်ရှားနိုင်သော SLM
peer များဖြစ်သည်။ Standard `npm install` (dev) သည် optional dependency များကို ချန်လှပ်မထားပါက optional stack ကို အလိုအလျောက် install လုပ်သည်။

**လိုအပ်ချိန်မှသာ လုပ်ဆောင်ရသည့်အကြောင်းရင်း-** npm တွင် ဖြန့်ချိထားသော package၊ standalone bundle နှင့် Docker image တို့ကို
သေးငယ်ပေါ့ပါးစေရန် အဆိုပါ dependency များ **မပါဘဲ** ပို့ဆောင်သည်။ ၎င်းတို့ မရှိသည့်အခါ worker ၏ dependency
gate (`worker.ts` ရှိ `@atjsh/llmlingua-2` resolve probe တစ်ခု) မအောင်မြင်ဘဲ engine သည်
**အသံတိတ် fail-open လုပ်သည်** — LLMLingua ကို ရွေးချယ်ခြင်းသည် no-op ဖြစ်သွားသည် (စာသားကို မပြောင်းလဲဘဲ ပြန်ပေးပြီး
error ကို log မလုပ်ပါ)။ Pruned environment တစ်ခုတွင် ၎င်းကို အသက်သွင်းရန် optional stack ကို install လုပ်ပါ-

```bash
# package.json optionalDependencies တွင် ကြေညာထားသော version များသို့ pin လုပ်ရန်
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` ကို ဖယ်ရှားခြင်း (2.0.4+) သည် ယခင်က အဓိကနေရာယူခဲ့သော ~800 MB
အစိတ်အပိုင်းကို ဖယ်ရှားပေးသည် — ကျန်ရှိသော footprint မှာ transformers.js + onnxruntime-node runtime များနှင့်
ပထမဆုံးအသုံးပြုချိန်တွင် download လုပ်သော TinyBERT model (~57 MB) တို့ဖြစ်သည် (npm မှတစ်ဆင့် မဟုတ်ပါ)။

Environment တစ်ခုချင်းစီအလိုက်-

- **Dev / `npm install`** — `--omit=optional` (သို့မဟုတ် `--no-optional`) ကို ထည့်သွင်းအသုံးပြုထားခြင်းမရှိပါက အလိုအလျောက် install လုပ်ပေးပါသည်။
  မည်သည့်လုပ်ဆောင်ချက်မျှ မလိုအပ်ပါ။
- **Global npm (`npm i -g omniroute`) / standalone** — အထက်ပါ install command ကို
  install လုပ်ထားသော package directory အတွင်း run ပါ၊ သို့မဟုတ် optional dependency များကို မချန်လှပ်ဘဲ ပြန်လည် install လုပ်ပါ။
- **Docker** — ဆင့်ပွား image layer တစ်ခုတွင် install command ကို ထည့်ပါ။ ထုတ်ဝေထားသော image ကို
  ရည်ရွယ်ချက်ရှိရှိ ပေါ့ပါးအောင် ပြုလုပ်ထားပါသည်။
- **VPS (PM2)** — app ၏ `node_modules` ထဲသို့ install လုပ်ပြီးနောက် worker က gate ကို ပြန်လည်စစ်ဆေးနိုင်စေရန်
  process ကို restart လုပ်ပါ။
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — standalone
  trace တွင် worker နှင့် optional dependency များ နှစ်မျိုးစလုံး မပါဝင်သောကြောင့် engine သည် အသိပေးချက်မရှိဘဲ
  fail-open ဖြစ်သွားပါသည်။ `scripts/build/colocate-standalone.mjs` သည် နှစ်မျိုးစလုံး (worker esbuild +
  optional dependency များ၏ closure ကို standalone tree ထဲသို့) ပြန်လည်ထည့်သွင်းပေးပြီး build တစ်ကြိမ်ပြီးတိုင်း
  `postbuild` npm hook မှတစ်ဆင့် အလိုအလျောက် run ပါသည်။ ထပ်ခါတလဲလဲ run နိုင်ပြီး dependency များ မရှိသည့်အခါ fail-soft ဖြစ်ပါသည်။

**၎င်း အလုပ်လုပ်နေကြောင်း စစ်ဆေးရန်:** LLMLingua ကို ရွေးချယ်ထားသည့်အခါ တကယ့်စာသားများ အမှန်တကယ် တိုသွားပြီး (engine သည်
fail-open ဖြစ်ခြင်းကို ရပ်တန့်သွားမည်) ပထမဆုံး request က model ကို
`${DATA_DIR}/models/llmlingua` ထဲသို့ download လုပ်ခြင်းကို စတင်စေပါသည်။ Gate သည် `@atjsh/llmlingua-2` ကိုသာ ရည်ရွယ်ချက်ရှိရှိ စစ်ဆေးပါသည် —
အခြား peer များသည် ESM-only ဖြစ်ပြီး ၎င်းတို့ ရှိနေသည့်တိုင် `require.resolve` က error ပစ်မည်ဖြစ်သောကြောင့် —
`import()` ပြုလုပ်ချိန်တွင် peer တစ်ခုခု အမှန်တကယ် ပျောက်ဆုံးနေပါက worker သည် fail-open ဆက်ဖြစ်နေမည်ဖြစ်သည်။

## အဆင့်ဆင့်ချိတ်ဆက်ထားသော Pipeline များ

Stacked mode သည် pipeline အဆင့်များကို အစဉ်လိုက် လုပ်ဆောင်သည်။ မူလသတ်မှတ်ချက်မှာ-

```txt
rtk -> caveman
```

Prompt တစ်ခုတွင် command output ကို လူသား သို့မဟုတ် assistant ရေးသားသည့် စာသားနှင့် ပေါင်းစပ်ထားသော coding-agent session များအတွက် ဤ mode ကို အသုံးပြုပါ။ RTK သည် ဆူညံနေသော tool log များကို ဦးစွာ လျှော့ချပေးပြီး၊ ထို့နောက် Caveman က ကျန်ရှိသော သဘာဝဘာသာစကားကို ချုံ့ပေးသည်။

Pipeline အဆင့်များကို compression setting များရှိ `stackedPipeline` ဖြင့် သို့မဟုတ် compression combo များမှတစ်ဆင့် သတ်မှတ်နိုင်သည်။

Engine နှစ်ခုစလုံးက အကျုံးဝင်သော payload တစ်ခုတည်းကို လျှော့ချသည့်အခါ ချွေတာမှုများ ဆင့်ပွားတိုးလာသည်-

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP Accessibility Tree Filter

MCP accessibility-tree smart filter သည် prompt များ သို့မဟုတ် context ပေါ်တွင်မဟုတ်ဘဲ MCP **tool result များ** ပေါ်တွင် လုပ်ဆောင်သော execution ပြီးနောက် compression layer တစ်ခုဖြစ်သည်။ ၎င်းသည် Playwright၊ computer-use နှင့် browser-automation MCP server များကဲ့သို့သော tool များမှ ပြန်ပေးသည့် ရှည်လျားအသေးစိတ်သော accessibility-tree နှင့် browser snapshot payload များကို ပစ်မှတ်ထားသည်။

### ၎င်းလုပ်ဆောင်သည့်အရာများ

1. **ဆူညံမှုဖယ်ရှားခြင်း** — အလွတ်ဖြစ်နေသော generic/text entry များကို ဖယ်ရှားသည် (`- generic:`, `- text: ""`)
2. **အဆင့်တူ item များ ချုံ့ခြင်း** — ဆက်တိုက်ရှိသော line ≥ `collapseThreshold` (မူလတန်ဖိုး 30) သည် တည်ဆောက်ပုံဆိုင်ရာ ထပ်ကျော့မှုများဖြစ်နေပါက၊ ၎င်းတို့ကို ပထမ `collapseKeepHead` (မူလတန်ဖိုး 10) line များ + အရေအတွက်အနှစ်ချုပ် + နောက်ဆုံး `collapseKeepTail` (မူလတန်ဖိုး 5) line များအဖြစ် ချုံ့သည်
3. **Ref ထိန်းသိမ်းခြင်း** — Playwright/computer-use အတွက် လိုအပ်သော `[ref=eXX]` anchor များကို မည်သည့်အခါမျှ မပြောင်းလဲပါ
4. **အတင်းအကျပ်ဖြတ်တောက်ခြင်း** — ချုံ့ပြီးနောက် စာသားသည် `maxTextChars` (မူလတန်ဖိုး 50,000) ကို ကျော်လွန်နေသေးပါက၊ agent က ဆက်လက်လုပ်ဆောင်နိုင်စေရန် navigation အရိပ်အမြွက်တစ်ခုနှင့်အတူ ဖြတ်တောက်သည်

### Engine တည်နေရာ

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() ဝင်ပေါက်
  collapseRepeated.ts ← အဆင့်တူ item များ ချုံ့သည့် algorithm
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### ဖွဲ့စည်းသတ်မှတ်ချက်

Global setting များရှိ `compression.mcpAccessibility` (migration 056) ဖြင့် ထိန်းချုပ်သည်။ မူလ config-

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filter ကို `type` သည် `"text"` ဖြစ်ပြီး အလျားသည် `minLengthToProcess` ထက်ကျော်သော tool-result payload များတွင်သာ အသုံးချသည်။ ၎င်းသည် prompt compression သို့မဟုတ် request payload များအပေါ် သက်ရောက်မှုမရှိပါ။

### မျှော်မှန်းထားသော ချွေတာမှု

စာမျက်နှာ၏ ရှုပ်ထွေးမှုအပေါ်မူတည်၍ browser snapshot tool result များတွင် 60–80% ချွေတာနိုင်သည်။ Collapse algorithm သည် line အရေအတွက်အလိုက် O(n) ဖြစ်ပြီး ထပ်တိုး latency မှာ မဆိုစလောက်သာ ဖြစ်သည်။

### ဤ filter နှင့် အထက်ပါ compression engine များ၏ ကွာခြားချက်

| ကဏ္ဍ              | Caveman / RTK / Stacked       | MCP accessibility filter               |
| ----------------- | ----------------------------- | -------------------------------------- |
| ပစ်မှတ်           | Request prompt များ / context | MCP tool result များ                   |
| အစပျိုးမှု        | Compression mode setting      | `compression.mcpAccessibility.enabled` |
| သက်ရောက်မှုနယ်ပယ် | SSE message အားလုံး           | Tool result များသာ                     |
| Ref anchor များ   | မသက်ဆိုင်ပါ                   | ခြွင်းချက်မရှိ ထိန်းသိမ်းထားသည်        |

---

## ဖိသိပ်မှု ပေါင်းစပ်ပရိုဖိုင်များ

ဖိသိပ်မှု ပေါင်းစပ်ပရိုဖိုင်များသည် လမ်းကြောင်းရွေးချယ်မှု ပေါင်းစပ်ပရိုဖိုင်များထံ သတ်မှတ်ပေးနိုင်သည့် အမည်ပေးထားသော ဖိသိပ်မှု ပရိုဖိုင်များဖြစ်သည်-

- `compression_combos`: မုဒ်၊ pipeline၊ RTK ဖွဲ့စည်းသတ်မှတ်မှု၊ ဘာသာစကား ဖွဲ့စည်းသတ်မှတ်မှုနှင့် မူလသတ်မှတ် အမှတ်အသားတို့ကို သိမ်းဆည်းသည်
- `compression_combo_assignments`: ဖိသိပ်မှု ပေါင်းစပ်ပရိုဖိုင်တစ်ခုကို လမ်းကြောင်းရွေးချယ်မှု ပေါင်းစပ်ပရိုဖိုင်တစ်ခုနှင့် ချိတ်ဆက်သတ်မှတ်သည်
- runtime ပေါင်းစည်းမှုသည် ယေဘုယျ ပေါင်းစပ်ပရိုဖိုင် override များမတိုင်မီ သတ်မှတ်ပေးထားသော ဖိသိပ်မှု ပေါင်းစပ်ပရိုဖိုင်တစ်ခုကို ဖြေရှင်းရွေးချယ်သည်
- analytics တွင် `compression_combo_id` နှင့် `engine` ပါဝင်သည်

Dashboard တည်နေရာ- `Dashboard -> Context & Cache -> Compression Combos`။

## API မျက်နှာပြင်

| Route                                  | ရည်ရွယ်ချက်                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `/api/settings/compression`            | ကမ္ဘာလုံးဆိုင်ရာ ဖိသိပ်မှု ဆက်တင်များ (`mcpAccessibility` ဖွဲ့စည်းသတ်မှတ်မှု ပါဝင်သည်) |
| `/api/compression/preview`             | မည်သည့် ဖိသိပ်မှုမုဒ်ကိုမဆို အစမ်းကြည့်ရှုရန်                                          |
| `/api/compression/language-packs`      | ရရှိနိုင်သော Caveman ဘာသာစကားပက်ကေ့ချ်များကို စာရင်းပြုစုရန်                           |
| `/api/context/caveman/config`          | Caveman ဆက်တင်များအတွက် alias                                                          |
| `/api/context/rtk/config`              | RTK မူလတန်ဖိုးများနှင့် ဆက်တင်များ                                                     |
| `/api/context/rtk/filters`             | RTK filter catalog                                                                     |
| `/api/context/rtk/test`                | RTK အစမ်းကြည့်ရှုခြင်း/စမ်းသပ်ခြင်း endpoint                                           |
| `/api/context/rtk/raw-output/[id]`     | စစ်မှန်ကြောင်းအတည်ပြုထားပြီး ဖုံးကွယ်ပြင်ဆင်ထားသော raw-output ပြန်လည်ရယူမှု            |
| `/api/context/combos`                  | ဖိသိပ်မှု ပေါင်းစပ်ပရိုဖိုင် CRUD                                                      |
| `/api/context/combos/[id]/assignments` | လမ်းကြောင်းရွေးချယ်မှု ပေါင်းစပ်ပရိုဖိုင် သတ်မှတ်ခြင်း CRUD                            |
| `/api/context/analytics`               | ဖိသိပ်မှု analytics alias                                                              |

စီမံခန့်ခွဲမှု route များတွင် စီမံခန့်ခွဲမှုဆိုင်ရာ authentication သို့မဟုတ် API-key မူဝါဒ စစ်ဆေးမှုများ လိုအပ်သည်။

## MCP ကိရိယာများ

ဖိသိပ်မှုစနစ်တွင် MCP ကိရိယာ ငါးခုကို ဖော်ထုတ်ပေးထားသည်-

| ကိရိယာ                              | Scope               | ရည်ရွယ်ချက်                                        |
| ----------------------------------- | ------------------- | -------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | ဆက်တင်များ၊ analytics နှင့် cache ကိန်းဂဏန်းများ   |
| `omniroute_compression_configure`   | `write:compression` | ကမ္ဘာလုံးဆိုင်ရာ ဆက်တင်များကို အပ်ဒိတ်လုပ်ရန်      |
| `omniroute_set_compression_engine`  | `write:compression` | မုဒ်နှင့် ရွေးချယ်နိုင်သော pipeline ကို သတ်မှတ်ရန် |
| `omniroute_list_compression_combos` | `read:compression`  | ဖိသိပ်မှု ပေါင်းစပ်ပရိုဖိုင်များကို စာရင်းပြုစုရန် |
| `omniroute_compression_combo_stats` | `read:compression`  | ပေါင်းစပ်ပရိုဖိုင်/engine analytics ကို ဖတ်ရန်     |

## အကျုံးဝင်မှုနှင့် ချန်လှပ်မှုများ

**Embeddings များကို မည်သည့်အခါမျှ ဖိသိပ်ခြင်းမပြုပါ။** `open-sse/handlers/embeddings.ts` သည် မည်သည့်
ဖိသိပ်မှု engine ကိုမျှ မခေါ်ပါ — request/response body များသည် ပြောင်းလဲမှုမရှိဘဲ executor ထံ
တိုက်ရိုက်ဖြတ်သန်းသွားသည်။ လက်ရှိတွင် ၎င်းသည် ဖွဲ့စည်းပုံအရ အာမခံထားခြင်းဖြစ်ပြီး (embeddings နှင့် chat completions တို့သည်
သီးခြား handler များဖြစ်သည်) runtime စစ်ဆေးမှုတစ်ခု မဟုတ်သော်လည်း #8034 ရှိ vector-distortion ဆိုင်ရာ စိုးရိမ်မှုသည်
embeddings လမ်းကြောင်းတွင် ထိတွေ့နိုင်သည့် မျက်နှာပြင်မရှိဟု ဆိုလိုသည်။

**မော်ဒယ်/endpoint အလိုက် ချန်လှပ်မှု filter (#8034)။** chat completions အတွက် operator တစ်ဦးသည်
မည်သည့်အခါမျှ ဖိသိပ်ခြင်းမပြုရမည့် model id များ / `provider/model` target များကို သတ်မှတ်နိုင်သည် — နောင်တွင်
ဖိသိပ်မှုကို embeddings နှင့် နီးစပ်သော လမ်းကြောင်းတစ်ခုနှင့် ပိုမိုနီးကပ်စွာ ချိတ်ဆက်မိပါက အသုံးဝင်သည့် guardrail တစ်ခုဖြစ်ပြီး၊
တိကျသော byte-for-byte prompt အရေးကြီးသည့် မည်သည့်မော်ဒယ်အတွက်မဆို ယေဘုယျအားဖြင့် အသုံးဝင်သည်
(deterministic evals၊ cache-sensitive prefixes စသည်တို့)။

- ဆက်တင် field- ကမ္ဘာလုံးဆိုင်ရာ ဖိသိပ်မှု config ပေါ်ရှိ `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`) ကို ရှိပြီးသား `key_value` ဖိသိပ်မှု
  namespace (`src/lib/db/compression.ts`) မှတစ်ဆင့် အမြဲသိမ်းဆည်းသည် — table အသစ်မလိုပါ။
- Dashboard tab- **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`)။
- Pattern syntax- `*` သည် တစ်ခုတည်းသော wildcard ဖြစ်သည်။ pattern တစ်ခုရှိ အခြား regex metacharacter
  အားလုံးကို ကိုက်ညီမှုစစ်ဆေးခြင်းမပြုမီ escape လုပ်ထားသောကြောင့် `gpt-5.6` သည် တိကျသော literal string နှင့်သာ
  ကိုက်ညီပြီး `gpt-5x6` နှင့် မည်သည့်အခါမျှ မကိုက်ညီပါ
  (ReDoS-safe၊ အကန့်အသတ်ရှိပြီး nested quantifier များ မရှိပါ)။ Pattern များသည်
  bare model id နှင့် `provider/model` composite နှစ်ခုစလုံးကို စာလုံးအကြီးအသေး မခွဲခြားဘဲ ကိုက်ညီမှုစစ်ဆေးသည် —
  `gpt-5-6`၊ `openai/gpt-5-6` နှင့် `openai/*` အားလုံး အလုပ်လုပ်ပြီး `*` တစ်ခုတည်းသည် မော်ဒယ်အားလုံးကို ချန်လှပ်သည်။
- ကိုက်ညီမှုစစ်ဆေးခြင်း- `open-sse/services/compression/exclusions.ts` ရှိ
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`။ `chatCore.ts` သည် ဖိသိပ်မှုဆက်တင်များကို
  ဖြေရှင်းပြီးသည်နှင့် ချက်ချင်း၊ **မည်သည့် engine မလည်ပတ်မီ** ချန်လှပ်ထားသော target ကို စစ်ဆေးပြီး
  ကိုက်ညီမှုတစ်ခုကို ဖိသိပ်မှု ကမ္ဘာလုံးဆိုင်ရာပိတ်ထားသကဲ့သို့ အတိအကျ ကိုင်တွယ်သည် — request body သည်
  byte အဆင့် တစ်ထပ်တည်းဖြစ်ကြောင်း သက်သေပြနိုင်သည်။ ကျော်သွားမှုကို analytics တွင် မြင်နိုင်စေရန်
  `writeCompressionSkip(..., "excluded")` မှတစ်ဆင့် မှတ်တမ်းတင်သည်။
- မူလအခြေအနေ (စာရင်းဗလာ/မရှိခြင်း)- #8034 မတိုင်မီ အပြုအမူနှင့် တစ်ထပ်တည်းဖြစ်ပြီး မည်သည့်အရာကိုမျှ ချန်လှပ်မထားပါ။

## သိရှိထားသော ကန့်သတ်ချက်များ

- **LLMLingua-2 (SLM) သည် optional deps များကို တစ်နေရာတည်းတွင် ထားရှိရန် လိုအပ်သည်။** `@atjsh/llmlingua-2` နှင့် peer များကို
  `dist/node_modules` ထဲတွင် တစ်နေရာတည်း၌ ထားရှိထားမှသာ worker သည် production build တွင်
  အလုပ်လုပ်သည် (`scripts/build/colocateOptionals.mjs`, #4286 ကို ကြည့်ပါ)။ ၎င်းတို့မရှိပါက
  engine သည် fail-open ဖြစ်ပြီး (မူရင်းစာသားကို ပြန်ပေးသည်)။ Worker resolution သည်
  `import.meta.url` ပေါ်တွင် မူတည်တော့မည် မဟုတ်ပါ (standalone bundle တွင် ၎င်းက အလုပ်မလုပ်ပါ) — runtime
  cwd / `argv[1]` ကို အခြေပြုသည်။
- **Caveman ဘာသာစကား pack များဖြစ်သည့် `de` / `fr` / `ja` သည် မပြည့်စုံသေးပါ။** ၎င်းတို့တွင် `context` +
  `filler` + `structural` rule များ ပါဝင်သော်လည်း `dedup` / `ultra` pack များ မပါဝင်သဖြင့် ထိုဘာသာစကားများအတွက်
  `ultra` intensity သည် `full` ထက် ပိုမပြင်းပါ (၎င်းတို့၏ ကိုယ်ပိုင် rule များကိုသာ အသုံးပြုသည် — နိုင်ငံခြားဘာသာစာသားကို
  ပျက်စီးစေနိုင်သည့် အင်္ဂလိပ် `dedup`/`ultra` rule များသို့ အသံတိတ် fall-back လုပ်ခြင်း မရှိပါ)။
  `en` / `es` / `id` / `pt-BR` များမှာ ပြည့်စုံပါသည်။ မပြည့်စုံသေးသော pack များအတွက် `dedup.json` + `ultra.json`
  ပံ့ပိုးကူညီမှုများကို ကြိုဆိုပါသည်။
- **Stacked telemetry သည် ချုံ့နိုင်ခဲ့သော engine များကိုသာ စာရင်းပြုစုသည်။** Engine အလုပ်လုပ်ခဲ့သော်လည်း
  ချွေတာမှု 0 % သာ ရရှိသော stacked-pipeline အဆင့်သည် `stats:null` ကို ပြန်ပေးသောကြောင့်
  `engineBreakdown` တွင် မပေါ်ပါ — ကျော်သွားသော အဆင့်နှင့် ခွဲခြားမရပါ။ "အလုပ်လုပ်ခဲ့သော်လည်း 0 %" နှင့်
  "ကျော်သွားခဲ့သည်" ကို ခွဲခြားရန် breakdown-model ပြောင်းလဲမှု လိုအပ်သဖြင့် နောက်သို့ ရွှေ့ဆိုင်းထားသည်။

## စစ်ဆေးအတည်ပြုခြင်း

ဤဧရိယာအတွက် အဓိကထားသော gate များမှာ အောက်ပါအတိုင်းဖြစ်သည်-

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
