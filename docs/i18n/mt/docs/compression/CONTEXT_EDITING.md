# Delegated Context Editing (Anthropic) (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Il-**Context Editing** delegat huwa karatteristika għall-ġestjoni tal-kuntest disponibbli biss għal Claude. B’differenza mill-magni lokali ta’ kompressjoni ta’ OmniRoute (Caveman, RTK, LLMLingua, stacked pipelines) — li jiktbu mill-ġdid il-korp tat-talba _qabel_ ma jitlaq mill-proxy — Context Editing jitlob lill-**fornitur** ineħħi blokki qodma tal-użu tal-għodod / tar-riżultati tal-għodod mit-tieqa tal-kuntest attiva tiegħu stess. OmniRoute iżid biss parametru mal-korp (`context_management.edits[]`); Claude jwettaq it-tneħħija effettiva skont it-tokenizer tiegħu stess.

Din hija kapaċità delegata min-natura tagħha: fornituri oħra jirrifjutaw il-parametru, għalhekk OmniRoute jillimitaha strettament għal Claude u għal relays kompatibbli ma’ Claude Code.

Sors definittiv: `open-sse/config/contextEditing.ts` (IDs tal-istrateġiji, injezzjoni fil-korp, estrazzjoni tat-telemetrija), `open-sse/executors/base.ts` (kontroll tal-injezzjoni + fallback għal 400), u `open-sse/services/compression/types.ts` (struttura tal-konfigurazzjoni + valur predefinit).

## X’jagħmel `clear_tool_uses`

OmniRoute jinjetta editjar wieħed fil-korp tal-Anthropic Messages li jintbagħat:

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

- `type: "clear_tool_uses_20250919"` — l-ID datat tal-istrateġija ta’ Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — ladarba t-tokens tal-input tat-talba jaqbżu dan il-limitu, Claude jibda jneħħi pari qodma ta’ użu/riżultat tal-għodod (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, il-valur predefinit ta’ Anthropic).
- `keep.value: 3` — l-N pari l-aktar reċenti ta’ użu/riżultat tal-għodod jinżammu mhux mittiefsa (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Il-beta tiġi indikata permezz tal-header `anthropic-beta: context-management-2025-06-27`, li OmniRoute diġà jibgħat mat-talbiet ta’ Claude.

L-injezzjoni titwettaq minn `applyContextEditingToBody()` u hija **idempotenti**: jekk editjar `clear_tool_uses` ikun diġà jeżisti fil-korp (miżjud minn sejħa preċedenti jew ipprovdut mill-klijent), il-korp jitħalla kif inhu. Jekk ikun preżenti wkoll editjar `clear_thinking_20251015`, OmniRoute jagħmel ordinament stabbli tal-editjar `clear_thinking` biex ipoġġih fuq quddiem, għax Anthropic jirrikjedi li `clear_thinking` jiġi qabel `clear_tool_uses` fl-array `edits[]`.

## Is-swiċċ ta’ attivazzjoni għal kull kombinazzjoni

Context Editing huwa **mitfi b’mod predefinit** u jrid jiġi attivat apposta. Is-swiċċ huwa boolean wieħed inkluż fil-konfigurazzjoni tal-kompressjoni:

- Ċavetta tas-setting: `contextEditing.enabled` (camelCase — **mhux** `context_editing` / `context-editing`).
- Tip: `ContextEditingConfig { enabled: boolean }` f’
  `open-sse/services/compression/types.ts`.
- Valur predefinit: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Skema Zod: `contextEditingConfigSchema` f’`src/shared/validation/compressionConfigSchemas.ts`.
- Ħażna: jinħażen b’mod persistenti mal-bqija tas-settings tal-kompressjoni (normalizzat f’
  `src/lib/db/compression.ts`).

Fid-dashboard, is-swiċċ jinsab fiċ-ċentru tal-kompressjoni
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) u jikteb
`{ contextEditing: { enabled: … } }` lura permezz ta’ `saveSettings()`. Peress li huwa parti mill-oġġett tas-settings tal-kompressjoni, jikkombina mal-profil tal-kompressjoni għal kull kombinazzjoni minflok ma jkun interfaċċa kompletament indipendenti — il-konfigurazzjoni ġġorr biss il-flag mixgħul/mitfi; il-limiti kollha (`trigger`, `keep`) huma l-kostanti ddokumentati hawn fuq.

## Kontroll esklussiv għal Claude

L-injezzjoni sseħħ biss għal relays ġenwini ta’ Claude jew kompatibbli ma’ Claude Code. Il-kontroll f’
`open-sse/executors/base.ts` huwa:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — ċavetta/OAuth reali ta’ Anthropic.
- `isClaudeCodeCompatible(this.provider)` — relays li l-ID tal-fornitur tagħhom jibda bil-prefiss
  `anthropic-compatible-cc-` (huma jiddikjaraw kompatibbiltà ma’ Claude Code, għalhekk huma r-relays
  l-aktar probabbli li jaċċettaw il-beta). Ara `open-sse/services/provider.ts`.

**Esklużi** apposta:

- `claude-web` — relay tal-brawżer b’format ta’ talba `create_conversation_params` li qatt ma jirċievi
  `context_management`.
- Relays ġeneriċi `anthropic-compatible-*` (mingħajr il-prefiss `-cc-`) — endpoints ta’ partijiet terzi
  b’appoġġ inċert għall-beta.

Fornituri li mhumiex Claude qatt ma jirċievu l-parametru `context_management`, anki meta l-għażla tkun attivata.

## Il-fallback għall-400 / kopertura tar-relays

Relay kompatibbli ma’ Claude jista’ jiddikjara l-beta iżda xorta jirrifjuta l-parametru `context_management`
b’HTTP 400. Sabiex is-sistema tiddegrada b’mod gradwali minflok tfalli t-talba, l-eżekutur ineħħi
l-parametru u jerġa’ jipprova l-istess URL **darba**:

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

Imġiba:

1. Jiġi attivat biss fuq `400` waqt li l-editjar tal-kuntest ikun attivat u l-body effettivament ikun fih
   `context_management`.
2. Il-body tal-400 jinqara permezz ta’ `clone()` sabiex ir-risposta oriġinali tibqa’ intatta għall-perkors
   li ma jaqbilx.
3. It-test tal-iżball irid jaqbel ma’ `/context[_-]management|context editing/i` — 400 mhux relatat (eż.
   `max_tokens must be >= 1`) **ma** jattivax il-fallback; l-iżball oriġinali jgħaddi kif inhu.
4. Meta jkun hemm qbil, jistabbilixxi `contextEditingDisabled = true` (li jipprevjeni injezzjoni mill-ġdid jekk
   aktar tard jinbena `transformedBody` ġdid għal URL ta’ tentattiv mill-ġdid/fallback), iħassar
   `context_management`, jerġa’ jiffirma l-body għal Claude / relays kompatibbli ma’ Claude Code
   (`signRequestBody`), u jerġa’ jipprova l-istess URL darba.

Claude ġenwin jinkludi l-beta f’`ANTHROPIC_BETA_BASE` u ma jgħaddix minn dan il-perkors ta’ fallback.

## Telemetrija ta’ `applied_edits`

Wara risposta ta’ Claude, OmniRoute jirreġistra kemm kuntest effettivament neħħa l-fornitur. Dan
**ma jiġix streamed** — jiġi estratt mill-body tar-risposta mhux streaming fuq bażi tal-aħjar sforz, u qatt
ma jaffettwa r-risposta (il-fallimenti tat-telemetrija jiġu injorati).

- Estrazzjoni: `extractContextEditingTelemetry(responseBody)` f’`open-sse/config/contextEditing.ts`.
  Din tivverifika `applied_edits` fi tliet postijiet (b’mod difensiv minħabba l-format tar-risposta):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Oqsma għal kull editjar li jinqraw minn kull entrata: `cleared_input_tokens` u `cleared_tool_uses`
  (snake_case, nattiv ta’ Anthropic), b’`clearedInputTokens` / `clearedToolUses` bħala alternattivi camelCase.
- Tirritorna `null` meta ma tinstab l-ebda array `applied_edits` jew meta fil-fatt ma jkun tneħħa xejn.

Il-format tal-irċevuta huwa `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Ir-reġistrazzjoni sseħħ f’`open-sse/handlers/chatCore.ts` (limitata għal `provider === "claude"`) permezz ta’
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), li tikteb ringiela ta’ analitika
tal-kompressjoni bit-tikketti:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = l-għadd ta’ tokens tal-input imneħħija
- `request_id` b’`::context-editing` miżjud fit-tarf

B’hekk, it-tneħħija delegata tidher fl-analitika tal-kompressjoni flimkien mal-engines lokali, taħt it-tikketta
tal-engine `context-editing`, u tista’ tingħaraf mill-iffrankar ta’ RTK/Caveman/LLMLingua.

## Relazzjoni mal-magni lokali tal-kompressjoni

| Aspett                       | Magni lokali (Caveman / RTK / LLMLingua / stacked)      | Editjar Delegat tal-Kuntest                               |
| ---------------------------- | ------------------------------------------------------- | --------------------------------------------------------- |
| Fejn jaħdem                  | F’OmniRoute, qabel it-talba titlaq mill-proxy           | Għand il-fornitur (Claude), fuq in-naħa tas-server        |
| X’jeditja                    | Test tal-prompt / tal-kuntest / tar-riżultat tal-għodda | Blokki qodma tal-użu tal-għodda / tar-riżultat tal-għodda |
| Ambitu tal-fornitur          | Il-fornituri kollha                                     | `claude` + `anthropic-compatible-cc-*` biss               |
| Attivazzjoni/diżattivazzjoni | Settings tal-modalità tal-kompressjoni                  | `contextEditing.enabled`                                  |
| Mod ta’ falliment            | Jibqa’ għaddej f’każ ta’ żball (it-test oriġinali)      | Fallback għal 400: neħħi l-parametru, erġa’ pprova darba  |
| Telemetrija tal-iffrankar    | `engine: <engine id>`                                   | `engine: "context-editing"`                               |

It-tnejn jikkomplementaw lil xulxin: il-magni lokali jikkompressaw il-bytes li jibgħat OmniRoute; l-Editjar tal-Kuntest jippermetti lil
Claude jnaqqas il-kuntest li jkun qed jinżamm matul l-iskambji. Jistgħu jiġu attivati flimkien.

## Ara Wkoll

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ir-reġistru tal-magni u l-magni lokali tal-kompressjoni
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — kompressjoni tal-output tal-kmandi/għodod
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — kompressjoni tad-deskrizzjoni tal-MCP u
  tnaqqis fil-kardinalità tal-għodod
- Sors: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
