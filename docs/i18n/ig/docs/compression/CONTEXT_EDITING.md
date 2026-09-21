# Delegated Context Editing (Anthropic) (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Ndezi Context** e nyefere bụ njirimara njikwa context nke naanị Claude. N'adịghị ka engine mkpakọ mpaghara nke OmniRoute
(Caveman, RTK, LLMLingua, stacked pipelines) — ndị na-edegharị request body
_tupu_ ọ pụọ na proxy — Ndezi Context na-arịọ **provider** ka ọ kpochapụ block ochie
nke tool-use / tool-result na context window ya na-aga n'ihu. OmniRoute na-etinye naanị parameter
n'ime body (`context_management.edits[]`); Claude na-eji tokenizer nke ya eme mkpochapụ ahụ n'ezie.

Nke a bụ ikike e nyefere site n'ọdịdị ya: provider ndị ọzọ na-ajụ parameter ahụ, ya mere OmniRoute na-amachi
ya kpamkpam na Claude na relay ndị kwekọrọ na Claude-Code.

Isi mmalite nke eziokwu: `open-sse/config/contextEditing.ts` (strategy ids, ntinye n'ime body, iwepụta telemetry),
`open-sse/executors/base.ts` (ọnụ ụzọ ntinye + nlọghachi ndabere 400), na
`open-sse/services/compression/types.ts` (ọdịdị config + ndabara).

## Ihe `clear_tool_uses` na-eme

OmniRoute na-etinye otu edit n'ime Anthropic Messages body a na-ezipụ:

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

- `type: "clear_tool_uses_20250919"` — strategy id Anthropic nwere ụbọchị (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — ozugbo input token nke request gafere oke a, Claude na-amalite
  ikpochapụ ụzọ abụọ tool-use/result ochie (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, ndabara Anthropic).
- `keep.value: 3` — a na-ahapụ ụzọ abụọ tool-use/result N kacha ọhụrụ ka a ghara imetụ ha aka
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

A na-akpọsa beta ahụ site na header `anthropic-beta: context-management-2025-06-27`, nke
OmniRoute na-ezipụlarị na request Claude.

`applyContextEditingToBody()` na-eme ntinye ahụ, ọ bụkwa **idempotent**: ọ bụrụ na edit `clear_tool_uses`
adịlarị na body (nke oku gara aga tinyere ma ọ bụ nke client nyere), a na-ahapụ body ahụ
otu ọ dị. Ọ bụrụ na edit `clear_thinking_20251015` dịkwa, OmniRoute na-eme stable-sort ka
edit `clear_thinking` bịa n'ihu, n'ihi na Anthropic chọrọ ka `clear_thinking` buru ụzọ bịa tupu
`clear_tool_uses` n'ime array `edits[]`.

## Toggle nkwado maka combo ọ bụla

Ndezi Context **agbanyụghị na ndabara**, a ga-ahọrọ ịgbanye ya. Toggle ahụ bụ otu boolean dị n'ime
compression config:

- Igodo ntọala: `contextEditing.enabled` (camelCase — **ọ bụghị** `context_editing` / `context-editing`).
- Ụdị: `ContextEditingConfig { enabled: boolean }` n'ime
  `open-sse/services/compression/types.ts`.
- Ndabara: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod schema: `contextEditingConfigSchema` n'ime `src/shared/validation/compressionConfigSchemas.ts`.
- Nchekwa: a na-echekwa ya na ntọala mkpakọ ndị ọzọ (a na-eme ka ọ bụrụ otu ụkpụrụ n'ime
  `src/lib/db/compression.ts`).

Na dashboard, toggle ahụ dị n'ime compression hub
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ma na-edeghachi
`{ contextEditing: { enabled: … } }` site na `saveSettings()`. Ebe ọ bụ na ọ na-esochi
compression-settings object, ọ na-arụkọ ọrụ na profaịlụ mkpakọ nke combo ọ bụla kama ịbụ
interface nọọrọ onwe ya kpamkpam — config ahụ na-ebu naanị flag mgbanye/mgbanyụ; oke niile (`trigger`,
`keep`) bụ constants ndị akọwara n'elu.

## Mgbochi naanị maka Claude

Ntinye na-eme naanị maka Claude n’ezie ma ọ bụ relay ndị kwekọrọ na Claude Code. Ọnụ ụzọ dị na
`open-sse/executors/base.ts` bụ:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — igodo/OAuth Anthropic n’ezie.
- `isClaudeCodeCompatible(this.provider)` — relay ndị id provider ha na-amalite na prefix
  `anthropic-compatible-cc-` (ha na-egosi na ha kwekọrọ na Claude Code, ya mere ha bụ relay ndị
  o yikarịrị ka ha ga-anabata beta ahụ). Lee `open-sse/services/provider.ts`.

Ndị e **wepụrụ ụma**:

- `claude-web` — relay ihe nchọgharị nwere ọdịdị arịrịọ `create_conversation_params` nke na-adịghị
  ahụ `context_management` ma ọlị.
- Relay `anthropic-compatible-*` izugbe (ndị na-enweghị prefix `-cc-`) — endpoint ndị ọzọ nke
  nkwado beta ha edoghị anya.

Provider ndị na-abụghị Claude anaghị enweta parameter `context_management` ọbụlagodi mgbe agbanwuru toggle ahụ.

## Fallback 400 / mkpuchi relay

Relay kwekọrọ na Claude nwere ike igosi na ọ na-akwado beta ahụ mana ka jụ parameter `context_management`
site na HTTP 400. Iji belata nsogbu ahụ nke ọma kama ime ka arịrịọ ahụ daa, executor na-ewepụ
parameter ahụ ma nwaa otu URL ahụ ọzọ **otu ugboro**:

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

Omume:

1. Ọ na-arụ ọrụ naanị na `400` mgbe enyere context editing ikike ma body ahụ bu n’ezie
   `context_management`.
2. A na-agụ body nke 400 site na `clone()` ka response mbụ wee nọgide dịka ọ dị maka ụzọ
   na-adabaghị.
3. Ederede njehie ahụ ga-adabarịrị `/context[_-]management|context editing/i` — 400 na-enweghị njikọ (dịka
   `max_tokens must be >= 1`) **anaghị** akpalite fallback ahụ; njehie mbụ ahụ na-aga n’ihu.
4. Mgbe ọ dabara, ọ na-edobe `contextEditingDisabled = true` (nke na-egbochi ntinye ọzọ ma ọ bụrụ na e
   mechaa wuo `transformedBody` ọhụrụ maka URL retry/fallback), na-ehichapụ `context_management`,
   na-abịanye aka ọzọ na body ahụ maka Claude / relay kwekọrọ na Claude Code (`signRequestBody`), ma nwaa
   otu URL ahụ ọzọ otu ugboro.

Claude n’ezie na-ebu beta ahụ n’ime `ANTHROPIC_BETA_BASE`, ọ naghịkwa abanye n’ụzọ fallback a.

## Telemetry `applied_edits`

Mgbe response Claude gasịrị, OmniRoute na-edekọ oke context provider ahụ kpochapụrụ n’ezie. Nke a
**anaghị** aga site na stream — a na-ewepụta ya site na body response na-abụghị streaming dịka ike siri dị, ọ naghịkwa
emetụta response ahụ ma ọlị (a na-eleghara ọdịda telemetry anya).

- Nwepụta: `extractContextEditingTelemetry(responseBody)` dị na `open-sse/config/contextEditing.ts`.
  Ọ na-enyocha `applied_edits` n’ebe atọ (iji kpachara anya maka ọdịdị response):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Field nke edit ọ bụla a na-agụ na entry ọ bụla: `cleared_input_tokens` na `cleared_tool_uses`
  (snake_case, nke Anthropic ji n’onwe ya), yana fallback camelCase `clearedInputTokens` / `clearedToolUses`.
- Ọ na-eweghachi `null` mgbe ahụghị array `applied_edits` ọ bụla ma ọ bụ mgbe ọ nweghị ihe e kpochapụrụ n’ezie.

Ọdịdị nnata ahụ bụ `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Ndekọ ahụ na-eme na `open-sse/handlers/chatCore.ts` (e ji `provider === "claude"` gbochie ya) site na
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), nke na-ede row analytics mkpakọ
nwere akara:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = ọnụọgụ input-token e kpochapụrụ
- `request_id` nwere mgbakwunye `::context-editing`

Ya mere, mkpochapụ e nyefere provider na-apụta na analytics mkpakọ n’akụkụ engine mpaghara, n’okpuru
label engine `context-editing`, a pụkwara ịmata ọdịiche ya na nchekwa RTK/Caveman/LLMLingua.

## Mmekọrịta ya na injin mkpakọ nke mpaghara

| Akụkụ                       | Injin mpaghara (Caveman / RTK / LLMLingua / stacked) | Ndezigharị Ọdịnaya E Nyefere N'aka Onye Na-enye Ọrụ |
| --------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| Ebe ọ na-arụ ọrụ            | N'ime OmniRoute, tupu arịrịọ ahụ apụ na proxy        | N'ime onye na-enye ọrụ (Claude), n'akụkụ sava       |
| Ihe ọ na-edezi              | Ederede prompt / context / nsonaazụ tool             | Blọk ochie nke ojiji tool / nsonaazụ tool           |
| Oke ndị na-enye ọrụ         | Ndị na-enye ọrụ niile                                | Naanị `claude` + `anthropic-compatible-cc-*`        |
| Ihe mgbanyụ/mgbanye         | Ntọala ọnọdụ mkpakọ                                  | `contextEditing.enabled`                            |
| Ọnọdụ ọdịda                 | Ọ bụrụ na ọ daa, ọ na-eji ederede mbụ                | Nlaghachi 400: wepụ paramita, nwaa ọzọ otu ugboro   |
| Telemetry nke ego echekwara | `engine: <engine id>`                                | `engine: "context-editing"`                         |

Ha abụọ na-akwado ibe ha: injin mpaghara na-akpakọ baitị ndị OmniRoute na-eziga; Ndezigharị Ọdịnaya na-enye
Claude ohere iwepụ akụkụ ndị na-adịghịzi mkpa na ọdịnaya na-aga n'ihu n'ofe ntụgharị mkparịta ụka. Enwere ike ime ka ha abụọ rụọ ọrụ ọnụ.

## Hụkwa

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ndekọ injin na injin mkpakọ nke
  mpaghara
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — mkpakọ iwu/nsonaazụ-tool
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — mkpakọ nkọwa MCP na
  mbelata ọnụọgụ tool
- Isi mmalite: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
