# Delegated Context Editing (Anthropic) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegerad **Context Editing** är en funktion för kontexthantering som endast finns för Claude. Till skillnad från OmniRoutes lokala
komprimeringsmotorer (Caveman, RTK, LLMLingua, staplade pipelines) – som skriver om begärans innehåll
_innan_ det lämnar proxyn – ber Context Editing **leverantören** att rensa inaktuella
verktygsanvändnings-/verktygsresultatblock från sitt eget aktiva kontextfönster. OmniRoute lägger endast till en
parameter i innehållet (`context_management.edits[]`); Claude utför den faktiska rensningen utifrån sin egen tokeniserare.

Detta är till sin natur en delegerad funktion: andra leverantörer avvisar parametern, så OmniRoute begränsar
den strikt till Claude och Claude-Code-kompatibla reläer.

Primär källa: `open-sse/config/contextEditing.ts` (strategi-id:n, injicering i innehåll, extrahering av
telemetri), `open-sse/executors/base.ts` (injenseringsgrind + reservhantering vid 400) och
`open-sse/services/compression/types.ts` (konfigurationsstruktur + standardvärde).

## Vad `clear_tool_uses` gör

OmniRoute injicerar en enda redigering i det utgående Anthropic Messages-innehållet:

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

- `type: "clear_tool_uses_20250919"` – Anthropics daterade strategi-id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` – när begärans indatatoken överstiger detta tröskelvärde börjar Claude
  rensa gamla par av verktygsanvändning/resultat (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropics standardvärde).
- `keep.value: 3` – de N senaste paren av verktygsanvändning/resultat behålls orörda
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Betaversionen annonseras via rubriken `anthropic-beta: context-management-2025-06-27`, som
OmniRoute redan skickar med Claude-begäranden.

Injiceringen utförs av `applyContextEditingToBody()` och är **idempotent**: om en `clear_tool_uses`-redigering
redan finns i innehållet (tillagd av ett tidigare anrop eller angiven av klienten) lämnas innehållet
oförändrat. Om en `clear_thinking_20251015`-redigering också finns stabilsorterar OmniRoute
`clear_thinking`-redigeringen först, eftersom Anthropic kräver att `clear_thinking` föregår
`clear_tool_uses` i matrisen `edits[]`.

## Aktiveringsväxeln per kombination

Context Editing är **avstängt som standard** och måste aktiveras uttryckligen. Växeln är ett enda booleskt värde som ingår i
komprimeringskonfigurationen:

- Inställningsnyckel: `contextEditing.enabled` (camelCase – **inte** `context_editing` / `context-editing`).
- Typ: `ContextEditingConfig { enabled: boolean }` i
  `open-sse/services/compression/types.ts`.
- Standardvärde: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-schema: `contextEditingConfigSchema` i `src/shared/validation/compressionConfigSchemas.ts`.
- Lagring: sparas tillsammans med övriga komprimeringsinställningar (normaliseras i
  `src/lib/db/compression.ts`).

I kontrollpanelen finns växeln i komprimeringshubben
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) och skriver tillbaka
`{ contextEditing: { enabled: … } }` via `saveSettings()`. Eftersom den ingår i objektet för
komprimeringsinställningar kombineras den med komprimeringsprofilen per kombination i stället för att utgöra en
helt oberoende inställningsyta – konfigurationen innehåller endast av/på-flaggan; alla tröskelvärden (`trigger`,
`keep`) är de konstanter som dokumenteras ovan.

## Gating endast för Claude

Injektion sker endast för äkta Claude eller Claude-Code-kompatibla reläer. Kontrollvillkoret i
`open-sse/executors/base.ts` är:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — äkta Anthropic-nyckel/OAuth.
- `isClaudeCodeCompatible(this.provider)` — reläer vars leverantörs-id börjar med prefixet
  `anthropic-compatible-cc-` (de annonserar kompatibilitet med Claude Code och är därför de reläer
  som mest sannolikt accepterar betaversionen). Se `open-sse/services/provider.ts`.

Avsiktligt **exkluderade**:

- `claude-web` — ett webbläsarrelä med ett förfrågningsformat av typen `create_conversation_params`
  som aldrig ser `context_management`.
- Generiska `anthropic-compatible-*`-reläer (utan prefixet `-cc-`) — tredjepartsslutpunkter med
  osäkert stöd för betaversionen.

Leverantörer som inte är Claude tar aldrig emot parametern `context_management`, även när reglaget
är aktiverat.

## 400-reservmekanismen / täckning för reläer

Ett Claude-kompatibelt relä kan annonsera betaversionen men ändå avvisa parametern
`context_management` med HTTP 400. För att hantera detta på ett robust sätt i stället för att låta
förfrågan misslyckas tar exekveraren bort parametern och försöker skicka samma URL **en gång** till:

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

Beteende:

1. Aktiveras endast vid `400` när kontextredigering är aktiverad och kroppen faktiskt innehåller
   `context_management`.
2. 400-svaret läses via en `clone()` så att det ursprungliga svaret förblir intakt för sökvägen där
   ingen matchning sker.
3. Feltexten måste matcha `/context[_-]management|context editing/i` — ett orelaterat 400-fel (t.ex.
   `max_tokens must be >= 1`) utlöser **inte** reservmekanismen; det ursprungliga felet skickas vidare.
4. Vid en matchning sätts `contextEditingDisabled = true` (vilket förhindrar återinjektion om en ny
   `transformedBody` senare skapas för ett nytt försök eller en reserv-URL), `context_management`
   tas bort, kroppen signeras på nytt för Claude/Claude-Code-kompatibla reläer (`signRequestBody`)
   och samma URL anropas en gång till.

Äkta Claude inkluderar betaversionen i `ANTHROPIC_BETA_BASE` och använder inte denna reservmekanism.

## Telemetri för `applied_edits`

Efter ett Claude-svar registrerar OmniRoute hur mycket kontext leverantören faktiskt rensade. Detta
strömmas **inte** — det extraheras efter bästa förmåga från den icke-strömmande svarskroppen och
påverkar aldrig svaret (telemetrifel ignoreras).

- Extrahering: `extractContextEditingTelemetry(responseBody)` i
  `open-sse/config/contextEditing.ts`. Den letar efter `applied_edits` på tre platser (defensivt med
  hänsyn till svarsformatet):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Fält per redigering som läses från varje post: `cleared_input_tokens` och `cleared_tool_uses`
  (snake_case, Anthropic-standard), med `clearedInputTokens`/`clearedToolUses` i camelCase som
  reservalternativ.
- Returnerar `null` när ingen `applied_edits`-array hittas eller inget faktiskt rensades.

Kvittots format är `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Registreringen sker i `open-sse/handlers/chatCore.ts` (begränsad till `provider === "claude"`) via
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), som skriver en rad med
komprimeringsanalys märkt med:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved`/`original_tokens` = antalet rensade indatatoken
- `request_id` med suffixet `::context-editing`

Delegerad rensning visas därmed i komprimeringsanalysen tillsammans med de lokala motorerna, under
motoretiketten `context-editing`, och kan särskiljas från besparingar med RTK/Caveman/LLMLingua.

## Förhållande till de lokala komprimeringsmotorerna

| Aspekt              | Lokala motorer (Caveman / RTK / LLMLingua / stacked) | Delegerad kontextredigering                                   |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| Var den körs        | I OmniRoute, innan begäran lämnar proxyn             | Hos leverantören (Claude), på serversidan                     |
| Vad den redigerar   | Prompt-/kontext-/verktygsresultattext                | Äldre verktygsanvändnings-/verktygsresultatblock              |
| Leverantörsstöd     | Alla leverantörer                                    | Endast `claude` + `anthropic-compatible-cc-*`                 |
| Växling             | Inställningar för komprimeringsläge                  | `contextEditing.enabled`                                      |
| Felläge             | Fortsätt vid fel (originaltext)                      | 400-reservlösning: ta bort parametern och försök igen en gång |
| Besparingstelemetri | `engine: <engine id>`                                | `engine: "context-editing"`                                   |

De två kompletterar varandra: lokala motorer komprimerar de byte som OmniRoute skickar; kontextredigering låter
Claude rensa den löpande kontexten mellan turer. De kan aktiveras tillsammans.

## Se även

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — motorregister och de lokala komprimeringsmotorerna
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komprimering av kommando-/verktygsutdata
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — komprimering av MCP-beskrivningar och
  minskning av verktygskardinalitet
- Källa: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
