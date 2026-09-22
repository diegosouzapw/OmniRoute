# Delegated Context Editing (Anthropic) (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Context Editing** ដែលបានផ្ទេរសិទ្ធិ គឺជាមុខងារគ្រប់គ្រង context សម្រាប់តែ Claude ប៉ុណ្ណោះ។ ខុសពីម៉ាស៊ីនបង្រួមទិន្នន័យមូលដ្ឋានរបស់ OmniRoute (Caveman, RTK, LLMLingua, stacked pipelines) — ដែលសរសេរ request body ឡើងវិញ _មុនពេល_ វាចាកចេញពី proxy — Context Editing ស្នើឱ្យ **provider** លុបប្លុក tool-use / tool-result ដែលលែងត្រូវការចេញពី context window ដែលកំពុងដំណើរការរបស់ខ្លួន។ OmniRoute គ្រាន់តែភ្ជាប់ body parameter (`context_management.edits[]`) ប៉ុណ្ណោះ; Claude ជាអ្នកអនុវត្តការលុបជាក់ស្តែងដោយផ្អែកលើ tokenizer របស់ខ្លួន។

តាមលក្ខណៈរបស់វា នេះគឺជាសមត្ថភាពដែលបានផ្ទេរសិទ្ធិ៖ provider ផ្សេងទៀតនឹងបដិសេធ parameter នេះ ដូច្នេះ OmniRoute កំណត់វិសាលភាពរបស់វាយ៉ាងតឹងរ៉ឹងសម្រាប់តែ Claude និង relay ដែលឆបគ្នាជាមួយ Claude Code ប៉ុណ្ណោះ។

ប្រភពយោងចម្បង៖ `open-sse/config/contextEditing.ts` (strategy ids, ការបញ្ចូល body, ការស្រង់ telemetry), `open-sse/executors/base.ts` (injection gate + 400-fallback) និង `open-sse/services/compression/types.ts` (ទម្រង់ config + តម្លៃលំនាំដើម)។

## អ្វីដែល `clear_tool_uses` ធ្វើ

OmniRoute បញ្ចូល edit តែមួយទៅក្នុង Anthropic Messages body ដែលត្រូវបញ្ជូនចេញ៖

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

- `type: "clear_tool_uses_20250919"` — strategy id ដែលមានកាលបរិច្ឆេទរបស់ Anthropic (`CLEAR_TOOL_USES_STRATEGY`)។
- `trigger.value: 100000` — នៅពេល input tokens របស់ request លើសពីកម្រិតនេះ Claude នឹងចាប់ផ្ដើមលុបគូ tool-use/result ចាស់ៗ (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS` ដែលជាតម្លៃលំនាំដើមរបស់ Anthropic)។
- `keep.value: 3` — គូ tool-use/result ចំនួន N ដែលថ្មីបំផុត នឹងត្រូវបានរក្សាទុកដោយមិនប៉ះពាល់ (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)។

beta ត្រូវបានប្រកាសតាមរយៈ header `anthropic-beta: context-management-2025-06-27` ដែល OmniRoute បានបញ្ចេញរួចជាស្រេចនៅលើ request ទៅ Claude។

ការបញ្ចូលត្រូវបានអនុវត្តដោយ `applyContextEditingToBody()` ហើយមានលក្ខណៈ **idempotent**៖ ប្រសិនបើ edit `clear_tool_uses` មាននៅក្នុង body រួចហើយ (ត្រូវបានបន្ថែមដោយការហៅពីមុន ឬផ្ដល់ដោយ client) នោះ body នឹងត្រូវទុកដដែល។ ប្រសិនបើ edit `clear_thinking_20251015` ក៏មានវត្តមានដែរ OmniRoute នឹងធ្វើ stable-sort ដើម្បីដាក់ edit `clear_thinking` នៅខាងមុខ ព្រោះ Anthropic តម្រូវឱ្យ `clear_thinking` ស្ថិតនៅមុន `clear_tool_uses` ក្នុង array `edits[]`។

## toggle បើកដំណើរការសម្រាប់ combo នីមួយៗ

Context Editing ត្រូវបាន **បិទតាមលំនាំដើម** ហើយត្រូវតែជ្រើសបើកដោយផ្ទាល់។ toggle នេះគឺជា boolean តែមួយដែលរក្សាទុកក្នុង compression config៖

- Setting key៖ `contextEditing.enabled` (camelCase — **មិនមែន** `context_editing` / `context-editing`)។
- Type៖ `ContextEditingConfig { enabled: boolean }` ក្នុង `open-sse/services/compression/types.ts`។
- តម្លៃលំនាំដើម៖ `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`។
- Zod schema៖ `contextEditingConfigSchema` ក្នុង `src/shared/validation/compressionConfigSchemas.ts`។
- ការផ្ទុក៖ ត្រូវបានរក្សាទុកជាមួយ compression settings ផ្សេងទៀត (ត្រូវបានធ្វើ normalization ក្នុង `src/lib/db/compression.ts`)។

នៅក្នុង dashboard toggle នេះស្ថិតនៅក្នុង compression hub (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ហើយសរសេរ `{ contextEditing: { enabled: … } }` ត្រឡប់ទៅវិញតាមរយៈ `saveSettings()`។ ដោយសារវាស្ថិតនៅលើ compression-settings object វាអាចដំណើរការរួមគ្នាជាមួយ compression profile សម្រាប់ combo នីមួយៗ ជាជាងធ្វើជាផ្ទៃកំណត់ឯករាជ្យទាំងស្រុង — config ផ្ទុកតែ flag បើក/បិទប៉ុណ្ណោះ; កម្រិតទាំងអស់ (`trigger`, `keep`) គឺជាថេរដែលបានចងក្រងជាឯកសារខាងលើ។

## ការកំណត់ឱ្យដំណើរការសម្រាប់តែ Claude

ការបញ្ចូលកើតឡើងតែសម្រាប់ Claude ពិតប្រាកដ ឬ relay ដែលឆបគ្នាជាមួយ Claude Code ប៉ុណ្ណោះ។ លក្ខខណ្ឌកំណត់នៅក្នុង
`open-sse/executors/base.ts` គឺ៖

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — key/OAuth ពិតប្រាកដរបស់ Anthropic។
- `isClaudeCodeCompatible(this.provider)` — relay ដែល provider id របស់វាចាប់ផ្ដើមដោយបុព្វបទ
  `anthropic-compatible-cc-` (ពួកវាប្រកាសថាឆបគ្នាជាមួយ Claude Code ដូច្នេះពួកវាគឺជា relay
  ដែលទំនងបំផុតថាអាចទទួលយក beta)។ សូមមើល `open-sse/services/provider.ts`។

ត្រូវបាន **ដកចេញ** ដោយចេតនា៖

- `claude-web` — browser relay ដែលមានទម្រង់សំណើ `create_conversation_params` ដែលមិនដែលឃើញ
  `context_management`។
- relay ទូទៅ `anthropic-compatible-*` (ដែលគ្មានបុព្វបទ `-cc-`) — endpoint ភាគីទីបីដែលមាន
  ការគាំទ្រ beta មិនច្បាស់លាស់។

provider ដែលមិនមែនជា Claude មិនដែលទទួលបាន parameter `context_management` ទេ ទោះបី toggle ត្រូវបានបើកក៏ដោយ។

## ការត្រឡប់ទៅជម្រើសបម្រុងពេល 400 / វិសាលភាព relay

relay ដែលឆបគ្នាជាមួយ Claude អាចប្រកាសថាគាំទ្រ beta ប៉ុន្តែនៅតែបដិសេធ parameter `context_management`
ដោយ HTTP 400។ ដើម្បីបន្ថយសមត្ថភាពដោយរលូនជំនួសឱ្យធ្វើឱ្យសំណើបរាជ័យ executor នឹងដក
parameter នោះចេញ ហើយសាកល្បង URL ដដែលម្ដងទៀត **តែមួយដង**៖

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

ឥរិយាបថ៖

1. ដំណើរការតែនៅពេលមាន `400` ខណៈ context editing ត្រូវបានបើក ហើយ body ពិតជាមាន
   `context_management`។
2. body របស់ 400 ត្រូវបានអានតាមរយៈ `clone()` ដូច្នេះ response ដើមនៅតែដដែលសម្រាប់ផ្លូវដែលមិនត្រូវគ្នា។
3. អត្ថបទកំហុសត្រូវតែត្រូវគ្នានឹង `/context[_-]management|context editing/i` — 400 ដែលមិនពាក់ព័ន្ធ (ឧ.
   `max_tokens must be >= 1`) **មិន** បង្កឱ្យដំណើរការជម្រើសបម្រុងទេ ហើយកំហុសដើមនឹងត្រូវបញ្ជូនបន្ត។
4. នៅពេលត្រូវគ្នា វាកំណត់ `contextEditingDisabled = true` (ដែលទប់ស្កាត់ការបញ្ចូលឡើងវិញ ប្រសិនបើ
   `transformedBody` ថ្មីត្រូវបានបង្កើតនៅពេលក្រោយសម្រាប់ URL សាកល្បងឡើងវិញ/ជម្រើសបម្រុង), លុប `context_management`,
   ចុះហត្ថលេខាលើ body ឡើងវិញសម្រាប់ Claude / relay ដែលឆបគ្នាជាមួយ Claude Code (`signRequestBody`) ហើយសាកល្បង
   URL ដដែលម្ដងទៀត។

Claude ពិតប្រាកដដាក់ beta នៅក្នុង `ANTHROPIC_BETA_BASE` ហើយមិនឆ្លងកាត់ផ្លូវជម្រើសបម្រុងនេះទេ។

## ទិន្នន័យ telemetry របស់ `applied_edits`

បន្ទាប់ពី response របស់ Claude OmniRoute កត់ត្រាថា provider បានសម្អាត context ជាក់ស្ដែងប៉ុនណា។ ទិន្នន័យនេះ
**មិន** ត្រូវបាន streamed ទេ — វាត្រូវបានស្រង់ចេញពី body នៃ response ដែលមិនមែនជា streaming តាមលទ្ធភាពដែលអាចធ្វើបាន ហើយមិនដែល
ប៉ះពាល់ដល់ response ទេ (កំហុស telemetry ត្រូវបានមិនអើពើ)។

- ការស្រង់ចេញ៖ `extractContextEditingTelemetry(responseBody)` នៅក្នុង `open-sse/config/contextEditing.ts`។
  វាស្វែងរក `applied_edits` នៅទីតាំងបី (ដើម្បីការពារចំពោះភាពខុសគ្នានៃទម្រង់ response)៖
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- field សម្រាប់ edit នីមួយៗដែលត្រូវបានអានពី entry នីមួយៗ៖ `cleared_input_tokens` និង `cleared_tool_uses`
  (snake_case ដែលជា format ដើមរបស់ Anthropic) ដោយមាន `clearedInputTokens` / `clearedToolUses` ជាជម្រើសបម្រុង camelCase។
- ត្រឡប់ `null` នៅពេលរកមិនឃើញ array `applied_edits` ឬគ្មានអ្វីត្រូវបានសម្អាតជាក់ស្ដែង។

ទម្រង់ receipt គឺ `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`។
ការកត់ត្រាកើតឡើងនៅក្នុង `open-sse/handlers/chatCore.ts` (កំណត់ឱ្យដំណើរការតែពេល `provider === "claude"`) តាមរយៈ
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) ដែលសរសេរ row មួយក្នុង compression
analytics ដោយមាន tag៖

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = ចំនួន input token ដែលបានសម្អាត
- `request_id` មានបច្ច័យ `::context-editing`

ដូច្នេះ ការសម្អាតដែលបានផ្ទេរសិទ្ធិឱ្យ provider បង្ហាញនៅក្នុង compression analytics រួមជាមួយ engine មូលដ្ឋាន ក្រោម
ស្លាក engine `context-editing` ហើយអាចបែងចែកពីការសន្សំរបស់ RTK/Caveman/LLMLingua បាន។

## ទំនាក់ទំនងជាមួយម៉ាស៊ីនបង្ហាប់ក្នុងមូលដ្ឋាន

| ទិដ្ឋភាព               | ម៉ាស៊ីនក្នុងមូលដ្ឋាន (Caveman / RTK / LLMLingua / stacked) | ការកែសម្រួលបរិបទដែលបានផ្ទេរសិទ្ធិ                                |
| ---------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| ទីកន្លែងដំណើរការ       | ក្នុង OmniRoute មុនពេលសំណើចាកចេញពីប្រូកស៊ី                 | ក្នុងអ្នកផ្តល់សេវា (Claude) នៅផ្នែកម៉ាស៊ីនមេ                     |
| អ្វីដែលវាកែសម្រួល      | អត្ថបទប្រូម / បរិបទ / លទ្ធផលឧបករណ៍                         | ប្លុកការប្រើឧបករណ៍ / លទ្ធផលឧបករណ៍ចាស់ៗ                           |
| វិសាលភាពអ្នកផ្តល់សេវា  | អ្នកផ្តល់សេវាទាំងអស់                                       | `claude` + `anthropic-compatible-cc-*` ប៉ុណ្ណោះ                  |
| ការបិទបើក              | ការកំណត់របៀបបង្ហាប់                                        | `contextEditing.enabled`                                         |
| របៀបបរាជ័យ             | បើកឱ្យបន្តនៅពេលបរាជ័យ (អត្ថបទដើម)                          | ការត្រឡប់បម្រុងពេល 400៖ ដកប៉ារ៉ាម៉ែត្រចេញ ហើយសាកល្បងម្តងទៀតមួយដង |
| ទិន្នន័យតាមដានការសន្សំ | `engine: <engine id>`                                      | `engine: "context-editing"`                                      |

ទាំងពីរនេះបំពេញគ្នាទៅវិញទៅមក៖ ម៉ាស៊ីនក្នុងមូលដ្ឋានបង្ហាប់ទិន្នន័យបៃដែល OmniRoute ផ្ញើ ចំណែកឯការកែសម្រួលបរិបទអនុញ្ញាតឱ្យ
Claude កាត់បន្ថយបរិបទដែលកំពុងបន្តឆ្លងកាត់វេនសន្ទនា។ វាទាំងពីរអាចត្រូវបានបើកប្រើរួមគ្នា។

## សូមមើលផងដែរ

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — បញ្ជីចុះឈ្មោះម៉ាស៊ីន និងម៉ាស៊ីនបង្ហាប់
  ក្នុងមូលដ្ឋាន
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — ការបង្ហាប់លទ្ធផលពាក្យបញ្ជា/ឧបករណ៍
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — ការបង្ហាប់សេចក្តីពិពណ៌នា MCP និង
  ការកាត់បន្ថយចំនួនប្រភេទឧបករណ៍
- ប្រភព៖ `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
