# Delegated Context Editing (Anthropic) (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

လွှဲအပ်ထားသော **Context Editing** သည် Claude အတွက်သာ ရရှိနိုင်သည့် context စီမံခန့်ခွဲမှု လုပ်ဆောင်ချက်ဖြစ်သည်။ Request body ကို proxy မှ _မထွက်ခွာမီ_ ပြန်လည်ရေးသားသည့် OmniRoute ၏ local compression engine များ (Caveman, RTK, LLMLingua, stacked pipelines) နှင့် မတူဘဲ Context Editing သည် ၎င်း၏ လက်ရှိအသုံးပြုနေသော context window မှ သက်တမ်းလွန် tool-use / tool-result block များကို ရှင်းလင်းရန် **provider** ထံ တောင်းဆိုသည်။ OmniRoute သည် body parameter (`context_management.edits[]`) ကိုသာ ထည့်သွင်းပေးပြီး Claude က ၎င်း၏ ကိုယ်ပိုင် tokenizer ကို အသုံးပြု၍ အမှန်တကယ် ရှင်းလင်းမှုကို လုပ်ဆောင်သည်။

၎င်းသည် မူလသဘောသဘာဝအရ လွှဲအပ်လုပ်ဆောင်ရသော စွမ်းဆောင်ရည်တစ်ခုဖြစ်သည်။ အခြား provider များက ထို parameter ကို လက်မခံကြသဖြင့် OmniRoute သည် ၎င်းကို Claude နှင့် Claude-Code-compatible relay များအတွက်သာ တင်းကျပ်စွာ ကန့်သတ်ထားသည်။

တရားဝင်အချက်အလက်ရင်းမြစ်- `open-sse/config/contextEditing.ts` (strategy id များ၊ body ထည့်သွင်းမှု၊ telemetry ထုတ်ယူမှု)၊ `open-sse/executors/base.ts` (ထည့်သွင်းမှု gate + 400-fallback) နှင့် `open-sse/services/compression/types.ts` (config ပုံစံ + မူလတန်ဖိုး)။

## `clear_tool_uses` က ဘာလုပ်သလဲ

OmniRoute သည် အပြင်သို့ပို့မည့် Anthropic Messages body ထဲသို့ edit တစ်ခုတည်းကို ထည့်သွင်းသည်-

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — ရက်စွဲပါ Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`) ဖြစ်သည်။
- `trigger.value: 100000` — request ၏ input token များသည် ဤအတိုင်းအတာထက် ကျော်လွန်သွားသည်နှင့် Claude သည် tool-use/result အတွဲဟောင်းများကို စတင်ရှင်းလင်းသည် (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`၊ Anthropic ၏ မူလတန်ဖိုး)။
- `keep.value: 3` — လတ်တလောအဖြစ်ဆုံး tool-use/result အတွဲ N ခုကို မပြောင်းလဲဘဲ ထိန်းသိမ်းထားသည် (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)။

Beta ကို `anthropic-beta: context-management-2025-06-27` header မှတစ်ဆင့် ကြေညာထားပြီး OmniRoute သည် Claude request များတွင် ၎င်းကို ထည့်သွင်းပေးထားပြီးဖြစ်သည်။

ထည့်သွင်းမှုကို `applyContextEditingToBody()` က လုပ်ဆောင်ပြီး **idempotent** ဖြစ်သည်။ Body ပေါ်တွင် `clear_tool_uses` edit တစ်ခု ရှိနှင့်ပြီးဖြစ်ပါက (ယခင်ခေါ်ဆိုမှုတစ်ခုက ထည့်ထားခြင်း သို့မဟုတ် client က ပေးထားခြင်း) body ကို မူလအတိုင်း ထားမည်ဖြစ်သည်။ `clear_thinking_20251015` edit တစ်ခုလည်း ပါဝင်နေပါက Anthropic က `edits[]` array ထဲတွင် `clear_thinking` ကို `clear_tool_uses` မတိုင်မီ ထားရန် လိုအပ်သောကြောင့် OmniRoute သည် `clear_thinking` edit ကို ရှေ့ဆုံးသို့ အစီအစဉ်တည်ငြိမ်စွာ ပြန်စီသည်။

## Combo တစ်ခုချင်းစီအလိုက် ဖွင့်/ပိတ် toggle

Context Editing ကို **မူလအားဖြင့် ပိတ်ထားပြီး** အသုံးပြုလိုသူက ရွေးချယ်ဖွင့်ရသည်။ Toggle သည် compression config ထဲတွင် ပါဝင်သော boolean တန်ဖိုးတစ်ခုတည်းဖြစ်သည်-

- ဆက်တင် key- `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **မဟုတ်ပါ**)။
- Type- `open-sse/services/compression/types.ts` ထဲရှိ `ContextEditingConfig { enabled: boolean }`။
- မူလတန်ဖိုး- `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`။
- Zod schema- `src/shared/validation/compressionConfigSchemas.ts` ထဲရှိ `contextEditingConfigSchema`။
- သိုလှောင်မှု- အခြား compression ဆက်တင်များနှင့်အတူ သိမ်းဆည်းထားသည် (`src/lib/db/compression.ts` တွင် ပုံမှန်စံဖြစ်အောင် ပြောင်းလဲထားသည်)။

Dashboard တွင် toggle သည် compression hub (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ထဲတွင်ရှိပြီး `saveSettings()` မှတစ်ဆင့် `{ contextEditing: { enabled: … } }` ကို ပြန်လည်ရေးသားသည်။ ၎င်းသည် compression-settings object ပေါ်တွင် ပါဝင်လိုက်ပါလာသောကြောင့် အပြည့်အဝ သီးခြားလွတ်လပ်သည့် interface တစ်ခုအဖြစ် မဟုတ်ဘဲ combo တစ်ခုချင်းစီ၏ compression profile နှင့် ပေါင်းစပ်အလုပ်လုပ်သည်။ Config တွင် ဖွင့်/ပိတ် flag သာ ပါဝင်ပြီး အတိုင်းအတာအားလုံး (`trigger`၊ `keep`) သည် အထက်တွင် မှတ်တမ်းတင်ထားသော constant များဖြစ်သည်။

## Claude အတွက်သာ gating လုပ်ခြင်း

Injection သည် အစစ်အမှန် Claude သို့မဟုတ် Claude-Code နှင့် သဟဇာတဖြစ်သော relay များအတွက်သာ ဖြစ်ပေါ်ပါသည်။ `open-sse/executors/base.ts` ရှိ gate မှာ-

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — အစစ်အမှန် Anthropic key/OAuth။
- `isClaudeCodeCompatible(this.provider)` — provider id သည် `anthropic-compatible-cc-` prefix ဖြင့် စတင်သော relay များ (၎င်းတို့က Claude Code နှင့် သဟဇာတဖြစ်ကြောင်း ဖော်ပြထားသောကြောင့် beta ကို လက်ခံနိုင်ခြေအများဆုံး relay များဖြစ်သည်)။ `open-sse/services/provider.ts` ကို ကြည့်ပါ။

ရည်ရွယ်ချက်ရှိရှိ **ဖယ်ထုတ်ထားသည်များ**-

- `claude-web` — `context_management` ကို လုံးဝမမြင်ရသည့် `create_conversation_params` request shape ပါသော browser relay။
- ယေဘုယျ `anthropic-compatible-*` relay များ (`-cc-` prefix မပါသည့် relay များ) — beta ပံ့ပိုးမှု မသေချာသော third-party endpoint များ။

toggle ကို ဖွင့်ထားသည့်အခါပင် Claude မဟုတ်သော provider များသည် `context_management` parameter ကို မည်သည့်အခါမျှ လက်ခံရရှိမည်မဟုတ်ပါ။

## 400-fallback / relay လွှမ်းခြုံမှု

Claude နှင့် သဟဇာတဖြစ်သော relay တစ်ခုသည် beta ကို ထောက်ပံ့ကြောင်း ဖော်ပြထားသော်လည်း `context_management` parameter ကို HTTP 400 ဖြင့် ငြင်းပယ်နိုင်ပါသည်။ request ပျက်ကွက်စေမည့်အစား အဆင်ပြေချောမွေ့စွာ အဆင့်လျှော့နိုင်ရန် executor သည် parameter ကို ဖယ်ရှားပြီး URL တူတူကို **တစ်ကြိမ်သာ** ထပ်မံကြိုးစားပါသည်-

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

အပြုအမူ-

1. context editing ကို ဖွင့်ထားပြီး body တွင် `context_management` အမှန်တကယ် ပါဝင်နေစဉ် `400` ဖြစ်သည့်အခါမှသာ အလုပ်လုပ်သည်။
2. ကိုက်ညီမှုမရှိသော လမ်းကြောင်းအတွက် မူရင်း response ကို နဂိုအတိုင်း ထားရှိနိုင်ရန် 400 body ကို `clone()` မှတစ်ဆင့် ဖတ်သည်။
3. error စာသားသည် `/context[_-]management|context editing/i` နှင့် ကိုက်ညီရမည် — မသက်ဆိုင်သော 400 (ဥပမာ `max_tokens must be >= 1`) သည် fallback ကို **မဖြစ်စေပါ**။ မူရင်း error ကို ဆက်လက်ပို့ပေးပါသည်။
4. ကိုက်ညီပါက `contextEditingDisabled = true` ဟု သတ်မှတ်သည် (ထပ်မံကြိုးစားခြင်း/fallback URL အတွက် `transformedBody` အသစ်တစ်ခုကို နောက်ပိုင်းတွင် တည်ဆောက်ပါက ပြန်လည် injection လုပ်ခြင်းကို တားဆီးပေးသည်)၊ `context_management` ကို ဖျက်သည်၊ Claude / Claude-Code နှင့် သဟဇာတဖြစ်သော relay များအတွက် body ကို (`signRequestBody` ဖြင့်) ပြန်လည် sign လုပ်ပြီး URL တူတူကို တစ်ကြိမ် ထပ်မံကြိုးစားသည်။

အစစ်အမှန် Claude တွင် beta သည် `ANTHROPIC_BETA_BASE` အတွင်း ပါဝင်ပြီး ဤ fallback လမ်းကြောင်းသို့ မရောက်ပါ။

## `applied_edits` telemetry

Claude response တစ်ခုရရှိပြီးနောက် OmniRoute သည် provider က အမှန်တကယ် ရှင်းလင်းခဲ့သည့် context ပမာဏကို မှတ်တမ်းတင်သည်။ ၎င်းကို **stream မလုပ်ပါ** — non-streaming response body မှ best-effort ဖြင့် ထုတ်ယူပြီး response အပေါ် မည်သည့်အခါမျှ သက်ရောက်မှုမရှိပါ (telemetry ချို့ယွင်းမှုများကို လျစ်လျူရှုသည်)။

- ထုတ်ယူခြင်း- `open-sse/config/contextEditing.ts` ရှိ `extractContextEditingTelemetry(responseBody)`။
  ၎င်းသည် response shape အမျိုးမျိုးကို ခံနိုင်ရည်ရှိစေရန် နေရာသုံးခုရှိ `applied_edits` ကို စစ်ဆေးသည်-
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- entry တစ်ခုစီမှ ဖတ်ယူသော field များ- `cleared_input_tokens` နှင့် `cleared_tool_uses`
  (snake_case၊ Anthropic မူရင်းပုံစံ)၊ ထို့အပြင် `clearedInputTokens` / `clearedToolUses` camelCase fallback များ။
- `applied_edits` array ကို မတွေ့ပါက သို့မဟုတ် အမှန်တကယ် မည်သည့်အရာမျှ မရှင်းလင်းခဲ့ပါက `null` ကို ပြန်ပေးသည်။

လက်ခံမှတ်တမ်း၏ shape သည် `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` ဖြစ်သည်။ မှတ်တမ်းတင်ခြင်းကို `open-sse/handlers/chatCore.ts` တွင် (`provider === "claude"` အတွက်သာ gate လုပ်ထားပြီး) `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) မှတစ်ဆင့် လုပ်ဆောင်ကာ အောက်ပါ tag များပါသည့် compression analytics row တစ်ခုကို ရေးသားသည်-

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = ရှင်းလင်းခဲ့သော input-token အရေအတွက်
- `request_id` ၏ နောက်တွင် `::context-editing` ကို ပေါင်းထည့်ထားသည်

ထို့ကြောင့် လွှဲအပ်ထားသော ရှင်းလင်းမှုသည် local engine များနှင့်အတူ compression analytics တွင် `context-editing` engine label အောက်၌ ပေါ်လာပြီး RTK/Caveman/LLMLingua ချွေတာမှုများနှင့် ခွဲခြားသိရှိနိုင်သည်။

## ဒေသတွင်း ဖိသိပ်မှုအင်ဂျင်များနှင့် ဆက်နွှယ်မှု

| ရှုထောင့်             | ဒေသတွင်းအင်ဂျင်များ (Caveman / RTK / LLMLingua / stacked) | လွှဲအပ်ထားသော Context Editing                                       |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| လုပ်ဆောင်သည့်နေရာ     | တောင်းဆိုချက်သည် proxy မှ မထွက်ခွာမီ OmniRoute အတွင်း     | Provider (Claude) အတွင်း၊ server-side တွင်                          |
| ပြင်ဆင်သည့်အရာ        | Prompt / context / tool-result စာသား                      | အဟောင်း tool-use / tool-result blocks များ                          |
| Provider နယ်ပယ်       | Provider အားလုံး                                          | `claude` + `anthropic-compatible-cc-*` သာ                           |
| အဖွင့်အပိတ်ဆက်တင်     | ဖိသိပ်မှုမုဒ် ဆက်တင်များ                                  | `contextEditing.enabled`                                            |
| ချို့ယွင်းမှုမုဒ်     | Fail-open (မူရင်းစာသား)                                   | 400-fallback: parameter ကို ဖယ်ရှားပြီး တစ်ကြိမ် ပြန်လည်ကြိုးစားသည် |
| ချွေတာမှု တယ်လီမက်ထရီ | `engine: <engine id>`                                     | `engine: "context-editing"`                                         |

နှစ်မျိုးစလုံးသည် အပြန်အလှန်ဖြည့်ဆည်းပေးသည်- ဒေသတွင်းအင်ဂျင်များသည် OmniRoute ပေးပို့သည့် bytes များကို ဖိသိပ်ပေးပြီး Context Editing က
Claude အား အပြန်အလှန်ဆက်သွယ်မှုများတစ်လျှောက် လက်ရှိ context ကို ရှင်းလင်းလျှော့ချပေးနိုင်စေသည်။ နှစ်မျိုးစလုံးကို တစ်ပြိုင်နက် ဖွင့်ထားနိုင်သည်။

## ထပ်မံကြည့်ရှုရန်

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — အင်ဂျင် registry နှင့် ဒေသတွင်း ဖိသိပ်မှု
  အင်ဂျင်များ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — command/tool-output ဖိသိပ်မှု
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP ဖော်ပြချက် ဖိသိပ်မှုနှင့်
  tool-cardinality လျှော့ချမှု
- ရင်းမြစ်- `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
