# Delegated Context Editing (Anthropic) (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

प्रतिनिधायित **संदर्भ संपादन** हे केवळ Claude साठी असलेले संदर्भ-व्यवस्थापन वैशिष्ट्य आहे. OmniRoute च्या स्थानिक
कॉम्प्रेशन इंजिन्सच्या (Caveman, RTK, LLMLingua, स्टॅक केलेल्या पाइपलाइन्स) विपरीत — जी विनंतीचा मुख्य भाग
प्रॉक्सीमधून बाहेर जाण्यापूर्वीच पुन्हा लिहितात — संदर्भ संपादन **प्रदात्याला** त्याच्या स्वतःच्या सक्रिय संदर्भ विंडोमधील कालबाह्य
टूल-वापर / टूल-परिणाम ब्लॉक्स साफ करण्यास सांगते. OmniRoute केवळ एक बॉडी
पॅरामीटर (`context_management.edits[]`) जोडते; Claude त्याच्या स्वतःच्या टोकनायझरनुसार प्रत्यक्ष साफसफाई करते.

हे स्वरूपतः एक प्रतिनिधायित सामर्थ्य आहे: इतर प्रदाते हा पॅरामीटर नाकारतात, त्यामुळे OmniRoute त्याची व्याप्ती
काटेकोरपणे Claude आणि Claude-Code-सुसंगत रिलेंपुरती मर्यादित ठेवते.

सत्याचा स्रोत: `open-sse/config/contextEditing.ts` (स्ट्रॅटेजी आयडी, बॉडी इंजेक्शन, टेलिमेट्री
एक्स्ट्रॅक्शन), `open-sse/executors/base.ts` (इंजेक्शन गेट + 400-फॉलबॅक), आणि
`open-sse/services/compression/types.ts` (कॉन्फिगची रचना + डीफॉल्ट).

## `clear_tool_uses` काय करते

OmniRoute आउटबाउंड Anthropic Messages बॉडीमध्ये एकच एडिट इंजेक्ट करते:

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

- `type: "clear_tool_uses_20250919"` — दिनांकित Anthropic स्ट्रॅटेजी आयडी (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — विनंतीचे इनपुट टोकन्स ही मर्यादा ओलांडल्यानंतर Claude जुने
  टूल-वापर/परिणाम जोड साफ करण्यास सुरुवात करते (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic चे डीफॉल्ट).
- `keep.value: 3` — सर्वात अलीकडील N टूल-वापर/परिणाम जोड्यांना बदल न करता ठेवले जाते
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

बीटाची सूचना `anthropic-beta: context-management-2025-06-27` हेडरद्वारे दिली जाते, जो
OmniRoute आधीपासूनच Claude विनंत्यांमध्ये पाठवते.

इंजेक्शन `applyContextEditingToBody()` द्वारे केले जाते आणि ते **आयडेम्पोटंट** आहे: बॉडीमध्ये
`clear_tool_uses` एडिट आधीपासून अस्तित्वात असल्यास (मागील कॉलने जोडलेले किंवा क्लायंटने पुरवलेले), बॉडी
जशी आहे तशीच ठेवली जाते. `clear_thinking_20251015` एडिटदेखील उपस्थित असल्यास, OmniRoute
`clear_thinking` एडिटला स्थिर क्रमवारीने सुरुवातीला आणते, कारण Anthropic च्या आवश्यकतेनुसार `edits[]`
अॅरेमध्ये `clear_thinking` हे `clear_tool_uses` च्या आधी असणे आवश्यक आहे.

## प्रत्येक कॉम्बोसाठी सक्षम करण्याचे टॉगल

संदर्भ संपादन **डीफॉल्टनुसार बंद** असते आणि ते निवडून सुरू करावे लागते. हे टॉगल कॉम्प्रेशन कॉन्फिगमध्ये असलेले एकमेव बुलियन आहे:

- सेटिंग की: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **नाही**).
- प्रकार: `open-sse/services/compression/types.ts` मधील
  `ContextEditingConfig { enabled: boolean }`.
- डीफॉल्ट: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod स्कीमा: `src/shared/validation/compressionConfigSchemas.ts` मधील `contextEditingConfigSchema`.
- स्टोरेज: उर्वरित कॉम्प्रेशन सेटिंग्जसोबत कायमस्वरूपी साठवले जाते (
  `src/lib/db/compression.ts` मध्ये नॉर्मलाइझ केले जाते).

डॅशबोर्डमध्ये हे टॉगल कॉम्प्रेशन हबमध्ये
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) असते आणि `saveSettings()` द्वारे
`{ contextEditing: { enabled: … } }` परत लिहिते. ते कॉम्प्रेशन-सेटिंग्ज ऑब्जेक्टचा भाग असल्यामुळे,
पूर्णपणे स्वतंत्र पृष्ठभाग असण्याऐवजी ते प्रत्येक कॉम्बोच्या कॉम्प्रेशन प्रोफाइलसोबत संयोजित होते — कॉन्फिगमध्ये केवळ
चालू/बंद फ्लॅग असतो; सर्व मर्यादा (`trigger`, `keep`) वर दस्तऐवजीकरण केलेल्या कॉन्स्टंट्सनुसार असतात.

## केवळ Claude साठी गेटिंग

इंजेक्शन फक्त अस्सल Claude किंवा Claude-Code-सुसंगत रिलेसाठीच होते. `open-sse/executors/base.ts` मधील गेट असे आहे:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — अस्सल Anthropic की/OAuth.
- `isClaudeCodeCompatible(this.provider)` — असे रिले ज्यांचा प्रोव्हायडर आयडी `anthropic-compatible-cc-` उपसर्गाने सुरू होतो (ते Claude Code सुसंगततेची घोषणा करतात, त्यामुळे बीटा स्वीकारण्याची सर्वाधिक शक्यता असलेले हेच रिले आहेत). `open-sse/services/provider.ts` पहा.

जाणीवपूर्वक **वगळलेले**:

- `claude-web` — `create_conversation_params` विनंती संरचना असलेला ब्राउझर रिले, ज्याला `context_management` कधीही मिळत नाही.
- सर्वसाधारण `anthropic-compatible-*` रिले (`-cc-` उपसर्गाशिवाय) — अनिश्चित बीटा समर्थन असलेले तृतीय-पक्ष एंडपॉइंट.

टॉगल सुरू असतानाही Claude व्यतिरिक्त इतर प्रोव्हायडर्सना `context_management` पॅरामीटर कधीही मिळत नाही.

## 400-फॉलबॅक / रिले व्याप्ती

Claude-सुसंगत रिले बीटाची घोषणा करू शकतो, पण तरीही HTTP 400 सह `context_management` पॅरामीटर नाकारू शकतो. विनंती अयशस्वी करण्याऐवजी सुयोग्यरीत्या पर्यायी वर्तन करण्यासाठी, एक्झिक्युटर पॅरामीटर काढून टाकतो आणि त्याच URL वर **एकदा** पुन्हा प्रयत्न करतो:

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

वर्तन:

1. संदर्भ संपादन सुरू असताना, बॉडीमध्ये प्रत्यक्षात `context_management` असताना आणि प्रतिसाद `400` असतानाच हे सक्रिय होते.
2. 400 बॉडी `clone()` द्वारे वाचली जाते, त्यामुळे जुळणी न होणाऱ्या मार्गासाठी मूळ प्रतिसाद अबाधित राहतो.
3. त्रुटीचा मजकूर `/context[_-]management|context editing/i` शी जुळलाच पाहिजे — असंबंधित 400 (उदा. `max_tokens must be >= 1`) फॉलबॅक सक्रिय **करत नाही**; मूळ त्रुटी पुढे पाठवली जाते.
4. जुळणी झाल्यास ते `contextEditingDisabled = true` सेट करते (नंतर पुनर्प्रयत्न/फॉलबॅक URL साठी नवीन `transformedBody` तयार झाल्यास हे पुन्हा इंजेक्शन होण्यापासून रोखते), `context_management` हटवते, Claude / Claude-Code-सुसंगत रिलेसाठी बॉडीवर पुन्हा स्वाक्षरी करते (`signRequestBody`) आणि त्याच URL वर एकदा पुन्हा प्रयत्न करते.

अस्सल Claude मध्ये बीटा `ANTHROPIC_BETA_BASE` मध्ये समाविष्ट असतो आणि तो या फॉलबॅक मार्गावर जात नाही.

## `applied_edits` टेलिमेट्री

Claude प्रतिसादानंतर, प्रोव्हायडरने प्रत्यक्षात किती संदर्भ साफ केला याची OmniRoute नोंद करते. हे **स्ट्रीम केले जात नाही** — ते नॉन-स्ट्रीमिंग प्रतिसाद बॉडीमधून सर्वोत्तम प्रयत्नाने काढले जाते आणि प्रतिसादावर त्याचा कधीही परिणाम होत नाही (टेलिमेट्रीतील अपयश दुर्लक्षित केले जातात).

- निष्कर्षण: `open-sse/config/contextEditing.ts` मधील `extractContextEditingTelemetry(responseBody)`.
  ते प्रतिसादाच्या संरचनेबाबत बचावात्मक पद्धतीने तीन ठिकाणी `applied_edits` शोधते:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- प्रत्येक नोंदीमधून वाचली जाणारी फील्ड: `cleared_input_tokens` आणि `cleared_tool_uses`
  (snake_case, Anthropic-मूळ), तसेच फॉलबॅक म्हणून `clearedInputTokens` / `clearedToolUses` ही camelCase रूपे.
- `applied_edits` अॅरे आढळला नाही किंवा प्रत्यक्षात काहीही साफ केले गेले नाही, तर `null` परत करते.

प्राप्तीची संरचना `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` अशी आहे. नोंद `open-sse/handlers/chatCore.ts` मध्ये (`provider === "claude"` पर्यंत मर्यादित) `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) द्वारे केली जाते, जी खालील टॅगसह कम्प्रेशन अॅनालिटिक्स पंक्ती लिहिते:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = साफ केलेल्या इनपुट-टोकनची संख्या
- `request_id` ला `::context-editing` प्रत्यय जोडलेला

त्यामुळे सोपवून केलेले क्लिअरिंग स्थानिक इंजिनांसोबतच कम्प्रेशन अॅनालिटिक्समध्ये `context-editing` इंजिन लेबलाखाली दिसते आणि RTK/Caveman/LLMLingua बचतींपासून वेगळे ओळखता येते.

## स्थानिक कॉम्प्रेशन इंजिनांशी संबंध

| पैलू             | स्थानिक इंजिने (Caveman / RTK / LLMLingua / stacked)   | प्रत्यायोजित संदर्भ संपादन                     |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------- |
| कुठे चालते       | विनंती प्रॉक्सीमधून बाहेर जाण्यापूर्वी OmniRoute मध्ये | प्रदात्यामध्ये (Claude), सर्व्हरच्या बाजूला    |
| काय संपादित करते | प्रॉम्प्ट / संदर्भ / टूल-रिझल्ट मजकूर                  | जुने टूल-वापर / टूल-रिझल्ट ब्लॉक्स             |
| प्रदाता व्याप्ती | सर्व प्रदाते                                           | केवळ `claude` + `anthropic-compatible-cc-*`    |
| टॉगल             | कॉम्प्रेशन मोड सेटिंग्ज                                | `contextEditing.enabled`                       |
| अपयश मोड         | फेल-ओपन (मूळ मजकूर)                                    | 400-फॉलबॅक: पॅरामीटर काढून एकदा पुन्हा प्रयत्न |
| बचत टेलिमेट्री   | `engine: <engine id>`                                  | `engine: "context-editing"`                    |

हे दोन्ही परस्परपूरक आहेत: स्थानिक इंजिने OmniRoute कडून पाठवले जाणारे बाइट्स कॉम्प्रेस करतात; तर संदर्भ संपादनामुळे
Claude अनेक टर्नमध्ये चालू संदर्भाची छाटणी करू शकते. दोन्ही एकत्र सक्षम करता येतात.

## हे देखील पहा

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इंजिन रजिस्ट्री आणि स्थानिक कॉम्प्रेशन
  इंजिने
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — कमांड/टूल-आउटपुट कॉम्प्रेशन
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP वर्णन कॉम्प्रेशन आणि
  टूल-कार्डिनॅलिटी कपात
- स्रोत: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
