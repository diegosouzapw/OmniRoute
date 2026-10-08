# Delegated Context Editing (Anthropic) (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

ప్రతినిధీకరించిన **కాంటెక్స్ట్ ఎడిటింగ్** అనేది Claudeకు మాత్రమే అందుబాటులో ఉన్న కాంటెక్స్ట్-నిర్వహణ ఫీచర్. అభ్యర్థన బాడీ ప్రాక్సీని విడిచిపెట్టడానికి _ముందే_ దాన్ని తిరిగి వ్రాసే OmniRoute యొక్క స్థానిక కంప్రెషన్ ఇంజిన్లకు (Caveman, RTK, LLMLingua, stacked pipelines) భిన్నంగా — కాంటెక్స్ట్ ఎడిటింగ్, దాని స్వంత కొనసాగుతున్న కాంటెక్స్ట్ విండో నుండి కాలం చెల్లిన టూల్-వినియోగం / టూల్-ఫలితం బ్లాక్లను తొలగించమని **ప్రొవైడర్ను** అడుగుతుంది. OmniRoute కేవలం ఒక బాడీ పారామీటర్ను (`context_management.edits[]`) జోడిస్తుంది; అసలు తొలగింపును Claude తన స్వంత టోకనైజర్ ఆధారంగా చేస్తుంది.

ఇది స్వభావరీత్యా ప్రతినిధీకరించిన సామర్థ్యం: ఇతర ప్రొవైడర్లు ఈ పారామీటర్ను తిరస్కరిస్తారు, కాబట్టి OmniRoute దీన్ని ఖచ్చితంగా Claude మరియు Claude-Code-అనుకూల రిలేలకు మాత్రమే పరిమితం చేస్తుంది.

అధికారిక మూలం: `open-sse/config/contextEditing.ts` (స్ట్రాటజీ ఐడీలు, బాడీ ఇంజెక్షన్, టెలిమెట్రీ ఎక్స్ట్రాక్షన్), `open-sse/executors/base.ts` (ఇంజెక్షన్ గేట్ + 400-ఫాల్బ్యాక్), మరియు `open-sse/services/compression/types.ts` (కాన్ఫిగ్ ఆకృతి + డిఫాల్ట్).

## `clear_tool_uses` ఏమి చేస్తుంది

బయటకు పంపే Anthropic Messages బాడీలోకి OmniRoute ఒకే ఎడిట్ను ఇంజెక్ట్ చేస్తుంది:

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

- `type: "clear_tool_uses_20250919"` — తేదీతో కూడిన Anthropic స్ట్రాటజీ ఐడి (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — అభ్యర్థన ఇన్పుట్ టోకెన్లు ఈ థ్రెషోల్డ్ను మించిన తర్వాత, Claude పాత టూల్-వినియోగం/ఫలితం జంటలను తొలగించడం ప్రారంభిస్తుంది (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic డిఫాల్ట్).
- `keep.value: 3` — అత్యంత ఇటీవలివైన N టూల్-వినియోగం/ఫలితం జంటలను మార్చకుండా ఉంచుతుంది (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

ఈ బీటా `anthropic-beta: context-management-2025-06-27` హెడర్ ద్వారా ప్రకటించబడుతుంది; Claude అభ్యర్థనలపై OmniRoute ఇప్పటికే దీన్ని పంపుతుంది.

ఇంజెక్షన్ను `applyContextEditingToBody()` నిర్వహిస్తుంది మరియు ఇది **ఐడెంపోటెంట్**: బాడీలో ఇప్పటికే `clear_tool_uses` ఎడిట్ ఉంటే (మునుపటి కాల్ ద్వారా జోడించబడినా లేదా క్లయింట్ అందించినా), బాడీని ఉన్నట్లుగానే వదిలేస్తుంది. `clear_thinking_20251015` ఎడిట్ కూడా ఉంటే, OmniRoute `clear_thinking` ఎడిట్ను స్థిరంగా ముందుకు సార్ట్ చేస్తుంది, ఎందుకంటే `edits[]` అర్రేలో `clear_thinking`, `clear_tool_uses` కంటే ముందు ఉండాలని Anthropic కోరుతుంది.

## ప్రతి కాంబోకు ఎనేబుల్ టాగుల్

కాంటెక్స్ట్ ఎడిటింగ్ **డిఫాల్ట్గా ఆఫ్లో** ఉంటుంది మరియు దీన్ని ప్రత్యేకంగా ఎంచుకొని ప్రారంభించాలి. ఈ టాగుల్ కంప్రెషన్ కాన్ఫిగ్లో ఉండే ఒకే బూలియన్:

- సెట్టింగ్ కీ: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **కాదు**).
- రకం: `open-sse/services/compression/types.ts`లో `ContextEditingConfig { enabled: boolean }`.
- డిఫాల్ట్: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod స్కీమా: `src/shared/validation/compressionConfigSchemas.ts`లో `contextEditingConfigSchema`.
- స్టోరేజ్: మిగిలిన కంప్రెషన్ సెట్టింగ్లతో పాటు నిల్వ చేయబడుతుంది (`src/lib/db/compression.ts`లో సాధారణీకరించబడుతుంది).

డ్యాష్బోర్డ్లో ఈ టాగుల్ కంప్రెషన్ హబ్లో (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ఉంటుంది మరియు `saveSettings()` ద్వారా `{ contextEditing: { enabled: … } }`ను తిరిగి వ్రాస్తుంది. ఇది కంప్రెషన్-సెట్టింగ్ల ఆబ్జెక్ట్లో భాగంగా ప్రయాణిస్తుంది కాబట్టి, పూర్తిగా స్వతంత్ర ఉపరితలంగా ఉండటానికి బదులుగా ప్రతి కాంబో కంప్రెషన్ ప్రొఫైల్తో కలసి పనిచేస్తుంది — కాన్ఫిగ్ కేవలం ఆన్/ఆఫ్ ఫ్లాగ్ను మాత్రమే కలిగి ఉంటుంది; అన్ని థ్రెషోల్డ్లు (`trigger`, `keep`) పైన డాక్యుమెంట్ చేసిన స్థిరాంకాలే.

## Claude-మాత్రమే గేటింగ్

ఇంజెక్షన్ నిజమైన Claude లేదా Claude-Code-అనుకూల రిలేల కోసం మాత్రమే జరుగుతుంది.
`open-sse/executors/base.ts`లోని గేట్:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — నిజమైన Anthropic కీ/OAuth.
- `isClaudeCodeCompatible(this.provider)` — ప్రొవైడర్ id `anthropic-compatible-cc-` ప్రిఫిక్స్తో ప్రారంభమయ్యే రిలేలు (అవి Claude Code అనుకూలతను ప్రకటిస్తాయి, కాబట్టి బీటాను అంగీకరించే అవకాశం ఎక్కువగా ఉన్న రిలేలు ఇవే). `open-sse/services/provider.ts` చూడండి.

ఉద్దేశపూర్వకంగా **మినహాయించబడినవి**:

- `claude-web` — `context_management`ను ఎన్నడూ చూడని `create_conversation_params` రిక్వెస్ట్ ఆకృతి కలిగిన బ్రౌజర్ రిలే.
- సాధారణ `anthropic-compatible-*` రిలేలు (`-cc-` ప్రిఫిక్స్ లేనివి) — బీటా మద్దతు అనిశ్చితంగా ఉన్న మూడవ-పక్ష ఎండ్పాయింట్లు.

టాగుల్ ఆన్లో ఉన్నప్పటికీ, Claude-యేతర ప్రొవైడర్లు `context_management` పారామీటర్ను ఎప్పుడూ స్వీకరించరు.

## 400-ఫాల్బ్యాక్ / రిలే కవరేజ్

Claude-అనుకూల రిలే బీటాను ప్రకటించినప్పటికీ, `context_management` పారామీటర్ను HTTP 400తో తిరస్కరించవచ్చు. రిక్వెస్ట్ను విఫలం చేయకుండా సునాయాసంగా కొనసాగించేందుకు, ఎగ్జిక్యూటర్ పారామీటర్ను తొలగించి, అదే URLను **ఒక్కసారి** మళ్లీ ప్రయత్నిస్తుంది:

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

ప్రవర్తన:

1. కాంటెక్స్ట్ ఎడిటింగ్ ప్రారంభించబడి, బాడీలో వాస్తవంగా `context_management` ఉన్నప్పుడు ఎదురయ్యే `400`కు మాత్రమే ఇది అమలవుతుంది.
2. సరిపోలని మార్గం కోసం అసలు రెస్పాన్స్ యథాతథంగా ఉండేలా, 400 బాడీని `clone()` ద్వారా చదువుతుంది.
3. ఎర్రర్ టెక్స్ట్ తప్పనిసరిగా `/context[_-]management|context editing/i`తో సరిపోలాలి — సంబంధం లేని 400 (ఉదా. `max_tokens must be >= 1`) ఫాల్బ్యాక్ను ట్రిగ్గర్ **చేయదు**; అసలు ఎర్రర్ కొనసాగుతుంది.
4. సరిపోలినప్పుడు, ఇది `contextEditingDisabled = true`గా సెట్ చేస్తుంది (తర్వాత రీట్రై/ఫాల్బ్యాక్ URL కోసం కొత్త `transformedBody` నిర్మించబడితే తిరిగి ఇంజెక్ట్ కాకుండా ఇది నిరోధిస్తుంది), `context_management`ను తొలగిస్తుంది, Claude / Claude-Code-అనుకూల రిలేల కోసం బాడీపై మళ్లీ సంతకం చేస్తుంది (`signRequestBody`), ఆపై అదే URLను ఒక్కసారి మళ్లీ ప్రయత్నిస్తుంది.

నిజమైన Claude బీటాను `ANTHROPIC_BETA_BASE`లో కలిగి ఉంటుంది మరియు ఈ ఫాల్బ్యాక్ మార్గాన్ని చేరదు.

## `applied_edits` టెలిమెట్రీ

Claude రెస్పాన్స్ తర్వాత, ప్రొవైడర్ వాస్తవంగా ఎంత కాంటెక్స్ట్ను తొలగించిందో OmniRoute రికార్డ్ చేస్తుంది. ఇది **స్ట్రీమ్ చేయబడదు** — నాన్-స్ట్రీమింగ్ రెస్పాన్స్ బాడీ నుంచి బెస్ట్-ఎఫర్ట్ పద్ధతిలో సంగ్రహించబడుతుంది మరియు రెస్పాన్స్పై ఎప్పుడూ ప్రభావం చూపదు (టెలిమెట్రీ వైఫల్యాలు విస్మరించబడతాయి).

- సంగ్రహణ: `open-sse/config/contextEditing.ts`లోని `extractContextEditingTelemetry(responseBody)`.
  రెస్పాన్స్ ఆకృతిలోని వైవిధ్యాన్ని తట్టుకునేందుకు ఇది మూడు స్థానాల్లో `applied_edits` కోసం పరిశీలిస్తుంది:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- ప్రతి ఎంట్రీ నుంచి చదివే ఫీల్డ్లు: `cleared_input_tokens` మరియు `cleared_tool_uses`
  (snake_case, Anthropic-స్థానికం), వీటికి `clearedInputTokens` / `clearedToolUses` camelCase ఫాల్బ్యాక్లు ఉంటాయి.
- `applied_edits` అరే కనుగొనబడనప్పుడు లేదా వాస్తవంగా ఏదీ తొలగించబడనప్పుడు `null`ను రిటర్న్ చేస్తుంది.

రిసీట్ ఆకృతి `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`. రికార్డింగ్ `open-sse/handlers/chatCore.ts`లో (`provider === "claude"`కు గేట్ చేయబడి) `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) ద్వారా జరుగుతుంది; ఇది కింది విధంగా ట్యాగ్ చేయబడిన కంప్రెషన్ అనలిటిక్స్ రోను వ్రాస్తుంది:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = తొలగించబడిన ఇన్పుట్-టోకెన్ల సంఖ్య
- `request_id`కు `::context-editing` సఫిక్స్ జోడించబడుతుంది

అందువల్ల, అప్పగించబడిన తొలగింపు స్థానిక ఇంజిన్లతో పాటు కంప్రెషన్ అనలిటిక్స్లో `context-editing` ఇంజిన్ లేబుల్ కింద కనిపిస్తుంది మరియు RTK/Caveman/LLMLingua ఆదాల నుంచి వేరుగా గుర్తించవచ్చు.

## స్థానిక కంప్రెషన్ ఇంజిన్లతో సంబంధం

| అంశం               | స్థానిక ఇంజిన్లు (Caveman / RTK / LLMLingua / stacked) | డెలిగేట్ చేసిన కాంటెక్స్ట్ ఎడిటింగ్                              |
| ------------------ | ------------------------------------------------------ | ---------------------------------------------------------------- |
| ఎక్కడ అమలవుతుంది   | అభ్యర్థన ప్రాక్సీని విడిచిపెట్టే ముందు, OmniRouteలో    | ప్రొవైడర్లో (Claude), సర్వర్ వైపు                                |
| దేనిని సవరిస్తుంది | ప్రాంప్ట్ / కాంటెక్స్ట్ / టూల్-ఫలిత టెక్స్ట్           | పాత టూల్-వినియోగం / టూల్-ఫలిత బ్లాక్లు                           |
| ప్రొవైడర్ పరిధి    | అన్ని ప్రొవైడర్లు                                      | `claude` + `anthropic-compatible-cc-*` మాత్రమే                   |
| టాగుల్             | కంప్రెషన్ మోడ్ సెట్టింగ్లు                             | `contextEditing.enabled`                                         |
| వైఫల్య విధానం      | ఫెయిల్-ఓపెన్ (అసలు టెక్స్ట్)                           | 400-ఫాల్బ్యాక్: పరామితిని తొలగించి, ఒకసారి మళ్లీ ప్రయత్నిస్తుంది |
| ఆదా టెలిమెట్రీ     | `engine: <engine id>`                                  | `engine: "context-editing"`                                      |

ఈ రెండూ పరస్పర పూరకాలు: స్థానిక ఇంజిన్లు OmniRoute పంపే బైట్లను కంప్రెస్ చేస్తాయి; కాంటెక్స్ట్ ఎడిటింగ్ ద్వారా
Claude టర్న్ల అంతటా కొనసాగుతున్న కాంటెక్స్ట్ను కుదించగలదు. రెండింటినీ కలిపి ప్రారంభించవచ్చు.

## ఇవి కూడా చూడండి

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ఇంజిన్ రిజిస్ట్రీ మరియు స్థానిక కంప్రెషన్
  ఇంజిన్లు
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — కమాండ్/టూల్-అవుట్పుట్ కంప్రెషన్
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP వివరణ కంప్రెషన్ మరియు
  టూల్-కార్డినాలిటీ తగ్గింపు
- మూలం: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
