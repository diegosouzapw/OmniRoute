# Delegated Context Editing (Anthropic) (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

ஒப்படைக்கப்பட்ட **Context Editing** என்பது Claude-க்கு மட்டுமான context-management அம்சமாகும். OmniRoute-இன் உள்ளக
compression engines (Caveman, RTK, LLMLingua, stacked pipelines) போலல்லாமல் — அவை கோரிக்கை body-ஐ
proxy-யிலிருந்து வெளியேறுவதற்கு _முன்பே_ மீண்டும் எழுதுகின்றன — Context Editing, அதன் சொந்த இயங்கும் context window-இலிருந்து காலாவதியான
tool-use / tool-result blocks-ஐ அகற்றுமாறு **provider**-இடம் கோருகிறது. OmniRoute ஒரு body
parameter-ஐ (`context_management.edits[]`) மட்டுமே இணைக்கிறது; Claude தனது சொந்த tokenizer-ஐப் பயன்படுத்தி உண்மையான அகற்றலைச் செய்கிறது.

இது இயல்பாகவே ஒப்படைக்கப்பட்ட திறனாகும்: பிற providers இந்த parameter-ஐ நிராகரிப்பதால், OmniRoute இதை
Claude மற்றும் Claude-Code-compatible relays-க்கு மட்டுமே கண்டிப்பாக வரையறுக்கிறது.

அதிகாரப்பூர்வ ஆதாரம்: `open-sse/config/contextEditing.ts` (strategy ids, body injection, telemetry
extraction), `open-sse/executors/base.ts` (injection gate + 400-fallback), மற்றும்
`open-sse/services/compression/types.ts` (config shape + default).

## `clear_tool_uses` என்ன செய்கிறது

வெளிச்செல்லும் Anthropic Messages body-க்குள் OmniRoute ஓர் ஒற்றை edit-ஐச் செலுத்துகிறது:

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

- `type: "clear_tool_uses_20250919"` — தேதியிடப்பட்ட Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — கோரிக்கையின் input tokens இந்த வரம்பைத் தாண்டியவுடன், Claude பழைய
  tool-use/result இணைகளை அகற்றத் தொடங்குகிறது (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic-இன் இயல்புநிலை).
- `keep.value: 3` — மிகச் சமீபத்திய N tool-use/result இணைகள் மாற்றமின்றி வைக்கப்படுகின்றன
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

இந்த beta, `anthropic-beta: context-management-2025-06-27` header வழியாக அறிவிக்கப்படுகிறது; இதை
Claude கோரிக்கைகளில் OmniRoute ஏற்கனவே அனுப்புகிறது.

Injection, `applyContextEditingToBody()` மூலம் செய்யப்படுகிறது மற்றும் இது **idempotent** ஆகும்: body-யில் ஏற்கனவே ஒரு `clear_tool_uses`
edit இருந்தால் (முந்தைய அழைப்பால் சேர்க்கப்பட்டிருந்தாலும் அல்லது client வழங்கியிருந்தாலும்), body
எந்த மாற்றமும் இன்றி விடப்படும். ஒரு `clear_thinking_20251015` edit-உம் இருந்தால், OmniRoute
`clear_thinking` edit-ஐ stable-sort செய்து முன்னிலைக்குக் கொண்டுவரும்; ஏனெனில் `edits[]` array-இல்
`clear_tool_uses`-க்கு முன் `clear_thinking` வர வேண்டும் என்று Anthropic கட்டாயப்படுத்துகிறது.

## ஒவ்வொரு combo-வுக்குமான enable toggle

Context Editing இயல்புநிலையில் **முடக்கப்பட்டுள்ளது**, மேலும் opt-in செய்ய வேண்டும். இந்த toggle என்பது
compression config-இல் உள்ள ஓர் ஒற்றை boolean ஆகும்:

- Setting key: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **அல்ல**).
- Type: `ContextEditingConfig { enabled: boolean }` என்பது
  `open-sse/services/compression/types.ts`-இல் உள்ளது.
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod schema: `src/shared/validation/compressionConfigSchemas.ts`-இல் உள்ள `contextEditingConfigSchema`.
- Storage: மீதமுள்ள compression settings-உடன் நிலையாகச் சேமிக்கப்படுகிறது
  (`src/lib/db/compression.ts`-இல் normalize செய்யப்படுகிறது).

Dashboard-இல் இந்த toggle, compression hub-இல்
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) உள்ளது; மேலும் `saveSettings()` வழியாக
`{ contextEditing: { enabled: … } }` என்பதை மீண்டும் எழுதுகிறது. இது compression-settings object-இல் பயணிப்பதால்,
முற்றிலும் தனிப்பட்ட surface ஆக இருப்பதற்குப் பதிலாக ஒவ்வொரு combo-வுக்குமான compression profile-உடன் இணைந்து செயல்படுகிறது — config-இல்
on/off flag மட்டுமே உள்ளது; அனைத்து thresholds-உம் (`trigger`,
`keep`) மேலே ஆவணப்படுத்தப்பட்ட constants ஆகும்.

## Claude-க்கு மட்டுமான கட்டுப்பாடு

உண்மையான Claude அல்லது Claude-Code-இணக்கமான ரிலேக்களுக்கு மட்டுமே உட்செலுத்தல் நிகழ்கிறது. `open-sse/executors/base.ts`-இல் உள்ள கட்டுப்பாடு:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — உண்மையான Anthropic விசை/OAuth.
- `isClaudeCodeCompatible(this.provider)` — provider id, `anthropic-compatible-cc-` முன்னொட்டுடன் தொடங்கும் ரிலேக்கள் (அவை Claude Code இணக்கத்தன்மையை அறிவிக்கின்றன; எனவே பீட்டாவை ஏற்க அதிக வாய்ப்புள்ள ரிலேக்கள் இவையே). `open-sse/services/provider.ts`-ஐப் பார்க்கவும்.

வேண்டுமென்றே **விலக்கப்பட்டவை**:

- `claude-web` — `context_management`-ஐ ஒருபோதும் காணாத `create_conversation_params` கோரிக்கை வடிவத்தைக் கொண்ட உலாவி ரிலே.
- பொதுவான `anthropic-compatible-*` ரிலேக்கள் (`-cc-` முன்னொட்டு இல்லாதவை) — பீட்டா ஆதரவு உறுதியற்ற மூன்றாம் தரப்பு endpoint-கள்.

toggle இயக்கப்பட்டிருந்தாலும் Claude அல்லாத provider-கள் ஒருபோதும் `context_management` அளவுருவைப் பெறாது.

## 400-fallback / ரிலே கவரேஜ்

Claude-இணக்கமான ஒரு ரிலே பீட்டாவை அறிவித்தாலும், `context_management` அளவுருவை HTTP 400 உடன் நிராகரிக்கலாம். கோரிக்கை தோல்வியடைவதற்குப் பதிலாகச் சீராக மாற்று முறைக்குச் செல்ல, executor அந்த அளவுருவை நீக்கிவிட்டு அதே URL-ஐ **ஒருமுறை** மீண்டும் முயற்சிக்கிறது:

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

நடத்தை:

1. சூழல் திருத்தம் இயக்கப்பட்டிருக்கும் போதும், body உண்மையில் `context_management`-ஐக் கொண்டிருக்கும் போதும் ஏற்படும் `400`-இல் மட்டுமே செயல்படும்.
2. பொருந்தாத பாதைக்காக அசல் response மாற்றமின்றி இருக்கும்படி, 400 body ஒரு `clone()` வழியாகப் படிக்கப்படுகிறது.
3. பிழை உரை `/context[_-]management|context editing/i` உடன் பொருந்த வேண்டும் — தொடர்பில்லாத ஒரு 400 (எ.கா. `max_tokens must be >= 1`) fallback-ஐத் தூண்டாது; அசல் பிழையே மேலே பரவும்.
4. பொருத்தம் ஏற்பட்டால், அது `contextEditingDisabled = true` என அமைக்கிறது (பின்னர் retry/fallback URL-க்காக ஒரு புதிய `transformedBody` உருவாக்கப்பட்டால் மீண்டும் உட்செலுத்தப்படுவதை இது தடுக்கிறது), `context_management`-ஐ நீக்குகிறது, Claude / Claude-Code-இணக்கமான ரிலேக்களுக்காக body-ஐ மீண்டும் கையொப்பமிடுகிறது (`signRequestBody`), பின்னர் அதே URL-ஐ ஒருமுறை மீண்டும் முயற்சிக்கிறது.

உண்மையான Claude, பீட்டாவை `ANTHROPIC_BETA_BASE`-இல் கொண்டுசெல்வதால், இந்த fallback பாதையை அடைவதில்லை.

## `applied_edits` டெலிமெட்ரி

ஒரு Claude response-க்குப் பிறகு, provider உண்மையில் எவ்வளவு சூழலை அழித்தது என்பதை OmniRoute பதிவு செய்கிறது. இது **stream செய்யப்படுவதில்லை** — streaming அல்லாத response body-இலிருந்து best-effort முறையில் பிரித்தெடுக்கப்படுகிறது; மேலும் response-ஐ ஒருபோதும் பாதிக்காது (டெலிமெட்ரி தோல்விகள் புறக்கணிக்கப்படுகின்றன).

- பிரித்தெடுத்தல்: `open-sse/config/contextEditing.ts`-இல் உள்ள `extractContextEditingTelemetry(responseBody)`.
  Response வடிவத்தின் வேறுபாடுகளைப் பாதுகாப்பாகக் கையாள, இது மூன்று இடங்களில் `applied_edits`-ஐத் தேடுகிறது:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- ஒவ்வொரு பதிவிலிருந்தும் படிக்கப்படும் புலங்கள்: `cleared_input_tokens` மற்றும் `cleared_tool_uses`
  (snake_case, Anthropic-இன் சொந்த வடிவம்); மாற்றாக `clearedInputTokens` / `clearedToolUses` camelCase வடிவங்களும் ஆதரிக்கப்படுகின்றன.
- `applied_edits` array எதுவும் காணப்படாவிட்டால் அல்லது உண்மையில் எதுவும் அழிக்கப்படவில்லை என்றால் `null`-ஐத் திருப்பித் தருகிறது.

பெறுகையின் வடிவம் `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`. பதிவு செய்தல் `open-sse/handlers/chatCore.ts`-இல் (`provider === "claude"` என்பதற்குக் கட்டுப்படுத்தப்பட்டு), `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) வழியாக நிகழ்கிறது; இது பின்வருமாறு குறியிடப்பட்ட compression analytics row ஒன்றை எழுதுகிறது:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = அழிக்கப்பட்ட input-token எண்ணிக்கை
- `request_id`-க்கு `::context-editing` பின்னொட்டு சேர்க்கப்படும்

இதனால் ஒப்படைக்கப்பட்ட அழித்தல், உள்ளூர் engine-களுடன் சேர்த்து compression analytics-இல் `context-editing` engine label-ன் கீழ் தோன்றுகிறது; மேலும் RTK/Caveman/LLMLingua சேமிப்புகளிலிருந்து அதை வேறுபடுத்திக் காண முடியும்.

## உள்ளூர் சுருக்கப் பொறிகளுடனான தொடர்பு

| அம்சம்                   | உள்ளூர் பொறிகள் (Caveman / RTK / LLMLingua / stacked)           | ஒப்படைக்கப்பட்ட சூழல் திருத்தம்                               |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------- |
| இயங்கும் இடம்            | கோரிக்கை ப்ராக்ஸியை விட்டு வெளியேறுவதற்கு முன்பு, OmniRoute-இல் | வழங்குநரில் (Claude), சேவையகப் பக்கத்தில்                     |
| திருத்தப்படுவது          | Prompt / சூழல் / கருவி-முடிவு உரை                               | பழைய கருவிப் பயன்பாடு / கருவி-முடிவு தொகுதிகள்                |
| வழங்குநர் வரம்பு         | அனைத்து வழங்குநர்களும்                                          | `claude` + `anthropic-compatible-cc-*` மட்டும்                |
| நிலைமாற்றி               | சுருக்கப் பயன்முறை அமைப்புகள்                                   | `contextEditing.enabled`                                      |
| தோல்விப் பயன்முறை        | தோல்வியின்போது அசல் உரையைப் பயன்படுத்துதல்                      | 400-மாற்றுவழி: அளவுருவை நீக்கி, ஒருமுறை மீண்டும் முயற்சித்தல் |
| சேமிப்பு அளவீட்டுத் தரவு | `engine: <engine id>`                                           | `engine: "context-editing"`                                   |

இவை இரண்டும் ஒன்றையொன்று நிறைவு செய்பவை: உள்ளூர் பொறிகள் OmniRoute அனுப்பும் பைட்டுகளைச் சுருக்குகின்றன; Context Editing ஆனது
பல உரையாடல் சுற்றுகளில் தொடரும் சூழலை Claude சீரமைத்துக் குறைக்க உதவுகிறது. இவை இரண்டையும் ஒரே நேரத்தில் இயக்கலாம்.

## மேலும் காண்க

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — பொறிப் பதிவகம் மற்றும் உள்ளூர் சுருக்கப்
  பொறிகள்
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — கட்டளை/கருவி-வெளியீட்டுச் சுருக்கம்
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP விளக்கச் சுருக்கம் மற்றும்
  கருவி எண்ணிக்கை குறைப்பு
- மூலம்: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
