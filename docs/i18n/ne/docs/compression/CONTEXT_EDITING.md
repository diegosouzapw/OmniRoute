# Delegated Context Editing (Anthropic) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

प्रत्यायोजित **Context Editing** Claude-मात्र सन्दर्भ-व्यवस्थापन सुविधा हो। OmniRoute का स्थानीय
compression इन्जिनहरू (Caveman, RTK, LLMLingua, stacked pipelines) — जसले अनुरोध body लाई proxy बाट
बाहिर जानुअघि नै पुनर्लेखन गर्छन् — भन्दा फरक रूपमा, Context Editing ले **provider** लाई त्यसको आफ्नै
चलिरहेको context window बाट पुराना tool-use / tool-result block हरू हटाउन अनुरोध गर्छ। OmniRoute ले
body parameter (`context_management.edits[]`) मात्र संलग्न गर्छ; Claude ले आफ्नै tokenizer अनुसार
वास्तविक रूपमा हटाउने काम गर्छ।

यो प्रकृतिगत रूपमै प्रत्यायोजित क्षमता हो: अन्य provider हरूले उक्त parameter अस्वीकार गर्छन्, त्यसैले
OmniRoute ले यसलाई Claude र Claude-Code-सङ्गत relay हरूमा मात्र कडाइका साथ सीमित गर्छ।

आधिकारिक स्रोत: `open-sse/config/contextEditing.ts` (strategy id हरू, body injection, telemetry
extraction), `open-sse/executors/base.ts` (injection gate + 400-fallback), र
`open-sse/services/compression/types.ts` (config संरचना + default)।

## `clear_tool_uses` ले के गर्छ

OmniRoute ले बाहिर पठाइने Anthropic Messages body मा एउटा मात्र edit inject गर्छ:

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

- `type: "clear_tool_uses_20250919"` — मिति समावेश भएको Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`)।
- `trigger.value: 100000` — अनुरोधका input token हरूले यो threshold नाघेपछि Claude ले पुराना
  tool-use/result जोडीहरू हटाउन थाल्छ (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic को default)।
- `keep.value: 3` — सबैभन्दा पछिल्ला N वटा tool-use/result जोडीहरूलाई नछोई राखिन्छ
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)।

beta लाई `anthropic-beta: context-management-2025-06-27` header मार्फत विज्ञापित गरिन्छ, जुन
OmniRoute ले Claude अनुरोधहरूमा पहिलेदेखि नै पठाउँछ।

Injection `applyContextEditingToBody()` द्वारा गरिन्छ र यो **idempotent** छ: यदि body मा
`clear_tool_uses` edit पहिल्यै छ (अघिल्लो call द्वारा थपिएको वा client द्वारा प्रदान गरिएको), body लाई
जस्ताको तस्तै छोडिन्छ। यदि `clear_thinking_20251015` edit पनि छ भने, OmniRoute ले
`clear_thinking` edit लाई स्थिर रूपमा क्रमबद्ध गरेर अगाडि राख्छ, किनभने Anthropic का अनुसार
`edits[]` array मा `clear_thinking`, `clear_tool_uses` भन्दा अगाडि हुनुपर्छ।

## प्रत्येक combo का लागि enable toggle

Context Editing default रूपमा **बन्द** हुन्छ र opt-in हो। toggle भनेको compression config मा राखिएको
एउटा boolean मात्र हो:

- Setting key: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **होइन**)।
- Type: `open-sse/services/compression/types.ts` मा
  `ContextEditingConfig { enabled: boolean }`।
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`।
- Zod schema: `src/shared/validation/compressionConfigSchemas.ts` मा `contextEditingConfigSchema`।
- Storage: बाँकी compression setting हरूसँगै persist गरिन्छ (
  `src/lib/db/compression.ts` मा normalize गरिएको)।

dashboard मा toggle compression hub
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) मा हुन्छ र `saveSettings()` मार्फत
`{ contextEditing: { enabled: … } }` फिर्ता लेख्छ। यो compression-settings object मार्फत जाने भएकाले,
यो पूर्ण रूपमा स्वतन्त्र surface हुनुको सट्टा प्रत्येक combo को compression profile सँग संयोजित हुन्छ
— config ले on/off flag मात्र राख्छ; सबै threshold (`trigger`, `keep`) माथि दस्तावेज गरिएका constants
हुन्।

## Claude-मात्र गेटिङ

इन्जेक्सन वास्तविक Claude वा Claude-Code-संगत रिलेहरूका लागि मात्र हुन्छ।
`open-sse/executors/base.ts` मा रहेको गेट यस्तो छ:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — वास्तविक Anthropic कुञ्जी/OAuth।
- `isClaudeCodeCompatible(this.provider)` — प्रदायक id `anthropic-compatible-cc-` उपसर्गबाट सुरु हुने
  रिलेहरू (तिनीहरूले Claude Code अनुकूलता घोषणा गर्छन्, त्यसैले ती beta स्वीकार गर्ने सबैभन्दा
  सम्भावित रिलेहरू हुन्)। `open-sse/services/provider.ts` हेर्नुहोस्।

जानाजानी **बहिष्कृत**:

- `claude-web` — `create_conversation_params` अनुरोध संरचना भएको ब्राउजर रिले, जसले कहिल्यै
  `context_management` देख्दैन।
- जेनेरिक `anthropic-compatible-*` रिलेहरू (`-cc-` उपसर्गबिनाका) — beta समर्थन अनिश्चित भएका
  तेस्रो-पक्षका एन्डपोइन्टहरू।

टगल अन हुँदा पनि गैर-Claude प्रदायकहरूले `context_management` प्यारामिटर कहिल्यै प्राप्त गर्दैनन्।

## 400-fallback / रिले कभरेज

Claude-संगत रिलेले beta घोषणा गर्न सक्छ, तर अझै पनि HTTP 400 सहित `context_management` प्यारामिटर
अस्वीकार गर्न सक्छ। अनुरोध विफल पार्नुको सट्टा सहज रूपमा स्तर घटाउन, एक्जिक्युटरले प्यारामिटर हटाउँछ
र उही URL मा **एक पटक** पुनः प्रयास गर्छ:

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

व्यवहार:

1. सन्दर्भ सम्पादन सक्षम हुँदा, बडीमा वास्तवमै `context_management` हुँदा र `400` प्राप्त हुँदा मात्र
   ट्रिगर हुन्छ।
2. 400 बडी `clone()` मार्फत पढिन्छ, जसले गर्दा नमिल्ने अवस्थाका लागि मूल प्रतिक्रिया यथावत् रहन्छ।
3. त्रुटि टेक्स्ट `/context[_-]management|context editing/i` सँग मिल्नुपर्छ — असम्बन्धित 400 (जस्तै
   `max_tokens must be >= 1`) ले fallback ट्रिगर **गर्दैन**; मूल त्रुटि नै अगाडि प्रसारित हुन्छ।
4. मेल खाएमा यसले `contextEditingDisabled = true` सेट गर्छ (जसले पछि पुनः प्रयास/fallback URL का
   लागि नयाँ `transformedBody` निर्माण भएमा पुनः इन्जेक्सन रोक्छ), `context_management` मेटाउँछ,
   Claude / Claude-Code-संगत रिलेहरूका लागि बडीलाई पुनः हस्ताक्षर गर्छ (`signRequestBody`), र उही
   URL मा एक पटक पुनः प्रयास गर्छ।

वास्तविक Claude ले beta लाई `ANTHROPIC_BETA_BASE` मा राख्छ र यो fallback मार्गमा पुग्दैन।

## `applied_edits` टेलिमेट्री

Claude प्रतिक्रियापछि, OmniRoute ले प्रदायकले वास्तवमा कति सन्दर्भ हटायो भन्ने रेकर्ड गर्छ। यो
**स्ट्रिम हुँदैन** — यसलाई गैर-स्ट्रिमिङ प्रतिक्रिया बडीबाट सर्वोत्तम प्रयासका आधारमा निकालिन्छ र
यसले प्रतिक्रियालाई कहिल्यै असर गर्दैन (टेलिमेट्री विफलताहरूलाई बेवास्ता गरिन्छ)।

- निष्कर्षण: `open-sse/config/contextEditing.ts` मा रहेको `extractContextEditingTelemetry(responseBody)`।
  यसले प्रतिक्रिया संरचनाप्रति रक्षात्मक हुँदै तीन स्थानमा `applied_edits` खोज्छ:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- प्रत्येक प्रविष्टिबाट पढिने सम्पादन-विशिष्ट फिल्डहरू: `cleared_input_tokens` र `cleared_tool_uses`
  (snake_case, Anthropic-मूल), साथै fallback का रूपमा `clearedInputTokens` / `clearedToolUses` camelCase।
- कुनै `applied_edits` एरे नभेटिएमा वा वास्तवमा केही पनि नहटाइएको अवस्थामा `null` फर्काउँछ।

रिसिटको संरचना `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` हो।
रेकर्डिङ `open-sse/handlers/chatCore.ts` मा (`provider === "claude"` मा गेट गरिएको)
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) मार्फत हुन्छ, जसले निम्न
ट्याग भएको कम्प्रेसन एनालिटिक्स पङ्क्ति लेख्छ:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = हटाइएको इनपुट-टोकन सङ्ख्या
- `request_id` मा `::context-editing` प्रत्यय जोडिएको

यसरी प्रत्यायोजित हटाइ स्थानीय इन्जिनहरूसँगै कम्प्रेसन एनालिटिक्समा `context-editing` इन्जिन लेबलअन्तर्गत
देखिन्छ, र यसलाई RTK/Caveman/LLMLingua बचतहरूबाट छुट्याउन सकिन्छ।

## स्थानीय कम्प्रेसन इन्जिनहरूसँगको सम्बन्ध

| पक्ष            | स्थानीय इन्जिनहरू (Caveman / RTK / LLMLingua / stacked) | प्रत्यायोजित कन्टेक्स्ट सम्पादन                         |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| कहाँ चल्छ       | अनुरोधले प्रोक्सी छोड्नुअघि, OmniRoute भित्र            | प्रदायक (Claude) मा, सर्भर-साइडमा                       |
| के सम्पादन गर्छ | प्रम्प्ट / कन्टेक्स्ट / टुल-रिजल्ट टेक्स्ट              | पुराना टुल-युज / टुल-रिजल्ट ब्लकहरू                     |
| प्रदायकको दायरा | सबै प्रदायकहरू                                          | `claude` + `anthropic-compatible-cc-*` मात्र            |
| टगल             | कम्प्रेसन मोडका सेटिङहरू                                | `contextEditing.enabled`                                |
| विफलता मोड      | फेल-ओपन (मूल टेक्स्ट)                                   | 400-फल्ब्याक: प्यारामिटर हटाएर एक पटक पुनः प्रयास गर्ने |
| बचत टेलिमेट्री  | `engine: <engine id>`                                   | `engine: "context-editing"`                             |

यी दुई एक-अर्काका पूरक हुन्: स्थानीय इन्जिनहरूले OmniRoute ले पठाउने बाइटहरू कम्प्रेस गर्छन्; कन्टेक्स्ट सम्पादनले
Claude लाई विभिन्न टर्नहरूमा चलिरहेको कन्टेक्स्टबाट अनावश्यक भाग हटाउन दिन्छ। यी दुवैलाई सँगै सक्षम गर्न सकिन्छ।

## यो पनि हेर्नुहोस्

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इन्जिन रजिस्ट्री र स्थानीय कम्प्रेसन
  इन्जिनहरू
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — कमान्ड/टुल-आउटपुट कम्प्रेसन
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP विवरण कम्प्रेसन र
  टुल-कार्डिनालिटी न्यूनीकरण
- स्रोत: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
