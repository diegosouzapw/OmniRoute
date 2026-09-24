# Delegated Context Editing (Anthropic) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegeret **Context Editing** er en Claude-specifik funktion til konteksthåndtering. I modsætning til OmniRoutes lokale
komprimeringsmotorer (Caveman, RTK, LLMLingua, stablede pipelines) — som omskriver request-bodyen,
_før_ den forlader proxyen — beder Context Editing **udbyderen** om at rydde forældede
tool-use-/tool-result-blokke fra sit eget aktive kontekstvindue. OmniRoute tilføjer kun en body-
parameter (`context_management.edits[]`); Claude udfører selve rydningen ud fra sin egen tokenizer.

Dette er i sagens natur en delegeret funktion: Andre udbydere afviser parameteren, så OmniRoute begrænser
den strengt til Claude og Claude-Code-kompatible relæer.

Autoritativ kilde: `open-sse/config/contextEditing.ts` (strategi-id'er, body-injektion, udtræk af telemetri),
`open-sse/executors/base.ts` (injektionskontrol + 400-fallback) og
`open-sse/services/compression/types.ts` (konfigurationsstruktur + standardværdi).

## Hvad `clear_tool_uses` gør

OmniRoute injicerer en enkelt redigering i den udgående Anthropic Messages-body:

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

- `type: "clear_tool_uses_20250919"` — det datomærkede Anthropic-strategi-id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — når requestens inputtokens overstiger denne tærskel, begynder Claude at
  rydde gamle tool-use-/resultatpar (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropics standardværdi).
- `keep.value: 3` — de N seneste tool-use-/resultatpar bevares uændrede
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Betaversionen annonceres via headeren `anthropic-beta: context-management-2025-06-27`, som
OmniRoute allerede udsender ved Claude-requests.

Injektionen udføres af `applyContextEditingToBody()` og er **idempotent**: Hvis en `clear_tool_uses`-
redigering allerede findes i bodyen (tilføjet af et tidligere kald eller leveret af klienten), forbliver bodyen
uændret. Hvis der også findes en `clear_thinking_20251015`-redigering, foretager OmniRoute en stabil sortering,
så `clear_thinking`-redigeringen placeres først, fordi Anthropic kræver, at `clear_thinking` står før
`clear_tool_uses` i `edits[]`-arrayet.

## Aktivering pr. kombination

Context Editing er **deaktiveret som standard** og skal tilvælges. Indstillingen er en enkelt boolesk værdi i
komprimeringskonfigurationen:

- Indstillingsnøgle: `contextEditing.enabled` (camelCase — **ikke** `context_editing` / `context-editing`).
- Type: `ContextEditingConfig { enabled: boolean }` i
  `open-sse/services/compression/types.ts`.
- Standardværdi: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-skema: `contextEditingConfigSchema` i `src/shared/validation/compressionConfigSchemas.ts`.
- Lagring: gemmes sammen med resten af komprimeringsindstillingerne (normaliseres i
  `src/lib/db/compression.ts`).

I kontrolpanelet findes indstillingen i komprimeringshubben
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) og skriver
`{ contextEditing: { enabled: … } }` tilbage via `saveSettings()`. Da den ligger i objektet med
komprimeringsindstillinger, kombineres den med komprimeringsprofilen for den enkelte kombination frem for at være en
helt uafhængig indstilling — konfigurationen indeholder kun til/fra-flaget; alle tærskler (`trigger`,
`keep`) er de konstanter, der er dokumenteret ovenfor.

## Gating kun for Claude

Injektion sker kun for ægte Claude eller Claude-Code-kompatible relæer. Gaten i
`open-sse/executors/base.ts` er:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — ægte Anthropic-nøgle/OAuth.
- `isClaudeCodeCompatible(this.provider)` — relæer, hvis provider-id starter med præfikset
  `anthropic-compatible-cc-` (de annoncerer Claude Code-kompatibilitet, så det er de relæer, der med
  størst sandsynlighed accepterer betaen). Se `open-sse/services/provider.ts`.

Bevidst **udelukket**:

- `claude-web` — et browserrelæ med en `create_conversation_params`-anmodningsstruktur, der aldrig
  ser `context_management`.
- Generiske `anthropic-compatible-*`-relæer (uden præfikset `-cc-`) — tredjepartsendpoints med
  usikker understøttelse af betaen.

Andre providere end Claude modtager aldrig parameteren `context_management`, heller ikke når
indstillingen er slået til.

## 400-fallback / relædækning

Et Claude-kompatibelt relæ kan annoncere betaen, men stadig afvise parameteren `context_management`
med en HTTP 400. For at nedgradere elegant i stedet for at lade anmodningen fejle fjerner eksekveringen
parameteren og prøver den samme URL igen **én gang**:

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

Adfærd:

1. Udløses kun ved en `400`, mens kontekstredigering er aktiveret, og body'en faktisk indeholder
   `context_management`.
2. 400-body'en læses via en `clone()`, så det oprindelige svar forbliver intakt for den sti, der ikke
   matcher.
3. Fejlteksten skal matche `/context[_-]management|context editing/i` — en ikke-relateret 400 (f.eks.
   `max_tokens must be >= 1`) udløser **ikke** fallbacken; den oprindelige fejl sendes videre.
4. Ved et match sættes `contextEditingDisabled = true` (hvilket forhindrer geninjektion, hvis en ny
   `transformedBody` senere oprettes til en URL for genforsøg/fallback), `context_management` slettes,
   body'en signeres igen for Claude / Claude-Code-kompatible relæer (`signRequestBody`), og den samme
   URL forsøges igen én gang.

Ægte Claude inkluderer betaen i `ANTHROPIC_BETA_BASE` og rammer ikke denne fallbacksti.

## `applied_edits`-telemetri

Efter et Claude-svar registrerer OmniRoute, hvor meget kontekst provideren faktisk ryddede. Dette
**streames ikke** — det udtrækkes efter bedste evne fra body'en i det ikke-streamede svar og påvirker
aldrig svaret (telemetrifelter ignoreres).

- Udtrækning: `extractContextEditingTelemetry(responseBody)` i `open-sse/config/contextEditing.ts`.
  Den søger efter `applied_edits` på tre placeringer (defensivt på tværs af svarstrukturen):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Felter pr. redigering, der læses fra hver post: `cleared_input_tokens` og `cleared_tool_uses`
  (snake_case, Anthropic-native), med `clearedInputTokens` / `clearedToolUses` camelCase som fallback.
- Returnerer `null`, når der ikke findes noget `applied_edits`-array, eller når intet faktisk blev
  ryddet.

Kvitteringsstrukturen er `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Registreringen sker i `open-sse/handlers/chatCore.ts` (begrænset til `provider === "claude"`) via
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), som skriver en række med
komprimeringsanalyse tagget med:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = antallet af ryddede inputtokens
- `request_id` med suffikset `::context-editing`

Dermed vises delegeret rydning i komprimeringsanalysen sammen med de lokale motorer under
motoretiketten `context-editing`, og den kan skelnes fra besparelser fra RTK/Caveman/LLMLingua.

## Forholdet til de lokale komprimeringsmotorer

| Aspekt                    | Lokale motorer (Caveman / RTK / LLMLingua / stablet) | Delegeret kontekstredigering                             |
| ------------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| Hvor det kører            | I OmniRoute, før anmodningen forlader proxyen        | Hos udbyderen (Claude), på serversiden                   |
| Hvad det redigerer        | Prompt-/kontekst-/værktøjsresultattekst              | Gamle værktøjsbrugs-/værktøjsresultatblokke              |
| Udbyderdækning            | Alle udbydere                                        | Kun `claude` + `anthropic-compatible-cc-*`               |
| Indstilling               | Indstillinger for komprimeringstilstand              | `contextEditing.enabled`                                 |
| Fejltilstand              | Fortsæt ved fejl (oprindelig tekst)                  | 400-reserveløsning: fjern parameteren, prøv igen én gang |
| Telemetri for besparelser | `engine: <engine id>`                                | `engine: "context-editing"`                              |

De to supplerer hinanden: Lokale motorer komprimerer de bytes, som OmniRoute sender; kontekstredigering gør det muligt for
Claude at beskære den løbende kontekst på tværs af samtalerunder. De kan aktiveres samtidigt.

## Se også

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — motorregister og de lokale komprimeringsmotorer
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komprimering af kommando-/værktøjsoutput
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — komprimering af MCP-beskrivelser og
  reduktion af antallet af værktøjer
- Kilde: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
