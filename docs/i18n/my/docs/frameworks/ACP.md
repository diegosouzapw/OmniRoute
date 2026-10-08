# ACP registry and registered CLI launchers (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute သည် **CLI ရှာဖွေတွေ့ရှိမှု**၊ **မူရင်း Agent Client Protocol** နှင့်
**အမွေအနှစ် stdio adapter များ** ကို သီးခြားခွဲထားသည်။ ထည့်သွင်းထားသည့် binary တစ်ခုကို ရှာတွေ့ခြင်းသည် ၎င်း၏
စစ်မှန်ကြောင်းအတည်ပြုမှု၊ model ကိုက်ညီမှု သို့မဟုတ် prompt တစ်ခုကို ကိုင်တွယ်ရန် အသင့်ဖြစ်မှုကို သက်သေမပြနိုင်ပါ။

Dashboard သည် inventory နှင့် custom-agent မှတ်ပုံတင်ခြင်းအတွက် `GET /api/acp/agents` နှင့်
`POST /api/acp/agents` ကို အသုံးပြုသည်။ ဤ route များသည် local-only စီမံခန့်ခွဲမှု route များဖြစ်ပြီး၊
process များစတင်ရန် သို့မဟုတ် prompt များပေးပို့ရန်အတွက် public API မဟုတ်ပါ။ အတွင်းပိုင်း
`AcpManager` သည် HTTP provider fallback အဖြစ် အလိုအလျောက် ပြောင်းလဲမသွားပါ။

## မှတ်ပုံတင်ထားသော contract များ

`config/cli-tools-manifest.json` သည် built-in စတင်လုပ်ဆောင်ရေး
binary များ၊ argument များနှင့် backend mode များအတွက် တစ်ခုတည်းသော တရားဝင်အချက်အလက်ရင်းမြစ်ဖြစ်သည်။ Registry သည် ၎င်း၏ definition များကို
ထို manifest မှ ရယူသည်။ ရှာဖွေတွေ့ရှိမှုကို 60 စက္ကန့်ကြာ cache သိမ်းထားသည်။

- `acp`: Gemini contract သည် `gemini --experimental-acp` ကို စတင်ပြီး တရားဝင် TypeScript SDK မှတစ်ဆင့်
  newline ဖြင့် ပိုင်းခြားထားသော ACP JSON-RPC ကို ဆက်သွယ်အသုံးပြုသည်။
- `stdio-adapter`: အခြားမှတ်ပုံတင်ထားသော contract များသည် အမွေအနှစ် newline-input၊
  stdout-output adapter ကို ဆက်လက်အသုံးပြုသည်။ Output မထွက်ဘဲ နှစ်စက္ကန့်ကြာပါက ၎င်း၏ response ပြီးဆုံးသည်။
  ဤ adapter သည် ထို CLI များအတွက် မူရင်း ACP ပံ့ပိုးမှုရှိကြောင်း **အတည်မပြုပါ**။

Gemini သည် စတင်အသုံးပြုသည့် flag ကို ၎င်း၏ [CLI ကိုးကားချက်](https://geminicli.com/docs/cli/cli-reference/) တွင် မှတ်တမ်းတင်ထားသည်။
Client သည် initialization၊ session ဖန်တီးခြင်း၊ prompt request များ၊ notification များနှင့် cancellation အတွက်
[တရားဝင် ACP SDK](https://github.com/agentclientprotocol/typescript-sdk) ကို အသုံးပြုသည်။

Custom-agent definition များသည် administrator က ထိန်းချုပ်သော launch contract များအဖြစ် ဆက်လက်တည်ရှိသည်။
Binary နှင့် argument များကို မှတ်ပုံတင်ခြင်းသည် ထို process အား server user ၏ local
လုပ်ဆောင်ခွင့်များကို ပေးသည်။ မှတ်ပုံတင်ခြင်းသည် sandbox မဟုတ်ပါ။ Version probe များသည်
မှတ်ပုံတင်ထားသော executable နှင့် အသိအမှတ်ပြုထားသည့် version flag ကိုသာ လက်ခံသည်။

## အတွင်းပိုင်း launch API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // ဤ agent အတွက် ရည်ရွယ်ချက်ရှိရှိ သတ်မှတ်ပေးထားသော provider variable များကိုသာ လွှဲပေးပါ။
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // ခေါ်ယူအသုံးပြုသော application ထဲတွင် response ကို အသုံးပြုပါ။
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` သည် executable နှင့် argument များကို
မှတ်ပုံတင်ထားသော definition မှ ဖြေရှင်းသတ်မှတ်သည်။ Caller option များမှာ `cwd` နှင့် `env` သာဖြစ်ပြီး၊ အဟောင်း
`spawn(agentId, binary, args, env)` signature နှင့် executable override များကို
ငြင်းပယ်သည်။ HTTP launch contract များကို ဤ manager က မပံ့ပိုးပါ။

Child သည် CLI launcher များနှင့် တူညီသော operating-system၊ terminal၊ locale နှင့် certificate
allowlist ကို ဆက်ခံသည်။ Server/provider secret များကို
parent environment မှ ကူးယူမထားပါ။ ရွေးချယ်ထားသော CLI အတွက် လိုအပ်သည့် credential များကို
တိုက်ရိုက်လွှဲပေးရမည် သို့မဟုတ် ထို CLI ၏ ကိုယ်ပိုင် local authentication မှတစ်ဆင့် ပံ့ပိုးရမည်။ Child တွင်
local user ၏ filesystem permission များ ရှိနေဆဲဖြစ်ပြီး ၎င်း၏ကိုယ်ပိုင် config ကို ဖတ်ရှုနိုင်သည်။

## မူရင်း lifecycle နှင့် ကန့်သတ်ချက်များ

1. မှတ်ပုံတင်ထားသော binary ကို စတင်၍ ACP ကို initialize လုပ်ပြီး
   ရွေးချယ်ထားသော working directory ကို root အဖြစ် သတ်မှတ်ထားသည့် session တစ်ခု ဖန်တီးသည်။ Initialization ကို ဆယ်စက္ကန့် ကန့်သတ်ထားသည်။
2. Prompt တစ်ခု ပေးပို့ပြီး ထို session အတွက်သာ text notification များကို စုဆောင်းသည်။
   ပြီးဆုံးခြင်းဆိုသည်မှာ stdout တိတ်ဆိတ်နေသည့် အချိန်ကာလမဟုတ်ဘဲ prompt RPC response ဖြစ်သည်။
3. မပြီးဆုံးသေးသော initialization အပါအဝင် prompt deadline တစ်ခုတည်းကို အသုံးပြုသည်။ ပုံမှန်သတ်မှတ်ချက်မှာ
   120 စက္ကန့်ဖြစ်သည်။ Process တစ်ခုတည်းအတွင်း တစ်ပြိုင်နက် prompt များကို ငြင်းပယ်သည်။
4. မူရင်း timeout ဖြစ်ပါက `session/cancel` ကို ကြိုးစားပြီး process ကို ရပ်တန့်သည်။
   ကန့်သတ်ထားသော 100 ms အချိန်အတွင်း ရပ်တန့်ခြင်းမပြုမီ notification များကို flush လုပ်နိုင်သည်။
5. Initialization မအောင်မြင်သောအခါ၊ connection ပိတ်သောအခါ၊ process ထွက်သွားသောအခါ သို့မဟုတ် caller က ၎င်းကို ရပ်တန့်သောအခါ
   transport state ကို ပိတ်ပြီး session ကို ဖယ်ရှားသည်။

Tool permission request များကို ငြင်းပယ်သည်။ Filesystem သို့မဟုတ် terminal client
capability များကို ကြေညာမထားပါ။ ဤကန့်သတ်ချက်များသည် child binary ကိုယ်တိုင်ကို sandbox လုပ်ခြင်းမရှိသကဲ့သို့
CLI ၏ ကိုယ်ပိုင် authorization setting များကိုလည်း အစားမထိုးပါ။

မူရင်း text နှင့် အမွေအနှစ် stdout/stderr နှစ်မျိုးလုံးတွင် စာလုံးရေ အများဆုံး 1 MiB အထိသာ ထိန်းသိမ်းပြီး၊
ဖြတ်တောက်ထားကြောင်း အသိပေးချက်နှင့်အတူ နောက်ဆုံးထွက် output ကို သိမ်းထားသည်။ မူရင်း wire
frame တစ်ခုချင်းစီကို SDK parsing မပြုမီ byte 2 MiB အထိ ကန့်သတ်ထားသည်။ Prompt တစ်ခုစီအလိုက် buffer များကို reset လုပ်သည်။

`kill(sessionId)` သည် SIGTERM ကို ပေးပို့ပြီး process
မထွက်သေးပါက ငါးစက္ကန့်အကြာတွင် SIGKILL ကို ပေးပို့သည်။ အမွေအနှစ် prompt timeout များသည် listener နှင့် timer များကို
လွှတ်ပေးသော်လည်း နောက်ထပ် prompt တစ်ခုအတွက် session ကို ဆက်လက်အသုံးပြုနိုင်အောင် ထားသည်။ ပြီးဆုံးသောအခါ
`kill()` သို့မဟုတ် `killAll()` ကို ခေါ်ရန် caller များတွင် တာဝန်ရှိနေဆဲဖြစ်သည်။

## Event များနှင့် စစ်ဆေးခြင်း

Manager သည် `stdout`၊ `stderr` နှင့် `exit` ကို emit လုပ်ပြီး တစ်ခုချင်းစီတွင် `sessionId` ပါဝင်သည်။
`sessionError` သည် လုံခြုံအောင် ရှင်းလင်းထားသော transport error ကို အစီရင်ခံသည်။ Compatibility `error`
event ကို subscriber ရှိမှသာ emit လုပ်သဖြင့် binary မရှိခြင်းသည်
ကိုင်တွယ်မထားသော EventEmitter error မဖြစ်စေနိုင်ပါ။

- `getSession(sessionId)` သည် စီမံထားသော session သို့မဟုတ် `undefined` ကို ပြန်ပေးသည်။
- `getActiveSessions()` သည် ရပ်တန့်ပြီးသော သို့မဟုတ် ရပ်တန့်နေဆဲ session များကို ဖယ်ထုတ်ထားသည်။
- `sendInput(sessionId, input)` ကို အသက်ဝင်နေသော အမွေအနှစ် adapter အတွက်သာ အသုံးပြုနိုင်သည်။
  မူရင်း ACP သည် ၎င်း၏ JSON-RPC stream ကို ကာကွယ်ရန် raw input ကို ငြင်းပယ်သည်။
- `killAll()` သည် ထို instance က စီမံထားသည့် session အားလုံးကို ရပ်တန့်သည်။

## အတည်ပြုစစ်ဆေးမှု နယ်နိမိတ်များ

Deterministic fixture များသည် မူရင်း handshake၊ text output၊ ငြင်းပယ်ထားသော
permission များ၊ cancellation၊ တစ်ပြိုင်နက် prompt များ၊ မအောင်မြင်သော initialization၊ process
ထွက်ခြင်း၊ output limit များနှင့် secret isolation တို့ကို လွှမ်းခြုံထားသည်။ ရှိပြီးသား အမွေအနှစ် buffer/listener
regression များကိုလည်း ဆက်လက်လွှမ်းခြုံထားသည်။ ဤ test များသည် live Gemini login
သို့မဟုတ် အောင်မြင်သော provider inference ကို သက်သေမပြပါ။ ထိုအရာများအတွက် ရည်ရွယ်ထားသော environment တွင် သီးခြား authorization ရရှိထားသည့် smoke
test တစ်ခု လိုအပ်သည်။

## ဆက်စပ်စာတမ်းများ

- [Agent protocol များ](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI launch contract များ](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI tool များ](../reference/CLI-TOOLS.md)
- [A2A server](./A2A-SERVER.md)
- [Cloud agent များ](./CLOUD_AGENT.md)
