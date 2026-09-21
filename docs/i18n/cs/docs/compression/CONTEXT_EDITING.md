# Delegated Context Editing (Anthropic) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegovaná **Úprava kontextu** je funkce správy kontextu určená pouze pro Claude. Na rozdíl od lokálních
kompresních enginů OmniRoute (Caveman, RTK, LLMLingua, zřetězené pipeline) — které přepisují tělo požadavku
_předtím_, než opustí proxy — Úprava kontextu žádá **poskytovatele**, aby ze svého průběžného kontextového
okna odstranil zastaralé bloky použití nástrojů / výsledků nástrojů. OmniRoute pouze připojí parametr těla
(`context_management.edits[]`); samotné odstranění provádí Claude podle vlastního tokenizéru.

Ze své podstaty jde o delegovanou schopnost: ostatní poskytovatelé tento parametr odmítají, takže jej OmniRoute
striktně omezuje na Claude a relay služby kompatibilní s Claude Code.

Zdroj pravdy: `open-sse/config/contextEditing.ts` (ID strategií, vložení do těla, extrakce telemetrie),
`open-sse/executors/base.ts` (podmínka vložení + záložní postup při chybě 400) a
`open-sse/services/compression/types.ts` (tvar konfigurace + výchozí hodnota).

## Co `clear_tool_uses` dělá

OmniRoute vloží do odchozího těla Anthropic Messages jednu úpravu:

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

- `type: "clear_tool_uses_20250919"` — datované ID strategie Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — jakmile počet vstupních tokenů požadavku překročí tuto prahovou hodnotu, Claude začne
  odstraňovat staré dvojice použití nástroje / výsledku nástroje (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, výchozí hodnota Anthropic).
- `keep.value: 3` — N nejnovějších dvojic použití nástroje / výsledku nástroje zůstane beze změny
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta funkce je oznamována prostřednictvím hlavičky `anthropic-beta: context-management-2025-06-27`, kterou
OmniRoute již odesílá v požadavcích na Claude.

Vložení provádí `applyContextEditingToBody()` a je **idempotentní**: pokud již v těle existuje úprava
`clear_tool_uses` (přidaná předchozím voláním nebo poskytnutá klientem), tělo zůstane beze změny.
Pokud je přítomna také úprava `clear_thinking_20251015`, OmniRoute stabilně seřadí úpravu
`clear_thinking` na začátek, protože Anthropic vyžaduje, aby `clear_thinking` předcházela
`clear_tool_uses` v poli `edits[]`.

## Přepínač aktivace pro jednotlivé kombinace

Úprava kontextu je **ve výchozím nastavení vypnutá** a vyžaduje explicitní aktivaci. Přepínač je jediná booleovská hodnota uložená v
konfiguraci komprese:

- Klíč nastavení: `contextEditing.enabled` (camelCase — **nikoli** `context_editing` / `context-editing`).
- Typ: `ContextEditingConfig { enabled: boolean }` v
  `open-sse/services/compression/types.ts`.
- Výchozí hodnota: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schéma Zod: `contextEditingConfigSchema` v `src/shared/validation/compressionConfigSchemas.ts`.
- Úložiště: ukládá se společně s ostatními nastaveními komprese (normalizace probíhá v
  `src/lib/db/compression.ts`).

Na řídicím panelu se přepínač nachází v centru komprese
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) a zapisuje
`{ contextEditing: { enabled: … } }` zpět prostřednictvím `saveSettings()`. Protože je součástí
objektu nastavení komprese, kombinuje se s profilem komprese pro jednotlivé kombinace, místo aby představoval
zcela nezávislé rozhraní — konfigurace obsahuje pouze příznak zapnutí/vypnutí; všechny prahové hodnoty (`trigger`,
`keep`) jsou konstanty zdokumentované výše.

## Omezení pouze na Claude

Vkládání probíhá pouze pro skutečný Claude nebo přenosové služby kompatibilní s Claude Code. Podmínka v
`open-sse/executors/base.ts` je:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — skutečný klíč Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — přenosové služby, jejichž ID poskytovatele začíná předponou
  `anthropic-compatible-cc-` (deklarují kompatibilitu s Claude Code, takže jde o přenosové služby,
  které s největší pravděpodobností přijmou beta funkci). Viz `open-sse/services/provider.ts`.

Záměrně **vyloučeno**:

- `claude-web` — prohlížečová přenosová služba s formátem požadavku `create_conversation_params`, který
  nikdy neobdrží `context_management`.
- Obecné přenosové služby `anthropic-compatible-*` (bez předpony `-cc-`) — koncové body třetích stran
  s nejistou podporou beta funkce.

Poskytovatelé jiní než Claude nikdy neobdrží parametr `context_management`, ani když je přepínač zapnutý.

## Záložní mechanismus při chybě 400 / pokrytí přenosových služeb

Přenosová služba kompatibilní s Claude může deklarovat podporu beta funkce, ale přesto parametr
`context_management` odmítnout s HTTP 400. Aby požadavek namísto selhání degradoval bez přerušení,
executor parametr odstraní a zopakuje požadavek na stejnou URL adresu **jednou**:

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

Chování:

1. Aktivuje se pouze při `400`, když je úprava kontextu povolena a tělo skutečně obsahuje
   `context_management`.
2. Tělo odpovědi 400 se načte prostřednictvím `clone()`, takže původní odpověď zůstane nedotčena pro
   větev, která se neshoduje.
3. Text chyby se musí shodovat s `/context[_-]management|context editing/i` — nesouvisející chyba 400
   (např. `max_tokens must be >= 1`) záložní mechanismus **nespustí**; původní chyba se předá dál.
4. Při shodě nastaví `contextEditingDisabled = true` (což zabrání opětovnému vložení, pokud se později
   sestaví nové `transformedBody` pro opakovaný pokus nebo záložní URL adresu), odstraní
   `context_management`, znovu podepíše tělo pro Claude / přenosové služby kompatibilní s Claude Code
   (`signRequestBody`) a jednou zopakuje požadavek na stejnou URL adresu.

Skutečný Claude přenáší beta funkci v `ANTHROPIC_BETA_BASE` a tuto záložní větev nepoužívá.

## Telemetrie `applied_edits`

Po odpovědi Claude zaznamená OmniRoute množství kontextu, které poskytovatel skutečně odstranil. Tato
data se **nestreamují** — extrahují se z těla nestreamované odpovědi s maximální snahou a nikdy
neovlivňují odpověď (selhání telemetrie jsou potlačena).

- Extrakce: `extractContextEditingTelemetry(responseBody)` v `open-sse/config/contextEditing.ts`.
  Kontroluje `applied_edits` na třech místech (defenzivně s ohledem na formát odpovědi):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Pole čtená z každé položky: `cleared_input_tokens` a `cleared_tool_uses`
  (snake_case, nativní pro Anthropic), se záložními variantami camelCase
  `clearedInputTokens` / `clearedToolUses`.
- Vrací `null`, pokud nebylo nalezeno žádné pole `applied_edits` nebo nebylo ve skutečnosti nic
  odstraněno.

Formát záznamu je `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
K zaznamenání dochází v `open-sse/handlers/chatCore.ts` (omezeno na `provider === "claude"`)
prostřednictvím `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), která zapíše
řádek analytiky komprese označený:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = počet odstraněných vstupních tokenů
- `request_id` doplněné příponou `::context-editing`

Delegované odstraňování se tak zobrazí v analytice komprese vedle lokálních enginů pod označením
enginu `context-editing` a lze je odlišit od úspor RTK/Caveman/LLMLingua.

## Vztah k lokálním kompresním enginům

| Aspekt               | Lokální enginy (Caveman / RTK / LLMLingua / stacked) | Delegované úpravy kontextu                                                 |
| -------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| Kde se spouští       | V OmniRoute, než požadavek opustí proxy server       | U poskytovatele (Claude), na straně serveru                                |
| Co upravuje          | Text promptu / kontextu / výsledků nástrojů          | Staré bloky použití nástrojů / výsledků nástrojů                           |
| Rozsah poskytovatelů | Všichni poskytovatelé                                | Pouze `claude` + `anthropic-compatible-cc-*`                               |
| Přepínač             | Nastavení režimu komprese                            | `contextEditing.enabled`                                                   |
| Režim při selhání    | Fail-open (původní text)                             | Záložní postup při chybě 400: odebrat parametr a jednou opakovat požadavek |
| Telemetrie úspor     | `engine: <engine id>`                                | `engine: "context-editing"`                                                |

Oba přístupy se vzájemně doplňují: lokální enginy komprimují bajty odesílané službou OmniRoute; úpravy kontextu umožňují
službě Claude průběžně prořezávat kontext napříč jednotlivými interakcemi. Lze je povolit současně.

## Viz také

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registr enginů a lokální kompresní
  enginy
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komprese příkazů/výstupů nástrojů
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — komprese popisů MCP a
  snížení kardinality nástrojů
- Zdroj: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
