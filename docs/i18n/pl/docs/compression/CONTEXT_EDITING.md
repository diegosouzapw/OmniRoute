---
title: "Delegowane Context Editing (Anthropic)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Delegowane Context Editing (Anthropic)

Delegowane **Context Editing** to funkcja zarządzania kontekstem dostępna wyłącznie dla Claude.
W przeciwieństwie do lokalnych silników kompresji OmniRoute (Caveman, RTK, LLMLingua, stacked
pipelines) — które przepisują ciało żądania _zanim_ opuści proxy — Context Editing prosi
**providera**, by usunął nieaktualne bloki tool-use / tool-result z własnego, bieżącego okna
kontekstu. OmniRoute dołącza jedynie parametr w body (`context_management.edits[]`); faktyczne
czyszczenie wykonuje Claude względem własnego tokenizera.

Z natury jest to zdolność delegowana: inni providerzy odrzucają ten parametr, więc OmniRoute
ogranicza go ściśle do Claude oraz relayów zgodnych z Claude Code.

Źródło prawdy: `open-sse/config/contextEditing.ts` (identyfikatory strategii, wstrzykiwanie body,
ekstrakcja telemetrii), `open-sse/executors/base.ts` (bramka wstrzykiwania + fallback 400) oraz
`open-sse/services/compression/types.ts` (kształt konfiguracji + domyślne wartości).

## Co robi `clear_tool_uses`

OmniRoute wstrzykuje pojedynczą edycję do wychodzącego body Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — datowany identyfikator strategii Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — gdy tokeny wejściowe żądania przekroczą ten próg, Claude zaczyna
  usuwać stare pary tool-use/result (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, domyślna wartość Anthropic).
- `keep.value: 3` — N najnowszych par tool-use/result pozostaje nienaruszonych
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta jest reklamowana nagłówkiem `anthropic-beta: context-management-2025-06-27`, który OmniRoute
już emituje w żądaniach Claude.

Wstrzykiwanie wykonuje `applyContextEditingToBody()` i jest **idempotentne**: jeśli edycja
`clear_tool_uses` już istnieje w body (dodana wcześniejszym wywołaniem lub dostarczona przez
klienta), body pozostaje bez zmian. Jeśli obecna jest też edycja `clear_thinking_20251015`,
OmniRoute stabilnie sortuje edycję `clear_thinking` na początek, bo Anthropic wymaga, by
`clear_thinking` poprzedzało `clear_tool_uses` w tablicy `edits[]`.

## Przełącznik włączania per-combo

Context Editing jest **domyślnie wyłączone** i działa na zasadzie opt-in. Przełącznik to pojedynczy
boolean w konfiguracji kompresji:

- Klucz ustawienia: `contextEditing.enabled` (camelCase — **nie** `context_editing` / `context-editing`).
- Typ: `ContextEditingConfig { enabled: boolean }` w
  `open-sse/services/compression/types.ts`.
- Domyślnie: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schemat Zod: `contextEditingConfigSchema` w `src/shared/validation/compressionConfigSchemas.ts`.
- Przechowywanie: zapisywane wraz z pozostałymi ustawieniami kompresji (normalizacja w
  `src/lib/db/compression.ts`).

W dashboardzie przełącznik znajduje się w hubie kompresji
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) i zapisuje
`{ contextEditing: { enabled: … } }` przez `saveSettings()`. Ponieważ jedzie na obiekcie
ustawień kompresji, komponuje się z profilem kompresji per-combo zamiast być w pełni niezależną
powierzchnią — konfiguracja niesie tylko flagę on/off; wszystkie progi (`trigger`, `keep`) to
stałe udokumentowane powyżej.

## Bramkowanie wyłącznie dla Claude

Wstrzykiwanie następuje tylko dla prawdziwego Claude lub relayów zgodnych z Claude Code. Bramka w
`open-sse/executors/base.ts` wygląda tak:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — prawdziwy klucz/OAuth Anthropic.
- `isClaudeCodeCompatible(this.provider)` — relaye, których id providera zaczyna się od prefiksu
  `anthropic-compatible-cc-` (reklamują zgodność z Claude Code, więc to one najpewniej zaakceptują
  betę). Zob. `open-sse/services/provider.ts`.

Celowo **wykluczone**:

- `claude-web` — relay przeglądarkowy o kształcie żądania `create_conversation_params`, który nigdy
  nie widzi `context_management`.
- Generyczne relaye `anthropic-compatible-*` (bez prefiksu `-cc-`) — zewnętrzne endpointy z
  niepewnym wsparciem bety.

Providerzy spoza Claude nigdy nie dostają parametru `context_management`, nawet gdy przełącznik jest
włączony.

## Fallback 400 / pokrycie relayów

Relay zgodny z Claude może reklamować betę, a mimo to odrzucić parametr `context_management`
kodem HTTP 400. Aby zdegradować się łagodnie zamiast failować żądanie, executor usuwa parametr i
ponawia to samo URL **raz**:

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

Zachowanie:

1. Odpalane tylko przy `400`, gdy context editing jest włączone i body faktycznie niesie
   `context_management`.
2. Body odpowiedzi 400 jest czytane przez `clone()`, więc oryginalna odpowiedź pozostaje nienaruszona
   na ścieżce bez dopasowania.
3. Tekst błędu musi pasować do `/context[_-]management|context editing/i` — niezwiązany 400 (np.
   `max_tokens must be >= 1`) **nie** uruchamia fallbacku; oryginalny błąd jest propagowany.
4. Przy dopasowaniu ustawia `contextEditingDisabled = true` (co tłumi ponowne wstrzyknięcie, jeśli
   później zbudowane zostanie świeże `transformedBody` dla retry/fallback URL), usuwa
   `context_management`, ponownie podpisuje body dla Claude / relayów zgodnych z Claude Code
   (`signRequestBody`) i ponawia to samo URL raz.

Prawdziwy Claude niesie betę w `ANTHROPIC_BETA_BASE` i nie trafia na tę ścieżkę fallbacku.

## Telemetria `applied_edits`

Po odpowiedzi Claude OmniRoute zapisuje, ile kontekstu provider faktycznie usunął. To **nie** jest
streamowane — jest wyciągane z body odpowiedzi non-streaming, best-effort, i nigdy nie wpływa na
odpowiedź (awarie telemetrii są połykane).

- Ekstrakcja: `extractContextEditingTelemetry(responseBody)` w `open-sse/config/contextEditing.ts`.
  Sonda `applied_edits` w trzech lokalizacjach (defensywnie względem kształtu odpowiedzi):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Pola per-edycja czytane z każdego wpisu: `cleared_input_tokens` i `cleared_tool_uses`
  (snake_case, natywne Anthropic), z fallbackami camelCase `clearedInputTokens` / `clearedToolUses`.
- Zwraca `null`, gdy nie znaleziono tablicy `applied_edits` albo nic faktycznie nie zostało usunięte.

Kształt potwierdzenia to `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Zapis odbywa się w `open-sse/handlers/chatCore.ts` (bramkowany do `provider === "claude"`) przez
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), który zapisuje wiersz
analityki kompresji z tagami:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = liczba usuniętych tokenów wejściowych
- `request_id` z sufiksem `::context-editing`

Dzięki temu delegowane czyszczenie pojawia się w analityce kompresji obok lokalnych silników, pod
etykietą silnika `context-editing`, i jest rozróżnialne od oszczędności RTK/Caveman/LLMLingua.

## Relacja do lokalnych silników kompresji

| Aspekt                  | Lokalne silniki (Caveman / RTK / LLMLingua / stacked) | Delegowane Context Editing                   |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------- |
| Gdzie działa            | W OmniRoute, zanim żądanie opuści proxy               | U providera (Claude), po stronie serwera     |
| Co edytuje              | Tekst promptu / kontekstu / tool-result               | Stare bloki tool-use / tool-result           |
| Zakres providerów       | Wszyscy providerzy                                    | tylko `claude` + `anthropic-compatible-cc-*` |
| Przełącznik             | Ustawienia trybu kompresji                            | `contextEditing.enabled`                     |
| Tryb awarii             | Fail-open (oryginalny tekst)                          | Fallback 400: usuń param, ponów raz          |
| Telemetria oszczędności | `engine: <engine id>`                                 | `engine: "context-editing"`                  |

Te dwa podejścia są komplementarne: lokalne silniki kompresują bajty wysyłane przez OmniRoute;
Context Editing pozwala Claude przycinać bieżący kontekst między turami. Można je włączyć razem.

## Zobacz też

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — rejestr silników i lokalne silniki
  kompresji
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — kompresja wyjścia poleceń/narzędzi
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — kompresja opisów MCP i
  redukcja kardynalności narzędzi
- Źródło: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
