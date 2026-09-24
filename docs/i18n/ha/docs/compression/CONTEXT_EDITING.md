# Delegated Context Editing (Anthropic) (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Gyaran Mahallin** da aka wakilta fasali ne na sarrafa mahalli na Claude kaɗai. Ba kamar injinan matsawa na cikin gida na OmniRoute ba (Caveman, RTK, LLMLingua, stacked pipelines) — waɗanda suke sake rubuta jikin buƙatar _kafin_ ya bar proxy — Context Editing yana buƙatar **mai bayarwa** ya share tsofaffin tubalan amfani-da-kayan-aiki / sakamakon-kayan-aiki daga taga mahallinsa mai gudana. OmniRoute yana haɗa ma'aunin jiki ne kawai (`context_management.edits[]`); Claude ne yake aiwatar da ainihin sharewar bisa ga tokenizer nasa.

Wannan damar wakilta ce bisa ga yanayinta: sauran masu bayarwa suna ƙin ma'aunin, don haka OmniRoute yana taƙaita shi sosai ga Claude da relays masu dacewa da Claude-Code.

Tushen gaskiya: `open-sse/config/contextEditing.ts` (strategy ids, shigar da jiki, fitar da telemetry), `open-sse/executors/base.ts` (ƙofar shigarwa + fallback na 400), da `open-sse/services/compression/types.ts` (tsarin config + ƙimar tsoho).

## Abin da `clear_tool_uses` yake yi

OmniRoute yana shigar da gyara guda ɗaya cikin jikin Anthropic Messages mai fita:

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

- `type: "clear_tool_uses_20250919"` — strategy id mai ɗauke da kwanan wata na Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — da zarar input tokens na buƙatar sun wuce wannan iyaka, Claude zai fara share tsofaffin nau'i-nau'in amfani-da-kayan-aiki/sakamako (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, ƙimar tsoho ta Anthropic).
- `keep.value: 3` — ana barin nau'i-nau'i N na baya-bayan nan na amfani-da-kayan-aiki/sakamako ba tare da an taɓa su ba (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Ana sanar da beta ta hanyar header na `anthropic-beta: context-management-2025-06-27`, wanda OmniRoute ya riga ya aika a buƙatun Claude.

`applyContextEditingToBody()` ne yake aiwatar da shigarwar kuma tana da **idempotent**: idan gyaran `clear_tool_uses` ya riga ya kasance a jikin (wanda kira na baya ya ƙara ko client ya bayar), ana barin jikin yadda yake. Idan gyaran `clear_thinking_20251015` ma yana nan, OmniRoute yana yin stable-sort don kawo gyaran `clear_thinking` gaba, saboda Anthropic yana buƙatar `clear_thinking` ya zo kafin `clear_tool_uses` a cikin array na `edits[]`.

## Maɓallin kunnawa na kowane combo

Context Editing yana **a kashe ta tsohuwa** kuma sai an zaɓi kunna shi. Maɓallin boolean guda ɗaya ne da ke cikin config na matsawa:

- Maɓallin saiti: `contextEditing.enabled` (camelCase — **ba** `context_editing` / `context-editing` ba).
- Nau'i: `ContextEditingConfig { enabled: boolean }` a cikin `open-sse/services/compression/types.ts`.
- Ƙimar tsoho: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod schema: `contextEditingConfigSchema` a cikin `src/shared/validation/compressionConfigSchemas.ts`.
- Ma'ajiya: ana adana shi tare da sauran saitunan matsawa (ana daidaita shi a cikin `src/lib/db/compression.ts`).

A dashboard, maɓallin yana cikin cibiyar matsawa (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) kuma yana mayar da `{ contextEditing: { enabled: … } }` ta hanyar `saveSettings()`. Saboda yana tafiya a cikin compression-settings object, yana haɗuwa da compression profile na kowane combo maimakon zama sashe mai zaman kansa gaba ɗaya — config ɗin yana ɗauke da alamar kunnawa/kashewa kawai; dukkan iyakoki (`trigger`, `keep`) su ne constants da aka bayyana a sama.

## Ƙuntatawa ga Claude kawai

Saka bayanan yana faruwa ne kawai ga ingantaccen Claude ko relays masu dacewa da Claude-Code. Ƙofar da ke cikin
`open-sse/executors/base.ts` ita ce:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — ainihin maɓallin Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — relays waɗanda id ɗin provider ɗinsu ya fara da
  prefix ɗin `anthropic-compatible-cc-` (suna bayyana dacewa da Claude Code, don haka su ne relays
  da suka fi yiwuwar karɓar beta ɗin). Duba `open-sse/services/provider.ts`.

Waɗanda aka **cire da gangan**:

- `claude-web` — relay na burauza mai tsarin buƙata na `create_conversation_params` wanda ba ya taɓa ganin
  `context_management`.
- Relays na gama-gari na `anthropic-compatible-*` (waɗanda ba su da prefix ɗin `-cc-`) — endpoints na
  wasu kamfanoni waɗanda ba a tabbatar da goyon bayan beta ɗinsu ba.

Providers waɗanda ba Claude ba ba sa taɓa karɓar sigar `context_management`, ko da an kunna toggle ɗin.

## Fallback na 400 / ɗaukar relays

Relay mai dacewa da Claude na iya bayyana goyon bayan beta amma har yanzu ya ƙi sigar `context_management`
da HTTP 400. Don rage matsalar cikin sauƙi maimakon buƙatar ta gaza, executor ɗin yana cire
sigar sannan ya sake gwada URL ɗin nan take **sau ɗaya**:

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

Halayya:

1. Yana aiki ne kawai a kan `400` yayin da aka kunna gyaran mahallin kuma body ɗin a zahiri yana ɗauke da
   `context_management`.
2. Ana karanta body na 400 ta hanyar `clone()` domin a bar asalin response ɗin yadda yake don hanyar da
   ba ta dace da sharadin ba.
3. Dole ne rubutun kuskuren ya dace da `/context[_-]management|context editing/i` — 400 da ba shi da alaƙa (misali
   `max_tokens must be >= 1`) **ba ya** kunna fallback ɗin; asalin kuskuren ne zai ci gaba.
4. Idan ya dace, yana saita `contextEditingDisabled = true` (wanda ke hana sake saka bayanan idan daga baya
   aka gina sabon `transformedBody` don URL na sake gwadawa/fallback), yana goge `context_management`,
   yana sake sanya hannu a body ɗin don Claude / relays masu dacewa da Claude-Code (`signRequestBody`), sannan ya sake gwada
   URL ɗin nan take sau ɗaya.

Ingantaccen Claude yana ɗauke da beta ɗin a cikin `ANTHROPIC_BETA_BASE` kuma ba ya shiga wannan hanyar fallback.

## Telemetry na `applied_edits`

Bayan response na Claude, OmniRoute yana rikodin adadin mahallin da provider ɗin ya share a zahiri. Wannan
**ba a stream ɗinsa** — ana ciro shi ne daga body na response da ba na streaming ba, bisa ƙoƙarin da ya fi dacewa, kuma ba ya taɓa
shafar response ɗin (ana danne gazawar telemetry).

- Ciro bayanai: `extractContextEditingTelemetry(responseBody)` a cikin `open-sse/config/contextEditing.ts`.
  Yana bincika `applied_edits` a wurare uku (a matsayin kariya daga bambancin tsarin response):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Filayen kowane gyara da ake karantawa daga kowace shigarwa: `cleared_input_tokens` da `cleared_tool_uses`
  (snake_case, tsarin asali na Anthropic), tare da madadin camelCase na `clearedInputTokens` / `clearedToolUses`.
- Yana mayar da `null` idan ba a sami array na `applied_edits` ba ko kuma babu wani abu da aka share a zahiri.

Tsarin receipt ɗin shi ne `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Ana yin rikodin a cikin `open-sse/handlers/chatCore.ts` (an taƙaita shi ga `provider === "claude"`) ta hanyar
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), wanda ke rubuta layin nazarin compression
mai waɗannan tags:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = adadin input-token da aka share
- `request_id` wanda aka ƙara masa `::context-editing` a ƙarshe

Don haka, share bayanai da aka wakilta yana bayyana a cikin nazarin compression tare da engines na cikin gida, ƙarƙashin
lakabin engine na `context-editing`, kuma ana iya bambanta shi da tanadin RTK/Caveman/LLMLingua.

## Alaƙa da injinan matsewa na gida

| Bangare               | Injinan gida (Caveman / RTK / LLMLingua / stacked)       | Delegated Context Editing                                     |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| Inda yake aiki        | A cikin OmniRoute, kafin buƙatar ta bar proxy            | A wurin mai samarwa (Claude), a ɓangaren uwar garke           |
| Abin da yake gyarawa  | Prompt / mahallin bayanai / rubutun sakamakon kayan aiki | Tsofaffin tubalan amfani da kayan aiki / sakamakon kayan aiki |
| Iyakokin mai samarwa  | Duk masu samarwa                                         | `claude` + `anthropic-compatible-cc-*` kawai                  |
| Sauya kunnawa/kashewa | Saitunan yanayin matsewa                                 | `contextEditing.enabled`                                      |
| Yanayin gazawa        | Ci gaba idan an gaza (rubutun asali)                     | Komawa kan kuskuren 400: cire paramita, sake gwadawa sau ɗaya |
| Bayanan auna tanadi   | `engine: <engine id>`                                    | `engine: "context-editing"`                                   |

Su biyun suna taimakon juna: injinan gida suna matse bytes ɗin da OmniRoute ke aikawa; Context Editing yana ba
Claude damar rage mahallin bayanai mai gudana a tsakanin zagayen tattaunawa. Ana iya kunna su tare.

## Duba Kuma

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — rajistar injuna da injinan matsewa
  na gida
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — matse fitowar umarni/kayan aiki
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — matse bayanin MCP da
  rage yawan kayan aiki
- Tushe: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
