# Delegated Context Editing (Anthropic) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

प्रत्यायोजित **कॉन्टेक्स्ट एडिटिंग** केवल Claude के लिए उपलब्ध कॉन्टेक्स्ट-प्रबंधन सुविधा है। OmniRoute के स्थानीय
कंप्रेशन इंजनों (Caveman, RTK, LLMLingua, स्टैक्ड पाइपलाइन) के विपरीत — जो अनुरोध बॉडी को प्रॉक्सी से
बाहर निकलने _से पहले_ दोबारा लिखते हैं — कॉन्टेक्स्ट एडिटिंग **प्रोवाइडर** से उसके अपने सक्रिय कॉन्टेक्स्ट
विंडो से पुराने टूल-उपयोग / टूल-परिणाम ब्लॉक साफ़ करने के लिए कहता है। OmniRoute केवल एक बॉडी
पैरामीटर (`context_management.edits[]`) जोड़ता है; वास्तविक सफ़ाई Claude अपने टोकनाइज़र के अनुसार करता है।

यह स्वभावतः एक प्रत्यायोजित क्षमता है: अन्य प्रोवाइडर इस पैरामीटर को अस्वीकार कर देते हैं, इसलिए OmniRoute इसे
सख्ती से Claude और Claude-Code-संगत रिले तक सीमित रखता है।

सत्य का स्रोत: `open-sse/config/contextEditing.ts` (स्ट्रैटेजी आईडी, बॉडी इंजेक्शन, टेलीमेट्री
एक्सट्रैक्शन), `open-sse/executors/base.ts` (इंजेक्शन गेट + 400-फ़ॉलबैक), और
`open-sse/services/compression/types.ts` (कॉन्फ़िग संरचना + डिफ़ॉल्ट)।

## `clear_tool_uses` क्या करता है

OmniRoute आउटबाउंड Anthropic Messages बॉडी में एक एडिट इंजेक्ट करता है:

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

- `type: "clear_tool_uses_20250919"` — दिनांकित Anthropic स्ट्रैटेजी आईडी (`CLEAR_TOOL_USES_STRATEGY`)।
- `trigger.value: 100000` — अनुरोध के इनपुट टोकन इस सीमा से अधिक हो जाने पर Claude पुराने
  टूल-उपयोग/परिणाम युग्मों को साफ़ करना शुरू कर देता है (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic का डिफ़ॉल्ट)।
- `keep.value: 3` — सबसे हाल के N टूल-उपयोग/परिणाम युग्मों को अपरिवर्तित रखा जाता है
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)।

बीटा की सूचना `anthropic-beta: context-management-2025-06-27` हेडर के माध्यम से दी जाती है, जिसे
OmniRoute पहले से ही Claude अनुरोधों पर भेजता है।

इंजेक्शन `applyContextEditingToBody()` द्वारा किया जाता है और यह **इडेम्पोटेंट** है: यदि बॉडी में पहले से कोई `clear_tool_uses`
एडिट मौजूद है (पिछली कॉल द्वारा जोड़ा गया या क्लाइंट द्वारा दिया गया), तो बॉडी को
जैसा है वैसा छोड़ दिया जाता है। यदि `clear_thinking_20251015` एडिट भी मौजूद है, तो OmniRoute
`clear_thinking` एडिट को स्टेबल-सॉर्ट करके सबसे आगे रखता है, क्योंकि Anthropic के अनुसार `edits[]`
ऐरे में `clear_thinking` का `clear_tool_uses` से पहले होना आवश्यक है।

## प्रत्येक कॉम्बो के लिए सक्षम करने वाला टॉगल

कॉन्टेक्स्ट एडिटिंग **डिफ़ॉल्ट रूप से बंद** है और इसे ऑप्ट-इन करना होता है। यह टॉगल कंप्रेशन कॉन्फ़िग में मौजूद
एकल बूलियन है:

- सेटिंग कुंजी: `contextEditing.enabled` (camelCase — **न कि** `context_editing` / `context-editing`)।
- प्रकार: `open-sse/services/compression/types.ts` में
  `ContextEditingConfig { enabled: boolean }`।
- डिफ़ॉल्ट: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`।
- Zod स्कीमा: `src/shared/validation/compressionConfigSchemas.ts` में `contextEditingConfigSchema`।
- स्टोरेज: शेष कंप्रेशन सेटिंग्स के साथ स्थायी रूप से संग्रहीत (`src/lib/db/compression.ts`
  में नॉर्मलाइज़ किया गया)।

डैशबोर्ड में यह टॉगल कंप्रेशन हब
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) में मौजूद है और
`saveSettings()` के माध्यम से `{ contextEditing: { enabled: … } }` वापस लिखता है। चूँकि यह
कंप्रेशन-सेटिंग्स ऑब्जेक्ट के साथ चलता है, इसलिए यह पूरी तरह स्वतंत्र सतह होने के बजाय प्रत्येक कॉम्बो के
कंप्रेशन प्रोफ़ाइल के साथ संयोजित होता है — कॉन्फ़िग में केवल चालू/बंद फ़्लैग होता है; सभी सीमाएँ (`trigger`,
`keep`) ऊपर प्रलेखित कॉन्स्टेंट हैं।

## केवल Claude के लिए गेटिंग

इंजेक्शन केवल वास्तविक Claude या Claude-Code-संगत रिले के लिए होता है। इसका गेट
`open-sse/executors/base.ts` में है:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — वास्तविक Anthropic कुंजी/OAuth।
- `isClaudeCodeCompatible(this.provider)` — वे रिले जिनकी provider id
  `anthropic-compatible-cc-` प्रीफ़िक्स से शुरू होती है (वे Claude Code संगतता की घोषणा करते हैं, इसलिए ये वे रिले हैं
  जिनके द्वारा beta स्वीकार किए जाने की संभावना सबसे अधिक है)। `open-sse/services/provider.ts` देखें।

जानबूझकर **बाहर रखे गए**:

- `claude-web` — `create_conversation_params` अनुरोध संरचना वाला एक ब्राउज़र रिले, जिसे कभी भी
  `context_management` प्राप्त नहीं होता।
- सामान्य `anthropic-compatible-*` रिले (`-cc-` प्रीफ़िक्स के बिना) — अनिश्चित beta समर्थन वाले
  तृतीय-पक्ष endpoints।

टॉगल चालू होने पर भी गैर-Claude providers को `context_management` पैरामीटर कभी नहीं मिलता।

## 400-fallback / रिले कवरेज

कोई Claude-संगत रिले beta की घोषणा कर सकता है, लेकिन फिर भी HTTP 400 के साथ `context_management` पैरामीटर
अस्वीकार कर सकता है। अनुरोध को विफल करने के बजाय सुचारु रूप से डिग्रेड करने के लिए, executor पैरामीटर को हटा देता है
और उसी URL पर **एक बार** फिर प्रयास करता है:

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

1. यह केवल `400` पर सक्रिय होता है, जब context editing सक्षम हो और body में वास्तव में
   `context_management` मौजूद हो।
2. 400 body को `clone()` के माध्यम से पढ़ा जाता है, ताकि मिलान न होने वाले पथ के लिए मूल response अक्षुण्ण
   रहे।
3. त्रुटि टेक्स्ट का `/context[_-]management|context editing/i` से मिलना आवश्यक है — कोई असंबंधित 400 (उदा.
   `max_tokens must be >= 1`) fallback को ट्रिगर **नहीं** करता; मूल त्रुटि आगे प्रसारित होती है।
4. मिलान होने पर यह `contextEditingDisabled = true` सेट करता है (जिससे बाद में किसी retry/fallback URL के लिए
   नया `transformedBody` बनाए जाने पर दोबारा इंजेक्शन रुक जाता है), `context_management` को हटाता है,
   Claude / Claude-Code-संगत रिले के लिए body को फिर से साइन करता है (`signRequestBody`), और उसी
   URL पर एक बार फिर प्रयास करता है।

वास्तविक Claude, beta को `ANTHROPIC_BETA_BASE` में रखता है और इस fallback पथ तक नहीं पहुँचता।

## `applied_edits` टेलीमेट्री

Claude response के बाद, OmniRoute रिकॉर्ड करता है कि provider ने वास्तव में कितना context साफ़ किया। इसे
स्ट्रीम **नहीं** किया जाता — इसे non-streaming response body से सर्वोत्तम प्रयास के आधार पर निकाला जाता है, और यह
कभी भी response को प्रभावित नहीं करता (टेलीमेट्री विफलताओं को अनदेखा कर दिया जाता है)।

- निष्कर्षण: `open-sse/config/contextEditing.ts` में `extractContextEditingTelemetry(responseBody)`।
  यह response संरचना के प्रति रक्षात्मक रूप से तीन स्थानों पर `applied_edits` की जाँच करता है:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- प्रत्येक प्रविष्टि से पढ़े जाने वाले edit फ़ील्ड: `cleared_input_tokens` और `cleared_tool_uses`
  (snake_case, Anthropic-मूल), तथा fallback के रूप में camelCase वाले `clearedInputTokens` / `clearedToolUses`।
- जब कोई `applied_edits` array नहीं मिलता या वास्तव में कुछ भी साफ़ नहीं किया गया हो, तो `null` लौटाता है।

रसीद की संरचना `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` है।
रिकॉर्डिंग `open-sse/handlers/chatCore.ts` में (`provider === "claude"` तक सीमित)
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) के माध्यम से होती है, जो निम्न टैग वाली
एक compression analytics पंक्ति लिखता है:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = साफ़ किए गए input-token की संख्या
- `request_id` के अंत में `::context-editing`

इस प्रकार प्रत्यायोजित clearing, स्थानीय engines के साथ compression analytics में
`context-editing` engine लेबल के अंतर्गत दिखाई देती है, और इसे RTK/Caveman/LLMLingua बचत से अलग पहचाना जा सकता है।

## स्थानीय कम्प्रेशन इंजनों के साथ संबंध

| पहलू                    | स्थानीय इंजन (Caveman / RTK / LLMLingua / stacked)     | प्रत्यायोजित संदर्भ संपादन                           |
| ----------------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| यह कहाँ चलता है         | OmniRoute में, अनुरोध के प्रॉक्सी से बाहर जाने से पहले | प्रदाता (Claude) में, सर्वर-साइड                     |
| यह क्या संपादित करता है | प्रॉम्प्ट / संदर्भ / टूल-परिणाम टेक्स्ट                | पुराने टूल-उपयोग / टूल-परिणाम ब्लॉक                  |
| प्रदाता का दायरा        | सभी प्रदाता                                            | केवल `claude` + `anthropic-compatible-cc-*`          |
| टॉगल                    | कम्प्रेशन मोड सेटिंग्स                                 | `contextEditing.enabled`                             |
| विफलता मोड              | फ़ेल-ओपन (मूल टेक्स्ट)                                 | 400-फ़ॉलबैक: पैरामीटर हटाएँ, एक बार पुनः प्रयास करें |
| बचत टेलीमेट्री          | `engine: <engine id>`                                  | `engine: "context-editing"`                          |

दोनों एक-दूसरे के पूरक हैं: स्थानीय इंजन OmniRoute द्वारा भेजे जाने वाले बाइट्स को कम्प्रेस करते हैं; संदर्भ संपादन से
Claude विभिन्न टर्न के दौरान चल रहे संदर्भ को छाँट सकता है। दोनों को एक साथ सक्षम किया जा सकता है।

## यह भी देखें

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इंजन रजिस्ट्री और स्थानीय कम्प्रेशन
  इंजन
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — कमांड/टूल-आउटपुट कम्प्रेशन
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP विवरण कम्प्रेशन और
  टूल-कार्डिनैलिटी में कमी
- स्रोत: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
