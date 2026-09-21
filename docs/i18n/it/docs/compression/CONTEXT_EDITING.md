# Delegated Context Editing (Anthropic) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

La **Modifica del contesto** delegata è una funzionalità di gestione del contesto esclusiva di Claude. A differenza dei motori di compressione locali di OmniRoute (Caveman, RTK, LLMLingua, pipeline impilate), che riscrivono il corpo della richiesta _prima_ che lasci il proxy, la Modifica del contesto chiede al **provider** di eliminare i blocchi obsoleti relativi all'uso degli strumenti e ai relativi risultati dalla propria finestra di contesto attiva. OmniRoute si limita ad aggiungere un parametro al corpo (`context_management.edits[]`); Claude esegue l'effettiva eliminazione in base al proprio tokenizer.

Per sua natura, si tratta di una funzionalità delegata: gli altri provider rifiutano il parametro, pertanto OmniRoute ne limita rigorosamente l'uso a Claude e ai relay compatibili con Claude Code.

Fonte autorevole: `open-sse/config/contextEditing.ts` (ID delle strategie, inserimento nel corpo, estrazione della telemetria), `open-sse/executors/base.ts` (controllo per l'inserimento + fallback in caso di errore 400) e `open-sse/services/compression/types.ts` (struttura della configurazione + valore predefinito).

## Funzionamento di `clear_tool_uses`

OmniRoute inserisce una singola modifica nel corpo in uscita di Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — l'ID della strategia Anthropic con data (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — quando i token di input della richiesta superano questa soglia, Claude inizia a eliminare le vecchie coppie di utilizzo/risultato degli strumenti (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, valore predefinito di Anthropic).
- `keep.value: 3` — le N coppie di utilizzo/risultato degli strumenti più recenti vengono mantenute intatte (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

La funzionalità beta viene dichiarata tramite l'header `anthropic-beta: context-management-2025-06-27`, che OmniRoute emette già nelle richieste a Claude.

L'inserimento viene eseguito da `applyContextEditingToBody()` ed è **idempotente**: se nel corpo esiste già una modifica `clear_tool_uses` (aggiunta da una chiamata precedente o fornita dal client), il corpo viene lasciato invariato. Se è presente anche una modifica `clear_thinking_20251015`, OmniRoute esegue un ordinamento stabile per portare la modifica `clear_thinking` in prima posizione, poiché Anthropic richiede che `clear_thinking` preceda `clear_tool_uses` nell'array `edits[]`.

## L'opzione di attivazione per ogni combinazione

La Modifica del contesto è **disattivata per impostazione predefinita** e richiede l'attivazione esplicita. L'opzione consiste in un singolo valore booleano incluso nella configurazione della compressione:

- Chiave dell'impostazione: `contextEditing.enabled` (camelCase — **non** `context_editing` / `context-editing`).
- Tipo: `ContextEditingConfig { enabled: boolean }` in `open-sse/services/compression/types.ts`.
- Valore predefinito: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schema Zod: `contextEditingConfigSchema` in `src/shared/validation/compressionConfigSchemas.ts`.
- Archiviazione: salvata insieme alle altre impostazioni di compressione (normalizzate in `src/lib/db/compression.ts`).

Nella dashboard, l'opzione si trova nell'hub di compressione (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) e salva `{ contextEditing: { enabled: … } }` tramite `saveSettings()`. Poiché fa parte dell'oggetto delle impostazioni di compressione, si combina con il profilo di compressione specifico per ogni combinazione anziché costituire una superficie completamente indipendente: la configurazione contiene soltanto il flag di attivazione/disattivazione; tutte le soglie (`trigger`, `keep`) corrispondono alle costanti documentate sopra.

## Attivazione esclusiva per Claude

L'iniezione avviene solo per relay Claude autentici o compatibili con Claude Code. Il controllo in
`open-sse/executors/base.ts` è:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — chiave/OAuth Anthropic autentica.
- `isClaudeCodeCompatible(this.provider)` — relay il cui ID provider inizia con il prefisso
  `anthropic-compatible-cc-` (dichiarano la compatibilità con Claude Code, quindi sono i relay che
  più probabilmente accettano la beta). Vedere `open-sse/services/provider.ts`.

Deliberatamente **esclusi**:

- `claude-web` — un relay per browser con un formato di richiesta `create_conversation_params` che
  non riceve mai `context_management`.
- Relay generici `anthropic-compatible-*` (senza il prefisso `-cc-`) — endpoint di terze parti con
  supporto della beta incerto.

I provider diversi da Claude non ricevono mai il parametro `context_management`, anche quando
l'opzione è attivata.

## Il fallback per errore 400 / copertura dei relay

Un relay compatibile con Claude può dichiarare il supporto della beta, ma rifiutare comunque il
parametro `context_management` con un errore HTTP 400. Per ridurre gradualmente la funzionalità
anziché far fallire la richiesta, l'executor rimuove il parametro e ripete la richiesta allo stesso
URL **una sola volta**:

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

Comportamento:

1. Si attiva solo in caso di errore `400`, quando il context editing è abilitato e il corpo contiene
   effettivamente `context_management`.
2. Il corpo della risposta 400 viene letto tramite `clone()`, in modo che la risposta originale
   rimanga intatta per il percorso che non soddisfa la condizione.
3. Il testo dell'errore deve corrispondere a `/context[_-]management|context editing/i`: un errore 400
   non correlato (ad esempio `max_tokens must be >= 1`) **non** attiva il fallback; viene propagato
   l'errore originale.
4. In caso di corrispondenza, imposta `contextEditingDisabled = true` (impedendo una nuova iniezione
   qualora venga successivamente creato un nuovo `transformedBody` per un URL di nuovo tentativo o
   fallback), elimina `context_management`, firma nuovamente il corpo per Claude / relay compatibili
   con Claude Code (`signRequestBody`) e ripete una volta la richiesta allo stesso URL.

Claude autentico include la beta in `ANTHROPIC_BETA_BASE` e non percorre questo percorso di fallback.

## Telemetria di `applied_edits`

Dopo una risposta di Claude, OmniRoute registra la quantità di contesto che il provider ha
effettivamente eliminato. Questa telemetria **non** viene trasmessa in streaming: viene estratta,
secondo il principio del massimo sforzo, dal corpo della risposta non in streaming e non influisce
mai sulla risposta (gli errori di telemetria vengono ignorati).

- Estrazione: `extractContextEditingTelemetry(responseBody)` in
  `open-sse/config/contextEditing.ts`. Cerca `applied_edits` in tre posizioni (come misura difensiva
  rispetto al formato della risposta):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Campi per modifica letti da ogni voce: `cleared_input_tokens` e `cleared_tool_uses`
  (snake_case, formato nativo di Anthropic), con fallback camelCase `clearedInputTokens` /
  `clearedToolUses`.
- Restituisce `null` quando non viene trovato alcun array `applied_edits` o quando non è stato
  effettivamente eliminato nulla.

Il formato della ricevuta è
`ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`. La registrazione
avviene in `open-sse/handlers/chatCore.ts` (limitata a `provider === "claude"`) tramite
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), che scrive una riga di
analisi della compressione contrassegnata con:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = numero di token di input eliminati
- `request_id` con il suffisso `::context-editing`

In questo modo, l'eliminazione delegata compare nelle analisi della compressione insieme ai motori
locali, sotto l'etichetta del motore `context-editing`, ed è distinguibile dai risparmi di
RTK/Caveman/LLMLingua.

## Relazione con i motori di compressione locali

| Aspetto                    | Motori locali (Caveman / RTK / LLMLingua / combinati)  | Modifica delegata del contesto                         |
| -------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| Dove viene eseguita        | In OmniRoute, prima che la richiesta lasci il proxy    | Nel provider (Claude), lato server                     |
| Cosa modifica              | Testo di prompt / contesto / risultati degli strumenti | Vecchi blocchi di utilizzo/risultato strumenti         |
| Ambito dei provider        | Tutti i provider                                       | Solo `claude` + `anthropic-compatible-cc-*`            |
| Attivazione/disattivazione | Impostazioni della modalità di compressione            | `contextEditing.enabled`                               |
| Modalità di errore         | Fail-open (testo originale)                            | Fallback 400: rimuove il parametro e riprova una volta |
| Telemetria del risparmio   | `engine: <engine id>`                                  | `engine: "context-editing"`                            |

I due approcci sono complementari: i motori locali comprimono i byte inviati da OmniRoute; la modifica del contesto consente a
Claude di ridurre il contesto corrente tra i vari turni. Possono essere abilitati insieme.

## Vedi anche

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registro dei motori e motori di compressione
  locali
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compressione dei comandi e dell'output degli strumenti
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compressione delle descrizioni MCP e
  riduzione della cardinalità degli strumenti
- Sorgenti: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
