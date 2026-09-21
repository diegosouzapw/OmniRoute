# Delegated Context Editing (Anthropic) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Ang Delegated **Context Editing** ay isang feature sa pamamahala ng context na para lamang sa Claude. Hindi tulad ng mga lokal na
compression engine ng OmniRoute (Caveman, RTK, LLMLingua, mga stacked pipeline) — na muling isinusulat ang request body
_bago_ ito umalis sa proxy — hinihiling ng Context Editing sa **provider** na alisin ang mga lipas na
tool-use / tool-result block mula sa sarili nitong aktibong context window. Naglalakip lamang ang OmniRoute ng body
parameter (`context_management.edits[]`); si Claude ang aktuwal na nagsasagawa ng pag-aalis batay sa sarili nitong tokenizer.

Likas itong isang delegated capability: tinatanggihan ng ibang mga provider ang parameter, kaya mahigpit itong
nililimitahan ng OmniRoute sa Claude at sa mga relay na compatible sa Claude Code.

Pinagmumulan ng katotohanan: `open-sse/config/contextEditing.ts` (mga strategy id, body injection, telemetry
extraction), `open-sse/executors/base.ts` (injection gate + 400-fallback), at
`open-sse/services/compression/types.ts` (anyo ng config + default).

## Ano ang ginagawa ng `clear_tool_uses`

Nag-i-inject ang OmniRoute ng iisang edit sa papalabas na Anthropic Messages body:

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

- `type: "clear_tool_uses_20250919"` — ang may petsang Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — kapag lumampas sa threshold na ito ang mga input token ng request, magsisimula si Claude na
  alisin ang mga lumang pares ng tool-use/result (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, ang default ng Anthropic).
- `keep.value: 3` — hindi gagalawin ang N pinakabagong pares ng tool-use/result
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Ipinahahayag ang beta sa pamamagitan ng `anthropic-beta: context-management-2025-06-27` header, na
ipinapadala na ng OmniRoute sa mga request kay Claude.

Isinasagawa ang injection ng `applyContextEditingToBody()` at ito ay **idempotent**: kung mayroon nang `clear_tool_uses`
edit sa body (idinagdag ng nakaraang call o ibinigay ng client), hindi na babaguhin ang body. Kung mayroon ding
`clear_thinking_20251015` edit, nagsasagawa ang OmniRoute ng stable sort upang ilagay ang
`clear_thinking` edit sa unahan, dahil iniaatas ng Anthropic na mauna ang `clear_thinking` sa
`clear_tool_uses` sa `edits[]` array.

## Ang per-combo enable toggle

Ang Context Editing ay **naka-off bilang default** at kailangang kusang i-enable. Ang toggle ay isang boolean na nasa
compression config:

- Setting key: `contextEditing.enabled` (camelCase — **hindi** `context_editing` / `context-editing`).
- Uri: `ContextEditingConfig { enabled: boolean }` sa
  `open-sse/services/compression/types.ts`.
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod schema: `contextEditingConfigSchema` sa `src/shared/validation/compressionConfigSchemas.ts`.
- Storage: pinapanatili kasama ng iba pang compression setting (ino-normalize sa
  `src/lib/db/compression.ts`).

Sa dashboard, makikita ang toggle sa compression hub
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) at isinusulat nito ang
`{ contextEditing: { enabled: … } }` pabalik sa pamamagitan ng `saveSettings()`. Dahil bahagi ito ng
compression-settings object, gumagana ito kasama ng per-combo compression profile sa halip na maging isang
ganap na hiwalay na interface — ang config ay naglalaman lamang ng on/off flag; ang lahat ng threshold (`trigger`,
`keep`) ay ang mga constant na nakadokumento sa itaas.

## Gating para lamang sa Claude

Nangyayari lamang ang injection para sa tunay na Claude o mga relay na compatible sa Claude Code. Ang gate sa
`open-sse/executors/base.ts` ay:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — tunay na Anthropic key/OAuth.
- `isClaudeCodeCompatible(this.provider)` — mga relay na ang provider id ay nagsisimula sa
  prefix na `anthropic-compatible-cc-` (ipinapahayag nilang compatible sila sa Claude Code, kaya sila ang mga relay
  na pinakamalamang na tumanggap sa beta). Tingnan ang `open-sse/services/provider.ts`.

Sadyang **hindi kasama**:

- `claude-web` — isang browser relay na may request shape na `create_conversation_params` na hindi kailanman nakakakita ng
  `context_management`.
- Mga generic na `anthropic-compatible-*` relay (walang prefix na `-cc-`) — mga third-party endpoint na may
  hindi tiyak na suporta sa beta.

Hindi kailanman natatanggap ng mga provider na hindi Claude ang parameter na `context_management`, kahit naka-on ang toggle.

## Ang 400-fallback / saklaw ng relay

Maaaring ipahayag ng isang Claude-compatible relay na sinusuportahan nito ang beta ngunit tanggihan pa rin ang parameter na `context_management`
sa pamamagitan ng HTTP 400. Upang maayos na mag-degrade sa halip na mabigo ang request, inaalis ng executor ang
parameter at muling sinusubukan ang parehong URL nang **isang beses**:

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

Gawi:

1. Mati-trigger lamang sa isang `400` habang naka-enable ang context editing at aktuwal na naglalaman ang body ng
   `context_management`.
2. Binabasa ang 400 body sa pamamagitan ng `clone()` upang manatiling buo ang orihinal na response para sa path na
   hindi tumutugma.
3. Kailangang tumugma ang error text sa `/context[_-]management|context editing/i` — ang isang walang kaugnayang 400 (hal.
   `max_tokens must be >= 1`) ay **hindi** magti-trigger sa fallback; ipapasa ang orihinal na error.
4. Kapag may tugma, itinatakda nito ang `contextEditingDisabled = true` (na pumipigil sa muling pag-inject kung bubuo
   kalaunan ng bagong `transformedBody` para sa isang retry/fallback URL), binubura ang `context_management`,
   muling nilalagdaan ang body para sa Claude / mga relay na compatible sa Claude Code (`signRequestBody`), at muling sinusubukan ang
   parehong URL nang isang beses.

Kasama sa tunay na Claude ang beta sa `ANTHROPIC_BETA_BASE` at hindi ito dumadaan sa fallback path na ito.

## Telemetry ng `applied_edits`

Pagkatapos ng isang response mula sa Claude, itinatala ng OmniRoute kung gaano karaming context ang aktuwal na na-clear ng provider. Ito ay
**hindi** naka-stream — kinukuha ito mula sa non-streaming response body sa best-effort na paraan, at hindi kailanman
nakaaapekto sa response (hindi pinapansin ang mga pagkabigo sa telemetry).

- Extraction: `extractContextEditingTelemetry(responseBody)` sa `open-sse/config/contextEditing.ts`.
  Sinusuri nito ang `applied_edits` sa tatlong lokasyon (bilang pag-iingat sa iba’t ibang hugis ng response):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Mga field sa bawat edit na binabasa mula sa bawat entry: `cleared_input_tokens` at `cleared_tool_uses`
  (snake_case, katutubong format ng Anthropic), na may mga camelCase fallback na `clearedInputTokens` / `clearedToolUses`.
- Nagbabalik ng `null` kapag walang makitang array na `applied_edits` o walang aktuwal na na-clear.

Ang hugis ng receipt ay `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Nangyayari ang pagtatala sa `open-sse/handlers/chatCore.ts` (nililimitahan sa `provider === "claude"`) sa pamamagitan ng
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), na nagsusulat ng isang compression
analytics row na may mga tag na:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = bilang ng mga na-clear na input token
- `request_id` na may suffix na `::context-editing`

Kaya lumalabas ang ipinasa sa provider na pag-clear sa compression analytics kasama ng mga lokal na engine, sa ilalim ng
label ng engine na `context-editing`, at naihihiwalay ito sa mga natipid ng RTK/Caveman/LLMLingua.

## Ugnayan sa mga lokal na compression engine

| Aspeto                | Mga lokal na engine (Caveman / RTK / LLMLingua / stacked) | Delegated Context Editing                                      |
| --------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Saan ito tumatakbo    | Sa OmniRoute, bago umalis sa proxy ang request            | Sa provider (Claude), sa panig ng server                       |
| Ano ang ine-edit nito | Prompt / context / text ng resulta ng tool                | Mga lumang block ng paggamit ng tool / resulta ng tool         |
| Saklaw ng provider    | Lahat ng provider                                         | `claude` + `anthropic-compatible-cc-*` lamang                  |
| Toggle                | Mga setting ng compression mode                           | `contextEditing.enabled`                                       |
| Failure mode          | Fail-open (orihinal na text)                              | 400-fallback: alisin ang param, subukang muli nang isang beses |
| Telemetry ng natipid  | `engine: <engine id>`                                     | `engine: "context-editing"`                                    |

Magkatuwang ang dalawa: kino-compress ng mga lokal na engine ang mga byte na ipinapadala ng OmniRoute; binibigyang-daan ng Context Editing ang
Claude na bawasan ang kasalukuyang context sa bawat turn. Maaaring paganahin ang mga ito nang sabay.

## Tingnan Din

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registry ng engine at ang mga lokal na compression
  engine
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compression ng output ng command/tool
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compression ng paglalarawan ng MCP at
  pagbabawas ng cardinality ng tool
- Source: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
