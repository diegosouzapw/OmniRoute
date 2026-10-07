# Delegated Context Editing (Anthropic) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Gedelegeerde **Context Editing** is een functie voor contextbeheer die uitsluitend voor Claude beschikbaar is. In tegenstelling tot de lokale compressie-engines van OmniRoute (Caveman, RTK, LLMLingua, gestapelde pipelines) — die de requestbody herschrijven _voordat_ deze de proxy verlaat — vraagt Context Editing de **provider** om verouderde tool-use-/tool-result-blokken uit het eigen actieve contextvenster te verwijderen. OmniRoute voegt alleen een bodyparameter (`context_management.edits[]`) toe; Claude voert de daadwerkelijke verwijdering uit op basis van zijn eigen tokenizer.

Dit is van nature een gedelegeerde mogelijkheid: andere providers weigeren de parameter, waardoor OmniRoute deze strikt beperkt tot Claude en Claude-Code-compatibele relays.

Gezaghebbende bron: `open-sse/config/contextEditing.ts` (strategie-id's, body-injectie, extractie van telemetrie), `open-sse/executors/base.ts` (injectievoorwaarde + 400-fallback) en `open-sse/services/compression/types.ts` (configuratiestructuur + standaardwaarde).

## Wat `clear_tool_uses` doet

OmniRoute injecteert één bewerking in de uitgaande body voor Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — de van een datum voorziene Anthropic-strategie-id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — zodra het aantal invoertokens van de request deze drempel overschrijdt, begint Claude oude tool-use-/result-paren te verwijderen (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, de standaardwaarde van Anthropic).
- `keep.value: 3` — de N meest recente tool-use-/result-paren blijven ongewijzigd behouden (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

De bèta wordt aangekondigd via de header `anthropic-beta: context-management-2025-06-27`, die OmniRoute al bij Claude-requests meestuurt.

De injectie wordt uitgevoerd door `applyContextEditingToBody()` en is **idempotent**: als er al een `clear_tool_uses`-bewerking in de body aanwezig is (toegevoegd door een eerdere aanroep of aangeleverd door de client), blijft de body ongewijzigd. Als er ook een `clear_thinking_20251015`-bewerking aanwezig is, sorteert OmniRoute de `clear_thinking`-bewerking stabiel naar voren, omdat Anthropic vereist dat `clear_thinking` vóór `clear_tool_uses` staat in de array `edits[]`.

## De inschakeloptie per combinatie

Context Editing is **standaard uitgeschakeld** en vereist expliciete inschakeling. De optie is één booleaanse waarde in de compressieconfiguratie:

- Instellingssleutel: `contextEditing.enabled` (camelCase — **niet** `context_editing` / `context-editing`).
- Type: `ContextEditingConfig { enabled: boolean }` in `open-sse/services/compression/types.ts`.
- Standaardwaarde: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-schema: `contextEditingConfigSchema` in `src/shared/validation/compressionConfigSchemas.ts`.
- Opslag: wordt samen met de overige compressie-instellingen persistent opgeslagen (genormaliseerd in `src/lib/db/compression.ts`).

In het dashboard bevindt de optie zich in de compressiehub (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) en schrijft deze via `saveSettings()` de waarde `{ contextEditing: { enabled: … } }` terug. Omdat deze deel uitmaakt van het object met compressie-instellingen, wordt ze gecombineerd met het compressieprofiel per combinatie en vormt ze geen volledig onafhankelijk configuratieonderdeel — de configuratie bevat alleen de aan/uit-markering; alle drempelwaarden (`trigger`, `keep`) zijn de hierboven beschreven constanten.

## Alleen-Claude-gating

Injectie vindt alleen plaats voor echte Claude- of Claude-Code-compatibele relays. De gate in
`open-sse/executors/base.ts` is:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — echte Anthropic-sleutel/OAuth.
- `isClaudeCodeCompatible(this.provider)` — relays waarvan de provider-id begint met het
  voorvoegsel `anthropic-compatible-cc-` (ze adverteren compatibiliteit met Claude Code en zijn
  daardoor de relays die de bèta het waarschijnlijkst accepteren). Zie `open-sse/services/provider.ts`.

Bewust **uitgesloten**:

- `claude-web` — een browserrelay met een `create_conversation_params`-aanvraagstructuur die
  `context_management` nooit ontvangt.
- Algemene `anthropic-compatible-*`-relays (zonder het voorvoegsel `-cc-`) — eindpunten van derden
  met onzekere ondersteuning voor de bèta.

Niet-Claude-providers ontvangen de parameter `context_management` nooit, zelfs niet wanneer de
schakelaar is ingeschakeld.

## De 400-fallback / relaydekking

Een Claude-compatibele relay kan de bèta adverteren, maar de parameter `context_management` toch
weigeren met een HTTP 400. Om gecontroleerd terug te vallen in plaats van de aanvraag te laten
mislukken, verwijdert de executor de parameter en probeert deze dezelfde URL **één keer** opnieuw:

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

Gedrag:

1. Wordt alleen geactiveerd bij een `400` terwijl contextbewerking is ingeschakeld en de body
   daadwerkelijk `context_management` bevat.
2. De body van de 400-respons wordt via een `clone()` gelezen, zodat de oorspronkelijke respons
   intact blijft voor het pad zonder overeenkomst.
3. De fouttekst moet overeenkomen met `/context[_-]management|context editing/i` — een
   niet-gerelateerde 400 (bijvoorbeeld `max_tokens must be >= 1`) activeert de fallback **niet**; de
   oorspronkelijke fout wordt doorgegeven.
4. Bij een overeenkomst wordt `contextEditingDisabled = true` ingesteld (waardoor herinjectie wordt
   onderdrukt als later een nieuwe `transformedBody` wordt opgebouwd voor een alternatieve
   aanvraag-/fallback-URL), wordt `context_management` verwijderd, wordt de body voor Claude /
   Claude-Code-compatibele relays opnieuw ondertekend (`signRequestBody`) en wordt dezelfde URL
   één keer opnieuw geprobeerd.

Echte Claude bevat de bèta in `ANTHROPIC_BETA_BASE` en komt niet in dit fallbackpad terecht.

## `applied_edits`-telemetrie

Na een Claude-respons registreert OmniRoute hoeveel context de provider daadwerkelijk heeft gewist.
Dit wordt **niet** gestreamd — het wordt naar beste vermogen uit de niet-streamende responsbody
geëxtraheerd en heeft nooit invloed op de respons (telemetriefouten worden genegeerd).

- Extractie: `extractContextEditingTelemetry(responseBody)` in `open-sse/config/contextEditing.ts`.
  Deze controleert `applied_edits` op drie locaties (defensief vanwege mogelijke
  responsstructuren):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Per bewerking worden uit elke invoer de velden `cleared_input_tokens` en `cleared_tool_uses`
  gelezen (snake_case, eigen aan Anthropic), met `clearedInputTokens` / `clearedToolUses` als
  camelCase-fallbacks.
- Retourneert `null` wanneer geen `applied_edits`-array wordt gevonden of wanneer er feitelijk niets
  is gewist.

De ontvangststructuur is `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Registratie vindt plaats in `open-sse/handlers/chatCore.ts` (beperkt tot `provider === "claude"`) via
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), waarmee een rij voor
compressieanalyse wordt geschreven met de volgende tags:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = het aantal gewiste invoertokens
- `request_id` met het achtervoegsel `::context-editing`

Zo wordt gedelegeerd wissen in de compressieanalyses weergegeven naast de lokale engines, onder het
enginelabel `context-editing`, en kan het worden onderscheiden van besparingen door
RTK/Caveman/LLMLingua.

## Relatie tot de lokale compressie-engines

| Aspect                      | Lokale engines (Caveman / RTK / LLMLingua / stacked) | Gedelegeerde contextbewerking                                 |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| Waar het wordt uitgevoerd   | In OmniRoute, voordat het verzoek de proxy verlaat   | Bij de provider (Claude), aan de serverzijde                  |
| Wat het bewerkt             | Prompt-/context-/toolresultaattekst                  | Oude tool-use-/tool-result-blokken                            |
| Providerbereik              | Alle providers                                       | Alleen `claude` + `anthropic-compatible-cc-*`                 |
| Schakeloptie                | Instellingen voor de compressiemodus                 | `contextEditing.enabled`                                      |
| Foutafhandeling             | Fail-open (oorspronkelijke tekst)                    | 400-fallback: parameter verwijderen, eenmaal opnieuw proberen |
| Telemetrie voor besparingen | `engine: <engine id>`                                | `engine: "context-editing"`                                   |

De twee vullen elkaar aan: lokale engines comprimeren de bytes die OmniRoute verzendt; contextbewerking stelt
Claude in staat om de doorlopende context over meerdere beurten heen op te schonen. Ze kunnen samen worden ingeschakeld.

## Zie ook

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — engineregister en de lokale compressie-
  engines
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compressie van opdracht-/tooluitvoer
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compressie van MCP-beschrijvingen en
  vermindering van het aantal tools
- Bron: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
