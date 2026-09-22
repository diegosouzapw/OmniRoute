# Delegated Context Editing (Anthropic) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegert **kontekstredigering** er en konteksthåndteringsfunksjon som kun er tilgjengelig for Claude. I motsetning til OmniRoutes lokale
komprimeringsmotorer (Caveman, RTK, LLMLingua, stablede pipelines) — som omskriver forespørselskroppen
_før_ den forlater proxyen — ber kontekstredigering **leverandøren** om å fjerne utdaterte
verktøybruk-/verktøyresultatblokker fra sitt eget aktive kontekstvindu. OmniRoute legger bare til en
parameter i kroppen (`context_management.edits[]`); Claude utfører selve ryddingen basert på sin egen tokenizer.

Autoriseringen er delegert i sin natur: Andre leverandører avviser parameteren, så OmniRoute begrenser
den strengt til Claude og Claude Code-kompatible reléer.

Autoritativ kilde: `open-sse/config/contextEditing.ts` (strategi-ID-er, injisering i kropp, uthenting av
telemetri), `open-sse/executors/base.ts` (injiseringsport + reservehåndtering ved 400-feil) og
`open-sse/services/compression/types.ts` (konfigurasjonsstruktur + standardverdi).

## Hva `clear_tool_uses` gjør

OmniRoute injiserer én enkelt redigering i den utgående Anthropic Messages-kroppen:

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

- `type: "clear_tool_uses_20250919"` — den datofestede Anthropic-strategi-ID-en (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — når forespørselens inndata-tokener overskrider denne terskelen, begynner Claude
  å fjerne gamle par med verktøybruk/resultater (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropics standardverdi).
- `keep.value: 3` — de N nyeste parene med verktøybruk/resultater beholdes urørt
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Betaversjonen annonseres via headeren `anthropic-beta: context-management-2025-06-27`, som
OmniRoute allerede sender med Claude-forespørsler.

Injisering utføres av `applyContextEditingToBody()` og er **idempotent**: Hvis en `clear_tool_uses`-
redigering allerede finnes i kroppen (lagt til av et tidligere kall eller angitt av klienten), forblir kroppen
uendret. Hvis en `clear_thinking_20251015`-redigering også finnes, utfører OmniRoute en stabil sortering som flytter
`clear_thinking`-redigeringen først, fordi Anthropic krever at `clear_thinking` kommer før
`clear_tool_uses` i `edits[]`-matrisen.

## Aktiveringsbryteren per kombinasjon

Kontekstredigering er **av som standard** og må velges aktivt. Bryteren er én enkelt boolsk verdi i
komprimeringskonfigurasjonen:

- Innstillingsnøkkel: `contextEditing.enabled` (camelCase — **ikke** `context_editing` / `context-editing`).
- Type: `ContextEditingConfig { enabled: boolean }` i
  `open-sse/services/compression/types.ts`.
- Standardverdi: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-skjema: `contextEditingConfigSchema` i `src/shared/validation/compressionConfigSchemas.ts`.
- Lagring: Bevares sammen med resten av komprimeringsinnstillingene (normalisert i
  `src/lib/db/compression.ts`).

I kontrollpanelet finnes bryteren i komprimeringssenteret
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) og skriver
`{ contextEditing: { enabled: … } }` tilbake via `saveSettings()`. Fordi den inngår i
komprimeringsinnstillingsobjektet, kombineres den med komprimeringsprofilen per kombinasjon i stedet for å være en
helt uavhengig innstilling — konfigurasjonen inneholder bare av/på-flagget; alle terskler (`trigger`,
`keep`) er konstantene som er dokumentert ovenfor.

## Avgrensning kun for Claude

Injisering skjer bare for ekte Claude eller Claude-Code-kompatible reléer. Kontrollbetingelsen i
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

- `this.provider === "claude"` — ekte Anthropic-nøkkel/OAuth.
- `isClaudeCodeCompatible(this.provider)` — reléer der leverandør-ID-en starter med prefikset
  `anthropic-compatible-cc-` (de oppgir kompatibilitet med Claude Code, så det er disse reléene som
  mest sannsynlig godtar betaversjonen). Se `open-sse/services/provider.ts`.

Bevisst **utelatt**:

- `claude-web` — et nettleserrelé med et `create_conversation_params`-forespørselsformat som aldri
  ser `context_management`.
- Generiske `anthropic-compatible-*`-reléer (uten prefikset `-cc-`) — tredjepartsendepunkter med
  usikker støtte for betaversjonen.

Leverandører som ikke er Claude, mottar aldri parameteren `context_management`, selv når bryteren er
slått på.

## 400-reserveløsningen / relédekning

Et Claude-kompatibelt relé kan oppgi støtte for betaversjonen, men likevel avvise parameteren
`context_management` med HTTP 400. For å redusere funksjonaliteten på en kontrollert måte i stedet
for å la forespørselen mislykkes, fjerner eksekveringskomponenten parameteren og prøver den samme
URL-en på nytt **én gang**:

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

Atferd:

1. Utløses bare ved en `400` når kontekstredigering er aktivert og innholdet faktisk inneholder
   `context_management`.
2. 400-innholdet leses via en `clone()`, slik at det opprinnelige svaret forblir intakt for banen
   uten treff.
3. Feilteksten må samsvare med `/context[_-]management|context editing/i` — en ikke-relatert 400-feil
   (f.eks. `max_tokens must be >= 1`) utløser **ikke** reserveløsningen; den opprinnelige feilen
   videreformidles.
4. Ved treff settes `contextEditingDisabled = true` (noe som hindrer ny injisering hvis et nytt
   `transformedBody` senere bygges for en ny forsøks-/reserve-URL), `context_management` slettes,
   innholdet signeres på nytt for Claude / Claude-Code-kompatible reléer (`signRequestBody`), og den
   samme URL-en prøves på nytt én gang.

Ekte Claude har betaversjonen i `ANTHROPIC_BETA_BASE` og bruker ikke denne reserveløsningen.

## `applied_edits`-telemetri

Etter et Claude-svar registrerer OmniRoute hvor mye kontekst leverandøren faktisk fjernet. Dette
strømmes **ikke** — det trekkes etter beste evne ut fra det ikke-strømmede svarinnholdet og påvirker
aldri svaret (telemetrif feil ignoreres).

- Uttrekking: `extractContextEditingTelemetry(responseBody)` i `open-sse/config/contextEditing.ts`.
  Den ser etter `applied_edits` på tre steder (defensivt med tanke på svarformatet):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Felter som leses fra hver oppføring: `cleared_input_tokens` og `cleared_tool_uses`
  (snake_case, opprinnelig Anthropic-format), med camelCase-reservene `clearedInputTokens` /
  `clearedToolUses`.
- Returnerer `null` når ingen `applied_edits`-matrise finnes, eller når ingenting faktisk ble
  fjernet.

Kvitteringsformatet er `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Registreringen skjer i `open-sse/handlers/chatCore.ts` (begrenset til `provider === "claude"`) via
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), som skriver en rad med
komprimeringsanalyse merket med:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = antallet fjernede inndata-tokener
- `request_id` med suffikset `::context-editing`

Dermed vises delegert fjerning i komprimeringsanalysen sammen med de lokale motorene, under
motoretiketten `context-editing`, og kan skilles fra besparelser fra RTK/Caveman/LLMLingua.

## Forholdet til de lokale komprimeringsmotorene

| Aspekt               | Lokale motorer (Caveman / RTK / LLMLingua / stablet) | Delegert kontekstredigering                             |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| Hvor den kjører      | I OmniRoute, før forespørselen forlater proxyen      | Hos leverandøren (Claude), på serversiden               |
| Hva den redigerer    | Ledetekst / kontekst / tekst fra verktøyresultater   | Eldre blokker for verktøybruk / verktøyresultater       |
| Leverandøromfang     | Alle leverandører                                    | Bare `claude` + `anthropic-compatible-cc-*`             |
| Innstilling          | Innstillinger for komprimeringsmodus                 | `contextEditing.enabled`                                |
| Feilhåndtering       | Fortsetter ved feil (opprinnelig tekst)              | 400-reserveløsning: fjern parameteren, prøv én gang til |
| Innsparingstelemetri | `engine: <engine id>`                                | `engine: "context-editing"`                             |

De to utfyller hverandre: Lokale motorer komprimerer bytene OmniRoute sender, mens kontekstredigering lar
Claude beskjære den løpende konteksten på tvers av meldingsrunder. De kan aktiveres samtidig.

## Se også

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — motorregister og de lokale komprimeringsmotorene
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komprimering av kommandoer/verktøyutdata
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — komprimering av MCP-beskrivelser og
  reduksjon av verktøykardinalitet
- Kilde: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
